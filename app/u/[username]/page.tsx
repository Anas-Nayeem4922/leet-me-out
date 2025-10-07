import DashBoard from "@/components/DashBoard";

export default async function User({params} : {params: Promise<{username: string}>}) {
    const username = (await params).username;
    return <div>
        <DashBoard username={username}/>
    </div>
}