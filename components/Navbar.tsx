"use client";

import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./ui/logo";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar({ username }: { username: string | undefined }) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='w-full h-[7%] bg-darker-gray flex justify-between items-center px-6 border-b-2 border-text-gray/30 relative'>
            {/* Left Section */}
            <div className='flex items-center gap-6 h-full'>
                <Logo />
                {/* Desktop Nav */}
                <div className='hidden md:flex items-center gap-6 h-full'>
                    <div className='text-text-gray flex items-center h-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Explore
                    </div>
                    <div className='flex items-center h-full font-bold cursor-pointer text-white border-b-2 border-white transition-all duration-150'>
                        Problems
                    </div>
                    <div className='text-text-gray flex items-center h-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Contests
                    </div>
                    <div className='text-text-gray flex items-center h-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Discuss
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className='flex items-center gap-4'>
                {username ? (
                    <div className='mr-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className='cursor-pointer'
                                asChild
                            >
                                <Avatar>
                                    <AvatarImage src='https://github.com/shadcn.png' />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56 mr-4 pt-4'>
                                <div className='flex flex-col'>
                                    <div className='flex gap-4 mb-4 px-3'>
                                        <Avatar>
                                            <AvatarImage src='https://github.com/shadcn.png' />
                                        </Avatar>
                                        <span className='text-white font-bold text-xl'>
                                            {username}
                                        </span>
                                    </div>
                                    <Separator className='bg-text-gray/30 min-w-full' />
                                    <div
                                        onClick={() =>
                                            router.push(`/u/${username}`)
                                        }
                                        className='flex gap-3 items-center p-3 rounded-lg mt-1 border-b-2 border-text-gray/5 hover:bg-gray hover:text-white hover:font-semibold transition-all duration-150 cursor-pointer'
                                    >
                                        <LayoutDashboard className='text-gray-300 h-5 w-5' />
                                        <span className='text-gray-200'>
                                            Dashboard
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => signOut()}
                                        className='flex gap-3 items-center p-3 rounded-lg border-b-2 border-text-gray/5 hover:bg-gray hover:text-white hover:font-semibold transition-all duration-150 cursor-pointer'
                                    >
                                        <LogOut className='text-gray-300 h-5 w-5' />
                                        <span className='text-gray-200'>
                                            Logout
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className='text-gray-400 mr-2 hidden sm:block'>
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

                {/* Hamburger menu for small screens */}
                <div className='md:hidden flex items-center'>
                    <Menu
                        className='text-gray-300 cursor-pointer'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='absolute top-full left-0 w-full bg-darker-gray flex flex-col items-start px-6 py-4 border-t border-text-gray/30 md:hidden z-50'>
                    <div className='text-text-gray py-2 w-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Explore
                    </div>
                    <div className='py-2 w-full font-bold cursor-pointer text-white hover:font-bold border-b border-white transition-all duration-150'>
                        Problems
                    </div>
                    <div className='text-text-gray py-2 w-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Contests
                    </div>
                    <div className='text-text-gray py-2 w-full font-semibold hover:font-bold cursor-pointer hover:text-white transition-all duration-150'>
                        Discuss
                    </div>
                    {!username && (
                        <div className='text-gray-400 py-2'>
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
            )}
        </div>
    );
}
