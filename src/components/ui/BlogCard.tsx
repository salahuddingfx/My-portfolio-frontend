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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="premium-card group flex flex-col md:flex-row gap-8 p-8 md:p-10 border-white/5 hover:border-accent/20 transition-all duration-700"
    >
      {/* Image Container */}
      <div className="relative w-full md:w-80 h-56 rounded-2xl overflow-hidden shrink-0 shadow-2xl">
        <Image 
          src={image} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-4 left-4">
           <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
              {category}
           </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col justify-between py-1">
        <div className="space-y-5">
          <div className="flex items-center gap-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {date}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {readTime}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-accent transition-colors duration-500 leading-tight tracking-tight">
            {title}
          </h3>
          
          <p className="text-white/50 text-[16px] leading-relaxed line-clamp-2 max-w-2xl font-medium">
            {excerpt}
          </p>
        </div>

        <div className="pt-8 border-t border-white/5 mt-auto group-hover:border-white/10 transition-colors">
          <Link href={`/blog/${slug}`} className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all duration-500 group/link">
            Read Full Story 
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-accent group-hover/link:border-accent transition-all duration-500">
              <ArrowRight size={14} className="text-white transition-transform group-hover/link:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
