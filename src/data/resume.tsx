// src/data/resume.tsx
import {
    Github,
    Linkedin,
    Mail,
    Zap,
    Accessibility,
    MessageSquareText,
} from "lucide-react";
import { SiteConfig } from "@/types";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export const resume: SiteConfig = {
    name: "Rohit Krishnan",
    role: "Software Developer",
    location: "Kerala",
    email: "rohitkrishnanofficial@gmail.com",

    typewriterWords: ["interfaces.", "experiences.", "solutions."],

    bio: [
        "I specialise in creating unique and beautiful looking", // Note: Typewriter effect follows this line
        "From bakery menus to real-time collaboration platforms, my philosophy remains the same: make it accessible, performant, and delight the user.",
        "I'm committed to continuous learning and improvement and while that may at times manifest as my well known affinity for overly-designed solutions, down to every single pixel, I believe that's the spark that makes a product particularly enticing for any user :)"
    ],

    contact: {
        socials: [
            { name: "GitHub", url: "https://github.com/lordnydorf", icon: Github },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/rohit-krishnan-633a43250/", icon: Linkedin },
            {
                name: "Instagram",
                url: "https://www.instagram.com/i_.rohit._i/",
                icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" {...props}>
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                )
            },
            { name: "Email", url: "mailto:rohitkrishnanofficial.com", icon: Mail },
        ]
    },

    skills: [
        "Dart", "Flutter", "Python", "Java", "HTML/CSS", "JavaScript", "TypeScript", "Bash", "FastAPI",
        "Astro", "React", "Git", "SQL", "Node.js", "Flask", "Firebase", "Hive", "Google Cloud", "Gemini API",
        "LLaMA 3", "TensorFlow", "scikit-learn", "YOLOv8", "Slack", "Linear", "VS Code", "Antigravity", "Cursor",
        "Windsurf", "PyCharm", "IntelliJ", "Eclipse", "Streamlit", "pandas", "NumPy", "Matplotlib", "SFTTrainer"
    ],

    attributes: [
        {
            label: "Accessibility Focused",
            description: "I build for everyone.",
            icon: Accessibility,
            color: "text-blue-400"
        },
        {
            label: "Performance First",
            description: "I optimise for speed and efficiency.",
            icon: Zap,
            color: "text-amber-400"
        },
        {
            label: "Clear Communication",
            description: "I'll give you jargon or plain English. Whichever you prefer.",
            icon: MessageSquareText,
            color: "text-emerald-400"
        },
    ],

    experience: [
        {
            type: "work",
            company: "Umrohit Cakes",
            logo: "/experience/umrohit.webp",
            icon: "UC",
            containerClass: "bg-red-500/10 border-red-500/20",
            textClass: "text-red-400",
            title: "Graphic Designer",
            period: "Jan 2020 – Present",
            highlights: [
                "Designed branding and marketing materials.",
                "Designed and edited photographs and vector illustrations for social media and print.",
                "Integrating fulfilment and payment apps.",
            ],
        },
        {
            type: "education",
            company: "Taylor's University",
            logo: "/experience/taylors.webp",
            icon: "TU",
            containerClass: "bg-red-500/10 border-red-500/20",
            textClass: "text-red-400",
            title: "BSc Computer Science",
            period: "Sep 2023 - Present",
            highlights: [
                "BSC Computer Science with a specialisation in Data Science.",
                "Dean's List for academic excellence.",
                "Active member of multiple Hackathon teams and competitions.",
            ],
        },
        {
            type: "education",
            company: "Multimedia University",
            icon: "MMU",
            containerClass: "bg-blue-500/10 border-blue-500/20",
            textClass: "text-blue-400",
            title: "Foundation in IT",
            period: "Jan 2022 - Dec 2022",
            highlights: [
                "Foundation in Information Technology.",
                "Graduated with High Distinction.",
                "Focus on programming fundamentals and mathematics.",
            ],
        },
    ],

    projects: [
        {
            title: "DropSilk",
            client: "Personal Project",
            timeline: "Ongoing",
            techStack: ["JavaScript", "WebRTC", "WebSocket"],
            images: ["/dropsilk/SSIV2.webp", "/dropsilk/ds1.png"],
            description: "DropSilk is a peer-to-peer file sharing application that enables users to transfer files directly between devices without relying on cloud storage. It prioritizes privacy and speed by establishing a secure, direct connection between users.",
            scope: "Full-stack Development",
            responsibilities: [
                "Developing the front-end using vanilla JavaScript, HTML, and CSS.",
                "Implementing peer-to-peer file transfer and screen sharing functionality using WebRTC.",
                "Setting up a WebSocket signaling server to facilitate WebRTC connections.",
            ],
            languages: ["JavaScript", "HTML", "CSS"],
            repoUrl: "https://github.com/medy17/dropsilk",
            demoUrl: "https://dropsilk.xyz",
        },
        {
            title: "CloneReaper Prime",
            client: "Open Source",
            timeline: "4 weeks",
            techStack: ["Python", "Multiprocessing"],
            images: ["crp/crp-ascii.webp"],
            description: "A high-performance, cross-platform utility for finding and managing duplicate files. It leverages parallel processing for fast hashing and offers multiple safe removal options.",
            scope: "System Utility",
            responsibilities: [
                "Developing a high-performance, two-stage scanning engine.",
                "Building both a user-friendly interactive menu and CLI mode.",
            ],
            languages: ["Python"],
            repoUrl: "https://github.com/medy17/clone-reaper-prime",
        },
        {
            title: "Imgur Archive Viewer",
            client: "Open Source",
            timeline: "3 weeks",
            techStack: ["Python", "Tkinter", "API"],
            images: ["iav/iav.webp"],
            description: "A modern desktop application for finding and recovering lost or deleted Imgur media from the Internet Archive's Wayback Machine.",
            scope: "Desktop App",
            responsibilities: [
                "Designing the GUI using Tkinter and sv-ttk.",
                "Implementing multi-threaded architecture.",
            ],
            languages: ["Python"],
            repoUrl: "https://github.com/medy17/imgur-archive-viewer",
        },
        {
            title: "Bandar Breakdowns",
            client: "Personal Project",
            timeline: "Ongoing",
            techStack: ["HTML", "CSS", "JavaScript"],
            images: ["tbb/tbb.webp"],
            description: "A personal blog and website featuring articles and stories on topics like student life, food, and personal experiences.",
            scope: "Website Development",
            responsibilities: [
                "Designing and developing the website's front-end.",
                "Envisioning and designing a brand identity.",
            ],
            languages: ["HTML", "CSS", "JavaScript"],
            repoUrl: "https://github.com/medy17/BandarBreakdowns",
            demoUrl: "https://bandar-breakdowns.vercel.app"
        },
        {
            title: "Gemini Translator",
            client: "Open Source",
            timeline: "4 weeks",
            techStack: ["Browser Ext", "JavaScript"],
            images: ["gt/gtp.webp"],
            description: "A feature-rich browser extension that leverages the Google Gemini API to provide high-quality translations for entire web pages.",
            scope: "Browser Extension",
            responsibilities: [
                "Developing Manifest V3 service worker.",
                "Integrating Google Gemini API.",
            ],
            languages: ["JavaScript", "HTML", "CSS"],
            repoUrl: "https://github.com/medy17/GeminiTranslate"
        },
        {
            title: "Sorting Visualizer",
            client: "Open Source",
            timeline: "6 weeks",
            techStack: ["Python", "Pygame"],
            images: ["sav/sav.webp"],
            description: "An interactive desktop application that provides a visual and auditory representation of various sorting algorithms.",
            scope: "Desktop App",
            responsibilities: [
                "Developing core visualization engine using Pygame.",
                "Implementing classic sorting algorithms.",
            ],
            languages: ["Python"],
            repoUrl: "https://github.com/medy17/sorting-visualizer"
        },
    ],
};