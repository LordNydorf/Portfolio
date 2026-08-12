// src/components/ThemeToggle.tsx
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    className?: string;
    variant?: "compact" | "pill";
}

export function ThemeToggle({ className, variant = "compact" }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    if (variant === "pill") {
        return (
            <div
                className={cn(
                    "flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 relative cursor-pointer select-none",
                    className
                )}
                onClick={toggleTheme}
                role="button"
                tabIndex={0}
                aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleTheme();
                    }
                }}
            >
                {/* Sliding indicator */}
                <motion.div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10 z-0"
                    animate={{
                        x: isDark ? "calc(100% + 4px)" : "0%",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />

                <div
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 z-10 text-xs font-medium transition-colors",
                        !isDark ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                </div>

                <div
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 z-10 text-xs font-medium transition-colors",
                        isDark ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                </div>
            </div>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={toggleTheme}
                    className={cn(
                        "relative h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300",
                        "bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10",
                        "border-black/10 dark:border-white/10",
                        "text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        className
                    )}
                    aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isDark ? (
                            <motion.div
                                key="dark"
                                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="text-amber-400"
                            >
                                <Moon className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="light"
                                initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="text-amber-500"
                            >
                                <Sun className="h-5 w-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>Switch to {isDark ? "Light" : "Dark"} theme</p>
            </TooltipContent>
        </Tooltip>
    );
}
