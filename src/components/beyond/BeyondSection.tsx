import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/type/SplitHeading";
import StaggerGroup from "@/components/type/StaggerGroup";
import { beyondTheBrief } from "@/lib/data";
import MunFactsStrip from "./MunFactsStrip";
import PhotoCluster from "./PhotoCluster";
import Shelf from "./Shelf";

/** Gradient per block, drawn only from the site palette. */
const ACCENTS: Record<string, string> = {
  modelling: "from-[#FFF8CA] via-[#F3E7B0] to-[#CDE3E8]",
  mun: "from-[#CDE3E8] via-[#E4EFF0] to-[#FFF8CA]",
  cooking: "from-[#F5EAB6] via-[#F0C9C7] to-[#CDE3E8]",
  reading: "from-[#CDE3E8] via-[#F5EAB6] to-[#FFF8CA]",
};

/** 12-column spans, in render order — two rows of 7/5 and 5/7 around the strip. */
const SPANS: Record<string, string> = {
  modelling: "md:col-span-7",
  mun: "md:col-span-5",
  cooking: "md:col-span-5",
  reading: "md:col-span-7 md:mt-6",
};

const { title, subtitle, intro, items, munFacts, shelf } = beyondTheBrief;

/**
 * "Beyond the brief" — the personal section, lighter in tone than the case
 * studies: a looser photo grid with a short caption per block, and the MUN
 * facts as one slim strip sitting directly under the MUN block.
 *
 * Server component; the animated pieces below are client components.
 */
export default function BeyondSection() {
  const blocks = items.map((item) => (
    <article key={item.id} className={SPANS[item.id] ?? "md:col-span-6"}>
      <PhotoCluster label={item.photoLabel} count={item.photoCount} accent={ACCENTS[item.id]} />
      <h3 className="font-display mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-2 max-w-prose text-sm text-muted leading-relaxed">{item.body}</p>
      {item.id === "reading" && <Shelf reading={shelf.reading} readingNow={shelf.readingNow} />}
    </article>
  ));

  // The facts strip belongs to the MUN block, so it spans the full row
  // immediately after it.
  const munIndex = items.findIndex((item) => item.id === "mun");
  const children = [...blocks];
  children.splice(munIndex + 1, 0,
    <div key="mun-facts" className="md:col-span-12">
      <MunFactsStrip facts={munFacts} />
    </div>
  );

  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{title}</p>
        </Reveal>
        <SplitHeading
          className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          stagger={0.1}
        >
          {subtitle}
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-muted leading-relaxed">{intro}</p>
        </Reveal>

        <StaggerGroup
          className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-12"
          stagger={0.1}
          y={32}
          duration={0.8}
        >
          {children}
        </StaggerGroup>
      </div>
    </section>
  );
}
