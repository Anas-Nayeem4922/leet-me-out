import { User } from "@/app/generated/prisma";
import { authOptions } from "@/lib/options";
import { client } from "@/lib/prisma";
import { submissionSchema } from "@/schema/submission";
import { problems } from "@/utils/problems";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            message: "User not logged-in",
        });
    }
    try {
        const userId = user.id;
        const body = await req.json();
        const { success, error, data } = submissionSchema.safeParse(body);
        if (success) {
            await client.submissions.create({
                data: {
                    language: data.language,
                    level: data.level,
                    name: data.name,
                    status: data.status,
                    topics: data.topics,
                    userId,
                },
            });
            return Response.json({
                message: "Code submitted successfully",
            });
        } else {
            return Response.json(
                {
                    message: error,
                },
                { status: 411 }
            );
        }
    } catch (err) {
        return Response.json(
            {
                message: err,
            },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            message: "User not logged-in",
        });
    }
    try {
        const userId = user.id;
        const { searchParams } = new URL(req.url);
        let title = searchParams.get("title") as string;

        const submissions = await client.submissions.findMany({
            where: {
                userId,
                name: title,
            },
        });
        return Response.json({
            message: submissions,
        });
    } catch (err) {
        return Response.json(
            {
                message: err,
            },
            { status: 500 }
        );
    }
}
