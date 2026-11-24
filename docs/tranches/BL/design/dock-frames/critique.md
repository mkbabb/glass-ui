# Dock frames: critique of the record, the roots and the 11.1.2 patch

Written 2026-11-23 by a critic seat (claude-opus-5-5). It judges `RECORD.md`, `ROOT.md` and `cure-11.1.2.patch` in this folder against the owner's O-420 words, his standing law (nothing changes instantly; motion with weight and inertia; anchored, growing in place; cure at the root, no workaround, no masking fallback), the redesign's rulings (BL `waves/W-I.8.md`, wi8) and BM's study laws (`BM/study/DESIGN.md` §1, §6).

**Read.** glass `v11.1.0` (d19e12559), `release/11.1.1` (4f1fa667e) and `bl/dock/wi8` (d48c19ec8), all with `git show`. fourier-analysis `origin/master` (266bd67), with the bundle fourier.babb.dev serves now (`/assets/index-C1BDtyX4.js`, fetched read-only). daraksha `origin/master` (61b36f0). value.js 243d0b364. keyframes.js HEAD and its installed 6.0.0 dist. The record's own rows in `record/*.json` and the witness's in `tools/root/witness-*.json`.

**My own cells** ran on an archive tree of `v11.1.0` and a clone with the patch applied, built with `tools/root/slim/build.sh`, through `guarded`. The probe is `tools/critique/probe.mjs`, and its readings are `tools/critique/probe-*.json`. Every number below names its engine. Both engines come from the tree's own Playwright 1.61.1. Chromium is its headless shell with `--use-angle=metal --enable-gpu-rasterization`, and none of my readings depends on backdrop blur. WebKit is its WebKit build 2311, which is not Safari.

## The verdict

The roots of items 2, 3 and 4 are shown at file and line, and they check out at v11.1.0. The cures for the content drift (the pad pinned per posture, the per-child pop deleted), for the collapse's tail (settle at the scalar's first crossing), for the endpoint rounding (`getSize` to the fraction) and for the press (no ring room without a ring, snapping held for the glide) are at the root, and none of them hides motion. The patch applies cleanly to `v11.1.0` and also to `release/11.1.1`, which is 11.1.2's base (`patch -p1 --dry-run`, both exit 0).

Three things block, each judged twice below:

1. Item 1's cure keeps the entering face's fade short and over the leaving face. The ROOT cites wi8's R-3 for it, but the fade breaks R-3's window and phase.
2. Item 1's long first frames are dismissed with "no dock work fills those frames". The record's own rows contradict that.
3. daraksha's 58.95 px plate drift is attributed to its 11.0.2 pin. It is daraksha's own fission row, so the bump does not cure it.

Five major and nine minor items follow.

## Blocking

### B1. The face still fades in about 55 ms over the leaving face; R-3, which the ROOT cites, rules both out

**What the patch does.** `layers.css` (patched): `opacity: clamp(0, calc(var(--dock-expand-t) / var(--dock-reveal-window)), 1)` with `--dock-reveal-window: 0.4` on the entering pane, from the morph's first frame. The leaving pane keeps v11.1.0's `opacity: calc(1 - var(--dock-morph-t))` (`layers.css:193-195`).

**What R-3 rules.** `waves/W-I.8.md:92-95`: one window, `w(x) = clamp(1 − x / 0.55, 0, 1)`. The summary reads `w(e)` and the run `w(1 − e)`, with `e` the dock's openness. So on either posture change the leaving face is gone by 55 % of the travel and the entering face starts at 45 %. The content goes out, then in (P0a's rule 4): "never two things at strength". The window was widened to 0.55 because the earlier windows "gave a fade 2 to 3 samples at 60 Hz against P0a's 'a leg is at least five frames long'". W-I.8's fade bound (`:271`) says a fade lasts at least 75 ms and no two samples 16.7 ms apart differ by more than 0.4. BM law 7 (`DESIGN.md` §1) sets a floor of the same kind: no leg shorter than 83 ms, and none lands more than two fifths of its travel in 16.7 ms.

