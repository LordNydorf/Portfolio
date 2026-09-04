// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const extractFromResume = (content: string, key: string) => {
    const regex = new RegExp(`${key}:\\s*["'\`](.*?)["'\`]`);
    const match = content.match(regex);
    return match ? match[1] : null;
};

const getIndefiniteArticle = (word: string) => {
    const w = word.trim().toLowerCase();

    if (/^u(ni|ser|x|i)/.test(w)) return 'a';

    if (/^h(our|onest|onor)/.test(w)) return 'an';

    if (/^[FHLMNRSX][A-Z0-9]*$/.test(word) && !/^[AEIOU]/.test(w)) return 'an';

    return /^[aeiou]/.test(w) ? 'an' : 'a';
};

export default defineConfig(({ mode }) => {
    const resumePath = path.resolve(__dirname, "./src/data/resume.tsx");
    const resumeContent = fs.existsSync(resumePath) ? fs.readFileSync(resumePath, "utf-8") : "";

    const name = extractFromResume(resumeContent, "name") || "Portfolio";
    const role = extractFromResume(resumeContent, "role") || "Web Developer";

    const article = getIndefiniteArticle(role);

    const metaDescription = `Professional portfolio of ${name}, ${article} ${role}. View my projects, skills, and contact information.`;

    const base = mode === "development" ? "/" : (process.env.BASE_URL || "/Portfolio/");

    return {
        base,
        server: {
            host: "::",
            port: 8080,
        },
        plugins: [
            react(),
            {
                name: "html-meta-injector",
                transformIndexHtml(html: string) {
                    let newHtml = html.replace(
                        /<title>(.*?)<\/title>/,
                        `<title>${name} - ${role}</title>`
                    );

                    const metaTag = `<meta name="description" content="${metaDescription}" />`;

                    if (newHtml.includes('<meta name="description"')) {
                        newHtml = newHtml.replace(
                            /<meta name="description" content=".*?" \/>/,
                            metaTag
                        );
                    } else {
                        newHtml = newHtml.replace("</head>", `  ${metaTag}\n  </head>`);
                    }

                    return newHtml;
                },
            },
        ].filter(Boolean),
        build: {
            target: "esnext",
            cssCodeSplit: true,
            chunkSizeWarningLimit: 600,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            if (id.includes("framer-motion")) {
                                return "vendor-motion";
                            }
                            if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("vaul") || id.includes("@hookform") || id.includes("react-day-picker")) {
                                return "vendor-ui";
                            }
                            if (id.includes("lucide-react")) {
                                return "vendor-icons";
                            }
                            if (id.includes("recharts") || id.includes("d3-")) {
                                return "vendor-charts";
                            }
                        }
                    }
                }
            }
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});