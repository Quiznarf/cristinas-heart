export interface PrayerResponse {
  prayer: string;
  demo?: boolean;
}

export interface Voice {
  voice_id: string;
  name: string;
  gender: string;
  tone: string;
}

export interface Candle {
  id: number;
  name: string | null;
  intention: string | null;
  region: string;
  lat: number;
  lng: number;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Static/offline fallbacks: when the app is served without its API (e.g. a
// static preview deploy), everything still works — a heartfelt built-in prayer,
// browser voices, and candles kept in this browser's storage.
// ---------------------------------------------------------------------------

function demoPrayer(request: string): PrayerResponse {
  return {
    prayer: `In this quiet moment, we hold close the heart that asked: "${request}".\n\nMay peace settle gently where there has been worry, may strength rise where there has been weariness, and may love — patient and unending — surround every step of the road ahead.\n\nYou are not alone. You are held, you are heard, and you are deeply loved.\n\nAmen.`,
    demo: true,
  };
}

const LOCAL_CANDLES_KEY = "cristinas-heart-candles-local";

const STARTER_CANDLES: Candle[] = [
  { id: -1, name: "Maria", intention: "For my mother's healing", region: "Phoenix, Arizona", lat: 33.45, lng: -112.07, created_at: "" },
  { id: -2, name: "Kwame", intention: "Peace for our village", region: "Accra, Ghana", lat: 5.6, lng: -0.19, created_at: "" },
  { id: -3, name: "Yuki", intention: "Strength for a new beginning", region: "Osaka, Japan", lat: 34.69, lng: 135.5, created_at: "" },
  { id: -4, name: "Lucia", intention: "Gratitude for my family", region: "São Paulo, Brasil", lat: -23.55, lng: -46.63, created_at: "" },
  { id: -5, name: "Amira", intention: "Comfort for the grieving", region: "Cairo, Egypt", lat: 30.04, lng: 31.24, created_at: "" },
  { id: -6, name: "Ravi", intention: "Hope for my daughter's future", region: "Mumbai, India", lat: 19.08, lng: 72.88, created_at: "" },
  { id: -7, name: "Ella", intention: null, region: "Sydney, Australia", lat: -33.87, lng: 151.21, created_at: "" },
  { id: -8, name: null, intention: null, region: "Warszawa, Polska", lat: 52.23, lng: 21.01, created_at: "" },
];

function localCandles(): Candle[] {
  try {
    const raw = localStorage.getItem(LOCAL_CANDLES_KEY);
    const mine = raw ? (JSON.parse(raw) as Candle[]) : [];
    return [...mine, ...STARTER_CANDLES];
  } catch {
    return STARTER_CANDLES;
  }
}

function saveLocalCandle(candle: Candle) {
  try {
    const raw = localStorage.getItem(LOCAL_CANDLES_KEY);
    const mine = raw ? (JSON.parse(raw) as Candle[]) : [];
    localStorage.setItem(LOCAL_CANDLES_KEY, JSON.stringify([candle, ...mine].slice(0, 100)));
  } catch {
    /* best effort */
  }
}

export async function requestPrayer(input: {
  faith: string;
  language: string;
  request: string;
}): Promise<PrayerResponse> {
  try {
    const res = await fetch("/api/prayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.status === 404 || res.status === 405) return demoPrayer(input.request);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || "Something went wrong. Please try again.");
    }
    return res.json();
  } catch (e) {
    if (e instanceof TypeError) return demoPrayer(input.request); // network / static preview
    throw e;
  }
}

export async function fetchVoices(): Promise<Voice[]> {
  try {
    const res = await fetch("/api/tts");
    if (!res.ok) return [];
    const data = await res.json();
    return data.voices || [];
  } catch {
    return [];
  }
}

/** Returns an object URL for the MP3, or null when unavailable (browser voice fallback). */
export async function synthesizeSpeech(text: string, voiceId: string): Promise<string | null> {
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voiceId }),
    });
    if (res.status === 503 || res.status === 404 || res.status === 405) return null;
    if (!res.ok) throw new Error("Could not generate audio right now.");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    if (e instanceof TypeError) return null;
    throw e;
  }
}

export async function fetchCandles(): Promise<Candle[]> {
  try {
    const res = await fetch("/api/candles");
    if (!res.ok) return localCandles();
    const data = await res.json();
    return data.candles || [];
  } catch {
    return localCandles();
  }
}

export async function lightCandle(input: {
  name?: string;
  intention?: string;
  region?: string;
  lat: number;
  lng: number;
}): Promise<Candle> {
  try {
    const res = await fetch("/api/candles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.status === 404 || res.status === 405) throw new TypeError("static");
    if (!res.ok) throw new Error("Could not light your candle right now.");
    const data = await res.json();
    return data.candle;
  } catch (e) {
    if (e instanceof TypeError) {
      const candle: Candle = {
        id: Date.now(),
        name: input.name || null,
        intention: input.intention || null,
        region: input.region || "Somewhere on Earth",
        lat: input.lat,
        lng: input.lng,
        created_at: new Date().toISOString(),
      };
      saveLocalCandle(candle);
      return candle;
    }
    throw e;
  }
}
