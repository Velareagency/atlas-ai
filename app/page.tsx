"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    const res = await fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setResult(await res.json());
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Atlas AI</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <button onClick={analyze}>Analyze</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
