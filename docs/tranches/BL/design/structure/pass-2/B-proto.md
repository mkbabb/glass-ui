# D1 pass 2 · B prototype

- **Seat:** PROTOTYPE for route D1-B (sealed modules, flat). Model: `claude-opus-5-5`, asserted from own system identity. Date: 2026-09-24.
- **Base:** replays R4, R5 and R6 ran from fresh worktrees at `34756ec5`; R1 ran at `991067c8`. `git diff --stat 20911dce 34756ec5 -- . ':!docs'` prints 0 lines and the same diff over `docs/tranches/BL/design/structure/floor` prints 0 lines, so every number here measures the code and the floor that SPECS-v2 measured. HEAD has since moved to `21b3824f` (docs only).
- **Inputs read:** `SPECS-v2.md` §0, §1, §2, §5, §6; `RULINGS.md` (R-1..R-10 with the R-2 amendment and X-10); `floor/FLOOR.md` and the floor scripts; `B-research.md` (§5, §6, §10, §11 and Appendix A in full); `REGISTRY.md` §6.4; the pass-1 critique's plant table (`pass-1/D1-B-critique.md` §2).
- **Scratch root:** `P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto`.
  - Tools: `$P/tools/` (the gate is `$P/tools/structure/seal.mjs`, 303 lines, and its wiring `$P/tools/wire/seal.test.ts`)
  - Frozen lists and rows: `$P/frozen/` (13 move lists, 11 rows, `holds.json`, `seal-pin.json`)
  - Outputs: `$P/out/{R1,R4,R5,R6}/`
  - Worktree: `$P/wt`, removed (`git worktree remove --force`, exit 0; `git worktree list` has no B-proto row). This file is the only write in the checkout.
- **Provenance note:** the scratch dir held tools and frozen lists from an earlier run of this seat that stopped before writing a report. I read every tool, re-ran the whole pipeline from fresh worktrees, and made three changes (§7). Every number below comes from the runs listed in §1.

## 0. Verdict: RUNS for B-S0 to B-S6 and B-S17; SPEC-ONLY for B-S7 to B-S16

`migrate.sh` scripts the migration from a fresh HEAD worktree:
1. the floor rows (f3, f4, m02, m03, f9);
2. B's placement law (F-7 over the FD-3 unit set, the FD-1 root-door anchor, authored targets for the one `NEEDS-NAME` and M03) to a fixpoint in 3 passes;
3. the module carve (B §7.1 names);
4. doors, relay cuts and B14 door splits as frozen rows;
5. the CSS carve and CSS doors;
6. the gate landed and wired into `npm test`.

Every move went through the floor engine (157 moves in 13 frozen lists, residue 0 every time). Every content edit is a frozen all-or-nothing row. There are no hand moves. Two fresh replays produce the same tree, and a placement pass over the result applies 0 moves. The toolchain is green, and the surface holds byte for byte. The published cascade is identical under the FD-4 verifier. The floor's own verifier reads RED `content` on exactly the scoped `@keyframes` class that FD-4 names.

**The gate does not pass on the migrated tree.** It is RED at HEAD with 1,902 lines in 15 clauses. On the migrated tree it has 1,497 lines, and 12 of its 16 clauses are RED. B5, B11, B13 and B15 are GREEN. The two biggest clauses are B0 (463) and B2 (778), which are harness-class counts. They wait on FD-6 and R-3, which are not built. §5 gives the ruling or unbuilt step each RED clause waits on.

**Where it stops:**
- B-S7 to B-S16 are not run. These are the `SelectionValue` move, the R-6 rows, the §2.9(a) kernel-entry names, `./aurora-config`, the 16 splits, FD-6, the R-3 test move, the demo R-10 reroute, `scripts/` and `tests-visual/`. Each one needs a ruling or a floor delta that is not built (§6).
- Two B-S4 aggregator moves were attempted and refused. `glass.css → glass/index.css` is refused by F-2's image check. `theme.css → theme/index.css` is refused by the build's package guard. Both dirs therefore stay door-less (§4).

