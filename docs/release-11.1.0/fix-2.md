# glass-ui 11.1.0 · fix 2

The fix seat before critic 2, run by claude-opus-5-5 on `release/11.1.0`, under the
orchestrator ruling of 2026-11-10 night and `orchestrator-note-fable-review.md` (binding).
Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one at a time. Records are under `fix-2/`; `fix-2/chain.log` lists
every run and its exit code in order.

## What the two stopped attempts left, and what became of it

The second stopped attempt had committed its whole working tree as one commit
(`bccb55a8b`, kept on the local branch `backup/release-11.1.0-fix2-attempt`). That commit
carried the three things the ruling removes (the Collapsible's phase engine, the
asynchronous `DockLayerSwitcher`, the Slider's own thumb) and bundled O-212 and O-214 with
everything else, so 11.0.1 could not cherry-pick them. The branch was reset to `a34222b49`
(not pushed; no other worktree touched) and rebuilt as one commit per row:

- kept as built: O-212 with O-213's overlay cap, O-214, G13, G14, the sheet shear clamp,
  the two flake cures, most of the CHANGELOG rewrite;
- reverted whole and moved to 11.2.0: K12 (the Slider's transform geometry with a
  glass-owned thumb) and O-211 (the switcher as a lazily loaded component); see
  "Moved to 11.2.0";
- discarded: the Collapsible's phase engine, replaced by the ruling's item 1.

No process from either attempt was still running.

## 11.0.1 cherry-picks

Source and tests only, one commit per row, read from `git log`:

- `617d62f73` fix(select): one inline bound for the plate and its rows (O-212, with O-213's overlay cap)
- `b6393d385` fix(select): a pointer open shows the highlight alone (O-214)

O-219 is not among them: with K12 reverted, this release does not touch the Slider's
fill, so O-219 stays 11.0.1's own row. The line naming these two commits belongs in
master's `docs/tranches/BL/driver/glass-11.0.1-scope.md`; this seat may not write in the
main checkout, so the orchestrator adds it.

## The cures

| row | commit | what changed |
| --- | --- | --- |
| O-212 + O-213 cap | `617d62f73` | `--overlay-inline-cap: min(max(22rem, anchor), --reka-popper-available-width)` on every anchored plate; the Select plate's floor is its anchor under that cap; the viewport loses its forced trigger width. |
| O-214 | `b6393d385` | the trigger records the opening input; `data-open-input="pointer"` drops the menu row's ring until a key is pressed in the list. |
| G13 | `dd734080e` | the aside track is one property; `[data-aside-side="left"]` reads it first. |
| G14 | `95c3c22f2` | `.segmented-tab { min-block-size: var(--control-floor) }` (44 px under a coarse pointer, 0 otherwise). |
| item 1, Collapsible | `78db57edf` | `CollapsibleContent.vue` and its contract test are byte-identical to v11.0.0; the shared `disclosure-open`/`-close` keyframes lose their opacity lines (Collapsible and Accordion); `--collapsible-gap` is a `::before` block inside the region. |
| item 2, lateral swap | `2f967e72b` | `lateral` sets `overflow: visible` on the window group; the recede is scale alone (`--route-card-sink`, `--route-card-dim`, new in this release, deleted). |
| item 6, viz | `84765b8f0` | `.viz-bar` and `.viz-ripple` fill `backwards`. |
| item 5, glide | `33a826d11`, then `5b63db193` | the observer acts only on `aria-current` or a seat added or removed. The `@property … inherits: false` registration was built, then reverted: see "Item 5". |
| item 4, nested table | `92f64b531` | inside `.glass-{wash,quiet,resting,floating,overlay}` the container keeps radius and clip and paints `background: transparent; box-shadow: none`. |
| O-179 restraint | `46234f513` | the entry shear clamps at zero. |
| flakes | `7829049d0` | press waits past the mount's millisecond; the tempo staleness case reads through a platform-contract observer. |
| CHANGELOG | `2bf4ab813` | see "CHANGELOG". |
| item 7 | none | nothing added to the long press. |
| item 8 | `2bf4ab813` | the grain bullet gains the clause about dots where there was noise. |

## CHANGELOG

The 11.1.0 entry (`2bf4ab813`), read for internal terms (none: no row or wave ids, no
record paths, no lane, seat, critic or build vocabulary):

- the headline names every default that changes, and now says `Collapsible` and
  `Accordion` both stop fading (the shared keyframes);
- the Collapsible bullet keeps "opens without fading" and the gap sentence, drops the
  mid-flight claim and the old advice to drop `>` selectors, and says the gap adds no
  element and the content's own padding still applies;
- the HandMark spring line no longer says menus ride `--spring-present` (they ride
  `--spring-bloom`);
- removed: the switcherless `DockLayerGroup` and the playing `Slider` (moved to 11.2.0);
- added: the table inside a glass surface draws no plate of its own; a landed bar or
  ripple keeps no clip; the grain clause (a raised `--glass-grain-opacity` on a dock now
  shows fine dots where there was noise).

## Witnesses

Two trees: the branch, and `git archive v11.0.0` at `.cache/c1-v1100` (critic 1's tree,
with this seat's harness copied in). For the two cures that change this release's own
earlier work (the card swap and the viz clip) a third tree, `git archive a34222b49` at
`.cache/f2-pre`, is the before-cure control. WebKit is Playwright's build 2287 throughout.

### fix-2 witness (`fix-2/witness/`, readings in `out/{green,red}-{chromium,webkit}.json`, crops in `out/png/`)

| item | cells | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- | --- |
| O-212 rows inside the plate, pill inset, hit at right edge − 12, plate 1rem inside | 360/390/1440 × light/dark × 200/352/386/600 px | 20/20 | 20/20 | 14/20 | 14/20 |
| O-213 anchored 358 px panel | 360, 390 × light/dark | 4/4 | 4/4 | 2/4 | 2/4 |
| O-214 pointer open: no ring on any row, a key brings it back | 390, 1440 × light/dark | 4/4 | 4/4 | 0/4 | 0/4 |
| O-214 keyboard open (Enter, Space, ArrowDown): ring on the focused row (hold) | 12 | 12/12 | 12/12 | 12/12 | 12/12 |
| G13 left and right: stage the larger column, aside in 300..400 | 1440 × light/dark × side | 4/4 | 4/4 | 2/4 (left RED) | 2/4 (left RED) |
| G14 coarse ≥ 44 px, no overlap; fine unchanged | 390 × light/dark × coarse/fine | 4/4 | 4/4 | 2/4 (coarse RED) | 2/4 (coarse RED) |
| Collapsible 11.0.0 contract: reka variable = height, a `>` rule reaches the children (hold) | 390, 1440 × light/dark | 4/4 | 4/4 | 4/4 | 4/4 |
| Collapsible gap inside the region (12 px above the first child) | same | 4/4 | 4/4 | 0/4 | 0/4 |
| item 4: the Table on the page is a plate, inside a Card it paints none | same | 4/4 | 4/4 | 0/4 | 0/4 |

The O-212 cells that pass on v11.0.0 are the sheet form (360 and 390) and the 200 px
trigger at 1440, which never overflowed; every trigger of 352 px and wider at 1440 is RED
there (386 px: 6/6 rows overflow by 31 px; 600 px: by 245 px; the pill's right inset 3 px
against 5 px at 352). Paint: `out/png/green-*-o212-1440-*-tw386.png`, `-tw600.png`.
At 360 the 358 px anchor runs past the room (16 + 358 > 360 − 16), so the viewport
bound decides that cell; at 390 the panel is never clamped below its anchor.

The keyboard cells first ran with `Tab` to reach the trigger; WebKit, like Safari, does not
move Tab onto a button, so those 16 cells read nothing (`green-webkit` 23:44). The cell now
focuses the trigger directly; all four runs above are of that probe.

### Lane witnesses, rerun (`fix-2/rerun/lane-L*/out/`)

Each lane's own probe, run unchanged except lane L2 and lane L5 (amended, below).

| lane | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| L1 (O-164, O-188, O-169) | 27/27 (after `5b63db193`) | 27/27 (after `5b63db193`; 21/27 before it, the six O-188 cells) | RED (exit 1) | RED (exit 1) |
| L2 (O-181 … O-180, amended) | 33/33 | 29/29 + 4 unmeasurable | RED (exit 1) | RED (exit 1) |
| L3 (O-158, O-184, O-178, O-179) | 18/18 | 18/18 | 6/18 | 6/18 |
| L4 (O-175, O-185, O-173 G2, O-163) | lane record, untouched | probe and fontprobe exit 0 | | probe and fontprobe exit 1 |
| L5 (O-183, O-190, ported) | 60/60 | 60/60 | 26/60 | 26/60 |
| L6 (O-194, O-197, O-198, O-199) | lane record, untouched | 155/155 | | RED (exit 1) |
| L7 (O-206) | lane record, untouched | 63/80, twice (see below) | | 15/64 |

Lane L2 on the pre-cure tree (`a34222b49`): the swap's paint cell 0/4 in Chromium (the
arriving card cut flat at x ≈ 363, `rerun/lane-L2/out/png/pre-chromium-o173-mid-1440-light.png`
against `green-chromium-o173-mid-1440-light.png`) and the viz entrance 1/5 in both engines
(the clip kept after landing).

**Lane L2 amendments (item 1 and item 2).** O-189's `extra` reading is replaced as the
note asks, with one honest change of method: a per-frame sample after the press is already
one frame into the height animation (about 10 px), so the probe holds the region's own
animation at its first instant (open) and its last (close) and reads the root there.
Branch: 0 px and 0.78 px from the closed height; v11.0.0 with a root `gap`: 12 px and
12.7 px. The reversal cell is struck for 11.1.0: a reversal restarts, as on 11.0.0. The
swap gains its paint cell: at 90 ms the arriving card is present and its on-screen corner
squares are clear of its colour and match the ground (at 390 the card's trailing corners
run past the screen's edge and are excluded). The viz cell gains the after-landing read:
no bar or ripple keeps a `clip-path`.

**The swap's paint in WebKit is unmeasurable.** In every tree, Playwright WebKit's capture of
the paused transition at 90 ms holds no arriving-card pixel, while the control, the same
strip after the transition finishes, shows the card whole (`rerun/lane-L2/out/green-webkit.json`,
`O-173 paint`, `rest`). So the WebKit half of "the new card arrives whole" is not witnessed
in paint; the source rule is engine-neutral (`overflow: visible` on the group under
`lateral`). The CHANGELOG makes no claim beyond what Chromium shows.

**Lane L7 in WebKit.** Twice on the branch, 63/80: the 16 `drawn` cells read
`firstFrameAfterDrawn: -1` (the screencast caught no frame after the event; `count` 1,
`finalAtDrawn` true), and the stall cell is unmeasurable as the lane recorded. The same
probe on the pre-fix tree `a34222b49`, whose HandMark is byte-identical, reads the same
16 cells the same way (64/80). So the lane's 80/80 WebKit reading no longer reproduces on
this machine on either tree, and nothing in this seat's change set reaches HandMark. It is
a capture condition tonight, recorded for critic 2, not a defect this seat can cure.

**Lane L5 port.** The reader takes each line's clip window (`.hm-reveal`, translateX
from −100 % to 0) as its draw unit, the ring's guide where there is one, and the guide on
v11.0.0, which has no window. The nib hold reads the ink's thickness where there is no
guide.

### Item 5, the gliding mark

Chromium trace at 4x CPU, 1440 (`fix-2/witness/out/glide-*-chromium.json`), one glide
over 65 frames:

| tree | Layout events | elements restyled per frame | one text change in a seat |
| --- | --- | --- | --- |
| before the cure (the uncommitted tree, before `33a826d11`) | 1 | 11.6 | 1 Layout, no restyle |
| registration + narrowed observer | 1 | 11.6 | 1 Layout, no restyle |
| narrowed observer only (shipped) | 1 | 11.6 | 1 Layout, no restyle |

The glide lays out once in 65 frames; the restyles are the seats' own width transition,
not the mark (the run holds four seats). The `@property … inherits: false` registration
bought nothing here, and in Playwright WebKit it broke the mark outright: the plate's
`::before` never took the run's new lengths, so it neither glided nor landed (lane L1,
O-188, every WebKit cell). It is reverted (`5b63db193`); the narrowed observer stays. The
numbers are not poor, so nothing is booked beyond the dock morph rewrite already planned.

### Item 4, the nested table

Captures with unpainted cells, `fix-2/witness/out/png/{green,red}-{chromium,webkit}-table-{page,card}-{390,1440}-{light,dark}.png`.
Before the rule (`pre-chromium-table-card-390-light.png`) the table inside a Card read as
a card in a card: a second rounded plate with its rim inside the Card's. The cure is the
one rule the note names, keyed on the five glass tier classes every surface carries. It
matches the later ruling in `orchestrator-note-table-nested.md` (Gregg's figure plates): inside
a glass surface the container keeps radius and clip and paints no plate and no rim; on the
page ground it keeps the quiet plate. The `Table one surface` cells above are that ruling's
witness (both engines, light and dark, 390 and 1440, unpainted cells, corners still
clipped), and the CHANGELOG's rounded-table bullet says it in plain words.

## Gates (committed tree)

`fix-2/gates.sh`, one guarded heavy run each time; logs and exit codes in `fix-2/gates/`.

| run | tree | build | typecheck | demo:dist:build | vitest | verify:package |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `2bf4ab813` | 0 | 0 | 0 | 0 (279 files, 2573 passed, 10 expected fail, 1 skipped) | 1: ratchet 3015386 > 3014587 |
| 1b | `dd6c734b1` (ratchet rebound up) | | | | | 0, CLEAN |
| 2 | `5b63db193` | 0 | 0 | 0 | 0 (279 files, 2572 passed, 10 expected fail, 1 skipped) | 1: ratchet shrink 3014836 < 3015386 |
| 2b | `4e1f015b9` (ratchet rebound down) | | | | | 0, CLEAN |

**The bundle ratchet.** 3014587 → 3015386 (+799 B, `dd6c734b1`: the Select open input,
the one inline bound, the run mark's registrations, the nested table rule), then →
3014836 (−550 B, `4e1f015b9`: the registrations reverted). Net +249 B over critique 1's
tree, both rebinds deliberate and recorded in their commits.

The two flaky cases (`GlassDock.persistent-face.test.ts`, `press.test.ts`) passed in both
full suite runs above.

**e2e**, the specs these cures touch (`Select.bound`, `overlay-sizing`, `menu-glass`,
`config-chassis`, `config-right`, `SegmentedTabs.glide`, `disclosure-rotate`,
`nav-dock-fix`, `Sheet.position`, `aria-orientation`), one worker, reports in
`fix-2/e2e/`: 40 passed, 21 failed, 2 skipped in each engine on each tree, and the failed
title sets are identical between the branch and v11.0.0 in both engines. Chromium ran at
`dd6c734b1` (before the run-mark revert), WebKit at `5b63db193`. The 21 are specs
older than 11.0.0's values (`config-right` bands the aside at 270–380 px against the
300–400 px tokens, `menu-glass` asks the section caption for a mono face the register no
longer uses, `config-chassis` and `nav-dock-fix` as the lanes recorded). The chain's line
"e2e chromium branch exit 1" at 02:35:07 is a skipped stage logged by its guard, not a run.

## Moved to 11.2.0

- **K12**, a playing Slider without layout. The build replaced reka's thumb with a glass
  thumb to move it by transform; that drops reka's hidden form input, so a `Slider` with a
  `name` inside a form would stop submitting its value, which a minor may not do. Reverted
  whole.
- **O-211**, a switcherless `DockLayerGroup`. The build loaded the switcher asynchronously,
  so a consumer who shows one sees the tabs arrive after the faces, and its measure was
  taken against a stale pack (`pass: false` even so). A static split cannot help while the
  group itself imports the switcher; the cure that does is a public shape change. Reverted
  whole.
- **O-213's shell floor** (the Configurator shell's `min-inline-size: min(20rem, 100%)`
  ignores its own margins). Not built in this seat.

## Not done here

- The 11.0.1 scope file line naming `617d62f73` and `b6393d385` is the orchestrator's to
  add on master.
- The long press (item 7): nothing added, as ruled.

## Process notes

- The first WebKit attempt of this seat waited over 50 minutes for the machine-wide lock
  behind other repositories' WebKit runs (no refusal); the chain was stopped by its process
  group and reordered so the gates and Chromium ran first.
- `verify:package` after the ratchet rebind (00:54) overlapped the chain's lane L2
  Chromium run by about a minute.
- guarded refused nothing.
- The `disclosure-rotate` e2e spec writes two captures into `docs/tranches/BG/audit/visual/`;
  this seat's run left two untracked PNGs there, which were deleted.
