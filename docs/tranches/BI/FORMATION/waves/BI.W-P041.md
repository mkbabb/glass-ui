# BI.W-P041 — Dock fisheye, morph, and settle on the shared motion spine

**Status:** PLANNED
**Topological stratum:** BI.S21
**Formation family:** dock
**Core centers:** C2_DOCK, C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P041`

## Intent

Make all Dock movement a bounded projection of shared clock/springs/morph/pointer velocity rather than a private animation engine.

## Exact scope

- Compose shared spring, pointer field, and element morph for fisheye, selection, layer receive, resize, and settle.
- Delete Dock-local spring clocks, timers, transform writers, and fine-pointer behavior on coarse input.
- Resolve D4's conflicting DOCK_SPRING observations (0.3/0.82 real versus 0.68/0.64 stale) from fresh trajectories, then calibrate quiet rest, direct manipulation, velocity response, interruption, and PRM; neither numeric pair is accepted as a baseline.
- Prove offscreen/hidden Dock work stops and resumes once.
- Resolve --dock-morph-min from the mounted semantic token cascade before geometry work; an unreadable/nonfinite value is one typed failing state and negative fixture, never a DOCK_TAP_FLOOR_PX substitution or repeated warning while the Dock continues.

## File manifest (12)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | modify | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 3 | modify | src/components/dock/composables/dockMorphMeasure.ts | — | — | BI.W-P008 |
| 4 | modify | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 6 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 7 | create | src/components/dock/styles/motion.css | — | — | source base |
| 8 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 9 | repair | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 10 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 11 | create | tests-visual/dock-motion.spec.ts | — | — | source base |
| 12 | create | tests/components/dock/motion.test.ts | — | — | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/composables/motion/useElementMorph.ts |
| imports | 2 | src/composables/motion/usePointerVelocityField.ts |
| imports | 3 | src/composables/motion/useSpring.ts |
| tests | 1 | tests-visual/dock-motion.spec.ts |
| tests | 2 | tests/components/dock/motion.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P041/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dock owns no private clock/physics engine, required geometry tokens resolve without masking, and all motion remains bounded, interruptible, input-appropriate, warning-free, and still under PRM.

**Required mutation bite:** Feed the stale 0.68/0.64 trajectory receipt, restore useDockSpring as a private rAF loop, or replace an unreadable mounted --dock-morph-min with DOCK_TAP_FLOOR_PX and continue; freshness/shared-writer/fail-closed checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P041`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-fisheye-fine, dock-fisheye-coarse, dock-layer-morph, dock-resize-interrupt, dock-prm, dock-offscreen, dock-morph-token-missing
Observables: writer count, magnitude/settle bands, geometry continuity, zero paused work, typed token failure and zero warning storm
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P036 | Dock selection has one semantic value, one indicator, and one transition owner; panel identity/focus survive every input path and exactly one active face contributes controls to accessibility, focus, hit-testing, and form state. |
| BI.W-P039 | Rail and bottom are one semantic Dock with exact content reservation, safe-area handling, nondegenerate scroll/overflow geometry, focus reveal, and target geometry across supported layout states. |

Declared semantic locks: `component-dock-motion`, `motion-clock`. The cursor also acquires 12 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
