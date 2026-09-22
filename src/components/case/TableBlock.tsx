"use client";

import Reveal from "@/components/Reveal";
import BlockHeading from "./BlockHeading";

/**
 * A two-column mapping (game mechanic → framework concept).
 *
 * One semantic `<table>` throughout: below `sm` the display roles are dropped
 * so each row stacks into a card with its column name repeated above the cell,
 * which keeps long phrases readable on a phone without a second markup path.
 */
export default function TableBlock({
  heading,
  intro,
  columns,
  rows,
}: {
  heading?: string;
  intro?: string;
  columns: [string, string];
  rows: [string, string][];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      {intro ? (
        <Reveal delay={0.05} y={18}>
          <p className="mt-5 max-w-[64ch] leading-[1.75] text-muted">{intro}</p>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <table className="mt-8 block w-full border-collapse text-left sm:table">
          <caption className="sr-only">
            {heading ?? `${columns[0]} compared with ${columns[1]}`}
          </caption>
          <thead className="hidden sm:table-header-group">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="w-1/2 border-b border-line pb-3 text-xs font-semibold uppercase tracking-wide text-accent"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {rows.map(([left, right]) => (
              <tr
                key={left}
                className="block border-t border-line py-4 first:border-t-0 sm:table-row sm:border-t-0 sm:py-0 sm:first:border-t-0"
              >
                {[
                  { col: columns[0], value: left, tone: "text-foreground" },
                  { col: columns[1], value: right, tone: "text-muted" },
                ].map((cell) => (
                  <td
                    key={cell.col}
                    className={`block align-top leading-relaxed sm:table-cell sm:border-b sm:border-line sm:py-4 sm:pr-6 ${cell.tone}`}
                  >
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-accent sm:hidden">
                      {cell.col}
                    </span>
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </div>
  );
}
