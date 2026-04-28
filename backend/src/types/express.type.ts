import type { Request } from "express";
import type { UserDocument } from "./User.type.ts";

export interface AuthRequest extends Request {
    user?: UserDocument;
}
