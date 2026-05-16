"use client";

import BlogCard from "@/components/ui/BlogCard";
import { motion } from "framer-motion";
import { useState } from "react";

const CATEGORIES = ["All", "Design", "Engineering", "UX Research"];

const posts = [
  {
    title: "The Future of WebGL in Modern Portfolio Design",
    excerpt: "How 3D graphics and shader programming are redefining user engagement in high-end personal branding.",
    date: "Oct 12, 2024",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
    slug: "future-of-webgl",
  },
  {
    title: "Scaling Node.js Microservices for High Concurrency",
    excerpt: "A practical look at architectural patterns and optimizations for handling significant load in production.",
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026&auto=format&fit=crop",
    slug: "scaling-nodejs-microservices",
  },
  {
    title: "The Case for Dark Mode in Professional Interfaces",
    excerpt: "Why dark interfaces have become standard for professional tools, and how to implement them thoughtfully.",
    date: "Aug 15, 2024",
    readTime: "6 min read",
    category: "UX Research",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    slug: "case-for-dark-mode",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--background)] pt-32 pb-20">
      <div className="container">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 max-w-2xl"
        >
          <span className="section-eyebrow">Writing</span>
          <h1 className="section-heading mt-1 mb-4">
            Thoughts & insights.
          </h1>
          <p className="section-subtext text-sm">
            Notes on engineering, design, and the craft of building good software.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-medium
                transition-colors duration-200
                ${activeCategory === cat
                  ? "bg-white text-black"
                  : "text-[var(--muted)] border border-[var(--border)] hover:text-white hover:border-[var(--border-hover)]"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-4">
          {filtered.map((post, i) => (
            <BlogCard key={post.slug} {...post} index={i} />
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 card p-8 md:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Stay in the loop.
              </h2>
              <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
                Get the latest articles and insights delivered to your inbox.
                No spam, just signal.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.03] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--accent)]/40 transition-colors duration-200"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
