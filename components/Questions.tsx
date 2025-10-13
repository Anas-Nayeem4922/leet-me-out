"use client";

import { useEffect, useState } from "react";
import QuestionsProgress from "./ui/QuestionsProgress";
import { getProblems } from "@/utils/problems";

export default function Questions({
    easy,
    medium,
    hard,
}: {
    easy: number;
    medium: number;
    hard: number;
}) {
    const [totalEasy, setTotalEasy] = useState(0);
    const [totalMedium, setTotalMedium] = useState(0);
    const [totalHard, setTotalHard] = useState(0);
    const questionsData = {
        easy: { solved: easy, total: totalEasy },
        medium: { solved: medium, total: totalMedium },
        hard: { solved: hard, total: totalHard },
    };

    useEffect(() => {
        let isMounted = true;
        const fetchProblems = async () => {
            const problems = await getProblems();
            if (!isMounted) return;
            problems.forEach((p: any) => {
                if (p.level === "Easy") setTotalEasy((e) => e + 1);
                if (p.level === "Medium") setTotalMedium((m) => m + 1);
                if (p.level === "Hard") setTotalHard((h) => h + 1);
            });
        };
        fetchProblems();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <QuestionsProgress data={questionsData} />
        </div>
    );
}
