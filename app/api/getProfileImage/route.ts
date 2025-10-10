import { client } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username") as string;
        const userProfile = await client.user.findFirst({
            where: {
                username,
            },
            select: {
                profileImage: true,
            },
        });
        return Response.json({
            image: userProfile,
        });
    } catch (err) {
        return Response.json({
            message: "Error in fetching url",
        });
    }
}
