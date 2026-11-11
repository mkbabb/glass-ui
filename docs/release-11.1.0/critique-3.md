# glass-ui 11.1.0 · critique 3

A fresh adversarial critic (round 3), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `f45e57f27`. It built nothing on the branch. It read every commit in
`master..release/11.1.0` (61), every record in `docs/release-11.1.0/`, and
`orchestrator-note-fable-review.md` and `orchestrator-note-table-nested.md` first, as binding.

Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit runs waited on
the machine-wide lock behind another release's chain (up to 18 minutes for one run); a wait,
not a refusal. WebKit is Playwright's build 2287 throughout. Two trees: the branch, and
`git archive v11.0.0` at `.cache/c1-v1100` (its `src/` checked byte-identical to the tag with
`diff -rq` before any run); fix 3's witness also ran on its pre-fix tree, `.cache/f3-pre`.

Records, all under `critic-3/`:

- `fix3-witness/`, `fix2-witness/`, `c2-probe/`, `rerun/lane-L{1..7}/`: fix 3's witness, fix
  2's witness, critic 2's probe and each lane's own probe, copied unchanged (only the output
  paths differ; lane L2 is fix 3's amended copy), rerun on both trees in both engines.
- `probe/`: this critic's own probe for what those do not hold (harness, `probe.mjs`,
  readings in `out/{green,red}-{chromium,webkit}.json`, crops in `out/png/`, `show.py` prints
  the two trees side by side), and `cure-check.mjs` with its readings.
- `api/`: the public surface of the branch's `dist` against the 11.0.0 tarball.
- `gates/`, `e2e/`: the committed-tree gates and the touched e2e specs.
- `sheets/`: contact sheets of the captures this critique cites.
- `chain.log`: every run and its exit code, in order; `summary.txt`: the last verdict line of
  every witness log. `run.sh`, `run-b.sh` and `run-c.sh` are the drivers (the first pass was
  `STAGES=gates ./run.sh` then `STAGES="fix3 fix2 c2probe lanes" ENGINES=chromium ./run.sh`).

## Verdict

Not ready to tag, by one small margin. Fix 3 cured all four of critique 2's code findings,
and every lane's claim reproduced again in both engines on both trees. Two low findings remain
on items this release ships:

1. A consumer's top padding on a `Collapsible`'s content is dropped when it is declared in a
   cascade layer earlier than `components` (low, breaks a narrow consumer of 11.0.0). One
   token cures it, and the cure is read in both engines below.
2. The CHANGELOG headline's list of changed defaults leaves out four that change how a page
   looks (low).

Neither needs another full round: this critic's probe holds the cells for the first, and the
second is prose.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| fix 3 witness (Collapsible layout, gap and frames; Slider; tempo; tabs radius) | 26/26 | 26/26 | layout 5/5, gap 0/7, Slider 3/3, tempo 1/1, tabs 4/8 | the same |
| fix 3 witness on the pre-fix tree `2174a3aef` | layout 1/5, gap 1/7, Slider 1/3, tempo 0/1, tabs 4/8 | the same | | |
| fix 2 witness (O-212, O-213 cap, O-214, G13, G14, Collapsible, Table) | 60/60 | 60/60 | 36/60 | 36/60 |
| critic 2's probe | 23 cells, 0 errors | 23 cells, 0 errors | same | same |
| lane L1 (O-164, O-188, O-169) | 27/27 | 27/27 | 0/27 | 0/27 |
| lane L2 (O-181, O-196, O-189, O-171, O-168, O-173, O-180 amended) | 33/33 | 32/33 + 4 unmeasurable | RED (exit 1) | RED (exit 1) |
| lane L3 (O-158, O-184, O-178, O-179) | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L3's type witness for O-178 (`vue-tsc`) | exit 0 | | exit 2 (TS2305, TS2353) | |
| lane L4 (O-175, O-185, O-173 G2, O-163) | probe 0, fontprobe 0 | probe 0, fontprobe 0 | both exit 1 | both exit 1 |
| lane L5 (O-183, O-190) | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 (O-194, O-197, O-198, O-199) | 161/161 | 155/155 | 31/161 | 37/155 |
| lane L7 (O-206) | 80/80 | 63/80 | 4/64 | 14/64 |
| critic 3's probe | 36 cells, 0 errors | 36 cells, 0 errors | same | same |

