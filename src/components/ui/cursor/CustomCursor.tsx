"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest("button, a, .cursor-pointer");
      setIsHovered(isClickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Lightweight smooth interpolation trailing animation
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = mouseRef.current.x - prev.x;
        const dy = mouseRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    
    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Instant Center Dot */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--foreground)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) ${
            isHovered ? "scale(0)" : "scale(1)"
          }`,
          transition: "transform 0.15s ease",
        }}
        className="hidden md:block"
      />

      {/* 2. Trailing Follower Capsule (Morphs to Yellow Diamond on Hover) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "2px solid var(--foreground)",
          borderRadius: isHovered ? "var(--radius-md)" : "50%",
          backgroundColor: isHovered ? "var(--neo-yellow)" : "transparent",
          boxShadow: isHovered ? "3px 3px 0px var(--foreground)" : "none",
          pointerEvents: "none",
          zIndex: 99998,
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) ${
            isHovered ? "scale(1.2) rotate(45deg)" : "scale(1) rotate(0deg)"
          }`,
          transition: "transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease, border-radius 0.2s ease, box-shadow 0.2s ease",
        }}
        className="hidden md:block"
      />
    </>
  );
}
