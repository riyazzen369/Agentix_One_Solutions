# Agentix One Solution — Website

Marketing and lead-generation website for **Agentix One Solution**, an AI agency / freelancing studio in Bengaluru, Karnataka, India.

> Tagline: *AI Systems That Work While You Grow*
> Live site: **https://agentixonesolutions.vercel.app**
> Repository: https://github.com/riyazzen369/Agentix_One_Solutions

Everything needed to rebuild the site from scratch is in this repo: code, content, design system, brand files, reference documents and deployment notes.

## Documentation map

| Doc | What it covers |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Frontend (pages, components, motion, SEO, accessibility) and backend (contact API, validation, email) |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Colours, typography, shadows, components, hero robot, logo, motion and responsive rules |
| [`docs/CONTENT.md`](docs/CONTENT.md) | Where every piece of copy, price and legal text lives, plus the list of open placeholders |
| `/admin` | Private owner page (sign in with the Supabase admin user): edit prices, run an offer banner, download signed agreements as CSV |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel project settings, environment variables, domains, workflow and troubleshooting |
| [`docs/reference/`](docs/reference) | Owner-supplied source material: pricing plan image, logo reference, MSA / invoice / onboarding document |
| [`CLAUDE.md`](CLAUDE.md) | Short working notes for AI coding assistants |

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 3.4 · Framer Motion · Lucide icons · React Hook Form + Zod · Resend (email) and Supabase (client sign-off records), both via REST APIs · Fonts: Space Grotesk + Inter (self-hosted via Fontsource) · Hosted on Vercel.

## Rebuild the site locally

Requires Node.js 20 or newer (tested on Node 22) and npm.

```bash
git clone https://github.com/riyazzen369/Agentix_One_Solutions.git
cd Agentix_One_Solutions
npm install
cp .env.example .env.local     # then fill in values (see docs/DEPLOYMENT.md)
npm run dev                    # http://localhost:3000
```

Quality checks (run before every push):

```bash
npm run lint && npm run typecheck && npm run build
```

Production preview: `npm run build && npm start`.

## Repository map

```
src/app/            Pages (App Router), API route, sitemap, robots, icons, share image
src/components/     Reusable UI (navbar, footer, hero, cards, forms, logo, ...)
src/content/        All editable copy: site.ts, pricing.ts, legal.ts, agreement.ts
supabase/migrations/ Database SQL (client sign-off table)
src/lib/            Helpers: SEO/JSON-LD, form schema, logo geometry, class names
public/brand/       Logo files (SVG mark + PNG lockups on dark and yellow)
docs/               Architecture, design, content, deployment, reference material
tailwind.config.ts  Design tokens (colours, fonts, shadows)
next.config.mjs     Security headers
vercel.json         Pins the Vercel framework preset to Next.js
.env.example        Environment variables needed (names + safe example values)
```

## Working workflow

The team works **directly on `main`**. Every push to `main` is built and published automatically by Vercel to the live site (usually within a minute or two). There is no staging branch and no pull request step.

1. `git pull origin main`
2. Make changes, then run `npm run lint && npm run typecheck && npm run build`
3. `git add -A && git commit -m "..." && git push origin main`
4. Watch the build in the Vercel dashboard (Deployments tab).

## What is still open

See [`docs/CONTENT.md`](docs/CONTENT.md#open-placeholders) for the list of `[PLACEHOLDER]` values that need real business details, and [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#contact-form-email-setup-still-needed) for the one-time email setup that lets the contact form send leads.

## Legal notice

Legal and agreement pages are general template documentation. They have not been reviewed by a lawyer. For business-specific legal advice, consult a qualified legal professional.
