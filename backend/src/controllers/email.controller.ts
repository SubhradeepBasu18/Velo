import emailQueue from '../workers/queues/emailQueue.ts';
import type { Request, Response } from 'express';

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  await emailQueue.add('sendEmail', {
    to: email,
    subject: 'Welcome!',
    body: 'Hello from Velo!',
  });

  res.json({ success: true, message: 'Email job added to queue' });
};