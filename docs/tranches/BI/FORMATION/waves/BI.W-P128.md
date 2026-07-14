# BI.W-P128 — One build-project authority for library, declarations, demo, tests, and iteration

**Status:** PLANNED
**Topological stratum:** BI.S13
**Formation family:** build-architecture
**Core centers:** C10_CONSTELLATION_ASSAY, C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P128`

## Intent

Replace hand-synchronized Vite and TypeScript config variants with one typed project graph whose projections retain genuinely different build products.

## Exact scope

- Model library JS, declarations, style assets, demo distribution, iteration, tests, and consumer fixtures as named projections with explicit shared and product-specific fields.
- Generate or import projections from one authority; delete copied alias/entry/external/plugin blocks while keeping distinct outputs explicit.
- Make the same generated entry graph from MS6 feed library and declaration builds and reject source-only resolution in packaged fixtures.
- Exercise cold clean builds, incremental iteration, declaration emission, demo build, and isolated tarball consumers in both supported engines where rendering is involved.

## File manifest (21)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | build/project-schema.json | — | — | source base |
| 2 | create | build/projects.mjs | — | — | source base |
| 3 | repair | CONTRIBUTING.md | — | 1994046ce7f0d8f361333bc644885214da00a8eb | source base |
| 4 | modify | demo/vite.demo-dist.config.ts | — | 09244211a97a27c9df46b0c931dc01920871290a | source base |
| 5 | repair | docs/canon/build-and-gates.md | — | ce8e454c039446067a726dffb1a75beef8eecdf5 | source base |
| 6 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | repair | scripts/flatten-subpath-types.mjs | — | 23b1313a92cad712687368227a3629919ad4b11a | source base |
| 8 | repair | scripts/verify-export-types.mjs | — | 41451980f1d14df20fe2b98cf5cabc92e8c1065d | source base |
| 9 | create | tests/build/consumer-fixtures.test.ts | — | — | source base |
| 10 | create | tests/build/project-graph.test.ts | — | — | source base |
| 11 | modify | tsconfig.build.json | — | d6adea2adeceab036688260344f750209c4ffd84 | source base |
| 12 | modify | tsconfig.json | — | 19afde22a0a697386dbf53c31ad18746b68572a8 | source base |
| 13 | modify | tsconfig.src.json | — | 32e3548d3f37115247a9c0c86fb10f1f313bfea6 | source base |
| 14 | modify | tsconfig.test.json | — | 2edec3c71456944ef003b87b37e07c92d71defa7 | source base |
| 15 | modify | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |
| 16 | modify | vite.iter.config.ts | — | 9632720e94bd064a31c2cb7c41dd8f8fc2ece42d | source base |
| 17 | modify | vite.library.ts | — | 5824a5c2e549f390321793c72066fb69ced5f49a | source base |
| 18 | modify | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |
| 19 | modify | vite.style-fold.ts | — | b2c70dd4c39bb0a8f51c730139034ed1b151df48 | source base |
| 20 | modify | vite.utility-emit.ts | — | 01797164ff5622b7d1694fbf0ba28581e996eb54 | source base |
| 21 | modify | vitest.config.ts | — | 2f79d6054e6c54a7f11577dac2accd2109ad49a3 | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/build/consumer-fixtures.test.ts |
| tests | 2 | tests/build/project-graph.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/flatten-subpath-types.mjs |
| build | 3 | scripts/verify-export-types.mjs |
| docs | 1 | CONTRIBUTING.md |
| docs | 2 | docs/canon/build-and-gates.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P128/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every build product is a declared projection of one project/entry authority, and no copied config block can silently diverge in aliases, entries, externals, plugins, or declarations.

**Required mutation bite:** Add a demo-only source alias or omit one generated subpath from declaration emission; project comparison and packed consumers must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P128`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.import-boundaries | device-free | Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior. | Import a sibling family's internal file.; Create an SCC between motion and glass. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| integrity.types | device-free | Library, tests, and declaration-build TypeScript programs agree without suppressions or generated declaration holes. | Remove one public return member from its declaration.; Insert an expect-error that no longer suppresses a real error. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: generated-demo-safari, generated-demo-chrome
Observables: route boot, CSS asset resolution, entry resolution, no source alias
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P057 | Public concepts, story modules, rendered components, and direct canonical routes form a generated semantic mapping with no import-only, phantom, dead-member, folded, relocated, alias, shim, or compatibility-route success. |

Declared semantic locks: `build-config`, `entry-graph`. The cursor also acquires 21 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
