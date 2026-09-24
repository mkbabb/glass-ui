# D1 pass 2 · D′ prototype

- **Seat:** PROTOTYPE for route D1-D-prime (D′). Model: `claude-opus-5-5`.
- **Base:** two replays, R1 and R2, each from a fresh worktree at `5b536c72`. HEAD has since moved to `20c567d2`. `git diff --name-only 5b536c72 20c567d2` lists 0 files outside `docs/`. `f57a3c1f..20c567d2` lists 0 outside `docs/` and 0 under the floor dir. The HEAD vitest baseline ran at `f57a3c1f`, so it applies to both.
- **Inputs read:** `SPECS-v2.md` (D′ §3 and the shared §1), `FLOOR.md` with the floor scripts, `Dp-research.md`, `RULINGS.md` R-1..R-10, and X-10.
- **Scratch root:** `P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/Dp-proto`.
  - Tools: `$P/v2/tools/`
  - Outputs: `$P/v2/out/{R1,R2}/`
  - Worktree: `$P/wt`, removed after this report.

## 0. Verdict: RUNS

`migrate.sh` scripts the whole migration from a fresh HEAD worktree, in this order:
1. Floor rows.
2. D′'s placement law run to a fixpoint through the floor's move engine (F-2), with door rows each pass.
3. Declaration splits.
4. FD-7 programs.
5. The R-3 test move.
6. The gate wired into `npm test`.
7. The ratchet rebind.

I placed no file by hand: every move came from the law. The two replays produce byte-identical trees, and a rerun of the law proposes nothing. The toolchain is green, and the surface pin and the published cascade hold.

**The gate does not pass on the migrated tree.** It reports 133 violations in six clauses. Vitest has 19 failed tests and 1 uncollected suite. §6 and §7 list every item with the ruling or unbuilt step it waits on.

**Where it stops.** The law ran to its fixpoint. The rest needs one of two things:
- a ruling: FD-8, R-8, the R-6 owner, R-5 names, or door-impure-css names;
- a step no route has built: FD-5, FD-6, the R-10 reroute, or FD-11.

| REGISTRY §6.4 bar | result |
|---|---|
| idempotent replay | **met.** R1 = R2: full digest `ab9e3346…c106` over 12,382 files, code digest `4d373000…2991` over 1,360 files, and every plan and row JSON identical. A rerun proposes 0 placement moves, 0 test moves and 0 door rows |
| build, typecheck, demo build, pack, regen | **met.** Build exit 0; `vue-tsc` exit 0 for the lib, test and src programs; demo build 0; `npm pack --dry-run` 0; `verify:package` CLEAN; `entries.mjs check` PASS (the record regenerates exports and typesVersions byte-equal) |
| 68 export keys, 62 typesVersions byte-identical | **met** |
| 1,279 declaration names, 603 runtime names | **met**, 0 differences (`surface.mjs check`) |
| published cascade identical by the floor verifier | **met.** The floor's own `cascade.mjs verify` against the plain `f57a3c1f` baseline is GREEN on 4/4 entries, and the FD-4 verifier against `5b536c72` is also GREEN 4/4 |
| vitest failures only in ruled classes | **partly met.** 13 failed tests and the 1 uncollected suite fall in R-1 and R-3 (FD-6 unbuilt) classes. The other 6 are the D′ gate's own RED clauses (§5, §7) |
| gate RED at HEAD | **met**: 331 violations |
| gate GREEN on the migrated tree | **not met**: 133 violations (§7) |
| gate wired into `npm test` in the worktree | **met.** `tests/gates/structure-dp.test.ts`, one `it` per clause (16), collected by `vitest run` |
| gate catches planted violations | **met.** 50 plants: 46 caught, 4 legal probes pass, 0 missed, 0 false positives |
| no shims | **met.** No file remains at an old path. Six changed sources are pure re-export files, and every one is a declared door: `alert/index.ts`, `badge/index.ts`, `color/index.ts`, `dom/index.ts`, `motion/core/index.ts`, `reactive/index.ts` |
| no door-less sealed dirs | **met.** There are 3 new dirs. `src/composables/glass/composables/` and `src/composables/motion/composables/` are FD-3 kind slots in units whose root doors exist. `scripts/structure/` is in the scripts zone |
| no placeholder names | **met.** The 5 new names are derived: `curl-fbm.glsl.ts` and `curl-fbm.wgsl.ts` come from the export; `color.ts`, `badge.ts` and `alert.ts` come from the unit leaf. The 2 NEEDS-NAME moves were not emitted |
| 12/500 bounds enforced | **clause enforced, tree not compliant.** `bound` fails with 75 at HEAD and 75 on the migrated tree (§8) |

## 1. Commands

Every number below comes from these commands. Paths are relative to `$P`.

