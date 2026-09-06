import { NextResponse } from "next/server";

import { ADMIN_COOKIE, matchesAdminPassword } from "@/lib/admin-auth";

/** Slows down guessing without needing any shared state. */
const DELAY_MS = 400;

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  await new Promise((r) => setTimeout(r, DELAY_MS));

  const origin = new URL(request.url).origin;

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(`${origin}/admin?error=unset`, { status: 303 });
  }

  if (!matchesAdminPassword(password)) {
    return NextResponse.redirect(`${origin}/admin?error=1`, { status: 303 });
  }

  const response = NextResponse.redirect(`${origin}/admin`, { status: 303 });
  response.cookies.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
