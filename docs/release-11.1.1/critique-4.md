# 11.1.1 critique 4

Critic: claude-opus-5-5, by the orchestrator's ruling while Fable is out of quota; fresh,
built nothing on the branch. Tip read: `753101207` on `release/11.1.1`. Verdict: **not
ready to tag.** Four defects. The exits gate failed on the tip in this seat's own pass: a
disclosure reopen cell in WebKit at 390 fails about one reading in three when its film
stalls, so `scripts/release.sh` stops there by chance. A title 11.1.0's close restated
(`radius-scale`, coarse touch) now fails on the tip and passes on v11.1.0; row 12 moved
the value on purpose and nobody restated the cell. Under reduced motion a pressed `Button`
shows no press at all, neither size nor colour, and a menu row still shrinks; the
CHANGELOG says a pressed control shows its press by colour. The CHANGELOG also leaves out
four keyframes glass no longer runs, three whose shape changed, and the Dialog's half of
the press that now reaches the page. Fix seat 4's three cures hold: the Slider cell, the
press cell and the five close paths.

Everything here was run by this seat. Tools, logs and readings are under `critic-4/`.

## How it was read

- **Trees.** The tip is the worktree at `753101207`, tracked tree clean before and after.
  v11.1.0 is the `git archive` at `.cache/red-v11.1.0/tree`; its `src`, `demo`,
  `package.json`, vite configs, `index.html` and the two Playwright base configs were
  compared with a fresh archive of `v11.1.0` (`d19e12559`) before use: no difference.
- **Witness.** The exits gate's four parts, with the gate's own greps, in its four
  projects on the tip (16 runs, `logs/tip{A,B,C,D}-*`), and the three witness parts on
  v11.1.0 (12 runs, `logs/red{A,B,D}-*`), each with its own report. Verdicts per cell are
  in `matrix.txt` (`matrix.py`), why each v11.1.0 cell failed in `logs/matrix-why.txt`,
  the frame tables' extremes in `logs/sum-tip.txt` (`sum.py`), the reduced-motion legs in
  `logs/legs-tip.txt` (`legs.py`) and the channels each film moves in
  `logs/channels-tip-*.txt` (`channels.py`).
- **Repeats.** `still` 20 times in Chromium and 10 in WebKit at 1440; the four disclosure
  reversal cells 10 times interleaved in WebKit at 390 and at 1440 (`rev10-*`); the two
  reopen cells alone, tip and v11.1.0 alternated, 5 times a run in WebKit at 390
  (`reopen{1,2}-*`) and 10 in Chromium at 390; the Toast reversal 6 times on each tree in
  WebKit at 1440 (`toast5-*`).
- **Probe** (`probe/press.probe.ts`, readings only, both trees, Chromium at 390 and 1440
  and WebKit at 1440): under reduced motion, a held press on a `Button`, a dock icon seat
  and a dock tab seat, read as a screenshot crop at rest and held (mean colour, share of
  pixels changed) and as computed fill, filter and scale; and a held press on a row of
  the dock `DropdownMenu`, its computed scale on every frame.
- **Earlier release specs**, one guarded call per engine (`reg-inner.sh`,
  `logs/chain.txt`): release-10-1-5 in two halves, release-11-0-1 (owner, daraksha,
  fix 2, critic 2), release-11-0-2 with slider-forced-colors, release-11-0-2 on coarse
  touch and on WebKit 2311, and the three specs 11.1.0 added or restated: ro-loop,
  release-10-1-3 and radius-scale (Chromium and coarse touch; WebKit does not match it).
- **Package.** The registry tarballs of 11.1.0 and 11.0.2 (`npm pack`, each unpacked into
  an empty directory) against the tip's fresh `dist` and `npm pack --dry-run`
  (`cmp.py`, `dts.py`, `closure.mjs`); custom properties, keyframes, `@property`,
  `@utility`, JS-written properties and `data-` attributes compared on the two `src`
  trees; `unlayered.mjs` lists every unlayered motion declaration on both; `kfuse.py`
  counts every keyframe's uses on both.
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing; the zone count read 3.5M. One WebKit lock wait ran about five minutes
  (`tipB-webkit-desktop`). Load was 5 to 17 through the readings. The power hold did not
  pause this seat (battery 80 % and charging).

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip, all four parts | 127 passed, 18 skipped | 134, 11 | 100, 44, **1 failed** | 134, 11 |
| v11.1.0, three witness parts | 77 failed, 9 passed | 75, 15 | 66, 8 | 72, 18 |

