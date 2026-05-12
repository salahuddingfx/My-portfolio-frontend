"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  useEffect(() => {
    // We only apply this to the landing page sections
    const sections = gsap.utils.toArray(".section-shell");
    
    sections.forEach((section: any, i: number) => {
      // Set initial z-index for stacking
      gsap.set(section, { zIndex: i + 1 });

      // Create a more pronounced "Overlap" effect
      // Each section slides up from behind the previous one (or over it)
      gsap.fromTo(section, 
        {
          y: i === 0 ? 0 : "20vh",
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(10% 0% 0% 0%)",
        },
        {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1, // Smoother scrub
            // markers: true,
          }
        }
      );

      // Add a subtle parallax to the content inside
      const content = section.querySelector(".container");
      if (content) {
        gsap.to(content, {
          y: -50,
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
