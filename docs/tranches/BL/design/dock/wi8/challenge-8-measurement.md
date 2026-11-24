# W-I.8: challenge to RULINGS-8, measurement validity

Seat: adversarial challenger, lens measurement validity. Model: claude-opus-5-5, from this seat's own system identity, in a seat written for Fable (the owner's order of 2026-11-19 puts every seat on Opus). 2026-11-22. I wrote none of the rulings, the measure, the harness or the source. I launched no browser and no build, changed no source, and staged nothing. Every reading below comes from a file, a log, a row file, a strip I opened, or `git` on `575084358`, `v11.1.0`, `v11.0.2`, `99a1389e6` and `release/11.1.1`. Paths that start `logs/`, `rows/` or `harness/` are under `.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/`.

**What I read.** `RULINGS-8.md` in full; `ORCH-LINES-7.md`; `verify-8.md`; `MEASURE-8.md` (top line, parts H, S and M); `INPUT-first-load-size-2026-11-15.md`; strips `strip-q18-8m.chromium` and `strip-q21-8m.chromium`. Logs: `pm-rule67.txt`, `pm-ink-read.txt`, `pm-read6-{chromium,webkit}.txt`, `pm-g6-chromium.txt`, `pm-plant-g2-facehalf.txt`, `pm-plant-g2-curve.txt`, `pm-g14-tip-webkit-release-10-1-3.log`. Rows: `rows/pm/p6-words-fine.*` and `rows/pm/p6-press-fine.*`, both engines. Per-dock show-through from `logs/m8-plate-pm-q10grid.chromium.json` under `pm/rule67.py`'s own filter. Harness: `m6/read6.mjs`, `m4/read4.mjs`, `m8/judge8.mjs` (header), `m8/cost8.mjs`, `m8/ink8.mjs`, `pm/analyse.sh`, `pm/rule67.py`, `scenarios-m6/p6-press-fine.json`, `p6-words-fine.json`. Source at `575084358`: `useDockBody.ts` (`:245-272`, `:438-470`, `:675-687`, `:692-800`, `:950-966`, `:1058-1062`, `:1285-1345`), `useDockState.ts:465-495`, `useGlassBackdropLuminance.ts` (`:120-160`, `:330-410`, `:470-500`), `GlassDock.vue`'s sampler wiring, `icon-button.css`, `run.css:596-660`, `:758-768`, `shape.css`, `density.css:270-335`; `tests-visual/release-11-0-2.spec.ts:700-745`, `:1040-1135` and its `rail-harness.ts`.

Each objection was made, then re-read against the ruling and the evidence; those that did not survive are listed at the end.

## Blocking

### 1. RU-91 retires the only clause that reads content against the plate's outline

**Claim.** RU-91 says "G-2's curve clause and g2-curve retire with it; content inside the plate's outline stays G-2's other clauses" (`RULINGS-8.md:51`), and the ready list repeats "the curve clause retired with the inset" (`:337`). The second half is false. The curve clause is the content-inside-the-outline clause. No other G-2 clause reads it.

**Evidence.**
- `harness/m6/read6.mjs:22-24` defines it as "inside the plate as rounded shapes (C2-6): every unit above 0.1, its clipped shape … against the plate's rounded box; the largest overshoot in px (bound 0.5)". It is computed at `:49-119` and is the same in `m4/read4.mjs:4-6`.
- `judge8.mjs` and `gates4.mjs` hold no outline or curve clause (a grep finds none). judge8's clauses are the fade, the lane, the turn and "shown".
- The plant reads it: `logs/pm-plant-g2-curve.txt`, "content 8.29 px outside the plate's curve", in both engines.
- RU-91's own reason quotes the complaint this clause reads: OWNER-READ question 5, "with the selected tab past the glass".

RU-91 changes the very outline the clause reads, so a tall dock gets 28 px corners where it had the stadium. It then removes the one reading that would show content past those corners in a frame of a fold or an open.

**Remedy.** Keep read6's curve clause under the name "content inside the plate's outline", and retire only g2-curve, the inset's plant. Its replacement plant is RU-91's own: `--radius-dock` back on the root, read on w-tall and the other cells taller than one row (the stadium with no inset). It must be RED on the outline clause in both engines. Read the clause on w-tall through a fold and an open in both engines.

### 2. RU-101's cause is contradicted by the rows, and its cure cannot turn its witness GREEN

