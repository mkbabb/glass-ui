# W-I.8: the eighth pass, verified

2026-11-22. Seat: adversarial verifier of MEASURE-8. Model: claude-opus-5-5, in the seat written for Fable (Fable is out of quota until 2026-11-21; the owner's standing ruling puts critique seats on Opus until then). I built nothing, changed no source and staged nothing. Most readings below come from the pass's logs, rows and strips, or from `git` on `575084358`, `v11.1.0`, `aeb6f3ee7` and `99a1389e6`. I ran one cell myself: `w-atlas-preset`, Chromium only, under `guarded --timeout 15` at load 7. It ran on a `git archive` of `575084358` in the session scratchpad, with MEASURE-8's pages copied in by `harness/m8/pages8.sh`. One browser and one context per placement were used, both closed. The server stopped on exit, and the tree was deleted afterwards. Its two frames were not kept; the boxes it printed are quoted in refutation 3.

Paths starting `logs/` or `harness/` are under `.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/`. The strips are in `docs/tranches/BL/design/dock/wi8/fold/`.

## Verdict

**NOT READY holds.** Every red on MEASURE-8's top line matches its log. The list of what stands in the way is incomplete, though, and one item on the ready list does not hold:

- G-2's and G-4's fade clause has no biting plant for its 60 Hz part in WebKit.
- Three shipped dock fixes that the merge records as superseded fail their own named witnesses.
- In PlateDock's seat, the `w-atlas-preset` reading describes a broken open dock as an overflow.
- The WebKit strips show the dock without its backdrop blur.
- The owner's page understates how faint the selection is in dark.

## What stands

- **Load and the guard.** In `logs/pm-q.log` the 1-minute load at the start of every run reads 4.4 to 28.7 (1,057 lines, max 28.7). Every plant and G-14 group log starts at 6.1 to 21.6. Browser runs went through `guarded` (`pm/runq.py:87-89`: WebKit with `--exclusive webkit`, GPU runs with `--cpu-cores 0`). Servers ran under `--light`, and no browser run did. The guard refused nothing.
- **Code lines.** I wrote my own counter (block-comment state, quoted strings skipped, a trailing comment counted as code) and ran it over `git show` of every `.ts`, `.vue` and `.css` under `src/components/dock`, tests excluded:
  - v11.1.0: 44 files, 11,081 `wc -l`, **4,741 code**.
  - `575084358`: 43 files, 10,389 `wc -l`, **5,246 code**.
  - `useDockBody.ts`: 1,094 code (1,428 `wc -l`).
  - v11.0.2 reads 4,375 and the base `99a1389e6` reads 4,332.

  The tip is 505 over the bound: RED, as MEASURE-8 says.
- **Public names.** 78 against 80. I checked the +15 and −17 against the barrels, the `DockProps` diff, GlassDock's `<slot>` tags and `defineExpose`, and the props removed from DockLayerGroup, DockControl and DockSeparator:
  - `index.ts`: 8 components and 6 functions at v11.1.0, 9 and 1 at the tip.
  - GlassDock gains `run`, `#rim` and `controlCount`, and loses `#search`.
  - `data-dock-glyph` and `data-dock-scope` are gone from `src/`.
  - The five new `[data-*]` selectors are outputs (`data-corner`, `data-within`, `data-run`, `data-run-whole`, and the rim's `data-edge`), not site inputs.

  GREEN.
- **G-16, both sides.** One fixture source (`harness/m8/g16fix/main.js`), one method (`pm/g16fix.sh` differs from `m8/g16fix8.sh` only in log names), gzip level 6:
  - v11.0.2, `logs/m8-g16-base.json` (read 2026-11-19): 102,631 B.
  - The tip, `logs/pm-g16-pm-cand.json`: 105,249 B.
  - The main checkout's `node_modules` has not changed since 2026-11-11 (vue 3.5.40, reka-ui 2.10.1, vite 8.1.5), so the two-day gap between the reads does not bias them.
  - The unused plant leaves the fixture at 105,249 B, and the used plant moves it to 107,823 B, as ORCH-LINES-7 line 1 asks.

  RED.
- **G-1 (k) and G-6's press cell.** The tip carries master's rule at `useDockState.ts:647-664`, `if (afterSeat) collapse(); else scheduleCollapse();`, as v11.1.0 does at `:539-555`. `logs/pm-side-chromium.log` reads `["k",{"foldAfterLeaveMs":9}]`. `logs/pm-g6-*.txt` read 225.66 px on `p6-press-fine` in both engines, with the hover cells at 0.00.
- **G-7, G-8, G-10, G-12** are GREEN with plants that bite:
  - G-8: all ten `trig8` cells pass in both engines (`logs/m8-trig-pm.<engine>.json`), and g8-exempt (6 cells) and g8-trigger (3 cells) bite in both.
  - G-7: g7-provide changes 8 leaves in both.
  - G-10: g10-rm fails 8 of 16 lines in both.
  - G-12: g12-scale fails "no scale on .glass-dock" (`logs/pm-plant-g12-scale.txt:20`).
- **G-11's trigger count.** 9 of 48 trigger frames are over the bound (my recount of `logs/m8-cost.pm.chromium.json`). The travel's median is one layout per frame on every cell.
- **G-14's counts.** 63, 64 and 8 new failures (`logs/pm-g14cmp.txt`).
- **RU-67's rule on this measure** (`logs/pm-rule67.txt`). No rung meets both clauses: Chromium fails clause 1 at 1 and at 0.85, and clause 2 at 0.7 and below. So 0.85, the firmest rung under 1.70 in both engines, is RU-67's default, and the source's level 1 is not.
- **The merge's coverage.** Master has no `src/` commit after `aeb6f3ee7`. v10.1.6, the one shipped tag outside the tip's history, changes only `slider/styles.css`. Every dock commit in `99a1389e6..aeb6f3ee7` is named in `18f543021`'s message as carried, superseded or net zero.

## Refutations

### 1. The ready list's G-2 and G-4 fade clause has no biting plant for its 60 Hz part in WebKit (major)

RU-70 asks for its plant to be "RED on both parts in both engines". The two parts are op60 (no 60 Hz window moves an opacity by more than two fifths) and a fade of at least 66.7 ms.

Under g2-facehalf, WebKit's op60 reads 0.26 to 0.38 on all six segments, under the 0.40 bound (`logs/pm-plant-g2-facehalf.txt`, the `judge8 webkit` lines). The segments fail on the fade length and the face gap only. Chromium reads 0.40 to 0.49 and fails op60 on all six.

I searched every `logs/pm-plant-*.txt` for a WebKit `judge8` line that fails "in 60 Hz". There is none; in Chromium, g2-facehalf (6) and g2-clock (1) fail it. Part H's run of the same plant read WebKit's op60 at 0.41 to 0.46, so the bite was marginal then and is gone on the tip.

By MEASURE-8's own per-clause rule (the one that leaves G-2's lane corner unwitnessed), the op60 half of RU-70's clause is unwitnessed in WebKit. "G-2's other clauses and G-4 with the fade clause" are not ready.

### 2. Three shipped fixes the merge records as superseded fail their own witnesses (major)

`18f543021`'s message records each of these as superseded and names release-11-0-2's fold and rail tests as the witness. `git log -S` on `tests-visual/release-11-0-2.spec.ts` names the commit that wrote each failing test:

- **`5afae24e9` (O-262, an edge-anchored morph holds its anchored edge).** The test at `:1126` ("a start-anchored rail's open holds the crest") fails in all three projects: "foot never left of the plate", −72 against 18.5. In coarse touch, `:1100` and `:1126` fail on "is a morph" (the open reads 0 morph frames against more than 6).
- **`f4557c102` (O-268, a fold lays out once a frame).** The test at `:702` reads 271 layouts against a bound of 50 in chromium-headless-new. In coarse touch the dock does not fold at all.
- **`46ec8d30f` (O-300 a, O-288).** The fold-content test at `:1501` fails at both widths, both orientations and in all three projects. The transition test at `:1407` fails in Chromium and WebKit.

MEASURE-8 lists these tests among G-14's failures, but never says that the merge's supersession records rest on them, so the merge is not shown complete.

Its explanation for `:702` is also unsupported. M2 says "G-11's trigger and frames-after readings are the same fault seen by trace". The trace's travel reads a median of one layout per frame on every cell, and its frames-after count is 39 across 24 runs. The spec reads 271 layouts in one fold on a scrolling page, so curing the sampler would not be shown to cure it.

The `:1407` failure is described wrongly. MEASURE-8 says "the slotted control's transition reads `background-color, color, scale, opacity, box-shadow`". The expectation that fails is on the dock's own icon control (`expect(r.icon.property).toMatch(/inline-size|width/)`, `logs/pm-g14-tip-chromium-release-11-0-2.log:182-192`). `r.inside` equals `r.outside`, so O-300 a's own clause holds. The test still encodes the open seat that RU-28 deleted, and no seat restated it.

### 3. `w-atlas-preset` in PlateDock's seat: the open dock is broken, not overflowing (major)

MEASURE-8 says the open dock covers none of the legend and that "its two seats reach 31 px past the 375 px plate (to x 406)". The atlas draft offers this placement on those terms. The log shows more than that (`logs/m8-atlas-pm.<engine>.json`, every seat cell, both engines):

- Folded, the plate is `[266, 90, 334, 142]`, 68 px wide.
- Open at rest and in the linger, the plate is `[306, 90, 334, 142]`, **28 px wide**.
- The seats sit at `[310…354]` and `[362…406]`, entirely outside the plate's box.
- So the 0 px² of legend "covered" while open is the cover of a dock that shrank to 28 px.

My re-run reproduces it. The parent is PlateDock's 44 px seat, `[330, 374]`. Open, the root computes `left: 0px; right: 16px; width: 28px`; folded, it computes `left: −40px; width: 68px`. The frame shows a narrow pill holding the clipped left half of the Table glyph. The Filters seat is not visible, and its box lies past the viewport.

`within="parent"` with a parent narrower than the open run squeezes the open dock to the parent's width less the inset. The head-row placement is sound: the open plate is `[278, 382]`, both seats lie inside it, and it covers the title as reported.

No strip shows this cell, and the step-10 message to atlas describes the seat placement as viable.

### 4. The WebKit strips show glass without its blur, labelled "Safari's engine" (major)

`MEASURE-3.md:18` and `fold-2.md:31` record that headless WebKit draws the glass without its backdrop blur. MEASURE-8's WebKit strips show the same:

- `strip-q10-grid-8m.webkit.png`: the page's line "…reads under the dock here. The quarterly report…" runs crisp through every dock, today's included. It overlaps the dock's words on the page dock and the glyphs on the round dock, in both schemes.
- `strip-q14-8m.webkit.png`: the overlay rows show "West sources" and "legend" printed through the glyphs.
- `strip-q21-8m.webkit.png`: the grid frames show the same.

The labels say "Safari's engine (Playwright WebKit)", and OWNER-READ points the owner to the `.webkit.png` files with no word that the blur is missing.

H6 explains WebKit's show-through of about 0.73 against Chromium's 0.10 to 0.20 as "the two engines' grids differ in amplitude under the same plate". Show-through is a ratio of the grid's amplitude inside the plate to its amplitude beside it, so a difference in the grid's own amplitude cancels out of it. The recorded cause is the missing blur. RU-67's WebKit leg therefore reads an unblurred plate, which no Safari user sees. The rule's result rests on Chromium in any case, since WebKit meets clause 1 at 0.85.

### 5. Selection in dark is fainter than the owner's page says (major)

OWNER-READ question 21 says the highlight is fainter "on the docks that need it. On this build that's nav". The tip's readings say more:

- **dials.** In `strip-q21-8m.chromium.png` the selected 5Y stands **1.07:1** off the dock (today's 1.53). 1Y, 5Y and All read almost alike, and so do Lin and Log. OWNER-READ cites only 5Y's word contrast (4.6). `logs/pm-ink-read.txt` reads dials's 5Y and Lin marks on the dark field at 1.059 to 1.079 against a floor of 1.2.
- **No visible fill.** `logs/pm-ink-read.txt` lists current seats that paint no visible fill, the fill equal to its ground within 0.01:
  - WebKit: rail's Regions and canvas-tools's Grid and Draw, on both grounds and in both schemes.
  - Chromium: four seats in dark and two in light.
  - On those seats the selection cannot be seen.
- **Hover against current.** In `strip-q18-8m` the 8 % hover stands 1.04 to 1.06 from the current highlight, so a hovered Home reads as a second selected page.

S4 handed part M the question of whether WebKit 2287 paints `color-mix()` over `contrast-color()`. Part M did not take it.

### 6. G-11's frames-after reading names one source where there are two (minor)

The top line and M1 say "34 forced layouts in the two frames after the triggers, every one under `useGlassBackdropLuminance`". My recount of `logs/m8-cost.pm.chromium.json` gives **39** forced layouts in those frames across 21 of 24 runs. 34 sit under the sampler and 5 under DockLayer's `useResizeObserver` (`E@DockLayer…`). A further 13 sampler layouts fall inside the trigger frames themselves (w-pill 1x's five-layout frame holds one). A cure aimed at the sampler alone leaves the clause red.

### 7. The budget leaves out lines outside the dock directory that RU-85 asks for (minor)

RU-85 asks that RU-62's lines outside the dock directory be reported. M4 reports `participation.ts` and the tooltip. `git diff --stat aeb6f3ee7 575084358` shows the branch adding more outside the directory, none of it in M4:

- `dialog/ModalScrim.vue` +10 (S6)
- `ModalOverlay.vue` +4
- `DialogContent.vue` +15 −3
- `SheetContent.vue` +15 −3
- `Popover.vue` +8 −2
- `SelectContent.vue` and `DropdownMenuContent.vue` +2 each

### 8. Rulings whose witness or reading did not run, or whose outcome is not recorded (minor)

- **RU-76.** Its second witness re-reads G-15 on chrome's folded hexagon, the record the ruling rests on (2.18 to 2.89). It was never read: chrome rests open in ink8 (S5), and G-13's folded-face line judges only figure-tools and the pill.
- **RU-69.** Whether `--glass-veil-dock` reaches the tier was read once, at level 0.4 on the build before the merge (H7: ".14 light and .18 dark"). No outcome is recorded, and the value.js draft still says "We're also checking".
- **RU-68.** H5 built two readings, whether the segmented control's hover takes the dock's token and one held press. Neither result is printed. "What the fold did not decide" listed the first as open.
- **RU-66's run-mark witness.** S1 substitutes the engine cell (`mark8`) for the unit test, because the unit test passes under its plant. MEASURE-8 records that the unit passes under its plant; the substitution itself is a restatement no ruling made.

### 9. A seat that lands in one frame, unreported in three passes (minor)

On the tip, `logs/pm-read6-chromium.txt` and `logs/pm-read6-webkit.txt` each fail one line, `p6-words-fine`: "a unit moves 105.86 px in the window's first row" in Chromium, 105.90 in WebKit. It is read6's "From rest" clause. `m6-read6` and `m7p-read6` fail the same line at 98.78 and 105.90.

MEASURE-6 recorded `w-words` as a reading only ("the changed seat keeps its own width", 176 to 275 px). No pass has reported the read6 failure, and no ruling has decided whether a seat whose word changes may jump its width in one frame under the owner's "nothing changes instantly" edict.

### 10. Strip labels and frames (minor)

- **Question 19.** In `strip-q19-8m`, both engines, the first frame is labelled "a dialog opened from a dock button", but no dialog is legible: there is a dim page and a blurred shape under the dock, and the "Page settings" title is not visible. The third frame catches the dock mid-fold: a faded row in Chromium, and an empty capsule with a small glyph in WebKit.
- **Undersized folded glyphs.** The folded faces in `strip-q19-8m` and `strip-q20-8m` show a glyph of about 16 px in a 52 px disc beside 32 to 36 px open glyphs. `harness/dock-wi8.vue` carries `class="h-4 w-4"` on 31 of its 32 `#collapsed` glyphs. RU-76's clause dropped these classes from the compositions, but not from this page, which these two strips come from.
- **Duplicated frames.** `strip-q10-field-8m` shows "today's dock (11.0.2)" twice per dark row under identical labels (Chromium 1.07 against 1.08 on the folded round dock; WebKit equal).
- **The dark default label.** The Q10 strips label dark's second step "the new default". The build ships the first step in dark (S4), and the strips' captions do not say so.
- **The Q14 crop.** The in-flow row of `strip-q14-8m` still crops the open dock's leading seat (part H's H7 noted this). The prototype rows sit on the dev page's gradient, not the build's ground.
- **Part H's labels.** In the part-H strips (`strip-q17-8`, `strip-q14-8`, `strip-q18-8`, `strip-q10-*-8`) the labels are cut mid-word ("70 / 0 ms", "an / d picture", "the words 16."). OWNER-READ cites none of them.

