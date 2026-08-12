// src/components/Navigation.tsx
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    motion,
    useSpring,
    useTransform,
    useVelocity
} from "framer-motion";

interface NavigationProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const navItems = [
    { id: "about", label: "About me" },
    { id: "portfolio", label: "Portfolio" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact me" },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
    const activeIndex = navItems.findIndex((item) => item.id === currentPage);

    // 1. The Physics Engine
    const y = useSpring(activeIndex * 56, {
        stiffness: 250,
        damping: 18,
        mass: 1
    });

    // 2. Track the Speed
    const velocity = useVelocity(y);

    // 3. The "Super Jelly" Deformation
    const scaleY = useTransform(velocity, [-3500, 0, 3500], [1.7, 1, 1.7]);
    const scaleX = useTransform(velocity, [-3500, 0, 3500], [0.6, 1, 0.6]);

    useEffect(() => {
        y.set(activeIndex * 56);
    }, [activeIndex, y]);

    return (
        <nav className="relative mt-2 w-full">
            {/* The Jelly Pill */}
            <motion.div
                className={cn(
                    "absolute left-0 top-0 w-full h-12 rounded-[0.875rem] z-0",
                    "bg-primary/10 dark:bg-primary/15",
                    "border border-primary/30 dark:border-primary/40",
                    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_4px_16px_-2px_hsl(var(--primary)/0.25)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_0_20px_-4px_hsl(var(--primary)/0.5)]",
                    "backdrop-blur-md"
                )}
                style={{
                    y,
                    scaleY,
                    scaleX,
                    willChange: "transform",
                    transformOrigin: "50% 50%"
                }}
            />

            <div className="flex flex-col gap-2 relative z-10">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                            "flex items-center gap-3 px-4 h-12 rounded-[0.875rem] font-medium transition-colors duration-300 ease-in-out text-left w-full",
                            item.id === currentPage
                                ? "text-primary dark:text-white font-semibold drop-shadow-sm dark:drop-shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:text-white dark:hover:bg-white/5"
                        )}
                    >
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}