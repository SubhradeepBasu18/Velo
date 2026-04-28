import mongoose from "mongoose";
import type { UserDocument, UserType } from "../types/User.type.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema<UserDocument>({
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
    },
    providerType: {
        type: String,
        enum: ["auth0", "custom"],
        default: "custom",
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function(next: any) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function(password: string){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET!,
        // Below block was misinterpreted as callback instead of options
        // So explicitly type annotated to jwt signing methods
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        } as jwt.SignOptions
    )
};

userSchema.methods.generateRefreshToken = function(){
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