import { Loader2 } from "lucide-react";
import { buttonClass } from "../Button";

export function SaveBar({ busy, msg, error, label = "Save changes" }: { busy: boolean; msg: string; error: string; label?: string }) {
  return (
    <div className="sticky bottom-3 z-10 mt-6 flex flex-wrap items-center gap-3 rounded-brut border-2 border-ink bg-alabaster p-3 shadow-brut-sm">
      <button type="submit" disabled={busy} className={buttonClass("primary", "min-h-[44px] px-5 py-2 disabled:opacity-70")}>
        {busy ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        {busy ? "Saving…" : label}
      </button>
      <p role="status" aria-live="polite" className={error ? "text-sm font-semibold text-red-700" : "text-sm font-semibold"}>{error || msg}</p>
    </div>
  );
}
