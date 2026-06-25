# W-ANIM-IOS27-TUNE — the GLOBAL motion re-calibration TARGET (RESEARCH-2 / SOTA design target)

The DESIGN TARGET the fix must hit. The user's emphatic global law:

> "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy animations. Smooth, FLOWING, GOOEY. Subtle tuning to be more aligned with iOS-27. They should MORPH MORE on move."
> "notice how the elements STRETCH, have INERTIA, MORPH and SQUEEZE smoothly."

This is a GLOBAL re-calibration of the motion register — the `SPRING_PRESETS` `(response, ζ)` table + the `--spring-*` `linear()` clocks + the squish caps — NOT a per-component patch. It AUGMENTS the universal liquid-weight law ([[feedback-liquid-weight-universal]] / W-LIQUID-ENTRANCE-GENERAL P7), the goo-morph, and the dock morph — a SHARED re-tune.

---

## 1 — The DIAGNOSIS: why HEAD reads "too tight / too springy"

The current `SPRING_PRESETS` (the BC.W-SPRING-EASE state) tuned for **QUICK-IS-ARRIVAL** crispness — it front-loaded travel and kept overshoots moderate-but-pointed. Measured at HEAD (`springPresets.ts` + the analytic 2%-band settle):

| preset | resp | ζ | settle | overshoot | the feel |
|---|---|---|---|---|---|
| smooth | 0.50 | 0.86 | 0.362s | 0.5% | tight, nearly dead — no inertia carry |
| snappy | 0.42 | 0.78 | 0.335s | 2.0% | quick + crisp — but reads MECHANICAL, no weight |
| **bouncy** | 0.50 | **0.55** | 0.566s | **12.6%** | the OFFENDER — a pointed +12.6% pop reads "springy/tight" not "gooey" |
| gentle | 0.70 | 1.00 | 0.436s | 0% | fine, but short for a "patient" register |
| **dock** | 0.56 | **0.58** | 0.601s | **10.7%** | weighty-ISH but the +10.7% overshoot still snaps at the end |
| press | 0.15 | 0.86 | 0.109s | 0.5% | sub-100ms — correct as a tap-answer, but no "alive" carry |

THE ROOT: the register is **fast + lightly-damped-but-pointed**. A fast spring with a 10-13% terminal overshoot reads as a *snap-with-a-flick* — the opposite of iOS-27's *flowing-mass-that-settles*. The user calls it "overly tight and springy." iOS-27 Liquid Glass motion is **slower-arriving, heavier-damped through the body, with a SMALL graceful terminal overshoot** — mass that decelerates into place, not a coil that flicks.

Secondary: the **squish is too SHY**. `useLiquidFlex` default cap `1.08` (+8%), tabs `DEFAULT_INDICATOR_MAX_STRETCH = 1.15`. The reference (the Control-Center round-toggle materialize, the Maps-card grow) deforms MORE — the user's "MORPH MORE on move / STRETCH and SQUEEZE." The squish must read as a clear gooey deformation, not a near-invisible scale.

---

## 2 — The REFERENCE (frame-by-frame, the iOS-27 north star)

### 2.1 The Control-Center materialize (`liquid-video/`, the squish-grow)
The canonical iOS Liquid-Glass entrance (`ANALYSIS.md` confirmed against frames f005-f009 + sheet-00):
- The modules MATERIALIZE from the top edge **transparent + SQUISHED** (round controls noticeably SMALL — a clear scale-down from a compressed state, ~0.85-0.90), the home screen blurs behind.
- They **SCALE UP small→full + FADE IN + SETTLE with a SMALL spring overshoot** — the settle is GRACEFUL (a slight overshoot then ease in), NOT a pointed bounce. The round toggles show the deformation most: volume-preserving squish-grow.
- The arc is UNHURRIED — the materialize reads ~0.5-0.7s, the modules carrying mass as they grow.
- Exit: SQUISH + FADE OUT, NO overshoot-past-gone (§6/P2 — a closing surface must not overshoot).

THE FEEL: weighty-graceful enter (SMALL overshoot, ~4-9%), no-overshoot exit, fade-coupled-to-transform, a CLEAR volume-preserving squish (the deformation IS the liquid).

