# Horizontal bounding: the study

The owner, 2026-11-23, in atlas's dark mode: "Many items can horizontally scroll, like the fiters view, which should not--a design study should be done for every interactive element for this bounding error, too--communicate to value.js for their pages, glass-ui, etc".

Three faults were looked for in every interactive part:

- **(a)** content wider than its box: a `scrollWidth` over `clientWidth` where no sideways scroll is meant, or a child past its parent's edge;
- **(b)** a scroller that pans sideways under a vertical swipe, or accepts a horizontal pan it should not;
- **(c)** a page wider than the viewport.

A deliberate horizontal strip (a carousel, a long dock run, a table, a code block) may pan by a horizontal gesture, never by a vertical one. The cure is at the root and the smallest that works. `overflow-x: hidden` or `clip` on a wrapper to hide a box that is too wide is a mask, not a cure.

Read on glass `release/11.1.1` (4f1fa667e). `cure.patch` applies to it with `git apply` and is what 11.1.2 takes from this study. **Chromium** is Playwright's Chromium headless shell 149.0.7827.55; **WebKit** is Playwright's WebKit 26.5, not Safari; **Safari** was not run, and no iPhone was read. A number with no engine named is Chromium's. The method, every table and the record are in `SWEEP.md`; the critique of the first cure and the rulings on it are in `critique.md` and `fold.md`.

## What 11.1.2 ships

| file | rule | fixes |
|---|---|---|
| `src/components/sheet/styles.css` | the region and the detented sheet: `grid-template-columns: minmax(0, 1fr)` | F2 |
| `src/components/dialog/styles.css` | the plate: `grid-template-columns: minmax(0, 1fr)` | F2b |
| `src/components/toast/Toaster.vue` | the body: `grid grid-cols-1 gap-1` | F2c |
| `src/styles/typography/semantic.css` | the line law: `overflow-wrap: break-word` on the surfaces that hold prose (overlay plates, Select content, Command, Dialog, Sheet, Toast, disclosure content) and the Label; `overflow-wrap: anywhere` on the rows a plate gives its width to (menu and Command rows, the Accordion trigger, the Select trigger) | F3 |
| `src/styles/glass/overlay-plate.css` | the tooltip plate takes the menu plate's inline cap | F3 |
| `src/components/toggle-group/styles.css` | the item: `max-inline-size: 100%` | F3, atlas's case |
| `src/components/tabs/styles/segmented.css` | the strip: `max-inline-size: 100%`, `overflow-x: auto`, `overscroll-behavior-x: contain`, `scrollbar-width: none` | F1 |
| `src/components/timeline/Timeline.vue` | the plate reserves half a target on the inline axis, fine and coarse | F4a |

Two rules carry most of it. A one-column grid's column gets a floor of 0, so its rows lay out at the plate's width instead of at their widest child's. And a word longer than its line breaks where the line ends; only rows whose width comes from outside give the word up in their min-content, so nothing that sizes to its own label (a Button, a Chip, a toggle item, a table cell) is narrowed to a letter a line. No wrapper gains `overflow-x: hidden` or `clip`. The one new scroller is the SegmentedTabs strip, which pans its own tabs as the dock run does.

## Every fault

"Built" is in `cure.patch`. "With value.js's items" goes to the seat that folds value.js's census (`inbound/value-js-2026-11-23.md`) into the same patch for 11.1.2. "For the owner" is a cure that changes how a part looks or behaves beyond its bound, so it is not built until the owner picks it.

