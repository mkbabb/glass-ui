# Greenfield — the MOTION VOCABULARY (lens A: pure iOS-27 fidelity)

**Item:** the canonical motion register — the spring presets (`--spring-smooth/snappy/bouncy/gentle/dock/press`), the new `--ease-cartoon-punch`, the `--motion-weight` scalar, the `linear()` curves, the spring-vs-ease + driver-vs-observer selection rules, and the morph-MORE-on-move velocity-coupled squish (`useLiquidFlex`).

**Lens:** the most faithful, audacious iOS-27 Liquid-Glass interpretation — match or BETTER the reference demos. Liquid weight is the GOVERNING feel; tightness is the defect.

---

## 0. The status quo, assayed live (the delta basis — not anchoring, just the truth on the ground)

I read the source AND sampled the running app (`:5173`, `getComputedStyle` on `:root`, both modes). Three facts decide the whole design:

1. **The `anim-ios27-tune` triumvirate HAS LANDED.** Live tokens read the new weighty pole, not the spec-table:
   | preset | live `--spring-*-duration` | live overshoot (from JUDGE-1 π) |
   |---|---|---|
   | smooth | **0.45s** | +1.5% |
   | snappy | **0.40s** | +3.2% |
   | bouncy | **0.62s** | +9.3% |
   | gentle | **0.51s** | 0% |
   | dock | **0.66s** | +7.3% |
   | press | **0.16s** | +1.5% |
   `--tab-indicator-max-stretch` = **1.18** live, `--dock-morph-max-stretch` = **1.14** live. The squish caps are lifted. The springs already carry mass. **The golden UNIONS with this — it does NOT re-fork the table.** (This answers KEY QUESTION 4 up front: anim-ios27-tune is DONE and correct; this golden is the layer ABOVE it.)

2. **`--motion-weight` does NOT exist in `src/` yet.** Live `getComputedStyle(":root").getPropertyValue("--motion-weight")` → **empty**. It is a pure DESIGN.md §L4 spec token (lines 115, 122-128, 166). Same for **`--ease-cartoon-punch`** (empty live; spec only, §L2 line 82 + §Easing lines 309-311 + §Shadows line 413) and **`--glass-reveal-enter-scale`** (empty live — the anim-ios27-tune from-scale 0.88 was speced but the explicit token authority was never declared; the recipe rides the fallback only). **These three are the build delta. The golden's whole job is to LAND them as the governing layer over the already-tuned springs.**

3. **DESIGN.md §L2's "Three canonical springs" prose is STALE.** Its table still prints the OLD pre-tune values (`smooth ζ1.0/0%`, `snappy ζ0.65/~7%`, `bouncy ζ0.45/~20%`) — exactly the "too tight/springy" pole KEY QUESTION 1 asks about. The *source* (`springPresets.ts`) and the *live tokens* already moved past it. So the §L2 prose-vs-code drift is itself a defect this golden's wave-amendment closes (the spec doc must name the landed pole).

**Verdict on KEY QUESTION 1 (are the current springs too tight?):** the OLD ones (the ζ0.65/0.45 the §L2 prose still shows) — YES, too pointed for ios27 weighty-gooey. The LANDED ones (the live 0.40–0.66s clocks with ≤+9.3% overshoot) — RIGHT. The default register has ALREADY shifted slower/weightier. The remaining gap is not the spring NUMBERS — it is that the **gooey deformation is not yet UNIVERSAL and not yet PROPORTIONED by a single scalar.** That is `--motion-weight`'s job.

---

## 1. THE CORE IDEA — the register is a TRIANGLE, and `--motion-weight` is its centroid

iOS-27 liquid motion is not one curve. It is a **three-pole register** the user's prompt already named, and the failure mode is treating them as a flat list of presets a consumer cherry-picks. I reframe the whole vocabulary as a TRIANGLE:

