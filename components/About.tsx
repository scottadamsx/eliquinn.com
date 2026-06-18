"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const paras = [
  "I'm an architecture student at Dalhousie, based in St. John's, Newfoundland — drawn to the abstract, artistic side of building.",
  "I treat each project as a piece of art first: a single strong idea, a form, a play of light — then the discipline to make it stand up and work.",
  "I care most about the quiet things: how daylight crosses a wall through the day, how concrete and timber age, how a space makes you feel before you can explain why.",
  "Good architecture isn't loud. It's the building you keep coming back to.",
];

export function About() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const blocks = gsap.utils.toArray<HTMLElement>(".about-line");
      blocks.forEach((block) => {
        const split = new SplitType(block, { types: "lines" });
        split.lines?.forEach((ln) => {
          const w = document.createElement("span");
          w.className = "line-mask";
          ln.parentNode?.insertBefore(w, ln);
          w.appendChild(ln);
          ln.classList.add("split-line");
        });
        if (reduce) {
          gsap.set(split.lines, { yPercent: 0 });
          return;
        }
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: block, start: "top 85%" },
        });
      });
    },
    { scope: section }
  );

  return (
    <section id="about" ref={section} className="border-t border-line bg-paper px-6 py-24 md:px-10 md:py-36">
      <span className="font-mono text-xs uppercase tracking-tightest text-ash">
        02 / Studio
      </span>
      <div className="mt-10 max-w-4xl space-y-7">
        {paras.map((p, i) => (
          <p
            key={i}
            className={`about-line font-display tracking-tightest text-ink ${
              i === paras.length - 1
                ? "text-3xl font-medium md:text-4xl"
                : "text-2xl font-medium md:text-[2rem] md:leading-snug"
            }`}
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
