# W-I.8: the second challenge

The challenger, claude-fable-5-2, 2026-11-15. I wrote none of the spec, the rulings, the prototype or the measurement.

**What I read.** `waves/W-I.8.md` in full; `RULINGS-2.md`; `MEASURE.md` (the third pass, on `1138eb94f`); `fold.md`; `OWNER-READ.md` and its two strips; both `INPUT-*.md`; `motion-canon.md` (P0, P0a), `restraint.md` and `affordance-map.md` for their dock lines. In the worktree `.claude/worktrees/bl/dock/wi8` at `a8bab4d45`: `useDockBody.ts` in full, `ControlsDock.vue`, `DockOutlet.vue`, `dockRegistry.ts`, `DockCrossfade.vue`, the clock's pointer and tap handlers in `useDockState.ts`, `styles/dock.css`, `morph.css`, `layers.css`, `density.css`, the overlay participation calls, and `judge3.mjs`, `sampler.js`, `gen3.mjs` and `dock-wi8.vue` in the harness.

**What I ran.** No browser and no build. I read the third pass's gzipped rows (`measure/rows/p3/`) with a few lines of node, through `guarded --light`. Every number below marked *rows* is from those files, named by cell. *Source* is a file and line in the worktree. Paths under `measure/` are relative to `docs/tranches/BL/design/dock/wi8/` in the worktree.

**How each finding was judged.** Once on reading, then again against the row, the strip or the source line. A finding I could not read back is not here, or is marked *by reading* with what would settle it.

## What held

Said first, so the rest is in proportion.

- **The pill's fold and unfold are one shape on one clock.** In `p3-fold-pill-fine` and `p3-fold-layers-fine`, both engines, the plate's corner is half its painted cross extent in every row, and width and height move at the same fraction (layers, WebKit, first moving row: width 2.7 % of its travel, height 2.8 %). No row has a flat end or a square. The owner's "a square and then to a circle" is not in these rows.
- **The ends.** The row before the first moving row is the rest exactly; the plate is within 0.5 px of its rest about 270 ms after the cause; the pass of the rest is 0.44 px on a 152 px travel.
- **The fades inside one travel** step 0.20 to 0.26 between 60 Hz samples, as MEASURE says.
- **A press outside, Escape by layer, the linger and its growth, the scroll under a still pointer** read as the spec says in the clock log.

## The findings

Ordered by what the owner would see first. Each has its evidence, why the gate did not catch it, and the smallest change that would.

### C2-1 · A worded folded face cannot be built: it is forced into a 52 px circle

- **Evidence (rows, source).** The sci-report cell's folded face is `<span class="px-2 text-small">Filters · 3</span>` (`harness/dock-wi8.vue:497-504`). At collapsed rest its plate is 52 by 52 and its summary 44 by 44, in both engines, fine and coarse (`p3-fold-sci-*`). The words are wider than 44 px. The cause is `styles/morph.css:198-217`: the summary has a fixed block size, a `min-width` of the same token and `aspect-ratio: 1`, with the comment "guarantees 1:1 even if a consumer's collapsed-slot content is wider than the floor".
- **Whom it breaks.** Gregg's filter docks, which R-12 and the consumer half describe as "its words in `#collapsed`". They are the owner's "incorporate more glass-ui docks into the filters, etc, with collapse state". As built they need local CSS.
- **Why the gate passed.** G-2 reads the summary as one unit inside the plate's box. Nothing reads whether the summary's own content fits it.
- **The change.** A folded face with words is a stadium as wide as its words, a circle only when it holds one glyph. R-12's "Folded it is one seat, a circle" needs that clause, the summary rule loses `aspect-ratio: 1` for a non-glyph child, and G-2's sci-report cell reads the text's box inside the summary.

### C2-2 · The one-seat controls dock is not a circle at a fine pointer