### 2.2 The Maps-card EXPAND morph (`sheet-04.jpg`, "MORPH MORE on move")
The compact glass card (search pill + Places chips + Recents) **grows UP into a full sheet** as you pull/scroll — the glass plate's block-size MORPHS continuously, content washing in, the concentric gradient icon-chips translating up. This is the "MORPH MORE on move" reference: a surface's DIMENSIONS stretch/grow on a weighty clock, never a hard reflow-snap. The dock V↔H morph and the drawer snap are glass-ui's analogues — they must carry this same continuous-weighty grow.

### 2.3 The Apple spring family (the analytic anchor, BC `apple-ios27.md` §2.2)
Apple's `.smooth/.snappy/.bouncy` all default `duration(response) 0.5s` and differ only by `extraBounce`; the official formula is **ζ = 1 − bounce**:
- `.smooth` → ζ 1.0 (critically damped, 0% overshoot) — settle 0.31s
- `.snappy` → ζ 0.85 (~0.6% overshoot) — settle 0.37s
- `.bouncy` → ζ 0.70 (~4.6% overshoot) — settle 0.45s
- `.interactiveSpring` → response 0.15, ζ 0.86 (press/drag)

The Apple family is SLOWER (response 0.5 baseline, not glass-ui's 0.35-0.42) and **LESS pointed** (`.bouncy` overshoots only ~4.6%, vs glass-ui's 12.6%). The user's "more aligned with iOS-27" = move TOWARD this family: longer response (inertia), higher through-body damping, smaller terminal overshoot.

---

## 3 — The TARGET SPRING TABLE (the precise bake)

The calibration vector: **lower stiffness (longer `response` → more inertia/weight) + higher damping through the body toward critically-damped-with-a-TOUCH-of-overshoot (kill the pointed flick) + longer settle (the flowing arrival) — WHILE keeping the perceptual arrival audacious (t90 lands in the 50-61% mid-clock band for the control/settle registers, never sluggish).**

The TARGET `(response, ζ)` — every value analytically derived (settle = −ln(0.02)/(ζ·ωₙ), overshoot = e^(−πζ/√(1−ζ²)), t90 numeric):

| preset | HEAD (resp/ζ) | **TARGET (resp/ζ)** | settle | overshoot | t90 (% clock) | rationale |
|---|---|---|---|---|---|---|
| **smooth** | 0.50 / 0.86 | **0.58 / 0.80** | 0.451s | **1.5%** | 0.276s (61%) | the SETTLE register gains inertia (+25% settle) + a whisper of life (1.5%); still arrives by mid-clock — patient, not dead |
| **snappy** | 0.42 / 0.78 | **0.48 / 0.74** | 0.404s | **3.2%** | 0.212s (52%) | the CONTROL register stays QUICK (t90 0.21s, arrives at half-clock = audacious) but gains weight + a small gooey overshoot; the tab indicator / progress fill / marker pop ride this |
| **bouncy** | 0.50 / 0.55 | **0.60 / 0.60** | 0.623s | **9.5%** | 0.225s (36%) | the OFFENDER softened: overshoot 12.6%→9.5% (un-pointed, graceful) + slower (more inertia); still the emphatic register but FLOWING not flicking |
| **gentle** | 0.70 / 1.00 | **0.82 / 1.00** | 0.511s | **0%** | 0.508s (100%) | the patient critically-damped end stretches further (the slow inertial settle); ζ stays 1.0 (no overshoot by definition) |
| **dock** | 0.56 / 0.58 | **0.68 / 0.64** | 0.662s | **7.3%** | 0.266s (40%) | THE WEIGHTY GOOEY MORPH register — slower (+10% settle, the inertial mass), overshoot softened 10.7%→7.3% (graceful liquid settle, not a snap); the dock collapse/expand + V↔H + fission + the in-situ shell morph all ride it |
| **press** | 0.15 / 0.86 | **0.20 / 0.80** | 0.156s | **1.5%** | 0.095s (61%) | the tap-press gains a HAIR of carry (response 0.15→0.20, still sub-200ms iOS window) + a tiny alive rebound (1.5%); the interruptible re-seat keeps the gesture continuous |

