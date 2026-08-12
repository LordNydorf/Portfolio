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
            repoUrl: "https://github.com/LordNydorf/Smart-Trip-Planner"
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
            repoUrl: "https://github.com/LordNydorf/Pennora"
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
            demoUrl: "https://prepgenius-lordnydorf.netlify.app/"
        },
    ],
};