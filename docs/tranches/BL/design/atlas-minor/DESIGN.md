# DataTable and Dialog for atlas: the design (O-429 GL-5 (a), (b), (d) and GL-10)

Seat: claude-opus-5-5 (asserted from its own system identity), BUILD round 1, 2026-11-24. It continues the attempt stopped for the agreed reboot (committed unjudged in ab6e7c2ce): that attempt's trees, cure and probe are kept, and this seat made one change to the cure (the card viewport's overscroll, below) and judged the rest.

The rows are INBOUND O-429, placed in `driver/glass-11.1.1-scope.md` (the 2026-11-24 section) into the first minor after 11.1.2. The patch is `cure.patch`, against release/11.1.1 (b9b96cb76). Readings are in `ROOT.md`; the note to atlas is `NOTE-atlas.md`.

## 1. The API

Every name is new except `origin`, which existed on `Dialog` as an unread seam and is now read.

| Where | Name | Type | What it does |
|---|---|---|---|
| `DataTable` prop | `viewportRef` | `(element: HTMLElement \| null) => void` (`DataTableViewportRef`) | Receives the element that scrolls the rows, for each projection as it mounts, and `null` as it leaves. Mirrors `rowRef`. |
| `DataTable` prop | `fit` | `boolean`, default `false` | Shows the leading columns that fit the viewport's inline size and folds the rest. The first column always shows. Off below the card breakpoint. |
| `DataTable` event | `fold` | `(columns: DataTableColumn[])` | The folded columns, in order, each time the folded set changes. |
| `DataTable` slot | `caption` | | The table's caption: `<caption>` in the table, `role="caption"` in the cards. |
| `DataTableColumn` | `width` | `string` (any CSS length) | The column's inline size: its header and body cells take it, and `fit` counts the column at it. |
| `DataTableColumn` | `rowHeader` | `boolean` | Its cells head their rows: `<th scope="row">` in the table, `role="rowheader"` in the cards. |
| `Dialog` prop | `origin` | `Element \| DOMRectReadOnly \| null` (`DialogOrigin`) | Where the content grows from and returns to. Was `DOMRectReadOnly \| null` and read nowhere. |
| `useSpringMount` option | `preset` | `MaybeRefOrGetter<SpringPreset>` | The row may be a getter, read at each open. |

