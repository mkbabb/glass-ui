# category-landing — GOLDEN (the canonical spec)

> **⚠ HARDENING FOLD (2026-06-24, orch live-verified `:5173` both modes — see `./DELTA-ASSAY.md` +
> `./WAVE-AMENDMENT.md`).** Born-RED RE-CONFIRMED across all 4 routes (substrates/forms/display/
> containers): gray window `srgb 0 0 0/.03`, N glyphs, cool/teal chips, `aspect:auto`, ALL 6 tokens
> UNSET. The IDEA SURVIVES (REFINE-dominant + 1 RE-INVENT, ~74%); the SPIKE's weak points are folded
> (F1–F14): **F1** `--phi` has NO owner on disk → THIS wave CO-MINTS `--phi:1.618`, NEVER a bare
> `var(--phi)` (the §M3 rules carry the `,1.618` fallback). **F2** the 5 DEPEND deltas are unbuilt →
> the gate's **G0 deps-present** precondition FAILS LOUD; sequence AFTER warm-fence/page-field/
> field-script/glass-key/concentric-radius; the literal `62`/`1.618` are LEGACY-by-stealth, forbidden
> as the painted gate value. **F3** the §2.1 goo lead card → DESCOPED to a STRETCH arm (highest
> risk-per-card; shipped `#glass-goo` not a local `#goo`; sibling-outside-backdrop; WebKit-verified).
> **F4** DROP the manifest `specimen?` override (ONE `previewKind`-keyed registry). **F6** the spike's
> 5%-occupancy `control` → scale-to-fit ≥45% at the SPAN-2 lead (§M3 stage `container-type:size` +
> `cqmin`; B4 wide-card sub-arm). **F7** the substrates lead `field` would paint `cat-substrates`
> TEAL → WARM-CLAMP the SPECIMEN palette + B3 rasters the specimen histogram DISTINCT from the field
> floor + B2 reads the specimen pixels. **F8** the §3 "lit corner" → the asymmetric `--glass-key`
> over-glaze (the symmetric white rim was born-GREEN-by-omission); B6 measures ΔL, the literal
> FORBIDDEN. **F9** `<Slider :model-value="[62]">` (ARRAY, not `62`→thumbless) + `<Switch
> :model-value>`; the dark floor → `oklch(.30 .05 …)` (C 0.05 ≥ B7). **F11** carve the semantic delta
> chip (green/red) out of the warm-fence. **F12** add a measured perf arm (the backdrop-blur budget,
> not just GL-context count). **F13/F14** drop the field hue-walk; warm-clamp the specimen under
> reduced-transparency. The canonical body below stands; the binding gate is `proof:bento-specimen`
> G0–G14 in `./WAVE-AMENDMENT.md`. Wave name: **`BD.W-BENTO-SPECIMEN`**.

> The `/:category` LANDING — `SectionLanding.vue` (the D1 section hero + bento grid) +
> `SectionPreviewCard.vue` (the bento cards) — on EVERY category route (`/substrates`,
> `/forms`, `/display`, `/containers`, …). The single golden synthesis of LENS-A (pure
> iOS-27 fidelity), LENS-B (cross-engine / perf-first), LENS-C (audacious cartoon-
> technicolor). Tranche-DEV only; the build is USER-gated.
>
> **A UNION, never a fork.** It re-points the SHIPPED `SectionPreviewCard` `#preview` seam
> (`SectionPreviewCard.vue:91`), the `previewKind` field (`category-hero.ts:48`), the warm
> `<Card>`/glass register, the manifest lazy-loader, and the one-GL budget. No new card
> system, no second field engine. KISS · DRY · NO LEGACY.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173/substrates`, both modes, chrome-devtools-mcp)

All three lenses measured the same defects; reconfirmed live this session (`getComputedStyle`
on the real painted card):

| read | live measurement | verdict |
|---|---|---|
| preview window is GRAY | `.section-preview-card-preview` bg = `color(srgb 0 0 0 / 0.03)`, border `srgb 0 0 0 / 0.06` (`SectionPreviewCard.vue:140`) | **RED** — the headline gray, born honest |
| preview is DEAD (glyph, not demo) | 11 cards each render ONE `<svg>` placeholder glyph (`previewSvgCount: 11`); `/substrates/Aurora` shows a Droplet, not aurora | **RED** — the `#preview` seam + `previewKind` exist but are UNCONSUMED |
| cards LARGE + EMPTY | lead card `643 × 388px`, a vast plate around a `max-block-size:112px` empty box | **RED** — "useless large cards" verbatim |
| TEAL | `--section-color-3 = light-dark(oklch(.542 .089 222.8), oklch(.767 .091 219.9))` (h≈220); the IconChip bg resolves `srgb 0.138 0.479 0.583` (teal) | **RED** — owned by the shell-layout warm-hue fence (DEPEND, §6) |
| `--field-h` | UNSET on the landing — no §3 warm field behind the bento | **RED** — the cards have nothing warm to bend |
| card PLATE | bg = `oklab(0.763 0.005 0.011 / 0.72)` (C≈0.012, near-neutral) | **AMBER** — acceptably-warm glass; the disease is the preview WINDOW + the glyph, localized |

