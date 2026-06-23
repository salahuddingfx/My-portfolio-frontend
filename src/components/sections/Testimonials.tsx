"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK_REVIEWS = [
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

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-50px" },
};

const Stars = ({ rating = 5 }: { rating?: number }) => (
  <div
    className="flex gap-1"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-[var(--accent)] fill-[var(--accent)]" : "text-[var(--muted-soft)]"}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState<typeof FALLBACK_REVIEWS>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) { setLoading(false); return; }
        const res = await fetch(`${apiUrl}/admin/reviews`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      } catch {
        /* use fallback */
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  return (
    <section
      id="reviews"
      className="section-shell bg-[var(--background)] overflow-hidden text-[var(--foreground)]"
    >
      <div className="container relative z-10">

        {/* Header */}
        <div className="section-header-center">
          <span className="section-eyebrow">Kind words</span>
          <h2 className="section-heading mt-1">
            What clients say.
          </h2>
          <p className="section-subtext mx-auto mt-4 text-center">
            Feedback from people I&apos;ve had the pleasure of working with.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border-[3px] border-[#000000] bg-[var(--surface)] shadow-[6px_6px_0px_#000000] p-6 sm:p-8 flex flex-col gap-5"
                style={{ borderRadius: "var(--radius-lg)" }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="skeleton h-3.5 w-3.5" style={{ borderRadius: "var(--radius-sm)" }} />
                  ))}
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="skeleton h-3.5 w-full" />
                  <div className="skeleton h-3.5 w-11/12" />
                  <div className="skeleton h-3.5 w-4/5" />
                </div>
                <div className="flex items-center gap-3 pt-5 border-t-[3px] border-[#000000]">
                  <div className="skeleton h-10 w-10 shrink-0" style={{ borderRadius: "var(--radius-md)" }} />
                  <div className="space-y-2">
                    <div className="skeleton h-3.5 w-24" />
                    <div className="skeleton h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card group flex flex-col h-full"
              >
                {/* Stars */}
                <div className="mb-4">
                  <Stars rating={review.rating} />
                </div>

                {/* Quote */}
                <blockquote className="flex-grow mb-6">
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t-[3px] border-[#000000]">
                  <div className="relative w-10 h-10 overflow-hidden bg-[var(--surface-2)] border-[3px] border-[#000000] shadow-[2px_2px_0px_#000000] shrink-0" style={{ borderRadius: "var(--radius-md)" }}>
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[var(--foreground)] leading-none uppercase tracking-wide">{review.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-1 font-bold tracking-widest uppercase">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 text-center"
        >
          <Link href="/reviews" className="group/cta inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)] uppercase tracking-wider transition-colors duration-200 hover:text-[var(--neo-yellow)]">
            Read all reviews
            <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
