import { Plus } from "lucide-react";
import type { Faq } from "@/content/site";

export function FAQ({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y-2 divide-ink overflow-hidden rounded-brut border-2 border-ink bg-alabaster shadow-brut">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-bold hover:bg-mint/40 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus aria-hidden className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <p className="px-5 pb-5 text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
