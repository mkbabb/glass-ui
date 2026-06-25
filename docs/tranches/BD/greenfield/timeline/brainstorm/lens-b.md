# Timeline — Greenfield (Lens B: cross-engine / perf-first)

> The TIMELINE primitive re-interrogated from first principles through the
> Chrome-AND-Safari + performance lens. `GlassTimeline` (dispatcher) + the three
> variants (`ScrubberTimeline` · `SegmentedTimeline` · `ContinuousTimeline`/Rail/
> Markers) + `TimelineSegment` + the `#detail` slot.
> **Bar:** the three variants congruent + warm transmissive glass + the liquid
> scrub, BOTH modes, Safari-perfect. KISS · DRY · no re-fork · no legacy.

---

## 0. The LIVE born-RED read (painted-pixel, `/data/timeline`, Chromium)

A real read over the real page — not getComputedStyle over a hardcoded field, not
synthetic arithmetic. The `/data/timeline` route renders the **scrubber** variant
(`.glass-track` / `.glass-fill` / `.glass-thumb` are the only timeline elements on
the page; the warm dotted rail above them is a separate demo composition).

| sample | painted value | verdict |
|--------|---------------|---------|
| `.glass-track` bg | `color(srgb 0.110 0.098 0.090 / 0.06)` | **GRAY.** RGB max−min = 0.020 → chroma≈0. This is `--surface-tint-6` = `color-mix(--foreground 6%, transparent)` — a near-black INK film, not a warm field. |
| `.glass-track` backdrop | `blur(1px) saturate(1.4)` | `--glass-blur-wash` — a 1px sub-perceptual wash; transmits almost nothing. |
| `.glass-fill` bg | `…/ 0.08` | same ink, +2% alpha → **invisible differentiation** from the track. |
| `.glass-thumb` bg | `…/ 0.25` | same ink, denser. 6×16px. `opacity:0` until hover. |
| `.card` BEHIND the track | `rgb(253, 245, 236)` | a real warm cream (R>G>B). |

**The §3 dual root cause, confirmed live:**
1. **Flat-field / no transmission.** The track is `blur(1px)` over a 6%-ink film. The
   warm we perceive is *entirely the card showing through the gaps in a translucent
   gray film* — the glass is NOT transmitting a warm field; it is a gray scrim laid
   over warmth. Root cause #1 (the field must be TRANSMITTED, `inset:0`, deep enough
   blur to actually pick up the backdrop).
2. **Dormant tint is ink-derived.** Every timeline surface samples `--surface-tint-N`
   = `oklch(from --foreground …)` — i.e. derived from the INK, grayscale by
   construction, in BOTH modes (`dark-arm.css:354` re-derives the identical
   `oklch(from --foreground 0.975 c h)` family for dark). Root cause #2: there is no
   warm-floor decl; the floor is whatever 6% of the ink is.

**The scrub interaction (programmatic drag 20%→70%, rAF-sampled):**
- thumb `transform` = `matrix(1,0,0,1,-6,-8)` before AND during the drag — **pure
  translate, zero scale/squish**.
- position is a direct `style.left = "70%"` binding; the thumb has transitions on
  `opacity/width/height/background` **but NOT on `left`** → the thumb teleports to the
  pointer with **no inertia, no spring lerp, no follow-through, no morph-more-on-move**.
- `opacity:0` throughout a programmatic drag (only `:hover` reveals it) → on touch /
  keyboard the thumb is **invisible while scrubbing**.
- This is a flat HTML range slider in glass clothing. It is the Band-0
  liquid-weight law violated outright. **Born-RED is correct and honest here.**

**The three-variant coherence read (source + live):** the variants share only
`geometry.ts` (pure math) and a 5-line `.timeline-row { flex; align-items:center }`
shell. Beyond that they are **three unrelated visual languages**:
- *scrubber* — a 24px pill, ink-fill, a 6px rect thumb (a media scrubber).
- *segmented* — a 12px pill, N flex cells, 14px bordered dots at cell seams, `success`/
  `accent` color-mix dot states (a progress bar).
- *continuous* — a sibling-split rail + `<ul>` marker overlay + HoverPopover portal +
  `#detail` slot + a stitched cross-fade gradient (a phase bus).
Three different heights, three different dot idioms, three different fill mechanics,
three different state vocabularies. **A mismatched set, not a family.** The cited
`--ease-cartoon-punch` token **does not exist** in `src/styles/` (grep: 0 hits) — the
real motion vocab is `--spring-bouncy/-snappy/-dock`, `--ease-spring-bouncy`,
`--ease-apple`; the design must cite what exists.

---

## 1. The core idea — ONE rail substrate, THREE read-outs, ONE liquid law

