// src/App.tsx
import { useState, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const App = () => {
    const [currentPage, setCurrentPage] = useState<string>("about");

    useEffect(() => {
        const getRoute = () => (location.hash.replace("#", "") || "about").toLowerCase();
        const handleHashChange = () => {
            setCurrentPage(getRoute());
            window.scrollTo({ top: 0, behavior: "auto" });
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const handleNavigate = (page: string) => {
        if (!document.startViewTransition) {
            location.hash = page;
            return;
        }
        document.startViewTransition(() => {
            location.hash = page;
        });
    };

    const renderPage = () => {
        switch (currentPage) {
            case "portfolio": return <Portfolio />;
            case "experience": return <Experience />;
            case "contact": return <Contact />;
            default: return <About />;
        }
    };

    return (
        <TooltipProvider>
            <Sonner />
            <Layout currentPage={currentPage} onNavigate={handleNavigate}>
                {renderPage()}
            </Layout>
        </TooltipProvider>
    );
};

export default App;