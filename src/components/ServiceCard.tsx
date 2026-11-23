import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site";
import { Icon } from "./Icon";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article data-reveal className="card card-hover group relative flex flex-col p-6 hover:border-mint focus-within:border-mint">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold text-slate">{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-lemon transition-colors group-hover:bg-mint">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
      </div>
      <h3 className="mt-6 text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 text-[15px] text-ink/75">{service.short}</p>
      <Link href={`/services#${service.slug}`} className="mt-6 inline-flex items-center gap-1.5 self-start border-b-[3px] border-ink pb-0.5 font-display text-sm font-bold uppercase tracking-wide transition-colors group-hover:border-mint after:absolute after:inset-0 after:content-['']">
        Explore service<span className="sr-only">: {service.title}</span>
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </Link>
    </article>
  );
}
