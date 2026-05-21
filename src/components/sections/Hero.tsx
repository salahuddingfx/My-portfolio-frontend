"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import Magnetic from "@/components/ui/Magnetic";
import { useSettings } from "@/context/SettingsContext";

const DESIGNATIONS = [
  "DESIGNER",
  "DEVELOPER",
  "ENGINEER",
  "CREATOR",
  "BUILDER",
  "INNOVATOR"
];

const RotatingRoles = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DESIGNATIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleRoles = [
    { name: DESIGNATIONS[index], position: "top" as const },
    { name: DESIGNATIONS[(index + 1) % DESIGNATIONS.length], position: "bottom" as const }
  ];

  return (
    <div className="rotating-roles-container">
      <AnimatePresence mode="popLayout">
        {visibleRoles.map((role) => (
          <motion.h2
            key={role.name}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className={`role-item ${role.position === "top" ? "role-top" : "role-bottom"}`}
          >
            {role.name}
          </motion.h2>
        ))}
      </AnimatePresence>
    </div>
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
      <div className="relative z-10 min-h-screen pointer-events-none landing-section" id="landingDiv">
        <div className="landing-container flex flex-col justify-center pt-24 pb-16">
          {/* Left Side: Name & Info */}
          <div className="landing-intro flex flex-col z-20 pointer-events-auto text-left w-full md:w-5/12">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--muted)] font-mono uppercase tracking-widest">
                Available for work
              </span>
            </div>

            <h2>Hello! I'm</h2>
            <h1 className="uppercase font-bold tracking-tighter">
              Salah Uddin
              <br />
              <span className="text-[var(--accent)] font-medium">Kader</span>
            </h1>

            <div className="mt-8 space-y-6">
              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-sm">
                {settings?.bio || "I engineer robust digital experiences with a focus on modern web technologies and structural, minimalist design."}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
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
          <div className="landing-info flex flex-col z-20 pointer-events-auto text-left md:text-right w-full md:w-5/12 justify-center">
            <h3>A Creative</h3>
            <RotatingRoles />
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
