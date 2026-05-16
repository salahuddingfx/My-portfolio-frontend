"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const FALLBACK_PROJECTS = [
  {
    title: "Vortex OS",
    desc: "A high-performance cloud infrastructure dashboard with real-time telemetry and neural threat detection.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["REACT", "THREE.JS", "NODE.JS", "AWS"],
    links: { live: "#", source: "#" }
  },
  {
    title: "Nexus Intelligence",
    desc: "Enterprise-grade AI integration platform for automated logistics and supply chain optimization.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["NEXT.JS", "PYTHON", "TENSORFLOW", "REDIS"],
    links: { live: "#", source: "#" }
  },
  {
    title: "Aether Engine",
    desc: "A 3D rendering engine for the web capable of handling complex lighting and material physics.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    tags: ["WEBGL", "GLSL", "TYPESCRIPT", "WASM"],
    links: { live: "#", source: "#" }
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${apiUrl}/admin/projects`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.warn("Using fallback projects due to API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="section-shell relative overflow-hidden bg-background">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-white/10 pb-16">
          <div className="space-y-6">
            <span className="kicker block">[ ARCHIVE ]</span>
            <h2 className="text-[12vw] lg:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
              SELECTED<br/>
              <span className="text-accent">WORKS</span>
            </h2>
          </div>
          <p className="text-xl text-white/50 max-w-md font-bold tracking-tight uppercase">
            A curated selection of high-performance digital architectures, built with cutting-edge technologies.
          </p>
        </div>

        {/* Projects List - Brutalist Row Layout */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              
              {/* Image Block */}
              <div className={`lg:col-span-7 relative aspect-[16/10] border-2 border-white/10 overflow-hidden bg-surface ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-accent mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
              </div>

              {/* Content Block */}
              <div className={`lg:col-span-5 flex flex-col justify-center space-y-10 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                
                <div className="space-y-6 border-l-2 border-accent pl-6">
                  <span className="kicker block text-white/40">
                    [ RECORD_{String(i + 1).padStart(2, "0")} ]
                  </span>
                  <h3 className="text-5xl lg:text-7xl font-black font-display tracking-tighter text-white uppercase leading-[0.85]">
                    {project.title}
                  </h3>
                </div>

                <p className="text-white/60 text-xl font-bold tracking-tight uppercase leading-relaxed max-w-md">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-4">
                  {project.tags.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="kicker text-white/30 group-hover:text-white transition-colors duration-500">
                      [{tag}]
                    </span>
                  ))}
                </div>

                <div className="pt-8 border-t-2 border-white/10 flex gap-8">
                  <a 
                    href={project.links?.live} 
                    className="flex items-center gap-2 kicker text-white hover:text-accent transition-colors"
                  >
                    [ DEPLOYMENT ] <ArrowUpRight size={16} />
                  </a>
                  <a 
                    href={project.links?.source} 
                    className="flex items-center gap-2 kicker text-white/40 hover:text-white transition-colors"
                  >
                    [ SOURCE_CODE ] <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
