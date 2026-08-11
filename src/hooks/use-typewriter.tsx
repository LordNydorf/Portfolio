// src/hooks/use-typewriter.ts
import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], speed = 150, pause = 2000) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const timeout2 = setTimeout(() => setBlink(!blink), 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(
            reverse ? 75 : subIndex === words[index].length ? pause : speed,
            parseInt(String(Math.random() * 100))
        ));
        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, speed, pause]);

    return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
}