# BI.W-P026 — Spring families as semantic motion tokens

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** motion
**Core centers:** C1_LIQUID_GLASS, C2_DOCK, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P026`

## Intent

Replace arbitrary per-component timing with a small semantic spring language shared by press, selection, morph, dock, and route motion.

## Exact scope

- Define named spring families by behavior and state transition, not raw numeric aliases.
- Map each current consumer to a family or delete its redundant local spring.
- Keep SPRING_PRESETS as the parameter authority used directly by Glass JS consumers and generated CSS; do not recreate MOTION_CURVES or require one JS callable row per CSS alias.
- Derive every demo label, parameter readout, trajectory, and explanatory row from the same preset/callable owner; a moving animation with a stale number is still RED.
- Repair consumer-owned reveal CSS that pairs --spring-bouncy with a literal 500 ms clock: a named spring curve and its generated duration reader come from the same row. Stagger spacing may have its own semantic interval, but its 0.70/1.00/1.30 tempo behavior must be explicit rather than inherited from an unexplained 80 ms literal.
- Rebuild the Springs lab as an exact generated projection rather than a solver lookalike: visible options/copy derive from the current owned rows, any Dock exclusion is explicit, seeded readouts use the same measured-settle maxDuration/sample/rounding configuration as shipped CSS, and managed playback reads the generated tempo horizon instead of fixed 1100 ms. Counts remain descriptive and adding a row requires no hand-edited numeral.
- Do not freeze an exact preset count or duplicate a taste value in verification; semantic ownership, current consumers, generated projection, and measured trajectory decide whether a family remains.
- Measure settle, overshoot, velocity continuity, and input-mode scaling as ranges.
- Keep duration curves only for transitions whose semantics are not physical springs.

## File manifest (46)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | modify | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 4 | modify | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 5 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | repair | src/components/_shared/useMotionAxis.ts | — | — | BI.W-P008 |
| 8 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 9 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 10 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 11 | repair | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 12 | repair | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 13 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 14 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 15 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 16 | repair | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 17 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 18 | repair | src/components/tabs/composables/useEyeglassLive.ts | — | — | BI.W-P008 |
| 19 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 20 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 21 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 22 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 23 | modify | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 24 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 25 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 26 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 27 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 28 | repair | src/composables/motion/useNumericTransition.ts | — | 3b0f52060d5c8e78c5e6a697e51412794d89e27b | source base |
| 29 | modify | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 30 | modify | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 31 | repair | src/composables/motion/useSpringPress.ts | — | a44c23fe34aaa42bbf30f35f882925b501bc05a3 | source base |
| 32 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 33 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 34 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 35 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 36 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 37 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 38 | repair | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 39 | create | src/styles/tokens/motion.css | — | — | source base |
| 40 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 41 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 42 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 43 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 44 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 45 | create | tests-visual/spring-language.spec.ts | — | — | source base |
| 46 | create | tests/composables/motion/spring-language.test.ts | — | — | source base |

## Repair manifest (44)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/display/buttons.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/motion/springs.vue |
| imports | 4 | demo/stories/substrates/constellation.vue |
| imports | 5 | src/components/_shared/useMotionAxis.ts |
| imports | 6 | src/components/blob/types.ts |
| imports | 7 | src/components/button/Button.vue |
| imports | 8 | src/components/card/Card.vue |
| imports | 9 | src/components/constellation/Constellation.vue |
| imports | 10 | src/components/constellation/README.md |
| imports | 11 | src/components/constellation/constellationField.ts |
| imports | 12 | src/components/constellation/constellationInteraction.ts |
| imports | 13 | src/components/dialog/DialogContent.vue |
| imports | 14 | src/components/dock/DockControl.vue |
| imports | 15 | src/components/dock/constants.ts |
| imports | 16 | src/components/tabs/composables/useEyeglassLive.ts |
| imports | 17 | src/components/timeline/ScrubberTimeline.vue |
| imports | 18 | src/composables/glass/useSpecularPointer.ts |
| imports | 19 | src/composables/motion/README.md |
| imports | 20 | src/composables/motion/index.ts |
| imports | 21 | src/composables/motion/springPresets.ts |
| imports | 22 | src/composables/motion/useBloomUp.ts |
| imports | 23 | src/composables/motion/useDragMorph.ts |
| imports | 24 | src/composables/motion/useElementMorph.ts |
| imports | 25 | src/composables/motion/useLiquidPress.ts |
| imports | 26 | src/composables/motion/useNumericTransition.ts |
| imports | 27 | src/composables/motion/useSpring.ts |
| imports | 28 | src/composables/motion/useSpringMount.ts |
| imports | 29 | src/composables/motion/useSpringPress.ts |
| imports | 30 | src/index.ts |
| imports | 31 | src/styles/animations.css |
| imports | 32 | src/styles/glass/material.css |
| imports | 33 | src/styles/glass/surfaces.css |
| imports | 34 | src/styles/segmented-tabs.css |
| imports | 35 | src/styles/theme/bridges.css |
| imports | 36 | src/styles/tokens/motion-registers.css |
| imports | 37 | src/styles/tokens/property-regs-specular.css |
| imports | 38 | src/styles/tokens/property-regs.css |
| imports | 39 | src/styles/tokens/scheme-motion.css |
| imports | 40 | src/styles/tokens/scheme-spring.css |
| imports | 41 | src/styles/utilities/btn.css |
| tests | 1 | tests-visual/spring-language.spec.ts |
| tests | 2 | tests/composables/motion/spring-language.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P026/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every spring-driven transition names one semantic family, reads its owning preset and generated horizon directly, stays within observed trajectory bands across input modes, and projects the same current parameters plus generation configuration into CSS, runtime, demos, and docs without a reverse alias table, lookalike solver call, or consumer-local fixed clock.

**Required mutation bite:** Replace press with the route-transition family, restore a token→callable mirror, display 0.32/0.7 while the Dock callable uses 0.30/0.82, pair --spring-bouncy with fixed 500 ms, or omit maxDuration in the seeded lab so its 24-stop readout differs from the shipped 48-stop token; spring-language evidence must turn RED even when the surface still settles.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P026`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: spring-press, spring-selection, spring-morph, spring-route, spring-seeded-readout-token-equality, spring-derived-register-ui, spring-reveal-stagger-0.70-1.00-1.30, spring-coarse
Observables: settle time range, overshoot range, velocity continuity, semantic family match, trajectory/duration/generation owner equality, derived option/copy truth, declared stagger tempo behavior
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P025 | Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic. |

Declared semantic locks: `global-tokens`, `motion-vocabulary`. The cursor also acquires 46 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
