import { listCandles, addCandle } from "../../api-lib/prayer-core.mjs";

export default async (req) => {
  try {
    if (req.method === "GET") {
      const candles = await listCandles();
      return Response.json({ candles });
    }
    if (req.method === "POST") {
      const body = await req.json();
      const candle = await addCandle(body || {});
      return Response.json({ candle }, { status: 201 });
    }
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Candle error:", error);
    return Response.json({ message: "Could not reach the candle wall" }, { status: 500 });
  }
};

export const config = { path: "/api/candles" };
