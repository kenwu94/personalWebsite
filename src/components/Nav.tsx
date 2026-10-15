"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { profile } from "@/data/content";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-background/80 px-5 backdrop-blur-md md:px-10">
        <Link href="/" data-cursor onClick={() => setOpen(false)} className="text-lg font-semibold tracking-tight">
          Ken Wu<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor
              className={`meta transition-opacity hover:opacity-100 ${pathname.startsWith(l.href) ? "opacity-100" : "opacity-60"}`}
            >
              {l.label}
            </Link>
          ))}
          <a href={profile.resume} target="_blank" rel="noreferrer" data-cursor className="meta rounded-full border border-foreground/40 px-4 py-2 transition-colors hover:border-accent hover:text-accent">
            Resume ↗
          </a>
        </nav>

        <button className="meta md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-background px-5 md:hidden"
          >
            {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
              <motion.div key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="display block text-6xl">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <a href={profile.resume} className="meta mt-6 text-accent">Resume ↗</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
