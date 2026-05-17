import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Bangladesh. Web apps built with Next.js, React, TypeScript, and more.",
  openGraph: {
    title: "Projects | Salah Uddin Kader",
    description: "Full Stack Developer portfolio projects from Cox's Bazar, Bangladesh.",
  },
};

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 'var(--navbar-height, 120px)' }}>
      <Projects />
    </main>
  );
}
