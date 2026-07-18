# GF-HANDMARK — greenfield design, PASS 3 (Fable seat, CRIT2-amended)

Third pass of the design-loop charter (`PROMPTS/design-loop-prompt.md`) on the handmark greenfield.
Inputs read in full: `GF-HANDMARK-PASS1.md` (the leading spec, self-scored 55%), `GF-HANDMARK-CRIT2.md`
(the fresh critic, re-scored ≈48%, ADVANCE-AMENDED on four points), `ADJUDICATION-1.md` (lead standing:
handmark pass-1 55% → pass-2 critic dispatched, assume-wrong), `ios27/IOS27-CODEX.md` (law 10 type
ladder / no meta captions, law 8 staggered entry), `FEEDBACK-LEDGER.md:46-52` (F34-F40) + the seven
stills READ (not paraphrased), and the shipped family at HEAD (`codex/bi-p-q-execution`):
`src/components/handmark/{HandMark.vue,brush.ts,ink.ts,noise.ts,geometry.ts,texture.ts,constants.ts,
types.ts,composables/useHandMark.ts}` + `demo/stories/motion/handmark.vue`. Substrate re-verified on
disk: `@mkbabb/pencil-boil@0.9.2` — `ellipsePoints` (`path.ts:296`), `createStrokeDrawIn`
(`vue.ts:656`), the census dead-set (`round-1/component-surface---overfit-census.md`).

TRANCHE-DEVELOPMENT: no source touched; this doc is the only artifact. **No browser this seat** (a
Playwright suite owns it) — every π stays OWED, exactly as passes 1-2 conceded, and convergence is
capped accordingly. What pass 3 CAN resolve on-disk is the design underbelly CRIT2 flagged (fill-vs-
stroke by the stills-read, the vbH retract, the weight axis, the census fix, the ring toggles, the
containment spec, the brush register); what it CANNOT is the live tuning capture.

---

## 1. Critique adjudication — every CRIT2 charge, one row, no silent drops

CRIT2 §1 ("what pass-1 got RIGHT") is a block of confirmations, not charges: F34/F36/F38/F39/F40 roots
verified, substrate real, the calm/containment/shape-degrade/de-jargon spine sound, portfolio discipline
good, π honestly OWED. **All carry forward unchanged.** The charges are CRIT2 §2-§8 + the gate audit §9
+ the pass-3 deliverables §11; each below.

