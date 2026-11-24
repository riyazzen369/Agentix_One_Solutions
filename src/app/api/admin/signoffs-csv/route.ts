import { NextResponse } from "next/server";
import { adminToken } from "@/lib/admin-auth";
import { fetchSignoffs, signoffsToCsv } from "@/lib/signoffs-admin";

export async function GET() {
  const token = await adminToken();
  if (!token) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const rows = await fetchSignoffs(token, 20000);
  if (!rows) return NextResponse.json({ error: "Could not load sign-offs." }, { status: 502 });
  const day = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  return new NextResponse(signoffsToCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agentix-signoffs-${day}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
