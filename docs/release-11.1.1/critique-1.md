# 11.1.1 critique 1

Critic: claude-fable-5-2, fresh; built nothing on the branch. Tip read: `64be9e776` on
`release/11.1.1`. Verdict: **not ready to tag.** Four scope rows are unbuilt, one gate
command exits 1 on the committed tree, the leave-finished event is silent inside a shadow
root, and several witnesses do not bite where their row says they must.

Everything here was run by this seat. Tools, logs and captures are under `critic-1/`.

## How it was read

- **Trees.** The tip is the worktree at `64be9e776`. The v11.1.0 tree is seat A's
  `git archive v11.1.0` at `.cache/red-v11.1.0/tree`; its `src/`, `demo/`, `package.json` and
  visual configs (868 files) were compared with the tag by content before use: no difference.
- **Witness.** The whole `release-11-1-1.spec.ts` in its four projects on both trees
  (`logs/wit-{branch,red}-*.{log,json}`), each cell's verdict in `matrix.txt`
  (`matrix.py`), the reason for every v11.1.0 failure by `why.py`, and the frame tables by
  `frames.py` and `steps.py` (the raw per-sample steps, not the spec's own share).
- **Probes** (`probe/`): `shadow.{html,ts,mjs}` for the leave-finished event (a surface
  inside an open shadow root, an unmount mid-exit, a ContextMenu, a hover card);
  `paint.mjs` and `clipcheck.mjs` for whether a plate's backdrop is painted blurred.
- **Earlier release specs.** `reg-inner.sh`, the 11.1.0 close's list: release-10-1-5 (two
  halves), release-11-0-1 (owner, fix 2, critic 2), release-11-0-2 with
  slider-forced-colors, release-11-0-2 on coarse touch and on WebKit 2311, and ro-loop,
  which is 11.1.0's resize witness (there is no file named release-11-1-0).
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing. No WebKit lock wait passed ten minutes. Heavy-slot waits were long (a
  dev server waited over ten minutes twice), so some runs used the server Playwright starts
  for itself.
