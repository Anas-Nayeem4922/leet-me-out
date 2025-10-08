import CodeSubmissionComponent from "@/components/CodeSubmission";
import { authOptions } from "@/lib/options";
import { client } from "@/lib/prisma";
import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";
import { getServerSession } from "next-auth";

export default async function CodeSubmission({
    params,
}: {
    params: Promise<{ submissionId: number }>;
}) {
    const submissionId = (await params).submissionId;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return <div>User not logged-in</div>;
    }
    const userId = session.user.id;
    let problem: ProblemType | undefined;
    const submission = await client.submissions.findFirst({
        where: {
            userId,
            id: Number(submissionId),
        },
    });
    const problems: ProblemType[] = await getProblems();
    problem = problems.find((p) => p.title == submission?.name);
    if (!problem) {
        return <div>No problem exists</div>;
    }
    return (
        <div>
            <CodeSubmissionComponent
                submissionId={submissionId}
                problem={problem}
            />
        </div>
    );
}
