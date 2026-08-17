// src/App.tsx
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers";
import { Layout } from "@/components/layout";
import { CustomCursor, NoiseOverlay } from "@/components/effects";
import { About, Portfolio, Experience, Contact } from "@/components/sections";

const App = () => {
    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
        }
    }, []);

    const handleNavigate = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            history.pushState(null, "", `#${sectionId}`);
        }
    };

    return (
        <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
                <CustomCursor />
                <NoiseOverlay />
                <Sonner />
                <Layout currentPage="about" onNavigate={handleNavigate}>
                    <About />
                    <Portfolio />
                    <Experience />
                    <Contact />
                </Layout>
            </TooltipProvider>
        </ThemeProvider>
    );
};

export default App;