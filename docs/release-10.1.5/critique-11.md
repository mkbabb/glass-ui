# 10.1.5 — critique, round 11 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `1e0f9d879` (fix round 10:
`402c3eed9` Q2, `bf1ea2941` and `22224a67a` Q1, `0e45093b6` Q3, the witnesses `824681c62`, the
rebind `c4661b42f`, the records). I read every commit over `v10.1.4`, `critique-10.md`, `fix-10.md`,
every `inbound-*.md` (O-201, O-205 with its second trigger, and O-207 included) and every
orchestrator note, and fix 10's `src` diff against `932823b85`.

**This round stopped on a guard refusal.** At 22:28 `guarded` REFUSED my next browser run (the D-1
A/B in Chromium): "kernel zone data.kalloc.1024 at 8.19M (panics near 20.8M; heavy and browser runs
stop at 8M): reboot the Mac". By the brief, a refusal is a stop. What ran is below. **Nothing ran in
Playwright WebKit 2287** (my WebKit chain had queued behind other sessions' `--exclusive webkit`
runs; I stopped that waiter by its PID at 22:10 to run the Chromium follow-ups first, and the refusal
came before I could queue it again), **and g7 did not run.** Every cell below is Chromium
(`chromium-headless-new`) only. The machine needs a reboot before the next round.

**Resumed 2026-11-10 after the reboot** (zone count about 3k, every run admitted): the WebKit 2287
chain, g7 and the D-1 attribution ran. See *Resume: WebKit, g7, D-1* at the end. Every defect
below (R1 to R4) now reproduces in both engines; R5 is attributed to load, not the patch; one
WebKit intermittent in g6 (R6) is new.

## What ran (all through `guarded`, Chromium, one run at a time; `critic-11/runs.txt`)

| run | result |
|---|---|
| `release-10-1-5.spec.ts` on the tip | 98/98 |
| g6 `release-10-1-4` / `release-10-1-3` | 23/23 / 60/60 (D-1 green on the single pass) |
| D-1 cell, `--repeat-each=8` (`d1-ch.log`) | **3 failed, 5 passed** (load 43) |
| critique 10's own cells on the tip (`critic-11-r10*.spec.ts`, copies of `critic-10{,b,c}` banking to `critic-11/r10/`) | c10 6/6, c9 cells 12/12, c1 sweep 7/7 |
| round 11's cells, branch and v10.1.4 arms (`release-10-1-5-critic-11.spec.ts`) | 8/8 and 8/8; follow-ups c11c/c11h/c11i 3/3 and 3/3 |
| D-1 A/B against v10.1.4's src | **REFUSED** |
| WebKit 2287: everything; g7 | **not run** |

Round 11's cells (harness `tests-visual/release-10-1-5/critic-11{,-v1014}.{html,ts}`; the v1014 arm
imports `release-10-1-5/v1014/`, which I verified file by file against `git ls-tree v10.1.4 src`;
rows in `critic-11/probe/<arm>/chromium-headless-new/`):
- **c11a** O-205: daraksha's dock (fit-content, `collapse="closed"`, a persistent khatam, a
  `DockLayerGroup :show-switcher="false"` of a four-seat face and a wider six-tab face, or a plain
  run), collapsed, at 360/390/430/820/1440, light and dark.
- **c11b** O-205's second trigger: the same dock open on the narrow face; then a crossfade each way,
  every frame for 900 ms. **c11i**: a wheel over that open dock.
- **c11c** O-201: value's Home ⌃ select trigger (DockTrigger `for="select"`, icon, SelectValue,
  chevron) in a layer face at the run's start and end, with two controls and a DarkModeToggle: Tab
  focus, focus+hover, open, after Escape; 390 and 1440, fine and coarse, light and dark. Then the
  end seat at the fit edge: the cap swept in 1 px steps, the first and last seat each Tab-focused.
  The ring box is the border box plus `outline-width + outline-offset`, cut against every clipping
  ancestor's padding box.
