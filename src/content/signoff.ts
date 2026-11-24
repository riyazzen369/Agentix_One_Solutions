// Text shown on /client-sign-off. Adapted from the owner's freelance MSA draft and the
// published Client Agreement page. General template documentation, not legal advice.
// DRAFT: replace the wording here with the owner-approved handoff text when available.
// Changing any text changes AGREEMENT_VERSION's hash automatically (computed on the server).
import { createHash } from "node:crypto";
import { msaClauses } from "./agreement";
import { sowIncludes } from "./legal";

export const PROVIDER = {
  name: "Mohamed Riyaz S",
  trading: "Agentix One Solution",
  place: "Bengaluru, Karnataka, India",
};

export const AGREEMENT_VERSION = "2026-11-24-v1";

export type SignDoc = {
  id: "msa" | "sow" | "data";
  title: string;
  summary: string;
  intro?: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
};

const providerLine = `${PROVIDER.name}, trading as ${PROVIDER.trading}, ${PROVIDER.place} ("Service Provider")`;

export const signDocs: SignDoc[] = [
  {
    id: "msa",
    title: "Master Service Agreement (MSA)",
    summary: "The standing terms for every project: payment, IP, warranty, confidentiality, termination and governing law.",
    intro: `This Agreement is between ${providerLine} and the person or business signing on this page ("Client"). Project-specific scope and amounts are set in each Statement of Work (SOW) or written quotation and are not repeated here.`,
    sections: msaClauses.map((c, i) => ({ h: `${i + 1}. ${c.title}`, p: c.p, list: c.list })),
  },
  {
    id: "sow",
    title: "Statement of Work (SOW) terms",
    summary: "How every project is scoped, changed and approved in writing before work begins.",
    intro: "These terms apply to every project. The specific scope, deliverables, timeline and price of each project are written in its own SOW, which you will receive separately.",
    sections: [
      { h: "1. Written scope first", p: ["No project begins until a written SOW or quotation has been agreed by email or signature. Anything not listed in the SOW is out of scope and quoted separately."] },
      { h: "2. What each SOW covers", list: sowIncludes },
      { h: "3. Client responsibilities", list: ["Provide content, brand assets, access and approvals within the times stated in the SOW.", "Nominate one point of contact for feedback and approvals.", "Register domains, hosting and third-party accounts in the Client's own name where the SOW requires it."] },
      { h: "4. Change requests", p: ["Changes to scope are requested in writing, estimated by the Service Provider, and begin only after the Client approves the revised cost and timeline in writing."] },
      { h: "5. Revisions and support", p: ["Each milestone includes the revision rounds stated in the SOW. Post-launch support lasts for the period stated in the SOW; ongoing work needs a separate maintenance agreement or retainer."] },
    ],
  },
  {
    id: "data",
    title: "Data & Platform Compliance Acknowledgement",
    summary: "Confirms you have lawful consent to collect and message your customers and follow platform rules.",
    sections: [
      { h: "1. Roles", p: ["Where the Service Provider configures lead capture, e-commerce checkout, CRM, chatbot, outreach or calling automations, it acts only as a data processor on the Client's behalf under the Digital Personal Data Protection Act, 2023. The Client is responsible for the personal data of its own customers."] },
      { h: "2. Consent", p: ["The Client confirms it has obtained, or will obtain, lawful consent to collect, store and message its customers, and will honour opt-outs and any applicable do-not-disturb requirements for calls, SMS, WhatsApp and email."] },
      { h: "3. Platform rules", p: ["The Client will follow the rules of the platforms used (for example Meta, Google, LinkedIn and WhatsApp). The Client is responsible for its ad content and messaging volume and indemnifies the Service Provider against account suspensions, restrictions or penalties that result from the Client's business practices."] },
      { h: "4. Store policies (e-commerce projects)", p: ["For online stores, the Client supplies its own return, refund and shipping policies and grievance officer details as required by the Consumer Protection (E-Commerce) Rules, 2020."] },
      { h: "5. AI outputs", p: ["AI chatbots, voice agents and content tools can produce inaccurate or unexpected output. The Client will review outputs that affect its customers and keep human oversight where decisions matter."] },
    ],
  },
];

// Hash of the exact text shown, recomputed on the server so it cannot be forged by the browser.
export const AGREEMENT_HASH = createHash("sha256")
  .update(JSON.stringify({ v: AGREEMENT_VERSION, provider: PROVIDER, docs: signDocs }))
  .digest("hex");
