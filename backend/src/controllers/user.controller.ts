import { User } from "../models/user.model.ts";
import { loginUserSchema, registerUserSchema } from "../types/schemas/User.schema.ts"
import { ApiResponse } from "../utils/ApiResponse.ts";
import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts"
import type { AuthRequest } from "../types/express.type.ts"
import axios from "axios";

const generateRefreshAndAccessToken = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        // Call the methods we defined in the schema
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new AppError("Failed to generate tokens", 500);
    }
};

export const registerUser = asyncHandler(async (req, res) => {
    const parsedData = registerUserSchema.safeParse(req.body)
    if (!parsedData.success) {

        const formattedErrors = parsedData.error.issues.reduce(
            (acc: Record<string, string>, issue) => {
                const field = issue.path[0] as string
                acc[field] = issue.message
                return acc;
            }, {}
        )

        throw new AppError("Validation failed", 400, formattedErrors)
    }

    const existingUser = await User.findOne({ email: parsedData.data.email })
    if (existingUser) {
        throw new AppError("User already exists", 409)
    }

    if (parsedData.data.password !== parsedData.data.confirmPassword) {
        throw new AppError("Passwords do not match", 400)
    }

    const user = await User.create({
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        email: parsedData.data.email,
        password: parsedData.data.password,
    })

    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) {
        throw new AppError("User not created", 500)
    }

    return res.status(201)
        .json(new ApiResponse(201, createdUser, "User registered successfully"))

})

export const loginUser = asyncHandler(async (req, res) => {
    const parsedData = loginUserSchema.safeParse(req.body)

    if (!parsedData.success) {
        const formattedErrors = parsedData.error.issues.reduce(
            (acc: Record<string, string>, issue) => {
                const field = issue.path[0] as string
                acc[field] = issue.message
                return acc;
            }, {}
        )

        throw new AppError("Validation failed", 400, formattedErrors)
    }

    const user = await User.findOne({ email: parsedData.data.email })
    if (!user) {
        throw new AppError("User not found", 404)
    }

    const isPasswordValid = await user.isPasswordMatch(parsedData.data.password)
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401)
    }

    if (user.providerType === "auth0" && !user.password) {
        throw new AppError("Use Auth0 login", 400);
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(user._id.toString())

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user, refreshToken, accessToken }, "User logged in successfully"))
})

export const logoutUser = asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user?._id) {
        throw new AppError("User not authenticated", 401);
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})

// It ensures a MongoDB user exists for an Auth0 identity
// req.user ALWAYS exists in future requests bcoz of SyncAuth0

// Scenario WITHOUT sync
// User logs in via Google → gets token → hits /profile

// Middleware (verifyJWT) does:
// req.user = null
// req.authUser = { auth0Id, email }
// req.user is null -> 
// No _id
// No organization
export const syncAuth0User = asyncHandler(async (req: any, res) => {
    if (req.authType !== "auth0") {
        throw new AppError("Invalid auth type", 400);
    }

    const auth0Id = req.auth?.payload?.sub;
    let email = req.auth?.payload?.email;
    const token = req.headers.authorization?.split(" ")[1];

    // If email missing → fetch from Auth0
    if (!email) {
        

        const AUTH0_ISSUER = process.env.AUTH0_ISSUER!;

        const response = await axios.get(
        `${AUTH0_ISSUER}userinfo`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );

        email = response.data.email;
    }

    if (!auth0Id || !email) {
        throw new AppError("Missing auth0Id or email", 400);
    }

    let user = await User.findOne({
        $or: [{ auth0Id }, { email }]
    });

    if (!user) {
        user = await User.create({
            auth0Id,
            email,
            providerType: "auth0",
        });

        return res.status(201).json({
            user,
            isNewUser: true,
        });
    }

    const needsOnboarding = !user.firstName || !user.organization;
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict" as const,
        domain: "localhost",
    }


    res.status(200)
    .cookie("accessToken", token, options)
    .json({
        user,
        isNewUser: needsOnboarding,
    })
});

export const completeProfile = asyncHandler(async (req: any, res) => {

    if (req.authType !== "auth0") {
        throw new AppError("Only Auth0 users allowed", 400);
    }

    if (!req.user) {
        throw new AppError("User not found", 404);
    }

    const { firstName, lastName, password, organization } = req.body;

    if (!firstName || !lastName || !organization) {
        throw new AppError("Missing required fields", 400);
    }

    const user = req.user;

    user.firstName = firstName;
    user.lastName = lastName;
    user.organization = organization;

    if (password) {
        user.password = password;
    }

    await user.save();

    res.status(200).json({
        message: "Profile completed",
        user,
    });
});