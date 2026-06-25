# W-ANIM-IOS27-TUNE — the GLOBAL iOS-27 motion re-calibration

**Band:** BD / viz-refine (the motion register).
**Build-spec:** `docs/tranches/BD/viz/refine/anim-ios27-tune/BUILD-SPEC.md` (the exact token/recipe/gate deltas).
**Research:** `research-root-cause.md` · `research-target.md` · `research-mechanism.md` (same dir).

---

## The user law (binding)

> "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy animations. Smooth, FLOWING, GOOEY. Subtle tuning to be more aligned with iOS-27. They should MORPH MORE on move." — and the frame-by-frame reference (`ScreenRecording_06-22 23-59-33`): "notice how the elements STRETCH, have INERTIA, MORPH and SQUEEZE smoothly."

A GLOBAL re-calibration of the ONE motion register — NOT a per-component patch. The GLOBAL realization of [[feedback-liquid-weight-universal]] (P7): inertia / weight / bounce / squish on ALL motion.

## The defect (born-RED)

The `SPRING_PRESETS` table is calibrated to the BC "crisp/quick/snappy" pole — fast (low `response`), short settle, low-but-POINTED overshoot on the control registers, low squish caps. That is the precise OPPOSITE of the new "smooth/flowing/gooey/inertial/morph-more" mandate. Measured at HEAD: bouncy +12.6% (pointed flick), dock +10.7% (snaps at the end), settles 0.34-0.60s (short), squish caps +8% (near-invisible deformation), `.glass-reveal` from-scale 0.95 (a near-no-op grow). The user reads it as "overly tight and springy."

## The fix (the SHARED re-tune — one table edit, the whole register re-derives)

1. **The `SPRING_PRESETS` table** (`springPresets.ts`) re-tuned to the iOS-27 weighty-gooey-inertial pole — longer `response` (inertia/weight) + higher through-body damping toward critically-damped-with-a-TOUCH-of-overshoot (kill the pointed flick) + longer settle (the flowing arrival), WHILE keeping the perceptual arrival audacious (t90 mid-clock):

   | preset | HEAD | TARGET (resp/ζ) | settle | overshoot |
   |---|---|---|---|---|
   | smooth | 0.50/0.86 | **0.58/0.80** | 0.45s | +1.5% |
   | snappy | 0.42/0.78 | **0.48/0.74** | 0.40s | +3.2% |
   | bouncy | 0.50/0.55 | **0.60/0.60** | 0.62s | +9.5% |
   | gentle | 0.70/1.00 | **0.82/1.00** | 0.51s | 0% |
   | dock | 0.56/0.58 | **0.68/0.64** | 0.66s | +7.3% |
   | press | 0.15/0.86 | **0.20/0.80** | 0.16s | +1.5% |

2. **Run `node scripts/regen-spring-tokens.mjs`** → re-emits the `--spring-*` `linear()` + `--spring-*-duration` clocks in `scheme-motion.css` AND the `MOTION_CURVES` JS twins (drift-proof). `DOCK_SPRING` reads the dock row directly — the morph driver re-tunes automatically.
3. **The squish caps** (MORPH MORE on move): `useLiquidFlex` default 1.08→**1.14**, tabs `DEFAULT_INDICATOR_MAX_STRETCH`/`--tab-indicator-max-stretch` 1.15→**1.18**, `--dock-morph-max-stretch` 1.08→**1.14**. The ONE `useLiquidFlex` engine, volume-preserving, PRM-carved.
4. **The `.glass-reveal` entrance** from-scale 0.95→**0.88** (the materialize squish-grow); KEEP the SPATIAL leg on the re-tuned `--spring-snappy` (now the weighty-gooey-overshoot register), EFFECTS on `--ease-out`, exit no-overshoot (P2 unchanged).
5. **`DRAWER_SNAP`** 0.4/0.82 → **0.50/0.74** (the inertial Maps-card sheet-grow; REVIEW via π — fall back to 0.48/0.78 if over-fling).
6. **`proof:spring-ease` re-baselined in place** (§4 below) — the gate is the calibration's executable spec; its bands MOVE to the new pole, never evaded.

