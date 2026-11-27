# DataTable and Dialog for atlas: the readings (O-429 GL-5 (a), (b), (d) and GL-10)

Seat: claude-opus-5-5 (asserted from its own system identity), BUILD round 1, 2026-11-24. It continues the attempt stopped for the agreed reboot (ab6e7c2ce). That attempt built the trees, the cure, the unit tests and the probe, and had read RED on base and GREEN on the cure in both engines at 13:55 to 13:57. This seat judged the cure, changed one rule in it, tightened the Dialog witness, re-ran every run on one probe version, and wrote the patch and the records. The design is `DESIGN.md`; the note is `NOTE-atlas.md`.

**Builds.** RED is release/11.1.1 at b9b96cb76 (`trees/red`). The trees were archived at 48ab5d94e, and the two commits differ only in `docs/`. GREEN is RED with `cure.patch` (`trees/green`). Each tree is a `git archive` with `node_modules` linked to the main checkout, built with `tools/harness/build-tree.sh` (the demo's own build, with the witness page at `/?am=<mode>`) and served by `vite preview` on 5371 and 5372.

**Engines.** Playwright's Chromium headless shell 149.0.7827.55 and Playwright's WebKit 26.5, which is not Safari. Desktop contexts at 1440 × 900 and 390 × 844, with mouse and wheel input. No phone, no touch, no screen reader. One browser per run, a new context per cell, and the WebKit runs under the machine's exclusive WebKit lock. The 1-minute load ran 15 to 35 when the final runs started (the machine was shared), and up to 50 during the day's earlier runs.

**The witness.** `tools/harness/probe.mjs` (cells and verdicts in its header), the page `tools/harness/app/Page.vue`, the data `tools/data/{chromium,webkit}-{base,cure}.json`, and the tables below printed by `tools/harness/readings.mjs tools/data`. The final four runs started at 17:46, 17:47, 17:49 and 17:55.

## Verdict

- **(a) The header and the first column stick inside the table's own viewport, in both engines, at both widths.** On 11.1.1 the table's container grows to the rows' full height inside the host, so the host scrolls and the header leaves with the rows (−1,500 px). On the cure the viewport scrolls (1,500 down, 800 across), and the host and the page do not. The header, the corner and a row's first cell sit on the region's edges (0.0 px). The topmost element under the header and under the first column is the header cell and the row's first cell. Both take an opaque ground only while scrolled; at rest they read transparent, as on 11.1.1.
- **(b) The cards keep the table's role, read from the accessibility tree.** Chromium's own tree (CDP) on the cure has a `table` or `grid` named by the caption, 7 rows: a header row of 5 `columnheader`s, then 6 rows whose first cell is a `rowheader` and whose others are `cell` or `gridcell`. On 11.1.1 the container is `none` and ignored, with no rows. WebKit's tree is not reachable from Playwright. Its ARIA snapshot reads the same structure on the cure, and on 11.1.1 loose text and term and definition pairs.
- **(b) `fit` keeps the 2,897 px table inside the 1,202 px viewport.** It shows the lead and 6 columns (the 7 the widths allow), reports the other 13 through `fold`, and leaves `scrollWidth` equal to `clientWidth`. 11.1.1 has no `fit` and scrolls sideways (2,897 against 1,202).
- **GL-10: the Dialog's first frame is its opener's box at opacity 0, and its last is next to it.** It grows on the `panel` row (one rebound: 14.4 and 14.8 px of a 512 px plate at 1440, 8.0 px of 350 at 390) and returns on the exit clock with no overshoot. Every close frame is nearer the opener, smaller and fainter than the one before. Under reduced motion it neither moves nor scales and fades both ways.
- **Unit tests.** The 14 new and changed tests fail on 11.1.1 and pass on the cure. The touched suites pass on the cure: 21 files, 164 tests.
- **The patch** (+1,071 −228 over 14 files) applies to release/11.1.1 and reproduces `trees/green` byte for byte. On the 11.1.2 lane's tree it applies except one context hunk (§5).

## 1. The verdicts

| cell | Chromium base | Chromium cure | WebKit base | WebKit cure |
| --- | --- | --- | --- | --- |
| sticky-1440 | RED | GREEN | RED | GREEN |
| sticky-390 | RED | GREEN | RED | GREEN |
| fit-1440 | RED | GREEN | RED | GREEN |
| cards-table-390 | RED | GREEN | RED | GREEN |
| cards-grid-390 | RED | GREEN | RED | GREEN |
| dialog-1440 | RED | GREEN | RED | GREEN |
| dialog-390 | RED | GREEN | RED | GREEN |
| dialog-rm-1440 | GREEN | GREEN | GREEN | GREEN |

`dialog-rm-1440` is GREEN on 11.1.1 because its plate already fades in place under reduced motion. The cell guards that the origin adds no travel there, and the cure keeps it.

## 2. Sticky: a 2,897 px table, 20 columns and 120 rows, in a 480 px tall region (1,202 px wide at 1440, 344 at 390), after a wheel of 1,500 down and 800 across

| run | cell | viewport top / left | host top | page y | head top | corner top, left | row's first cell left | on top: head, column | ground α head, column (at rest) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chromium base | 1440 | 0 / 800 | 1500 | 0 | −1500.0 | −1500.0, −800.0 | −800.0 | no, no | 0, 0 (0) |
| Chromium base | 390 | 0 / 800 | 1500 | 0 | −1500.0 | −1500.0, −800.0 | −800.0 | no, no | 0, 0 (0) |
| Chromium cure | 1440 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | yes, yes | 1, 1 (0) |
| Chromium cure | 390 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | yes, yes | 1, 1 (0) |
| WebKit base | 1440 | 0 / 800 | 1500 | 0 | −1500.0 | −1500.0, −800.0 | −800.0 | no, no | 0, 0 (0) |
| WebKit base | 390 | 0 / 800 | 1500 | 0 | −1500.0 | −1500.0, −800.0 | −800.0 | no, no | 0, 0 (0) |
| WebKit cure | 1440 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | yes, yes | 1, 1 (0) |
| WebKit cure | 390 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | yes, yes | 1, 1 (0) |

The ground on the cure is `--card`, `rgb(253, 245, 236)` in light. The page sizes its columns by class as well as by `width`, so 11.1.1, which has no `width`, lays out the same 2,897 px table.

## 3. Fit and the cards

**Fit at 1440** (lead 16 rem, 19 columns at 139 px, expected 1 + ⌊(1,202 − 256) / 139⌋ = 7):

| run | header columns | client / scroll width | folded |
| --- | --- | --- | --- |
| Chromium base | 20 | 1202 / 2897 | none reported |
| Chromium cure | 7 | 1202 / 1202 | m7 … m19 (13) |
| WebKit base | 20 | 1202 / 2897 | none reported |
| WebKit cure | 7 | 1202 / 1202 | m7 … m19 (13) |

**The cards at 390** (a 344 px region, 6 rows, 5 columns, a caption, the first column `rowHeader`; `cards-grid` adds `tabbableRowId`, which makes the table a grid):

- Chromium cure, from CDP `Accessibility.getFullAXTree`: `table` / `grid` "Schools by district", not ignored, 7 rows; header [columnheader × 5]; first row [rowheader "District 1", cell / gridcell "East", "74", "111", "148"].
- Chromium base: the container is role `none`, ignored, with 0 rows.
- WebKit cure, from Playwright's ARIA snapshot: `- table "Schools by district"` (or `grid`) / `caption` / `rowgroup` / `row` of five `columnheader`s / `rowgroup` / rows of `rowheader "District 1"` then `cell` (or `gridcell`) × 4. `Element.computedRole` is not exposed in this WebKit.
- WebKit base: `- text: District 1 / - term: Region / - definition: East / …`, with no table.

## 4. The Dialog

A 160 × 40 button at (40, 60) at 1440 and (24, 120) at 390 opens a Dialog with `:origin` set to that button. The plate's rect and opacity are sampled on every animation frame from the click until the plate leaves the DOM. "Centre" is the plate centre's distance from the opener's centre as a fraction of the opener-to-rest travel (705 px at 1440, 296 at 390). A sample's opacity reads the spring one tick late (below).

| run | cell | mount: centre, opacity | first painted | last painted: centre, opacity | open rebound w, h px | close monotone | largest judged step open, close | long frames open, close | frames open, close |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chromium base | 1440 | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.054 | 0.0, 0.0 | yes | 0.000, 0.000 | 9, 10 | 61, 14 |
| Chromium base | 390 | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.065 | 0.0, 0.0 | yes | 0.000, 0.000 | 8, 4 | 132, 16 |
| Chromium base | rm-1440 | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.054 | 0.0, 0.0 | yes | 0.000, 0.000 | 11, 10 | 34, 14 |
| Chromium cure | 1440 | 0.000, 0.000 | 0.030, 0.030 | 0.024, 0.024 | 14.4, 3.7 | yes | 0.128, 0.075 | 9, 5 | 102, 19 |
| Chromium cure | 390 | 0.000, 0.000 | 0.030, 0.030 | 0.028, 0.028 | 8.0, 3.9 | yes | 0.076, 0.045 | 0, 0 | 170, 31 |
| Chromium cure | rm-1440 | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.004 | 0.0, 0.0 | yes | 0.000, 0.000 | 0, 1 | 150, 15 |
| WebKit base | 1440 | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.069 | 0.0, 0.0 | yes | 0.000, 0.000 | 0, 0 | 84, 13 |
| WebKit base | 390 | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.071 | 0.0, 0.0 | yes | 0.000, 0.000 | 0, 0 | 85, 12 |
| WebKit base | rm-1440 | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.005 | 0.0, 0.0 | yes | 0.000, 0.000 | 0, 0 | 85, 13 |
| WebKit cure | 1440 | 0.000, 0.000 | 0.030, 0.030 | 0.071, 0.071 | 14.8, 3.9 | yes | 0.121, 0.076 | 0, 0 | 85, 16 |
| WebKit cure | 390 | 0.000, 0.000 | 0.030, 0.030 | 0.019, 0.019 | 8.0, 3.9 | yes | 0.121, 0.076 | 0, 0 | 84, 17 |
| WebKit cure | rm-1440 | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.016 | 0.0, 0.0 | yes | 0.000, 0.000 | 0, 0 | 84, 15 |

Readings beyond the verdict:

- **The sampler reads the spring one tick late.** The sampler's animation-frame callback was registered before the click, and the spring's after it, so in every frame the sampler reads the box the previous tick wrote. A step between samples *i* and *i*+1 is the spring's tick across the frame before sample *i*. The verdict therefore judges a step only when the frames on both sides of it are 34 ms or shorter. Steps beside longer frames are listed in the data's `longFramesOpen` and `longFramesClose`.
- **A long frame moves the plate in one step.** keyframes.js advances a spring by the frame timestamps' raw difference (`RAFPlayback.drive`, with no clamp). In the 17:28 Chromium cure run (load 32 to 50), the plate's first frame took 75 ms and the next sample showed a step of 0.47 of the travel at both 1440 and 390. In the final runs the largest judged step is 0.128 (Chromium) and 0.121 (WebKit), and the largest step beside a long frame is 0.101, at 1440 in Chromium (a 41.7 ms frame). The in-place bloom of 11.1.1 hides the same catch-up because its travel is a 5 % scale. On a slow phone the first open of a heavy dialog (atlas's data view mounts a table) can take one such frame. Holding the spring until the plate's first frame has painted would spend that frame at the opener, invisible; it is a question for the critic, not built.
- **The open's opacity dips by 0.002 once.** The plate's opacity is 1 − p, and the `panel` row's second crossing takes p back to +0.002 after its rebound, in both engines, at both widths. That is half of one 8-bit alpha step.
- **Close frames.** Chromium's close at 1440 included a 417 ms frame, and the close stayed monotone through it.
- **Reduced motion.** The plate stays at rest size and place (centre and size within 1 px on every frame). Its largest opacity step per frame is 0.093 to 0.095 in on the cure, and 0.095 out.

## 5. Unit tests, types and the patch

- **On 11.1.1** (`trees/redtest`: base `src/` with the cure's `tests/`, `tools/logs/red-unit-cure-tests.log`, 13:52): 4 files, 14 failed and 39 passed. The failures are exactly the new and changed tests (the origin type, the origin's first frame, the row chosen per open, the cards' grid, role and counts, the caption, the row header, the width, the viewport handoff, the sentinel's place, the scrolled marks, the fit).
- **On the cure**: the touched suites (`tests/components/ui/data-table`, `tests/components/dialog`, `tests/components/sheet`, `tests/components/table.contract.test.ts`, `tests/composables/useSpringMount.test.ts`) pass, 21 files and 164 tests (16:14, after this seat's change, `tools/logs/green-unit-touched-r1b.log`).
- **The whole suite** (13:49 and 13:50, before this seat's one-line change, `tools/logs/{red,green}-unit-full.log`) fails the same 44 tests in 19 files on both trees, and the cure adds 11 passing tests. The 44 are the sparse tree's environment: no `dist/`, no `dist-demo/` at the time, no `README.md`, `MIGRATION.md`, `CHANGELOG` or `docs/design/` (`tools/logs/red-fail.txt` and `green-fail.txt` are identical).
- **Types**: `src` type-checks on the cure (`vue-tsc --noEmit --project tsconfig.src.json`, exit 0, re-run after this seat's change; `green-typecheck-src.log`, empty). The test project's only errors are the two in `FourierField.smoke.test.ts`, which imports the package's own built `fourier-math` entry, absent from a sparse tree.
- **The patch**: `git apply --check` passes on a fresh `git archive` of release/11.1.1, with repository discovery off, so no path is skipped. Applying it gives files identical to `trees/green` (`cmp` on every touched file). It changes 10 library files and 4 test files, with no `@utility`, `@theme` or exported CSS name, so `.published-roster` does not change. The added lines carry no ids and pass the register lint.
- **On 11.1.2**: on a copy of `design/atlas-rows-1112/trees/green` (today's state), every hunk applies except `data-table/styles.css` at `@@ -69,6 +196,23 @@`. 11.1.2 adds the sort button's target comment above `.data-table-sort`, which moves the context. The ruler block goes after the `.data-table-actions` rule. 11.1.2's `DialogContent` changes (the modal layers) touch other hunks.

## 6. The change this seat made

`.data-table-cards.data-table-viewport` lost `overscroll-behavior: contain`. The table viewport is `.table-container`, which glass's page tables have always scrolled with the page's scroll chaining, so the two projections of one viewport now behave alike. A host that wants containment sets it on `.data-table-viewport`. The cure was rebuilt and every run re-read after the change.

## 7. The runs, including the ones that did not finish

- **16:17 to 16:20**: rebuild of `trees/green`, then Chromium base and cure on the probe as inherited. The cure read `dialog-390` RED on the old step rule (a 0.476 step). The data and log were later overwritten.
- **16:24:56 to 16:40:40, Chromium base, stopped by the guard** (run d89b85afff, rc 124, 15-minute cap). Seven cells finished; `dialog-rm-1440` hung in a `page.evaluate` with the browser idle (cpu60 0 %) until the cap. It was not retried. The next base run completed the same cell in under a minute, GREEN.
- **17:17, all three Dialog cells refused the connection**: the preview servers had reached their 30-minute cap while the run waited for the guard. The servers were restarted with a 45-minute cap.
- **17:28 to 17:42**: all four runs on the probe with frame times. Chromium's cure read `dialog-1440` and `dialog-390` RED on the step rule, which then judged a step by the sampler's own frame gap. Those steps sat beside a 75 ms first frame (§4), and that finding gave the final rule.
- **17:46 to 17:57**: the final four runs, tabled above. The servers were stopped after them.

## 8. Not measured

A phone, touch, Safari, and any screen reader (the trees are read from Chromium's tree and from Playwright's snapshot). atlas's own columns, widths and virtualizer on the cure. A table whose columns declare no `width` under `fit` (DESIGN §3 states the limit). Right-to-left. Dark mode's ground colour (the rule reads `--card` in both).
