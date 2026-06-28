"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Eye, ArrowLeft, Layers } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface ProjectItem {
  _id?: string;
  title: string;
  desc: string;
  image: string;
  mobileImage?: string;
  category: string;
  tags: string[];
  links: { live: string; source: string };
  order?: number;
  featured?: boolean;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  { title: "CoxIan TechForce", desc: "Developer community, technical workshop index, and open-source collaboration hub tailored for tech students and enthusiasts in Cox's Bazar.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649982/portfolio/screenshots/techforge_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649988/portfolio/screenshots/techforge_mobile.png", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://cmpitechforge.dev", source: "https://github.com/salahuddingfx/TechForge" }, category: "Community", featured: true, order: 1 },
  { title: "StudyFlow", desc: "A full-stack productivity and study-management application designed to help self-learners track progress, use Pomodoro timers, and build consistent study habits.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649913/portfolio/screenshots/studyflow_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649916/portfolio/screenshots/studyflow_mobile.png", tags: ["Vue.js", "Node.js", "Express", "MongoDB", "Socket.io"], links: { live: "https://studyflow.salahuddin.codes", source: "https://github.com/salahuddingfx/Study-Flow" }, category: "Productivity", featured: true, order: 2 },
  { title: "NoteSphere", desc: "A high-performance Academic Intelligence platform and note-sharing system designed for student resource indexing, search optimization, and academic collaboration.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649812/portfolio/screenshots/notespher_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649820/portfolio/screenshots/notespher_mobile.png", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://notesphere.salahuddin.codes", source: "https://github.com/salahuddingfx/NoteSphere" }, category: "Education", featured: true, order: 3 },
  { title: "Acharu", desc: "Premium e-commerce platform for Cox's Bazar specialty foods - chocolate, achar, nuts, and authentic Burmese items.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649682/portfolio/screenshots/acharu_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649697/portfolio/screenshots/acharu_mobile.png", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://acharu.com", source: "https://github.com/salahuddingfx/acharu" }, category: "E-Commerce", featured: true, order: 4 },
  { title: "Taja Shutki", desc: "Seafood distribution and premium dry-fish e-commerce marketplace connecting local fishermen of Cox's Bazar directly with consumers.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649949/portfolio/screenshots/tajashutki_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649965/portfolio/screenshots/tajashutki_mobile.png", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://tajashutki.com", source: "https://github.com/salahuddingfx/tajashutki" }, category: "E-Commerce", featured: true, order: 5 },
  { title: "DPIAN Alumni", desc: "Official alumni connectivity portal and student network hub built for Cox's Bazar Model Polytechnic Institute graduates.", image: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649745/portfolio/screenshots/alumni_desktop.png", mobileImage: "https://res.cloudinary.com/dytwxf6ip/image/upload/v1782649756/portfolio/screenshots/alumni_mobile.png", tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"], links: { live: "https://alumni.salahuddin.codes", source: "https://github.com/salahuddingfx/alumni" }, category: "Web Platform", featured: true, order: 6 },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Hero Card ────────────────────────────────────────────────── */
function HeroCard({ project, index }: { project: ProjectItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const number = String(index + 1).padStart(2, "0");
  const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";
  const sourceLink = project.links?.source && project.links.source !== "#" ? project.links.source : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
      transition={{ duration: 0.9, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        background: "var(--surface)",
        border: "3px solid #000000",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: hovered ? "12px 12px 0px #000000" : "6px 6px 0px #000000",
        transform: hovered ? "translate(-4px, -4px)" : "none",
        transition: "box-shadow 0.4s, transform 0.4s",
        cursor: "default",
      }}
      className="hero-project-card"
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", background: "var(--surface-2)" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }} />
        
        {/* Floating Mobile mockup overlay */}
        {(project.mobileImage || project.image) && (
          <motion.div
            animate={hovered ? {
              y: -8,
              rotate: -3,
              scale: 1.05,
            } : {
              y: 0,
              rotate: -1,
              scale: 1,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "40px",
              width: "14%",
              minWidth: "75px",
              maxWidth: "120px",
              aspectRatio: "9/19.5",
              background: "#000000",
              border: "3px solid #000000",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: hovered ? "5px 10px 20px rgba(0,0,0,0.4)" : "3px 3px 0px #000000",
              zIndex: 5,
              transition: "box-shadow 0.4s",
            }}
          >
            {/* Notch */}
            <div style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "8px",
              background: "#000000",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
              zIndex: 12,
            }} />
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={project.mobileImage || project.image}
                alt={`${project.title} Mobile`}
                fill
                sizes="15vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        )}

        {/* Number badge */}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          width: "48px", height: "48px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--neo-yellow)", border: "3px solid #000000",
          boxShadow: "3px 3px 0px #000000", borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-pixel)", fontSize: "18px", color: "#000000", zIndex: 3,
        }}>
          {number}
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: "absolute", top: "16px", right: "16px",
            padding: "6px 14px", background: "var(--neo-yellow)",
            border: "2px solid #000000", borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em", color: "#000000", zIndex: 3,
          }}>
            Featured
          </div>
        )}
        {/* Bottom info overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          zIndex: 3,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ width: "8px", height: "8px", background: "var(--neo-yellow)", border: "2px solid #000000", borderRadius: "var(--radius-sm)" }} />
            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#FFFFFF" }}>
              {project.category}
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "var(--font-space-grotesk)",
            fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, margin: 0,
          }}>
            {project.title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags?.map((tag, ti) => (
            <span key={tag} style={{
              fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700,
              letterSpacing: "0.04em", color: "#000000",
              background: ti % 3 === 0 ? "var(--neo-yellow)" : ti % 3 === 1 ? "var(--neo-cyan)" : "var(--neo-green)",
              padding: "4px 12px", border: "2px solid #000000", borderRadius: "var(--radius-sm)",
              boxShadow: "2px 2px 0px #000000",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "4px" }}>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ gap: "8px" }}>
              <Eye size={14} />
              <span>Live Preview</span>
              <ArrowUpRight size={12} />
            </a>
          )}
          {sourceLink && (
            <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ gap: "8px" }}>
              <Code size={14} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Grid Card ────────────────────────────────────────────────── */
function GridCard({ project, index }: { project: ProjectItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const number = String(index + 1).padStart(2, "0");
  const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";
  const sourceLink = project.links?.source && project.links.source !== "#" ? project.links.source : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease, delay: (index % 6) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "3px solid #000000",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: hovered ? "10px 10px 0px #000000" : "5px 5px 0px #000000",
        transform: hovered ? "translate(-3px, -3px)" : "none",
        transition: "box-shadow 0.4s, transform 0.4s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10", background: "var(--surface-2)" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.2) 100%)",
          transition: "background 0.5s",
          pointerEvents: "none",
        }} />

        {/* Floating Mobile mockup overlay */}
        {(project.mobileImage || project.image) && (
          <motion.div
            animate={hovered ? {
              y: -5,
              rotate: 3,
              scale: 1.05,
            } : {
              y: 0,
              rotate: 1,
              scale: 1,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "15px",
              width: "18%",
              minWidth: "55px",
              maxWidth: "85px",
              aspectRatio: "9/19.5",
              background: "#000000",
              border: "2px solid #000000",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: hovered ? "4px 8px 15px rgba(0,0,0,0.3)" : "2px 2px 0px #000000",
              zIndex: 5,
              transition: "box-shadow 0.4s",
            }}
          >
            {/* Notch */}
            <div style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "6px",
              background: "#000000",
              borderBottomLeftRadius: "3px",
              borderBottomRightRadius: "3px",
              zIndex: 12,
            }} />
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={project.mobileImage || project.image}
                alt={`${project.title} Mobile`}
                fill
                sizes="10vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        )}

        {/* Number */}
        <div style={{
          position: "absolute", top: "10px", left: "10px",
          width: "36px", height: "36px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--neo-yellow)", border: "2px solid #000000",
          boxShadow: "2px 2px 0px #000000", borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-pixel)", fontSize: "14px", color: "#000000", zIndex: 3,
        }}>
          {number}
        </div>
        {/* Live link floating */}
        {liveLink && (
          <motion.a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", bottom: "10px", right: "10px",
              width: "42px", height: "42px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--neo-yellow)", border: "3px solid #000000",
              boxShadow: "3px 3px 0px #000000", borderRadius: "var(--radius-md)",
              zIndex: 3, cursor: "pointer",
            }}
          >
            <ArrowUpRight size={18} color="#000000" />
          </motion.a>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(1rem, 2vw, 1.5rem)", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", background: "var(--neo-yellow)", border: "1.5px solid #000000", borderRadius: "2px" }} />
          <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)" }}>
            {project.category}
          </span>
          {project.featured && (
            <span style={{
              fontSize: "8px", fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "#000000", background: "var(--neo-green)",
              padding: "2px 8px", border: "1.5px solid #000000", borderRadius: "2px",
            }}>
              Featured
            </span>
          )}
        </div>

        <h3 style={{
          fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontFamily: "var(--font-space-grotesk)",
          fontWeight: 800, color: "var(--foreground)", lineHeight: 1.15, margin: 0,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: "13px", color: "var(--muted)", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
          overflow: "hidden", margin: 0, flex: 1,
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {project.tags?.slice(0, 4).map((tag) => (
            <span key={tag} style={{
              fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 700,
              letterSpacing: "0.04em", color: "#000000",
              background: "var(--surface-2)", padding: "3px 8px",
              border: "1.5px solid #000000", borderRadius: "2px",
            }}>
              {tag}
            </span>
          ))}
          {(project.tags?.length ?? 0) > 4 && (
            <span style={{
              fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 700,
              color: "var(--muted)", padding: "3px 6px",
            }}>
              +{(project.tags?.length ?? 0) - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "8px 14px", height: "auto", fontSize: "10px", gap: "6px" }}>
              <Eye size={12} />
              <span>Live</span>
            </a>
          )}
          {sourceLink && (
            <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "8px 14px", height: "auto", fontSize: "10px", gap: "6px" }}>
              <Code size={12} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ────────────────────────────────────────────────── */
const ProjectsPageClient = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

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
    const list = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const displayProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section style={{
      minHeight: "100vh",
      color: "var(--foreground)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ═══════ HEADER ═══════ */}
      <div ref={headerRef} style={{
        maxWidth: "var(--container-max, 1440px)",
        margin: "0 auto",
        paddingInline: "var(--container-pad)",
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(2rem, 4vw, 3rem)",
      }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--muted)", textDecoration: "none",
            padding: "8px 16px", border: "2px solid var(--muted)",
            borderRadius: "var(--radius-md)",
            transition: "all 0.2s",
          }}>
            <ArrowLeft size={14} />
            Back Home
          </Link>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", background: "var(--neo-yellow)",
            border: "2px solid #000000", boxShadow: "3px 3px 0px #000000",
            borderRadius: "var(--radius-sm)", marginBottom: "20px",
          }}
        >
          <Layers size={10} strokeWidth={2.5} color="#000000" />
          <span style={{
            fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.15em", color: "#000000",
          }}>
            Digital Archive
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "var(--font-space-grotesk)",
            fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em",
            color: "var(--foreground)", margin: "0 0 16px 0",
          }}
        >
          Creative{" "}
          <span style={{
            color: "var(--neo-yellow)", fontFamily: "var(--font-pixel)",
            fontWeight: 400, letterSpacing: "0.02em",
          }}>
            engineering
          </span>
          <br />
          & interfaces.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          style={{
            fontSize: "clamp(14px, 1.5vw, 17px)", color: "var(--muted)",
            lineHeight: 1.7, maxWidth: "36rem", margin: 0,
          }}
        >
          A comprehensive look at web systems, dynamic 3D rendering pipelines,
          and production tools built with custom components and optimized logic.
        </motion.p>

        {/* ═══════ FILTERS ═══════ */}
        {!loading && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            style={{
              display: "flex", flexWrap: "wrap", gap: "8px",
              marginTop: "clamp(2rem, 4vw, 3rem)",
              paddingBottom: "clamp(1.5rem, 3vw, 2rem)",
              borderBottom: "3px solid #000000",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "10px 18px", fontSize: "11px",
                    fontFamily: "var(--font-mono)", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    border: "3px solid #000000", borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    background: isActive ? "#000000" : "var(--surface)",
                    color: isActive ? "#FFFFFF" : "var(--muted)",
                    boxShadow: isActive ? "5px 5px 0px #000000" : "3px 3px 0px #000000",
                    transform: isActive ? "translate(-2px, -2px)" : "none",
                    transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s",
                  }}
                >
                  {cat}
                  <span style={{
                    fontSize: "9px", padding: "2px 6px",
                    background: isActive ? "rgba(255,255,255,0.15)" : "var(--surface-2)",
                    border: "1.5px solid #000000", borderRadius: "2px",
                    fontFamily: "var(--font-mono)", fontWeight: 700,
                  }}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ═══════ CONTENT ═══════ */}
      <div style={{
        maxWidth: "var(--container-max, 1440px)",
        margin: "0 auto",
        paddingInline: "var(--container-pad)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
      }}>
        {loading ? (
          /* ─── Skeleton ─── */
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 4vw, 3rem)" }}>
            {/* Hero skeleton */}
            <div className="skeleton" style={{ aspectRatio: "16/9", borderRadius: "var(--radius-lg)", width: "100%" }} />
            {/* Grid skeleton */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }} />
              ))}
            </div>
          </div>
        ) : displayProjects.length === 0 ? (
          <div style={{ padding: "6rem 0", textAlign: "center" }}>
            <p style={{
              fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-mono)",
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Card (first project) */}
              {displayProjects[0] && (
                <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
                  <HeroCard project={displayProjects[0]} index={0} />
                </div>
              )}

              {/* Grid (remaining projects) */}
              {displayProjects.length > 1 && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
                  gap: "clamp(1rem, 2vw, 1.5rem)",
                }}>
                  {displayProjects.slice(1).map((project, i) => (
                    <GridCard key={project._id || i} project={project} index={i + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ═══════ RESPONSIVE ═══════ */}
      <style>{`
        @media (max-width: 767px) {
          .hero-project-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsPageClient;
