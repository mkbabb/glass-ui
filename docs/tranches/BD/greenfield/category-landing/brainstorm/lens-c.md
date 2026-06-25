# CATEGORY-LANDING — LENS C (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> The greenfield redesign of the `/:category` landing — `SectionLanding.vue` (the D1 section hero
> + bento grid) + `SectionPreviewCard.vue` (the bento cards) — across EVERY category route
> (`/substrates`, `/forms`, `/display`, `/containers`, …). Designed from first principles through
> the **1940s-technicolor FLOW & PUNCH** lens: bold layered cartoon shadowing, exaggerated
> squash/stretch/morph, anticipation + follow-through + overlapping action + arcs, real weight &
> inertia — the boldest, most-alive variant that stays idiomatic + cross-engine.
>
> **DEFT UNION, no re-fork.** This consumes the shipped `SectionLanding`/`SectionPreviewCard` +
> the `#preview` seam (`SectionPreviewCard.vue:91`) + the page-background `.paper-field` + the
> story-page-standard chassis + the shared `<Card tier>` glass register + the shell-layout
> warm-hue re-assignment. It re-invents only what is BROKEN (the gray thumb, the glyph-only
> preview, the teal hue) and refines what is weak (the flat card, the dead proportion).

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173`, both routes, Chrome)

Navigated `/substrates` + `/forms`, screenshot + `getComputedStyle` + `getBoundingClientRect`.
Unanimous with the user directive and the shell-layout DELTA-ASSAY:

| invariant | live measurement | verdict |
|---|---|---|
| **the preview is a LIVE demo** | `0` `canvas` in any card; ALL 12 cards render `.section-preview-thumb` = the SAME category glyph (Droplet on every substrates card, FormInput on every forms card) — a glyph, not a specimen | **RED** — no card paints its component; the `#preview` seam exists but every landing wires it to a glyph |
| **the preview area is NOT gray** | `.section-preview-card-preview` bg = `color(srgb 0 0 0 / 0.03)` + border `srgb 0 0 0 / 0.06` = **NEAR-ZERO-CHROMA BLACK-ON-WHITE GRAY** (`SectionPreviewCard.vue:140`) | **RED** — the headline gray, born honest |
| **the card is warm glass** | `.section-preview-card` bg `oklab(0.763 0.005 0.011 / 0.72)` (C≈0.012, barely-warm) over a flat plate; the `/forms` cards read as opaque GRAY slabs (screenshot) | **RED / AMBER** — the card carries a whisper of warmth but reads gray because the preview hole + the flat fill dominate |
| **the section hue is warm (no teal)** | `--section-color-3` = `light-dark(oklch(0.542 0.089 222.8), oklch(0.767 0.091 219.9))` = **TEAL 222.8°** — substrates tints its chips + (was) its field teal | **RED** — teal, the §7 warm-arc violation (the shell-layout WAVE-AMENDMENT re-points this; this item CONSUMES the warmed hue) |
| **useful + proportioned** | the lead card is **626 × 221px** — a huge plate whose middle is an empty 112px gray hole; the glyph floats in dead center | **RED** — large + empty, the user's "USELESS large cards" verbatim |

**The gestalt:** the page floor warmed up (cream `/forms` field — the shell-layout/page-background
work landed) but the BENTO never inherited it. The cards are gray islands floating on a warm sea,
each with a dead gray window showing a generic glyph. **The card is the last gray surface on the
page, and it is the one the user is staring at.**

**Source-verified deps (grep — all present):**
- `SectionPreviewCard.vue:91` `v-if="$slots.preview"` — the seam EXISTS (`#preview` slot → bounded
  `inert aria-hidden` mini-render). KEEP — wire it for real.
- `category-hero.ts:48` `PreviewKind = "glyph" | "field" | "control" | "surface" | "metric"` — the
  per-category register EXISTS. KEEP — drive the specimen off it.
- `.paper-field` / `--field-h ∈ [25,95]` (page-background GOLDEN) — the warm field primitive, the
  §3 "colorful field behind glass." The preview hole consumes THIS as its floor, not a gray fill.
- `<Card tier>` + `.glass-resting`/`.glass-quiet`/`.glass-wash` (`glass/ladder.css`) — the shipped
  six-layer warm-glass register. The card IS already `.glass-resting`; the fix is the PREVIEW, not
  a new card.
