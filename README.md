# Agentix One Solution — Website

Marketing site for Agentix One Solution (AI agency, Bengaluru). Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, React Hook Form + Zod.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```
Checks: `npm run lint`, `npm run typecheck`.

## Editing content
All copy, services, pricing, FAQs and legal text live in `src/content/` (`site.ts`, `pricing.ts`, `legal.ts`). Search for `[PLACEHOLDER` to find values that must be replaced before launch.

## Contact form
`POST /api/contact` validates with Zod, uses a honeypot + timing check + per-IP rate limit, and sends email via the Resend REST API. In development without keys, leads are logged to the console. In production, missing keys return an error so leads are never silently lost.

## Deploy
Vercel-ready: import the repo, set the env vars from `.env.example`, deploy.
