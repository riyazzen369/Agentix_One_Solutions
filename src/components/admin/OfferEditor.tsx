"use client";
import { useState } from "react";
import type { Offer } from "@/lib/site-content";
import { SaveBar } from "./SaveBar";

export function OfferEditor({ initial }: { initial: Offer }) {
  const [o, setO] = useState<Offer>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  const expired = !!o.endsOn && o.endsOn < today;
  const set = <K extends keyof Offer>(k: K, v: Offer[K]) => setO((x) => ({ ...x, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(""); setError("");
    try {
      const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "offer", value: o }) });
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 401) { window.location.href = "/admin/login"; return; }
      if (!res.ok) throw new Error(j.error || "Could not save.");
      setMsg(o.enabled ? "Saved. The offer banner is live on every page." : "Saved. The offer banner is switched off.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} noValidate className="space-y-5">
      <label className="flex min-h-[44px] cursor-pointer items-center gap-3 font-semibold">
        <input type="checkbox" className="h-5 w-5 accent-ink" checked={o.enabled} onChange={(e) => set("enabled", e.target.checked)} />
        Show the offer banner at the top of every page
      </label>
      <div>
        <label htmlFor="offer-text" className="mb-1.5 block text-sm font-semibold">Offer message <span className="font-normal text-slate">({o.text.length}/160)</span></label>
        <input id="offer-text" className="field" maxLength={160} value={o.text} onChange={(e) => set("text", e.target.value)} placeholder="e.g. Festival offer: 10% off Plan B until 31 December" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-cta" className="mb-1.5 block text-sm font-semibold">Button text (optional)</label>
          <input id="offer-cta" className="field" maxLength={30} value={o.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} placeholder="See plans" />
        </div>
        <div>
          <label htmlFor="offer-href" className="mb-1.5 block text-sm font-semibold">Button link (optional)</label>
          <input id="offer-href" className="field" maxLength={200} value={o.ctaHref} onChange={(e) => set("ctaHref", e.target.value)} placeholder="/pricing or https://…" />
        </div>
      </div>
      <div>
        <label htmlFor="offer-ends" className="mb-1.5 block text-sm font-semibold">Ends on (optional)</label>
        <input id="offer-ends" type="date" className="field max-w-xs" value={o.endsOn} onChange={(e) => set("endsOn", e.target.value)} />
        <p className="mt-1 text-xs text-slate">The banner hides itself after this date (India time).</p>
        {expired && o.enabled && <p role="alert" className="mt-2 rounded-lg border-2 border-ink bg-lemon p-2 text-sm font-semibold">This date has already passed, so the banner will stay hidden. Choose a later date or clear it.</p>}
      </div>
      {o.text && (
        <div>
          <p className="mb-1.5 text-sm font-semibold">Preview</p>
          <div className="rounded-lg bg-ink px-3 py-2 text-center text-sm font-semibold text-lemon">
            {o.text} {o.ctaLabel && o.ctaHref ? <span className="ml-2 rounded-lg border-2 border-lemon px-2 py-0.5 text-xs font-bold uppercase">{o.ctaLabel}</span> : null}
          </div>
        </div>
      )}
      <SaveBar busy={busy} msg={msg} error={error} label="Save offer" />
    </form>
  );
}
