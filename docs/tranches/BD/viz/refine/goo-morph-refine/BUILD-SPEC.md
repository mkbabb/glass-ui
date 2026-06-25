# BUILD-SPEC — goo-morph-refine: the SLOW, FAT, WEIGHTY liquid worm

**The synthesis.** Three research passes converge: the mechanism (two-edge worm + SVG-goo
metaball) is RIGHT — this is a magnitude retune, not a rewrite. But the three passes DIVERGE
on one load-bearing point, and the LIVE inspection (research-root-cause, real Chromium render)
is the binding truth: the **dominant unfixed defect is NOT the clock — it is the
volume-preserving pinch collapsing the worm to a 2.45px-tall HAIRLINE thread at peak stretch**
(`useWormMorph.ts:163`, `pinch = 1/√lenRatio` → at `lenRatio≈6` the 6px worm necks to 2.45px).
research-mechanism's "ZERO `useWormMorph.ts` edit" claim is STALE — it was written against the
token surface alone and missed the live pinch measurement. **The correct fix lands a GIRTH
FLOOR in `useWormMorph.ts` (the dominant lever) AND the magnitude retunes in `PagerDots.vue`
(the coupled levers).** Each alone is still subtle (the user rejected subtle TWICE); land all
together, go FAR.

Surface: `/motion/deck` — `PagerDots` → `useWormMorph` → `--worm-t`. The ONE home; `DeckPager`
+ carousel inherit (≥2 consumers by construction, no fork). Every paint reads a `--pager-*`
token (the consumer retint seam — `slides` sets `--pager-dot-active: var(--ncsu-red)`).

---

## The four coupled defects (LIVE-measured at HEAD)

| # | defect | live value @ HEAD | the fix lever |
|---|---|---|---|
| **1 — THIN (dominant)** | the pinch collapses the worm to a hairline AT peak stretch | worm bbox at peak `{36px × 2.45px}` (`pinch=1/√6=0.408`) | **girth FLOOR in `useWormMorph.ts:163`** |
| **2 — SMALL** | the rest pip (and worm body) is a 6px speck | `--pager-dot-size: 0.375rem` = 6px | **`--pager-dot-size` → 0.8125rem (13px)** |
| **3 — SUBTLE GOO** | the blur fringe is thin, the threshold steep → a starved neck | `stdDeviation=4`, `feColorMatrix … 18 -7` (cutoff 0.389) | **stdDeviation → 8, threshold → 16 -5 (cutoff 0.313)** |
| **4 — TIMID SQUISH** | the velocity-swell adds ~0 fatness | `--pager-worm-max-stretch: 1.08` (live `--stretch` ≈ 1.01–1.03) | **`--pager-worm-max-stretch` → 1.4** |

The clock (`--pager-worm-duration: 1.3s`) is **already slowed AND honored live** (the
manual-glide proof: half at 657ms, done at 1308ms). research-target/research-mechanism push it
to 1.7–2.0s; the live finding says the "too fast" READ is the thinness + small dots, not the
clock. **Resolution: lift the clock to 1.8s** (the weighty anchor between the two research
brackets — the bigger/fatter worm now HAS mass for the slowness to register against; a 13px fat
worm gliding 1.8s reads weighty where a 6px thread at 1.3s read as a flicker). This is ~3× the
shipped `--spring-bouncy-duration` (0.57s) — a deliberate, dramatic flow.

The dot-size coupling is the master scale: bigger dot → fatter worm body → wider bridging fringe
→ the goo has mass to merge → the slow clock has something to track. Fix the size first, then
tune goo/squish/girth against the new size.

---

## THE EDITS (exact files + lines + before/after)

### EDIT GROUP A — the GIRTH FLOOR (the dominant fix) — `src/components/custom/pager-dots/useWormMorph.ts`

**A1 — floor the pinch so the worm keeps real mass mid-stretch (`useWormMorph.ts:159-163`).**

