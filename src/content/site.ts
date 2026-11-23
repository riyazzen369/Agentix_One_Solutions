// Central, editable content for the whole site.
// Anything marked [PLACEHOLDER] must be replaced with real business information.

export const site = {
  name: "Agentix One Solution",
  shortName: "Agentix",
  tagline: "AI Systems That Work While You Grow",
  description:
    "AI agency in Bengaluru building websites, apps, AI chatbots, workflow automation, LinkedIn outreach, cold-call AI agents and payment follow-up systems for growing businesses.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),
  locale: "en_IN",
  address: { locality: "Bengaluru", region: "Karnataka", country: "India", countryCode: "IN" },
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    hours: "9:00 AM – 9:00 PM IST",
    responseNote: "Our team will contact you within 24 hours.", // [PLACEHOLDER] confirm before launch
  },
  socials: [
    { label: "Follow on LinkedIn", href: "https://www.linkedin.com/in/mohamed-riyaz-s-8458891b1" },
  ],
  legalEntity: "[PLACEHOLDER: Registered business / legal entity name]",
  gstin: "[PLACEHOLDER: GSTIN, if registered]",
  grievanceOfficer: "[PLACEHOLDER: Grievance Officer name, email and address]",
  effectiveDate: "[PLACEHOLDER: Effective date]",
};

export const phoneDisplay = (() => {
  const n = site.contact.whatsapp.replace(/\D/g, "");
  if (n.length === 12 && n.startsWith("91")) return `+91 ${n.slice(2, 7)} ${n.slice(7)}`;
  return n ? `+${n}` : "";
})();
export const phoneHref = site.contact.whatsapp ? `tel:+${site.contact.whatsapp.replace(/\D/g, "")}` : "";

