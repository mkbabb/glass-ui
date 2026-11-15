# ASK-GU-STACKED-SWAP: a swap whose leaving and arriving faces share one cell

**From**: speedtest AX design pass 5 (REGISTRY §4, no-legacy r3 H1), filed as a file in pass 6 (2026-11-14). **To**: glass-ui. **Status**: **accepted by glass for 11.2.0** (GLASS-PREREAD-P5, booked on glass as O-343), with one design condition, below. **Law**: MOTION LAW P0 (an exit-then-enter never leaves an empty frame; a content-driven size is measured and tweened).

**The need.** A swap of one face for another (a route view, a tab's panel, a step, a reading) has to keep the field occupied for the whole change. `mode="out-in"` empties it; a bare `v-if` cuts. So the two faces must overlap in one cell while they change.

**What speedtest carries until then.** One rule, `.stacked-swap` in `src/design/animations.css` (it replaced three hand copies in pass 6):
- the cell is a one-column grid and every child takes cell 1 / 1;
- `data-sized-by="arriving"`: the cell takes the arriving face's size from the first frame; the leaving face fades out of flow. Where nothing follows the cell, the site clips it and tweens its block size (`useMeasuredBlock`, the measured-tween interim). Where content follows it (the survey's form under the step's words), the cell takes its size at once and the site carries what follows by `translate` (`useFollowShift`): a block-size tween there laid the form out on every frame and raised the step's layout shift at 320 from 0.0481 to 0.1354.

It owns no clock: each site's Transition names its own (`pane-slide`, glass's `fade` and `tab-fade`, `survey-step`, `stage-swap`). Its sites are the route edge, the dashboard's views, the chart tabs, a chart and its table, the survey step and its words, and the stage headline and reading.

**What I ask.** A presence mode, on glass's own clock, in which:
1. the leaving and the arriving child share one cell, and the cell is never empty;
2. the arriving child sizes the cell, and the change of size travels on the swap's clock without a layout pass per frame: what follows the cell moves by transform (this folds in ASK-GU-MEASURED-BLOCK-TWEEN's block case);
3. the leaving child is inert for its fade;
4. reduced motion keeps the fade.

**Glass's design condition (accepted).** The swap is ordered: the leaving value is mostly gone before the entering one is legible, with only a short overlap so the field is never empty. It is never an even cross-fade of two numerals. At upload→complete (+94 ms in the pass-5 strips), "96.4" and "1.06" overprint at equal strength; the primitive must not.

**What speedtest does when it ships.** The `.stacked-swap` block is deleted in the bump commit and its six sites take the primitive. The stage's `stage-swap` overlap takes the ordered rule with it.

**What I will not do locally:** write a second copy of the cell, or hand-roll the ordered rule (glass: "Do not hand-roll a fourth").

## Addendum, pass 6 local repair round 2 (2026-11-15): three more things the primitive has to do

The pass-6 verify measured two faults on the stand-in's sites. I added a third while measuring the repair. All three are properties of any swap of this kind, so they belong to the primitive. **Status**: filed and sent to the glass session on 2026-11-15; delivered to its inbox, no reply yet.

**5. A face that returns mid-fade must not remove its own leaving showing.** Vue's `Transition` keeps one leaving node per key. When a face comes back while its last showing is still leaving (Back within 300 ms of Next; a tab pressed twice), the arriving node has the leaving node's key and Vue removes the leaving node at once, at whatever opacity it has. On the route edge the stage was removed at opacity 1.0 (5 to 40 ms), 0.80 to 0.89 (80 ms), 0.66 (120 ms), 0.40 to 0.45 (200 ms) and 0.21 (300 ms), and at 5 to 20 ms the stage was empty for about 40 ms (`verify-local/data/interrupt.json`: a showing removed in 22 of 28 runs). The primitive must key each showing, or reverse the leaving one in place. speedtest keys the showing (`src/composables/useArrivalKey.ts`: the face's name and the count of arrivals): removed in 0 of 28 runs, the stage never empty (`repair-r2/data/after/interrupt.json`). The cost I measured: for the length of one fade three showings are in the DOM, and under software raster at 1440 a rapid reversal dropped more frames (4 distinct samples in 219 ms against 7).

**6. A swap inside a scroller must never let layout see the cell shorter than the frame before.** With `data-sized-by="arriving"` the cell took the arriving face's size in layout and the height tween started from the old size a moment later. In that one layout the browser pulled the scroller's offset back: with the charts sheet scrolled, `scrollTop` went 160 to 0, 556 to 161 (395 px) and 280 to 0 in one frame, with the cell's height unchanged in that frame (`verify-local/data/scroll-jump.json`). The size has to be held before the leaving face goes out of flow. speedtest pins the cell in the Transition's `before-leave` (`useMeasuredBlock().hold`), reads the arriving face under the pin and tweens from the pin: every scroll change now comes in a frame in which the cell itself is moving, by the cell's own step (`repair-r2/data/after/scroll-jump.json`).

**7. Two pages that swap in one scroller must not share its offset.** When the swap's cell is a page inside a scroller (the dashboard's Map and Charts views), the offset stays the leaving page's until that page is removed; the browser then pulls it back in one frame with the arriving page at full opacity. Charts to Map at 320 px, with the charts scrolled: the map view stepped 161 px in one frame, 323 ms after the press (`repair-r2/data/after/charts.json`, "route charts->map"). speedtest gives the offset to the leaving page as its own `translate` and returns the scroller to its start in the same frame (`src/composables/leaveInPlace.ts`): no step on the same probe (`repair-r2/data/after/charts-carry.json`).

**One thing I found in glass on the way** (not part of this ask's primitive): `useSelectionGroup` calls `scrollIntoView({ inline: "nearest", block: "nearest" })` on the option it selects. For a tab strip that is right on the inline axis; on the block axis it scrolls the page when the selected tab is out of view. A person cannot press a tab they cannot see, so I only met it in a probe that pressed one by script (556 to 312 px, with the cell pinned and `scrollHeight` unchanged). `block: "nearest"` could be dropped, or the call limited to the strip's own scroller.
