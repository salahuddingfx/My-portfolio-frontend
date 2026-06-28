"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Wand2,
  Layers,
  Database,
  Globe,
  Smartphone,
  Palette,
  Server,
  Shield,
  Zap,
  GitBranch,
  Brain,
  type LucideIcon,
} from "lucide-react";

/* ─── Icon Map ─────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Wand2, Layers, Database, Globe, Smartphone,
  Palette, Server, Shield, Zap, GitBranch, Brain,
  Code: Code2,
  Wand: Wand2,
  Layer: Layers,
  Db: Database,
  Web: Globe,
  Mobile: Smartphone,
  Design: Palette,
  ServerIcon: Server,
  Security: Shield,
  Speed: Zap,
  Git: GitBranch,
  BrainIcon: Brain,
};

function resolveIcon(name?: string): LucideIcon {
  if (!name) return Code2;
  return ICON_MAP[name] || ICON_MAP[name.replace(/\s+/g, "")] || Code2;
}

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  tags: string[];
  order: number;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _id: "f1",
    title: "Full Stack Engineering",
    description: "End-to-end development of scalable web applications using React, Next.js, and Node.js. From database design to deployment.",
    price: "Contact for pricing",
    icon: "Code2",
    tags: ["React", "Next.js", "Node", "MongoDB"],
    order: 1,
  },
  {
    _id: "f2",
    title: "Creative Development",
    description: "Building immersive, interactive experiences with WebGL, Three.js, and GSAP. Motion design that captivates users.",
    price: "Contact for pricing",
    icon: "Wand2",
    tags: ["Three.js", "GSAP", "WebGL", "Framer Motion"],
    order: 2,
  },
  {
    _id: "f3",
    title: "Systems Architecture",
    description: "Designing robust, high-performance system architectures for enterprise scale. Docker, microservices, and cloud infrastructure.",
    price: "Contact for pricing",
    icon: "Layers",
    tags: ["AWS", "Docker", "Microservices", "Redis"],
    order: 3,
  },
  {
    _id: "f4",
    title: "Database Optimization",
    description: "Designing high-performance, secure database schemas with optimized indexing, caching, and security hardening.",
    price: "Contact for pricing",
    icon: "Database",
    tags: ["PostgreSQL", "Mongoose", "Redis", "Security"],
    order: 4,
  },
  {
    _id: "f5",
    title: "AI & ML Integrations",
    description: "Integrating LLMs, training custom machine learning models, and building agentic AI workflows.",
    price: "Contact for pricing",
    icon: "BrainIcon",
    tags: ["OpenAI", "TensorFlow", "NLP", "LangChain"],
    order: 5,
  },
  {
    _id: "f6",
    title: "UI/UX & Prototyping",
    description: "Crafting beautiful, high-fidelity design systems and interactive interfaces focused on user engagement.",
    price: "Contact for pricing",
    icon: "Design",
    tags: ["Figma", "Design Systems", "Prototyping", "Aesthetics"],
    order: 6,
  },
];

const TAG_COLORS = ["var(--neo-yellow)", "var(--neo-cyan)", "var(--neo-green)", "var(--neo-pink)"];

const ease = [0.16, 1, 0.3, 1] as const;

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) { setServices(FALLBACK_SERVICES); setLoading(false); return; }
        const res = await fetch(`${apiUrl}/admin/services`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.sort((a: ServiceItem, b: ServiceItem) => a.order - b.order));
        } else {
          setServices(FALLBACK_SERVICES);
        }
      } catch {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const displayServices = useMemo(() => {
    return services.length > 0 ? services : FALLBACK_SERVICES;
  }, [services]);

  return (
    <section
      id="services"
      className="section-shell"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <div className="container">
        {/* ═══════ HEADER ═══════ */}
        <div className="section-header-center">
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#000000",
              marginBottom: "var(--space-4)",
              padding: "6px 14px",
              background: "var(--neo-yellow)",
              border: "3px solid var(--foreground)",
              boxShadow: "3px 3px 0px var(--foreground)",
            }}
          >
            Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontSize: "var(--text-display)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "var(--space-6)",
              margin: "0 0 var(--space-6) 0",
            }}
          >
            What I do{" "}
            <span style={{
              color: "var(--neo-yellow)",
              fontFamily: "var(--font-pixel)",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}>
              best
            </span>
            .
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{
              fontSize: "var(--text-base)",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              margin: "0 auto",
            }}
          >
            Specialized in full-stack development — from idea to shipped product.
          </motion.p>
        </div>

        {/* ═══════ LOADING ═══════ */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: "280px", borderRadius: "var(--radius-lg)" }} />
            ))}
          </div>
        )}

        {/* ═══════ SERVICE CARDS ═══════ */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayServices.map((service, i) => {
              const Icon = resolveIcon(service.icon);
              const isHovered = hoveredIdx === i;
              const tagColor = TAG_COLORS[i % TAG_COLORS.length];

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    position: "relative",
                    background: "var(--surface)",
                    border: "3px solid var(--foreground)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    padding: "clamp(1.5rem, 3vw, 2rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    boxShadow: isHovered ? "8px 8px 0px var(--foreground)" : "5px 5px 0px var(--foreground)",
                    transform: isHovered ? "translate(-3px, -3px)" : "none",
                    transition: "box-shadow 0.35s, transform 0.35s",
                    cursor: "default",
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                    background: tagColor,
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />

                  {/* Number + Icon */}
                  <div className="flex items-center justify-between">
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700,
                      color: "var(--muted-soft)", letterSpacing: "0.1em",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.div
                      animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, ease }}
                      style={{
                        width: "48px", height: "48px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isHovered ? tagColor : "var(--surface-2)",
                        border: "3px solid var(--foreground)",
                        boxShadow: isHovered ? "4px 4px 0px var(--foreground)" : "3px 3px 0px var(--foreground)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--foreground)",
                        transition: "background 0.25s, box-shadow 0.25s",
                      }}
                    >
                      <Icon size={22} strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 800,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    margin: 0,
                  }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: "14px", color: "var(--muted)", lineHeight: 1.7,
                    flex: 1, margin: 0,
                  }}>
                    {service.description}
                  </p>

                  {/* Price */}
                  {service.price && (
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700,
                      color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {service.price}
                    </div>
                  )}

                  {/* Tags */}
                  {service.tags && service.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {service.tags.map((t, ti) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.08, y: -1 }}
                          style={{
                            fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700,
                            letterSpacing: "0.04em", color: "#000000",
                            background: TAG_COLORS[ti % TAG_COLORS.length],
                            padding: "4px 10px", border: "2px solid var(--foreground)",
                            borderRadius: "var(--radius-sm)", boxShadow: "2px 2px 0px var(--foreground)",
                            display: "inline-block", whiteSpace: "nowrap",
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Divider + Link */}
                  <div style={{
                    borderTop: "3px solid var(--foreground)",
                    paddingTop: "16px", marginTop: "auto",
                  }}>
                    <Link
                      href="/services"
                      aria-label={`Learn more about ${service.title}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: isHovered ? "var(--foreground)" : "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      <span>Learn more</span>
                      <motion.span
                        animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
