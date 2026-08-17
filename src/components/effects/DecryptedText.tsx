// src/components/effects/DecryptedText.tsx
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "hover" | "view" | "inViewHover";
}

export function DecryptedText({
    text,
    speed = 40,
    maxIterations = 8,
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
    className = "",
    parentClassName = "",
    encryptedClassName = "text-primary/70 font-mono",
    animateOn = "inViewHover"
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isDecrypted, setIsDecrypted] = useState(true);

    const containerRef = useRef<HTMLSpanElement | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const availableChars = useMemo(() => {
        return useOriginalCharsOnly
            ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
            : characters.split("");
    }, [useOriginalCharsOnly, text, characters]);

    const shuffleText = useCallback(
        (originalText: string, currentRevealed: Set<number>) => {
            return originalText
                .split("")
                .map((char, i) => {
                    if (char === " ") return " ";
                    if (currentRevealed.has(i)) return originalText[i];
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                })
                .join("");
        },
        [availableChars]
    );

    const triggerDecrypt = useCallback(() => {
        if (isAnimating) return;
        setRevealedIndices(new Set());
        setIsDecrypted(false);
        setIsAnimating(true);
    }, [isAnimating]);

    useEffect(() => {
        if (!isAnimating) return;

        let currentIteration = 0;

        intervalRef.current = setInterval(() => {
            setRevealedIndices((prevRevealed) => {
                currentIteration++;
                setDisplayText(shuffleText(text, prevRevealed));

                if (currentIteration >= maxIterations) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsAnimating(false);
                    setDisplayText(text);
                    setIsDecrypted(true);
                    return new Set(Array.from({ length: text.length }, (_, i) => i));
                }
                return prevRevealed;
            });
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAnimating, text, speed, maxIterations, shuffleText]);

    const triggerHoverDecrypt = useCallback(() => {
        if (isAnimating) return;
        triggerDecrypt();
    }, [isAnimating, triggerDecrypt]);

    const resetToPlainText = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(false);
        setRevealedIndices(new Set());
        setDisplayText(text);
        setIsDecrypted(true);
    }, [text]);

    useEffect(() => {
        if (animateOn !== "view" && animateOn !== "inViewHover") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        triggerDecrypt();
                        setHasAnimated(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentRef = containerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [animateOn, hasAnimated, triggerDecrypt]);

    const animateProps =
        animateOn === "hover" || animateOn === "inViewHover"
            ? {
                onMouseEnter: triggerHoverDecrypt,
                onMouseLeave: resetToPlainText
            }
            : {};

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap cursor-default select-none ${parentClassName}`}
            {...animateProps}
        >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {displayText.split("").map((char, index) => {
                    const isRevealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
                    return (
                        <span key={index} className={isRevealed ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}
