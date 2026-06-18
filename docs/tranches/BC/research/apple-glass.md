# apple.com GLASS — the per-ELEMENT web-SOTA + the bested-with-paper direction (BC, apple-glass)

> **Scope split (read this first).** This doc is the COMPANION to `apple-ios27.md`, not a re-run.
> `apple-ios27.md` owns the iOS-26/27 OS MATERIAL model (the five mechanisms, the kube.io squircle
> refraction math n=1.5/scale=28, the SwiftUI spring family ζ=1−bounce, the iOS tab-bar/button anatomy)
> and the per-axis HEAD-vs-TARGET bake tables. THIS doc owns the **apple.com WEBSITE** — the actual
> shipped web glass, measured LIVE off the DOM per ELEMENT (nav · card · button · control-center
> analogue · dropdown/curtain) — and the **DIFFERENTIATION**: how glass-ui BESTS it with paper + grid +
> math + warm-cream + audacious type ("glass on craft, not glass on photo") and the deep-glass tier for
> hero/CTA. Where the two overlap (the material model), this doc POINTS at `apple-ios27.md`, it does not
> duplicate. The OS is the design INTENT; the website is the shipped WEB reality — they are NOT the same,
> and the gap between them is the whole point of §3.

Live-measured 2026-06-18 via a real Chromium reading `getComputedStyle` off the live DOM at
`apple.com` (1200-wide desktop) + the `apple.com/iphone` marketing page. Every numeric is a measured
truth, not a tutorial value. SOTA citations in §Sources.

---

## 0 — The headline finding (the one that re-frames the whole band)

**apple.com is NOT a glass site. It is a FLAT editorial site with glass on EXACTLY ONE layer: the
sticky global nav (+ its dropdown curtain).** Everything else — every product tile, every card, every
content section, every "Learn more" CTA — is a flat opaque panel or a solid-fill capsule with **zero
`backdrop-filter`, zero rim, zero glass**. Measured: the live homepage had **2** backdrop-filter
elements in the entire DOM (the nav + the dropdown curtain); the marketing page had **1**. This is not
an accident — it is Apple's own published rule executed verbatim: glass "is most effective for the
navigation layer… avoid using glass on glass" ([CSS-Tricks](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)).

The consequence for BC: **the SOTA we are "besting" on the web is austere.** apple.com proves glass is a
NAVIGATION-LAYER accent, not a whole-surface texture — and it proves Apple does NOT ship the OS lensing
to the web at all (no `feDisplacementMap`, no squircle, no specular — just `blur()` + `saturate()` over a
translucent white on the nav). glass-ui's MAXIMAL glass-first default (AX.W54) is already a STRICT
SUPERSET of what apple.com ships; the differentiation is therefore NOT "more glass than Apple" (we
already have that) — it is **glass over a CRAFTED substrate (paper+grid+math) instead of glass over a
photo/flat panel**, plus the OS-grade lensing on the deep tier that apple.com's web never bothered to
ship. We out-Apple Apple on the web by shipping the OS-intent material (lensing/specular/adaptive) AND
putting it over an identity Apple does not have.

---

## 1 — Per-ELEMENT measured truth (apple.com, live DOM)

### 1.1 The global NAV — the ONE true glass element

