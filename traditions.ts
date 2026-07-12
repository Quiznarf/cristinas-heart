import { useState } from "react";
import { Feather, Globe, Heart } from "lucide-react";
import { FAITH_GROUPS, FAITH_TRADITIONS, LANGUAGES } from "../data/traditions";

export interface PrayerFormValues {
  faith: string;
  language: string;
  request: string;
}

interface Props {
  onSubmit: (values: PrayerFormValues) => void;
  error?: string | null;
  initial?: PrayerFormValues;
}

export default function PrayerForm({ onSubmit, error, initial }: Props) {
  const [language, setLanguage] = useState(initial?.language ?? "english");
  const [faith, setFaith] = useState(initial?.faith ?? "non-denominational");
  const [request, setRequest] = useState(initial?.request ?? "");
  const [touched, setTouched] = useState(false);

  const valid = request.trim().length >= 3;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit({ faith, language, request: request.trim() });
  };

  return (
    <form onSubmit={submit} className="card-ivory p-6 sm:p-10">
      <div className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
          Share Your <span className="grad-text italic">Prayer Request</span>
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Express your heart in your own words, faith, and language.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <Globe className="h-4 w-4 text-gold-deep" /> Language
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-ivory mt-2"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} {l.native !== l.label ? `· ${l.native}` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <Heart className="h-4 w-4 text-rose" /> Faith tradition
          </span>
          <select
            value={faith}
            onChange={(e) => setFaith(e.target.value)}
            className="input-ivory mt-2"
          >
            {FAITH_GROUPS.map((group) => (
              <optgroup key={group} label={group}>
                {FAITH_TRADITIONS.filter((t) => t.group === group).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <Feather className="h-4 w-4 text-violet" /> Your prayer request
        </span>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          onBlur={() => setTouched(true)}
          rows={5}
          maxLength={2000}
          placeholder="Share what's in your heart… whether it's for healing, guidance, gratitude, or any other intention, express yourself freely."
          className="input-ivory mt-2 resize-none"
        />
        <span className="mt-1.5 block text-xs text-ink-soft/80">
          Your request is private and treated with the utmost respect and confidentiality.
        </span>
      </label>

      {touched && !valid && (
        <p className="mt-3 rounded-xl border border-rose/30 bg-rose/10 px-4 py-2.5 text-sm text-rose">
          Please share a few words so we can pray with you.
        </p>
      )}
      {error && (
        <p className="mt-3 rounded-xl border border-rose/30 bg-rose/10 px-4 py-2.5 text-sm text-rose">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-gold mt-7 w-full">
        🙏 Receive Your Prayer
      </button>
    </form>
  );
}
