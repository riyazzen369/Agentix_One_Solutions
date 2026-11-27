import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const points = ["Signed MSA + SOW before work starts", "Written payment terms, no hidden costs", "IP transfers to you on full payment"];

export function TrustStrip() {
  return (
    <section aria-label="How we protect your project" className="container py-6">
      <Link
        href="/client-agreement"
        data-reveal
        className="group flex flex-col gap-5 rounded-brut border-2 border-ink bg-alabaster p-6 shadow-brut transition-[transform,box-shadow,background-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:shadow-[8px_8px_0_0_#A65BFF] sm:p-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-lavender">
            <ShieldCheck aria-hidden className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-2xl font-bold uppercase leading-tight">Every project is backed by a signed agreement</p>
            <ul className="mt-3 flex flex-col gap-x-5 gap-y-1.5 text-[15px] sm:flex-row sm:flex-wrap">
              {points.map((p, i) => (
                <li key={`${i}-${p}`} className="flex items-center gap-2"><span aria-hidden className="h-2 w-2 rounded-full border border-ink bg-mint" />{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 self-start whitespace-nowrap border-b-[3px] border-ink pb-0.5 font-display text-sm font-bold uppercase tracking-wide group-hover:border-mint lg:self-auto">
          Read our agreement policy <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
      </Link>
    </section>
  );
}