The ROOT says "This is the redesign's choice too: wi8's R-3 … fades the face as one." R-3 does fade the face as one, but on a different window and in the other phase.

**The numbers** come from the ROOT's own witness rows (`tools/root/witness-*.json`, `raw.open`, fourier repro, 1440 light, cure):

| engine | first morph frame | +8 to 10 ms | +16 to 19 ms | the seal (leaving) in that frame |
| --- | --- | --- | --- | --- |
| Chromium | 0.124 | 0.406 | 0.573 | 0.771 |
| WebKit | 0.124 | 0.412 | 0.614 | 0.754 |

- Every run seat rises 0.45 in 16.7 ms (Chromium), over the 0.4 bound, and 0.49 in 19 ms (WebKit). Part of that is keyframes' fixed first step (item 1's other root), so the step clause fails only where a frame or the first step jumps. The length and the overlap below fail on every cell.
- The spring (`dock` preset, response 0.3, ζ 0.88) reaches 0.4 of its travel at about 62 ms, so the whole face lands in about 60 ms. That is under both the 75 ms and the 83 ms floors.
- In the same frame the seal stands at 0.77 at the dock's centre, inside the uncovered plate, while the seats around it are at 0.57. Those are two faces at strength in one place: what R-3 calls "v11.0.1's look and the thing the owner called not well defined".

**My cells** (1440 light; `tools/critique/probe-*.json`) read the same on every page. With the patch:

- the entering face's fade runs from its last 0 to its first 1 in 46 to 62 ms in Chromium and 54 to 73 ms in WebKit (fourier, the grouped page, the vertical dock, opens and closes);
- its largest change within 17.5 ms is 0.31 to 0.38 in Chromium (0.70 where a frame came late) and 0.12 to 0.48 in WebKit;
- min(seal, strongest seat) peaks at 0.66 to 0.70 in Chromium and 0.63 to 0.70 in WebKit, on every open and every close.

v11.1.0 reads much the same: 50 to 67 ms, and 0.65 to 0.71, with 1 on the open (the Log in seat). So the patch cures the pop and keeps the short, overlapping fade.

The witness's item 1 reading ("pop") is the largest opacity in the first morph frame alone, so it reads GREEN with the rest of the fade unread.

**First judgment.** Item 1 is the owner's "rough first and last frames". A face that goes from 0 to 1 in about 55 ms, over the other face at 0.7, is a rough first frame by the house's own bound. The cure cites R-3 and leaves exactly what R-3 changed. It blocks.

**Second judgment.** Could the 0.4 window stand as 11.1.0's shipped value, outside the redesign's measure? The ROOT itself grounds the cure in R-3, and P0a and BM law 7 are house law, not wi8's private gate. A cure for "rough first frames" that leaves the first frames' fade unread and failing is incomplete. The block holds.

**The fix.** Take R-3's pair on the one scalar in 11.1.2, both panes:

- with `p` the per-swap progress `--dock-morph-t` (0 → 1 in both directions), the entering pane reads `clamp(0, 1 − (1 − p) / 0.55, 1)`;
- the leaving pane reads `clamp(0, 1 − p / 0.55, 1)`, in place of today's `1 − p`;
- or a window that the ROOT shows meets the 75 ms and 0.4-per-17-ms bound with no overlap.

Then add the fade's length, its largest 17 ms step and the overlap to the witness, and drop the frame-1 "pop" as the item's only reading.

### B2. "No dock work fills those frames" is past its evidence, and the record's rows say the opposite

**The ROOT** (*Long frames*): four closes traced on live fourier in Chromium showed no long frame, so "No dock work fills those frames, and nothing here cures them". The record's long frames are put down to machine load.

**The record's rows** (`record/*.json`, every morph segment, `longFrames`, counted by frame index and divided by the number of segments reaching that index):

| engine | frame 1 | frame 2 | frame 3 | frames 4 to 7 | frame 8 and later |
| --- | --- | --- | --- | --- | --- |
| Chromium | 0.008 | **0.088** | 0.008 | 0.008 to 0.028 | 0.003 |
| WebKit | **0.185** | **0.090** | 0.031 | 0.020 to 0.046 | 0.013 |

