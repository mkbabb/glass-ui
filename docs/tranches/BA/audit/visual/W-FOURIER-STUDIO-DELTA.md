# BA.W-FOURIER-STUDIO — DELTA (the foreground Fourier studio + the R5-11 warm-lean rider)

**Wave**: BA.W-FOURIER-STUDIO — the fourier band split into an ambient face + a foreground partial-sum studio (the aurora-studio idiom)
**Branch**: tranche/BA
**Status**: operative-PASS (the source `proof:fourier-studio` 7/7 + the π `tests-visual/fourier-studio.spec.ts` 16/16 both projects — including the R5-11 warm-lean arm; the gestalt captures fed to W-REFLECT2)
**Freshness**: captured POST-W-DARK-MATERIAL (Batch 1, the dark register), POST-W-GLASS-CAL (Batch 4, the blur dial-back), POST-W-ANIMATE (the route page-enter), and on the W-STAGE-present working tree (the `paper` category background) — the dark substrate ladder + the calibrated blur + the demo chassis are all in the render, so the DELTA is fresh, not stale-pre-batch.

## The defect (R8-10 / `audit/fleet/fourier-demos.md` — six stacked root causes)

The fourier band was a single recessive AMBIENT primitive (`<FourierField>`) with a deliberately narrow 6-prop surface, and the demo (`substrates/fourier-field.vue`) was three READ-ONLY `<ShowcaseFrame>` panels over two baked presets + a color-swatch row — nothing to drive (BA-FOUR-1). There was no summed-harmonic partial-sum demonstration (the reference's headline "watch it sum" idiom absent, BA-FOUR-2); the epicycle/harmonic-sum dual register was collapsed into one 2-value `variant` enum (BA-FOUR-3); `dftFromPoints` shipped as `/fourier-math` substrate with no studio-consumer face (BA-FOUR-4); the field was a non-interruptible autonomous clock with no play/scrub/speed (BA-FOUR-5); and the figcaptions crowded the ShowcaseFrame bottom (BA-FOUR-6). Plus the deferred REC-6 W-MOTION3 live-steps generator + the BA-VJS-6 C-3 EasingPicker fold.

The R5-11 RIDER (the slides-arm deposit): the slides nine-gate fc-fourier audit G4 FAILED at the 3.13.0 adoption — the S1 hero FourierField's sampled mean RGB no longer leaned warm (r>b); the final still leaned cool. Root cause (this wave's audit): the AZ rebuild's hero rainbow epicycle palette swept SYMMETRIC `±150°` around the base hue, so from a warm base (~30°) the chain walked into the blue half (base−150 ≈ 240, base+150 ≈ 210) and dragged the field's sampled mean COOL — the warm lean the pre-rebuild analogous (42°) field painted was lost.

## What landed (3 units + the R5-11 rider)

