# W-PAGER-GOO-MORPH refine — LIVE ROOT-CAUSE (RESEARCH-1)

Surface: `http://localhost:5173/motion/deck` — the `DeckPager` dots (`PagerDots` →
`useWormMorph` → `--worm-t` registered `@property`). Live-inspected via chrome-devtools
on a real Chromium render. All values below are LIVE computed/measured (not source-read).

## TL;DR — the defect is THREE knobs, NOT the clock

The user's "far too FAST" complaint is **mostly already fixed at HEAD** — but the
component still reads fast/subtle for THREE confirmed live reasons. The dominant,
unfixed-at-HEAD defect is **#1 (the worm is a hairline thread, not a fat worm)**.

| Axis | Live value at HEAD | Verdict |
|---|---|---|
| Travel clock | `--pager-worm-duration: 1.3s`, **honored** (single-gap peak at t≈202ms, spring tail settles ~t≈600ms) | duration token already slowed 0.57→1.3s AND it WORKS live; the "too fast" read is now the THINNESS + small dots, not the clock |
| Rest dot size | `--pager-dot-size: 0.375rem` = **6px** | TOO SMALL (user: "dot is FAR too small") |
| Worm cross-axis at peak | **2.45px tall** (36px long) | the core defect — a hairline thread, never a fat liquid worm |
| Goo blur | `feGaussianBlur stdDeviation="4"`, threshold `feColorMatrix 0 0 0 18 -7` | TOO SUBTLE — a steep threshold over a 2.5px-thin neck barely bridges |
| Stretch cap | `--pager-worm-max-stretch: 1.08` | the velocity-swell ceiling is near-1 (live `--stretch` ≈ 1.01-1.03) — adds ~0 fatness |

## What is ALREADY CORRECT live (do NOT re-touch)

- **`@property --worm-t` IS registered** (`property-regs.css:67`, `syntax:"<number>"
  inherits:true initial-value:0`). The CSS `transition: --worm-t 1300ms linear(...)`
  on the rail **genuinely interpolates**. ISOLATED proof: a manual `--worm-t 0→5 @
  1300ms linear` glide reaches half (2.5) at **657ms** and done (5) at **1308ms** —
  the clock is honored to the millisecond. The earlier brief's "0.57s" is STALE; HEAD
  already reads `--pager-worm-duration: 1.3s` (PagerDots.vue:319, a prior safe-blind edit).
- **The two-edge stretch geometry is correct.** Live single-gap (centers 15→45, gap
  30px): peak worm body length = **35.2px ≈ W+gap = 36px** — it genuinely spans BOTH
  dots at the midpoint (`lenRatio` peaks ~5.79–6.0 then contracts to 1.0). The
  STRETCH→MERGE→CONTRACT→SETTLE choreography fires; the spring overshoots to ~1.12
  (`wormT` peaks 1.12) and rings down — the bounce is real.
- **The spring `linear()` is the bouncy register** (`--pager-worm-spring:
  var(--spring-bouncy)`, ~+12.6% overshoot at 14% of clock — confirmed in the live
  curve string).

## ROOT CAUSE #1 (DOMINANT) — the volume-preserving pinch collapses the worm to a thread

`useWormMorph.ts:163` computes the cross-axis as `pinch = 1 / Math.sqrt(lenRatio)`
(written as `scaleY(pinch)` on a horizontal worm, `useWormMorph.ts:169`). At the
single-gap peak this is measured LIVE:

```
lenRatio = 6.0  →  pinch = 1/√6 = 0.408  →  cross-axis = 6px × 0.408 = 2.45px
```

Live `worm.getBoundingClientRect()` at the pinned peak: **{ width: 36px, height: 2.45px }**.

So precisely WHEN the worm stretches to span the gap, its body necks down to a
**2.45px-tall filament**. A 36×2.45 thread, even blurred by stdDev=4, reads as a faint
thin streak — NOT the "weighty, fat, liquid worm that visibly stretches/necks/merges"
the user demands. The volume-preservation law (correct for a SegmentedTabs pill that is
ALREADY wide) is WRONG for a small dot stretching 6×: it eats the entire body. This is
why the goo "merge" reads subtle — there is almost no mass in the neck to merge.

