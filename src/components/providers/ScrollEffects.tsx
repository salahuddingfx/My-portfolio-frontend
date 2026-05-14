"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".section-shell");
      
      sections.forEach((section, i) => {
        // 1. BASE STACKING
        gsap.set(section, { zIndex: i + 10 });

        // 2. ENTRANCE & OVERLAP ANIMATION
        // We want the section to "slide up" over the previous one
        if (i > 0) {
          gsap.fromTo(section,
            { 
              yPercent: 30, // Start slightly below
              // clipPath: "inset(20% 0% 0% 0%)", // Top reveal
            },
            {
              yPercent: 0,
              // clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
              }
            }
          );
        }

        // 3. EXIT ANIMATION (LAYERED PUSH)
        // As we scroll past, the section should slightly shrink and fade
        if (i < sections.length - 1) {
          gsap.to(section, {
            scale: 0.95,
            opacity: 0.8,
            yPercent: -10, // Subtle lift
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          });
        }

        // 4. CONTENT REVEALS (CHOREOGRAPHED)
        const kicker = section.querySelector(".section-kicker");
        const title = section.querySelector(".section-title");
        const copy = section.querySelector(".section-copy");
        const container = section.querySelector(".container");

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

        // 5. PARALLAX CONTAINER
        if (container) {
          gsap.to(container, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
