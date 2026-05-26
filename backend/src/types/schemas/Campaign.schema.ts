import { z } from "zod";

export const CampaignSchema = z
    .object({
        campaignName: z
            .string()
            .trim()
            .min(4, "Campaign name is required"),

        description: z
            .string()
            .trim()
            .max(
                200,
                "Description must be less than 200 characters"
            )
            .optional(),

        channel: z.enum(["email", "sms"]),

        groupName: z
            .string()
            .trim()
            .max(
                100,
                "Group name must be less than 100 characters"
            )
            .optional(),

        scheduledFor: z.enum(["now", "later"]),

        scheduledAt: z.coerce.date().optional(),

        // uploaded CSV source
        // recipientListURL: z
        //     .string()
        //     .url({
        //         message: "Invalid URL format",
        //     })
        //     .optional(),

        // manual recipients
        recipients: z.array(
            z.object({
                email: z.any(),
                name: z.any().optional()
            })
        ).optional(),

        messageBodyId: z
            .string()
            .min(1, "Message body ID is required"),

        analyticsId: z.string().optional(),
    })

    .superRefine((data, ctx) => {

        // scheduled validation
        if (
            data.scheduledFor === "later" &&
            !data.scheduledAt
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["scheduledAt"],
                message:
                    "Scheduled datetime required when scheduled for later",
            });
        }

        // at least one recipient source required
        // if (
        //     !data.recipientListURL &&
        //     !data.recipients?.length
        // ) {
        //     ctx.addIssue({
        //         code: "custom",
        //         path: ["recipientListURL"],
        //         message:
        //             "Provide CSV upload or manual recipients",
        //     });
        // }
    });

// This DTO is such that user can either upload csv or recipients jsonbody
// Both is also possible
// I dont want the recipientURL from the frontend
// We will generate the URL in controller -> not required in DTO