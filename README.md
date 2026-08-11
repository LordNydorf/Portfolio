# Rohit Krishnan — Portfolio

A modern, high-performance developer portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Designed with glassmorphism, responsive 3D card tilt interactions, and smooth animations.

---

## ✨ Features

- **⚡ Blazing Fast:** Powered by Vite for near-instant development and optimized production builds.
- **🎨 Glassmorphism Aesthetic:** Dark crimson and obsidian black visual theme with dynamic radial glows and micro-interactions.
- **📱 Fully Responsive:** Adaptive layout crafted for desktop, tablet, and mobile displays.
- **🗂️ Centralized Resume Data:** Single source of truth in `src/data/resume.tsx` for bio, skills, timeline, projects, and contact info.
- **⌨️ Command Palette:** `⌘K` / `Ctrl+K` quick search and navigation.
- **📬 Contact Form:** Direct integration with Formspree.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
├── public/                 # Static assets, favicons, portrait cutouts
├── src/
│   ├── components/         # Reusable layout and UI components
│   │   ├── sections/       # Page sections (About, Portfolio, Experience, Contact)
│   │   └── ui/             # shadcn/ui primitives
│   ├── data/               # Centralized data (resume.tsx)
│   ├── hooks/              # Custom hooks (typewriter, media queries)
│   ├── lib/                # Color palettes, utility functions
│   ├── types/              # TypeScript declarations
│   ├── App.tsx             # Main application component
│   └── index.css           # Global CSS variables, theme tokens, animations
├── index.html              # HTML entry point with metadata and fonts
└── tailwind.config.ts      # Tailwind styling configuration
```
