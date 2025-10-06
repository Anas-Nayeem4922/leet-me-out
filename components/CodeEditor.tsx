"use client"

import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ui/ChooseLanguage";
import Editor from "@monaco-editor/react"
import { problems } from "@/utils/problems";

export function CodeEditor({id} : {id: number}) {
    const [language, setLanguage] = useState<string>("java");
    const problem = problems[id - 1];
    const boilerplate: Record<string, string> = problem.boilerplate;
    const [code, setCode] = useState<string>(boilerplate[language]);

    useEffect(() => {
        setCode(boilerplate[language]);
    }, [language])

    return <div>
        <ChooseLanguage language={language} setLanguage={setLanguage}/>
        <Editor
            className="mt-4"
            height={"100vh"}
            language={language}
            value={code}
            width={"50vw"}
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
    </div>
}