**The fences on these numbers (the acceptance band):**
- Every preset's overshoot lands in **[0%, 10%]** — the "touch of overshoot" band. NO preset exceeds 10% (the current bouncy 12.6% / dock 10.7% are RETIRED). A pointed >12% overshoot is the "too springy" defect.
- Every NON-gentle settle LENGTHENS vs HEAD (the inertia) — smooth +25%, snappy +21%, bouncy +10%, dock +10%, gentle +17%, press +43%. NOTHING gets faster (faster = the mechanical-snap defect).
- t90 stays in **[50%, 61%]** of clock for smooth/snappy/press (the audacious-arrival floor — the curve is perceptually present by mid-clock, never sluggish). bouncy/dock arrive even earlier (36-40%) because their overshoot carries them past 0.9 fast then settles — that's the FLOWING-mass read, correct.
- `gentle` ζ stays exactly 1.0 (the critically-damped brand convergence-reveal alias `--ease-convergence` depends on overshoot==0 — DO NOT add bounce to gentle).

**The generated artifacts that re-derive from the table (drift-proof by construction):**
- `scripts/regen-spring-tokens.mjs` → the `--spring-*` `linear()` curves in `scheme-motion.css` (via keyframes.js `springLinearStops`).
- the SAME script → the `--spring-*-duration` clocks (the 2%-band settle). The TARGET clocks: smooth 0.45s · snappy 0.40s · bouncy 0.62s · gentle 0.51s · dock 0.66s · press 0.16s. (Generated — never hand-set; the regen emits them from the same `(response, ζ)`.)
- `MOTION_CURVES` (curves.ts) → the JS `Easing` twins via `springTimingFunction`.
- One table edit → both halves re-derive. `proof:spring-tokens-synced` stays GREEN by construction.

---

## 4 — The SQUISH TARGET (MORPH MORE on move — the deformation)

The user's "they should MORPH MORE on move / STRETCH and SQUEEZE smoothly" = lift the squish caps so the deformation reads as a CLEAR gooey stretch, not a near-invisible scale. The reference round-toggles deform ~10-15% on grow; the Maps-card grows its whole block-size.