THE FIX (FAR toward fat): break the strict volume-preservation. The cross-axis must
NOT collapse as the worm lengthens — a liquid worm/metaball keeps substantial girth
mid-stretch (think mercury beading: the neck is thinner than the ends but never a
hairline). Concrete directions for the implementer:
  - Floor the pinch HARD: e.g. `pinch = max(GIRTH_FLOOR, 1/sqrt(lenRatio))` with
    `GIRTH_FLOOR ≈ 0.7–0.85` so the cross-axis never drops below ~70–85% of the (bigger)
    rest size. At a 13px rest dot × 0.75 floor → ~10px-tall worm at peak: a FAT worm.
  - OR drop volume-preservation entirely and let the worm cross-axis stay ≈ the (bigger)
    rest dot diameter the whole travel (a constant-girth capsule that just elongates) —
    the metaball goo then supplies the neck-thinning between the worm body and the
    passed dots, which is the ACTUAL "necking" the user wants (mass-to-mass, not a
    self-thinning ribbon).
  - Either way the worm body must carry real mass at peak so the goo filter has
    something fat to merge.

## ROOT CAUSE #2 — the rest dots (and therefore the whole worm) are 6px

`--pager-dot-size: 0.375rem` resolves LIVE to **6px** (the worm rests at this; the
goo-dot `::before` paints 6px; the worm reserved footprint is 6px). User: "make the
DOTS BIGGER". 6px is a documentary micro-pip, not a liquid-glass focal indicator.

THE FIX: lift `--pager-dot-size` to **~11–14px** (brief target; design judgement —
go toward the FAT end, ~12–13px). Because the worm length = W + gap and the cross-axis
is W×pinch, a bigger W fattens BOTH the rest pip AND the worm body in lockstep. KEEP the
24px hit-target cells (`.goo-dot flex 0 0 24px`, `.pager-dot 24px`) — a bigger PAINTED
pip inside the same 24px cell is fine until ~14px (still <24px, no clipping; the WCAG
2.5.5 target floor is the 24px button, untouched). The `--pager-dot-elongated` (1.5rem
= 24px) is a vestigial reference token (no live consumer found driving it — the worm
length is geometry-derived, not this token); it can be lifted for documentation but is
not load-bearing.

NB cross-axis interaction: at a BIGGER W (say 13px) the current pinch still collapses to
13×0.408 = 5.3px — bigger but still thin. #1 and #2 MUST land together: big dots + a
girth floor → a genuinely fat worm.

## ROOT CAUSE #3 — the goo merge is too subtle (thin blur + steep threshold)

`feGaussianBlur stdDeviation="4"` + `feColorMatrix values="… 0 0 0 18 -7"` (live, read
off `#pager-goo`). The threshold `18·α − 7` is steep (alpha must exceed ~0.39 to
survive, then saturates fast) — it produces a CRISP metaball edge, which is good for
fat shapes but starves a thin 2.45px neck: the blurred thread's peak alpha barely clears
the threshold, so the bridge between worm and passed dot is a faint sliver.

THE FIX (fatter goo, thick neck across the whole span):
  - Raise `stdDeviation` to **~7–9** (brief target) so the blur fringe is wide enough to
    bridge the (now bigger) gap and well up a fat neck.
  - LOWER the threshold offset to keep the neck thick: e.g. `0 0 0 ~14 -5` (gentler
    multiplier + smaller subtract) so more of the blurred mid-alpha survives → the neck
    stays FAT across the whole merge rather than pinching to a crisp hairline. The exact
    pair wants a live retune, but the direction is: wider blur + lower/softer threshold
    = thicker, more pronounced merge.
  - This pairs with the 52% layer opacity (`--pager-goo-layer-opacity`, the translucency
    lives once at the layer — KEEP that technique; the threshold operates on the opaque
    pre-opacity shapes, so the opacity does not fight the threshold).

## ROOT CAUSE #4 (minor) — the stretch-velocity swell is near-zero

`--pager-worm-max-stretch: 1.08` is the `useLiquidFlex` velocity-swell CAP. Live
`--stretch` during travel measured **≈ 1.01–1.03** (single gap) — it adds essentially
NO extra fatness on top of the geometric `lenRatio`/`pinch`. This is the LEAST important
knob (the spec intends it as a sub-perceptual gel, and the squish is a SEPARATE swell on
top of the two-edge geometry). It can be lifted modestly (e.g. ~1.15–1.2) for a touch
more weight, but #1/#2/#3 are where the FAR-toward-fat refinement lives. Do not over-
rely on it — the geometry (pinch floor) is the real lever.

