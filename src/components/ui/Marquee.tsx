interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-ink-line bg-ink-soft py-3">
      <div className="flex w-max animate-marquee gap-10">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-sans text-sm tracking-[0.2em] text-paper-dim uppercase"
          >
            {item}
            <span className="text-brass">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
