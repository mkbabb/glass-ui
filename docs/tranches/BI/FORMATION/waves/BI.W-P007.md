# BI.W-P007 — MS3 — colocate sortable behavior with SortableList

**Status:** PLANNED
**Topological stratum:** BI.S03
**Formation family:** structure
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P007`

## Intent

Give SortableList one public semantic list concept and one private reorder engine instead of a root composables subsystem or pointer-only visual facsimile.

## Exact scope

- Move src/composables/sortable leaves under the flat SortableList family while preserving only genuinely reusable public types.
- Repoint component, demo, tests, and public entry imports atomically.
- Delete duplicate drag/identity/keyboard helpers and any root sortable barrel.
- Render semantic list/listitem structure by default and native button handles; do not repair a noninteractive span by adding role=button/tabindex, and never apply application role.
- Define one keyboard transaction: Space or Enter lifts/drops, Arrow/Home/End changes the proposed position, Escape cancels, the same stable item keeps focus, and one polite announcement names item, position, set size, drop, or cancellation.
- Verify pointer and touch use the same reorder transaction and identity model, every coarse handle meets the 44 px product target, disabled items cannot enter the transaction, and cross-list moves announce both source and destination.

## File manifest (24)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 4 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 5 | repair | docs/STRUCTURE.md | — | — | BI.W-P005 |
| 6 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 7 | rename | src/components/custom/sortable-list/context.ts | src/components/sortable-list/context.ts | 67f3f462e092cb5006cc7e1d6d9e5d1100f79d52 | source base |
| 8 | rename | src/components/custom/sortable-list/index.ts | src/components/sortable-list/index.ts | d0802146e408ee71a81f2a55ea2ce65a27381b17 | source base |
| 9 | rename | src/components/custom/sortable-list/README.md | src/components/sortable-list/README.md | e015aa41358c2dd4aa4a555a7a3a604d6f6b43e1 | source base |
| 10 | rename | src/components/custom/sortable-list/SortableHandle.vue | src/components/sortable-list/SortableHandle.vue | 58f6434ef7b8754ff14b5e0b80247cc33d867184 | source base |
| 11 | rename | src/components/custom/sortable-list/SortableItem.vue | src/components/sortable-list/SortableItem.vue | 91cbd8d745071b1b5789caf0aa8b072977218997 | source base |
| 12 | rename | src/components/custom/sortable-list/SortableList.vue | src/components/sortable-list/SortableList.vue | 0fd3a184f32947187a49d87d77ef20956f133d69 | source base |
| 13 | create | src/components/sortable-list/composables/index.ts | — | — | source base |
| 14 | rename | src/composables/sortable/dragController.ts | src/components/sortable-list/composables/dragController.ts | 4d16f21e791c7b96db4780bcc07429715f0ab520 | source base |
| 15 | rename | src/composables/sortable/dropResolver.ts | src/components/sortable-list/composables/dropResolver.ts | c1412714627dc3a3498bb8c7c90ccb535fe974b6 | source base |
| 16 | rename | src/composables/sortable/ghostRenderer.ts | src/components/sortable-list/composables/ghostRenderer.ts | 472e27afc15d4f1cf20a5888abcd689cef1e817d | source base |
| 17 | rename | src/composables/sortable/index.ts | src/components/sortable-list/composables/index.ts | e83e0bcd1b160eebaddca13704f897410944fb36 | source base |
| 18 | rename | src/composables/sortable/touchGate.ts | src/components/sortable-list/composables/touchGate.ts | b1072bdd78cd5926583590fd53065f91c7f0d3d5 | source base |
| 19 | rename | src/composables/sortable/transitionTiming.ts | src/components/sortable-list/composables/transitionTiming.ts | d01900fd79c26f51a3453693cdf81d00df1836ca | source base |
| 20 | rename | src/composables/sortable/types.ts | src/components/sortable-list/composables/types.ts | 75e541c673b809726c48fd954c54e679101048c7 | source base |
| 21 | rename | src/composables/sortable/useSortable.ts | src/components/sortable-list/composables/useSortable.ts | 6182399edbc2048e72697a9cb6a60aee1d7fd77a | source base |
| 22 | create | tests-visual/sortable-list.contract.spec.ts | — | — | source base |
| 23 | create | tests/components/sortable-list.contract.test.ts | — | — | source base |
| 24 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (9)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/data/sortable-list.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 4 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| tests | 1 | tests-visual/sortable-list.contract.spec.ts |
| tests | 2 | tests/components/sortable-list.contract.test.ts |
| build | 1 | scripts/lib/subpath-policy.mjs |
| build | 2 | vite.config.ts |
| docs | 1 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P007/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** SortableList owns one reorder engine and a semantic list transaction with stable identity, keyboard/pointer/touch parity, native handles, retained focus, complete announcements, disabled-state exclusion, and product-sized coarse targets; no root sortable subsystem or second writer survives.

**Required mutation bite:** Replace list/listitem and native handles with generic div/span role repairs, shrink a coarse handle below 44 px, or drop keyboard focus after reorder; semantic, target, focus, and mutation evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P007`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.import-boundaries | device-free | Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior. | Import a sibling family's internal file.; Create an SCC between motion and glass. |
| behavior.data | browser | Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state. | Use array index as a row identity.; Announce indeterminate progress as a false percentage. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: sortable-keyboard-lift-travel-drop, sortable-keyboard-cancel, sortable-pointer-reorder, sortable-touch-reorder, sortable-cross-list, sortable-disabled
Observables: semantic list/listitem tree, order and stable item identity, focus identity, native handle name and 44 px coarse geometry, polite transaction announcement, cancel rollback
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P005 | Structural scope is derived from syntax and ownership, so a new/moved file joins the manifest or makes validation red without changing a baseline number. |

Declared semantic locks: `component-sortable-list`, `structure-authority`. The cursor also acquires 37 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
