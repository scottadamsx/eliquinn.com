"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = track.current!;
      // Horizontal scroll only on wider viewports; stack on mobile.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const scrollLen = () => el.scrollWidth - window.innerWidth;
        const horiz = gsap.to(el, {
          x: () => -scrollLen(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + scrollLen(),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress });
              }
            },
          },
        });

        // Depth: each card's content drifts + fades up as it crosses in.
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          const inner = card.querySelector(".work-card-inner");
          if (!inner) return;
          gsap.from(inner, {
            yPercent: 14,
            autoAlpha: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horiz,
              start: "left right",
              end: "left center",
              scrub: true,
            },
          });
        });
      });
      if (reduce) gsap.set(el, { x: 0 });
    },
    { scope: section }
  );

  return (
    <section id="work" ref={section} className="relative overflow-hidden bg-paper py-20 md:py-0">
      {/* horizontal-scroll progress */}
      <div
        ref={progress}
        className="work-progress absolute left-0 top-0 z-20 hidden h-[2px] w-full bg-signal md:block"
      />
      <div className="px-6 pb-10 md:absolute md:left-10 md:top-10 md:z-10 md:pb-0">
        <span className="font-mono text-xs uppercase tracking-tightest text-ash">
          01 / Selected Works
        </span>
      </div>
      <div
        ref={track}
        className="flex flex-col gap-6 px-6 md:h-[100svh] md:flex-row md:items-center md:gap-10 md:px-10"
      >
        {projects.map((p) => (
          <article
            key={p.index}
            className="work-card group w-full shrink-0 border border-line bg-paper p-7 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-ink md:h-[62vh] md:w-[42vw] lg:w-[34vw]"
          >
            <div className="work-card-inner flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-ash transition-colors duration-300 group-hover:text-signal">
                  {p.index}
                </span>
                <span className="font-mono text-xs uppercase tracking-tightest text-ash">
                  {p.status}
                </span>
              </div>
              <div>
                <h3 className="font-display text-5xl font-bold tracking-tightest text-ink transition-colors duration-300 group-hover:text-signal md:text-6xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-mono text-xs uppercase tracking-tightest text-ash">
                  {p.role}
                </p>
                <p className="mt-5 max-w-sm font-body text-[15px] leading-relaxed text-ink/80">
                  {p.blurb}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 pt-6">
                {p.tags.map((s) => (
                  <li
                    key={s}
                    className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-tightest text-ash transition-colors duration-300 group-hover:border-ash"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
