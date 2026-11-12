# 11.0.1 release close: battery run, ready to tag

Seat: release close, claude-opus-5-5, 2026-11-12, branch `release/11.0.1` in
`.claude/worktrees/release-11.0.1`. Every build, test and browser run went through `guarded`
(WebKit 2287 under `--exclusive webkit`), one at a time. **None was refused.** No tag, push or
publish. Paths are relative to `docs/release-11.0.1/close/` unless they start with `src`,
`tests`, `tests-visual` or `/`.

## Verdict

Every check `.github/workflows/release.yml` runs passes on the committed tree, the pixel floors
are GREEN with both plants biting, and no visual-suite failure is 11.0.1-only. The suite turned up
two stale witnesses. This close restated them and measured them GREEN on the branch and RED on
v11.0.0. It also turned up two WebKit harness hangs that pass alone (below).

## The merges

- `cb8097eb2` merges release/10.1.5 at `716564210` (the tip when this seat started). The two
  conflicts were the carry's own ground. The source cure (`314ce60fc`) and the D-1 witness
  (`0867632a7`) were already on this branch as `9bd02b5f3` and `7e72f7796`. So
  `dockMorphMeasure.ts` keeps the carry's hand resolution: 11.0.0's rest read, with the chrome
  and `restSize` on the layers box, gated CLEAN by `../critique-carry.md`. `.bundle-ratchet` keeps
  the 11.x datum. No other source, test or package file changed.