The strict volume-preservation `pinch = 1/√(lenRatio)` is CORRECT for a SegmentedTabs pill that
is already wide, but WRONG for a small dot stretching 6× — it eats the entire body into a
hairline. A liquid worm/mercury bead keeps substantial girth mid-stretch (the neck is thinner
than the ends but never a thread); the metaball goo supplies the mass-to-mass necking, not a
self-thinning ribbon. Floor the cross-axis to never drop below ~72% of the (now-bigger) rest
diameter.

```ts
// HEAD (useWormMorph.ts:163):
const pinch = 1 / Math.sqrt(lenRatio);

// NEW:
// the cross-axis volume-preserving pinch — but FLOORED so the worm keeps real liquid
// mass mid-stretch (a hairline thread reads as a thin streak, not a fat worm; the goo
// metaball supplies the mass-to-mass neck, the worm body never self-thins to a thread).
// GIRTH_FLOOR ≈ 0.72 → at the 13px rest body the worm stays ≥ ~9.4px tall across the
// whole stretch — a FAT liquid worm. The sqrt is the soft shaping; the floor is the cap.
const GIRTH_FLOOR = 0.72;
const pinch = Math.max(GIRTH_FLOOR, 1 / Math.sqrt(lenRatio));
```

Add the named constant near the top of the function body (or inline as above — one site). The
`GIRTH_FLOOR` is the load-bearing knob; bound [0.65, 0.85] (0.72 anchor — fat, still tapered).

> **Why a constant, not a token:** the girth floor is a GEOMETRY-LAW knob (the worm's
> mercury-bead shaping), not a consumer-retint surface. The consumer-facing dials are the
> `--pager-*` tokens (size/duration/squish/goo); the floor is internal to the worm's liquid
> identity (the W-LIQUID single-engine discipline — the squish ENGINE is `useLiquidFlex`, the
> worm's two-edge SHAPING is `useWormMorph`'s own). If a future wave wants it tunable, lift it
> to `--pager-worm-girth-floor` read live off the rail (the `maxStretch` getter precedent) — but
> NOT this wave (no speculative token; ≥2-consumer bar unmet for a girth knob).

**A2 — the `restSize()` fallback resolves the new default (`useWormMorph.ts` n/a — fallback is
in `PagerDots.vue:139-145`).** `restSize()` reads `--pager-dot-size` LIVE; the fallback literals
(`6`, `0.375`) are dead paths only hit when the rail is unmounted. Update them to the new default
for honesty (`13` / `0.8125`) — NOT load-bearing (the live read wins), but keeps the fallback
truthful. Same for `PagerDots.vue:138` `return 6` → `return 13`.

### EDIT GROUP B — the MAGNITUDE tokens — `src/components/custom/pager-dots/PagerDots.vue` `<style scoped>`

All in the `.pager-dots` token block (lines 308–324) unless noted.

| # | line | token | HEAD | → NEW | axis |
|---|---|---|---|---|---|
| B1 | 310 | `--pager-dot-size` | `0.375rem` (6px) | **`0.8125rem`** (13px) | BIGGER pip + fatter worm body (MASTER) |
| B2 | 311 | `--pager-dot-elongated` | `1.5rem` (24px) | **`2.25rem`** (36px) | bigger reserve ref (documentary — see note) |
| B3 | 319 | `--pager-worm-duration` | `1.3s` | **`1.8s`** | SLOW the flow (weight) — see clock note |
| B4 | 322 | `--pager-worm-max-stretch` | `1.08` | **`1.4`** | VISIBLE velocity swell |
| B5 | 323 | `--pager-goo-layer-opacity` | `0.52` | **`0.65`** | solid WET neck (still translucent glass) |