Fix 3's "Final pass" table reproduced cell for cell. Critic 2's probe now reads its four
findings cured (the five Collapsible layout cells, the declined Slider step, the tempo rows,
the coarse radii) and every other cell as critic 2 read it; its v11.0.0 readings are
identical to critic 2's in both engines. Three cells did not pass, none of them a defect:

- **Lane L2, WebKit, O-171 `1440-light`** read the first painted strip at 42 px against an
  anchor read at 38.4 px while the trigger is pressed (2 px allowance), as critique 2 and fix
  3 read it. The dark cell of the same run read 40 px. The menu grows from its trigger.
- **Lane L7, WebKit, `drawn`** read 0/16, a fourth time. In each cell the event fired once
  with the mark final; the screencast holds no frame after it. Chromium reads 16/16.
- **Lane L7, WebKit, one stall cell** (`390-light-underline`) was classed measurable this run
  and failed: the screencast held one frame inside the 51 ms task, at the progress the task
  began with (0.412), so no rise can be read from it. The other eleven cells were
  unmeasurable as the lane recorded. One frame is not a measurement of advance; this goes to
  INBOUND as a witness threshold, and item 9 of the review note is not reopened.

## Defects (reproduced)

### 1. A top padding the consumer declares in an earlier cascade layer is dropped (low, breaks a narrow consumer of 11.0.0)

Fix 3 moved `--collapsible-gap` onto the content's own top padding:
`:where(.disclosure-content[data-disclosure="collapsible"]) { padding-block-start:
var(--collapsible-gap, 0px); }` (`disclosure.css:114-116`). `:where()` gives it zero
specificity, which protects a consumer's padding only inside the same layer or a later one.
The rule ships in `@layer components` (`dist/collapsible.css` opens with
`@layer theme, base, components, utilities;`), and layer order outranks specificity: any
padding the consumer declares in a layer that sorts before `components` loses to it, with the
gap unset. On 11.0.0 the library declared no padding on the content, so that padding applied.

Critic probe (`Collapsible padding`), the content given a class whose `padding: 16px` is
declared four ways, `--collapsible-gap` unset. Chromium and WebKit read the same:

| the consumer's padding is declared | v11.0.0: top padding, first child, content height | branch |
| --- | --- | --- |
| unlayered | 16 px, at y 16, 71.2 px | same |
| in `@layer components` | 16 px, at y 16, 71.2 px | same |
| as the utility `p-4` | 16 px, at y 16, 71.2 px | same |
| in `@layer base` | 16 px, at y 16, 71.2 px (77.9 px at 1440) | **0 px, at y 0, 55.2 px** (61.9 px at 1440) |

Paint: `critic-3/sheets/collapsible-layered-padding-chromium.png` (the first line of the
content sits against the trigger on the branch, light at 390 and dark at 1440) and
`critic-3/sheets/probe-webkit.png`, first row. With `--collapsible-gap: 12px` the same
consumer gets 12 px, not their 16, so the CHANGELOG's "If you pad the top of the content
yourself, your padding sets that space instead" is not true of them either.

