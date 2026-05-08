import { Types, Document } from "mongoose";

export interface CampaignType extends Document{
    campaignName: string;
    description?: string;
    channel: "email" | "sms";
    groupName?: string;
    createdBy: Types.ObjectId;
    scheduledFor: "now" | "later";
    scheduledAt?: Date;
    status: "pending" | "in-progress" | "completed" | "failed";
    recipientListURL: string;
    messageBodyId: Types.ObjectId;
    analyticsId?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

