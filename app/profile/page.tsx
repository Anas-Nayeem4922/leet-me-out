import ProfileEditComponent from "@/components/ProfileEditComponent";
import { authOptions } from "@/lib/options";
import { client } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return <div>User not logged in</div>;
    const username = session.user.username;
    const user = await client.user.findFirst({
        where: {
            username,
        },
    });
    if (!user) return <div>No such user exists</div>;
    return (
        <div>
            <ProfileEditComponent user={user} />
        </div>
    );
}
