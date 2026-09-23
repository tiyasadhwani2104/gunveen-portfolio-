"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Marquee from "@/components/Marquee";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import NameIntro from "@/components/NameIntro";
import Showreel from "@/components/Showreel";
import ScatterReveal from "@/components/ScatterReveal";
import MagneticButton from "@/components/MagneticButton";
import AmbientOrbs from "@/components/hero/AmbientOrbs";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import { siteConfig, caseStudies, skills } from "@/lib/data";

const heroWords = siteConfig.tagline.split(" ");

export default function Home() {
  return (
    <>
      <NameIntro />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24">
        <AmbientOrbs />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {siteConfig.availability}
          </motion.p>

          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-xl text-lg text-muted"
          >
            {siteConfig.subTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/work"
                data-cursor="link"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                View my work
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/about"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                About me
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-muted"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SHOWREEL ───────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <Reveal className="mx-auto max-w-6xl">
          <div data-cursor="view">
            <Showreel />
          </div>
        </Reveal>
      </section>

      {/* ── SKILLS MARQUEE ─────────────────────────────────── */}
      <Marquee items={[...skills.research, ...skills.strategy, ...skills.management]} />

      {/* ── FEATURED WORK ──────────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Selected work</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Research, strategy and business design
              </h2>
            </div>
            <Link href="/work" className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent">
              View all projects
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <ScatterReveal className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {caseStudies.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </ScatterReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS & CERTIFICATIONS ──────────────────── */}
      <TestimonialsSection />

      {/* ── ABOUT TEASER ───────────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <PlaceholderMedia
              label="Your photo here"
              accent="from-[#FFF8CA] via-[#F3E7B0] to-[#CDE3E8]"
              src="/images/gunveen-profile.webp"
              alt={siteConfig.fullName}
              aspect="aspect-[4/5]"
              className="max-w-sm"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {siteConfig.discipline}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {siteConfig.intro.headline}
            </h2>
            {siteConfig.intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 text-muted">
                {paragraph}
              </p>
            ))}
            <p className="mt-5 font-display text-lg font-semibold">
              {siteConfig.intro.closing}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
            >
              More about my process
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <Reveal className="mx-auto max-w-6xl rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            I ask questions, connect the dots, and turn complexity into clarity.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-background/70">
            {siteConfig.availabilityDetail}
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Get in touch
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
