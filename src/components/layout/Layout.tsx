// src/components/layout/Layout.tsx
import { useState, ReactNode } from "react";
import { FloatingNavbar } from "./FloatingNavbar";
import { Footer } from "./Footer";
import { CommandMenu } from "./CommandMenu";
import { PullCordTheme } from "./PullCordTheme";
import { ProceduralAtmosphere, InteractiveTerminal } from "@/components/interactive";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

interface LayoutProps {
    children: ReactNode;
    currentPage?: string;
    onNavigate: (sectionId: string) => void;
}

const SECTIONS = ["about", "portfolio", "experience", "contact"];

export function Layout({ children, onNavigate }: LayoutProps) {
    const [atmosphere, setAtmosphere] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("portfolio_atmosphere") || "cyber-crimson";
        }
        return "cyber-crimson";
    });

    const activeSection = useScrollSpy(SECTIONS, 200);

    const handleAtmosphereChange = (newAtm: string) => {
        setAtmosphere(newAtm);
        localStorage.setItem("portfolio_atmosphere", newAtm);
    };

    const handleNavigate = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            onNavigate(sectionId);
        }
    };

    return (
        <div className="min-h-screen w-full relative selection:bg-primary/30 selection:text-primary overflow-x-hidden">
            {/* 60 FPS GPU Procedural Atmosphere & Vector Matrix */}
            <ProceduralAtmosphere currentModeId={atmosphere} />

            {/* Global Quick Command Palette (⌘K) */}
            <CommandMenu onNavigate={handleNavigate} />

            {/* Hanging Ceiling Pull-Cord Light Switch (Hilarious Theme Toggle) */}
            <PullCordTheme />

            {/* Floating Dynamic Island Navigation */}
            <FloatingNavbar
                activeSection={activeSection}
                onNavigate={handleNavigate}
                atmosphere={atmosphere}
                onAtmosphereChange={handleAtmosphereChange}
            />

            {/* Interactive Developer CLI Terminal Sandbox */}
            <InteractiveTerminal
                onAtmosphereChange={handleAtmosphereChange}
                onNavigate={handleNavigate}
            />

            {/* Full-Bleed Continuous Canvas Main Body */}
            <main className="relative z-10 w-full">
                {children}
            </main>

            {/* Architectural Footer */}
            <Footer />
        </div>
    );
}
