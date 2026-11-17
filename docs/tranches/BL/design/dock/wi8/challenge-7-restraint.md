# Challenge to RULINGS-7: the owner's eye and restraint

2026-11-17. Challenger seat, claude-opus-5-5, in the seat written for Fable (out of quota until 2026-11-21; the owner's standing ruling puts critique seats on Opus until then). I wrote none of the rulings, the build, the measurements or the verification. I ran no browser and no build, changed no source and staged nothing.

**Read.** In full: `docs/precepts/restraint.md`, `RULINGS-7.md`, `MEASURE-7.md`, `verify-7.md`, `RULINGS-6.md`, `ORCH-LINES-6.md`, `OWNER-READ.md`, `challenge-6-restraint.md`; `INPUT-plate-opacity`, `INPUT-hover-shift`, `INPUT-gregg`; `motion-canon.md` P0a. Strips opened: both engines of `strip-ladder-7` (with crops of its dark and light open columns), `strip-hover3-7.chromium`, `strip-glyph3-7.chromium`, `strip-fold-7`, `strip-legend-7.chromium`, `strip-transport-7.chromium`, `crop-many-7`. The owner's frames `f1`, `f4`, `f5`, `f8` and `owner-frame-120.png`. On `bl/dock/wi8` (src at `943fe6e9d`), read only: `dock.css:196-235`, `morph.css:280-400`, `ControlsDock.vue`, `GlassDock.vue:440-520`, `tokens/glass.css:120-170`, `glass/a11y-fallback.css:15-50`, `adaptive-legibility.css:70-115`, the import order in `styles/index.css` and `dock/styles/index.css`, the `#collapsed` slots in `m6/comp` and `m7/comp`. Logs: every `m7-ink-base1102.*`, `m7-ink-laddertoday*` and `m7-ink-ladder*` file, which I tabulated per cell, ground, scheme and posture. The numbers below are the logs'; the tabulation is mine.

**What is a reading.** *Record* quotes a log. *Source* quotes code. *Pixels* is my look at a strip. *Arithmetic* is mine, on recorded numbers, and is a hypothesis until read.

## What survives

Nine objections: none blocking, four major, five minor. RU-66, RU-69 to RU-75, RU-77, RU-79 to RU-82 and RU-85 add nothing a reader of the dock meets, or remove something, and stand under this lens. RU-79 (the media query goes), RU-80 (the fit memory goes on a reading), RU-78's three removals, and RU-68's full trigger ink and hover inside P0a's range are cures that remove, as the precept asks.

### 1. RU-67: one level serves the ruling's own aim, and the per-scheme pick overshoots it. Major.

The aim, in RU-67's reason and in question 10: the dark dock firms up "a bit" and "stands off the page about as clearly as the light dock does", and the light dock keeps its glass. The ruling's own instrument shows one level, 0.85, does that. Its pick does not.

*Record*, plate against field, open, Chromium at 1440, the field ground (`m7-ink-base1102`, `-ladder085`, `-ladder1`, `-ladder07`):

| cell | today light / dark | 0.85 light / dark | RU-67: 1 light / 0.7 dark |
|---|---|---|---|
| nav | 1.202 / 1.018 | 1.188 / 1.198 | 1.297 / 1.396 |
| pager | 1.202 / 1.018 | 1.187 / 1.198 | 1.297 / 1.396 |
| corner-controls | 1.206 / 1.018 | 1.188 / 1.198 | 1.297 / 1.397 |
| transport | 1.202 / 1.017 | 1.188 / 1.199 | 1.297 / 1.398 |
| dials | 1.195 / 1.044 | 1.176 / 1.152 | 1.278 / 1.334 |
| chrome | 1.192 / 1.033 | 1.159 / 1.165 | 1.278 / 1.336 |
| rail | 1.190 / 1.039 | 1.166 / 1.171 | 1.286 / 1.331 |
| canvas-tools | 1.196 / 1.036 | 1.176 / 1.162 | 1.296 / 1.354 |

- At 0.85 the dark plate stands off its field within 0.024 of the light plate on these eight cells; action-row and figure-tools differ at every rung. The light plate is within 0.02 to 0.03 of today's, and 0.02 is RU-69's own tolerance for "the same plate". "One number cannot serve both" does not hold on these readings.
- At the pick, dark stands off more than light on every one of these cells, by 0.045 to 0.10 in Chromium. In WebKit the gap is wider: nav dark at 0.7 reads 1.624 against light at level 1 1.292 (`m7-ink-ladder07.webkit.json`), 0.08 under the 1.70 line RU-57 drew for the near-opaque slab. RU-67 calls WebKit's 0.7 at 1440 "unread"; it is unread on dials only, and reads 1.416 to 1.624 on nav, chrome, rail and figure-tools.
- WebKit's dark plate today already stands off as far as its light one (nav 1.225 against 1.198). Taking the rung that clears the threshold "in both engines" lets Chromium's need set the level, and WebKit pays twice.
- The threshold that rejects 0.85 is 1.27, level 1's light reading: "the light plate he did not call too transparent, one step firmer". That step is an addition in light. His "too transparent" frames are all dark (RU-67's own reading), and `INPUT-plate-opacity` names the pager dock and daraksha's, both dark.
- The light half adds ink on a plain page. *Record*, flat ground, both engines: today's light plate (230,229,225) on (251,250,248) reads 1.208; level 1 reads (223,220,216), 1.31. That is a greyer slab on every plain light page, against "No grey or muted surfaces" (restraint.md, Shading). "Only level 1 stands off more than v11.0.2 in light" is a field-only reading: on the flat ground 0.85 (1.27) and 0.7 (1.211) also stand off at or above today's 1.208.
- The split adds `.dark .glass-dock` at (0,2,0), the same specificity as the reduced-transparency and more-contrast brackets (`:root .glass-dock`, `a11y-fallback.css:20-25`, `:38-42`) and the static arm (`adaptive-legibility.css:80`), so RU-67's witness has to show the brackets still win. One level on `.glass-dock` (0,1,0), written where `0.4` is now (`dock.css:218-220`), creates none of those ties.

