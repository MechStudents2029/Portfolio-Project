import { buildSystemPrompt } from "../../../lib/projects";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "Server is missing ANTHROPIC_API_KEY — add it in Vercel env vars and redeploy." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        system: buildSystemPrompt(),
        messages: messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", errText);
      return Response.json(
        { reply: "The AI backend hit an error. Check server logs." },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply = data.content?.map((c) => c.text || "").join("") || "";

    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json({ reply: "Something broke on the server." }, { status: 500 });
  }
}
