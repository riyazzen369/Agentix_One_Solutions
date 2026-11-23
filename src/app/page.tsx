import type { Metadata } from "next";
import { faqs, flows, services, testimonials } from "@/content/site";
import { pageMeta, faqLd } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { FlowCard } from "@/components/FlowCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/Button";
import { ProcessSteps } from "@/components/ProcessSteps";
import { JsonLd } from "@/components/JsonLd";
import { TrustStrip } from "@/components/TrustStrip";

export const metadata: Metadata = {
  ...pageMeta({
    title: "AI Agency in Bengaluru — Websites, AI Chatbots & Automation",
    description: "Agentix One Solution is an AI automation agency in Bengaluru building websites, apps, AI chatbots, workflow automation, LinkedIn outreach, cold-call AI agents and payment follow-ups.",
    path: "/",
  }),
  title: { absolute: "Agentix One Solution — AI Agency in Bengaluru | AI Systems That Work While You Grow" },
};

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="services-title" className="container py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Services" id="services-title" title="What we build for you" text="From your first website to AI agents that follow up, call, and collect — built around how your business actually runs." />
          <Button href="/services" variant="secondary" arrow className="self-start lg:self-auto">All services</Button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </section>

      <section aria-labelledby="flows-title" className="border-y-2 border-ink bg-alabaster">
        <div className="container py-20 sm:py-28">
          <SectionHeading eyebrow="AI automation" id="flows-title" title="Automate the work your team hates" text="Every flow below replaces hours of manual follow-up with a system that runs in the background — and hands over to your team when a human is needed." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flows.map((f, i) => <FlowCard key={f.title} flow={f} index={i} />)}
          </div>
          <div className="mt-10"><Button href="/ai-automations" arrow>See all automation use cases</Button></div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="container py-20 sm:py-28">
        <SectionHeading eyebrow="Process" id="process-title" title="How we work" text="A clear five-step path from first call to a system your team actually uses." />
        <ProcessSteps className="mt-12" />
      </section>

      <section aria-labelledby="testimonials-title" className="border-y-2 border-ink bg-lavender">
        <div className="container py-20 sm:py-28">
          <SectionHeading eyebrow="Client stories" id="testimonials-title" title="Built for businesses that want to move faster" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20"><TrustStrip /></div>

      <section aria-labelledby="faq-title" className="container grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" id="faq-title" title="Straight answers" text="Pricing, payments, ownership and what we can (and can’t) promise." />
        <FAQ items={faqs} />
      </section>

      <CTASection />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
