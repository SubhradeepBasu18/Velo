import "dotenv/config";
import jwt from "jsonwebtoken";
import { auth } from "express-oauth2-jwt-bearer";
import { User } from "../models/user.model.ts";
import asyncHandler from "../utils/AsycHandler.ts";
import AppError from "../utils/AppError.ts";

const AUTH0_ISSUER = process.env.AUTH0_ISSUER!;

const checkAuth0Jwt = auth({
    audience: process.env.AUTH0_AUDIENCE!,
    issuerBaseURL: AUTH0_ISSUER,
    tokenSigningAlg: "RS256",
});

export const verifyJWT = asyncHandler(async (req: any, res, next) => {
    const authHeader = req.headers.authorization;
    const token =
            req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : req.cookies?.accessToken;

    if (!token) {
        throw new AppError("No token provided", 401);
    }

    const decoded: any = jwt.decode(token);

    if (!decoded) {
        throw new AppError("Invalid token format", 401);
    }

    // AUTH0 FLOW
    if (decoded.iss?.startsWith(AUTH0_ISSUER)) {
        // Temporarily set Authorization header if token came from cookie
        const originalAuthHeader = req.headers.authorization;
        if (!req.headers.authorization && req.cookies?.accessToken) {
            req.headers.authorization = `Bearer ${req.cookies.accessToken}`;
        }
        
        await new Promise((resolve, reject) => {
            checkAuth0Jwt(req, res, (err) => {
                // Restore original header
                req.headers.authorization = originalAuthHeader;
                if (err) {
                    console.error("Auth0 verification failed:", err);
                    return reject(err);
                }
                resolve(true);
            });
        });

        if (!req.auth?.payload?.sub) {
            throw new AppError("Invalid Auth0 payload", 401);
        }

        const payload = req.auth.payload;

        // find user in DB
        const user = await User.findOne({ auth0Id: payload.sub }).select("-password");

        if (!user) {
            // This is the FIRST TIME this Auth0 user is hitting my backend
            req.user = null; // No DB user yet
            req.authUser = {
                auth0Id: payload.sub,
                email: payload.email || null,
            };
        } else {
            // This Auth0 user is already linked to my system
            req.user = user;
        }

        req.authType = "auth0";
        return next();
    }

    // CUSTOM FLOW
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

        const user = await User.findById(verified.id).select("-password");
        if (!user) throw new Error();

        req.user = user;
        req.authType = "custom";

        return next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
});