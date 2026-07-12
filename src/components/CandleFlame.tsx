/** A softly animated candle used in the hero and empty states. */
export default function CandleFlame({ size = 88 }: { size?: number }) {
  return (
    <div className="relative inline-block" style={{ width: size, height: size * 1.5 }}>
      {/* glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-70 animate-flicker"
        style={{
          top: 0,
          width: size * 0.9,
          height: size * 0.9,
          background:
            "radial-gradient(circle, rgba(255,214,120,0.85) 0%, rgba(227,144,72,0.35) 55%, transparent 75%)",
        }}
      />
      {/* flame */}
      <svg
        viewBox="0 0 64 96"
        className="absolute left-1/2 -translate-x-1/2 animate-flicker origin-bottom"
        style={{ top: 2, width: size * 0.5 }}
      >
        <defs>
          <radialGradient id="cf-outer" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="45%" stopColor="#F5B942" />
            <stop offset="100%" stopColor="#E3722E" />
          </radialGradient>
          <radialGradient id="cf-inner" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="100%" stopColor="#FFD678" />
          </radialGradient>
        </defs>
        <path d="M32 4c9 14 16 21 16 33a16 16 0 1 1-32 0C16 25 23 18 32 4z" fill="url(#cf-outer)" />
        <path d="M32 26c4.5 6.5 8 10 8 16a8 8 0 1 1-16 0c0-6 3.5-9.5 8-16z" fill="url(#cf-inner)" />
      </svg>
      {/* wick + candle */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-ink rounded-full"
        style={{ top: size * 0.62, width: 3, height: size * 0.1 }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-t-lg rounded-b-md shadow-lg"
        style={{
          top: size * 0.7,
          width: size * 0.42,
          height: size * 0.75,
          background: "linear-gradient(180deg, #FBF0DC 0%, #F2E3C6 60%, #EAD8B4 100%)",
        }}
      />
    </div>
  );
}
