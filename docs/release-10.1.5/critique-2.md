# 10.1.5 — critique, round 2 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `65fdbd228` (15 commits
over `v10.1.4`), read in full with `implement.md`, `critique-1.md`, `inbound-O-132.md`
(including its uncommitted OD-18 addendum), the witness scripts, and value.js's relay
`O-129-glass-relay-2026-11-04.md` and the owner's frames `od16`/`od17` (read-only).

Probes: `tests-visual/release-10-1-5/critic-2.{html,ts}` (scenes `dock`, `layers`,
`slider`, `fields`; real `src/` components under the demo cascade) and
`tests-visual/release-10-1-5-critic-2.spec.ts`. The spec reads layout and computed style
and banks every row to `docs/release-10.1.5/critic-2/<project>/*.json`. The v10.1.4 arm
runs the same spec against a `git archive v10.1.4 src demo` copy
(`critic-2-v1014.{html,ts}`, `CRITIC_ARM=v1014`, rows under `critic-2/v1014/`; recreate the copy with `git archive v10.1.4 src demo | tar -x -C tests-visual/release-10-1-5/v1014`), so the
branch's `src/` was never swapped. The copy is not committed. Chromium runs went through
`guarded`, and WebKit runs (Playwright WebKit 2287, `release-10-1-5-critic-2.config.ts`)
through `guarded --exclusive webkit`.

The ring read is the seat's transformed box (`getBoundingClientRect`, so the hover
`scale` is in it), grown by `(outline-width + outline-offset) × scale`, against the
padding box of every ancestor up to the dock root that clips on that axis. A positive
number is ink past that edge.

## Verdict

r2, r5, r6 and r7 hold in every posture I tried, in both engines. r1 holds for the
house's icon seats. Four defects remain, and I reproduced each one:

- **E1 and E2 (high).** These are one root. The run's reserve is sized from the 44 px icon
  cell (`--dock-seat`), but the dock's own `shape="tab"` seat is as wide as its label and
  takes the same 1.1 hover scale. A wide tab under the pointer still gives the run reach
  and cuts the plate's corners (E1, r1's law). A focused tab under the pointer still
  clips its ring on the leading and trailing edges: OD-17, the owner's "Home" pill (E2).
- **E3 (medium).** This is a regression. The handed-back reserve widens the run's scroll
  clip 6.6 px onto the persistent regions beside it.
- **E4 (medium).** g7 is RED on the committed tree. Fix round 1's marks rule enrols
  `slider/styles.css` into the `./styles.css` component entry, and
  `typed-track-seam.test.ts` reds.

g6 is GREEN in both engines: Chromium 97/97, and WebKit 2287 87 passed with 10 skipped
(page.pdf and the CDP swipe cells). Typecheck, build, verify:package and
demo:dist:build exit 0.

## Defects (reproduced)

### E1 — a wide seat's hover scale still counts as reach and fires the cut (r1 / O-123 OD-5, narrowed not closed) — high

`--dock-run-reserve` is `seat·(s − 1)/2 + ring·s`, where `seat` is `--dock-seat`, the
44 px icon cell. A tab seat (`<DockControl shape="tab">`, public API, `scale:
var(--scale-hover-dock)` on hover, `controls/tab-button.css:69-73`) is as wide as its
label, so its hover overhang is `w·(s − 1)/2`. That exceeds the 6.6 px reserve once
`w > 132 px`. When that seat is the trailing one, hovering it gives the run reach, the
timeline goes active, and the trailing corners cut on a run that hides nothing.

`dock-postures-*.json`, kinds `icon,tab:A much longer label`, pointer on the tab:

| cell | v10.1.4 | 10.1.5 |
|---|---|---|
| fine 390 | run 234/225, plate `50% \| calc(40.625% + 3px) \| … \| 50%` | run 240/238, `28 \| 27.5 \| 27.5 \| 28` |
| coarse 390 | 238/229, `50% \| calc(41.35% + 2.77px)` | 244/242, `30 \| 29.46 \| 29.46 \| 30` |
| fine 844 | — | 249/246, `28 \| 27.25 \| 27.25 \| 28` |
| fine 1440 / coarse 1440 | — | 264/260 / 268/264, `28 \| 27 …` / `30 \| 28.92 …` |

