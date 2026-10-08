# FLOOR-P6 · the pass-6 floor (P6-F1..F3)

Seat: FLOOR, D1 pass 6. Model `claude-opus-5-5`, from the seat's own identity. This is REGISTRY §P5-8.3's floor half, built once into the floor: the scripts under `floor/` were edited in place, and `floor/FLOOR.md` describes the result. Every number below comes from a command this seat ran on 2026-10-08. Each command and its output is in `plants/results.txt`, which holds the verdicts, Appendix A (the battery logs), B (the regressions), C (the baseline) and D (the development readings).

**Base.** HEAD moved seven times during the run, every time by a docs-only commit: `0dd061c1` → … → `d948b29b`. `git diff --stat a115850c d948b29b -- . ':!docs'` is empty, so the code is 10.1.0 throughout. Each plant log names the commit its cut was taken at.

**Files.** Floor, edited in place: `cascade.mjs`, `browser.mjs`, `lib/scan/playwright.mjs`, `lib/graph.mjs`, `lib/recipes.mjs`, `lib/resolve.mjs`, `lib/tree.mjs`, `lib/entries.mjs`, `FLOOR.md`. Pass 6:
- `plants/`: `p6-tree-plants.sh` (the battery), `sfc-split.mjs`, `carve-spec.mjs`, `fd4-cover.mjs`, `f3-probe.mjs`, `lists/` (`f1-timeline-split.json`, `f1-scopes.json`, `f1m-statusdot-move.json`), `results.txt`;
- `tools/`: `baseline.sh`, `graph-dump.mjs`, `graph-diff.mjs`, `listing.mjs`.

## 1 · What was built

| item | cause (REGISTRY) | cure |
|---|---|---|
| **P6-F1** | P5-G1: `verify` numbered SFC scope ids by first appearance, so the Timeline → TimelineMarks split read `content` and could not be listed | `cascade.mjs`: `scopeNames(tree)` hashes every SFC of the tree as `@vitejs/plugin-vue` 6.0.8 does in a production build (`sha256(path + source)`, 8 hex) and labels each `data-v-<id>` and each scoped `@keyframes x-<id>` by its component, `data-v-(Timeline)`, `tl-check-(Timeline)`. A pure move keeps the label. A listing's `scopes` declares a split (`from → to`, with a reason), and `to`'s labels then read as `from`'s. The split's reorder is listed by its moved rules (P5-F3), and a changed value stays `content`. A declaration that is stale, that merges two live components, or whose `from` scoped nothing is refused. The baseline schema goes to `cascade-baseline/2`, and a `/1` baseline is refused. The v-bind numbering arm is removed: it matched the dev-mode spelling (`--<id>-name`), which a production dist never carries, and the tree has no `v-bind()` |
| **P6-F2** | P5-G2: `coverRisks` read `tests-visual/<basename>`, swallowed the miss as `""` (`cascade.mjs:219`), and matched basename-keyed results against path-keyed bands | One key: a spec's path from the Playwright config's `testDir`, which is Playwright's `rootDir`. Its own JSON reporter writes `file: relative(rootDir, file)`, confirmed in 1.61.1's source. `lib/scan/playwright.mjs` gains `playwrightProgram(g, ts)` (the one config, its `rootDir`, its specs, `keyOf`/`pathOf`) and `SEAT_REPORT = "browser-seat/2"`. `browser.mjs` keys the selection, bands and results by it and reads Playwright's `file` as written. It refuses a reported file that is no selected key, records `testDir`, refuses a base report of another schema or root, finds the π floor by its unique name in the program, and hands Playwright absolute paths. `coverRisks` refuses a report that is not `/2` and reads each spec at `testDir/<key>`. A spec the tree does not hold throws, naming report, key and path, and `verify` reads it as `RED` with that message |
| **P6-F3** | P5-G4: `lib/graph.mjs:37` (absent or malformed ledger = empty) and `lib/recipes.mjs:58` (unreadable file = no classes) | Both cured, and with them the rest of the class in the floor runtime: graph `:58/:149/:270/:290`, recipes `:21/:35/:49`, `resolve.mjs:173`, `tree.mjs:16/:73`, the seat's spec reach (`browser.mjs:106`), `entries.mjs`'s record read, its disk-tree stat, and the unread `fileSize` (deleted). The ledger is required like the entry record: absent or malformed, it throws naming its path. A listed file is read without a guard. A tsconfig or stylesheet that does not parse throws. Where absence is a legitimate reading, the caller tests it explicitly (`isFile`, `existsSync`). `FLOOR.md` §"No swallowed reads" lists the 18 catches that remain, each with why it swallows no read |

These cures are cured at cause, not just at the two named lines. A route B17 that judges a swallowed read through `tree.read` (§P5-8.3 route · S-14) would otherwise have found the same shape in nine more floor sites once the floor lands at `scripts/structure/`.

## 2 · The battery (`plants/p6-tree-plants.sh`, one fresh cut per plant)