| | part | fault | cause at 11.1.1 | in 11.1.2 | before → after |
|---|---|---|---|---|---|
| F1 | SegmentedTabs | (a) the strip runs past its box; (b) the scroller above it pans; (c) the page widens | `tabs/styles/segmented.css:61-63`: an `inline-grid` of `1fr` columns, each at least its label (`:184`, `nowrap`), with nothing bounding the strip | built: the strip is bounded by its box and pans its own tabs; each tab keeps its whole label; a selected tab scrolls into view | eight tabs in a 267 px box: 651/267, panned 206 px → 267/267, 0; the strip pans its tabs, and three vertical swipes starting on it moved nothing. 1440: 854/267 → 267/267 |
| F2 | Sheet at a narrow side rung | (a) rows cut by the plate | `sheet/styles.css:123-127`, `:86-94`: one-column grids whose `auto` column takes the widest child's min-content | built | 220/154 → 154/154, both engines |
| F2b | Dialog | (a) the header past the plate and the screen | `dialog/styles.css:21-24`: the same | built | 443/348 → 348/348 at 390 touch; 517/510 → 510/510 at 1440 |
| F2c | Toast | (a) the toast wider than the screen | `toast/Toaster.vue:113`: the body's `grid`, an `auto` column in a flex row | built | a 455 px toast on a 390 screen → 358 px, 356/356 |
| F3 | text in menus, Popover, Select (options and trigger), Command, Accordion trigger, Dialog, Sheet, Toast, Tooltip, Label | (a) a long word holds the part open, or a plate cuts it mid-word | no part set `overflow-wrap`; the tooltip plate had no inline cap (`overlay-plate.css:136-147`); the Select trigger's `line-clamp-1` cut a single word with no ellipsis (`SelectTrigger.vue:63`) | built: the line law and the tooltip cap | menu 382/350 → 350/350; popover 441/334 → 334/334; Select options 403/350 → 350/350; Command row 370/166 → 166/166; Accordion trigger 386 px in 200 → 200; a 672 px tooltip on a 390 screen → 352 px. In WebKit, on v2 and v3, the menu, Popover, Toast and Tooltip cases stop widening the page (487 → 390 at 390 touch); WebKit did not read v4 |
| F3 | ToggleGroup item: **atlas's Filters view** | (a) an option label longer than the field holds the row open; (b) the drawer's `overflow-y: auto` body pans | `toggle-group/styles.css:55`: the item is `flex: none` with no inline cap | built: the item is capped at its row and its label wraps between words | atlas's drawer, a 50-character option: the item 307 px in a 235 px field, the body panned 56 px → the item 235 px on two lines, 0 (390 touch); 358 px in 310, panned 32 → 0 (1440) |
| F3 | a Button, Chip or toggle item whose label is one word wider than its container | (a) the label runs past the control | the label is an anonymous flex item, whose minimum is its longest word | kept whole, as the library already rules for Badge: `anywhere` here stacked short words a letter a line in tables and squeezed rows (`fold.md`, B1). The cure that keeps both, for the owner: the label in its own box with `min-inline-size: 0` and `overflow-wrap: break-word`, the control capped at its container. It changes each part's markup | Chip 258/200 and Button 275/156, unchanged; the stress drawer's Chip holding a 55-character file name still pans it 25 px |
| F4a | Timeline | (a) the end marks' targets past the plate | `timeline/Timeline.vue:400-405`, `:441-449`, `:547-550`, `:566-568`: a seat centred on each end of the track, no inline reserve | built: half a target reserved on each side. It costs the track one target: 300 → 256 px at 390 touch, 936 → 912 at 1440 | 322/300 → 300/300; 948/936 → 936/936, both engines |
| F4b | PagerDots | (a) both sides, past the screen's left edge | `pager-dots/PagerDots.vue:46`: `windowFit` is opt-in, so every dot shows | for the owner: PagerDots windows itself when `count × pitch` passes its box (a default `windowFit`), or the consumer passes `windowFit` | 7 coarse dots need 266 px in a 200 px column; the first sits at x −54 |
| F5 | LabeledField, side by side | (a) the control squeezed below its input | `labeled-field/LabeledField.vue:121-133`: the layout folds to one column at a 36rem viewport, not at the field's own width | for the owner: a container query on a wrapper, which changes the part's structure | the control column 10 px wide holding a 26 px input (1440, a 240 px stage) |
| F6 | Button | (a) the icon or the label past a squeezed button | `button/styles.css:47`: `min-inline-size: 0` lets a track or a row squeeze it below its icon or its longest word | for the owner: `min-inline-size: auto`; the row then overflows instead of the label and the consumer wraps the row | a 25 px button, its 16 px icon 7 px past; "Download" 11 px past a 54 px button in a 240 px row of four (390 touch) |
| F7 | Chip, selected | (b) an unpadded vertical scroller pans | `styles/glass/glass-chip.css:27-28`: the selected Chip is drawn at `scale` 1.074, and a transformed box counts toward its scroller's overflow | for the owner, two options: grow the flood as paint outside the box (a spread shadow in the band's colour) and scale only the label; or rest unselected Chips at 1 / 1.074 and the selected at 1 | a full-width selected Chip in a 300 px box: 311/300, panned 11 px; 300/300 with 16 px of inline padding |
| F8 | GlassDock run whose seats all show | (b) the run pans 4 px with nothing hidden | `dock/styles/run.css:426-432`: under `data-run-fits` the reserve boxes still floor at the ring's reach | with value.js's items. The vertical arm's form (`run.css:418-420`) applied to the horizontal boxes: under `data-run-fits` they yield to the room the seats leave, down to 0 | three seats: 196/192, panned 4 px (390 touch); 213/209 (1440) |
| V2 | LabeledField's grids | (a) a Select cannot shrink in its field | `LabeledField.vue:78-83`: field, copy and control grids with no column template (value.js's item 2) | with value.js's items | value.js's reading: triggers 15 to 54 px past their fields |
| V3 | EasingPicker, the Steps row | (a) the jump-term Select past the column | `easing/EasingPicker.vue:553-569`: the row is `min-w-40` but its content floors at 216 px (value.js's item 3) | with value.js's items | in steps mode in a 200 px column at 1440, the jump-term Select ends 29 px past the column and the picker reads 230/200, base and v4; clean in a 300 px column and in 200 px at 390 touch |

value.js's item 4 asks to pair every `overflow-y: auto` with `overflow-x: hidden`. That hides a child that is too wide instead of fitting it, so 11.1.2 does not add it.

## The clean parts

With each part's own demo content, in the base, opens and variants passes (all 80 routes in Chromium at 390 touch and 1440; 21 routes at 390 touch and 18 at 1440 in WebKit), nothing pans sideways and no page widens. The only faults there are F2 and F4a; the fold's compositions add F7 and F8.

No fault of their own in any pass, long labels included: Alert, Avatar, Card, Checkbox, Collapsible, Configurator, ConstellationField, DataTable, FourierField, InfiniteScroll, Input, Metric, NumberField, Textarea, Progress, RadioGroup, Separator, Slider, SortableList, Surface, Switch, Table (its container scrolls, as designed), Typewriter, CarouselPager, DockLayerGroup, and every dock and dock run apart from F8. EasingPicker reads clean in a 300 px column at both widths; its one fault is V3.

Read as overflow and meant: the long dock run (a sideways strip; Chromium panned none of its runs under a vertical swipe starting on it, with 0, 16 or 48 px of drift), the Carousel track, the Table container, code blocks, the configurator gallery, the Deck strip, an overfull SegmentedTabs strip; the Skeleton shimmer, the HandMark reveal, the MusicStaff window, the Blob canvas bleed, the Slider range under its thumb, the StatusDot and Avatar status marks, the DotRing spokes, the toast's corner close target, the graded halo behind a sheet.

**Vertical swipes** (Chromium, 390 touch, the v4 build): 459 on the 22 cure routes and 36 on the fold page, each started on a sideways scroller (SegmentedTabs strips, dock runs, code blocks, the Carousel track, the Table container), straight and with 16 px and 48 px of sideways drift. None moved a box sideways. Horizontal swipes on boxes not meant to pan: 5 of 10 panned on the cure routes, each from a control holding the 55-character file name (F3, kept whole), and on the fold page the F7 scroller panned 11 px.

## Not read

- **Safari, and the iPhone.** Every WebKit reading is Playwright's WebKit build. Whether a vertical swipe with drift pans a sideways scroller on iOS was not measured.
- **(b) in WebKit.** Playwright's WebKit has no touch-move input; its rows give box sizes at rest.
- **v4 in WebKit.** WebKit read the base, v2 and v3 on 22 routes. The v4 run waited 22 minutes for the machine-wide WebKit lock, behind other sessions' WebKit runs, and was stopped. The rows marked "both engines" are rules v4 kept from v3 (the Sheet, Dialog and Toast columns, the tooltip cap and the Timeline reserve); the v4 strip (F1), the line law as the fold narrowed it (F3) and the fold page were read in Chromium only. WebKit also crashed on opening a Select and the first Accordion item, so it has no Select reading.
- **Dark.** The base pass of all 80 routes in Chromium matched light's; the Filters drawer was read in dark in both engines. The other passes ran in light.
- **Consumer pages.** Atlas's drawer was built from atlas's source on the study's page; atlas's and value.js's own pages were not loaded. `check-overflow.mjs` is for the sites to run on them.
- **Not driven:** drags, resizing while a part is open, keyboard scrolling.
