# BI.W-P067 — Input apotheosis — single-line text input

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-forms
**Core centers:** C1_LIQUID_GLASS, C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P067`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: default, focus, invalid, disabled, readonly, autocomplete, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (19)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/body/story-body.ts | — | 0f884b7904f66e80a0b6233ed41c5aa226119fd4 | source base |
| 2 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 3 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 4 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 5 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 6 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 7 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 8 | repair | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 9 | create | demo/stories/forms/input.vue | — | — | source base |
| 10 | repair | demo/stories/forms/inputs.tile.vue | — | b18ac13b8dd7009df86814ae257616dfd6f37216 | source base |
| 11 | repair | demo/stories/forms/inputs.vue | — | 710a5484ef5c868f89a7ae6d141ef4ae6ad356e2 | source base |
| 12 | repair | demo/stories/forms/label.vue | — | ff08672dda7fc3631d36c3cf15b67b715c96e671 | source base |
| 13 | repair | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 14 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 15 | modify | src/components/input/index.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/input/Input.vue | — | — | BI.W-P008 |
| 17 | repair | tests-visual/customizability.spec.ts | — | f62e8f9003958e861923369d65d2cd12d25af8ce | source base |
| 18 | create | tests-visual/input.contract.spec.ts | — | — | source base |
| 19 | create | tests/components/input.contract.test.ts | — | — | source base |

## Repair manifest (18)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/body/story-body.ts |
| imports | 2 | demo/stories/compositions/auth-shell.vue |
| imports | 3 | demo/stories/compositions/form-validation.vue |
| imports | 4 | demo/stories/compositions/gate-pattern.vue |
| imports | 5 | demo/stories/containers/dialog.vue |
| imports | 6 | demo/stories/containers/popover.vue |
| imports | 7 | demo/stories/containers/sheet.vue |
| imports | 8 | demo/stories/data/data-table.vue |
| imports | 9 | demo/stories/forms/inputs.tile.vue |
| imports | 10 | demo/stories/forms/inputs.vue |
| imports | 11 | demo/stories/forms/label.vue |
| imports | 12 | demo/stories/forms/labeled-field.vue |
| imports | 13 | tests-visual/customizability.spec.ts |
| tests | 1 | tests-visual/customizability.spec.ts |
| tests | 2 | tests-visual/input.contract.spec.ts |
| tests | 3 | tests/components/input.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/input.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P067/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract.

**Required mutation bite:** Style invalid state without aria-invalid/description linkage; form evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P067`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

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
Scenarios: input-default, input-focus, input-invalid, input-disabled, input-readonly, input-autocomplete, input-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P066 | Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics. |

Declared semantic locks: `component-input`. The cursor also acquires 19 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/input at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
