"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Dot that trails the pointer and grows over anything marked [data-cursor]. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setActive(!!el);
      // a bare `data-cursor` attribute arrives as "true": grow the dot, but show no label
      const text = el?.dataset.cursor;
      setLabel(text && text !== "true" ? text : null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-white mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: active ? (label ? 92 : 56) : 12, height: active ? (label ? 92 : 56) : 12 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {label && <span className="meta text-black" style={{ fontSize: "0.6rem" }}>{label}</span>}
    </motion.div>
  );
}