The three variants are not three components. They are **one continuous glass rail with
three READ-OUTS of the same `t∈[0,1]` line**:

- **scrubber** = the rail with a single *live head* you drag (a continuous `t`).
- **segmented** = the rail quantised into N *cells* with *boundary heads* (discrete `t`).
- **continuous** = the rail painted with N *phase windows* + *markers* + a *detail
  read* (a labelled `t`).

Unify them on **one shared substrate** — `TimelineRail` — that owns: (a) the warm
transmissive glass material, (b) the `t`-geometry (already `geometry.ts`), (c) the
liquid-head motion, (d) the a11y skeleton. Each variant is then a thin read-out layer
declaring *what rides the rail* (a head, boundary heads, or phase-windows+markers).
This is a UNION (one substrate, three slots), never a parallel fork — and it retires
the three divergent track recipes in the same amendment (no dual paths).

```
TimelineRail (substrate)
  ├── warm glass material .glass-floating .glass-deep[opt]  ← the §3 fix, ONE place
  ├── geometry (t, region windows, boundaries)              ← existing geometry.ts
  ├── <slot name="track">   fill / phase-windows            ← variant paints the fill
  ├── <slot name="heads">   scrub head / boundary heads / markers ← the liquid heads
  └── a11y spine (role from variant, valuetext, PRM)
```

### The boldest move
**Kill the three divergent ink-tint tracks and rebuild the whole primitive on the
SHARED warm-glass register + ONE liquid `t`-head driven by `useDragMorph` — the same
grab→follow→squish→settle engine the tabs/dock already ship.** Concretely: the rail
becomes `.glass-floating` (transmissive warm `--glass-bg-floating` = `color-mix(--card
…)`, NOT `--surface-tint-N`) over the page's colorful field, with `.glass-deep`
opt-in for the deep-transmit case; and the scrub head stops being a `style.left`
teleport and becomes a **liquid blob head** that squishes in its travel direction
(`useDragMorph` + `useLiquidFlex` tanh, capped low) and settles with a ζ<1 give —
*identical physics to the tab indicator and the dock fission*, so there is ONE liquid
law across the library, zero new engine. The segmented/continuous "dots" become the
SAME head primitive at rest. **One material, one head, one motion law — the three
variants become congruent because they are literally the same substrate.**

---

## 2. Visual spec — warm transmissive glass, both modes

### 2.1 The rail material (the §3 fix — ONE decl, all three variants)
Replace `background: var(--surface-tint-6)` + `backdrop-filter: var(--glass-blur-wash)`
with the shared warm-glass register the rest of the library already depends-on:

```css
.timeline-rail {
  /* the warm transmissive FLOOR — color-mix off --card, NOT --foreground ink.
     This is the BA.W-NO-GRAY warm floor: R>G>B by construction, both modes,
     because --card is warm in both arms. */
  background: var(--glass-bg-resting);            /* ~65% warm card plate */
  backdrop-filter: var(--glass-blur-floating);    /* real transmission, not 1px */
  border: 1px solid var(--glass-edge);            /* §3 root-cause: a DEFINED edge */
  border-radius: var(--radius-pill);
}
/* deep-transmit opt-in (T7 sibling) — a media-grade rail over a vibrant field */
.timeline-rail.is-deep { /* compose .glass-deep — re-points blur token to deep */ }
```

- **inset:0 transmission.** The fill / phase-window is `inset:0` ABOVE the rail so the
  warm field is transmitted through the whole bar, never a gray film over warmth (root
  cause #1). The fill is a **chroma lift of the same warm floor** (`--glass-bg-floating`
  ~80% + the segment hue), so fill↔track differ by *material density + hue*, not 2%
  alpha. Differentiation becomes legible.
- **Both modes by construction.** Because every layer is `color-mix(--card …)` /
  `--glass-bg-*` (warm in both arms) and never `--foreground`-derived, the dark arm is
  warm-transmissive too — no per-mode arm needed beyond the tokens' own light-dark.
  (Heed the inset-shadow trap: any rail inner-shadow stays a plain per-mode decl, never
  inside `light-dark()`.)
- **Defined edge.** `--glass-edge` 1px hairline + the existing concentric-radius rule
  (rail radius ⊃ head radius ⊃ inner) so the glass reads as a *lens with a rim*, the
  §3 second half. Aristotelian: rail-height : head-diameter : inner-radius on the φ
  ladder (e.g. 16 : 26 : φ⁻¹·…).

### 2.2 The liquid head (scrubber + segmented boundary + continuous marker = ONE glyph)
A single `TimelineHead` glyph, three rest-states of the same thing:
- a **warm glass puck** (`--glass-bg-floating` tinted by `--glass-accent` = the segment
  hue), a defined rim, a layered-offset cartoon shadow (the §L4 technicolor register —
  bold offset drop, not a flat 1px).
