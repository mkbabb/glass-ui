# 10.1.5 — critique, round 12 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `192c549cf` (fix round 11:
`c274cc698` R1, `5b21f490b` R2 + R4, `7493bee11` R3, `208fcf83c` R2 scoped to the horizontal run,
`ef73bc1b7` witnesses, `0593b98b9` the vitest wait, `e9acd7a00` the rebind, and the records). I read
every commit over `v10.1.4`, `critique-11.md`, `fix-11.md`, every `inbound-*.md` and orchestrator
note, and fix 11's `src` diff against `1e0f9d879`.

Every browser run went through `guarded` (WebKit 2287 under `--exclusive webkit`), one run at a time;
`critic-12/runs.txt` and `critic-12/queue.txt` list them. Drivers: `scripts/chain-critic-12.sh`,
`scripts/queue-critic-12.sh`, `scripts/gates-critic-12.sh`; summary
`python3 -I scripts/critic-12-summary.py <arm> <project>`. Rows bank to
`critic-12/probe/<arm>/<project>/` (round 12's cells) and `critic-12/r11/<arm>/<project>/`
(critique 11's cells re-run on this tip from `release-10-1-5-critic-12-r11.spec.ts`, a copy that
banks here).

Round 12's cells (`tests-visual/release-10-1-5-critic-12.spec.ts`; harnesses `critic-10`,
`critic-11` and the new `critic-12{,-v1014}`, whose v1014 arm imports `release-10-1-5/v1014/`):
- **c12a** O-201, vertical: critique 10's six-seat vertical dock, `collapse=false`, its stage swept
  360 → 296 px in 2 px steps; at each, the first seat Tab-focused and the last reached by End; the
  ring box (border box plus outline reach) cut against every clipping ancestor. 1440 fine and 390
  coarse, light and dark.
- **c12b** O-201 and r1, horizontal: value's Home ⌃ trigger at the run's end (critique 11's `o201`
  scene), the cap swept from natural width to 40 px under it; at each cap the rest plate, the
  plate with the pointer resting on the Home trigger (fine), the Home trigger Tab-focused, the
  first seat Tab-focused, and End from the first seat. 390 coarse, 1440 fine, 390 fine; LTR and RTL.
- **c12c** r1 on a run that truly overflows (seven seats under a 260 px cap): rest, scrolled to the
  end, flushed back, scrolled to the middle, collapsed while scrolled, re-expanded. 390 coarse and
  1440 fine, LTR and RTL.
- **c12d** r2 and mid-collapse: every frame of an expand and a collapse of daraksha's dock (plain
  run and layer group), the plate's four corners.
- **c12e** O-207 G3 and K4 on the atoms critique 11 did not walk: the default Slider (its ring is on
  the track), the spectrum Slider (on the thumb), a SortableList handle, and an open detented
  Sheet's "Sheet position" handle (on its grip). Contrast is the largest luminance ratio between the
  focused and blurred screenshots in an 8 px band outside the ring-bearing box (`best`), and over
  the whole clip with that box included (`all`).

## Verdict

