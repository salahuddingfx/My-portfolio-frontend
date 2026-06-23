"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-[var(--neo-yellow)] origin-[0%] z-[var(--z-overlay)] border-b-[2px] border-[#000000]"
      style={{ scaleX }}
    />
  );
}
