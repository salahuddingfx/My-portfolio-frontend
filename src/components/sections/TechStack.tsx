"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import PremiumCard from "@/components/ui/PremiumCard";

const TechSphere = dynamic(() => import("../canvas/TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-white/[0.08] border-t-[#e11d48]/50 animate-spin" />
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
    title: "Tools & DevOps",     
    desc: "Deployment, version control, and environments",
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
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-8">
          <span className="section-kicker mx-auto">Capabilities</span>
          <h2 className="section-title !mb-0">
            Technical <span className="text-accent">Ecosystem.</span>
          </h2>
          <p className="section-copy mx-auto">
            A comprehensive stack of modern technologies and tools I use to build 
            high-performance digital solutions.
          </p>
        </div>

        {/* 3D Sphere Cluster */}
        <div className="w-full h-[600px] relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing">
          <TechSphere />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
