# 11.1.1 critique 2

Critic: claude-fable-5-2, fresh; built nothing on the branch. Tip read: `a8e4f7ee2` on
`release/11.1.1`. Verdict: **not ready to tag.** Four defects: one witness is red on the
tip, so the exits gate and `scripts/release.sh` fail; the Slider moves under reduced
motion where 11.1.0 held it still; a detented Sheet dismissed by a drag jumps back up
before it leaves; and the CHANGELOG is short of four moved values and wrong in one
sentence. Everything else on the list holds.

Everything here was run by this seat. Tools, logs and readings are under `critic-2/`.

## How it was read

- **Trees.** The tip is the worktree at `a8e4f7ee2`, tracked tree clean before and after.
  The v11.1.0 tree is the `git archive v11.1.0` at `.cache/red-v11.1.0/tree`; its `src/`,
  `demo/` and `package.json` (864 files) were hashed against the tag before use: no
  difference.
- **Witness.** The three 11.1.1 specs in their four projects, as the gate runs them (four
  parts, one Playwright process each): 16 runs on the tip, and the three witness parts
  (12 runs) on v11.1.0 (`logs/tip{A,B,C,D}-*`, `logs/red{A,B,D}-*`). Each cell's verdict
  is in `matrix.txt` (`matrix.py`); why each v11.1.0 cell failed is in
  `logs/matrix-why.txt`; the raw per-sample steps of every frame table are in
  `logs/steps-*.txt` (`steps.py`).
- **Probes** (`probe/`, one browser per run, own server on 5353 and 5354):
  `slider-reduce.mjs` and `detent-drag.mjs`, each on both trees.
- **Earlier release specs.** `reg-inner.sh`, the list the 11.1.0 close ran: release-10-1-5
  (two halves), release-11-0-1 (owner, fix 2, critic 2), release-11-0-2 with
  slider-forced-colors, release-11-0-2 on coarse touch and on WebKit 2311, and ro-loop,
  11.1.0's resize witness (no file is named release-11-1-0).
- **Package.** The registry tarballs of 11.1.0 and 11.0.2, fetched with `npm pack`,
  against the tip's fresh `dist`.
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing. It warned that the kernel zone watch is armed (a warning only). No
  WebKit lock wait passed a minute; heavy-slot waits ran to nine minutes. The machine's
  load was 10 to 59 through the readings, from other sessions.
- **One fault in my own tooling, corrected:** the first 28 lines of `logs/runs.out` print
  `exit 0` or `exit 1` read after a date substitution, so they are not exit codes. Every
  verdict here is read from the run's report, not from that file.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip, all four parts | 121 passed, 17 skipped | 128, 10 | 98, 40 | 127, 10, **1 failed** |
| v11.1.0, three witness parts | 71 failed, 9 passed | 72, 12 | 64, 7 | 72, 12 |

