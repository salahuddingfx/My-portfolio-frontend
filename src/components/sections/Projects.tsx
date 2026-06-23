"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface WorkImageProps {
  image: string;
  alt: string;
  liveLink?: string;
  onLoad?: () => void;
  priority?: boolean;
}

const WorkImage = ({ image, alt, liveLink, onLoad, priority }: WorkImageProps) => {
  return (
    <div className="work-image">
      <div className="work-image-in">
        <div className="relative overflow-hidden bg-[var(--surface-2)] aspect-[16/10] border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]" style={{ borderRadius: "var(--radius-lg)" }}>
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            onLoad={onLoad}
          />
        </div>
        {liveLink && (
          <a href={liveLink} target="_blank" rel="noopener noreferrer">
            <div className="work-link">
              <ArrowUpRight className="text-[var(--foreground)]" size={24} />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

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

interface ProjectsProps {
  layout?: "horizontal" | "stacked";
  pageTopOffset?: boolean;
}

const Projects = ({ layout = "horizontal", pageTopOffset = false }: ProjectsProps) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCompact, setIsCompact] = useState(false);
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

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
        setTimeout(() => {
          if (typeof window !== "undefined") {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              ScrollTrigger.refresh();
            });
          }
        }, 100);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 1023px)");
    const onChange = (event: MediaQueryListEvent) => setIsCompact(event.matches);

    setIsCompact(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  const categories = useMemo(() => {
    const list = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const effectiveLayout = layout;

  const displayProjects = useMemo(() => {
    if (effectiveLayout === "horizontal") {
      const featured = projects.filter((p) => p.featured);
      return featured.length > 0 ? featured : projects;
    }
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory, effectiveLayout]);

  useEffect(() => {
    if (loading || displayProjects.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = connection?.saveData ?? false;
    if (reduceMotion || saveData) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (effectiveLayout === "horizontal") {
          const section = sectionRef.current;
          const track = trackRef.current;
          if (!section || !track) return;

          if (isCompact) return;

          const getTranslateX = () => {
            const boxes = track.querySelectorAll(".work-box");
            if (boxes.length === 0) return 0;
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            return Math.max(trackWidth - viewportWidth, 0);
          };

          // Animate project card boxes staggered reveal
          const boxes = track.querySelectorAll(".work-box");
          if (boxes.length > 0) {
            gsap.fromTo(
              boxes,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none none",
                }
              }
            );
          }

          gsap.fromTo(track,
            { x: 0 },
            {
              x: () => -getTranslateX(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: true,
                start: "top top",
                end: () => `+=${getTranslateX()}`,
                invalidateOnRefresh: true,
                id: "work-trigger",
                refreshPriority: 96,
              },
            }
          );

          return;
        }

        const rows = gsap.utils.toArray<HTMLElement>(".project-row");
        rows.forEach((row) => {
          const image = row.querySelector<HTMLElement>(".project-image");
          gsap.fromTo(
            row,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
              },
            }
          );

          if (image) {
            gsap.fromTo(
              image,
              { y: 24, scale: 1.03 },
              {
                y: -24,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                },
              }
            );
          }
        });
      }, sectionRef);
    };

    run();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [loading, displayProjects, effectiveLayout]);

  const projectRows = useMemo(() => {
    return displayProjects.map((project, index) => {
      const number = String(index + 1).padStart(2, "0");
      const isEven = index % 2 === 0;
      const tools = project.tags?.length ? project.tags.join(", ") : "—";
      const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";

      return (
        <div
          key={project._id || index}
          className={`project-row group ${index === 0 ? "" : "border-t-[3px] border-[#000000]"} py-12 md:py-20 lg:py-28`}
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
              <div
                className={`flex flex-col gap-6 lg:col-span-5 ${
                  isEven
                    ? "lg:order-1 lg:items-start lg:text-left"
                    : "lg:order-2 lg:items-end lg:text-right"
                }`}
              >
                <div
                  className={`text-6xl md:text-8xl font-pixel tracking-tight text-[var(--foreground)] opacity-80 ${
                    isEven ? "self-start" : "self-start lg:self-end"
                  }`}
                  aria-hidden
                >
                  {number}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">Project Name</p>
                    <h3
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">Category</p>
                    <p className="text-sm font-medium text-[var(--foreground)] opacity-70">
                      {project.category || "—"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">Stack</p>
                    <p className="text-sm text-[var(--foreground)] opacity-65 leading-relaxed">{tools}</p>
                  </div>

                  <p className="text-base text-[var(--muted)] leading-relaxed max-w-lg">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-8">
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
                    {project.links?.source && project.links.source !== "#" && (
                      <a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="relative overflow-hidden bg-[var(--surface-2)] aspect-[16/10] border-[3px] border-[#000000] shadow-[6px_6px_0px_#000000]" style={{ borderRadius: "var(--radius-lg)" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="project-image object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-[2px] ring-[#000000]" style={{ borderRadius: "var(--radius-lg)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [displayProjects]);

  const projectPanels = useMemo(() => {
    return displayProjects.map((project, index) => {
      const number = String(index + 1).padStart(2, "0");
      const tools = project.tags?.length ? project.tags.join(", ") : "—";
      const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";

      return (
        <div key={project._id || index} className="work-box">
          <div className="work-info">
            <div className="work-title">
              <h3>{number}</h3>
              <div>
                <h4 className="text-xl font-medium text-[var(--foreground)]">{project.title}</h4>
                <p className="text-sm text-[var(--muted)]">{project.category || "—"}</p>
              </div>
            </div>
            <h4 className="text-[var(--foreground)] font-semibold mb-1">Tools and features</h4>
            <p className="text-[var(--muted)]">{tools}</p>
            {project.desc && (
              <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed line-clamp-3 font-normal">
                {project.desc}
              </p>
            )}
            <div className="flex flex-wrap gap-3 mt-6">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !py-2.5 !px-4 !text-[10px]"
                >
                  <span>Live Preview</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {project.links?.source && project.links.source !== "#" && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-2.5 !px-4 !text-[10px]"
                >
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
          <WorkImage image={project.image} alt={project.title} liveLink={liveLink} onLoad={handleImageLoad} priority={index === 0} />
        </div>
      );
    });
  }, [displayProjects, handleImageLoad]);

  if (effectiveLayout === "horizontal") {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="work-section relative overflow-hidden"
      >
        <div className="work-container section-container w-full">
          <div className="container section-header-center mb-0">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="section-heading mt-2">
              My <span>Work</span>
            </h2>
          </div>

          {loading ? (
            <div className="work-track-wrapper">
              <div className="work-flex" ref={trackRef} style={{ width: "max-content" }}>
                {skeletonItems.map((i) => (
                  <div key={i} className="work-box">
                    <div className="work-info">
                      <div className="work-title">
                        <div className="skeleton h-12 w-16" />
                        <div>
                          <div className="skeleton h-6 w-32 mb-2" />
                          <div className="skeleton h-4 w-24" />
                        </div>
                      </div>
                      <div className="skeleton h-5 w-28 mb-2" />
                      <div className="skeleton h-4 w-full" />
                    </div>
                    <div className="skeleton aspect-[16/10] w-full" style={{ borderRadius: "var(--radius-lg)" }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="work-track-wrapper">
              <div
                ref={trackRef}
                className="work-flex"
                style={{ 
                  width: "max-content", 
                  willChange: "transform",
                }}
              >
                {projectPanels}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-shell relative overflow-hidden text-[var(--foreground)]"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage:
          "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Selected work</span>
          <h2 className="section-heading mt-2">
            Recent projects
          </h2>
          <p className="section-subtext mt-4">
            Modern digital products and visual systems shaped for clarity, impact, and storytelling.
          </p>
        </div>

        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-4 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border-[3px] border-[#000000] transition-all duration-200 ${
                  activeCategory === cat
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

      {loading ? (
        <div className="mt-20 space-y-12">
          {skeletonItems.map((i) => (
            <div key={i} className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-12">
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="skeleton h-16 w-32" />
                  <div className="space-y-4">
                    <div className="skeleton h-4 w-40" />
                    <div className="skeleton h-10 w-64" />
                  </div>
                  <div className="space-y-3">
                    <div className="skeleton h-3 w-44" />
                    <div className="skeleton h-3 w-32" />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="skeleton aspect-[16/10]" style={{ borderRadius: "var(--radius-lg)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayProjects.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-[var(--muted)] font-mono uppercase tracking-widest">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="mt-8">
          {projectRows}
        </div>
      )}
    </section>
  );
};

export default Projects;
