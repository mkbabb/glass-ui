# 10.1.4 — critique 3 (fresh adversarial critic, round 3)

Critic: claude-opus-5-5. Branch `release/10.1.4` at 33edb4dcd (15 commits over `v10.1.3`),
plus `implement.md`, `critique-1.md`, `fix-1.md`, `critique-2.md` and `fix-2.md`, read in full.
Probe: `docs/release-10.1.4/critique-3/` (`probe.html`, `probe.ts`, `critique.spec.ts`,
`critique.config.ts`, `chromium-chain.sh`, `webkit-chain.sh`). Reads:
`critique-3/{branch,v1013}/reads-{chromium,webkit}.json`. The v10.1.3 arm checks out
`useResizeObserver.ts` and `capture.css` from `v10.1.3` in the worktree and restores them
to HEAD in a trap (`git status --short src` empty afterwards). Every run went through
`guarded`; WebKit runs on build 2287 through `guarded --exclusive webkit`.

## Finding F-4 (medium): a DataTable in a content-sized host flips between table and cards forever, starting on mount

The cure makes the first observation dispatch. DataTable takes its projection from the
width of its own root (`DataTable.vue:68-71`). In a host that sizes the root to its
content, that width depends on the projection. When the table's intrinsic width is under
`cardBreakpoint` (640) and the cards' intrinsic width is over it, each dispatch flips the
projection. The flip changes the root's width, which dispatches again on the next frame.
The loop never settles. The cards are wider when a body column has a long label and long
values: a card puts the label beside the value, and the table puts it above.

Scene `table-osc`: two columns, `{ n: "N" }` and a body column whose label and value are
each 36, 44 or 52 characters. Four content-sized hosts: `inline-block`, a
`grid-template-columns: auto 1fr` cell, a `display: flex` item (no `flex-grow`) and
`inline-size: fit-content`. "swaps" counts table/cards replacements, read 0.3 s, 1.8 s and
2.8 s after mount.

| engine | v10.1.3 (all 12 cells) | 10.1.4 (all 12 cells) |
|---|---|---|
| Chromium | table, 0 swaps, 1 RO callback, stable | ~40 / ~220 / ~341 swaps, still flipping (root 412 px table / 763 px cards at L=V=36) |
| WebKit 2287 | table, 0 swaps, stable | ~20 / ~110 / ~170 swaps, still flipping (384 px / 724 px) |

No `ResizeObserver loop` error fires (the rAF batch defers each dispatch by a frame), so
nothing reports it. The page re-renders the DataTable every other frame, and the content
flickers. The first-frame record shows `table, table, cards, table, cards, table`.

The loop is latent at v10.1.3. Scene `table-osc-rows` mounts the same DataTable in a flex
item with no rows and adds the row 300 ms later (a fetch). The size change dispatches on
both versions, and both loop: v10.1.3 Chromium 4 / 184 / 305 swaps, WebKit 2 / 92 / 152.
So the root cause is DataTable measuring a box whose size depends on what it measures.
10.1.4 moves the trigger from "the first size change after mount" to "every mount". A
content-sized table with these columns was stable at 10.1.3 until its data changed. Now it
loops from the first frame. The 10.1.4 witnesses cover only fixed-width hosts. critique-2's
`table-shrink` (O-2) used short labels, so its cards were narrower and it converged.

Reads: keys `table-osc-*` and `table-osc-rows-flex-36` in
`critique-3/{branch,v1013}/reads-{chromium,webkit}.json`.

Cure options for the dispositioner. The cure belongs in DataTable, not in
`useResizeObserver`. The composable reports correctly.
1. Measure a box whose width does not depend on the projection. One way is a root with
   `container-type: inline-size` or `contain: inline-size`, so the root's inline size
   ignores its content. In a content-sized host it then has no intrinsic width, which is a
   layout change for those consumers. Measure it before choosing.
2. Hysteresis: decide on the width observed under the current projection, and do not flip
   back on a width the last flip itself produced. This needs a state the composable does
   not carry today.
3. Ship 10.1.4 with the loop documented in the CHANGELOG. It already exists at 10.1.3
   after a data change. Add a witness that pins the mount case once a cure lands.

Whichever is chosen, add a `table-osc` witness (a flex item, long label and value, 1280
viewport) that requires the projection to settle (swaps ≤ 1 after 1 s) in both engines.

## (g) other cells — no defect

