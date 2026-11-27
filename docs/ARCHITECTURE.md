# Architecture — Frontend and Backend

## Overview

A statically generated Next.js 15 site (App Router) with **one** server endpoint (`/api/contact`) for the lead form. All pages except the thank-you page and the API are prerendered at build time; there is no database.

```
Browser ──► Vercel CDN (static pages, fonts, images)
   │
   └─ form submit ─► /api/contact (serverless function) ─► Resend API ─► business inbox
```

## Frontend

### Routes (`src/app`)

| Route | File | Purpose |
|---|---|---|
| `/` | `page.tsx` | Home: hero, services, automation flows, process, testimonials (placeholders), trust strip, FAQ, final CTA |
| `/services` | `services/page.tsx` | One detailed section per service: what, who, included, outcome, timeline, price, CTA |
| `/ai-automations` | `ai-automations/page.tsx` | 10 automation use cases: problem, flow, tools, outcome, price |
| `/pricing` | `pricing/page.tsx` | Website Plans A/B/C, app plan, chatbot / automation / retainer tables (stacked cards on phones), notes, FAQ |
| `/process` | `process/page.tsx` | 5-step process plus working principles |
| `/sow-legal` | `sow-legal/page.tsx` | SOW overview, what every SOW covers, links to legal pages |
| `/client-agreement` | `client-agreement/page.tsx` | MSA, 3 required sign-offs, key commitments, onboarding checklist, billing transparency, print button |
| `/client-sign-off` | `client-sign-off/page.tsx` | Read the MSA, SOW terms and Data & Platform Compliance Acknowledgement and accept all three online (no login, `noindex`, linked from `/client-agreement`) |
| `/admin`, `/admin/login` | `admin/*` | Private owner page: edit prices, set an offer banner, view and download signed agreements (`noindex`, blocked in robots.txt) |
| `/sow-template` | `sow-template/page.tsx` | Blank Statement of Work template |
| `/contact` | `contact/page.tsx` | Lead form, WhatsApp, email, phone, address, hours, LinkedIn, quick service links |
| `/contact/thank-you` | `contact/thank-you/page.tsx` | Result page for no-JavaScript form posts (`noindex`) |
| `/privacy-policy`, `/terms-and-conditions`, `/refund-cancellation-policy`, `/cookie-policy`, `/disclaimer` | one `page.tsx` each | Legal pages using `LegalPageLayout`, text from `content/legal.ts` |
| `404` | `not-found.tsx` | Custom not-found page |
| `/sitemap.xml`, `/robots.txt` | `sitemap.ts`, `robots.ts` | Generated; sitemap lists every public page |
| `/opengraph-image`, `/twitter-image`, `/icon.svg` | `opengraph-image.tsx`, `twitter-image.tsx`, `icon.svg` | Share image (generated with the logo) and favicon |

`layout.tsx` wraps every page with: skip-link, `Navbar`, `Footer`, `StickyMobileCTA`, `LeadModalProvider`, `RevealObserver`, and site-wide JSON-LD (Organization + WebSite). `template.tsx` adds the page fade-in on navigation.

### Components (`src/components`)

- **Layout:** `Navbar` (sticky, full-screen dark mobile menu, scroll-progress bar), `Footer`, `StickyMobileCTA` (hides near the footer and on `/contact`), `PageHeader`, `SectionHeading`, `CTASection`, `TrustStrip`
- **Hero:** `Hero`, `HeroCenterpiece` (3D robot + six floating cards; head follows pointer / touch)
- **Cards and content:** `ServiceCard`, `FlowCard`, `PricingCard`, `WebsitePlanCard`, `TestimonialCard`, `ProcessSteps`, `FAQ`, `Badge`, `Button`, `Icon`
- **Forms:** `ContactForm` (React Hook Form + Zod), `LeadModal` (native `<dialog>`; bottom sheet on phones) with `LeadButton`
- **Legal:** `LegalPageLayout`, `PrintButton`, `HighlightController` (click / hash highlighting on the agreement page)
- **Brand / utility:** `LogoMark`, `JsonLd`, `RevealObserver`

### Lead capture flow

Every "Book free call / Get a free AI growth plan / pricing CTA" uses `LeadButton`:

