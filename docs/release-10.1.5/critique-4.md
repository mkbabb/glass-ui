# 10.1.5 — critique, round 4 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `c67955100` (35 commits
over `v10.1.4`). I read every commit and the full `src/` diff, plus `critique-1.md` to
`critique-3.md`, `implement.md`, the fix-2 and fix-3 records, `inbound-O-132.md`,
`inbound-O-133.md`, and the untracked `inbound-O-150-Rt1.md`, `inbound-O-155.md` and
`orchestrator-note-round4.md` (the last two landed mid-round), and value.js's relay
`O-129-glass-relay-2026-11-04.md` (read-only).

Every browser run was admitted by `guarded`: Chromium (headless, `chromium-headless-new`) and
Playwright WebKit 2287 (`--exclusive webkit`). The kernel zone was at about 11k.

## Probes

- **Harness:** `tests-visual/release-10-1-5/critic-4.{html,ts}`. It has critic-2's scenes
  (`dock`, `layers`, `slider`, `fields`) plus round 4's: `slider4`, `fields4`, `menu4`,
  `segtabs` and `table`. The `dock` scene gains extra seat kinds and parameters:
  - seat kinds `wmenu:<label>` (a labelled `DockTrigger`), `cur` (an `aria-current` open
    seat) and `live` (a ticking label)
  - `preset=cockpit`
  - `noro=1` (no `ResizeObserver`)
  - a `ResizeObserver` construction counter
- **Spec:** `tests-visual/release-10-1-5-critic-4.spec.ts`, with WebKit config
  `release-10-1-5-critic-4.config.ts`. Driver: `docs/release-10.1.5/scripts/critic-4.sh`;
  g6 driver: `scripts/g6-critic-4.sh`.
- **Rows:** banked under `docs/release-10.1.5/critic-4/<project>/`.
- **v10.1.4 arm:** the same spec against a `git archive v10.1.4 src demo` copy
  (`critic-4-v1014.{html,ts}`, `CRITIC_ARM=v1014`, rows under `critic-4/v1014/`). The
  branch's `src/` was never swapped. The copy is not committed. Recreate it with
  `git archive v10.1.4 src demo | tar -x -C tests-visual/release-10-1-5/v1014`.

| run | result |
|---|---|
| Chromium, branch, whole spec | 46/46 cells read (`probe-chromium.log`); the menu, segtabs and edge cells re-run after a probe fix, 6/6; edge zoom 2/2 |
| Chromium, v10.1.4 arm | 22 cells + edge zoom 2 |
| WebKit 2287, branch | critic-2's 26 cells read. The first round-4 pass lost its dev server mid-run (24 `Could not connect`, not findings), so they were re-run on a fresh port: 24/24 |
| WebKit 2287, v10.1.4 arm | 10/10 |
| g6 Chromium | release-10-1-5 25/25, release-10-1-4 23/23, release-10-1-3 60/60 |
| g6 WebKit 2287 | release-10-1-5 25/25, release-10-1-4 15 passed + 8 skips (`page.pdf`), release-10-1-3 58 passed + 2 skips (CDP swipe) |
| typecheck (`guarded --light`) | exit 0 |
| O-155 (both arms, both engines) | Chromium 2/2 + 2/2, WebKit 2/2 + 2/2 |
| 1px-step scratch, e1 to e4 | Chromium 11/11, WebKit 11/11 (`src/` restored) |
| build, vitest, verify:package, demo:dist:build | not re-run. `git diff --name-only edfdbb745..HEAD` is docs only, so fix-3's `regate` (vitest 247/247 after the build, verify:package CLEAN) is the record for this src and package tree |

## Verdict

The five O-129 cures hold in both engines across the postures I tried, and so do OD-16, OD-17
and OD-18 and critique-2's unwitnessed WebKit keyboard cells. The branch is not ready to
tag, for two reasons:

1. **The two in-scope inbound rows are uncured.** O-133 and O-150 R-t-1 have no change on
   the branch at all, and both reproduce in both engines.
