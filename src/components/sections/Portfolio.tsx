// src/components/sections/Portfolio.tsx
import { useState, useEffect, useMemo } from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard3D } from "@/components/interactive";
import { Magnet, DecryptedText, BorderBeam } from "@/components/effects";
import { languageHsl } from "@/lib/colours";
import { ArrowUpRight, Github, Globe, X, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getAssetUrl } from "@/lib/utils";
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
                            <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {item}
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
                        <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"><Globe className="w-4 h-4" />  Check it out </Button>
                    </a>
                )}
            </div>
        </div>
    );
}

const CATEGORIES = ["All", "Web & Full-Stack", "Mobile Apps", "AI & Systems"] as const;
type Category = typeof CATEGORIES[number];

export function Portfolio() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const isMobile = useIsMobile();
    const projects = resume.projects;

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return projects;
        if (activeCategory === "Mobile Apps") {
            return projects.filter(p => p.techStack.some(t => ["Flutter", "Dart", "Android", "iOS"].includes(t)) || p.languages.some(l => ["Dart", "Flutter"].includes(l)));
        }
        if (activeCategory === "AI & Systems") {
            return projects.filter(p => p.techStack.some(t => ["Python", "FastAPI", "TensorFlow", "Gemini", "LLaMA", "AI", "ML"].includes(t)) || p.languages.some(l => ["Python", "FastAPI"].includes(l)));
        }
        if (activeCategory === "Web & Full-Stack") {
            return projects.filter(p => p.techStack.some(t => ["React", "TypeScript", "Node.js", "Web", "Next.js", "Tailwind"].includes(t)) || p.languages.some(l => ["React", "TypeScript", "JavaScript", "HTML/CSS"].includes(l)));
        }
        return projects;
    }, [projects, activeCategory]);

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

    const handleSelectCategory = (cat: Category) => {
        setActiveCategory(cat);
    };

    const handleCardClick = (title: string) => {
        setSelectedId(title);
    };

    return (
        <section id="portfolio" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
            <header className="flex flex-col gap-4 mb-10 border-b border-black/10 dark:border-white/10 pb-6 animate-fade-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            <DecryptedText text="Featured Works" speed={35} />
                        </h2>
                    </div>

                    {/* Interactive Filter Bar */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 relative overflow-x-auto hide-scrollbar self-start md:self-auto">
                        <Filter className="w-3.5 h-3.5 ml-2 mr-1 text-muted-foreground shrink-0 hidden sm:inline-block" />
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleSelectCategory(cat)}
                                    className={cn(
                                        "relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap z-10",
                                        isActive ? "text-primary dark:text-white font-semibold" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="projectFilterPill"
                                            className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-black/5 dark:border-white/10 -z-10"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        />
                                    )}
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <p className="text-muted-foreground text-base">Showing {filteredProjects.length} of {projects.length} featured engineering projects.</p>
            </header>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ProjectCard3D
                                onMouseEnter={() => setHoveredCard(project.title)}
                                onMouseLeave={() => setHoveredCard(null)}
                                data-cursor="view"
                                data-cursor-text="VIEW ↗"
                                className="group flex flex-col h-full relative"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                {hoveredCard === project.title && (
                                    <BorderBeam size={180} duration={6} borderWidth={1.5} colorFrom="hsl(var(--primary))" colorTo="#ffffff" />
                                )}

                                <div className="relative aspect-video overflow-hidden border-b border-black/5 dark:border-white/5 bg-black/[0.04] dark:bg-black/30 cursor-pointer flex items-center justify-center" data-cursor="view" data-cursor-text="VIEW ↗" onClick={() => handleCardClick(project.title)}>
                                    {/* Ambient blurred backdrop for seamless edge-to-edge glow */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <img
                                            src={getAssetUrl(project.images[0])}
                                            alt=""
                                            aria-hidden="true"
                                            className="w-full h-full object-cover blur-2xl scale-125 opacity-30 dark:opacity-40 select-none"
                                        />
                                        <div className="absolute inset-0 bg-black/5 dark:bg-black/40" />
                                    </div>

                                    {/* Clean, fully-contained foreground image that never gets cropped */}
                                    <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                                        {!isMobile ? (
                                            <motion.img
                                                layoutId={isFirefox ? undefined : `img-${project.title}`}
                                                src={getAssetUrl(project.images[0])}
                                                alt={project.title}
                                                className={cn(
                                                    "max-w-full max-h-full object-contain rounded-xl drop-shadow-md select-none",
                                                    selectedId === project.title ? "opacity-0" : "opacity-100"
                                                )}
                                                whileHover={{ scale: 1.04 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        ) : (
                                            <img
                                                src={getAssetUrl(project.images[0])}
                                                alt={project.title}
                                                className="max-w-full max-h-full object-contain rounded-xl drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-104 select-none"
                                            />
                                        )}
                                    </div>

                                    {/* Tech stack badges */}
                                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <div key={tech} className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-black/80 dark:bg-black/90 backdrop-blur-md border border-white/10 text-white/90 shadow-sm">{tech}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1 bg-card/20 dark:bg-[#0c0c0e]/30">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors text-foreground">
                                            <DecryptedText text={project.title} speed={25} animateOn="hover" />
                                        </h3>
                                        <Badge variant="outline" className="border-black/10 dark:border-white/10 text-xs font-medium text-muted-foreground bg-black/[0.03] dark:bg-white/5">{project.client}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">{project.description}</p>
                                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                                        <Button variant="secondary" size="sm" className="flex-1 bg-black/5 hover:bg-black/10 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white border-0 transition-all font-semibold rounded-xl" onClick={() => handleCardClick(project.title)}>Read More</Button>
                                        <div className="flex gap-1.5 items-center">
                                            {project.repoUrl && (
                                                <Magnet padding={20} magnetStrength={3}>
                                                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-black/5 dark:border-white/10 block" aria-label={`View code for ${project.title}`}>
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                </Magnet>
                                            )}
                                            {project.demoUrl && (
                                                <Magnet padding={20} magnetStrength={3}>
                                                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-black/5 dark:border-white/10 block" aria-label={`View live site for ${project.title}`}>
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </a>
                                                </Magnet>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ProjectCard3D>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedId && selectedProject && !isMobile && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedId(null)} />
                        <motion.div className="relative w-full max-w-5xl bg-background/95 dark:bg-[#0a0a0c]/95 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1.2fr,1fr] max-h-[85vh] pointer-events-auto" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                            <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 dark:bg-black/50 text-foreground dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
                            <div className="bg-black/[0.03] dark:bg-black/40 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 h-[300px] md:h-auto relative overflow-hidden">
                                <Carousel className="w-full max-w-md relative z-10">
                                    <CarouselContent>
                                        {selectedProject.images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="rounded-xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-black/10 dark:bg-black/60 aspect-video flex items-center justify-center p-4 relative">
                                                    <img src={getAssetUrl(image)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-25 dark:opacity-35 select-none pointer-events-none" />
                                                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none" />
                                                    {index === 0 ? (
                                                        <motion.img
                                                            layoutId={isFirefox ? undefined : `img-${selectedProject.title}`}
                                                            src={getAssetUrl(image)}
                                                            className="max-w-full max-h-full object-contain relative z-10 rounded-lg drop-shadow-xl select-none"
                                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                                        />
                                                    ) : (
                                                        <img src={getAssetUrl(image)} className="max-w-full max-h-full object-contain relative z-10 rounded-lg drop-shadow-xl select-none" alt="" />
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
                                        <h2 className="text-3xl font-bold mb-2 text-foreground">{selectedProject.title}</h2>
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
                    <DrawerContent className="bg-background dark:bg-[#0a0a0c] border-t border-black/10 dark:border-white/10 h-[90vh] outline-none">
                        {selectedProject && (
                            <div className="grid grid-cols-1 h-full max-h-[85vh] overflow-y-auto">
                                <div className="sr-only">
                                    <DrawerTitle>{selectedProject.title}</DrawerTitle>
                                    <DrawerDescription>{selectedProject.description}</DrawerDescription>
                                </div>
                                <div className="bg-black/[0.03] dark:bg-black/40 p-6 flex items-center justify-center border-b border-black/10 dark:border-white/10 shrink-0">
                                    <Carousel className="w-full max-w-md">
                                        <CarouselContent>
                                            {selectedProject.images.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-black/10 dark:bg-black/60 aspect-video flex items-center justify-center p-4 relative">
                                                        <img src={getAssetUrl(image)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-25 dark:opacity-35 select-none pointer-events-none" />
                                                        <img src={getAssetUrl(image)} alt={`${selectedProject.title} ${index + 1}`} className="max-w-full max-h-full object-contain relative z-10 rounded-lg drop-shadow-xl select-none" />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        {selectedProject.images.length > 1 && <CarouselDots className="mt-4" />}
                                    </Carousel>
                                </div>
                                <div className="p-6 overflow-y-auto hide-scrollbar bg-background/40">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold mb-1 text-foreground">{selectedProject.title}</h2>
                                        <p className="text-primary font-medium text-sm">{selectedProject.scope} &middot; {selectedProject.timeline}</p>
                                    </div>
                                    <ProjectTextContent project={selectedProject} />
                                </div>
                            </div>
                        )}
                    </DrawerContent>
                </Drawer>
            )}
        </section>
    );
}