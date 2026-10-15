export default function Marquee({
  items,
  reverse = false,
  duration = 40,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  // Rendered twice so the -50% keyframe loops seamlessly
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden ${reverse ? "marquee-reverse" : ""} ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-hidden
    >
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="display flex items-center whitespace-nowrap px-6 text-6xl md:text-8xl">
            {item}
            <span className="serif-accent ml-12 text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
