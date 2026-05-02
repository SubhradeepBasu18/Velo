import {z} from "zod";

export const CampaignSchema = z.object({
    campaignName: z.string().min(1, "Campaign name is required"),
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