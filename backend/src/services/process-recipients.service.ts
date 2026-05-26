import { validateRecipient } from "./recipient-validator.service.ts";
import type { EmailRecipient } from "../types/EmailJobData.type.ts";

export const processRecipients = async (
    recipients: any[]
): Promise<{
    validRecipients: EmailRecipient[];
    invalidRecipients: Array<{ recipient: any; reason: string }>;
}> => {

    const validRecipients: EmailRecipient[] = [];
    const invalidRecipients: Array<{ recipient: any; reason: string }> = [];

    for (const recipient of recipients) {
        const result = await validateRecipient(recipient);

        if (result.valid) {
            validRecipients.push(result.recipient);
        } else {
            invalidRecipients.push({
                recipient,
                reason:
                    result.reason
            });
        }
    }

    return {
        validRecipients,
        invalidRecipients
    };
};