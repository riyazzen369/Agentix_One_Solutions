import type { Metadata } from "next";
import Link from "next/link";
import { Check, FileSignature, MousePointerClick, PenLine, Receipt, Square } from "lucide-react";
import { invoiceIncludes, keyCommitments, msaClauses, msaParties, onboarding, signingSteps, signOffs } from "@/content/agreement";
import { LEGAL_NOTICE, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { PrintButton } from "@/components/PrintButton";
import { HighlightController } from "@/components/HighlightController";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = pageMeta({
  title: "Client Agreement & Legal Policy",
  description: "How Agentix One Solution works under a signed Master Service Agreement and SOW: payment terms, IP ownership, data protection, confidentiality, warranty and termination.",
  path: "/client-agreement",
});

export default function ClientAgreementPage() {
  return (
    <>
      <HighlightController />
      <PageHeader
        eyebrow="Legal & agreement policy"
        title="Signed agreements. Clear terms. No surprises."
        text="Every project starts with a written agreement, so you know exactly what you're paying for, when it's delivered, and what you own at the end."
      >
        <Button href="#msa" arrow className="no-print">Read the agreement</Button>
        <Button href="/client-sign-off" variant="secondary" className="no-print">Sign online</Button>
        <PrintButton />
      </PageHeader>

      <div className="container py-10">
        <p className="rounded-lg border-2 border-ink bg-alabaster p-4 text-sm font-semibold">{LEGAL_NOTICE}</p>
      </div>

      <section aria-labelledby="commitments" className="container pb-10">
        <h2 id="commitments" className="eyebrow">Key commitments at a glance</h2>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate no-print"><MousePointerClick aria-hidden className="h-4 w-4" />Tap any term to jump to and highlight the clause.</p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {keyCommitments.map((k) => (
            <li key={k.href}>
              <a href={k.href} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-ink bg-alabaster px-4 text-sm font-semibold shadow-brut-sm transition-colors hover:bg-mint">
                <Check aria-hidden className="h-4 w-4" />{k.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="signoffs" className="border-y-2 border-ink bg-alabaster">
        <div className="container py-16 sm:py-20">
          <SectionHeading id="signoffs" eyebrow="Before we start" title="3 required sign-offs" text="Nothing is built until these are signed, by e-signature or clear written approval over email." />
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {signOffs.map((s, i) => (
              <li key={s.id} id={s.id} data-hl="signoff" className="flex cursor-pointer flex-col rounded-brut border-2 border-ink bg-lemon/60 p-6 shadow-brut">
                <button type="button" data-hl-toggle aria-pressed="false" className="flex items-start justify-between gap-3 text-left">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-lavender font-display text-lg font-bold">{i + 1}</span>
                  <Badge tone="ink">{s.required}</Badge>
                </button>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 text-[15px] text-ink/85">{s.short}</p>
                <dl className="mt-5 space-y-3 text-[15px]">
                  <div><dt className="text-sm text-slate">When</dt><dd className="font-semibold">{s.when}</dd></div>
                  <div><dt className="text-sm text-slate">Signed by</dt><dd className="font-semibold">{s.who}</dd></div>
                </dl>
                <ul className="mt-5 flex-1 space-y-2 border-t-2 border-ink pt-4 text-[15px]">
                  {s.confirms.map((c) => (
                    <li key={c} className="flex gap-2.5"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-ink bg-mint p-0.5" strokeWidth={3} />{c}</li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate">
                  <span className="border-t-2 border-dashed border-ink pt-1.5"><PenLine aria-hidden className="mr-1 inline h-3 w-3" />Client</span>
                  <span className="border-t-2 border-dashed border-ink pt-1.5"><PenLine aria-hidden className="mr-1 inline h-3 w-3" />{site.name}</span>
                </div>
                <span className="hl-badge mt-4 items-center gap-1.5 self-start rounded-full border-2 border-ink bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wide">Selected</span>
              </li>
            ))}
          </ol>
          <div className="no-print mt-10 flex flex-col gap-4 rounded-brut border-2 border-ink bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="font-display text-lg font-bold">Ready to sign? Accept all three online and get a receipt — no login needed.</p>
            <Button href="/client-sign-off" arrow className="shrink-0">Sign online</Button>
          </div>
          <h3 className="eyebrow mt-14">How signing works</h3>
          <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
            {signingSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-full border-2 border-ink bg-white px-3 py-1.5">{i + 1}. {s}</span>
                {i < signingSteps.length - 1 && <span aria-hidden>→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="msa" aria-labelledby="msa-title" className="container py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="msa-title" eyebrow="Business agreement" title="Master Service Agreement" text="The standard agreement we sign with every client. Project-specific details go in the SOW." />
          <Button href="/sow-template" variant="secondary" arrow className="no-print self-start">View SOW template</Button>
        </div>

        <div className="mt-10 card p-6 sm:p-10">
          <p className="text-sm text-slate">Effective date: [DD/MM/YYYY]</p>
          <p className="mt-4"><strong>Between:</strong> {msaParties.provider}</p>
          <p className="mt-2"><strong>And:</strong> {msaParties.client}</p>
        </div>

        <ol className="mt-6 grid gap-4">
          {msaClauses.map((c, i) => (
            <li key={c.id} id={c.id} data-hl="clause" className="cursor-pointer rounded-brut border-2 border-ink bg-alabaster p-5 sm:p-7">
              <button type="button" data-hl-toggle aria-pressed="false" className="flex w-full flex-col gap-1 text-left sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-display text-sm font-bold text-slate">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-bold sm:text-2xl">{c.title}</span>
                <span className="hl-badge ml-auto items-center rounded-full border-2 border-ink bg-mint px-3 py-0.5 text-xs font-bold uppercase tracking-wide">Highlighted</span>
              </button>
              <p className="mt-2 font-semibold text-ink/90 sm:pl-10">{c.summary}</p>
              <div className="mt-3 space-y-2 text-[15px] text-ink/80 sm:pl-10">
                {c.p?.map((t) => <p key={t}>{t}</p>)}
                {c.list && <ul className="list-disc space-y-1.5 pl-5 marker:text-ink">{c.list.map((t) => <li key={t}>{t}</li>)}</ul>}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 card p-6 sm:p-10">
          <p className="font-display font-bold uppercase">In witness whereof, the parties have executed this Agreement as of the Effective Date.</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {[
              { h: "For Service Provider", rows: [`Signature: ______________________`, `Name: [PLACEHOLDER: Authorised signatory]`, `For: ${site.name}`, `PAN: [PLACEHOLDER]`] },
              { h: "For Client", rows: [`Signature: ______________________`, `Name & title: [Client name, designation]`, `Company: [Client Business Name]`, `Company seal / GSTIN: [Client GSTIN]`] },
            ].map((b) => (
              <div key={b.h}>
                <p className="eyebrow flex items-center gap-2"><FileSignature aria-hidden className="h-4 w-4" />{b.h}</p>
                <ul className="mt-3 space-y-2 text-[15px]">{b.rows.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="onboarding" className="border-y-2 border-ink bg-alabaster">
        <div className="container py-16 sm:py-20">
          <SectionHeading id="onboarding" eyebrow="After signing" title="Onboarding checklist" text="What we collect before kickoff, so your project isn't held up later. Domains and accounts are always registered in your name." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {onboarding.map((g) => (
              <div key={g.title} data-reveal className="rounded-brut border-2 border-ink bg-white p-6">
                <h3 className="text-xl">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map(([t, d]) => (
                    <li key={t} className="flex gap-3 text-[15px]">
                      <Square aria-hidden className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
                      <span><strong>{t}:</strong> <span className="text-ink/80">{d}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="billing" className="container py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading id="billing" eyebrow="Billing" title="Transparent invoices" text="Every payment is backed by a proper invoice linked to your signed SOW." />
          <ul className="card grid gap-3 p-6 sm:p-8">
            {invoiceIncludes.map((x) => (
              <li key={x} className="flex gap-3"><Receipt aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />{x}</li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-sm text-slate">
          Related: <Link className="link-u" href="/terms-and-conditions">Terms & Conditions</Link> · <Link className="link-u" href="/refund-cancellation-policy">Refund & Cancellation</Link> · <Link className="link-u" href="/privacy-policy">Privacy Policy</Link> · <Link className="link-u" href="/sow-template">SOW Template</Link>
        </p>
      </section>

      <CTASection title="Ready to start, the right way?" text="Book a free call. We'll scope your project, send a written SOW, and only start once you've signed off." />
    </>
  );
}