- **Evidence (rows).** `p3-ctl1-fine`, both engines: the rest plate is 48 by 52, the seat 40 by 40. At 390 coarse it is 52 by 52 with a 44 px seat. The owner's rule is "a one-seat collapsed dock a circle", R-1 says "a one-seat dock is a circle", and G-2 says "its one-seat form is a circle within 0.5 px". MEASURE lists the cell as passing.
- **A second reading in the same rows.** At a fine pointer every controls dock has 40 px seats in a 52 px rest (`p3-fold-ctl-*-fine`, `p3-fold-sci-fine`), so the end seat sits 4 px from the end and 6 px from the top and bottom: the seat's circle and the dock's end cap are not concentric. R-12 says "a 52 px rest height with 44 px seats".
- **Why the gate passed.** The cell is judged "no travel", and no clause compares the plate's two extents.
- **The change.** The preset's seat size and rest height agree at every pointer (44 in 52, or 40 in 48), and G-2's one-seat clause is computed: width equals height within 0.5 px.

### C2-3 · A return mid-swap is not an inversion: the face jumps and then stalls

- **Evidence (rows).** R-3 says "A return mid-travel inverts `e` or `f` where it is and never restarts it."
  - `p3-swap-return-30`, WebKit. Row 8 (132 ms): the face being returned to paints at opacity 0.20 at x 677.64, y 168.72. Row 9 (151 ms): the same face, still 0.20, paints at x 670.01, y 159.56. It moved 7.6 px sideways and 9.2 px up in one row. It then holds 0.20 for four rows (151 to 199 ms) before it rises.
  - The same cell in Chromium: after the return the face returned to stays at 0.00 for 67 ms (149 to 216 ms) while the other decays from 0.19; nothing on the plate is above 0.20 for about 75 ms.
  - Read back and not kept: in `p3-swap-return-60` the face that becomes the leaving one drops its entering translate in the return's row, but its painted place moves 0.01 px (x 679.40 to 679.39), because it is placed where it painted. The jump is the returned-to face's only, and it shows whenever the return comes while that face still has opacity, which is any return in the first 80 ms or so of a swap.
- **The cause (source).** `useDockBody.ts:273-274`: every `exchange()` sets `u = 1; uv = 0`, so the coordinate restarts from rest. The face returned to is given the entering role (`:256-270`), so it takes the 8 px entering offset in one frame (`:686-690`), its out-of-flow placement is removed (`:257`) so it returns to its place in the new layout, and it waits for `f` to pass 0.45 again before its opacity moves.
- **Why the gate passed.** MEASURE: "Passes in both: … a return to the face on screen at 30 and 60 %". The judge reads opacity steps and the blank run under 0.1; it does not read a face's painted position across a mark, and it has no clause for a face that stalls.
- **The change.** Build what R-3 says: a return to a face still tracked inverts `u` where it is (the two roles trade, `u` becomes `1 − u` with its velocity negated), with no new offset and no dropped hold. G-4 gains: across a `return-*` mark no face above 0.1 moves more than 0.5 px in a row, and the face returned to never falls or holds for more than 34 ms.

### C2-4 · A quick third switch still empties the dock for a tenth of a second

- **Evidence (rows).** `p3-swap-xf-fine`, WebKit, the third change at 1712 ms. The strongest face on the plate reads 0.22 at 1697 ms, 0.18, 0.16, 0.12, 0.08, 0.04, then 0.23 at 1799 ms. For about 100 ms nothing in the dock is above 0.23, and the plate is 98 to 106 px wide through it.
- **What MEASURE says.** "The crossfade's blank plate is gone: no run with no face showing passes 17 ms." That is true of the gate as written, which calls a face "showing" at 0.1. A face at 0.12 is not something an eye reads. OWNER-READ tells the owner this fault is "first in the next build"; by the rows it is still there on a fast double change, which is how a person uses a switcher.
- **The cause.** The same restart as C2-3: each change starts a fresh window, so the entering face waits 45 % of a new exchange while every face left from the last one is already weak.
- **The change.** After C2-3's cure, an entering face in a retarget starts its rise at once when no other face is above half strength. And the blank-plate bound is restated to what is seen: the strongest face is under 0.3 for no longer than 50 ms, on any travel, a turn included.

