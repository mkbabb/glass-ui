# BI.W-P117 — Metric consolidation — metric value plus label/context composition

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** component-data
**Core centers:** C1_LIQUID_GLASS, C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P117`

## Intent

Merge metric-badge, metric-cell, and metric-stack into src/components/metric with one /metric entry and explicit parts; delete all three old entries without aliases. One Metric family owns badge/cell/row/stack presentations, numeric typography, trend/status/context, and token contract; three parallel public families are folded.

## Exact scope

- Merge metric-badge, metric-cell, and metric-stack into src/components/metric with one /metric entry and explicit parts; delete all three old entries without aliases.
- Make the binding concept contract explicit: One Metric family owns badge/cell/row/stack presentations, numeric typography, trend/status/context, and token contract; three parallel public families are folded.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: badge, cell, row, stack, trend, status, long-label, narrow.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (27)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 2 | delete | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 3 | delete | demo/stories/data/metric-stack.vue | — | 373c38180f5cdc3071b23962b40f501614c84458 | source base |
| 4 | create | demo/stories/data/metric.vue | — | — | source base |
| 5 | delete | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 6 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 7 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 8 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 9 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 10 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 11 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 12 | rename | src/components/metric-badge/index.ts | src/components/metric/badge/index.ts | — | BI.W-P008 |
| 13 | rename | src/components/metric-badge/MetricBadge.vue | src/components/metric/badge/MetricBadge.vue | — | BI.W-P008 |
| 14 | rename | src/components/metric-badge/README.md | src/components/metric/badge/README.md | — | BI.W-P008 |
| 15 | rename | src/components/metric-cell/index.ts | src/components/metric/cell/index.ts | — | BI.W-P008 |
| 16 | rename | src/components/metric-cell/MetricCell.vue | src/components/metric/cell/MetricCell.vue | — | BI.W-P008 |
| 17 | rename | src/components/metric-cell/README.md | src/components/metric/cell/README.md | — | BI.W-P008 |
| 18 | rename | src/components/metric-stack/index.ts | src/components/metric/stack/index.ts | — | BI.W-P008 |
| 19 | rename | src/components/metric-stack/MetricRow.vue | src/components/metric/stack/MetricRow.vue | — | BI.W-P008 |
| 20 | rename | src/components/metric-stack/MetricStack.vue | src/components/metric/stack/MetricStack.vue | — | BI.W-P008 |
| 21 | rename | src/components/metric-stack/README.md | src/components/metric/stack/README.md | — | BI.W-P008 |
| 22 | delete | tests-visual/_metric-zero-capture.spec.ts | — | 392d9e98ffef0d3910bc57a25eaff9165d9158df | source base |
| 23 | create | tests-visual/metric.contract.spec.ts | — | — | source base |
| 24 | delete | tests/components/custom/metric-badge/zero-value.test.ts | — | b066161d3eba0cda63abc700f3dc4e44c26e87f9 | source base |
| 25 | delete | tests/components/custom/metric-stack/MetricStack.test.ts | — | 63d504f2f5c2f5dbe6a83189f8c85d2cdf25aec5 | source base |
| 26 | create | tests/components/metric.contract.test.ts | — | — | source base |
| 27 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (20)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/data/instrument-chassis.vue |
| imports | 2 | demo/stories/data/metric-cell.vue |
| imports | 3 | demo/stories/data/metric-stack.vue |
| imports | 4 | demo/stories/display/metric-badge.vue |
| imports | 5 | demo/stories/manifest.ts |
| imports | 6 | tests-visual/_metric-zero-capture.spec.ts |
| imports | 7 | tests/components/custom/metric-badge/zero-value.test.ts |
| imports | 8 | tests/components/custom/metric-stack/MetricStack.test.ts |
| tests | 1 | tests-visual/_metric-zero-capture.spec.ts |
| tests | 2 | tests-visual/metric.contract.spec.ts |
| tests | 3 | tests/components/custom/metric-badge/zero-value.test.ts |
| tests | 4 | tests/components/custom/metric-stack/MetricStack.test.ts |
| tests | 5 | tests/components/metric.contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/data/metric.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P117/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** One Metric family owns badge/cell/row/stack presentations, numeric typography, trend/status/context, and token contract; three parallel public families are folded.

**Required mutation bite:** Preserve any old metric subpath alias or duplicate token/writer across parts; clean-break/topology evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P117`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.data | browser | Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state. | Use array index as a row identity.; Announce indeterminate progress as a false percentage. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| design.typography | browser | Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component. | Set a label larger than its section heading.; Remove size-adjust from the loading fallback and induce layout shift. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: metric-badge, metric-cell, metric-row, metric-stack, metric-trend, metric-status, metric-long-label, metric-narrow
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-metric-badge`, `component-metric-cell`, `component-metric-stack`, `entry-graph`. The cursor also acquires 37 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/metric-badge + custom/metric-cell + custom/metric-stack at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=fold.
