# LANE α — UNIT 9 (R2 RESIDUAL CURE) · π QUEUE

**ENQUEUE ONLY.** No browser was opened by this seat. Nothing below is claimed; every
cell is owed. Captures ENQUEUE to the singleton browser seat — a second concurrent
browser owner hijacks the first's tab, and `getContext()` on a live canvas steals the
context and fakes a black fallback, so these are screenshot + computed-style
observations only.

Chromium 149 @1440×900, **both themes**. The defect and its two predecessors read
IDENTICALLY in light and dark, because it is geometry; a cell that reads differently in
the two arms is evidence the cure landed somewhere other than the box model.

**This is a DELTA cell against a DELTA cell.** π-RERUN-R2 was itself the re-capture of
the R2 cure, and it came back **STILL-RED** with the vertical arm WORSE than its own
control. The banked numbers it returned are the control this run is measured against —
`docs/tranches/BK/execution/2026-08-25-pi-band/rerun/PI-RERUN-BATTERY.md` §π-RERUN-R2,
committed `dfe6971f`.

---

## §1 · THE ONE CELL

### π-RERUN2-R2 — the reserve that now has room to be a reserve

**Route** R2 · **owner** #47 W8 MATERIAL + W3 LATTICE · **cure** one declaration:
`box-sizing: content-box` on `.glass-dock .dock-run` (`run.css`), the base rule that
already carries the reserve pair.

**WHY A THIRD CAPTURE.** The reserve was authored as `padding` + equal negative `margin`
on the cross axis, and that pair only grows the padding box when the box's cross size is
AUTO. Two rules in the band author a non-zero size on the element `.dock-run` rides, and
both land on the axis the reserve pads:

```
layers.css  .glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }
                                            → the VERTICAL run's cross (inline) axis
layers.css  .glass-dock:not(.vertical) .dock-layer
                { min-height: var(--dock-layer-height, 2.5rem) }
                                            → a HORIZONTAL run's cross (block) axis
```

Under `border-box` the padding therefore ate the CONTENT box and the negative margin only
shifted the box. `content-box` makes the authored size the size the SEATS get and the
reserve add on top of it. The unit arm proves the collision statically
(`g-dock-lattice.test.ts`, G-DOCK-MATERIAL, born-RED at `dfe6971f`); **the geometry below
is the half jsdom cannot see and is not claimed anywhere in this unit.**

**PREDECESSOR ARMS — three artifacts, each cited for its own figures:**

* `pi-RERUN-R2-MATERIAL-ringclip-census-overview-1440-{light,dark}-cured.json` —
  `total 68`, `clippedCount 49`, **any cross-axis clip 21**, any scroll-axis clip 34,
  cross-only 15 · scroll-only 28 · both 6.
* `pi-RERUN-R2-lattice-paired-overview-1440-light.json` — the sidebar run at `i=0`:
  `runBorderBox [16,28,40,637]`, `runMarginBox [20,28,32,637]`, `clientW 40`,
  `scrollW 48`, `crossContent 32`, `crossSeat 40`, **`crossOverflow +8`**; and the one
  horizontal run whose `min-height` binds, `i=5`: `dockRect h 48` (its siblings 56),
  `runMarginBox h 32`, `crossContent 32`.
* `pi-RERUN-R2-SYNTHETIC-seatfill-clipedge-1440-light.png` — seat painted solid, layout
  box cssX `20.0 .. 60.0`, paint reaching cssX `20 .. 55.5`: **4px of the button cut
  off.**

**MUST SHOW** — re-run each census script **unchanged**, so the numbers are comparable:

1. **`crossOverflow === 0` on the sidebar run** at `/dock/overview` @1440. This is the
   single number the cure is about: `scrollW === clientW` on the clipped axis. Expected
   shape, stated in advance so the capture can falsify it rather than confirm it —
   `runBorderBox w 48` (was 40), `clientW 48`, `scrollW 48`, `crossContent 40` (was 32),
   `crossSeat 40`, `crossOverflow 0`.
2. **`runMarginBox` BACK TO 40 and the dock's outer rect UNMOVED.** The margin box shrank
   `40 → 32` under the defect; the cure's whole claim is that the growth is handed back,
   so `runMarginBox w === 40` and `dockRect` byte-identical to the control. If the dock
   moved, this cure moved the dock and it is not the cure.
3. **cross-axis clip count → 0**, broken out BY AXIS. A bare `clippedCount` cannot
   distinguish the cure from the residual and must not be reported alone.
4. **the scroll-axis residual reported as a number, not folded away.** It was 34. It is
   REFUSED, with grounds restated at §2.2 of the unit-8 RECORD and §3 of this unit's:
   a seat flush against a scroll extremity loses its outward 4px because a scroller clips
   its scroll axis by definition, and curing it means padding the SCROLL axis, which
   moves the snapport against `scroll-padding: P/2` and puts the W3 modular correction at
   risk for a 4px edge. A capture that reports 0 here has changed something it was told
   not to change.
5. **the synthetic seat-fill probe repeated**: painted seat, layout box vs paint reach.
   `20.0 .. 60.0` layout must now paint `20 .. 60`. This is the arm that caught the port
   clipping the BUTTON, which no ring census would have shown.
6. **the ring paints BOTH arcs.** Drive `:focus-visible` with a real Tab (never
   programmatic focus). The scanline at the seat's vertical centre found ink at cssX
   `16, 16.5, 17, 17.5` only — left arc alive, right arc absent. Both arcs, both themes.
7. **`i=5`'s dock height back to 56.** `dockRect h 48 → 56`, `runMarginBox h 32 → 40`.
   This is the horizontal half of the same collision; the horizontal runs whose cross
   axis is auto (`i=1, 7, 8, 9, 10`) must be byte-identical to their control rows —
   `content-box` and `border-box` agree on an auto axis, and any movement there means the
   declaration reached further than the box model says it can.
8. **the lattice is byte-unchanged** — seat offsets, `--dock-pitch`, and the snap rest
   positions at `scrollLeft/Top: 0` and at one interior rest, paired against the control.
   The sidebar's `seatOffsets [0,48,96,…,597]` and step 48 are the row to compare.
9. **the scroll timeline still runs.** `.dock-plate`'s cut caps ride
   `scroll-timeline: --dock-run`, and changing a scroll container's box model is exactly
   the kind of thing that perturbs a progress timeline. Leading/trailing cap at rest,
   mid-scroll, flush-at-end.
10. **light AND dark.** Geometry read identically in both arms twice already; a
    divergence now is the finding.

**IF IT COMES BACK RED A THIRD TIME**, the next seat should not reach for a fourth
padding idiom. The two rows above (§ the `width: 100%` PIN and the `min-height` PIN) are
the whole census of size authorities on this element, and the unit arm asserts that
census by equality — a RED with a SIXTH row in it is a new authority someone added, and
that is the finding rather than the box model.
