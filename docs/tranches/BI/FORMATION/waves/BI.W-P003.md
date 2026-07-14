# BI.W-P003 — ROOT canon lineage and model-routing conformance

**Status:** PLANNED
**Topological stratum:** BI.S02
**Formation family:** execution-substrate
**Core centers:** C10_CONSTELLATION_ASSAY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P003`

## Intent

Fail closed unless immutable ROOT-object authority and the effective CURRENT-012 orchestration/fanout contract can both be reproduced without writing the ROOT repository or inventing provider identity.

## Exact scope

- Select precepts commit 8781ebb06c03547f57e33182ec1a970fd96d7069 and tree de9ce02f319bf106ea07a84bd394d9054c4ea4f4 as the immutable ROOT authority. Local acquisition reads the read-only Git object database at BI_ROOT_PRECEPTS_GIT_DIR or /Users/mkbabb/Programming/precepts; normative resolution always follows pinned commit:path git objects, never checkout bytes, HEAD, branch, origin movement, or docs/precepts.
- Bind the selected commit, full instructions tree, required tranche read-order blob OIDs, and a deterministic GIT_RAW_OBJECT_SNAPSHOT_V1. The schema stores hashAlgorithm sha1 and a strictly OID-sorted array of {oid,type,size,contentBase64} rows for exactly the selected commit object, its root-to-instructions tree path, and the recursively complete instructions subtree—no parent history and no extra object. Recompute each OID from type + decimal byte length + NUL + decoded raw content, require canonical base64 and exact size, parse binary tree entries without shell text normalization, traverse every authority path from the selected commit, and prove the included OID set equals the reachable closure. Local mode must reproduce identical canonical JSON from the external object database; fresh CI and release modes validate the committed snapshot without requiring the absolute checkout or network and fail on any commit, tree, object type, path, blob OID, missing object, duplicate OID, malformed object, or nonminimal extra object disagreement. The checkout at 458c2d1, its behind state, and its three untracked drafts remain preserved nonnormative observations.
- Implement CURRENT-012 precedence explicitly: the current core session alone owns orchestration, design, synthesis, adjudication, integration, cursor mutation, and commits; bounded non-root workflow fanout is labelled Luna or Terra and carries exact task, base, read, write, and evidence bounds.
- Record only platform-reported agent/model identity. Luna and Terra are workflow-lane labels, never provider-model assertions; a missing hidden provider ID is recorded as unattested and is not silently inferred, while an invented or relabelled provider identity is RED.
- Enforce the three-live-agent ceiling, CURRENT-002 supersession, and one immutable dispatch receipt per bounded lane before dispatch; emit canon/model conformance bound to the formation digest, source base, cursor wave, selected ROOT objects, and routing-policy digest.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/canon-conformance.json | — | — | source base |
| 2 | verify | docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md | — | — | FORMATION |
| 3 | create | scripts/tranche/canon-authority.json | — | — | source base |
| 4 | create | scripts/tranche/canon-conformance.mjs | — | — | source base |
| 5 | create | scripts/tranche/canon-object-snapshot.json | — | — | source base |
| 6 | create | scripts/tranche/canon-object-snapshot.schema.json | — | — | source base |
| 7 | create | scripts/tranche/model-routing.json | — | — | source base |
| 8 | create | tests/tranche/canon-conformance.test.ts | — | — | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/tranche/canon-conformance.test.ts |
| verification | 1 | scripts/tranche/canon-authority.json |
| verification | 2 | scripts/tranche/canon-conformance.mjs |
| verification | 3 | scripts/tranche/canon-object-snapshot.json |
| verification | 4 | scripts/tranche/canon-object-snapshot.schema.json |
| verification | 5 | scripts/tranche/model-routing.json |
| docs | 1 | docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md |
| docs | 2 | docs/tranches/BI/canon-conformance.json |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P003/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dispatch authority is a pure projection of CURRENT-012 and immutable ROOT commit 8781ebb06c03547f57e33182ec1a970fd96d7069: core retains orchestration, design, synthesis, adjudication, integration, and commits; every bounded fanout is honestly labelled Luna or Terra; checkout dirt and untracked drafts cannot alter canon; no provider identity is inferred from a lane label.

**Required mutation bite:** Keep the commit literal while substituting one required blob OID, promote an untracked checkout draft to normative authority, delegate synthesis to a child lane, or label Luna/Terra with an unreported provider model; each mutation must make conformance RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P003`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.cursor | device-free | Disk cursor and git make wave execution exactly-once across restart; only terminal waves unlock dependents. | Make a RUNNING wave runnable after restart.; Let a no-op remain without DONE/DEAD disposition. |
| integrity.dag | device-free | The active graph is acyclic, subject-complete, transitively reduced, resource-lock schedulable, and contains no ceremony-only tail. | Add a transitive edge.; Add a LAST wave whose only subject is rerunning already-owned evidence. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: Canon/model routing has no painted product claim.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P001 | A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected. |

Declared semantic locks: `canon-conformance`. The cursor also acquires 7 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- The ROOT checkout is behind with three untracked instruction drafts; CURRENT-012 supersedes the earlier requested-provider wording, and the collaboration surface exposes task lanes but no provider-model selector.
