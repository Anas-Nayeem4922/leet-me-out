import Problem from "@/components/Problem";
import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";

export default async function ProblemTitle({
    params,
}: {
    params: Promise<{ problemTitle: string }>;
}) {
    const problemTitle = (await params).problemTitle;
    const problems: ProblemType[] = await getProblems();
    const problem = problems.find(
        (p) => p.title.replaceAll(" ", "-").toLowerCase() === problemTitle
    );
    return (
        <div>
            {problem ? (
                <Problem problem={problem} />
            ) : (
                <div>No such problem exists</div>
            )}
        </div>
    );
}
