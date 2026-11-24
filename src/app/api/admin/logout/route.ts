import { NextResponse, type NextRequest } from "next/server";
import { clearSession, sameOrigin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}
