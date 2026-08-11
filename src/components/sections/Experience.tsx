// src/components/sections/Experience.tsx
import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";
import { resume } from "@/data/resume";

export function Experience() {
    return (
        <div className="max-w-4xl mx-auto pb-10">
            <header className="mb-12 animate-fade-up">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Experience</h2>
                <p className="text-muted-foreground text-lg">My academic and professional journey so far.</p>
            </header>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {resume.experience.map((job, index) => (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full border border-white/10 bg-background/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_0_4px_rgba(0,0,0,0.5)] z-10 -translate-x-1/2 md:-translate-x-1/2">
                            {job.type === 'work' ? <Briefcase className="w-4 h-4 text-primary" /> : <GraduationCap className="w-4 h-4 text-secondary" />}
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] ml-14 md:ml-0">
                            <div className="glass-card p-6 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 border border-white/5 hover:border-white/15">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border overflow-hidden shrink-0", job.containerClass)}>
                                        {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-cover" /> : <span className={job.textClass}>{job.icon}</span>}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none mb-1">{job.company}</h3>
                                        <p className="text-primary text-sm font-medium">{job.title}</p>
                                    </div>
                                </div>
                                <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-wider bg-white/5 inline-block px-2 py-1 rounded">{job.period}</div>
                                <ul className="space-y-2">
                                    {job.highlights.map((highlight, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground/90 flex items-start gap-2">
                                            <span className="block w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" /> {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}