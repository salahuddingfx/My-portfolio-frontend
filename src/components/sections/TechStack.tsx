"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { technologies } from "../canvas/TechSphere";

const TechSphere = dynamic(() => import("../canvas/TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
    </div>
  ),
});

const TechStack = () => {
  return (
    <section 
      id="tech" 
      className="section-shell border-y border-[var(--border)]"
      style={{ 
        backgroundColor: '#111111',
        backgroundImage: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.06) 0%, #111111 100%)' 
      }}
    >
      <div className="container">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-heading mt-1">
            Tools I work with.
          </h2>
          <p className="section-subtext mx-auto text-center">
            A collection of technologies I use to build fast and
            reliable digital products.
          </p>
        </div>

        {/* Desktop: 3D Sphere (completely preserved and interactive) */}
        <div className="hidden lg:block w-full h-[380px] relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing">
          <TechSphere />
        </div>

        {/* Mobile: Grid of technologies (highly performant 120 FPS scrolling) */}
        <div className="lg:hidden grid grid-cols-3 sm:grid-cols-4 gap-4 mt-8 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar pointer-events-auto">
          {technologies.map((tech, i) => (
            <motion.div 
              key={tech.name} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain mb-2 opacity-80" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--muted)] text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
