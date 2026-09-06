import { NextResponse } from "next/server";

import { ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const response = NextResponse.redirect(`${origin}/admin`, { status: 303 });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
