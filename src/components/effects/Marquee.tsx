// src/components/effects/Marquee.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

export function Marquee({
    children,
    direction = "left",
    speed = 28,
    className = ""
}: MarqueeProps) {
    return (
        <div className={cn("marquee-container", className)}>
            <div
                className={cn("marquee-track", direction === "right" && "reverse")}
                style={{ animationDuration: `${speed}s` }}
            >
                <div className="flex items-center gap-6 shrink-0 pr-6">
                    {children}
                </div>
            </div>
            <div
                aria-hidden="true"
                className={cn("marquee-track", direction === "right" && "reverse")}
                style={{ animationDuration: `${speed}s` }}
            >
                <div className="flex items-center gap-6 shrink-0 pr-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
