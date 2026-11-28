# DataTable and Dialog for atlas: the readings (O-429 GL-5 (a), (b), (d) and GL-10)

Seat: claude-opus-5-5 (asserted from its own system identity), BUILD round 2, 2026-11-27. It continues round 1 (2026-11-24) and a first round-2 attempt that edited the cure tree on 2026-11-24 and 25 and stopped before any run. Those edits were kept and judged; this seat added the row change and its test (§6), rebuilt the witness's step rule, and ran every reading again on one probe version. The design is `DESIGN.md`; the note is `NOTE-atlas.md`; the critic's round-1 record is `critique-sci.md`. Round 1's data files are in git (fe281d921); the files in `tools/data/` are this round's.

**Builds.** RED is release/11.1.1 at e12ad9f02 (`trees/r2-base`; its `src/`, `tests/` and `demo/` are byte-identical to b9b96cb76, round 1's base, and to a fresh `git archive` made today). GREEN is RED with `cure.patch` (`trees/r2-cure`). Each tree is a `git archive` with `node_modules` linked to the main checkout, built with `tools/harness/build-tree.sh` (the demo's own build, with the witness page at `/?am=<mode>`), served by `vite preview` on 5371 and 5372, and driven by `tools/harness/run-round.sh`.

**Engines.** Playwright's Chromium headless shell 149.0.7827.55 and Playwright's WebKit 26.5, which is not Safari. Desktop contexts at 1440 × 900 and 390 × 844, with mouse and wheel input. No phone, no touch, no screen reader. One browser per run, a new context per cell, every run under `guarded`, the WebKit runs under the machine's exclusive WebKit lock. The machine was shared and loaded: the 1-minute load ran 22 to 37 through the runs, and Chromium's headless shell often painted at 15 to 20 frames a second.

**The witness.** `tools/harness/probe.mjs` (cells and verdicts in its header), the page `tools/harness/app/Page.vue` with atlas's virtualizer copied into `app/atlas/`, the data `tools/data/{chromium,webkit}-{base,cure}.json`, and the tables below printed by `node tools/harness/readings.mjs tools/data`.

## Verdict