## CASCADE PATH (where each knob is authored)

- `--pager-dot-size`, `--pager-dot-elongated`, `--pager-worm-duration`,
  `--pager-worm-max-stretch`, `--pager-goo-layer-opacity`, `--pager-goo-filter`,
  `--pager-worm-spring`: all on `.pager-dots` in `PagerDots.vue` `<style scoped>`
  (lines 308–324). Token-first; a consumer retints by override.
- The goo `feGaussianBlur stdDeviation` + `feColorMatrix values`: hardcoded in the
  inline `<svg><filter id="pager-goo">` in `PagerDots.vue` template (lines 245–249).
  These are NOT tokenized today — consider lifting `stdDeviation` + the threshold to
  `--pager-goo-*` custom props read via `<feGaussianBlur stdDeviation="var(...)" />`?
  NOTE: SVG filter primitive attrs do NOT read CSS `var()` reliably across engines
  (Safari ignores `var()` in `stdDeviation`). Safer: keep the numbers in the static
  filter but pick FAT values; if tokenization is wanted, drive it by swapping the whole
  `--pager-goo-filter: url(#pager-goo-fat)` between two static `<filter>` defs.
- The pinch law `1/sqrt(lenRatio)` + the cross-axis collapse: `useWormMorph.ts:163`
  (`paint()`), with `scaleY(pinch)` at line 169 (horizontal) / `scaleX(pinch)` at 167
  (vertical). THE girth-floor fix lands HERE.

## CONSTRAINTS TO HOLD (north-star + a11y)

- **Compositor-only**: keep all motion on `transform` (translate/scale) + the goo
  filter — NEVER animate width/height (motion-canon P5; the worm reserves its footprint
  once). A girth floor is just a different `scaleY` value — still compositor-only. ✓
- **PRM**: `useWormMorph` early-returns to `snap()` under reduce; the goo layer drops
  (`filter:none`) under reduce (PagerDots.vue:436-448). Keep the snap path; a bigger
  rest dot is fine under PRM (it just shows the bigger static pip). ✓
- **Resting dots stay discrete + a11y**: the 24px `<button>` hit-targets +
  role/aria/focus-ring are BYTE-KEPT (interaction layer). A bigger painted pip stays
  inside the 24px cell — do not exceed ~14px or it crowds the cell. ✓
- **Safari**: the goo filter is SVG `url(#…)` (Safari-safe); the `@supports (filter:
  url())` floor drops to the plain transform worm. A wider stdDeviation + softer
  threshold is still a static filter (the WebKit #184601 animated-filter trap is avoided
  — only opaque SHAPES move, the filter is static). ✓
- **Warm-cream identity**: the goo paints `--pager-dot-active: var(--foreground)` (live
  `rgb(28,25,23)` warm ink) — KEEP; no gray, no new hue.

## RECOMMENDED KNOB TARGETS (for the implementer — design judgement, retune live)

| Token / site | HEAD | → target | rationale |
|---|---|---|---|
| `--pager-dot-size` | 6px (.375rem) | **~12–13px (.75–.8125rem)** | bigger focal dots + fatter worm in lockstep |
| `pinch` law (`useWormMorph.ts:163`) | `1/√lenRatio` (→2.45px peak) | **`max(0.72, 1/√lenRatio)`** (or drop vol-preserve → constant girth) | the worm keeps real mass mid-stretch; THIS is the dominant fix |
| `feGaussianBlur stdDeviation` | 4 | **~8** | wider fringe → fat neck bridges the bigger gap |
| `feColorMatrix` threshold | `0 0 0 18 -7` | **~`0 0 0 14 -5`** | softer threshold keeps the neck thick across the whole span |
| `--pager-worm-max-stretch` | 1.08 | **~1.18** (optional) | a touch more velocity-weight; minor |
| `--pager-worm-duration` | 1.3s | KEEP (already slowed + honored) | the clock is NOT the defect |

The dominant lever is the pinch/girth floor (#1) + bigger dots (#2); the goo fatten
(#3) makes the merge read pronounced. Land all three together — each alone is still
subtle (the user rejected subtle TWICE; go FAR on all three).

## Captures
- `pager-resting.png` — resting rail (full viewport; rail is the 180×24px strip).
- `pager-peak-stretch.png` — worm pinned at peak stretch (36×2.45px thread — the defect).
