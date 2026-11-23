import { site } from "./site";

export type LegalSection = { h: string; p?: string[]; list?: string[] };
export type LegalDoc = { title: string; description: string; intro: string; sections: LegalSection[] };

const contactLine = `Contact us through the form on our Contact page${site.contact.email ? ` or at ${site.contact.email}` : " or at [PLACEHOLDER: business email]"}.`;

export const legalDocs = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How Agentix One Solution collects, uses, stores and protects personal information shared through this website.",
    intro: `This Privacy Policy explains how ${site.name} ("we", "us", "our") collects and uses personal information when you visit this website or contact us. We aim to handle personal data in line with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, to the extent applicable.`,
    sections: [
      { h: "Information we collect", list: ["Details you submit in our forms: name, business name, WhatsApp number, email, business type, service needed, budget range and message.", "Messages you send us by email or WhatsApp.", "Basic technical data such as browser type, device and pages visited, if analytics are enabled.", "Project information you share with us during an engagement."] },
      { h: "How we use your information", list: ["To respond to enquiries and prepare proposals or growth plans.", "To deliver, support and invoice services you engage us for.", "To improve our website and services.", "To meet legal, accounting and tax obligations."] },
      { h: "Consent and legal basis", p: ["By submitting a form you consent to us using your details to contact you about your enquiry. You may withdraw consent at any time by contacting us; this does not affect processing already carried out."] },
      { h: "Sharing of information", p: ["We do not sell your personal information. We share it only with service providers who help us operate (for example email delivery, hosting, CRM or messaging providers), with your consent, or where required by law. These providers process data under their own terms and privacy policies."] },
      { h: "Data retention", p: ["We keep enquiry data for as long as needed to respond and follow up, and project data for as long as needed to deliver services and meet legal obligations. [PLACEHOLDER: Specific retention period]"] },
      { h: "Security", p: ["We use reasonable technical and organisational measures to protect personal data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security."] },
      { h: "Your rights", list: ["Request access to the personal data we hold about you.", "Request correction or erasure of your data.", "Withdraw consent for further processing.", "Raise a grievance with our Grievance Officer."] },
      { h: "Grievance Officer", p: [site.grievanceOfficer] },
      { h: "Children", p: ["This website is not directed at children under 18, and we do not knowingly collect their personal data."] },
      { h: "Changes and contact", p: ["We may update this policy from time to time; the latest version will always be on this page.", contactLine] },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    description: "Terms governing use of the Agentix One Solution website and engagement of our website, app, AI chatbot and automation services.",
    intro: `These Terms & Conditions govern your use of this website and any services provided by ${site.name}. By using this website or engaging our services, you agree to these terms. Engagements are governed by our Master Service Agreement (see the Client Agreement page) and a written Statement of Work (SOW) for each project, which take priority over these terms where they differ.`,
    sections: [
      { h: "Services", p: ["We provide website and app development, AI chatbots, workflow automation, content automation, LinkedIn outreach systems, AI calling agents, payment follow-up systems and related documentation. The exact scope of any engagement is defined in the SOW."] },
      { h: "Quotes and pricing", list: ["Prices on this website are starting prices and may change based on scope, integrations and complexity.", "GST will be added as applicable.", "Third-party costs (hosting, domains, API usage, WhatsApp Business API, SMS, calling minutes, premium tools) are billed separately."] },
      { h: "Payments", p: ["A 40–50% advance is required to begin projects, with the balance due at milestones defined in the SOW. Monthly retainers are payable in advance on or before the 1st of each month. Invoices are due within 7 days; overdue amounts may attract interest as set out in our Client Agreement, and work or active automations may be paused if payment is delayed beyond 7 days."] },
      { h: "Client responsibilities", list: ["Provide accurate information, content, access and approvals on time.", "Ensure you have the rights to any content, data or brand assets you provide.", "Use automations, outreach and calling tools lawfully, including obtaining any required consent from your contacts and following applicable platform rules and telecom regulations."] },
      { h: "Revisions and change requests", p: ["Each plan includes the revision rounds stated in the SOW. Work outside the agreed scope is handled through a written change request and may affect price and timeline."] },
      { h: "Intellectual property", p: ["Unless the SOW states otherwise, ownership of custom deliverables transfers to the client after full payment. We retain ownership of pre-existing tools, code libraries and know-how, and may reference the project in our portfolio unless you ask us not to in writing. Third-party software remains subject to its own licence."] },
      { h: "AI and automation limitations", p: ["AI systems can produce inaccurate or unexpected outputs. We design workflows with reasonable safeguards, but we do not guarantee the accuracy of AI-generated content or specific business outcomes such as leads, sales or revenue. You remain responsible for reviewing outputs that affect your customers."] },
      { h: "Third-party platforms", p: ["Our work may depend on third-party platforms (for example WhatsApp, LinkedIn, Google, OpenAI, payment gateways). We are not responsible for their availability, pricing changes, policy changes or account restrictions they impose."] },
      { h: "Limitation of liability", p: ["To the maximum extent permitted by law, our total liability for any claim relating to a project is limited to the fees paid for that project. We are not liable for indirect or consequential losses, including lost profits or data."] },
      { h: "Confidentiality", p: ["Both parties will keep confidential information shared during an engagement private and use it only for the project."] },
      { h: "Governing law", p: ["These terms are governed by the laws of India. Courts at Bengaluru, Karnataka shall have jurisdiction, subject to any dispute-resolution process agreed in the SOW."] },
      { h: "Contact", p: [contactLine] },
    ],
  },
  "refund-cancellation-policy": {
    title: "Refund & Cancellation Policy",
    description: "How cancellations, refunds and retainer terminations work for Agentix One Solution projects and monthly services.",
    intro: "We want every project to start with clear expectations. This policy explains how cancellations and refunds are handled. The SOW for your project may include specific terms that take priority.",
    sections: [
      { h: "Before your project is scheduled", p: ["If you cancel after paying the advance but before your project has been scheduled, we will refund the advance less any non-refundable third-party costs already incurred. [PLACEHOLDER: Confirm refund % and processing time]"] },
      { h: "After work is scheduled or started", list: ["The advance is non-refundable once work is scheduled or started, as it covers planning, design and development time already committed.", "Completed milestones are billable, and work completed beyond paid milestones is invoiced pro-rata.", "If you cancel a fixed-price project midway, you pay for work completed plus a 25% kill fee on the remaining unbilled contract value, as set out in our Client Agreement."] },
      { h: "Monthly services and retainers", list: ["Monthly services can be cancelled with 15 days' written notice.", "Fees for the current billing month are not refundable.", "Setup fees for automation services are non-refundable once setup has started."] },
      { h: "Third-party costs", p: ["Payments made to third parties on your behalf (domains, hosting, API credits, WhatsApp Business API, SMS, calling minutes, premium tools) are not refundable by us."] },
      { h: "Cancellation by us", p: ["We may cancel an engagement if payments are significantly overdue, required inputs are not provided for an extended period, or the work would involve unlawful or unethical use. In that case we will invoice completed work and refund any unused advance for work not started."] },
      { h: "How to request", p: [`Send your request in writing with your project details. ${contactLine} Approved refunds are processed to the original payment method.`] },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "What cookies and similar technologies the Agentix One Solution website uses and how you can control them.",
    intro: "Cookies are small text files stored on your device by websites you visit. This policy explains how this website uses them.",
    sections: [
      { h: "Cookies we use", p: ["This website currently uses only technically necessary storage required for the site to function. We do not use advertising cookies. [PLACEHOLDER: Update this section if analytics or marketing tools are added]"] },
      { h: "Analytics", p: ["If we enable analytics (for example Google Analytics), it may set cookies to understand how visitors use the site in aggregate. We will update this policy and, where required, ask for your consent before setting non-essential cookies."] },
      { h: "Third-party links", p: ["Links to WhatsApp, LinkedIn or other platforms take you to services that set their own cookies under their own policies."] },
      { h: "Managing cookies", p: ["You can block or delete cookies in your browser settings. Blocking necessary cookies may affect how the site works."] },
      { h: "Contact", p: [contactLine] },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    description: "General information disclaimer for the Agentix One Solution website, pricing, AI services and template documentation.",
    intro: "The information on this website is provided for general information purposes only.",
    sections: [
      { h: "No guarantees", p: ["We do not guarantee specific results, including lead volume, sales, revenue, rankings, response rates or return on investment. Outcomes depend on many factors, including your market, offer, data quality and how systems are used."] },
      { h: "AI outputs", p: ["AI chatbots, voice agents and content tools can generate incorrect or incomplete information. Outputs should be reviewed, and systems should include human oversight where decisions affect customers."] },
      { h: "Pricing", p: ["All prices shown are starting prices. Final quotes depend on scope, integrations and complexity, and exclude GST and third-party costs unless stated otherwise. \"Regular market reference\" figures are approximate indicators, not quotes from other providers."] },
      { h: "Not legal, tax or financial advice", p: ["SOW templates, policies and documentation on this site are general templates. They are not legal, tax, compliance or financial advice and have not been reviewed for your specific situation. For business-specific legal advice, consult a qualified legal professional."] },
      { h: "Third-party tools", p: ["Names of third-party tools and platforms are used only to describe possible integrations. We are not affiliated with or endorsed by them unless stated."] },
      { h: "External links", p: ["We are not responsible for the content or practices of external websites linked from this site."] },
    ],
  },
} satisfies Record<string, LegalDoc>;

export type LegalSlug = keyof typeof legalDocs;

export const sowIncludes = [
  "Project objective",
  "Detailed scope of work",
  "Deliverables list",
  "Timeline and milestones",
  "Revision policy",
  "Client responsibilities",
  "Third-party tool costs",
  "Payment schedule",
  "Intellectual property ownership",
  "Confidentiality terms",
  "Cancellation and refund policy",
  "Support period",
  "Change-request process",
];

export const sowTemplate: LegalSection[] = [
  { h: "1. Parties", p: [`This Statement of Work ("SOW") is between ${site.legalEntity} ("Service Provider") and [CLIENT LEGAL NAME], [CLIENT ADDRESS] ("Client"). Date: [DATE]. Reference: [SOW NUMBER].`] },
  { h: "2. Project objective", p: ["[Describe the business goal, e.g. \"Launch a 6-page website with an AI chatbot that captures and qualifies enquiries.\"]"] },
  { h: "3. Scope of work", p: ["In scope:"], list: ["[Item 1]", "[Item 2]", "[Item 3]", "Out of scope: [List exclusions, e.g. content writing, paid ads, third-party subscriptions]"] },
  { h: "4. Deliverables", list: ["[Deliverable] — [Format / acceptance criteria]", "[Deliverable] — [Format / acceptance criteria]"] },
  { h: "5. Timeline and milestones", list: ["Milestone 1: [Discovery & design] — [Date / working days]", "Milestone 2: [Build & integration] — [Date / working days]", "Milestone 3: [Testing & launch] — [Date / working days]", "Timelines assume timely client inputs and approvals."] },
  { h: "6. Revision policy", p: ["[Number] revision rounds are included per milestone. A revision round is one consolidated set of feedback. Additional revisions are billed at [RATE]."] },
  { h: "7. Client responsibilities", list: ["Provide content, brand assets, access credentials and approvals within [X] working days of request.", "Nominate one point of contact for feedback.", "Obtain consent required for messaging, outreach or calling contacts."] },
  { h: "8. Third-party tool costs", p: ["The following are billed separately and paid by the Client directly or reimbursed: [hosting, domain, WhatsApp Business API, LLM/API usage, SMS, calling minutes, premium tools]."] },
  { h: "9. Payment schedule", list: ["40–50% advance on signing: ₹[AMOUNT]", "[X]% on [milestone]: ₹[AMOUNT]", "Balance on launch: ₹[AMOUNT]", "GST as applicable. Payment due within [X] days of invoice."] },
  { h: "10. Intellectual property", p: ["On receipt of full payment, ownership of custom deliverables transfers to the Client. The Service Provider retains pre-existing tools, libraries and know-how and grants the Client a licence to use them as part of the deliverables. Third-party components remain under their own licences."] },
  { h: "11. Confidentiality", p: ["Each party will keep the other's confidential information private and use it only for this project, during the engagement and for [X] years after."] },
  { h: "12. Cancellation and refunds", p: ["Governed by the Service Provider's Refund & Cancellation Policy unless stated otherwise here: [Specific terms]."] },
  { h: "13. Support period", p: ["[X] days of post-launch support for bug fixes related to the agreed scope. Ongoing support is available through a retainer."] },
  { h: "14. Change-request process", p: ["Changes to scope are requested in writing, estimated by the Service Provider, and begin only after written approval of the revised cost and timeline."] },
  { h: "15. Acceptance and signatures", list: ["Service Provider: Name ______  Signature ______  Date ______", "Client: Name ______  Signature ______  Date ______"] },
];
