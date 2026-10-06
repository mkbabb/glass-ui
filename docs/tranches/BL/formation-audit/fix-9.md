# BL — formation fix, seat 9

| field | value |
|---|---|
| seat | formation fix seat 9, before audit pass 9. Answers `formation-audit/pass-8.md` (FH-01) and its notes |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `96dc425e` when the worktree was cut, `5e8b43ad` at return. The commits between (`7bf13aec`, `5e8b43ad`) touch `FORMATION-PROGRESS.md`, `audit/INBOUND.md` and a coordination letter only, and `git diff --stat 64ff7aa2 HEAD -- docs/tranches/BL/PLAN.md docs/tranches/BL/waves docs/tranches/BL/LEDGER.md src` is empty, so the plan this seat started from is the one pass 8 read. A scratch worktree at `96dc425e` (`scratchpad/formation/fix-9/wt`, `node_modules` and `tests-visual/node_modules` symlinked; no build was needed) was removed before return (`git worktree list` shows no fix-9 entry) |
| engines | none. The two runs here are vitest and a shell test. Playwright WebKit was not run, and real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`; `waves/W-A.2.md`, `W-C.2.md`, `W-C.3.md`, `W-D.1.md`, `W-E.1.md`, `W-E.8.md`, `W-E.9.md`, `W-E.10.md`, `W-E.14.md`, `W-G.1.md`, `W-I.1.md`, `W-K.1.md`, `W-L.3.md`, `W-L.8.md`; `formation-audit/sweeps/reshape-order.py`, `borrowed-red.py` and their `.out` files; this file. `LEDGER.md` needs no change: no terminal word moves, and no row cites L10-19, `./styles.css`, A2-G8 or I1-G13 (`grep` over `LEDGER.md`: 0 lines). The plan has no `MIGRATION.md`; W-G.7 §7 already carries the `./styles.css` row |
| fence notes | (1) The cursor owner's commit `751b8d7e` swept this seat's first, half-made edit of `reshape-order.py` into git while the seat was working. The file as it stands now is the finished version. (2) After a bite run in the worktree, this seat restored the planted file with `git checkout -- <file>`. That was inside its own scratch worktree, which is now removed, but the fence lists `checkout`. It is recorded here for that reason. (3) Nothing under `design/` was read or written. W-D.1 cites `RUL R-7` (`design/structure/RULINGS.md`), and this seat did not open it (see FH-01, the `./styles.css` cure). (4) Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`. `sweeps/__pycache__/`, which pass 8 recorded, is gone |
| fixtures | in this seat's scratchpad, outside the checkout: the HEAD copy of `PLAN.md` and `waves/` used for the sweeps' before runs (`fix-9/headplan/`), fix-8's version of `reshape-order.py` (`reshape-order.fix8.py`), and the before outputs (`fix-9/*.before*.txt`, also copied into each `.out`) |

## Result

FH-01 is cured by class. It is not refuted.

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FH-01 | one wave deletes, moves or reshapes an artefact that another wave builds on or gates on, in a form the enumeration cannot read. Pass 8 named a brace-listed deletion. The same gap covers lowercase deletions, `(deleted)` inside a brace list, `old→new` renames, brace lists inside `Moved` clauses, `(moved…)`, an export `removed`, W-A.2's latch-to-owed-file reshape, and whole-file deletions stated in a §3 but not in its §4 | `sweeps/reshape-order.py` (widened). `sweeps/borrowed-red.py` gains the CURED-EARLIER kind for the one gate the latch reshape turned green | `reshape-order`: fix-8's parser gives **exit 0**, rows 51, open 0. The widened parser on the same plan, `SWEEP_RAW=1`, gives **exit 1**, rows 80, open 80; with readings, **exit 1**, open 6. `borrowed-red` with `SWEEP_RAW=1` gives **exit 1**, rows 1, open 1 | `reshape-order` **exit 0**, rows 81, open 0, stale 0. `borrowed-red` **exit 0**, rows 1, open 0. `fl6-plate-reads` **exit 0**, reads 27, open 0 (unchanged) |

Both runs of each sweep are appended to its `.out` under `# ===== fix-9`. The before runs read a `git archive HEAD` copy of `PLAN.md` and `waves/`.

The after-only plan checks:
- **DAG.** `plan_dag.py` with `graphlib` reads 99 nodes for 99 specs and a full topological order. No §5 edge changed.
- **Tables.** A column count over every table in the 15 edited plan files finds 0 mismatches.

## FH-01 · the reshape enumeration misses brace-listed deletions, and A2-G8 plants into a file W-G.1 deletes

### The sweep, widened (`sweeps/reshape-order.py`)

- **Brace lists.** `expand()` expands one brace level, `dir/{a,b}.ts` → `dir/a.ts`, `dir/b.ts`. An item marked `(deleted)` counts as a deletion, an item written `old→new` counts as a move, and an item marked `(new)` is skipped.
- **Deletion forms read in §4.** All of these, each brace-expanded:
  - `Deleted:` lists;
  - `<path>` (deleted…) and `<path>` (split into…);
  - `<path>` deleted and `<path>` removed;
  - delete or deletes `<path>`;
  - `name (deleted)` inside any brace list.
