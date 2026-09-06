# Handoff: Odd Planet — Marketing Agency Website (Next.js)

## Overview

Single-page marketing website for **Odd Planet**, a full-service marketing agency (New Delhi, founded 2023) delivering influencer marketing, celebrity endorsements, content production, digital amplification and quick-commerce solutions.

Section order is fixed by the client:

1. Hero
2. Stat band (4 animated counters)
3. Brand marquee
4. Media coverage
5. Services
6. Our Work (scroll-pinned horizontal)
7. Creator network (3D coverflow)
8. Contact (form)
9. Footer

Two — and only two — sections scroll horizontally: **Our Work** and **Creators**. Everything else is vertical. This was an explicit correction after an earlier version overused horizontal scroll; do not add more.

---

## About the Design Files

The files in this bundle are **design references authored in HTML** — working prototypes that show the intended look, motion and behaviour. They are **not production code to copy**.

The task is to **recreate this design in Next.js** (App Router, TypeScript, Tailwind CSS recommended) using the target project's established patterns. The prototype uses inline styles because of the authoring environment it was built in; in Next.js these should become Tailwind classes or CSS Modules. Structure, values, and motion specs below are authoritative — the HTML is the visual reference.

`Odd Planet Website v2.dc.html` opens directly in a browser. It renders through a small runtime (`support.js`) that maps a template + a logic class onto React. Read the template for markup/styling and the logic class at the bottom of the file for all behaviour.

`Odd Planet Brand Kit.dc.html` documents the palette and type system with contrast ratios and usage rules. Read it before making any colour decision.

## Fidelity

**High-fidelity.** Colours, typography, spacing, radii and motion timings are final and listed exactly below. Recreate faithfully. The one deliberately unfinished area is imagery — see **Assets**.

---

## Brand origin (why these values)

Colour and type were extracted from the client's own pitch deck (`ODD Planet _ Deck.pdf`), not invented:

- Vector fill audit across all 22 pages: `#000000` (473 fills), `#2627A6` (65), `#CCCCCC` (95), `#FFFFFF` (75), `#03045E` (24), `#2D45F0` (6), `#DEE2FF` (2). The brand is black + white + one blue family — no third hue.
- Embedded fonts in the deck: **Archivo** (Regular/ExtraBold) and **Instrument Sans**.

The website type system deliberately evolved from the deck's grotesques to an editorial trio (below) because the client rejected the deck-literal typography as generic. The **palette did not change** — the client requires it.

---

## Design Tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| `ink/000` | `#05060A` | Page background — **the only background colour on the site** |
| `ink/100` | `#0A0C15` | Row hover, coverflow card base |
| `ink/150` | `#0C0F1A` | Ghost-button hover |
| `ink/200` | `#0D0F17` | Form input fill |
| `ink/250` | `#11141D` | Nav pill hover |
| `ink/300` | `#191C26` | Hairline / divider — used everywhere |
| `ink/400` | `#262B3A` | Border on interactive containers |
| `ink/450` | `#1B2030` | Footer wordmark gradient ends |
| `ink/500` | `#4A5065` | Input placeholder |
| `ink/550` | `#565C72` | Tertiary text, mono meta labels |
| `ink/600` | `#8A90A6` | Secondary body text (6.2:1 on ink/000) |
| `ink/900` | `#F4F5F8` | Primary text (18.4:1) |
| `blue/900` | `#03045E` | Gradient field only |
| `blue/800` | `#0E1330` | Gradient field only |
| `blue/700` | `#14169A` | Button hover, gradient field |
| `blue/600` | `#2627A6` | Deck primary — reserve, do not use as text |
| `blue/500` | `#2D45F0` | **Accent**: primary CTA, active borders, bullets, eyebrow dot |
| `blue/400` | `#5A6DFF` | Eyebrow labels, hover text, icons |
| `blue/200` | `#A9B4FF` | Links, serif italic accents, mono highlights, wordmark stroke |
| `blue/100` | `#DEE2FF` | Tints, badge text over media |

**Hard rules** (client-stated + accessibility):

- **One background colour.** Every section sits on `#05060A`. No alternating panels, no coloured section grounds, no navy footer. Separation comes from hairlines (`#191C26`) and the gradient field.
- Never use `#2627A6` or `#2D45F0` as text on black — 2.1:1 and 3.4:1, both fail. Blue text starts at `blue/200`.
- No third accent hue. No blue→purple gradients outside the defined ribbon field.
- Body text never lighter than `#8A90A6` on the page ground.

### Typography — three families

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display / editorial | **Instrument Serif** | 400 + 400 italic | Section headings, card titles, creator names. Italic carries the accent words in `blue/200`. |
| Structure / UI | **Schibsted Grotesk** | 400, 500, 600, 700, 800, 900 | Body, buttons, nav, stat numbers, hero caps lines. |
| Meta / labels | **JetBrains Mono** | 400, 500 | Eyebrows, indices, table meta, legal, clock. Uppercase, letter-spacing 0.06–0.18em. |

Google Fonts import:

```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500&display=swap
```

In Next.js use `next/font/google` for all three with `display: 'swap'` and subset `latin`, exposing them as CSS variables (`--font-serif`, `--font-grotesk`, `--font-mono`).

#### Type scale (fluid — all sizes are `clamp(min, preferred, max)`)

