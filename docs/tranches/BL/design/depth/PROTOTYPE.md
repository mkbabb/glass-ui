# Depth and parallax: the prototype

Seat: prototype (claude-opus-5-5, 2026-11-15). It built W-B.19 on the scratch branch `bl/depth/proto` (worktree `.claude/worktrees/bl/depth/proto`, from master `8f9ea49e4`) and read every gate the spec lists in headless Chromium and in Playwright WebKit. Every run went through `guarded`; every WebKit run went through `guarded --exclusive webkit`.

Commits on `bl/depth/proto`, read from `git log`:

- `d6a3c9398` proto(W-B.19): depth.css, its static test, and the three-composition harness

## What was built

| file | what |
|---|---|
| `src/styles/depth.css` | the spec's sheet, with one change (D-1) |
| `src/styles/index.css` | imports it after `scroll-choreography.css` |
| `tests/styles/depth.test.ts` | the sheet's static half: imported once and in order; no shading, mask, blend, pin, snap or layer hint; no clock; the lag token and the travel formula; one animated property; the animation bound only under `no-preference` and `@supports`; the three rungs. 7 cases, green |
| `demo/depth/` | the harness: `index.html`, `main.ts`, `DepthHarness.vue` and a picture. Served at `/demo/depth/index.html`. Query: `theme=dark`, `still=1` (the still twin), `lag=0.0625`, `paused=1` (the Blob's loop parked, for frame-exact pixel reads), `tier=`, `lap=spec`, `blob=default` |

The measuring scripts are under `proto/scripts/` beside this file (`measure.mjs`, `cost.mjs`, `bites.mjs`, `analyze.mjs`, `batch.sh`), their readings under `proto/data/`, and the strips under `proto/strips/`.

How each gate was read:

- **Ink cover.** For each run, four frames of the scene: figure hidden or shown, crossed with that run's ink present or transparent. Ink is what the run paints with the figure hidden. A pixel of ink is covered when the run no longer shows there with the figure shown (its change is under 35 % of its ink). Lines and words are the same thing here: every run in the three compositions is one word on one line.
- **Contrast.** At every solid ink pixel, the run's computed colour against the same pixel with the run made transparent. A `behind` run is read only where the figure paints nothing.
- **Rates and offsets.** `getBoundingClientRect()` and the computed `translate` at every 100 px wheel step, top to bottom. T, S and H come from the cell.
- **Cost.** A Chromium devtools trace at 4× CPU across the whole scroll, for the page as built, its still twin and the bite. Both engines also read frame pacing through a continuous wheel scroll and `document.getAnimations()`.
- **Name and selection.** Playwright's `ariaSnapshot()` of each scene; select-all per scene; a mouse drag from the heading's first character to its last; a triple click on "Liquid".
- **Masked support.** The stylesheet response is rewritten so the `@supports` test reads a value no engine accepts (3 replacements). Engine support itself is untouched.

## Gates

Cells: the three compositions, at 390 × 844 coarse and 1440 × 900 fine, light and dark, with and without reduced motion, plus 360, 768, 1024 and 1920 wide for COVER, READ and FLOW. Each bite was read once, at 1440 × 900 light (reduced for G-STILL).

**Playwright WebKit crashes on every dark cell** (`page.goto: Page crashed`), in a fresh browser per cell. It is glass's dark arm, not this sheet: the same crash happens with the depth rules renamed out of the stylesheet and on the demo's own index in dark, while a plain page in the dark scheme loads and every light cell completes (`proto/scripts/diag.mjs`, `diag.sh`, `diag2.sh`). So the WebKit column is the light arm only. Dark is read in Chromium.

| gate | Chromium | WebKit (light arm) | verdict |
|---|---|---|---|
| **G-COVER** | 16 matrix cells and 6 extra widths. Worst line of a `behind` run, the most each line loses at any step: "Liquid" 0.17 to 0.18 (its least 0.12), "download" 0.22 to 0.23 (bound 0.25). Every `front` run 0. Covered runs are 61 px or larger at 360 and 326 px at 1920 (floor 40). Each `behind` run is under the figure at some step. Bites: heading transformed, front cover 0.10, RED; Blob at twice its size, "Liquid" 0.64, RED | 13 cells: worst `behind` 0.20 to 0.21 ("download"; "Liquid" at most 0.18), every `front` 0. Bites: 0.09, RED; 0.59, RED | **pass**, except the glass-Card-as-figure blur clause, which is unread (not built) |
| **G-READ** | worst point 4.78 to 4.81, on "download" (`--muted-foreground` on paper). "glass" on the Blob: 7.12 light, 6.59 dark (5.58 at 360 dark). Caption 9.91 light, 10.99 dark (D-3). Bite: caption off its plate in the spec's geometry, 3.10, RED | worst 4.77 to 4.82 ("download"). Bite 3.09, RED | **pass** with D-2 and D-3. Without D-3 the caption fails at every tier (D-3) |
| **G-RATE** | every text run and scene 100.00. Lag, read against derived: hero 93.75 / 93.75 (1440), 97.11 / 97.11 (390), 97.12 / 97.12 (360); picture 93.84 / 93.84 (1440), 95.98 / 95.98 (390). Window 100. Lowest anywhere 93.21 (bound 87.5). Bite `--depth-travel: 20lvb`: 80 and 74.79, RED | the same numbers to the hundredth. Bite: the same, RED | **pass** |
| **G-COST** | 4× CPU trace across 36 steps at 1440: built adds 0.30 ms per step over the still twin (3.81 against 3.51), and 0.19 at 390. 1 `Layout` in each run, rooted at `#document` and present in the still twin too. 0 paints of a scene's text (the 6 paints are the document, the caption's glass plate twice and the Blob's wrapper once, identical in the still twin). 0 inline style writes. 0 scroll, wheel, pointer, touch or resize listeners on window, document or any scene. Style recalcs: 28 against 7 in the twin, at most 3 elements each against 2. Bite (the lag as `top`): 24 layouts and 34 paints (15 of the `img`), RED; its main-thread cost rises only 0.7 ms per step | no devtools trace in WebKit. `getAnimations()`: one per lagging scene, on `translate`, timeline `ViewTimeline`. Pacing through a continuous scroll: p95 18 ms and max 18 ms at both sizes, 0 frames over 33 ms. Bite: max 35 ms, 1 frame over | **pass** in Chromium; WebKit read by pacing and the animation list only |
| **G-ENDS** | largest offset step 6.25 px at 1440 (allowed 7.25), 4.02 at 390 (5.02). Scene wholly below: -44.00 (derived -44). Wholly above: +44.00. Hero at scroll 0: 0.00 (derived 0.00, since the hero is as tall as the viewport). Bite `animation-range: contain`: step 23.66 px and hero offset 56.25 at scroll 0, RED | the same. Bite RED | **pass** |
| **G-STILL** | reduced motion, light and dark, 1440 and 390: 0 animations in any scene, every layer 100, offset 0, picture the size of its window, cover within 0.01 of the moving page at rest. Support masked off (3 replacements): the same. Bite (animation outside the media gate): rates 93.75, RED | reduced and masked, light: the same. Bite RED | **pass** |
| **G-NAME** | `- heading "Liquid glass" [level=1]`; `- figure "The picture trails…"`, `- region "download"` > `heading "download"`, `status: 412Mbps`. No `aria-hidden` text, no string twice. Bite (a second copy): RED | the same tree. Bite RED | **pass**, with D-4 |
| **G-SELECT** | select-all per scene: "Liquid glass", the caption once, "download 412Mbps". Mouse drag across the heading: "Liquid glass". Triple click on "Liquid": "Liquid". Bite (a second copy): RED | the same three reads. Bite RED | **pass** |
| **G-FLOW** | `scrollWidth` equals `clientWidth` at every step of every cell. `scrollHeight` constant through every scroll. **Bite (a lagging scene last, no padding): did not bite.** `scrollHeight` held at 3505; that cell went RED on COVER instead, with the dial over "download" at 0.31 | the same, and the same non-bite (0.27) | **pass**. The spec's worry is not seen in either engine, so this gate's bite is unproven |
| **G-RESTRAINT** | lag elements per scene 1, 1, 0; none on text; no scene in a `p`, list, table, `nav`, button, field, dialog or popover; one `--depth-lag` in the view. Hero and stage are at least 1,868 px apart, so they never share a viewport. Elements per scene 5, 3 and 6, matching the markup (the Blob's root and its own canvas, the frame and img, the ring's two circles). The travel is seen: "Liquid"'s cover moves from 0.16 to 0.18 through the pass and the picture moves 88 px against its window. The sheet's bans are in the unit test. Bite (a second lag in a scene): RED | the same. Bite RED | **pass** |

### Strips

One strip per composition through the scene's pass: five viewport frames, evenly spaced, from the scene half in view at the foot to half out at the head (the hero from scroll 0). At 1440 the frames wrap in two columns; at 390 they sit in one row. Names follow `<composition>-<engine>-<width>-<theme>[-reduce|-still|-lag16].png`.

| | Chromium | WebKit |
|---|---|---|
| hero, figure, stage at 1440 and 390, light and dark | 12 | 6 (light) |
| the same under reduced motion | 12 | 6 (light) |
| 1440 light: still twin, a sixteenth (OQ-3) | 6 | 6 |

All 48 are under `proto/strips/`.

### Per cell

Every non-bite cell, from `proto/data/summary-*.json` (printed by `scripts/table.mjs`). For a still or reduced cell, the lag column reads 100 against the moving rate it would have had. The red column lists the gates that failed; "all pass" means none did.

| cell | engine | Liquid cover | download cover | front covers | min contrast | lag rate read/derived (hero, picture) | text rate dev | max offset step (px) | red |
|---|---|---|---|---|---|---|---|---|---|
| 1024x768 | chromium | 0.15-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 93.75/93.75, 93.21/93.21 | 0 | 6.79 ≤ 7.79 | all pass |
| 1440x900-dark-reduce | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 7.22 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900-dark | chromium | 0.16-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 6.59 (glass) | 93.75/93.75, 93.84/93.84 | 0 | 6.25 ≤ 7.25 | all pass |
| 1440x900-lag16 | chromium | 0.17-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 96.88/96.88, 96.92/96.92 | 0 | 3.13 ≤ 4.13 | all pass |
| 1440x900-mask | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900-reduce | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900-still | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900 | chromium | 0.16-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 93.75/93.75, 93.84/93.84 | 0 | 6.25 ≤ 7.25 | all pass |
| 1920x1080-dark | chromium | 0.17-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 6.5 (glass) | 93.75/93.75, 94.53/94.53 | 0 | 6.25 ≤ 7.25 | all pass |
| 1920x1080 | chromium | 0.17-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 93.75/93.75, 94.53/94.53 | 0 | 6.25 ≤ 7.25 | all pass |
| 360x780-dark | chromium | 0.13-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 5.58 (glass) | 97.12/97.12, 96/96 | 0 | 4 ≤ 5 | all pass |
| 360x780 | chromium | 0.12-0.17 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 97.12/97.12, 96/96 | 0 | 4 ≤ 5 | all pass |
| 390x844-coarse-dark-reduce | chromium | 0.17-0.17 | 0.23-0.23 | 0-0, 0-0, 0-0 | 7.28 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse-dark | chromium | 0.13-0.17 | 0.23-0.23 | 0-0, 0-0, 0-0 | 5.59 (glass) | 97.11/97.11, 95.98/95.98 | 0 | 4.02 ≤ 5.02 | all pass |
| 390x844-coarse-mask | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.81 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse-reduce | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.81 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse-still | chromium | 0.18-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.81 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse | chromium | 0.13-0.18 | 0.23-0.23 | 0-0, 0-0, 0-0 | 4.81 (download) | 97.11/97.11, 95.98/95.98 | 0 | 4.02 ≤ 5.02 | all pass |
| 768x1024 | chromium | 0.14-0.18 | 0.22-0.22 | 0-0, 0-0, 0-0 | 4.81 (download) | 95.31/95.31, 94.33/94.33 | 0 | 5.67 ≤ 6.67 | all pass |
| 1024x768 | webkit | 0.15-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 93.75/93.75, 93.21/93.21 | 0 | 6.79 ≤ 7.79 | all pass |
| 1440x900-lag16 | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 96.88/96.88, 96.92/96.92 | 0 | 3.13 ≤ 4.13 | all pass |
| 1440x900-mask | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900-reduce | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900-still | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 100/93.75, 100/93.84 | 0 | 0 ≤ 7.25 | all pass |
| 1440x900 | webkit | 0.16-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 93.75/93.75, 93.84/93.84 | 0 | 6.25 ≤ 7.25 | all pass |
| 1920x1080 | webkit | 0.16-0.18 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 93.75/93.75, 94.53/94.53 | 0 | 6.25 ≤ 7.25 | all pass |
| 360x780 | webkit | 0.12-0.17 | 0.21-0.21 | 0-0, 0-0, 0-0 | 4.82 (download) | 97.12/97.12, 96/96 | 0 | 4 ≤ 5 | all pass |
| 390x844-coarse-mask | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.77 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse-reduce | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.77 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse-still | webkit | 0.17-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.77 (download) | 100/97.11, 100/95.98 | 0 | 0 ≤ 5.02 | all pass |
| 390x844-coarse | webkit | 0.12-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.77 (download) | 97.11/97.11, 95.98/95.98 | 0 | 4.02 ≤ 5.02 | all pass |
| 768x1024 | webkit | 0.13-0.17 | 0.2-0.2 | 0-0, 0-0, 0-0 | 4.78 (download) | 95.31/95.31, 94.33/94.33 | 0 | 5.67 ≤ 6.67 | all pass |

## Answers to the prototype's questions

- **OQ-5: Playwright WebKit has view timelines.** Its build reports Safari 26.5. `CSS.supports("animation-timeline", "view()")` is true and the garbage probe false. The travel runs, and its rates match the derived ones to the hundredth in every cell that completed. The travel is therefore read in one WebKit. Shipping Safari is still unread (OQ-4).
- **OQ-6: the front run on the Blob.** The stock Blob passes in light and fails in dark: "glass" reads 4.62 at its worst point in light (just over the bar) and 1.99 in dark, where light ink crosses the Blob's light body. The knob is not the one W-B.19 names (D-2). With the body written as palette stops per theme, the worst point is 7.12 in light (5.58 to 7.12 across widths) and 6.59 in dark (5.58 at 360).
- **OQ-3 strips:** `hero-*-1440-light.png` (an eighth), `hero-*-1440-light-lag16.png` (a sixteenth) and `hero-*-1440-light-still.png` (none), in both engines; the same for `figure-` and `stage-`.

## Deviations

- **D-1: `--depth-travel` is declared on the scene, not on `:root`.** The spec's sheet does not do what R-8 says. A custom property resolves its `var()` where it is declared, so a root declaration computes `--depth-travel` with the root's `--depth-lag` and a scene that lowers the lag gets no smaller travel. Measured before the move: `?lag=0.0625` read 93.75 per 100 at 1440, the eighth's rate. After the move it reads 96.88 against 96.88 derived (both engines). The `cqi` term was never affected, because units are not resolved until the use site.
- **D-2: the Blob's tone is its palette stops, not its `color`.** The Blob's body paints `config.color.paletteStops`. Its `color` prop seeds the satellites' random draw and the wrapper's `--blob-color`. `color="red"` paints the same peach body as the default. Composition 1's cure for R-5 ("the Blob's `color` per theme") is therefore the stops per theme. The harness writes light `oklch(0.84 0.06 250)`, `0.88 0.05 244`, `0.93 0.035 238` and dark `oklch(0.30 0.09 268)`, `0.34 0.10 262`, `0.38 0.09 256`.
- **D-3: the caption laps the frame by the plate's own top padding, not by 1.5rem.** With the spec's lap, the caption's text sits on the plate over the picture's darker band and fails R-5 at every tier. Worst point, light / dark:

  | tier | worst point |
  |---|---|
  | quiet | 2.82 / 2.22 |
  | resting | 2.77 / 2.54 |
  | floating | 2.98 / 3.11 |
  | overlay | 2.91 / 3.51 |

  R-5 allows no third cure: no scrim, no darker plate. The harness instead sets `translate: 0 calc(100% - 0.625rem)` on the caption, so the plate's top band sits in front of the picture's lower edge and every line of text stands on the page ground. Worst points are 9.91 light and 10.99 dark. The cost is that the depth cue is now a 10 px band of plate over the picture, which reads more as a tab than as a sheet. `?lap=spec` shows the spec's geometry. This is a design question for the owner, not a settled cure.
- **D-4: the space in the split heading is written out.** Vue's template compiler drops whitespace between two elements on separate lines, so the spec's markup renders the heading's text as "Liquidglass". Chromium's tree still named it "Liquid glass", because the spans are blocks, but the DOM string was wrong. The harness writes `<span>Liquid</span>{{ " " }}<span>glass</span>`. The same applies to the stage value: `{{ mbps }}<small>Mbps</small>` is read and selected as "412Mbps" (measured, both engines). It is left as the spec wrote it and recorded here.
- **D-5: the still twin is `--depth-lag: 0` and `animation: none`, in the harness only.** Dropping `data-depth-lag` instead puts the picture back in the flow at its own aspect. The page grew from 4440 to 4616 px at 1440: the composition changed, not just its motion. With D-1 in place, lag 0 is travel 0, and the twin equals the reduced-motion form (same heights, same cover).
- **D-6: the instrument is an SVG ring** (`aria-hidden`, track and arc), standing for speedtest's dial. **D-7: the picture is generated** (folds of a sheet, 1200 px square, 68 KB). The repo has no clean photograph; the one candidate carries baked-in lettering.

## Findings outside the gates

- **A paused Blob that is resized paints nothing.** With `paused` true, changing the Blob's size (the blob-2x bite) clears its canvas, and the parked loop never redraws it: the hero showed no figure at all. Bites that resize were run with the Blob live. This is a Blob defect, outside W-B.19.
- **The Blob's `color` prop does not tint its body** (D-2). A consumer reading the prop's docstring ("the blob paints the gamma-sRGB triple of the `color` prop") gets the stock peach. Either the docstring or the prop is wrong.
- **"download" reads at 4.78 to 4.81**, on `--muted-foreground` over paper in light: a pass with little room. Dark reads 7.2.
- **The lag costs little and only during scroll.** The live Blob's own render is the cost on this page: 49.9 ms of main thread per step at 4× CPU against 3.8 with it paused. Depth adds 0.3.
- **Recalcs.** The view timeline adds about one style recalculation per scroll step, touching at most one element beyond the still twin's. The trace does not name the elements, so "touching no element but the lagging one" is inferred from the counts, not read.
- **G-COST's 1 ms clause alone does not catch `top`.** The bite raised main-thread time by only 0.7 ms per step; the layout and paint counts are what catch it.

## What was not done

- **WebKit, dark arm:** every dark cell, its strips and its bites (the crash above). Chromium covers dark.
- **G-COVER's blur clause** (a glass Card as the figure still blurs a stripe field behind it): no composition puts a glass plate in the figure's rung, and none was added.
- **A WebKit trace.** Playwright gives WebKit no devtools tracing or CPU throttle, so its G-COST is pacing and the animation list, unthrottled.
- **Observers.** No API lists them. The sheet carries no script, so it adds none by construction.
- **A touch drag** on the coarse cells: the selection drag used the mouse in every cell.
- **The demo's own pages.** The landing page's Blob hero and the "Depth" story are not built. The harness holds the three compositions; `?still=1` is the still twin.
- **Shipping Safari** (OQ-4) and the owner's three questions (OQ-1 to OQ-3). The OQ-3 strips exist for him to look at.
- **The `.md` precept text** (`PRECEPTS-ADDENDUM.md`) is not applied; it lands with the wave.
