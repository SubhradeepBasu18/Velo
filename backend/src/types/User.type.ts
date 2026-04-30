import { Document } from "mongoose";

export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organization?: string;
    refreshToken?: string;
    providerType?: string;
    auth0Id?: string;
}

export interface UserDocument extends Document, UserType {
    isPasswordMatch(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}
