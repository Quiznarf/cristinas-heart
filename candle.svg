import { generatePrayer } from "../../api-lib/prayer-core.mjs";

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }
  try {
    const body = await req.json();
    const { faith, language, request } = body || {};
    if (!request || typeof request !== "string" || request.trim().length < 3) {
      return Response.json(
        { message: "Please share what's in your heart so we can pray with you." },
        { status: 400 }
      );
    }
    const result = await generatePrayer({
      faith: String(faith || "non-denominational"),
      language: String(language || "english"),
      request: request.trim().slice(0, 2000),
    });
    return Response.json(result);
  } catch (error) {
    console.error("Error generating prayer:", error);
    return Response.json(
      { message: "An error occurred while generating your prayer. Please try again." },
      { status: 500 }
    );
  }
};

export const config = { path: "/api/prayer" };
