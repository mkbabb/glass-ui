# 10.1.5 — fix round 12 (critique-12.md S1, S2; orchestrator-note-fable-review.md items 4, 5, 6, 8)

Seat: claude-opus-5-5. Commits `f7b441f7e` (item 8, comments), `ed5fe54a8` (S1 and item 4),
the witnesses and CHANGELOG commit after it, and the records. Scope is frozen at O-207 (the
note's item 1). S3 is not touched here: its readers are booked to 12.0.0 (item 7). Every
browser run went through `guarded` (WebKit 2287 under `--exclusive webkit`). None was refused.
Driver `scripts/witness-fix-12.sh` (`tip` swaps in HEAD's `src` and restores the working
`src` on exit), gates `scripts/gates-fix-12.sh`, summary
`python3 -I scripts/fix-12-summary.py fix-12/<arm>/<project>`. Rows bank to `fix-12/`
(`tip/`, `branch/`, `scratch-vertical/`), and every run is in `fix-12/runs.txt`.

## S1: reach in a layer group (cured, item 6, `ed5fe54a8`)

**Cause.** As critic 12 read it: `onActivate` handed reach the run's direct child that holds
the target, which in a `DockLayerGroup` is the group frame. The frame is wider than the port,
so it read as occluded, and its anchor was the frame's start, scroll 0.

**Cure.** Reach takes the nearest declared seat inside the run that holds the target
(`seatHolding`), and otherwise the direct child as before. `extentOf` sums `offsetLeft`/
`offsetTop` (and each intermediate offset parent's border) up the chain to the run, so a
face's seat is measured in the run's scroll coordinates, still from layout boxes. The roving
keys inside a layer group are unchanged. They are recorded for W-I.8 and are not a 10.1.5
finding (item 6).

**A second door, found by critic 12's own sequence.** Once the end seat is reached, Tab back
to the first seat left it cut by 16-29 px at 19-32 px of scroll (Chromium c12b, scratch arm).
The engine's own focus scroll had already brought the first seat into view before `focusin`,
so reach found it in view and returned, while the glide toward the end seat was still
running and carried the run back. A probe of that flow (`fix-12/probe/back-reach.txt`): cap
256, Home then S1 left `scrollLeft` 18. Cure: a reach that needs no travel stops the glide in
flight, because the latest reach owns the travel. After it: 0 at caps 264, 262, 260, 256.

**Witness.** `s2` is restated to read every cap from natural width to 40 px under it (1 px
steps to 20 under, then 4), focusing the Home trigger and then the first seat from the end's
scroll. RED on the tip in both engines at 1440 and 390 coarse (`w-tip-ch.log`,
`w-tip-wk.log`: the Home ring cut 4.11, 5.11, 6.11 px and up, cap by cap). It is RED on
v10.1.4 by critic 12's banked c12b rows (end ring 3.8-43.8 px, first ring 4 px). GREEN on the
branch in both engines. c12b itself on the final src, both engines, LTR: end and first rings
whole at every cap (worst 0.11 Chromium, 0.23 WebKit, the antialiased edge).

## Item 4: the flag back to its one fact, the ring as the floor of the yield (adopted on the horizontal run)

`data-run-fits` is again the seats' span no longer than the port, on both axes. The `ring`
read in `publishYield` and its horizontal branch are gone, and so is `--dock-ring-reserve`'s
`@property` registration, whose one reader was that read. On a horizontal run the two
reserve boxes take `min-inline-size: var(--dock-ring-reserve)` in place of `0`.

**Witness (c12b, both engines, every cap from natural width to 40 px under, 390 coarse, 1440
fine, 390 fine).** Every cap where no seat is hidden rests on four equal corners at half the
cross extent, at rest and with the pointer on the trailing seat, with no `%`. The first and
end rings are whole after Tab focus (above). Fix 11's band, a cut cap with every seat showing,
is gone. `s2`'s fit law reads it at every cap: the flag is the span, a fitting run scrolls at
most `span + 2 x ring - port`, and it rests round.

**The bound it leaves, for the owner.** With less than one ring's reach of room
(`port - span < 4 px`, the last 4 px above the fit edge), the leading box's 4 px floor puts
the end seat's layout box up to `4 - room` px past the port at rest, under a round plate.
That is 1 to 4 px in the sweeps (Chromium `s2` at 1440: caps 263 to 260, port 253 to 250
against a span of 250, `scratch-vertical/w-branch-ch.log`). Focus brings it whole.
`fitLaw` gates exactly that bound and nothing past it. The cure would be a flag that also
counts the ring floor (`span + ring <= port`), which is a second threshold in the flag, the
form item 4 removes. So I did not build it.

## Item 5: the vertical spacer (tried once, not adopted; S2 goes to the owner as a bound)

The scratch gave the vertical run the horizontal run's two reserve boxes
(`block-size: --dock-run-reserve-block`, `min-block-size: --dock-ring-reserve`), deleted the
vertical padding rule, `--dock-run-room-block` and the `room` computation, and applied item 4
on both axes. Records: `fix-12/scratch-vertical/`.

- **D-1 per-frame probe** (fix 9's, 16 repeats per arm, WebKit 2287, load 11-12): the largest
  visible step is **1.12-1.45 px** on the scratch and **1.10-2.32 px** on the tip in the same
  window (`d1probe-tip-wk.jsonl`, `scratch-vertical/d1probe-branch-wk.jsonl`). That is under
  the note's 1.5 px bound. Fix 9's 0.73-0.81 px was not reproduced on the tip tonight.
- **S2 cured on the scratch.** c12a in WebKit: no cut at any stage, 1440 and 390, light and
  dark (`scratch-vertical/branch/webkit/c12a.json`). `t1` GREEN in both engines.
- **But the scratch broke two existing gates in WebKit** (`scratch-vertical/branch-branch-wk.log`,
  `g6-3-branch-wk.log`):
  - `p1` `v-to-320` (a host resizes the vertical dock mid-expand): S1 steps **2.98 px** at the
    settle, at 110 and 300 ms. The boxes follow the port the morph moves, where the padding
    held the rest reading. This class is closed where it stands (item 3), and no state may be
    added to `capture` or `publishYield`.
  - g6 `release-10-1-3` D-1: the leaving summary's first morph frame is **1.03 px** from its
    rest against the bound of 1. It is GREEN on the tip and on the final src.
  - The other p2 and s4 rows were the old flag law (flag set while overflowing), which item 4
    changes on purpose. `n1` read the old mechanism (`paddingTop`). Neither is a defect.

So the vertical run keeps fix 11's form: its block padding yields to half the room, and the
flag is the span. Built no third mechanism. **S2 is a bound for the owner:** in the 8 px above
a vertical run's fit edge, a focused first or last seat's ring is cut by `ring - room/2`, 1 to
4 px (c12a on the final src, both engines: stages 314-320 at 1440, 338-344 at 390 coarse,
light and dark). v10.1.4 cuts 4 px at every stage under 328 (1440) and 352 (390 coarse).
Paint: critic 12's `critic-12/probe/branch/chromium-headless-new/c12a-1440-light-stage314-last.png`
reads the same as this src. `t1` gates the bound (whole rings at every stage outside the band,
the reach back to the first seat from the End scroll included, and inside the band no cut past
`ring - room/2`). The tip passes it too, so it is a guard, not a RED-before witness.

c12a's WebKit cell, which critic 12 never got the lock for, ran on the tip
(`fix-12/tip/webkit/c12a.json`): 33/33 seats found, and the same 1-4 px band as Chromium.

## Item 8: comment lines (cured, `f7b441f7e`, `ed5fe54a8`)

Every comment line the patch adds in `src` that carried a row, round or seat id now says what
the code does: disclosure, click integrity, the static plate, the three hover gates, the idle
face and idle run, the Slider (two), the dark shadow, the nested-run rule, the `%` radius
notes, and the measure's endpoint hold and constraint reads. The grep
`git diff -U0 v10.1.4 -- src | grep -E '^\+[^+]' | grep -E 'O-[0-9]|OD-[0-9]|critique|fix [0-9]|\bR[0-9]\b|\b[PQ][0-9]\b|D-1|10\.1\.5|r1 law'`
returns nothing. Two added lines keep the file's existing section labels
(`BK #47 W3 LATTICE + W6`, `under W5 below`), which are in v10.1.4 as well.

## Runs (final src, `ed5fe54a8`)

| run | Chromium | WebKit 2287 |
|---|---|---|
| witnesses (`s2` x2, `t1` x2, `m2` x2) on the tip | 2 failed (`s2` both widths), 4 passed | 4 failed (`s2`, `t1` both widths; `t1` before its bound), 2 passed (earlier spec form, `w-tip-wk.log`) |
| witnesses on the branch | 6/6 | 6/6 |
| c12a / c12b (critic 12's cells) | 1/1, 1/1 | 1/1, 1/1 |
| release spec | 106/106 | 106/106 |
| g6 `release-10-1-4` / `release-10-1-3` | 23/23 / 60/60 | 15 + 8 skips / 58 + 2 skips |

Loads at these runs were 10-38 (`runs.txt`). The scratch-arm rows above `--- final src ---` in
`runs.txt` are item 5's attempt.

## g7 (`fix-12/g7/gates.txt`)

On the committed tree (`ed5fe54a8` plus the witnesses commit): typecheck, build and
demo:dist:build exit 0; vitest 247 files, 2397 passed (10 expected fail, 1 skipped), exit 0.
verify:package failed the bundle ratchet (2955067 > 2954851, +216 B) and was rebound on the
committed tree, then exit 0 (`verify-package-2.log`). Before g7, one dock-only vitest pass
failed `dockMorphMeasure.test.ts` "a capture keeps the run's scroll position" under load;
three repeats of that file passed 18/18, as fix 11 recorded for the same test.

No public API removed or renamed, no token added, no token value moved.
`--dock-ring-reserve` lost the `@property` registration fix 11 gave it in this patch; it was
unregistered in v10.1.4.
