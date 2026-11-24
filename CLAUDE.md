# CLAUDE.md — Clicksone Portfolio Website

The production website for **Clicksone**, a creative design agency (branding, UI/UX, web, pitch decks, editorial, video).
Source of truth for copy and requested changes: `Website content - UPDATED.docx` (in this folder). It holds reference
screenshots of the current design plus a section-by-section change list. **Keep all copy from that draft intact.**

---

## 1. Colour scheme — LOCKED to "Website content - UPDATED" (do not change)

| Token          | Value     | Use                                                        |
|----------------|-----------|------------------------------------------------------------|
| `--c-ink`      | `#090514` | Deep purple-black (nav bar, dark sections, footer)         |
| `--c-plum`     | `#1a0b2e` | Dark purple gradient partner                               |
| `--c-violet`   | `#7B2CBF` | Accents, labels, highlighted headline words                |
| `--c-electric` | `#8A2BE2` | Buttons, active states                                     |
| `--c-white`    | `#FFFFFF` | Light sections                                             |
| `--c-mist`     | `#F6F6F8` | Light grey cards                                           |
| `--c-text`     | `#111111` | Headlines and body text (second headline line at 40%)      |

- `--c-pink/--c-purple/--c-orange/--c-cyan/--c-black` are old role names that now point at the draft colours above.
- Imagery keeps its draft colours: project mockups, Impact stat cards, rating badges, ✓/✗, AI icons.
- Exception approved by the client: the What We Do service cards keep their current colours (hard-coded in the V4 block).
- Logos: `assets/brand/wordmark.png` and `assets/brand/emblem.png`. Typeface: Plus Jakarta Sans.
- Regions served: USA, UK, Canada, Europe and the Middle East (not Asia).

### Layout, type and motion tokens (also in `:root`)

`--gutter`, `--container` (1320px, use `.container`), `--section-y`, `--gap`, `--radius-card`, `--radius-pill`,
`--nav-h` (60px, 56px on phones), `--ease-out: cubic-bezier(.16,1,.3,1)` (the only easing), `--t-fast/.t-base/.t-slow/.t-reveal`,
`--fs-display` (hero headline), `--fs-h2` (section headlines: weight 700, line-height .95, letter-spacing -.035em),
`--fs-label` (labels: uppercase monospace, .12em tracking, `--c-violet`). Two-tone headlines: wrap the quieter part
in `<span class="muted">` (40% opacity).

## 2. Architecture

Plain, static, no build step: **HTML + CSS + vanilla JS** (classic `defer` scripts, not ES modules, so pages also
open by double-click from `file://`). Deploy the folder as-is to any static host.

```
index.html        Home (all sections, in draft order)
about.html        About Us
services.html     Services (all 6 services, process, pricing)
work.html         Our Work (12-card filterable grid)
app.html          App page (linked from the nav "App" item)
blogs.html        Blogs
contact.html      Contact Us
legal.html        Refund / Disclaimer / Privacy / Terms (placeholder text — replace before launch)
404.html          Not found
assets/css/style.css   Tokens, layout, every component
assets/js/partials.js  All copy + data (SITE, SERVICES, PROJECTS, TESTIMONIALS, PLANS…) and shared markup → window.CS
assets/js/main.js      Renders partials, then initialises every module. The globe uses cobe@0.6.3 from jsDelivr
                       (dynamic import, pinned); a CSS dotted globe shows if WebGL or the CDN is unavailable.
                       Optional Lenis smooth scroll (lenis@1.3.4, jsDelivr) behind `ENABLE_SMOOTH_SCROLL` at the
                       top; `DEBUG` there logs logo-shuffle timing. GSAP 3.12.5 + ScrollTrigger (jsDelivr, loaded
                       in each page head) drive the flip-book and the pinned process track; both fall back without it.
scripts/check-links.mjs  Headless-Chrome link + global-element checker
```

- Shared blocks are written **once** in `partials.js` and placed with `<div data-partial="name"></div>`.
  Edit them there, never by copying markup into pages.
- Modules in `main.js` initialise only if their root element exists on the page, so any section can move between pages.
- Site-wide settings (booking URL, email, phone, placeholder avatars) live in `SITE` at the top of `partials.js`.
- Project/portfolio visuals are CSS-drawn device mockups. To use real images, drop files in `assets/work/` and set
  `img` on the project entry in `partials.js` (`PROJECTS`).

## 3. Mandatory global elements (every page)

