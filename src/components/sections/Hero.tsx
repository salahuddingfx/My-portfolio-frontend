"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe, Mail, Zap } from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import Magnetic from "@/components/ui/Magnetic";

const STATS = [
  { label: "Projects Shipped",   value: "50+" },
  { label: "Lines of Code",      value: "250K" },
  { label: "Years Experience",   value: "4"   },
  { label: "Client Satisfaction",value: "100%" },
];

const Hero = () => {
  const tlRef = useRef<gsap.core.Timeline | null>(null);
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
          span.innerText = char;
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

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tlRef.current = tl;

    tl.fromTo(".hero-kicker",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    )
    .fromTo(".hero-name",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=0.7"
    )
    .fromTo(".hero-role",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.9"
    )
    .fromTo(".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8"
    )
    .fromTo(".hero-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      "-=0.7"
    );

    return () => {
      tl.kill();
      gsap.killTweensOf(typeRole);
    };
  }, []);

  return (
    <section id="home" className="section-shell min-h-screen flex flex-col justify-center relative overflow-hidden bg-black">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#e11d48]/10 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#e11d48]/10 rounded-full blur-[120px] z-0 pointer-events-none" />



      {/* Full Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        {/* Red Shadow behind the model */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-[#e11d48]/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full h-full scale-110 lg:scale-125 transform-gpu pointer-events-auto relative z-10">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-20" />
      </div>

      <div className="relative z-30 container min-h-[100dvh] flex flex-col lg:flex-row items-center lg:justify-between pt-64 pb-80 lg:py-0 pointer-events-none">
        
        {/* Left: Identity */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-auto mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 lg:space-y-4"
          >
            <span className="text-lg md:text-2xl font-display text-white/50">Hello! I&apos;m</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight uppercase">
              Salah<br />
              <span className="text-white/40">Uddin</span><br />
              <span className="">Kader</span>
            </h1>
          </motion.div>
        </div>

        {/* Center: (Space for Spline - used for layout spacing on desktop) */}
        <div className="hidden lg:block w-1/3 h-16 lg:h-auto" />

        {/* Right: Narrative/Creative */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right pointer-events-auto mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-6 lg:gap-10"
          >
            <div className="space-y-2 lg:space-y-4">
              <span className="text-sm md:text-2xl font-display text-white/50 tracking-[0.2em] uppercase">A Creative</span>
              <h2 className="text-4xl md:text-5xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter uppercase break-words">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50">
                  <span ref={typingRef}></span>
                </span>
              </h2>
            </div>
            
            <div className="flex flex-row gap-4 justify-center lg:justify-end flex-wrap">
              <Magnetic>
                <a href="#projects" className="btn-primary px-8 py-4 text-xs">
                  View Projects <ArrowRight size={14} className="ml-2" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-ghost px-8 py-4 text-xs">
                  Contact Me
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Card */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[92%] lg:w-[94%] max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="glass-morphism rounded-2xl lg:rounded-3xl border border-white/5 px-6 py-8 lg:px-16 lg:py-10 grid grid-cols-2 lg:flex lg:justify-between items-center gap-6 lg:gap-8 shadow-2xl shadow-black/50"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center lg:items-start space-y-1">
              <span className="text-[9px] lg:text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">{stat.label}</span>
              <span className="text-2xl lg:text-4xl font-display font-black text-white">{stat.value}</span>
            </div>
          ))}
          
          {/* Scroll Indicator (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col items-center gap-4 text-white/20">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] rotate-90 translate-y-8">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default Hero;
