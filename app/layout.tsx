import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/hooks/AuthProvider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/hooks/SocketProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LeetMeOut",
    description: "Your go to DSA solving platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <SocketProvider>
                        {children}
                        <Toaster />
                    </SocketProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
