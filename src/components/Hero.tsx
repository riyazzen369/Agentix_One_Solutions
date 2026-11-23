import { trustRow } from "@/content/site";
import { Button, buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";
import { HeroCenterpiece } from "./HeroCenterpiece";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="dots relative overflow-hidden border-b-2 border-ink">
      <div className="container grid min-h-[calc(100svh-72px)] items-center gap-[clamp(2.5rem,5vw,4rem)] py-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow inline-block rounded-full border-2 border-ink bg-alabaster px-3 py-1.5">AI Agency • Freelancing • Automation</p>
          <h1 className="mt-6 text-[clamp(2.9rem,6.4vw+0.6rem,5.75rem)] uppercase leading-[0.92]">
            Your business, running <span className="relative inline-block whitespace-nowrap"><span aria-hidden className="absolute inset-x-[-0.06em] bottom-[0.06em] h-[0.3em] bg-lavender" /><span className="relative">on AI.</span></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/85 sm:text-xl [text-wrap:pretty]">
            Agentix One Solution builds websites, apps, AI chatbots, workflow automations, and outreach systems that save time, capture leads, and grow revenue.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LeadButton className={buttonClass("primary")}>
              Get a free AI growth plan <ArrowRight aria-hidden className="h-4 w-4" />
            </LeadButton>
            <Button href="/services" variant="secondary">View services</Button>
          </div>
          <ul aria-label="What we build" className="mt-10 flex flex-wrap gap-x-2 gap-y-2 text-sm font-semibold">
            {trustRow.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-ink/40">•</span>}
                {t}
              </li>
            ))}
          </ul>
        </div>
        <HeroCenterpiece />
      </div>
    </section>
  );
}
