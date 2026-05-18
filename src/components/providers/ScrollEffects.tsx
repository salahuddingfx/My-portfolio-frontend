"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let timeoutId: number | undefined;

    timeoutId = window.setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        // Select all sections and the footer within main to apply the overlap effect
        const sections = gsap.utils.toArray<HTMLElement>("main section, main footer");

        sections.forEach((section, i) => {
          // Ensure they stack on top of each other correctly
          gsap.set(section, { zIndex: i });

          // Add a subtle 5px margin-top to home page sections (except Hero) to create a premium stacked gap
          if (i > 0) {
            gsap.set(section, { marginTop: "5px" });
          }

          // Pin each section for the stacked card overlap effect.
          // To make cards slide over each other without staying stuck forever or creating ghost spaces,
          // we unpin the current section EXACTLY when the next section has fully scrolled up to cover it
          // (i.e. next section's top reaches the top of the viewport).
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

          // Add subtle content reveals for elements inside the section
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
    }, 0);

    return () => {
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

