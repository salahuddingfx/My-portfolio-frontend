"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // Instant
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer")) {
        gsap.to(follower, {
          scale: 2,
          duration: 0.3,
          filter: "drop-shadow(0 0 10px #dc2626)",
        });
      } else {
        gsap.to(follower, {
          scale: 1,
          duration: 0.3,
          filter: "drop-shadow(0 0 5px rgba(220, 38, 38, 0.5))",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handlePointerOver);

    // Subtle rotation for the eye
    gsap.to(".sharingan-inner", {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, []);

  return (
    <>
      {/* TINY CENTER DOT */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* SHARINGAN EYE */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <div className="relative w-full h-full rounded-full bg-[#dc2626] border border-black/40 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
          {/* Inner Pattern (Sharingan Tomoe/EMS) */}
          <div className="sharingan-inner absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-1 fill-black">
              {/* Central Pupil */}
              <circle cx="50" cy="50" r="10" />
              
              {/* EMS Pattern - Three intersecting circles/blades */}
              <path d="M50 20 C60 20 70 30 70 45 C70 60 60 70 50 70 C40 70 30 60 30 45 C30 30 40 20 50 20 Z" fill="none" stroke="black" strokeWidth="2" opacity="0.3" />
              
              {/* Tomoe Pattern */}
              <g className="tomoe">
                <path d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
                <path transform="rotate(120 50 50)" d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
                <path transform="rotate(240 50 50)" d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
              </g>

              {/* Connecting Ring */}
              <circle cx="50" cy="50" r="32" fill="none" stroke="black" strokeWidth="1.5" />
            </svg>
          </div>
          
          {/* Eye Shine */}
          <div className="absolute top-[20%] left-[25%] w-2 h-1.5 bg-white/40 rounded-full blur-[1px] rotate-[-45deg]" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
