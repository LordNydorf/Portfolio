// src/components/interactive/InteractiveTerminal.tsx
import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { resume } from "@/data/resume";

interface InteractiveTerminalProps {
    onAtmosphereChange: (id: string) => void;
    onNavigate: (sectionId: string) => void;
}

interface CommandHistoryItem {
    id: string;
    command: string;
    output: React.ReactNode;
}

export function InteractiveTerminal({ onAtmosphereChange, onNavigate }: InteractiveTerminalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState<CommandHistoryItem[]>([
        {
            id: "init",
            command: "system --init",
            output: (
                <div className="text-muted-foreground text-xs space-y-1">
                    <p className="text-primary font-bold">ROHIT KRISHNAN DEV-CLI v2.4.0 (Active)</p>
                    <p>Type <span className="text-foreground font-semibold">help</span> to view available commands, or <span className="text-foreground font-semibold">theme &lt;name&gt;</span> to mutate the spatial matrix.</p>
                </div>
            )
        }
    ]);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            inputRef.current?.focus();
        }
    }, [history, isOpen]);

    const handleCommand = (e: FormEvent) => {
        e.preventDefault();
        const cmd = inputVal.trim();
        if (!cmd) return;

        const parts = cmd.toLowerCase().split(" ");
        const mainCmd = parts[0];
        const arg = parts[1];

        let output: React.ReactNode = null;

        switch (mainCmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
                        <div><span className="text-primary font-mono font-bold">about</span> - Who is Rohit Krishnan?</div>
                        <div><span className="text-primary font-mono font-bold">skills</span> - Technical arsenal matrix</div>
                        <div><span className="text-primary font-mono font-bold">works</span> - Jump to project case studies</div>
                        <div><span className="text-primary font-mono font-bold">theme &lt;mode&gt;</span> - Set shader: crimson, violet, matrix, aurora</div>
                        <div><span className="text-primary font-mono font-bold">hire</span> - Open direct contact terminal</div>
                        <div><span className="text-primary font-mono font-bold">clear</span> - Clear terminal logs</div>
                    </div>
                );
                break;

            case "about":
            case "bio":
                output = (
                    <div className="space-y-1 text-xs text-muted-foreground">
                        <p className="text-foreground font-bold">{resume.name} — {resume.role}</p>
                        <p>{resume.bio.join(" ")}</p>
                    </div>
                );
                break;

            case "skills":
                output = (
                    <div className="text-xs space-y-1">
                        <div className="text-primary font-bold">CORE ARSENAL:</div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {resume.skills.map((s) => (
                                <span key={s} className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">{s}</span>
                            ))}
                        </div>
                    </div>
                );
                break;

            case "works":
            case "projects":
                onNavigate("portfolio");
                output = <p className="text-xs text-emerald-400">✓ Navigated to Featured Works section.</p>;
                break;

            case "experience":
                onNavigate("experience");
                output = <p className="text-xs text-emerald-400">✓ Navigated to Experience section.</p>;
                break;

            case "contact":
            case "hire":
                onNavigate("contact");
                output = <p className="text-xs text-emerald-400">✓ Navigated to Contact terminal.</p>;
                break;

            case "theme":
                if (arg === "crimson" || arg === "cyber-crimson") {
                    onAtmosphereChange("cyber-crimson");
                    output = <p className="text-xs text-red-400">✦ Atmosphere switched to Cyber Crimson.</p>;
                } else if (arg === "violet" || arg === "indigo" || arg === "hyper-violet") {
                    onAtmosphereChange("hyper-violet");
                    output = <p className="text-xs text-indigo-400">✦ Atmosphere switched to Cosmic Indigo.</p>;
                } else if (arg === "matrix" || arg === "vector-matrix") {
                    onAtmosphereChange("vector-matrix");
                    output = <p className="text-xs text-blue-400">✦ Atmosphere switched to Architectural Grid.</p>;
                } else if (arg === "aurora" || arg === "quantum-aurora") {
                    onAtmosphereChange("quantum-aurora");
                    output = <p className="text-xs text-emerald-400">✦ Atmosphere switched to Quantum Aurora.</p>;
                } else {
                    output = <p className="text-xs text-amber-400">Usage: theme [crimson | violet | matrix | aurora]</p>;
                }
                break;

            case "clear":
                setHistory([]);
                setInputVal("");
                return;

            case "sudo":
                output = <p className="text-xs text-primary font-mono font-bold">Permission granted: Welcome, Architect.</p>;
                break;

            default:
                output = (
                    <p className="text-xs text-red-400">
                        Command not recognized: <span className="font-mono">{cmd}</span>. Type <span className="font-bold underline">help</span> for commands.
                    </p>
                );
        }

        setHistory((prev) => [
            ...prev,
            {
                id: Math.random().toString(),
                command: cmd,
                output
            }
        ]);
        setInputVal("");
    };

    return (
        <>
            {/* Floating Terminal Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/85 dark:bg-[#0c0c12]/90 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:border-primary/50 text-foreground text-xs font-mono font-semibold transition-all group select-none"
                aria-label="Open Interactive CLI Terminal"
            >
                <TerminalIcon className="w-4 h-4 text-primary group-hover:animate-pulse" />
                <span className="hidden sm:inline">DEV-CLI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.button>

            {/* Interactive Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`fixed z-50 rounded-2xl bg-black/90 dark:bg-[#08080c]/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden ${
                            isMaximized
                                ? "inset-4 sm:inset-10"
                                : "bottom-6 right-6 w-[92vw] sm:w-[500px] h-[380px]"
                        }`}
                    >
                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10 select-none">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
                                <span className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" />
                                <span className="ml-2 text-xs font-mono font-semibold text-white/70 flex items-center gap-1.5">
                                    <TerminalIcon className="w-3.5 h-3.5 text-primary" />
                                    rohit@portfolio: ~
                                </span>
                            </div>

                            <div className="flex items-center gap-1 text-white/60">
                                <button
                                    onClick={() => setIsMaximized(!isMaximized)}
                                    className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Output Log Area */}
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-white/90 space-y-3 scroll-smooth hide-scrollbar">
                            {history.map((item) => (
                                <div key={item.id} className="space-y-1">
                                    <div className="flex items-center gap-2 text-white/50">
                                        <span className="text-primary font-bold">❯</span>
                                        <span className="text-white font-semibold">{item.command}</span>
                                    </div>
                                    <div className="pl-4">{item.output}</div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Terminal Input Line */}
                        <form
                            onSubmit={handleCommand}
                            className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-t border-white/10"
                        >
                            <span className="text-primary font-mono font-bold text-sm">❯</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder="Type a command (e.g. help, skills, theme violet)..."
                                className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <CornerDownLeft className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
