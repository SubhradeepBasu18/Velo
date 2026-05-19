// Will accept job data and add it to the queue
// This is for Email only now!
// After campaign is created, call this function to add jobs to the queue
// Return if the jobs are added are queue with schedule time (now or later)

import type { EmailJobData, FailedJobData } from "../types/EmailJobData.type.ts";
import dlq from "../workers/queues/dlq.ts";
import emailQueue from "../workers/queues/emailQueue.ts";

export const appendEmailToQueue = async(emailJobData: EmailJobData) => {
    const { recipients, ...jobData } = emailJobData;
    const results = {
        success: 0,
        failed: 0,
        failedEmails: [] as string[]
    };

    const delay = jobData.scheduleLater && jobData.scheduleTime ? jobData.scheduleTime.getTime() - Date.now() : 0;

    for (const recipient of recipients) {
        try {
            await emailQueue.add('sendEmail', {
                ...jobData,
                to: recipient.email,
                recipientName: recipient.name
            }, {
                delay,
                attempts: 2,
                backoff: {
                    type: "fixed",
                    delay: 3000 // 3 seconds
                }
            });
            results.success++;
        } catch (error) {
            results.failed++;
            results.failedEmails.push(recipient.email);
            console.error(`Failed to add email for ${recipient.email}:`, error);
        }
    }

    return results;
};

export const appendFailedTasksToDLQ = async(failedJobData: FailedJobData) => {
    await dlq.add('failedTask', failedJobData);
}