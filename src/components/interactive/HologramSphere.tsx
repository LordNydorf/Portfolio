// src/components/interactive/HologramSphere.tsx
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers";

interface Point3D {
    x: number;
    y: number;
    z: number;
}

export function HologramSphere({ size = 220 }: { size?: number }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { theme } = useTheme();

    const isDark =
        theme === "dark" ||
        (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const radius = size * 0.38;
        const totalPoints = 140;
        const points: Point3D[] = [];

        // Generate Fibonacci sphere points
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < totalPoints; i++) {
            const y = 1 - (i / (totalPoints - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            points.push({
                x: x * radius,
                y: y * radius,
                z: z * radius
            });
        }

        let rotX = 0.2;
        let rotY = 0.3;
        let velX = 0.003;
        let velY = 0.005;
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let animId: number;
        let isIntersecting = true;
        let isVisible = !document.hidden;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting && isVisible) {
                    animId = requestAnimationFrame(render);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(canvas);

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
            if (isVisible && isIntersecting) {
                animId = requestAnimationFrame(render);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const handleStart = (clientX: number, clientY: number) => {
            isDragging = true;
            lastMouseX = clientX;
            lastMouseY = clientY;
            window.addEventListener("mousemove", onMouseMove, { passive: true });
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("touchmove", onTouchMove, { passive: true });
            window.addEventListener("touchend", onTouchEnd);
        };

        const handleMove = (clientX: number, clientY: number) => {
            if (!isDragging) return;
            const dx = clientX - lastMouseX;
            const dy = clientY - lastMouseY;

            velY = dx * 0.005;
            velX = -dy * 0.005;

            rotY += velY;
            rotX += velX;

            lastMouseX = clientX;
            lastMouseY = clientY;
        };

        const handleEnd = () => {
            isDragging = false;
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };

        const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onMouseUp = () => handleEnd();

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchEnd = () => handleEnd();

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("touchstart", onTouchStart, { passive: true });

        const render = () => {
            if (!isIntersecting || !isVisible) return;
            ctx.clearRect(0, 0, size, size);

            if (!isDragging) {
                rotX += velX;
                rotY += velY;
                velX *= 0.96;
                velY *= 0.96;
                if (Math.abs(velX) < 0.002) velX = 0.002;
                if (Math.abs(velY) < 0.004) velY = 0.004;
            }

            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);

            const centerX = size / 2;
            const centerY = size / 2;

            const projectedPoints = points.map((p) => {
                // Rotate around Y
                const x1 = p.x * cosY + p.z * sinY;
                const z1 = -p.x * sinY + p.z * cosY;

                // Rotate around X
                const y2 = p.y * cosX - z1 * sinX;
                const z2 = p.y * sinX + z1 * cosX;

                // Perspective projection
                const scale = (z2 + radius * 2) / (radius * 3);
                return {
                    x: centerX + x1,
                    y: centerY + y2,
                    z: z2,
                    scale: Math.max(0.2, scale)
                };
            });

            // Sort by depth for rendering
            projectedPoints.sort((a, b) => a.z - b.z);

            // Draw connective ring lines
            ctx.lineWidth = 0.7;
            for (let i = 0; i < projectedPoints.length; i++) {
                const p1 = projectedPoints[i];
                for (let j = i + 1; j < projectedPoints.length; j++) {
                    const p2 = projectedPoints[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < radius * 0.45) {
                        const alpha = (1 - dist / (radius * 0.45)) * 0.15 * p1.scale;
                        ctx.strokeStyle = isDark ? `rgba(239, 68, 68, ${alpha})` : `rgba(225, 29, 72, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw glowing points (High speed direct fill without blur)
            for (const p of projectedPoints) {
                const alpha = Math.max(0.1, (p.z + radius) / (radius * 2));
                const pointSize = Math.max(1, p.scale * 2.8);

                // Soft glow ring
                ctx.beginPath();
                ctx.arc(p.x, p.y, pointSize * 1.8, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(239, 68, 68, ${alpha * 0.3})`
                    : `rgba(225, 29, 72, ${alpha * 0.25})`;
                ctx.fill();

                // Center sharp node
                ctx.beginPath();
                ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(244, 63, 94, ${alpha * 0.95})`
                    : `rgba(225, 29, 72, ${alpha * 0.95})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [size, isDark]);

    return (
        <div className="relative cursor-grab active:cursor-grabbing inline-block select-none group touch-none">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse-glow" />
            <canvas
                ref={canvasRef}
                style={{ width: size, height: size }}
                className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="text-center text-[10px] font-mono tracking-widest text-primary/70 uppercase pointer-events-none mt-[-10px]">
                Interactive 3D Core
            </div>
        </div>
    );
}
