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

  const stats = [
    { value: settings?.projectsCompleted || "50+", label: "Projects completed" },
    { value: settings?.experienceYears || "4+", label: "Years of experience" },
  ];

  return (
    <section id="about" className="section-shell bg-[var(--background)] py-32">
      <div className="container">

        {/* Centered Header */}
        <motion.div 
          {...fadeUp}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="section-eyebrow mb-4 block">About me</span>
          <h2 className="section-heading text-5xl md:text-7xl mt-2 leading-tight">
            {settings?.aboutTitle || "I craft digital experiences."}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Text content */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 flex flex-col gap-10"
          >

            <div className="space-y-6">
              <p className="text-white text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                {settings?.bio || "I'm Salah Uddin Kader, a Full Stack Developer based in Cox's Bazar, Bangladesh."}
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl">
                {settings?.aboutText || "I care about the details — from the architecture of a system to the feel of an interaction. Good software should be reliable, understandable, and a pleasure to use."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 py-10 my-8 border-y border-[var(--border)]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span
                    className="text-5xl font-black text-white italic tracking-tighter"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/about" className="btn-primary px-10 py-5 rounded-2xl group">
                <span>Read my story</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {settings?.cvUrl && (
                <a 
                  href={settings.cvUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-[var(--border)] text-white font-bold uppercase tracking-tighter rounded-2xl hover:bg-white/10 hover:border-[var(--accent)]/50 transition-all group"
                >
                  <Download size={18} className="text-[var(--accent)] group-hover:translate-y-0.5 transition-transform" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="portrait-3d">
              <div
                ref={portraitRef}
                className="portrait-3d-card relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)] group shadow-2xl"
                onMouseMove={(event) => {
                  const el = portraitRef.current;
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  const x = event.clientX - rect.left;
                  const y = event.clientY - rect.top;
                  const px = (x / rect.width - 0.5) * 2;
                  const py = (y / rect.height - 0.5) * 2;
                  el.style.setProperty("--tilt-x", `${(-py * 8).toFixed(2)}deg`);
                  el.style.setProperty("--tilt-y", `${(px * 10).toFixed(2)}deg`);
                  el.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
                  el.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
                }}
                onMouseLeave={() => {
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
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover img-portrait portrait-3d-img grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              {/* Brutalist accents */}
              <div className="portrait-3d-accent absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--accent)] opacity-40" />
              <div className="portrait-3d-accent absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--accent)] opacity-40" />
              
              {/* Badge overlay */}
              <div className="portrait-3d-badge absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Based in BD</span>
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