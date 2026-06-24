"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const currentRole = DESIGNATIONS[index];

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % DESIGNATIONS.length);
        return;
      }
      const deleteTimer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 35);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText === currentRole) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentRole.slice(0, displayText.length + 1));
    }, 70);
    return () => clearTimeout(typeTimer);
  }, [displayText, isDeleting, isPaused, currentRole, index]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main typed word */}
      <div className="flex items-center gap-1">
        {displayText.split("").map((char, i) => (
          <span
            key={`${index}-${i}`}
            className="text-[var(--neo-yellow)]"
            style={{
              fontFamily: "var(--font-pixel), sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "0.04em",
              display: "inline-block",
              animation: "charReveal 0.3s ease-out forwards",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            {char}
          </span>
        ))}
        {/* Blinking cursor */}
        <span
          className="inline-block w-[3px] ml-0.5"
          style={{
            height: "clamp(32px, 5vw, 52px)",
            background: "var(--neo-yellow)",
            animation: "typing-cursor 1s ease-in-out infinite",
          }}
        />
      </div>

      {/* Outline preview of next word */}
      <div className="flex items-center gap-1 overflow-hidden" style={{ height: "clamp(24px, 3vw, 36px)" }}>
        <span
          style={{
            fontFamily: "var(--font-pixel), sans-serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "transparent",
            WebkitTextStroke: "1.5px var(--foreground)",
            opacity: 0.15,
          }}
        >
          {DESIGNATIONS[(index + 1) % DESIGNATIONS.length]}
        </span>
      </div>
    </div>
  );
};

const Hero = () => {
  const { settings } = useSettings();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
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
        
        {/* Acernity Spotlight - hidden on mobile for performance */}
        {!isMobile && (
          <Spotlight
            className="-top-40 left-0 md:left-[20%] md:-top-20 z-0"
            fill="var(--spotlight-color)"
          />
        )}

        {/* Decorative Spots - reduced on mobile */}
        <div className={`absolute -top-[10%] -left-[10%] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[30vw] h-[30vw]' : 'w-[50vw] h-[50vw]'}`} />
        <div className={`absolute -bottom-[10%] -right-[10%] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[30vw] h-[30vw]' : 'w-[50vw] h-[50vw]'}`} />

        {/* Background Glow behind the robot */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[50vw] max-w-[300px]' : 'w-[80vw] max-w-[600px] aspect-square'}`} />

        {/* 3D Spline Scene - optimized for mobile */}
        <div className={`absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto z-10 flex items-center justify-center hero-spline-container ${isMobile ? 'opacity-60' : ''}`}>
          {isLoaderFinished && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className={`w-full h-full opacity-100 transition-opacity duration-1000 ${isMobile ? 'scale-[0.6]' : 'scale-[0.9] sm:scale-100'}`}
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

            <h2>Hello! I&apos;m</h2>
            <h1 className="uppercase font-bold tracking-tighter whitespace-nowrap">
              Salah Uddin <span className="text-[var(--accent)] font-medium">Kader</span>
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
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] text-[var(--muted-soft)] font-mono tracking-widest uppercase group-hover:text-[var(--foreground)] transition-colors">
          Scroll
        </span>
        
        {/* Mouse icon */}
        <div className="relative w-6 h-10 border-2 border-[var(--muted-soft)] group-hover:border-[var(--foreground)] rounded-full transition-colors flex justify-center">
          {/* Wheel */}
          <div 
            className="w-1 h-2.5 bg-[var(--muted-soft)] group-hover:bg-[var(--foreground)] rounded-full mt-2 transition-colors"
            style={{ animation: "mouseWheel 1.5s ease-in-out infinite" }}
          />
        </div>
        
        {/* Vertical line below mouse */}
        <div className="w-px h-8 bg-gradient-to-b from-[var(--muted-soft)] to-transparent group-hover:from-[var(--foreground)] transition-colors" />
      </div>
    </section>
  );
};

export default Hero;