- **The table half holds as in round 1**, in both engines and at both widths: the header and the first column stick inside the table's own viewport, the cards keep the table's role in the accessibility tree, `fit` keeps the 2,897 px table inside the 1,202 px viewport, and the caption and row header name what they head.
- **B-2 is cured.** With atlas's own `useVirtualWindow` reading `viewportRef`, 300 cards in a 344 × 600 host hold a 32,850 px scroll range (the virtualizer's total), a 4,000 px wheel lands at 4,000, five cards are mounted, none overlap, and the 8 px gap holds. With the list's flex shrink given back (the control, the list as round 1 left it), the list takes the host's 600 px, the scroll range is 3,912, and the same wheel stops at 1,632.
- **B-1 is cured.** Every step between two painted frames is judged, with no exemption beside a long frame, against what one 60 Hz frame of the clock in play can move (computed in the page from glass's own rows). On the cure no step in any Dialog cell exceeds it, in either engine, including the heavy cells: atlas's plate size, a body that mounts 100 ms after the click with a 90 ms task, a 120 ms task in the entrance and another in the close. On atlas's plate the largest step a long frame's tick makes in the entrance is 68.5 px of centre across a 91 ms frame in Chromium (0.817 of the bound) and 78.3 px across a 105 ms frame in WebKit (0.934); the largest step of all is the spring's own at its peak speed on an ordinary frame (81.5 and 83.0 px). The critic read 180 px and 291 px on round 1's cure. On 11.1.1 the same rule fails without any injected task: the in-place bloom's opacity steps 0.34 across one 34 ms Chromium frame, against a bound of 0.17, which is the same unbounded clock.
- **B-3 is cured in the contract and the note.** A Dialog opened with no origin, as a deep link opens it, blooms in place on the cure in both engines: its centre never moves and it fades in from 0. 11.1.1 blooms in place too; its WebKit cell reads RED only by the step rule (one opacity step of 1.066 of the bound, across an 18 ms frame).
- **The cost of the bound is time on a slow machine.** The spring's clock is 0.8 s at 60 Hz. On the loaded machine the cure's entrance on atlas's plate took 3.3 s in Chromium, which painted at 15 to 20 frames a second, and 0.9 s in WebKit, which painted near 60.
- **Unit tests.** The 16 new and changed tests fail on 11.1.1 and pass on the cure; the touched suites pass on the cure (22 files, 177 tests); the whole suite fails the same 46 tests on both trees (the sparse tree's environment), and the cure adds 14 passing tests. `src` type-checks.
- **The patch** (+1,188 −252 over 18 files) applies to release/11.1.1 and reproduces `trees/r2-cure` byte for byte. Against 11.1.1 with the 11.1.2 lane's patch applied first, every hunk applies except the one context hunk round 1 named (§7).

## 1. The verdicts

| cell | Chromium base | Chromium cure | WebKit base | WebKit cure |
| --- | --- | --- | --- | --- |
| sticky-1440 | RED | GREEN | RED | GREEN |
| sticky-390 | RED | GREEN | RED | GREEN |
| fit-1440 | RED | GREEN | RED | GREEN |
| cards-table-390 | RED | GREEN | RED | GREEN |
| cards-grid-390 | RED | GREEN | RED | GREEN |
| vcards-390 | RED | GREEN | RED | GREEN |
| vcards-shrink-390 | RED | RED | RED | RED |
| dialog-1440 | RED | GREEN | RED | GREEN |
| dialog-390 | RED | GREEN | RED | GREEN |
| dialog-heavy-1440 | RED | GREEN | RED | GREEN |
| dialog-heavy-390 | RED | GREEN | RED | GREEN |
| dialog-deep-1440 | GREEN | GREEN | RED | GREEN |
| dialog-rm-1440 | GREEN | GREEN | GREEN | GREEN |

`vcards-shrink-390` is the control: it gives the card list back the flex item's default shrink, and reads RED on the cure as round 1's cure did. `dialog-deep-1440` and `dialog-rm-1440` guard behaviour 11.1.1 already has (the in-place bloom with no origin, the fade under reduced motion); the cure keeps both. 11.1.1's deep cell reads RED in WebKit by the step rule alone: its bloom stays in place, and one opacity step is 1.066 of the bound (§4).

## 2. Sticky: a 2,897 px table, 20 columns and 120 rows, in a 480 px tall region (1,202 px wide at 1440, 344 at 390), after a wheel of 1,500 down and 800 across

| run | cell | table px | viewport top / left | host top | page y | head top | corner top, left | row's first cell left | on top: head, column | ground α head, column (rest) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | sticky-1440 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| chromium-base | sticky-390 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| chromium-cure | sticky-1440 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| chromium-cure | sticky-390 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| webkit-base | sticky-1440 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| webkit-base | sticky-390 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| webkit-cure | sticky-1440 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| webkit-cure | sticky-390 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |

The ground on the cure is `--card`, `rgb(253, 245, 236)` in light, and transparent at rest. The page sizes its columns by class as well as by `width`, so 11.1.1, which has no `width`, lays out the same 2,897 px table.

## 3. Fit, the cards and the virtualized cards

**Fit at 1440** (lead 16 rem, 19 columns at 139 px, expected 1 + ⌊(1,202 − 256) / 139⌋ = 7):

| run | header columns | expected | client / scroll width | folded |
| --- | --- | --- | --- | --- |
| chromium-base | 20 | 7 | 1202 / 2897 | none reported |
| chromium-cure | 7 | 7 | 1202 / 1202 | m7 m8 m9 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 |
| webkit-base | 20 | 7 | 1202 / 2897 | none reported |
| webkit-cure | 7 | 7 | 1202 / 1202 | m7 m8 m9 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 |

**The cards at 390** (a 344 px region, 6 rows, 5 columns, a caption, the first column `rowHeader`; `cards-grid` adds `tabbableRowId`, which makes the table a grid). Chromium's tree is read over CDP (`Accessibility.getFullAXTree`); WebKit's is not reachable from Playwright, so its cell reads Playwright's ARIA snapshot (`Element.computedRole` is not exposed in this WebKit).

- **chromium-base, cards-table-390**: role `none`, name null, ignored true, 0 rows; header []; first row [].
- **chromium-base, cards-grid-390**: role `none`, name null, ignored true, 0 rows; header []; first row [].
- **chromium-cure, cards-table-390**: role `table`, name "Schools by district", ignored false, 7 rows; header [columnheader columnheader columnheader columnheader columnheader]; first row [rowheader "District 1", cell "East", cell "74", cell "111", cell "148"].
- **chromium-cure, cards-grid-390**: role `grid`, name "Schools by district", ignored false, 7 rows; header [columnheader columnheader columnheader columnheader columnheader]; first row [rowheader "District 1", gridcell "East", gridcell "74", gridcell "111", gridcell "148"].
- **webkit-base, cards-table-390**: `- text: District 1 / - term: Region / - definition: East / - term: Students / - definition: "74" / - term: Funded / - definition: "111" / - term: Share / - definition: "148" / - text: District 2 / - term: Region / - definition: West / - term: Students / - definition: "148" / - term: Funded / - definition: "222"` …
- **webkit-base, cards-grid-390**: `- text: District 1 / - term: Region / - definition: East / - term: Students / - definition: "74" / - term: Funded / - definition: "111" / - term: Share / - definition: "148" / - text: District 2 / - term: Region / - definition: West / - term: Students / - definition: "148" / - term: Funded / - definition: "222"` …
- **webkit-cure, cards-table-390**: `- table "Schools by district": / - caption: Schools by district / - rowgroup: / - row "District Region Students Funded Share": / - columnheader "District" / - columnheader "Region" / - columnheader "Students" / - columnheader "Funded" / - columnheader "Share" / - rowgroup: / - row "District 1 East 74 111 148": / - rowheader "District 1" / - cell "East" / - cell "74" / - cell "111" / - cell "148"` …
- **webkit-cure, cards-grid-390**: `- grid "Schools by district": / - caption: Schools by district / - rowgroup: / - row "District Region Students Funded Share": / - columnheader "District" / - columnheader "Region" / - columnheader "Students" / - columnheader "Funded" / - columnheader "Share" / - rowgroup: / - row "District 1 East 74 111 148": / - rowheader "District 1" / - gridcell "East" / - gridcell "74" / - gridcell "111" / - gridcell "148"` …

**Virtualized cards at 390** (B-2). 300 rows of 20 columns in a 344 × 600 host, `responsive`, `role="grid"`, atlas's `useVirtualWindow` (lv-atlas da0528f, copied with its import paths changed and an 8 px gap added to each measured size) reading `viewportRef` and observing each card through `rowRef`, atlas's row attrs (`aria-rowindex`, `translateY(top)`), and the note's rules: the list `position: relative; block-size: var(--source-total-size)`, each card `position: absolute; inset-block-start: 0; inline-size: 100%`. Read after a 4,000 px wheel over the host. The total grows as cards are measured, so it reads 15,000 (300 estimates of 50 px) on 11.1.1, where no card is ever measured.

| run | cell | viewport is the cards | list flex | list block / total | scroll height | scrollTop after a 4,000 wheel | host scrollTop | mounted (rows) | gap min / max | overlaps |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | vcards-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| chromium-base | vcards-shrink-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| chromium-cure | vcards-390 | true | 0 0 auto | 32850.0 / 32850.0 | 32850 | 4000.0 | 0 | 5 (8–12) | 8.0 / 8.0 | 0, 0 |
| chromium-cure | vcards-shrink-390 | true | 0 1 auto | 600.0 / 32850.0 | 3912 | 1632.0 | 0 | 6 (3–8) | 8.0 / 8.0 | 0, 0 |
| webkit-base | vcards-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| webkit-base | vcards-shrink-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| webkit-cure | vcards-390 | true | 0 0 auto | 32850.0 / 32850.0 | 32850 | 4000.0 | 0 | 5 (8–12) | 8.0 / 8.0 | 0, 0 |
| webkit-cure | vcards-shrink-390 | true | 0 1 auto | 600.0 / 32850.0 | 3912 | 1632.0 | 0 | 6 (3–8) | 8.0 / 8.0 | 0, 0 |

On 11.1.1 there is no `viewportRef`: the virtualizer never gets a viewport and mounts no card. On the cure the list holds the total and the wheel reaches 4,000. In the control the list keeps the host's 600 px, the scroll range is only the mounted cards and the space after them, and the wheel stops short.

## 4. The Dialog

A 160 × 40 button at (40, 60) at 1440 and (24, 120) at 390 opens a Dialog with `:origin` set to that button (`dialog-deep-1440` opens it from script with no origin). The plate's rect and opacity are sampled on every animation frame from the open until the plate leaves the DOM. The close waits until the plate is at rest (its last ten frames within 0.5 px and 0.002 of opacity, the mount spring's own settle band), at most 10 s. "Centre" is the plate centre's distance from the opener's centre as a fraction of the opener-to-rest travel (705 px at 1440, 296 at 390).

**The step rule.** The frame is linear in the mount position `p`: the centre moves `p`·travel, the width (w_rest − w_opener)·`p` from an origin or 0.05·w_rest·`p` in place, the opacity 1 − `p`. So each channel's step between two frames is the position's step times a fixed length, and one 60 Hz frame of the clock in play bounds it. The page computes each bound from glass's own rows (`springPreset`, `readExitClock`, `motionTempo`), as the largest change of `p` over one 16.7 ms step:

| clock | largest step of p in one 60 Hz frame |
| --- | --- |
| `panel` spring (the entrance from an origin) | 0.1185 |
| `present` spring (the entrance in place) | 0.1712 |
| `panel` exit clock (the close from an origin) | 0.0762 |
| `present` exit clock, 1.5 times (the close in place) | 0.1057 |
| `panel` held fade (reduced motion) | 0.0952 |
| `present` held fade (reduced motion) | 0.1057 |

The entrance is judged against its spring row (`panel` when the plate travels, `present` in place), the close against the row's exit clock, and the reduced-motion fade against the larger of the two held clocks. "Over" is a step's share of what the bound allows (with 0.5 px and 0.002 for rounding); 1 is the bound. Every pair of consecutive frames is judged. The sampler's callback runs before the spring's in each frame, so a sample shows the position one tick late: the step between samples *i* and *i*+1 is the tick across the frame before sample *i*. In the table a step's ms is the gap between its two samples, and its tick crossed the frame before them; the list after the table pairs each long frame with the step its tick made.

| run | cell | row | mount: centre of travel, opacity | first painted | last painted: centre, opacity | open rebound w, h px | close monotone | worst step open (over, ms, centre px, width px, opacity) | worst step close | frames over 34 ms open, close | longest frame open, close | entrance: frames, ms | frames open, close |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | dialog-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.024 | 0.0, 0.0 | true | 1.982, 8.4, 0, 8.79, 0.3432 | 0.979, 25.8, 0, 2.7, 0.1055 | 7, 6 | 91.7, 83.3 | 17, 376 | 64, 14 |
| chromium-base | dialog-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.058 | 0.0, 0.0 | true | 1.954, 8.2, 0, 5.92, 0.3384 | 0.972, 8.3, 0, 1.83, 0.1047 | 0, 0 | 33.7, 17.2 | 27, 300 | 108, 18 |
| chromium-base | dialog-heavy-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.023 | 0.0, 0.0 | true | 1.495, 7.7, 0, 16.16, 0.259 | 0.979, 16.4, 0, 6.58, 0.1055 | 8, 7 | 167.3, 158.9 | 9, 425 | 49, 14 |
| chromium-base | dialog-heavy-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.024 | 0.0, 0.0 | true | 1.424, 8.7, 0, 3.63, 0.2466 | 0.981, 7.4, 0, 1.55, 0.1057 | 2, 1 | 116.5, 116.7 | 15, 383 | 98, 16 |
| chromium-base | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.023 | 0.0, 0.0 | true | 0.507, 8.3, 0, 2.25, 0.0878 | 0.978, 58.4, 0, 2.7, 0.1054 | 6, 7 | 75, 75 | 21, 375 | 79, 14 |
| chromium-base | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.054 | 0.0, 0.0 | true | 0.953, 33.1, 0, 0, 0.1026 | 0.981, 50, 0, 0, 0.1057 | 3, 4 | 49.7, 50 | 18, 334 | 98, 13 |
| chromium-cure | dialog-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.003, 0.003 | 14.7, 3.8 | true | 0.900, 9.1, 75.59, 37.75, 0.1072 | 0.991, 15.7, 53.68, 26.81, 0.0762 | 21, 7 | 92.4, 74.9 | 47, 1583 | 60, 18 |
| chromium-cure | dialog-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.004, 0.004 | 7.9, 3.8 | true | 0.633, 8.4, 22.53, 14.45, 0.076 | 0.969, 8.4, 22.35, 14.33, 0.0754 | 0, 0 | 24.7, 17.5 | 44, 475 | 103, 28 |
| chromium-cure | dialog-heavy-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.048, 0.048 | 45.8, 33.2 | true | 0.972, 8.3, 81.47, 125.75, 0.1156 | 0.994, 16.7, 53.68, 82.86, 0.0762 | 40, 8 | 183.8, 162.5 | 49, 3321 | 74, 17 |
| chromium-cure | dialog-heavy-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.002, 0.002 | 5.6, 30.8 | true | 0.809, 8.2, 28.82, 13.03, 0.0973 | 0.920, 9.2, 21.23, 9.6, 0.0716 | 2, 1 | 125.6, 125.5 | 39, 717 | 77, 28 |
| chromium-cure | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.018 | 0.0, 0.0 | true | 0.556, 8.3, 0, 2.46, 0.0963 | 0.981, 66.7, 0, 2.71, 0.1057 | 11, 4 | 75.4, 66.7 | 27, 591 | 39, 14 |
| chromium-cure | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.059 | 0.0, 0.0 | true | 0.851, 41.7, 0, 0, 0.0917 | 0.882, 40.8, 0, 0, 0.095 | 4, 5 | 49.4, 74.6 | 20, 325 | 99, 14 |
| webkit-base | dialog-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.008 | 0.0, 0.0 | true | 1.021, 17, 0, 4.53, 0.1769 | 0.972, 17, 0, 2.68, 0.1047 | 0, 0 | 19, 19 | 19, 310 | 62, 13 |
| webkit-base | dialog-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.069 | 0.0, 0.0 | true | 1.010, 17, 0, 3.06, 0.1749 | 0.972, 16, 0, 1.83, 0.1047 | 0, 0 | 19, 18 | 18, 300 | 61, 12 |
| webkit-base | dialog-heavy-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.059 | 0.0, 0.0 | true | 1.191, 3, 0, 12.87, 0.2062 | 0.974, 16, 0, 6.55, 0.1049 | 2, 1 | 126, 131 | 12, 363 | 59, 14 |
| webkit-base | dialog-heavy-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.036 | 0.0, 0.0 | true | 0.984, 4, 0, 2.51, 0.1705 | 0.978, 16, 0, 1.55, 0.1054 | 2, 1 | 136, 121 | 13, 362 | 59, 14 |
| webkit-base | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.013 | 0.0, 0.0 | true | 1.066, 16, 0, 4.73, 0.1847 | 0.975, 17, 0, 2.69, 0.1051 | 0, 0 | 19, 21 | 18, 300 | 60, 14 |
| webkit-base | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.015 | 0.0, 0.0 | true | 0.967, 16, 0, 0, 0.1041 | 0.981, 17, 0, 0, 0.1056 | 0, 0 | 19, 19 | 13, 213 | 62, 13 |
| webkit-cure | dialog-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.023, 0.023 | 14.7, 3.8 | true | 0.972, 16, 81.69, 40.81, 0.1159 | 0.990, 16, 53.65, 26.8, 0.0761 | 0, 0 | 18, 19 | 42, 682 | 63, 17 |
| webkit-cure | dialog-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.027, 0.027 | 8.0, 3.9 | true | 0.979, 16, 34.88, 22.36, 0.1177 | 0.978, 16, 22.56, 14.46, 0.0761 | 0, 0 | 19, 18 | 30, 489 | 63, 17 |
| webkit-cure | dialog-heavy-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.008, 0.008 | 45.8, 33.2 | true | 0.990, 105, 83.01, 128.13, 0.1178 | 0.994, 17, 53.68, 82.86, 0.0762 | 2, 1 | 127, 131 | 47, 921 | 59, 18 |
| webkit-cure | dialog-heavy-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.031, 0.031 | 5.6, 30.8 | true | 0.986, 16, 35.13, 15.88, 0.1185 | 0.977, 18, 22.54, 10.19, 0.0761 | 2, 1 | 132, 122 | 32, 684 | 58, 18 |
| webkit-cure | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.049 | 0.0, 0.0 | true | 0.962, 17, 0, 4.26, 0.1666 | 0.972, 10, 0, 2.68, 0.1047 | 0, 0 | 21, 26 | 20, 319 | 61, 13 |
| webkit-cure | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.032 | 0.0, 0.0 | true | 0.881, 11, 0, 0, 0.095 | 0.883, 3, 0, 0, 0.0951 | 0, 0 | 26, 32 | 15, 239 | 65, 16 |

The step each long frame's tick makes in the heavy cells, read from the two samples after the frame (frame ms: centre px, width px, opacity, share of the bound):

- chromium-base dialog-heavy-1440: long tasks at 71 ms (90 ms), 216 ms (120 ms), 1154 ms (120 ms). Open: 58 ms: 0.0, 8.4, 0.134, 0.774; 49 ms: 0.0, 2.1, 0.033, 0.191; 100 ms: 0.0, 0.5, 0.007, 0.045; 99 ms: 0.0, 0.0, 0.001, 0.006; 167 ms: 0.0, 0.0, 0.000, 0.000; 99 ms: 0.0, 0.0, 0.000, 0.000; 76 ms: 0.0, 0.0, 0.000, 0.000; 67 ms: 0.0, 0.0, 0.000, 0.000. Close: 159 ms: 0.0, 4.9, 0.079, 0.733; 100 ms: 0.0, 6.1, 0.099, 0.919; 133 ms: 0.0, 6.5, 0.103, 0.956; 67 ms: 0.0, 6.6, 0.105, 0.975; 134 ms: 0.0, 6.4, 0.103, 0.956; 125 ms: 0.0, 5.6, 0.089, 0.826; 67 ms: 0.0, 4.8, 0.076, 0.706.
- chromium-base dialog-heavy-390: long tasks at 72 ms (90 ms), 218 ms (120 ms), 1139 ms (120 ms). Open: 100 ms: 0.0, 2.1, 0.140, 0.808; 117 ms: 0.0, 0.1, 0.004, 0.033. Close: 117 ms: 0.0, 1.4, 0.095, 0.882.
- chromium-cure dialog-heavy-1440: long tasks at 68 ms (90 ms), 214 ms (120 ms), 4187 ms (120 ms). Open: 91 ms: 68.5, 105.8, 0.097, 0.817; 184 ms: 59.0, 91.1, 0.084, 0.704; 100 ms: 49.0, 75.8, 0.070, 0.586; 129 ms: 30.5, 47.1, 0.043, 0.364; 117 ms: 22.7, 35.0, 0.032, 0.270; 92 ms: 13.1, 20.1, 0.000, 0.156; 133 ms: 8.1, 12.5, 0.000, 0.097; 67 ms: 4.2, 6.4, 0.000, 0.050; 67 ms: 1.3, 2.0, 0.000, 0.016; 66 ms: 1.6, 2.4, 0.000, 0.019; 92 ms: 2.7, 4.2, 0.000, 0.032; 125 ms: 3.3, 5.0, 0.000, 0.039; 75 ms: 3.5, 5.4, 0.000, 0.042; 101 ms: 3.4, 5.3, 0.000, 0.041; 142 ms: 3.1, 4.7, 0.000, 0.037; 75 ms: 2.7, 4.2, 0.000, 0.032; 92 ms: 2.1, 3.2, 0.000, 0.025; 133 ms: 1.6, 2.6, 0.000, 0.020; 66 ms: 1.3, 2.0, 0.000, 0.016; 83 ms: 0.9, 1.3, 0.000, 0.010; 133 ms: 0.6, 0.8, 0.001, 0.008; 67 ms: 0.3, 0.6, 0.000, 0.005; 100 ms: 0.1, 0.2, 0.000, 0.002; 133 ms: 0.1, 0.0, 0.000, 0.001; 67 ms: 0.1, 0.1, 0.000, 0.002; 91 ms: 0.2, 0.2, 0.001, 0.008; 134 ms: 0.1, 0.2, 0.000, 0.002; 66 ms: 0.1, 0.2, 0.000, 0.002; 91 ms: 0.1, 0.2, 0.000, 0.002; 134 ms: 0.1, 0.2, 0.000, 0.002; 67 ms: 0.1, 0.2, 0.001, 0.008; 83 ms: 0.1, 0.1, 0.000, 0.001; 117 ms: 0.1, 0.1, 0.000, 0.001; 67 ms: 0.1, 0.1, 0.000, 0.001; 83 ms: 0.0, 0.0, 0.000, 0.000; 121 ms: 0.0, 0.1, 0.000, 0.001; 67 ms: 0.0, 0.1, 0.000, 0.001; 59 ms: 0.0, 0.0, 0.000, 0.000; 58 ms: 0.0, 0.0, 0.000, 0.000; 59 ms: 0.0, 0.0, 0.000, 0.000. Close: 163 ms: 38.1, 58.9, 0.054, 0.707; 75 ms: 45.2, 69.8, 0.064, 0.837; 133 ms: 50.9, 78.4, 0.072, 0.941; 66 ms: 52.4, 81.0, 0.075, 0.972; 100 ms: 53.7, 82.8, 0.076, 0.993; 100 ms: 52.4, 80.9, 0.075, 0.971; 83 ms: 48.3, 74.6, 0.068, 0.895; 75 ms: 40.6, 62.6, 0.058, 0.751.
- chromium-cure dialog-heavy-390: long tasks at 68 ms (90 ms), 214 ms (120 ms), 1136 ms (120 ms). Open: 83 ms: 28.8, 13.0, 0.097, 0.809; 126 ms: 12.9, 5.8, 0.044, 0.365. Close: 126 ms: 18.8, 8.5, 0.064, 0.819.
- webkit-base dialog-heavy-1440: long tasks at 94 ms (90 ms), 239 ms (120 ms), 1161 ms (120 ms). Open: 102 ms: 0.0, 12.8, 0.206, 1.189; 126 ms: 0.0, 0.4, 0.007, 0.040. Close: 131 ms: 0.0, 5.4, 0.085, 0.789.
- webkit-base dialog-heavy-390: long tasks at 93 ms (90 ms), 238 ms (120 ms), 1159 ms (120 ms). Open: 94 ms: 0.0, 2.5, 0.170, 0.981; 136 ms: 0.0, 0.1, 0.008, 0.046. Close: 121 ms: 0.0, 1.4, 0.096, 0.891.
- webkit-cure dialog-heavy-1440: long tasks at 88 ms (90 ms), 229 ms (120 ms), 1150 ms (120 ms). Open: 105 ms: 78.3, 120.9, 0.112, 0.934; 127 ms: 45.8, 70.8, 0.065, 0.547. Close: 131 ms: 40.6, 62.8, 0.058, 0.753.
- webkit-cure dialog-heavy-390: long tasks at 88 ms (90 ms), 230 ms (120 ms), 1152 ms (120 ms). Open: 95 ms: 30.8, 14.0, 0.104, 0.865; 132 ms: 17.4, 7.9, 0.059, 0.490. Close: 122 ms: 18.9, 8.6, 0.063, 0.820.

Readings beyond the verdict:

- **On the cure no step exceeds the bound**, with frames of up to 184 ms in Chromium and 132 ms in WebKit. The largest steps are the spring's own at its peak speed on ordinary 16 to 18 ms frames (81.5 px of centre on atlas's plate in Chromium and 83.0 px in WebKit, 0.97 to 0.99 of the bound). A long frame's tick carries no more than an ordinary frame's.
- **On 11.1.1 the bloom already breaks the rule.** In Chromium its largest entrance step is 1.4 to 2.0 times the `present` bound in the four bloom cells, all of it in opacity: 0.34 across a 34 ms frame, 0.25 across a 25 ms frame in the heavy cells. In WebKit four of its five bloom cells exceed the bound: by 1 to 7 % across ordinary 17 and 18 ms frames, and by 19 % (0.21 of opacity) across the heavy cell's 102 ms frame. Every frame longer than 16.7 ms carries the spring further than one 60 Hz frame. The `present` row is fast and travels no distance, so on 11.1.1 a stall costs opacity; the travel from an opener turned the same clock into the critic's 180 to 291 px. The exit clock was already bounded on 11.1.1, and every close on both trees keeps its bound.
- **The rebound on atlas's plate.** From a 160 × 40 button the `panel` row's one rebound reaches 45.8 px of width and 33.2 px of height on the 1,248 × 828 plate (14.7 and 3.8 px on the 512 px test plate). DESIGN §9 asks the owner whether atlas's plate should ride `bloom`.
- **The entrance's length.** The spring settles within half a pixel in 30 to 49 frames (fewer on the smaller plates, where half a pixel is a larger share of the travel). Chromium's entrance took 3,321 ms on atlas's plate and 1,583 ms on the test plate, because each frame advanced the spring by at most 16.7 ms while frames ran at 50 to 90 ms; WebKit's took 921 and 682 ms. 11.1.1's `present` bloom kept wall time on the same load (300 to 425 ms in Chromium, 300 to 363 in WebKit) by taking larger steps.
- **First and last frames.** On the cure, in both engines, the first painted frame is 0.030 of the way from the button at 0.030 opacity, and the last before the plate leaves is 0.002 to 0.048 of the way back at the same opacity. The deep cell's plate never leaves its rest: centre within 1 px on every frame.
- **Reduced motion.** The plate stays at rest size and place, and fades in and out on the held exit clock within its bound, on both trees.

