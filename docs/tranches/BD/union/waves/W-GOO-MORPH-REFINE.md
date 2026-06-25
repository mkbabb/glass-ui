# BD.W-GOO-MORPH-REFINE — the SLOW, FAT, WEIGHTY liquid goo-morph worm (the `/motion/deck` pager, FAR toward slow+big+gooey+weighty)

**Band: viz/motion (the pager-dot register) · depends: W-PAGER-GOO-MORPH (the shipped worm
mechanism, on disk at HEAD).** This is a MAGNITUDE refine of the landed `useWormMorph` +
`PagerDots.vue` goo-morph worm — the user's SECOND rejection ("too fast / too small / too
subtle"). The mechanism is RIGHT (two-edge stretch→merge→contract worm + SVG-goo metaball); every
DIAL was set to subtle. Build-spec: `docs/tranches/BD/viz/refine/goo-morph-refine/BUILD-SPEC.md`
(the synthesis of the three research passes — root-cause LIVE, target, mechanism).

> **STATUS: IMPLEMENTATION-gated.** Tranche-DEV PLAN doc. The build lands the girth floor +
> seven magnitude retunes + AUTHORS `proof:pager-goo` (absent at HEAD) + the binding π. User-gated.

## The defect / the ask (verbatim, USER-FEEDBACK-2026-06-23)

> "/motion/deck is AWFUL and needs dramatic refinement. The goo-morph dot animation is FAR TOO
> FAST, the dot is FAR TOO SMALL, and the goo + morphing are FAR TOO SUBTLE. It should STRETCH and
> FLOW much MORE SLOWLY — a weighty, dramatic, liquid worm that visibly stretches/necks/merges
> between dots, not a fast subtle flicker. SLOW it down dramatically, make the DOTS BIGGER, make
> the GOO MERGE far more pronounced/fatter, and give it real liquid WEIGHT + flow. Push every knob
> FAR toward slow+big+gooey+weighty."

The SECOND rejection (the builder flagged the small-dot prominence risk; the user confirmed it).
LIVE-inspected on a real Chromium render (research-root-cause), the **dominant unfixed defect is
NOT the clock — it is the volume-preserving pinch collapsing the worm to a 2.45px HAIRLINE thread
at peak stretch** (`useWormMorph.ts:163`, `pinch = 1/√lenRatio` → at `lenRatio≈6` the 6px worm
necks to 2.45px). The "too fast" READ is the thinness + the 6px speck, not the clock (already
slowed 0.57→1.3s and HONORED live to the ms). The fix: a GIRTH FLOOR in `useWormMorph.ts` (the
dominant lever) + coordinated magnitude retunes — go FAR (rejected subtle twice).

## The mechanism — the girth floor + seven coordinated magnitude retunes (NO re-fork, NO new spring, NO second engine)

ALL edits in `src/components/custom/pager-dots/{useWormMorph.ts, PagerDots.vue}` (the ONE worm
home; DeckPager + carousel inherit). ZERO new token, ZERO new recipe, ZERO new spring family.

**The DOMINANT fix — the girth floor (`useWormMorph.ts:163`).** `pinch = 1/Math.sqrt(lenRatio)` →
`const GIRTH_FLOOR = 0.72; pinch = Math.max(GIRTH_FLOOR, 1/Math.sqrt(lenRatio))`. The strict
volume-preservation eats a 6× stretch into a hairline; the floor keeps the worm ≥ ~72% of the
(bigger) rest diameter mid-stretch — a FAT liquid worm where the goo metaball supplies the
mass-to-mass neck, not a self-thinning ribbon. (At 13px body × 0.72 → ~9.4px-tall worm at peak.)

**The coupled magnitude retunes (`PagerDots.vue`):**

