import type { Metadata } from "next";
import { FadeUp, SplitHeading } from "@/components/Reveal";
import { profile } from "@/data/content";

export const metadata: Metadata = { title: "Contact — Ken Wu" };

export default function ContactPage() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-5 pb-24 pt-40 md:px-10">
      <p className="meta mb-6 text-muted">( Contact )</p>
      <SplitHeading text="Let's {{connect}}." className="display text-[20vw] md:text-[13vw]" />
      <FadeUp delay={0.3} className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="max-w-xl text-xl text-muted">
            Interested in AI development, software engineering, or collaborating on something ambitious? Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="Email"
            className="display mt-8 inline-block break-all text-3xl underline decoration-accent decoration-2 underline-offset-8 hover:text-accent md:text-6xl"
          >
            {profile.email}
          </a>
        </div>
        <ul className="space-y-3 md:text-right">
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" data-cursor className="display text-4xl hover:text-accent">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
