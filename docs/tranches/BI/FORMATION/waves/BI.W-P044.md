# BI.W-P044 — Single procedural color and compositing pipeline

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** procedural
**Core centers:** C1_LIQUID_GLASS, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P044`

## Intent

Make CSS tokens, Canvas, GLSL, and WGSL share one linear-light color semantics with explicit gamut, alpha, and output encoding.

## Exact scope

- Define analytic reference vectors from CSS/OKLCh input through linear working space, premultiplication, tone/gamut handling, and output encoding.
- Remove duplicate shader color libraries, OETF forks, canvas probes, and engine-specific parameter meanings.
- Generate GLSL/WGSL shared constants/functions from one semantic source where language syntax permits.
- Validate analytic vectors and painted readbacks in light/dark and alpha composites.

## File manifest (66)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | repair | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 3 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 4 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 5 | repair | demo/stories/substrates/aurora/OklchStopRow.vue | — | 04bc76245b45f57ec97a846de7b77a6a31d55c28 | source base |
| 6 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 7 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 8 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 9 | repair | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 10 | repair | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 11 | repair | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 12 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 13 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 14 | repair | src/components/aurora/constants/shaders/aurora-image.frag.ts | — | — | BI.W-P008 |
| 15 | repair | src/components/aurora/constants/shaders/aurora-image.wgsl.ts | — | — | BI.W-P008 |
| 16 | repair | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts | — | — | BI.W-P008 |
| 17 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 18 | repair | src/components/aurora/constants/shaders/aurora.wgsl.ts | — | — | BI.W-P008 |
| 19 | repair | src/components/aurora/constants/shaders/brush.glsl.ts | — | — | BI.W-P008 |
| 20 | repair | src/components/aurora/constants/shaders/composition.glsl.ts | — | — | BI.W-P008 |
| 21 | repair | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 22 | repair | src/components/aurora/constants/shaders/procedural-color.wgsl.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/aurora/constants/shaders/tonemap.glsl.ts | — | — | BI.W-P008 |
| 24 | repair | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts | — | — | BI.W-P008 |
| 25 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 26 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 27 | repair | src/components/aurora/RESEARCH.md | — | — | BI.W-P008 |
| 28 | repair | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 29 | repair | src/components/blob/config.ts | — | — | BI.W-P008 |
| 30 | repair | src/components/blob/presets.ts | — | — | BI.W-P008 |
| 31 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 32 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 33 | repair | src/components/blob/shaders/metaball-noise.wgsl.ts | — | — | BI.W-P008 |
| 34 | repair | src/components/blob/shaders/metaball-palette.wgsl.ts | — | — | BI.W-P008 |
| 35 | repair | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 36 | repair | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 37 | repair | src/components/blob/shaders/metaball.wgsl.ts | — | — | BI.W-P008 |
| 38 | repair | src/components/blob/shaders/oklch-perturb.glsl.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 40 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 41 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 42 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 43 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 44 | repair | src/components/fourier-field/index.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 46 | repair | src/components/fourier-field/shaders/fourier-field.glsl.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts | — | — | BI.W-P008 |
| 48 | repair | src/components/liquid-grid/shaders/liquid-grid.glsl.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts | — | — | BI.W-P008 |
| 50 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 51 | modify | src/composables/color/accent-tone-solve.ts | — | d79c1758322bb095bb231703b724e1ca43aceb26 | source base |
| 52 | modify | src/composables/color/index.ts | — | 50c3688ba72f56ad962941f88e3535a161827a10 | source base |
| 53 | modify | src/composables/color/spectrum-walk.ts | — | cfd59489e0d18b9bff928e69de4e6edb0cdaa026 | source base |
| 54 | modify | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 55 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 56 | repair | src/composables/dom/useResolveTokenColor.ts | — | 07f5e36ba049bbcb2fb12634bd6e5b70f6f2e455 | source base |
| 57 | repair | src/composables/dom/useTokenColor.ts | — | 88b514b81e6091e46ef8cb0c11c5f6f458c4ce6e | source base |
| 58 | repair | src/composables/glass/ambientHueHistogram.ts | — | 92c767ec8f3d6a6d1fd29353045c0b4645454bad | source base |
| 59 | create | src/composables/glass/procedural/color-contract.json | — | — | source base |
| 60 | create | src/composables/glass/procedural/color.ts | — | — | source base |
| 61 | repair | src/composables/glass/webgl/shaders/flow.glsl.ts | — | 6d5ba6b66d453b21e6a1945b6cbfa560b584b5d8 | source base |
| 62 | repair | src/composables/glass/webgl/shaders/flow.wgsl.ts | — | 316a8152fca9a183a566965e606091ab2a2298fa | source base |
| 63 | modify | src/composables/glass/webgl/shaders/procedural-color.glsl.ts | — | b69cec45a95d498d3d03eedc580b4870f6e699a6 | source base |
| 64 | create | src/composables/glass/webgpu/procedural-color.wgsl.ts | — | — | source base |
| 65 | create | tests-visual/procedural-color.spec.ts | — | — | source base |
| 66 | create | tests/composables/glass/procedural-color.test.ts | — | — | source base |

## Repair manifest (64)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/aurora-hero.ts |
| imports | 2 | demo/stories/substrates/aurora.vue |
| imports | 3 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 4 | demo/stories/substrates/aurora/OklchStopRow.vue |
| imports | 5 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 6 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 7 | demo/stories/substrates/blob.vue |
| imports | 8 | src/components/PROCEDURAL-SUITE.md |
| imports | 9 | src/components/aurora/DESIGN.md |
| imports | 10 | src/components/aurora/README.md |
| imports | 11 | src/components/aurora/RESEARCH.md |
| imports | 12 | src/components/aurora/composables/atoms.ts |
| imports | 13 | src/components/aurora/composables/auroraFallbackGround.ts |
| imports | 14 | src/components/aurora/composables/color.ts |
| imports | 15 | src/components/aurora/composables/uniformBridge.ts |
| imports | 16 | src/components/aurora/constants/presets.ts |
| imports | 17 | src/components/aurora/constants/shaders/aurora-image.frag.ts |
| imports | 18 | src/components/aurora/constants/shaders/aurora-image.wgsl.ts |
| imports | 19 | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts |
| imports | 20 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 21 | src/components/aurora/constants/shaders/aurora.wgsl.ts |
| imports | 22 | src/components/aurora/constants/shaders/brush.glsl.ts |
| imports | 23 | src/components/aurora/constants/shaders/composition.glsl.ts |
| imports | 24 | src/components/aurora/constants/shaders/mediums.glsl.ts |
| imports | 25 | src/components/aurora/constants/shaders/procedural-color.wgsl.ts |
| imports | 26 | src/components/aurora/constants/shaders/tonemap.glsl.ts |
| imports | 27 | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts |
| imports | 28 | src/components/blob/README.md |
| imports | 29 | src/components/blob/RESEARCH.md |
| imports | 30 | src/components/blob/composables/uploadBlobUniforms.ts |
| imports | 31 | src/components/blob/config.ts |
| imports | 32 | src/components/blob/presets.ts |
| imports | 33 | src/components/blob/shaders/metaball-noise.wgsl.ts |
| imports | 34 | src/components/blob/shaders/metaball-palette.wgsl.ts |
| imports | 35 | src/components/blob/shaders/metaball-uniforms.glsl.ts |
| imports | 36 | src/components/blob/shaders/metaball.frag.ts |
| imports | 37 | src/components/blob/shaders/metaball.wgsl.ts |
| imports | 38 | src/components/blob/shaders/oklch-perturb.glsl.ts |
| imports | 39 | src/components/blob/types.ts |
| imports | 40 | src/components/fourier-field/FourierField.vue |
| imports | 41 | src/components/fourier-field/README.md |
| imports | 42 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 43 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 44 | src/components/fourier-field/constants.ts |
| imports | 45 | src/components/fourier-field/index.ts |
| imports | 46 | src/components/fourier-field/shaders/fourier-field.glsl.ts |
| imports | 47 | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts |
| imports | 48 | src/components/liquid-grid/shaders/liquid-grid.glsl.ts |
| imports | 49 | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts |
| imports | 50 | src/composables/color/accent-tone-solve.ts |
| imports | 51 | src/composables/color/index.ts |
| imports | 52 | src/composables/color/spectrum-walk.ts |
| imports | 53 | src/composables/color/useAccentTone.ts |
| imports | 54 | src/composables/dom/index.ts |
| imports | 55 | src/composables/dom/useResolveTokenColor.ts |
| imports | 56 | src/composables/dom/useTokenColor.ts |
| imports | 57 | src/composables/glass/ambientHueHistogram.ts |
| imports | 58 | src/composables/glass/webgl/shaders/flow.glsl.ts |
| imports | 59 | src/composables/glass/webgl/shaders/flow.wgsl.ts |
| imports | 60 | src/composables/glass/webgl/shaders/procedural-color.glsl.ts |
| tests | 1 | tests-visual/procedural-color.spec.ts |
| tests | 2 | tests/composables/glass/procedural-color.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/PROCEDURAL-SUITE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P044/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding.

**Required mutation bite:** Apply output encoding twice in one engine and require analytic plus painted readback parity to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P044`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.import-boundaries | device-free | Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior. | Import a sibling family's internal file.; Create an SCC between motion and glass. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: procedural-color-light, procedural-color-dark, procedural-color-alpha, procedural-color-gamut
Observables: analytic vector error, painted readback delta, alpha edge, theme resolution
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P043 | Every procedural renderer composes one lifecycle and releases all observers/loops/resources; no scene can silently fork acquisition or pause behavior. |

Declared semantic locks: `global-color`, `procedural-color`. The cursor also acquires 66 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