**B2 note (the elongation ref is documentary, NOT load-bearing).** research-root-cause confirms
`--pager-dot-elongated` has NO live consumer driving it (the worm length is geometry-derived in
`paint()` off the measured centers — not this token; `grep` finds only the declaration + the
README row). It is a reference token for the README/documentation. Lift it to 36px (1.5× the
bigger pitch) for honesty + the README row update; it does not affect paint. KEEP it (a clean
delete is out of scope — it documents the worm's max-span intent).

**B3 note (the clock — KEEP the spring, lift the duration ONLY).** `--pager-worm-spring:
var(--spring-bouncy)` is UNCHANGED (the W-GLASS-CAL fence — `bouncy` is a shipped
`SPRING_PRESETS` row, response 0.5 / ζ 0.55, overshoot +12.6%, the blob-morph register). The
weight is the SLOWER OWN CLOCK + the bigger SQUISH + the fatter worm, over the SAME curve. The
`--pager-worm-duration` is the worm's OWN token (decoupled from `--spring-bouncy-duration`), so
this re-times ONLY the worm — the per-spring-clock canon (motion-canon P4) holds. The overshoot
peaks +12.6% at ~14% of the clock (~252ms into a 1.8s glide), then eases back — a luxuriant
slow rebound. Update the inline comment (line 319-321) to retire the stale "safe-blind /
verified" prose: the refine triumvirate LANDED — record the final value + rationale.

**B5 note (the opaque-layer technique is LOAD-BEARING — KEEP).** Every shape inside `#pager-goo`
stays full-alpha `currentColor`; the translucency lives ONCE at `--pager-goo-layer-opacity`. A
translucent shape INSIDE the filter breaks the alpha threshold (the goo erases it). B5 lifts the
LAYER opacity (the fat neck reads solid+wet) but NEVER pushes per-shape alpha into the filter.
0.65 stays translucent (the rail still reads as a glass pill, not opaque). The active-dot pip
opacity (`.goo-dot[data-active]::before { opacity: 0.35 }`, line 372) is KEPT — the worm sits ON
it; the bigger worm + fatter neck carry the active read (the brightness hierarchy).

### EDIT GROUP C — the GOO FILTER constants — `src/components/custom/pager-dots/PagerDots.vue` template

The SVG filter primitive attrs are hardcoded (SVG `var()` is unreliable cross-engine — Safari
ignores `var()` in `stdDeviation`; KEEP the static literals — research-root-cause §CASCADE).

| # | line | attr | HEAD | → NEW | math |
|---|---|---|---|---|---|
| C1 | 245 | `feGaussianBlur stdDeviation` | `"4"` | **`"8"`** | 2× fringe → bridges a 12–16px gap (was ~6px) |
| C2 | 249 | `feColorMatrix values` last row | `… 0 0 0 18 -7` | **`… 0 0 0 16 -5`** | cutoff 0.389 → 0.313 (fatter, longer-lived neck) |

```html
<!-- HEAD (PagerDots.vue:245): -->
<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
<!-- NEW: -->
<feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />

<!-- HEAD (PagerDots.vue:249): -->
values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
<!-- NEW: -->
values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -5"
```

The neck-bridge math (research-mechanism §1a, `scratchpad/worm-bridge.mjs`): at s=4/cutoff-0.389
a neck survives only a ~4–6px residual gap (the hard hop + flicker); at s=8/cutoff-0.313 it
survives 12–16px (wells up EARLY as the worm approaches, holds FAT across the crossing, releases
LATE). The A:|B| ratio (16/5 ≈ 3.2) stays in the clean-blob band (~2–3:1 — no ringing). The
softer cutoff also restores the dots to FULL drawn size (the steep 18/-7 eroded them).

> **NB the resting self-merge check (research-mechanism appendix `goo-math.mjs`):** two 13px
> dots at the ~30px center pitch carry mid-gap alpha ≪ cutoff even at s=8 — the dots stay
> DISCRETE at rest (only the WORM bridges them). The 13px pip in the 24px cell leaves ~5.5px
> clear margin; s=8 softens the fringe but the dots stay round + separate. If the live π reads
> the rest dots merging into each other (over-bridging), s=8 is the ceiling — dial to s=7 (still
> fat: bridges 12px). The π is the binding truth.

---

## The before/after VALUE table (the single dial summary)

| knob | site | HEAD | → NEW | direction |
|---|---|---|---|---|
| pinch girth floor | `useWormMorph.ts:163` | none (`1/√r` → 2.45px) | **`max(0.72, 1/√r)`** (→ ~9.4px) | **DOMINANT — fat worm** |
| `--pager-dot-size` | PagerDots:310 | 6px | **13px** | 2× — MASTER scale |
| `--pager-dot-elongated` | PagerDots:311 | 24px | **36px** | documentary ref |
| `--pager-worm-duration` | PagerDots:319 | 1.3s | **1.8s** | ~3× base — weighty |
| `--pager-worm-spring` | PagerDots:318 | `--spring-bouncy` | **KEEP** | the overshoot IS the bounce |
| `--pager-worm-max-stretch` | PagerDots:322 | 1.08 | **1.4** | dramatic liquid swell |
| `--pager-goo-layer-opacity` | PagerDots:323 | 0.52 | **0.65** | solid wet neck (still glass) |
| goo `stdDeviation` | PagerDots:245 | 4 | **8** | 2× fringe — fat neck |
| goo threshold | PagerDots:249 | `18 -7` (0.389) | **`16 -5`** (0.313) | softer → fatter, longer-lived |

**UNCHANGED (byte-kept):** the 24px `<button>` hit-targets + role/aria/keyboard/focus-ring (the
interaction layer, a11y INVIOLATE), the 24px goo-dot cell (`flex 0 0 24px`), the ~30px center
pitch, the `--pager-dot-active: var(--foreground)` warm-ink (no gray, no new color token), the
`@supports (filter: url())` gate + plain-worm floor, the PRM block, the
`will-change`/`contain`/`isolation` Safari promotion, the `-50% -50% 200% 200%` filter region +
sRGB interpolation, the two-edge geometry + spring drive + squish wiring, `useLiquidFlex` (the
ONE squish engine), the `--spring-*` curves/clocks in `scheme-motion.css`, the `@property
--worm-t` registration.

---

## ACCEPTANCE CRITERIA (the gestalt verdict — born-FAIL on HEAD)

A FRESH whole-page both-mode `:5199` `/motion/deck` FRAME-SERIES capture of a pager selecting
A→B (NEVER `reducedMotion` for the morph arm), surface-hash floor, BOTH Chromium + WebKit,
desktop + mobile. PASS IFF ALL hold (each maps to a rejected defect):

- **BIG (defect 2 killed).** A resting dot reads ≥ ~10px painted (anchor 13px) — a real dot, not
  a 6px speck. Prominent in the glass pager pill.
- **FAT WORM (defect 1 killed — the DOMINANT).** At the mid-flight peak the worm bbox cross-axis
  reads ≥ ~9px (the girth floor: ≥ 0.72 × 13px), NOT the HEAD 2.45px hairline. The worm body
  carries real liquid mass across the WHOLE stretch.
- **FAT GOO (defect 3 killed).** At the mid-flight frame the worm + the bridged dot read as ONE
  connected silhouette with a FAT, SOLID, WET neck — a pixel-connectivity scan across the gap
  finds a SUBSTANTIAL bridge above the goo threshold (a wider span than HEAD's ~6px; the s=8 /
  0.313-cutoff neck bridges 12–16px). The neck wells up EARLY (worm not yet at the dot) and
  releases LATE.
- **SLOW + WEIGHTY (defect 4-clock).** The frame-series spans the 1.8s clock with MANY distinct
  in-flight frames (not a 2–3-frame flicker). The position curve is NON-MONOTONIC (the
  `--spring-bouncy` overshoot + rebound).
- **DRAMATIC SQUISH (defect 4-squish killed).** The `--stretch` velocity-swell is measurable
  (the worm narrows ≈ 1/1.4 ≈ 0.71× on the cross axis at peak swell, ON TOP of the floored
  geometric pinch); the swell peaks mid-travel + releases at arrival.
- **LIQUID WORM gestalt (the binding judgement).** The indicator reads as a WEIGHTY, DRAMATIC,
  LIQUID WORM that visibly stretches/necks/merges between dots — the iOS-26 "material flowing
  from one shape to another" + the goo-blob metaball. FAR slower + bigger + gooier + heavier
  than the shipped flicker. **Born-FAIL on HEAD; GREEN at close.**
- **PRM-INSTANT (the carve survives).** Under `prefers-reduced-motion: reduce`: a SINGLE discrete
  snap (no stretch frame), the goo layer gone (plain dots, bigger), the color/opacity fade
  survives. The pager still indicates.
- **BOTH ENGINES.** The fat goo renders on WebKit (the `will-change`-promoted re-raster clears
  #184601) OR the `@supports` gate floors to the plain stretching worm (still BIG + SLOW +
  FAT-bodied via the girth floor, just no neck) — EITHER is a PASS; a stale/blank filter frame
  FAILS.

DELTA: `docs/tranches/BD/audit/visual/W-GOO-MORPH-REFINE-DELTA.md` — the
rest→stretch→fat-bridge→contract→overshoot→land frame-series (BIG dots, SLOW clock, FAT
floored-girth worm, FAT neck), before/after vs the shipped thin/fast worm, the PRM single-snap,
both engines, both modes.

---

## GATE IMPACT

`proof:pager-goo` is **ABSENT at HEAD** (verified: no `scripts/proof-pager-goo.mjs`, not
registered in `gates.mjs`, no `tests-visual/pager-goo.spec.ts`). The wave AUTHORS it as a
SOURCE-STRUCTURE arm (asserts SHAPE, not magnitudes) + the binding π. Per the cardinal-lesson
split: the source gate proves the SHAPE survives; the π proves the PAINT (the worm reads
big/slow/fat on fresh pixels).

- **P1 (no layout animation)** — UNCHANGED: every animated channel is `transform`/`scale`/
  `opacity`/`filter`; the bigger dot is a static `width` reserve (a one-time layout solve), the
  elongation a `scale`. The girth floor is just a different `scaleY` value — still
  compositor-only. `proof:no-layout-animation` stays GREEN.
- **P2 (composes `useLiquidFlex`, no re-rolled squish)** — UNCHANGED: B4 only changes the
  `--pager-worm-max-stretch` VALUE the existing `maxStretch` getter reads; the girth floor is in
  the worm's two-edge SHAPING (`useWormMorph.paint`), NOT a second squish ENGINE (no
  hand-rolled `tanh`/reciprocal write — the W-LIQUID single-engine fence holds).
