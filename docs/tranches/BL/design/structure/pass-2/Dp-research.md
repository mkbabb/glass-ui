# D1-D′ · pass 2 research: a rank table over today's dirs

Seat: research for D′ (direction by rank, `src/composables/` kept). Model: claude-opus-5-5. Base: 5dd68ca9 (code-identical to 0a2d8bd8, which the first carve ran from). Every number below comes from a command this seat ran. The tools and raw outputs sit in the seat scratchpad (`…/scratchpad/D1/p2/Dp-research/v2/tools` and `…/v2/out`). The worktree was removed before return, and no tracked file in the checkout was touched.

## 0 · Verdict

- **Gate integrity gaps 1-7 are closed on the F-1-shaped graph.** A 44-plant battery (C01-C27, five aimed variants, P01-P12) catches 39 plants, misses 1 (C20, backend, out of scope), passes 4 legal probes as intended and raises 0 false positives.
- **The carve builds.** It makes 36 moves, 1 delete, 2 declaration splits and 24 hunks. Build, demo build, vue-tsc ×2, `regen-exports` EXACT and pack all exit 0. `verify:package` exits 0 once the carve rebinds `.bundle-ratchet` in one hunk. The four CSS export cascades are identical, and the gate goes from 80 to 0.
- **R-3 reaches a fixed point.** 171 tests move into 74 `__tests__/` slots, and a rerun proposes 0 moves.
- **Below the unit, D′ is only an enforcement arm.** It places a file into a sub-dir that already exists (the 2 class-A files, both moved). The 7 sub-components in 6 units that need a new dir need a name, and D′ has no rule that makes one (SF-11). D′ therefore has to compose with a placement route that names dirs.
- **The composition class is derived, not declared.** A composition is a component unit that reads another component unit's door, and the gate requires those edges to form a DAG. Over 703 commits, the door-only composition graph had 0 cycles, and a flip costs no table row.
- **Convergence: 55%.** The breakdown and remaining gaps are in §12-13.

## 1 · What was built

| piece | file (scratch `v2/tools/`) | what it does |
|---|---|---|
| graph | `graph.mjs` | Builds the edge graph with the TypeScript AST, covering every S-4 edge kind. The package self-name resolves through `exports` and the entry map. CSS `url()` also matches the self-name (4 font urls in `fonts.css`). |
| table | `table-dp.mjs` | 11 rows, each exactly `[prefix, stratum, grain]`. No row carries prose. |
| gate | `gate-dp.mjs` | Rules: unresolved, self-name, unzoned, upward, cycle, door-impure, door-reads-door, table, placement (owned / dead / reach / dead barrel), below, below-direction, dual-door (R-6), bound (R-5), test-home (R-3). |
| carve | `carve2.mjs` + `move.mjs` + `repoint2.mjs` | Applies the D′ migration from a fresh HEAD worktree and writes a manifest. |
| tests | `tests-home.mjs`, `tests-place.mjs`, `tests-move.mjs` | Computes R-3 homes, then places and moves the tests. |
| arm | `cascade-arm.mjs` (+ `cascade.mjs`) | The move-only cascade arm (§7). |
| battery | `plant.mjs` | Plants each case and runs the gate. It checks the tree hash so every run restores the tree. |
| census | `below.mjs`, `below2.mjs`, `compclass.mjs`, `comphead.mjs`, `history.mjs`, `visual-routes.mjs`, `demo-doors*.mjs` | Read-only measurements. |

The table:

```
src/styles/                       foundation  self:foundation
src/fonts/                        foundation  self:foundation
src/html-attributes.d.ts          foundation  self:foundation
src/composables/                  primitives  child
src/composables/glass/webgl/      substrate   self
src/composables/glass/webgpu/     substrate   self
src/composables/glass/canvas2d/   substrate   self
src/composables/glass/procedural/ substrate   self
src/composables/motion/pointer/   substrate   self
src/components/_shared/           patterns    child
src/components/                   components  child
```

The ranks are foundation 0, primitives 1, substrate 2, patterns 3, components 4, anchor 9 and outside 10. The longest prefix wins.

Anchors are computed from the tree, never from a file's position:
- `src/index.ts`;
- any entry-map file that re-exports from a unit of higher rank than its own (an aggregator: it must be a pure door, and nothing in the library may import it);
- each CSS export entry, together with the import-only sheets it reaches inside foundation.

