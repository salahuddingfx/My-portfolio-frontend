# Salahuddin's Portfolio — Frontend

A high-end, cinematic portfolio built with **Next.js 15**, **React 19**, **GSAP**, and **Three.js**. Features advanced animations, 3D visuals, and a sleek dark-themed design.

**Live:** [salahuddin.codes](https://salahuddin.codes)

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript
- **UI:** React 19, Tailwind CSS v4, DaisyUI 5
- **Animations:** GSAP 3 (ScrollTrigger), Framer Motion 12
- **3D:** Three.js, @react-three/fiber, @react-three/drei, Spline
- **Scroll:** Lenis (smooth scroll)
- **Icons:** Lucide React

## Getting Started

```bash
npm install
# or
bun install
```

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages + metadata
├── components/
│   ├── sections/ # Page sections (Hero, About, Projects, etc.)
│   └── ui/       # Reusable UI components
├── context/      # Settings context provider
└── lib/          # Utility functions
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

## License

MIT — see [LICENSE](LICENSE).