2. **Fix rounds 2 and 3 have one new paint regression.** The run's scroll clip now sits on
   the plate's own edge (H1), so an overflowing run paints seat ink across the plate's
   rounded corners.

The orchestrator's round-4 note adds two more: H5 (the 1px step is a second mechanism; the
spacer alone holds e1 to e4 in both engines) and H6 (the patch's source comments carry
process ids and struck history). O-155's at-rest gate is GREEN in both engines.
Critique-3's four static suspicions all reproduce. Two are geometry changes no cure needs
(H2), one is churn without a paint effect (H3), and one is latent (H4).

## Defects (reproduced)

### H1: the run's clip moved to the plate's edge, so an overflowing run paints seat ink past the plate's cut corners (regression, medium)

The fix-2 E3 room and the fix-3 trailing-reserve spacer hand the reserve back outward. The
layers take only `max(0, reserve − dock padding)`, so the run's scroll clip lands on the
plate's edge, not inside it.

`r4-edge-*.json`, a 12-seat run at 390, plate `[15, 375]`:

| | v10.1.4 run clip | 10.1.5 run clip |
|---|---|---|
| house | `[27, 363]` (12 px in) | `[16, 374]` (1 px in) |
| cockpit | `[21, 369]` (6 px in) | `[15, 375]` (0 px in) |

At mid-scroll every plate corner is the 16 px cut. A seat that straddles the trailing clip
is cut by a straight vertical line at the plate's edge. Its fill's square top and bottom
then lie outside the plate's corner arc.

`r4-edgezoom-*.json`, a hovered tab straddling the trailing clip (fill
`color(srgb … / 0.14)`):
- ink past the plate arc: house **1.44 px**, cockpit **2.21 px**, in both Chromium and WebKit
- v10.1.4: **0** in both engines (the clip sat 12 px and 6 px in)

The 3x frames show the clipped hover fill's square corner crossing the plate's rim at the
cut corner: `critic-4/chromium-headless-new/edgezoom-{house,cockpit}-S8.png`, against the
same frames under `critic-4/v1014/chromium-headless-new/`. This is the "dock-edge room in
an overflowing cockpit dock" the brief asked about, and it also holds for the house
geometry.

Cure direction: the scroll clip follows the plate's shape on the scroll axis. Two forms
would do it:
- the run clips to the plate's own rounded box (for example `clip-path: inset(… round
  var(--dock-cap-*))` from the same timeline)
- the reserve's outward hand-back stops at the cut corner's inset

The ring's room (O-124 OD-13) must stay. No row in this round shows a ring clip in any
posture.

### H2: the reserve grows for seats that paint no overhang, and an opening seat slides the run off its persistent region (critique-3 S1, reproduced; medium-low)

`observeSeats` takes every `[data-glass-dock-seat]`, including `<DockTrigger>`. The trigger
family's hover scale is off (`controls/triggers.css:29`, `DockTrigger.vue`) and its press
scale shrinks it, so a trigger paints no overhang.

`r4-s1-*.json` at 844:

| case | Chromium (v10.1.4 → 10.1.5) | WebKit (v10.1.4 → 10.1.5) |
|---|---|---|
| a 265 px labelled `DockTrigger` beside two icons: dock width | 385.17 → 399.17 (+14 px, fine) | 387.97 → 401.97 |
| coarse | +14 px | +14 px |
| icon docks | 160 / 172, unchanged | unchanged |
| a seat opens (`aria-current`, 136 px): dock growth | 96 → 98 (fine), 104 → 106 (coarse) | the same |
| with `#persistent`: lead → S1 at rest, then opened | 6 → 6 | 14 → 19 px (fine and coarse), back to 14 on close |

So the trigger widens the dock by 14 px of reserve that no ink uses. The opening seat
moves the run 5 px against the persistent region on every route change, and the dock grows
off the pitch lattice.