**Claim.** RU-101 says a seat's resize "moves its neighbours", that "a neighbour that jumps 106 px in a frame is what the owner sees", and that the carrier "carries seat moves on a change of the seat set … but not on one seat's own resize". Neither the rows nor the source support this.

**Evidence.**
- *The rows, at each window's first row* (`rows/pm/p6-words-fine.wi8.<engine>.1440-fine-light.rows.json.gz`):
  - Chromium row 46: seat#1 width +105.86, seat#2 x −0.14, plate width 0.
  - Chromium row 153: seat#1 width −105.86, seat#2 x +0.14.
  - WebKit rows 35 and 114: seat#1 width ±105.90, seat#2 x −0.09 and +0.10, plate 0.
- *Who moves.* seat#1 is the middle trigger, the one whose word changes. The neighbour seat#2 is carried and then glides (842.52, 842.09, 840.74 over rows 153 to 155), and so does the plate (513.61, 512.73, 510.05). `logs/pm-read6-*.txt:147` names seat#1. read6's held clause takes the largest of |Δx|, |Δy|, |Δright| and |Δbottom| (`read6.mjs:120-139`), so what fails is the changed seat's own trailing edge, not a neighbour.
- *Source.* `onResize` calls `sync("ro")` (`useDockBody.ts:1292-1307`), and every sync of an open dock with no posture change calls `readSeats(!postureChanged && posture)` (`:763`), which carries every seat that moved. The carry RU-101 orders is already there.
- *On growth,* seat#1's new box overlaps seat#2 by about 106 px in the first row, while seat#2 glides away. That overlap is something the owner could see, and no ruling names it.

**Remedy.** Re-rule from the rows, after a frame strip of w-words's growth and shrink. Decide what a seat whose word changes should do. Either:
- its own width tweens (a cure in the seat's box, not the carrier's neighbour carry), with read6's clause kept as it is; or
- read6 exempts the changed seat's own extent and gains a clause that no two seats above 0.1 overlap by more than 0.5 px, which the growth fails today.

Strike the "about 10 lines" from the budget until the cure is named.

## Major

### 3. RU-93: the median hides that the pill, the default shape, still shows more of a dark page at 0.7 than of a light one

**Claim.** "At 0.7 the dark dock hides as much of a busy page as the light dock does" holds for the median over ten dock-postures, not for the pill. The median also mixes in docks where the instrument does not read show-through at all. The restated clause 2 moves from every dock to the median.

**Evidence.** Per-dock show-through from `logs/m8-plate-pm-q10grid.chromium.json`, filtered the way `pm/rule67.py` filters it:
- *The pill folded:* light level 1 reads 0.165. Dark reads 0.230 at 0.85, 0.213 at 0.7 and 0.088 at 0.55.
- *The pill open:* light 0.122. Dark reads 0.147 at 0.7 and 0.064 at 0.55.
- *The other docks.* nav, pager, transport (both postures) and corner-controls first meet "no more than their own light self" at 0.7. The pill meets it only at 0.55, where it still shows about half its light reading. So "the grid is gone" at 0.55 (`RULINGS-8.md:78`) is not true of the pill.
- *Readings that rise as the plate firms,* which show-through cannot do:
  - canvas-tools folded, dark: 0.003 at 1, 0.007 at 0.7, 0.034 at 0.55, 0.046 at 0.4.
  - chrome: 0.013 rising to 0.046.
  - rail: 0 rising to 0.046.

  These three docks read an instrument floor of about 0.04, not the grid. The medians at 0.55 and 0.4 (0.036 for both) sit on that floor.
- *Different sets.* The dark median is over 10 dock-postures and the light default over 12: dials and corner-controls are in the light set only (`pm-rule67.txt`).
- *The old clause read every dock.* RU-67's clause 2 read every dock ("every dark dock's plate against the warm field under 1.70", `pm/rule67.py` header). The restated clause reads the median.

**Remedy.**
- Print the rule per dock.
- Leave out docks whose show-through does not fall as the level firms.
- Compare each dock with its own light reading.
- Make the restated clause per dock over the docks the instrument can read.
- Question 10 should say that at 0.7 the folded pill shows 0.213 of a dark grid against 0.165 of a light one, and about half at 0.55, so the owner picks the rung knowing what the capsule does.

### 4. RU-94's floors are set at the edge of the readings they judge, from one dock, and replace floors that were red

