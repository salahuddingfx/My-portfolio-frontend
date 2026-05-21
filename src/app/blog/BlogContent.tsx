"use client";

import BlogCard from "@/components/ui/BlogCard";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

const PER_PAGE = 5;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  readTime: string;
  publishedAt: string;
  order: number;
}

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const categories = useMemo(() => {
    const list = posts.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(0, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(`${apiUrl}/admin/blog-posts`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data.sort((a: BlogPost, b: BlogPost) => a.order - b.order));
        }
      } catch {
        // keep empty
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main
      className="min-h-screen bg-[var(--background)]"
      style={{
        paddingTop: "calc(var(--navbar-height) + var(--space-8))",
        paddingBottom: "var(--space-20)",
      }}
    >
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ marginBottom: '2.5rem' }}>
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
              {categories.map((cat) => (
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
          )}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-56 bg-white/[0.06] border border-white/10 rounded-[var(--radius-md)] pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--accent)] transition-all"
            />
          </div>
        </div>

        {/* Post list */}
        <div className="flex flex-col" style={{ gap: '1rem' }}>
          {loading ? (
            <div className="py-16 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading articles...</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="card card-large text-center">
              <p className="text-sm text-[var(--muted)]">{searchQuery ? 'No matching articles.' : 'No articles yet. Check back later.'}</p>
            </div>
          ) : (
            paginated.map((post, i) => (
              <BlogCard
                key={post._id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt || ''}
                readTime={post.readTime || ''}
                category={post.category}
                image={post.image}
                slug={post.slug}
                index={i}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {filtered.length > PER_PAGE && page < totalPages && (
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-8 py-4 border border-[var(--border)] rounded-[var(--radius-md)] text-xs font-mono uppercase tracking-widest text-[var(--muted)] hover:text-white hover:border-[var(--border-hover)] transition-all"
            >
              Load more ({filtered.length - page * PER_PAGE} remaining)
            </button>
          </div>
        )}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="card card-large"
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
