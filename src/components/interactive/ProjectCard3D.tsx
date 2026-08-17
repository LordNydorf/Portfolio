// src/components/interactive/ProjectCard3D.tsx
import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ProjectCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}

export function ProjectCard3D({
    children,
    className = "",
    maxTilt = 14,
    ...props
}: ProjectCard3DProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [transformStyle, setTransformStyle] = useState("");
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        const glarePercentX = (x / rect.width) * 100;
        const glarePercentY = (y / rect.height) * 100;

        setTransformStyle(
            `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
        );

        setGlarePos({
            x: glarePercentX,
            y: glarePercentY,
            opacity: 1
        });
    }, [maxTilt]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
        setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: transformStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transformStyle: "preserve-3d",
                willChange: "transform"
            }}
            className={cn(
                "relative rounded-[2rem] border overflow-hidden transition-all duration-300",
                "bg-card/75 dark:bg-[#0c0c12]/80 backdrop-blur-2xl",
                "border-black/10 dark:border-white/10",
                isHovered
                    ? "border-primary/50 shadow-[0_25px_50px_-12px_rgba(239,68,68,0.3),0_0_30px_-5px_rgba(239,68,68,0.2)]"
                    : "shadow-xl",
                className
            )}
            {...props}
        >
            {/* Holographic Prismatic Foil Reflection */}
            <div
                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-screen"
                style={{
                    opacity: glarePos.opacity * 0.7,
                    background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(239, 68, 68, 0.4) 30%, rgba(59, 130, 246, 0.25) 55%, transparent 70%)`
                }}
            />

            {/* Specular Edge Glow */}
            <div
                className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                style={{
                    opacity: glarePos.opacity,
                    background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(239, 68, 68, 0.18), transparent 80%)`
                }}
            />

            {/* Top Border Refraction Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none z-20" />

            {/* Card Content */}
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </div>
    );
}
