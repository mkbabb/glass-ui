# glass-ui 11.1.1 · the release close

Run by claude-opus-5-5 on `release/11.1.1` in `.claude/worktrees/release-11.1.1`, 2026-11-22,
following the 11.1.0 close's method (`docs/release-11.1.0/close.md`). Every orchestrator note in
this folder was read first (fourteen). Nothing was tagged, pushed or published.

**Verdict: not ready to tag.** The master merge the close begins with brings two failures into
`scripts/release.sh`'s own gates, and `release.sh` stops at the first (it runs under `set -e`):

1. **The pixel floor is RED on the merged tree** in all three legs (the green floor and both
   planted self-tests). Master's `e4361f2ee` deleted the substrate studio frame, and with it
   `demo/stories/substrates/_frame/RendererStatus.vue`, the `<output class="renderer-status"
   data-renderer data-state>` badge the floor reads to know the aurora and the blob armed WebGL2
   (`tests-visual/substrate-paints-color.spec.ts:435` and `:683`). The floor never reaches a pixel.
2. **The exits gate is RED on the merged tree** in its CommandDialog cells, which drive the demo's
   Command page through an "Open palette" button that master's rebuilt page no longer has.

Neither comes from the branch's source: `src` on the merged tree differs from the pre-merge tip
only by master's two unreachable exports, and every entry's gzipped closure is byte-identical.
Both need a ruling, below. Restated for the rebuilt page, the CommandDialog cells also show a
palette closing by a pick still drops its plate, on 11.1.0's source and on the branch alike.

The release.yml battery is green on the committed tree. Of the visual suite, WebKit, the release
specs and every Chromium chunk were read; none of their branch-only failures comes from the
branch, and one WebKit title is left unresolved. Coarse-touch was read for its first chunk only. The guard refused
the seat's last run on low disk (another session's), and by the seat's orders it stopped there.

How it ran:

- Every build, test and browser run went through `~/.claude/guard/guarded`, WebKit under
  `--exclusive webkit`. It printed its zone warning (armed, a warning only) on every call.
- **The guard refused one run, the last**: at 15:31 the branch's WebKit re-read of three titles,
  on "disk low" (31 GB free at 15:29 and 16 GB at 15:33, from another session's use; 88 GB at
  the start). As the seat's orders say, it stopped there: it removed its own trees (13 GB), ran
  nothing more, and records what ran. The kernel zone read 10.67M at 10:06 and 13.03M at 15:44,
  past the guard's 13M refusal line for heavy runs.
- One heavy run at a time, with one exception: the coarse-touch chunk `co-part-ab`, whose queue
  this seat stopped by PID at 15:28 while its guarded call was still waiting for headroom, began
  at 15:29 anyway and ran beside the WebKit re-read on master's tip until it ended at 15:33 with
  91 of its tests not run (4 passed, 38 failed, at a load of 46). Its partial report is kept and
  not read as a chunk.
- Ports 5351 to 5356, each run on its own server (`GLASS_UI_DEMO_URL`). 1-minute load 5 to 12
  until 15:20, then 39 to 61 (other sessions).
