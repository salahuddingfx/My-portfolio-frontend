"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  _id?: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  tags: string[];
  links: { live: string; source: string };
  order?: number;
  featured?: boolean;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  { title: "StudyFlow", desc: "A full-stack productivity and study-management application designed to help self-learners track progress, use Pomodoro timers, and build consistent study habits.", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1200", tags: ["Vue.js", "Node.js", "Express", "MongoDB", "Socket.io"], links: { live: "https://github.com/salahuddingfx/Study-Flow", source: "https://github.com/salahuddingfx/Study-Flow" }, category: "Full Stack", featured: true, order: 1 },
  { title: "SalahUddin OS", desc: "A hyper-interactive, cinematic Operating System simulation running entirely in the browser, featuring custom terminal utilities, window management, desktop widgets, and live tool pipelines.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"], links: { live: "https://github.com/salahuddingfx/MY-OS", source: "https://github.com/salahuddingfx/MY-OS" }, category: "System Sim", featured: true, order: 2 },
  { title: "Aether 3D Engine", desc: "A browser-based, mobile-first 3D interactive system built with Three.js that allows users to sculpt and manipulate digital matter using motion controls.", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200", tags: ["HTML5", "Three.js", "JavaScript", "WebGL", "CSS3"], links: { live: "https://github.com/salahuddingfx/Gesture-System", source: "https://github.com/salahuddingfx/Gesture-System" }, category: "Creative 3D", featured: true, order: 3 },
  { title: "NoteSphere", desc: "A high-performance Academic Intelligence platform and note-sharing system designed for student resource indexing, search optimization, and academic collaboration.", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://github.com/salahuddingfx/NoteSphere", source: "https://github.com/salahuddingfx/NoteSphere" }, category: "Full Stack", featured: false, order: 4 },
  { title: "Memory Master", desc: "A real-time multiplayer memory-matching game built with React and Socket.io, featuring a high-fidelity glassmorphism design and state synchronization.", image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=1200", tags: ["React", "Node.js", "Express", "Socket.io", "Tailwind CSS"], links: { live: "https://github.com/salahuddingfx/Memory-Master", source: "https://github.com/salahuddingfx/Memory-Master" }, category: "Game", featured: false, order: 5 },
  { title: "Habit-OS", desc: "A next-generation AI-powered health tracking and habit management ecosystem built to optimize personal health metrics, exercise routines, and wellness targets.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200", tags: ["Vue.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://github.com/salahuddingfx/Habit-OS", source: "https://github.com/salahuddingfx/Habit-OS" }, category: "Full Stack", featured: false, order: 6 },
];

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setProjects(FALLBACK_PROJECTS);
          setLoading(false);
          return;
        }
        const res = await fetch(`${apiUrl}/admin/projects`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.sort((a: ProjectItem, b: ProjectItem) => (a.order ?? 0) - (b.order ?? 0)));
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const list = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const displayProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  if (loading) {
    return (
      <section
        id="projects"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(4rem, 8vw, 8rem) 0",
          background: "var(--background)",
        }}
      >
        <div style={{ maxWidth: "var(--container-max, 1440px)", margin: "0 auto", paddingInline: "var(--container-pad)" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "48px 0", borderBottom: i < 3 ? "3px solid #000000" : "none" }}>
              <div style={{ height: "16px", width: "120px", background: "var(--surface)", borderRadius: "var(--radius-sm)" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ height: "12px", width: "80px", background: "var(--surface)", borderRadius: "var(--radius-sm)" }} />
                  <div style={{ height: "36px", width: "240px", background: "var(--surface)", borderRadius: "var(--radius-sm)" }} />
                  <div style={{ height: "12px", width: "160px", background: "var(--surface)", borderRadius: "var(--radius-sm)" }} />
                  <div style={{ height: "60px", width: "100%", background: "var(--surface)", borderRadius: "var(--radius-sm)" }} />
                </div>
                <div style={{ aspectRatio: "16/10", background: "var(--surface)", borderRadius: "var(--radius-lg)" }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(4rem, 8vw, 8rem) 0",
        backgroundColor: "var(--background)",
        backgroundImage:
          "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
        backgroundPosition: "center",
      }}
    >
      <div style={{ maxWidth: "var(--container-max, 1440px)", margin: "0 auto", paddingInline: "var(--container-pad)" }}>
        {/* Header */}
        <div style={{ maxWidth: "48rem", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--muted)",
              border: "2px solid var(--muted)",
              padding: "6px 14px",
              borderRadius: "var(--radius-sm)",
              marginBottom: "16px",
            }}
          >
            Portfolio
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              color: "var(--foreground)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            My <span style={{ color: "var(--neo-yellow)", fontFamily: "var(--font-pixel)", fontWeight: 400, letterSpacing: "0.02em" }}>Work</span>
          </h2>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "10px 20px",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "3px solid #000000",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: isActive ? "#000000" : "var(--surface)",
                    color: isActive ? "#FFFFFF" : "var(--muted)",
                    boxShadow: isActive ? "4px 4px 0px #000000" : "3px 3px 0px #000000",
                    transform: isActive ? "translate(-2px, -2px)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Project List */}
        {displayProjects.length === 0 ? (
          <div style={{ padding: "6rem 0", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {displayProjects.map((project, index) => {
                  const number = String(index + 1).padStart(2, "0");
                  const isEven = index % 2 === 0;
                  const tools = project.tags?.length ? project.tags.join(", ") : "—";
                  const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";
                  const sourceLink = project.links?.source && project.links.source !== "#" ? project.links.source : "";

                  return (
                    <motion.div
                      key={project._id || index}
                      custom={index}
                      variants={CARD_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      onMouseEnter={() => setHoveredIdx(index)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        padding: "clamp(3rem, 5vw, 5rem) 0",
                        borderBottom: index < displayProjects.length - 1 ? "3px solid #000000" : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(12, 1fr)",
                          gap: "clamp(2rem, 4vw, 5rem)",
                          alignItems: "center",
                        }}
                      >
                        {/* Text Side */}
                        <div
                          style={{
                            gridColumn: isEven ? "1 / 6" : "8 / 13",
                            order: isEven ? 1 : 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                          }}
                        >
                          {/* Number */}
                          <span
                            style={{
                              fontFamily: "var(--font-pixel)",
                              fontSize: "clamp(3rem, 6vw, 5rem)",
                              fontWeight: 400,
                              lineHeight: 1,
                              color: "var(--foreground)",
                              opacity: 0.15,
                            }}
                          >
                            {number}
                          </span>

                          {/* Title */}
                          <div>
                            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                              Project Name
                            </p>
                            <h3
                              style={{
                                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                fontFamily: "var(--font-space-grotesk)",
                                fontWeight: 800,
                                color: "var(--foreground)",
                                lineHeight: 1.15,
                                margin: 0,
                              }}
                            >
                              {project.title}
                            </h3>
                          </div>

                          {/* Category + Stack */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div>
                              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "4px", fontFamily: "var(--font-mono)" }}>
                                Category
                              </p>
                              <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)", opacity: 0.7, margin: 0 }}>
                                {project.category || "—"}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "4px", fontFamily: "var(--font-mono)" }}>
                                Stack
                              </p>
                              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                                {tools}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "28rem", margin: 0 }}>
                            {project.desc}
                          </p>

                          {/* Buttons */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingTop: "16px" }}>
                            {liveLink && (
                              <a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                              >
                                <span>Live Preview</span>
                                <ArrowUpRight size={14} />
                              </a>
                            )}
                            {sourceLink && (
                              <a
                                href={sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                              >
                                <span>Source Code</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Image Side */}
                        <div
                          style={{
                            gridColumn: isEven ? "6 / 13" : "1 / 8",
                            order: isEven ? 2 : 1,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              background: "var(--surface-2)",
                              aspectRatio: "16/10",
                              border: "3px solid #000000",
                              boxShadow: hoveredIdx === index ? "9px 9px 0px #000000" : "6px 6px 0px #000000",
                              borderRadius: "var(--radius-lg)",
                              transform: hoveredIdx === index ? "translate(-3px, -3px)" : "none",
                              transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              priority={index === 0}
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              style={{
                                objectFit: "cover",
                                transform: hoveredIdx === index ? "scale(1.05)" : "scale(1)",
                                transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                              }}
                            />
                            {liveLink && (
                              <a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  position: "absolute",
                                  bottom: "12px",
                                  right: "12px",
                                  width: "48px",
                                  height: "48px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "var(--neo-yellow)",
                                  border: "3px solid #000000",
                                  boxShadow: "3px 3px 0px #000000",
                                  borderRadius: "var(--radius-md)",
                                  opacity: hoveredIdx === index ? 1 : 0,
                                  transform: hoveredIdx === index ? "scale(1)" : "scale(0.8)",
                                  transition: "all 0.3s",
                                  zIndex: 2,
                                }}
                              >
                                <ArrowUpRight size={20} color="#000000" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
