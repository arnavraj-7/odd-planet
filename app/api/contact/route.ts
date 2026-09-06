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

  // TODO: deliver the brief — transactional email, CRM webhook or a
  // Marketplace integration. Until one is wired up the submission is only
  // recorded in the function log.
  console.info("[contact] brief received", {
    name: brief.name,
    email: brief.email,
    length: brief.message.length,
  });

  return NextResponse.json({ ok: true });
}
