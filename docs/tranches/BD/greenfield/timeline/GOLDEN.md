# TIMELINE — the GOLDEN reference (synthesized; canonical)

> `GlassTimeline` (dispatcher) + the three variants (`ScrubberTimeline` ·
> `SegmentedTimeline` · `ContinuousTimeline`/Rail/Markers) + `TimelineSegment` +
> the `#detail` slot — resolved to ONE coherent design from lens-a (pure iOS-27
> fidelity), lens-b (cross-engine/perf-first), lens-c (audacious cartoon punch).
> **Tranche-dev only.** A UNION with the shipped timeline + the shared glass register
> + the shipped motion engines. KISS · DRY · no parallel fork · NO legacy.

---

## 0. THE ONE TRUTH — measured live, reconciled across the three lenses

All three lenses interrogated the real `:5173/data/timeline*` routes and converged on
the **identical born-RED**, so the diagnosis is not contested:

| measured surface | live value | verdict (unanimous) |
|---|---|---|
| `.glass-track` bg (scrubber) | `color(srgb 0.110 0.098 0.090 / 0.06)` = `--surface-tint-6` | **GRAY ink film**, not warm glass — chroma ≈ 0 |
| `.glass-track` backdrop | `blur(1px) saturate(1.4)` = `--glass-blur-wash` | sub-perceptual; **transmits almost nothing** |
| track composited over the page | OKLab **C ≈ 0.0002–0.0142** | **DEAD FLAT** — below the 0.018 warm floor |
| `.paper-field` count, all 3 routes | **0** | **NO colorful field** behind ANY rail (§3 root cause #1) |
| `--surface-tint-*` derivation | `oklch(from --foreground …)` both modes | **ink-derived, grayscale by construction** (§3 root cause #2) |
| scrub thumb | `6×16px`, `--surface-tint-25`, **`opacity:0` until `:hover`**, `style.left` teleport, **pure translate** on `--ease-standard` | **STIFF + invisible-during-drag** — Band-0 liquid-weight law violated outright |
| the three variants | scrubber = gray pill + rect thumb · segmented = flat **opaque** `linear-gradient(chart, chart)` · continuous = stitched pill | **a mismatched set** — three visual languages, no shared substrate |

**Ground-truth reconciliation (the lenses disagreed on what exists; verified against
`src/`):**
- ✅ EXIST: `useDragMorph`, `useLiquidFlex`, `useSpringPress`, `useLiquidPress`,
  `usePointerVelocityField`, `useGooMorph`, `DockGooFilter.vue`, the
  `.glass-{wash,quiet,resting,floating,overlay}` ladder + `--glass-bg-*` / `--glass-blur-*`
  tokens (`src/styles/glass/ladder.css`), `--spring-snappy/-bouncy/-dock`, `PaperBackdrop`.
- ❌ DOES NOT EXIST in `src/styles/`: **`--ease-cartoon-punch`** (lens-a cited it as extant;
  lens-b/c correctly grepped it EMPTY). The real ease vocab is `--spring-snappy/-bouncy/-dock`
  + `--ease-apple` + `--ease-spring-bouncy`. **GOLDEN cites only what ships; `--ease-cartoon-punch`
  is a depend-on on `BD.W-CARTOON-PUNCH`, with a `--spring-bouncy` fallback so the timeline is
  never blocked on it.**
- ⚠️ NUANCE: `useDragMorph` is **snap-target based** (built for N discrete tab slots — it
  reads `snapTargets[]` and commits `onSnap(value)`). The scrubber is a **continuous** `t∈[0,1]`,
  NOT discrete slots. So the scrubber does NOT consume `useDragMorph` wholesale; it composes the
  SAME two sub-engines `useDragMorph` itself composes — `useLiquidFlex` (the `"tanh"` squish) +
  a `SpringProgress` position — which is the honest DRY reuse. Segmented/continuous marker
  *selection* (discrete) DOES map cleanly onto `useDragMorph`'s snap model.

**The core idea, stated once (the three lenses' shared thesis):**
*A timeline is ONE warm-glass rail viewed through three postures.* The rail is the shared
identity — a transmissive warm-cream capsule over the colorful field, with a keyed lit edge and
paper grain. The three variants differ ONLY in (a) what rides inside the rail and (b) how the
marker glyphs seat. Unify the substrate → the set becomes coherent by construction; warm it over
a field → the gray vanishes; spring + squish the head → the scrub becomes liquid. One fix, three
payoffs.

---

## 1. THE SYNTHESIS — what each lens contributes to the GOLDEN

| concern | winning move | from |
|---|---|---|
| **shared substrate** | delete the 3 private `--surface-tint-6` tracks → ONE `.timeline-rail` warm-glass recipe composing the shipped `.glass-*` ladder; the field is TRANSMITTED, not painted | **a** (congruence-by-construction) + **b** (`TimelineRail` extraction) |
| **the warm material** | `--glass-bg-resting` floor + `--glass-blur-floating` real transmission + `--glass-edge` defined rim; warm in BOTH modes because every layer is `color-mix(--card …)`, never `--foreground` ink | **b** (the cleanest token-swap §3 cure) |
| **the field dependency** | the rail does NOT solve the field — it CONSUMES `BD.W-GLASS-FIELD` (`PaperBackdrop field`); born-RED honestly until it lands | **all three** (unanimous) |
| **the liquid scrub** | the head = warm-glass lozenge: `useLiquidFlex` `"tanh"` velocity-squish (vol-preserving, cap ≤1.12) + a `SpringProgress` position (inertia/follow-through, NOT `style.left`) + `useSpringPress`/`useLiquidPress` grab-squash + the fill LAGS the head | **a** (the engine list) + **b** (the spring-position mechanism) |
| **the cartoon punch** | anticipation dip on grab · velocity-squish on drag · fling-overshoot (ζ<1) on release · a one-shot accent-flood ripple on landing · the `#detail` scale-pop | **c** (the four-beat filmstrip grammar) |
| **variant differentiation** | scrubber = free liquid bead · segmented = **gapped** independent tinted-GLASS cels + float-dot · continuous = **stitched** (gap=0, KEEP the engine) + flush-rivet | **a** (gap-vs-stitch + float-vs-rivet) + **c** (cels are tinted GLASS, never opaque `chart-*`) |
| **the metaball reach** | OPT-IN only: the scrubber head goo-necks to the fill edge via the shipped `DockGooFilter` (static-SVG sRGB, Safari-safe) — bold but **not load-bearing**; KISS default is a plain squishing puck | **c** (the bold move) tempered by **b** (KISS — the puck alone hits the bar; goo is the audacious opt-in) |
| **√φ proportion** | rail-height : head-diameter : rivet : gap all on the √φ (≈1.272) ladder off ONE base; scrubber tallest (touch target), segmented = h/√φ, continuous = base | **a** (the explicit ladder) |
| **a11y / PRM / cross-engine** | KEEP the entire shipped contract verbatim (paint/motion swap under unchanged DOM); compositor-only `transform`; no `backdrop-filter:url`; `@supports`/PRM floors | **all three** (unanimous) |

**The reconciled tensions:**
1. **lens-c's metaball play-head vs lens-b's KISS puck.** Resolution: the squishing warm-glass
   puck (lens-b) is the DEFAULT and clears the bar alone (a CSS `transform`, Safari-perfect, zero
   SVG). The goo-neck (lens-c) is an **opt-in** `:goo` prop that composes the *already-shipped*
   `DockGooFilter` — no new filter, no new physics, and it is decoration (`aria-hidden`). This
   honours "AUDACIOUS" without making the headline interaction depend on the fragile leg. The
   prototype de-risks BOTH so the default is proven and the opt-in is real.
2. **lens-a's `useLiquidFlex`+`useSpringPress` vs lens-b's `useDragMorph`.** Resolution: the
   scrubber is continuous → `useLiquidFlex` (squish) + `SpringProgress` (position); the marker
   *selection* (discrete) → `useDragMorph` (snap). Both are reuse, no new engine, and they share
   the SAME `useLiquidFlex` squish register, so there is ONE squish law library-wide.
3. **lens-a's "ambient-hue per-region" vs lens-b's "no per-mode arm needed".** Resolution: the
   ambient-hue bleed is a depend-on on `BD.W-AMBIENT-TINT` / the glass-tint seam (`--glass-tint-source`
   + `--glass-tint-strength`, which the ladder ALREADY composes at 0% no-op). The timeline rail
   simply enrolls — it does NOT re-mint the observer. Until the observer feeds a hue, the rail is
   warm-neutral (correct, not gray).

---

## 2. THE SHARED SUBSTRATE — `.timeline-rail` (the boldest, most load-bearing move)

Delete the three private gray substrates; replace with ONE warm-glass rail recipe every variant
composes. This is the literal shared identity — the three variants become the SAME capsule with
different interiors.

```css
/* src/styles/timeline.css — the ONE rail. Composes the shipped .glass ladder,
   NOT --surface-tint-6. */
.timeline-rail {
    position: relative;
    border-radius: var(--radius-pill);
    /* §3 root-cause #2 (dormant-tint) CURE — the warm --card-derived floor, both modes.
       --glass-bg-resting = color-mix(in oklab, --card …); R>G>B by construction. */
    background: color-mix(in oklab, var(--glass-bg-resting), var(--glass-tint-source) var(--glass-tint-strength));
    /* §3 root-cause #1 (flat-field) CURE — REAL transmission, not the 1px wash.
       The fill/cels sit inset:0 ABOVE the rail so the warm field is transmitted
       through the whole bar (a lens, never a gray scrim over warmth). */
    backdrop-filter: var(--glass-blur-floating);
    -webkit-backdrop-filter: var(--glass-blur-floating);  /* build owns the prefix; authored once */
    /* §3 (c) defined edge — the keyed rim + warm under-shadow (the ladder's own recipe). */
    border: 1px solid var(--glass-border-accent);
    box-shadow: var(--glass-material-rim), var(--glass-under-shadow-default);
}
/* deep-transmit opt-in (media-grade rail over a vibrant field) — re-points the blur token only. */
.timeline-rail.is-deep { backdrop-filter: var(--glass-blur-deep); -webkit-backdrop-filter: var(--glass-blur-deep); }
```

- **Field (root cause #1):** the rail transmits the route's `.paper-field` (depend-on
  `BD.W-GLASS-FIELD` / `PaperBackdrop field`). Over the field, `saturate()` in
  `--glass-blur-floating` finally has chroma to concentrate → warm transmissive cream, both modes
  (dark = warm-dark GLOW, never the invisible 6%-on-black).
- **Edge (root cause c):** the keyed rim + warm under-shadow read it as a discrete lit object
  lifted off the field — and double as the `prefers-reduced-transparency` / `prefers-contrast: more`
  legibility anchor (the rail stays a defined warm `--card` shape with transparency off, NEVER gray).
- **Ambient transmit:** the rail enrolls in the ladder's `--glass-tint-source`/`-strength` seam
  (no-op at the default 0%). When `BD.W-AMBIENT-TINT` feeds a sampled dominant hue, a rail over a
  teal field-region bends teal — the "warm read is field-dependent" made dynamic. No re-mint.

**Survival of the fittest — the FITTEST sub-engine is KEPT verbatim:** the continuous variant's
`geometry.ts` stitched-gradient windowing (`stitchedRailGradient` + `stitchedRegionWindow` + the
rounded caps + the region weights) is byte-untouched. It simply paints INSIDE the warm rail now.

---

## 3. THE THREE VARIANTS — one capsule, three interiors, three dot-seats

The taxonomy is correct (independent phases · one progression · a free scrub); the
*differentiation* must become legible. Each variant = the shared rail + a distinct INTERIOR + a
distinct DOT-SEAT so the eye reads the posture instantly:

| variant | the question | interior | marker seat | iOS-27 read |
|---|---|---|---|---|
| **scrubber** | "where am I in a continuum?" | ONE warm fill that tracks `t` + a **liquid lozenge head** | no phase dots; the head IS the marker | a single bright transmissive bead riding a warm lane (the iOS-27 volume/scrub bead) |
| **segmented** | "N independent phases, each its own status" | **gapped** cells (`--timeline-segment-gap` ≈ 2px of rail shows between) — each an independent **tinted-GLASS cel** (`color-mix(in oklab, --cel-accent ~38%, transparent)`, the warm field bleeds UP through it; NEVER the opaque `chart-*` fill) | dots **float above** the boundary seams (independence) | a row of distinct lozenges (the iOS battery/storage segmented bar) |
| **continuous** | "ONE progression across N phases" | the **stitched** gradient (gap=0, hues cross-fade through boundaries; KEEP the shipped engine) | dots seat as **flush rivets** ON the rail (one bar, riveted at the phase joints; inner keyed shadow) | one filling pipeline bar (the speedtest ping→download→upload) |

The differentiators are deliberate and minimal:
- **gap vs stitch** does the heavy lifting of separating the two currently-confusable variants:
  segmented inserts `--timeline-segment-gap` (cells read as independent tiles); continuous has
  zero gap + cross-fades hues (reads as one bar).
- **dot-seat:** segmented dots float ABOVE with their own cast (independent); continuous dots are
  flush **rivets** inset into the surface with an inner keyed shadow (pressed-in joints of one
  bar). Scrubber has no phase dots — the head is the only marker.
- **the head is scrubber-only and is the star (§4).**

`TimelineSegment` is UNCHANGED (the data shape `{key/label/state/progress?/gradient?/value?/weight?}`
is fit). The `#detail` slot stays **continuous-only** (only the "one progression" posture has a
single current-phase to narrate); the contract, the effective-segment resolution (`hovered ?? current`),
and the `<Transition mode="out-in">` recipe are KEPT verbatim.

---

## 4. THE LIQUID SCRUB — the headline interaction (the four cartoon beats)

The scrubber head is RE-INVENTED (it is broken). It is a **warm-glass liquid lozenge** that
squishes along its travel axis with pointer velocity and settles with a spring — all four cartoon
beats, all on shipped engines.

**Visual:** a `--glass-bg-floating` lozenge (the brightest tier — reads forward of the rail) with
the keyed rim + a `.shadow-cartoon-sm` layered-offset cast (the 1940s technicolor pop; depend-on the
cartoon-shadow greenfield, plain `box-shadow` fallback), ~16px tall, radius-pill, an inner specular
catch (`vSpecular`, shipping). **Always visible** (cure the `opacity:0`-until-hover — the scrub
affordance must be present, and the head must be visible during keyboard/touch scrub).

**Motion — compose shipped engines, mint nothing but the calibration:**
- **Beat 1 · ANTICIPATION (grab):** on `pointerdown`, `useSpringPress`/`useLiquidPress` squash
  (the `--scale-press: 0.96` floor) + a sub-pixel dip back against travel — the bead "takes hold."
- **Beat 2 · FOLLOW + SQUISH (drag):** position tracks a `SpringProgress` (inertia + follow-through;
  the head LAGS the pointer a hair, NOT a `style.left` teleport). `useLiquidFlex` `"tanh"` drives the
  velocity-squish: a fast drag visibly STRETCHES the lozenge along X + thins on Y (vol-preserving,
  reciprocal, center-pinned), cap LOW (≤1.12 — swells, never taffy). `usePointerVelocityField`
  supplies the velocity term. The warm **fill LAGS the head** on a slightly slower spring clock
  (the lane reads as liquid trailing the bead).
- **Beat 3 · FLING + OVERSHOOT (release):** the spring settles with a ζ<1 give (a hair of overshoot
  → 1.0). On the `--ease-cartoon-punch` clock when it lands (depend-on; `--spring-bouncy` fallback).
- **Beat 4 · ACCENT-FLOOD (landing):** a one-shot `plus-lighter` wash ripples down the fill from the
  landed position then clears (the v3 f006 flood; the fission-ripple precedent). PRM-static. If the
  scrubber carries a `#detail`-style caret, it scale-pops (~1.06→1, IconChip precedent) as the flood
  arrives.

**OPT-IN goo-neck (`:goo` prop):** the head goo-connects to the fill edge via the shipped
`DockGooFilter` (static-SVG, sRGB color-interp, Safari-safe — NOT `backdrop-filter:url`). The neck
thins to a metaball waist as the head pulls ahead, snaps, and bubbles back. Decoration only
(`aria-hidden`); the default (goo off) already hits the bar.

**Keyboard scrub is liquid too:** arrow/shift-arrow steps animate the SAME `SpringProgress` to a
stepped target (a goo-glide between steps), head visible throughout.

**PRM:** the squish/spring/flood collapse to an instant position set (the shipped `0.01ms` carve);
the bead still MOVES (the gesture works), just without deformation. The goo-neck is dropped.

This is pure composition of `useLiquidFlex` + `useSpringPress`/`useLiquidPress` +
`usePointerVelocityField` + `SpringProgress` + `DockGooFilter` (opt-in) — **no new motion engine.**

---

## 5. TYPE · PROPORTION · CARTOON SHADOW (audacious, √φ, both modes)

- **√φ proportion:** re-base the three rail heights on the √φ (≈1.272) ladder off ONE base:
  continuous (the loudest, the bar) = base `h`; segmented = `h/√φ`; scrubber track = `h·√φ` (the
  a11y scrub surface is tallest — it bears the 44×44 touch target). The head diameter, rivet
  diameter, and segment gap derive from `h` by √φ steps
  (`--timeline-rivet: calc(var(--timeline-h) / var(--sqrt-phi))`) — nothing arbitrary. Channel-height
  : head-diameter ≈ φ (the head reads as a bead seated in the strip, not filling it).
- **type:** the scrubber caret + the `#detail` value read the audacious mono ladder (`fira-code`,
  the `--type-*` scale) with the −1.5% Apple tracking; the detail panel's numeric value rides the
  display ladder (the "245.3 Mbps" hero numeral).
- **cartoon shadow:** the head + the segmented float-dots carry `.shadow-cartoon-sm` (bold
  layered-offset cast; the cast offsets OPPOSITE the keyed rim so they cohere with the one
  key-light). The continuous rivets carry an INNER keyed shadow (pressed-in — the inverse).

---

## 6. A11Y · PRM · CROSS-ENGINE (verify, carve, mint nothing)

- **A11y is FIT — KEEP it verbatim.** scrubber `role="slider"` + `aria-valuemin/max/now`
  (`Number(modelValue ?? 0)`) + arrow/shift-arrow; segmented `role="group"` + per-dot
  `<button aria-label="{label}: {state}">` + the WCAG-2.5.5 44×44 `::before` halo (+ coarse-pointer
  recompute); continuous Option-C structural split (`role="progressbar"` rail SIBLING to the
  `role="list"` marker overlay — the `nested-interactive` fix), the `data-current` stamp, the
  HoverPopover debounced cadence. None of this changes — the warm substrate + liquid scrub are a
  paint/motion swap UNDER the same DOM/ARIA. The goo-neck + accent-flood are `aria-hidden` decoration.
- **PRM:** the existing `0.01ms` collapses stay; ADD the head squish/spring/flood → instant-set
  carve + drop the goo-neck. The `.paper-field` drift freezes (warm stays). The cel fill is instant.
- **`prefers-reduced-transparency`:** the rail falls to the warm-but-opaque floor (`--card` + blur 0,
  the W54 `.glass-opaque` endpoint via the ONE `--glass-level` path); the cels → solid warm tints —
  warmth kept, transmission dropped.
- **Cross-engine (Chrome AND Safari):** every leg is on the cross-engine base — `--glass-bg-*`
  `color-mix(in oklab)` + `backdrop-filter: blur() saturate()` (WebKit since 9; the build owns the
  `-webkit-` prefix into dist), `linear()` springs + compositor `transform`/`clip` for the scrub
  (NEVER `left`/`width` for the head — Safari composites transform, not left; the fill width is the
  one non-compositor channel, gated to `will-change` only during `[data-scrubbing]`, dropped at rest).
  The goo-neck is the shipped `DockGooFilter` `filter:url()` on the head+neck layer (an opaque-alpha
  sandwich) — **NEVER `backdrop-filter:url`, NO naive ellipsoid, a real blob↔meatball merge.**
  `@supports`/PRM floors throughout. Acceptance is a PAIRED-engine π (chromium AND webkit).

---

## 7. DEFT INTEGRATION — the UNION (what is kept / refined / re-invented)

| sub-part | verdict | action |
|---|---|---|
| `GlassTimeline.vue` dispatcher + variant enum + event surface | **FIT** | KEEP verbatim (public API unchanged; consumers untouched) |
| `TimelineSegment` data shape + `types.ts` | **FIT** | KEEP verbatim |
| `geometry.ts` stitched windowing + rounded caps + region weights + payload helpers | **FITTEST** | KEEP verbatim — it paints inside the warm rail now |
| continuous Option-C a11y split + `#detail` slot + HoverPopover cadence | **FIT** | KEEP verbatim |
| the 3 private `--surface-tint-6` + `--glass-blur-wash` substrates | **BROKEN (gray)** | RE-INVENT → ONE `.timeline-rail` warm-glass recipe (§2) |
| the scrubber thumb (gray bar, Material ease, hidden-until-hover, no squish) | **BROKEN (stiff)** | RE-INVENT → the liquid warm-glass lozenge + 4 beats (§4) |
| segmented vs continuous visual confusion + opaque `chart-*` cels | **WEAK** | REFINE → gap-vs-stitch + float-vs-rivet + tinted-GLASS cels (§3) |
| the three heights as arbitrary px | **WEAK** | REFINE → √φ ladder off ONE base (§5) |

**BUILD-DAG depend-on (this design CONSUMES them; it does NOT re-fork or re-mint them):**
`BD.W-GLASS-FIELD` (`.paper-field`/`PaperBackdrop field` chassis mount), the glass-material golden
warm-floor + keyed edge (`--glass-bg-*`, `--glass-material-rim`, `--glass-border-accent`),
`BD.W-AMBIENT-TINT` (the dominant-hue feed into `--glass-tint-source`), `BD.W-CARTOON-PUNCH`
(`--ease-cartoon-punch`; `--spring-bouncy` fallback), the cartoon-shadow greenfield (`.shadow-cartoon-*`).
**Extant, composed as-is:** the `.glass-{resting,floating,deep}` ladder, `--glass-blur-*`,
`--spring-snappy/-bouncy`, `--scale-press`, `useLiquidFlex`, `useSpringPress`/`useLiquidPress`,
`usePointerVelocityField`, `useDragMorph` (marker snap), `DockGooFilter` (opt-in goo), `vSpecular`,
`<ScrollingText>` (overflow caret).

**RETIRE in the same amendment (no dual paths):** the per-variant divergent track CSS (three
`background:--surface-tint-6` recipes → one `.timeline-rail`); the hand-rolled scrubber `style.left`
pointer-math (→ the `SpringProgress` + `useLiquidFlex` head). **No legacy, no alias, no dual path.**

---

## 8. DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the BD wave set; NO dup)

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **`BD.W-TIMELINE-WARM-RAIL`** | RE-INVENT the 3 private substrates as ONE `.timeline-rail` warm-glass recipe (`--glass-bg-resting` + `--glass-blur-floating` + keyed rim) transmitting the field; tinted-GLASS cels; enroll in the ambient-tint seam | R1·R2·R3·R5 | rides `BD.W-GLASS-FIELD`/glass-material/`BD.W-AMBIENT-TINT` (depend-on, not dup — those build the register; this CONSUMES it). NOT a dock/select wave. |
| **`BD.W-TIMELINE-LIQUID-SCRUB`** | RE-INVENT the scrubber head as the warm liquid lozenge — compose `useLiquidFlex` squish + `useSpringPress` + `usePointerVelocityField` + `SpringProgress` + opt-in `DockGooFilter`; fill lags head; four beats; always-visible | R4 | distinct from `useTabIndicator` (tab-strip indicator) + `BD.W-DOCK-TAB-INDICATOR`; reuses the SAME `useLiquidFlex` engine — no fork |
| **`BD.W-TIMELINE-VARIANT-CONGRUENCE`** | REFINE differentiation — gap-vs-stitch, float-dot vs flush-rivet, √φ height/rivet/gap ladder off ONE base | R5 | composition-only refine of the extant variant SFCs; no new component, no new engine |

These three MAY land as ONE wave (`BD.W-TIMELINE-RAIL-UNIFY`, lens-b's framing) since they share
the substrate extraction; split only if the band gating wants it.

**HELD / FROZEN (union law):** `GlassTimeline.vue` dispatcher + enum + events, `TimelineSegment`,
`geometry.ts` (the FITTEST sub-engine — byte-untouched), the continuous Option-C a11y split, the
`#detail` slot contract + resolution + `<Transition mode="out-in">`, the WCAG-2.5.5 halo, the
HoverPopover cadence, the PRM `0.01ms` collapses, the `--surface-tint-*` in-srgb fence (no longer
the timeline's substrate).

---

## 9. THE GATE — born-RED (real painted pixels over the real field, both modes, both engines)

Extend the timeline π (no new harness — the `no-gray` discipline applied to the rail + the
scrub frame-series). **Born-RED today on all five arms.**

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **R1 warm-rail** | each rail (all 3 variants) composited OVER the real `.paper-field` resolves OKLab **C ≥ 0.018 warm** (H ∈ [45,85]), both modes | the C ≈ 0.0002–0.0142 flat composite (§0) | the warm tier + field land |
| **R2 field-present** | each timeline route mounts a `.paper-field` ancestor | `paperFieldCount: 0` on all 3 routes | the chassis mounts the field |
| **R3 defined-edge** | each rail carries a non-flat keyed rim + a non-`none` warm under-shadow; the head/rivet edge cuts | the 1px wash + no rim | the keyed edge wires |
| **R4 liquid-scrub** | a π frame-series of a real scrub-drag shows the head `scaleX ≠ scaleY` mid-flight (squish) + `X·Y ≈ 1` (vol-preserving) + a spring settle to 1.0 (overshoot then rest); head visible during drag | the §0 stiff thumb (translate-only, `--ease-standard`, `opacity:0`) | the `useLiquidFlex` + `SpringProgress` land |
| **R5 congruence** | the three rails share ONE substrate recipe (same computed bg-token family + blur token); segmented gap > 0, continuous gap = 0, scrubber dot-count = 0; cels translucent (channel warmth measurable THROUGH them) | the three divergent gray substrates + opaque cels | the unified `.timeline-rail` lands |

The π samples the LIVE composite over the real field in BOTH modes (Chromium AND WebKit) + writes
the captured DELTA frames + the scrub-drag frame-series. The born-RED gate sketch lives at
`golden/timeline-pi.mjs` (§ prototype below).

---

## 10. ACCEPTANCE (the gestalt bar — judge AS A USER, both modes, both engines)

On a FRESH capture of `/data/timeline`, `-segmented`, `-continuous` in BOTH modes AND both engines:

1. **The three variants read as ONE primitive in three postures** — a shared warm-glass rail; you
   can tell scrubber/segmented/continuous apart instantly (free bead · gapped tinted-glass tiles ·
   one stitched bar) without reading the heading. [R5]
2. **Every rail reads warm transmissive glass over a colorful field** — not gray, not flat;
   composited C ≥ 0.018 warm, both modes; dark GLOWS. [R1·R2]
3. **Every rail/head/rivet reads as a defined lit shape** lifted off the field (keyed rim + warm
   under-shadow). [R3]
4. **The scrub is liquid + weighty** — the bead anticipates on grab, squishes with the drag, springs
   to settle past then back, the fill lags with inertia, an accent-flood ripples on landing; never
   stiff, never a Material crossfade; visible throughout. [R4]
5. **The `#detail` slot + segment hover/click + the full a11y contract are un-regressed.**
6. **Type is audacious, proportion is √φ, the cartoon cast coheres with the one key-light.**
7. **PRM-carved + Safari-parity** on the warm rail, the keyed edge, the liquid scrub, and the
   opt-in goo-neck; zero `backdrop-filter:url` in the timeline path; the goo is a real
   blob↔meatball merge (no naive ellipsoid).

---

## 11. THE PROTOTYPE (de-risks the two boldest mechanisms)

`golden/` carries a throwaway spike proving the two load-bearing moves before any `src/` edit:
- `golden/timeline-golden.html` — a standalone page (no build) with all three variants on the ONE
  `.timeline-rail` over a colorful field, both modes, the liquid scrub (squish + spring + lag +
  flood) on `requestAnimationFrame`, and the opt-in goo-neck via an inline static-SVG `DockGooFilter`-
  equivalent (sRGB color-interp). Proves: warm composite C, the four beats, gap-vs-stitch, Safari-safe goo.
- `golden/timeline-pi.mjs` — the born-RED gate sketch (Playwright, chromium + webkit): samples the
  rail composite OKLab over the field, asserts R1–R5, captures the scrub frame-series. Born-RED
  against the shipped `:5173/data/timeline*`; born-GREEN against the prototype html.

See those files for the exact, runnable mechanism.
</content>
</invoke>
