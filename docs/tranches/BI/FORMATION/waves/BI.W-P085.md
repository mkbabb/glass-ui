# BI.W-P085 — BorderProgress retirement — retired progress-ring decoration

**Status:** PLANNED
**Topological stratum:** BI.S13
**Formation family:** component-data
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P085`

## Intent

Delete the remaining directory, CSS, docs, tests, and historical proof-command residue; do not re-export or replace it with an alias. The already-unexported family is dead residue; progress/ring behavior belongs to Progress or an owning product composition.

## Exact scope

- Delete the remaining directory, CSS, docs, tests, and historical proof-command residue; do not re-export or replace it with an alias.
- Prove the deletion against the actual source/export/consumer graph: The already-unexported family is dead residue; progress/ring behavior belongs to Progress or an owning product composition.
- Repoint every real local consumer to an already-owned canonical concept or ordinary composition; do not mint a replacement wrapper, alias, compatibility export, or migration shim.
- Delete the definition, styles, exports, declarations, docs, stories, tests, and historical gate scripts that exist solely for the retired concept, while preserving shared donors and consumer behavior.
- Use architecture/component/entry discovery and mutation bites for definition absence; the deletion paints no product pixels and therefore creates no eponymous unit test, visual spec, snapshot, or demo scenario.

## File manifest (19)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | modify | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 3 | modify | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 4 | modify | demo/shell/useShellScrollProgress.ts | — | 6a91376e18030fac65507ee8b15bfa23f37950b9 | source base |
| 5 | modify | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 8 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 9 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 10 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 11 | delete | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 12 | delete | src/components/border-progress/composables/useBorderSpectrum.ts | — | — | BI.W-P008 |
| 13 | delete | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 14 | delete | src/components/border-progress/index.ts | — | — | BI.W-P008 |
| 15 | delete | src/components/border-progress/README.md | — | — | BI.W-P008 |
| 16 | modify | tests-visual/ba-animate.spec.ts | — | a1b08aed681711c85f005e29b1d48042683d1459 | source base |
| 17 | delete | tests-visual/border-progress.spec.ts | — | 514e7984a1fa5d3b7d6138e82f112e4fde49b0d1 | source base |
| 18 | delete | tests/components/custom/border-progress/spectrum-walk.test.ts | — | a6a9e3dc7a3adc0cde80798fbd00ff0605d637df | source base |
| 19 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (18)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/shell/SidebarDock.vue |
| imports | 3 | demo/shell/dock-nav.css |
| imports | 4 | demo/shell/useShellScrollProgress.ts |
| imports | 5 | demo/stories/feedback/progress.vue |
| imports | 6 | tests-visual/ba-animate.spec.ts |
| imports | 7 | tests-visual/border-progress.spec.ts |
| imports | 8 | tests/components/custom/border-progress/spectrum-walk.test.ts |
| tests | 1 | tests-visual/ba-animate.spec.ts |
| tests | 2 | tests-visual/border-progress.spec.ts |
| tests | 3 | tests/components/custom/border-progress/spectrum-walk.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/feedback/progress.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P085/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** The already-unexported family is dead residue; progress/ring behavior belongs to Progress or an owning product composition.

**Required mutation bite:** Restore a border-progress definition or export and require retired-subject detection to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P085`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Device-free: Definition/export/consumer absence is device-free; replacement concepts own their already-enrolled rendered behavior, and this wave creates no deleted-concept scenario.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P057 | Public concepts, story modules, rendered components, and direct canonical routes form a generated semantic mapping with no import-only, phantom, dead-member, folded, relocated, alias, shim, or compatibility-route success. |

Declared semantic locks: `component-border-progress`, `entry-graph`. The cursor also acquires 19 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/border-progress at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=delete.
