"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { buttonClass } from "../Button";

export function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) });
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(j.error || "Could not sign in.");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold">Email</label>
        <input id="admin-email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold">Password</label>
        <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {error && <p role="alert" className="rounded-lg border-2 border-ink bg-alabaster p-3 text-sm font-medium text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className={buttonClass("primary", "w-full disabled:opacity-70")}>
        {busy ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
