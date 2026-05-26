import { z } from "zod";

export const RecipientSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email"),

    name: z
        .string()
        .optional()
});

export type Recipient =
    z.infer<typeof RecipientSchema>;