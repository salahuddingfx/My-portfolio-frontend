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

const STATS = [
  { value: "50+",  label: "Projects" },
  { value: "4+",   label: "Years exp." },
  { value: "250K", label: "Lines of code" },
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
        <div className="max-w-xl">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-[var(--border)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[var(--muted)] font-mono">Open to new projects</span>
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Salah Uddin
            <br />
            <span className="text-[var(--muted)]">Kader</span>
          </h1>

          {/* Typing role */}
          <div className="flex items-center gap-2 mb-6 h-8">
            <span className="text-lg text-[var(--muted)] font-mono">
              <span ref={typingRef} className="text-white" />
              <span className="typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm mb-10">
            I build fast, accessible web applications with clean code and
            thoughtful design. Focused on great user experiences.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowRight size={15} />
            </a>
            <Link href="/contact" className="btn-outline">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-[var(--border)]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl font-semibold text-white leading-none"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--muted)] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
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
