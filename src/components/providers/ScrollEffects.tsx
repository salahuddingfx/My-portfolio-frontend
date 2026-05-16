"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all sections within main to apply the overlap effect
      const sections = gsap.utils.toArray<HTMLElement>("main > section");
      
      sections.forEach((section, i) => {
        // Ensure they stack on top of each other correctly
        gsap.set(section, { zIndex: i });

        // Don't pin the last section, otherwise it sticks and doesn't scroll naturally at the end
        if (i !== sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: () => {
              // If the section is taller than the viewport, pin it when its bottom reaches the bottom of the viewport.
              // Otherwise, pin it when its top reaches the top.
              return section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top";
            },
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true, // Recalculate on resize
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
  }, []);

  return null;
}

