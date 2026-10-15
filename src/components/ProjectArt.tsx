import { useId } from "react";

const INK = "#0b0b0c";
const TEXT = "rgba(242,240,234,0.45)";
const FAINT = "rgba(242,240,234,0.12)";
const MID = "rgba(242,240,234,0.35)";
const mono = { fontFamily: "var(--font-mono)" } as const;

/**
 * One illustration per project, drawn in the card's own accent colour on a dark panel.
 * Marks are deliberately fine: 1.5–2px lines, hairline grids, low-opacity washes, and a dark
 * ring around end-dots. Elements nudge on `group-hover` (the card carries the `group` class).
 */
export default function ProjectArt({ slug, color }: { slug: string; color: string }) {
  const id = useId();
  const stroke = { stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
  const rise = "transition-transform duration-700 ease-out [transform-box:fill-box]";

  const art = (() => {
    switch (slug) {
      /* ---------- Coinbase Algorithmic Trader: candles, volume, last-price tag ---------- */
      case "coinbase-trader": {
        const closes = [104, 100, 107, 97, 92, 99, 86, 81, 85, 70, 66, 52];
        const wickUp = [5, 7, 4, 8, 6, 5, 7, 4, 6, 8, 5, 7];
        const wickDn = [4, 5, 6, 4, 7, 5, 4, 6, 5, 4, 6, 5];
        const vol = [6, 9, 5, 11, 7, 8, 12, 6, 9, 13, 8, 15];
        const x0 = 14;
        const step = 13;
        const candles = closes.map((c, i) => {
          const o = i ? closes[i - 1] : 108;
          const top = Math.min(o, c);
          const bot = Math.max(o, c);
          return { x: x0 + i * step, top, bot, up: c < o, wt: top - wickUp[i], wb: bot + wickDn[i], v: vol[i] };
        });
        const pts = closes.map((c, i) => `${x0 + i * step},${c}`);
        const lastX = x0 + (closes.length - 1) * step;
        const lastY = closes[closes.length - 1];
        return (
          <>
            <defs>
              <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={color} stopOpacity="0.22" />
                <stop offset="1" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 70, 100].map((y) => (
              <line key={y} x1="6" x2="196" y1={y} y2={y} stroke={FAINT} strokeWidth="1" />
            ))}
            <path d={`M${pts.join(" L")} L${lastX},128 L${x0},128 Z`} fill={`url(#${id}-wash)`} />
            <path d={`M${pts.join(" L")}`} {...stroke} strokeOpacity="0.4" strokeWidth="1" />
            {candles.map((c, i) => (
              <rect key={`v${i}`} x={c.x - 3} y={128 - c.v} width="6" height={c.v} rx="1.5" fill={color} fillOpacity="0.2" />
            ))}
            {candles.map((c, i) => (
              <g key={i} className={`${rise} origin-bottom group-hover:scale-y-[1.1]`} style={{ transitionDelay: `${i * 30}ms` }}>
                <line x1={c.x} x2={c.x} y1={c.wt} y2={c.wb} {...stroke} strokeWidth="1" strokeOpacity={c.up ? 1 : 0.6} />
                <rect
                  x={c.x - 4}
                  y={c.top}
                  width="8"
                  height={Math.max(2, c.bot - c.top)}
                  rx="1.5"
                  {...stroke}
                  strokeWidth="1"
                  strokeOpacity={c.up ? 1 : 0.6}
                  fill={c.up ? color : INK}
                />
              </g>
            ))}
            <line x1={lastX + 4} x2="164" y1={lastY} y2={lastY} stroke={color} strokeOpacity="0.55" strokeDasharray="1.5 3" />
            <rect x="164" y={lastY - 8} width="34" height="16" rx="8" fill={color} />
            <text x="181" y={lastY + 2.6} textAnchor="middle" fontSize="6.5" fontWeight="600" fill={INK} style={mono}>
              +0.5%/wk
            </text>
          </>
        );
      }

      /* ---------- Agentic Playlist Creator: waveform with playhead + ranked tracks ---------- */
      case "agentic-playlist-creator": {
        const N = 30;
        const playhead = 17;
        const bars = Array.from({ length: N }, (_, i) => 5 + 22 * Math.abs(Math.sin(i * 0.62) * Math.cos(i * 0.21 + 1)) + 5 * Math.abs(Math.sin(i * 1.7)));
        const rows = [
          { y: 88, name: 62, score: 0.92 },
          { y: 106, name: 48, score: 0.74 },
          { y: 124, name: 56, score: 0.58 },
        ];
        const px = 10 + playhead * 6.2 - 1.6;
        return (
          <>
            {bars.map((h, i) => (
              <rect
                key={i}
                x={10 + i * 6.2}
                y={36 - h}
                width="3"
                height={h * 2}
                rx="1.5"
                fill={color}
                fillOpacity={i < playhead ? 1 : 0.28}
                className={`${rise} origin-center ${i % 2 ? "group-hover:scale-y-[1.12]" : "group-hover:scale-y-[0.9]"}`}
                style={{ transitionDelay: `${i * 18}ms` }}
              />
            ))}
            <line x1={px} x2={px} y1="2" y2="70" stroke={MID} strokeWidth="1" />
            <circle cx={px} cy="3" r="2.5" fill={INK} stroke={color} strokeWidth="1.5" />
            {rows.map((r, i) => (
              <g key={r.y} className={`${rise} group-hover:translate-x-1`} style={{ transitionDelay: `${i * 60}ms` }}>
                <circle cx="16" cy={r.y} r="5" {...stroke} fill={i === 0 ? color : "none"} strokeOpacity={i === 0 ? 1 : 0.55} />
                {i === 0 && <path d={`M14.6 ${r.y - 2.2} l3.4 2.2 l-3.4 2.2 z`} fill={INK} />}
                <rect x="28" y={r.y - 2} width={r.name} height="4" rx="2" fill={MID} />
                <rect x="108" y={r.y - 2} width="82" height="4" rx="2" fill={FAINT} />
                <rect x="108" y={r.y - 2} width={82 * r.score} height="4" rx="2" fill={color} fillOpacity={1 - i * 0.2} />
              </g>
            ))}
          </>
        );
      }

      /* ---------- Agentic RAG Eval: query → retrieve → rerank → top result ---------- */
      case "agentic-rag-eval": {
        const docs = [
          { y: 22, s: 0.3 },
          { y: 46, s: 0.9 },
          { y: 70, s: 0.4 },
          { y: 94, s: 0.78 },
          { y: 118, s: 0.25 },
        ];
        return (
          <>
            {docs.map((d, i) => (
              <g key={i}>
                <path d={`M30 70 C 54 70, 56 ${d.y}, 74 ${d.y}`} {...stroke} strokeWidth="1" strokeOpacity={0.15 + d.s * 0.55} />
                <path
                  d={`M92 ${d.y} C 124 ${d.y}, 128 70, 150 70`}
                  {...stroke}
                  strokeWidth={d.s >= 0.7 ? 1.5 : 1}
                  strokeOpacity={d.s >= 0.7 ? 0.95 : 0.2}
                  strokeDasharray={d.s >= 0.7 ? undefined : "2 3"}
                />
                <g className={`${rise} group-hover:translate-x-1`} style={{ transitionDelay: `${i * 50}ms` }}>
                  <rect x="74" y={d.y - 7} width="18" height="14" rx="2.5" {...stroke} strokeWidth="1" strokeOpacity={0.4 + d.s * 0.6} fill={INK} />
                  <line x1="78" x2="88" y1={d.y - 2} y2={d.y - 2} stroke={color} strokeWidth="1" strokeOpacity={0.3 + d.s * 0.5} />
                  <line x1="78" x2="85" y1={d.y + 2} y2={d.y + 2} stroke={color} strokeWidth="1" strokeOpacity={0.3 + d.s * 0.5} />
                </g>
              </g>
            ))}
            <circle cx="22" cy="70" r="14" {...stroke} strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="22" cy="70" r="8" fill={color} />
            <rect x="150" y="54" width="36" height="32" rx="9" fill={color} className={`${rise} origin-center group-hover:scale-110`} />
            <path d="M160 70 l5.5 5.5 l10 -11" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {[
              { x: 22, t: "QUERY" },
              { x: 83, t: "RETRIEVE" },
              { x: 168, t: "RERANK" },
            ].map((l) => (
              <text key={l.t} x={l.x} y="137" textAnchor="middle" fontSize="5.5" letterSpacing="0.8" fill={TEXT} style={mono}>
                {l.t}
              </text>
            ))}
          </>
        );
      }

      /* ---------- Agent Ops Console: agent tasks with a human approval gate ---------- */
      case "phc-ops-console": {
        const rows = [
          { y: 36, name: 46, progress: 1, state: "done" },
          { y: 62, name: 38, progress: 0.55, state: "approve" },
          { y: 88, name: 52, progress: 0.3, state: "running" },
        ];
        return (
          <>
            <rect x="8" y="5" width="184" height="130" rx="10" {...stroke} strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="8" x2="192" y1="26" y2="26" stroke={FAINT} />
            {[20, 30, 40].map((x, i) => (
              <circle key={x} cx={x} cy="15.5" r="2.6" fill={color} fillOpacity={[1, 0.5, 0.25][i]} />
            ))}
            <text x="184" y="17.5" textAnchor="end" fontSize="5.5" letterSpacing="0.8" fill={TEXT} style={mono}>
              AGENTS
            </text>
            <line x1="44" x2="44" y1="26" y2="135" stroke={FAINT} />
            {[36, 52, 68].map((y, i) => (
              <rect key={y} x="18" y={y} width="10" height="10" rx="3" {...stroke} strokeWidth="1" fill={i === 0 ? color : "none"} strokeOpacity={i === 0 ? 1 : 0.5} />
            ))}
            <rect x="52" y="59" width="136" height="24" rx="6" {...stroke} strokeWidth="1" strokeOpacity="0.55" fill={color} fillOpacity="0.08" />
            {rows.map((r, i) => (
              <g key={r.y} className={`${rise} group-hover:translate-x-1`} style={{ transitionDelay: `${i * 60}ms` }}>
                <circle cx="63" cy={r.y + 9} r="5" fill={color} fillOpacity="0.85" />
                <rect x="73" y={r.y + 3} width={r.name} height="3" rx="1.5" fill={MID} />
                <rect x="73" y={r.y + 11} width="62" height="3" rx="1.5" fill={FAINT} />
                <rect x="73" y={r.y + 11} width={62 * r.progress} height="3" rx="1.5" fill={color} />
                {r.state === "done" && (
                  <>
                    <circle cx="174" cy={r.y + 9} r="6" {...stroke} strokeWidth="1" />
                    <path d={`M171.5 ${r.y + 9} l2 2 l3.8 -4.2`} {...stroke} strokeWidth="1.4" />
                  </>
                )}
                {r.state === "approve" && (
                  <>
                    <rect x="148" y={r.y + 2} width="38" height="14" rx="7" fill={color} />
                    <text x="167" y={r.y + 11.4} textAnchor="middle" fontSize="5.5" fontWeight="600" letterSpacing="0.6" fill={INK} style={mono}>
                      APPROVE
                    </text>
                  </>
                )}
                {r.state === "running" && (
                  <circle cx="174" cy={r.y + 9} r="5.5" {...stroke} strokeWidth="1.4" strokeDasharray="10 25" className="origin-center animate-spin [transform-box:fill-box]" />
                )}
              </g>
            ))}
            <rect x="52" y="112" width="136" height="14" rx="7" {...stroke} strokeWidth="1" strokeOpacity="0.4" />
            <rect x="60" y="116" width="1.6" height="6" fill={color} className="animate-pulse" />
            <text x="66" y="121.4" fontSize="6" fill={TEXT} style={mono}>
              ask the agent…
            </text>
          </>
        );
      }

      /* ---------- CS2 Skin Monitor: price chart + tracked item tiles ---------- */
      case "cs2-skin-monitor": {
        const pts: [number, number][] = [[10, 70], [30, 62], [48, 68], [66, 48], [84, 54], [104, 34], [124, 40], [148, 22], [170, 28], [190, 14]];
        const line = pts.map(([x, y]) => `${x},${y}`).join(" L");
        const tiles = [
          { x: 10, up: true },
          { x: 56, up: true },
          { x: 102, up: false },
          { x: 148, up: true },
        ];
        return (
          <>
            <defs>
              <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={color} stopOpacity="0.3" />
                <stop offset="1" stopColor={color} stopOpacity="0" />
              </linearGradient>
              <pattern id={`${id}-hatch`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeOpacity="0.4" strokeWidth="1.4" />
              </pattern>
            </defs>
            {[24, 44, 64, 84].map((y) => (
              <line key={y} x1="10" x2="190" y1={y} y2={y} stroke={FAINT} strokeWidth="1" />
            ))}
            <path d={`M${line} L190,84 L10,84 Z`} fill={`url(#${id}-wash)`} />
            <path d={`M${line}`} {...stroke} strokeWidth="2" />
            <line x1="148" x2="148" y1="8" y2="84" stroke={MID} strokeWidth="1" />
            <circle cx="148" cy="22" r="5.5" fill={INK} />
            <circle cx="148" cy="22" r="3.2" fill={color} />
            <g className={`${rise} origin-center group-hover:scale-125`}>
              <circle cx="190" cy="14" r="8" {...stroke} strokeWidth="1.2" />
              {[[190, 2, 190, 6], [190, 22, 190, 26], [178, 14, 182, 14], [198, 14, 200, 14]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} strokeWidth="1.2" />
              ))}
            </g>
            <circle cx="190" cy="14" r="2.4" fill={color} />
            {tiles.map((t, i) => (
              <g key={t.x} className={`${rise} group-hover:-translate-y-1`} style={{ transitionDelay: `${i * 50}ms` }}>
                <rect x={t.x} y="96" width="42" height="32" rx="6" {...stroke} strokeWidth="1" strokeOpacity="0.45" fill={`url(#${id}-hatch)`} />
                <rect x={t.x + 5} y="101" width="14" height="2.5" rx="1.25" fill={MID} />
                <path d={t.up ? `M${t.x + 31} 123 l4 -6 l4 6 z` : `M${t.x + 31} 117 l4 6 l4 -6 z`} fill={t.up ? color : MID} />
              </g>
            ))}
          </>
        );
      }

      /* ---------- EloVe: two profiles, a rating swap, six rating tiers ---------- */
      case "elove": {
        const card = (x: number, dir: 1 | -1) => (
          <g className={`${rise} ${dir === 1 ? "group-hover:translate-x-1.5" : "group-hover:-translate-x-1.5"}`}>
            <rect x={x} y="12" width="76" height="72" rx="10" {...stroke} strokeWidth="1.2" strokeOpacity="0.7" />
            <circle cx={x + 38} cy="34" r="11" {...stroke} strokeWidth="1" fill={color} fillOpacity="0.22" />
            <circle cx={x + 38} cy="31" r="3.6" fill={color} fillOpacity="0.8" />
            <path d={`M${x + 30} 42 c1.5 -5 14.5 -5 16 0`} {...stroke} strokeWidth="1.2" />
            <rect x={x + 18} y="54" width="40" height="3" rx="1.5" fill={MID} />
            <rect x={x + 24} y="61" width="28" height="3" rx="1.5" fill={FAINT} />
            <text x={x + 38} y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill={color} style={mono}>
              1200
            </text>
          </g>
        );
        const tiers = [8, 12, 17, 22, 27, 32];
        return (
          <>
            {card(8, 1)}
            {card(116, -1)}
            <line x1="84" x2="91" y1="48" y2="48" {...stroke} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="109" x2="116" y1="48" y2="48" {...stroke} strokeWidth="1" strokeOpacity="0.6" />
            <circle cx="100" cy="48" r="11" fill={color} />
            <path d="M96.8 51.5 v-7.5 m-2.6 2.6 l2.6 -2.6 l2.6 2.6" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M103.2 44.5 v7.5 m-2.6 -2.6 l2.6 2.6 l2.6 -2.6" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {tiers.map((h, i) => (
              <rect
                key={i}
                x={10 + i * 32}
                y={130 - h}
                width="24"
                height={h}
                rx="3"
                fill={color}
                fillOpacity={[0.14, 0.2, 0.3, 0.42, 0.62, 1][i]}
                className={`${rise} origin-bottom group-hover:scale-y-[1.12]`}
                style={{ transitionDelay: `${i * 40}ms` }}
              />
            ))}
            <line x1="6" x2="196" y1="130.5" y2="130.5" stroke={FAINT} strokeWidth="1" />
          </>
        );
      }

      default:
        return <circle cx="100" cy="70" r="40" {...stroke} />;
    }
  })();

  return (
    <svg viewBox="0 0 200 140" className="h-full w-full overflow-visible" role="img" aria-hidden>
      {art}
    </svg>
  );
}
