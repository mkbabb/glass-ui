# 10.1.4 — critique 2 (fresh adversarial critic, round 2)

Critic: claude-opus-5-5. Branch `release/10.1.4` at 8d034c66e (ten commits over `v10.1.3`), plus
`implement.md`, `critique-1.md` and `fix-1.md`, read in full.
Probe: `docs/release-10.1.4/critique-2/` (`probe.html`/`probe.ts`, `critique.spec.ts`,
`critique.config.ts`, `webkit-chain.sh`). Reads: `critique-2/branch/reads-*.json` and
`critique-2/v1013/reads-*.json`. v10.1.3 arms check out `useResizeObserver.ts` and
`capture.css` from `v10.1.3` in the worktree, then restore them to HEAD (`git status`
clean afterwards). Dev server on its own port (5293). Every run went through `guarded`;
the WebKit runs through `guarded --exclusive webkit` on WebKit 2287.

## (g) useResizeObserver's first observation

Chromium headless. "cards" means `.data-table-cards` is present and `<table>` is not.

| cell | v10.1.3 | 10.1.4 |
|---|---|---|
| DataTable 320 px on mount | table (RED) | cards |
| DataTable 390 px on mount | table (RED) | cards |
| DataTable 768 / 1440 px | table | table |
| DataTable mounted by a `v-if` 200 ms late, 390 px | table (RED) | cards |
| display:none host, shown later at 390 | table, then cards | table, then cards |
| shrink-to-fit host (`inline-block`), 1280 viewport | table at 270.6 px | cards at 172.0 px (see O-2) |
| bare composable, 200x100 box: on mount / after an unrelated re-render / after a target swap | `[]` / `[]` / `[]` | `[[200,100]]` / same, no new dispatch / one more `[200,100]` for the new element |
| platform RO callbacks 1.5 s after settling (320, 390, 768, 1440, shrink) | constant | constant (2 for a card switch, 1 otherwise), so no loop |

Callers read: `DataTable.vue:70`, `useGlassBackdropLuminance.ts:355`,
`useFadingScroll.ts:162`, `pager-dots/worm.ts:260`, `DockCrossfade.vue:108`,
`demo/composables/virtual/useVirtualSectionWindow.ts:263`. Each first-dispatch handler is
idempotent (a re-measure or re-seat that the mount path already did) or monotone
(`measurePeak` only widens). None relied on the seed. No double dispatch: a re-render
does not re-run the watch, and a target swap is a new element, so its one dispatch is
the intended one. The 0x0 first dispatch of a hidden root is real; DataTable's
`width > 0` guard absorbs it, and the other handlers recompute from live geometry.
SSR (no `window`) was covered by critique-1 (`critique-1/ssr.log`, 3/3) and the guard
`typeof window === "undefined"` in `observe()` is unchanged; not re-run.

Units: `tests/composables/dom/useResizeObserver.test.ts` +
`tests/components/ui/data-table/DataTable.test.ts`, 21/21 (guarded `--light`).

## (f) the @page scope (Chromium `page.pdf`, `preferCSSPageSize`)

Sheet sizes in pt; 960x540 = 1280x720 CSS px, 612x792 = Letter, 595x842 = A4.

| scene | v10.1.3 | 10.1.4 |
|---|---|---|
| no deck | 960x540, `exact`, #app 0 (RED) | 612x792, `economy`, #app 50px |
| deck alone | 2 x 960x540 | 2 x 960x540, stage `page: deck` |
| deck mounted 300 ms later below prose | 3 x 960x540 | 612x792 + 2 x 960x540 |
| two decks | 4 x 960x540 | 4 x 960x540 |
| deck in a native modal `<dialog>` (`showModal`) | 1 x 960x540 | 1 x 960x540, `body` takes `page: deck` |
| deck in an open popover | 1 x 960x540 | 1 x 960x540, `body` takes `page: deck` |
| deck in the library's own `<Dialog>`/`<DialogContent>` (reka portal, `position: fixed`) | **1 x 960x540** | **1 x 612x792** |
| deck in a `position: fixed` overlay div | **1 x 960x540** | **1 x 612x792** |
| deck in a non-modal `<dialog open>` (UA `position: absolute`) | **3 x 960x540** | **2 x 612x792** |
| deck in a scrolling SPA shell (`main{block-size:100vh;overflow:auto}`) | 1 x 960x540 | 1 x 960x540 (same truncation both) |
| consumer's unlayered `@page { size: A4; margin: 14mm 12mm }` + deck | 2 x 595x842 | 2 x 595x842 |
| the same consumer `@page`, no deck | 595x842, `exact` | 595x842, `economy` |

### Finding F-2 (medium): a deck inside the library's own Dialog, or any fixed/absolute overlay, loses slide geometry

fix-1 cured F-1 only for the top layer (`:modal`, `:popover-open`). The cause it names
is broader: a named page starts a sheet only from an in-flow box, and any
out-of-flow ancestor (`position: fixed` or `absolute`) has the same effect. The
library's own `DialogContent` is not a native `<dialog>`: it is a reka portal with a
`position: fixed` plate (`DialogContent.vue`, class `fixed left-1/2 top-1/2 z-modal`), so
it never matches `:modal`. A deck in a glass-ui `<Dialog>` printed one 960x540 sheet at
v10.1.3 and prints one Letter sheet on the branch. The same holds for a consumer's
fixed presenter overlay and a non-modal `<dialog open>`. The `print-color-adjust` and
`#app` resets still apply (`:has` matches), so these pages get the deck's resets on
the reader's paper. This contradicts the CHANGELOG line "so a modal deck still prints
at slide geometry": for a glass-ui consumer, the modal it ships is the one that fails.
Reads: `critique-2/v1013/reads-chromium.json` and `critique-2/branch/reads-chromium.json`,
keys `print-deck-glass-dialog`, `print-deck-fixed`, `print-deck-nonmodal`.

