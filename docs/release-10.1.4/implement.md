# 10.1.4 — implement record (sci-report O-119 (g) and the `@page` half of (f))

Branch `release/10.1.4` from tag `v10.1.3`, worktree `.claude/worktrees/release-10.1.4`.
Implementer: claude-opus-5-5. Not pushed, not tagged.

## The report

sci-report `sci-report-82` (the Gregg Museum dashboard, INBOUND O-119) reported nine
items live on 10.1.3. The placement run put two in 10.1.4. Each is a defect at 10.1.3
that a consumer witnessed, with a small cure in one file:

- (g) `DataTable` never learns its width on mount, so a phone loads the wide table.
  Gregg's workaround: `~/Programming/gregg/src/figures/records/FindingsTable.vue:57-70`
  narrows the table by 1 px after mount and restores it two frames later.
- (f), the `@page` half: the deck's print block gives every importer of the library
  stylesheet a 1280x720 page with zero margins. Gregg's workaround:
  `~/Programming/gregg/src/style.css:270-275` re-declares `@page { size: auto }`. Its
  `margin: 14mm 12mm` is its own paper choice and stays.

The glass print arm (F-80) stays in W-E.13 (11.0.0). It is not in this patch.

## Reproduction on v10.1.3

Scene harness `tests-visual/release-10-1-4/harness.ts`, imported relative to `src/`
under the demo's cascade, which imports `src/styles/index.css` → the deck styles →
`capture.css`. Spec `tests-visual/release-10-1-4.spec.ts`. The RED arms run this
branch's harness and spec with `src/composables/dom/useResizeObserver.ts` and
`src/components/deck/styles/capture.css` checked out from `v10.1.3` inside the
worktree, then restored to HEAD.

Reads on v10.1.3, the same in Chromium and WebKit 2287 except where noted:

- `scene=table&width=390`: the host is 390 px wide and the DataTable renders a
  `<table>`, with no `.data-table-cards`, for 5 s with no resize.
- `scene=print-plain` under `emulateMedia({ media: "print" })`: `print-color-adjust`
  on `html` and `body` reads `exact` (expected `economy`), and the CSSOM holds an
  unnamed `@page`. Chromium `page.pdf({ preferCSSPageSize: true })` prints it on a
  960x540 pt page (1280x720 CSS px), not on Letter (612x792).
- `scene=print-deck`: the stage's computed `page` reads `auto` in Chromium (there is no
  named page).

## Root cause (v10.1.3 lines)

- `src/composables/dom/useResizeObserver.ts:126-128`: `observe()` calls
  `ResizeObserver.observe(el)` and then seeds `lastWidth`/`lastHeight` from
  `el.getBoundingClientRect()`. The platform delivers its initial observation after the
  next layout. Nothing changed in between, so that observation carries the seeded size.
  `dispatch` drops it, since both deltas are under the 0.5 px threshold. The callback
  first runs on the first real size change. `DataTable.vue:69-72` writes `rootWidth`
  only from that callback. `useDataTableResponsive` needs `width > 0 && width <
  cardBreakpoint`, so `isCard` stays false at any width until a resize. The DataTable
  units missed this because their stub observer emits synchronously inside `observe()`,
  before the seed, and happy-dom's `getBoundingClientRect` reads 0.
- `src/components/deck/styles/capture.css:115-128`: inside `@layer components {
  @media print { … } }` there is an unnamed `@page { size: 1280px 720px; margin: 0 }`,
  plus `html, body` and `html, body, #app` resets (overflow, margin, padding,
  `print-color-adjust: exact`, block-size). None is scoped to a deck, and the file
  reaches every consumer of `src/styles/index.css:272`.

## The cure

- `useResizeObserver.ts`: the seed is deleted. `lastWidth`/`lastHeight` start at
  `Number.NaN` and are reset to it in `disconnect()`, which runs before every
  `observe()` and on `stop()`. `Math.abs(x - NaN) < threshold` is false for every
  reading, so the first observation of each element dispatches, through the rAF batch
  as before. The threshold applies from the second reading on. `DataTable` keeps its
  `width > 0` guard. A 0x0 first observation (a root that is not laid out) still
  dispatches, and the guard keeps the projection off.
- `capture.css`: `@page deck { size: 1280px 720px; margin: 0 }` and
  `[data-slot="deck-stage"] { page: deck }`. The `html`/`body` and
  `html`/`body`/`#app` resets are rescoped under `:root:has([data-slot="deck-stage"])`.
  The `.deck-stage`/`.deck-strip`/`.deck-slide` print rules are unchanged. They
  already select only a deck.

No public API is removed or renamed and no token value moves. `useResizeObserver`'s
signature is unchanged. Its documented behaviour gains one sentence: the first
observation of each element dispatches.

### Every other caller, at the first dispatch

| caller | callback | at the first dispatch |
|---|---|---|
| `src/components/data-table/DataTable.vue:70` | `rootWidth = rect.width` | the cure's target: the projection runs on mount |
| `src/composables/glass/useGlassBackdropLuminance.ts:355` | `sampleNow()` | one extra sample after layout. It writes the same `--glass-backdrop-*` the mount sample wrote, and it stands down when the surface is covered by the shared observer |
| `src/components/fading-scroll/composables/useFadingScroll.ts:162` | `measure` | `start()` already calls `measure()` right after. The repeat recomputes the same overflow edges |
| `src/components/pager-dots/worm.ts:260` | `nextTick(seatActive)` | `onMounted` already seats. `seatActive` measures and seats at the active pip's centre (same position, span 0) |
| `src/components/dock/DockCrossfade.vue:108` | `measurePeak()` | monotone max over the faces' sizes (`if (max > peak)`). A repeat cannot lower it |
| `demo/composables/virtual/useVirtualSectionWindow.ts:263` | `scheduleRecalculate()` | rAF-coalesced with the `onMounted` recalculation, and idempotent |

