# BUILD-SPEC — W-ANIM-IOS27-TUNE: the GLOBAL iOS-27 motion re-calibration

**The user law (emphatic, 2026-06-23):** "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy animations. Smooth, FLOWING, GOOEY. Subtle tuning to be more aligned with iOS-27. They should MORPH MORE on move." + the frame-by-frame reference (`ScreenRecording_06-22 23-59-33`): "notice how the elements STRETCH, have INERTIA, MORPH and SQUEEZE smoothly."

This is a GLOBAL re-calibration of the ONE motion register — the `SPRING_PRESETS` `(response, ζ)` table + the `--spring-*` `linear()` clocks + the squish caps + the `.glass-reveal` entrance — NOT a per-component patch. It is the GLOBAL realization of [[feedback-liquid-weight-universal]] (P7). No new primitive, no second spring family, no second squish engine — a TABLE + TOKEN + GATE-CONSTANT re-tune through the ONE drift-proof pipeline.

---

## 0. The single source of truth (do NOT re-fork)

```
src/composables/motion/springPresets.ts  →  SPRING_PRESETS (the (response, ζ) table)
        │
        ├─→ scripts/regen-spring-tokens.mjs  →  src/styles/tokens/scheme-motion.css
        │       (the --spring-* linear() curves + the --spring-*-duration 2%-band clocks)
        ├─→ MOTION_CURVES (curves.ts)  →  the JS Easing twins (springTimingFunction)
        └─→ DOCK_SPRING (dock/constants.ts:85)  →  reads springPreset("dock").{response,dampingFraction}
                (the JS SpringProgress driver — useDockOrientationMorph / dockMorphContext / useLayerTransition)
```

**ONE table edit + ONE regen** re-derives both halves (CSS token + JS twin) AND the dock driver. The squish caps are SEPARATE tokens/constants (lifted directly). The `.glass-reveal` entrance is a CSS recipe (re-pointed directly). NO hand-written `linear()`, EVER (`proof:spring-ease` S5 reds a hand-truncated clock).

**Working-tree note (the BD in-flight state this spec SUPERSEDES):** the tree already has `dock = {0.56, 0.58}` (a partial weighty-morph nudge) and `scheme-motion.css` already emits `--spring-dock-duration: 0.6s`. This spec re-tunes ALL SIX presets to the §1 TARGET (dock → `{0.68, 0.64}`), so the partial state is OVERWRITTEN — there is no "keep the BD dock" carve. Run the regen AFTER the full table edit; the partial emit is re-derived in lockstep. NO legacy, NO dual.

---

## 1. THE SPRING TABLE (the headline edit) — `src/composables/motion/springPresets.ts`

Edit the `SPRING_PRESETS` rows (lines 67-104). Every TARGET `(response, ζ)` is analytically derived: settle = −ln(0.02)/(ζ·ωₙ), ωₙ=2π/response; overshoot = e^(−πζ/√(1−ζ²)); t90 numeric.

| preset | line | HEAD (resp/ζ) | **TARGET (resp/ζ)** | settle | overshoot | t90 (% clock) | register / consumers |
|---|---|---|---|---|---|---|---|
| **smooth** | 70-71 | 0.50 / 0.86 | **0.58 / 0.80** | 0.451s | **1.5%** | 0.276s (61%) | SETTLE — button hover/press scale, icon-chip bloom, entrances/fades |
| **snappy** | 76-77 | 0.42 / 0.78 | **0.48 / 0.74** | 0.404s | **3.2%** | 0.212s (52%) | CONTROL — tab indicator glide+squish, `.glass-reveal` SPATIAL bloom, progress fill, page-build, border-progress |
| **bouncy** | 82-83 | 0.50 / 0.55 | **0.60 / 0.60** | 0.623s | **9.5%** | 0.225s (36%) | PLAYFUL — dialog/success entrance, VT default, completion-seal |
| **gentle** | 88-89 | 0.70 / 1.00 | **0.82 / 1.00** | 0.511s | **0%** | 0.508s (100%) | GENTLE — convergence-reveal (`--ease-convergence`), scroll-reveal-once |
| **dock** | 94-95 | 0.56 / 0.58 | **0.68 / 0.64** | 0.662s | **7.3%** | 0.266s (40%) | DOCK — collapse/expand + V↔H + fission morph (`DOCK_SPRING`), dock-item drag, in-situ shell morph |
| **press** | 100-101 | 0.15 / 0.86 | **0.20 / 0.80** | 0.156s | **1.5%** | 0.095s (61%) | PRESS — `useSpringPress` interactive tap, `--glass-btn-press-t` drive |

