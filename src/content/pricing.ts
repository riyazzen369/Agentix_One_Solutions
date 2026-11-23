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

export type WebsitePlan = {
  name: string;
  tag: string;
  price: string;
  audience: string;
  features: string[];
  specs: [string, string][];
  estimate: string;
  cta: string;
  featured?: boolean;
};

export const websitePlans: WebsitePlan[] = [
  {
    name: "Plan A",
    tag: "Basic catalogue & enquiries",
    price: "₹6,000",
    audience: "Best for small businesses wanting an online catalogue + WhatsApp/Instagram enquiries.",
    features: ["Up to 5 pages", "Catalogue / gallery", "WhatsApp / Instagram buttons", "Basic SEO", "1 month free support"],
    specs: [["Online payments", "Not included"], ["Admin panel / CMS", "Not included (static catalogue)"], ["Product / item limit", "Up to 15 products/services displayed"]],
    estimate: "₹6,800 – ₹8,000",
    cta: "START WITH PLAN A",
  },
  {
    name: "Plan B",
    tag: "Complete online store",
    price: "₹9,999",
    audience: "Businesses wanting a fully functional online store + payments. Recommended first package.",
    features: ["Home, Shop, Product, About, Contact & Policies pages", "Simple admin panel", "WhatsApp order alerts", "Razorpay payments", "Basic SEO", "Analytics", "1 month free support"],
    specs: [["Online payments", "Included (Razorpay integration)"], ["Admin panel / CMS", "Simple admin panel included (admin handover)"], ["Product / item limit", "Up to 20 products/services uploaded"]],
    estimate: "₹10,799 – ₹12,000",
    cta: "START WITH PLAN B",
    featured: true,
  },
  {
    name: "Plan C",
    tag: "Advanced e-commerce & CMS",
    price: "₹12,000",
    audience: "Businesses wanting online orders/payments + an advanced admin for regular updates and content.",
    features: ["Everything in Plan B", "Expanded admin panel", "3 months free support"],
    specs: [["Online payments", "Included (Razorpay integration)"], ["Admin panel / CMS", "Admin panel included (advanced scope + handover)"], ["Product / item limit", "Up to 30 products/services uploaded"]],
    estimate: "₹12,800 – ₹14,000",
    cta: "START WITH PLAN C",
  },
];

export const websiteEstimateNote = "First year, with .in domain & free hosting.";

export const websiteBillable = [
  ".in domain: ₹800 – ₹1,000 (1st year) | .com domain: ₹1,300 – ₹1,500 (1st year)",
  "Hosting: free (Vercel/Netlify) until limits are exceeded",
  "Annual renewals (domain, email) apply",
];

export const appPlan: Plan = {
  name: "App Development",
  price: "₹19,599",
  unit: "starting at",
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
      ["Website AI Chatbot", "₹12,249", "FAQ bot, lead capture, basic booking"],
      ["WhatsApp AI Chatbot", "₹7,349", "WhatsApp automation, FAQs, lead routing"],
      ["Advanced AI Chatbot", "₹17,149", "CRM integration, appointments, payments, custom knowledge base"],
    ],
  },
  {
    title: "Automation plans",
    cols: ["Service", "Starting Price", "Typical Use"],
    rows: [
      ["Single workflow automation", "₹3,919", "One repetitive process automated"],
      ["Multi-step workflow automation", "₹14,699", "CRM, Sheets, WhatsApp, email, and follow-ups"],
      ["Social media content automation", "₹9,799/month", "Content calendar, AI captions, scheduling support"],
      ["LinkedIn outreach system", "₹12,249 setup + ₹4,899/month", "Profile optimization, outreach, lead tracking"],
      ["Cold call AI agent", "₹24,499 setup + ₹6,999/month", "Outbound calling, qualification, follow-up"],
      ["Payment follow-up agent", "₹9,799 setup + ₹3,499/month", "Invoice reminders, payment links, escalation"],
    ],
  },
  {
    title: "Retainers",
    cols: ["Plan", "Monthly Price", "Includes"],
    rows: [
      ["AI Support Retainer", "₹4,899/month", "Minor updates, bug support, basic automation monitoring"],
      ["Growth Retainer", "₹9,799/month", "Content automation, chatbot updates, workflow optimization"],
      ["AI Operations Retainer", "₹17,149/month", "Dedicated automation support, new workflows, reporting, priority support"],
    ],
  },
];

export const pricingNotes = [
  "Prices are starting prices and may change based on scope, integrations, and complexity.",
  "Third-party costs such as hosting, domain, WhatsApp Business API, OpenAI/API usage, SMS, calling minutes, and premium tools are billed separately.",
  "GST will be added as applicable.",
  "A 40–50% advance is required to begin projects; the balance is due at milestones defined in your SOW. Retainers are billed in advance.",
  "Retainers cover support and optimization, not unlimited new development.",
  "Custom enterprise systems, marketplaces, complex SaaS platforms, and multi-agent AI systems are quoted separately.",
];