| axis | measured value (apple.com homepage, scrolled) | note |
|---|---|---|
| `backdrop-filter` | **`saturate(1.8) blur(20px)`** | the EXACT apple-ios27.md "home nav = 20px / 1.8" TARGET, here live-confirmed on the WEB |
| `background` | **`rgba(255, 255, 255, 0.8)`** | 80% white translucency — the plate is mostly opaque, the blur reads through the 20% gap |
| border | **`0px` (none)** all sides | NO rim, NO hairline — the translucent-white plate alone separates it (the D2 lesson: Apple does NOT draw a border on the nav) |
| `box-shadow` | **`none`** | the nav has NO drop shadow; the blur+tint IS the separation |
| `border-radius` | `0px` | edge-to-edge full-bleed bar (`position: fixed`, `h: 44px`, `top: 0`) |
| AT SCROLL-TOP (marketing page) | `background: rgb(250,250,252)` SOLID, `backdrop-filter: none` | **the scroll-edge effect: the nav is OPAQUE at the scroll-edge and MATERIALIZES to glass once content scrolls under it** (matches Apple's UIKit `scrollEdgeAppearance` — [Apple Dev](https://developer.apple.com/documentation/uikit/uinavigationbar)) |

**The nav lesson, distilled:** Apple's web nav glass = `blur(20) saturate(1.8)` over `white/0.8`, NO
border, NO shadow, edge-to-edge, **and it only turns ON once you scroll** (solid at the top edge). The
saturation is the load-bearing term (1.8 is HIGH), the blur is moderate (20px), the plate is mostly
opaque (0.8). This is the austere, legible nav register — not a showy lens.

### 1.2 The dropdown CURTAIN — the materialize-by-fade

When a nav item opens its flyout, a full-viewport `.globalnav-curtain` blurs the page beneath:

| axis | measured value | note |
|---|---|---|
| `backdrop-filter` | **`blur(20px)`** (no saturate) | same blur radius as the nav, the curtain is a darker frosted scrim |
| `background` | **`rgba(232, 232, 237, 0.4)`** | a cool-grey 40% scrim (NOT white) — it DIMS the content, the legibility-separation device |
| materialize | **`opacity: 0 → 0.947` over `0.32s cubic-bezier(0.4, 0, 0.6, 1)` with `0.08s` delay** | the curtain FADES in; the blur (20px) is CONSTANT — the materialization is OPACITY-driven, NOT a blur-ramp |
| visibility | `0.32s steps(1)` | a stepped visibility toggle paired with the opacity fade |

**The materialize lesson:** on the WEB Apple does NOT "modulate the light bending" (the OS materialize,
`apple-ios27.md §2.1`). The web curtain is a flat opacity fade of an already-blurred scrim — `blur` is
constant, `opacity` ramps `0→~0.95` on an ease-in-out (`0.4,0,0.6,1`) over **0.32s** with an **0.08s**
lead delay. This is the achievable web floor; glass-ui's `.glass-reveal` (which DOES ramp the
`filter: blur(4px)→0` per `apple-ios27.md §2.1`) is already RICHER than apple.com's web materialize.

### 1.3 The CARD / TILE — flat, no glass at all

Measured the homepage product tiles + the marketing tiles:

| axis | measured value | note |
|---|---|---|
| `background` | **`rgb(245, 245, 247)`** (opaque grey-white) | a FLAT panel — the warm-grey "Apple light grey" |
| `backdrop-filter` | **`none`** | ZERO glass on cards |
| `border-radius` | **`0px`** on the section tile; tiles are edge-to-edge content bands | the rounding lives on the IMAGE assets, not the panel |
| `box-shadow` | **`none`** | flat, no elevation |
| headline | `56px / weight 600`, ink `rgb(29,29,31)`; subhead `28px / 400` | the audacious-type echo: a big headline over a flat panel |