**The calibration vector:** lower stiffness (longer `response` → inertia/weight) + higher through-body damping toward critically-damped-with-a-TOUCH-of-overshoot (kill the pointed flick) + longer settle (the flowing arrival) — WHILE keeping the perceptual arrival AUDACIOUS (t90 in the 50-61% mid-clock band for smooth/snappy/press; bouncy/dock arrive earlier via the overshoot carry = the FLOWING-mass read).

**The invariant fences on these numbers (the acceptance band — these are also the §4 gate re-baseline):**
- Every preset overshoot ∈ **[0%, 10%]** — the "touch of overshoot" band. The OLD pointed bouncy 12.6% / dock 10.7% are RETIRED. A >10% overshoot is the "too springy" defect.
- Every NON-gentle settle LENGTHENS vs HEAD (the inertia floor): smooth +25%, snappy +21%, bouncy +10%, dock +10% (vs the original 0.32/0.7 baseline; +10% vs the BD interim too), gentle +17%, press +43%. NOTHING gets faster (faster = the mechanical-snap defect).
- t90 ∈ **[50%, 61%]** of clock for smooth/snappy/press (the audacious-arrival floor — perceptually present by mid-clock, never sluggish).
- `gentle` ζ stays EXACTLY 1.0 (the `--ease-convergence` brand alias depends on overshoot==0 — DO NOT add bounce to gentle).

**Also update each row's `comment`** to name the new feel (weighty / gooey / inertial / flowing) and to retire the BC.W-SPRING-EASE "crisp/quick" prose (which is the OLD pole). The module header comment block (lines 51-66) — the BC.W-SPRING-EASE "SURGICAL retune, smooth/dock/gentle byte-frozen KEEPS" paragraph — is REWRITTEN: BD.W-ANIM-IOS27-TUNE re-tunes ALL SIX rows toward the iOS-27 weighty-gooey-inertial pole; there are NO byte-frozen keeps any more (the KEEP fence is retired — see §4 S4).

**Before → after (the exact rows to write):**
```ts
{ name: "smooth", response: 0.58, dampingFraction: 0.80, comment: "SETTLE register — the inertial settle (entrances/fades/scale-ins): weighty, a whisper of life (+1.5%), never a dead stop. BD.W-ANIM-IOS27-TUNE" },
{ name: "snappy", response: 0.48, dampingFraction: 0.74, comment: "CONTROL register — the quick-but-WEIGHTY position morph (tab indicator, progress fill, .glass-reveal SPATIAL bloom, page-build); arrives at half-clock (audacious) with a small gooey overshoot (+3.2%). BD.W-ANIM-IOS27-TUNE" },
{ name: "bouncy", response: 0.60, dampingFraction: 0.60, comment: "PLAYFUL register — the emphatic one-shot (dialog/success entrance, VT default, completion-seal): FLOWING not flicking — overshoot softened 12.6%→9.5%, slower for inertia. BD.W-ANIM-IOS27-TUNE" },
{ name: "gentle", response: 0.82, dampingFraction: 1.0, comment: "GENTLE register — the patient critically-damped settle (--ease-convergence alias); slow inertial arrival, ζ=1.0 (NO overshoot by definition — the convergence-reveal depends on it). BD.W-ANIM-IOS27-TUNE" },
{ name: "dock", response: 0.68, dampingFraction: 0.64, comment: "DOCK register — THE WEIGHTY GOOEY MORPH (collapse/expand + V↔H + fission + in-situ shell): slow inertial mass, the settle a graceful +7.3% (un-pointed liquid), the 'MORPH MORE on move' reference. BD.W-ANIM-IOS27-TUNE" },
{ name: "press", response: 0.20, dampingFraction: 0.80, comment: "PRESS register — the iOS interactive tap (useSpringPress + --glass-btn-press-t): a hair of inertial carry (sub-200ms iOS window) + a tiny alive rebound (+1.5%); the interruptible re-seat keeps the gesture continuous. BD.W-ANIM-IOS27-TUNE" },
```

