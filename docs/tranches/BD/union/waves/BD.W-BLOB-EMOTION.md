# BD.W-BLOB-EMOTION — RE-AUTHOR `paramsFor` itself (cross-couple MOTION to valence, not arousal-only) + gate a param-DISTANCE MATRIX, never a presence check

**Band 13 (per-viz redevelopments) · depends: W-BLOB-RENAME** — the re-author edits `blob/constants.ts` (`paramsFor`) through the renamed dir; the affect surface + the `useBlobMood` reader live in `blob/`. Per `UNIFIED-ROSTER.md:163` (V-NEW; the W-BLOB-REDEVELOP SPLIT arm 3 of 4 — `useEmotionalState` DEMOTED blob-LOCAL, not a suite primitive) + `critique/passd-blob.md FINDING 2` (the EMOTION re-author is STILL under-scoped: `paramsFor` drives all 8 motion params off AROUSAL alone; CALM↔MELANCHOLY motion-dist 0.166 sub-perceptible).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build edits `blob/constants.ts` (`paramsFor`) + the gate; it is user-gated. The spec is in scope now. The under-scoping is NUMERICALLY PROVEN at HEAD (the live `paramsFor` evaluation, `critique/passd-blob.md FINDING 2`) — this wave's correction is grounded, not speculative.

## The defect / the ask (Pass-D code-grounded — `critique/passd-blob.md FINDING 2`, numerically proven)

The blob's affect model is a 2-axis {valence, arousal} circumplex (`constants.ts MOOD_AVA`) — each named mood a POINT, the params DERIVED by `paramsFor` (`constants.ts:64-104`). The ask (`UNIFIED-ROSTER.md:163`) is to make the affect surface read as DISTINCT creatures across BOTH axes. The defect, traced numerically against the LIVE `paramsFor`:

1. **`paramsFor` drives EVERY motion param off AROUSAL alone.** `orbitSpeedScale`/`wobbleScale`/`pulseFreq`/`pulseAmp`/`noiseAmp`/`smoothK`/`mergeRate`/`iridScale` are ALL `lerp(…, arousal)` (`constants.ts:65-102`). Valence touches ONLY `hueRange` (40% weight), `satShift`, `brightnessShift`, `pointerAttraction` — i.e. COLOR + one lean scalar. **The MOTION is valence-BLIND.**

2. **CALM and MELANCHOLY move IDENTICALLY (the numeric proof).** Evaluating the proposed 4-state quadrants through the live `paramsFor` (`critique/passd-blob.md FINDING 2`):
   ```
   CALM {v:0.15,a:0.20} vs MELANCHOLY {v:-0.55,a:0.25} — MOTION euclidean dist = 0.166
     orbitSpeedScale Δ=0.090 (5% of the [0.4,2.2] range)   pulseAmp Δ=0.0021   noiseAmp Δ=0.0015
     → two low-arousal creatures move IDENTICALLY; the ONLY separation is hue (hueRange Δ=2.42).
   ```
   Two low-arousal creatures are motion-IDENTICAL; the only separation is color. A `proof:emotional-state` "separate on ≥3 axes" assertion written HONESTLY against `paramsFor` FAILS at HEAD.

3. **The framework's §3.3 fix does NOT re-author `paramsFor`.** `framework/lava-lamp-fluid.md §3.3` (lines 191-200) adds exactly ONE new valence-coupled axis — `verticalBias` (buoyancy: Calm/Excited rise, Melancholy sinks) — and that axis exists ONLY in the lava lifecycle (`§3.2` buoyancy is `useLavaField`, not the default-orbit `useBlobSatellites`). The `count`/`smoothK` knobs are still arousal-driven; the table explicitly says "re-derive params each frame via `paramsFor`" — the SAME arousal-only function. So in the DEFAULT orbit blob (the library identity, the contained bead that ships at N=1), valence still only RETINTS — CALM and MELANCHOLY still move identically.

