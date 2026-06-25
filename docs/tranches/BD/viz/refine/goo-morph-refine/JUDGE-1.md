# JUDGE-1 — goo-morph-refine: VERDICT = FAIL (still too fast)

**Bar:** does the fix DECISIVELY meet "SLOW it down dramatically... a weighty, dramatic,
liquid worm that visibly stretches/necks/merges between dots, not a fast subtle flicker"?

**Verdict: NO.** The static/cosmetic knobs (dot size, goo girth, warm chroma) landed and are
good. But the CORE complaint — the SPEED — is NOT fixed. The actual liquid
stretch→neck→merge→contract motion completes in **~60–200ms**, then the worm sits essentially
static for the remaining **~1.6s** of the 1.8s clock. The 1.8s `--pager-worm-duration` is a
phantom: the bouncy spring front-loads all position travel into the first ~14% of the clock,
so the worm reaches its target and de-elongates almost immediately and the rest of the clock
is a sub-pixel jiggle. This is the "fast subtle flicker" the user rejected — only bigger.

The build report's own §Note 1 flagged this exact risk and deferred it. The user has now
explicitly rejected it.

---

## LIVE evidence (real Chromium, http://localhost:5173/motion/deck)

### Tokens / filter — ALL match the build report (confirmed)
- `--pager-dot-size` = **0.8125rem** → resting pip painted **13×13** ✅
- `--pager-worm-duration` = **1.8s** ✅ (but see motion below — it does NOT govern the stretch)
- `--pager-worm-max-stretch` = **1.4** ✅
- `--pager-goo-layer-opacity` = **0.65** ✅
- `feGaussianBlur stdDeviation` = **8** ✅
- `feColorMatrix` = `… 16 -5` ✅
- `--pager-worm-spring` = `var(--spring-bouncy)` (the `linear()` reaches ~1.09 by **12.2%**,
  settles to ~1.0 by **~24%** of its clock)

### Warm-chroma (no gray) — PASS both modes
- Light worm bg = **rgb(28, 25, 23)** (R>G>B warm-amber ink) ✅
- Dark worm bg = **rgb(233, 230, 226)** (R>G>B luminous warm cream) ✅
- Color is NOT the defect. The geometry/timing is.

### MOTION — the FAIL (frame-series, real rAF sampling)

**Single-step (1→2):**
| t (ms) | width | height | read |
|---|---|---|---|
| 0 | 13.0 | 13.0 | round rest |
| 46 | 18.6 | 10.5 | stretching |
| 96 | 36.6 | 8.8 | **peak neck** |
| 113 | 44.3 | 8.8 | peak width |
| 146 | 33.1 | 8.8 | contracting |
| 196 | 16.5 | 11.2 | nearly round again |
| 246–1446 | ~13.9 | ~12.2 | **STATIC** (sub-pixel overshoot jiggle, imperceptible) |
| 1496+ | 13.0 | 13.0 | snap to rest |

→ The visible stretch/neck/merge lives in **t≈0–200ms**. The other **~1.3s** is a motionless
13.9×12.2 nub. The clock got longer; the *motion* did not slow.

**Multi-gap (1→6, max travel):**
| t (ms) | width | height |
|---|---|---|
| 0 | 13.9 | 12.2 |
| 57 | **212.6** | 7.0 |
| 115 | 17.3 | 9.8 |
| 173 … 1456 | **17.3** | **9.8** (frozen for ~1.3s) |

→ The dramatic 212px elongation is a **SINGLE ~60ms flash** (t=57), gone by t=115, then a
static elongated nub for the rest of the window. This is precisely the "fast flicker" defect.

---

## Root cause (the ACTUAL lever, missed by iteration 1)

Iteration 1 pushed the right COSMETIC knobs (size/goo/stretch-cap/opacity/blur) but the SPEED
knob it touched — `--pager-worm-duration: 1.3s → 1.8s` — does **not** govern the stretch
speed. Two coupled reasons:

1. **The bouncy spring front-loads position.** `--pager-worm-spring: var(--spring-bouncy)`'s
   `linear()` hits ~1.0 by ~14% of the clock. `--worm-t` (which drives BOTH position travel
   and, via `lenRatio`, the stretch) therefore completes its real excursion in
   `1.8s × ~0.14 ≈ 250ms`. Lengthening the clock just lengthens the dead tail where
   `--worm-t` already == 1.

2. **The stretch is derived from instantaneous `lenRatio` (travel velocity), not held.** Once
   the worm arrives (~200–250ms) `lenRatio → 1`, so the neck collapses back to round
   regardless of how long the clock runs.

So the worm's weight/flow reads fast because the *spring curve*, not the duration token, owns
the perceived pace — and that curve is the W-GLASS-CAL-fenced `--spring-bouncy`.

---

## SPECIFIC refinements for iteration 2 (push these — within fences)

The duration token is the wrong knob alone. To make the stretch **visibly slow + weighty**,
the worm-t curve and the stretch-hold must change, not just the wall-clock:

1. **Swap the worm spring off `--spring-bouncy` onto a SLOWER, less front-loaded register**
   (the dominant fix). The bouncy curve spends 86% of its clock settled — that is the
   flicker. Use a register whose `linear()` rises gradually across the clock (e.g. a
   `--spring-smooth`/`--spring-gentle`-class curve, or mint a dedicated `--pager-worm` spring
   in `regen-spring-tokens.mjs` with a LOW ωₙ / high response so the position travel itself
   spans ~700–1000ms). The whole point is to spread `--worm-t`'s 0→1 excursion across the
   real clock so the neck is alive for ~1s, not ~150ms. (W-GLASS-CAL fences a *re-tune of an
   existing register*; minting a NEW per-mechanism spring from the SPRING_PRESETS generator is
   the sanctioned path — `--tab-indicator`/`DRAWER_SNAP`/`DOCK_SPRING` precedent.)

2. **Hold the neck — decouple stretch from instantaneous velocity.** Right now `lenRatio`
   collapses the moment the worm arrives. Drive the stretch off a phase envelope of `--worm-t`
   (e.g. `sin(π · worm-t)` or a profile that PEAKS mid-travel and only releases AT ARRIVAL —
   the `INDICATOR_RELEASE_AT_ARRIVAL` idiom the tabs indicator already uses) so the worm stays
   elongated/necked across the whole travel rather than snapping back in the first 200ms. The
   build report itself named this as the next lever (`RELEASE_AT_ARRIVAL`/geometry phase
   mapping) — fire it.

3. **Push `--pager-worm-max-stretch` higher for the velocity swell** (currently 1.4 → it only
   yields `stretch=1.067` single-step because the swell is geometry-relative travel-fraction;
   the multi-gap reaches 1.267). If the squish is meant to read on a single Next, the swell
   mapping needs a floor so even a single-step morph swells visibly (e.g. ≥1.15 on any step).

4. **Re-verify the SLOW read on a SINGLE Next** (the common deck case), not just multi-gap.
   The acceptance frame-series must show the neck ALIVE (h < 11, w > 25) for **≥700ms** of a
   single-step morph before it rounds out — that is the "weighty, dramatic, slow" bar. At
   present a single Next gives ~150ms of neck then 1.3s of nothing.

The size/goo/chroma work from iteration 1 is GOOD and should be KEPT — only the timing/stretch
envelope is the miss.
