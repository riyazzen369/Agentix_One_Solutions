import Link from "next/link";
import type { LegalSection } from "@/content/legal";
import { LEGAL_NOTICE, legalNav, site } from "@/content/site";
import { PageHeader } from "./PageHeader";

type Props = { title: string; intro: string; sections: LegalSection[]; path: string };

export function LegalPageLayout({ title, intro, sections, path }: Props) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} text={intro} />
      <div className="container grid gap-10 py-14 lg:grid-cols-[1fr_280px]">
        <article className="card max-w-3xl p-6 sm:p-10">
          <p className="rounded-lg border-2 border-ink bg-lemon p-4 text-sm font-semibold">{LEGAL_NOTICE}</p>
          <p className="mt-4 text-sm text-slate">Effective: {site.effectiveDate}</p>
          {sections.map((s) => (
            <section key={s.h} className="mt-8">
              <h2 className="text-2xl normal-case">{s.h}</h2>
              {s.p?.map((p) => <p key={p} className="mt-3 text-ink/85">{p}</p>)}
              {s.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/85 marker:text-ink">
                  {s.list.map((l) => <li key={l}>{l}</li>)}
                </ul>
              )}
            </section>
          ))}
        </article>
        <aside aria-label="Legal pages" className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="eyebrow mb-3">Legal pages</h2>
          <ul className="space-y-1">
            {[{ label: "SOW & Legal overview", href: "/sow-legal" }, ...legalNav].map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={l.href === path ? "page" : undefined} className="block rounded-lg border-2 border-transparent px-3 py-2 font-semibold hover:border-ink hover:bg-mint aria-[current=page]:border-ink aria-[current=page]:bg-alabaster">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