| REGISTRY §6.4 bar | result |
|---|---|
| migration by script from a fresh HEAD worktree, on F-2, no hand moves | **met.** 157 engine moves in 13 frozen lists and 11 frozen rows (328 file edits). The gate's 3 files and its test are copied in at B-S17 |
| replay byte-identical | **met.** R4 and R5 give the same full digest `31bcc83f…b0fe` over 12,456 files and the same code digest `7733d92a…c869` over 1,392 files. R6 (every step applied twice) gives the same digests |
| rerun proposes 0 moves | **met, with one held move.** A placement pass on the migrated tree proposes 1 move, `isTeleportedTarget.ts`, which is the FD-8 hold (§3.2), and applies 0. Every list and row applied a second time writes nothing. The floor rows (`rows/apply.mjs`) cannot be re-run: they throw on the second application (§7) |
| build, typecheck, demo build, pack, regen | **met.** `vite build` 0; `vue-tsc --noEmit` 0; `vue-tsc -p tsconfig.test.json` 0; `demo:dist:build` 0; `npm pack --dry-run` 0; `verify:package` 0 (CLEAN); `entries.mjs check` PASS (exports and typesVersions regenerate byte-equal) |
| 68 export keys, 62 typesVersions byte-identical | **met** |
| 1,279 / 603 names | **met.** `surface.mjs check`: 0 differences. `public-surface.spec.ts` passes 96/96 |
| published cascade identical by the floor verifier, or listed diffs | **met by FD-4; the floor verifier lists one class.** Floor `cascade.mjs verify`: `./styles/fonts` and `./styles/theme` are identical. `./styles` and `./styles.css` are RED `content` with the same rule counts (1,964 and 365), 18 rules differing, and the first divergence is `skeleton-breathe-0d5ebb1f` → `skeleton-breathe-e747def8`. That is the scoped-keyframe suffix. FD-4's verifier (`cascade-fd4.mjs`) is GREEN on 4/4 |
| vitest failures only in ruled classes | **not met.** HEAD: 2,324 tests, 0 failed. Migrated: 2,344 tests, 26 failed, 0 uncollected. 12 failures are the gate's own RED clauses. 14 fall in 7 layout-pinning test files, which are the FD-6 class. FD-6 is a floor delta, not a ruling (§5.3) |
| gate RED at HEAD | **met.** 1,902 lines across 15 clauses |
| gate GREEN on the migrated tree | **not met.** 1,497 lines; 12 clauses RED (§5) |
| gate wired into `npm test` in the worktree | **met.** `tests/gates/seal.test.ts` has one `it` per clause and 16 tests, and is collected by `vitest run` |
| gate catches planted violations | **met.** 24/24 of the seat's plants plus 2 legal probes clean, and 17/17 of the pass-1 critic's plants C-1..C-16 plus C-1b, including the §6.4 B list: C-6, C-1b, C-2 and C-14 (§5.4). The F-9 critic intent battery for pass 2 is not mine to write |
| no shims | **met.** B12 in `src` is 0: no relay, and no file remains at an old path. The 3 B12 lines left are in `scripts/` (B-S15) |
| no door-less sealed dirs | **not met.** B7 has 3: `scripts/lib/` (B-S15 not run), `src/styles/glass/` and `src/styles/theme/` (both refused, §4) |
| no placeholder names | **met.** B15 0. The 3 files B14 extracted take the dir's own name (`alert/alert.ts`, `badge/badge.ts`, `color/color.ts`) |
| 12/500 bounds enforced | **clause enforced, tree not compliant.** B6 strict: 75 at HEAD, 66 migrated. B6 with the exempt slot arm: 69, then 64. `src` dirs over 12: 9, then 0. Files over 500 lines: 57 before and after (§5.2) |
| no component file moved out of its component without a named reason | **met, with one conflict with the spec.** Every placement move carries F-7's reader set (§3.1). `chip/accent-tone.css → src/styles/` comes from F-7 under FD-3, which conflicts with §1.4 ("CSS placement waits on the channel collapse") |
| gestalt walk: dock, aurora, sheet, deck | §8 |
| π and Playwright | **not run.** The chrome-devtools and playwright MCP servers failed to connect. The cascade is identical under FD-4. No route moved, because the demo stage (B-S14) was not run |