The other files that mention `useResizeObserver` (`backdropLuminanceSample.ts`,
`useBreakpoint.ts`, `useViewportReady.ts`, `src/index.ts`, `src/composables/dom/index.ts`)
mention it in comments or re-export it. They do not call it.

## Witnesses

Unit (`npx vitest run`, happy-dom):

- `tests/composables/dom/useResizeObserver.test.ts` (new, 3 cells): a driven observer
  emits after `observe()` returns, on an element whose `getBoundingClientRect` already
  reads the observed size. The first observation dispatches (direct and through the rAF
  batch). A target swap dispatches the new element's first observation of the same size.
  The threshold still drops a 0.2 px change.
- `tests/components/ui/data-table/DataTable.test.ts`, "projects cards on the first
  observation when the laid-out box already reads narrow": an observer that emits in a
  microtask after `observe()`, with `getBoundingClientRect` at 320.
- With `useResizeObserver.ts` at v10.1.3: 4 failed (the 4 new cells), 17 passed. Cured:
  21/21.

Engine (`release-10-1-4.spec.ts`; Chromium project `chromium-headless-new`, WebKit
project on Playwright WebKit 2287 via `webkit-2287.config.ts` under `guarded --exclusive
webkit`):

| cell | Chromium v10.1.3 | Chromium 10.1.4 | WebKit v10.1.3 | WebKit 10.1.4 |
|---|---|---|---|---|
| (g) 390 px DataTable is cards on the first observation, no resize | RED | GREEN | RED | GREEN |
| (g) 900 px DataTable stays a table (control) | GREEN | GREEN | GREEN | GREEN |
| (f) page without a deck keeps `economy`, its `#app` floor, no unnamed `@page` | RED | GREEN | RED | GREEN |
| (f) deck page takes the resets and the named page | RED | GREEN | RED | GREEN |
| (f) `page.pdf`: page without a deck prints on Letter 612x792 | RED (960x540) | GREEN | skip | skip |
| (f) `page.pdf`: two-slide deck prints two 960x540 pages | GREEN | GREEN | skip | skip |

Totals: Chromium 6/6 GREEN, 4 RED on v10.1.3 (2 GREEN there: the 900 px control and the
deck's printed boxes, which the unnamed page also produced). WebKit 2287 4/4 GREEN with
2 skipped (`page.pdf` is Chromium's), 3 RED on v10.1.3 (1 GREEN: the control). On
v10.1.3 the WebKit deck cell fails on the CSSOM: there is no `@page deck`. The Chromium
deck cell fails on the computed `page` (`auto`). The `#app` floor in the harness
(`min-block-size: 50px`, inline) is what the deck's `!important` reset zeroes. A
deck-less page keeps it on 10.1.4.

## Gates

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 (the test-config pass resolves `@mkbabb/glass-ui/*` through `dist/`, so it runs after a build) |
| `npm run build` (guarded) | exit 0, on the committed source |
| `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 247 files, 2396 passed, 10 expected fail, 1 skipped |
| unit RED arm (`useResizeObserver.ts` at v10.1.3) | 4 failed (the 4 new cells), 17 passed; cured 21/21 |
| `release-10-1-4.spec.ts`, Chromium | 6/6 GREEN; 4 RED on v10.1.3 |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 4 passed, 2 skipped (page.pdf); 3 RED on v10.1.3 |
| `release-10-1-3.spec.ts`, Chromium | 60/60 GREEN |
| the same, WebKit 2287 | 58 passed, 2 skipped (the CDP swipe cells are Chromium's) |
| `npm run verify:package` (guarded) | the ratchet refused +297 B (2940214 > 2939917). Rebound on the committed tree, then terminal CLEAN, version 10.1.4 |

## Open

- WebKit 2287 parses `page` (`CSS.supports("page", "deck")` is true and the CSSOM
  holds `@page deck`) but serializes the computed `page` as `""`. Playwright WebKit has
  no `page.pdf`, so the deck's printed sheet size is witnessed in Chromium only. A
  Safari print of a deck is not measured here. Under 10.1.3 Safari got the unnamed
  1280x720 page whenever it honours `@page size`. Under 10.1.4 it gets slide geometry
  only if it applies named pages, and that has not been measured.
- Gregg's own cells are not run here: sibling repos are read-only. After adopting
  10.1.4, Gregg can delete `FindingsTable.vue:57-70` (the 1 px nudge) and the
  `size: auto` in `style.css:272-275`. The ledger home for that retirement is INBOUND
  O-119 ("10.1.4 if cut: (g) and the `@page` half of (f)").
- Logs, beside the worktree in `.claude/worktrees/10.1.4-logs/`: `red-1013-chromium.log`,
  `red-1013-webkit.log`, `green-chromium.log`, `green-webkit.log`,
  `release-10.1.3-chromium.log` (the WebKit 10.1.3 spec run is in `green-webkit.log`), `unit-red-1013.log`,
  `unit-green.log`, `vitest.log`, `typecheck.log`, `build-committed.log`,
  `demo-build.log`, `verify.log`, `probe-webkit-page.log`.