---

## 2. THE REGEN (the required emit) — `scripts/regen-spring-tokens.mjs`

After the table edit, run:
```
node scripts/regen-spring-tokens.mjs
```
It rewrites — idempotently — the 6 `--spring-*` `linear()` tokens (lines ~236-241 of `scheme-motion.css`) AND the 6 `--spring-*-duration` clocks (lines ~259-264) from the table. The TARGET clocks (the analytic 2%-band settle the generator emits, rounded to 10ms):

| token | HEAD | **TARGET** |
|---|---|---|
| `--spring-smooth-duration` | 0.36s | **0.45s** |
| `--spring-snappy-duration` | 0.34s | **0.40s** |
| `--spring-bouncy-duration` | 0.57s | **0.62s** |
| `--spring-gentle-duration` | 0.44s | **0.51s** |
| `--spring-dock-duration` | 0.6s | **0.66s** |
| `--spring-press-duration` | 0.11s | **0.16s** |

(These are GENERATED — never hand-set. `proof:spring-ease` S5 asserts each equals the exact analytic value.) `MOTION_CURVES` (curves.ts) re-derives its JS `Easing` twins from the SAME table at import — no separate edit. `proof:spring-tokens-synced` stays GREEN by construction.

---

## 3. THE SQUISH CAPS (MORPH MORE on move — the deformation)

The user's "they should MORPH MORE on move / STRETCH and SQUEEZE smoothly" = lift the squish caps so the gooey deformation READS. The squish stays the ONE `useLiquidFlex` engine, volume-preserving (reciprocal `scale: var(--stretch) calc(1/var(--stretch))`), PRM-carved (`--stretch` stays 1 under reduce), compositor-only.

| knob | file:line | HEAD | **TARGET** | rationale |
|---|---|---|---|---|
| `useLiquidFlex` default `maxStretch` | `useLiquidFlex.ts:142` | `?? 1.08` | **`?? 1.14`** | the generic squish cap — +14% reads clearly yet stays volume-preserving, never a taffy-pull |
| tabs `DEFAULT_INDICATOR_MAX_STRETCH` | `tabs/constants.ts:19` | `1.15` | **`1.18`** | the tab indicator already speaks +15%; lift to +18% so the glide reads gooier (still ≤1.2, the anti-taffy bar). Update the JSDoc (lines 11-18) + the README mirror |
| `--tab-indicator-max-stretch` | `scale-paper.css:57` | `1.15` | **`1.18`** | the inheriting cascade TOKEN (the authority; the constant is the no-token floor) — keep them in lockstep |
| `--dock-morph-max-stretch` | `dock/density.css:68` | `1.08` | **`1.14`** | the dock morph squish — the MOST-VISIBLE surface; +8%→+14% so the box-morph reads as flowing mass. Update the `dock/shape.css:102` comment ("~1.08" → "~1.14") |
| `squishK` (tanh saturation) | `useLiquidFlex.ts:137` | `1.6` | **`1.6` (KEEP)** | the velocity→squish CURVE constant is correct (the metaball `sa`); the CAP is the lever, not the curve. Do NOT change |
| `useLiquidPress` `maxStretch` | (its default `?? 1.04`) | `1.04` | **`1.04` (KEEP)** | a press is a SMALL gel squish; keep gentle (the deeper press carry comes from the press SPRING re-tune, §1, not the cap) |
| `useLiquidMorph` (fission) | `1.08 / 1.1` | — | **KEEP** | the bud-off swell inherits the weightier `dock` clock via §1 — no cap change |

