import {z} from "zod";

export const CampaignSchema = z.object({
    campaignName: z.string().min(4, "Campaign name is required"),
    description: z.string().max(200, "Description must be less than 200 characters").optional(),
    channel: z.enum(["email", "sms"]),
    groupName: z.string().max(100, "Group name must be less than 100 characters").optional(),
    createdBy: z.string().min(1, "Created by is required"),
    scheduledFor: z.enum(["now", "later"]),
    scheduledAt: z.date().optional(),
    status: z.enum(["pending", "in-progress", "completed", "failed"]),
    recipientListURL: z.string().min(1, "Recipient list URL is required"),
    messageBodyId: z.string().min(1, "Message body ID is required"),
    analyticsId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})
.superRefine((data, ctx) => {

    // if scheduled for later, then Datetime must be present
    if(data.scheduledFor === "later" && !data.scheduledAt){
        ctx.addIssue({
            code: "custom",
            path: ["scheduledAt"],
            message: "Scheduled datetime is required when scheduled for later"
        });
    }
})