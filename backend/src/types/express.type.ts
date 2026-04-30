import type { Request } from "express";
import type { UserDocument } from "./User.type.ts";
import type { AuthResult } from "express-oauth2-jwt-bearer";

export interface AuthRequest extends Request {
    user?: UserDocument | null;
    auth?: AuthResult;
}