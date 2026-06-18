# eliquinn.com — Eli Quinn, Architecture

Personal site for Eli Quinn, an architecture student at Dalhousie. A brutalist-minimal site with an intro film that settles into the hero, smooth scroll, scroll-triggered reveals, a pinned horizontal work gallery, a custom cursor, and magnetic interactions.

Built with **Next.js (App Router) · TypeScript · Tailwind · Lenis · GSAP/ScrollTrigger · Framer Motion · split-type.**

## Run it

```bash
npm install
npm run dev
# http://localhost:3000
```

It runs immediately. With no hero video present, the hero falls back to an animated monochrome CSS background, so nothing looks broken before you add the clip.

## Drop in your Higgsfield clip

1. Download the generated clip.
2. Put it in `public/` as `hero-loop.mp4` (and ideally `hero-loop.webm` for smaller size).
3. Export one still frame (the calm end frame works best) as `public/hero-poster.jpg`. This is the poster *and* the reduced-motion fallback, so it should look good frozen.

Compress before shipping (Handbrake or `ffmpeg`), target a few MB:

```bash
ffmpeg -i hero-loop.mp4 -an -vf "scale=1920:-2" -crf 28 -preset slow public/hero-loop.mp4
ffmpeg -i public/hero-loop.mp4 -vframes 1 -ss 4 public/hero-poster.jpg   # grab end frame
```

The intro holds the film full-bleed for ~2.2s, then settles it into the hero while your name reveals over it. Tune timings in `components/IntroHero.tsx`.

## Project map

```
app/
  layout.tsx            fonts, cursor, smooth-scroll provider, nav
  template.tsx          per-navigation page transition
  page.tsx              section order
  globals.css           tokens, cursor, reduced-motion, hero fallback
  providers/
    SmoothScroll.tsx    Lenis <-> GSAP ScrollTrigger wiring (the part to not touch)
components/
  IntroHero.tsx         Higgsfield film -> hero handoff + char reveal + parallax
  Nav.tsx               hide-on-scroll + full-screen overlay menu
  Cursor.tsx            custom cursor, grows on interactive elements
  Reveal.tsx            reusable scroll-in stagger
  MagneticButton.tsx    button that leans toward the cursor
  Work.tsx              pinned horizontal-scroll project gallery
  About.tsx             line-by-line masked text reveal
  Beyond.tsx            infinite marquee
  Footer.tsx            big CTA + magnetic button + socials
lib/
  projects.ts           your project data — edit here
```

## Make it yours

- **Projects:** edit `lib/projects.ts`.
- **Copy / bio:** `components/About.tsx`, `components/IntroHero.tsx`.
- **Socials & email:** `components/Footer.tsx` (currently placeholders — `hello@example.com`, empty profile URLs).
- **Color / type:** `tailwind.config.ts`. The signal blue (`#2E2BE8`) is used only for interaction states on purpose; keep it rare.
- **Scroll feel:** `lerp` in `SmoothScroll.tsx` (0.05 floaty → 0.15 snappy; currently 0.09).
- **The house ease** is `power4.out` / cubic `[0.76, 0, 0.24, 1]`. Reuse it for consistency.

## Accessibility

`prefers-reduced-motion` is respected everywhere: smooth scroll, the intro film, reveals, the marquee, and horizontal scroll all disable and fall back to static content. Test with that OS setting on before shipping.

## Optional upgrade: self-hosted fonts

Fonts currently load via a Google Fonts `<link>` for zero-config portability. For best performance (no layout shift, no third-party request), switch to `next/font/google` — import the three families in `layout.tsx`, attach their `.variable` classes to `<html>`, and drop the `<link>` tags. Requires network access at build time.

## Deploy

Push to GitHub and import on Vercel — zero config for Next.js App Router. `npm run build` already passes.
