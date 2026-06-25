# TIMELINE — WAVE-AMENDMENT (concrete; reconciled vs the 116-wave set)

> Reference implementation: `docs/tranches/BD/greenfield/timeline/GOLDEN.md` (canonical),
> hardened by `DELTA-ASSAY.md` §3 (the six challenge folds). Tranche-dev only.
> **Net: 1 NEW wave + 0 AUGMENT + 0 PRUNE + 0 EXCISE + 8 DEPEND.** No existing wave touches the
> timeline (grep `*TIMELINE*` in `union/waves/` = empty), so there is nothing to augment/prune;
> the timeline is NET-NEW and CONSUMES the booked sibling register (no re-mint, no re-fork).

---

## RECONCILIATION (no-dup vs the 116-set)

- **No `*TIMELINE*` wave on disk** → the golden's `BD.W-TIMELINE-WARM-RAIL` /
  `-LIQUID-SCRUB` / `-VARIANT-CONGRUENCE` are NET-NEW. Per the golden §8 note ("these three MAY
  land as ONE wave since they share the substrate extraction"), and because all three pivot on the
  ONE `.timeline-rail` extraction, they land as **ONE wave with three sub-legs** —
  `BD.W-TIMELINE-RAIL-UNIFY` — KISS, one born-RED gate family. Split only if band gating demands.
- **The register tokens are DEPENDs, not dups.** `--glass-bg-resting`, `--glass-blur-floating/-deep`,
  `--glass-material-rim`, `--glass-under-shadow-default`, `--glass-border-accent`,
  `--glass-tint-source/-strength`, `--glass-level`, `.paper-field`, `--ease-cartoon-punch`,
  `--motion-weight`, `.shadow-cartoon-*` are deliverables of the sibling band-0/material/
  page-background amendments (ABSENT as wave files today; the dock-core/cards/select rows DEPEND on
  the same booked-pending names). The timeline ENROLLS; it does not build the register.
- **The engines are extant, composed as-is** — no new motion engine: `useLiquidFlex`,
  `useSpring`/SpringProgress (the `@mkbabb/keyframes.js` engine the Vue wrapper drives),
  `useSpringPress`/`useLiquidPress`, `usePointerVelocityField`, `useDragMorph` (discrete marker
  snap only), `DockGooFilter.vue` (opt-in goo), `vSpecular`, `<ScrollingText>`.
- **FROZEN (union law, byte-untouched):** `GlassTimeline.vue` dispatcher + enum + events,
  `TimelineSegment` + `types.ts`, `geometry.ts` (the FITTEST sub-engine), the continuous Option-C
  a11y split, the `#detail` slot contract + `hovered ?? current` resolution + `<Transition
  mode="out-in">`, the WCAG-2.5.5 44px halo, the HoverPopover cadence, the PRM `0.01ms` collapses,
  the `--surface-tint-*` in-srgb fence (no longer the timeline's substrate).

---

## NEW WAVE — `BD.W-TIMELINE-RAIL-UNIFY`

**Slug:** `BD.W-TIMELINE-RAIL-UNIFY`
**Band:** B (core components) · **Status:** booked, tranche-dev
**Reference:** `docs/tranches/BD/greenfield/timeline/GOLDEN.md` §§2–7 (as hardened by
`DELTA-ASSAY.md` §3).

### Scope (three sub-legs, one substrate extraction)

**LEG 1 — WARM RAIL (RE-INVENT the gray substrate).** Delete the 3 private `--surface-tint-6` +
`--glass-blur-wash` recipes (`ScrubberTimeline.vue:135-147`, `SegmentedTimeline.vue:128-133`,
`ContinuousRail.vue:84-90`) → ONE `.timeline-rail` in `src/styles/timeline.css` composing
`--glass-bg-resting` (warm `--card`-derived floor, both modes) + `backdrop-filter:
var(--glass-blur-floating)` (real transmission; build owns `-webkit-`) + `border:1px solid
var(--glass-border-accent)` + `box-shadow: var(--glass-material-rim), var(--glass-under-shadow-default)`
(keyed rim + warm under-shadow). Enroll in the `--glass-tint-source`/`--glass-tint-strength` seam
(no-op at 0%). The fill/cels sit `inset:0` ABOVE the rail so the field transmits THROUGH the bar.
`.is-deep` re-points `--glass-blur-deep`. PRT floor = `--glass-level: 0` via `a11y-fallback.css`
(warm-but-opaque `--card`, NOT `.glass-opaque` — that class does not exist). Cels become tinted
GLASS (`color-mix(in oklab, --cel-accent ~38%, transparent)` with a keyed inner cel edge so they
read as defined chips, not pastel ghosts) — RETIRE the opaque `gradientFor(seg)` `chart-*` fill.

**LEG 2 — LIQUID SCRUB (RE-INVENT the stiff thumb).** The scrubber head = a `--glass-bg-floating`
warm lozenge, **always visible** (cure `opacity:0`-until-hover), `.shadow-cartoon-sm` cast,
`vSpecular` catch. Motion composes shipped engines only: travel = `transform: translateX()` (the
`useSpring`/SpringProgress position — NEVER `style.left`), with the `useLiquidFlex` `"tanh"`
velocity-squish multiplied into the SAME matrix (`translateX() scale(sx,sy)`, vol-preserving, cap
≤1.12); grab = `useSpringPress`/`useLiquidPress` anticipation; velocity = `usePointerVelocityField`;
the fill LAGS the head on a slower spring clock; release = ζ<1 overshoot on `--ease-cartoon-punch`
(`--spring-bouncy` fallback); landing = a one-shot `plus-lighter` accent-flood (PRM-static). Fill
channel = `scaleX` on a pinned layer OR `clip-path` inset, `will-change` ONLY under
`[data-scrubbing]`, dropped on pointerup. Keyboard scrub animates the SAME SpringProgress to a
stepped target, head visible throughout. Head diameter on the √φ ladder, seated φ-INSIDE the
channel (`head ≈ channel/√φ ≈ 14px`); the 44px touch target is an invisible `::before` halo,
decoupled from the visible bead. **Opt-in `:goo`:** the head silhouette + neck + fill-leading-edge
are co-children of ONE `filter:url()` host (the shipped `DockGooFilter` topology — NO
`backdrop-filter` on that host, `isolation:isolate`, opaque-alpha sandwich, sRGB color-interp); the
transmissive glass head rides ABOVE as a separate crisp element. `aria-hidden` decoration; default
(goo off) hits the bar alone. Re-derive the goo `stdDeviation`/threshold as a function of head
diameter (geometry-relative throat, NOT the dock's 40px-capsule constant).

**LEG 3 — VARIANT CONGRUENCE (REFINE differentiation).** gap-vs-stitch (segmented inserts
`--timeline-segment-gap` and the gap reveals the warm RAIL — segmented PAINTS the lane, cels are
translucent insets, NOT N independent capsules; continuous keeps gap=0 + cross-fade — `geometry.ts`
untouched). dot-seat (segmented dots float ABOVE with `.shadow-cartoon-sm`; continuous dots = flush
rivets with an inner keyed shadow; scrubber = no phase dots). MINT `--sqrt-phi: 1.272` ONCE at the
sizing root and re-base the 3 rail heights + head/rivet/gap on the √φ ladder off ONE `--timeline-h`
(re-point the 3 typography hardcodes of 1.272 to it — net DRY win).

### DEPENDS (consume booked register; do NOT re-ship)

`BD.W-GLASS-FIELD` / `BD.W-PAGE-FIELD` (the `.paper-field` chassis mount on the 3 timeline routes) ·
`BD.W-GLASS-KEY-EDGE` (the keyed rim + warm under-shadow onto `--glass-material-rim`/
`--glass-border-accent`) · glass-material warm-floor (`--glass-bg-resting/-floating`,
`--glass-blur-floating/-deep`, `--glass-level`) · `BD.W-AMBIENT-TINT` (the dominant-hue feed into
`--glass-tint-source`) · `BD.W-MOTION-WEIGHT` (`--motion-weight`) · `BD.W-CARTOON-PUNCH`
(`--ease-cartoon-punch`; `--spring-bouncy` fallback so the timeline is never blocked) ·
`BD.W-CARTOON-CASTER` (`.shadow-cartoon-*` / the inert cast carrier). All ABSENT as files today →
the wave ERRORS `no-such-token` until they land (an honest build-DAG ordering, like the sibling rows).

### CROSS-LINK

`BD.W-GLASS-EVERY-ELEMENT` (the census enrolls the rail; no edit here) · `BD.W-DARK-MATERIAL` /
IOS27-REFERENCE T7 (the dark luminosity-lift the dark-rail floor consumes if R1-dark falls below
floor).

### The born-RED GATE — `proof:timeline-rail` (paired-engine π, both modes, REAL pixels)

Extend the timeline π (no new harness). **Born-RED today on the shipped `:5173/data/timeline*`**;
born-GREEN against the re-authored prototype. Captured DELTA frames + scrub frame-series + OKLab/
scale JSON committed for Chromium AND WebKit (the live-verify-capture law — webkit was never run at
golden stage; this wave RUNS it).

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **R1 warm-rail (TRANSMISSION DELTA, hardened)** | for each variant, a rail-ONLY masked strip (exclude fill/head rects) composited OVER the real `.paper-field` resolves `C(rail-over-field) − C(bare-card-region) ≥ Δ` warm (H∈[45,85]), both modes; + a chroma-CEILING witness pins the shipped `srgb 0.11/0.098/0.09 0.06` ink film as RED | the gray ink film adds ~0 chroma over its backing; field-count 0 | the warm tier + field land |
| **R2 field-present** | each of the 3 timeline routes mounts a `.paper-field` ancestor | live `paperFieldCount: 0` (ORCH-measured both routes) | the chassis mounts the field |
| **R3 defined-edge** | each rail carries a non-flat keyed rim + a non-`none` warm under-shadow; head/rivet edge cuts | the 1px wash + no rim | the keyed edge wires |
| **R4 liquid-scrub squish** | a scrub-drag frame-series shows head `scaleX ≠ scaleY` mid-flight; vol-preserving `\|sx·sy−1\|<0.06` asserted ONLY on frames where `\|sx−sy\|>ε` (conditioned — no vacuous GREEN); spring settle to 1.0 with overshoot; head visible during drag | the stiff `6×16` `opacity:0` thumb (sx=sy=1) | `useLiquidFlex`+SpringProgress land |
| **R4b compositor-position** | the head matrix `e` (translate-x) MOVES across the frame-series while computed `left` stays CONSTANT (Safari-safe travel on `transform`, not `left`) | live travel rides `style.left`; matrix is static centering only | translateX travel lands |
| **R4c no double-filter** | static scan: NO `.timeline-*` element computes both `filter:url()` AND `backdrop-filter` simultaneously (the real WebKit trap) | n/a today (no goo shipped) — born-RED as a regression fence on the new goo layer | goo is a separate backdrop-free host |
| **R4d goo-merge (opt-in)** | with `:goo`, the alpha at the head↔fill midpoint reads a CONNECTED bridge mid-flight then a SNAP (the shipped fission-π waist assay, non-naive-ellipsoid at the bead scale); webkit composite-C over the field with goo ON ≈ goo OFF | no shared filter pass possible today | the single-host merge lands |
| **R5 congruence** | the 3 rails share ONE `--glass-bg-*` family + blur token (segmented's rail bg is NOT transparent); segmented gap > 0 reveals the RAIL; continuous gap = 0; scrubber dot-count = 0; cels translucent (channel warmth measurable THROUGH them) | 3 divergent `--surface-tint-6` substrates + opaque cels + gap 0 | the unified `.timeline-rail` lands |

The π samples the LIVE composite over the real field in BOTH modes (Chromium AND WebKit), masks to
the rail-only strip (challenge #2 R-4), and writes the captured DELTA + frame-series + JSON to
`golden/` (no "both engines" prose without the webkit artifact on disk).

### RETIRE in the same wave (no dual paths, no legacy)

the 3 per-variant `--surface-tint-6` + `--glass-blur-wash` track recipes; the scrubber
`style.left`/`width` pointer-math + the `opacity:0`-until-hover thumb; the opaque `chart-*`
`gradientFor(seg)` cel fill. Replaced 1:1 by `.timeline-rail` + the `useSpring`/`useLiquidFlex` head
+ tinted-glass cels. **No alias, no migration shim.**

### EXCISED from the GOLDEN (the challenge corrections)

the §9 "born-RED on all five arms" claim (R1 was born-GREEN as written → re-scoped to the
transmission-delta R1 above); the vacuous-GREEN volpreserve (now conditioned); the prototype's
`style.left` position channel + permanent `will-change:width` + same-element `filter⊗backdrop` +
two-sibling no-merge goo + nulled-segmented-rail + `26px` off-ladder head (re-authored to
translateX + single backdrop-free goo host + painted segmented lane + φ-inside bead); the phantom
`var(--sqrt-phi)`/`.glass-opaque` reuse labels (→ MINT `--sqrt-phi` / HOOK `--glass-level: 0`).
