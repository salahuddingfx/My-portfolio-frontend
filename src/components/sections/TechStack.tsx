"use client";

import dynamic from "next/dynamic";

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

        {/* 3D Sphere — rendered on both mobile and desktop with touch pass-through on mobile to keep scrolling fluid! */}
        <div className="w-full h-[280px] lg:h-[380px] relative z-20 pointer-events-none lg:pointer-events-auto cursor-grab active:cursor-grabbing">
          <TechSphere />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
