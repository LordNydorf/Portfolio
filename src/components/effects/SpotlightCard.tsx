// src/components/effects/SpotlightCard.tsx
import { useRef, useCallback, HTMLAttributes, ReactNode, MouseEvent } from "react";
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
    style,
    ...props
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rafIdRef = useRef<number | null>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

            rafIdRef.current = requestAnimationFrame(() => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                cardRef.current.style.setProperty("--mouse-x", `${x}px`);
                cardRef.current.style.setProperty("--mouse-y", `${y}px`);
                cardRef.current.style.setProperty("--spotlight-color", spotlightColor);

                if (enableTilt) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
                    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

                    cardRef.current.style.transition = "transform 0.1s ease-out";
                    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
                }
            });
        },
        [spotlightColor, enableTilt, tiltIntensity]
    );

    const handleMouseLeave = useCallback(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        if (enableTilt && cardRef.current) {
            cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
    }, [enableTilt]);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
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