- Drivers and logs in this folder: `run.log` (the seat's own lines), `archive-gates.sh`,
  `gates.sh`, `pf-ab.sh`, `exits/` (`part.sh`, `tree.sh`, `rest.sh`, `logs/`), `scripts/`
  (`queue.sh`, `suite.sh`, `compare.sh`, `summary.py`, `branch-only.py`, `resolve.sh`,
  `wk-resolve.sh`, `errs.py`, `rerun-args.py`, `fulltree.sh`, `ab.sh`, `chunk-new.sh`),
  `run.sh`, `run-full.sh`, `run-rest.sh`, `suite/`, `static/`.

## Merges and commits, in order

1. **master** (`48bebb122`) into the branch: `d464304d7`. 336 commits since the merge base
   (`938cfcbd3`): the rebuilt demo site, the deploy's asset-miss check, and
   `e7c0be688`'s two `src` changes. **No conflict**; `tests/gates/boot-graph.test.ts` auto-merged
   (master's frame-0 ground arm, the branch's modulepreload count of 68). `.github/workflows/*`
   and `scripts/dist-tag.mjs` are master's bytes (`git diff master` on them is empty). The two
   `src` changes delete `FOURIER_STROKE_RUNGS` and make the shell field's canvas selector
   module-local; neither name is reachable from any `exports` key of the published 11.1.0 (the
   fourier-field barrel re-exports neither, and no export is a wildcard into `dist/components` or
   `dist/composables`), and `verify:package`'s published-name roster stays `PRESENT` at 292 of 292.
2. `7b09b8edd`: **ratchet rebind 3056459 → 3055377 (−1082 B)**, measured on a git-archive build
   of `d464304d7` (`gates-archive-merged/`). The bytes come from those two changes, the only `src` difference; every entry's
   gzipped import closure is byte-identical to fix seat 12's measure of the pre-merge tip
   (`gates-archive-merged/sizes.txt` against `fix-12/logs/sizes.txt`), so the CHANGELOG's size
   lines stand.
3. `1dca81ae4`: the records earlier seats left untracked (185 files under this folder, among them
   the orchestrator's notes after critiques 1 and 2), so the tree is clean.
4. This record (its own commit).

## The battery (release.yml's checks, exit codes)

On a `git archive` of the committed tree, inside the worktree at `.cache/close-1111/tree`, deleted
after. The archive takes what release.yml's sparse checkout takes: every top-level path but
`docs/`, and the eight docs files its list names (`archive-gates.sh` reads the list from the
workflow). `node_modules` links the worktree's.

| step | `gates-archive-merged/` @`d464304d7` | `gates-archive-final/` @`1dca81ae4` |
|---|---|---|
| version = 11.1.1; `dist-tag.mjs 11.1.1 11.1.0` → `latest` (registry `latest` 11.1.0) | 0 | 0 |
| `prepare` (npm ci's build) | 0 | 0 |
| `npm run typecheck` | 0 | 0 |
| `npm run build` + `dist/index.d.ts` | 0 | 0 |
| `npm run verify:package` | **1**: `G-BUNDLE-RATCHET … shrink 3055377 < 3056459` | 0, `CLEAN`, 197 claims, roster 292/292, ratchet equal at 3055377 |
| `npm run demo:dist:build` | 0 | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 282 files, 2524 passed, 5 expected fail, 1 skipped | same |

`1dca81ae4` and this record's commit differ only under `docs/release-11.1.1/`, which the archive
does not take. The vitest count is lower than critique 12's (285 files, 2600 passed) by master's
deleted demo tests.

## scripts/release.sh's browser half

On the worktree at `7b09b8edd` (`gates/`; the exits gate at `1dca81ae4`, the same source), in
release.sh's order, own servers on 5351 and 5352:

| step | exit | reading |
|---|---|---|
| `npm run typecheck`, `npm run build` | 0, 0 | |
| `CI=true npm test -- --maxWorkers=2` | 1, then 0 | the boot-graph gate's freshness arm: the worktree's `dist-demo/` predated the merge's demo sources. release.sh runs `npm test` without building the demo; after `npm run demo:dist:build` in the worktree it passes, 2524 passed (`gates/worktree-test-ci.log`). |
| `npm run verify:package` | 0 | `CLEAN`, ratchet equal |
| `npm run test:browser` | 0 | 2 files, 12 passed |
| `gate:pixel-floor` | **1** | `RED (--expect=green)`: all three floors fail on "the aurora/blob renderer badge never reached data-state=\"ready\"", the badge absent from the page |
| `gate:pixel-floor:planted` | **1** | "PLANTED DEFECT FAILED THE WRONG ASSERTION … the harness broke, the floor did not bite" (the same badge) |
| `gate:pixel-floor:planted:flood` | **1** | the same |
| `gate:exits` | **1** | stopped after its first part (`set -e`): Chromium 390, 35 passed, 3 skipped, **3 failed** (the CommandDialog cells) |

### Defect 1: the pixel floor reads a badge master's demo no longer has

- `substrate-paints-color.spec.ts` waits on `output.renderer-status[data-renderer]` reaching
  `data-state="ready"` and reads `data-renderer` as `webgl2`, for the aurora (`:435`) and the blob
  (`:683`), before it reads a pixel. The badge was `RendererStatus.vue` in the substrate studio
  frame. Master's `e4361f2ee` ("the old studio frame and the specs pinned to removed pieces go")
  deleted the frame and ten specs pinned to it, but not this one, which reads only the badge.
  No page of the merged demo shows renderer status (the components still emit `rendererStatus`).
- A/B, the green leg as the gate runs it, then `pi-gate-verify --expect=green` (`pf-ab.sh`,
  `suite/ab/`): the **pre-merge tip `540e1e79e`: GREEN**, "3 floors ran on the live paint path
  and passed"; **master's tip `48bebb122`: RED**, the same three badge errors as the branch.
- It is master's, and it blocks every tag cut from master or from a branch that merges it.
- The cure is not the close's to build: the floor needs the renderer's state on the page again,
  which is a demo change (a projection of the stage's `rendererStatus` emit that the floor reads),
  or the floor is restated to read it some other way. Either is a ruling for the orchestrator
  and the demo's owner; then master is merged again and the three legs re-read.

### Defect 2: the exits gate's CommandDialog cells drive a page master rebuilt

- Six cells per project (three routes, three standing) open the demo's own palette at
  `/containers/command` through a button labelled "Open palette". Master's rebuilt Command page
  shows its palette inline; a "Shown" control sets it "In a dialog", and a "Search commands"
  button then opens it. On the merged tree each cell waits 60 s for a button that is not there.
- Restated, the cells set the control and press the new button (`exits/commanddialog-restate.patch`,
  kept here and not applied to the spec; read on the tip and on a red tree of master's tip, which is 11.1.0's source with
  the rebuilt demo and HEAD's specs, `exits/tree.sh`, `exits/logs/cmd-*`):

| route | 11.1.0 source (master's tip) | the branch |
|---|---|---|
| escape, outside (routes and standing) | RED in all four projects, on "the list is mounted while the plate is seen" | GREEN in all four (WebKit 390's outside route skipped, as the spec says) |
| pick (route and standing) | RED, the same | **RED in all four**, on "the plate keeps its height" and "no frame carries more than a fifth" |

- **What the pick reads on the branch.** The list stays mounted through the exit (row 7's cure
  holds). The plate falls from 435 to 119 px at 390, in the frame the dialog's state turns
  closed. Reka's `ComboboxInput` writes the picked item's value into the input's model when the
  selection changes (`resetSearchTermOnSelect`, on by default;
  `node_modules/reka-ui/dist/Combobox/ComboboxInput.js:93-107`). The rebuilt page binds that
  model to the query its `CommandRows` filters by, so the list narrows to the picked row as the
  dialog closes. The old page's rows were a fixed list that reka filtered, and the same cell
  passed there on the branch (critique 12's gate).
- So the restatement is not enough on its own: on the rebuilt page a palette that closes by a
  pick still drops its plate, by a path row 7 did not name and 11.1.0 shares. A ruling is owed:
  hold the query through the exit in `Command` (a library change), or witness the pick on a
  palette whose rows do not follow the query.

### The exits gate's other cells

With the CommandDialog cells left out (`--grep-invert CommandDialog`), the other fifteen parts
ran on the merged tip as `gate.sh` splits them (`exits/rest.sh`, `exits/logs/tip-*`), each through
its own guarded run: **every part exits 0**, and every count equals critique 12's less the
CommandDialog cells.

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 35 + 3 skipped (+3 CommandDialog failed) | 33 + 11 skipped | 38 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 25 + 13 skipped | 43 + 1 skipped | 41 | 18 |
| WebKit 390 | 23 + 15 skipped | 33 + 11 skipped | 25 + 16 skipped | 16 + 2 skipped |
| WebKit 1440 | 25 + 13 skipped | 43 + 1 skipped | 41 | 18 |

## The visual suite

The 11.1.0 close's lists (`docs/release-11.1.0/close/lists`), less the 21 spec files master
deleted (`lists/removed.txt`; 33 of 11.1.0's failing Chromium titles and 33 coarse-touch ones
were in them), compared by title against the 11.1.0 close's branch sets
(`docs/release-11.1.0/close/suite/<project>-failed-titles.txt`).

**Where it ran.** The worktree is a sparse checkout without `docs/tranches/`, and specs that read
it fail there: `ch-part-ad`'s whole process stopped at collection on
`coherence-congruence.spec.ts` reading `docs/tranches/BG/…`, and `_capture_css` could not write its
capture. So WebKit, the release specs and Chromium's chunks aa, ab, ac, ae and af ran in the
worktree, those chunks' 48 branch-only titles ran again on a full `git archive` tree of HEAD with
its docs (`ch-env`: 47 failed again, `_capture_css` passed), and every later chunk ran on that
tree (`.cache/close-full/head`, deleted after). The worktree runs' stray outputs under
`docs/tranches/` were removed and the sparse checkout reapplied.

| project | ran | branch failing | 11.1.0 close failing | branch-only | resolution |
|---|---|---|---|---|---|
| WebKit 2287, 7 files (`wk-proj`) | whole | 4 (264 passed, 12 skipped) | 4 (266, 10) | 3 | below |
| WebKit release specs (`wk-rel`) | whole | 0 (11 passed) | 0 | 0 | |
| Chromium release specs (`ch-rel`) | whole | 0 (179 passed) | 0 | 0 | |
| coarse-touch release specs (`co-rel`) | whole | 0 (162, 17 skipped) | 0 | 0 | |
| chromium-headless-new, 12 chunks | whole | 439 | 450 | **124** | all 124 fail on master's tip with the same first error |
| coarse-touch, 12 chunks | **chunk aa only** | 18 | (aa's share) | 4 | all 4 fail on master's tip in Chromium with the same first error |

- **Chromium.** The 124 branch-only titles (`suite/ch-branch-only.txt`) ran on a full tree of
  master's tip `48bebb122`, which is 11.1.0's source with the rebuilt demo, in one process
  (`suite/resolve/ch-master.*`): **124 failed**, and for each the first error line, numbers and
  ports normalised, equals the branch's (`scripts/errs.py` → `suite/resolve/ch-errs.txt`: 124
  same, 0 differ). None passes on master's tip, so none needed the pre-merge tree. They are the
  rebuilt demo's: markers and specimens it retired (the aurora atoms surface, the auth shell's
  form, the constellation exhibits, the design and display-tracking specimens, the vertical pill
  strip, the square avatars), readings on pages it re-laid (the dock's chrome page, the
  paper-glass page, the pager's counter, the hand voice's bands, an overlay's pad), and
  60-second waits for elements no page holds. 42 spec files; the most are `glass-legibility` 9,
  `handmark` 8, `pager-ring` 8, `menu-glass` 7, `adaptive-glass-live` 6.
  `substrate-paints-color`'s three are defect 1 again. None is the branch's.
- **WebKit.** `aurora-swraster` "fallback ground matches the composite reference" (light, dark):
  the served-app sentinel finds no `[data-aurora-atoms-surface]` on `/substrates/aurora`; on
  master's tip it fails the same way (`suite/resolve/wk-master.*`). `release-10-1-5` "fix 12,
  coarse phone › t1 O-201 vertical": the page navigated under the spec ("Execution context was
  destroyed") in `wk-proj`; on master's tip both of its describe blocks pass, and its re-read on
  the branch, three times, is the run the guard refused. **It is not resolved.** The two more
  skips are `safari-webgl`'s glass-surface cells, skipped by the spec's own condition ("no
  glass-tier surface on the route"), on the route master re-pointed.
- **coarse-touch.** Chunk aa: 35 passed, 18 failed; its four branch-only titles (two
  `_prim-polish-capture` scrims, `_cohere-debug`, `_egg-capture` E4) failed on master's tip in
  Chromium with the same first error. Chunks ab to al were not read: the queue stopped for the
  zone and the disk (above).
- **Of the titles read, none fails on the branch that passes on master's tip**, except the one
  WebKit title left unresolved. Every other branch-only failure arrives with master's demo.

## Row ids in `src` comments

`git diff v11.1.0 HEAD -- src` adds 1,250 lines (`static/src-added.txt`). Searched for this
release's ids (`O-3xx`, `O-4xx`, `LT-n`, `K1` to `K4b`, `RU-n`, "row n", "11.1.1", the scope's
name) and for letter-and-number ids, dates, versions and the internal words (tranche, critique,
critic, seat, orchestrator, witness, scope, ruling, owner, probe, film, plant, gate, the
consumers' names): **none in an added line** (`static/src-id-grep.txt`: seven hits, each the
code's own vocabulary, "round it", a dock seat, CSS keyframes). Over all of `src`, the ids found
(`static/src-row-id-grep.txt`) are all in v11.1.0 already (K1 in three glass files, "relay row 3"
in `command/styles.css`, grid rows in the configurator).

## Sizes

The final archive's pack (`gates-archive-final/sizes.txt`), every entry's gzipped import closure
against the registry's 11.0.2 and 11.1.0 (critic 6's `sizes.py`, critique 12's verified
tarballs): identical to the merged build's and to fix seat 12's. The dock entry is 38,673 bytes
in 11.0.2, 40,541 in 11.1.0 and 40,533 here, as the CHANGELOG says.

## The tree

- The worktree is a sparse checkout without `docs/tranches/` (as release.yml's checkout is).
  The worktree's early chunks wrote five tracked PNGs, eight untracked files and sixteen ignored
  ones there; the tracked ones were restored from HEAD and `git sparse-checkout reapply` run, the
  rest removed
  (`suite/wt/worktree-dirt.txt`, `suite/wt/ignored-outputs.txt`).
- Trees made here (`.cache/close-1111`, `close-full/{head,master,premerge}`, `close-red`,
  `close-ab`) were deleted after their runs. The earlier seats' `.cache` trees are left as they
  were.
- No server or browser of this seat is left; ports 5351 to 5356 are free.
- **The CHANGELOG heading stays "11.1.1 — unreleased".** The release is not cut, so it has no
  date; the close that finds it ready sets it.

## What the release needs before a tag

1. **A ruling on the merge.** Either master is cured first (the pixel floor reads the
   renderer's state from the page again, the exits gate's CommandDialog cells drive the rebuilt
   Command page) and merged again, or 11.1.1 is cut from the pre-merge tree, where critique 12
   read every gate green and the pixel floor reads GREEN (`suite/ab/pf-premerge.*`), and master
   takes the release after.
2. **The CommandDialog pick** (defect 2): hold the palette's query through its exit, or witness
   the pick on a palette whose rows do not follow the query.
3. **The rest of the visual suite**: coarse-touch's chunks ab to al, and the WebKit title
   `release-10-1-5` t1 (coarse phone) alone and repeated on the branch, once the zone and the
   disk allow. Then the CHANGELOG date and the tag.

## Open gaps

A. **The worktree is a sparse checkout without `docs/tranches/`.** Specs that read or write
   there fail in it (the suite's `coherence-congruence`, `_capture_css` and the captures under
   `docs/tranches/*/audit`). The next close runs the suite on a full tree, as this one did after
   its first five Chromium chunks.

B. **`release.sh` runs `npm test` with whatever `dist-demo/` the tree holds.** After the merge the
   worktree's was older than the demo's sources and the boot-graph gate's freshness arm failed
   until `npm run demo:dist:build` ran. release.yml builds the demo before its test step;
   release.sh does not.

C. **The queue's own refusal check matched the guard's warning line** ("only a REFUSED line stops
   a run") and stopped the first queue after `wk-proj`; it now matches `^[guarded] REFUSED`. The
   11.1.0 close's `queue.sh` has the same check.

D. **Killing a queue kills its running step** (the guard ends a run whose caller died). The first
   full-tree `ch-part-ad` was lost that way and run again.

E. **Carried from critique 12** (A to N), unchanged: row B's WebKit drag, the ResizeObserver
   loop lines on the exits harness, the frost note's 0.02, the phone Tooltip's route, the
   tooltip ruling's record, rows that came after the scope closed, kept internal ids in edited
   comments, the stale table in `motion-registers.css`, the Toast's blurred release, the README's
   toast reversal line, the release-10-1-5 critic and fix specs (582 WebKit tests, not run here
   either), "smallest honest height", films other than `startFilm`'s, and critique 8 to 11's
   carried list.

## Deliberate changes made here

- The merge of master (`d464304d7`) and the ratchet rebind (`7b09b8edd`).
- The earlier seats' untracked records committed (`1dca81ae4`).
- No source, spec or CHANGELOG change. The CommandDialog restatement is a patch in this folder,
  not applied.