```
                        SPRING (the time-domain physics)
                       ζ-damped, monotone-from-one-side,
                    overshoot ≤10% by INVARIANT — the calm pole
                              /        \
                             /          \
                            /            \
                  --motion-weight         \
                  (the centroid scalar     \
                   that scales how far      \
                   a surface pulls toward    \
                   each loud pole)            \
                          /                    \
                         /                      \
   SQUISH (the SPACE-domain) ──────────── CARTOON (the past-the-fence pole)
   useLiquidFlex velocity-coupled        --ease-cartoon-punch — a SHAPED linear()
   reciprocal deform — morph MORE        with a NEGATIVE anticipation dip + a
   the faster you move                   ~+22% punch NO spring can express
```

- **SPRING** is WHEN a surface arrives (the `linear()` clocks — already tuned, frozen by this golden).
- **SQUISH** is HOW MUCH a surface DEFORMS as it travels (`useLiquidFlex`, velocity-coupled — the "morph more on move" law).
- **CARTOON** is the deliberate, opt-in EXAGGERATION past the spring's ≤10% ceiling (anticipation dip → big punch → settle), reserved for celebration/emphasis.

The genius of iOS-27 is that these three are not independent dials a designer balances per-surface — they are **co-scaled by ONE number.** A surface picks `--motion-weight` once at rest, and that single scalar simultaneously sets: the squash depth (SQUISH pole pull), the overshoot share it takes from its spring, the anticipation pull-back, and the cartoon-shadow travel. They read as ONE proportioned deformation, never four unrelated tics. **`--motion-weight` is the centroid of the triangle — the governing scalar that makes liquid-weight universal.** That is the spine of this whole golden.

