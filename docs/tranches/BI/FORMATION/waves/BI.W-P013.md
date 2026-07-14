# BI.W-P013 — MS9 — live differential guard for the settled structure

**Status:** PLANNED
**Topological stratum:** BI.S07
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P013`

## Intent

Install a durable semantic differential immediately after structural moves, not as a terminal close sweep.

## Exact scope

- Compare public symbols/types, packed resolution, rendered story reach, CSS computed behavior, and supported consumer fixtures before/after structure.
- Represent intentional clean breaks through generated migration dispositions; reject accidental losses and accidental aliases.
- Make the differential family run for every later wave so structure drift is discovered at its producer.
- Delete MS-specific snapshot/count logic after shared invariant evidence proves the settled structure.

## File manifest (8)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | docs/STRUCTURE.md | — | — | BI.W-P005 |
| 2 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 3 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 4 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 5 | create | scripts/verification/oracles/structural-differential.mjs | — | — | source base |
| 6 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 7 | create | tests/structure/differential.test.ts | — | — | source base |
| 8 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/public-surface.spec.ts |
| tests | 2 | tests/structure/differential.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | MIGRATION.md |
| docs | 2 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P013/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every later wave sees accidental structural drift immediately; intentional removal is tied to one migration disposition and never an alias.

**Required mutation bite:** Delete a retained public type without a migration disposition and require the differential to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P013`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| integrity.types | device-free | Library, tests, and declaration-build TypeScript programs agree without suppressions or generated declaration holes. | Remove one public return member from its declaration.; Insert an expect-error that no longer suppresses a real error. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: structure-differential-representative
Observables: computed visual equivalence for move-only subjects, intentional-delta roster only
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P010 | No src/subpaths or dist/subpaths mirror exists; every public key and declaration is generated and resolves from the packed artifact. |
| BI.W-P011 | Every component selector has one colocated owner and the published cascade is generated without changing computed behavior during the move. |
| BI.W-P012 | Demo-only concepts have one private terminal home and every manifest route resolves to rendered code without a public export side effect. |

Declared semantic locks: `entry-graph`, `structure-differential`. The cursor also acquires 8 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Old MS9 was a tail close wave; perfected BI moves its protection before any redesign dependents.
