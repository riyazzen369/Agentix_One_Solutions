"use client";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SaveBar } from "./SaveBar";

type Item = { id: string; group: string; label: string; def: string };

export function PricingEditor({ items, initial }: { items: Item[]; initial: Record<string, string> }) {
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(items.map((i) => [i.id, initial[i.id] ?? i.def])));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const groups = useMemo(() => [...new Set(items.map((i) => i.group))], [items]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(""); setError("");
    try {
      const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "pricing", value: vals }) });
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 401) { window.location.href = "/admin/login"; return; }
      if (!res.ok) throw new Error(j.error || "Could not save.");
      setMsg("Saved. The website shows the new prices within a few seconds.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} noValidate>
      <p className="mb-6 text-[15px] text-ink/80">Type prices exactly as visitors should see them, for example <code className="rounded bg-lemon px-1">₹9,999</code> or <code className="rounded bg-lemon px-1">₹12,249 setup + ₹4,899/month</code>. Use the reset arrow to go back to the original price. GST and third-party costs are explained in the pricing notes on the site.</p>
      {groups.map((g) => (
        <fieldset key={g} className="mb-6 rounded-brut border-2 border-ink bg-white p-4 sm:p-5">
          <legend className="px-2 font-display text-lg font-bold">{g}</legend>
          <div className="space-y-3">
            {items.filter((i) => i.group === g).map((i) => {
              const changed = vals[i.id] !== i.def;
              return (
                <div key={i.id} className="grid gap-1.5 sm:grid-cols-[1fr_minmax(0,26rem)_44px] sm:items-center sm:gap-3">
                  <label htmlFor={i.id} className="text-[15px] font-semibold">
                    {i.label}
                    {changed && <span className="ml-2 rounded-full border border-ink bg-mint px-2 py-0.5 text-[11px] font-bold uppercase">Changed</span>}
                  </label>
                  <input id={i.id} className="field" value={vals[i.id]} maxLength={120} onChange={(e) => setVals((v) => ({ ...v, [i.id]: e.target.value }))} />
                  <button type="button" aria-label={`Reset ${i.label} to ${i.def}`} title={`Reset to ${i.def}`} disabled={!changed} onClick={() => setVals((v) => ({ ...v, [i.id]: i.def }))} className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink bg-alabaster hover:bg-mint disabled:opacity-30">
                    <RotateCcw aria-hidden className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
      <SaveBar busy={busy} msg={msg} error={error} label="Save prices" />
    </form>
  );
}
