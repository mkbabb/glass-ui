# LANE γ — UNIT 7 · π QUEUE · ONE RE-CAPTURE CELL

**Enqueued, not discharged.** The cure in this unit's `RECORD.md` §2.2 changes paint on
four of the ten story mounts and none has been observed. The cell below is a **DELTA
against pixels already banked** by the re-capture battery in
`docs/tranches/BK/execution/2026-08-25-pi-band/rerun/`, so it compares like with like.

**Standing law for this cell.** ENQUEUE to the singleton browser seat; no seat opens its
own browser. Screenshot + `getComputedStyle` only — `getContext()` is never called on any
canvas. Colour read from the captured PNG in Node (`pngjs` + `oklabFromRgb`, the one
colour-math source `scripts/lib/paint-arm.mjs` re-exports). Port and build-freshness
cited in the cell. Crops scale the CSS box by the live `devicePixelRatio` (2 at 1440,
**3** at 390). **The predecessor artifact is the control; a cell that cannot show its
predecessor is not a delta.**

Route: **`/motion/handmark`**. Viewports: **1440** and **390×844×3**. Themes: **both**.

---

## π-RERUN2-R6 — the frame has a size of its own, and the four blank mounts paint

**Cures:** `HandMark.vue` — `.hm-mark` drops `width:100%/height:100%` and each frame
declares its own SVG viewport, `:width`/`:height` = the line rect the mark was made for.
**Predecessor verdict:** `PI-RERUN-BATTERY.md` §π-RERUN-R6 — **SPLIT: window CURED ·
ring/paint STILL-RED**, routed to `BK #51 / src/components/handmark/HandMark.vue`.

### The arms

| # | arm | control (banked) | claim |
|---|---|---|---|
| 1 | computed `.hm-mark` width per mount, read off the live DOM, 1440 dark | `pays in` 162.04 / 100.14 / 61.88 · `drawn` 139.29 · `rose` 61.48 · `violet` 73.78 · **`Friday` 0 · `threefold` 0 · `Hpqjy` 0, 0** | **every one of the ten > 0**, and each equals its own line rect: the four zeros become ≈**87.81 · 153.93 · 171.58 · 108.63**, the six others **unchanged to the digit** |
| 2 | the same reading at **390×844×3** | `Friday` **0** · `threefold` **0** · `Hpqjy` **0, 0**; `pays in` 139.32 · `rose` 52.87 · `violet` 63.45 | same — four zeros gone, six figures untouched |
| 3 | **REST-state crop, `Friday`** — the STRIKE mount | `pi-RERUN-R5-crop-Friday-1440-{dark,light}.png`: **blank**, no struck line | a hand-drawn line through the word, both themes |
| 4 | **REST-state crop, `threefold`** — the CIRCLE mount, and the ring the battery says is *"still never painted"* | `pi-RERUN-R5-crop-threefold-1440-{dark,light}.png`: **blank**, no ring | the loop paints, overshoot and all |
| 5 | **REST-state crop, BOTH `Hpqjy really matters` line rects** | `pi-RERUN-R5-crop-Hpqjyreallym-1440-{dark,light}.png` + `pi-RERUN-R5-crop-Hpqjyreallymat-1440-{dark,light}.png`: hue-78 painted px at OKLab C ≥ 0.08 = **0 of 103,782** | **> 0 on both lines** — a band under each line, neither bridging the gap between them |
| 6 | π-GALLERY at rest, five sections | **three of five** carry their mark (UNDERLINE, HIGHLIGHT `rose`/`violet`, THE DRAW); STRIKE and CIRCLE show nothing | **five of five** |
| 7 | **the reservation arm, which must NOT move** | `threefold` computed `padding-inline` **18.2611px** at 1440 dark, host rect **190.45px**, and the visible gap between "Up" and "threefold" | **unchanged to the digit** — this cure touches no padding, no reserve and no geometry |
| 8 | **the mask windows, which must NOT move** | all 10 finite, area > 0, e.g. `threefold {x −3.88, y −1.599, w 165.176, h 41.743}`, `Hpqjy` line 2 `{x −206.033, y 33.756, w 141.677, h 50.959}` | **byte-identical** — `maskWindow()`'s arithmetic is unchanged by the `up`/`down` de-duplication and the arms that read it stayed green |
| 9 | **the emitted geometry, which must NOT move** | guide lengths `169.969 / 105.068 / 64.952 / 91.539 / 373.845 / 171.583 / 108.632 / 63.871 / 76.383 / 146.568`; delays `0 / 234.371` on the two-line mark | **all unchanged** — the frame stays pinned at `left:0; top:0`, so `measure()`'s origin is the same fixed point and not one coordinate is re-based |

