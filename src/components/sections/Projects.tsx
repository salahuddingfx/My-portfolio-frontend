"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
  { title: "Vortex OS", desc: "A cloud infrastructure dashboard with real-time telemetry and analytics.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", tags: ["React", "Three.js", "Node.js"], links: { live: "#", source: "#" }, category: "Full Stack", featured: true },
  { title: "Nexus Intelligence", desc: "An enterprise AI integration platform for automated logistics.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", tags: ["Next.js", "Python", "Redis"], links: { live: "#", source: "#" }, category: "AI/ML", featured: false },
  { title: "Aether Engine", desc: "A 3D rendering engine for the web with complex lighting and physics.", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200", tags: ["WebGL", "TypeScript", "WASM"], links: { live: "#", source: "#" }, category: "Engineering", featured: true },
];

interface ProjectsProps {
  layout?: "horizontal" | "stacked";
}

const Projects = ({ layout = "horizontal" }: ProjectsProps) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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

  const categories = useMemo(() => {
    const list = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const displayProjects = useMemo(() => {
    if (layout === "horizontal") {
      const featured = projects.filter((p) => p.featured);
      return featured.length > 0 ? featured : projects;
    }
    // stacked layout uses category filters
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory, layout]);

  // GSAP horizontal scroll triggers only when layout is horizontal
  useEffect(() => {
    if (layout !== "horizontal" || loading || displayProjects.length === 0) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Keep 80px extra padding
        return -(trackWidth - viewportWidth + 80);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [layout, loading, displayProjects]);

  if (layout === "horizontal") {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="relative bg-[var(--background)] border-y border-[var(--border)] overflow-hidden flex flex-col justify-center min-h-screen py-24"
      >
        <div className="container px-8 md:px-16" style={{ marginBottom: "3rem" }}>
          <span className="section-eyebrow">Featured Showcase</span>
          <h2 className="section-heading mt-1">Highlighted work.</h2>
          <p className="section-subtext mt-4">
            A horizontal gallery of selected projects engineered to solve complex problems.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading projects...</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden relative">
            <div
              ref={trackRef}
              className="flex gap-8 px-8 md:px-16 flex-nowrap shrink-0"
              style={{ width: "max-content", willChange: "transform" }}
            >
              {displayProjects.map((project, i) => (
                <div
                  key={project._id || i}
                  className="relative w-[280px] sm:w-[420px] md:w-[500px] shrink-0 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500 shadow-2xl group flex flex-col justify-between"
                >
                  <Link
                    href={`/projects/${project._id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View details for ${project.title}`}
                  />

                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden w-full shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-all duration-700 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content container */}
                  <div className="p-6 sm:p-8 flex flex-col gap-4 flex-grow justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--muted-soft)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {project.category && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full border border-[var(--accent)]/20">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-semibold text-white leading-tight"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="badge">{tag}</span>
                        ))}
                      </div>

                      <div className="flex gap-5 pt-4 border-t border-[var(--border)] relative z-20">
                        <a
                          href={project.links?.live || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[var(--accent)] transition-colors duration-200"
                        >
                          Live Preview
                          <ArrowUpRight size={13} />
                        </a>
                        <a
                          href={project.links?.source || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-white transition-colors duration-200"
                        >
                          Source Code
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  // Stacked Overlapping Cards Layout (Dedicated Projects page)
  return (
    <section id="projects" className="relative bg-[var(--background)] border-y border-[var(--border)]">
      <div style={{ paddingTop: "95px", paddingBottom: "6rem" }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: "4rem" }}>
            <span className="section-eyebrow">Selected work</span>
            <h2 className="section-heading mt-1">Recent projects.</h2>
            <p className="section-subtext mx-auto mt-4">
              A few things I&apos;ve built recently — each one solving a real problem.
            </p>
          </div>

          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2" style={{ marginBottom: "3rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-all ${
                    activeCategory === cat
                      ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--border-hover)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading projects...</p>
            </div>
          ) : displayProjects.length === 0 ? (
            <div className="card p-10 text-center max-w-md mx-auto">
              <p className="text-sm text-[var(--muted)]">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="relative" style={{ paddingBottom: "40vh" }}>
              {displayProjects.map((project, i) => (
                <div
                  key={project._id || i}
                  className="sticky block"
                  style={{
                    top: `${100 + i * 40}px`,
                    zIndex: i + 1,
                    marginBottom: i < displayProjects.length - 1 ? "10vh" : "0",
                  }}
                >
                  <div
                    className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500 shadow-2xl group"
                  >
                    <Link
                      href={`/projects/${project._id}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View details for ${project.title}`}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-all duration-700 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="lg:col-span-5 flex flex-col justify-center gap-4 p-6 lg:p-8">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-[var(--muted-soft)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {project.category && (
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full border border-[var(--accent)]/20">
                              {project.category}
                            </span>
                          )}
                        </div>

                        <h3
                          className="text-2xl font-semibold text-white leading-tight"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {project.title}
                        </h3>

                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.slice(0, 4).map((tag: string) => (
                            <span key={tag} className="badge">{tag}</span>
                          ))}
                        </div>

                        <div className="flex gap-5 pt-4 border-t border-[var(--border)] relative z-20">
                          <a
                            href={project.links?.live || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[var(--accent)] transition-colors duration-200"
                          >
                            Live Preview
                            <ArrowUpRight size={13} />
                          </a>
                          <a
                            href={project.links?.source || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-white transition-colors duration-200"
                          >
                            Source Code
                            <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
