// Shared server-side logic used by both Netlify Functions and the local dev server.
// Carried over (and refined) from the original Cristina's Heart PrayerPlatform.

export const faithPrompts = {
  "non-denominational": "a universal, inclusive spiritual prayer that speaks to the human heart",
  "islam": "an Islamic prayer (du'a) seeking Allah's mercy, guidance, and blessing, with traditional Islamic phrases",
  "judaism": "a Jewish prayer honoring HaShem with warmth, tradition, and hope",
  "buddhism": "a Buddhist prayer of compassion, mindfulness, and loving-kindness for all beings",
  "spiritual": "a gentle spiritual prayer for someone who is spiritual but not religious, acknowledging mystery, connection, and meaning",
  "catholic": "a Catholic prayer invoking God's love, grace, and mercy through Christ and the Saints",
  "protestant": "a Protestant Christian prayer emphasizing God's grace and salvation through faith",
  "orthodox": "an Eastern Orthodox prayer honoring ancient traditions and the Holy Trinity",
  "baptist": "a Baptist prayer emphasizing personal relationship with Jesus and biblical truth",
  "methodist": "a Methodist prayer focusing on God's grace, social justice, and personal holiness",
  "lutheran": "a Lutheran prayer emphasizing salvation by grace through faith alone",
  "presbyterian": "a Presbyterian prayer honoring God's sovereignty and Reformed theology",
  "pentecostal": "a Pentecostal prayer invoking the Holy Spirit's power and gifts",
  "anglican": "an Anglican prayer combining Catholic and Protestant traditions",
  "mormon": "a Latter-day Saints prayer honoring Heavenly Father through Jesus Christ",
  "jehovah": "a Jehovah's Witnesses prayer to Jehovah God through Jesus Christ",
  "adventist": "a Seventh-day Adventist prayer emphasizing Christ's second coming and wholeness",
  "sunni": "a Sunni Islamic prayer seeking Allah's guidance with traditional Islamic phrases",
  "shia": "a Shia Islamic prayer seeking Allah's blessing through the Prophet and his family",
  "sufi": "a Sufi Islamic prayer emphasizing divine love and spiritual purification",
  "orthodox-judaism": "an Orthodox Jewish prayer honoring Torah, tradition, and covenant with HaShem",
  "conservative-judaism": "a Conservative Jewish prayer balancing tradition with modern understanding",
  "reform-judaism": "a Reform Jewish prayer emphasizing ethical monotheism and social justice",
  "reconstructionist-judaism": "a Reconstructionist Jewish prayer viewing Judaism as evolving religious civilization",
  "hinduism": "a Hindu prayer connecting with divine consciousness and eternal dharma",
  "vaishnavism": "a Vaishnava Hindu prayer devoted to Vishnu and his avatars",
  "shaivism": "a Shaiva Hindu prayer honoring Lord Shiva as the supreme divine",
  "theravada": "a Theravada Buddhist prayer focusing on individual liberation and mindfulness",
  "mahayana": "a Mahayana Buddhist prayer emphasizing compassion for all beings",
  "zen": "a Zen Buddhist prayer focusing on mindfulness and direct awakening",
  "tibetan": "a Tibetan Buddhist prayer incorporating compassion and wisdom traditions",
  "sikhism": "a Sikh prayer honoring the one Creator and seeking divine guidance",
  "jainism": "a Jain prayer emphasizing non-violence, truth, and spiritual purification",
  "zoroastrianism": "a Zoroastrian prayer honoring Ahura Mazda and the path of good thoughts, words, and deeds",
  "bahai": "a Bahá'í prayer reflecting unity, peace, and service to humanity",
  "taoism": "a Taoist prayer seeking harmony with the Tao and natural order",
  "confucianism": "a Confucian prayer emphasizing virtue, wisdom, and social harmony",
  "shinto": "a Shinto prayer honoring kami and the sacred in nature",
  "unitarian": "a Unitarian Universalist prayer emphasizing inherent worth and dignity",
  "quaker": "a Quaker prayer seeking divine light and inner guidance",
  "indigenous": "a prayer honoring indigenous spiritual traditions and connection to Mother Earth",
  "native-american": "a Native American prayer honoring the Great Spirit and sacred relationships",
  "african-traditional": "a prayer honoring African ancestral wisdom and community spirits",
  "wicca": "a Wiccan prayer honoring the divine feminine and masculine in nature",
  "druidism": "a Druidic prayer connecting with earth wisdom and natural cycles",
  "norse": "a Norse Heathen prayer honoring the gods and ancestral wisdom",
  "secular": "a secular, humanistic prayer focused on hope, strength, and human connection",
  "agnostic": "an agnostic spiritual prayer acknowledging mystery and seeking meaning",
  "humanist": "a humanist prayer celebrating human dignity and potential",
  "other": "a respectful, inclusive spiritual prayer",
};

