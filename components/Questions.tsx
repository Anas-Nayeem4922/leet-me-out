import { totalEasy, totalHard, totalMedium } from "@/utils/problems";
import QuestionsProgress from "./ui/QuestionsProgress";

export default function Questions({
    easy,
    medium,
    hard,
}: {
    easy: number;
    medium: number;
    hard: number;
}) {
    const questionsData = {
        easy: {
            solved: easy,
            total: totalEasy,
        },
        medium: {
            solved: medium,
            total: totalMedium,
        },
        hard: {
            solved: hard,
            total: totalHard,
        },
    };

    return (
        <div>
            <QuestionsProgress data={questionsData} />
        </div>
    );
}
