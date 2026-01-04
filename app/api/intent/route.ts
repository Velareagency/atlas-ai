import { NextResponse } from "next/server";
import { INTENT_SCHEMA } from "@/lib/intentSchema";

export async function POST(req: Request) {
  const { text } = await req.json();

  return NextResponse.json({
    status: "Atlas API online",
    input: text,
    schema: INTENT_SCHEMA,
  });
}
