import { Submissions, User } from "@/app/generated/prisma";
import { authOptions } from "@/lib/options";
import { client } from "@/lib/prisma";
import { userSchema } from "@/schema/user";
import { getServerSession } from "next-auth";

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
            submissions: submissions.slice(0, 10),
            user,
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

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            message: "User not logged-in",
        });
    }
    try {
        const body = await req.json();
        const { success, error, data } = userSchema.safeParse(body);
        if (success) {
            const userId = user.id;
            await client.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name: data.name,
                    github: data.github,
                    linkedin: data.linkedin,
                    website: data.website,
                    location: data.location,
                    twitter: data.twitter,
                    profileImage: data.github + ".png",
                },
            });
            return Response.json(
                {
                    message: "Profile Updated",
                },
                { status: 200 }
            );
        } else {
            console.log(error);
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
                message: "Error in updating details",
            },
            { status: 500 }
        );
    }
}
