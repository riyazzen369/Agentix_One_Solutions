import { NextResponse, type NextRequest } from "next/server";
import { leadSchemaChecked, type Lead } from "@/lib/lead-schema";
import { formOptions } from "@/content/site";

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

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Plain-text rows shared by the text and HTML versions of the email. */
function rows(lead: Lead): [string, string][] {
  const spend = lead.firstTime
    ? "First time — has not paid for these services before"
    : lead.previousSpend.map((p) => `${p.service}: ${inr(p.amount)}`).join("\n") + `\nTotal: ${inr(lead.previousSpend.reduce((t, p) => t + p.amount, 0))}`;
  return [
    ["Name", lead.name], ["Business", lead.businessName], ["WhatsApp", lead.whatsapp], ["Email", lead.email],
    ["Business type", lead.businessType], ["Service needed", lead.service], ["Preferred call type", lead.callType],
    ["Previous spend", spend], ["Message", lead.message],
  ];
}

/** Plain HTML form posts (no JavaScript) cannot send nested data, so rebuild it from flat fields. */
function fromFormData(fd: FormData) {
  const flat: Record<string, unknown> = Object.fromEntries(fd);
  const used = fd.getAll("used").map(String);
  flat.previousSpend = used.map((service) => ({ service, amount: Number(String(fd.get(`amount:${service}`) ?? "0").replace(/\D/g, "")) || 0 }));
  flat.firstTime = fd.get("firstTime") === "on" || fd.get("firstTime") === "true";
  return flat;
}

async function deliver(lead: Lead) {
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email not configured — lead received:\n" + rows(lead).map(([l, v]) => `${l}: ${v}`).join("\n"));
      return true;
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing");
    return false;
  }
  const html = `<h2>New call request</h2><table cellpadding="6">${rows(lead)
    .map(([l, v]) => `<tr><td valign="top"><strong>${l}</strong></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New lead: ${lead.businessName} — ${lead.service} (${lead.callType})`,
      html,
      text: rows(lead).map(([l, v]) => `${l}: ${v}`).join("\n"),
    }),
  });
  if (!res.ok) console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

export async function POST(req: NextRequest) {
  const isForm = !req.headers.get("content-type")?.includes("application/json");
  const reply = (ok: boolean, error?: string, status = 400) =>
    isForm
      ? NextResponse.redirect(new URL(`/contact/thank-you${ok ? "" : "?status=error"}`, req.nextUrl.origin), 303)
      : NextResponse.json(ok ? { ok: true } : { error }, { status: ok ? 200 : status });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return reply(false, "Too many requests. Please try again in a few minutes.", 429);

  let body: unknown;
  try {
    body = isForm ? fromFormData(await req.formData()) : await req.json();
  } catch {
    return reply(false, "Invalid request.");
  }

  const parsed = leadSchemaChecked.safeParse(body);
  if (!parsed.success) return reply(false, "Please check the form fields and try again.");
  const known = new Set(formOptions.pastServices);
  if (!formOptions.callTypes.includes(parsed.data.callType) || parsed.data.previousSpend.some((p) => !known.has(p.service)) || new Set(parsed.data.previousSpend.map((p) => p.service)).size !== parsed.data.previousSpend.length)
    return reply(false, "Please check the form fields and try again.");

  const { website, startedAt, ...lead } = parsed.data;
  const tooFast = startedAt && Date.now() - Number(startedAt) < 3000;
  if (website || tooFast) return reply(true); // silently drop bots

  const ok = await deliver(lead).catch((e) => {
    console.error("[contact]", e);
    return false;
  });
  return ok ? reply(true) : reply(false, "We couldn’t send your request right now. Please try WhatsApp or email instead.", 502);
}
