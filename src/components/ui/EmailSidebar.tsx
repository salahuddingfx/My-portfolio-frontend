"use client";

import { motion } from "framer-motion";

const EmailSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
      className="fixed right-6 bottom-0 z-[100] hidden xl:flex flex-col items-center gap-6"
    >
      <a
        href="mailto:salahuddinkaderappy@gmail.com"
        className="text-[11px] text-[var(--muted-soft)] hover:text-[var(--muted)] transition-colors duration-200 tracking-widest"
        style={{ writingMode: "vertical-rl", fontFamily: "var(--font-jetbrains-mono)" }}
        aria-label="Send email"
      >
        salahuddinkaderappy@gmail.com
      </a>

      <div className="w-px h-20 bg-[var(--border)]" />
    </motion.div>
  );
};

export default EmailSidebar;
