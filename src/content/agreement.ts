// Client Agreement & Legal Policy content — adapted from the owner's freelance MSA draft.
// General template documentation, not legal advice. Values in [brackets] are filled per client.
import { site } from "./site";

export type Clause = { id: string; title: string; summary: string; p?: string[]; list?: string[] };

export const keyCommitments = [
  { label: "40–50% advance to start", href: "#clause-4" },
  { label: "IP transfers to you on full payment", href: "#clause-5" },
  { label: "Third-party tools in your name", href: "#clause-2" },
  { label: "2 revision rounds per milestone", href: "#clause-3" },
  { label: "15–30 day bug-fix warranty", href: "#clause-6" },
  { label: "DPDP-aware data handling", href: "#clause-7" },
  { label: "2-year confidentiality", href: "#clause-8" },
  { label: "15-day notice to terminate", href: "#clause-9" },
];

export type SignOff = { id: string; title: string; short: string; when: string; who: string; confirms: string[]; required: string };

export const signOffs: SignOff[] = [
  {
    id: "signoff-msa",
    title: "Master Service Agreement (MSA)",
    short: "Signed once. Sets the ground rules for every project we do together.",
    when: "Before the first project starts",
    who: "Authorised signatory of the client + Agentix One Solution",
    confirms: ["Payment terms, late fees and taxes", "IP ownership and confidentiality", "Third-party costs, warranty and termination"],
    required: "Required for all clients",
  },
  {
    id: "signoff-sow",
    title: "Statement of Work (SOW)",
    short: "Signed per project. Defines exactly what is delivered, when, and for how much.",
    when: "Before each project or milestone begins",
    who: "Client's approving decision-maker + Agentix One Solution",
    confirms: ["Scope, deliverables and exclusions", "Milestones, timeline and price", "Revision rounds and support period"],
    required: "Required for every project",
  },
  {
    id: "signoff-data",
    title: "Data & Platform Compliance Acknowledgement",
    short: "Confirms you have lawful consent to collect and message your customers.",
    when: "Before any chatbot, CRM, outreach, calling or e-commerce automation goes live",
    who: "Client's authorised signatory",
    confirms: ["Customer consent under the DPDP Act, 2023", "Responsibility for ad content and messaging volume", "Store policies and grievance officer details (e-commerce)"],
    required: "Required for automation & e-commerce projects",
  },
];

export const msaParties = {
  provider: `${site.legalEntity}, trading as ${site.name}, having its principal place of business at [PLACEHOLDER: Full address], Bengaluru, Karnataka, India ("Service Provider").`,
  client: `[Client Business Name], a [Proprietorship / Partnership / LLP / Pvt Ltd] having its registered office at [Client Full Address] ("Client").`,
};

