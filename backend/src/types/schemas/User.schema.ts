import { z } from "zod";

export const userSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    lastName: z.string().min(1, "Last name is required"),

    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    organization: z.string().optional(),

    refreshToken: z.string().optional(),

    providerType: z.enum(["auth0", "custom"]),

    createdAt: z.date().optional(),

    updatedAt: z.date().optional()
  })
//   .superRefine((data, ctx) => {
//     // If providerType is custom -> password required
//     if (data.providerType === "custom" && !data.password) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["password"],
//         message: "Password is required for custom users"
//       });
//     }

//     // If providerType is auth0 -> password should not be sent (optional rule)
//     if (data.providerType === "auth0" && data.password) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["password"],
//         message: "Password should not be provided for Auth0 users"
//       });
//     }
//   });


export const registerUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),

    lastName: z.string().min(1, "Last name is required"),

    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),

    organization: z.string().optional(),

    providerType: z.enum(["auth0", "custom"]),
})

export const loginUserSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})