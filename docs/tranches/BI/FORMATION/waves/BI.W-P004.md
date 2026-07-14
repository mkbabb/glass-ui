# BI.W-P004 — Read-only constellation scanner and owner handshake protocol

**Status:** PLANNED
**Topological stratum:** BI.S02
**Formation family:** execution-substrate
**Core centers:** C10_CONSTELLATION_ASSAY, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P004`

## Intent

Replace prose consumer claims with syntax-level scans, protected foreign-state snapshots, and exact owner receipts.

## Exact scope

- Resolve the nine declared consumer repositories to canonical git top-levels and real paths, retain nine distinct owner handshakes, and group nested/copied Atlas lineage without counting one source object as independent demand more than once.
- Derive authoritative import truth only from tracked HEAD objects: enumerate HEAD tree blobs and parse static imports, dynamic imports, and require specifiers from commit bytes; dirty tracked or untracked working bytes are protected observations and receive zero adoption or retention credit.
- Before and after every probe, capture branch/detached state, HEAD commit/tree, index stage tuples, raw porcelain-v2-z digest, every tracked working-tree path's type/mode/content digest, and every nonignored untracked tree member's path/type/mode/content or symlink-target digest.
- Make each snapshot self-stabilizing by collecting metadata before and after its byte walk; retry a torn sample and return FOREIGN_STATE_UNSTABLE after the bounded retry limit. Any pre/post drift invalidates the probe and yields no consumer credit; never reset, clean, stash, or attribute concurrent owner drift to BI.
- Emit a nine-row current baseline and owner-handshake schema. P004 establishes pending slots and protocol only; final acceptance remains impossible until a later exact Glass tarball and immutable foreign-owner commit, build, test, and π receipt fill the slot.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/constellation-baseline.json | — | — | source base |
| 2 | repair | docs/tranches/BI/coordination/asks-and-consumes.md | — | 8e0f519cfd324ae3f644f322e68f9c814adcc6e1 | source base |
| 3 | verify | docs/tranches/BI/FORMATION/CONSTELLATION.md | — | — | FORMATION |
| 4 | modify | scripts/constellation.mjs | — | f5adb9a095bceaf911a6b6c29a7b7461bb81ecd0 | source base |
| 5 | create | scripts/constellation/handshake-schema.json | — | — | source base |
| 6 | create | scripts/constellation/scan-imports.mjs | — | — | source base |
| 7 | create | scripts/constellation/snapshot-worktree.mjs | — | — | source base |
| 8 | create | tests/constellation/handshake.test.ts | — | — | source base |
| 9 | create | tests/constellation/snapshot-worktree.test.ts | — | — | source base |

## Repair manifest (9)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/constellation/handshake.test.ts |
| tests | 2 | tests/constellation/snapshot-worktree.test.ts |
| verification | 1 | scripts/constellation.mjs |
| verification | 2 | scripts/constellation/handshake-schema.json |
| verification | 3 | scripts/constellation/scan-imports.mjs |
| verification | 4 | scripts/constellation/snapshot-worktree.mjs |
| docs | 1 | docs/tranches/BI/FORMATION/CONSTELLATION.md |
| docs | 2 | docs/tranches/BI/constellation-baseline.json |
| docs | 3 | docs/tranches/BI/coordination/asks-and-consumes.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P004/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling.

**Required mutation bite:** Change bytes inside an already-M tracked file without changing its porcelain code, then change a file beneath an already-unknown untracked tree while preserving the same porcelain path set; both mutations must change the content snapshot and keep the handshake nonterminal.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P004`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| constellation.handshake | device-free | Every in-scope sibling acceptance names the exact package tarball, owner commit, import scan, build/test evidence, and required π evidence; no retired import remains and no foreign write originates here. | Accept a consumer against a different tarball digest.; Count an uncommitted foreign patch as adoption. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: The scanner records consumer π requirements; it does not claim foreign pixels.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P001 | A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected. |

Declared semantic locks: `constellation-snapshot`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Q/AY/AZ/BG repeatedly treated external dirty or post-cut adoption as completed or user-domain work.
