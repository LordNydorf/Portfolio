// src/components/sections/About.tsx
import { Badge } from "@/components/ui/badge";
import { Code, Heart } from "lucide-react";
import { languageHsl } from "@/lib/colours";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTypewriter } from "@/hooks/use-typewriter";
import { TiltedFigure } from "@/components/TiltedFigure"; // Moved folder
import { resume } from "@/data/resume";

export function About() {
    const isMobile = useIsMobile();
    const typeText = useTypewriter(resume.typewriterWords, 100, 2000);
    const src = isMobile ? "/portrait_rohit_bgless_mobile.webp" : "/portrait_rohit_bgless.webp";

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <div className="flex flex-col md:grid md:grid-cols-[1.4fr,1fr] gap-10 items-center md:items-start mb-16 animate-fade-up">
                <div className="space-y-6 order-2 md:order-1 pt-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.4)]">
                            About me
                        </h1>
                        <div className="h-1 w-20 bg-primary rounded-full" />
                    </div>

                    <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                        <p>I'm <span className="text-white font-medium">{resume.name}</span>, a {resume.role} based in {resume.location}.</p>
                        <p>
                            {resume.bio[0]}{" "}
                            <span className="text-primary/90 font-mono font-bold inline-block whitespace-nowrap min-w-[15ch]">
                                {typeText}
                            </span>
                        </p>
                        {resume.bio.slice(1).map((text, i) => <p key={i}>{text}</p>)}
                    </div>
                </div>

                <div className="order-1 md:order-2 md:justify-self-end relative animate-fade-up delay-200">
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full -z-10" />
                    <TiltedFigure src={src} alt={resume.name} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <article className="glass-card rounded-[1.5rem] p-8 animate-fade-up delay-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20"><Code className="h-6 w-6" /></div>
                        <h2 className="text-xl font-bold tracking-tight">Technical Arsenal</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors" style={{ color: `hsl(${languageHsl[skill] ?? "0 0% 90%"})` }}>
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </article>

                <article className="glass-card rounded-[1.5rem] p-8 animate-fade-up delay-400">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-secondary/15 rounded-xl text-secondary border border-secondary/30 shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.3)]">
                            <Heart className="h-6 w-6 fill-secondary/20" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">My Personal Side :)</h2>
                    </div>
                    <div className="grid gap-4">
                        {resume.attributes.map((attr) => {
                            const Icon = attr.icon;
                            return (
                                <div key={attr.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className={`mt-0.5 p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${attr.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{attr.label}</div>
                                        <div className="text-sm text-muted-foreground leading-snug">{attr.description}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </article>
            </div>
        </div>
    );
}