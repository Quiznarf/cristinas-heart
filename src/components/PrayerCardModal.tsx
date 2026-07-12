import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, X } from "lucide-react";

interface Props {
  prayer: string;
  faithLabel: string;
  onClose: () => void;
}

interface CardTheme {
  id: string;
  label: string;
  bg: [string, string, string];
  text: string;
  accent: string;
}

const THEMES: CardTheme[] = [
  { id: "night", label: "Starlit Night", bg: ["#1a2150", "#10163a", "#0a0e24"], text: "#fdf9f0", accent: "#e8b64c" },
  { id: "dawn", label: "Golden Dawn", bg: ["#fdf9f0", "#f7efdf", "#f6d98a"], text: "#232041", accent: "#c48f24" },
  { id: "rose", label: "Rose Heart", bg: ["#fdf9f0", "#fbe4ea", "#f4a7bc"], text: "#232041", accent: "#e06a8a" },
  { id: "violet", label: "Violet Sky", bg: ["#fdf9f0", "#ece7fb", "#bcaef7"], text: "#232041", accent: "#8f7ae8" },
];

const CANVAS_W = 1080;
const CANVAS_H = 1350;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const paragraphs = text.split(/\n+/);
  const lines: string[] = [];
  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    lines.push(""); // paragraph gap
  }
  while (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function drawCard(canvas: HTMLCanvasElement, prayer: string, faithLabel: string, theme: CardTheme) {
  const ctx = canvas.getContext("2d")!;
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, theme.bg[0]);
  grad.addColorStop(0.55, theme.bg[1]);
  grad.addColorStop(1, theme.bg[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Soft radial glow behind the flame
  const glow = ctx.createRadialGradient(CANVAS_W / 2, 210, 10, CANVAS_W / 2, 210, 260);
  glow.addColorStop(0, "rgba(245,185,66,0.5)");
  glow.addColorStop(1, "rgba(245,185,66,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CANVAS_W, 520);

  // Border frame
  ctx.strokeStyle = theme.accent + "55";
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, CANVAS_W - 96, CANVAS_H - 96);
  ctx.strokeStyle = theme.accent + "2B";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 64, CANVAS_W - 128, CANVAS_H - 128);

  // Candle flame
  const cx = CANVAS_W / 2;
  ctx.save();
  ctx.translate(cx, 150);
  const flame = ctx.createRadialGradient(0, 30, 4, 0, 40, 70);
  flame.addColorStop(0, "#FFF7D6");
  flame.addColorStop(0.5, "#F5B942");
  flame.addColorStop(1, "#E3722E");
  ctx.fillStyle = flame;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.bezierCurveTo(34, 10, 34, 46, 0, 78);
  ctx.bezierCurveTo(-34, 46, -34, 10, 0, -40);
  ctx.fill();
  // wick + candle body
  ctx.fillStyle = theme.id === "night" ? "#FBF7F0" : "#FBF0DC";
  ctx.fillRect(-26, 92, 52, 96);
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(-26, 92, 52, 10);
  ctx.restore();

  // Ornamental header
  ctx.fillStyle = theme.accent;
  ctx.font = "700 30px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✦  A  P R A Y E R  F O R  Y O U  ✦", cx, 430);

  // Prayer text
  ctx.fillStyle = theme.text;
  let fontSize = 46;
  let lines: string[];
  do {
    ctx.font = `500 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;
    lines = wrapText(ctx, prayer, CANVAS_W - 260);
    fontSize -= 2;
  } while (lines.length * (fontSize * 1.35) > 640 && fontSize > 24);

  const lineHeight = (fontSize + 2) * 1.35;
  const startY = 520 + (660 - lines.length * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, cx, startY + i * lineHeight);
  });

  // Footer
  ctx.font = "italic 500 34px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = theme.accent;
  ctx.fillText(faithLabel, cx, CANVAS_H - 170);

  ctx.font = "700 26px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = theme.text;
  ctx.fillText("Cristina's Heart", cx, CANVAS_H - 118);
  ctx.font = "400 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = theme.accent;
  ctx.fillText("P R A Y E R S   F O R   H U M A N I T Y", cx, CANVAS_H - 84);
}

export default function PrayerCardModal({ prayer, faithLabel, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState(THEMES[0]);

  useEffect(() => {
    // Wait a tick for fonts to be ready, then draw
    const draw = () => canvasRef.current && drawCard(canvasRef.current, prayer, faithLabel, theme);
    if ("fonts" in document) {
      (document as any).fonts.ready.then(draw);
    }
    draw();
  }, [prayer, faithLabel, theme]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "cristinas-heart-prayer.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-night/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className="relative w-full max-w-lg rounded-lux bg-ivory p-5 sm:p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-3xl font-semibold text-ink">Your Prayer Card</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-ink-soft hover:bg-ivory-2 hover:text-ink transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 shadow-inner">
          <canvas ref={canvasRef} className="block w-full h-auto" />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all ${
                theme.id === t.id
                  ? "border-transparent text-white shadow-cta"
                  : "border-ink/15 bg-white text-ink hover:border-gold"
              }`}
              style={
                theme.id === t.id
                  ? { background: "linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%)" }
                  : undefined
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <button onClick={download} className="btn btn-gold mt-5 w-full">
          <Download className="h-4 w-4" /> Download card
        </button>
      </motion.div>
    </motion.div>
  );
}
