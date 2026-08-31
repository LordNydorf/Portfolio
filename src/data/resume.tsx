// src/data/resume.tsx
import {
    Github,
    Linkedin,
    Mail,
    Zap,
    Accessibility,
    Layers,
    Cpu,
    Compass,
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
        "From utility tools to real-time B2C platforms, my philosophy remains the same: make it accessible, performance-oriented, and visually mindblowing.",
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
            { name: "Email", url: "mailto:rohitkrishnanofficial@gmail.com", icon: Mail },
        ]
    },

    skills: [
        "Dart", "Flutter", "Kotlin", "Jetpack Compose", "Ktor", "Python", "Java", "HTML/CSS", "JavaScript", "TypeScript", "Bash", "FastAPI",
        "Astro", "React", "Git", "SQL", "SQLite", "Docker", "Node.js", "Flask", "Firebase", "Hive", "Riverpod", "Google Cloud", "Gemini API",
        "LLaMA 3", "TensorFlow", "scikit-learn", "YOLOv8", "Slack", "Linear", "VS Code", "Antigravity", "Cursor",
        "Windsurf", "PyCharm", "IntelliJ", "Eclipse", "Streamlit", "pandas", "NumPy", "Matplotlib", "SFTTrainer"
    ],

    attributes: [
        {
            label: "Accessibility Focused",
            description: "I build for everyone — high contrast, keyboard navigable, screen-reader friendly.",
            icon: Accessibility,
            color: "text-blue-400"
        },
        {
            label: "Performance First",
            description: "I obsess over 60fps rendering, asset compression, and near-zero latency.",
            icon: Zap,
            color: "text-amber-400"
        },
        {
            label: "Design Engineering",
            description: "Bridging the gap between Figma and code with tactile physics and micro-animations.",
            icon: Layers,
            color: "text-rose-400"
        },
        {
            label: "Systems & Clean Code",
            description: "Modular, well-documented architecture that scales gracefully without technical debt.",
            icon: Cpu,
            color: "text-cyan-400"
        },
        {
            label: "Continuous Exploration",
            description: "Constantly prototyping with modern AI models, shaders, and novel frameworks.",
            icon: Compass,
            color: "text-purple-400"
        },
    ],

    experience: [
        {
            type: "work",
            company: "2do Pros",
            logo: "/experience/2do.webp",
            icon: "2do",
            containerClass: "bg-red-500/10 border-red-500/20",
            textClass: "text-red-400",
            title: "Product Lead",
            period: "Jun 2025 – Present",
            highlights: [
                "1 of 3 core members driving product from seed-stage to launch",
                "Leading cross-platform application development for Flutter mobile and React",
                "Partnered with founders on engineering, product, marketing, and content strategy",
            ],
        },
        {
            type: "education",
            company: "Amrita Vishwa Vidyapeetham",
            logo: "/experience/avv.webp",
            icon: "AVV",
            containerClass: "bg-red-500/10 border-red-500/20",
            textClass: "text-red-400",
            title: "B.Tech Computer Science and Engineering",
            period: "Sep 2021 - Aug 2025",
            highlights: [
                "B.Tech Computer Science and Engineering.",
                "Community Head of Amrita eSports Community.",
                "Active member of multiple Hackathon teams and competitions.",
            ],
        },
        {
            type: "education",
            company: "Sharjah Indian School",
            logo: "/experience/sis.webp",
            icon: "SIS",
            containerClass: "bg-blue-500/10 border-blue-500/20",
            textClass: "text-blue-400",
            title: "Primary, Secondary, and High School",
            period: "2008 - 2021",
            highlights: [
                "High School Degree on Computer Science",
                "Graduated with 90% scores.",
            ],
        },
    ],

    projects: [
        {
            title: "2do",
            client: "Work Project",
            timeline: "1 year, 3 months",
            techStack: ["Flutter", "Dart", "Firebase", "Node.js"],
            images: ["/2do/2do.png"],
            description: "2do app is a user-facing services marketplace mobile application designed for booking home, auto, and lifestyle services. It connects users with nearby professionals for various services. Built on flutter for both iOS and Android.",
            scope: "App Development",
            responsibilities: [
                "Leading development of cross-platform mobile application using Flutter.",
                "Integrating backend services via REST APIs and ensuring smooth data flow.",
                "Optimising application for performance, scalability, and user experience."
            ],
            languages: ["Dart"],
            demoUrl: "https://play.google.com/store/apps/details?id=com.twodopros.userapp",
            categories: ["Mobile Apps"],
        },
        {
            title: "2do Partners",
            client: "Work Project",
            timeline: "1 year, 3 months",
            techStack: ["Flutter", "Dart", "Firebase", "Node.js"],
            images: ["/2do/2dop.png"],
            description: "2do Partners is a professional-facing services marketplace mobile application designed for professionals to receive and manage job requests. It connects professionals with users for home, auto, and lifestyle services. Built on flutter for both iOS and Android.",
            scope: "App Development",
            responsibilities: [
                "Leading development of cross-platform mobile application using Flutter.",
                "Integrating backend services via REST APIs and ensuring smooth data flow.",
                "Optimising application for performance, scalability, and user experience."
            ],
            languages: ["Dart"],
            demoUrl: "https://play.google.com/store/apps/details?id=com.twodopros.partnersapp",
            categories: ["Mobile Apps"],
        },
        {
            title: "2do Pros",
            client: "Work Project",
            timeline: "1 year, 3 months",
            techStack: ["React", "Vite", "GSAP"],
            images: ["/2do/2dopros.png"],
            description: "2do Pros is a services marketplace web application designed for users and professionals to connect and transact. It connects professionals with users for home, auto, and lifestyle services. Built on React and Vite.",
            scope: "Web Development",
            responsibilities: [
                "Leading development of web application using React and Vite.",
                "Integrating backend services via REST APIs and ensuring smooth data flow.",
                "Optimising application for performance, scalability, and user experience."
            ],
            languages: ["JavaScript"],
            demoUrl: "https://2dopros.com/",
            categories: ["Web & Full-Stack"],
        },
        {
            title: "Job Tracker",
            client: "Personal Project",
            timeline: "1 week",
            techStack: ["Kotlin", "Jetpack Compose", "Ktor", "SQLite", "Docker"],
            images: ["/jobtracker/jobtracker.png"],
            description: "A modern, production-grade Kotlin Multiplatform (KMP) application designed to track, manage, and follow up on job applications with zero friction. Features Material 3 Jetpack Compose UI, asynchronous Ktor Server backend with Exposed ORM & SQLite, API key security, and containerized cloud deployment.",
            scope: "Full-Stack Mobile Development",
            responsibilities: [
                "Architected end-to-end Kotlin Multiplatform codebase with shared data models, validation, and serialization across Android and backend.",
                "Crafted dynamic Material 3 Jetpack Compose interface with interactive pipeline stages, search, status filters, and follow-up nudges.",
                "Engineered robust Ktor REST API backend with SQLite persistence, fail-loud API key security, and Docker/Render cloud deployment."
            ],
            languages: ["Kotlin"],
            repoUrl: "https://github.com/LordNydorf/Job-Tracker",
            categories: ["Mobile Apps", "Web & Full-Stack"],
        },
        {
            title: "Kestrel",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["Flutter", "Dart", "Riverpod", "SQLite"],
            images: ["/kestrel/kestrel.png"],
            description: "Ultra high-performance, mobile-first financial trading terminal built with Flutter, Riverpod, and SQLite. Engineered with a Technical Instrument aesthetic, delivering streaming real-time market data across high-frequency tick simulations (up to 50+ ticks/sec), atomic transactional order execution, persistent reorderable watchlists, and zero layout shift.",
            scope: "Mobile App Development",
            responsibilities: [
                "Engineered high-frequency market simulation engine with isolated widget tree repaints and zero cumulative layout shift.",
                "Implemented atomic SQLite trade execution with integer paise precision, strict financial validation, and wallet balance management.",
                "Crafted Hallmark Obsidian design system with tabular figures and 200ms micro-flash price animations."
            ],
            languages: ["Dart"],
            repoUrl: "https://github.com/LordNydorf/Kestrel",
            categories: ["Mobile Apps", "AI & Systems"],
        },
        {
            title: "ProofPic",
            client: "Personal Project",
            timeline: "Ongoing",
            techStack: ["Flutter", "Dart"],
            images: ["/proofpic/pp.webp"],
            description: "ProofPic is utility tool that adds timestamp and GPS location to images. It is built with Flutter and Dart. It is a cross-platform application that is available on Android, iOS, and Web.",
            scope: "App Development",
            responsibilities: [
                "Building app 0->1 from scratch.",
                "Defining product roadmap and feature development.",
                "Making UI and UX decisions and implementing core features."
            ],
            languages: ["Dart"],
            repoUrl: "https://github.com/LordNydorf/ProofShot",
            categories: ["Mobile Apps"],
        },
        {
            title: "PlayPulse",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["Python", "Flask", "JavaScript"],
            images: ["/ypdc/ypdc.png"],
            description: "A web application that calculates the total duration of all the videos in a YouTube playlist.",
            scope: "Web Development",
            responsibilities: [
                "Built with Python and Flask on the backend, and HTML and CSS on the frontend.",
                "Uses the YouTube Data API v3 to fetch video data from the playlist.",
            ],
            languages: ["Python", "HTML/CSS", "JavaScript", "Flask"],
            repoUrl: "https://github.com/LordNydorf/YTplaylistCalc",
            categories: ["Web & Full-Stack"],
            demoUrl: "https://playpulse-duration.netlify.app/"
        },
        {
            title: "POTD-NASA",
            client: "Personal Project",
            timeline: "1 week",
            techStack: ["React", "API"],
            images: ["/potd/potd.webp"],
            description: "Build a React JS app with the NASA API",
            scope: "Website Development",
            responsibilities: [
                "Integrated NASA POD API.",
                "Created a simple yet elegant UI/UX.",
            ],
            languages: ["React"],
            repoUrl: "https://github.com/LordNydorf/POTD-NASA",
            categories: ["Web & Full-Stack"],
            demoUrl: "https://lordnydorf-potd-nasa.netlify.app/"
        },
        {
            title: "TaskFlow",
            client: "Personal Project",
            timeline: "1 week",
            techStack: ["HTML/CSS", "JavaScript", "React"],
            images: ["/taskflow/taskflow.svg"],
            description: "CRUD Todo app with React.js.",
            scope: "Website Development",
            responsibilities: [
                "Designing and developing the website's front-end.",
                "Envisioning and designing a brand identity.",
            ],
            languages: ["HTML/CSS", "JavaScript", "React"],
            repoUrl: "https://github.com/LordNydorf/Todolist",
            categories: ["Web & Full-Stack"],
            demoUrl: "https://taskflow-lordnydorf.netlify.app/"
        },
        {
            title: "Itinera",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["Flutter", "Dart"],
            images: ["/stp/stp.png"],
            description: "A sophisticated AI-powered travel planning application built with Flutter that leverages Google's Gemini AI to create personalized itineraries.",
            scope: "App Development",
            responsibilities: [
                "Features intelligent cost tracking, offline mode, voice input, and comprehensive error handling.",
                "Integrating Google Gemini API.",
            ],
            languages: ["Dart"],
            repoUrl: "https://github.com/LordNydorf/Smart-Trip-Planner",
            categories: ["Mobile Apps", "AI & Systems"]
        },
        {
            title: "Pennora",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["Flutter", "Dart", "Firebase"],
            images: ["/pennora/pennora.png"],
            description: "Flutter-based investment platform that democratizes wealth building through automated micro-investing.",
            scope: "App Development",
            responsibilities: [
                "Built with modern Flutter architecture and integrated with Firebase for robust backend services",
                "Key features include Smart Portfolio Management, Advanced KYC & Security",
            ],
            languages: ["Dart"],
            repoUrl: "https://github.com/LordNydorf/Pennora",
            categories: ["Mobile Apps"]
        },
        {
            title: "Prepgenius",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["React", "Vite"],
            images: ["/prepgenius/prepgenius.png"],
            description: "PrepGenius is a competitive exam preparation and computer science learning web application. It provides study materials, video playlists, official solved question papers (CAT 2018–2023), and interactive practice quizzes for competitive exams such as CAT, GATE, GRE, GMAT, and IELTS.",
            scope: "Web Development",
            responsibilities: [
                "Designing and developing the website's front-end.",
                "Envisioning and designing a brand identity.",
            ],
            languages: ["HTML/CSS", "JavaScript", "React"],
            repoUrl: "https://github.com/LordNydorf/PrepGenius",
            categories: ["Web & Full-Stack"],
            demoUrl: "https://prepgenius-lordnydorf.netlify.app/"
        },
        {
            title: "Academia Pro",
            client: "Personal Project",
            timeline: "2 weeks",
            techStack: ["Python", "CustomTkinter", "SQLite", "MySQL"],
            images: ["/ap/ap.png"],
            description: "Report Card Generator is a desktop application that generates report cards for students. It is built with Python and Flask on the backend, and HTML and CSS on the frontend.",
            scope: "Desktop Application Development",
            responsibilities: [
                "Designing and developing the desktop application's front-end.",
                "Enabling CSV Export and Excel Import.",
            ],
            languages: ["Python", "CustomTkinter", "SQLite", "MySQL"],
            repoUrl: "https://github.com/duckcommit/Report-Card-Generator",
            categories: ["AI & Systems"]
        },
    ],
};