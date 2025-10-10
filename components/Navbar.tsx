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
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Navbar({ username }: { username: string | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(
        "https://github.com/shadcn.png"
    );

    const tabs = [
        { name: "Explore", path: "/" },
        { name: "Problems", path: "/problemset" },
        { name: "Contests", path: "/contests" },
        { name: "Discuss", path: "/discuss" },
    ];

    useEffect(() => {
        username &&
            axios
                .get(`/api/getProfileImage?username=${username}`)
                .then((res) => setProfileImage(res.data.image.profileImage))
                .catch((err) => toast.error("Error in fetching image profile"));
    }, [username]);

    return (
        <div className='w-full h-[7%] bg-darker-gray flex justify-between items-center px-6 border-b-2 border-text-gray/30 relative py-2 z-50'>
            {/* Left Section */}
            <div className='flex items-center gap-6 h-full'>
                <Logo />
                {/* Desktop Nav */}
                <div className='hidden md:flex items-center gap-6 h-full'>
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.path;
                        return (
                            <div
                                key={tab.name}
                                onClick={() => router.push(tab.path)}
                                className={`relative flex items-center h-full cursor-pointer transition-all duration-150 ${
                                    isActive
                                        ? "font-bold text-white after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-8px] after:h-[2px] after:bg-white"
                                        : "text-text-gray font-semibold hover:font-bold hover:text-white"
                                }`}
                            >
                                {tab.name}
                            </div>
                        );
                    })}
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
                                    <AvatarImage
                                        src={
                                            profileImage ??
                                            "https://github.com/shadcn.png"
                                        }
                                    />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56 mr-4 pt-4'>
                                <div className='flex flex-col'>
                                    <div className='flex gap-4 mb-4 px-3'>
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    profileImage ??
                                                    "https://github.com/shadcn.png"
                                                }
                                            />
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
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.path;
                        return (
                            <div
                                key={tab.name}
                                onClick={() => {
                                    router.push(tab.path);
                                    setIsMenuOpen(false);
                                }}
                                className={`py-3 px-3 w-full rounded-lg cursor-pointer transition-all duration-150 flex items-center ${
                                    isActive
                                        ? "bg-gray/40 border-l-4 border-white text-white font-bold"
                                        : "text-text-gray font-semibold hover:bg-gray/20 hover:text-white hover:font-bold"
                                }`}
                            >
                                {tab.name}
                            </div>
                        );
                    })}
                    {!username && (
                        <div className='text-gray-400 py-2'>
                            <span
                                onClick={() => {
                                    router.push("/signup");
                                    setIsMenuOpen(false);
                                }}
                                className='hover:text-white transition-all duration-200 cursor-pointer'
                            >
                                Register
                            </span>{" "}
                            &nbsp; or &nbsp;{" "}
                            <span
                                onClick={() => {
                                    router.push("/signin");
                                    setIsMenuOpen(false);
                                }}
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
