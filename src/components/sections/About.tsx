"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Projects Completed",
    value: "50+",
    icon: Rocket,
  },
  {
    label: "Lines of Code",
    value: "250K+",
    icon: Code2,
  },
];

const About = () => {
  return (
    <section id="about" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* IMAGE BLOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] shadow-2xl">
              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-[80px] -z-10" />
          </motion.div>

          {/* CONTENT BLOCK */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl space-y-10"
          >
            <div className="space-y-6">
              <span className="section-kicker">Digital Architect</span>
              <h2 className="section-title !mb-0">
                The Mind Behind<br />
                <span className="text-accent">The Work.</span>
              </h2>
              <p className="text-[17px] leading-relaxed text-white/50 font-medium">
                I&apos;m Salah Uddin Kader, a creative engineer obsessed with 
                the intersection of design and technology. I build high-end 
                digital experiences that are as functional as they are beautiful.
              </p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="premium-card p-10 bg-white/[0.03] border-white/10 group shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <stat.icon size={24} />
                  </div>
                  <h4 className="text-4xl font-black tracking-tighter text-white">
                    {stat.value}
                  </h4>
                  <p className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-white/50 mt-4">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ACTION */}
            <div className="pt-4">
              <Link href="/about" className="btn-primary group">
                <span className="text-[11px] font-black tracking-[0.4em] uppercase">My Full Journey</span>
                <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;