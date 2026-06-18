"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { MagneticButton } from "./MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const socials = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "Instagram", href: "https://instagram.com/eliquinn_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eliantlequinn" },
];

export function Footer() {
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = new SplitType(headline.current!, { types: "lines" });
      // Wrap each line in an overflow-hidden mask so it can rise into view.
      split.lines?.forEach((ln) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        ln.parentNode?.insertBefore(mask, ln);
        mask.appendChild(ln);
        ln.classList.add("split-line");
      });
      if (reduce) {
        gsap.set(split.lines, { yPercent: 0 });
        return;
      }
      gsap.from(split.lines, {
        yPercent: 120,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: headline.current, start: "top 80%" },
      });
    },
    { scope: section }
  );

  return (
    <footer
      id="contact"
      ref={section}
      className="flex min-h-[100svh] flex-col justify-between bg-ink px-6 pb-8 pt-24 md:px-10 md:pt-32"
    >
      <div className="max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-tightest text-paper/60">
          04 / Contact
        </span>
        <h2
          ref={headline}
          className="mt-8 font-display text-[15vw] font-bold leading-[0.85] tracking-tightest text-paper md:text-[11vw]"
        >
          Let&apos;s build
          <br />
          something.
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        <div className="mt-16 flex flex-wrap items-end justify-between gap-8">
          <MagneticButton
            href="mailto:hello@example.com"
            className="inline-block border border-paper px-8 py-5 font-mono text-sm uppercase tracking-tightest text-paper transition-colors duration-300 hover:bg-signal hover:border-signal"
          >
            Start a conversation
          </MagneticButton>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm uppercase text-paper/80">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-sweep transition-colors duration-200 hover:text-signal"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-paper/20 pt-6 font-mono text-xs uppercase tracking-tightest text-paper/50">
          <span>Eli Quinn &copy; {new Date().getFullYear()}</span>
          <span>St. John&apos;s, NL</span>
        </div>
      </div>
    </footer>
  );
}
