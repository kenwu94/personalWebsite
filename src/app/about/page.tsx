import type { Metadata } from "next";
import Image from "next/image";
import { FadeUp, SplitHeading } from "@/components/Reveal";
import { awards, hobbies, profile } from "@/data/content";

export const metadata: Metadata = { title: "About — Ken Wu" };

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pb-24 pt-40 md:px-10">
        <p className="meta mb-6 text-muted">( About )</p>
        <SplitHeading text="Hey, I'm {{Ken}}." className="display text-[18vw] md:text-[12vw]" />
      </section>

      <section className="grid gap-16 px-5 pb-32 md:grid-cols-[2fr_3fr] md:px-10">
        <FadeUp>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" data-cursor>
            <Image
              src="/ken-wu-about.jpg"
              alt="Ken Wu"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </FadeUp>

        <div className="space-y-8 text-xl text-muted md:text-2xl">
          <FadeUp>
            <p>
              I study <span className="text-foreground">{profile.program}</span> at the{" "}
              <span className="text-foreground">{profile.school}</span>, graduating in {profile.gradYear}. Most of my time goes into building things —
              AI systems, software, and applications that actually solve problems people care about.
            </p>
          </FadeUp>
          <FadeUp>
            <p>
              I co-founded <span className="text-foreground">Fractal Finance</span>, a Waterloo fintech startup that raised over $350K. At{" "}
              <span className="text-foreground">RECO</span> I built a compliance platform that screens thousands of real estate ads a week. At{" "}
              <span className="text-foreground">Geotab</span> I built AI agents that saved thousands of dollars a day, then sped up the GenAI Gateway
              that serves every model.
            </p>
          </FadeUp>
          <FadeUp>
            <blockquote className="serif-accent border-l-2 border-accent pl-6 text-3xl text-foreground md:text-4xl">
              &ldquo;Good enough&rdquo; doesn&apos;t really cut it for me. I want to actually master whatever I&apos;m working on.
            </blockquote>
          </FadeUp>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10">
        <p className="meta mb-6 text-muted">( Beyond work )</p>
        <SplitHeading as="h2" text="Serial {{hobbyist}}" className="display mb-16 text-[14vw] md:text-[8vw]" />
        <div className="grid border-y border-line md:grid-cols-3">
          {hobbies.map((h, i) => (
            <FadeUp
              key={h.title}
              delay={i * 0.08}
              className={`h-full border-b border-line last:border-b-0 md:border-b-0 ${i > 0 ? "md:border-l" : ""}`}
            >
              <div
                className={`group flex h-full flex-col justify-between gap-16 py-10 md:min-h-[24rem] md:px-8 ${i === 0 ? "md:pl-0" : ""} ${
                  i === hobbies.length - 1 ? "md:pr-0" : ""
                }`}
                data-cursor
              >
                <div>
                  <p className="meta text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-3 text-4xl transition-colors group-hover:text-accent md:text-5xl">{h.title}</h3>
                </div>
                <p className="text-muted">{h.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="mt-16">
          <p className="max-w-2xl text-xl text-muted">
            If we share some interests, I&apos;d love to hear from you. Don&apos;t be afraid to reach out.
          </p>
        </FadeUp>
      </section>

      <section className="px-5 py-24 md:px-10">
        <p className="meta mb-6 text-muted">( Education )</p>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line py-10">
          <h3 className="display text-4xl md:text-6xl">{profile.school}</h3>
          <p className="text-muted">
            {profile.program} <span className="meta ml-4">Sep 2023 — May {profile.gradYear}</span>
          </p>
        </div>
        <ul className="divide-y divide-line">
          {awards.map((a) => (
            <li key={a.title} className="flex flex-wrap items-baseline justify-between gap-2 py-5">
              <span>
                <span className="text-foreground">{a.title}</span> <span className="text-muted">— {a.detail}</span>
              </span>
              <span className="meta text-muted">{a.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
