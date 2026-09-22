"use client";

import Reveal from "@/components/Reveal";
import StaggerGroup from "@/components/type/StaggerGroup";
import BlockHeading from "./BlockHeading";

/** Findings, recommendations, feedback — one point per line. */
export default function ListBlock({
  heading,
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: string[];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      {intro ? (
        <Reveal delay={0.05} y={18}>
          <p className="mt-5 max-w-[64ch] leading-[1.75] text-muted">{intro}</p>
        </Reveal>
      ) : null}

      <StaggerGroup as="ul" className="mt-6 space-y-0" stagger={0.06} y={22}>
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-4 border-t border-line py-4 text-muted"
          >
            <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-accent/60" />
            <span className="max-w-[62ch] leading-[1.75]">{item}</span>
          </li>
        ))}
      </StaggerGroup>
    </div>
  );
}