**The gestalt (all three lenses agree):** the card chassis (IconChip POP + title + Fira-Code
subpath + hover-lift) is FIT and ships today. It is the **preview window** that is born dead —
a gray box with a placeholder glyph, repeated 11×, on a teal-tinted, field-less landing. The
card is the last gray surface on the page and the one the user is staring at.

---

## 1 — THE GOLDEN IDEA: **THE SPECIMEN STAGE** — every bento card is a bounded warm-glass DIORAMA showing the REAL component over a colorful §3 field, never gray, never teal, both modes

The status quo treats the card as *a link with a gray thumbnail hole punched in it*. The golden
card inverts the metaphor (the strongest convergent move across A/B/C):

> **A bento card is a tiny lit STAGE: a warm-glass proscenium with a defined edge, framing a
> live-or-frozen miniature of the target story's representative component, floating over the
> route's own warm §3 field. The card is not a window onto gray — it is a backlit shadowbox
> onto the component itself, painting in colour.**

This is iOS-27's home-screen truth (LENS-A): a widget SHOWS its app's live content, it never
symbolizes with an icon. The gray box + droplet was the app-icon era; the live glass slide over
the warm field is the widget era. Four reconciled moves, each a UNION onto a shipped seam:

### M1 — ABROGATE THE GRAY: the preview window is a bounded warm §3 FIELD + a DEFINED edge

`.section-preview-card-preview` stops being `color(srgb 0 0 0 / 0.03)`. It becomes a **bounded §3
colorful field** — the same warm-cel stop-script the page-background GOLDEN mints (amber key-mass
+ terracotta mid + sand bounce), driven by the per-card warmed `--field-h`, with a **defined glass
edge** (the §3 "a colorful field behind glass + a defined edge"). The live specimen renders OVER
it, transmitting it. There is no gray anywhere: warm-glass plate (KEEP) + warm-field window + a
real glass specimen.

```css
/* SectionPreviewCard.vue scoped — the preview WINDOW. PLAIN per-mode arms
   (the light-dark() inset-shadow trap — MEMORY). NEVER the black-wash gray. */
.section-preview-card-preview {
  --field-h: var(--card-field-h, 62);     /* the WARMED category hue, NEVER teal (DEPEND §6) */
  position: relative; overflow: clip;
  border-radius: var(--radius-md);
  aspect-ratio: var(--phi, 1.618);         /* φ proportion, NOT a fixed 7rem void (M3) */
  display: grid; place-items: center;
  background:
    radial-gradient(120% 100% at 18% 0%, oklch(0.90 0.075 calc(var(--field-h) + 8) / .55), transparent 60%),
    radial-gradient(120% 120% at 100% 100%, oklch(0.86 0.085 calc(var(--field-h) - 6) / .42), transparent 65%),
    oklch(0.93 0.045 var(--field-h));      /* the warm low-chroma floor (the §3 floor) */
  box-shadow: inset 0 0 0 1px oklch(1 0 0 / .35), inset 0 1px 3px oklch(1 0 0 / .28); /* the §3 lit edge */
}
.dark .section-preview-card-preview {
  background:
    radial-gradient(120% 100% at 18% 0%, oklch(0.46 0.075 calc(var(--field-h) + 8) / .55), transparent 60%),
    radial-gradient(120% 120% at 100% 100%, oklch(0.40 0.085 calc(var(--field-h) - 6) / .42), transparent 65%),
    oklch(0.30 0.040 var(--field-h));      /* warm-ember dark floor, NOT charcoal (BA.W-NO-GRAY) */
  box-shadow: inset 0 0 0 1px oklch(1 0 0 / .12), inset 0 1px 3px oklch(0 0 0 / .25);
}
```

