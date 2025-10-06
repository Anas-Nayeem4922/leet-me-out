import { Language, Level } from "@/app/generated/prisma";
import { z } from "zod";

export const submissionSchema = z.object({
    name: z.string(),
    level: z.enum(Level),
    status: z.string(),
    language: z.enum(Language),
    topics: z.array(z.string()),
});