- **Move forms.** `Moved…:` lists (brace-expanded), `<path>` (moved…) except "moved per W-D.1" (the move ledger), and every `old→new` rename.
- **Owed paths.** A `tests/owed/…` path shares its basename with its latch file, so `names()` matches it only by its full path.
- **LATCH, a new kind.** W-A.2 §3 item 7 moves each latch's assertion out of its file. The sweep reads that table mechanically. For each latch file, every later wave that names the file is a row. An owner wave's row is read only when its §4 names the owed file and `vitest.config.ts`, which shows it carries the hand-off.
- **UNLISTED, a new table.** It lists whole-file deletions stated in a §3 that the same spec's §4 does not delete. These are deletions the other rows cannot see.

**What it found on the HEAD plan** (`SWEEP_RAW=1`, `.out` "before"). These are the rows fix-8's parser never listed:

| row | what it is | cure |
|---|---|---|
| `W-G.1 → src/components/blob/shaders/metaball.frag.ts :: W-A.2` (BEFORE) | pass 8's FH-01 | A2-G8's webgl2 leg is given a lifetime (below) |
| `W-G.1 → composables/auroraFallbackGround.ts :: W-G.6` (AFTER, a brace rename) | G6-G6 greps `src` for `.toDataURL(`, and the old path is only its HEAD reading | reading, no edit |
| `W-G.7 → ./styles.css :: W-D.1` (OPEN) and `:: W-L.3` (AFTER) | **two specs disagreed on one public export.** W-G.7 §3 item 4 removes `./styles.css` (G7-G7, with a MIGRATION row). W-D.1 item 5 said `./styles.css` keeps its HEAD bytes as a second entry. W-L.3's consumer matrix built "a second app importing `./styles.css` alone", after W-G.7 had removed it. PLAN §3's W-L.3 row listed it too | one record kept (below) |
| 13 LATCH rows | W-A.2 moves every latch assertion into `tests/owed/…` and puts a fence at the old site. Six of the seven owner waves still described the latch in place ("`:925` becomes a plain `it`"), and none of those six named the owed file or the `vitest.config.ts` exclusion. Only W-J.2 carried the hand-off. Pass 8 saw one instance of this: "whether the fence then names it depends on what W-G.1 leaves of `gl-excise.test.ts`, and no spec says" | the hand-off is stated once in W-A.2, and each owner names it (below) |
| 13 UNLISTED rows | each one is a §3 sentence that deletes a part of a file, or cites another wave's deletion | readings only. Per-row reasons are in `ADJUDICATED` |

**A gate the latch reshape turned green.**
- **The gate.** W-I.1 G13 was `! grep -n 'it\.fails(' tests/components/custom/dock/g-dock-lattice.test.ts`. A2-G7 removes every `it.fails` in `tests` (W-A.2 lands before W-I.1), so G13 entered its own wave green. That is FG-03's borrowed-RED class, reached through a reshape.
- **Why the sweep missed it.** `borrowed-red.py` keyed only on absent-file readings.
- **The new kind.** CURED-EARLIER lists a gate that greps a pattern over a scope another earlier wave's gate already requires to hold 0 hits. The scope is taken from a `git ls-files <scope> | grep` pipe too.
- **Result on the whole plan.** One row (W-I.1 G13). A second candidate, G-L8-14 against C1-G1, drops out on scope: C1-G1 reads `docs`, and G-L8-14 also reads `scripts/loops`.

### The cures

**A2-G8's webgl2 leg (pass 8's instance).**
- `waves/W-A.2.md:108`: the leg lives as long as the `gl-excise` fence it bites. W-G.1 deletes that fence (W-A.2 item 7 names W-G.1 as its owner) and also deletes the plant's file. So the leg is not run after W-G.1 lands.
- **What holds the class on every later tree.** G1-G1 (`git grep -icE 'webgl|glsl|setupGL' -- src` reads 0). Its detector matches a `webgl2` line anywhere in `src`.
- **Re-run at `96dc425e`.** The plant `export const probeSecondContext = "webgl2";` appended to `metaball.frag.ts`, then `npx vitest run tests/components/custom/blob/gl-excise.test.ts`: `4 passed | 1 expected fail`, exit 0. It still SURVIVES, as recorded.
- `waves/W-L.8.md:72` (§3.5 step 1): the one record of what the release commit does not re-run now lists this leg beside band 0.
- `waves/W-G.1.md:75` (item 7) and `:84` (§4) say what W-G.1 leaves of `gl-excise.test.ts`:
  - the register `it`, plain, and the detector-discrimination `it` stay;
  - the allow-list and seam `it`s (`:140-171`), which name files W-G.1 deletes or rewrites, go with the fence;
  - the owed file and its exclusion are deleted.

