import { z } from "zod";

export const userSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    organization: z.string().optional(),
    refreshToken: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})
