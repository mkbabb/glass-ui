# W-B.17 prototype: the readings

The prototype seat (claude-opus-5-5, 2026-11-12) built W-B.17's pieces in a scratch worktree, `.claude/worktrees/bl/intent/proto` on branch `bl/intent/proto`, from master at `5f29a5555`, and measured each gate the wave lists. Nothing here is release work. The diff is `prototype/prototype.patch`; the strips are under `prototype/strips/<engine>/<configuration>/<cell>.png` (every cell at `l1440`; fourteen cells at `d1440`, `l390`, `d390` and `rm1440`), each one PNG with the change in over the change out; the readings, without the raw samples, are `prototype/data/chromium.json` and `prototype/data/webkit.json`.

**How it was read.**

- Engines: Playwright's Chromium headless shell and Playwright's WebKit build (every WebKit run through `guarded --exclusive webkit`). One browser per run, a new context per configuration, everything closed in `finally`. Shipping Safari is unmeasured.
- Configurations: 1440 fine and 390 coarse (touch, mobile), light and dark, and 1440 light under `prefers-reduced-motion: reduce`. Device scale 2.
- Sampling is the recorders' method, run through the prototype's own `./no-snap` helper (`src/testing/no-snap/index.ts`): read the rest state, trigger, pause every new animation (pseudo-elements included), seek them all to 0, 16.7 ms, 33.3 ms and so on, read each target at each seek, then finish them and read the end state. Strips use the same clock: eight evenly spaced frames per phase, plus rest and end.
- Wall-clock readings (the breath leaving, a swap's hand-over, follow interrupted, reclaim, a coarse tap) use a `requestAnimationFrame` recorder in the page. Headless WebKit ticks at about 50 Hz, Chromium at about 120 Hz.
- Layout, style and paint counts come from Chromium traces (`devtools.timeline`), at 1x and at 4x CPU. WebKit has no such counter and is recorded as unmeasured.

**What the harness stands in for.** The pieces were measured on plain controls in `tests-visual/intent-motion/harness/App.vue`, not on the census rows. The "command dialog with 50 rows" is a blurred `glass-floating` panel holding a 50-row list that filters, not glass's `CommandDialog`. The twelve-field form and the select trigger are plain markup. None of the eleven "Where glass uses the pieces" rows was built, so their G-TWEEN cells are not measured.

## What was built

| file | what | bytes (min, gzip) |
|---|---|---|
| `src/styles/glass/plate.css` | the plate as the wave writes it, plus the press (R-11), which is 12.0.0's and was built only to be measured | 1573, 625 |
| `src/styles/glass/glyph.css` | the glyph as written | 1511, 546 |
| `src/styles/glass/presence.css` | presence as written | 1355, 328 |
| the three partials together | | 4439, **1151** |
| `src/styles/utilities/a11y-overrides.css` | the authorized fades for `.plate::before`, the four `<Presence>` classes, `[data-presence]` and `.focus-ring` only | 654, 234 |
| `src/styles/utilities/base.css` | the focus ring fade (R-12) | |
| `src/composables/motion/presence/{Presence,follow,index}.ts` | `<Presence>` and `follow()`, exported from `./motion` | 1936, **941** (Vue external; includes `readReducedMotion`) |
| `src/testing/no-snap/index.ts` | `sampleChange`, `judgeChange` | 10316, 3765 |
| `src/styles/tokens/scheme-motion.css`, `Skeleton.vue` | `--skeleton-breathe-duration: 1.1s`, read by both | |

Where the build left the text:

- `follow()` reads its clock from the same tokens the CSS legs read (`--spring-present`, `--spring-present-settle`, `--motion-tempo`) rather than through keyframes.js's `springTimingFunction`. The curve is the same `linear()` string. It keeps two literal fallbacks (`0.2`, `"ease-out"`) that G-CLOCK's pattern does not see.
- The harness needed a glyph that holds still inside a `.plate`. The wave has no value for that; the harness wrote `data-glyph="none"`. Any value R-3 does not list counts as a verb, so the plate on that control becomes a fill alone.
- The authorized-fade rows for the top-layer reveal and the control faces were not written.

## The gates

| gate | Chromium | WebKit | reading |
|---|---|---|---|
| G-CLOCK | pass by plain `grep` | | Only the `0s` legs of the node that stays print. **The gate's own command does not bite**: `git grep -nE '...\b'` prints nothing on this machine's git (Apple Git 2.50.1), even on `scheme-motion.css`, and printed nothing with a planted `200ms`. `git grep` also skips untracked files without `--untracked`. The gate needs `-P`, or `([^a-z-]\|$)` in place of `\b`. |
| G-BYTES | | | The three partials are 1151 B gzip (ceiling 1.5 KB). `./motion` grows by at most 941 B gzip (ceiling 1 KB); `readReducedMotion` is in that figure and is already in `./motion`. No runtime entry was built, so the boot-graph clause is unmeasured. |
| G-API | pass | | `vue-tsc` rejects `duration`, `easing`, `name` and `group` on `<Presence>` and a second argument to `follow` (`tests-visual/intent-motion/api/ApiProbe.vue`; bite: dropping one `@vue-expect-error` fails). `renderToString` of the plain, swap and reclaim forms prints `<p id="x">a</p>` and nothing else; the bite (`TransitionGroup` with `tag`) prints a `<div>`. |
| G-EXPORT | plants pass | | `judgeChange` passes a linear control series and fails all four plants: a cut, a first frame off rest, a step of half the travel, a node removed before its fade ends. Resolving `./no-snap` from a consumer install was not measured: no package was built. |
| G-TWEEN | see table | see table | Every plate, glyph and presence cell passes in both engines at every width and theme. Fails: the busy plate in and out, the idle plate out, and follow on the select trigger. The bites fail as they must. Under reduced motion G-PRM is the reading. |
| G-COST | see below | nodes and properties only | 0 nodes added by any piece. Properties animated are opacity, scale, translate and rotate, plus the declared stroke-dashoffset, outline-color, and block-size with one margin. In Chromium the plate, glyph, breath and focus legs lay out 0 times; three presence and press changes lay out once at their end. |
| G-REST | pass | pass | 0 animations at every frame of the first 800 ms after load, on 40 plates, 40 glyphs and 10 nodes that stay; 0 at rest after a hover. One `data-idle` gives exactly one CSS animation, on the `::before`, on opacity; with the pointer on it, none. `presence/` holds no observer, listener, frame call or interval. |
| G-PRM | partial | partial | See its section. Fades hold at 100 ms in every authorized cell; travel lands at once. Two fail: the chevron's flip turns in one frame with no fade, and follow's content does not fade. The authorized-table surfaces (dialog, sheet, popover, tooltip, menu, select, toast, switch, checkbox, radio, tab, field, menu row, carousel, expandable trigger) were not built and are not measured. |
| G-BARE | pass | pass | With scripts off, a plate at rest and a draw curve paint 0 px differently from the same markup without the classes. A pressed control paints its plate (computed opacity 1), but its largest channel delta is 28 of 255, under the gate's own 48, so the gate as written cannot see a plate at `--fill-selected`. A `data-absent` node keeps its 60 x 20 box at opacity 0. The hover still transitions: at 50 ms the plate reads 0.27 (Chromium) and 0.26 (WebKit) on its way to 0.42. |
| G-RESTRAINT | pass | pass | Per piece: 0 shadows, gradients, blurs or filters; 0 nodes; one pseudo-element (the plate). Legs declared: plate 2, glyph 3 (draw 1), presence 3 in and 2 out (the node that stays declares 4 with visibility), follow one Web Animation, press 1, focus ring 1. On a hover a seat runs 3 animations (plate opacity, plate scale, glyph scale); a verb glyph runs 2 (plate opacity and its verb, the plate at full size); a press runs 2. |
| G-NEST | **fail** | **fail** | The pointer over the inner edit button also turns the outer trigger's plate on (0.42) and moves the outer chevron (1.236 px). `:hover` holds on every ancestor of the pointer, so resetting `--intent` on the inner control does not stop the outer control's own `:hover` rule. The reverse half passes: over the trigger elsewhere the inner glyph and plate stay at rest. |
| G-HIT | pass | pass | A press 1 px inside each edge of a 40 px and a 24 px control fires its click in both engines; scale goes to 0.97 and never above 1 on the way back. |

### G-TWEEN, every cell

`pass` means both directions passed. Reduced-motion cells that fail `cut` on a spatial leg are the law working (travel lands at once); G-PRM judges them.

| cell | Chromium 1440 L | 1440 D | 390 L | 390 D | reduced | WebKit 1440 L | 1440 D | 390 L | 390 D | reduced |
|---|---|---|---|---|---|---|---|---|---|---|
| plate, the owner's bar (pin) | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| plate, 44 px seat | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| plate, glyph at 16 px | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| plate, glyph at 24 px | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| plate as a fill on a row | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| glyph nudge | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| glyph turn | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| glyph draw | pass | pass | pass | pass | cut / cut | pass | pass | pass | pass | cut / cut |
| inner group turn (item 5) | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| chevron flip on open | pass | pass | pass | pass | cut / cut | pass | pass | pass | pass | cut / cut |
| plate and ring on keyboard focus | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| press | pass | pass | pass | pass | cut / cut | pass | pass | pass | pass | cut / cut |
| on and off (`aria-pressed`) | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| busy on and off | **first / cut** | **first / cut** | **first / cut** | **first / cut** | pass | **first+last / first** | same | same | same | pass |
| idle on and off | pass / **cut** | pass / **cut** | pass / **cut** | pass / **cut** | pass | pass / **cut** | pass / **cut** | pass / **cut** | pass / **cut** | pass |
| presence, plain | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| presence, swap (Play and Pause) | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| bite: bare `v-if` swap | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut | cut / cut |
| node that stays, as a swap (Check) | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| node that stays, plain | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| reclaim (error line, 12 fields) | pass | pass | pass | pass | cut / cut | pass | pass | pass | pass | cut / cut |
| follow, 50-row panel | pass | pass | pass | pass | cut / cut | pass | pass | pass | pass | cut / cut |
| follow, select trigger | **cut / cut** | **cut / cut** | **cut / cut** | **cut / cut** | cut / cut | **cut / cut** | **cut / cut** | **cut / cut** | **cut / cut** | cut / cut |

**Read the 390 columns with care.** At 390 the context has no hover, so the hover cells are taps. In Chromium a tap raises the plate to full strength through `:active` and lets it go: it reaches 1.0 at 199 ms after the tap and is gone by 356 ms, with the press shrink riding along. **In WebKit a tap paints no plate at all**: opacity 0 at every frame for 700 ms. WebKit applies `:active` on touch only where a touch listener exists, and the plate has none. So the 390 coarse cell the wave names ("a tap shows the plate at full strength for the press and leaves no plate after release") passes in Chromium and fails in WebKit, and its WebKit cells pass only because nothing changed. The press cell at 390 drives the mouse and passes in both.

The bites at 1440 light, both engines: the plate with its opacity transition removed fails `cut` in and out; a plate that starts at 0.75 opacity fails `first` in; a `width` leg on the glyph fails `cut`; the bare `v-if` swap fails `cut` in every configuration.

### The frame-delta table

The largest step between two 16.7 ms samples as a share of the leg's travel, then the largest step of the leg's own easing at the same spacing, then their ratio. The bound is 1.15. Every one of the 179 legs read lies between 0.98 and 1.00, in both engines; the rows below are the distinct legs, and every cell that carries each one.

| leg | clock | cells | Chromium step / eased / ratio | WebKit step / eased / ratio |
|---|---|---|---|---|
| plate opacity | `--duration-control` 0.12 s, `--ease-standard` | every plate cell | 0.339 / 0.339 / 1.00 | 0.339 / 0.339 / 1.00 |
| plate scale; glyph grow, nudge, turn, flip; presence travel; reclaim and follow box | `--spring-present`, 0.2 s | plate, glyph, presence, reclaim, follow | 0.171 / 0.171 / 1.00 | 0.171 / 0.173 / 0.99 |
| draw | `--duration-fast` 0.2 s, `--ease-standard` | glyph draw | 0.221 / 0.221 / 1.00 | 0.221 / 0.221 / 1.00 |
| focus ring outline-color | `--duration-instant` 0.1 s | plate focus | 0.372 / 0.372 / 1.00 | 0.372 / 0.372 / 1.00 |
| press scale | `--spring-press`, 0.12 s | press | 0.215 / 0.215 / 1.00 | 0.215 / 0.214 / 1.00 |
| presence opacity | 0.12 s, `--ease-out` | presence, swap, the node that stays, reclaim, the select text | 0.388 / 0.388 / 1.00 | 0.388 / 0.388 / 1.00 |
| swap scale out | `--spring-present-exit-duration` 0.12 s | swap, the Check | 0.282 / 0.282 / 1.00 | 0.282 / 0.282 / 1.00 |
| breath | 1.1 s, `--ease-standard` | idle in, busy in (Chromium) | 0.042 / 0.041 / 1.00 | 0.042 / 0.041 / 1.00 |

What the table says, and what it cannot say:

- No leg steps harder than its own curve; nothing is quantized or skipped by the engine.
- **The step clause is measured against the leg's own easing, so a short leg passes however hard it steps.** The 0.12 s fades move 34 % (plate) and 39 % (presence) of their travel in one 60 Hz frame. Under value.js's plain rubric that the wave uses for legs with no animation object (no frame covers more than a third of the travel), both would fail, by 0.6 and 5.5 points.
- The `present` curve is cut at its 2 % settle band, so the last 2.5 % of a travel lands in the final frame. On the 50-row panel's 288 px shrink that is a 7.3 px last step (Chromium wall clock: 91.9 px to 84 px at 207 ms). The clause passes it, because the curve itself has that step.

### G-COST

**DOM nodes** counted in each cell at rest, paused mid-change, and after: unchanged for every plate, glyph, press, focus and breath cell, in both engines. The changes that do count are the content's own: a presence node arriving (1 to 2), the Pause glyph's two rects against Play's one path (3 to 4), the error line (38 to 39), the filtered rows (53 to 4). A swap holds one mark at rest.

**Properties animated**, read from `document.getAnimations()`, the same in both engines: `opacity`, `scale`, `translate`, `rotate`; `stroke-dashoffset` on the draw path; `outline-color` on the focus ring; `block-size`, `margin-block-start` and `overflow` (held at `clip`) on follow and reclaim; `visibility` (a 0 s leg) on the node that stays. No other property animated. The text Button's `text-decoration-color` was not built.

**Chromium trace**, each change from trigger to 350 ms after (breath 1.1 s, swap and select 450 ms, sweep 700 ms):

| change | layouts at 1x (at, ms) | at 4x: layouts, longest, sum (ms) | style recalcs / paints / frames at 4x | longest main-thread task at 4x (ms) |
|---|---|---|---|---|
| plate hover in, 44 px seat | 0 | 0 | 25 / 2 / 27 | 5.48 |
| plate hover out | 0 | 0 | 25 / 2 / 26 | 2.59 |
| glyph nudge in | 0 | 0 | 25 / 2 / 25 | 3.75 |
| glyph draw in | 0 | 0 | 26 / **53** / 26 | 2.92 |
| press in | 0 | 0 | 9 / 6 / 9 | 2.98 |
| press out | 1 (131.6) | 1, 0.40, 0.40 | 8 / 4 / 9 | 1.72 |
| focus in (ring and plate) | 0 | 0 | 26 / 33 / 25 | 2.22 |
| breath, `data-idle`, 1.1 s | 0 | 0 | **2 / 2 / 2** | 3.22 |
| presence plain in | 2 (7.2, 222.3) | 2, 0.09, 0.13 | 16 / 8 / 16 | 5.07 |
| presence swap in | 1 (138.1) | 1, 0.88, 0.88 | 44 / 8 / 44 | 3.69 |
| node that stays in | 1 (215.3) | 1, 0.05, 0.05 | 14 / 6 / 15 | 2.50 |
| follow, panel shrinks | 26 | 27, **0.88**, 4.72 | 27 / 27 / 26 | 5.83 |
| follow, panel grows | 26 | 26, **0.80**, 5.50 | 26 / 26 / 25 | 5.44 |
| follow, select trigger | 3 (13.5, 138.8, 353.3) | 3, 0.10, 0.24 | 25 / 9 / 24 | 4.09 |
| reclaim in | 27 | 27, **0.94**, 5.30 | 27 / 51 / 27 | 4.47 |
| reclaim out | 25 | 26, **0.59**, 3.61 | 28 / 27 / 26 | 3.96 |
| sweep across 12 seats on a blurred host | 0 | 0 | 66 / 48 / 55 | **4.00** |

- The plate, the glyph, the breath and the focus ring lay out 0 times. Presence lays out in the frame its node is inserted (7.2 ms; the swap's 138 ms is its insertion after the leave), and once more at the end of a plain arrival (222 ms) and of the node that stays (215 ms), where no node is inserted or removed. The press lays out once at the end of its return. Each of these is under 0.1 ms at 1x, but the gate says 0.
- The draw repaints every frame (53 paints), the declared paint leg. The focus ring repaints most frames (33).
- The plate and glyph legs recalculate style on the main thread every frame (25 of 27 frames) while painting twice; the breath, an opacity-only CSS animation, recalculates twice in 1.1 s. So Chromium keeps the breath off the main thread and does not keep the hover legs off it. What separates them was not isolated (the hover legs use the `linear()` spring curve and individual `scale`; the breath uses neither).
- The longest task inside a hover across twelve seats on a blurred host at 4x is 4.00 ms, at the 4 ms target. A single hover in reads 5.48 ms, which includes dispatching the input event. WebKit: unmeasured.

## The owed readings

**1. Follow's layout, at 4x CPU, Chromium.** Budget 1 ms a frame.

| case | layouts | longest | per frame | verdict |
|---|---|---|---|---|
| a 50-row panel (stand-in for the command dialog), shrinking to one row | 27 in 26 frames | 0.88 ms | one each | within |
| the same, growing back | 26 in 25 frames | 0.80 ms | one each | within |
| an error line in a twelve-field form, in | 27 in 27 frames | 0.94 ms | one each | within, by 0.06 ms |
| the same, out | 26 in 26 frames | 0.59 ms | one each | within |
| a select trigger whose value changes | 3 | 0.10 ms | none tweened | **follow never runs** |

**Follow does not work with a swap inside the box.** On the select trigger the wave composes `<Presence swap>` on the text with `follow()` on the trigger. `follow()` measures after Vue's next tick, but `mode="out-in"` keeps the old text in place until its leave ends, so the box has not changed when it is measured and `follow()` returns. The new text is inserted after the leave (Chromium at 138 ms, WebKit by 164 ms) and the trigger jumps from 102.9 px to 192.3 px wide in one frame, pushing its neighbour 89 px. Same in both engines, every width and theme. The measure has to be taken at the insertion (Vue's `onBeforeEnter`), not before the change. The command panel and the form are within budget, so item 1 strikes neither follow nor reclaim, but the third case fails on mechanism, not on cost.

**2. The plate on a blurred host.** Above: 0 layouts across twelve seats on `glass-floating`, the longest task 4.0 ms at 4x, 48 paints in 55 frames during the sweep. The two legs are not kept off Chromium's main thread (style recalcs each frame). WebKit: unmeasured.

**3. Leaving a breath.** It jumps, in both engines, in different ways. Wall clock, the plate's `::before` opacity, the last frames of the breath then the first frames after the attribute drops:

| | before the drop | after |
|---|---|---|
| Chromium, `data-idle` | 0.356, 0.360, 0.362 | 0, 0, 0 |
| Chromium, `aria-busy` | 0.501, 0.497, 0.493 | 0, 0, 0 |
| WebKit, `data-idle` | 0.348, 0.355, 0.362 | 0, 0, 0 |
| WebKit, `aria-busy` | 0.458, 0.452, 0.446 | **0.601**, 0.536, 0.313, 0.123, 0.042 |

Chromium starts no transition when the animation is removed, so both cut to nothing. WebKit cuts the idle breath too, and fades the busy one from the busy state's own value (1), so the plate brightens by 0.15 in the first frame and then fades. The entry jumps as well: entering busy, Chromium's breath begins at the busy state's value (1, from 0, in one frame); WebKit's begins at 0.06. **The rule's premise (the transition starts from the animated value) holds in neither engine, so the breath needs another form.**

**4. A swap's hand-over.** Play to Pause, wall clock: neither engine ever paints a frame with neither node in the document, and the two marks are never both above 0.05 opacity. But the seat is visibly empty between them: both marks are below 0.05 from about 105 ms to about 155 ms in Chromium (the old mark's last 0.0003 at 132 ms, the new one at 0 for two frames, 0.23 at 156 ms), and from about 125 ms to about 200 ms in WebKit (0.014 at 141 ms, the new mark at 0 at 164 and 182 ms, 0.46 at 203 ms; `strips/webkit/l1440/presence-swap.png`). A second toggle at 60 ms does not turn the swap round: the leaving Play fades fully out and then fades back in, 250 ms for a change that undid itself. So "a leave at 60 ms continues from the value on screen" holds for the plate and the glyph (one declaration, reversed in place) and not for a swap.