**The rest value is `1/φ ≈ 0.62`** (DESIGN.md §L6 golden-proportion law — motion-weight is the φ-family's motion rung). Not 0 (dead), not 1 (manic) — present, alive, never cartoonish-by-default. Dock and celebration push toward 1; observer carousels sit near 0.

---

## 2. THE SINGLE BOLDEST MOVE — `--motion-weight` is a typed `@property` DRIVER-scoped scalar that the squish ENGINE multiplies, not just the squish CAP

Everything else is composition of extant primitives. THIS is the one new mechanism, and it is deliberately small.

**The move:** register `--motion-weight` as a typed Houdini `@property` (`syntax: "<number>"`, `inherits: true`, `initial-value: 0.62`) in `property-regs.css §18` — the EXACT idiom `--ui-scale` and `--glass-level` already use (the master cascading-scalar precedent, lines 267-280). Then wire it into the ONE squish engine `useLiquidFlex` as a **multiplier on the effective cap**, so the velocity-coupled deformation scales with weight WITHOUT a second curve:

```ts
// useLiquidFlex.ts — the ONE change to the engine (a cap modulation, NOT a new law)
const effectiveCap = 1 + (maxStretchOf() - 1) * motionWeightOf();
//   motionWeightOf() reads the live cascade var via the consumer's element
//   (getComputedStyle / a CSS var() the consumer threads in), default 0.62.
//   At rest 0.62: a 1.14 cap deforms to 1 + 0.14*0.62 = 1.087 — present.
//   A dock at weight 1.0: full 1.14. An observer carousel at weight 0.15: 1.021 — calm.
const raw = squishLaw === "linear"
  ? 1 + travel.value * (effectiveCap - 1)
  : 1 + Math.tanh(travel.value * squishK) * (effectiveCap - 1);
```

Why this is THE bold move and not just a knob:

- **It makes liquid-weight UNIVERSAL through ONE assignment.** Today the squish cap is a per-surface token (`--tab-indicator-max-stretch`, `--dock-morph-max-stretch`, the `useLiquidFlex` default). After this, EVERY squish consumer (the 27 `useLiquidFlex` sites) co-scales off the SAME cascading `--motion-weight`. A consumer scope (`<Dock>` sets `--motion-weight: 1`) makes its whole subtree gooier in one line. That is the DESIGN.md §L4 "co-scales the squash depth, the overshoot share, the anticipation pull-back, and the cartoon-shadow travel TOGETHER" law made executable.
- **PRM is ONE cascade assignment, not 27 carves.** `@media (prefers-reduced-motion: reduce) { :root { --motion-weight: 0 } }`. Every squish, every cartoon-shadow travel, every anticipation pull collapses to flat IN ONE LINE because they all multiply through the scalar. This is the §L4 "PRM → `--motion-weight: 0` (the cascade zeroes the extra squash, overshoot, anticipation, arc, and stagger in one assignment)" promise — and it's WHY the scalar must be the multiplier, not the springs (the springs keep their own `respectReducedMotion` snap; the weight zeroes the GOO on top).
- **DRIVER-scoped by the cascade, observer-calm by override.** The §L2 driver-vs-observer rule becomes structural: `:root` rests at 0.62 (drivers inherit it); an OBSERVER container (a content carousel, a list reorder under scroll) sets `--motion-weight: 0.15` on ITS scope, so its settle stays calm-overdamped (an over-springy carousel reads cheap — iOS reserves the bounce for open/morph). The driver-vs-observer selection rule is no longer prose a coder must remember — it is a scoped CSS var. (This answers KEY QUESTION 3 below: useLiquidFlex becomes universal-by-cascade.)

**The born-RED gate:** `proof:motion-weight-universal` (new gate, born RED on HEAD where the token does not exist). It asserts:
- `--motion-weight` is registered `@property` with `inherits: true`, `initial-value: 0.62` (the 1/φ golden rung — a value drift off 0.62 reds, mirroring §L6's golden-proportion fence).
- The PRM media block zeroes it (`grep` the cascade — `--motion-weight: 0` under `prefers-reduced-motion: reduce`).
- `useLiquidFlex` reads it into the effective cap (the engine modulation is present — the squish is weight-coupled, not a frozen cap).
- NO second squish engine: still exactly ONE `1+tanh(...)`/`1+travel*(...)` write (the `proof:liquid-weight-law` L3 ONE-engine fence holds — the weight is a FACTOR on the cap, not a fork).
Born RED because `--motion-weight` is empty on `:root` live today (assayed §0).

---

## 3. `--ease-cartoon-punch` — the third pole, a raw shaped `linear()`, NOT a spring, NOT a curve-table row

The springs are monotone-from-one-side (a single damped spring approaches its target from ONE side — it CANNOT dip below origin then overshoot past it). iOS-27's loudest moments — a celebration burst, a "you did it" seal, a deliberate punch — want **anticipation** (pull back before launch) AND **exaggeration** (punch past the ≤10% fence). No spring expresses that shape. So it ships as a hand-shaped `linear()` raw token:

```css
/* scheme-motion.css §2 — the Cartoon register's MOTION half (visual half = §Shadows cast).
   A shaped keyframe: dip ~4% BELOW origin (anticipation), cross 1.0, punch ~+22%, settle.
   NOT a SPRING_PRESETS row (the ≤10% spring-overshoot invariant stays intact + the analytic
   solver is untouched). NOT a MOTION_CURVES entry (MotionCurveKind is the closed
   spring|bezier union; a hand-shaped linear() is neither). A raw --ease-* property —
   zero engine extension. Drives TRANSFORM ONLY (compositor-safe, both engines). */
--ease-cartoon-punch: linear(
  0,
  -0.012 6%, -0.038 12%, -0.022 18%,   /* the anticipation dip — below origin */
  0.18 34%, 0.62 46%, 0.98 56%,         /* the launch */
  1.16 66%, 1.22 72%,                   /* the PUNCH — past the spring fence */
  1.14 80%, 1.05 88%, 1.006 94%, 1      /* the settle */
);
```

**The crucial reconcile (no contrivance, no fork):**
- It is generated like the springs — but by a SEPARATE generator arm (it is not a `(response, ζ)` pair; it is a shaped keyframe). I propose `scripts/regen-spring-tokens.mjs` grows a `RAW_LINEAR` section emitting the cartoon-punch stops from an explicit keyframe-fraction table, so the ONE generator owns ALL `linear()` emit (the no-hand-truncated-clock fence `proof:spring-ease` S5 stays the authority — the punch token is generator-emitted too, never hand-typed). DRY: one generator, two arms (springs + raw shaped).
- It is **co-scaled by `--motion-weight`** the same way: the punch DEPTH is `1 + (0.22)*var(--motion-weight)` worth of overshoot — i.e. the cartoon register's loudness rides the same centroid scalar. At weight 1.0 (celebration) the full +22% punch; at the 0.62 rest a tamer +13.6%. So `--ease-cartoon-punch` is not a fixed curve — it is the loud VERTEX the weight scalar pulls toward. (Implementation: the consumer composes the punch token on `transform` AND multiplies its travel by `--motion-weight`, OR — simpler — two curve tiers `--ease-cartoon-punch` (full) and the weight interpolates between `--ease-standard` and it. Pick the cleaner at build; the spec is "loudness ∝ weight".)
- **PRM collapses it to `--ease-standard`** (DESIGN.md §L2 / §L5) — the same one-line cascade carve as every spring, AND the weight=0 zeroes the punch share. Belt and suspenders, both correct.
- **Born-RED gate:** `proof:cartoon-punch` asserts (a) the token is a `linear()` with a genuine NEGATIVE leg (a stop < 0 — the anticipation dip a spring can't express; this is the EXISTENCE proof the register is real), (b) its peak > 1.10 (it punches PAST the spring fence — it is a register, not a spring), (c) it is NOT a `SPRING_PRESETS` row and NOT in `MOTION_CURVES` (the closed-union invariant — a `grep` assert), (d) PRM collapses it. Born RED — the token is empty live today.

---

## 4. THE SELECTION RULES — made STRUCTURAL, not prose a coder forgets

The spring-vs-ease + driver-vs-observer rules currently live as DESIGN.md prose ("if the user's finger touched a pixel, use a spring"; "observer motions use `--ease-standard`"). The golden makes them STRUCTURAL so they can't be forgotten:

| Axis | The rule | How the golden enforces it structurally |
|---|---|---|
| **spring vs ease** | SPATIAL (transform/scale/translate/size/morph) → a `--spring-*`. EFFECTS (bg/border/color/box-shadow/opacity) → a bezier `--ease-*` (a color cross-fade on a spring wobbles). | Already in §L2's [SPATIAL]/[EFFECTS] table + `proof:spring-ease`. Golden ADDS: the `--ease-cartoon-punch` is SPATIAL-only (transform), gated by `proof:cartoon-punch` (c). |
| **driver vs observer** | DRIVER (finger/route caused) → full `--motion-weight` (0.62 rest). OBSERVER (auto-advance, list reorder under scroll, progress) → low weight, `--ease-standard`. | NEW: the cascade. `:root` rests 0.62; observer containers scope `--motion-weight: 0.15`. The `--pager-worm-flow` curve (JUDGE-1 §6: its OWN linear(), independent of springs) is the exemplar observer curve — UNTOUCHED. |
| **which spring** | SETTLE→smooth, CONTROL→snappy, PLAYFUL→bouncy, GENTLE→gentle, DOCK→dock, PRESS→press. | The `SPRING_PRESETS` `comment` field already names the surface-class per row (the single source). Golden freezes this — no re-fork. |
| **how loud** | rest 0.62; dock/morph push → 1.0; celebration → 1.0 + `--ease-cartoon-punch`; observer → ~0.15. | `--motion-weight` scoped per surface. The centroid scalar IS the loudness rule. |

This is the §L2/§L4 "a primitive's spec NAMES which `--motion-weight` it rests at + which spring carries the motion" requirement — and now the gate can CHECK it (a primitive that ships a transform transition with no spring and no documented weight reds the coherence gate).

---

## 5. KEY QUESTION 3 — is `useLiquidFlex` wired EVERYWHERE driver motion happens? (the universality audit)

Live grep: **27 files** reach `useLiquidFlex` / `useLiquidPress` / `useLiquidMorph`. That is broad but NOT total. The driver surfaces that SHOULD squish:

| Surface | uses velocity-squish today? | golden verdict |
|---|---|---|
| dock V↔H morph (`useDockOrientationMorph`) | YES (`--dock-morph-max-stretch` 1.14) | KEEP — weight-couple the cap |
| tab indicator glide (`useTabIndicator`) | YES (linear law, 1.18) | KEEP — weight-couple |
| metaball blob (`metaball.frag` `sa=1+tanh(speed·k)`) | YES (in-shader, the SAME curve) | KEEP — the shader's `uStretch` reads `--motion-weight` as a uniform |
| press (`useLiquidPress`) | YES (squish-only, 1.04) | KEEP — small gel, weight-couple gently |
| pager worm (goo-morph) | OWN `--pager-worm-flow` curve | KEEP independent (observer-ish — JUDGE-1 §6) |
| dock fission (`useLiquidMorph`) | YES (1.08/1.1) | KEEP |
| drag-morph (`useDragMorph`) | YES | KEEP |
| **sheet/drawer grow** (the Maps-card reference) | drawer rides `DRAWER_SNAP` spring — NO velocity-squish | **GAP — the sheet should squish as it grows (the Maps-card reference is the inertial-mass sheet). Wire `useLiquidFlex` on the drawer's size span (the height axis), driven off the snap spring's per-frame value.** |
| **route/page transitions** (`/motion` deck-scroll) | spring clocks only, no squish | **GAP (lower priority) — a page-build that squishes on entry reads gooier. Candidate, weight-gated low (it's semi-observer).** |

**Verdict:** useLiquidFlex is wired on MOST driver-morph surfaces but the DRAWER/SHEET grow (the Maps-card golden reference) is the notable gap. The golden's wave-amendment books the drawer-squish as the one new wiring (composing the EXISTING `useLiquidFlex` off the EXISTING `DRAWER_SNAP` spring — no new primitive). Everything else is already wired; the golden's contribution is COUPLING all of them to `--motion-weight`.

---

## 6. CROSS-ENGINE (Chrome + Safari) — already safe, kept safe

- `linear()` springs + `--ease-cartoon-punch`: Baseline 17.2+ (WebKit-safe), plain `linear()`, no `-webkit` prefix, no unsupported function. JUDGE-1 §7 confirmed live.
- They drive **transform/opacity ONLY** (both engines). The cartoon-shadow MOVING cast is a `transform` on a `::after` caster layer — NEVER an animated `box-shadow` (paint-bound; §Shadows line 413). The squish is `--stretch` reciprocal `scale` (compositor). NO `backdrop-filter:url`, NO per-frame re-blur.
- `--motion-weight` as a typed `@property` `<number>`: registered crosses Baseline 2024-07; on a non-supporting engine the unregistered `var()` fallback (0.62) is SAFE — the squish still reads, just non-animatable. (Same fail-safe `--ui-scale` documents.)
- The metaball merge stays the static-SVG-goo / sRGB-interp / compositor-only path (the meatballing law) — `--motion-weight` enters as a shader uniform, not a filter change.

---

## 7. THE DELTA-ASSAY → the wave amendment (UNION, no dup vs the 116 union waves)

The golden does NOT re-run anim-ios27-tune (DONE, JUDGE-1 PASS). It AUGMENTS it with the governing layer that was speced but never landed:

| Wave | status | golden's amendment |
|---|---|---|
| `W-ANIM-IOS27-TUNE` | DONE (springs + caps landed, JUDGE-1 PASS) | UNION — freeze its `(response,ζ)` table + lifted caps as the SUBSTRATE this golden's weight-scalar multiplies. NO re-edit of the 6 rows. |
| **NEW: `W-MOTION-WEIGHT`** | born RED (token empty live) | land `--motion-weight` typed `@property` (1/φ rest) in `property-regs.css §18`; wire it into `useLiquidFlex`'s effective cap; PRM one-line cascade zero; scope-override examples (dock→1, observer→0.15); `proof:motion-weight-universal`. |
| **NEW: `W-CARTOON-PUNCH`** | born RED (token empty live) | land `--ease-cartoon-punch` raw shaped `linear()` (negative anticipation leg + ~+22% punch) via the generator's new RAW arm; weight-couple its loudness; PRM→`--ease-standard`; `proof:cartoon-punch`. |
| **NEW: `W-MOTION-WEIGHT-DRAWER`** | born RED (drawer has no squish) | wire EXISTING `useLiquidFlex` on the drawer/sheet height span off `DRAWER_SNAP` (the Maps-card inertial-grow gap from §5). |
| **NEW: `W-MOTION-DOC-SYNC`** | RED (DESIGN.md §L2 prose stale) | rewrite §L2's "Three canonical springs" table to the LANDED pole (the live 0.40-0.66s clocks + the 6-row register), retiring the stale ζ0.65/0.45 prose. `proof:design-md-current` re-greens. |

No duplication: every NEW wave lands a token/scalar that is EMPTY on `:root` today (assayed live) — it cannot duplicate what does not exist. The springs + caps are FROZEN (union with anim-ios27-tune), the worm is independent (JUDGE-1 §6), the press/morph/tab consumers are KEPT and merely weight-coupled.

---

## 8. THE GESTALT — live-judged as a user (the bar)

Judging the dock/overview screenshot + the JUDGE-1 frame-series AS A USER: the dock collapsed-pill, tab glide, press, and worm ALREADY read weighty (the anim-ios27-tune landed). The remaining "tight" tells are: (1) the sheet/drawer grows without squish (snaps to its detent — the Maps-card reference grows with inertial mass); (2) there is no PROPORTIONED loudness dial, so a celebration reads the same weight as a hover (no punch register); (3) the goo is per-surface-capped, not cascade-governed, so a designer can't make a whole subtree gooier in one line. The golden closes all three with ONE scalar + ONE raw curve + ONE drawer wiring — and ZERO new engines. A tight snap anywhere = FAIL; after this golden, the cascade GUARANTEES weight on every driver (0.62 floor) and reserves the punch for the loud moments. That is the iOS-27 feel, proportioned by φ, governed by one number.

---

## 9. THE NO-FORK / NO-LEGACY DISCIPLINE (binding)

- ZERO new spring family, ZERO second squish engine (the weight is a FACTOR on the ONE `useLiquidFlex` cap), ZERO new compose recipe. `--ease-cartoon-punch` is a RAW token (no `MotionCurveKind` extension — the closed union holds).
- `--motion-weight` reuses the EXACT `--ui-scale` typed-cascading-scalar idiom (property-regs §18) — not a new pattern.
- The drawer-squish composes the EXISTING `useLiquidFlex` off the EXISTING `DRAWER_SNAP` — no new primitive.
- The generator grows ONE raw-emit arm (DRY: one `linear()` authority, springs + shaped).
- NO legacy: DESIGN.md §L2 stale prose is REWRITTEN to the landed pole, not kept as a dual. The anim-ios27-tune table is FROZEN and built UPON, never re-forked.
- Glass is untouched (motion-only golden) — the BA.W-NO-GRAY warm floor + six-layer composite stand; the motion SERVES the glass so it reads ALIVE.
