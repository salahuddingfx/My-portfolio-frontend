"use client";

import { motion } from "framer-motion";

const EmailSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 2.2, ease: "circOut" }}
      className="fixed right-8 bottom-0 z-[100] hidden xl:flex flex-col items-center gap-10"
    >
      <div className="flex flex-col gap-0 items-center">
        <a 
          href="mailto:connect@salahuddin.dev" 
          className="font-mono text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] vertical-text hover:text-accent transition-all duration-500 hover:-translate-y-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          connect@salahuddin.dev
        </a>
      </div>
      
      {/* Decorative Line */}
      <div className="w-px h-32 bg-gradient-to-t from-accent/60 via-white/10 to-transparent relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-pulse" />
      </div>
    </motion.div>
  );
};

export default EmailSidebar;