The open seat does take `--scale-hover-dock`, so its own ink is real. The slide is the
price of sizing a fixed reserve from the largest seat. Cure direction (critique-2 E1's
other branch): a seat's engagement ink must not count as scrollable overflow, or the
reserve counts only seats that scale. Either way the run's room must not change when the
seat set changes.

### H3: a live label rebuilds the seat ResizeObserver on every tick (critique-3 S2, reproduced; low, no paint effect)

`r4-s2-*.json`: a 3-seat dock with a `tab` seat whose label ticks 60 times.
- `ResizeObserver` constructions: 4 → 64 on the branch in both engines (one per tick)
- v10.1.4: 2 → 2
- no `ResizeObserver loop` error or console message in either engine
- the plate stays uniform with no reach

The pane `MutationObserver` (`subtree`, `characterData`) calls `observeSeats()`, which
disconnects, clears and rebuilds on every record. Cure: add and remove observed seats from
the mutation records, or keep one observer and diff the `querySelectorAll` set.

### H4: no ResizeObserver means a square plate (critique-3 S3, reproduced; low, latent)

`r4-s3-*.json` (`noro=1`): the plate computes `0px` on all four corners in both engines.
v10.1.4 computes `9999px`. Until `--dock-plate-cross-px` is published, `--dock-cap-rest` is
invalid at computed-value time. No target engine lacks `ResizeObserver`. A
server-rendered first paint would show the same square; SSR is unmeasured, and I know of
no SSR consumer. It fails loud, which the repo law accepts, so I list it for the record
only.

### H5: fix round 3 cures one fact with two mechanisms; the 1px scroll step is not needed (orchestrator note, reproduced; low-medium)

`orchestrator-note-round4.md` asked whether the `--dock-run-step-*` 1px is still needed
once the trailing-reserve spacer is in place.

- **Scratch:** `scripts/step-scratch-critic-4.sh` sets both
  `--dock-run-step-inline: 1px` (run.css:151) and the vertical
  `--dock-run-step-block: 1px` (:170) to `0px`, runs the release spec's e1 to e4, and
  restores run.css from HEAD on exit. `git status src` is empty after both runs.
- **Result:** Chromium 11/11 and WebKit 2287 11/11 (`step0-*.log`). That includes the
  coarse-390 e3 the step was written for, and e4 at 390 and 1440.

So the spacer alone holds the case, and the step is a second mechanism for one fact. Cure:
delete the step tokens and their prose. The reserve becomes the bare ink again, rounded
up, and `useDockRun.occluded`'s "the reserve's scroll step is the room that covers it"
must say what covers it instead.

### H6: source comments carry process ids and struck history (orchestrator note; low)

`git diff -U0 v10.1.4..HEAD -- src` adds 44 comment lines across 8 files. They carry a
process id (`[10.1.5 fix round 3]`, `[10.1.5 critique 2 E1, E2]`, `(O-129 r1, O-123
OD-5)`, `W-0.8 §11`, `critique-7`) or struck-through prose (`~~the bare ink~~`,
`~~the bare slot~~`, `~~`max(gap, reserve)`~~`, and others). The full list, file:line, is
`critic-4/history-comment-lines.txt`:

| file | lines |
|---|---|
| run.css | 25 |
| slider/styles.css | 6 |
| light-dark.css | 4 |
| dockMorphMeasure.ts | 2 |
| useDockRun.ts | 2 |
| shell-regions.css | 2 |
| Slider.vue | 2 |
| sizing.css | 1 |

v10.1.4's `src/` already carries 381 such lines in the same house idiom, so this is the
patch following the house idiom. The orchestrator's rule counts the patch's own additions
as defects; I report those and leave the inherited lines alone.

### O-133 (in scope): uncured; SegmentedTabs `underline` paints over a z:1 fixed header (high, both engines)

Nothing under `src/components/tabs/` changed on the branch. `r4-segtabs-*.json` puts a
`position: fixed; z-index: 1` header over a SegmentedTabs in an unpositioned host and reads
`elementsFromPoint` at a tab.

