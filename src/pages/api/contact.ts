import type { APIRoute } from "astro";

export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
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

  // Honeypot — bots fill hidden fields
  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body.name || !body.email || !body.message) {
    return new Response("Missing required fields", { status: 400 });
  }

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  const TO_EMAIL = import.meta.env.CONTACT_TO_EMAIL;
  const FROM_EMAIL = import.meta.env.CONTACT_FROM_EMAIL;

  if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
    console.log("[contact form] Submission (Resend not configured):", body);
    return new Response(
      JSON.stringify({
        ok: true,
        note: "Logged to console — set RESEND_API_KEY to enable email delivery.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  const subject = `[作品集詢問] ${body.projectType || "未分類"} — ${body.name}`;
  const html = `
    <div style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1A1815;">
      <h2 style="font-family: Georgia, serif; font-weight: 400;">新的合作諮詢</h2>
      <table style="border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 16px 8px 0; color: #6B655B;">姓名</td><td>${escapeHtml(body.name)}</td></tr>
        <tr><td style="padding: 8px 16px 8px 0; color: #6B655B;">Email</td><td><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
        <tr><td style="padding: 8px 16px 8px 0; color: #6B655B;">專案類型</td><td>${escapeHtml(body.projectType || "—")}</td></tr>
        <tr><td style="padding: 8px 16px 8px 0; color: #6B655B;">預算</td><td>${escapeHtml(body.budget || "—")}</td></tr>
        <tr><td style="padding: 8px 16px 8px 0; color: #6B655B;">時程</td><td>${escapeHtml(body.timeline || "—")}</td></tr>
      </table>
      <h3 style="margin-top: 24px; font-family: Georgia, serif; font-weight: 400;">需求描述</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(body.message)}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: body.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[contact form] Resend error:", text);
    return new Response("Email send failed", { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
