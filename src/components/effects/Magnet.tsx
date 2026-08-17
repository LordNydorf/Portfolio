// src/components/effects/Magnet.tsx
import { useState, useEffect, useRef, HTMLAttributes, ReactNode } from "react";

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
    padding = 60,
    disabled = false,
    magnetStrength = 2.5,
    activeTransition = "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
    inactiveTransition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    wrapperClassName = "",
    innerClassName = "",
    ...props
}: MagnetProps) {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const magnetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (disabled) {
            setPosition({ x: 0, y: 0 });
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetRef.current) return;

            const rect = magnetRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = Math.abs(centerX - e.clientX);
            const distY = Math.abs(centerY - e.clientY);

            if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
                setIsActive(true);
                const offsetX = (e.clientX - centerX) / magnetStrength;
                const offsetY = (e.clientY - centerY) / magnetStrength;
                setPosition({ x: offsetX, y: offsetY });
            } else {
                if (isActive) {
                    setIsActive(false);
                    setPosition({ x: 0, y: 0 });
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [padding, disabled, magnetStrength, isActive]);

    return (
        <div
            ref={magnetRef}
            className={wrapperClassName}
            style={{ position: "relative", display: "inline-block" }}
            {...props}
        >
            <div
                className={innerClassName}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    transition: isActive ? activeTransition : inactiveTransition,
                    willChange: "transform"
                }}
            >
                {children}
            </div>
        </div>
    );
}
