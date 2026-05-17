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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.5,
        }
      });

      // Animate line height to 100% for both desktop and mobile lines
      tl.to([line, lineMobile], {
        height: "100%",
        ease: "none"
      }, 0);

      // Animate glowing comet tips to 100% and fade in for both desktop and mobile comets
      tl.to([glow, glowMobile], {
        top: "100%",
        opacity: 1,
        ease: "none"
      }, 0);

      const badges = container.querySelectorAll(".timeline-badge");
      const icons = container.querySelectorAll(".timeline-icon");
      const contents = container.querySelectorAll(".timeline-content");

      badges.forEach((badge, index) => {
        const progress = index / Math.max(badges.length - 1, 1);
        const icon = icons[index];
        
        // Light up the central/left badges as the line scrolls past them
        tl.to(badge, {
          borderColor: "var(--accent)",
          backgroundColor: "var(--surface)",
          boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
          scale: 1.1,
          duration: 0.05,
        }, progress * 0.95);

        // Turn the icon inside purple
        tl.to(icon, {
          color: "var(--accent)",
          scale: 1.15,
          duration: 0.05,
        }, progress * 0.95);

        // Fade in and clarify the blurry content blocks
        tl.to(contents[index], {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.15,
        }, progress * 0.95);
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
              className="lg:col-span-7"
            >
              <span className="section-eyebrow">About me</span>
              <h1 className="section-heading mt-1 mb-6">
                Full Stack Developer,<br />
                <span style={{ color: "var(--muted)" }}>based in Bangladesh.</span>
              </h1>
              <p className="text-base text-[var(--muted)] leading-relaxed max-w-lg">
                I build web applications that are fast, accessible, and
                genuinely good to use. I care as much about the code underneath
                as the experience on top.
              </p>
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
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">Experience</span>
            <h2 className="section-heading mt-1">
              Where I&apos;ve worked.
            </h2>
          </div>

          {/* Center-Split Timeline Container */}
          <div className="w-full max-w-4xl mx-auto relative">
            <div ref={containerRef} className="relative w-full flex flex-col gap-0 select-none">
              
              {/* DESKTOP TRACKS (Centered) */}
              <div className="absolute left-1/2 top-2 bottom-2 w-px bg-[var(--border)] -translate-x-1/2 hidden lg:block" />
              <div 
                ref={lineRef} 
                className="absolute left-1/2 top-2 w-[2px] bg-[var(--accent)] origin-top transform-gpu -translate-x-1/2 hidden lg:block" 
                style={{ height: '0%' }} 
              />
              <div 
                ref={glowRef} 
                className="absolute left-1/2 top-2 w-[8px] h-[8px] rounded-full bg-white pointer-events-none opacity-0 z-20"
                style={{
                  boxShadow: '0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* MOBILE TRACKS (Left Aligned) */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-[var(--border)] lg:hidden" />
              <div 
                ref={lineMobileRef} 
                className="absolute left-5 top-2 w-[2px] bg-[var(--accent)] origin-top lg:hidden" 
                style={{ height: '0%' }} 
              />
              <div 
                ref={glowMobileRef} 
                className="absolute left-5 top-2 w-[8px] h-[8px] rounded-full bg-white pointer-events-none opacity-0 z-20 lg:hidden"
                style={{
                  boxShadow: '0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                const isEven = i % 2 === 0;
                return (
                  <div 
                    key={i} 
                    className="relative w-full min-h-[100px] grid grid-cols-1 lg:grid-cols-2 mb-16 last:mb-0"
                  >
                    {/* Center / Left Rounded Square Badge */}
                    <div 
                      className="timeline-badge absolute left-5 lg:left-1/2 top-[24px] w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform-gpu"
                    >
                      <Icon size={16} className="timeline-icon transition-colors" />
                    </div>

                    {/* Responsive Alternating Card Content */}
                    <div 
                      className={`timeline-content flex flex-col gap-1 transition-all duration-500 transform-gpu opacity-30 pl-14 lg:pl-0 lg:col-span-1 
                        ${isEven 
                          ? 'lg:col-start-1 lg:pr-24 lg:text-right lg:items-end' 
                          : 'lg:col-start-2 lg:pl-24 lg:text-left lg:items-start'
                        }`}
                    >
                      <span className="text-xs font-mono text-[var(--muted-soft)]">
                        {item.year}
                      </span>
                      <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {item.role}
                      </h3>
                      <span className="text-xs text-[var(--accent)] font-medium">
                        {item.company}
                      </span>
                      <p className="text-sm text-[var(--muted)] leading-relaxed mt-2 max-w-md">
                        {item.desc}
                      </p>
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