- Load does not choose a frame index. These frames cluster at a morph's start: 30 times the late rate in Chromium's second frame, and 14 times in WebKit's first.
- They also came on the repro, a page that holds nothing but the dock: 3 of 4 closes at 1440 in Chromium, 25 to 42 ms, one 213 px step (`RECORD.md` item 1 table).
- At Chromium's per-close rate, four traced closes expect about 0.35 long frames, so finding none is no evidence of absence.

So the long first frames are tied to the morph's start, and the work that starts there is the dock's:

- `will-change: transform` arming on the root and on both `.dock-controls` children at `[data-morphing]` (`layers.css:106`, `shape.css:137`), which promotes layers and rasterises them at the first frame;
- the post-flush `measure` and `anchor` reads (`useDockMorph.ts:116-124`, `dockMorphMeasure.ts:656-774`);
- the ResizeObserver set on every pane and seat (`dockMorphMeasure.ts:394-405`).

These are candidates, not roots, and the ROOT has to read which one it is.

**First judgment.** These frames are the owner's item 1 at its plainest: 25 to 82 ms frames with 47 to 363 px steps in the first frames of opens and closes, on every site, in both engines. The verdict sends him an all-clear the rows do not support. It blocks.

**My cells** (Chromium, 4x CPU throttle, the fourier repro, 6 opens and 6 closes per tree; `probe-chromium.json`, `cpu`) give the same answer. The second frame of a morph is the long one, while the median frame from the eighth on is 8 to 15 ms:

| | opens, second frame | closes, second frame |
| --- | --- | --- |
| v11.1.0 | 29 to 38 ms, 6 of 6 | 53 to 62 ms, 6 of 6 |
| with the patch | 13 to 53 ms, 5 of 6 over 20 ms | 33 to 61 ms, 6 of 6 |

The frame is there on both trees, so the patch does not touch it. WebKit shows it unthrottled. The first frame of a close arrives 26 to 37 ms after the frame before it in 12 of 14 closes, on both trees (18 ms in the other two, one per tree, both on the vertical dock), against 8 to 12 ms frames after it (`probe-webkit.json`, `closeDt`).

**Second judgment.** Could the clustering come from the probe itself, from an input dispatched at the start of the route? The idle-timer closes have no input at their start, and the repro's dock-only page shows the same frames. My cells close by a synthetic `keydown`, with no input dispatched through the driver. My sampler reads the same boxes every frame, so it cannot single out the second one. The block holds.

**The fix.** Under the load the record had, or under Chromium's CPU throttle, trace enough closes to catch the frame (20 or more), read what fills it, and place the cure. Until then the verdict reads "reproduces; not rooted".

### B3. daraksha's 58.95 px drift is its own fission row, so the bump does not cure it

**What the record and the ROOT say.** "daraksha's plate drift (58.95 px) is its 11.0.2 pin. No 11.1.0 dock shows it, so the bump cures it." The sites table repeats it ("That cures its plate drift").

**What daraksha does.** daraksha at 61b36f0 draws its theme seat as a separate fission dock beside the main plate. It translates the whole row, the main dock included, by half the seat's width and gap as the seat pulls out:

```css
.fission { translate: calc(-0.5 * (var(--seat-w) * var(--a) + var(--seat-gap) * var(--g))) 0; }   /* src/shell/SiteDock.vue:476-488 */
```

That runs on glass's `--dock-morph-t`, mirrored each frame (`SiteDock.vue:69-115`).

**The record's numbers fit it exactly.** A plate that grows about its own centre by Δ, inside a row that moves by X, moves its left edge by −Δ/2 − X and its right edge by +Δ/2 − X:

- at 1440: −180.1 and +62.2, so Δ = 242.3 and X = 58.95;
- at 390: −154.6 and +36.7, so Δ = 191.3 and X = 58.95.

X is the same at both widths, as a fixed seat width and gap would give. No glass version enters it.

