# D1 pass 5 · the floor build (P5-F1..P5-F4)

Seat: FLOOR, model claude-opus-5-5, asserted from the seat's own identity. This is REGISTRY §P4-8.3's floor half, built once into the floor: the scripts under `floor/` were edited in place and `floor/FLOOR.md` describes the result. P5-F2 builds P4-R4 arm (a), as ruled in `RULINGS.md`. Every number below comes from a command this seat ran on 2026-09-26, and each command and its output is in `plants/results.txt`: the verdicts, Appendix A (the plant logs) and Appendix B (the baseline).

Files this pass owns under `docs/tranches/BL/design/structure/`:

- the floor: `floor/` (the changed files are listed in §2);
- `pass-5/plants/`: the battery `p5-tree-plants.sh`, `floor-cycles.mjs`, `f4-plant.mjs`, `rung.mjs`, the listings `listed-rung-a.json` and `listed-rung-b.json`, the move lists `lists/f2-theme-dir.json` and `lists/f4-edited-importer.json`, and `results.txt`;
- `pass-5/tools/`: `baseline.sh` and `parse-tree.mjs`.

**Base.** HEAD moved once during the run, by a docs-only commit: `5e278aa7`, then `a0fa9d3c`. `git diff --stat 5e278aa7 a0fa9d3c -- . ':!docs'` is empty, so the code is 10.1.0 throughout. The before arm, the baseline and 10 of the 16 after-arm cuts ran on `5e278aa7`; p4 F5, F6 and P5 R7, R48 ran on `a0fa9d3c`.

## 1 · Result

