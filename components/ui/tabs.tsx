"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot='tabs'
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    );
}

function TabsList({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot='tabs-list'
            className={cn(
                "bg-neutral-900 text-neutral-300 inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                className
            )}
            {...props}
        />
    );
}

function TabsTrigger({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot='tabs-trigger'
            className={cn(
                // inactive state: muted gray text
                // active state: darker bg + bright text
                "data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-400 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        />
    );
}

function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot='tabs-content'
            className={cn("flex-1 outline-none text-neutral-200", className)}
            {...props}
        />
    );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