Behaviour that changes with no shim (the minor's release note names each):

- **Every DataTable owns its viewport.** The root is a flex column that fills at most its host's block size; a host that gives it none gets a table as tall as its rows, as 11.1.1 does. The header cells stick to the viewport's top and the first cell of every row to its inline start. At rest nothing paints differently (§2).
- **The card projection keeps the table's semantics.** It was a `listbox` of `option`s when `selectable` and a run of unlabelled `div`s otherwise. It is now a `table` (or a `grid`, wherever the table projection is one) with a header row, one row per card and one cell per field. Cards keep `aria-rowindex`, `aria-rowcount` and `aria-colcount`, which 11.1.1 stripped.
- **The `sentinel` slot sits inside the viewport**, after the rows, where a host's IntersectionObserver against that viewport can see it.
- **DataTable renders its own `<table>`** in a `.table-container`, with no `caption-bottom`, instead of going through `<Table>`, because it needs the container element. `<Table>` itself is unchanged.

## 2. (a) The viewport, the sticky header and the sticky first column

`table/styles.css:22` gives `.table-container` `overflow: auto`, so it is a scroll container whether it scrolls or not, and a sticky header cell sticks to it and to nothing outside it. In 11.1.1 the container grows to the table's full height inside the host's own scroller, so the header scrolls away with the rows. A host's own `position: sticky` on the header has the same problem.

The cure makes that container the vertical scroller too:

- `.data-table` is `display: flex; flex-direction: column; max-block-size: 100%; min-block-size: 0`, and the viewport (`.data-table-viewport`, which is the table container in the table projection and the card list in the cards) is `flex: 1 1 auto; min-block-size: 0`. In a host with a definite block size (a grid track, a sized box, a dialog body), the viewport takes that size and scrolls both axes. `max-block-size` rather than `block-size`, so a short table stays short.
- `thead th` is `position: sticky; inset-block-start: 0; z-index: 2`. The first cell of every row is `position: sticky; inset-inline-start: 0; z-index: 1`, and the corner (the first header cell) is `z-index: 3`.
- A stuck cell needs a ground, or the rows show through it. It takes `--card` (the plate's opaque escape) and an inset rule, but only while rows pass beneath it. The viewport carries `data-scrolled-block` while `scrollTop > 0` and `data-scrolled-inline` while `scrollLeft ≠ 0`, set by a passive scroll listener. At rest the header and the column paint as in 11.1.1 (the witness reads `rgba(0, 0, 0, 0)` at rest). The ground and the rule tween in on `--duration-fast`. A collapsed border stays with the row it belongs to, not the cell that sticks, so the rules are drawn as inset shadows (an RTL rule flips the column's). A selected or hovered row's tint is laid over the stuck cell's ground.
- `viewportRef` hands the host that element: atlas's `useVirtualWindow` reads its `scrollTop` and `clientHeight`.

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

The role follows the table projection's: `grid` when `role="grid"`, `selectable` or `tabbableRowId` is set, else `table`. A field's visible label is hidden from that tree, because its column header already names the cell. Each card is a two-track grid, with the title and the actions on the first line and the fields after them. Each field is a subgrid row, so labels and values still line up across fields. The card list is the viewport: it scrolls inside the root as the table does, with a 0.25 rem inset that keeps a selected card's ring inside the clip.

**At and above the breakpoint, `fit`.** The table measures, on a hidden ruler, every column at its `width` (or, with none, its header's own width) against the viewport's inline size. It shows the leading columns whose widths fit, always the first, and emits `fold` with the rest. The ruler is out of flow, unpainted and as wide as the viewport, and it holds every column whether shown or folded. So folding a column never changes the measure that folded it, and the table cannot oscillate. Its ResizeObserver takes sizes from its entries only. A folding table keeps `scrollbar-gutter: stable`, so a scrollbar that comes and goes never changes the width it measured.

The table counts a column at its `width`. A column with no `width` is counted at its header, and its cells can still be wider (an automatic table layout sizes a column by its widest cell). So `fit` holds the table inside the viewport only when every column declares a `width`. atlas's columns all have one (§6).

What a host builds with the report, using what exists:
- **A column picker** reorders `columns`. The fit keeps the leading ones, so a picked column moves up into the shown set.
- **A row disclosure** goes in the `row-actions` slot (or the lead cell's `component`). It lists the folded columns' labels and values for its row from the `fold` set.

## 4. (d) The caption and the row-header column

- `#caption` renders `<TableCaption>` as the table's first child, above the header and on the table's own caption side (`caption-bottom` is not applied). It scrolls away with the rows while the header sticks. A native caption names the table; `ariaLabel`, when given, still wins. In the cards it is a `role="caption"` first child that names the table through `aria-labelledby` (unless `ariaLabel` is set).
- A column with `rowHeader: true` renders its body cells as `<th scope="row">` with the cell's padding and weight (`.data-table-row-header` keeps a header's bold and centring off it), and as `role="rowheader"` in the cards.

## 5. GL-10: the Dialog grows from its opener and returns to it

`Dialog` withholds `origin` from reka's root, as before, and provides it to `DialogContent` (`dialog/origin.ts`).

- **The rects.** An element origin is read at the open and again at the close, so the plate returns to where its opener is at that moment. If the opener has left the page (disconnected, or 0 × 0), the plate keeps the rect read at the open. A rect origin is used as given. The plate's resting box is read once it is laid out, before its first paint, with its own written transform set aside for the read. A ResizeObserver keeps that box when the content grows after the open (an async body), centred, because the plate is centred.
- **The frame.** One scalar, the mount position `p` (0 at rest, 1 dismissed), drives everything. It writes `transform: translate(dx·p, dy·p) scale(1 − p + (wₒ/wᵣ)·p, 1 − p + (hₒ/hᵣ)·p)` about the plate's centre, laid over the `translate: -50% -50%` centring longhand, plus `opacity: 1 − p`. The scrim reads the same `p`, as it does today. At `p = 1` the plate's box is the opener's box, and it is transparent.
- **The springs.** With an origin the entrance rides the `panel` row (the fired deploy: one rebound, about 2.9 % of the width at 1440). Without one it rides `present` in place, as in 11.1.1. The row is read at each open: `useSpringMount` now takes a getter and, when the row changes at an open, builds the next spring from where the surface stands, continuous in position and velocity. The exit is not the spring. As for every floating surface, the position tweens to 1 on the row's exit clock (`--spring-panel-exit-duration`, on `--exit-curve`), so the plate never overshoots on the way out.
- **Reduced motion.** No travel and no scale. The plate stays at rest size and position, and `p` is the fade's clock, in and out (the exit clock held to `--duration-fast`).
- **Before the first frame** the plate's resting box is unknown, so it paints at `opacity: 0` with no transform until the box is read. The witness's first frame is the opener's rect at opacity 0.

## 6. What atlas changes to adopt it

In `src/filter/ui/SourceDataBrowser.vue` on lv-atlas:

1. Remove the `.source-browser__viewport` wrapper and its rules (`overflow: auto`, the block sizes, `overflow: visible` on the table and its container, the sticky `thead`). The DataTable root takes the wrapper's grid row. In the data view, `.data-dialog__body`'s `minmax(0, 1fr)` row gives it its block size, and its viewport scrolls in it. Name the table with `aria-label`, or with a `#caption` if a visible name is wanted. The grid is then the landmark's content, with no extra `region`.
2. `:viewport-ref="(el) => (viewport = el)"`, so `useVirtualWindow` reads glass's viewport.
3. Column widths move into `width`: the lead column `"var(--source-lead-col, 16rem)"`, each other column `` `max(9rem, calc(${figureCh}ch + 1.5rem + 1px))` ``. The computed table `inline-size` and the `th:first-child` / `td:first-child` width rules go. The first column takes `rowHeader: true`.
4. `fit` and `@fold`. Keep the folded columns, and offer a picker that reorders `columns` and a disclosure in `#row-actions`. At 1440 the 1,202 px region shows the lead and about six columns, and the 2,911 px table no longer scrolls sideways.
5. Drop `:responsive="false"`. Below a 640 px container (the 344 px region at 390) the cards render, with atlas's `role="grid"` kept. The virtualizer works the same way there: `.data-table-card-list` takes the total size (`block-size: var(--source-total-size); position: relative`), and the cards take the same `getRowAttrs` transform as rows.
6. Keep atlas's own virtualization layout: `tbody { display: block }`, rows absolutely placed, and each `thead` and row as `display: table`. In that layout keep the rule that makes `thead` itself sticky, because glass's sticky header cells assume the native table model, and a cell cannot stick past a `thead` that is its own table box. The sticky first cell works inside atlas's absolutely placed rows.
7. In `DataDialog.vue`, `opener` becomes a `shallowRef` and the root takes `:origin="opener"`. The phone's Sheet does not read `origin`, so the 390 route is unchanged.

## 7. Placement and what is not in the patch

- **Against 11.1.2.** Every hunk applies to the 11.1.2 lane's tree (`design/atlas-rows-1112/trees/green`, as of today) except one context hunk in `data-table/styles.css`: 11.1.2's sort-button comment moved the anchor of the ruler block, which goes after the `.data-table-actions` rule. 11.1.2's inset focus ring on the sort button is what keeps a sticky header from clipping it.
- **The demo stages** (`demo/stories/data/data-table.stage.vue`, `demo/stories/containers/dialog.stage.vue`) do not yet show the caption, the row header, `fit` or the origin.
- **The opener's own focus return** is unchanged: the plate returns to the opener's rect, and focus returns as before.