**Fence (P7c / no second curve):** to get MORE squish, raise the CAP (a token/constant), NEVER fork a second `1+tanh(...)` write. The ONE engine is `useLiquidFlex`; a hand-rolled second squish reds `proof:liquid-weight-law` L3.

---

## 4. THE GATE RE-BASELINE — `scripts/proof-spring-ease.mjs` (born-RED → GREEN, in place, NO new gate/KEY)

The gate hard-codes the BC "crisp/quick" pole. The §1 re-tune MOVES the bands — the gate is the calibration's executable spec and must describe the NEW pole, NOT be evaded. FIVE constant edits + the comment + the self-test re-seeds:

### 4a. S2 — the overshoot band (lines 71-73)
- `const OVERSHOOT_MAX = { snappy: 0.08, press: 0.08, smooth: 0.02, dock: 0.06 }` → the new per-register caps that bound the §1 TARGET while still forbidding a regression to the pointed pole:
  - `snappy: 0.08` → **`0.05`** (target 3.2% — a small gooey overshoot, NOT the old +2% mechanical nor a >5% ring)
  - `press: 0.08` → **`0.03`** (target 1.5%)
  - `smooth: 0.02` → **`0.03`** (target 1.5% — the whisper of life lifts the cap a hair)
  - `dock: 0.06` → **`0.10`** (target 7.3% — the audacious weighty morph, BELOW the 10% ring ceiling)
- `const BOUNCY_OVERSHOOT_BAND = [0.12, 0.18]` → **`[0.07, 0.10]`** (target 9.5% — the SOFTENED Apple-aligned band; the OLD 12-18% band is the "too springy" defect this wave kills).
- `const BOUNCY_ZETA_FLOOR = 0.55` → **`0.58`** (target ζ 0.60 — the un-pointed floor; a ζ<0.58 bouncy over-rings).
- ADD a new universal ceiling assertion in `detectOvershoot`: **every** preset overshoot ≤ **0.10** (the "[0%,10%] touch-of-overshoot" band — the binding §1 fence; reds a future preset that re-introduces a pointed >10% pop). Wire it as a loop over all presets with a clear violation message.

### 4b. S1 — the snappy clock-fill band (line 63)
- `const SNAPPY_90_TRAVEL_BAND = [0.55, 0.70]` → **`[0.45, 0.62]`**. The snappy TARGET (0.48/0.74) lands t90/clock ≈ 0.52 — IN the new band. (The OLD band was tuned to the OLD 0.42/0.78 ≈ 0.57; the new pair is a hair longer-response so the fraction drops slightly. Widen-down the band to admit the new pair while still forbidding the front-load (<0.45 = the abrupt jerk).) Keep `SNAPPY_90_FRONTLOAD_FLOOR = 0.40` (the self-test front-load bite anchor) — the floor stays below the band so the bite still reds a synthetic front-load.

### 4c. S4 — RETIRE the byte-frozen KEEP fence (lines 65-69, 270-284)
The §1 re-tune touches ALL SIX rows, so the `KEEP_PAIRS` byte-frozen fence (smooth/dock/gentle pinned to OLD values) is RETIRED — it encoded "the BC retune touched only snappy/bouncy/press." Two honest options; **take option (i)**:
  - **(i) Re-anchor `KEEP_PAIRS` to the NEW TARGET pairs** (smooth `{0.58,0.80}`, dock `{0.68,0.64}`, gentle `{0.82,1.0}`) so S4 asserts the NEW canonical values are present (a drift OFF the new pole still reds). Update the S4 self-test seed (lines 643-651) to plant a drift OFF the NEW smooth (`{0.58,0.80}` → `{0.58,0.65}`) and assert it reds.
  - (ii) NOT chosen: deleting S4's keep arm entirely loses the "the table matches the canon" assert. Re-anchoring (i) keeps the assert, re-pointed.
  - The S4 `--spring-*` `linear()` block-sync arm (lines 257-267) stays UNCHANGED — it re-derives from the generator after the regen, GREEN by construction.