### C2-5 · Every fold and unfold has two frames with almost nothing in the dock, and the gate is sized to miss them

- **Evidence (rows).** `p3-fold-pill-fine`, WebKit, the unfold: faces read (0.43, 0), (0.20, 0), (0, 0.21), (0, 0.42) at 303, 318, 335 and 353 ms. Two 60 Hz frames in a row show nothing above 0.21, on a plate 122 to 142 px wide. `p3-fold-layers-fine`, WebKit: one row with both faces at 0.09.
- **By construction.** The window ends at 0.55, so at the middle each face is 0.09, and the gate's line for "showing" is 0.1. W-I.8 says so itself ("R-3's window gives about 3 ms of it by construction"). One WebKit cell then fails at 19 ms against 17 (MEASURE, `p3-fold-flow-dark`); that is the sampling phase of this same dip, not a fault of the flow cell.
- **What the owner is told.** OWNER-READ: "the dock is never empty and never shows two things at once." The first half is not what the rows show.
- **The change.** P0a's rule 4 allows each mark up to half strength while the other shows. A window ending at 0.7 crosses at 0.29 each, still under half, and the dip goes. It is one constant (`useDockBody.ts:24`). Read it in WebKit against the 0.4 step bound before taking it. Either way, restate the owner's sentence.

### C2-6 · "Rounded" is gated on the number the loop writes, and nothing says what a tall stadium does to its content

- **The corner gate passes by construction (source).** `judge3.mjs:196-221` reads the plate's computed `border-radius` from `sampler.js:86`. The loop writes exactly `min(W, H) / 2` to that property (`useDockBody.ts:495, 614`). The gate compares the loop to itself. It would pass if a child inside the plate painted a square.
- **No pixel was read on this build.** MEASURE: "Strips: none were shot." The owner's complaint was a thing seen, and the one build that changed the corner rule has no picture.
- **A tall pill (rows).** At open rest the layer dock is 259.7 by 108 with a 54 px corner, and its face's box starts 8 px in and 4 px down (`p3-fold-layers-fine`): the corner of the content's box lies 13.9 px outside the curve of the glass. The crossfade dock is 107.7 by 118, almost a circle, with a face whose box corner is 8.2 px outside (`p3-swap-xf-fine`). Whatever a consumer puts in the first or last row's corner is painted past the glass at rest, where nothing clips (`rest()` removes the clip, `:736`), and is cut by the lane's rounded clip during travel (`:628`), so it pops at the landing.
- **Why the gate passed.** "Inside the plate" compares boxes; `sampler.js:100-101` says "Rounding of `round` corners is ignored".
- **The change.** Three things. A crop gate: at five held values of a fold and at both rests, the plate's outline in pixels is a stadium (no flat end, no straight corner), in both engines. A rule in R-1 for a pill taller than one row: either its inline padding grows so the content box clears the curve, or a dock of more than one row is `shape="rounded"` by default and the owner is asked which (his "Rounded." was said of one-row docks and filter pills). And "inside the plate" reads the rounded shape.

### C2-7 · "One shadow" is four box-shadow layers, one of them a white catch-light

- **Evidence (rows, source).** The plate's computed `box-shadow` in every cell is four layers: a 1 px white inset from the top at 0.1, a 1 px dark inset from the bottom, a 1 px dark inset from the side, and `0 0 12px` of `--dock-halo` (`p3-fold-layers-fine`, row 0; `styles/dock.css:96-98`; `tokens/shadow.css:36-37`).
- **The rule.** `restraint.md:50-54`: "No specular highlight … At most one shadow per surface … Check: one `box-shadow` layer per element; no coloured or glow shadows". The outer layer has no offset, which is a glow by shape, and the token's name invites a colour.
- **Why the gate passed.** G-12 asks for "one `box-shadow` value for the plate across both posture classes". It counts declarations, not layers.
- **The change.** Say what it is. If the rim pair is the glass's edge and stays, W-I.8 says "one drop shadow and the rim" and the owner's page says the same; if the owner's "NO overuse of shading" means the check as `restraint.md` writes it, the insets go to the border and the halo takes an offset. That is a question for him with one crop, not a default.

