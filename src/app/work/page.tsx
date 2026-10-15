import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { FadeUp, SplitHeading } from "@/components/Reveal";
import { profile, projects } from "@/data/content";

export const metadata: Metadata = { title: "Work — Ken Wu" };

export default function WorkPage() {
  return (
    <section className="px-5 pb-32 pt-40 md:px-10">
      <p className="meta mb-6 text-muted">( Work — {projects.length} projects )</p>
      <SplitHeading text="Things I've {{built}}" className="display mb-24 text-[15vw] md:text-[10vw]" />
      <div className="grid gap-20">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <FadeUp className="mt-24 border-t border-line pt-8">
        <a href={profile.socials[0].href} target="_blank" rel="noreferrer" data-cursor className="meta text-muted hover:text-accent">
          More on GitHub ↗
        </a>
      </FadeUp>
    </section>
  );
}
