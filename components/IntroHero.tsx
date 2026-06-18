"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import SplitType from "split-type";

export function IntroHero() {
  const root = useRef<HTMLDivElement>(null);
  const videoWrap = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const eyebrow = useRef<HTMLParagraphElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  // Keep a live ref to Lenis. The GSAP timeline below is built once on mount,
  // but the provider's Lenis instance may not exist yet at that point — reading
  // it through a ref avoids capturing a stale `undefined` and never unlocking.
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [hasVideo, setHasVideo] = useState(true);
  const [posterOnly, setPosterOnly] = useState(false);

  // Lock scroll while the intro plays.
  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  // React's JSX `muted` attribute is unreliable; without a true `muted`
  // property the browser blocks autoplay and shows a play button. Force it
  // and kick off playback explicitly.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    // If autoplay is refused (Safari Low Power Mode / "Never Auto-Play"), drop
    // the video for the calm poster frame instead of Safari's play-button overlay.
    v.play().catch(() => setPosterOnly(true));
  }, []);

  // Cursor-reactive parallax on the film — a slow, expensive-feeling drift.
  useEffect(() => {
    const m = media.current;
    if (!m) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(m, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(m, "y", { duration: 0.7, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * -34);
      yTo((e.clientY / window.innerHeight - 0.5) * -34);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = new SplitType(heading.current!, { types: "lines,chars" });

      const start = () => lenisRef.current?.start();

      if (reduce) {
        gsap.set([eyebrow.current, sub.current, cue.current], { opacity: 1, y: 0 });
        gsap.set(split.chars, { opacity: 1, y: 0 });
        start();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: start,
      });

      // 1) Film holds full-bleed so the Higgsfield clip can breathe.
      tl.to({}, { duration: 2.2 })
        // 2) Settle: faint scale-down + eyebrow appears.
        .to(videoWrap.current, { scale: 1, duration: 1.3, ease: "power3.inOut" }, ">-0.1")
        .from(eyebrow.current, { y: 20, opacity: 0, duration: 0.6 }, "<0.1")
        // 3) Name surfaces: a soft fade + slight rise, like a bubble lifting
        //    into place. Starts transparent so nothing overflows the frame.
        .from(
          split.chars,
          {
            y: 26,
            opacity: 0,
            stagger: 0.018,
            duration: 0.9,
            ease: "power2.out",
          },
          "<0.1"
        )
        .from(sub.current, { y: 24, opacity: 0, duration: 0.7 }, ">-0.4")
        // 4) Scroll cue invites the user down once everything has settled.
        .from(cue.current, { opacity: 0, y: 10, duration: 0.6 }, ">-0.2");

      // Parallax drift on scroll.
      gsap.to(videoWrap.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] w-full items-end overflow-hidden"
    >
      {/* media layer */}
      <div ref={videoWrap} className="absolute inset-0 scale-[1.04]">
        <div ref={media} className="h-full w-full scale-110 will-change-transform">
          {hasVideo && !posterOnly ? (
            <video
              ref={video}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              poster="/hero-poster.jpg"
              onError={() => setHasVideo(false)}
            >
              <source src="/hero_video.webm" type="video/webm" />
              <source src="/hero_video.mp4" type="video/mp4" />
            </video>
          ) : hasVideo ? (
            // Autoplay blocked: show the still frame, not Safari's play overlay.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/hero-poster.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="hero-fallback h-full w-full" />
          )}
        </div>
        {/* filmic texture + focus */}
        <div className="grain" />
        <div className="vignette" />
        {/* legibility scrim, bottom-weighted */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 w-full px-6 pb-10 md:px-10 md:pb-16">
        <p
          ref={eyebrow}
          className="mb-4 font-mono text-xs uppercase tracking-tightest text-paper/80 md:text-sm"
        >
          St. John&apos;s, NL &middot; Architecture at Dalhousie
        </p>
        <h1
          ref={heading}
          className="font-display text-[20vw] font-bold leading-[0.82] tracking-tightest text-paper md:text-[14vw]"
        >
          Eli Quinn
        </h1>
        <p
          ref={sub}
          className="mt-6 max-w-md font-body text-base text-paper/90 md:text-lg"
        >
          Architecture student with an abstract, artistic eye &mdash; shaping
          light, material, and form into spaces that feel like sculpture you can
          live in.
        </p>
      </div>

      {/* scroll cue */}
      <div
        ref={cue}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="scroll-cue flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-tightest text-paper/70">
            Scroll
          </span>
          <span className="block h-9 w-px bg-paper/50" />
        </div>
      </div>
    </section>
  );
}
