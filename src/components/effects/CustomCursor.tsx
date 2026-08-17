// src/components/effects/CustomCursor.tsx
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorState {
    variant: "default" | "pointer" | "view" | "drag" | "hidden";
    text?: string;
}

export function CustomCursor() {
    const [cursorState, setCursorState] = useState<CursorState>({ variant: "default" });
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for trailing smooth halo
    const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
    const haloX = useSpring(mouseX, springConfig);
    const haloY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect touch device
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Contextual detection via element data attributes or tags
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
            if (cursorEl) {
                const cursorType = cursorEl.getAttribute("data-cursor") as CursorState["variant"];
                const text = cursorEl.getAttribute("data-cursor-text") || undefined;
                setCursorState({ variant: cursorType || "pointer", text });
                return;
            }

            const isInteractive = target.closest("button, a, input, textarea, select, [role='button'], [tabindex='0']");
            if (isInteractive) {
                setCursorState({ variant: "pointer" });
            } else {
                setCursorState({ variant: "default" });
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    if (isTouch || !isVisible) return null;

    const isCustomPill = cursorState.variant === "view" || cursorState.variant === "drag";

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
            {/* Direct precise cursor dot */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary z-20 pointer-events-none transition-opacity duration-200",
                    isCustomPill ? "opacity-0" : "opacity-100"
                )}
                style={{
                    x: mouseX,
                    y: mouseY
                }}
            />

            {/* Fluid Morphing Trailing Halo */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 flex items-center justify-center pointer-events-none z-10 select-none",
                    "rounded-full transition-colors duration-300"
                )}
                style={{
                    x: haloX,
                    y: haloY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    width: isCustomPill ? 88 : cursorState.variant === "pointer" ? 44 : 28,
                    height: isCustomPill ? 36 : cursorState.variant === "pointer" ? 44 : 28,
                    borderRadius: 9999,
                    backgroundColor: isCustomPill
                        ? "rgba(239, 68, 68, 0.9)"
                        : cursorState.variant === "pointer"
                        ? "rgba(239, 68, 68, 0.12)"
                        : "transparent",
                    borderColor: isCustomPill
                        ? "rgba(255, 255, 255, 0.5)"
                        : cursorState.variant === "pointer"
                        ? "rgba(239, 68, 68, 0.6)"
                        : "rgba(239, 68, 68, 0.35)",
                    borderWidth: 1,
                    backdropFilter: isCustomPill ? "blur(8px)" : "none",
                    boxShadow: isCustomPill
                        ? "0 0 24px -2px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                        : cursorState.variant === "pointer"
                        ? "0 0 16px -2px rgba(239, 68, 68, 0.3)"
                        : "none"
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 26
                }}
            >
                {isCustomPill && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1 drop-shadow-sm font-mono"
                    >
                        {cursorState.text || (cursorState.variant === "view" ? "VIEW ↗" : "DRAG ✦")}
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
}