| battery | before (pass-4 floor, HEAD's own) | after (P5 floor) |
|---|---|---|
| `pass-5/plants/p5-tree-plants.sh` (6 plants: F1 F2 F2d F3 F4r F4m) | **0/6** | **6/6** |
| its two regressions, pass 4's F7 and F48 re-issued with rule-set listings (R7, R48) | — | 2/2 |
| `pass-4/plants/p4-tree-plants.sh` F0 F1 F2 F2u F3 F4 F5 F6 | — | 8/8 |
| `floor/plants/graph-plants.mjs` (59) | — | 59/59 |
| `pass-3/plants/p3-graph-plants.mjs` (18) | — | 18/18 |

- **Before arm:** `HEAD` with its committed floor and rows (pass 4's).
- **After arm:** `HEAD` plus this floor, cut by `floor/rows/apply.mjs`, with `r1` first.
- **Plant cuts:** each plant cut a fresh linked worktree under the seat's scratch and removed it afterwards.

## 2 · Items

For each item: what was built, the plant, and its result on the before arm and then the after arm.

| item | built | plant: before → after |
|---|---|---|
| **P5-F1** the floor's own cycle (P4-G1) | New leaf `lib/plan.mjs` holds the move plan's vocabulary (`expandMoves`, `kindClass`). `lib/move.mjs` and `lib/classify.mjs` both read it, so the classifier no longer reads the engine that calls it. This is S35's cure (B-kit `authored/b4-cycles.mjs`), taken into the floor, so S35's floor arm leaves route B's chain. | **F1**, `floor-cycles.mjs`: value-edge SCCs among the landed floor's files, read by the tree's own F-1 graph. Before: `CYCLE scripts/structure/lib/classify.mjs ↔ scripts/structure/lib/move.mjs` (29 files, 51 edges, 1 SCC). After: 31 files, 53 edges, **0 SCCs**. |
| **P5-F2** a moved CSS entry's dist path (FP4-2, FP3-9; P4-R4 arm (a)) | The record's CSS targets carry no `dist`; a CSS entry ships at its source's mirror path (`distOf`) and its export key targets that real file. `emitExports` writes `./dist/<path under src>`. Deleted: `publishedPathOf` (the graph's `@source` published-layout reading uses `distOf`), `emitDeclaredCssEntries` (the forwarding `@import` writer), and the f3 row's edit that wired it into `vite.style-fold.ts`. The guard trades `css-dist-undeclared` / `css-dist-twice` for `css-dist-declared` (a record that names a second dist name) and `css-source-twice`. | **F2**, `src/styles/theme.css` → `src/styles/theme/index.css` by the engine, then `entries.mjs write`, build, the four gates and a cascade verify against a pre-move snapshot. Before: `./styles/theme` → `./dist/styles/theme.css`, a 28 B file, `@import "./theme/index.css";`. After: `./styles/theme` → `./dist/styles/theme/index.css` (93 B), **no file at the old name**, gates 4 PASS, cascade GREEN (identical). **F2d**, the record given `"dist": "styles/theme.css"` on `./styles/theme`. Before: `entries.mjs check` exit 0. After: exit 1, `css-dist-declared`. |
| **P5-F3** FD-4's listing names the rung it reviewed (P4-G4, cB4 §5.2) | A listing is `{ entry, moved: [leaf rule…], reason }`. `reorderRisks` returns the moved rules (the complement of the longest kept subsequence). The moved set must equal the listed set as a multiset: a moved rule the listing does not name is `UNLISTED`, a listed rule that did not move is `STALE-RULE`, and either is RED. A listing with no `moved` is RED. Only a matching listing is judged pair by pair (P4-F7 unchanged). `verify` prints every moved rule of a reordered entry as an `UNLISTED` line, so a listing is written from the verifier's own output. | **F3**, rung a (card/scroll, pass 4's safe rung) listed by its 18 rules in `listed-rung-a.json`, then rung c (music-staff after scroll-progress-rim, a second reorder in `./styles` that no one reviewed, with no risky pair) added under the same listing. Before: rung a GREEN, rung a + c **GREEN**: the pass-4 judge reads the whole entry as listed and finds no risky pair. After: rung a GREEN (`unlistedRules 0`), rung a + c **RED**, 9 moved rules named `UNLISTED`, each a scroll-progress-rim rule. |
| **P5-F4** every engine write is parsed (P4-G2) | New `lib/syntax.mjs`: `parseError` / `unparsed` over staged texts. Scripts go through the TypeScript parser (`parseDiagnostics`); an SFC goes through `@vue/compiler-sfc`, with its script blocks through TypeScript and its plain-CSS style blocks through postcss; CSS goes through postcss; JSON goes through `JSON.parse` (tsconfig and `.jsonc` through TypeScript's reader). The move engine parses every file a step would write, moved or edited, after preflight and **before the first write**, and refuses at phase `parse` (`PARSE refused` in the CLI). The row transaction (`rows/lib.mjs` `commit`) parses every staged text and throws before its first write. The parsers are F-1's (`loadDeps`). | **F4r**, a floor row through the arm's own row transaction whose exact-text edit cuts the header of `combinedStylesDraw` in `scripts/profile-bundle.mjs` (S34's shape). Before: the row writes (`row result: wrote`) and `node --check` then exits 1. After: `row p5-f4-cut-header: 1 staged file(s) do not parse; refusing to write: scripts/profile-bundle.mjs (295:1 Declaration or statement expected.)`, and the file is unchanged. **F4m**, a planted leaf moves and the engine rewrites the specifier of a planted importer whose body does not parse. Before: move exit 0, the importer is written and the leaf moved. After: `"phase": "parse"`, `PARSE refused scripts/zz-importer.mjs 4:12 ':' expected.`, and nothing is written. |

**What F4m does and does not show.** The importer is planted already unparsable, so F4m shows that the engine's parse check is wired onto every file it writes, including the edited ones. It does not show an engine rewrite breaking a parsable file, because none is known. F4r is the realistic shape: an exact-text row cutting a function header.

**Changed floor files:** `FLOOR.md`, `cascade.mjs`, `move.mjs`, `lib/classify.mjs`, `lib/entries.mjs`, `lib/graph.mjs`, `lib/move.mjs`, `records/entry-record.json`, `rows/f3-entry-record.mjs`, `rows/lib.mjs`; new `lib/plan.mjs` and `lib/syntax.mjs`. Net +85 / −106 lines over the ten tracked files (`git diff --stat`), plus the two new leaves. The landed floor grows from 29 files to 31 (`fd11-land` lands `plan.mjs` and `syntax.mjs` with the rest; its file list is derived, not enumerated).

## 3 · Baseline (HEAD `5e278aa7` + the P5 floor, `pass-5/tools/baseline.sh`)

`baseline.sh` runs `pass-4/tools/baseline.sh`'s steps, plus `floor-cycles`, `parse-tree` and a `css-dist-names` reading. Every step ran, and none stopped early. The demo is built before vitest.

- **Before landing.** Graph at the docs home: 7,527 edges, 0 violations, 537 census. Plants: 59/59 and 18/18. Chain: 9 rows (`r1` first); the replay is a no-op with the same digest.
- **Landed** (`scripts/structure`).
  - Graph: 7,436 edges, 0 violations, 518 census. The floor's own cycles: 31 files, 53 value edges, **0 SCCs**. Whole-tree parse: **1,302 code files, 0 unparsed**, so P5-F4 refuses only what a step breaks.
  - Placement (publication anchor): 36 anchored, 14 move, 2 global, 15 proposed, 1 NEEDS-NAME. With `--anchor none`: 40 move, 12 global, 47 proposed, 5 NEEDS-NAME.
  - Bounds: 18 dirs over 12 files (src 9, demo 2, tests 6, tests-visual 1) and 55 files over 500 lines (src 18, demo 8, tests 18, tests-visual 6, scripts 5).
- **Fixpoint `--dry`.** Pass 1 proposes 15 moves and stops on FD-2: 169 added pairs, members 14 → 24. This equals pass 4.
- **Build and gates.** Build 0. Gates: 4 PASS (F-1; F-3 byte-equal, 68 export keys; F-4 contract; F-9 pin, 603 runtime and 1,281 type names, 0 differences). entries, cascade contract, snapshot, self-verify and `surface check` all 0. `css-dist-names`: `./styles` → `dist/styles/index.css` 1,514 B, `./styles/fonts` → `dist/styles/fonts.css` 132,840 B, `./styles/theme` → `dist/styles/theme.css` 117 B. At HEAD no CSS entry has moved, so arm (a) and the pass-4 floor publish the same files.
- **Tests.** vitest: 239 files, 2,302 passed, 10 expected fail, 1 skipped (2,313), **0 failed**. typecheck 0.
- **verify:package is RED:** `G-BUNDLE-RATCHET shrink 2913546 < 2919057` (−5,511 B), the same as pass 4. P4-R3 rules the floor row as measured and rebinds the datum once, at the migration's landing commit. This floor does not rebind it, because the floor is not that commit.
- **Browser.** browser-select on `chip/accent-tone.css`: chip band, 5 specs. Browser seat: GREEN, 3/3.

**Digests.** Plant cuts of HEAD + this floor read `2a70ba8d8ee5…` on `5e278aa7` and `a433c015be6c…` on `a0fa9d3c`. The baseline's cut read `65300efed0ce…`, the same on its replay. It differs from the plant cuts on the same commit because the baseline copied the floor seconds before `FLOOR.md`'s pass-5 edit, and the digest covers docs (P4-G5). Any digest of this cut moves with the docs, so a chain that pins it re-records it after this report is committed.

## 4 · What this changes for route B's chain

1. **S35's floor arm leaves the chain.** `lib/plan.mjs` is now in the floor. The S35 edits to `scripts/structure/lib/{plan,move,classify}.mjs` would find their text already applied and would conflict as a partly applied row. They go, and S35 keeps its two tree cures (`visibility.ts`, `useAccentTone.ts`).
2. **The theme dist path changes.** The route's `theme.css → theme/index.css` move now publishes `./styles/theme` at `./dist/styles/theme/index.css`. The route's `entries.mjs write` step re-pins it. The 28 B forwarder is gone, and a consumer that imports `dist/styles/theme.css` by path gets a MIGRATION row (P4-R4). The export key does not change, so the surface pin does not move. Three B-kit sites read the removed machinery, and each must change:
   - `authored/scripts-doors.mjs` (S20, frozen in `S20-scripts-doors.json`) exports `emitDeclaredCssEntries` through the floor's door. Its two `vite.style-fold.ts` edits name that export and the call that f3 no longer writes.
   - `frozen/S25-gate.json` lists `emitDeclaredCssEntries` among the door's names.
   - `authored/test-edits.mjs:251-272` reads the record's `t.dist`.

   Each drops the forwarder or reads `distOf(source)`. They are route edits, re-derived from this cut.
3. **Listings name their rules.** `authored/listed-reorders.json` (by entry) is RED on this floor as "names no moved rule set". The route re-writes it from `cascade.mjs verify`'s `UNLISTED` output for the rungs it reviewed. Pass 4's F7 and F48 plants read their old listing the same way, so the P5 battery re-issues them as R7 and R48 with rule-set listings. Both still catch: the risky pair RED, and the readback refutation. Pass 4's F47 was not re-run. Its verdict reads the chip band's base-green count from `browser.mjs`, which this pass did not change; R48's seat reports the same band (6 specs, base-green 19).
4. **Every engine step is parsed.** A route step that writes an unparsable file through the floor's engine or row transaction now stops before writing. B-kit's own exact-text edits engine (`derive/edits.mjs` with `lib/row.mjs`, where S34's fault happened) is outside the floor. It closes P4-G2 at the cause only when it calls `unparsed` from the floor's `lib/syntax.mjs` on its staged files. That is route work, and a one-line call through `loadFloor`.
5. **The chain's S1 digest changes.** The floor cut is new. The route re-derives from it (`derive/chain.sh`).

## 5 · Open gaps

1. **B-kit still names the removed dist machinery** at S20, S25 and `test-edits.mjs` (§4.2). Its chain will not re-derive until those steps drop it.
2. **B-kit's own writer is not yet parsed** (§4.4). P5-F4 is built into every floor writer. The route's edits engine must call it, or P4-G2's original site stays open.
3. **F4m plants an already-broken importer.** It proves the engine parses every write, edited ones included. It does not prove an engine rewrite can never break a parsable file, and no such rewrite is known.
4. **P5-F3's moved set is one longest kept subsequence.** When two are equally long, the verifier's choice is deterministic, and a listing is written from its own output, so the two agree. A hand-written listing that picks the other side reads RED, never GREEN. That is the safe direction.
5. **verify:package stays RED at −5,511 B** until the datum is rebound at landing (P4-R3). It is unchanged by this floor, because no CSS entry moves at HEAD.
6. **Pass 4's F47 was not re-run** (§4.3), and the full graph-selected browser run is the route's (P4-G6).
7. **The parse check reads syntax only.** Markdown, shell, HTML and YAML writes are not parsed, and a write that parses but does not type-check is left to the typecheck. Both are declared limits in FLOOR.md.
8. **How the files were written.** The floor's changed files were edited in place with scripted exact-text replacements, each asserting one match. The two new leaves, every `pass-5/` file and this report were written with the Write tool. `results.txt` is a filtered record of the plant logs, and its header states the filter. The full logs stayed in scratch.
9. **Nothing is committed.** §P4-8.2 orders the floor committed before the route re-derives.
