# 10.1.5 — critique, round 7 (adversarial)

Critic: claude-opus-5-5, fresh context (two seats: the first ran the Chromium arm and the first WebKit pass, which stalled in page calls after 25 min in one WebKit process and was killed at 90 min; the second re-ran each remaining WebKit cell in its own process). Branch `release/10.1.5` at `06a17d634` (fix round 6,
`121a8bb55`, plus its rebind and records). I read every commit over `v10.1.4`, the full fix-6
`src/` diff, `critique-1.md` to `critique-6.md`, `implement.md` through fix round 6, every
`inbound-*.md` and every orchestrator note, round 7's included.

Every browser run was admitted by `guarded`: Chromium (`chromium-headless-new`) and Playwright
WebKit 2287 (`--exclusive webkit`). The browser pool and the machine-wide WebKit lock were
contended all night; the waits (up to about 1 h for a browser slot, 2.5 h for the WebKit lock)
were waits, not refusals.

## Probes

- **The battery:** `tests-visual/release-10-1-5-critic-7.spec.ts` is critic-6's whole spec
  (critic-4 to critic-6 cells, the r6 cells included) re-run on the tip, banking to
  `critic-7/<project>/`. Config `release-10-1-5-critic-7.config.ts` (WebKit 2287).
- **Round 7's cells:** `tests-visual/release-10-1-5-critic-7b.spec.ts` on a new harness,
  `release-10-1-5/critic-7{,-v1014}.{html,ts}` (the v10.1.4 arm reads
  `tests-visual/release-10-1-5/v1014/`, `git archive v10.1.4 src demo`). Rows bank to
  `critic-7/branch/<project>/` and `critic-7/v1014/<project>/`.
  - **r7a** a collapse from a scrolled overflowing run (mid and end, 390 and 1440).
  - **r7b** a layer switch between an overflowing layer and one that fits.
  - **r7c** a vertical stage swept 300 to 420 px in 4 px steps (round-6 ruling 1), and a
    horizontal cap swept across the fit edge in 1 px steps, at rest and scrolled to the end.
  - **r7d** O-156 / O-165: each seat hovered on a parkway-like dock (DockControl, separators,
    two SegmentedTabs groups, DarkModeToggle) and two daraksha-like docks, light and dark,
    430/1440/1800; a pixel delta hover vs rest, by band (outside the plate, inside the plate
    away from the seat, at the seat).
  - **r7e** O-157: a static and a live dock under an ancestor `--glass-veil-ink`, both themes.
  - **r7f** O-161: a tap (coarse) on the dock's DarkModeToggle and on a DockControl.
  - **r7g** O-162 / O-177: Tab onto the folded summary, and Escape folding an expanded dock.
  - **r7h** O-176: a `collapse="open"` dock left untouched, and after a remount.
  - **r7i** O-177: a click (fine) or tap (coarse) on a seat at 0 to 1200 ms into the expand.
  - **r7j** O-166: the Slider-hosting composition (tab, two controls, separator, Slider, two
    controls, DarkModeToggle; static backdrop), `collapse` false and `"open"`, both themes,
    with collapse and expand frames.
  - **r7k** O-167: that dock's Slider fill ink in both themes, and a drag of 24 moves of
    4 px, one per frame, reading the thumb and the fill on each frame.
  - **r7l** a run whose only child is a DockLayerGroup wider than the port: where it rests.
- **Theme seeding.** My first r7d/r7j/r7k pass set `.dark` on `<html>`, and the scene's
  DarkModeToggle (vueuse `useDark`) put it back to light. The harness now seeds
  `vueuse-color-scheme`; those three cells were re-run on both arms (`*.first.log` keeps the
  first pass). Only the dark rows changed.
