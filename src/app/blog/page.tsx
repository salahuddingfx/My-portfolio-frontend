"use client";

import BlogCard from "@/components/ui/BlogCard";
import { motion } from "framer-motion";

const posts = [
  {
    title: "The Future of WebGL in Modern Portfolio Design",
    excerpt: "Exploring how 3D graphics and shader programming are redefining user engagement in high-end personal branding.",
    date: "Oct 12, 2024",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
    slug: "future-of-webgl",
  },
  {
    title: "Scaling Node.js Microservices for High-Concurrency",
    excerpt: "A deep dive into architectural patterns and optimizations required to handle millions of requests per second.",
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026&auto=format&fit=crop",
    slug: "scaling-nodejs-microservices",
  },
  {
    title: "The Psychology of Dark Mode in Enterprise UI",
    excerpt: "Why dark interfaces are becoming the standard for professional dashboards and how to implement them effectively.",
    date: "Aug 15, 2024",
    readTime: "6 min read",
    category: "UX Research",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    slug: "psychology-of-dark-mode",
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Insights & Intelligence
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase drop-shadow-2xl">
              Neural<br />
              <span className="text-white/10">Thoughts.</span>
            </h1>
            <p className="text-white/50 text-[18px] md:text-[20px] leading-relaxed max-w-2xl font-medium">
              Sharing architectural insights, design philosophies, and engineering 
              breakthroughs from the front lines of high-end software development.
            </p>
          </motion.div>
        </div>

        {/* Blog Feed */}
        <div className="space-y-8 lg:space-y-12 max-w-5xl">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} index={index} />
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 lg:mt-48 premium-card p-12 lg:p-24 bg-white/[0.01] border-white/5 overflow-hidden"
        >
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">Stay In<br/><span className="text-accent">The Loop.</span></h2>
                 <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md font-medium">Get the latest engineering insights delivered directly to your inbox. No noise, just signal.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                 <input 
                   type="email" 
                   placeholder="Enter your email address..." 
                   className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/10"
                 />
                 <button className="btn-primary w-full sm:w-auto px-10 py-5">
                    <span className="text-[11px] font-black tracking-[0.4em] uppercase">Subscribe</span>
                 </button>
              </div>
           </div>
           {/* Decorative background logo */}
           <div className="absolute -right-20 -bottom-20 text-[250px] font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter leading-none">
             Saka
           </div>
        </motion.div>
      </div>
    </main>
  );
}
