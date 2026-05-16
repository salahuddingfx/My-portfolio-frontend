"use client";

import { motion } from "framer-motion";

const EmailSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 2.2, ease: "circOut" }}
      className="fixed right-8 bottom-0 z-[100] hidden xl:flex flex-col items-center gap-12"
    >
      <div className="flex flex-col gap-0 items-center">
        <a 
          href="mailto:connect@salahuddin.dev" 
          className="kicker text-white/30 hover:text-accent transition-all duration-300 hover:-translate-y-2 tracking-[0.5em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          CONNECT@SALAHUDDIN.DEV
        </a>
      </div>
      
      {/* Decorative Line */}
      <div className="w-px h-32 bg-white/10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-accent" />
      </div>
    </motion.div>
  );
};

export default EmailSidebar;
