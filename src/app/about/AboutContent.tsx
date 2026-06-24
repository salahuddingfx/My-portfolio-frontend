"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase, Code, Award, Heart, Star, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrustedBy from "@/components/sections/TrustedBy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  code: Code,
  award: Award,
  heart: Heart,
  star: Star,
};

interface TimelineItem {
  _id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  order: number;
}

interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  year?: string;
  category: string;
  image: string;
  credentialUrl?: string;
  description?: string;
  order?: number;
}

const FALLBACK_CERTIFICATES: Certificate[] = [];

const PHILOSOPHY = [
  {
    title: "Design with intent",
    desc: "Every design decision should have a reason. I think about layout, hierarchy, and spacing before I think about color or effects.",
  },
  {
    title: "Code that lasts",
    desc: "I write code that's readable, maintainable, and easy to reason about. Clever is rarely better than clear.",
  },
  {
    title: "Collaboration matters",
    desc: "Good work happens through open communication. I ask questions, share progress early, and treat feedback as a gift.",
  },
];

const SKILL_GROUPS = [
  { label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"] },
  { label: "Backend",  skills: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel"] },
  { label: "Database", skills: ["MySQL", "PostgreSQL", "MongoDB", "Prisma"] },
  { label: "DevOps",   skills: ["Git", "Docker", "Vercel", "AWS", "Linux"] },
  { label: "Design",   skills: ["Figma", "Adobe XD", "Photoshop"] },
];

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowMobileRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [cvUrl, setCvUrl] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>(FALLBACK_CERTIFICATES);
  const [certLoading, setCertLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const list = certificates
      .map((cert) => cert.category)
      .filter((category): category is string => Boolean(category));
    return ["All", ...Array.from(new Set(list))];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    if (activeCategory === "All") return certificates;
    return certificates.filter((cert) => cert.category === activeCategory);
  }, [certificates, activeCategory]);

  useEffect(() => {
    if (activeCategory !== "All" && !categories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(`${apiUrl}/admin/timeline`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          setTimeline(data.sort((a: TimelineItem, b: TimelineItem) => a.order - b.order));
        }
      } catch {
        // keep empty
      } finally {
        setTimelineLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(`${apiUrl}/admin/settings`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.cvUrl) setCvUrl(data.cvUrl);
      } catch { /* ignore */ }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setCertificates(FALLBACK_CERTIFICATES);
          return;
        }
        const res = await fetch(`${apiUrl}/admin/certificates`);
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        if (Array.isArray(data)) {
          const sorted = data
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setCertificates(sorted);
        } else {
          setCertificates(FALLBACK_CERTIFICATES);
        }
      } catch {
        setCertificates(FALLBACK_CERTIFICATES);
      } finally {
        setCertLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    if (timelineLoading) return;
    const container = containerRef.current;
    const line = lineRef.current;
    const lineMobile = lineMobileRef.current;
    const glow = glowRef.current;
    const glowMobile = glowMobileRef.current;

    if (!container || !line || !lineMobile || !glow || !glowMobile) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;

          // Grow the lines
          gsap.set([line, lineMobile], { height: `${p * 100}%` });

          // Position glow at the tip of the line using percentage-based top
          gsap.set(glow, {
            top: `calc(${p * 100}% + 2px)`,
            opacity: p > 0.01 ? 1 : 0,
          });
          gsap.set(glowMobile, {
            top: `calc(${p * 100}% + 2px)`,
            opacity: p > 0.01 ? 1 : 0,
          });
        },
      });

      const animateItems = (variant: "desktop" | "mobile") => {
        const items = container.querySelectorAll<HTMLElement>(".timeline-item");

        items.forEach((item) => {
          const content = item.querySelector<HTMLElement>(
            `.timeline-content[data-variant="${variant}"]`
          );
          const badge = item.querySelector<HTMLElement>(
            `.timeline-badge[data-variant="${variant}"]`
          );
          const icon = badge?.querySelector<HTMLElement>(".timeline-icon");

          if (!badge || !icon || !content) return;

          const side = content.getAttribute("data-side") || "right";
          const offset = variant === "mobile" ? 24 : (side === "left" ? -60 : 60);

          // Start off-screen for scroll reveal
          gsap.set(content, { opacity: 0, x: offset, filter: "blur(0px)" });
          gsap.set(badge,   { opacity: 0.85, scale: 1 });
          gsap.set(icon,    { opacity: 0.85, scale: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end:   "bottom 15%",
              scrub: 1,
            }
          });

          // PHASE 1: ENTER (0.0 → 0.25)
          tl.to(content, {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          }, 0);

          tl.to(badge, {
            opacity: 1,
            scale: 1.08,
            borderColor: "var(--accent)",
            backgroundColor: "var(--surface)",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.45)",
            duration: 0.25,
            ease: "power1.out",
          }, 0);

          tl.to(icon, {
            opacity: 1,
            color: "var(--accent)",
            scale: 1.12,
            duration: 0.25,
            ease: "power1.out",
          }, 0);

          // PHASE 3: EXIT (0.75 → 1.0)
          tl.to(content, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power1.in",
          }, 0.75);

          tl.to(badge, {
            opacity: 0.85,
            scale: 1,
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-2)",
            boxShadow: "none",
            duration: 0.25,
            ease: "power1.in",
          }, 0.75);

          tl.to(icon, {
            opacity: 0.85,
            color: "var(--muted)",
            scale: 1,
            duration: 0.25,
            ease: "power1.in",
          }, 0.75);
        });
      };

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => animateItems("desktop"),
        "(max-width: 1023px)": () => animateItems("mobile"),
      });
    }, container);

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, [timelineLoading, timeline.length]);

  return (
    <main className="bg-[var(--background)]">

      {/* ── Page Hero ── */}
      <section className="section-shell pt-32">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Salah Uddin<br />Kader
              </h1>
              <p className="text-lg lg:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
                I am a Full Stack AI Engineer, Creative Developer, and secure Database Designer based in Cox&apos;s Bazar, Bangladesh.
                I build secure, highly interactive digital products with a strong
                focus on database performance, LLM integrations, and motion design.
              </p>
              <div className="flex gap-4 items-center flex-wrap">
                <Link href="/contact" className="btn-primary">
                  Get in touch
                  <ArrowRight size={15} />
                </Link>
                <Link href="/projects" className="btn-outline">
                  View my work
                </Link>
                {cvUrl && (
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    <Download size={13} /> Resume
                  </a>
                )}
              </div>
            </motion.div>
 
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)] border-[4px] border-[#000000] shadow-[8px_8px_0px_#000000] group" style={{ borderRadius: "var(--radius-lg)" }}>
                <Image
                  src="/CV-Images.png"
                  alt="Salah Uddin Kader"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-3 left-3 w-5 h-5 border-t-[2px] border-l-[2px] border-[var(--neo-yellow)]" style={{ borderRadius: "var(--radius-sm)" }} />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-[2px] border-r-[2px] border-[var(--neo-yellow)]" style={{ borderRadius: "var(--radius-sm)" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── Story ── */}
      <section className="section-shell bg-[var(--surface-2)] border-y-[4px] border-[#000000]">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="section-eyebrow">My story</span>
              <h2 className="section-heading mt-1">
                How I got here.
              </h2>
            </div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-8 flex flex-col gap-5"
            >
              <p className="text-base text-[var(--muted)] leading-relaxed">
                I started writing code in late 2024, initially just to understand how
                websites work. Within a few months, I was building my own
                projects — and I haven&apos;t stopped since. What began as
                curiosity became a craft I care deeply about.
              </p>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                Over the past 1.5 years, I&apos;ve worked across the full stack —
                from designing secure, relational database schemas (with solid protection against exploits like SQL Injection) to building interactive frontends and custom AI/LLM pipelines. I&apos;ve shipped products for startups, agencies, and
                individual clients, ensuring they are robust under load and secure.
              </p>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                Today, I work as a Full Stack AI Engineer, taking on complex projects where
                I can genuinely make a difference. I&apos;m drawn to work that
                challenges me technically — from training local models to designing secure, low-latency APIs and interactive user interfaces.
              </p>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                I&apos;m also the founder of{" "}
                <a
                  href="https://nextorastudio.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[var(--foreground)] underline decoration-[var(--neo-yellow)] decoration-2 underline-offset-4 hover:text-[var(--neo-yellow)] transition-colors"
                >
                  Nextora Studio
                </a>
                , a digital agency where we build software, websites, and provide graphic design and marketing services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trusted By / Partners ── */}
      <TrustedBy />

      {/* ── Experience Timeline ── */}
      <section className="section-shell bg-[var(--background)]">
        <div className="container">
          {/* Centered Section Header */}
          <div className="section-header-center">
            <span className="section-eyebrow">Experience</span>
            <h2 className="section-heading mt-1">
              My journey so far.
            </h2>
          </div>

          {/* Center-Split Timeline Container */}
          <div className="w-full max-w-5xl mx-auto relative">
            <div ref={containerRef} className="relative w-full flex flex-col gap-12 select-none">

              {/* ── DESKTOP TRACK (Centered) ── */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] -translate-x-1/2 hidden lg:block z-0" />
              <div
                ref={lineRef}
                className="absolute left-1/2 top-0 w-[2px] bg-[var(--accent)] origin-top -translate-x-1/2 hidden lg:block z-0"
                style={{ height: "0%" }}
              />
              <div
                ref={glowRef}
                className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-[var(--accent)] pointer-events-none opacity-0 z-20 hidden lg:block"
                style={{
                  boxShadow: "0 0 8px var(--accent), 0 0 18px var(--accent), 0 0 28px var(--accent)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* ── MOBILE TRACK (Left Aligned) ── */}
              <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[var(--border)] lg:hidden z-0" />
              <div
                ref={lineMobileRef}
                className="absolute left-5 top-0 w-[2px] bg-[var(--accent)] origin-top lg:hidden z-0"
                style={{ height: "0%" }}
              />
              <div
                ref={glowMobileRef}
                className="absolute left-5 top-0 w-3 h-3 rounded-full bg-[var(--accent)] pointer-events-none opacity-0 z-20 lg:hidden"
                style={{
                  boxShadow: "0 0 8px var(--accent), 0 0 18px var(--accent), 0 0 28px var(--accent)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {timelineLoading ? (
                <div className="py-16 text-center col-span-full">
                  <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading timeline...</p>
                </div>
              ) : timeline.length === 0 ? (
                <div className="card card-large text-center col-span-full">
                  <p className="text-sm text-[var(--muted)]">No timeline entries yet.</p>
                </div>
              ) : (
                timeline.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || GraduationCap;
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="timeline-item relative z-10 grid grid-cols-[2.5rem_1fr] gap-y-5 lg:grid-cols-[1fr_6rem_1fr] lg:gap-y-0"
                  >
                    {/* MOBILE LAYOUT */}
                    <div className="flex justify-center lg:hidden">
                      <div
                        data-variant="mobile"
                        className="timeline-badge flex h-10 w-10 items-center justify-center bg-[var(--surface)] border-[3px] border-[#000000] text-[var(--muted)] z-20 shadow-[3px_3px_0px_#000000]"
                        style={{ borderRadius: "var(--radius-md)" }}
                      >
                        <Icon size={14} className="timeline-icon" />
                      </div>
                    </div>
                    <div
                      data-variant="mobile"
                      data-side="right"
                      className="timeline-content lg:hidden flex flex-col gap-2 pl-4"
                    >
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                        {item.year}
                      </span>
                      <h3 className="text-[18px] leading-tight font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {item.title}
                      </h3>
                      <span className="text-xs text-[var(--foreground)] font-bold uppercase tracking-wider">
                        {item.subtitle}
                      </span>
                      <p className="text-[14px] text-[var(--muted)] leading-[1.75] mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* DESKTOP LAYOUT */}
                    {isEven ? (
                      <>
                        <div
                          data-variant="desktop"
                          data-side="left"
                          className="timeline-content hidden lg:flex flex-col gap-2 pr-12 text-right items-end"
                        >
                          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                            {item.year}
                          </span>
                          <h3 className="text-[22px] leading-tight font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            {item.title}
                          </h3>
                          <span className="text-xs text-[var(--foreground)] font-bold uppercase tracking-wider">
                            {item.subtitle}
                          </span>
                          <p className="text-[15px] text-[var(--muted)] leading-[1.8] mt-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="hidden lg:flex justify-center">
                          <div
                            data-variant="desktop"
                            className="timeline-badge flex h-14 w-14 items-center justify-center bg-[var(--surface)] border-[3px] border-[#000000] text-[var(--muted)] z-20 shadow-[4px_4px_0px_#000000]"
                            style={{ borderRadius: "var(--radius-md)" }}
                          >
                            <Icon size={18} className="timeline-icon" />
                          </div>
                        </div>
                        <div className="hidden lg:block" />
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block" />
                        <div className="hidden lg:flex justify-center">
                          <div
                            data-variant="desktop"
                            className="timeline-badge flex h-14 w-14 items-center justify-center bg-[var(--surface)] border-[3px] border-[#000000] text-[var(--muted)] z-20 shadow-[4px_4px_0px_#000000]"
                            style={{ borderRadius: "var(--radius-md)" }}
                          >
                            <Icon size={18} className="timeline-icon" />
                          </div>
                        </div>
                        <div
                          data-variant="desktop"
                          data-side="right"
                          className="timeline-content hidden lg:flex flex-col gap-2 pl-12 text-left items-start"
                        >
                          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                            {item.year}
                          </span>
                          <h3 className="text-[22px] leading-tight font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            {item.title}
                          </h3>
                          <span className="text-xs text-[var(--foreground)] font-bold uppercase tracking-wider">
                            {item.subtitle}
                          </span>
                          <p className="text-[15px] text-[var(--muted)] leading-[1.8] mt-2">
                            {item.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="section-shell bg-[var(--surface)] border-y-[4px] border-[#000000]">
        <div className="container">
          <div className="section-header-center mb-0">
            <span className="section-eyebrow">Philosophy</span>
            <h2 className="section-heading mt-1">
              How I think about work.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card card-hover"
              >
                <span className="text-xs font-mono text-[var(--muted-soft)] mb-4 block font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-extrabold text-[var(--foreground)] mb-3 uppercase tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="section-shell bg-[var(--background)]">
        <div className="container">
          <div className="section-header-center mb-0">
            <span className="section-eyebrow">Skills & tools</span>
            <h2 className="section-heading mt-1">
              What I work with.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {SKILL_GROUPS.map((group, i) => (
              <motion.div
                key={group.label}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-start gap-3"
              >
                <span className="text-xs font-mono text-[var(--muted-soft)] uppercase tracking-wider w-24 shrink-0 pt-1">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="badge">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="section-shell bg-[var(--surface-2)] border-y-[4px] border-[#000000]">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="section-eyebrow">Certificates</span>
              <h2 className="section-heading mt-1">
                Verified learning.
              </h2>
              <p className="section-subtext text-sm max-w-xl">
                Category wise certificates with quick details on hover.
              </p>
            </div>
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 py-2 text-[11px] font-mono uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none border-[3px] border-[#000000]"
                  style={{
                    color: activeCategory === category ? "#000000" : "var(--muted)",
                    backgroundColor: activeCategory === category ? "var(--neo-yellow)" : "var(--surface)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: activeCategory === category ? "3px 3px 0px #000000" : "2px 2px 0px #000000",
                  }}
                >
                  {activeCategory === category && (
                    <motion.span
                      layoutId="activeCertCategory"
                      className="absolute inset-0 bg-[var(--foreground)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          )}

          {certLoading ? (
            <div className="py-16 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading certificates...</p>
            </div>
          ) : filteredCertificates.length === 0 ? (
            <div className="card card-large text-center">
              <p className="text-sm text-[var(--muted)]">
                No certificates yet. Add them from the admin panel to showcase here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCertificates.map((cert) => (
                 <div
                  key={cert._id || `${cert.title}-${cert.issuer}`}
                  className="group relative overflow-hidden border-[3px] border-[#000000] bg-[var(--surface)] transition-all duration-200 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]"
                  style={{ borderRadius: "var(--radius-lg)" }}
                >
                  {/* Top Border Glow Line */}
                  <div className="absolute top-0 left-0 w-full h-[5px] bg-[var(--neo-yellow)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
                        {cert.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {cert.title}
                      </h3>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        {cert.issuer}{cert.year ? ` • ${cert.year}` : ""}
                      </p>
                      {cert.description && (
                        <p className="text-xs text-[var(--muted)] mt-3 line-clamp-3">
                          {cert.description}
                        </p>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white mt-4 hover:text-[var(--accent)] transition-colors"
                        >
                          View credential
                          <ArrowRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-shell bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="section-header-center"
          >
            <h2 className="section-heading mb-4 text-center">
              Want to build something together?
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md mb-8 text-center mx-auto">
              I&apos;m always open to hearing about new projects. If you have an
              idea or a problem you&apos;re trying to solve, let&apos;s talk.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