- **Drivers:** `scripts/chain-critic-7.sh` (battery), `scripts/chain2-critic-7.sh`
  (round-7 cells, g6, g7), `scripts/webkit-all-critic-7.sh` (all remaining WebKit under one
  lock; its first pass stalled), `scripts/webkit-rest-critic-7.sh` (the WebKit resume: each
  remaining cell in its own Playwright process, parts a to d), `scripts/critic-7-stale.mjs`
  (nothing-to-scroll rows that rest non-uniform), `scripts/critic-7-r7d-reband.mjs` (r7d's
  bands at the screenshot's scale). Run log `critic-7/runs.txt`.
- **Two harness fixes in the resume.** r7l's wheel step throws in mobile WebKit ("Mouse wheel is
  not supported"), so it runs for fine or Chromium only; r7d's WebKit bands are re-read offline
  (below). One `tsc` check on the spec ran outside `guarded`; it should have gone through
  `--light`.

| run | engine | result |
|---|---|---|
| battery (critic-4 to critic-6 cells) | Chromium | 77/77 (38.3 min) |
| battery | WebKit 2287 | 76/77, `dock postures fine 320` timed out on a cold load; re-run 1/1, its 1599 leaves equal critique-6's row |
| round-7 cells, branch | Chromium | 20 + 1 skip, then r7d/r7j/r7k re-run with theme seeding |
| round-7 cells, branch | WebKit 2287 | first pass 12/23, then 11 coarse/r7d/r7e/r7l cells hung in page calls (one 25-min process); resume one process per cell: 10/10 and r7l coarse 1/1 |
| round-7 cells, v10.1.4 | Chromium | 20 + 1 skip, re-run as above |
| round-7 cells, v10.1.4 | WebKit 2287 | 22/22, one process per cell |
| g6 release-10-1-4 | Chromium / WebKit | 23/23 / 15 + 8 skips |
| g6 release-10-1-3 | Chromium / WebKit | 60/60 / 58 + 2 skips |
| g6 release-10-1-5 (the branch's own spec) | Chromium / WebKit | 49/49 / 49/49 |
| g7 | node | typecheck 0, build 0, demo:dist:build 0, vitest 247/247 files (2397 tests + 10 expected-fail + 1 skip), verify:package terminal CLEAN at 10.1.5 |

## Verdict

Fix round 6's L1 cure holds in both engines: no row with nothing to scroll rests non-uniform
(r6a, r6b, r6f: 0 in both engines; critique-6 had 2 to 12 per file), and the whole critic-6
battery reads as it did in round 6 otherwise.

The branch is **not ready to tag**. One defect is the r2 cure's own law (M1, Chromium; WebKit holds),
fix 6 left round-6 ruling 1 open (M2), and the round-7 inbound rows the orchestrator put in
scope are uncured (M3): each one I reproduced is RED on the branch exactly as on v10.1.4, in
both engines, except O-156/O-165, which r1 already cures in both. M4 is a small Chromium-only
mount snap on a layered run. Every g6 and g7 gate is GREEN.

## Defects (reproduced)

### M1: a collapse from a scrolled overflowing run seals lopsided (r2 / OD-16 class; medium-high; Chromium only)

r2's law is that a collapsed plate is a true circle. It fails whenever the dock collapses
while its run is scrolled off 0, which is the normal life of an overflowing dock: the pointer
rests on (or keyboard reach lands on) a trailing seat, the run scrolls, the pointer leaves,
the dock idles shut.

- **r7a** (`critic-7/branch/chromium-headless-new/r7a-{fine,coarse}.json`; 9 seats capped at
  220 px, `collapse="closed"`, expand, scroll, `collapse()`): collapsed at mount the plate is
  `28px` all round. Collapsed after a scroll to mid or to the end it is
  `16px 28px 28px 16px` (fine) and `16px 30px 30px 16px` (coarse), at 390 and 1440, and it
  stays so at +1.2 s. 16 of 16 post-scroll collapsed rows are non-uniform.
- **r7j, the owner's own composition** (the Slider dock, coarse 390, where the run overflows
  534/384): hovering the trailing seat reaches the run to its end, and the collapse that
  follows settles at `16px 30px 30px 16px` on the 60 px circle (`collapseFrames`, last
  frame), in both themes.
- **v10.1.4** reads `calc(0% + 16px)` on all four corners in the same cells, so this is RED on
  v10.1.4 and RED on the branch.
- **WebKit 2287 does not reproduce it** (`critic-7/branch/webkit/r7a-{fine,coarse}.json`): all 16
  post-scroll collapsed rows rest `28px`/`30px` on four corners, at `sl` 169 to 416, and the 96
  collapse frames are uniform; r7j coarse 390's collapse after the reach settles `30px` all round.
  v10.1.4 WebKit is RED in the same cells (`50% 16px 16px 50%` from mount on). WebKit drops the plate's effect when its named timeline goes
  away; Chromium holds the last keyframe. A Chromium defect is still a defect on a target engine.
- **Mechanism.** The r2 cure names `--dock-run` only on the active pane
  (`run.css:636-642`, "the collapsed dock names no `--dock-run` timeline, the plate's
  animations are inactive, and it paints its rest corner: a circle"). That is the premise L1
  disproved: an inactive scroll timeline holds what it last resolved. `data-run-fits` cannot
  help, because the collapsed dock's full pane overflows by design, so the flag is absent and
  the plate keeps `gl-dock-cap-inline-*` (`getAnimations()` lists both while collapsed). At
  mount the timeline never resolved, so the circle is true; after one scroll it is not.
- **Cure direction.** The cap runs only on a visible run that hides something: one rule
  takes the plate's (and the run's) scroll-driven animations off under `.collapsed`, beside
  the `data-run-fits` rule, and the false comment at `run.css:636-642` goes. Gate: r7a and
  r7j's collapse after a scroll, both engines, uniform `h/2` at settle and on the last 20 %
  of frames.

### M2: a vertical run whose seats fit still scrolls, with the cap switched off (round-6 ruling 1; medium; both engines)

The round-6 ruling says the vertical run yields like the horizontal one and a vertical run
whose seats fit reports `sh = ch`. Fix 6 records it as not cured. It also adds a new
inconsistency: `data-run-fits` reads the seats' span against `clientHeight`, which includes
the run's block padding (the vertical reserve), so the flag says "fits" while the run still
scrolls by the reserve.

- **r7c** (`r7c-{fine,coarse}.json`, six icon seats, span 280 px): at stages 316, 320 and 324
  the run reads `sh/ch` 294/282, 294/286, 294/290 with `data-run-fits` present. The run
  scrolls 4 to 12 px, and its cap animations are off, so a scroll there paints no cut.
  Below 316 the flag is absent and the run overflows honestly; from 328 up `sh = ch`.
- **WebKit 2287 reproduces it** (`critic-7/branch/webkit/r7c-*.json`): fine stages 316 and 320
  (294/282, 294/286, flag present, no animations), coarse stages 340 and 344 (318/306, 318/310).
  Chromium's coarse band is 340 to 348 (318/306 to 318/314).
- v10.1.4 has neither the reserve nor the flag: its vertical run's `sh` is the seats' span
  (280), so it scrolls only while the seats overflow (stages 300 to 324) and reads 280/280
  from 328. The branch's 14 px of block reserve is what scrolls at 316 to 324.
- **Cure direction:** the vertical reserve yields through the same mechanism as the
  horizontal one, so that `data-run-fits` and `sh = ch` are one fact. Gate: r7c's vertical
  sweep, both engines, no row with the flag present and `sh > ch`, and no row with seats that
  fit and `sh > ch`.

### M3: the round-7 inbound rows are uncured (each RED on v10.1.4 and RED on the branch; branch RED in both engines)

None of these has a change on the branch. I reproduced each one in Chromium on both arms, and
each branch row again in WebKit 2287 (`critic-7/branch/webkit/`), where it reads the same unless
the WebKit column says otherwise.
The v10.1.4 WebKit arm (`critic-7/v1014/webkit/`) reads every row the same as the branch, so
each is RED on v10.1.4 in both engines too.

| row | cell | v10.1.4 (Chromium) | branch (Chromium) | branch (WebKit 2287) |
|---|---|---|---|---|
| O-157 static plate ignores `--glass-veil-ink` | r7e | static plate `color(srgb 0.994 0.96 0.926)` (light) and `color(srgb 0.2074 0.165 0.1326)` (dark) with no ink, a green ink and a red ink alike; the live plate follows the ink | identical | same: the static plate `color(srgb 0.994 0.96 0.926)` under no, green and red ink |
| O-161 DarkModeToggle hover sticks after a tap | r7f coarse | after one tap: `:hover`, background `--surface-tint-10` (`/ 0.1`), opacity 0.8 → 1 | identical. A DockControl beside it sticks too (`scale 1.1`, hover fill): the dock seats' hover is not gated on `(hover: hover)` either, so "gate it the way the dock seats gate theirs" has no precedent to follow | same: after one tap the toggle is `:hover` at `/ 0.1`, the DockControl at `scale 1.1` |
| O-162 folded summary focus ring | r7g | `.dock-layer--summary` focus-visible paints the UA ring, `outline: auto 1px`, `border-radius: 0` (square) on a 40/44 px box inside a 28/30 px-radius plate | identical | same, square: `radius 0px`, `outline: auto 3px` (WebKit's UA ring) on the 44 px summary in the 30 px plate |
| O-177 Tab onto the folded face | r7g | Tab lands on the summary; the dock stays collapsed at +1.5 s (`@focusin.stop` on the summary, `GlassDock.vue:524`; Enter/Space expand it) | identical. Whether Tab should expand, or the disclosure contract (Enter) stands, is the orchestrator's ruling | same: Tab lands on the summary, collapsed at +1.5 s |
| O-176 `collapse="open"` never idles | r7h | open at +1, 3, 5.5, 8 s, and 8 s after a remount | identical | same: open at every reading, and after a remount |
| O-177 a press mid-expand is swallowed | r7i | fine: a click at 0 ms swallowed (0 activations); coarse: taps at 0 to 480 ms all swallowed (7 of 9), the seat under the point, not inert | identical | wider: fine AND coarse lose 7 of 9 presses (0 to 480 ms, all during `data-morphing`); 700 and 1200 ms activate once |
| O-167 (1) the dark fill is a warm brown | r7k | `--liquid-fill-tint` `oklch(0.42 0.06 75)` over the brown plate (`r7k-fine-dark1.png`) | identical | same tint, `oklch(0.42 0.06 75)` |
| O-167 (2) the thumb trails the fill | r7k fine | each frame of a drag the fill's end sits on the pointer and the thumb's centre trails it by 3.6 to 4.5 px, one input step | identical (4.50 max) | same, 4.47 px max over 24 frames |
| O-160 a `%` radius in the clip keyframes | static + r7a | n/a (the clip keyframes are new) | `gl-dock-clip-{inline,block}-*` carry `50%` on the cross axis in all 16 declarations (`run.css:838-896`); the run's computed clip at a cut edge is `14px 50%`, an ellipse of 14 x 27 px against the plate's 16 px circle. The cap keyframes are lengths. The brief's gate is "no cap or clip keyframe carries a percentage radius" | same declarations (static) |
| O-159 the dock README | static | `src/components/dock/README.md` names `size`, `layout`, `position`, `overflow`, `alwaysExpanded`, `startCollapsed`, `collapseDelay` (`2000`) and `search`, none of which is a `DockProps` member, and omits `collapse`; the idle window is `DOCK_COLLAPSE_DELAY_MS = 3600` | identical (unchanged since v10.1.4) | n/a (static) |

O-166 does not reproduce on the branch at rest (r7j, "What held"); O-166's frame is M1's
family when the composition collapses after a reach.

### M4: a layered overflowing run rests scrolled by its reserve (low-medium; branch only, Chromium only)

- **r7l** (`r7l-{fine,coarse}.json`; a DockLayerGroup whose active layer is wider than a
  260 px cap): on the branch the run mounts at `scrollLeft 8`, the first seat 2 px from the
  run's clip, and the leading corner `26px` (fine) or `27.85px` (coarse) where the rest is
  28/30. Setting `scrollLeft = 0` holds 0 with S1 10 px in and a `28px` corner, so it is the
  mount's snap, not the rest the reserve was built for.
- The run's one child (the layer group, `scroll-snap-align: start`, `offsetLeft 10`) snaps
  to its own start, which the leading reserve box (`::before`, 10 px with `-10px` margin)
  moved to 8 (`scroll-padding`).
- v10.1.4 rests at 0 (S1 flush at 0 px, the `50%` corners): different, not better, so this is
  an incomplete cure rather than a regression in kind. A keyboard-focused S1 at rest loses
  2 px of its 4 px ring here.
- **WebKit 2287 does not reproduce the mount snap** (`critic-7/branch/webkit/r7l-fine.json`): the run
  mounts at `sl 0`, S1 10 px in (11 at 1440), corners `28px`.
  v10.1.4 WebKit also rests at 0 (S1 flush, `50%` corners).
- **Cure direction:** the reserve and the snap agree on the run's start (the group's snap
  position equals the reserve's start, or the reserve is the scroll padding).

## Not defects, recorded

- **O-156 / O-165, the hover ellipse, is r1's family and the branch cures it (Chromium).**
  On v10.1.4, hovering the trailing seat of a two- or three-seat fit-content dock repaints
  the whole plate as one large ellipse (`r7d-daraksha3-1440-dark0-S3.png` against
  `…-rest.png`, `critic-7/v1014/chromium-headless-new/`): the hovered seat's scale arms a
  rest overflow, the cap animation runs, and its `50%` corner is an ellipse of the plate's
  box. 475 to 854 changed pixels inside the plate away from the seat, in every width. On the
  branch the same cells change nothing outside the hovered seat's own band (0 rows of 120),
  and nothing outside the plate on either arm. The layer is the plate itself
  (`.glass-dock .dock-plate`, `border-radius` from `gl-dock-cap-inline-*`), not a shadow or
  sheen. **WebKit 2287 agrees on the branch:** 0 of 60 rows change anything outside the hovered
  seat's band. The spec bands in CSS px and the WebKit project screenshots at device scale 2, so
  the spec's own WebKit `farInside`/`outside` fields are mis-banded (they read the seat's own
  hover disc as "outside"); `scripts/critic-7-r7d-reband.mjs` re-bands the banked PNGs at the
  screenshot's scale and reproduces the spec's Chromium numbers exactly (v10.1.4: 6 rows per
  theme, 475 to 854 and 107 to 145 px; branch: 0) before it reads WebKit.
  On v10.1.4 WebKit the same seats repaint the plate: 3 rows per theme, 129 to 258 px away from
  the seat (`daraksha-*-S2`, `daraksha3-430-S3`). RED on v10.1.4 and GREEN on the branch in
  both engines.
- **O-167 (3), the Slider settling on expand:** no visible jump. The thumb's one large step
  in the frame trace (226 to 234 px) is the frame the full pane goes inert and is laid out
  in the collapsed box, where it does not paint; the expanding frames move it by under
  1.6 px per frame.
- **A layered run cannot be scrolled to its end programmatically** (r7l, both arms):
  `scrollLeft = scrollWidth` snaps back to 0, because the run's only snap target is the
  DockLayerGroup's start (`scroll-snap-type: x mandatory`). A wheel scrolls it. Pre-existing.
- **The battery's standing bounds** are unchanged from critique-6: the 0.91 px K3 bound at
  320 coarse (Chromium), the RTL reach rows in `r5-runclip`, and the wide vertical tab's fill
  past the plate (9.86 px Chromium, 10.7 px WebKit, as v10.1.4).
- **WebKit `dock postures fine 320`** timed out on the harness's first load in the battery
  (`page.waitForFunction(__ready)`, 240 s, the first cell of a cold WebKit run). The re-run passed 1/1, and its banked row is byte-for-byte critique-6's.

## What held (refutation attempts that failed)

- **L1 on the tip.** r6a (the yield under resize) and r6f (the stale cap) in both engines:
  every row with `sw = cw` rests on four uniform `h/2` corners. r6g's mechanism no longer
  applies: under `data-run-fits` the plate has no animations.
- **g1 / r1 at rest, every posture.** The critic-4 battery on the tip (`dock postures` at
  320/390/430/844/1440, fine and coarse: rest, hover on each seat, focus, focus+hover,
  press; `r4 press and rtl`, `r4 cockpit`, `dock ring`, `dock tab ring kbd`): no new flag in
  either engine against critique-6.
- **The cut still fires on a true overflow and flush restores the rest:** `dock overflow`
  12/12 per pointer per engine; r7a and r7j coarse 390 (the Slider dock genuinely overflows
  at 534/384) cut and restore as the scroll position says.
- **r7c horizontal fit edge.** A cap swept 16 px under to 6 px over the dock's natural width
  in 1 px steps: `data-run-fits` agrees with `sw = cw` on every row, and every row is
  uniform (the reserve yields first, so the run never overflows in this band).
- **r7b layer switch.** An overflowing layer, then one that fits (`data-run-fits` set, no
  animations, uniform `h/2`), then the overflowing one again (the animations re-bind and the
  cap follows the scroll position).
- **r2 at every collapse that starts from scroll 0:** the battery's collapse frames (193
  Chromium, 97 WebKit) settle on uniform `28px`/`30px` circles; layer switches 217 and 109
  frames uniform.
