# 10.1.5 — fix round 11 (critique-11.md: R1, R2, R3, R4, R6)

Seat: claude-opus-5-5. Commits `c274cc698` (R1), `5b21f490b` (R2 + R4), `7493bee11` (R3),
`ef73bc1b7` (witnesses, CHANGELOG), `208fcf83c` (R2 scoped to the horizontal run), `e9acd7a00`
(ratchet rebind), and the records. Every browser run went through `guarded` (WebKit 2287 under
`--exclusive webkit`); none was refused. Driver `scripts/witness-fix-11.sh`, gates
`scripts/gates-fix-11.sh`; records under `fix-11/` (`r3/` and `final/` are the runs on the
final src).

## R1: O-205 at its root (cured, `c274cc698`)

**Cause.** Two boxes nobody sees gave the run a scroll range. (1) The collapsed dock's full
pane is laid out absolute, inset 0, inside the collapsed box, and as a scroller its seats
overran it by 180-700 px. (2) A layer group's idle face is absolute, inset 0, in a box the
active face sizes, and its `max-content` row counted toward the run's scrollable overflow.

**Cure.** Both idle boxes are `overflow: clip`: the run at rest while it is neither active nor
leaving (`run.css`), and a crossfade face while it is neither active nor leaving
(`crossfade.css`). A clip box is no scroll container and its overflow does not reach its
ancestors, so a fitting run's `scrollWidth` is its port and the collapsed run has no scroll
range. The leaving pane and the leaving face keep their overflow: the leaving face's crossfade
paint spans the run's port while the plate morphs, and a collapse fades the leaving seats where
they were scrolled. That is the root that holds without clipping a leaving face's paint; the
leaving face adds its overflow only for the dissolve (critique 11 recorded the swap frame).

**A reading note for the next critic.** The collapsed run's `scrollWidth` still reads its
seats' extent (250-292 px against a 126-134 px client box), as on any box that does not
scroll. Its scroll range is zero: `overflow: clip` on both axes, a `scrollLeft`/`scrollTop`
write lands at 0, and no timeline is named. `s1` reads it that way; c11a's `sw - cw` column
no longer measures scrolling.

## R2: O-201 at the fit edge (cured on the horizontal run, `5b21f490b`, `208fcf83c`)

**Cause.** The reserves yield to the room the seats leave, down to zero, so for the 8 px above
the fit edge the first and last seats' rings were cut by up to 4 px.

**Cure.** `data-run-fits` on a horizontal run now needs `span + 2 x --dock-ring-reserve <= port`,
so a yielded reserve never falls under the ring's reach. Under that room the run does not fit:
its reserves stay whole, the spacer boxes scroll in both engines, and the cap is cut, as the
O-201 ruling allows. `--dock-ring-reserve` is registered as a `<length>` (as `--dock-pitch` is)
so the measure reads it as px; its value does not move. No token was added.

**The vertical run keeps the old yield.** The first commit applied the law to both axes, and
WebKit turned `n1`, `p2` and `s4` RED: a vertical run keeps its block-end reserve as padding,
which WebKit counts as scrollable overflow only once the seats pass it, so under the ring room
the run neither scrolled nor showed the ring (flag false, `sh == ch`, 3-7 px cut). The
vertical spacer box that would cure it was rejected in an earlier round (it moves the D-1
bottom-anchored summary 2.6 px under an ancestor `zoom` in WebKit). So on a vertical run the
yield still reaches half the room the seats leave, and in that band a focused end seat's
ring can be cut by up to 4 px. This is open, and it needs a scrollable block-end reserve in
WebKit that does not move D-1.

## R3: O-207 G3 (cured, `7493bee11`)

`.disclosure-trigger:focus-visible` set `outline: none` and painted the 30% `--focus-ring-shadow`
(about 2:1), and it also took the outline off a trigger that composes `.focus-ring`. It now paints
the `.focus-ring` outline (2 px, `--ink-perimeter`, offset 2 px), restated as `.menu__trigger`
restates it. The forced-colors arm keeps `outline-color: Highlight`. CollapsibleTrigger and
AccordionTrigger both carry the class.

## R4: the parent-padding door (cured, `5b21f490b`)

