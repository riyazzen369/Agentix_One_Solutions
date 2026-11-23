import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({ title, description, path, noindex }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, locale: site.locale, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  areaServed: "IN",
  address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.countryCode },
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.whatsapp ? { telephone: `+${site.contact.whatsapp.replace(/\D/g, "")}` } : {}),
  sameAs: site.socials.map((s) => s.href).filter(Boolean),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en-IN",
  publisher: { "@id": `${site.url}/#organization` },
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const servicesLd = (items: { title: string; what: string; slug: string }[]) => ({
  "@context": "https://schema.org",
  "@graph": items.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.what,
    url: `${site.url}/services#${s.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  })),
});

export const contactLd = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact`,
  about: { "@id": `${site.url}/#organization` },
});