**The card lesson:** Apple's web "cards" are flat content sections (`#f5f5f7` panels) carrying big type
+ an image. **There is no glass card on apple.com.** This is the differentiation OPENING — glass-ui's
`<Card surface="glass">` over a procedural substrate is a register apple.com's WEB simply does not have.
(Note `rgb(245,245,247)` ≈ the warm off-white herostudios `#F5F4F3` — the WARM-light ground is the
shared SOTA identity; glass-ui's warm-cream `--card` `hsl(36 48% 97%)` is on-brand, NOT a deviation.)

### 1.4 The BUTTON / CTA — solid-fill capsule, NOT glass

| element | measured value | note |
|---|---|---|
| primary CTA ("Learn more") | `background: rgb(0, 113, 227)` (Apple blue, **SOLID**), `border-radius: 980px`, `padding: 11px 21px`, `color: #fff`, `font-size: 17px`, `border: 1px transparent` | a SOLID blue capsule — NOT glass, NOT `.glassProminent`. The web CTA is opaque-fill |
| text CTA (homepage) | plain `rgb(0, 102, 204)` blue text LINK, no background, no pill | the lowest-prominence CTA is bare text |
| carousel paddlenav arrows | `background: rgba(210, 210, 215, 0.64)` (translucent grey capsule), `border-radius: 36px`, **`backdrop-filter: none`** | a TRANSLUCENT control over media — but NO blur (translucency without the frost) |

**The button lesson:** apple.com's web buttons are **solid-fill capsules** (the `980px` /
"`--radius-pill`" stadium radius is the one transferable signature). The OS `.glass`/`.glassProminent`
button (`apple-ios27.md §4`) is an OS register Apple did NOT ship to the web — the web CTA is a flat
blue capsule. The translucent paddlenav (`grey/0.64`, no blur) is the closest web analogue to a glass
control, and even IT skips the blur. So glass-ui's glass `<Button>` (W-BUTTON-GLASS-IOS) is, again, a
SUPERSET of the web SOTA.

### 1.5 The "control-center" analogue — there isn't one on the web

There is no apple.com web surface that maps to the iOS Control Center (the dense floating
glass-tile grid). The closest shipped web analogue is **the carousel paddlenav** (§1.4 — translucent
capsule, no blur) and **the dropdown curtain** (§1.2 — the only full-frost scrim). The dense
glass-on-glass tile grid that Control Center IS lives ONLY in the OS (and Apple's own rule forbids
glass-on-glass, which is why it never appears as a web component). **The glass-ui DOCK is the
control-center analogue glass-ui ships that apple.com's web does not** — a floating, collapsible,
multi-tile glass surface. That makes the dock a NET-NEW register beyond the web SOTA, and the place the
deep-glass tier earns its keep (the dock is one of the three deep-refractive surfaces per route).

### 1.6 The per-element glass-USAGE matrix (the austerity, tabulated)

| element | apple.com WEB | apple OS (iOS 26/27) | glass-ui HEAD |
|---|---|---|---|
| global nav | **GLASS** (blur 20 / sat 1.8 / white-0.8, scroll-engaged) | glass `.regular` | glass dock + nav (maximal) |
| dropdown / menu | **GLASS** (curtain scrim blur 20 / grey-0.4) | glass `.regular` | `.glass-floating` + `.glass-reveal` bloom |
| card / tile | **FLAT** (`#f5f5f7`, no glass) | (content layer, no glass) | **GLASS** (`surface="glass"`) ← superset |
| button / CTA | **SOLID** blue capsule (980px) | glass `.glass`/`.glassProminent` | **GLASS** (default variant) ← superset |
| control over media | translucent capsule, **NO blur** | glass `.clear` (needs dimming) | glass control tier |
| control-center grid | **(none on web)** | glass-on-glass tile grid | **DOCK** ← net-new register |

The matrix is the citation that backs BC's whole glass band: **glass-ui is ALREADY past the apple.com
WEB SOTA on five of six rows.** The remaining work is not "add more glass" — it is (a) make the glass we
ship read as ACTUAL liquid glass (the D2 black-bar fix, the lensing on Chrome, the legibility loop), and
(b) the DIFFERENTIATION — put it over craft, not over a flat panel (§3).

---

## 2 — The web-achievable material params (what apple.com actually uses vs the OS intent)

The cross-reference to `apple-ios27.md` is exact here — the OS intent (lensing/specular/adaptive) is in
that doc; THIS is what apple.com actually ships to a browser, so a BC wave knows the floor:

