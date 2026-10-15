"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Parallax wrapper: hero content drifts up and fades as you scroll past it. */
export default function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[8%] h-[70vw] w-[70vw] rounded-full opacity-40 blur-3xl md:h-[45vw] md:w-[45vw]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
      />
      <motion.div style={{ y, opacity }} className="relative">
        {children}
      </motion.div>
    </section>
  );
}
