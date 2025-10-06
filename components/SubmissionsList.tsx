"use client"

import { Submissions } from "@/app/generated/prisma"
import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export default function SubmissionsList({title} : {title: string}) {

    const [submissions, setSubmissions] = useState<Submissions[]>([]);

    const fetchSubmissions = async() => {
        const response = await axios.get(`/api/submission?title=${title}`);
        setSubmissions(response.data.message);
    }
    useEffect(() => {
        fetchSubmissions();
    }, [])
    return <div>
        {
            submissions.map((s, idx) => (
                <div className="bg-amber-200 text-slate-900 rounded-lg cursor-pointer hover:-translate-y-2 hover:bg-amber-400 hover:mt-4 transition-all duration-200 flex justify-between px-6 py-3 m-2" key={idx}>
                    <div>{s.status}</div>
                    <div>{format(s.submittedAt, "dd/MM/yyyy HH:mm:ss")}</div>
                    <div>{s.language}</div>
                </div>
            ))
        }
    </div>
}