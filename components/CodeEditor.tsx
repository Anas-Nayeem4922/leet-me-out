"use client";

import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ui/ChooseLanguage";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { languageId } from "@/utils/language-id";
import axios from "axios";
import { useSocket } from "@/hooks/SocketProvider";
import { SubmissionDetails, SubmissionParameters } from "@/types/Submission";
import { toast } from "sonner";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code, CodeXml } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { ProblemType } from "@/types/Problem";
import { useSession } from "next-auth/react";

export function CodeEditor({ problem }: { problem: ProblemType }) {
    const [language, setLanguage] = useState<string>("java");
    const boilerplate: Record<string, string> = problem.boilerplate;
    const [code, setCode] = useState<string>(boilerplate[language]);
    const [runResult, setRunResult] = useState<SubmissionDetails[]>();
    const [submitResult, setSubmitResult] = useState<SubmissionDetails[]>();
    const [loading, setLoading] = useState(false);

    const socket = useSocket();
    const router = useRouter();
    const session = useSession();

    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;

    const handleSubmission = async (type: "run" | "submit") => {
        setLoading(true);
        const testcases =
            type == "run" ? problem.exampleTestcases : problem.sampleTestcases;
        const submissions: SubmissionParameters[] = [];
        testcases.forEach((c) =>
            submissions.push({
                language_id: languageId.get(language) || 63,
                source_code: code,
                stdin: c.input,
                expected_output: c.output,
                cpu_time_limit: 2,
            })
        );
        const options = {
            method: "POST",
            url: `https://${apiHost}/submissions/batch`,
            params: {
                base64_encoded: "false",
            },
            headers: {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": apiHost,
                "Content-Type": "application/json",
            },
            data: {
                submissions,
            },
        };

        const response = await axios.request(options);
        const tokens: string[] = response.data.map(
            (t: { token: string }) => t.token
        );
        if (socket) {
            socket.send(tokens.join(","));
            socket.onmessage = (e) => {
                try {
                    const submissionResult: SubmissionDetails[] = JSON.parse(
                        e.data
                    );
                    if (submissionResult) {
                        type === "run"
                            ? setRunResult(submissionResult)
                            : setSubmitResult(submissionResult);
                        if (type === "submit") {
                            let status = "Accepted";
                            let error: string = "";
                            for (let i = 0; i < submissionResult.length; i++) {
                                let s = submissionResult[i];
                                if (s.status == "Wrong Answer") {
                                    status = s.status;
                                    error = JSON.stringify({
                                        stdin: problem.sampleTestcases[i]
                                            .normalIO.input,
                                        expected_output: s.expected_output,
                                        stdout: s.stdout,
                                    });
                                    break;
                                } else if (s.status == "Compilation Error") {
                                    status = s.status;
                                    error = JSON.stringify({
                                        compile_output: s.compile_output,
                                    });
                                    break;
                                } else if (s.status == "Runtime Error (NZEC)") {
                                    status = s.status;
                                    error = JSON.stringify({
                                        stderr: JSON.stringify({
                                            stderr: s.stderr,
                                        }),
                                    });
                                    break;
                                }
                            }
                            createSubmission(status, error);
                        }
                    }
                    setLoading(false);
                } catch (err) {
                    toast.error("Error in submitting code");
                }
            };
        }
    };

    const createSubmission = async (status: string, error: string) => {
        try {
            const response = await axios.post("/api/submission", {
                language: language.toUpperCase(),
                name: problem.title,
                level: problem.level,
                status,
                topics: problem.topics,
                error,
            });
            const id = response.data.id;
            router.push(
                `/problem/${problem.title
                    .replaceAll(" ", "-")
                    .toLowerCase()}/submissions/${id}`
            );
        } catch (err) {
            toast.error("Error in submitting the problem");
        }
    };

    useEffect(() => {
        setCode(boilerplate[language]);
    }, [language]);

    return (
        <div className='h-screen flex flex-col bg-editor-black rounded-xl'>
            <div className='min-w-full max-h-[42px] px-6 bg-gray flex justify-between items-center rounded-t-xl mb-4'>
                <div className='flex items-center gap-2 '>
                    <Code className='h-6 w-6 text-dark-green' />
                    <span className='text-white font-bold'>Code</span>
                </div>
                <div>
                    <ChooseLanguage
                        language={language}
                        setLanguage={setLanguage}
                    />
                </div>
            </div>
            <ResizablePanelGroup
                direction='vertical'
                className='flex-1 min-h-0'
            >
                <ResizablePanel defaultSize={60}>
                    <div className='flex flex-col h-full'>
                        <div className='flex-1 min-h-0'>
                            <Editor
                                className='w-full h-full'
                                language={language}
                                theme='vs-dark'
                                value={code}
                                onChange={(v) => setCode(v || "")}
                                options={{
                                    fontSize: 16,
                                    minimap: { enabled: false },
                                    hover: { enabled: false },
                                    quickSuggestions: false,
                                    parameterHints: { enabled: false },
                                    suggestOnTriggerCharacters: false,
                                    acceptSuggestionOnEnter: "off",
                                    tabCompletion: "off",
                                    wordBasedSuggestions: "off",
                                    suggest: {
                                        snippetsPreventQuickSuggestions: false,
                                    },
                                    inlineSuggest: { enabled: false },
                                }}
                            />
                        </div>
                        {session.data && session.data.user ? (
                            <div className='flex justify-end pr-5 py-2 gap-5 items-center bg-editor-black'>
                                {loading ? (
                                    <Button
                                        className='bg-dark-green px-4 py-2 font-semibold'
                                        disabled
                                    >
                                        <Spinner />
                                        Pending
                                    </Button>
                                ) : (
                                    <div className='flex gap-5'>
                                        <Button
                                            className='cursor-pointer bg-gray font-semibold hover:bg-gray/80'
                                            onClick={() =>
                                                handleSubmission("run")
                                            }
                                        >
                                            Run
                                        </Button>
                                        <Button
                                            className='cursor-pointer bg-dark-green font-semibold hover:bg-dark-green/95'
                                            onClick={() =>
                                                handleSubmission("submit")
                                            }
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex py-2 pl-4 text-gray-300'>
                                <span
                                    onClick={() => router.push("/signup")}
                                    className='hover:text-white transition-all duration-200 cursor-pointer'
                                >
                                    Register
                                </span>{" "}
                                &nbsp; or &nbsp;{" "}
                                <span
                                    onClick={() => router.push("/signin")}
                                    className='hover:text-white transition-all duration-200 cursor-pointer'
                                >
                                    Log in
                                </span>
                            </div>
                        )}
                    </div>
                </ResizablePanel>
                <ResizableHandle className='bg-slate-900' withHandle />
                <ResizablePanel defaultSize={40}>
                    <div className='h-full overflow-y-auto pb-4 bg-dark-gray p-4 rounded-b-xl'>
                        <div className='min-w-full bg-gray text-zinc-100 flex gap-2 mb-4 px-4 py-2 -mt-4 -mx-4'>
                            <CodeXml className='text-dark-green' /> Test Result
                        </div>
                        {runResult &&
                        (runResult[0].compile_output || runResult[0].stderr) ? (
                            <div>
                                <p className='text-dark-red font-bold text-xl'>
                                    {runResult[0].status}
                                </p>
                                <div className='bg-dark-red/10 text-dark-red px-4 py-4 mt-6 rounded-md'>
                                    {runResult[0].compile_output}
                                    {runResult[0].stderr}
                                </div>
                            </div>
                        ) : (
                            <Tabs defaultValue='case-0' className='w-full'>
                                <TabsList>
                                    {problem.exampleTestcases.map((_, idx) => (
                                        <TabsTrigger
                                            className='cursor-pointer'
                                            key={idx}
                                            value={`case-${idx}`}
                                        >
                                            Case {idx + 1}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {problem.exampleTestcases.map((p, idx) => (
                                    <TabsContent
                                        key={idx}
                                        value={`case-${idx}`}
                                        className='mt-4'
                                    >
                                        {runResult && (
                                            <span
                                                className={`font-semibold text-xl ${
                                                    runResult[idx].status ===
                                                    "Accepted"
                                                        ? "text-dark-green"
                                                        : "text-dark-red"
                                                }`}
                                            >
                                                {runResult[idx].status}
                                            </span>
                                        )}
                                        <p className='mt-2 mb-2 font-semibold text-zinc-200'>
                                            Input:
                                        </p>
                                        <pre className='whitespace-pre bg-gray p-2 rounded text-white'>
                                            {p.normalIO.input}
                                        </pre>
                                        {runResult && (
                                            <div className='flex flex-col gap-4 mt-6'>
                                                <div>
                                                    <p className='font-semibold my-2 text-zinc-200'>
                                                        Output
                                                    </p>
                                                    <div className='whitespace-pre bg-gray p-2 rounded text-white'>
                                                        {runResult[idx].stdout}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='font-semibold text-zinc-200 my-2'>
                                                        Expected
                                                    </p>
                                                    <div className='whitespace-pre bg-gray p-2 rounded text-white'>
                                                        {
                                                            runResult[idx]
                                                                .expected_output
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
