"use client";

import Reveal from "@/components/Reveal";
import StaggerGroup from "@/components/type/StaggerGroup";
import BlockHeading from "./BlockHeading";

type Step = { title: string; body: string };

/**
 * A sequence of moves. `numbered` decides between an ordered list with
 * counters and an unordered list of named points.
 */
export default function StepsBlock({
  heading,
  intro,
  numbered = false,
  items,
}: {
  heading?: string;
  intro?: string;
  numbered?: boolean;
  items: Step[];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      {intro ? (
        <Reveal delay={0.05} y={18}>
          <p className="mt-5 max-w-[64ch] leading-[1.75] text-muted">{intro}</p>
        </Reveal>
      ) : null}

      <StaggerGroup
        as={numbered ? "ol" : "ul"}
        className="mt-8 space-y-0"
        stagger={0.08}
        y={28}
      >
        {items.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-x-6 gap-y-2 border-t border-line py-6 sm:grid-cols-[64px_1fr]"
          >
            <span
              aria-hidden="true"
              className="font-display text-xl text-accent/70 sm:text-2xl"
            >
              {numbered ? String(i + 1).padStart(2, "0") : "—"}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold sm:text-xl">{step.title}</h3>
              <p className="mt-2 max-w-[62ch] leading-[1.75] text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </StaggerGroup>
    </div>
  );
}
