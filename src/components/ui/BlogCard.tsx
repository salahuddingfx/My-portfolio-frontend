"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

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

import PremiumCard from "@/components/ui/PremiumCard";

const BlogCard = ({ title, excerpt, date, readTime, category, image, slug, index }: BlogProps) => {
  return (
    <PremiumCard
      delay={index * 0.1}
      variant="neon"
      className="flex flex-col md:flex-row gap-8 p-10 md:p-12 !rounded-[2.5rem] border-neon/10 hover:border-neon/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 rounded-lg glass text-[10px] font-black uppercase tracking-widest text-neon">
              {category}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between py-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Calendar size={14} /> {date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {readTime}</span>
          </div>
          
          <h3 className="text-2xl font-black text-white group-hover:text-neon transition-colors leading-tight">
            {title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 max-w-xl">
            {excerpt}
          </p>
        </div>

        <div className="pt-6">
          <Link href={`/blog/${slug}`} className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-neon transition-colors group/link">
            Read Article 
            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1 text-neon" />
          </Link>
        </div>
      </div>
    </PremiumCard>
  );
};

export default BlogCard;
