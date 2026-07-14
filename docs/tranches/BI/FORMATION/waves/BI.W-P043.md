# BI.W-P043 — One GPU and Canvas lifecycle substrate

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ, C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P043`

## Intent

Give every procedural scene one mount/resize/DPR/visibility/pause/error/resource lifecycle and remove scene-local infrastructure forks.

## Exact scope

- Unify WebGPU, WebGL2, and Canvas2D lifecycle composition while preserving their distinct rendering capabilities.
- Centralize adapter/context acquisition, backing size, DPR budgets, resize, visibility/intersection pause, teardown, and typed failure.
- Delete scene-local observers, frame loops, canvas replacement tricks, and leaked resource handles.
- Provide deterministic fake-device fixtures plus real-browser resource ownership probes.

## File manifest (54)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 2 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 5 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 6 | repair | src/components/aurora/constants/renderMode.ts | — | — | BI.W-P008 |
| 7 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 8 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 9 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 10 | repair | src/components/blob/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 11 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 12 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 13 | repair | src/components/constellation/composables/constellationGLSetup.ts | — | — | BI.W-P008 |
| 14 | repair | src/components/constellation/composables/constellationWGPUSetup.ts | — | — | BI.W-P008 |
| 15 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 16 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 17 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 18 | repair | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 19 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 20 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 21 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 22 | repair | src/components/liquid-grid/composables/liquidGridGLSetup.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 24 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 25 | repair | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 26 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 27 | modify | src/composables/glass/canvas2d/index.ts | — | 3a9f176bdce15830981142fb9d5983049d2dd586 | source base |
| 28 | modify | src/composables/glass/canvas2d/resolveCanvasColor.ts | — | fb5d2f75f7502a2b0d894cb2f10f9d7087730494 | source base |
| 29 | modify | src/composables/glass/canvas2d/useCanvas2D.ts | — | e98f4246dd0f00c6c23253f1d5c5984f7f763268 | source base |
| 30 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 31 | create | src/composables/glass/procedural/lifecycle.ts | — | — | source base |
| 32 | create | src/composables/glass/procedural/types.ts | — | — | source base |
| 33 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 34 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 35 | modify | src/composables/glass/webgl/backingSize.ts | — | 5557af8fc5431c60e4453480f936a4ea83eec949 | source base |
| 36 | modify | src/composables/glass/webgl/compile.ts | — | 586ddefdf8c953c21fce4907510b6b6966085c2d | source base |
| 37 | modify | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 38 | modify | src/composables/glass/webgl/shaders/flow.glsl.ts | — | 6d5ba6b66d453b21e6a1945b6cbfa560b584b5d8 | source base |
| 39 | modify | src/composables/glass/webgl/shaders/flow.wgsl.ts | — | 316a8152fca9a183a566965e606091ab2a2298fa | source base |
| 40 | modify | src/composables/glass/webgl/shaders/glass-refract.glsl.ts | — | 661d6430f6e1166d0e053e652ecbd84b0c1c101d | source base |
| 41 | modify | src/composables/glass/webgl/shaders/procedural-color.glsl.ts | — | b69cec45a95d498d3d03eedc580b4870f6e699a6 | source base |
| 42 | modify | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 43 | modify | src/composables/glass/webgl/visibility.ts | — | b1f5e5fd6a2beaed657031ecf6af40793a05feae | source base |
| 44 | modify | src/composables/glass/webgpu/glassShader.wgsl | — | b53c0d0b305fa40e8c973f4fa56f4118a4cb6c56 | source base |
| 45 | modify | src/composables/glass/webgpu/index.ts | — | ba02680ea91177d79964fa2a96875ecfd10d2422 | source base |
| 46 | modify | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 47 | modify | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 48 | modify | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 49 | modify | src/composables/glass/webgpu/webgpuDevice.ts | — | 1acf4002bb1ac6b8263cb858b7ba6ec3dd11a719 | source base |
| 50 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 51 | repair | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 52 | repair | src/styles/viz-reveal.css | — | 50809db823fb350416cdccd1dcdea63c98e7c52e | source base |
| 53 | create | tests-visual/procedural-lifecycle.spec.ts | — | — | source base |
| 54 | create | tests/composables/glass/procedural-lifecycle.test.ts | — | — | source base |

## Repair manifest (47)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 2 | demo/stories/substrates/constellation.vue |
| imports | 3 | src/components/PROCEDURAL-SUITE.md |
| imports | 4 | src/components/aurora/DESIGN.md |
| imports | 5 | src/components/aurora/README.md |
| imports | 6 | src/components/aurora/composables/runtime.ts |
| imports | 7 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 8 | src/components/aurora/constants/renderMode.ts |
| imports | 9 | src/components/blob/README.md |
| imports | 10 | src/components/blob/RESEARCH.md |
| imports | 11 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 12 | src/components/blob/composables/wgpuSetup.ts |
| imports | 13 | src/components/constellation/README.md |
| imports | 14 | src/components/constellation/composables/constellationGLSetup.ts |
| imports | 15 | src/components/constellation/composables/constellationWGPUSetup.ts |
| imports | 16 | src/components/constellation/composables/useConstellation.ts |
| imports | 17 | src/components/constellation/constellationInteraction.ts |
| imports | 18 | src/components/fourier-field/README.md |
| imports | 19 | src/components/fourier-field/composables/fourierFieldGLSetup.ts |
| imports | 20 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 21 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 22 | src/components/liquid-grid/README.md |
| imports | 23 | src/components/liquid-grid/composables/liquidGridGLSetup.ts |
| imports | 24 | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts |
| imports | 25 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 26 | src/composables/glass/canvas2d/index.ts |
| imports | 27 | src/composables/glass/canvas2d/useCanvas2D.ts |
| imports | 28 | src/composables/glass/index.ts |
| imports | 29 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 30 | src/composables/glass/useSpecularTracking.ts |
| imports | 31 | src/composables/glass/webgl/backingSize.ts |
| imports | 32 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 33 | src/composables/glass/webgl/shaders/procedural-color.glsl.ts |
| imports | 34 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 35 | src/composables/glass/webgl/visibility.ts |
| imports | 36 | src/composables/glass/webgpu/index.ts |
| imports | 37 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 38 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 39 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 40 | src/composables/glass/webgpu/webgpuDevice.ts |
| imports | 41 | src/composables/motion/useLeadTrail.ts |
| imports | 42 | src/composables/motion/usePointerVelocityField.ts |
| imports | 43 | src/styles/viz-reveal.css |
| tests | 1 | tests-visual/procedural-lifecycle.spec.ts |
| tests | 2 | tests/composables/glass/procedural-lifecycle.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/PROCEDURAL-SUITE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P043/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every procedural renderer composes one lifecycle and releases all observers/loops/resources; no scene can silently fork acquisition or pause behavior.

**Required mutation bite:** Create a scene-local ResizeObserver and leak one GPU buffer at unmount; lifecycle/resource evidence must turn RED for both defects.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P043`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: lifecycle-mount, lifecycle-resize, lifecycle-offscreen, lifecycle-hidden, lifecycle-resume, lifecycle-unmount
Observables: context/resource count, frame submissions, DPR/backing size, single resume, teardown baseline
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P025 | Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic. |

Declared semantic locks: `procedural-lifecycle`. The cursor also acquires 54 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