**Claim.** The 1.2 mark floor and the 1.1 hover floors are not derived from what the owner sees. They are fitted to the candidate values, they are calibrated on nav alone, and they replace regression floors that the tip fails.

**Evidence.**
- *The 1.2 mark floor.* The light marks at 10 % are nav's Reports 1.238 and 1.247 (v11.0.2 1.369 and 1.394), dials 1.43 to 1.47, and action-row's Format **1.2** and 1.227 (`MEASURE-8.md:329`). The floor equals the lowest painted light mark. Its stated basis is a seat's look at `strip-ladder-7` (1.195 "reads as a pill"), not the owner's.
- *The 1.1 hover floors.* They sit 0.01 under nav's 5 % reading (1.11 light, `strip-q18-8m`, which I opened). On the tip at 8 % against 10 %, `pm-ink-read.txt` reads hover against current as nav 1.051, action-row's Copy 1.022 and 1.042, and canvas-tools's Layers 1.001. action-row runs 0.01 to 0.03 under nav, so a bound set at nav's margin is likely to fail elsewhere.
- *What the floors replace.* The v11.0.2 per-cell mark floors (10 to 11 under on the tip), and fold 7's hover floor (nav's Home at v11.0.2 1.263 and 1.303 against its ground). Both are red on the tip.

**Remedy.**
- Read action-row, canvas-tools and dials at 5, 6.5 and 8 % before fixing a bound.
- Show the owner the bounds on the question 18 and 21 strips, with more than nav, and let his answer set them.
- Until then, report the restated floors beside v11.0.2's. They do not call G-15 GREEN.

### 5. RU-94's hover rule has no answer in dark on its own record, and its three floors do not compose

**Claim.** In dark on nav at level 1 with the current step at 10 %, neither 5 % nor 6.5 % meets both 1.1 clauses. The mark floor of 1.2 is also below what the two hover floors jointly require.

**Evidence.**
- *The dark readings,* from `strip-q18-8m.chromium` (opened) and `RULINGS-8.md:87`:
  - 5 % stands 1.13 from current and **1.08** from the dock.
  - 6.5 % stands **1.08** from current and 1.14 from the dock.

  RU-94 takes 6.5 % "only while hover against current stays at 1.1", so its rule has no step here.
- *The floors do not compose.* A hover between its ground and the current fill splits their ratio: mark/ground = (mark/hover) × (hover/ground). Two clauses of 1.1 need a mark of at least 1.21 against a floor of 1.2.
- *Question 18's text.* It gives "about 1.1 to 1 … from the dock" as the default in both schemes. Dark reads 1.08.

**Remedy.**
- Rule the order of precedence when the clauses conflict: which gives way, and whether the dark current step may rise to 12 % for it.
- State the mark floor as 1.21 wherever a hover must fit between, or drop one hover clause.
- Correct question 18's dark figure.

### 6. RU-94's instrument asks for a point the icon seat does not have

**Claim.** The ruling says "each fill read at the centre of the seat's painted plate (inside `background-clip: content-box`, clear of the glyph)" (`RULINGS-8.md:93`). At the 0.9 share the glyph's box covers the whole painted plate, so no such point exists.

**Evidence.**
- `icon-button.css` at `575084358` (the RU-58 comment by the glyph rule): "At the 0.9 share it is wider than the seat's content box (36 px in a 40 px seat with 4 px padding) … it is centred over the padding". The painted plate is the 32 px content box (`background-clip: content-box`, same file, `:36-38` comment), so the fill is visible only between a glyph's strokes, at places that differ per glyph.
- ink8 today reads the fill as the border box's modal colour with near-ink pixels masked (`ink8.mjs:14-15`, `:94`, `:136`). The 4 px unpainted padding band then competes for the modal bin. That fits RU-97's hypothesis, and RU-94's clauses inherit the same flaw.

**Remedy.** Read each fill from a second shot with the seat's direct glyph `visibility: hidden` (layout unchanged), as the modal colour of the content box against the ring. This is the twin-shot method the neck reading used. Save each crop. RU-97's no-fill question is then answered by the same reading.

### 7. RU-89's restated G-6 press cell reads one press, not six

**Claim.** The scenario presses Home first, then Read, Search, Library, Marks and Settings. After Home's press the dock folds and never opens again. Under RU-89's cure (fold at the lift) the same happens, so five of the six presses land on a folded dock and the cell has force over Home alone.

