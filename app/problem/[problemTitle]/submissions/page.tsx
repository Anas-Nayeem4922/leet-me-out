import SubmissionsList from "@/components/SubmissionsList";
import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";

export default async function Submissions({
    params,
}: {
    params: Promise<{ problemTitle: string }>;
}) {
    const title = (await params).problemTitle;
    const problems: ProblemType[] = await getProblems();
    const problem = problems.find(
        (p) => p.title.replaceAll(" ", "-").toLowerCase() === title
    );
    return (
        <div>
            {problem ? (
                <SubmissionsList title={problem.title} />
            ) : (
                <div>No such problem exists</div>
            )}
        </div>
    );
}