### 4d. S3 — the press pair (line 75)
- `const PRESS_PAIR = { response: 0.15, dampingFraction: 0.86 }` → **`{ response: 0.20, dampingFraction: 0.80 }`** (the §1 press TARGET). `useSpringPress` reads `springPreset("press")` (single-source) — NO useSpringPress edit needed (it inherits the new pair). Update the S3 self-test press-row literal in the bite (line 631 `--spring-press-duration: 0.11s` → `0.16s`) so the synthetic emit string matches the new clock (the bite tests the literal-default detector, not the value — but keep the string honest).

### 4e. S5 — the clocks (no constant edit)
S5 re-derives the analytic settle per preset and asserts the emitted token matches. After the regen it is GREEN by construction. The self-test S5 bite (line 654 `--spring-snappy-duration: 0.15s`) still reds against the new analytic 0.40s — no change needed (0.15 ≠ 0.40, the bite holds).

### 4f. The gate header + comments
- Rewrite the gate's top doc-block (lines 1-40) + the S2 band comments to name the NEW pole: "BD.W-ANIM-IOS27-TUNE — the iOS-27 weighty-gooey-inertial re-calibration. The bands encode the new pole (longer settle, more inertia, a SMALL un-pointed terminal overshoot ≤10%); the BC crisp/quick pole is retired." Record the §1 TARGET table inline.

---

## 5. THE `.glass-reveal` ENTRANCE — `src/styles/glass/reveal.css` + `scale-paper.css`

The universal liquid-enter recipe. Two edits:

### 5a. The from-scale (the materialize squish) — `reveal.css:80`
- `scale: var(--glass-reveal-enter-scale, 0.95)` → the fallback **`0.88`**, i.e. `scale: var(--glass-reveal-enter-scale, 0.88)`. The reference Control-Center round-toggle blooms FROM ~0.88 (a clear squish-grow), not the near-no-op 0.95. (It is a TOKEN-with-fallback; also declare `--glass-reveal-enter-scale: 0.88` at the `.glass-reveal` block line 46-47 so the authority is explicit, not only the fallback.)

