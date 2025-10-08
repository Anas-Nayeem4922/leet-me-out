"use client";

import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Problemset() {
    const [problems, setProblems] = useState<ProblemType[]>();
    const router = useRouter();
    useEffect(() => {
        async function fetchProblems() {
            const data = await getProblems();
            setProblems(data);
        }
        fetchProblems();
    }, []);
    return (
        <div>
            {problems &&
                problems.map((problem) => (
                    <div
                        onClick={() => {
                            router.push(
                                `/problem/${problem.title
                                    .replaceAll(" ", "-")
                                    .toLowerCase()}`
                            );
                        }}
                        className='bg-amber-200 text-slate-900 rounded-lg cursor-pointer hover:-translate-y-2 hover:bg-amber-400 hover:mt-4 transition-all duration-200 flex justify-between px-6 py-3 m-2'
                        key={problem.id}
                    >
                        <div>
                            {problem.id}. {problem.title}
                        </div>
                        <div>{problem.level}</div>
                    </div>
                ))}
        </div>
    );
}
