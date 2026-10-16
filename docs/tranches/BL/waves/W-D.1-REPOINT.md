# W-D.1 re-point, round 1: change list

| field | value |
|---|---|
| seat | W-D.1 re-point seat, round 1 (BL formation) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `37adcf822`; `git diff 6154d6ec HEAD -- . ':!docs'` prints nothing |
| source of record | `design/structure/REGISTRY.md` §P13-6 (the D1 convergence record), §P13-5 (P9-G6, P11-G3, P13-G1) |
| machine | every run through `~/.claude/guard/guarded`. The first heavy launch waited 30 min on the process ceiling (1,597 processes held by other sessions) and was stopped; the runs went as `--light --rss-gb 8` (13:29-13:37 ET, load 17-21). No browser. Nothing left running; the three worktrees were removed |

## Measurements (worktrees under `.claude/worktrees/bl/formation/wd1-repoint1/`, removed)

| tree | reading |
|---|---|
| `head` (HEAD) | appendix A (VALUE-SCC over `src` and `scripts`): `VALUE-SCC 4` (the three `src` SCCs and `[2] scripts, scripts/lib`), `CROSS-JS 11`, `CROSS-CSS 18`, `DEAD-BARREL 1`, `ALIAS-TYPE 6`, exit 1 |
| `base` at HEAD, built | one-door 41 names (20/8/4/4/3/2), one-name `Surface` 1, D1-G7 exit 1, D1-G8 exit 1 (three scripts present), floor gates: module not found, `seal.test.ts` absent, floor `bounds.mjs` 18 / 58, doors 76 files 152,920 B |
| `base` cut to the floor base | `floor/rows/apply.mjs` nine rows, code digest `6773b4ec…` over 1,354 files (= D1 §P13-6.1); floor gates 4 PASS (F-9 0 differences); `bounds.mjs` 18 / 55; cascade snapshot and self-verify exit 0, the four sequences identical to `K13`'s committed baseline; `K13`'s gate staged with an empty pin: exit 2, `Cannot find module …/scripts/structure/lib/index.mjs` |
| `wt` (converged chain) | `K13/replay.mjs`: 325.9 s, `code digest 6fdd4ec7bd259630… over 1587 files; chain final MATCH`; rerun "the chain is applied", 0.5 s. Built (`npm run build` 0). Seal CLI exit 0, B0-B18 0, 1,585 files, 8,350 edges, 142/142; `seal.test.ts` 26/26; floor gates 4 PASS; appendix A `VALUE-SCC 0`, `CROSS-JS 0`, `CROSS-CSS 0`, `DEAD-BARREL 0`, `ALIAS-TYPE 5`; the kit's `src`-only probe `VALUE-SCC 0`; one-door 1 (`./axes + ./surface`); one-name 1 (`Surface`); `bounds.mjs` 0 / 0; D1-G7 exit 1; D1-G8 exit 0; cascade verify against the floor base exit 1 plain (`RED: content changed` at the Timeline rule), exit 0 with `--reorders K13/authored/p6-listed-reorders.json` (`unlistedRules 0`, `staleRules 0`, SCOPE Timeline → TimelineMarks 40); `tools/wd1/measure.mjs` equal to `K13/results/p13/wd1-measure.txt` below its load line (0 / 1 / 5 / cured / 3); `tools/wc2/chain-text.mjs` GREEN; `MIGRATION.md:8` `## 11.0.0`; doors 164 files 137,285 B |

## Changes

`waves/W-D.1.md`:

