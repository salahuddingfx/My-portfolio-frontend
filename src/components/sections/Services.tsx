"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    desc: "Architecting high-performance digital infrastructure. Building fast, reliable systems using raw code and modern logic.",
    index: "01",
    tech: ["NEXT.JS", "REACT", "TYPESCRIPT"],
  },
  {
    title: "Digital Experience",
    desc: "Designing stark, beautiful, and highly interactive interfaces that command attention and drive engagement.",
    index: "02",
    tech: ["FRAMER", "GSAP", "TAILWIND"],
  },
  {
    title: "Systems Engineering",
    desc: "Developing brutalist backend architectures that handle complex data streams with absolute precision.",
    index: "03",
    tech: ["NODE.JS", "EXPRESS", "DATABASE"],
  },
  {
    title: "Security Protocols",
    desc: "Implementing military-grade auth and data protection standards to secure the perimeter.",
    index: "04",
    tech: ["JWT", "OAUTH", "ENCRYPTION"],
  },
];

const Services = () => {
  return (
    <section id="services" className="section-shell relative overflow-hidden bg-background">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <span className="kicker block">[ CAPABILITIES ]</span>
            <h2 className="text-[12vw] lg:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
              SYSTEM<br/>
              <span className="text-accent">MODULES</span>
            </h2>
          </div>
          <p className="text-xl text-white/50 max-w-md font-bold tracking-tight uppercase">
            Specializing in high-performance digital solutions that bridge the gap between complex engineering and structural design.
          </p>
        </div>

        {/* Service Grid - Raw & Structural */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="solid-card group flex flex-col h-full"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-16 border-b-2 border-white/10 pb-8">
                <span className="kicker text-accent">
                  [ MOD_{service.index} ]
                </span>
                <span className="font-display font-black text-6xl lg:text-8xl text-white/10 group-hover:text-white/20 transition-colors duration-500 select-none tracking-tighter leading-none">
                  {service.index}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6 flex-grow mb-16">
                <h3 className="font-display font-black text-4xl lg:text-5xl text-white leading-[0.9] tracking-tighter group-hover:text-accent transition-colors duration-500 uppercase">
                  {service.title}
                </h3>
                <p className="text-xl leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-500 font-bold tracking-tight">
                  {service.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-4 mb-16">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="kicker text-white/30 group-hover:text-white transition-colors duration-500"
                  >
                    [{t}]
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="pt-8 border-t-2 border-white/10">
                <Link
                  href="/services"
                  className="flex items-center justify-between group/link hover:text-accent transition-colors"
                >
                  <span className="kicker text-white group-hover/link:text-accent transition-colors">INITIALIZE_MOD</span>
                  <ArrowUpRight size={24} className="text-white group-hover/link:text-accent transition-colors transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