**5. The inner group.** The sun's rays, a `<g>` with `transform-box: fill-box` and an individual `rotate`, turn about their own centre in both engines: the centre stays at (256, 308) at every seeked frame while the angle runs 0 to 27.8 degrees (45 times the 0.618 weight). WebKit: same.

**6. Amounts, as strips for the owner** (`prototype/strips/`):

- The plate at 0.876 on a 44 px seat: `chromium/l1440/plate-hover-seat44.png`; on the bar: `icon-bar-vs-owner-chromium.png` and `icon-bar-vs-owner-webkit.png`. The plate reads 0.8764 at rest, 2.7 px a side on 44 px.
- As a fill on a row: `*/l1440/plate-hover-row.png`.
- The glyph's grow at 16 and 24 px, both themes: `*/l1440/plate-hover-g16.png`, `plate-hover-g24.png` and the `d1440` pair. The grow reads 1.0494 (half a pixel a side at 20 px, 0.6 px at 24). In the strips it is barely there; OQ-4's question stands, and the strips are its evidence.
- The draw's gap on an easing curve: `*/l1440/glyph-draw.png`.
- The press at 0.97: `*/l1440/plate-press.png`.
- A busy Button with no ring: `*/l1440/plate-busy.png`. The label holds; the plate's breath is the whole mark.