*Its cost, stated.* Any level under 1 mixes a site's own tier toward `--card` (RU-57, C-6): at 0.85 gregg's, speedtest's and slides's tiers flatten 15 % in light, where the pick leaves light alone and flattens 30 % in dark. RU-83's wash-tier dock shows it in both schemes.

*Remedy.* Default one level, 0.85, in both schemes, in place of the 0.4 line, with no dark arm. The strip keeps 1 and 0.7 as rows the owner can pick (question 10). Dark moves to 0.7 only on a reading that needs it: no dark fill step at 0.85 holds every current and pressed seat's words at 4.5 (RU-68), named with its cell. Question 10 and the messages say what that default does: a little firmer in dark, light as today over a busy ground and a little firmer on a plain page.

### 2. RU-67 and RU-83: the ground of the owner's direct complaint is missing from the ruling and the strip, and the claim made to him fails there. Major.

- His direct words were said of the demo's pager dock (`INPUT-plate-opacity`: "why is this dock so transparent"), which is `f8`: a near-black page with a grid and card text, the grid lines running through the plate. `f1` and `f4` are flat dark grounds too, and `owner-frame-120.png` is daraksha's dark ornamented ground. Only `f5` is a warm field like the dials page.
- `INPUT-plate-opacity` asked for the strip "over a patterned ground and over a flat one". RU-67 rules on the dials field alone, and RU-83's Q10 strip is the dials field plus daraksha's ground and a wash-tier dock.
- `ink7` already reads a flat ground on every cell. *Record*, the pager on the flat dark ground, Chromium: today 1.014, 0.85 1.047, 0.7 1.085, and 0.4 (the withdrawn slab) 1.203. The light plate on the flat ground reads 1.31 at level 1. "So it stands off the page about as clearly as the light dock does" (question 10; the message to atlas says the same) fails on the ground he complained on, at every rung.
- A ratio of the plate's colour to the field's cannot see what `f8` shows, lines and words through the plate. A frame can.

*Remedy.* No new gate. In RU-83's Q10 strip, replace the 390 columns with the pager dock on the flat dark grid, card text under the plate, both schemes, every rung. The 390 columns do not inform a choice of firmness: on nav, chrome and transport their plate readings equal 1440's within 0.01 at every rung (nav dark at 0.7: 1.396 and 1.395), and on no cell does a 390 reading reorder the rungs. The 390 readings stay in the record. Strike "about as clearly as the light dock does" from question 10 and the atlas message, or state it per ground.

### 3. RU-68: the hover clause can lift the current mark above its floor, which puts the light mark back above shipped. Major.

- The rule, per scheme: "the weakest current step whose every current and pressed seat's words read 4.5 and whose marks meet the floor, with the weakest hover that reads 1.2 against current at a fine pointer". Hover is held to P0a's 5 to 8 %. The rule does not say what yields when no hover in that range reads 1.2 against the weakest current step that meets the floor.
- *Record*: at hover 10 % and current 20 %, a 10-point gap, the least hover-against-current reading is 1.253 in Chromium and 1.264 in WebKit (MEASURE-7, G-15). The light grid's weakest pair, current 12 % and hover 5 %, is a 7-point gap. *Arithmetic*, a gamma-2.2 mix on the dials track (it returns 1.247 for the recorded 20/10 pair): 12/5 reads about 1.16, 14/5 about 1.21.
- G-15 is GREEN only at 1.2 or the owner's pick (the ready list), and question 18's default is "the middle one". With hover pinned by P0a, the lever left is a heavier current step. *Record*: at 20 % the light marks read 1.787 and 2.067 against shipped 1.374 and 1.381. RU-68's own reason ("in light it is heavier than the owner has now ('NO overuse of shading')") is then not met: the hover's separation buys the weight back.

