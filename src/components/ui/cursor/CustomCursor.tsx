"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const rays = raysRef.current;

    if (!cursor || !follower || !rays) return;

    let cancelled = false;
    let cleanup = () => {};

    const setup = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled) return;

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0,
        });
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handlePointerOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("button, a, .cursor-pointer")) {
          gsap.to(follower, {
            scale: 1.5,
            duration: 0.3,
          });
          gsap.to(".sharingan-glow", {
            opacity: 1,
            scale: 1.8,
            duration: 0.3,
          });
          // REVEAL RAYS
          gsap.to(".ray", {
            scaleY: 1,
            opacity: 0.6,
            stagger: 0.02,
            duration: 0.4,
            ease: "back.out(2)",
          });
        } else {
          gsap.to(follower, {
            scale: 1,
            duration: 0.3,
          });
          gsap.to(".sharingan-glow", {
            opacity: 0.6,
            scale: 1,
            duration: 0.3,
          });
          // HIDE RAYS
          gsap.to(".ray", {
            scaleY: 0,
            opacity: 0,
            duration: 0.3,
          });
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handlePointerOver);

      // Subtle rotation for the eye
      gsap.to(".sharingan-inner", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      // Pulsating glow animation
      gsap.to(".sharingan-glow", {
        opacity: 0.4,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Constantly rotate the rays slowly
      gsap.to(rays, {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });

      cleanup = () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", handlePointerOver);
      };
    };

    setup();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <>
      {/* TINY CENTER DOT */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* SHARINGAN EYE WITH INTENSE GLOW */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        {/* RADIATING RAYS CONTAINER */}
        <div ref={raysRef} className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="ray absolute w-[1px] h-[60px] bg-gradient-to-t from-[#9333ea] to-transparent origin-bottom opacity-0 scale-y-0"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-50%)`,
              }}
            />
          ))}
        </div>

        {/* EXTERNAL AURA GLOW */}
        <div className="sharingan-glow absolute inset-[-25px] rounded-full bg-[#9333ea]/20 blur-[20px] opacity-60 z-[-1]" />
        
        <div className="relative w-full h-full rounded-full bg-[#9333ea] border border-black/40 overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.9),0_0_20px_rgba(147,51,234,0.6)]">
          {/* Inner Pattern (EMS) */}
          <div className="sharingan-inner absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-1 fill-black">
              <circle cx="50" cy="50" r="10" />
              
              <path d="M50 20 C60 20 70 30 70 45 C70 60 60 70 50 70 C40 70 30 60 30 45 C30 30 40 20 50 20 Z" fill="none" stroke="black" strokeWidth="2" opacity="0.3" />
              
              <g className="tomoe">
                <path d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
                <path transform="rotate(120 50 50)" d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
                <path transform="rotate(240 50 50)" d="M50 25 C55 25 60 30 60 35 C60 40 55 45 50 45 C45 45 40 40 40 35 C40 30 45 25 50 25 M50 25 C40 15 25 25 35 45" />
              </g>

              <circle cx="50" cy="50" r="32" fill="none" stroke="black" strokeWidth="1.5" />
            </svg>
          </div>
          
          {/* Eye Shine */}
          <div className="absolute top-[20%] left-[25%] w-2 h-1.5 bg-white/50 rounded-full blur-[1px] rotate-[-45deg]" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
