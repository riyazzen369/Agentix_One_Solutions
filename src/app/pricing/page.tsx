import type { Metadata } from "next";
import { Info } from "lucide-react";
import { appPlan, priceTables, pricingNotes, websiteBillable, websitePlans } from "@/content/pricing";
import { faqs, PRICE_NOTE } from "@/content/site";
import { pageMeta, faqLd } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { PricingCard } from "@/components/PricingCard";
import { WebsitePlanCard } from "@/components/WebsitePlanCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { TrustStrip } from "@/components/TrustStrip";
import { getContent } from "@/lib/site-content";
import { applyAppPlan, applyTables, applyWebsitePlans } from "@/lib/pricing-overrides";

export const metadata: Metadata = pageMeta({
  title: "Pricing — Websites, AI Chatbots & Automation Plans",
  description: "Website plans from ₹6,000, apps from ₹19,599, AI chatbots from ₹7,349, workflow automation from ₹3,919 and monthly AI retainers. GST extra.",
  path: "/pricing",
});

export default async function PricingPage() {
  const { pricing } = await getContent();
  const plans = applyWebsitePlans(websitePlans, pricing);
  const app = applyAppPlan(appPlan, pricing);
  const tables = applyTables(priceTables, pricing);
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple pricing. No hidden costs." text={`${PRICE_NOTE} GST and third-party costs are extra — see the notes below.`} />

      <section aria-labelledby="web-plans" className="container py-16 sm:py-20">
        <SectionHeading id="web-plans" eyebrow="Websites" title="Choose your website building plan" text="Get your business online and ready to grow." />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((p) => <WebsitePlanCard key={p.name} plan={p} />)}
        </div>
        <div data-reveal className="mt-10 rounded-brut border-2 border-ink bg-alabaster p-5 shadow-brut-sm sm:p-6">
          <h3 className="font-display text-lg font-bold">Separately billable &amp; renewals</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] marker:text-ink">
            {websiteBillable.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="app-plan" className="border-y-2 border-ink bg-alabaster">
        <div className="container grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <SectionHeading id="app-plan" eyebrow="Apps" title="App development" text="Android or iOS apps for bookings, memberships, internal tools and customer portals — scoped clearly before we build." />
          <PricingCard plan={app} service="Website & App Development" />
        </div>
      </section>

      {tables.map((t) => {
        const id = t.title.toLowerCase().replace(/\W+/g, "-");
        return (
          <section key={t.title} aria-labelledby={id} className="container py-14">
            <h2 id={id} className="text-3xl uppercase sm:text-4xl" data-reveal>{t.title}</h2>
            <ul data-reveal className="mt-6 grid gap-3 sm:hidden">
              {t.rows.map(([a, b, c]) => (
                <li key={a} className="rounded-brut border-2 border-ink bg-alabaster p-4 shadow-brut-sm">
                  <p className="font-display text-lg font-bold leading-tight">{a}</p>
                  <p className="mt-1 font-display text-xl font-bold">{b}</p>
                  <p className="mt-2 border-t-2 border-ink pt-2 text-[15px] text-ink/80"><span className="sr-only">{t.cols[2]}: </span>{c}</p>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-6 hidden overflow-x-auto rounded-brut border-2 border-ink bg-alabaster shadow-brut sm:block">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">{t.title} — {PRICE_NOTE}</caption>
                <thead className="bg-ink text-lemon">
                  <tr>
                    {t.cols.map((c, i) => <th key={c} scope="col" className={`px-5 py-4 font-display text-sm uppercase tracking-wide ${i === 1 ? "text-right" : ""}`}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map(([a, b, c]) => (
                    <tr key={a} className="border-t-2 border-ink transition-colors hover:bg-mint/30">
                      <th scope="row" className="px-5 py-4 font-semibold">{a}</th>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-display font-bold">{b}</td>
                      <td className="px-5 py-4 text-ink/80">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate">{PRICE_NOTE}</p>
          </section>
        );
      })}

      <section aria-labelledby="notes" className="container py-14">
        <div data-reveal className="rounded-brut border-2 border-ink bg-ink p-6 text-lemon sm:p-10">
          <h2 id="notes" className="flex items-center gap-3 text-3xl uppercase"><Info aria-hidden className="h-7 w-7" /> Pricing notes</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {pricingNotes.map((n) => <li key={n} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />{n}</li>)}
          </ul>
        </div>
      </section>

      <TrustStrip />

      <section aria-labelledby="pricing-faq" className="container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="pricing-faq" eyebrow="FAQ" title="Pricing questions" />
        <FAQ items={faqs} />
      </section>
      <CTASection title="Not sure which plan fits?" text="Book a free call. We’ll recommend the smallest system that solves your problem — and tell you if you don’t need us yet." />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
