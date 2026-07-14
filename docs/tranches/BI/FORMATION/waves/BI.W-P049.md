# BI.W-P049 — Fourier Field apotheosis — math-owned ribbon and compute/render contract

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P049`

## Intent

Make FourierField one mathematical field concept whose compute, ribbon, configuration, and render paths are explicit and equivalent.

## Exact scope

- Keep Fourier math as a pure owned leaf and define one seeded coefficient/config contract.
- Unify compute/render and GLSL/WGSL semantics through shared lifecycle/color while preserving WebGPU compute advantage.
- Calibrate ribbon/field hierarchy, stage bounds, interaction, resize, and PRM.
- Delete the README/suite-table Canvas2D and future-migration archaeology and bind all public/demo engine claims to the live WebGPU/WebGL2 selector.
- Verify slides/fourier-analysis read-only usage against the final tarball through owner packets.

## File manifest (24)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | modify | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 4 | repair | demo/stories/substrates/fourier-paths.ts | — | 9cfcca76ea386f8773c805a4562252621039c077 | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 8 | modify | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 9 | modify | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/fourier-field/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/fourier-field/index.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/fourier-field/math.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/fourier-field/presets.ts | — | — | BI.W-P008 |
| 17 | modify | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 18 | modify | src/components/fourier-field/shaders/fourier-field.compute.wgsl.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/fourier-field/shaders/fourier-field.glsl.ts | — | — | BI.W-P008 |
| 20 | modify | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts | — | — | BI.W-P008 |
| 21 | modify | src/components/fourier-field/shaders/fourier-field.ribbon.ts | — | — | BI.W-P008 |
| 22 | create | tests-visual/fourier-field-apotheosis.spec.ts | — | — | source base |
| 23 | repair | tests/components/custom/fourier-field/FourierField.smoke.test.ts | — | 35b7b08dab35704672aba083df6dfb671de9dc77 | source base |
| 24 | create | tests/components/fourier-field/contract.test.ts | — | — | source base |

## Repair manifest (16)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/aurora-hero.ts |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/substrates/fourier-field.vue |
| imports | 4 | demo/stories/substrates/fourier-paths.ts |
| imports | 5 | tests/components/custom/fourier-field/FourierField.smoke.test.ts |
| tests | 1 | demo/chassis/hero/aurora-hero.ts |
| tests | 2 | demo/stories/manifest.ts |
| tests | 3 | demo/stories/substrates/fourier-field.vue |
| tests | 4 | demo/stories/substrates/fourier-paths.ts |
| tests | 5 | tests-visual/fourier-field-apotheosis.spec.ts |
| tests | 6 | tests/components/custom/fourier-field/FourierField.smoke.test.ts |
| tests | 7 | tests/components/fourier-field/contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/fourier-field/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P049/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Pure Fourier math/config feeds one field semantics across compute/render paths and engines, with bounded readable output and no duplicated math authority.

**Required mutation bite:** Normalize coefficients differently in the WebGL path and require analytic/render parity to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P049`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: fourier-default, fourier-ribbon, fourier-config, fourier-resize, fourier-prm, fourier-parity
Observables: coefficient/geometry parity, ribbon hierarchy, bounds, frame pacing
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |
| BI.W-P045 | A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection. |

Declared semantic locks: `component-fourier-field`. The cursor also acquires 24 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
