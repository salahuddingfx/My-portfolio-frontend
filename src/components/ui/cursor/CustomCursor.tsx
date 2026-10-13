"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [badgeLabel, setBadgeLabel] = React.useState("Designer");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for follower badge
  const springX = useSpring(mouseX, { stiffness: 450, damping: 35, bounce: 0 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 35, bounce: 0 });

  React.useEffect(() => {
    // Disable completely on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer")) {
        setBadgeLabel("Click");
      } else if (target.closest("#reviews")) {
        setBadgeLabel("Pause");
      } else if (target.closest("#projects")) {
        setBadgeLabel("Explore");
      } else {
        setBadgeLabel("Designer");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none hidden md:block">
      <AnimatePresence>
        {/* Custom SVG Pointer Arrow */}
        <motion.div
          className="fixed pointer-events-none -translate-x-1 -translate-y-1"
          style={{
            left: mouseX,
            top: mouseY,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <svg
            className="w-6 h-6 text-[var(--neo-yellow)] drop-shadow-[2px_2px_0px_#000000]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              fill="currentColor"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinejoin="round"
              d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
            />
          </svg>
        </motion.div>

        {/* Spring Follower Pill Badge */}
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: springX,
            top: springY,
            transform: "translate(16px, 16px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <div className="bg-[#000000] text-[var(--neo-yellow)] font-mono font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md border-2 border-[#000000] shadow-[2px_2px_0px_#000000] whitespace-nowrap">
            {badgeLabel}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