How narrow: it takes a rule in `@layer base` (or a consumer's own layer declared before
Tailwind's `components`) that reaches the content, by a class or by an attribute such as
`[role="region"]`, which the content carries. Tailwind tells consumers to put class styles
in `components`, where they are safe. It is a break all the same, a minor may not carry one,
and the cure is one token.

Cure, read in both engines (`critic-3/probe/cure-check.mjs`, plain CSS, no library): the
fallback becomes `revert-layer`, a CSS-wide keyword, so an unset gap hands the property back
to the layers beneath instead of writing zero.

```css
:where(.disclosure-content[data-disclosure="collapsible"]) {
    padding-block-start: var(--collapsible-gap, revert-layer);
}
```

| case | as built | with `revert-layer` |
| --- | --- | --- |
| padding in `@layer base`, gap unset | 0 px | **16 px** |
| padding in `@layer base`, gap 12 px | 12 px | 12 px |
| no padding, gap unset | | 0 px |
| no padding, gap 12 px | | 12 px |
| unlayered padding, gap 12 px | | 16 px |

Chromium and WebKit 2287 read every row the same
(`critic-3/probe/out/cure-check-{chromium,webkit}.json`). The witness for the cure is this
probe's `Collapsible padding` cells: the two `pad-base-gap0` rows equal to v11.0.0, the rest
unchanged. A set gap still wins over an earlier layer's padding, which is the consumer's own
choice; the CHANGELOG sentence may say so or stand.

### 2. The headline's list of changed defaults leaves out four that change how a page looks (low)

The entry opens: "a few defaults change how a page looks, and each has its own entry below:"
and lists seven. The review note's last line records that the headline "now names every
default that changes". Four more change a page's look with no opt-in, each measured RED on
v11.0.0 and GREEN on the branch, and each has an entry but is not in the list:

- **The `lateral` route transition** is a card swap where it was a fade with a slide (lane
  L2, O-173: 1/5 on v11.0.0, 5/5 on the branch).
- **`SegmentedTabs` under a coarse pointer**: each tab 26.3 px to 44 px, the strip 32.3 px to
  50 px at 390 (42.6 px to 52 px at 1440), so a row or a dock that hosts one is taller on a
  touch screen (critic probe, `Tabs arms`, both engines).
- **`Blob` paints past its layout box** (lane L4's blob cells).
- **A vertical dock's `#persistent` gap** is half what it was (lane L6, O-197).

A consumer who reads the headline to decide what to look at before upgrading would miss
these. The cure is four clauses in that sentence, or a sentence that does not read as a
complete list. Nothing else in the entry is inaccurate against the tree: it was read in full
against the readings above, and scanned for row and wave ids, lane, seat, critic, witness,
tranche, "build" and record paths, with none found.

## What the ruling asked this critic to check

- **Item 1, the Collapsible.** `CollapsibleContent.vue` and
  `tests/components/collapsible.contract.test.ts` have no diff against `v11.0.0`: reka's
  content, no phase engine, no observer, no glass-written `--reka-*` name. The change is CSS
  alone (`disclosure.css`): the opacity lines gone from the shared keyframes, `padding-block`
  riding the height from zero, `box-sizing: border-box` on the content, and the gap rule of
  finding 1. The note prescribed a `::before` block for the gap; critique 2 showed that box
  is a grid and flex item, and fix 3's padding is the cure. The note's objection to padding
  (a 12 px first frame) does not hold for it, because the keyframes take the padding from
  zero: with a consumer's 16 px padding the root is its closed height on the first open frame
  and the last close frame on the branch (24 px, 24.2 px), where v11.0.0 reads 56 px on both
  (critic probe, `Collapsible frames padded`, both engines). That is the RED and GREEN
  reading for the CHANGELOG's "Padding you give the content now grows with the height"; fix
  3's own frames cell passes on all three trees and discriminates nothing. A reversal still
  restarts and the CHANGELOG claims nothing about it. The Accordion shares the keyframes and
  reads identically to v11.0.0 at rest and on its first and last frames, 390 and 1440, light
  and dark. With reduced motion the content opens in one step, gap included.
- **Item 2, the lateral swap.** `overflow: visible` on the window group under `lateral`;
  `--route-card-sink` and `--route-card-dim` are gone and the recede keyframe is `scale`
  alone. Chromium: the arriving card whole with four round corners at 390 and 1440, light and
  dark, 4/4 (`critic-3/sheets/items-a-chromium.png`, `items-b-chromium.png`). WebKit:
  unmeasurable with its control, 4 cells, as recorded.
- **Item 3, one commit per row.** `617d62f73` (O-212 with O-213's cap) and `b6393d385`
  (O-214) hold source and tests only.
- **K12 and O-211, reverted whole.** No `SliderThumb.vue`, no `DockLayerSwitcher.vue`;
  `DockLayerGroup.vue` has no diff against v11.0.0; the CHANGELOG claims neither. O-213's
  shell floor: `configurator/styles.css` differs from v11.0.0 by G13 alone.
- **G13 and G14, gated in both engines.** G13 4/4 on the branch, 2/4 on v11.0.0; G14 4/4 on
  the branch, 2/4 on v11.0.0; both engines. With fix 3's radius the coarse strip is a capsule:
  tab 44 px at 22 px, strip 50 px at 25 px (52 px at 26 px at 1440), on the page and in a
  dock, light and dark, both engines (`critic-3/sheets/tabs-coarse-chromium.png`,
  `probe-webkit.png`). The vertical arm keeps its 12 px corner as on v11.0.0.
- **Item 4 and the nested-table ruling.** Table one surface 4/4 on the branch, 0/4 on v11.0.0,
  both engines; critic 2's host cells (Dialog, side Sheet, Popover) read as critic 2 read them.
- **Item 5, the gliding mark.** The observer acts on `aria-current` and on the run's own child
  list; no `@property` registration for the mark. Lane L1's O-188 is 6/6 in both engines.
- **Item 6, the viz clip.** `backwards` on `.viz-bar` and `.viz-ripple`; lane L2's O-168 is
  5/5 in both engines, 1/5 on v11.0.0.
- **Item 7.** Nothing was added to the long press. No finding is raised on it.
- **Item 8.** The grain bullet carries the dots clause.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.

## Fix 3's other cures, beyond its own cells

- **The Slider.** Critic probe, both engines, each equal to v11.0.0: a consumer that accepts
  a key step 80 ms late (the thumb waits on the model, then follows), an uncontrolled slider
  (`defaultValue` only: the thumb moves, the events fire), and a two-thumb range. The
  documented new default also reads as the CHANGELOG says: dragging past a value the handler
  declines, the thumb and `aria-valuenow` are with the hand (100) while it is held and back
  on the model (60) on release, and the next key step starts from the model. v11.0.0 held the
  thumb at 60 throughout. The branch delivered 5 updates for the drag where v11.0.0 delivered
  12 (Chromium; 2 and 14 in WebKit).
- **The tempo.** Inside one synchronous run, a rule inserted after a read is not seen until
  the next microtask (`sameRun` 1 against a computed 0.6, then 0.6). v11.0.0 reads the same
  three values, so nothing regressed; fix 3's four rows hold in both engines.
- **The tabs.** Covered under G14 above.

## The dock, every posture

Lane L6's witness holds every posture at 390 and 1440, fine and coarse, light and dark:
161/161 in Chromium and 155/155 in WebKit on the branch, 31/161 and 37/155 on v11.0.0. Read in paint
(`critic-3/sheets/dock-postures-chromium.png`, `-webkit.png`): open horizontal and vertical,
collapsed to one control, to two, to a glyph with a reading, the persistent face at rest and
opened by hover and by the long press, the trailing gap, and the morph's mid-frame. Capsules
and circles throughout, no flattened or cut corner, in both engines. Lane L1's collapsed
seat, run mark and border rim read as recorded. No regression found.

## A consumer of 11.0.0

`critic-3/api/compare.mjs` against the 11.0.0 tarball (`.cache/l4-pack/package`), on the
`dist` the committed-tree build made. The result is identical to critic 2's
(`compare.json`, byte for byte as parsed):

- `package.json` `exports`: none removed, none changed; `./styles/font-files` added.
  `peerDependencies`, `dependencies`, `files`, `sideEffects` and the entry fields unchanged.
- Export names per entry: none gone. Added: `PopoverVirtualElement`,
  `ScrollProgressRimEdge`, and seven names on `./motion-core`.
- No `.d.ts` file is missing; eighteen differ, additively.
- Shipped CSS: no class gone but Tailwind's `overflow-auto`. Custom properties gone:
  `--hm-h` (still read where a consumer sets it, `HandMark.vue:606`), `--route-slide` and
  `--route-world-slide` (named in the CHANGELOG headline now).
- The one behavioural break found is finding 1.

## Gates (committed tree, `f45e57f27`)

`critic-3/gates.sh`, one guarded run: build 0, typecheck 0, demo:dist:build 0, vitest 0
(2574 passed, 10 expected fail, 1 skipped), verify:package 0 and CLEAN with the bundle
ratchet at 3014778 as committed.

**e2e**, the union of the specs fix 2, fix 3 and the HandMark lanes touch (`Select.bound`,
`overlay-sizing`, `menu-glass`, `config-chassis`, `config-right`, `SegmentedTabs.glide`,
`tabs-std`, `disclosure-rotate`, `nav-dock-fix`, `Sheet.position`, `aria-orientation`,
`a11y-slider`, `handmark`), one worker, reports in `critic-3/e2e/`: 57 passed, 22 failed, 2
skipped on each tree in each engine, the failed title sets identical between the branch and
v11.0.0 in Chromium and in WebKit (compared from the JSON reports). `handmark.spec.ts` is
10/10 on each tree in each engine. The runs rewrote four tracked PNGs and dropped six
untracked ones under `docs/tranches/`; this critic restored the four and deleted its six.

## For INBOUND (not defects of this release's items)

- **Every witness server on this machine shares one Vite optimize cache.** `node_modules` is
  one symlinked folder for the main checkout, every worktree and every `.cache/` tree, so a
  server started after another tree's logs "Re-optimizing dependencies because vite config
  has changed" (every server log under `critic-3/` has the line). This critic's first probe
  run on v11.0.0 in WebKit began while that ran and read a page with two copies of Vue: the
  model changed and the DOM did not (a Collapsible that never opened, a Slider whose thumb
  never moved). Those readings are kept in `probe/out/first-webkit-red/` and are not used.
  `probe/runprobe.sh` now starts the server twice, the first pass only to settle the cache,
  and the rerun reads as Chromium does. A false RED on the comparison tree is the risk; the
  lanes' and fix seats' runners have no such guard. A cache directory per tree would end it.
- **Fix 3's record counts the fix 2 witness as 80/80.** Its log sums to 60 cells, as critique
  2 counted (60/60 on the branch, 36/60 on v11.0.0, both engines).
- **Fix 3's "Collapsible frames" cell passes on all three trees**, so it gates nothing. The
  discriminating cell is this critic's `Collapsible frames padded` (56 px against 24 px).
- **Lane L2's O-171 witness reads the anchor while the trigger is pressed** and its light
  cell counts 2 px of shadow as paint, which puts one WebKit cell on its tolerance for the
  third run in a row.
- **Lane L7's `drawn` cell cannot be read in Playwright WebKit on this machine** (four runs),
  and its stall cell calls one frame inside the task a measurement. It should ask for two.
  Real Safari is unmeasured for both.
- **Lane L2's own O-180 cell** still asks for zero root reads; the amended copy is fix 3's.
- **`package.json` still reads 11.0.0** and the CHANGELOG heading reads "unreleased". The
  close bumps both.
- **Four e2e specs write into the tranche records** (`tabs-std` overwrites four tracked PNGs;
  `disclosure-rotate` and `handmark` drop six untracked ones), and
  `docs/tranches/BI/audit/visual/W-SHEET-RADIUS-readback.json` still sits untracked in this
  worktree from an earlier seat.
- **The 22 e2e cases that fail on both trees** assert values older than 11.0.0's and cannot
  go red on a regression.
- **Held open and finished by script, a `Collapsible`'s close animation leaves the content
  mounted in Chromium** on both trees (this probe's `closedAfter`); the Accordion closes.
  A probe artefact as far as this critic can tell, the same on v11.0.0.

## For the fix seat

1. `padding-block-start: var(--collapsible-gap, revert-layer)` on the one rule, then this
   probe's `Collapsible padding` cells in both engines: the `pad-base-gap0` rows equal to
   v11.0.0, every other row unchanged, and fix 3's layout, gap and frames cells still green.
2. The CHANGELOG headline names the `lateral` card swap, the taller segmented tabs on touch,
   the blob's wider paint and the vertical dock's gap, or stops reading as a full list.
