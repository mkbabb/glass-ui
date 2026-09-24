# D1 pass 3 · the floor build (P3-F1..P3-F9)

Seat: FLOOR, model claude-opus-5-5. I built each item once, into the floor, by editing the scripts under `floor/` in place. `floor/FLOOR.md` is the reference for the updated floor. Everything this report counts is under `docs/tranches/BL/design/structure/`:

- the floor itself
- `pass-3/plants/` (the two batteries, the move lists and `results.txt`, which holds every recorded command and output)
- `pass-3/tools/` (`fresh.sh`, `baseline.sh`, `scc-per-move.mjs`)

Every plant was run twice at commit a54b64d6. The before arm uses that commit's own floor and rows. The after arm uses a54b64d6 plus this floor, cut by its chain. The baseline was run on HEAD 2b72324a from a fresh worktree.

## Result

| battery | before (HEAD floor) | after (P3 floor) |
|---|---|---|
| `p3-graph-plants.mjs` (18 in-memory plants) | 1/18 (the legal probe, which must hold on both) | 18/18 |
| `p3-tree-plants.sh` (12 tree plants) | 0/12 | 12/12 |
| pass 2's `graph-plants.mjs` (59) | 59/59 | 59/59 (C01 flipped to `self-name-in-src`) |

## Items

Each row gives the item, what was built, and its plants (the before result, then the after result). Every command and its output are in `plants/results.txt`.

