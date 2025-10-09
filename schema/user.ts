import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3).max(15).optional(),
    location: z.string().optional(),
    website: z.url().optional(),
    github: z.url().optional(),
    twitter: z.url().optional(),
    linkedin: z.url().optional(),
});
