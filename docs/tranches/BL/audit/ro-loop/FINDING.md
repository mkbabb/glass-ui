# The WebKit ResizeObserver loop on `/`: finding

Seat: claude-opus-5-5, 2026-11-16. Target: the live demo https://glass.babb.dev
(master b4d29361a). Engine: Playwright 1.61.1 WebKit, build **2311** (that is what 1.61.1
installs, and what `check-live.mjs` ran on; not 2287). Cross-checked on 2287
(value.js's Playwright 1.60.0) and 2370 (gregg's 1.64.1), both read-only. Headless, under
`guarded --exclusive webkit`, one browser per run, one context per cell. Source read on
the bl/demo tree (e7c0be688, an ancestor of b4d29361a; `useBarShape.ts`, `Button.vue`
and `demo/chassis/landing/` are byte-identical in both). No tracked file changed, no
build, no preview server.

## Answer

**The component is Button, through the library's `useBarShape` observer**
(`src/components/_shared/shape/useBarShape.ts:46`, one per Button from `Button.vue:111`).
Its target is the `<button>` itself. On `/` the first one to fire is the first Button in
the /display card's live preview (`demo/stories/display/buttons.stage.vue`), at DOM depth 14.

**Its callback writes nothing.** `data-shape` stays unset, and there are 0 attribute
writes in every error frame. The callback *reads* layout: `getComputedStyle` and
`getBoundingClientRect()` (`useBarShape.ts:19-21`).

**Why that read changes boxes inside the delivery:**

1. Each card on `/` mounts an async preview. Vite's preload helper adds that chunk's CSS
   as `<link rel=stylesheet>` in `<head>` and resolves the import once *that chunk's*
   sheets load. So a card can mount while other cards' sheets are still loading (1 to 11
   pending in the readings below).
2. While a sheet is loading, WebKit's rendering update gives the newly inserted nodes no
   box. The Button's first notification therefore carries **0x0**.
3. The callback's `getBoundingClientRect()` forces style and layout anyway (7 to 17 ms in
   one callback). Inside the delivery, the whole pending subtree gets its boxes:
   - the button goes from 0x0 to 94x40 (depth 14, the observer's own target)
   - every mounted card's `.section-preview-card-specimen` (depth 12, watched by the
     card's fit observer) grows, for example from 40 to 201 px
4. The frame's shallowest delivered depth is already 14. Boxes at depth 14 or above are
   not delivered again in that frame, so the engine reports "ResizeObserver loop completed
   with undelivered notifications." The next frame delivers exactly those boxes.

Chromium boxes the new nodes while the sheet loads (its first delivery is real-sized), so
there is nothing for a read to force. The minimal page below shows the engine behaviour
with no glass code at all.

**Library or demo: the library.** In 40 of the 41 unheld red cells of the live site, the
callback that forced layout for the first error is `useBarShape`. That is the first
callback in the error frame to run 2 ms or more, counted over every row that leaves the
observers unchanged. The 41st was forced by the demo card's fit observer, and so was 1 of
the 6 held baseline cells.
The demo supplies the condition: lazy cards whose chunk CSS loads beside one another. Any
app with code-split routes has that condition, and that includes the consumer report. Two
more observers read layout inside their deliveries and raise the same loop once
`useBarShape` is silent:

- the library's selection indicator (`src/composables/motion/morph/useSelectionIndicator.ts:202`,
  whose `updateSingleSlider` calls `getBoundingClientRect()` at :151-152)
- the demo card's fit observer (`demo/chassis/landing/SectionPreviewCard.vue:35`, whose
  `measure()` reads `scrollWidth`, `offsetWidth` and `clientWidth` at :28-31)

**Cure (verified by emulation).**
- Main: `useBarShape.ts:46` passes the entry to `measure`, and `isPastRung` tests
  `entry.borderBoxSize[0]` (inline size against 20rem, block size against
  `min-block-size`) instead of `getBoundingClientRect()` at :20. The delivery then reads
  no layout. Under the hold: 0/6 red, against 6/6.
- Same class: `useSelectionIndicator.ts:202` (library) and `SectionPreviewCard.vue:35`
  (demo) take their sizes from the entries, or read at the next animation frame. All
  three together under the hold: 0/21, on WebKit 2311, 2287 and 2370. The held baseline
  on 2287 and 2370 is 12/12 red.