### C2-8 · In a right-to-left page the run is clipped away for the whole travel (by reading)

- **Evidence (source).** The carrier reads direction once, for the entering 8 px (`useDockBody.ts:265`). The regions' order is fixed as persistent, layers, persistent-end from left to right (`:633-668`), and the trailing region is carried by its right edge (`:311`). In a right-to-left dock with a `#persistent` region, the run's lane gets its left bound from the persistent region's right edge and its right bound from the trailing region's left edge, so the lane is inverted and the clip is empty: the run does not paint while `[data-morphing]` is set.
- **Whom it breaks.** daraksha. The consumer half tells it to delete `dir="ltr"` on its dock, and R-14 puts Home in `#persistent` on every standard dock.
- **Why no gate caught it.** No cell is right-to-left (`gen3.mjs` and `dock-wi8.vue` have none).
- **The change.** One cell (the site dock with Home, `dir="rtl"`, a fold and a swap) before daraksha is told anything. The lanes and the carried edge are then computed from painted positions, not from the region's name.

### C2-9 · Touch in Safari's engine is unread: every WebKit "390 coarse" gate cell is a mouse press

- **Evidence (rows).** `p3-fold-pill-coarse`, WebKit: the pointer log's events are `"pt":"mouse"`, and the dock rests `expanded pinned`. The same cell in Chromium logs `"pt":"touch"` and rests `expanded`. The cells drive `{ do: "click" }` (`gen3.mjs:55, 189`), and only the Chromium context is mobile (`probe.mjs:136-137`).
- **What follows.** In WebKit the coarse column of G-2, G-4 and G-10 is a mouse-pinned dock in a narrow window. The "first row 52 ms after the tap" on keyframes's transport is a click. The one touch reading in WebKit is the clock's cell (g). The phone is where Safari matters most, and the fold by touch has no WebKit row.
- **The change.** The coarse cells tap with `page.touchscreen.tap` in both engines, the judge fails a coarse cell whose log has no touch event, and the WebKit coarse column is rerun before any of it is cited.

### C2-10 · Three of the five overlays R-2 names do not hold the dock

- **Evidence (source).** R-2: "every glass overlay whose trigger renders under the dock's context … takes a hold". `SelectContent.vue:101-105` and `DropdownMenuContent.vue:74-78` pass a `close` and no `hold`. `Popover.vue:98` holds only when `keepDockOpen` is set, and it defaults to false. Dialog and Sheet hold (`DialogContent.vue:83-86`).
- **What MEASURE has.** The menu, read in both engines. The Select is listed as unread; by the source it is the same. The Popover cell that held used the prop.
- **Whom it breaks.** Filter docks are made of selects and menus. A consumer who composes one from the API as written gets a dock that folds under its own open list.
- **The change.** The three take the hold by default, and `keep-dock-open` goes (a prop a consumer must know is local knowledge, the thing R-12 removes). G-8's cells for a Select and a default Popover run.

### C2-11 · "One seat never folds" counts the wrong thing

