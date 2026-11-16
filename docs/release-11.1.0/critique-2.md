# glass-ui 11.1.0 · critique 2

A fresh adversarial critic (round 2), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `3b7ca18c1`. It built nothing on the branch. It read every commit in
`master..release/11.1.0` (51), every record in `docs/release-11.1.0/`, and
`orchestrator-note-fable-review.md` and `orchestrator-note-table-nested.md` first, as binding.

Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit is Playwright's
build 2287 throughout. Two trees: the branch, and `git archive v11.0.0` at `.cache/c1-v1100`
(its `src/` checked byte-identical to the tag with `diff -rq` before any run).

Records, all under `critic-2/`:

- `witness/`, `rerun/lane-L{1..7}/`: fix 2's witness and each lane's own probe, copied
  unchanged (only the output paths differ), rerun on both trees in both engines.
- `probe/`: this critic's own probe for what those witnesses do not hold (harness, `probe.mjs`,
  readings in `out/{green,red}-{chromium,webkit}.json`, crops in `out/png/`).
- `api/`: the public surface of the branch's `dist` against the 11.0.0 tarball.
- `gates/`, `vitest/`, `e2e/`: the committed-tree gates, six runs of the two formerly flaky
  files, and the touched e2e specs.
- `sheets/`: contact sheets of the captures this critique cites.
- `chain.log`: every run and its exit code, in order.

## Verdict

Not ready to tag. Three defects of shipped items break or mislead a consumer of 11.0.0, and
each is small to cure:

1. The Collapsible's gap box is a flex and grid item (high).
2. A controlled Slider stops following its model when the consumer declines a key step (high).
3. The shared tempo goes stale for three ordinary ways a page changes it (medium).

Two low findings follow (the coarse tab strip's shape, three CHANGELOG sentences). Everything
else the lanes and fix 2 claim reproduced, in both engines, on both trees.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| fix 2 witness (O-212, O-213 cap, O-214, G13, G14, Collapsible, Table) | 60/60 | 60/60 | 36/60 | 36/60 |
| lane L1 (O-164, O-188, O-169) | 27/27 | 27/27 | RED (exit 1) | RED (exit 1) |
| lane L2 (O-181, O-196, O-189, O-171, O-168, O-173, O-180) | 33/33 | 28/29 + 4 unmeasurable | RED (exit 1) | RED (exit 1) |
| lane L3 (O-158, O-184, O-178, O-179) | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 (O-175, O-185, O-173 G2, O-163) | probe 0, fontprobe 0 | probe 0, fontprobe 0 | both exit 1 | both exit 1 |
| lane L5 (O-183, O-190) | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 (O-194, O-197, O-198, O-199) | 161/161 | 155/155 | RED (exit 1) | RED (exit 1) |
| lane L7 (O-206) | 80/80 | 64/80 | 4/64 | 16/64 |
| critic probe | 23 cells, 0 errors | 23 cells, 0 errors | same | same |

Every cell agrees with fix 2's table except three, none of them a defect:

- **Lane L2, WebKit, O-171 `1440-light`** failed this run by the witness's own tolerance: the
  first painted strip read 42 px against an anchor read at 38.4 px (the pressed trigger), a
  3.6 px gap against a 2 px allowance. The dark cell of the same run read 40 px and passed, and
  fix 2's run read 41 px against 40. The menu grows from its trigger in the capture; the
  reading sits on the threshold.
- **Lane L7, WebKit, `drawn`** read 0/16, as fix 2 found twice (the lane recorded 16/16). In
  each cell the event fired once, with no animation running and the mark in its final state
  (`count: 1, running: 0, finalAtDrawn: true`); the miss is `firstFrameAfterDrawn: -1`, the
  screencast holding no frame after the event. Chromium reads 16/16 on the same tree. So the
  lane's WebKit 80/80 has now failed to reproduce three times; the event's own facts hold.
- **The lateral swap's paint in WebKit** stays unmeasurable (0/4, 4 unmeasurable, with the
  control), as fix 2 recorded.

## Defects (reproduced)

### 1. The Collapsible's gap box is a flex and grid item (high, breaks a consumer of 11.0.0)

`disclosure.css:105-109` gives every `CollapsibleContent` a `::before` with `display: block`,
whether or not `--collapsible-gap` is set. A pseudo-element is no wrapper, but it is a box: when
the consumer lays the content out as a grid or a flex container it becomes the first item.
The library's own story does this (`demo/stories/containers/collapsible.vue:87`,
`class="grid gap-2"`).

