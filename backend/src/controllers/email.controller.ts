import emailQueue from '../workers/queues/emailQueue.ts';
import dlq from '../workers/queues/dlq.ts';
import badEmailQueue from '../workers/queues/badEmailQueue.ts';
import type { Request, Response } from 'express';

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  await emailQueue.add('sendEmail', {
    to: email,
    subject: 'Welcome!',
    body: 'Hello from Velo!',
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });

  res.json({ success: true, message: 'Email job added to queue' });
};

export async function listDLQJobs() {
  // Fetch jobs that are waiting to be processed
  const waitingJobs = await dlq.getJobs(['waiting', 'delayed']);
  console.log('Waiting jobs in DLQ:', waitingJobs.map(j => ({
    id: j.id,
    data: j.data,
    failedReason: j.failedReason,
    timestamp: j.timestamp
  })));

  // Fetch jobs that have failed (completed is rare for DLQ)
  const failedJobs = await dlq.getJobs(['failed']);
  console.log('Failed jobs in DLQ:', failedJobs.map(j => ({
    id: j.id,
    data: j.data,
    failedReason: j.failedReason
  })));
}
