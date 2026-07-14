# BI.W-P127 — Dependency, peer, generator, and lockfile singularity

**Status:** PLANNED
**Topological stratum:** BI.S25
**Formation family:** package-contract
**Core centers:** C10_CONSTELLATION_ASSAY, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P127`

## Intent

Make package metadata follow the post-apotheosis import graph, remove the shadcn generator contract, and reconcile the value/keyframes/pencil-boil peer line without duplicate engines.

## Exact scope

- Delete components.json after the ui/custom and shadcn structures are gone; no generator alias or hidden src/utils target survives.
- Remove class-variance-authority, clsx, and tw-animate-css only after their exact last importers land; classify every remaining package as runtime, peer, optional, or development from the packed graph.
- Reconcile @mkbabb/keyframes.js ^5.2.0 with @mkbabb/value.js ^3.1.0 as a paired contract and execute X8's @mkbabb/pencil-boil ^0.8.1 widen with isolated consumer verification.
- Regenerate one lockfile from the resulting manifest and reject file: links, duplicate semantic engines, unused peers, and peer/dev range disagreement.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | delete | components.json | — | 2fd7bc40d9628fc3efc8b11debb525ae0064dd43 | source base |
| 2 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 3 | modify | package-lock.json | — | b7b72916912609cca3de20894210d10a26665141 | source base |
| 4 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 5 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 6 | create | scripts/dependencies/contract.mjs | — | — | source base |
| 7 | create | tests/package/consumer-fixtures.test.ts | — | — | source base |
| 8 | create | tests/package/dependency-contract.test.ts | — | — | source base |
| 9 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests/package/consumer-fixtures.test.ts |
| tests | 2 | tests/package/dependency-contract.test.ts |
| build | 1 | package-lock.json |
| build | 2 | package.json |
| build | 3 | vite.config.ts |
| docs | 1 | MIGRATION.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P127/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** The manifest and lock are projections of actual packed imports and supported peer contracts; no shadcn generator, styling scaffold, duplicate engine, or range contradiction survives.

**Required mutation bite:** Restore class-variance-authority with zero imports, move reka-ui to dev-only, or pin pencil-boil below the declared peer; the dependency contract must identify each distinct defect.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P127`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.dependencies | device-free | Runtime, peer, optional, and development dependencies match actual import boundaries and the supported package contract. | Move a runtime dependency to devDependencies.; Add a second spring engine for an existing motion concept. |

## π obligation

Device-free: Dependency and isolated-package resolution are device-free.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P051 | Handmark and WatercolorDot share one deterministic drawing substrate while retaining distinct semantic mark and point-paint contracts; no unrelated filter resource or unseeded writer enters the family. |
| BI.W-P071 | Avatar owns image, accessible name/alt policy, fallback initials, load failure, status composition, and stable geometry without a second image-loading path. |
| BI.W-P072 | Badge is noninteractive metadata with semantic tone/emphasis and noncolor distinction; command behavior belongs to Button/Chip. |
| BI.W-P073 | Alert owns inline status semantics, title/body/action structure, tone, and live-region policy; it never behaves like transient Toast. |
| BI.W-P074 | One Reka-backed Toast family owns provider, queue, viewport, item, action, close, swipe, lifetime, tone, and announcements; Notification's parallel TransitionGroup engine is deleted. |
| BI.W-P090 | ToggleGroup declares single/multiple selection, orientation, roving focus, disabled state, and one shared Toggle visual/press contract. |
| BI.W-P091 | One Chip family owns text/icon/removal/selection/action semantics with explicit modes; IconChip is a slot/size form, not a second concept/export. |
| BI.W-P093 | Slider preserves min/max/step/orientation/single-range/keyboard/touch/form semantics and stable thumb/track geometry with no duplicate spring engine. |
| BI.W-P099 | Search owns query, clear, submit, async/loading/empty/error, optional suggestions, keyboard navigation, and result announcement without duplicating Combobox when selection is not its concept. |
| BI.W-P106 | Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion. |
| BI.W-P119 | Carousel owns slide identity, previous/next/direct navigation, loop policy, drag, autoplay pause, focus, announcements, responsive sizing, and composes PagerDots rather than forking it. |

Declared semantic locks: `package-lock`, `package-manifest`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- The current manifest preserves shadcn-vue generation metadata, CVA/clsx/tw-animate peers, and pencil-boil ^0.4.1 while the standing X8 ruling requires ^0.8.1 verification.