The same rows with the pointer off read `sw = cw` and four equal corners, so the cause
is the hover scale. The law the task states is "a seat's own engagement scale never
counts as reach." That law still fails for any seat wider than about 3 icon cells. The
patch did not regress this (v10.1.4 was worse), but r1's cure does not hold for the
dock's own tab shape.

WebKit 2287 reads the same values (`webkit/dock-postures-*.json`): fine 390 is 240/238 at
`27.5 | 28 | 28 | 27.5`, and coarse 844 is 253/250 at `29.19 | 30 | 30 | 29.19`. In about
half the WebKit hover rows the cut lands on the LEADING corners, not the trailing ones.
The run has scrolled. The v10.1.4 WebKit arm reads 234/225 and 238/229, the same as
Chromium.

Cure direction: the reserve is not one constant. Either a seat's engagement must not
grow its scrollable overflow (for example, the scale moves to a non-layout paint layer
the scroller does not count, or the seat's hover ink is clipped to its own cell), or the
reserve is derived from the largest seat. A per-seat inline reserve is the same law
W-0.8 §3.3 / OD-13 states ("the reserve equals the largest ring or ink any seat
paints").

### E2 — a focused, hovered tab seat clips its ring on its leading (and vertical: both cross) edges: OD-17 not closed — high

The same `--dock-seat` basis under-reserves the composed ink of any seat wider than 44 px.
A keyboard-focused tab seat under the pointer paints `w·(s − 1)/2 + ring·s` past its
layout box on the inline axis: 4.8 + 4.4 = 9.2 px for a 96 px "Home" tab, against 6.6.
The leading edge is clipped by the run's padding box (`overflow-x: auto`). This is the
owner's OD-17 frame (a "Home" pill clipped on its left). The trailing edge reads as
reach (E1) instead of a clip.

`dock-postures-*.json`, kinds `tab:Home,icon,icon,tab:Settings`, focus+hover on S1,
ink past the run's leading edge: fine 2.38 px (320, 390, 430), 2.48 (844), 2.70 (1440);
coarse 2.18 (320 to 430), 2.28 (844), 2.50 (1440). The block edges are clear (−1.1 fine,
−3.3 coarse), so the "top" half of OD-17 is cured. The `layers` scene's leading tab
(action layer, `dock-ring-*.json`) reads the same, 2.38 fine and 2.18 coarse. The
input layer's leading icon seat is clear (0.01). At v10.1.4 the same seat was clipped by
8.77 px inline and 1.31 px block (`v1014/…/dock-postures-fine-390.json`).

On a vertical dock (`dock-vertical-*.json`, kinds `tab:Home,icon,tab:Settings`), the
focus+hover "Home" tab is clipped on both cross-axis edges by 3.43/3.88 px fine and
3.23/3.09 px coarse. That is `overflow-x: hidden` on the run's inline axis. The icon
seats are clear.

In the keyboard-modality cells (`dock-tab-ring-kbd-*.json`: a key press, programmatic
focus, then the pointer), the TRAILING tab ("Settings", S4) is clipped by 3.13 px fine
at 390 and 3.62 px coarse at 1440 on its trailing edge, with `sw = cw`. An outline is
ink overflow and does not scroll, so the trailing ring is clipped, not reached. The
leading S1 reads 2.38 to 2.70 px as above. WebKit: the vertical cells reproduce
(3.62/3.59 px fine, 3.41/3.79 px coarse; v10.1.4 6.01/6.20). In the horizontal WebKit
posture cells, Tab never reached a button: WebKit's default Tab skips buttons, so
those rows have no focused seat. The keyboard-modality WebKit cells are
NOT RUN. `guarded --exclusive webkit` waited 42 minutes for the machine-wide lock
(`critic-2/webkit-kbd.guard.log` ends at "waiting for the 'webkit' lock"), and I stopped
the queued waiter (its PID) before it launched a browser. Re-run with
`zsh docs/release-10.1.5/scripts/critic-2-webkit-kbd.sh` from `tests-visual` under
`guarded --exclusive webkit`. The geometry is the same CSS in both engines (the WebKit
seat and run boxes match Chromium to the pixel in every posture row), so the horizontal
WebKit clip is expected but not witnessed. The inbound gate ("the ring is drawn whole on EVERY seat … with and without
hover") is RED. Cure: as E1. Both defects are the same root, the reserve's `--dock-seat`
basis.

### E3 — the reserve extends the run's scroll clip over its persistent siblings — medium (regression)

The reserve is padding handed back by a negative margin, so the run's border box (its
scroll clip) now reaches 6.6 px past its slot on both inline sides. Between the run and
a `#persistent-end` region there is no gap, so a scrolled run paints its seats 6.39 px
into the trailing persistent seat's box (6.59 coarse). On the leading side, the run's
box overlaps the `#persistent` seat by 0.39 px (0.59 coarse). The run is later in paint
and hit order, so it takes that seat's edge. `elementFromPoint` at the lead seat's right
edge − 0.5 px returns the run at rest, and seat S4 or S7/S8 of the run when scrolled.

`dock-overflow-*.json`, 12 seats in a 360 px dock with both persistent slots:

| | v10.1.4 | 10.1.5 |
|---|---|---|
| run box (fine) | 73 → 323 | 66.61 → 329.39 |
| tail seat | 323 → 363, overlap 0 | overlap 6.39 px |
| lead seat edge hit | `lead` | the run / a run seat |

At v10.1.4 the run clipped flush with the trailing region and 6 px clear of the leading
one. A seat that scrolls toward the trailing edge now slides 6.4 px under a transparent
persistent seat before it is clipped. Cure: the reserve must not widen the scroller's
clip past the run's own slot on an axis where a sibling sits. For example, the inline
reserve is taken inside the run (the seats' snap padding) rather than handed back
outward, or `.dock-layers` reserves the same gap.

### E4 — g7 RED: the D1 marks rule enrols `slider/styles.css` into the `./styles.css` component entry — medium

`npx vitest run --maxWorkers=2` on the committed tree, after `npm run build` and
`npm run demo:dist:build` (`critic-2/vitest.log`): 246/247 files.
`tests/styles/typed-track-seam.test.ts:169` reads `expected [ …(5) ] to have a length of 4`.
`scripts/gen-component-styles.mjs` enrols every stylesheet in the closure whose
uncommented text names `.track-well`, `.track-flow` or `.glass-value-marks`. Fix round
1's D1 cure added `& .glass-value-marks { inset-inline: … }` to
`src/components/slider/styles.css`, so `dist/component-styles.css` now leads with
`@import "./components/slider/styles.css";`. At v10.1.4 the entry held three partials
plus `glass-ui.css`.

So `"./styles.css"` (package.json:467) ships the whole slider stylesheet, which it did
not ship at 10.1.4. That is an export-surface change made as a side effect of a selector
mention, and the stylesheet reads tokens (`--slider-thumb-size-*`, `--slider-track-height-*`)
that the component entry does not carry. Fix round 1 did not catch this because its
vitest ran before its build. The test skips when `dist/component-styles.css` is older
than the generator, so the round-0 manifest was checked instead. Cure: put the marks'
lane inset where the closure already has it (`glass/value-marks.css`, keyed on the
scrubber), or make a deliberate ruling that the component entry carries the slider lane
and move the gate with it. The fix must not leave the enrolment to a selector mention.

## What held (refutation attempts that failed)

- **r1, icon seats.** Fine and coarse at 320, 390, 430, 844 and 1440, in both engines,
  with kinds `menu,sep,icon×3` and the icon seats of the tab kinds. At rest, on hover of
  each seat, on focus and on focus+hover, the plate's corners are four equal lengths of
  `h/2` (28 px fine, 30 px coarse), the run reads `sw = cw`, and every icon seat's ring
  is inside every clip. The only non-uniform rest row is coarse 320
  `tab:Home,icon,icon,tab:Settings` (313/309 Chromium, 318/309 WebKit). That run truly
  hides 4 to 9 px at 320, so the cut there is correct.
- **r1, a run that overflows.** Twelve seats in a 360 px dock, LTR and RTL, both engines:
  the rest reads `28 | 16 | 16 | 28`, mid-scroll is 16 on all four corners, flush end
  is `16 | 28 | 28 | 16`, and back at 0 the rest returns. RTL mirrors this on the
  physical corners (`dock-overflow-*.json`).
- **r1, vertical.** Icon seats rest at `w/2` (32 fine, 34 coarse) with no reach, and the
  icon rings are clear (`dock-vertical-*.json`).
- **r2 / OD-18.** Every frame of a collapse keeps one corner of half the block extent,
  from arm to settle. There is no settle jump in either engine (Chromium 193 frames,
  WebKit 97 per cell). Collapsed at rest is a circle (56/28 and 60/30). Every frame of a
  layer switch, actions → input → actions (`dock-layer-switch-*.json`: Chromium 218/217,
  WebKit 109 per pointer), is uniform with no reach.
- **OD-17, the rest of it.** The block edges of every seat are clear, the input layer's
  leading icon seat is clear (0.01 px), and the collapsed summary's ring (the pane's UA
  `auto` outline) has no clipping ancestor.
- **r5.** In both engines the thumb is visible, at opacity 1 and one size, at min, max,
  mid and on a step edge (step 3 on 0..10, value 9). That holds for sm, md and lg (8, 16
  and 24 px), on a vertical slider, with two thumbs at rest and after End, and when held
  at both ends of a mouse drag that overshoots the track by 60 px and after the release.
  The thumb is always inside the track. The held smear (`scale(1.02…, 0.94…)` on the
  range) carries the fill 7.6 to 11.4 px past the track end while held at max. That is
  the same at v10.1.4 (303.48 vs 303.6 in Chromium), so it predates this patch.
- **r6.** At coarse 390 the `.input-bar` field and `.input-pill` are 16 px (1.128 times
  the 14.19 px subtitle) with a 54 px bar. At coarse 1280 everything is 16 px. On a fine
  pointer the values are unchanged (14 px at 390, 16 at 1280).
- **r7.** Critique-1 covered item, checkbox, radio and sub-trigger in both engines. I
  added the consumer check: keyframes `MbabbMenu.vue` passes `gap-2.5`, which wins in
  `@layer utilities`. No consumer passes `mr-*`/`me-*` on a menu icon, so the new gap
  doubles no consumer spacing.
- **g6 / g7.** Chromium release-10-1-5, -10-1-4 and -10-1-3 gave 97/97
  (`g6-chromium.log`). WebKit 2287 gave 87 passed and 10 skipped (`g6-webkit.log`).
  `typecheck`, `build`, `verify:package` (terminal CLEAN, version 10.1.5) and
  `demo:dist:build` all exit 0. vitest: see E4.

## Open (not defects of this patch, or not reproduced)

- **OD-16 painted ellipse: morph-borne, W-0.8.** `dock-collapse-*.json` samples every
  frame of a collapse (`__dock.collapse()`) at 390, fine and coarse, menu+seats and
  tab-led. The plate's computed corner is one length, half its block extent, on every
  frame from arm to settle: 28 px fine, 30 px coarse, so there is no settle jump. That is
  the OD-18 gate ("settle radius jump ≤ 0.5 px"), and it is GREEN. The plate's LAYOUT box,
  however, is held at the reserved expanded width (278x56) while the root paints
  `scale: 0.2014 1`. For the last ~300 ms of `[data-morphing]` the painted box is 56x56,
  and its corner paints `28·0.2014 = 5.6 px` by 28 px: the squared frame in the owner's
  `od16`. No dock element paints a box larger than the plate (no `ghosts` row in any
  frame), so the "darker square" cannot be told apart from the plate's own scaled
  box-shadow and backdrop by layout. This is the morph's non-uniform `scale` (O-129 r4,
  `shape.css:105`), so it goes to W-0.8 per `inbound-O-132.md`. Real Safari: UNMEASURED
  (safaridriver not enabled).
- `<Input>` and `<Textarea>` (`.field-control`) paint 14 px at coarse 390 (`fields-coarse.json`),
  under iOS's 16 px no-zoom line. This is unchanged from 10.1.4 and recorded by
  `implement.md`. The `.input-bar` and `.input-pill` recipes are 16 px (ratio 1.128 to the
  subtitle) at coarse 390 and 16 px at coarse 1280. On a fine pointer they are 14 px at
  390 and 16 px at 1280, unchanged.
- The `ResizeObserver loop completed with undelivered notifications` vite warning appears
  in these runs. It is also present in the 10.1.4 critique records, so it is not new.
- A dock that a flex host stretches on its cross axis (an `align-items: stretch` parent)
  rests at `--dock-plate-cross-px / 2` of the stretched height (208 px, giving 104 px on
  a 203 px-wide plate). The clamp scales it to the same stadium `9999px` gave, so it is
  not a defect. The cut-cap on such a plate scales all four corners by one factor (the
  run.css docblock names this).