## 1. Commands

`F=docs/tranches/BL/design/structure/floor`. Every command ran in `$P/wt`, a detached worktree of HEAD with `node_modules` and `tests-visual/node_modules` symlinked from the checkout (`$P/tools/fresh.sh`).

```sh
# one replay: fresh worktree, HEAD baseline, migration, checks, plants
$P/tools/run-r.sh $P/out/R4 baseline      # 10:46:03 → 10:51:52
#   fresh.sh     git worktree remove --force $P/wt; git worktree add --detach $P/wt HEAD; ln -s … node_modules (×2)
#   baseline.sh  npx vite build; cascade.mjs snapshot --sha <HEAD>; cascade-fd4.mjs snapshot; surface.mjs check;
#                graph.mjs; bounds.mjs --json; seal.mjs --no-pin (installed, measured, removed);
#                seal.mjs --no-pin --slot-arm exempt; npm run demo:dist:build; npx vitest run --reporter=json
#   migrate.sh   rows/apply.mjs; move.mjs <frozen list> for each list; apply-row.mjs <frozen row> for each row;
#                gate landed (scripts/structure/{index,seal}.mjs, seal-pin.json, tests/gates/seal.test.ts); digest.mjs
#   checks.sh    graph.mjs; entries.mjs check; npx vite build; cascade.mjs verify --baseline <H>; cascade-fd4.mjs verify;
#                surface.mjs check; vue-tsc --noEmit; vue-tsc --noEmit -p tsconfig.test.json; npm run demo:dist:build;
#                npm pack --dry-run --json; npm run verify:package; gates.mjs; seal.mjs; seal.mjs --slot-arm exempt;
#                bounds.mjs --json; npx vitest run --reporter=json
#   plants.mjs   the seat's 26 overlays against seal()
$P/tools/rerun.sh $P/out/R4               # a second migrate.sh over the migrated tree (S1 skipped), then place-pass.mjs
$P/tools/run-r.sh $P/out/R5               # a second fresh replay, migration only
$P/tools/fresh.sh && TWICE=1 $P/tools/migrate.sh $P/out/R6   # every list and row applied twice in a row
node $P/tools/crit-plants.mjs . $P/out/R6/crit-plants.json    # pass-1 critic plants C-1..C-16, C-1b
node $P/tools/analyze.mjs $P/out/R4/{seal,bounds,vitest}.json # the breakdowns in §5
git -C /Users/mkbabb/Programming/glass-ui worktree remove --force $P/wt
```

The migration step takes about 2 min (10:47:06 → 10:49:07 in R4), and the checks take about 2 min.

How the frozen lists were made. They were computed once and are replayed as literal JSON (F-9), so a replay never runs a planner:
- `place-pass.mjs` makes the B-S2 passes. It runs `placeAll(g, units, {zones:["src"]})` minus FD-1's anchor set, takes targets from `proposedPath`, and uses 3 authored targets. It calls `runMoves` dry to collect scan deltas, declares them, and applies. A move the image check refuses is held.
- `freeze-apply.mjs` makes the authored carve lists.
- `doorify.mjs`, `unrelay.mjs`, `split-door.mjs`, `css-doors-*.mjs`, `css-group.mjs`, `tokens-door.mjs` and `trim-doors.mjs` make the rows. Each row holds exact before/after text per file, and `apply-row.mjs` refuses a file that holds neither.

## 2. What the migration did, step by step (R4 log)

