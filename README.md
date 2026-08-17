# 🌌 Rohit Krishnan — Spatial Developer Portfolio

An interactive, high-performance developer portfolio and spatial computing playground built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **60 FPS GPU Canvas Physics**.

---

## ✨ Features & Innovations

### 💡 The "Hanging Ceiling Pull-Cord" Light Switch
* **Tactile Spring Physics:** A beaded brass chain and glowing incandescent light bulb dangling from the ceiling. Click or touch-drag downward to stretch the cord with rubber spring physics.
* **Flashbang & Comic Dialogue:** Snaps between Dark & Light modes with a full-screen flashbang and randomized humorous developer dialogue popups.

### 🪪 3D Swinging Developer ID Lanyard Badge
* **Inertia Drag & Fling Physics:** Grab and swing a 3D credential badge card with real-time 3-axis rotation (`rotateX`, `rotateY`, `rotateZ`), spring recoil, verified architect seal, Level 5 root barcode, and specular holographic prism foil sheen.
* **Touchscreen Native:** Full multi-touch support on mobile devices.

### 🌌 60 FPS GPU Procedural Atmosphere & Vector Matrix
* **Real-time Canvas Shaders:** Smooth interactive background rendering with liquid radial orbs, cursor spotlight tracking, razor-sharp vector grid lines, and specular flare intersections.
* **4 Atmospheric Shaders:**
  - 🔴 **Cyber Crimson:** Liquid ruby magma & deep obsidian space
  - 🟣 **Cosmic Indigo:** Deep violet nebula & electromagnetic rays
  - 🔵 **Architectural Grid:** Minimalist laser vector mesh & spotlight
  - 🟢 **Quantum Aurora:** Emerald caustics & cyan energy streams

### 💻 Interactive Developer CLI Sandbox (`DEV-CLI`)
* **Floating CLI Terminal:** Accessible via the bottom-right terminal dock or `⌘K` command menu.
* **Supported Commands:** `help`, `about`, `skills`, `works`, `experience`, `theme <mode>`, `hire`, `clear`.

### 🌲 Interactive "Git Commit Graph" Career Journey
* **Git Tree Visualizer:** Experience timeline formatted as a Git commit history with branch filtering (`all (HEAD)`, `main (work)`, `feat/academia`).
* **Commit Stats:** Dynamic commit hashes (`commit c3a9f1b`), code diff indicators (`+2,480 / -410 lines`), and glowing laser branch paths.

### 🎴 Hardware-Accelerated 3D Holographic Project Cards
* **3D Mouse Vector Calculations:** True 3D perspective tilt with specular edge glow, animated border beams, and prismatic foil sheen.
* **Interactive Media Drawer:** Non-cropping screenshots with carousel navigation and tech stack tag highlights.

### 🔡 Cyber Matrix Decryption Typography
* **Real-Time Unscramble:** Matrix glyph unscramble typography that activates dynamically on viewport intersection and mouse hover.

### 📱 Full Mobile & Touch Responsiveness
* Custom adaptive layouts, touch gesture bindings across all 3D canvas widgets, dynamic floating mobile capsule navigation, and optimized touch targets.

---

## 📁 Clean Domain Architecture

```
src/
├── components/
│   ├── layout/            # Layout shell, navigation, footer, atmosphere switcher & pull cord
│   │   ├── Layout.tsx
│   │   ├── FloatingNavbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CommandMenu.tsx
│   │   ├── AtmosphereSwitcher.tsx
│   │   ├── PullCordTheme.tsx
│   │   └── index.ts
│   │
│   ├── sections/          # Page sections (Storyline flow)
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   └── index.ts
│   │
│   ├── interactive/       # Tactile physics & interactive widgets
│   │   ├── LanyardBadge.tsx
│   │   ├── HologramSphere.tsx
│   │   ├── InteractiveTerminal.tsx
│   │   ├── ProjectCard3D.tsx
│   │   ├── ProceduralAtmosphere.tsx
│   │   ├── TiltedFigure.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   │
│   ├── effects/           # Visual shaders, typography & motion effects
│   │   ├── DecryptedText.tsx
│   │   ├── VariableProximity.tsx
│   │   ├── KineticText.tsx
│   │   ├── SpotlightCard.tsx
│   │   ├── BorderBeam.tsx
│   │   ├── Magnet.tsx
│   │   ├── Marquee.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── NoiseOverlay.tsx
│   │   └── index.ts
│   │
│   ├── providers/         # Global context providers
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   │
│   └── ui/                # Pure atomic shadcn/ui primitives
│       ├── button.tsx, badge.tsx, carousel.tsx, drawer.tsx, dialog.tsx...
│
├── hooks/                 # Reusable custom React hooks
│   ├── use-mobile.tsx
│   ├── use-scroll-spy.ts
│   ├── use-typewriter.tsx
│   ├── use-prefers-reduced-motion.tsx
│   └── use-toast.ts
│
├── lib/                   # Utility helpers & theme constants
│   ├── utils.ts
│   └── colours.ts
│
├── data/                  # Centralized resume & portfolio content
│   ├── resume.tsx
│   └── portrait.ts
│
└── types/                 # TypeScript interfaces
    └── index.ts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (TypeScript check & minification)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🛠️ Customization

All portfolio data (bio, skills, career milestones, featured projects, social links, contact email) is centralized in:
```
src/data/resume.tsx
```
Modifying this single file instantly updates the Hero section, Technical Arsenal, Git Commit Graph, Project Showcase, and Command Palette across the entire application.

---
