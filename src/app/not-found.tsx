"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-6">
      {/* Abstract Background Noise Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Spatial Aura Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none -top-40 -left-40 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-(--accent)/5 blur-[100px] pointer-events-none -bottom-40 -right-40 animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
        
        {/* Error Code Flag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-red-500/25 bg-red-500/5 text-red-400 font-mono text-xs uppercase tracking-widest mx-auto"
        >
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          Status Code: 404 // Coordinates Mismatched
        </motion.div>

        {/* Cinematic Brutalist Header */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic select-none"
          >
            Lost in <span className="text-red-500">Space.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] max-w-md mx-auto leading-relaxed"
          >
            The transmission coordinate you requested does not exist or has been shifted in the digital continuum.
          </motion.p>
        </div>

        {/* Interactive Return Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl border border-[var(--border)] bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 group shadow-2xl"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retreat to Terminal
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
