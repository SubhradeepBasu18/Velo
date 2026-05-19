import { Campaign } from "../models/campaign.model.ts";
import { Message } from "../models/message.model.ts";

import { CampaignSchema } from "../types/schemas/Campaign.schema.ts";

import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts";

import type { AuthRequest } from "../types/express.type.ts";
import { parseCSVBuffer } from "../utils/parseCSVBuffer.ts";
import { mergeRecipients } from "../utils/mergeRecipients.ts";
import { generateCSVBuffer } from "../utils/generateCSV.ts";
import { uploadCSVToCloudinary } from "../utils/uploadCSVToCloudinary.ts";
import { appendEmailToQueue } from "../utils/AppendQueue.ts";

export const createCampaign = asyncHandler(async (req: AuthRequest, res) => {
        
    if (req.body.recipients) {
            try {
                req.body.recipients = JSON.parse(req.body.recipients);
            } catch {
                throw new AppError(
                    "Invalid recipients JSON format",
                    400
                );
            }
        }

        // validate request
        const parsedData = CampaignSchema.safeParse(req.body);

        if (!parsedData.success) {
            const formattedErrors =
                parsedData.error.issues.reduce(
                    (
                        acc: Record<string, string>,
                        issue
                    ) => {
                        const field = issue.path[0] as string;
                        acc[field] = issue.message;
                        return acc;
                    },
                    {}
                );
            throw new AppError(
                "Validation failed",
                400,
                formattedErrors
            );
        }

        const data = parsedData.data;

        // validate auth
        if (!req.user) {
            throw new AppError(
                "Unauthorized",
                401
            );
        }

        // validate message template
        const messageTemplate = await Message.findById(
            data.messageBodyId
        );

        if (!messageTemplate) {
            throw new AppError(
                "Message template not found",
                404
            );
        }

        // parse uploaded CSV if exists
        let csvRecipients: any[] = [];

        if (req.file) {
            csvRecipients = await parseCSVBuffer(req.file.buffer);
        }

        // merge all recipients
        const finalRecipients = mergeRecipients(
            csvRecipients,
            data.recipients || []
        );

        // validate recipients
        if (!finalRecipients.length) {
            throw new AppError(
                "No valid recipients found",
                400
            );
        }

        // generate normalized csv
        const csvBuffer = generateCSVBuffer(finalRecipients);

        // upload final csv
        const finalCSVUrl =
            await uploadCSVToCloudinary(
                csvBuffer,
                `campaign-${Date.now()}`
            );

        // prepare campaign
        const campaignData: any = {

            campaignName:
                data.campaignName,

            channel:
                data.channel,

            createdBy:
                req.user._id,

            scheduledFor:
                data.scheduledFor,

            recipientListURL:
                finalCSVUrl,

            messageBodyId:
                data.messageBodyId,

            status: "pending",
        };

        // optional fields
        if (data.description) {
            campaignData.description = data.description;
        }

        if (data.groupName) {
            campaignData.groupName = data.groupName;
        }

        if (data.scheduledAt) {
            campaignData.scheduledAt = data.scheduledAt;
        }

        if (data.analyticsId) {
            campaignData.analyticsId = data.analyticsId;
        }

        // create campaign
        const campaign = await Campaign.create(campaignData);

        appendEmailToQueue({
            campaignId: campaign._id.toString(),
            recipients: finalRecipients,
            subject: messageTemplate.subject,
            body: messageTemplate.body,
            scheduleLater: !!data.scheduledAt,
            scheduleTime: data.scheduledAt || new Date(),
        });

        return res.status(201).json({
            success: true,
            message: "Campaign created successfully",
            data: campaign,
        });
    }
);