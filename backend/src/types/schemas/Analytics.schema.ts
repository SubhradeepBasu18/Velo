import { z } from "zod";

export const AnalyticsSchema = z.object({
  successCount: z.number().int().nonnegative(), 
  failureCount: z.number().int().nonnegative(), 
  errors: z.array(z.string()).optional(), 
  createdAt: z.date().optional(), 
  updatedAt: z.date().optional(), 
});