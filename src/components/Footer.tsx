import Link from "next/link";
import { MapPin, Mail, Clock, Phone } from "lucide-react";
import { legalNav, nav, phoneDisplay, phoneHref, services, site, whatsappHref, LEGAL_NOTICE } from "@/content/site";
import { Logo } from "./Navbar";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-lemon">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo dark className="text-lemon" />
          <p className="max-w-xs text-lemon/80">{site.tagline}. AI agency in Bengaluru building websites, apps and automation systems.</p>
          <ul className="space-y-2 text-sm text-lemon/80">
            <li className="flex gap-2"><MapPin aria-hidden className="h-4 w-4 shrink-0 translate-y-1" />Bengaluru, Karnataka, India</li>
            <li className="flex gap-2"><Mail aria-hidden className="h-4 w-4 shrink-0 translate-y-1" />{site.contact.email ? <a className="inline-block py-1 hover:text-mint" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : "[PLACEHOLDER: Business email]"}</li>
            {phoneDisplay && <li className="flex gap-2"><Phone aria-hidden className="h-4 w-4 shrink-0 translate-y-1" /><a className="inline-block py-1 hover:text-mint" href={phoneHref}>{phoneDisplay}</a></li>}
            <li className="flex gap-2"><Clock aria-hidden className="h-4 w-4 shrink-0 translate-y-1" />{site.contact.hours}</li>
          </ul>
        </div>
        <FooterCol title="Company" links={[{ label: "Home", href: "/" }, ...nav]} />
        <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services#${s.slug}` }))} />
        <div>
          <FooterCol title="Legal" links={legalNav} />
          <h2 className="eyebrow mb-3 mt-8">Social</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {site.socials.map((s) => (
              <li key={s.label}>{s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1 hover:text-mint">{s.label}</a> : <span className="text-lemon/70">{s.label}: [PLACEHOLDER]</span>}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-lemon/20">
        <div className="container flex flex-col gap-3 py-6 text-xs text-lemon/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="max-w-2xl">{LEGAL_NOTICE}</p>
          <a href={whatsappHref()} className="inline-block py-1 font-semibold text-lemon hover:text-mint">Chat on WhatsApp →</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-3">{title}</h2>
      <ul className="text-sm">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="inline-block py-1.5 text-lemon/85 hover:text-mint hover:underline">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
