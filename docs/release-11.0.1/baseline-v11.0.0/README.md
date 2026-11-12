# v11.0.0 visual-suite baseline for the 11.0.1 close

The v11.0.0 side of the close's failure comparison: the visual suite run on a `git archive v11.0.0`
tree, once, on 2026-11-11 (16:14 to 20:46 EST). Seat: claude-opus-5-5. All three projects ran in
full; nothing here needs recomputing.

## Counts

| project | tests | passed | failed | skipped | spec files with a failure | title set |
|---|---|---|---|---|---|---|
| chromium-headless-new | 1212 | 717 | 450 | 45 | 108 | `chromium-headless-new-failed-titles.txt` |
| coarse-touch | 1212 | 699 | 456 | 57 | 110 | `coarse-touch-failed-titles.txt` |
| webkit (build 2287) | 173 | 153 | 10 | 10 | 3 | `webkit-failed-titles.txt` |

"Failed" is Playwright status `unexpected` (failed, timed out); `retries: 0`, so nothing is `flaky`.
444 titles fail in both Chromium projects.

## The title-set format

One line per failing test, `LC_ALL=C sort -u`: `<spec file relative to tests-visual/>` TAB
`<describe path > test title>`, the project left out because the file names it. Built from the JSON
reports with `scripts/summary.py fails` (a copy of the 10.1.5 close's `close-summary.py`), keeping
columns 2 and 3:

```
python3 -I scripts/summary.py fails reports/<project>/*.json | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u
```

Run the same pipeline over the 11.0.1 branch's reports and `comm -13 baseline branch` gives the
branch-only failures.

## What ran

- **Tree.** `git -C /Users/mkbabb/Programming/glass-ui archive v11.0.0 | tar -x -C .cache/baseline-v11.0.0/tree`;
  v11.0.0 is commit `dd5c8db749035afe00a641fad923c871ba5a422d` (tag object `60ce8d49f`).
  `node_modules` is a real directory of per-entry symlinks into the main checkout's `node_modules`
  (the `@mkbabb/glass-ui-tests-visual` workspace link re-pointed at the tree's own `tests-visual`).
  It is not one whole-directory symlink, so vite's dep cache (`node_modules/.vite`) stayed in this tree and never
  rewrote the shared cache the merge seat's servers use. v11.0.0 and master have identical
  `package.json`, `package-lock.json` and `tests-visual/package.json`. `tests-visual` has no
  `node_modules` of its own.
- **Build.** `npm run build` then `npm run demo:dist:build` in the tree (one guarded call; both
  exit 0; `reports/build.log`, `reports/demo-dist.log`).
- **Server.** Each Playwright process started its own vite dev server through v11.0.0's
  `tests-visual/playwright.config.ts` `webServer` (`npm run dev -- --host localhost --port <PORT>`,
  cwd the tree), with `GLASS_UI_DEMO_PORT`/`GLASS_UI_DEMO_URL=http://localhost:<PORT>` exported so the
  specs' own fallbacks (5199, 5174) were never reached. Port 5321 for the Chromium projects, 5323 for
  WebKit. Each server stopped with its process; nothing listens on either port now.
- **Suite.** The suite as `scripts/release.sh`'s pre-tag review defines it ("the existing visual
  suite once, including its WebKit/Safari project"): v11.0.0's `tests-visual/playwright.config.ts`,
  projects `chromium-headless-new` and `coarse-touch` (each matches all 179 `*.spec.ts`
  files, 1212 tests), and `webkit` through `tests-visual/webkit-2287.config.ts` (the project's
  6-file `testMatch`, 173 tests). `release.yml` runs no visual project (its `npm test` is the library
  suite, and it installs Chromium only). The pixel floors (`gate:pixel-floor`, `:planted`,
  `:planted:flood`, i.e. `substrate-paints-color.spec.ts` on `chromium-headless-new`) are not part of
  this baseline, but that spec's cells ran inside the Chromium run above.
- **Chunks.** The 179 files sorted and split 15 per list (`lists/part-aa` .. `part-al`), one
  `--workers=1` Playwright process per list, each in its own `guarded --timeout 60` call, one at a
  time: `ch-aa..al` then `coarse-aa..al`. WebKit ran as two calls under
  `guarded --exclusive webkit --timeout 20`: `wk-a` (release-10-1-1, release-10-1-2; 1.6 min) and
  `wk-b` (aurora-swraster, release-10-1-3, release-10-1-4, safari-webgl; 4.2 min). No guarded call
  was refused or timed out, and every chunk wrote its JSON. The per-chunk command is

  ```
  cd <tree>; GLASS_UI_DEMO_PORT=<PORT> GLASS_UI_DEMO_URL=http://localhost:<PORT> PI_REPORT=<report>.json \
    npx playwright test -c <config> --project=<project> --workers=1 <spec files...>
  ```

  (`scripts/suite.sh`, adapted from the 10.1.5 close's `close-suite.sh`; `scripts/queue.sh` from its
  `close-queue.sh`; `scripts/publish.sh` writes the title sets.) Timings: `reports/runs.txt`,
  `reports/queue.txt`.
- **Versions.** Playwright 1.61.1; Chromium projects on its bundled `chromium-headless-shell` 1228
  (149.0.7827.55) with the config's `--headless=new --use-gl=angle --use-angle=metal
  --enable-unsafe-webgpu --ignore-gpu-blocklist`; WebKit build 2287
  (`~/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`, the config's `executablePath`); Node
  v26.0.0; macOS 26.4.1, real GPU (Metal).

## Notes for the comparison

- **One WebKit failure is a flake.** `safari-webgl.spec.ts` "dock over the live field paints a
  continuous plate + does NOT flash (light)" failed on `page.goto: Test timeout of 60000ms exceeded`
  (not an assertion; its dark twin passed). Re-run alone right after, `--repeat-each=2`, it passed
  both times in 4 s each (`reports/webkit-rerun/`). It stays in `webkit-failed-titles.txt` as
  measured. If the branch passes it, that is not a fix.
- The other WebKit failures are assertions: eight `release-10-1-2.spec.ts` O-101 cells ("morphing
  frames after the change reserving other than the settled Npx") and `aurora-swraster.spec.ts`'s
  capture-mount cell ("must not throw an onInitError-class violation").
- The Chromium failures are mostly specs that have drifted from the demo (missing selectors,
  60 s locator timeouts, changed values), the same pattern as the 10.1.5 close's v10.1.4 baseline.
- Every spec ran on v11.0.0. None was excluded or failed to load.

## Files

- `<project>-failed-titles.txt`: the three title sets.
- `reports/<project>/<chunk>.json` and `.log`: the Playwright JSON report and list output per chunk;
  `reports/<project>/status-counts.txt`: the status tally.
- `reports/list-<project>.txt`: `playwright test --list` for each project on the v11.0.0 tree.
- `scripts/`, `lists/`: the exact driver and spec lists.

The archive tree under `.cache/baseline-v11.0.0` was deleted afterward.