**First judgment.** The site row tells daraksha that a bump cures a 59 px sideways drift that the bump cannot touch. That drift is the owner's item 2, "it should not shift around in flow of the page horizontally", on a site he reads. It blocks the sites table.

**Second judgment.** Could 11.0.2's morph origin also contribute? The arithmetic leaves no remainder at either width (to 0.01 px), so there is nothing left for glass to contribute. The block holds.

**The fix.** Root it to `SiteDock.vue:476-488`, the pair centring. Place it:

- on daraksha now: centre the pair at rest, and do not re-centre it while the dock animates;
- on the 11.2.0 fission seat as a hard cell: the main plate stays anchored while the seat leaves it, as the owner's anchor law and BM §6.3's window imply.

## Major

### M1. A shipped visual spec reads the deleted knob

`tests-visual/release-11-0-2.spec.ts:1447,1466` (at v11.1.0 and at `release/11.1.1`) reads `--dock-stagger-window-size`, with a fallback of 0.55, to bound each frame's opacity step through a fold, horizontal and vertical, at 1440 and 390.

- After the patch the token is gone. The spec bounds a step at `dt / 0.55 + 0.05` while the face moves `dt / 0.4`, so it fails at any expand frame where `dt` exceeds about 0.07, and the spring's early frames move `dt` 0.11 to 0.13 at 60 Hz.
- The ROOT says "No site and no other test sets or reads them". That is false.
- The checks ran `tests/components/custom/dock`, `tests/styles` and `tests/gates`, but not `tests-visual`.

The patch must carry the spec onto the face's real window, whichever B1 settles on. This spec is also the vertical-dock fold witness the ROOT lists as not run (*Not run*, "Vertical docks").

### M2. The keyboard route is missed, and the smaller root for a fitting run is set aside

Neither the record nor the witness reaches the theme seat by keyboard.

- With the patch, a key's focus still counts the ring's room (`ring` is true for `:focus-visible`). So on fourier at 1440, a run flagged `data-run-fits` and 4 px over its port still glides the whole row 4 px when the theme seat takes keyboard focus. The owner's "toggling it should not shift it around" names no input.
- wi8's RU-52 is one rule: `.glass-dock[data-run-fits] :where(.dock-layers) > .dock-run { overflow: visible; }` (wi8 `run.css:524-529`). A run whose seats all show is then no scroll port, so neither a press nor a key moves it, and the ring paints into the visible overflow.
- The ROOT notes RU-52 and the first draft's different rule (snapping off for a fitting run) but reads neither on the keyboard route.

**My keyboard cell** (Chromium and WebKit, 1440 light, the fourier repro, About focused, then ArrowRight to the theme seat, which matched `:focus-visible`):

- v11.1.0 moves every seat 4 px in 1 frame;
- with the patch, every seat moves 4 px over 4 frames, at most 1 px a frame.

Both engines read the same. The row still moves, in fewer frames than the five the ROOT's hard cell 5 asks of a reach's glide.

For 11.1.2:

- keep `ring` for a run that does not fit (390), where it is right;
- add RU-52's rule, or show why it cannot ship in a patch;
- add a keyboard cell to the witness.

### M3. keyframes' tooltip is placed against the ROOT's own rule

The ROOT's placement rule: "Every cure above is a shipped 11.1.0 defect. It goes in 11.1.2." The keyframes tooltip that outlives the open and follows the hidden seal 142 to 145 px is a shipped 11.1.0 defect, and the record placed it in 11.1.2. The ROOT moves it to 11.2.0 for three reasons, and none of them holds as given:

- **"It needs a mark for the `#collapsed` face."** That mark is the cure itself: a `provide` around the `#collapsed` slot like `DockFace` (`dockContext.ts:105-118`, six lines), and a watch on the expand edge beside the one at `participation.ts:126-129`.
- **"It needs a tooltip close through reka's root."** `release/11.1.1` already injects reka's `TooltipRoot` context in `TooltipContent.vue` (`injectTooltipRootContext`, read as `tooltipRoot.open`), and that context carries `onClose` (reka-ui 2.10.1, `Tooltip/TooltipRoot.js`), so the close is `() => tooltipRoot.onClose()` passed as `close`.
- **"It reproduces only in Playwright WebKit."** Chromium never opened that tooltip at all (`RECORD.md` item 5). The open is a race between the tooltip's delay and the hover open, not an engine trait, and the root (`participation.ts:124-130`) is engine-agnostic. wi8 carries it.

