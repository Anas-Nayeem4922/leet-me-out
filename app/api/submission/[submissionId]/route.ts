import { User } from "@/app/generated/prisma";
import { authOptions } from "@/lib/options";
import { client } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ submissionId: string }> }
) {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "User not logged-in" },
            { status: 401 }
        );
    }

    try {
        const submissionId = Number((await params).submissionId);
        if (isNaN(submissionId)) {
            return NextResponse.json(
                { message: "Invalid submission ID" },
                { status: 400 }
            );
        }

        const userId = user.id;
        const submission = await client.submissions.findFirst({
            where: {
                userId,
                id: submissionId,
            },
        });

        if (submission) {
            return NextResponse.json({ submission });
        }

        return NextResponse.json(
            { message: "No such submission exists" },
            { status: 403 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error in getting this submission" },
            { status: 500 }
        );
    }
}