| Element | Family | Spec |
|---|---|---|
| Hero line 1 / 3 (`BUILDING`, `& CULTURE.`) | Grotesk 800 | `clamp(38px, 7.4vw, 104px)` / lh 0.94–0.98 / ls −0.04em / uppercase |
| Hero line 2 (`attention, influence`) | Serif 400 italic | `clamp(42px, 8.6vw, 124px)` / lh 0.92 / ls −0.02em / colour `#DEE2FF` |
| Section heading | Serif 400 | `clamp(32px, 4.8vw, 68px)` / lh 1.0 / ls −0.02em |
| Services heading | Serif 400 | `clamp(40px, 6.4vw, 88px)` / lh 0.96 |
| Contact `LET'S` | Grotesk 800 | `clamp(38px, 6vw, 86px)` / lh 0.94 / ls −0.04em |
| Contact `talk.` | Serif 400 italic | `clamp(44px, 7vw, 104px)` / lh 0.92 / colour `#A9B4FF` |
| Service name | Serif 400 | `clamp(26px, 3.4vw, 46px)` / lh 1.02 |
| Stat number | Grotesk 800 | `clamp(30px, 3.6vw, 50px)` / lh 1 / ls −0.04em / `tabular-nums` |
| Work card title | Serif 400 | 26px / lh 1.06 |
| Media row headline | Grotesk 600 | `clamp(18px, 2.1vw, 27px)` / lh 1.3 / ls −0.02em |
| Body | Grotesk 400 | 14–15px / lh 1.5–1.65 / `#8A90A6` |
| Hero body | Grotesk 400 | `clamp(15px, 1.4vw, 18px)` / lh 1.6 / max-width 34ch |
| Eyebrow | Mono 500 | 11px / ls 0.18em / uppercase / `#5A6DFF` |
| Meta label | Mono 500 | 10–11px / ls 0.06–0.14em / uppercase / `#565C72` |

Apply `text-wrap: pretty` to paragraphs and `text-wrap: balance` to headings.

### Spacing, radius, layout

