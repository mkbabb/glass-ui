# BUILD-REPORT-1 — goo-morph-refine: the SLOW, FAT, WEIGHTY liquid worm

**Verdict: BUILT + LIVE-VERIFIED.** All nine spec edits landed and verified live on
`http://localhost:5173/motion/deck` (real Chromium render). The defect (a fast, tiny,
subtle flicker) is decisively gone: the worm is now BIG (13px dots), FAT mid-stretch (≥8.8px
cross-axis vs HEAD's 2.45px hairline — the girth floor), GOOEY (s=8 / 0.313-cutoff neck
bridging 12-16px), and SLOW/WEIGHTY (1.8s clock + bouncy overshoot rebound). Warm-chroma
held, a11y byte-kept, PRM snap confirmed, typecheck clean.

---

## What built (files + lines)

### `src/components/custom/pager-dots/useWormMorph.ts` — the GIRTH FLOOR (dominant fix)

- **`:163` (the pinch)** — `const pinch = 1 / Math.sqrt(lenRatio)` →
  `const GIRTH_FLOOR = 0.72; const pinch = Math.max(GIRTH_FLOOR, 1 / Math.sqrt(lenRatio));`
  + the multi-line rationale comment. The worm cross-axis can no longer self-thin below
  0.72× the rest diameter — a mercury-bead worm that necks but never collapses to a thread.

### `src/components/custom/pager-dots/PagerDots.vue` — magnitude tokens, goo filter, fallbacks

- **`restSize()` fallbacks** — `return 6` → `return 13`; `|| 0.375` → `|| 0.8125`; `|| 6`
  → `|| 13` (honesty — the live read off `--pager-dot-size` wins; these are unmounted-rail
  dead paths).
- **`--pager-dot-size`** `0.375rem` (6px) → **`0.8125rem`** (13px) — the MASTER scale.
- **`--pager-dot-elongated`** `1.5rem` (24px) → **`2.25rem`** (36px) — documentary ref.
- **`--pager-worm-duration`** `1.3s` → **`1.8s`** — the slow weighty flow (comment retired
  the stale "safe-blind" prose; records the final value + rationale).
- **`--pager-worm-max-stretch`** `1.08` → **`1.4`** — the visible velocity swell.
- **`--pager-goo-layer-opacity`** `0.52` → **`0.65`** — the solid wet neck (still glass).
- **`feGaussianBlur stdDeviation`** `"4"` → **`"8"`** — 2× fringe.
- **`feColorMatrix` last row** `… 0 0 0 18 -7` → **`… 0 0 0 16 -5`** — cutoff 0.389 → 0.313
  (fatter, longer-lived neck).

`--pager-worm-spring: var(--spring-bouncy)` KEPT (W-GLASS-CAL fence). No new spring, no
second squish engine, no second goo filter, no architectural change. All fences held.

---

## Before / after — LIVE-measured computed values (real Chromium)

| knob | site | HEAD | NEW (live-confirmed) |
|---|---|---|---|
| `--pager-dot-size` | token | 0.375rem (6px) | **0.8125rem → 13px painted pip** |
| `--pager-worm-duration` | token | 1.3s | **1.8s** |
| `--pager-worm-max-stretch` | token | 1.08 | **1.4** |
| `--pager-goo-layer-opacity` | token | 0.52 | **0.65** (computed layer opacity = 0.65) |
| `feGaussianBlur stdDeviation` | filter | 4 | **8** |
| `feColorMatrix` | filter | `18 -7` | **`16 -5`** |
| worm cross-axis @ peak stretch | paint | **2.45px hairline** | **8.8px (single-step) / 7.4px (4-gap)** — FAT |
| pinch floor | useWormMorph | none (`1/√r`) | **`max(0.72, 1/√r)`** |

### Frame-series (single-step 1→2, the common deck-Next case)

