# BI.W-P096 — Combobox apotheosis — editable listbox selection

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P096`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Combobox owns editable input, filtering, active descendant, freeform/selection policy, async/empty/error state, and shared overlay/focus semantics.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Combobox owns editable input, filtering, active descendant, freeform/selection policy, async/empty/error state, and shared overlay/focus semantics.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: closed, open, filter, empty, async, invalid, keyboard, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Delete ComboboxCancel, ComboboxSeparator, and ComboboxViewport from the forms public entry; recursive barrels, nine tracked consumer HEADs, source composition, and the live two-product specimen give all three zero causal witnesses.
- Keep clear/reset on the explicit root/input value policy, named grouping on ComboboxGroup, and popup bounds/large-list scrolling on ComboboxList; do not render speculative nodes merely to preserve upstream inventory.
- Exercise controlled clear/reset, filter, empty/async/error, named groups, large-result scrolling/active visibility, selection, Escape focus restoration, keyboard, and touch through the remaining exact compound members.

## File manifest (17)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/forms/combobox.vue | — | 857ff5e276a3da069b9ae7f1166f5c7d7062d057 | source base |
| 2 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 3 | modify | src/components/combobox/Combobox.vue | — | — | BI.W-P008 |
| 4 | modify | src/components/combobox/ComboboxAnchor.vue | — | — | BI.W-P008 |
| 5 | modify | src/components/combobox/ComboboxEmpty.vue | — | — | BI.W-P008 |
| 6 | modify | src/components/combobox/ComboboxGroup.vue | — | — | BI.W-P008 |
| 7 | modify | src/components/combobox/ComboboxInput.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/combobox/ComboboxItem.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/combobox/ComboboxItemIndicator.vue | — | — | BI.W-P008 |
| 10 | modify | src/components/combobox/ComboboxList.vue | — | — | BI.W-P008 |
| 11 | delete | src/components/combobox/ComboboxSeparator.vue | — | — | BI.W-P008 |
| 12 | delete | src/components/combobox/ComboboxViewport.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/combobox/index.ts | — | — | BI.W-P008 |
| 14 | create | tests-visual/combobox.contract.spec.ts | — | — | source base |
| 15 | create | tests/components/combobox.contract.test.ts | — | — | source base |
| 16 | repair | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |
| 17 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (9)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/forms/combobox.vue |
| imports | 2 | tests/components/ui/reka-binding-idiom.test.ts |
| imports | 3 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/combobox.contract.spec.ts |
| tests | 2 | tests/components/combobox.contract.test.ts |
| tests | 3 | tests/components/ui/reka-binding-idiom.test.ts |
| tests | 4 | tests/public-surface.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/combobox.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P096/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Combobox owns editable input, filtering, active descendant, freeform/selection policy, async/empty/error state, and shared overlay/focus semantics.

**Required mutation bite:** Move visual highlight without updating active-descendant/value, restore any of the three zero-witness exports, count CommandSeparator as ComboboxSeparator, or nest List/Viewport scroll owners; combobox/topology evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P096`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: combobox-closed, combobox-open, combobox-filter, combobox-empty, combobox-async, combobox-invalid, combobox-keyboard, combobox-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P067 | Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract. |

Declared semantic locks: `component-combobox`. The cursor also acquires 17 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/combobox at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
