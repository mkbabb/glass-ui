# 11.0.2 critique, round 4

Seat: a fresh adversarial critic, claude-fable-5-2, 2026-11-14. I built nothing on this branch.
Read: `git log v11.0.1..release/11.0.2`, the three build records, critiques 1 to 3,
`fix-2.md`, `fix-3.md`, `fix-4.md`, the eight orchestrator notes and the frozen scope.
Tip under test: `f2dab5122`, with no change to `src`, `tests`, `tests-visual`, `scripts`,
`package.json`, `.bundle-ratchet` or `CHANGELOG.md` in the working tree. Every run went
through `guarded`, each WebKit run under `--exclusive webkit`, one browser a run,
`--workers=1`, one heavy run at a time; **no run was refused**. Paths are relative to
`docs/release-11.0.2/` unless they start with `src`, `tests` or `tests-visual`.

## Verdict

**Measured to the end. One defect stands, and it is not this branch's: critique 3's D-2.**
Critique 3's D-1 is cured, in computed style and in paint.

| # | item | reading |
|---|---|---|
| 1 | every landed row's witness RED on v11.0.1, GREEN on the tip | GREEN in Chromium, coarse-touch, WebKit 2287 and WebKit 2311. One WebKit cell failed in the sweep on a lost window and is 5 of 5 alone |
| 2 | release-10-1-5 107/107, release-10-1-2/-3/-4 no new failing title | GREEN: 107/107 in both engines; no title of -2, -3 or -4 fails in either |
| 3 | the release-11-0-1 specs | Chromium: all 58 GREEN. WebKit: the owner cells 9/9, fix-2 14/14, critic 1 22/22, critic 1b 2/2, daraksha 2/2; **critic 2's pixel reader 8/9, one vertical cell RED on the expand's first frame (D-1 below)**. `o3` and the four script-free `f4` cells GREEN in both engines |
| 4 | nothing removed or renamed | GREEN: exports, file list and declarations hold against the published 11.0.1; no custom property is deleted; `--glass-border-floating` reaches the dock again |
| 5 | typecheck, build, demo:dist:build, vitest, verify:package | GREEN: all five exit 0, and `test:browser` |
| 6 | the CHANGELOG entry | GREEN: every clause read true, every moved value named, outward prose |

The one thing between this tip and a tag is a ruling on, or a cure for, the vertical
dock's first expand frame in Playwright WebKit. Fix seat 4 measured its cause and returned
it; no note in the tree rules on it, so the gate as written reads RED and I file it.

## How it was run

- The v11.0.1 tree is `.cache/red-v11.0.1/tree`. Its `src/` is byte-identical to a fresh
  `git archive v11.0.1 src` (`diff -rq`, run first). The tip's 11.0.2 spec, config,
  harnesses, forced-colors spec and unit witnesses were copied onto it by my scripts, as
  earlier seats did.
- Each Playwright call brought its own vite through the config's `webServer` (5341 the
  tip, 5342 v11.0.1), `GLASS_UI_DEMO_URL` set; the probes served on 5343 and 5344.
