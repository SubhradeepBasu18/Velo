import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";
import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts";
import type { AuthRequest } from "../types/express.type.ts";

const verifyJWT = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new AppError("Unauthorized request", 401);
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
        
        const user = await User.findById(decodedToken.id).select("-password");
        
        if (!user) {
            throw new AppError("Invalid access token", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError("Invalid access token", 401);
        }
        next(error);
    }
});

export { verifyJWT };
