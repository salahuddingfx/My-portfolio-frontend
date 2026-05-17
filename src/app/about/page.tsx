"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE = [
  {
    year: "Late 2025 - Present",
    role: "Freelance Frontend Engineer",
    company: "Remote & Open Source",
    desc: "Building premium spatial editorial web experiences, focusing on performance, custom 3D mechanics, and GSAP motion frameworks for global clients.",
    icon: Terminal,
  },
  {
    year: "Early 2025",
    role: "Full Stack Web Developer",
    company: "SaaS & Interactive Apps",
    desc: "Mastered building robust database schemas and high-fidelity frontends, shipping complete applications with seamless backend API integrations.",
    icon: Sparkles,
  },
  {
    year: "Late 2024",
    role: "Began My Developer Journey",
    company: "Passion-Driven Learning",
    desc: "Started learning coding out of curiosity. Focused on modern React, styling systems, and interactive UI animations. Fell in love with craft and design.",
    icon: Compass,
  },
];

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

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const lineMobile = lineMobileRef.current;
    const glow = glowRef.current;
    const glowMobile = glowMobileRef.current;

    if (!container || !line || !lineMobile || !glow || !glowMobile) return;

    const ctx = gsap.context(() => {
      // ── Fix #5: Glow comet position fix ──
      // Instead of animating `top` to "100%", we animate a CSS variable
      // so the glow tracks the tip of the growing line correctly.
      // We use a proxy object and update the transform in onUpdate.

      const trackProxy = { progress: 0 };

      const updateGlowPosition = (glowEl: HTMLElement, lineEl: HTMLElement, progress: number) => {
        const lineHeight = lineEl.offsetHeight;
        // "progress" here is the ScrollTrigger progress (0→1).
        // But we want the glow at the *tip* of the line, which tracks
        // scrub progress too. We read lineEl's current scaleY via getBoundingClientRect.
        const rect = lineEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const tipY = rect.top - containerRect.top + rect.height;
        glowEl.style.transform = `translate(-50%, 0) translateY(${tipY}px)`;
      };

      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;

          // Grow the lines
          gsap.set([line, lineMobile], { height: `${p * 100}%` });

          // ── Fix #5 resolved: glow tracks line tip via height% ──
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

      // ── Fix #4: Per-card scroll animation with better timing ──
      // ── Fix #6: Set GSAP initial state BEFORE Tailwind class renders ──
      const items = container.querySelectorAll(".timeline-item");

      items.forEach((item) => {
        const badge = item.querySelector(".timeline-badge");
        const icon = item.querySelector(".timeline-icon");
        const content = item.querySelector(".timeline-content");

        if (!badge || !icon || !content) return;

        // ── Fix #6: Set initial opacity via GSAP immediately to prevent Tailwind flash ──
        gsap.set(content, { opacity: 0.55, scale: 0.98, filter: "blur(1px)" });
        gsap.set(badge,   { opacity: 0.6, scale: 0.95 });
        gsap.set(icon,    { opacity: 0.6, scale: 0.95 });

        // ── Fix #4: Use longer scrub range to prevent fast-scroll skip ──
        // start early (80%), end late (20%) = more time in viewport = reliable phasing
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",    // earlier entry
            end:   "bottom 15%", // later exit
            scrub: 1,            // slightly more lag = smoother
          }
        });

        // PHASE 1: ENTER (0.0 → 0.25)
        tl.to(content, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(168,85,247,0.12)",
          duration: 0.25,
          ease: "power1.out",
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

        // PHASE 2: HOLD (0.25 → 0.75) — no tweens, items stay highlighted

        // PHASE 3: EXIT (0.75 → 1.0)
        tl.to(content, {
          opacity: 0.55,
          scale: 0.98,
          filter: "blur(1px)",
          boxShadow: "none",
          duration: 0.25,
          ease: "power1.in",
        }, 0.75);

        tl.to(badge, {
          opacity: 0.6,
          scale: 0.95,
          borderColor: "var(--border)",
          backgroundColor: "var(--surface-2)",
          boxShadow: "none",
          duration: 0.25,
          ease: "power1.in",
        }, 0.75);

        tl.to(icon, {
          opacity: 0.6,
          color: "var(--muted)",
          scale: 1,
          duration: 0.25,
          ease: "power1.in",
        }, 0.75);
      });
    }, container);

    return () => ctx.revert();
  }, []);

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
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Salah Uddin<br />Kader
              </h1>
              <p className="text-lg lg:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
                I am a full stack web developer based in Chittagong, Bangladesh.
                I build clean, highly interactive digital products with a strong
                focus on UX craft and technical detail.
              </p>
              <div className="flex gap-4 items-center">
                <Link href="/contact" className="btn-primary">
                  Get in touch
                  <ArrowRight size={15} />
                </Link>
                <Link href="/projects" className="btn-secondary">
                  View my work
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border)] group">
                <Image
                  src="/mine-photo.png"
                  alt="Salah Uddin Kader"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/20 rounded-tl-sm" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/20 rounded-br-sm" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section-shell bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
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
                from designing database schemas to crafting pixel-perfect
                interfaces. I&apos;ve shipped products for startups, agencies, and
                individual clients, and every project has taught me something
                new.
              </p>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                Today, I work as a freelance developer, taking on projects where
                I can genuinely make a difference. I&apos;m drawn to work that
                challenges me technically while having a real impact for the
                people using it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience Timeline ── */}
      <section className="section-shell bg-[var(--background)]">
        <div className="container">
          {/* Centered Section Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="section-eyebrow">Experience</span>
            <h2 className="section-heading mt-1">
              Where I&apos;ve worked.
            </h2>
          </div>

          {/* Center-Split Timeline Container */}
          <div className="w-full max-w-4xl mx-auto relative">
            <div ref={containerRef} className="relative w-full flex flex-col gap-0 select-none">

              {/* ── DESKTOP TRACK (Centered) ── */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.07] -translate-x-1/2 hidden lg:block" />
              <div
                ref={lineRef}
                className="absolute left-1/2 top-0 w-[2px] bg-[var(--accent)] origin-top -translate-x-1/2 hidden lg:block"
                style={{ height: "0%" }}
              />
              {/* ── Fix #5: glow positioned at top-0, translateY driven by GSAP ── */}
              <div
                ref={glowRef}
                className="absolute left-1/2 top-0 w-[12px] h-[12px] rounded-full bg-white pointer-events-none opacity-0 z-20 hidden lg:block"
                style={{
                  boxShadow: "0 0 8px var(--accent), 0 0 18px var(--accent), 0 0 28px var(--accent)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* ── MOBILE TRACK (Left Aligned) ── */}
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/[0.07] lg:hidden" />
              <div
                ref={lineMobileRef}
                className="absolute left-8 top-0 w-[2px] bg-[var(--accent)] origin-top lg:hidden"
                style={{ height: "0%" }}
              />
              <div
                ref={glowMobileRef}
                className="absolute left-8 top-0 w-[12px] h-[12px] rounded-full bg-white pointer-events-none opacity-0 z-20 lg:hidden"
                style={{
                  boxShadow: "0 0 8px var(--accent), 0 0 18px var(--accent), 0 0 28px var(--accent)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="timeline-item relative w-full mb-16 lg:mb-24 last:mb-0"
                  >
                    {/* ── Fix #1 & #2: Separate mobile and desktop layouts ── */}

                    {/* MOBILE LAYOUT: simple left-offset card, badge on the left rail */}
                    <div className="lg:hidden flex items-start gap-0">
                      {/* Spacer for the left rail (badge sits on top via absolute) */}
                      <div className="w-16 shrink-0" />
                      {/* Card: full width, clear of the badge */}
                      <div className="timeline-content flex-1 min-w-0 flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 mr-2">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                          {item.year}
                        </span>
                        <h3 className="text-[18px] leading-tight font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.role}
                        </h3>
                        <span className="text-xs text-[var(--accent)] font-medium">
                          {item.company}
                        </span>
                        <p className="text-[14px] text-[var(--muted)] leading-[1.75] mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* DESKTOP LAYOUT: two-column alternating */}
                    <div className="hidden lg:grid lg:grid-cols-2 items-center min-h-[160px]">
                      {isEven ? (
                        <>
                          {/* Card on LEFT */}
                          <div className="timeline-content flex flex-col gap-2 rounded-[28px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-8 mr-12 text-right items-end">
                            <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                              {item.year}
                            </span>
                            <h3 className="text-[22px] leading-tight font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                              {item.role}
                            </h3>
                            <span className="text-xs text-[var(--accent)] font-medium">
                              {item.company}
                            </span>
                            <p className="text-[15px] text-[var(--muted)] leading-[1.8] mt-2">
                              {item.desc}
                            </p>
                          </div>
                          {/* Empty right col (badge is absolute center) */}
                          <div />
                        </>
                      ) : (
                        <>
                          {/* Empty left col */}
                          <div />
                          {/* Card on RIGHT */}
                          <div className="timeline-content flex flex-col gap-2 rounded-[28px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-8 ml-12 text-left items-start">
                            <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                              {item.year}
                            </span>
                            <h3 className="text-[22px] leading-tight font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                              {item.role}
                            </h3>
                            <span className="text-xs text-[var(--accent)] font-medium">
                              {item.company}
                            </span>
                            <p className="text-[15px] text-[var(--muted)] leading-[1.8] mt-2">
                              {item.desc}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ── Fix #2: Badge — absolute center on desktop, absolute left-rail on mobile ── */}
                    {/* Desktop badge: centered on the vertical axis between the two cols */}
                    <div
                      className="timeline-badge absolute left-1/2 top-1/2 w-14 h-14 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] items-center justify-center text-[var(--muted)] z-20 -translate-x-1/2 -translate-y-1/2 transform-gpu hidden lg:flex"
                    >
                      <Icon size={18} className="timeline-icon" />
                    </div>

                    {/* Mobile badge: sits on the left rail track at the top of the card */}
                    <div
                      className="timeline-badge absolute left-8 top-[1.25rem] w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] items-center justify-center text-[var(--muted)] z-20 -translate-x-1/2 transform-gpu flex lg:hidden"
                    >
                      <Icon size={14} className="timeline-icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="section-shell bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container">
          <div className="mb-12">
            <span className="section-eyebrow">Philosophy</span>
            <h2 className="section-heading mt-1">
              How I think about work.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card card-hover p-7"
              >
                <span className="text-xs font-mono text-[var(--muted-soft)] mb-4 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-white mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
          <div className="mb-12">
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

      {/* ── CTA ── */}
      <section className="section-shell bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="section-heading mb-4">
              Want to build something together?
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">
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
