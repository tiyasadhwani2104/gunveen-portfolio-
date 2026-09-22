import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkColumns from "@/components/work/WorkColumns";
import { caseStudies, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: "Service design case studies and selected projects.",
};

export default function WorkPage() {
  return (
    <section className="px-6 pt-36 pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Work</p>
          <h1 className="mt-2 font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Case studies in research, strategy, and business design.
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            {caseStudies.length} selected projects spanning digital healthcare research, team
            frameworks and game design, a product venture, and a live client brief — each one
            broken down from problem to what I&apos;d do differently.
          </p>
        </Reveal>

        <WorkColumns projects={caseStudies} />

        {/* Compact index: the accordion above is pointer-driven and client-only,
            so this stays as the scannable, keyboard- and no-JS-accessible path
            to every case study. Kept as a list, not cards, to avoid showing the
            same four projects twice. */}
        <div className="mt-24 border-t border-line pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Index
          </p>
          <ul className="mt-6">
            {caseStudies.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="link"
                  className="group grid gap-1 border-b border-line py-5 transition-colors hover:text-accent sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {project.title}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {project.category} · {project.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
