import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, FileSignature, ShieldCheck } from "lucide-react";
import { AGREEMENT_VERSION, PROVIDER, signDocs } from "@/content/signoff";
import { LEGAL_NOTICE } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SignOffForm } from "@/components/SignOffForm";
import { Button } from "@/components/Button";

export const metadata: Metadata = pageMeta({
  title: "Client Sign-Off — Accept Your Agreements",
  description: "Read and accept the Agentix One Solution Master Service Agreement, SOW terms and Data & Platform Compliance Acknowledgement online. No login needed.",
  path: "/client-sign-off",
  noindex: true,
});

export default function ClientSignOffPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client sign-off"
        title="Read. Accept. Get your receipt."
        text="Review the three agreements below, then accept them in one step. No login needed, and you get a receipt straight away."
      >
        <Button href="#sign" arrow className="no-print">Go to sign-off form</Button>
        <Button href="/client-agreement" variant="secondary" className="no-print">Back to agreement overview</Button>
      </PageHeader>

      <div className="container py-10">
        <p className="rounded-lg border-2 border-ink bg-alabaster p-4 text-sm font-semibold">{LEGAL_NOTICE}</p>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate"><ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />Service Provider: {PROVIDER.name}, trading as {PROVIDER.trading}, {PROVIDER.place}. Agreement version {AGREEMENT_VERSION}.</p>
      </div>

      <section aria-labelledby="docs-title" className="container pb-12">
        <SectionHeading id="docs-title" eyebrow="Step 1" title="Read the three agreements" text="Open each one to read it in full." />
        <div className="mt-8 space-y-4">
          {signDocs.map((d, i) => (
            <details key={d.id} id={d.id} className="group card" open={i === 0}>
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-display text-xl font-bold sm:text-2xl">{i + 1}. {d.title}</span>
                  <span className="mt-1 block text-[15px] text-ink/75">{d.summary}</span>
                </span>
                <ChevronDown aria-hidden className="h-6 w-6 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-6 border-t-2 border-ink p-5 sm:p-6">
                {d.intro && <p className="text-[15px] text-ink/85">{d.intro}</p>}
                {d.sections.map((s) => (
                  <section key={s.h}>
                    <h3 className="text-lg normal-case">{s.h}</h3>
                    {s.p?.map((t) => <p key={t} className="mt-2 text-[15px] text-ink/85">{t}</p>)}
                    {s.list && <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-ink/85 marker:text-ink">{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
                  </section>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="sign" aria-labelledby="sign-title" className="border-y-2 border-ink bg-alabaster">
        <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="sign-title" eyebrow="Step 2" title="Accept and sign" text="Fill in your details and tick all three boxes." />
            <p className="mt-6 flex items-start gap-2 text-sm text-ink/80"><FileSignature aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />You can also review everything on the <Link className="link-u" href="/client-agreement">Client Agreement page</Link> first.</p>
          </div>
          <div className="card p-6 sm:p-8">
            <SignOffForm agreementVersion={AGREEMENT_VERSION} />
          </div>
        </div>
      </section>
    </>
  );
}
