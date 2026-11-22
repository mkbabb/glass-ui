# W-I.8: challenge to RULINGS-7, measurement validity

Challenger seat, claude-opus-5-5, in the seat written for Fable (out of quota until 2026-11-21), 2026-11-17. I wrote none of the rulings, the build, the measurements or the verification. I ran no browser and no build, changed no source and staged nothing.

**What I read.** In full: `RULINGS-7.md`, `MEASURE-7.md`, `verify-7.md`, `ORCH-LINES-6.md`, `RULINGS-6.md`, `challenge-6-measurement.md`, `INPUT-first-load-size`. The owner's frames `f1`, `f4`, `f5`, `f8` and `owner-frame-120.png`; `fold/strip-ladder-7.chromium.png`. `docs/precepts/motion-canon.md` P0 and P0a. On `bl/dock/wi8`, read with `git show` only: harness at `3a923d2ea` (`m7/ink7.mjs`, `m7/cost7.mjs`, `m7/g16.sh`, `m6/judge7.mjs:236-262`, `:405-450`); logs at `3a923d2ea` (`m7-ladder-read.txt`, every `m7-ink-ladder*`, `m7-ink-base1102.*`, `m7-ink-m7p.*`, `m7p-g16.txt`, `m7-g16-*.json`, `m7-trig-m7p.*`, `m7p-side-*.log`, `m7-plant-g1-lift.txt`); source at `943fe6e9d` (`tokens/glass.css:115-185`, `tokens/dark-arm.css:280-300`, `glass/veil.css`, `glass/a11y-fallback.css`, `dock/styles/dock.css:195-262`, `shell.css:105-165`, `adaptive-legibility.css:74-90`, `styles/index.css` imports, `useDockBody.ts` rAF sites, `package.json`); `git diff 99a1389e6 v11.1.0` over the glass tokens, `dock.css` and `useGlassBackdropLuminance.ts`.

**What is a reading.** *Record* quotes a seat's log. *Source* quotes code. *Count* is my own `git` count. *Pixels* is my own numpy read of an image file (mean colour over a box, WCAG ratio), a reading of a picture and not of a page. *Hypothesis* has no reading behind it.

Log paths are under `.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/logs/` at `3a923d2ea`.

## Blocking

### C7-M1. RU-67's dark level rests on one ground, a quantity that cannot see the owner's complaint, and a claim the record contradicts.

RU-67 picks dark 0.7 as "the first rung from the glass end that stands off its field at least as far as the light plate does at its own level (1.27) … in both engines, and below 0.4's slab (1.70)", from the dials page on the warm field only.

- **The same logs carry a second ground, and on it the rule has no member.** *Record*, every `m7-ink-ladder*` and `m7-ink-base1102.*`, ground `flat` (page (11,10,9)), dark, open, all twelve docks, plate against field: v11.0.2 1.004 to 1.014; level 1 1.005 to 1.010; 0.85 1.04; **0.7 1.084**; 0.55 1.14; **0.4 1.20** (Chromium; WebKit within 0.01). Not even the withdrawn slab reaches 1.27. Light on the same ground at level 1 reads 1.31 to 1.67.
- **That ground is closer to the owner's frames than the warm field is.** Of the four dark frames RU-67 cites, `f8` is a near-black page (about (24,19,17)) and `f1` a dark brown one (about (60,53,45)); only `f5` is warm. *Pixels*: `f1` plate (55,48,41) on (60,53,45), 1.077; `f8` plate median equals field median, 1.00; `f5` 1.01 to 1.03. On the flat ground, level 0.7 reads 1.084, about what `f1` reads (a different field, and mean colour rather than modal).
- **The quantity is a tint offset, not transparency.** `ink7.mjs:12-14`, `:115`, `:119-141`: the modal colour of the dock's box against the modal colour of the same box with the dock hidden. The light ladder already shows it is not monotone in opacity: 0.55 and 0.7 mix in more solid `--card` than level 1 and read 1.04 to 1.06 against level 1's 1.278. Both harness grounds are smooth (`strip-ladder-7`: a gradient; `flat`: one colour), so nothing can show through either. In `f8` what shows through is the page's grid. *Pixels*, `f8`, ten grid columns at 32 px pitch: line amplitude 8.75 to 9.18 levels inside the plate against 10.67 to 10.89 beside it, so the plate passes about 0.84 of the grid's structure. The plate-against-field quantity reads 1.00 on that frame.
- **Question 10 and five messages state what the readings deny.** Q10: "in dark it takes about a third more of the card colour, so it stands off the page about as clearly as the light dock does." On the flat ground dark 0.7 reads 1.084 against light's 1.31 to 1.67. "About a third firmer" (fourier, Home Assistant, gregg, slides, sci-report) describes the mix parameter. *Source*: the dark plate is the ink at alpha `--glass-veil-base` 0.18 (`dark-arm.css:285`) lerped to solid `--card` by level (`glass/veil.css`, `--glass-veil`), so its cover goes from 0.18 at level 1 to 0.7 × 0.18 + 0.3 = 0.43 at 0.7, about 2.4 times. The owner said "a bit".

