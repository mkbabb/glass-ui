# BI.W-P005 — MS1 — generated current-HEAD structure authority

**Status:** PLANNED
**Topological stratum:** BI.S02
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P005`

## Intent

Replace inherited counts and prose rosters with one generated path/entry/owner manifest used by all structural waves.

## Exact scope

- Generate component families, roots, entry projections, CSS ownership, direct importers, tests, demo routes, and verification consumers from source syntax.
- Record git blob IDs for every structural subject and fail on silent drift.
- Expose semantic queries consumed by MS2–MS9; do not encode success as a fixed count.
- Add negative fixtures for an unowned file, a duplicate concept home, a hidden path reader, and an orphan entry.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/STRUCTURE.md | — | — | source base |
| 2 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 3 | modify | scripts/regen-structure.mjs | — | 1c1f7abc56fe63a6f583c89d248e2eb777aeb409 | source base |
| 4 | create | scripts/structure/manifest.mjs | — | — | source base |
| 5 | create | scripts/structure/owners.json | — | — | source base |
| 6 | create | tests/structure/manifest.test.ts | — | — | source base |
| 7 | repair | tsconfig.build.json | — | d6adea2adeceab036688260344f750209c4ffd84 | source base |
| 8 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/structure/manifest.test.ts |
| build | 1 | scripts/lib/subpath-policy.mjs |
| build | 2 | tsconfig.build.json |
| build | 3 | vite.config.ts |
| docs | 1 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P005/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Structural scope is derived from syntax and ownership, so a new/moved file joins the manifest or makes validation red without changing a baseline number.

**Required mutation bite:** Add an unowned component directory and require generation to fail with its exact path.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P005`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: Inventory authority is structural and device-free.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P001 | A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected. |

Declared semantic locks: `structure-authority`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Prior MS1 specs carried stale 79/85/82 and hard-coded line/count assumptions across later HEADs.
