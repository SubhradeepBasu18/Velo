import mongoose from "mongoose";
import type { UserType } from "../types/User.type.ts";

const userSchema = new mongoose.Schema<UserType>({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    organization: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

export const User = mongoose.model<UserType>("User", userSchema);