- `4892da894` merges `44f73f865` (critique-close-1's record, docs only).
- `50fd441bd` merges `f9634a005` (the re-close, critique-close-2 and 10.1.5's CHANGELOG cut). The
  10.1.5 CHANGELOG section is taken as 10.1.5 cut it. `release.yml` and `scripts/dist-tag.mjs`
  stay master's, as the brief requires. 10.1.5 changed the older-line tag from `v<major>` to
  `release-<major>`, because npm refuses a dist-tag that parses as a semver range. 11.0.1 is
  greater than the registry's 11.0.0, so it publishes as `latest` (`node scripts/dist-tag.mjs
  11.0.1 11.0.0` prints `latest`) and that fix does not touch this cut. Master needs it before any
  older-line publish from master.
- After the last merge, `git log release/11.0.1..release/10.1.5` is empty.

## Battery (exit codes)

`logs/gates-archive` ran on a `git archive HEAD` tree at `a7f0a99c4`, which stands for CI's
fresh checkout. It had its own one-commit repo and the main checkout's `node_modules`, and was
deleted after. `logs/gates-worktree` ran in the worktree at `a7f0a99c4`. `logs/gates-final` ran
at `556f3063a` and `logs/gates-closed` at the closing commit. Between `a7f0a99c4` and the close,
only `tests-visual` specs, CHANGELOG prose and records changed, so no package byte moved.

| step | archive | worktree | final | closed |
|---|---|---|---|---|
| version = 11.0.1 | 0 | 0 | 0 | see `logs/gates-closed/gates.txt` |
| `prepare` (npm ci's build) | 0 | 0 | 0 | |
| `npm run typecheck` | 0 | 0 | 0 | |
| `npm run build` + `dist/index.d.ts` | 0 | 0 | 0 | |
| `npm run verify:package` | 0, CLEAN | 0, CLEAN | 0, CLEAN | |
| `npm run demo:dist:build` | 0 | 0 | 0 | |
| vitest `--maxWorkers=2` (`npm test`) | 0, 270 files, 2511 passed, 10 expected fail, 1 skipped | same | same | |

- **Bundle ratchet.** It reads PRESENT on the archive build of the committed tree, datum 2911472
  equal to the unpacked content bytes 2911472, so no rebind is needed and none was made. The pack
  sha256 `bea73802…` is the same in the worktree run and the final run.
- **Pixel floors** (`floors/`, real GPU, worktree, own server on 5335).
  `gate:pixel-floor` exit 0, GREEN, 3 floors. `gate:pixel-floor:planted` exit 0, GREEN self-test,
  2 floors RED on the plant. `gate:pixel-floor:planted:flood` exit 0, GREEN self-test, the blob
  ceiling RED on the plant. The three machine reports are banked beside the logs.
- `release.yml` makes no pi-report freshness check. Its header routes one to a future gates band,
  and the floor runs only in `release.sh`.
- `prepublishOnly` is `typecheck && build && test`. All three ran as above, with vitest at
  `--maxWorkers=2` under the machine law.

## Visual suite

Each Playwright process ran with its own demo server (`GLASS_UI_DEMO_URL` http://localhost:5331
for Chromium, 5333 for WebKit), `--workers=1`, and at most one guarded call at a time. The spec
lists are in `lists/`, the drivers in `scripts/`, and every row is in `suite/runs.txt` and
`suite/queue.txt`. The suite covers the 179 v11.0.0 spec files in the baseline's 12 chunks, plus
the release specs as one chunk (`rel`: release-11-0-1, release-11-0-1-daraksha, release-10-1-5,
release-10-1-2, -3, -4). The 36 round probes from 10.1.5 and 11.0.1 (`lists/probes`) did not run
here; their critics ran them, and they are not the release suite.

| project | tests | passed | failed | skipped | v11.0.0 failed | branch-only |
|---|---|---|---|---|---|---|
| chromium-headless-new | 1330 | 830 | 455 | 45 | 450 | 5, all resolved below |
| coarse-touch | 1330 | 815 | 458 | 57 | 456 | 2, resolved below |
| webkit 2287 (7-file project) | 280 | 260 | 11 | 9 | 10 | 2, harness, below |
| webkit 2287, release-11-0-1 config (11.0.1 + daraksha) | 11 | 11 | 0 | 0 | | |

The title sets are `suite/<project>-failed-titles.txt`, built with the baseline README's pipeline
and compared with `comm` (`scripts/compare.sh`, output `suite/compare.txt`). **No title fails on the
branch that is not explained below.** Only one v11.0.0-failing title passes here: WebKit
`safari-webgl.spec.ts` "dock over the live field paints a continuous plate + does NOT flash
(light)". That is the baseline's own `page.goto` flake (its README), so the pass is not a fix.

### Branch-only failures, each resolved

1. **`radius-scale.spec.ts` "dock icon button is a circle" and "collapsed dock is a circle"
   (Chromium, light and dark; coarse, collapsed only).** These were stale witnesses. They asserted
   the literal `50%`, which this patch replaces on purpose: a dock control's corner is now half
   the control size, and a stadium dock's corner is half its thickness, both lengths (the
   CHANGELOG names both token moves). The spec came in on the 11.0.0 line, so the 10.1.5 cures
   never met it. A probe (`probe/`, both Chromium projects, branch and v11.0.0) showed the
   collapsed dock in this scene is a 16 x 56 px sliver on both trees, 16 x 60 on coarse. The scene
   gives the dock no summary content, so it was never square. v11.0.0 paints that box with `50%`
   (an ellipse) and its plate with 16/10 px corners. 11.0.1 paints 28 px on all four corners of
   both the root and the plate (30 px on coarse). The rows were restated (`556f3063a`,
   `fbc544805`):
   - the icon button is a square whose corner is a length of at least half its side;
   - the collapsed dock's row, now titled "collapsed dock rests on four equal corners of half its
     thickness", reads four equal lengths of at least half its height.

   Every other circle still reads `--radius-circle`. A/B (`suite/radius-*`): the branch passes
   32/32 in chromium-headless-new and coarse-touch, and v11.0.0 fails exactly the four dock rows
   in each.
2. **`motion2.spec.ts` "the page paints a calm substrate behind the glass card (not bare)"
   (Chromium only).** It failed once in the whole run and passed 6/6 alone (`ch-motion2`). It had
   flipped between trees before: it failed on v10.1.4 in both Chromium projects at the 10.1.5
   close and passed on 10.1.5 and on v11.0.0. The cell read once, 300 ms after network idle. It
   now polls for the wash for up to 5 s with the same message (`5fcb7d826`), so a bare page still
   fails. Its whole chunk re-run (`ch-part-ah-2`) fails 51 titles, exactly the v11.0.0 set for
   those files, and the cell passes in the suite.
3. **WebKit `release-10-1-5.spec.ts` "q2 O-187 at 1440: a nested .dock-run group keeps each
   hovered control's whole ink".** A `page.goto` that never reached `load` in 60 s at test 253 of
   280. It passes alone 6/6 (`wk-reB`), and the 10.1.5 critique-close-1 saw the same hang and
   8/8 alone. This is the harness, and the v11.0.0 baseline shows the same class. Its WebKit
   whole-project run timed out one `page.goto` on `safari-webgl.spec.ts` "dock over the live field
   … (light)", which passes alone, and that title passes here. The spec does not exist on v11.0.0,
   so the title itself cannot be A/B'd there.
4. **WebKit `release-10-1-4.spec.ts` "page.pdf: a deck in a modal dialog prints at slide
   geometry".** The test skips itself in WebKit on its first line ("page.pdf is Chromium's"),
   before any navigation. The failure is Playwright's `browserContext.close` exceeding the 60 s
   timeout on that never-used context. No glass code ran. Alone it skips 6/6 (`wk-reA`). The spec
   is unchanged since v11.0.0, where it skipped cleanly in the same position.

### Known items, shared with v11.0.0

- The eight `release-10-1-2.spec.ts` "O-101 ·" reversal and mid-expand cells fail in all three
  projects, as on v11.0.0 (orchestrator note, "Carried"). The O-101a reversal cell passes in all
  three.
- On coarse-touch, the two `release-10-1-3.spec.ts` D-1 summary-glyph cells fail, as on v11.0.0.
- WebKit `aurora-swraster.spec.ts`'s capture-mount cell fails, as on v11.0.0.

### The release specs

- `release-10-1-5.spec.ts`: Chromium 107/107; WebKit 106/107 plus q2 6/6 alone (item 3).
- `release-11-0-1.spec.ts` and `release-11-0-1-daraksha.spec.ts`: GREEN in Chromium, coarse-touch
  and WebKit 2287. That includes the owner's named cells: the "Focus" and "Name ›" wide-label
  plates are capsules, and the dock's end is round at rest, collapsed, open on a narrow layer and
  on every morph frame.
- `release-10-1-3.spec.ts` and `-10-1-4.spec.ts`: GREEN in Chromium and WebKit apart from item 4.
  There is no 11.0.0 release spec under `tests-visual`.
- RED on v11.0.0 for the owner's cells and daraksha's two repro pages was measured by the merge
  seat (`../merge.md`, the owner table and "daraksha's two repro pages"). The source under test
  here is byte-identical to the carry critique's (`git diff 960c5679e HEAD -- src` is empty), so
  those arms were not re-run. daraksha's press-scroll page (booked for 11.0.2) reads as
  `../merge.md` records it: presses 1, scrollLeft 0, the run 113/113 with nothing to scroll.

## Also in this close

- **CHANGELOG.** The cut date is 2026-11-12 (`a7f0a99c4`). `data-run-fits` is on the dock root in
  the 11.0.1 entry and in the 10.1.5 section (`d2ba90575`, then 10.1.5's own wording via
  `50fd441bd`), which also covers `../orchestrator-note-changelog-run-fits.md`. No other prose
  moved.
- **Records.** The v11.0.0 baseline (`../baseline-v11.0.0/`) and the orchestrator notes are
  committed. Suite reports and logs are gzipped.
- **Tree.** The suite rewrote tracked PNGs under `docs/tranches` and left 119 untracked files
  there plus a stray `.cachenested-backdrop-budget.json` at the root. These were restored with
  `git checkout -- docs/tranches` and removed with `git clean` on those paths. The archive trees
  under `.cache/close/` are deleted.
- **A first `ch-rel` call ran with no file list** (its list path did not resolve). I stopped it by
  PID after 8 minutes (`ch-rel-aborted`) and re-ran it.
- Not measured: real Safari. Every WebKit cell is Playwright WebKit 2287.
