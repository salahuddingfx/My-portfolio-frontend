"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const TechSphere = dynamic(() => import("../canvas/TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
    </div>
  ),
});

const techCategories = [
  {
    title: "Frontend",
    desc: "Interfaces and client-side experiences",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    desc: "APIs, databases and server-side logic",
    skills: ["Node.js", "Express", "Python", "Django", "MySQL"],
  },
  {
    title: "DevOps & Tools",
    desc: "Deployment, automation and environments",
    skills: ["Git", "Docker", "Vercel", "AWS", "Linux"],
  },
  {
    title: "Design",
    desc: "Prototyping and high-fidelity mockups",
    skills: ["Figma", "Adobe XD", "UI/UX"],
  },
];

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

const TechStack = () => {
  return (
    <section id="tech" className="section-shell bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-heading mt-1">
            Tools I work with.
          </h2>
          <p className="section-subtext mx-auto text-center">
            A collection of technologies I use to build fast and
            reliable digital products.
          </p>
        </div>

        {/* 3D Sphere — completely preserved */}
        <div className="w-full h-[420px] lg:h-[580px] relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing mb-14">
          <TechSphere />
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card card-hover group"
            >
              <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-[var(--muted)] mb-4 leading-relaxed group-hover:text-[var(--muted)] transition-colors">
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
