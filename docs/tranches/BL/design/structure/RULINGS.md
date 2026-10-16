# D1 · structure rulings R-1..R-10

The pass-1 registry (`REGISTRY.md` §3.3) sent ten rulings "to the owner as one list". The owner's edict
(`docs/tranches/BL/CHARTER.md`, last four paragraphs) and standing mandates decide four of them outright; the
driver rules the other six on the pass-1 measurements. Every row is marked with its authority. The owner may
override any row; pass 2 builds on these as written, and a route that finds a ruling unbuildable reports it
with measurements rather than working around it.

| id | question | ruling | authority |
|---|---|---|---|
| R-1 | `gate-register`'s sha-pinned closed-record roster, which went red in every prototype (S-6) | **RETIRE with the register.** The register is F-01's BLOCKER (green with 45 of 60 seats absent) and the owner's gates-abrogation mandate (E-8) collapses it to 40-60 invariant gates bound to executables. The collapse wave (W-REGISTER-COLLAPSE) lands BEFORE the structure migration, authors a fresh roster in BL, and names no file path a move would invalidate (it binds executables and invariants, not paths). Closed BK/BJ records are never rewritten. | owner mandate E-8 + audit F-01 |
| R-2 | the counting unit, and whether a public door counts as a reader (S-9) | **The unit is the component directory, recursively** (a sub-component's dir is a unit inside its parent), which is the edict's own unit ("colocated with their sub-components ... recursively"); declared families are not a placement unit. **A public door does NOT count as a reader.** Placement is decoupled from the JS surface (S-1: all six prototypes kept the 68 keys): placement is by readers, and the entry record (F-3) points at wherever a file lives. **Amended 2026-09-23 on the pass-2 B measurement** (`pass-2/B-research.md` §5.1): a file that its own unit's door publishes is ANCHORED in that unit (the door anchors, it does not read); a kernel door anchors nothing. The literal first form (a file read by one unit lives there even when its own unit's door publishes it) moved 17 component SFCs out of their own components (`Skeleton.vue` into data-table, against R-9) and hollowed published components, 53 misplaced rows at HEAD and 28 on the placed tree; the anchored form reaches 0 on the placed tree and keeps every published component home. **Clarified 2026-09-23 (X-10, the two pass-2 syntheses disagreed on one file):** the anchoring door is the unit's ROOT door, the index at the unit root that an entry or a parent unit reaches; a kind-slot barrel (`<unit>/composables/index.ts` and the like) is internal wiring, not a door, and anchors nothing. A file no entry publishes is placed by its readers (so `dock/composables/useDockHold.ts`, published by no entry and read only by slider, is placed by F-7). A door is a door, not an alias: one symbol, one entry (R-6). | edict + driver (amended by the driver on measurement) |
| R-3 | where tests live | **With their subject.** A test whose subject is one unit lives inside that unit in one slot, `<unit>/__tests__/` (one slot name everywhere, so a long unit dir does not double; dist excludes it by entry reachability, S-13, with no exclusion list). A visual spec whose subject is one unit lives in the same slot as `*.visual.ts`. Suites whose subject is the library as a whole (the invariant gates, token and cascade scans, boot graph, the public surface) stay in the top-level harness, because they have no single subject; a suite that scans source reads the resolved graph, never a directory walk, which removes pass 1's self-scanning failure. | edict ("ALL file directories") + driver |
| R-4 | the `composables/` name, which Steiger/FSD and full D ban | **KEEP `composables/`.** The owner prescribed it verbatim: "Composables that are truly module-level or global-level ... can be found within a composables/ dir therein". It is a slot at two grains: `<module>/composables/` for hooks shared inside one module, `src/composables/` for the truly global. Prior art that bans kind-named segments is overridden by the owner's word. | edict |
| R-5 | bounds (numbers, zones, generated files, SFC carves) | **12 and 500, enforced.** A directory holding more than 12 direct files (kind slots `composables/`, `__tests__/`, `styles/` not counted) or any hand-written source file over 500 lines is "long-running" and is broken into encapsulated modules. Zones: `src/`, `demo/`, `scripts/`, `tests/`, `tests-visual/`. A generated file is exempt only when a checked generator produces it and the gate verifies it. An SFC over the line bound splits by extracting sub-components and composables into its unit, never by `<style src>` or `<template src>` carves (S-11 measured both breaking the style fold and template type-checking). Pass 2 re-measures the distribution; if 12/500 force a split with no nameable module, the route reports it with the counterexample before formation. | edict ("long running dirs must and always be broken into common modules") + driver (numbers from PORTFOLIO and BJ's 500-line precedent) |
| R-6 | the 29 deliberate multi-door symbols | **One symbol, one door.** A symbol published on two entries is a dual path (E-1). Each of the 29 keeps its owning entry; the second door drops it, with a MIGRATION removal row (consumers update, E-6). Known consumer impact: value.js imports `BLOB_CONFIG_KEY` from both `./blob` and `./blob-config`. This is a surface break and rides BL's major. | E-1, E-6 |
| R-7 | what `./styles.css` carries after the CSS channel collapse | **Exactly what it carries at HEAD.** Collapsing the dual `@import` / `<style src>` channel must not drop the 19,950 B E measured; `gen-component-styles.mjs` derives `./styles.css` from the same generated channel. No consumer-visible change, verified by a byte diff of the rule set. | driver (no break without a reason) |
| R-8 | per-file dispositions (`springProjection.ts`, `safari-probe.mjs`, `pi-runner-manifest.mjs`, `Code.vue`) | **Each follows the placement rule or is deleted under E-7.** The floor seat lists each file's readers at HEAD: a file with readers is placed by F-7; a file with none is deleted unless it is an exported public symbol. Tooling scripts (`safari-probe.mjs`, `pi-runner-manifest.mjs`) are placed inside the `scripts/` module they serve under the same law. | E-7 + driver |
| R-9 | skeletons | **Colocate with the component they stand in for**, in that component's unit. The generic `Skeleton` primitive is its own unit. | edict (names skeletons) |
| R-10 | is the demo held to doors | **Yes: doors only.** The demo consumes the library through the same public entries consumers get, so the surface is dogfooded. The 7 edges past a door at HEAD are cured. A deliberate async boundary (e.g. `AppShell.vue → Aurora.vue`) imports the public subpath dynamically (`import("@mkbabb/glass-ui/aurora")` resolved by the dev alias), and pass 2 measures the chunk cost against the leaf import (S-12). | driver |

## Pass-3 rulings P3-R1..P3-R9

The pass-2 registry (`REGISTRY.md` §P2-5) sent nine rulings as one list. The driver rules them on the pass-2 measurements, under the same terms as above: each row names its authority, the owner may override any row, and pass 3 builds on them as written.

| id | question | ruling | authority |
|---|---|---|---|
| P3-R1 | a file a kernel entry publishes | **(a) Publication anchors.** An entry door anchors the files it publishes from inside its own directory, including in the global zone. The 7 hooks that kernel entries publish stay in `src/composables/`. This **replaces** R-2's clause "a kernel door anchors nothing". X-10 still holds: the anchoring door is the unit's root door, and slot barrels anchor nothing. Arm (b) would change 36 entry names in and 25 out for no gain, and all three pass-2 routes grew coupling under the old clause by moving the same 7 hooks into their first consumer. | edict ("truly global" composables live in `composables/`) + pass-2 measurement (S-18) |
| P3-R2 | CSS placement before the channel collapse | **CSS follows the same placement law as TS, applied to the channel after the collapse.** A sheet read by one unit lives in that unit; a sheet read by several goes to their nearest common owner, or to `src/styles/` when there is none. A route sequences its CSS moves after its R-7 collapse step, inside the same migration, and nothing is deferred out of the tranche. `chip/accent-tone.css` goes wherever that law puts it on the post-collapse channel, and both routes must agree. | edict (styles colocated, global-only in `styles/`) + driver |
| P3-R3 | R-5's slot arm (X-1) | **Strict.** Kind slots (`composables/`, `__tests__/`, `styles/`) do not count toward their parent's 12, but each slot is itself bounded by 12 files and 500 lines per file. One bound everywhere. | driver (KISS: no unbounded slot) |
| P3-R4 | R-6's count | **The law governs, not the number.** R-6's "29" was the pass-1 count; the count is whatever the gate measures (40 at HEAD), reproducibly. For the 20 `blob`/`blob-config` keys, the lighter `./blob-config` door owns the configuration symbols and `./blob` drops them. A config door exists so a consumer can read config without pulling the renderer. Each drop is a MIGRATION row. | driver (R-6's law, config-door purpose) |
| P3-R5 | R-10's count and `./aurora-config` | **The count is the measurement** (90 edges past a door at HEAD), and every edge is cured. **`./aurora-config` is accepted** as one new export key, mirroring `./blob-config`. It gets a MIGRATION row as an added entry. | driver (R-10's law; P3-R4 symmetry) |
| P3-R6 | FD-8: `@source` globs and `__tests__/`; `isTeleportedTarget.ts` | **`@source` globs exclude `__tests__/`.** Tests are not library source, and scanning them would put test-only classes in the shipped CSS. `isTeleportedTarget.ts` is placed by its readers under the placement law. | driver (dist carries no test-only paint) |
| P3-R7 | R-8: `springProjection.ts`, `useScrollScene.ts` (cross-zone readers only) | **The global zone.** A file whose readers span zones has no common owner below `src/`, so hooks go to `src/composables/` and non-hook modules go to the global shared slot. | R-8 (placement rule) |
| P3-R8 | `@source` inside the `./styles` aggregate against CSS door purity | **Allowed, scoped.** `@source` is build metadata, not paint. A door may carry `@source` for its own subtree only; a glob reaching outside the door stays a violation (G-07). | driver |
| P3-R9 | `.bundle-ratchet` rebind wording | **Driver's wording, one sentence, the same for every route:** "The ratchet binds to the dist entry map, not to `src` paths. A route's rebind is a mechanical path remap that leaves every entry's byte ceiling unchanged, and any ceiling change is its own ruled row." The owner may reword it. | driver |

## Pass-4 rulings P4-R1..P4-R5

Ruled by the driver on 2026-09-26, before pass 5's floor and route seats, from REGISTRY §P4-4. Each follows the registry's recommendation. The owner may override any row.

| id | question | ruling | ground |
|---|---|---|---|
| P4-R1 | R-10's scope | **(b) Every consumer zone is held to entries.** One rule at every depth: a file outside a unit reaches it through its door. A test inside `<unit>/__tests__/` is inside its unit and is not a crossing, so R-3's colocation cures most of the test lines. | edict ("encapsulated") + pass-4 measurement (B2: 67 lines, arm (a) 18) |
| P4-R2 | names consumers read that no entry publishes | **Re-point by default.** Publish a name on its owning entry only when it belongs to a published component's contract, with one MIGRATION "added" row and one pin row each. | driver (a demo reach to a private is a surface gap only when a consumer would need the same name) |
| P4-R3 | the ratchet | **P3-R9 re-worded:** "The ratchet is one two-sided total. A structure step that moves it lands its own datum row, with its bytes broken down by class, and the datum is rebound once, at the migration's landing commit." The floor row (−5,511 B) is ruled as measured. The route row (+17,264 B) is held until the "other declarations" +12,819 B is explained (P4-G9). | driver + FP4 §4, Bp4 §2 |
| P4-R4 | a moved CSS entry's dist name | **(a) The export key targets the real dist path.** No forwarding `@import` file. The export key is unchanged; a consumer importing the dist path directly gets a MIGRATION row. | edict (no shims) |
| P4-R5 | the P3-R3 counterexample, `dock/__tests__` 16 > 12 | **(b) Defer.** B-S11 splits `GlassDock.vue` (545 lines) and its tests follow their new subjects; the slot is then re-measured. If it is still over 12, the route reports it and the driver rules then. | R-5 already requires the split |

## Pass-5 rulings P5-R1..P5-R5

Ruled by the driver on 2026-10-07, before pass 6's floor and route seats, from REGISTRY §P5-4. Each follows the registry's recommendation. The owner may override any row.

| id | question | ruling | ground |
|---|---|---|---|
| P5-R1 | `dock/__tests__` after the GlassDock split (P4-R5's deferral) | **(a) Accept S56.** Eight single-concern files merge into three by what they test, 17 → 12. Every assertion is kept and no test's environment changes; the two files with a module mock or a browser stay alone. P3-R3 stays strict. | measured: 140 tests before and after (`dock-tests-merge.json`); the slot takes no sub-directory (B5) |
| P5-R2 | the route's datum row, 2,959,588 B, self-rebound at S59 | **(b), then (a).** Hold the declaration-prose share until it is cured: the S39-12 blob shader split copied 13,678 B of doc text into new public declarations; the prose stays where the symbol is published (one source of record), or leaves the declarations. Rule the remainder as measured once that cure lands. S59, the one rebind at the migration's landing step, satisfies P4-R3. | P4-G9 explained (`decl-diff.mjs --doors --chain`) |
| P5-R3 | B2's 61 lines | **One list, ruled together.** Tests and the aurora visual specs colocate into the subject unit's `__tests__/` (inside the unit is not a crossing, P4-R1); a test whose subjects are several units splits. Publish only a published component's contract: `useDockState` and the dock search types on `./dock`, `SectionHierarchy` on `./sidebar`, each with a MIGRATION "added" row and a pin row. `mulberry32` and `hashString` become a demo-local prng. For the rest (`useFuzzySearch`, `useGlassBackdropLuminance` + `GLASS_BACKDROP_SHARED_ATTR`, `useScrollScene`, `springProjection` + `motionTempo` with `regen-spring-tokens`, `isAuroraPointerEnabled`, `pendingRenderer`, `MAX_SATS`, `FOURIER_STROKE_RUNGS`) the route measures both arms per name and the driver rules on that table. | P4-R1, P4-R2 |
| P5-R4 | hand-written root configs and R-5's zones | **(a) Yes, bounds only.** 500 lines per file; the root directory is not counted against 12. `vite.style-fold.ts` (588 lines) splits into named modules beside it. | edict ("the same for backend files") |
| P5-R5 | the subject of a page-driving visual spec | **(a) The unit whose story or route the spec drives.** The law states how the subject is read (the story path the spec opens, through the story manifest), and B16 judges the tests-visual zone by it. | R-3 (a visual spec lives with its subject) |

## Pass-6 rulings P6-R1..P6-R3

Ruled by the driver on 2026-10-08, before pass 7's route seat, from REGISTRY §P6-5. Each follows the registry's recommendation. The owner may override any row.

| id | question | ruling | ground |
|---|---|---|---|
| P6-R1 | the P5-R3 residual table | **§P6-4 as written.** Every recommended row stays as landed except `useScrollScene`, which flips to (a): the demo keeps the scroll spine and the library file leaves `src`. Its S64 names, MIGRATION rows and pin rows go, and S69s's orphan-CSS row is re-derived. | P4-R2 (re-point by default); no library reader; `./motion-core` is the keyframes-free entry |
| P6-R2 | S67's morph-door widening for the tabs-seam test | **(b).** The 11 names leave `composables/motion/morph/index.ts`; the tabs-seam test states the geometry it observes. The datum row is re-measured and P4-R3's one rebind moves to the last step that changes the bytes. | P4-R2: a door grows for its consumers, and a test is not one |
| P6-R3 | `seal.mjs` exit codes | **(a).** 0 GREEN, 1 RED, 2 an uncaught throw; LAW states it. | S-14 fail-loud applies to the gate's own exit |

## Pass-7 rulings P7-R1..P7-R2

Ruled by the driver on 2026-10-08, before pass 8's route seat, from REGISTRY §P7-4. Each follows the registry's recommendation. The owner may override any row.

| id | question | ruling | ground |
|---|---|---|---|
| P7-R1 | who judges an entry's declared peer class | **(a).** A gate clause, B18, judges each entry's names and files arms against its declared class, under `npm test` through `seal.test.ts`, with one RED and one GREEN case. The probe keeps the dist arm, which throws (exit 2) on a missing build. LAW §5 names B18 as the owner. 18 clauses become 19. | pass 6 broke the class with every gate GREEN; a judge nothing re-runs at landing does not hold it |
| P7-R2 | when a key is base-green | **(a).** A key is base-green when it passes on the floor base in every run. A key that fails on the base under an alternating rerun (3 per tree) is flaky: recorded and kept out of the bar. LAW states the protocol. | a single-run mark cannot separate a flake from a regression |

## Pass-8 rulings P8-R1..P8-R3

Ruled by the driver on 2026-10-15, each at the registry's recommended arm (REGISTRY §P8-4). The owner may override any of them.

| id | question | ruling | ground |
|---|---|---|---|
| P8-R1 | the `_*` capture specs in the browser selection | **(a).** Excluded, stated: LAW §13 names the exclusion and its reason (a capture spec writes into `docs/` and asserts no product behaviour); `browser-select.mjs` prints the excluded moved specs; one instrument reads a moved capture spec's imports (B16 or the floor graph resolving every `tests-visual/` import). If that needs a clause widening, S69 and S69s are re-derived once and `seal.test.ts` carries the RED case. | running a capture spec rewrites tranche records; the defect was the unstated rule and the unread move, and (a) cures both without a browser re-run |
| P8-R2 | does P6-R3's exit law bind every kit judge | **(a).** Yes. `browser-tally`, `browser-select`, `rekey` and `peer-closure` install the `seal.mjs` guard first and load their work after it; 0 GREEN, 1 RED, 2 on any throw; a degenerate input (an empty dist entry, an empty report) throws. LAW states it once. | a judge whose crash reads as its own RED is the defect pass 7 re-opened in the gate; kit tools do not land in src or scripts, so no chain step and no digest change |
| P8-R3 | is the declared peer-class set pinned | **(b).** No. `src/README.md`'s table stays the one record of declared classes; withdrawing a class is a reviewed source edit; B18 throws on a missing table, file or peer; LAW §5 says so. | the declared set is authored, not measured; pinning it puts one fact in two records, which a two-clean loop cannot converge over |

## Pass-9 rulings P9-R1..P9-R2

Ruled by the driver on 2026-10-15, each at the registry's recommended arm (REGISTRY §P9-4). The owner may override either.

| id | question | ruling | ground |
|---|---|---|---|
| P9-R1 | who cures the `fourier-field` ↔ `fourier-field/renderer` parent↔child value cycle | **(a).** The loop. B4 widens from siblings to every module-grain value SCC, parent↔child included; a chain step applies LAW §4's base rule (the parent-level file the child value-reads, `fourier-field/math.ts`, moves into a sibling module inside the `./fourier-math` anchor); `seal.test.ts` carries the RED case and a type-only reverse edge reads clean. | the seal lands as G-42 and enforces the edict after the wave; a seal that passes a parent↔child cycle cannot hold F-59 |
| P9-R2 | who writes the chain's MIGRATION heading | **(a).** The chain. The MIGRATION row writes `## 11.0.0` in W-C.2's form with no tranche id, and the 9 `BL`/"tranche" lines go in the same row; `MIGRATION.md` ships, so S70's datum is re-measured and rebound once (P4-R3). | the chain authors shipped text; W-D.1 step 1 forbids hand edits, so a tranche id in the chain's text would hand the wave a gate it fails by construction |

## Pass-10 ruling P10-R1

Ruled by the driver on 2026-10-16 at the registry's recommended arm (REGISTRY §P10-4). The owner may override it.

| id | question | ruling | ground |
|---|---|---|---|
| P10-R1 | where the move engine's `./`-lead cure lives | **(a).** The floor row: `floor/lib/move.mjs:168` takes the one-line cure with a floor plant that moves a holder of `"./dist/x"` and reads the spelling kept; the floor base is re-cut; S74c leaves the chain; S1b→S70 re-derive and replay to a new digest; S70's datum is unchanged (the engine does not ship). | one engine, one record: FLOOR.md F-2 / P4-F3 already state the kept spelling, so the docs floor carries the cure instead of a chain step patching its own landed copy |
