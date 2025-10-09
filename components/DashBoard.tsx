"use client";

import { UserInfo } from "@/app/api/userDetails/route";
import { Submissions, User } from "@/app/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { UserDetails } from "./UserDetails";
import { UserStats } from "./UserStats";

export default function DashBoard({ username }: { username: string }) {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [submissions, setSubmissions] = useState<Submissions[]>();
    const [user, setUser] = useState<User>();

    const fetchUserData = async () => {
        const response = await axios.get(
            `/api/userDetails?username=${username}`
        );
        if (response.data.userInfo && response.data.submissions) {
            setUserInfo(response.data.userInfo);
            setSubmissions(response.data.submissions);
            setUser(response.data.user);
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='h-screen w-full flex flex-col bg-home-black pb-8'>
            <Navbar username={username} />
            {userInfo && user && submissions && (
                <div className='h-full overflow-y-scroll flex justify-center gap-4 p-5'>
                    <UserDetails userInfo={userInfo} user={user} />
                    <UserStats userInfo={userInfo} submissions={submissions} />
                </div>
            )}
        </div>
    );
}
