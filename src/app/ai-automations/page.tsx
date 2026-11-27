import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { automations, PRICE_NOTE } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Icon } from "@/components/Icon";
import { Badge } from "@/components/Badge";
import { LeadButton } from "@/components/LeadModal";
import { buttonClass } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { getContent } from "@/lib/site-content";
import { applyAutomations } from "@/lib/pricing-overrides";

export const metadata: Metadata = pageMeta({
  title: "AI Automations — Workflow, WhatsApp, LinkedIn & Payment Follow-Up",
  description: "Workflow automation agency in India: lead qualification, WhatsApp follow-ups, CRM and Sheets automation, appointment booking, payment follow-up automation, LinkedIn outreach and cold-call AI agents.",
  path: "/ai-automations",
});

export default async function AutomationsPage() {
  const { pricing } = await getContent();
  const list = applyAutomations(automations, pricing);
  return (
    <>
      <PageHeader eyebrow="AI Automations" title="Stop doing work a system can do" text="Ten automation use cases we build for growing businesses. Each one is mapped to your tools, tested before launch, and handed over with documentation.">
        <LeadButton className={buttonClass("primary")}>Get a free automation audit</LeadButton>
      </PageHeader>
      <div className="container grid gap-6 py-16 sm:py-20 lg:grid-cols-2">
        {list.map((a, i) => (
          <article key={a.title} data-reveal aria-labelledby={`auto-${i}`} className="cv-auto card card-hover flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-lemon"><Icon name={a.icon} className="h-6 w-6" /></span>
              <Badge tone="ink">{a.price}</Badge>
            </div>
            <h2 id={`auto-${i}`} className="mt-5 text-2xl sm:text-3xl">{a.title}</h2>
            <p className="mt-3"><strong>Problem:</strong> <span className="text-ink/80">{a.problem}</span></p>
            <h3 className="eyebrow mt-6">Automation flow</h3>
            <ol className="mt-3 space-y-1">
              {a.flow.map((f, j) => (
                <li key={f}>
                  <span className="flex items-center gap-3 rounded-lg border-2 border-ink bg-white px-3 py-2 text-[15px] font-medium">
                    <span aria-hidden className="h-3 w-3 shrink-0 rounded-full border-2 border-ink bg-lavender" />{f}
                  </span>
                  {j < a.flow.length - 1 && <ArrowDown aria-hidden className="mx-auto my-0.5 h-4 w-4 text-ink" />}
                </li>
              ))}
            </ol>
            <h3 className="eyebrow mt-6">Tools that may be used</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.tools.map((t, i) => <li key={`${i}-${t}`} className="rounded-full border-2 border-ink px-3 py-1 text-sm">{t}</li>)}
            </ul>
            <p className="mt-6 flex-1 rounded-lg bg-mint/25 p-3 text-[15px]"><strong>Expected outcome:</strong> {a.outcome}</p>
            <p className="mt-3 text-xs text-slate">{PRICE_NOTE} Outcomes are not guaranteed and depend on your data, offer and usage.</p>
            <LeadButton service={a.title} className={buttonClass("secondary", "mt-5 w-full")}>Get a custom quote</LeadButton>
          </article>
        ))}
      </div>
      <section className="container pb-4">
        <p className="card p-5 text-sm text-ink/80">
          <strong>Good to know:</strong> Tool names are examples of possible integrations; we pick tools based on your stack and budget. Third-party subscriptions and usage (API, WhatsApp Business API, SMS, calling minutes) are billed separately. Outreach and calling automations must follow platform rules and applicable regulations, including consent and do-not-disturb requirements.
        </p>
      </section>
      <CTASection />
    </>
  );
}
