"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";
import { MarqueeCard, type TestimonialItem } from "@/components/ui/marquee-card";
import { CursorProvider, Cursor, CursorFollow } from "@/components/ui/cursor";

const FALLBACK_REVIEWS: TestimonialItem[] = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow",
    text: "Salah didn't just build our platform — he genuinely understood the problem. The attention to interaction detail was extraordinary, boosting our conversion by 40%.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Next.js & Architecture",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at Nexus",
    text: "The level of craft Salah brings to his work is rare. Delivers code that actually exceeds expectations. I'd work with him again without hesitation.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Creative Frontend",
  },
  {
    name: "Marcus Thorne",
    role: "Founder at S-Corp",
    text: "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex problems while keeping the UI clean and premium is genuinely rare.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Full Stack Systems",
  },
  {
    name: "Elena Rostova",
    role: "Design Director at Studio A",
    text: "Working with Salah felt effortless. He converted complex Figma designs and 3D scenes into silky smooth 60fps code without skipping a beat.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "UI/UX & GSAP",
  },
  {
    name: "David Kim",
    role: "Head of Engineering at Velo",
    text: "High velocity, immaculate code cleanliness, and top-tier communication throughout our sprint. A true 10x frontend engineer.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "React & TypeScript",
  },
  {
    name: "Sophia Martinez",
    role: "VP of Product at Horizon Labs",
    text: "Salah transformed our rough MVP into a production-grade interface. Responsive, communicative, and exceptionally sharp.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Frontend Architecture",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const Testimonials = () => {
  const [reviews, setReviews] = useState<TestimonialItem[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${apiUrl}/admin/reviews`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Merge API reviews with fallback tags/avatars if missing
          const formatted = data.map((item: any, idx: number) => ({
            _id: item._id,
            name: item.name || "Client",
            role: item.role || "Partner",
            content: item.text || item.content || "",
            avatar:
              item.avatar ||
              FALLBACK_REVIEWS[idx % FALLBACK_REVIEWS.length].avatar,
            rating: item.rating || 5,
            tag: item.tag || FALLBACK_REVIEWS[idx % FALLBACK_REVIEWS.length].tag,
          }));
          setReviews(formatted);
        }
      } catch {
        /* use fallback */
      } finally {
        setLoading(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"));
        }
      }
    };
    fetchReviews();
  }, []);

  // Split reviews into two distinct rows for visual richness
  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.length > 2 ? reviews.slice(half) : reviews;

  return (
    <section
      id="reviews"
      className="section-shell bg-[var(--background)] border-t-[4px] border-[#000000] shadow-[0_-12px_0px_#000000] overflow-hidden text-[var(--foreground)] py-20 min-h-[85vh] lg:min-h-screen flex flex-col justify-center relative"
    >
      <div className="container relative z-10 mb-8 sm:mb-12">
        {/* Header */}
        <div className="section-header-center">
          <span className="section-eyebrow">
            <MessageSquareQuote size={13} className="inline mr-1 -mt-0.5" /> Kind Words
          </span>
          <h2 className="section-heading mt-1">
            What clients say.
          </h2>
          <p className="section-subtext mx-auto mt-4 text-center">
            Real feedback from engineering leads, founders, and designers I&apos;ve had the pleasure of partnering with.
          </p>
        </div>
      </div>

      {/* Marquee with Interactive Cursor Follower */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient edge masks for seamless endless fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />

        <CursorProvider className="relative cursor-default select-none">
          {/* Custom Cursor Ring */}
          <Cursor className="hidden md:flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-[var(--neo-yellow)] bg-black/60 backdrop-blur-sm" />
          </Cursor>

          {/* Spring Floating Follower Tooltip */}
          <CursorFollow
            sideOffset={18}
            align="bottom-right"
            className="hidden md:flex"
            transition={{ stiffness: 450, damping: 35, bounce: 0 }}
          >
            <div className="bg-black text-[var(--neo-yellow)] dark:bg-[var(--neo-yellow)] dark:text-black font-mono font-bold text-[11px] px-3 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles size={12} className="animate-spin" />
              <span>Hover to Pause</span>
            </div>
          </CursorFollow>

          {/* Row 1 - Leftward Marquee */}
          <div className="py-2">
            <MarqueeCard
              testimonials={firstRow.length ? firstRow : reviews}
              speed="normal"
              pauseOnHover={true}
            />
          </div>

          {/* Row 2 - Rightward (Reverse) Marquee */}
          <div className="py-2">
            <MarqueeCard
              testimonials={secondRow.length ? secondRow : reviews}
              speed="slow"
              reverse={true}
              pauseOnHover={true}
            />
          </div>
        </CursorProvider>
      </div>

      {/* Bottom CTA */}
      <div className="container relative z-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/reviews"
            className="btn-primary group inline-flex items-center gap-2"
          >
            <span>Read All Client Reviews</span>
            <ArrowRight
              size={15}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[var(--neo-yellow)] text-[var(--neo-yellow)]" />
              ))}
            </div>
            <span>5.0 / 5.0 Rating from 20+ projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
