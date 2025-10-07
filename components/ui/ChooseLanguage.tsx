"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChooseLanguage({
    language,
    setLanguage,
}: {
    language: string;
    setLanguage: (lang: string) => void;
}) {
    const [open, setOpen] = useState(false);

    const languages = [
        { value: "java", label: "JAVA" },
        { value: "cpp", label: "CPP" },
        { value: "python", label: "PYTHON" },
        { value: "javascript", label: "JAVASCRIPT" },
        { value: "typescript", label: "TYPESCRIPT" },
        { value: "c", label: "C" },
    ];

    return (
        <div className='p-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='ghost'
                        role='combobox'
                        aria-expanded={open}
                        className='w-[200px] justify-between bg-gray text-white hover:bg-text-gray/30 hover:text-white cursor-pointer'
                    >
                        {language
                            ? languages.find((l) => l.value === language)?.label
                            : "Select language..."}
                        <ChevronsUpDown className='opacity-70' />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className='w-[200px] p-0 border border-text-gray/30 bg-gray shadow-lg'>
                    <Command className='bg-gray text-white'>
                        <CommandInput
                            placeholder='Search language...'
                            className='h-9 border-text-gray/30 placeholder:text-text-gray/70 text-white caret-green-500'
                        />
                        <CommandList>
                            <CommandEmpty className='p-2 text-text-gray/70'>
                                No language found.
                            </CommandEmpty>
                            <CommandGroup>
                                {languages.map((l) => (
                                    <CommandItem
                                        key={l.value}
                                        value={l.value}
                                        onSelect={(currentValue) => {
                                            setLanguage(
                                                currentValue === language
                                                    ? ""
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
                                        className='text-white hover:bg-text-gray/30 cursor-pointer'
                                    >
                                        {l.label}
                                        <Check
                                            className={cn(
                                                "ml-auto text-green-500",
                                                language === l.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
