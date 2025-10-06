"use client"

import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ui/ChooseLanguage";
import Editor from "@monaco-editor/react"
import { problems } from "@/utils/problems";
import { Button } from "./ui/button";
import { languageId } from "@/utils/language-id";
import axios from "axios";

interface Submissions {
    language_id: number,
    source_code: string,
    stdin: string,
    expected_output: string,
    cpu_time_limit: number,
}

export function CodeEditor({id} : {id: number}) {
    const [language, setLanguage] = useState<string>("java");
    const problem = problems[id - 1];
    const boilerplate: Record<string, string> = problem.boilerplate;
    const [code, setCode] = useState<string>(boilerplate[language]);

    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;

    const handleSubmission = async(type: "run" | "submit") => {
        const testcases = type == "run" ? problem.exampleTestcases : problem.sampleTestcases;
        const submissions: Submissions[] = [];
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
        console.log(tokens.join(","));

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
                        <p>{p.normalIO.input}</p>
                    </div>
                ))
            }
        </div>
    </div>
}