| # | site | knob | HEAD | → NEW | axis |
|---|---|---|---|---|---|
| 1 | `.pager-dots:310` | `--pager-dot-size` | 6px | **13px** (0.8125rem) | BIGGER pip + worm body (MASTER) |
| 2 | `.pager-dots:311` | `--pager-dot-elongated` | 24px | **36px** (2.25rem) | documentary span ref |
| 3 | `.pager-dots:319` | `--pager-worm-duration` | 1.3s | **1.8s** | SLOW the flow (weight) |
| 4 | `.pager-dots:318` | `--pager-worm-spring` | `--spring-bouncy` | **KEEP** | the overshoot IS the bounce |
| 5 | `.pager-dots:322` | `--pager-worm-max-stretch` | 1.08 | **1.4** | dramatic liquid swell |
| 6 | `.pager-dots:323` | `--pager-goo-layer-opacity` | 0.52 | **0.65** | solid WET neck (still glass) |
| 7 | `<feGaussianBlur>:245` | `stdDeviation` | 4 | **8** | 2× fringe → bridges 12–16px |
| 8 | `<feColorMatrix>:249` | threshold last row | `18 -7` (0.389) | **`16 -5`** (0.313) | softer → fatter, longer-lived neck |

The dot-size (1) is the MASTER: bigger dot → fatter worm body → wider bridging fringe → the goo
has mass to merge → the slow clock has something to track. The goo neck math (research-mechanism
§1a): s=4/cutoff-0.389 bridges only ~6px (the flicker); s=8/cutoff-0.313 bridges 12–16px (wells
EARLY, holds FAT, releases LATE — the metaball worm). The squish (5) rides `useLiquidFlex`
unchanged (the `maxStretch` getter reads the token live — ONE engine).

## The gate — `proof:pager-goo` (NEW, device-free source gate, born-RED → GREEN — authored at this wave)

`scripts/proof-pager-goo.mjs`, `tags: ["local","ci"]`. ABSENT at HEAD (verified: no script, not
in `gates.mjs`, no spec). A SOURCE-STRUCTURE arm — it asserts the worm's SHAPE + the girth-floor
LAW, **never an exact magnitude literal** (the magnitudes are the design, re-tunable live; the
gate must not couple to `stdDeviation="8"` / `1.8s` / `13px` — research-mechanism §3). Born-RED on
HEAD because the girth floor is ABSENT (the hairline-thread bite reds the bare `1/Math.sqrt`).

- **P1 — compositor-only (no layout animation).** The worm animates ONLY
  `transform`/`scale`/`opacity`/`--worm-t`/`--stretch`; NO animated `width`/`height`/`inline-size`
  on the worm or goo-dots. The detector scans `useWormMorph.ts` + the `.goo-worm`/`.pager-goo-*`
  scoped CSS for an animated layout property (a `transition`/`@keyframes`/`requestAnimationFrame`
  write touching `style.width`/`style.height` REDs). RED-bite: a planted `worm.style.width = …`
  per-frame write.
- **P2 — composes `useLiquidFlex`, no re-rolled squish.** `useWormMorph.ts` IMPORTS + composes
  `useLiquidFlex` (the ONE squish engine); the squish cap reads `--pager-worm-max-stretch` LIVE
  via the `maxStretch` getter. NO hand-rolled `1+tanh`/second reciprocal `--stretch` writer
  outside `useLiquidFlex`. RED-bite: a planted local `Math.tanh`-based stretch computation.
- **P3 — rides `--spring-bouncy` @ its OWN clock.** `--pager-worm-spring: var(--spring-bouncy)`
  (the TOKEN reference, NOT a new `linear()` literal — a minted spring REDs); `--pager-worm-
  duration` is the worm's OWN token (NOT `var(--spring-bouncy-duration)` / `--duration-normal` /
  `--spring-dock`). The gate asserts the TOKEN REFERENCE — any numeric duration value passes
  (1.3s, 1.8s, 2.0s all green; the design walks). RED-bite: `--pager-worm-spring` re-pointed to a
  non-`--spring-*` literal, OR `--pager-worm-duration: var(--spring-bouncy-duration)` (the
  re-coupled-clock bite).
