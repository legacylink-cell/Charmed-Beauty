# Charmed Beauty 9 & 18 — PRD

## Original Problem Statement
Luxury beauty salon website for Charmed Beauty 9 & 18 (woman-owned studio, Toms River NJ). Scroll-stopping dark cinematic hero with oversized animated typography, asymmetric editorial sections, immersive services with elegant pricing, full-bleed social proof, floating "Book Now" → charmedbeauty918.glossgenius.com, powerful feminine tone, no "Made with Emergent" badge.

## User Personas
- Women who treat hair/beauty as part of their look
- Occasion clients (weddings, events, photoshoots)
- Busy professionals wanting low-maintenance glam
- Anyone searching for a new go-to studio

## Key Business Facts (real, crawled from GlossGenius 2026-09-18)
- Address: 1201 Hooper Ave, Sola Salon Studios, Suite 8 & 9, Toms River, NJ 08753
- Main phone: (732) 955-9096 (Andrea). Team: Lisa (732) 678-8547, Phyllis (732) 581-6319, Joanne (732) 330-4850
- 675 reviews on GlossGenius. Team: Andrea Vaz, Joanne DeCicco, Lisa, Phyllis
- Hours: Mon 9-5, Tue 9-5, Wed 9:30-7, Thu 9:30-5, Fri 9:30-3, Sat 9-3, Sun closed
- Real services with prices (hair menu — brief said nail/lash but user delegated services to the real GlossGenius menu)
- Differentiator (owner's words): "Designs nobody else in town does; Precision work that lasts weeks"
- Booking: https://charmedbeauty918.glossgenius.com (all CTAs link here)
- Cancellation: 50% fee within 24h; 3.5% card processing fee

## Architecture
- Frontend-only landing page (React, Tailwind, custom CSS). No backend/auth needed; stock FastAPI server left untouched.
- Design: approved direction "Studio 09 and 18 Vanguard" (brutalist-luxury, carbon black #0E0E10 + raw copper #D4A373, Archivo Black display + Playfair Display accent), source of truth /app/design/direction.html
- Files: /app/frontend/src/App.js (all sections), /app/frontend/src/App.css (motion/theme), /app/frontend/public/index.html (fonts, meta, Emergent badge script removed)

## Implemented (2026-09-18)
- Sticky header with numbered nav + Direct Booking button
- Full-screen type hero, staggered blur-rise entrance, slow drifting copper glow, film grain
- 3-chapter manifesto, ghost marquee strip, cinematic media frame w/ slow zoom
- Services catalog: 7 real services with real prices, hover copper-edge rows, per-service Book buttons
- Reviews: 675-count number block + 4 real client quotes over full-bleed imagery
- Location: real address, hours grid, 4 direct call/text lines, Google Maps link, IG/FB placeholders
- Final CTA + floating pulsing "Book Now" (always visible) → GlossGenius
- Mobile responsive; all interactive elements have data-testid

## Pending / Needs From User
- Instagram URL (placeholder still shown on page)
- Confirm hair-menu interpretation (brief said nail/lash; real GlossGenius menu is hair — built with real data)

## Updates (2026-09-18, later)
- Added real studio photo to the cinematic media frame (/images/studio.png)
- Added "04 / The Artists" section with real team photo (/images/team.png) + 4 stylist call/text cards
- Footer: "Designed by Mo Studio" → https://mozeid.com/ (marketing credit, per user)
- Facebook wired: https://www.facebook.com/charmedbeautynj
- Google proof added: 5.0 rating / 54+ Google reviews block in Standards, links to Google listing. Instagram removed per user ("no IG for now"). No auth on site.
- Studio photo section replaced with a type-only "Charmed Standard" editorial interlude (owner's differentiator quote) — user did not want stock suite imagery or the low-quality real suite photo. Joanne marked OWNER in Artists. Location section now embeds a real dark-styled Google Map iframe.

## Backlog
- P1: Wire real Instagram/Facebook URLs once provided
- P2: Team section with stylist photos
- P2: Before/after gallery
- P3: Gift card link (shop.saloninteractive.com/store/CharmedBeauty)
