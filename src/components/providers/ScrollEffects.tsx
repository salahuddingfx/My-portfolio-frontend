"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const ctx = gsap.context(() => {
      // Select all sections and the footer within main to apply the overlap effect
      const sections = gsap.utils.toArray<HTMLElement>("main > section, main > footer");
      
      sections.forEach((section, i) => {
        // Ensure they stack on top of each other correctly
        gsap.set(section, { zIndex: i });

        // Add a subtle 5px margin-top to home page sections (except Hero) to create a premium stacked gap
        if (i > 0) {
          gsap.set(section, { marginTop: "5px" });
        }

        // Only pin sections if they are NOT the last two (Section before Footer and Footer itself)
        // AND not the projects section (which handles its own horizontal GSAP pin/spacing)
        if (i < sections.length - 2 && section.id !== "projects") {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
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

    return () => ctx.revert();
  }, [pathname]);

  return null;
}

