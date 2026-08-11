// src/types/index.ts
import { LucideIcon } from "lucide-react";

export interface Social {
    name: string;
    url: string;
    icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Job {
    company: string;
    title: string;
    period: string;
    type: "work" | "education";
    logo?: string;
    icon?: string; // Fallback text (e.g. "UC")
    containerClass?: string; // Tailwind class for color
    textClass?: string; // Tailwind class for text color
    highlights: string[];
}

export interface Project {
    title: string;
    client: string;
    timeline: string;
    techStack: string[]; // Used for pills
    description: string;
    scope: string;
    responsibilities: string[];
    languages: string[]; // Used for coloring
    images: string[];
    repoUrl?: string;
    demoUrl?: string;
}

export interface Attribute {
    label: string;
    description: string;
    icon: LucideIcon;
    color: string; // Tailwind text color
}

export interface SiteConfig {
    name: string;
    role: string;
    bio: string[];
    typewriterWords: string[]; // For the hero animation
    location: string;
    email: string;
    contact: {
        formspreeUrl?: string;
        socials: Social[];
    };
    skills: string[];
    attributes: Attribute[];
    experience: Job[];
    projects: Project[];
}