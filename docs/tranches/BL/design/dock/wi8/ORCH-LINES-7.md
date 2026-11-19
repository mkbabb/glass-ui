# The orchestrator's lines on RULINGS-7 (2026-11-17). BINDING for the eighth pass.

RULINGS-7 asks three things of the orchestrator ("Asked of the orchestrator"). ORCH-LINES-6's lines 1 and 2 stand as written; lines 3 and 4 are restated here.

## 1. G-16 is read on the consumer fixture (line 3, restated)

The dock entry's gzipped size is what the build emits, not what a site pays: code split differently between chunks moves the entry without moving a byte a visitor loads. G-16 is RU-77's consumer fixture as amended: a page that imports the dock parts the sites use and the menus they hold, built against v11.0.2 and against the merged build, its total gzipped JS no larger than v11.0.2's. The entry, the closure and the union closure are reported beside it. Both plants (one that adds bytes the fixture loads, one that adds bytes only an unused export carries) are run, and only the first may turn it red.

## 2. The dock lines are code lines, at or under v11.1.0's, and a red is NOT READY (line 3, restated)

The owner's founding words for this redesign are "Dock seems like a mess with all of this complexity." A count that passes by deleting prose does not answer them, and neither does a bound that moves when the code grows. So:

- A line counts as code unless it is blank or its first non-blank characters open or continue a comment; a trailing comment counts as code. `wc -l` is reported beside it.
- The bound is v11.1.0's code count in `src/components/dock` (4,741, by RULINGS-7's count), read on the merged tree.
- Over the bound is NOT READY, as line 3 says of every budget. The bound does not move. The eighth pass reads the count after the merge and after reconciling the 11.1.0 hunks the redesign supersedes (`run.css`, `morph.css`, `useDockState.ts`, `dockMorphMeasure.ts` with the morph). If it is still over, the measuring seat lists the code that could go (by file and line count, `useDockBody.ts` first) and the next ruling round chooses from that list; no seat removes behaviour to meet the count without a ruling.

## 3. The plate is picked by RU-67's rule (line 4, restated)

Line 4 had the plate take the first rung that passes G-15, from the glass end. RULINGS-7 shows G-15 passes no rung in both engines; it excludes rungs and cannot pick one. RU-67's rule stands in its place: light takes level 1, and dark takes the level at which the dark dock hides as much of a patterned page as the light dock does, read on the grid ground (H6), both engines, with today's dock from v11.0.2's tree beside it. Dark 0.7 holds until H6 reads. G-15 still excludes: a rung that fails it is not taken, and if the rung RU-67 picks fails G-15, the pass reports that and question 21's default applies (keep the dock glass and the words readable, the selected patch fainter).

## 4. The dock's corner is one value on every frame of a morph, for every shape (added 2026-11-18, corrected 2026-11-19 by atlas's G1)

atlas's first reading (the open rail turning elliptical) took `border-radius` without the morph's scale. Read with it, the pill is round on every frame (0 unequal frames in 105, 107, 175 and 380 across four moves): the counter-scale for `.shape-pill[data-morphing]` works, and nothing on the pill needs curing. The ellipse the owner saw was atlas's own (the full stadium on a large open rail, cured on atlas's side through `--radius-dock`). The fault that does exist is in `shape="card"` and `shape="rounded"`: their x and y radii differ in up to 50 of 370 frames of a morph (worst 104 by 26.5 px), because the counter-scale does not reach them (`shell.css`, about lines 420 to 460 at 943fe6e9d), and a collapsed disc of either shape is a square with 16 px corners (`sci-report/atlas/docs/tranches/U/design/OWNER-1117-GLASS-ROWS.md`, G1 as corrected; no atlas page uses either shape).

- The SOURCE seat reads `card` and `rounded` through a morph on the merged tree, in Chromium 1440 light (one run), the corner read with the morph's scale. If x and y differ on any frame, extend the pill's counter-scale to both shapes so that each frame's corner is one value. Witness RED on v11.1.0's tree and GREEN on the tip, both engines. If the redesign has removed the morph that shows it, record that and stop the item.
- Whether a collapsed `card` or `rounded` dock should be a disc or keep its corner is a look the rulings have not chosen: record the reading and leave it for the next ruling round.
- The MEASURE seat reads the same cells in both engines, both schemes.
- This is not a redesign: no ruling changes.

## The owner's questions

Questions 10, 12, 14 and 18 to 21 carry their defaults; the work goes on with them, and each answer the owner gives replaces its default.

## The step-10 messages

Booked now: atlas (sci-report-b0), Gregg (sci-report-87), value.js and daraksha (value-js-15), gaggle (gaggle-ff), Home Assistant (hassio-config-c8). fourier, speedtest, slides and keyframes have no live session; their drafts are owed and go out when one appears, and all of them again before the tag with the final numbers.