## 2 · Gaps 1-7, closed

| gap | cure | evidence |
|---|---|---|
| 1 · self-name bypass | `self-name` fails any module-kind src edge spelled `@mkbabb/glass-ui[/sub]`. The graph resolves it to the source file, so the direction rules judge the same edge. | C01 (type), C01v (value) and P05 (a component imports its own subpath) are caught. Harm with C01v, planted on the carved tree: vue-tsc exit 0 and build exit 0, but the build transforms 654 modules instead of 646 and the `useTimer` chunk grows from 0.54 kB to 12.98 kB, because the previous `dist` is bundled. Self-name edges in src at HEAD: 0. The 4 `url("@mkbabb/glass-ui/fonts/…")` in `fonts.css` are consumer asset references: they are resolved and checked for existence, not failed as self-name. |
| 2 · globs, `new URL`, `@source`, templates | These edge kinds fail closed as `unresolved` when they land nowhere, and `OPAQUE` (a non-literal target) fails too. | C03 (glob), C04 (`new URL`), C06 (`@source`), C17 (template), P07 (opaque) and P06 (`vi.doUnmock` of a gone path) are caught. HEAD's one unresolved edge (`webgpu-everywhere.spec.ts:178`, opaque `path`) is cured by hunk H5, which switches to literal shader imports. |
| 3 · positional anchors | Anchors are computed (§1). | C07 (`src/leftover.ts`) is `unzoned` and no longer an anchor. C08 (aggregator ↔ root) is a cycle, and C08b (two public doors) is upward. There are 9 anchors at HEAD and 11 on the carved tree: `./color` and `./dom` become aggregators because they publish files that returned to chip, easing and slider. P02 (a component that reads the `./color` aggregator) fails as upward. |
| 4 · `glass.css:68` exempted | A CSS export entry is now a door, not an exemption. `glass.css` is import-only (checked), and its edges into `components/` are door edges: 25 of them, from `glass.css` and `index.css`. The 5 sheets owned by one component moved into that component, and the door imports them from there. | `glass.css` → `chip/accent-tone.css` is a door edge. **Residual:** door purity is gated for JS only. A rule added to `glass.css` would not fail (`fonts.css` legitimately has rules). |
| 5 · root row makes a missing row unfailable | There is no root row. A src file under no row that is not an anchor fails `unzoned`, and a malformed or dangling row fails `table`. | C07, C24 (a row carrying a reason field) and P10 (a row naming nothing) are caught. |
| 6 · the consumer rule skips CSS, foundation, `index.ts` | Placement counts CSS readers (a partial's readers are its class users), foundation files and barrels. A dead barrel fails. | C10, C11, C12, C14, C26 and P11 are caught, and C13 (a colocated `@import`-only manifest) passes. The rule found `src/components/index.ts` (a dead barrel at HEAD) and `glass/canvas2d/index.ts` (dead after the carve), and both are deleted. |
| 7 · acyclicity ignores CSS | `cycle` runs per stratum over every ranked edge kind, CSS and type included. It covers the components stratum. | C19 (a CSS `@import` cycle card ↔ dock) and P04 (select ↔ tabs through doors) are caught. At HEAD it finds dialog ↔ sheet. |

## 3 · The battery (C01-C27 + P01-P12)

`plant.mjs` ran on the carved tree. Tree hash e816d034a7ca8e01 was restored after all 44 plants, and the baseline was 171 test-home rows (the tests were not yet moved).

| result | plants |
|---|---|
| caught (39) | C01 C01v C02 C03 C04 C05 C06 C07 C08 C08b C09r C10 C11 C12 C14 C15 C16 C16b C17 C18 C19 C21 C22 C23r C24 C26 C27 P01-P12 |
| legal, as intended (4) | C09 (a new `_shared/` dir read by two units; there is no row to miss), C13 (false-positive probe), C23 (a global hook read by two components, R-4), C25 (JSON import) |
| missed (1) | C20: a bin CLI imports another bin CLI. The gate has no backend arm. |
| false positives | 0 |

Every one of C01-C19 is caught or is a deliberate legal probe. C09 is re-expressed because D′ has no charter row to omit, and C09r aims it at its real risk (a `_shared/` dir read by one unit), which is caught. C21 and C24 are re-expressed the same way (§6). P01 (overlay reading dock's context again) is the M02 regression plant, and it is caught.

## 4 · The carve

**Moves: 36.** They come in four groups.

*Floor rows (3):*
- `tabs/composables/useTabRovingFocus.ts` → `composables/motion/morph/` (F-8b);
- `motion/scroll/useScrollScene.ts` → `demo/stories/motion/` (floor #3);
- `motion/spring/springProjection.ts` → `scripts/` (R-8).

*Direction (5):*
- `dialog/ModalOverlay.vue` → `_shared/overlay/` (M03);
- `aurora/constants/budget.ts` → `composables/glass/webgl/` (read by aurora and blob);
- `_shared/selection.ts` and `_shared/interaction.ts` → `composables/motion/morph/` (a primitive read them);
- `tabs/styles/drag.css` → `src/styles/glass/` (read by tabs, dock and sortable-list).

*Owner returns under R-2 (26):* a file read by one unit goes to that unit, because a door is not a reader.
- chip: useAccentTone, accent-tone-solve;
- easing: useClipboard;
- slider: useDragVelocity, and useDockHold (from dock);
- dock: backdrop luminance ×3, useRAFLoop, useYieldToMain, useScrollChrome, isTeleportedTarget, `search/` ×4;
- constellation: useCanvas2D, useRoutePointer;
- aurora: curl-fbm glsl/wgsl, useScrollProgress;
- the 5 `glass/*.css` sheets each go to the component that owns it.

*Below the unit (2):* the fourier-field shaders → `fourier-field/renderer/`.

The other structural changes:
- **1 delete:** `src/components/index.ts`.
- **2 declaration splits:**
  - `color/index.ts` → `color/color.ts`: once `./color` became an aggregator, its declarations had to leave the door;
  - `sheet/motion.ts` scrim → `_shared/overlay/scrim.ts`.
- **24 hunks:**
  - F 9: m02-overlay-host floor row (3 files), plus 7 R-6 door trims;
  - H 11: the host reader, useDockHold, the scrim split, the color split, the glass barrel, literal shader imports;
  - P 4: 3 barrel trims, plus 1 readerless barrel deleted.
- **152 rewrites in 100 files.** 142 are specifier rewrites and 10 are literals. By kind: value 82, type 47, css 6, mock 5, literal 10, dynamic 2. By zone: src 98, tests 42, demo 11, scripts 1. Across these files the rewrites touch 37 statements.

**M02 cure.** The cure is F-8's `OverlayHost` inversion: `participation.ts` owns `OverlayHost` and `DockHoldKind`, dock provides the host, and `dockContext` stays in dock. `useDockHold` reads the host, and its one reader is slider, so it lives in slider.

**Files that leave their component: 5.** Full D moved 11. The 5 are useTabRovingFocus, ModalOverlay, budget, drag.css and useDockHold, plus the scrim half of `sheet/motion.ts`. No pattern is named after a component. There are two name residues, both of which D′ cannot fix:
- `slider/useDockHold.ts` keeps "Dock" in its name;
- the two `flow.*.ts` files from `glass/webgl/shaders/` collide with aurora's own `flow.glsl.ts`. They take the name `curl-fbm.*` from their one export `CURL_FBM_GLSL`/`_WGSL`, which is derived, not minted.

**Surface.**
- 68 export keys and 62 `typesVersions` are unchanged. `regen-exports` reports `EXACT_REPRODUCTION`, with fidelity 63/63.
- Runtime names go from 603 to 583, and type names from 1,279 to 1,240.
- All 59 drops are R-6 second doors. Each dropped name is still published on its owning entry, so 0 names left the package and 0 were added. The drops are:
  - `./blob` 6+20;
  - `./fourier-field` 7+8;
  - `./aurora` 3+3;
  - `./motion` 3+3;
  - `./dock` 1+4;
  - `./surface` 0+1.

**Omissions found in the carve (measured, not yet cured):**
1. **A stale policy row.** `regen-exports` reports `stale: ["composables/search"]`. `scripts/lib/subpath-policy.mjs:145` still classifies `search: "INTERNAL"` after `search/` moved into dock. The run still passes, because `failClosed.pass` is true. The carve owes one declared hunk here. The finding goes further: `COMPONENT_CLASS`/`COMPOSABLE_CLASS` is a second declared per-dir structure next to the rank table (registry gap 17).
2. **The bundle ratchet.** `verify:package` fails with `G-BUNDLE-RATCHET … shrink: 2910608 < 2916129` (−5,521 B unpacked, 841 → 840 pack entries). After the one-line rebind it exits 0 (`terminal CLEAN`, 193 claims, 454 declarations, 124 css, roster 289/289). The rebind is an owner-worded hunk by that script's own law.
3. **A new bound violation.** `scripts/` now holds 13 direct files, over the bound. `springProjection.ts` belongs inside the `scripts/` module it serves (R-8), and `scripts/lib/` exists.

## 5 · Colocation below the unit: the concession

D′'s placement rule has only one step below the unit: `below` moves a file whose in-unit readers all sit in one existing non-kind sub-dir into that sub-dir. It mints no dir. The census (`below.mjs`, `below2.mjs`) measures what that step leaves.

| measure | HEAD | carved |
|---|---|---|
| component units / sub-component SFCs | 55 / 91 | 55 / 90 |
| class A (an existing sub-dir takes the file, no name needed) | 2 (fourier-field shaders) | 0 (moved) |
| class B (a sub-component whose private parts have no dir of their own) | 7 in 6 units, 10 files | 7 in 6 units, 11 files |
| flat units (≥ 2 non-root SFCs, no sub-dir) | — | 20 |
| non-SFC files by SFC readers: one / few / wide / none | — | 4 / 5 / 181 / 163 |

Class B at HEAD:
- `card/CardHeader` ⇐ `scroll.css`;
- `carousel/CarouselContent` ⇐ `projection.ts`;
- `dock/DockBackgroundToggle` ⇐ `DockControl.vue`;
- `dock/DockLayerGroup` ⇐ `DockCrossfade.vue`;
- `easing/EasingPicker` ⇐ `usePicker.ts`, plus `useClipboard.ts` after the owner return;
- `select/SelectContent` ⇐ `SelectScrollButton.vue`;
- `toast/Toaster` ⇐ `ToastClose`, `ToastDescription`, `ToastTitle`, `use-toast.ts`.

Each of these needs a new directory, and so a name: `toaster/`, `layer-group/` and so on. D′'s table names only today's dirs. A row that invented `toast/toaster/` would be an authored name carried in a structure table, which is exactly the charter prose that C24 bans.

The owner returns also add to class B, because they land in the unit root or an existing slot, never in a sub-component dir. `dock/composables/` grows from 13 to 19 files and `aurora/composables/` from 16 to 17. R-5 exempts both slots from the 12-file bound, so the gate stays quiet, but the edict's "long running dirs … broken into common modules" is not met there.

**Conclusion.** D′ answers direction, placement at the unit grain, placement into existing sub-dirs, and the test slot. It does not answer colocation below the unit. It is the enforcement arm, and it must compose with a placement route that can name a sub-component dir: G's eponymy is the named candidate (registry §6.5). The composition is clean, because D′'s rules judge whatever dirs exist. After the placement route mints `toast/toaster/`, `below` keeps files in it and `below-direction` keeps its kind slots from reading upward. Excluding `__tests__`, the carved tree has 0 intra-unit kind-slot → SFC edges. The 48 raw edges are all test-slot readers, which R-3 exempts.

## 6 · The composition class

**Definition.** The class is derived from the graph: a composition is a component unit with a value, type or CSS edge into another component unit's door or SFC. The gate enforces three things:
1. The components stratum is acyclic, over every edge kind (`cycle`).
2. A read into another unit's non-door file fails (`placement: reach`).
3. A component unit that nothing reads and that is unpublished fails (`placement: dead`, the re-expressed C21).

**Rule.** Compositions of compositions are allowed, as long as they form a DAG. No table row declares the class, so a flip costs 0 rows. Rows carry no prose (C24 re-expressed as the `table` shape rule).

**On the trees** (`comphead.mjs`):

| | composers | pairs | max height | cycles |
|---|---|---|---|---|
| HEAD | 16 (one is the dead root barrel) | 55 | 4 | dialog ↔ sheet |
| carved | 11 | 21 | 2 (easing → tabs → select) | 0 |

**Stability over history** (`history.mjs` replay, `compclass.mjs`). The replay covers 703 first-parent commits that touch `src/components`, from 2026-03-25 to 2026-09-22.

| measure | value |
|---|---|
| snapshots where the composition set changed | 52 |
| component ↔ composition flips of an existing dir | 37, across 27 dirs |
| flips caused by a door/SFC edge / by a helper reach | 19 / 18 |
| births as a composition | 17 |
| snapshots with a cycle, any edge kind | 394 |
| snapshots with a cycle, door/SFC edges only | **0** |
| snapshots with a helper reach (what `placement: reach` now fails) | 599 |
| derived-height changes | 21, across 15 dirs |
| max composition depth | 2 |

Read with D′'s rules, the history splits in two. The 18 helper-caused flips and every one of the 394 cyclic snapshots come from reaches into non-door files, which the gate now fails. The door-level composition graph was acyclic in all 703 snapshots. Under pass 1, each of the 37 flips cost a declared row; under derivation, the gate re-judges the class on every run and none of them cost anything.

## 7 · The move-only cascade arm (F-4)

**Scope.** The arm runs only on a structure wave, meaning a change set with a move manifest whose `base` is the commit the engine ran from. An intended CSS change never goes through it. A CSS change smuggled into a structure wave fails.

**Method.**
1. **Move-only.** In both trees, each graph edge's specifier range is replaced by the base path of the file it resolves to. A file whose normalized text equals its base counterpart (through the move map) is move-only.
2. **Classification.** Every other changed file is a resolution-preserving re-point, a `vi.mock` re-aimed at the origin of every key it mocks, or an authored hunk.
3. **Declared.** Every authored hunk must be named in the manifest. Declaration moves (`declMoves`) are recorded as head → base.
4. **Cascade.** The four CSS export entries are flattened with `@import` inlined. Vue scope ids and scoped `@keyframes` suffixes are renamed in order of first appearance. The result is compared against the build of the named base.

**Runs.**

| run | result |
|---|---|
| carve (base 0a2d8bd8) | PASS: 109 move-only, 30 re-points, 1 mock re-aim, 16 authored, 0 undeclared. `./styles` 122 files / 322,680 B identical modulo scope ids, `./styles/fonts` and `./styles/theme` byte-identical, `./styles.css` identical modulo scope ids. |
| M-D2 planted (chip band strength 22% → 18%) | FAIL at byte 74,264 of `./styles`. The authored hunks are named as the only candidates. vitest does not catch this plant. |
| a legitimate CSS rule smuggled into `button/styles.css` | FAIL: 1 undeclared edit, and `./styles` differs (322,680 → 322,716 B). |
| final (carve + R-3 move + below moves, base 5dd68ca9) | PASS: 264 move-only, 30 re-points, 1 mock re-aim, 18 authored, 0 undeclared, 953 unchanged. All four cascades identical. |

**Two holes, both measured on the final tree:**
1. **A path computed from the file's own directory.** `material-css-syntax.test.ts` sets `ROOT = resolve(import.meta.dirname, "../..")`. It moved two levels deeper, stayed byte-identical and was classified move-only, but it now reads `src/styles/src/styles/glass/material.css`. vitest fails 2 tests; the arm passes. F-1 has no edge kind for this form, so neither the move engine nor the arm sees it. At HEAD, 1 file in `tests/` and `tests-visual/` uses it. The `new URL(rel, import.meta.url)` form is modeled and was re-aimed correctly (`blob-page.visual.ts`). **Cure:** add a `root` edge kind to F-1 for `resolve(import.meta.dirname | __dirname, <literal>)`.
2. **Globs that gain a file.** `demo.css:106 @source "../src/components/_shared/**/*.ts"` now also scans `_shared/__tests__/cn.test.ts`. The demo CSS goes from 355.28 kB to 359.88 kB (+4.60 kB) at the tests-move stage (the carve alone leaves it at 355.28 kB). The arm compares library exports only, and the move engine's residue lists files that leave a glob, not files that arrive in one. **Cure:** run the residue check in both directions over glob edges, and add a ruling on how `@source` treats a unit's `__tests__/` slot. R-3 forbids an exclusion list for dist, and this glob is a demo scan.

## 8 · Tests under R-3: the fixed point

**Home rule** (`tests-home.mjs`, shared by the `test-home` rule and the placement tool):
1. A test's subject files are the files that declare the names it imports (doors are not subjects), plus its literal, url, css and glob targets.
2. The subject unit is the highest-rank unit among those files. A tie between component units goes to the one that reaches the others.
3. The test's home is the deepest directory inside that unit that holds every subject file, lifted out of kind slots. The slot is `<dir>/__tests__/`, and visual specs become `*.visual.ts`.
4. The test stays in the top-level harness when it reads a door whole, walks directories, or has more than one subject unit.

| measure | value |
|---|---|
| tests | 416 (249 unit, 167 visual) |
| moved | 171 (167 unit + 4 visual) into 74 slots. Slot depth: 2 → 1, 3 → 60, 4 → 12, 5 → 1. Max per slot: 21 (dock), with aurora at 19. Both are over 12 but exempt by R-5. |
| harness, unit (82) | walks directories 38, several subject units 23, no src subject 15, reads a door whole 6 |
| harness, visual (163) | no src subject 162, 2 subject units 1 |
| collisions | 1. Two `useTokenColor` suites land in one slot, so the injection-seam suite takes the authored name `useTokenColor.resolver.test.ts`. |
| **rerun on the moved tree** | **toMove 0, already home 171. The gate's `test-home` rule reports 0.** |
| move engine | 34 specifier rewrites + 1 literal in 24 files, residue [] (but see §7, hole 1) |
| hunks | T1 vitest `include` gains `src/**/__tests__/**`. T2 Playwright `testDir: ".."` plus `testMatch` over both homes. T3 the webkit list. T4 `tsconfig.json` excludes `src/**/__tests__/**` (otherwise 39 errors: vitest globals and test shims). T5 `tsconfig.test.json` excludes `*.visual.ts` (otherwise 23 errors; Playwright specs were never type-checked at HEAD). |
| vitest collection | 239 files at HEAD and 239 after the move |
| Playwright (`--list`) | 1,989 tests in 167 files at HEAD and after the move. Titles are identical modulo path. 23 tests from 4 specs are collected from unit slots. |

**Tension with R-3.** T4 and T5 are exclusion globs. They set program boundaries, not dist membership, but R-3 says "no exclusion list", so a ruling or a program-level design (for example, the test program owns the slot and the library program's `include` names no slot) is owed.

**Visual specs by route.** A visual spec's subject is a demo route, not an import. `visual-routes.mjs` maps route → story → units for the 167 specs at HEAD:
- 5 resolve to one unit;
- 101 resolve to several units;
- 51 name no route;
- 3 name a route with no story;
- 7 reach no unit.

So R-3's visual clause homes at most 9 specs. `tests-visual/` stays a flat harness of 170 files (R-5: 170 > 12), which needs module names that D′ cannot mint.

## 9 · Toolchain on the final tree

The final tree is the carve, plus the R-3 tests move, plus the below moves, replayed from a fresh worktree.

| check | HEAD | final |
|---|---|---|
| `vite build` | exit 0 | exit 0 |
| demo build | exit 0 | exit 0 (demo CSS +4.60 kB, §7 hole 2) |
| vue-tsc (library) | exit 0 | exit 0 |
| vue-tsc (`tsconfig.test.json`) | exit 0 | exit 0 |
| `regen-exports --json` | EXACT, stale [] | EXACT, stale `["composables/search"]` (§4) |
| `npm pack --dry-run` | 841 entries, 1,023,942 B | 840 entries, 1,021,006 B |
| `verify:package` | not run; its ratchet datum 2,916,129 equals HEAD's unpacked size | exit 1 (ratchet shrink); exit 0 after the rebind hunk |
| surface | 603 runtime / 1,279 type | 583 / 1,240 (R-6, §4) |
| vitest | 2,313 passed, 10 expected fail, 1 skipped (2,324) | 21 failed in 14 files, 2,259 passed; 2,291 collected (1 suite uncollected) |
| gate core | 80 | 0 |
| gate with `--bounds --tests` | 320 | 66 (bound only) |
| graph | 1,268 files / 3,773 edges | 1,268 / 3,757 |

## 10 · vitest residue on the final tree, by class

| class | ruling | failures | files |
|---|---|---|---|
| second door dropped from a surface pin | R-6 (MIGRATION rows) | 3 | `public-surface.spec.ts`: `./motion` DAMPING and SNAP_THRESHOLD, `./dock` useDockCtaReceive |
| closed-record roster pins test paths | R-1 (retire with the register) | 4 | `gate-register.test.ts`: 30 `sourcePath` rows moved, and the "8 folded type rows" bite now sees 3 because 5 `.test-d.ts` moved |
| a scanner walks `src/` and reads test files | R-3 (scanners read the graph) | 8 + 2 + 1 uncollected suite | overfit-structure ×2, type-hygiene, dock-name-canon, route-motion, dialog-dismiss, wgsl-splice-contract (counts a `.visual.ts` as a sixth GPU module), gl-excise; sortable-list battery ×2 and easing.contract (EISDIR: `readdirSync` of a unit now meets `__tests__/`; easing's 33 tests go uncollected) |
| a fixture names a moved file | floor #3 | 1 | orphan-css-partial (pins `useScrollScene.ts`) |
| a dist path pinned as a string | S-7 | 1 | typed-track-seam (`./styles/glass/track-flow.css`) |
| **no ruling: move-engine defect** | none | 2 | material-css-syntax (§7 hole 1) |

That totals 21 failures and 1 uncollected suite. Of these, 19 failures and the uncollected suite fall under an existing ruling or floor row. The 2 material-css-syntax failures are a defect in this seat's engine and in F-1, and the cure is named. Before the tests move, the carve alone left 5 failures in 3 files: the R-6 ×3, floor #3 and S-7 rows.

## 11 · Bounds (R-5), replay, demo doors

**Bounds.** HEAD has 68 violations (11 dirs, 57 files); the final tree has 66 (9 dirs, 57 files).
- By zone on the final tree: `src/components` 19, `src/composables` 2, `src/styles` 2, `src/index.ts` 1, demo 10, scripts 8, tests 17, tests-visual 7.
- The tests move clears 3 over-bound test dirs (`tests/components/`, `custom/aurora/`, `custom/dock/`).
- The carve adds 2 violations:
  - `scripts/` at 13 files (§4);
  - `FourierField.smoke.test.ts` at 505 lines, because the re-point writer's 100-column statement shape splits one import.
- `src/index.ts` goes from 584 to 594 lines for the same reason.
- 3 dirs need modules that D′ cannot name: `src/styles/glass/` (24), `src/styles/tokens/` (20) and `aurora/constants/shaders/` (16).

**Replay.** Each replay runs from a fresh HEAD worktree: carve, then placement, then the tests move.
- The same tool version gives byte-identical trees. r1 = r2, with tree hash b04b420a7f0fce60. r3 = r4, with 73843a82b845dae6, after the re-point writer changed between r2 and r3.
- Manifests and test maps are identical across all four runs.
- The merged manifest has 207 moves, 30 hunks and base 5dd68ca9.

**Demo doors (R-10).**
- At HEAD, 90 demo edges import a src file that no entry names, across 60 demo files: 83 value, 6 type, 1 dynamic.
  - 79 of them reach published symbols by a deep path. These are cured by re-pointing to the entry.
  - 11 reach unpublished files: AppShell → `Aurora.vue` (the async boundary), `search/` ×3, `useScrollScene`, `springProjection`, `motionTempo`, blob `MAX_SATS`, procedural `prng`, and `useGlassBackdropLuminance` ×2.
- The final tree has 91. The 11 do not match R-10's count of 7, and the definition used for R-10 needs to be reconciled.

## 12 · Gestalt walk (final tree)

- **dock** (77 files, 24 in `__tests__`).
  - The root has 11 files: 8 SFCs, README, constants and the door.
  - `composables/` (19) gains 7 owner returns (backdrop luminance ×3, useRAFLoop, useYieldToMain, useScrollChrome, isTeleportedTarget) and loses useDockHold. It also gains `composables/search/` (4 files + 3 tests).
  - `styles/` (15) and `styles/controls/` (4) are unchanged.
  - `./motion-core` now publishes useRAFLoop and useYieldToMain from dock. That follows R-2 and is not a reach.
  - The D2 dock redesign will rewrite this unit, so the walk is only a placement check.
- **aurora** (58 files, 19 in `__tests__`).
  - The root holds `Aurora.vue`, DESIGN, README and the door.
  - `composables/` has 17 files, with useScrollProgress added.
  - `constants/` keeps presets and renderMode; budget moved to `glass/webgl/`, where blob reads it too.
  - `constants/shaders/` has 16 files, with curl-fbm glsl/wgsl added. It is over the bound, and the two backends are still not separate dirs.
- **sheet** (8 files).
  - The root holds `SheetContent.vue`, `motion.ts` (the scrim half moved to `_shared/overlay/scrim.ts`), `styles.css` and the door.
  - `detents/` holds projection and use. `__tests__/` holds 2 files.
  - The dialog ↔ sheet cycle is gone: ModalOverlay and the scrim live in `_shared/overlay/`, which both read.
- **deck** (20 files).
  - It is unchanged: root 8, `composables/` 7, `styles/` 5.
  - No test moved in, because `deck/contract.test.ts` reads `@glass/index` whole, so the harness owns it.

## 13 · Convergence estimate and open gaps

**Convergence: 55%.** Pass 1 was at 45%. What moved it up:
- gaps 1-7 are closed and plant-tested;
- the carve and the tests move replay and build;
- the arm is specified and runs;
- the composition class is derived and stable.

What holds it down:
- D′ concedes colocation below the unit, which is the edict's central clause;
- three residue items carry no ruling: the root edge kind, the `@source` arrivals, and the exclusion hunks;
- the gate is not yet wired;
- the policy ledger duplicates the table.

As an enforcement arm composed with a naming route, D′'s own remainder is mechanical, about 70%. As a standalone answer to the edict it does not converge.

**Open gaps.**
1. **Below the unit.** 7 sub-components in 6 units (11 files) need new dirs, and so names. D′ has no naming rule, so a placement route is owed (G's eponymy is the candidate).
2. **Bounds.** 66 violations need modules with names D′ cannot mint (for example `styles/glass/` 24, `styles/tokens/` 20, `aurora/constants/shaders/` 16, `tests-visual/` 170). The kind-slot exemption hides `dock/composables/` at 19 and `aurora/composables/` at 17.
3. **F-1 root edge kind.** `resolve(import.meta.dirname | __dirname, "<rel>")` is invisible, so a move-only file changed resolution and the arm passed (2 vitest failures).
4. **`@source` arrivals.** Test slots enter the demo's Tailwind scan (+4.60 kB demo CSS). This needs a two-way glob residue check and a ruling for `__tests__/` under `@source`.
5. **Exclusion hunks T4 and T5** conflict with R-3's "no exclusion list" and need a ruling or a program design.
6. **The carve owes 3 hunks:**
   - delete `search: "INTERNAL"` in `subpath-policy.mjs`;
   - rebind `.bundle-ratchet` to 2,910,608;
   - place `springProjection.ts` inside a `scripts/` module.
7. **The dir-class ledger** (`subpath-policy.mjs` `COMPONENT_CLASS`/`COMPOSABLE_CLASS`) is a second per-dir declaration next to the rank table (registry gap 17). Either it derives from the table plus the entry map, or one of the two goes.
8. **F-9.** The carve's P block (P1-P3) and `tests-place` call `runGate` / `testHomes`, so the zeros for aggregator readers, dead barrels and `test-home` come from the migration running the gate's own functions. They should be frozen as literal manifest rows (as the `MAP` and `r4-tests-map.json` already are) and judged by an independent run.
9. **The gate is wired to nothing.** It still lives in scratch and needs a tracked home, `npm test` or CI wiring, and one graph builder (registry gap 18).
10. **CSS door purity is not gated.** A rule added to `glass.css` would pass.
11. **No backend arm** (C20 missed; `scripts/` bin-to-bin edges).
12. **R-3 scanner rewrites.** 8 suites read the graph instead of walking `src/`, and easing.contract is uncollected until then (R-3 names this class). The 38 directory-walking unit tests are all in this class.
13. **R-1 and R-6 follow-through.** R-1: the register collapse lands before the migration. R-6: 59 MIGRATION rows, with value.js consuming `BLOB_CONFIG_KEY` from both `./blob` and `./blob-config`.
14. **R-10.** 90 demo door bypasses at HEAD (79 deep paths to published symbols, 11 to unpublished files). This does not reconcile with the ruling's 7.
15. **Name residues.** `slider/useDockHold.ts` still says "Dock", and the `curl-fbm.*` names are derived from the export on a collision.
16. **Runtime.** Playwright was listed (1,989 identical) but not executed; no browser seat was used. π is owed on zero bands, since all four cascades are identical, but the demo CSS delta is unverified in paint.
