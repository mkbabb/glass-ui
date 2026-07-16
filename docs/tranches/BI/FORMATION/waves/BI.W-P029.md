# BI.W-P029 — Enter/exit and View Transition continuity

**Status:** IMPLEMENTED — NATIVE CONTINUITY ACCEPTANCE PENDING
**Topological stratum:** BI.S17
**Formation family:** motion
**Core centers:** C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P029`

## Intent

Use modern native transitions where they preserve identity and one explicit instant path where motion is unavailable or reduced.

## Exact scope

- Unify discrete enter/exit, route, and shared-element recipes around semantic transition ownership.
- Use startViewTransition in supported Safari/Chrome without a competing visual writer; unsupported/reduced state updates instantly and visibly.
- Delete stale CSS name aliases, transition timers, and page-local route animations.
- Delete ModalOverlay's forward-reserved/no-op option spellings: scale and slide cannot alias fade, edge cannot alias centered, and an unused none branch cannot survive merely as hypothetical host accommodation. Retain only distinct current behavior owned by the composed Dialog/overlay episode.
- Repair the live Motion Tempo contract at the composed overlay boundary: panel, trigger, portaled scrim, close/reverse, and newly constructed Dock morph each expose their effective clock at 0.70 and 1.30. Distinct base durations may remain, but every channel advertised as co-scaled must change by the same 13/7 factor; the current fixed --duration-panel scrim cannot hide behind a correctly scaled glass-reveal panel.
- Preserve focus, scroll ownership, and final DOM visibility through interruption.

## File manifest (23)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | modify | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 3 | modify | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 4 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 5 | modify | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | modify | src/components/_shared/ModalOverlay.vue | — | — | BI.W-P008 |
| 8 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 9 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 10 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 11 | repair | src/components/toast/Toast.vue | — | — | BI.W-P008 |
| 12 | modify | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 13 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 14 | modify | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 15 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 16 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 17 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 18 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 19 | modify | src/styles/transitions.css | — | ff60e1b4e192a5ecb06479f9582c5e52bbf15c63 | source base |
| 20 | modify | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 21 | modify | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 22 | create | tests-visual/transition-continuity.spec.ts | — | — | source base |
| 23 | create | tests/composables/motion/view-transition.test.ts | — | — | source base |

## Repair manifest (18)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 3 | src/components/dock/DockCrossfade.vue |
| imports | 4 | src/components/dock/GlassDock.vue |
| imports | 5 | src/components/dock/README.md |
| imports | 6 | src/components/toast/Toast.vue |
| imports | 7 | src/composables/motion/useViewTransition.ts |
| imports | 8 | src/index.ts |
| imports | 9 | src/styles/animations.css |
| imports | 10 | src/styles/dock/popover.css |
| imports | 11 | src/styles/glass/reveal.css |
| imports | 12 | src/styles/index.css |
| imports | 13 | src/styles/tokens/scroll-tokens.css |
| imports | 14 | src/styles/transitions.css |
| imports | 15 | src/styles/view-transition.css |
| tests | 1 | tests-visual/transition-continuity.spec.ts |
| tests | 2 | tests/composables/motion/view-transition.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P029/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel.

**Required mutation bite:** Run a CSS route animation while View Transition owns the same subtree, or leave a Dialog scrim at fixed --duration-panel while its story claims every overlay co-scales 0.70→1.30; ownership/ratio evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P029`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: route-native, route-interrupt, overlay-discrete, overlay-tempo-0.70, overlay-tempo-1.30, overlay-tempo-reverse, route-prm, route-focus
Observables: identity continuity, focus, final visibility, writer count, panel/scrim/trigger normalized clock ratio, no flash
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P028 | Exactly one spatial-transition runner owns measurement and transforms; every morph preserves identity/focus and survives interruption. |

Declared semantic locks: `demo-shell`, `motion-transition`. The cursor also acquires 23 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
