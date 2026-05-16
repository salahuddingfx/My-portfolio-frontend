"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TIMELINE = [
  {
    year: "2024",
    role: "Senior Frontend Developer",
    company: "Freelance",
    desc: "Building high-quality web applications for international clients, focusing on performance and design.",
  },
  {
    year: "2023",
    role: "Full Stack Developer",
    company: "Tech Startup",
    desc: "Led development of a SaaS platform serving thousands of users. Managed the full stack from database design to UI.",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "Digital Agency",
    desc: "Created interactive web experiences for a variety of clients using React, GSAP, and modern CSS.",
  },
  {
    year: "2020",
    role: "Started coding",
    company: "Self-taught",
    desc: "Began learning web development out of curiosity. Built my first projects and never looked back.",
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
                I started writing code in 2020, initially just to understand how
                websites work. Within a few months, I was building my own
                projects — and I haven&apos;t stopped since. What began as
                curiosity became a craft I care deeply about.
              </p>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                Over the past four years, I&apos;ve worked across the full stack —
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
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="section-eyebrow">Experience</span>
              <h2 className="section-heading mt-1">
                Where I&apos;ve worked.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="relative flex flex-col gap-0">
                {/* Timeline line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)]" />

                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="relative pl-8 pb-10 last:pb-0"
                  >
                    {/* Dot */}
                    <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[var(--surface)] border border-[var(--border)]" />

                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-[var(--muted-soft)]">
                        {item.year}
                      </span>
                      <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {item.role}
                      </h3>
                      <span className="text-xs text-[var(--accent)]">
                        {item.company}
                      </span>
                      <p className="text-sm text-[var(--muted)] leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
