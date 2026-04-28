import { User } from "../models/user.model.ts";
import { loginUserSchema, registerUserSchema } from "../types/schemas/User.schema.ts"
import { ApiResponse } from "../utils/ApiResponse.ts";
import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts"
import type { AuthRequest } from "../types/express.type.ts"

const generateRefreshAndAccessToken = async(userId: string)=> {
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new AppError("User not found", 404)
        }
        
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
        
        return { refreshToken, accessToken }
    } catch (error) {
        throw new AppError("Failed to generate tokens", 500)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const parsedData = registerUserSchema.safeParse(req.body)
    if (!parsedData.success) {

        const formattedErrors = parsedData.error.issues.reduce(
            (acc: Record<string, string>, issue) => {
                const field=  issue.path[0] as string
                acc[field] = issue.message
                return acc;
            }, {}
        )

        throw new AppError("Validation failed", 400, formattedErrors)
    }

    const existingUser = await User.findOne({ email: parsedData.data.email })
    if(existingUser){
        throw new AppError("User already exists", 409)
    }

    if(parsedData.data.password !== parsedData.data.confirmPassword){
        throw new AppError("Passwords do not match", 400)
    }

    const user = await User.create({
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        email: parsedData.data.email,
        password: parsedData.data.password,
    })

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new AppError("User not created", 500)
    }

    return res.status(201)
            .json(new ApiResponse(201, createdUser, "User registered successfully"))

})

const loginUser = asyncHandler(async(req, res) => {
    const parsedData = loginUserSchema.safeParse(req.body)

    if(!parsedData.success){
        const formattedErrors = parsedData.error.issues.reduce(
            (acc: Record<string, string>, issue) => {
                const field=  issue.path[0] as string
                acc[field] = issue.message
                return acc;
            }, {}
        )
        
        throw new AppError("Validation failed", 400, formattedErrors)
    }

    const user = await User.findOne({ email: parsedData.data.email })
    if(!user){
        throw new AppError("User not found", 404)
    }

    const isPasswordValid = await user.isPasswordMatch(parsedData.data.password)
    if(!isPasswordValid){
        throw new AppError("Invalid password", 401)
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(user._id.toString())

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
    }

    return res.status(200)
                    .cookie("accessToken",accessToken,options)
                    .cookie("refreshToken",refreshToken,options)
                    .json(new ApiResponse(200, { user, refreshToken, accessToken }, "User logged in successfully"))
})

const logoutUser = asyncHandler(async(req: AuthRequest, res) => {
    if (!req.user?._id) {
        throw new AppError("User not authenticated", 401);
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {new: true}
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})

export { registerUser, loginUser, logoutUser }