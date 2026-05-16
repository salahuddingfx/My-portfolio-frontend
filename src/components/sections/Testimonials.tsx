"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <span className="section-kicker mx-auto">Client Love</span>
          <h2 className="section-title !mb-0 leading-[0.9]">
            Trusted <span className="text-accent">Feedback.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium tracking-tight mt-8">
            Insights from partners and clients who have collaborated on high-performance digital architectures and creative solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card group flex flex-col h-full p-10 lg:p-14"
            >
              <div className="inner-glow" />
              
              {/* Stars */}
              <div className="flex gap-2 mb-12">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-accent text-accent shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="flex-grow relative">
                <div className="absolute -top-10 -left-6 text-[140px] font-black text-white/[0.02] pointer-events-none select-none italic leading-none">
                  &ldquo;
                </div>
                <p className="text-white/60 group-hover:text-white/90 transition-all duration-500 text-xl lg:text-2xl leading-relaxed font-bold italic relative z-10 tracking-tight">
                  {review.text}
                </p>
              </div>

              {/* Author */}
              <div className="mt-16 pt-12 border-t border-white/5 flex items-center gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-accent/40 transition-all duration-700 shadow-2xl bg-white/[0.02]">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-display font-black text-xl text-white tracking-tighter leading-none">{review.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