export const whatsappHref = (text = "Hi Agentix One Solution, I'd like a free AI growth plan.") =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`
    : "/contact#lead-form";

export const SUCCESS_MSG = `Thanks! Your AI Growth Plan request has been received. ${site.contact.responseNote}`;

export const LEAD_HREF = "/contact#lead-form";

export const nav = [
  { label: "Services", href: "/services" },
  { label: "AI Automations", href: "/ai-automations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "SOW & Legal", href: "/sow-legal" },
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Client Agreement (MSA)", href: "/client-agreement" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/refund-cancellation-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "SOW Template", href: "/sow-template" },
];

export const PRICE_NOTE = "Starting price. Final quote depends on scope, integrations, and complexity.";
export const LEGAL_NOTICE =
  "This website provides general information and template documentation. For business-specific legal advice, consult a qualified legal professional.";

export type IconName =
  | "code" | "workflow" | "megaphone" | "linkedin" | "bot" | "phone" | "wallet" | "file"
  | "filter" | "message" | "sheet" | "calendar" | "cog" | "sparkles";

export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  short: string;
  what: string;
  who: string;
  included: string[];
  outcome: string;
  timeline: string;
  price: string;
};

// Timelines are typical estimates — [PLACEHOLDER] confirm with your delivery capacity.
export const services: Service[] = [
  {
    slug: "website-app-development",
    icon: "code",
    title: "Website & App Development",
    short: "Custom business websites, landing pages, e-commerce stores, web apps, mobile apps, dashboards, and booking systems.",
    what: "Fast, mobile-first websites and apps designed to turn visitors into enquiries — built on modern frameworks you fully own.",
    who: "Founders, local businesses, consultants, clinics, D2C brands and startups that need a site or app that actually brings in leads.",
    included: ["UX and custom UI design", "Responsive build for every screen size", "Lead forms and WhatsApp click-to-chat", "Basic SEO and analytics setup", "E-commerce, booking or dashboard features as scoped", "Launch support and handover"],
    outcome: "A professional online presence that captures more leads and makes it easy for customers to contact or buy from you.",
    timeline: "5–21 working days for websites; 3–6 weeks for apps",
    price: "From ₹6,000 (websites) · From ₹19,599 (apps)",
  },
  {
    slug: "workflow-agent-automation",
    icon: "workflow",
    title: "Workflow Agent Automation",
    short: "Automate repetitive processes across CRM, Google Sheets, WhatsApp, email, invoices, lead routing, reminders, and internal operations.",
    what: "AI-assisted workflows that move data between your tools and trigger the next action automatically — no more copy-paste.",
    who: "Teams spending hours every week on data entry, manual follow-ups, status updates and repetitive admin.",
    included: ["Process mapping of your current workflow", "Automation build across your existing tools", "AI steps for classification, summaries or drafting", "Error alerts and fallback handling", "Documentation and team walkthrough"],
    outcome: "Less manual work, fewer missed follow-ups, and a team that spends time on customers instead of spreadsheets.",
    timeline: "3–10 working days per workflow",
    price: "From ₹3,919 per workflow",
  },
  {
    slug: "social-media-content-automation",
    icon: "megaphone",
    title: "Social Media Content Automation",
    short: "AI-assisted content calendars, post generation, captions, hashtag research, repurposing, scheduling, and performance reporting.",
    what: "A repeatable content system: AI drafts posts and captions, you approve, and everything gets scheduled across platforms.",
    who: "Businesses that know they should post consistently but don't have the time or a full-time content team.",
    included: ["Monthly content calendar", "AI-assisted post and caption drafts", "Hashtag and topic research", "Repurposing long content into short posts", "Scheduling support", "Monthly performance summary"],
    outcome: "Consistent, on-brand posting without the daily scramble — with you approving everything before it goes live.",
    timeline: "Setup in 5–7 working days, then monthly",
    price: "From ₹9,799/month",
  },
  {
    slug: "linkedin-automation-outreach",
    icon: "linkedin",
    title: "LinkedIn Automation & Outreach",
    short: "Profile optimization, content systems, connection campaigns, personalized DM outreach, lead nurturing, and CRM-ready lead capture.",
    what: "A structured LinkedIn outreach system that finds the right prospects, starts relevant conversations, and tracks every reply.",
    who: "B2B founders, consultants, agencies and sales teams who sell to decision-makers on LinkedIn.",
    included: ["Profile optimization", "Ideal-customer targeting", "Personalized connection and DM sequences", "Reply tracking and lead nurturing", "CRM or Google Sheets lead capture", "Activity kept within LinkedIn's usage limits"],
    outcome: "A steady, trackable pipeline of conversations with the people you actually want to sell to.",
    timeline: "Setup in 7–10 working days, then monthly",
    price: "From ₹12,249 setup + ₹4,899/month",
  },
  {
    slug: "ai-chatbots",
    icon: "bot",
    title: "AI Chatbots",
    short: "Website, WhatsApp, Instagram, and Messenger chatbots for lead qualification, FAQs, appointment booking, support, and sales follow-up.",
    what: "AI chatbots trained on your business information that answer questions, qualify leads and book appointments around the clock.",
    who: "Businesses that get repeated questions, miss enquiries after hours, or lose leads because replies are slow.",
    included: ["Chatbot trained on your FAQs and offerings", "Lead qualification questions", "Appointment booking or callback requests", "Human handover when needed", "CRM, Sheets or email notifications", "Conversation review and tuning"],
    outcome: "Faster replies, fewer missed enquiries, and qualified leads delivered straight to your team.",
    timeline: "5–15 working days",
    price: "From ₹7,349",
  },
  {
    slug: "cold-call-ai-agent",
    icon: "phone",
    title: "Cold Call AI Agent",
    short: "AI voice agents for outbound calling, lead qualification, appointment setting, follow-ups, call summaries, and CRM updates.",
    what: "An AI voice agent that calls your lead list with a defined script, qualifies interest, and logs every outcome.",
    who: "Sales teams, real-estate, education, finance and service businesses with large lead lists and limited calling capacity.",
    included: ["Call script and qualification logic", "AI voice agent setup", "Interested-lead flagging and call summaries", "CRM or Sheets updates", "Follow-up triggers for your sales team", "Guidance on consent and calling regulations"],
    outcome: "More leads contacted in less time, with your team focusing only on people who showed interest.",
    timeline: "2–4 weeks",
    price: "From ₹24,499 setup + ₹6,999/month",
  },
  {
    slug: "payment-follow-up-agent",
    icon: "wallet",
    title: "Payment Follow-Up Agent",
    short: "Automated invoice reminders, payment links, due-date follow-ups, escalation workflows, and recovery notifications across WhatsApp, email, and SMS.",
    what: "A polite, persistent follow-up system that reminds customers before and after due dates and shares payment links automatically.",
    who: "Agencies, B2B suppliers, institutes, clinics and service businesses chasing pending invoices manually.",
    included: ["Reminder schedule before and after due dates", "Payment link sharing", "WhatsApp, email and SMS channels", "Escalation to your team for overdue accounts", "Paid/unpaid status tracking", "Weekly summary of outstanding amounts"],
    outcome: "Less time chasing payments and a clear view of what's pending — helping you recover dues faster.",
    timeline: "1–3 weeks",
    price: "From ₹9,799 setup + ₹3,499/month",
  },
  {
    slug: "sow-legal-documentation",
    icon: "file",
    title: "SOW & Legal Documentation",
    short: "Clear Statements of Work, project scope, deliverables, timelines, revision limits, payment terms, IP ownership, confidentiality, and cancellation terms.",
    what: "Clear, plain-language Statements of Work and project documentation so both sides know exactly what is being delivered.",
    who: "Every client we work with — and businesses that want clearer scope documents for their own projects.",
    included: ["Project objective and scope", "Deliverables, timeline and milestones", "Revision and change-request process", "Payment schedule and third-party costs", "IP ownership and confidentiality terms", "Cancellation and support terms"],
    outcome: "Fewer misunderstandings, clear expectations and smoother projects. (Template documentation — not legal advice.)",
    timeline: "Included before every project starts",
    price: "Included with every project · Standalone: [PLACEHOLDER: price]",
  },
];

export type Flow = { title: string; steps: string[] };
export const flows: Flow[] = [
  { title: "Lead qualification", steps: ["Lead comes in", "AI qualifies lead", "CRM updated", "WhatsApp follow-up sent"] },
  { title: "Payment recovery", steps: ["Invoice due", "Reminder sent", "Payment link shared", "Escalation if unpaid"] },
  { title: "Chatbot booking", steps: ["New enquiry", "AI chatbot responds", "Appointment booked", "Team notified"] },
  { title: "Content engine", steps: ["Content idea", "AI creates post", "Approval", "Scheduled across platforms"] },
  { title: "LinkedIn outreach", steps: ["Prospect identified", "Personalized outreach sent", "Reply tracked", "Meeting booked"] },
  { title: "AI cold calling", steps: ["Cold lead list", "AI voice agent calls", "Interested lead flagged", "Sales follow-up triggered"] },
];

export type Automation = { icon: IconName; title: string; problem: string; flow: string[]; tools: string[]; outcome: string; price: string };
export const automations: Automation[] = [
  { icon: "filter", title: "Lead qualification automation", problem: "Your team wastes time on enquiries that were never a fit, while good leads wait.", flow: ["Form, ad or chat lead arrives", "AI scores against your criteria", "Qualified lead routed to sales", "Others get a nurture message"], tools: ["Website forms", "Meta/Google lead forms", "OpenAI or similar LLM APIs", "CRM or Google Sheets"], outcome: "Sales time focused on the leads most likely to convert.", price: "From ₹14,699" },
  { icon: "message", title: "WhatsApp follow-up automation", problem: "Leads go cold because nobody followed up within the first few hours.", flow: ["New lead captured", "Instant WhatsApp welcome", "Timed follow-up sequence", "Reply alerts your team"], tools: ["WhatsApp Business API (via an approved provider)", "CRM or Google Sheets", "n8n, Make or Zapier"], outcome: "Every lead gets a fast, consistent follow-up.", price: "From ₹3,919" },
  { icon: "sheet", title: "CRM and Google Sheets automation", problem: "Data lives in five places and someone copies it manually every day.", flow: ["Event in one tool", "Data cleaned and mapped", "CRM / Sheet updated", "Team notified on changes"], tools: ["Google Sheets", "Zoho, HubSpot or similar CRMs", "Gmail / Outlook", "n8n, Make or Zapier"], outcome: "One reliable source of truth with less manual data entry.", price: "From ₹3,919" },
  { icon: "calendar", title: "Appointment booking automation", problem: "Back-and-forth messages to fix a time cost you bookings.", flow: ["Customer asks to book", "Chatbot checks availability", "Slot confirmed", "Reminders sent before visit"], tools: ["Google Calendar or Calendly", "Website or WhatsApp chatbot", "Email / WhatsApp reminders"], outcome: "Easier booking and fewer no-shows thanks to reminders.", price: "From ₹12,249" },
  { icon: "wallet", title: "Invoice and payment reminder automation", problem: "Chasing pending payments eats hours and strains client relationships.", flow: ["Invoice due date nears", "Polite reminder with payment link", "Follow-ups after due date", "Escalation to your team"], tools: ["Razorpay or similar payment links", "Accounting tool or Google Sheets", "WhatsApp, email and SMS"], outcome: "Consistent follow-up that helps you recover dues faster.", price: "From ₹9,799 setup + ₹3,499/month" },
  { icon: "megaphone", title: "Social media content automation", problem: "Posting is inconsistent because content creation always gets pushed to tomorrow.", flow: ["Topic or idea added", "AI drafts post + caption", "You approve or edit", "Scheduled across platforms"], tools: ["LLM APIs for drafting", "Canva or design templates", "Meta Business Suite / scheduling tools"], outcome: "A consistent posting rhythm with less effort.", price: "From ₹9,799/month" },
  { icon: "linkedin", title: "LinkedIn outreach automation", problem: "Manual prospecting and messaging doesn't scale beyond a few people a day.", flow: ["Prospect list built", "Personalized connection + DM", "Replies tracked", "Meeting booked"], tools: ["LinkedIn (within platform limits)", "Sales Navigator (optional)", "CRM or Google Sheets", "Calendar booking links"], outcome: "More relevant conversations with decision-makers, all tracked.", price: "From ₹12,249 setup + ₹4,899/month" },
  { icon: "phone", title: "Cold-call AI agent workflow", problem: "Your lead list is bigger than your team's calling capacity.", flow: ["Lead list uploaded", "AI voice agent calls", "Interest + summary logged", "Hot leads handed to sales"], tools: ["AI voice platforms", "Telephony provider", "CRM or Google Sheets"], outcome: "More leads reached, with humans calling back only the interested ones.", price: "From ₹24,499 setup + ₹6,999/month" },
  { icon: "cog", title: "Internal operations automation", problem: "Approvals, reports and handoffs depend on someone remembering to do them.", flow: ["Trigger: form, date or status", "Task created + assigned", "Approvals collected", "Report sent automatically"], tools: ["Google Workspace / Microsoft 365", "Slack or WhatsApp groups", "n8n, Make or Zapier"], outcome: "Fewer dropped balls and less time spent on status updates.", price: "From ₹3,919" },
  { icon: "sparkles", title: "Custom AI agent development", problem: "Your process is unique and off-the-shelf tools don't fit.", flow: ["Discovery + process audit", "Agent designed with guardrails", "Built + integrated with your stack", "Tested, monitored, improved"], tools: ["LLM APIs", "Your internal tools and databases", "Custom APIs and webhooks"], outcome: "An AI agent shaped around how your business actually works.", price: "Custom quote" },
];

export const processSteps = [
  { title: "Free AI Growth Call", text: "Understand the business, bottlenecks, and goals.", detail: ["30-minute call", "Your current tools and workflow", "Where time and leads are being lost"] },
  { title: "AI Opportunity Audit", text: "Identify what can be automated, built, or improved.", detail: ["Prioritized list of opportunities", "Effort vs. impact for each", "Recommended starting point"] },
  { title: "Scope & SOW", text: "Define deliverables, timeline, price, revisions, and ownership.", detail: ["Written Statement of Work", "Milestones and payment schedule", "Clear revision and change-request rules"] },
  { title: "Build & Integrate", text: "Develop the website, app, chatbot, or automation.", detail: ["Regular progress updates", "Integration with your existing tools", "Testing before launch"] },
  { title: "Launch, Train & Optimize", text: "Deploy, train the team, monitor results, and improve.", detail: ["Go-live support", "Team walkthrough and documentation", "Monitoring and optimization options"] },
];

export const trustRow = ["Websites", "Apps", "AI Chatbots", "Workflow Automation", "LinkedIn Outreach", "Cold-Call Agents", "Payment Follow-Ups"];

export const testimonials = Array.from({ length: 3 }, () => ({
  quote: "[PLACEHOLDER: Client quote about service experience]",
  name: "[PLACEHOLDER: Client Name]",
  business: "[PLACEHOLDER: Business Type]",
}));

export const formOptions = {
  businessTypes: ["Local business / Retail", "Clinic / Healthcare", "Real estate", "Education / Coaching", "E-commerce / D2C", "Agency / Consulting", "SaaS / Startup", "Manufacturing / B2B", "Other"],
  services: services.map((s) => s.title).concat("Not sure yet"),
  budgets: ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000", "Not sure yet"],
};

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  { q: "Are the prices on this site final?", a: "No. All prices are starting prices. Your final quote depends on scope, integrations, and complexity, and is confirmed in writing in the Statement of Work before work begins." },
  { q: "Are third-party costs included?", a: "No. Hosting, domain, WhatsApp Business API, OpenAI/API usage, SMS, calling minutes, and premium tools are billed separately by the respective providers." },
  { q: "Is GST included?", a: "GST will be added as applicable." },
  { q: "How does payment work?", a: "A 40–50% advance is required to begin projects, and the balance is due at milestones defined in your SOW. Retainers are billed in advance each month. Every project is covered by a signed Master Service Agreement and SOW." },
  { q: "Do retainers include new development?", a: "Retainers cover support and optimization, not unlimited new development. New features or systems are scoped and quoted separately." },
  { q: "Who owns the work after the project?", a: "Ownership of deliverables is defined in your SOW. Typically, ownership of custom deliverables transfers to you once full payment is received; third-party tools remain under their own licences." },
  { q: "Can you guarantee more leads or revenue?", a: "No one can honestly guarantee that. We build systems designed to save time and improve follow-up, and we agree on measurable deliverables in the SOW — but business outcomes depend on many factors outside our control." },
];
