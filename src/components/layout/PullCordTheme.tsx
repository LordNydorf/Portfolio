// src/components/layout/PullCordTheme.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers";
import { Zap, Sun, Moon } from "lucide-react";

const LIGHT_QUOTES = [
    "⚠️ FLASHBANG! 10,000 NITS DEPLOYED!",
    "MY EYES! WHO TURNED ON THE SUN?!",
    "Light Mode? Are you coding outside at noon?!",
    "Praise the Sun! ☀️ (Retinas burning)",
    "Daylight detected: Melatonin depleted."
];

const DARK_QUOTES = [
    "🦇 Vampire Mode Restored: Darkness is my ally.",
    "Ah, blessed darkness. My retinas thank you.",
    "Hacker Cave 1337 Mode: Re-engaged.",
    "Lights OUT. Sneak level: 100.",
    "Dark theme: +50% coding speed guaranteed."
];

export function PullCordTheme() {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [isPulling, setIsPulling] = useState(false);
    const [quote, setQuote] = useState<string | null>(null);
    const [flash, setFlash] = useState(false);

    const startYRef = useRef<number>(0);
    const pullY = useMotionValue(0);
    const springY = useSpring(pullY, { stiffness: 450, damping: 18, mass: 0.6 });

    // Derive cord stretch length and rotation
    const chainScaleY = useTransform(springY, [0, 80], [1, 1.8]);
    const bulbRotate = useTransform(springY, [-20, 80], [-10, 15]);

    const PULL_THRESHOLD = 45;

    const triggerSwitch = useCallback(() => {
        const nextTheme = isDark ? "light" : "dark";
        setTheme(nextTheme);

        // Flashbang effect only if user hasn't requested reduced motion
        const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            setFlash(true);
            setTimeout(() => setFlash(false), 300);
        }

        // Select funny quote
        const quotesList = nextTheme === "light" ? LIGHT_QUOTES : DARK_QUOTES;
        const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
        setQuote(randomQuote);

        setTimeout(() => {
            setQuote(null);
        }, 3200);
    }, [isDark, setTheme]);

    const handleStart = (clientY: number) => {
        setIsPulling(true);
        startYRef.current = clientY;
    };

    const handleMove = useCallback((clientY: number) => {
        if (!isPulling) return;
        const delta = Math.max(0, Math.min(80, clientY - startYRef.current));
        pullY.set(delta);
    }, [isPulling, pullY]);

    const handleEnd = useCallback(() => {
        if (!isPulling) return;
        setIsPulling(false);

        if (pullY.get() >= PULL_THRESHOLD) {
            triggerSwitch();
        }

        pullY.set(0);
    }, [isPulling, pullY, triggerSwitch]);

    // Mouse event handlers
    const onMouseDown = (e: React.MouseEvent) => {
        handleStart(e.clientY);
    };

    // Touch event handlers for mobile touchscreens
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            handleStart(e.touches[0].clientY);
        }
    };

    useEffect(() => {
        if (!isPulling) return;

        const onMouseMove = (e: MouseEvent) => {
            handleMove(e.clientY);
        };

        const onMouseUp = () => {
            handleEnd();
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                handleMove(e.touches[0].clientY);
            }
        };

        const onTouchEnd = () => {
            handleEnd();
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [isPulling, handleMove, handleEnd]);

    return (
        <>
            {/* Screen Flashbang Effect */}
            <AnimatePresence>
                {flash && (
                    <motion.div
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="fixed inset-0 z-[999] pointer-events-none bg-white"
                    />
                )}
            </AnimatePresence>

            {/* Funny Speech Toast Popup */}
            <AnimatePresence>
                {quote && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="fixed top-16 sm:top-20 right-4 sm:right-12 z-[100] max-w-[280px] sm:max-w-xs px-3.5 py-2.5 rounded-2xl bg-black/90 dark:bg-white/95 text-white dark:text-black shadow-2xl border border-white/20 dark:border-black/20 text-xs font-mono font-bold flex items-center gap-2 select-none"
                    >
                        <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                        <span>{quote}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Ceiling Pull Cord Hanging Unit */}
            <div className="fixed top-0 right-4 sm:right-16 z-50 flex flex-col items-center select-none pointer-events-auto">
                {/* Brass Ceiling Mount */}
                <div className="w-5 sm:w-6 h-2 rounded-b-md bg-amber-600/90 shadow-md border-x border-b border-amber-400/40" />

                {/* Beaded Brass Chain */}
                <motion.div
                    style={{
                        scaleY: chainScaleY,
                        originY: 0
                    }}
                    className="w-1 flex flex-col items-center gap-1 py-0.5"
                >
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                        />
                    ))}
                </motion.div>

                {/* The Pullable Light Bulb / Brass Ring */}
                <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`Switch to ${isDark ? "light" : "dark"} theme (Pull cord)`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            pullY.set(50);
                            setTimeout(() => {
                                pullY.set(0);
                                triggerSwitch();
                            }, 120);
                        }
                    }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    onClick={() => {
                        pullY.set(50);
                        setTimeout(() => {
                            pullY.set(0);
                            triggerSwitch();
                        }, 120);
                    }}
                    style={{
                        y: springY,
                        rotate: bulbRotate
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-grab active:cursor-grabbing relative p-2 sm:p-2.5 rounded-full border transition-shadow touch-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isDark
                            ? "bg-[#161622] border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            : "bg-amber-100 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)]"
                    }`}
                    title="Pull or tap to toggle theme (Warning: may cause flashbang)"
                >
                    {/* Glowing Filament */}
                    <div className="relative flex items-center justify-center">
                        {isDark ? (
                            <Moon className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                        ) : (
                            <Sun className="w-4 h-4 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,1)] animate-spin-slow" />
                        )}
                    </div>

                    {/* Pull Me Tooltip Tag */}
                    <div className="absolute top-1/2 -left-20 -translate-y-1/2 px-2 py-0.5 rounded-md bg-black/80 dark:bg-white/90 text-white dark:text-black text-[9px] font-mono font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg hidden sm:block">
                        YANK CORD ↓
                    </div>
                </motion.div>
            </div>
        </>
    );
}
