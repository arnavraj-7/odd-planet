import "server-only";

import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "op_admin";

/** Constant-time compare, so the check cannot be probed a character at a time. */
export function matchesAdminPassword(candidate: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminSignedIn(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return typeof value === "string" && matchesAdminPassword(value);
}
