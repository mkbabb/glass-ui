# BI.W-P125 — D3 value.js pinned-consumer protection and reproducible co-land fixture

**Status:** PLANNED
**Topological stratum:** BI.S13
**Formation family:** constellation-contract
**Core centers:** C10_CONSTELLATION_ASSAY, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P125`

## Intent

Turn the held value.js worktree at 2e559f7a into a protected, reproducible read-only consumer assay without treating an uncommitted sibling lane as adoption.

## Exact scope

- Record KEEP-PROTECTED as D3's terminal local disposition: this process neither prunes nor edits the held value.js worktree; only its owner may reclaim it after an exact-tarball receipt.
- Build a disposable fixture from the exact tracked value.js commit 2e559f7a, install the current packed glass-ui artifact, and exercise its root plus all tracked glass-ui subpath imports without source aliases.
- Bind the value.js U-F77 co-land window, U-F34 three-symbol rename, keyframes/value peer pair, and migration rows into the generated owner packet.
- Keep dirty working-tree content out of evidence and require branch/HEAD/porcelain/tree digests before and after every read-only run.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | docs/tranches/BI/coordination/asks-and-consumes.md | — | 8e0f519cfd324ae3f644f322e68f9c814adcc6e1 | source base |
| 2 | create | docs/tranches/BI/coordination/value-owner-packet.json | — | — | source base |
| 3 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 4 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 5 | repair | scripts/constellation.mjs | — | f5adb9a095bceaf911a6b6c29a7b7461bb81ecd0 | source base |
| 6 | create | scripts/constellation/fixtures/value-2e559f7a.json | — | — | source base |
| 7 | create | scripts/constellation/value-consumer-fixture.mjs | — | — | source base |
| 8 | create | tests/constellation/value-consumer.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/constellation/value-consumer.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/constellation.mjs |
| docs | 1 | MIGRATION.md |
| docs | 2 | docs/tranches/BI/coordination/asks-and-consumes.md |
| docs | 3 | docs/tranches/BI/coordination/value-owner-packet.json |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P125/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** The held value.js lane is never mutated or counted as landed; a clean disposable copy of its exact commit resolves the exact glass tarball and produces an owner-consumable packet.

**Required mutation bite:** Substitute dirty worktree bytes for commit 2e559f7a or install a different tarball digest; the fixture and handshake must reject both.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P125`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| constellation.handshake | device-free | Every in-scope sibling acceptance names the exact package tarball, owner commit, import scan, build/test evidence, and required π evidence; no retired import remains and no foreign write originates here. | Accept a consumer against a different tarball digest.; Count an uncommitted foreign patch as adoption. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: This wave verifies a consumer build and preserves foreign state; value.js owns any painted acceptance in its repository.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P004 | Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling. |
| BI.W-P023 | Upstream engine primitives have one direct upstream authority; Glass publishes only owned motion bindings, semantic presets, and the /easing component, with no root-barrel mirror, reverse token-callable table, foreign-demo parity contract, stale displayed parameter, or consumer break. |

Declared semantic locks: `constellation-snapshot`, `package-consumer-fixture`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- REPO-CLEANUP-PLAN D3 held value.js commit 2e559f7a outside the prune set; prior tranches mistook dirty or booked foreign work for adoption.
