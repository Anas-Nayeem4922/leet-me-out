import { Submissions } from "@/app/generated/prisma";
import { client } from "@/lib/prisma";

export interface UserInfo {
    Easy: number;
    Medium: number;
    Hard: number;
    languages: {
        CPP: number;
        JAVA: number;
        PYTHON: number;
        JAVASCRIPT: number;
        TYPESCRIPT: number;
        C: number;
    };
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username") as string;
        const user = await client.user.findFirst({
            where: {
                username,
            },
        });
        if (!user) {
            return Response.json(
                {
                    message: "No user exists with this username",
                },
                { status: 403 }
            );
        }
        const allSubmissions = await client.submissions.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                submittedAt: "asc",
            },
        });
        const submissionsMap = new Map<string, Submissions>();
        allSubmissions.forEach((s) => {
            if (s.status == "Accepted") submissionsMap.set(s.name, s);
        });
        const submissions = Array.from(submissionsMap.values());
        let userInfo: UserInfo = {
            Easy: 0,
            Medium: 0,
            Hard: 0,
            languages: {
                CPP: 0,
                JAVA: 0,
                PYTHON: 0,
                JAVASCRIPT: 0,
                TYPESCRIPT: 0,
                C: 0,
            },
        };
        submissions.forEach((s) => {
            userInfo[s.level]++;
            userInfo.languages[s.language]++;
        });
        return Response.json({
            message: "Success",
            userInfo,
            submissions,
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
