"use client";

import { Submissions } from "@/app/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import { CodeEditor } from "./CodeEditor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, History, NotebookPen } from "lucide-react";
import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";

export default function CodeSubmissionComponent({
    submissionId,
    problem,
}: {
    submissionId: number;
    problem: ProblemType;
}) {
    const [submissionDetails, setSubmissionDetails] = useState<Submissions>();
    const [problems, setProblems] = useState<ProblemType[]>();
    const [error, setError] = useState<any>();

    const router = useRouter();

    const fetchSubmission = async () => {
        const response = await axios.get(`/api/submission/${submissionId}`);
        if (!response.data.submission) {
            toast.error(response.data.message);
        } else {
            if (response.data.submission.status != "Accepted") {
                setError(JSON.parse(response.data.submission.error));
            }
            setSubmissionDetails(response.data.submission);
        }
    };

    useEffect(() => {
        async function fetchProblems() {
            const data = await getProblems();
            setProblems(data);
        }
        fetchProblems();
        fetchSubmission();
    }, []);

    return (
        submissionDetails &&
        problem && (
            <ResizablePanelGroup
                direction='horizontal'
                className='p-4 bg-black'
            >
                <ResizablePanel defaultSize={50}>
                    <div className='h-screen bg-dark-gray rounded-xl p-4'>
                        <div className='bg-gray rounded-t-xl flex min-w-full -mt-4 -mx-4'>
                            <div
                                className='flex gap-2 items-center border-r-2 border-text-gray/30 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all duration-150'
                                onClick={() =>
                                    router.push(
                                        `/problem/${problem.title
                                            .replaceAll(" ", "-")
                                            .toLowerCase()}`
                                    )
                                }
                            >
                                <NotebookPen className='h-5 w-5 text-blue-500' />
                                <span className='text-white font-bold'>
                                    Description
                                </span>
                            </div>
                            <div
                                onClick={() =>
                                    router.push(
                                        `/problem/${problem.title
                                            .replaceAll(" ", "-")
                                            .toLowerCase()}/submissions`
                                    )
                                }
                                className='flex gap-2 items-center cursor-pointer rounded-md hover:bg-orange-600/20 group px-4 py-2 transition-all duration-150'
                            >
                                <History className='h-5 w-5 text-orange-500/50' />
                                <span className='text-gray-400 font-bold group-hover:text-white'>
                                    Submissions
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 px-2 py-2 border-b-1 border-text-gray/30 min-w-full'>
                            <ArrowLeft className='h-4 w-4 text-zinc-300' />
                            <div
                                onClick={() =>
                                    router.push(
                                        `/problem/${problem.title
                                            .replaceAll(" ", "-")
                                            .toLowerCase()}/submissions`
                                    )
                                }
                                className='text-white cursor-pointer'
                            >
                                All Submissions
                            </div>
                        </div>
                        {/* Status */}
                        <div
                            className={`font-bold text-xl mt-7 ${
                                submissionDetails.status == "Accepted"
                                    ? `text-dark-green`
                                    : `text-dark-red`
                            }`}
                        >
                            {submissionDetails.status}
                        </div>
                        {submissionDetails.status === "Accepted" ? (
                            <div className='flex gap-4 mt-6'>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className='flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-green-100 text-dark-green font-semibold'
                                    >
                                        Testcase {i + 1}{" "}
                                        <Check className='w-4 h-4' />
                                    </div>
                                ))}
                            </div>
                        ) : submissionDetails.status === "Wrong Answer" ? (
                            <div>
                                {/* Input */}
                                <div className='mt-6'>
                                    <div className='font-semibold text-base text-zinc-400'>
                                        Input
                                    </div>
                                    <div className='whitespace-pre mt-3 bg-gray rounded-lg text-white px-4 py-4'>
                                        {error.stdin}
                                    </div>
                                </div>
                                {/* Output */}
                                <div className='font-semibold text-base text-zinc-400 mt-4'>
                                    <div className='font-semibold text-base text-zinc-400'>
                                        Output
                                    </div>
                                    <div className='whitespace-pre mt-3 bg-gray rounded-lg text-white px-4 py-4 border border-dark-red/90'>
                                        {error.stdout}
                                    </div>
                                </div>
                                {/* Expected */}
                                <div className='font-semibold text-base text-zinc-400 mt-4'>
                                    <div className='font-semibold text-base text-zinc-400'>
                                        Expected
                                    </div>
                                    <div className='whitespace-pre mt-3 bg-gray rounded-lg text-white px-4 py-4'>
                                        {error.expected_output}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-dark-red/10 text-dark-red px-4 pt-4 pb-8 mt-6 rounded-md'>
                                {error.compile_output}
                                {error.stderr}
                            </div>
                        )}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle className='w-2 bg-black' />
                <ResizablePanel defaultSize={50}>
                    <CodeEditor problem={problem} />
                </ResizablePanel>
            </ResizablePanelGroup>
        )
    );
}