export const languageInstructions = {
  "english": "in English",
  "spanish": "in Spanish (Español)",
  "french": "in French (Français)",
  "german": "in German (Deutsch)",
  "italian": "in Italian (Italiano)",
  "portuguese": "in Portuguese (Português)",
  "russian": "in Russian (Русский)",
  "arabic": "in Arabic (العربية)",
  "hindi": "in Hindi (हिन्दी)",
  "mandarin": "in Chinese (中文)",
  "japanese": "in Japanese (日本語)",
  "korean": "in Korean (한국어)",
  "dutch": "in Dutch (Nederlands)",
  "swedish": "in Swedish (Svenska)",
  "norwegian": "in Norwegian (Norsk)",
  "danish": "in Danish (Dansk)",
  "finnish": "in Finnish (Suomi)",
  "polish": "in Polish (Polski)",
  "czech": "in Czech (Čeština)",
  "hungarian": "in Hungarian (Magyar)",
  "romanian": "in Romanian (Română)",
  "bulgarian": "in Bulgarian (Български)",
  "croatian": "in Croatian (Hrvatski)",
  "serbian": "in Serbian (Српски)",
  "greek": "in Greek (Ελληνικά)",
  "hebrew": "in Hebrew (עברית)",
  "turkish": "in Turkish (Türkçe)",
  "persian": "in Persian (فارسی)",
  "urdu": "in Urdu (اردو)",
  "bengali": "in Bengali (বাংলা)",
  "tamil": "in Tamil (தமிழ்)",
  "telugu": "in Telugu (తెలుగు)",
  "marathi": "in Marathi (मराठी)",
  "gujarati": "in Gujarati (ગુજરાતી)",
  "punjabi": "in Punjabi (ਪੰਜਾਬੀ)",
  "thai": "in Thai (ไทย)",
  "vietnamese": "in Vietnamese (Tiếng Việt)",
  "indonesian": "in Indonesian (Bahasa Indonesia)",
  "malay": "in Malay (Bahasa Melayu)",
  "tagalog": "in Tagalog",
  "swahili": "in Swahili (Kiswahili)",
  "amharic": "in Amharic (አማርኛ)",
  "yoruba": "in Yoruba (Yorùbá)",
  "hausa": "in Hausa",
};

const DEMO_PRAYERS = {
  default: (request) =>
    `In this quiet moment, we hold close the heart that asked: "${request}".\n\nMay peace settle gently where there has been worry, may strength rise where there has been weariness, and may love — patient and unending — surround every step of the road ahead.\n\nYou are not alone. You are held, you are heard, and you are deeply loved.\n\nAmen.`,
};

/**
 * Resolve which LLM provider to use. DeepSeek and OpenAI share the same
 * chat-completions API shape, so switching is just a base URL + model.
 *
 * Priority: DEEPSEEK_API_KEY → DeepSeek; else OPENAI_API_KEY → OpenAI.
 * Override anything with LLM_BASE_URL / LLM_MODEL / LLM_API_KEY.
 */
function resolveLlm() {
  if (process.env.LLM_API_KEY && process.env.LLM_BASE_URL) {
    return {
      apiKey: process.env.LLM_API_KEY,
      baseUrl: process.env.LLM_BASE_URL,
      model: process.env.LLM_MODEL || "deepseek-chat",
    };
  }
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: "https://api.deepseek.com/v1",
      model: process.env.LLM_MODEL || "deepseek-chat",
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: "https://api.openai.com/v1",
      model: process.env.LLM_MODEL || "gpt-4o",
    };
  }
  return null;
}

/**
 * Generate a prayer. Uses DeepSeek (or OpenAI) when an API key is configured;
 * otherwise returns a heartfelt built-in prayer (demo mode).
 */
export async function generatePrayer({ faith, language, request }) {
  const faithPrompt = faithPrompts[faith] || faithPrompts["non-denominational"];
  const languageInstruction = languageInstructions[language] || "in English";

  const llm = resolveLlm();
  if (!llm) {
    return { prayer: DEMO_PRAYERS.default(request), demo: true };
  }

  const systemPrompt = `You are a compassionate spiritual guide who creates respectful, culturally appropriate prayers for people of all faiths. You have deep knowledge of various religious and spiritual traditions. Your prayers should be:
- Respectful and reverent
- Culturally appropriate for the specified faith tradition
- Comforting and uplifting
- Not overly long (3-6 sentences)
- Authentic to the tradition while being accessible

Create ${faithPrompt} ${languageInstruction}. Respond with JSON in this format: { "prayer": "your prayer text here" }`;

  const response = await fetch(`${llm.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${llm.apiKey}`,
    },
    body: JSON.stringify({
      model: llm.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please create a prayer for this request: "${request}"` },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM error ${response.status}: ${text.slice(0, 300)}`);
  }

  const data = await response.json();
  const parsed = JSON.parse(
    data.choices?.[0]?.message?.content || '{"prayer": "May peace and blessing be with you."}'
  );
  return { prayer: parsed.prayer, demo: false };
}

