"use client"

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return <div>
    {
      session.status === "authenticated" ? <Button onClick={() => {signOut()}}>Logout</Button> : <Button onClick={() => router.push("/signin")}>Signin</Button>
    }
    <div onClick={() => router.push("/problemset")} className="font-bold underline text-amber-500 cursor-pointer">Check out the problems</div>
  </div>
}