| plant | reads | pass-5 floor | P6 floor |
|---|---|---|---|
| F1 | the route's own Timeline → TimelineMarks split (frozen S39-03, its one route-tree import hunk translated to HEAD), listed by `scopes` + moved rules; the same split unlisted | MISSED: listed and unlisted both `RED: content changed` | CAUGHT: listed GREEN (10 moved, 132 swapped pairs, 0 risks), unlisted RED; `SCOPE Timeline → TimelineMarks: 40 rule line(s) re-homed` |
| F1v | the split with `stroke-width` 3 → 4 under TimelineMarks, same listing | CAUGHT (control) | CAUGHT: `RED: content changed` |
| F1m | a pure move of StatusDot.vue one dir down, by the engine | CAUGHT (control) | CAUGHT: identical; the scope id re-hashed `4a47d962 → 7cd2991d` |
| F2 | the chip readback spec carved into chip's slot (frozen S43a program row + S48 spec), two real seat runs (base, then `--base-report`), then FD-4's coverage arm | MISSED: `covered=false`; the seat's own band read `base-green 0 — NO BROWSER SIGNAL` (results keyed by basename, bands by `../src/…`) | CAUGHT: `covered=true`, evidence `src/components/chip/__tests__/chip-accent-band.visual.ts` reads `--accent-band-strength` on `.glass-chip`, passed 1, band base-green 1 |
| F2g | the same report after the spec is moved out from under it | MISSED: `covered=false`, exit 0 (read as empty) | CAUGHT: `FD-4: … names spec …, at …, which … does not hold` |
| F3a | the opaque ledger deleted | MISSED: graph built, 17 wrong-cause violations (14 unresolved, 3 opaque), 0 ledgered edges | CAUGHT: `graph: … has no scripts/structure/records/opaque-ledger.json` |
| F3l | the ledger truncated to `{"entries": [` | MISSED: the same 17 violations | CAUGHT: `… opaque-ledger.json does not parse (Unexpected end of JSON input)` |
| F3r | `chip/accent-tone.css` made unreadable (`chmod 000`) | MISSED: graph built, `classesOf` 0 classes, and the selection read `band chip: 0 spec(s)` (all five chip-paint specs dropped, exit 0) | CAUGHT: graph, `classesOf` and the selection each stop on `EACCES` |

**Totals: pass-5 floor 2/9 (6 MISSED, both controls CAUGHT); P6 floor 9/9.** The first battery run stopped at before/F1m on a quoting fault in the script, `$k0→` read under `set -u` as a variable name. The script was fixed and the whole battery re-run from fresh cuts. The verdicts above are the re-run (results.txt).

**Regressions on this floor.** Pass 5's battery 8/8 (F1 the floor's runtime: 31 files, 55 value edges, 0 SCCs; F2 the theme move at its real dist path; F2d; F3 the listed rung; F4r and F4m the parse refusals; R7; R48, whose readback spec refutes the accent-tone rung with base-green 19 and 1 new failure, now through `/2` reports). Pass 4's battery 8/8 (F0..F6, F2u). The graph batteries: 59/59 and 18/18 (baseline).

## 3 · Baseline (HEAD `d948b29b` + the P6 floor, `tools/baseline.sh`)

`baseline.sh` runs pass 5's steps on the seat's worktree. It adds the cascade labels, the seat report's keys, and a second cut of the same commit under HEAD's own pass-5 floor, so the graph can be diffed edge for edge. Every step ran.

- **Before landing.** Graph at the docs home: 7,526 edges, 0 violations, 536 census. Plants 59/59 and 18/18. Chain: 9 rows; the replay is a no-op with the same digest (`5a5bd59f…`).
- **Landed.** Graph: 7,435 edges, 0 violations, 517 census. Floor cycles: 31 files, 55 value edges, **0 SCCs**. Parse: 1,302 files, 0 unparsed. Placement: 36 anchored, 14 move, 2 global, 15 proposed, 1 NEEDS-NAME; with `--anchor none`, 40 / 12 / 47 / 5. Bounds: 18 dirs over 12, 55 files over 500 lines. Fixpoint `--dry`: 15 moves, then FD-2 stops it (169 added pairs, members 14 → 24). All of these equal pass 5.
- **The graph under both floors.** Pass-5 floor 7,436 edges and 518 census against P6 floor 7,435 and 517. The five differing edges and the one census row are all in the floor's own two edited files: the `tests-visual` literals of `browser.mjs` and `cascade.mjs`'s `text(spec)` helper go, and the two imports of `lib/scan/playwright.mjs` come. There are 0 differences outside the floor, and 0 violations either way.
- **Build and gates.** Build 0. Gates: 4 PASS (F-1 7,435 edges; F-3 byte-equal, 68 export keys; F-4 contract; F-9 pin, 603 runtime and 1,281 type names, 0 differences). Cascade snapshot 1,970 / 4 / 4 / 365 rules, self-verify GREEN. 16 scoped components, all distinct names, and 6 scoped keyframes, each labelled by its component.
- **Tests.** vitest 239 files: 2,302 passed, 10 expected fail, 1 skipped, **0 failed**. typecheck 0.
- **verify:package is RED** at −5,511 B (2,913,546 < 2,919,057), the same as passes 4 and 5. P4-R3 rebinds the datum at the migration's landing commit, not at the floor.
- **Browser.** Selection on `chip/accent-tone.css`: the chip band, 5 specs. The seat on HEAD: GREEN 3/3, report `browser-seat/2`, `testDir=tests-visual`, key `substrate-paints-color.spec.ts`.

