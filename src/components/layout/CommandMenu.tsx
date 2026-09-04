// src/components/layout/CommandMenu.tsx
import * as React from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    LayoutDashboard,
    Briefcase,
    User,
    Mail,
    ExternalLink,
    Box,
    Copy,
    Sun,
    Moon,
    Activity
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/components/providers";
import { resume } from "@/data/resume";

interface CommandMenuProps {
    onNavigate: (page: string) => void;
}

export function CommandMenu({ onNavigate }: CommandMenuProps) {
    const [open, setOpen] = React.useState(false);
    const { resolvedTheme, setTheme } = useTheme();

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
                        <User className="mr-2 h-4 w-4" /> About Me
                    </CommandItem>
                    <CommandItem value="github activity commits contributions" onSelect={() => runCommand(() => onNavigate("about"))}>
                        <Activity className="mr-2 h-4 w-4 text-emerald-500" /> GitHub Activity
                    </CommandItem>
                    <CommandItem value="portfolio" onSelect={() => runCommand(() => onNavigate("portfolio"))}>
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Portfolio
                    </CommandItem>
                    <CommandItem value="experience" onSelect={() => runCommand(() => onNavigate("experience"))}>
                        <Briefcase className="mr-2 h-4 w-4" /> Experience
                    </CommandItem>
                    <CommandItem value="contact" onSelect={() => runCommand(() => onNavigate("contact"))}>
                        <Mail className="mr-2 h-4 w-4" /> Contact
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />

                <CommandGroup heading="Theme">
                    <CommandItem
                        value="toggle switch light dark theme mode"
                        onSelect={() => runCommand(() => {
                            const next = resolvedTheme === "dark" ? "light" : "dark";
                            setTheme(next);
                            toast.success(`Switched to ${next} theme`);
                        })}
                    >
                        {resolvedTheme === "dark" ? (
                            <>
                                <Sun className="mr-2 h-4 w-4 text-amber-500" /> Switch to Light Theme
                            </>
                        ) : (
                            <>
                                <Moon className="mr-2 h-4 w-4 text-amber-400" /> Switch to Dark Theme
                            </>
                        )}
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