1. **Top navigation** (floating glass bar at the top, never a side rail): logo, `About Us`, `Services` (dropdown of
   6 services), `Our Work`, `App` → `app.html`, `Blogs`, `Contact Us`, and `Book a Call →` CTA. A highlight pill
   glides between links; hides on scroll down, returns on scroll up; scroll-progress line. Mobile: full-screen menu.
   Because the bar floats, each page's first section uses `padding-top: var(--first-pad)`.
2. **"Book a Call — Need More Than One Service?"** dark-purple banner (`data-partial="cta-banner"`) on every page.
3. **Floating discovery bar** (`.book-pill`) "Let's discuss your project. [Book a call]" fixed to the bottom on every
   page (injected by `main.js`). Appears after 80% of a screen of scrolling, hides over the footer and while the
   mobile menu is open; × hides it for the session.
4. Footer with large clickable email as the last thing visitors see.

## 4. Interactive features (no static sections)

| Section | Behaviour |
|---|---|
| Hero | Full-screen, centred. Real rating-badge logos in an overlapping cluster, purple/pink headline, orange "Start a Project" with a soft ring cue, "Book an intro call", client-logo marquee. |
| Portfolio slider | Two rows, continuous marquee in opposite directions, floating UI icons on cards, **pauses on hover**. |
| Client logos | 9 unique logos (Visa, Microsoft, Super Buddha Studios, RE/MAX, Red Bull, Warnert, Nothing, ScoreApp, Sony) — FLIP shuffle 700ms after the wall is 15% visible, then every 2.6s (rippled 0.03s per tile), no duplicates; pauses on hover (600ms resume delay) and off screen. |
| Our Work | Two-column mosaic (tall/wide pattern, right column offset), dark tag pill per card that expands into a bar with "View project ↗" on hover, image insets into a dark frame; sliding filter pill. Home shows 6 projects + a testimonial card, then the rotating "See more work" ring. |
| About | Scroll-pinned flip-book (GSAP): pages turn over the spine Strategy → Design → Execution (vertical page turn on phones). Reduced motion / no GSAP: plain three-item list. |
| What We Do | Six full-width cards in palette tones, pinned and stacked (sticky); the previous card shrinks and dims as the next slides over. Same component on services.html with #branding … #video anchors. |
| Impact | 5 palette stat cards: 3D rise-in, count-up, mini charts draw/fill, mouse tilt on desktop. Fixed order by default; `data-shuffle="true"` on `.impact-grid` enables rotation. |
| Comparison | Clicksone column tinted brand purple. |
| Process | Dark section; five stage cards on a horizontal track pinned and scrubbed by scroll (GSAP) on desktop, swipe row with snap on phones; active card fills purple, progress bar. |
| Global reach | Country labels sit on the cobe globe (positions computed with cobe's own projection); clicking USA / UK / Canada rotates the globe there and shows that review; Europe and UAE are location labels. Auto-advances every 6.5s, pauses on hover. |
| Pricing | Equal-height cards, buttons aligned at the bottom, Growth featured in purple with a "Most Popular" pill; highlight cycles every 2.6s, click keeps a plan selected. |
| Ask AI | Claude / ChatGPT / Perplexity buttons (static, lift on hover), open the tool with a ready question. Smaller heading. |
| Contact | Form unchanged + "We reply within 24 hours." above the button. |

## 5. Motion rules

- One shared easing `--ease-out: cubic-bezier(.16,1,.3,1)` and durations `--t-fast/.t-base/.t-slow/.t-reveal`.
- Headlines (`h1`, section `h2`, banner) reveal word by word (JS split; screen readers get one sr-only copy).
- Pill buttons use the text roll (JS duplicates the label); round icons coin-flip on hover; `[data-cursor]` shows a
  cursor label on desktop; `[data-magnetic]` adds a small magnetic pull; `[data-reveal-stagger]` cascades children.
- Hover-only effects live inside `@media (hover: hover) and (pointer: fine)`.
- Animate only `transform` and `opacity` (60fps). No layout-thrashing animations except the process accordion (flex-grow).
- Animate once on scroll-in, then rest. Constant motion only for marquee, globe, floating icons.
- Everything respects `prefers-reduced-motion: reduce` (marquees stop, counters jump to final value).
- Pause offscreen work (globe, logo shuffle, carousels) via IntersectionObserver / `document.hidden`.

## 6. Quality checklist before shipping

- Every page: nav links, Services dropdown anchors, App link, banner, floating pill, footer all present and working.
- Responsive at 1440 / 1024 / 768 / 390 px; no horizontal scroll.
- Keyboard: focus-visible styles, dropdown and menu reachable, process panels expand on focus.
- `node scripts/check-links.mjs` passes (validates every internal href and #anchor).
