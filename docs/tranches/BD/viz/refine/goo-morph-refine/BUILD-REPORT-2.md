# BUILD-REPORT-2 — goo-morph-refine (iteration 2): the SPEED fix

**Directive:** /motion/deck goo-morph dot is FAR TOO FAST / SMALL / SUBTLE — make it a slow,
weighty, dramatic liquid worm that visibly stretches/necks/merges, FAR slower + bigger + gooier.
**Iteration 1 verdict (JUDGE-1):** FAIL — "still too fast". The cosmetic knobs (size/goo/chroma)
landed and are GOOD, but the SPEED was NOT fixed: the stretch→neck→merge→contract completed in
~150ms then the worm sat static for ~1.3s of the 1.8s clock.

**Iteration 2 result: PASS (live-verified, real Chromium, both modes).** The worm now reads as a
weighty liquid worm with the neck ALIVE for ~1.25s of the 1.8s clock — slow, big, gooey, heavy.

---

## ROOT CAUSE (the JUDGE-1 finding, confirmed analytically)

The worm's speed was owned by the SPRING CURVE, not the duration token. `--pager-worm-spring:
var(--spring-bouncy)` is a `springLinearStops`-generated `linear()`. **The keyframes solver
NORMALIZES every spring curve to its own settle-time, so EVERY spring front-loads** — verified:

```
bouncy   resp=0.5 ζ=0.55 | 50% at  5.3% | 90% at  9.0% of clock
gentle   resp=0.7 ζ=1.0  | 50% at  6.7% | 90% at 15.6% of clock   (even critically-damped!)
crit     resp=1.0 ζ=1.0  | 50% at  6.7% | 90% at 15.6% of clock
```

So `--worm-t` (which drives BOTH position travel AND the stretch via `lenRatio`) completed its
real 0→1 excursion in `1.8s × ~0.14 ≈ 250ms` regardless of which spring. **Swapping the spring
could NOT fix it.** The fix had to (a) drive the geometry off a NON-front-loaded curve and (b)
hold the neck across the whole travel.

---

## WHAT BUILT (3 coupled edits + 1 cleanup)

### EDIT 1 — the worm's OWN slow flow curve (the dominant fix)
**File:** `src/components/custom/pager-dots/PagerDots.vue` (`<style scoped>` `.pager-dots` token
block) + `src/components/custom/pager-dots/useWormMorph.ts` (`travel()`).

- **Replaced** `--pager-worm-spring: var(--spring-bouncy)` **with** `--pager-worm-flow` — a
  hand-authored `linear()` that is the worm's OWN geometry-law curve (NOT a normalized spring):
  rises to ~mid by ~46% of clock, **DWELLS at the midpoint** (the fat neck held open across the
  gap), then contracts with a gentle terminal overshoot (+1.5%, the bouncy LAND), settling to
  exactly 1.0. The flow profile (`smootherstep` rise → mid-dwell → `smootherstep` contract +
  `sin`-bump overshoot) was solved offline + transcribed to a 24-stop `linear()`.
- **`useWormMorph.travel()`** now reads `--pager-worm-flow` (was `--pager-worm-spring`); the
  fallback timing function is `ease-in-out` (was `ease`); the default `durMs` fallback 570 → 1800.

> Why a token-`linear()` not a new SPRING_PRESETS row: the JUDGE sanctioned minting a
> per-mechanism curve, but a SPRING_PRESETS row would be a `springLinearStops` curve — which
> front-loads by construction (the exact defect). The worm needs the OPPOSITE shape (a
> mid-dwell), so it owns its flow curve as a `--pager-*` token (the worm's two-edge SHAPING is
> already its own — `useWormMorph` — beside the `useLiquidFlex` squish engine; W-GLASS-CAL
> fences a RE-TUNE of a shipped spring, not a per-mechanism worm-flow token). The `--spring-*`
> family + `springPresets.ts` are BYTE-UNTOUCHED.

### EDIT 2 — normalize `p` over the FULL travel (the multi-gap fix)
**File:** `src/components/custom/pager-dots/useWormMorph.ts` (`paint()` signature + body).

- `paint()` gains a `toIdx` param; `p = (wormT − fromIdx) / (toIdx − fromIdx)` clamped [0,1]
  (was `|wormT − fromIdx|` clamped [0,1]). The old form reached p=1 the moment `wormT` passed
  `from+1`, so a multi-gap (1→6) worm contracted onto B while still at flow≈0.2 — the JUDGE's
  ~60ms flash. Now a multi-gap necks across the WHOLE span on the same slow flow.
- Call site in `travel()` passes `to`.

### EDIT 3 — the squish floor (JUDGE #3, single-Next swell)
**File:** `src/components/custom/pager-dots/useWormMorph.ts` (`travel()`) + `PagerDots.vue` token.

- `SQUISH_FLOOR = 0.5` floors the geometry-relative travel fraction so even a single Next swells
  to ≥ half the max swell (the raw fraction gave ~1.01 — imperceptible).
- `--pager-worm-max-stretch` 1.4 → 1.45; the `liquidSquish` fallback 1.08 → 1.4.

### CLEANUP — removed pre-existing dead `const absSpan` in `paint()`.

**KEPT from iteration 1 (JUDGE confirmed GOOD):** the girth floor `max(0.72, 1/√r)`, dot size
13px, goo `stdDeviation=8` / `feColorMatrix 16 -5` / `--pager-goo-layer-opacity 0.65`, warm
`--pager-dot-active: var(--foreground)`, the `@supports` gate, the PRM block, the a11y layer.

---

## FILES + LINES

| file | change |
|---|---|
| `src/components/custom/pager-dots/PagerDots.vue` | `.pager-dots` token block: `--pager-worm-flow` (new slow `linear()`, replaces `--pager-worm-spring`), `--pager-worm-duration` comment, `--pager-worm-max-stretch` 1.4→1.45; `traveling`-guard duration fallback 0.57→1.8 |
| `src/components/custom/pager-dots/useWormMorph.ts` | `paint()` `toIdx` param + normalized `p`; `travel()` reads `--pager-worm-flow` + `SQUISH_FLOOR`; `liquidSquish` fallback 1.08→1.4; removed dead `absSpan` |

ONE home (PagerDots/useWormMorph) — DeckPager + carousel inherit, no fork (≥2 consumers).

---

## BEFORE / AFTER (live frame-series, real Chromium)

### SINGLE step (1→2)
| t (ms) | HEAD width×height | iter-2 width×height |
|---|---|---|
| ~100 | 44.3×8.8 (peak, then dead) | 17.5×10.1 (still stretching) |
| ~500 | ~13.9×12.2 (STATIC nub) | 45.1×7.6 (wide fat neck) |
| ~900 | ~13.9×12.2 (STATIC) | **51.9×7.6 (PEAK, mid-clock)** |
| ~1300 | ~13.9×12.2 (STATIC) | 38.3×7.6 (contracting) |
| ~1700 | 13×13 (snap) | 13×13 (landed) |

- **NECK ALIVE (w>25 AND h<11): HEAD ~150ms → iter-2 1258ms** (220ms..1478ms). JUDGE bar ≥700ms.
- **Peak width at: HEAD ~113ms (a flash) → iter-2 853ms (mid-clock).**

### MULTI-gap (1→6)
- HEAD: 212px at t=57ms then frozen 17.3×9.8 for ~1.3s (the "fast flicker").
- iter-2: peak 217px at **903ms** (mid-clock); long worm alive (w>60) **189ms..1474ms = 1285ms**.

### Computed values (live getComputedStyle)
`--pager-dot-size`=0.8125rem(13px) · `--pager-worm-duration`=1.8s (HONORED) ·
worm curve=`--pager-worm-flow` (slow linear) · `--pager-worm-max-stretch`=1.45 ·
goo opacity 0.65 · feGaussianBlur stdDeviation=8 · feColorMatrix=`16 -5`.

---

## TYPECHECK
`npx vue-tsc --noEmit -p tsconfig.json` → **0 errors** (no new TS errors).

## SIBLINGS
`node scripts/verify-siblings-intact.mjs --quiet` → **exit 0** (siblings intact; no foreign-tree
touch — edits ONLY in glass-ui `src/`).

## A11Y / PRM / SAFARI
- **a11y INVIOLATE:** `role="group"` + 6× 24×24px `<button>` hit-targets + `aria-current` +
  `aria-label` + focus-ring + goo layer `aria-hidden="true"` — byte-kept (all edits in the
  presentational worm geometry, not the interaction layer). AA text contrast unaffected.
- **PRM-carved:** confirmed live in the stylesheet — `@media (prefers-reduced-motion: reduce)`
  drops the goo filter (`.pager-goo-layer { filter: none }`) and resets the worm
  (`.goo-worm { scale: 1; transition: none }`); `useWormMorph.travel()` early-returns to a
  discrete `snap()` (no stretch frames). UNTOUCHED.
- **Safari-OK / compositor-only:** the flow curve is a CSS `linear()` on a registered `@property
  --worm-t` (Safari-Baseline); every animated channel is `transform`/`scale`/`opacity`/`filter`
  (no layout property); the SVG filter stays STATIC with literal `stdDeviation`/`feColorMatrix`
  (Safari ignores `var()` in `stdDeviation`); `@supports (filter: url(#x))`-gated with the plain
  transform worm (still BIG + SLOW + fat-bodied via the girth floor) as the floor.
- **Warm-chroma (no gray):** light worm rgb(28,25,23) (R>G>B), dark worm rgb(233,230,226)
  (R>G>B). No re-tint, no new color, no gray. The `--pager-dot-*` consumer retint seam kept.

## SCREENSHOTS
- `after-2-rest-dots-light.png` — six BIG warm dots, discrete at rest (defect-2 killed).
- `after-2-peak-neck-deck-light.png` — peak-neck: fat WET liquid worm bridging dots 1→3 as ONE
  connected metaball (dots 4-6 discrete), light mode.
- `after-2-peak-neck-deck-dark.png` — same, dark mode (luminous warm cream).
- `after-2-worm-midflight-light.png` — full-viewport mid-flight.

DELTA: `docs/tranches/BD/audit/visual/W-GOO-MORPH-REFINE-DELTA.md`.

## VERDICT
The worm reads as a WEIGHTY, DRAMATIC, SLOW LIQUID WORM that visibly stretches/necks/merges
between dots for ~1.25s of the 1.8s clock — FAR slower, bigger, gooier, heavier than the rejected
flicker. The JUDGE-1 root cause (front-loaded spring) is fixed at the lever: the geometry now
rides a slow mid-dwell flow curve over the FULL travel. Born-FAIL on HEAD; GREEN at close.
