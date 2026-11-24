# Deployment Guide

## Current production setup

| Item | Value |
|---|---|
| Host | Vercel (Hobby plan) |
| Team / project | `the-obscene-agents` / `agentix_one_solutions` |
| Git repository | `riyazzen369/Agentix_One_Solutions` (GitHub), connected to the Vercel project |
| Production branch | `main` — every push deploys to production automatically |
| Framework preset | Next.js (pinned in `vercel.json`) |
| Build / install / output | defaults (`next build`, `npm install`, `.next`) — **leave the Output Directory override off** |
| Live URL | https://agentixonesolutions.vercel.app (aliases: `agentixonesolutions-the-obscene-agents.vercel.app`, `agentixonesolutions-git-main-the-obscene-agents.vercel.app`) |
| Deployment protection | Vercel Authentication **disabled** (site is public) |
| Region | iad1 (default) |

## Environment variables

Set in Vercel → Project → **Settings → Environment Variables** (Production, Preview, Development). Never commit real secrets; `.env.local` is git-ignored.

| Variable | Type | Current value / note |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | `https://agentixonesolutions.vercel.app` — change to the custom domain when connected |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | `md.riyazzen369@gmail.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | `919942721263` (digits, country code first) |
| `CONTACT_TO_EMAIL` | secret | `md.riyazzen369@gmail.com` — inbox that receives leads |
| `RESEND_API_KEY` | secret | **Not set yet.** Create at resend.com |
| `SUPABASE_URL` | secret | `https://kgujijfpoucohmtlrbzn.supabase.co` (client sign-off database) |
| `SUPABASE_PUBLISHABLE_KEY` | secret | Set in Vercel. Publishable key of the Agentix Supabase project; INSERT-only by row-level security. Get it from Supabase → Project Settings → API Keys |
| `CONTACT_FROM_EMAIL` | secret | **Not set yet.** e.g. `Agentix Leads <leads@yourdomain.com>` on a domain verified in Resend |

`NEXT_PUBLIC_*` values are embedded in the built pages, so **redeploy after changing them**.

### Contact form email setup (still needed)

Until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` exist, form submissions show an error to visitors (by design, so leads are never silently lost). Visitors can still use WhatsApp, email and phone.

1. Create a free account at https://resend.com and add + verify your sending domain (needed to send from your own address).
2. Create an API key; add it to Vercel as `RESEND_API_KEY`.
3. Add `CONTACT_FROM_EMAIL` (an address on the verified domain).
4. Redeploy, then submit a test lead from the live site and confirm the email arrives.

## Supabase (client sign-offs)

| Item | Value |
|---|---|
| Project | `agentix-one-solutions` (separate from the Godfather project) |
| Project ref / region | `kgujijfpoucohmtlrbzn` / `ap-south-1` (Mumbai) |
| Table | `public.client_signoffs` — created by the two SQL files in `supabase/migrations/` (run them in order) |
| Access rule | Row-level security on; the public key may **only insert**. Select / update / delete are not granted. |
| Security advisor | No issues reported when created |

To recreate on a new Supabase project: create the project, run the migration SQL (SQL editor), copy the project URL and publishable key into `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in Vercel, then redeploy.

## Daily workflow (work directly on `main`)

```bash
git pull origin main
# ...edit...
npm run lint && npm run typecheck && npm run build
git add -A && git commit -m "Describe the change" && git push origin main
```

Vercel builds each push (typically 1–3 minutes; builds may wait in a queue on the free plan). Check **Deployments** in the dashboard — a green *Ready* means it is live. If a build fails, open it and read **Build Logs**; fix and push again. A failed build never replaces the live site, so the previous version stays up.

**Rollback:** Deployments → pick an earlier *Ready* deployment → *Promote to Production* (or *Instant Rollback*).

**Clean rebuild / cache:** Deployments → ⋯ on a deployment → *Redeploy* and untick *Use existing Build Cache*.

## Rebuild everything from scratch on a new Vercel account

1. Clone or fork this repository to your GitHub account.
2. Vercel → **Add New → Project** → import the repo. The framework is detected as Next.js; keep default build settings.
3. Add the environment variables above, then **Deploy**.
4. (Optional) Settings → Domains → add your domain and follow the DNS instructions; then update `NEXT_PUBLIC_SITE_URL` and redeploy.
5. If the site should be public, ensure Settings → Deployment Protection → Vercel Authentication is **off**.

## Custom domain checklist

- Add the domain in Vercel (Settings → Domains) and set DNS as instructed.
- Update `NEXT_PUBLIC_SITE_URL` to `https://<your-domain>` and redeploy (fixes canonical URLs, sitemap, share previews, structured data).
- Verify the domain in Resend for email sending.
- Submit `https://<your-domain>/sitemap.xml` to Google Search Console.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Build error: *No Output Directory named "public" found* | Project preset is "Other". Settings → Build and Deployment → Framework Preset → **Next.js**, Output Directory override **off**, then redeploy. (`vercel.json` now pins this.) |
| Visitors are asked to log in to Vercel | Deployment Protection is on. Turn **Vercel Authentication** off. |
| Pages show `example.com` URLs | `NEXT_PUBLIC_SITE_URL` not set; set it and redeploy. |
| Contact / WhatsApp details show `[PLACEHOLDER]` | `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_WHATSAPP_NUMBER` not set; set and redeploy. |
| Form shows "couldn't send your request" | Resend variables missing or the sender domain is not verified. |
| `npm run build` fails locally on TypeScript | Keep TypeScript on major 5 (TS 6 breaks the Next 15 build). |

## Verification checklist after each deploy

- Home, Pricing, Client Agreement and Contact pages load; no console errors.
- Footer and Contact show the right email, phone, hours and LinkedIn link.
- "Book free call" opens the lead form; a test lead arrives by email (once Resend is configured).
- Mobile: menu opens, sticky "Book free call" bar visible, no horizontal scroll.
