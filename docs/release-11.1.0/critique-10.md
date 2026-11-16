# glass-ui 11.1.0 · critique 10

A fresh adversarial critic (round 10), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0`. It built nothing on the branch.

This round is the finite gate in `orchestrator-note-after-critique-8.md`: five items, each
read twice (once as counts, once in paint or in the source), and nothing else. Every other
orchestrator note in the folder was read first.

The round began at `86f55e9e5` (fix 10). While it ran the orchestrator added `1f8f80094`
and `ae92d2eb2`, two notes for the close seat. `git diff 86f55e9e5 ae92d2eb2 -- src tests
tests-visual package.json CHANGELOG.md .bundle-ratchet` is empty, so every run below read
the same source. Since critique 9 the only change outside the records is fix 10's
CHANGELOG clause (6 lines in, 4 out).

Every browser and heavy run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. WebKit is Playwright's build 2287. **The guard
refused nothing**; the only guard lines in the logs are eight waits for the WebKit lock.
Disk read 55 to 75 GB free, and the one-minute load stayed between 5 and 12.

Records, all under `critic-10/`: `chain.log` (every run and its exit, in order), the
drivers `chain.sh`, `chain2.sh`, `gates.sh`, `release.sh`, critic 9's witnesses copied
unchanged but for their paths (`probe11/`, `probe10/`, `probe12/`, `rerun/lane-L6/`,
`rerun/lane-L7/`), `gates/`, `release/`, `api/`, `changelog-check.out`, and the contact
sheets under `sheets/` with their makers `sheets.sh` and `sheets-p11.sh` (PNGs are ignored
by git, as in every round). Trees: the tip; the pre-fix tree `.cache/f9-pre` (its `src/`
compared equal to `git archive 432cbefda src` before any run); `v11.0.1` at
`.cache/f7-v1101`; the 11.0.0 package at `.cache/l4-pack`.

## Verdict

Clean. No defect reproduced. Fix 9's two cures hold in both engines and are red on the
pre-fix tree, the dock shows no regression, lane L7 passes in WebKit, the gates are green
on the committed tree, and the CHANGELOG is true, fix 10's clause included.

By the note, one clean round sends the release to its close.

## The gate, item by item

### 1. Fix 9's two cures

| run | tip, Chromium | tip, WebKit | pre-fix, Chromium | pre-fix, WebKit |
| --- | --- | --- | --- | --- |
| probe11, all 60 cells | **60/60** | **60/60** | 12/60 | 12/60 |
| probe10 (fix 8's gate) | **40/40** | **40/40** | | |
| probe12 (critic 9's: a non-uniform scale, a scale around a zoom, right-to-left, vertical, reduced motion) | **40/40** | **40/40** | 8/40 | 8/40 |

The 12 cells green on the pre-fix tree are probe11's 8 plain and 4 table cells; the 48 red
ones are the 40 moved-dock cells and the 8 slot cells. probe12's 8 green pre-fix cells are
the scale around a zoom, where the two cancel. v11.0.1 read 20/40 on probe12 in Chromium:
every tab cell on its control, the reader's control (that tree draws no glyph plate).

**In paint.** The plate is painted magenta and read from the screenshot. Pre-fix tree on
the left, tip on the right, top to bottom `zoom: 1.25`, `zoom: 0.8`, `scale(0.8)`, a
wrapper growing in, inside `Dialog`:

- `sheets/p11-chromium-tab-1440-light-rest.png` and `sheets/p11-webkit-tab-1440-dark-rest.png`:
  on the pre-fix tree the plate lies across "Methods" and "Results" under zoom 1.25 and
  sits short and left of "Methods" in the other four. On the tip it covers "Methods" in
  all five, in both engines.
- `sheets/p11-chromium-icon-390-dark-rest.png` and `sheets/p11-webkit-icon-390-light-rest.png`:
  the same for a glyph run at 390. On the tip the plate is centred on its glyph in all
  five.

Counts behind the paint, 390 light, Chromium, tip (`probe11/out/green-chromium.log`):

| where the dock sits | control's plate, rest | painted, rest | control's plate, moved | painted, moved |
| --- | --- | --- | --- | --- |
| `zoom: 1.25` | x 147.6, 170 × 47.5 | x 147, 170 × 48 | x 67.3 | x 68 |
| `zoom: 0.8` | x 100.1, 108.8 × 30.4 | x 100, 109 × 31 | x 177.6 | x 177 |
| `scale(0.8)` | x 100.2, 108.8 × 30.4 | x 100, 108 × 30 | x 106.1 | x 107 |
| a wrapper growing in | x 121.2, 136 × 38 | x 121, 136 × 38 | x 128.6 | x 129 |
| inside `Dialog` | x 138.2, 136 × 38 | x 138, 136 × 38 | x 111.6 | x 112 |

Every reading is within one pixel.

**The slot.** probe11's `dynslot` scene is 8/8 on the tip and 0/8 on the pre-fix tree in
both engines. On the tip the summary gains `role="button"`, `tabindex="0"` and "Expand
dock" when `#collapsed` arrives and loses all three when it goes; on the pre-fix tree it
keeps whatever it had at mount (`probe11/out/pre-webkit.log`, the `dynslot` lines). In
paint, `sheets/p11-chromium-dynslot-1440.png`: one circle, then the circle with "Now"
beside it, and back.

