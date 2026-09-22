type ShelfProps = {
  reading: readonly string[];
  readingNow: string;
};

/** The three books plus what she's reading now — titles in italics, as her doc has them. */
export default function Shelf({ reading, readingNow }: ShelfProps) {
  return (
    <div className="mt-6 rounded-2xl border border-line p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">On the shelf</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {reading.map((book) => (
          <li
            key={book}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted"
          >
            <em>{book}</em>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        Reading now: <em className="text-foreground">{readingNow}</em>
      </p>
    </div>
  );
}