- Content max-width **1400px**; hero copy column max-width **1120px**.
- Page gutter: `clamp(16px, 3vw, 40px)`.
- Section vertical padding: `clamp(48px, 7vw, 104px)`.
- Radii: pills `100px` (buttons, nav, inputs); cards `8px`; coverflow cards `10px`; form panel `14px`; textarea `18px`.
- **No box-shadows anywhere.** Depth is hairlines + the gradient field. (One exception: the coverflow's own 3D transform.)
- Layout is flex/grid with `gap` throughout — never margin-spaced inline siblings.

---

## Screens / Sections

### 1. Header (sticky)

- `position: sticky; top: 0; z-index: 80`, `background: rgba(5,6,10,0.7)`, `backdrop-filter: blur(16px)`. No bottom border.
- Row: logo (left) · nav pill (centre) · CTA (right), `justify-content: space-between`, padding `16px` + gutter.
- Logo: 9px `#2D45F0` dot + `ODD PLANET` in Grotesk 800 15px, ls 0.02em.
- Nav pill: `1px solid #191C26`, radius 100px, padding 5px, `gap: 2px`. Items are Mono 500 12px uppercase ls 0.06em, `#8A90A6`, padding `9px 13px`, radius 100px. Hover → colour `#F4F5F8`, background `#11141D`, 0.2s.
- Nav items: Media · Services · Work · Creators (anchors to `#media`, `#services`, `#work`, `#creators`).
- **CTA "Start a brief"**: white pill (`#F4F5F8`, text `#05060A`), Grotesk 600 13px, padding `14px 8px 14px 20px`, radius 100px, `overflow: hidden`, with a trailing 26px circular arrow chip (`#05060A` bg, `#F4F5F8` glyph `→`). Hover: pill → `#2D45F0` with white text, `padding-right: 8px`, and the chip inverts to white bg / `#2D45F0` glyph and shifts `translateX(3px)`. All transitions 0.24s ease.

### 2. Hero (`#home`)

Centred composition. No portraits. Three stacked layers:

**Layer A — animated ribbon gradient field (canvas).**
`position: absolute; left:-14%; top:-24%; width:128%; height:112%`, `opacity: 0.4`, `mix-blend-mode: screen`, masked with
`radial-gradient(74% 56% at 50% 44%, #000 0%, rgba(0,0,0,0.42) 40%, rgba(0,0,0,0) 68%)`.
The mask must reach full transparency well inside the canvas box — otherwise the box edge shows as a hard seam. This was a real bug; do not loosen it.

**Layer B — planet limb (inline SVG).**
`viewBox="0 0 1200 420"`, `preserveAspectRatio="none"`, positioned `left:50%; bottom:0; translateX(-50%); width:150%; height:92%`, `z-index: 2`. Two concentric circles `cx=600 cy=980 r=820`:
- bloom pass: `stroke-width: 46`, `filter: blur(20)` via `feGaussianBlur`, `opacity: 0.62`
- crisp pass: `stroke-width: 4.5`

Both stroked with a horizontal linear gradient: `#2D45F0 @0 (α0) → #5A6DFF @0.24 (α.65) → #F2F4FF @0.5 (α1) → #5A6DFF @0.76 (α.65) → #2D45F0 @1 (α0)`. The result reads as a glowing planet horizon, brightest at centre, dissolving at both edges.

**Layer C — bottom dissolve.**
`position: absolute; bottom: 0; height: 34%`, `linear-gradient(to bottom, rgba(5,6,10,0) 0%, rgba(5,6,10,0.18) 44%, rgba(5,6,10,0.62) 78%, #05060A 100%)`, `pointer-events: none`, `z-index: 5`. This is what blends the hero into the stat band.

**Content** (z above A/B, centred, `text-align: center`):
- `<h1>` in three lines: `BUILDING` (grotesk caps) / `attention, influence` (serif italic, `#DEE2FF`) / `& CULTURE.` where `CULTURE.` is `#5A6DFF`. The italic descenders intentionally tuck into the next line's cap height — a layout validator flags this as an overlap; it is correct.
- Body: "Influencer campaigns, content and amplification for brands that need to be talked about." max-width 34ch.
- Buttons row, `gap: 12px`, centred:
  - **Primary** — `#2D45F0` pill, white text, Grotesk 600 14px, padding `17px 26px`. Hover `#14169A` + `translateY(-2px)`.
  - **Secondary "Book a discovery call"** — **conic-gradient animated outline**. Outer `<span>`: `position: relative; border-radius: 100px; padding: 1.5px; overflow: hidden; background: #191C26`. Inside it an absolutely-positioned square (`width: 280%; aspect-ratio: 1`, centred by `margin: -140% 0 0 -140%`) filled with
    `conic-gradient(from 0deg, rgba(45,69,240,0) 0deg 200deg, #2D45F0 268deg, #A9B4FF 312deg, #F2F4FF 336deg, #A9B4FF 348deg, rgba(45,69,240,0) 360deg)`
    animated `rotate(1turn)` over **3.6s linear infinite**. The inner `<a>` sits above with `background: #05060A`, padding `16px 25px`, radius 100px — so only the 1.5px rim shows the travelling light. Hover: inner bg `#0C0F1A`, text `#DEE2FF`.
    In Next.js prefer the `@property --op-a` + `background: conic-gradient(from var(--op-a), …)` technique with an animated custom property (already declared in the prototype) — it avoids compositing a 280% overlay. Fall back to the rotating overlay where `@property` is unsupported.
  The CTA row carries `data-hero-cta` and stacks full-width below 440px.
- **Logo drop zone**: 
  `clamp(180px,26vw,320px) × clamp(54px,7.4vw,96px)`, centred above the arc, `z-index: 3`. In the prototype this is an `<image-slot>` placeholder awaiting the client's transparent-PNG lockup. **In production replace with the real logo as `next/image` (priority).**

### 3. Stat band

- Pulled up into the hero fade: `margin-top: calc(clamp(16px,3vw,40px) * -1)`, `z-index: 6`.
- A faint continuation glow sits behind its top edge: absolute, `top:-140px; height:200px`, `radial-gradient(72% 100% at 50% 0%, rgba(45,69,240,0.14) 0%, rgba(45,69,240,0.04) 46%, rgba(5,6,10,0) 78%)`, `pointer-events: none`.
- Grid: `repeat(auto-fit, minmax(150px, 1fr))`, `gap: 1px`, container `background: #191C26` + `1px solid #191C26`, radius 8px, `overflow: hidden` — the 1px gap *is* the divider. Cells `background: #05060A`, padding `clamp(22px,2.6vw,34px)`.
- Four counters: **150M+** Views generated · **40+** Brands served · **250+** Creators / month · **500+** Event attendees.
- ⚠️ **These figures are unconfirmed placeholders.** Confirm with the client before launch.

### 4. Brand marquee

- Eyebrow "Selected brand partners" (Mono, `#565C72`).
- Two identical logo rows inside a `width: max-content` flex, animated `translateX(0 → -50%)` over **46s linear infinite** for a seamless loop. The second row is `aria-hidden="true"`.
- Logos: heights 21–32px, `filter: brightness(0) invert(1)`, `opacity: 0.42`. Gap `clamp(38px,5.4vw,84px)`.
- Brands: Starbucks, Michael Kors, Converse, Domino's, POND'S, MG Motor, Flipkart, KFC, OPPO, Swiggy Instamart, Embassy of Sweden, Ministry of Textiles.
- Pause on hover is a nice-to-have; respect `prefers-reduced-motion` by stopping it.

### 5. Media coverage (`#media`, vertical)

Editorial row list — deliberately **not** cards.

- Header: eyebrow "Media coverage" + serif heading `Recognised by <i>industry leaders</i>` + a supporting line right-aligned on wide screens.
- Each row is a link: `display: grid; grid-template-columns: 76px minmax(0,1fr) auto 34px; gap: clamp(14px,2.4vw,34px); align-items: center`, padding `clamp(22px,2.8vw,34px) clamp(10px,1.4vw,18px)`, `border-top: 1px solid #191C26` (last row also `border-bottom`).
- Columns: year (Mono `#565C72`) · outlet eyebrow (`#5A6DFF`) over headline (Grotesk 600) · context label (Mono `#8A90A6`) · arrow `→`.
- Hover: row background `#0A0C15` (0.25s), arrow `translateX(7px)` + colour `#5A6DFF`.
- Rows:
  1. 2025 · India Today Gaming · "Sweden–India Gaming Day unites nations in a virtual gaming spectacle" · Embassy of Sweden → `https://www.indiatodaygaming.com/amp/news/national/story/sweden-india-gaming-day-unites-nations-in-a-virtual-gaming-spectacle-3232`
  2. 2026 · Indian Startup Times · "Trailblazing founders powering influencer agencies" · Founder feature → `https://www.indianstartuptimes.com/news/trailblazing-founders-powering-influencer-agencies-2026-edition/`
  3. 2025 · Tata Tele Business Services · "Spotlighted in the #RozBanateHainNayaKal campaign" · MSME Day → `https://www.linkedin.com/posts/ojamaduji_rozbanatehainnayakal-msmeday-rozbanatehainnayakal-activity-7476900293880737792-0oM1`
  4. 2024 · Shark Tank India · PR mandate · "Shaily Mehrotra, Fixderma — founder PR programme" · stats 15M+ views, 150+ deliverables (not a link)

### 6. Services (`#services`, vertical)

Two columns: `minmax(0,0.72fr) minmax(0,1.28fr)`, `gap: clamp(28px,5vw,80px)`, `align-items: start`.

**Left (sticky, `top: 120px`)**: eyebrow "What we do" · serif `Services` · Mono `(4)` · supporting paragraph (34ch) · link "Request capabilities deck →".

**Right**: four rows, each `border-top: 1px solid #191C26` (last also bottom), padding `clamp(24px,3vw,40px) clamp(6px,1vw,14px)`, hover background `#0A0C15`.
Row grid: `minmax(0,1fr) auto`; inner grid `46px minmax(0,1fr)` for index + content. Right cell is a Mono uppercase engagement-model label + arrow that slides on hover.

Each service: serif name → 46ch description → **vertical bullet list**. Bullets are `<ul>` with `list-style: none`, `flex-direction: column`, `gap: 9px`; each `<li>` is `display: flex; align-items: baseline; gap: 11px` with a `◆` glyph in `#2D45F0` at 11px, and label text Grotesk 400 14px `#8A90A6`. (Client explicitly asked for vertical bullets, not inline chips.)

| # | Name | Model | Bullets |
|---|---|---|---|
| 01 | Influence | Always-on | Influencer marketing · Creator partnerships · Celebrity endorsements · Talent management |
| 02 | Create | Per project | Content production · Brand films · Events & experiences · Original IPs & series |
| 03 | Amplify | Monthly retainer | Social media strategy · Meme marketing · Digital campaigns · Community building · PR & outreach |
| 04 | Quick commerce | Consult + manage | Consultancy & management · End-to-end solutions · Marketplace & dark-store growth |

### 7. Our Work (`#work`) — scroll-pinned horizontal

**Mechanic.** Section height = `100vh + trackOverflow`, where `trackOverflow = track.scrollWidth − scroller.clientWidth`. Inside, `[data-pin-inner]` is `position: sticky; top: 0; height: 100vh` with `overflow: hidden`. On scroll, progress `p = clamp(−sectionRect.top / trackOverflow, 0, 1)` drives `track.style.transform = translate3d(−p × trackOverflow, 0, 0)`. So vertical scroll converts to horizontal travel and the section releases exactly when the last card lands.

Implement in Next.js with `useLayoutEffect` + a rAF-throttled passive scroll listener (or Framer Motion `useScroll` + `useTransform`), re-measuring on resize and after fonts/images load.

- Header row: eyebrow "Selected work" · serif `Campaigns that <i>travelled</i>` · Mono hint "Scroll to advance →".
- Track: `display: flex; gap: clamp(12px,1.4vw,20px)`, gutter padding, `will-change: transform`.
- Cards: `flex: 0 0 clamp(258px,25vw,368px)`, `1px solid #191C26`, radius 8px, `overflow: hidden`, column flex. Hover border `#2D45F0`.
  - Media: `height: clamp(140px,19vh,208px)`, `object-fit: cover`. Hover `scale(1.055)` over 0.6s `cubic-bezier(.16,.84,.44,1)`.
  - **No grayscale filters.** (An earlier greyscale-to-colour hover was explicitly rejected.)
  - Badge over media: `NN · Category`, Mono 10px uppercase `#DEE2FF`, `rgba(5,6,10,0.66)` + `blur(6px)`, pill.
  - Body: serif title 26px → 14px description → a metric table pushed to the bottom (`margin-top: auto`): rows `display: flex; justify-content: space-between; padding: 9px 0; border-top: 1px solid #191C26`, Mono 11px, label `#565C72`, value `#F4F5F8`.
- Footer of the pinned frame: 1px `#191C26` rail with a fill `linear-gradient(90deg,#2D45F0,#A9B4FF)` at `width: 6% + p×94%`, plus a Mono `NN / 07` counter.

Cards: 01 Maharani (Music — YouTube 42M+, Instagram 37M+, Streams 7.5M+) · 02 Embassy of Sweden (Government — 500+ attendees, India Today press, On-ground) · 03 Bevzilla (Creator network — 250+ creators/mo, 5+ niches, Retainer) · 04 Starbucks (Experiential — 100K+ views, 3.1K+ engagement, Launch) · 05 College Rivals (Gaming — 10M+ views, 80K+ likes, Multi-city) · 06 Comic Con India (On-ground — Build + talent, Festival) · 07 Ministry of Textiles (Government — three Instagram reel links: 423K+, 181K+, 309K+).

### 8. Creator network (`#creators`) — 3D coverflow

Drag/flick/keyboard/arrow/dot-navigable coverflow. Ported from a 21st.dev-style component; reimplemented in plain DOM so it stays editable.

**Geometry.** Frame has `perspective: 1400px`, `touch-action: pan-y`, `overflow: hidden`, `cursor: grab`. Stage is `position: relative; transform-style: preserve-3d; height: clamp(280px,32vw,400px)`. Cards are absolutely positioned at `left: 50%`, `width: clamp(200px,23vw,286px)`, same height, radius 10px.

**Per-frame paint**, given fractional centre `pos` and `pitch = cardWidth × 1.05`:

```
offset  = ((i − pos) mod n + n) mod n;  if (offset > n/2) offset −= n
dist    = |offset|
ramp    = dist ^ 0.56
tilt    = min(44 × ramp, 82) × sign(offset)
transform = translateX(calc(-50% + offset×pitch)) translateZ(−0.6 × cardWidth × ramp) rotateY(−tilt deg)
edge    = clamp(n/2 − dist, 0, 1)
opacity = max(0, 1 − 0.14 × dist) × edge
zIndex  = 100 − round(dist)
border  = dist < 0.5 ? #2D45F0 : #191C26
```

The `edge` factor fades a card to zero exactly where it teleports across the ring — that is what makes looping invisible without cloned nodes. The `0.56` exponent keeps far cards readable instead of folding them edge-on.

**Settle**: exponential ease-out, `pos += (target − pos) × 0.16` per frame, stop under `0.0004`. **Drag**: pointer capture, `pos = startPos − dx/pitch`, velocity in cards/sec, release throws `round(pos + clamp(v × 0.18, −2, 2))`. **Keyboard**: ←/→ step one. Paint directly to the DOM — do not route 60fps through React state.

**Caption** below, centred, blur-swaps (`opacity 0→1`, `blur(4px)→0`, 0.3s) whenever the centred index changes: serif name · Mono role · a 340px table of REACH / BRANDS / PERFORMANCE rows (same hairline-row pattern as Work cards) · dot pagination (7px dots, active `opacity 1` + `scale(1.3)`).

Roster: Siddharth Nigam (Actor & creator · 10.5M+ · Domino's, Max Fashion · 800K+ campaign views) · Priyank Sharma (3M+ · Allen Solly · 200K+) · Vaibhav Arora (2M+ · Michael Kors, AJIO · 710K+) · Tanvi Malhara (590K+ · POND'S, Sunsilk · 22.6M+ total) · Tisca Chopra (Celebrity partnership · SoTrue · 57K+) · Mohit Chhetri (450K+ · Flipkart, OPPO · 50K+) · Karun & Nanku (Music · 3.9M+ streams · Converse · Original IP) · Ishita Arora (137K+ · Epigamia, Instamart · 32.3K+).

### 9. Contact (`#contact`)

Two columns, `repeat(auto-fit, minmax(320px, 1fr))`, `gap: clamp(30px,5vw,72px)`, centred. A second ribbon canvas sits behind at `opacity: 0.24`, masked `radial-gradient(56% 44% at 26% 46%, #000 0%, rgba(0,0,0,0.34) 40%, rgba(0,0,0,0) 66%)` — again, fully transparent before the box edge.

**Left**: eyebrow "Contact us" · `LET'S` (grotesk caps) / `talk.` (serif italic `#A9B4FF`) · 44ch paragraph · Mono contact block (email, phone, `NEW DELHI, INDIA · HH:MM:SS IST` live clock ticking in `Asia/Kolkata`) · hairline divider · founder card (56px round avatar, "Tushar Goyal", "FOUNDER & CEO · EX-META GAMING").

**Right — form panel**: `1px solid #262B3A`, radius 14px, `background: rgba(10,12,21,0.72)` + `backdrop-filter: blur(10px)`, padding `clamp(22px,3vw,38px)`, `gap: 18px`.
- Fields: Name (text), Email (email), Brief (textarea, 4 rows). Labels are Mono 10px uppercase `#8A90A6`.
- Inputs: `#0D0F17` fill, `1px solid #262B3A`, radius 100px (textarea 18px), text `#F4F5F8` 15px, padding `16px 20px`, `outline: none`. Focus → `border-color: #2D45F0`. Placeholder `#4A5065`.
- Submit: full-width `#2D45F0` pill, white Grotesk 600 15px, padding `18px 24px`. Hover `#14169A` + `translateY(-2px)`.
- Note line under it, Mono 10px `#565C72`.
- Prototype intercepts submit and swaps the button label. **In production**: real validation (required, RFC-ish email, min message length), a POST to a route handler (`app/api/contact/route.ts`) or form service, loading/disabled state, success and error states, honeypot or Turnstile for spam, and an accessible `aria-live` region for the result.

### 10. Footer

Same `#05060A` ground — **no coloured footer**. `border-top: 1px solid #191C26`.

- Four columns, `repeat(auto-fit, minmax(190px,1fr))`, `gap: clamp(26px,4vw,52px)`: brand blurb · Sections · Follow · Enquiries (+ "Start a brief →" ghost pill).
- **Oversized wordmark with stroke-draw animation**: inline SVG, `viewBox="0 0 1000 116"`, `preserveAspectRatio="none"`, `overflow: visible`. Two superimposed `<text textLength="1000" lengthAdjust="spacingAndGlyphs">ODD PLANET</text>` nodes in Grotesk 900 152px, ls −0.04em. `textLength` makes it fit the container exactly at any width — this replaced a `19.5vw` version that overflowed on small screens. **Do not** reintroduce a viewport-unit font-size here.

  1. **Stroke pass** — `fill: none`, `stroke: url(#opWordStroke)` (horizontal `#2D45F0 → #A9B4FF @50% → #2D45F0`), `stroke-width: 1.4`, `stroke-dasharray: 2600`, `stroke-dashoffset: 2600`.
  2. **Fill pass** — `fill: url(#opWord)` (`#1B2030 → rgba(#2D45F0,0.72) @52% → #1B2030`), clipped by `clipPath#opWipe` containing a `<rect x=0 y=-40 width=1000 height=200>` at `transform: scaleX(0); transform-origin: 0 0`.

  **Timeline**, fired once on `IntersectionObserver` `threshold: 0.3`:

  | t | Change | Duration / easing |
  |---|---|---|
  | 0ms | `stroke-dashoffset` → 0 (letters draw on) | 1.6s `cubic-bezier(.33,1,.68,1)` |
  | 1000ms | wipe rect `scaleX(0→1)` (gradient fill sweeps in L→R) | 1.15s `cubic-bezier(.16,.84,.44,1)` |
  | 1700ms | stroke pass `opacity → 0` | 0.6s ease |

  End state is the plain gradient wordmark. This is the effect a `StrokeText`/GSAP component would give, done natively — **no GSAP dependency needed**. Note: per-letter stagger is *not* possible while `textLength` fits the word to the container (it would require splitting into 10 positioned `<text>` nodes and a fixed font-size, reintroducing small-screen overflow). It draws as one continuous pass by design. Under `prefers-reduced-motion` render the filled state immediately (`dashoffset: 0`, stroke `opacity: 0`, wipe `scaleX(1)`, all transitions off).
- Legal row: `border-top: 1px solid #191C26`, Mono 11px `#565C72`, "© 2026 ODD PLANET — WHERE ODDS ALIGN" + Privacy / Terms.

---

## The ribbon gradient field (canvas)

A recreation of the 21st.dev "Ribbon Field" gradient, recoloured to the brand. Used twice (hero, contact) as ambient depth — this is what visually blends sections.

**Draw**, per frame, into a DPR-scaled canvas (`min(2, devicePixelRatio)`):

```
clear
ctx.filter = blur( min(W,H) × 0.045 )
translate(W/2, H/2); rotate(32°)
L = hypot(W, H);  clock = 20.75 + t × 1.2;  segs = 26
stops = [0.00 #05060A, 0.20 #0E1330, 0.46 #14169A,
         0.68 #2D45F0, 0.86 #5A6DFF, 1.00 #A9B4FF]
for each adjacent pair (a, b):
  x0 = −L/2 + a.p×L;  x1 = −L/2 + b.p×L
  fill = linearGradient(x0→x1, a.c→b.c)
  path: walk s = 0..segs down the left edge, then segs..0 back up the right edge,
        offsetting each x by
        bend = 0.14 × 0.35 × sin(cross × 2.4 × 2π + clock) × L × 0.5
        where cross = (y + L/2) / L
  fill()
```

Rules:
- Drive from a single rAF loop with an elapsed-seconds clock; **one loop for all canvases**.
- Every modulation must be exactly 0 at `t = 0` (use `sin(x + p) − sin(p)` or `cos(x) − 1`) so motion never snaps on start.
- **Never round** the angle, centre or stop positions per frame — rounding is what makes the motion visibly step.
- Stop the loop when off-screen (IntersectionObserver) and under `prefers-reduced-motion`; render one static frame instead.
- Because it draws behind content with `mix-blend-mode: screen`, keep the darkest stop at the page ground so the field disappears where it isn't wanted.

---

## Interactions & Behaviour

| Behaviour | Spec |
|---|---|
| Reveal on scroll | `opacity 0→1`, `translateY(22px)→0`, `blur(9px)→0`, **0.75s** `cubic-bezier(.16,.84,.44,1)`. IntersectionObserver `threshold 0.15`, `rootMargin 0 0 -8% 0`, fires once. || Staggered reveal | Same, applied to a container's direct children at **90ms** increments (`threshold 0.1`, `rootMargin 0 0 -6% 0`). Used on the stat band, media list, services list. |
| Counters | Count 0 → target on entry (`threshold 0.35`), **1600ms**, ease-out cubic `1−(1−p)³`, `tabular-nums` so digits don't jitter. Suffix (`M+`, `+`) appended each frame. |
| Row hover | Background → `#0A0C15`, arrow `translateX(7px)` + `#5A6DFF`, 0.25s. |
| Card hover | Border → `#2D45F0`; image `scale(1.055)` 0.6s `cubic-bezier(.16,.84,.44,1)`. |
| Primary buttons | Background shift + `translateY(-2px)`, 0.2s. |
| "Start a brief" | Pill inverts to `#2D45F0`; arrow chip inverts and shifts 3px; 0.24s. |
| "Book a discovery call" | Conic-gradient rim rotating 1turn / **3.6s** linear infinite. |
| Marquee | `translateX(0 → -50%)`, **46s** linear infinite, duplicated track. |
| Pinned Work | See §7. |
| Coverflow | See §8. Settle factor 0.16, throw `v × 0.18` capped ±2 cards. |
| Nav | Anchor links, native `scroll-behavior: smooth`. **Scroll-spy**: `IntersectionObserver` over the four target sections with `rootMargin: "-45% 0px -50% 0px"` (a ~5%-tall band across the viewport middle); the intersecting section's link gets `color: #F4F5F8`, `background: #11141D` and `aria-current="true"`, all others reset. In Next.js this is a `useActiveSection` hook returning the id. |
| Footer wordmark | Stroke-draw → fill-wipe, see §10. |
| Clock | `toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })`, 1s interval, cleared on unmount. |

**`prefers-reduced-motion: reduce` must:** disable reveals (render final state), set counters to their target immediately, stop the marquee and the conic rim, freeze the gradient to one frame, unpin Work (native horizontal rail), and render the footer wordmark in its final filled state.

### Robustness note (learned the hard way)

The prototype wraps **every** setup step (`counters`, `reveals`, `rows`, `cards`, `nav`, `strokeText`, `brief`, `form`, `coverflow`, `measure`, `updatePins`, `ribbonMeasure`) in an individual try/catch. A single missing method in an earlier build threw during mount and silently killed *all* interactivity — gradient, coverflow, pin, reveals, counters and clock at once. In React this maps to: initialise each concern in its **own** `useEffect`, so one failure cannot cascade. Add an error boundary around the client sections.

Setup also re-runs at **400ms, 1400ms and 3000ms** after mount, with each element guarded by an `data-*-init` marker so work is idempotent. This catches late web-font metrics and late-decoding images that change `scrollWidth` (which the pin math depends on). In Next.js prefer `document.fonts.ready` + an `ResizeObserver` on the track instead of timers.

---

## Responsive guide

Mobile-first. Almost all sizing is already fluid via `clamp()`, so few hard breakpoints are needed. Suggested Tailwind screens: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

### Implemented breakpoints

The prototype is fluid via `clamp()` almost everywhere; these are the only hard breakpoints it needs, and they are all **layout-only** (they live in a stylesheet because media queries cannot be expressed inline). Port them as Tailwind responsive variants.

| Query | Rules |
|---|---|
| `≤ 900px` | Header nav pill becomes horizontally scrollable (`overflow-x: auto`, scrollbar hidden, `min-width: 0`). |
| `≤ 880px` | Services drops to one column (`grid-template-columns: minmax(0,1fr)`, gap `clamp(26px,4vw,40px)`); the left title block loses `position: sticky`. |
| `≤ 760px` | Media rows → `52px minmax(0,1fr)`, `row-gap: 10px`, `align-items: start`; the context label moves to `grid-column: 2` under the headline; the arrow column is hidden. Services rows → single column, `row-gap: 16px`, engagement label reflows under the content with `padding-left: 58px` to stay aligned to the text column. |
| `≤ 640px` | Header row wraps (`flex-wrap: wrap`, `row-gap: 12px`); nav takes `order: 3`, full width, left-aligned and scrollable — the CTA stays on the first line beside the logo. Services index column narrows to 32px; engagement label indent → 44px. |
| `≤ 440px` | Hero CTA row stacks (`flex-direction: column; align-items: stretch`) with both buttons full-width and centred. |

The nav is **never hidden** on mobile — it wraps to a scrollable second line. An earlier attempt to `display: none` it was rejected as a navigation regression; if you replace it with a sheet/drawer, keep the four section links reachable in one tap and keep "Start a brief" always visible.

### < 700px (phones) — behaviour changes, not just layout

- **Unpin Our Work.** Below 700px the pin math is disabled (implemented): section `height: auto`, inner `position: static; height: auto`, scroller `overflow-x: auto` + `scroll-snap-type: x mandatory` + `-webkit-overflow-scrolling: touch`, `scroll-snap-align: start` on every card, track transform cleared, scrollbar hidden. The progress rail and `NN / 07` counter are re-driven from `scrollLeft / (scrollWidth − clientWidth)` by a passive scroll listener bound once — so the rail keeps working in the unpinned mode.
- **Coverflow**: keep it — it is touch-native (`touch-action: pan-y` lets the page still scroll vertically). Under 700px the geometry softens (implemented): tilt `44° → 34°`, depth `0.6 → 0.5`, pitch `1.05 → 1.12 ×` card width, so cards don't crowd or fold.
- **Header**: nav pill scrolls horizontally from 900px and wraps to its own full-width line at 640px (see table above). "Start a brief" is always visible — it is the primary conversion.
- **Dot pagination**: each dot is a 7px visual inside a **44×44px** button (`margin: 0 -8px` keeps the visual rhythm tight while the hit area stays compliant), with `aria-current` on the active one.
- **Hero**: h1 lands at 38–42px minimum. Buttons stack full-width (`flex-direction: column; align-items: stretch`) below ~420px. Planet SVG `width: 220%` so the curve stays legible when the viewport is narrow.
- **Ribbon canvas**: cap DPR at 1.5 and consider rendering at 0.75× resolution scaled up — it is a blurred field, nobody can tell, and it saves significant fill-rate on mobile GPUs.
- **Media / Services rows**: collapse to a single column. Media row → stack year + outlet + headline, move the context label under the headline, drop the arrow column. Services row → index and name on one line, description and bullets below, engagement label moves under the bullets. Services left column loses `position: sticky`.
- **Stat band**: 2×2 grid (`minmax(140px,1fr)` handles this automatically).
- **Footer wordmark**: `textLength` already handles it — verify at 320px.
- Minimum tap target **44×44px** everywhere: coverflow arrows are already 44px; ensure nav items and dot pagination meet it (give dots a 44px hit area with a transparent pad).

### 700–1024px (tablets / small laptops)

- Pin math is active. The pinned frame uses `100dvh` when supported with a `100vh` fallback (`CSS.supports('height','100dvh')`) — implemented, so mobile browser chrome doesn't clip the frame.
- Services stays two-column but shift to `0.8fr / 1.2fr`; sticky offset drops to `top: 96px`.
- Contact collapses to one column (the `minmax(320px,1fr)` auto-fit does this at ~740px).
- Work cards ~258–300px wide; expect 3–4 in view.

### > 1024px (laptops / desktop)

- Full pinned Work, full coverflow, two-column Services, two-column Contact.
- Content capped at 1400px; gutters grow to 40px.
- Above ~1800px the hero h1 hits its 104/124px ceiling — intentional, so the line count stays at three.

### Testing matrix

360×640 · 390×844 (iPhone) · 414×896 · 768×1024 (iPad portrait) · 1024×768 · 1280×800 (laptop) · 1440×900 · 1920×1080 · 2560×1440. Also: landscape phone (short viewport — the pinned section must not trap the user), 200% browser zoom, and keyboard-only navigation.

---

## Next.js implementation notes

**Structure**

```
app/
  layout.tsx          // fonts, metadata, <html lang="en">
  page.tsx            // composes the sections in order
  api/contact/route.ts
components/
  site-header.tsx
  hero.tsx
  ribbon-field.tsx    // canvas gradient, client
  stat-band.tsx
  brand-marquee.tsx
  media-coverage.tsx
  services.tsx
  work-pinned.tsx     // client
  creator-coverflow.tsx // client
  contact.tsx         // client (form)
  site-footer.tsx
hooks/
  use-reveal.ts
  use-count-up.ts
  use-pinned-track.ts
  use-active-section.ts
  use-reduced-motion.ts
lib/
  content.ts          // all copy, links, rosters, metrics as typed data
```

- Keep **content in `lib/content.ts`** as typed arrays (services, press, work, creators). Every section maps over it; nothing hard-codes copy in JSX. The client will iterate on these numbers.
- Server Components by default. Only the header (scroll state), ribbon field, pinned Work, coverflow, counters, clock and form need `"use client"`.
- Framer Motion is fine for reveals (`whileInView`, `viewport={{ once: true }}`) and would replace `use-reveal`. Do **not** use it for the coverflow or the ribbon canvas — those need direct DOM/canvas writes at 60fps.
- Keep the gradient field as a `<canvas>`; do not attempt it in CSS. The CSS `linear-gradient` approximation is only exact when `wave = 0`, and here it is 14.

**Performance**

- `next/font` for all three families → no layout shift, no render-blocking Google request.
- **Gradient canvas cost control** (implemented in the prototype, keep it): DPR capped at **1.4 on <700px** and 2.0 above; each canvas is skipped in the draw loop when outside the viewport ±200px; under `prefers-reduced-motion` exactly one static frame is drawn and then the canvas is flagged so it is never redrawn.
- `next/image` everywhere with real `width`/`height`, `sizes` matched to the card widths, `priority` only on the hero logo. AVIF/WebP.
- Marquee logos: SVG if obtainable, else small PNGs; they are `brightness(0) invert(1)` so they only need to be single-colour silhouettes.
- One shared rAF loop for the gradient(s); one rAF-throttled passive scroll listener shared by the pin logic. Never listen on `scroll` unthrottled.
- `content-visibility: auto` + `contain-intrinsic-size` on below-fold sections.
- Stop the gradient loop and marquee when off-screen (IntersectionObserver).
- `will-change: transform` only on the pin track and coverflow cards — nowhere else.
- Budget: LCP < 2.0s on 4G mid-range Android, CLS < 0.05, INP < 200ms. The gradient canvas and coverflow are the two things to watch; test on a real mid-range device, not just a throttled desktop.

**Accessibility**

- Coverflow: the frame is focusable (`tabIndex={0}`) with ←/→ handlers; `role="region"`, `aria-roledescription="carousel"`, per-card `role="group"` + `aria-label="N of 8"`. Off-centre cards should be `aria-hidden`/`inert` so screen readers and tab order don't wander into them. Dot buttons carry `aria-current` and 44px hit areas.
- Nav links carry `aria-current="true"` on the active section (scroll-spy).
- Pinned Work must remain reachable by keyboard and screen reader — cards outside the visible window are still in the DOM; ensure focus scrolls the track (drive the transform from focus events, since `scrollIntoView` won't help a transform-based track).
- Form: real `<label>` associations, `aria-invalid`, `aria-describedby` for errors, `aria-live` for submit result.
- Decorative canvases and duplicated marquee row: `aria-hidden="true"`.
- Verify contrast against the Brand Kit table; every pair listed there passes.
- Honour `prefers-reduced-motion` as specified above.

**SEO / metadata**

- `metadata` in `layout.tsx`: title "Odd Planet — Influencer Marketing & Content Agency", description from the hero line, OG image, canonical.
- JSON-LD `Organization` (name, founding date 2023, New Delhi, email, phone, sameAs Instagram/LinkedIn) and `WebSite`.
- Semantic landmarks: one `<h1>` (hero), `<h2>` per section, `<nav>`, `<main>`, `<footer>`.

---

## State

| State | Owner | Notes |
|---|---|---|
| `pinProgress` (0–1) | `use-pinned-track` | Derived from scroll; drives track transform, rail width, `NN / 07`. Ref-held, not React state. |
| `coverflow.pos` / `target` | `creator-coverflow` | Fractional index. Refs + direct DOM writes; only the **selected index** goes to React state (for the caption). |
| `coverflow.drag` | same | `{ pointerId, startX, startPos, velocity, time }` or null. |
| `revealed` per element | `use-reveal` | One-shot boolean; discard the observer after firing. |
| `counterValue` | `use-count-up` | rAF-driven; writes `textContent` directly. |
| `form` | `contact` | `{ values, errors, status: 'idle' \| 'submitting' \| 'success' \| 'error' }`. |
| `clock` | `contact` | 1s interval string; clear on unmount. |
| `activeSection` | `use-active-section` | Scroll-spy id driving the nav highlight. |
| Ribbon `t` | `ribbon-field` | Elapsed seconds from one shared rAF. |

---

## Assets

**⚠️ All imagery in the prototype is hotlinked from `https://ajaystark.github.io/odd_planet/...` — a third-party GitHub Pages site. None of it is licensed, stable, or production-ready. Every image must be replaced with client-supplied files before launch.**

Needed from the client:

1. **Logo lockup** — transparent PNG/SVG, light version for dark ground. The hero has a drop zone reserved for it.
2. **Creator portraits** — 8, portrait crop, min 800×1067, consistent treatment.
3. **Campaign stills** — 7, 16:9, min 1200×675.
4. **Client logos** — 12+, single-colour SVG preferred (they render silhouetted).
5. **Founder headshot** — square, min 400×400.
6. **Confirmed metrics** for the stat band and all card tables.

Fonts are all Google Fonts (SIL Open Font License) — no licensing action needed.

## Verified state

The prototype was probed in a live browser at the end of the design pass. Confirmed working: 8/8 coverflow cards transformed, 8 dot buttons at 44x44px with inner 7px visuals, scroll-spy nav bound, pinned frame at `100dvh` with `data-overflow: 1030`, both gradient canvases DPR-scaled and painting non-zero pixels, live clock ticking, 12 reveal groups / 8 rows / 7 cards / 4 counters initialised, stroke-text observer bound, and **no horizontal page overflow** at any width tested.

One layout-validator warning is expected and correct: the hero `<h1>`'s serif italic line reports a ~9px vertical overlap with the line below it. That is the intentional optical tuck between `attention, influence` and `& CULTURE.` — do not "fix" it by adding line-height.

---

## Files in this bundle

| File | What it is |
|---|---|
| `Odd Planet Website v2.dc.html` | **The design reference.** Full page: template markup + the logic class (reveals, counters, pin, coverflow, ribbon canvas, clock, form). |
| `Odd Planet Brand Kit.dc.html` | Palette with the deck-extraction audit, ramps, type specimens, component treatments, contrast table, do/don't rules. |
| `Odd Planet Website.dc.html` | Superseded v1. Included for history only — **do not build from it.** |
| `image-slot.js` | Prototype-only drag-and-drop image placeholder. Not needed in production. |
| `support.js` | Prototype runtime. Not needed in production. |

Open the HTML files directly in a browser to see the live design and motion.
