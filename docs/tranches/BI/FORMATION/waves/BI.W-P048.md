# BI.W-P048 — Constellation apotheosis — one field model on the proportionate Canvas2D renderer

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C10_CONSTELLATION_ASSAY, C4_PROCEDURAL_VIZ, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P048`

## Intent

Collapse the unjustified dual-GPU fork back into one deterministic Canvas2D field whose consumer skin, multi-instance story, and resource cost match the product's actual scale.

## Exact scope

- Make one seeded field model own nodes, wells, connections, density, motion, and interaction independent of renderer.
- Delete constellationWGPUSetup, constellationGLSetup, their WGSL/GLSL shaders, uniform bridge, GPU exports/tests, and every dual-engine claim; render the CPU-owned 64-node/edge field once through useCanvas2D on the shared lifecycle/color substrate.
- Calibrate point/line hierarchy, density, warp, egg/refit states, pointer/touch, dark/light, and PRM.
- Restore drawOverlay as the ordered final Canvas2D pass, with frozen-now semantics and causal focal/warp/pinned witnesses; delete every comment or proof that legalizes it as an inert public prop.
- Make the suite table, README, manifest, story prose, public types, tests, and runtime status agree on Canvas2D now; any future GPU migration requires a newly evidenced density/compute need and an explicit replacement for the skin contract.
- Prove the seven-instance story plus route background consumes zero WebGPU/WebGL contexts for Constellation, respects per-route context budgets, pauses each offscreen instance, and releases every observer/listener/loop.
- Keep slides/atlas consumer needs as read-only acceptance inputs, not foreign edits.

## File manifest (33)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | modify | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 6 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 7 | modify | src/components/constellation/composables/constellationGLSetup.ts | — | — | BI.W-P008 |
| 8 | modify | src/components/constellation/composables/constellationWGPUSetup.ts | — | — | BI.W-P008 |
| 9 | modify | src/components/constellation/composables/createConstellationField.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/constellation/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/constellation/constants.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/constellation/constellationRender.ts | — | — | BI.W-P008 |
| 17 | modify | src/components/constellation/constellationTypes.ts | — | — | BI.W-P008 |
| 18 | modify | src/components/constellation/constellationWell.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/constellation/index.ts | — | — | BI.W-P008 |
| 20 | modify | src/components/constellation/README.md | — | — | BI.W-P008 |
| 21 | modify | src/components/constellation/shaders/constellation-lines.glsl.ts | — | — | BI.W-P008 |
| 22 | modify | src/components/constellation/shaders/constellation-lines.wgsl.ts | — | — | BI.W-P008 |
| 23 | modify | src/components/constellation/shaders/constellation-points.glsl.ts | — | — | BI.W-P008 |
| 24 | modify | src/components/constellation/shaders/constellation-points.wgsl.ts | — | — | BI.W-P008 |
| 25 | create | tests-visual/constellation-apotheosis.spec.ts | — | — | source base |
| 26 | repair | tests-visual/constellation-egg-live.spec.ts | — | 1c12e57ace6e7e8b236929875b76e514721fe2dc | source base |
| 27 | repair | tests-visual/constellation-gen-live.spec.ts | — | 67f32fd526cec94d75c5c052fe757a76a2dad1e7 | source base |
| 28 | repair | tests-visual/constellation-refit-live.spec.ts | — | 55d3bdaef425d6a52ca70445d0f0c15e6a6f44b7 | source base |
| 29 | repair | tests-visual/constellation-warp-live.spec.ts | — | 969427869a033734befba4e0c43126a7a95dc161 | source base |
| 30 | repair | tests-visual/constellation.spec.ts | — | cc085c45d06915d0eaaba396b8f978f8c0d77ba7 | source base |
| 31 | repair | tests-visual/substrate-cohesion.spec.ts | — | bf042da59c96872a096d87c5c0539dc992c2d7c6 | source base |
| 32 | create | tests/components/constellation/contract.test.ts | — | — | source base |
| 33 | repair | tests/components/custom/constellation/constellationField.test.ts | — | d3e1f907148154c52d2601bb51e4d9d0e6d5a9d3 | source base |

## Repair manifest (26)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/StoryHero.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/substrates/constellation.vue |
| imports | 4 | tests-visual/constellation-egg-live.spec.ts |
| imports | 5 | tests-visual/constellation-gen-live.spec.ts |
| imports | 6 | tests-visual/constellation-refit-live.spec.ts |
| imports | 7 | tests-visual/constellation-warp-live.spec.ts |
| imports | 8 | tests-visual/constellation.spec.ts |
| imports | 9 | tests-visual/substrate-cohesion.spec.ts |
| imports | 10 | tests/components/custom/constellation/constellationField.test.ts |
| tests | 1 | demo/chassis/hero/StoryHero.vue |
| tests | 2 | demo/stories/manifest.ts |
| tests | 3 | demo/stories/substrates/constellation.vue |
| tests | 4 | tests-visual/constellation-apotheosis.spec.ts |
| tests | 5 | tests-visual/constellation-egg-live.spec.ts |
| tests | 6 | tests-visual/constellation-gen-live.spec.ts |
| tests | 7 | tests-visual/constellation-refit-live.spec.ts |
| tests | 8 | tests-visual/constellation-warp-live.spec.ts |
| tests | 9 | tests-visual/constellation.spec.ts |
| tests | 10 | tests-visual/substrate-cohesion.spec.ts |
| tests | 11 | tests/components/constellation/contract.test.ts |
| tests | 12 | tests/components/custom/constellation/constellationField.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/constellation/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P048/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** One deterministic CPU field feeds one Canvas2D renderer; drawOverlay and every retained interaction seam execute causally, seven-instance dogfood consumes no scarce GPU context, and readable hierarchy, stable seed/config semantics, bounded interaction, freeze, pause, and teardown survive.

**Required mutation bite:** Reintroduce createGpuSubstrate or a constellation shader, pass drawOverlay without invoking it, open a GPU context on the seven-instance route, or fork connection math; clean-break, interaction, resource, and live scenario evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P048`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: constellation-default, constellation-density, constellation-warp-overlay, constellation-pinned-overlay, constellation-pointer, constellation-multi-instance, constellation-prm
Observables: seeded geometry, point/line hierarchy, causal overlay paint, density/interaction bounds, zero Constellation GPU contexts, frame pacing and offscreen pause
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |

Declared semantic locks: `component-constellation`. The cursor also acquires 33 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
