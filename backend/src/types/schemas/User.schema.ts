import { z } from "zod";

export const userSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    lastName: z.string().min(1, "Last name is required"),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters").optional(),

    organization: z.string().optional(),

    refreshToken: z.string().optional(),

    providerType: z.enum(["auth0", "custom"]),

    createdAt: z.date().optional(),

    updatedAt: z.date().optional()
  })
  .superRefine((data, ctx) => {
    // If providerType is custom -> password required
    if (data.providerType === "custom" && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password is required for custom users"
      });
    }

    // If providerType is auth0 -> password should not be sent (optional rule)
    if (data.providerType === "auth0" && data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password should not be provided for Auth0 users"
      });
    }
  });
