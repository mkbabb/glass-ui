# BI.W-P072 — Badge apotheosis — compact categorical metadata

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** component-display
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P072`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Badge is noninteractive metadata with semantic tone/emphasis and noncolor distinction; command behavior belongs to Button/Chip.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Badge is noninteractive metadata with semantic tone/emphasis and noncolor distinction; command behavior belongs to Button/Chip.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: neutral, info, success, warning, destructive, long-text, forced-colors.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (15)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/body/story-body.ts | — | 0f884b7904f66e80a0b6233ed41c5aa226119fd4 | source base |
| 2 | repair | demo/chassis/body/StoryBodyRenderer.vue | — | 1b5b922f042e7e6c37302be8614c05145d148368 | source base |
| 3 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 4 | repair | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 5 | repair | demo/stories/data/infinite-scroll.vue | — | faea27c9c706cc99221d59aa6e94219b6eaee43b | source base |
| 6 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 7 | repair | demo/stories/data/table.vue | — | 58c29de2277622d630fc2074b40a7401a2c48688 | source base |
| 8 | repair | demo/stories/data/virtual-section.vue | — | 4fe0827b08bc8d2098782789a40a979b65131d8b | source base |
| 9 | modify | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 10 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 11 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 12 | modify | src/components/badge/Badge.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/badge/index.ts | — | — | BI.W-P008 |
| 14 | create | tests-visual/badge.contract.spec.ts | — | — | source base |
| 15 | create | tests/components/badge.contract.test.ts | — | — | source base |

## Repair manifest (14)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/body/StoryBodyRenderer.vue |
| imports | 2 | demo/chassis/body/story-body.ts |
| imports | 3 | demo/stories/compositions/chassis.vue |
| imports | 4 | demo/stories/containers/dropdown-menu.vue |
| imports | 5 | demo/stories/data/infinite-scroll.vue |
| imports | 6 | demo/stories/data/search.vue |
| imports | 7 | demo/stories/data/table.vue |
| imports | 8 | demo/stories/data/virtual-section.vue |
| imports | 9 | demo/stories/display/badge.vue |
| imports | 10 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/badge.contract.spec.ts |
| tests | 2 | tests/components/badge.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/display/badge.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P072/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Badge is noninteractive metadata with semantic tone/emphasis and noncolor distinction; command behavior belongs to Button/Chip.

**Required mutation bite:** Make Badge clickable without command semantics or focus; affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P072`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.feedback | browser | Alert, notification, toast, badge, status, pulse, skeleton, and progress communicate distinct urgency/liveness without color-only or perpetual-motion ambiguity. | Give a decorative Pulse assertive live-region semantics.; Make error and success badges differ only by hue. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: badge-neutral, badge-info, badge-success, badge-warning, badge-destructive, badge-long-text, badge-forced-colors
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-badge`. The cursor also acquires 15 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/badge at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