**Evidence.**
- `scenarios-m6/p6-press-fine.json` lists the six presses in that order.
- In `rows/pm/p6-press-fine.wi8.chromium.1440-fine-light.rows.json.gz`, the marks `in-read` (1,869 ms), `in-search` (2,708), `in-library` (3,542), `in-marks` (4,377) and `in-settings` (5,215) each snap the dock as `collapsed`. The travel runs 1,610 to 1,982 ms, and the dock is still from there to 6,038.
- `logs/pm-g6-chromium.txt` records "folded rows 592".
- MEASURE-7's 0.01 px read six presses on an open dock.

**Remedy.**
- Move Home's press to the end, or give it its own scenario.
- Make each press mark assert that the dock is open, and void the cell otherwise.
- Then G-6's press cell reads six presses again, and (k2) owns Home's fold.

### 8. RU-104's one-frame fade plant does not witness the 60 Hz part on its own

**Claim.** A fade cut to one frame also fails the fade-length part (at least 66.7 ms). Its bite in WebKit therefore shows nothing that op60 alone sees. op60's own fault, a step inside a fade that is long enough, stays unwitnessed there.

**Evidence.**
- `judge8.mjs`'s header defines RU-70 as op60 0.4 plus a length of at least 66.7 ms.
- `logs/pm-plant-g2-facehalf.txt`:
  - WebKit: op60 0.26 to 0.38, with fades of 43.4 to 47.4 ms.
  - Chromium: op60 0.40 to 0.49, with fades of 41.5 to 47.2 ms, and the rim segment fails at 0.40 exactly. The bite was marginal in Chromium too.
- WebKit samples a row about every 10 ms against Chromium's 7.5: 7 rows against 10 over the same 72 ms gap.

**Remedy.** Plant a fade that lasts at least 66.7 ms and has a one-frame step inside it, for example 1 to 0.85 over 40 ms, 0.85 to 0.25 in one frame, then 0.25 to 0 over 40 ms. Only op60 can fail it. Require it RED in both engines before the 60 Hz part counts as witnessed. Report each engine's sample interval beside op60.

### 9. RU-103 moves the forced read to a frame no clause reads

**Claim.** The landing sample takes the sampler's forced layout out of the two frames after the trigger and puts it at the landing. G-11 reads neither the landing frame nor the frames right after it. "Reads a clean layout" is a hypothesis.

**Evidence.**
- `cost8.mjs:7-9`: the clause reads the trigger frame and the two frames after it.
- `:65-74` and `:127-143`: the rest check starts 1,300 ms after the fold.
- The travel is reported only by its median (verify-8, "one layout a frame").
- The landing comes about 370 to 410 ms after a trigger (the segment lengths in `pm-plant-g2-facehalf.txt`), so it falls in neither window.
- The batched sample runs in the next frame's callback (`useGlassBackdropLuminance.ts:124-147`). Whether another dock or the carrier writes in that frame is unread.

**Remedy.** G-11 also reads the landing frame and the two frames after it: no Layout under a script stack. Read the morphing-gate plant there too. It should return the sampler's layouts to the frames after the trigger and leave the landing clean.

### 10. RU-108's byte arithmetic mixes releases and borrows a figure line 1 set aside

**Claim.** "The redesign's own cost, which H8 read as 1,013 B" and "the other 1,600 B or so is the 11.1.0 code" do not follow from the readings. "Can be met only by removing 11.1.0's published code" is not shown.

**Evidence.**
- *The base predates 11.0.2.* `git merge-base --is-ancestor v11.0.2 99a1389e6` is false. `99a1389e6..v11.0.2` changes `src/components/dock` by +211 −71 lines (14 commits across the dock and the glass composables). So H8's 1,013 B is the redesign's cost less 11.0.2's own fixture growth over the base, and S1's 1,615 B carries 11.0.2's dock code as well as 11.1.0's.
- *The 1.6 KB figure.* It is value.js's figure for 11.1.0's *entry* (`INPUT-first-load-size-2026-11-15.md:3`). ORCH-LINES-7 line 1 set the entry aside as a measure: "what the build emits, not what a site pays".
- *v11.1.0's fixture is unread* (`RULINGS-8.md:390`).
- *Bytes are fungible.* The bound could also be met by a carrier smaller than its net cost. The reading shows only that the redesign would have to be net-negative.
- *The value.js draft* (`:515`) states "About 1.6 KB of that is 11.1.0's own growth" as fact.

