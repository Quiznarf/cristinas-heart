import { memo, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";
import type { Candle } from "../lib/api";

const W = 960;
const H = 500;

const projection = geoNaturalEarth1()
  .scale(200)
  .translate([W / 2, H / 2 + 10]);

const path = geoPath(projection);

// Build the land path once
const landFeature = feature(land110 as any, (land110 as any).objects.land) as any;
const LAND_D = path(landFeature) || "";

interface Props {
  candles: Candle[];
  pending?: { lat: number; lng: number } | null;
  onPick?: (lat: number, lng: number) => void;
}

function WorldMap({ candles, pending, onPick }: Props) {
  const [hovered, setHovered] = useState<Candle | null>(null);

  const points = useMemo(
    () =>
      candles
        .map((c) => {
          const p = projection([c.lng, c.lat]);
          return p ? { c, x: p[0], y: p[1] } : null;
        })
        .filter(Boolean) as { c: Candle; x: number; y: number }[],
    [candles]
  );

  const pendingPoint = useMemo(() => {
    if (!pending) return null;
    const p = projection([pending.lng, pending.lat]);
    return p ? { x: p[0], y: p[1] } : null;
  }, [pending]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onPick) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    const coords = projection.invert?.([x, y]);
    if (coords && Number.isFinite(coords[0]) && Number.isFinite(coords[1])) {
      onPick(coords[1], coords[0]);
    }
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`w-full h-auto ${onPick ? "cursor-crosshair" : ""}`}
        onClick={handleClick}
        role="img"
        aria-label="World map of lit candles"
      >
        <defs>
          <radialGradient id="candle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f6d98a" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#e8b64c" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e8b64c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ocean */}
        <rect width={W} height={H} fill="#0a0e24" rx="18" />

        {/* Land */}
        <path d={LAND_D} fill="#1a2150" stroke="#2a3268" strokeWidth={0.6} />

        {/* Candles */}
        {points.map(({ c, x, y }) => (
          <g
            key={c.id}
            transform={`translate(${x}, ${y})`}
            onMouseEnter={() => setHovered(c)}
            onMouseLeave={() => setHovered(null)}
            className="candle-dot"
          >
            <circle r={9} fill="url(#candle-glow)" className="animate-flicker" />
            <circle r={2.1} fill="#FFF3C4" />
          </g>
        ))}

        {/* Pending (being placed) candle */}
        {pendingPoint && (
          <g transform={`translate(${pendingPoint.x}, ${pendingPoint.y})`}>
            <circle r={14} fill="url(#candle-glow)" className="animate-flicker" />
            <circle r={3} fill="#FFFDF2" />
            <circle r={18} fill="none" stroke="#F5B942" strokeWidth={1.2} strokeDasharray="3 4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-xl bg-night-2/95 border border-white/10 px-4 py-2.5 text-center shadow-xl backdrop-blur">
          <p className="text-sm font-medium text-ivory">
            🕯️ {hovered.name || "Someone"} lit a candle
          </p>
          {hovered.intention && (
            <p className="mt-0.5 max-w-xs text-xs text-ivory/70">"{hovered.intention}"</p>
          )}
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gold-light">
            {hovered.region}
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(WorldMap);
