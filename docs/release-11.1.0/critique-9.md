# glass-ui 11.1.0 · critique 9

A fresh adversarial critic (round 9), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0`. It built nothing on the branch. The round began at `c71efe8f4` (fix 9's
record); at 06:42 the orchestrator added `aebe5df1e`, a note for the close seat and nothing
else, so source and tests are the same on both and every run below read the same tree.

This round is the finite gate in `orchestrator-note-after-critique-8.md`: five items, each
read twice, and nothing else. `orchestrator-note-fable-review.md` was read first and is
binding; `-dock-search-throw`, `-after-fix-7`, `-ci-browser-free` and `-master-has-1102`
were read too.

Every browser and heavy run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. WebKit is Playwright's build 2287. **The guard
refused nothing.** The WebKit lock was shared with other sessions; each wait (up to about
twelve minutes) was a wait. Disk read 64 to 79 GB free throughout.

Records, all under `critic-9/`: `chain.log` (every run and its exit, in order), the drivers
`chain.sh`, `chain2.sh`, `gates.sh`, `release.sh`, the witnesses copied unchanged but for
their paths (`probe11/`, `probe10/`, `rerun/lane-L6/`, `rerun/lane-L7/`), this round's own
probe (`probe12/`), `unit/`, `gates/`, `release/`, `api/`, `changelog-check.out`, and
contact sheets under `sheets/` (PNGs are ignored by git, as in every round). Trees: the
tip; the pre-fix tree `.cache/f9-pre` (its `src/` compared equal to `git archive 432cbefda`
before any run); `v11.0.1` at `.cache/f7-v1101`; the 11.0.0 package at `.cache/l4-pack`.

## Verdict

The code gate is clean. Fix 9's two cures hold in Chromium and WebKit, are red on the
pre-fix tree, and bring no dock regression; the gates are green on the committed tree.

One finding, low, in the CHANGELOG only: one of the two sentences fix 9 added says more
than the dock does. It needs a clause reworded, no source change and no witness.

## The gate, item by item

### 1. Fix 9's two cures

| run | tip, Chromium | tip, WebKit | pre-fix, Chromium | pre-fix, WebKit |
| --- | --- | --- | --- | --- |
| probe11, all 60 cells | **60/60** | **60/60** | 12/60 | 12/60 |
| of those, the moved-dock cells (zoom 1.25, zoom 0.8, scale 0.8, a wrapper growing in, inside `Dialog`) | 40/40 | 40/40 | 0/40 | 0/40 |
| of those, the `dynslot` scene | 8/8 | 8/8 | 0/8 | 0/8 |
| probe10 (fix 8's gate) | **40/40** | **40/40** | | |
| the two unit cells (`unit/`) | 22/22 | | 2 failed of 22: the two new cells | |

The 12 cells green on the pre-fix tree are the 8 plain ones and the 4 table ones, as they
should be. (A count for the record: probe11 holds 40 moved-dock cells, 8 plain, 4 table and
8 slot cells. Critique 8 and fix 9 both write "48 moved-dock"; the 48 misses are 40 and 8.
The readings are not affected.)

**The plate in paint**, read from the captures and not only from the numbers
(`sheets/p11-chromium-tab-1440-light-rest.png`, `-icon-1440-dark-rest.png`, the pre-fix
tree on the left and the tip on the right; `sheets/p11-webkit-green-tab-1440-dark.png` and
`-icon-390-light.png`, at rest and after a navigation). On the pre-fix tree the plate lies
across "Methods" and "Results" under zoom 1.25 and sits short and left of its tab in the
other four places. On the tip it sits on its tab in all five, tab and glyph, light and
dark, in both engines, at rest and after the current control changes. 1440 light, Chromium:

| where the dock sits | control's plate | tip, painted |
| --- | --- | --- |
| `zoom: 1.25`, rest / moved | x 160.7, 170 × 47.5 / x 390 | x 161, 170 × 48 / x 390 |
| `zoom: 0.8` | x 108.6, 108.8 × 30.4 | x 109, 109 × 31 |
| `transform: scale(0.8)` | x 108.6, 108.8 × 30.4 | x 108, 109 × 30 |
| a wrapper growing in from 0.8, rest | x 131.7, 136 × 38 | x 132, 136 × 38 |
| inside `Dialog`, rest | x 600.7, 136 × 38 | x 601, 136 × 38 |

**This round's own probe (probe12): the places fix 9's record left unread.** Same method as
probe11 (the plate painted magenta, its box read from the screenshot against the control's
plate box within 2 px, at rest and after a navigation), tab and glyph, 390 and 1440, light
and dark:

| where the dock sits | tip, Chromium | tip, WebKit | pre-fix, both engines | v11.0.1 tabs, Chromium |
| --- | --- | --- | --- | --- |
| an ancestor with `transform: scale(0.8, 1.2)` | 8/8 | 8/8 | 0/8 | 4/4 |
| `scale(0.8)` around `zoom: 1.25` | 8/8 | 8/8 | 8/8 (the two cancel) | 4/4 |
| a right-to-left page under `zoom: 1.25` | 8/8 | 8/8 | 0/8 | 4/4 |
| a vertical dock under `zoom: 1.25` | 8/8 | 8/8 | 0/8 | 4/4 |
| reduced motion under `zoom: 0.8` | 8/8 | 8/8 | 0/8 | 4/4 |
| all | **40/40** | **40/40** | 8/40 | 20/20 |

v11.0.1 is the reader's control: every tab cell is on its control there (its glyph cells
draw no plate, as that tree does not). Paint: `sheets/p12-chromium-1440-light.png` and
`sheets/p12-chromium-vert-390-dark.png` (pre-fix beside the tip). So fix 9's open gap "a
non-uniform ancestor transform was not read" is now read, and holds. A rotating ancestor
was not read (a bounding box cannot judge it).

**The cure itself, read against the source** (`useDockRunMark.ts`, `layoutBoxOf` and
`plateOf`): offsets summed up the offset-parent chain to the run, each intermediate
parent's `clientLeft`/`clientTop` added, the right-to-left offset taken from the run's
`clientWidth`. No second measure, no timer, no listener, as the mark-press note asked.
Offsets are whole pixels, so the plate can sit up to half a pixel from a fractional box;
every reading above is inside that, and nothing in paint shows it.

**The slot.** `persistentFace` and `summaryIsDisclosure` are functions read at render and at
each event (`GlassDock.vue:259-262`, the five bindings at `:574-578`). The summary gains
its role, tab stop and name when `#collapsed` arrives and loses them when it goes
(`sheets/p11-chromium-dynslot-1440.png`).