NO new primitive, NO second spring family, NO second squish engine, NO alias. Compositor-only, PRM-carved, Safari-safe (`linear()` Baseline 17.2+, `filter` blur on own pixels).

---

## The REAL gate sketch (born-RED on HEAD, GREEN at the re-tune)

### Source arm — `scripts/proof-spring-ease.mjs` (EXTENDED in place, no new gate/KEY)

The §4 constant re-baseline (BUILD-SPEC §4) is the device-free source arm. Born-RED on the HEAD table, GREEN at the §1 re-tune. The load-bearing NEW clauses:

- **S2 / the ≤10% overshoot ceiling (the headline anti-springy clause).** ADD to `detectOvershoot`: every preset's analytic overshoot `e^(−πζ/√(1−ζ²))` ≤ **0.10**. Born-RED on HEAD (bouncy 0.126, dock 0.107 both EXCEED 0.10). GREEN at the re-tune (max is bouncy 0.095). The per-register caps tighten too: `snappy ≤ 0.05`, `press ≤ 0.03`, `smooth ≤ 0.03`, `dock ≤ 0.10`; bouncy band `[0.07, 0.10]`, ζ floor 0.58.
- **S1 / the snappy clock-fill band → [0.45, 0.62].** The new snappy (0.48/0.74) lands t90/clock ≈ 0.52, in band. (Forbids both the front-load <0.45 = the abrupt jerk AND the drag >0.62.)
- **S4 / the canon re-anchor.** `KEEP_PAIRS` → the NEW pairs (smooth 0.58/0.80, dock 0.68/0.64, gentle 0.82/1.0) — a drift OFF the new pole reds. The byte-frozen-OLD fence is RETIRED (no legacy).
- **The self-test bites re-seeded** (the gate proves its own bite): the S2 bite plants the OLD pointed bouncy (ζ0.55 → +12.6%) and asserts it now FAILS the ≤10% ceiling; the S4 bite plants a drift off the new smooth and asserts it reds; S1/S3/S5 bites re-anchored to the new band/pair/clock.

### PAINT arm — `tests-visual/anim-ios27-tune.spec.ts` (NEW, the binding π; LOCAL-only, Chromium + WebKit)

The frame-series readback over the enrolled surfaces — born-RED on a HEAD before-capture, GREEN at the re-tune, the no-regression caution made executable:

