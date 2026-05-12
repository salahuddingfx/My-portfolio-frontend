"use client";

import { Cpu, Globe, Layout, Shield, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PremiumCard from "@/components/ui/PremiumCard";

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
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-8">
          <span className="section-kicker mx-auto">Expertise</span>
          <h2 className="section-title !mb-0">
            Digital <span className="text-accent">Services.</span>
          </h2>
          <p className="section-copy mx-auto">
            I offer a comprehensive range of services to help you build a 
            powerful digital presence, from initial design to final deployment.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {services.map((service, i) => (
            <PremiumCard
              key={i}
              delay={i * 0.1}
              className="group flex flex-col h-full !p-12 border-white/5 hover:border-white/10"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-12">
                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/30 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono font-bold text-4xl text-white/5 group-hover:text-white/10 transition-colors duration-700 select-none tracking-tight">
                  {service.index}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6 flex-grow">
                <h3 className="font-display font-bold text-2xl text-white leading-tight">
                  {service.title}
                </h3>
                <p className="section-copy !text-base leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-500">
                  {service.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="mt-10 flex flex-wrap gap-3">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] font-bold text-white/20 border border-white/5 px-3 py-1.5 rounded uppercase tracking-widest group-hover:text-white/40 transition-colors duration-500"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mt-10 pt-10 border-t border-white/5">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 text-white/20 group-hover:text-white transition-all duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Details</span>
                  <ArrowUpRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