- **Two failures in my own runs are mine, not the branch's**, and were re-read:
  - `exit · Sheet right` in WebKit at 390 on the tip lost its film to a page reload: I
    saved a probe file the tip's dev server had served, and Vite reloaded every page
    (`serve-5351.log`, 00:25:39). Re-read alone three times: 3 of 3 green
    (`logs/resheet-webkit-phone-*`).
  - See defect 9 for the other (a `page.goto` hang at the 90th cell).

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.
Whole-spec totals on the tip: 89 passed and 11 skipped; 93 and 7; 68 passed, 31 skipped,
1 failed (mine, above); 92 passed, 7 skipped, 1 failed (defect 9). On v11.1.0: 68, 69, 50
and 63 failed. Every v11.1.0 failure fails on the assertion its row claims (`why.py`); none
is a harness error except the one timeout in defect 9.

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form`, 390: R/G in both engines on every route driven (WebKit outside skipped) | holds |
| 2 phone popup is glass | `glass`, 390: R/G ×4 in both engines; solid under reduced transparency G/G (Chromium only) | holds in Chromium by paint; WebKit by computed style only (below) |
| 3 one exit curve | `exit`: Select, DropdownMenu, Popover, Dialog R/G ×4, Tooltip R/G ×2 | holds; **the Sheet clause has no RED** (defect 5) |
| 4 every route | `routes`: 27 R/G, 0 G/G | holds for the routes driven; **two named routes are not driven** (defect 6) |
| 5 reversal | `reverse`: 55 R/G, 9 G/G | **the disclosure cells do not bite in WebKit** (defect 4) |
| 6 tooltips | `tooltip`: 6 R/G at 1440 in both engines | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 9 ExpandableContainer | `expand`: the three exits and the reopen R/G ×4; the entrance and first-frame Escape G/G ×4 | exit and reversal hold; two claims have no RED (defect 7) |
| 11 leave-finished | `leave`: "says once" R/G in every cell driven | holds in the page; **silent in a shadow root** (defect 3) |
| Dialog exit clock | `exit · Dialog` and `standing · Dialog`: per-sample steps 0.05 to 0.11 at 60 Hz in WebKit, exit 183 to 201 ms against an entrance of about 250 ms or more | holds |
| 8, 10, 12, 13 | none | **unbuilt** (defect 1) |

Paint or frames where that is the claim: the motion rows read a per-frame film (box,
effective opacity, clip), which is frames, not paint; row 2 reads screenshots in Chromium.
Two limits, both recorded rather than cured:

- **WebKit cannot witness row 2 by paint.** Playwright WebKit 2287 paints no backdrop blur
  on any plate on either tree: a desktop Popover with no clip-path reads a largest
  adjacent-pixel luminance step of 0.59 to 0.69 through the plate against a ground of 1.0,
  on v11.1.0 and on the tip alike (`logs/paint-*-webkit.json`); Chromium reads 0.003 to
  0.05. So the WebKit glass cells assert computed style only, and the spec records the
  WebKit contrast without judging it: the dark dock menu's plain row reads **3.91:1** there
  (`wit-branch-webkit-phone.json`, `glass`). Real Safari is unmeasured.
- See open gap A for what Chromium paints at a device pixel ratio of 3.

### 2. The motion rows' frame tables

Read from the raw samples (`steps.py`; Chromium samples at about 120 Hz, WebKit at 60 Hz).

- **No cut at either end, no last-frame step.** Across every exit on the tip, the first
  moving sample carries 0.02 to 0.07 of the travel in Chromium and 0.04 to 0.16 in WebKit;
  the last sample before gone carries 0.003 to 0.07. No exit moves against its direction.
  The owner's case, a dock Select at 390 by pick: the sheet holds y 615 for 40 ms, then
  slides to 840 as it fades 1.00 to 0.02 over 208 ms, 390 px wide and in sheet form on
  every frame (v11.1.0: form and material lost in the first frame, then a 530 px jump).
- **No overshoot** on any exit (the exits are one bezier and one script tween).
- **At the bound in WebKit.** Several cells pass with little room under the 0.2 limit:
  ExpandableContainer's exit 0.17 to 0.18 a frame (a 134 ms exit, eight frames), its
  reopen 0.174 to 0.200, a detented Sheet 0.16 to 0.18, a Tooltip's exit and hand-off 0.16
  to 0.18, and the Collapsible and Accordion close 0.17 to 0.18. They are green in every
  reading here; they are also where the standing gate will flake first under load.
- **Gestalt.** The strips read calm: the phone sheet slides and fades, the menu's clip
  recedes as it fades, the Dialog and Sheet leave on one curve, a tooltip is all fade, and
  a hand-off cross-fades. Nothing was added for ornament. One thing was **kept** that the
  release's own law forbids: see defect 8.

### 3. Earlier release specs, tip against v11.1.0

On the tip, one guarded call per engine, each on a fresh server (`logs/reg-branch-*`,
`logs/chain.txt`):

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-5, part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / fix 2 / critic 2 | 9, 14, 9 | 9, 14, 9 |
| release-11-0-2 with slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0's resize-mid-morph witness) | 4/4 | 4/4 |

**No title fails on the tip**, so there is nothing to compare against v11.1.0, and no
v11.1.0 pass was needed. The counts and skips equal the 11.1.0 close's own table.

### 4. Nothing removed or renamed

Against the published 11.1.0 (the registry tarball as installed in a sibling consumer,
`resolved` and integrity read from its lockfile) and the tip's fresh `dist`:

- `exports`: 70 keys in both, the maps equal; `files`, `types`, `typesVersions`,
  `sideEffects` and the dependency fields equal.
- File list, content hashes normalised: nothing removed; five added
  (`exit-press`, `leave-finished` and their declarations, `turn.d.ts`).
- Declarations: additions only (the `leaveFinished` emit on seven contents, two internal
  composables on the overlay barrel, Toast's two prop defaults).
- Custom properties declared in `src`: 1,111 on v11.1.0, 1,117 on the tip, none removed;
  six added (`--reveal-fade`, `--menu-clip-open`, `--menu-clip-strip`, `--_sheet-floor`,
  `--_sheet-below-floor`, `--glass-reveal-held`). Keyframes: none removed, one added
  (`glass-reveal-hold`).
- Defaults that moved, each under a scope row: `--exit-curve` (row 3), the menu register's
  exit clock (row 3), the narrow popups' material and the attribute that carries it (row 2,
  the owner's word), the tooltip's entrance fade (row 6), the Dialog's exit clock (the
  ruling). The CHANGELOG says each, with the gaps in item 7.
- One meaning moved without a row naming it: ExpandableContainer's default slot prop
  `fullscreen` and its `data-state="expanded"` now stay true through the exit (they follow
  where the subtree is, not the open state). It follows from row 9's cure and a consumer
  styling on `data-state` gains the exit for free, but the CHANGELOG does not say it.

**Dock entry (the dock-size note).** `dist/dock.js` and its 19 direct imports are byte for
byte the published 11.1.0's; its static closure is 27 files, 113,176 B raw, **40,541 B
gzipped on both** (`closure.mjs`). Rows 5 and 11 did grow the entries a dock seat can open:
`select` 8,453 to 9,426 B gzipped (+973), `menu` 11,865 to 12,462 (+597), `dialog` 12,508 to
14,301 (+1,793), `popover` +629, `tooltip` +619. Each is over the note's 0.5 KB line, so each
owes the CHANGELOG a size line at the close. v11.0.2 was not built here.

### 5. Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | **1** (defect 2) |

No workflow file runs a browser; `.github/` is unchanged from v11.1.0.

### 6. Comments added in `src`

Every added line in `src` was searched for row, round and seat vocabulary, inbound ids, site
names and dates: none. (The `U/B7 D-6` and `BK #66` stamps in the files touched are
unchanged lines from v11.1.0.) One comment is stale rather than stamped: `reveal.css:116`
still says the menu grows on "`glass-menu-grow` below", which the menu no longer runs.

