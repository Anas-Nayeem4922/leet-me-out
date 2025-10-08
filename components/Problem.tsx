import { ProblemType } from "@/types/Problem";
import { CodeEditor } from "./CodeEditor";
import { ProblemDescription } from "./ProblemDescription";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";

export default function Problem({ problem }: { problem: ProblemType }) {
    return (
        <ResizablePanelGroup direction='horizontal' className='p-4 bg-black'>
            <ResizablePanel defaultSize={50}>
                <ProblemDescription problem={problem} />
            </ResizablePanel>
            <ResizableHandle withHandle className='w-2 bg-black' />
            <ResizablePanel defaultSize={50}>
                <CodeEditor problem={problem} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