Load during the battery and baseline ran 22-72 (1-min average), and each log header records it. Every browser verdict here is a same-tree, same-load pair, and none had a timeout.

## 4 · What this changes for route B's chain

1. **Re-snapshot the cascade base.** A `/1` baseline (pass 5's `results/p5/cascade-floor`) is refused. The route snapshots the P6 floor cut with `--root`, because the labels need the tree that built the dist.
2. **The Timeline rules become listable.** The route lists S39-03 with a `scopes` declaration (`Timeline → TimelineMarks`) and the moved rules `verify` prints as `UNLISTED` (`tools/listing.mjs` transcribes them). The plant listing `plants/lists/f1-timeline-split.json` was derived from HEAD with the split applied. The route's tree differs (S4b's 18 card moves and others), so the route writes its own listing from its own verifier output.
3. **Re-run every browser report.** Reports are `browser-seat/2`. Pass 5's base and migrated reports (`/1`, basename-keyed) are refused as `--base-report` and by `coverRisks`. After the program row (`testDir: ".."`), a spec's key is its repo path (`tests-visual/x.spec.ts`, `src/components/chip/__tests__/chip-accent-band.visual.ts`), and `--specs` uses that key.
4. **The critic's `fd4-cover-probe.mjs` arm A cannot read covered=true as written.** It builds an unversioned report with basename-keyed results, the very shape P6-F2 removes, so on this floor `coverRisks` throws on it. It also imports `scripts/structure/lib/index.mjs`, which exists only in the route's tree. §P5-8.4's proof stands in its intent: the carved spec counts as evidence when the report is the one the seat writes. `plants/fd4-cover.mjs` reads it that way from two real seat runs (F2). The pass-6 critic re-issues arm A with a `/2` report, or reads the seat's own report.
5. **The floor already holds S49's floor arm.** The route's frozen S49 (B17 empty-catch) edits `scripts/structure/browser.mjs` and other landed floor files. Those sites are now cured in the floor, so S49's floor hunks find different text and leave the chain; the route re-derives from this cut.
6. **The chain's S1 digest changes.** The floor cut is new.

## 5 · Open gaps

| id | gap | disposition |
|---|---|---|
| FP6-1 | P6-F1 labels a scope by its SFC's basename. Two same-named SFCs that both scope rules throw (none at HEAD: 16, all distinct). A rename-move reads `content` until declared by `scopes` | declared limit (FLOOR.md); fails loud, no build |
| FP6-2 | P6-F1 reads plugin-vue's default production id; a `componentIdGenerator` or dev build throws. v-bind CSS vars are unmodelled (0 in the tree and dist) and would read `content` | declared limit; the safe direction |
| FP6-3 | `coverRisks` reads a spec from the tree under judgment at the report's `testDir`. It does not compare the report's `root` with that tree, so a report of another tree whose spec exists at the same path is read from the judged tree | declared limit; `verify --browser` takes the judged tree's own report |
| FP6-4 | A split into several children takes one `scopes` row per child. `rescope` admits it, but no plant exercised it | untested; the route's splits are one child each (S39) |
| FP6-5 | the critic's probe arm A (§4.4) | for the pass-6 critic |
| FP6-6 | Fence disclosures. One floor edit (`lib/scan/playwright.mjs`, the first P6-F2 edit) was written by a shell heredoc, not the Write tool; every other checkout write used Edit/Write. The pass-4 and pass-5 regression batteries cut their worktree at `<scratch arg>/wt`, so the seat dir was passed as the scratch arg. That put their logs in `<seat dir>/after` (moved to scratch after each run), and pass 4's F5/F6 cut a second worktree at `<seat dir>/wt-base`, which its script removes. The seat dir is empty at return, and `git worktree list` shows no p6 worktree | disclosed |
| FP6-7 | `scan/text.mjs`'s JSON-string decode keeps the raw token when its escapes are not JSON's | kept, listed in FLOOR.md; a tokenizer decode, not a read |

Pass 5's floor gaps carry forward unchanged: FP5-3, FP5-4 and FP5-7 are declared limits, and FP5-5 is ruled by P4-R3/P5-R2.

**For the checklist** (REGISTRY §P5-9). This floor supplies S-10's two floor items (P6-F1, P6-F2) and S-14's floor items (P6-F2's `cascade.mjs:219`, P6-F3's `graph.mjs:37` and `recipes.mjs:58`, and the rest of the class in the floor). It closes no item by itself. S-10 closes on the route's tree: cascade GREEN with the Timeline rules listed, and the carved readback spec counted as evidence. S-14 closes with the route's B17 widening and its X5 plants.
