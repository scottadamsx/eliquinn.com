"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const items = [
  "Concrete",
  "Daylight",
  "Tadao Ando",
  "Carrara marble",
  "Brutalism",
  "Sketching",
  "Scale models",
  "Le Corbusier",
  "Travel",
  "Timber",
];

export function Beyond() {
  const row = useRef<HTMLDivElement>(null);
  const skewTo = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.to(row.current, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });
    // Skew the marquee in proportion to scroll velocity, then ease back to 0.
    skewTo.current = gsap.quickTo(row.current, "skewX", {
      duration: 0.5,
      ease: "power3",
    });
  });

  useLenis(({ velocity }: { velocity: number }) => {
    skewTo.current?.(gsap.utils.clamp(-14, 14, velocity * 0.6));
  });

  return (
    <section id="beyond" className="overflow-hidden border-y border-line bg-ink py-8">
      <div className="mb-6 px-6 md:px-10">
        <span className="font-mono text-xs uppercase tracking-tightest text-paper/60">
          03 / Beyond the work
        </span>
      </div>
      <div className="flex whitespace-nowrap will-change-transform" ref={row}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 font-display text-5xl font-bold uppercase tracking-tightest text-paper md:text-7xl"
          >
            {item}
            <span className="ml-12 text-signal">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