- **O-166 at rest (r7j):** the Slider dock, expanded, at rest and with the trailing seat
  hovered, both themes, 844 and 1440, fine and coarse: uniform `h/2`, `sw = cw`. No square
  leading end on the branch.
- **Critique-3's four static suspicions, critique-2's WebKit keyboard-modality cells, and
  dock-edge room in an overflowing compact or cockpit dock:** `r4-s1`/`r4-s2`/`r4-s3`,
  `dock-tab-ring-kbd-*` and `r5b`/`r5c`/`r6c` on cockpit are byte-identical to critique-6's
  rows in both engines (one WebKit `r5b` fine row now rests at the run's end, `sl 451`, the
  engine's snap re-evaluation critique-6 recorded; its ring cut is 0).
- **r5, r6, r7, O-133, O-150:** `r4-slider`, `fields`, `r4-fields`, `r4-menu`, `r4-table`,
  `r4-segtabs` equal critique-6's rows in both engines (the `slider` cell differs only in a
  mid-drag spring sample).
- **g6 and g7:** see the table. `verify:package` terminal CLEAN at 10.1.5 (no export removed
  or renamed); fix 6 moved no token.

## Not measured

- Real Safari: safaridriver is not enabled. Every WebKit cell is Playwright WebKit 2287.
- O-166's expand/collapse smoothness beyond the frame trace: the morph is W-0.8's.
- **Whether a wheel reaches a layered overflowing run in WebKit.** r7l fine's `mouse.wheel(400,
  0)` leaves the run at `sl 0` on both arms in WebKit 2287 (Chromium scrolls it to 280). That
  could be the engine refusing to leave a lone `mandatory` snap target or Playwright's synthetic
  wheel on a nested horizontal scroller. It is pre-existing, I did not separate the two, and I
  do not report it as a defect. A real-Safari trackpad cell would settle it.
- O-161 and O-177's coarse rows are Playwright touch emulation (`hasTouch`, `isMobile`), not a
  device.
