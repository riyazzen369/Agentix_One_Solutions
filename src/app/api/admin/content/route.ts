import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { adminToken, sameOrigin } from "@/lib/admin-auth";
import { CONTENT_TAG, offerSchema, pricingSchema } from "@/lib/site-content";
import { priceItems } from "@/lib/pricing-overrides";
import { sb } from "@/lib/supabase-rest";

const body = z.discriminatedUnion("key", [
  z.object({ key: z.literal("pricing"), value: pricingSchema }),
  z.object({ key: z.literal("offer"), value: offerSchema }),
]);

export async function PUT(req: NextRequest) {
  const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
  if (!sameOrigin(req)) return fail("Not allowed.", 403);
  const token = await adminToken();
  if (!token) return fail("Please sign in again.", 401);

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Please check the values.");

  let value: unknown = parsed.data.value;
  if (parsed.data.key === "pricing") {
    // Keep only known prices that differ from the defaults, so future default changes still apply.
    const defaults = new Map(priceItems().map((i) => [i.id, i.def]));
    const clean: Record<string, string> = {};
    for (const [id, v] of Object.entries(parsed.data.value)) {
      if (!defaults.has(id)) return fail(`Unknown price: ${id}`);
      if (v.trim() !== defaults.get(id)) clean[id] = v.trim();
    }
    value = clean;
  }

  const res = await sb("/rest/v1/site_content?on_conflict=key", {
    method: "POST",
    token,
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: [{ key: parsed.data.key, value, updated_at: new Date().toISOString() }],
  }).catch(() => null);
  if (!res?.ok) return fail("Could not save. Please try again.", 502);

  revalidateTag(CONTENT_TAG);
  for (const p of ["/", "/pricing", "/services", "/ai-automations"]) revalidatePath(p);
  return NextResponse.json({ ok: true });
}
