// src/components/layout/Footer.tsx
import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Magnet } from "@/components/effects";
import { resume } from "@/data/resume";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full border-t border-black/5 dark:border-white/5 py-12 px-6 relative z-10 backdrop-blur-md bg-black/[0.02] dark:bg-black/20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                    <div className="text-base font-bold text-foreground tracking-tight">{resume.name}</div>
                    <p className="text-xs text-muted-foreground">
                        Crafted with Next-Gen React, Tailwind CSS & Spatial 3D Physics • {resume.location}, India
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Magnet padding={20} magnetStrength={3}>
                        <a
                            href="https://github.com/lordnydorf"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-all bg-black/5 dark:bg-white/5 block"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </Magnet>

                    <Magnet padding={20} magnetStrength={3}>
                        <a
                            href="https://www.linkedin.com/in/rohit-krishnan-633a43250/"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-all bg-black/5 dark:bg-white/5 block"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </Magnet>

                    <Magnet padding={20} magnetStrength={3}>
                        <a
                            href="https://www.instagram.com/i_.rohit._i/"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-all bg-black/5 dark:bg-white/5 block"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                    </Magnet>

                    <Magnet padding={20} magnetStrength={3}>
                        <a
                            href={`mailto:${resume.email}`}
                            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-all bg-black/5 dark:bg-white/5 block"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </Magnet>

                    <div className="h-5 w-px bg-black/10 dark:border-white/10 mx-1" />

                    <Magnet padding={20} magnetStrength={3}>
                        <button
                            onClick={scrollToTop}
                            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all bg-black/5 dark:bg-white/5 flex items-center gap-1.5 text-xs font-semibold"
                            aria-label="Back to Top"
                        >
                            <ArrowUp className="w-4 h-4" />
                            <span className="hidden sm:inline">Top</span>
                        </button>
                    </Magnet>
                </div>
            </div>
        </footer>
    );
}