```sh
# a fresh worktree: remove, then add at HEAD; symlink node_modules and tests-visual/node_modules
v2/tools/fresh.sh

# the replay. R1 ran without checkpoints (about 3.5 min); R2 ran with them (4 min 42 s)
v2/tools/migrate.sh v2/out/R1
CHECKPOINTS=1 v2/tools/migrate.sh v2/out/R2
#   migrate.sh runs, in order:
#   H      npx vite build; cascade-fd4.mjs snapshot --sha <HEAD>; count dist .d.ts;
#          npm run demo:dist:build; demo-css.mjs snapshot; run-gate.mjs --json; floor/bounds.mjs --json
#   D-S1   node floor/rows/apply.mjs --root wt                      (f3, f4, m02, m03, f9)
#   D-S2..S7  fixpoint.sh wt out place
#          one pass = plan-dp.mjs, floor/move.mjs, rows-dp.mjs, then sccs.mjs and sccs-grow.mjs;
#          repeat until 0 moves
#   D-S8   split-dp.mjs --root wt; rows-dp.mjs --root wt
#   FD-7   fd7-row.mjs --root wt
#   D-S10  fixpoint.sh wt out tests --tests; r3-after.mjs tests-plan-1.json --root wt
#   D-S12  wire-dp.mjs --root wt; npx vite build; ratchet-row.mjs --root wt
#   rerun  plan-dp.mjs; plan-dp.mjs --tests; rows-dp.mjs --dry; digest.mjs wt

# the toolchain on the migrated tree (each step's exit code is recorded)
v2/tools/checks.sh wt v2/out/R1/chk v2/out/R1/baseline-5b536c72
#   checks.sh runs: floor/graph.mjs --quiet; floor/entries.mjs check; npx vite build;
#   cascade-fd4.mjs verify; floor/surface.mjs check; npx vue-tsc --noEmit;
#   npx vue-tsc --noEmit -p tsconfig.test.json; npm run demo:dist:build;
#   npm pack --dry-run --json; npm run verify:package; floor/gates.mjs;
#   npx vitest run --reporter=json
npx vue-tsc --noEmit -p tsconfig.src.json                        # v2/out/R2/tsc-src.log
npx vitest run --reporter=json --outputFile=v2/out/R1/chk/vitest2.json   # rerun at lower load
node v2/tools/vsum.mjs <vitest.json> wt

# the plain floor verifier (no FD-4), run on the migrated tree for this report
npx vite build
node floor/cascade.mjs verify --baseline v2/out/baseline-plain-f57a3c1f --dist wt/dist

# gate, plants, bounds, R-10, demo CSS, visual listing
node v2/tools/run-gate.mjs --root wt --json v2/out/R1/M-gate.json
node v2/tools/plants.mjs --root wt > v2/out/R1/M-plants.txt
node floor/bounds.mjs --root wt --json v2/out/R1/M-bounds.json
node v2/tools/r10.mjs wt > v2/out/R1/M-r10.json
node v2/tools/demo-css.mjs snapshot --root wt --out v2/out/R1/M-demo-css.json
node v2/tools/demo-css.mjs compare v2/out/R1/H-demo-css.json v2/out/R1/M-demo-css.json
(cd wt/tests-visual && npx playwright test --list) > v2/out/R1/pw-list-after.txt

# M-D2 (a planted cascade change): edit chip/accent-tone.css, then build, cascade-fd4 verify
# and vitest; restore; build; verify
```

`floor/` is `wt/docs/tranches/BL/design/structure/floor/`.

### Tools

Tool sources live in `$P/v2/tools/`. The prefix is the first 12 hex digits of the file's sha256. The installed `scripts/structure/{dp-law.mjs,gate-dp.mjs,rank-table.json}` are byte-identical to the scratch files the migration ran.

| file | lines | sha256 | role |
|---|---:|---|---|
| `dp-law.mjs` | 365 | `a5b3b8853743` | The law. The floor is injected. <ul><li>rank table ops</li><li>FD-3 `isSlot` and units</li><li>FD-1 root-door anchor (X-10)</li><li>computed anchors</li><li>placement (F-7)</li><li>the R-3 home rule</li><li>`programFiles` (FD-7)</li><li>`runGate` with 16 clauses</li></ul> |
| `gate-dp.mjs` | 31 | `12275f614d7c` | The CLI. Reads `scripts/structure/rank-table.json`; exits 1 on any violation |
| `rank-table.json` | 13 | `3015d06eeef3` | The 11 rows `[prefix, stratum, grain]` |
| `plan-dp.mjs` | 117 | `f7456cd18c30` | One pass of the law, written as a literal move list. Clauses: <ul><li>owned</li><li>direction</li><li>cross-zone</li><li>`--tests`</li></ul> It also handles derived names, FD-8 notes, F-2 residue drop, and scan-delta declarations |
| `rows-dp.mjs` | 239 | `cf500c8b243b` | Door rows run to a fixpoint: <ul><li>trim</li><li>re-point trimmed-name readers</li><li>re-point aggregate readers and reaches</li><li>own-door</li><li>vi-mock re-aim</li><li>dead-barrel delete plus the `record.doors` edit</li></ul> |
| `split-dp.mjs` | 110 | `f6f19adb3caa` | Declaration split `<dir>/<leaf>.ts`, with text-reader re-points and explicit `@source` lines |
| `fd7-row.mjs` | 50 | `c93f82660411` | FD-7 programs and the vitest include (drops 5 ledger rows) |
| `r3-after.mjs` | 36 | `df16c329ecfc` | `tsconfig.test.json` by suffix; Playwright collects both homes |
| `wire-dp.mjs` | 53 | `75934cccb9ef` | Installs the gate and `tests/gates/structure-dp.test.ts` |
| `ratchet-row.mjs` | 22 | `71168903adf7` | The `.bundle-ratchet` rebind to the measured unpacked size |
| `sccs.mjs`, `sccs-grow.mjs` | 27, 12 | `5ae5d0101d17`, `f9537ab70745` | FD-2 families and the no-growth check |
| `cascade-fd4.mjs`, `kf.mjs` | 52, 9 | `3c96d689d513`, `7203d30d1722` | F-4 with the FD-4 scoped-keyframes normaliser |
| `demo-css.mjs` | 33 | `0d7edbdf9604` | Demo CSS as a multiset of normalised per-file shas |
| `plants.mjs` | 106 | `03a3ef56c5ee` | 50 in-memory overlay plants on F-1 |
| `r10.mjs`, `digest.mjs`, `vsum.mjs`, `run-gate.mjs`, `floor.mjs` | 15, 10, 12, 24, 10 | — | Measures, digests and loaders |
| `migrate.sh`, `fixpoint.sh`, `checks.sh`, `fresh.sh` | 62, 25, 23, 10 | `0d1d575afe8a`, `df63504d9cd0`, `5fb8ec744e3b`, `a5fd02b3a623` | Drivers |

