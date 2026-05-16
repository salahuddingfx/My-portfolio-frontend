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
          <h2 className="section-title !mb-0">
            Selected <span className="text-accent">Works.</span>
          </h2>
          <p className="section-copy mx-auto">
            A collection of premium projects built with modern technologies,
            focusing on performance, design, and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Folder Header */}
              <div className="flex items-end mb-[-1px] ml-4">
                <div className="px-5 py-2 bg-[#121212] border-t border-l border-r border-white/10 rounded-t-xl relative z-10 flex items-center gap-2.5">
                  <Folder size={12} className="text-accent" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                    Project {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="h-4 w-10 bg-black border-b border-white/10 skew-x-[35deg] translate-x-[-12px] opacity-50"></div>
              </div>

              {/* Folder Body */}
              <div className="premium-card p-0 flex flex-col border border-white/10 group-hover:border-accent/40 bg-white/[0.02] transition-all duration-700 overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                  
                  {/* Floating Tech Tags on Image */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2.5">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-2xl">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 lg:p-12 space-y-8 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl font-black font-display tracking-tight text-white group-hover:text-accent transition-colors duration-500 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/90 text-[16px] lg:text-[18px] leading-relaxed line-clamp-3 font-medium transition-colors duration-500">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <a 
                      href={project.links?.live} 
                      className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-accent transition-all duration-500"
                    >
                      <ExternalLink size={16} className="text-accent" /> Live View
                    </a>
                    <a 
                      href={project.links?.source} 
                      className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all duration-500"
                    >
                      <Code2 size={16} className="text-white/40 group-hover:text-white transition-colors" /> Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-accent/10 blur-[80px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
