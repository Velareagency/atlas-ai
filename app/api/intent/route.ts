import { NextResponse } from "next/server";
import { INTENT_SCHEMA } from "@/lib/intentSchema";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    // 1. Build Atlas system prompt
    const systemPrompt = `
You are Atlas, an AI automation engine built for B2B operations.

Your job is to convert messy business input into structured, executable intent.

Follow this exact schema:
${JSON.stringify(INTENT_SCHEMA, null, 2)}

Rules:
- Output ONLY valid JSON
- No explanations
- Do not invent information
- If unclear, classify as "info"
- Default urgency to "medium"
`;

    // 2. Call AI (TEMP MOCK — real call next)
    const aiResponse = {
      items: [
        {
          type: "info",
          text: "AI call not wired yet",
          urgency: "medium",
          confidence: 0.5,
        },
      ],
    };

    // 3. Return structured response
    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Atlas processing failed" },
      { status: 500 }
    );
  }
}
