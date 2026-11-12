# 10.1.5 release close: battery run, NOT ready to tag

Seat: release close, claude-opus-5-5, 2026-11-11, branch `release/10.1.5`. Source under test:
`f1da04511` / `ada7d8a8b` (identical `src`, `tests-visual` and package; `ada7d8a8b` adds CHANGELOG
prose and a driver line). Every build, test and browser run went through `guarded` (WebKit 2287
under `--exclusive webkit`), one at a time. **None was refused.** No tag, push or publish.

## Verdict

Every check `.github/workflows/release.yml` runs passes locally on the committed tree, and the
pixel floors are GREEN with both plants biting. **The visual suite has 10.1.5-only failures**, so
the cut is not ready to tag:

1. **O-101 family, a 10.1.2 contract (both engines, coarse too).** On a horizontal dock whose run
   overflows at one width and fits at the other, a collapse reversed into an expand across a
   viewport change has one morph frame that reserves 7 px more than the endpoint it settles at:
   - `release-10-1-2.spec.ts` "O-101a · a host change during the morph · reversal (390->1440)":
     983 against the settled 976 (Chromium, WebKit 2287), 1063 against 1056 (coarse-touch).
     A/B, 6 repeats: Chromium branch 5/6 failed, v10.1.4 6/6 passed; WebKit branch 6/6 failed,
     v10.1.4 6/6 passed (`ab/o101a-*`, the cell's spec and harness unchanged since v10.1.4).
   - "O-101 · horizontal · reversal · the expanded endpoint follows the pane (1440->390)" and
     "(390->1440)": 167 vs 160 and 599 vs 592 (WebKit), 179 vs 172 and 647 vs 640 (coarse). A/B in
     WebKit, 6 repeats each: branch 12/12 failed, v10.1.4 12/12 passed (`ab/o101rev-*`). Chromium
     fine passes them on the branch.
   - A lead, not verified: the 7 px is about one run reserve box (`--dock-run-reserve-inline`,
     the ring reserve at hover scale, `run.css:141-150`). At the overflowing width the run keeps
     its full reserve boxes; at the fitting width `data-run-fits` yields them
     (`dockMorphMeasure.ts:277-335`, `run.css:398-425`). A reversal that crosses the fit edge
     appears to measure one frame before the flag re-reads.
   - The critics' g6 gates were `release-10-1-3` and `release-10-1-4`. `release-10-1-2` was not
     on their list, so this family was unwitnessed until now.
2. **A stale 10.1.2 witness on touch (coarse-touch only).** "D-1 · a disabled DockTrigger paints
   disabled and takes no hover or press fill" (1440 and 390, dark and light) fails at its own
   precondition, "the enabled trigger's hover fill". O-161 now puts every dock seat's hover under
   `@media (hover: hover)`, so a touch project gets no hover fill by design. A/B, 2 repeats: branch
   8/8 failed, v10.1.4 8/8 passed (`ab/d1-*`). The paint is the intended cure. The witness needs a
   pointer that hovers, or to read only the disabled arm on touch. It is still a 10.1.5-only red,
   and the owner rules on it.

Not 10.1.5 defects (branch-only in the whole-suite pass, GREEN on both trees alone):
`search.spec.ts`'s four titles (a 60 s `locator.click` timeout on the rail in the suite's own
process; A/B 8/8 and 8/8 in Chromium and in coarse-touch), and `safari-webgl.spec.ts`
"/substrates/aurora (dark)" (a `page.goto` timeout; A/B 4/4 and 4/4 in WebKit 2287).

## Battery (exit codes)

