import { Message } from "../models/message.model.ts";
import { MessageSchema } from "../types/schemas/Message.schema.ts";
import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts";

export const createNewMessage = asyncHandler(async(req, res) => {

    const parsedData = MessageSchema.safeParse(req.body);

    if (!parsedData.success) {
            const formattedErrors = parsedData.error.issues.reduce(
                (acc: Record<string, string>, issue) => {
                    const field = issue.path[0] as string;
                    acc[field] = issue.message;
                    return acc;
                },
                {}
            );
            throw new AppError("Validation failed", 400, formattedErrors);
    }

    const data = parsedData.data;

    const newMessage = await Message.create({
        title: data.title,
        body: data.body,
        subject: data.subject,
        customizationOptions: data.customizationOptions || {}
    })

    res.status(201).json({
        status: 'success',
        data: newMessage
    });
})