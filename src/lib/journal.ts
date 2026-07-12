export interface JournalEntry {
  id: string;
  request: string;
  prayer: string;
  faith: string;
  language: string;
  createdAt: string;
}

const KEY = "cristinas-heart-journal-v1";

function read(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as JournalEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: JournalEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 200)));
  } catch {
    // storage full or unavailable — journal is best-effort
  }
}

export function listEntries(): JournalEntry[] {
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function saveEntry(entry: Omit<JournalEntry, "id" | "createdAt">): JournalEntry {
  const full: JournalEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  write([full, ...read()]);
  return full;
}

export function removeEntry(id: string) {
  write(read().filter((e) => e.id !== id));
}