1. **The spring CURVE readback (the analytic floor, device-light).** In-page, read each `getComputedStyle(:root)` `--spring-*` `linear()` token + `--spring-*-duration`, parse the stop list, and assert: (a) the PEAK value (max stop) for bouncy/dock/snappy/smooth/press ≤ **1.10** (the ≤10% overshoot ceiling — a `linear()` whose interior exceeds 1.10 is the pointed flick; born-RED on HEAD bouncy 1.124 / dock 1.103); (b) each `--spring-*-duration` ≥ its HEAD value (the inertia floor — nothing got faster); (c) gentle's peak == 1.0 (no overshoot). This is the binding "the table re-baked" paint.
2. **The dock morph (NO regression + WEIGHTIER).** Drive the `/dock` collapse↔expand; CDP Layout-track FLAT through the morph (compositor-only held); the `--dock-morph-t` envelope completes 0→1; the new arc's settle reads SLOWER + the squish (`--stretch`) peaks HIGHER than the HEAD before-frame (the +14% cap). Assert the dock still completes + reads as a flowing center-out grow, never a snap.
3. **The tab indicator (NO regression + GOOIER).** Click between tabs on `/navigation/tabs`; the indicator still CENTERS on the target (center==label-center, both axes) + GLIDES; the `--stretch` peak ≥ 1.15 mid-travel (the +18% cap reads), release-at-arrival. The before/after pair shows a gooier stretch.
4. **The goo-morph pager dots (NO detach).** On `/navigation/pager` (or the deck dots), step the active indicator; the metaball neck still MERGES to the next (no detach — the smin merge survives the weightier clock); the deformation reads continuous, never a discrete jump.
5. **The press (NO regression + interruptible).** Press a `<Button variant="glass">` on `/display/buttons`; the `--glass-btn-press-t` drive engages, the scale + brightness couple, a rapid re-press mid-release re-seats velocity-continuously (the interruptible contract). The new press carries a hair of inertia (the 0.20/0.80 re-tune) vs the HEAD snap.
6. **The liquid-reveal (NO regression + deeper squish).** Open a `<Dialog>`/`<Popover>`; the surface blooms-from-anchor (transform-origin at the popper edge), scale FROM ~0.88 (the deeper materialize squish, vs HEAD 0.95) + `filter: blur(4px)→0`, on the re-tuned snappy. Capture the bloom frame-series; assert the deeper from-scale + the graceful (un-pointed) settle.
7. **PRM (P6).** Re-run #2-#6 under `emulateMedia({ reducedMotion: 'reduce' })`: every spring snaps to its endpoint (zero in-between transform frames), `--stretch` stays 1, the opacity fade survives. `proof:no-layout-animation`'s universal-PRM-carve assertion GREEN.
8. **WebKit parity.** Run the whole suite on BOTH the chromium + webkit Playwright projects; the new feel reads on BOTH (the `linear()` springs + the `filter` blur are WebKit-Baseline).

### Gestalt arm — `proof:ba-gestalt` motion verdict (re-earned on a FRESH capture)

A side-by-side before/after on the same surface reads decisively iOS-27-smooth — the new arc carries mass + a clear gooey squish + a graceful un-pointed settle. The capture pair lands in `docs/tranches/BD/viz/refine/anim-ios27-tune/W-ANIM-IOS27-TUNE-DELTA.md`.

---

## Acceptance bar (ALL must hold)

1. `proof:spring-tokens-synced` + `proof:spring-ease` GREEN; every overshoot ∈ [0%,10%]; every non-gentle settle ≥ HEAD; t90 ∈ [50%,61%] for smooth/snappy/press. The S2 bite proves the OLD pointed bouncy now reds.
2. The squish caps lifted (§3); volume-preserving (X·Y≈1); PRM→stretch==1; `proof:no-layout-animation` GREEN.
3. NO regression — the π #2-#6 confirm dock/tab/goo/press/reveal each still work AND read smoother/gooier/weightier than the HEAD before-frame.
4. Smoother across the board — `proof:ba-gestalt` motion verdict re-earns on a fresh capture.
5. Safari — Chromium + WebKit both paint the new feel.
6. PRM — π #7 GREEN (snap-to-endpoint, stretch 1, fade survives).

## North star (binding)

design.md (six-layer optical composite — UNTOUCHED, this is a motion re-tune) · iOS-27 Liquid Glass MOTION (slower-arriving + heavier-damped-through-body + a SMALL graceful terminal overshoot + a CLEAR volume-preserving squish; the Apple `.smooth/.snappy/.bouncy` ζ=1−bounce family is the analytic anchor) · BA.W-NO-GRAY warm-chroma floor + W-DARK-MATERIAL (the GLASS material, unchanged) · [[feedback-liquid-weight-universal]] (this wave is its GLOBAL realization). NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-verified. NO quick workaround — the re-tune is SHARED at the `SPRING_PRESETS` root, never a per-component fork.

## Files touched

See BUILD-SPEC §11 (the file-touch manifest). Headline: `springPresets.ts` (the table) → regen → `scheme-motion.css`; the squish-cap tokens/constants; `reveal.css` from-scale; `drawer/constants.ts` (review); `proof-spring-ease.mjs` (re-baseline); the NEW `tests-visual/anim-ios27-tune.spec.ts`.
