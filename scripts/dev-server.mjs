// Local development server: serves the same API the Netlify Functions expose,
// plus (in production preview) the built frontend from dist/.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  generatePrayer,
  generateSpeech,
  getVoices,
  listCandles,
  addCandle,
} from "../api-lib/prayer-core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/prayer", async (req, res) => {
  try {
    const { faith, language, request } = req.body || {};
    if (!request || String(request).trim().length < 3) {
      return res.status(400).json({ message: "Please share what's in your heart so we can pray with you." });
    }
    const result = await generatePrayer({
      faith: String(faith || "non-denominational"),
      language: String(language || "english"),
      request: String(request).trim().slice(0, 2000),
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while generating your prayer. Please try again." });
  }
});

app.get("/api/tts", async (_req, res) => res.json({ voices: await getVoices() }));

app.post("/api/tts", async (req, res) => {
  try {
    const { text, voiceId } = req.body || {};
    if (!text) return res.status(400).json({ message: "Text is required" });
    const audio = await generateSpeech({ text: String(text).slice(0, 5000), voiceId });
    res.set({ "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=3600" });
    res.send(audio);
  } catch (err) {
    if (err.code === "TTS_NOT_CONFIGURED") {
      return res.status(503).json({ message: "TTS_NOT_CONFIGURED" });
    }
    console.error(err);
    res.status(500).json({ message: "Failed to generate speech" });
  }
});

app.get("/api/candles", async (_req, res) => {
  try {
    res.json({ candles: await listCandles() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not reach the candle wall" });
  }
});

app.post("/api/candles", async (req, res) => {
  try {
    res.status(201).json({ candle: await addCandle(req.body || {}) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not light your candle" });
  }
});

// Serve built frontend if present (for previewing the production build)
const dist = path.resolve(__dirname, "..", "dist");
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(dist, "index.html"), (err) => {
    if (err) res.status(404).send("Run `npm run build` first, or use `npm run dev:vite` for the dev frontend.");
  });
});

const port = process.env.PORT || 8788;
app.listen(port, () => console.log(`Cristina's Heart API on http://localhost:${port}`));