| param | apple.com WEB (measured) | apple OS intent (`apple-ios27.md`) | glass-ui take |
|---|---|---|---|
| nav blur | `blur(20px)` | regular ≈ 14-20 | deep tier 16px (in-band; full 20 booked) — `BC.W-GLASS-IDENTITY` / deep tier |
| nav saturate | `saturate(1.8)` | 1.5-1.8 | calm 1.18 (W-GLASS-CAL inviolate) / deep 1.5 → push to 1.8 on deep — bake 1.8 as the deep-tier saturate ceiling |
| nav tint | `white / 0.8` (80% opaque) | adaptive, content-through | glass-ui tint is warm-cream, lower opacity (more transmissive) — the WARM differentiator |
| nav border | **NONE** | bright top catch-light | **D2 fix: apple.com draws NO border — glass-ui should drop the uniform warm-ink top rim, NOT add a dark hairline** (this is the apple.com confirmation of `BC.W-BLACK-BAR`) |
| nav shadow | **NONE** | adaptive shadow (OS) | glass-ui's shadows are an enhancement; the apple.com web floor is shadowless — keep them subtle |
| lensing | **NONE on web** | squircle n=1.5 scale=28 | glass-ui SHIPS the lens (`.glass-lens`) on Chrome — **beyond the web SOTA**; Safari floor = blur+tint (matches apple.com web exactly) |
| specular | **NONE on web** | motion-reactive gleam | glass-ui SHIPS the pointer gleam (`useSpecularPointer`) — **beyond the web SOTA** |
| materialize | opacity-fade 0.32s `(0.4,0,0.6,1)` +0.08s | modulate lensing | glass-ui ramps `blur(4px)→0` (`.glass-reveal`) — **richer than the web SOTA** |
| capsule radius | `980px` (CTA), `36px` (control) | `.capsule` / concentric | glass-ui `--radius-pill` — adopt `980px`-class stadium on pill CTAs + tab pills (`BC.W-TABS-IOS`) |

**The two transferable apple.com WEB signatures BC should bake verbatim:**
1. **The nav glass recipe** — `blur(20px) saturate(1.8)` over a translucent plate, NO border, NO shadow,
   scroll-engaged. This is the measured ceiling for the deep tier's diffusion+saturation and the
   confirmation that the rim/shadow are glass-ui ADDITIONS, not Apple requirements (so the D2 fix can
   safely DROP the rim, not invert it).
2. **The stadium capsule** — `border-radius: 980px` (functionally `9999px`) on pill CTAs + the tab pill
   (`BC.W-TABS-IOS` already targets this). Apple's web pills are FULLY rounded, small-padded
   (`11px 21px`), 17px text.

The OS-only mechanisms (lensing, specular, adaptive tint, materialize-by-light-bending) are where
glass-ui already EXCEEDS apple.com web — those are progressive enhancements glass-ui ships and
apple.com's web does not, gated behind `@supports` so Safari degrades to the apple.com-equivalent
blur+tint floor (`apple-ios27.md §6`).

---

## 3 — The DIFFERENTIATION: glass-ui BESTS apple.com (glass on CRAFT, not glass on photo)

The brainstorm's §1-D thesis, now backed by the measured truth: **Apple's material is glass; ours is
glass on craft.** apple.com's glass floats over a flat `#f5f5f7` panel or a product photo. glass-ui's
glass floats over the warm-cream paper underpaint + the blueprint grid + the audacious √φ type + the
colorful section-color POPs — so the material REVEALS our identity beneath it, not just an image. Five
per-element differentiation moves:

### 3.1 NAV / DOCK — glass over the breathing paper-grid, not over a photo
apple.com nav glass blurs whatever scrolls under it (a photo, a flat band). glass-ui's dock/nav glass
blurs the **liquid paper-grid** (`BC.W-VIZ-PAPERGRID` / `BC.W-GRID-SIMPLE` — evenly-spaced larger lines
on a slowly breathing curl-flow sheet) and the warm-cream paper underpaint, so the glass reveals a
CRAFTED engineering substrate (the blueprint identity) where Apple reveals a marketing photo. The dock
is also the control-center register apple.com's web does not have (§1.5) — and the surface that earns
the **deep-glass tier** (`--glass-depth`, `apple-ios27.md §1.4 bake / BB.W-DEEP-GLASS`) at the
`saturate(1.8) blur(16-20px)` apple.com NAV ceiling, but over craft.