| variant | stack | result |
|---|---|---|
| `underline` | `segmented-tab` > `header` | RED on branch and v10.1.4, Chromium and WebKit, fine and coarse |
| `pill` | `header` > `segmented-tab` | escapes only because `.glass-capsule-track` carries `backdrop-filter`, which makes a stacking context by accident |

The `underline` strip sets `backdrop-filter: none` (`segmented.css:334-342`), so its
`z-index: 10` tabs (`:268-270`) rank in the page's root context. The cure is the one the
brief names: `isolation: isolate` on the root, and the smallest internal rung over the
indicator (`z-index: 0`, `:133`).

### O-150 R-t-1 (named in-scope by its inbound note): uncured; table rules paint in the text colour (medium, both engines)

`TableRow.vue:14` (`border-b`) binds no colour. `r4-table-*.json`, rule colour against
`--border`:

| mode | rules | `--border` |
|---|---|---|
| light | `rgb(28, 25, 23)` (the cell `color`) | `rgb(198, 180, 159)` |
| dark | `rgb(233, 230, 226)` | `rgb(101, 87, 73)` |

This is identical on v10.1.4, in Chromium and WebKit. The inbound note is untracked and
dated after fix round 3, so no seat had taken it yet.

## O-155 (in scope): a two-seat dock at rest

- **Probe:** `r4 o155`, at 3x, Chromium and WebKit 2287, light and dark, fine 390 and
  1440 plus coarse 390, branch and v10.1.4 arms; rows in `r4-o155-*.json`, frames in
  `o155-*.png`.
- **The gate is GREEN on the branch.** A two-icon dock reads four corners of `h/2`
  (28 px fine, 30 px coarse) with `sw = cw`, in both engines, both themes and every cell.
  Its plate shares the root's box exactly and the root's used radius (the root's `9999px`
  clamps to `h/2`).
- **The crescent layer is the root `.glass-dock`'s own box-shadow stack.** That is the
  `--glass-rim-top` and `--glass-rim-bottom` insets and `--shadow-dock`
  (`shell.css:244-246`), painted on the root's `--radius-dock` stadium. The plate is its
  `z-index: -1` child and paints the cap radius (`dock.css:54-70`). At 10.1.4 the plate
  painted the per-axis `50%` ellipse and the 16 px cut, while the root's rims and shadow
  stayed a stadium. Where the two outlines part, the root's rim shows past the plate:
  daraksha's pale crescent on the leading side, the same family as OD-16's ghost.
- **10.1.5 cures it at rest,** because the plate's rest corner is now the root's own
  corner.
- **The two outlines still part whenever the cut fires:** an overflowing run at
  mid-scroll reads plate 16 px against root 28/30 px, in both arms and engines. My frames
  on a plain page show no visible crescent there, so I do not report it as a defect. A
  saturated backdrop like daraksha's may show one, and W-0.8's single-outline law should
  own it.
- **The RED arm is unwitnessed here.** On v10.1.4 my two-seat dock reads `sw = cw` with
  no cut, so it paints the stadium. daraksha's frame needs its own rest overflow, the r1
  arming, which this harness does not reproduce.

## What held (refutation attempts that failed)

- **r1 / g1.** Fine and coarse at 320, 390, 430, 844 and 1440, in both engines, with
  kinds `menu,sep,icon×3`, `tab:Home,icon,icon,tab:Settings` and `icon,tab:A much longer
  label`. In every posture the plate reads four corners of `h/2` and `sw = cw`, with no
  ring clipped. The postures are rest, hover on each seat, focus, focus+hover, press (held
  mouse-down on each seat, `r4-press-rtl-*.json`) and RTL. The 1440 coarse wide tab
  critique-2 E1 reported is clean.
  - The only non-uniform rest row is 320 with two tab seats, a run that truly overflows
    (Chromium coarse 322/318, WebKit coarse 327/318).
  - One WebKit-only sub-pixel case: at fine 320 that run reads 319/318 (Chromium
    318/318), the corner moves 28 → 27.75 px, and hovering S2/S3 flips it to the
    trailing side. That is within g1's 0.5 px.
