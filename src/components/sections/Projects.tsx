"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const FALLBACK_PROJECTS = [
  {
    title: "Vortex OS",
    desc: "A cloud infrastructure dashboard with real-time telemetry and analytics, built for performance at scale.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Three.js", "Node.js", "AWS"],
    links: { live: "#", source: "#" },
  },
  {
    title: "Nexus Intelligence",
    desc: "An enterprise AI integration platform for automated logistics and supply chain optimization.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "Python", "TensorFlow", "Redis"],
    links: { live: "#", source: "#" },
  },
  {
    title: "Aether Engine",
    desc: "A 3D rendering engine for the web capable of handling complex lighting and material physics.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    tags: ["WebGL", "GLSL", "TypeScript", "WASM"],
    links: { live: "#", source: "#" },
  },
];

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

const Projects = () => {
  const [projects, setProjects] = useState<typeof FALLBACK_PROJECTS>(FALLBACK_PROJECTS);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) { setLoading(false); return; }
        const res = await fetch(`${apiUrl}/admin/projects`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      } catch {
        /* use fallback */
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="section-shell bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-eyebrow">Selected work</span>
            <h2 className="section-heading mt-1">
              Recent projects.
            </h2>
          </div>
          <p className="section-subtext text-sm max-w-xs md:text-right">
            A few things I&apos;ve built recently — each one solving a real problem.
          </p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div
                className={`lg:col-span-7 relative aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] ${i % 2 !== 0 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className={`lg:col-span-5 flex flex-col gap-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <span className="text-xs font-mono text-[var(--muted-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="text-2xl lg:text-3xl font-semibold text-white leading-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {project.title}
                </h3>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5 pt-4 border-t border-[var(--border)]">
                  <a
                    href={project.links?.live}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[var(--accent)] transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Preview
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={project.links?.source}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