| step | where | result |
|---|---|---|
| version = 10.1.5 | archive, worktree | exit 0 |
| `prepare` (npm ci's build) | archive | exit 0 |
| `npm run typecheck` | archive, worktree | exit 0 |
| `npm run build` (+ `dist/index.d.ts` present) | archive, worktree | exit 0 |
| `npm run verify:package` | archive, worktree | exit 0, terminal CLEAN, ratchet PRESENT datum 2955434 = unpacked 2955434 (no rebind) |
| `npm run demo:dist:build` | archive, worktree | exit 0 |
| vitest `--maxWorkers=2` (`npm test`) | archive, worktree | exit 0, 247 files, 2397 passed, 10 expected fail, 1 skipped |
| `gate:pixel-floor` (aurora, real GPU) | worktree | exit 0, GREEN, 3 floors |
| `gate:pixel-floor:planted` | worktree | exit 0, GREEN self-test, 2 floors RED on the plant |
| `gate:pixel-floor:planted:flood` | worktree | exit 0, GREEN self-test, blob ceiling RED on the plant |
| visual suite, chromium-headless-new | worktree | 1837 tests: 452 failed, 55 skipped, 1330 passed |
| visual suite, coarse-touch | worktree | 1255 tests (every spec but the release-10-1-5 probes): 457 failed, 64 skipped, 734 passed |
| visual suite, webkit (2287) | worktree | 280 tests: 5 failed, 10 skipped, 265 passed; `release-10-1-5` 107/107 (84 + 23) |

- "archive" is `git archive HEAD` under `.cache/close/`, given its own one-commit repo whose index
  matches the branch's (the comment census reads `git HEAD`). It stands for CI's fresh checkout.
  The symlinked install stands for `npm ci`: the lockfile differs from the main checkout's only in
  the version field. Run at `f1da04511` (`logs/gates-archive-head/`) and again at `ada7d8a8b`
  (`logs/gates-archive-final/`).
- g6 holds: `release-10-1-4` and `release-10-1-3` pass in Chromium (af-1) and WebKit 2287
  (wk-rest).

## Comparison against v10.1.4, by title set

The v10.1.4 tree (`git archive v10.1.4`) ran its own specs over every spec file with a branch
failure, in each project (`suite/base-*`). Every branch failure's title exists at v10.1.4.

| project | branch failures | shared with v10.1.4 | branch-only | adjudicated 10.1.5-only |
|---|---|---|---|---|
| chromium-headless-new | 452 | 447 | 5 | 1 (O-101a reversal 390->1440); search x4 GREEN alone |
| coarse-touch | 457 | 446 | 11 | 7 (O-101a, O-101 reversal x2, D-1 x4); search x4 GREEN alone |
| webkit | 5 | 1 (`aurora-swraster` capture hang) | 4 | 3 (O-101a, O-101 reversal x2); aurora dark GREEN alone |

Title sets: `suite/branch-fails.tsv`, `suite/v1014-fails.tsv`, `suite/compare.txt`; reports and
logs are gzipped beside them (`suite/*.json.gz`, `*.log.gz`).

## How it ran

- Drivers: `scripts/close-gates.sh`, `close-floors.sh`, `close-queue.sh` over `close-suite.sh` and
  `close-wk-half.sh`, A/B with `close-cell.sh`, `close-ab.sh` and `close-ab-o101a.sh`; title sets
  with `close-summary.py` and `close-compare.py`. Every run is in `suite/runs.txt`,
  `suite/queue.txt` and `ab/ab.txt`.
- Each Playwright process has its own demo server: `GLASS_UI_DEMO_URL` http://localhost:5311
  (branch), 5312 (v10.1.4), 5313 and 5314 (WebKit).
- The chunk `ch-af` (666 tests, the release specs and the critic probes) would have outrun one
  90-minute call. I stopped it by PID after 50 minutes and re-ran it as `af-1` to `af-4`.
  Stopping the first queue's shell also ended `ch-ag`, re-run as `ch-ag2` (critic-9b and 9c moved
  to `af-4`).
- The critic probes' v10.1.4 arms import `tests-visual/release-10-1-5/v1014/`. That copy was
  placed for `af-1` to `af-4` and removed after. It is no longer left untracked in the tree
  (recreate it with `git archive v10.1.4 src demo | tar -x -C tests-visual/release-10-1-5/v1014`).
- The coarse-touch project ran every spec except the release-10-1-5 critic, fix and d1 probes.
  Those build their own coarse cells and ran in chromium-headless-new.
- The first `base-chromium-1` started with no file list (the list path resolved inside the
  v10.1.4 tree). I stopped it by PID, fixed the path and re-ran it.
- The suite's capture specs rewrote 528 tracked files and left 198 untracked. All were restored or
  removed after the runs; the archive trees under `.cache/close/` are deleted.
- Not measured: real Safari. Every WebKit cell is Playwright WebKit 2287.

## Also in this close

- The CHANGELOG cut date is 2026-11-11. The 10.1.5 header names the dock's four new measured
  properties and `data-run-fits`, and the round-7 behaviour cures (O-161, O-162, O-176, O-177)
  have entries (critique 16, For INBOUND). Prose only.
- Fix 8's `try-d1` report and a stray p1 report, written to `tests-visual/` by relative paths,
  now sit under `fix-8/` and `close/stray/`.
