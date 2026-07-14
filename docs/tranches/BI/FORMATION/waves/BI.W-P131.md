# BI.W-P131 — ROOT precepts authority boundary and inert local gitlink

**Status:** PLANNED
**Topological stratum:** BI.S03
**Formation family:** governance
**Core centers:** C10_CONSTELLATION_ASSAY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P131`

## Intent

Make the external ROOT checkout the only normative precepts source while leaving docs/precepts physically read-only and incapable of silently governing from a stale gitlink.

## Exact scope

- Consume P003's immutable ROOT authority at commit 8781ebb06c03547f57e33182ec1a970fd96d7069, tree de9ce02f319bf106ea07a84bd394d9054c4ea4f4, and its exact required tracked-instruction blob map; preserve DESIGN-ITERATION.md, PRECEPTS-GRAND-AUDIT.md, and TRANCHE-FORMULATION.md as checkout-local nonnormative drafts because none belongs to the selected tree.
- Classify docs/precepts as a non-authoritative historical gitlink: never edit it, never use it to satisfy currentness, and surface any accidental import/reference as a conformance failure.
- Emit the 35 proposed ROOT amendments as an outbound patch specification only; this repository never writes, checks out, or commits the ROOT tree.
- Require explicit ROOT adoption receipts before a future tranche may claim those amendments as canon, while perfected BI's stricter local formation contract remains binding now.

## File manifest (7)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | verify | .gitmodules | — | a771f8f8cbc83c97ef579958841b0e1b45848845 | source base |
| 2 | repair | CONTRIBUTING.md | — | 1994046ce7f0d8f361333bc644885214da00a8eb | source base |
| 3 | verify | docs/precepts | — | 44961f0fcefd0cd171912c425f17be50287ed557 | source base |
| 4 | verify | docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md | — | — | FORMATION |
| 5 | create | docs/tranches/BI/root-authority.json | — | — | source base |
| 6 | repair | scripts/tranche/canon-conformance.mjs | — | — | BI.W-P003 |
| 7 | create | tests/tranche/root-authority.test.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/tranche/root-authority.test.ts |
| build | 1 | scripts/tranche/canon-conformance.mjs |
| docs | 1 | CONTRIBUTING.md |
| docs | 2 | docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md |
| docs | 3 | docs/tranches/BI/root-authority.json |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P131/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Only the declared external ROOT commit can provide normative precepts; the local gitlink and unadopted amendment proposal can neither satisfy nor mutate canon.

**Required mutation bite:** Point conformance at docs/precepts or change one ROOT instruction hash without changing the pinned commit; lineage must fail closed.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P131`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.cursor | device-free | Disk cursor and git make wave execution exactly-once across restart; only terminal waves unlock dependents. | Make a RUNNING wave runnable after restart.; Let a no-op remain without DONE/DEAD disposition. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: Canon authority is a repository-lineage property.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P003 | Dispatch authority is a pure projection of CURRENT-012 and immutable ROOT commit 8781ebb06c03547f57e33182ec1a970fd96d7069: core retains orchestration, design, synthesis, adjudication, integration, and commits; every bounded fanout is honestly labelled Luna or Terra; checkout dirt and untracked drafts cannot alter canon; no provider identity is inferred from a lane label. |

Declared semantic locks: `canon-conformance`. The cursor also acquires 4 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- The ROOT checkout is main behind origin/main with untracked live instruction drafts, while docs/precepts is a separate gitlink at 44961f0; neither ambiguity may be hidden.
