// src/lib/colours.ts

export const baseLanguageHsl: Record<string, string> = {
  // Programming Languages & Frameworks
  Dart: "198 90% 55%",
  Flutter: "198 92% 62%",
  Python: "205 75% 55%",
  Java: "22 80% 55%",
  "HTML/CSS": "14 85% 58%",
  HTML: "14 85% 58%",
  CSS: "210 80% 58%",
  JavaScript: "48 95% 58%",
  TypeScript: "211 80% 60%",
  Bash: "115 55% 55%",
  FastAPI: "168 80% 45%",
  Astro: "18 100% 55%",
  React: "193 95% 68%",
  Git: "10 87% 58%",
  SQL: "210 75% 60%",
  "Node.js": "118 55% 55%",
  Flask: "195 40% 75%",
  Firebase: "38 100% 52%",
  Hive: "48 100% 50%",
  "Google Cloud": "217 89% 61%",
  "Gemini API": "260 85% 68%",

  // Additional popular tools & libraries
  "Next.js": "0 0% 90%",
  Vue: "153 47% 49%",
  TailwindCSS: "198 93% 60%",
  Docker: "200 80% 55%",
  Kubernetes: "220 75% 55%",
  PostgreSQL: "210 50% 55%",
  MongoDB: "120 40% 50%",
  GraphQL: "319 100% 50%",
  WebRTC: "20 85% 55%",
  WebSocket: "200 70% 50%",
  Linux: "45 90% 55%",
  C: "210 60% 50%",
  "C++": "210 70% 55%",
  "C#": "270 60% 55%",
  Rust: "15 75% 50%",
  Go: "192 80% 50%",
  PHP: "235 40% 60%",
  Swift: "14 90% 55%",
  Kotlin: "275 80% 60%",
  AWS: "35 95% 50%",
};

export function getLanguageHsl(skill: string): string {
  if (baseLanguageHsl[skill]) return baseLanguageHsl[skill];
  // Deterministic pleasant color generation based on skill name
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `${hue} 80% 65%`;
}

// Proxy so languageHsl[anySkill] always returns a vibrant color
export const languageHsl = new Proxy(baseLanguageHsl, {
  get(target, prop: string) {
    if (typeof prop === "string" && prop in target) {
      return target[prop];
    }
    if (typeof prop === "string") {
      return getLanguageHsl(prop);
    }
    return Reflect.get(target, prop);
  }
});
