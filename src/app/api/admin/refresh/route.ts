import { NextResponse, type NextRequest } from "next/server";
import { RT, clearSession, refreshTokens, setSession } from "@/lib/admin-auth";

// Called by the admin page when the 1-hour access token has expired but the refresh cookie remains.
export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next");
  const dest = new URL(next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin", req.nextUrl.origin);
  const rt = req.cookies.get(RT)?.value;
  const tokens = rt ? await refreshTokens(rt) : null;
  if (!tokens) {
    const res = NextResponse.redirect(new URL("/admin/login", req.nextUrl.origin));
    clearSession(res);
    return res;
  }
  const res = NextResponse.redirect(dest);
  setSession(res, tokens);
  return res;
}
