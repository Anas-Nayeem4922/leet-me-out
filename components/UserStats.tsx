import { UserInfo } from "@/app/api/userDetails/route";
import { Submissions } from "@/app/generated/prisma";
import Questions from "./Questions";
import SubmissionsHistory from "./SubmissionsHistory";

export function UserStats({
    userInfo,
    submissions,
}: {
    userInfo: UserInfo;
    submissions: Submissions[];
}) {
    return (
        <div className='flex flex-col gap-5 h-full min-w-[60%] mb-6'>
            <Questions
                easy={userInfo.Easy}
                medium={userInfo.Medium}
                hard={userInfo.Hard}
            />
            <SubmissionsHistory submissions={submissions} />
        </div>
    );
}
