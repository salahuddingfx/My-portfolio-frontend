"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const TechSphere = dynamic(() => import("../canvas/TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-white/[0.05] border-t-accent animate-spin" />
    </div>
  ),
});

const techCategories = [
  { 
    title: "Frontend",  
    desc: "Building immersive client-side experiences",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] 
  },
  { 
    title: "Backend",   
    desc: "Robust architecture and database management",
    skills: ["Node.js", "Express", "Python", "Django", "PHP", "MySQL"]  
  },
  { 
    title: "DevOps & Tools",     
    desc: "Deployment, automation, and environments",
    skills: ["Git", "Docker", "Vercel", "AWS", "Linux"]        
  },
  { 
    title: "Design",    
    desc: "Prototyping and high-fidelity mockups",
    skills: ["Figma", "Adobe XD", "Photoshop", "UI/UX"]    
  },
];

const TechStack = () => {
  return (
    <section id="tech" className="section-shell relative bg-black overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <span className="section-kicker mx-auto">Capabilities</span>
          <h2 className="section-title !mb-0">
            Technical <span className="text-accent">Ecosystem.</span>
          </h2>
          <p className="section-copy mx-auto">
            A comprehensive stack of modern technologies and tools I use to build 
            high-performance digital solutions.
          </p>
        </div>

        {/* 3D Sphere */}
        <div className="w-full h-[500px] lg:h-[700px] relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing mb-20 lg:mb-32">
          <TechSphere />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="premium-card p-8 group border-white/5 bg-white/[0.01]"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">
                {cat.title}
              </h3>
              <p className="text-sm text-white/40 mb-8 group-hover:text-white/60 transition-colors">
                {cat.desc}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/20 border border-white/5 px-2.5 py-1 rounded-full group-hover:text-white/40 group-hover:border-white/10 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