Cure options for the dispositioner (the selector cannot see an out-of-flow ancestor):

1. KISS: `:root:has([data-slot="deck-stage"]) body { page: deck }` replaces the
   top-layer rule. Every page with a deck prints at slide geometry, whatever wraps the
   stage. Cost: prose before an in-flow deck prints at slide geometry too, as at
   10.1.3, and a hidden (`v-show`) deck turns the whole page into slide sheets
   (critique-1 O-1 gets worse: the page geometry follows the hidden deck as well as the
   resets).
2. Keep the stage-scoped page and widen the body rule to the library's own overlay
   slots (for example `[data-slot="dialog-content"]`, if the plate carries one, and
   `[role="dialog"]`) beside `:modal`/`:popover-open`. This still leaves a consumer's
   own fixed overlay on Letter. Document that limit.

Either way the witness should mount a deck in `<Dialog open><DialogContent>`.

### Finding F-3 (low): a consumer's own paper choice overrides the deck's page

`@page deck` sits inside `@layer components`. Layer order comes before page-selector
specificity, so a consumer's unlayered `@page { size: A4; margin: 14mm 12mm }` wins on
the deck's sheets as well. The deck then prints on A4 (2 x 595x842). This is the same
as v10.1.3, so it is not a regression. But it limits the claim "a deck page still prints
1280x720": that holds only while the consumer declares no unlayered `@page`. This is the
consumer setup 10.1.4 now invites, since the reader's paper is theirs. Gregg keeps
`@page { margin: 14mm 12mm }` (`~/Programming/gregg/src/style.css:270-275`; implement.md
says it stays). Any deck Gregg mounts would print with 14 mm margins. Reads: key
`print-deck-consumer-page` in `critique-2/{branch,v1013}/reads-chromium-consumer.json`.
Disposition: one sentence in the CHANGELOG, or move `@page deck` out of the layer so
that page-selector specificity decides (an unlayered `@page deck` beats an unlayered
`@page`). The move changes no token and no API.

### Observations (not defects)

- O-2: a DataTable in a shrink-to-fit host decides its projection on its own table's
  intrinsic width. At 1280 a three-column table at 270.6 px now mounts as cards
  (172.0 px), where v10.1.3 showed the table until a resize. This is the container
  semantics the cure restores, not a new rule. It converges (two RO callbacks, then
  quiet), but a consumer with a narrow inline table on desktop will see cards on
  first load.
- The scrolling SPA shell and every out-of-flow case print only the first sheet in
  both versions. That is the W-E.13 print arm's truncation, as fix-1 says.

## Release specs and gates

| run | result |
|---|---|
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, Chromium (guarded) | 69/69 passed (`critique-2/branch/release-chromium.log`) |
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, WebKit 2287 (`guarded --exclusive webkit`) | 64 passed, 5 skipped (3 page.pdf, 2 CDP swipe) (`critique-2/branch/release-webkit.log`) |
| unit: `useResizeObserver.test.ts` + `DataTable.test.ts` (guarded `--light`) | 21/21 |
| API/token diff | `src/` changes only `useResizeObserver.ts` (internal state; signature unchanged) and `capture.css` (print block). No export, no token value moved |

Not re-run by this critic: typecheck, build, the full vitest suite, verify:package and
demo:dist:build. implement.md and fix-1.md record them GREEN on the committed tree.

## WebKit 2287

Probe, all 20 cells on the branch and on the v10.1.3 swap (`critique-2/{branch,v1013}/reads-webkit.json`,
`probe-webkit.log`). WebKit has no `page.pdf` and serializes computed `page` as `""`,
so its print reads come from the CSSOM: does a `page: deck` rule match the stage, and
does one match `<body>`?

- (g) matches Chromium cell for cell. v10.1.3: 320/390/late are a table (RED) and the
  bare composable dispatches `[]`. Branch: cards at 320/390/late, a table at 768/1440,
  one `[200,100]` on mount, none on re-render, one more on a target swap, and constant
  RO callback counts (no loop). Shrink-to-fit: table at 273.5 px on v10.1.3, cards at
  175.7 px on the branch (O-2).
- (f) no deck: `economy`, #app 50px on the branch; `exact`, #app 0 on v10.1.3 (RED).
  A deck page: the stage matches `page: deck` on the branch and does not on v10.1.3. A
  native modal and an open popover: `<body>` matches `page: deck` on the branch. The
  library's `<Dialog>`, the fixed overlay and the non-modal `<dialog open>`: the stage's
  nearest positioned ancestor reads `fixed`/`fixed`/`absolute`, and `<body>` does not
  match `page: deck`. That is the structural condition that gives F-2's Letter sheet in
  Chromium. Whether Safari applies named pages at all is still unmeasured
  (implement.md, Open).
