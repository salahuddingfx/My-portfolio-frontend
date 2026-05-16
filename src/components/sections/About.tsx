"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "50+", label: "Projects completed" },
  { value: "4+", label: "Years of experience" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const About = () => {
  return (
    <section id="about" className="section-shell bg-[var(--background)]">
      <div className="container">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text content */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div>
              <span className="section-eyebrow">About me</span>
              <h2 className="section-heading mt-1">
                I craft digital<br />
                <span style={{ color: "var(--muted)" }}>experiences.</span>
              </h2>
            </div>

            <p className="text-[var(--muted)] text-base leading-relaxed max-w-lg">
              I&apos;m Salah Uddin Kader, a Full Stack Developer based in Cox&apos;s
              Bazar, Bangladesh. I specialize in building modern web applications
              with a focus on performance, accessibility, and clean code.
            </p>
            <p className="text-[var(--muted)] text-base leading-relaxed max-w-lg">
              I care about the details — from the architecture of a system to the
              feel of an interaction. Good software should be reliable,
              understandable, and a pleasure to use.
            </p>

            {/* Stats */}
            <div className="flex gap-10 py-6 border-y border-[var(--border)]">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-3xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-outline w-fit">
              Read my story
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Portrait */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border)] group">
              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover img-portrait group-hover:grayscale-0 grayscale-[10%]"
              />
              {/* Subtle corner accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/20 rounded-tl-sm" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/20 rounded-br-sm" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;