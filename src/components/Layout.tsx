// src/components/Layout.tsx
import { useState, ReactNode } from 'react';
import { Menu, Mail, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Navigation } from "./Navigation";
import { SocialLinks } from "./SocialLinks";
import { CommandMenu } from "./CommandMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { resume } from "@/data/resume";

interface LayoutProps {
    children: ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    const handleNavigate = (page: string) => {
        if (isMobile) {
            setSidebarOpen(false);
            setTimeout(() => onNavigate(page), 260);
        } else {
            onNavigate(page);
        }
    };

    return (
        <div className="min-h-screen flex md:items-center md:justify-center md:p-6 relative">
            <CommandMenu onNavigate={onNavigate} />

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0a0a0c]/95 border-b border-white/10">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 border border-white/10 hover:bg-white/10">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] bg-[#0a0a0c] border-r border-white/10 p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center pb-8">
                                <div className="font-bold text-xl">Menu</div>
                                <SheetClose className="rounded-md h-8 w-8 flex items-center justify-center border border-white/10">
                                    <X className="h-4 w-4" />
                                </SheetClose>
                            </div>
                            <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
                            <div className="flex-1" />
                            <SocialLinks />
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="text-lg font-bold">{resume.name}</div>
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-white/10" onClick={() => handleNavigate("contact")}>
                    <Mail className="h-5 w-5" />
                </Button>
            </header>

            {/* Desktop Layout */}
            <div className="w-full max-w-[90rem] h-full md:h-[90vh] md:max-h-[54rem] glass-container rounded-none md:rounded-[2rem] grid md:grid-cols-[320px,1fr] mt-16 md:mt-0 overflow-hidden">
                <aside className="hidden md:flex flex-col h-full p-8 border-r border-white/5 bg-black/20 relative">
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-4 pb-8 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
                            {/* Note: Ensure portrait_tiny.webp exists in /public or remove this img */}
                            <img src="/portrait_tiny.webp" alt={resume.name} className="w-14 h-14 rounded-full border border-white/20 object-cover relative z-10" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">{resume.name}</div>
                            <div className="text-xs font-medium text-primary/80 uppercase tracking-wider">{resume.role}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'metaKey': true}))}
                        className="flex items-center gap-2 w-full px-3 py-2 mb-6 text-xs font-medium text-muted-foreground border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <Search className="w-3.5 h-3.5" />
                        <span className="flex-1 text-left">Quick Search...</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px]">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    <Navigation currentPage={currentPage} onNavigate={onNavigate} />
                    <div className="flex-1" />
                    <SocialLinks />
                </aside>

                <main className="h-[calc(100vh-64px)] md:h-full overflow-y-auto scroll-smooth relative hide-scrollbar bg-black/20">
                    <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
                    <div className="p-6 md:p-12 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}