Place it in 11.1.2, or say which reason survives.

### M4. Item 5's verdict reads "not on fourier", but it was not read

The record could not draw a native tooltip, which is a different thing from not reproducing it. I confirmed the source claim: the bundle fourier.babb.dev serves now binds `title: u(t) ? "Switch to light mode" : "Switch to dark mode"` on the `DockControl`, and "Switch to dark mode" appears nowhere else in the bundle.

Why a native tooltip lands at the screen's far left is not shown. AppKit places a native tooltip at the pointer, so the owner's frame is itself unexplained. "The browser's own tooltip, which no glass code places" is an inference, and fourier adopting glass's Tooltip is a substitution, not a root.

Mark item 5 as unrooted, with the owner's own reading owed: the browser, its version, and whether the page was zoomed or on a second display. Keep the fourier change as a recommendation.

### M5. The patch is witnessed on v11.1.0, and 11.1.2 builds on 11.1.1

The phone-scroll row, 11.1.2's first row, applies to `release/11.1.1` at 4f1fa667e. 11.1.1 changes three files the patch's cells depend on:

- `layers.css`: the reduced-motion pane crossfade, an `opacity` transition on `.dock-layer.is-active`;
- `DockControl.vue`: the press now rides `useLiquidPress` defaults;
- `TooltipContent.vue`.

The patch applies there, but no cell has run there. Re-run the witness on 4f1fa667e with phone-scroll's patch and this one, including one reduced-motion cell, before the build takes it.

## Minor

1. **Stale contract text.** The patch leaves `layers.css:166-177` ("ZERO opacity authority on the active pane … never faded") and `:228-233` ("the entering pane revealed by the clip aperture + child stagger") standing over a rule that now fades the active pane.
2. **"The plate's last steps decrease into the settle frame in every cure cell."** The ROOT's own example is −4.22, −3.03, −1.16, −1.74, −0.37 (WebKit), and the harness page in WebKit reads −0.56, −0.58. Say "the last step is the smallest", which is what hard cell 4 asks.
3. **A keyboard reach that stops a glide mid-way hands snapping back off a snap point.** `reach` calls `stopGlide` for a ring reach to a seat already in view, mid-glide (a fast arrow traverse). Removing the inline `scroll-snap-type: none` there makes the engine re-snap from an unsnapped offset in one frame. Hold the snap until the glide's own settle, or retarget the glide.
4. **Mixed precision.** `getSize` is now fractional, but `extentOf` and `publishYield` still read seat extents from `offset*` (`useDockRun.ts:181-191`, `dockMorphMeasure.ts:364-374`), and `runEdge` mixes the two. A run within a pixel of fitting can flip `data-run-fits`, and with it the reserve yield, at the bump. No cell covers it.
5. **The pane becomes a backdrop root while it fades.** An `opacity` below 1 on the run pane makes it a backdrop root for any `[data-active]` capsule seat that is a direct child of the run (`.glass-capsule` with its `backdrop-filter`, `controls/icon-button.css:224-237`). That is the lens the #47 fence names (`morph.css:67-76`). The leaving pane already does this on v11.1.0, so it is not new in kind, but the frost lands in one frame when the fade reaches 1. Neither headless lane can read it; it needs the GPU lane or Safari.
6. **Sites not listed.** Home Assistant's dock (hassio-config sets `--dock-collapsed-padding`, `frontend/src/styles/scale.css:60`, which the pinned collapsed pad reads) and atlas's docks are not in the sites table. The owner asked for all docks.
   - Atlas's own film arrived after the ROOT (`inbound/atlas-2026-11-23/README.md`, glass 10.1.2). It is the first site where the layout-box cell shows. A closing figure dock holds its open width in the row through the close and the tail, then gives it back in one frame. At 390 that wraps the row, and the figure drops 64 px for about 500 ms and snaps back.
   - The 11.1.2 settle at the first crossing halves that hold but keeps the jump. The 11.2.0 cell should name atlas as its witness, and the sites table should carry atlas's row.
