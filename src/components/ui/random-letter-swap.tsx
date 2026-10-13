"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useAnimate } from "framer-motion";

export interface RandomLetterSwapProps {
  label: string;
  reverse?: boolean;
  transition?: {
    type?: string;
    duration?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    ease?: string | number[];
    [key: string]: unknown;
  };
  staggerDuration?: number;
  className?: string;
  mode?: "forward" | "pingpong";
  isHovered?: boolean;
  onClick?: () => void;
}

export const RandomLetterSwap: React.FC<RandomLetterSwapProps> = ({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.6,
  },
  staggerDuration = 0.025,
  className = "",
  mode = "forward",
  isHovered,
  onClick,
}) => {
  const [scope, animate] = useAnimate();
  const [isBlocked, setIsBlocked] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const letters = Array.from(label);

  const getShuffledIndices = useCallback(() => {
    return Array.from({ length: letters.length }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
  }, [letters.length]);

  const triggerAnimationForward = useCallback(() => {
    if (isBlocked) return;
    setIsBlocked(true);

    const shuffledIndices = getShuffledIndices();

    for (let i = 0; i < letters.length; i++) {
      const randomIndex = shuffledIndices[i];
      const delay = i * staggerDuration;

      const anim = animate as any;
      const letterSelector = `.letter-${randomIndex}`;
      const letterSecSelector = `.letter-secondary-${randomIndex}`;

      anim(
        letterSelector,
        { y: reverse ? "100%" : "-100%" },
        { ...transition, delay }
      ).then(() => {
        anim(letterSelector, { y: 0 }, { duration: 0 });
      });

      anim(
        letterSecSelector,
        { top: "0%" },
        { ...transition, delay }
      ).then(() => {
        anim(
          letterSecSelector,
          { top: reverse ? "-100%" : "100%" },
          { duration: 0 }
        );
        if (i === letters.length - 1) {
          setIsBlocked(false);
        }
      });
    }
  }, [
    isBlocked,
    letters.length,
    staggerDuration,
    reverse,
    transition,
    animate,
    getShuffledIndices,
  ]);

  const triggerAnimationPingPong = useCallback((isEntering: boolean) => {
    const shuffledIndices = getShuffledIndices();

    for (let i = 0; i < letters.length; i++) {
      const randomIndex = shuffledIndices[i];
      const delay = i * staggerDuration;

      const anim = animate as any;
      const letterSelector = `.letter-${randomIndex}`;
      const letterSecSelector = `.letter-secondary-${randomIndex}`;

      if (isEntering) {
        anim(
          letterSelector,
          { y: reverse ? "100%" : "-100%" },
          { ...transition, delay }
        );
        anim(
          letterSecSelector,
          { top: "0%" },
          { ...transition, delay }
        );
      } else {
        anim(letterSelector, { y: 0 }, { ...transition, delay });
        anim(
          letterSecSelector,
          { top: reverse ? "-100%" : "100%" },
          { ...transition, delay }
        );
      }
    }
  }, [
    letters.length,
    staggerDuration,
    reverse,
    transition,
    animate,
    getShuffledIndices,
  ]);

  const handleHoverStart = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      if (mode === "pingpong") {
        triggerAnimationPingPong(true);
      } else {
        triggerAnimationForward();
      }
    }, 30);
  }, [mode, triggerAnimationForward, triggerAnimationPingPong]);

  const handleHoverEnd = useCallback(() => {
    if (mode !== "pingpong") return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      triggerAnimationPingPong(false);
    }, 30);
  }, [mode, triggerAnimationPingPong]);

  // Support controlled parent hover
  React.useEffect(() => {
    if (isHovered === undefined) return;
    if (isHovered) {
      handleHoverStart();
    } else if (mode === "pingpong") {
      handleHoverEnd();
    }
  }, [isHovered, mode, handleHoverStart, handleHoverEnd]);

  return (
    <motion.span
      ref={scope}
      className={`inline-flex items-center relative overflow-hidden select-none ${className}`}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>

      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-flex overflow-hidden whitespace-pre leading-none py-0.5"
          aria-hidden="true"
        >
          <motion.span
            className={`relative letter-${i}`}
            style={{ display: "inline-block", top: 0 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
          <motion.span
            className={`absolute inset-0 letter-secondary-${i}`}
            style={{
              display: "inline-block",
              left: 0,
              right: 0,
              top: reverse ? "-100%" : "100%",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default RandomLetterSwap;