Not ready to tag. Fix 11's R1 (O-205 at its root), R3 (the disclosure ring) and R4 (the padding
door) hold in both engines, with no regression in the release spec, g6 or g7. O-201 is still open,
in two places the round-11 witnesses do not read: **S1**, a keyboard-focused seat in a layer group
(value's own dock shape) is never brought into view once the run stops fitting, so its ring is cut
from 3.6-4.2 px at the first cap under the new fit edge, with every seat showing, up to 36-37 px
lower down (pre-existing on v10.1.4 at every width, both engines); **S2**, the vertical yield band
(fix 11 records this as open) cuts the end seats' rings by 1-4 px with `data-run-fits` set. **S3**,
O-207 G3 is cured only for disclosure triggers: the Slider (default and spectrum) and the
SortableList handle still paint the 30% ring at 2.0-2.2:1 in both engines (pre-existing). K4 is
refuted: the Sheet's handle draws its ring on the grip, at 4.4:1 in light and 7.2:1 in dark.

## Defects (reproduced)

### S1: O-201, a focused seat in a layer group is never reached: Tab leaves the run at 0 and the ring cut, 3.6 px with nothing hidden, up to 37 px (medium-high; owner-visible; pre-existing)

- **c12b**, value's Home ⌃ trigger at the end of a DockLayerGroup face, Tab-focused at each cap
  (light; LTR and RTL):

  | | first cap under the fit edge (every seat shows) | 40 px under natural | the run's scroll after Tab |
  |---|---|---|---|
  | branch, Chromium | ring cut **3.8** (390) / **4.11** (1440) px | **36.8 / 36.11** px | 0 |
  | branch, WebKit 2287 | **3.63 / 4.23** px | **36.63 / 36.23** px | 0 |
  | v10.1.4, Chromium | 3.8 / 4.11 px at natural width | 43.8 / 43.11 px | 0 |
  | v10.1.4, WebKit | 3.63 / 4.23 px at natural width | 43.63 / 43.23 px | 0 |

  The cap rises 1 px at a time, and the cut rises 1 px with it, because the run never scrolls
  (`scrollLeft` reads 0 every time, against a scroll range of 7 to 40 px). On every fitting cap the
  branch's rings are whole, which is the cure critique 11 asked for. Below the fit edge, the Home
  trigger is first cut and then pushed out of view while it holds keyboard focus. Paint:
  `critic-12/probe/branch/chromium-headless-new/c12b-390-f-ltr-cap260-endfocus.png` (every seat
  shows; the Home ring is cut flat at the right).
- **End does not move focus either.** From the first seat, End leaves focus on the first seat in
  every cell (`endKey.at` reads `S1`), in both arms and both engines.
- **Cause, by the code** (`useDockRun.ts`). `reach()` takes the run's direct child that holds the
  focus target (`seatsOf(run)` reads `run.children`). In a layer group that child is the
  `.dock-layer-group` frame, not the seat. The frame is wider than the port, so it reads as
  occluded, and `anchorFor` lands at the frame's start, which is scroll 0. `onKeydown` reads
  `declaredSeatsOf(run)`, which has no declared seat in a layer group, so Arrow, Home and End
  return before acting. On a plain run (critique 5's k1, the release spec's `k1`) the end seat is
  reached flush, ring whole.
- **Why the witnesses miss it.** `s2` reads rings "on every fitting cap", and `k1` reads a plain
  run. Fix 11's ring-room law moved the fit edge up by `2 x --dock-ring-reserve`, so the first cap
  where this cut appears now has every seat showing. That is the owner's O-201 frame on value's
  geometry, a few pixels narrower.
- **Cure direction.** The O-201 gate is "a run that has scrolled to each end … the outline wholly
  inside every clipping ancestor". The reach and the roving machine take the seat inside the face
  (the declared seat that holds the target), not the run's direct child. Witness: c12b, RED on the
  tip and on v10.1.4, GREEN after; `k1`, `e3` and `m4` still GREEN.

### S2: O-201, vertical: the yield cuts the first and last seats' rings by 1-4 px with `data-run-fits` set (medium; owner ruling; recorded open by fix 11)

- **c12a**, critique 10's six-seat vertical dock, `collapse=false`, stage swept 360 → 296 px.
  Chromium: in the 8 px above the vertical fit edge (stage 314-320 at 1440 fine, 338-344 at 390
  coarse), with `data-run-fits` set and `sh == ch`, the focused first seat's ring is cut by **1, 2,
  3, 4 px** at the run's block-start edge, and the last seat's ring by the same at the block-end
  edge. Light and dark read the same. Paint: `c12a-1440-light-stage314-last.png` (the top seat's
  ring flat against the plate's top edge).
- **v10.1.4** cuts the end seat's ring by 4 px at every stage under 328 (1440) and 352 (390 coarse),
  so the branch is better there, but O-201's ruling is "no seat's ring … clipped … mid-yield", and a
  bound of up to 4 px is a clip.
- **Not measured by me in WebKit.** c12a's first WebKit pass reached no seat (Option+Tab misses
  this dock there), and the re-run, which focuses the first seat by `focus()` under keyboard
  modality as `k2` does, was never admitted (below). Fix 11 measured the same band in WebKit as a
  3-7 px cut when it tried the ring law on both axes (`fix-11.md`).
- Fix 11 records this band as open (`fix-11.md`, "The vertical run keeps the old yield"); this
  measures it. It needs the scrollable block-end reserve fix 11 names, one that does not move the
  D-1 bottom-anchored summary.

### S3: O-207 G3, the Slider and the SortableList handle still paint the 30% ring, about 2.1:1 (medium; accessibility; pre-existing)

- **c12e**, keyboard focus, contrast in the 8 px band outside the ring-bearing box (the band and the
  whole clip read the same):

  | atom (ring on) | Chromium light / dark | WebKit light / dark | v10.1.4 (both engines) |
  |---|---|---|---|
  | default Slider (track, `--focus-ring-shadow`) | **2.18 / 2.10** | **2.20 / 2.10** | 2.17-2.19 / 2.10 |
  | spectrum Slider (thumb) | **2.12 / 2.12** | **2.15 / 2.12** | 2.12-2.15 / 2.10 |
  | SortableList handle | **2.12 / 2.04** | **2.17 / 2.09** | same |
  | Sheet detent handle (grip, opaque `--focus-ring-color`) | 4.43 / 7.16 | 4.42 / 7.16 | same |

- O-207 G3's gate is "every focusable atom in the demo … at least 3:1". Fix 11 moved the disclosure
  trigger to the `.focus-ring` outline (R3; c11d re-read on this tip: 3.12-3.14 light, 4.2 dark).
  These readers still paint `--focus-ring-shadow` (`slider/styles.css:263, 325, 380`,
  `sortable-list/styles.css:193`; also `popover-content`, `.input-bar:focus-within`,
  `timeline`, `data-table` by the same token), which `utilities/base.css:139` itself measures at
  1.91:1.
- **The default Slider in v10.1.4** computed the UA `outline: auto` on its thumb; the branch's r5
  cure (`bca6e4e32`, `slider/styles.css:239-241`) sets `outline: none` there, saying the track
  carries the ring. The paint reads the same in both arms (the UA ring sits inside the track's box
  and did not raise either reading), so I do not report it as a regression, but the comment's
  premise is the 2.1:1 ring.
- **Cure direction.** Every `--focus-ring-shadow` reader that marks keyboard focus paints the
  house ring (`.focus-ring`'s outline, or its ink on the box-shadow channel where an outline cannot
  sit), as R3 did. A cure that changes `--focus-ring-shadow`'s value itself moves a token, which the
  patch must name. Witness: c12e, RED on the tip, GREEN after.

## Refuted, or not a glass defect

- **O-207 K4 (the Sheet's "Sheet position" handle).** The handle is `outline: none` by design and
  its ring is on the grip, `box-shadow: 0 0 0 3px var(--focus-ring-color)` (`sheet/styles.css:296-310`),
  at 4.42-4.43:1 in light and 7.16:1 in dark, both engines, both arms. A probe that reads only the
  handle's own `outline` and `box-shadow` sees nothing; the paint shows the ring.
- **O-207 G1 and G10** stay refuted as critique 11 measured them (not re-run; no slider-fill or
  dock-mount code changed in fix 11).

## Fix 11's cures, re-read on this tip

- **R1 (O-205 at its root): holds.** c11a (critique 11's cells on this tip): every collapsed cell
  has four equal corners of half the cross extent (30/28 px) and the hidden run computes
  `overflow: clip`, no timeline, at 360-1440, light and dark. c11i: one wheel over the fitting run
  with a wider hidden face scrolls it **0 px** (`sw == cw`, 253/263) at 390 and 1440. c12d: every
  frame of an expand and a collapse, plain run and layer group, has four equal corners (spread 0,
  no `%`), Chromium and WebKit; v10.1.4 computes `%` corners in those frames.
- **R2 on the horizontal run: holds at every fitting cap.** c11c and c12b: whole rings for the first
  and end seats at every fitting cap, 390 and 1440, fine and coarse, LTR and RTL, both engines
  (worst 0.06 Chromium, 0.13 WebKit, the antialiased edge). Its gap below the edge is S1.
- **R3: holds** for the disclosure triggers (above).
- **R4: holds.** c11h on this tip: S1 steps **0.02 px** in every padding cell (critique 11: 6.48-7.02).
- **A run that truly overflows (c12c):** at rest the leading corner is round and the trailing one
  cut; scrolled to the end, the reverse; flushed back, the rest returns exactly; a collapse while
  scrolled seals round (v10.1.4: four cut corners); the re-expand restores the scroll (91-93 px at
  390, 104-106 px at 1440), LTR, both engines.
- **The posture sweep under hover.** c12b: with the pointer resting on the trailing seat, every
  fitting cap keeps four equal corners at half the cross extent (fine pointers, both engines).

## Recorded, not defects

- **The ring-room band at rest.** For the 2 x 4 px under the old fit edge, the branch's run does not
  fit, scrolls its reserves (7-8 px) and cuts its trailing cap at rest while every seat shows (c12b
  `hid 0` at the first non-fitting cap). That is the trade the O-201 ruling allows ("the cap's cut
  says so"), and the brief's g1 ("a run that hides nothing has nothing to scroll") reads it the
  other way. I record it for the owner; it is not a defect against the O-201 ruling.
- **RTL in WebKit:** a re-expand after a collapse from a scrolled RTL run restores to a different
  offset (`-93 → -312/-344`; v10.1.4 `-93 → -378`). In Chromium RTL, the run rests at
  `scrollLeft 1` and the leading corner at 29.73 px against 30. Both belong to the RTL reach sign
  the round-6 note leaves as recorded.
- **O-193** rests on the release spec's `q1` (both engines below) and critique 11's r10 cells on
  the round-10 tip; I did not re-run critique 10's harness on this tip.
- **The CHANGELOG** carries O-ids, as critique 11 noted; the close seat owns that.

## The inbound briefs, brief by brief

- **O-129 r1, r2, r5, r6, r7, O-132, O-133** (g1-g5 and the round witnesses in the release spec):
  GREEN, 104/104 in both engines on this tip.
- **O-186/O-187** (`q1`-`q3`): GREEN in both engines. **O-193**: see *Recorded*.
- **O-201**: the Home-trigger cell at natural width and every fitting horizontal cap are cured in
  both engines (c11c, c12b, `s2`); open below the fit edge in a layer group (S1) and in the vertical
  yield band (S2).
- **O-205, both triggers**: cured in both engines (R1 above; `s1`).
- **O-207**: G1 and G10 refuted (critique 11); G3 cured for disclosure triggers and open for the
  Slider and the SortableList handle (S3); K4 refuted.
- **O-155 to O-182 and the round-4 to round-8 orchestrator notes** rest on the release spec's
  witnesses for them (`e*`, `h*`, `k*`, `l1`, `m1`-`m5`, `n1`, `p1`, `p2`), all GREEN in both
  engines; c12c and c12d re-read M1 (a collapse from a scrolled run seals round) directly.

## What ran (all through `guarded`; none refused)

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts` on the tip | 104/104 | 104/104 (load 16) |
| g6 `release-10-1-4` | 23/23 | 15 passed, 8 skipped (`page.pdf`) |
| g6 `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| critique 11's cells on this tip (`r11`) | 9/9 | 9/9 |
| round 12's cells, branch and v10.1.4 arms (`c12`, `c12-v1014`) | 5/5 and 5/5 | 5/5 and 5/5 |
| c12a/c12b/c12e re-run with the End reading (`c12g`) | 3/3 and 3/3 | c12a not admitted (below) |
| g7 (`critic-12/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skipped), verify:package: all exit 0; the tree clean after | |

- **g6's F-4 cell** (critique 11's R6) passed in the WebKit pass at load 8-12.
- **c12a in WebKit** reads `found: false` for both seats in the first pass: Option+Tab does not
  reach this vertical dock's seats in WebKit 2287.
  The re-run (seat 1 by `focus()` under keyboard modality, as `k2` does) queued for 21 minutes and
  lost the lock twice; I stopped its waiter by PID (64902). **c12a is a Chromium reading only.**
- I stopped my own queued WebKit waiter twice by PID (49354, 5003; neither had been admitted:
  six sessions contended for `--exclusive webkit`) so the Chromium re-run and g7 ran first, one run
  at a time (`critic-12/queue.txt`).

## Union verdict

Not ready to tag. Fix 11's R1, R3 and R4, and R2 at every fitting horizontal cap, hold in Chromium
and WebKit 2287, the release spec is 104/104 in both, g6 is GREEN in both, and g7 is GREEN. Open:
**S1** (O-201: a keyboard-focused seat in a layer group is never reached on a run that does not
fit, so its ring is cut 3.6-4.2 px with every seat showing and up to 37 px further down; both
engines; pre-existing), **S2** (O-201: the vertical yield band cuts the end seats' rings by 1-4 px;
recorded open by fix 11), **S3** (O-207 G3: the Slider and the SortableList handle ring at about
2.1:1; both engines; pre-existing). K4 is refuted.
