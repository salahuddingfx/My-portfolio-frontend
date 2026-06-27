"use client";

import { useEffect, useRef } from "react";

export function MobileHeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let phase = 0;
    
    const getThemeColor = (cssVar: string, fallback: string) => {
      if (typeof window !== "undefined") {
        const computed = getComputedStyle(document.documentElement);
        const color = computed.getPropertyValue(cssVar).trim();
        return color || fallback;
      }
      return fallback;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cyan = getThemeColor("--neo-cyan", "#00F0FF");
      const pink = getThemeColor("--neo-pink", "#FF007F");
      const yellow = getThemeColor("--neo-yellow", "#FFD84D");

      const waves = [
        {
          amplitude: 45,
          frequency: 0.003,
          speed: 0.012,
          color: cyan,
          opacity: 0.22,
          yOffset: 0.45
        },
        {
          amplitude: 35,
          frequency: 0.004,
          speed: -0.008,
          color: pink,
          opacity: 0.18,
          yOffset: 0.55
        },
        {
          amplitude: 25,
          frequency: 0.006,
          speed: 0.006,
          color: yellow,
          opacity: 0.25,
          yOffset: 0.5
        }
      ];

      phase += 0.5;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = wave.opacity;

        const centerY = canvas.height * wave.yOffset;

        for (let x = 0; x < canvas.width; x++) {
          // Sine wave formula with tapering towards boundaries for seamless blending
          const taper = Math.sin((x / canvas.width) * Math.PI);
          const y = centerY + Math.sin(x * wave.frequency + phase * wave.speed) * wave.amplitude * taper;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
