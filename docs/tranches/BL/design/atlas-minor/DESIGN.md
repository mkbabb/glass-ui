# DataTable and Dialog for atlas: the design (O-429 GL-5 (a), (b), (d) and GL-10)

Seat: claude-opus-5-5 (asserted from its own system identity), BUILD round 2, 2026-11-27. Round 1 built and judged the cure on 2026-11-24 (committed unjudged in ab6e7c2ce and fe281d921). A first round-2 attempt on 2026-11-24 and 25 edited its trees and stopped before any run; this seat kept those edits, judged them, and ran every reading again. The SCI critic's round-1 record is `critique-sci.md`; §8 says how each of its blocking items was cured.

The rows are INBOUND O-429, placed in `driver/glass-11.1.1-scope.md` (the 2026-11-24 section) into the first minor after 11.1.2. The patch is `cure.patch`, against release/11.1.1 (e12ad9f02; its `src/`, `tests/` and `demo/` are byte-identical to b9b96cb76, round 1's base). Readings are in `ROOT.md`; the note to atlas is `NOTE-atlas.md`.

## 1. The API

Every name is new except `origin`, which existed on `Dialog` as an unread seam and is now read.

| Where | Name | Type | What it does |
|---|---|---|---|
| `DataTable` prop | `viewportRef` | `(element: HTMLElement \| null) => void` (`DataTableViewportRef`) | Receives the element that scrolls the rows as each projection mounts it, and `null` as the table unmounts. Mirrors `rowRef`. |
| `DataTable` prop | `fit` | `boolean`, default `false` | Shows the leading columns that fit the viewport's inline size and folds the rest. The first column always shows. Off below the card breakpoint. |
| `DataTable` event | `fold` | `(columns: DataTableColumn[])` | The folded columns, in order, each time the folded set changes. |
| `DataTable` slot | `caption` | | The table's caption: `<caption>` in the table, `role="caption"` in the cards. |
| `DataTableColumn` | `width` | `string` (any CSS length) | The column's inline size: its header and body cells take it, and `fit` counts the column at it. |
| `DataTableColumn` | `rowHeader` | `boolean` | Its cells head their rows: `<th scope="row">` in the table, `role="rowheader"` in the cards. |
| `Dialog` prop | `origin` | `Element \| DOMRectReadOnly \| null` (`DialogOrigin`) | The control that opened the dialog (taken from its click), or a rect; `null` when nothing on the page opened it. The content grows from it and returns to it. Was `DOMRectReadOnly \| null` and read nowhere. |
| `useSpringMount` option | `preset` | `MaybeRefOrGetter<SpringPreset>` | The row may be a getter, read at each open. |

Behaviour that changes with no shim (the minor's release note names each):

- **Every `useSpring` advances by at most one 60 Hz frame per frame** (§5.3). A long frame slows a spring instead of letting it skip ahead. This reaches every surface built on `useSpring`: the Dialog's and the Sheet's mounts, the press springs through `useLiquidPress` (Button, DockControl, DarkModeToggle, Timeline) and Timeline's own spring, and any consumer's `useSpring`. Springs that drive `SpringProgress` directly (the Sheet's detents, the sortable list, `useDragMorph`, `useScrollScene`) are unchanged.
- **Every DataTable owns its viewport.** The root is a flex column that fills at most its host's block size; a host that gives it none gets a table as tall as its rows, as 11.1.1 does. A host that holds other content beside the table gives the table a flex or grid row (a sized block host with a heading above the table now scrolls twice: the host by the heading's height, the viewport by the rest). The header cells stick to the viewport's top and the first cell of every row to its inline start.
- **The card projection keeps the table's semantics.** It was a `listbox` of `option`s when `selectable` and a run of unlabelled `div`s otherwise. It is now a `table` (or a `grid`, wherever the table projection is one) with a header row, one row per card and one cell per field. Cards keep `aria-rowindex`, `aria-rowcount` and `aria-colcount`, which 11.1.1 stripped. The cards sit 0.25 rem inside their viewport, 4 px in from where 11.1.1 drew them.
- **The `sentinel` slot sits inside the viewport**, after the rows, where a host's IntersectionObserver against that viewport can see it. In the loading, error and empty states of the cards, which have no viewport, it follows the state card, as in 11.1.1.
- **DataTable renders its own `<table>`** in a `.table-container`, with no `caption-bottom`, instead of going through `<Table>`, because it needs the container element. `<Table>` itself is unchanged.

## 2. (a) The viewport, the sticky header and the sticky first column

`table/styles.css:22` gives `.table-container` `overflow: auto`, so it is a scroll container whether it scrolls or not, and a sticky header cell sticks to it and to nothing outside it. In 11.1.1 the container grows to the table's full height inside the host's own scroller, so the header scrolls away with the rows. A host's own `position: sticky` on the header has the same problem.

The cure makes that container the vertical scroller too:

- `.data-table` is `display: flex; flex-direction: column; max-block-size: 100%; min-block-size: 0`, and the viewport (`.data-table-viewport`, which is the table container in the table projection and the card viewport in the cards) is `flex: 1 1 auto; min-block-size: 0`. In a host with a definite block size (a grid track, a sized box, a dialog body), the viewport takes that size and scrolls both axes. `max-block-size` rather than `block-size`, so a short table stays short.
- `thead th` is `position: sticky; inset-block-start: 0; z-index: 2`. The first cell of every row is `position: sticky; inset-inline-start: 0; z-index: 1`, and the corner (the first header cell) is `z-index: 3`.
- A stuck cell needs a ground, or the rows show through it. It takes `--card` (the plate's opaque escape) and an inset rule, but only while rows pass beneath it. The viewport carries `data-scrolled-block` while `scrollTop > 0` and `data-scrolled-inline` while `scrollLeft ≠ 0`, set by a passive scroll listener. At rest the table's header and first column paint as in 11.1.1 (the witness reads `rgba(0, 0, 0, 0)` at rest). The ground and the rule tween in on `--duration-fast`. A collapsed border stays with the row it belongs to, not the cell that sticks, so the rules are drawn as inset shadows (an RTL rule flips the column's). A selected or hovered row's tint is laid over the stuck cell's ground.
- `viewportRef` hands the host that element, and `null` as the table unmounts, so a virtualizer that outlives the table lets go of it. atlas's `useVirtualWindow` reads its `scrollTop` and `clientHeight`.

Which ancestor scrolls is the whole bug, so the witness measures it: after a wheel of 1,500 down and 800 across over the host region, the viewport has `scrollTop` 1,500 and `scrollLeft` 800, the host and the page have 0, the header and the corner sit at the region's top and left edges within a pixel, a body row's first cell sits at the left edge, and at points under the header and under the first column the topmost element is the header cell and the row's first cell.

## 3. (b) Narrow: the cards keep the role. Wide: `fit`

**Below `cardBreakpoint` (640 px container, `responsive`)** the cards are the answer, and they now carry the same tree as the table:

```
table|grid  "‹caption›"   aria-colcount, aria-rowcount, aria-labelledby → caption
  caption                 (the #caption slot, first child)
  rowgroup  (visually hidden)
    row     columnheader × columns (aria-sort when sortable)
  rowgroup  .data-table-card-list
    row     .data-table-card  (aria-selected, aria-rowindex, the host's row attrs)
      rowheader|cell|gridcell   the first column (the card's title)
      cell|gridcell × the rest  label (aria-hidden) + value
      cell|gridcell             the row actions, when the slot is given
```

The role follows the table projection's: `grid` when `role="grid"`, `selectable` or `tabbableRowId` is set, else `table`. A field's visible label is hidden from that tree, because its column header already names the cell. Each card is a two-track grid, with the title and the actions on the first line and the fields after them. Each field is a subgrid row, so labels and values still line up across fields.

The card viewport (`.data-table-cards`) scrolls inside the root as the table does, with a 0.25 rem inset that keeps a selected card's ring inside the clip. The card list inside it is `flex: none`: it is the viewport's content and never shrinks to the viewport. A host that virtualizes the cards sets the list's block size to every row's total and places the cards in it, and that total is the scroll range. With the flex item's default shrink, the list took the viewport's 596 px and the range was only the mounted cards (§8, B-2).

**At and above the breakpoint, `fit`.** The table measures, on a hidden ruler, every column at its `width` (or, with none, its header's own width) against the viewport's inline size. It shows the leading columns whose widths fit, always the first, and emits `fold` with the rest. The ruler is out of flow, unpainted and as wide as the viewport, and it holds every column whether shown or folded. So folding a column never changes the measure that folded it, and the table cannot oscillate. Its ResizeObserver takes sizes from its entries only. A folding table keeps `scrollbar-gutter: stable`, so a scrollbar that comes and goes never changes the width it measured.

The table counts a column at its `width` (a column with none at its header). So the shown columns stay inside the viewport while every cell stays within its column's width: under the automatic table layout, a cell wider than its width (an unbreakable token, a column with no `width`) widens its column and the table can still overflow. atlas's fixed layout, ellipsis and wrap-anywhere lead keep every cell inside its width (§6).

What a host builds with the report, using what exists:
- **A column picker** reorders `columns`. The fit keeps the leading ones, so a picked column moves up into the shown set.
- **A row disclosure** goes in the `row-actions` slot (or the lead cell's `component`). It lists the folded columns' labels and values for its row from the `fold` set.

## 4. (d) The caption and the row-header column

- `#caption` renders `<TableCaption>` as the table's first child, above the header and on the table's own caption side (`caption-bottom` is not applied). It scrolls away with the rows while the header sticks. A native caption names the table; `ariaLabel`, when given, still wins. In the cards it is a `role="caption"` first child that names the table through `aria-labelledby` (unless `ariaLabel` is set).
- A column with `rowHeader: true` renders its body cells as `<th scope="row">` with the cell's padding and weight (`.data-table-row-header` keeps a header's bold and centring off it), and as `role="rowheader"` in the cards.

## 5. GL-10: the Dialog grows from its opener and returns to it

`Dialog` withholds `origin` from reka's root, as before, and provides it to `DialogContent` (`dialog/origin.ts`).

### 5.1 The origin

`origin` is the control that opened the dialog: the button the reader pressed, taken from its click (`event.currentTarget`). When nothing on the page opened it (a link loaded with the dialog open, a Back or Forward step), the host passes `null` and the plate blooms in place. The doc on `Dialog` and on `DialogOrigin` says so.

`document.activeElement` is not an opener. On a page loaded with the dialog open it is `document.body`, and the plate would grow from the whole page (the critic read a first frame of 1,440 × 3,032). A clicked button is not focused in every browser either. glass does not guard against `document.body` in `readOrigin`: a guard there would hide a host's mistake instead of showing it, and whether glass should check the contract is the owner's call (§9).

### 5.2 The rects and the frame

- **The rects.** An element origin is read at the open and again at the close, so the plate returns to where its opener is at that moment. If the opener has left the page (disconnected, or 0 × 0), the plate keeps the rect read at the open. A rect origin is used as given. The plate's resting box is read once it is laid out, before its first paint, with its own written transform set aside for the read. A ResizeObserver keeps that box when the content grows after the open (an async body), centred, because the plate is centred.
- **The frame.** One scalar, the mount position `p` (0 at rest, 1 dismissed), drives everything. It writes `transform: translate(dx·p, dy·p) scale(1 − p + (wₒ/wᵣ)·p, 1 − p + (hₒ/hᵣ)·p)` about the plate's centre, laid over the `translate: -50% -50%` centring longhand, plus `opacity: 1 − p`. The scrim reads the same `p`, as it does today. At `p = 1` the plate's box is the opener's box, and it is transparent. Every channel of the frame is linear in `p`, so a frame moves the plate by a fixed length times the step in `p`: the centre by the travel, the width by `wᵣ − wₒ`, the opacity by 1.
- **Before the first frame** the plate's resting box is unknown, so it paints at `opacity: 0` with no transform until the box is read. The witness's first frame is the opener's rect at opacity 0.

### 5.3 The clocks

- **The springs.** With a readable origin rect the entrance rides the `panel` row (the fired deploy: one rebound, about 2.9 % of the plate's width at 1440). Without one, including an opener that has left the page, it rides `present` in place, as in 11.1.1. The row is read at each open: `useSpringMount` takes a getter and, when the row changes at an open, builds the next spring from where the surface stands, continuous in position and velocity.
- **The frame clock.** `useSpring` steps its `SpringProgress` once per animation frame, by the time since the last frame but by at most one 60 Hz frame (`FRAME_MS`), as glass's exit clock (`runExitClock`) already does. keyframes.js's own loop (`RAFPlayback.drive`, armed by `SpringProgress.play`) advances by the raw frame difference with no bound, so a 200 ms frame moved a spring through twelve frames of its curve at once. That is present on 11.1.1, where the in-place bloom hides it in a 5 % scale and an opacity step; the travel from an opener turned it into a jump across a third of the screen (§8, B-1). `useSpring` no longer arms the engine's loop: it runs its own `RAFPlayback.loop`, started when a target re-seat leaves the spring moving and stopped when it settles, by `snap`, by `reset` and by dispose. So no painted frame moves a surface further than one 60 Hz frame of its spring can, whatever the frame's length. On frames of 60 Hz and faster the spring keeps its own clock. Where frames arrive slower than 60 Hz (a throttled browser), every spring runs slower than its clock, as every exit already does, and a JS spring trails its CSS twin by the time the long frames withheld.
- **The exit is not the spring.** As for every floating surface, the position tweens to 1 on the row's exit clock (`--spring-panel-exit-duration`, on `--exit-curve`), so the plate never overshoots on the way out. The exit clock already advanced by at most one 60 Hz frame per frame; it now reads the shared `FRAME_MS` for that.
- **Reduced motion.** No travel and no scale. The plate stays at rest size and position, and `p` is the fade's clock, in and out (the exit clock held to `--duration-fast`).

## 6. What atlas changes to adopt it

In `src/filter/ui/SourceDataBrowser.vue` and `DataDialog.vue` on lv-atlas (da0528f):

1. Remove the `.source-browser__viewport` wrapper and its rules (`overflow: auto`, the block sizes, `overflow: visible` on the table and its container, the sticky `thead`), and `.data-dialog__body .source-browser__viewport`. The DataTable root becomes the browser's third child. Set `.data-dialog__body { grid-template-rows: auto auto minmax(0, 1fr) }`, so the table's row is the one that takes the body's free block size (today's four tracks leave the fourth empty since the browser lost its fourth child). Name the table with `aria-label`, or with a `#caption` if a visible name is wanted. The grid is then the section's content, with no extra `region`.
2. `:viewport-ref="(el) => (viewport = el)"`, so `useVirtualWindow` reads glass's viewport.
3. Column widths move into `width`: the lead column `"var(--source-lead-col, 16rem)"`, each other column `` `max(9rem, calc(${figureCh}ch + 1.5rem + 1px))` ``. The computed table `inline-size` and the `th:first-child` / `td:first-child` width rules go. The first column takes `rowHeader: true`.
4. `fit` and `@fold`. Keep the folded columns, and offer a picker that reorders `columns` and a disclosure in `#row-actions`. At 1440 the 1,202 px region shows the lead and about six columns, and the 2,911 px table no longer scrolls sideways.
5. Drop `:responsive="false"`. Below a 640 px container (the 344 px region at 390) the cards render, with atlas's `role="grid"` kept. To virtualize them, give `.data-table-card-list` the total size (`position: relative; block-size: var(--source-total-size)`), place each card absolutely (`position: absolute; inset-block-start: 0; inline-size: 100%`) with the same `getRowAttrs` transform as a row, and hand each card to `observe` through `rowRef`. Absolutely placed cards no longer take the list's gap, so atlas keeps its own space between them: the witness adds 8 px to each measured size in `useVirtualWindow` (three lines).
6. Keep atlas's own virtualization layout for the table: `tbody { display: block }`, rows absolutely placed, and each `thead` and row as `display: table`. In that layout keep the rule that makes `thead` itself sticky, because glass's sticky header cells assume the native table model, and a cell cannot stick past a `thead` that is its own table box. The sticky first cell works inside atlas's absolutely placed rows.
7. **The dialog's origin is the door, from its click.** The doors push `?browse=` (`openSourceData` in `useVizPlate.ts` and `ChapterStage.vue`, `openFigureRows`, `openDatasetView`); none of them hands its element on today. Each door keeps `event.currentTarget` beside the push (one `shallowRef` in `data-view.ts` that a door sets and `DataDialog` takes, then clears, as the view opens), and `DataDialog` passes it as `:origin`. A view opened with no click (a shared link, Back or Forward) finds the ref empty and passes `null`, and the plate blooms in place. `document.activeElement` (atlas's `opener` today) is the page's body on a deep-linked open. The same element can serve atlas's focus return. The phone's Sheet does not read `origin`, so the 390 route is unchanged.

## 7. Placement and what is not in the patch

- **Against 11.1.2.** §7 of `ROOT.md` reads the patch against release/11.1.1 with the atlas 11.1.2 lane's `cure.patch` applied first: every hunk applies except the context hunk in `data-table/styles.css` that round 1 named, where 11.1.2's sort-button comment moved the anchor of the ruler block (it goes after the `.data-table-actions` rule). 11.1.2's inset focus ring on the sort button is what keeps a sticky header from clipping it.
- **The demo stages** (`demo/stories/data/data-table.stage.vue`, `demo/stories/containers/dialog.stage.vue`) do not yet show the caption, the row header, `fit` or the origin.
- **The opener's own focus return** is unchanged: the plate returns to the opener's rect, and focus returns as before.

## 8. The critic's round-1 blocking items, and how each was cured

- **B-1, a long frame moved the plate hundreds of pixels in one frame.** Cured at the root, glass's spring clock (§5.3): `useSpring` bounds each frame's advance to one 60 Hz frame, as `runExitClock` does. The unit test steps a spring through a 200 ms frame and reads the same value as after a steady frame (on 11.1.1 it reads 97.4 against 20.2 of 100). The browser witness judges every step between frames, with no frame-length exemption, against what one 60 Hz frame of the clock in play can move, computed from glass's own rows; the heavy cells inject the critic's case (a body that mounts 100 ms after the open with a 90 ms task) plus a 120 ms task in the entrance and another in the close (`ROOT.md` §4).
- **B-2, virtualized cards stopped short.** Cured in glass: `.data-table-card-list` is `flex: none` (§3). The witness rebuilds the critic's cell with atlas's own `useVirtualWindow` and reads it with the list's shrink given back as the control (`ROOT.md` §3).
- **B-3, the plate grew from the whole page on a deep link.** Cured in the contract and the note: `origin` is documented as the control that opened the dialog, taken from its click, or `null` (§5.1), and the note tells atlas to carry each door's element from its click and to pass `null` on a deep link (§6.7). The witness opens the dialog with no origin, as a deep link does, and reads it bloom in place (`ROOT.md` §4).

The critic's other items: `viewportRef` now hears `null` on unmount; the sentinel follows the cards' state card again; `fit`'s doc and §3 state the cell-width condition; §1 states the cards' 4 px inset and the nested host; §6.1 gives atlas the grid tracks; §9 carries the two design questions.

## 9. Questions for the owner

- **The stuck ground.** While scrolled, the stuck header and column take `--card`, which reads lighter than a page table's plate (253, 245, 236 against 231, 220, 208 in light). At rest the three match. Should the ground be the plate composited over `--background` instead? atlas paints its own sticky head with a `--card` mix, so its view is unaffected.
- **The panel row on a room-sized plate.** glass keeps `bloom` because the fired deploy's rebound on a room-sized plate can read as wobble. On atlas's 1,248 × 828 plate grown from a 160 × 40 button, the witness reads the rebound at 45.8 px of width and 33.2 px of height (`ROOT.md` §4). The scope names the panel; whether atlas's plate should ride `bloom` is for after seeing atlas's view.
- **The frame clock's bound.** One 60 Hz frame, as the exit clock, so no painted frame moves a surface further than a smooth 60 Hz frame does. The cost is time on a slow machine: under the day's load (Chromium painting at 15 to 20 fps) the entrance on atlas's plate took 3.3 s against its 0.8 s clock (`ROOT.md` §4). A bound of one 30 Hz frame would keep a 30 Hz display on its clock and let a stall move a surface twice as far as a 60 Hz frame does.
- **A guard against `document.body` as an origin** (§5.1).
