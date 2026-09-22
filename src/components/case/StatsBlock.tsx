"use client";

import CountUpValue from "@/components/type/CountUpValue";
import StaggerGroup from "@/components/type/StaggerGroup";
import BlockHeading from "./BlockHeading";

type StatItem = { value: string; label: string; source?: string };

/**
 * Stat tiles. `CountUpValue` decides on its own whether a value can be
 * counted ("78%") or should simply appear ("4.2 / 5", "20–25%"), and the
 * source line is kept because sourcing is part of the argument.
 */
export default function StatsBlock({
  heading,
  items,
}: {
  heading?: string;
  items: StatItem[];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      <StaggerGroup
        className={`grid grid-cols-1 gap-5 sm:grid-cols-3 ${heading ? "mt-8" : ""}`}
        stagger={0.1}
        y={32}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex flex-col rounded-2xl border border-line p-6"
          >
            <CountUpValue
              value={item.value}
              delay={0.15 + i * 0.1}
              className="font-display text-3xl font-semibold leading-none text-accent sm:text-4xl"
            />
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.label}</p>
            {item.source ? (
              <p className="mt-4 border-t border-line pt-3 text-[11px] uppercase tracking-wide text-muted/60">
                {item.source}
              </p>
            ) : null}
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}
