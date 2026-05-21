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
      className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md transition-all duration-300 hover:border-[var(--accent)]/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_var(--accent-soft)]"
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
              className="object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-[var(--ease-out)]"
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
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-semibold font-mono uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20 backdrop-blur-md shadow-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-3.5 p-5 md:p-6">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-mono">
            {date && (
              <span className="flex items-center gap-1.5 group-hover:text-[var(--foreground)] transition-colors duration-200">
                <Calendar size={11} className="text-[var(--accent)]" />
                {date}
              </span>
            )}
            <span className="text-[var(--border)] pointer-events-none">•</span>
            {readTime && (
              <span className="flex items-center gap-1.5 group-hover:text-[var(--foreground)] transition-colors duration-200">
                <Clock size={11} className="text-[var(--accent)]" />
                {readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-lg md:text-xl font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2 flex-1 group-hover:text-[var(--foreground)]/80 transition-colors duration-300">
            {excerpt}
          </p>

          {/* Read link — anchored to bottom */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] pt-1 mt-auto">
            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-[var(--accent)] after:transition-all after:duration-300">
              Read Article
            </span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1.5 transition-transform duration-300 ease-[var(--ease-out)]"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
