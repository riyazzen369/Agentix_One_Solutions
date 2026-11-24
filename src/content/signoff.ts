// Text shown on /client-sign-off — supplied by the owner (handoff, version "2026-11-24 v1").
// General documentation, not legal advice. Changing any text below changes AGREEMENT_HASH
// automatically; also bump AGREEMENT_VERSION when the wording changes.
import { createHash } from "node:crypto";

export const PROVIDER = {
  name: "Mohamed Riyaz S",
  trading: "Agentix One Solution",
  place: "Bengaluru, Karnataka, India",
};

export const AGREEMENT_VERSION = "2026-11-24 v1";

export type SignSection = { h: string; p?: string[]; list?: string[]; after?: string[] };
export type SignDoc = {
  id: "msa" | "sow" | "dpa";
  title: string;
  summary: string;
  preamble: string[];
  sections: SignSection[];
  accept: string;
};

export const signDocs: SignDoc[] = [
  {
    id: "msa",
    title: "Master Service Agreement",
    summary: "Signed once. Sets the ground rules for every project we do together.",
    preamble: [
      "Service Provider: Mohamed Riyaz S, Bengaluru, Karnataka, India.",
      "Client: the person who signs off on this page, on behalf of their business.",
      "This is general documentation, not legal advice. The Client may take independent advice before signing.",
    ],
    sections: [
      { h: "1. Scope of services", p: ["The Service Provider provides website design, development, hosting set-up and related support as described in a project Statement of Work (SOW) or a written quotation approved by both parties, including by email or WhatsApp message. Anything not listed there is out of scope and quoted separately."] },
      {
        h: "2. Third-party accounts, tools and hosting",
        list: [
          "The website runs on third-party services such as GitHub Pages, a managed database and storage service, a domain registrar and WhatsApp. Paid plans and renewals for these are paid by the Client directly, unless the SOW says otherwise.",
          "Accounts holding the Client's business data are held in, or transferred into, the Client's name as set out in the SOW.",
          "The Service Provider is not responsible for outages, policy or price changes, API changes, rate limits or unpaid renewals on third-party services.",
        ],
      },
      {
        h: "3. Revisions and approvals",
        list: [
          "Each milestone includes up to two (2) rounds of minor revisions. Further revisions or structural changes are quoted separately.",
          "The Client gives feedback within three to five (3–5) business days of each submission. Late feedback or content moves the timeline by the same time.",
          "The Client names one approving decision-maker. Written approval from that person, including by email or WhatsApp, counts as approval.",
        ],
      },
      {
        h: "4. Fees and payment",
        list: [
          "Fees are as agreed in the SOW or quotation. An advance is payable before work starts and is non-refundable once work is scheduled. The balance is due on approval of the preview version and before the live launch and handover of access.",
          "Invoices are due within seven (7) days. Overdue amounts may carry interest at the rate stated in the invoice, or the rate under the MSMED Act, 2006 where it applies. Work may pause if payment is more than seven (7) days late.",
          "Fees exclude GST, which is added where applicable. If the Client deducts TDS, the Client deposits it on time and shares the certificate.",
        ],
      },
      {
        h: "5. Intellectual property",
        list: [
          "Custom code and designs made for the Client remain the Service Provider's property until all invoiced fees are received. On full payment, rights in those custom deliverables pass to the Client.",
          "The Service Provider keeps ownership of pre-existing code, templates, tools and frameworks, and grants the Client a non-exclusive, perpetual licence to use them as part of the delivered website.",
          "The Client keeps ownership of its brand name, logos, product photographs, text, prices and customer data, and confirms it has the right to use everything it supplies.",
          "The Service Provider may show the project in its portfolio unless the Client objects in writing.",
        ],
      },
      { h: "6. Post-launch warranty and maintenance", p: ["The Service Provider fixes bugs within the agreed scope for the warranty period stated in the SOW at no extra charge. Ongoing maintenance, browser and system updates, third-party breakages and new features need a separate maintenance plan."] },
      { h: "7. Data protection", p: ["Where the website or its admin tools store or process personal data for the Client, the Service Provider acts only as a data processor and the Client is the data fiduciary under the Digital Personal Data Protection Act, 2023, as set out in the Data and Platform Compliance Acknowledgement below. Each party keeps reasonable safeguards over the login details and keys it holds."] },
      { h: "8. Confidentiality", p: ["Each party keeps the other's non-public business information, credentials, keys and trade secrets confidential during this Agreement and for two (2) years after it ends, except where the law requires disclosure."] },
      { h: "9. Limitation of liability", p: ["Except for fraud or wilful misconduct, each party's total liability under this Agreement is limited to the fees paid under the SOW behind the claim in the twelve (12) months before it. Neither party is liable for indirect or consequential loss, including lost profit or lost sales."] },
      { h: "10. Termination", p: ["Either party may end this Agreement with fifteen (15) days' written notice, including by email or WhatsApp. If the Client ends a fixed-price project midway, the Client pays for work completed to that date, plus a fee on the remaining unbilled value as stated in the SOW. On termination the Service Provider hands over the access and files the Client has paid for."] },
      { h: "11. Governing law and disputes", p: ["This Agreement is governed by the laws of India. The parties first try to settle any dispute in good faith. Failing that, the courts at Bengaluru, Karnataka have exclusive jurisdiction."] },
      { h: "12. General", p: ["This Agreement, each SOW and the Data and Platform Compliance Acknowledgement are the whole agreement between the parties. Changes must be in writing and agreed by both. Electronic acceptance on this page is as valid as a handwritten signature."] },
    ],
    accept: "I have read and accept the Master Service Agreement.",
  },
  {
    id: "sow",
    title: "Statement of Work",
    summary: "Signed per project. Defines what is delivered and when.",
    preamble: [
      "Project: The Godfather Menswear website.",
      "Service Provider: Mohamed Riyaz S, Bengaluru. Client: the person who signs off on this page.",
      "Governed by the Master Service Agreement above. Prices and payment dates are agreed in the written quotation or invoice for this project.",
    ],
    sections: [
      { h: "1. Project summary", p: ["A mobile-first, cinematic website for The Godfather Menswear: a rainy-night storefront with the host \"Lorenzo\", a private Elite Wardrobe, a full Attire Collection and a simple admin page so the Client can add and update products without a developer."] },
      {
        h: "2. Deliverables",
        list: [
          "Storefront and entry: gate and logo entry, storefront scene with Lorenzo, a time-of-day greeting, two ways in (The Godfather Attire Collection and The Godfather Elite Wardrobe), the top menu (Collections, Visit, Contacts, Elite wardrobe) and a 2D fallback for devices without 3D.",
          "Elite Wardrobe: a private-room walk-in and a slide showcase of up to twelve (12) pieces, a detail panel for each piece, an \"Enquire on WhatsApp\" button, and a last slide that invites the visitor to explore the Attire Collection, with contact buttons.",
          "The Godfather Attire Collection: a grid of all pieces with category filters, a detail panel for each piece, and an \"Enter the Elite Wardrobe\" link.",
          "Contacts: WhatsApp, call and map-directions links using the Client's details.",
          "Admin page and live catalogue: a private sign-in page where the Client adds, edits, publishes or hides products, uploads front and back photos (resized, framed and optimised automatically) and previews the flip view. Changes appear on the website within seconds. One admin login is created for the Client.",
          "Hosting and set-up: the website published on the agreed address, with catalogue data and images kept in a managed database and storage project in India (Mumbai region).",
          "Quality: mobile and desktop layouts, keyboard and reduced-motion accessibility, and a performance and error check before launch.",
          "Handover: admin login, a short written guide and a walkthrough call of up to sixty (60) minutes.",
        ],
      },
      {
        h: "3. Out of scope (quoted separately if wanted)",
        list: [
          "Online payments, shopping cart, checkout, order management or stock control.",
          "Product photography, model shoots, copywriting beyond the supplied text, or logo design.",
          "Buying a custom domain, paid hosting or paid platform plans.",
          "Search-engine marketing, advertising, social media management or WhatsApp automation.",
          "Extra languages, extra admin users, or new sections not listed above.",
        ],
      },
      {
        h: "4. Client responsibilities",
        list: [
          "Supply the logo, brand colours, shop address, map link, phone and WhatsApp number, and the product details and prices to show.",
          "Confirm that all photographs, names and brand marks supplied are the Client's to use, and that any AI-generated images used are acceptable.",
          "Give feedback within 3–5 business days and keep admin login details private.",
          "Pay platform plans and renewals directly.",
        ],
      },
      {
        h: "5. Milestones",
        list: [
          "Kick-off: agreements signed, content checklist shared.",
          "Preview: a working preview link for review.",
          "Approval and launch: live website, admin login and handover.",
        ],
        after: ["Dates move day for day if the Client's feedback or content is late."],
      },
      {
        h: "6. Revisions, acceptance and warranty",
        list: [
          "Two (2) rounds of minor revisions per milestone. Extra work is quoted separately.",
          "The website is accepted when the Client approves the preview in writing, or uses it live for seven (7) days without raising a written issue.",
          "A thirty (30) day post-launch bug-fix warranty applies within the scope above.",
        ],
      },
      {
        h: "7. Accounts, ownership and handover",
        list: [
          "Accounts that hold the Client's website, database and images (code repository, hosting, database and storage project, domain) are set up so the Client is the owner. Where they start under the Service Provider's accounts, they are transferred to the Client within seven (7) days of final payment.",
          "Until the transfer, the Service Provider keeps the website running and does not delete or withhold the Client's data.",
        ],
      },
      { h: "8. Support after the warranty", p: ["An optional maintenance plan can be agreed separately. It is not included unless agreed in writing."] },
    ],
    accept: "I have read and accept the Statement of Work.",
  },
  {
    id: "dpa",
    title: "Data & Platform Compliance Acknowledgement",
    summary: "Confirms you have lawful consent to collect and message your customers.",
    preamble: ["Accepted by the Client before the website goes live. General documentation, not legal advice."],
    sections: [
      {
        h: "1. What data the website holds",
        list: [
          "Catalogue data: product names, descriptions, prices, colours and photographs, kept in a managed database and file storage in India (Mumbai region).",
          "Admin account data: the email address and an encrypted password of each admin user.",
          "Enquiries: the website has no sign-up form or shopping cart. A visitor who taps WhatsApp or Call leaves the website and shares their own details directly with the Client on that third-party platform or phone network.",
          "Technical data: basic hosting logs kept by the hosting provider.",
        ],
        after: ["If the Client later adds forms, a newsletter, payments, a chatbot or WhatsApp automation, this Acknowledgement is updated first."],
      },
      { h: "2. Roles under the Digital Personal Data Protection Act, 2023", p: ["The Client is the data fiduciary for any personal data collected through its business, including enquiries received on WhatsApp, by phone and in store. The Service Provider acts only as a data processor, and only to build, run and support the website as set out in the SOW."] },
      {
        h: "3. The Client confirms that",
        list: [
          "it has lawful consent, or another lawful basis, to collect, store and message the customers it contacts, and will honour requests to stop messaging or to delete data;",
          "it will publish a privacy notice, and the name and contact of a grievance officer where the law requires, and will give the Service Provider the text to place on the website;",
          "it has the right to use every photograph, name, logo and brand mark it supplied, including the name and look of \"The Godfather\", and takes responsibility for any third-party rights claim about them;",
          "it understands that some product and scene images on the website may be AI-generated or edited, approves their use, and will tell customers where the law requires;",
          "it is responsible for the accuracy of prices, descriptions, offers and delivery promises on the website, and for its messaging volume, content and conduct on WhatsApp, Meta, Google and other platforms, and will follow their rules;",
          "it will not share admin login details, and will tell the Service Provider promptly if a login or device is lost or misused.",
        ],
      },
      {
        h: "4. The Service Provider will",
        list: [
          "process personal data only on the Client's instructions and for the purposes in the SOW;",
          "keep admin access to named users, protect keys and credentials, and never place secret keys in the public website;",
          "keep the database and storage in India unless the Client agrees to a change in writing;",
          "tell the Client without undue delay, and within seventy-two (72) hours where possible, after becoming aware of a personal data breach affecting the Client's data;",
          "on request or at the end of the engagement, hand over or delete the Client's data and confirm in writing, except what the law requires it to keep.",
        ],
      },
      { h: "5. Backups and retention", p: ["Catalogue data and images are backed up by the database provider on its standard schedule. Admin accounts are kept until the Client asks for their removal or the engagement ends."] },
      { h: "6. Indemnity", p: ["The Client covers the Service Provider against loss arising from the Client's business practices, supplied content or messaging, or breach of this Acknowledgement, including account suspensions or penalties imposed by platforms or authorities because of them. The Service Provider covers the Client against loss caused by the Service Provider's breach of section 4. Each party's liability is subject to the limit in the Master Service Agreement."] },
      { h: "7. Duration", p: ["This Acknowledgement applies for as long as the Service Provider holds or processes the Client's data. Its confidentiality and deletion terms continue after the engagement ends."] },
    ],
    accept: "I have read and accept the Data & Platform Compliance Acknowledgement.",
  },
];

export const TERMS_ACCEPT = "I accept the terms and sign.";

// Hash of the exact text shown, recomputed on the server so it cannot be forged by the browser.
export const AGREEMENT_HASH = createHash("sha256")
  .update(JSON.stringify({ v: AGREEMENT_VERSION, provider: PROVIDER, docs: signDocs }))
  .digest("hex");