Across the witness cells: **289 red then green, 50 green on both, 1 red on both** (the
tip's failure, defect 1). No v11.1.0 failure is a timeout or a navigation error; each is
an assertion on its row's claim (`logs/matrix-why.txt`).

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form` at 390: Select R/G on all five paths in Chromium, on pick, Escape and current in WebKit (trigger and outside skipped there); menu R/G on four paths in Chromium, three in WebKit | holds; the fill is read on every exit frame |
| 2 phone popup is glass | `glass` at 390: R/G ×4 both engines; WebKit by computed style, as critique 1 recorded | holds |
| 3 one exit curve | `exit`: every surface R/G in every cell it opens in | holds |
| 4 every route | `routes`: R/G in every cell driven, the dragged detented Sheet included | holds |
| 5 reversal | `reverse`: R/G except `DropdownMenu reopened` (G/G ×3, R/G at Chromium 1440), `Toast closed while it opens` (G/G at WebKit 1440, below) and `Accordion reopened` (R/R at WebKit 390) | **the reopen cells fail by chance in WebKit at 390** (defect 1) |
| 6 tooltips | `tooltip`: R/G ×2 engines at 1440 | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 8 reduced motion | `site`, `fade`, `fold`, `press`: R/G ×4 (`press` ×3, WebKit 390 skipped); `still` G/G by design, 20/20 Chromium and 10/10 WebKit at 1440 | holds for what it reads; **a pressed Button shows nothing** (defect 3) |
| 9 ExpandableContainer | `expand`: exits and reopen R/G ×4, closed-while-entering R/G ×3 | holds; see open gap A |
| 10 small cures | `weight` R/G ×4, `lift` R/G ×2 at 390 | holds |
| 11 leave-finished | `leave`: says-once R/G in every cell; shadow root, unmount, ContextMenu, hover card R/G | holds |
| 12 round ends | `round · wide` R/G ×2 at 390; `compact` G/G (no change) | holds; **11.1.0's own cell not restated** (defect 2) |
| 13 (a) run mark | `mark`: R/G ×4 | holds |
| 13 (b) observer loop | left for 11.1.2 as the scope allows; WebKit 1440's standing part logs the loop errors fix 4 named | not read here |

The 50 green-on-both cells, accounted for: the `form` cells at 1440 (18; the claim is the
phone's), solid under reduced transparency (2), the compact strip (2), `DropdownMenu
reopened` (3), `Toast closed while it opens` at WebKit 1440 (1), ExpandableContainer's
two no-regression reads (8) and closed-while-entering at WebKit 1440 (1), the "says
nothing" cells where v11.1.0 has no event (11) and `still` (4).

Fix seat 4's cells, read again: `still` holds three runs of one value (`none` ×9-11,
`matrix(1, 0, 0, 0.97, 0, 0)` ×50-60, `none` ×59-73) and every clock `0s`, 30 of 30.
`press` reads scale `1`, transform `none` and the rest width on every held frame for all
three controls, `:active` on 16 to 36 frames; v11.1.0 reads the Button at `1.0328 0.911`,
the icon seat at `1.0066 0.9156` and the tab seat at `0.96`. The Toast's reversal on
v11.1.0 at WebKit 1440 failed in 6 of 6 repeats (`turnedAt` 1), so this seat's one green
reading there was a frame the sampler missed (0.598 to 0.771 in one 10 ms frame).

### 2. The motion rows' frame tables

Every table on the tip, in shares of the travel (`logs/sum-tip.txt`; Chromium samples near
120 Hz, WebKit near 100 Hz):

| | Chromium | WebKit |
|---|---|---|
| most carried by any 16.7 ms window | 0.181 | 0.184 |
| largest first moving sample | 0.100 in 10 ms | 0.118 in 12 ms (0.458 across a 48 ms hole, defect 1) |
| largest last sample before gone | 0.062 | 0.056 |
| longest hole in a moving table | 16 ms | 14 ms (47 to 51 ms in the two Accordion films of WebKit 390 part B) |
| a sample against the leg's direction, outside the turn cells | none | none |

- **No cut at either end, no last-frame step, no overshoot** in any table outside
  defect 1's starved films. Exit clocks on the tip: menus and selects 208 to 238 ms,
  popovers 248 to 267, tooltips 123 to 130, a dialog 194 to 206, a sheet 261 to 276; each
  under its entrance (406 to 428, 475 to 489, 227 to 236, 251 to 263, 474 to 657).
- **Reduced motion** (`logs/legs-tip.txt`): 120 legs fade over 113 to 206 ms across 11 to
  23 frames, monotone, with no box step in any. The leave event follows the last seen
  frame by 1 to 59 ms.
- **Gestalt.** Calm, read by the channels each film moves (`channels.py`): a phone Select
  slides down and fades (y and opacity); a menu draws its edge in as it fades (clip and
  opacity); a popover slides 8 px and fades with `scale: 1` and no blur on every frame; a
  tooltip fades alone. One effect per change, nothing added for ornament. Two films move
  more than that, both as on v11.1.0 and both in open gaps: a dock Select picked at 1440
  hops sideways on its first exit frame (B), and the Dialog leaves on fade, scale and a
  small drop (D).

### 3. Earlier release specs on the tip

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-5, part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / daraksha / fix 2 / critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-2 with slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop | 4/4 | 4/4 |
| release-10-1-3 (restated in 11.1.0) | 60/60 | 58 + 2 skipped |
| radius-scale (restated in 11.1.0), Chromium and coarse touch | **62 passed, 2 failed** | not matched |

The two failures are one title in light and dark under coarse touch, "a SegmentedTabs
strip wider than 20rem is a bar; a short one a stadium": expected `12px`, received `22px`.
On v11.1.0 the same spec passes 64 of 64 (`reg-red-radius-ch`). Defect 2. Every other
title passes on the tip, so no other v11.1.0 pass was needed.

### 4. Nothing removed or renamed

Against the published 11.1.0 tarball (899 files, 3,035,791 B, `npm view`'s own figures)
and the tip's fresh `dist` and pack (904 files, 3,054,566 B; `logs/package-vs-11.1.0.txt`,
`logs/dts-vs-11.1.0.txt`):

- `exports`: 70 keys on both, none removed, added or changed. No other `package.json`
  field differs but `version`.
- Files, chunk hashes normalised: none absent from the tip; five added (`exit-press`,
  `leave-finished` and their declarations, `turn.d.ts`). The two new composables are
  reachable only from `_shared/overlay/index`, which no export path names.
- Declarations: ten files differ, additions only (the `leaveFinished` emit and handler,
  the Toast's `open` and `defaultOpen` defaults, renumbered locals, two reworded doc
  comments).
- In `src`: custom properties 1,111 to 1,117 and none removed; keyframes three added, none
  removed; no `@property` or `@utility` name changed; no JS-written property removed
  (`--exit-curve` added); `data-` attribute names three added (`data-leave-key`,
  `data-leaving`, `data-plate`), none removed. The layer order gains `reduced-motion` at
  its end. The only unlayered motion left is the Slider's sheet, which takes its own zero
  clocks under reduced motion (`logs/unlayered-tip.txt`).
- Defaults moved since critique 3: the press under reduced motion for `useLiquidPress`,
  the dock icon seat and the dock tab seat (the ruling after critique 2, in the
  CHANGELOG). None beyond the scope.

### 5. Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run verify:package` | 0: `CLEAN`, 3,054,566 B, equal to `.bundle-ratchet` |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |

No workflow file runs a browser; `.github/` is unchanged from v11.1.0 and `ci.yml` is
browser-free by its own header. The exits gate, which `scripts/release.sh` runs under
`set -e`, failed in this seat's pass at WebKit 390 part B: defect 1.

### 6. Comments added in `src`

All 1,059 added lines were searched for row, round and seat words, inbound ids, release
numbers, site and consumer names and dates: none added. "Seat" appears only as the dock's
own word for a control and as a spring "seated" at a place. The one path to a tranche
document (`a11y-overrides.css`, the authorized-set register) is v11.1.0's sentence,
re-wrapped. Fix 4's comments (`useLiquidPress`, `DockControl`, the two dock sheets) say
what the code does.

### 7. The CHANGELOG entry

Outward prose, no internal ids, one em dash in the whole entry (the heading's). The
figures hold against the films (item 2) and v11.1.0's against its own (menus 121 to 141
ms, popovers 134 to 146, tooltips 73, a dialog 228 to 243 against an entrance of 238 to
259). The `--exit-curve` values, the layer order, the `data-plate` attribute and the
eight `detail.kind` values match the source. The size lines are exact
(`logs/sizes-table.txt`): the dock entry 38,673, 40,541 and 40,533 bytes; the five
surface entries and the seven others as printed; the next largest growths are under the
bar (`collapsible` +463, `configurator` +448, `expandable-container` +436). Not true or
complete: defects 3 and 4.

## Defects

1. **The exits gate fails by chance in WebKit at 390: the disclosure reopen cells.**
   `reverse · a Accordion reopened while it closes turns from where it is` failed in this
   seat's gate part B at WebKit 390 (`logs/tipB-webkit-phone`). Ten interleaved repeats of
   the four disclosure reversal cells (`logs/rev10-webkit-phone`) failed 7 of the 20
   reopen readings, Collapsible 4 and Accordion 3; the two "closed while it opens" cells
   passed 20 of 20. Each failing film has holes of 39 to 103 ms between samples, and the
   films around them paint at 11 to 25 frames a second; the same cells alone pass 20 of
   20 (`reopen{1,2}-tip`), at WebKit 1440 40 of 40, and in Chromium at 390 20 of 20, all
   with no hole over 13 ms. The cause of the stall was not found here. What fails is the
   judge. `judgeTurn` reads where the turn started from the last sample stamped before a
   call-time mark. In seven of the eight failures a hole of 47 to 103 ms spans the mark,
   that sample is stale (0.965 or 0.977 while the region turns at 0 to 0.20), and "the
   second input lands mid-motion" fails. In the eighth an 85 ms hole lets the close run
   out before the reopen is handled (`turnedAt` 0) and "turns short of the end" fails;
   passing films in the same run turned at 0.03 to 0.04 behind holes of the same size. A
   cell that cannot tell a stall from a cut gives a verdict either way (critique 2's gap
   A, critique 3's gap F). `gate.sh` runs under `set -e` from `scripts/release.sh`, so a
   stalled film stops the release. Cure the judge, not the threshold: read the turn's
   start on the frame clock (the frames painted after the second input, or `turnedAt`,
   which already bounds mid-motion), and treat a film with a hole longer than two frames
   around the turn as unread, filmed once more and recorded, rather than as red or green.
   Then read the four cells interleaved twenty times in WebKit at 390.

2. **A title 11.1.0's close restated fails on the tip and passes on v11.1.0.**
   `radius-scale.spec.ts`, "a SegmentedTabs strip wider than 20rem is a bar; a short one
   a stadium", light and dark under coarse touch: the wide strip's tab reads `22px`
   where the cell asserts the bar's `12px`. 11.1.0's close restated this spec for the
   touch floor (`a92a113d7`), and its wide-strip arm encodes the corner row 12 cures, so
   row 12 moves it on purpose. The scope's gate asks that 11.1.0's specs stay green or
   be restated with a biting plant. Restate the coarse-touch arm of the wide strip at half
   the touch floor (22 px, the strip 25 px), with the fine-pointer 12 px unchanged; it is
   then red on v11.1.0 and a second, static witness of row 12.

3. **Under reduced motion a pressed `Button` shows no press, and a menu row still
   shrinks.** The ruling after critique 2 is that a pressed control shows its press as
   the fill step alone; the CHANGELOG says "A pressed control shows its press by colour,
   not by size: a `Button`, a dock's seats…". Read on the tip (`probe/press.probe.ts`,
   `logs/probe-tip-*`), a held press under reduced motion:

   | control | pixels changed, rest to held | computed fill, filter | scale |
   |---|---|---|---|
   | `Button` (default emphasis), 1440, Chromium and WebKit | **0 %**, mean colour equal | unchanged | 1 |
   | `Button`, 390 touch, Chromium | 2.5 % | unchanged | 1 |
   | dock icon seat, both engines | 40 to 45 % | fill to α 0.20, `brightness(0.96)` | 1 |
   | dock tab seat, both engines | 69 to 78 % | fill to α 0.20 | 1 |
   | `Button` on v11.1.0, the same reads | 19 to 23 % | unchanged | `1.0328 0.911` |
   | `DropdownMenu` row, 1440, both engines and both trees | (not read) | | **0.97** from the first `:active` frame, 182 to 176.5 px |

   On v11.1.0 the Button's only press was its scale. The default Button has no `:active` fill: its press gleam is gated
   on `.glass-specular-track` (`button/styles.css:287`) and only the `quiet` and `text`
   emphases carry an `:active` fill (`:214`, `:222`). So the ruling took the size away
   and no colour came in its place: with a mouse the press is invisible. A menu or select
   row (`interactive-item`, `utilities/base.css:253-260`) still lands at 0.97 at once
   under reduced motion, a control that scales on press, which the ruling names. Build
   the fill step the ruling names for the Button under reduced motion, carry the ruling
   to `.interactive-item`, and read both with paint (a crop that changes on press, and
   scale 1); or, if either is left, say exactly that in the CHANGELOG.

4. **The CHANGELOG leaves out moved keyframes and the Dialog's half of the page press.**
   - Four keyframes glass ran on 11.1.0 now run nowhere and are not named: menus opening
     upward no longer run `glass-menu-grow-up`, menus no longer leave on
     `glass-menu-recede` or `glass-menu-recede-up`, and a reduced-motion popup no longer
     leaves on `glass-reveal-out-reduced` (`logs/kfuse.txt`; v11.1.0 `reveal.css:284-290,
     337, 368`).
   - Three keyframes changed shape: `glass-reveal-out` lost its 60 % stop (opacity now
     reaches 0 at the end, not at 60 %), and `glass-menu-recede` and `-up` lost their
     90 % opacity hold (`animations.css:157-171, 222-253` against v11.1.0's). The entry
     says `glass-reveal-out` "is still defined for stylesheets that name it", which
     reads as unchanged. A stylesheet that names it now gets the new shape.
   - "A press on the page behind a leaving sheet now reaches the page": the scrim that
     changed (`ModalScrim.vue`, pointer events only while open) is the Dialog's too
     (`ModalOverlay` in `DialogContent.vue:229` and `SheetContent.vue:341`), so a press
     behind a leaving Dialog reaches the page as well.
   Name the seven keyframes in the menu and reversal paragraphs and the Dialog in the
   press sentence.

## Open gaps (for INBOUND)

A. **The frame-share pairing still lets a one-frame cut through in one cell a reading.**
   `expand · an ExpandableContainer closed while it enters`, WebKit 1440 on v11.1.0: the
   panel falls from 0.256 to 0 in one 14 ms frame and the cell reads 0.185 against 0.2,
   because `worstFrameShare` pairs the sample with one 23 ms later. Critique 2 (gap C,
   Chromium 390) and critique 3 (one cell) saw the same. The Toast's reversal on v11.1.0
   escaped the same way once in seven WebKit 1440 readings.
B. **A dock Select picked at 1440 hops 10 to 11 px sideways on its first exit frame**
   (679 to 669 in Chromium, 679 to 668 in WebKit), as the trigger's new label re-places
   the anchored plate. v11.1.0 does the same; the exit is now about 230 ms, so the plate
   is seen there longer.
C. **Other press scales under reduced motion**, from fix 4's open list: a pressable card
   (`card/styles.css:197`) and a lifted sortable row (`sortable-list/styles.css:187`).
D. **The Dialog leaves on three channels**: opacity, a scale of about 5 % and an 11 to 13
   px drop (`channels-tip-*`, the CommandDialog box 350 to 333 px wide). Only its clock
   changed here; the popover register lost its scale under the ruling after critique 1,
   the Dialog kept it.
E. **The detented Sheet leaves on its own spring**, about 450 ms with a 10 px tail over
   the last 150 ms, and its fill alpha drifts from 0.20 to 0.18 on the way out. The
   CHANGELOG gives a figure only for the plain Sheet, so nothing it says is untrue.
F. **`gate.sh`**: its header says three parts and it runs four; with
   `GLASS_UI_DEMO_PORT` unset it serves on 5199 with `reuseExistingServer`, so a server
   another tree left on that port would be the one measured.
G. **Stale comments** (not stamps), from critique 3's gap G and new: `Toast.vue:124` (its
   exit as `glass-reveal-out`), `animations.css:146` (`glass-reveal-out` on the
   `--ease-out` clock) and the comment above `glass-reveal-out-reduced` (a carve that no
   longer uses it), `reveal.css:120` (`glass-menu-grow` below).
H. **The stall behind defect 1** (WebKit 390 films at 11 to 25 frames a second in some
   interleaved runs, at 100 in others) has no cause found: the machine, the WebKit
   process's state across cells, or the page.
I. Carried: routes not driven (critique 3's gap C); a drag-dismissed Sheet under reduced
   motion still snaps (gap D); WebKit at 390 holds no press and drags nothing in
   Playwright, and real Safari is unmeasured for those and for the firm plate's paint;
   row 13 (b) for 11.1.2; the CHANGELOG heading still reads "unreleased".