Critic probe, 390, no `--collapsible-gap` set, the content given the consumer's own layout.
Chromium and WebKit read the same to the pixel
(`critic-2/probe/out/{green,red}-{chromium,webkit}.json`, `Collapsible layout`):

| the content's layout | v11.0.0 | branch |
| --- | --- | --- |
| block | first child at 0 px, content 78.4 px | same |
| `display: grid; gap: 8px` | first child at 0 px, content 102.4 px | first child at **8 px**, content **110.4 px** |
| `display: flex; flex-direction: column; gap: 8px` | 0 px, 102.4 px | **8 px**, **110.4 px** |
| `display: flex; gap: 8px` (a row) | first child at x 0 | first child at x **8** |
| `grid-template-columns: 1fr 1fr; gap: 8px` | First, Second / Third, Fourth; 47.2 px | **(empty), First / Second, Third / Fourth**; 74.8 px |

Paint: `critic-2/sheets/collapsible-layout-chromium.png` (the two-column grid shows an empty
first cell and every child moved one place on). With the story's `--collapsible-gap` of 12 px
and `gap-2`, the content starts 20 px under the trigger, not 12.

The CHANGELOG says the opposite: "The markup and the variables are the same as before, so
styles and animations you wrote against the content keep working … It adds no element".

This is the construction the review note's item 1 prescribed, so the fix seat built what it was
told; the note's reasoning ("a pseudo-element is inside the clipped content box … it adds no
wrapper") did not consider a content box that is itself a flex or grid container. The cure has
to keep the three things the note wanted (the gap travels with the height, no wrapper, no
padding snap) without adding an item. Candidates, for the fix seat to choose and witness:
a margin on the content's first element child (`> :first-child { margin-block-start:
var(--collapsible-gap, 0px) }`: it sits inside the clipped box, travels with the height, and is
no item; a text-only content gets no gap); or generate the box only where the gap is set
(a style container query, if both target engines hold it). Whichever is chosen, the witness
gains the five cells above, GREEN meaning equal to v11.0.0 with the gap unset.

### 2. A controlled Slider stops following its model when the consumer declines a key step (high, breaks a consumer of 11.0.0)

O-196 put reka's root on the Slider's own value (`own`, `Slider.vue`, "THE HAND AND THE
MODEL") so that a clock cannot move the thumb during a grab. Outside a grab `own` is meant to
follow `modelValue`, but it follows it only when the prop changes. A key step writes `own`
first and then emits; if the consumer leaves the model as it was, nothing brings `own` back.

Critic probe, 390: a `Slider` (0 to 100, step 10) at 50 whose handler accepts values up to 60
and ignores the rest, as a scrubber that cannot seek past what is buffered would. Focus the
thumb, press ArrowRight three times, then End. Both engines read the same
(`Slider controlled`, `390-reject`):

| after | v11.0.0: model / `aria-valuenow` / thumb | branch: model / `aria-valuenow` / thumb |
| --- | --- | --- |
| ArrowRight | 60 / 60 / 0.6 | 60 / 60 / 0.6 |
| ArrowRight | 60 / 60 / 0.6 | 60 / **70** / **0.7** |
| ArrowRight | 60 / 60 / 0.6 | 60 / **80** / **0.8** |
| End | 60 / 60 / 0.6 | 60 / **100** / **1.0** |

On the branch the thumb paints, and announces to a screen reader, a value the consumer's model
does not hold, and it stays there until the model next changes. On 11.0.0 the Slider was
controlled: the thumb is the model. Paint: `critic-2/probe/out/png/green-*-slider-reject.png`
against `red-*-slider-reject.png`. The `clamp` form of the same cell (the handler writes
`min(v, 60)` as a new array) holds on both trees, because a new array re-fires the watch; the
break is the consumer who declines the update, or whose setter lands on an equal value.

Cure, at the root and small: outside a grab, after the emit, `own` returns to the model on the
next tick when `modelValue` is given, which is what `onLetGo` already does for the release.
The witness gains this cell in both engines.

Not measured here, and so not counted: the same consumer dragging past 60 with a pointer. By
this release's design the thumb follows the hand to 100 and returns to 60 on release, where
11.0.0 stopped it at 60. That is the documented new behaviour; the CHANGELOG's headline list of
changed defaults does not name it.

### 3. The shared tempo goes stale for three ordinary ways a page changes it (medium, O-180)

`motionTempo()` now reads the root's `--motion-tempo` once and keeps it until an attribute on
`<html>` changes, a node is added to or removed from `<head>`, or one of two media queries
flips (`src/composables/motion/core/motionTempo.ts`, `watchSource`). Every JS spring takes its
clock from that value; the CSS clocks take theirs from the cascade. On 11.0.0 each spring read
the cascade at construction, so the two halves could not disagree.

Critic probe, 1440 (`Root tempo`): `window.__tempo()` is `motionTempo()`; `css` is the root's
computed `--motion-tempo` at the same instant.

| the page changes the tempo by | v11.0.0 js / css | branch js / css | engines |
| --- | --- | --- | --- |
| an inline style on `<html>` | 0.5 / 0.5 | 0.5 / 0.5 | both |
| `insertRule` on a sheet already in the page | 0.6 / 0.6 | **1** / 0.6 | both |
| a width media query (`max-width: 600px`), then the viewport narrows | 0.7 / 0.7 | **1** / 0.7 | both |
| a stylesheet `<link>` whose sheet arrives after a spring was built | 0.8 / 0.8 | **1** / 0.8 | WebKit (Chromium loaded the `data:` sheet inside the append, so the cell did not exercise it there) |

In each stale row the JS springs run at tempo 1 while the CSS transitions beside them run at
the page's tempo, until something the cache watches next changes. The last row is the one most
likely in production: a lazily loaded route's CSS is appended (the cache is marked stale then), a control mounts and reads
before the sheet has loaded, and the load itself changes nothing the cache watches. The
CHANGELOG's sentence ("the value is read once and kept until it can have changed") is not true
of these.

The forced-layout cure itself is real (lane L2's O-180 cells are 2/2 in both engines and 0/2
on v11.0.0). The cure for the staleness should not bring the per-mount read back: the cheapest
honest bound is to hold the value for a frame rather than for the page (one read per frame at
most, taken the first time a spring asks in that frame), which keeps a mounting scene at one
read and cannot outlive a change by more than a frame. The witness gains the four rows.

### 4. Under a coarse pointer the tab strip and its indicator stop being capsules (low, G14)

G14 raises each tab to 44 px with `min-block-size: var(--control-floor)`, and the gate it was
given (44 px, no overlap) passes in both engines. The radii did not follow: the tab and the
indicator keep `--radius-tab` (16 px) and the strip keeps 19 px, so at 44 px and 50 px tall
they are rounded rectangles, where at 26.3 px and 32.3 px they are capsules. The stylesheet's
own comment states the invariant that broke ("a stadium does not change radius across
viewports", `segmented.css:44-49`).

Critic probe, 390, both engines (`Tabs in a dock`): fine, tab 26.3 px at 16 px radius, strip
32.3 px at 19 px; coarse, tab **44 px at 16 px**, strip **50 px at 19 px**. Paint:
`critic-2/probe/out/png/green-webkit-tabs-dock-coarse-light.png` (a rounded-rectangle strip and
indicator inside a dock that this same release makes a capsule in every posture) against
`green-webkit-tabs-page-fine-light.png`. The dock that hosts the strip grows from 60 px to
66 px under a coarse pointer and its plate grows with it; nothing overflows.

Cure: the strip's radius seam reads the release's new `--radius-stadium` (round ends at any
height) in the horizontal arm, so the capsule holds at 26 px and at 44 px alike. The vertical
arm's bounded corner is right as it is.

### 5. Three CHANGELOG sentences are inaccurate (low)

The entry is free of internal terms (read in full, and scanned for row and wave ids, lane,
seat, critic, witness, record paths: none). Three sentences do not match the tree:

- **"Nothing is removed"** (the headline). Two root tokens, `--route-slide` and
  `--route-world-slide`, and four keyframes (`gl-route-slide-in`, `-out`,
  `gl-route-world-push-in`, `-out`) are in the 11.0.0 tarball's CSS and not in the branch's
  (`critic-2/api/compare.json`, `propsGone`). Neither token is in `.published-roster` or the
  README, so this is not an API break; but a consumer who set `--route-slide` to tune the
  lateral travel now sets nothing. The `lateral` bullet should name `--route-card-travel` as
  what sets the travel now.
- **The Collapsible bullet** ("styles and animations you wrote against the content keep
  working … It adds no element") is untrue until finding 1 is cured.
- **"Mounting a page full of controls is lighter"** ("read once and kept until it can have
  changed") is untrue until finding 3 is cured.

## What the ruling asked this critic to check

- **Item 1, the Collapsible.** `CollapsibleContent.vue` and
  `tests/components/collapsible.contract.test.ts` have no diff against `v11.0.0`. No phase
  engine, no observer, no glass-written `--reka-*` name. The only change is in
  `disclosure.css`: the opacity lines gone from the shared keyframes, and the `::before`. The
  11.0.0 contract cells hold 4/4 in both engines on both trees; the gap cells are 4/4 on the
  branch and 0/4 on v11.0.0. Built as instructed; finding 1 is a hole in the instruction.
- **Item 2, the lateral swap.** `overflow: visible` on the window group under `lateral`;
  `--route-card-sink` and `--route-card-dim` are gone and the recede keyframe is `scale` alone.
  In Chromium the arriving card is whole with four round corners at 390 and 1440, light and
  dark (`critic-2/rerun/lane-L2/out/png/green-chromium-o173-mid-*.png`), 4/4; the pre-cure tree
  is 0/4. WebKit: unmeasurable with its control, as recorded.
- **Item 3, one commit per row.** `617d62f73` (O-212 with O-213's cap) and `b6393d385`
  (O-214) each hold source and tests only. Both apply to a `git archive v11.0.0` tree with
  `patch -p1` in that order with no reject, so 11.0.1 can pick them.
- **K12 and O-211, reverted whole.** `git diff v11.0.0 HEAD -- src/components/slider` holds
  O-181 and O-196 alone (no transform geometry, no glass thumb); `DockLayerGroup.vue` has no
  diff against v11.0.0; no `DockLayerSwitcher.vue`, no `SliderThumb.vue`. The CHANGELOG claims
  neither. O-213's shell floor: `configurator/styles.css` differs from v11.0.0 by G13 alone.
- **G13 and G14, gated in both engines.** G13 4/4 on the branch, left RED on v11.0.0, in both.
  G14 4/4 on the branch, coarse RED on v11.0.0, in both (and finding 4).
- **Item 4 and the nested-table ruling.** On the page the container is the quiet plate with the
  rim; inside a `Card` it paints none and keeps its 16 px corner and clip: 4/4 in both engines,
  0/4 on v11.0.0. The critic added the hosts the CHANGELOG names: inside a `Dialog`, a side
  `SheetContent` and a `PopoverContent` the container is transparent with no shadow and a 16 px
  corner, light and dark, in both engines; each host carries `glass-floating`
  (`critic-2/sheets/table-hosts-chromium.png`). It reads as one surface in each.
- **Item 5, the gliding mark.** The observer acts on `aria-current` and on the run's own child
  list; the `@property` registration is gone. Lane L1's O-188 is 6/6 in both engines.
- **Item 6, the viz clip.** `backwards` on `.viz-bar` and `.viz-ripple`; lane L2's O-168 is
  5/5 in both engines with the after-landing read, 1/5 on the pre-cure tree.
- **Item 7.** Nothing was added to the long press. No finding is raised on it.
- **Item 8.** The grain bullet carries the dots clause.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.

## The Select, beyond fix 2's cells

Critic probe, 390 and 1440, both engines (`Select ring sequence`): a pointer open shows no ring;
ArrowDown brings it back on the next row; Escape, then Enter on the trigger, opens with the
ring; a pointer open after that shows none again; a touch tap at 390 (the sheet form) shows
none. v11.0.0 rings in every one. A submenu's box and rows are identical on both trees at 390
and 1440 (`Submenu bound`), so the one inline bound did not move a submenu.

## The dock, every posture

Lane L6's witness holds every posture at 390 and 1440, fine and coarse, light and dark:
161/161 in Chromium and 155/155 in WebKit on the branch, RED on v11.0.0 in both. Read in paint
(`critic-2/sheets/dock-postures-chromium.png`, `-webkit.png`): open horizontal and vertical,
collapsed to one control, to two, to a glyph with a reading, the persistent face at rest and
opened by hover and by the long press, the trailing gap, and the morph's mid-frame. Capsules
and circles throughout, no flattened or cut corner, in both engines. No regression found. The
one dock change this critic adds is in finding 4: a dock hosting a `SegmentedTabs` strip is
6 px taller under a coarse pointer.

## A consumer of 11.0.0

`critic-2/api/compare.mjs` against the 11.0.0 tarball (`.cache/l4-pack/package`), on the
`dist` the committed-tree build made:

- `package.json` `exports`: none removed, none changed; `./styles/font-files` added.
  `peerDependencies`, `dependencies`, `files` and `sideEffects` unchanged.
- Export names per entry (TypeScript checker, every entry with types): none gone. Added:
  `PopoverVirtualElement`, `ScrollProgressRimEdge`, and seven names on `./motion-core`.
- No `.d.ts` file is missing. Eighteen differ; every difference read is additive (`grab` and
  `release` on Slider, `sheetEntryShear`, the long-press constants, `--radius-stadium` in the
  radius manifest, the HandMark, Popover and rim additions).
- Shipped CSS: no class is gone but Tailwind's `overflow-auto` (the table's old container
  class, a utility, not an API). Custom properties gone: `--hm-h` (still read where a consumer
  sets it), `--route-slide`, `--route-world-slide` (finding 5).
- The breaks are behavioural and are findings 1 and 2.

## Gates (committed tree, `3b7ca18c1`)

`critic-2/gates.sh`, one guarded run: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279
files; 2572 passed, 10 expected fail, 1 skipped), verify:package 0 and CLEAN with the bundle
ratchet at 3014836 as committed. `GlassDock.persistent-face.test.ts` and `press.test.ts`, the
two cases critique 1 found flaky, ran six times alone and passed six times
(`critic-2/vitest/flake-{1..6}.log`).

**e2e**, the specs fix 2's cures touch (`Select.bound`, `overlay-sizing`, `menu-glass`,
`config-chassis`, `config-right`, `SegmentedTabs.glide`, `disclosure-rotate`, `nav-dock-fix`,
`Sheet.position`, `aria-orientation`), one worker, reports in `critic-2/e2e/`: 40 passed, 21
failed, 2 skipped on each tree in each engine, and the failed title sets are identical between
the branch and v11.0.0 in Chromium and in WebKit (compared from the JSON reports, not from the
exit codes: the v11.0.0 Chromium run logged exit 0 with its 21 failures). `handmark.spec.ts`,
the spec lanes L5 and L7 touch: 10/10 on each tree in each engine.

## For INBOUND (not defects of this release's items)

- **`package.json` still reads 11.0.0** and the CHANGELOG heading reads "unreleased". The close
  bumps both.
- **Three e2e specs write into the tranche records.** `disclosure-rotate.spec.ts` drops two
  PNGs into `docs/tranches/BG/audit/visual/` on every run and `handmark.spec.ts` four into
  `docs/tranches/BK/audit/visual/` (this critic deleted its own six), and
  `docs/tranches/BI/audit/visual/W-SHEET-RADIUS-readback.json` sits untracked in this worktree
  from an earlier seat's run. A spec should write under its own output directory.
- **The two orchestrator notes this critic was bound by are untracked** in the worktree
  (`orchestrator-note-fable-review.md`, `orchestrator-note-table-nested.md`). They are the
  orchestrator's to commit; this critic committed neither.
- **The 21 e2e specs that fail on both trees** assert values older than 11.0.0's. They gate
  nothing while they fail everywhere; a spec that cannot go red on a regression is rot.
- **Lane L2's O-171 witness reads the anchor while the trigger is pressed** (38.4 px for a
  40 px trigger), which puts one WebKit cell on its 2 px tolerance. The witness should read the
  anchor at rest or widen to the press scale.
- **Lane L7's `drawn` cell cannot be read in Playwright WebKit on this machine** (three runs,
  two trees). Real Safari is unmeasured for it, as for the stall.
- **A pointer drag past a value the consumer declines** (finding 2's corollary) is a changed
  default the CHANGELOG headline does not list.

## For the fix seat

1. The Collapsible gap without an item: cure, then the five layout cells equal to v11.0.0 with
   the gap unset, and the gap cells still 4/4, in both engines. Correct the bullet.
2. The Slider follows its model after a declined key step: cure, then the `reject` cell equal
   to v11.0.0 in both engines.
3. The tempo cache bounded by a frame (or another bound that cannot outlive a change): cure,
   then the four tempo rows equal to v11.0.0, with lane L2's O-180 cells still 2/2.
4. The coarse strip as a capsule (`--radius-stadium` on the horizontal seam).
5. The headline and the `lateral` bullet name `--route-card-travel` for `--route-slide`.
