// src/components/layout/FloatingNavbar.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AtmosphereSwitcher } from "./AtmosphereSwitcher";
import { BorderBeam } from "@/components/effects";
import { getAssetUrl, cn } from "@/lib/utils";
import { resume } from "@/data/resume";

interface FloatingNavbarProps {
    activeSection: string;
    onNavigate: (sectionId: string) => void;
    atmosphere: string;
    onAtmosphereChange: (id: string) => void;
}

const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "portfolio", label: "Works" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
];

export function FloatingNavbar({
    activeSection,
    onNavigate,
    atmosphere,
    onAtmosphereChange
}: FloatingNavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleItemClick = (id: string) => {
        onNavigate(id);
        setMobileOpen(false);
    };

    return (
        <>
            {/* Desktop Center Floating Dynamic Island */}
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex fixed top-4 inset-x-0 mx-auto w-fit z-50 items-center gap-2 p-1.5 rounded-full bg-background/80 dark:bg-[#0c0c12]/85 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] select-none"
            >
                {/* Logo & Identity Pill */}
                <button
                    onClick={() => handleItemClick("about")}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                    <div className="relative">
                        <img
                            src={getAssetUrl("/portrait_tiny.webp")}
                            alt={resume.name}
                            className="w-7 h-7 rounded-full border border-black/10 dark:border-white/20 object-cover shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>
                    <span className="text-xs font-bold text-foreground tracking-tight">{resume.name}</span>
                </button>

                <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

                {/* Primary Nav Links with Animated Active Pill */}
                <nav className="flex items-center gap-1 px-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item.id)}
                                className={cn(
                                    "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors select-none z-10",
                                    isActive
                                        ? "text-primary dark:text-white font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="floatingNavPill"
                                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/40 shadow-sm -z-10 overflow-hidden"
                                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                                    >
                                        <BorderBeam size={60} duration={4} borderWidth={1} colorFrom="hsl(var(--primary))" colorTo="#ffffff" />
                                    </motion.div>
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

                {/* Controls & Quick Actions */}
                <div className="flex items-center gap-1.5 pr-1">
                    <button
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                        aria-label="Quick Search"
                    >
                        <Search className="w-3.5 h-3.5 text-primary" />
                        <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-1 font-mono text-[9px]">
                            ⌘K
                        </kbd>
                    </button>

                    <AtmosphereSwitcher
                        variant="compact"
                        currentAtmosphereId={atmosphere}
                        onSelectAtmosphere={onAtmosphereChange}
                    />
                </div>
            </motion.header>

            {/* Mobile Top Floating Capsule */}
            <header className="md:hidden fixed top-3 inset-x-3 z-50 flex items-center justify-between p-2.5 rounded-2xl bg-background/85 dark:bg-[#0c0c10]/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-lg">
                <button onClick={() => handleItemClick("about")} className="flex items-center gap-2">
                    <img
                        src={getAssetUrl("/portrait_tiny.webp")}
                        alt={resume.name}
                        className="w-8 h-8 rounded-full border border-black/10 dark:border-white/20 object-cover shadow-sm"
                    />
                    <span className="text-xs font-bold text-foreground">{resume.name}</span>
                </button>

                <div className="flex items-center gap-1.5">
                    <AtmosphereSwitcher
                        variant="compact"
                        currentAtmosphereId={atmosphere}
                        onSelectAtmosphere={onAtmosphereChange}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl border border-black/10 dark:border-white/10"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </Button>
                </div>
            </header>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed top-16 inset-x-3 z-40 p-4 rounded-2xl bg-background/95 dark:bg-[#0c0c10]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3"
                    >
                        <div className="grid gap-1">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors",
                                        activeSection === item.id
                                            ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
