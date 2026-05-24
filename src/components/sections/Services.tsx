"use client";

import { ArrowUpRight, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  tags: string[];
  order: number;
}

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(`${apiUrl}/admin/services`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data.sort((a: ServiceItem, b: ServiceItem) => a.order - b.order));
        }
      } catch {
      } finally {
        setLoading(false);
        setTimeout(() => {
          if (typeof window !== "undefined") {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              ScrollTrigger.refresh();
            });
          }
        }, 100);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="section-shell bg-[var(--background)]">
      <div className="container">

        {/* Header - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow">Services</span>
          <h2 className="section-heading mt-1">
            What I do best.
          </h2>
          <p className="section-subtext mx-auto mt-4 text-center">
            Specialized in full-stack development — from idea to shipped product.
          </p>
        </div>

        {/* Service cards */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card card-hover group flex flex-col h-full"
              >
                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-6 w-full">
                  <span className="text-xs font-mono text-[var(--muted-soft)] tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {service.icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)] border border-[var(--border)] group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/10 text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      {service.icon}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-semibold text-[var(--foreground)] mb-3 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow mb-6">
                  {service.description}
                </p>

                {/* Price */}
                {service.price && (
                  <div className="text-xs font-mono text-[var(--accent)] mb-5 uppercase tracking-widest">
                    {service.price}
                  </div>
                )}

                {/* Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {service.tags.map((t) => (
                      <span
                        key={t}
                        className="badge bg-[var(--surface-2)] border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-all duration-300 text-[10px] tracking-wider uppercase font-mono px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                <div className="border-t border-[var(--border)] pt-5 mt-auto">
                  <Link
                    href="/services"
                    aria-label={`Learn more about ${service.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300 group/link"
                  >
                    <span>Learn more about {service.title}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