The ask (`critique/passd-blob.md FINDING 2 REQUIRED`): RE-AUTHOR `paramsFor` ITSELF so valence couples to MOTION in the DEFAULT register (a melancholy blob drifts SLOWER and SAGGIER than a calm one, not merely cooler), and gate a measured param-DISTANCE MATRIX (motion-distinct across valence AND arousal), NOT a presence check.

## The mechanism — RE-AUTHOR `paramsFor` (the affect surface, cross-coupled)

ONE function re-author (`paramsFor`), ONE blob-local affect type (`useEmotionalState` DEMOTED — not a suite primitive), ONE matrix gate. The re-author cross-couples the MOTION params to valence so the default-orbit blob reads as a distinct creature in each quadrant — the affect surface becomes 2-axis in MOTION, not just COLOR.

### 1. The valence→motion couplings (the affect surface re-authored)

`paramsFor({ valence, arousal })` (`constants.ts:64`) gains valence terms on the MOTION params (the existing arousal terms are KEPT — arousal still drives energy; valence now ALSO shapes the motion's QUALITY). The cross-couplings, each grounded in the affect literature (negative valence = sluggish/heavy/saggy; positive valence = light/buoyant/crisp):

- **`smoothK` (viscosity) couples to valence.** A melancholy (negative-valence) blob is SAGGIER (a higher smin band → gooier, droopier merge) — `smoothK = lerp(0.85, 1.35, arousal) * lerp(1.15, 0.9, valence*0.5+0.5)` (negative valence lifts the viscosity ~15%, positive valence crisps it ~10%). So CALM (v:0.15) and MELANCHOLY (v:-0.55) now have DIFFERENT viscosity — melancholy merges saggier (`critique/passd-blob.md FINDING 2 REQUIRED`).
- **`noiseAmp` (wander irregularity) couples to valence.** A melancholy blob drifts MORE irregularly (a heavier, less-controlled wander) — `noiseAmp = lerp(0.015, 0.045, arousal) + lerp(0.008, -0.002, valence*0.5+0.5)` (negative valence ADDS irregular wander, positive valence smooths it). CALM is smooth-and-slow; MELANCHOLY is irregular-and-slow — motion-DISTINCT.
- **`orbitSpeedScale` (drift speed) gains a small valence droop.** A melancholy blob drifts SLOWER than a calm one at the SAME arousal — `orbitSpeedScale = lerp(0.4, 2.2, arousal) * lerp(0.85, 1.05, valence*0.5+0.5)` (negative valence slows ~15%). This closes the 5%-range `orbitSpeedScale Δ=0.090` to a perceptible delta across valence.
- **`pulseAmp` / `wobbleScale` gain a valence "heaviness" term** — a melancholy blob's pulse is shallower-and-heavier (a low, slow heave vs a calm blob's gentle even pulse). Small valence terms keep the per-quadrant motion distinct without breaking the arousal ordering.

