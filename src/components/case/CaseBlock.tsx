"use client";

import type { CaseStudyBlock } from "@/lib/data";
import ProseBlock from "./ProseBlock";
import CalloutBlock from "./CalloutBlock";
import QuoteBlock from "./QuoteBlock";
import StatsBlock from "./StatsBlock";
import StepsBlock from "./StepsBlock";
import ListBlock from "./ListBlock";
import TableBlock from "./TableBlock";
import ImageBlock from "./ImageBlock";

/** Dispatches one content block to its renderer. */
export default function CaseBlock({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "prose":
      return <ProseBlock heading={block.heading} body={block.body} />;
    case "callout":
      return <CalloutBlock heading={block.heading} body={block.body} />;
    case "quote":
      return <QuoteBlock text={block.text} attribution={block.attribution} />;
    case "stats":
      return <StatsBlock heading={block.heading} items={block.items} />;
    case "steps":
      return (
        <StepsBlock
          heading={block.heading}
          intro={block.intro}
          numbered={block.numbered}
          items={block.items}
        />
      );
    case "list":
      return <ListBlock heading={block.heading} intro={block.intro} items={block.items} />;
    case "table":
      return (
        <TableBlock
          heading={block.heading}
          intro={block.intro}
          columns={block.columns}
          rows={block.rows}
        />
      );
    case "image":
      return (
        <ImageBlock
          label={block.label}
          caption={block.caption}
          accent={block.accent}
          wide={block.wide}
          src={block.src}
          fit={block.fit}
        />
      );
    default: {
      // Exhaustiveness guard: a new block kind fails the type check here.
      const _never: never = block;
      void _never;
      return null;
    }
  }
}

/** Blocks that read better in a wider column than the text measure. */
export function isWideBlock(block: CaseStudyBlock) {
  return block.kind === "image" && block.wide === true;
}
