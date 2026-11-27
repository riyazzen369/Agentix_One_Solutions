import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { ADMIN_EMAIL, passwordLogin, sameOrigin, setSession } from "@/lib/admin-auth";
import { sbConfigured } from "@/lib/supabase-rest";

const attempts = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 8;
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 2000) attempts.clear();
  return recent.length > MAX;
};

const schema = z.object({ email: z.string().trim().email().max(200), password: z.string().min(1).max(200) });

export async function POST(req: NextRequest) {
  const fail = (error: string, status = 401) => NextResponse.json({ error }, { status });
  if (!sameOrigin(req)) return fail("Not allowed.", 403);
  if (!sbConfigured() || !ADMIN_EMAIL) return fail("Admin is not configured yet.", 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return fail("Too many attempts. Please wait a few minutes.", 429);

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail("Enter your email and password.", 400);

  // Same message for a wrong email and a wrong password.
  if (parsed.data.email.toLowerCase() !== ADMIN_EMAIL) return fail("Wrong email or password.");
  const result = await passwordLogin(parsed.data.email, parsed.data.password);
  if ("error" in result) {
    return result.error === "unavailable" ? fail("The sign-in service is not reachable right now. Please try again in a minute.", 503) : fail("Wrong email or password.");
  }

  const res = NextResponse.json({ ok: true });
  setSession(res, result.tokens);
  return res;
}