| Unit | Change | Files |
|---|---|---|
| A | `partialSumAt(components, t, maxTerms?)` — the truncated inverse-DFT summation curve point (`positionsAt`'s tip truncated); exported on `/fourier-math` + `/fourier-field` | `math.ts`, `index.ts` |
| A | The additive injected `clock?: () => number` seam — bound → `t = clock()`; absent → the autonomous `(now/durationMs)%1` loop (the ambient default); `freeze`/PRM still short-circuit. The SOLE prop addition; `presets.ts` byte-UNTOUCHED (the BA-FOUR-3 fence) | `FourierField.vue` (:245-248 + the prop) |
| A | README — `partialSumAt`↔`positionsAt.maxCircles` relation + the clock seam + the warm-anchored rainbow | `README.md` |
| A | The born-RED gate (6 source witnesses + the π arm + the gestalt bar) | `scripts/proof-fourier-studio.mjs` |
| B | The foreground studio — `<Configurator>` + `useConfiguratorState` (per-preset) over a `useCanvas2D` `FourierStudioStage`; orthogonal axes (harmonic-count N · epicycle visibility/count · color); 4 presets (Ambient ellipse / Dense reconstruction / Brand mark ℱ / Summing harmonics) | `fourier-studio.vue` (create) |
| B | The Canvas2D stage — draws the assembling `partialSumAt` curve + the `positionsAt` epicycle chain off the live config + the studio clock | `FourierStudioStage.vue` (create) |
| B | The curated path library — ℱ wordmark (reused from the redraw egg) / heart / star → `dftFromPoints` (the studio's first DFT consumer; BA-FOUR-4 closed) | `fourier-paths.ts` (create) |
| B | The play transport — `<DockBackgroundToggle v-model:paused>` (the FIXED glass Pause↔Play register, NOT a rainbow-blob button — R8-17) + `<GlassTimeline>` scrubber + a speed `<LabeledSelect>`; the clock advances off `useRAFLoop` (NO raw rAF in the studio body) | `fourier-studio.vue` |
| B | The route row (`paper` background — the studio IS the fourier surface; one-GL/one-Canvas2D-per-route holds) + the ambient story pointer | `manifest.ts`, `fourier-field.vue` |
| B | The π readback spec | `tests-visual/fourier-studio.spec.ts` (create) |
| C | ARM B — the demo-only `StepsEditor.vue` (a live `steppedEase(n, term)` over the 7-way `jumpTerms` axis, mirroring the `BezierEditor` twin idiom) mounted in the curve-gallery Steps card; the published `<EasingPicker>` fold BOOKED to W-EASING-PRIMITIVE | `curve-gallery/StepsEditor.vue` (create), `curve-gallery.vue`, `curve-families.ts` |
| R5-11 | The hero rainbow sweep WARM-ANCHORED (`base − 30°` → `base + 70°`, a tight warm-side band) so the hero field's sampled mean leans warm (r>b); the final (no rainbow) stays cool | `FourierField.vue` (the `refreshResolvedColor` palette) |

## The C-3 arm decision (recorded — §Triumvirate scope-reveal)

**ARM B (book to W-EASING-PRIMITIVE) was chosen at dispatch.** Publishing a NET-NEW `/easing` subpath primitive (the `<EasingPicker>`/`<EasingConfigurator>` reconciliation of the kf trio + the in-house `BezierEditor` twin + the value.js math consumption + the value.js gradient-pane consumer-#2 binding) materially EXCEEDS the Batch-6 window — it is a net-new public component, a subpath registration, AND a cross-repo donor reconciliation that cannot co-schedule with the kf donor study in-batch. Per §Triumvirate, that is the cross-repo fence-respect close-path, NOT a gate failure: the `StepsEditor.vue` ships as the clearly-marked DEMO-ONLY interim, and the published `<EasingPicker>` fold is its NAMED successor (the §Named successors W-EASING-PRIMITIVE row — already present in the wave spec, so `proof:fourier-studio` W6 `booked=true`). The steps sub-editor lands in the gallery's Steps card, NOT a fourth fork; when W-EASING-PRIMITIVE publishes the picker, this logic re-homes INTO it.

## §0 drift recorded (re-grep at HEAD)

- **BA-FOUR-4 PARTIALLY pre-closed**: `dftFromPoints` already has TWO demo consumers at HEAD — `demo/eggs/fGlyphPoints.ts` + `demo/eggs/FRedrawOverlay.vue` (the ℱ-wordmark redraw EASTER EGG, landed after spec authoring). The spec's W4 RED-at-HEAD claim (`grep -rl dftFromPoints demo/` returns 0) is STALE. The gate W4 is therefore SCOPED to the STUDIO's own `fourier-paths.ts` consumer (not "any demo consumer"), and `fourier-paths.ts` REUSES `fGlyphPoints` (one source of truth for the brand outline) — so the studio's consumer face is genuine and the egg's pre-existence does not vacuously green W4.
- **W-DEMO-AFFORDANCES IS present in the working tree**: `curve-gallery.vue` + `curve-gallery/BezierEditor.vue` are already modified (the play-button rebuild + the chip-rack picker LANDED). Unit C SEQUENCED on the rebased file (the single-writer rule) — the `StepsEditor` mount is in the disjoint Steps-card region, not the play/picker region W-DEMO-AFFORDANCES owns. NO conflict.
- **W-DEMO-AFFORDANCES's dedicated play REGISTER has NOT landed** (no shared play-control primitive exists; curve-gallery uses `StoryPlayButton`). Per §Dependencies the studio uses the shipped `<DockBackgroundToggle v-model:paused>` (a genuine FIXED glass Pause↔Play register, satisfying the no-rainbow-blob negative-predicate) as the transport play control; the `v-model:paused` contract is the stable seam the orchestrator re-points to the dedicated register at the affordances-wave integration.
- **W-STAGE is present in the working tree** (manifest/ShowcaseFrame/story-hero.css modified, DockStage.vue added) — the captioned-frame affordance landed; the studio consumes the W-STAGE chassis (the `paper` route background resolves through the W-STAGE category map).
- The clock at `FourierField.vue:245-248` + the six-prop surface at :41-65 held their cited line ranges (no drift).

## The π binding readback (`tests-visual/fourier-studio.spec.ts` — 16/16 both projects)

- **(a) the partial-sum curve ASSEMBLES as N grows** — on the Brand mark ℱ source (a ~160-term DFT), at N=1 the curve is a single ellipse collapsed toward the centroid; at N=40 it resolves toward the wordmark — the frame SIGNATURE changes substantially (not a static morph) AND the painted bounding-box area grows (the curve resolving INTO the shape). The reference's "watch it sum" signature.
- **(b) the epicycle toggle is ORTHOGONAL** — toggling the chain checkbox changes the painted footprint (chain appears/disappears) while both states keep a non-empty summed curve (N truncation and epicycle visibility are independent axes).
- **(d) pause freezes a frame** — clicking the transport Pause toggle freezes the clock; two reads of the canvas signature 450ms apart are byte-identical (the controllable clock froze the playhead).
- **(R5-11) the hero field leans WARM** — on the ambient `/substrates/fourier-field` route the hero-variant canvas's sampled mean RGB has `r > b` (the restored warm-anchored register; the slides fc-fourier G4 reproduction PASSES).
- **Captures** (fullPage, BOTH modes × 2 viewports): `W-FOURIER-STUDIO-{desktop,mobile}-{light,dark}.png` — the studio reads as the foreground center of gravity (the "Fourier Studio" hero, the assembling warm-ink curve with epicycle arms, the status pill `N 4/7 playing · t`, the transport row), NOT the three read-only panels (the BA-FOUR-1 defect).

## Gestalt provisional verdict (the `motion+fourier` row — W-REFLECT2 confirms operative)

**PROVISIONAL PASS.** The fourier band now reads as the two registers the user named (R8-10): the AMBIENT `<FourierField>` stays a recessive background face (the ambient story, the route field), and a FOREGROUND interactive STUDIO lands — a `<Configurator>` controls column over a Canvas2D stage where a user drags the 1..K slider and WATCHES the curve resolve term by term, toggles epicycles orthogonally, scrubs the clock on the house transport, and picks "Brand mark ℱ" to see the wordmark drawn by its own Fourier epicycles. Both-mode captures over the W-DARK-MATERIAL backdrop confirm the studio is the demo's center of gravity, not a mechanism that greens a checklist while the page stays the three read-only panels (the P-1 close-class). W-REFLECT2 owns the verdict flip in the `ba-gestalt-roster.md` `motion+fourier` row.

## Verification

- `node scripts/proof-fourier-studio.mjs` → 7/7 source witnesses GREEN (born-RED at HEAD: W3-W6 + π RED pre-wave; W1/W2 turned GREEN by Unit A).
- `tests-visual/fourier-studio.spec.ts` → 16/16 (8 per project × 2 projects: chromium-headless-new + coarse-touch).
- `npm run typecheck` GREEN · `npm run build` GREEN (`partialSumAt` re-emits in `dist/components/custom/fourier-field/math.d.ts` + `index.d.ts`; `/fourier-math` carries it) · `npm run verify-export-types` GREEN.
- `npm run proof:colocation` PASS (the new files are demo/, off the src/custom colocation bar) · no-god-module: every new file < 500 lines.
- `proof:gate-script-parity` RED on the orphan `proof-fourier-studio.mjs` — EXPECTED until the orchestrator registers the `proof:fourier-studio` row (the registration is the orchestrator-integration edit; the rows are emitted in the agent report).
