import { CodeEditor } from "./CodeEditor";
import { ProblemDescription } from "./ProblemDescription";

export default function Problem({id} : {id: number}) {
    return <div className="flex">
        <ProblemDescription id={id}/>
        <CodeEditor id={id}/>
    </div>
}