**The source, second reading.** `useDockRunMark.ts`: `layoutBoxOf` sums offsets up the
offset-parent chain to the run and `plateOf` takes the right-to-left offset from the
run's `clientWidth`; no rect is read for the plate's lengths. `GlassDock.vue:259-262`:
`persistentFace` and `summaryIsDisclosure` are functions, read by the five bindings at
`:574-578`. Both as critique 9 read them; neither file has changed since `06da3bb9c`.

### 2. No dock regression from the cure

**The dock in every posture** (lane L6's witness, unchanged):

| | Chromium | WebKit |
| --- | --- | --- |
| lane L6 | **161/161** | **155/155** |

390 and 1440, fine and coarse (hover, and long press synthetic and through CDP), light and
dark. In paint (`sheets/l6-chromium-postures-390.png`, `-1440.png`, `l6-chromium-face.png`
and the three `l6-webkit-*` sheets): open, open with a persistent control, collapsed to a
circle, two-cell, wide ("Now 12"), the persistent face alone and with both ends, vertical
open and collapsed, and the persistent face leading, trailing and both, at rest and
opened by hover and by long press. Every one is a clean capsule or circle in both themes
and both engines, with no flat end, no second shape and no clipped glyph.

**The release specs** (`release/runs.txt`), one worker:

| spec | Chromium | WebKit |
| --- | --- | --- |
| `release-10-1-3` | 60/60 | 58 passed, 2 skipped (the spec's own engine skips) |
| `release-10-1-5` part A | 84/84 | 84/84 |
| `release-10-1-5` part B | 23/23 | 23/23 |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` | 9/9 | 9/9 |

Every title passed on its first run in both engines, the same counts as critique 9, so no
title that passed at critique 8 fails now.

### 3. Lane L7 in WebKit, the corrected reader

One pass: **80/80**, exit 0 (`rerun/lane-L7/out/green-webkit.log`), with the lock quiet
(load 9 to 12). The sixteen "drawn" cells again read "unmeasurable in paint"
(`firstFrameAfterDrawn: -1` in all sixteen), and the page's own record is right in all
sixteen (`finalAtDrawn: true`, read from `green-webkit.json`). That is the fifth WebKit
pass in a row with no frame after the event, so it is the instrument and not the lock; it
stays in the open gaps as critique 9 left it.

### 4. The gates, committed tree

`gates/chain.log`, one guarded run at `1f8f80094` with no change in `src`, `tests`,
`package.json`, `CHANGELOG.md` or `.bundle-ratchet`: build 0, typecheck 0, demo:dist:build
0, vitest 0 (279 files; 2582 passed, 10 expected fail, 1 skipped), verify:package 0, CLEAN.

The ratchet reads equal: packed content 3030963 against a datum of 3030963. Fix 10 grew
`CHANGELOG.md` by 175 bytes and did not rebind, which is right: a dry-run pack lists 898
files, and the only ones outside `dist/` are `LICENSE`, `MIGRATION.md`, `README.md` and
`package.json`. The CHANGELOG is not in the package.

### 5. The CHANGELOG

Read in full against the tree. `changelog-check.out`: PASS on every line, no row or wave
ids, no lane, seat, critic or tranche vocabulary, no record paths.

Fix 10's clause, checked against both scenes in both engines:

| the entry says | the dock does |
| --- | --- |
| "If you pass the `#collapsed` slot only some of the time, say with a `v-if` on its template … the collapsed dock follows the slot" | probe11 `dynslot`, 8/8 per engine: the summary becomes the "Expand dock" button when the slot is passed and a bare pane when it is not |
| "The dock looks at whether the slot is passed, not at what it renders, so put the condition on the slot's template rather than inside it" | probe12 `inslot`, 390 and 1440, both engines: with the slot passed and its content emptied, the summary stays `role="button"`, `tabindex="0"`, "Expand dock" at 0 px wide beside a 56 by 56 dock |

Both sentences are true as written. Critique 9's finding is closed.

The sentence on the plate under zoom and scale is true by item 1. The names the entry
gives a consumer were looked up once more in the tree: `--radius-stadium` (and so
`rounded-stadium`, a theme radius), `--route-card-travel`, `--sheet-enter-skew`,
`--collapsible-gap`, `--scroll-progress-rim-outset`, `.viz-bar`, `.viz-mark`,
`.viz-ripple`, `data-viz-from`, `.table-container`, the `styles/font-files` and `fonts/*`
entries, `PopoverVirtualElement`, and the README's shadow tokens, preload and
`server.fs.allow` passages. All are there; `--route-slide` is gone, as the headline says.

The heading reads "unreleased" and `package.json` reads 11.0.1; the close sets both.

## Defects (reproduced)

None.

## A consumer of 11.0.0

`api/compare.json` (the package built this round against the 11.0.0 package) is
byte-identical to critique 9's. No export, entry or `.d.ts` file is gone. Exports are
added on four entries only (`PopoverVirtualElement` on the root and `./popover`,
`ScrollProgressRimEdge`, seven names on `./motion-core`). The custom properties gone are
`--hm-h` and the two route variables the headline names; the one class gone is Tailwind's
`overflow-auto` on the table container.

## For INBOUND (not defects of this release's items)

Nothing new this round. Critique 9's rows stand as written:

- the collapsed dock decides its face from whether `#collapsed` was passed, not from what
  it rendered, so a passed slot that renders nothing leaves a 0 px "Expand dock" button in
  the tab order (11.0.0, 11.0.1 and this branch alike; the CHANGELOG now says so);
- lane L7's "drawn" cells have no paint reading in WebKit (five passes now); a still
  screenshot after `drawn` would read the finished mark where the screencast does not;
- the dock search demo page throws at mount (for 11.1.1; the built cure is `665c5ca1f`);
- a glyph control marked current widens to 128 px in a five-glyph nav dock, so its plate
  is a wide capsule around one glyph (visible again in this round's
  `sheets/p11-webkit-icon-390-light-rest.png`); whether a current glyph should widen is
  the dock design loop's;
- critique 8's rows (the `release-10-1-3` zoom cell's 2 px frame bound, the 37 e2e cases
  that fail on both trees, a dock wider than a 390 px `Dialog`).

## Open gaps

- **Nothing in this round speaks for the merged tree.** The close merges master (11.0.2)
  and then `bl/ro-loop` (`orchestrator-note-resize-mid-morph.md`, added while this round
  ran), which changes `dockMorphMeasure.ts` beside the plate's code. That note already
  orders probe11, probe10 and lane L6 rerun on the merged tree in both engines; this
  round's copies under `critic-10/` run as they stand (`chain.sh p11c p10c l6c p11w p10w
  l6w`).
- **Paint after `drawn` in WebKit is unmeasured** (item 3); Chromium's paint cells were
  last read green at critique 8 and the source has not changed since.
- **Lane L7's stall cells in WebKit are unmeasurable**, recorded and not gated, as ruled.
- **The plate under a rotating ancestor** was not read (a bounding box cannot judge it).
- Lanes L1 to L5, the fix 2 to fix 6 witnesses and the wider e2e set were not rerun: they
  are outside the finite gate, and the close reruns the whole battery.
- The version, the CHANGELOG date and the ratchet rebind after the merges are the close's.
- Real Safari, real iOS and Android touch are not measured; WebKit is Playwright's 2287.

## For the next seat

Nothing to fix. The release goes to its close.
