# BI.W-P023 — Direct keyframes.js boundary and Glass-owned motion vocabulary

**Status:** IMPLEMENTED — IMMUTABLE KEYFRAMES 6 CUT DEFERRED TO P127
**Topological stratum:** BI.S12
**Formation family:** motion
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P023`

## Intent

Make keyframes.js the direct authority for its engine primitives while Glass publishes only its owned Vue bindings, semantic spring language, and authoring component—without a distribution mirror or foreign-demo clone.

## Exact scope

- Read the pinned keyframes.js public semantics only to classify direct upstream dependencies, Glass-owned bindings, and forbidden republishing; no upstream export roster or demo taxonomy becomes a Glass contract.
- Delete suite.ts and its /motion keyframes root re-export. /motion retains Glass-owned Vue/composable APIs and semantic preset data; a consumer that needs NumericAnimation, SpringProgress, ViewTransition helpers, or another upstream primitive imports keyframes.js directly.
- Delete curves.ts, /motion-curves from the generated entry graph/package/types/build, and every reverse CSS-token→JS callable-table test or document. CSS aliases do not owe JavaScript rows; semantic JS consumers read the owning preset or upstream callable directly.
- Preserve /easing as the legitimate Glass-owned EasingPicker/EasingConfigurator component boundary: its UI imports value.js/keyframes.js at the actual math/playback seam and never justifies a catalogue mirror.
- Replace the live Curve Gallery's FULL/1:1 foreign inventory with a Glass motion lab derived from SPRING_PRESETS, actual Glass transition semantics, and EasingPicker; every displayed parameter is generated from the callable's owner and causal playback uses declared engine authority.
- Rebuild every exact tracked consumer against the packed candidate and add owner-packet evidence for keyframes.js adoption without mutating its clean branch; adding an upstream export must require no Glass source change.

## File manifest (28)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | delete | demo/stories/motion/curve-families.ts | — | 5e4788036e5440186aa8de36d6296992d3e2729b | source base |
| 2 | modify | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | repair | docs/tranches/BI/coordination/asks-and-consumes.md | — | 8e0f519cfd324ae3f644f322e68f9c814adcc6e1 | source base |
| 5 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 6 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 8 | modify | src/components/easing/README.md | — | — | BI.W-P008 |
| 9 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 10 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 11 | delete | src/composables/motion/curves.ts | — | d0823817eb3a97512ec410c48f410ab0c580424c | source base |
| 12 | modify | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 13 | modify | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 14 | modify | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 15 | delete | src/composables/motion/suite.ts | — | 22525bab8bf45908aa8de473883143bb9b95883f | source base |
| 16 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 17 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 18 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 19 | repair | tests-visual/motion-demo.spec.ts | — | e91df9d27c6bd19de4e8b2b5219e265d190e85c4 | source base |
| 20 | repair | tests-visual/motion2.spec.ts | — | 23cc31af8db82cd8f8fa4ca1c8c8cc12f538cb53 | source base |
| 21 | delete | tests/composables/motion/convergence.test.ts | — | 67bed1e23561fb2d776c4fed25c482ac43034b1e | source base |
| 22 | delete | tests/composables/motion/curves.test.ts | — | a6ecf908906850aea7d687832831f4063816a2c9 | source base |
| 23 | create | tests/composables/motion/dependency-boundary.test.ts | — | — | source base |
| 24 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 25 | repair | tests/scripts/proof-animation-coherence.detect.test.ts | — | d9d97254cf74628b1886421003e58c2112558cdd | source base |
| 26 | repair | tsconfig.build.json | — | d6adea2adeceab036688260344f750209c4ffd84 | source base |
| 27 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |
| 28 | repair | vite.library.ts | — | 5824a5c2e549f390321793c72066fb69ced5f49a | source base |

## Repair manifest (27)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/motion/curve-families.ts |
| imports | 2 | src/components/easing/README.md |
| imports | 3 | src/components/timeline/ScrubberTimeline.vue |
| imports | 4 | src/composables/motion/README.md |
| imports | 5 | src/composables/motion/core/index.ts |
| imports | 6 | src/composables/motion/curves.ts |
| imports | 7 | src/composables/motion/index.ts |
| imports | 8 | src/composables/motion/springPresets.ts |
| imports | 9 | src/composables/motion/suite.ts |
| imports | 10 | src/index.ts |
| imports | 11 | src/styles/tokens/scheme-motion.css |
| imports | 12 | src/styles/tokens/scheme-spring.css |
| imports | 13 | tests/composables/motion/convergence.test.ts |
| imports | 14 | tests/composables/motion/curves.test.ts |
| imports | 15 | tests/scripts/proof-animation-coherence.detect.test.ts |
| tests | 1 | tests-visual/motion-demo.spec.ts |
| tests | 2 | tests-visual/motion2.spec.ts |
| tests | 3 | tests/composables/motion/dependency-boundary.test.ts |
| tests | 4 | tests/public-surface.spec.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | tsconfig.build.json |
| build | 4 | vite.config.ts |
| build | 5 | vite.library.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | docs/tranches/BI/coordination/asks-and-consumes.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P023/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Upstream engine primitives have one direct upstream authority; Glass publishes only owned motion bindings, semantic presets, and the /easing component, with no root-barrel mirror, reverse token-callable table, foreign-demo parity contract, stale displayed parameter, or consumer break.

**Required mutation bite:** Add a keyframes export and require no Glass diff; restore one upstream re-export or /motion-curves row and require entry/dependency evidence RED; hard-code a stale spring label and require the live Glass motion scenario RED even while its animation still moves.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P023`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.import-boundaries | device-free | Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior. | Import a sibling family's internal file.; Create an SCC between motion and glass. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| integrity.dependencies | device-free | Runtime, peer, optional, and development dependencies match actual import boundaries and the supported package contract. | Move a runtime dependency to devDependencies.; Add a second spring engine for an existing motion concept. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: motion-owned-springs, motion-owned-authoring, motion-upstream-import-negative, motion-stale-label-negative, motion-prm
Observables: packed export boundary, direct upstream owner, displayed/callable parameter equality, causal trajectory, no foreign inventory claim, PRM final state
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P022 | Accessibility modes preserve complete meaning and hierarchy; no required state disappears when visual effects or color are removed. |

Declared semantic locks: `demo-motion`, `entry-graph`, `motion-vocabulary`, `package-manifest`. The cursor also acquires 28 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current suite.ts hard-codes a stale upstream export roster; curves.ts publishes a consumerless reverse token table; the live 1:1 gallery displays five stale spring parameter labels while every tracked sibling has zero /motion-curves imports.