### 7. The CHANGELOG entry

Outward prose, no internal ids, at most one em dash a paragraph (the heading's). Not yet
true or complete: defect 10.

## Defects

1. **Rows 8, 10, 12 and 13 are unbuilt.** The orchestrator's notes make each a defect for
   the critic to file: row 8 (reduced motion is a fade; `orchestrator-note-row-8.md`, four
   commits and a 200 ms cap), row 10 (ToggleGroupItem's weight, `scale-on-hover` under
   `(hover: hover)`), row 12 (the segmented switch's round ends on touch), row 13 (the run
   mark under reduced motion, the plate observer's loop error). Nothing in
   `git log v11.1.0..` touches their files; the CHANGELOG has no "Fixed" clause for any.

2. **`npm run verify:package` exits 1.** `G-BUNDLE-RATCHET: bundle ratchet increase
   forbidden: 3051695 > 3035791` (`logs/verify-package.log`): the package grew 15,904 B
   unpacked and `.bundle-ratchet` still holds 11.1.0's figure. Everything before the ratchet
   in that script passed. `release.yml` runs this command, so a tag cut now would fail to
   publish. The rebind belongs after the last source commit.

3. **Inside a shadow root the leave-finished event never fires.** Row 11's ruled shape is
   that a listener on a shadow host hears it, and the note asks for a witness with the
   surface mounted in an open shadow root. There is none, and the behaviour fails: a
   `PopoverContent` with `portal: false` mounted inside an open shadow root closes and
   unmounts, and nothing is heard on the host, nothing on `window`, and the Vue emit does
   not fire; the same Popover in the page fires once (`probe/shadow.mjs`,
   `logs/probe-shadow.log`, and again in both engines in `logs/probe-leave-*.log`). Cause,
   `_shared/overlay/leave-finished.ts`: the content is looked up with
   `document.querySelector` (:281-283), which does not see into a shadow tree, so the
   close records no element and `finish()` returns; and the listener for reka's
   `after-leave` sits on `document` (:316), which a non-composed event dispatched inside a
   shadow tree never reaches. The README and CHANGELOG both say the event "crosses shadow
   roots".
   Also read, and green in both engines: a ContextMenu (Escape and pick: one `menu` event
   each, 8 to 19 ms after the last seen frame, one emit each), a hover card (one
   `hover-card` event 17 ms after its last seen frame, one emit) and a Dialog unmounted 40 ms into
   its exit (one event at the unmount). The spec holds none of the three; the note asks
   for the first two.

4. **The disclosure reversal witness does not bite in WebKit.** Row 5 names Accordion and
   Collapsible. In WebKit, 5 of their 8 cells pass on v11.1.0 (at 390: Collapsible both
   ways and Accordion closed-while-opening; at 1440: both reopened-while-closing), while
   the v11.1.0 film shows the fault plainly: Collapsible closed while it opens runs
   0.545, 0.691 … 0.892, **1.000**, 0.938, 0.767 (it jumps to the far end and comes back);
   reopened while it closes runs 0.273, 0.227, 0.222, **0**, 0.062, 0.243 (it empties in one
   frame). The tip's film turns where it stands (0.703, 0.721, 0.721, 0.549). Two reasons the
   cell is blind: `worstFrameShare` pairs each sample with the first one at least a frame
   later, so a one-sample excursion to the far end falls between the pair; and with touch
   the second input lands late, when the region is within a fifth of that end. A cell that
   asserts no sample after the turn moves against the new direction would be RED there.
   The same weakness lets `reverse · a DropdownMenu reopened` pass on v11.1.0 in 3 of 4
   cells (0.323 to 0.203 in one sample at 390 in Chromium).

5. **Row 3's Sheet clause has no RED.** `exit · Sheet right` and `Sheet bottom` are green on
   v11.1.0 in all eight cells read here (seat A read four of eight red, on the curve check
   alone). The Sheet's exit did change curve and clock; no cell shows v11.1.0 failing what
   the row claims for it.

6. **Routes the scope and the table name are not driven.** Row 4 lists focus leaving and a
   route change; the standing gate says every surface in the exits table by every route.
   Not in the spec: focus out (Tab) on DropdownMenu and Popover; a route change or an
   unmount with the close; the DropdownMenu submenu; ContextMenu; the hover card; the
   plain (non-dock) Select and the Select in a collapsible dock; a Popover in a dock; the
   top and left Sheets; the detented Sheet's close button and its drag; the Toast's swipe
   and timeout; the Tooltip's trigger press; the dock's own fold. The owner's production
   case is a pick that changes the route.

7. **Two of row 9's claims are green on v11.1.0.** `expand · an ExpandableContainer enters
   on a tween` and `expand · Escape is live from the entrance's first frame` pass on
   v11.1.0 in all four cells: v11.1.0 already registers Escape in the watcher that sees
   `open` turn true. The cells are no-regression reads, not witnesses, and the CHANGELOG
   presents the Escape clause as a change.

8. **The floating exit still carries a squash and a blur.** The release's law is an exit of
   opacity and a few px of travel, never a flourish. The overlay register's closed state
   (`glass/reveal.css`, the rule this release rewrote as transitions) still leaves by four
   channels at once: opacity, an 8 px slide, a 6 px `filter: blur`, and an anisotropic
   scale to 0.996 by 0.888 (`--glass-reveal-enter-scale` 0.94 times `--lq-stretch-x/y`
   1.06 and 0.945). That is every Popover and hover card. It is carried over from
   11.1.0, not added, and the film cannot see it (it records box and opacity), so no cell
   holds it either way.

9. **The exits gate hangs at its 90th cell in WebKit.** `standing · Sheet bottom by
   escape` timed out on `page.goto` in 4 of 6 whole-spec WebKit passes: seat B's two
   (`logs/tip-B-green-webkit-{phone,desktop}.log`), mine on the tip at 1440 and mine on
   v11.1.0 at 1440. It is the 90th cell each time, on both trees, with the server alive (cells
   91 to 100 pass straight after), so it is the engine or the harness, not the Sheet and
   not the server's guard timeout that build B named. Alone, the cell is green 3 of 3 with
   its two neighbours (`logs/recell-webkit-desktop-*`). As written, `gate:exits` runs all
   four projects in one process under `set -e` in `scripts/release.sh`, so the release
   script fails most times it runs; it also starts WebKit outside `guarded --exclusive
   webkit`. Split the WebKit projects so no process opens 90 pages, or restart the browser
   mid-pass.

10. **The CHANGELOG entry is not yet true or complete.**
    - "Menus, selects, popovers and tooltips lost a third of their light in the first frame
      and were gone in about 70 ms" describes 11.0.2. On 11.1.0, which this patches, a menu
      and a select hold full opacity for about 105 ms while their clip recedes and then cut
      in one frame at about 130 ms; a popover fades over about 136 ms; only the tooltip (68
      to 73 ms, 30 to 60 % in its first frame) fits the sentence (`logs/wit-red-*`, `exit`).
    - "Escape works from the entrance's first frame" reads as a change; it held on 11.1.0
      (defect 7).
    - "crosses shadow roots" is not true of a surface inside one (defect 3).
    - `--exit-curve` is named but its values are not: `var(--ease-out)`
      (`cubic-bezier(0, 0, 0.2, 1)`) to `cubic-bezier(0.3, 0.2, 0.7, 0.8)`.
    - Not said: ExpandableContainer's `fullscreen` slot prop and `data-state` holding
      through the exit, and the new `data-leaving`; the menu's entrance no longer running
      the `glass-menu-grow` keyframes (still defined, as `glass-reveal-out` is said to be).
    - Missing until their rows land: the four "Fixed" clauses, the dock entry's size line,
      and a size line for each entry that grew past 0.5 KB gzipped (item 4).

## Open gaps (for INBOUND)

A. **At a device pixel ratio of 3, headless Chromium blurs only part of a phone plate.**
   On the tip at 390, DPR 3, the dock Select's sheet and the dock menu show the page
   unblurred through their right third and bottom third: page button labels are legible
   through the menu (`shots/clip-tip-chromium-dpr3-light-menu-shipped-whole.png`); hard
   stripe edges are 0.5 to 2.2 % of pixel pairs there and 0 elsewhere. At DPR 1 the whole
   plate is blurred (0 everywhere). Removing the plate's resting clip-path changes nothing,
   so the new clip is not the cause. Read in Playwright's default headless shell with no
   GPU lane and the renderer not recorded; it may be the software rasteriser. The row 2
   cell asserts contrast and the computed blur, not that the backdrop is painted blurred
   across the plate. Worth one read on the GPU lane and on a device before the firm plate
   is called done.
B. Real Safari is unmeasured for the firm plate; Playwright WebKit cannot say (item 1).
C. `release-11-1-1.config.ts` runs Chromium with the base project's ANGLE Metal arguments;
   no renderer string is recorded, and no frame-cost claim is made, so none is owed.
D. The tip's dev server watches the whole worktree, the v11.1.0 tree inside it included: a
   red run's copy of the harness reloads every page the tip is serving. Sequential runs
   hide it. A seat that runs both trees at once will lose films to it.
E. Build B's record says every WebKit cell after the 89th was cut by the server's guard
   timeout; the cut was the 90th-cell hang (defect 9).
F. Old keyframes are now unreferenced in `src` (`glass-menu-grow`, `-grow-up`, `-recede`,
   `-recede-up`, `glass-reveal-out`, `glass-reveal-out-reduced`,
   `expandable-container-birth`, `-arrive`): right for a patch, and candidates for the next
   major.