**Remedy.**
- Read v11.1.0's fixture (H8) before the orchestrator is asked.
- Ask with tip minus v11.1.0 as the redesign's own growth.
- Restate the reason as "met only by making the redesign net-negative in bytes".
- Take the 1.6 KB attribution out of the value.js message until it is read.

### 11. RU-109's projection leaves out the merge RU-90 orders and the cures it did not estimate

**Claim.** The ninth tree is projected at about 5,220 against a fixed ceiling of 5,246, which leaves 26 lines. The projection leaves out:
- the `release/11.1.1` merge that RU-90 puts before the measure;
- RU-89's press gate;
- RU-106's inline-size rule;
- RU-103's DockLayer read;
- the idle-fold writer;
- study G16's Escape fold (which "arrives with RU-90's merge").

The fixed ceiling also counts published 11.1.x code against the redesign, while RU-108 exempts published code from G-16.

**Evidence.**
- `git diff --stat v11.1.0 release/11.1.1 -- src/components/dock` reads +64 −14 over six files (DockControl.vue, icon-button.css, tab-button.css, triggers.css, layers.css and run.css: four reduced-motion dock fixes; branch tip `ce5f320b7`, 2026-11-22). A rough count that skips comment lines gives +47 −9.
- The projection is at `RULINGS-8.md:384-386`, and RU-109 (1) states the ceiling.
- The removals check against the source: 45 + 3 + 18 + 1 = 67, with `useDockState.ts:470-491` and `shell.css`/`density.css` in the directory. The additions check too: the itemised list sums to 39. The arithmetic is right as far as it goes; the fault is what it leaves out.

**Remedy.**
- Set the ceiling at 5,246 plus the code lines M0's merge carries, each named in MEASURE-9, as G-16 treats published code.
- Project every listed cure. If the total is over, name the removal that pays for it.

### 12. "The reading that shows 4,741 cannot hold" reads a quarter of the carrier

**Claim.** RU-109 tells the orchestrator that a reading shows 4,741 cannot hold without removing a behaviour (`RULINGS-8.md:219`, `:233`, `:408`). The reading covers 344 of `useDockBody.ts`'s 1,094 code lines.

**Evidence.**
- `MEASURE-8.md:601`: "These rows hold 344 of the file's 1,094 code lines". The other 750 were never read for a smaller form, and the other files' growth is described rather than audited (`:603-614`).
- ORCH-LINES-7 line 2: "neither does a bound that moves when the code grows".

**Remedy.** Either present this to the orchestrator as a hypothesis, or read the 750 unlisted lines for code that could be shorter with no behaviour change (repeated reads, branches no cell reaches, code that only restates a comment). Give that line count before he is asked to move a bound he wrote to stay fixed.

### 13. The mount-frame cure's witness reads only the mount task, and the atlas line claims a cost nobody read

**Claim.** The atlas draft says "a page that mounts many docks pays for that once, in that frame" (`RULINGS-8.md:428`). That is unread, and probably false without a batch.

**Evidence.**
- Each dock's first sync reads its root (`rectOf`) and then writes on it: `writeFit`'s flags, `--dock-expand-t` (`useDockBody.ts:1058-1062`) and RU-35's outputs (`:675-687`).
- Under ORCH line 5's cure, each dock's sync runs in its own `requestAnimationFrame` callback. On a page of N docks, every read after another dock's write can force style and layout.
- The sampler batches its reads before its writes for this very reason (`useGlassBackdropLuminance.ts:124-136`).
- ORCH line 5's witness reads the mount task only.

**Remedy.**
- The O-418 cell counts forced layouts in the first frame on a page of many docks (atlas's figure page, or ten docks on one page).
- If the count is more than one, the mount syncs share one frame batch: reads, then writes.
- The atlas line states what was read.

## Minor

### 14. RU-93 cites WebKit for line 3 while ruling WebKit's show-through not decisive

`RULINGS-8.md:77` says 0.7 is "line 3's answer in both engines (0.580 against 0.729)". `:79` rules that Playwright WebKit draws the plate unblurred, so its show-through is never decisive. Both cannot stand. **Remedy:** say that line 3's WebKit leg cannot be read in Playwright WebKit and is owed to the owner's Safari look, and drop the agreement claim.

### 15. RU-90's coarse skip of `:1100` and `:1126` rests on RU-43 without a reading on the spec's page

The rail (`rail-harness.ts`: `collapse: "closed"`, `expandOn: "press"`, no `#collapsed`) reads 0 morph frames on coarse touch. "It rests open" is one cause. A `collapse()` refused for another reason gives the same 0. **Remedy:** before the skip, read the rail's rest posture on that page under coarse touch (its class), so the skip's stated reason is a reading.

### 16. RU-92's restated light-fill test needs literal values and a plant

"The hovered seat's computed fill equals the dock's hover step" is circular if it compares against the token's own computed value. RU-92 also names no plant for this restated line, though the ready list asks "each restated line with its equal-force plant read" (`RULINGS-8.md:344`). **Remedy:** compare with literal values per scheme (5 % and the ruled current step of the dock's ink, as colours). Add a plant (the hover token moved to 8 %) that must turn it RED.

