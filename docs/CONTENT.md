# Content Guide

All copy, prices and legal text are **data files**, not hard-coded in pages. Edit the file, push to `main`, and Vercel republishes.

| File | What it controls |
|---|---|
| `src/content/site.ts` | Business name, tagline, contact details, hours, LinkedIn link, navigation, 8 services, 6 home flows, 10 automation use cases, process steps, testimonials (placeholders), form options, FAQs |
| `src/content/pricing.ts` | Website Plans A/B/C, app plan, chatbot / automation / retainer tables, pricing notes |
| `src/content/legal.ts` | Privacy, Terms, Refund & Cancellation, Cookie, Disclaimer, SOW template, "what every SOW covers" |
| `src/content/agreement.ts` | Client Agreement page: key commitments, 3 sign-offs, 10 MSA clauses, onboarding checklist, invoice list |

Contact values are read from environment variables (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`) so they can change without touching code. Phone display (`+91 99427 21263`) is derived from the WhatsApp number.

## Business details currently published

| Item | Value |
|---|---|
| Business | Agentix One Solution — AI agency / freelancing studio |
| Tagline | AI Systems That Work While You Grow |
| Location | Bengaluru, Karnataka, India |
| Email | md.riyazzen369@gmail.com |
| Phone / WhatsApp | +91 99427 21263 |
| Business hours | 9:00 AM – 9:00 PM IST (days not specified) |
| LinkedIn | https://www.linkedin.com/in/mohamed-riyaz-s-8458891b1 (the only social link) |

## Services (8)

1. Website & App Development 2. Workflow Agent Automation 3. Social Media Content Automation 4. LinkedIn Automation & Outreach 5. AI Chatbots 6. Cold Call AI Agent 7. Payment Follow-Up Agent 8. SOW & Legal Documentation

Each has: what it is, who it is for, what is included, business outcome, typical timeline, starting price, custom-quote CTA. Timelines other than the website plans are estimates and should be confirmed against delivery capacity.

## Pricing (all prices are **starting prices**, GST extra)

Standard line shown with prices: *"Starting price. Final quote depends on scope, integrations, and complexity."*

**Website plans** (source: `docs/reference/pricing-plans-reference.png`)

| Plan | Price | Target | Key inclusions | Payments | Admin | Item limit | Est. first-year total* |
|---|---|---|---|---|---|---|---|
| Plan A — Basic catalogue & enquiries | ₹6,000 | Small business catalogue + WhatsApp/Instagram enquiries | Up to 5 pages, gallery, WhatsApp/Instagram buttons, basic SEO, 1 month support | Not included | Not included (static) | 15 displayed | ₹6,800 – ₹8,000 |
| **Plan B — Complete online store** (recommended) | ₹9,999 | Fully functional store + payments | Home, Shop, Product, About, Contact & Policies, simple admin, WhatsApp order alerts, Razorpay, basic SEO, analytics, 1 month support | Razorpay | Simple admin + handover | 20 uploaded | ₹10,799 – ₹12,000 |
| Plan C — Advanced e-commerce & CMS | ₹12,000 | Orders/payments + advanced admin | Everything in B + expanded admin, 3 months support | Razorpay | Advanced + handover | 30 uploaded | ₹12,800 – ₹14,000 |

\*First year, with a .in domain and free hosting. Separately billable: .in domain ₹800–1,000 (1st year), .com ₹1,300–1,500 (1st year); hosting free on Vercel/Netlify until limits are exceeded; annual renewals (domain, email) apply.

**All other services are priced 30% below the original brief** (rounded to the nearest rupee). This reduction was applied on the owner's instruction; it was not validated against market research.

| Item | Price |
|---|---|
| App development | from ₹19,599 (up to 5 core screens, 3–6 weeks) |
| Website AI Chatbot / WhatsApp AI Chatbot / Advanced AI Chatbot | ₹12,249 / ₹7,349 / ₹17,149 |
| Single workflow / multi-step workflow automation | ₹3,919 / ₹14,699 |
| Social media content automation | ₹9,799 / month |
| LinkedIn outreach system | ₹12,249 setup + ₹4,899 / month |
| Cold call AI agent | ₹24,499 setup + ₹6,999 / month |
| Payment follow-up agent | ₹9,799 setup + ₹3,499 / month |
| AI Support / Growth / AI Operations retainers | ₹4,899 / ₹9,799 / ₹17,149 per month |

**Pricing notes shown on the site:** starting prices may change with scope; third-party costs (hosting, domain, WhatsApp Business API, OpenAI/API usage, SMS, calling minutes, premium tools) are billed separately; GST added as applicable; a 40–50% advance is required to begin projects with the balance at milestones, retainers billed in advance; retainers cover support and optimisation, not unlimited new development; enterprise systems, marketplaces, complex SaaS and multi-agent systems are quoted separately.

## Legal and agreement content

Source document: `docs/reference/Indian_Freelance_MSA_Invoice_and_Onboarding_Checklist.docx` (MSA, invoice template, onboarding checklist). It is adapted into `agreement.ts` and the legal pages.

Key commercial terms (kept consistent across Terms, Refund policy, SOW template, FAQ and pricing notes):

- 40–50% advance to start; balance at milestones; retainers 100% in advance by the 1st
- Invoices due in 7 days; late interest 1.5%/month (or the MSMED Act rate); work may pause after 7 days
- 2 rounds of minor revisions per milestone; feedback within 3–5 business days
- Custom IP transfers on full payment; pre-existing tools stay with the provider
- 15–30 day post-launch warranty for bugs in original scope
- Data processor role under the DPDP Act, 2023; client confirms lawful consent; platform-penalty indemnity
- Confidentiality for 2 years after termination
- 15 days' written notice; 25% kill fee on remaining value for fixed-price projects terminated midway
- Governing law: India; courts in Bengaluru, Karnataka
- Third-party tools and accounts are paid for and owned by the client

Deliberately **not** published: bank details, UPI ID, PAN, Udyam number, SAC codes (these belong in the private invoice template). The TDS section reference was replaced by "applicable income-tax law" because thresholds have changed; confirm with a CA.

Every legal page carries: *"This website provides general information and template documentation. For business-specific legal advice, consult a qualified legal professional."*

## Content rules (keep following these)

- Never invent client names, testimonials, case studies, awards, certifications, metrics or contact details — use `[PLACEHOLDER]`.
- No guarantees (leads, revenue, ROI, accuracy) and no "best agency" claims.
- Confident, direct, benefit-led copy; avoid vague phrases ("cutting-edge", "digital transformation").
- Keep prices and policy wording identical wherever they appear.

## Open placeholders

Search the code for `PLACEHOLDER` to find them all. Currently open:

| Placeholder | Where |
|---|---|
| Registered business / legal entity name | `site.ts` (`legalEntity`), agreement parties |
| GSTIN (if registered) | `site.ts` (`gstin`) |
| Grievance Officer name, email, address | `site.ts` (`grievanceOfficer`), Privacy Policy |
| Effective date of policies | `site.ts` (`effectiveDate`) |
| Business full address (agreement) | `agreement.ts` (`msaParties.provider`) |
| Authorised signatory name and PAN | `client-agreement/page.tsx` signature block |
| Standalone SOW price | `site.ts` (service 8 price) |
| Data retention period | `legal.ts` (Privacy Policy) |
| Refund percentage and processing time | `legal.ts` (Refund policy) |
| Three client testimonials | `site.ts` (`testimonials`) — add only real, permitted quotes |
| Business days (hours currently show times only) | `site.ts` (`hours`) |
| "Within 24 hours" reply promise | `site.ts` (`responseNote`) — confirm you can honour it |
| Analytics note in Cookie Policy | `legal.ts` — update if analytics are added |
