"use client";

import * as React from "react";
import { Star, CheckCircle } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";

export interface TestimonialItem {
  _id?: string;
  name: string;
  role: string;
  content?: string;
  text?: string;
  avatar?: string;
  rating?: number;
  tag?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow",
    content:
      "Salah didn't just build our platform — he genuinely understood the problem. The interaction detail was extraordinary, boosting conversion by 40%.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Next.js & Architecture",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at Nexus",
    content:
      "The level of craft Salah brings to his work is rare. Delivers code that actually exceeds expectations. I'd work with him again without hesitation.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Creative Frontend",
  },
  {
    name: "Marcus Thorne",
    role: "Founder at S-Corp",
    content:
      "Reliable, strategic, and technically brilliant. His ability to simplify complex problems while keeping the UI clean and premium is remarkable.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Full Stack Systems",
  },
  {
    name: "Elena Rostova",
    role: "Design Director at Studio A",
    content:
      "Working with Salah felt effortless. He converted complex Figma designs and 3D scenes into silky smooth 60fps code without skipping a beat.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "UI/UX & GSAP",
  },
  {
    name: "David Kim",
    role: "Head of Engineering at Velo",
    content:
      "High velocity, immaculate code cleanliness, and top-tier communication throughout our sprint. A true 10x frontend engineer.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "React & TypeScript",
  },
];

interface MarqueeCardProps {
  testimonials?: TestimonialItem[];
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const Component = ({
  testimonials = DEFAULT_TESTIMONIALS,
  speed = "normal",
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeCardProps) => {
  return (
    <div className={className}>
      <Marquee pauseOnHover={pauseOnHover} speed={speed} reverse={reverse}>
        {testimonials.map((testimonial, index) => {
          const bodyText = testimonial.content || testimonial.text || "";
          const ratingCount = testimonial.rating || 5;

          return (
            <LiquidCard
              key={testimonial._id || index}
              className="mx-3 rounded-2xl w-80 sm:w-96 shrink-0 border-[2.5px] border-black/80 dark:border-white/20 bg-surface/70 dark:bg-[#141414]/75 backdrop-blur-md shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_rgba(255,216,77,0.3)] hover:-translate-y-1 transition-transform duration-200"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                {/* Header: Avatar, Name, Role, and Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-11 w-11 object-cover rounded-full border-2 border-black/80 dark:border-white/40 shrink-0 shadow-[2px_2px_0px_#000000]"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base leading-tight text-[var(--foreground)]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[var(--muted)] font-mono mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {testimonial.tag ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase font-mono font-bold bg-[var(--neo-yellow)] text-black border-black border shrink-0 px-2 py-0.5"
                    >
                      {testimonial.tag}
                    </Badge>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--neo-green)]">
                      <CheckCircle size={13} className="shrink-0" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Content Quote */}
                <p className="text-sm text-[var(--foreground)]/90 leading-relaxed mb-4 italic">
                  &ldquo;{bodyText}&rdquo;
                </p>

                {/* Rating Stars */}
                <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 mt-auto">
                  <div className="flex space-x-1" role="img" aria-label={`${ratingCount} stars`}>
                    {[...Array(ratingCount)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[var(--neo-yellow)] text-[var(--neo-yellow)]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--muted)]">
                    {ratingCount}.0 / 5.0
                  </span>
                </div>
              </CardContent>
            </LiquidCard>
          );
        })}
      </Marquee>
    </div>
  );
};

export const MarqueeCard = Component;
