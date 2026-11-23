export type Plan = {
  name: string;
  price: string;
  unit: string;
  reference?: string;
  features: string[];
  cta: string;
  featured?: boolean;
  note?: string;
};

export const websitePlans: Plan[] = [
  {
    name: "Starter Website Plan",
    price: "₹17,499",
    unit: "one-time",
    reference: "Regular market reference: approximately ₹25,000",
    features: ["1-page premium business website", "Mobile-responsive design", "Contact/lead form", "WhatsApp click-to-chat", "Basic SEO setup", "Google Analytics setup", "1 revision round", "Delivery in 5–7 working days"],
    cta: "START MY WEBSITE",
  },
  {
    name: "Growth Website Plan",
    price: "₹24,499",
    unit: "one-time",
    reference: "Regular market reference: approximately ₹35,000",
    features: ["Up to 6-page business website", "Custom UI design", "Lead capture forms", "WhatsApp integration", "Basic AI chatbot", "On-page SEO", "Google Analytics and Search Console", "2 revision rounds", "Delivery in 10–14 working days"],
    cta: "BUILD MY GROWTH SITE",
    featured: true,
  },
  {
    name: "AI Business Website Plan",
    price: "₹34,999",
    unit: "one-time",
    reference: "Regular market reference: approximately ₹50,000",
    features: ["Up to 10-page custom website", "Advanced UI/UX design", "AI chatbot with lead qualification", "WhatsApp Business integration", "CRM or Google Sheets lead capture", "Automated enquiry follow-up", "Basic workflow automation", "On-page SEO", "3 revision rounds", "Delivery in 14–21 working days"],
    cta: "AUTOMATE MY BUSINESS",
  },
];

export const appPlan: Plan = {
  name: "App Development",
  price: "₹27,999",
  unit: "starting at",
  reference: "Regular market reference: approximately ₹40,000",
  features: ["Android or iOS app concept", "Up to 5 core screens", "Basic backend/database setup", "User authentication, if required", "Basic admin panel", "App store submission guidance", "Timeline: 3–6 weeks"],
  cta: "PLAN MY APP",
  note: "Custom apps with payments, multi-role logins, dashboards, or complex integrations require a custom quote.",
};

export type PriceTable = { title: string; cols: [string, string, string]; rows: [string, string, string][] };

export const priceTables: PriceTable[] = [
  {
    title: "AI chatbot plans",
    cols: ["Plan", "Starting Price", "Includes"],
    rows: [
      ["Website AI Chatbot", "₹17,499", "FAQ bot, lead capture, basic booking"],
      ["WhatsApp AI Chatbot", "₹10,499", "WhatsApp automation, FAQs, lead routing"],
      ["Advanced AI Chatbot", "₹24,499", "CRM integration, appointments, payments, custom knowledge base"],
    ],
  },
  {
    title: "Automation plans",
    cols: ["Service", "Starting Price", "Typical Use"],
    rows: [
      ["Single workflow automation", "₹5,599", "One repetitive process automated"],
      ["Multi-step workflow automation", "₹20,999", "CRM, Sheets, WhatsApp, email, and follow-ups"],
      ["Social media content automation", "₹13,999/month", "Content calendar, AI captions, scheduling support"],
      ["LinkedIn outreach system", "₹17,499 setup + ₹6,999/month", "Profile optimization, outreach, lead tracking"],
      ["Cold call AI agent", "₹34,999 setup + ₹9,999/month", "Outbound calling, qualification, follow-up"],
      ["Payment follow-up agent", "₹13,999 setup + ₹4,999/month", "Invoice reminders, payment links, escalation"],
    ],
  },
  {
    title: "Retainers",
    cols: ["Plan", "Monthly Price", "Includes"],
    rows: [
      ["AI Support Retainer", "₹6,999/month", "Minor updates, bug support, basic automation monitoring"],
      ["Growth Retainer", "₹13,999/month", "Content automation, chatbot updates, workflow optimization"],
      ["AI Operations Retainer", "₹24,499/month", "Dedicated automation support, new workflows, reporting, priority support"],
    ],
  },
];

export const pricingNotes = [
  "Prices are starting prices and may change based on scope, integrations, and complexity.",
  "Third-party costs such as hosting, domain, WhatsApp Business API, OpenAI/API usage, SMS, calling minutes, and premium tools are billed separately.",
  "GST will be added as applicable.",
  "50% advance is required to begin most projects; remaining payment is due at defined milestones.",
  "Retainers cover support and optimization, not unlimited new development.",
  "Custom enterprise systems, marketplaces, complex SaaS platforms, and multi-agent AI systems are quoted separately.",
];
