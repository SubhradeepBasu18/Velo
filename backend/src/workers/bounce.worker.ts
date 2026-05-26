import { configDotenv } from "dotenv";
configDotenv({ quiet: true });

import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

import badEmailQueue
    from "./queues/badEmailQueue.ts";

export const processBounces =
    async () => {

        console.log(
            "Checking bounces..."
        );

        // create fresh client every run
        const client =
            new ImapFlow({
                host: process.env.BOUNCE_HOST!,
                port: Number(process.env.BOUNCE_PORT),
                secure: process.env.BOUNCE_SECURE === "true",
                auth: {
                    user: process.env.BOUNCE_EMAIL!,
                    pass: process.env.BOUNCE_PASS!
                },

                // disable huge logs
                logger: false
            });

        await client.connect();

        const lock = await client.getMailboxLock("INBOX");

        try {
            // last 5 minutes
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

            // search only likely bounce emails
            const messageIds = await client.search({
                    seen: false,
                    since:
                        fiveMinutesAgo,

                    from:
                        "mailer-daemon@googlemail.com"
            });

            if (!messageIds) {
                return;
            }

            for await (const message of client.fetch(
                    messageIds,
                    {
                        uid: true,
                        source: true
                    }
                )
            ) {

                if (!message.source) {
                    continue;
                }

                const parsed = await simpleParser(message.source);

                const subject = parsed.subject?.toLowerCase() || "";

                const text = parsed.text || "";

                // extra safety
                const isBounce =
                    subject.includes(
                        "address not found"
                    ) ||
                    subject.includes(
                        "delivery"
                    ) ||
                    subject.includes(
                        "undelivered"
                    ) ||
                    text.includes(
                        "550"
                    );

                if (!isBounce) {
                    continue;
                }

                // Gmail wording:
                // "Your message wasn't delivered to manual@gmail.com..."
                const match = text.match(
                        /wasn't delivered to\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i
                );

                if (!match?.[1]) {
                    continue;
                }

                const bouncedEmail = match[1].trim().toLowerCase();

                console.log("Bounced:", bouncedEmail);

                await badEmailQueue.add(
                    "bounceEmail",
                    {
                        recipient: {
                            email:
                                bouncedEmail
                        },

                        reason:
                            "bounce"
                    }
                );

                // prevent reprocessing
                await client.messageFlagsAdd(message.uid, ["\\Seen"]);
            }

        } catch (error) {
            console.error("Bounce worker error:",error);

        } finally {
            lock.release();
            await client.logout();
        }
    };