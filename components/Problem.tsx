import { CodeEditor } from "./CodeEditor";
import { ProblemDescription } from "./ProblemDescription";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";

export default function Problem({ id }: { id: number }) {
    return (
        <ResizablePanelGroup direction='horizontal' className='p-4 bg-black'>
            <ResizablePanel defaultSize={50}>
                <ProblemDescription id={id} />
            </ResizablePanel>
            <ResizableHandle withHandle className='w-2 bg-black' />
            <ResizablePanel defaultSize={50}>
                <CodeEditor id={id} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
