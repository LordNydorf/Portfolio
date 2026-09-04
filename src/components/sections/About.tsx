import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Code,
    Heart,
    Cpu,
    ArrowDown,
    Send,
    ShieldCheck,
    Terminal,
    Smartphone,
    Brain,
    Database,
    Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import { languageHsl } from "@/lib/colours";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTypewriter } from "@/hooks/use-typewriter";
import { TiltedFigure, HologramSphere, LanyardBadge, GitHubContributions } from "@/components/interactive";
import { SpotlightCard, ShinyText, VariableProximity, DecryptedText, Marquee, Magnet } from "@/components/effects";
import { getAssetUrl } from "@/lib/utils";
import { resume } from "@/data/resume";

const SKILL_CATEGORIES = [
    {
        id: "languages",
        label: "Languages",
        shortLabel: "Languages",
        icon: Terminal,
        skills: ["Dart", "Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS", "Bash"]
    },
    {
        id: "frameworks",
        label: "Mobile & Web",
        shortLabel: "Mobile & Web",
        icon: Smartphone,
        skills: ["Flutter", "React", "Astro", "Node.js", "FastAPI", "Flask"]
    },
    {
        id: "ai-data",
        label: "AI / ML & Data",
        shortLabel: "AI & ML",
        icon: Brain,
        skills: ["Gemini API", "LLaMA 3", "TensorFlow", "scikit-learn", "YOLOv8", "SFTTrainer", "Streamlit", "pandas", "NumPy", "Matplotlib"]
    },
    {
        id: "cloud-db",
        label: "Cloud & Databases",
        shortLabel: "Cloud & DB",
        icon: Database,
        skills: ["Firebase", "Google Cloud", "Hive"]
    },
    {
        id: "tools",
        label: "Tools & IDEs",
        shortLabel: "Tools",
        icon: Wrench,
        skills: ["Git", "VS Code", "Cursor", "Windsurf", "Antigravity", "Linear", "PyCharm", "IntelliJ", "Eclipse", "Slack"]
    }
];

