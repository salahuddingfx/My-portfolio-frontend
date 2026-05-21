"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lazy-load the heavy Three.js bundle (2.7 MB) — only after the section is visible
const TechSphereCanvas = dynamic(() => import("../canvas/TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
    </div>
  ),
});

/**
 * TechStack — performance wrapper for the Three.js sphere.
 *
 * TechSphere pulls in @react-three/fiber + cannon + drei which totals ~2.7 MB.
 * Without deferral it eats 2,953ms of main-thread CPU at page load.
 *
 * Fix: IntersectionObserver + requestIdleCallback — the Canvas only mounts
 * after:
 *   1. The section enters the viewport (user scrolls past Hero/About)
 *   2. The browser has a free idle frame (after LCP is captured)
 */
const TechStack = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scheduleRender = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
          .requestIdleCallback(() => setShouldRender(true), { timeout: 2000 });
      } else {
        setTimeout(() => setShouldRender(true), 500);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          scheduleRender();
        }
      },
      { rootMargin: "200px" } // pre-load a little before visible for smooth UX
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="section-shell border-y border-[var(--border)]"
      style={{
        backgroundColor: "var(--surface)",
        backgroundImage: "radial-gradient(circle at center, var(--accent-soft) 0%, var(--surface) 100%)",
      }}
    >
      <div className="container">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-heading mt-1">
            Tools I work with.
          </h2>
          <p className="section-subtext mx-auto text-center">
            A collection of technologies I use to build fast and
            reliable digital products.
          </p>
        </div>

        {/* 3D Sphere — deferred until visible + idle, pointer-events-none on mobile */}
        <div className="w-full h-[280px] lg:h-[380px] relative z-20 pointer-events-none lg:pointer-events-auto cursor-grab active:cursor-grabbing">
          {shouldRender ? (
            <TechSphereCanvas />
          ) : (
            /* Placeholder that matches the exact dimensions to prevent CLS */
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
