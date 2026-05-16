"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Folder } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const FALLBACK_PROJECTS = [
  {
    title: "Vortex OS",
    desc: "A high-performance cloud infrastructure dashboard with real-time telemetry and neural threat detection.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Three.js", "Node.js", "AWS"],
    links: { live: "#", source: "#" }
  },
  {
    title: "Nexus Intelligence",
    desc: "Enterprise-grade AI integration platform for automated logistics and supply chain optimization.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "Python", "TensorFlow", "Redis"],
    links: { live: "#", source: "#" }
  },
  {
    title: "Aether Engine",
    desc: "A 3D rendering engine for the web capable of handling complex lighting and material physics.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    tags: ["WebGL", "GLSL", "TypeScript", "WASM"],
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
    <section id="projects" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <span className="section-kicker mx-auto">Portfolio</span>
          <h2 className="section-title !mb-0 leading-[0.9]">
            Selected <span className="text-accent">Works.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium tracking-tight mt-8">
            A curated selection of high-performance digital architectures, built with cutting-edge technologies and creative precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Folder Tab Aesthetic */}
              <div className="flex items-end mb-[-1px] ml-6">
                <div className="px-6 py-2.5 bg-white/[0.03] border-t border-l border-r border-white/10 rounded-t-2xl relative z-10 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Case Study {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="h-5 w-12 bg-black border-b border-white/10 skew-x-[35deg] translate-x-[-15px] opacity-40"></div>
              </div>

              {/* Folder Body */}
              <div className="premium-card p-0 flex flex-col border border-white/10 group-hover:border-accent/30 transition-all duration-700 overflow-hidden shadow-2xl h-full">
                <div className="inner-glow" />
                
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
                  
                  {/* Floating Tech Tags */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/80 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-xl">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 lg:p-14 space-y-8 flex-1 flex flex-col relative z-10">
                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl lg:text-4xl font-black font-display tracking-tighter text-white group-hover:text-accent transition-colors duration-500 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-white/40 group-hover:text-white/70 text-lg leading-relaxed line-clamp-3 font-medium transition-colors duration-500 tracking-tight">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-white/5">
                    <a 
                      href={project.links?.live} 
                      className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-accent transition-all duration-500"
                    >
                      <ExternalLink size={16} /> View Live
                    </a>
                    <a 
                      href={project.links?.source} 
                      className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-500"
                    >
                      <Code2 size={16} /> Github
                    </a>
                  </div>
                </div>
              </div>

              {/* Dynamic Glow */}
              <div className="absolute -inset-6 bg-accent/5 blur-[100px] rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
