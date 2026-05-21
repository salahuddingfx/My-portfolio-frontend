"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import Magnetic from "@/components/ui/Magnetic";
import { useSettings } from "@/context/SettingsContext";

const TYPING_ROLES = [
  "Creative Developer",
  "Frontend Engineer",
  "Interactive Web Designer",
  "Full Stack Developer",
  "Digital Experience Builder",
  "Modern UI Designer",
  "Web Interface Engineer",
  "Motion & Interaction Designer",
];

const RoleTyper = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <span className="inline-flex items-center">
      <AnimatePresence 
        mode="wait" 
        onExitComplete={() => {
          setIndex((prev) => (prev + 1) % TYPING_ROLES.length);
          setIsVisible(true);
        }}
      >
        {isVisible && (
          <motion.span
            key={index}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(variant) => {
              if (variant === "visible") {
                setTimeout(() => setIsVisible(false), 2200);
              }
            }}
          >
            {TYPING_ROLES[index].split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                  exit: { opacity: 0 }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="typing-cursor ml-1 inline-block" />
    </span>
  );
};

const Hero = () => {
  const { settings } = useSettings();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]"
    >
      {/* 3D Robot — background, full section */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        
        {/* Acernity Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-[20%] md:-top-20 z-0"
          fill="var(--spotlight-color)"
        />

        {/* Decorative Spots */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />

        {/* Background Glow behind the robot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] aspect-square bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />

        {/* 3D Spline Scene rendered on all devices; enable pointer events on larger screens */}
        <div className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto z-10 flex items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-100 transition-opacity duration-1000 scale-[1.2] md:scale-100"
          />
        </div>

        {/* Radial vignette so the center stays clear but edges fade to background */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]" />
        
        {/* Bottom grounding gradient */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/20" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 container min-h-screen flex flex-col justify-center pt-24 pb-16 pointer-events-none">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-16 md:gap-4 mt-10 md:mt-0">
          
          {/* Left Side: Name & Info */}
          <div className="flex flex-col z-20 pointer-events-auto text-left w-full md:w-5/12">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--muted)] font-mono uppercase tracking-widest">
                Available for work
              </span>
            </div>

            <span className="text-[var(--foreground)]/80 font-mono text-sm sm:text-base mb-2 tracking-widest uppercase">
              Hello! I&apos;m
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--foreground)] leading-[1] tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Salah Uddin
              <span className="block text-[var(--muted)]">Kader</span>
            </h1>

            <div className="mt-6 space-y-8">
              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-sm">
                {settings?.bio || "I engineer robust digital experiences with a focus on modern web technologies and structural, minimalist design."}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-6">
                <Magnetic>
                  <a href="#projects" className="btn-primary">
                    Selected Works
                    <ArrowRight size={15} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link 
                    href="/contact" 
                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Let&apos;s Talk
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Side: Role */}
          <div className="flex flex-col z-20 pointer-events-auto text-left md:text-right w-full md:w-5/12 items-start md:items-end justify-center">
            <span className="text-[var(--foreground)] font-mono text-base sm:text-lg mb-2 tracking-widest uppercase">
              A Creative
            </span>
            <div className="min-h-[60px] md:min-h-[80px] flex flex-col justify-start md:justify-end items-start md:items-end w-full">
              <span 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[var(--foreground)] font-bold uppercase tracking-tighter leading-[1]" 
                style={{ fontFamily: "var(--font-display)" }}
              >
                <RoleTyper />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] text-[var(--muted-soft)] font-mono tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--muted-soft)] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
