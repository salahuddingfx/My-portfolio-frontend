"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";
import { MarqueeCard, type TestimonialItem } from "@/components/ui/marquee-card";

const FALLBACK_REVIEWS: TestimonialItem[] = [
  {
    name: "Alex Rivera",
    role: "CTO @ TechFlow",
    content:
      "Salah is a visionary developer. He didn't just build our platform — he genuinely understood the architecture. The interaction detail boosted our conversion by 40%.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Next.js & 3D",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager @ Nexus",
    content:
      "The level of craft Salah puts into his code and 3D interactions is simply unmatched. A true 'Digital Architect' in every sense of the word. I'd work with him again without hesitation.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Creative Frontend",
  },
  {
    name: "Marcus Thorne",
    role: "Founder @ S-Corp",
    content:
      "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex engineering problems while keeping the UI absolutely premium is rare. An invaluable partner.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Full Stack",
  },
  {
    name: "Elena Rostova",
    role: "Design Director @ Studio A",
    content:
      "Working with Salah felt effortless. He converted complex Figma designs and custom Three.js shaders into silky smooth 60fps code without skipping a single detail.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "GSAP & WebGL",
  },
  {
    name: "David Kim",
    role: "Head of Engineering @ Velo",
    content:
      "High velocity, immaculate code cleanliness, and top-tier communication throughout our sprint. Salah delivers like an entire frontend team in one person.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "TypeScript Architecture",
  },
  {
    name: "Sophia Martinez",
    role: "VP of Product @ Horizon",
    content:
      "Salah transformed our rough MVP into a production-grade interface that wowed our investors. Responsive, communicative, and exceptionally sharp.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "UI/UX & Systems",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
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
          const formatted = data.map((item: any, idx: number) => ({
            _id: item._id,
            name: item.name || "Client",
            role: item.role || item.company ? `${item.role} @ ${item.company}` : "Partner",
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
        /* fallback */
      } finally {
        setLoading(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"));
        }
      }
    };
    fetchReviews();
  }, []);

  return (
    <section
      id="reviews"
      className="relative bg-[var(--background)] border-t-[4px] border-[#000000] shadow-[0_-12px_0px_#000000] text-[var(--foreground)] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 z-[var(--z-base)] overflow-hidden"
    >
      {/* ═══════ HEADER ═══════ */}
      <div className="container relative z-10 mb-8 sm:mb-10">
        <div className="section-header-center">
          <span className="section-eyebrow">
            <MessageSquareQuote size={13} className="inline mr-1 -mt-0.5" /> Kind Words
          </span>
          <h2 className="section-heading mt-2">
            What clients say.
          </h2>
          <p className="section-subtext mx-auto mt-3 text-center">
            Real feedback from engineering leads, founders, and designers I&apos;ve had the pleasure of partnering with.
          </p>
        </div>
      </div>

      {/* ═══════ MARQUEE CARDS ═══════ */}
      <div className="relative w-full overflow-hidden my-2 py-3">
        {/* Gradient edge masks for clean, seamless fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />

        <MarqueeCard
          testimonials={reviews}
          speed="normal"
          pauseOnHover={true}
        />
      </div>

      {/* ═══════ BOTTOM CTA ═══════ */}
      <div className="container relative z-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 sm:mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/reviews"
            className="btn-primary group inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Read All Client Reviews</span>
            <ArrowRight
              size={15}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)]">
            <div className="flex -space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[var(--neo-yellow)] text-[#000000]" />
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
