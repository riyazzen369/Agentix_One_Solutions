import { NextResponse, type NextRequest } from "next/server";
import { AT, clearSession, revokeSession, sameOrigin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  await revokeSession(req.cookies.get(AT)?.value);
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}