| # | CRIT2 charge | verdict | forced design change / evidence |
|---|--------------|---------|----------------------------------|
| C1 | **F1 (headline):** "universal filled ribbon" is under-justified and runs AGAINST the stills — the four `ribbon:'hull'` brushes (boil F34, crayon F38, marker F38, highlighter F36) are the four ugliest; the two `ribbon:'stroke'` brushes (pen F35, pencil F38) are the least-bad. Fill-everything imports the hull's real failure modes into pen/pencil. | **ACCEPTED** | The stills ARE the evidence — no live capture needed to read that hull=blob, stroke=line in this corpus. Fill demoted from co-equal cure to a per-brush strategy. Pen/pencil STAY calm low-weight strokes; fill is reserved for the one brush where width-variation IS the character (highlighter slab). §3.3, §4. The `G-NO-DOUBLE-LINE` gate (which existed only to justify fill) retires into `G-CALM`+`G-WEIGHT` (§10). |
| C2 | **F2a:** the F35 "double-line" root does not survive HEAD — the `vbH` patch (`HandMark.vue:80-89`, applied `geometry.ts:98-101`) already equalises x/y marking-space scale for text-mode underline, so the wobble is NOT differentially x-stretched at HEAD. The "double-line" is itself an inference, not the user's words ("more pen-like, more natural", `FEEDBACK-LEDGER.md:47`). | **ACCEPTED** | x-stretch RETRACTED as an F35 cause. Reading F35 (image): one wobbly line, faint doubling only at the left curve. Root re-attributed: over-wobble (`roughness:0.7`,`wobble:1.2`, `brush.ts:124-126`) + over-weight (`weight:6`) on a display line. Cure = calm centerline (§3.1) + thin weight (§3.2), NOT fill, NOT uniform space. |
| C3 | **F2b:** deleting `vbH` + `preserveAspectRatio="none"` (PASS1 §4.3) is the riskiest pillar with the least payoff — text-mode aspect is already handled by `vbH`, and the positioned box/circle path DEPENDS on the none-stretch (`geometry.ts:78,101`; `HandMark.vue:77`). A net-neutral-to-negative refactor plus a live box-mode regression. | **ACCEPTED** | The uniform-space pillar is **RETRACTED in full.** `vbH` and `preserveAspectRatio="none"` STAY. F35 is cured by §3.1+§3.2 alone. The only surviving positioned shape is `circle` (box/bracket retire, C-row C9), so the datum path that depends on the none-stretch is now just the ring — its geometry drawn explicitly at §7.1. Zero deletion of the aspect apparatus. |
| C4 | **F3:** WEIGHT/thinness is the missing axis and the missing gate. The worm (F34) and blobs (F38) are above all FAT (boil 7, crayon 16, marker 12, highlighter 26 vs a believable ~2). PASS1's three axes omit absolute weight. Weight semantics are also inconsistent (`stroke` = screen px via `non-scaling-stroke`, `HandMark.vue:291-294`; `hull` = viewBox units that stretch). | **ACCEPTED** | WEIGHT added as a first-class axis (§3.2) with a stated pen target (~2-2.5px, a fraction of glyph stroke width, down from 6) and a **`G-WEIGHT`** born-RED gate (§10). Weight semantics UNIFIED: line-brushes carry px weight (non-scaling-stroke); the highlight band's height is expressed line-box-relative (§5), never a stretchy viewBox weight. |
| C5 | **F4:** census slip — PASS1's "11 dead props" enumeration is 12 items and mis-includes `amplitude`. The census dead-set is exactly `{boilFps, boilFrames, drawDelayMs, drawMs, jagged, natural, overrides, path, points, roughness, segments}`; `amplitude` is listed non-dead (set by the demo). | **ACCEPTED** | Verified against `round-1/component-surface---overfit-census.md` (the "algorithm-knob-leak" finding). Stated straight at §8: **11 census-dead + `amplitude`/`appear` retired-on-merit (they die with `natural`/the auto-appear default) → delete 13, keep ~5 real props.** No laundering "retire-on-merit" as "census-dead". |
| C6 | **F5a:** ring novelty over-claimed — `ellipsePoints` ALREADY sweeps `2π+(0.05..0.17)` (`path.ts:306`), so the overshoot/self-cross is in the substrate. The real F39 fixes are three verified toggles, not "draw an open loop". | **ACCEPTED** | Confirmed on disk: `path.ts:306` `sweep = Math.PI*2 + (0.05 + rng()*0.12)`, comment "overshoot → hand-circled". Ring cure reframed as exactly three toggles (§7.1): drop `grain:0.7→0` (`brush.ts:222`), flip `z-index:-1→front` (`HandMark.vue:338`), keep the substrate overshoot. "Awful smoothing" (F39) = the grain fray on a thin ring; removing grain is the smoothing fix. |
| C7 | **F5b:** the curvature-pressure cut (PASS1 §4.3, "cut `addPressure`'s curvature coupling") is not an independent cure — once the centerline is calm, `k≈0` everywhere → pressure floors to `PRESSURE_BASE` (`ink.ts:101-118`) → the coupling is already a near-no-op. Over-counting of "three independent cures". | **ACCEPTED** | Downgraded from independent cure to a coupled consequence. `addPressure`'s curvature term (`ink.ts:117`, `PRESSURE_BASE*(1-2.5*k)`) is replaced by an arc-length pressure PROFILE (§3.4) — a positive design choice, not "cut a knob that no longer fires". |
| C8 | **F6:** the highlight-containment vs intentional-multiply tension is asserted, not drawn (concur+sharpen). The fix must simultaneously (i) kill the vertical escape, (ii) preserve the round end-cap horizontal overshoot `overflow:visible` exists for (`HandMark.vue:320-327`), (iii) keep the multiply compositing against the page. A naive inset clips (ii). | **ACCEPTED** | Drawn concretely at §5: a two-layer guarantee — the band height is line-box-relative (bounded by construction) AND an **asymmetric** clip `inset(0 -8px 0 -8px)` (0 top/bottom = clip to the line box vertically; −8px left/right = loose, caps spill). `clip-path` establishes no stacking context, so the multiply still hits the page. The escape becomes structurally impossible (§5). |
| C9 | **F7a:** the brush register (PASS1 §4.5, "cut boil/crayon/marker/ring to overrides") is the critic-default, not a demonstrated verdict — the one decision that sets the final surface, unearned this seat. | **ACCEPTED-and-RESOLVED** | Resolved via the stills-read (the same evidence CRIT2 used to demote fill): the four disaster stills ARE the demonstration. Final register = **pen · pencil · highlighter** (3 named) + `Partial<Brush>` override. boil/crayon/marker/box/bracket retire with named cures (§4). This is the user's literal ask ("each one generally awful → greenfielded"): 7 brushes → 3. |
| C10 | **F7b:** B (corpus) and D (type) are one-paragraph slogans, not competitors developed far enough to expose their gaps — the charter wants independent development before cross-pollination. | **ACCEPTED (capped)** | Conceded: this seat does not develop B/D into competitors either (no corpus/font source materialises on-disk). They are demoted from "banked-alive routes" to an **appendix of fallbacks with named reopen conditions** (§12), honest about the cap. The charter's independent-development bar is the one open-process gap pass 3 does not close. |
| C11 | **Gate audit §9:** `G-NO-DOUBLE-LINE` root contested (⚠️); `G-PROPS` RED-cause says "11 dead" but enumerates 12 (⚠️); `G-WEIGHT` MISSING (❌). | **ACCEPTED (all three)** | `G-NO-DOUBLE-LINE` retired into `G-CALM`+`G-WEIGHT` (C1/C2). `G-PROPS` RED-cause restated as "19 props, 11 census-dead" (C5). `G-WEIGHT` added (C4). Gate suite at §10. |

