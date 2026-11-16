# glass-ui 11.1.0 · fix 9

The fix seat before critic 9, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `432cbefda` (the orchestrator's rulings after
critique 8). It took critique 8's two findings and the three test readers in
`orchestrator-note-after-critique-8.md` ("For fix 9"), and nothing else: no rebuild, no
merge of master.

Commits, read from `git log`: `02d13a4c7` (the plate's measure), `e6980788a` (the
persistent face), `cbf0bcde5` (CHANGELOG), `8bcedf25c` (the three readers), `06da3bb9c`
(the ratchet), `665c5ca1f` and its revert `4adbb0225` (section 4), and the records commit that
carries this file. Driver: `fix-9/chain.sh`;
every run and its exit are in `fix-9/chain.log`. The pre-fix tree is `.cache/f9-pre`
(`git archive 432cbefda`).

## 1. The selected plate was off its control under a zoom or a transform (medium)

**Root.** `plateOf` read the run and the seat with `getBoundingClientRect()`, which returns
boxes after every ancestor transform and zoom, and `paint` wrote those numbers as px on
the run, where they are laid out in the run's own coordinates and then scaled again. The
scale applied twice.

**Cure** (`02d13a4c7`), at the measure, as `orchestrator-note-mark-press.md` names it.
`layoutBoxOf(run, seat)` sums `offsetLeft`/`offsetTop` up the offset-parent chain to the
run (adding each intermediate offset parent's `clientLeft`/`clientTop`) and takes
`offsetWidth`/`offsetHeight`. The run is always positioned (layers.css: `relative` while
active, `absolute` otherwise), so the chain reaches it. Offsets ignore scroll and run from
the padding box's left edge at the scroll origin, so the left-to-right offset is the box's
left plus its clip inset, and right to left it is `clientWidth − (left + width)` plus the
inset; no `scrollLeft` term remains. A layout box carries no transform and no zoom, of an
ancestor or of the seat itself, so:

- under a zoom or a scaled stage the plate is scaled once, by what scales the run;
- a first measure taken while a dialog or a wrapper is still scaling in is already the box
  at rest, so nothing has to measure again when the entrance ends (no second measure, no
  timer, no `animationend` listener);
- a pressed seat's own scale cannot be baked in either (the door the mark-press note named).

Offsets are whole pixels in both engines, so the plate can sit up to half a pixel from a
fractional box; every gate below holds at 1.5 to 2 px and the paint reads on its tab.
Nothing changes in paint, motion, the spring or the first-frame wait.

**Witnesses.**

- Unit: `GlassDock.run-mark.test.ts` "measures layout boxes, so a zoom or a transform above
  the run scales the plate once". The stub gives the current seat a layout box of
  40,4 100×36 and viewport rects 1.25 times that. RED on the pre-fix tree
  (`fix-9/unit/red.out`: `['50px','5px','125px','45px']` against
  `['40px','4px','100px','36px']`), GREEN on the cure (`fix-9/unit/green.out`).
- Engine: critic 8's probe11 unchanged except its path (`fix-9/probe11`). The five-tab
  nav dock, tab and glyph, at 390 and 1440, light and dark, at rest and after a navigation,
  under `zoom: 1.25`, `zoom: 0.8`, `transform: scale(0.8)`, a wrapper growing in from 0.8,
  and inside the library's `Dialog`; the plate painted magenta and read from the
  screenshot against the control's plate box within 2 px.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch (all 60 cells: 48 moved-dock, 8 plain, 4 table) + 8 dynslot | **60/60** | **60/60** |
| pre-fix `.cache/f9-pre` | **12/60** (the 48 moved-dock cells off, the 8 dynslot cells fail) | **12/60** (the same 48 and 8; e.g. `zoom: 1.25` at 1440 light, plate x 156.7 170 × 47.5, painted x 189 213 × 52, branch x 157 170 × 48) |

1440 light, Chromium (`probe11/out/{pre,green}-chromium.log`):

| where the dock sits | control's plate | pre-fix paint | branch paint |
| --- | --- | --- | --- |
| `zoom: 1.25`, rest / moved | x 160.7, 170 × 47.5 / x 390 | x 194, 213 × 52 / x 482 | x 161, 170 × 48 / x 390 |
| `zoom: 0.8` | x 108.6, 108.8 × 30.4 | x 91, 87 × 25 | x 109, 109 × 31 |
| `transform: scale(0.8)` | x 108.6, 108.8 × 30.4 | x 91, 87 × 24 | x 108, 109 × 30 |
| a wrapper growing in from 0.8, rest | x 131.7, 136 × 38 | x 110, 109 × 30 | x 132, 136 × 38 |
| inside `Dialog`, rest | x 600.7, 136 × 38 | x 596, 130 × 36 | x 601, 136 × 38 |

Paint: `fix-9/probe11/out/png/{pre,green}-{chromium,webkit}-*` (ignored by git, as every
round's PNGs).

**No regression from the cure** (branch, both engines):

| witness | what it holds | Chromium | WebKit 2287 |
| --- | --- | --- | --- |
| probe10 (fix 8's gate: earlier seat resizes, separators, nav) | 40 cells | **40/40** | **40/40** |
| probe9 (fix 7's gates, right-to-left and live direction flips included) | 24 cells | **24/24** | **24/24** |
| fix 6 witness | 16 cells | **16/16** | **16/16** |
| fix 5 witness (the mark-press gates: click, keyboard, route change) | 40 cells | **40/40** | **40/40** |
| lane L1 (O-164 4, O-188 6, O-169 17) | 27 cells | **27/27** | **27/27** |

## 2. A `#collapsed` slot that arrived after mount was no button (low)

**Root.** `GlassDock.vue` decided the persistent face in a `computed` over `useSlots()`. The
slots object is not reactive, so the computed ran once at mount; the template re-rendered
when the slot came or went and the two disagreed from then on.

**Cure** (`e6980788a`). `persistentFace` and `summaryIsDisclosure` are plain functions,
read on every render (the summary's `role`, `tabindex`, `aria-label`, `aria-expanded`,
`aria-controls`) and at every event (Enter and Space on the summary, its focus, the
collapse's focus hand-off). The summary is the "Expand dock" button exactly while
`#collapsed` has content, whether it was there at mount, came later or went.

On the reverse: critique 8's gate and probe11's `dynslot-goes` cells ask that the
summary is the button exactly while the slot has content, so once the slot goes it is
bare, the same as a dock mounted without it. v11.0.0 and v11.0.1 leave a 0 px "Expand
dock" button in the tab order there because they have no persistent face at all; critique
8 called that "no regression; one cure covers both". This seat follows the gate: the
reverse reads as a dock that never had the slot.

**Witnesses.**

- Unit: `GlassDock.persistent-face.test.ts` "follows a #collapsed slot that comes or goes
  after mount" (absent, comes, goes). RED on the pre-fix tree (`fix-9/unit/red.out`:
  `expected undefined to be 'button'` after the slot arrives), GREEN on the cure.
- Engine: probe11's `dynslot-*` scene, 8 cells per engine (390 and 1440, light and dark,
  comes and goes). Branch 8/8 in Chromium and in WebKit; pre-fix 0/8 in Chromium
  (`comes` reads role/tabindex/label `null` with the glyph and "Now" at 61.1 px; `goes`
  keeps an "Expand dock" button over 0 px), and 0/8 in WebKit, the same readings.

## 3. The three test readers (orchestrator note, test only)

- **`release-11-0-1-critic-2`, the vertical end** (`8bcedf25c`). `ends()` now takes the
  stadium's radius as half the silhouette's shorter side, `min(cross, main) / 2`. On a
  first morph frame the vertical dock is shorter on its main axis than across it (68 by
  60.7 at 390 coarse), and there the corner is half the main extent; on every other frame
  `cross` is the shorter side and the reading is unchanged. The spec reads 9/9 in Chromium and 9/9 in WebKit on the branch (`fix-9/release/c2-{ch,wk}.log`).
- **Lane L7, the "drawn" cells** (`8bcedf25c`, `lane-L7/probe.mjs`, copied to
  `fix-9/rerun/lane-L7`). The page's own record is read first (`drawn` fired once, no
  stroke running, every window home). A wrong record fails whatever the screencast holds.
  With the record right, a screencast that holds no frame after the event makes the cell
  "drawn: unmeasurable in paint … (recorded, not gated)", as the stall cells are;
  otherwise the paint is gated as before. Branch, WebKit: 80/80; the sixteen drawn cells read
  "unmeasurable in paint" with the record right in every one (the screencast again held no
  frame after the event), the stall cells unmeasurable as before, every gated cell green
  (`fix-9/rerun/lane-L7/out/green-webkit.log`). v11.0.0 stays red under the new reader: its
  record has `count: 0` in every drawn cell (critic 8's `rerun/lane-L7/out/red-*.json`), and a
  wrong record fails.
- **Lane L2, the O-171 first strip** (`fix-9/rerun/lane-L2/probe.mjs`: critic 8's copy,
  which carries fix 3's and fix 7's amendments the lane's own file does not, plus this
  change). Every miss in eight rounds has the same shape: WebKit reads the anchor at
  38.4 px (a 40 px trigger caught mid-press) and the plate's top at 123 before the
  screenshot, then re-places the plate at 124; the light theme also counts the plate's
  shadow row above its edge. The reader now re-reads the plate's box and anchor with the
  first screenshot (the animations still paused) and counts only rows inside the plate's
  box. Its earlier failing reading (strip 122 to 163 against a plate at 123) would read
  124 to 163, 40 rows against a 40 px anchor. Branch, WebKit: every gated cell green, O-171
  5/5; at 1440 the painted box is top 124 with a 40 px anchor and the strip 124 to 163, 40
  rows, in light and dark (`fix-9/rerun/lane-L2/out/green-webkit.{log,json}`); the O-173
  paint cells stay unmeasurable in WebKit, as recorded since lane L2.

## 4. orchestrator-note-dock-search-throw.md (landed during this round)

`/dock/dock-search` throws `TypeError: root.addEventListener is not a function` at mount:
the page passes `useTemplateRef` on its `<GlassDock>` (a component instance) as
`useDockState`'s `rootEl`, typed `Ref<HTMLElement | null>`, and the `rootEl` watcher
listens on it. Reproduced as the note asks, with `fix-9/searchthrow` (the route at 390 with
touch and 1440 fine, light and dark; gate: no page or console error through mount and a
press on the dock):

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| pre-fix `.cache/f9-pre` (= this branch's source) | 0/4, the TypeError (`useDockState.ts:271`) | 0/4, the same TypeError |
| the tip after the revert (`searchthrow/out-green-webkit.log`, label `green`) | (as the pre-fix row) | 0/4, the same TypeError |
| **v11.0.1** `.cache/f7-v1101` | **0/4, the same TypeError** (`useDockState.ts:170`) | not run |
| the cure below (`665c5ca1f`; `searchthrow/out-green-chromium.log`) | 4/4 | not run (reverted before WebKit's turn) |

**v11.0.1 throws the same**, so it is no regression of this branch, and by the note it is
recorded here and left for 11.1.1. A cure was built and witnessed before the v11.0.1 reading
came in: `useDockState` resolves its root once through the library's `asElement` (the one
resolver `useScrollChrome` already uses for a ref on a `<GlassDock>`) and widens `rootEl` to
`Ref<HTMLElement | ComponentPublicInstance | null>`, with a unit cell (a component ref
mounts with no error, and a touch press held on a persistent seat inside it expands the
dock: RED on the pre-fix tree with the TypeError, `fix-9/unit/red-root.out`; GREEN,
`fix-9/unit/green-root.out`) and the browser cell above. It is reverted whole
(`4adbb0225`); source and tests on the tip equal `06da3bb9c`, and the gates below ran on the
tip. 11.1.1 can take `665c5ca1f` as it stands.

## Gates, committed tree (`fix-9/gates-first/` then `fix-9/gates/`)

At `8bcedf25c`: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2582 passed,
10 expected fail, 1 skipped: fix 8's 2580 plus the two new cells). verify:package exited 1
on `G-BUNDLE-RATCHET … 3030963 > 3030858`, +105 B: the layout-box walk and its comment, the
persistent face read at render, and the two CHANGELOG sentences. The deliberate rebind is
`06da3bb9c`; verify:package on that tree exits 0, CLEAN
(`gates-first/verify-package-rebound.log`). At the tip `4adbb0225` (source and tests equal
to `06da3bb9c`), one guarded run: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279
files; 2582 passed, 10 expected fail, 1 skipped), verify:package 0, CLEAN, the ratchet equal
at 3030963 as committed (`gates/chain.log`).

## The 11.0.1 release specs on the branch

`fix-9/release/runs.txt`, the specs critic 9's gate item 2 names, one worker:

| spec | Chromium | WebKit 2287 |
| --- | --- | --- |
| `release-10-1-3` | 60/60 | 58 passed, 2 skipped (the spec's own engine skips) |
| `release-10-1-5` part A | 84/84 | 84/84 |
| `release-10-1-5` part B | 22 passed, 1 failed; **23/23 on the rerun** | 23/23 |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` | 9/9 | 9/9 |

The part B miss, kept in `release/partB-ch-first.log`: "s2 O-201 at 1440", at one cap of the
41-step sweep (275 px), the home seat read `focusVisible: false` after its keyboard focus,
with no cut and the ring's ink present, at a one-minute load of 27; every other cap and seat
held. The rerun at the tip passes 23/23, critic 8 read 23/23 in both engines, and WebKit
passes 23/23 this round. The cures touch the run's mark and the summary's attributes, not
focus or the cap sweep. Cleared on the rerun, as a load reading.

Of these, `release-10-1-3`, part A and the first part B began before `665c5ca1f`/`4adbb0225`
(their source is the tip's); the rest ran with the cure in the tree, which changes nothing
for a `GlassDock`, whose `dockEl` is already an element.

## CHANGELOG

`cbf0bcde5` adds two sentences in consumer words: the gliding plate "stays on its tab when
the dock sits inside something zoomed or scaled (a preview pane, a slide scaled to fit, a
dialog that grows in as it opens)", and "If your `#collapsed` content only shows some of
the time … while the content is there it is the "Expand dock" button, and while it is not
the always-visible controls stand alone." No ids, no internal vocabulary.

## Open gaps

- **The dock search page's throw, for 11.1.1** (section 4): v11.0.1 throws the same; the
  built cure is `665c5ca1f`, reverted here.
- **Lane L7's drawn cells in WebKit read unmeasurable in paint again** this round (16/16,
  record right). The reader now says so instead of failing; whether a quiet lock gives the
  screencast a frame after the event is not this seat's to wait for.
- **The plate under a non-uniform or rotating ancestor transform** was not read; layout
  boxes hold under any transform, and the probe reads uniform zoom and scale only.
- Real Safari and real iOS and Android touch are not measured; WebKit is Playwright's 2287.
- The version, the CHANGELOG date and the master merge are the close's.
