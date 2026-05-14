import type { APIRoute } from "astro";

export const prerender = false;

interface ContactPayload {
  lineId?: string;
  lineName?: string;
  realName?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }

  if (body.website) {
    // honeypot — bot detected, silently OK
    return json({ ok: true });
  }

  if (!body.lineId || !body.lineName || !body.realName || !body.email) {
    return new Response("Missing required fields", { status: 400 });
  }

  const LINE_CHANNEL_ACCESS_TOKEN = import.meta.env.LINE_CHANNEL_ACCESS_TOKEN;
  const LINE_TO_USER_ID = import.meta.env.LINE_TO_USER_ID;

  // No LINE configured — log to console (dev fallback)
  if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_TO_USER_ID) {
    console.log("[contact form] Submission (LINE not configured):", body);
    return json({
      ok: true,
      note: "Logged to console — set LINE_CHANNEL_ACCESS_TOKEN + LINE_TO_USER_ID to enable LINE notifications.",
    });
  }

  const lines = [
    "📩 新的合作諮詢",
    "—",
    `姓名：${body.realName}`,
    `LINE 名稱：${body.lineName}`,
    `LINE ID：${body.lineId}`,
    `Email：${body.email}`,
  ];
  if (body.message) {
    lines.push("", `訊息：${body.message}`);
  }

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: LINE_TO_USER_ID,
      messages: [{ type: "text", text: lines.join("\n") }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[contact form] LINE push error:", text);
    return new Response("Push failed", { status: 500 });
  }

  return json({ ok: true });
};

function json(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
