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
    <main className="min-h-screen bg-background pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
              Insights & Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none">
              Thoughts on <span className="text-gradient">Technology.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              Sharing architectural insights, design philosophies, and engineering 
              breakthroughs from the front lines of software development.
            </p>
          </motion.div>
        </div>

        {/* Blog Feed */}
        <div className="space-y-8 max-w-5xl">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} index={index} />
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-32 p-12 md:p-20 rounded-[4rem] border border-white/5 bg-slate-900/30 backdrop-blur-xl relative overflow-hidden">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black text-white">Stay in the loop.</h2>
                 <p className="text-slate-400 text-lg">Get the latest engineering insights delivered directly to your inbox.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                   type="email" 
                   placeholder="Enter your neural email..." 
                   className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
                 />
                 <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-accent transition-colors">
                    Subscribe
                 </button>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
