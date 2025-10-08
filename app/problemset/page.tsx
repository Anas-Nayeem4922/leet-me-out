"use client";

import Navbar from "@/components/Navbar";
import { ProblemType } from "@/types/Problem";
import { getProblems } from "@/utils/problems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Problemset() {
    const [problems, setProblems] = useState<ProblemType[]>();
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        async function fetchProblems() {
            const data = await getProblems();
            setProblems(data);
        }
        fetchProblems();
    }, []);
    return (
        <div className='bg-home-black w-full h-screen'>
            <Navbar username={session.data?.user.username} />
            <div className='px-5 py-10 flex flex-col gap-1'>
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
                            className={`${
                                problem.id % 2 == 0 && `bg-gray`
                            } text-white font-bold rounded-lg cursor-pointer hover:-translate-y-1 transition-all duration-200 flex justify-between px-8 py-4`}
                            key={problem.id}
                        >
                            <div>
                                {problem.id}. {problem.title}
                            </div>
                            <div
                                className={`${
                                    problem.level == "Easy" && `text-green-text`
                                } ${
                                    problem.level == "Medium" &&
                                    `text-yellow-text`
                                } ${
                                    problem.level == "Hard" && `text-red-text`
                                }`}
                            >
                                {problem.level}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