- Scripts in `critic-4/scripts/` (`chain.sh`, `chainB.sh`, `chainC.sh`; `pw.sh` and the
  four readers are critique 3's), logs and JSON reports in `critic-4/logs/`, one line a
  run in `critic-4/logs/chain.out`, each `rc=` the run's own exit code. New here:
  `pkgdiff.mjs` (item 4), `tally.py`, `edge-paint-probe.mjs`.
- **A false stop of my own.** `chain.sh` halted after the v11.0.1 WebKit sweep with
  "STOP: guarded refused". Its check grepped for the word REFUSED, which is inside
  guarded's ARMED warning ("only a REFUSED line stops a run"). No run was refused; every
  `rc=` in `chain.out` is a test exit code. `chainB.sh` reads a line that starts
  `[guarded] REFUSED` and carried on from the same point.
- **A lock wait I cut short.** The WebKit lock is shared with the other releases. The
  v11.0.1 repeat of the pixel-reader file waited 25 minutes without starting; I stopped
  that script by PID and reordered the tail (`chainC.sh`) so the readings the gate needs
  ran first.
- Every RED and GREEN below was read twice: the run's counts, then the failure text, the
  recorded reading or the capture.
- The pixel reader's sweep run wrote its frames to the 11.0.1 records' default folder
  (`docs/release-11.0.1/critic-2/runs/c2-shots/`, ignored PNGs, as every earlier sweep
  did); the crop named in D-1 is cut from there.
- The captures named below are on disk in `critic-4/capture/` and `critic-4/select/*/png/`;
  the repository ignores `*.png`, so they are not in the commit.

## 5. Gates on the committed tree (`f2dab5122`)

| gate | exit | read |
|---|---|---|
| `npm run typecheck` | 0 | both `vue-tsc` passes |
| `npm run build` | 0 | `glass-ui:ready`, 64 public declaration entries |
| `npm run demo:dist:build` | 0 | built |
| `CI=true npx vitest run --maxWorkers=2` | 0 | 278 files, 2535 passed, 10 expected fail, 1 skipped |
| `npm run test:browser` | 0 | 2 files, 12 passed |
| `npm run verify:package` | 0 | `terminal: CLEAN`; packed 2916380 bytes, the ratchet's datum |

## 1. Witnesses

### Unit witnesses

Eleven files on v11.0.1, ten on the tip (`critic-4/logs/units-{v1101,tip}.log`):
**v11.0.1 22 failed, 63 passed, every file red; the tip 85 passed, 0 failed.** Read by
assertion on v11.0.1: `useGlobalDark` 3 (`'auto'` where `'dark'`; no throw on a second
key), `blob-breath` 2 (reach 0.725 and 0.703 against 0.3125), `dockMorphMeasure` 3
(`'56px'` where `'592px'`; `'277.5%'` where `'-60%'`), `g-dock-lattice` 2 (no per-axis
`overscroll-behavior`), `GlassDock.idle-window` 2 (3600 against 6000; folded at 5.9 s),
`worm-dot-px` 1 (302.2 against 40), `Slider.loupe` 1 (a default grasp mounts the lens),
`slider.size-tokens` 3 (a 16 px thumb on a 32 px track), `slider-thumb-bg` 2,
`overlay-plate-inline-bound` 3, `open-input` RED at import.

### The 11.0.2 cells and the forced-colors spec

`critic-4/logs/{tip,v1101}-chco.json`, `tip-wk-a.json`, `v1101-wk.json`. "ch" is
chromium-headless-new, "co" coarse-touch, "wk" WebKit 2287, "w3" WebKit 2311. Counts:
the tip 97 passed and 17 skipped in ch and co, 53 of 54 and 3 skipped in wk, 51 and 3
skipped in w3; v11.0.1 52 failed in ch and co, 26 failed in wk and 51 in w3.

| row | cells | v11.0.1 ch / co / wk / w3 | tip ch / co / wk / w3 |
|---|---|---|---|
| O-223 with O-244, `dark ·` | 2 | RED in all four (`isDark` false; the store holds `auto`) | GREEN in all four |
| O-267, forced colors | 3 | RED / RED / RED / not matched (`outlineStyle: none`) | GREEN / GREEN / GREEN (solid, 2 px, offset 2 px, painted) |
| the lens row, `lens ·` | 1 | RED in all four (lens 1, veil 1, the track's end 18.7% darker) | GREEN in all four (lens 0, veil 0, opacity 1, change 0) |
| O-232, `static · … no backdrop-filter` | 2 | RED in all four (20 offenders each) | GREEN (no offender) |
| O-269, `fill · in dark` | 2 | RED in all four (hover −0.0044 and −0.0078 under the plate) | GREEN (hover +0.017 and +0.020 over it) |
| O-268, `fold · an idle fold` | 1 | RED / RED / skipped / skipped, see the note below | GREEN / GREEN / skipped (73 layouts over 67 morph frames) |
| O-273 and the thumb's default, `slider · the thumb paints` | 1 | RED in all four (`rgb(253, 245, 236)`, the card) | GREEN (`rgb(28, 25, 23)`, then the host's colour) |
| the thumb's read, `slider · a scrubber's thumb reads` | 3 | RED in all four (16 misses each) | GREEN |
| O-261, `pager · a neighbour hop` | 1 | RED in all four (300.3 px against 40.5) | GREEN in all four (18.8 px on a 28 px pitch; coarse 32.2 on 48) |
| O-295, `pager · on the default token` | 1 | RED in all four (301.1) | GREEN (18.8, 46.2 and 84 for hops of 1, 3 and 7) |
| O-263, `wheel ·` | 2 | RED (the page moved 0 px; both axes `contain`); co skips the wheel cell | GREEN (300 px; `x: contain, y: auto`; the vertical run `x: auto, y: contain`) |
| O-262, `rail ·` | 2 | RED in all four (454.6 px where 89 is allowed; crest 47 px off) | GREEN |
| O-270, `radius ·` | 2 | RED in all four (corner area 49.7 against 55.3) | GREEN |
| Slider geometry, `geometry ·` | 2 | RED in all four (371 misses) | GREEN (worst 0.25 px off concentric) |
| O-235, `blob · through a sweep` | 1 | RED in all four (peak 1.374 against 0.3126; the WebKit builds 0.733 and 0.724) | GREEN (0.293 and 0.287 in the two WebKit builds) |
| O-300 (a), `transition ·` | 1 | RED / skipped / RED / RED | GREEN / skipped / GREEN / GREEN |
| O-227, `edge · a GlassDock page` | 1 | GREEN / GREEN / GREEN / **RED (page crashed)** | GREEN in all four |
| the three host inputs, `edge · a host's …` | 3 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four |
| O-240, `press ·` | 2 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four (one press, one click, scroll 0) |
| O-241, `cutcap ·` | 2 | the same | GREEN in all four (corners 28, 28, 28, 28) |
| O-282, `hover ·` | 13 | GREEN / skipped / GREEN / RED (page crashed) | GREEN / skipped / 12 of 13, then 5 of 5 / GREEN |
| O-288, `fold · … content stays inside the plate` | 4 | GREEN / GREEN / GREEN / RED (page crashed) | GREEN in all four (0 px outside, steps of 0.05) |
| item 9, `hold ·` | 1 | the same | GREEN in all four |

On WebKit 2311, 39 of v11.0.1's 51 failures are `page.goto: Page crashed`, every
dock-bearing page, and every one loads on the tip: that is O-227's RED and GREEN. The
other 12 fail there on their own assertions.

**The new cell since critique 3**, `edge · a host's --glass-border-floating colours the
folded edge and a held or static dock's edge`: GREEN on the tip in all four projects and
GREEN on v11.0.1 wherever its page lives, as a restored behaviour must be. Its RED tree is
the branch before the cure. I did not rerun that tree; I read it: at `7e6c896e1` no rule
under `src/components/dock` reads `var(--glass-border-floating)` (`git grep`, 0 lines; 6
on the tip), and critique 3's probe on that source read the library's 5% ink where the
host's colour belonged. The cell's recorded values on the tip, read against the source:
live dock t = 0 the host's `0.784 0 0 / 0.5`, t = 0.5 the premultiplied even mix with the
dock hairline, held and static both ends the host's; the preset-style mix form the same;
the page alive in both WebKit builds.

**The same row in paint** (`critic-4/edge-paint-probe.mjs`, Chromium on both trees,
`critic-4/logs/paint-{tip,v1101}-chromium.log`). With `--glass-border-floating: rgb(220 0
0)` on the dock's root, the plate's red pixels at a device scale of 2:

| state | v11.0.1 | tip |
|---|---|---|
| folded, token unset | 0 | 0 |
| folded, host's red | 1290 | 1290 |
| static dock folded, host's red | 1293 | 1293 |
| static dock open, host's red | 1945 | 1945 |
| static dock open, token unset again | 0 | 0 |

In the WebKit build the repo resolves (2311), on the tip, the page stays alive and the
same five states read 0, 1984, 1984, 2956 and 0 (`paint-tip-webkit.log`); v11.0.1's page
dies there, so it has no column.

The two trees paint the same ring in Chromium, pixel count for pixel count
(`critic-4/capture/tip-chromium-{folded,static-open}-host.png`: a red hairline round the
whole plate). The same probe reads both hairline tokens against 11.0.1's form, the ink
mixed with `transparent`, in light and in dark: `0.11 0.098 0.09 / 0.05` and `/ 0.08`,
`0.914 0.9 0.886 / 0.05` and `/ 0.08`, equal on both trees and in both engines. "Both hairlines keep their
values" is true.

**The Select rows (O-212, O-213's cap, O-214)**, `o212/probe.mjs` on both trees
(`critic-4/select/`, `critic-4/logs/select-*.log`): v11.0.1 14 of 20, 2 of 4 and 0 of 4 in
Chromium and in WebKit; the tip 20 of 20, 4 of 4, 4 of 4, and 12 of 12 keyboard cells in
both engines. Read in paint at a 386 px trigger: v11.0.1's highlighted row runs square off
the plate's right edge with a ring round it; the tip's sits inside the plate with an even
inset and no ring (`critic-4/select/{v1101,tip}/png/*-chromium-o212-1440-light-tw386.png`).

**The reka-ui floor**: static. The published 11.0.1 declares the peer `^2.0`; the tip
declares `^2.10.1`, the only `peerDependencies` entry that differs.

**O-266** is a test-only restatement by ruling: the eight `O-101 · … reversal` and
`mid-expand` cells pass on the tip in both engines (item 2).

Rows whose witness is not RED on v11.0.1 outside WebKit 2311, each by a ruling or by the
row's own terms: O-240 and O-241 (closed by 11.0.1, kept witnesses); O-227 (its RED arm is
2311); the three host-input `edge ·` cells (RED on the trees that dropped the inputs);
O-282 (accepted as guarded); `hold ·` (ruled not a glass fault); O-288 (not reproduced in
glass; see the gaps).

**Second readings.**
- Every v11.0.1 failure in Chromium fails on the assertion its row names (`why.py`, the
  values above), with the one exception critique 3 found: the `fold · an idle fold` cell
  reads from 5.4 s, the tip's window, so on v11.0.1, which folds at 3.6 s, it fails on
  "no morph frame in the window". Read again with the wait set to 3 s in the v11.0.1
  tree's copy only: **245 layouts over 67 morph frames where 79 are allowed**
  (`critic-4/logs/fold-v1101-ch.json`), the CHANGELOG's own figure to the digit. The copy
  is restored (`diff -q`).
- **The `hover ·` failure.** `hover · a horizontal pill dock, expanded` failed once in
  the WebKit 2287 sweep with `TypeError: Cannot read properties of undefined (reading
  'filter')`: the cell's `window.__frames` was gone when it was read back, so no box was
  compared. Alone at `--repeat-each=5` it is 5 passed (`critic-4/logs/hover-tip-wk`). It
  passed in WebKit 2311 in the same sweep. This is the third sweep to lose one cell's
  window this way, a different cell each time; not a dock reading.

## 2. The older release specs on the tip

`critic-4/logs/tip-ch.json`, `tip-wk-a.json`, `tip-wk-b.json` (`tally.py`).

| spec | Chromium | WebKit 2287 |
|---|---|---|
| release-10-1-5 | **107/107** | **107/107** |
| release-10-1-2 | 52/52 | 52/52 |
| release-10-1-3 | 60/60 | 58 passed, 2 skipped (the clickless touch-press cells) |
| release-10-1-4 | 23/23 | 15 passed, 8 skipped (`page.pdf` is Chromium's) |

The sixteen `O-101 ·` endpoint titles and the six `O-101a ·` titles of release-10-1-2,
reversal and mid-expand among them, pass in both engines after O-262 and after fix seat
4's token change, which that seat had not swept in WebKit. No title fails, so none fails
that passes on v11.0.1.

## 3. The release-11-0-1 specs on the tip

| spec | Chromium | WebKit 2287 |
|---|---|---|
| release-11-0-1 (owner cells) | 9/9 | 9/9 |
| release-11-0-1-daraksha | 2/2 | 2/2 |
| release-11-0-1-fix-2 | 14/14 | 14/14 |
| release-11-0-1-critic-1 | 22/22 | 22/22 |
| release-11-0-1-critic-1b | 2/2 | 2/2 |
| release-11-0-1-critic-2 (the pixel reader) | 9/9 | **8 passed, 1 failed** |

By title: `o3 every frame of the expand and of the collapse paints a round end` passes in
both engines. The four `f4 … the prerendered figure dock … no script: corners and paint`
cells pass in both. The failure is D-1.

## 4. Nothing removed or renamed

Against the published tarball (`npm pack @mkbabb/glass-ui@11.0.1`, unpacked in the
scratchpad), this tip's build and `npm pack --dry-run --ignore-scripts --json`
(`critic-4/scripts/pkgdiff.mjs`, `critic-4/logs/pkgdiff.log`, `pack-tip.json`):

- **`package.json`**: of the published fields, only `version` and `peerDependencies`
  differ (`reka-ui` `^2.0` to `^2.10.1`, the ruled row), with the dev-only `scripts` and
  `devDependencies`. `exports` holds the same 69 entries.
- **File list** (889 against 891, content hashes folded): nothing is gone. Two
  declaration files are new (`blob/composables/bodyBreath.d.ts`, `select/openInput.d.ts`).
- **Entry exports**: 133 export targets on both. The 64 `.js` targets (read with
  es-module-lexer, `export *` followed) and the 64 `.d.ts` targets (read with the
  TypeScript checker) export the same names; none is gone.
- **Declarations**: all 566 published `.d.ts` files are present. Five differ apart from
  comments: `BODY_BOX_HALF` (new), `loupe` (new, twice), `storageKey?: string` (new) and
  `DOCK_COLLAPSE_DELAY_MS` 3600 to 6000 (the ruled value).
- **Custom properties** in `dist`'s CSS and JS: two that 11.0.1 declared are no longer
  declared by the library, `--dock-plate-expanded-border` and
  `--dock-plate-collapsed-border`, and both are still read, the ruled cure, held by the
  `edge · a host's …` cell in all four projects. Nine are new. The two `-edge` names fix
  seat 4 dropped were added on this branch and never shipped. No custom property is
  deleted.
- **Read by nothing now**: `--corner-shape-thumb` (still declared; ruled to the next
  patch) and reka's own `--reka-select-trigger-width`.
- **Critique 3's D-1 is cured.** `--glass-border-floating` colours the folded end of a
  live dock and the whole edge of a held or a static one, in computed style in all four
  projects and in paint (above).

## 6. The CHANGELOG entry

Read clause by clause against the diff and the readings above. Outward prose: no internal
id, seat, round or consumer name (grep, 0 lines); the heading holds the entry's only em
dash. Checked in source or in a reading:

- the one-shot `storageKey` and its throw; the concrete store with an `initialValue`;
- the `Highlight` outline 2px out (`outline-offset: 2px`, read as 2 and 2 in the cell);
- `loupe` (default off, the lens and the frost together);
- the peer floor;
- the one width rule (22rem, the anchor's width, the available room less 16px);
- `data-open-input`;
- the crash clause as fix seat 4 rewrote it: the two hairlines written as `--foreground`
  at a strength; `--glass-edge-floating` 5% and `--glass-edge-dock` 8%; the values kept
  (the probe above); the edge's colour unchanged at t = 0, 0.5 and 1 (delta 0 against
  11.0.0's form); `--glass-border-dock` colouring the open end;
  `--glass-border-floating` colouring the folded end and the whole edge of a held or a
  static dock; the two `-border` names still applying;
- the static dock's controls; the Blob;
- "about 245 layouts over 67 frames" (245 over 67 here) and one a frame (73 over 67);
- six seconds and `DOCK_COLLAPSE_DELAY_MS`;
- the dark fills at 8%, 11% and 14%;
- `--slider-thumb-bg` and `Canvas` under forced colours;
- the worm's measure; the per-axis overscroll; the anchored edge;
- the seat corner, `calc(var(--dock-control-size) / 2)`;
- the seat transition as a default, the dock's own controls adding the extent, and the
  seats on the morph's clock while it folds;
- the thumb at the track's height, `--slider-thumb-size-*` no longer sizing a scrubber's
  thumb, and its default from `--card` to `--foreground`.

Every value the diff moves in `src/styles/tokens`, the dock's constants and its style
sheets, the overlay plate and the Slider's sheet is named. No clause is false.

## Defects

### D-1. The pixel reader's vertical cell is RED in WebKit on the expand's first frame (item 3; critique 3's D-2, standing)

`v light-1440f` of `release-11-0-1-critic-2.spec.ts` failed in the tip sweep
(`critic-4/logs/tip-wk-b.json`) and once more in five repeats of the whole file
(`c2file-tip-wk.json`, 1 failed of 45): frame 0 of the vertical dock's expand, 23 ms and
26 ms after the press, root `scale: 1 0.29`, a plate 58 px on the main axis and 64 px
across, its end 2.45 px short of a circle of half the cross extent. In paint it is a disc
flattened top and bottom with its glyph left of centre
(`critic-4/capture/sweep-v-light-1440f-wk-expand-00-crop.png`, 64 by 58 CSS px measured
off the magenta fill). The four passing repeats first sample at 28 to 31 ms and read 64.7
by 64 at the same scale; the next frame is round in every run.

These are critique 3's numbers to the hundredth, and fix seat 4's cause fits them: the
folded summary is 34 px wide, the open column's seats 40, so the cross extent takes its
open value on the morph's first frame while the main extent is still the folded disc's.

It is not this branch's. The whole file five times over in WebKit 2287, each tree once:

| run | tip | v11.0.1 |
|---|---|---|
| the sweep (`tip-wk-b`) | 1 of 2 vertical cells RED | not run |
| the file five times (`c2file-{tip,v1101}-wk`) | 1 of 10 RED | **5 of 10 RED** |

Every RED row on both trees is the same frame (`c2rows.py`): 58 by 64, −2.45 at 1440; on
v11.0.1 also 60.7 by 68, −2.98 on the phone, four times. Critique 3 read the same on both
trees, and fix seat 4 found the same geometry in v11.0.1's source. The frame is caught
only when the first screenshot lands within about 26 ms of the press, so the counts move
with the machine's load, not with the tree. No title here fails that passes on v11.0.1.

So item 3 as written ("the dock end round on every frame") does not hold in Playwright
WebKit, on the tip or on the published 11.0.1. Fix seat 4 named the two root cures and
why neither is on the frozen list (the folded vertical disc grows to the column's width,
or the morph gains a cross axis). The gate is on my list and reads RED, so it is filed;
the orchestrator either takes a cure into this patch or rules the frame to INBOUND as
11.0.1's own. Chromium never caught the frame and real Safari is unmeasured.

## Open gaps, for INBOUND

- **The two hairline tokens are relative colours now, and more than the dock reads them.**
  `--glass-border-floating` feeds `--control-surface-border`, `--card-focus-border`, the
  ladder's rung and one utility's `border`. The build's CSS floor names Firefox 114 and
  `rgb(from …)` needs Firefox 128; on a browser without relative colours those hairlines
  now compute to nothing where the `color-mix()` form computed. v11.0.1 already ships 51
  relative colours in `src`, tokens among them, so the floor was already above the
  stated one; this patch widens what rides on it. Unmeasured.
- **A host that sets both `--glass-border-floating` and `--glass-border-dock` to
  translucent mixes** puts two nested translucent arms back in the live dock's lerp, the
  form that kills a page in Playwright WebKit 2311. The cells set one token at a time. On
  11.0.1 every dock page died there, so this is no regression; unmeasured.
- **A WebKit sweep cell can lose its window.** `window.__frames` vanished mid-cell in
  three sweeps now (fix seat 3's `fold ·` at 390, critique 3's vertical `hover ·`, this
  seat's horizontal `hover ·`), each GREEN alone. The rAF samplers in
  `release-11-0-2.spec.ts` have no guard against a reload; the cause is untraced.
- **The `fold · an idle fold` cell cannot show O-268's RED on v11.0.1 as committed**: its
  5.4 s wait is the tip's idle window. The RED is real (245 layouts over 67 frames with a
  3 s wait).
- **O-288 has no ruling.** Its four guard cells pass on v11.0.1, the binding note asks
  for RED on v11.0.1, and no later note accepts it as moved the way O-282 was.
- **O-271 is open** after two attempts (fix seat 3); fourier stays on 11.0.0. The note
  keeps the row in the release.
- **`--corner-shape-thumb` is declared and read by nothing**, and the CHANGELOG does not
  say the spectrum thumb stopped reading it (ruled to the next patch).
- **A host's `--dock-plate-expanded-border` now also wins on a held or static dock**
  (critique 2's note; unchanged).
- **The vertical dock's summary glyph sits left of centre in the squashed first frame**
  (the crop above); part of D-1's frame.
- **The WebKit sweep logs "ResizeObserver loop completed with undelivered notifications"
  four times** on the tip, as in critique 3's and fix seat 3's sweeps, and once on
  v11.0.1; the trace the after-build-C note asks for (item 5) is in build C's record only.
- **The CHANGELOG heading still reads "unreleased"**; the close seat's.
- **Not measured**: real Safari; v11.0.0; reka-ui 2.9.9 installed; the `7e6c896e1` tree
  in a browser.

## What did not run

Nothing on the list. Two repeats I had planned and dropped for the shared WebKit lock: a
second five-times pass of the pixel-reader file on each tree. No server, browser or run
of this seat is left (ports 5341 to 5346 free).
