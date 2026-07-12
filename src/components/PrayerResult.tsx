import { useEffect, useRef, useState } from "react";
import {
  BookHeart,
  Check,
  Copy,
  Flame,
  ImageDown,
  Loader2,
  Pause,
  Play,
  RefreshCcw,
  Volume2,
} from "lucide-react";
import { fetchVoices, synthesizeSpeech, Voice } from "../lib/api";
import { FAITH_TRADITIONS, LANGUAGES } from "../data/traditions";
import type { PrayerFormValues } from "./PrayerForm";
import PrayerCardModal from "./PrayerCardModal";

interface Props {
  prayer: string;
  values: PrayerFormValues;
  onPrayAgain: () => void;
  onLightCandle: () => void;
}

type AudioState = "idle" | "generating" | "playing" | "paused" | "browser-speaking";

export default function PrayerResult({ prayer, values, onPrayAgain, onLightCandle }: Props) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voiceId, setVoiceId] = useState<string>("");
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [audioError, setAudioError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlByVoice = useRef<Map<string, string>>(new Map());

  const faithLabel = FAITH_TRADITIONS.find((t) => t.id === values.faith)?.label ?? values.faith;
  const langLabel = LANGUAGES.find((l) => l.id === values.language)?.label ?? values.language;

  useEffect(() => {
    fetchVoices().then((v) => {
      setVoices(v);
      if (v.length) setVoiceId(v[0].voice_id);
    });
    return () => {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      urlByVoice.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const speakWithBrowser = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setAudioError("Audio isn't available on this device.");
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(prayer);
    utter.rate = 0.92;
    utter.onend = () => setAudioState("idle");
    utter.onerror = () => setAudioState("idle");
    synth.speak(utter);
    setAudioState("browser-speaking");
  };

  const handleListen = async () => {
    setAudioError(null);

    if (audioState === "playing") {
      audioRef.current?.pause();
      setAudioState("paused");
      return;
    }
    if (audioState === "paused" && audioRef.current) {
      audioRef.current.play();
      setAudioState("playing");
      return;
    }
    if (audioState === "browser-speaking") {
      window.speechSynthesis?.cancel();
      setAudioState("idle");
      return;
    }

    const cached = urlByVoice.current.get(voiceId);
    if (cached) {
      playUrl(cached);
      return;
    }

    setAudioState("generating");
    try {
      const url = await synthesizeSpeech(prayer, voiceId);
      if (url === null) {
        speakWithBrowser();
        return;
      }
      urlByVoice.current.set(voiceId, url);
      playUrl(url);
    } catch (e) {
      setAudioState("idle");
      setAudioError(e instanceof Error ? e.message : "Could not generate audio right now.");
    }
  };

  const playUrl = (url: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setAudioState("idle");
    }
    if (audioRef.current.src !== url) audioRef.current.src = url;
    audioRef.current.play();
    setAudioState("playing");
  };

  const changeVoice = (id: string) => {
    setVoiceId(id);
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setAudioState("idle");
  };

  const copyPrayer = async () => {
    try {
      await navigator.clipboard.writeText(prayer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setAudioError("Couldn't copy — please select the text manually.");
    }
  };

  const listening = audioState === "playing" || audioState === "browser-speaking";

  return (
    <div className="card-ivory overflow-hidden">
      {/* Ribbon */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5"
        style={{ background: "linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%)" }}
      >
        <span className="text-sm font-bold text-white">Your prayer is ready 🕯️</span>
        <span className="text-xs font-semibold text-white/85">
          {faithLabel} · {langLabel}
        </span>
      </div>

      <div className="p-6 sm:p-10">
        {/* The prayer itself */}
        <blockquote className="prayer-text text-center text-ink">{prayer}</blockquote>

        <div className="divider-shimmer mx-auto mt-8 max-w-sm" />

        {/* Voice + listen */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-ivory-2/70 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Volume2 className="h-4 w-4 text-gold-deep" />
              Hear your prayer
            </div>
            <div className="flex flex-1 flex-col xs:flex-row items-stretch gap-3 sm:justify-end">
              {voices.length > 0 && (
                <select
                  value={voiceId}
                  onChange={(e) => changeVoice(e.target.value)}
                  className="input-ivory !w-auto !py-2.5 text-sm"
                  aria-label="Choose a voice"
                >
                  {voices.map((v) => (
                    <option key={v.voice_id} value={v.voice_id}>
                      {v.name} — {v.tone}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={handleListen}
                disabled={audioState === "generating"}
                className="btn btn-gold !py-2.5 !px-5 text-sm disabled:opacity-60"
              >
                {audioState === "generating" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Preparing voice…
                  </>
                ) : listening ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Listen
                  </>
                )}
              </button>
            </div>
          </div>
          {audioError && <p className="mt-3 text-sm text-rose">{audioError}</p>}
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ActionButton onClick={copyPrayer} icon={copied ? Check : Copy}>
            {copied ? "Copied" : "Copy prayer"}
          </ActionButton>
          <ActionButton onClick={() => setShowCard(true)} icon={ImageDown}>
            Create prayer card
          </ActionButton>
          <ActionButton onClick={onLightCandle} icon={Flame}>
            Light a candle
          </ActionButton>
          <ActionButton onClick={onPrayAgain} icon={RefreshCcw}>
            Pray again
          </ActionButton>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-soft/80">
          <BookHeart className="h-3.5 w-3.5" />
          Saved to your private Prayer Journal on this device.
        </p>
      </div>

      {showCard && (
        <PrayerCardModal prayer={prayer} faithLabel={faithLabel} onClose={() => setShowCard(false)} />
      )}
    </div>
  );
}

function ActionButton({
  onClick,
  icon: Icon,
  children,
}: {
  onClick: () => void;
  icon: typeof Copy;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm transition-all hover:border-gold/60 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
    >
      <Icon className="h-4 w-4 text-rose" />
      {children}
    </button>
  );
}
