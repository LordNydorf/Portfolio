// src/components/effects/VariableProximity.tsx
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VariableProximityProps {
    label: string;
    className?: string;
    radius?: number;
    falloff?: "linear" | "exponential" | "gaussian";
}

export function VariableProximity({
    label,
    className = "",
    radius = 120,
    falloff = "gaussian"
}: VariableProximityProps) {
    const containerRef = useRef<HTMLHeadingElement | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const handleMouseLeave = () => {
            setMousePos({ x: -1000, y: -1000 });
        };

        const element = containerRef.current;
        if (element) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
            element.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (element) element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const words = label.split(" ");

    return (
        <span ref={containerRef} className={cn("inline-flex flex-wrap gap-x-2.5", className)}>
            {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex">
                    {word.split("").map((letter, letterIdx) => {
                        return (
                            <LetterSpan
                                key={`${wordIdx}-${letterIdx}`}
                                char={letter}
                                mousePos={mousePos}
                                radius={radius}
                                falloff={falloff}
                            />
                        );
                    })}
                </span>
            ))}
        </span>
    );
}

function LetterSpan({
    char,
    mousePos,
    radius,
    falloff
}: {
    char: string;
    mousePos: { x: number; y: number };
    radius: number;
    falloff: "linear" | "exponential" | "gaussian";
}) {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const [scale, setScale] = useState(1);
    const [glow, setGlow] = useState(0);

    useEffect(() => {
        if (!spanRef.current) return;
        const rect = spanRef.current.getBoundingClientRect();
        const parentRect = spanRef.current.parentElement?.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        const letterCenterX = rect.left - parentRect.left + rect.width / 2;
        const letterCenterY = rect.top - parentRect.top + rect.height / 2;

        const dist = Math.hypot(mousePos.x - letterCenterX, mousePos.y - letterCenterY);

        if (dist < radius) {
            const norm = 1 - dist / radius;
            let factor = norm;
            if (falloff === "exponential") factor = norm * norm;
            if (falloff === "gaussian") factor = Math.exp(-Math.pow(dist / (radius * 0.5), 2));

            setScale(1 + factor * 0.28);
            setGlow(factor);
        } else {
            setScale(1);
            setGlow(0);
        }
    }, [mousePos, radius, falloff]);

    return (
        <span
            ref={spanRef}
            className="inline-block transition-transform duration-100 ease-out origin-bottom select-none"
            style={{
                transform: `scale(${scale})`,
                color: glow > 0.3 ? "hsl(var(--primary))" : undefined,
                textShadow: glow > 0.3 ? `0 0 ${glow * 18}px rgba(239, 68, 68, ${glow * 0.8})` : undefined
            }}
        >
            {char}
        </span>
    );
}
