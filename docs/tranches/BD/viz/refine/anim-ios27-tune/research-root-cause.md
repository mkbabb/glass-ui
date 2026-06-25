# RESEARCH-1 — LIVE ROOT-CAUSE: the GLOBAL iOS-27 motion re-calibration

**Feedback (user, emphatic, 2026-06-23):** "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy animations. Smooth, FLOWING, GOOEY. Subtle tuning to be more aligned with iOS27. They should MORPH MORE on move." + the frame-by-frame reference (`ScreenRecording_06-22 23-59-33`): "notice how the elements STRETCH, have INERTIA, MORPH and SQUEEZE smoothly."

This is a GLOBAL RE-CALIBRATION of the motion register: lower stiffness, higher damping toward critically-damped-with-a-touch-of-overshoot, LONGER settle, MORE squish/stretch on travel — while staying audacious (not sluggish). It is a SHARED re-tune (the `SPRING_PRESETS` table + the squish caps + the reveal entrance), NOT per-component.

---

## 1. The single source of truth (verified on disk + live)

The whole motion spine derives from ONE table:

- `src/composables/motion/springPresets.ts` → `SPRING_PRESETS` (the `(response, dampingFraction)` rows).
- `scripts/regen-spring-tokens.mjs` solves each row into the `--spring-*` `linear()` CSS string + the per-spring `--spring-*-duration` 2%-band settle clock, writing both into `src/styles/tokens/scheme-motion.css`. **Edit the table → `node scripts/regen-spring-tokens.mjs` → both the CSS token and the JS twin re-derive.** Drift-proof by construction.
- `src/components/custom/dock/constants.ts:85` `DOCK_SPRING` reads `springPreset("dock").{response,dampingFraction}` DIRECTLY — so re-tuning the `dock` row flows through to the JS `SpringProgress` driver (`useDockOrientationMorph`/`dockMorphContext`) automatically, no second edit.
- `MOTION_CURVES` (the JS `Easing` twins) also import `SPRING_PRESETS` (single-source).

So the re-tune is a TABLE edit + a regen + the squish-cap + the reveal-scale edits. No hand-written `linear()`.

---

## 2. The CONFIRMED current state — live computed values (port :5173)

### 2a. The `SPRING_PRESETS` table at HEAD (`springPresets.ts`)

| preset | response | ζ | analytic overshoot | 2%-settle clock | peak-time | register / consumers |
|--------|----------|------|-------------------|-----------------|-----------|----------------------|
| smooth | 0.50 | 0.86 | **+0.5%** | 362ms (token 0.36s) | 490ms | SETTLE — button hover/press scale (`.tap-squish`/`.btn-glass`/`btn-interactive`), icon-chip bloom, entrances/fades |
| snappy | 0.42 | 0.78 | **+2.0%** | 335ms (token 0.34s) | 336ms | CONTROL — tab indicator glide+squish, `.glass-reveal` bloom, progress fill, page-build, border-progress |
| bouncy | 0.50 | 0.55 | **+12.6%** | 566ms (token 0.57s) | 299ms | PLAYFUL — dialog/success entrance, VT default, completion-seal, view-transition |
| gentle | 0.70 | 1.00 | 0% | 436ms (token 0.44s) | — | GENTLE — convergence-reveal (`--ease-convergence`), scroll-reveal-once |
| dock | 0.56 | 0.58 | **+10.7%** | 601ms (token 0.6s) | 344ms | DOCK — collapse/expand + V↔H + fission morph (`DOCK_SPRING`), dock-item drag |
| press | 0.15 | 0.86 | +0.5% | 109ms (token 0.11s) | 147ms | PRESS — `useSpringPress` interactive tap |

Overshoot = `exp(-ζπ/√(1-ζ²))`; settle = `-ln(0.02)/(ζ·ωₙ)`, ωₙ = 2π/response. (Computed live in-page, reproduced here.)

### 2b. The squish caps (live `getComputedStyle`)

