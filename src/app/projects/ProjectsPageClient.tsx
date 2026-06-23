"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Code, Eye, Layers, Sparkles, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  {
    title: "StudyFlow",
    desc: "A full-stack productivity and study-management application designed to help self-learners track progress, use Pomodoro timers, and build consistent study habits.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1200",
    tags: ["Vue.js", "Node.js", "Express", "MongoDB", "Socket.io"],
    links: { live: "https://github.com/salahuddingfx/Study-Flow", source: "https://github.com/salahuddingfx/Study-Flow" },
    category: "Full Stack",
    featured: true,
    order: 1
  },
  {
    title: "SalahUddin OS",
    desc: "A hyper-interactive, cinematic Operating System simulation running entirely in the browser, featuring custom terminal utilities, window management, desktop widgets, and live tool pipelines.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    links: { live: "https://github.com/salahuddingfx/MY-OS", source: "https://github.com/salahuddingfx/MY-OS" },
    category: "System Sim",
    featured: true,
    order: 2
  },
  {
    title: "Aether 3D Engine",
    desc: "A browser-based, mobile-first 3D interactive system built with Three.js that allows users to sculpt and manipulate digital matter using motion controls.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200",
    tags: ["HTML5", "Three.js", "JavaScript", "WebGL", "CSS3"],
    links: { live: "https://github.com/salahuddingfx/Gesture-System", source: "https://github.com/salahuddingfx/Gesture-System" },
    category: "Creative 3D",
    featured: true,
    order: 3
  },
  {
    title: "NoteSphere",
    desc: "A high-performance Academic Intelligence platform and note-sharing system designed for student resource indexing, search optimization, and academic collaboration.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: { live: "https://github.com/salahuddingfx/NoteSphere", source: "https://github.com/salahuddingfx/NoteSphere" },
    category: "Full Stack",
    featured: false,
    order: 4
  },
  {
    title: "Memory Master",
    desc: "A real-time multiplayer memory-matching game built with React and Socket.io, featuring a high-fidelity glassmorphism design and state synchronization.",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Node.js", "Express", "Socket.io", "Tailwind CSS"],
    links: { live: "https://github.com/salahuddingfx/Memory-Master", source: "https://github.com/salahuddingfx/Memory-Master" },
    category: "Game",
    featured: false,
    order: 5
  },
  {
    title: "Habit-OS",
    desc: "A next-generation AI-powered health tracking and habit management ecosystem built to optimize personal health metrics, exercise routines, and wellness targets.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    tags: ["Vue.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: { live: "https://github.com/salahuddingfx/Habit-OS", source: "https://github.com/salahuddingfx/Habit-OS" },
    category: "Full Stack",
    featured: false,
    order: 6
  },
];