7. **The first step's release.** glass declares keyframes.js `^6.0.0`, so a keyframes 6.0.x patch reaches every site on install without a glass release. "glass picks it up at its next keyframes.js bump" is only true for the lockfile.
8. **gaggle's G1.** gaggle's report puts G1 on the engine's own focus scroll, with `reach` giving way to it (`README.md:102`). The ROOT says G1 "is item 3's root" without answering that. The witness's 390 tap, which glides with the patch, is the answer; say so.
9. **A claim about wi8 with no reading.** "wi8 has no reserve-and-scale seal for it to snap" (item 4, the WebKit residue) is stated without a reading. Either read wi8's seal at the settle in WebKit, or drop the clause; hard cell 4 already carries the residue.

## What checks out

- **Item 1:** the pop of a `display: contents` group (`layers.css:286-314`; fourier `AppDock.vue:461`). The per-child selector cannot reach a box the host did not make.
- **Item 2:** the pad lerp (`morph.css:119-123`, `:150-154`), with origins read once at the arm (`dockMorphMeasure.ts:656-774`). It is also a P5 breach (`docs/design/motion-canon.md`, P5: never animate `padding`), which the ROOT could cite. The 0.82 pop about each child's centre (`layers.css:306`) checks out too, on color (value.js `Dock.vue:305`) and fourier (`AppDock.vue:447-459`).
- **Item 3:** reach counts the reserve for a pointer press (`useDockRun.ts:217-229`, `:402-406`), and glide writes are snapped in a `mandatory` port (`run.css:260`). Both engines land in one frame, and the 390 tap glides with the patch.
- **Item 4:** `useDockSpring.ts:95-104` passes no thresholds, so keyframes' 1e-3 defaults hold (dist `sequence-BvpIpCGp.js:219-227`). The dock preset's `settleBand: 0.02` is dropped too, and the first crossing is the right cut, since a 0.02 band would land 13 px early. Every channel the scalar drives clamps at 1, so settling at the first crossing hides no motion. `dispose()` inside `onFrame` stops the loop without a second `onSettle` (`playback.ts`'s generation guard; `dispose` does not set `settled`).
- **The rounding:** `offset*` rounds the endpoints (`dockMorphMeasure.ts:7-11`, `:316-320`, `:772`), and `k` (`:675`) carried the same error.
- **The fixed first step:** `playback.ts:242`, dist `sequence-BvpIpCGp.js:119-121`.
- **Item 5:** `participation.ts:124-130`, and TooltipContent passes no `close` at v11.1.0.
- **The pins:** fourier serves 11.1.0 (`web/package.json:22`), and daraksha pins 11.0.2.
- **The pad pin, on the paths the witness did not read** (my cells, 1440 light, both engines). The leaving faces hold: the seal on an open and the run seats on a close travel 3.87 to 3.99 px on v11.1.0 and 0 with the patch. On the harness's vertical dock (`dock-v-closed`) the entering seats travel 4.1 to 4.16 px on v11.1.0 and 0 with the patch, and the leaving seats 1.57 to 1.64 px and 0. The vertical pin and the leaving faces are clean. The witness should carry these cells, but they do not change the cure.
- **The WebKit residue.** The grouped page's seal steps 1.31 px at the settle on v11.1.0 and 0.49 px with the patch (WebKit, mine as well as the witness's); fourier's repro steps 0 in both trees.

## My readings

`tools/critique/probe.mjs` on the two archive trees, 1440, light, at device scale factor 2. It covers the fourier repro (three open and close cycles, closed by Escape), the grouped page (two), the harness's vertical dock (two, closed by a press outside) and one keyboard reach. In Chromium it also ran six cycles under a 4x CPU throttle. One browser and one context per tree, closed in `finally`.

