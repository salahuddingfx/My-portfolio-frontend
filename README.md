# 🌌 Salahuddin's Portfolio — Cinematic Frontend

Welcome to the frontend codebase of Salah Uddin Kader's (**salahuddingfx**) ultra-premium personal portfolio. This website is a state-of-the-art interactive digital experience featuring seamless 3D renders, brutalist typography, fluid gsap transitions, and absolute responsiveness.

✨ **Live Site:** [salahuddin.codes](https://salahuddin.codes)

---

## ⚡ Core Features

- **🎭 Hyper-Interactive 3D Art:** Embedded interactive Spline scenes deferred automatically until preloader completion to optimize Initial Load Time.
- **🎨 Glassmorphic Custom preloader:** Dynamic numeric counter and smooth fluid typing cursor tracking loading metrics in real-time.
- **🔮 Harmonious Theme Engine:** Complete adaptivity to dark/light environments with variables controlling glowing accents, border highlights, and text contrast.
- **📱 Fluid Responsiveness:** Completely custom flex column stack layout for mobile viewports (< 1025px) to prevent component overlap.
- **📈 Advanced SEO:** Automated structured metadata, descriptive tags, social crawl URLs, and today's dynamically verified `sitemap.xml` for maximum visibility of keyword `salahuddingfx`.
- **🏎️ Smooth Kinetic Scroll:** Lenis integration combined with GSAP ScrollTrigger to orchestrate micro-animations.

---

## 🛠️ The Tech Stack

- **Core Engine:** `Next.js 15` (App Router) + `TypeScript` + `React 19`
- **Animation Frameworks:** `GSAP 3` (ScrollTrigger, SplitText context), `Framer Motion 12`
- **Immersive 3D Rendering:** `Three.js` via `@react-three/fiber` & `@react-three/drei` + `Spline runtime`
- **Styling Architecture:** Custom CSS3 Design Tokens + `Tailwind CSS v4` + `DaisyUI 5`
- **Typing & Icons:** `Lucide React`
- **Scrolling Physics:** `@studio-freight/lenis`

---

## 🚀 Getting Started

Ensure you have Node.js installed on your system. Using `bun` is highly recommended for speed.

### Installation
```bash
# Clone the repository and install dependencies
npm install
# or
bun install
```

### Dev Mode
```bash
npm run dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### Production Build
```bash
# Build the optimized production bundle
npm run build
# Start local server
npm start
```

---

## 📂 Project Architecture

```
frontend/src/
├── app/                  # Next.js App Router (Layouts, routes, SEO pages, globals)
│   ├── about/            # Interactive bio & certificates grid
│   ├── blog/             # Read articles and engineering posts
│   ├── projects/         # Dynamically loaded works & single details
│   ├── globals.css       # Core design tokens, gradients, animations, utility layers
│   └── sitemap.ts        # Dynamic site mapping
├── components/           # Component ecosystem
│   ├── sections/         # Big page modules (Hero, About, Projects, Services, TrustedBy)
│   └── ui/               # Global components (Navbar, Footers, Sidebars, Loaders)
├── context/              # Theme & application context provider
├── lib/                  # Fetch client & library integrations
└── types/                # TypeScript type declarations
```

---

## 📜 Custom License

This repository is governed by the **Creative Practice License (CPL)**. 
- You are permitted to clone and run this codebase locally **strictly for learning, personal practice, and educational study**.
- You are **NOT** permitted to host, publish, deploy, or redistribute this website or designs as your own work or portfolio. Claiming authorship or commercializing this project is strictly prohibited.

See the full terms in the [LICENSE](LICENSE) file.
