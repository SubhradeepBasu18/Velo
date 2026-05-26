import { configDotenv } from "dotenv";
configDotenv({quiet: true})
import { Worker } from "bullmq";
import { BlockedEmail } from "../models/blocked-email.model.ts";

const connection = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "velo-redis-queue"
};

new Worker(
    "badEmailQueue",

    async (job) => {
        const { recipient, reason } = job.data;
        const email = recipient.email;

        console.log("Bad email:", email, reason);

        await BlockedEmail.updateOne(
            { email },
            {
                email,
                reason
            },
            {
                upsert: true
            }
        );
    },

    { connection }
);