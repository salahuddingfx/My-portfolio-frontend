"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const Stars = ({ rating = 5 }: { rating?: number }) => (
  <div
    className="flex gap-1 justify-center"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-[var(--accent)] fill-[var(--accent)]" : "text-[var(--muted-soft)]"}
      />
    ))}
  </div>
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  }),
};

const Testimonials = () => {
  const [reviews, setReviews] = useState<typeof FALLBACK_REVIEWS>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

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

  // Autoplay Logic
  useEffect(() => {
    if (!isAutoplay || reviews.length <= 1 || loading) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, reviews.length, loading]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section 
      id="reviews" 
      className="section-shell bg-[var(--background)] !pb-20 md:!pb-28 overflow-hidden text-[var(--foreground)]"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="section-eyebrow">Kind words</span>
          <h2 className="section-heading mt-1">
            What clients say.
          </h2>
        </div>

        {loading ? (
          <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 md:p-14 border border-[var(--border)] bg-[var(--surface-2)]/30 backdrop-blur-md shadow-2xl flex flex-col gap-6">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-4 w-4 rounded-full" />
              ))}
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="skeleton h-4 w-11/12 md:w-3/4" />
              <div className="skeleton h-4 w-10/12 md:w-2/3" />
              <div className="skeleton h-4 w-8/12 md:w-1/2" />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 pt-6 border-t border-[var(--border)]">
              <div className="skeleton h-12 w-12 rounded-full" />
              <div className="skeleton h-4 w-28" />
              <div className="skeleton h-3.5 w-20" />
            </div>
          </div>
        ) : (
          reviews.length > 0 && (
            <div className="relative max-w-3xl mx-auto">
              
              {/* Testimonial Card Slider */}
              <div className="relative overflow-hidden min-h-[360px] md:min-h-[290px] w-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full flex flex-col justify-between glass-panel rounded-3xl p-8 md:p-14 border border-[var(--border)] bg-[var(--surface-2)]/35 backdrop-blur-xl shadow-2xl"
                  >
                    {/* Stars */}
                    <Stars rating={currentReview.rating} />

                    {/* Quote */}
                    <blockquote className="flex-grow flex items-center justify-center my-6">
                      <p className="text-base md:text-lg text-[var(--foreground)] text-center italic font-light leading-relaxed max-w-2xl">
                        &ldquo;{currentReview.text}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-3 pt-6 border-t border-[var(--border)]">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] shadow-md shrink-0">
                        <Image
                          src={currentReview.avatar}
                          alt={currentReview.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-[var(--foreground)] leading-none">{currentReview.name}</p>
                        <p className="text-xs text-[var(--accent)] mt-1.5 font-medium tracking-widest uppercase">{currentReview.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)]/60 text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:-translate-x-[2px] cursor-pointer shadow-sm active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {/* Dot Indicators */}
                <div className="flex gap-2.5">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoplay(false);
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex ? "w-6 bg-[var(--accent)]" : "w-2.5 bg-[var(--border)] hover:bg-[var(--muted-soft)]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)]/60 text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:translate-x-[2px] cursor-pointer shadow-sm active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

            </div>
          )
        )}

      </div>
    </section>
  );
};

export default Testimonials;
