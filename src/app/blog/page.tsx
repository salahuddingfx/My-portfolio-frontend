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
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--background)]" style={{ paddingTop: 'var(--navbar-height, 120px)', paddingBottom: '5rem' }}>
      <div className="container">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl"
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-eyebrow">Writing</span>
          <h1 className="section-heading mt-1" style={{ marginBottom: '1rem' }}>
            Thoughts & insights.
          </h1>
          <p className="section-subtext text-sm">
            Notes on engineering, design, and the craft of building good software.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap" style={{ gap: '0.5rem', marginBottom: '2.5rem' }}>
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
        <div className="flex flex-col" style={{ gap: '1rem' }}>
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
          className="card p-8 md:p-10"
          style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}
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
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full bg-white/[0.02] border rounded-[var(--radius-md)] px-4 pt-5 pb-1.5 text-sm text-white focus:outline-none transition-all duration-200"
                  style={{ 
                    borderColor: emailFocused ? 'var(--accent)' : 'var(--border)',
                    height: '50px'
                  }}
                />
                <span
                  className="absolute left-4 pointer-events-none transition-all duration-200"
                  style={{
                    top: (emailFocused || email) ? '6px' : '15px',
                    fontSize: (emailFocused || email) ? '10px' : '14px',
                    color: emailFocused 
                      ? 'var(--accent)' 
                      : (email ? 'var(--muted)' : 'rgba(255, 255, 255, 0.45)'),
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  your@email.com
                </span>
              </div>
              <button className="btn-primary whitespace-nowrap" style={{ height: '50px' }}>
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