### 3.2 CARD — the register apple.com's web does not have
apple.com has NO glass card (§1.3 — flat `#f5f5f7`). glass-ui's `<Card surface="glass">` over the
procedural substrate is a clean win by EXISTING. The differentiation specifics:
- the card glass reveals the **paper-grain + grid + a colorful `<IconChip>` POP + math (Fira Code)**
  beneath, the `math-paper.vue` gold standard — content with CRAFT, not a stock photo;
- the warm-cream `--card` (`hsl(36 48% 97%)`) is a WARMER, more transmissive plate than apple.com's cool
  `#f5f5f7` flat panel — glass that reads as material, not as a grey rectangle;
- the **selection card** (`BC.W-SELECTION-CARD`, the only new Atlas component) adds the `--glass-accent`
  per-instance data-hue rim + the metal-shimmer selected-border — a chromatic, data-keyed glass card
  apple.com's web has no analogue for.

### 3.3 BUTTON — glass-on-craft CTA vs solid-fill capsule
apple.com's web CTA is a SOLID blue capsule (§1.4). glass-ui's glass `<Button>` (W-BUTTON-GLASS-IOS) is
a translucent glass capsule that reads the warm-cream tint + the pointer gleam + the press-spring + (on
the hero CTA, `:liquid`) the squircle lens — so the button is a TRANSMISSIVE material revealing the
craft beneath, where Apple's web button is an opaque slab. We KEEP Apple's transferable signatures (the
`980px` stadium radius, the small `11px 21px` pad, the 17px text, prominence-by-tint not by size —
`apple-ios27.md §4`) and ADD the glass material + the deep tier on the hero CTA. The
`--glass-accent`-as-prominence axis is glass-ui's `.glassProminent` analogue (a CTA glows with its
accent hue at a bounded strength while staying ≥4.5:1) — over craft.

### 3.4 TABS — the iOS-27 capsule, over the paper material twin
apple.com's web has no segmented control; the iOS tab model is OS-only (`apple-ios27.md §3`). glass-ui's
`BC.W-TABS-IOS` ships the iOS-27 glass-capsule pill (track `--glass-bg-quiet`, active pill
`--glass-bg-floating` "selected-reads-as-glass", capsule `--radius-pill`, snappy glide + squish) AND the
**`underline` variant as the PAPER material** (`.paper-ink-mark` — a 2px warm-ink hairline drawn
directly on paper, no plate, no blur). The paper-material tab is the differentiation Apple has no twin
for: a glass register AND a craft/editorial register on ONE engine. `BC.W-LIQUID-TAB` adds the pull-to-
morph-squish (the iOS-27 pull-tab feel) the OS has but the web SOTA does not.