The `color-mix(... var(--foreground) 3%/6% ...)` bg + border are DELETED — clean break, no alias.
(Dark mode arm uses a plain ancestor `.dark .x` selector, never `:global(.dark)` in a scoped block —
the Vue scoped `:global()` drop, MEMORY.)

### M2 — BAKE IN A LIVE SPECIMEN per `previewKind` (the long-dead seam, finally wired)

`SectionLanding.vue` stops wiring `#preview` to a glyph. It wires **`<SpecimenStage :kind :hue>`** —
a tiny demo-private dispatcher (NOT a library export, ~60 LOC, a `<component :is>` switch over
`previewKind` composing SHIPPED primitives), rendered into the existing `inert` + `aria-hidden`
`#preview` region (already there, `SectionPreviewCard.vue:91-94`):

| `previewKind` | category | the SPECIMEN (shipped primitive) | live or still |
|---|---|---|---|
| `field` | substrates, motion | `<Aurora :render-mode="'css'">` — the zero-GL CSS first-frame, its OWN warm palette, bounded | **FROZEN STILL** (§4 one-GL budget) |
| `control` | forms, navigation | a real `<Button>` + `<Slider :model-value="62">` + `<Switch :model-value="true">` cluster, inert | **LIVE** (CSS-only, free) |
| `surface` | display, containers, dock, feedback, compositions | a mini `<Card tier="quiet">` silhouette w/ a hairline header + 2 rule bars | **LIVE** (CSS-only, free) |
| `metric` | data | a real `<MetricBadge>` — a √φ figure + a delta chip | **LIVE** (CSS-only, free) |
| `glyph` | foundations (LAST RESORT — the abstract root) | the `<IconChip>` POP over the warm field — the ONLY card that may show a glyph | LIVE (CSS-only) |

DRY: the dispatcher reads `categoryHero(id).previewKind` (never a second switch). An OPTIONAL
per-story `specimen?` override on the manifest `Story` lets heterogeneous categories vary
(forms: Inputs→input, Slider→slider, Switch→switch) — absent ⇒ the category `previewKind` floor.

### M3 — USEFUL + PROPORTIONED (§L6 golden; not large+empty)

- preview window is `aspect-ratio: var(--phi)` — golden, NOT a fixed `7rem` that leaves a huge
  void on the wide lead card. The window grows with width but stays φ.
- the **lead card** (`idx===0`, `sm:col-span-2`) is the category's MARQUEE — the largest, most-
  detailed specimen (substrates lead = the full frozen aurora field; forms lead = a 3-control
  stack). It earns its width by SHOWING more, not by being emptier.
- the grid `gap` steps by φ (`gap: calc(1rem * var(--phi))`); the card `max-inline-size` is bound
  on the φ-ladder so a 3-col grid at ≥1280 doesn't blow each card to 643px.
- concentric radius (`r_inner = r_outer − pad`, §L6) so the window corners stay parallel to the card's.

### M4 — THE ONE-GL BUDGET: a `field` specimen is a FROZEN FIRST-PAINT (zero GL), not a second context

