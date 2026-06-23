"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const About = () => {
  const { settings } = useSettings();
  const portraitRef = useRef<HTMLDivElement>(null);
  // rAF handle — batches layout reads to avoid forced synchronous reflows
  const rafId = useRef<number | null>(null);

  const stats = [
    { value: settings?.projectsCompleted || "50+", label: "Projects completed" },
    { value: settings?.experienceYears || "4+", label: "Years of experience" },
  ];

  return (
    <section id="about" className="section-shell bg-[var(--background)]">
      <div className="container">

        {/* Centered Header */}
        <motion.div 
          {...fadeUp}
          className="section-header-center"
        >
          <span className="section-eyebrow mb-4 block">About me</span>
          <h2 className="section-heading text-5xl md:text-7xl mt-2 leading-tight">
            {settings?.aboutTitle || "I craft digital experiences."}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-start">
          {/* Text content */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 flex flex-col gap-10 order-2 lg:order-1"
          >

            <div className="space-y-6">
              <p className="text-[var(--foreground)] text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                {settings?.bio || "I'm Salah Uddin Kader, widely known as Saka Chowdhury (salahuddingfx) — a Full Stack AI Engineer, Creative Developer, and Database Designer based in Cox's Bazar, Bangladesh."}
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl">
                {settings?.aboutText || "I specialize in building secure, high-performance web applications using React, Next.js, and Node.js. My experience spans full-stack development, database design, securing applications against SQL Injection and web exploits, and training/running local LLM models. I craft experiences that are visually stunning, solid under the hood, and secure."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 my-8">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="flex flex-col items-center justify-center text-center p-6 sm:p-8 min-h-[140px] bg-[var(--surface)] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  style={{ borderRadius: "var(--radius-lg)" }}
                >
                  <div className="p-2 flex flex-col items-center justify-center">
                    <span
                      className="text-4xl sm:text-5xl font-pixel text-[var(--foreground)] leading-none mb-2"
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[var(--muted)] leading-normal">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/about" className="btn-primary px-10 py-5 group" style={{ borderRadius: "var(--radius-md)" }}>
                <span>Read my story</span>
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {settings?.cvUrl && (
                <a 
                  href={settings.cvUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-5 bg-[var(--surface)] border-[3px] border-[#000000] text-[var(--foreground)] font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] hover:bg-[var(--neo-yellow)] transition-all group"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  <Download size={18} strokeWidth={2.5} className="text-[var(--foreground)] group-hover:translate-y-0.5 transition-transform" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full"
          >
            <div className="portrait-3d">
              <div
                ref={portraitRef}
                className="portrait-3d-card relative aspect-[4/5] overflow-hidden bg-[var(--surface)] group"
                onMouseMove={(event) => {
                  // Capture values synchronously (cheap), then batch DOM writes in rAF
                  const clientX = event.clientX;
                  const clientY = event.clientY;
                  if (rafId.current) cancelAnimationFrame(rafId.current);
                  rafId.current = requestAnimationFrame(() => {
                    const el = portraitRef.current;
                    if (!el) return;
                    const rect = el.getBoundingClientRect();
                    const x = clientX - rect.left;
                    const y = clientY - rect.top;
                    const px = (x / rect.width - 0.5) * 2;
                    const py = (y / rect.height - 0.5) * 2;
                    el.style.setProperty("--tilt-x", `${(-py * 8).toFixed(2)}deg`);
                    el.style.setProperty("--tilt-y", `${(px * 10).toFixed(2)}deg`);
                    el.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
                    el.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
                  });
                }}
                onMouseLeave={() => {
                  if (rafId.current) cancelAnimationFrame(rafId.current);
                  const el = portraitRef.current;
                  if (!el) return;
                  el.style.setProperty("--tilt-x", "0deg");
                  el.style.setProperty("--tilt-y", "0deg");
                  el.style.setProperty("--glow-x", "50%");
                  el.style.setProperty("--glow-y", "50%");
                }}
              >
              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 500px"
                className="object-cover img-portrait portrait-3d-img grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              {/* Brutalist accents */}
              <div className="portrait-3d-accent absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--accent)] opacity-40" />
              <div className="portrait-3d-accent absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--accent)] opacity-40" />
              
              {/* Badge overlay */}
              <div className="portrait-3d-badge absolute bottom-8 left-8 bg-[var(--surface)] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000] p-5 flex items-center gap-4" style={{ borderRadius: "var(--radius-md)" }}>
                <div className="w-2 h-2 bg-[var(--neo-green)] border-[2px] border-[#000000] animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--foreground)]">Based in BD</span>
              </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;