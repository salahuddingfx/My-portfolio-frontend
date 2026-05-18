"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "@/components/sections/Projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsPageClient = () => {
  useEffect(() => {
    const rows = gsap.utils.toArray<HTMLElement>(".project-row");
    if (rows.length === 0) return;

    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main style={{ paddingTop: "var(--navbar-height, 120px)" }}>
      <Projects layout="stacked" />
    </main>
  );
};

export default ProjectsPageClient;