| step | list or row | engine or row result |
|---|---|---|
| B-S1 | `rows/apply.mjs` | f3-entry-record, f4-terminal-role, m02-overlay-host, m03-roving-move, f9-wire applied |
| B-S2 pass 1 | `S2-pass-1.json`, 22 moves, 86 scan deltas | ok; 65 files edited, 93 rewrites, residue 0, edges 7,138 → 7,138 |
| B-S2 pass 2 | `S2-pass-2.json`, 4 moves | ok; 10 files, 17 rewrites |
| B-S2 pass 3 | `S2-pass-3.json`, 3 moves | ok; 10 files, 10 rewrites |
| B-S2 pass 4 | proposes 1 (held), applies 0 | fixpoint |
| B-S3 | `S3-carve.json`, 63 moves, 384 scan deltas | ok; 95 files, 227 rewrites, residue 0 |
| B-S5 | `S5-doors-1.json` row | 250 files written, 33 doors created (each added to `record.doors`). The second pass (`S5-doors-2.json`) computes nothing |
| B-S6 | `S6-unrelay.json` row | 21 files; 3 relay barrels deleted: `dock/composables/index.ts`, `infinite-scroll/composables/index.ts`, `src/components/index.ts` |
| B14 | `S7-split.json` row | 12 files; the code in `alert/index.ts`, `badge/index.ts` and `composables/color/index.ts` moves to `alert.ts`, `badge.ts` and `color.ts` beside each door |
| B-S4 dock | `S4-dock-css.json` (11 moves) + `S4b-dock-css-doors.json` row | ok; 5 CSS doors or leaves created (`styles/core.css`, `{legibility,search,layers,controls}/index.css`) |
| B-S4 kernel | `S4c-agg-{tokens,typography,utilities}.json` (3 moves), `S4d-tokens-moves.json` (19), `S4e-glass-moves.json` (22), `S4f-styles-moves.json` (8), each with its doors row | ok; 13 `index.css` doors |
| B-S4 tokens entry | `S4i-tokens-entry.json` (1 move) + `S4j-tokens-door.json` row | `tokens.ts → tokens/tokens.ts`; `tokens/index.ts` is the `./tokens` entry source and a pure door |
| B-S4 deck | `S4k-deck-door.json` (1 move) | the deck's CSS door leaves its `styles/` slot (B5) |
| B-S4 components | `S4l-css-doors.json` row | 10 single-rung component `index.css` doors (B3) |
| B11 | `S5b-trim.json` row | 6 doors trimmed of names that nothing outside their module reads |
| B-S17 | gate landed | `scripts/structure/{index.mjs,seal.mjs,seal-pin.json}`, `tests/gates/seal.test.ts` |
| ratchet | `S18-ratchet.json` row | `.bundle-ratchet` 2,916,129 → 2,923,548 (+7,419 B unpacked). A listed diff: 33 new door declarations. `npm pack` unpacked size equals 2,923,548 |

## 3. Placement (B-S2) under R-2 as amended

### 3.1 The 29 moves, with F-7's reason

Pass 1 moved 22 files, pass 2 moved 4 and pass 3 moved 3. Each file's class and reader units come from `placeAll`. The 22 of pass 1 are SPECS §6.2 m4's 22 rows exactly, less `isTeleportedTarget.ts` (held) and plus `useDockHold.ts` and `accent-tone.css`, which the two items below explain.

| from | to | reason |
|---|---|---|
| `aurora/constants/budget.ts` | `src/composables/budget.ts` | global (aurora, blob) |
| `chip/accent-tone.css` | `src/styles/accent-tone.css` | its one loader is `src/styles/glass.css`; under FD-3 `src/styles` is a unit |
| `dialog/ModalOverlay.vue` | `_shared/overlay/ModalOverlay.vue` | global (dialog, sheet); authored target (§1.4); cures M03 |
| `dock/composables/useDockHold.ts` | `slider/useDockHold.ts` | read only by slider; published by no entry, so by X-10 it is placed by its readers |
| `fourier-field/shaders/{compute,render}.wgsl.ts` | `fourier-field/renderer/` | read only by the renderer |
| `composables/dom/useClipboard.ts` | `easing/` | easing |
| `composables/dom/useDocumentVisibility.ts` | `composables/motion/core/` | motion/core |
| `composables/dom/useDragVelocity.ts` | `slider/` | slider |
| `composables/glass/canvas2d/useCanvas2D.ts` | `constellation/composables/` | constellation |
| `composables/glass/useGlassBackdropLuminance.ts` | `dock/composables/` | dock |
| `composables/glass/webgl/createCanvasLifecycle.ts` | `composables/glass/composables/` | LCA of webgl and webgpu |
| `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` | `aurora/constants/shaders/curlNoise.{glsl,wgsl}.ts` | aurora; authored name, because the target `flow.glsl.ts` exists |
| `composables/motion/core/useRAFLoop.ts` | `composables/glass/`, then `dock/composables/` in pass 2 | FD-2 chain |
| `composables/motion/core/useViewTransition.ts` | `composables/motion/route/` | route |
| `composables/motion/morph/useElementMorph.ts` | `composables/motion/composables/` | LCA inside motion |
| `composables/motion/pointer/useRoutePointer.ts` | `constellation/composables/` | constellation |
| `composables/motion/scroll/useScrollChrome.ts` | `dock/composables/` | dock |
| `composables/motion/scroll/useScrollProgress.ts` | `aurora/composables/` | aurora |
| `composables/reactive/useTimer.ts` | `composables/dom/` | dom |
| `composables/search/useFuzzySearch.ts` | `dock/composables/` | dock |
| pass 2: `glass/backdropLuminanceSample.ts`, `search/match.ts` → `dock/`; `useRAFLoop.ts` → `dock/composables/`; `motion/core/useYieldToMain.ts` → `composables/glass/composables/` | | their readers moved in pass 1 |
| pass 3: `glass/backdropSampleMath.ts`, `search/types.ts` → `dock/`; `useYieldToMain.ts` → `dock/composables/` | | the same |

