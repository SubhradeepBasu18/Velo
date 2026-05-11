export interface EmailJobData{
    campaignId: string;
    recipients: EmailRecipient[];
    subject: string;
    body: string;
    scheduleLater?: boolean;
    scheduleTime?: Date;
}

export interface EmailRecipient {
    email: string;
    name?: string;
}