Across the witness cells: **278 red then green, 40 green on both, 1 red on both.** Every
v11.1.0 failure is an assertion on its row's own claim; none is a timeout or a navigation
error (`logs/matrix-why.txt`).

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form` at 390: R/G in both engines by pick and Escape, and by outside in Chromium | holds |
| 2 phone popup is glass | `glass` at 390: R/G ×4 in both engines | holds; WebKit by computed style only, as critique 1 recorded |
| 3 one exit curve | `exit`: Select, DropdownMenu, Popover, Dialog and both Sheets R/G ×4, Tooltip R/G ×2 | holds |
| 4 every route | `routes`: every cell R/G | holds for the routes driven; **the drag is not driven and jumps** (defect 3) |
| 5 reversal | `reverse`: R/G in every cell but one surface | holds; `DropdownMenu reopened` is G/G ×4, as fix 2 recorded |
| 6 tooltips | `tooltip`: R/G ×2 engines at 1440 | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 8 reduced motion | `site`, `fade`, `fold`: R/G ×4 except one cell | **`fade · a dock Select` is R/R in WebKit at 1440** (defect 1) |
| 9 ExpandableContainer | `expand`: the three exits and the reopen R/G ×4; closed-while-entering R/G ×3 | holds; see open gap C |
| 10 small cures | `weight` R/G ×4, `lift` R/G ×2 at 390 | holds |
| 11 leave-finished | `leave`: says-once R/G in every cell; shadow root, unmount, ContextMenu, hover card R/G | holds |
| 12 round ends | `round · wide` R/G ×2 at 390; `compact` G/G (no change, recorded) | holds |
| 13 (a) run mark | `mark`: R/G ×4 | holds |
| 13 (b) observer loop | not reproduced by fix 2, left for 11.1.2 as the scope allows | not re-read here |

The 40 green-on-both cells, each accounted for: the `form` cells at 1440 (12; the claim is
the phone's), the solid plate under reduced transparency (2; "as before"), the compact
strip (2), `DropdownMenu reopened` (4), the two no-regression reads of row 9 (8), the
"says nothing" cells where v11.1.0 has no event to send (11), and one cell in open gap C.

Motion is read from per-frame films (box, effective opacity, clip, computed scale and
filter where the claim is their absence); row 2 reads screenshots in Chromium.

### 2. The motion rows' frame tables

Read from the raw samples of every table on the tip (Chromium samples near 120 Hz, WebKit
near 60 Hz), in shares of the travel:

| | Chromium | WebKit |
|---|---|---|
| most carried by any 16.7 ms window | 0.174 | 0.192 |
| largest first moving sample | 0.09 | 0.14 (0.22 across one 32 ms hole) |
| largest last sample before gone | 0.062 | 0.068 (0.19 across one 92 ms hole, open gap A) |
| a sample against the exit's direction | none | none |

- **No cut at either end and no last-frame step** in any cell the gate drives. The steepest
  are the cells critique 1 named: ExpandableContainer's 134 ms exit (0.166 to 0.177), the
  detented Sheet (0.163 to 0.192), a Tooltip (0.158 to 0.168), and the two disclosures
  (0.17).
- **No overshoot** on any exit.
- **Reduced motion:** every fade leg runs 112 to 205 ms, monotone, 11 to 23 frames, with
  no box step except defect 1's.
- **One route the gate does not drive has a cut at its start:** defect 3.
- **Gestalt.** The strips read calm, and the after-critique ruling is met: a Popover and a
  hover card show `scale: 1` and `blur(0px)` on every frame of both legs, a tooltip on
  every frame of its exit. A menu's clip recedes as it fades; the phone sheet slides and
  fades; a Dialog and a Sheet leave on one curve. Nothing was added for ornament. The
  Toast still leaves by its three-channel dissolve, which an earlier owner order asked
  for by name, and the tooltip still grows slightly on the way in; the CHANGELOG says so.

### 3. Earlier release specs on the tip

One guarded call per engine (`logs/reg-branch-*`, `logs/chain.txt`):

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-5, part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / fix 2 / critic 2 | 9, 14, 9 | 9, 14, 9 |
| release-11-0-2 with slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0's resize-mid-morph witness) | 4/4 | 4/4 |

**No title fails on the tip** in either engine, so no v11.1.0 pass was needed. The counts
and skips equal critique 1's and the 11.1.0 close's.

### 4. Nothing removed or renamed

Against the published 11.1.0 tarball and the tip's fresh `dist`:

- `exports` (70 keys), `files`, `types`, `typesVersions`, `sideEffects`, `main`,
  `module`, the dependency fields and `engines`: equal.
- File list, chunk hashes normalised: no name absent from the tip; five added
  (`exit-press`, `leave-finished` and their declarations, `turn.d.ts`). The published
  tarball also carries 24 chunks no clean build emits: open gap D.
- Declarations: nine files differ, additions only. The five lines that went are one
  comment and renumbered locals.
- Custom properties declared in `src`: 1,111 on v11.1.0, 1,117 on the tip, none removed.
  Keyframes: none removed, three added.
- Defaults that moved under a scope row and are in the CHANGELOG: `--exit-curve`, the
  menu's exit clock, the narrow popups' material and its attribute, the overlay
  register's entrance and exit, the tooltip's fade, the Dialog's and the Sheet's exit,
  the reduced-motion layer, the four fixes.
- **One default moved that no row names and the CHANGELOG does not say: defect 2.**

**Sizes.** `critic-1/closure.mjs` on the three published or built packages: the dock
entry is 38,673 B gzipped in 11.0.2, 40,541 in 11.1.0 and 40,541 on the tip, byte for byte
the same closure of 27 files. `dialog` 12,508 to 14,494, `select` 8,453 to 9,517,
`popover` 8,663 to 9,385, `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555. The
CHANGELOG's two size lines are exact.