- **c11d** O-207 G3: value's palette-card trigger (CollapsibleTrigger `as-child` over a Button, so
  `button focus-ring disclosure-trigger`), a plain CollapsibleTrigger with `focus-ring`, a
  `.focus-ring` div, a Button, an AccordionTrigger, a Checkbox, a Switch, an Input, SegmentedTabs;
  Tab-focused; contrast = the largest luminance ratio between the focused and blurred screenshots in
  an 8 px band outside the element's box.
- **c11e** O-207 G1: a default scrubber Slider on three saturated cards, light and dark, with and
  without value's own `--slider-range-bg: var(--foreground)`.
- **c11f** O-207 G10: fourier's AppDock shape (popover logo, separator, dropdown trigger with icon,
  label and chevron, two controls, DarkModeToggle) in a centred header; the dock's box every frame
  from mount, 390 and 1440, fine and coarse, three repeats.
- **c11g** fix 10's Q2 arm on an undeclared wrapper around a current anchor.
- **c11h** fix 10's Q1 key: a host that moves its padding (not its size) across the fit edge
  mid-expand.

## Verdict

Not ready to tag, and not fully measured. In Chromium, fix 10's Q1 (on the dock's own max size and
the stage's size), Q2 and Q3 cures hold, and the release spec, g6 and critique 10's cells are GREEN.
Four inbound items are open on the branch: **O-205** (both triggers, at the root), **O-201** (the fit
edge), **O-207 G3**, and a **Q1 gap** that fix 10's own key leaves. O-207 G1 and G10 are refuted as
glass defects. The D-1 cell failed 3 of 8 repeats, unattributed because the A/B was refused.

## Defects (reproduced, Chromium)

### R1: O-205 is open at its root: a hidden face or a collapsed pane still scrolls the run (medium)

The O-205 law is that the run's scrollable overflow is exactly the active face's content. On the
branch, the cap's corners hold (fix 7's M1 takes the animations off under `.collapsed` and on
`data-run-fits`), but the run still scrolls content nobody can see.

- **Open dock, second trigger (c11b, c11i).** On the narrow face (241 px in a 253 px port at 390,
  `data-run-fits` set, four corners 30 px), the run reads `sw 757 / cw 265` at 360-430, `784/258` at
  820 and `832/263` at 1440, light and dark: the inactive six-tab face is `position: absolute;
  inset: 0` (`crossfade.css:30-37`) and its `max-content` row counts toward the run's scrollable
  overflow. **In use:** one wheel over the run (c11i) scrolls it 165 px at 390 and 173 px at 1440
  with the flag still set. The first seat leaves the plate and the rest of the plate is empty
  (`probe/branch/chromium-headless-new/c11i-390-after-wheel.png`: three glyphs and a blank right
  half on a round pill).
- **Collapsed (c11a).** Every collapsed cell holds four equal corners of half the cross extent
  (30 px on the 110x60 coarse pill, 28 px on 102x56), but the hidden full run scrolls 194 px (plain
  run) and 623-704 px (layer group) at every width. O-205's second gate ("no collapsed dock has a
  scrolling `.dock-run`") fails on every cell.
