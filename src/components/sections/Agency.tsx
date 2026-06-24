"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Palette, TrendingUp, Code } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const SERVICES = [
  { icon: Code, label: "Software Development" },
  { icon: Globe, label: "Web & Apps" },
  { icon: Palette, label: "Graphic Design" },
  { icon: TrendingUp, label: "Marketing" },
];

const Agency = () => {
  return (
    <section className="section-shell bg-[var(--surface)] border-y-[4px] border-[#000000]">
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
          <div
            className="relative overflow-hidden border-[3px] border-[#000000] bg-[var(--background)]"
            style={{
              borderRadius: "var(--radius-lg)",
              boxShadow: "6px 6px 0px #000000",
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Corner accents */}
            <div
              className="absolute top-4 left-4 w-6 h-6 border-t-[2px] border-l-[2px] border-[var(--neo-yellow)] opacity-60"
              style={{ borderRadius: "var(--radius-sm)" }}
            />
            <div
              className="absolute bottom-4 right-4 w-6 h-6 border-b-[2px] border-r-[2px] border-[var(--neo-yellow)] opacity-60"
              style={{ borderRadius: "var(--radius-sm)" }}
            />

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Text */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 mb-1" style={{ width: "fit-content" }}>
                  <span
                    className="inline-flex items-center gap-2 border-[2px] border-[#000000] bg-[var(--neo-green)]"
                    style={{ boxShadow: "2px 2px 0px #000000", borderRadius: "var(--radius-sm)", padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 14px)" }}
                  >
                    <span className="h-1.5 w-1.5 bg-[#000000] rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#000000]">
                      My Agency
                    </span>
                  </span>
                </div>

                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] uppercase leading-[0.95]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Nextora<br />Studio.
                </h2>

                <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl">
                  A digital agency building software, websites, and digital products.
                  We also provide graphic design and marketing services to help
                  brands stand out.
                </p>

                {/* Services pills */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {SERVICES.map((s) => (
                    <span
                      key={s.label}
                      className="inline-flex items-center gap-2 border-[2px] border-[#000000] bg-[var(--surface)] text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)]"
                      style={{ boxShadow: "2px 2px 0px #000000", borderRadius: "var(--radius-sm)", padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 14px)" }}
                    >
                      <s.icon size={12} className="text-[var(--neo-yellow)]" />
                      {s.label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-3">
                  <a
                    href="https://nextorastudio.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-[3px] border-[#000000] bg-[var(--neo-yellow)] text-[#000000] text-xs font-bold uppercase tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                    style={{ boxShadow: "4px 4px 0px #000000", borderRadius: "var(--radius-md)", textDecoration: "none", padding: "clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)" }}
                  >
                    Visit nextorastudio.tech
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Owner card */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  className="relative w-full max-w-sm border-[3px] border-[#000000] bg-[var(--surface)] flex flex-col items-center text-center gap-4"
                  style={{ boxShadow: "5px 5px 0px #000000", borderRadius: "var(--radius-lg)", padding: "clamp(1.5rem, 4vw, 2rem)" }}
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center bg-[var(--neo-yellow)] border-[3px] border-[#000000]"
                    style={{ boxShadow: "3px 3px 0px #000000", borderRadius: "var(--radius-md)" }}
                  >
                    <span
                      className="text-2xl font-black text-[#000000] italic"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      N
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-lg font-extrabold uppercase tracking-tight text-[var(--foreground)]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Nextora Studio
                    </p>
                    <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mt-1">
                      Digital Agency
                    </p>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 border-[2px] border-[#000000] bg-[var(--surface-2)]"
                    style={{ boxShadow: "2px 2px 0px #000000", borderRadius: "var(--radius-sm)", padding: "clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)" }}
                  >
                    <span className="h-2 w-2 bg-[var(--neo-green)] rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--foreground)]">
                      Founder & Owner
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Software, websites, graphic design & marketing — all under one roof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Agency;
