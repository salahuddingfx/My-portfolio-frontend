"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import Magnetic from "@/components/ui/Magnetic";

const STATS = [
  { label: "Projects Shipped", value: "50+" },
  { label: "Lines of Code", value: "250K" },
  { label: "Years Experience", value: "4" },
  { label: "Client Satisfaction", value: "100%" },
];

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const roles = [
      "Software Engineer",
      "Creative Developer",
      "Full Stack Developer",
      "UI & Interaction Designer",
      "Digital Architect"
    ];
    let currentRoleIndex = 0;

    const typeRole = () => {
      const role = roles[currentRoleIndex];
      const chars = role.split("");

      if (typingRef.current) {
        typingRef.current.innerText = "";
        const charElements = chars.map(char => {
          const span = document.createElement("span");
          span.innerText = char === " " ? "\u00A0" : char;
          span.style.opacity = "0";
          span.style.display = "inline-block";
          typingRef.current?.appendChild(span);
          return span;
        });

        gsap.to(charElements, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.03,
          ease: "none",
          onComplete: () => {
            gsap.delayedCall(2, () => {
              gsap.to(charElements, {
                opacity: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "none",
                onComplete: () => {
                  currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                  typeRole();
                }
              });
            });
          }
        });
      }
    };

    typeRole();

    return () => {
      gsap.killTweensOf(".nav-link-item");
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-black">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Dynamic Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[140px] pointer-events-none opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[140px] pointer-events-none opacity-40" />

        {/* Spline Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full scale-110 lg:scale-115 transform-gpu pointer-events-auto relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full opacity-40 lg:opacity-70 transition-opacity duration-1000"
            />
          </div>

          {/* Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
      </div>

      <div className="relative z-30 container flex flex-col lg:flex-row items-center lg:justify-between pointer-events-none py-20 lg:py-0">

        {/* Left: Identity */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-auto mt-20 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:space-y-8"
          >
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <span className="w-8 h-px bg-accent/50" />
              <span className="text-xs md:text-sm font-mono text-accent tracking-[0.4em] uppercase font-bold">Available for Work</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-2xl">
              Salah<br />
              <span className="text-white/10 outline-text">Uddin</span><br />
              <span className="text-white">Kader</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/40 max-w-md font-medium tracking-tight">
              Designing and building digital experiences that merge <span className="text-white">technical precision</span> with <span className="text-white">creative vision</span>.
            </p>
          </motion.div>
        </div>

        {/* Right: Narrative/Creative */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right pointer-events-auto mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12 lg:gap-20"
          >
            <div className="space-y-3 lg:space-y-4">
              <span className="text-[10px] md:text-xs font-mono text-white/30 tracking-[0.5em] uppercase font-bold">Expertise In</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 whitespace-nowrap">
                  <span ref={typingRef}></span>
                </span>
              </h2>
            </div>

            <div className="flex flex-row gap-6 justify-center lg:justify-end">
              <Magnetic>
                <a href="#projects" className="btn-primary px-10">
                  Projects <ArrowRight size={18} className="ml-2" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-ghost px-10">
                  Hire Me
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Card */}
      <div className="absolute bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card p-8 lg:p-14 flex flex-col lg:flex-row lg:justify-between items-center gap-10 lg:gap-0"
        >
          <div className="inner-glow" />
          
          <div className="grid grid-cols-2 lg:flex lg:gap-20 gap-x-12 gap-y-8 w-full lg:w-auto">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start space-y-1 group">
                <span className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-[0.3em] group-hover:text-accent/50 transition-colors">{stat.label}</span>
                <span className="text-3xl lg:text-6xl font-display font-black text-white tracking-tighter">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="hidden lg:flex items-center gap-6 text-white/10 group cursor-pointer">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] group-hover:text-white/30 transition-colors">Discover</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] group-hover:text-accent transition-colors">Portfolio</span>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent group-hover:h-20 transition-all duration-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