- **squash & stretch on travel** — driven by `useLiquidFlex` `"tanh"` (the SHARED
  squish law, cap ≤1.08 — "morph MORE on move, never springy"): a fast scrub swells the
  head along travel + thins across; a slow drag barely deforms. Volume-preserving.
- **scale-pop on commit** — ~1.15× overshoot then settle (the IconChip reveal clock,
  reused) when a segment activates / a marker is selected.
- size on the φ ladder; `:hover`/`:active`/`:focus-visible` lift via the existing
  `--glass-bg-resting → -floating` tier swap (control-surface register), NOT a bespoke
  width/height transition.

### 2.3 Per-variant read-out (thin layers over the shared substrate)
- **scrubber** — one head + a fill window `[0,t]`. Marquee `caret` keeps the value via
  the existing `<ScrollingText>`/popover register.
- **segmented** — N cells; the *boundary heads* are the SAME head glyph at cell seams;
  the fill is the warm-floor chroma-lift per cell; state (`pending/active/completed`)
  is a **hue + density** of the SAME material (drop the `success`/`accent` color-mix
  one-offs → unify on `--glass-accent` per segment, presets-in-consumers).
- **continuous** — N phase-windows into the ONE stitched gradient (keep
  `stitchedRailGradient` — it's good), markers = the SAME head glyph, `#detail` slot +
  HoverPopover unchanged in contract. The sibling-split (rail `role=progressbar` vs
  marker `<ul>`) is RIGHT (axe `nested-interactive`) — keep it; it generalises to all
  three as "substrate + heads overlay".

---

## 3. Motion spec — the liquid scrub (the headline interaction fix)

**Mechanism: `useDragMorph` (already shipped: `src/composables/motion/useDragMorph.ts`).**
It is *exactly* this gesture — "grab → follow → squish → settle with a small ζ<1
overshoot", a `SpringProgress` core on the `snappy` preset (response 0.35 / ζ 0.65, the
CONTROL row) + `useLiquidFlex` tanh velocity-squish capped low. The scrubber currently
hand-rolls a `style.left` teleport; replace that with `useDragMorph` driving:
- `--timeline-t` (the spring-lerped position — inertia + follow-through, NOT a teleport);
  the fill width and head left both read `--timeline-t`, so the head LAGS then settles
  past, the liquid-weight law.
- `--timeline-squish` (the tanh stretch scalar) on the head's `scaleX/scaleY`
  (volume-preserving) — morph-more-on-move.
- release → the spring settles with the ζ<1 give (a hair of overshoot, then 1.0), the
  cartoon follow-through.

This is **zero new engine** — it is the tab-indicator / dock-fission physics applied to
the scrubber. ONE liquid law, library-wide. Keyboard arrow-step animates the SAME
spring (a stepped target the spring eases to), so keyboard scrubbing is liquid too (and
the head is VISIBLE during it — fix the `opacity:0`-while-dragging bug: reveal the head
on `:active`/`[data-scrubbing]`/`:focus-within`, not `:hover` alone).

Segmented/continuous boundary-head selection rides the SAME spring to the boundary `t`
(a goo-glide between markers), so "click a later phase" is a liquid travel, not a jump.

---

## 4. Cross-engine (Chrome + Safari) + performance

- **Compositor-only.** The head moves via `transform: translateX()` off `--timeline-t`
  (not `left` — Safari composites transform, not left). Squish via `transform: scale()`.
  Fill width is the one non-compositor channel; gate it to `will-change:width` ONLY
  during `[data-scrubbing]`, drop it at rest (no steady-state layout thrash).
- **No `backdrop-filter:url()`** anywhere — the rail uses plain `blur()/saturate()`
  tokens (`--glass-blur-floating`), Safari-safe. The deep variant re-points to
  `--glass-blur-deep` (still a plain blur), never a filter graph.
- **No metaball goo on the head** (KISS — the simplest mechanism that hits the bar): a
  single squishing puck is a CSS `transform`, perfect on WebKit, no SVG goo filter
  needed. The metaball register is reserved for the dock fission, not the timeline —
  favour the simplest mechanism. (If a future "two boundary heads merge" read is
  wanted, it composes the EXISTING `DockGooFilter` static-SVG-sRGB primitive — no new
  filter — but it is NOT in this scope.)
- **`linear()` springs** for the position so the easing is identical Chrome/Safari (the
  `SpringProgress` already emits a sampled `linear()`); `@supports` floor to
  `--ease-apple` where `linear()` is unavailable.
