"use client";

import { useEffect, useState, useRef } from "react";

export default function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "exiting" | "done">("loading");
  const [isClient, setIsClient] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && (window as any)._introLoaded) {
      setLoading(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < 60) {
        current += Math.floor(Math.random() * 10) + 4;
      } else if (current < 90) {
        current += Math.floor(Math.random() * 4) + 1;
      } else if (current < 100) {
        current += 1;
      }
      const next = Math.min(current, 100);
      setPercent(next);
      if (next >= 100) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100 && phase === "loading") {
      const t = setTimeout(() => setPhase("ready"), 400);
      return () => clearTimeout(t);
    }
  }, [percent, phase]);

  useEffect(() => {
    if (phase === "ready") {
      const t = setTimeout(() => setPhase("exiting"), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "exiting") {
      const t = setTimeout(() => {
        setPhase("done");
        setLoading(false);
        if (typeof window !== "undefined") {
          (window as any)._introLoaded = true;
        }
        window.dispatchEvent(new Event("intro-loader-finished"));
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (!isClient || !loading) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999999] flex flex-col items-center justify-center bg-[var(--background)]"
      style={{ opacity: phase === "exiting" ? 0 : 1, transition: "opacity 0.5s ease" }}
    >
      {/* Top bar - name + percent */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between" style={{ padding: "clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem)" }}>
        <span 
          className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Salah Uddin Kader
        </span>
        <span className="text-[13px] font-mono font-bold text-[var(--muted)] tabular-nums">
          {String(percent).padStart(3, "0")}%
        </span>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div 
          className="flex h-16 w-16 items-center justify-center bg-[#000000] border-[3px] border-[#000000] shadow-[4px_4px_0px_#000000]"
          style={{ 
            borderRadius: "var(--radius-md)",
            transform: phase === "ready" ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease"
          }}
        >
          <span className="text-xl font-extrabold text-[#FFFFFF]" style={{ fontFamily: "var(--font-space-grotesk)" }}>S</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 flex flex-col items-center gap-3">
          <div className="w-full h-[3px] bg-[var(--surface-2)] border border-[#000000]/10 overflow-hidden" style={{ borderRadius: "var(--radius-sm)" }}>
            <div 
              ref={barRef}
              className="h-full bg-[var(--neo-yellow)]"
              style={{ 
                width: `${percent}%`, 
                transition: "width 0.1s linear",
                borderRadius: "var(--radius-sm)"
              }}
            />
          </div>
          
          {/* Loading text */}
          <div className="flex items-center gap-2">
            {phase === "loading" && (
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                Loading
              </span>
            )}
            {phase === "ready" && (
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--neo-yellow)]">
                Click anywhere to enter
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom - status */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between" style={{ padding: "clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem)" }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
          Creative Developer
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
