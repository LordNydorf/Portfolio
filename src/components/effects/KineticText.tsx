// src/components/effects/KineticText.tsx
import { cn } from "@/lib/utils";

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

export function ShinyText({ text, disabled = false, speed = 4, className = "" }: ShinyTextProps) {
    const animationDuration = `${speed}s`;

    return (
        <span
            className={cn(
                "inline-block bg-clip-text text-transparent",
                "bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] dark:bg-[linear-gradient(110deg,#71717a,45%,#ffffff,55%,#71717a)]",
                "bg-[length:200%_100%]",
                !disabled && "animate-shine",
                className
            )}
            style={{
                animationDuration: disabled ? undefined : animationDuration
            }}
        >
            {text}
        </span>
    );
}