- **PRM carve.** `prefers-reduced-motion:reduce` → `useDragMorph` snaps instant
  (squish off, the composable already honors it), the fill transition → `0.01ms`,
  the head settles with no overshoot. The progress READ stays correct (no animation,
  full visibility).
- **Offscreen.** The rail has no rAF loop at rest (it is CSS + a spring that runs only
  during a drag/commit) — nothing to park; the spring auto-stops at settle. No GPU
  context. This is the cheapest possible "liquid" — a transform spring, not a viz.

---

## 5. a11y contract (the design.md §Timeline A11y union)

- **scrubber** — `role=slider`, `aria-valuenow/min/max`, `aria-valuetext` = the human
  label (e.g. "Download · 145 Mbps"), arrow-step + shift-step (keep), the head VISIBLE
  on `:focus-visible` + `[data-scrubbing]` (fix the invisible-during-drag bug),
  `--focus-ring-shadow` on focus.
- **segmented / continuous** — the sibling-split stays: rail `role=progressbar`
  (non-interactive aggregate), markers `<ul role=list>` of `<button>`s with the 44×44
  hit-halo (`::before inset` — keep, it's WCAG 2.5.5-correct) + `aria-label` =
  `"{label}: {state}"`. `#detail` slot unchanged.
- one shared a11y spine on `TimelineRail` (the `valuetext` formatter + PRM gate); the
  variant declares its `role`. No regression to the shipped axe-clean state.

---

## 6. DEFT integration — the DELTA-ASSAY (vs the shipped + the 116-wave set)

**KEEP (fit):** `geometry.ts` (all of it — `stitchedRailGradient`, `createContinuous
Geometry`, `fillFor`, region windows — pure, good); the `TimelineSegment` type; the
continuous sibling-split structure (axe-clean); the `#detail` slot contract +
HoverPopover portal CSS contract; the segmented 44×44 hit-halo; the `GlassTimeline`
dispatcher public surface (UNCHANGED — consumers untouched).

**REFINE (weak):** the material — swap every `--surface-tint-N` for the shared
`--glass-bg-resting/-floating` + `--glass-blur-floating` + `--glass-edge` warm-glass
register (the §3 fix, depend-on the `glass-material` golden warm-floor + the
`page-background` colorful-field DAG deps); unify the three dot/state idioms onto the
ONE `TimelineHead` glyph + `--glass-accent` per segment (presets-in-consumers, drop the
`success`/`accent` color-mix one-offs); concentric-radius + φ-ladder the sizes.

**RE-INVENT (broken):** the scrub interaction — replace the `style.left` teleport with
`useDragMorph` (squish + spring + follow-through + visible-during-drag); extract the
shared `TimelineRail` substrate so the three variants stop being a mismatched set.

**RETIRE in the same amendment (no dual paths):** the per-variant divergent track CSS
(three `background:--surface-tint-6` recipes → one `.timeline-rail`); the hand-rolled
scrubber pointer-math drag (→ `useDragMorph`).

**Reconcile vs the 116-wave set (no dup):** this is NOT a new viz and does NOT touch
the dock waves. It RIDES three existing waves rather than spawning new ones:
- the **warm-glass / §3** fix = the `glass-material` + `page-background` greenfield
  goldens (BUILD-DAG depend-on, the `.glass-floating` warm-floor + colorful-field) —
  the timeline is a CONSUMER of that register, not a new fix.
- the **liquid scrub** = the SHARED `useDragMorph`/`useLiquidFlex` law (the
  `motion-spring-register` Band-0 golden + the `W-LIQUID-ENTRANCE-GENERAL` family) —
  reuse, no new engine.
- the **head scale-pop** = the IconChip reveal clock (the `BD.W-DOCK-TAB-INDICATOR`
  scale-pop precedent) — reuse.

→ **The wave amendment is ONE wave: `BD.W-TIMELINE-RAIL-UNIFY`** — "extract the shared
warm-glass `TimelineRail` substrate + the ONE liquid `TimelineHead` (useDragMorph) +
retire the three divergent ink-tracks; the three variants become read-outs of one
substrate." It is a CONSUMER of the glass-material/page-background/motion goldens (DAG
deps), not a duplicate of them. No new viz, no dock overlap, no dup in the 116-wave set.

**Convergence estimate:** material/§3 ~30% (the warm register exists but the timeline
samples the wrong tokens — a token-swap consumer fix); scrub liquid ~25% (the engine
ships, the scrubber hand-rolls a teleport — a re-wire); coherence ~20% (geometry shared,
visual language forked — a substrate extraction). **Overall ~25%** — assembly/re-wire
bound, NOT primitive-bound: every engine the fix needs (warm glass, useDragMorph,
useLiquidFlex, IconChip pop) already ships; the timeline simply doesn't compose them.