### 5. Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | 0: `CLEAN`, 904 files, 3,054,190 B, equal to `.bundle-ratchet` |

No workflow file runs a browser; `.github/` is unchanged from v11.1.0. The exits gate
itself, which `scripts/release.sh` runs under `set -e`, does not pass: defect 1.

### 6. Comments added in `src`

All 989 added lines were searched for row, round and seat words, inbound ids, site names
and dates: none added. Two hits are v11.1.0 sentences that a re-wrap moved onto added
lines (`sheet/styles.css`, "takes no floor this round … next π";
`a11y-overrides.css`, the path of the authorized-set register). Neither is this release's.

### 7. The CHANGELOG entry

Outward prose, no internal ids, one em dash in the whole entry (the heading's). Its
figures hold against the films: menus and selects leave in 204 to 234 ms, popovers 253 to
266, tooltips 130 to 134, a dialog 197 to 204, a sheet 258 to 281, each shorter than its
entrance; 11.1.0's read 126 to 155, 138 to 141, 72 to 80, 231 to 243 and 203 to 221. The
size lines are exact. Not yet true or complete: defect 4.

## Defects

1. **A witness is red on the tip, so the exits gate fails.** `fade · a dock Select
   appears and leaves on a fade`, WebKit at 1440 under reduced motion: red in 4 of 4
   readings here (`logs/tipD-webkit-desktop`, `logs/dsel-{1,2,3}`), after 8 of 8 in fix 2.
   The entrance's first painted frame, at opacity 0.036 to 0.056, sits at (681, 65); the
   plate rests at (679, 66), the same size. The gate's fourth part exits 1 for that
   project and `scripts/release.sh` stops there, so no tag can be cut by the lawful path.
   The CHANGELOG's "a surface is in its place and at its size from the first frame" is
   untrue of this one. The offset fits fix 2's reading: 2 px right and 1 px up is where a
   start-aligned plate lands against a trigger about 130 px wide pressed to 0.97. Cure it
   or have the orchestrator rule on it; do not widen the tolerance to pass.

2. **The Slider moves under reduced motion; on 11.1.0 it did not.** `slider/styles.css`
   is unlayered on purpose (its header says why), and it is the only glass sheet that is.
   The reduced-motion fallback was `!important` in `components`, which beats an unlayered
   normal rule; it is now a normal rule in the last layer, which loses to one. Read in
   Chromium at 1440 with reduced motion emulated (`probe/slider-reduce.mjs`,
   `logs/slider-reduce-{tip,red}.json`):

   | | v11.1.0 | tip |
   |---|---|---|
   | computed clock, fill / thumb / track / root | 0s on all | 0.3 s, 0.12 s on the press spring, 0.2 s, 0.2 s |
   | fill's transform through a held press | 2 values, lands at once | 17 values over 16 frames |
   | fill's transform after release | 1 value | 38 values over 37 frames, on the punch curve |

   Row 8's law is that transform does not travel under reduced motion, and fix 2's record
   says every glass rule is layered. It is a default no row ordered changed and the
   CHANGELOG does not name. The cure belongs in the slider's own sheet (it already holds
   three reduced-motion blocks), with a witness that is red on the tip.

3. **A detented Sheet dismissed by a drag jumps back up before it leaves.** The exits
   table marks four routes of the detented Sheet as cut: close, outside, Escape and the
   swipe. The gate drives outside and Escape. Read by `probe/detent-drag.mjs` in Chromium,
   mouse drag of 360 px, both trees (`logs/detent-drag2-{tip,red}.json`), in shares of the
   plate at rest:

   | | through the drag | first frame after release | then |
   |---|---|---|---|
   | tip, 390 | 0.36 falling to 0.147 | **0.973** | slides out whole, last seen 0.002 |
   | tip, 1440 | 0.40 falling to 0.20 | **0.973** | slides out whole |
   | v11.1.0, 390 | held at 0.405 | 0.973 | slides to 0.405, holds, removed at 0.405 |
   | v11.1.0, 1440 | held at 0.46 | 0.973 | slides to 0.46, holds, removed at 0.46 |

   The end cut is cured on this route too. The start is not: on release the plate
   re-inflates to its rung in one frame and exits from there, and because the plate now
   follows the finger below its floor the jump is larger than it was (0.83 of the plate
   against 0.57). The CHANGELOG says the sheet slides out "however it is closed". The
   close should start from where the drag left the plate, and the gate should drive the
   route.

