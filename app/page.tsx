"use client";

import Navbar from "@/components/Navbar";
import { Boxes } from "@/components/ui/background-boxes";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useSession } from "next-auth/react";

export default function Home() {
    const words = [
        { text: "Start", className: "text-white" },
        { text: "your", className: "text-white" },
        { text: "DSA", className: "text-white" },
        { text: "journey", className: "text-white" },
        { text: "with", className: "text-white" },
        { text: "LeetMeOut.", className: "text-orange-400" },
    ];

    const session = useSession();

    return (
        <div className='bg-home-black relative w-full h-screen flex flex-col items-center overflow-hidden'>
            {/* Navbar */}
            <Navbar username={session.data?.user?.username} />

            {/* Mask overlay */}
            <div className='absolute inset-0 w-full h-full bg-home-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />

            {/* Background */}
            <Boxes />

            {/* Content */}
            <div className='relative z-40 flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-12 max-w-3xl w-full h-full mb-20'>
                <p className='text-gray-200 font-semibold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>
                    Brain Sweats Now, Paychecks Flex Later
                </p>

                <p className='text-gray-400 mt-3 mb-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed'>
                    Think of this as investing in your mental stocks. Solve
                    today&apos;s problem, <br className='hidden sm:block' />
                    and tomorrow you&apos;re cashing it out as recruiter calls,
                    LinkedIn flexes, and fat offers.
                </p>

                <div className='w-full flex justify-center'>
                    <TypewriterEffectSmooth words={words} />
                </div>
            </div>
        </div>
    );
}
