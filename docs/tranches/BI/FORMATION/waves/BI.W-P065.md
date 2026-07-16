# BI.W-P065 — Button apotheosis — command/action control

**Status:** IMPLEMENTED — NATIVE ACCEPTANCE PENDING
**Topological stratum:** BI.S17
**Formation family:** component-display
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P065`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Button has one command contract, semantic tone/emphasis/size, shared press/focus/icon geometry, and native disabled/submission behavior.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Button has one command contract, semantic tone/emphasis/size, shared press/focus/icon geometry, and native disabled/submission behavior.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: default, primary, destructive, disabled, loading, icon, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (61)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/play/StoryPlayButton.vue | — | 5b52d114fba6b496b6f781cbd220c7aebb6dd7ab | source base |
| 2 | repair | demo/chassis/showcase/SpecimenFrame.vue | — | b21dc3b68ea45cb5daf015809f0f4398f34e4809 | source base |
| 3 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 4 | repair | demo/shell/NotFound.vue | — | 46ce8b6fe07e7bbc8fc8430ab29809ce7d9042a1 | source base |
| 5 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 6 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 7 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 8 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 9 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 10 | repair | demo/stories/containers/collapsible.vue | — | 82f8a2682bdc0128a826ef1e57ebe3f12f2df3a9 | source base |
| 11 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 12 | repair | demo/stories/containers/drawer.vue | — | b0b1fbdb6d48732d70330550ac61277f7592ca72 | source base |
| 13 | repair | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 14 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 15 | repair | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 16 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 17 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 18 | repair | demo/stories/containers/tooltip.vue | — | 0b436063aac06de803e4bfb779094bb579f8ce1e | source base |
| 19 | create | demo/stories/display/button.vue | — | — | source base |
| 20 | repair | demo/stories/display/buttons.tile.vue | — | 6cf26e0f64ca06468274d699400e10d395d0362c | source base |
| 21 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 22 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 23 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 24 | repair | demo/stories/feedback/completion-seal.vue | — | ad68e93be233b9d829906d6d45966249f802d230 | source base |
| 25 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 26 | repair | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 27 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 28 | repair | demo/stories/feedback/toast.vue | — | 417f1d0a506f018bec760b95647ee2252498bf4b | source base |
| 29 | repair | demo/stories/feedback/toaster.vue | — | 5e22100e62b79c1695df757f8ca90d470986e6cb | source base |
| 30 | repair | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 31 | repair | demo/stories/foundations/motion.vue | — | 137d730ba1e4f20e9d3a186e5d8462e3192db3d8 | source base |
| 32 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 33 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 34 | repair | demo/stories/motion/countup.vue | — | 9e211d7ed538441aa2b4c69c757c0faf2fd8159c | source base |
| 35 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 36 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 37 | repair | demo/stories/motion/handmark.vue | — | b7540e930d7ee9d6859af664a567c2efedec4335 | source base |
| 38 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 39 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 40 | repair | demo/stories/motion/split-chars.vue | — | 6d46a23e25428031f226056dc6f7f24094ad489f | source base |
| 41 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 42 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 43 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 44 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 45 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 46 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 47 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 48 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 49 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 50 | modify | src/components/button/Button.vue | — | — | BI.W-P008 |
| 51 | modify | src/components/button/index.ts | — | — | BI.W-P008 |
| 52 | create | tests-visual/button.contract.spec.ts | — | — | source base |
| 53 | repair | tests-visual/desktop-fluid-type.spec.ts | — | 0bf78165ba11359820024b496d7a041668812caa | source base |
| 54 | repair | tests-visual/emission.spec.ts | — | 51fdfe1a13e052c61662e744dfc262a09859a6ed | source base |
| 55 | repair | tests-visual/liquid-hover.spec.ts | — | a3bb1a188f9e2ecdb5bb8e8e4c8f8f573234aa51 | source base |
| 56 | repair | tests-visual/nested-backdrop-budget.spec.ts | — | 04a5573f0398caca362103bb8b27eb26a68ab1a1 | source base |
| 57 | repair | tests-visual/storybook-meta.spec.ts | — | 24ac892fc46cd02a7e852f715f4254b282d61e7b | source base |
| 58 | create | tests/components/button.contract.test.ts | — | — | source base |
| 59 | repair | tests/components/ui/button/Button.test.ts | — | 5e6711ef187002c983f76139604bc414c40da4e1 | source base |
| 60 | repair | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |
| 61 | repair | tests/scripts/storybook-complete.detect.test.ts | — | 9bdf1ba970e751915127e5c4c686cc2bf4c094ab | source base |

## Repair manifest (67)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/play/StoryPlayButton.vue |
| imports | 2 | demo/chassis/showcase/SpecimenFrame.vue |
| imports | 3 | demo/shell/NotFound.vue |
| imports | 4 | demo/shell/configurator/PresetEditor.vue |
| imports | 5 | demo/stories/compositions/auth-shell.vue |
| imports | 6 | demo/stories/compositions/chassis.vue |
| imports | 7 | demo/stories/compositions/empty-states.vue |
| imports | 8 | demo/stories/compositions/form-validation.vue |
| imports | 9 | demo/stories/compositions/gate-pattern.vue |
| imports | 10 | demo/stories/containers/collapsible.vue |
| imports | 11 | demo/stories/containers/dialog.vue |
| imports | 12 | demo/stories/containers/drawer.vue |
| imports | 13 | demo/stories/containers/dropdown-menu.vue |
| imports | 14 | demo/stories/containers/hover-card.vue |
| imports | 15 | demo/stories/containers/hover-popover.vue |
| imports | 16 | demo/stories/containers/popover.vue |
| imports | 17 | demo/stories/containers/sheet.vue |
| imports | 18 | demo/stories/containers/tooltip.vue |
| imports | 19 | demo/stories/display/buttons.tile.vue |
| imports | 20 | demo/stories/display/buttons.vue |
| imports | 21 | demo/stories/display/card.vue |
| imports | 22 | demo/stories/dock/cta-receive.vue |
| imports | 23 | demo/stories/feedback/completion-seal.vue |
| imports | 24 | demo/stories/feedback/confirm-dialog.vue |
| imports | 25 | demo/stories/feedback/notification.vue |
| imports | 26 | demo/stories/feedback/progress.vue |
| imports | 27 | demo/stories/feedback/toast.vue |
| imports | 28 | demo/stories/feedback/toaster.vue |
| imports | 29 | demo/stories/forms/labeled-field.vue |
| imports | 30 | demo/stories/foundations/motion.vue |
| imports | 31 | demo/stories/manifest.ts |
| imports | 32 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 33 | demo/stories/motion/animated-digit.vue |
| imports | 34 | demo/stories/motion/countup.vue |
| imports | 35 | demo/stories/motion/curve-gallery.vue |
| imports | 36 | demo/stories/motion/deck.vue |
| imports | 37 | demo/stories/motion/handmark.vue |
| imports | 38 | demo/stories/motion/reveal.vue |
| imports | 39 | demo/stories/motion/split-chars.vue |
| imports | 40 | demo/stories/motion/springs.vue |
| imports | 41 | demo/stories/motion/tempo.vue |
| imports | 42 | demo/stories/motion/typewriter.vue |
| imports | 43 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 44 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 45 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 46 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 47 | demo/stories/substrates/glass-material.vue |
| imports | 48 | tests-visual/desktop-fluid-type.spec.ts |
| imports | 49 | tests-visual/emission.spec.ts |
| imports | 50 | tests-visual/liquid-hover.spec.ts |
| imports | 51 | tests-visual/nested-backdrop-budget.spec.ts |
| imports | 52 | tests-visual/storybook-meta.spec.ts |
| imports | 53 | tests/components/ui/button/Button.test.ts |
| imports | 54 | tests/components/ui/reka-binding-idiom.test.ts |
| imports | 55 | tests/scripts/storybook-complete.detect.test.ts |
| tests | 1 | tests-visual/button.contract.spec.ts |
| tests | 2 | tests-visual/desktop-fluid-type.spec.ts |
| tests | 3 | tests-visual/emission.spec.ts |
| tests | 4 | tests-visual/liquid-hover.spec.ts |
| tests | 5 | tests-visual/nested-backdrop-budget.spec.ts |
| tests | 6 | tests-visual/storybook-meta.spec.ts |
| tests | 7 | tests/components/button.contract.test.ts |
| tests | 8 | tests/components/ui/button/Button.test.ts |
| tests | 9 | tests/components/ui/reka-binding-idiom.test.ts |
| tests | 10 | tests/scripts/storybook-complete.detect.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/display/button.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P065/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Button has one command contract, semantic tone/emphasis/size, shared press/focus/icon geometry, and native disabled/submission behavior.

**Required mutation bite:** Make a static decorative surface render through Button or remove native disabled semantics; behavioral evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P065`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: button-default, button-primary, button-destructive, button-disabled, button-loading, button-icon, button-keyboard, button-touch, button-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-button`. The cursor also acquires 61 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/button at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
