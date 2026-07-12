export interface FaithTradition {
  id: string;
  label: string;
  group: string;
  emoji: string;
}

export const FAITH_GROUPS = ["Universal", "Traditions"] as const;

// A focused list of twelve paths — every major tradition honored,
// with room for those still finding their way.
export const FAITH_TRADITIONS: FaithTradition[] = [
  { id: "non-denominational", label: "Non-denominational", group: "Universal", emoji: "🕊️" },
  { id: "catholic", label: "Catholic", group: "Traditions", emoji: "✝️" },
  { id: "protestant", label: "Protestant", group: "Traditions", emoji: "✝️" },
  { id: "orthodox", label: "Orthodox Christian", group: "Traditions", emoji: "☦️" },
  { id: "islam", label: "Islam", group: "Traditions", emoji: "☪️" },
  { id: "judaism", label: "Judaism", group: "Traditions", emoji: "✡️" },
  { id: "hinduism", label: "Hinduism", group: "Traditions", emoji: "🕉️" },
  { id: "buddhism", label: "Buddhism", group: "Traditions", emoji: "☸️" },
  { id: "sikhism", label: "Sikhism", group: "Traditions", emoji: "🪯" },
  { id: "indigenous", label: "Indigenous & Earth Traditions", group: "Traditions", emoji: "🌎" },
  { id: "spiritual", label: "Spiritual, not religious", group: "Universal", emoji: "🌌" },
  { id: "secular", label: "Secular & Humanist", group: "Universal", emoji: "🤍" },
];

export interface Language {
  id: string;
  label: string;
  native: string;
}

export const LANGUAGES: Language[] = [
  { id: "original", label: "Same as my request", native: "✨ Original" },
  { id: "english", label: "English", native: "English" },
  { id: "spanish", label: "Spanish", native: "Español" },
  { id: "french", label: "French", native: "Français" },
  { id: "german", label: "German", native: "Deutsch" },
  { id: "italian", label: "Italian", native: "Italiano" },
  { id: "portuguese", label: "Portuguese", native: "Português" },
  { id: "russian", label: "Russian", native: "Русский" },
  { id: "arabic", label: "Arabic", native: "العربية" },
  { id: "hindi", label: "Hindi", native: "हिन्दी" },
  { id: "mandarin", label: "Chinese", native: "中文" },
  { id: "japanese", label: "Japanese", native: "日本語" },
  { id: "korean", label: "Korean", native: "한국어" },
  { id: "dutch", label: "Dutch", native: "Nederlands" },
  { id: "swedish", label: "Swedish", native: "Svenska" },
  { id: "norwegian", label: "Norwegian", native: "Norsk" },
  { id: "danish", label: "Danish", native: "Dansk" },
  { id: "finnish", label: "Finnish", native: "Suomi" },
  { id: "polish", label: "Polish", native: "Polski" },
  { id: "czech", label: "Czech", native: "Čeština" },
  { id: "hungarian", label: "Hungarian", native: "Magyar" },
  { id: "romanian", label: "Romanian", native: "Română" },
  { id: "bulgarian", label: "Bulgarian", native: "Български" },
  { id: "croatian", label: "Croatian", native: "Hrvatski" },
  { id: "serbian", label: "Serbian", native: "Српски" },
  { id: "greek", label: "Greek", native: "Ελληνικά" },
  { id: "hebrew", label: "Hebrew", native: "עברית" },
  { id: "turkish", label: "Turkish", native: "Türkçe" },
  { id: "persian", label: "Persian", native: "فارسی" },
  { id: "urdu", label: "Urdu", native: "اردو" },
  { id: "bengali", label: "Bengali", native: "বাংলা" },
  { id: "tamil", label: "Tamil", native: "தமிழ்" },
  { id: "telugu", label: "Telugu", native: "తెలుగు" },
  { id: "marathi", label: "Marathi", native: "मराठी" },
  { id: "gujarati", label: "Gujarati", native: "ગુજરાતી" },
  { id: "punjabi", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { id: "thai", label: "Thai", native: "ไทย" },
  { id: "vietnamese", label: "Vietnamese", native: "Tiếng Việt" },
  { id: "indonesian", label: "Indonesian", native: "Bahasa Indonesia" },
  { id: "malay", label: "Malay", native: "Bahasa Melayu" },
  { id: "tagalog", label: "Tagalog", native: "Tagalog" },
  { id: "swahili", label: "Swahili", native: "Kiswahili" },
  { id: "amharic", label: "Amharic", native: "አማርኛ" },
  { id: "yoruba", label: "Yoruba", native: "Yorùbá" },
  { id: "hausa", label: "Hausa", native: "Hausa" },
];
