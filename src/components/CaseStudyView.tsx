"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import SplitHeading from "./type/SplitHeading";
import CoverReveal from "./type/CoverReveal";
import StaggerGroup from "./type/StaggerGroup";
import CaseBlock, { isWideBlock } from "./case/CaseBlock";
import type { CaseStudy } from "@/lib/data";

/**
 * Renders a case study from its block list. Every block kind is handled in
 * `case/CaseBlock`, so a project keeps whatever structure its story needs —
 * this file only owns the page frame: header, cover, overview, block rhythm,
 * pills and the next-project card.
 */
export default function CaseStudyView({
  project,
  next,
}: {
  project: CaseStudy;
  next: CaseStudy;
}) {
  // Capabilities and tags overlap on some projects ("Framework building" is in
  // both), so collapse them case-insensitively, keeping the first spelling.
  const pills = Array.from(
    new Map(
      [...project.capabilities, ...project.tags].map((p) => [p.toLowerCase(), p])
    ).values()
  );

  return (
    <article>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="px-6 pt-36 pb-12">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              href="/work"
              data-cursor="link"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Back to work
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-xs font-semibold uppercase tracking-wide text-accent"
          >
            {project.category}
            <span className="text-muted"> · {project.year}</span>
          </motion.p>

          <SplitHeading
            as="h1"
            immediate
            delay={0.15}
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {project.title}
          </SplitHeading>

          <SplitHeading
            as="p"
            immediate
            delay={0.32}
            stagger={0.06}
            duration={0.8}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {project.subtitle}
          </SplitHeading>
        </div>
      </section>

      {/* ── COVER ──────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <CoverReveal
            label={project.title}
            accent={project.coverAccent}
            src={project.coverSrc}
            fit="contain"
            aspect="aspect-[16/9]"
          />
        </div>
      </section>

      {/* ── OVERVIEW ───────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="max-w-[64ch] text-lg leading-[1.7] text-foreground sm:text-xl">
              {project.summary}
            </p>
          </Reveal>

          {/* Variable-length label/value rows — values can be full sentences,
              so each row is a two-column band rather than a fixed grid. */}
          <StaggerGroup as="dl" className="mt-12" stagger={0.06} y={20}>
            {project.meta.map((row) => (
              <div
                key={row.label}
                className="grid gap-x-8 gap-y-1 border-t border-line py-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {row.label}
                </dt>
                <dd className="max-w-[62ch] leading-relaxed text-muted">{row.value}</dd>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── BLOCKS ─────────────────────────────────────────── */}
      {project.blocks.map((block, i) => (
        <section key={i} className="px-6 pb-20 sm:pb-24">
          <div className={isWideBlock(block) ? "mx-auto max-w-5xl" : "mx-auto max-w-4xl"}>
            <CaseBlock block={block} />
          </div>
        </section>
      ))}

      {/* ── CAPABILITIES & TAGS ────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              What this project used
            </p>
          </Reveal>
          <StaggerGroup
            className="mt-6 flex flex-wrap gap-2"
            stagger={0.03}
            y={14}
            duration={0.6}
          >
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
              >
                {pill}
              </span>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── NEXT PROJECT ───────────────────────────────────── */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Next project</p>
          </Reveal>
          <div className="mx-auto mt-8 max-w-md" data-cursor="view">
            <ProjectCard project={next} />
          </div>
        </div>
      </section>
    </article>
  );
}
