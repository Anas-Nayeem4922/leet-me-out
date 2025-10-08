"use client";

import { Submissions } from "@/app/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { History, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubmissionsList({ title }: { title: string }) {
    const router = useRouter();

    const [submissions, setSubmissions] = useState<Submissions[]>([]);

    const fetchSubmissions = async () => {
        const response = await axios.get(`/api/submission?title=${title}`);
        setSubmissions(response.data.message);
    };
    useEffect(() => {
        fetchSubmissions();
    }, []);
    return (
        <div className='bg-dark-gray h-screen p-4 overflow-auto rounded-xl'>
            <div className='bg-gray flex min-w-full -mt-4 -mx-4'>
                <div
                    className='flex gap-2 items-center border-r-2 border-text-gray/30 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all duration-150'
                    onClick={() =>
                        router.push(
                            `/problem/${title
                                .replaceAll(" ", "-")
                                .toLowerCase()}`
                        )
                    }
                >
                    <NotebookPen className='h-5 w-5 text-blue-500' />
                    <span className='text-white font-bold'>Description</span>
                </div>
                <div
                    onClick={() =>
                        router.push(
                            `/problem/${title
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
            <div className='flex flex-col'>
                <div className='flex w-full text-zinc-400 font-semibold text-sm mt-3 border-b-2 pb-2 border-b-text-gray/30'>
                    <span className='w-[30%] text-center'>Status</span>
                    <span className='w-[20%] text-center'>Language</span>
                    <span className='w-[50%] text-center'>Submitted</span>
                </div>
            </div>
            {submissions.map((s, idx) => (
                <div
                    className={`${
                        idx % 2 == 1 && `bg-gray`
                    } flex items-center text-white py-3 rounded-md cursor-pointer hover:-translate-y-1 transition-all duration-150`}
                    key={idx}
                    onClick={() =>
                        router.push(
                            `/problem/${title
                                .replaceAll(" ", "-")
                                .toLowerCase()}/submissions/${s.id}`
                        )
                    }
                >
                    <div
                        className={`${
                            s.status == "Accepted"
                                ? `text-dark-green`
                                : `text-dark-red`
                        } text-center w-[30%] font-semibold`}
                    >
                        {s.status}
                    </div>
                    <div className='text-center w-[20%]'>
                        <span className='bg-gray rounded-md text-xs font-bold px-2 py-1'>
                            {s.language}
                        </span>
                    </div>
                    <div className='text-center w-[50%] flex flex-col'>
                        <span className='text-zinc-100 text-sm'>
                            {format(s.submittedAt, "dd/MM/yyyy")}
                        </span>
                        <span className='text-zinc-500 text-xs'>
                            {format(s.submittedAt, "hh:mm:ss a")}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
