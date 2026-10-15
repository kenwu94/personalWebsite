"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experience } from "@/data/content";
import { FadeUp } from "./Reveal";

/** Accordion rows: big role names, details expand on click/hover target. */
export default function ExperienceList() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="border-t border-line">
      {experience.map((e, i) => {
        const isOpen = open === i;
        return (
          <FadeUp key={e.company}>
            <div className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                data-cursor={isOpen ? "Close" : "Open"}
                className="flex w-full items-baseline justify-between gap-6 py-8 text-left"
                aria-expanded={isOpen}
              >
                <span className="meta w-10 shrink-0 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className={`display block text-4xl transition-colors md:text-6xl ${isOpen ? "text-accent" : ""}`}>{e.company}</span>
                  <span className="serif-accent mt-1 block text-xl text-muted md:text-2xl">{e.roles.map((r) => r.title).join(" · ")}</span>
                </span>
                <span className="meta hidden text-right text-muted md:block">
                  {e.period}
                  <br />
                  {e.location}
                </span>
                <span className="meta text-xl">{isOpen ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-10 pb-10 md:pl-16">
                      {e.roles.map((r) => (
                        <div key={r.title}>
                          <p className="meta mb-4 flex justify-between gap-4 text-foreground">
                            <span>{r.title}</span>
                            <span className="text-muted">{r.period}</span>
                          </p>
                          <ul className="grid gap-4 text-lg text-muted md:grid-cols-3">
                            {r.points.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}
