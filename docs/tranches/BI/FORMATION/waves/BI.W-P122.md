# BI.W-P122 — InstrumentChassis apotheosis — physical instrument housing with phase bus

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-data
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P122`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. InstrumentChassis owns housing, regions/dividers, phase semantics, reserved geometry, and material role; it does not hardcode domain phases, duplicate Card, or carry compatibility variants.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: InstrumentChassis owns housing, regions/dividers, phase semantics, reserved geometry, and material role; it does not hardcode domain phases, duplicate Card, or carry compatibility variants.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: ready, active, complete, structure, wide, narrow, loading.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (12)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 2 | repair | demo/stories/foundations/chart-chassis-palette.vue | — | efc049f29ea84e68a9e615ca4b68c0633ac4d94c | source base |
| 3 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | src/components/instrument-chassis/ChassisDivider.vue | — | — | BI.W-P008 |
| 6 | modify | src/components/instrument-chassis/index.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/instrument-chassis/InstrumentChassis.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/instrument-chassis/README.md | — | — | BI.W-P008 |
| 9 | create | tests-visual/instrument-chassis.contract.spec.ts | — | — | source base |
| 10 | repair | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts | — | d47daaf66a594f8133cbd6f56be59f7457c07617 | source base |
| 11 | repair | tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts | — | fc0652a635d4106c73eebd8bccfb5424c7500fff | source base |
| 12 | create | tests/components/instrument-chassis.contract.test.ts | — | — | source base |

## Repair manifest (11)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/data/instrument-chassis.vue |
| imports | 2 | demo/stories/foundations/chart-chassis-palette.vue |
| imports | 3 | demo/stories/manifest.ts |
| imports | 4 | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts |
| imports | 5 | tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts |
| tests | 1 | tests-visual/instrument-chassis.contract.spec.ts |
| tests | 2 | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts |
| tests | 3 | tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts |
| tests | 4 | tests/components/instrument-chassis.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/data/instrument-chassis.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P122/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** InstrumentChassis owns housing, regions/dividers, phase semantics, reserved geometry, and material role; it does not hardcode domain phases, duplicate Card, or carry compatibility variants.

**Required mutation bite:** Animate reserved block size or add domain-only phase names to the public union; stability/data evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P122`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.data | browser | Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state. | Use array index as a row identity.; Announce indeterminate progress as a false percentage. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: instrument-chassis-ready, instrument-chassis-active, instrument-chassis-complete, instrument-chassis-structure, instrument-chassis-wide, instrument-chassis-narrow, instrument-chassis-loading
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P075 | Progress exposes truthful value/min/max/indeterminate/segmented semantics, readable state, stable geometry, and no invented completion claim. |
| BI.W-P117 | One Metric family owns badge/cell/row/stack presentations, numeric typography, trend/status/context, and token contract; three parallel public families are folded. |

Declared semantic locks: `component-instrument-chassis`. The cursor also acquires 12 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/instrument-chassis at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
