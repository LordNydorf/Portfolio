// src/components/providers/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "dark" | "light";
}

const initialState: ThemeProviderState = {
    theme: "dark",
    setTheme: () => null,
    resolvedTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "dark",
    storageKey = "portfolio-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(storageKey) as Theme | null;
        return storedTheme || defaultTheme;
    });

    const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
        if (theme === "system") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return theme;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        let currentResolved: "dark" | "light" = "dark";
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            currentResolved = systemTheme;
        } else {
            currentResolved = theme;
        }

        root.classList.add(currentResolved);
        setResolvedTheme(currentResolved);

        // Update meta theme-color tag if present
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", currentResolved === "dark" ? "#070709" : "#F8F9FA");
        }
    }, [theme]);

    // Listen to system changes if theme is system
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const root = window.document.documentElement;
            const newResolved = mediaQuery.matches ? "dark" : "light";
            root.classList.remove("light", "dark");
            root.classList.add(newResolved);
            setResolvedTheme(newResolved);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
        resolvedTheme,
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