const ProjectsPageClient = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch projects
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
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
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

  // 2. Derive categories
  const categories = useMemo(() => {
    const list = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  // 3. Filtered projects
  const displayProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // 4. Staggered header text animation
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const elements = headerRef.current?.querySelectorAll(".animate-fade-up");
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [loading]);

  // 5. Cinematic Scroll-Scrub Animation (Ease In from bottom, Ease Out to top)
  useEffect(() => {
    if (loading || displayProjects.length === 0) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const runAnimations = async () => {
      // Allow DOM to settle first
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (cancelled) return;

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // Kill any previous card triggers to prevent layout duplicates
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.startsWith("projects-page-card-")) {
          trigger.kill();
        }
      });

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
        cards.forEach((card, index) => {
          // 1. Entrance animation (ease-in from bottom) - Trigger-based (plays once)
          // This ensures that the cards are fully visible when they enter and stay visible
          // even if the page scroll height is too short to scrub them.
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%", // triggers near bottom of screen
                toggleActions: "play none none none",
                id: `projects-page-card-enter-${index}`,
              }
            }
          );

          // 2. Exit animation (ease-out at top) - Scrub-based
          // This provides a smooth fade-out as the card leaves the top of the viewport.
          gsap.fromTo(
            card,
            { opacity: 1, y: 0, scale: 1 },
            {
              opacity: 0,
              y: -80,
              scale: 0.95,
              ease: "power1.in",
              scrollTrigger: {
                trigger: card,
                start: "top 12%",  // starts exiting when top of card is near the top
                end: "top -12%",  // completes when it is scrolled further up
                scrub: 1,
                id: `projects-page-card-exit-${index}`,
              }
            }
          );
        });

        // Trigger refresh
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }, containerRef);
    };

    runAnimations();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [loading, displayProjects]);

  return (
    <section
      ref={containerRef}
      className="projects-page-hero min-h-screen text-[var(--foreground)]"
    >
      {/* Dynamic Header */}
      <div
        ref={headerRef}
        className="container pb-12"
        style={{ paddingTop: "clamp(120px, 10vw, 170px)" }}
      >
        <div className="max-w-4xl space-y-6">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 bg-[var(--neo-yellow)] border-[3px] border-[#000000] text-[#000000] text-[10px] font-bold uppercase tracking-widest font-mono shadow-[3px_3px_0px_#000000]" style={{ borderRadius: "var(--radius-sm)" }}>
            <Sparkles size={10} strokeWidth={2.5} />
            <span>Digital Archive</span>
          </div>
          <h1 className="animate-fade-up text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.95] font-space-grotesk uppercase">
            Creative <span className="text-[var(--neo-yellow)]">engineering</span><br />
            & interfaces.
          </h1>
          <p className="animate-fade-up text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-normal">
            A comprehensive look at web systems, dynamic 3D rendering pipelines, and production tools built with custom components and optimized logic.
          </p>
        </div>

        {/* Category Filters */}
        {!loading && categories.length > 1 && (
          <div className="animate-fade-up flex flex-wrap gap-4 mt-16 border-b-[3px] border-[#000000] pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (containerRef.current) {
                    containerRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                  // Quick refresh triggers to adapt offsets after scroll completes
                  setTimeout(() => {
                    ScrollTrigger.refresh();
                  }, 400);
                }}
                className={`px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-[3px] border-[#000000] transition-all duration-200 ${activeCategory === cat
                  ? "bg-[#000000] border-[#000000] text-[#FFFFFF] shadow-[4px_4px_0px_#000000] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--neo-yellow)] hover:text-[#000000] shadow-[3px_3px_0px_#000000]"
                  }`}
                style={{ borderRadius: "var(--radius-md)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="container pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 projects-grid-container">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`project-card-wrapper ${i % 2 === 0 ? "" : "md:translate-y-16"}`}
              >
                <div className="project-grid-card aspect-[4/5] opacity-50">
                  <div className="space-y-6 w-full">
                    <div className="skeleton h-4 w-28" />
                    <div className="skeleton aspect-[16/10] w-full rounded-2xl" />
                    <div className="skeleton h-8 w-2/3" />
                    <div className="skeleton h-16 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : displayProjects.length === 0 ? (
        <div className="container py-24 text-center">
          <div className="inline-flex items-center gap-2 text-[var(--muted)] text-sm font-mono uppercase tracking-widest">
            <AlertCircle size={16} />
            <span>No projects found in this category.</span>
          </div>
        </div>
      ) : (
        <div className="container pb-48 projects-grid-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {displayProjects.map((project, index) => {
              const number = String(index + 1).padStart(2, "0");
              const isEven = index % 2 === 0;
              const tools = project.tags?.length ? project.tags : [];
              const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";

              return (
                <div
                  key={project._id || index}
                  className={`project-card-wrapper ${isEven ? "" : "md:mt-16"}`}
                >
                  <div className="project-grid-card">

                    {/* Background Number */}
                    <div className="absolute right-8 top-6 text-8xl md:text-9xl font-bold font-mono text-[var(--foreground)] opacity-[0.02] pointer-events-none select-none group-hover:scale-105 group-hover:opacity-[0.04] transition-all duration-700">
                      {number}
                    </div>

                    <div className="space-y-6">
                      {/* Tag */}
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-[var(--neo-yellow)] border-[2px] border-[#000000]" style={{ borderRadius: "var(--radius-sm)" }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)]">
                          {project.category || "Development"}
                        </span>
                      </div>

                      {/* Mockup Frame */}
                      <div className="relative overflow-hidden aspect-[16/10] bg-[var(--surface-2)] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={index < 2}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 ring-[2px] ring-[#000000]" />
                      </div>

                      {/* Info */}
                      <div className="space-y-3">
                        <h3
                          className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight font-space-grotesk"
                        >
                          {project.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-4 min-h-[5rem]">
                          {project.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      {/* Tech stack */}
                      {tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tools.map((tag) => (
                            <span
                              key={tag}
                              className="badge text-[9px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {liveLink && (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary !py-2.5 !px-5 !text-[10px] gap-1.5 group/btn"
                          >
                            <Eye size={12} />
                            <span>Live Preview</span>
                            <ArrowUpRight size={10} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        )}
                        {project.links?.source && project.links.source !== "#" && (
                          <a
                            href={project.links.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !py-2.5 !px-5 !text-[10px] gap-1.5"
                          >
                            <Code size={12} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsPageClient;
