"use client"

import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ui/ChooseLanguage";
import Editor from "@monaco-editor/react"
import { problems } from "@/utils/problems";
import { Button } from "./ui/button";
import { languageId } from "@/utils/language-id";
import axios from "axios";
import { useSocket } from "@/hooks/SocketProvider";
import { SubmissionDetails, SubmissionParameters } from "@/types/Submission";
import { toast } from "sonner";

export function CodeEditor({id} : {id: number}) {
    const [language, setLanguage] = useState<string>("java");
    const problem = problems[id - 1];
    const boilerplate: Record<string, string> = problem.boilerplate;
    const [code, setCode] = useState<string>(boilerplate[language]);
    const [runResult, setRunResult] = useState<SubmissionDetails[]>();
    const [submitResult, setSubmitResult] = useState<SubmissionDetails[]>();
    const socket = useSocket();

    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;

    const handleSubmission = async(type: "run" | "submit") => {
        const testcases = type == "run" ? problem.exampleTestcases : problem.sampleTestcases;
        const submissions: SubmissionParameters[] = [];
        testcases.forEach(c => submissions.push({
            language_id: languageId.get(language) || 63,
            source_code: code,
            stdin: c.input,
            expected_output: c.output,
            cpu_time_limit: 2
        }));

        const options = {
            method: 'POST',
            url: `https://${apiHost}/submissions/batch`,
            params: {
                base64_encoded: 'false'
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost,
                'Content-Type': 'application/json'
            },
            data: {
                submissions
            }
        };

        const response = await axios.request(options);
        const tokens: string[] = response.data.map((t: {token: string}) => t.token);
        if(socket) {
            socket.send(tokens.join(","));
            socket.onmessage = (e) => {
                try {
                    const submissionResult: SubmissionDetails[] = JSON.parse(e.data);
                    if(submissionResult) {
                        type === "run" ? setRunResult(submissionResult) : setSubmitResult(submissionResult)
                        if(type === "submit") {
                            let status = true;
                            submissionResult.forEach(s => {
                                if(s.status != "Accepted") status = false;
                            })
                            createSubmission(status)
                        }
                    }
                } catch(err) {
                    toast.error("Error in submitting code");
                }
            }
        }
    }

    const createSubmission = async(status: boolean) => {
        const response = await axios.post("/api/submission", {
            language: language.toUpperCase(),
            name: problem.title,
            level: problem.level,
            status: status ? "Accepted" : "Rejected",
            topics: problem.topics
        })
        console.log(response.data);
    }

    useEffect(() => {
        setCode(boilerplate[language]);
    }, [language])

    return <div>
        <ChooseLanguage language={language} setLanguage={setLanguage}/>
        <div className="flex flex-col">
            <Editor
                className="mt-4 mb-8"
                language={language}
                value={code}
                width={"50vw"}
                height={"50vh"}
                onChange={(v) => setCode(v || "")}
                options={{
                    fontSize: 16,
                    minimap: {
                        enabled: false
                    },
                    hover: {
                        enabled: false
                    },
                    quickSuggestions: false,          
                    parameterHints: { enabled: false },
                    suggestOnTriggerCharacters: false, 
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",              
                    wordBasedSuggestions: "off",   
                    suggest: { snippetsPreventQuickSuggestions: false },
                    inlineSuggest: { enabled: false },
                }}
            />
            <div className="flex justify-end pr-5 gap-5 items-center">
                <Button className="cursor-pointer" onClick={() => handleSubmission("run")}>Run</Button>
                <Button className="cursor-pointer" onClick={() => handleSubmission("submit")}>Submit</Button>
            </div>
            {
                problem.exampleTestcases.map((p, idx) => (
                    <div key={idx}>
                        <p className="text-lg font-bold">Case {idx + 1}</p>
                        <p>{runResult && runResult[idx].status}</p>
                        <p>{p.normalIO.input}</p>
                        {
                            runResult && runResult[idx].compile_output != null ? 
                            <div>
                                <p className="whitespace-pre">{runResult[idx].compile_output}</p>
                                <p className="whitespace-pre">{runResult[idx].stderr}</p>
                            </div> :
                            <div>
                                <p className="whitespace-pre">Output: {runResult && runResult[idx].stdout}</p>
                                <p className="whitespace-pre">Expected: {runResult && runResult[idx].expected_output}</p>
                            </div>
                        }
                    </div>
                ))
            }
            {submitResult && JSON.stringify(submitResult)}
        </div>
    </div>
}