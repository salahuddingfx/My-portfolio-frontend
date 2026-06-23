"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Heart, CheckCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewItem {
  _id?: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow",
    text: "Salah didn't just build our platform — he genuinely understood the problem. The attention to interaction detail was extraordinary, and the result boosted our conversion by 40%.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at Nexus",
    text: "The level of craft Salah brings to his work is rare. He asks the right questions, communicates clearly, and delivers something that actually exceeds expectations. I'd work with him again without hesitation.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Founder at S-Corp",
    text: "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex problems while keeping the UI clean and premium is genuinely rare. An invaluable partner.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    rating: 5,
  },
];

const Stars = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-[var(--neo-yellow)] fill-[var(--neo-yellow)]" : "text-[var(--muted-soft)]"}
      />
    ))}
  </div>
);

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(FALLBACK_REVIEWS);
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
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      } catch {
        // use fallback
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Back Link */}
        <div className="mb-10">
          <Link 
            href="/#reviews" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="section-eyebrow mb-4 block">Testimonials</span>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Kind words from clients.
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
            Here's what clients and partners have to say about working with me on frontend architecture, full stack systems, LLM integrations, and custom database designs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 max-w-4xl">
          <div className="flex items-center gap-4 p-5 bg-[var(--surface)] border-2 border-[var(--border)] shadow-[4px_4px_0px_#000]">
            <div className="flex h-11 w-11 items-center justify-center bg-[var(--neo-yellow)]/10 text-[var(--neo-yellow)] border border-[var(--border)]">
              <Star size={20} className="fill-[var(--neo-yellow)]" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none">5.0 / 5.0</p>
              <p className="text-xs text-[var(--muted)] mt-1 font-mono uppercase tracking-wider">Average Rating</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-[var(--surface)] border-2 border-[var(--border)] shadow-[4px_4px_0px_#000]">
            <div className="flex h-11 w-11 items-center justify-center bg-[var(--neo-green)]/10 text-[var(--neo-green)] border border-[var(--border)]">
              <Heart size={20} className="fill-[var(--neo-green)]" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none">100%</p>
              <p className="text-xs text-[var(--muted)] mt-1 font-mono uppercase tracking-wider">Recommendation</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-[var(--surface)] border-2 border-[var(--border)] shadow-[4px_4px_0px_#000]">
            <div className="flex h-11 w-11 items-center justify-center bg-[var(--neo-cyan)]/10 text-[var(--neo-cyan)] border border-[var(--border)]">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-lg font-bold leading-none">Verified</p>
              <p className="text-xs text-[var(--muted)] mt-1 font-mono uppercase tracking-wider">Client Reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="p-6 sm:p-8 border-2 border-[var(--border)] bg-[var(--surface)] flex flex-col gap-6 shadow-[4px_4px_0px_#000]"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="skeleton h-3.5 w-3.5" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-11/12" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-4 w-4/5" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t-2 border-[var(--border)] mt-auto">
                  <div className="skeleton h-10 w-10" />
                  <div className="space-y-1">
                    <div className="skeleton h-3.5 w-24" />
                    <div className="skeleton h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={review._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col justify-between p-6 sm:p-8 border-2 border-[var(--border)] bg-[var(--surface)] shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <Stars rating={review.rating} />
                    <CheckCircle size={16} className="text-[var(--neo-green)] opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-sm sm:text-base text-[var(--foreground)] font-light leading-relaxed italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </blockquote>
                </div>

                <div className="flex items-center gap-3.5 pt-5 border-t-2 border-[var(--border)] mt-auto">
                  <div className="relative w-10 h-10 overflow-hidden bg-[var(--surface-2)] border-2 border-[var(--border)] shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)] leading-none">{review.name}</p>
                    <p className="text-xs text-[var(--neo-yellow)] mt-1.5 font-bold tracking-wider uppercase">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