The carve (B-S3) then re-homed the dock files into `dock/search/` and `dock/legibility/` (B §7.1 names).

### 3.2 Findings from placement

1. **FD-2 is breached, not held.** `moduleSccs` over the unit function goes from 12 members to 28 in pass 1. Passes 2 and 3 do not grow it; it is 39 after the carve and 40 at the end. The planner records `grew: true` and does not stop. The cause is §2.9(a) (§5.1, B4).
2. **FD-8 holds one move.** `_shared/overlay/isTeleportedTarget.ts → dock/` is refused by the image check. It lost `demo/demo.css|css-source|…/dock/isTeleportedTarget.ts`, because the `@source ../src/components/_shared/**/*.ts` glob loses the file. It is held in `holds.json` and is the one B10 line on the migrated tree.
3. **`accent-tone.css` conflicts with the spec.** FD-3 makes `src/styles` a unit, so the chip sheet that only `glass.css` loads moves into the style kernel. This cures the upward `glass.css:68` edge that FD-3 names. It also moves CSS by F-7 before the channel collapse, which SPECS §1.4 defers. The spec needs to say which rule wins.
4. **`useDockHold.ts` leaves dock.** SPECS §6.2 m5 has it anchored in dock. RULINGS X-10 (a kind-slot barrel is not a door) places it in slider, and this run follows X-10.
5. `NEEDS-NAME`: 0 emitted. The one collision (`flow.glsl.ts`) takes the authored `curlNoise`.

## 4. Two carve moves refused, with the exact stopping point

| move | refusal | what it needs |
|---|---|---|
| `src/styles/glass.css → src/styles/glass/index.css` | F-2 image check, rolled back: `lost tests/styles/glass-subtlety.test.ts|base-relative|src/styles/glass/grasp.css` and the same for `rim.css`. Edges 7,514 → 7,512 | F-2 rewrites a base-relative path relative to its base, but here the base file moves into the dir the paths name. An F-2 fix, or FD-6 moving the test onto the harness reader |
| `src/styles/theme.css → src/styles/theme/index.css` | F-2 ok (3 files, 6 rewrites). Then `vite build` exits 1 with `G-NO-ORPHAN-EXPORT: exports../styles/theme: package omits ./dist/styles/theme.css`, and `entries.mjs check` fails (exports byte-equal false) | The CSS entry's dist name is derived from its source basename. F-3's record needs a declared output name per CSS entry before a CSS entry source can become a door |

`src/styles/glass/` and `src/styles/theme/` therefore stay door-less (B7).

## 5. The gate on HEAD and on the migrated tree

`seal.mjs` is B's Appendix A, extended to the SPECS-v2 contract:
- FD-1 anchor at root doors only (X-10);
- FD-3's `isSlot`;
- B7 reads `record.doors`;
- B13 bins, B14 door purity, B15 names;
- the pin includes the module set.

