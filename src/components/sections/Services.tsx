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
          <span className="section-kicker mx-auto">What I Do</span>
          <h2 className="section-title !mb-0">
            Premium <span className="text-accent">Services.</span>
          </h2>
          <p className="section-copy mx-auto">
            I offer a comprehensive range of services to help you build a 
            powerful digital presence, from initial design to final deployment.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="premium-card group flex flex-col h-full p-10 lg:p-14"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-12">
                <div className="w-20 h-20 rounded-[2rem] bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-700 shadow-2xl relative">
                  <service.icon size={32} strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-[2rem] bg-accent/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                </div>
                <span className="font-display font-black text-6xl lg:text-8xl text-white/[0.04] group-hover:text-white/[0.1] transition-all duration-700 select-none tracking-tighter leading-none translate-x-4">
                  {service.index}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6 flex-grow">
                <h3 className="font-display font-black text-4xl text-white leading-none tracking-tight group-hover:text-accent transition-colors duration-500 uppercase">
                  {service.title}
                </h3>
                <p className="text-[18px] lg:text-[20px] leading-relaxed text-white/60 group-hover:text-white transition-colors duration-500 font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="mt-12 flex flex-wrap gap-3">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] font-black text-white/40 bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full uppercase tracking-widest group-hover:text-white group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mt-14 pt-10 border-t border-white/10 flex items-center justify-between transition-colors">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-6 text-white/50 group-hover:text-white transition-all duration-500"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.4em] font-black">Learn More</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-700 shadow-xl group-hover:scale-110">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
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
