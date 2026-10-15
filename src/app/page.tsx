import Link from "next/link";
import HeroScroll from "@/components/HeroScroll";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import ExperienceList from "@/components/ExperienceList";
import { CountUp, FadeUp, SplitHeading } from "@/components/Reveal";
import { experience, profile, projects, skills, stats } from "@/data/content";

export default function Home() {
  const allSkills = Object.values(skills).flat();
  const latest = experience[0];

  return (
    <>
      <HeroScroll>
        <p className="meta mb-8 text-muted">
          {profile.role} — {profile.school} &apos;{String(profile.gradYear).slice(2)}
        </p>
        <SplitHeading
          text="Building AI that doesn't {{hallucinate}} and apps that don't crash."
          delay={0.5}
          className="display max-w-[16ch] text-[13vw] md:text-[8.2vw]"
        />
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
          <p className="max-w-md text-muted">
            Waterloo CS &amp; Finance. Obsessed with making things that scale — not with making things complicated.
          </p>
          <p className="meta text-muted">
            Most recently: {latest.roles[0].title} @ {latest.company}
            <br />
            <span className="text-accent">↓ Scroll</span>
          </p>
        </div>
      </HeroScroll>

      {/* Impact numbers */}
      <section className="px-5 py-32 md:px-10">
        <p className="meta mb-12 text-muted">( Impact )</p>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {stats.map((s) => (
            <FadeUp key={s.label}>
              <p className="display text-7xl text-accent md:text-[9rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-4 max-w-sm text-muted">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="px-5 py-32 md:px-10">
        <div className="mb-16">
          <p className="meta mb-6 text-muted">( Experience )</p>
          <SplitHeading as="h2" text="Where I've {{shipped}}" className="display text-[14vw] md:text-[9vw]" />
        </div>
        <ExperienceList />
      </section>

      {/* Selected work */}
      <section className="px-5 py-24 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <SplitHeading as="h2" text="Selected {{work}}" className="display text-[14vw] md:text-[9vw]" />
          <Link href="/work" data-cursor className="meta shrink-0 text-muted hover:text-accent">
            All projects →
          </Link>
        </div>
        <div className="grid gap-20">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section className="overflow-hidden border-y border-line py-16">
        <p className="meta mb-10 px-5 text-muted md:px-10">( Toolkit )</p>
        <Marquee items={allSkills} duration={60} />
      </section>

      {/* About teaser */}
      <section className="grid gap-12 px-5 py-32 md:grid-cols-[1fr_2fr] md:px-10">
        <p className="meta text-muted">( About )</p>
        <div>
          <SplitHeading
            as="h2"
            text="Serial hobbyist. {{Good enough}} never cuts it."
            className="display text-5xl md:text-7xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-10 max-w-2xl text-xl text-muted">
              Golf, food, and a year of pro Counter-Strike. I can&apos;t do anything halfway — whether that&apos;s
              optimizing an algorithm or nailing a dish I had last week.
            </p>
            <Link href="/about" data-cursor="Read" className="meta mt-10 inline-block rounded-full border border-line px-6 py-3 hover:border-accent hover:text-accent">
              More about me →
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