**The rank table:**

| prefix | stratum | grain |
|---|---|---|
| `src/styles/`, `src/fonts/`, `src/html-attributes.d.ts` | foundation | self:foundation |
| `src/composables/` | primitives | child |
| `src/composables/glass/{webgl,webgpu,canvas2d,procedural}/` and `src/composables/motion/pointer/` | substrate | self |
| `src/components/_shared/` | patterns | child |
| `src/components/` | components | child |

Anchors are computed, never listed. On the migrated tree there are 10:
- `src/index.ts`;
- the 7 CSS entries and import-only foundation sheets;
- 2 aggregators: `composables/dom/index.ts` and `composables/motion/core/index.ts`.

## 2. HEAD baselines

| measure | value |
|---|---|
| vitest (`f57a3c1f`, code-identical) | 239 files, 2,324 tests: 2,323 passed, 1 skipped, 0 failed |
| F-1 | 7,171 edges, 0 violations |
| build | exit 0, 7.4 s |
| dist `.d.ts` files | 556 |
| cascade baseline | `./styles` 1,964 rules (5 scoped-keyframe hashes, 18 renames under FD-4); `./styles/fonts` 4; `./styles/theme` 4; `./styles.css` 365 |
| demo CSS | 65 files, 426,348 B, 3,172 rules |
| Playwright `--list` | 1,989 tests in 167 files |
| gate | RED, 331 (table below) |

| clause | HEAD | what it names |
|---|---:|---|
| upward | 5 | <ul><li>`_shared/overlay/participation.ts:14` → dock</li><li>`glass/index.ts:30,32` → webgpu and canvas2d</li><li>`motion/morph/useSelectionGroup.ts:12` → `_shared/selection` (type)</li><li>`useSelectionGroup.ts:20` → tabs</li></ul> |
| cycle | 1 | dialog ↔ sheet |
| door-impure | 3 | `color/index.ts` (11 names), `badge/index.ts` (3), `alert/index.ts` (2) |
| door-impure-css | 3 | `dock/styles/controls.css`, `dock/styles/index.css`, `src/styles/accessibility.css` |
| placement | 37 | F-7 `move` and `global` rows after the FD-1 anchor, plus dead and dead-barrel |
| dual-door | 40 | R-6 |
| bound | 75 | 18 dirs, 57 files |
| test-home | 163 | R-3 |
| bin | 2 | `flatten-subpath-types.mjs:13` and `regen-exports.mjs:46` import the bin `subpath-policy.mjs` |
| programs | 2 | `tsconfig.json` and `tsconfig.build.json` name no `files` |

## 3. Steps and measured results

### D-S1: floor rows

`rows/apply.mjs` ran:

| row | what it did |
|---|---|
| f3 | 9 files. `subpath-policy.mjs` and `regen-exports.mjs` deleted, which cures `bin` 2 → 0 |
| f4 | 2 files |
| m02 | 3 files. Cures the `_shared/overlay` → dock upward edge |
| m03 | 1 move (`useTabRovingFocus.ts` to `composables/motion/morph/`): 4 files, 4 rewrites, 6 scan deltas declared, image lost 0 and gained 0 |
| f9 | 1 file (`tests/gates/floor.test.ts`, 4 tests) |

### D-S2..S7: the placement fixpoint (FD-2)

| pass | moves | files edited | rewrites | scan deltas declared by the engine | image lost/gained | residue |
|---:|---:|---:|---:|---:|---|---:|
| 1 | 21 | 64 | 92 | 80 | 0/0 (7,138 edges) | 0 |
| 2 | 6 | 14 | 22 | 18 | 0/0 (7,108) | 0 |
| 3 | 3 | 10 | 10 | 9 | 0/0 (7,106) | 0 |
| 4 | 0 | — | — | — | — | — |

**Pass 1 rewrites by kind:** import 63, reexport 11, reexport-star 9, import-type 5, vi-mock 1, path-literal 2, path-helper 1.

**Door rows inside each pass** (`rows-dp.mjs`):

| placement pass | edits | files | trimmed | dead barrels deleted |
|---:|---:|---:|---|---|
| 1 | 26 | 18 | `dock/composables/index.ts` 3, `glass/canvas2d/index.ts` 5, `glass/index.ts` 8, `search/index.ts` 2 | `src/components/index.ts`, then (inner pass 2) `glass/canvas2d/index.ts` |
| 2 | 2 | 1 | `search/index.ts` 5 | — |
| 3 | 4 | 4 | `search/index.ts` 3 | (inner pass 2) `composables/search/index.ts` |

**The 30 law moves.** `src/` is omitted.