**Pass-3 deliverables (CRIT2 §11) discharge:** 11.3 (reconcile uniform-space/`vbH`) → §3, C3 (RESOLVED: retract).
11.4 (draw highlight-containment) → §5 (RESOLVED). 11.5 (draw open-loop ring) → §7.1 (RESOLVED, 3 toggles).
11.7 (fix census enumeration) → §8 (RESOLVED). 11.2 design-half (weight axis + `G-WEIGHT`) → §3.2/§10
(RESOLVED); 11.2 capture-half (fill-vs-stroke live A/B) → **the stills-read RESOLVES the verdict** (fill
loses; §4), the paired capture stays OWED. 11.1 (capture RED baselines π-PEN/π-CALM/π-CONTAIN) →
**OWED** (no browser). 11.6 design-half (retune boil/crayon/marker or cut) → §4 (RESOLVED: cut); capture-
half → OWED. 11.8 (develop B/D) → §12 (demoted, NOT developed — the honest cap).

---

## 2. The revised reframe — four independent axes (weight is now first-class)

Naturalness is decomposed on FOUR axes (pass 1 had three; C4 adds WEIGHT), each independently mis-set in
the shipped family:

1. **CENTERLINE** — near-straight, LOW-frequency drift (≤1.5 gentle arcs, peak ≤1.5% of span), settling
   to baseline at both ends. Shipped: 4-octave value-noise at 5% span (`constants.ts:57-61`) → the F34
   worm, the F35 wobble.
2. **WEIGHT** — thin, glyph-relative, ONE consistent unit. Shipped: fat (7/16/12/26) in mixed units →
   the F34 worm, the F38 blobs.
3. **FILL-STRATEGY** — stroke by default; fill only where width-variation IS the character (the highlight
   slab). Shipped: four brushes fill hulls → the four ugliest stills (C1).
4. **CONTAINMENT** — line-box clip (F36), one consistent front z (F39), shape-appropriate geometry that
   degrades below min-span (F40). Shipped: `overflow:visible`+no clip, `z-index:-1`+grain, box-over-1ch.

The reframe BESTs the current design because the fix is DELETION-heavy (value-noise, the stroke/hull
split's fill-everything ambition, the se-guard, the box/bracket shapes, 13 props) + a small retune (drift
constant, pen weight, arc-length pressure) + two contained additions (the weight gate, the clip). The
load-bearing primitives all EXIST: `wobbleLinePoints` at low roughness (`path.ts:89`), the plain stroked
path, `getStroke` for the one surviving fill, `createStrokeDrawIn` for draw-on. No step reads "and then
compute naturalness".

---

## 3. The natural-stroke synthesis model

