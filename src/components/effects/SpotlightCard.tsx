// src/components/effects/SpotlightCard.tsx
import { useRef, useState, useCallback, HTMLAttributes, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    enableTilt?: boolean;
    tiltIntensity?: number;
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(239, 68, 68, 0.12)",
    enableTilt = false,
    tiltIntensity = 10,
    ...props
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState<{ transform: string; transition: string }>({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
    });

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cardRef.current.style.setProperty("--mouse-x", `${x}px`);
            cardRef.current.style.setProperty("--mouse-y", `${y}px`);
            cardRef.current.style.setProperty("--spotlight-color", spotlightColor);

            if (enableTilt) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
                const rotateY = ((x - centerX) / centerX) * tiltIntensity;

                setTiltStyle({
                    transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
                    transition: "transform 0.1s ease-out"
                });
            }
        },
        [spotlightColor, enableTilt, tiltIntensity]
    );

    const handleMouseLeave = useCallback(() => {
        if (enableTilt) {
            setTiltStyle({
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
            });
        }
    }, [enableTilt]);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={enableTilt ? tiltStyle : undefined}
            className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-card/70 dark:bg-[#0c0c0e]/80",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
                "backdrop-blur-xl transition-all duration-300",
                "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
                "before:bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--spotlight-color,rgba(239,68,68,0.12)),transparent_70%)]",
                className
            )}
            {...props}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}
