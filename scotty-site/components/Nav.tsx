"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Works", href: "#work" },
  { label: "Studio", href: "#about" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis(({ direction, scroll }: any) => {
    setHidden(direction === 1 && scroll > 200 && !open);
  });

  function go(href: string) {
    setOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el && lenis) lenis.scrollTo(el, { offset: 0 });
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] flex items-center justify-between px-6 py-5 mix-blend-difference transition-transform duration-500 md:px-10 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#top"
          className="link-sweep font-mono text-sm uppercase tracking-tightest text-paper"
          onClick={(e) => {
            e.preventDefault();
            lenis?.scrollTo(0);
          }}
        >
          Eli Quinn
        </a>
        <nav className="hidden gap-8 font-mono text-sm uppercase text-paper md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="link-sweep transition-colors duration-300 hover:text-signal"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-sm uppercase text-paper md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[140] flex flex-col justify-center gap-2 bg-ink px-6"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left font-display text-5xl font-bold uppercase text-paper"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
