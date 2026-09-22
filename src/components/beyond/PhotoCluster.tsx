import PhotoSlot from "./PhotoSlot";
import { cn } from "@/lib/utils";

type ClusterSlot = { className: string; aspect: string };

/**
 * Per-count arrangements. A little looser than the case-study grids: varied
 * aspect ratios and a small vertical offset so the blocks don't line up
 * perfectly. Everything stays inside a 2-column grid, so nothing can push
 * past the container at any width.
 */
const LAYOUTS: Record<number, ClusterSlot[]> = {
  1: [{ className: "col-span-2", aspect: "aspect-[4/3]" }],
  2: [
    { className: "col-span-2 sm:col-span-1", aspect: "aspect-[3/4]" },
    { className: "col-span-2 sm:col-span-1 sm:mt-10", aspect: "aspect-[4/5]" },
  ],
  // Portrait, not landscape — these are phone photos shot vertically, and a
  // wide 16:9 slot was cropping them down to an unrecognisable sliver. Three
  // across on larger screens (see the grid-cols override below) so nothing
  // has to fight a mismatched frame.
  3: [
    { className: "col-span-1", aspect: "aspect-[3/4]" },
    { className: "col-span-1 sm:mt-8", aspect: "aspect-[3/4]" },
    { className: "col-span-2 sm:col-span-1 sm:mt-3", aspect: "aspect-[3/4]" },
  ],
};

function slotsFor(count: number): ClusterSlot[] {
  const preset = LAYOUTS[count];
  if (preset) return preset;
  return Array.from({ length: Math.max(count, 1) }, () => ({
    className: "col-span-2 sm:col-span-1",
    aspect: "aspect-[4/3]",
  }));
}

type PhotoClusterProps = {
  /** The item's `photoLabel` — reused as the placeholder caption. */
  label: string;
  /** The item's `photoCount` — how many slots this block holds. */
  count: number;
  accent?: string;
  className?: string;
  /** Real photo paths, in slot order. Missing entries stay placeholders. */
  srcs?: string[];
};

export default function PhotoCluster({ label, count, accent, className, srcs }: PhotoClusterProps) {
  const slots = slotsFor(count);

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4",
        // Three portrait photos read best three-across, not wrapped 2+1.
        count === 3 && "sm:grid-cols-3",
        className
      )}
    >
      {slots.map((slot, i) => (
        <PhotoSlot
          key={`${label}-${i}`}
          label={slots.length > 1 ? `${label} · ${i + 1}/${slots.length}` : label}
          accent={accent}
          aspect={slot.aspect}
          className={slot.className}
          src={srcs?.[i]}
        />
      ))}
    </div>
  );
}