## 5. Unit tests and types

- **On 11.1.1** (`trees/r2-redtest`: base `src/` with the cure's `tests/`, `tools/logs-r2/red-unit-cure-tests.log`): the touched suites, 22 files, 16 failed and 161 passed. The failures are exactly the new and changed tests: round 1's 14 (the origin type, the origin's first frame, the row chosen per open, the cards' grid, role and counts, the caption, the row header, the width, the viewport handoff, the sentinel's place, the scrolled marks, the fit) and two new ones. "Advances by at most one 60 Hz frame across a long frame" reads 97.4 against 20.2 of a 100 target after a 200 ms frame on 11.1.1. "Tells the host when its viewport leaves" receives no `null`. The new card-sentinel test passes on 11.1.1 by design: it guards 11.1.1's behaviour, which round 1 had lost.
- **On the cure**: the same suites pass, 22 files and 177 tests (`tools/logs-r2/green-unit-touched.log`).
- **The whole suite** fails the same 46 tests in 19 files on both trees (`tools/logs-r2/{red,green}-fail.txt` are identical), and the cure adds 14 passing tests (2,373 against 2,359). The 46 are the sparse tree's environment: no git, no `dist/`, no `docs/` gate files, no `README.md` (the gate register, the public surface, consumer prose, the comment census, which finds no source without git). None of them is in a touched suite.
- **Types**: `vue-tsc --noEmit --project tsconfig.src.json` on the cure exits 0 (`green-typecheck-src.log`). The test project's only errors are the two in `FourierField.smoke.test.ts`, which imports the package's own built `fourier-math` entry, absent from a sparse tree.

## 6. What this round changed in the cure

Kept from the stopped round-2 attempt, and judged here:

- `useSpring` steps its spring on its own `RAFPlayback.loop`, by at most `FRAME_MS` a frame, and no longer arms `SpringProgress.play` (B-1); `exitClock.ts` reads the shared `FRAME_MS`; the unit test for a 200 ms frame.
- `.data-table-card-list { flex: none }` (B-2).
- `Dialog`'s `origin` doc and `DialogOrigin`'s doc name the control that opened it, from its click, and `null` for no opener (B-3).
- `viewportRef(null)` on unmount, the sentinel after the cards' state card, `fit`'s doc stating the cell-width condition, and their tests.

Added by this seat:

- The Dialog's row follows a readable origin rect (`readOrigin()`), so an opener that has left the page presents in place on `present` instead of blooming in place on `panel`; one assertion in the row test.
- The constellation README's line on `useSpring` no longer says it wraps `SpringProgress.play()`.

## 7. The patch

- The patch is made by `tools/harness/mkpatch.sh` from the two trees. `git apply --check` passes on a fresh `git archive` of release/11.1.1 with repository discovery off, and applying it gives `src/` and `tests/` identical to `trees/r2-cure`. It changes 13 library files and 5 test files, with no `@utility`, `@theme` or exported CSS name. The added `src` lines carry no ids and pass the register lint.
- **On 11.1.2**: on a fresh archive with `design/atlas-rows-1112/cure.patch` applied first (the 11.1.2 lane's tree is no longer on disk), every hunk applies except `data-table/styles.css` at `@@ -69`, where 11.1.2's sort-button comment moved the context; the ruler block goes after the `.data-table-actions` rule. `DialogContent.vue`'s hunks apply with offsets of 1 and 10 lines around 11.1.2's modal-layer changes.

## 8. The runs, including the ones that did not finish

- **18:17 to 18:39, unit runs.** The cure's touched suites (18:17), the cure's tests on 11.1.1's `src/` (18:18), the whole suite on 11.1.1 (to 18:27), then the cure's whole suite, which waited about ten minutes for a heavy slot and ran from 18:38. Type checks at about 18:33.
- **18:41 to 18:45, first chain.** Both builds (base 2.5 min, cure 51 s, `build-base.log`, `build-cure.log`). The chain then stopped before its first probe on a bug in `run-round.sh` (an empty array under `set -u` in macOS's bash 3.2); no probe ran, and its trap stopped the servers. Fixed, and `SKIP_BUILD=1` added so the chains after it served these builds.
- **About 18:50, a smoke run** of five cells on the cure in Chromium (not kept). Every step held, with frames up to 151 ms. The plate had not settled 2 s after the click, because the loaded machine painted at 50 to 150 ms a frame and the spring advanced 16.7 ms a frame. The probe now waits for the plate to rest, up to 10 s, and records the entrance's length.
- **19:00 to 19:05, second chain, stopped.** Chromium base and cure finished; the cure read `dialog-heavy-390` RED on its rest check, which asked the last ten frames to agree within 0.1 px while the mount spring settles at a thousandth of its travel (0.7 px of height on a 772 px plate). The rest check is now that band (0.5 px). The chain was stopped from the session during the WebKit base run's lock wait. That stop killed the guard without its cleanup, so the two preview servers were left behind; they were stopped by hand after their working directories were read as this item's trees. No WebKit data was written, and the Chromium data was overwritten by the third chain.
- **19:05 to 20:07, third chain, the tables above.** Chromium base 19:05 to 19:15 (most of it waiting for a browser slot), Chromium cure 19:15 to 19:17, WebKit base 19:17 to 19:47 and WebKit cure 19:47 to 20:07 (each waiting for the WebKit lock behind other sessions' runs). The servers were stopped by the chain's trap at 20:07:27. No run was stopped or refused by the guard.

**Housekeeping.** This seat's trees (`trees/r2-base`, `r2-cure`, `r2-redtest`) and its scratch copies were deleted after the readings. `trees/critic-base` and `trees/critic-cure` belong to another seat and were not touched, and `tools/logs-sci/` (empty) is left as the critic recorded. No preview server or browser of this seat is running. Nothing was staged or committed, and no file outside this item folder was changed.

## 9. Not measured

A phone, touch, Safari, and any screen reader (the trees are read from Chromium's tree and from Playwright's snapshot). atlas's own build on the cure: the virtualized cards and the table are read with atlas's virtualizer in the witness page, not in atlas. A display that paints at 30 Hz. Right-to-left. Dark mode's ground colour.
