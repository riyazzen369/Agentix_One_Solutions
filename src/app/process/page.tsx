import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { LeadButton } from "@/components/LeadModal";
import { buttonClass } from "@/components/Button";

export const metadata: Metadata = pageMeta({
  title: "Our Process — From Free AI Growth Call to Launch",
  description: "How Agentix One Solution works: free AI growth call, AI opportunity audit, written scope and SOW, build and integration, then launch, training and optimization.",
  path: "/process",
});

const principles = [
  { t: "Scope before code", d: "Nothing gets built until deliverables, timeline, price and revision limits are agreed in writing." },
  { t: "Your tools first", d: "We integrate with the CRM, sheets and channels you already use wherever practical, instead of forcing new software." },
  { t: "Human in the loop", d: "AI handles the repetitive work; your team stays in control of decisions that affect customers." },
  { t: "You own what you pay for", d: "Ownership of custom deliverables is defined in the SOW and transfers on full payment." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader eyebrow="Process" title="How we work" text="Five clear steps. You always know what’s happening, what’s next, and what it costs.">
        <LeadButton className={buttonClass("primary")}>Start with a free AI growth call</LeadButton>
      </PageHeader>
      <section className="container py-16 sm:py-20" aria-label="Process steps">
        <ProcessSteps detailed />
      </section>
      <section aria-labelledby="principles" className="border-y-2 border-ink bg-alabaster">
        <div className="container py-16 sm:py-20">
          <SectionHeading id="principles" eyebrow="Principles" title="What you can expect" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.t} data-reveal className="rounded-brut border-2 border-ink bg-white p-6">
                <h3 className="text-xl">{p.t}</h3>
                <p className="mt-2 text-[15px] text-ink/80">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