One reading for the orchestrator, not a defect. The note asks both that probe11's `dynslot`
scene read 8/8 and that "the reverse (the slot leaves) reads as it does on v11.0.1". The
two differ: probe11's `goes` cells ask for a bare summary, and v11.0.1 leaves a 0 px
"Expand dock" button in the tab order. Fix 9 followed the probe, and said so. Read twice,
that is the right one of the two: a dock mounted without the slot is bare on this branch,
so a dock whose slot has gone now reads the same as one that never had it, and no empty
button is left to tab onto.

### 2. No dock regression from the cure

**The dock in every posture** (lane L6's witness, unchanged):

| | Chromium | WebKit |
| --- | --- | --- |
| lane L6 | **161/161** | **155/155** |

The cells cover 390 and 1440, fine and coarse (the hover cells and the long-press cells,
synthetic and through CDP), light and dark. In paint
(`sheets/l6-chromium-postures-390.png`, `-1440.png`, `l6-chromium-face.png`, and the three
`l6-webkit-*` sheets): open, open with a persistent control, collapsed square, two-cell,
wide ("Now 12"), the persistent face leading, trailing and both, vertical open and
collapsed. Every one is a clean capsule or circle, with no flat end and no second shape,
in both engines.

**The release specs** (`release/runs.txt`), one worker:

| spec | Chromium | WebKit |
| --- | --- | --- |
| `release-10-1-3` | 60/60 | 58 passed, 2 skipped (the spec's own engine skips) |
| `release-10-1-5` part A | 84/84 | 84/84 |
| `release-10-1-5` part B | 23/23 | 23/23 |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` | 9/9 | 9/9 |

Every title passes on the first run in both engines, so no title that passed at critique 8
fails now. Part B in Chromium ran while the machine's one-minute load rose to 93 and still
read 23/23; the corrected vertical-end reader in `release-11-0-1-critic-2` read 9/9 in
WebKit, where critique 8 read 8, 8, 9 and 7.

### 3. Lane L7 in WebKit, the corrected reader

One pass: **80/80**, exit 0 (`rerun/lane-L7/out/green-webkit.log`). All sixteen "drawn"
cells read "unmeasurable in paint": the screencast again held no frame after the event
(`firstFrameAfterDrawn: -1` in every one). The page's own record is right in all sixteen
(`count: 1, running: 0, finalAtDrawn: true`, read from `green-webkit.json`). The stall
cells are unmeasurable as before, and every gated cell is green.

So the reader does what the ruling asked, and the lock was no quieter this round than
last (load 12 to 18). What this pass does not give is the paint after `drawn` in WebKit:
that has now been unmeasurable in every WebKit pass since fix 8's. It is in the open gaps.

### 4. The gates, committed tree

`gates/chain.log`, one guarded run at `c71efe8f4` with no change in `src`, `tests`,
`package.json`, `CHANGELOG.md` or `.bundle-ratchet`: build 0, typecheck 0, demo:dist:build
0, vitest 0 (279 files; 2582 passed, 10 expected fail, 1 skipped), verify:package 0, CLEAN,
the bundle ratchet equal at 3030963 as committed.

### 5. The CHANGELOG

Read in full against the tree. No row or wave ids, no lane, seat, critic, witness or
tranche vocabulary, no record paths (`changelog-check.out`: PASS on every line). The
sentence on the plate under zoom and scale is true, by item 1. The heading reads
"unreleased" and `package.json` reads 11.0.1; the close sets both. One sentence is not
true as written: the finding below.

## Defects (reproduced)

### 1. The CHANGELOG says the collapsed dock follows `#collapsed` content; it follows the slot (low, wording only)

**What the entry says** (`CHANGELOG.md`, "A collapsed dock can be just its always-visible
controls", the sentence fix 9 added): "If your `#collapsed` content only shows some of the
time, say a reading that appears once data loads, the collapsed dock follows it: while the
content is there it is the "Expand dock" button, and while it is not the always-visible
controls stand alone."

**What the dock does.** `GlassDock.vue:259-260` reads whether the slot was passed
(`!slots.collapsed`), not whether it rendered anything. So the sentence holds for a slot
passed conditionally (`<template v-if="reading" #collapsed>`), which is what probe11's
`dynslot` scene mounts. It does not hold for the other common way to write "a reading that
appears once data loads", the condition inside the slot
(`<template #collapsed><Reading v-if="loaded" /></template>`).

probe12, scene `inslot`: a `collapse="closed"` dock with a `#persistent` control and a
`#collapsed` slot that is always passed, its content then emptied.

| | summary's content | `role` | `tabindex` | `aria-label` |
| --- | --- | --- | --- | --- |
| tip, the content there | glyph and "Now", 55.6 to 61.1 px | `button` | `0` | "Expand dock" |
| tip, the content gone | none (0 px wide) | **`button`** | **`0`** | **"Expand dock"** |
| v11.0.1, the content gone | none (0 px wide) | `button` | `0` | "Expand dock" |

The same in Chromium and WebKit, at 390 and 1440 (`probe12/out/green-*.log`, the `READING`
lines; `sheets/p12-chromium-inslot.png`). With the content gone the dock shows the
persistent control alone, 56 by 56, and an "Expand dock" button with no width stays in the
tab order beside it.

**Read twice.** It is no regression: v11.0.1 reads the same, and nothing a consumer has
today changes. It is not a defect of the cure, which does what its gate asked. It is that
the entry promises a consumer who conditions the content, not the slot, something that
does not happen, and item 5 of the gate asks whether the CHANGELOG is true.

**Cure.** Say which case it is. For example: "If you pass the `#collapsed` slot only some
of the time, say with a `v-if` on its `<template>` for a reading that appears once data
loads, the collapsed dock follows it: …". No source change in this release; the scope is
frozen, and following the slot's rendered content is a different mechanism (booked below).

## Read and not called defects

- **Fix 9 section 4, the dock search page's throw.** The cure is reverted whole
  (`4adbb0225`); `git diff 06da3bb9c HEAD -- src tests` is empty. v11.0.1 throws the same
  by fix 9's reading, and the note leaves it for 11.1.1. Not rerun here; not on the list.
- **The three test readers.** Test only, as ruled. The vertical-end reader read 9/9 in
  both engines; lane L7's reader fails a wrong record whatever the screencast holds (the
  source line, `lane-L7/probe.mjs`, `record && (!paintMeasurable || …)`); lane L2's is not
  on this round's list and was not rerun.
- **Fable review item 9.** Not reopened. No reading here contradicts a lane's.

## A consumer of 11.0.0

`api/compare.json` (the built package against the 11.0.0 package) is identical to critique
8's: no export, entry or `.d.ts` file gone; exports added on four entries only; the custom
properties gone are `--hm-h` and the two route variables the headline names; the one class
gone is Tailwind's `overflow-auto` on the table container. Fix 9 changed no public name.

## For INBOUND (not defects of this release's items)

- **The collapsed dock decides its face from whether `#collapsed` was passed, not from what
  it rendered.** A slot that is passed and renders nothing leaves a 0 px "Expand dock"
  button in the tab order beside the persistent controls, on 11.0.0, 11.0.1 and this
  branch alike (probe12, `inslot`). Following the rendered content would close it; that is
  the collapsed face's design, which is with W-I.8.
- **Lane L7's "drawn" cells have had no paint reading in WebKit since fix 8** (four passes
  across critique 8, fix 9 and this round, 16 of 16 unmeasurable each time, the record
  right every time). The screencast is the wrong instrument for a frame after the event in
  this engine; a still screenshot taken after `drawn` would read the finished mark.
- **The dock search demo page throws at mount** (fix 9 section 4, for 11.1.1; the built
  cure is `665c5ca1f`).
- **A glyph control marked current widens to 128 px in a five-glyph nav dock**, so the
  selected plate is a wide capsule around one glyph (`sheets/p11-webkit-green-icon-390-light.png`).
  It is the open seat's width as built and as critique 8 read it; whether a current glyph
  should widen is the dock design loop's.
- Critique 8's other INBOUND rows stand as written (the `release-10-1-3` zoom cell's 2 px
  frame bound, the 37 e2e cases that fail on both trees, a dock wider than a 390 px
  `Dialog`).

## Open gaps

- **Paint after `drawn` in WebKit is unmeasured** (above); Chromium's paint cells were last
  read green at critique 8 and the source has not changed since.
- **Lane L7's stall cells in WebKit are unmeasurable**, recorded and not gated, as ruled.
- **The plate under a rotating ancestor** was not read.
- **master has moved past the merge and now carries 11.0.2**
  (`orchestrator-note-master-has-1102.md`, `-ci-browser-free.md`): the close merges master
  first, reruns the battery and the 11.0.2 specs on the merged tree, and rebinds the
  ratchet last. Nothing in this round speaks for the merged tree.
- The version and the CHANGELOG date are the close's.
- Real Safari, real iOS and Android touch are not measured; WebKit is Playwright's 2287.

## For the next seat

1. Reword the one CHANGELOG sentence so it names the slot passed conditionally (finding 1).
   The close seat rewrites the CHANGELOG at the merge and can take it there; it needs no
   build and no witness.
