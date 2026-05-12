"use client";

import { motion } from "framer-motion";
import { Award, Code2, Rocket, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PremiumCard from "@/components/ui/PremiumCard";

const stats = [
  { label: "Projects Completed", value: "50+",  icon: Rocket },
  { label: "Lines of Code",      value: "250K+", icon: Code2  },
  { label: "Awards Won",         value: "12",    icon: Award  },
  { label: "Years Experience",   value: "4",     icon: Zap    },
];

const About = () => {
  return (
    <section id="about" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <span className="section-kicker mx-auto">My Background</span>
            <h2 className="section-title !mb-0">
              Crafting <span className="text-accent">Exceptional</span> Web Experiences.
            </h2>
            <p className="section-copy mx-auto">
              I am a dedicated Full Stack Developer with a passion for creating 
              seamless digital products. With over 4 years of experience, I focus on 
              technical excellence, clean architecture, and user-centric design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">
            {/* Left — Photo */}
            <div className="relative order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl shadow-accent/5">
                  <Image
                    src="/mine-photo.png"
                    alt="Salah Uddin Kader"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 hidden md:block">
                  <PremiumCard className="!p-5 border-white/10 bg-black/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-white/80">Available for Hire</span>
                    </div>
                  </PremiumCard>
                </div>
              </motion.div>
            </div>

            {/* Right — Stats & CTA */}
            <div className="space-y-16 order-1 lg:order-2">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-10 md:gap-12">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500 bg-white/[0.01]">
                      <stat.icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">{stat.value}</h4>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-8">
                <Link
                  href="/about"
                  className="btn-primary"
                >
                  Read Full Story <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
