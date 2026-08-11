// src/components/TiltedFigure.tsx
import { useEffect, useRef } from "react";

export function TiltedFigure({
                                 src,
                                 alt,
                             }: {
    src: string;
    alt: string;
}) {
    const figRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    // FIX: Use useRef for mutable values that don't trigger re-renders
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const el = figRef.current;
        if (!el) return;

        if (window.matchMedia("(max-width: 768px)").matches) return;

        const onPointerMove = (e: PointerEvent) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            const x = ((my / rect.height) - 0.5) * -8;
            const y = ((mx / rect.width) - 0.5) * 8;

            // Update the Ref, not a local variable
            targetRef.current = { x, y };

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                // Read from the Ref
                el.style.transform = `perspective(1000px) rotateX(${targetRef.current.x}deg) rotateY(${targetRef.current.y}deg)`;
            });
        };

        const onPointerLeave = () => {
            if (!el) return;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        };

        el.addEventListener("pointermove", onPointerMove);
        el.addEventListener("pointerleave", onPointerLeave);
        return () => {
            el.removeEventListener("pointermove", onPointerMove);
            el.removeEventListener("pointerleave", onPointerLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={figRef}
            className="w-full max-w-[280px] md:max-w-[300px] aspect-[3/4] rounded-[1rem] overflow-hidden border-2 border-white/20 glass-card preserve-3d transform-gpu transition-transform duration-200 ease-out"
            style={{
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover md:[transform:translateZ(20px)]"
                loading="eager"
                decoding="async"
            />
        </div>
    );
}