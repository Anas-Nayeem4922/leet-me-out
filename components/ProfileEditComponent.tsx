"use client";

import { User } from "@/app/generated/prisma";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Splash3dButton from "./ui/3d-splash-button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DashBoard from "./DashBoard";
import { CircleX } from "lucide-react";

export default function ProfileEditComponent({ user }: { user: User }) {
    const router = useRouter();
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            github: user.github ?? "",
            linkedin: user.linkedin ?? "",
            location: user.location ?? "",
            name: user.name ?? "",
            twitter: user.twitter ?? "",
            website: user.website ?? "",
        },
    });

    const onSubmit = async (data: z.infer<typeof userSchema>) => {
        const response = await axios.post("/api/userDetails", data);
        if (response.status == 200) {
            toast.success(response.data.message);
            router.push(`/u/${user.username}`);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div>
            <DashBoard username={user.username} />
            <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center pr'>
                <div className='relative w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] bg-dark-gray p-6 rounded-lg shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-500'>
                    <div
                        onClick={() => router.push(`/u/${user.username}`)}
                        className='flex justify-end'
                    >
                        <CircleX className='h-6 w-6 text-gray-300 hover:text-white transition-all duration-150 cursor-pointer mb-4' />
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-5'
                        >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your name'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your location'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='github'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Github
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your github profile'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='linkedin'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Linkedin
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your linkedin profile'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='website'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Website
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Your personal protfolio webiste'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='twitter'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-zinc-300 font-semibold'>
                                            Twitter/X
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your twitter/x account'
                                                className='bg-gray border border-zinc-700 text-white
                                             focus-visible:border-zinc-600 focus-visible:ring-zinc-600 !placeholder-zinc-400 h-12 transition-all duration-200'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-zinc-100' />
                                    </FormItem>
                                )}
                            />
                            <div className='mb-12'></div>
                            <Splash3dButton type='submit'>
                                Submit
                            </Splash3dButton>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
