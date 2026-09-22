export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="hide-scrollbar overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl font-medium tracking-tight text-foreground/60 whitespace-nowrap"
          >
            {item} <span className="text-accent/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
