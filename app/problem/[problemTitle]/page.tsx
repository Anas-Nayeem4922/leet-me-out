import Problem from "@/components/Problem";
import { problems } from "@/utils/problems";

export default async function ProblemTitle({params} : {params: Promise<{problemTitle: string}>}) {
    const problemTitle = (await params).problemTitle;
    const problem = problems.find(p => p.title.replaceAll(' ', '-').toLowerCase() === problemTitle);
    return <div>
        {problem ? <Problem id={problem.id}/> : <div>No such problem exists</div>}
    </div>
}