It judges resolved files on the floor's F-1 graph and has no comment opt-out.

### 5.1 Counts (strict slot arm; HEAD run without a pin, so B11 at HEAD is the door-name clause only)

| clause | HEAD `34756ec5` | migrated (R4) | what the migrated count is |
|---|---:|---:|---|
| B0 | 474 | 463 | 111 walks + 352 computed-path reads, all in `tests`/`tests-visual`/`scripts`, plus 0 F-1 violations. At HEAD there is 1 F-1 line, which is the gate's own pin path (the pin is absent at HEAD). Harness class: FD-6 and R-3, not built |
| B1 | 382 | 70 | 49 into the `./motion` entry's door, 6 into `motion/core`, 6 into dock, 4 into constellation, 5 others. `doorify` leaves a crossing when the door is a published entry that would grow a name (a surface change, §2.9(a)) |
| B2 | 776 | 778 | tests 660, demo 90, tests-visual 23, scripts 4, root config 1. R-10 reroute (B-S14) and R-3 plus FD-6 |
| B3 | 26 | 14 | `_shared` partials imported by 5 SFCs; `accessibility.css` → 2 `utilities/` leaves; `./styles` entering card, tabs and `_shared` at two rungs. The R-7 channel collapse is not built |
| B4 | 3 | 4 | M03 (sheet ↔ dialog) is **cured**. The `@src` SCC grows from 7 to 14 top-level modules through kernel doors re-exporting unit files (`composables/search/index.ts → dock/search/useFuzzySearch.ts` and the like). The other three are aurora's internal type cycle, `glass ↔ createCanvasLifecycle`, and motion's internal cycle (present at HEAD) |
| B5 | 5 | **0** | |
| B6 | 75 | 66 | 9 dirs, all outside `src` (demo 2, tests 6, tests-visual 1), and 57 files over 500 lines (src 17, tests 19, demo 8, tests-visual 6, scripts 7). The B-S11 splits and B-S13/14/16 are not run |
| B7 | 32 | 3 | `scripts/lib/`, `src/styles/glass/`, `src/styles/theme/` (§4) |
| B8 | 3 | 12 | all 12 are kernel entries re-exporting a file that placement moved into a unit: `dom/index.ts` (useDragVelocity, useClipboard), `glass/canvas2d/index.ts` (useCanvas2D ×2), `motion/core/index.ts` (useScrollProgress, useRAFLoop, useYieldToMain, useRoutePointer, useScrollChrome), `search/index.ts` (3). This is §2.9(a) |
| B9 | 59 | 82 | 40 symbols on two non-root entries (R-6 rows, B-S8) and 42 door re-exports outside the door's subtree. 23 of those are `motion/core/index.ts` (the `./motion-core` entry) re-exporting sibling motion module doors, and 12 are the §2.9(a) lines |
| B10 | 24 | 1 | the FD-8 hold |
| B11 | 13 | **0** | against the frozen pin: 119 modules, 103 doors, 1,303 names |
| B12 | 24 | 3 | all in `scripts/`: `paint-arm.mjs` relays `reflect-capture-verify.mjs` twice, and the `minify-css.d.mts` mirror (B-S15) |
| B13 | 2 | **0** | |
| B14 | 4 | 1 | `src/styles/index.css:307` holds `@source`. The `./styles` aggregate must keep Tailwind's scan directive, so a CSS door needs to allow it or the aggregate needs to be named as exempt (a ruling) |
| B15 | 0 | **0** | |
| total | 1,902 | 1,497 | |

Exempt slot arm: B6 is 69 at HEAD and 64 migrated. Every other clause is equal to the strict arm.

### 5.2 Bounds (`bounds.mjs`, the floor's measure)

| | HEAD | migrated |
|---|---:|---:|
| dirs over 12 | 18 (src 9, demo 2, tests 6, tests-visual 1) | 9 (src 0, demo 2, tests 6, tests-visual 1) |
| files over 500 lines | 57 | 57 |

The carve clears every `src` dir. No split was run.

### 5.3 vitest

HEAD: 2,324 tests, 2,323 passed, 0 failed, 1 skipped, 239 files. Migrated: 2,344 tests, 2,317 passed, 26 failed, 1 skipped, 241 files, 0 uncollected.

