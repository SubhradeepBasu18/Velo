import mongoose from "mongoose";
import type { UserDocument } from "../types/User.type.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema<UserDocument>({
    firstName: {
        type: String,
        required: false,
        trim: true
    },

    lastName: {
        type: String,
        required: false,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    providerType: {
        type: String,
        enum: ["auth0", "custom"],
        default: "custom",
        required: true
    },

    password: {
        type: String,
        required: function (this: any): boolean {
            return this.providerType === "custom";
        }
    },

    organization: {
        type: String,
        default: null
    },

    refreshToken: {
        type: String,
        default: null
    },

    auth0Id: {
        type: String,
        unique: true,
        sparse: true // allows multiple nulls
    }

}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err: any) {
        throw err;
    }
});

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    // If user is from Auth0, they don't have a local password to compare
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            providerType: this.providerType
        },
        process.env.ACCESS_TOKEN_SECRET!,
        // Below block was misinterpreted as callback instead of options
        // So explicitly type annotated to jwt signing methods
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        } as jwt.SignOptions
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY!
        } as jwt.SignOptions
    )
}

export const User = mongoose.model<UserDocument>("User", userSchema);