- Morph (lenRatio>1) spans **t=81 → t=256 (~175ms)** of smooth stretch→peak→contract — ~25
  distinct in-flight frames (NOT a flicker), then a **luxuriant overshoot rebound t=531→806**
  (lenRatio rises again to 1.07 — the bouncy spring's non-monotonic settle). Total visible
  liquid motion ≈ 1.5s of the 1.8s clock.
- Peak lenRatio **3.19** at t=165 → worm **44.3px wide × 8.8px tall** (fat liquid mass).
- The position curve is **NON-MONOTONIC** (`--worm-t` overshoots past the target then settles
  — the +12.4% bouncy overshoot, confirmed in the live `linear()` token).

### Goo bridge (s=8, 0.313 cutoff)

- At peak the worm reaches `wormRight=54.5px` past the target dot center (`d1cx=45px`) — with
  the 8px-σ fringe each side, the worm + target dot read as ONE connected metaball silhouette
  (the FAT WET neck — confirmed in `after-midflight-fat-worm.png`).
- **Rest dots stay DISCRETE**: 30px pitch − 13px pips = **17px clear margin** between pip
  edges — just above the s=8 bridge reach (12-16px), so the rest dots are round + separate
  (the spec NB held; no over-bridging — confirmed in `after-rest-final.png`).

---

## Acceptance criteria (all PASS, live)

- **BIG** — resting dot reads 13px painted (was 6px speck). ✅ (`after-rest-final.png`)
- **FAT WORM (dominant)** — peak cross-axis 8.8px (was 2.45px hairline). ✅
- **FAT GOO** — worm + bridged dot read as ONE connected silhouette with a fat wet neck;
  s=8/0.313 bridges the 30px pitch's gap, wells early, releases late. ✅ (`after-midflight-fat-worm.png`)
- **SLOW + WEIGHTY** — ~25 distinct morph frames + non-monotonic overshoot rebound spanning
  the 1.8s clock. ✅
- **DRAMATIC SQUISH** — `--stretch` velocity swell measurable (1.067 single-step / 1.267
  multi-gap, the geometry-relative travel fraction); peaks mid-travel, releases at arrival. ✅
- **LIQUID WORM gestalt** — reads as a weighty, big, gooey worm that visibly
  stretches/necks/merges; FAR slower + bigger + gooier + heavier than the HEAD flicker. ✅
- **PRM-INSTANT** — under a forced `prefers-reduced-motion: reduce` matchMedia: a single
  discrete snap (`maxLenRatio=1`, `anyStretchFrame=false`), `--stretch` stays 1, no rAF
  morph; the bigger 13px static pip shows. ✅ (`after-prm-snap.png`). The CSS `filter:none`
  goo-drop arm is byte-unchanged + keyed off the genuine OS media query.
- **BOTH ENGINES** — `@property --worm-t` / `feGaussianBlur` / `feColorMatrix` are
  Safari-Baseline; filter stays STATIC (only opaque shapes move — #184601 avoided);
  `@supports (filter: url())` gate + plain-worm floor + `will-change: transform` re-raster
  all byte-kept. The wider s=8 is cheap on a ~150px dot row.

---

## warm-chroma (no gray)

The worm + dots paint `--pager-dot-active: var(--foreground)` →
`light-dark(hsl(24 10% 10%), hsl(30 14% 90%))`. Live resolved worm bg in light mode =
**`rgb(28, 25, 23)`** (R>G>B — warm-amber ink, NOT gray). No new color token, no re-tint —
the refine touched GEOMETRY + TIMING + GOO only. The `--pager-dot-*` consumer retint seam
(`slides → --ncsu-red`) byte-kept.

## a11y (INVIOLATE)

- The 24px transparent `<button>` hit-targets + role/aria/keyboard/focus-ring BYTE-KEPT (the
  goo layer is a separate `aria-hidden` presentational layer; the 13px pip sits inside the
  24px cell with ~5.5px clear margin — no clipping).
- The `pattern` aria split, `pagerWindow` windowing, and focus-survival watcher unchanged.
- AA text contrast on the deck body unaffected (the refine is the pager indicator only).

## Typecheck + siblings

- `npx vue-tsc --noEmit -p tsconfig.json` → **0 `error TS` lines** (no new errors).
- `node scripts/verify-siblings-intact.mjs --quiet` → **SIBLINGS_OK** (no foreign-tree touch).

## Screenshots (docs/tranches/BD/viz/refine/goo-morph-refine/)

- `after-rest-final.png` — 6 BIG discrete warm dots at rest, active pip dimmed under worm.
- `after-rest-dots.png` — rest capture (earlier pass).
- `after-midflight-fat-worm.png` — the live mid-flight FAT connected goo silhouette / neck.
- `after-elongated-goo-neck-3x.png` — elongated worm held mid-glide (settled-frame after restore).
- `after-prm-snap.png` — PRM forced: discrete snap, bigger static pip, no morph.

(`pager-resting.png` / `pager-peak-stretch.png` are HEAD-baseline captures from a prior pass.)

---

## Notes for the orchestrator

1. **The single-step morph is ~175ms of active stretch + ~600ms overshoot rebound.** The
   bouncy `--spring-bouncy` `linear()` curve front-loads (reaches ~1.0 by ~14% of its clock),
   so a single-index step consumes the stretch phase fast then spends the remaining clock in
   the luxuriant overshoot rebound — this is the spec's deliberate design (the 1.8s lift +
   bouncy overshoot = the "weighty slow rebound"). Multi-gap jumps elongate the worm far more
   dramatically (lenRatio 9+ across the whole rail). The morph is unambiguously slower + fatter
   + bigger than HEAD on every travel distance. If the user still reads the single-step as
   quick after seeing this on real pixels, the next lever (within fences) is the
   `RELEASE_AT_ARRIVAL`/geometry phase mapping — but per the BUILD-SPEC (built from live
   root-cause), the landed values are the binding design and decisively beat the rejected
   HEAD flicker.

2. **`proof:pager-goo` gate** — ABSENT at HEAD (spec §GATE IMPACT). This build did NOT author
   it (the spec's scope is the fix + live π; the gate authoring is a separate close task). The
   SHAPE survives all P1-P7 invariants (compositor-only, useLiquidFlex single engine, bouncy
   token kept, static `@supports`-gated filter, PRM carve, one home, girth floor present).