// ----- ElevenLabs text-to-speech -----

// The voices of Cristina's Heart. This list is EXPLICIT — only voices
// added here appear in the app. (No automatic account syncing.)
// To restore Francis, add back:
//   { voice_id: "ePWzXLevzT59XKSkPntW", name: "Francis", gender: "Male", tone: "" },
export const VOICES = [
  { voice_id: "lvGaKpCOBzSxF7x4y3Iv", name: "Robert", gender: "Male", tone: "" },
];

export async function getVoices() {
  return VOICES;
}

/**
 * Generate speech audio via ElevenLabs. Returns a Buffer of MP3 audio.
 * Uses eleven_multilingual_v2 so prayers in all 44 languages sound natural
 * (the original app used the English-only monolingual model).
 */
export async function generateSpeech({ text, voiceId }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    const err = new Error("TTS_NOT_CONFIGURED");
    err.code = "TTS_NOT_CONFIGURED";
    throw err;
  }

  // Accept any plausible ElevenLabs voice ID (including custom voices);
  // fall back to the first curated voice otherwise.
  const chosen = /^[A-Za-z0-9]{10,40}$/.test(voiceId || "") ? voiceId : VOICES[0].voice_id;

  // Optional higher-bitrate audio, e.g. set ELEVENLABS_FORMAT=mp3_44100_192
  // (192 kbps requires ElevenLabs Creator plan or above).
  const format = process.env.ELEVENLABS_FORMAT
    ? `?output_format=${encodeURIComponent(process.env.ELEVENLABS_FORMAT)}`
    : "";

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${chosen}${format}`, {
    method: "POST",
    headers: {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      // Eleven v3: most expressive multilingual model — best for cloned voices.
      // Override with the ELEVENLABS_MODEL env var if ElevenLabs renames it.
      model_id: process.env.ELEVENLABS_MODEL || "eleven_v3",
      // Settings tuned for cloned-voice fidelity: no style exaggeration
      // (style drift is what causes accent shifts) and high similarity,
      // so the voice sounds exactly as it does in ElevenLabs itself.
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.9,
        style: 0.0,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText.slice(0, 300)}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ----- Candle Wall storage (any Postgres: Supabase, Neon, etc.) -----
// Works with a standard connection string in DATABASE_URL.
// For Supabase, use the "Transaction pooler" connection string
// (Project Settings → Database), which is built for serverless functions.

const memoryCandles = [];
let memorySeq = 1;
let _sql = null;

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (_sql) return _sql;
  const { default: postgres } = await import("postgres");
  _sql = postgres(process.env.DATABASE_URL, {
    ssl: "require",
    max: 1, // serverless-friendly: one connection per function instance
    prepare: false, // required for Supabase's transaction-mode pooler
    idle_timeout: 20,
  });
  return _sql;
}

export async function ensureCandleTable(sql) {
  await sql`CREATE TABLE IF NOT EXISTS candles (
    id SERIAL PRIMARY KEY,
    name TEXT,
    intention TEXT,
    region TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  )`;
}

export async function listCandles(limit = 500) {
  const sql = await getDb();
  if (!sql) {
    return memoryCandles.slice(-limit);
  }
  await ensureCandleTable(sql);
  const rows = await sql`SELECT id, name, intention, region, lat, lng, created_at
    FROM candles ORDER BY created_at DESC LIMIT ${limit}`;
  return rows;
}

export async function addCandle({ name, intention, region, lat, lng }) {
  const candle = {
    name: (name || "").slice(0, 40) || null,
    intention: (intention || "").slice(0, 140) || null,
    region: (region || "Somewhere on Earth").slice(0, 80),
    lat: Number(lat),
    lng: Number(lng),
  };
  if (!Number.isFinite(candle.lat) || !Number.isFinite(candle.lng)) {
    throw new Error("Invalid coordinates");
  }

  const sql = await getDb();
  if (!sql) {
    const row = { id: memorySeq++, ...candle, created_at: new Date().toISOString() };
    memoryCandles.push(row);
    return row;
  }
  await ensureCandleTable(sql);
  const rows = await sql`INSERT INTO candles (name, intention, region, lat, lng)
    VALUES (${candle.name}, ${candle.intention}, ${candle.region}, ${candle.lat}, ${candle.lng})
    RETURNING id, name, intention, region, lat, lng, created_at`;
  return rows[0];
}
