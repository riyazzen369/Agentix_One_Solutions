import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { phoneDisplay, phoneHref, services, site, whatsappHref } from "@/content/site";
import { pageMeta, contactLd } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Contact — Book a Free AI Strategy Call",
  description: "Contact Agentix One Solution, an AI agency in Bengaluru. Get a free AI growth plan for your website, chatbot, workflow automation or outreach system.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s build your AI-powered business" text="Tell us what you want to automate, build, or grow. We’ll send you a practical AI growth plan." />
      <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
        <section id="lead-form" aria-labelledby="form-title" className="card p-6 sm:p-10">
          <h2 id="form-title" className="text-3xl uppercase sm:text-4xl">Get your free AI growth plan</h2>
          <p className="mb-8 mt-3 text-ink/80">All fields are required. Takes about a minute.</p>
          <ContactForm />
        </section>
        <aside className="space-y-6" aria-label="Other ways to reach us">
          <div className="card p-6">
            <h2 className="eyebrow">Talk to us directly</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Button href={whatsappHref()} variant="primary"><MessageCircle aria-hidden className="h-4 w-4" />Chat on WhatsApp</Button>
              {site.contact.email ? (
                <Button href={`mailto:${site.contact.email}`} variant="secondary"><Mail aria-hidden className="h-4 w-4" />Email us</Button>
              ) : (
                <p className="rounded-lg border-2 border-dashed border-ink p-3 text-sm">Email: [PLACEHOLDER: Business email]</p>
              )}
            </div>
            <ul className="mt-6 space-y-3 border-t-2 border-ink pt-5 text-[15px]">
              <li className="flex gap-3"><MapPin aria-hidden className="h-5 w-5 shrink-0" />Bengaluru, Karnataka, India</li>
              {phoneDisplay && <li className="flex gap-3"><Phone aria-hidden className="h-5 w-5 shrink-0" /><a className="link-u" href={phoneHref}>{phoneDisplay}</a></li>}
              <li className="flex gap-3"><Clock aria-hidden className="h-5 w-5 shrink-0" />{site.contact.hours}</li>
            </ul>
            <h3 className="eyebrow mt-6">Social</h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>{s.href ? <a className="link-u" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a> : <span>{s.label}: [PLACEHOLDER]</span>}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Quick service links" className="card p-6">
            <h2 className="eyebrow">Quick service links</h2>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`} className="flex min-h-[44px] items-center rounded-lg border-2 border-ink bg-white px-3 font-semibold hover:bg-mint">{s.title}</Link></li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      <JsonLd data={contactLd()} />
    </>
  );
}
