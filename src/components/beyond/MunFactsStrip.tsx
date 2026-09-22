import StaggerGroup from "@/components/type/StaggerGroup";

type MunFactsStripProps = {
  facts: readonly string[];
};

/**
 * One slim horizontal band of short MUN facts, divider-separated rather than
 * boxed as cards. It wraps on narrow screens (no horizontal scroll, so the
 * page can never overflow sideways) and reads as a single line on desktop.
 */
export default function MunFactsStrip({ facts }: MunFactsStripProps) {
  return (
    <StaggerGroup
      as="ul"
      className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-line px-5 py-3 sm:rounded-full sm:px-7"
      stagger={0.05}
      y={12}
      duration={0.55}
    >
      {facts.map((fact, i) => (
        <li
          key={fact}
          className="flex items-center gap-3 text-xs font-medium tracking-wide text-muted sm:text-[13px]"
        >
          {/* Separator between facts only — never before the first. */}
          {i > 0 ? (
            <span aria-hidden className="text-accent/50 select-none">
              /
            </span>
          ) : null}
          {fact}
        </li>
      ))}
    </StaggerGroup>
  );
}
