# FLOOR-V2 · the floor with rows N-1..N-4

D2 pass 3, seat FLOOR-V2 · model `claude-opus-5-5` (asserted from own system identity) · 2026-10-08.

| field | value |
|---|---|
| patch | `pass-3/floor-v2.patch`, sha256 `deb90ecc0218c712…`, 50 files. It is the whole floor relative to HEAD: `pass-2/floor.patch` (sha256 `de432032…`) plus rows N-1..N-4. Both routes apply this one patch |
| base | `aea214b9` (`src/` identical to the checkout's later HEADs: `git diff --stat aea214b9 0dd061c1 -- src package.json` is empty) |
| apply | `git apply --check` clean at `aea214b9` (fresh worktree) and at the checkout HEAD `3fbaa0e7`; after the runs, `git apply -R --check` on the worktree was clean, so every number below was measured on exactly HEAD + this patch |
| adapter | `pass-3/adapter-floor-v2.mjs`: `pass-2/adapter-floor.mjs` with two DOM reads changed (`badge()` reads `.dock-seat-badge`; `budget()` subtracts the dock's own margins). `adapter-law.mjs`: PASS, L-1..L-5 hold, 44 changed lines against `adapter-head.mjs` |
| harness | one change kept in place, from the interrupted seat: `harness/scenes.mjs` `edge` scene puts its badge in DockControl's `#badge` slot (N-4). On a build without the slot the badge is not rendered and W7 reads `badge` absent, as before |
| engines | Chromium (headless) and **Playwright WebKit**, every WebKit cell **unshimmed** (the floor needs no shim). Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-minute load average 10-134 over the seat (other seats' browsers). Each log's first and last line is `uptime`; each cell carries its own load. Ranges in §4.0 |
| records | `FLOOR-V2-records/final/` (this seat): logs, census, probes, mutations, `tables.md`. `FLOOR-V2-records/cells-final-{light,dark}.json` hold every cell with its full summary line. Files directly under `FLOOR-V2-records/` (no `final/`) are the interrupted seat's draft builds `fv2`/`fv2c`, kept as history; nothing below rests on them |

Short names: **v1** is HEAD + `pass-2/floor.patch` (H3's pass-3 baseline, `H3-records/cells-*-floor.json`, and pass-2's `FLOOR-records/floor-cells.json` for W2/W4/W5/W6). **v2** is HEAD + `floor-v2.patch`.

---

## 0 · In brief

| row | status | the witness, v1 → v2 |
|---|---|---|
| N-1 alignment strike | **landed** | W3 `anchor-end·*` anchored-edge drift 189.83-189.95 px → **0 px** (Chromium), **0.16-0.17 px** (Playwright WebKit), both themes; the `anchor` sub-check is cured in all 8 cells. Census: 0 of 14 sibling mounts and 3 of 60 demo docks relied on the auto margin |
| N-2 one content observer | **landed** | one `MutationObserver` in the dock (`useDockContent`), two subscribers; the `endpoints` ref with no reader is gone. The overflow probe fails on v1 and passes on v2 in both engines. H3-6 `stretch·lead-add` fails on both (a seat step, not an observer fault) |
| N-3 scoped size hand-off | **landed as the shared policy; no caller in the floor** | `lattice` and `infanim` pass on v2 as on v1 (0 errors, window 0 frames). `handOffSizes` has no call site in the floor, because the floor carries no content-driven extent change; the route carrier is its first caller (§1.3) |
| N-4 gutter and `#badge` | **landed** | W7 18/18 per engine (v1 6/18): `gutter` and `badge` green in every `side·*` and `canvas·*` cell |
| N-5 card corner | **OWNER-BLOCKED (Q-12)** | not built. The floor's pill → card lerp stays (Q-12 default) |

What v2 newly shows: H3-7 `neighbour·*` goes from PASS to FAIL in both engines and themes. The v1 pass was vacuous. The auto margin parked the neighbour 425 px away, so it never moved. Without that margin, the floor's layout box steps 379.66 px in one frame at the flip (§4.2). That is the floor's carrier, not N-1, and both routes inherit it.

## 1 · The rows

Line numbers are in the patched tree (HEAD + `floor-v2.patch`).

### 1.1 · N-1 · the dock takes its container's alignment

| what | where |
|---|---|
| `margin: 0 auto` struck from the base `.glass-dock` block, with the reason | `src/components/dock/styles/shell.css:123-129` |
| the `.glass-dock.fixed` auto-margin centring rule struck (no `position` prop exists since BK #47; no consumer puts `fixed` on a dock, §2) | `src/components/dock/styles/dock.css` (hunk at :227) |
| the struck positioning-register note shortened to one line | `shell.css:523-524` |
| the scale carrier grows from the point the container holds: `anchorOf()` reads the box's start at the collapsed and at the expanded size from layout, once per morph from a rest (a reversal keeps it), and writes `--dock-anchor` ∈ [0, 1] | `src/components/dock/composables/useDockMorph.ts:49-79` (read), `:106-111` (write), `:89` (cleared at settle) |
| `transform-origin` reads `--dock-anchor` (horizontal and vertical) | `src/components/dock/styles/layers.css:116`, `:119-121` |
| prose: the carrier no longer claims "center-out by construction" | `layers.css:73-79`, `shape.css` (three comment hunks) |
| README: no auto margin; centre with the container | `src/components/dock/README.md:28-30` |
| demo: `DockStage`'s column centres a dock placed straight in it (`align-self: center`) | `demo/stories/dock/_frame/DockStage.vue:197-203` |
| gates | `tests/components/custom/dock/g-dock-lattice.test.ts:884` (no auto margin anywhere in the band), `:894` (the origin reads the anchor); `useDockMorph.anchor.test.ts` (end, centre and start anchors) |

Why the anchor read is needed: the floor's box reserves its expanded footprint while the visible size scales toward it. With no auto margin, a right-anchored dock's box grows leftward, and a centre-origin scale would paint the visible plate 189.8 px away from the edge the container holds. Reading the anchor from layout keeps the carrier free of justify detection: one read, the same for start, centre and end.

### 1.2 · N-2 · one content observer

| what | where |
|---|---|
| `useDockContent`: one `MutationObserver` on the dock root (`childList`, `subtree`, `aria-current`), with a subscriber set; it fails loud if the root is not mounted | `src/components/dock/composables/useDockContent.ts:21-51` (observer at :28) |
| `GlassDock` builds it once and hands it to the run | `src/components/dock/GlassDock.vue:111` |
| the run subscribes (roving stop, cell census, overflow judge) instead of owning its own observer | `src/components/dock/composables/useDockRun.ts:412-416`, unsubscribe at `:425` |
| the stop returns to the open seat, or the first, when focus leaves the run (`focusout`), replacing what the run's wider observer had done by accident | `useDockRun.ts:315-318`, listener `:405` |
| nothing published without a reader: the `endpoints` ref and `DockEndpoints` are deleted; `--dock-expanded-px` / `--dock-collapsed-px` stay because `layers.css` reads them | `src/components/dock/composables/dockMorphMeasure.ts:87-88` |
| gates | `g-dock-lattice.test.ts:902` (exactly one `MutationObserver`, in `useDockContent`), `:910` (every custom property the script writes has a reader in the band); `useDockContent.test.ts`; `useDockRun.roving.test.ts` |

The trigger that stays, and why: a seat added to a run whose size does not change (a run held wider than its content) moves no observed box. No ResizeObserver fires, so without the observer the overflow flag goes stale. `floor-v2-probe.mjs overflow` inserts icon seats until demand exceeds the run's box:

| build | engine | demand / content after | flag | seat paint beyond the plate | load |
|---|---|---|---|---|---|
| v1 (`FLOOR-V2-records/overflow-v1.jsonl`) | Chromium | 472.47 / 424.47 | **false** | 40 px | 36.78 |
| v1 | Playwright WebKit | 472.53 / 424.53 | **false** | 40 px | 37.12 |
| v2 (`final/overflow.jsonl`) | Chromium | 472.47 / 424.47 | true | 0 px | 37.9 |
| v2 | Playwright WebKit | 472.53 / 424.53 | true | 0 px | 37.9 |

Roving (`final/roving.jsonl`, both engines, load 36): after focus leaves the run, Tab lands on seat 0 and Home and ArrowLeft reach seat 0, as on v1 (`roving-v1.jsonl`). The interrupted seat's draft without `onLeave` left the stop on seat 7 (`roving-fv2.jsonl`). That is why `focusout` exists.

### 1.3 · N-3 · the scoped size hand-off

| what | where |
|---|---|
| `handOffSizes(root, axis)`: judges the size effects running inside the dock (never the root's own) and returns `none`, `follow` (an infinite effect, or main-axis endpoints that are not px), `hold` (main-axis deltas summing within 0.5 px: the open-seat exchange) or `take` (finishes them; the carrier carries the change on its spring) | `src/components/dock/composables/dockSizeHandoff.ts:71-101` (`HANDOFF_HOLD_PX` :34; infinite → follow :87; the one `finish()` :100) |
| gate: no dock script calls `finish()` outside this module | `g-dock-lattice.test.ts:923` |
| unit | `tests/components/custom/dock/dockSizeHandoff.test.ts` (7 cases) |

**No call site in the floor.** The floor's scale carrier carries posture morphs only. It has no carrier for a content-driven extent change: `content-add`, `lead-add` and `seat-transition` fail on v1 and v2 alike. A `take` in the floor would finish a seat's transition with nothing to carry it, which turns the current `window` failure into a one-frame snap. So in the floor, every seat size effect is effectively `follow` (layout owns it), and the H3-2 witnesses hold on that basis:

| cell | v1 | v2 (light / dark) |
|---|---|---|
| `lattice` Chromium | P | P (seat step ×0.6, 3.27 / 3.36 px; 0 errors) |
| `lattice` Playwright WebKit | P | P (×0.61 / ×0.62) |
| `infanim` Chromium | P | P (window open 0/241 frames, bound 15; 0 errors) |
| `infanim` Playwright WebKit | P | P (0/177 and 0/196) |
| `seat-transition` | F[window] | F[window] (+ `trajectory` in Playwright WebKit in the first reading, 4.33 px vs tol 4.2; reruns 2 and 3 read 3.73 / 3.48 px, `window` only: **NOT-REPRODUCED**) |

The module is shared because pass 2 showed both carriers getting it wrong (B′ CX-2/CX-3, G3). Each route calls it from its own carrier, and only the winning route's call ships. Until then it is one module with zero call sites, which the overfitting law (≥ 2 sites, or exported) does not allow in a release. The pass-3 critics should hold each route to calling it, or strike it.

### 1.4 · N-4 · the gutter and the `#badge` slot

| what | where |
|---|---|
| `--dock-gutter: var(--dock-pad)`, laid as the dock's `margin` on every side, in every orientation. It is a constant, so it moves no anchored edge through a morph. The owner's glance may set it to one seat gap (`--dock-layer-gap`) instead | `shell.css:236-243` |
| the expanded endpoint's budget subtracts the dock's own margins | `dockMorphMeasure.ts:44-50` |
| `DockControl` `#badge` slot: renders `<span class="dock-seat-badge">` in the seat; an `asChild` control with a badge throws (its child composes its own) | `src/components/dock/DockControl.vue:93-102` (slots, throw), `:202` (render), doc `:37-41` |
| the badge cell: the seat's inline-end/block-start padding corner, (control − glyph)/2 on an icon seat, the inline padding on a tab seat, clamped so content cannot reach the glyph; no pointer, no layout | `src/components/dock/styles/controls/seat-badge.css:1-43`, imported `controls.css:41` |
| gates | `g-dock-lattice.test.ts:931` (gutter is the pad, laid as margin), `:938` (badge in the corner, clamped); `DockControl.a11y.test.ts` (3 cases) |

Measured gutter (census, Chromium, 1440 × 900): 8 px on horizontal docks, 12 px on vertical docks (their `--dock-pad`).

### 1.5 · N-5 · the card corner

**OWNER-BLOCKED (Q-12).** Not built. The default applies: the floor's pill (27.93 px) → card (23.93 px) radius lerp stays, and W1 `card·*` cells whose only failure is `card` read OB under H3-11 (none qualify on v2, §4.3).

## 2 · N-1 census: who relied on the auto margin

### 2.1 · Sibling consumers (read-only)

`<GlassDock` mounts in `~/Programming` repos that depend on `@mkbabb/glass-ui` (`docs/`, `node_modules`, worktrees and generated `types/` excluded). One fact decides each row: `margin: 0 auto` centres a box only when it is block-level (a flex or grid item, or blockified by `position: fixed/absolute`). An `inline-flex` dock in block flow computes auto margins to 0.

| repo | mount | container | relied on the auto margin? | gutter (N-4) consequence |
|---|---|---|---|---|
| atlas 10.1.0 | `src/platform/chrome/dock/Dock.vue:228` | the dock itself is `position: fixed`, `inset-inline-start` set, end `auto` (`Dock.css:10-40`) | no: a fixed box with one inline inset never centres | the rail moves 12 px in from its inset |
| bbnf-buddy 10.1.0 | `LeftToolsDock.vue:53` | `.left-workspace`, fixed, `display: flex; align-items: flex-start` (`App.vue:526`) | no | 12 px in from `left: 1rem` |
| bbnf-buddy | `BottomDock.vue:96` | a fixed `left-1/2 -translate-x-1/2` wrapper (`App.vue:450-453`), shrink-to-fit | no | wrapper grows 16 px; `.bottom-dock`'s `max-width: calc(100dvw - …)` does not count the margin |
| chicago 10.1.0 | `TempApp.vue:292` | `nav.page-dock`, fixed, `display: flex; justify-content: center` (`style.css:85-91`) | no | `.page-dock > * { max-width: 100% }` plus 16 px of margin overflows at narrow widths |
| keyframes.js 10.1.0 | `demo/app/dock/ChromeDock.vue:388` | a block `div.dock-vt-group` inside a fixed `flex justify-center` band | no (inline-flex in a shrink-to-fit block) | none beyond 8 px |
| keyframes.js | `demo/components/instrument/transport/TransportDock.vue:33` | the same pair, bottom band | no | none beyond 8 px |
| slides 10.1.0 | `src/deck/DeckView.vue:148` | `.deck-dock-wrap`, fixed `left: 50%; translateX(-50%)`, `width: max-content` (`:210-222`) | no | wrapper grows 16 px inside its `max-width` cap |
| speedtest 10.1.0 | `src/components/Dock.vue:255` | a block `div.dock-in` inside `flex justify-center` | no | none beyond 8 px |
| speedtest | `survey/SurveyResultDock.vue:38` | `.survey-cockpit`, `flex-direction: column; align-items: center` (`SurveyWizard.vue:566-576`) | no | `width: 100%` plus 16 px of margin overflows the cockpit by 16 px when the column cap does not bind |
| value.js 10.1.0 | `demo/shell/dock/Dock.vue:159` | a block div inside `.dock-band` (`flex; justify-content: center`, `demo/styles/shell.css:149-155`) | no | none beyond 8 px |
| fourier-analysis/web 10.1.0 | `layout/AppDock.vue:82` | `.app-header`, `flex; justify-content: center` | no | none beyond 8 px |
| fourier-analysis | `visualization/EditorControlsDock.vue:87`, `AnimationControls.vue:129` | `.controls-overlay`, absolute, `flex; justify-content: center` (`VisualizationView.vue:895-902`) | no | none beyond 8 px |
| fourier-analysis | `visualization/CanvasControlsDock.vue:53` | `.controls-dock-anchor`, absolute `right: 0.5rem` (`:952-955`) | no. It is right-anchored, so N-1's anchor makes its morph grow from its right edge | 8 px in from its anchor |

**0 of 14 sibling mounts relied on the auto margin.** No sibling uses `class="fixed"` on a dock, so striking `.glass-dock.fixed` breaks nothing. sci-report's `dashboards` (glass-ui 7.0.0) has no `<GlassDock>`. value.js was read only, never built or run.

The gutter is the visible change in the siblings. Four mounts size the dock or its wrapper to 100 % or to the viewport without counting a margin (bbnf BottomDock, chicago, slides' cap, speedtest's survey strip), and two fixed rails move in by 12 px. REGISTRY P2-5 lists the gutter as the owner's glance. These rows belong in the consumers' own tranches (consumer-updates ruling).

### 2.2 · The glass-ui demo (measured)

`floor-v2-probe.mjs census`, Chromium, 1440 × 900, 12 routes, 60 docks, on v1 (`final/census-fl1.jsonl`) and v2 (`final/census-fv2f.jsonl`), 0 page errors on both, load 52-61:

| route | dock | container | v1 gaps L/R (px) | v2 gaps L/R (px) |
|---|---|---|---|---|
| `/dock/vertical` | Rounded vertical dock | `div.flex.justify-start` | 177.34 / 177.33 | 12 / 334.67 |
| `/dock/vertical` | Starts compact vertical dock | `div.flex.flex-col.items-start` | 36.88 / 36.89 | 12 / 61.77 |
| `/dock/vertical` | Starts open vertical dock | `div.flex.flex-col.items-start` | 22.13 / 22.13 | 12 / 32.25 |

These three docks sit in containers that ask for start alignment, and the auto margin had overridden it. On v2 they honour what their story wrote. Whether the vertical story wants them centred is a demo choice, ruled with Q-16. The other 57 docks keep their side of the container (centred ones stay centred). Every one shifts by its gutter, 8 px (horizontal) or 12 px (vertical). The `/dock/sections` hairline pair re-centres as a pair instead of each dock taking half the row. The `DockStage` rule keeps `View picker` and `Consumer-driven dock` centred (122.88 / 122.88, 97.14 / 97.16 px).

Recorded, not N-1: on `/dock/controls`, `Dock control shapes` and `Media filter` lose 24 px of width (338.66 → 314.66) to the gutter inside their stage column. Their runs carry `[data-overflowing]` on both v1 and v2. The collapsed demo `bottom-dock-collapsible` carries `[data-overflowing]` at rest on both builds on every route: a collapsed run's content box against its seats' demand (floor row 5). It is the same on v1, and it is passed to the routes.

## 3 · Typecheck, unit, build

All on the fresh `aea214b9` worktree + `floor-v2.patch`, with `node_modules` symlinked from the checkout; outputs inside the worktree or scratch.

| step | result | load | log |
|---|---|---|---|
| `vue-tsc --noEmit` (src) | exit 0 | 10.97 | `final/typecheck.log` |
| `vue-tsc -p tsconfig.test.json` | exit 2 before a library build (`@mkbabb/glass-ui/fourier-math` resolves through `dist/`); **exit 0** after it | 10.4 | `final/typecheck.log`, `final/build-lib.log` |
| library `npm run build` | exit 0 (generation `3cab91dc…`) | 11.0 | `final/build-lib.log` |
| `npm run demo:dist:build` | exit 0 | 30.4 | `final/vitest.log` |
| `vitest run --no-cache` (full) | **245/245 files, 2359 passed, 10 expected-fail, 1 skipped**, exit 0. A run before the demo build failed only `tests/gates/boot-graph.test.ts` (3 tests: no `dist-demo` yet), as on any tree | 30-39 | `final/vitest.log` |
| harness `build.mjs` (scene + demo), label `fv2f` | exit 0 | 45 | `final/build-harness.log` |
| harness build of v1 (label `fl1`, for the census) | exit 0 | — | `final/build-floor-v1.log` |

**Every new gate fails on a planted mutation** (`floor-v2-mutations.sh`, `final/mutations.log`, load 37-48): 14 plants, one at a time, each restored. The dock suites failed on every plant:

| plant | what fails |
|---|---|
| `margin-auto` (restore `margin: … auto`) | N-1 · no auto margin |
| `fixed-centre` (restore `.glass-dock.fixed { margin-inline: auto }`) | N-1 · no auto margin |
| `centre-origin` (`transform-origin: center`) | N-1 · the morph scales from the anchor |
| `no-anchor-read` (anchor = 0.5) | end- and start-anchored anchor tests |
| `second-MO` (a second observer in the run) | N-2 · exactly one MutationObserver |
| `no-subscriber` | useDockContent notifies every subscriber |
| `unread-publish` (`--dock-chrome-px`) | N-2 · every property written has a reader |
| `unscoped-finish` (a `finish()` in the run) | N-3 · no finish outside the hand-off |
| `infinite-taken` | never finishes an infinite effect |
| `exchange-taken` | holds the open-seat exchange; main axis only |
| `no-gutter` | N-4 · the gutter is the pad, as margin |
| `badge-unclamped` | N-4 · the badge clamped to the corner |
| `roving-stays` (no `focusout`) | both roving-return tests |
| `badge-dropped` | the badge paints in the corner cell |

## 4 · H3 on v2 against the pass-3 baseline

### 4.0 · Scope and load

`floor-v2-run.sh <fv2f> <out> "light dark rows"` with `REC_DIR=FLOOR-V2-records/final`. The scope is H3's baseline scope:
- ST;
- W3 `--no-faces`;
- FM;
- W7 (it carries its own light/dark matrix, so it runs once);
- W1 `^card|^vmorph`.

Each ran in light (no scheme forced) and in dark (`DOCK_HARNESS_THEME=dark`). W2, W4, W5 and W6 then ran in light as a regression read of the floor rows. One witness process ran at a time, under the block timeout and a watchdog. Then the janky or changed cells were re-run twice (`rerun{2,3}-*.log`).

| log | cell load range |
|---|---|
| ST light / dark | 33-54 / 38-45 |
| W3 light / dark | 28-54 / 58-134 |
| FM light / dark | 38-49 / 79-103 |
| W7 | 39-72 |
| W1 light / dark | 41-57 / 75-96 |
| W2, W4, W5, W6 | 84-94, 82-91, 64-81, 62-65 |
| reruns 2, 3 (W1, W3) | 35-63 |

Baselines: H3's v1 readings for ST, W3, FM, W7 and W1 were taken in light only. For W2, W4, W5 and W6, pass-2's v1 readings stand (light and dark), since H3 did not change those witnesses. The full per-cell tables, v1 beside v2 light / dark, are in `FLOOR-V2-records/final/tables.md` (`node floor-v2-cells.mjs table final-light final-dark`).

### 4.1 · Counts (pass / counted; OB, UM and RECORD left out)

| witness | engine | v1 (H3 base reading) | v2 light | v2 dark |
|---|---|---|---|---|
| W3 | Chromium | 9/26 | 7/26 | 7/26 |
| W3 | Playwright WebKit | 6/22 (base), 9/26 (w3b) | 7/26 | 7/26 |
| ST | Chromium | 1/5 (st2, st3) | 1/5 | 1/5 |
| ST | Playwright WebKit | 2/5 (st2, st3) | 2/5 | 0/0: **5 UM** (instrument, §4.4) |
| FM | Chromium | 6/6 (fm2) | 6/6 | 0/6: instrument, §4.4 |
| FM | Playwright WebKit | 6/6 | 6/6 | 6/6 |
| W7 | each engine | 6/18 (2 R) | **18/18** (2 R) | (W7 runs its own dark cells) |
| W1 card+vmorph | Chromium | 5/9 (1 OB) | 4/10 | 4/10 |
| W1 card+vmorph | Playwright WebKit | 4/10 | 4/10 | 4/10 |
| W2 | each engine | 7/8 (pass 2, light and dark) | 7/8 | — |
| W4 | each engine | 12/13 | 12/13 | — |
| W5 | each engine | 6/6 | 6/6 | — |
| W6 | each engine | 2/4 | 2/4 | — |

### 4.2 · Every cell whose verdict or failed set changes, v1 → v2

Both engines and both themes read alike unless a cell says otherwise.

| cell | v1 | v2 | reading |
|---|---|---|---|
| W3 `anchor-end·warm-expand`, `·warm-collapse` | F[window, anchor], drift 189.83-189.95 px | **F[window]**, drift 0 px Chromium, 0.16-0.17 px Playwright WebKit | **N-1's witness holds.** `window` stays: 542-558 ms against the strict 257-262 ms and Q-4's lenient 313-317 ms, the floor's clock as on v1 |
| W3 `neighbour·warm-expand`, `·warm-collapse` | P (travel 0 px; gap 425 px) | **F[neighbour]**: a 379.66 px (Chromium) / 379.72 px (Playwright WebKit) one-frame step, ×6.08-×10.9 the bound; overlap 0 px; smallest gap 20 px. Reproduced in reruns 2 and 3 | v1's pass was vacuous: the auto margin absorbed the row's free space and parked the neighbour at the far end. The floor's box goes from its collapsed size to its expanded reserve (and back at settle) in one layout. Both routes inherit the floor's box, so each must give its length back to the flow progressively or hold it (H3-7) |
| W7 `side·*` (12 cells) | F[gutter, badge] | P | N-4 |
| W7 `canvas·*` (12 cells) | F[gutter] | P | N-4 |
| W1 `card·first-expand`, Chromium | OB (worst corner 0.385 px at plate 427.85 × 56) | F[corner, card]: 1.30 / 1.28 / 1.12 px in three readings, at plates 189-238 × 56 | the samples land at a different point of the morph: v1's in-flight sample was near rest, v2's are mid-flight. A scale about a different origin is the same linear map plus a translation, so N-1 cannot change a corner's shape. The floor's mid-flight corner error is the same as v1's `card·warm-expand` F[corner] (1 reading each, v1 and v2) |
| W1 `vmorph·first-expand`, Chromium | P (0.87 px at plate 64 × 256.45, near rest) | F[corner]: 4.05-4.94 px at plates 64 × 143-166, three readings | as above. v1 already fails `corner` on `vmorph·warm-*` (2.72 px) |
| W1 `vmorph·*`, Playwright WebKit | F[corner, moves] | F[corner] | `moves` cured: the screencast sees 7-12 distinct extents (it saw fewer than 3 on v1). This is a sampling change, not attributed to a row |
| W1 `vmorph·warm-collapse`, Chromium dark | — | F[corner, agree] | one dark reading, load 75-96; no light reading fails `agree` |
| W3 `seat-transition`, Playwright WebKit | F[window] | F[window, trajectory] in run 1 (4.33 px vs tol 4.2) | reruns 2 and 3: F[window] only. **NOT-REPRODUCED** |
| W3 `warm-collapse`, Chromium light | F[window, seatStep, seatOverlap, leaving] | F[window, seatOverlap, leaving] | dark keeps `seatStep`; one reading of two |

Everything else in W3 holds v1's verdicts and failed sets in both themes:
- `compaction` F[leaving]
- `content-*`, `lead-*` and `swap-*` fail continuity, window, trajectory, terminal and seatStep
- `first-expand` and `warm-expand` F[window, seatStep, seatOverlap, leaving]
- `reversal` F[window, trajectory, seatStep, seatOverlap]
- `stretch·lead-add` F[seatStep], ×8.32-×10.67 (70.3 px)
- `ticking` F
- `vagree·morph·warm-collapse` F[vagree], in flight 41.1-75.0 px (v1 18.8-94.6 px)
- `hidden-shown`, `viewport-resize`, `lattice`, `infanim` and the other three `vagree` cells pass
- `wide·*` UM (`--no-faces`)

ST's ten light cells match v1 exactly: Chromium `same-task`, `1raf`, `2raf` and `mid-flight` leap ×1.23-×1.97, and `100ms` passes. Playwright WebKit passes `same-task` and `100ms` and leaps on the other three.

### 4.3 · H3-11 (OWNER-BLOCKED) on v2

No v2 cell reads OB. The W1 `card·*` cells fail `corner` beside `card`, so H3-11's "only `card`" condition does not hold. The W3 `window` failures exceed Q-4's lenient allowance. N-5 waits on Q-12. Under H3-11, the cells that would carry it are `card·*` in both engines.

### 4.4 · Instrument limits seen in dark (not floor defects)

- **FM Chromium dark, 6/6 "the video shows no trigger marker".** `film.mjs` counts its black corner marker only after the page has painted that corner light (`film.mjs:81-84`). A dark page never does, so the Chromium dark strips cannot align. Playwright WebKit dark passes 6/6. H3's FM self-test ran light only. These are FAIL in the log and UNMEASURED in substance.
- **ST Playwright WebKit dark, 5/5 UM.** The video's collapsed rest reads 0-4.5 px against the DOM's 102 px: the plate does not separate from the dark page in the screencast. Chromium dark measures (1/5, as light).

Both want a theme-aware marker and plate key in the harness. That is H3's tool, not this seat's row: this seat changed no harness instrument.

### 4.5 · The rows' regression read (W2, W4, W5, W6, light)

All four match pass-2's v1 verdicts cell for cell:
- W2 7/8 per engine: `route1·long-run-v` F[keyboard], missing Seat 1, as on v1 in both themes. The vertical budget reads 536 px against v1's 560 px, which is the 24 px vertical gutter.
- W4 12/13: `compact·non-first-current` F, seat step ×7.43 Chromium / ×3.77 Playwright WebKit, as on v1.
- W5 6/6.
- W6 2/4: `form·expand` and `form·collapse` F[window], 549-552 ms, as on v1.

## 5 · Open

1. **Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox).
2. **N-5** waits on Q-12. **N-1 lands only after Q-16 is ruled**, and the census (§2) is its evidence: 0 sibling mounts rely on the auto margin, and three demo docks in `/dock/vertical` move to the start their containers ask for.
3. **The gutter (owner's glance).** It costs every dock 2 × pad of room. Four sibling mounts size to 100 % or to the viewport without counting it (§2.1), and the demo rail grows 24 px.
4. **`dockSizeHandoff.ts` has no caller in the floor** (§1.3). Each route must call it from its carrier, or strike it.
5. **H3-7 is now live on the floor.** The floor's box steps its full extent in one frame (§4.2). Both routes start from it.
6. **The dark instrument gaps** in FM (Chromium) and ST (Playwright WebKit) (§4.4).
7. **Load.** Runs ran at load 28-134, and nothing was measured on an idle machine. The changed cells were re-read twice at 35-63.
8. **Filmstrips, videos and the JSON under scratch** are not durable. Every verdict here rests on the summary lines in `FLOOR-V2-records/cells-final-{light,dark}.json` and the logs in `FLOOR-V2-records/final/`.
