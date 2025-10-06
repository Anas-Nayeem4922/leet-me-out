"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChooseLanguage({language, setLanguage} : {
  language: string,
  setLanguage: (lang: string) => void
}) {
    const [open, setOpen] = useState(false);

    const languages = [
  {
    value: "java",
    label: "JAVA",
  },
  {
    value: "cpp",
    label: "CPP",
  },
  {
    value: "python",
    label: "PYTHON",
  },
  {
    value: "javascript",
    label: "JAVASCRIPT",
  },
  {
    value: "typescript",
    label: "TYPESCRIPT",
  },
  {
    value: "c",
    label: "C"
  }
]
    return <div className="p-4">
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {language
            ? languages.find((l) => l.value === language)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {languages.map((l) => (
                <CommandItem
                  key={l.value}
                  value={l.value}
                  onSelect={(currentValue) => {
                    setLanguage(currentValue === language ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {l.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      language === l.value ? "opacity-100" : "opacity-0"
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
}