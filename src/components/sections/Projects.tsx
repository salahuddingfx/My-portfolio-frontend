"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
  { title: "Vortex OS", desc: "A cloud infrastructure dashboard with real-time telemetry and analytics.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", tags: ["React", "Three.js", "Node.js"], links: { live: "#", source: "#" }, category: "Full Stack", featured: true },
  { title: "Nexus Intelligence", desc: "An enterprise AI integration platform for automated logistics.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", tags: ["Next.js", "Python", "Redis"], links: { live: "#", source: "#" }, category: "AI/ML", featured: false },
  { title: "Aether Engine", desc: "A 3D rendering engine for the web with complex lighting and physics.", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200", tags: ["WebGL", "TypeScript", "WASM"], links: { live: "#", source: "#" }, category: "Engineering", featured: true },
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

  const effectiveLayout = layout === "horizontal" && !isCompact ? "horizontal" : "stacked";

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

          const getScrollAmount = () => {
            const base = track.scrollWidth - window.innerWidth;
            const buffer = window.innerWidth * 0.18;
            return Math.max(base + buffer, 1);
          };

          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
              invalidateOnRefresh: true,
            },
          });

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
          className={`project-row group ${index === 0 ? "" : "border-t border-[var(--border)]"} py-12 md:py-20 lg:py-28`}
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
                  className={`text-5xl md:text-7xl font-medium tracking-tight text-[var(--foreground)] opacity-80 ${
                    isEven ? "self-start" : "self-start lg:self-end"
                  }`}
                  aria-hidden
                >
                  {number}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Project Name</p>
                    <h3
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Category</p>
                    <p className="text-sm font-medium text-[var(--foreground)] opacity-70">
                      {project.category || "—"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Stack</p>
                    <p className="text-sm text-[var(--foreground)] opacity-65 leading-relaxed">{tools}</p>
                  </div>

                  <p className="text-base text-[var(--muted)] leading-relaxed max-w-lg">
                    {project.desc}
                  </p>

                  {liveLink && (
                    <div className="pt-8">
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-2)] aspect-[16/10] border border-[var(--border)] shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="project-image object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-[var(--border)]" />
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
      const isEven = index % 2 === 0;
      const tools = project.tags?.length ? project.tags.join(", ") : "—";
      const liveLink = project.links?.live && project.links.live !== "#" ? project.links.live : "";

      return (
        <div
          key={project._id || index}
          className="project-panel w-[85vw] sm:w-[75vw] lg:w-[65vw] shrink-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div
              className={`flex flex-col gap-6 lg:col-span-5 ${
                isEven
                  ? "lg:order-1 lg:items-start lg:text-left"
                  : "lg:order-1 lg:items-start lg:text-left" // Always left-align in horizontal panels for consistency
              }`}
            >
              <div
                className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--foreground)] opacity-20"
                aria-hidden
              >
                {number}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Project Name</p>
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Category</p>
                  <p className="text-sm font-medium text-[var(--foreground)] opacity-70">
                    {project.category || "—"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-60">Stack</p>
                  <p className="text-sm text-[var(--foreground)] opacity-65 leading-relaxed">{tools}</p>
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
                  {project.desc}
                </p>

                {liveLink && (
                  <div className="pt-2">
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--surface-2)] aspect-[16/10] border border-[var(--border)] shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="project-image object-cover transition-transform duration-1000 ease-out hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-[var(--border)]" />
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [displayProjects]);

  if (effectiveLayout === "horizontal") {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="section-shell relative overflow-hidden text-[var(--foreground)] min-h-screen flex flex-col justify-center"
        style={{
          backgroundColor: "var(--background)",
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          backgroundPosition: "center",
        }}
      >
        <div className="container mb-20">
          <span className="section-eyebrow">Selected work</span>
          <h2
            className="section-heading mt-2"
          >
            Projects
          </h2>
          <p className="section-subtext mt-4" style={{ marginBottom: "20px" }}>
            A curated set of case studies shaped by clarity, restraint, and strong visual systems.
          </p>
        </div>

        {loading ? (
          <div className="flex gap-16 md:gap-24 container overflow-hidden">
            {skeletonItems.map((i) => (
              <div key={i} className="project-panel w-[85vw] sm:w-[75vw] lg:w-[65vw] shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
                    <div className="space-y-4">
                      <div className="skeleton h-3 w-full" />
                      <div className="skeleton h-3 w-5/6" />
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="skeleton aspect-[16/10] rounded-[2.5rem]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div
              ref={trackRef}
              className="flex gap-20 md:gap-32 lg:gap-40 px-[container-padding] pr-[20vw]"
              style={{ 
                width: "max-content", 
                willChange: "transform",
                paddingLeft: "max(2rem, calc((100vw - var(--container-max)) / 2 + 2rem))" 
              }}
            >
              {projectPanels}
            </div>
          </div>
        )}
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
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20"
                    : "bg-[var(--nav-pill-bg)] border-[var(--border)] text-[var(--muted)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--foreground)]"
                }`}
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
                  <div className="skeleton aspect-[16/10] rounded-[2rem]" />
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