| pass | clause | from → to |
|---:|---|---|
| 1 | owned:global | `components/aurora/constants/budget.ts` → `composables/budget.ts` |
| 1 | owned:global | `components/dialog/ModalOverlay.vue` → `components/_shared/ModalOverlay.vue` |
| 1 | owned:move | `components/dock/composables/useDockHold.ts` → `components/slider/useDockHold.ts` (X-10) |
| 1 | owned:move | `components/fourier-field/shaders/{compute,render}.wgsl.ts` → `components/fourier-field/renderer/` |
| 1 | owned:move | `composables/dom/useClipboard.ts` → `components/easing/useClipboard.ts` |
| 1 | owned:move | `composables/dom/useDocumentVisibility.ts` → `composables/motion/core/useDocumentVisibility.ts` |
| 1 | owned:move | `composables/dom/useDragVelocity.ts` → `components/slider/useDragVelocity.ts` |
| 1 | owned:move | `composables/glass/canvas2d/useCanvas2D.ts` → `components/constellation/composables/useCanvas2D.ts` |
| 1 | owned:move | `composables/glass/useGlassBackdropLuminance.ts` → `components/dock/composables/` |
| 1 | owned:move | `composables/glass/webgl/createCanvasLifecycle.ts` → `composables/glass/composables/createCanvasLifecycle.ts` |
| 1 | owned:move | `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` → `components/aurora/constants/shaders/curl-fbm.{glsl,wgsl}.ts` (derived names) |
| 1 | owned:move | `composables/motion/core/useRAFLoop.ts` → `composables/glass/useRAFLoop.ts` |
| 1 | owned:move | `composables/motion/core/useViewTransition.ts` → `composables/motion/route/` |
| 1 | owned:move | `composables/motion/morph/useElementMorph.ts` → `composables/motion/composables/useElementMorph.ts` |
| 1 | owned:move | `composables/motion/pointer/useRoutePointer.ts` → `components/constellation/composables/` |
| 1 | owned:move | `composables/motion/scroll/useScrollChrome.ts` → `components/dock/composables/` |
| 1 | owned:move | `composables/motion/scroll/useScrollProgress.ts` → `components/aurora/composables/` |
| 1 | owned:move | `composables/reactive/useTimer.ts` → `composables/dom/useTimer.ts` |
| 1 | owned:move | `composables/search/useFuzzySearch.ts` → `components/dock/composables/` |
| 2 | owned:move | `composables/glass/backdropLuminanceSample.ts` → `components/dock/` |
| 2 | owned:move | `composables/glass/useRAFLoop.ts` → `components/dock/composables/` |
| 2 | direction:move | `composables/glass/webgl/{backingSize,visibility}.ts` → `composables/glass/` |
| 2 | owned:move | `composables/motion/core/useYieldToMain.ts` → `composables/glass/composables/` |
| 2 | owned:move | `composables/search/match.ts` → `components/dock/match.ts` |
| 3 | owned:move | `composables/glass/backdropSampleMath.ts` → `components/dock/` |
| 3 | owned:move | `composables/glass/composables/useYieldToMain.ts` → `components/dock/composables/` |
| 3 | owned:move | `composables/search/types.ts` → `components/dock/types.ts` |

**Stops the law notes and does not emit.** They are identical in passes 1 through 4.

| stop | file | proposed target | why |
|---|---|---|---|
| FD-8 | `_shared/overlay/isTeleportedTarget.ts` | `components/dock/` | Leaves `demo/demo.css:106 @source ../src/components/_shared/**/*.ts` |
| FD-8 | `_shared/selection.ts` | `composables/motion/morph/` | Same glob |
| FD-8 | `composables/motion/scroll/useScrollScene.ts` | `demo/stories/motion/` (the cross-zone rule) | Joins `demo/demo.css:83 @source ../demo` |
| R-8 | `composables/motion/spring/springProjection.ts` | — | Its readers are in demo, scripts and tests: `demo/stories/motion/springs.vue:14`, `scripts/regen-spring-tokens.mjs:27` and two tests. F-7 is zone-local (floor gap 9) |

**FD-2 families** (`sccs.mjs` before the first pass and after the last). The per-pass check (`dpStatic`, `dpRuntime`, `fileValue`) never grew.

| family | before | after placement | after the test move |
|---|---|---|---|
| dpStatic (D′ table units) | 1 SCC / 2 members | 0/0 (dialog ↔ sheet cured in pass 2) | 0/0 |
| dpRuntime | 1/2 | 0/0 | 0/0 |
| fileValue | 2/4 (Alert.vue ↔ alert/index.ts, Badge.vue ↔ badge/index.ts) | 2/4 | 0/0 (cured by the S8 split) |
| dirStatic, dirRuntime (R-2 recursive units) | 2/5 | 2/5 | 2/5 |

The dirStatic count holds at 2/5, but the members change:
- **Before:** `fourier-field ↔ fourier-field/renderer ↔ fourier-field/shaders` and `dialog ↔ sheet`.
- **After:** `fourier-field ↔ fourier-field/renderer`, plus a new `composables/motion ↔ motion/morph ↔ motion/reveal`.

The new cycle is a direct result of the law. `motion/index.ts:32,47,55` re-exports `morph/useDragMorph.ts`, `reveal/useLiquidReveal.ts` and `morph/useDockCtaReceive.ts`. Those three import `useElementMorph.ts`, which F-7 homed at their nearest common ancestor. That ancestor is `motion`'s own kind slot `composables/`, so the slot shares a unit with the door that re-exports its readers (§9 gap 12).

### D-S8: declaration splits and own-door rows

| door | new file | statements moved | imports carried | text readers re-pointed | scans gained |
|---|---|---:|---:|---|---|
| `composables/color/index.ts` | `color.ts` | 13 | 2 | — | — |
| `components/badge/index.ts` | `badge.ts` | 7 | 1 | `mark-register.test.ts:43` | `demo/demo.css:120` + `@source "../src/components/badge/badge.ts"` |
| `components/alert/index.ts` | `alert.ts` | 5 | 1 | `radius-role-canon.test.ts:466`, `typography.test.ts:64` | `demo/demo.css:120` + `@source "../src/components/alert/alert.ts"` |

