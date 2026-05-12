"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Folder } from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";
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
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="section-kicker">Portfolio</span>
          <h2 className="section-title">
            Selected <span className="text-accent">Works.</span>
          </h2>
          <p className="section-copy mx-auto">
            A collection of premium projects built with modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Folder Tab Effect */}
              <div className="flex items-end mb-[-1px]">
                <div className="px-6 py-2 bg-[#111] border-t border-l border-r border-white/5 rounded-t-xl relative z-10 flex items-center gap-3">
                  <Folder size={14} className="text-accent" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">Project {String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="h-4 w-12 bg-black border-b border-white/5 skew-x-[30deg] translate-x-[-15px]"></div>
              </div>

              {/* Main Folder Body */}
              <div className="premium-card p-0 flex flex-col border border-white/5 group-hover:border-accent/30 bg-[#0a0a0a] transition-all duration-500 overflow-hidden shadow-2xl">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-bold font-display tracking-tight text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-medium">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/20 border border-white/5 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pt-6 border-t border-white/5">
                    <a 
                      href={project.links?.live} 
                      className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                    >
                      <ExternalLink size={14} className="group-hover/link:text-accent transition-colors" /> Live Demo
                    </a>
                    <a 
                      href={project.links?.source} 
                      className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                    >
                      <Code2 size={14} className="group-hover/link:text-accent transition-colors" /> Source
                    </a>
                  </div>
                </div>
              </div>

              {/* Stacked Shadow Effect */}
              <div className="absolute -inset-2 bg-accent/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
