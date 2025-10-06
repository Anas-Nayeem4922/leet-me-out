import SubmissionsList from "@/components/SubmissionsList";
import { problems } from "@/utils/problems";

export default async function Submissions({params} : {params: Promise<{problemTitle: string}>}) {
    const title = (await params).problemTitle;
    const problem = problems.find(p => p.title.replaceAll(' ', '-').toLowerCase() === title);
    return <div>
        {problem ? <SubmissionsList title={problem.title}/> : <div>No such problem exists</div>}
    </div>
}