- **v10.1.4** (c11a v1014 arm): the collapsed plate computes `50% calc(0% + 16px) calc(0% + 16px)
  50%` at every width, so O-205's first gate is RED there and GREEN on the branch. Its open layered
  dock is a 136 px port that its active face overflows (M4's geometry), so the second trigger does
  not arise on v10.1.4 in this shape; on the branch it does once the run fits.
- **Mid-crossfade:** going from the wide face to the narrow one, one frame (the swap frame) still
  paints the trailing cut, then the flag flips. The leaving face keeps `overflow: visible`,
  `clip-path: none`, `contain: none` throughout, so its paint is not clipped. Neither is a defect.
- **Cure direction** (the brief's law): a face that is not the active one contributes no scrollable
  overflow, and neither does the full pane while collapsed. The brief asks the fix seat to measure
  which root holds without clipping a leaving face's crossfade paint.

### R2: O-201 is open at the fit edge: the yield cuts the first and last seats' rings by up to 4 px (medium; owner-visible)

O-201 reverses fix 8's N3 acceptance ("a bound of up to 3 px is a clip"). The branch is unchanged
there.

- **c11c, value's Home trigger.** At the dock's natural width, the Home ring is whole in every
  posture on the branch (focus, focus+hover, after Escape; start and end; 390 and 1440; fine and
  coarse; light and dark). **v10.1.4 cuts it 3.8-4.11 px in every one of those cells**, so the
  owner's frame reproduces on v10.1.4 and that cell is cured.
- **The fit edge, on the branch.** Sweeping the cap in 1 px steps, for the 8 px above the fit edge
  (`edge` 253 fine and 265 coarse at 390, 260 and 272 at 1440), the run fits and yields its reserve,
  and both the first seat's and the last seat's Tab-focus rings are cut by **3.89, 3.39, 2.89 …
  0.39 px** (390) and **4.0-4.11 down to 0.05 px** (1440) at the run's padding box. Fine and coarse
  read the same. Paint: `c11c-edge-1440-f-cap260-end.png` shows the Home ring cut flat at the run's
  right edge.
- **Cure direction** (the O-201 ruling): the run's clip keeps the ring's full extent at every cap,
  or the run reports that it does not fit once the room falls under the ring's reach (then the cap's
  cut says so). A per-seat inset is not a cure.

### R3: O-207 G3: a disclosure trigger's keyboard ring is the 30% box-shadow, about 2:1, and `.focus-ring`'s outline loses to it (medium; accessibility; pre-existing)

- **c11d.** `.disclosure-trigger:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow) }`
  (`_shared/disclosure/disclosure.css:45-48`) wins over `.focus-ring:focus-visible`
  (`utilities/base.css:144`), so value's composition (`button tap-squish focus-ring
  disclosure-trigger palette-card`) computes `outline: none 3px` and a ring at 30% alpha. Its measured
  contrast is **2.03 (light) and 2.11 (dark)**; the plain CollapsibleTrigger reads 2.17/2.07 and the
  AccordionTrigger 2.15/2.09. WCAG 2.4.11/1.4.11 want 3:1. The `.focus-ring` div and the Button,
  which paint the outline, read 3.12-3.14 in light and 4.2 in dark.
- On value's page the ring was a 0 px transparent shadow (its Button's own shadow list wins there),
  but the root is the same: the disclosure rule takes the outline off.
- **v10.1.4 reads the same** (2.03/1.98, 2.17/2.16, 2.15/2.15), so this is not a regression, but
  O-207 places it in this patch.
- **Not measured here:** the Checkbox and the Switch draw their ring on the inner face
  (`control-bit.css:320`), inside the 44 px host, which this probe's band excludes. That reads 1.0 for
  the Checkbox only because of how the probe measures, so it is not reported.

### R4: fix 10's Q1 key misses a host that moves the parent's padding: S1 steps 6.5-7 px at the settle (low-medium; regression against v10.1.4)

`constraintOf` (`dockMorphMeasure.ts:155`) is documented as "the parent's content box", but it reads
`parent.clientWidth`/`clientHeight`, the padding box. A host that changes its padding moves the
dock's room and nothing that `constraintOf` reads.

- **c11h, vertical six-seat dock** (critique 10's c10b shape, fit edge Ev = 314): stage at Ev, its
  `padding-block` moved 16 → 16.5 or 17 px (1 or 2 px less room) at 110 or 300 ms of the expand:
  **S1 steps 7.02 px** at the settle and the plate 1-2 px. The other direction (stage 313 or 312,
  padding 16 → 15): **6.48 and 6.98 px**. The control cells, the same 2 px change made through the
  stage's block size, step 0.02 px: fix 10's cure, holding where it was aimed.
- **v10.1.4**, at the same Ev and the same changes: 0.02 px in every cell.
- It is critique 10's Q1, reached through a door the new key leaves open. **Cure direction:** read
  the constraint the way the endpoint uses it (the parent's content box, `clientWidth` less its
  padding, or `getComputedStyle` on the parent), or read the yield from the rest port on every morph
  frame so a crossing lands mid-morph whatever moved it. Witness: c11h, RED on the tip, GREEN after,
  with `p1`, `p2`, `n1` and D-1 still GREEN.

### R5: the D-1 cell fails 3 of 8 repeats in Chromium (low; unattributed)

- `d1-ch.log`: the 10.1.3 bottom-anchored ancestor-zoom D-1 cell, `--repeat-each=8`, at a load of
  35-43: repeats 1, 2 and 4 fail "the leaving summary's largest visible frame step" at **2.09, 2.10
  and 2.21 px** against `< 2`; the other five pass. The single pass in g6 was green.
- Fix 10 saw the WebKit chain fail the same cell 11 of 16 times at 2.00-2.03 px and recorded it as
  unattributed. The A/B against v10.1.4's src that would attribute this run was the run `guarded`
  refused (`scripts/d1-ab-critic-11.sh`, ready to run). Until it runs, it is not known whether
  v10.1.4 fails the same way under load.

## Refuted, or not a glass defect

- **O-207 G1 (the near-black fill).** c11e: the library's default fill is `oklab(0.88 0.026 0.097 /
  0.88)` in light (the warm capsule) and `oklab(0.925 … / 0.19)` in dark (fix 8's calm ink), on all
  three saturated cards. The near-black `oklab(0.216 … / 0.88)` comes only when the page sets
  `--slider-range-bg: var(--foreground)`, which value.js does on purpose at
  `demo/styles/utils.css:246` (its V2C/V3C ink ruling, for 3:1 on its tracks). It is value's own
  token, and glass's default is not near-black. If value wants a calmer ink on coloured cards, that
  is its token to change.
- **O-207 G10 (the 390 first-frame jump).** c11f: glass's own dock in fourier's shape takes **no step
  at all** from its first painted frame (one box, `10,370x56` at 390 and `514,412x56` at 1440, every
  repeat, both pointers, both arms). Fourier's 348 → 303 px step comes from fourier: `AppDock.vue:95`
  starts `showNavLabel` true and `fitNavLabel()` hides the label after mount (and on
  `document.fonts` `loadingdone`), which narrows the dock by the label's width about 50 ms later.
  It is not an O-110 recurrence in glass.
- **O-205 gate 1 (collapsed corners)** is GREEN on the branch and RED on v10.1.4 (R1).
- **O-201's Home-trigger cell** at natural width is GREEN on the branch and RED on v10.1.4 (R2).

## What held (Chromium)

- **Q2** (c10c/c10d on the tip): the nested group holding the current seat sizes by its content
  (355 px at 1440, 173 px at 390 coarse), no seat overlaps another, every centre hits its seat,
  `sw == cw` with the flag set.
- **Q1 on the dock's own max size** (c10b on the tip): every 1-2 px change across the fit edge,
  both directions, both clamp times, fine and coarse: S1 steps 0 px horizontally and 0.02 px
  vertically. The narrowing ramp steps 0.
- **Q3** (c1 sweep): `.input-bar` and the Input are 16 px at 390 coarse (ratio to the subtitle
  1.128), 14 px at 390 fine.
- **P1/P2** (c9e): rest step 0 in every cell. **N1** (c9a) holds. **P4** is WebKit-only and was not
  measured; c9f in Chromium rests at 260 with the flag the layout's truth in all 32 first expands.
- **The posture sweep, Slider and menu** (c1 cells): as critique 10 read them. The pill rests at half
  its cross extent with `sw == cw` in every posture and width, no radius carries `%`, no focused ring
  is cut at natural width; the Slider thumb is 8/16/24 px at min, mid and max on every rung, disabled
  dims thumb and fill to 0.5, vertical, RTL and a drag to each end hold; menu items, checkbox, radio
  and submenu triggers keep the 4 px `--icon-label-gap`.
- **c10a (O-193)**: GREEN at 1440 for both shapes and both plates, and at 390 for the icon shape and
  the control plate. The 390 tab cell overflows (444 px of tabs), and its cut is the design.
- **The release spec** 98/98 and **g6** 23/23 and 60/60.

## Recorded, not defects

- **c11g: fix 10's Q2 arm narrows the open seat to declared seats.** An undeclared wrapper around a
  current anchor (`<span><a aria-current="page">`) was the 136 px open seat on v10.1.4; on the
  branch it is its content (91 px at 390, 98 px at 1440). Critique 10 asked for this, and it matches
  `openIndexOf`, and the comment above the arm (`run.css:516-521`) now says the wrapper must be a
  declared seat. A consumer whose undeclared wrapper relied on the v10.1.4 width will see its open
  seat shrink to its content, so the close seat's CHANGELOG should say that only declared seats open.
- **The CHANGELOG** still carries O-ids and record paths, and it describes only the first round.
  This is critique 10's note, left to the close seat.

## Not measured

- **Everything in Playwright WebKit 2287**: the release spec, g6, critique 10's cells, round 11's
  cells (R1 to R4 and the refutations), P4, the D-1 cell. Each defect above is a Chromium reading.
- **g7** (typecheck, build, demo:dist:build, vitest, verify:package).
- The D-1 A/B (R5's attribution).
- Real Safari (safaridriver not enabled).
- The next round needs the machine rebooted (kernel zone 8.19M), then
  `zsh docs/release-10.1.5/scripts/chain-critic-11.sh wk c11 c11-v1014 branch g6-4 g6-3 r10 r10b r10c d1`
  under `guarded --exclusive webkit`, the D-1 A/B in both engines, and g7
  (`scripts/gates-critic-10.sh` shape).

## Resume: WebKit, g7, D-1 (2026-11-10, post-reboot)

Same tip (`1e0f9d879` src; HEAD `01a093adc` adds only records). Driver
`scripts/resume-critic-11.sh` (each step its own `guarded` call, WebKit under `--exclusive webkit`),
then `scripts/wk-focus-critic-11.sh` and `scripts/f4-ab-critic-11.sh`. Rows in
`critic-11/probe/<arm>/webkit/`, `critic-11/r10/*/webkit/`, logs `critic-11/*-wk.log`, summary
`python3 -I scripts/critic-11-summary.py`. No run was refused.

| run (WebKit 2287 unless noted) | result |
|---|---|
| `release-10-1-5.spec.ts` | 98/98 |
| g6 `release-10-1-4` | **2 failed** (F-4 inline and grid hosts, `swaps` 2 vs `<= 1`), 13 passed, 8 skipped (page.pdf) |
| g6 `release-10-1-3` | 58/58, 2 skipped |
| critique 10's cells (r10, r10b, r10c) | 6/6, 12/12, 7/7 |
| round 11's cells, branch and v10.1.4 arms | 9/9 and 9/9 |
| c11c/c11d again with Option+Tab, both arms (`c11w*-wk.log`) | 2/2 and 2/2 |
| D-1 cell `--repeat-each=8` (in the chain, load 37) | 4 failed (2.0, 2.34, 3.32, 3.63 px) |
| D-1 A/B, Chromium (`d1ab/d1ab.txt`, load 29-40) | branch 0/8 pass, **v10.1.4 0/8 pass**, branch 7/8 |
| D-1 A/B, WebKit (load 15-18) | branch 8/8, v10.1.4 8/8, branch 8/8 |
| F-4 A/B, WebKit, `--repeat-each=8` (`f4ab/f4ab.txt`) | branch 39/40, v10.1.4 40/40, branch 40/40 |
| g7 (`critic-11/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skip), verify:package: all exit 0 |

**A harness note.** The first WebKit pass of c11c and c11d pressed Tab, which WebKit gives only to
text fields and links (the macOS "tab to all controls" default), so no button took focus and the
rows read `found: false`. I changed the spec's `tabTo` and c11d's loop to press Option+Tab in WebKit
(as `release-10-1-2.spec.ts` does) and re-ran those two cells. Chromium's rows are untouched. In
WebKit, c11d's blur-then-Shift+Tab re-focus step returns to the first atom every time, so only the
first atom (value's palette-card trigger) is read there; the other atoms are Chromium readings.

### Both engines, defect by defect

- **R1 (O-205 at its root) reproduces in WebKit.** c11a: every collapsed cell has four equal
  corners of half the cross extent (30/28 px), and the hidden full run still scrolls 178-194 px
  (plain run) and 618-697 px (layer group). c11b: the open dock on its narrow face reads
  `sw 752 / cw 267`, `778/260`, `825/265` with `data-run-fits` set. c11i: one wheel scrolls the
  fitting run **167 px at 390 and 175 px at 1440**, flag still set (Chromium 165/173). v10.1.4:
  collapsed corners `50% calc(0% + 16px) calc(0% + 16px) 50%` (gate 1 RED there), and its open dock
  overflows its 136-148 px port, so the wheel case does not arise.
- **R2 (O-201 at the fit edge) reproduces in WebKit.** Natural width: the Home ring is whole in all
  16 cells on the branch; v10.1.4 cuts it **3.63-4.23 px** in all 16 (cured there, both engines).
  Fit edge (255/267 at 390, 262/274 at 1440): the first and last seats' rings are cut **3.81 down to
  0.31 px** (390) and **4.0-4.23 down to 0.11 px** (1440), fine and coarse alike, for the 8 px above
  the edge.
- **R3 (O-207 G3) reproduces in WebKit** for value's composition (`button focus-ring
  disclosure-trigger`): ring contrast **2.08 (light), 2.12 (dark)**; v10.1.4 2.08/2.02. Pre-existing.
- **R4 (the Q1 padding door) reproduces in WebKit, to the hundredth.** c11h: S1 steps **7.02 px**
  (padding 16 → 16.5/17, stage 314) and **6.48/6.98 px** (padding 16 → 15, stage 313/312); the
  same changes through the stage's size step 0.02 px; v10.1.4 0.02 px in every cell.
- **R5 (D-1) is attributed: load, not the patch.** Under load 29-40 in Chromium, v10.1.4's own src
  fails 8 of 8 (3.28-3.78 px) and the branch 8 of 8 (2.96-4.32 px), then 1 of 8 as load fell to 29.
  In WebKit at load 15-18, branch and v10.1.4 pass 8 of 8 each. The cell's `< 2 px` bound is a
  frame-timing reading that both trees miss alike once the machine is loaded. Withdrawn as a patch
  defect; it stays a gate that cannot be read on a loaded machine.

### R6: g6's 10.1.4 F-4 DataTable settle cell is intermittent in WebKit on the branch (low; unattributed)

- The chain's g6 pass (load 39) failed the inline and grid hosts (`swaps` 2 against `<= 1`). The
  A/B at load 17-49: branch 1 of 40 (fit host, 2 swaps), v10.1.4 0 of 40, branch 0 of 40. On the
  branch that is 3 failures in 84 runs, against 0 in 40 on v10.1.4; that does not separate the
  trees. The branch's only table change is `e06783047` (row and header rules take `border-border`;
  the width does not move), so no cause in the patch is known. Critique 10's WebKit g6 was 23/23.
- g6 is a release gate, so the close seat should re-read it at low load (`scripts/f4-ab-critic-11.sh
  webkit 16`) before tagging.

### What held in WebKit

- The release spec 98/98; g6 10.1.3 58/58.
- critique 10's cells read the same as Chromium in WebKit: every boolean in c10a-c10d and the c9
  cells matches, c10b's S1 steps 0-0.02 px (Q1 on the dock's own max size holds), c9e's rest step is
  0 in every cell, and the c1 sweep (postures, overflow, Slider, menu gap, type floor) has no reading
  more than 1.5 px from Chromium's. The one WebKit-only reading is c9e `h-to-220` at 110 ms
  (`sl 176`), which is critique 9's P3 re-scroll, pre-existing at v10.1.4.
- c11e (G1) and c11f (G10) refute the same way in WebKit (default fill warm capsule and calm ink;
  the near-black only under value's own `--slider-range-bg`; the dock box takes no first-frame step).
- c11g: the undeclared wrapper is its content (92.8/99.8 px; v10.1.4 136).
- g7 GREEN on the committed tip.

### Union verdict

Not ready to tag. Open on the branch, in both engines: **R1** (O-205 at its root), **R2** (O-201
at the fit edge), **R3** (O-207 G3, pre-existing), **R4** (fix 10's Q1 key misses the parent's
padding; a regression against v10.1.4). **R6** wants a low-load re-read. R5 is withdrawn.
