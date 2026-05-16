"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";

const TYPING_ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Creative Developer",
  "UI & Interaction Designer",
];



const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let isMounted = true;
    const ctx = gsap.context(() => {});

    const typeRole = () => {
      if (!isMounted || !typingRef.current) return;

      const role = TYPING_ROLES[currentIndex];
      typingRef.current.innerHTML = "";

      const chars = role.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        typingRef.current?.appendChild(span);
        return span;
      });

      gsap.to(chars, {
        opacity: 1,
        duration: 0.025,
        stagger: 0.045,
        ease: "none",
        onComplete: () => {
          if (!isMounted) return;
          gsap.delayedCall(2.2, () => {
            if (!isMounted) return;
            gsap.to(chars, {
              opacity: 0,
              duration: 0.02,
              stagger: 0.02,
              ease: "none",
              onComplete: () => {
                if (!isMounted) return;
                currentIndex = (currentIndex + 1) % TYPING_ROLES.length;
                typeRole();
              },
            });
          });
        },
      });
    };

    typeRole();

    return () => {
      isMounted = false;
      ctx.revert();
      gsap.killTweensOf(typingRef.current?.children ?? []);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]"
    >
      {/* 3D Robot — background, full section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-55 transition-opacity duration-1000"
          />
        </div>
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/70" />
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

            <span className="text-white/80 font-mono text-sm sm:text-base mb-2 tracking-widest uppercase">
              Hello! I&apos;m
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1] tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Salah Uddin
              <span className="block text-[var(--muted)]">Kader</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-sm mt-6 mb-8">
              I engineer robust digital experiences with a focus on modern web
              technologies and structural, minimalist design.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6">
              <a href="#projects" className="btn-primary">
                Selected Works
                <ArrowRight size={15} />
              </a>
              <Link 
                href="/contact" 
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted)] hover:text-white transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          {/* Right Side: Role */}
          <div className="flex flex-col z-20 pointer-events-auto text-left md:text-right w-full md:w-5/12 items-start md:items-end justify-center">
            <span className="text-white font-mono text-base sm:text-lg mb-2 tracking-widest uppercase">
              A Creative
            </span>
            <div className="min-h-[60px] md:min-h-[80px] flex flex-col justify-start md:justify-end items-start md:items-end w-full">
              <span 
                className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold uppercase tracking-tighter leading-[1]" 
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span ref={typingRef} />
                <span className="typing-cursor" />
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
