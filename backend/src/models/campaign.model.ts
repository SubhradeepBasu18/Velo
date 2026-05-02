import mongoose from "mongoose";
import type { CampaignType } from "../types/campaign.type.ts";

const campaignSchema = new mongoose.Schema<CampaignType>({
    
    campaignName: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    scheduledFor: {
        type: String,
        enum: ["now", "later"],
        default: "now",
        required: true
    },
    scheduledAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'failed'],
        default: 'pending',
    },
    recipientListURL: {
        type: String,
        required: true
    },
    messageBodyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    },
    analyticsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics",
    }
},{timestamps: true})

export const Campaign = mongoose.model("Campaign", campaignSchema)