- **Evidence (source).** `ControlsDock.vue:39` counts the run's children that carry the seat attribute, which only `DockControl` and `DockTrigger` set (`DockControl.vue:114`, `DockTrigger.vue:52`).
  - A dock of one button and one slider (the harness's own `w-wide` shape) counts 1, so it never folds, on a phone included.
  - A dock whose one control is a consumer's own element counts 0, so on a phone it folds to a glyph: the wasted press O-357 names.
  - Before mount the count is 0, so a one-seat dock on a phone renders folded and flips open at mount; a server-rendered page paints the glyph first.
- **Also.** It finds the run with `querySelector(":scope > .dock-controls > .dock-layers > .dock-run")` (`:43`). G-7's lookup grep covers only the outlet's two files, so it does not see this one.
- **The change.** Count what the run roves (the run composable already knows its seats and its other children) and read it from the dock's context, not from the DOM. Say in R-12 what a non-seat child counts as.

### C2-12 · A controls dock inside a figure is pushed in by the phone's safe area

- **Evidence (source).** `styles/density.css:418-428`: the four corner rules add `env(safe-area-inset-*)` for every controls dock, and are not limited to `[data-within="viewport"]`. A `within="parent"` dock in a figure on a notched phone sits 34 px further from its figure's bottom edge than its inset. R-12 gives the safe area to `"viewport"` only.
- **Two smaller things in the same block.** The inline-end rule adds the right inset and the inline-start rule the left, whatever the direction. `--dock-corner-inset` is `1rem` (`:408`), where R-12 says "default the site dock's foot offset".
- **Whom it breaks.** atlas's figure docks, fourier's canvas docks, keyframes's code pane: each is `within="parent"`.
- **Why no gate caught it.** The harness has no safe-area inset.

### C2-13 · Escape and `collapse()` are undone by the next pixel of pointer movement (by reading)

- **Evidence (source).** `useDockState.ts:458-472`: while a fold travels, any real pointer move over the painted plate reopens the dock at once. Nothing records that the fold was a dismissal. After the travel, the same move starts the 60 ms intent. So a dock folded by Escape, or by a host's `collapse()` after a seat was pressed, reopens while the pointer that pressed the seat is still on it.
- **Why it is new.** Before RU-3 the intent was armed by an enter, so a pointer that never left armed nothing. RU-3 moved the arming to a move and RU-6 removed the wait mid-fold; together they lose that.
- **Why no gate caught it.** G-1 (h)'s Escape was read with the pointer elsewhere, and `collapse()` did not run.
- **The change.** A dismissal (Escape, `collapse()`, a press on a seat that folds) is not reversed by a pointer that was inside when it happened: that pointer opens the dock again only after it leaves and returns, or presses. RU-6's return is for a fold the linger started. One clock cell for each.

### C2-14 · A page of figure docks: each brush opens one for six seconds

- **Evidence (source).** The controls preset sets `--dock-intent: 120ms` and no linger (`density.css:403-409`), so a figure's dock takes the site dock's 6 s, growing to 12 s. The owner's "should persist a bit" and "increased" were said of the site's dock.
- **What it does.** On a report with six figures, a pointer travelling down the page rests 120 ms on a dock here and there, and each then covers a corner of its chart for 6 s. Several are open at once. That is the "linger that feels stuck", multiplied, and OQ-2 puts only the single-dock brush to the owner.
- **The change.** The preset carries its own linger (a second or two, growing with the visit by the same rule), or OQ-2 is asked with this page drawn. One clock cell with two controls docks on a page.

### C2-15 · O-358 has no ruling

- `INPUT-many-seats-2026-11-15.md` is binding and asks for "one rule, not a per-site choice" for a dock whose seats do not fit at 360 to 390. MEASURE's finding 6 says nothing was built. W-I.8 does not mention it, and R-12 says only that seats that do not fit "are the host's to move into a menu", which is the per-site choice the input rejects.
- **Evidence (rows).** The harness's own site dock at 390 is 374 px wide with its last seat's box 71 px beyond the plate, reached by scrolling (`p3-fold-seat-coarse`): six seats do not fit.
- **The change.** A ruling before the build, with speedtest's tab dock as its cell.

### C2-16 · Pieces the spec deletes are still there, and one gate passes on a name

- **Source.** `DockCrossfade.vue:116` still builds a spring of its own, `:100-107` the reserve, and `:244-247` lands a swap in one frame under reduced motion; all three run when the crossfade is used outside a dock. W-I.8's file table deletes "the crossfade's reserve and its own spring" and `DockCrossfade.vue:218-221`. Outside a dock, reduced motion is still a cut, against P0.
- `composables/index.ts:37-40` still exports `useDockMorphOrchestrator`; `useDockMorph.ts`, `dockMorphMeasure.ts` and `useDockSpring.ts` are on the delete list.
- `hold()` and its `held` branches ship in the body (`useDockBody.ts:101-102, 497, 604, 757-765, 818`). G-12 scans for the string `__dockHold`, which only the window hook carries, so it passes while the mechanism is in the bundle.
- **The change.** Delete or say why not, and G-12 scans for the body's `hold` member in the built script.

### C2-17 · A window resize during a travel lands it in one frame (by reading)

- **Source.** `useDockBody.ts:435-445`: while `resized` is set, every quantity is zeroed. The flag is set by any window `resize` and held for two frames (`:770-783`). iOS Safari fires `resize` when its toolbar hides on scroll, and a person who opens a dock and then scrolls is the common case there.
- **What settles it.** One cell: a resize 100 ms into a fold. R-1's rule ("a window resize seats every quantity") was written for a dock at rest; for a dock in travel the edges should take the new layout as a retarget.

### C2-18 · The window stays open 200 ms after the dock has landed

- **Evidence (rows).** `p3-fold-pill-fine`, Chromium: the fold's cause is at 1112 ms, the plate is within 0.5 px of rest at 1389, and `[data-morphing]` is removed at 1572 or later. The loop parks only when each quantity is under 0.04 px and 3 px/s (`useDockBody.ts:28-29`).
- **What rides on it.** value.js's settle beat waits on `[data-morphing]`. The face with no box keeps its box through the tail. And in the tail a pointer move over the folded circle reopens with no intent wait, as if the fold were still in flight.
- **The change.** Park at 0.25 px, the floor RU-19 already uses for what an eye resolves, and write the rest on that frame.

### C2-19 · The records the owner and the next seat will read are behind the build

- **OWNER-READ's strips.** The swap strip's "after" shows a rounded square with its text cut at the left edge ("urface stack", ":-order"), under a page whose first line is "Rounded, always." It is the first build, and the page says so, but it is the only picture on the page.
- **OWNER-READ's status.** It reports the second build (95 of 105; the crossfade empty for a tenth of a second; the scroll unread in Safari's engine). MEASURE is the third.
- **W-I.8's table** is P2, and its rulings still say "Not built" of the dialog's hold and of the face with no box, both of which MEASURE reads as built.
- **The change.** One pass over the three before anyone outside the loop reads them, with two new strips (a fold and a swap) shot on the build that is described.

