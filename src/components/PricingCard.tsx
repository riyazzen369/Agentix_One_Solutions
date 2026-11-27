import { Check } from "lucide-react";
import type { Plan } from "@/content/pricing";
import { PRICE_NOTE } from "@/content/site";
import { buttonClass } from "./Button";
import { Badge } from "./Badge";
import { LeadButton } from "./LeadModal";
import { cn } from "@/lib/cn";

export function PricingCard({ plan, service }: { plan: Plan; service?: string }) {
  return (
    <article data-reveal className={cn("card card-hover relative flex flex-col p-6 sm:p-8", plan.featured && "border-[3px] bg-white lg:-translate-y-3 lg:hover:-translate-y-4")}>
      {plan.featured && <Badge tone="lavender" className="absolute -top-4 left-6">Recommended</Badge>}
      <h3 className="text-2xl">{plan.name}</h3>
      <p className="mt-5 flex items-baseline gap-2">
        {plan.unit === "starting at" && <span className="text-sm font-semibold text-slate">Starting at</span>}
        <span className="font-display text-5xl font-bold tracking-tight">{plan.price}</span>
        {plan.unit !== "starting at" && <span className="text-sm font-semibold text-slate">{plan.unit}</span>}
      </p>
      {plan.reference && <p className="mt-2 text-sm text-slate">{plan.reference}</p>}
      <p className="mt-3 text-xs font-medium text-slate">{PRICE_NOTE}</p>
      <ul className="mt-6 flex-1 space-y-2.5 border-t-2 border-ink pt-6">
        {plan.features.map((f, i) => (
          <li key={`${i}-${f}`} className="flex gap-2.5 text-[15px]">
            <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-ink bg-mint p-0.5" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>
      {plan.note && <p className="mt-5 rounded-lg border-2 border-dashed border-ink p-3 text-sm">{plan.note}</p>}
      <LeadButton service={service} className={buttonClass(plan.featured ? "primary" : "secondary", "mt-8 w-full")}>{plan.cta}</LeadButton>
    </article>
  );
}
