"use client";

import { useState, useEffect } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const interval = setInterval(() => {
      setIsAnimating(true);
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % DESIGNATIONS.length);
        setIsAnimating(false);
      }, 800);
    }, 3000);
    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const currentRole = DESIGNATIONS[index];
  const nextRole = DESIGNATIONS[(index + 1) % DESIGNATIONS.length];
  const nextNextRole = DESIGNATIONS[(index + 2) % DESIGNATIONS.length];

  return (
    <div className={`rotating-roles-container ${isAnimating ? "animating" : ""}`}>
      <h2 className="landing-info-h2">
        <div className="landing-h2-1">{currentRole}</div>
        <div className="landing-h2-2">{nextRole}</div>
      </h2>
      <h2 className="text-stroke">
        <div className="landing-h2-info">{nextRole}</div>
        <div className="landing-h2-info-1">{nextNextRole}</div>
      </h2>
    </div>
  );
};

const Hero = () => {
  const { settings } = useSettings();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("introLoaded") === "true") {
        setIsLoaderFinished(true);
      } else {
        const handleFinished = () => setIsLoaderFinished(true);
        window.addEventListener("intro-loader-finished", handleFinished);
        return () => window.removeEventListener("intro-loader-finished", handleFinished);
      }
    }
  }, []);

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
        <div className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto z-10 flex items-center justify-center hero-spline-container">
          {isLoaderFinished && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full opacity-100 transition-opacity duration-1000 scale-[0.9] sm:scale-100"
            />
          )}
        </div>

        {/* Radial vignette so the center stays clear but edges fade to background */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]" />
        
        {/* Bottom grounding gradient */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/20" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 min-h-screen pointer-events-none landing-section" id="landingDiv">
        <div className="landing-container flex flex-col justify-start md:justify-center pt-32 pb-16 md:py-0 px-8 md:px-0">
          {/* Left Side: Name & Info */}
          <div className="landing-intro flex flex-col z-20 pointer-events-auto text-left w-full md:w-5/12">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[var(--neo-green)] border-[2px] border-[#000000] animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
              <span className="text-xs text-[var(--muted)] font-mono uppercase tracking-widest font-bold">
                Available for work | @salahuddingfx
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
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-sm mb-6">
                {settings?.bio || "I am a Full Stack AI Engineer and Creative Developer specializing in secure full-stack architecture, relational database design (with protection against SQL Injection and other exploits), and custom LLM model integrations. Known online as Saka Chowdhury (@salahuddingfx)."}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-6 md:pt-4">
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
          <div className="landing-info flex flex-col z-20 pointer-events-auto text-left w-full md:w-5/12 justify-center">
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
