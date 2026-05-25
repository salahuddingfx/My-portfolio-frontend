"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const isSmallScreen = window.matchMedia("(max-width: 1023px)").matches;
    if (isSmallScreen) return;

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
          // Query all sections — footer is intentionally excluded from pinning
          // but included for z-index stacking so it renders above all sections
          const sections = gsap.utils.toArray<HTMLElement>("main section");
          const footer = document.querySelector("main footer") as HTMLElement | null;
          const allEls = footer ? [...sections, footer] : sections;

          // Assign z-indexes in strict ascending order so each later element
          // always visually covers earlier pinned ones. Projects gets a bump
          // so it stays above all regular sections.
          allEls.forEach((el, i) => {
            const baseZ = i + 1;
            gsap.set(el, { zIndex: baseZ, position: "relative" });
          });

          // Pin sections (slide-over effect): each section stays fixed until
          // the next one scrolls up and covers it. Skip:
          //   - #projects (has its own horizontal scroll)
          //   - #contact-cta (last section — nothing slides over it; the footer does)
          //   - footer itself
          sections.forEach((section, i) => {
            const nextSection = sections[i + 1] as HTMLElement | undefined;
            const shouldPin =
              nextSection &&
              section.id !== "projects" &&
              section.id !== "contact-cta";

            if (shouldPin) {
              ScrollTrigger.create({
                trigger: section,
                start: () => {
                  const viewportHeight = window.innerHeight;
                  const sectionHeight = section.offsetHeight;
                  // If a section is taller than the viewport, pin it at bottom bottom
                  // so the user can scroll through the entire content before it gets covered.
                  return sectionHeight <= viewportHeight ? "top top" : "bottom bottom";
                },
                endTrigger: nextSection,
                end: "top top",
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
              });
            }

            // Text reveal animations
            const kicker = section.querySelector(".section-kicker");
            const title = section.querySelector(".section-title");
            const copy = section.querySelector(".section-copy");

            const revealTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            });

            if (kicker) revealTl.from(kicker, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" });
            if (title)  revealTl.from(title,  { y: 40, opacity: 0, duration: 1,   ease: "power4.out" }, "-=0.6");
            if (copy)   revealTl.from(copy,   { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7");
          });

          // Recalculate all trigger positions after setup
          ScrollTrigger.refresh();
        });
      };

      init();
    }, 300);

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

