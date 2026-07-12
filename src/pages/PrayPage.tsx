import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Globe2, HeartHandshake } from "lucide-react";
import CandleFlame from "../components/CandleFlame";
import Starfield from "../components/Starfield";
import PrayerForm, { PrayerFormValues } from "../components/PrayerForm";
import PrayerResult from "../components/PrayerResult";
import { requestPrayer } from "../lib/api";
import { saveEntry } from "../lib/journal";
import { FAITH_TRADITIONS } from "../data/traditions";

type Stage = "form" | "loading" | "result";

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "Privacy Protected",
    text: "Your prayers are confidential and treated with the utmost respect.",
  },
  {
    icon: Globe2,
    title: "Every Tradition Honored",
    text: "44 languages and every major faith path, each approached with authenticity and reverence.",
  },
  {
    icon: HeartHandshake,
    title: "Always Free",
    text: "Spiritual support should be accessible to all, always. No ads, no paywalls.",
  },
];

export default function PrayPage({ onLightCandle }: { onLightCandle: () => void }) {
  const [stage, setStage] = useState<Stage>("form");
  const [values, setValues] = useState<PrayerFormValues | null>(null);
  const [prayer, setPrayer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (v: PrayerFormValues) => {
    setError(null);
    setValues(v);
    setStage("loading");
    try {
      const res = await requestPrayer(v);
      setPrayer(res.prayer);
      saveEntry({ request: v.request, prayer: res.prayer, faith: v.faith, language: v.language });
      setStage("result");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStage("form");
    }
  };

  return (
    <div>
      {/* ---------- Hero (night sky) ---------- */}
      <section className="relative overflow-hidden">
        <div className="aurora" />
        <Starfield />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="animate-float-slow inline-block"
          >
            <CandleFlame size={64} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="eyebrow mt-6 justify-center"
          >
            A Sacred Space for Prayer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-2 font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-ivory text-balance"
          >
            Wherever you are, <span className="grad-dawn-text italic">however you believe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ivory/75 text-balance"
          >
            Every path up the mountain is honored here. Share what weighs on your heart, and
            receive a prayer crafted with love and respect for your tradition — in your language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold"
          >
            {["44 languages", "Every faith honored", "Voice & prayer cards", "Free, always"].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-ivory/80 backdrop-blur"
                >
                  {chip}
                </span>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ---------- Form / Loading / Result ---------- */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6" ref={resultRef}>
        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <PrayerForm onSubmit={handleSubmit} error={error} initial={values ?? undefined} />
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-ivory px-8 py-16 text-center"
            >
              <div className="animate-float-slow inline-block">
                <CandleFlame size={56} />
              </div>
              <p className="mt-6 font-serif text-3xl font-semibold text-ink">
                Crafting your prayer with care…
              </p>
              <p className="mt-2 text-sm text-ink-soft">Honoring your tradition, word by word.</p>
              <div className="divider-shimmer mx-auto mt-6 max-w-xs" />
            </motion.div>
          )}

          {stage === "result" && values && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <PrayerResult
                prayer={prayer}
                values={values}
                onPrayAgain={() => setStage("form")}
                onLightCandle={onLightCandle}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ---------- Traditions ---------- */}
      <section className="relative mx-auto max-w-5xl px-6 mt-28 text-center">
        <p className="eyebrow justify-center">Our Calling</p>
        <h2 className="mt-2 font-serif text-4xl md:text-5xl font-semibold text-ivory">
          Honoring <span className="grad-text italic">all paths</span> to the Divine
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ivory/70">
          Our prayers are thoughtfully shaped by spiritual wisdom from across cultures and
          centuries, so each one reflects the beautiful diversity of human faith.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {FAITH_TRADITIONS.map((t, i) => (
            <motion.span
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.015, 0.5), duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-sm text-ivory/85 backdrop-blur hover:border-gold/50 hover:bg-white/10 transition-all cursor-default"
            >
              <span aria-hidden>{t.emoji}</span> {t.label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ---------- Sacred Promise (ivory section) ---------- */}
      <section className="mx-auto max-w-5xl px-6 mt-28">
        <div className="card-ivory p-10 md:p-14">
          <p className="eyebrow justify-center w-full text-center">Our Sacred Promise</p>
          <h2 className="mt-2 text-center font-serif text-4xl font-semibold text-ink">
            Prayer is free. <span className="grad-text italic">Love is free.</span> It always will
            be.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-cta"
                  style={{
                    background: "linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%)",
                  }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
