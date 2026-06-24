"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Code } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

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

/* ─── Magnetic Card Wrapper ────────────────────────────────────── */
function MagneticCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        x: springX,
        y: springY,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─────────────────────────────────────────── */
function AnimatedNumber({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
      whileInView={{ opacity: 0.12, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "clamp(3.5rem, 8vw, 7rem)",
        fontWeight: 400,
        lineHeight: 1,
        color: "var(--foreground)",
        display: "block",
        userSelect: "none",
      }}
    >
      {value}
    </motion.span>
  );
}

/* ─── Stagger Container ────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

/* ─── Card Variants ────────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

const cardFromLeft = {
  hidden: { opacity: 0, x: -80, rotateY: -8, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const cardFromRight = {
  hidden: { opacity: 0, x: 80, rotateY: 8, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const imageReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease, delay: 0.15 },
  },
};

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const textItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const tagPop = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, ease },
  },
};

/* ─── Main Component ───────────────────────────────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) { setProjects(FALLBACK_PROJECTS); setLoading(false); return; }
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
    const featured = projects.filter((p) => p.featured);
    const pool = featured.length > 0 ? featured : projects.slice(0, 6);
    const list = pool.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const displayProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const pool = featured.length > 0 ? featured : projects.slice(0, 6);
    return activeCategory === "All"
      ? pool
      : pool.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  /* ─── Loading Skeleton ─────────────────────────────────────── */
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: "48px 0",
                borderBottom: i < 3 ? "3px solid #000000" : "none",
              }}
            >
              <div className="skeleton" style={{ height: "16px", width: "120px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="skeleton" style={{ height: "12px", width: "80px" }} />
                  <div className="skeleton" style={{ height: "36px", width: "240px" }} />
                  <div className="skeleton" style={{ height: "12px", width: "160px" }} />
                  <div className="skeleton" style={{ height: "60px", width: "100%" }} />
                </div>
                <div className="skeleton" style={{ aspectRatio: "16/10", borderRadius: "var(--radius-lg)" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  /* ─── Render ──────────────────────────────────────────────── */
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
      {/* ── Decorative corner accents ── */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem", width: "clamp(40px, 6vw, 80px)", height: "clamp(40px, 6vw, 80px)", borderTop: "3px solid var(--neo-yellow)", borderLeft: "3px solid var(--neo-yellow)", opacity: 0.2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "2rem", right: "2rem", width: "clamp(40px, 6vw, 80px)", height: "clamp(40px, 6vw, 80px)", borderBottom: "3px solid var(--neo-yellow)", borderRight: "3px solid var(--neo-yellow)", opacity: 0.2, pointerEvents: "none" }} />

      <div style={{ maxWidth: "var(--container-max, 1440px)", margin: "0 auto", paddingInline: "var(--container-pad)" }}>

        {/* ═══════ HEADER ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "48rem", marginBottom: "clamp(2rem, 5vw, 4rem)" }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-block",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#000000",
              background: "var(--neo-yellow)",
              padding: "6px 14px",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              borderRadius: "var(--radius-sm)",
              marginBottom: "16px",
            }}
          >
            Portfolio
          </motion.span>
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
            My{" "}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: "var(--neo-yellow)",
                fontFamily: "var(--font-pixel)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                display: "inline-block",
              }}
            >
              Work
            </motion.span>
          </h2>
        </motion.div>

        {/* ═══════ CATEGORY FILTERS ═══════ */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {categories.map((cat, i) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                    background: isActive ? "#000000" : "var(--surface)",
                    color: isActive ? "#FFFFFF" : "var(--muted)",
                    boxShadow: isActive ? "5px 5px 0px #000000" : "3px 3px 0px #000000",
                    transform: isActive ? "translate(-2px, -2px)" : "none",
                    transition: "background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#000000",
                        borderRadius: "var(--radius-md)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* ═══════ PROJECT CARDS ═══════ */}
        {displayProjects.length === 0 ? (
          <div style={{ padding: "6rem 0", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {displayProjects.map((project, index) => {
                const number = String(index + 1).padStart(2, "0");
                const isEven = index % 2 === 0;
                const tools = project.tags?.length ? project.tags.join(" · ") : "—";
                const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";
                const sourceLink = project.links?.source && project.links.source !== "#" ? project.links.source : "";
                const isHovered = hoveredIdx === index;

                return (
                  <MagneticCard key={project._id || index} index={index}>
                    <motion.div
                      variants={isEven ? cardFromLeft : cardFromRight}
                      onMouseEnter={() => setHoveredIdx(index)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        padding: "clamp(2rem, 4vw, 4rem) 0",
                        borderBottom: index < displayProjects.length - 1 ? "3px solid #000000" : "none",
                      }}
                    >
                      {/* ── Desktop Layout (≥768px): alternating sides ── */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(12, 1fr)",
                          gap: "clamp(1.5rem, 3vw, 4rem)",
                          alignItems: "center",
                        }}
                        className="projects-grid"
                      >
                        {/* TEXT SIDE */}
                        <motion.div
                          variants={textStagger}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-80px" }}
                          style={{
                            gridColumn: isEven ? "1 / 6" : "8 / 13",
                            order: isEven ? 1 : 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                          className="projects-text-side"
                        >
                          <AnimatedNumber value={number} />

                          <motion.div variants={textItem}>
                            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "6px", fontFamily: "var(--font-mono)", margin: 0 }}>
                              Project Name
                            </p>
                            <motion.h3
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                                fontFamily: "var(--font-space-grotesk)",
                                fontWeight: 800,
                                color: "var(--foreground)",
                                lineHeight: 1.15,
                                margin: "4px 0 0 0",
                              }}
                            >
                              {project.title}
                            </motion.h3>
                          </motion.div>

                          <motion.div variants={textItem} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div>
                              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "4px", fontFamily: "var(--font-mono)", margin: 0 }}>
                                Category
                              </p>
                              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", opacity: 0.7, margin: "2px 0 0 0" }}>
                                {project.category || "—"}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "4px", fontFamily: "var(--font-mono)", margin: 0 }}>
                                Stack
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                                {project.tags?.map((tag, ti) => (
                                  <motion.span
                                    key={tag}
                                    variants={tagPop}
                                    whileHover={{ scale: 1.08, y: -1 }}
                                    style={{
                                      fontSize: "11px",
                                      fontFamily: "var(--font-mono)",
                                      fontWeight: 700,
                                      letterSpacing: "0.04em",
                                      color: "#000000",
                                      background: ti % 3 === 0 ? "var(--neo-yellow)" : ti % 3 === 1 ? "var(--neo-cyan)" : "var(--neo-green)",
                                      padding: "3px 10px",
                                      border: "2px solid #000000",
                                      borderRadius: "var(--radius-sm)",
                                      boxShadow: "2px 2px 0px #000000",
                                      display: "inline-block",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>

                          <motion.p
                            variants={textItem}
                            style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "28rem", margin: 0 }}
                          >
                            {project.desc}
                          </motion.p>

                          <motion.div variants={textItem} style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingTop: "8px" }}>
                            {liveLink && (
                              <motion.a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, y: -2, boxShadow: "6px 6px 0px #000000" }}
                                whileTap={{ scale: 0.96, boxShadow: "1px 1px 0px #000000" }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "10px 20px",
                                  fontSize: "12px",
                                  fontFamily: "var(--font-mono)",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                  background: "#000000",
                                  color: "#FFFFFF",
                                  border: "3px solid #000000",
                                  borderRadius: "var(--radius-md)",
                                  boxShadow: "4px 4px 0px #000000",
                                  cursor: "pointer",
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                  transition: "background 0.2s, color 0.2s",
                                }}
                              >
                                <ExternalLink size={14} />
                                Live Preview
                              </motion.a>
                            )}
                            {sourceLink && (
                              <motion.a
                                href={sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, y: -2, boxShadow: "6px 6px 0px #000000", background: "var(--neo-yellow)", color: "#000000" }}
                                whileTap={{ scale: 0.96, boxShadow: "1px 1px 0px #000000" }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "10px 20px",
                                  fontSize: "12px",
                                  fontFamily: "var(--font-mono)",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                  background: "transparent",
                                  color: "var(--foreground)",
                                  border: "3px solid #000000",
                                  borderRadius: "var(--radius-md)",
                                  boxShadow: "4px 4px 0px #000000",
                                  cursor: "pointer",
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                  transition: "background 0.2s, color 0.2s",
                                }}
                              >
                                <Code size={14} />
                                Source
                              </motion.a>
                            )}
                          </motion.div>
                        </motion.div>

                        {/* IMAGE SIDE */}
                        <motion.div
                          variants={imageReveal}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.1 }}
                          style={{
                            gridColumn: isEven ? "6 / 13" : "1 / 8",
                            order: isEven ? 2 : 1,
                            position: "relative",
                          }}
                          className="projects-image-side"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              background: "var(--surface-2)",
                              aspectRatio: "16/10",
                              border: "3px solid #000000",
                              boxShadow: isHovered ? "10px 10px 0px #000000" : "6px 6px 0px #000000",
                              borderRadius: "var(--radius-lg)",
                              transform: isHovered ? "translate(-4px, -4px)" : "none",
                              transition: "box-shadow 0.4s, transform 0.4s",
                            }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              priority={index === 0}
                              sizes="(max-width: 768px) 100vw, 55vw"
                              style={{
                                objectFit: "cover",
                                transform: isHovered ? "scale(1.08)" : "scale(1)",
                                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                              }}
                            />

                            {/* Gradient overlay on hover */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: isHovered
                                  ? "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)"
                                  : "linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.3) 100%)",
                                transition: "background 0.5s",
                                pointerEvents: "none",
                              }}
                            />

                            {/* Floating number badge */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                              style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--neo-yellow)",
                                border: "3px solid #000000",
                                boxShadow: "3px 3px 0px #000000",
                                borderRadius: "var(--radius-md)",
                                fontFamily: "var(--font-pixel)",
                                fontSize: "16px",
                                fontWeight: 400,
                                color: "#000000",
                                zIndex: 3,
                              }}
                            >
                              {number}
                            </motion.div>

                            {/* Live link button on image */}
                            {liveLink && (
                              <motion.a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                                  zIndex: 3,
                                  cursor: "pointer",
                                }}
                              >
                                <ArrowUpRight size={22} color="#000000" />
                              </motion.a>
                            )}
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </MagneticCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ═══════ VIEW ALL CTA ═══════ */}
        {displayProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.04, y: -3, boxShadow: "8px 8px 0px #000000" }}
              whileTap={{ scale: 0.96, boxShadow: "2px 2px 0px #000000" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 32px",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "transparent",
                color: "var(--foreground)",
                border: "3px solid #000000",
                borderRadius: "var(--radius-md)",
                boxShadow: "5px 5px 0px #000000",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              View All Projects
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* ═══════ RESPONSIVE: Mobile overrides via inline <style> ═══════ */}
      <style>{`
        @media (max-width: 767px) {
          #projects .projects-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.25rem !important;
          }
          #projects .projects-text-side {
            order: 2 !important;
            grid-column: unset !important;
            gap: 14px !important;
          }
          #projects .projects-image-side {
            order: 1 !important;
            grid-column: unset !important;
            width: 100% !important;
          }
          #projects .projects-image-side > div {
            aspect-ratio: 16/10 !important;
          }
          #projects .projects-text-side h3 {
            font-size: 1.5rem !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #projects .projects-grid {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          #projects .projects-text-side {
            grid-column: span 5 !important;
          }
          #projects .projects-image-side {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
