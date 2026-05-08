import { Campaign } from "../models/campaign.model.ts";
import type { AuthRequest } from "../types/express.type.ts";
import { CampaignSchema } from "../types/schemas/Campaign.schema.ts";
import AppError from "../utils/AppError.ts";
import asyncHandler from "../utils/AsycHandler.ts";

export const createCampaign = asyncHandler(async (req: AuthRequest, res) => {
    // Validate request body
    const parsedData = CampaignSchema.safeParse(req.body);
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

    // Prepare campaign object
    const campaignData: Record<string, any> = {
        campaignName: data.campaignName,
        channel: data.channel,
        createdBy: req?.user?._id.toString(),
        scheduledFor: data.scheduledFor || "now",
        recipientListURL: data.recipientListURL,
        messageBodyId: data.messageBodyId,
        status: data.status
    };

    // Add optional fields only if they have values
    if (data.description !== undefined) campaignData.description = data.description;
    if (data.groupName !== undefined) campaignData.groupName = data.groupName;
    if (data.scheduledFor === "later" && data.scheduledAt) campaignData.scheduledAt = data.scheduledAt;
    if (data.analyticsId !== undefined) campaignData.analyticsId = data.analyticsId;

    // Save campaign to DB
    const campaign = await Campaign.create(campaignData);

    // Return response
    res.status(201).json({
        success: true,
        message: "Campaign created successfully",
        data: campaign
    });
});