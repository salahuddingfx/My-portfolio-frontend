"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  index: number;
}

const BlogCard = ({ title, excerpt, date, readTime, category, image, slug, index }: BlogProps) => {
  const number = String(index + 1).padStart(2, "0");
  const readLink = `/blog/${slug}`;

  return (
    <div className="project-grid-card h-full">
      
      {/* Background Number */}
      <div className="absolute right-8 top-6 text-8xl md:text-9xl font-bold font-mono text-[var(--foreground)] opacity-[0.02] pointer-events-none select-none transition-all duration-700">
        {number}
      </div>

      <div className="space-y-6">
        {/* Meta info & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--border)] pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[var(--neo-yellow)] border border-black" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] font-mono">
              {category || "Article"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-mono">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="text-[var(--neo-yellow)]" />
                {date}
              </span>
            )}
            <span className="text-[var(--border)]">•</span>
            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-[var(--neo-yellow)]" />
                {readTime}
              </span>
            )}
          </div>
        </div>

        {/* Mockup / Image Frame */}
        <div className="relative overflow-hidden aspect-[16/10] bg-[var(--surface-2)] border-2 border-[var(--border)] shadow-[4px_4px_0px_#000]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-2)]">
              <span className="text-[var(--muted)] text-xs font-mono uppercase tracking-widest opacity-60">
                No Image
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight font-space-grotesk line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-4 min-h-[5rem]">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Action CTA link */}
      <div className="mt-8 pt-4 border-t-2 border-[var(--border)]">
        <Link
          href={readLink}
          className="btn-primary !py-2.5 !px-5 !text-[10px] gap-1.5 group/btn inline-flex"
        >
          <span>Read Article</span>
          <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

    </div>
  );
};

export default BlogCard;
