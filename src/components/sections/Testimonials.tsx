"use client";

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
    <section id="reviews" className="section-shell relative overflow-hidden bg-background">
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="mb-24 lg:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-white/10 pb-16">
          <div className="space-y-6">
            <span className="kicker block">[ COMMUNIQUÉ ]</span>
            <h2 className="text-[12vw] lg:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
              CLIENT<br/>
              <span className="text-accent">LOGS</span>
            </h2>
          </div>
          <p className="text-xl text-white/50 max-w-md font-bold tracking-tight uppercase">
            Data streams and feedback from operational partners across the network.
          </p>
        </div>

        {/* Grid - Brutalist Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="solid-card flex flex-col h-full group"
            >
              
              {/* Rating representation - Raw Data block */}
              <div className="flex gap-2 mb-12 border-l-2 border-accent pl-4">
                <span className="kicker text-accent">[ AUTH: VALID ]</span>
                <span className="kicker text-white/30">[ RATING: MAX ]</span>
              </div>

              {/* Quote */}
              <div className="flex-grow mb-16">
                <p className="text-white/70 group-hover:text-white transition-all duration-500 text-xl lg:text-2xl leading-relaxed font-bold uppercase tracking-tight">
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-8 border-t-2 border-white/10 flex items-center gap-6">
                <div className="relative w-16 h-16 border-2 border-white/10 group-hover:border-accent transition-colors duration-500 overflow-hidden bg-surface">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{review.name}</span>
                  <span className="kicker text-accent">
                    [{review.role}]
                  </span>
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
