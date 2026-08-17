// src/components/interactive/LanyardBadge.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, QrCode, Terminal } from "lucide-react";
import { resume } from "@/data/resume";
import { getAssetUrl } from "@/lib/utils";

export function LanyardBadge() {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Physics motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 180, damping: 18, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Rotations derived from mouse drag
    const rotateZ = useTransform(springX, [-150, 150], [-25, 25]);
    const rotateY = useTransform(springX, [-150, 150], [-30, 30]);
    const rotateX = useTransform(springY, [-150, 150], [25, -25]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!cardRef.current || !isDragging) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    }, [isDragging, mouseX, mouseY]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const photoSrc = getAssetUrl("/portrait_rohit_bgless.webp");

    return (
        <div className="relative flex flex-col items-center justify-center select-none py-4">
            {/* Lanyard Top Ribbon & Metal Clip */}
            <div className="flex flex-col items-center z-20 pointer-events-none">
                {/* Lanyard Ribbon Strap */}
                <div className="w-6 h-16 bg-gradient-to-b from-primary/80 via-primary to-primary/90 rounded-t-md shadow-md border-x border-white/20 relative flex items-center justify-center overflow-hidden">
                    <div className="w-1 h-full bg-white/25" />
                    <span className="absolute text-[8px] font-mono text-white/80 rotate-90 tracking-widest font-bold">
                        DEV-ID
                    </span>
                </div>

                {/* Metal Clip Ring */}
                <div className="w-8 h-4 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded-sm border border-neutral-300 shadow-sm" />
                <div className="w-3 h-5 bg-neutral-500 rounded-full border border-neutral-400 -mt-1 shadow-inner" />
            </div>

            {/* Swinging Physics Badge Card */}
            <motion.div
                ref={cardRef}
                onMouseDown={() => setIsDragging(true)}
                style={{
                    x: springX,
                    y: springY,
                    rotateX,
                    rotateY,
                    rotateZ,
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d"
                }}
                className={`relative w-[280px] sm:w-[300px] h-[400px] rounded-[1.75rem] p-6 -mt-2 cursor-grab active:cursor-grabbing transition-shadow ${
                    isDragging
                        ? "shadow-[0_30px_70px_-15px_rgba(239,68,68,0.5)] scale-105"
                        : "shadow-[0_20px_45px_-10px_rgba(0,0,0,0.4)]"
                } bg-background/90 dark:bg-[#0c0c14]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 overflow-hidden flex flex-col justify-between`}
            >
                {/* Specular Hologram Foil Sheen */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-50"
                    style={{
                        background:
                            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(239,68,68,0.5) 50%, rgba(59,130,246,0.4) 60%, transparent 80%)"
                    }}
                />

                {/* Top Badge Header */}
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3 z-10">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>ARCHITECT // 2026</span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>VERIFIED</span>
                    </div>
                </div>

                {/* Photo & Identity Core */}
                <div className="flex flex-col items-center text-center my-auto z-10 space-y-3">
                    <div className="relative w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-primary via-white/20 to-primary/40 shadow-lg overflow-hidden">
                        <img
                            src={photoSrc}
                            alt={resume.name}
                            className="w-full h-full object-cover rounded-xl bg-black/40"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-foreground tracking-tight">{resume.name}</h4>
                        <p className="text-xs text-primary font-mono font-semibold">{resume.role}</p>
                    </div>

                    <p className="text-[11px] text-muted-foreground max-w-[24ch] leading-snug">
                        Full-Stack Architecture & High-Performance Web Applications
                    </p>
                </div>

                {/* Bottom Barcode & Tech Specs */}
                <div className="border-t border-black/10 dark:border-white/10 pt-3 flex items-center justify-between z-10">
                    <div className="space-y-1">
                        <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                            ACCESS: LEVEL 5 // ROOT
                        </div>
                        {/* Realistic ASCII Barcode Lines */}
                        <div className="flex items-center gap-0.5 h-6">
                            {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 3, 1, 2].map((w, i) => (
                                <div
                                    key={i}
                                    style={{ width: `${w}px` }}
                                    className="h-full bg-foreground/60 dark:bg-white/60 rounded-[1px]"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-muted-foreground">
                        <QrCode className="w-6 h-6 text-foreground/80" />
                    </div>
                </div>

                {/* Grab Interaction Hint */}
                <div className="absolute bottom-1 inset-x-0 text-center text-[9px] font-mono text-muted-foreground/60 pointer-events-none">
                    ✦ DRAG & FLING BADGE ✦
                </div>
            </motion.div>
        </div>
    );
}
