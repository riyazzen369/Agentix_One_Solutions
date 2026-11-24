import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, ExternalLink } from "lucide-react";
import { adminToken, hasRefreshCookie } from "@/lib/admin-auth";
import { getContent, type Offer } from "@/lib/site-content";
import { priceItems } from "@/lib/pricing-overrides";
import { fetchSignoffs, istTime } from "@/lib/signoffs-admin";
import { PricingEditor } from "@/components/admin/PricingEditor";
import { OfferEditor } from "@/components/admin/OfferEditor";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { buttonClass } from "@/components/Button";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const tabs = [
  { id: "pricing", label: "Pricing" },
  { id: "offer", label: "Offers" },
  { id: "signoffs", label: "Signed agreements" },
] as const;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const token = await adminToken();
  if (!token) redirect((await hasRefreshCookie()) ? "/api/admin/refresh?next=/admin" : "/admin/login");

  const wanted = (await searchParams).tab;
  const tab = tabs.find((t) => t.id === wanted)?.id ?? "pricing";
  const content = await getContent(true);
  const rows = tab === "signoffs" ? await fetchSignoffs(token, 1000) : null;
  const offer: Offer = content.offer ?? { enabled: false, text: "", ctaLabel: "", ctaHref: "", endsOn: "" };

  return (
    <>
      <section className="dots border-b-2 border-ink">
        <div className="container flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-slate">Private</p>
            <h1 className="mt-2 text-4xl uppercase sm:text-5xl">Admin</h1>
            <p className="mt-2 text-[15px] text-ink/80">Change prices and offers, and download signed agreements.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" target="_blank" className={buttonClass("secondary", "min-h-[44px] px-4 py-2")}><ExternalLink aria-hidden className="h-4 w-4" />View website</Link>
            <LogoutButton />
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-10">
        <nav aria-label="Admin sections" className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link key={t.id} href={`/admin?tab=${t.id}`} aria-current={tab === t.id ? "page" : undefined} className={cn("inline-flex min-h-[44px] items-center rounded-full border-2 border-ink px-4 font-display text-sm font-bold uppercase tracking-wide hover:bg-mint", tab === t.id ? "bg-ink text-lemon hover:text-ink" : "bg-alabaster")}>
              {t.label}
            </Link>
          ))}
        </nav>

        {tab === "pricing" && <PricingEditor items={priceItems()} initial={content.pricing} />}
        {tab === "offer" && <div className="card max-w-3xl p-5 sm:p-8"><OfferEditor initial={offer} /></div>}
        {tab === "signoffs" && (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold">{rows ? `${rows.length} signed agreement${rows.length === 1 ? "" : "s"}` : "Could not load sign-offs."}</p>
              <a href="/api/admin/signoffs-csv" download className={buttonClass("primary", "min-h-[44px] px-5 py-2")}><Download aria-hidden className="h-4 w-4" />Download CSV</a>
            </div>
            {rows && rows.length === 0 && <p className="card p-6">No sign-offs yet. They appear here as soon as a client signs.</p>}
            {rows && rows.length > 0 && (
              <div className="overflow-x-auto rounded-brut border-2 border-ink bg-white shadow-brut-sm">
                <table className="w-full min-w-[760px] border-collapse text-left text-[14px]">
                  <caption className="sr-only">Signed agreements, newest first</caption>
                  <thead className="bg-ink text-lemon">
                    <tr>{["Reference", "Signed (IST)", "Name", "WhatsApp", "Business address or place", "Accepted", "Version"].map((h) => <th key={h} scope="col" className="px-3 py-3 font-display text-xs uppercase tracking-wide">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={`${r.ref}-${i}`} className="border-t-2 border-ink align-top">
                        <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs">{r.ref ?? "—"}</td>
                        <td className="whitespace-nowrap px-3 py-2.5">{istTime(r.created_at)}</td>
                        <td className="px-3 py-2.5 font-semibold">{r.full_name}</td>
                        <td className="whitespace-nowrap px-3 py-2.5">{r.whatsapp}</td>
                        <td className="px-3 py-2.5">{r.address_or_place}</td>
                        <td className="px-3 py-2.5">{[r.accepted_msa, r.accepted_sow, r.accepted_dpa, r.accepted_terms].every(Boolean) ? "All 4 ✓" : "Incomplete"}</td>
                        <td className="whitespace-nowrap px-3 py-2.5">{r.agreement_version}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="mt-4 text-xs text-slate">Showing the latest 1,000. The CSV download includes every record.</p>
          </div>
        )}
      </div>
    </>
  );
}