`constraintOf` now reads the parent's content box (`clientWidth`/`clientHeight` less its
computed padding), so a host that moves only its padding moves the constraint, the endpoint
hold lets go, and the yield lands mid-morph. The parent is already observed by a
ResizeObserver on its content box, which a padding change resizes.

## R6: the F-4 DataTable settle cell (re-read at low load)

At load 7.6 in WebKit the F-4 cell passed 80 of 80 (its five hosts, 16 repeats), and g6
10.1.4 passed in both WebKit passes of this round. With critique 11's 3 in 84 at load 39-49
and 0 in 40 on v10.1.4, the failures follow load; no cause in the patch is known and no table
code changed in this round.

## Witnesses (`release-10-1-5.spec.ts`)

- `s1` (R1) at 1440 and 390 coarse: daraksha's dock collapsed (layer group and plain run): the
  plate is round, and no run has a scroll range or a timeline. Open on the narrow face: the flag
  is set, `sw == cw`, the plate is round, and a wheel (where the pointer hovers) and a
  `scrollLeft` write leave the run at 0.
- `s2` (R2) at 1440 and 390 coarse: value's Home trigger at the run's end, the cap swept in 1 px
  steps from natural width to 3 px under the fit edge: on every fitting cap the first seat's and
  the Home trigger's keyboard rings lie inside every clipping ancestor, and at every cap the flag
  is `sw <= cw`.
- `s3` (R3), light and dark: value's palette-card trigger (CollapsibleTrigger `as-child` over a
  Button), a plain CollapsibleTrigger and an AccordionTrigger paint a 2 px solid outline at the
  perimeter ink under keyboard focus.
- `s4` (R4): critique 11's c11h cells (the vertical six-seat dock at its fit edge, the stage's
  padding moved 16 to 16.5/17 and 16 to 15 at 110 and 300 ms of the expand): S1 steps no more
  than 0.5 px at the settle and the rest flag is the layout.
- `m2` is unchanged (its vertical law stands).

## Runs

| run | Chromium | WebKit 2287 |
|---|---|---|
| `s1`-`s4` on the round-11 tip 1e0f9d879's src (`red`) | 6/6 RED | 6/6 RED (s4 S1 7.02 px, as c11h) |
| `s1`-`s4` on the final src | 6/6 (`r3/`, and `s-chromium` before) | 6/6 (`r3/s-webkit`) |
| whole release spec, final src | 104/104 (`r3/branch-chromium`) | 103/104 (`final/branch-webkit`, load 6-8): `q2` at 1440 timed out in `page.goto`; its re-run is recorded below |
| critique 10's `p2`, repeated 3 | — | 6/6 (`r3/p2-webkit`, load 7) |
| g6 `release-10-1-4` / `release-10-1-3` | 23/23 / 60/60 | 15 + 8 skips / 58 + 2 skips (`final/`) |
| F-4 DataTable cell, repeated 16 | — | 80/80 (`final/f4-webkit`, its five hosts 16 times, load 7.6) |

The first WebKit pass of the whole spec on `ef73bc1b7` (both axes under the ring law) failed
`n1`, `p2` and `s4` (the vertical band above) and `s1` at 390 (mobile WebKit has no wheel; the
witness now writes the offset). On `208fcf83c` it failed one cell, `p2` coarse `h 262->264` at
110 ms (rest flag set while the run overflowed), at load 14; `p2` then passed 6 of 6 at load 7.
I record it as not reproduced and unattributed.

## g7 (`fix-11/g7/gates.txt`)

On the committed tree: typecheck, build and demo:dist:build exit 0. The first vitest pass
failed `dockMorphMeasure.test.ts` "a capture keeps the run's scroll position", which also
fails 1 run in 3 on the round-11 src (checked by restoring that file alone): it waited one
zero timeout for the pane's mutation capture. It now waits for the restore itself
(`vi.waitFor`), with the same assertions. verify:package failed the bundle ratchet
(2954851 > 2954283, +568 B) and was rebound on the committed tree (`e9acd7a00`). Then build,
demo:dist:build (the RED arms had touched src mtimes, so `boot-graph` read the demo build as
stale), vitest 247 files, 2397 passed (10 expected fail, 1 skipped), and verify:package all
exit 0 (`g7/gates.txt`, the `-3` logs).

No public API removed or renamed; no token added and no token value moved.
`--dock-ring-reserve` gained an `@property` registration.
