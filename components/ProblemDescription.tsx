import { problems } from "@/utils/problems"

export function ProblemDescription({id} : {id: number}) {
    const problem = problems[id - 1];
    const constraints: string[] = problem.constraints.split(",");
    return <div className="bg-amber-100 text-slate-900 max-w-[50%] min-h-screen p-4">
        {/* Problem Statement */}
        <div className="text-lg font-extrabold mb-5">{problem.id}. {problem.title}</div>

        {/* Difficulty Level */}
        <div className="bg-amber-500 px-3 py-1.5 rounded-2xl text-sm inline">{problem.level}</div>

        {/* Description */}
        <div className="mt-8 mb-10 font-semibold">{problem.statement}</div>

        {/* Testcases */}
        {
            problem.exampleTestcases.map((p, id) => (
                <div key={id} className="font-medium text-lg my-2">
                    <p>Example {id}:</p>
                    <p>Input: {p.normalIO.input}</p>
                    <p>Output: {p.normalIO.output}</p>
                </div>
            ))
        }

        {/* Constraints */}
        <div className="mt-6">
            <div className="font-bold mb-2">Constraints:</div>
            {constraints.map((constraint, idx) => (
                <li key={idx} className="ml-4 text-sm bg-gray-100 px-4 py-1 rounded-2xl max-w-fit my-1.5">{constraint.trim()}</li>
            ))}
        </div>

        {/* Topics */}
        <div className="mt-6">
            <div className="font-medium">Topics</div>
                {
                    problem.topics.map((t, idx) => (
                        <span key={idx} className="text-sm bg-gray-100 px-4 py-1 rounded-2xl mx-1">{t}</span>
                    ))
                }
        </div>

        {/* Expected Complexities */}
        <div className="mt-6">
            <div className="font-semibold text-lg">Expected Complexities: </div>
            <p>Time Complexity: {problem.complexity.time}</p>
            <p>Space Complexity: {problem.complexity.space}</p>
        </div>
    </div>
}