A landing has up to 11 cards; mounting 11 live `<Aurora>` WebGL contexts would melt (context thrash
+ 11 RAF loops). The elegant truth (LENS-B's boldest *perf* move): **Aurora's first frame is already
CSS, zero-GL** (`Aurora.vue:59-60` `renderMode:"css"` → `paletteToCssGradient`, "never arm WebGL").
So a `field` specimen passes `render-mode="css"` — a single warm painterly gradient still, no canvas,
no RAF, no context. The whole preview is `inert` + `pointer-events:none` (ships at `:93-94`). The ONE
live GL the route is allowed is the hero backdrop (owned by the field/aurora GOLDEN); the previews add
**zero**. `content-visibility:auto` + `contain-intrinsic-size` parks below-fold cards. The live demo
costs nothing because the representative paint was free all along.

---

## 2 — THE MOTION (cartoon flow & punch + liquid weight, §L4) — the technicolor diorama

The bento is the most ALIVE moment after the hero. A UNION onto the shipped `.scroll-cascade`
entrance + the `.section-preview-card` hover-lift, ELEVATED to the cartoon register:

- **The proscenium cast.** The card wears `--shadow-cartoon-md` (the layered-offset warm-INK cel
  cast, not a gray box-shadow) for real lifted WEIGHT. The preview window wears an INSET warm rim so
  the specimen reads recessed on a lit stage behind the proscenium edge (shadowbox depth).
- **The cel-slam cascade (entrance).** Each card SLAMS in on `--spring-bouncy` (the shipped 1.09-peak
  overshoot spring = the "cartoon-punch"): anticipation squash → arc → follow-through stretch-overshoot
  → settle, stagger-offset so card N+1 begins before card N settles (overlapping action). The SPECIMEN
  lags ~1 stagger-step behind the frame (the curtain rising on an already-lit stage); the IconChip POP
  arrives a beat after THAT (frame → stage → protagonist, §L4 cascade).
- **The liquid hover.** The shipped `:hover { translate(-1px,-1px) }` is too tight. Golden: lift on
  `--spring-smooth` with a real squish (`translate(-2px,-3px) scale(1.018)`), the cartoon cast travels
  to `--shadow-cartoon-lg` (the light stays fixed), and the specimen parallax-LAGS the frame `+2px`
  (overlapping action — contents lag the chrome). Liquid weight, never tight/springy.
- **Press squish.** The whole card is a link: `:active { scale(.97) }` on `--spring-smooth`; the
  specimen squishes WITH the card as one body (painted into the diorama, not floating).
- **The frozen field "breathes" on hover (field kind).** A frozen still can't animate, but the bounded
  warm field behind it does a sub-perceptual `--field-h` drift (a 6° warm hue-walk over 1.2s) — alive
  without a second context. PRM → static.

---

## 2.1 — THE BOLDEST MOVE (de-risked, BUILT, live-verified): the LEAD card's goo-merge proscenium

The lead card is the category's HERO diorama. Its IconChip POP and its preview stage are **bridged by
a live static-SVG goo neck** — the SHIPPED `#glass-goo`/`fission-bridge.css` metaball pattern, on a
SIBLING layer (sRGB `color-interpolation-filters`, NEVER `backdrop-filter:url`, NEVER an ancestor filter
over the transmissive glass — design.md §183, the dock-goo-tear lesson). On entrance the chip and the
stage start as two blobs and **fission apart** with a stretching-then-snapping metaball neck (a real
waist, not an ellipsoid tween); on hover they lean in and the neck re-thickens with inertia. The
specimen appears to **pour out of the chip** — the brand glyph liquefying into the live component (the
1940s "ink-that-becomes-the-thing" gag, made literal + cross-engine).

This is scoped to the LEAD card only (the GL/goo budget) — the other cards carry the simpler cel-slam.
PRM → instant topology swap (no neck frames; the chip + stage just present). The spike below PROVES
this paints a real metaball waist in sRGB, both modes, with no `url()` backdrop trap.

---

## 3 — THE CROSS-ENGINE FLOOR (§L7) + a11y/PRM carve (Chrome + Safari PERFECT)

- **Glass + field** — pure `radial-gradient` + `box-shadow` inset rim, oklch, `in oklab` interpolation
  pinned where mixing warm stops (Safari defaults oklab; state it to match Chrome and avoid a gray seam
  on the gamut-map — page-background RASTER lesson). No `backdrop-filter:url()` anywhere (spike confirms
  `urlBackdropAnywhere:false`). The card glass is `backdrop-filter: blur(10px) saturate(1.4)` (already
  shipped, Safari-native).
- **The frozen GL still** is Aurora's CSS first-frame (`render-mode="css"`) — a composited gradient, no
  canvas, identical in both engines; a static `<img>` snapshot is the WebGL-absent fallback.
- **Goo/meatball (lead card)** — static inline-SVG `filter:url(#goo)` on a SIBLING layer,
  `color-interpolation-filters="sRGB"` (WebKit forces sRGB — declared so Chrome's waist matches);
  NO naive ellipsoid (real `feGaussianBlur`→`feColorMatrix` alpha-threshold metaball merge); compositor-
  safe (own `filter`, not `backdrop-filter`). Verified live both modes.
- **Hover/scale-clamp** — `transform` only (compositor, identical both engines, no reflow).
- **PRM (`reduce`)** — cel-slam → one static frame; hover squish/parallax/field-drift → none; the frozen
  still is already static; the goo neck → instant topology swap. Proportion (§L6) has no PRM bracket.
- **reduced-transparency** — `--field-intensity:0` drops the field to the warm solid floor (H∈[25,95],
  STILL warm, never gray); the card glass goes opaque-warm; the defined edge survives as the legibility
  anchor; the specimen stays legible.
- **`@supports not (content-visibility:auto)`** — render all cards eagerly (correctness over perf;
  specimens are cheap). The goo `@supports not (filter:url)` arm → the chip + stage simply abut (no neck).
- **a11y** — the preview is `inert` + `aria-hidden` (KEEP, ships at `:93-94`); the card is ONE
  `RouterLink` whose accessible name is the title + blurb; the specimen never steals focus or tab order
  (0 tab-stops). Prose AA: the title/blurb sit on the card glass, not on the field (field-behind-glass
  discipline); the `.focus-ring` gives keyboard parity.

---

## 4 — THE MECHANISM (files — the UNION, no fork)

**NET-NEW (demo-private, 2 small artefacts):**

| file | change | kind |
|---|---|---|
| `demo/stories/SpecimenStage.vue` | the `previewKind`→specimen dispatcher (~60 LOC) — a `<component :is>`/`v-if` switch composing SHIPPED `<Aurora render-mode="css">` / `<Button>+<Slider>+<Switch>` / `<Card tier="quiet">` / `<MetricBadge>` / `<IconChip>`; scale-clamped; renders INTO the existing `#preview` slot | NEW |
| `SPECIMEN` registry (sibling in `category-hero.ts` or `specimen.ts`) | `Record<categoryId, {kind, props}>` reading `previewKind` (DRY, no 2nd switch) — the category's ONE marquee specimen + its frozen props | NEW |

**AUGMENT (shipped surfaces, no fork):**

| file | change |
|---|---|
| `SectionPreviewCard.vue` | DELETE the gray `--foreground 3%/6%` thumb (`:140-141`); preview window = bounded warm §3 field + defined edge (M1); `aspect-ratio:var(--phi)` (M3); concentric radius; the cartoon proscenium cast + the liquid hover (§2) |
| `SectionLanding.vue` | replace the single `sectionIcon` `#preview` (`:75-83`) with `<SpecimenStage :kind="hero.previewKind" :hue="cardFieldH"/>` per card; pass `--card-field-h` (warmed hue, M2/§6); the lead card gets the marquee specimen + the goo neck (§2.1); delete the `.section-preview-thumb` glyph block (`:96-101`) |
| `manifest.ts` `Story` | OPTIONAL `specimen?` field for a per-story override (M2) | additive |
| grid (`SectionLanding.vue:56`) | `gap: calc(1rem * var(--phi))`; card `max-inline-size` on the φ-ladder (M3) |

**CONSUME / DEPEND (booked sibling GOLDENs, NO edit here — this item must NOT re-mint them):**

- `BD.W-SECTION-HUE-WARM-FENCE` (shell-layout) — the warmed `sectionHue` (re-indexes substrates=3-teal /
  forms=2-indigo / containers=9-slate / navigation=11-ocean off the cool slots + the `warmHeroHue()`
  clamp). This item CONSUMES `categoryHue(id)` verbatim and derives `--card-field-h` via the warm clamp
  — it does NOT re-roll the hue (teal is impossible by construction once the fence lands).
- `BD.W-PAGE-FIELD` / `BD.W-FIELD-SCRIPT` — `@utility paper-field` + `warmFieldHue` (the warm, non-teal
  field; clamp `[25,95]`). Consumed for the bounded-window field + the page floor behind the bento.
- `BD.W-GLASS-KEY-EDGE` — `--glass-key` for the §3 lit-corner (the defined edge keyed off the key-light).
- `BD.W-CONCENTRIC-RADIUS` — the preview rim `r_inner = r_outer − pad`.
- SHIPPED: `<Aurora render-mode="css">` (the zero-GL first-frame, `Aurora.vue:59`), `<Card tier>`,
  `<Button>`/`<Slider>`/`<Switch>`/`<MetricBadge>`/`<IconChip>`, `#glass-goo`/`fission-bridge.css`,
  `--shadow-cartoon-md/lg`, `--spring-bouncy`/`--spring-smooth`, `.scroll-cascade`, the `#preview` seam,
  the `previewKind` field, the manifest lazy-loader.

**EXCISE (clean break, NO LEGACY):** the per-card droplet glyph (`SectionLanding.vue:75-101`), the gray
`--foreground 3%/6%` thumb (`SectionPreviewCard.vue:140-141`).

**DELTA-ASSAY (no dup):** shell-layout's `WAVE-AMENDMENT §F` EXCISED `W-BENTO-SPECIMEN` and re-homed it
HERE — this item OWNS the bento card + the live specimen; shell-layout owns the warm-fence; page-background
owns the `paper-field`/`warmFieldHue`. Grep confirms no `SpecimenStage`/`SPECIMEN`/`previewSpecimen` on disk
— genuinely NEW, not a re-fork. Wave name: **`BD.W-BENTO-SPECIMEN`** (the name shell-layout §F reserved).

---

## 5 — THE ACCEPTANCE BAR + the BORN-RED GATE (RASTER-honest, paired-engine, both modes)

Reference discipline: sample the COMPOSITED card pixel via full-page screenshot → `getImageData`, NEVER
a `getComputedStyle`-string average (the fraud bite). Paired-engine (Chromium + WebKit), both modes.
Surfaces: `/substrates`+`/motion` (field), `/forms`+`/navigation` (control), `/display`+`/containers`
(surface), `/data` (metric), `/foundations` (glyph) — then the assay LOOPS all 11 (every category). Each
assert is **born-RED on HEAD** (gray + teal + glyph + field-less, live-measured §0).

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **B1 no-gray window** | each preview window rasters mean OKLab **C ≥ 0.045 warm**, H∈[25,95]; NOT `srgb 0 0 0/.0x` | bg `srgb 0 0 0/.03`, C≈0 (live) | the warm §3 field (M1) |
| **B2 no-teal** | NO sampled card/field/chip patch lands H∈[180,270]; every `--card-field-h`∈[25,95] | chip `srgb .138 .479 .583` (teal, live) | the warm-fence + warm clamp (§6) |
| **B3 LIVE specimen (not glyph)** | each window rasters the specimen's OWN structure — `field`=polychrome aurora (hue-spread Δ≥25°), `control`=a button silhouette (edge+accent), `surface`=a glass card edge, `metric`=tabular digits; a centered glyph FAILS | 11× the SAME droplet glyph (live) | `SpecimenStage` wired (M2) |
| **B4 useful + proportioned (§L6)** | window : text ≈ φ; window occupies ≥38% of card height with NON-empty content; card height bounded | 643×388 card, 112px empty box (live) | the φ-clamp + filled specimen (M3) |
| **B5 one-GL budget** | the landing mounts ≤1 live WebGL context (count `canvas` w/ a live RAF); `field` specimens are CSS stills (zero canvas) | — | Aurora `render-mode="css"` (M4) |
| **B6 defined edge (§3)** | the window rim rasters a contrast Δ ≥ floor vs the field at its border; the lit corner exceeds the opposite by ΔL keyed off `--glass-key` | flat box, no edge (live) | the inset rim + key-edge |
| **B7 both-mode warm** | dark window C≥0.045 warm, L∈[0.25,0.6] (GLOWS, not charcoal) | — | the warm-ember dark arm (M1) |
| **B8 cross-engine (WebKit-real)** | the WebKit capture shows the warm specimen (sRGB-pinned, no gray seam); the goo waist reads in sRGB; NO `backdrop-filter:url()` anywhere | — | sRGB pin + no-url filter (§3) |
| **B9 a11y arms** | PRM → specimens static, hover frozen, no goo neck frames; reduced-transparency → field warm-solid (C≥0.045, NOT gray), specimens legible; specimen `inert`+`aria-hidden` (0 tab-stops) | — | the carves wire (§3) |
| **B10 every category** | ALL 11 landings pass B1-B3 (no category renders a gray/glyph placeholder card) | only the glyph everywhere (live) | the registry covers 11 (M2) |
| **B11 cartoon punch** | the cel-slam mid-flight has scale≠1 + an overshoot frame; the lead goo neck reads a metaball waist at the split midpoint; hover lifts + the cast travels | static 1px translate, no cast (live) | the §2 motion + §2.1 goo |
| **B12 anti-evasion (≥8 bites)** | FAILS on: re-pasted `--foreground 3%` thumb (B1) · a teal field (B2) · a glyph-only preview (B3) · a 2nd live GL context (B5) · an empty/oversized card (B4) · a stop-string-average reader (the fraud bite) · `backdrop-filter:url()` (B8) · a goo filter on an ANCESTOR of the glass (B8) | — | passes only on the real warm specimen stage |

**Self-test (`--self-test`):** re-paste the gray thumb → B1 RED; pin `--card-field-h:210` → B2 RED; swap
`SpecimenStage` back to the glyph → B3 RED; arm 11 live Auroras → B5 RED; un-clamp card height → B4 RED;
move the goo to an ancestor → B8 RED. Each MUST flag; the fixed tree clean. **No source-green close — the
painted paired-engine RASTER π is binding.**

---

## 6 — WHY THIS IS THE iOS-27 ANSWER (golden, not a placeholder, not a fork)

iOS-27's home screen is a grid of LIVE widgets — each shows its app's real content, not an app icon. The
category landing is glass-ui's home screen: each bento card is a live widget of its component. The golden
synthesis takes LENS-A's "show, never symbolize" widget metaphor + the φ proportion, LENS-B's zero-GL
frozen-CSS-first-frame perf truth (11 "live" demos, ≤1 GL context) + its RASTER-honest paired-engine gate,
and LENS-C's cartoon-technicolor diorama register + the goo-merge lead card — reconciled to ONE coherent
design. It abolishes the gray (the warm field replaces the black-wash), the teal (the hue is warm-clamped
by construction), the placeholder glyph (the seam mounts the real component), and the empty slab (φ
proportion + the marquee lead). It is maximally FAITHFUL, maximally IDIOMATIC (reuses the `#preview` seam +
`previewKind` + the warm field + the glass register + the goo filter + the one-GL budget — zero new engine),
and PERFECT in Chrome AND Safari (de-risked + live-verified by the spike below).

---

## 7 — THE SPIKE (built + live-verified, both modes)

`golden/spike.html` — a throwaway pure-CSS/SVG de-risk of the boldest mechanism (the specimen-stage card
over the warm field + the defined edge + the frozen-aurora/control/surface/metric specimens + the goo-merge
lead card), portable to both engines with no build. Verified live in Chrome:

- **light** (`spike-light.png`): warm cream field behind glass, defined edge, lead Aurora paints a real
  frozen warm aurora, Inputs card paints a real glass control row — zero gray, zero teal, cartoon cast lifts.
- **dark** (`spike-dark.png`): warm-EMBER field (glows amber/terracotta, never charcoal/gray) — BA.W-NO-GRAY
  both arms.
- **pixel readback (dark):** stage bg `oklch(0.3 0.04 58)` (warm, NOT gray/teal); 5 real specimens painted
  (2 field, 1 control, 1 surface, 1 metric — zero glyphs); goo = real `#goo` SVG filter with
  `color-interpolation-filters="sRGB"`; all 5 hues ∈ [36,82] warm, tealCount **0**; `urlBackdropAnywhere`
  **false**. The §5 gate's B1/B2/B3/B5/B7/B8 all read GREEN on the spike — the mechanism is sound; the build
  ports it onto the real `SectionPreviewCard`/`SectionLanding` chassis.