### 11. G-9 is restated, and one bite log contradicts another (minor)

- **G-9.** M1's verdict column reads G-9 "GREEN on the root" by dropping the follower clause. No ruling retires that clause. MEASURE-8 says retiring it is the ruling seat's call, but it has already scored the gate without it.
- **The bite logs.** `logs/pm-bite.txt` says g15-baked and g15-onestep "does not bite: marks under their floor 0 (tip 0)" in both engines. That contradicts `logs/pm-inkbite.txt`, which M3 uses, and the tip's 10 to 11 marks under their floor. The broken reader's lines stay in a log M3 cites.

## Dropped on the second reading

- **G-16's base read two days earlier.** The fixture script is the same, and `node_modules` has not changed since 2026-11-11. Dropped.
- **The trig cell `pass: false` on the tip.** `logs/m7-adds-pm.*.json` fails the trigger's padding clause (8 against the tab's 12). That clause is the harness's, not a ruling's: step 7 ruled the height, and the Home Assistant draft says the padding stays 8. Dropped.
- **The seat-set strips.** In `strip-seatset-8` the added seat shows clipped at the plate's edge for one frame. It fades in under the lane's clip, as G-4 allows. Dropped.
- **The stadium corner.** M2's claim that Chromium serializes the stadium's infinite length and the painted corner is unchanged stands. WebKit passes the same tests, and the corner cell reads a stadium in every frame. Dropped.

## What the owner would see

In Chromium the dark dock is still glass, but at the level the build ships it barely stands off the warm page (1.06:1). On dials the selected 5Y and Lin are hard to pick out, and a hovered Home looks like a second current page. In Safari's engine every strip shows the page's text running crisp through the dock's words, because headless WebKit draws no blur, and nothing on the strips says so.
