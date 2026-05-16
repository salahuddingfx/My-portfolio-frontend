"use client";

import { Cpu, Globe, Layout, Shield, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    desc: "I build fast, reliable websites using modern technologies that help your business grow and reach more people.",
    icon: Globe,
    index: "01",
    tech: ["Next.js", "React", "TypeScript"],
  },
  {
    title: "Design & Experience",
    desc: "Creating beautiful and easy-to-use interfaces that give your users a great experience every time they visit.",
    icon: Layout,
    index: "02",
    tech: ["Framer Motion", "GSAP", "Tailwind CSS"],
  },
  {
    title: "Backend & APIs",
    desc: "Developing strong and secure backend systems to handle your data and power your web applications.",
    icon: Cpu,
    index: "03",
    tech: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Security & Auth",
    desc: "Implementing modern security standards and authentication to keep your user data safe and protected.",
    icon: Shield,
    index: "04",
    tech: ["JWT", "OAuth", "SSL/TLS"],
  },
];

const Services = () => {
  return (
    <section id="services" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <span className="section-kicker mx-auto">Expertise</span>
          <h2 className="section-title !mb-0 leading-[0.9]">
            Premium <span className="text-accent">Services.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium tracking-tight mt-8">
            Specializing in high-performance digital solutions that bridge the gap between complex engineering and human-centric design.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card group flex flex-col h-full p-10 lg:p-16"
            >
              <div className="inner-glow" />
              
              {/* Header row */}
              <div className="flex items-start justify-between mb-16">
                <div className="w-20 h-20 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-accent transition-all duration-700 shadow-2xl relative">
                  <service.icon size={36} strokeWidth={1} />
                </div>
                <span className="font-display font-black text-6xl lg:text-9xl text-white/[0.02] group-hover:text-white/[0.06] transition-all duration-700 select-none tracking-tighter leading-none translate-x-6">
                  {service.index}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6 flex-grow">
                <h3 className="font-display font-black text-4xl lg:text-5xl text-white leading-none tracking-tighter group-hover:text-accent transition-colors duration-500 uppercase">
                  {service.title}
                </h3>
                <p className="text-xl leading-relaxed text-white/40 group-hover:text-white/70 transition-colors duration-500 font-medium tracking-tight">
                  {service.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="mt-16 flex flex-wrap gap-3">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] font-bold text-white/20 bg-white/[0.02] border border-white/5 px-6 py-3 rounded-full uppercase tracking-[0.2em] group-hover:text-white group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
                <Link
                  href="/services"
                  className="flex items-center gap-8 group/link"
                >
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-700 shadow-xl group-hover:scale-110">
                    <ArrowUpRight size={22} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-bold text-white/20 group-hover:text-white transition-colors">Explore Solution</span>
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
