# Deploying Cristina's Heart to Netlify

This guide takes about 20 minutes the first time. You'll end up with the app live on
a `.netlify.app` address (and you can attach a custom domain like `app.cristinasheart.org` later).

## Step 1 — Put the code somewhere Netlify can see it

**Easiest: GitHub**

1. Create a free account at github.com if you don't have one.
2. Create a new repository called `cristinas-heart` (private is fine).
3. Upload this project folder's contents (GitHub's web uploader works, or use git:
   `git init && git add -A && git commit -m "Cristina's Heart v2" && git push`).

> Don't upload `node_modules/` or `dist/` — the included `.gitignore` handles this automatically if you use git.

## Step 2 — Create the Netlify site

1. Log into app.netlify.com (same account that hosts cristinasheart.netlify.app).
2. **Add new site → Import an existing project → GitHub** → pick `cristinas-heart`.
3. Netlify reads `netlify.toml` automatically — build command `npm run build`,
   publish folder `dist`, functions folder `netlify/functions`. Just click **Deploy**.

The site will build and go live in demo mode (built-in prayers, browser voices).

## Step 3 — Connect the database (Supabase, free)

1. Log into supabase.com and create a new project called `cristinas-heart`
   (set a strong database password and save it).
2. In the project: **Project Settings → Database → Connection string**, choose the
   **Transaction pooler** URI (it looks like
   `postgresql://postgres.xxxx:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres`).
3. Replace `[PASSWORD]` with your database password.
4. In Netlify: **Site configuration → Environment variables → Add a variable**
   - Key: `DATABASE_URL`, Value: that connection string.

The candles table is created automatically the first time someone lights a candle.
(Any Postgres works here — Neon, Railway, etc. — Supabase is just what we're using.)

## Step 4 — Add your API keys

In the same Environment variables screen, add:

- `DEEPSEEK_API_KEY` — from platform.deepseek.com → API Keys. This powers prayer
  generation (default model: `deepseek-chat`; set `LLM_MODEL` to pin a specific one,
  e.g. a V4 Flash alias, per api-docs.deepseek.com).
- `ELEVENLABS_API_KEY` — from elevenlabs.io → Profile → API keys.

Prefer OpenAI instead? Set `OPENAI_API_KEY` (from platform.openai.com) and simply
don't set `DEEPSEEK_API_KEY` — the app uses DeepSeek when present, otherwise OpenAI.
You can switch providers anytime by adding/removing these variables — no code changes.

Then **Deploys → Trigger deploy → Deploy site** so the new variables take effect.

## Step 5 — Verify

- Request a prayer → you should get a unique, faith-appropriate AI prayer.
- Press **Listen** → you should hear an ElevenLabs voice (each of the six voices sounds distinct).
- Light a candle → refresh the page → your candle should still be burning (that means the database is connected).

## Optional: custom domain

Netlify → Domain management → Add a domain, e.g. `pray.cristinasheart.org`.

## Optional: carry over prayers from the old Replit app

Your old app's production database stores past prayer requests. If you ever want them
migrated into Neon, that's a small one-time export/import — happy to help with it.

## Costs to expect

- Netlify free tier: fine for this traffic.
- Neon free tier: fine.
- OpenAI: fractions of a cent per prayer.
- ElevenLabs: the free tier includes ~10k characters/month; a typical prayer is ~400 characters.