### 17. RU-104's new G-9 clause borrows op60's bound without its length clause

"`--dock-expand-t` moves no more than two fifths in any 60 Hz window" (`RULINGS-8.md:168`) catches the step g9-scope plants. A progress that lands in three frames still passes, and the plate's ink lerps on it. RU-70 pairs op60 with a length. **Remedy:** pair the clause with RU-70's length form (0.02 to 0.98 takes at least 66.7 ms, or follows the plate's own travel fraction within a stated tolerance), and add a plant that compresses the progress to three frames.

### 18. RU-110's five runs of D-1 cannot outvote a red frame

Five greens leave a 20 % failure rate at 0.8⁵ = 0.33 odds of being missed. The failing frame is in `logs/pm-g14-tip-webkit-release-10-1-3.log:66-77` ("frames whose summary glyph paints outside the plate", 1). **Remedy:** read that frame's numbers for a cause first. Either run it 20 times, or treat any red frame as a fault.

### 19. The ready list scores G-15's words as GREEN-or-nothing on a ground the shipped dock also fails

On the warm figure page in dark, today's 11.0.2 dock reads Reports' words at 3.26 (`strip-q21-8m.chromium`). The tip reads 3.27 at level 1 and 3.75 at 0.85 (`MEASURE-8.md:462`). RU-93 sends a red at 0.7 to question 21's default, but the ready list asks G-15 "GREEN … words 4.5 on every seat". **Remedy:** the ready list says how a red words cell on that ground is scored (named under question 21's default), so the build seat can tell READY from not.

### 20. RU-91's one-row capsule holds only where the painted cross extent equals the token's

The cap is `--dock-cross / 2` from tokens (`run.css:629`, `:636`), and the carrier takes `min(pw / 2, ph / 2, cap)` (`useDockBody.ts:957-960`). A one-row dock whose content is taller than `--dock-layer-height` rests as a rounded rectangle with short flat ends. That includes a host's `--dock-tab-h` above the control size, which RU-98 keeps for Home Assistant and speedtest. The witness reads only token-sized cells. **Remedy:** add a cell with `--dock-tab-h` above the control size and read its corner as half its painted cross extent, or record that a host's taller row is not a capsule.

## Dropped on the second reading

- **RU-89's cause (a fold under a held press).** The scenario holds the button from `press-home` (1,311 ms) through a 250 ms wait and a 100 ms move, and the fold begins at 1,610 ms, with the button down. The cause stands.
- **RU-95 as a cure built on a hypothesis.** On the same dark warm ground and the same 10 % step, nav's Reports stands 1.23 off the dock (`strip-q21-8m.chromium`). A segment drawn as a seat on the plate has a reading to stand on.
- **RU-106's shrink-to-fit reading.** The arithmetic holds (44 − 16 − 28 = 0, and 44 − 16 − 68 = −40). `density.css:296-329` sets only the corner insets, and the cure waits on H6's reading.
- **RU-103's gate target.** GlassDock passes its root (`dockEl`, which carries `data-morphing`) to the sampler, so the gate is placeable as ruled.
- **RU-90's O-288 restatement.** The restated test still compares each item against the plate's box after the ancestor clips, and the g2-nocut plant must turn it RED first. Equal force is asked for before it counts.
- **RU-108's restated bound itself.** Bounding 11.2.0 by v11.1.0's fixture is principled. Objection 10 is about the arithmetic and the attribution only.
- **(k2)'s one-frame bound.** I found no reading of slippage at the recorded loads (up to 28.7).
- **RU-91's 110 corner tests.** Master paints from the same `--dock-cap-rest`, which `run.css:636` defines on `.glass-dock`, so the cure applies to every dock.
