import { generateSpeech, VOICES } from "../../api-lib/prayer-core.mjs";

export default async (req) => {
  if (req.method === "GET") {
    return Response.json({ voices: VOICES });
  }
  if (req.method !== "POST") {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }
  try {
    const { text, voiceId } = await req.json();
    if (!text) {
      return Response.json({ message: "Text is required" }, { status: 400 });
    }
    const audio = await generateSpeech({ text: String(text).slice(0, 5000), voiceId });
    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    if (error.code === "TTS_NOT_CONFIGURED") {
      return Response.json({ message: "TTS_NOT_CONFIGURED" }, { status: 503 });
    }
    console.error("Error generating speech:", error);
    return Response.json({ message: "Failed to generate speech" }, { status: 500 });
  }
};

export const config = { path: "/api/tts" };
