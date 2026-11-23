import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileCheck2 } from "lucide-react";
import { sowIncludes } from "@/content/legal";
import { legalNav, LEGAL_NOTICE } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";

export const metadata: Metadata = pageMeta({
  title: "SOW & Legal Documentation",
  description: "Every Agentix One Solution project starts with a clear Statement of Work covering scope, deliverables, timelines, payments, IP ownership, confidentiality and cancellation terms.",
  path: "/sow-legal",
});

export default function SowLegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="SOW & Legal"
        title="SOW & legal documentation"
        text="Every project begins with a clear Scope of Work, so both parties understand deliverables, timelines, and responsibilities before any work starts."
      >
        <Button href="/sow-template" arrow>View SOW template</Button>
      </PageHeader>

      <section aria-labelledby="sow-includes" className="container py-16 sm:py-20">
        <SectionHeading id="sow-includes" eyebrow="What every SOW covers" title="No grey areas" text="Our Statements of Work are written in plain language and cover:" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sowIncludes.map((s, i) => (
            <li key={s} data-reveal className="flex items-center gap-4 rounded-xl border-2 border-ink bg-alabaster p-4 font-semibold shadow-brut-sm">
              <span className="font-display text-sm text-slate">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="legal-pages" className="border-y-2 border-ink bg-alabaster">
        <div className="container py-16 sm:py-20">
          <SectionHeading id="legal-pages" eyebrow="Policies" title="Legal pages" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {legalNav.map((l) => (
              <li key={l.href} data-reveal>
                <Link href={l.href} className="card card-hover group flex h-full items-center justify-between gap-4 bg-white p-6 hover:border-mint">
                  <span className="flex items-center gap-3 font-display text-xl font-bold"><FileCheck2 aria-hidden className="h-6 w-6" />{l.label}</span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 rounded-lg border-2 border-ink bg-lemon p-4 font-semibold">{LEGAL_NOTICE}</p>
        </div>
      </section>
      <CTASection title="Want a clear scope for your project?" text="Book a free call and we’ll turn your idea into a written scope with deliverables, timeline and price." />
    </>
  );
}
