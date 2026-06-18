"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    // Honor reduced-motion: skip smooth scroll entirely (fall back to native).
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (r) {
      setReduce(true);
      return;
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  // Recalculate ScrollTrigger positions on every Lenis frame.
  useLenis(() => ScrollTrigger.update());

  // Reduced-motion: don't mount Lenis at all, or it intercepts scroll without
  // ever ticking (autoRaf is off) and the page becomes unscrollable.
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.09, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
