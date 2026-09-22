"use client";

import StaggerGroup from "@/components/type/StaggerGroup";
import BlockHeading from "./BlockHeading";

type ChartItem = { label: string; display: string; percent: number; source?: string };

/**
 * An original bar-chart graphic in the site's own visual language.
 *
 * Used where the case study cites third-party statistics — this renders the
 * numbers as a chart built from scratch (site palette, site type), rather
 * than reproducing anyone else's published infographic. Each bar still
 * carries its source, so the sourcing survives even without the original
 * graphic.
 */
export default function ChartBlock({
  heading,
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: ChartItem[];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      {intro ? <p className="mt-4 max-w-2xl leading-relaxed text-muted">{intro}</p> : null}

      <StaggerGroup className={`space-y-6 ${heading || intro ? "mt-8" : ""}`} stagger={0.12} y={20}>
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="font-display shrink-0 text-lg font-semibold text-accent">{item.display}</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line/50">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${Math.min(100, Math.max(0, item.percent))}%` }}
              />
            </div>
            {item.source ? (
              <p className="mt-1.5 text-[11px] uppercase tracking-wide text-muted/60">{item.source}</p>
            ) : null}
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}