| class | tests | files | the failure |
|---|---:|---:|---|
| the gate's own RED clauses | 12 | `tests/gates/seal.test.ts` | B0, B1, B2, B3, B4, B6, B7, B8, B9, B10, B12, B14 (§5.1) |
| layout-pinning source reads (FD-6 class) | 14 | 7 | `sortable-list/battery` 4 (`EISDIR`: `drag` is now a dir); `g-dock-lattice` 4 and `forms-seam` 1 (they assert text of an aggregator the carve turned into a door); `mark-register` 1 and `typed-track-seam` 1 (expected `@import` lines now live in sub-doors); `dissolve` 2 (order-by-index in a file that is now a door); `proportion-register` 1 |

Each of the 14 reads a source file by path or pins its text. R-3 sends these suites through the FD-6 harness reader, which is not built. They are a floor-delta class, not a ruled class. `boot-graph.test.ts` passes 14/14 and `public-surface.spec.ts` passes 96/96.

### 5.4 Plants

- **The seat's battery** (`plants.mjs`, 26 overlays): 24/24 caught, each in its stated clause, and 2 legal probes gain nothing (a member reads a sibling module through its door; the demo reads a published entry by the package name). The C-6 analogue (P11) is caught by B7.
- **The pass-1 critic's plants** (`crit-plants.mjs`), transcribed onto the migrated paths: 17/17 caught. C-1, C-1b, C-2 and C-14 are caught by B8, including the type-only `export type`/`import type` kernel→unit forms. C-3 is caught by B9. C-4 and C-5 are caught by B10. C-6 is caught by B7. C-7, C-12 and C-13 are caught by B6 (the `@generated` comment grants nothing, and tests count). C-8, C-9 and C-16 are caught by B2 (`dynamic-template`, `new-url`, `vi-mock`). C-10 is caught by B8. C-11 is caught by B3. C-15 is caught by B1.
- **Not satisfied: F-9 independence.** B10's zero comes from a migration that ran F-7, the function B10 runs. The lists are frozen, and P15 and C-4 bite it, but the pass-2 critic's own intent battery has not been written.

## 6. SPEC-ONLY steps and where each stops

| step | stopping point |
|---|---|
| B-S7 `SelectionValue` → `motion/morph/` | not run; the B4 motion-internal cycle stays |
| B-S8 R-6 rows | not run; 40 multi-entry symbols against the ruling's 29 (the reconciliation is owed) |
| B-S9 kernel-entry names (§2.9(a)) | not run; the ruling is owed. On this tree the conflict takes a measurable form: the surface holds (0 differences) because kernel entries still re-export moved files, which costs B8 12, 12 B9 lines and the B4 growth. Cutting them moves the names between entries (B §10.4: +36/−25) |
| B-S10 `./aurora-config` | ruling-gated (+1 export key) |
| B-S11 the 16 `src` splits | not run; 17 `src` files over 500 lines |
| B-S12 FD-6 | not on the floor; the 14 vitest failures and the B0 count wait on it |
| B-S13 R-3 test move | not run (needs FD-6, FD-7 and the FD-8 ruling). FD-9's `material-css-syntax.test.ts` was not moved, so which of the two FD-9 outcomes happens is still not measured |
| B-S14 demo | not run; B2 demo 90, and `demo/stories/{containers,foundations}` at 13 each |
| B-S15 `scripts/` | not run; B7 `scripts/lib/`, B12 3, 7 scripts over 500 lines. FD-10 is not built, so there are no R-8 deletions |
| B-S16 tests-visual | not run; 177 direct files |
| B-S4 remainder | `glass.css` and `theme.css` into their modules (§4) |

## 7. Changes this seat made to the tools it found, and floor findings

