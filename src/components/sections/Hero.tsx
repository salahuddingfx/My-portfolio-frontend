"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";

const STATS = [
  { label: "Projects Shipped", value: "50+" },
  { label: "Lines of Code", value: "250K" },
  { label: "Years Experience", value: "4" },
];

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const roles = [
      "Software Engineer",
      "Creative Developer",
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
          duration: 0.02,
          stagger: 0.05,
          ease: "none",
          onComplete: () => {
            gsap.delayedCall(2, () => {
              gsap.to(charElements, {
                opacity: 0,
                duration: 0.02,
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
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      
      {/* 3D Scene - Moved back in z-index but scaling large */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full scale-[1.2] lg:scale-[1.4] transform-gpu pointer-events-auto relative origin-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-60 transition-opacity duration-1000 grayscale-[0.5]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Massive Typography Overlay */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 lg:px-12 pointer-events-none">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 md:mt-0 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-auto"
          >
            <span className="kicker block mb-4">[ STATUS ]</span>
            <div className="flex items-center gap-4 border-2 border-accent px-6 py-3 bg-background">
              <div className="w-2 h-2 bg-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Accepting Missions</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xs md:text-right pointer-events-auto"
          >
            <p className="text-white/60 font-medium text-lg leading-tight uppercase tracking-tighter">
              Engineering <span className="text-white">high-performance</span> digital spaces. <br/>Form follows function.
            </p>
          </motion.div>
        </div>

        {/* Center/Giant Name */}
        <div className="flex flex-col justify-center flex-grow py-12 pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] lg:text-[18vw] font-black uppercase leading-[0.75] tracking-tighter mix-blend-difference"
          >
            <span className="text-white block">SALAH</span>
            <span className="outline-text block ml-[10vw]">UDDIN</span>
            <span className="text-accent block ml-[5vw] drop-shadow-[0_0_30px_rgba(255,0,51,0.4)]">KADER</span>
          </motion.h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pointer-events-auto">
          
          {/* Roles */}
          <div className="w-full md:w-auto">
            <span className="kicker block mb-4">[ ROLE ]</span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
              <span className="text-transparent outline-text-accent whitespace-nowrap">
                <span ref={typingRef}></span>
              </span>
            </h2>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col items-start md:items-end gap-8 w-full md:w-auto">
            <div className="flex gap-10 border-b-2 border-white/10 pb-8 w-full md:w-auto justify-between md:justify-end">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col md:items-end">
                  <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                  <span className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-none">{stat.value}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <a href="#projects" className="btn-raw w-full md:w-auto text-sm">
                VIEW LOGS
              </a>
              <Link href="/contact" className="btn-outline w-full md:w-auto text-sm">
                INITIATE
              </Link>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