| cell | Chromium 10.1.4 | WebKit 10.1.4 | v10.1.3 (both) |
|---|---|---|---|
| 320 / 390 on mount | cards, 1 swap, 2 RO callbacks | cards, 1 swap | table (RED) |
| 768 / 1440 on mount | table, 1 RO callback | table | table |
| display:none host, shown at 390 | table (0x0 dispatched, `width > 0` guard holds), then cards | same | same |

Callers read again: `useGlassBackdropLuminance.ts:355` (`sampleNow` checks
`coveredByShared` first, so a covered surface still makes no readback),
`useFadingScroll.ts:162`, `pager-dots/worm.ts:260`, `DockCrossfade.vue:108`,
`demo/composables/virtual/useVirtualSectionWindow.ts:263`. Each is idempotent on a repeated
measure. Consumers of the exported composable in sibling repos (read only):
speedtest `meterGeometry.ts:128` and `ScrollingText.vue:52-53` repaint or measure
idempotently. Gregg and atlas import `useResizeObserver` from `@vueuse/core`, not glass-ui.
SSR: `critique-1/ssr.test.ts` re-run, 3/3 (`critique-3/ssr.log`). Units:
`useResizeObserver.test.ts` + `DataTable.test.ts`, 21/21 (`critique-3/units.log`).

Observation O-3 (not a defect): at 320/390 the first two frames after mount still paint
the wide table in both engines (`frames: table, table, cards…`). The first observation
arrives after layout and is dispatched through the rAF batch, and the Vue update lands a
frame later. The gate asks for `isCard` on the first observation, and that holds.

## (f) the @page scope — no defect

Chromium `page.pdf` (`preferCSSPageSize`), sizes in pt (960x540 = 1280x720 px, 612x792 = Letter):

| scene | v10.1.3 | 10.1.4 |
|---|---|---|
| no deck | 960x540, `exact` (RED) | 612x792, `economy` |
| deck | 2 x 960x540 | 2 x 960x540, html/body/stage `page: deck` |
| deck mounted 300 ms later below prose | 3 x 960x540 | 3 x 960x540 |
| two decks | 4 x 960x540 | 4 x 960x540 |
| deck in the library's `Dialog` | 1 x 960x540 | 1 x 960x540 |
| consumer `@page deck { size: A4 !important; margin: 10mm !important }` | 2 x 960x540 | 2 x 960x540 |
| consumer `@page :first { margin-top: 30mm }` + deck | 3 x 960x540 | 2 x 960x540 |
| deck in a `display: none` container | 1 x 960x540 | 1 x 960x540 |
| deck in a print-hidden preview (`@media print { .preview { display: none } }`) | 1 x 960x540 | 1 x 960x540 |

WebKit 2287 has no `page.pdf` and serializes `page` as `""`. Its reads agree on what they
can show: `print-color-adjust` is `economy` with no deck and `exact` with one; on v10.1.3 it
is `exact` everywhere.

Observations (not defects; each is 10.1.3's behavior, and the CHANGELOG states the trade):
- O-4: a consumer cannot put a deck on other paper. Even an unlayered, important
  `@page deck` loses to the library's layered important declaration. That follows from
  F-3's cure. Worth one CHANGELOG clause if a consumer ever wants A4 handouts.
- O-5: a page whose stage is present but not printed (a `display: none` tab, or a preview
  the consumer hides in print) prints its prose on slide sheets with the deck resets. The
  `:has` gate sees the stage, and no selector can see `display`. This was critique-1 O-1;
  fix-2 option 1 accepted it.
- The `:first` margin cell improves: the consumer's 30 mm top margin no longer adds a sheet.

## Release specs and gates

| run | result |
|---|---|
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, Chromium (guarded) | 78/78 passed (`critique-3/branch/release-chromium.json`) |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 68 passed, 10 skipped (page.pdf, CDP swipe), 0 failed (`critique-3/branch/release-webkit.json`) |
| API/token | `git diff v10.1.3..HEAD -- src/` touches only `useResizeObserver.ts` (internal state, same signature) and the print block of `capture.css`. `src/index.ts` and `src/composables/dom/index.ts` are unchanged. No token moved |

Not re-run by this critic: typecheck, build, the full vitest suite, verify:package and
demo:dist:build. fix-2.md records them GREEN on a7bcd1f49. The later commits touch only
the spec and docs.

## Verdict

(f) holds in every scene I could build. (g) cures the phone case in both engines. It also
moves a latent DataTable feedback loop (F-4) from "after a data change" to "on mount" for
content-sized hosts. That needs a disposition before the tag.
