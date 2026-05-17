"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Use sessionStorage so the loader only plays once per browsing session
    const hasLoaded = sessionStorage.getItem("introLoaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // A simple easing function for the progress counter
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(currentStep / steps);
      
      const currentProgress = Math.min(Math.floor(easedProgress * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("introLoaded", "true");
        }, 600); // Pause briefly at 100% before sliding out
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground"
        >
          {/* Spatial Editorial / Brutalist Loader Aesthetic */}
          <div className="flex flex-col items-center gap-4 w-full px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs md:text-sm font-jetbrains-mono tracking-[0.3em] uppercase text-zinc-500 mb-8"
            >
              Salah Uddin Kader
            </motion.div>
            
            <div className="flex items-baseline overflow-hidden">
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-8xl md:text-[14rem] font-bold font-space-grotesk tracking-tighter leading-none"
              >
                {progress}
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-3xl md:text-6xl text-zinc-600 font-jetbrains-mono ml-2 md:ml-4"
              >
                %
              </motion.span>
            </div>

            <div className="w-full max-w-sm h-[1px] bg-zinc-800 mt-16 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
