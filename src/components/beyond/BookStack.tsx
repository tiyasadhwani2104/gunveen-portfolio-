"use client";

/**
 * An original illustrated stack of books for the "On the shelf" slot —
 * abstract spines in the site's own palette, not a depiction of any real
 * book's actual cover art. Placeholder until a real photo of the shelf
 * itself (the cover, the spines, the stack — not an open page) is added.
 */
export default function BookStack({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 300 220"
        className="h-full w-full"
        role="img"
        aria-label="Illustration of a small stack of books"
      >
        <rect width="300" height="220" fill="#2D120D" />

        {/* Surface line the stack sits on. */}
        <rect x="20" y="176" width="260" height="3" fill="#FFF8CA" opacity="0.15" />

        {/* Two books lying flat, stacked. */}
        <rect x="60" y="150" width="180" height="26" rx="3" fill="#CDE3E8" />
        <rect x="60" y="150" width="180" height="7" rx="2" fill="#FFF8CA" opacity="0.35" />

        <rect x="78" y="120" width="150" height="26" rx="3" fill="#FFF8CA" />
        <rect x="78" y="120" width="150" height="7" rx="2" fill="#6B0B0C" opacity="0.25" />

        {/* Three books standing upright, leaning slightly. */}
        <g transform="translate(96 42) rotate(-4)">
          <rect width="24" height="80" rx="2" fill="#6B0B0C" />
          <rect x="4" width="4" height="80" fill="#FFF8CA" opacity="0.4" />
        </g>
        <g transform="translate(122 36) rotate(2)">
          <rect width="22" height="86" rx="2" fill="#FFF8CA" />
          <rect x="18" width="2" height="86" fill="#6B0B0C" opacity="0.2" />
        </g>
        <g transform="translate(147 44) rotate(-2)">
          <rect width="20" height="78" rx="2" fill="#CDE3E8" />
        </g>
        <g transform="translate(170 40) rotate(5)">
          <rect width="18" height="82" rx="2" fill="#2D120D" stroke="#FFF8CA" strokeOpacity="0.3" />
        </g>
      </svg>
    </div>
  );
}