### 5b. The SPATIAL register — `reveal.css:55-59`
The SPATIAL legs (scale/translate) currently ride `--spring-snappy`. **KEEP `--spring-snappy`** for the SPATIAL clock — the §1 snappy TARGET (0.48/0.74, +3.2%, 0.40s) is now the WEIGHTY-with-a-gooey-overshoot register the reveal wants (research-3's A.1: snappy is the CONTROL register the reveal reads; the §1 re-tune already gives it the inertia + the small overshoot). The EFFECTS legs (opacity/filter) STAY on `--ease-out` (no-overshoot, P2). The EXIT (`data-state="closed"`, lines 79-85) STAYS `--ease-out` @ `--duration-fast` (no-overshoot-past-gone, P2). NO register switch — the re-tuned snappy IS the new graceful bloom. (This is the SHARED re-tune discipline: do not fork the reveal onto bouncy; the table moved under it.)

> **Rationale for KEEP-snappy (not switch-to-bouncy):** research-2 §3 floated switching the reveal SPATIAL leg to the bouncy/inertial register. But the re-tuned snappy (+3.2% overshoot, 0.40s) already delivers the graceful weighty bloom WITHOUT the bouncy register's +9.5% (which would over-pop a portaled menu). The reveal is a top-layer CONTROL surface, not a PLAYFUL one-shot. The §1 table re-tune is the fix; the recipe is byte-stable except the from-scale.

### 5c. PRM carve (lines 120-136) — UNCHANGED
The reduce arm snaps scale/translate/filter to none, keeps the opacity fade on `--duration-fast`. The deeper 0.88 from-scale is irrelevant under reduce (scale → none). P6 holds.

---

## 6. THE DRAWER SNAP — `src/components/ui/drawer/constants.ts:25` (REVIEW → lift)

`DRAWER_SNAP = { response: 0.4, dampingFraction: 0.82 }` is the drawer's OWN settle clock (§6 per-spring doctrine — a DISTINCT register, NOT a `SPRING_PRESETS` row). The Maps-card sheet-grow reference is the weighty-inertial liquid the drawer should match.
- **TARGET: `{ response: 0.50, dampingFraction: 0.74 }`** — slower (more inertia, +25% settle) + a small overshoot (~3.2%, the liquid settle, vs the current 0% near-critical). This makes the snap read as inertial mass, matching the Maps-card.
- **CAUTION (verify, do NOT over-fling):** `useDrawerSnap.ts` reads `DRAWER_SNAP.{response,dampingFraction}` (lines 104-105) into a `SpringProgress`; the fling-decision (`DRAWER_FLING_VELOCITY`) is SEPARATE and UNCHANGED. The π must confirm the snap settles cleanly to its detent without over-shooting PAST the snap point (a >5% overshoot on a drawer that lands at 100% would peek past the viewport — keep ζ ≥ 0.72 so overshoot ≤ ~4%). If the π reads an over-fling, fall back to `{0.48, 0.78}` (a hair tighter). This is a REVIEW knob — the π verdict decides.
- It is NOT a `SPRING_PRESETS` row, so it has its OWN gate posture: `proof:drawer-abrogate` W3 asserts the snap rides `SpringProgress` on the drawer's own clock — a value change is within its contract (GREEN by construction). No gate constant to edit; the π is the bar.

---

## 7. THE DOCK MORPH ENGINE — `proof:dock-engine` E2/E4 (verify, no edit expected)

The `dock` TARGET `{0.68, 0.64}` is SLOWER + better-filling than the original `{0.32,0.7}` or the BD interim `{0.56,0.58}`:
- **E2 (the envelope fills the clock):** midpointTravel ≥ 0.40, maxPlateauSpan < 0.35. The `{0.68,0.64}` step response reaches 0.40 well before the clock midpoint (the +7.3% overshoot carries it past 0.9 by t90=0.27s = 40% of the 0.66s clock), and rises monotonically with NO dead-flat plateau. **GREEN by construction** — verify after the table edit (run `node scripts/proof-dock-engine.mjs`).
- **E4 (the DOCK_SPRING reads an iOS-control pair + the morph mechanism is byte-frozen):** `DOCK_SPRING` reads `springPreset("dock")` (so the re-tune flows through automatically — the SANCTIONED path); the E4 self-test plants a DOCK_SPRING *structural* edit (not a value drift). The gate asserts the pair is a valid iOS-control pair, NOT a specific frozen number. **Verify the assertion text** — if E4 hard-codes `{0.32,0.7}` or `{0.56,0.58}` as the expected pair, re-anchor it to `{0.68,0.64}` in lockstep (mirror the §4 S4 re-anchor). If it only asserts "reads the preset table + mechanism unchanged," it stays GREEN.

The dock morph CHROME (the self-blur front-load, the symmetric child stagger — `morph.css:79-80`, `layers.css:337-375`) is W-DOCK-CORE's surface arm — UNTOUCHED by this wave (the spring is the CLOCK, the chrome is the per-frame transform it drives; this wave re-tunes the CLOCK only).

---

## 8. THE GATE-IMPACT SUMMARY

| Touch | Gate | Impact |
|---|---|---|
| Edit `SPRING_PRESETS` (6 rows) | `proof:spring-tokens-synced` | needs the regen; then GREEN (const==preset) |
| Run `regen-spring-tokens.mjs` | `proof:spring-ease` S4/S5 | the CSS-emit half re-derives — GREEN |
| `OVERSHOOT_MAX` re-baseline + the ≤10% ceiling | `proof:spring-ease` S2 | **RED→GREEN** (the new pole's caps) |
| `SNAPPY_90_TRAVEL_BAND` → [0.45,0.62] | `proof:spring-ease` S1 | **RED→GREEN** (the new snappy fills the new band) |
| `KEEP_PAIRS` re-anchor + S4 re-seed | `proof:spring-ease` S4 | **RED→GREEN** (the new canon present) |
| `PRESS_PAIR` → {0.20,0.80} | `proof:spring-ease` S3 | **RED→GREEN** (the new press pair) |
| Squish caps lift (tokens/constants) | `proof:liquid-weight-law` L3 | GREEN — ONE engine, caps are tokens |
| Squish caps lift | `proof:no-layout-animation` | GREEN — transform/`--stretch` only, no layout property |
| `--glass-reveal-enter-scale` 0.95→0.88 | (none frozen) | GREEN — a token re-point |
| `DRAWER_SNAP` lift | `proof:drawer-abrogate` W3 | GREEN — own-clock SpringProgress contract |
| `dock` {0.68,0.64} | `proof:dock-engine` E2/E4 | verify GREEN (re-anchor E4 expected-pair IF it hard-codes one) |
| (no `--card`/`--neutral-*`/saturate change) | `proof:no-gray` | GREEN — this wave touches MOTION only |
| (no new `--spring-*` alias) | `proof:animation-coherence` | GREEN — re-tune in place, no duplicate alias |

**The binding PAINT (never the source gate alone):** the π frame-series readback (§W-spec gate sketch) over the enrolled surfaces on Chromium + WebKit + the `proof:ba-gestalt` motion verdict on FRESH `:5199` captures.

---

## 9. ACCEPTANCE CRITERIA (born-RED on the HEAD too-tight/too-springy state)

1. **The table is re-baked** to §1; `proof:spring-tokens-synced` + `proof:spring-ease` GREEN; every overshoot ∈ [0%,10%]; every non-gentle settle ≥ HEAD; t90 ∈ [50%,61%] for smooth/snappy/press. A born-RED self-test: a synthetic preset at the OLD pointed values (bouncy ζ0.55 → 12.6%) FAILS the new ≤10% / [0.07,0.10] clauses.
2. **The squish caps are lifted** to §3 (useLiquidFlex 1.14, tabs 1.18, dock-morph 1.14, entrance from-scale 0.88); volume-preserving (X·Y ≈ 1 mid-flight); PRM → stretch==1; compositor-only (`proof:no-layout-animation` GREEN).
3. **NO REGRESSION (the global-change caution).** The π frame-series over the enrolled surfaces — dock morph, tab indicator, goo-morph pager dots, the press, the liquid-reveal — confirms EACH still works AND reads SMOOTHER/GOOIER/WEIGHTIER than HEAD (the before/after capture pair). The dock morph still completes + is Layout-flat; the tab indicator still centers + glides; the goo-morph still merges (no detach); the press still confirms + is interruptible; the reveal still blooms-from-anchor.
4. **Smoother across the board (the gestalt).** A side-by-side before/after on the same surface reads decisively iOS-27-smooth: the new arc carries mass + a clear gooey squish + a graceful (un-pointed) settle. `proof:ba-gestalt` motion verdict re-earns on FRESH captures.
5. **Safari-compatible.** The `linear()` springs (Baseline 17.2+) + the compositor-only transform/opacity/`filter` blur-settle paint on WebKit (the `filter` blur is the safe leg; NO `backdrop-filter` re-blur per frame). Capture on Chromium AND WebKit; the new feel reads on BOTH.
6. **PRM-carved.** Under `prefers-reduced-motion: reduce` every spring snaps to its endpoint with zero in-between transform frames + the squish stays 1 + the fade survives (P6); `proof:no-layout-animation`'s universal-PRM-carve assertion GREEN.

---

## 10. THE NORTH-STAR + THE NO-FORK DISCIPLINE (binding)

- **NO re-fork / no-dual-path** — every change is a TABLE value (`SPRING_PRESETS`), a TOKEN/constant (`--tab-indicator-max-stretch`, `--dock-morph-max-stretch`, `useLiquidFlex` default, `--glass-reveal-enter-scale`, `DRAWER_SNAP`), or a GATE-CONSTANT (`OVERSHOOT_MAX`/`SNAPPY_90_TRAVEL_BAND`/`KEEP_PAIRS`/`PRESS_PAIR`). ZERO new primitive, ZERO second spring family, ZERO second squish engine, ZERO second compose recipe. The regen re-emits from the ONE table.
- **NO legacy** — the table is edited IN PLACE; the old curves are RE-GENERATED, not kept as a dual. The byte-frozen KEEP fence is RETIRED (it described the OLD surgical retune); there are no aliases.
- **Compositor-only** — the dock morph drives `transform: scale()` over a reserved footprint (`dockMorphContext` byte-untouched); the squish is `--stretch` reciprocal scale; the press is `scale` + `filter`. `proof:no-layout-animation` holds.
- **PRM-carved + Safari-compatible** — the springs ride `respectReducedMotion`; the squish drops to 1 under reduce; the `:active` `--scale-press` carve is the no-JS floor; the `linear()` curves + the `filter` blur are Baseline-WebKit-safe.
- **Glass is warm MATERIAL** — this wave touches MOTION ONLY; the BA.W-NO-GRAY warm-chroma floor + W-DARK-MATERIAL + design.md's six-layer optical composite are UNTOUCHED (the material is W-GLASS-IOS27's). The motion SERVES the glass — things move with mass + squish so the glass reads ALIVE.

---

## 11. THE FILE-TOUCH MANIFEST (the precise build hand-off)

| # | file | edit |
|---|---|---|
| 1 | `src/composables/motion/springPresets.ts` | the 6-row table → §1 TARGET + the comments + the header doc-block |
| 2 | `scripts/regen-spring-tokens.mjs` | RUN it (no source edit) → re-emits `scheme-motion.css` curves + clocks |
| 3 | `src/styles/tokens/scheme-motion.css` | REGEN OUTPUT (do not hand-edit) |
| 4 | `src/composables/motion/useLiquidFlex.ts:142` | `?? 1.08` → `?? 1.14` |
| 5 | `src/components/custom/tabs/constants.ts:19` | `1.15` → `1.18` + JSDoc + README mirror |
| 6 | `src/styles/tokens/scale-paper.css:57` | `--tab-indicator-max-stretch: 1.15` → `1.18` |
| 7 | `src/styles/dock/density.css:68` | `--dock-morph-max-stretch: 1.08` → `1.14` + `dock/shape.css:102` comment |
| 8 | `src/styles/glass/reveal.css:46,80` | declare `--glass-reveal-enter-scale: 0.88` + fallback 0.95→0.88 |
| 9 | `src/components/ui/drawer/constants.ts:25` | `{0.4,0.82}` → `{0.50,0.74}` (REVIEW via π — fall back to `{0.48,0.78}` if over-fling) |
| 10 | `scripts/proof-spring-ease.mjs` | §4 — S2 caps + the ≤10% ceiling, S1 band, S4 keep re-anchor + re-seed, S3 PRESS_PAIR, header |
| 11 | `scripts/proof-dock-engine.mjs` | VERIFY E2/E4 (re-anchor E4 expected-pair to `{0.68,0.64}` ONLY IF it hard-codes one) |
| 12 | `tests-visual/anim-ios27-tune.spec.ts` | NEW — the π frame-series (the W-spec gate sketch) |
| 13 | `docs/precepts/motion-canon.md` | reconcile any per-register prose naming the OLD bands (P7 the law is unchanged; the band numbers move) |

The single source of truth is the `SPRING_PRESETS` table — ONE edit, the whole motion register re-calibrates in lockstep. That is the SHARED re-tune the user asked for.