### 3.1 Centerline — the calm drift (retire the value-noise)
Replace `naturalUnderlinePoints` (`noise.ts`) with pencil-boil's `wobbleLinePoints` at **`roughness ≈
0.22`**: `maxDisplace = roughness × span × 0.015` (`path.ts:89`) ⇒ ≈0.33% span peak drift — one gentle
arc, no octave sum, no period to detect at ≤1.5 arcs. The endpoint-settle idea from `noise.ts:117-123`
survives (ends anchored to baseline so draw-on has no pop); the octave machinery, the `natural` prop, and
the whole `boil` auto-engage (`useHandMark.ts:113`) die with it. The centerline stays **monotonic in x**
(a drift, not a loop) — this is what makes F37's draw-on connected (§6).

### 3.2 Weight — the missing axis, unified (C4)
Weight is first-class and carries ONE meaning per body strategy:
- **line-brushes (stroke)** — weight is **screen px** (bound to `stroke-width` under
  `vector-effect:non-scaling-stroke`, `HandMark.vue:291-294`, unchanged). Pen target **~2.5px** (down from
  6); pencil ~2px. Stated relation: a hand underline reads pen-like at roughly a fraction of the glyph's
  own stroke — a display-3 heading stroke is ~6-8px, so the mark sits at ~1/3 of it, present but not
  competing. `G-WEIGHT` gates this (§10).
- **the highlight band (fill)** — height is **line-box-relative** (§5), NOT a viewBox `getStroke` size
  that stretches. This is the semantic-unification C4 demands: no brush carries a weight whose rendered
  size depends on the `preserveAspectRatio="none"` stretch.

### 3.3 Fill-strategy — stroke default, fill only for the slab (C1)
`ribbon` is no longer a per-brush aesthetic toggle that four brushes flip. The rule: **stroke unless
width-variation is the identity.** pen/pencil = stroke (least-bad in the stills, and at low weight a
stroke and a `getStroke` fill are visually near-identical, so the fill buys nothing and imports the tiny-
span vanish, C1). highlighter = fill (a slab IS variable-width character). Nothing else fills. The
stroke/hull split collapses to: line-brush path vs highlight-band path.

### 3.4 Pressure & velocity — the arc-length profile (replaces curvature coupling, C7)
A static geometry has no captured velocity, so velocity is expressed as its natural PROXY — the arc-length
pressure profile of a confident hand stroke: **lift-on** (thin start, ~slow accel), **press-through**
(full weight, the fast confident middle), **run-out** (decelerating taper to thin). This is the
`TaperSpec` (`brush.ts:24-31`) already in the model, driven by arc-length, NOT by curvature
(`ink.ts:117`'s `PRESSURE_BASE*(1-2.5*k)` retires — C7: on a calm centerline it was a near-no-op anyway).
For line-brushes the taper is a subtle end-lift; for the highlight slab it is the marker lead-in/dry-run-
out. No thinning at micro-wobbles because there are no micro-wobbles now.

### 3.5 Jitter — micro-life, bounded
A single seeded `perturbPoints` pass (`ink.ts:166-174`, amount `weight × 0.06`) survives as the micro-
life that keeps the mark from reading as a vector primitive — but at the new low weight the perturb
amount is proportionally small. Determinism is the house `mulberry32`
(`src/composables/glass/procedural/prng.ts`), one seed leaf, unchanged. Jitter is the ONLY stochastic
axis; the centerline drift is deterministic-per-seed, not noisy.

---

## 4. Per-brush identity — every brush, its failure named, its cure

The final register is **pen · pencil · highlighter** + `Partial<Brush>`. The other five retire; each has a
named disposition (the user's "each one generally awful" is answered brush-by-brush, not by a blanket cut).

| brush/shape | still | failure named (file:line) | cure / disposition |
|-------------|-------|---------------------------|--------------------|
| **pen** (default) | F35 | over-wobble + over-weight read as a faint double line: `roughness:0.7`,`wobble:1.2`,`weight:6` (`brush.ts:124-127`) on a display line | KEEP as stroke. `roughness→0.22` (§3.1), `weight→2.5` (§3.2), arc-length lift-on taper (§3.4). One confident thin line. |
| **pencil** | F38 (thin grey line — least-bad, reads fine) | none critical; over-weight relative to the target | KEEP as stroke. Its dry tooth-grain (`grain:0.5`, `brush.ts:169`) is its character — retained; calm the centerline, `weight→2`. The one brush that already nearly works. |
| **highlighter** | F36 | `weight:26` low-seat hull under `overflow:visible`+no clip+no isolation (`brush.ts:261`; `HandMark.vue:308-327`) escapes below the card | KEEP the fill + multiply (intentional, codex law 1 "multiply against the page"). CONTAIN structurally (§5). Height line-box-relative, not weight-26 viewBox. The one legit hull brush. |
| **crayon** | F38 | fat RED blob over the "y" descender: `weight:16`,`wobble:3.0`, 2 passes hull (`brush.ts:183-201`) | **RETIRE** as a named default. Unsalvageable at weight 16. The "waxy" feel is available as `<HandMark :brush="{ grain:0.85, grainFreq:0.16, weight:4 }">` — grain provides wax, not a fat hull. |
| **marker** | F38 | flat GREEN lozenge/slab: `weight:12`, square-cap hull (`brush.ts:234-251`) reads as a bar | **RETIRE** as a named default. A saturated slab is `highlighter` with `blend:'source-over'` + a fill color — folds into the highlight family as a Brush override, not a taxonomy row. |
| **ring** (shape:circle) | F39 | torn rust ellipse, mis-layered behind glyphs: `grain:0.7` (`brush.ts:222`) frays the thin ring; `z-index:-1` (`HandMark.vue:338`) sits it behind the glyphs | KEEP the shape; three toggles (§7.1): `grain→0`, `z→front`, keep the substrate overshoot (`path.ts:306`). A clean hand-loop ON the page. |
| **boil** (brush) | F34 | fat white worm: `ribbon:'hull'`+value-noise auto-engage, `weight:7` (`brush.ts:139-157`) fills a blobby hull on a curvy span | **RETIRE** the brush + the value-noise + the `natural` prop entirely. The "procedural underline" character is subsumed by the pen's calm-drift centerline (§3.1) — there is no separate boil voice. |
| **box** (shape) | F40 | green sliver over "a": 4 wobble sides collapse over ~1ch; the se-guard falls to a thin vertical stroke (`geometry.ts:143-155`; `ink.ts:203-210`) | **RETIRE** the shape. A box over 1ch is a sliver by geometry. Replaced by shape-degrade (§7.2). |
| **bracket** (shape) | F40 | red sliver over "it": same collapse (`geometry.ts:156-167`) | **RETIRE** the shape. Same as box. |

**The se-guard dies too.** It is the family's one masked fallback (`ink.ts:195-210` — a degenerate hull
falls back to a stroked sliver), directly against the no-masking-fallback edict. With the hull brushes
gone (only the contained highlight fills) and box/bracket gone, the degenerate-outline case that motivated
it no longer arises; a sub-min-span datum degrades its SHAPE (§7.2), it never falls its ink back.

---

## 5. Isolation guarantee — F36's escape made structurally impossible

The escape (F36 image: a torn gold arc below the card's bottom border) is the `weight:26` band under
`overflow:visible` (`HandMark.vue:327`) with no clip. Two independent bounds, either one sufficient:

1. **Geometry bound.** The highlight band is no longer a `weight:26` `getStroke` hull in viewBox units
   (which stretches under `preserveAspectRatio="none"` to arbitrary height). Its height is derived from
   the MEASURED line box — a band from the baseline up to ~x-height, expressed as a fraction of the `.hm`
   box height (the `HIGHLIGHT_RISE`/`baselineFrac` machinery already measures this, `constants.ts:30`,
   `geometry.ts:139-141`). A band bounded to the line box CANNOT paint below the line box.
2. **Clip bound (the belt).** An asymmetric clip on the band svg:
   `clip-path: inset(0 -8px 0 -8px)` — **0 top/bottom** clips exactly to the `.hm__svg` box (which is the
   line box: `top:0; height:100%`), killing any vertical escape; **−8px left/right** stays loose so the
   round end-caps overshoot horizontally (preserving what `overflow:visible` existed for, C8-ii). Even a
   mis-tuned geometry cannot escape past the clip.

Why the multiply survives (C8-iii): `clip-path` does NOT establish a stacking context (only
`opacity<1`/`transform`/`filter`/`isolation`/`mix-blend-mode` do). The band keeps `mix-blend-mode:multiply`
+ `z-index:-1`, and `.hm` keeps NO `isolation:isolate` (`HandMark.vue:312-316`), so the blend still
composites against the page backdrop. The clip bounds the paint REGION; it does not wall the blend. F36
becomes impossible whether the geometry is right or not — the escape has no path to the pixel.

---

## 6. Draw-on model — F37's detached fragments cured

F37 (image: a curl, a gap, a tiny dash) is the `pathLength="1"` + `stroke-dasharray:1;
stroke-dashoffset:1` reveal (`HandMark.vue:349-356`) sweeping over a high-excursion, self-crossing value-
noise Catmull-Rom path: a normalized-length dashoffset over a path that loops back on itself reveals
disconnected visual pieces. Two moves:

1. **The centerline is now monotonic-in-x and calm (§3.1)** — no loops, no self-crossing. A left-to-right
   dashoffset sweep reveals ONE connected growing segment by construction. This alone removes the fragment
   read; F37 is primarily a centerline defect surfaced by the reveal.
2. **Adopt pencil-boil `createStrokeDrawIn`** (`vue.ts:656`, verified) for the sweep instead of the hand-
   rolled `pathLength="1"` CSS: it measures the REAL path length via `getTotalLength()` (not a normalized
   1), tweens dashoffset `length→0`, and on completion clears the array outright
   (`strokeDasharray:'none'`, `vue.ts:670-672`) so the settled stroke is solid even when the length is
   approximate — the exact defect (a dash-gap at rest) the current mechanism risks. It is PRM-aware
   (paints the solid end state at once). This is the one surviving animation; `boil`/`draw-then-boil`
   retire with the boil brush.

The grained clip-path wipe (`HandMark.vue:358-365`) survives only for pencil (the one grained line-brush);
never dashoffset under a filter, unchanged.

---

## 7. Layering / z model + shape-degrade

### 7.1 The ring — F39's torn-and-mislayered cure (three toggles, C6)
The substrate already does the hard part: `ellipsePoints` sweeps `2π+(0.05..0.17)` past the start
(`path.ts:306`), so the hand-circle overshoot/self-cross is NOT new work. The three verified toggles:
- **grain `0.7 → 0`** (`brush.ts:222`). The `grain:0.7` feDisplacement fray on a thin ring is the "torn"
  read AND the "awful smoothing" (F39); a clean ring needs no grain.
- **z `-1 → front`.** `HandMark.vue:331-339` sits circle/box/bracket at `z-index:-1`, so the whole ring
  is behind the glyphs and vanishes under fat letters. A margin annotation sits ON the page: render the
  ring in FRONT of the text at low alpha (`opacity:0.55`, `brush.ts:219`, kept) — a suggestion pointing at
  the datum, not a slab competing with it. ONE consistent z, no half-behind/half-front tearing.
- **keep the overshoot + `vector-effect:non-scaling-stroke`** — the ring stays aspect-stable (the stroke
  band does not stretch under the none-stretch, `brush.ts:207-210`). This is the ONLY positioned shape
  that keeps `preserveAspectRatio="none"` (C3): the datum-rect map is unchanged, drawn here explicitly so
  the retract-vbH decision does not leave the ring geometry unspecified.

### 7.2 Shape-degrade — F40's slivers cured (replaces box/bracket)
box/bracket retire (§4). Below a min-span threshold (**~2ch**), a datum mark does NOT attempt a box (a
sliver by geometry) — it DEGRADES its shape to one that reads at 1ch: an **underline tick** (a short calm
line under the datum) or a **small circle** (the ring, at datum scale). A SHAPE rule keyed to measured
span, not the se-guard's ink fallback. Above ~2ch, `circle` is available; box/bracket are simply gone. The
degrade paints a band ≥ a legibility floor and never covers a descender (`G-NO-SLIVER`, §10).

---

## 8. Prop surface — census-accurate (C5)

The census dead-set is exactly the **11**: `{boilFps, boilFrames, drawDelayMs, drawMs, jagged, natural,
overrides, path, points, roughness, segments}` (`round-1/component-surface---overfit-census.md`,
"algorithm-knob-leak"). Plus `amplitude` (dies with `natural`) and `appear` (folds to a sensible default)
**retired on merit** — stated as retire-on-merit, NOT laundered as census-dead. Delete **13**, keep **~5**:

| prop | values | note |
|------|--------|------|
| `brush` | `pen`(default) · `pencil` · `highlighter` · `Partial<Brush>` | the three that read natural; crayon/marker/boil are Brush-object overrides, not rows |
| `shape` | `underline`(default) · `strike` · `highlight` · `circle` | box/bracket retired (§7.2); sub-2ch degrades (§7.2) |
| `color` | any CSS color (default `currentColor`) | unchanged |
| `animation` | `none`(default) · `draw-on` | via `createStrokeDrawIn` (§6); boil/draw-then-boil retired |
| `seed` | number | hidden determinism input, not a tuning knob |

DELETE (13): `roughness, segments, jagged, natural, overrides, path, points, boilFps, boilFrames,
drawDelayMs, drawMs, amplitude, appear`. The `Brush` model shrinks from 16 scalars + 4 enums
(`brush.ts:33-80`) to the ~6 the surviving bodies read (weight, taper, opacity, blend, a pressure-profile,
grain-for-pencil). `G-PROPS` (§10).

---

## 9. Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CONTRACT-LOCK | freeze §4 register + §8 surface; author all born-RED gate scaffolds (RED at HEAD) | gate suite compiles + all RED | — |
| **W1** | CALM-CENTERLINE + WEIGHT | retire `noise.ts` value-noise → `wobbleLinePoints@0.22`; pen `weight→2.5`; arc-length pressure profile; delete `natural`/`amplitude` machinery | G-CALM, G-WEIGHT | π-CALM, π-PEN |
| **W2** | FILL-STRATEGY | pen/pencil stay strokes; retire boil/crayon/marker brushes + the stroke/hull split + the se-guard | G-NO-SLIVER | π-DATUM |
| **W3** | CONTAIN-HIGHLIGHT | line-box-relative band height + the asymmetric clip; keep the page multiply | G-CONTAIN | π-CONTAIN |
| **W4** | RING-LAYER + SHAPE-DEGRADE | ring: grain→0, z→front, keep overshoot; box/bracket retire → sub-2ch degrade | G-RING-LAYER, G-NO-SLIVER | π-RING, π-DATUM |
| **W5** | DRAW-ON | adopt `createStrokeDrawIn`; retire the hand-rolled `pathLength=1` + boil animations | G-DRAW-CONNECTED | π-DRAW |
| **W6** | SURFACE + DEMO-DE-JARGON | the first-principles surface (~5-prop target; the USER RULING grants this greenfield full surface authority); shrink the Brush model; rewrite `handmark.vue` copy to the editorial voice (codex law 10) | G-PROPS, G-NO-JARGON | π-GALLERY |
| **W7** | CONSUMER + FINAL | re-point `handmark.vue`; overfit audit (≥2 sites/exported/private-helper); FINAL.md | G-CONSUMER, overfit-audit | π-GALLERY |

---

## 10. Born-RED gate sketches (each names its RED-at-HEAD condition; small, per the gates-abrogation mandate)

`G-NO-DOUBLE-LINE` is **retired** (C11): its causal story (x-stretch) did not survive HEAD and its cure
(fill) is demoted; the "one confident line" property is covered by G-CALM + G-WEIGHT.

- **G-CALM** — the underline centerline has ≤1.5 perpendicular sign changes and peak excursion ≤1.5% of
  span. *RED today:* `noise.ts` sums 4 octaves at amp 5% span (`constants.ts:57,61`) — the F34 worm / F35
  wobble. Hard scalar predicate on the emitted point-set, headless-checkable.
- **G-WEIGHT** (NEW, C4) — a line-brush (pen/pencil/underline/strike) renders at ≤ a stated legibility
  ceiling (~3px, or ≤1/6 of the measured x-height), one consistent unit. *RED today:* boil 7 / crayon 16 /
  marker 12 (`brush.ts:140,183,234`).
- **G-NO-SLIVER** — a mark over a sub-2ch datum degrades its shape and paints a band ≥ a legibility floor,
  never covering a descender. *RED today:* box→se-guard sliver (`ink.ts:203-210`, F40); crayon blob over
  the "y" (`brush.ts:183-201`, F38).
- **G-CONTAIN** — the highlight band never paints outside the word's line box vertically, while the
  multiply still composites against the page. *RED today:* `overflow:visible` + no clip
  (`HandMark.vue:327`), escape below the card (F36).
- **G-RING-LAYER** — the ring paints at ONE z, in FRONT of the text, unfragmented (grain 0). *RED today:*
  whole ring at `z-index:-1` (`HandMark.vue:338`) + `grain:0.7` (`brush.ts:222`) = torn/behind (F39).
- **G-DRAW-CONNECTED** — a draw-on underline reveals as ONE connected growing segment (monotonic coverage
  from one end), no detached fragments mid-draw, and settles solid (no dash-gap at rest). *RED today:*
  `pathLength="1"` + `dasharray:1` over a self-crossing value-noise path (`HandMark.vue:349-356`, F37).
- **G-PROPS** — HandMarkProps at the first-principles surface (~5 working target; the USER RULING
  grants full surface authority — the design loop derives the final set), ZERO surviving props with
  0 repo consumers. *RED today:* 19 props, 11 census-dead
  (`round-1/component-surface---overfit-census.md`).
- **G-NO-JARGON** — the demo copy contains no internal spec terms (SE-guard, hull, excursion, byte-
  identical, wobble÷stroke) and no mono ALL-CAPS caption (codex law 10). *RED today:*
  `handmark.vue:37,50,66,119,150`.

---

## 11. π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)

Every π is OWED (no browser this seat — the primary cap, unchanged from passes 1-2). Serialize the browser
seat (browser-seat-singleton memory); run live π per band.

- **π-CALM** — the reduced underline: prove ≤1.5 arcs / ≤1.5% excursion (paired vs F34 worm).
- **π-PEN** — the pen underline at `weight~2.5`: prove ONE confident thin line, no double/lens (paired vs F35).
- **π-CONTAIN** — the highlight over a word near a card edge: prove no vertical escape, multiply still
  hitting the page (paired vs F36).
- **π-DATUM** — a mark over a sub-2ch datum: prove a legible degraded shape, no sliver, no descender cover
  (paired vs F38 crayon + F40 slivers).
- **π-RING** — the circle: prove front-z, single-layer, untorn, grain-free (paired vs F39).
- **π-DRAW** — the draw-on: prove one connected growing segment, settles solid (paired vs F37).
- **π-GALLERY** — the surviving-brush gallery (pen/pencil/highlighter): prove each distinct AND natural,
  de-jargoned copy (paired vs F38 + F40 captions).

---

## 12. Banked routes — demoted to appendix (C10)

Neither B nor D was developed into a competitor this seat (no concrete source materialised on-disk); they
are fallbacks with named reopen conditions, not live routes. This is the one open-process gap pass 3
concedes honestly rather than papering over.

- **B (recorded corpus): FALLBACK.** The authentic-ceiling backstop IF the calm procedural centerline
  still can't pass π-PEN/π-CALM by a live seat. Reopens on a concrete stylus-capture source + a bundled
  gesture corpus. Shares §4's stroke inking → a skeleton swap, not a rewrite.
- **C (coverage field): BLOCKED** (unchanged). Reopens only on a concrete field→body primitive that is not
  equal-difficulty to the problem and does not reintroduce the Safari filter-stack risk.
- **D (hand-mark type): FALLBACK.** Could SUPPLY the highlight/circle primitives (a designed slab reads
  better than a computed one) and COMPOSE under §4 rather than compete. Reopens if the computed
  highlight/circle fail π-CONTAIN/π-RING on a live seat, or on a font-authoring source + a span-fit answer.

---

## 13. Self-critique (failure-mode checklist)

- **Vacuous convergence:** avoided — PASS 3, ~68%, not a convergence claim; the π cap is stated as the
  gating gap.
- **Spec-cites-itself circularity:** the reframe cites the seven stills + shipped file:line + the census +
  pencil-boil's real API (`path.ts:306`, `vue.ts:656`) + codex law 10 — not itself. Clean.
- **Gates that cannot fail:** each names a RED-at-HEAD file:line; G-CALM (sign-change + excursion), G-WEIGHT
  (px/x-height bound), G-DRAW-CONNECTED (coverage-monotonicity) are hard scalar predicates on emitted
  geometry, headless-checkable.
- **Elegant-reduction trap:** the load-bearing primitives EXIST (`wobbleLinePoints@0.22`, the stroked
  path, `getStroke` for the one slab, `createStrokeDrawIn`). No step reads "and then compute naturalness".
  The one thing that could still fail — does calm procedural drift read "pen-like enough" vs a recorded
  corpus — is named as the residual gap + the B-route fallback, not hidden.
- **Legacy aliases / masked fallbacks:** clean break, no alias. The se-guard (the one masked fallback) is
  RETIRED, not patched; a sub-min-span datum degrades its shape or the ring degrades to datum scale.
- **Unverified gestalt:** REAL, and the primary cap — no browser. The calm-drift constant (0.22 →
  ≈0.33% span) and the pen weight (~2.5px) are reasoned from `path.ts:89` arithmetic + the stills, not
  tuned against a live still. Every π is OWED.
- **Consumer-less substrate:** the one consumer (`handmark.vue`) is re-pointed at W7 with the overfit
  audit; a ~5-prop component is defensible where a 19-prop / 11-dead one is not.
- **Contra-evidence honesty:** pass 3's headline move is ACCEPTING the critic against pass 1's own
  centerpiece (fill-everything, delete-vbH). The soft half CRIT2 flagged is removed, not re-defended.

---

## 14. Convergence + open questions

**Convergence: 68%** (pass-1 55% → CRIT2 re-score 48% → pass-3 68%). Justification: the two soft pillars
CRIT2 flagged are resolved against pass 1 — fill-everything DEMOTED (register cut to 3 real brushes by the
stills-read), the uniform-space/delete-vbH pillar RETRACTED in full (the riskiest, lowest-payoff,
regression-prone move gone), the missing WEIGHT axis + gate ADDED, the census enumeration FIXED, and the
three previously-asserted cures (highlight containment, ring, shape-degrade) DRAWN concretely with the
substrate verified on disk. The design underbelly is closed. What holds it below convergence:

1. **Zero paint verification — the sharpest gap, unchanged.** Doc-only seat; every π OWED. The calm-drift
   amplitude, the pen weight, and the clip insets are arithmetic/reasoned, not captured. A live seat must
   discharge π-CALM/π-PEN/π-CONTAIN/π-DATUM/π-RING/π-DRAW/π-GALLERY. This alone caps pass 3.
2. **The "pen-like enough" ceiling is unproven.** Whether a calm procedural drift beats the recorded-corpus
   fallback (Family B) needs a live pen still — the one thing that could reopen B.
3. **B/D remain fallbacks, not competitors.** The charter wants each family developed independently before
   cross-pollination; pass 3 demoted them honestly (§12) rather than develop them. An open-process gap.

**Open questions for the user ASK** (only what genuinely needs a taste/scope call):
- **Q-HM-1 (taste):** the reduced register is **pen · pencil · highlighter** + a `Partial<Brush>` escape
  hatch — crayon/marker/boil retire as named brushes. Is a 3-brush register the right floor, or does the
  user want a named "marker" (saturated slab) kept as a 4th row? (Default proposed: 3 + override.)
- **Q-HM-2 (scope):** box/bracket shapes retire entirely (slivers by geometry over tiny datums); sub-2ch
  datums degrade to an underline-tick or a small circle. Confirm box/bracket are not wanted at all, vs
  kept as ≥2ch-only shapes.

Per the charter, 3+ passes before contemplating convergence — this IS pass 3, and with π wholly OWED it is
NOT converged. A live-seat pass 4 (prototype + capture the seven π against the RED baselines) is the next
required step; it is the only thing that can move this past ~70%.

**USER RULING (2026-07-17, supersedes the STAB2 floor reconcile): "handmark is keep. But
greenfield and perfect from first principles. Fable."** HandMark is KEEP — its existence is not in
question — and this greenfield carries FULL first-principles design authority over the perfected
component, surface included. The BAND-REDUCTION 19→~8 floor is SUPERSEDED by the user's word: the
first-principles surface (the ~5-prop target above, or whatever the perfected design derives) is
the greenfield's to decide, Q-HM-1/Q-HM-2 included — they resolve inside the design loop, not the
ASK. Consumers adapt per the standing consumer-updates ruling (no obsolete-API preservation; each
consumer migrates via a marked addendum in ITS tranche). All handmark design waves run Fable
seats. W6 + G-PROPS read with this ruling governing: the ≤8 conditional ladder collapses back to
the first-principles target.
