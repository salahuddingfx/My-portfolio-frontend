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

  const headerPaddingClass = pageTopOffset ? "pt-0" : "pt-24 md:pt-32";
  const sectionPaddingTop = pageTopOffset
    ? "calc(var(--navbar-height) + var(--space-8))"
    : undefined;

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
          className={`project-row group ${index === 0 ? "" : "border-t border-white/5"} py-16 md:py-24`}
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div
                className={`flex flex-col gap-6 lg:col-span-5 ${
                  isEven
                    ? "lg:order-1 lg:items-start lg:text-left"
                    : "lg:order-2 lg:items-end lg:text-right"
                }`}
              >
                <div
                  className={`text-[48px] sm:text-[64px] lg:text-[72px] font-medium tracking-[-0.02em] text-white/80 ${
                    isEven ? "self-start" : "self-start lg:self-end"
                  }`}
                  aria-hidden
                >
                  {number}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] text-white/40">Project Name</p>
                    <h3
                      className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium text-white leading-[1.1]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] text-white/40">Project Category</p>
                    <p className="text-sm text-white/70">
                      {project.category || "—"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] text-white/40">Tools & Features</p>
                    <p className="text-sm text-white/65">{tools}</p>
                  </div>

                  <p className="text-[15px] text-white/60 leading-[1.8]">
                    {project.desc}
                  </p>

                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
                    >
                      Live Preview
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div
                className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/2 aspect-16/10 lg:aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="project-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
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
          className="project-panel w-[85vw] sm:w-[75vw] lg:w-[70vw] shrink-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div
              className={`flex flex-col gap-6 lg:col-span-5 ${
                isEven
                  ? "lg:order-1 lg:items-start lg:text-left"
                  : "lg:order-2 lg:items-end lg:text-right"
              }`}
            >
              <div
                className={`text-[48px] sm:text-[64px] lg:text-[72px] font-medium tracking-[-0.02em] text-white/80 ${
                  isEven ? "self-start" : "self-start lg:self-end"
                }`}
                aria-hidden
              >
                {number}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs tracking-[0.18em] text-white/40">Project Name</p>
                  <h3
                    className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium text-white leading-[1.1]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-xs tracking-[0.18em] text-white/40">Project Category</p>
                  <p className="text-sm text-white/70">
                    {project.category || "—"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs tracking-[0.18em] text-white/40">Tools & Features</p>
                  <p className="text-sm text-white/65">{tools}</p>
                </div>

                <p className="text-[15px] text-white/60 leading-[1.8]">
                  {project.desc}
                </p>

                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
                  >
                    Live Preview
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
              <div className="relative overflow-hidden rounded-3xl bg-white/2 aspect-16/10 lg:aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="project-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
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
        className="relative overflow-hidden text-white min-h-[120vh]"
        style={{
          backgroundColor: "var(--background)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          backgroundPosition: "center",
        }}
      >
        <div className={`container ${headerPaddingClass}`}>
          <p className="text-sm text-white/60">Selected work</p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[46px] font-medium text-white mt-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projects
          </h2>
          <p className="text-[15px] text-white/55 mt-4 max-w-2xl">
            A curated set of case studies shaped by clarity, restraint, and strong visual systems.
          </p>
        </div>

        {loading ? (
          <div className="mt-20 md:mt-28 pb-28 md:pb-36">
            <div className="flex gap-16 md:gap-24 px-8 md:px-16 pr-[18vw] md:pr-[22vw]">
              {skeletonItems.map((i) => (
                <div key={i} className="project-panel w-[85vw] sm:w-[75vw] lg:w-[70vw] shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="flex flex-col gap-6 lg:col-span-5">
                      <div className="skeleton h-12 w-20" />
                      <div className="space-y-3">
                        <div className="skeleton h-4 w-32" />
                        <div className="skeleton h-7 w-52" />
                      </div>
                      <div className="space-y-2">
                        <div className="skeleton h-3 w-36" />
                        <div className="skeleton h-3 w-28" />
                      </div>
                      <div className="space-y-2">
                        <div className="skeleton h-3 w-40" />
                        <div className="skeleton h-3 w-56" />
                      </div>
                      <div className="space-y-3">
                        <div className="skeleton h-3 w-11/12" />
                        <div className="skeleton h-3 w-10/12" />
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="skeleton aspect-16/10 lg:aspect-video rounded-3xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-20 md:mt-28 pb-28 md:pb-36">
            <div
              ref={trackRef}
              className="flex gap-16 md:gap-24 px-8 md:px-16 pr-[18vw] md:pr-[22vw]"
              style={{ width: "max-content", willChange: "transform" }}
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
      className="relative overflow-hidden text-white"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "140px 140px",
        backgroundPosition: "center",
        paddingTop: sectionPaddingTop,
      }}
    >
      <div className={`container ${headerPaddingClass}`}>
        <div className="max-w-2xl">
          <p className="text-sm text-white/60">Selected work</p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[46px] font-medium text-white mt-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Recent projects
          </h2>
          <p className="text-[15px] text-white/55 mt-4">
            Modern digital products and visual systems shaped for clarity, impact, and storytelling.
          </p>
        </div>

        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-5 mt-10 text-sm text-white/55">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="mt-20 md:mt-28 pb-28 md:pb-36">
          {skeletonItems.map((i) => (
            <div key={i} className={`project-row ${i === 0 ? "" : "border-t border-white/5"} py-16 md:py-24`}>
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className="flex flex-col gap-6 lg:col-span-5">
                    <div className="skeleton h-12 w-20" />
                    <div className="space-y-3">
                      <div className="skeleton h-4 w-32" />
                      <div className="skeleton h-7 w-52" />
                    </div>
                    <div className="space-y-2">
                      <div className="skeleton h-3 w-36" />
                      <div className="skeleton h-3 w-28" />
                    </div>
                    <div className="space-y-2">
                      <div className="skeleton h-3 w-40" />
                      <div className="skeleton h-3 w-56" />
                    </div>
                    <div className="space-y-3">
                      <div className="skeleton h-3 w-11/12" />
                      <div className="skeleton h-3 w-10/12" />
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="skeleton aspect-16/10 lg:aspect-video rounded-3xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayProjects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-white/55">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="mt-20 md:mt-28 pb-28 md:pb-36">
          {projectRows}
        </div>
      )}
    </section>
  );
};

export default Projects;
