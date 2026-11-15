# 11.0.2 release close: battery run, ready to tag

Seat: release close, claude-opus-5-5, 2026-11-15, branch `release/11.0.2` in
`.claude/worktrees/release-11.0.2`. Every build, test and browser run went through `guarded`
(each WebKit run under `--exclusive webkit`), one heavy run at a time, `--workers=1`, vitest at
`--maxWorkers=2`. **No run was refused.** No tag, push or publish. Paths are relative to
`docs/release-11.0.2/close/` unless they start with `src`, `tests`, `tests-visual`, `../` or `/`.
The method is the 11.0.1 close's (`../../release-11.0.1/close/close.md`), with its scripts
adapted in `scripts/`.

## Verdict

Every check `.github/workflows/release.yml` runs passes on a `git archive` tree of the committed
tip and again in the worktree. The bundle ratchet is equal on the committed tree, so it was not
rebound. The pixel floors are GREEN, and both plants bite. **No visual-suite title fails on the
branch that passes on v11.0.1.** Three WebKit cells failed once in the whole-project run, each
on a `page.goto` that never reached `load`. Each passes 6 of 6 alone on the branch and on
v11.0.1 (below). The CHANGELOG claims none of the three rows the orchestrator moved to 11.1.1.

## Read first

- `../orchestrator-note-after-critique-4.md` (binding) and the eight other
  `../orchestrator-note-*.md`. Critique 4 is the last critic round.
- **Master has not moved** in `src`, `scripts`, `.github`, `package.json`, `package-lock.json`,
  `tests` or `tests-visual` since the merge base `a09920ff6` (`git log a09920ff6..master` over
  those paths is empty). The branch already carries master's browser-free and sparse-checkout
  workflows (`b42405920`), so no merge was made. `release.yml` and `scripts/dist-tag.mjs` are
  master's. `node scripts/dist-tag.mjs 11.0.2 11.0.1` gives `latest`, because 11.0.2 is greater
  than the registry's latest.

## The CHANGELOG

