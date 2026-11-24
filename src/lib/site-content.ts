// Admin-editable content stored in Supabase table `site_content` (public read, owner write).
import { z } from "zod";
import { sb, sbConfigured } from "./supabase-rest";
import type { Overrides } from "./pricing-overrides";

export const CONTENT_TAG = "site-content";

export const offerSchema = z.object({
  enabled: z.boolean(),
  text: z.string().trim().max(160),
  ctaLabel: z.string().trim().max(30).optional().default(""),
  ctaHref: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === "" || v.startsWith("/") || /^https:\/\//.test(v), "Link must start with / or https://")
    .optional()
    .default(""),
  endsOn: z.string().trim().regex(/^(\d{4}-\d{2}-\d{2})?$/, "Use a date like 2026-12-31").optional().default(""),
});
export type Offer = z.infer<typeof offerSchema>;

export const pricingSchema = z.record(z.string().max(80), z.string().trim().min(1).max(120));

export type SiteContent = { pricing: Overrides; offer: Offer | null };
const EMPTY: SiteContent = { pricing: {}, offer: null };

export async function getContent(fresh = false): Promise<SiteContent> {
  if (!sbConfigured()) return EMPTY;
  try {
    const res = await sb("/rest/v1/site_content?select=key,value", fresh ? {} : { next: { revalidate: 60, tags: [CONTENT_TAG] } });
    if (!res.ok) return EMPTY;
    const rows = (await res.json()) as { key: string; value: unknown }[];
    const out: SiteContent = { pricing: {}, offer: null };
    for (const r of rows) {
      if (r.key === "pricing") {
        const p = pricingSchema.safeParse(r.value);
        if (p.success) out.pricing = p.data;
      } else if (r.key === "offer") {
        const o = offerSchema.safeParse(r.value);
        if (o.success) out.offer = o.data;
      }
    }
    return out;
  } catch {
    return EMPTY;
  }
}

export const todayIST = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
export const offerIsLive = (o: Offer | null): o is Offer => !!o && o.enabled && o.text.length > 0 && (!o.endsOn || todayIST() <= o.endsOn);
