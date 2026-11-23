# Project notes
- Next.js 15 App Router + TS + Tailwind 3. Brand tokens in `tailwind.config.ts` (lemon, ink, lavender, alabaster, slate, mint).
- Content is centralized in `src/content/*`; pages in `src/app/*`; reusable UI in `src/components/*`.
- Never invent client names, testimonials, metrics or contact details — use `[PLACEHOLDER]`.
- Scroll reveal = `data-reveal` attribute + `RevealObserver` (content stays visible without JS / with reduced motion).
- Lead CTAs use `LeadButton` (opens modal, falls back to `/contact#lead-form`).
- Motion: page fade via `app/template.tsx`, CSS scroll-progress bar, staggered reveals; all disabled under prefers-reduced-motion.
- Verify with `npm run lint && npm run typecheck && npm run build`.
