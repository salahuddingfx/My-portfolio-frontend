"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Projects Completed",
    value: "50+",
  },
  {
    label: "Lines of Code",
    value: "250K+",
  },
];

const About = () => {
  return (
    <section id="about" className="section-shell relative overflow-hidden bg-background">
      <div className="container relative z-10">
        
        {/* Massive Section Title */}
        <div className="mb-24 lg:mb-32">
          <span className="kicker block mb-6">[ IDENTITY ]</span>
          <h2 className="text-[12vw] lg:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter text-white mix-blend-difference">
            MERGING ART<br/>
            <span className="text-accent">& CODE</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* CONTENT BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-16"
          >
            <div className="editorial-block">
              <p className="text-2xl lg:text-3xl leading-snug text-white/70 font-medium tracking-tight">
                I am Salah Uddin Kader, a <span className="text-white">Creative Engineer</span> dedicated to crafting high-end digital experiences. I believe that code is a canvas, and every pixel is an opportunity to evoke emotion and drive results.
              </p>
            </div>

            {/* STATS GRID - RAW */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {stats.map((stat, i) => (
                <div key={i} className="editorial-block border-t-2 border-white/10 pt-6">
                  <h4 className="text-6xl font-black tracking-tighter text-white mb-4">
                    {stat.value}
                  </h4>
                  <p className="kicker text-white/40">
                    [{stat.label}]
                  </p>
                </div>
              ))}
            </div>

            {/* ACTION */}
            <div className="pt-8">
              <Link href="/about" className="btn-outline">
                <span>FULL_STORY</span>
                <ArrowRight size={18} className="ml-3" />
              </Link>
            </div>
          </motion.div>

          {/* IMAGE BLOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-16 lg:mt-0"
          >
            <div className="relative aspect-[3/4] w-full border-2 border-white/10 bg-surface overflow-hidden group">
              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Raw crosshair decoration */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;