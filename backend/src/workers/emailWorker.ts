import { configDotenv } from "dotenv";
configDotenv({quiet: true})

import { Worker } from "bullmq";
import { sendEmail } from "../services/email.service.ts";

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || 'add-pass-if-required'
}

const worker = new Worker(
    'emailQueue',
    async (job) => {
        const { to, subject, body, recipientName, campaignId } = job.data;
        
        console.log(`Processing email job ${job.id}:`, {
            to,
            subject,
            recipientName,
            campaignId
        });
        
        const {response} = await sendEmail(to, subject, body);
        console.log(`Email sent successfully to ${to}`);
    },
    {
        connection, 
        limiter: { // 10 emails in 1 second
            max: 10, 
            duration: 1000
        }
    }
);

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with error: ${err.message}`);
});