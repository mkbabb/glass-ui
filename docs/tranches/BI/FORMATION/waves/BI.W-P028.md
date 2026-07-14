# BI.W-P028 — Single FLIP and morph engine

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** motion
**Core centers:** C2_DOCK, C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P028`

## Intent

Collapse element, liquid, bloom, drag, and dock morph wrappers onto one measurable spatial-transition engine.

## Exact scope

- Make useElementMorph the single geometry/FLIP runner with explicit source/destination ownership and interruption semantics.
- Compose reveal, dock CTA receive, bloom, and drag morph as configurations rather than private runners.
- Delete duplicate measurement, rAF, lock, and transform writers.
- Preserve focus/identity and handle source removal, resize, and interruption deterministically.
- Resolve D4 liquid-morph M3 by measuring the interactive source/destination target: retain the 44px floor only where it is an actual coarse-input target, never as a universal visual-size literal.

## File manifest (22)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | repair | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 3 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 4 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 5 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 8 | modify | src/composables/motion/bloomUpField.ts | — | c11a3d98e030f0918bc09b6b9d23c37e48b1c8cc | source base |
| 9 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 10 | modify | src/composables/motion/morphSignatures.ts | — | bd3085c3ef919f8c00d14bce0033b8ab157f40ee | source base |
| 11 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 12 | modify | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 13 | modify | src/composables/motion/useDockCtaReceive.ts | — | 9ad016d7a426f05133188f346ca18a26f38d1323 | source base |
| 14 | modify | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 15 | modify | src/composables/motion/useLiquidReveal.ts | — | e0b07d8def7b5a2bb383845f1f96ceee663729f8 | source base |
| 16 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 17 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 18 | repair | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 19 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 20 | repair | src/styles/utilities/animate.css | — | 0c6a4aa2a584c1732b9c3c512f79d9901ef479ac | source base |
| 21 | create | tests-visual/morph-engine.spec.ts | — | — | source base |
| 22 | create | tests/composables/motion/morph-engine.test.ts | — | — | source base |

## Repair manifest (21)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/shell/dock-nav.css |
| imports | 3 | demo/stories/dock/cta-receive.vue |
| imports | 4 | demo/stories/manifest.ts |
| imports | 5 | demo/stories/motion/reveal.vue |
| imports | 6 | src/components/dock/index.ts |
| imports | 7 | src/composables/motion/README.md |
| imports | 8 | src/composables/motion/bloomUpField.ts |
| imports | 9 | src/composables/motion/index.ts |
| imports | 10 | src/composables/motion/useBloomUp.ts |
| imports | 11 | src/composables/motion/useDockCtaReceive.ts |
| imports | 12 | src/composables/motion/useElementMorph.ts |
| imports | 13 | src/composables/motion/useLiquidReveal.ts |
| imports | 14 | src/styles/dock.css |
| imports | 15 | src/styles/dock/cta-seat.css |
| imports | 16 | src/styles/glass/liquid-enter.css |
| imports | 17 | src/styles/glass/reveal.css |
| imports | 18 | src/styles/utilities/animate.css |
| tests | 1 | tests-visual/morph-engine.spec.ts |
| tests | 2 | tests/composables/motion/morph-engine.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P028/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Exactly one spatial-transition runner owns measurement and transforms; every morph preserves identity/focus and survives interruption.

**Required mutation bite:** Fork a second rAF/ElementMorph runner inside useBloomUp and require ownership evidence to turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P028`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: morph-source-destination, morph-interrupt, morph-resize, morph-source-removed, morph-prm
Observables: geometry continuity, writer ownership, focus/identity, final transform cleanup
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P026 | Every spring-driven transition names one semantic family, reads its owning preset and generated horizon directly, stays within observed trajectory bands across input modes, and projects the same current parameters plus generation configuration into CSS, runtime, demos, and docs without a reverse alias table, lookalike solver call, or consumer-local fixed clock. |

Declared semantic locks: `motion-morph`. The cursor also acquires 22 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