*Remedy.* State the order. The current step is set by the words and the mark's floor alone; the hover takes the weakest step in P0a's range, 5 %, which gives the most separation. If that pair reads under 1.2, the Q18 strip shows it and the owner decides; the current step is not raised for the hover. The ready list's hover clause reads "1.2, or the separation at the floor-set pair until the owner picks".

### 4. RU-84: the prototype already covers a link, which RULINGS-6 made the owner's stop, and question 14's fallback adds a second plate. Major.

- *Record* (MEASURE-7, RU-61): on atlas's head row, "1,872 px² of the legend and its link under the plate". The plate takes pointer events (*Source*, `dock.css:208-213`: the root takes none, "the plate ... and the control run do"), and the dock lingers 3 to 6 s after the pointer leaves (OWNER-READ). For that time the legend's link cannot be pressed.
- RULINGS-6 (RU-61, C6-M7): "If words show through words, or a control is covered, that is the owner's (question 14) before RU-61 joins the pass." RU-84's three named faults (the legend's 28 px, the 4 px, the extra layout) leave the covered link out, and its join condition has the cover strip "seen", not answered.
- Question 14 is carried unamended ("Questions 12 to 18 keep RULINGS-6's text unless amended here"), with the default "if legend words show through the dock's words, the in-flow dock takes a firmer plate". That is a second plate level chosen by where a dock sits, against "One variant per job" (restraint.md, Controls and layout). With RU-67 putting light at level 1, the most see-through rung, the fallback is likeliest to fire in light.
- What the owner would meet on atlas with the prototype: the Table seat moves 132 px (68 before) and the legend 28 px. RU-84 is right that the first is RU-61's C-3 amendment working as written; he still sees the seat under his pointer move twice as far, on the site his O-366 most likely came from (INPUT-hover-shift).

*Remedy.* RU-84 names the covered link as a fault and as question 14's trigger, and RU-61 joins only on his answer. Question 14's fallback becomes one of: the plate grows away from the legend (an `anchor` the site sets), the reserve, or no overlay in 11.2.0. No in-flow plate level.

### 5. RU-68: the fill grid writes two steps before a reading shows two are needed. Minor.

- Light candidates are 12, 14 and 16 %; dark 10, 12 and 14 %. Both schemes move the current step the same way, down from 20 %: light to bring the mark toward shipped, dark to give the current seat's words room. 12 and 14 % sit in both grids.
- The dark arm (`.dark .glass-dock` with its own fill lines) is written before the reading.

*Remedy.* Read the union, 10 to 16 %, in both schemes. Take one step if one holds both schemes' floors and words; write a dark arm only if none does, with the failing reading named.

### 6. RU-68: hover comes into P0a, and press keeps an offset four times P0a's. Minor.

- "Press keeps its built offset above current": 28 % against 20 % (`dock.css:230`), eight points of ink above current. On a seat that is not current, at RU-68's own steps, that is about fifteen points from hover to press.
- P0a (`motion-canon.md:68`): "a press | 2 % of colour, or a scale no deeper than 0.96". The dock already presses at `--scale-press: 0.96` (`scale-paper.css:10`, `controls.css:73`).

*Remedy.* The press fill is the seat's own fill plus 2 % of ink, or no fill step, since the scale carries the press. That is one less number to tune per scheme.

### 7. RU-78: `controlCount` moves behind a new channel to win a name the bound does not need. Minor.

- The ruling's own table: without `pinned`, `update:pinned` and `data-dock-scope` the count is 79, under "fewer than 80". Moving `controlCount` makes it 78.
- The move adds an injection key that `ControlsDock` provides and every `GlassDock` injects and writes into. `ControlsDock` is the only reader (`ControlsDock.vue:53`, `:59`), today through the template ref it already holds. A `GlassDock` mounted anywhere inside a `ControlsDock`'s subtree would also inject the key and write its count.
- "A seat that adds a piece states what it removes, and the removal outweighs the addition" (restraint.md, The ceiling). The removal is a name no site reads; the addition is code in the general component for one preset.

*Remedy.* Keep the expose: 79, or 78 if `#rim` goes. If the name must go anyway, the budget reports the lines the key adds to `GlassDock` beside the name it saves.

