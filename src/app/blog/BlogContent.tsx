"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "@/components/ui/BlogCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BLOGS_PER_PAGE = 2; // set to 2 so pagination is easily visible with 5 seeded posts!

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
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch posts
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

  // 2. Search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Derive categories
  const categories = useMemo(() => {
    const list = posts.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [posts]);

  // 4. Filtering logic
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

  // 5. Pagination logic
  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const paginated = useMemo(() => {
    return filtered.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE);
  }, [filtered, currentPage]);

  // Reset pagination page on filter or search updates
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // 6. GSAP Entrance Header animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const elements = headerRef.current?.querySelectorAll(".animate-fade-up");
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [loading]);

  // 7. Cinematic Scroll-Scrub Animation (Ease In / Ease Out)
  useEffect(() => {
    if (loading || paginated.length === 0) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const runAnimations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (cancelled) return;

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.startsWith("blog-page-card-")) {
          trigger.kill();
        }
      });

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
        cards.forEach((card, index) => {
          // Entrance
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none none",
                id: `blog-page-card-enter-${index}`,
              }
            }
          );

          // Exit
          gsap.fromTo(
            card,
            { opacity: 1, y: 0, scale: 1 },
            {
              opacity: 0,
              y: -80,
              scale: 0.95,
              ease: "power1.in",
              scrollTrigger: {
                trigger: card,
                start: "top 12%",
                end: "top -12%",
                scrub: 1,
                id: `blog-page-card-exit-${index}`,
              }
            }
          );
        });

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }, containerRef);
    };

    runAnimations();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [loading, paginated]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[var(--background)]"
      style={{
        paddingTop: "clamp(120px, 10vw, 170px)",
        paddingBottom: "var(--space-20)",
      }}
    >
      <div className="container">

        {/* Page Header */}
        <div
          ref={headerRef}
          className="max-w-2xl"
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="animate-fade-up archive-badge inline-flex items-center gap-2 mb-4">
            <Sparkles size={10} />
            <span>Writing</span>
          </div>
          <h1 className="animate-fade-up text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] font-space-grotesk" style={{ marginBottom: '1.5rem' }}>
            Thoughts & insights.
          </h1>
          <p className="animate-fade-up text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-normal">
            Notes on engineering, design, and the craft of building good software.
          </p>
        </div>

        {/* Filter & Search Panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[var(--border)]" style={{ marginBottom: '3.5rem' }}>
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          
          {/* Search Input */}
          <div className="relative flex items-center w-full md:w-72 group">
            <Search 
              size={14} 
              className="absolute left-3.5 text-[var(--muted-soft)] group-focus-within:text-[var(--accent)] transition-colors duration-200 pointer-events-none" 
            />
            <input
              type="text"
              placeholder="Search articles... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--navbar-btn-bg)] border border-[var(--border)] rounded-[var(--radius-md)] pl-9 pr-14 py-2.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-soft)] transition-all duration-300 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-9 p-1 rounded-full text-[var(--muted-soft)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                title="Clear search"
              >
                <X size={10} />
              </button>
            )}
            <span className="absolute right-3 px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[9px] font-mono text-[var(--muted-soft)] tracking-wider pointer-events-none group-focus-within:opacity-0 transition-opacity">
              /
            </span>
          </div>
        </div>

        {/* Main Display Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Loading articles...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="container py-24 text-center">
            <p className="text-sm text-[var(--muted)] font-mono uppercase tracking-widest">
              {searchQuery ? 'No matching articles.' : 'No articles yet. Check back later.'}
            </p>
          </div>
        ) : (
          <div className="container pb-32 projects-grid-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {paginated.map((post, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={post._id || index}
                    className={`project-card-wrapper ${isEven ? "" : "md:mt-16"}`}
                  >
                    <BlogCard
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.publishedAt || ''}
                      readTime={post.readTime || ''}
                      category={post.category}
                      image={post.image}
                      slug={post.slug}
                      index={(currentPage - 1) * BLOGS_PER_PAGE + index}
                    />
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-24">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      containerRef.current?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] cursor-pointer"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => {
                      setCurrentPage(pNum);
                      containerRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer ${
                      currentPage === pNum
                        ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/15 scale-[1.05]"
                        : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    {pNum}
                  </button>
                ))}

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      containerRef.current?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="project-grid-card"
          style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
                  className="w-full bg-[var(--navbar-btn-bg)] border rounded-[var(--radius-md)] px-4 pt-5 pb-1.5 text-sm text-[var(--foreground)] focus:outline-none transition-all duration-200"
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
                      : (email ? 'var(--muted)' : 'var(--muted-soft)'),
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
