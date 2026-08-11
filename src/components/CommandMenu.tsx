// src/components/CommandMenu.tsx
import * as React from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    LayoutDashboard,
    Briefcase,
    User,
    Mail,
    ExternalLink,
    Box,
    Copy
} from "lucide-react";
import { toast } from "sonner";
import { resume } from "@/data/resume";

interface CommandMenuProps {
    onNavigate: (page: string) => void;
}

export function CommandMenu({ onNavigate }: CommandMenuProps) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search projects, skills, or navigate..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                    <CommandItem value="about" onSelect={() => runCommand(() => onNavigate("about"))}>
                        <User className="mr-2 h-4 w-4" /> About Me <CommandShortcut>⌘A</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="portfolio" onSelect={() => runCommand(() => onNavigate("portfolio"))}>
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Portfolio <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="experience" onSelect={() => runCommand(() => onNavigate("experience"))}>
                        <Briefcase className="mr-2 h-4 w-4" /> Experience <CommandShortcut>⌘E</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="contact" onSelect={() => runCommand(() => onNavigate("contact"))}>
                        <Mail className="mr-2 h-4 w-4" /> Contact <CommandShortcut>⌘C</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />

                <CommandGroup heading="Projects">
                    {resume.projects.map((project) => (
                        <CommandItem
                            key={project.title}
                            value={project.title + " " + project.techStack.join(" ")}
                            onSelect={() => runCommand(() => onNavigate("portfolio"))}
                        >
                            <Box className="mr-2 h-4 w-4" /> {project.title}
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => runCommand(() => {
                        navigator.clipboard.writeText(resume.email);
                        toast.success("Email copied");
                    })}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Email
                    </CommandItem>
                    {resume.contact.socials.map((social) => (
                        <CommandItem key={social.name} onSelect={() => runCommand(() => window.open(social.url, "_blank"))}>
                            <ExternalLink className="mr-2 h-4 w-4" /> {social.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}