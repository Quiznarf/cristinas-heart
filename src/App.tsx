import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, BookHeart, HandHeart } from "lucide-react";
import logoUrl from "./assets/logo.png";
import PrayPage from "./pages/PrayPage";
import CandleWallPage from "./pages/CandleWallPage";
import JournalPage from "./pages/JournalPage";

type View = "pray" | "candles" | "journal";

function viewFromHash(): View {
  const h = window.location.hash;
  if (h.startsWith("#/candles")) return "candles";
  if (h.startsWith("#/journal")) return "journal";
  return "pray";
}

const NAV: { id: View; label: string; icon: typeof Flame }[] = [
  { id: "pray", label: "Pray", icon: HandHeart },
  { id: "candles", label: "Candle Wall", icon: Flame },
  { id: "journal", label: "My Journal", icon: BookHeart },
];

export default function App() {
  const [view, setView] = useState<View>(viewFromHash());

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (v: View) => {
    window.location.hash = v === "pray" ? "#/" : `#/${v}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-night">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-night/80 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-[72px]">
          <button
            onClick={() => go("pray")}
            className="flex items-center gap-3 group"
            aria-label="Cristina's Heart home"
          >
            <img
              src={logoUrl}
              alt="Cristina's Heart — Prayers for Humanity"
              className="h-11 w-auto drop-shadow-[0_0_14px_rgba(224,106,138,0.35)] group-hover:scale-[1.03] transition-transform"
            />
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`relative flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-sm font-semibold transition-colors ${
                  view === id ? "text-white" : "text-ivory/75 hover:text-ivory hover:bg-white/5"
                }`}
              >
                {view === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full shadow-cta"
                    style={{
                      background:
                        "linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%)",
                    }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Page */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {view === "pray" && <PrayPage onLightCandle={() => go("candles")} />}
            {view === "candles" && <CandleWallPage />}
            {view === "journal" && <JournalPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 bg-night-2/60">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center space-y-4">
          <img
            src={logoUrl}
            alt="Cristina's Heart"
            className="mx-auto h-16 w-auto opacity-95"
          />
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            One World, One Prayer
          </p>
          <div className="divider-shimmer mx-auto max-w-xs" />
          <p className="text-sm text-ivory/55">
            Made with love and respect for all faith traditions. Always free — no ads, no
            paywalls.
          </p>
        </div>
      </footer>
    </div>
  );
}