| item | built | plants: before → after |
|---|---|---|
| **P3-F1** FD-1, P3-R1 | `lib/placement.mjs` has a parameter, `anchor`. `publicationAnchor(graph)` treats as doors the entry sources plus the declared doors that entries reach through re-export edges. A door anchors the files it exports by origin inside its own dir, and the innermost door wins. An entry CSS source anchors its `@import` closure. A door in a container or a slot anchors nothing (X-10). There is a new class, `anchored`. `placement.mjs` takes `--anchor publication\|none`. | F1-a Skeleton: `move → data-table` → `anchored → skeleton`. F1-b useTimer: `move → dom` → `anchored → reactive`. F1-c useDockHold (slot barrel) and F1-d useFuzzySearch (unreached door) still move, with 37 anchored rows, against 0 before. |
| **P3-F2** FD-2 | `sccGrowth` in `lib/move.mjs` counts co-cyclic module pairs over R-2 units, before and after, with old names mapped through the move map. A move that adds a pair is refused at preflight on the image graph, before anything is written; the image check tests it again after the write. It is a stop. `fixpoint.mjs` runs placement and the engine to a fixpoint and stops on FD-2. | F2: the coupling list exits 0 → refused at preflight, `FD-2 CO-CYCLIC (new) src/components/aurora/constants ↔ src/composables/glass/webgl`. |
| **P3-F3** self-name | A `src` module or CSS `@import` that uses `@mkbabb/glass-ui/…` raises the violation `self-name-in-src` and is never an edge. The demo, tests and scripts keep the legal self-name (R-10). | F3-a Chip→Badge: edge → violation. F3-b CSS: no violation → violation. F3-legal: edge on both floors. |
| **P3-F4** census | The census row `computed-read` carries a `base`, for all three forms (I32, I32b, I32c). `process.cwd()` evaluates as rooted. A join whose opaque argument has a string head extends the prefix. Found by the F5d plant: a function whose parameter heads a zone-rooted literal (`resolve(root, "src/styles/theme.css")`) is no longer read as a path helper that swallows the literal. | F4-a/b/c: no census row → `computed-read@src/components`. F4-d: no edge → `path-literal → src/styles/theme.css`. |
| **P3-F5** F-2 rewrites, pruning, CSS dist names | Rewrites and image check:<br>• The image check and the rewrites treat the three text-anchored kinds as one (`kindClass`).<br>• A one-segment rewrite is spelled `./name`.<br>• A cwd-rooted join is rewritten.<br>• Pruning goes deepest first and re-queues parents.<br>CSS dist names:<br>• The record's CSS entries carry `dist`, and the guard raises `css-dist-undeclared` and `css-dist-twice`.<br>• When the dist name and the mirror differ, the build writes the declared name as a one-line `@import` of the mirror. | F5a glass door: image LOST 2 → applied, glass-subtlety 36/36. F5b cwd join: residue 1 → applied, 4/4. F5c prune: `_shared` left empty → pruned. F5d theme door: build "Invalid package artifact" and entries exit 1 → build, entries, `dist/styles/theme.css`, cascade GREEN, pin 0 differences. |
| **P3-F6** idempotent rows | `rows/lib.mjs`: an op already applied reports `applied`. A row whose ops are all applied is a no-op, and a partly applied row throws. `apply.mjs` runs the chain (m03 with the tree's own move engine) and prints the tree digest. | F6 replay: throws (`f3: 0 matches`) → no-op, with the same digest `70d37498faaa…` on both runs. |
| **P3-F7** FD-3, FD-4, FD-5 | FD-3 (P3-R2): `isSlot(dir)` is the one slot predicate, used by `dirUnits` and `bounds.mjs`. FD-4: inside `cascade.mjs`, `scopedKeyframes` renames `name-<8hex>` keyframes to `name-#N` along with every use. FD-5: `lib/classify.mjs` and `classify.mjs` classify each changed file as move-only, re-point, vi-mock or authored; anything else is `UNCLASSIFIED`. | F7-a accent-tone.css: `ok → src` → `move → src/styles`. F7-b: two predicates → one. F7b keyframes: re-hash RED → GREEN, while a rename stays RED (`content`). F7c: no classifier → the pure move is PASS (8 move-only), and the smuggled `.zz-smuggled` rule makes the moved sheet the one UNCLASSIFIED file. |
| **P3-F8** FD-6, FD-7, FD-10, FD-11 | FD-6: row `fd6-harness`, where `tests/harness/source.ts` walks files only and skips `__tests__/`.<br>FD-7: row `fd7-programs`:<br>• the declaration program (`declarationProgram`) replaces `tsconfig.build.json`<br>• vitest collects `src/**/__tests__/*.test.ts`<br>• `demo.css` gets `@source not "../src/**/__tests__"`<br>• F-1 reads program patterns (an empty match is legal; the head dir must exist) and subtracts `@source not`.<br>FD-10: a `ci` zone. `yaml-command` and `yaml-npm-script` edges are resolved against the scripts in `package.json`.<br>FD-11: row `fd11-land` moves the floor runtime to `scripts/structure/` and re-points its 8 readers. It deletes `scripts/import-dag.mjs` and that script's 2 ledger rows. | F8-b: `ledger-stale ×2` → 0 violations. F8-b2: css-source edge → none. F8-c/c2/c3 (CI): nothing → a violation or a reader. Tree: F8a EISDIR 2 failed → 63/63, with `__tests__` in 116 src dirs. F8b: not collected, graph exit 1 → collected 1/1, graph 0, not in dist, vue-tsc 0. F8d: 7 readers name `docs/` → 0; `floor.test` 4/4 from `scripts/structure`. |
| **P3-F9** F-10 | `browser.mjs` is one serialized seat for π and Playwright:<br>• A machine lock admits one run; others wait, a stale lock is taken over, and a run refuses after `--wait`.<br>• The seat starts vite on its own free port.<br>• `--moved` adds band specs, and the π pixel floor always runs.<br>• The verdict comes from the JSON report. The planted arm goes through `pi-gate-verify --expect=planted-red`. | F9: two raw Playwright runs overlapped (A 38 s, B began 3 s in) → B took the seat 0.7 s after A released it; both GREEN. |

## Baseline (HEAD 2b72324a, `pass-3/tools/baseline.sh`)

- **Before landing.**
  - Graph at the docs home: 7,338 edges, 0 violations, 538 census.
  - Plants: 59/59 and 18/18.
  - Chain: 8 rows, tree digest `1a0cc579a274…`. The replay is a no-op with the same digest.
- **Landed** (`scripts/structure`).
  - Graph: 7,264 edges, 0 violations.
  - Placement (publication anchor): 36 anchored, 14 move, 2 global, 15 proposed, 1 NEEDS-NAME.
  - Placement (`--anchor none`): 40 move, 12 global, 47 proposed, 5 NEEDS-NAME.
  - Bounds: 18 dirs over 12 files, 56 files over 500 lines.
- **Fixpoint --dry.** Pass 1 proposes 15 moves and stops on FD-2: 169 added pairs (members 14→24).
  - Per move: useScrollChrome 70, useRoutePointer 45, useScrollProgress 34, isTeleportedTarget 3, createCanvasLifecycle 3, useDockHold 1, useFuzzySearch 1.
  - The 8 other moves add 0.
- **Build and gates.**
  - Build 0. Gates: 4 PASS (F-1, F-3 byte-equal, F-4 contract, pin 0 differences).
  - entries, cascade contract, snapshot and self-verify all 0.
- **vitest.** 3 failed, 2,314 passed, 10 expected fail, 1 skipped (2,328 tests).
  - The 3 failures are the boot-graph build arm, which needs `dist-demo`. The script runs vitest before the demo build.
  - After `demo:dist:build`, boot-graph is 14/14. That was run in a chained a54b64d6 tree, not on HEAD.
- **Other checks.**
  - typecheck (both programs): 0. Demo build: 0.
  - **verify:package is RED:** `G-BUNDLE-RATCHET shrink 2910618 < 2916129` (−5,511 B).
  - browser seat: GREEN, 3/3.

## Open gaps

1. **The bundle ratchet (P3-R9) is owed a ruling.** FD-7 stops emitting 4 unreachable `.d.ts` (−5,637 B), and m02 and m03 add 126 B, so verify:package is RED by 5,511 B. No rebind row was written.
2. **FD-2 refuses placement pass 1.** Three hook moves (useScrollChrome, useRoutePointer, useScrollProgress) add 149 of the 169 pairs. A route decides them; the floor only stops.
3. **Masking fallback in tracked source.** `vite.utility-emit.ts:85-86` returns silently when `src/styles/theme.css` is missing. The graph now makes a move rewrite that path, but the fallback itself breaks the owner's edict. A route row should make it throw.
4. **Band selection is by file name.** `browser.mjs` selects bands by file-name tokens, so a spec whose name does not carry its unit runs only when named.
5. **Playwright `testDir` is not modeled.** F-1 does not read it, so a spec moved out of `tests-visual/` is not caught by the graph.
6. **Other directory walkers.** FD-6 converted easing.contract and the sortable-list battery. Other test walkers over `src/` are safe only while no `__tests__/` slot sits under what they walk; a route that adds one runs its tests.
7. **Colocated tests import vitest explicitly.** The lib program has no vitest globals.
8. **Scan-delta declarations differ by arm.** The before and after move lists carry different declarations (`*.before.json`) because the HEAD tree still has `scripts/import-dag.mjs` as a scanner.
9. **The CSS dist name is a design choice to confirm.** The declared name is written as a one-line `@import` of the mirror, so `dist/styles/theme.css` is `@import "./theme/index.css";`.
10. **The baseline vitest ran before the demo build,** so its 3 boot-graph failures are an ordering artefact. It was not re-run on HEAD after the demo build.
