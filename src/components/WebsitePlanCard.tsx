import { Check } from "lucide-react";
import type { WebsitePlan } from "@/content/pricing";
import { websiteEstimateNote } from "@/content/pricing";
import { buttonClass } from "./Button";
import { Badge } from "./Badge";
import { LeadButton } from "./LeadModal";
import { cn } from "@/lib/cn";

export function WebsitePlanCard({ plan }: { plan: WebsitePlan }) {
  return (
    <article data-reveal className={cn("card card-hover relative flex flex-col p-6 sm:p-8", plan.featured && "border-[3px] bg-white lg:-translate-y-3 lg:hover:-translate-y-4")}>
      {plan.featured && <Badge tone="lavender" className="absolute -top-4 left-6">Recommended</Badge>}
      <p className="eyebrow text-slate">{plan.name}</p>
      <h3 className="mt-1 text-2xl">{plan.tag}</h3>
      <p className="mt-2 text-[15px] text-ink/80">{plan.audience}</p>
      <p className="mt-5 font-display text-5xl font-bold tracking-tight">{plan.price}</p>
      <p className="mt-1 text-xs font-medium text-slate">Package fee. Final quote depends on scope and complexity.</p>

      <h4 className="eyebrow mt-6 border-t-2 border-ink pt-5">Features &amp; inclusions</h4>
      <ul className="mt-3 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[15px]">
            <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-ink bg-mint p-0.5" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>

      <dl className="mt-6 flex-1 space-y-3 border-t-2 border-ink pt-5 text-[15px]">
        {plan.specs.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-slate">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-lg border-2 border-ink bg-lemon p-4">
        <p className="text-sm font-medium">Estimated total spend for a complete website</p>
        <p className="font-display text-2xl font-bold">{plan.estimate}</p>
        <p className="mt-1 text-xs">{websiteEstimateNote}</p>
      </div>

      <LeadButton service="Website & App Development" className={buttonClass(plan.featured ? "primary" : "secondary", "mt-6 w-full")}>{plan.cta}</LeadButton>
    </article>
  );
}
