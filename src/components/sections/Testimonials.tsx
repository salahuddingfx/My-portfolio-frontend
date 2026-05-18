"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const FALLBACK_REVIEWS = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow",
    text: "Salah didn't just build our platform — he genuinely understood the problem. The attention to interaction detail was extraordinary, and the result boosted our conversion by 40%.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at Nexus",
    text: "The level of craft Salah brings to his work is rare. He asks the right questions, communicates clearly, and delivers something that actually exceeds expectations. I'd work with him again without hesitation.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Founder at S-Corp",
    text: "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex problems while keeping the UI clean and premium is genuinely rare. An invaluable partner.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
];

const Stars = ({ rating = 5 }: { rating?: number }) => (
  <div
    className="flex gap-0.5"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-[var(--accent)]' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState<typeof FALLBACK_REVIEWS>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const marqueeReviews = reviews.length > 0 ? [...reviews, ...reviews] : reviews;
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i);

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
        setTimeout(() => {
          if (typeof window !== "undefined") {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              ScrollTrigger.refresh();
            });
          }
        }, 100);
      }
    };
    fetch_();
  }, []);

  return (
    <section id="reviews" className="section-shell bg-[var(--background)] !pb-12 md:!pb-16">
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-lg mx-auto" style={{ marginBottom: '3.5rem' }}>
          <span className="section-eyebrow">Kind words</span>
          <h2 className="section-heading mt-1">
            What clients say.
          </h2>
        </div>

        {/* Auto-scroll marquee */}
        {!loading && reviews.length > 0 && (
          <div className="testimonials-marquee">
            <div className="testimonials-track" style={{ "--marquee-duration": `${Math.max(24, reviews.length * 8)}s` } as React.CSSProperties}>
              {marqueeReviews.map((review, i) => {
                const isClone = i >= reviews.length;
                return (
                  <div
                    key={`${review.name}-${i}`}
                    className="testimonial-card card card-hover group flex flex-col h-full p-7"
                    aria-hidden={isClone}
                  >
                    {/* Stars */}
                    <Stars rating={typeof (review as Record<string, unknown>).rating === 'number' ? (review as Record<string, unknown>).rating as number : 5} />

                    {/* Quote */}
                    <blockquote className="flex-grow mt-5 mb-6">
                      <p className="text-sm text-[var(--muted)] leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white leading-none">{review.name}</p>
                        <p className="text-xs text-[var(--muted)] mt-1">{review.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {loading && (
          <div className="testimonials-marquee">
            <div className="testimonials-track skeleton-track">
              {skeletonItems.map((i) => (
                <div key={i} className="testimonial-card card flex flex-col gap-4 p-7">
                  <div className="skeleton h-3 w-20" />
                  <div className="space-y-3">
                    <div className="skeleton h-3 w-11/12" />
                    <div className="skeleton h-3 w-10/12" />
                    <div className="skeleton h-3 w-8/12" />
                  </div>
                  <div className="mt-auto flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                    <div className="skeleton h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <div className="skeleton h-3 w-28" />
                      <div className="skeleton h-2.5 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