1. On pages other than `/contact` it opens the lead form in a modal (`LeadModal`), pre-selecting the relevant service.
2. On `/contact`, or with JavaScript off, it links to `/contact#lead-form`.
3. The form validates with Zod on blur, then POSTs JSON to `/api/contact`.
4. On success it shows: *"Thanks! Your AI Growth Plan request has been received. Our team will contact you within 24 hours."* (text from `site.contact.responseNote`, confirm before relying on it).

Form fields (all required): name, business name, WhatsApp number, email, business type, service needed, preferred call type (phone / WhatsApp / video), previous spend (tick each service already paid for and enter the ₹ amount, or tick "first time"), message.

### Hero robot interaction (the "poke" story)

Tapping (or pressing Enter on) the robot — an invisible button over it in `HeroCenterpiece.tsx`; the story logic is in `RobotCompanion.tsx` (`useRobotCompanion` + `RobotOverlay`). Each tap, **after the previous message was closed**, moves to the next scene; a 4th tap starts again from scene 1. Taps while a scene is still on screen only wiggle the robot.

| Tap | Haptics | What happens |
|---|---|---|
| 1 | 3 short pulses `[70,45,70,45,70]` | Robot shakes; speech bubble opens at once and types *"How can I help you moron"*, pauses 0.9 s, deletes *moron*, retypes *sir!* → **"How can I help you sir!"**, then *Book free call* / *WhatsApp* buttons |
| 2 | **none** | Bubble types *"I think you are impressed by my charm 😊 Ping me now on WhatsApp, we can talk more."* → a transparent purple heart inflates like a balloon for 2 s → bursts (ring + particles) → centred **WhatsApp pop-up** ("You got a heart!", *Ping on WhatsApp 💬* / *Maybe later*) |
| 3 | **one long 3 s vibration** `vibrate(3000)` | Robot shakes for 3 s while the bubble types *"Hey moron, don't keep on poking me! I will report your harassment to my master."* → joke **"Harassment report filed" pop-up** (clearly labelled as a joke) with *I'm sorry 🙏* (robot replies "Apology accepted, sir. 🤝") and *Talk to my master* (WhatsApp) |

Notes:
- **Vibration works on Android browsers only** (Chrome, Samsung Internet, Firefox). iPhones/Safari do not support web vibration, and some phones disable it in system settings; the visual story works everywhere. Closing a message cancels any running vibration (`vibrate(0)`).
- Pop-ups are native modal `<dialog>`s: centred on screen, focus kept inside, Esc or tapping outside closes. Messages type out with emoji kept whole; screen readers get one polite announcement per scene instead of every letter.
- Under reduced motion: no shake, the heart is shown still for 2 s, no burst; typing and pop-ups still work.
- To change wording or timing, edit the strings and `sleep()` values in `run()` in `RobotCompanion.tsx`.

### Motion

- Page fade (`template.tsx`), scroll-reveal with staggered delays (`RevealObserver`, `data-reveal` attribute), CSS scroll-progress bar, hero robot (CSS 3D, pointer-follow via a small `requestAnimationFrame` loop, no animation library), neon pulse, blink, floating cards, flow-line animations. The hero's endless animations pause while it is scrolled out of view (`.hero-paused`).
- **Everything respects `prefers-reduced-motion`.** Reveal hiding only applies when JavaScript has run and motion is allowed, so content is visible without JavaScript.

### SEO

