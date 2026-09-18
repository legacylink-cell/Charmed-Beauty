# Charmed Beauty 9 & 18 — PRD

## Original Problem Statement
Luxury beauty salon website for Charmed Beauty 9 & 18 (woman-owned studio, Toms River NJ). Scroll-stopping dark cinematic hero with oversized typography, asymmetric editorial sections, immersive services with elegant pricing, social proof, floating "Book Now" → GlossGenius, powerful feminine tone, no "Made with Emergent" badge.

## User Personas
- Women who treat hair/beauty as part of their look
- Occasion clients (weddings, proms, photoshoots)
- Busy professionals wanting low-maintenance glam
- Anyone searching for a new go-to studio in Ocean County

## Key Business Facts (real, from GlossGenius + user)
- Address: 1201 Hooper Ave, Sola Salon Studios, Suite 8 & 9, Toms River, NJ 08753
- Studio line: (732) 955-9096 (Andrea). Joanne (732) 330-4850 · Lisa (732) 678-8547 · Phyllis (732) 581-6319
- Email: Charmedbeautynj@gmail.com
- Domain (user-confirmed): https://charmedbeauty9and18.com
- Hours: Mon 9-5, Tue 9-5, Wed 9:30-7, Thu 9:30-5, Fri 9:30-3, Sat 9-3, Sun closed
- Booking: https://charmedbeauty918.glossgenius.com/booking-flow (GlossGenius = booking only)
- Reviews: 675 client reviews; Google 5.0 / 54+ reviews
- Facebook: https://www.facebook.com/charmedbeautynj (no Instagram per user)
- Footer credit: Designed by Mo Studio → https://mozeid.com/
- Cancellation: 50% fee within 24h; 3.5% card processing fee

## Architecture
- Frontend-only React landing page (CRA + Tailwind + custom CSS). FastAPI/Mongo scaffold untouched, no backend features.
- Design: "Studio 09 & 18 Vanguard" — solid carbon black (#0A0A0C / #000000) + raw copper #D4A373, Archivo Black display + Playfair Display accent. Film grain + glow removed (user: "crisper, not dirty/faded").
- Files: /app/frontend/src/App.js (all sections), /app/frontend/src/App.css, /app/frontend/public/index.html (SEO + JSON-LD).

## Implemented
### 2026-09-18 (initial build)
- Sticky header + numbered nav, full-screen type hero, 3-chapter manifesto, marquee strip
- Editorial type-only interlude (no suite imagery — user rejected suite photos)
- Reviews block (675 / Google 5.0 · 54+), Artists section with real team photo, Location with dark Google Map iframe, final CTA, floating Book Now
- Emergent badge removed; Facebook wired; Mo Studio footer credit

### 2026-09-18 (marketing + SEO release)
- **Client work gallery ("The Work")**: 21 real client photos extracted from the owner's uploaded grid, upscaled/sharpened to 444px WebP (~380KB total), 5 category filters (All / Colour / Occasion & Bridal / Cuts & Styling / Transformations), hover labels, lightbox with prev/next/Esc and "Book This Look" CTA per look
- **Full service menu** (real GlossGenius menu, 25 services in 4 groups) presented as selectable **category cards/tabs** — Cuts & Styling (8), Colour & Dimension (13), Treatments & Texture (3), Occasion & Bridal (1); each row has duration, price and a Book link
- **Brand assets**: favicon.ico + favicon.svg + apple-touch-icon + 192/512 icons + site.webmanifest; 1200×630 og-image.jpg (brand type + 4 client-work mosaic) for link sharing
- **SEO**: local-intent title/description, canonical, OG + Twitter cards, robots.txt, sitemap.xml (with image sitemap), JSON-LD HairSalon (address, hours, 13 areaServed cities, makesOffer, ReserveAction, email)
- **Local SEO section**: "Serving Ocean County" — 13 towns with drive times (Toms River, Brick, Beachwood, Pine Beach, Island Heights, Bayville, Lakewood, Seaside Heights, Lavallette, Point Pleasant, Jackson, Forked River, Manahawkin) + booking cell
- **Performance/a11y/best practice**: heavy 2000px Unsplash background removed, team photo → WebP (388KB → 43KB), width/height + lazy/async on images, skip-to-content link, focus-visible rings, prefers-reduced-motion support, aria roles on tabs/filters/lightbox/map, brighter muted text (#B6B6C0) for contrast
- **Contact**: Charmedbeautynj@gmail.com in location block, final CTA, footer and schema
- Mobile: horizontally scrollable quick-nav strip, compact header CTA (zero horizontal overflow at 390px), 2-col gallery, single-line price rows
- "OWNER" badge removed from stylist cards (per user)

### 2026-09-18 (gift cards)
- New "04 / Gift Cards" section (between Full Menu and Reviews): editorial gift-card visual + amount chips ($50 / $95 / $165 / Any Amount) and three CTAs — Text To Buy (pre-filled SMS), Call, Email (pre-filled subject). Added to desktop nav, mobile quick-nav and footer; following sections renumbered 05–08.
- **No online gift-card checkout exists today**: the GlossGenius `/gift-cards` path 404s for this studio and shop.saloninteractive.com/store/CharmedBeauty is a retail product store (no gift cards). CTAs therefore route to text/call/email. If the owner enables gift cards in GlossGenius, swap the CTA hrefs to that purchase URL.
- Desktop header nav tidied (labels only, no numbers) to fit 7 entries without overlapping the brand.

### 2026-09-18 (hero background modernisation + gift card contact)
- Hero background: crisp copper hairline grid (masked fade), animated copper scan line, right-edge vertical strip of 3 desaturated client-work photos with copper hairlines (lg+), outlined "9&18" stroke watermark (xl+), and the "Hair Salon • Toms River, NJ 08753" kicker restyled as a bordered pill with a pulsing dot. All motion respects prefers-reduced-motion.
- Gift card CTAs now use Joanne's line: (732) 330-4850 for both call and pre-filled text; copy updated to "arranged directly with Joanne".

## Testing- /app/test_reports/iteration_1.json — 9/11 pass; 2 defects (team.webp 404, 13px mobile header overflow) → both fixed
- /app/test_reports/iteration_2.json — **100% (5/5)**: team photo, zero mobile overflow, menu tabs (8/13/3/1), 11 booking CTAs, gallery + lightbox, email links, map, no console errors

## Backlog
- P1: Run a real PageSpeed/Lighthouse audit once the site is on charmedbeauty9and18.com (self-host fonts if Google Fonts costs points)
- P1: Point DNS/hosting at charmedbeauty9and18.com, submit sitemap in Google Search Console, keep NAP identical to the Google Business Profile
- P2: Per-town landing sections/pages (e.g. "balayage in Brick NJ") for deeper local ranking
- P2: Before/after slider for the transformation photos; higher-resolution originals from the owner's phone (current gallery sources are ~148px thumbnails upscaled)
- P2: Gift card link (shop.saloninteractive.com/store/CharmedBeauty)
- P3: Instagram link when the owner wants it