4. **The CHANGELOG entry is not yet true or complete.**
   - "Nothing travels" under reduced motion is untrue of the Slider (defect 2), and "in
     its place … from the first frame" of the dock Select in WebKit (defect 1).
   - The reduced-motion paragraph says a site's own rule keeps its clock. It does not say
     the other half: glass no longer stills a site's own unlayered animations and
     transitions, travel included, which 11.1.0 stilled even over `!important`. A site
     that leaned on that needs its own reduced-motion rule, and should be told.
   - "A popover moves by fading and a short slide" names the Popover and the hover card.
     The same register is the `Toast`'s entrance (it wears `data-reveal="overlay"`), which
     also lost its scale and blur, and the default of every surface that wears
     `.glass-reveal` with no register. `--enter-overlay-scale` and `--enter-overlay-blur`
     are still declared but no longer reach the reveal; a site that tuned them should
     be told.
   - `ExpandableContainer` no longer runs the `expandable-container-birth` and
     `expandable-container-arrive` keyframes (its entrance is a transition now). The entry
     says this of `glass-menu-grow` and `glass-reveal-out`, not of these two.
   - "made it jump to fully open before it moved again" does not describe a
     `DropdownMenu` reopened while leaving on 11.1.0: it fell to its trigger strip and
     grew again (0.33 to 0.20 in one sample), which is why that cell is green on both
     trees. Say what it did, or drop the menu from that half of the sentence.
   - "however it is closed" (defect 3).

## Open gaps (for INBOUND)

A. **The standing gate forgives a hole in the film.** Under a load of 28 to 38, WebKit at
   390 painted the Collapsible's and the Accordion's 200 ms close in three to five frames,
   with holes of 74 to 97 ms (0.965, 0.309, 0.07, gone), and the cells passed, since the
   judge scales each step by the time it took. Alone, at a load of 13, three readings
   show 19 to 20 samples and no hole (`logs/disc-{1,2,3}`). A cell read under load cannot
   tell a stall from a cut.
B. **Routes still not driven**, from critique 1's sixth defect: the DropdownMenu submenu;
   ContextMenu and the hover card in the standing cell; the Select in a collapsible dock
   and a Popover in a dock; the detented Sheet's close button; the Toast's swipe; the
   dock's own fold outside reduced motion. Under reduced motion: ContextMenu, the hover
   card, the detented Sheet, a drag-dismissed Sheet and `DockCrossfade`'s face swap.
C. **The pairing weakness critique 1 named still lets one cut through.**
   `expand · an ExpandableContainer closed while it enters` passed on v11.1.0 in Chromium
   at 390 here: the panel went from 0.273 to gone in one 8 ms sample, and
   `worstFrameShare` paired that sample with one 25 ms later and read 0.182. The cell is
   red on v11.1.0 in the other three projects.
D. **The published 11.1.0 tarball is not the tree `verify:package` measured.** It holds
   923 files and 3,162,843 B unpacked against a ratchet of 3,035,791: 24 chunks (127,052
   B) that no clean build of the tag emits, of another hash generation, imported by
   nothing but each other. A clean build of the tag has 899 files. Whatever built twice into one
   `dist` before `npm publish` will do the same to 11.1.1.
E. **Stale comments** (not stamps): `reveal.css` still says the menu grows on
   "`glass-menu-grow` below", and `Toast.vue`'s class comment still describes the
   entrance as scale from 0.94 with a blur and the exit as the `glass-reveal-out`
   keyframe.
F. Row 13 (b), the WebKit ResizeObserver loop, was not re-read here; it stands as fix 2
   left it, for 11.1.2 with the consumer's probe as its witness.
G. Real Safari is unmeasured for the firm plate and for defect 1's first frame.
H. The CHANGELOG heading still reads "unreleased"; the close dates it.
