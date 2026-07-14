# BI.W-P108 — Command apotheosis — command palette/list

**Status:** PLANNED
**Topological stratum:** BI.S19
**Formation family:** component-containers
**Core centers:** C10_CONSTELLATION_ASSAY, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P108`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Command owns searchable command groups/items, active descendant, keyboard navigation, empty/loading state, shortcuts, execution, and optional Dialog composition without duplicating Search/Combobox contracts.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Command owns searchable command groups/items, active descendant, keyboard navigation, empty/loading state, shortcuts, execution, and optional Dialog composition without duplicating Search/Combobox contracts.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: inline, dialog, query, empty, groups, disabled, keyboard.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Retain CommandDialog only by turning its currently prose-only dialog branch into a direct packed-public-member scenario; the present route exercises inline query/active-descendant/execution but renders zero dialog roots.
- Open, query, Arrow-navigate, execute, Escape, and restore focus through CommandDialog while sharing one command collection/active identity with inline Command and satisfying Dialog title, modality, dismissal, surface, and PRM.

## File manifest (15)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/containers/command.vue | — | 7067af923a628500716d7fb0c54a4d4965f520d1 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | modify | src/components/command/Command.vue | — | — | BI.W-P008 |
| 5 | modify | src/components/command/CommandDialog.vue | — | — | BI.W-P008 |
| 6 | modify | src/components/command/CommandEmpty.vue | — | — | BI.W-P008 |
| 7 | modify | src/components/command/CommandGroup.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/command/CommandInput.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/command/CommandItem.vue | — | — | BI.W-P008 |
| 10 | modify | src/components/command/CommandList.vue | — | — | BI.W-P008 |
| 11 | modify | src/components/command/CommandSeparator.vue | — | — | BI.W-P008 |
| 12 | modify | src/components/command/CommandShortcut.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/command/index.ts | — | — | BI.W-P008 |
| 14 | create | tests-visual/command.contract.spec.ts | — | — | source base |
| 15 | create | tests/components/command.contract.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/containers/command.vue |
| imports | 2 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/command.contract.spec.ts |
| tests | 2 | tests/components/command.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/containers/command.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P108/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Command owns searchable command groups/items, active descendant, keyboard navigation, empty/loading state, shortcuts, execution, and optional Dialog composition without duplicating Search/Combobox contracts.

**Required mutation bite:** Execute a disabled command, visually move active item without semantic state, leave CommandDialog export/prose-only, render a generic Dialog instead, or let inline coverage donate dialog state; behavioral/topology evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P108`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: command-inline, command-dialog, command-query, command-empty, command-groups, command-disabled, command-keyboard
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P067 | Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract. |
| BI.W-P106 | Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion. |

Declared semantic locks: `component-command`. The cursor also acquires 15 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/command at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