- `seal.mjs` read its pin with `new URL("./seal-pin.json", import.meta.url)`. Under vitest that made `tests/gates/seal.test.ts` an uncollected suite ("The URL must be of scheme file"; R1: 1 uncollected, 14 failed). The pin is now read from `join(root, "scripts/structure/seal-pin.json")`, a path literal F-1 resolves. After the change the suite collects 16 tests.
- The theme move was added, measured (§4) and removed. The pin that R4–R6 use is the one without it (119 modules).
- `migrate.sh` takes `SKIP_S1=1`, because `rows/apply.mjs` throws on a second application (`row f3-entry-record: vite.library.ts: expected exactly 1 match, found 0`). The floor rows are not idempotent. A whole-chain rerun of `migrate.sh` over the migrated tree is refused at plan by `S2-pass-1.json` ("source and target both absent", because later lists moved those files again), and nothing is written: the code digest is unchanged. Per-step idempotence is R6.
- F-2 leaves one empty dir: `src/components/aurora/constants/` after its files and `shaders/` moved out. Git does not track it, and it does not affect the digest.
- The R1 replay at `991067c8` ran before the seal-pin change and gave code digest `ccaf1050…4043`, equal to the earlier seat run's recorded digest. That is independent evidence that the frozen lists replay.

## 8. Gestalt walk (migrated tree, file lists from R6)

- **dock** (60 files):
  - root: `GlassDock.vue`, `DockSeparator.vue`, `constants.ts`, `index.ts`, `index.css`, `README.md`;
  - `composables/`: `dockContext`, `useDockClickIntegrity`, `useDockRun`, `useDockShellProps`, `useDockSpring`, `useDockState`;
  - `controls/`: 3 SFCs + 5 sheets + doors;
  - `layers/`: 3 SFCs, 2 contexts, 3 sheets, doors;
  - `legibility/`: `useGlassBackdropLuminance`, `backdropLuminanceSample`, `backdropSampleMath`, `useRAFLoop`, `useYieldToMain`, `adaptive-legibility.css`, doors;
  - `morph/`: `useDockMorph`, `dockMorphMeasure`, door;
  - `search/`: `useDockSearch`, `useFuzzySearch`, `match`, `types`, `useScrollChrome`, `search.css`, doors;
  - `styles/`: 9 sheets, including the new `core.css`.

  Every kernel search and legibility file now lives with its one reader. `useScrollChrome.ts` under `search/` is a naming misfit that the carve inherited from B §7.1.
- **aurora** (43 files):
  - root: `Aurora.vue`, `presets.ts`, `renderMode.ts`, `index.ts`, 2 docs;
  - `atoms/`;
  - `composables/`: 11 files, including the placed `useScrollProgress`;
  - `webgl/` with `palette/` (11 shader modules, including `curlNoise.glsl.ts` beside aurora's own `flow.glsl.ts`);
  - `webgpu/` (8, including `curlNoise.wgsl.ts`).

  `constants/` is dissolved. `budget.ts` went global (`src/composables/budget.ts`) because blob reads it.
- **sheet** (8 files): `SheetContent.vue`, `motion.ts`, `styles.css`, `index.ts`, `index.css`, `detents/{projection,use,index}.ts`. `ModalOverlay.vue` now sits in `_shared/overlay/`, so sheet no longer reads into dialog (M03 cured).
- **deck** (20 files): root SFCs, `slideContext`, `types`, `window`, `constants`, doors; `composables/` 7; `styles/` 4. The deck's CSS door left the `styles/` slot (B5).

## 9. Open gaps

1. The gate is GREEN on 4 of 16 clauses. B0, B2 and B6 wait on FD-6, R-3, B-S11 and the other-zone carves. B8, B9 and B4 wait on the §2.9(a) ruling and the R-6 rows. B3 waits on the R-7 channel collapse. B14 needs a ruling on `@source` in the `./styles` aggregate. B7 needs an F-2 fix and a declared CSS output name in F-3 (§4). B12 waits on B-S15.
2. FD-2's "SCCs must not grow" is breached, 12 → 40 members, through §2.9(a). The prototype recorded it and did not stop.
3. `accent-tone.css`: FD-3's placement contradicts SPECS §1.4's deferral of CSS placement.
4. 14 vitest failures in the FD-6 class, which is not a ruled class.
5. The floor rows are not re-runnable. F-2 leaves an emptied parent dir.
6. The F-9 critic intent battery is owed.
7. π and Playwright were not run (no browser seat).
