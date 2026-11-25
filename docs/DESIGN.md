# Design System

Style: bold, minimalist **neo-brutalist** with Swiss layout discipline and premium-SaaS clarity — thick black borders, crisp offset shadows, generous spacing, one dominant brand colour. No gradients, glassmorphism or stock imagery.

All tokens live in `tailwind.config.ts`; global styles and animation keyframes live in `src/app/globals.css`.

## Colours

| Token (Tailwind) | Hex | Use |
|---|---|---|
| `lemon` | `#FFF21A` | Dominant background and primary brand colour |
| `ink` | `#171717` | All primary text, borders, primary buttons, footer, navigation |
| `lavender` | `#A65BFF` | AI accent: hero robot, logo, selected states, highlights |
| `alabaster` | `#F8F8F4` | Cards, forms, pricing panels, alternate sections |
| `slate` | `#6B6B76` | Secondary text, captions, labels |
| `mint` | `#00E5A8` | Hover, active, success and secondary interactive states only |
| `neon` | `#2FD8FF` | Glowing robot antennae, eyes and core only (added later) |

Rules: yellow dominates; black for type and borders; slate only for secondary copy; mint only for interaction states; WCAG AA contrast maintained (lavender text is not used on yellow).

## Typography

- **Display:** Space Grotesk Variable — bold, uppercase headlines, tight leading (~1.0)
- **Body:** Inter Variable — 16 px on mobile, 17 px on large screens
- Both self-hosted through Fontsource (no external font requests).
- Headings use fluid `clamp()` sizes so they scale smoothly between phone and desktop.

## Shape and depth

- Border: `2px solid ink`; corner radius `14px` (`rounded-brut`); buttons `rounded-xl`.
- Shadows: `shadow-brut-sm` (2px), `shadow-brut` (4px), `shadow-brut-lg` (8px), all offset solid `#171717`.
- Hover: cards and buttons lift (`-translate`) and the shadow grows; mint highlights on hover/focus.
- Texture: subtle dotted grid (`.dots`) on hero and page headers, kept low-contrast so yellow stays dominant.
- Container: centred, side padding `clamp(1rem, 4vw, 2.5rem)`, max width 1360 px.

## Key components

- **Buttons** (`Button.tsx`): primary (ink on lemon text), secondary (alabaster), light (for dark sections). Minimum 48 px tall, uppercase display font.
- **Cards**: `.card` / `.card-hover` utilities (alabaster, 2px border, brutal shadow).
- **Pricing**: `WebsitePlanCard` (Plans A/B/C, recommended plan raised with a lavender badge), `PricingCard` (other plans). Tables become stacked cards below 640 px.
- **Navbar**: sticky, lemon; active page in ink; mobile = full-screen ink overlay, lemon text, mint hover, staggered entry; scroll-progress bar in lavender.
- **Sticky mobile CTA**: "BOOK FREE CALL" plus a WhatsApp icon, on phones only.
- **Modal**: native `<dialog>`; centred card on desktop, bottom sheet with drag handle on phones.

## Logo

Hexagon built from a purple **"A"** and a white **"1"**, with a wordmark **AGENTIX** over **ONE SOLUTION**.

- Geometry is a single source of truth in `src/lib/logo-paths.ts` (viewBox 200×200), used by `LogoMark.tsx`, the favicon, the share image and the exported brand files.
- Files in `public/brand/`: `agentix-mark.svg` (scalable mark), `agentix-logo-dark.png` and `agentix-logo-yellow.png` (1600×1600 full lockups).
- In the navbar the mark sits in a dark rounded tile so the white parts stay visible on yellow; in the footer and mobile menu the words are lemon with "ONE SOLUTION" in lavender.
- The mark was redrawn by hand from the owner's reference (`docs/reference/logo-reference.jpg`) — close, not pixel-identical. Replace `logo-paths.ts` and the brand files if an original vector is supplied.

## Hero robot

`HeroCenterpiece.tsx` — a CSS-3D alien robot built from cuboids (lavender with lighter/darker faces), neon-blue glowing antennae, slanted blinking eyes and a pulsing chest core. The head turns toward the cursor / finger (smoothed with a small animation-frame loop); the body sways and bobs. Tapping it plays a three-scene "poke" story: haptics on Android, shake, speech bubble, a purple heart balloon that bursts, and fun pop-ups (see `docs/ARCHITECTURE.md`). Six floating cards (AI Chat, Workflow Automation, LinkedIn Outreach, Payment Follow-Up, Content Automation, Cold Call Agent) drift with depth-based parallax. In reduced-motion mode the robot is a still pose.

## Responsive behaviour

- Mobile-first; tested at 360, 375, 390, 768, 1024 and 1440 px with no horizontal scroll.
- Navigation collapses to the full-screen menu below 1024 px.
- Tap targets are at least 44 px; touch-friendly spacing on cards and buttons.
- Fluid type and padding; hero cards stay inside bounds on laptop widths.
- Long tables become stacked cards on phones; jump-links scroll and snap horizontally.

## Motion principles

Fast (about 150–450 ms), non-blocking, subtle; only transform and opacity animate. Page fade, staggered reveal, scroll-progress bar, hover lifts. Everything is disabled or reduced under `prefers-reduced-motion`.

## Print

The agreement page has a print / save-as-PDF button; print styles hide navigation, footer and sticky bars (`globals.css`).
