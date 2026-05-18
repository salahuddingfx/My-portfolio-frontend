"use client";

import { useEffect, useRef } from "react";
import type { Context } from "gsap";

import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();
  const ctxRef = useRef<Context | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = connection?.saveData ?? false;
    const isSmallScreen = window.matchMedia("(max-width: 1023px)").matches;
    if (reduceMotion || saveData || isSmallScreen) return;

    let timeoutId: number | undefined;
    let cancelled = false;

    // Delay longer so initial paint + LCP are fully captured before GSAP reads layout
    timeoutId = window.setTimeout(() => {
      const init = async () => {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        ctxRef.current = gsap.context(() => {
          // Query sections INSIDE the timeout — avoids triggering a forced
          // synchronous layout calculation during initial page render
          const sections = gsap.utils.toArray<HTMLElement>("main section, main footer");

          sections.forEach((section, i) => {
            if (section.id === "projects") {
              gsap.set(section, { zIndex: 10 });
            } else {
              gsap.set(section, { zIndex: i });
            }

            if (i > 0) {
              gsap.set(section, { marginTop: "5px" });
            }

            const nextSection = sections[i + 1] as HTMLElement | undefined;
            const isFooter = section.tagName.toLowerCase() === "footer";

            if (nextSection && !isFooter && section.id !== "projects") {
              ScrollTrigger.create({
                trigger: section,
                start: "top top",
                endTrigger: nextSection,
                end: "top top",
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
              });
            }

            const kicker = section.querySelector(".section-kicker");
            const title = section.querySelector(".section-title");
            const copy = section.querySelector(".section-copy");

            const revealTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              }
            });

            if (kicker) revealTl.from(kicker, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" });
            if (title) revealTl.from(title, { y: 40, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.6");
            if (copy) revealTl.from(copy, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7");
          });
        });
      };

      init();
    }, 1000);

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}

