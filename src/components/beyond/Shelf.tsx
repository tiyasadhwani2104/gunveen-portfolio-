type ShelfProps = {
  reading: readonly string[];
  readingNow: string;
};

/**
 * The three books plus what she's reading now.
 *
 * Titled like a little card of its own rather than a plain list — each book
 * sits as a small "spine" (a thin accent-coloured tick beside the title,
 * echoing the numbered rows used elsewhere on the site), and "reading now"
 * is called out as its own highlighted line instead of trailing off as an
 * afterthought.
 */
export default function Shelf({ reading, readingNow }: ShelfProps) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-line/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">On the shelf</p>
      <ul className="mt-4 space-y-2">
        {reading.map((book) => (
          <li key={book} className="flex items-center gap-2.5 text-sm text-muted">
            <span aria-hidden className="h-3 w-0.5 shrink-0 rounded-full bg-accent/60" />
            <em className="not-italic">{book}</em>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2.5 border-t border-line/70 pt-4 text-sm">
        <span aria-hidden className="h-3 w-0.5 shrink-0 rounded-full bg-accent" />
        <span className="text-muted">Reading now —</span>
        <em className="not-italic font-medium text-foreground">{readingNow}</em>
      </div>
    </div>
  );
}