- **r1, an overflowing run.** Twelve seats in a 360 px dock, LTR, RTL and with both
  persistent regions, in both engines:
  - rest `28|16|16|28` (coarse `30|16|16|30`), mid all 16, flush end mirrored, back at 0
    the rest returns
  - RTL mirrors on the physical corners
  - cockpit (`r4-cockpit-*.json`, 320 and 390): rest `26|16|16|26` and the flush ends
    mirror it; the end tabs focused and hovered at both scroll ends clip no ring in either
    engine
- **r2 / OD-16 / OD-18.** Collapse frames (Chromium 192 to 193, WebKit 97 per cell) are
  one corner of half the extent from arm to settle. They settle on a 56x56 (60x60 coarse)
  circle and paint no ghost box larger than the plate. Layer switches (Chromium 217,
  WebKit 109 frames) are uniform with no reach.
- **OD-17 and critique-2's unwitnessed WebKit keyboard cells.** `dock-tab-ring-kbd-*`,
  WebKit 2287: a key press, programmatic focus, then hover, on S1 and S4 and on the
  layers scene's L1, at 390 and 1440, fine and coarse. All are ringed whole, with
  `sw = cw` and uniform corners. Vertical: no ring clip in either engine.
- **r5.** `r4-slider-*.json` and `slider-*.json`, both engines. The thumb is visible at
  opacity 1 and one size per rung (8/16/24), inside the fill and at its value end, in
  every cell:
  - min, mid and max
  - fourier `50` on `50..800` and value `6/6`
  - step edges `3` and `9` on step 3
  - sm and lg at 0, 50 and 100
  - RTL and inverted, vertical and vertical inverted
  - two thumbs
  - drag held past both ends and released
  - disabled, where the thumb takes the half register

  The fill is never narrower than the thumb (16 px at min).
- **r6 / g4.** At coarse 390 in both engines, `.input-bar-field`, `.input-pill`,
  `input.input-pill`, an sm `.input-pill`, the `SelectTrigger` and the dock's search field
  are all 16 px. That is 1.128 times the 14.19 px subtitle, with a 54 px bar. On a fine
  pointer at 390 they are 14 px, and 16 px at 1280 on both pointers. `<Input>` and
  `<Textarea>` stay 14 px on coarse 390 (critique-3 S4). That is recorded and out of r6's
  scope.
- **r7 / g5.** Icon to label is 4 px, equal to `--icon-label-gap`, on a bare icon item, a
  spanned-label item, checkbox and radio items with an icon, and a sub-trigger, in both
  engines. v10.1.4 measures 0 px.
- **Tokens.** The only moved values are the coarse `--control-text` and
  `--control-text-sm` (r6's cure is the token). The new tokens are `--field-text-floor`,
  `--icon-label-gap`, `--value-mark-inset` and the dock's internal `--dock-run-*`,
  `--dock-seat-max-*` and `--dock-plate-cross-px`. No export was removed or renamed.
- **g6.** Chromium: 25/25, 23/23 and 60/60. WebKit 2287: 25/25, 15 + 8 skips, and 58 + 2
  skips, the same skip set as fix-3.

## Owed

- **O-133** and **O-150 R-t-1** cures, with their gates in both engines.
- **H1:** the clip follows the plate's cut corners without losing the ring room.
- **H2:** the run's room is independent of which seats exist or open, or the patch rules
  that the slide is accepted, with a reason.
- **H3:** the seat observer is diffed, not rebuilt.
- **H5:** delete the 1px step (the spacer holds e1 to e4 alone in both engines).
- **H6:** the patch's 44 history-bearing comment lines restated as what the code does.
- After any of these, the critic-4 spec re-run, then g6 and g7 in both engines.
