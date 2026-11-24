import Link from "next/link";
import { getContent, offerIsLive } from "@/lib/site-content";

export async function OfferBanner() {
  const { offer } = await getContent();
  if (!offerIsLive(offer)) return null;
  const external = offer.ctaHref.startsWith("https://");
  const cta = offer.ctaLabel && offer.ctaHref ? (external ? (
    <a href={offer.ctaHref} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg border-2 border-lemon px-3 py-1 text-xs font-bold uppercase tracking-wide hover:border-mint hover:text-mint">{offer.ctaLabel}</a>
  ) : (
    <Link href={offer.ctaHref} className="shrink-0 rounded-lg border-2 border-lemon px-3 py-1 text-xs font-bold uppercase tracking-wide hover:border-mint hover:text-mint">{offer.ctaLabel}</Link>
  )) : null;
  return (
    <div role="region" aria-label="Current offer" className="no-print on-dark bg-ink text-lemon">
      <div className="container flex min-h-[44px] flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-sm font-semibold">
        <span>{offer.text}</span>
        {cta}
      </div>
    </div>
  );
}
