"use client";

import * as React from "react";
import { Star, CheckCircle } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

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
    role: "CTO @ TechFlow",
    content:
      "Salah is a visionary developer. He didn't just build our platform — he genuinely understood the architecture. The interaction detail boosted our conversion by 40%.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Next.js & 3D",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager @ Nexus",
    content:
      "The level of craft Salah puts into his code and 3D interactions is simply unmatched. A true 'Digital Architect' in every sense of the word. I'd work with him again without hesitation.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Creative Frontend",
  },
  {
    name: "Marcus Thorne",
    role: "Founder @ S-Corp",
    content:
      "Reliable, strategic, and technically brilliant. Salah's ability to simplify complex engineering problems while keeping the UI absolutely premium is rare. An invaluable partner.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Full Stack",
  },
  {
    name: "Elena Rostova",
    role: "Design Director @ Studio A",
    content:
      "Working with Salah felt effortless. He converted complex Figma designs and custom Three.js shaders into silky smooth 60fps code without skipping a single detail.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "GSAP & WebGL",
  },
  {
    name: "David Kim",
    role: "Head of Engineering @ Velo",
    content:
      "High velocity, immaculate code cleanliness, and top-tier communication throughout our sprint. Salah delivers like an entire frontend team in one person.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "TypeScript Architecture",
  },
  {
    name: "Sophia Martinez",
    role: "VP of Product @ Horizon",
    content:
      "Salah transformed our rough MVP into a production-grade interface that wowed our investors. Responsive, communicative, and exceptionally sharp.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "UI/UX & Systems",
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
      <Marquee pauseOnHover={pauseOnHover} speed={speed} reverse={reverse} gap="1.5rem" repeat={3}>
        {testimonials.map((testimonial, index) => {
          const bodyText = testimonial.content || testimonial.text || "";
          const ratingCount = testimonial.rating || 5;

          return (
            <div
              key={testimonial._id || index}
              className="w-[350px] sm:w-[400px] h-[210px] shrink-0 bg-[var(--surface)] border-[3px] border-[var(--foreground)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-between shadow-[5px_5px_0px_var(--foreground)] hover:-translate-y-1 hover:shadow-[7px_7px_0px_var(--foreground)] transition-all duration-200 select-none"
            >
              {/* Header: Avatar, Name, Role & Verified Pill */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-10 w-10 object-cover rounded-full border-2 border-[var(--foreground)] shrink-0 shadow-[2px_2px_0px_var(--foreground)]"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h4
                      className="font-bold text-sm sm:text-base leading-tight text-[var(--foreground)] truncate"
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[var(--muted)] font-mono font-bold mt-0.5 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {testimonial.tag ? (
                  <span className="inline-flex items-center text-[10px] uppercase font-mono font-bold bg-[var(--neo-yellow)] text-black border-2 border-[#000000] shadow-[2px_2px_0px_#000000] shrink-0 px-2 py-0.5 rounded-[var(--radius-sm)]">
                    {testimonial.tag}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--neo-green)] shrink-0">
                    <CheckCircle size={13} className="shrink-0" />
                    Verified
                  </span>
                )}
              </div>

              {/* Quote Content */}
              <p className="text-[13px] text-[var(--foreground)] leading-relaxed italic line-clamp-3 font-normal my-2">
                &ldquo;{bodyText}&rdquo;
              </p>

              {/* Footer: Rating Stars + Score */}
              <div className="flex items-center justify-between pt-2.5 border-t-2 border-[var(--foreground)]/15">
                <div className="flex space-x-1" role="img" aria-label={`${ratingCount} stars`}>
                  {[...Array(ratingCount)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[var(--neo-yellow)] text-[var(--foreground)] stroke-[1.5]"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold text-[var(--muted)]">
                  {ratingCount}.0 / 5.0
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export const MarqueeCard = Component;
