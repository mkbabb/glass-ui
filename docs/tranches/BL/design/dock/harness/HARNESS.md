# D2 · the dock measurement floor (H2, revised by H3)

| field | value |
|---|---|
| seat | D2 pass 2, H2. Lands REGISTRY §3.2 rows H-1..H-8 into this directory in place, and folds the pass-2 harness obligations: no vacuous green, O-65 (W6), O-66 §2 (W8), O-67 (W7), the O-64 R-6 probe (`r6-probe.mjs`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| what changed from pass 1 | eight witnesses plus one probe (pass 1 had five); faces, corners and edges read from pixels only; WebKit morph frames from the screencast (PF-1); a pinned dock rung (H-3d); the adapter law as a lint (H-6); a real-Safari target (H-8); an unshimmed WebKit pass beside every shimmed one |
| H3 (pass 3) | REGISTRY P2-4 §4.1 rows H3-1..H3-11 landed in place: a paint floor and a gap-free leaving-seat rule under W3's face and seat rows, the `lattice`, `infanim`, `stretch`, `neighbour`, `vagree` and `compaction` cells, the one stall tool (`stall.mjs`, ST), the filmstrip tool (`film.mjs`, FM), W7's split-cap fixture half and per-bin floor, `viewport-resize` judged on what the route owns, and an OWNER-BLOCKED verdict for cells that wait on Q-12 or Q-4 (§8) |
| the numbers | this file describes the tool. Per-pass readings (self-test per engine, baselines) live beside the pass that took them: `../pass-2/H2.md`, `../pass-3/H3.md` |

## 0 · What it is

The harness builds a scene page and the real demo from any worktree, drives Chromium and Playwright WebKit headless (and real Safari through safaridriver when the owner enables it), reads the dock through one small in-page contract, and judges eight properties.

A witness prints one `PASS` / `FAIL` / `UNMEASURED` / `RECORD` / `OWNER-BLOCKED` line per cell with the numbers behind it and the 1-minute load average, then a total. It writes a JSON record and exits non-zero on any FAIL. UNMEASURED, RECORD and OWNER-BLOCKED cells gate nothing and never count as green (`lib.mjs counts`).

Each witness has a reference implementation in `fixtures.mjs` (plain HTML/CSS/JS that satisfies every property) and planted faults (`?fault=`). `selftest.mjs` proves every check can pass on the fixture and can fail on its plant, in both engines. A check that cannot fail is not a check (the pass-1 critic found 18 of D2-A's 58 greens vacuous; H2 gives every sub-check a plant).

## 1 · Run it

```sh
H=docs/tranches/BL/design/dock/harness
OUT=<scratch>/out                                   # default $DOCK_HARNESS_OUT, else $TMPDIR/dock-harness

git worktree add $WT <rev> && ln -s "$PWD/node_modules" $WT/node_modules
node $H/build.mjs $WT --out $OUT --label head       # scene page + demo → $OUT/builds/head
node $H/run.mjs --build $OUT/builds/head --out $OUT --safari
                                                    # adapter law, then every witness: Chromium + WebKit(+shim),
                                                    # then WebKit unshimmed; then the Safari target's status
node $H/w3-morph.mjs --build $OUT/builds/head --engine chromium --out $OUT --cells '^warm'
                                                    # one witness, one engine, cells by regex
node $H/selftest.mjs --engine all --out $OUT        # fixture PASS + every plant FAIL, both engines
node $H/adapter-law.mjs <adapter.mjs> [--diff]      # H-6 lint + diff against adapter-head.mjs
node $H/safari.mjs                                  # H-8 status: ENABLED, or UNMEASURED (owner's safaridriver checkbox)
node $H/calibrate.mjs --out $OUT                    # the instrument facts behind the screencast bounds and PF-1
node $H/stall.mjs --build $OUT/builds/head --out $OUT  # ST: the one stall tool (H3-4); run.mjs runs it too
node $H/film.mjs --build $OUT/builds/head --out $OUT   # FM: the filmstrips for the B2 gestalt read (H3-8)
```

A family prototype builds from its own worktree the same way. If it moved the dock's DOM it passes its own adapter with `--adapter <file>`, which `run.mjs` lints first and the critic reviews as a diff before any run (H-6).

`build.mjs` writes nothing inside the worktree or the checkout: scene sources, both Vite caches and both outputs land under `$OUT/builds/<label>/`.

Theme: `DOCK_HARNESS_THEME=dark` (or `light`) in the environment sets the theme of every scene a witness opens, asserted after load; W7 keeps its own per-cell light/dark matrix. Unset, no scheme is forced (Playwright renders light). Give each theme its own `--out`.

Flags every witness takes: `--build <dir>` or `--fixture <pass|fault>`, `--engine chromium|webkit|safari|all` (comma list), `--out`, `--adapter`, `--cells <regex>` (run only matching blocks), `--no-webkit-shim` (writes to `<run>-unshimmed/`). W3 also takes `--no-faces`: it skips the pixel faces pass, and those cells read UNMEASURED.

Environment:
- `DOCK_HARNESS_BLOCK_TIMEOUT_MS=<ms>` (opt-in) bounds every block. A hung block's cells read `UNMEASURED: HARNESS-TIMEOUT`, and the process exits 2 s after writing its JSON. At load ~400, headless Chromium's rAF was seen to stop for 30 s.
- `DOCK_HARNESS_RAW=1` makes W3 dump its raw strips beside its JSON.

**Load.** Timing cells are load-sensitive. Every cell records the 1-minute load average. A timing cell that fails is re-run twice; a failure seen only under load is NOT-REPRODUCED, never a defect. Safari refuses to start above load 8 (`DOCK_SAFARI_MAX_LOAD`) and holds a lock (one automation session).

## 2 · Files

| file | role |
|---|---|
| `build.mjs` | builds the scene page (from `<worktree>/src` via `@glass`) and the demo into scratch; writes `build.json` (HEAD, dirty flag, timings) |
| `scenes.mjs` | the scene page as source strings. Scenes: `fit`, `rail`, `long`, `morph` (`lead`, `anchor=end`, `wide=1`, `shape=card`), `vmorph`, `swap`, `menu`, `compact` (`active`, `source=late\|el`, `twin=1`), `rim`, `vrim` (`source=el`), `cwidth`, `depth`, `nested`, `tick`, `seatgrow`, `hidden`, `form`, `edge` (`kind=top\|side\|canvas`, `clip=1`); H3: `morph&neighbour=1` (an in-flow neighbour box after the dock). Page hooks on `window.__scene` (`setFace`, `setExtra`, `setLead`, `collapse`/`expand`, `show`, `grow`, `startTick`/`stopTick`, `scrollTo`, `dropA`, `consumerBudget`; H3: `stretch(px)`, the root held px wider than its natural width) |
| `adapter-head.mjs` | the probe contract for GlassDock at HEAD, the WebKit crash shim, the demo route |
| `adapter-law.mjs` | H-6: rules L-1..L-5 plus a diff against `adapter-head.mjs` |
| `plants/adapter-preclip.mjs` | a planted adapter that breaks L-1, L-2 and L-3 (never run a witness with it) |
| `lib.mjs` | the floor: CLI, server, targets, engine launch (Safari via `safari.mjs`), `openScene` (theme asserted after load), in-page helpers (`__hp`), probe paint, PNG decode, silhouette / corner / faces reads, the screencast frame source, the per-frame logger (seats, sharpness, scrollers, owners), the pinned rung and spring math, the morph analysis shared by W3 and W6, reporting |
| `fixtures.mjs` | the reference dock and every planted fault |
| `w1-corner.mjs` … `w8-motion.mjs` | the eight witnesses |
| `r6-probe.mjs` | the O-64 R-6 confirm-or-refute probe |
| `calibrate.mjs` | re-measures PF-1 (does a screenshot complete a running transition, registered property vs plain `width`) and the screencast's noise on static shapes, which set `BOUND_SCREENCAST_PX`, `CARD_SCREENCAST_PX` and `FACE_DOM_SCREENCAST` |
| `safari.mjs` | H-8: the safaridriver target and the WebDriver page shim |
| `stall.mjs` | ST (H3-4): the one stall tool every build uses. A 1.2 s main-thread block at five timings against a warm expand, the plate's painted length per screencast frame, aligned on in-video markers |
| `film.mjs` | FM (H3-8): the filmstrips (first expand, warm pair, both swaps, a content change), driven by the scene hooks and aligned on an in-video trigger marker |
| `run.mjs` | lint, then every witness on one build, shimmed and unshimmed; a table (with OWNER-BLOCKED and UNMEASURED columns) and `run-<build>.json` |
| `selftest.mjs` | fixture PASS, PASS variants, every planted FAIL, the adapter law both ways, the Safari status |

## 3 · The probe contract

A witness reads the dock only through `window.__dockProbe`. For a build the adapter installs it; a fixture page defines its own.

| read | meaning | HEAD adapter |
|---|---|---|
| `root()` | the dock root | `[data-testid=dock]`; demo `[data-testid=sidebar-dock-collapsible]` |
| `plate()` | the one element that paints the glass plate (the silhouette carrier) | `.glass-dock > .dock-plate` |
| `axis()` | `"x"` or `"y"` | `.vertical` on the root |
| `extent()` | the plate's painted rect (own `clip-path: inset()`, ancestor clips, transforms) | `__hp.paintedRect(plate)` |
| `seats({all})` | seat elements; `all` includes inert faces | `.dock-icon-button, .dock-tab-button, .dock-trigger` |
| `paintingSeats()` | seats with opacity > 0.05 along the chain, each with its clipped painted rect | from `seats({all:true})`, never pre-clipped to `extent()` (L-2) |
| `morphing()` | the morph window is open | `[data-morphing]` |
| `rung()` | the spring the extent morph claims | `springPreset("dock")` |
| `posture()` | `collapsed`, `expanded`, `pinned`, `compact`, … | root classes |
| `budget()` | the main-axis extent the dock may reach | `min(max-inline-size, parent content box)`. W2 uses `min(budget(), __scene.consumerBudget)`: the adapter never widens the harness's budget |
| `rim()` | the dock's own progress-rim elements, or `null` | `null` |
| `compact()` | the opt-in compact-on-scroll rung exists | `false` |
| `badge()` | the dock's reserved badge seat, or `null` | `null` |
| `edge()` | optional. Elements outside the plate that carry part of the plate's edge (the D2-G edge caps). The probe's `edge` mode paints them beside the plate; an adapter without them reads the plate alone. It is a DOM read like the others (L-1..L-5) | absent |

`config.compactProps` / `config.rimProps` bind a family's API onto the scene. The token `"@source"` becomes the scene's scroll source (a getter to `window`, or an element with `source=el`), which satisfies O-55's getter-or-element contract.

**The adapter law (H-6, `adapter-law.mjs`).** An adapter reads DOM and pixels. It never derives a reading from the family's inputs and never pre-clips.
- L-1 `extent()` and `paintingSeats()` read no custom property.
- L-2 `paintingSeats()` never refers to `extent()` or `plate()`.
- L-3 the probe source writes nothing into the page (except the `tokenMs` probe element).
- L-4 `webkitShim` sets colours only.
- L-5 the contract is complete (all 13 reads).

The runtime half: W1 `agree` (the silhouette is `extent()`), and W3/W6 faces and wraps from pixels only.

**Pixel reads are independent of the adapter's geometry.** Probe paint (`probeMode`) hides everything but the named element:
- `plate`: the plate opaque magenta on white, every clip and transform kept.
- `faces`: the plate magenta, every seat glyph green `#0f0` at its own opacity, clip and transform. Faces are read from pixels (H-3), never from `paintingSeats()`.
- `rim`: the rim alone, in its own colours.
- `seat`: one seat.
- `els`: named elements.
- `edge`: the plate in its own colours on mid-grey, backdrop-filter off.

**The rung is pinned (H-3d).** Every timing check uses `DOCK_RUNG` from `springPresets.ts` (`{0.30 s, ζ 0.88, band 0.02}`), not the adapter's `rung()`: analytic settle 214.2 ms, v̂max 8.372/s. W3 reports `rung()` against it as its own check (`rung`). A fixture carries its own `FIXTURE_RUNG` (ζ 1.0, settle 278.5 ms).

## 4 · Engines

| engine | frames | label |
|---|---|---|
| Chromium headless | screenshots (they show in-flight frames) | `Chromium` |
| Playwright WebKit headless | **screencast** (`recordVideo`, ffmpeg-decoded, 25 fps, 1 video px = 1 CSS px) for every morph frame read. `page.screenshot()` completes a running registered-property transition (PF-1, re-measured in H2) and cannot sample a morph | `Playwright WebKit`, with `+shim` or `unshimmed` |
| Safari (safaridriver) | viewport screenshots through WebDriver; no touch, no `reducedMotion`, no DSF, no video. Those cells throw and are recorded as not measured | `Safari`. Until the owner ticks Settings → Developer → "Allow remote automation": **UNMEASURED (owner's safaridriver checkbox)** |

Screencast bounds are fixed from measured fixture and plant reads (pass-2/H2.md §1): W1 corner 2.5 px (fixture ≤ 1.69 in the recorded self-test, static stadium ≤ 1.92, nearest plant ≥ 2.93: a WebKit morph-frame shape error under ~3 px is below this instrument's resolution), card radius spread 2.5 px against the same video's static ends, faces and wraps 2.0 px, faces green dominance ≥ 40/255 (VP8 chroma noise reaches 12-20/255 at glyph edges). Chromium keeps screenshots, because its screencast showed 2.1-2.3 px corner glitches.

**The WebKit crash shim.** Playwright WebKit crashes on GlassDock's nested translucent `color-mix()` border at HEAD. `adapter-head.mjs webkitShim` pins that colour to one arm (colours only, L-4). `run.mjs` runs every witness again unshimmed, so every WebKit cell has its unshimmed result beside it and the crash is never masked (E-2).

**Keyboard.** WebKit, like Safari by default, skips buttons on Tab, so W2's WebKit keyboard walk uses Option-Tab (`Alt+Tab`) plus arrows, and names the key in the cell.

## 5 · The witnesses

Bounds live as exported constants at the top of each file, where the source of each is commented.

| witness | property | checks (each has a plant) |
|---|---|---|
| **W1** `w1-corner.mjs` | the plate corner is a circle of radius cross/2 at rest and in every morph frame; a card's fitted radius is one value | `corner` ≤ 1.0 px (Playwright WebKit screencast 2.5); `agree` silhouette vs `extent()` ≤ 1 px; `cover` the silhouette contains root and seats; `moves` ≥ 3 distinct extents when travel ≥ 20 px; `card` fitted-r spread; rail end fully inside |
| **W2** `w2-run.mjs` | no seat state is clipped and every seat is reachable, on every route | named sub-checks: `scroller` (no scroll container or range on a run that fits), `ring` (cut ≤ 0.5 px against the free reach), `paint` (the free ring reaches ≥ 1 px: a ring must exist), `pointer`, `keyboard`, `at` (reach), `plateOut` (route 5), `fits` (route 7), `faces` (routes 5, 7, pixels); routes 1-7 (long run h/v, collapsed layer, routed, hover-scale, consumer width, depth, nested scroller) |
| **W3** `w3-morph.mjs` | every extent morph is one continuous spring on one clock, faces inside the plate | H3: `blank` (the paint floor, §8 H3-1) and `leaving` (§8 H3-3) on every seat-bearing strip; cells `lattice` (`seatWidth`, `errors`), `infanim` (`errors`, `window`), `stretch·lead-add`, `neighbour·warm-*` (`neighbour`), `vagree·{morph,vmorph}·warm-*` (`vagree`), `compaction` (`leaving`, `blank`); `viewport-resize` judged on `window` and `rest`. H2: `continuity`, `landing`, `window` (pinned clock + 2 frames + stall), `trajectory` (≤ 0.04·D + 1 px from the analytic spring), `terminal`, `owners` (one owner per property, K-13 extent-owner rule), `seatStep`/`seatOverlap`, `anchor`, `faces` (pixels; the Chromium faces sampler waits up to 4 s for a change to start, the strip pass's own cap, because the dock's hover-out delay is 3.6 s: pass-2/D2-Bp-proto.md §3.3), `rung`. Cells: first-expand, warm pair, content ±, lead ±, reversal at 35 %, swaps, anchor-end pair, hidden-shown, viewport-resize, ticking, seat-transition, wide |
| **W4** `w4-state.mjs` | posture and compact behave: hysteresis, no hover latch on touch, tap pins, menu holds, reduced motion | compact cells (compacts, engagement expands, no threshold bounce, seat scale, non-first current, late getter, shared scroller, press-then-scroll, prm), prm posture morph, coarse no-hover-latch (pseudos and descendants), tap-pins, menu-holds |
| **W5** `w5-rim.mjs` | the progress rim stays inside the plate and fills with progress | `inside` 0 px outside; `whole` the clip lifted keeps ≥ 20 %; `fill` counts at progress 0, .25, .5, .75, 1: never falls by more than 2 % of the largest, > 0 at .5, rises .5 → 1 |
| **W6** `w6-collapsed-form.mjs` (O-65) | the collapsed dock is one glass form | `wraps` 0 px of form ink beyond the plate (1 px; screencast 2); `present` (collapsed); `dismissSeat`; `onePlate` exactly one backdrop carrier, `plate()`; `samePlate` element identity (the collapsed plate is marked, never compared by label); expand / collapse through `analyseMorph` |
| **W7** `w7-edge.mjs` (O-67) | side, vertical and canvas docks share the top dock's edge, radius and composite | `whole` 48 perimeter bins, each ≥ 0.25 × the median, median ≥ 4/255; `same` ×0.67-1.5 of the top dock; `radius`; `gutter` ≥ 8 px from the surface above; `badge` reserved seat, 0 shared px with a glyph. Kinds × light/dark × DPR 1/2/3; canvas-clipped RECORD |
| **W8** `w8-motion.mjs` (O-66 §2) | every dock motion is sharp and at frame rate | `sharp` 0 frames with a non-identity scale or blur on a painting seat's chain (a seat's own scale is exempt only while it is the engagement carrier: `:hover`/`:active` or its CSS scale/transform transition settling); `pacing` ≤ 1 frame over 40 ms headless; 60 fps UNMEASURED unless `--headed` on a real GPU; consumer rows UNMEASURED |
| **ST** `stall.mjs` (H3-4) | a main-thread stall never turns into a one-frame leap | `leap` no one-frame step of the painted length, from the trigger marker to the landing, above K_JITTER · v̂max · D · dt + 2 px (dt the video's own frame time); `travel` ≥ 20 px (the trigger ran). Arms `same-task`, `1raf`, `2raf`, `100ms`, `mid-flight`; first move, travel inside the block and landing are RECORD |
| **FM** `film.mjs` (H3-8) | the strip a gestalt read stands on is a strip | `tiles` ≥ 2 distinct tiles from the marker frame on, and the dock region changed. The marker is an 8 px black square at the viewport's top-left corner, shown in the trigger's task and read from its own corner decode: Playwright WebKit paints its video at scale 0.98-1.0, which moved a marker beside the plate off its pixels. The PNG strips are RECORD (B2) |
| **R6** `r6-probe.mjs` (O-64 R-6) | does the ring beside a still trigger change on a static page? | `ring·static`: 0 ring px change over 11 shots in 1 s. On a build, four RECORD arms: A static, B stripe moving behind, C B with backdrop-filter off, D plate animations cancelled, and a verdict |

## 6 · Self-test

`selftest.mjs` holds the `EXPECT` table: for each witness, each fault, the cell pattern that must fail and the sub-check that must be named in `failed`, in every engine run. Every named sub-check of every witness has at least one plant (W1 `end` ← `endout`, `card` ← `cardspread`; W2 `keyboard` ← `notab`, `at` ← `noname`; W3 `rung` ← `wrongrung`; W4 `compacts` ← `nocompact`, `engagement-expands` ← `noengage`; W6 `present` ← `formgone`, `dismissSeat` ← `dismissspan`, `samePlate` ← `plateswap`, and the rest as before). PASS variants (`W1 csscarrier`: the same property on a different carrier) must pass. H6 (the adapter law, both ways) and H8 (the Safari status) are rows too. Results go to `$OUT/selftest-<engines>.json`, and the per-pass table to `../pass-N/`.

## 7 · Limits

- W8's 60 fps verdict needs a headed run on a real GPU; headless it is UNMEASURED, and consumer docks (value.js, keyframes, fourier) are not run by this seat.
- WebKit morph frames are 40 ms apart (25 fps screencast); per-frame timing in WebKit comes from the in-page rAF logger, pixels from the screencast.
- Safari has no touch, reduced-motion or DSF emulation through WebDriver; those cells stay not measured in Safari even once it is enabled.
- A family whose silhouette is not the plate element's own box changes `plate()` or extends `probeMode`.
- Headless rAF is irregular under load (stalls of 20-40 ms at load averages above 10). Run one witness at a time; `run.mjs` does.

## 8 · H3 (pass 3)

REGISTRY P2-4 §4.1. Every row has a fixture PASS and a planted FAIL in Chromium and Playwright WebKit (`selftest.mjs` EXPECT; readings in `../pass-3/H3.md`).

| row | where | rule | plant |
|---|---|---|---|
| H3-1 | `lib.mjs blankRow`, W3 | a moving frame (the plate's length or a main edge moves > 0.25 px) is BLANK when no seat of the entering face (the seats painting inside the plate on the strip's last frame) paints above 5 % opacity with ≥ 1 × 1 px inside the plate; a run of more than `BLANK_RUN_MAX` = 1 blank frame fails. `faces`, `seatStep` and `seatOverlap` stand on it | `blankswap` |
| H3-2 | W3 `lattice`, `infanim`; `lib.mjs startLog cellsOf` | `aria-current` moves One → Two on an expanded dock: each seat's cell (the largest ancestor holding only that seat) changes width with no one-frame step above the continuity bound of its own travel, and at least one cell changes. An infinite width animation inside a seat: 0 page errors, the window open no longer than one clock + 2 frames | `latsnap`; `infhold`, `infthrow` |
| H3-3 | `lib.mjs leavingRow`, W3 | a seat with ink ≥ 0.9 on the first frame and ≤ 0.1 on the last LEAVES. Its ink is the larger of its own (opacity × its clipped rect ∩ the plate / its box) and that of any glyph at its painted place from a non-seat leaf or a seat absent on the first frame (a carrier's clones); a boxless seat keeps its last box. It passes when it tracks the closing edge (ink ≥ coverage − 0.1 in every frame) or fades over ≥ 3 frames and ≥ 0.25 × the plate morph's own length. No threshold gap: 0.968 → 0.937 → 0 fails | `pop`, `slipfade` |
| H3-4 | `stall.mjs` | §5 ST. One tool, one instrument (screencast) for every build. A video whose rests disagree with the DOM by > 4 px, or whose scale (taken from post-trigger frames only) is off by > 0.1, is UNMEASURED | `leap` (the fixture on the wall clock) |
| H3-5 | W3 `vagree`; W1 | lossless in-flight screenshots, each bracketed by two `extent()` reads: painted main length within [pre, post] ± (1 px + 1 device px; 1.5 px at DSF 2, where the fixture reads 1.01). W1's Playwright WebKit screencast `agree` subtracts the video's static-rest offset (painted − `extent()` before the trigger) when it is within the screencast corner bound | `deadmorph` |
| H3-6 | W3 `stretch·lead-add`; `__scene.stretch` | a seat prepended to a run held 160 px wider than its content (the root does not change size): the seat row and the paint floor hold | `nostretch` (the carrier learns of the insertion only from a ResizeObserver) |
| H3-7 | W3 `neighbour·*`; scene `neighbour=1` | an in-flow neighbour after the dock: its position has no one-frame step above the continuity bound of its own travel (`neighbour`), and the plate never overlaps it by more than `NB_OVERLAP_PX` = 0.5 px (`overlap`); the smallest gap is RECORD | `nbjump`, `nboverlap` |
| H3-8 | `film.mjs` | §5 FM (the corner trigger marker) | `deadhooks` |
| H3-9 | W7 | the fixture's `splitcaps` (caps outside the plate, named by `edge()`) is the PASS half; `whole` adds a per-bin floor `BIN_FLOOR` = 2/255, so `nocaps` fails in the dark DPR-2 cells too | `nocaps` |
| H3-10 | W3 `viewport-resize` | 0 morph-window frames and the new rest reached; the length span and rest delta are RECORD | `resizemorph` (window), `resizenorest` (rest) |
| H3-11 | `lib.mjs` (`counts`, `Q4_DOCK_CLOCK_MS`), W1, W3 | a W1 card cell whose only failure is `card`, whose two lossless rest radii differ by > 1 px and whose every frame lies between them is OWNER-BLOCKED (Q-12). A W3 cell whose only failure is `window` and whose window holds under Q-4's most lenient reading (a 270 ms dock clock, the flag closing at the 2 % band, a reversal's allowance from its release velocity) is OWNER-BLOCKED (Q-4). The plants beside them (`cardspread`, `late`, `slowclock`) still FAIL | `cardlerp`, `bandclose` (each must read OWNER-BLOCKED) |

The fixture changed with H3 (`fixtures.mjs` header):
- Its clock is stall-safe: a frame gap over 100 ms advances it by one nominal frame (1000/60 ms).
- A swap is a per-seat wipe, and a removed seat leaves clipped from its end edge.
- The size hand-off is scoped. A seat's own size transition is finished only when it changes the run's main extent (`holdingExchange()`), and an infinite one is followed at the extent.
- The morph scene's icon seats carry the open-seat exchange.

The baseline on HEAD, floor v1, floor+B′ and floor+G, with its scope and load story, is in `../pass-3/H3.md §3`, and the per-cell records are in `../pass-3/H3-records/cells-*.json`.
