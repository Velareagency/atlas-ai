import { NextResponse } from "next/server";
import OpenAI from "openai";
import { INTENT_SCHEMA } from "@/lib/intentSchema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are Atlas, an AI automation engine built for B2B operations.

Your job is to convert messy business input into structured, executable intent.

Follow this exact JSON schema:
${JSON.stringify(INTENT_SCHEMA, null, 2)}

Rules:
- Output ONLY valid JSON
- No explanations
- Do not invent information
- If intent is unclear, classify as "info"
- Default urgency to "medium"
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    const output = completion.choices[0].message.content;

    if (!output) {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(output);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Atlas error:", err);
    return NextResponse.json(
      { error: "Atlas failed to process input" },
      { status: 500 }
    );
  }
}
