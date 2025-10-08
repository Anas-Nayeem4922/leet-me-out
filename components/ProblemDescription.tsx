"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { History, NotebookPen, Tag } from "lucide-react";
import { Separator } from "./ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { ProblemType } from "@/types/Problem";

export function ProblemDescription({ problem }: { problem: ProblemType }) {
    const constraints: string[] = problem.constraints.split(",");
    const router = useRouter();
    const pathName = usePathname();
    return (
        <div className='bg-dark-gray h-screen p-4 overflow-auto rounded-xl'>
            {/* Submission Section */}
            <div className='bg-gray flex min-w-full -mt-4 -mx-4'>
                <div className='flex gap-2 items-center border-r-2 border-text-gray/30 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all duration-150'>
                    <NotebookPen className='h-5 w-5 text-blue-500' />
                    <span className='text-white font-bold'>Description</span>
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

            {/* Problem Statement */}
            <div className='text-3xl font-bold mt-6 text-white'>
                {problem.id}. {problem.title}
            </div>

            {/* Difficulty Level */}
            <div className='flex gap-3 mt-4 items-center'>
                <div
                    className={`px-2 py-1 text-xs bg-gray rounded-xl ${
                        problem.level == "Easy" && `text-green-text`
                    }  ${problem.level == "Medium" && `text-yellow-text`} ${
                        problem.level == "Hard" && `text-red-text`
                    }`}
                >
                    {problem.level}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='px-2 py-1 text-xs text-white bg-gray rounded-xl flex gap-1 items-center cursor-pointer'>
                        <Tag className='h-3.5 w-3.5' />
                        Topics
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {problem.topics.map((p, idx) => (
                            <DropdownMenuItem key={idx}>{p}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Description */}
            <div className='mt-8 font-medium text-white'>
                {problem.statement}
            </div>

            {/* Testcases */}
            <div className='flex flex-col gap-5 mt-10'>
                {problem.exampleTestcases.map((p, id) => (
                    <div key={id} className='text-base'>
                        <p className='font-extrabold text-white mb-4'>
                            Example {id + 1}:
                        </p>
                        <div className='pl-5 border-l-2 border-text-gray/30'>
                            <p className='text-text-gray font-medium'>
                                <span className='text-white font-bold mr-2'>
                                    Input:
                                </span>{" "}
                                {p.normalIO.input}
                            </p>
                            <p className='text-text-gray font-medium'>
                                <span className='text-white font-bold mr-2'>
                                    Output:
                                </span>{" "}
                                {p.normalIO.output}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Constraints */}
            <div className='mt-10'>
                <div className='font-extrabold text-white mb-4'>
                    Constraints:
                </div>
                {constraints.map((constraint, idx) => (
                    <li
                        key={idx}
                        className='ml-4 text-sm bg-gray px-2 py-0.5 rounded-md text-text-gray max-w-fit my-3 marker:text-white border-1 border-text-gray/30'
                    >
                        {constraint.trim()}
                    </li>
                ))}
            </div>

            <Separator className='bg-text-gray/30 mt-10' />

            {/* Expected Complexities */}
            <div className='mt-8'>
                <div className='font-extrabold text-white mb-4'>
                    Expected Complexities:{" "}
                </div>
                <div className='pl-5 border-l-2 border-text-gray/30'>
                    <p className='text-text-gray text-sm'>
                        <span className='font-bold text-white mr-2'>
                            Time Complexity:
                        </span>{" "}
                        {problem.complexity.time}
                    </p>
                    <p className='text-text-gray text-sm'>
                        <span className='font-bold text-white mr-2'>
                            Space Complexity:
                        </span>{" "}
                        {problem.complexity.space}
                    </p>
                </div>
            </div>

            {/* Topics */}
            <div className='mt-6'>
                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger className='px-4 py-4 text-lg text-white cursor-pointer border-t-1 border-text-gray/30'>
                            <Tag className='h-4 w-4' />
                            Topics
                        </AccordionTrigger>
                        <AccordionContent className='flex gap-4 border-b-1 border-text-gray/30'>
                            {problem.topics.map((topic, idx) => (
                                <span
                                    key={idx}
                                    className='px-2 py-1 text-xs text-white bg-gray rounded-xl cursor-pointer'
                                >
                                    {topic}
                                </span>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