- **Cut date** 2026-11-15 (`4a56e77ef`), the day this close finished.
- **The three moved rows are not claimed.** Nothing in the entry says a dock row no longer
  overflows beside a persistent region (O-271). Nothing says the vertical dock's first expand
  frame is round in WebKit (critique 4's D-1). Nothing says the fold keeps content inside the
  plate or avoids a one-frame opacity drop (O-288).
  - One sentence came in with the commit that carried O-300 (a) and O-288 together (`46ec8d30f`),
    at the end of "A control you place in a dock keeps its own transitions": "While the dock
    folds or unfolds it sets its controls' opacity and scale on every frame, and their own
    transitions resume once it settles." It describes how the shipped O-300 (a) source keeps a
    control's own `transition` from tweening the fold's per-frame writes. It makes neither of
    O-288's claims, so it stays.
- **Outward prose.** The entry has no internal id, consumer name, seat or round (grep, 0 lines),
  and holds one em dash, in its heading.

## Battery (exit codes)

`logs/gates-archive` ran on a `git archive HEAD` tree at `b11a018e5`, which stands in for CI's
fresh checkout. The tree had its own one-commit repo, the worktree's `node_modules` behind a
symlink, and was deleted after (`.cache/close/`). `logs/gates-final` ran in the worktree at the
same commit, after the suite. Between `b11a018e5` and the commit that carries this record, only
files under `docs/release-11.0.2/close/` changed, so no package byte moved.

| step (`scripts/gates.sh`) | archive | worktree |
|---|---|---|
| version = 11.0.2 | 0 | 0 |
| `prepare` (npm ci's build) | 0 | 0 |
| `npm run typecheck` | 0 | 0 |
| `npm run build` + `dist/index.d.ts` | 0 | 0 |
| `npm run verify:package` | 0, CLEAN | 0, CLEAN |
| `npm run demo:dist:build` | 0 | 0 |
| `CI=true npx vitest run --maxWorkers=2` (`npm test`) | 0, 278 files, 2535 passed, 10 expected fail, 1 skipped | same |
| `npm run test:browser` (release.sh) | 0, 2 files, 12 passed | same |

- **Bundle ratchet.** It reads PRESENT on both runs. The datum 2916380 equals the unpacked
  content bytes, 2916380, so no rebind was needed and none was made. The pack sha256 is
  `e50182616307…` on both runs.
- **Pixel floors** (`floors/`, real GPU, worktree, own server on 5345). `gate:pixel-floor` exit
  0, GREEN, 3 floors. `gate:pixel-floor:planted` exit 0, a GREEN self-test with 2 floors RED on
  the plant. `gate:pixel-floor:planted:flood` exit 0, a GREEN self-test with the blob ceiling RED
  on the plant. The three machine reports are banked beside the logs.
- **The browser-free rule.** `CI=true` was set for the vitest run, as the orchestrator's note
  asks. `tests/gates/ci-browser-free.test.ts` and `ci-sparse-checkout.test.ts` fall inside
  vitest's include and among the 278 files that pass. `test:browser` ran once, locally.
- `prepublishOnly` is `typecheck && build && test`, and all three ran as above.

## Visual suite

Each Playwright process brought its own vite through the config's `webServer`. Chromium and
coarse-touch ran on 5341, WebKit on 5343 and v11.0.1's tree on 5344, each with
`GLASS_UI_DEMO_URL` set. The chunks are the 11.0.1 close's: the twelve `part-a?` lists, and `rel`
with this release's two specs added (`release-11-0-2.spec.ts`, `slider-forced-colors.spec.ts`).
Every run is one line in `suite/runs.txt`, every guarded call one line in `suite/queue.txt`, and
the reports and logs are gzipped beside them.

| project | tests | passed | failed | skipped | 11.0.1 close failed | branch-only |
|---|---|---|---|---|---|---|
| chromium-headless-new | 1387 | 900 | 442 | 45 | 455 | 0 |
| coarse-touch | 1387 | 865 | 448 | 74 | 458 | 0 |
| webkit 2287 (7-file project) | 280 | 266 | 4 | 10 | 11 | 3, harness, below |
| webkit 2287, release-11-0-1 config (11.0.1 + daraksha) | 11 | 11 | 0 | 0 | | |
| webkit 2287, release-11-0-2 config (11.0.2 + forced colours) | 57 | 54 | 0 | 3 | | |
| webkit 2311, release-11-0-2 config (11.0.2) | 54 | 51 | 0 | 3 | | |

The title sets are `suite/<project>-failed-titles.txt`, built with the v11.0.0 baseline's
pipeline (`../../release-11.0.1/close/scripts/summary.py`) and compared with `comm` against the
11.0.1 close's branch sets (`scripts/compare.sh`, output `suite/compare.txt`). The 57 tests the
Chromium projects gained over 11.0.1's 1330 are this release's two specs. All of them pass in
both projects, apart from the cells they skip by design.

### Titles that fail on 11.0.1 and pass here

- Chromium and coarse-touch, and WebKit: the eight `release-10-1-2.spec.ts` "O-101 ·" reversal
  and mid-expand cells, restated to read the painted frame (`6c4910229`, the O-266 row).
- Chromium: the four `radius-scale.spec.ts` circle titles and `motion2.spec.ts`'s substrate cell
  (coarse: the two collapsed-dock titles). The 11.0.1 close restated and renamed these after its
  suite ran, so they were already green on the tagged 11.0.1.
- WebKit: `release-10-1-4.spec.ts` "page.pdf …" and `release-10-1-5.spec.ts` "q2 O-187 at 1440",
  the two harness hangs the 11.0.1 close resolved. Both pass in this run.

### Branch-only failures, each resolved: three WebKit load hangs

1. `release-10-1-3.spec.ts` "10.1.3 · 430 · right-anchored … O-110 · a click on the anchored
   persistent seat of a collapsed dock reaches it" (test 93 of 280).
2. `release-10-1-5.spec.ts` "e1 at 390: a label-wide tab under the pointer gives the run no
   reach and cuts no corner" (test 183).
3. `safari-webgl.spec.ts` "viz paints + does NOT flash on this engine — /substrates/blob (dark)"
   (test 275).

Each failed in the whole-project run as `page.goto: Test timeout of 60000ms exceeded`: the page
never reached `load`, so no assertion ran. The same describe's other widths and themes passed
on either side of each one. Alone, at `--repeat-each=6` with the three specs and both configs
byte-equal on the two trees (`scripts/wk-alone.sh`):

| tree | run | result |
|---|---|---|
| branch | `wk-alone-branch` | 24 passed (the four matching titles, the coarse-phone e1 among them, six times each) |
| v11.0.1 (`.cache/red-v11.0.1/tree`, `src` byte-equal to `git archive v11.0.1 src`) | `wk-alone-v1101` | 24 passed |

This is the harness class the 11.0.1 close recorded: a `page.goto` that hangs late in a long
WebKit 2287 run, on a different cell each time. None of the three specs changed in a way that
touches these cells: `release-10-1-3` and `safari-webgl` are unchanged since v11.0.1, and
`release-10-1-5` only lengthens the m3 idle wait for the six-second window. These are load
flakes, not regressions.

### Known items, shared with v11.0.1

- WebKit `aurora-swraster.spec.ts`'s capture-mount cell fails, as on v11.0.0 and v11.0.1.
- On coarse-touch, the two `release-10-1-3.spec.ts` D-1 summary-glyph cells fail, as on v11.0.0
  and v11.0.1.
- **The vertical dock's first WebKit expand frame** (critique 4's D-1, in
  `release-11-0-1-critic-2.spec.ts`) is 11.0.1's own by the binding ruling and moves to 11.1.1.
  Like the 11.0.1 close, this close does not run the round critics' specs, so no title in this
  suite carries it. Critique 4 measured it at 1 of 10 on the tip and 5 of 10 on v11.0.1.

### The release specs

- `release-11-0-2.spec.ts` and `slider-forced-colors.spec.ts`: GREEN in Chromium and coarse-touch
  (in `rel`), WebKit 2287 54 passed with 3 skipped, and WebKit 2311 51 passed with 3 skipped.
  This includes the `hover ·` cell that lost its window in critique 4's sweep.
- `release-10-1-5.spec.ts`: Chromium and coarse-touch GREEN, WebKit 106 of 107 in the project
  run, plus e1 at 390 6 of 6 alone (item 2).
- `release-10-1-2.spec.ts`: GREEN in all three projects, the eight O-101 cells included.
- `release-11-0-1.spec.ts` and `-daraksha.spec.ts`: GREEN in all three projects.
- `release-10-1-3.spec.ts` and `-10-1-4.spec.ts`: GREEN apart from the known coarse D-1 pair and
  WebKit item 1.

## Also in this close

- **The WebKit lock.** The queue first put the WebKit legs right after the archive gates.
  `wk-112` waited 11 minutes for the `webkit` lock, which another repository's run held. I
  stopped that waiting call and its queue by PID before anything ran (its guard log is
  `suite/wk-112-lockwait.guard.log.gz`) and queued the Chromium and coarse chunks first. The
  WebKit legs waited again at 05:25 and started at 05:50, when the lock was released.
- **One killed run.** The first `co-rel` (01:08) was killed about 22 minutes in. guarded logged
  "caller died" when the session's background shell ended (exit 144). Its partial log is
  `suite/co-rel-killed.log.gz`. The queue was restarted detached from `co-rel`, and every number
  above comes from the complete re-run.
- **Tree.** The suite rewrote 220 tracked PNGs under `docs/tranches` and left 133 untracked files
  there (all written between 02:31 and 05:23 today), plus a stray
  `.cachenested-backdrop-budget.json` at the root. These were restored with
  `git checkout -- docs/tranches` and removed with `git clean` on those paths. The archive trees
  under `.cache/close/` are deleted. The `.cache/red-*` trees are earlier seats' and are ignored.
- Not measured: real Safari. Every WebKit cell is Playwright WebKit 2287, or 2311 where named.
