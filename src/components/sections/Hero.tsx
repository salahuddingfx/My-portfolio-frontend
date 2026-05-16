"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import Magnetic from "@/components/ui/Magnetic";

const STATS = [
  { label: "Projects Shipped",   value: "50+" },
  { label: "Lines of Code",      value: "250K" },
  { label: "Years Experience",   value: "4"   },
  { label: "Client Satisfaction",value: "100%" },
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
    <section id="home" className="section-shell min-h-screen flex flex-col justify-center relative overflow-hidden bg-black">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#e11d48]/10 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#e11d48]/10 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Full Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-[#e11d48]/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full h-full scale-110 lg:scale-125 transform-gpu pointer-events-auto relative z-10">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-60 lg:opacity-90"
          />
        </div>
        
        {/* Mobile Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/40 lg:bg-transparent pointer-events-none z-15 lg:hidden" />
        
        {/* Gradient Transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-20" />
      </div>

      <div className="relative z-30 container min-h-[100dvh] flex flex-col lg:flex-row items-center lg:justify-between pt-32 pb-24 lg:py-0 pointer-events-none">
        
        {/* Left: Identity */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-auto mb-16 lg:mb-0 mt-32 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 lg:space-y-6"
          >
            <span className="text-lg md:text-xl font-display text-white/40 tracking-[0.3em] uppercase">Hello! I&apos;m</span>
            <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
              Salah<br />
              <span className="text-white/10">Uddin</span><br />
              <span className="text-white">Kader</span>
            </h1>
          </motion.div>
        </div>

        {/* Center: (Space for Spline) */}
        <div className="hidden lg:block w-1/3" />

        {/* Right: Narrative/Creative */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right pointer-events-auto mt-12 lg:mt-0 pb-32 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-10 lg:gap-16"
          >
            <div className="space-y-2 lg:space-y-4">
              <span className="text-sm md:text-xl font-display text-white/40 tracking-[0.3em] uppercase">A Creative</span>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50 whitespace-nowrap">
                  <span ref={typingRef}></span>
                </span>
              </h2>
            </div>
            
            <div className="flex flex-row gap-4 justify-center lg:justify-end flex-wrap">
              <Magnetic>
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowRight size={16} className="ml-2" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-ghost">
                  Contact Me
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Card */}
      <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-40 w-[92%] lg:w-[94%] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="premium-card p-6 lg:p-12 grid grid-cols-2 lg:flex lg:justify-between items-center gap-8 lg:gap-12"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center lg:items-start space-y-2">
              <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
              <span className="text-2xl lg:text-5xl font-display font-black text-white tracking-tighter">{stat.value}</span>
            </div>
          ))}
          
          {/* Scroll Indicator */}
          <div className="hidden lg:flex flex-col items-center gap-4 text-white/10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] rotate-90 translate-y-8">Scroll</span>
            <div className="w-px h-20 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
