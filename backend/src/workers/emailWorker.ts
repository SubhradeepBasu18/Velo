import { Worker } from "bullmq";

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD
}

const worker = new Worker(
    'emailQueue',
    async (job) => {
        console.log(`Processing job ${job.id}:`, job.data);
    },
    {connection}
);

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with error: ${err.message}`);
});