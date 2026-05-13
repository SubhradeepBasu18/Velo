import { configDotenv } from "dotenv";
configDotenv({quiet: true})

import nodemailer from "nodemailer";

export const SMTPConfig = () => {
    return nodemailer.createTransport({
        pool: true, // Pool connections for better performance
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}

export const sendEmail = async(
    to: string,
    subject: string,
    text: string
) => {
    const transport = SMTPConfig();

    // transport.verify()
    // .then(() => console.log('SMTP connected successfully'))
    // .catch(console.error);

    return await transport.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        text
    });
}