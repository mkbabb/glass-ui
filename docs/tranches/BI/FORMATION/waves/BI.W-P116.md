# BI.W-P116 — DataTable apotheosis — interactive tabular data model

**Status:** IMPLEMENTED — NATIVE ACCEPTANCE PENDING
**Topological stratum:** BI.S16
**Formation family:** component-data
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P116`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. DataTable composes Table with stable row identity, semantic sortable-header commands, explicit controlled row selection across table/card projections, filter/pagination/virtualization, keyboard focus, loading/empty/error, and no monolithic ownership.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: DataTable composes Table with stable row identity, semantic sortable-header commands, explicit controlled row selection across table/card projections, filter/pagination/virtualization, keyboard focus, loading/empty/error, and no monolithic ownership.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: sort, select, wide-row, narrow-card, filter, paginate, virtual, loading, empty, error, keyboard.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Render every sortable header as a named native button inside th, project truthful aria-sort on th, and keep focus visible/stable while the same sort owner handles pointer and keyboard activation.
- Make row selection an explicit controlled mode. Selectable table rows and responsive cards share stable identity, keyboard/pointer/touch activation, selected/current state, focus retention, and nested-action isolation; nonselectable rows have no click listener or pointer cursor.
- Make the direct story visibly exercise selection plus reset in both wide-table and narrow-card projections; emitting select into an unbound story earns no causal witness.
- Remove DataTablePagination from root and /data-table publication while keeping or reshaping it as an implementation-private DataTable part; internal pagination necessity is not a second public product contract.
- Exercise page count/bounds, selection continuity, sort/filter interaction, keyboard naming, and narrow-card projection through DataTable's one public model.

## File manifest (14)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | modify | src/components/data-table/composables/useDataTableResponsive.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/data-table/composables/useDataTableRowIdentity.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/data-table/DataTable.vue | — | — | BI.W-P008 |
| 7 | modify | src/components/data-table/DataTablePagination.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/data-table/index.ts | — | — | BI.W-P008 |
| 9 | modify | src/components/data-table/types.ts | — | — | BI.W-P008 |
| 10 | create | tests-visual/data-table.contract.spec.ts | — | — | source base |
| 11 | create | tests/components/data-table.contract.test.ts | — | — | source base |
| 12 | repair | tests/components/ui/data-table/DataTable.test.ts | — | 79e5a388bf05c5b83b5f7043137b32ba5ff13bc7 | source base |
| 13 | repair | tests/components/ui/data-table/useDataTableResponsive.test.ts | — | b0c80104624f32dd0803c5df0b41b1a3341e9311 | source base |
| 14 | repair | tests/components/ui/data-table/useDataTableRowIdentity.test.ts | — | 18c73842d0845d7cdd788e8b17a816c38dc8f021 | source base |

## Repair manifest (12)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/data/data-table.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | tests/components/ui/data-table/DataTable.test.ts |
| imports | 4 | tests/components/ui/data-table/useDataTableResponsive.test.ts |
| imports | 5 | tests/components/ui/data-table/useDataTableRowIdentity.test.ts |
| tests | 1 | tests-visual/data-table.contract.spec.ts |
| tests | 2 | tests/components/data-table.contract.test.ts |
| tests | 3 | tests/components/ui/data-table/DataTable.test.ts |
| tests | 4 | tests/components/ui/data-table/useDataTableResponsive.test.ts |
| tests | 5 | tests/components/ui/data-table/useDataTableRowIdentity.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/data/data-table.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P116/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** DataTable composes Table with stable row identity, semantic sortable-header commands, explicit controlled row selection across table/card projections, filter/pagination/virtualization, keyboard focus, loading/empty/error, and no monolithic ownership.

**Required mutation bite:** Use array index identity, make sorting pointer-only or omit aria-sort, emit selection from click-only hosts, lose selection through sort/projection, leave select unobserved, re-export DataTablePagination, or count its internal use as demand; data/selection/focus/topology evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P116`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.data | browser | Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state. | Use array index as a row identity.; Announce indeterminate progress as a false percentage. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: data-table-sort, data-table-select, data-table-wide-row, data-table-narrow-card, data-table-filter, data-table-paginate, data-table-virtual, data-table-loading, data-table-empty, data-table-error, data-table-keyboard
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P086 | Checkbox preserves checked/indeterminate/form/name/value/disabled/required semantics, visible focus, and noncolor state through Reka without copied shadcn styling. |
| BI.W-P115 | Table owns native table structure, caption/header/body/row/cell semantics, responsive overflow, alignment, density, and no interactive data behaviors. |

Declared semantic locks: `component-data-table`. The cursor also acquires 14 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/data-table at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
