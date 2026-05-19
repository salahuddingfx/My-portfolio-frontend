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
                className="card card-hover group flex flex-col h-full p-8 sm:p-10"
              >
                {/* Number + Icon */}
                <span className="text-xs font-mono text-[var(--muted-soft)] mb-5 flex items-center gap-3">
                  {String(i + 1).padStart(2, "0")}
                  {service.icon && (
                    <span className="text-lg">{service.icon}</span>
                  )}
                </span>

                {/* Title */}
                <h3
                  className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--foreground)] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow mb-5">
                  {service.description}
                </p>

                {/* Price */}
                {service.price && (
                  <div className="text-xs font-mono text-[var(--accent)] mb-4 uppercase tracking-widest">
                    {service.price}
                  </div>
                )}

                {/* Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.map((t) => (
                      <span key={t} className="badge group-hover:border-[var(--border-hover)] group-hover:text-white/60 transition-colors duration-200">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                <div className="border-t border-[var(--border)] pt-5">
                  <Link
                    href="/services"
                    aria-label={`Learn more about ${service.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-white transition-colors duration-200 group/link"
                  >
                    Learn more about {service.title}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
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
