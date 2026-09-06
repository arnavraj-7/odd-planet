import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Brief = { name: string; email: string; message: string };

function parse(body: unknown): Brief | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) return null;
  if (typeof email !== "string" || !EMAIL.test(email.trim())) return null;
  if (typeof message !== "string" || message.trim().length < 20) return null;

  return {
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 320),
    message: message.trim().slice(0, 5000),
  };
}

/**
 * Appends the brief to the Google Sheet behind an Apps Script Web App.
 * See docs/google-sheet-webhook.md for the script and how to deploy it.
 */
async function sendToSheet(brief: Brief) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return { delivered: false, reason: "not configured" as const };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...brief,
      token: process.env.SHEETS_WEBHOOK_TOKEN ?? "",
      receivedAt: new Date().toISOString(),
      source: "oddplanet.in",
    }),
    // Apps Script answers from a different host than the /exec URL.
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`sheet webhook responded ${response.status}`);
  }

  // Apps Script returns 200 with a JSON body even for its own failures.
  const text = await response.text();
  if (text.includes('"ok":false')) {
    throw new Error(`sheet webhook rejected the row: ${text.slice(0, 200)}`);
  }

  return { delivered: true, reason: null };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const brief = parse(payload);
  if (!brief) {
    return NextResponse.json(
      { error: "Please check the fields and try again." },
      { status: 422 },
    );
  }

  try {
    const result = await sendToSheet(brief);

    if (!result.delivered) {
      // No webhook configured yet — keep local development working, but never
      // report success for a brief that was not actually recorded anywhere.
      console.warn("[contact] SHEETS_WEBHOOK_URL is not set; brief not stored", {
        email: brief.email,
      });
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (error) {
    console.error("[contact] could not record the brief", error);
    return NextResponse.json(
      { error: "We could not record your brief. Please email us instead." },
      { status: 502 },
    );
  }
}