- `--tab-indicator-max-stretch: 1.15` (DEFAULT_INDICATOR_MAX_STRETCH = 1.15, `tabs/constants.ts:19`) → tab indicator squishes +15% on travel.
- `--dock-morph-max-stretch: 1.08` (`dock/shape.css:102`) → dock morph squishes only +8%.
- `useLiquidFlex` default `maxStretch ?? 1.08`, `squishK ?? 1.6` (`useLiquidFlex.ts:142,137`) — the shared engine cap is LOW.

### 2c. The `.glass-reveal` entrance (the universal liquid-enter recipe, `glass/reveal.css`)

- Enter-scale FROM `--glass-reveal-enter-scale, **0.95**` (live: token unset → 0.95 fallback). The reference video squishes from **≈0.88**.
- Enter blur FROM `--glass-reveal-blur, **4px**` → `blur(0)`.
- The SPATIAL legs (scale/translate) ride `**--spring-snappy**` on `--spring-snappy-duration` (0.34s). NOT `--spring-bouncy`.
- The EFFECTS legs (opacity/filter) ride `--ease-out` (no-overshoot bezier). Exit rides `--ease-out` @ `--duration-fast`. (Correct per P2; keep.)

### 2d. The press transform leg (`glass/surfaces.css:82-91,145-160`)

- `.btn-glass` / `.tap-squish` scale leg rides `**--spring-smooth**` (ζ=0.86, +0.5% overshoot) on `--spring-smooth-duration` (0.36s) toward `--scale-press-btn: 0.97`. (The surface bezier legs — bg/border/color/shadow — ride `--ease-standard` 0.2s.)

---

## 3. The CONFIRMED ROOT CAUSE — why it reads "too tight/springy" not "smooth/gooey/inertial"

The defect is NOT a broken token or a mis-resolved cascade — every token resolves correctly. The defect is the **CALIBRATION itself**: the table is tuned for CRISP/QUICK (the BC.W-SPRING-EASE "snappy/quick/coupled" mandate), which is the OPPOSITE pole from the new "smooth/flowing/gooey/inertial" mandate. Three concrete mechanisms:

### CAUSE 1 — the CONTROL/SETTLE registers are STIFF and FAST (response too LOW, settle too SHORT).
- `snappy` (response 0.42, ζ 0.78) settles in **335ms** with peak at 336ms — a fast, near-critically-damped curve that reads as "place crisply then done." This is the most-consumed register (tab indicator, `.glass-reveal` bloom, progress, page-build). The user reads this as TIGHT — there is no inertial follow-through, no flowing settle.
- `smooth` (response 0.50, ζ 0.86) drives the press scale at **362ms** / +0.5% overshoot — a near-dead settle, no alive rebound, no weight.
- The iOS-27 reference feel is a LONGER, FLOWING settle with a visible-but-controlled overshoot. The current curves arrive and stop; they do not GLIDE in.

### CAUSE 2 — the squish caps are TOO LOW ("morph MORE on move" unmet).
- The dock morph squishes only **+8%** (`--dock-morph-max-stretch: 1.08`) and the shared `useLiquidFlex` default is **1.08**. The reference video's round controls visibly deform (small→full, a pronounced volume-preserving squish). +8% is near-invisible. The user's "they should MORPH MORE on move / STRETCH / SQUEEZE" is directly the squish-cap dial — it is set to the anti-taffy floor, not the expressive iOS-27 grace.
- The tab indicator is higher (+15%) but the morph/dock surfaces — the most visible — are at +8%.

### CAUSE 3 — the universal `.glass-reveal` entrance is SUBTLE (scale 0.95) and rides the wrong register.
- Enter-scale 0.95 = a barely-perceptible grow. The reference is ≈0.88 (a clear squish-grow). The `ANALYSIS.md` already names this: "the default `.glass-reveal` scale is subtle (≈0.95-1.0); the iOS-27 reference squishes more (≈0.88) with a clear volume-preserving deformation + the overshoot."
- It rides `--spring-snappy` (+2% overshoot) — a near-flat arrival, not the graceful overshoot-settle the reference shows. The bloom needs the bouncy/inertial register, not the crisp control register.