**The owner's frame beside this bar** (`prototype/icon-bar-vs-owner-chromium.png`): his frame's hovered plate is the full peach (#ffdcc3); this plate at `--fill-hover` over `--fill-selected` is 5 % of its tone, and in light mode it reads as a faint smudge next to his. That is the wave's strength as written, shown as it is.

**7. Follow, interrupted at 80 ms.** The panel was shrinking from 372 px; at 80 ms the query was cleared. Chromium: 210.4, 190.1, then 194.4, 205.0, 219.1 px: the box turns round from the size on screen, with no jump, and the turn shows as a kink (its speed goes from about 20 px a frame shrinking to 4 px growing). WebKit: 222.3 then 238.9 px, the same shape at 50 Hz. On the select trigger nothing is interrupted, because nothing runs (item 1).

**8. Bytes.** In the first table: the three partials 1151 B gzip; `./motion`'s growth 941 B gzip at most. With a tenth added, G-BYTES's two ceilings become about 1.3 KB and 1.04 KB; the script's reading already sits at 94 % of today's 1 KB estimate.

## G-PRM

Under `prefers-reduced-motion: reduce`, at 1440 light, both engines read alike:

- Every plate, presence, swap, reclaim and focus cell fades its opacity (or `outline-color`) over 100 ms (`--duration-instant`) at seven sampled values. No scale, translate or rotate takes more than two values. No animation loops: the idle and busy breaths do not run.
- Every glyph verb stays still: grow, nudge and turn multiply `--motion-weight`, which is 0.
- **The chevron's flip turns 180 degrees in one frame with no fade.** `--glyph-flip` is not scaled by the weight (by the wave's text), and the glyph has no colour leg, so the change paints differently at its two ends with nothing at three values.
- The draw's offset jumps 0 to -1.3 in one frame, which paints the same at both ends, so it passes.
- The press still shrinks to 0.97, in one frame: `--scale-press-sm` does not multiply the weight. The plate's fade carries it.
- **Follow and reclaim land in one frame, and their content does not fade:** the 50 rows become one row with no fade, because the rows are not presence nodes. Reclaim's line does fade (100 ms); the fields below it move in one frame.
- The authorized-table surfaces were not built (above).

