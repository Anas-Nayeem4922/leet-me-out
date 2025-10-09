import { UserInfo } from "@/app/api/userDetails/route";
import { User } from "@/app/generated/prisma";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";
import { CircleUser, Github, Linkedin, MapPin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function UserDetails({
    userInfo,
    user,
}: {
    userInfo: UserInfo;
    user: User;
}) {
    return (
        <div className='min-h-full bg-dark-gray rounded-xl p-6 min-w-[25%] shadow-xl/30'>
            {/* User card */}
            <div className='flex gap-5 mb-4'>
                <Avatar>
                    <AvatarImage
                        src={
                            user.profileImage || "https://github.com/shadcn.png"
                        }
                        className='h-20 w-20 rounded-lg'
                    />
                </Avatar>
                <div className='flex flex-col'>
                    <span className='text-lg font-bold text-white'>
                        {user.name}
                    </span>
                    <span className='text-gray-400 text-base'>
                        {user.username}
                    </span>
                </div>
            </div>
            {/* Edit Profile */}
            <div>
                <Button className='text-dark-green bg-dark-green/20 rounded-lg cursor-pointer mb-6 w-full font-semibold text-base hover:bg-dark-green/15 transition-all duration-150'>
                    Edit Profile
                </Button>
            </div>
            {/* User Profile */}
            <div className='flex flex-col gap-3 text-gray-400 mb-6'>
                {/* location, website, github, linkedin, twitter */}
                {user.location && (
                    <span className='flex gap-2 items-center hover:text-white transition-all duration-150'>
                        <MapPin className='h-4 w-4' />
                        {user.location}
                    </span>
                )}
                {user.github && (
                    <a
                        href={user.github}
                        className='flex gap-2 items-center hover:text-white transition-all duration-150 cursor-pointer'
                    >
                        <Github className='h-4 w-4' />
                        {user.github.split("github.com/")[1]?.split("/")[0] ||
                            null}
                    </a>
                )}
                {user.linkedin && (
                    <a
                        href={user.linkedin}
                        className='flex gap-2 items-center hover:text-white transition-all duration-150 cursor-pointer'
                    >
                        <Linkedin className='h-4 w-4' />
                        {user.linkedin
                            .split("linkedin.com/in/")[1]
                            ?.split("/")[0] || null}
                    </a>
                )}
                {user.twitter && (
                    <a
                        href={user.twitter}
                        className='flex gap-2 items-center hover:text-white transition-all duration-150 cursor-pointer'
                    >
                        <Twitter className='h-4 w-4' />
                        {user.twitter.split("twitter.com/")[1]?.split("/")[0] ||
                            user.twitter.split("x.com/")[1]?.split("/")[0] ||
                            null}
                    </a>
                )}
                {user.website && (
                    <a
                        href={user.website}
                        className='flex gap-2 items-center hover:text-white transition-all duration-150 cursor-pointer'
                    >
                        <CircleUser className='h-4 w-4' />
                        {user.website}
                    </a>
                )}
            </div>
            <Separator className='bg-text-gray/30 mb-4' />
            <div>
                <span className='text-white font-semibold text-lg'>
                    Languages
                </span>
                <div className='mt-4 flex flex-col gap-3'>
                    {userInfo.languages &&
                        Object.keys(userInfo.languages).map((key) => (
                            <span key={key}>
                                {userInfo.languages[
                                    key as keyof typeof userInfo.languages
                                ] != 0 && (
                                    <span className='flex justify-between'>
                                        <Badge className='bg-gray text-text-gray rounded-2xl'>
                                            {key}
                                        </Badge>
                                        <span className='text-white font-medium text-base'>
                                            {
                                                userInfo.languages[
                                                    key as keyof typeof userInfo.languages
                                                ]
                                            }{" "}
                                            <span className='text-xs text-gray-400 ml-1'>
                                                problems solved
                                            </span>
                                        </span>
                                    </span>
                                )}
                            </span>
                        ))}
                </div>
            </div>
            <Separator className='bg-text-gray/30 mb-4' />
        </div>
    );
}