**Chromium** (`probe-chromium.json`):

| reading | v11.1.0 | with the patch |
| --- | --- | --- |
| entering seats' travel, open (fourier / group / vertical) | 8.68 to 9.32 / 14.69 / 4.1 px | 0.02 / 0 / 0 px |
| leaving seal's travel, open (fourier / group) | 3.89 to 3.91 / 3.91 px | 0 / 0 px |
| leaving seats' travel, close (fourier / group / vertical) | 3.91 to 3.93 / 3.92 / 1.57 px | 0 / 0 / 0 px |
| seal's settle jump, close (fourier / group) | 0.02 / 0.83 px | 0 / 0 px |
| open and close, ms | 549 to 559 | 257 to 265 |
| entering face's fade, last 0 to first 1 | 50 to 61 ms | 46 to 62 ms |
| its largest change within 17.5 ms | 0.30 to 0.47 | 0.31 to 0.38, 0.70 once |
| two faces at strength, min(seal, strongest seat), open / close | 1 on fourier (the Log in seat), 0.68 to 0.70 on the grouped page / 0.67 to 0.71 | 0.66 to 0.70 / 0.66 to 0.69 |
| keyboard reach of the theme seat (first seat's move, frames, largest step) | −4 px, 1 frame, 4 px | −4 px, 4 frames, 1 px |
| second frame of a morph under 4x throttle, opens / closes | 29 to 38 / 53 to 62 ms | 13 to 53 / 33 to 61 ms |
| median frame from the eighth on, same runs | 8 to 11 ms | 8 to 15 ms |

**WebKit** (`probe-webkit.json`, under `guarded --exclusive webkit`; no throttle in this engine):

| reading | v11.1.0 | with the patch |
| --- | --- | --- |
| entering seats' travel, open (fourier / group / vertical) | 9.29 to 9.85 / 14.64 / 4.1 to 4.16 px | 0 / 0 / 0 px |
| leaving seal's travel, open (fourier / group) | 3.87 to 3.89 / 3.90 to 3.91 px | 0 / 0 px |
| leaving seats' travel, close (fourier / group / vertical) | 3.99 / 3.97 / 1.61 to 1.64 px | 0 / 0 / 0 px |
| seal's settle jump, close (fourier / group) | 0 / 1.31 px | 0 / 0.49 px |
| open and close, ms | 554 to 575 | 264 to 284 |
| entering face's fade, last 0 to first 1 | 55 to 67 ms | 54 to 73 ms |
| its largest change within 17.5 ms | 0.23 to 0.46 | 0.12 to 0.48 |
| two faces at strength, open / close | 1 on fourier, 0.67 on the grouped page / 0.65 to 0.71 | 0.66 to 0.70 / 0.63 to 0.70 |
| keyboard reach of the theme seat | −4 px, 1 frame, 4 px | −4 px, 4 frames, 1 px |
| interval before a close's first morph frame | 18 to 36 ms (26 or more in 6 of 7) | 18 to 37 ms (26 or more in 6 of 7) |

## Files

- `critique.md`: this file.
- `tools/critique/probe.mjs`: the critic's cells (the leaving faces, the fade, two faces at strength, the keyboard reach, the vertical dock, and Chromium's CPU-throttled frame intervals).
- `tools/critique/probe-chromium.json` and `tools/critique/probe-webkit.json`: its readings.
- `trees/`: the archive trees, gitignored and deleted when this seat finished.

**To rerun the probe:**

1. Make `trees/v11.1.0` and `trees/cure` as the ROOT's *To rerun the witness* steps 1 to 3 do: `git archive v11.1.0 -- . ':(exclude)docs'` keeps the 6.7 GB `docs/` out.
2. Run `~/.claude/guard/guarded -- node tools/critique/probe.mjs chromium tools/critique/probe-chromium.json`.
3. Run `~/.claude/guard/guarded --exclusive webkit -- node tools/critique/probe.mjs webkit tools/critique/probe-webkit.json`.