## What fails, as it is

1. **Leaving a breath** (item 3), both engines; entering busy also jumps in Chromium. The breath needs another form.
2. **G-NEST**: an ancestor's `:hover` is not reset by the inner control's `--intent`; the outer plate and glyph answer the inner hover, in both engines.
3. **Follow with a swap inside the box** (item 1, the select trigger): `follow()` measures before the out-in insertion and never runs; the trigger jumps 89 px.
4. **A tap in WebKit paints no press plate** at 390 coarse: no `:active` without a touch listener, and the plate has none.
5. **A swap toggled back at 60 ms** plays its whole leave and a new arrival; the seat is empty for about 50 ms (Chromium) to 75 ms (WebKit) in each swap.
6. **Under reduced motion**: the chevron's flip is a cut, the press is a 3 % jump, and follow's content does not fade.
7. **G-COST's layout clause**: presence lays out once after its arrival and the node that stays lays out at the end of its change; the press lays out at the end of its return. Each is under 0.1 ms at 1x and 0.9 ms at 4x.
8. **Chromium keeps the hover legs on the main thread** (a style recalc each frame); only the breath is off it.
9. **The gates' own instruments:** G-CLOCK's `\b` does not match on this git; G-BARE's 48-of-255 threshold cannot see a pressed plate at `--fill-selected` (28); the G-TWEEN step clause passes any leg that follows its own curve, including the 34 % and 39 % one-frame steps of the 0.12 s fades and the 7 px last step of a long follow.
10. **The plate's strength** next to the owner's frame (item 6).

Not measured: shipping Safari; WebKit layout, paint and frame time; the eleven census rows of "Where glass uses the pieces" and the twelve-plus authorized-table surfaces; G-BYTES's boot-graph clause and G-EXPORT's consumer install; the text Button's underline; G-CUT and the 12.0.0 rows beyond the press.

## Notes on the helper

The sampler needed four fixes before its readings were sound, each now in `src/testing/no-snap/index.ts`:

- An animation is matched to a target by element and pseudo-element, not by its printed name.
- A CSS animation's easing lives on its keyframes, not its effect, so `getComputedTiming().progress` is linear for it. The eased progress is read from a hidden probe animation that carries the same timing.
- A transition that an animation replaces is cancelled under the sampler; WebKit throws on seeking it, so cancelled animations are skipped.
- Colours are compared alpha-premultiplied, and a spatial end state is not judged while its node is invisible (the node that stays resets its 4 px after its fade).

A seek to an animation's exact end time reads its after-phase (an unfilled Web Animation is back at its natural size), so the last sample is taken 0.01 ms inside the end.

The worktree is left in place at `.claude/worktrees/bl/intent/proto` (with a `node_modules` link to the main checkout's), and nothing listens on 5371 or 5372.
