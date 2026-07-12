import { useState } from "react";
import { motion } from "framer-motion";
import { BookHeart, Copy, Check, Trash2 } from "lucide-react";
import { JournalEntry, listEntries, removeEntry } from "../lib/journal";
import { FAITH_TRADITIONS, LANGUAGES } from "../data/traditions";
import CandleFlame from "../components/CandleFlame";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(listEntries());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const copy = async (e: JournalEntry) => {
    try {
      await navigator.clipboard.writeText(e.prayer);
      setCopiedId(e.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      /* noop */
    }
  };

  const remove = (id: string) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      setTimeout(() => setConfirmingId((c) => (c === id ? null : c)), 2500);
      return;
    }
    removeEntry(id);
    setEntries(listEntries());
    setConfirmingId(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-14">
      <div className="text-center">
        <p className="eyebrow justify-center">Kept close, kept private</p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 font-serif text-5xl md:text-6xl font-semibold text-ivory"
        >
          My <span className="grad-dawn-text italic">Prayer Journal</span>
        </motion.h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ivory/75 text-balance">
          Every prayer you receive is kept here — privately, on your own device — so you can
          return to them whenever your heart needs.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="card-ivory mt-14 px-8 py-16 text-center">
          <div className="inline-block opacity-90">
            <CandleFlame size={52} />
          </div>
          <p className="mt-5 font-serif text-3xl font-semibold text-ink">Your journal is waiting</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            When you receive a prayer, it will be saved here automatically.
          </p>
          <a href="#/" className="btn btn-gold mt-7">
            🙏 Request your first prayer
          </a>
        </div>
      ) : (
        <div className="mt-12 space-y-6">
          {entries.map((e, i) => {
            const faith = FAITH_TRADITIONS.find((t) => t.id === e.faith);
            const lang = LANGUAGES.find((l) => l.id === e.language);
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                className="card-ivory overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/5 bg-ivory-2/80 px-6 py-3">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <BookHeart className="h-4 w-4 text-rose" />
                    {formatDate(e.createdAt)}
                  </span>
                  <span className="text-xs text-ink-soft">
                    {faith?.emoji} {faith?.label ?? e.faith} · {lang?.label ?? e.language}
                  </span>
                </div>
                <div className="px-6 py-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                    You asked
                  </p>
                  <p className="mt-1 text-sm italic text-ink-soft">“{e.request}”</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                    Your prayer
                  </p>
                  <p className="prayer-text mt-2 !text-lg md:!text-xl text-ink">{e.prayer}</p>
                </div>
                <div className="flex items-center justify-end gap-2 border-t border-ink/5 px-6 py-3">
                  <button
                    onClick={() => copy(e)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-ivory-2 hover:text-ink transition"
                  >
                    {copiedId === e.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => remove(e.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      confirmingId === e.id
                        ? "bg-rose text-white"
                        : "text-ink-soft/70 hover:bg-ivory-2 hover:text-rose"
                    }`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {confirmingId === e.id ? "Tap again to remove" : "Remove"}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
