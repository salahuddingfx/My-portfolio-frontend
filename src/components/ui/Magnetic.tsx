"use client";

import React, { useEffect, useRef } from "react";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    let cancelled = false;
    let cleanup = () => {};

    const setup = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !magnetic.current) return;

      const xTo = gsap.quickTo(magnetic.current, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(magnetic.current, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      magnetic.current?.addEventListener("mousemove", handleMouseMove);
      magnetic.current?.addEventListener("mouseleave", handleMouseLeave);

      cleanup = () => {
        magnetic.current?.removeEventListener("mousemove", handleMouseMove);
        magnetic.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    setup();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return React.cloneElement(children as React.ReactElement<any>, { ref: magnetic });
}