- **P4 — the OPAQUE goo layer + STATIC filter + `@supports`-gate + plain-worm floor.** The
  `#pager-goo` filter has `feGaussianBlur` + `feColorMatrix` present, `color-interpolation-
  filters="sRGB"`, and is STATIC (never a `transition`/`@keyframes`/JS write touching
  `stdDeviation`/`feColorMatrix` — the WebKit #184601 trap); every shape inside is full-alpha
  `currentColor` (the translucency lives ONCE at `--pager-goo-layer-opacity`); the goo layer is
  `@supports (filter: url(#…))`-gated with the plain-worm floor (`@supports not …{ filter: none }`).
  **The gate asserts the filter SHAPE — feGaussianBlur+feColorMatrix present, sRGB, STATIC,
  @supports-gated — NEVER an exact `stdDeviation`/`values` magnitude** (the cardinal anti-coupling).
  RED-bite: a per-shape `opacity:0.5` smuggled INTO a filter shape (breaks the alpha threshold),
  OR an animated `stdDeviation` (the #184601 bite), OR a missing `@supports` gate.
- **P5 — PRM snaps + drops goo + keeps fade.** `useWormMorph.travel` early-returns to `snap()`
  under `prefers-reduced-motion: reduce` (no stretch frame, `--stretch` → 1, no rAF); the scoped
  `@media (prefers-reduced-motion: reduce)` block sets `.pager-goo-layer { filter: none }` +
  `.goo-worm { scale: 1 1; transition: none }`. The dots' fade survives (no `display:none` on the
  pips). RED-bite: the PRM early-return removed from `travel`, OR the PRM `filter:none` block deleted.
- **P6 — landed ONCE in PagerDots/useWormMorph (consumers inherit).** Every worm token + the goo
  filter + the girth floor live in `src/components/custom/pager-dots/{PagerDots.vue,
  useWormMorph.ts}` ONLY; NO `--pager-worm-*` / `--pager-goo-*` / girth-floor fork in `DeckPager`,
  the carousel, or any consumer SFC. RED-bite: a planted `--pager-worm-duration` override in a
  consumer (the fork bite).
- **P7 — the GIRTH FLOOR is the liquid-mass law (the DOMINANT-defect arm, born-RED).** The worm
  cross-axis pinch is FLOORED: `useWormMorph.ts` `paint()` computes
  `pinch = Math.max(<float ∈ [0.65,0.85]>, 1/Math.sqrt(lenRatio))` — a bare `1/Math.sqrt(lenRatio)`
  with NO `Math.max(<floor>, …)` REDs (the hairline-thread bite — the worm self-thins to a
  2.45px filament, the rejected-twice subtle read). The gate PARSES the `pinch =` expression (not
  a name-presence): the `Math.max(<numeric-floor>, 1/Math.sqrt(...))` SHAPE present, the floor in
  the [0.65, 0.85] band (a floor < 0.65 is still too thin → a "too-low girth floor" RED; a floor
  ≥ 0.95 erases the taper into a rigid capsule → a "no-taper" RED). **RED at HEAD** (the bare
  `1/Math.sqrt` lives at `useWormMorph.ts:163`).

**Self-test bites (each planted defect MUST red, exported pure detector):**
- (a) the bare `pinch = 1/Math.sqrt(lenRatio)` (HEAD) → P7 RED (hairline-thread).
- (b) `pinch = Math.max(0.4, 1/Math.sqrt(lenRatio))` (floor too low, still thin) → P7 RED.
- (c) an animated `stdDeviation` (`<animate attributeName="stdDeviation">`) → P4 RED (#184601).
- (d) a per-shape `opacity` inside a goo filter shape → P4 RED (alpha-threshold break).
- (e) `--pager-worm-duration: var(--spring-bouncy-duration)` → P3 RED (re-coupled clock).
- (f) a `--pager-worm-*` override in `DeckPager.vue` → P6 RED (the fork bite).
- (g) the PRM early-return deleted from `travel` → P5 RED.

**What reds on the pre-fix tree:** P7 (the girth floor is absent — the DOMINANT born-RED). P1–P6
are GREEN at HEAD by construction (the shipped worm already has the right SHAPE); P7 is the one
born-RED clause + the binding π carries the rest of the truth. GREEN only after the girth floor
lands.

> **Why P7 is the born-RED anchor, not a magnitude clause:** the magnitudes (1.8s, 13px, s=8) are
> DESIGN — the π is the binding truth for them (a source gate that asserts `13px` would couple to
> the design + red on any live retune). The GIRTH FLOOR is a STRUCTURAL law (the worm must never
> self-thin to a thread — the dominant defect), so it is a legitimate SHAPE assertion + the
> born-RED arm. The cardinal split: P7 proves the worm CAN be fat; the π proves it READS fat.

## The binding π — `tests-visual/pager-goo.spec.ts` (NEW — the close truth)

VISUAL wave → a `proof:ba-gestalt` navigation-band verdict (the pager-dot row) + a captured DELTA,
BOTH modes, Chromium + WebKit, desktop + mobile, LIVE MOTION (NEVER `reducedMotion` for the morph
arm), surface-hash freshness floor on `PagerDots.vue`. NO source-green close — the magnitude change
is a PAINT change; the π re-baselines to the FAR magnitudes. Born-FAIL on HEAD (the small/fast/thin
worm is the rejected read).

- **BIG (defect SMALL killed).** A pixel-width scan of a resting goo-dot pip reads ≥ ~10px painted
  (anchor 13px), STRICTLY bigger than the HEAD 6px speck.
- **FAT WORM (defect THIN killed — DOMINANT).** At the mid-flight peak frame the worm
  `getBoundingClientRect()` cross-axis reads ≥ ~9px (the girth floor ≥ 0.72 × 13px), NOT the HEAD
  2.45px hairline. The worm carries real mass across the WHOLE stretch (a cross-axis scan at
  several in-flight frames stays ≥ the floor).
- **FAT GOO (defect SUBTLE-GOO killed).** At the mid-flight frame a pixel-connectivity scan across
  the worm→next-dot gap finds ONE connected silhouette with a SOLID neck above the goo threshold
  spanning a WIDER gap than HEAD (the s=8 / 0.313-cutoff neck bridges 12–16px vs HEAD's ~6px). The
  neck wells up EARLY (the worm not yet at the dot) and releases LATE.
- **SLOW + WEIGHTY (defect FAST killed).** The frame-series spans the 1.8s clock with MANY distinct
  in-flight frames (not a 2–3-frame flicker); the worm-CENTER position curve over the clock is
  NON-MONOTONIC (the `--spring-bouncy` +12.6% overshoot + rebound — the weight reads).
- **DRAMATIC SQUISH (defect TIMID-SQUISH killed).** The cross-axis pinch is measurable: the worm
  narrows ≈ 1/1.4 ≈ 0.71× on the cross axis at peak swell (ON TOP of the floored geometric pinch);
  the swell peaks mid-travel + releases at arrival.
- **LIQUID WORM gestalt (the binding judgement).** The indicator reads as a WEIGHTY, DRAMATIC,
  LIQUID WORM that visibly stretches/necks/merges between dots — the iOS-26 "material flowing from
  one shape to another" + the goo-blob metaball, FAR slower+bigger+gooier+heavier than the shipped
  flicker. Born-FAIL on HEAD; GREEN at close; W-REFLECT re-confirms on fresh pixels.
- **PRM-INSTANT (the carve survives).** Under `prefers-reduced-motion: reduce`: a SINGLE discrete
  active-change snap (no stretch frame), the goo layer gone (plain bigger dots), the fade survives.
- **BOTH ENGINES (the cross-engine floor).** The fat goo renders on WebKit (the `will-change`
  re-raster clears #184601) OR the `@supports` gate floors to the plain stretching worm (still BIG
  + SLOW + FAT-bodied via the girth floor, no neck) — EITHER PASSES; a stale/blank filter frame
  FAILS. The WebKit project is LOAD-BEARING.

DELTA: `docs/tranches/BD/audit/visual/W-GOO-MORPH-REFINE-DELTA.md` — the
rest→stretch→fat-bridge→contract→overshoot→land frame-series, before/after vs the shipped
thin/fast worm, the PRM single-snap, both engines, both modes.

## The gestalt row

**Union-roster surface: the `/motion/deck` pager-dot register (the goo-morph worm).** Verdict
requirement: a FRESH both-mode `:5199` `/motion/deck` capture (+ the webkit project), surface-hash
freshness floor. The gestalt judgement: the dot indicator reads as a WEIGHTY DRAMATIC LIQUID WORM
that visibly stretches/necks/merges between dots (the iOS-26 material-flow + goo-blob metaball) —
BIG dots, SLOW weighty clock, FAT floored-girth worm body, FAT pronounced goo neck. Born-FAIL on
HEAD (the small/fast/thin/subtle worm is the rejected read). GREEN at its OWN close; W-REFLECT
re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **NO architectural rewrite** — the two-edge worm + SVG-goo layer is RIGHT; a girth-floor edit +
  a token/filter-constant retune. The mechanism (research-google-worm) is unchanged law.
- **NO new spring family** — `--spring-bouncy` kept (W-GLASS-CAL); the refine raises
  `--pager-worm-duration` (the worm's OWN clock). P3 green.
- **NO second squish engine** — `useLiquidFlex` kept (W-LIQUID single-engine); the squish cap is a
  token bump; the girth floor is the worm's two-edge SHAPING, not a second reciprocal write. P2 green.
- **NO second goo filter** — the EXISTING `#pager-goo` static `stdDeviation`/`feColorMatrix` values
  retune; never animated (#184601). P4 green.
- **COMPOSITOR-ONLY** — `scale`/`translate`/`filter` only; the dot-size bump is a one-time layout
  reserve. `proof:no-layout-animation` + P1 green.
- **PRM-carved** — the worm snaps, `--stretch` stays 1, the goo layer drops, the fade survives. P5 green.
- **Safari-compatible** — `@property`/`feGaussianBlur`/`feColorMatrix` Baseline; the filter STATIC;
  `will-change` forces the re-raster; `@supports`-gated with the plain-worm floor. The girth-floored
  worm is the everywhere floor even where the goo `@supports` gate fails.
- **WARM-CHROMA (no gray)** — the worm + goo paint `var(--foreground)` (warm-amber, OKLab hue
  62–75); NO re-tint, NO new color token. The `--pager-dot-*` retint seam (`slides` → `--ncsu-red`)
  byte-kept.
- **a11y byte-kept** — the 24px `<button>` hit-targets + role/aria/keyboard/focus-ring + windowing
  + focus-survival unchanged; the BIGGER dot is the PAINTED layer, not the hit target.
- **Lands ONCE in PagerDots/useWormMorph** — DeckPager + carousel inherit (≥2 consumers). P6 green.

## Disposition links

- **W-PAGER-GOO-MORPH (the shipped worm, on disk at HEAD)** → CONSUMED + REFINED (the mechanism is
  correct; the dials were subtle). This wave does NOT re-author the worm — it floors the girth +
  retunes the magnitudes + authors the (absent) `proof:pager-goo` gate + the binding π.
- **`proof:pager-goo`** → AUTHORED at this wave (absent at HEAD). P7 (the girth floor) is the
  born-RED anchor; P1–P6 are SHAPE-green by construction; the π is the binding paint truth.
- **The README row** (`src/components/custom/pager-dots/README.md:56`) → the `--pager-dot-elongated`
  / `--pager-dot-size` rows update to the new defaults (documentary).
- **The MIGRATION** — none. Every edit is a magnitude/girth-floor change on the EXISTING surface; no
  public-prop change, no token rename, no breaking change. A consumer wanting a calm pager re-points
  `--pager-worm-duration`/`--pager-dot-size` (presets-in-consumers; the library default is now the
  dramatic liquid worm the user asked for).
