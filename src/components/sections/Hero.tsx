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
      <div className="relative z-10 container min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Status */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-xs text-[var(--muted)] font-mono uppercase tracking-widest">
              Available for work
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-6xl sm:text-8xl lg:text-[8vw] font-bold text-[var(--foreground)] leading-[0.9] tracking-tighter mb-6 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Salah Uddin
            <span className="block text-[var(--muted)]">Kader</span>
          </h1>

          {/* Typing role */}
          <div className="flex items-center gap-2 mb-8 h-8">
            <span className="text-xl sm:text-2xl text-[var(--foreground)] font-mono uppercase tracking-tight">
              <span ref={typingRef} />
              <span className="typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-lg mb-12">
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
              className="group flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Start a project
            </Link>
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
