// src/hooks/use-scroll-spy.ts
import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset = 150): string {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "about");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const element = document.getElementById(id);
                if (element) {
                    const top = element.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveSection(id);
                        return;
                    }
                }
            }

            setActiveSection(sectionIds[0] || "about");
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
}
