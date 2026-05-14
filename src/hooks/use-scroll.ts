import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll position and direction.
 */
export function useScroll() {
  const [scrollData, setScrollData] = useState({
    y: 0,
    lastY: 0,
    direction: "up" as "up" | "down",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollData((prev) => {
        const currentY = window.scrollY;
        return {
          y: currentY,
          lastY: prev.y,
          direction: currentY > prev.y ? "down" : "up",
        };
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollData;
}