1. Header: HEAD `37adcf822`; the measuring worktrees and the converged replay replace the `wt2` pass-4 replay and digest `472cf493…`. Short cites: `K13` added, `LAW §n` → `pass-13/B-kit/LAW.md`, `REBASE:n` removed (C-1).
2. §0: "State at this seat" and the five-item list removed. The gate is met by D1 §P13-6; the kit, chain (126 steps, `6fdd4ec7…`), floor base (`6773b4ec…`), S70 datum (2,920,386), battery (two clean critiques with their hashes) and rulings (§P13-6.2) are cited from the record. The P13-G1 qualifier (`peer-closure` reads `SEQUENCE.json` under `--floor-base` only) is stated where the wave names the kit's judges (C-1, C-3, C-5).
3. §1 F-59: B4 judges every module-grain value SCC, parent↔child included (P9-R1); the value-SCC count over `src` and `scripts` (C-2).
4. §2: the seal bullet reads `K13`'s gate (exit 2 on the floor base); value cycles over `src` and `scripts` (4 at HEAD); the loop-tree paragraph is the converged tree's reading.
5. §3: step 1 replays `K13` (`replay.mjs --twice`; re-record with `K13/record-step.mjs` when the base code is not 10.1.0's); step 2 names S1's nine rows and the floor base; step 3 nineteen clauses, the eight seal files, 26 tests; step 4 cites P9-R1 and the base rule's `fourier-field/math.ts` move. §0 items 2 and 3 fold into step 5 and item 5 into step 7, with their converged-tree file:line readings and the consumer evidence (C-3). Step 6 names `src/styles/glass/accent-tone.css`; step 7 names `src/styles/tokens/tokens.ts`; step 8 reads 164 files, 137,285 B on `wt`; step 9 reads bounds 0 / 0.
6. §4: 1,587 files (D1 §P13-6.1); the version bump; the preset's converged path; MIGRATION rows join the chain's `## 11.0.0`; FLOOR.md's recipe (P11-G3) (C-5).
7. §5: the second column is the converged tree; every HEAD and converged cell re-read in this seat's worktrees (C-4). D1-G1 passes at 19 of 19. D1-G3's VALUE-SCC reads `src` and `scripts` (C-2). D1-G6 takes `mkdir -p .cache` (in a fresh worktree the gate's own command exits 1 on the missing directory). D1-G9 snapshots the floor base and verifies with `--reorders <kit>/authored/p6-listed-reorders.json` (the converged route's one listed reorder; without it the converged tree reads RED). D1-G10's converged cell reads `chain-text.mjs`.
8. §6: the cascade obligation names the listed reorder.
9. §7: the chain's rows under `## 11.0.0` are described (the published names, the one-symbol-one-entry rows, the `./aurora-config` entry, read on `wt`); the table keeps the wave's own rows only.
10. §8: the D1 gate rests on D1 §P13-6.2's rulings.
11. Appendix A: VALUE-SCC reads edges in `src` and `scripts` (C-2). CROSS-JS and CROSS-CSS accept any module door inside the unit (an `index.ts`/`index.css` not under a kind slot), LAW §5's "Sub-doors of an entry": on `wt` the unit-root-only arm counts `src/components/slider/useDockHold.ts:4 -> src/components/dock/context/index.ts`, a sub-door crossing the seal's B1 admits. The HEAD reading is unchanged (11 / 18). Outputs re-run on `head` and `wt`.
12. Appendices B and C: "route B's tree" → the converged tree; outputs re-read.

`design/structure/floor/FLOOR.md` line 9-10: the `tests-visual/node_modules` link is removed from the worktree recipe; the root workspace hoists `@playwright/test` and `pngjs` into `node_modules` (P11-G3, C-5).

`waves/INDEX.md` W-D.1 row: unchanged. It reads `| W-D.1 | D | F-55, F-56, F-57, F-58, F-59 | W-COLOCATION and the placement seal | D1 |` and cites no kit, digest or tree; P9-G6's "INDEX.md:47 cites the pass-4 kit and digest" does not hold on disk (C-1 holds without an edit).

## C-6 (read-only)

W-D.2 §3 item 9 (B10 takes `demo` on the seal W-D.1 lands), W-C.1 item 4 (D1's kits move to `scripts/loops/structure/` and go with W-D.1), W-L.8 G-L8-14 and W-D.2:21 (the chain deletes `canon-doc.mjs` and moves `paint-arm.mjs` and `reflect-capture-verify.mjs` to `tests-visual/paint/`, both read on `wt`) agree with the re-pointed text. W-C.2 does not cite W-D.1. W-D.2's own base still names the pass-4 kit (`LAW §n` → `pass-4/B-kit/LAW.md`) and `wt2` readings (digest `472cf493…`, header line 7; §2 line 62; D2-G2's last cell); that is W-D.2's re-point, outside this seat's files.

# W-D.1 re-point, round 2: change list

| field | value |
|---|---|
| seat | W-D.1 re-point seat, round 2 (BL formation), curing `W-D.1-CRITIQUE-1.md` (C-4, C-6 refuted) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `3e8f99f9b`; `git diff 6154d6ec HEAD -- . ':!docs'` prints nothing |
| machine | every run through `~/.claude/guard/guarded`. The heavy replay launch waited from 14:47 ET at 1,599-1,624 processes and was stopped before it started anything; the runs went as `--light --rss-gb 8` (they too queued on headroom). No browser. Nothing left running; both worktrees removed |

## Measurements (worktrees under `.claude/worktrees/bl/formation/wd1-repoint2/`, removed)

| tree | reading |
|---|---|
| `base` at HEAD | appendix A over `floor/lib/graph.mjs`: `VALUE-SCC 4` (incl. `[2] scripts, scripts/lib`), `CROSS-JS 11`, `CROSS-CSS 18`, `DEAD-BARREL 1`, `ALIAS-TYPE 6`, exit 1; `scripts/import-dag.mjs`: `module SCCs full 3 · value 3`; `scripts/structure` and `tests/gates/seal.test.ts` absent; build 0; one-door 41 (20/8/4/4/3/2) exit 1; one-name `Surface` exit 1; D1-G7 exit 1; D1-G8 exit 1; floor `bounds.mjs` 18 / 58; doors 76 files, 152,920 B |
| `base` cut to the floor base | `floor/rows/apply.mjs` nine rows; `codeDigest` `6773b4ec1217ab41…` over 1,354 files; gates 4 PASS (F-1 7,435 edges, F-3 68 keys, F-9 pinned equal); `bounds.mjs` 18 / 55; cascade snapshot exit 0, self-verify exit 0, four entries identical (1,970 / 4 / 4 / 365); four `.seq` byte-equal to `K13/results/p13/cascade/baseline/`; `K13`'s gate staged: `seal: no verdict: … Cannot find module …/scripts/structure/lib/index.mjs`, exit 2; demo placement `"move": 40` |
| `wt`, chain replayed | `K13/replay.mjs --twice`: 400.7 s, `code digest 6fdd4ec7bd259630… over 1587 files; chain final MATCH`; rerun 0.3 s, "the chain is applied"; `SEQUENCE.json` 126 steps, S1 … S70. Build 0; seal CLI exit 0, B0-B18 each 0, 1,585 files, 8,350 edges, 142/142; `seal.test.ts` (`--maxWorkers=2`) 26 passed; gates 4 PASS (F-1 8,350 edges, F-3 69 keys); appendix A over `scripts/structure/lib/graph/index.mjs` (VALUE-SCC over `src` and `scripts`): `VALUE-SCC 0`, `CROSS-JS 0`, `CROSS-CSS 0`, `DEAD-BARREL 0`, `ALIAS-TYPE 5`, exit 1; one-door 1 (`./axes + ./surface`); one-name `Surface`; D1-G6 `0 0` exit 0; D1-G7 exit 1; D1-G8 exit 0; D1-G9 plain exit 1 `RED: content changed`; with `--reorders K13/authored/p6-listed-reorders.json` exit 0 GREEN: `./styles` reorder `moved 28`, `firstDivergence 610`, risks 0; `./styles.css` reorder `moved 10`, `firstDivergence 310`, risks 0; scope Timeline → TimelineMarks 40; `unlistedRules 0`, `staleRules 0`; `chain-text.mjs` GREEN; `MIGRATION.md:8` `## 11.0.0`; doors 164 files, 137,285 B; `clauses.mjs:20` `SEALED = ["src", "scripts"]`, B10 at `:239`; `law.mjs:98` `FD2_ZONES = ["src", "scripts", "demo"]`; W-D.2's appendix A (with `maxBuffer` raised on its `git ls-files`, which overflows on the uncommitted tree): `ROOT-CONFIG 8`, `TSCONFIG 1`, `ALIAS 3`, `DEAD-CONDITION 1`, `PREPARE 1`, `ONE-VERIFY 7`, `GATE-LITERALS 24` (6 files), `BROWSER-IN-VITEST 2`, `DEMO-UNROUTED 9`, `RELAY 1`, `ONE-LEXER 68` (57 files), `HELPERS 24`; demo placement `"move": 60`; `vite.style-fold.ts` 318 lines, `vite.style-closure.ts` 286 lines (untracked, added by the chain) |

## Changes

`waves/W-D.1.md`:

1. Header: round 2, HEAD `3e8f99f9b`, this seat's two worktrees and replay timings.
2. Short cites: the unused `CUR:n` removed.
3. §2's converged-tree paragraph: the cascade reads GREEN under `K13`'s listing, its three admissions each risks 0 (C-4).
4. §3 step 3: the sealed zones are the one `SEALED` constant (`clauses.mjs:20`), read by B10 (`:239`) and the other structural clauses; `law.mjs:98`'s `FD2_ZONES` is a different list (C-6, the fact W-D.2 reads).
5. §5 D1-G9 converged cell: the listing's three admissions named (the `./styles` reorder of 28 with the S4b card-scroll move, the `./styles.css` reorder of 10, the Timeline scope of 40), each risks 0; the bite without `--reorders` (C-4). The "Can each fail" line reads "the listing".
6. §6 cascade bullet: the same three admissions as the only admitted divergence (C-4). Paired captures add a card with `.card-scroll-host` and `.card-header--shrink` (condensed and expanded) and the timeline; paired π adds the Card's `mask-image`, `overflow-y` and the condensed title's `font-size` (C-4).

`waves/W-D.2.md` (C-6, the lines the round-1 critic named):

1. Header: the converged tree (`6fdd4ec7…`, `K13`) replaces `wt2` and `472cf493…`.
2. Short cites: `K13` added; `LAW §n` → `K13/LAW.md`.
3. §2's loop-tree paragraph: the converged tree's readings (above), with the ENOBUFS note.
4. §3 item 1: the chain's split of `vite.style-fold.ts` into `vite.style-fold.ts` and `vite.style-closure.ts`, both moving into `scripts/build/`.
5. §3 item 9: B10 reads `SEALED` at `clauses.mjs:20`; B10 takes `demo` through its own zone list so the other clauses keep `src` and `scripts`; its moves are 60 on the converged tree.
6. §4: `scripts/structure/seal/clauses.mjs` (B10's zone list beside `SEALED`) replaces `law.mjs`.
7. §5 D2-G2's converged cell and the "Can each fail?" line read the converged tree. §6's demo bullet reads the placement's moves on W-D.1's landed tree.

`waves/INDEX.md` W-D.1 row and `design/structure/floor/FLOOR.md`: unchanged this round (C-1 and C-5 passed in round 1; the row cites no kit or digest, and FLOOR.md:9 links `<repo>/node_modules` alone).