- `<Aurora>`, `<GooBlob>`, `<Button>`, `<Slider>`, `<Switch>`, `<Card>`, `<MetricBadge>` /
  `<MetricCell>` (`src/components/`) — the live specimens, one per `previewKind`.
- `--shadow-cartoon-{sm,md,lg}` + `.cartoon-surface` + `--ease-cartoon-punch` + `--motion-weight`
  (design.md §L4 / §Shadows) — the cartoon register. The card ENTERS it.
- `#glass-goo` / `fission-bridge.css` static SVG goo filter (sRGB, sibling-layer) — the cross-engine
  meatball merge for the lead-card seam.

---

## 1 — THE GOLDEN IDEA: **THE TECHNICOLOR DIORAMA — every bento card is a tiny lit STAGE, not a window**

The status quo treats the card as a *link with a thumbnail hole punched in it*. The hole is gray
because it is a HOLE — a clipped void with a placeholder glyph. The greenfield inverts the metaphor:

> **A bento card is a tiny 1940s-technicolor DIORAMA: a warm-glass proscenium with a LIVE specimen
> on a lit stage that floats over the route's own warm field. The card is not a window onto gray —
> it is a backlit shadowbox onto the component itself, painting in colour.**

Four reconciled moves, each a UNION with a shipped seam, each carrying the cartoon lens:

### (A) ABROGATE THE GRAY — the preview stage rides the WARM FIELD, not a black tint

The preview area stops being `color-mix(var(--foreground) 3%, transparent)` (gray) and becomes a
**bounded `.paper-field` proscenium** — the SAME `--field-h`-driven warm wash that is the page's §3
floor, scoped to the card via a CSS var override. The card declares one warm number
(`--field-h: <categoryWarmHue>` from the shell-warmed `categoryHue(id)` → the [25,95] warm clamp),
and the stage floor is the analogous warm triad behind the glass. The specimen sits ON this lit
floor; the card's `.glass-resting` chrome transmits it. **No gray fill anywhere — the preview floor
is the colorful field, the card is the defined-edge glass over it (design.md §3 verbatim).** Dark
mode: the field's dark arm warms (the BA.W-NO-GRAY warm-chroma floor, both arms in lockstep) — the
stage glows ember, never charcoal.

### (B) BAKE IN A LIVE SPECIMEN per `previewKind` — the diorama's protagonist

`SectionLanding.vue` stops wiring `#preview` to a glyph. It wires a `<SectionPreviewSpecimen
:kind :hue :live>` — a tiny demo-private dispatcher (NOT a library export) that renders the real
component per `previewKind`, bounded + `inert` + `pointer-events:none`:

| `previewKind` | live specimen (real glass-ui primitive) | GL? | the diorama |
|---|---|---|---|
| `field` | `<Aurora>` / `<GooBlob>` — the category viz | **GL** → FROZEN still (see ONE-GL budget) | a painterly field swatch, the warm aurora frozen mid-swirl |
| `control` | a real `<Button>` row + a `<Slider>` at ~62% + a `<Switch>` on | no | a lit control bench — the specimen tilted on its arc |
| `surface` | a real nested `<Card tier="quiet">` mini-silhouette w/ a hairline header + 2 rule lines | no | a glass card-within-the-card, the matryoshka diorama |
| `metric` | a real `<MetricBadge>` / `<MetricCell>` w/ a φ-laddered figure + delta arrow | no | a backlit gauge |
| `glyph` | the `<IconChip>` POP **only as last resort** (`foundations` abstract root) | no | the floor case — still warm-field, never gray |

The dispatcher reads the per-category `previewKind` AND a per-card specimen override from
`category-hero.ts` (Part C extends the descriptor with a `specimen?: PreviewSpec` per story when the
category's stories are heterogeneous — e.g. forms' Inputs→input, Slider→slider, Switch→switch). KISS:
the dispatcher is a `<component :is>` switch + a tiny per-kind layout, ≤80 LOC, composing EXISTING
primitives — no re-fork, no new component library.

### (C) THE ONE-GL BUDGET — the live-GL specimen is a FROZEN STILL (CLAUDE.md §BA.W-STAGE)

