import { Queue } from "bullmq";

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD
}

const badEmailQueue = new Queue("badEmailQueue", {
    connection
})

export default badEmailQueue