### Net: the system is calibrated to the BC "crisp/quick" pole. The user wants the opposite pole — smoother (longer settle), gooier (more squish), more inertial (more follow-through/overshoot on enters), while staying audacious (NOT sluggish — still a controlled spring, not a 1s drag).

---

## 4. The BINDING GATE CONSTRAINTS the re-tune must respect or UPDATE (caution: do not silently regress)

These gates hard-code the OLD calibration's bands. A re-tune toward smoother/gooier WILL collide with them — they must be RE-CALIBRATED in lockstep (the bands are the BC pole; the new pole needs new bands), not evaded:

- **`proof:spring-ease` (`scripts/proof-spring-ease.mjs`)** — the load-bearing constraint set:
  - **S1**: `snappy` 90%-travel FRACTION ∈ **[0.55, 0.70]** of its settle clock (the clock-fill band). Raising `snappy`'s response/lowering ζ shifts this; a smoother snappy must keep the fraction in band OR the band must move.
  - **S2**: `bouncy` overshoot ∈ **[0.12, 0.18]** AND ζ ≥ **0.55** (`BOUNCY_ZETA_FLOOR`); `snappy`/`press` ≤ **0.08**; `smooth` ≤ **0.02**. → If the new enters want MORE inertial overshoot on `snappy`/`smooth`, the ≤0.08/≤0.02 caps must lift. If `bouncy` goes gentler (toward Apple's ζ0.60), it drops BELOW 0.12 → S2 reds. These caps are the BC pole and must be re-set.
  - **S3**: `press` pair pinned at (0.15, 0.86) — `useSpringPress` reads it.
  - **S5**: each `--spring-*-duration` must equal the analytic 2%-band settle (no hand-truncated clock). The regen handles this; just re-run it.
- **`proof:dock-engine` (`scripts/proof-dock-engine.mjs`)** — E2: the `DOCK_SPRING` envelope reaches **≥0.40 travel by the clock midpoint** AND max dead-flat plateau **< 0.35** of the clock. A higher-damping/longer dock spring is FINE here (it fills the clock better); a much lower response could fail the midpoint-fill. Verify after re-tune. E4: the morph MECHANISM + `DOCK_SPRING` byte-frozen claim — but `DOCK_SPRING` reads the preset table, so re-tuning the `dock` row is the SANCTIONED path (the gate asserts the (response,ζ) is an "iOS-control" pair, not a specific frozen number — verify the assertion text).
- **`proof:spring-tokens-synced`** — the `--spring-*` token must equal the generator output AND `DOCK_SPRING` must match the canonical pair. Re-run the regen; this stays green by construction.
- **`proof:animation-coherence`** — duration-aware; the EASING-TABLE-BOUND arm forbids a duplicate alias. No new spring family — re-tune in place.
- **`proof:no-layout-animation`** — compositor-only floor. The re-tune touches springs/squish only (transform/opacity/filter) — no layout property. Stays green.

**Recommendation for the IMPL agent:** treat the `proof:spring-ease` S1/S2 bands + the `useLiquidFlex`/dock/tab squish caps as the THINGS THAT MOVE. The new bands encode the new pole (longer settle, more squish, more inertial overshoot on enters, still ζ in the controlled-overshoot range ~0.6-0.8). Update the gate bands + comments in lockstep with the table (the gate is the calibration's executable spec — it must describe the NEW calibration).

---

## 5. The concrete re-tune surface (the exact edit points)

1. **`src/composables/motion/springPresets.ts` — the `SPRING_PRESETS` table** (the headline edit):
   - **smooth/snappy** (CONTROL/SETTLE): raise `response` (longer, more inertial settle — e.g. toward 0.55-0.65) and tune ζ to a controlled-overshoot value (~0.70-0.78) so enters carry a graceful follow-through, not a dead stop. Keep audacious (not >0.8s).
   - **bouncy**: the iOS-27 enter register — keep a clear overshoot but smoother (Apple ζ~0.55-0.60 band, response a touch longer for inertia).
   - **dock**: already the WEIGHTY register (0.56/0.58, +10.7%, 601ms) — this is the closest to the new pole; verify it reads as the gooey-morph exemplar and nudge for consistency.
   - **press**: pinned by S3 — keep (0.15/0.86) OR if the user wants a gooier press, lift `response` slightly (but S3 + `useSpringPress` expect 0.15/0.86 — coordinate with the gate).
2. **Squish caps (the "morph MORE on move")**:
   - `useLiquidFlex.ts:142` default `maxStretch ?? 1.08` → raise the default toward the expressive iOS-27 grace (e.g. ~1.12-1.18).
   - `--dock-morph-max-stretch` (`dock/shape.css:102`, currently 1.08) → raise.
   - `DEFAULT_INDICATOR_MAX_STRETCH` (`tabs/constants.ts:19`, 1.15) → keep or align with the new global cap.
   - Consider `squishK` (`useLiquidFlex.ts:137`, 1.6) — higher K reaches the cap on a slower travel (more morph at lower speeds).
3. **`.glass-reveal` entrance** (`glass/reveal.css`):
   - `--glass-reveal-enter-scale` 0.95 → ≈0.88 (the reference squish-grow). It's a token with fallback — change the fallback at line 80 / set the `:root` token.
   - Switch the SPATIAL leg from `--spring-snappy` → the new bouncy/inertial enter register so the bloom overshoots gracefully (lines 55-59). Keep EFFECTS on `--ease-out`, keep the exit no-overshoot (P2).
4. **`scripts/regen-spring-tokens.mjs`** — run after the table edit; rewrites the `--spring-*` `linear()` + `--spring-*-duration` blocks in `scheme-motion.css`.
5. **`docs/precepts/motion-canon.md`** — P7 (universal liquid weight) is the law; reconcile any per-register prose if the band semantics shift.

---

## 6. The reference-video calibration (frame-by-frame, the FEEL to hit)

From `docs/tranches/BD/viz/liquid-video/ANALYSIS.md` + the frames (f005-f010, the Control-Center open):
- **Squish-grow**: round controls scale FROM ≈0.88-0.92 (volume-preserving — slight scaleY-compress + reciprocal scaleX) → 1.0 with a **graceful spring OVERSHOOT** then settle. The squish is the GRACE — a flat scale reads cheap; the deformation reads liquid.
- **Fade coupled** 0→1, locked to the transform clock.
- **Backdrop blur/saturate deepens** on the surface's OWN entrance.
- **Enter bouncy (overshoot), exit no-overshoot** — the §6 / P2 split (keep).
- The FEEL: smooth + flowing + gooey + inertial, NOT tight/snappy. The deformation (stretch/squeeze) is pronounced and the settle FLOWS in.

---

## 7. Summary — the one-line root cause

**The motion register is correctly wired but mis-CALIBRATED for the new pole.** Every token resolves; the `SPRING_PRESETS` table is tuned for the BC "crisp/quick/snappy" mandate (low response, short settle, low overshoot on the control registers, low squish caps), which is the precise OPPOSITE of the new "smooth/flowing/gooey/inertial/morph-more" mandate. The fix is a GLOBAL re-tune of the table (longer response + controlled-overshoot ζ for inertial settle), the squish caps (raise for "morph more on move"), and the `.glass-reveal` entrance (deeper squish 0.95→0.88, bouncy register), regenerated through the ONE drift-proof pipeline — with the `proof:spring-ease` S1/S2 bands + `proof:dock-engine` E2 RE-CALIBRATED in lockstep (the gates encode the old pole and must describe the new one, never be evaded). Compositor-only + PRM-carved + Safari-safe (`linear()` Baseline 17.2+, the `filter` blur on the surface's own pixels) all hold.
