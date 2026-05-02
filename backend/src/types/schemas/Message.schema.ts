import {z} from "zod";

export const MessageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
    subject: z.string().min(1, "Subject is required"),
    customizationOptions: z.record(z.string(), z.any()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})