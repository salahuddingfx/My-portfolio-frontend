"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-250 hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <Link
        href={`/blog/${slug}`}
        className="flex flex-col md:flex-row h-full"
        aria-label={`Read: ${title}`}
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-[220px] md:shrink-0 aspect-[16/9] md:aspect-auto md:min-h-[160px] bg-[var(--surface-2)] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
            />
          ) : (
            /* Placeholder when no image */
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent-soft)]">
              <span className="text-[var(--accent)] text-xs font-mono uppercase tracking-widest opacity-60">
                {category || "Article"}
              </span>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium font-mono uppercase tracking-wider bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] border border-[var(--border)]">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-3 p-5 md:p-6">
          {/* Meta row */}
          <div className="flex items-center gap-4 text-[11px] text-[var(--muted-soft)] font-mono">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {date}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-base md:text-lg font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2 flex-1">
            {excerpt}
          </p>

          {/* Read link — anchored to bottom */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] pt-1 mt-auto">
            Read article
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
