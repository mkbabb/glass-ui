# BI.W-P032 — Pointer velocity, drag, and coarse-input motion

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** motion
**Core centers:** C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P032`

## Intent

Unify pointer velocity/drag fields with bounded semantic mappings and coarse-input equivalents.

## Exact scope

- Make one velocity sampler and normalized field mapping serve drag morph, dock response, blob interaction, and applicable components.
- Delete private samplers, frame-rate-dependent gains, and fine-pointer assumptions.
- Bound displacement/scale/settle and preserve cancellation, capture, touch, keyboard, and PRM semantics.
- Separate direct manipulation from decorative hover response.

## File manifest (59)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 2 | repair | demo/stories/substrates/aurora/NucleiOverlay.vue | — | 7da942d2f050904d101f2303859358a58013c562 | source base |
| 3 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | repair | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 6 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 7 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 8 | repair | src/components/aurora/composables/useCursorInteraction.ts | — | — | BI.W-P008 |
| 9 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 10 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 11 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 12 | repair | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 13 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 14 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 15 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 16 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 17 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 18 | repair | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 19 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 20 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 21 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 22 | repair | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 24 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 25 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 26 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 27 | repair | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 28 | repair | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 29 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 30 | repair | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 31 | repair | src/components/sortable-list/composables/dragController.ts | — | — | BI.W-P007 |
| 32 | repair | src/components/sortable-list/composables/dropResolver.ts | — | — | BI.W-P007 |
| 33 | repair | src/components/sortable-list/composables/touchGate.ts | — | — | BI.W-P007 |
| 34 | repair | src/components/sortable-list/composables/types.ts | — | — | BI.W-P007 |
| 35 | repair | src/components/sortable-list/SortableList.vue | — | — | BI.W-P007 |
| 36 | repair | src/components/tabs/composables/useTabDragMorph.ts | — | — | BI.W-P008 |
| 37 | repair | src/components/tabs/README.md | — | — | BI.W-P008 |
| 38 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 39 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 40 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 41 | repair | src/composables/dom/useDragVelocity.ts | — | fae0e47276b1f15a8bef19271c829ff93bb98623 | source base |
| 42 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 43 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 44 | repair | src/composables/glass/vSpecular.ts | — | 85cb68a2334703507752c2998feda36dfcc4d56c | source base |
| 45 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 46 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 47 | modify | src/composables/motion/pointerFieldMappings.ts | — | 4109208b147c0823e39f31324e7b5c6ea5e9ecd6 | source base |
| 48 | repair | src/composables/motion/useCharStagger.ts | — | 5238e20760401b503b13535e0330939fd742b94c | source base |
| 49 | modify | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 50 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 51 | modify | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 52 | modify | src/composables/motion/useRoutePointer.ts | — | 5ce142b544148877b2cba149f1c700b6e615d226 | source base |
| 53 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 54 | repair | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 55 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 56 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 57 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 58 | create | tests-visual/pointer-drag.spec.ts | — | — | source base |
| 59 | create | tests/composables/motion/pointer-field.test.ts | — | — | source base |

## Repair manifest (59)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/dock/layers.vue |
| imports | 2 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| imports | 3 | demo/stories/substrates/glass-material.vue |
| imports | 4 | src/components/aurora/DESIGN.md |
| imports | 5 | src/components/aurora/README.md |
| imports | 6 | src/components/aurora/composables/frameLoop.ts |
| imports | 7 | src/components/aurora/composables/runtime.ts |
| imports | 8 | src/components/aurora/composables/uniformBridge.ts |
| imports | 9 | src/components/aurora/composables/useCursorInteraction.ts |
| imports | 10 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 11 | src/components/blob/composables/useBlobPointer.ts |
| imports | 12 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 13 | src/components/button/Button.vue |
| imports | 14 | src/components/button/index.ts |
| imports | 15 | src/components/card/Card.vue |
| imports | 16 | src/components/constellation/composables/useConstellation.ts |
| imports | 17 | src/components/constellation/constellationField.ts |
| imports | 18 | src/components/constellation/constellationInteraction.ts |
| imports | 19 | src/components/dock/DockLayerGroup.vue |
| imports | 20 | src/components/dock/composables/useDockFisheye.ts |
| imports | 21 | src/components/drawer/composables/useDrawerSnap.ts |
| imports | 22 | src/components/easing/EasingPicker.vue |
| imports | 23 | src/components/fourier-field/FourierField.vue |
| imports | 24 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 25 | src/components/fourier-field/constants.ts |
| imports | 26 | src/components/liquid-grid/README.md |
| imports | 27 | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts |
| imports | 28 | src/components/liquid-grid/composables/uniformBridgeWGPU.ts |
| imports | 29 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 30 | src/components/sortable-list/SortableList.vue |
| imports | 31 | src/components/sortable-list/composables/dragController.ts |
| imports | 32 | src/components/sortable-list/composables/dropResolver.ts |
| imports | 33 | src/components/sortable-list/composables/touchGate.ts |
| imports | 34 | src/components/sortable-list/composables/types.ts |
| imports | 35 | src/components/tabs/README.md |
| imports | 36 | src/components/tabs/SegmentedTabs.vue |
| imports | 37 | src/components/tabs/composables/useTabDragMorph.ts |
| imports | 38 | src/components/timeline/ScrubberTimeline.vue |
| imports | 39 | src/composables/dom/index.ts |
| imports | 40 | src/composables/dom/useDragVelocity.ts |
| imports | 41 | src/composables/glass/useSpecularPointer.ts |
| imports | 42 | src/composables/glass/useSpecularTracking.ts |
| imports | 43 | src/composables/glass/vSpecular.ts |
| imports | 44 | src/composables/motion/core/index.ts |
| imports | 45 | src/composables/motion/index.ts |
| imports | 46 | src/composables/motion/pointerFieldMappings.ts |
| imports | 47 | src/composables/motion/useCharStagger.ts |
| imports | 48 | src/composables/motion/useDragMorph.ts |
| imports | 49 | src/composables/motion/useLeadTrail.ts |
| imports | 50 | src/composables/motion/usePointerVelocityField.ts |
| imports | 51 | src/composables/motion/useRoutePointer.ts |
| imports | 52 | src/composables/motion/useScrollChrome.ts |
| imports | 53 | src/composables/motion/useScrollTrigger.ts |
| imports | 54 | src/index.ts |
| imports | 55 | src/styles/dock/fisheye.css |
| imports | 56 | src/styles/tabs/segmented-tabs-drag.css |
| tests | 1 | tests-visual/pointer-drag.spec.ts |
| tests | 2 | tests/composables/motion/pointer-field.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P032/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior.

**Required mutation bite:** Double velocity gain only at 120Hz and require cross-rate trajectory comparison to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P032`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: pointer-60hz, pointer-120hz, drag-cancel, drag-touch, drag-keyboard-equivalent, drag-prm
Observables: normalized velocity, displacement bounds, capture/cancel, settle, input equivalence
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P026 | Every spring-driven transition names one semantic family, reads its owning preset and generated horizon directly, stays within observed trajectory bands across input modes, and projects the same current parameters plus generation configuration into CSS, runtime, demos, and docs without a reverse alias table, lookalike solver call, or consumer-local fixed clock. |

Declared semantic locks: `motion-pointer`. The cursor also acquires 59 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
