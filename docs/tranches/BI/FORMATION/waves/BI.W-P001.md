# BI.W-P001 — Git-reconstructable execution cursor and exactly-once wave transaction

**Status:** PLANNED
**Topological stratum:** BI.S01
**Formation family:** execution-substrate
**Core centers:** C10_CONSTELLATION_ASSAY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P001`

## Intent

Make restart, stale worktree, integrated-before-cursor, and no-op recovery deterministic before any implementation fan-out.

## Exact scope

- Create the cursor schema and transactional CLI with validate, start, integrate, terminalize, and recover commands; store cache, journal, and lock beneath git rev-parse --git-path tranche/BI rather than in the tracked worktree.
- Treat first-parent Git lineage plus committed receipts as authority and the fsync-plus-atomic-rename cursor as a rebuildable cache; recover --at HEAD must reproduce the same state after deleting every Git-private cache file.
- Import BOOTSTRAP.json by requiring its exact formation digest, integration parent, P000 trailer, receipt digest, integration-adjunct-excluding payload digest, subject outcomes, and unique containing child commit; reject missing, duplicate, altered, intervening, or guessed history.
- Create one wave-receipt schema and transaction-envelope library. Every P001 and later DONE or evidence-backed DEAD wave gets one unique committed receipt and four core commit trailers; P002 and later add the two projection-digest trailers. The receipt payload digest is the canonical stage-0 builder/product/evidence index excluding the receipt, RELEASE-ATTESTATION, and FINAL paths. intendedTrailers records every applicable trailer name but embeds only the acyclic BI-Wave, BI-Status, and BI-Formation-SHA256 values; it never embeds BI-Receipt-SHA256, BI-Attestation-SHA256, or BI-FINAL-SHA256 values. The orchestrator derives those raw-byte digests after the ordered R then A then F renders and adds them only to the commit message. Only the orchestrator mutates state, renders integration artifacts, and commits.
- Add negative fixtures for a RUNNING crash, an already-integrated commit, stale cache/base, missing or duplicate trailer, changed receipt, no-op, DEAD subject, and fresh-checkout reconstruction.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | docs/tranches/BI/EXECUTION-PROGRESS.md | — | 77c5bcaf4ac0a3446ba2da34a33c50dcedbfc7ad | source base |
| 2 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 3 | create | scripts/tranche/cursor-schema.json | — | — | source base |
| 4 | create | scripts/tranche/cursor.mjs | — | — | source base |
| 5 | create | scripts/tranche/transaction-envelope.mjs | — | — | source base |
| 6 | create | scripts/tranche/wave-receipt-schema.json | — | — | source base |
| 7 | create | tests/tranche/cursor.test.ts | — | — | source base |
| 8 | create | tests/tranche/transaction-envelope.test.ts | — | — | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/tranche/cursor.test.ts |
| tests | 2 | tests/tranche/transaction-envelope.test.ts |
| verification | 1 | scripts/tranche/cursor-schema.json |
| verification | 2 | scripts/tranche/cursor.mjs |
| verification | 3 | scripts/tranche/transaction-envelope.mjs |
| verification | 4 | scripts/tranche/wave-receipt-schema.json |
| build | 1 | package.json |
| docs | 1 | docs/tranches/BI/EXECUTION-PROGRESS.md |

## Orchestrator integration envelope (1)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P001/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `NONE`; integration-only wave references are none. The exact machine prerequisites are none.

## Durable acceptance

**Invariant:** A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected.

**Required mutation bite:** Delete every cursor cache file after integration and require recovery to reproduce byte-identical state; then remove, duplicate, or alter the P000 or P001 receipt/trailer tuple and require recovery to block rather than guess.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P001`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.cursor | device-free | Disk cursor and git make wave execution exactly-once across restart; only terminal waves unlock dependents. | Make a RUNNING wave runnable after restart.; Let a no-op remain without DONE/DEAD disposition. |
| integrity.dag | device-free | The active graph is acyclic, subject-complete, transitively reduced, resource-lock schedulable, and contains no ceremony-only tail. | Add a transitive edge.; Add a LAST wave whose only subject is rerunning already-owned evidence. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: Execution-state tooling has no painted behavior.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P000 | From the first execution commit onward there is one verifier and zero executable gate/family identities; every active fresh-checkout hook, installer, package, CI, tag, and release surface resolves that verifier rather than a deleted path; the one-shot P000 bootstrap plan can select only four device-free mechanism families, every planted defect turns RED and restores PASS, every encountered current-source RED has one honest future owner, no routed RED is counted as PASS, and the self-reference-free receipt resolves uniquely to the P000 commit before Git/receipt transaction recovery takes over. |

Declared semantic locks: `execution-cursor`, `package-manifest`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- BG execution-engine log: repeated DONE waves, stale worktrees, no-op limbo, and 40 agent runs with zero integrated commits.
