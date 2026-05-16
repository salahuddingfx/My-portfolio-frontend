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
      className="card card-hover group"
    >
      <Link
        href={`/blog/${slug}`}
        className="grid md:grid-cols-[200px_1fr] gap-6 p-5 md:p-6"
        aria-label={`Read: ${title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] md:aspect-auto md:h-full min-h-[120px] rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface-2)] shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
          />
          <div className="absolute top-2 left-2">
            <span className="badge bg-black/60 backdrop-blur-sm text-white/70 border-white/10">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-0.5 gap-4">
          <div className="flex flex-col gap-3">
            {/* Meta */}
            <div className="flex items-center gap-4 text-[11px] text-[var(--muted-soft)] font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} /> {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} /> {readTime}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-lg font-semibold text-white leading-snug group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          </div>

          {/* Read link */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] group-hover:text-white transition-colors duration-200">
            Read article
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
