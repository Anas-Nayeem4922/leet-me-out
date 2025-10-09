import { Submissions } from "@/app/generated/prisma";
import { formatDistance } from "date-fns";

export default function SubmissionsHistory({
    submissions,
}: {
    submissions: Submissions[];
}) {
    return (
        <div className='bg-dark-gray p-4 flex flex-col gap-3 rounded-lg shadow-xl/30 min-h-full'>
            <div className='text-lg text-zinc-300 font-bold mb-4'>
                Recent Submissions
            </div>
            {submissions.map((s, idx) => {
                const timeElapsed = formatDistance(
                    new Date(s.submittedAt),
                    new Date(),
                    { addSuffix: true }
                );
                return (
                    <div
                        className={`flex justify-between px-3 rounded-lg py-3 ${
                            idx % 2 == 0 && `bg-gray`
                        }`}
                        key={idx}
                    >
                        <span className='text-white font-semibold text-lg'>
                            {s.name}
                        </span>
                        <span className='text-text-gray'>{timeElapsed}</span>
                    </div>
                );
            })}
        </div>
    );
}
