import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services, PRICE_NOTE } from "@/content/site";
import { pageMeta, servicesLd } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Icon } from "@/components/Icon";
import { LeadButton } from "@/components/LeadModal";
import { buttonClass } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Services — Websites, Apps, AI Chatbots & Automation",
  description: "Website development in Bengaluru, AI chatbot development, workflow automation, LinkedIn outreach, cold-call AI agents, payment follow-up automation and SOW documentation.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Eight ways to put AI to work in your business" text="Pick one system or combine them. Every engagement starts with a free call and a written scope, so you know exactly what you get and what it costs." />
      <nav aria-label="Jump to service" className="border-b-2 border-ink bg-alabaster">
        <ul className="container flex gap-2 overflow-x-auto py-3 text-sm font-semibold">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0"><a href={`#${s.slug}`} className="inline-flex min-h-[40px] items-center rounded-full border-2 border-ink px-3 hover:bg-mint">{s.title}</a></li>
          ))}
        </ul>
      </nav>
      <div className="container space-y-10 py-16 sm:py-20">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} data-reveal className="card grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-lemon"><Icon name={s.icon} className="h-6 w-6" /></span>
                <span className="font-display font-bold text-slate">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 id={`${s.slug}-title`} className="mt-5 text-3xl sm:text-4xl">{s.title}</h2>
              <dl className="mt-6 space-y-5">
                <Item term="What it is">{s.what}</Item>
                <Item term="Who it’s for">{s.who}</Item>
                <Item term="Business outcome">{s.outcome}</Item>
              </dl>
            </div>
            <div className="flex flex-col rounded-xl border-2 border-ink bg-white p-6">
              <h3 className="eyebrow">What’s included</h3>
              <ul className="mt-4 space-y-2.5">
                {s.included.map((x) => (
                  <li key={x} className="flex gap-2.5"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-ink bg-mint p-0.5" strokeWidth={3} />{x}</li>
                ))}
              </ul>
              <dl className="mt-6 grid gap-4 border-t-2 border-ink pt-5 sm:grid-cols-2">
                <div><dt className="text-sm text-slate">Typical timeline</dt><dd className="font-display font-bold">{s.timeline}</dd></div>
                <div><dt className="text-sm text-slate">Starting price</dt><dd className="font-display font-bold">{s.price}</dd></div>
              </dl>
              <p className="mt-3 text-xs text-slate">{PRICE_NOTE}</p>
              <LeadButton service={s.title} className={buttonClass("primary", "mt-6 w-full")}>Get a custom quote</LeadButton>
            </div>
          </section>
        ))}
      </div>
      <CTASection />
      <JsonLd data={servicesLd(services)} />
    </>
  );
}

function Item({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-slate">{term}</dt>
      <dd className="mt-1.5 text-ink/85">{children}</dd>
    </div>
  );
}
