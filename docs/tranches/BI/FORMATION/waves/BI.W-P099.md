# BI.W-P099 — Search apotheosis — query input with result/navigation semantics

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P099`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Search owns query, clear, submit, async/loading/empty/error, optional suggestions, keyboard navigation, and result announcement without duplicating Combobox when selection is not its concept.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Search owns query, clear, submit, async/loading/empty/error, optional suggestions, keyboard navigation, and result announcement without duplicating Combobox when selection is not its concept.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: empty, query, loading, results, no-results, error, keyboard, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (25)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 2 | repair | demo/stories/dock/controls.vue | — | 095063fe157f5fdfa8408e58f5e36556479d56b8 | source base |
| 3 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 4 | repair | demo/stories/dock/overview.tile.vue | — | d1b9b592db308638a76a613635e566756936a930 | source base |
| 5 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 6 | repair | demo/stories/dock/sections.vue | — | 4834ba79ba910ee7a9938e210fdd94fa54e97e7d | source base |
| 7 | repair | demo/stories/forms/inputs.vue | — | 710a5484ef5c868f89a7ae6d141ef4ae6ad356e2 | source base |
| 8 | create | demo/stories/forms/search.vue | — | — | source base |
| 9 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 10 | repair | demo/stories/navigation/header-ribbon.vue | — | 73618bbe3e1543d29a247fa35287fd908296e5ad | source base |
| 11 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 12 | modify | src/components/search/composables/fuzzySearchIndex.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/search/composables/index.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/search/composables/types.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/search/composables/useFuzzySearch.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/search/FuzzySearch.vue | — | — | BI.W-P008 |
| 17 | modify | src/components/search/index.ts | — | — | BI.W-P008 |
| 18 | modify | src/components/search/SearchBar.vue | — | — | BI.W-P008 |
| 19 | modify | src/components/search/searchVariants.ts | — | — | BI.W-P008 |
| 20 | create | tests-visual/search.contract.spec.ts | — | — | source base |
| 21 | repair | tests/components/custom/search/fuzzySearchIndex.test.ts | — | cd08efe8cb9e431722558dc8a32c2fbf751594f9 | source base |
| 22 | repair | tests/components/custom/search/search-contracts.test.ts | — | be4e63a197aa3c42e6bbaced0dd1cb6beeb3e0d3 | source base |
| 23 | repair | tests/components/custom/search/useFuzzySearch.test.ts | — | 0f2858f939bc05f7ee30d47f7921201f67421c43 | source base |
| 24 | create | tests/components/search.contract.test.ts | — | — | source base |
| 25 | repair | tests/composables/motion/text-highlight-home.test.ts | — | 42cd25b5513a90bfedfb88b740f9d8edcc80bac9 | source base |

## Repair manifest (21)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/data/search.vue |
| imports | 2 | demo/stories/dock/controls.vue |
| imports | 3 | demo/stories/dock/dock-search.vue |
| imports | 4 | demo/stories/dock/overview.tile.vue |
| imports | 5 | demo/stories/dock/overview.vue |
| imports | 6 | demo/stories/dock/sections.vue |
| imports | 7 | demo/stories/forms/inputs.vue |
| imports | 8 | demo/stories/manifest.ts |
| imports | 9 | demo/stories/navigation/header-ribbon.vue |
| imports | 10 | tests/components/custom/search/fuzzySearchIndex.test.ts |
| imports | 11 | tests/components/custom/search/search-contracts.test.ts |
| imports | 12 | tests/components/custom/search/useFuzzySearch.test.ts |
| imports | 13 | tests/composables/motion/text-highlight-home.test.ts |
| tests | 1 | tests-visual/search.contract.spec.ts |
| tests | 2 | tests/components/custom/search/fuzzySearchIndex.test.ts |
| tests | 3 | tests/components/custom/search/search-contracts.test.ts |
| tests | 4 | tests/components/custom/search/useFuzzySearch.test.ts |
| tests | 5 | tests/components/search.contract.test.ts |
| tests | 6 | tests/composables/motion/text-highlight-home.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/search.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P099/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Search owns query, clear, submit, async/loading/empty/error, optional suggestions, keyboard navigation, and result announcement without duplicating Combobox when selection is not its concept.

**Required mutation bite:** Announce every keystroke assertively or lose query focus when results update; behavioral evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P099`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

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
Scenarios: search-empty, search-query, search-loading, search-results, search-no-results, search-error, search-keyboard, search-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P065 | Button has one command contract, semantic tone/emphasis/size, shared press/focus/icon geometry, and native disabled/submission behavior. |
| BI.W-P067 | Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract. |

Declared semantic locks: `component-search`. The cursor also acquires 25 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/search at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
