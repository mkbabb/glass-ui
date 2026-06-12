# BA.W-FOURIER-STUDIO — the fourier band split into an ambient face + a foreground partial-sum studio

**Name**: W-FOURIER-STUDIO - the foreground fourier studio (partial-sum + epicycle + shape-trace + transport)
**Opens after**: Batch 6 open (depends Batch 1 W-DARK-MATERIAL — the dark register is the staging prerequisite, BA inv-5). Runs ‖ W-STAGE ‖ W-DEMO-AFFORDANCES ‖ W-SUFFUSE2 ‖ W-ANIMATE (Batch 6, disjoint file bounds per EXECUTION-DAG §6). SEQUENCED after W-DEMO-AFFORDANCES's agent-unit-1 lands the play register (this wave consumes it; see §Dependencies). Reads — never writes — W-CONFIG-CHASSIS's width contract (Batch 2, landed) so the studio's slotted sliders paint non-zero width.
**Agents**: 3 parallel (the math+clock-seam unit · the studio-Configurator+stage unit · the steps-sub-editor fold unit) — disjoint modify paths, see §Disjointness.
**Hard gate**: `proof:fourier-studio` (born-RED) — six falsifiable SOURCE witnesses (the `partialSumAt`/`maxTerms` math leaf exists + is exported, the injected clock seam replaces the inlined `now/durationMs`, the studio composes `<Configurator>` over a Canvas2D foreground stage, `dftFromPoints` gains its first demo consumer via the curated path library, the play-transport consumes W-DEMO-AFFORDANCES's play register not a hand-rolled clock, the ambient `<FourierField>` prop surface is UNCHURNED) + the BINDING π readback (the partial-sum curve resolves at N harmonics and visibly assembles as N grows; the epicycle + harmonic-sum axes toggle orthogonally; the ℱ-wordmark trace reconstructs from its own `dftFromPoints` spectrum; pause/scrub freezes a frame) + the `motion+fourier` row of `proof:ba-gestalt` PASS (BA inv-4 — per-mechanism greens alone do not close a visual wave).
**Status**: SPEC

## Goal criterion

The fourier band reads as the two registers the user named (R8-10): the AMBIENT `<FourierField>` showcase stays a recessive background face, and a FOREGROUND interactive STUDIO lands — a `<Configurator>` controls column (inheriting the AZ.W-HIERARCHY vocabulary, the aurora/blob-studio idiom) over a Canvas2D stage that demonstrates the summed-harmonic assembly (the fourier-analysis web reference's signature beauty), the epicycle chain, a curated shape-trace via the exported-but-consumerless forward DFT, and a controllable clock on the house play transport. A user opening the fourier studio can drag a 1..K slider and WATCH the curve resolve term by term, toggle epicycles independently of the sum, scrub the clock, and pick "trace ℱ" to see the brand wordmark drawn by its own Fourier epicycles.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's fourier-demos lane root causes, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, each impl unit re-greps its anchors below at HEAD and confirms the mechanism still holds; if a cite has drifted, the unit records the drift in PROGRESS and re-locates the mechanism before proceeding — it does NOT re-invent the diagnosis.

Grounding findings (`audit/fleet/fourier-demos.md`): **BA-FOUR-1** [S1 — no configurator/no drivable options], **BA-FOUR-2** [S1 — no summed-harmonic partial-sum demonstration, the headline reference idiom absent], **BA-FOUR-3** [S2 — the epicycle/harmonic-sum dual register collapsed into ONE preset enum], **BA-FOUR-4** [S2 — `dftFromPoints` ships as math substrate with zero consumer face], **BA-FOUR-5** [S2 — no playback/scrub/speed; the field is a non-interruptible autonomous clock], **BA-FOUR-6** [S3 — the HERO/FINAL figcaptions crowd the ShowcaseFrame bottom]; plus the deferred-census fold **REC-6** [W-MOTION3 live-steps `steppedEase(n, term)` generator]. Captures: `docs/tranches/BA/audit/fleet/fourier-story-dark.png` (the live `/substrates/fourier-field` story — three read-only ShowcaseFrames, no controls), the ground capture `docs/tranches/BA/audit/ground/R8-10-padding-fourier-demos.png`.

The six stacked root causes (each independently confirmed at HEAD this authoring):

1. **The field has NO interactive seam (BA-FOUR-1).** `FourierField.vue:41-65` exposes six props — `variant: "hero"|"final"`, `color`, `colorResolver`, `seed`, `freeze`, `intensity` — the WHOLE knob surface. The component was authored as a RECESSIVE generative background (the Aurora/GooBlob sibling); there is no play, no N-slider, no epicycle toggle, so the demo `demo/stories/substrates/fourier-field.vue` is three read-only `<ShowcaseFrame>` panels over two baked presets + a color-swatch row. The fix is NOT a configurator bolted onto the ambient primitive — it is the aurora-studio SPLIT: the ambient face stays, a foreground studio lands.

2. **No summed-harmonic partial-sum (BA-FOUR-2).** The field always paints the FULL spectrum. `math.ts:41-60` `positionsAt(components, t, maxCircles?)` already takes a truncation arg (`maxCircles` caps the epicycle chain), but `evaluateFourier(.., maxTerms)` partial-sum SUMMATION is not exposed — there is no `partialSumAt`/`evaluateFourier`-equivalent leaf, and no demo varies the term count. The reference's signature (the curve REBUILDING term by term as N grows: 1 ellipse → many epicycles → the resolved shape) has zero surface. The one math addition is a `partialSumAt(components, t, maxTerms)` leaf — `positionsAt`'s final tip truncated at `maxTerms` (already half-present as the `maxCircles` arg).

3. **The dual register is collapsed into one enum (BA-FOUR-3).** `presets.ts:60-101` bundles epicycle visibility (`epicycles`/`epicycleRatios`/`epicycleRainbow`) + harmonic count (`harmonics`) + loudness into the single 2-value `variant` (`hero` = epicycles-on-fewer-harmonics, `final` = epicycles-off-denser). The user names TWO distinct animations — "procedural epicycles AND summed harmonics" — that are not separable on this enum. The orthogonality lives in the STUDIO's configurator (an epicycle visibility/count axis × a harmonic-sum N axis that compose freely), NOT in the primitive's prop enum (the ambient bundle stays correct for a background — no clean break needed there).

4. **`dftFromPoints` is substrate-without-a-consumer (BA-FOUR-4).** `index.ts:7` re-exports `dftFromPoints` (the forward DFT, `math.ts:78-107`) on `/fourier-math`, but NOTHING consumes it — a J-invariant-10 / L-invariant-8 violation (substrate without a consumer binary). The studio gives it a face: a curated path library (the ℱ wordmark / heart / star) fed through `dftFromPoints` to produce a spectrum the SAME engine reconstructs. Do NOT build the image-upload/contour pipeline (over-scope); a small curated path set is the ≥2-consumer floor that legitimizes the exported transform.

5. **No clock control (BA-FOUR-5).** `FourierField.vue:245-248` derives `t` purely from frame time — `freeze || handle.reducedMotion ? preset.frozenT : (now / preset.durationMs) % 1` — a fixed autonomous loop. There is no injected clock seam: you cannot pause at a frame, scrub to a position, or change speed. For the AMBIENT background this is correct; for a DEMO it leaves the construction un-inspectable. The studio drives its stage off a CONTROLLABLE clock on the house dock transport (play/pause + `<GlassTimeline>` scrubber + a speed `<Select>`), consuming W-DEMO-AFFORDANCES's FIXED glass play register (R8-17 flags the reference's rainbow-blob play button as illegible — adopt the fixed control). The ambient field keeps its autonomous loop.

6. **The figcaptions crowd the frame bottom (BA-FOUR-6).** `demo/stories/substrates/fourier-field.vue:36` the grid `<ShowcaseFrame pad="none">` zeroes the pad and the `<figcaption>` sits flush under the `aspect-[4/3]` canvas with only a `gap-2`, so on the recessive dark field the caption reads cramped. This is the cross-cutting demo-chassis bottom-padding cluster — the ShowcaseFrame captioned-frame affordance is OWNED by W-STAGE (coordination: this wave CONSUMES the affordance once it lands, it does not edit ShowcaseFrame; see File Bounds).

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '41,65p'  src/components/custom/fourier-field/FourierField.vue   # the six-prop surface (BA-FOUR-1)
sed -n '245,248p' src/components/custom/fourier-field/FourierField.vue  # the inlined autonomous clock (BA-FOUR-5)
sed -n '41,107p' src/components/custom/fourier-field/math.ts            # positionsAt maxCircles + dftFromPoints (BA-FOUR-2/4)
grep -n 'dftFromPoints\|partialSumAt\|evaluateFourier' src/components/custom/fourier-field/index.ts  # dft exported, no partialSum (BA-FOUR-2/4)
sed -n '60,101p' src/components/custom/fourier-field/presets.ts         # the variant bundle (BA-FOUR-3)
sed -n '27,60p'  demo/stories/substrates/fourier-field.vue             # the three read-only panels (BA-FOUR-1)
grep -n 'fourier' demo/stories/manifest.ts                             # the substrates route + the studio insertion point
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | BA-FOUR-1 no configurator/no drivable options [S1] | `FourierField.vue:41-65` (six-prop surface); `demo/stories/substrates/fourier-field.vue:27-110` (three read-only ShowcaseFrames) | the field is a recessive background primitive — the demo has nothing to drive; the SPLIT (ambient face + foreground studio) is the remedy, not a configurator on the primitive |
| 2 | BA-FOUR-2 no partial-sum demonstration [S1] | `math.ts:41-60` (`positionsAt` takes `maxCircles` but no `partialSumAt`); `index.ts:4-11` (no `evaluateFourier`/`partialSumAt` export) | the field always draws the full spectrum; the reference's headline "watch it sum" idiom has no surface — needs a `partialSumAt(.., maxTerms)` leaf + an N-slider |
| 3 | BA-FOUR-3 dual register collapsed [S2] | `presets.ts:60-101` (`variant` bundles epicycles + harmonics + loudness); `FourierField.vue:38-39` (the bundle doc) | epicycle visibility and harmonic-sum are one 2-value enum, not orthogonal axes; the studio configurator makes them orthogonal (the primitive enum stays) |
| 4 | BA-FOUR-4 dftFromPoints consumerless [S2] | `math.ts:78-107` (`dftFromPoints`); `index.ts:7` (exported on `/fourier-math`, zero consumer) | the forward DFT is substrate without a consumer binary (L-inv-8); the curated path library (ℱ/heart/star) is its first face |
| 5 | BA-FOUR-5 no clock control [S2] | `FourierField.vue:245-248` (`t = (now / preset.durationMs) % 1`, no injected clock seam) | the field is a non-interruptible autonomous loop; the studio binds a controllable clock on the house transport |
| 6 | BA-FOUR-6 figcaption crowds frame bottom [S3] | `demo/stories/substrates/fourier-field.vue:36` (`<ShowcaseFrame pad="none">` + flush `<figcaption>`) | the recessive caption reads cramped; the ShowcaseFrame captioned-frame affordance (W-STAGE-owned) is the fix this wave consumes, not a per-site magic number |
| 7 | REC-6 W-MOTION3 live-steps generator [S3] | deferred-census REC-6; `demo/stories/motion/curve-gallery.vue:159` (the Steps family card, static); `curve-gallery/BezierEditor.vue` (the only sub-editor home) | the MOTION2 G7 defer — a live `steppedEase(n, term)` sub-editor (n + the 7 jump-terms) has no home; the gallery rebuild folds it (R8-10 re-opens the richer motion gallery) |

## Scope

1. **The partial-sum math leaf (BA-FOUR-2).** Add `partialSumAt(components, t, maxTerms?)` to `math.ts` — the final epicycle-chain tip evaluated over the FIRST `maxTerms` phasors (the inverse-DFT sum `Σ_{k<maxTerms} c_k·exp(2πi·k·t)`). It is `positionsAt` truncated at `maxTerms` returning the single curve POINT (not the full chain). Export it from `index.ts` so the `/fourier-math` subpath carries it. The DC doc comments the relation to `positionsAt`'s `maxCircles` arg (the same truncation axis, the point read vs the chain read).

2. **The injected clock seam (BA-FOUR-5).** Replace the inlined `t = (now / preset.durationMs) % 1` at `FourierField.vue:245-248` with an injectable clock: an OPTIONAL prop `clock?: () => number` (a getter returning `t ∈ [0,1)`) — when bound, the render reads `clock()`; when ABSENT, the autonomous `(now/durationMs)%1` loop is the DEFAULT (the ambient face is unchanged — `freeze`/`reducedMotion` still short-circuit to `frozenT`). The studio passes its controllable-clock getter; the ambient field passes nothing. This is the SOLE prop addition to the primitive and it is ADDITIVE/optional — the ambient bundle (`variant`/`harmonics`/`epicycle*`) is UNCHURNED (BA-FOUR-3 fence).

3. **The foreground Fourier studio (BA-FOUR-1/2/3).** Create `demo/stories/substrates/fourier-studio.vue` — a `<Configurator>`-driven studio (the aurora/blob-studio idiom, `useConfiguratorState` with `cloneMode="per-preset"`) over a Canvas2D foreground stage. The studio's own stage component drives a `useCanvas2D` loop drawing the epicycle chain (`positionsAt`) + the assembling partial-sum curve (`partialSumAt`) off the studio's live config. The configurator axes, all ORTHOGONAL: (a) **harmonic count N** — a `LabeledSlider` 1..K truncating the drawn spectrum and driving the partial-sum curve that visibly assembles; (b) **epicycles** — a visibility toggle + a draw-count axis for the rotating chain (independent of N); (c) **color** — the existing injected-resolver swatch, brand-keyed to `--viz-fourier`/`--viz-chebyshev`/`--viz-legendre`. Inherit the AZ.W-HIERARCHY section/label/control-rhythm vocabulary (the studio READS it by name, does not re-author it).

4. **The play transport (BA-FOUR-5) — consume W-DEMO-AFFORDANCES's play register.** The studio binds a controllable clock to a transport row: a `<GlassDock>` carrying the FIXED glass play/pause control (the W-DEMO-AFFORDANCES play register, NOT a hand-rolled rainbow-blob button per R8-17), a `<GlassTimeline>` scrubber writing the clock position, and a speed `<Select>`. The clock state (a `ref` `t` advanced by a `useRAFLoop`/`useScrollProgress`-driven step at the chosen speed, frozen on pause, set by the scrubber) is the studio's own; it feeds `FourierField`'s new `clock` getter AND the foreground stage's draw. Do NOT hand-roll a raw `requestAnimationFrame` clock — compose the house motion substrate.

5. **The curated shape-trace (BA-FOUR-4).** Add a small curated path library (the ℱ wordmark / a heart / a star — point sets as `[number, number][]`) in a studio-local data module; a "shape source" configurator axis feeds the selected path through `dftFromPoints` to produce a spectrum the SAME `partialSumAt`/`positionsAt` engine reconstructs. This is `dftFromPoints`'s first consumer (closing the BA-FOUR-4 substrate-without-consumer gap). The ℱ-wordmark trace is the brand tie-in: the wordmark literally drawn by its own Fourier epicycles.

6. **The configurator preset row (the studio's center of gravity).** Author the studio `ConfiguratorPreset` descriptors — "Ambient ellipse" (today's hero spectrum), "Dense reconstruction" (today's final spectrum), "Brand mark ℱ" (the wordmark trace), "Summing harmonics" (the term-by-term assembly with N animated) — each a named editable baseline (`cloneMode="per-preset"`, the aurora idiom). Presets SEED the studio, they do not replace it.

7. **The W-MOTION3 live-steps sub-editor fold (REC-6).** Fold the deferred `steppedEase(n, term)` generator into the curve gallery as a Steps sub-editor: a live `n` (jump-count) control + a 7-way `term` selector (`jump-start`/`jump-end`/`jump-none`/`jump-both`/`start`/`end`/the step-position families) on the existing Steps family card in `demo/stories/motion/curve-gallery.vue`, plotting the REAL `steppedEase` twin (the mirror of the BezierEditor sub-editor idiom). This is the R8-10 "richer motion gallery" half — the home the MOTION2 G7 defer named.

8. **The ambient story de-crowd pointer (BA-FOUR-6 — consume, not edit).** The ambient `demo/stories/substrates/fourier-field.vue` gains a one-line pointer to the studio and consumes W-STAGE's captioned-frame affordance for the BA-FOUR-6 bottom-pad (the ShowcaseFrame edit lands in W-STAGE's bound — this wave only re-points the story's frame usage, not ShowcaseFrame itself). The `<FourierField>` primitive prop surface is NOT churned here (the ambient bundle is correct).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the injected clock seam (scope 2) cannot be added additively without re-shaping the ambient `variant` bundle or breaking the `freeze`/`reducedMotion` short-circuit (a churn the BA-FOUR-3 fence forbids) — that is a scope-reveal; triumvirate (research the additive seam options + plan-augment the bound + redress), do NOT churn the ambient primitive's bundle unilaterally.
- **The play-register dependency reveals a gap**: if W-DEMO-AFFORDANCES's play register (its agent-unit-1) does not land a transport-composable control the studio can bind (the register's shape blocks the studio's clock wiring), that is a cross-wave scope-reveal — triumvirate, do NOT fork a second play-control or hand-roll a raw-rAF clock to route around it (the negative-predicate the affordances wave mints would red).
- **Hard-gate failures not local-edit-recoverable**: if the partial-sum curve does not visibly assemble as N grows in the π readback (the assembly reads as a static morph, not the term-by-term resolve the reference's beauty depends on) after the math leaf + stage land, that is a render-design miss — triumvirate, do not loop on draw-pass alpha values.
- **Diagnostic loop halt**: if the `dftFromPoints` reconstruction of a curated path does not close (the ℱ-wordmark trace does not reconstruct to the wordmark) and three iterations have not isolated the cause (the signed-frequency order, the DC-term centering, the point-sampling density), halt and triumvirate (the forward/inverse round-trip is the suspect).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/fourier-field/math.ts` | modify (add `partialSumAt`; unit A) |
| `src/components/custom/fourier-field/index.ts` | modify (export `partialSumAt`; unit A) |
| `src/components/custom/fourier-field/FourierField.vue` | modify (the additive `clock?` prop seam at :245-248 ONLY; unit A) |
| `src/components/custom/fourier-field/README.md` | modify (document `partialSumAt` + the clock seam; unit A) |
| `demo/stories/substrates/fourier-studio.vue` | create (the foreground studio; unit B) |
| `demo/stories/substrates/fourier-paths.ts` | create (the curated ℱ/heart/star path library; unit B) |
| `demo/stories/substrates/FourierStudioStage.vue` | create (the Canvas2D foreground stage; unit B) |
| `demo/stories/substrates/fourier-field.vue` | modify (the one-line studio pointer + the captioned-frame re-point; unit B) |
| `demo/stories/manifest.ts` | modify (register the `fourier-studio` route under `substrates`; unit B — single insertion, no other Batch-6 wave writes the substrates rows) |
| `demo/stories/motion/curve-gallery.vue` | modify (the Steps sub-editor fold; unit C) |
| `demo/stories/motion/curve-gallery/StepsEditor.vue` | create (the `steppedEase(n, term)` live sub-editor; unit C) |
| `scripts/proof-fourier-studio.mjs` | create (the born-RED gate; unit A authors, orchestrator registers) |
| `package.json` | modify (register `proof:fourier-studio` + add to `proof:all`/parity — orchestrator integration edit) |
| `scripts/gates.mjs` | modify (register the gate row in the registry — orchestrator integration edit) |
| `CLAUDE.md` | modify (record the fourier-studio register in the §Configurator-studio / §Suffusion area — orchestrator integration edit) |
| `tests-visual/fourier-studio.spec.ts` | create (the π readback DELTA spec; unit B) |

**Do NOT touch:**

- `src/components/custom/fourier-field/presets.ts` — the ambient `variant` bundle is CORRECT and stays (BA-FOUR-3 fence; the orthogonality lives in the studio configurator, not the primitive enum).
- `demo/stories/ShowcaseFrame.vue` / `StoryHero.vue` / `StorySection.vue` / `StoryPage.vue` + `story-hero.css` — the demo chassis is **W-STAGE's sole bound** (EXECUTION-DAG §6). The captioned-frame affordance (BA-FOUR-6's fix) lands in W-STAGE; this wave CONSUMES it (re-points the story's frame usage), never edits the chassis. If the studio needs a chassis change, declare it as a literal diff block for W-STAGE (the AZ literal-markdown-block triumvirate idiom).
- The play-control register source (`src/styles/glass/surfaces.css` stack negative-predicate, the `.btn-pill`/`.glass-btn` register) — **W-DEMO-AFFORDANCES's bound**; this wave CONSUMES the play register, never re-defines it.
- `demo/layout/AppShell.vue` + the story chassis entrance hooks — **W-ANIMATE's bound**; the studio inherits page-enter orchestration, does not wire it.
- The category eyebrow/accent stories + `StoryPage.vue`'s h1 rung — **W-SUFFUSE2's bound** (landed via W-STAGE); the studio reads the motion-band violet/`--viz-fourier` identity, does not author the suffusion map.
- The GL shader internals (`aurora.frag`, `metaball.frag`) — fence-locked (BA inv-9; the fourier stage is Canvas2D, not a shader, so this is not in reach regardless).
- ppmycota purple (the motion-band demo-local violet) NEVER enters library tokens (BA inv-1, presets-in-consumers); the studio's brand color reads the SHIPPED `--viz-fourier`/`--viz-chebyshev`/`--viz-legendre` library tokens.
- The slides `docs/tranches/M/` docs (foreign; BA inv-10).
- `src/components/custom/configurator/*` + `src/components/custom/labeled-field/*` — **W-CONFIG-CHASSIS's bound** (Batch 2, landed); the studio CONSUMES the width contract + the per-preset state, never edits the chassis primitive.

### Disjointness

Three units, disjoint modify paths:
- **Unit A (math + clock seam)** writes `math.ts`, `index.ts`, `FourierField.vue` (the additive `clock?` prop ONLY), `README.md`, and authors `proof-fourier-studio.mjs`.
- **Unit B (studio + stage + route)** writes the new `fourier-studio.vue`, `fourier-paths.ts`, `FourierStudioStage.vue`, the new `tests-visual/fourier-studio.spec.ts`, and modifies `fourier-field.vue` (the demo story pointer) + `manifest.ts` (the route row).
- **Unit C (steps sub-editor)** writes the new `curve-gallery/StepsEditor.vue` + modifies `curve-gallery.vue` (the Steps card fold).

No two units share a `modify`/`create` path. Unit B depends on Unit A's `partialSumAt` export + `clock?` prop (sequence: A lands the seam, B consumes it — declared in §Dependencies; both may develop in parallel worktrees with B stubbing the import until A integrates). `package.json`/`gates.mjs`/`CLAUDE.md` are orchestrator-integration edits (not an agent unit's modify path), applied at integration after Unit A authors the gate. Across Batch 6: no other wave writes `src/components/custom/fourier-field/*`, the new studio/stage/paths files, or `curve-gallery.vue` — the substrates-route row in `manifest.ts` is this wave's single insertion (W-STAGE writes the per-category background-MAP entries, a disjoint region of the same file — coordinate the `manifest.ts` insertion as a literal block if both waves land the same commit; see §Dependencies).

## Agent Units

### BA.W-FOURIER-STUDIO.A the partial-sum math leaf + the injected clock seam

- Goal: the engine carries a truncated-summation leaf and an injectable clock, both additive — the partial-sum curve has a math home and the studio can drive `t`, with the ambient `<FourierField>` bundle UNCHURNED.
- Mechanism: (a) add `partialSumAt(components, t, maxTerms?)` to `math.ts` (the inverse-DFT sum over the first `maxTerms` phasors, returning the single curve point — `positionsAt`'s final tip truncated), export it from `index.ts` so `/fourier-math` carries it; (b) replace `FourierField.vue:245-248`'s inlined `t = (now/durationMs)%1` with an optional `clock?: () => number` prop — when bound, `t = clock()`; absent, the autonomous loop is the default; `freeze`/`reducedMotion` still short-circuit to `frozenT`; (c) document both in `README.md` (the `partialSumAt`↔`positionsAt.maxCircles` truncation-axis relation + the clock seam); (d) author `scripts/proof-fourier-studio.mjs` (the born-RED gate, the comment-strip + pure-detector house pattern mirroring `proof-no-god-module.mjs`).
- Files: `math.ts`, `index.ts`, `FourierField.vue` (the `clock?` seam only), `README.md`, `scripts/proof-fourier-studio.mjs`.
- Sub-gate: the gate's W1 + W2 witnesses — W1: `partialSumAt` is DEFINED in `math.ts` (signature `(components, t, maxTerms?)`) and EXPORTED from `index.ts` (the `/fourier-math` carry); W2: `FourierField.vue` reads an injected `clock` getter (the source asserts the inlined `(now/durationMs)%1` is no longer the SOLE `t` source — a `clock?` prop branch exists) AND the ambient default path is preserved (the `clock`-absent branch keeps the autonomous loop; the `presets.ts` bundle is byte-untouched).

### BA.W-FOURIER-STUDIO.B the foreground studio + Canvas2D stage + shape-trace

- Goal: a `<Configurator>`-driven foreground studio over a Canvas2D stage demonstrates the orthogonal partial-sum + epicycle axes, the controllable clock on the house play transport, and the curated `dftFromPoints` shape trace — the demo's center of gravity.
- Mechanism: create `fourier-studio.vue` composing `useConfiguratorState` (`cloneMode="per-preset"`, the aurora idiom) + a `<Configurator>` controls column (the AZ.W-HIERARCHY vocabulary inherited by name) + `FourierStudioStage.vue` (a `useCanvas2D` loop drawing `positionsAt` chain + `partialSumAt` assembling curve off the live config + the studio clock); the transport row binds the W-DEMO-AFFORDANCES play register + `<GlassTimeline>` scrubber + a speed `<Select>` to a house-substrate-driven clock `ref`; `fourier-paths.ts` carries the curated ℱ/heart/star point sets fed through `dftFromPoints`; register the `fourier-studio` route under `substrates` in `manifest.ts`; re-point the ambient `fourier-field.vue` to the studio (one line) + the captioned-frame consume; author `tests-visual/fourier-studio.spec.ts` (the π readback).
- Files: `fourier-studio.vue` (create), `fourier-paths.ts` (create), `FourierStudioStage.vue` (create), `fourier-field.vue` (the demo pointer), `manifest.ts` (the route row), `tests-visual/fourier-studio.spec.ts` (create).
- Sub-gate: the gate's W3 + W4 + W5 witnesses — W3: `fourier-studio.vue` composes `<Configurator>` + `useConfiguratorState` over a `useCanvas2D` stage (the source assert) AND the π readback shows the partial-sum curve resolving at N harmonics and assembling as N grows; W4: `fourier-paths.ts` feeds a curated path through `dftFromPoints` (the first consumer of the exported transform) AND the π readback shows the ℱ-wordmark trace reconstructing; W5: the transport binds W-DEMO-AFFORDANCES's play register (the source asserts no hand-rolled raw-rAF clock + no rainbow-blob button) AND the π readback shows pause/scrub freezing a frame.

### BA.W-FOURIER-STUDIO.C the W-MOTION3 live-steps sub-editor fold

- Goal: the deferred `steppedEase(n, term)` generator gains its home — a live Steps sub-editor in the curve gallery plotting the real twin.
- Mechanism: create `curve-gallery/StepsEditor.vue` — a live `n` (jump-count) control + a 7-way `term` selector over the existing `steppedEase` twin, mirroring the `BezierEditor.vue` sub-editor idiom (the only sub-editor home in the gallery today); fold it into the Steps family card in `curve-gallery.vue` so a user dials n + term and watches the stepped plot regenerate off the REAL JS twin.
- Files: `curve-gallery/StepsEditor.vue` (create), `curve-gallery.vue` (the Steps card fold).
- Sub-gate: the gate's W6 witness — a `StepsEditor.vue` EXISTS composing a live `steppedEase(n, term)` (the source assert: the editor reads `n` + a `term` axis and plots the real twin) AND it is mounted in `curve-gallery.vue`'s Steps card (not an orphan file) — the π readback shows the stepped plot changing as `n`/`term` vary.

## Hard Gate

`proof:fourier-studio` (born-RED at HEAD, driven GREEN by the wave) — six falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-no-god-module.mjs` / `proof-dock-unify.mjs`), each RED at HEAD pre-wave:

1. **W1 — the partial-sum leaf exists + is exported.** `partialSumAt` is DEFINED in `math.ts` with signature `(components, t, maxTerms?)` returning a single `[number, number]` curve point, and re-EXPORTED from `index.ts` (the `/fourier-math` carry). RED at HEAD: `grep partialSumAt src/components/custom/fourier-field/{math.ts,index.ts}` returns 0 — the leaf does not exist. **Bite-tightening**: the source half asserts the EXPORT chain (math definition AND index re-export), not merely a `function partialSumAt` string — a defined-but-unexported leaf fails the substrate-with-a-consumer-face bar (BA-FOUR-2/4 demand the studio reach it).

2. **W2 — the injected clock seam (ambient default preserved).** `FourierField.vue` reads an injected `clock` getter — the source asserts a `clock?` prop branch exists AND the inlined `(now / preset.durationMs) % 1` is no longer the SOLE `t` source (a `clock`-absent fallback keeps it the default). RED at HEAD: `FourierField.vue:245-248` derives `t` purely from frame time with no injected seam. **Bite-tightening**: the gate asserts BOTH the new branch AND the ambient-default preservation (a `clock`-absent path that still runs the autonomous loop + `presets.ts` byte-untouched) — a churned ambient bundle reds the BA-FOUR-3 fence.

3. **W3 — the studio is a Configurator over a Canvas2D stage.** `fourier-studio.vue` composes `<Configurator>` + `useConfiguratorState` (the source assert) over a `useCanvas2D`-driven foreground stage, with the harmonic-count N axis + the epicycle axis as ORTHOGONAL configurator rows (not a single `variant` enum). RED at HEAD: `demo/stories/substrates/fourier-studio.vue` does not exist. **Bite-tightening**: the source asserts the studio mounts a `useConfiguratorState` AND `useCanvas2D` (not a hand-rolled `<input type=range>` strip + raw `<canvas>`) — a recipe that bypasses the chassis fails the aurora-studio-idiom bar.

4. **W4 — dftFromPoints gains its first consumer.** `fourier-paths.ts` feeds a curated path point-set through `dftFromPoints` (the import + call site), and the studio reconstructs it via the same engine. RED at HEAD: `grep -rl dftFromPoints demo/` returns 0 — zero demo consumer. **Bite-tightening**: the source asserts the IMPORT + the call (`dftFromPoints(path)`), not just the path data — a curated path set that is never transformed leaves the substrate-without-consumer gap alive (BA-FOUR-4).

5. **W5 — the play transport consumes the W-DEMO-AFFORDANCES register, not a hand-rolled clock.** The studio's transport binds the play register (the shared glass play control) + a `<GlassTimeline>` scrubber + a speed `<Select>`, and the clock `ref` advances off a house motion substrate (`useRAFLoop`/`useScrollProgress`), NOT a bespoke `requestAnimationFrame` loop. RED at HEAD: no transport exists. **Bite-tightening**: the source asserts the NEGATIVE — the studio carries no raw `requestAnimationFrame(` clock in its own body (the house substrate owns the loop) AND no rainbow-blob play button (R8-17) — the affordances-wave negative-predicate this wave inherits.

6. **W6 — the steps sub-editor exists + is mounted.** `curve-gallery/StepsEditor.vue` composes a live `steppedEase(n, term)` (the `n` control + the 7-way `term` axis plotting the real twin) AND is mounted in `curve-gallery.vue`'s Steps card (not an orphan). RED at HEAD: `StepsEditor.vue` does not exist; the Steps family card is a static plot. **Bite-tightening**: the source asserts the editor is IMPORTED + RENDERED in `curve-gallery.vue` (a created-but-unmounted file is an orphan, not a fold).

7. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live capture of `/substrates/fourier-studio` at `:5199` with a paired π readback proving (a) the partial-sum curve resolves at a low N (e.g. N=4) and visibly assembles toward the full curve as N grows (a frame-series readback at N=1, N=4, N=K showing the curve filling in — the reference's signature beauty); (b) the epicycle visibility toggle changes the chain WITHOUT changing the partial-sum curve (the orthogonality); (c) the ℱ-wordmark shape-source reconstructs to the wordmark via its own `dftFromPoints` spectrum; (d) pause freezes a frame and the scrubber sets a position (the controllable clock). Captured to `docs/tranches/BA/audit/visual/W-FOURIER-STUDIO-DELTA.md` with before/after frames against the `fourier-story-dark.png` baseline (the three read-only panels), in BOTH modes over the real fourier backdrop. **The π half is the binding visual truth — if the source half passes but the live `/substrates/fourier-studio` render does not visibly ASSEMBLE the partial sum (the reference's beauty), the wave does NOT close (the AZ source-green/visually-broken gap is exactly the P-1 close-class this tranche fixes).**

8. **The gestalt bar (BA inv-4).** Per-mechanism W1–W7 greens do NOT close this visual wave. The `motion+fourier` row of `proof:ba-gestalt` (the roster ledger at `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md`) must record an operative `PASS` for the fourier surface — a whole-page capture of the studio + the ambient face, BOTH modes, over the real backdrop, judged as a gestalt ("does this read as the two-register fourier band the user named?"). The verdict flip is W-REFLECT2's edit (the gate is `["local"]`-tagged until then); this wave delivers the captures + the recorded provisional verdict the reflection confirms.

W1–W6 are the device-free CI half (`proof:fourier-studio`); the π readback (W7) + the gestalt row (W8) are the binding visual truth. All must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` after the math leaf + `clock?` prop edits (Unit A) and after each new SFC (Units B/C); `npm run build` to confirm the `/fourier-math` subpath dts re-emits with `partialSumAt` + the studio story compiles; `node scripts/proof-fourier-studio.mjs` born-RED before any source edit (proof it fails at HEAD), GREEN at close; `npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration; `npm run verify-export-types` after the `/fourier-math` export change (the subpath dts publication probe — `partialSumAt` must publish); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-FOURIER-STUDIO-DELTA.md` — before/after `/substrates/fourier-studio` frames + the paired π readback (the N=1/N=4/N=K assembly frame-series, the epicycle-orthogonality pair, the ℱ-trace reconstruction, the pause/scrub freeze), BOTH modes.
- `tests-visual/fourier-studio.spec.ts` — the π getComputedStyle/canvas-readback spec.
- The `proof:fourier-studio` JSON artefact (born-RED log + GREEN-at-close log).
- The gate-script-parity + verify-export-types output post-registration.
- The `motion+fourier` row provisional verdict in `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` (W-REFLECT2 confirms operative).

## Commit Plan

- impl commit (Unit A): `feat(fourier-field): partialSumAt truncated-summation leaf + injected clock seam (BA.W-FOURIER-STUDIO)` — names the additive seam + the ambient-default preservation in the body.
- impl commit (Unit B): `feat(demo): foreground Fourier studio — Configurator over Canvas2D stage, partial-sum + epicycle orthogonal axes, dftFromPoints shape-trace, play transport (BA.W-FOURIER-STUDIO)` — names the four axes + the dftFromPoints first-consumer.
- impl commit (Unit C): `feat(demo): live steppedEase(n, term) sub-editor in the curve gallery (BA.W-FOURIER-STUDIO / REC-6)`.
- gate commit: `test(fourier): proof:fourier-studio born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md fourier-studio record + the DELTA doc + the gestalt-roster provisional verdict + PROGRESS row.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1, landed — the studio stages over the re-tuned dark register, BA inv-5). W-CONFIG-CHASSIS (Batch 2, landed — the studio's slotted `LabeledSlider`s paint at the row's full inline width via the width contract; without it the N-slider re-hits the 0px-slider class). **W-DEMO-AFFORDANCES's play register (Batch 6, SEQUENCED — its agent-unit-1 lands the play control FIRST per EXECUTION-DAG §6)**: this wave's transport consumes it; if it has not landed when this wave's Unit B integrates, Unit B stubs the play-control import and the orchestrator wires the real register at the affordances-wave integration (declared, not raced). W-STAGE's captioned-frame affordance (Batch 6, parallel) for the BA-FOUR-6 bottom-pad — consumed, not edited; if W-STAGE has not landed it, the ambient story's pointer ships and the caption-pad re-point lands at W-STAGE's integration.
- **The `manifest.ts` coordination seam**: W-STAGE writes the per-category background-MAP entries; this wave writes the single `fourier-studio` route ROW under `substrates`. The two regions are disjoint, but both waves touch `manifest.ts` — the orchestrator applies this wave's route-row insertion as a literal diff block alongside W-STAGE's map edits (the AZ literal-markdown-block idiom) so neither wave races the file.
- **Blocks**: W-REFLECT2 (Batch 7) — the `motion+fourier` gestalt row's operative PASS depends on this wave's captures. W-CLOSE (Batch 7) re-stamps the REC-6 deferral as DISCHARGED (the steps generator landed) and confirms `dftFromPoints` is no longer a substrate-without-consumer BOOK (BA-FOUR-4 closed).

## Archaeology

Prior attempt: none direct — the FourierField primitive was authored (AY.W-FF1/FF2/FF3) as a recessive background with a deliberately narrow prop surface, and `dftFromPoints` was PROMOTED to `/fourier-math` (AY.W-FF2 §2.9) as a shared leaf with the EXPECTATION a consumer would materialize. That consumer never landed — the forward DFT has shipped consumerless across AY→AZ→BA (the L-inv-8 substrate-without-consumer the deferred census flags). The new guardrail: this wave's gate W4 asserts the RENDERED consumer (the curated path through `dftFromPoints` reconstructing in the studio), not the export-presence the promotion proved — and the gestalt bar (inv-4) confirms the studio reads as the demo's center of gravity, not a mechanism that greens a checklist while the page stays the three read-only panels (the P-1 close-class this tranche exists to fix).
