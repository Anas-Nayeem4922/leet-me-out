import { CodeEditor } from "@/components/CodeEditor";
import SubmissionsList from "@/components/SubmissionsList";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
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
                <ResizablePanelGroup
                    direction='horizontal'
                    className='p-4 bg-black'
                >
                    <ResizablePanel defaultSize={50}>
                        <SubmissionsList title={problem.title} />
                    </ResizablePanel>
                    <ResizableHandle withHandle className='w-2 bg-black' />
                    <ResizablePanel defaultSize={50}>
                        <CodeEditor problem={problem} />
                    </ResizablePanel>
                </ResizablePanelGroup>
            ) : (
                <div>No such problem exists</div>
            )}
        </div>
    );
}