**The FENCES (the re-author is principled, not a hand-tune):**
- **The arousal ordering is PRESERVED.** `still < breathing < drifting` (the energy axis) holds — arousal still dominates the motion ENERGY; valence shapes the motion QUALITY (viscosity/wander/heaviness) WITHIN an arousal band. The re-author does NOT invert the arousal-energy relationship (a high-arousal melancholy blob is still more energetic than a low-arousal one).
- **The named moods stay SAMPLES of the surface.** `MOOD_TARGETS` (`constants.ts:107-113`) re-resolves through the re-authored `paramsFor` — the five named moods (idle/happy/curious/sleepy/excited) are still POINTS on the ONE principled surface (`constants.ts:48-54` `MOOD_AVA`), not hand-tuned in isolation. Adding the 4-state quadrants (CALM/EXCITED/MELANCHOLY/CONTENT or the named circumplex corners) is sampling the SAME surface, never a parallel table.
- **The default-register identity holds.** The default `idle` mood (`MOOD_AVA.idle {v:0.0, a:0.35}`) re-resolves to a motion ≈ the existing idle (the byte-near-identical floor — a re-author that drifts the DEFAULT blob's resting motion off its calibrated look REDs the existing `blob-render.spec.ts` cage; the valence terms are ZERO at v=0, so `idle` (v:0.0) is UNCHANGED by construction). The cross-coupling shapes the OFF-center quadrants; the center (idle) is byte-stable.

### 2. `useEmotionalState` DEMOTED blob-LOCAL (not a suite primitive)

The roster (`UNIFIED-ROSTER.md:163`) DEMOTES `useEmotionalState` to blob-LOCAL — it is NOT a hoisted suite primitive (the ≥2-consumer bar is unmet; the blob is the only affect consumer, `critique/passd-blob.md` + the W-BLOB-LAVA `useLavaField` HARD-KILL precedent — no contrived cross-viz consumer). The affect type + the 4-state quadrant points live IN `blob/constants.ts` / `blob/composables/` (the feature-dir colocation), NEVER a `composables/motion/` hoist. A future 2nd real affect-consumer re-promotes it through its OWN trigger (the J-inv-10 ≥2 bar); until then it is the blob's identity. The gate (E4) asserts the affect surface is blob-local (no suite-barrel export).

## The gate — `proof:emotional-state` (born-RED → GREEN; a param-DISTANCE MATRIX, never a presence check)

`scripts/proof-emotional-state.mjs`, `tags: ["local","ci"]` (a source-structure + numeric-distance arm; the binding PAINT is the π). **THE LOAD-BEARING DESIGN PRINCIPLE: the gate dynamically `import()`s the re-authored `paramsFor` from `blob/constants.ts`, EVALUATES it at the quadrant points, and asserts a measured param-DISTANCE MATRIX — each state-pair separates ≥ a perceptible threshold on ≥3 MOTION axes. This is the `W-GATE-TRUTH-AUDIT` numeric-oracle discipline applied to the affect surface — a `.test(/valence/)` presence check is FORBIDDEN (it would green the HEAD arousal-only surface, which the live evaluation proves FAILS).** The detector imports the real function (the `vitest`/`tsx` TS-aware loader the suite uses for `scripts/**`), never a regex.

- **E1 — `paramsFor` cross-couples MOTION to valence (the source arm).** The detector reads `blob/constants.ts` `paramsFor` and asserts ≥3 MOTION params (`smoothK`/`noiseAmp`/`orbitSpeedScale`/`pulseAmp`/`wobbleScale`) carry a VALENCE term (not arousal-only). A `paramsFor` whose motion params are all `lerp(…, arousal)` (the HEAD shape) REDs. `facts.valenceCoupledMotionParams` lists the coupled params.
- **E2 — the param-DISTANCE MATRIX (the load-bearing numeric clause).** The detector `await import()`s the real `paramsFor`, evaluates it at the 4 quadrant points (CALM/EXCITED/MELANCHOLY/CONTENT — the named circumplex corners, recorded in `blob/constants.ts`), computes the pairwise MOTION euclidean distance over the NORMALIZED motion params (each param normalized to its `lerp` range so the distance is dimensionless), and asserts:
  - **every state-PAIR's MOTION distance ≥ a recorded perceptible threshold** (`MOTION_DIST_MIN`, recorded in the gate with the calibration rationale — the HEAD CALM↔MELANCHOLY 0.166 is the FAILING baseline; the threshold is set ABOVE it, e.g. ≥ 0.35, tight enough that the re-author MUST move the motion, the D2 calibration discipline);
  - **every state-pair separates on ≥3 individual MOTION axes** (each axis's normalized Δ ≥ a per-axis floor — so the distance is not carried by ONE outlier param; CALM↔MELANCHOLY must differ in viscosity AND wander AND speed, not just one).
  A pair below the distance threshold / separating on <3 axes REDs (the under-scoped bite — the HEAD surface REDs this clause by construction). `facts.distanceMatrix` records the full pairwise matrix + the per-axis separation count.
- **E3 — the arousal ordering + the default-identity FENCES hold.** The detector asserts `still < breathing < drifting` (the energy ordering — a re-author that inverts arousal-energy REDs) AND `paramsFor(MOOD_AVA.idle)` (v:0.0) re-resolves byte-near-identical to the HEAD idle motion (the valence terms are zero at v=0 — a default-drift REDs, the existing `blob-render.spec.ts` cage is the binding floor). `facts.orderingHeld` + `facts.idleStable` record both.
- **E4 — `useEmotionalState` is blob-LOCAL (the demotion fence).** The affect type + the quadrant table live in `blob/` (no `composables/motion/` hoist, no suite-barrel export). A hoisted `useEmotionalState` on `src/composables/` / a suite-barrel re-export REDs (the contrived-cross-viz-consumer bite — the W-LAVA-FIELD HARD-KILL precedent). `facts.affectLocal` records the dir.
- **E5 — the named moods stay SAMPLES of the ONE surface (no parallel table).** `MOOD_TARGETS` re-resolves through `paramsFor` (the five named moods are `paramsFor(MOOD_AVA.x)`, not a hand-tuned literal table); the 4-state quadrants are ALSO `paramsFor` samples. A parallel hand-tuned motion table bypassing `paramsFor` REDs (the surface-fork bite — the principled-surface discipline).

**Self-test bites (each planted defect MUST red — sized to clear its own clause per the D2 calibration lesson):**
- (a) the HEAD arousal-only `paramsFor` (all motion `lerp(…, arousal)`) → E1 RED (no valence-coupled motion) + E2 RED (CALM↔MELANCHOLY dist 0.166 < threshold — the numeric proof the gate FAILS the HEAD surface).
- (b) a re-author whose ONLY valence coupling is `smoothK` (1 axis) → E2 RED (separates on <3 axes — the one-outlier-param bite).
- (c) a re-author that inverts the arousal ordering (a melancholy blob more energetic than excited) → E3 RED.
- (d) a re-author that drifts the DEFAULT idle motion (a non-zero valence term at v=0) → E3 RED (the default-identity bite).
- (e) a hoisted `useEmotionalState` on `src/composables/` → E4 RED.
- (f) a parallel hand-tuned motion table bypassing `paramsFor` → E5 RED.
- (g) a `.test(/valence/)` presence-check clause (no `import()` + numeric matrix) → the gate itself is theater → E2's harness-import assert REDs (the self-witness — the gate must EVALUATE, not spell).

**What reds on the pre-fix tree (born-RED by construction):** E1 (the HEAD motion params are arousal-only), E2 (CALM↔MELANCHOLY motion-dist 0.166 < threshold, separates on hue only — the numerically-proven failure). GREEN only after `paramsFor` cross-couples ≥3 motion params to valence + the quadrant distance matrix clears the perceptible threshold on ≥3 axes per pair.

## The binding π — `tests-visual/blob-emotion.spec.ts`

The painted-truth readback, BOTH modes (light + dark), over a contrasting backdrop (W-VIZ-PRESENCE — the affect blob must READ), served at `:5199`, NEVER `reducedMotion` (the live motion arm is the WHOLE point — the affect is in the MOTION).

- **THE 4-QUADRANT MOTION DISTINCTNESS (the load-bearing capture).** Drive the blob to each of CALM/EXCITED/MELANCHOLY/CONTENT, capture a frame-series (the motion over ~2s — silhouette CV, centroid drift speed, the smin-merge sagginess), and assert the MEASURED motion reads DISTINCT per quadrant: a MELANCHOLY blob visibly drifts SLOWER + SAGGIER + more irregularly than a CALM blob (the valence-coupled motion paints — the numeric E2 matrix made visible). The binding visual truth a HEAD arousal-only blob FAILS (CALM and MELANCHOLY would read identical in motion, differing only in hue).
- **THE DEFAULT IDLE UNCHANGED (the identity floor).** The default `idle` blob reads byte-near-identical to the HEAD ground capture (the valence terms are zero at v=0 — E3).
- **PRM single-paint:** under reduce, the affect blob seats one static frame (the substrate-PRM freeze — the affect is in the motion, which PRM drops; the static frame keeps the quadrant's COLOR/posture).

## The gestalt row

**Union-roster surface: `blob-emotion` (the affect creature, motion-distinct per quadrant).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: the four affect quadrants read as DISTINCT CREATURES in MOTION (a melancholy blob is visibly sluggish + saggy + heavy, a calm blob smooth + slow + controlled, an excited blob fast + crisp + bouncy — the motion CARRIES the affect, not just the color) AND the blob RENDERS over its backdrop (W-VIZ-PRESENCE). Born-FAIL on HEAD (the motion is arousal-only — CALM and MELANCHOLY move identically; the affect is color-only). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **RE-AUTHOR `paramsFor` ITSELF (the #1 fence — not a buoyancy-axis patch).** The valence→motion coupling lands IN `paramsFor` (the DEFAULT orbit blob's surface), NOT only in the lava lifecycle (`framework §3.3`'s `verticalBias`, which exists only in lava mode). The DEFAULT register's CALM↔MELANCHOLY motion must separate (E2) — a re-author that leaves `paramsFor` arousal-only and adds a lava-only axis REDs (the under-scoped bite the prior critique flagged).
- **The gate is a NUMERIC MATRIX, not a presence check (the W-GATE-TRUTH-AUDIT discipline).** `proof:emotional-state` `import()`s + EVALUATES `paramsFor`, computes the pairwise motion distance matrix, asserts ≥3-axis separation per pair (E2) — a `.test(/valence/)` is FORBIDDEN (it greens the HEAD failing surface). The threshold is CALIBRATED above the HEAD 0.166 baseline (the D2 calibration lesson — tight enough to catch the smallest meaningful under-coupling).
- **The arousal ordering + the default identity are PRESERVED (the no-regression fence).** `still<breathing<drifting` holds (E3); the default idle is byte-near-identical (valence terms zero at v=0 — the `blob-render.spec.ts` cage is the binding floor). The re-author shapes the OFF-center quadrants, never the center.
- **`useEmotionalState` stays blob-LOCAL (the demotion fence).** No suite hoist, no contrived cross-viz consumer (the W-LAVA-FIELD HARD-KILL precedent — E4). A 2nd real affect-consumer re-promotes through its own ≥2 trigger.
- **The named moods stay SAMPLES of the ONE surface (no parallel table).** `MOOD_TARGETS` + the quadrants resolve through `paramsFor` (E5) — the principled-surface discipline, never a hand-tuned fork.

## Disposition links

- **`UNIFIED-ROSTER.md:163` (W-BLOB-EMOTION [V-NEW]; the W-BLOB-REDEVELOP SPLIT arm 3 of 4 — `useEmotionalState` DEMOTED blob-LOCAL, not a suite primitive; RE-AUTHOR the affect surface valence→motion, the 4 circumplex states as real ≥3-axis creatures)** → BUILT (the spec; the build user-gated). CLOSED at the spec level.
- **`critique/passd-blob.md FINDING 2` (the EMOTION re-author is STILL under-scoped: `paramsFor` drives all 8 motion params off arousal alone — CALM↔MELANCHOLY motion-dist=0.166, hue-dist=2.42; the framework §3.3 fix only adds a buoyancy axis in LAVA mode; REQUIRED: re-author `paramsFor` itself + gate a param-distance MATRIX)** → the spec carries the numeric proof (the live `paramsFor` evaluation), the cross-coupling re-author (§1), the matrix gate (E2), and the demotion (§2). CLOSED.
- **`framework/lava-lamp-fluid.md §3.3`** (the proposed emotion table adds ONLY `verticalBias`, a lava-only axis — does NOT re-author `paramsFor`) → SUPERSEDED for the affect surface: the re-author lands IN `paramsFor` (the default register), not only the lava lifecycle (the fence). The framework's buoyancy axis stays a W-BLOB-LAVA register-detail, NOT the affect-surface fix.
- **DEPENDS W-BLOB-RENAME** (edits `blob/constants.ts` `paramsFor` through the renamed dir).
- **The `paramsFor` re-author + the quadrant table are IMPLEMENTATION-owed** (a shipped-source edit) — user-gated, but the spec names the exact function + the exact coupling.
