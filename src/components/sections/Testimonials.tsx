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
        <div className="section-header-center">
          <span className="section-eyebrow">Kind words</span>
          <h2 className="section-heading mt-1">
            What clients say.
          </h2>
        </div>

        {loading ? (
          <div className="max-w-3xl mx-auto border-[3px] border-[#000000] bg-[var(--surface)] shadow-[8px_8px_0px_#000000] p-6 sm:p-8 md:p-14 flex flex-col gap-6" style={{ borderRadius: "var(--radius-lg)" }}>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-4 w-4" style={{ borderRadius: "var(--radius-sm)" }} />
              ))}
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="skeleton h-4 w-11/12 md:w-3/4" />
              <div className="skeleton h-4 w-10/12 md:w-2/3" />
              <div className="skeleton h-4 w-8/12 md:w-1/2" />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 pt-6 border-t-[3px] border-[#000000]">
              <div className="skeleton h-12 w-12" style={{ borderRadius: "var(--radius-md)" }} />
              <div className="skeleton h-4 w-28" />
              <div className="skeleton h-3.5 w-20" />
            </div>
          </div>
        ) : (
          reviews.length > 0 && (
            <div className="relative max-w-3xl mx-auto">
              
              {/* Testimonial Card Slider */}
              <div className="relative overflow-hidden w-full flex items-center justify-center min-h-[420px] sm:min-h-[340px] md:min-h-[280px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative w-full h-auto flex flex-col justify-between border-[3px] border-[#000000] bg-[var(--surface)] shadow-[8px_8px_0px_#000000] p-6 sm:p-8 md:p-14"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    {/* Stars */}
                    <Stars rating={currentReview.rating} />

                    {/* Quote */}
                    <blockquote className="flex-grow flex items-center justify-center my-6">
                      <p className="text-base md:text-lg text-[var(--foreground)] text-center italic font-light leading-relaxed max-w-2xl mx-auto">
                        &ldquo;{currentReview.text}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-3 pt-6 border-t-[3px] border-[#000000]">
                      <div className="relative w-12 h-12 overflow-hidden bg-[var(--surface-2)] border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000] shrink-0" style={{ borderRadius: "var(--radius-md)" }}>
                        <Image
                          src={currentReview.avatar}
                          alt={currentReview.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-extrabold text-[var(--foreground)] leading-none uppercase tracking-wide">{currentReview.name}</p>
                        <p className="text-xs text-[var(--muted)] mt-1.5 font-bold tracking-widest uppercase">{currentReview.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[3px_3px_0px_#000000] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000]"
                  style={{ borderRadius: "var(--radius-md)" }}
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
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
                      className={`transition-all duration-200 cursor-pointer border-[2px] border-[#000000] ${
                        idx === currentIndex ? "w-6 h-2.5 bg-[var(--neo-yellow)]" : "w-2.5 h-2.5 bg-[var(--surface)] hover:bg-[var(--neo-cyan)]"
                      }`}
                      style={{ borderRadius: "var(--radius-sm)" }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[3px_3px_0px_#000000] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000]"
                  style={{ borderRadius: "var(--radius-md)" }}
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
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
