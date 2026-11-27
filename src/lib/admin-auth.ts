// Admin session handling. The admin signs in with their Supabase Auth email + password; the
// tokens live only in httpOnly cookies. Database row-level security enforces owner-only access too.
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { sb } from "./supabase-rest";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").split(",")[0].trim().toLowerCase();
export const AT = "agx_at";
export const RT = "agx_rt";

type Tokens = { access_token: string; refresh_token: string; expires_in: number };

export type LoginResult = { tokens: Tokens } | { error: "invalid" | "unavailable" };

export async function passwordLogin(email: string, password: string): Promise<LoginResult> {
  const res = await sb("/auth/v1/token?grant_type=password", { method: "POST", body: { email, password } }).catch(() => null);
  if (!res || res.status >= 500) return { error: "unavailable" }; // network problem, or the Supabase project is paused
  if (!res.ok) return { error: "invalid" };
  const j = (await res.json()) as Tokens & { user?: { email?: string } };
  if (!j.access_token || j.user?.email?.toLowerCase() !== ADMIN_EMAIL) return { error: "invalid" };
  return { tokens: j };
}

/** Best effort: ends the session at Supabase so a copied refresh token stops working. */
export async function revokeSession(token: string | undefined) {
  if (!token) return;
  await sb("/auth/v1/logout", { method: "POST", token, timeoutMs: 3000 }).catch(() => null);
}

export async function refreshTokens(refreshToken: string): Promise<Tokens | null> {
  const res = await sb("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: refreshToken } }).catch(() => null);
  if (!res?.ok) return null;
  const j = (await res.json()) as Tokens & { user?: { email?: string } };
  return j.access_token && j.user?.email?.toLowerCase() === ADMIN_EMAIL ? j : null;
}

async function emailOf(token: string): Promise<string | null> {
  const res = await sb("/auth/v1/user", { token }).catch(() => null);
  if (!res?.ok) return null;
  return ((await res.json()) as { email?: string }).email?.toLowerCase() ?? null;
}

export function setSession(res: NextResponse, t: Tokens) {
  const base = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" };
  res.cookies.set(AT, t.access_token, { ...base, maxAge: Math.max(60, t.expires_in - 60) });
  res.cookies.set(RT, t.refresh_token, { ...base, maxAge: 60 * 60 * 24 * 7 });
}
export function clearSession(res: NextResponse) {
  res.cookies.set(AT, "", { path: "/", maxAge: 0 });
  res.cookies.set(RT, "", { path: "/", maxAge: 0 });
}

/** Returns the admin's access token if a valid owner session exists, otherwise null. */
export async function adminToken(): Promise<string | null> {
  const token = (await cookies()).get(AT)?.value;
  if (!token) return null;
  return (await emailOf(token)) === ADMIN_EMAIL ? token : null;
}

export async function hasRefreshCookie(): Promise<boolean> {
  return !!(await cookies()).get(RT)?.value;
}

/** Same-origin guard for state-changing requests (cookies are also SameSite=Strict). */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return req.headers.get("sec-fetch-site") !== "cross-site";
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
