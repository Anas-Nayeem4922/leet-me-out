"use client"

import { UserInfo } from "@/app/api/getUserDetails/route";
import { Submissions } from "@/app/generated/prisma";
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner";
   import { formatDistance } from 'date-fns';

export default function DashBoard({username} : {username: string}) {

    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [submissions, setSubmissions] = useState<Submissions[]>();

    const fetchUserData = async() => {
        const response = await axios.get(`/api/getUserDetails?username=${username}`);
        if(response.data.userInfo && response.data.submissions) {
            setUserInfo(response.data.userInfo);
            setSubmissions(response.data.submissions);
        } else {
            toast.error(response.data.message);
        }
        
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return <div className="flex gap-10">
        {/* User Info */}
        <div className="bg-red-200">
            <div className="text-2xl font-extrabold text-slate-900 ">User Info</div>
            <div className="text-lg font-semibold">{username}</div>
            <div>Languages: 
                {userInfo && userInfo.languages && Object.keys(userInfo.languages).map((key) => (
                    <span key={key} className="mx-1">
                        {userInfo.languages[key as keyof typeof userInfo.languages] != 0 && (
                            <span>
                                {key}. {userInfo.languages[key as keyof typeof userInfo.languages]} problems solved
                            </span>
                        )}
                    </span>
                ))}
            </div>
        </div>

        {/* Stats */}
        <div className="bg-amber-200">
            <div>Easy: {userInfo?.Easy}</div>
            <div>Medium: {userInfo?.Medium}</div>
            <div>Hard: {userInfo?.Hard}</div>
            {
                submissions?.map(s => {
                    const timeElapsed = formatDistance(
                        new Date(s.submittedAt),
                        new Date(),
                        { addSuffix: true }
                    );
                    return (
                        <div key={s.id} className="bg-amber-200 text-slate-900 rounded-lg cursor-pointer hover:-translate-y-2 hover:bg-amber-400 hover:mt-4 transition-all duration-200 flex justify-between px-6 py-3 m-2">
                            <div>{s.name}</div>
                            <div>{timeElapsed}</div>
                        </div>
                    );
                })
            }
        </div>
    </div>
}