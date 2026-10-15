"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/data/content";
import { SplitHeading } from "./Reveal";

function useClock(timeZone: string) {
  const [now, setNow] = useState({ time: "", year: "" });
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone, hour12: false });
    const tick = () => {
      const d = new Date();
      setNow({ time: fmt.format(d), year: String(d.getFullYear()) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return now;
}

export default function Footer() {
  const { time, year } = useClock(profile.timeZone);
  const compact = usePathname() === "/contact"; // the contact page already is the call to action

  return (
    <footer className="relative border-t border-line px-5 pb-8 pt-24 md:px-10">
      {!compact && (
        <>
          <p className="meta mb-6 text-muted">Got an idea or just want to say hi?</p>
          <a href={`mailto:${profile.email}`} data-cursor="Email" className="group block">
            <SplitHeading as="h2" text="Let's build {{something}} together." className="display text-[13vw] md:text-[9vw]" />
          </a>
        </>
      )}

      <div className={`grid grid-cols-2 gap-8 ${compact ? "" : "mt-20"}`}>
        <div>
          <p className="meta mb-2 text-muted">Based in</p>
          <p>{profile.location}</p>
          <p className="meta mt-1 text-accent tabular-nums">{time || "--:--:--"} ET</p>
        </div>
        <div>
          <p className="meta mb-2 text-muted">Elsewhere</p>
          {profile.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" data-cursor className="block hover:text-accent">
              {s.label} ↗
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noreferrer" data-cursor className="block hover:text-accent">
            Resume ↗
          </a>
        </div>
      </div>

      <p className="meta mt-16 text-muted">© {year} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
