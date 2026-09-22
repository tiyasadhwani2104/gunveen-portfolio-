import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import SplitHeading from "@/components/type/SplitHeading";
import StaggerGroup from "@/components/type/StaggerGroup";
import BeyondSection from "@/components/beyond/BeyondSection";
import { siteConfig, skills, experience } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.subTagline,
};

const skillGroups = [
  { title: "Research", items: skills.research },
  { title: "Strategy", items: skills.strategy },
  { title: "Leadership & Management", items: skills.management },
  { title: "Tools", items: skills.tools },
];

const strategicApproach = [
  { title: "Observe", description: "Understand people, behaviour, and context before assuming a solution." },
  { title: "Question", description: "Challenge assumptions and dig for the real problem behind the stated one." },
  { title: "Research", description: "Explore users, markets, culture, competitors, and the wider system." },
  { title: "Synthesise", description: "Find patterns across raw research and convert them into insight." },
  { title: "Frame", description: "Define the opportunity and the strategic problem worth solving." },
  { title: "Strategise", description: "Connect human needs with organisational and business value." },
  { title: "Create", description: "Develop concepts and possible interventions grounded in the strategy." },
  { title: "Validate", description: "Test assumptions with real people and gather honest feedback." },
  { title: "Implement", description: "Consider feasibility, stakeholders, operations, and scalability." },
  { title: "Reflect", description: "Evaluate what worked, what changed, and what could be improved." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="px-6 pt-36 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <div data-cursor="view">
              <PlaceholderMedia
                label="Your photo here"
                accent="from-[#FFF8CA] via-[#F3E7B0] to-[#CDE3E8]"
                src="/images/gunveen-profile.webp"
                alt={`${siteConfig.fullName}`}
                priority
                aspect="aspect-[4/5]"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">About me</p>
            </Reveal>
            <SplitHeading
              as="h1"
              immediate
              delay={0.2}
              className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Hi, I&apos;m {siteConfig.fullName}.
            </SplitHeading>
            <Reveal delay={0.2}>
              <p className="mt-5 text-lg text-muted leading-relaxed">
                Strategic Design Management student with experience in client-facing projects, brand strategy,
                and cross-functional collaboration. Skilled in stakeholder communication, market research,
                project coordination, and delivering strategic solutions. Seeking opportunities in client
                servicing and account management where I can bridge client needs with creative execution.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Recently contributed as a Project Manager intern at Maha CSR, where end-to-end event execution
                enabled impactful Corporate Social Responsibility initiatives. This role strengthened my skills
                in project management, stakeholder coordination, and strategic planning. I&apos;m aiming to
                create innovative solutions at the intersection of design and social impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  Download resume
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/contact"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent"
                >
                  Get in touch
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS PHILOSOPHY ─────────────────────────────── */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">How I work</p>
          </Reveal>
          <SplitHeading
            className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
            stagger={0.1}
          >
            Research first, blueprint always, prototype before you believe you&apos;re right.
          </SplitHeading>

          <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-3" stagger={0.1} y={34}>
            {[
              {
                n: "01",
                title: "Understand the system",
                body: "Every service problem sits inside a bigger system of people, incentives, and constraints. I map it before I try to fix it.",
                // Your own research-board photo — this is literally you mapping a system.
                bgImage: "/images/research-board.webp",
              },
              {
                n: "02",
                title: "Design the backstage",
                body: "A great customer experience that isn't operationally viable isn't a solution — it's a wish. I design frontstage and backstage together.",
                // Facilitation photo pending — send it and it'll get the same treatment.
                bgImage: undefined,
              },
              {
                n: "03",
                title: "Prototype to learn",
                body: "I test the riskiest assumption first and as cheaply as possible, using role-play, Wizard-of-Oz, or paper before pixels.",
                // Your own prototype-board photo, laid out for testing.
                bgImage: "/images/prototype-board.webp",
              },
            ].map((item) => (
              <div key={item.n} className="relative overflow-hidden rounded-2xl border border-line p-8">
                {item.bgImage ? (
                  <>
                    {/* Faded to atmosphere behind the text, tinted dark so the
                        light text on top stays fully readable regardless of
                        what's busy in the photo. */}
                    <Image
                      src={item.bgImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/95" />
                  </>
                ) : null}
                <div className="relative">
                  <span className="font-display text-3xl text-accent">{item.n}</span>
                  <h3 className="font-display mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── STRATEGIC APPROACH ─────────────────────────────── */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">How I think</p>
          </Reveal>
          <SplitHeading
            className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
            stagger={0.1}
          >
            A strategic approach, from observation to implementation.
          </SplitHeading>

          {/* The ten steps read as one sequence, so they cascade rather than
              each fading in on its own trigger. */}
          <StaggerGroup className="mt-10 space-y-6" stagger={0.09} y={26} duration={0.75}>
            {strategicApproach.map((step, i) => (
              <div
                key={step.title}
                className="grid gap-4 border-t border-line pt-6 sm:grid-cols-[80px_1fr]"
              >
                <span className="font-display text-2xl text-muted">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────── */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Skills & tools</p>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, gi) => (
              <div key={group.title}>
                <Reveal delay={gi * 0.08}>
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                </Reveal>
                <StaggerGroup
                  as="ul"
                  className="mt-4 flex flex-wrap gap-2"
                  stagger={0.035}
                  y={12}
                  duration={0.55}
                  delay={gi * 0.08}
                >
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </StaggerGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────────────────── */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Experience & education</p>
          </Reveal>
          <StaggerGroup className="mt-10 space-y-8" stagger={0.1} y={30} duration={0.8}>
            {experience.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[140px_1fr]"
              >
                <span className="text-sm font-medium text-muted">{item.period}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-accent">{item.place}</p>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── BEYOND THE BRIEF ───────────────────────────────── */}
      <BeyondSection />
    </>
  );
}
