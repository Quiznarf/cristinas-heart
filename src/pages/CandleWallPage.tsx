import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Loader2, MapPin, X } from "lucide-react";
import WorldMap from "../components/WorldMap";
import Starfield from "../components/Starfield";
import { Candle, fetchCandles, lightCandle } from "../lib/api";

export default function CandleWallPage() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [picking, setPicking] = useState(false);
  const [pending, setPending] = useState<{ lat: number; lng: number } | null>(null);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [intention, setIntention] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [justLit, setJustLit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandles()
      .then(setCandles)
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!pending) return;
    setSubmitting(true);
    setError(null);
    try {
      const candle = await lightCandle({
        name: name.trim() || undefined,
        intention: intention.trim() || undefined,
        region: region.trim() || undefined,
        lat: pending.lat,
        lng: pending.lng,
      });
      setCandles((c) => [candle, ...c]);
      setPending(null);
      setPicking(false);
      setName("");
      setRegion("");
      setIntention("");
      setJustLit(true);
      setTimeout(() => setJustLit(false), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not light your candle right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden pointer-events-none">
        <Starfield density={0.8} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14">
        <div className="text-center">
          <p className="eyebrow justify-center">The Candle Wall</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 font-serif text-5xl md:text-6xl font-semibold text-ivory"
          >
            Light a candle for <span className="grad-dawn-text italic">someone you love</span>
          </motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ivory/75 text-balance">
            Every flame is a heart holding hope somewhere on Earth. Light yours, and let someone on
            the other side of the world know they are not alone.
          </p>
          <p className="mt-4 font-serif text-xl text-gold">
            {loading
              ? "Gathering the flames…"
              : `🕯️ ${candles.length} candle${candles.length === 1 ? "" : "s"} burning right now`}
          </p>
        </div>

        {/* Map card */}
        <div className="relative mt-10 rounded-lux border border-white/10 bg-night-2 p-3 sm:p-5 shadow-glow">
          {picking && (
            <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-bold text-white shadow-cta animate-fade-up"
              style={{ background: "linear-gradient(135deg, #e8b64c 0%, #e06a8a 100%)" }}
            >
              <MapPin className="mr-1.5 inline h-4 w-4" />
              Tap the map where your heart is
            </div>
          )}
          {loading ? (
            <div className="flex h-72 items-center justify-center text-ivory/60">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <WorldMap
              candles={candles}
              pending={pending}
              onPick={picking ? (lat, lng) => setPending({ lat, lng }) : undefined}
            />
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          {!picking ? (
            <button onClick={() => setPicking(true)} className="btn btn-gold">
              <Flame className="h-5 w-5" /> Light a candle
            </button>
          ) : (
            <button
              onClick={() => {
                setPicking(false);
                setPending(null);
              }}
              className="btn btn-ghost !py-3 text-sm"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          )}
        </div>

        {/* Lit confirmation */}
        <AnimatePresence>
          {justLit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-2xl border border-gold/30 bg-night-2/95 px-6 py-4 text-center shadow-glow backdrop-blur"
            >
              <p className="font-serif text-xl text-ivory">🕯️ Your candle is burning</p>
              <p className="text-xs text-ivory/60">Its light joins hearts around the world.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placement form */}
        <AnimatePresence>
          {pending && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="card-ivory mx-auto mt-8 max-w-xl p-6 sm:p-8"
            >
              <h3 className="text-center font-serif text-3xl font-semibold text-ink">
                Before you light it…
              </h3>
              <p className="mt-1 text-center text-sm text-ink-soft">
                Everything here is optional. Your candle can burn quietly, too.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Your name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={40}
                    placeholder="Anonymous"
                    className="input-ivory mt-1.5"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Where are you?</span>
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    maxLength={80}
                    placeholder="Phoenix, Arizona"
                    className="input-ivory mt-1.5"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-ink">Your intention</span>
                <input
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  maxLength={140}
                  placeholder="For my mother's healing…"
                  className="input-ivory mt-1.5"
                />
              </label>

              {error && (
                <p className="mt-3 rounded-xl border border-rose/30 bg-rose/10 px-4 py-2.5 text-sm text-rose">
                  {error}
                </p>
              )}

              <button
                onClick={submit}
                disabled={submitting}
                className="btn btn-gold mt-6 w-full disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Lighting…
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4" /> Light my candle here
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent intentions */}
        {candles.some((c) => c.intention) && (
          <div className="mt-20">
            <p className="eyebrow justify-center w-full text-center">A quiet, glowing chorus</p>
            <h2 className="mt-2 text-center font-serif text-4xl font-semibold text-ivory">
              Recent <span className="grad-text italic">intentions</span>
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {candles
                .filter((c) => c.intention)
                .slice(0, 9)
                .map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lux border border-white/10 bg-night-2/70 p-5 backdrop-blur transition hover:border-gold/40"
                  >
                    <p className="font-serif text-xl leading-snug text-ivory">“{c.intention}”</p>
                    <p className="mt-3 text-xs text-ivory/50">
                      🕯️ {c.name || "Anonymous"} · {c.region}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
