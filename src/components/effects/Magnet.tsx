// src/components/effects/Magnet.tsx
import { useRef, useCallback, HTMLAttributes, ReactNode, MouseEvent } from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    wrapperClassName?: string;
    innerClassName?: string;
}

export function Magnet({
    children,
    padding = 20,
    disabled = false,
    magnetStrength = 2.5,
    activeTransition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
    inactiveTransition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    wrapperClassName = "",
    innerClassName = "",
    style,
    ...props
}: MagnetProps) {
    const magnetRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const rafIdRef = useRef<number | null>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (disabled || !magnetRef.current || !innerRef.current) return;

            const clientX = e.clientX;
            const clientY = e.clientY;

            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

            rafIdRef.current = requestAnimationFrame(() => {
                if (!magnetRef.current || !innerRef.current) return;
                const rect = magnetRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const offsetX = (clientX - centerX) / magnetStrength;
                const offsetY = (clientY - centerY) / magnetStrength;

                innerRef.current.style.transition = activeTransition;
                innerRef.current.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
            });
        },
        [disabled, magnetStrength, activeTransition]
    );

    const handleMouseLeave = useCallback(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        if (innerRef.current) {
            innerRef.current.style.transition = inactiveTransition;
            innerRef.current.style.transform = "translate3d(0px, 0px, 0)";
        }
    }, [inactiveTransition]);

    return (
        <div
            ref={magnetRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={wrapperClassName}
            style={{ position: "relative", display: "inline-block", ...style }}
            {...props}
        >
            <div
                ref={innerRef}
                className={innerClassName}
                style={{
                    transform: "translate3d(0px, 0px, 0)",
                    willChange: "transform"
                }}
            >
                {children}
            </div>
        </div>
    );
}