- **P3 (rides `--spring-bouncy` @ its own clock)** — UNCHANGED: B3 keeps
  `--pager-worm-spring: var(--spring-bouncy)`, changes only the `--pager-worm-duration` VALUE
  (still a per-spring clock, not `--spring-dock`/`--duration-normal`). The gate asserts the TOKEN
  reference, NOT the numeric — 1.8s passes.
- **P4 (opaque layer + STATIC filter + `@supports` gate)** — UNCHANGED in SHAPE: C1/C2 change
  `stdDeviation`/`feColorMatrix` VALUES but the filter stays STATIC (never animated — the WebKit
  #184601 trap), shapes stay full-alpha `currentColor`, layer opacity stays
  `--pager-goo-layer-opacity`, the `@supports` gate + plain-worm floor stay. **The gate asserts
  the filter SHAPE (feGaussianBlur + feColorMatrix present, sRGB, STATIC/never-animated,
  `@supports`-gated), NEVER an exact `stdDeviation="8"` / `16 -5` magnitude — the magnitude is
  the design, not the gate.**
- **P5 (PRM snaps + drops goo + keeps fade)** — UNCHANGED: the recipe-local PRM block is
  untouched; bigger dots + fatter goo are all inside the `@supports`/no-PRM path.
- **P6 (landed ONCE in PagerDots; consumers inherit)** — UNCHANGED: every edit is in
  `PagerDots.vue` / `useWormMorph.ts` (the ONE worm home); DeckPager + carousel inherit, no fork.
- **P7 (NEW — the girth floor is the liquid-mass law).** The worm cross-axis pinch is FLOORED
  (`max(GIRTH_FLOOR, 1/√r)`, GIRTH_FLOOR ∈ [0.65, 0.85]) so the worm never self-thins to a
  hairline — the gate asserts the `Math.max(<float>, 1/Math.sqrt(...))` SHAPE in
  `useWormMorph.ts` (a bare `1/Math.sqrt` with no floor REDs — the hairline-thread bite).

**`proof:no-gray` UNAFFECTED** — the worm + dots paint `--pager-dot-active: var(--foreground)`
(warm ink), no `--card`/glass-rung change.

---

## A11Y / PRM / SAFARI RULES (all HELD)

- **a11y INVIOLATE.** The 24px transparent `<button>` hit-targets (WCAG-2.5.5 floor) +
  role/aria/keyboard/focus-ring are BYTE-KEPT — the BIGGER dot is the PAINTED goo layer, a
  separate layer from the interaction targets. A 13px pip in a 24px cell stays inside the cell
  (no clipping; ~5.5px clear margin). The worm + goo layer are `aria-hidden` (presentational).
  The `pattern` aria split + `pagerWindow` windowing + focus-survival unchanged.
- **PRM-carved.** Under `prefers-reduced-motion: reduce`: `useWormMorph.travel` early-returns to
  `snap()` (no stretch frame, `--stretch` stays 1, no rAF, no overshoot); the goo layer is
  `filter: none` (PagerDots:441-443); the color/opacity fade survives. The girth floor is
  irrelevant under PRM (the snap path never calls `paint()`). The bigger rest dot shows the
  bigger static pip — correct.
- **Safari-compatible.** `@property --worm-t` / `feGaussianBlur` / `feColorMatrix` are all
  Safari-Baseline; the filter stays STATIC (only opaque shapes move — the WebKit #184601
  animated-filter trap avoided); `will-change: transform` forces the re-raster; the goo layer is
  `@supports (filter: url(#x))`-gated with the plain transform worm (now BIG + SLOW +
  fat-bodied via the girth floor) as the everywhere floor. The wider blur (s=8) is cheap on a
  ~150px-wide dot row (the perf caveat is for large fills, not a dot strip). SVG primitive attrs
  stay STATIC literals (Safari ignores `var()` in `stdDeviation`).
- **warm-chroma (no gray).** The worm + goo paint `var(--foreground)` (warm-amber, OKLab hue
  62–75). The refine touches GEOMETRY + TIMING + GOO ONLY — NO re-tint, NO new color token, NO
  gray. The `--pager-dot-*` consumer retint seam (`slides` → `--ncsu-red`) byte-kept.

---

## FENCES (the refine MUST NOT break)

1. **NO architectural rewrite.** The two-edge worm + SVG-goo layer is RIGHT — a girth-floor edit
   + a token/filter-constant retune. The mechanism is unchanged.
2. **NO new spring family.** `--spring-bouncy` kept (W-GLASS-CAL); the refine raises
   `--pager-worm-duration` (the worm's OWN clock), never mints a spring.
3. **NO second squish engine.** The squish stays `useLiquidFlex`; raising
   `--pager-worm-max-stretch` is a token bump. The girth floor is the worm's two-edge SHAPING
   (`useWormMorph.paint`), not a second reciprocal write.
4. **NO second goo filter.** The refine retunes the EXISTING `#pager-goo` static
   `stdDeviation`/`feColorMatrix` values (never animated — #184601).
5. **COMPOSITOR-ONLY.** The elongation is `scale` over a reserved footprint; the dot-size bump is
   a one-time layout reserve (not a per-frame layout animation). The girth floor is a different
   `scaleY` — still compositor.
6. **PRM-carved · Safari-compatible · warm-chroma · a11y byte-kept** (above).
7. **Lands ONCE in PagerDots/useWormMorph.** DeckPager + carousel inherit for free (≥2
   consumers). NO DeckPager fork.
