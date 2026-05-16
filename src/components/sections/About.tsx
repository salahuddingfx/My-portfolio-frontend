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
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-32 items-center">
          
          {/* IMAGE BLOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] shadow-2xl group">
              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border-[8px] border-black/20 rounded-[3rem] pointer-events-none" />
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />
          </motion.div>

          {/* CONTENT BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl space-y-12"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="section-kicker">The Visionary</span>
                <h2 className="section-title !mb-0 leading-[0.9]">
                  Merging Art<br />
                  <span className="text-accent">& Code.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-white/50 font-medium tracking-tight">
                I am Salah Uddin Kader, a Creative Engineer dedicated to crafting high-end digital experiences. I believe that code is a canvas, and every pixel is an opportunity to evoke emotion and drive results.
              </p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="premium-card p-10 group"
                >
                  <div className="inner-glow" />
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-xl">
                    <stat.icon size={28} />
                  </div>
                  <h4 className="text-5xl font-black tracking-tighter text-white mb-3">
                    {stat.value}
                  </h4>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-accent transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ACTION */}
            <div className="pt-6">
              <Link href="/about" className="btn-primary group px-10">
                <span>My Full Story</span>
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;