export const msaClauses: Clause[] = [
  {
    id: "clause-1",
    title: "Scope of services",
    summary: "Work is defined in a signed SOW. Anything not listed is out of scope.",
    p: ["The Service Provider will perform website and app development, AI chatbot, social media content and/or workflow automation services as detailed in separate Statements of Work (SOW) or written quotations approved by both parties by signature or email. Any feature, integration or deliverable not explicitly listed in the SOW is out of scope and billed separately."],
  },
  {
    id: "clause-2",
    title: "Third-party tools, APIs & hosting",
    summary: "Domains, hosting, API and platform costs are paid directly by you, in your name.",
    list: [
      "Unless the SOW says otherwise, third-party costs — domain names, cloud hosting (e.g. Vercel, Netlify, AWS), app store developer accounts, paid plugins, AI usage (e.g. OpenAI), automation platforms (e.g. Make, Zapier, n8n) and the WhatsApp Business API — are paid directly by the Client using the Client's own payment method and accounts.",
      "The Service Provider is not responsible for interruptions caused by third-party API changes, rate limits, plan or tier changes, or payment failures on the Client's external accounts.",
    ],
  },
  {
    id: "clause-3",
    title: "Revisions & approvals",
    summary: "Up to 2 rounds of minor revisions per milestone; feedback within 3–5 business days.",
    list: [
      "Each milestone includes up to 2 rounds of minor revisions unless the SOW states otherwise. Further revisions or structural changes are billed at the rate stated in the SOW.",
      "Client feedback is due within 3–5 business days of each submission. Delays in feedback or in handing over content and assets extend the timeline accordingly.",
    ],
  },
  {
    id: "clause-4",
    title: "Fees, payment terms & taxes",
    summary: "40–50% advance for projects, retainers paid in advance, GST extra where applicable.",
    list: [
      "Fees are as set out in the approved SOW or invoice.",
      "Development projects: a 40–50% advance on signing, which is non-refundable once work is scheduled; the balance is due on staging approval, before live deployment and source-code handover.",
      "Monthly retainers: 100% payable in advance on or before the 1st of each billing month.",
      "Invoices are due within 7 days. Overdue amounts may attract interest at 1.5% per month, or the rate applicable under the MSMED Act, 2006 where it applies. Work or active automations may be paused if payment is delayed beyond 7 days.",
      "Fees exclude GST, which is added where applicable. If the Client deducts TDS under applicable income-tax law, the Client will deposit it on time and share the TDS certificate.",
    ],
  },
  {
    id: "clause-5",
    title: "Intellectual property",
    summary: "Custom work becomes yours once invoices are paid in full.",
    list: [
      "Consistent with the Copyright Act, 1957, custom code, designs and automation workflows remain the Service Provider's property until 100% of invoiced fees are received. On full payment, IP rights in custom deliverables transfer to the Client.",
      "The Service Provider keeps ownership of pre-existing code libraries, templates and generic automation frameworks, and grants the Client a non-exclusive licence to use them within the delivered project.",
    ],
  },
  {
    id: "clause-6",
    title: "Post-launch warranty & maintenance",
    summary: "15–30 days of bug fixes on the original scope; ongoing work via AMC or retainer.",
    p: ["The Service Provider provides a 15–30 day post-launch warranty (as specified in the SOW) to fix bugs within the original scope. Ongoing maintenance, OS/browser updates, third-party API breakages and new features require a separate Annual Maintenance Contract (AMC) or monthly retainer."],
  },
  {
    id: "clause-7",
    title: "Data privacy & platform compliance",
    summary: "You own your customer data and consent; we process it only to deliver the work.",
    list: [
      "Where the Service Provider configures lead capture, e-commerce checkout or CRM automations, it acts only as a data processor on the Client's behalf under the Digital Personal Data Protection Act, 2023. The Client confirms it has lawful consent to collect and message its customers.",
      "The Client indemnifies the Service Provider against account suspensions, restrictions or penalties imposed by Meta, Google, LinkedIn or WhatsApp that result from the Client's business practices, ad content or messaging volume.",
    ],
  },
  {
    id: "clause-8",
    title: "Confidentiality",
    summary: "Business data, credentials and API keys stay private — during and 2 years after.",
    p: ["Both parties keep all non-public business data, API keys, credentials and trade secrets strictly confidential during this Agreement and for 2 years after it ends."],
  },
  {
    id: "clause-9",
    title: "Termination & kill fee",
    summary: "15 days' written notice; completed work plus a 25% kill fee on fixed-price projects.",
    p: ["Either party may terminate this Agreement with 15 days' written notice. If the Client terminates a fixed-price project midway, the Client pays for all work completed up to the termination date plus a 25% kill fee on the remaining unbilled contract value."],
  },
  {
    id: "clause-10",
    title: "Governing law & jurisdiction",
    summary: "Indian law; courts in Bengaluru, Karnataka.",
    p: ["This Agreement is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka."],
  },
];

export const onboarding: { title: string; items: [string, string][] }[] = [
  {
    title: "A. Agreements, billing & identity",
    items: [
      ["Signed MSA & SOW", "Signed copy, or clear email approval, of the MSA and SOW."],
      ["Advance payment", "40–50% advance received."],
      ["Business legal name & address", "Exact registered name, billing address and PIN code for invoicing."],
      ["Tax & registration details", "PAN, GSTIN (if registered) and Udyam certificate (optional)."],
      ["One decision-maker", "Name, WhatsApp number and email of the single person who approves work."],
    ],
  },
  {
    title: "B. Domain & hosting (in your name)",
    items: [
      ["Preferred domain names", "Top 2–3 choices for a .in or .com domain."],
      ["Registrar access", "Your email and phone for OTPs, so the domain is registered under your ownership."],
      ["Existing logins", "Registrar or hosting access if you already own a domain."],
    ],
  },
  {
    title: "C. Branding & content",
    items: [
      ["Logo & colours", "High-resolution logo (PNG/SVG) and brand colours."],
      ["Business story & contact", "About text, address, Google Maps link, support phone and business email."],
      ["Product catalogue", "Google Drive folder with photos, names, prices, variants and stock status (per plan limit)."],
      ["Store policies (e-commerce)", "Return/exchange window, refund and shipping policy, and Grievance Officer details as required under the Consumer Protection (E-Commerce) Rules, 2020."],
    ],
  },
  {
    title: "D. Payments & automation access",
    items: [
      ["Payment gateway KYC", "Business PAN, cancelled cheque or bank statement, proprietor/director ID and GST/Udyam certificate for Razorpay."],
      ["WhatsApp Business number", "A dedicated number not linked to a personal WhatsApp app, for WhatsApp Business API."],
      ["Social admin access", "Partner/admin access to Facebook Page, Instagram professional account and Google Business Profile."],
    ],
  },
];

export const invoiceIncludes = [
  "Unique invoice number and the SOW it relates to",
  "Service description with SAC code",
  "GST shown separately, only where applicable",
  "Place of supply, PAN and registration details",
  "Due date, late-fee terms and TDS note",
  "Bank / UPI details — always quote the invoice number when paying",
];

export const signingSteps = [
  "Free AI growth call",
  "Proposal & draft SOW",
  "Sign MSA + SOW (e-sign or email approval)",
  "Advance invoice paid",
  "Onboarding checklist shared",
  "Project kickoff",
];
