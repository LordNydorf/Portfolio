// src/components/SocialLinks.tsx
import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

// The Fancy Button (For Chromium/Safari/The Cool Kids)
function MagneticButton({ children, href, label }: { children: React.ReactNode, href: string, label: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            className="relative w-14 h-14 flex items-center justify-center z-50"
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
        >
            <motion.a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                style={{ x: springX, y: springY }}
                className={cn(
                    "w-10 h-10 grid place-items-center rounded-[0.875rem] border border-glass-border relative z-10 transition-colors",
                    "text-muted-foreground hover:text-primary hover:bg-primary/10",
                    "backdrop-blur-xl bg-white/5 shadow-lg",
                    "transform-none"
                )}
            >
                {children}
            </motion.a>
        </div>
    );
}

export function SocialLinks() {
    // 🦊 The "Are you using a shit browser?" Check
    const isFirefox = useMemo(() => {
        if (typeof window === "undefined") return false;
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }, []);

    return (
        <div className={cn("flex justify-center pt-6 border-t border-glass-border", isFirefox ? "gap-2" : "gap-0")}>
            {resume.contact.socials.map((social) => {
                const Icon = social.icon;

                // IF FIREFOX: Return the primitive, caveman version.
                if (isFirefox) {
                    return (
                        <a
                            key={social.name}
                            href={social.url}
                            target={social.url.startsWith("http") ? "_blank" : undefined}
                            rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                            aria-label={social.name}
                            className="w-10 h-10 grid place-items-center glass-card rounded-[0.875rem] border border-glass-border transition-all hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 text-muted-foreground"
                        >
                            <Icon className="h-[18px] w-[18px]"/>
                        </a>
                    );
                }

                // IF MODERN BROWSER: Return the fancy magnetic shit.
                return (
                    <MagneticButton key={social.name} href={social.url} label={social.name}>
                        <Icon className="h-[18px] w-[18px]"/>
                    </MagneticButton>
                );
            })}
        </div>
    );
}