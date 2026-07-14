# BI.W-P010 — MS6 — dissolve src/subpaths and generate every package projection

**Status:** PLANNED
**Topological stratum:** BI.S06
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P010`

## Intent

Remove 67 source mirror barrels and make one semantic entry map the sole public packaging authority.

## Exact scope

- Delete every tracked src/subpaths file after repointing all @glass/subpaths imports.
- Generate Vite inputs, declarations, package exports/types, and migration rows from the semantic entry graph.
- Resolve every packed entry and verify retired keys remain absent without locking a key count.
- Delete dist/subpaths production and any mirror-specific proof logic.

## File manifest (78)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | docs/STRUCTURE.md | — | — | BI.W-P005 |
| 2 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 3 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 4 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 5 | modify | scripts/flatten-subpath-types.mjs | — | 23b1313a92cad712687368227a3629919ad4b11a | source base |
| 6 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 7 | delete | src/subpaths/animated-digit.ts | — | 848f4cfe9208c2eb22cd8dde4b1542b0b2ad50a1 | source base |
| 8 | delete | src/subpaths/aurora.ts | — | c6c03076597e850611134f420b9e50c8fc00344f | source base |
| 9 | delete | src/subpaths/badge.ts | — | 63f2c2a585fd0e8bca2e74ab32609eb59b4d9cd7 | source base |
| 10 | delete | src/subpaths/blob-config.ts | — | 99bca3465c5d8bdca0e7638bf9e89e18e99ec96c | source base |
| 11 | delete | src/subpaths/blob.ts | — | 9272a912f8ebad16dcbbc282686ad8d16a66c0c8 | source base |
| 12 | delete | src/subpaths/button.ts | — | 41ed89907d3396c5082be9465938c368d09ec08b | source base |
| 13 | delete | src/subpaths/canvas.ts | — | 7a6c20b5a9239e3845d05af8ab59d7eff0e48cb5 | source base |
| 14 | delete | src/subpaths/card.ts | — | b2590a704361a5f7579d0538c23d2f3c16edcb22 | source base |
| 15 | delete | src/subpaths/chip.ts | — | 225226c8e3a314f7baedd3eb565bb8ea2936b834 | source base |
| 16 | delete | src/subpaths/collapsible.ts | — | 618a3e2b5df37677129aba45449fb931183ba228 | source base |
| 17 | delete | src/subpaths/color-swatch.ts | — | 10d34220cc949c2e7e57448cda492725e5cccb9e | source base |
| 18 | delete | src/subpaths/color.ts | — | ba3de0188a650026490342281580a5adc82bc37c | source base |
| 19 | delete | src/subpaths/command.ts | — | 9167f39e6890a4e1642af6dd5571caae32105479 | source base |
| 20 | delete | src/subpaths/completion-seal.ts | — | bd2db1fe3a1b84e722336134bf91ae200f9d32cc | source base |
| 21 | delete | src/subpaths/configurator.ts | — | 4badf06721af4c0732d3fe08f7c0424bb42d2b1a | source base |
| 22 | delete | src/subpaths/constellation.ts | — | 6381d83abc8d5fa5047fb5a1aa8603033ca371b7 | source base |
| 23 | delete | src/subpaths/controls.ts | — | 9ea9bdc5b27e2b31c8f3c0e673108169bd74f910 | source base |
| 24 | delete | src/subpaths/data-table.ts | — | d9705afdb5e412cfd1c8e4e5c01b884fabfb7d4d | source base |
| 25 | delete | src/subpaths/deck.ts | — | 46e206f13f6943a2135e7ddebba79a22f7ed022d | source base |
| 26 | delete | src/subpaths/dialog.ts | — | 742850bdeb876da81e12d478a057c06590d2b6ac | source base |
| 27 | delete | src/subpaths/dock.ts | — | 444b9863206c8990a652d5f500b745e5aec9acf2 | source base |
| 28 | delete | src/subpaths/dom.ts | — | fc7d93c2da41a750cb2776f2fb770913b81eca3e | source base |
| 29 | delete | src/subpaths/drawer.ts | — | a5951edb1362da6606cb5a8e1d24cc459ae8ced2 | source base |
| 30 | delete | src/subpaths/dropdown-menu.ts | — | 40a230d20909814770de6837569662f5637fef75 | source base |
| 31 | delete | src/subpaths/easing.ts | — | 2a3394cce944db69710f3fcbadc3124ab3250a91 | source base |
| 32 | delete | src/subpaths/expandable-container.ts | — | 42b88c0b50ef3153fbd103d91eb0a5101805e2e4 | source base |
| 33 | delete | src/subpaths/fading-scroll.ts | — | a0638a9dd8b4e5a87280dc5924e26be3ce251446 | source base |
| 34 | delete | src/subpaths/focus-scope.ts | — | 7f4f9d6b02dd6d65a8fbd08275b8dea2c548f8b5 | source base |
| 35 | delete | src/subpaths/fourier-field.ts | — | e05f9854db316e333be54d855b7be7137b923ab9 | source base |
| 36 | delete | src/subpaths/fourier-math.ts | — | 29bce816d968d96e570aab7ef5bcd8cf7ea162f2 | source base |
| 37 | delete | src/subpaths/handmark.ts | — | 9e9940a92b68da37ba5f22a83805b217f1222bfc | source base |
| 38 | delete | src/subpaths/header-ribbon.ts | — | 33c6084a7c290d3ad8b97efbda637a416988e1c3 | source base |
| 39 | delete | src/subpaths/icon-chip.ts | — | 2d7ab9af1441368eed14077a27fca523d9cbf383 | source base |
| 40 | delete | src/subpaths/icon-tooltip.ts | — | 3dac3b856997908cac9b71da5a9e870121d43875 | source base |
| 41 | delete | src/subpaths/instrument-chassis.ts | — | 10ec4e799cd750e4a412024178cf61824c7cc9c4 | source base |
| 42 | delete | src/subpaths/label.ts | — | 80dd5fe04fe44ed3f47417d4a0c83453472eea87 | source base |
| 43 | delete | src/subpaths/labeled-field.ts | — | c81ba27ebc4cdb099f7403505eee0734a109ca04 | source base |
| 44 | delete | src/subpaths/liquid-grid.ts | — | 62167b0b126681a709cd33da2033c8e04c0b5099 | source base |
| 45 | delete | src/subpaths/metric-badge.ts | — | 3b096e2f13a8eb059c92e18ba50c7bc83c3f8f5c | source base |
| 46 | delete | src/subpaths/metric-cell.ts | — | cf49c273877dd36cdb2bb916606290c97b973fdf | source base |
| 47 | delete | src/subpaths/metric-stack.ts | — | 6d9dd1c934f45a828cbe0bbcbd5e13ac089d08db | source base |
| 48 | delete | src/subpaths/motion-curves.ts | — | d087ee37dbb3f2267209c67c3f79629af160541f | source base |
| 49 | delete | src/subpaths/notification.ts | — | 2b1caf4d5de7078e49879591f6b3d826d47b759c | source base |
| 50 | delete | src/subpaths/number-field.ts | — | 44bada1549be72eaf7cb2af6cb9f025e9b5ffcb6 | source base |
| 51 | delete | src/subpaths/pager-dots.ts | — | ebaf0bcce5c747cec3a7b81285eabff4c55a89ad | source base |
| 52 | delete | src/subpaths/paper-backdrop.ts | — | aa4fc4f16bf0971c55986a67ef71e144b088b5bf | source base |
| 53 | delete | src/subpaths/popover.ts | — | 3cf63111a5a30faf5e87d16fb801286c080ffc97 | source base |
| 54 | delete | src/subpaths/progress.ts | — | 887c2469176ecf5ff5cc2970acba30e7d83e9a1d | source base |
| 55 | delete | src/subpaths/pulse.ts | — | 909b4c0895141864318ad35672071780f983794c | source base |
| 56 | delete | src/subpaths/reactive.ts | — | f25f5334a9af6ca558fea84e657f44892563b589 | source base |
| 57 | delete | src/subpaths/search.ts | — | c30a40fddfe8fd36f7b6be4d629a2cf230ad8a4a | source base |
| 58 | delete | src/subpaths/select.ts | — | 6275fcb63a4f2ebe6beafd6577d98653d43e6f28 | source base |
| 59 | delete | src/subpaths/separator.ts | — | c6997658eec7ce26d91bbdbd86be304eb680e8f8 | source base |
| 60 | delete | src/subpaths/slider.ts | — | d144438c5d626c3aa491e5491897553320b65388 | source base |
| 61 | delete | src/subpaths/sortable-list.ts | — | eb0efa74485731dd69c2319d90674220bf0acb29 | source base |
| 62 | delete | src/subpaths/spa-view.ts | — | 1cca5d5b5b3ac79a19ab37d0e09f38c87fd86d5f | source base |
| 63 | delete | src/subpaths/stacked-icons.ts | — | 9f5490966f6d44e64e578c157756f8359a860654 | source base |
| 64 | delete | src/subpaths/status-dot.ts | — | eba25ba4ee99ea655a92fd8bfcdb02c143de7a3a | source base |
| 65 | delete | src/subpaths/surface.ts | — | 92a9fccee189d4dd63db59e293ce5671202793b5 | source base |
| 66 | delete | src/subpaths/switch.ts | — | 7898d01f1593b0a1a1adbe671b85329acddf1e83 | source base |
| 67 | delete | src/subpaths/tabs.ts | — | c5f525eba83ddc75d359ed3a8e5d09cb93db93d9 | source base |
| 68 | delete | src/subpaths/timeline.ts | — | c33abf1826ab06973ea7848bccb90bdc74dd45a0 | source base |
| 69 | delete | src/subpaths/toast.ts | — | 38b49ad0f6e20d8ec2f8df43ec0726776723b5d8 | source base |
| 70 | delete | src/subpaths/toggle-group.ts | — | c826984e58f0497b8eeaa0ab54c7cc6ed4e6d11b | source base |
| 71 | delete | src/subpaths/tooltip.ts | — | 3db7bb5ecc5b4bd4e0df6859bbef6648892500d5 | source base |
| 72 | delete | src/subpaths/typewriter.ts | — | b7f8a157122d467a230fb14def37941dbc8fb326 | source base |
| 73 | delete | src/subpaths/watercolor-dot.ts | — | b3c08013744288dfed329041f513dc56e37449c8 | source base |
| 74 | repair | tests/components.smoke.spec.ts | — | 5304d14c6a7c73526705365a184d86aa0b7211b7 | source base |
| 75 | repair | tests/composables.smoke.spec.ts | — | 6ae97daf3ef786b4be90ca5409ad01e50ac250fc | source base |
| 76 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 77 | repair | tsconfig.build.json | — | d6adea2adeceab036688260344f750209c4ffd84 | source base |
| 78 | modify | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (14)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | tests/components.smoke.spec.ts |
| imports | 2 | tests/composables.smoke.spec.ts |
| imports | 3 | tests/public-surface.spec.ts |
| tests | 1 | tests/components.smoke.spec.ts |
| tests | 2 | tests/composables.smoke.spec.ts |
| tests | 3 | tests/public-surface.spec.ts |
| build | 1 | package.json |
| build | 2 | scripts/flatten-subpath-types.mjs |
| build | 3 | scripts/lib/subpath-policy.mjs |
| build | 4 | tsconfig.build.json |
| build | 5 | vite.config.ts |
| docs | 1 | MIGRATION.md |
| docs | 2 | README.md |
| docs | 3 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P010/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** No src/subpaths or dist/subpaths mirror exists; every public key and declaration is generated and resolves from the packed artifact.

**Required mutation bite:** Add a hand-authored package export missing from the semantic map and require semantic projection comparison to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P010`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Device-free: Packaging transposition is device-free; packed consumer builds are binding.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P009 | Every public entry resolves directly to a semantic owner; no pass-through root file or compatibility source path exists. |

Declared semantic locks: `entry-graph`, `package-manifest`. The cursor also acquires 78 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
