# BI.W-P126 — Semantic retirement facts instead of the 20-row retired-claim snapshot

**Status:** PLANNED
**Topological stratum:** BI.S09
**Formation family:** migration-contract
**Core centers:** C1_LIQUID_GLASS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P126`

## Intent

Replace proof:no-retired-survivor's prose-mirroring RETIRED_CLAIMS array and .retired-classes diary with facts derived from entry, symbol, token, selector, and migration deltas.

## Exact scope

- Parse every migration removal into a typed deleted symbol/subpath/selector/token fact generated from the source-base-to-current semantic diff; prose cannot enroll or exempt a subject.
- Resolve the current 20 claimed retirements through the owning semantic waves and emit one terminal build/fold/retain correction per claim in the formation ledger.
- Delete the hand-maintained .retired-classes.txt registry and the 20-row proof program through P014; the replacement discovers claims and definitions rather than carrying a roster.
- Distinguish a capability path or accessibility mode from a retired API compatibility path and reject aliases, dual writers, and doc-only absence claims.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | delete | .retired-classes.txt | — | 2d7b7da092af7140d7e3a67c564e0f0050ddc9f2 | source base |
| 2 | create | docs/tranches/BI/retirement-facts.json | — | — | source base |
| 3 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 4 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 5 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 6 | create | scripts/migration/retirements.mjs | — | — | source base |
| 7 | create | scripts/migration/semantic-diff.mjs | — | — | source base |
| 8 | create | tests/migration/retirements.test.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/migration/retirements.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | MIGRATION.md |
| docs | 2 | docs/tranches/BI/retirement-facts.json |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P126/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every removal claim is generated from a semantic before/after fact, every retired definition is absent, and adding a live artifact to prose cannot manufacture retirement evidence.

**Required mutation bite:** Add a MIGRATION sentence claiming /dock is retired while its export remains; semantic retirement must fail without adding /dock to a hand roster.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P126`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Device-free: Retirement is a semantic source/package assertion; painted replacement behavior stays with each owning wave.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P014 | The sole verifier discovers the settled semantic graph rather than pre-move paths, every external predicate is executable through its owning wave, every mutation remains discriminating, and no historical command, family command, table roster, or fixed subject count returns. |

Declared semantic locks: `entry-graph`, `migration-facts`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- proof:no-retired-survivor grew from 3 to 20 manually mirrored rows and became the exact snapshot-gate failure class named by the user.