A landing has up to 12 cards. Mounting 12 live `<Aurora>` canvases is forbidden (the one-GL-per-route
budget). So a `field`/GL specimen renders as a **single-paint FROZEN still**: `<Aurora :frames="1"
:paused>` (one paint then park — the substrate's `matchMedia` freeze path already exists,
`Aurora.vue` deferred-static comment) OR, the cheaper + bolder path, a **`.paper-field` swatch with
the category's warm triad + a single static goo-blob silhouette** (CSS/SVG, no GL at all). The still
is `inert pointer-events:none`, scale-clamped, PRM-static. The ONE live GL context the route is
allowed is the page hero's own field (already mounted) — the bento previews never add a second.

### (D) THE CARD IS A CARTOON DIORAMA — proscenium shadow, squash-entrance, lagging cast, hover-pop

The card ENTERS the cartoon register (design.md §L4 / §Shadows), elevating the current weak
1px-translate hover toward universal exaggeration:

- **The proscenium shadow.** The card wears `.cartoon-surface` / `--shadow-cartoon-md`: a bold
  layered-offset cel shadow (the warm-ink cast, not gray box-shadow), giving the card real lifted
  WEIGHT. The inner preview stage wears an INSET version (`box-shadow: inset` warm) so the specimen
  reads as recessed on a lit stage behind the proscenium edge — the shadowbox depth.
- **Entrance: the cel-slam with a LAGGING specimen (overlapping action).** On `.scroll-cascade`
  reveal, the card squash-stretches in on `--ease-cartoon-punch` (anticipation dip → 22% overshoot
  → settle), and the SPECIMEN inside lags by ~1 stagger-step (overlapping action — the diorama's
  contents arrive a beat after the frame, like a curtain rising on an already-lit stage). The
  IconChip POP arrives a beat after THAT (the §L4 cascade: frame → stage → protagonist).
- **Hover: anticipation + pop + the moving cast.** On hover the card anticipates (a ~3% pre-dip),
  then pops to `translate(-2px,-3px) scale(1.012)` on `--ease-cartoon-punch`; the cartoon cast
  travels OPPOSITE the motion (`::after` transform, never animated box-shadow — §L7) so the light
  source stays fixed; the specimen inside parallax-lifts a hair more than the frame (depth). The
  lead card's goo seam (E) jiggles on hover with real inertia.
- **Press (the whole card is a link): squish.** `--scale-press` 0.96 on `--spring-snappy`; the cast
  deepens (object lifts off its shadow) then snaps back. The specimen squishes WITH the card as one
  body (it is painted into the diorama, not floating).
- **Liquid weight universal.** All of the above carry inertia + bounce + morph-more-on-faster-move
  (`useLiquidFlex` velocity-coupled squish where the card travels). NEVER tight/springy.

### (E) THE BOLDEST MOVE → see §2.

---

## 2 — THE SINGLE BOLDEST MOVE: **THE LEAD CARD IS A LIVE GOO-MERGE PROSCENIUM — the IconChip POP melts into the specimen stage as a metaball, and the bento itself is one technicolor goo-field that the cards fission out of**

The lead card (`idx===0`, the wider span) is the category's HERO diorama. Its IconChip POP and its
preview stage are **bridged by a live static-SVG goo neck** (`#glass-goo` / `fission-bridge.css`,
the real metaball — sibling layer, sRGB, never an ancestor filter over the glass). On entrance the
chip and the stage start as two separate blobs and **fission apart** with a stretching-then-snapping
neck (real metaball waist, not an ellipsoid tween); on hover they lean toward each other and the
neck re-thickens with inertia. The specimen on the stage (a frozen warm `<Aurora>`/goo swatch for
`substrates`, a control bench for `forms`) appears to **pour out of the chip** — the brand glyph
liquefying into the live component. This is the 1940s "ink-that-becomes-the-thing" gag, made literal
and cross-engine.