- Not a cure: stopping a write inside the callback (11.1.1 row 13's proposal), because
  nothing is written. Returning on a 0x0 box also falls short: it leaves the other
  readers (1/6).

## Evidence

### The decisive reading, three times on the live site (no hold, only the wrapper)

`out/hold-20261116-173606/baseline-nohold.json`. Three of six cells were red, and each read
the same way:

| cell | error frame | shallowest depth | forcer (first callback ≥ 2 ms) | target box | sheets loading | callback | writes | next frame delivers (depth 12 specimens) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 390 dark rep1 | 10 (1054 ms) | 14 | `useBarShape`, /display's first Button, depth 14 | 0x0 | 10 | 7 ms | 0 | /foundations 24→216, /display 24→144, /forms 24→72, /containers 24→64, /navigation 24→56 |
| 1440 light rep2 | 9 (1018 ms) | 14 | `useBarShape`, /display's first Button, depth 14 | 0x0 | 10 | 7 ms | 0 | /foundations 40→263, /display 40→201, /forms 40→152, /containers 40→80, /navigation 40→83 |
| 390 dark rep2 | 6 (661 ms) | 14 | `useBarShape`, /display's first Button, depth 14 | 0x0 | 10 | 7 ms | 0 | /foundations 216→363, /display 24→232, /forms 24→175, /containers 24→88 |

The next frame also delivers the Buttons at their real size (94x40, 120x40, 78x40 and
so on).

The same reading under the hold (`out/hold-20261116-173606/baseline.json`):

| cell | forcer | target box | sheets loading | callback | next frame specimens |
| --- | --- | --- | --- | --- | --- |
| 1440 light rep1 | `useBarShape` /display, depth 14 | 0x0 | 1 | 16 ms | seven, for example /data 40→656 |
| 390 dark rep1 | `useBarShape` /display, depth 14 | 0x0 | 1 | 17 ms | five, for example /data 24→593 |
| 1440 light rep3 | `useBarShape` /motion, depth 14 | 0x0 | 1 | 14 ms | five, for example /compositions 40→392 |

### The correlation (unheld bisect, 72 cells)

In `out/bisect-20261116-172040/`, all 38 red cells and none of the 34 green ones have a
first `useBarShape` delivery at 0x0 while a sheet is loading. No cell has a 0x0 first
delivery with nothing loading.

### The bisect

The probe is `probe.mjs` and the tally is `analyze.mjs`. Cards are removed by rewriting the
landing chunk's one card loop in flight (`--skip`), so a skipped card never renders. Two
reps × {1440 light, 390 dark} = 4 cells per row, live site, no hold
(`out/bisect-20261116-172040/`):

| row | red / cells | forcer, per error (a cell can raise it more than once) |
| --- | --- | --- |
| baseline | 0/4 (this run; 8/18 over all four unheld baseline runs) | none in this run |
| skip /foundations | 3/4 | `useBarShape` 3, card fit 1 |
| skip /substrates | 3/4 | `useBarShape` |
| skip /display | 3/4 | `useBarShape` (another card's Button) |
| skip /forms | 4/4 | `useBarShape` 4, card fit 2 |
| skip /containers | 3/4 | `useBarShape` |
| skip /navigation | 4/4 | `useBarShape` |
| skip /dock | 2/4 | `useBarShape` |
| skip /data | 3/4 | `useBarShape` |
| skip /feedback | 4/4 | `useBarShape` 3, card fit 1 |
| skip /motion | 3/4 | `useBarShape` 3, card fit 1 |
| skip /compositions | 3/4 | `useBarShape` |
| **skip every card** | **0/4** | none |
| only /display | 1/4 | `useBarShape` |
| only /navigation, only /motion, only /compositions | 0/4 each | none |
| only /containers | no reading (the run died on a teardown race, fixed after) | none |
| remove both docks | 2/4 | `useBarShape` |
| **`useBarShape` callback at the next frame** | **0/4** | none |
| `useBarShape` callback = `getBoundingClientRect()` only, nothing written | 2/4 | `useBarShape` |
| `useBarShape` callback = nothing | 1/4 | the card fit observer |
| card fit observer at the next frame | 1/4 | `useBarShape` |

No single card is the cause. Every card that mounts Buttons from a lazy chunk can be the
one that fires while a sibling's sheet loads, so the loop stops only when every card is
gone, or when `useBarShape` stops reading layout in the delivery.

### The hold (the window made deterministic)

PresetEditor's stylesheet, which the landing loads, is answered 1500 ms late
(`--hold-css PresetEditor:1500`). Three reps × two cells = 6 per row
(`out/hold-20261116-173606/`):

| row | red / cells | forcer |
| --- | --- | --- |
| baseline, no hold | 3/6 | `useBarShape` 3 |
| **baseline, hold** | **6/6** | `useBarShape` 8, card fit 2 (some cells raise it more than once) |
| skip every card | 0/6 | none |
| `useBarShape` = `getBoundingClientRect()` only | 5/6 | `useBarShape` 5, card fit 2 |
| **`useBarShape` box from the entry** (`borderBoxSize`, style reads, no layout read) | **0/6** | none |
| `useBarShape` at the next frame | 1/6 | card fit 1 |
| `useBarShape` returns on a 0x0 box | 1/6 | card fit 1 |
| `useBarShape` = nothing | 2/6 | card fit 3 |
| `useBarShape` = nothing, card fit = nothing | 2/6 | `useSelectionGroup` (the selection indicator) 2 |
| `useBarShape` from the entry, card fit = nothing | 2/6 | `useSelectionGroup` 2 |

With `useBarShape` reading layout, the rate is 6/6. With it silent in any form, the rate
falls to 8/36, and every remaining cascade is forced by one of the other two layout
readers.

### The cure set, and the other WebKit builds (`out/confirm-20261116-174405/`)

The cure set is all three changes emulated together:

- `--swap useBarShape:entry`: the box from `entry.borderBoxSize`, plus the
  `min-block-size` and root font-size style reads, with no layout read
- `--defer storyTile`: the card fit observer reads at the next frame
- `--defer useSelectionGroup`: the selection indicator reads at the next frame

All rows run under the hold:

| WebKit | baseline | cure set |
| --- | --- | --- |
| 2311 (Playwright 1.61.1) | 6/6 (`hold-…/baseline.json`) | **0/9** (5 reps; 1 cell got no reading, a 60 s `goto` timeout) |
| 2287 (Playwright 1.60.0) | 6/6 | **0/6** |
| 2370 (Playwright 1.64.1) | 6/6 | **0/6** |

### The engine, alone (`minimal.mjs`)

A script adds a stylesheet that answers 800 ms late, then a box with a `<button>`.
Observer S watches the box and reads nothing; observer B watches the button.

| engine | B reads `getBoundingClientRect()` | B reads `getComputedStyle().minBlockSize` | B reads nothing |
| --- | --- | --- | --- |
| Chromium (headless shell) | 0/3; first delivery 79.73x21 | 0/3 | 0/3 |
| WebKit 2311 | **3/3** | 0/3 | 0/3 |
| WebKit 2287 | **3/3** | 0/3 | 0/3 |
| WebKit 2370 | **3/3** | 0/3 | 0/3 |

The WebKit `read` trace (2311; 2287 and 2370 are the same):

- `f6`: S delivers 0x0 (depth 3), and so does B (depth 4). B's read takes 4 ms. B then
  delivers again in the same frame at 72x18, its depth being deeper than 3.
- S has changed too, but at depth 3 it is not deeper than the shallowest depth, so it is
  left undelivered: **error in f6**.
- `f7`: S delivers 800x51.34.
- `f80`: the sheet loads.

With the style read or with no read, S and B stay 0x0 until the sheet loads (f79-80) and
then deliver once, real-sized, with no error. Two conclusions follow:

- a style read gives no box, so `useBarShape`'s `getComputedStyle` reads may stay
- only the layout read does the damage (`out/confirm-…/minimal.txt`,
  `out/minimal-chromium.txt`)

## The dock and row 13(b)

On this page the dock is not the writer. Its plate observer does write
`--dock-plate-cross-px` on the root from inside its own callback, but in the hold-smoke
reading that happened in frames 2, 10 and 31, never in the error frame (8). Frame 2
carries the same write with no error. Removing both docks left the error at 6 of 8 cells.
That removal detached them, which can hide the error but never cause it.

Gregg's probe (`p44s-ro-probe.mjs`) logs the last three callbacks to *finish* before the
error. That is the tail of the frame's deliveries, not the callback that changed a box.
The callback that matters is the first one in the error frame that runs a layout; on this
page it is usually the first delivery of the frame.

His app is the same shape: code-split routes, Buttons everywhere, and a dock whose own
observer also reads layout in its delivery (`capture()` at rest, inside the observer made at
`src/components/dock/composables/dockMorphMeasure.ts:477`, line 479). So his reading is likely
this class. A cure that only stops the dock *writing* inside its callback, as 11.1.1
row 13 proposes, would not clear it.

To settle it, his probe needs two more fields per delivery: the callback's run time, and
the count of `link[rel=stylesheet]` with no `.sheet`. The forcer is then the first
delivery of the error frame that runs 2 ms or more.

## Method notes

- `probe.mjs` wraps `ResizeObserver` from `page.addInitScript`, before any page script.
  - Per observer: id, creation stack, creation frame, targets.
  - Per delivery: frame (an rAF counter), each target's DOM depth and border box, the
    stylesheets still loading, and the callback's run time.
  - Attribute writes inside the delivery and its microtask checkpoint, attributed to that
    delivery.
  - Window `error` events, with their frame.
- The engine reports the loop after the frame's last delivery. Every notification it left
  undelivered is still active, so the next frame's deliveries name them.
- A first bisect detached cards from the DOM instead of skipping them, and its card rows
  are not used. A detached target reports depth 6, which lowers the frame's shallowest depth
  and lets the deeper notifications through. "Remove /display" read 0/4 for that reason
  alone (`out/detach-bisect-20261116-171021/`, kept as the record of it).
- The WebKit internals are inferred from behaviour, not read from WebKit's source:
  - in-DOM nodes are delivered at 0x0 only while a sheet loads (38/38 against 0/34)
  - a layout read in the callback costs 7 to 17 ms and boxes them
  - the minimal page reproduces it with no glass code

## Files

All under `docs/tranches/BL/audit/ro-loop/`, untracked:

- `probe.mjs`: the instrumented probe. Flags: `--skip`, `--remove`, `--defer`, `--swap`,
  `--hold-css`, and `PW=` for another WebKit build.
- `analyze.mjs`: the per-error reading and the tally.
- `bisect.sh`, `hold.sh`, `confirm.sh`: the runs, one browser per row.
- `minimal.mjs`: the engine alone.
- `out/`: every run's JSON and summary. Also `out/live-src/`, the live landing chunk, entry
  chunk and preload helper, as fetched.
