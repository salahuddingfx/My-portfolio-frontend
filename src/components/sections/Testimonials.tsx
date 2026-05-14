"use client";

import { Star } from "lucide-react";
import PremiumCard from "@/components/ui/PremiumCard";
import { useState, useEffect } from "react";

const FALLBACK_REVIEWS = [
  {
    name: "Alex Rivera",
    role: "CTO @ TechFlow",
    text: "Salah is a visionary developer. He didn't just build our platform — he engineered an experience that boosted our conversion by 40%. The attention to interaction detail was extraordinary.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager @ Nexus",
    text: "The level of craft Salah puts into his code and 3D interactions is simply unmatched. A true 'Digital Architect' in every sense of the word. I'll work with him again without hesitation.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Founder @ S-Corp",
    text: "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex engineering problems while keeping the UI absolutely premium is rare. An invaluable partner.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  }
];

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>(FALLBACK_REVIEWS);
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
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      } catch (error) {
        console.warn("Using fallback reviews due to API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return null;

  return (
    <section id="reviews" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-8">
          <span className="section-kicker mx-auto">Testimonials</span>
          <h2 className="section-title !mb-0">
            Client <span className="text-accent">Feedback.</span>
          </h2>
          <p className="section-copy mx-auto">
            Kind words from clients and partners I&apos;ve collaborated with on 
            various projects.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <PremiumCard
              key={i}
              delay={i * 0.1}
              className="flex flex-col h-full !p-10 border-white/5"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="flex-grow">
                <p className="text-white/60 group-hover:text-white/80 transition-colors duration-500 text-lg leading-relaxed font-medium">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-10 pt-10 border-t border-white/5 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-neutral-900">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-display font-bold text-base text-white tracking-tight">{review.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">
                    {review.role}
                  </p>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