And one register up: the **whole bento grid shares ONE warm goo-field backdrop** (a single
`.paper-field` + a static `#glass-goo` blob layer behind all cards, sibling to them — NEVER an
ancestor filter, so every card's `.glass-resting` still transmits). On `.scroll-cascade` the cards
appear to **bud off this shared field like droplets pinching from a meniscus** (the metaball
fission, staggered on `--ease-cartoon-punch`), so the landing reads as one living warm substrate
that crystallizes into a proportioned bento — the category's identity *condensing into its parts*.
The §L6 golden proportion governs everything: card aspect √φ, the φ² lead span, the preview stage
at 1/φ of the card height, the stagger at 1/φ·base.

**Why it is the boldest yet survives the fences:** it is the maximal FLOW & PUNCH (metaball fission
+ ink-becomes-component + a living field that crystallizes), but every mechanism is a SHIPPED,
cross-engine-proven primitive used idiomatically: `#glass-goo` static filter on a SIBLING layer
(design.md §183 — never an ancestor of the transmissive glass), `.paper-field` warm floor, the
ONE-GL budget honored (the goo is CSS/SVG, the field is frozen, zero second GL context), PRM →
instant topology swap (no neck frames, cards just present), `@supports not (backdrop-filter)` →
solid warm arm. No re-fork: it is `SectionLanding` + `SectionPreviewCard` + the goo layer the dock
already ships, composed.

---

## 3 — MECHANISM (tokens · recipes · composition · a11y · cross-engine)

**The card (`SectionPreviewCard.vue`) — REFINE, no re-fork.**
- Keep `.section-preview-card .glass-resting .paper-grain-overlay .group .focus-ring` + the
  RouterLink shell. ADD `.cartoon-surface` (or `surface="cartoon"` semantics) for the proscenium
  cast. KEEP the `#preview` seam verbatim.
- The preview stage `.section-preview-card-preview`: REPLACE the gray fill →
  `background: var(--paper-field)` scoped (a bounded `.paper-field` instance OR the field CSS vars
  inherited from the card's `--field-h`); ADD `box-shadow: inset 0 1px 0 0 <warm-rim>, inset 0 0 0
  1px var(--glass-border-quiet)` (the recessed lit-stage edge, warm not gray); KEEP `overflow:clip`
  + `inert` + `pointer-events:none`. Height → 1/φ of the card (golden proportion), not a flat 7rem.
- Transitions: `--ease-cartoon-punch` on transform; the `::after` moving cast; `--scale-press` on
  active. PRM → static (the existing `@media (prefers-reduced-motion)` block, extended to zero the
  punch + cast travel).

**The dispatcher (`SectionPreviewSpecimen.vue`) — NEW demo-private chassis primitive (≤80 LOC).**
- `props: { kind: PreviewKind, hue: number, spec?: PreviewSpec }`. A `<component :is>` per-kind
  switch composing EXISTING primitives: `field`→`<Aurora :paused :frames="1">` or a CSS goo swatch;
  `control`→`<Button>`+`<Slider model=62>`+`<Switch checked>`; `surface`→nested `<Card tier="quiet">`;
  `metric`→`<MetricBadge>`. All bounded + scale-clamped to the stage. NOT a library export.
- The ONE-GL budget: `field` defaults to the **CSS goo-swatch** (no GL); the frozen `<Aurora>` is an
  opt-in per-category override only where the category IS the GL hero (substrates) AND only the lead
  card (so ≤1 frozen-GL paint per route, and it's a single-frame park, not a running context).

**The data (`category-hero.ts`) — EXTEND, no parallel table.**
- The `sectionHue` consumes the shell-layout WARMED ramp index (the WAVE-AMENDMENT re-points
  substrates/forms/containers/navigation off teal/indigo/slate/ocean to warm slots; this item reads
  `categoryHue(id)` verbatim — NO teal can reach it). Add `--field-h` derivation = the warm clamp
  of that hue.
- Add an OPTIONAL per-story `specimen?: PreviewSpec` for heterogeneous categories (forms: input /
  slider / switch); when absent, fall back to the category `previewKind`. KISS.

**Cross-engine (Chrome + Safari):** goo = static inline-SVG `filter:url(#glass-goo)` on a SIBLING
layer with `color-interpolation-filters:sRGB` (WebKit forces sRGB — declare it so Chrome matches the
waist); NEVER `backdrop-filter:url`; NEVER a goo filter on an ancestor of the glass (design.md §183 —
the dock-hub goo-tear lesson). Frozen Aurora = one paint, parked (no per-frame GL). All steady-state
motion = `transform`/`opacity`/own-`filter` only.

**a11y / PRM carve:**
- The preview is `inert aria-hidden="true"` (it is decoration; the card title + subpath are the
  accessible name) — KEEP.
- **PRM** → no entrance punch, no cel-slam, no goo neck frames (instant topology swap — cards just
  present), static cast, frozen field (already frozen). The metaball fission collapses to a plain
  fade-in. One assignment: `--motion-weight: 0` zeroes squash/overshoot/anticipation/cast-travel/
  stagger (§L4 cascade).
- **`prefers-reduced-transparency`** → the card's glass solidifies to the warm opaque `--card` arm
  (`@supports`/PRT floor); the preview stage solidifies to the warm field's flat fallback — STILL
  warm, never gray (BA.W-NO-GRAY survives PRT).
- **`prefers-contrast:more`** → the cartoon cast opacity floors UP (inked edge = legibility asset).
- **Focus** → the `.focus-ring` on the RouterLink (keyboard parity); the whole card is the target.

---

## 4 — DELTA-ASSAY (reconcile vs the 116-wave set + shell-layout + story-page-standard; NO dup)

| concern | owner | this item |
|---|---|---|
| warm-hue data + the teal/indigo/slate/ocean re-point + `warmHeroHue()` fence | **shell-layout WAVE-AMENDMENT** | CONSUMES `categoryHue(id)` verbatim — does NOT re-roll hue math; derives `--field-h` from it |
| the `.paper-field` §3 warm floor + `--field-h` + frozen-`<Aurora>` renderer | **page-background GOLDEN** | CONSUMES `.paper-field` as the preview-stage floor + the bento goo-field backdrop |
| the `<DemoFrame variant>` chassis + the field-is-the-floor box inversion | **story-page-standard GOLDEN** | the card-over-shared-field model is the SAME inversion at bento scale — UNION, the bento is a `DemoFrame`-grade glass-cel grid, not a new page system |
| `--ease-cartoon-punch` + `--motion-weight` + `.cartoon-surface` + the moving cast | **cartoon-shadow / motion-spring GOLDENs** | CONSUMES the tokens; the card ENTERS the register |
| `#glass-goo` / `fission-bridge.css` static metaball | **goo-morph / dock-fission** | CONSUMES the sibling-layer goo for the lead-card neck + the bento meniscus |
| the `#preview` seam + the bento shell + `previewKind` | **THIS ITEM** (was deferred here by shell-layout DELTA-ASSAY) | WIRE the seam to a live specimen; ABROGATE the gray thumb; the cartoon diorama |

**No dup, no fork.** The wave-amendment for THIS item is exactly: (1) `SectionPreviewCard.vue` — gray
thumb → warm-field stage + cartoon proscenium; (2) `SectionPreviewSpecimen.vue` — NEW dispatcher
(live specimen per kind, ONE-GL-budget frozen); (3) `SectionLanding.vue` — wire the dispatcher, the
lead goo-neck, the shared bento goo-field; (4) `category-hero.ts` — `--field-h` derivation + optional
per-story `specimen`. Four files, all extensions of shipped seams.

---

## 5 — THE CRITICAL GATE (what "done" looks like — painted pixels, both modes)

1. **A real screenshot read** of a landing card over the real page: the preview stage paints the
   category's WARM field (sampled chroma ≥ §3 floor 0.045), the specimen is the REAL component
   (a `canvas`/`<Button>`/`<Card>`/`<MetricBadge>` in the DOM, not an `<svg>` glyph), zero gray
   (no `srgb 0 0 0 / 0.0x` fill anywhere).
2. **No teal:** `--section-color-N` consumed by any card hue resolves in the warm arc (h ∉
   (180,270)); `--field-h ∈ [25,95]`.
3. **The live specimen actually paints the component** (not a placeholder) — verified per
   `previewKind` on `/substrates` (field), `/forms` (control), `/display` + `/containers` (surface),
   `/data` (metric).
4. **Both modes:** light = warm cream stage, dark = warm ember stage (BA.W-NO-GRAY both arms); never
   charcoal/gray in dark.
5. **ONE-GL budget:** ≤1 frozen-GL paint per landing (count running GL contexts = the hero's, the
   bento adds zero); the rest CSS/SVG.
6. **Cartoon punch lands:** entrance cel-slam + lagging specimen + goo fission visible (and PRM →
   instant present, no neck frames).
7. **Gestalt:** every category landing card reads warm glass with a LIVE baked-in demo — useful,
   proportioned (√φ card / φ² lead / 1/φ stage), NEVER gray, NEVER teal, both modes.
