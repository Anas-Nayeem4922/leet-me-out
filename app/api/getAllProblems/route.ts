import { client } from "@/lib/prisma";

export async function GET() {
    const problems = await client.problems.findMany({
        orderBy: {
            id: "asc",
        },
    });
    return Response.json({
        problems,
    });
}
