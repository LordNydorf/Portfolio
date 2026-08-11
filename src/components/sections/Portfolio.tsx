// src/components/sections/Portfolio.tsx
import { useState, useEffect, useMemo } from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { languageHsl } from "@/lib/colours";
import { ArrowUpRight, Github, Globe, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { resume } from "@/data/resume";
import type { Project } from "@/types";

function ProjectTextContent({ project }: { project: Project }) {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-3">Description</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-3">Key Contributions</h4>
                <ul className="space-y-2">
                    {project.responsibilities.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    {project.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" style={{ backgroundColor: `hsl(${languageHsl[lang] || '0 0% 20%'} / 0.2)`, color: `hsl(${languageHsl[lang] || '0 0% 80%'})` }} className="border border-white/5 hover:bg-white/10">
                            {lang}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="flex gap-3 pt-4 mt-4 border-t border-white/10">
                {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex-1">
                        <Button className="w-full gap-2" variant="outline"><Github className="w-4 h-4" /> Code</Button>
                    </a>
                )}
                {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex-1">
                        <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"><Globe className="w-4 h-4" /> Live Demo</Button>
                    </a>
                )}
            </div>
        </div>
    );
}

export function Portfolio() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const isMobile = useIsMobile();
    const projects = resume.projects;
    const selectedProject = projects.find(p => p.title === selectedId);

    // Detect Firefox to disable layoutId animations because Gecko struggles with them
    const isFirefox = useMemo(() => {
        if (typeof window === "undefined") return false;
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }, []);

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
            window.history.pushState({ modal: "open" }, "");
        } else {
            document.body.style.overflow = 'unset';
        }
        const handlePopState = () => setSelectedId(null);
        window.addEventListener("popstate", handlePopState);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener("popstate", handlePopState);
        };
    }, [selectedId]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="pb-8 relative">
            <header className="flex flex-col gap-2 mb-8 border-b border-white/10 pb-6 animate-fade-up">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Portfolio</h2>
                <p className="text-muted-foreground text-lg">A collection of {projects.length} projects exploring web, systems, and design.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                    <article key={project.title} className="glass-card rounded-[1.25rem] group flex flex-col animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/20 cursor-pointer" onClick={() => setSelectedId(project.title)}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                            {!isMobile ? (
                                <motion.img
                                    layoutId={isFirefox ? undefined : `img-${project.title}`}
                                    src={project.images[0]}
                                    alt={project.title}
                                    className={cn("w-full h-full object-cover", selectedId === project.title ? "opacity-0" : "opacity-100")}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                />
                            ) : (
                                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                            )}
                            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap gap-2 pointer-events-none">
                                {project.techStack.slice(0, 3).map((tech) => (
                                    <div key={tech} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white/90 shadow-sm">{tech}</div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                                <Badge variant="outline" className="border-white/10 text-xs font-normal text-muted-foreground bg-white/5">{project.client}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-5 leading-relaxed">{project.description}</p>
                            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                                <Button variant="secondary" size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white border-0" onClick={() => setSelectedId(project.title)}>Read More</Button>
                                <div className="flex gap-1">
                                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-white transition-colors"><Github className="w-5 h-5" /></a>}
                                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-white transition-colors"><ArrowUpRight className="w-5 h-5" /></a>}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedProject && !isMobile && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedId(null)} />
                        <motion.div className="relative w-full max-w-5xl bg-[#0a0a0c]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1.2fr,1fr] max-h-[85vh] pointer-events-auto" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                            <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
                            <div className="bg-black/40 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 h-[300px] md:h-auto relative overflow-hidden">
                                <Carousel className="w-full max-w-md relative z-10">
                                    <CarouselContent>
                                        {selectedProject.images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                                                    {index === 0 ? (
                                                        <motion.img
                                                            layoutId={isFirefox ? undefined : `img-${selectedProject.title}`}
                                                            src={image}
                                                            className="w-full h-auto object-cover"
                                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                                        />
                                                    ) : (
                                                        <img src={image} className="w-full h-auto object-cover" alt="" />
                                                    )}
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {selectedProject.images.length > 1 && <CarouselDots className="mt-4" />}
                                </Carousel>
                            </div>
                            <div className="p-8 overflow-y-auto hide-scrollbar bg-background/20">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <div className="mb-6">
                                        <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                                        <p className="flex items-center gap-2 text-primary font-medium">{selectedProject.scope} &middot; {selectedProject.timeline}</p>
                                    </div>
                                    <ProjectTextContent project={selectedProject} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {isMobile && (
                <Drawer open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DrawerContent className="bg-[#0a0a0c] border-t border-white/10 h-[90vh] outline-none">
                        {selectedProject && (
                            <div className="grid grid-cols-1 h-full max-h-[85vh] overflow-y-auto">
                                <div className="sr-only">
                                    <DrawerTitle>{selectedProject.title}</DrawerTitle>
                                    <DrawerDescription>{selectedProject.description}</DrawerDescription>
                                </div>
                                <div className="bg-black/40 p-6 flex items-center justify-center border-b border-white/10 shrink-0">
                                    <Carousel className="w-full max-w-md">
                                        <CarouselContent>
                                            {selectedProject.images.map((image, index) => (
                                                <CarouselItem key={index}><div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl"><img src={image} alt={`${selectedProject.title} ${index + 1}`} className="w-full h-auto" /></div></CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        {selectedProject.images.length > 1 && <CarouselDots className="mt-4" />}
                                    </Carousel>
                                </div>
                                <div className="p-6 overflow-y-auto hide-scrollbar bg-background/40">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold mb-1">{selectedProject.title}</h2>
                                        <p className="text-primary font-medium text-sm">{selectedProject.scope} &middot; {selectedProject.timeline}</p>
                                    </div>
                                    <ProjectTextContent project={selectedProject} />
                                </div>
                            </div>
                        )}
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    );
}