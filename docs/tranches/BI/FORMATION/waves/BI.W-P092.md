# BI.W-P092 — Tabs apotheosis — tabbed panel selection

**Status:** IMPLEMENTED — native acceptance pending
**Topological stratum:** BI.S17
**Formation family:** component-navigation
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P092`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Tabs owns APG tablist/tab/tabpanel, orientation, activation, roving focus, indicator, responsive overflow, controlled value, and shared selection motion.

## Owner implementation amendment — one selected fill

- The pill indicator is one measured DOM node. `.segmented-indicator` composes the shared `glass-capsule` and `glass-lens` material directly; there is no inner plate or second fill.
- The former eyeglass rest-state path is deleted: no `useEyeglassLive`, `data-eyeglass`, proud/settled scale, flood pseudo-element, or selected-descendant SVG correction remains.
- The indicator rests at scale `1`. Selection retains only its shared transient travel deformation and settles on the same calibrated clock.
- Geometry comes from fractional `getBoundingClientRect()` measurements relative to the container, including border and scroll offsets; integer `offset*` geometry is not an authority.
- `activation="automatic" | "manual"` is the one activation axis. Automatic selection follows focus; manual arrows move the sole tabstop while Enter/Space commits selection, so the active fill never follows uncommitted focus.
- The existing semantics remain intact: orientation, role/state selection, disabled handling, and roving Arrow/Home/End focus are unchanged.
- `/navigation/tabs` now routes automatic/manual activation, true horizontal overflow, and right-to-left active-fill witnesses alongside the existing wide, vertical, responsive, disabled, click, and drag states. Native Browser acceptance remains pending; no Playwright substitute is permitted.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Tabs owns APG tablist/tab/tabpanel, orientation, activation, roving focus, indicator, responsive overflow, controlled value, and shared selection motion.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: horizontal, vertical, manual, automatic, overflow, disabled, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (21)

| #   | action | path                                                       | target | source-base blob                         | provenance  |
| --- | ------ | ---------------------------------------------------------- | ------ | ---------------------------------------- | ----------- |
| 1   | repair | demo/chassis/family/FamilyTabs.vue                         | —      | 2c4640256fc8edaa3de8d9f589cc49829372a324 | source base |
| 2   | repair | demo/shell/configurator/PresetEditor.vue                   | —      | —                                        | BI.W-P012   |
| 3   | repair | demo/stories/containers/spa-view.vue                       | —      | 5bbafefd0eeb58d0cbfed909aec32eaa981a648d | source base |
| 4   | repair | demo/stories/manifest.ts                                   | —      | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 5   | modify | demo/stories/navigation/tabs.vue                           | —      | d849c1b15f01f63b358ffed4cf82e61faed7bebb | source base |
| 6   | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | —      | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 7   | repair | demo/stories/substrates/aurora/config/FlowLayer.vue        | —      | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 8   | repair | demo/stories/substrates/aurora/config/TextureLayer.vue     | —      | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 9   | repair | DESIGN.md                                                  | —      | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 10  | delete | src/components/tabs/composables/useEyeglassLive.ts         | —      | —                                        | BI.W-P008   |
| 11  | modify | src/components/tabs/composables/useTabDragMorph.ts         | —      | —                                        | BI.W-P008   |
| 12  | modify | src/components/tabs/composables/useTabResponsive.ts        | —      | —                                        | BI.W-P008   |
| 13  | modify | src/components/tabs/composables/useTabRovingFocus.ts       | —      | —                                        | BI.W-P008   |
| 14  | modify | src/components/tabs/constants.ts                           | —      | —                                        | BI.W-P008   |
| 15  | modify | src/components/tabs/index.ts                               | —      | —                                        | BI.W-P008   |
| 16  | modify | src/components/tabs/README.md                              | —      | —                                        | BI.W-P008   |
| 17  | modify | src/components/tabs/SegmentedTabs.vue                      | —      | —                                        | BI.W-P008   |
| 18  | create | tests-visual/tabs.contract.spec.ts                         | —      | —                                        | source base |
| 19  | repair | tests/components/custom/tabs/segmented-tabs.test.ts        | —      | d11db3c0963f1fbc1f907b66268ab89d226fcd0f | source base |
| 20  | create | tests/components/tabs.contract.test.ts                     | —      | —                                        | source base |
| 21  | repair | tests/configurator-recursion.spec.ts                       | —      | 6e20544f70859c70722c8fd1e62a371e72d5d57f | source base |

## Repair manifest (16)

| surface | #   | exact path                                                 |
| ------- | --- | ---------------------------------------------------------- |
| imports | 1   | demo/chassis/family/FamilyTabs.vue                         |
| imports | 2   | demo/shell/configurator/PresetEditor.vue                   |
| imports | 3   | demo/stories/containers/spa-view.vue                       |
| imports | 4   | demo/stories/manifest.ts                                   |
| imports | 5   | demo/stories/navigation/tabs.vue                           |
| imports | 6   | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 7   | demo/stories/substrates/aurora/config/FlowLayer.vue        |
| imports | 8   | demo/stories/substrates/aurora/config/TextureLayer.vue     |
| imports | 9   | tests/components/custom/tabs/segmented-tabs.test.ts        |
| imports | 10  | tests/configurator-recursion.spec.ts                       |
| tests   | 1   | tests-visual/tabs.contract.spec.ts                         |
| tests   | 2   | tests/components/custom/tabs/segmented-tabs.test.ts        |
| tests   | 3   | tests/components/tabs.contract.test.ts                     |
| tests   | 4   | tests/configurator-recursion.spec.ts                       |
| docs    | 1   | DESIGN.md                                                  |
| docs    | 2   | demo/stories/navigation/tabs.vue                           |

## Orchestrator integration envelope (3)

| #   | action | path                                             | role                           | producer  | containing-commit policy                                                                          |
| --- | ------ | ------------------------------------------------ | ------------------------------ | --------- | ------------------------------------------------------------------------------------------------- |
| 1   | create | docs/tranches/BI/evidence/BI.W-P092/receipt.json | terminal-receipt               | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2   | modify | docs/tranches/BI/RELEASE-ATTESTATION.json        | continuous-release-attestation | BI.W-P002 | mechanically rendered projection                                                                  |
| 3   | modify | docs/tranches/BI/FINAL.md                        | continuous-final-projection    | BI.W-P002 | mechanically rendered projection                                                                  |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Tabs owns APG tablist/tab/tabpanel, orientation, activation, roving focus, indicator, responsive overflow, controlled value, and shared selection motion.

**Required mutation bite:** Use aria-pressed or hide inactive panels without correct semantics; selection evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P092`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family                  | evidence kind | oracle invariant                                                                                                                                                 | realistic RED mutations                                                                                             |
| --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| architecture.component-topology   | device-free   | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent.                            | Restore src/components/ui.; Export IconTooltip beside Tooltip.                                                      |
| architecture.present-tense-source | device-free   | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology.                             | Add a BI.W identifier to src.; Describe a retired implementation as current rationale.                              |
| behavior.selection                | browser       | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus.                       | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values.                                         |
| demo.scenario-contract            | browser       | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story.                    |
| design.contrast                   | browser       | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state.                                     | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary.                  |
| design.responsive-touch           | browser       | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs.                      | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.transition-continuity      | browser       | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing.                            | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition.     |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: tabs-horizontal, tabs-vertical, tabs-manual, tabs-automatic, tabs-overflow, tabs-disabled, tabs-keyboard, tabs-touch, tabs-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant                                                                                                                                                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BI.W-P017  | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant.                                                                                                                                                                                                          |
| BI.W-P028  | Exactly one spatial-transition runner owns measurement and transforms; every morph preserves identity/focus and survives interruption.                                                                                                                                                                                     |
| BI.W-P059  | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062  | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries.                                                          |

Declared semantic locks: `component-tabs`. The cursor also acquires 21 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/tabs at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