- 0 stops.
- `rows-dp` own-door: 2 edits in 2 files. `Alert.vue` and `Badge.vue` now read their origin, not their unit's door.
- The R-6 door trims are **not** executed (§6, gap 5).
- Checkpoint after S8 (vitest): 240 files, 2,328 tests, 2,327 passed, 0 failed.

### FD-7: entry-rooted programs (before the test move)

`fd7-row.mjs` makes the following changes:

| file | change |
|---|---|
| `tsconfig.build.json` | `files` holds 64 program files (the record's JS sources plus the ambient `src/**/*.d.ts`), with `include: []`; the three exclude globs are gone |
| `tsconfig.json` | the same `files` plus `include ["demo/"]` |
| `tsconfig.src.json` | `include: []` |
| vitest include | `["{tests,src}/**/*.{test,spec}.{ts,tsx}"]` |
| ledger | 5 empty-glob rows dropped |

- Checkpoint after FD-7: 240 files, 2,328 tests, 2,327 passed, 0 failed.
- Under FD-7, the 3 src files no entry reaches emit no declaration: `_shared/index.ts`, `useScrollScene.ts` and `springProjection.ts`. The 3 deleted barrels and the 3 split files net to 0. So dist has 553 `.d.ts` files against 556 at HEAD, and `verify:package` stays CLEAN.

### D-S10: the R-3 test move

- **Pass 1:** 157 moves, 25 files edited, 36 rewrites (import 30, path-literal 6; via relative 30, anchored 5, root-relative 1).
  - 19 dirs moved whole, 23 dirs pruned.
  - 5 scan deltas declared, 0 undeclared.
  - Image 6,992 → 6,992 edges, lost 0 and gained 0; residue 0.
- **Pass 2:** 0 moves. FD-2 at the end: every family ≤ before; fileValue 0/0.
- **Result:** 65 `__tests__` slots holding 157 files. The largest are `dock/__tests__` with 24 and `aurora/__tests__` with 17.
- **FD-9 holds:** `material-css-syntax`'s `import.meta.dirname` + `"../.."` was rewritten to `"../../../.."` and passes.
- **`r3-after.mjs`:**
  - `tsconfig.test.json` include becomes `["tests/", "src/**/__tests__/*.test.ts", "src/**/__tests__/*.test-d.ts", "tests/shims.d.ts"]`.
  - Playwright gets `testDir ".."` and testMatch `["tests-visual/*.spec.ts", "src/**/__tests__/*.visual.ts"]`, and the webkit subset is re-pointed.
  - `playwright test --list` shows 1,989 tests in 167 files before and after, with titles identical up to path.
- **Not moved (11):**

| reason | count | tests |
|---|---:|---|
| FD-8: the target joins `demo/demo.css:106 @source ../src/components/_shared/**/*.ts` | 7 | <ul><li>`classNames`</li><li>`menu/rowClass`</li><li>`public-contracts.test-d`</li><li>`valueDomain`</li><li>`useMotionAxis`</li><li>`radius-dialog-bind`</li><li>`cn`</li></ul> |
| NEEDS-NAME: two tests claim the same target `src/composables/dom/__tests__/useTokenColor.test.ts` | 2 | `tests/composables/dom/useTokenColor.test.ts`, `tests/composables/useTokenColor.test.ts` |
| F-2 residue, `unrewritable-path` | 2 | `overlay-plate-available-height.test.ts:30` and `slider-cursor-affordance.test.ts:30`, both `join(process.cwd(), X)` (cwd-anchored) |

The spec projected 171 tests into 74 slots on D′'s scratch graph. This run's law proposed 168: 157 moved and 11 stopped. I have not itemized the 3-test difference.

### D-S12: the gate wired, and the ratchet

- **`wire-dp.mjs`** writes 4 files:
  - `scripts/structure/dp-law.mjs`
  - `scripts/structure/gate-dp.mjs`
  - `scripts/structure/rank-table.json`
  - `tests/gates/structure-dp.test.ts`

  `npm test` is `vitest run`, and the vitest include collects the new test.
- **`ratchet-row.mjs`:** `.bundle-ratchet` goes from 2,916,129 to 2,909,469 (−6,660 B unpacked). The spec's projection was 2,910,608. The row's wording is mine, and the spec asks for owner wording (gap 16).
- **Rerun on the result:** plan 0 moves, tests 0 moves, and `rows-dp --dry` reports 0 edits in 0 files, 0 dead barrels, 0 stops.

## 4. The toolchain on the migrated tree

| check | exit | result |
|---|---:|---|
| `floor/graph.mjs` | 0 | 7,356 edges, 0 violations; `srcValueSccs` [] |
| `floor/entries.mjs check` | 0 | 63 JS entries → 68 export keys, 62 typesVersions, both byte-equal; 11 declared doors |
| `npx vite build` | 0 | — |
| cascade, FD-4 vs `5b536c72` | 0 | GREEN, 4/4 identical |
| cascade, the floor's plain `cascade.mjs verify` vs `f57a3c1f` | 0 | GREEN, 4/4 identical |
| `floor/surface.mjs check` | 0 | exportKeys 68, typesVersions 62, jsEntries 63, runtime 603, type 1,279; 0 differences |
| `vue-tsc --noEmit` (lib) | 0 | — |
| `vue-tsc -p tsconfig.test.json` | 0 | — |
| `vue-tsc -p tsconfig.src.json` | 0 | — |
| `npm run demo:dist:build` | 0 | demo CSS IDENTICAL to HEAD (65 files, same normalised sha multiset) |
| `npm pack --dry-run --json` | 0 | 837 entries, 1,020,857 B packed, 2,909,469 B unpacked, 0 test files packed |
| `npm run verify:package` | 0 | CLEAN: claims 193, declarations 451, css 124, roster 289/289 (after the ratchet row) |
| `floor/gates.mjs` | 0 | 4/4 PASS: F-1, F-3, F-4 contract, F-9 surface pin |
| vitest | 1 | §5 |

## 5. Vitest on the migrated tree

**First run** (load average about 121): 241 files, 2,311 tests, 2,291 passed, 19 failed, 1 skipped, with 3 suites uncollected. Two of those suites hit hook timeouts: `dock/__tests__/GlassDock.stagger` and `slider/__tests__/slider.size-tokens`. Alone they pass 12/12, and they pass in the rerun.

**Rerun (`vitest2.json`):** 241 files, 2,311 tests, 2,291 passed, 19 failed, 1 skipped, and 1 uncollected suite. The count reconciles as 2,328 at the FD-7 checkpoint, minus the 33 tests of the uncollected `easing.contract`, plus the gate's 16.

| class | ruling | failed tests | where |
|---|---|---:|---|
| `gate-register`'s closed-record roster pins test paths | R-1 (retire with the register) | 4 | <ul><li>`spring.projection.byte-sync: sourcePath missing` (×1)</li><li>the same ENOENT in two BITE arms (×2)</li><li>"dropping `tests/` REDs all EIGHT folded type rows": 4 of the 8 now live in `src/**/__tests__/` (×1)</li></ul> |
| scanners that walk or name `src` and test paths | R-3, FD-6 unbuilt (D-S9) | 9 | <ul><li>`overfit-structure` ×2</li><li>`dock-name-canon`</li><li>`route-motion`</li><li>`dialog-dismiss`</li><li>`wgsl-splice-contract`</li><li>`sortable-list/battery` ×2 (EISDIR)</li><li>`gl-excise`</li></ul> |
| uncollected suite `easing.contract.test.ts` (EISDIR) | R-3, FD-6 unbuilt | 1 suite (33 tests) | — |
| `structure-dp.test.ts`: the D′ gate's own RED clauses | — | 6 | <ul><li>upward</li><li>door-impure-css</li><li>placement</li><li>dual-door</li><li>bound</li><li>test-home</li></ul> See §7 |

## 6. Rulings and the parts left unbuilt

- **R-6 (dual-door, 40 keys).** Not executed. A trim changes the per-entry name sets the surface pin holds, and 20 of the 40 keys have no owner the law can derive. For the other 20, the owner is derivable:

  | owner | keys | basis |
  |---|---:|---|
  | motion-core | 3 | nearest source dir |
  | motion | 4 | over dock |
  | axes | 1 | the source is the origin |
  | color | 4 | over aurora |
  | fourier-math | 8 | the source is the origin |

  The 20 keys shared by blob and blob-config are UNDECIDED. The ruling says 29, the spec measured 40 at HEAD, and this tree also reads 40.
- **R-10 (demo doors).** Not executed (D-S11). There are 90 bypasses in 60 files, both at HEAD and on the migrated tree: 80 to published symbols and 10 to unpublished files. Two of the 10 are `dock/composables/useFuzzySearch.ts` and `dock/types.ts`, read by `demo/stories/data/search.vue:14-15`. `_shared/index.ts` is a record door that only the demo reads.
- **R-8.** `springProjection.ts` needs a cross-zone ruling (above). It is a `placement: dead` row.
- **FD-8.** 3 placement moves and 7 test moves are refused, all at `demo/demo.css` `@source` globs. The ruling is owed.
- **FD-6.** Unbuilt, which accounts for 9 failed tests and 1 uncollected suite.
- **FD-5.** Unbuilt (§9, gap 22).
- **FD-11.** Unbuilt. The installed `gate-dp.mjs` imports the floor from `docs/tranches/BL/design/structure/floor/lib/`.
- **The spec's authored rows.** The law does not produce these, and no hand moves were made:
  - `ModalOverlay.vue` goes to `_shared/overlay/` in the spec; the law puts it at `_shared/ModalOverlay.vue`, as the spec's own `proposedPath` predicts (§1.4).
  - `budget.ts` goes to `composables/glass/webgl/` in the spec; the law puts it at `composables/budget.ts`, R-4's global grain.
  - `_shared/interaction.ts` goes to `composables/motion/morph/` in the spec; the law does not propose it.
  - `tabs/styles/drag.css` goes to `src/styles/glass/` in the spec; the law does not propose it.
  - The scrim split row is not produced.
  - D-S6's CSS returns (the 5 `styles/glass/*.css` sheets and `chip/accent-tone.css`) are not produced.

  The gate flags none of these files.
- **X-10 against the spec.** SPECS-v2 D-S5 and §6.2 keep `useDockHold.ts` in dock. The task's X-10 rules that the anchor is the root door only, so the law moved it to `slider/`, and the name residue `slider/useDockHold.ts` ("Dock" in a slider file) exists on this tree.

## 7. The gate on the migrated tree: RED, 133

| clause | HEAD | migrated | residue and cause |
|---|---:|---:|---|
| unresolved, self-name, unzoned, table, cycle, door-impure, door-reads-door, below-direction, bin, programs | 0, 0, 0, 0, 1, 3, 0, 0, 2, 2 | 0 each | cured by m02/m03, placement, splits, f3 and FD-7 |
| upward | 5 | 1 | `motion/morph/useSelectionGroup.ts:12` [import-type] → `_shared/selection.ts`, whose move FD-8 refused |
| door-impure-css | 3 | 3 | `dock/styles/controls.css` (1 `@layer` rule), `dock/styles/index.css` (7 rules: `@property` ×3 and more), `src/styles/accessibility.css` (1 `@layer`). The split needs a new file name; D′ derives none for CSS |
| placement | 37 | 3 | `isTeleportedTarget.ts` (owned: move → dock; FD-8), `useScrollScene.ts` (dead; FD-8), `springProjection.ts` (dead; R-8) |
| dual-door | 40 | 40 | R-6 not executed |
| bound | 75 | 75 | 18 dirs and 57 files (§8) |
| test-home | 163 | 11 | FD-8 ×7, NEEDS-NAME ×2, F-2 residue ×2 |

## 8. Bounds (R-5, strict)

`floor/bounds.mjs` reports 18 dirs over 12 and 57 files over 500 lines, at HEAD and on the migrated tree alike.

**Dirs, HEAD → migrated:**

| dir | HEAD | migrated |
|---|---:|---:|
| `tests-visual` | 177 | 172 |
| `tests/components` | 43 | 14 |
| `src/styles/glass` | 28 | 28 |
| `tests/styles` | 28 | 25 |
| `src/styles/tokens` | 20 | 20 |
| `src/styles` | 19 | 19 |
| `tests/demo` | 17 | 13 |
| `aurora/composables` (slot) | 16 | 17 |
| `menu` | 16 | 16 |
| `tests/components/custom/dock` | 16 | gone |
| `dock/styles` (slot) | 15 | 15 |
| `aurora/constants/shaders` | 14 | 16 |
| `tests/components/custom/aurora` | 14 | gone |
| `tests/composables` | 14 | gone |
| `demo/stories/containers` | 13 | 13 |
| `demo/stories/foundations` | 13 | 13 |
| `dock/composables` (slot) | 13 | 17 |
| `sortable-list` | 13 | 13 |
| `dock/__tests__` (slot) | new | 24 |
| `aurora/__tests__` (slot) | new | 17 |
| `dock` root | new over | 15 |

The law's placement pushes the `dock` root over the bound, from 11 to 15 direct files. The additions are `match.ts`, `types.ts`, `backdropLuminanceSample.ts` and `backdropSampleMath.ts`.

**Files over 500 lines, by zone:**

| zone | HEAD | migrated |
|---|---:|---:|
| src | 17 | 21 |
| demo | 8 | 8 |
| tests | 19 | 15 |
| tests-visual | 6 | 6 |
| scripts | 7 | 7 |

The set of files is the same. The src and tests counts differ only because four tests moved: `constellationField`, `darkModeSyncScript`, `useWebGPUCanvas` and `music-staff.geometry`.

**The exempt-slot reading** (slots not counted): 72 at HEAD and 70 on the migrated tree. The slots over the bound are 3 at HEAD and 5 migrated.

## 9. Plants and M-D2

**`plants.mjs` on the migrated tree** (in-memory overlays on F-1). R1 and the debug tree give the same results. The run took 177,813 ms.

- **Base:** upward 1, door-impure-css 3, placement 3, dual-door 40, bound 75, test-home 11.
- **Tally:** 50 plants, 46 caught, 4 legal as intended (C09, C13, C23, C25), 0 missed, 0 false positives, 0 setup errors.

**What each plant family covers:**
- **C01-C27:**
  - self-name
  - globs and `new URL`
  - `@source`
  - dead modules
  - the `./motion-core` aggregator loop
  - `_shared` single readers
  - a lower barrel
  - an `import()` type node
  - `export *` in a door
  - template-literal `import()`
  - `/src/` URLs
  - a CSS `@import` cycle
  - C20, a bin importing a bin
  - a dead unit
  - C22, a 700-line module
  - C24, a table row with a reason
  - a `.vue` in `_shared`
  - a harness test with one subject
- **P01-P12:**
  - M02 back, as P01
  - a component reading `./dom`
  - a helper reach
  - a composition cycle through doors
  - a package self-import
  - `vi.doUnmock` of a missing path
  - a non-literal dynamic import
  - an aggregator implementation
  - an R-6 second door
  - an empty table row
  - an owner return undone
  - a primitive reading a pattern
- **N01-N06, for the clauses this prototype added:**
  - N01, a rule planted in the import-only `glass.css` (door-impure-css)
  - N02, an exclusion list back in the library program (programs)
  - N03, a kind slot reading its own unit's SFC (below-direction)
  - N04, a colocated test in the wrong slot (test-home)
  - N05, a declaration returning to a split door (door-impure)
  - N06, a moved file's twin returning (placement)

**Not run:** the regression batteries "D′'s 44" and "the floor's 59" (spec §3.5), as separate suites. The critic's own battery (F-9) is the critic's to write.

**M-D2** (`chip/accent-tone.css`, `--accent-band-strength` 18% → 22%):
- The cascade goes RED, class `content`, first divergence at rule 141 of `./styles`.
- Vitest does not catch it. Its one new failure is boot-graph staleness.
- After the restore and a rebuild, the cascade is GREEN.
- The structure gate does not catch M-D2, and was not meant to. The spec says M-D2 is caught through FD-5, a per-file diff classifier for structure steps, and this prototype does not build FD-5 (gap 22). The catch here comes from F-4's cascade verifier.

## 10. Gestalt walk (HEAD → migrated)

| unit | files at HEAD | files migrated | changes |
|---|---:|---:|---|
| dock | 43 | 75 | <ul><li>root gains `backdropLuminanceSample.ts`, `backdropSampleMath.ts`, `match.ts`, `types.ts` (`composables/search/` dissolved into the root)</li><li>`composables/` 13 → 17 (`useFuzzySearch`, `useGlassBackdropLuminance`, `useRAFLoop`, `useScrollChrome`, `useYieldToMain` in; `useDockHold` out)</li><li>`__tests__/` 24</li></ul> |
| aurora | 37 | 58 | <ul><li>`composables/` 17 (`useScrollProgress` in)</li><li>`constants/shaders/` 16 (`curl-fbm.{glsl,wgsl}.ts` in)</li><li>`constants/` 3 → 2 (`budget.ts` out)</li><li>`__tests__/` 17, plus `constants/__tests__` and `constants/shaders/__tests__`</li></ul> |
| sheet | 6 | 7 | `ModalOverlay.vue` gone to `_shared/`. Its sheet tests are homed in `dialog/__tests__` by the component tie-break (the unit that reaches the others) |
| deck | 20 | 20 | unchanged |

- **New dirs:** `scripts/structure/`, `src/composables/glass/composables/` and `src/composables/motion/composables/`.
- **Worktree git status:** 191 D, 80 M, 101 untracked entries (372 status lines). `git diff --stat HEAD -- src`: 82 files, +133 −6,013. The deletions are moves, which show as delete plus untracked add.

## 11. Open gaps

1. **FD-8 ruling owed.** 3 placement moves and 7 test moves are refused at `demo/demo.css:83` and `:106` `@source` globs, which leaves `upward` 1, `placement` 2 and `test-home` 7.
2. **R-8 ruling owed** for `springProjection.ts`: its readers are only in demo, scripts and tests. It leaves `placement` 1.
3. **door-impure-css.** The 3 CSS files need a split name that D′ does not mint (`controls.css`, `dock/styles/index.css`, `accessibility.css`).
4. **R-5 bounds** are 18 dirs and 57 files, unchanged by D′. Breaking them into modules needs authored names. The law pushes the `dock` root to 15 and three slots to 16-24.
5. **R-6 not executed.** 40 dual-door keys remain; 20 have a derivable owner and 20 blob/blob-config keys are undecided. It is a surface break that needs the ruling's count reconciled (29 against 40).
6. **R-10 not executed.** 90 demo bypasses in 60 files.
7. **FD-6 unbuilt.** 9 scanner failures and 1 uncollected suite (`easing.contract`, EISDIR).
8. **R-1 not landed.** `gate-register` fails 4 tests, because its roster pins test paths.
9. **F-2 defect.** A cwd-anchored `join(process.cwd(), X)` path literal is `unrewritable-path`, so 2 test moves are dropped as residue.
10. **F-1 blind spot.** F-1 does not model Playwright `testDir`/`testMatch` (0 edges), so `playwright test --list` is the only witness for the visual program.
11. **NEEDS-NAME.** The `useTokenColor` test pair claims one target.
12. **Motion dir cycle** (dirStatic): `composables/motion ↔ motion/morph ↔ motion/reveal`. F-7 homes `useElementMorph.ts` in the parent's kind slot, whose unit also holds the door that re-exports the readers.
13. **Stutter slots.** `src/composables/glass/composables/` holds `createCanvasLifecycle.ts`, and `src/composables/motion/composables/` holds `useElementMorph.ts`. R-4's `<module>/composables/` inside the `src/composables/` zone reads `composables/…/composables/`.
14. **Sheet tests homed in `dialog/__tests__`** by the tie-break, after `ModalOverlay` left dialog.
15. **The `useDockHold` name residue** in `slider/` (X-10). `search/` is dissolved into the dock root, so R-2's "search" sub-unit is gone.
16. **Spec-authored targets not reproduced** by the law: `ModalOverlay` → `_shared/overlay/`, `budget` → `glass/webgl/`, `interaction.ts`, `tabs/styles/drag.css`, the scrim split, and D-S6's CSS returns. Either they become literal manifest rows or D′ drops them.
17. **`.bundle-ratchet` wording.** The number is measured (2,909,469), but the wording is not the owner's.
18. **FD-11 unbuilt.** The installed gate imports the floor from `docs/`.
19. **The difference from the spec's test-move count** (171 into 74 slots, against 168 proposed here) is not itemized.
20. **No browser π run.** D-S6 owes π for any CSS move, and this tree moves no CSS source. The only paint-relevant evidence is that the cascade and demo CSS are identical.
21. **Machine load.** Load averages reached 121 during the runs. Two hook timeouts in the first vitest run cleared on the rerun.
22. **FD-5 unbuilt.** No per-file classifier sorts each changed file into move-only, re-point, `vi.mock` re-aim or an authored hunk. The nearest checks in this run each cover part of the job:
    - F-2's image check (edges lost and gained);
    - the rows' exact-text edits;
    - `rows-dp`'s resolution-preserving law;
    - the cascade verifier.

## 12. Fences kept

- The only edits, moves and builds ran in `$P/wt`, a linked worktree added at HEAD. `node_modules` and `tests-visual/node_modules` are symlinked there.
- The main checkout received one write: this report.
- Git writes were limited to `worktree add` and `worktree remove --force`.
- `~/.claude` was not read, and no sibling repo was touched.