### THE ONE QUESTION THIS CELL EXISTS TO ANSWER

**Does ink lying wholly outside a small `overflow: visible` viewport still paint?**

It is load-bearing for exactly one mount and it cannot be answered headlessly. `Hpqjy`
line 2's ink sits at `x ∈ [−206.03, −64.36]` in the frame's user space while its frame
spans `[0, 108.63]` — the ink is **entirely** left of its own viewport. The rest of the
corpus only ever asks the weaker version and the battery already answers that one yes:
`rose` paints edge to edge (**liveCols 148/148, longest dead run 0**) with a 96.089-wide
window against a 61.48-wide viewport, i.e. 17px of ink outside on the left and 34px on
the right. If arm 5's **second** line stays at zero while its first goes positive, the
diagnosis is culling and not this cure, and the route reopens on the frame's POSITION —
which this seat refused to move because `measure()` reads its origin from that rect and
a position that depends on the geometry has no fixed point (`RECORD.md` §2.2).

**KILL:** if any `.hm-mark` still resolves width 0 in either engine, the cure is not the
cure and the route reopens against `HandMark.vue`.

**Artifacts to re-bank (same names, `-cured2` suffix):**
`pi-RERUN2-R6-RING-reservation-1440-dark.json` (arms 1, 7, 8, 9 in one read) ·
`pi-RERUN2-R6-MOBILE-390x844.json` (arm 2) ·
`pi-RERUN2-R6-crop-{Friday,threefold,Hpqjyreallym,Hpqjyreallymat}-1440-{dark,light}.png`
(arms 3–5, paired against the `pi-RERUN-R5-crop-*` controls of the same names) ·
`pi-RERUN2-R6-GALLERY-rest-1440-{dark,light}.png` (arm 6, against
`pi-RERUN-R5-GALLERY-rest-scrolled-1440-light-cured.png`).

**Second engine.** Real Safari 26.4 over plain W3C WebDriver, arms 1 and 3–6. The battery
notes Chromium and Safari **disagreed** on this box before the cure — Safari resolved
real widths for `Friday` and `threefold` where Chromium resolved 0 — so a declared
viewport should make them agree from the same number rather than by luck.
`scripts/safari-probe.mjs` excludes `/motion/handmark` from its route list; drive its
endpoints directly.

---

## NOT ENQUEUED HERE, AND WHY

| cell | grounds |
|---|---|
| π-RERUN-R5 · R7 · R8 | **CURED-GREEN** in the battery. R5's rest-state and R7's one-chisel-per-line readings are re-read as arms 5 and 9 above only because this cure must not disturb them — they owe nothing on their own account |
| the two π-BAND colour windows — the dark arm at ≈0.485 against `[0.42,0.48]` (the card's `paper-grain-overlay` lifting ≈+0.045 L), and `oklch(0.86 0.16 270)` gamut-mapping to C **0.07256** under the 0.08 floor | **Still carried OPEN on #51 and still not cured.** π-RERUN-R5 corroborated the second to within rounding and was explicit that the `violet` light zero *"is not an R5 failure"*. Named here so a green paint cell cannot bury them |
| π-SCROLL's kill-criterion disposition | π-RERUN-R8 made it judgeable and read 0.36 CSS px of trailing inertia against a 1.5 px cap. **The disposition is the owner's** and no capture changes that |
| the legibility PNG pair R8 was one sub-arm short of | *"not obtainable at this amplitude"* — 0.36 CSS px living for a 90 ms quiet window. Reported as such by the battery rather than staged, and not re-asked |
