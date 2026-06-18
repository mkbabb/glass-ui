# BC web-SOTA research — awwwards + herostudios.tv (the audacious-type north-star)

Assignment: research the web-SOTA design language (herostudios.tv + awwwards current best-in-class) and return the FULL `BC.W-HERO-AUDACIOUS` + `BC.W-PAGE-CHASSIS` design spec, mapped to glass-ui's existing √φ type ladder + per-category icons + scroll-shrink + ONE glass card + procedural bg. Band 5 (page standardization).

All findings are GROUNDED — live-measured via a real browser (herostudios.tv at 1920×1080), live-measured glass-ui :5199 starting-states, and cited SOTA sources.

---

## 1 — herostudios.tv: the DEEP-measured design language (the north-star)

Live-driven a real Chromium at 1920×1080 and read computed styles off the DOM. The measured truth corrects the WebFetch first-read (which undersold sizes + mis-read the type as "bold").

### 1.1 Typography — measured ladder (full desktop)

| role | element | size (px) | weight | tracking | leading | font | transform | color |
|---|---|---|---|---|---|---|---|---|
| project display | H2 "Musical Hallucinations" | **121.9** | 400 | normal | 1.00 (lh==fs) | **Nyght** (serif) | none | #000 |
| hero tagline | DIV "Hero is a motion design and animation studio…" | **88.9** | **300** | **-0.89px (≈-0.01em)** | 1.05 | Nyght | none | #000 |
| client roster | DIV "AKQA Netflix TBWA McDonald's…" | **76.2** | 300 | normal | 1.00 | Nyght | none | #000 |
| nav | DIV "Work About" | **48.3** | **900** | normal | 1.00 | **Basic Sans** | **UPPERCASE** | #fff (over dark) |
| email CTA | A "hello@herostudios.tv" | 31.7 | 300 | normal | 1.00 | Nyght | none | #fff |
| section eyebrow | SPAN "A collection of fun studio work" | 22.9 | 400 | -0.46px | 1.00 | Basic Sans | UPPERCASE | #000 |
| micro / copyright | DIV "Hero Studios © 2026" | 17.8 | 400 | normal | 1.00 | Basic Sans | UPPERCASE | #000 |

