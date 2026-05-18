"use client";

import { ReactNode, useEffect, useState } from "react";

type LenisComponent = React.ComponentType<{
  root?: boolean;
  options?: { lerp: number; duration: number; smoothWheel: boolean };
  children?: ReactNode;
}>;

const shouldEnableSmoothScroll = () => {
  if (typeof window === "undefined") return false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData ?? false;
  return !(reduceMotion || saveData);
};

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const [Lenis, setLenis] = useState<LenisComponent | null>(null);

  useEffect(() => {
    if (!shouldEnableSmoothScroll()) return;

    let cancelled = false;

    const loadLenis = () => {
      import("lenis/react").then((mod) => {
        if (!cancelled) {
          setLenis(() => mod.ReactLenis);
        }
      });
    };

    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
        .requestIdleCallback(loadLenis, { timeout: 2000 });
    } else {
      window.setTimeout(loadLenis, 700);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Lenis) return <>{children}</>;

  return (
    <Lenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </Lenis>
  );
};