## The consumers, one line each

| consumer | can it be composed with the API as written and no local CSS? |
|---|---|
| Gregg's filter docks (sci-report) | No. The worded folded face is forced into a circle (C2-1); selects and menus do not hold the dock (C2-10); a figure's dock lingers 6 s over the chart (C2-14) |
| atlas's figure dock | Not on a phone: the safe area pushes a `within="parent"` dock in (C2-12). Its phone sheet is still unread, as MEASURE says |
| atlas's rail | The card fold passes in the rows. Nothing found beyond MEASURE |
| fourier's canvas dock | As atlas's figure dock (C2-12). The fold with Edit in `#persistent-end` passes in the rows |
| keyframes's code-pane dock | As above (C2-12). Its transport's "tap" reading in WebKit is a click (C2-9) |
| daraksha's controls dock | Not if any of its pages is right-to-left (C2-8). A page whose one control is its own element folds to a glyph (C2-11) |
| speedtest's tab dock | No rule for seats that do not fit (C2-15) |

## More than Apple would use

- The four shadow layers (C2-7).
- The parts that are specified and still shipped though the spec deletes them (C2-16).
- I looked for a second motion on any one change and found one only as a fault: the 8 px entering offset replayed on a return (C2-3). On a plain layer change the 8 px is one translate on one element and I would keep it.
- The published token is named `--dock-halo`. A halo is the thing `restraint.md` forbids. If the token stays, a plainer name costs nothing now.

## What I did not check

- Real Safari, a phone, and any pixel: I launched no browser.
- G-11's cost beyond MEASURE's own lines. Every cost number is desktop headless; a phone's is unread.
- C2-8, C2-13 and C2-17 are by reading the source. Each names the one cell that settles it.
- The unit specs and the release specs.