**The cardinal insight (the audacious move):** the display register is a **LIGHT (weight 300-400) ELEGANT serif at MASSIVE size** (89-122px), paired with a **HEAVY (weight 900) TINY UPPERCASE sans** for nav/eyebrows/labels. The contrast is not "bold huge type" — it is *light-huge-serif* against *heavy-tiny-sans*. The tracking on the display is a **proportional negative ≈-0.01em** (exactly glass-ui's `--type-tracking-display: -0.015em` Apple signature — already minted). The leading is **tight ≈1.0-1.05** (display lines hug; lh == fs on the largest, 1.05 on the multi-line tagline) — exactly glass-ui's `--type-leading-display: 1.05` (already minted).

### 1.2 Color — measured

- Ground: `rgb(245, 244, 243)` = **#F5F4F3, a WARM off-white** (NOT pure white — confirms glass-ui's warm-cream identity is on-brand, not a deviation).
- Ink: `rgb(0, 0, 0)` pure black on the light ground.
- Reversal: hero/feature sections flip to a dark ground with `#fff` ink (the dark-arm register).
- **Color restraint is extreme** — zero brand-chromatic blocks in the frame; ALL color comes from the embedded motion assets (the work samples). The frame is a quiet monochrome stage. This is the "minimal restrained color, motion carries the energy" north-star verbatim.

### 1.3 Whitespace, grid, layout — measured

- `main` padding = **0px on all sides** → full-bleed, edge-to-edge content (the substrate/sections own their own gutters).
- `scrollHeight = 6716px` at a 1080 viewport → a **long editorial scroll** (6.2 viewports), generous vertical rhythm.
- Exactly **1 sticky element** — the nav persists; the hero does NOT scroll-shrink here (herostudios is editorial-scroll, not sticky-shrink — the scroll-shrink is the awwwards SaaS/product pattern, §3).
- `canvases: 0, videos: 0` — motion is **2 embedded GIF/webp assets**, NOT procedural/WebGL. herostudios proves the AUDACIOUS-TYPE + RESTRAINED-COLOR + MOTION-FOCAL gestalt without any procedural substrate. (glass-ui's differentiator vs herostudios: glass-ui ADDS the live procedural substrate behind the same audacious-type gestalt — a strict superset.)

### 1.4 The gestalt (adjectives, north-star)

Minimalist · confident · motion-forward · light-elegant-display-over-heavy-tiny-labels · warm-off-white high-contrast · generous whitespace · color deferred to motion. "Professional yet playful, craft-focused."

---

## 2 — The SOTA liquid-glass refraction recipe (the material north-star)

The "generic blur is dead" 2026 consensus, captured from [Lucky Graphics' 2026 liquid-glass guide](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/) + the WebGL liquid-glass library corpus ([ybouane/liquidglass](https://github.com/ybouane/liquidglass), [naughtyduk/liquidGL](https://github.com/naughtyduk/liquidGL)). This is band-1 material (glass identity) but binds the hero/page chassis because the ONE glass card IS the material specimen on every page.

**Why generic `backdrop-filter: blur()` alone is now a quality failure:** refined users + automated quality crawlers expect glass to respect optical PHYSICS — warping/distortion/refraction — not just obscuration. A flat blur reads as "frosted plastic," not glass.

The four-layer SOTA recipe (each layer maps to a glass-ui axis that ALREADY EXISTS — the gap is APPLICATION + tuning, not invention):

1. **Base** — `backdrop-filter: blur(8-16px) saturate(180%)` + `transform: translateZ(0); will-change: transform`. Note: **LOWER blur (8-16px) compensated by HIGHER saturation** is the GPU-efficient SOTA — this exactly validates glass-ui's BA.W-GLASS-CAL dial-back (quiet 8 / resting 10 / floating 13) + the dark-arm `saturate(1.22-1.35)` companion. glass-ui is ON-SPEC here.
2. **Refraction/displacement** — the differentiator. SVG `feDisplacementMap` (glass-ui's `.glass-lens` / `#glass-refract` BB.W-LENSING) OR a WebGL UV-displacement pass. The cited GLSL pattern: `color = texture2D(uBackBuffer, uv + displacement * 0.02)` (displacement scale 0.02, the edge-concentrated squircle profile glass-ui already encodes). The backdrop BENDS at the rim.
3. **Chromatic fringe** — ultra-thin high-chroma linear gradients on the 1px border (spectral edge-splitting = "heavy physical glass"). glass-ui books this as the W-LENSING chromatic-aberration successor.
4. **Specular + rim** — a mouse-reactive radial-gradient catch-light (glass-ui's `useSpecularPointer` / `vSpecular` / W-LIQUIDHOVER) + `box-shadow: inset 0 0 20px oklch(100% 0 0 / 0.05)` rim light. **OKLCh-Lightness-normalized so it reads on both black AND bright backgrounds** — the iOS-27 "more glass AND more legible" target.

**Performance caps (binding for the page chassis):** ≤3 concurrent active glass panels per page; the "ONE glass card per page" rule (D-C) is ON-SPEC. Reduced-motion → drop blur to `opacity: 0.95` flat.

**The takeaway for band 5:** the page chassis's ONE glass card should be the SOTA refractive material (deep tier + lens + specular), not a flat-blur grey slab. The D1 grey-slab + D2 black-bar are the anti-pattern this recipe kills.

---

## 3 — The scroll-shrink hero technique (the SOTA, CSS-native, the C-mandate)

The user's binding bar (USER-DEFECTS §C): *"EVERY PAGE must have an audacious, LARGE, hero-like header that SHRINKS as you scroll."* The 2026 SOTA is **CSS-native scroll-driven animation — no JS, no rAF, no Lenis/GSAP** (glass-ui's no-Lenis/GSAP fence is binding + on-trend). Captured from [Chrome scroll-driven case studies](https://developer.chrome.com/blog/css-ui-ecommerce-sda), [Builder.io scroll-driven hero guide](https://www.builder.io/blog/scroll-driven-animations), [scroll-driven-animations.style shrinking-header demo](https://scroll-driven-animations.style/demos/shrinking-header-shadow/css/), [MDN scroll-timeline docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines).

The recipe:
- `position: sticky; top: 0` pins the hero header.
- `animation-timeline: scroll()` ties a `@keyframes` to scroll progress.
- `animation-range: 0 200px` completes the shrink within the first ~200px of scroll, `animation-fill-mode: forwards` HOLDS the shrunk state.
- The shrink animates **COMPOSITOR-SAFE channels ONLY** — `transform: scale()` on the title (NOT `font-size`, which reflows every frame — glass-ui's `proof:no-layout-animation` + the BB.W-CARD-COMPOSITE precedent: font-size→scale, text lays out ONCE), coupled `opacity`/`translateY` on the eyebrow/blurb.
- `@supports (animation-timeline: scroll())` gates it as progressive enhancement; the no-support engine paints the static large hero (correct fallback).
- PRM → drop the shrink, hold the large static hero (vestibular floor).

glass-ui ALREADY ships the substrate: `scroll-choreography.css` (`.scroll-build`/`.scroll-cascade`/`.scroll-pin`), `scroll-driven.css`, `useScrollProgress`, the `--card-scroll` named-timeline `<ScrollCard>` precedent (BB.W-SCROLL-CARD: `scaleY`/`translateY`/`scale` lanes on a scroll timeline, CLS 0). The gap is APPLYING a scroll-shrink lane to the hero TITLE (the `text-display-mega`/`-hero` rung scales down toward `text-heading` as you scroll), via the same compositor-transform discipline `<ScrollCardHeader>` already uses for its slotted `<CardTitle>`.

---

## 4 — The per-category-icon redirect-card pattern (the bento/hub SOTA, the D6 fix)

The user's bar (USER-DEFECTS §C/G + D6): *"Hero items that redirect (link cards) must have icons + better design hierarchy."* The 2026 SOTA is the **bento/redirect-card pattern**: per [Landdding's 2026 bento guide](https://landdding.com/blog/blog-bento-grid-design-guide), effective cards follow **icon-at-top → headline/label-middle → supporting-detail-bottom**, with subtle per-category background-hue grouping (Notion's pattern: analytics-blue, collab-green) + glassmorphism tiles (backdrop blur + semi-transparent) + scroll-in / hover-lift micro-interaction.

**MEASURED starting-state (the defect, live :5199 homepage):** the 11 category redirect cards carry `hasSvgIcon: false` — ZERO icons rendered — despite the manifest at `demo/stories/manifest.ts` DEFINING a per-category `icon` field (lines 160-720: `Compass`/`Droplet`/`FormInput`/`Shapes`/`Boxes`/`Navigation`/`PanelBottom`/`Database`/`Bell`/`Sparkles`/`LayoutDashboard`). The card bg is `oklab(0.768 … / 0.72)` (the D1 grey glass), border-top `srgb(0.11 0.098 0.09 / 0.13)` (the **D2 black-bar rim** confirmed live), radius 16px, **zero box-shadow** (flat). Cards are 520×154.

**The fix (bento redirect card):** render the manifest `icon` in a glass-ui `<IconChip :section="N">` (the section-color POP vehicle, already shipped — `color-mix(25%) backplate + full-chroma glyph`) at card-top, the category title (heading rung) + blurb beneath, with the per-category section-hue tinting the chip (the one-color-event rule — `proof:suffuse` d1-d3). Hover-lift on `--spring-smooth` (the `.glass-menu-row` lift precedent). This is a demo-consumer composition (zero src/ paint) — it composes shipped primitives.

---

## 5 — The map onto glass-ui's EXISTING √φ ladder (the application gap)

glass-ui OWNS the entire audacious type SYSTEM; the gap is APPLYING it. Measured token peaks (`src/styles/typography/scale.css`):

| token | clamp | peak | current use | the gap |
|---|---|---|---|---|
| `--type-display-audacious` | `clamp(8.728rem, 5rem + 16vw, 22rem)` | **352px** | metric/number values ONLY | NEVER on a hero |
| `--type-display-hero` | `clamp(6.854rem, 4.5rem + 12vw, 17.942rem)` | **287px** | rare | NEVER on a hero |
| `--type-display-mega` | `clamp(5.382rem, 4rem + 9vw, 11.089rem)` | **177px** | metric values | NEVER on a hero |
| `--type-display-5..1` | φ^4 … φ^2 | 110…42px | section heroes | display-3 (68px) is the STORYHERO CEILING |

**MEASURED starting-state:** the homepage hero (`/foundations/intro`) renders its H1 "Glass, paper, and the golden ratio." at `text-display-4` = **86px weight-600** (Plus Jakarta Sans). StoryHero's chassis `<h1>` is hardcoded `text-display-3` (line 292/333 of `StoryHero.vue`) = ~68px peak. So EVERY substrate hero page caps at display-3 (68px) and the front-door at display-4 (86px) — the audacious 177/287/352px tiers are STARVED on heroes. herostudios runs 89-122px display; glass-ui should run `text-display-mega` (177px peak) on the front-door hero and `text-display-5`/`-hero` (110-287px) on substrate heroes.

**The font role-map (herostudios → glass-ui, 1:1):**
- Nyght (light serif display, weight 300-400) → **Plus Jakarta Sans at the display ladder** (glass-ui's display register; the `cm-serif` "glass-ui" wordmark already gives the serif accent moment). Note: glass-ui display weight is 600 — to match herostudios's LIGHT-huge-display gestalt, the front-door hero could opt a lighter display weight via the `text-hero` `font-weight: 300` utility (already shipped, lines 41-46 semantic.css). This is a tuning knob, not a new face.
- Basic Sans weight-900 UPPERCASE → **Fira Code (mono) at `text-mono-caption` / `text-admin-label`** — the eyebrow/micro-label POP. glass-ui's eyebrow IS already mono-uppercase-tracked (`text-mono-caption`, BB.W-EYEBROW-UNION). The "POP" is to lean into it: the eyebrow is the heavy-tiny counterweight to the light-huge display.

---

## 6 — THE SPEC: BC.W-HERO-AUDACIOUS (the per-category-distinct audacious hero)

**Goal.** Every hero page (front-door + each category landing + each substrate hero) reads as an AUDACIOUS, herostudios-grade display moment — a LARGE display title on glass-ui's √φ ladder (177-287px peak, not the starved 68-86px), DISTINCT per category (per-category icon + per-category procedural bg + per-category section-hue), with the category redirect cards carrying their manifest icons + bento hierarchy. Kill the duplication (D6: /compositions/hero ≡ homepage; /foundations/intro three-heroes).

**Starting-state (measured).**
- StoryHero chassis `<h1>` hardcoded `text-display-3` (~68px) — `StoryHero.vue:292,333`. Front-door at `text-display-4` (86px). The 177/287/352px tiers never reach a hero.
- Category redirect cards: ZERO icons rendered (`hasSvgIcon:false`) despite `manifest.ts` defining 11 per-category icons; flat grey glass (`oklab(0.768/0.72)`), D2 black-bar border-top, no shadow.
- `/foundations/intro` = three stacked heroes (the `cm-serif` "glass-ui" 53px wordmark + the 86px display H1 + a third) — the THREE-hero defect.
- `/compositions/hero` content ≡ homepage content (D6).
- 3 hero aurora palettes exist (`aurora-hero.ts`: rose-indigo-amber, amber-indigo-rose, purple-tomato) — but only 1 is the default; no per-category mapping. The 13-stop `--section-color-0..12` ramp gives a per-category hue source.

**Target spec.**
- **The audacious display rung.** StoryHero front-door hero `<h1>` → `text-display-mega` (177px peak); substrate hero `<h1>` → `text-display-5` (110px) or `text-display-hero` (287px) for the marquee substrate pages. The chassis exposes a `heroScale` prop (`mega|hero|5|4|3`) so a page picks its tier; default per variant (front-door=mega, substrate=5). Tracking `--type-tracking-display` (-0.015em, already minted), leading `--type-leading-display` (1.05, already minted) — herostudios-validated.
- **The light-huge option.** The front-door hero may compose `text-hero` (weight 300, the herostudios light-display gestalt) as the marquee register; section heroes stay weight-600. A tuning choice, recorded in `aurora-hero.ts` per-page.
- **Per-category distinctness.** A `CATEGORY_HERO` map (`demo/stories/manifest.ts` or `aurora-hero.ts`): each of the 11 categories → `{ icon (already defined), sectionHue (--section-color-N index), heroPalette (aurora stops), bgKind }`. The aurora hero palette is derived from the category's section-color (reuse `heroAuroraConfig` + add per-category palette keys built from the section-color OKLCh stops). So substrates=Droplet+aurora-blue, motion=Sparkles+constellation-violet, forms=FormInput+grid-teal, etc. — each hero reads DISTINCT.
- **The icon redirect cards (the D6 fix).** The category hub renders each card as a bento redirect card: `<IconChip :section="N">` (manifest icon, per-category hue) at top → category title (`text-heading`) → blurb (`text-small text-muted-foreground`) → an explicit subpath code-chip (`/foundations` in Fira Code — the user's "subpath explicitly defined" bar). Hover-lift on `--spring-smooth`, rounded `--radius-card` (16px), the D2 rim → catch-light (band 1's `BC.W-BLACK-BAR`).
- **Kill duplication.** `/compositions/hero` gets distinct content (a composition showcase, not the homepage clone); `/foundations/intro` collapses three heroes → ONE (the `cm-serif` wordmark folds into the eyebrow or the single display H1).

**Acceptance.** Per the `proof:ba-gestalt` type-band + cross-page verdict (W-REFLECT3 re-earns it on fresh capture): (1) the front-door hero `<h1>` resolves a display rung ≥ `text-display-mega` (computed font-size ≥160px at ≥1440px viewport); (2) each substrate hero resolves ≥ `text-display-5` (≥104px); (3) every category redirect card renders its manifest SVG icon (`hasSvgIcon:true`) + a Fira-Code subpath chip; (4) `/compositions/hero` content-hash ≠ homepage content-hash; (5) `/foundations/intro` has exactly ONE `<h1>`; (6) ≥3 distinct per-category hero palettes paint (measured hue spread). Gestalt: each hero reads audacious + DISTINCT, not a repeated grey-card grid.

---

## 7 — THE SPEC: BC.W-PAGE-CHASSIS (every page standardized — scroll-shrink + ONE glass card + procedural bg)

**Goal.** EVERY page wears the ONE standardized chassis: an audacious LARGE hero title + subtitle + the explicit subpath (Fira Code), that SCROLL-SHRINKS as you scroll (sticky → compositor-scale), over a per-category procedural background, with the page body in exactly ONE glass card (kill the "double-card with grid bg" idiom — USER-DEFECTS §C). The chassis is the demo-private `StoryHero`/`StoryPage`/`StoryHeader` cluster, refit.

**Starting-state (measured).**
- `StoryHero.vue` already wraps body in ONE glass card over a per-category bg (`CATEGORY_DEFAULT_BG` map, `manifest.ts:120-132`) — the architecture EXISTS. The gaps: (a) no scroll-shrink (the hero is static; only 1 sticky el on homepage = the nav, not the hero); (b) the title caps at display-3/4 (under-audacious, §6); (c) the "double card idiom with grid bg" persists on some pages (USER-DEFECTS §C — the page card over a grid that ALSO has a card); (d) subpath not always explicit; (e) the D1 grey-slab + D2 black-bar on the card.
- `StoryHeader.vue` already gives the ordered eyebrow→title→blurb cluster with the 3-stage GRAVITY entrance (BB.W-HIERARCHY2) — the reading-order is correct; the gap is the scroll-shrink + the audacious size.
- The scroll substrate EXISTS: `scroll-choreography.css` (`.scroll-build`/`.scroll-cascade`/`.scroll-pin`), `useScrollProgress`, the `--card-scroll` named-timeline `<ScrollCard>` precedent (compositor-safe scale lanes, CLS 0).

**Target spec.**
- **The scroll-shrink hero lane.** Add a `.story-hero-shrink` register (`story-hero.css`): the hero cluster wrapper is `position: sticky; top: 0` over a `scroll-timeline`; a `@keyframes story-hero-shrink` scales the title `transform: scale(1 → ~0.45)` (display-mega→heading-equivalent) + translates/fades the eyebrow+blurb, `animation-timeline: scroll()`, `animation-range: 0 ~240px`, `animation-fill-mode: forwards`. COMPOSITOR-ONLY (scale/translate/opacity — the BB.W-CARD-COMPOSITE font-size→scale discipline; `proof:no-layout-animation` holds). `@supports (animation-timeline: scroll())` gate; PRM → no shrink, static large hero. The shrunk hero becomes a slim sticky page-header (title + subpath) — the herostudios persistent-nav feel.
- **ONE glass card, never two.** Enforce the "ONE card with the procedural bg" rule: the page body sits in ONE `<Card>` over the per-category procedural substrate; NO nested grid-card-over-card. The "grid" background is a SUBSTRATE (the page bg), never ALSO a card — when a page declares `background:"grid"`, the grid is the full-bleed page wash (the `.story-bg-grid` reads THROUGH the single card), not a boxed grid card. (This couples to band-4 `BC.W-GRID-SIMPLE` — the simple keyframes.js grid.)
- **The explicit subpath chip.** Every hero renders the route's subpath (e.g. `@mkbabb/glass-ui/aurora` or `/substrates/aurora`) as a Fira-Code code-chip in the eyebrow cluster (the user's "with its subpath explicitly defined" bar, USER-DEFECTS §E). This couples to `BC.W-CODE-BLOCKS` (band 5).
- **The procedural bg per page.** The `CATEGORY_DEFAULT_BG` map stays the source, but reconciled with band-4: live GL (aurora/constellation/fourier) clustered on the GL-budget pages (one GL context per route); the dense bands ride the SIMPLE keyframes-grid or paper wash. The card drops to the THIN `wash`/`quiet` tier over a live field so it reads THROUGH (the `cardTier` computed already does this, `StoryHero.vue:212-216`).
- **The card material.** The ONE card is the SOTA refractive glass (band-1 deep-tier + lens + specular), warm-cream, NOT the grey slab — couples to `BC.W-GLASS-IDENTITY` + `BC.W-BLACK-BAR`.

**Acceptance.** Per `proof:ba-gestalt` cross-page verdict (W-REFLECT3): (1) every enrolled page has a hero with a display-rung `<h1>` + a Fira-Code subpath chip; (2) on scroll the hero title's computed transform scale drops monotonically over the first ~240px and HOLDS (a captured frame-series, not a source assert); (3) PRM → the title scale stays 1 (no shrink), the hero static; (4) every page has exactly ONE glass card (no nested card-over-grid-card); (5) the card resolves a translucent warm glass (α < 0.92, warm hue per `proof:no-gray`), NOT the grey slab; (6) the per-category procedural bg paints behind (meanLum > 0). Gestalt: every page reads standardized — audacious hero, shrink-on-scroll, ONE card, live bg — not the repeated double-card-on-grid.

---

## 8 — Band-5 wave-map (how this lands)

- `BC.W-HERO-AUDACIOUS` ← §6 (the per-category-distinct audacious hero + icon redirect cards). Primary deliverable.
- `BC.W-PAGE-CHASSIS` ← §7 (scroll-shrink + ONE card + procedural bg, every page). Primary deliverable.
- `BC.W-COMPOSITIONS-HERO` ← §6 duplication-kill (compositions distinct, intro three→one). Couples to W-HERO-AUDACIOUS.
- `BC.W-CODE-BLOCKS` ← §7 subpath chip (Fira Code component names + technical values).
- `BC.W-PAGE-HIERARCHY` ← §7 hr/card delimiting + design-hierarchy suffusion (the StorySection rung + the eyebrow POP).
- `BC.W-PAGE-PRUNE` ← prune "view source"/platitudes/out-of-date copy (orthogonal, content pass).

**Cross-band couplings (must reconcile):** band 1 (`BC.W-GLASS-IDENTITY`/`BC.W-BLACK-BAR` — the card material the chassis hosts); band 4 (`BC.W-GRID-SIMPLE`/`BC.W-PAPER-GRID-LIQUID` — the per-page procedural bg); band 7 (`BC.W-SPRING-EASE` — the hero entrance + hover-lift springs).

---

## Sources

- herostudios.tv — live-driven measurement (Chromium 1920×1080, computed-style read), 2026-06-18.
- glass-ui :5199 — live-measured starting-states (homepage hero, category cards, token peaks), 2026-06-18.
- [Lucky Graphics — Liquid Glass 2026 guide](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/) (the refractive-glass recipe; "generic blur is dead").
- [ybouane/liquidglass](https://github.com/ybouane/liquidglass) + [naughtyduk/liquidGL](https://github.com/naughtyduk/liquidGL) (the WebGL displacement/chromatic-aberration glass libraries).
- [Awwwards Fluid Glass SOTD](https://www.awwwards.com/sites/fluid-glass) (GSAP/Nuxt, mask-wipe-on-scroll, ground #212325/#0B1012 — the dark-glass register).
- [Chrome scroll-driven case studies](https://developer.chrome.com/blog/css-ui-ecommerce-sda) + [Builder.io scroll-driven hero](https://www.builder.io/blog/scroll-driven-animations) + [scroll-driven-animations.style shrinking-header](https://scroll-driven-animations.style/demos/shrinking-header-shadow/css/) + [MDN scroll-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines) (the scroll-shrink technique).
- [Landdding 2026 bento guide](https://landdding.com/blog/blog-bento-grid-design-guide) (the per-category-icon redirect-card / bento pattern).
- [reallygooddesigns 2026 trends](https://reallygooddesigns.com/web-design-trends-2026/) + [Awwwards typography collection](https://www.awwwards.com/websites/typography/) (audacious-type + procedural-bg + scroll-choreography trends).