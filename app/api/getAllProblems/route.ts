import { client } from "@/lib/prisma";

export async function GET() {
    const problems = await client.problems.findMany();
    return Response.json({
        problems,
    });
}