| knob | HEAD | **TARGET** | rationale |
|---|---|---|---|
| `useLiquidFlex` default `maxStretch` | 1.08 (+8%) | **1.14 (+14%)** | the generic squish cap — the deformation must READ; +14% is clearly visible yet still volume-preserving (the reciprocal X/Y holds), never a taffy-pull |
| tabs `DEFAULT_INDICATOR_MAX_STRETCH` | 1.15 (+15%) | **1.18 (+18%)** | the tab indicator already speaks +15%; lift to +18% so the glide reads gooier (still capped LOW — a hairline-thin pill can't over-deform) |
| `squishK` (tanh saturation) | 1.6 | **1.6 (KEEP)** | the velocity→squish curve constant is correct (the metaball shader's `sa` constant); the CAP is the lever, not the curve |
| liquid-entrance squish FROM-scale | ≈0.95 (shy) | **≈0.88** | W-LIQUID-ENTRANCE-GENERAL: the materialize starts from a clearly-compressed ~0.88 (the Control-Center round-toggle small→full), volume-preserving, not a 0.95 near-no-op |
| goo-morph (pager/deck dots, metaball neck) | the smin merge | **KEEP the merge mechanism; the neck rides the new dock/snappy clock** | the goo-morph already deforms maximally (a full metaball merge); it inherits the WEIGHTIER clock via the shared spring re-tune — no separate cap change |

The squish stays **volume-preserving** (the reciprocal `scale: var(--stretch) calc(1/var(--stretch))`) and **PRM-carved** (`--stretch` stays 1 under reduce) and **compositor-only** (transform only — never an animated box dimension; `useLiquidFlex.sizeStyle` is the one-time settled-footprint reserve, the per-frame channel is `transform`). The cap lift is the only change.

---

## 5 — The TARGET LOOK (what each surface SHOULD feel like, per [[feedback-liquid-weight-universal]])

The motion target expressed per surface-class — the binding acceptance lens (a surface that snaps/hops/linear-moves or flicks-with-a-pointed-overshoot FAILS):

- **Top-layer reveal (Dialog/Popover/Sheet/menu/`.glass-reveal`)** — blooms from the anchor: scale FROM ~0.88 squished + translate + `filter: blur(4px)→0`, on the new **snappy** (0.48/0.74) SPATIAL clock + `--ease-out` EFFECTS, transform-origin at the anchor. The arrival is weighty-graceful (3.2% overshoot, not a pop). Exit: no-overshoot squish-fade.
- **Dock morph (collapse/expand + V↔H + fission + in-situ shell)** — the WEIGHTY GOOEY register on the new **dock** (0.68/0.64) clock: the box morphs as a compositor transform over a reserved footprint, the chrome (bg/border/pad/radius/child-stagger) on the same `--dock-morph-t`, the settle a graceful 7.3% (not the old pointed 10.7%). The "MORPH MORE" reference — the dock should read as flowing mass.
- **Tab indicator** — glides on the new **snappy** clock + the +18% squish, release-at-arrival; reads as a gooey stretch-and-settle, never a hard hop. The drag-morph (`:draggable`) pull-to-morph rides the same.
- **Press (Button / Card `:pressable` / dock control)** — the new **press** (0.20/0.80) interruptible spring, a hair of carry + a tiny alive rebound, coupled brightness/specular on the `--*-press-t` drive. The gesture confirms with weight, not a mechanical click.
- **Pager/deck dots (goo-morph)** — the active indicator metaball-MERGES/stretches to the next on the new **snappy/dock** clock — the smin neck deforms, never a discrete jump ([[feedback-liquid-weight-universal]] verbatim).
- **Drawer snap** — `DRAWER_SNAP` (0.4/0.82) is the drawer's OWN settle clock (§6 per-spring doctrine). REVIEW: lift toward the weightier family (candidate **0.50/0.74** — slower, a small overshoot) so the snap reads as inertial liquid, matching the Maps-card sheet-grow; but KEEP it a distinct register (the drawer is a different surface). Verify it doesn't over-fling.
- **Scroll / entrances (`.scroll-build` / `.scroll-cascade`)** — the per-spring clocks re-derive automatically (they read `--spring-*-duration`); the page-build/section-cascade inherit the weightier inertia for free.

---

## 6 — The ACCEPTANCE BAR (the binding gate)

The fix is ACCEPTED iff ALL hold (born-RED on the HEAD too-tight/too-springy state):

1. **The spring table is re-baked** to the §3 TARGET `(response, ζ)`; `proof:spring-tokens-synced` + `proof:spring-ease` GREEN; every preset overshoot ∈ [0%, 10%]; every non-gentle settle ≥ HEAD's settle (the inertia floor); t90 ∈ [50%, 61%] for smooth/snappy/press (the audacious-arrival floor). A born-RED self-test: a synthetic preset at the OLD pointed values (bouncy ζ0.55 → 12.6%) FAILS the overshoot-≤10% clause.
2. **The squish caps are lifted** to §4 (`useLiquidFlex` 1.14, tabs 1.18, entrance from-scale ~0.88); volume-preserving (X·Y ≈ 1 mid-flight); PRM → stretch==1; compositor-only (no animated box dimension — `proof:no-layout-animation` GREEN).
3. **NO REGRESSION (the global-change caution).** The π FRAME-SERIES readback over the enrolled surfaces — dock morph, tab indicator, goo-morph pager dots, the press, the liquid-reveal — confirms EACH still works AND reads SMOOTHER/GOOIER/WEIGHTIER than HEAD (the before/after capture pair). Specifically: the dock morph still completes + is Layout-flat; the tab indicator still centers + glides; the goo-morph still merges (no detach); the press still confirms + is interruptible; the reveal still blooms-from-anchor + degrades on PRM. The HEAD before-frames are the ground.
4. **Smoother across the board (the gestalt).** A side-by-side before/after on the same surface reads decisively iOS-27-smooth: the new arc carries mass + a clear gooey squish + a graceful (un-pointed) settle. The `proof:ba-gestalt` motion verdict re-earns on a FRESH capture (this is a gestalt placement judgement, not only a pixel delta).
5. **Safari-compatible.** The `linear()` springs + the compositor-only transform/opacity/`filter` blur-settle paint on WebKit (the `filter` blur is the safe leg; NO `backdrop-filter` re-blur per frame on a load-bearing path). Capture on chromium AND webkit; the new feel reads on BOTH.
6. **PRM-carved.** Under `prefers-reduced-motion: reduce` every spring snaps to its endpoint with zero in-between transform frames + the squish stays 1 + the fade survives (P6); `proof:no-layout-animation`'s universal-PRM-carve assertion GREEN.

---

## 7 — The NORTH STAR (binding, non-negotiable)

- **design.md** — the six-layer optical composite + the 7 glass tiers + the warm-cream identity (unchanged by this wave — this is a MOTION re-tune, the material is W-GLASS-IOS27's; but the motion must serve the glass: things move with mass and squish so the glass reads ALIVE).
- **iOS-27 Liquid Glass MOTION language** — slower-arriving + heavier-damped-through-body + a SMALL graceful terminal overshoot + a CLEAR volume-preserving squish. The Apple `.smooth/.snappy/.bouncy` family (ζ = 1 − bounce) is the analytic anchor; the TARGET moves toward it (longer response, smaller pointed overshoot) WITHOUT going fully critically-damped (glass-ui keeps a touch more life — audacious, not sterile).
- **BA.W-NO-GRAY warm-chroma floor + W-DARK-MATERIAL** — the material is warm MATERIAL never gray (a fence on the GLASS, preserved; this wave touches motion only).
- **[[feedback-liquid-weight-universal]]** — inertia/weight/bounce/squish on ALL motion; the goo-morph pager dots; nothing snaps, everything settles with spring physics + liquid deformation. This wave is the GLOBAL realization of that law.
- **NO legacy / NO aliases** — the spring table is edited in place; the old curves are re-generated, not kept as a dual. Compositor-only, PRM-carved, Safari-verified. NO quick workaround (no per-component spring fork — the re-tune is SHARED at the `SPRING_PRESETS` root).

---

## 8 — Build hand-off summary (the precise deltas)

1. `src/composables/motion/springPresets.ts` — edit the `SPRING_PRESETS` table to §3:
   - smooth 0.5/0.86 → **0.58/0.80**
   - snappy 0.42/0.78 → **0.48/0.74**
   - bouncy 0.5/0.55 → **0.60/0.60**
   - gentle 0.7/1.0 → **0.82/1.0**
   - dock 0.56/0.58 → **0.68/0.64**
   - press 0.15/0.86 → **0.20/0.80**
   - update each row's `comment` to name the new feel (weighty/gooey/inertial).
2. Run `node scripts/regen-spring-tokens.mjs` → re-emits the `--spring-*` `linear()` + `--spring-*-duration` in `scheme-motion.css` AND the `MOTION_CURVES` twins (drift-proof).
3. `src/composables/motion/useLiquidFlex.ts` — default `maxStretch` 1.08 → **1.14**.
4. `src/components/custom/tabs/constants.ts` — `DEFAULT_INDICATOR_MAX_STRETCH` 1.15 → **1.18** (+ the README mirror).
5. W-LIQUID-ENTRANCE-GENERAL entrance from-scale → **~0.88** (the materialize squish).
6. REVIEW `DRAWER_SNAP` (drawer/constants.ts) toward **0.50/0.74** — verify no over-fling.
7. Gates: `proof:spring-tokens-synced`, `proof:spring-ease` (re-baseline the overshoot band to ≤10%), `proof:no-layout-animation`, the π frame-series (dock-morph-family / tabs-std / goo-morph / press-unify / liquid-reveal) on chromium + webkit, `proof:ba-gestalt` motion verdict — ALL re-earn on FRESH before/after captures.

The single source of truth is the `SPRING_PRESETS` table — ONE edit, the whole motion register re-calibrates in lockstep. That is the SHARED re-tune the user asked for.
