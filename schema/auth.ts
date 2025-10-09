import { z } from "zod";

export const authSchema = z.object({
    username: z
        .string()
        .min(3, "Username must contain 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "The username must contain only letters, numbers, hyphens and underscores."
        ),
    password: z.string().min(6, "Password must contain atleast 6 characters"),
});
