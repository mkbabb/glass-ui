# BI.W-P089 — Toggle apotheosis — independent pressed command

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P089`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Toggle owns aria-pressed command state and shared Button press/material; it is not a Checkbox or Tab and remains private to aggregate entries if no direct export is needed.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Toggle owns aria-pressed command state and shared Button press/material; it is not a Checkbox or Tab and remains private to aggregate entries if no direct export is needed.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: off, on, disabled, icon, keyboard, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (7)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/forms/toggle.vue | — | 722406a90459974c446cd5c2ba961f6fa18ae67c | source base |
| 2 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 3 | modify | src/components/toggle/index.ts | — | — | BI.W-P008 |
| 4 | modify | src/components/toggle/Toggle.vue | — | — | BI.W-P008 |
| 5 | create | tests-visual/toggle.contract.spec.ts | — | — | source base |
| 6 | create | tests/components/toggle.contract.test.ts | — | — | source base |
| 7 | repair | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/forms/toggle.vue |
| imports | 2 | tests/components/ui/reka-binding-idiom.test.ts |
| tests | 1 | tests-visual/toggle.contract.spec.ts |
| tests | 2 | tests/components/toggle.contract.test.ts |
| tests | 3 | tests/components/ui/reka-binding-idiom.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/toggle.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P089/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Toggle owns aria-pressed command state and shared Button press/material; it is not a Checkbox or Tab and remains private to aggregate entries if no direct export is needed.

**Required mutation bite:** Give Toggle tab role or form checkbox semantics; selection evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P089`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: toggle-off, toggle-on, toggle-disabled, toggle-icon, toggle-keyboard, toggle-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-toggle`. The cursor also acquires 7 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/toggle at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