export function About() {
    const isMobile = useIsMobile();
    const typeText = useTypewriter(resume.typewriterWords, 100, 2000);
    const src = getAssetUrl(isMobile ? "/portrait_rohit_bgless_mobile.webp" : "/portrait_rohit_bgless.webp");
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const displayedCategories = useMemo(() => {
        if (activeCategory === "all") return SKILL_CATEGORIES;
        return SKILL_CATEGORIES.filter(cat => cat.id === activeCategory);
    }, [activeCategory]);

    return (
        <section id="about" className="pt-28 md:pt-36 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
            {/* Awwwards-style Kinetic Status Marquee */}
            <div className="mb-10 py-3 px-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 overflow-hidden animate-fade-up shadow-sm">
                <Marquee speed={28} className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                    <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-foreground font-semibold">STATUS:</span> AVAILABLE FOR HIGH-IMPACT OPPORTUNITIES
                    </span>
                    <span className="text-primary font-bold">•</span>
                    <span>LOCATION: KERALA, INDIA</span>
                    <span className="text-primary font-bold">•</span>
                    <span>FOCUS: FULL-STACK • MOBILE • AI & SYSTEMS</span>
                    <span className="text-primary font-bold">•</span>
                    <span>60 FPS INTERACTIVE ARCHITECTURE</span>
                    <span className="text-primary font-bold">•</span>
                </Marquee>
            </div>

            {/* Grand Hero Monolith */}
            <div className="flex flex-col md:grid md:grid-cols-[1.3fr,1fr] gap-10 md:gap-12 items-center md:items-start mb-16 md:mb-20 animate-fade-up">
                <div className="space-y-6 order-2 md:order-1 pt-2 w-full">
                    <div>
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 text-foreground flex flex-wrap items-center gap-2 sm:gap-3">
                            <VariableProximity label={resume.name} radius={110} />
                            <ShinyText text="✦" className="text-primary text-2xl sm:text-4xl hidden sm:inline-block" />
                        </h1>
                        <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_16px_rgba(239,68,68,0.6)]" />
                    </div>

                    <div className="space-y-3.5 sm:space-y-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                        <p>I'm <span className="text-foreground font-semibold tracking-tight">{resume.name}</span>, a {resume.role} based in {resume.location}.</p>
                        <p>
                            {resume.bio[0]}{" "}
                            <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="text-primary font-mono font-bold inline-block whitespace-nowrap min-w-[14ch] drop-shadow-sm"
                            >
                                {typeText}
                            </span>
                        </p>
                        {resume.bio.slice(1).map((text, i) => <p key={i} className="text-sm sm:text-base text-muted-foreground/90">{text}</p>)}
                    </div>

                    {/* Quick Hero CTA Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                        <Magnet padding={20} magnetStrength={2.5} wrapperClassName="w-full sm:w-auto">
                            <Button
                                size="lg"
                                onClick={() => scrollTo("portfolio")}
                                className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl shadow-[0_10px_30px_-5px_hsl(var(--primary)/0.4)] px-6 h-12"
                            >
                                <span>Explore Works</span>
                                <ArrowDown className="w-4 h-4 animate-bounce" />
                            </Button>
                        </Magnet>

                        <Magnet padding={20} magnetStrength={2.5} wrapperClassName="w-full sm:w-auto">
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollTo("contact")}
                                className="w-full sm:w-auto gap-2 border-black/10 dark:border-white/15 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 font-semibold px-6 h-12"
                            >
                                <span>Get In Touch</span>
                                <Send className="w-4 h-4" />
                            </Button>
                        </Magnet>
                    </div>
                </div>

                <div className="order-1 md:order-2 md:justify-self-end relative animate-fade-up delay-200 flex flex-col items-center">
                    <div className="absolute inset-0 bg-primary/25 blur-[100px] rounded-full -z-10 animate-pulse-glow" />
                    <TiltedFigure src={src} alt={resume.name} />
                </div>
            </div>

            {/* Interactive 3D Spatial Physics Lab (Gyroscope & Swinging Lanyard Badge) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 animate-fade-up">
                {/* 3D Particle Gyroscope */}
                <SpotlightCard
                    spotlightColor="rgba(239, 68, 68, 0.2)"
                    data-cursor="drag"
                    data-cursor-text="DRAG ✦"
                    className="p-5 sm:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-xl cursor-grab active:cursor-grabbing"
                >
                    <div className="space-y-2 pointer-events-none mb-4 sm:mb-6">
                        <div className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
                            <Cpu className="w-4 h-4" />
                            <span>Spatial Inertia Core</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                            <DecryptedText text="Quantum Particle Gyroscope" speed={30} />
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            Drag and throw the 3D particle node sphere to experience spatial physics.
                        </p>
                    </div>

                    <div className="flex items-center justify-center py-2 sm:py-4" data-cursor="drag" data-cursor-text="DRAG ✦">
                        <HologramSphere size={isMobile ? 180 : 200} />
                    </div>
                </SpotlightCard>

                {/* 3D Physics Hanging Developer ID Badge */}
                <SpotlightCard
                    spotlightColor="rgba(239, 68, 68, 0.2)"
                    className="p-5 sm:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 flex flex-col justify-between shadow-xl overflow-hidden"
                >
                    <div className="space-y-2 pointer-events-none mb-2">
                        <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verified Credentials</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                            <DecryptedText text="Developer ID Lanyard" speed={30} />
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            Grab and fling the 3D badge to trigger momentum swinging physics.
                        </p>
                    </div>

                    <div className="flex items-center justify-center -my-2">
                        <LanyardBadge />
                    </div>
                </SpotlightCard>
            </div>

            {/* Technical Arsenal & Attributes Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Technical Arsenal */}
                <SpotlightCard
                    spotlightColor={hoveredSkill && languageHsl[hoveredSkill] ? `hsla(${languageHsl[hoveredSkill]}, 0.25)` : "rgba(239, 68, 68, 0.15)"}
                    className="p-5 sm:p-7 md:p-8 rounded-[2rem] animate-fade-up delay-300 flex flex-col justify-between"
                >
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]">
                                    <Code className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                                        <DecryptedText text="Technical Arsenal" speed={30} />
                                    </h2>
                                    <p className="text-xs text-muted-foreground">Categorized stack & developer tools</p>
                                </div>
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 mb-4">
                            <button
                                onClick={() => setActiveCategory("all")}
                                aria-pressed={activeCategory === "all"}
                                className={cn(
                                    "px-2.5 py-1 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap",
                                    activeCategory === "all"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "bg-black/[0.03] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                                )}
                            >
                                All ({resume.skills.length})
                            </button>
                            {SKILL_CATEGORIES.map((cat) => {
                                const isSelected = activeCategory === cat.id;
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        aria-pressed={isSelected}
                                        className={cn(
                                            "px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5",
                                            isSelected
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "bg-black/[0.03] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                                        )}
                                    >
                                        <Icon className="w-3 h-3" />
                                        <span>{cat.shortLabel}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Categorized Skills Groups */}
                        <div className="space-y-3">
                            {displayedCategories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <div
                                        key={cat.id}
                                        className="p-3 rounded-2xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2"
                                    >
                                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                                            <div className="flex items-center gap-1.5 font-semibold text-foreground">
                                                <Icon className="w-3.5 h-3.5 text-primary" />
                                                <span>{cat.label}</span>
                                            </div>
                                            <span className="text-[10px] opacity-60 font-mono">{cat.skills.length} tools</span>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map((skill) => {
                                                const hsl = languageHsl[skill] ?? "0 0% 60%";
                                                const isHovered = hoveredSkill === skill;

                                                return (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        onMouseEnter={() => setHoveredSkill(skill)}
                                                        onMouseLeave={() => setHoveredSkill(null)}
                                                        className="px-2.5 py-1 text-xs font-medium border transition-all duration-150 cursor-default select-none rounded-lg"
                                                        style={{
                                                            color: `hsl(${hsl})`,
                                                            borderColor: isHovered ? `hsl(${hsl} / 0.7)` : "rgba(150, 150, 150, 0.15)",
                                                            backgroundColor: isHovered ? `hsl(${hsl} / 0.16)` : "rgba(120, 120, 120, 0.04)",
                                                            boxShadow: isHovered ? `0 0 14px -2px hsl(${hsl} / 0.4)` : "none",
                                                            transform: isHovered ? "scale(1.04) translateY(-1px)" : "none"
                                                        }}
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 transition-opacity"
                                                            style={{ backgroundColor: `hsl(${hsl})`, opacity: isHovered ? 1 : 0.65 }}
                                                        />
                                                        {skill}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </SpotlightCard>

                {/* Personal Side */}
                <SpotlightCard
                    spotlightColor="rgba(244, 63, 94, 0.15)"
                    className="p-5 sm:p-8 md:p-10 rounded-[2rem] animate-fade-up delay-400"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-secondary/15 rounded-xl text-secondary border border-secondary/30 shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.3)]">
                            <Heart className="h-6 w-6 fill-secondary/20" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-foreground">My Personal Side :)</h2>
                            <p className="text-xs text-muted-foreground">What drives me outside of code</p>
                        </div>
                    </div>
                    <div className="grid gap-3.5">
                        {resume.attributes.map((attr) => {
                            const Icon = attr.icon;
                            return (
                                <div
                                    key={attr.label}
                                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-primary/20 dark:hover:border-primary/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 group hover:translate-x-1"
                                >
                                    <div className={`mt-0.5 p-2 rounded-lg bg-black/[0.04] dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors ${attr.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{attr.label}</div>
                                        <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{attr.description}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SpotlightCard>
            </div>

            {/* Live GitHub Commit Activity Heatmap */}
            <GitHubContributions />
        </section>
    );
}
