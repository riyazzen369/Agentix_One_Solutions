import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { normalizePhone, signoffSchema } from "@/lib/signoff-schema";
import { AGREEMENT_HASH, AGREEMENT_VERSION, PROVIDER } from "@/content/signoff";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX;
}

function makeRef() {
  const ist = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
  return `AGX-${ist}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type SignRecord = { ref: string; signedAt: string; fullName: string; whatsapp: string; addressOrPlace: string; userAgent: string };

// Insert-only: the publishable key cannot read, change or delete rows (enforced by row-level security).
async function saveToSupabase(r: SignRecord): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/client_signoffs`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        ref: r.ref,
        created_at: r.signedAt,
        full_name: r.fullName,
        whatsapp: r.whatsapp,
        address_or_place: r.addressOrPlace,
        accepted_msa: true,
        accepted_sow: true,
        accepted_dpa: true,
        accepted_terms: true,
        method: "typed-name",
        agreement_version: AGREEMENT_VERSION,
        agreement_hash: AGREEMENT_HASH,
        user_agent: r.userAgent.slice(0, 400),
      }),
    });
    if (!res.ok) console.error("[signoff] Supabase error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[signoff] Supabase request failed", e);
    return false;
  }
}

async function emailOwner(r: SignRecord): Promise<boolean> {
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return false;
  const rows: [string, string][] = [
    ["Reference", r.ref],
    ["Signed at (IST)", new Date(r.signedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "medium" })],
    ["Name", r.fullName],
    ["WhatsApp", r.whatsapp],
    ["Business address / place", r.addressOrPlace],
    ["Accepted", "Master Service Agreement; Statement of Work; Data & Platform Compliance Acknowledgement; terms and sign"],
    ["Signature method", "typed name"],
    ["Agreement version", AGREEMENT_VERSION],
    ["Agreement hash", AGREEMENT_HASH],
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `Client sign-off: ${r.fullName} (${r.ref})`,
        html: `<h2>New client sign-off — ${esc(PROVIDER.trading)}</h2><table cellpadding="6">${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`).join("")}</table>`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      }),
    });
    if (!res.ok) console.error("[signoff] Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[signoff] Resend request failed", e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return fail("Too many attempts. Please try again in a few minutes.", 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  const parsed = signoffSchema.safeParse(body);
  if (!parsed.success) return fail("Please check the form fields and tick all four boxes.");

  const { website, startedAt, fullName, whatsapp, addressOrPlace } = parsed.data;
  const record: SignRecord = {
    ref: makeRef(),
    signedAt: new Date().toISOString(),
    fullName,
    whatsapp: normalizePhone(whatsapp),
    addressOrPlace,
    userAgent: req.headers.get("user-agent") ?? "",
  };

  // Bots: pretend success without storing anything.
  const tooFast = startedAt && Date.now() - Number(startedAt) < 3000;
  if (website || tooFast) return NextResponse.json({ ref: record.ref, signedAt: record.signedAt, version: AGREEMENT_VERSION });

  const configured = !!(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY) || !!process.env.RESEND_API_KEY;
  if (!configured && process.env.NODE_ENV !== "production") {
    console.info("[signoff] No storage configured — sign-off received:", record);
    return NextResponse.json({ ref: record.ref, signedAt: record.signedAt, version: AGREEMENT_VERSION });
  }

  const [saved, emailed] = await Promise.all([saveToSupabase(record), emailOwner(record)]);
  if (!saved && !emailed) {
    console.error("[signoff] Could not store or email the sign-off", record.ref);
    return fail("We couldn’t record your sign-off right now. Please message us on WhatsApp and we’ll record it for you.", 502);
  }
  if (!saved) console.error("[signoff] Stored by email only (database save failed)", record.ref);
  return NextResponse.json({ ref: record.ref, signedAt: record.signedAt, version: AGREEMENT_VERSION });
}
