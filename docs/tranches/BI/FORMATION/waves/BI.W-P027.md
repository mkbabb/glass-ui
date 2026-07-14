# BI.W-P027 — Press language and tactile glass response

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** motion
**Core centers:** C1_LIQUID_GLASS, C2_DOCK, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P027`

## Intent

Unify press feedback across Button, Chip, Toggle, Dock controls, and icon controls without wrapper-specific engines.

## Exact scope

- Compose one spring-press state model with pointer, keyboard, touch, disabled, cancellation, and re-entry semantics.
- Drive semantic press variables consumed by functional glass and geometry; delete component-local scale/timer recipes.
- Make one public press composable the configuration surface; fold useSpringPress into its private engine leaf and repoint Button's gate-preserving direct useSpringPress+useLiquidFlex reconstruction onto the same owner as Card and DockControl.
- Treat the CSS :active rule as a no-JS/pre-hydration capability phase that yields when the JS owner arms; it may not write scale concurrently with the live spring.
- Keep Button and other public components as consumers, not alternate press authorities or source-shape exceptions.
- Validate target stability, cancellation, focus visibility, and reduced motion.

## File manifest (53)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/containers/card-pressable.vue | — | 7486ccdd103aa62b9cb41326445bb4b48bb4d1dc | source base |
| 2 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 3 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 4 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | repair | src/components/_shared/useMotionAxis.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/button/Button.vue | — | — | BI.W-P008 |
| 8 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 9 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 10 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 11 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 12 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 13 | repair | src/components/timeline/ContinuousTimeline.vue | — | — | BI.W-P008 |
| 14 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 15 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 16 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 17 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 18 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 19 | modify | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 20 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 21 | modify | src/composables/motion/useSpringPress.ts | — | a44c23fe34aaa42bbf30f35f882925b501bc05a3 | source base |
| 22 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 23 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 24 | repair | src/styles/dock-controls.css | — | 892dba3b514be6bd6b8aa3b12028ae16f5035886 | source base |
| 25 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 26 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 27 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 28 | repair | src/styles/dock-controls/triggers.css | — | 07a870beb2ac348343c7309203adef7d43abdded | source base |
| 29 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 30 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 31 | repair | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 32 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 33 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 34 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 35 | repair | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 36 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 37 | repair | src/styles/glass/surface-axis.css | — | 5570ec55144da937de524b9808652227af827dfb | source base |
| 38 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 39 | create | src/styles/motion/press.css | — | — | source base |
| 40 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 41 | repair | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 42 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 43 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 44 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 45 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 46 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 47 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 48 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 49 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 50 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 51 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 52 | create | tests-visual/press-language.spec.ts | — | — | source base |
| 53 | create | tests/composables/motion/press.test.ts | — | — | source base |

## Repair manifest (52)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/containers/card-pressable.vue |
| imports | 2 | demo/stories/display/buttons.vue |
| imports | 3 | demo/stories/manifest.ts |
| imports | 4 | demo/stories/substrates/glass-material.vue |
| imports | 5 | src/components/_shared/useMotionAxis.ts |
| imports | 6 | src/components/button/Button.vue |
| imports | 7 | src/components/button/index.ts |
| imports | 8 | src/components/card/Card.vue |
| imports | 9 | src/components/dock/DockControl.vue |
| imports | 10 | src/components/dock/README.md |
| imports | 11 | src/components/tabs/SegmentedTabs.vue |
| imports | 12 | src/components/timeline/ContinuousTimeline.vue |
| imports | 13 | src/components/timeline/ScrubberTimeline.vue |
| imports | 14 | src/composables/glass/useSpecularPointer.ts |
| imports | 15 | src/composables/motion/README.md |
| imports | 16 | src/composables/motion/core/index.ts |
| imports | 17 | src/composables/motion/index.ts |
| imports | 18 | src/composables/motion/useLiquidPress.ts |
| imports | 19 | src/composables/motion/useSpring.ts |
| imports | 20 | src/composables/motion/useSpringPress.ts |
| imports | 21 | src/index.ts |
| imports | 22 | src/styles/cards.css |
| imports | 23 | src/styles/dock-controls.css |
| imports | 24 | src/styles/dock-controls/icon-button.css |
| imports | 25 | src/styles/dock-controls/tab-button.css |
| imports | 26 | src/styles/dock-controls/touch-floor.css |
| imports | 27 | src/styles/dock-controls/triggers.css |
| imports | 28 | src/styles/dock/morph.css |
| imports | 29 | src/styles/drawer.css |
| imports | 30 | src/styles/glass-refract.css |
| imports | 31 | src/styles/glass.css |
| imports | 32 | src/styles/glass/glass-atom.css |
| imports | 33 | src/styles/glass/glass-capsule.css |
| imports | 34 | src/styles/glass/ladder.css |
| imports | 35 | src/styles/glass/material.css |
| imports | 36 | src/styles/glass/surface-axis.css |
| imports | 37 | src/styles/glass/surfaces.css |
| imports | 38 | src/styles/theme/bridges.css |
| imports | 39 | src/styles/tokens/motion-registers.css |
| imports | 40 | src/styles/tokens/property-regs-specular.css |
| imports | 41 | src/styles/tokens/property-regs.css |
| imports | 42 | src/styles/tokens/scale-paper.css |
| imports | 43 | src/styles/tokens/scheme-motion.css |
| imports | 44 | src/styles/tokens/scheme-spring.css |
| imports | 45 | src/styles/tokens/scroll-tokens.css |
| imports | 46 | src/styles/tokens/sizing.css |
| imports | 47 | src/styles/utilities/base.css |
| imports | 48 | src/styles/utilities/btn.css |
| imports | 49 | src/styles/utilities/components.css |
| tests | 1 | tests-visual/press-language.spec.ts |
| tests | 2 | tests/composables/motion/press.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P027/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus.

**Required mutation bite:** Rebuild useSpringPress+useLiquidFlex directly in Button, or leave its CSS :active scale live beside the armed JS spring; topology/writer/trajectory evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P027`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: press-pointer, press-keyboard, press-touch-cancel, press-disabled, press-prm
Observables: scale/displacement, hit-target stability, focus visibility, cancel/re-entry state
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P026 | Every spring-driven transition names one semantic family, reads its owning preset and generated horizon directly, stays within observed trajectory bands across input modes, and projects the same current parameters plus generation configuration into CSS, runtime, demos, and docs without a reverse alias table, lookalike solver call, or consumer-local fixed clock. |

Declared semantic locks: `component-button`, `motion-press`. The cursor also acquires 53 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
