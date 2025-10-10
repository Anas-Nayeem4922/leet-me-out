import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3).max(15),
    location: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
});
