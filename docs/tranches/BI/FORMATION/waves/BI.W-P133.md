# BI.W-P133 — Atlas Tranche P inbound allocation and stable-closure transaction

**Status:** PLANNED
**Topological stratum:** BI.S09
**Formation family:** constellation-contract
**Core centers:** C10_CONSTELLATION_ASSAY, C1_LIQUID_GLASS, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P133`

## Intent

Turn SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001 into an exact, producer-owned, formulation-only contract without letting the consumer packet widen Glass authority or claim global BI work.

## Exact scope

- Recompute the 87-file packet digest and both raw/semantic scope hashes, snapshot Atlas and Glass bases, and bind the ACK to those bytes rather than the sender's prose hash.
- Give every one of the 512 inherited BG/BH/BI context actions exactly one ACCEPT, FOLD, REJECT, or BANK disposition with a canonical BI wave, executable acceptance predicate, authority source, and explicit no-credit rule.
- At execution G.W0, trace the 62 import clauses in 36 Atlas files through package export/source/style/asset/type/build/runtime/test/public-contract edges to a fixed point and partition every source action exactly once as ATLAS_DIRECT, REQUIRED_CLOSURE, or OUT_OF_SCOPE_BANKED before any P-derived write.
- Map G.W0–G.W14 and GG001–GG060 to canonical BI waves and typed external-scenario predicates consumed by the single verifier; preserve every negative control, exact cursor-driven argv, expected positive/RED behavior, source binding, and evidence contract while creating no compatibility command, named gate case, or extra executable identity.
- Classify P's exact InkMark import rows as coordinated migration to canonical HandMark under P051: preserve the HandMark SFC/behavior, delete only the same-source alias, and require exact Atlas replacements in src/charts/glyph/HandMark.vue and src/editorial/AnimatedRule.vue without a shim or local-binding-only rename.
- Preserve Glass ownership of source, tag, publication, registry, and Atlas-surface FINAL; preserve P's candidate/registry ACK roles and the exact handshake chain. A received or producer ACK never substitutes for FORMULATION-SEAL, ENV-DSYNC, CORPUS-100, P-EXECUTION-AUTHORIZATION, or P.W0.
- Keep DesignSync formulation review distinct from the testedSourceSha/predicate/applicable-matrix refresh and keep the ACK FORMULATION_ONLY until every external prerequisite is independently green.

## File manifest (13)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | docs/tranches/BI/coordination/asks-and-consumes.md | — | 8e0f519cfd324ae3f644f322e68f9c814adcc6e1 | source base |
| 2 | create | docs/tranches/BI/exec/atlas-touched/ATLAS-PRODUCER-CLOSURE.v1.json | — | — | source base |
| 3 | create | docs/tranches/BI/exec/PREDICATES.v1.json | — | — | source base |
| 4 | verify | docs/tranches/BI/FORMATION/coordination/SCI-P4-gate-mapping.json | — | — | FORMATION |
| 5 | verify | docs/tranches/BI/FORMATION/coordination/SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001-ACK.json | — | — | FORMATION |
| 6 | verify | docs/tranches/BI/FORMATION/coordination/SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001-ACK.md | — | — | FORMATION |
| 7 | verify | docs/tranches/BI/FORMATION/coordination/SCI-P4-source-row-mapping.json | — | — | FORMATION |
| 8 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 9 | repair | scripts/constellation.mjs | — | f5adb9a095bceaf911a6b6c29a7b7461bb81ecd0 | source base |
| 10 | create | scripts/constellation/atlas-p-closure.mjs | — | — | source base |
| 11 | repair | scripts/verify.mjs | — | — | BI.W-P000 |
| 12 | create | tests/constellation/atlas-p-closure.test.ts | — | — | source base |
| 13 | repair | tests/verification/external-scenario-contract.test.ts | — | — | BI.W-P000 |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/constellation/atlas-p-closure.test.ts |
| tests | 2 | tests/verification/external-scenario-contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/constellation.mjs |
| build | 3 | scripts/verify.mjs |
| docs | 1 | docs/tranches/BI/coordination/asks-and-consumes.md |
| docs | 2 | docs/tranches/BI/exec/PREDICATES.v1.json |
| docs | 3 | docs/tranches/BI/exec/atlas-touched/ATLAS-PRODUCER-CLOSURE.v1.json |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P133/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every inbound row and predicate has one explicit producer disposition and executable owner; P-derived write authority exists only for the current fixed-point direct/required closure, all unrelated global BI work remains separately authorized and uncredited, and no ACK or earlier DesignSync phase can bypass a red external prerequisite.

**Required mutation bite:** Drop or duplicate one source row, preserve InkMark as an implicit family alias, rename only its Atlas local binding, classify a mixed shared path as banked, relocate a required flag, map a retained NEG to prose, trust the prose hash, treat ACK alone as G.W0 authority, or substitute pre-review for tested-source refresh; closure/lineage/DAG must identify the exact breach.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P133`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| constellation.handshake | device-free | Every in-scope sibling acceptance names the exact package tarball, owner commit, import scan, build/test evidence, and required π evidence; no retired import remains and no foreign write originates here. | Accept a consumer against a different tarball digest.; Count an uncommitted foreign patch as adoption. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.cursor | device-free | Disk cursor and git make wave execution exactly-once across restart; only terminal waves unlock dependents. | Make a RUNNING wave runnable after restart.; Let a no-op remain without DONE/DEAD disposition. |
| integrity.dag | device-free | The active graph is acyclic, subject-complete, transitively reduced, resource-lock schedulable, and contains no ceremony-only tail. | Add a transitive edge.; Add a LAST wave whose only subject is rerunning already-owned evidence. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |

## π obligation

Device-free: This wave allocates authority and validates evidence contracts; the owning product waves, especially P132, carry the painted π/DELTA obligations.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P004 | Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling. |
| BI.W-P014 | The sole verifier discovers the settled semantic graph rather than pre-move paths, every external predicate is executable through its owning wave, every mutation remains discriminating, and no historical command, family command, table roster, or fixed subject count returns. |

Declared semantic locks: `atlas-p-closure`, `constellation-snapshot`, `external-scenarios`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- The Atlas P v4 packet is a rigorously validated consumer-derived subset, not proof of the global Glass audit; receipt without exact producer allocation would recreate implicit ownership and false completion.
