import { configDotenv } from "dotenv";
configDotenv({ quiet: true });

import nodemailer from "nodemailer";
import { BlockedEmail } from "../models/blocked-email.model.ts";

export const SMTPConfig = () => {
    return nodemailer.createTransport({
        pool: true,
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export const sendEmail = async (
    to: string,
    subject: string,
    text: string
) => {
    const transporter =
        SMTPConfig();

    try {
        const response = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
        });

        return response;

    } catch (error: any) {
        console.error(
            `Email failed for ${to}`,
            error
        );

        // hard bounce / mailbox not found
        if ( error?.responseCode === 550) {
            await BlockedEmail.updateOne(
                { email: to },
                {
                    email: to,
                    reason: "bounce"
                },
                {
                    upsert: true
                }
            );

            console.log(
                `Blocked email added: ${to}`
            );
        }

        throw error;
    }
};