*Why blocking.* The ruling says the plate "is picked by the written rule above from the plate readings, never for looks." The rule, run over the readings the ruling cites as read, returns 0.7 on one cell and nothing on the cell that resembles the owner's frames, and the owner's question tells him a result the record does not show.

*Remedy.* Before the eighth pass shoots Q10: (1) add a structured ground (a 1 to 2 px grid at `f8`'s 32 px pitch, and a line of text under the plate as in `f4`) and read per rung, both engines, the structure's amplitude inside the plate over its amplitude beside it; `f8` gives the owner's "too transparent" point on that measure (about 0.84). (2) Print plate against field on every ground beside each strip frame, not dials alone. (3) Restate the rule over all grounds, or say in RU-67 why dials stands for the owner's frames. (4) Rewrite Q10 and the messages from readings: the plate's cover (0.18 to 0.43) and what each ground reads. 0.7 can stay the provisional default, labelled as chosen on the warm field.

### C7-M2. RU-77 restates a red binding gate on a reason the record contradicts, and the closure counts code no page loads.

RU-77: the entry clause "cannot hold" because "v11.0.2 spread the same code over eight more static chunks that load with the entry", so the closure becomes the bound, and the entry gate was "RED on a build that costs the site less."

- **The eight chunks are the step-2 deletions, not the same code.** *Record*: `m7-g16-ddfa8a2ba.json` closure 27 files, 46,302 B, entry 25,372 B; `m7-g16-668e02a82.json` (after the step-2 removals) 19 files, 35,423 B, entry 22,742 B. The removals commit took the eight files and 10,879 B out of the closure. v11.0.2 still has those exports (`DockBackgroundToggle`, `useDockSearch`, `#search` and the rest), hence its 27.
- **A site's bundler already drops what nobody imports.** *Source*: `package.json` `"sideEffects": ["*.css"]`, so a site's own build tree-shakes unused JS exports of `glass-ui/dock`. `DockBackgroundToggle` has 0 app uses (MEASURE-7's grep), so it was never on any site's page; deleting it shrinks the dist closure and no page. Whether `GlassDock` pulled `useDockSearch` into every page is unread. `g16.sh` walks the dist's static imports from `dock.js` and records no file names, so nothing on record shows how much of the 2,997 B fall a page sees.
- **The one site-side reading tracked the entry.** `INPUT-first-load-size`: 11.1.0's entry grew about 1.6 KB, and value.js, at 124.8 of 125 KB a page, went over and stayed on 11.0.2. The tip's entry is +5,253 B over v11.0.2, and RU-77 itself expects the merge to add 11.1.0's growth.
- ORCH line 3 names the entry and says "a NOT READY on the budget is a real NOT READY". RU-77 turns that RED to GREEN without a reading of any page.

*Remedy.* Measure what the gate exists for: a consumer fixture that imports exactly value.js's dock names (USAGE: `GlassDock`, `DockLayerGroup`, `DockLayer`, `DockControl`, `DockSeparator`, `DockCrossfade`, `DockTrigger` from `/dock-trigger`), built with Vite against each ref's `git archive` dist, gzipped JS attributable to glass-ui, v11.0.2 against the merged tree. Bound that, report entry and closure beside it. Two plants: an unused export added to the dock entry (must not move the number) and a used import added (must move it by its size). Until that reads, G-16 stays RED as ORCH line 3 wrote it, and the value.js message does not say "about 35.8 KB … against 38.8 KB" as what a page downloads.

## Major

### C7-M3. RU-68's dark floor is lowered on cells that were never red, by a reason that does not reach them.

RU-68 restates the dark mark floor from each engine's v11.0.2 reading to a flat 1.2, because v11.0.2's dials mark "was darker than its track … of the other polarity."

- *Record*, `m7-ink-base1102.*`, dark, field: nav Reports 1.252 (Chromium) / 1.318 (WebKit), Chromium's fill (163,114,104) on (151,96,85); rail Regions 1.350 / 1.340, Chromium's fill (183,99,79) on (149,84,69); canvas-tools Grid and Draw 1.327 to 1.331 / 1.315 to 1.323. Flat: 1.356 to 1.373. On every one of these the shipped mark is already lighter than its ground, RU-56's polarity. The polarity reason covers dials on the field and nothing else.
- RU-68 picks "the weakest current step whose … marks meet the floor", so the floor sets the step. Dropping nav, rail and canvas-tools from about 1.25 to 1.37 to 1.2 lets a dark current step through that is weaker than today's dock on those docks, a weakening no red reading asked for.

*Remedy.* Restate the dark floor only where the polarity flipped (dials on the field, both segmented marks), with the arithmetic beside it. Every other dark cell keeps its engine's v11.0.2 reading, as light does. If that pushes the dark step against the words, question 21 already holds the fallback.

### C7-M4. The hover clause has no floor against the plate, and RU-68's selection picks the weakest hover by construction.

- RU-68: "the weakest hover that reads 1.2 against current." Hover is the lighter step under current, so a weaker hover always sits further from current: if 5 % fails 1.2 against current, 7 % fails it too. The rule returns 5 % or nothing, and the candidate read decides nothing.
- No clause reads a hover against its own ground. `ink7.mjs:111` already records it (`againstGround`) and nothing gates it (`:232` reads `againstCurrent` only).
- *Record*, `m7-ink-m7p.*`, at the build's 10 %: dials dark, the hovered 1Y against its ground 1.019 (flat) and 1.061 (field) in Chromium, 1.020 and 1.086 in WebKit. That hover is already near invisible, and RU-68 moves the step to 5 to 7 %. Every hover-against-current read on the same cells passes (1.68 to 1.93), so G-15 stays GREEN over a hover nobody can see. Motion canon P0: "An icon answers hover and state …"; the owner, quoted there, asks that items "communicate … intent with transitions." A hover that does not show answers nothing.

*Remedy.* Add a hover-against-ground floor, set from the Q18 strip the owner picks (or 1.1 until he does), and choose the hover step as the one meeting both clauses. First read whether the segmented control's hover is the dock's token at all; if it is not, RU-68's step does not reach it, and its cell names its own fill.

### C7-M5. Three G-15 reds come from ink7's background read, and the rulings blame a settle and a merge.

`ink7.mjs:65`, `:88`: an item's background is the modal 16-level bin (`:56`) of its own box widened 3 px. A glyph whose strokes are one flat colour can own that bin.

- **WebKit's canvas-tools grid at 1:1 is stable, not mid-change.** *Record*: `grid3x3-icon` reads 1 in an opened dock (`opened: true`), dark, field, in three separate runs: `m7-ink-m7p.webkit`, `m7-ink-ladder1.webkit`, `m7-ink-ladder04.webkit`. In the same cells the Grid seat's mark reads fill **(255,255,255)**, 10.853 and 7.356: the seat box's modal colour is white. Chromium reads the same seat at 1.808 with fill (133,96,81). 1:1 follows from a background equal to the ink, whatever the opacity. RU-82 calls these "of this kind (… 1:1 means an opacity near 0)" and cures them by waiting for the dock to settle. That is a hypothesis, and a reading three runs never moved will not change on a re-read. If WebKit really paints that seat white, it is a paint fault the owner would see, which the settle cure would hide.
- **The loose cell's light hover is the same fault, and no ruling cures it.** *Record*, `m7-ink-m7p.*`: the loose cell's hover against ground in light, field, reads 11.914 (Chromium) and 11.933 (WebKit) against v11.0.2's 1.287 and 1.293. MEASURE-7 calls it "the instrument's fault". RU-66 attributes the loose cell's red wholly to the missing O-269 fills, and RU-82's list leaves this read out. After the merge it still reads about 11.9, and "the loose `DockControl` as v11.0.2" on the ready list stays RED for the harness.
- The same fault inflates passing marks (10.853 counts as a mark that holds its floor).

*Remedy.* In H5: record each item's background and opacity product. Take the background from a ring outside the item's box, or from the box with pixels near the ink colour masked out. Re-read WebKit's canvas-tools and figure-tools cells and the loose cell. Save the WebKit crop of the Grid seat before calling it settled or unsettled.

### C7-M6. RU-74's cure for the sampler moves a forced layout across G-11's frame boundary, and G-11 reads only one side.

- *Source*, v11.1.0 `useGlassBackdropLuminance.ts:487`: the observer now calls `requestBatchSample()`, which asks for `requestAnimationFrame(flushFrameSamples)` (`:139-145`). A frame requested inside an observer delivery runs in the next frame. There `measure()` reads `targetRect(el)` and walks the stack (`:335-354`).
- *Source*, branch `useDockBody.ts:981`, `:1047`: the carrier re-requests its frame from inside its own callback, so in the next frame it runs before the batched sample and writes `--dock-expand-t` and `--dock-morph-t` (`:1057`, `:1075`) before the sample reads. *Hypothesis*: the read is then a forced layout in the first frame of the travel.
- *Source*, `cost7.mjs:203`: G-11's verdict is built from `triggerFrames` only. The travel frames' counts (`layoutsPerFrameMax`, `framesOver1Layout`, `:167-179`) are printed and never judged.
- So "the sampler's layout leaves the trigger frame" can turn the six red frames GREEN with the same layout one frame later. The finding at the top of RULINGS-7 also states as settled ("comes from that gap and not from the redesign") what RU-74 itself labels a hypothesis.

*Remedy.* G-11's trigger clause reads the trigger frame and the next two frames, or a travel clause is added: no frame of a travel carries a forced layout beyond the frame's own. Read the batched sample's layout by stack on the merged build before counting the cure.

### C7-M7. The line bound counts comments, and the arithmetic shows it passes only by deleting them.

- *Count* (same file set as the ruling: `wc -l` totals match exactly; a line counts as comment when its first non-blank characters open or continue a comment, so a trailing comment counts as code):

  | tree | `wc -l` | code | comment | blank |
  |---|---|---|---|---|
  | base `99a1389e6` | 10,372 | 4,332 | 5,411 | 629 |
  | v11.0.2 | 10,489 | 4,375 | 5,484 | 630 |
  | v11.1.0 | 11,081 | 4,741 | 5,665 | 675 |
  | tip `943fe6e9d` | 10,614 | **4,872** | 5,142 | 600 |

  Against its base the redesign is +540 code lines and −269 comment lines. The tip already carries 131 more code lines than v11.1.0 while reading 467 fewer by `wc -l`.
- **The merge projection is off.** *Count*: `git diff --numstat 99a1389e6 v11.1.0 -- src/components/dock` gives +944 −193, of which `README.md` is +45 −3 and is not in `wc -l`. Less `useDockRunMark.ts` (+281) and `dockMorphMeasure.ts` (+102 −17), the merge brings about +343 code-file lines, not "about +430". So: about 10,957 merged; less about 60 removed, plus about 15, plus RU-61's about 30: about 10,940, 60 over. Taking out the 92 struck lines brings it to about 10,850. The gate goes GREEN by deleting prose.
- The owner's words are "a mess with all of this complexity." Comments are not what he called a mess, and a gate that a comment cut can pass does not read it. "Reported beside, not bounded" leaves the code count free to rise.

*Remedy.* The orchestrator restates ORCH line 3's line clause to code lines (at or under v11.1.0's code count, read on the merged tree by one written rule), with `wc -l` reported beside it. Correct the +430 in the budget arithmetic.

## Minor

### C7-M8. WebKit's 0.7 at 1440 is missing seven of eleven pages, not only its plate.

*Record*, `m7-ink-ladder07.webkit.json`: 32 cells (nav, chrome, rail, figure-tools), 8 marks, against 88 cells and 24 marks in every other rung. RU-67 and its last section call the gap "plate: dials {}". The eighth pass reruns the whole rung, not the plate alone. RU-68's dark readings at 0.7 hold for WebKit only on those four pages.

### C7-M9. The plate reading moves 0.05 to 0.10 between two reads of one plate in WebKit, which RU-69's 0.02 witness and RU-67's 1.70 fallback do not allow for.

*Record*: WebKit dials dark, the dock open in both reads, plate (117,82,61) and (117,81,61) against field (138,97,75) and (137,92,76). The field's G channel crosses the bin edge at 96 (`ink7.mjs:56`, `>> 4`), and the ratio goes 1.283 / 1.232 (level 1), 1.497 / 1.423 (0.85), 1.81 / 1.72 (0.55), 2.038 / 1.938 (0.4). WebKit's 0.55 already straddles 1.70 on this swing. *Remedy*: plate and field from the box's mean or median colour, read three times, the spread printed; RU-69's tolerance set from that spread.

### C7-M10. RU-67's witness reads the token, and its plant names a clause that is not a gate.

The witness reads computed `--glass-level`, which echoes the source. The plant is "RED on the strip's plate clause", but RULINGS-6's fold made the plate reading an exclusion and not a gate, and RULINGS-7 adds none. The plant's second leg ("RED … on G-15's dark words") is unread at level 1 under RU-68's not-yet-chosen dark steps. *Remedy*: say the level has a token witness only until the owner picks, or give the plate reading of C7-M1 a gate clause at his pick.

### C7-M11. RU-68 pulls hover into P0a and leaves press outside it.

P0a: "a press | 2 % of colour, or a scale no deeper than 0.96" (`motion-canon.md:68`). The build's press is 28 % against current's 20 % (`dock.css:228-230`), eight points of ink, and RU-68 keeps "its built offset above current" with no reading, while it cites P0a to cut hover from 10 %. *Remedy*: read the press step against P0a's row, or say why the dock's press is exempt.

### C7-M12. RU-73's WebKit witness is modelled on Chromium's event order.

The witness will pass "the tap's `FocusEvent` with the seat as its target". The only recorded order of a tap is Chromium's finger cell (`m7p-side-chromium.log:14`: pointerdown, pointerup, touchend, focusin, click). WebKit's order of a seat tap is unrecorded, and (f) is unit-witnessed only because WebKit has no finger cell. *Remedy*: record the event order and `document.activeElement` in WebKit's seat-tap cell, and run the unit witness with and without the focus event.

### C7-M13. RU-72's hypothesis for the Sheet is already refuted, and the restated touch clause reads the tap that fails.

*Record*, `m7-trig-m7p.chromium.json`: `sheet-touch` closes once with the dock open; WebKit's does not close. The scrim covers the trigger in both engines, so cover cannot explain a WebKit-only failure, and "on touch the clause reads … the scrim for a Sheet" is the same tap on the same scrim. The reading RU-72 orders should start from WebKit's `elementFromPoint` and event order on the scrim, not from the cover question.

### C7-M14. RU-82 does not say what happens to an item still unsettled after its second read.

If it is dropped, RU-82 can silence the fault RU-76 names: a folded face painting at part opacity in an open dock (chrome's hexagon fails at 2.18 to 2.89). *Remedy*: an item unsettled on the second read fails the cell and is printed with its opacity, never skipped.

## Dropped on the second reading

- **RU-70's 66.7 ms is a convenient bound.** Dropped. P0a's own check is "no leg lands more than two fifths of its travel in one 60 Hz frame, and a leg is at least five frames long" (`motion-canon.md:102-104`), and P0a's out row allows 75 ms, which only five frames counted with their ends (four intervals) reconciles. The plant (about 40 ms, 0.45 per frame) fails both parts with room.
- **RU-71's 1.0 px is a quiet loosening.** Dropped. The visibility threshold (0.5) and the lane clause's clip tolerance (0.5, `judge7.mjs:435`, `:419`) stack, and the "shows again" clause still runs inside each travel once the travel starts at the lane's turn.
- **RU-80's "run-to-run spread" is undefined.** Dropped. `cost7.mjs` runs each cell five times at 4x, so a spread exists.
- **The dark arm could beat the a11y brackets.** Dropped. `.dark .glass-dock` ties `:root .glass-dock` at (0,2,0), and `accessibility.css` imports after the dock styles (`styles/index.css:271` against `:207`), so the bracket wins. The static arm loads after `dock.css` in the dock's own index. The witness reads all three.
- **The names table.** Dropped. 80 + 19 − 17 = 82 and each row below it checks.
- **RU-79's cells measure a product change.** Dropped. The fold at 1440 is a ruling with an owner question; the cells then read the shipped preset.
