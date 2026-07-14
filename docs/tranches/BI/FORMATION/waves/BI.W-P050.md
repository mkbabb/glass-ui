# BI.W-P050 — Liquid Grid apotheosis — WebGPU-first equivalent field

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C1_LIQUID_GLASS, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P050`

## Intent

Make LiquidGrid a focused procedural grid concept, not a showcase for duplicated GPU setup or unrelated material effects.

## Exact scope

- Define one grid/curl/derivative/config semantics and generated shared shader constants.
- Use shared lifecycle/color/capability with WebGPU preferred and equivalent GLSL output.
- Calibrate grid legibility, warp, motion, interaction, stage fit, dark/light, and PRM.
- Remove local setup/bridge forks and decorative effects outside the grid concept.

## File manifest (21)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 3 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 4 | modify | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 5 | repair | demo/stories/substrates/presets.ts | — | 495f075c40c737978133d8888c6ab090bb94f241 | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 8 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 9 | modify | src/components/liquid-grid/composables/liquidGrid.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/liquid-grid/composables/liquidGridGLSetup.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/liquid-grid/index.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 17 | modify | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 18 | modify | src/components/liquid-grid/shaders/liquid-grid.glsl.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts | — | — | BI.W-P008 |
| 20 | create | tests-visual/liquid-grid-apotheosis.spec.ts | — | — | source base |
| 21 | create | tests/components/liquid-grid/contract.test.ts | — | — | source base |

## Repair manifest (16)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/StoryHero.vue |
| imports | 2 | demo/chassis/hero/aurora-hero.ts |
| imports | 3 | demo/stories/manifest.ts |
| imports | 4 | demo/stories/substrates/liquid-grid.vue |
| imports | 5 | demo/stories/substrates/presets.ts |
| tests | 1 | demo/chassis/hero/StoryHero.vue |
| tests | 2 | demo/chassis/hero/aurora-hero.ts |
| tests | 3 | demo/stories/manifest.ts |
| tests | 4 | demo/stories/substrates/liquid-grid.vue |
| tests | 5 | demo/stories/substrates/presets.ts |
| tests | 6 | tests-visual/liquid-grid-apotheosis.spec.ts |
| tests | 7 | tests/components/liquid-grid/contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/liquid-grid/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P050/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** LiquidGrid has one grid/warp/config meaning across engines and remains legible, bounded, pause-aware, and still under PRM.

**Required mutation bite:** Change derivative-AA width only in GLSL and require edge-statistic parity to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P050`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: liquid-grid-default, liquid-grid-warp, liquid-grid-dark, liquid-grid-touch, liquid-grid-prm, liquid-grid-parity
Observables: edge/line statistics, warp/config parity, stage fit, interaction bounds, frame pacing
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |
| BI.W-P045 | A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection. |

Declared semantic locks: `component-liquid-grid`. The cursor also acquires 21 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
