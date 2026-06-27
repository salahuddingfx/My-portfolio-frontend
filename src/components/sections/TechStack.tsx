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
import { technologies } from "../../data/technologies";

const TechStack = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting && !shouldRender) {
          scheduleRender();
        }
      },
      { rootMargin: "200px" } // pre-load a little before visible for smooth UX
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="section-shell border-y-[3px] border-[#000000]"
      style={{
        backgroundColor: "var(--surface)",
        backgroundImage: "radial-gradient(circle at center, var(--accent-soft) 0%, var(--surface) 100%)",
      }}
    >
      <div className="container">

        {/* Section header */}
        <div className="section-header-center">
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-heading mt-1">
            Tools I work with.
          </h2>
          <p className="section-subtext mx-auto text-center">
            A collection of technologies I use to build fast and
            reliable digital products.
          </p>
        </div>

        {/* 3D Sphere on desktop — Marquee fallback on mobile/tablet */}
        <div className="w-full relative z-20 pointer-events-none lg:pointer-events-auto">
          {!isMobileDevice ? (
            <div className="w-full h-[380px] cursor-grab active:cursor-grabbing pointer-events-auto">
              {shouldRender ? (
                <TechSphereCanvas isActive={isActive} />
              ) : (
                /* Placeholder that matches the exact dimensions to prevent CLS */
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
                </div>
              )}
            </div>
          ) : (
            /* Beautiful horizontal marquee fallback for mobile/tablet */
            <div 
              style={{
                width: "100%",
                paddingTop: "16px",
                paddingBottom: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                pointerEvents: "auto",
              }}
            >
              {/* Marquee Row 1 */}
              <div 
                className="animate-marquee whitespace-nowrap" 
                style={{ 
                  display: "flex", 
                  gap: "16px", 
                  paddingBottom: "8px",
                  paddingTop: "4px"
                }}
              >
                {[...technologies.slice(0, 15), ...technologies.slice(0, 15)].map((tech, idx) => (
                  <div
                    key={`m1-${idx}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 18px",
                      backgroundColor: "var(--surface)",
                      border: "3px solid var(--foreground)",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "4px 4px 0px var(--foreground)",
                      color: "var(--foreground)",
                    }}
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        objectFit: "contain" 
                      }} 
                    />
                    <span 
                      style={{ 
                        fontFamily: "var(--font-mono)", 
                        fontSize: "14px", 
                        fontWeight: "bold" 
                      }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Marquee Row 2 */}
              <div 
                className="animate-marquee-reverse whitespace-nowrap" 
                style={{ 
                  display: "flex", 
                  gap: "16px", 
                  paddingBottom: "8px",
                  paddingTop: "4px"
                }}
              >
                {[...technologies.slice(15), ...technologies.slice(15)].map((tech, idx) => (
                  <div
                    key={`m2-${idx}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 18px",
                      backgroundColor: "var(--surface)",
                      border: "3px solid var(--foreground)",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "4px 4px 0px var(--foreground)",
                      color: "var(--foreground)",
                    }}
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        objectFit: "contain" 
                      }} 
                    />
                    <span 
                      style={{ 
                        fontFamily: "var(--font-mono)", 
                        fontSize: "14px", 
                        fontWeight: "bold" 
                      }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Self-contained marquee style overrides */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
