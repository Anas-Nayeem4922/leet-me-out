"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = useSession();
    return (
        <>
            <Navbar username={session.data?.user.username} />
            {children}
        </>
    );
}
