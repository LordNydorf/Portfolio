// src/components/sections/Experience.tsx
import { useState } from "react";
import { cn, getAssetUrl } from "@/lib/utils";
import { GitCommit, GitBranch, GitMerge, Briefcase, GraduationCap } from "lucide-react";
import { SpotlightCard, DecryptedText } from "@/components/effects";
import { resume } from "@/data/resume";

const COMMIT_HASHES = ["c3a9f1b", "8d04e2a", "4f91b7c", "1e85a9d"];
const DIFF_STATS = [
    { added: "+2,480", deleted: "-410", files: "18 files" },
    { added: "+1,920", deleted: "-230", files: "14 files" },
    { added: "+3,150", deleted: "-560", files: "22 files" },
    { added: "+1,200", deleted: "-180", files: "9 files" }
];

export function Experience() {
    const [activeBranch, setActiveBranch] = useState<"all" | "work" | "education">("all");
    const [hoveredCommit, setHoveredCommit] = useState<number | null>(null);

    const filteredExperience = resume.experience.filter(
        (job) => activeBranch === "all" || job.type === activeBranch
    );

    return (
        <section id="experience" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6">
            {/* Header with Decrypted Matrix Typography */}
            <header className="mb-10 sm:mb-14 animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold mb-3">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>GIT LOG // CAREER TREE</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        <DecryptedText text="Career Journey" speed={35} maxIterations={10} />
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-2">
                        Git commit graph of academic milestones and engineering experience.
                    </p>
                </div>

                {/* Branch Switcher Filters */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 overflow-x-auto hide-scrollbar max-w-full w-full sm:w-auto self-start md:self-auto">
                    <button
                        onClick={() => setActiveBranch("all")}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                            activeBranch === "all"
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <GitMerge className="w-3.5 h-3.5" />
                        <span>all (HEAD)</span>
                    </button>

                    <button
                        onClick={() => setActiveBranch("work")}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                            activeBranch === "work"
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>main (work)</span>
                    </button>

                    <button
                        onClick={() => setActiveBranch("education")}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                            activeBranch === "education"
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>feat/academia</span>
                    </button>
                </div>
            </header>

            {/* Git Branch Laser Timeline */}
            <div className="relative space-y-8 sm:space-y-12 before:absolute before:inset-0 before:ml-5 sm:before:ml-6 md:before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/60 before:to-primary/20 before:shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                {filteredExperience.map((job, index) => {
                    const commitHash = COMMIT_HASHES[index % COMMIT_HASHES.length];
                    const diff = DIFF_STATS[index % DIFF_STATS.length];
                    const isHovered = hoveredCommit === index;

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredCommit(index)}
                            onMouseLeave={() => setHoveredCommit(null)}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-up"
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            {/* Git Commit Node Anchor */}
                            <div
                                className={cn(
                                    "absolute left-5 sm:left-6 md:left-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border bg-background dark:bg-[#0c0c12] backdrop-blur-xl flex items-center justify-center z-10 -translate-x-1/2 md:-translate-x-1/2 transition-all duration-300",
                                    isHovered
                                        ? "scale-125 border-primary shadow-[0_0_25px_rgba(239,68,68,0.7)] rotate-6"
                                        : "border-primary/40 shadow-[0_0_12px_-2px_hsl(var(--primary)/0.4)]"
                                )}
                            >
                                <GitCommit
                                    className={cn(
                                        "w-4 h-4 sm:w-5 sm:h-5 transition-colors",
                                        job.type === "work" ? "text-primary" : "text-secondary"
                                    )}
                                />
                            </div>

                            {/* Experience Commit Card */}
                            <div className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-14 sm:ml-16 md:ml-0">
                                <SpotlightCard
                                    spotlightColor={
                                        job.type === "work"
                                            ? "rgba(239, 68, 68, 0.2)"
                                            : "rgba(244, 63, 94, 0.2)"
                                    }
                                    className="p-5 sm:p-7 md:p-8 rounded-[2rem] transition-all duration-300 group-hover:-translate-y-1.5 border border-black/10 dark:border-white/10 shadow-xl"
                                >
                                    {/* Commit Metadata Bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-3 mb-4 text-xs font-mono">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary font-bold">commit {commitHash}</span>
                                            <span className="text-muted-foreground">•</span>
                                            <span className="text-muted-foreground">{job.period}</span>
                                        </div>

                                        {/* Diff Stat Pills */}
                                        <div className="flex items-center gap-1 text-[11px]">
                                            <span className="text-emerald-500 font-semibold">{diff.added}</span>
                                            <span className="text-rose-500 font-semibold">{diff.deleted}</span>
                                        </div>
                                    </div>

                                    {/* Company & Role */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold border overflow-hidden shrink-0 shadow-sm",
                                                job.containerClass
                                            )}
                                        >
                                            {job.logo ? (
                                                <img
                                                    src={getAssetUrl(job.logo)}
                                                    alt={job.company}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className={job.textClass}>{job.icon}</span>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg leading-tight text-foreground tracking-tight">
                                                {job.company}
                                            </h3>
                                            <p className="text-primary text-sm font-semibold">{job.title}</p>
                                        </div>
                                    </div>

                                    {/* Commit Highlights */}
                                    <ul className="space-y-2.5">
                                        {job.highlights.map((highlight, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-muted-foreground/90 flex items-start gap-2.5 leading-relaxed"
                                            >
                                                <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </SpotlightCard>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
