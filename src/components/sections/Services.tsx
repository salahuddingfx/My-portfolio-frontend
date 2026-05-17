"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    index: "01",
    title: "Web Development",
    desc: "Building fast, reliable web applications using modern frameworks and best practices. From landing pages to complex full-stack products.",
    tech: ["Next.js", "React", "TypeScript"],
    href: "/services",
  },
  {
    index: "02",
    title: "UI & Experience Design",
    desc: "Designing clean, functional interfaces that are a pleasure to use. Focused on clarity, accessibility, and thoughtful interaction.",
    tech: ["Framer Motion", "GSAP", "Figma"],
    href: "/services",
  },
  {
    index: "03",
    title: "Backend & APIs",
    desc: "Building robust server-side systems, RESTful APIs, and database architectures that scale reliably under real-world conditions.",
    tech: ["Node.js", "Express", "MySQL"],
    href: "/services",
  },
  {
    index: "04",
    title: "Auth & Security",
    desc: "Implementing secure authentication, authorization, and data protection systems across web applications of all sizes.",
    tech: ["JWT", "OAuth", "Encryption"],
    href: "/services",
  },
];

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

const Services = () => {
  return (
    <section id="services" className="section-shell bg-[var(--background)]">
      <div className="container">

        {/* Header - Centered */}
        <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: '4rem' }}>
          <span className="section-eyebrow">Services</span>
          <h2 className="section-heading mt-1">
            What I do best.
          </h2>
          <p className="section-subtext mx-auto mt-4 text-center">
            Specialized in full-stack development — from idea to shipped product.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.25rem' }}>
          {services.map((service, i) => (
            <motion.div
              key={service.index}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card card-hover group flex flex-col h-full p-7"
            >
              {/* Number */}
              <span className="text-xs font-mono text-[var(--muted-soft)] mb-5">
                {service.index}
              </span>

              {/* Title */}
              <h3
                className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--foreground)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow mb-5">
                {service.desc}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {service.tech.map((t) => (
                  <span key={t} className="badge group-hover:border-[var(--border-hover)] group-hover:text-white/60 transition-colors duration-200">
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="border-t border-[var(--border)] pt-5">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-white transition-colors duration-200 group/link"
                >
                  Learn more
                  <ArrowUpRight
                    size={13}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                  />
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
