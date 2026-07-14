# BI.W-P002 — Continuous FINAL and release projection

**Status:** PLANNED
**Topological stratum:** BI.S02
**Formation family:** execution-substrate
**Core centers:** C10_CONSTELLATION_ASSAY, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P002`

## Intent

Turn FINAL/version/tag/migration/evidence parity into a continuously generated precondition rather than terminal ceremony.

## Exact scope

- Generate exact FINAL.md and RELEASE-ATTESTATION.json from recovered Git/receipt state, entry graph, verifier evidence, π receipts, and constellation receipts. The acyclic order is product/evidence payload to receipt to attestation to FINAL to commit: attestation excludes itself and FINAL from its stage-0 index digest, FINAL references the attestation digest, and the containing commit/tree is resolved externally rather than embedded in tracked bytes.
- Separate honest projection from release authorization: --write emits NONTERMINAL_PROJECTION with exact blockers, --check requires tracked bytes to equal recomputation, and --require-terminal rejects any nonterminal wave, older-source evidence, mismatched tarball digest, pending handshake, or missing release fact.
- Verify a tag cannot introduce source repair and points at the exact attested tree.
- Install the serialized orchestrator integration envelope: every P002 and later wave appends its unique receipt and refreshes FINAL plus RELEASE-ATTESTATION inside that wave's sole commit, without leasing those shared paths to parallel builder lanes.

## File manifest (7)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | CHANGELOG.md | — | 7710e2458193f2ed17a07806835801020444adc8 | source base |
| 2 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 3 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 4 | modify | scripts/release.sh | — | 5db6c889f9e2b878591646fb3a98fd3fb61ec1af | source base |
| 5 | create | scripts/tranche/release-projection.mjs | — | — | source base |
| 6 | create | scripts/tranche/release-schema.json | — | — | source base |
| 7 | create | tests/tranche/release-projection.test.ts | — | — | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/tranche/release-projection.test.ts |
| verification | 1 | scripts/tranche/release-projection.mjs |
| verification | 2 | scripts/tranche/release-schema.json |
| build | 1 | package.json |
| build | 2 | scripts/release.sh |
| docs | 1 | CHANGELOG.md |
| docs | 2 | MIGRATION.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P002/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | create | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | this wave | mechanically rendered projection |
| 3 | create | docs/tranches/BI/FINAL.md | continuous-final-projection | this wave | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `ACTIVATE`; integration-only wave references are none. The exact machine prerequisites are none.

## Durable acceptance

**Invariant:** Release metadata and evidence are a byte-current pure projection of the containing transaction; P002 may be DONE with an honest releaseEligible false projection, but --require-terminal and tag or publish can never pass or repair the tree until every release predicate is green.

**Required mutation bite:** Substitute a π receipt from the parent commit, drift a tracked projection byte, or ask --require-terminal to accept an honest nonterminal projection; each mutation must fail before tag creation.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P002`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |
| integrity.release | device-free | FINAL, version, changelog, migration, tarball, verifier evidence, π evidence, and tag all describe the exact same terminal source tree. | Change package version without projection regeneration.; Use a π artifact from the parent commit. |

## π obligation

Device-free: This wave verifies π receipt freshness but makes no visual claim itself.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P001 | A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected. |

Declared semantic locks: `package-manifest`, `release-projection`. The cursor also acquires 7 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when the continuous projection is installed, byte-current, honestly NONTERMINAL while blockers remain, and its activation receipt plus four core and two projection trailers verify. DEAD only if the product owner permanently withdraws the entire perfected-BI formation with evidence; that committed DEAD receipt forbids every P003-P133 integration and permanently denies tag, publish, and release eligibility on this execution lineage.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- BA v4.0.0 tag commit repaired five release-only gates; BG cut remained PAINT-PENDING; exact FINAL was often absent.
