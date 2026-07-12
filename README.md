# Cristina's Heart — Prayers for Humanity (v2)

A sacred space for prayer: share what's on your heart and receive a prayer crafted
with love for your faith tradition (12 paths) in your language (44 languages) —
with voice playback, shareable prayer cards, a global Candle Wall, and a private
Prayer Journal.

## Features

- **Prayer generation** — DeepSeek (default) or OpenAI, with culturally-tailored prompts per faith tradition and language
- **Voice playback** — ElevenLabs `eleven_v3` (most expressive multilingual model), with a curated set of six distinct voices and automatic browser-voice fallback
- **Prayer cards** — downloadable, beautifully designed cards in four themes
- **Candle Wall** — a world map where anyone can light a candle with an optional name and intention (stored in Postgres — Supabase, Neon, or any provider)
- **Prayer Journal** — every prayer is saved privately on the visitor's own device
- **Demo mode** — without API keys the app still works, using a built-in prayer and browser voices

## Local development

```bash
npm install
npm run dev          # starts the API server on :8788 (serves dist/ if built)
npm run dev:vite     # in a second terminal: frontend with hot reload on :5173
```

Or to preview the production build: `npm run build && npm run dev` → http://localhost:8788

## Environment variables

| Variable | Purpose | Without it |
|---|---|---|
| `OPENAI_API_KEY` | Prayer generation (GPT-4o) | Demo prayer is returned |
| `ELEVENLABS_API_KEY` | Voice synthesis | Browser voices are used |
| `DATABASE_URL` | Postgres (Supabase pooler URI) for the Candle Wall | Candles stored in memory only |

See `DEPLOY.md` for step-by-step Netlify deployment.