**The latch hand-off, stated once.**
- `waves/W-A.2.md:74-84`: the latch table gains an owed-file column. W-J.2's existing name, `tests/owed/engage-ladder-census.test.ts`, is kept. `layout-canon` is split between W-E.9 (`:371`, `:403`) and W-E.14 (`:390`, plus the file). One paragraph is the record of the hand-off:
  - the owner moves the assertion home as a plain `it`;
  - it deletes the owed file (or its own rows), the exclusion and the fence, in one commit;
  - a later gate written "with `:N` as `it`" runs that moved assertion, whose HEAD reading is the latch flipped in place, so those HEAD readings stand.
- Each owner names the hand-off in its §1, with W-A.2 as the sender (PLAN §1's hand-off rule), and in its §3 and §4. The lines are:

| owner | §1 | §3 | §4 |
|---|---|---|---|
| W-C.2 | `:29` | `:47` (item 4) | `:57` |
| W-E.8 | `:20` | `:53` (item 3) | `:58` |
| W-E.9 | `:25` | `:54` (item 6) | `:59` |
| W-E.10 | `:27` | `:66` (item 2) | `:87` |
| W-E.14 | `:20` | `:43` (step 3) | `:49` |
| W-I.1 | `:36` | `:173` (item 1) | `:184` |
| W-G.1 | `:38` (already named W-A.2) | `:75` | `:84` |

W-J.2 already carried it, so it has no edit.

**W-I.1 G13, re-founded** (`waves/W-I.1.md:221`).
- **The new gate.** `test ! -e tests/owed/g-dock-lattice.test.ts && ! grep -q 'it\.fails(' tests/components/custom/dock/g-dock-lattice.test.ts`.
- **At `96dc425e`:** exit **1** (the `it.fails` at `:925`).
- **At the wave's base:** W-A.2's owed file exists, so the first clause holds the gate RED. Only W-I.1's move home turns it green.

**`./styles.css`: one record.**
- **The record.** W-G.7 (F-52, whose member R2-07-06 is this export) holds the decision: §3 item 4, G7-G7, and the §7 MIGRATION row `@import "@mkbabb/glass-ui/styles.css"` → `@import "@mkbabb/glass-ui/styles"`.
- **W-D.1** (`waves/W-D.1.md:72`). The duplicate is struck. W-D.1 now:
  - changes no byte of either CSS entry (RUL R-7, held by D1-G9);
  - cites W-G.7 for whether the entry exists, either landing order converging;
  - no longer says "a consumer imports one of the two", which would have reached the README through W-C.3.
- `:107`: D1-G9 reads every entry its base carries.
- `waves/W-L.3.md:64`: the matrix's css leg compiles the README recipe through `./styles`, and the `./styles.css`-alone app is struck.
- `PLAN.md:235`: the W-L.3 row matches.
- **An open question.** This seat could not read `RUL R-7` (`design/` is fenced). W-D.1's old text read R-7 as deciding that `./styles.css` stays. If R-7 is an owner ruling, and not D1's landing invariant, then the duplicate to strike is W-G.7 item 4 and G7-G7, not W-D.1's sentence. It is listed under `open` for the cursor owner to confirm against `design/structure/RULINGS.md`.

### Pass 8's notes, also cured (each is the same "two records" shape)

- **The generated CI-step block.** `waves/W-C.3.md:47` (item 2) is now the one record: every later wave that edits `package.json` `scripts` or a workflow file runs `regen-docs.mjs` in the same commit, and C3-G3's `--check` fails one that skips it. The sweep's `W-A.3|WORKFLOWS|W-C.3` reading now cites W-C.3 item 2, not W-D.2.
- **W-C.2's scope row.** `waves/W-C.2.md:28` now matches item 8: W-B.13 deletes the paragraph, and the pair is unordered and converges.
- **ONE-VERIFY against the fixture builds.**
  - `waves/W-E.1.md:69` and `waves/W-K.1.md:56` write the fixture step as `npx vite build` in the fixture directory, never `npm run build`.
  - So D2-G1's arm (`/run:\s*npm (run (build|typecheck)|test)\b/`, `W-D.2.md:163`) counts no library build outside the verify workflow.
  - A first wording named `verify.yml` in those §4s, and the widened sweep listed it at once as two WFEDIT rows. It was reworded, and the rows went.
- **Not acted on.** A3-G5 and A5-G5 width, and H1-G23's one hop: pass 8 found no live instance, and neither does this seat.

## Gates touched, and their HEAD readings

| gate | change | reading |
|---|---|---|
| A2-G8 | webgl2 leg given its lifetime; command unchanged | exit 0 (SURVIVED) at `96dc425e`, so the gate is RED |
| W-I.1 G13 | re-founded on the owed file | exit 1 at `96dc425e` |
| E8-G1, E9-G1, E10-G0, E14-G3, W-I.1 G12 | commands unchanged; W-A.2 item 7 defines "with `:N` as `it`" on a tree after W-A.2 | HEAD readings stand (pass 8 read these as latch files still carrying `it.fails`) |
| G7-G7, D1-G9 | unchanged; D1-G9's prose names the entries its base carries | unchanged |
| W-L.3 matrix css leg | the `./styles.css` app struck | the matrix does not exist at HEAD (RED, unchanged) |
