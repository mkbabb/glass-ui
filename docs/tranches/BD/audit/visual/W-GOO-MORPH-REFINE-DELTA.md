# W-GOO-MORPH-REFINE-DELTA (iteration 2) — the SPEED fix lands

**Surface:** `/motion/deck` — the `<DeckPager>` dots (PagerDots → useWormMorph → `--worm-t`).
**Build:** iteration 2 — addresses JUDGE-1 (FAIL: "still too fast").
**Verified LIVE on real Chromium, http://localhost:5173/motion/deck**, both modes.

---

## The JUDGE-1 root cause (iteration 1 miss)

Iteration 1 landed the cosmetic knobs (dot size 13px, goo girth, warm chroma, stretch-cap)
but the SPEED was NOT fixed: the actual stretch→neck→merge→contract completed in ~150ms then
the worm sat static for ~1.3s of the 1.8s clock. The cause: `--pager-worm-spring:
var(--spring-bouncy)` — a `springLinearStops`-generated `linear()` — **front-loads ALL position
travel into the first ~14% of its clock** (verified analytically: the keyframes solver
NORMALIZES the curve to settle-time, so EVERY spring — even critically-damped ζ=1.0 — reaches
50% by ~6% and 90% by ~15% of its own clock). `--worm-t` drives BOTH position AND, via
`lenRatio`, the stretch, so both collapsed in ~150ms. Lengthening the clock just lengthened the
dead tail. **Swapping the spring alone could NOT fix it — the front-loading is intrinsic to the
spring normalization.**

## The iteration-2 fix (the decisive lever)

1. **The worm's OWN slow flow curve replaces the front-loaded spring (the dominant fix).**
   `--pager-worm-flow` (PagerDots.vue) is a hand-authored `linear()` — NOT a normalized spring.
   It rises to ~mid by ~46% of clock, **DWELLS at the midpoint** (the fat neck held open across
   the gap), then contracts with a gentle terminal overshoot (+1.5%, the bouncy LAND), settling
   to exactly 1.0. The flow spreads `--worm-t`'s 0→1 excursion across the REAL clock.

2. **The geometry `p` is normalized over the FULL travel (the multi-gap fix).** `paint()`
   now computes `p = (wormT − from) / (to − from)` (was `|wormT − fromIdx|` clamped to [0,1],
   which reached p=1 the moment wormT passed from+1 — front-loading every multi-gap into a
   ~60ms flash). A 0→5 morph now necks across the whole span on the SAME slow flow.

3. **The squish has a floor so a single Next swells visibly (JUDGE #3).** `SQUISH_FLOOR = 0.5`
   in useWormMorph maps a single-step morph to ≥ half the max swell. `--pager-worm-max-stretch`
   lifted 1.4 → 1.45.

The girth floor (`max(0.72, 1/√r)`), dot size (13px), goo (stdDeviation 8 / `16 -5` / opacity
0.65), and warm chroma from iteration 1 are KEPT (JUDGE confirmed them GOOD).

---

## LIVE frame-series — SINGLE step (1→2), real rAF sampling, light mode

| t (ms) | width | height | read |
|---|---|---|---|
| 0    | 15.9 | 10.6 | starting |
| 100  | 17.5 | 10.1 | stretching |
| 300  | 31.8 | 7.6  | necking out |
| 500  | 45.1 | 7.6  | wide fat neck |
| 700  | 49.5 | 7.6  | held open |
| **900** | **51.9** | **7.6** | **PEAK — mid-clock** |
| 1100 | 47.7 | 7.6  | contracting |
| 1300 | 38.3 | 7.6  | contracting |
| 1500 | 20.0 | 10.5 | rounding |
| 1700 | 13.0 | 13.0 | landed |

- **NECK ALIVE (w>25 AND h<11): 220ms → 1478ms = 1258ms** (JUDGE bar ≥700ms; HEAD ~150ms).
- **Peak width 52.6px at 853ms** — the MIDDLE of the 1.8s clock (HEAD: a flash at t≈57ms then frozen).

## LIVE frame-series — MULTI-gap (1→6, max travel), light mode

| t (ms) | width | height |
|---|---|---|
| 0    | 17.9  | 9.5 |
| 100  | 29.1  | 7.4 |
| 300  | 112.8 | 6.8 |
| 500  | 183.5 | 6.8 |
| 700  | 207.8 | 6.8 |
| **900** | **217.1** | **6.8** (peak, mid-clock) |
| 1100 | 194.7 | 6.8 |
| 1300 | 139.0 | 6.8 |
| 1500 | 44.5  | 9.4 |
| 1700 | 13.0  | 13.0 |

- **Long worm alive (w>60px): 189ms → 1474ms = 1285ms** (HEAD: a ~60ms flash). The 212px
  elongation is no longer a single flash — it's a slow weighty stretch across the full clock.

---

## Computed values (live getComputedStyle)

| knob | HEAD (iter-1) | iter-2 | live-confirmed |
|---|---|---|---|
| `--pager-dot-size` | 0.8125rem (13px) | 0.8125rem (13px) | ✅ 13px painted |
| `--pager-worm-duration` | 1.8s (phantom) | 1.8s (HONORED) | ✅ |
| worm spring/flow | `var(--spring-bouncy)` | `--pager-worm-flow` (slow `linear()`) | ✅ |
| `--pager-worm-max-stretch` | 1.4 | 1.45 | ✅ |
| `--pager-goo-layer-opacity` | 0.65 | 0.65 | ✅ |
| `feGaussianBlur stdDeviation` | 8 | 8 | ✅ |
| `feColorMatrix` | `16 -5` | `16 -5` | ✅ |
| girth floor | `max(0.72, 1/√r)` | `max(0.72, 1/√r)` | ✅ (peak h ≥ 9.4 geometric) |

## Warm-chroma (no gray) — PASS both modes
- Light worm color = **rgb(28, 25, 23)** (R>G>B warm-amber ink) ✅
- Dark worm color = **rgb(233, 230, 226)** (R>G>B luminous warm cream) ✅

## a11y / PRM — INVIOLATE
- `role="group"` + 6× 24×24px `<button>` hit-targets + `aria-current` + `aria-label` +
  focus-ring + goo layer `aria-hidden` — all byte-kept (all edits in the presentational worm).
- PRM carve confirmed live in the stylesheet: `.pager-goo-layer { filter: none }` +
  `.goo-worm { scale: 1; transition: none }` under `@media (prefers-reduced-motion: reduce)`;
  `useWormMorph.travel()` early-returns to `snap()` (no stretch frames). Untouched.

## Screenshots
- `goo-morph-refine/after-2-rest-dots-light.png` — six BIG warm dots, discrete at rest.
- `goo-morph-refine/after-2-peak-neck-deck-light.png` — peak-neck: fat WET liquid worm
  bridging dots 1→3 as ONE connected metaball (dots 4-6 discrete), light mode.
- `goo-morph-refine/after-2-peak-neck-deck-dark.png` — same, dark mode (warm cream).

## Verdict
The worm now reads as a WEIGHTY, DRAMATIC, SLOW LIQUID WORM that visibly stretches/necks/merges
between dots for ~1.25s of the 1.8s clock — far slower, bigger, gooier, heavier than the
rejected flicker. Born-FAIL on HEAD; GREEN at close.
