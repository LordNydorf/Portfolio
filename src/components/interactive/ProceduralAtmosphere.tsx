// src/components/interactive/ProceduralAtmosphere.tsx
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers";

export interface AtmosphereMode {
    id: string;
    name: string;
    description: string;
    paletteDark: string[];
    paletteLight: string[];
    gridColorDark: string;
    gridColorLight: string;
}

export const ATMOSPHERE_MODES: AtmosphereMode[] = [
    {
        id: "cyber-crimson",
        name: "Cyber Crimson",
        description: "Liquid ruby magma & deep obsidian space",
        paletteDark: ["#ef4444", "#dc2626", "#991b1b", "#450a0a", "#0f0f13"],
        paletteLight: ["#f43f5e", "#fb7185", "#fecdd3", "#fff1f2", "#ffffff"],
        gridColorDark: "rgba(239, 68, 68, 0.08)",
        gridColorLight: "rgba(244, 63, 94, 0.08)"
    },
    {
        id: "hyper-violet",
        name: "Cosmic Indigo",
        description: "Deep violet nebula & electromagnetic rays",
        paletteDark: ["#6366f1", "#4f46e5", "#3730a3", "#1e1b4b", "#0a0a0f"],
        paletteLight: ["#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff", "#ffffff"],
        gridColorDark: "rgba(99, 102, 241, 0.08)",
        gridColorLight: "rgba(99, 102, 241, 0.08)"
    },
    {
        id: "vector-matrix",
        name: "Architectural Grid",
        description: "Minimalist laser vector mesh & spotlight",
        paletteDark: ["#3b82f6", "#2563eb", "#1d4ed8", "#172554", "#0a0c10"],
        paletteLight: ["#60a5fa", "#93c5fd", "#bfdbfe", "#eff6ff", "#ffffff"],
        gridColorDark: "rgba(59, 130, 246, 0.12)",
        gridColorLight: "rgba(59, 130, 246, 0.08)"
    },
    {
        id: "quantum-aurora",
        name: "Quantum Aurora",
        description: "Emerald caustics & cyan energy streams",
        paletteDark: ["#10b981", "#059669", "#047857", "#064e3b", "#090d0c"],
        paletteLight: ["#34d399", "#6ee7b7", "#a7f3d0", "#ecfdf5", "#ffffff"],
        gridColorDark: "rgba(16, 185, 129, 0.09)",
        gridColorLight: "rgba(16, 185, 129, 0.08)"
    }
];

interface ProceduralAtmosphereProps {
    currentModeId: string;
}

export function ProceduralAtmosphere({ currentModeId }: ProceduralAtmosphereProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const activeMode = ATMOSPHERE_MODES.find((m) => m.id === currentModeId) || ATMOSPHERE_MODES[0];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        let mouseX = width / 2;
        let mouseY = height / 2;
        let targetMouseX = width / 2;
        let targetMouseY = height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        };

        const handleResize = () => {
            if (!canvas) return;
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        // Simplex-inspired dynamic wave orbs
        const orbs = [
            { x: width * 0.25, y: height * 0.25, vx: 0.6, vy: 0.4, r: Math.min(width, height) * 0.45, speed: 0.001 },
            { x: width * 0.75, y: height * 0.75, vx: -0.5, vy: -0.6, r: Math.min(width, height) * 0.5, speed: 0.0012 },
            { x: width * 0.5, y: height * 0.5, vx: 0.4, vy: -0.5, r: Math.min(width, height) * 0.4, speed: 0.0015 },
            { x: width * 0.8, y: height * 0.2, vx: -0.6, vy: 0.3, r: Math.min(width, height) * 0.35, speed: 0.0018 }
        ];

        let time = 0;

        const render = () => {
            time += 0.004;

            // Smooth spring mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // 1. Solid Base Fill
            const baseBg = isDark ? "#09090c" : "#fafafa";
            ctx.fillStyle = baseBg;
            ctx.fillRect(0, 0, width, height);

            const palette = isDark ? activeMode.paletteDark : activeMode.paletteLight;

            // 2. Liquid Aurora Gradient Orbs
            for (let i = 0; i < orbs.length; i++) {
                const orb = orbs[i];
                const sinTime = Math.sin(time + i * 1.5);
                const cosTime = Math.cos(time * 0.8 + i * 1.2);

                const currentX = orb.x + sinTime * 100 + (mouseX - width / 2) * (0.05 + i * 0.02);
                const currentY = orb.y + cosTime * 80 + (mouseY - height / 2) * (0.05 + i * 0.02);
                const currentRadius = orb.r * (0.9 + Math.sin(time * 2 + i) * 0.1);

                const color = palette[i % palette.length];
                const grad = ctx.createRadialGradient(
                    currentX,
                    currentY,
                    0,
                    currentX,
                    currentY,
                    currentRadius
                );

                const alpha1 = isDark ? 0.25 : 0.22;
                const alpha2 = isDark ? 0.08 : 0.06;

                grad.addColorStop(0, hexToRgba(color, alpha1));
                grad.addColorStop(0.5, hexToRgba(color, alpha2));
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            }

            // 3. Interactive Mouse Spotlight
            const mouseSpotlight = ctx.createRadialGradient(
                mouseX,
                mouseY,
                0,
                mouseX,
                mouseY,
                Math.min(width, height) * 0.45
            );
            mouseSpotlight.addColorStop(0, hexToRgba(palette[0], isDark ? 0.18 : 0.15));
            mouseSpotlight.addColorStop(0.5, hexToRgba(palette[1], isDark ? 0.05 : 0.03));
            mouseSpotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = mouseSpotlight;
            ctx.fillRect(0, 0, width, height);

            // 4. Razor-Sharp Vector Matrix Grid (Procedural SVG Math)
            const gridSize = 48;
            const gridColor = isDark ? activeMode.gridColorDark : activeMode.gridColorLight;
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;

            ctx.beginPath();
            // Vertical lines
            for (let x = 0; x < width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            // Horizontal lines
            for (let y = 0; y < height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            // 5. Specular Intersection Flares near cursor
            const maxFlareDist = 180;
            const startX = Math.floor((mouseX - maxFlareDist) / gridSize) * gridSize;
            const endX = Math.ceil((mouseX + maxFlareDist) / gridSize) * gridSize;
            const startY = Math.floor((mouseY - maxFlareDist) / gridSize) * gridSize;
            const endY = Math.ceil((mouseY + maxFlareDist) / gridSize) * gridSize;

            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxFlareDist) {
                        const intensity = 1 - dist / maxFlareDist;
                        const flareRadius = 2 + intensity * 3;

                        ctx.beginPath();
                        ctx.arc(x, y, flareRadius, 0, Math.PI * 2);
                        ctx.fillStyle = isDark
                            ? `rgba(255, 255, 255, ${intensity * 0.7})`
                            : `rgba(239, 68, 68, ${intensity * 0.6})`;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = palette[0];
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [activeMode, isDark]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                style={{ width: "100%", height: "100%" }}
            />
            {/* Subtle Vignette Mask */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:block hidden pointer-events-none" />
        </div>
    );
}

function hexToRgba(hex: string, alpha: number): string {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length === 6) {
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgba(239, 68, 68, ${alpha})`;
}