### 3.5 TYPE + COLOR — audacious √φ + colorful POPs the austere apple.com web withholds
apple.com's web is type-confident (56px headlines) but COLOR-austere (flat ink on flat panels, color
deferred to product photos — the herostudios north-star too, `awwwards-herostudios.md §1.2`). glass-ui's
differentiation is the **audacious √φ ladder** (`text-display-*` to 352px, far past Apple's 56px) + the
**13-stop `--section-color` ramp + the `<IconChip>` POPs** suffused WITHIN proportion (the one-color-
event rule, AZ.W-SUFFUSE). The glass plate floats over a substrate that is BIGGER-typed and MORE-
colorful (within restraint) than apple.com's — the craft is louder, on purpose, while the glass material
matches or exceeds the OS intent.

### 3.6 The differentiation, stated as the binding sentence
**apple.com ships glass on ONE layer (the nav), flat everywhere else, over photos/panels, no lensing on
the web. glass-ui ships glass MAXIMALLY (every chrome/content/CTA surface), over the warm-cream
paper-grid-math craft, WITH the OS-grade lensing/specular/adaptive the web never bothered to ship, AND a
deep-glass tier at the apple.com-nav `blur(20)/sat(1.8)` ceiling for the hero/CTA/dock.** Glass on
craft, not glass on photo — and more of it, more legibly, with the OS material the web SOTA skipped.

---

## 4 — Per-element TARGETs the BC waves bake (the apple-glass bake table)

The numbers, mapped to the canonical waves (every wave id verified against `WAVE-INDEX.md`):

### NAV / DOCK (BC.W-GLASS-IDENTITY · BC.W-DOCK-ENGINE · deep tier)
| param | apple.com WEB (measured) | glass-ui TARGET | wave |
|---|---|---|---|
| deep-tier blur ceiling | `blur(20px)` | 16px shipped, push to 18-20 if budget clears | BC.W-GLASS-IDENTITY |
| deep-tier saturate ceiling | `saturate(1.8)` | 1.5 shipped, bake 1.8 as the deep ceiling | BC.W-GLASS-IDENTITY |
| nav/dock border | **NONE** | DROP the uniform warm-ink top rim (apple.com confirms no border) | BC.W-BLACK-BAR |
| nav/dock shadow | **NONE** | keep subtle (a glass-ui addition, not an Apple requirement) | BC.W-DOCK-ENGINE |
| scroll-engage | solid at edge → glass on scroll | OPTIONAL: the dock could engage glass on scroll-under (booked, not required) | BC.W-DOCK-ENGINE (note) |
| over-craft | over photo/panel | over the breathing paper-grid (`BC.W-VIZ-PAPERGRID`) + warm-cream underpaint | BC.W-VIZ-PAPERGRID / BC.W-GRID-SIMPLE |

### CARD (BC.W-GLASS-IDENTITY · BC.W-SELECTION-CARD · BC.W-PAGE-CHASSIS)
| param | apple.com WEB | glass-ui TARGET | wave |
|---|---|---|---|
| card material | FLAT `#f5f5f7` | GLASS `surface="glass"` over craft | BC.W-GLASS-IDENTITY |
| card warmth | cool `#f5f5f7` | warm-cream `--card` `hsl(36 48% 97%)`, more transmissive | BC.W-GLASS-IDENTITY |
| card reveals | a photo | paper-grain + grid + IconChip POP + Fira-code math | BC.W-PAGE-CHASSIS |
| selection card | (none) | `--glass-accent` data-hue rim + metal-shimmer border | BC.W-SELECTION-CARD |

### BUTTON / CTA (BC.W-BUTTON-GLASS-IOS · BC.W-DIALOG-GLASS)
| param | apple.com WEB (measured) | glass-ui TARGET | wave |
|---|---|---|---|
| capsule radius | `980px` | `--radius-pill` (9999px-class) on pill CTAs + tab pills | BC.W-BUTTON-GLASS-IOS / BC.W-TABS-IOS |
| pad | `11px 21px` | small-pad capsule (adopt the proportion) | BC.W-BUTTON-GLASS-IOS |
| text | `17px` | the control-text rung | BC.W-BUTTON-GLASS-IOS |
| fill | SOLID blue | GLASS (transmissive) + tint-for-prominence (`--glass-accent` = `.glassProminent`) | BC.W-BUTTON-GLASS-IOS |
| button glass richness | (web has none) | lift toward floating tier (blur 10-13 / sat 1.18), deep tier on hero `:liquid` | BC.W-BUTTON-GLASS-IOS |

### TABS (BC.W-TABS-IOS · BC.W-LIQUID-TAB · BC.W-UNDERLINE-TUNE)
| param | apple.com WEB | glass-ui TARGET | wave |
|---|---|---|---|
| (web has no segmented control) | — | iOS-27 glass capsule + paper-underline twin | BC.W-TABS-IOS |
| pill radius | `980px`-class (from CTA) | `--radius-pill` capsule, small + rounded | BC.W-TABS-IOS |
| pull-to-morph | (OS-only) | useDragMorph squish-fling (the iOS-27 pull-tab) | BC.W-LIQUID-TAB |
| paper twin | (none) | `.paper-ink-mark` warm-ink hairline | BC.W-UNDERLINE-TUNE |

### MATERIALIZE (BC.W-DIALOG-GLASS · BC.W-DOCK-ENGINE — points to apple-ios27.md §2.1)
| param | apple.com WEB (measured) | glass-ui TARGET | wave |
|---|---|---|---|
| curtain materialize | opacity `0→0.95` over `0.32s cubic-bezier(0.4,0,0.6,1)` +0.08s, blur CONSTANT | glass-ui ramps `blur(4px)→0` (`.glass-reveal`) — richer; keep | BC.W-DIALOG-GLASS |
| dialog transparency | (curtain scrim grey/0.4) | lower `--glass-bg-overlay` toward 0.80-0.85 (HEAD 0.95 is near-opaque) + lens on Chrome | BC.W-DIALOG-GLASS |

---

## 5 — Cross-engine (the apple.com web confirmation for Band 8)

apple.com's web glass is `blur() + saturate() + translucent-bg` — the FULLY cross-engine subset (no
`backdrop-filter: url()` SVG filter anywhere on apple.com). This LIVE-CONFIRMS `apple-ios27.md §6`: the
apple.com web glass paints identically on Chrome AND Safari because Apple uses the cross-engine floor
(blur+saturate+tint) and SKIPS the Chromium-only lens entirely. So glass-ui's `@supports
(backdrop-filter: url(#…))`-gated lens is STRICTLY beyond apple.com — and the Safari degrade (lens off →
blur+tint base) lands EXACTLY on the apple.com-web look. The legibility (tint + the D2 rim fix + the
catch-light) must live on the cross-engine base, never on the Chrome-only filter — apple.com proves the
base alone is enough to read as glass. The Safari FLASH (D5/D7) is the WebGL context-loss churn, NOT the
glass material (`BC.W-SAFARI-WEBGL`, not a glass-band concern).

---

## 6 — Captured-paint acceptance note (for the BC waves that cite this doc)

Per the BC `live-verify = captured-delta` precept, the binding apple-glass acceptance is a per-element
gestalt capture (NOT this measured table alone). Each consuming wave owes its capture under
`docs/tranches/BC/audit/screenshots/session-*/` per `BC.W-GESTALT-FIRST`:
- the glass dock/nav over the breathing paper-grid (§3.1) reads as glass-on-CRAFT, both modes;
- a `<Card surface="glass">` reveals paper-grain/grid/IconChip/math beneath (§3.2);
- a glass `<Button>` reads as a transmissive capsule, not a solid slab (§3.4);
- the tab pill is a capsule + the underline is the paper-ink hairline (§3.4);
- the top edge carries NO dark rim (§4 / D2 — the apple.com-confirmed no-border).

The measured apple.com values in §1 are the comparison GROUND (the "what we beat") — the captured glass-
ui paint is the "what we ship." The two side-by-side ARE the apple-glass delta artefact.

---

## Sources

Live DOM measurements (2026-06-18, real Chromium): apple.com homepage + apple.com/iphone — the §1
numerics are `getComputedStyle` reads, not citations.

- [CSS-Tricks — Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/) (the "navigation layer only / avoid glass-on-glass / regular vs clear / tint" verbatim rules)
- [Apple Developer — Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass) (the OS adoption guidance)
- [Apple Developer — UINavigationBar / scrollEdgeAppearance](https://developer.apple.com/documentation/uikit/uinavigationbar) (the scroll-engage nav pattern, confirmed live on apple.com)
- [WWDC25 Session 219 — Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) (the OS material intent; full detail in `apple-ios27.md`)
- [LogRocket — Adopting Apple's Liquid Glass: examples and best practices](https://blog.logrocket.com/ux-design/adopting-liquid-glass-examples-best-practices/) (scroll edge effects + nav transparency)
- [kevinbism — Recreating Apple's Liquid Glass with Pure CSS](https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl) (the cross-engine blur+saturate floor)
- companion: `docs/tranches/BC/research/apple-ios27.md` (the OS material model, springs, refraction math — the per-axis bake tables) · `docs/tranches/BC/research/awwwards-herostudios.md` (the warm-off-white + audacious-type north-star)
