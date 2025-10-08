type NormalIO = {
    input: string;
    output: string;
};

type Testcase = {
    input: string;
    output: string;
    normalIO: NormalIO;
};

type Boilerplate = {
    python: string;
    cpp: string;
    java: string;
    javascript: string;
    typescript: string;
    c: string;
};

type Complexity = {
    time: string;
    space: string;
};

export type ProblemType = {
    id: number;
    title: string;
    level: "Easy" | "Medium" | "Hard";
    statement: string;
    constraints: string;
    exampleTestcases: Testcase[];
    sampleTestcases: Testcase[];
    boilerplate: Boilerplate;
    topics: string[];
    complexity: Complexity;
};