- Unique title and description per page (`lib/seo.ts → pageMeta`), canonical URLs, Open Graph and Twitter cards.
- JSON-LD: `ProfessionalService` (Organization) and `WebSite` on every page, `Service` on `/services`, `FAQPage` on `/` and `/pricing`, `ContactPage` on `/contact`.
- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`. **Set it to the real domain**, otherwise canonical and share URLs point to the wrong address.

### Accessibility

Semantic landmarks and heading order, skip link, visible focus rings, labelled form fields with `aria-invalid` / `aria-describedby`, `role="status"` / `role="alert"` messages, 44 px minimum tap targets on phones, native `<dialog>` focus handling, descriptive link text (screen-reader-only context on "Explore service"), reduced-motion support, WCAG AA contrast.

## Backend

Two route handlers: `/api/contact` (lead form) and `/api/sign-off` (client sign-off).

### `/api/contact` — `src/app/api/contact/route.ts`

**Request:** `POST /api/contact` with JSON, or a regular form post (no-JavaScript fallback → redirects to `/contact/thank-you`).

**Validation:** `lib/lead-schema.ts` (Zod): name 2–80 chars, business 2–120, WhatsApp 10–15 digits (optional `+`, spaces, dashes), valid email, selections required, message 10–2000 chars.

**Spam protection:**
- Hidden honeypot field (`website`); any value silently drops the request.
- Timing check: submissions under 3 seconds after page load are silently dropped.
- Per-IP rate limit: 5 requests per 10 minutes. *This is kept in memory per serverless instance, so it is basic protection only. Add Vercel Firewall rules or a shared store (e.g. Upstash Redis) for stronger limits.*

**Delivery (Resend REST API, no SDK):**
- Needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Sends an HTML + text email with all fields (HTML-escaped), `reply_to` set to the visitor's email, subject `New lead: <business> — <service>`.
- In development without keys, the lead is logged to the server console.
- **In production without keys it returns an error to the visitor** (HTTP 502) so leads are never silently lost.

**Security headers** (`next.config.mjs`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, restrictive `Permissions-Policy`; `poweredByHeader` disabled.

### `/api/signoff` — `src/app/api/signoff/route.ts`

Records a client's acceptance of the three agreements. No client login and no list of records is ever shown to clients.

- **Form** (`components/SignOffForm.tsx`, schema in `lib/signoff-schema.ts`): full name (the typed name is the signature), WhatsApp number (10 digits are saved as `+91…`; 10–15 digits accepted), business address or place (min 3 characters), and four required checkboxes: MSA, Statement of Work, Data & Platform Compliance Acknowledgement, and a final "I accept the terms and sign". Same spam checks as the contact form (honeypot, 3-second timing, 5 requests / 10 minutes per IP).
- **Agreement text** lives in `src/content/signoff.ts` (owner-supplied, version `2026-11-24 v1`). The server computes a SHA-256 hash of the exact text plus the version and stores both with every sign-off. Change the text → bump `AGREEMENT_VERSION`.
- **Reference:** the server generates `AGX-YYYYMMDD-XXXXXX` (IST date + 6 random hex). The receipt shows reference, name, date and version, with copy and print.
- **Storage (both, best effort in parallel):**
  1. **Supabase** insert into `public.client_signoffs` via the REST API with the publishable key. Row-level security allows INSERT only (`supabase/migrations/`).
  2. **Email** to `CONTACT_TO_EMAIL` via Resend (needs the Resend variables).
- The request succeeds if at least one of the two worked. If both fail the visitor is told to use WhatsApp.
- **Record fields:** ref, created_at (signed at), full_name, whatsapp (normalised), address_or_place, accepted_msa / accepted_sow / accepted_dpa / accepted_terms, method (`typed-name`), agreement_version, agreement_hash, user_agent. IP addresses are **not** stored.
- **Viewing records:** only the owner, in the Supabase dashboard (project `agentix-one-solutions` → Table Editor → `client_signoffs`).
- **Google Sheet:** when copying records into the Drive sheet, use the column **"Business address or place"** for `address_or_place`.

No secrets are hard-coded anywhere; all come from environment variables.

### Admin (`/admin`)

Private page for the owner. Three tabs: **Pricing**, **Offers**, **Signed agreements**.

- **Sign-in:** the owner's email + password from Supabase Auth. `POST /api/admin/login` exchanges them with Supabase on the server; the tokens are kept only in `httpOnly`, `SameSite=Strict` cookies (`agx_at` 1 hour, `agx_rt` 7 days) and are never exposed to browser JavaScript. An expired access token is refreshed automatically (`/api/admin/refresh`). Login is rate limited (8 / 10 min per IP) and only `ADMIN_EMAIL` is accepted. Every admin route re-verifies the session with Supabase and checks the email; state-changing requests also require a same-origin request.
- **Database enforcement:** row-level security allows only the owner's email to write `site_content` or read/delete `client_signoffs` (`supabase/migrations/20261125_*`). Public visitors can read `site_content` only.
- **Pricing tab:** every price on the site has a stable id (`lib/pricing-overrides.ts`: website plans and estimates, app, chatbot / automation / retainer tables, Services and AI Automations page "starting price" lines). Saved values override the defaults in `src/content/*`; only values that differ from the defaults are stored, and the reset arrow restores a default. Edit features, plan descriptions and policy text in the code files (`src/content/pricing.ts`).
- **Offers tab:** one site-wide banner (`components/OfferBanner.tsx`, rendered in `layout.tsx`) with message, optional button (relative link or https URL only) and optional end date (India time). It hides itself after the end date.
- **Signed agreements tab:** latest 1,000 records, plus **Download CSV** (`/api/admin/signoffs-csv`, all records, Excel-friendly with BOM, times in IST, formula-safe). Columns: Reference, Signed at (IST), Name, WhatsApp, Business address or place, four acceptance columns, Signature method, Agreement version, Agreement hash.
- **Validation:** price fields cannot be empty; the offer needs a message when enabled, a button text and link together (or neither), a real calendar date, and a link that is a page on this site (`/…`, not `//…`) or `https://`. The editor warns when the end date has already passed.
- **Sign-out / outages:** sign-out also revokes the session at Supabase. A Supabase outage shows "The sign-in service is not reachable right now" instead of "wrong password".
- **How changes reach the site:** content is read from Supabase with a 60-second cache; saving in the admin also clears the cache immediately for Home, Pricing, Services and AI Automations. If Supabase is unreachable the site falls back to the defaults in code.
- **One-time setup:** create the admin user in Supabase (Authentication → Users → Add user, tick *Auto Confirm User*) and turn off *Allow new users to sign up*. See `docs/DEPLOYMENT.md`.

## Performance notes

Measured with Lighthouse (mobile, simulated slow 4G, production build): Performance **99 home / 96 pricing / 97 services / 96 contact**; Accessibility, Best Practices and SEO 100; CLS ≈ 0. What keeps it fast:

- No animation library: the hero uses a tiny `requestAnimationFrame` loop (Framer Motion was removed, about 85 KB less JavaScript on the home page).
- The lead form (React Hook Form + Zod) is loaded on demand: fetched in the background 4 s after load and mounted on first open (`LeadModal.tsx`).
- Fonts: Inter and Space Grotesk latin files are preloaded by `next/font/local` (`layout.tsx`). The ₹ sign comes from 1 KB ₹-only files in `src/app/fonts/` that load only on pages showing a price (`unicode-range`). Regenerate them with `pyftsubset <latin-ext woff2> --unicodes=U+20B9 --flavor=woff2`.
- `content-visibility: auto` on below-the-fold sections and long cards (`.page-enter > section`, `.cv-auto` in `globals.css`) skips layout and paint until they are near the viewport.
- Compositor-only animations (transform/opacity) for the pulsing flow nodes; no `backdrop-filter` on the header.
- Admin-edited prices are cached for 60 s and refreshed instantly on save.
- Database calls never hang a page: every Supabase / Resend request has a timeout (`src/lib/supabase-rest.ts`, 6 s default; 2.5 s for cached content reads), and the site falls back to code defaults. Note: free Supabase projects pause after a week of inactivity — restore the project in the Supabase dashboard if the admin page or sign-off form stops saving.
- `content-visibility` uses `contain-intrinsic-block-size` only (a single-value `contain-intrinsic-size` also fixes the *width* and made grid cards overflow on phones).
- Error pages: `src/app/error.tsx` and `src/app/global-error.tsx` show a friendly retry screen instead of a blank page.

Re-test after big changes: `npm run build`, start with `npm start`, then `npx lighthouse http://localhost:3000 --only-categories=performance`.

## Libraries (`package.json`)

`next`, `react`, `react-dom`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `@fontsource-variable/space-grotesk`, `@fontsource-variable/inter`. Dev: `typescript` 5, `tailwindcss` 3.4, `postcss`, `autoprefixer`, `eslint` 9 with `eslint-config-next`.

Notes: TypeScript is pinned to major 5 because TypeScript 6 broke the Next 15 build. Lucide has no LinkedIn icon, so a "network" icon is used for the LinkedIn services.