### 8. RU-76: a composed folded face loses its size class and gains no rule. Minor.

- RU-76 sizes "the folded face's direct glyph" and has glass's compositions "drop `h-4 w-4` on every `#collapsed` glyph".
- `canvas-tools`'s folded face is `<span class="canvas-face"><PenTool class="h-4 w-4" /><StatusDot … /></span>` (*Source*, `m6/comp/canvas-tools.stage.vue:33-35`). The glyph is not the face's direct child, so once its class goes it renders at lucide's 24 px, a size no ruling chose (RU-55's words about k3), between the 16 px floor and the share's 39.6.
- The 1 rem floor (`morph.css:305-310`) reaches descendants; the share reaches the direct child only.

*Remedy.* Drop the class only where the glyph is the face's direct child. A composed face keeps its size, or its glyph becomes a direct child. G-13's folded-face line lists the faces it reads.

### 9. RU-83: two strip choices that make questions 10 and 18 harder to read. Minor.

- *Q10.* Folded frames come "from a composition that folds (nav or the pill)" while the open frames stay on dials, so each row sets two different docks side by side. The owner reads a level down the rows and a posture across the columns, and here a column also changes the dock. The labels print the ratio to three decimals ("1.009:1") in type about 8 px tall (*Pixels*, `strip-ladder-7`), against his "too many digits of signif" (C-10).
- *Q18.* "Plus the build's own step": the build's hover is 10 %, which RU-68 rules out as over P0a's 8 %. Offering it invites a pick the ruling has already removed.

*Remedy.* Q10 on one composition that folds, both postures; the plate reading to two decimals. Q18 shows the three solved steps inside P0a's range; the build's 10 % appears, if at all, as a labelled reference beside them.

## Dropped on the second reading

- *RU-67's light level 1 flips the plate's polarity.* Dropped: v11.0.2's light plate is darker than its field too, (232,183,162) on (247,201,183) (`m7-ink-base1102.chromium.json`).
- *RU-75 adds padding round words.* Dropped: the labelled icon seat reads 32.78 px at 390, under the touch floor, and the extent is RU-55's invariant, not a new piece.
- *RU-76 puts a seat-sized glyph in the folded circle.* Dropped: at the share the folded glyph equals an open seat's (39.6 px in 44), so the fold stops changing the glyph's size across "out, then in" (`strip-fold-7`: 36 px glyphs, then a 16 px book), and "our icons sohuld be 2x bigger ... Show them more" names it.
- *RU-72's dialog linger is a second mode.* Dropped: it adds no code, question 19 sets both rules side by side for the owner, and no owner word goes either way.
- *RU-78 keeps `#rim`.* Dropped: gregg and fourier draw a progress rim beside the dock today, the slot replaces their radius code, and progress is something the owner asks a dock to show.
- *RU-69 reads a token that "decides nothing".* Dropped: the reading says whether today's light rung is one token away, which bears on objection 1.
- *RU-70 loosens the fade floor to 66.7 ms.* Dropped under this lens: the clause is P0a's own check (`motion-canon.md:102-104`), and 2 ms is not visible. Whether "five frames" means four intervals is the measurement lens's.
- *RU-66 cuts struck-history comments first to meet the line bound.* Dropped: history kept in code is what the owner's no-legacy rule removes anyway, and the code-only count is reported beside it.

## What the owner would see

- *The ladder (Q10).* In dark, Chromium: level 1 and the "today" row are the same faint capsule; 0.85 shows its edge; 0.7 is a clear darker-brown capsule; 0.55 and 0.4 are slabs. In WebKit every rung is a step firmer: today's dark plate is already defined, and 0.7 sits close to 0.55. In light, level 1 is a tan capsule darker than the field with heavy brown marks on 5Y and Lin; 0.7 and 0.55 nearly vanish; 0.4 is a cream capsule lighter than the field. None of it is on the near-black grid where he asked the question.
- *Hover against current (Q18).* At "near" two tabs look selected in both schemes; "far" reads as a hover beside a selection. Nothing ornamental.
- *Glyphs (Q17).* At 0.9 the sun and the magnifier outweigh the words beside them; at 1.5 em they sit with the words. In the tab row each glyph touches its word, and two are grey dots.
- *The fold.* The run's 36 px glyphs fade under the closing edge and a 16 px book fades in; RU-76 makes it a seat-sized book.
- *Many seats.* Two grey initials discs end the run at about two thirds of the icons' size; RU-76 grows them to the share, so two larger grey discs.
- *atlas's head row.* On this build the open dock pushes the legend about 36 px and covers none of it; the folded sliders glyph stays small beside the Table glyph, by atlas's own size class.
