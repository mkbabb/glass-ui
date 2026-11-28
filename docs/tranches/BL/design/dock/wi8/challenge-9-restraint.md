# Challenge to RULINGS-9: the owner's eye and restraint

2026-11-27. Challenger seat, claude-opus-5-5 (asserted from my own system identity), in the seat written for Fable; the owner's order of 2026-11-19 ("No fable usage for now") puts every seat on Opus. I wrote none of the rulings, the build, the measures or the verification. I ran no browser and no build, changed no source and staged nothing. I enlarged two crops of one strip with ImageMagick in the session scratchpad; nothing else ran.

**Read.** In full: `docs/precepts/restraint.md`, `RULINGS-9.md`, `verify-9.md`, `challenge-8-restraint.md`. MEASURE-9's top line, H3 (`:131-157`), M's corner line (`:518`), the atlas head-row cell (`:828-839`) and G-4's row (`:805`). `ORCH-LINES-8.md:27-33`. `OWNER-READ.md:13`, `:74-76`, `:101`, `:149-154`, `:170`. BM: `study/DESIGN.md` §5.3 (`:151-164`), §6.2, §7.1 (`:229-239`), §7.4's reduced-motion line (`:277`) and §9; `study/choices/CHOICES.md` choices 1, 2, 5, 8, 34, 35, 36 to 45 and 51, and the conflicts list. `audit/INBOUND.md` O-422 and O-433. Strips opened, every `-9m` one: `strip-q5`, `strip-q10-{grid,field}`, `strip-q12-names`, `strip-q14`, `strip-q18` (two rows cropped and enlarged), `strip-q19`, `strip-q20` in both engines, `strip-q21`; also `crop-tall.png`, `crop-tall-3.png` and `owner-frame-120.png`. On `bl/dock/wi8` at `254b3f501` (src at `a5a4fe546`), read only: `GlassDock.vue:60-100`, `:577`; `styles/density.css:70-90`, `:270-315`; `styles/shell.css:300-320`; `styles/morph.css:130-185`; `styles/run.css:615-660`, `:541-574`; `styles/dock.css:255-290`; the harness page `dock-wi8.vue:10-25`, `:405-415`, `:448`; `measure/harness/m9/corner9.mjs`; `measure/harness/m7/names.mjs:1-30`; `measure/logs/m9m-corner9-chromium.txt`, `m9m-names.txt`. On the main checkout with `git show`: v11.1.0's `run.css:675-700` and its `GlassDock.vue` collapsed slot. keyframes.js, read only: `TransportDock.vue:1-34`, `AnimationControlsGroup.vue:95-130`.

**What is a reading.** *Record* quotes a log, a strip label or a document. *Source* quotes code. *Pixels* is my look at a strip, or an enlarged crop. *Arithmetic* is mine, on recorded or source numbers. *Hypothesis* has no reading behind it.

## What survives

Six objections: none blocking, three major, three minor.

Under this lens these stand:

- **The removals:** RU-125 (a lens goes), RU-128 (a measure and an observer go inside a dock), RU-130 (shorter forms, two conditional reverts, and nothing a person asked for goes), RU-139 (four pixels of end padding go), RU-140 (the face's computed padding goes) and RU-143 (the backward step after the landing goes).
- **Rulings that hold or defer:** RU-133, RU-134 (the owner asked for a bigger toggle, C-89, and a coloured one, O-428), RU-135, RU-136 and RU-137.
- **Records and the harness:** RU-123, RU-124, RU-127, RU-129, RU-131, RU-138, RU-144 to RU-146, RU-148 to RU-160 and RU-162 to RU-166.

### 1. RU-126 and question 25: a tall-dock mode with no stated test, a misquoted record, and a strip that shows no tall dock. Major.

- **The mode.** RU-126 splits the rest corner in two: "One row: the carrier writes the measured cross at rest … Taller than one row (w-tall, w-xf, any face of two lines or more): the one-row cap from the tokens" (`RULINGS-9.md:49-53`). The carrier needs a test to tell the two apart, and the ruling never says what that test reads. *Source*: v11.1.0 had one rule for every pill, `--dock-cross: var(--dock-plate-cross-px, …)` (v11.1.0 `run.css:691-694`). The ninth tip also has one rule, the token cross (`run.css:629`, `:636`). RU-126 keeps both rules and adds a choice between them. It states nothing it removes.
- **The record is misquoted.** RU-126: "w-xf's faces hold two to four lines, so corner9 classes it among the docks taller than one row." *Record* (`logs/m9m-corner9-chromium.txt:6`) says the reverse: `p3-swap-xf-fine … one row -> FAIL (open corner 28 px, half the cross extent 41.23 px)`. The same log classes w-tallrow, which RU-126 puts on the one-row side, as `taller than one row` (`:9`). MEASURE-9 agrees with the log: "It is one row, 82.47 px tall" (`MEASURE-9.md:153`), and "Two one-row docks are short of a capsule … p9-tallrow … and the crossfade cell" (`:518`).
- **What corner9's test actually reads.** *Source* (`corner9.mjs:28`): `oneRow` means the open cross equals the folded cross within 1 px. That is a fact about the cell, not a design rule. The always-open crossfade passes it, and a tall row that folds to 56 fails it. So the only classifier written so far puts both of RU-126's cells on the other side.
- **The split matches H3, cell by cell.** *Record* (H3, `MEASURE-9.md:155`): the measured cross "rests w-tallrow at 32 and the crossfade at 41.23 … and fails the outline clause … 8.14 on the crossfade". RU-126 puts w-tallrow on the measured side and the crossfade on the token side, which is the one split under which both cells pass. A rule chosen per cell is the overfitting the owner named on 2026-07-13 ("contrived and overfit").
- **The strip.** Question 25 says: "The build gives a taller dock the corner a one-row dock has, which is what the strip shows. Default: the one-row corner, as the strip shows" (`:454`). RU-126 says "as its strip showed it" (`:55`). Choice 37's strip is `strip-q5-9m.chromium` (`CHOICES.md:673`). *Pixels*: it shows a card, a rounded and a pill dock, each 56 px tall, folded and open, and no dock taller than one row. The only tall dock the owner has been shown is `crop-tall.png`, under question 5 (`OWNER-READ.md:74-76`): a two-row dock as a stadium, its top switcher seat past the curve.
- **His words point the other way.** He wrote "docks should almost always be rounded" and "Rounded." (2026-11-09). His own page read "Rounded." as the stadium: "Rounded, always. The dock is a full stadium" (`OWNER-READ.md:13`), and "Your 'Rounded.' makes it a full stadium" (`:74`). The ratified text "keeps 11.1.0's rounded rectangle" names a form 11.1.0 never had, as RU-126 itself finds.

*Remedy.*

- RU-126 states its one-row test in terms of what the carrier measures, in one sentence, before S3 builds it. Every tall cell (w-tall, w-tallrow, the crossfade at each of its faces, `:336`'s input layer) is then classed by that sentence, never by hand.
- If that sentence puts the crossfade on the measured side, its 8.14 px outline reading is printed as a failure. It is not avoided by naming the cell taller.
- The "corner9 classes it" sentence is struck.
- Question 25 drops "as the strip shows". It carries a strip of w-tall and the crossfade at a two-line face in both forms: the stadium with its content padded in, and the one-row corner. It also names his "Rounded." beside the corrected 11.1.0 fact. The default can stay; the reasons given for it change.

### 2. RU-132 and question 23: the hover is defended by a mark that does not exist, and by a reading that says the opposite. Major.

- **The mark.** RU-132: "*Pixels*: in `strip-q18-9m.chromium` the current seat also carries its mark, which no hovered seat has" (`:99`). Question 23 tells the owner: "The current page also keeps its mark, which a hover never has" (`:452`). *Source* (`run.css:541-574` at `a5a4fe546`): the run mark is the current seat's highlight itself. It is one plate painted `background: var(--dock-control-active-bg)`, and "the seat it marks paints no selected plate of its own … so the run shows one shape". The hover paints a plate of the same shape at `--dock-control-hover-bg` (`dock.css:267-268`). Neither state has any second sign.
- **What the strip shows.** *Pixels* (q18's 6.5 % rows, enlarged): in light, hovered Home and current Reports are two pills of the same size and corner, one shade apart, with words of the same weight and colour. In dark it is the same. Nothing marks Reports as the page you are on except that it is a little darker.
- **The 1.002.** Question 23 says: "The design study's reason … is that a hover is lighter than the current page by strength, not a different look; on a patterned page in light the two stand only 1.002 apart." *Record* (MEASURE-9 item 8): "hover against current from 1.002 (Chromium, nav on the grid in light)". A ratio of 1.002 means that on that ground the hover and the current page cannot be told apart. That is the strongest support for verify-9's "nearly reads as a second current page", not for the default. BM §6.2 reason 3 says only that hover against current "reads 1.0 to 1.2".
- **The precedent.** Restraint holds that a question resting on a misread is worse than none: RU-107's reason, which challenge-8 objection 5 applied. Question 23 has both a false fact and a misread number, and both lean toward the default.

*Remedy.*

- Strike the mark sentence from RU-132 and from question 23.
- Question 23 says: the hovered page and the current page are the same pill, the hover a shade lighter, from 1.002 apart (the grid page in light, where they match) to about 1.2. It shows the strip's 5 % row in light beside the 6.5 % row, with 5 %'s 1.11 from current and its 1.098 against the dock on canvas-tools.
- The default stays as ratified.

### 3. RU-142: three page-level tokens for a reservation that a literal already meets. Major.

- **What it adds.** Three `:root` custom properties: `--dock-controls-inset`, `--dock-controls-size` and `--dock-controls-edge`. The preset's three lines read them (`density.css:284`, `:289`, `:290`), the README gives a `calc()` built from them, and atlas's draft tells atlas to use them (`RULINGS-9.md:486`). "Custom properties are outside the names count" (`:162`), so they are a public surface a site is asked to build on, and no bound sees them. The ruling states nothing it removes. Restraint: "A seat that adds a piece states what it removes, and the removal outweighs the addition."
- **The need is already met.** *Record* (`MEASURE-9.md:828-837`): atlas's head row with the reservation written as literals reads 0 px² over the title in every cell at 375, 390 and 1440, in both schemes and both engines. RU-142's own witness asks only for "the same 0 px² as the literal margin". What the owner sees is the same with or without the tokens.
- **Who asked.** atlas's conditions (`ORCH-LINES-8.md:27-31`) ask for the folded box to be reserved and to cover 0 px², not for tokens. The orchestrator wrote "if the reservation needs a value from glass, name the token" (`:33`). The reservation needs three numbers, and the literal carries them. The ratified rule for anything no site asked for is choice 34: "No to each. A kept part is opt-in and priced when kept" (`CHOICES.md:632-645`).
- **The names.** `--dock-controls-size` would sit beside `--dock-control-size`, one letter apart, one the page-level copy and the other the per-dock value that reads it. The same goes for `--dock-controls-inset` beside `--dock-corner-inset`, and `--dock-controls-edge` beside `--dock-padding-inline` and `--dock-padding-block`. That makes six names for three values, one pair differing by a single letter. Restraint: "One variant per job"; C-18, "We don't need a million fucking variants that are essentially the same thing."

*Remedy.*

- No token. The README states the folded preset's box in one sentence: a 52 px square, 16 px in from its corner (one 2.75rem seat and a 0.25rem edge on each side, at a 1rem inset). atlas keeps its literal margin.
- ORCH line 33 is answered "no token needed: the literal meets every zero".
- If the orchestrator still wants a token, it is one: the reservation itself, named so that no one can read it as `--dock-control-size`, with the removal it pays for named.

### 4. RU-147: the dip under reduced motion depends on what a judge reads, not on one rule. Minor.

- **The condition.** RU-147: "Under reduced motion a seat-set change that overlaps inks dips" (`:208`). A seat-set change then has two reduced-motion forms. R-11's form ("seats the geometry in one frame and fades the content in 100 ms", `PROTOTYPE.md:17`), which RU-143 keeps (`:171`), applies when inks stand apart. The dip, 100 ms out and 100 ms in, applies when they meet. Whether a seat dips would depend on geometry that a reader cannot see coming.
- **The ratified rule.** The owner's rule for reduced motion is choice 8 A, ratified: "A fade everywhere: the mark fades out where it was and in where it goes (100 ms each way)" (`CHOICES.md:190-206`). BM §5.3 adds: "Nothing cuts under Reduce Motion." Under R-11, a seat that only moves lands in one frame, overlap or not. So the condition is not what separates a cut from a fade.
- **What BM defers.** BM places the dock's own reduced-motion dip, the fold's, in 12.0.0 (§7.4, `DESIGN.md:277`). For 11.x it says "the form is BL's 11.1.2 face trade on one window" (`:239`).

*Remedy.*

- Say the rule once. If the tenth reads overlapping inks and the dip is built, it applies to every seat that a seat-set change moves under reduced motion, by choice 8 A, and not only where read6 saw an overlap.
- If the inks stand apart, nothing is built, and the fold keeps R-11 until BM-11.
- Either way the dock has one reduced-motion form for a seat-set change.

### 5. RU-139 and RU-140: the vertical dock's padding changes too, so w-vert folds 56 by 56, not 64 by 64. Minor.

- **The vertical padding.** *Source*: the vertical dock's one padding is `var(--dock-vertical-padding, var(--dock-padding-inline, 0.5rem))` (`shell.css:311`), and no default sets `--dock-vertical-padding`. RU-139 takes the default `--dock-padding-inline` from 0.75rem to 0.5rem (`density.css:80-82`), so every vertical dock's padding falls from 12 px to 8 px with it. RU-139 says only that "the vertical dock already sets one padding on every side", which reads as unchanged.
- **The witness number.** *Arithmetic*: w-vert sets no padding of its own (`dock-wi8.vue:448`). It folds 64 by 58 today, a 40 px seat plus 12 px each side. After RU-139 the cross is 40 + 16 = 56 px. With RU-140's block floor, the face along the axis is 40 + 16 = 56 px as well. RU-140's witness, "w-vert folds 64 by 64" (`:150`, `:153`), would then read RED on a correct build, or push the builder toward a 64 px disc beside every other dock's 56.
- **The owner's eye.** One folded disc for every orientation is the restrained result. Two disc sizes for one job is what restraint cuts.

*Remedy.*

- RU-140's witness reads w-vert folded at 56 by 56, the disc every other dock folds to.
- RU-139 says that vertical docks lose 8 px across.
- The drafts for sites that mount a vertical dock say so in the line they already carry on the ends.

### 6. RU-161: four sites' docks rebuilt in the harness to show a glide the seat-set cells already read. Minor.

- **What it adds.** *Record*: the witness is "each site's seat-set change rebuilt in the harness: the plate's edges glide, at least five frames, none over two fifths" (`:277`), and the tenth pass's harness order adds it (`:365`).
- **What already reads it.** G-4 already reads seat-set changes on the carrier. judge8 follows both of the plate's edges on `p3-seatset-fine`, `-coarse` and `-rm` in both engines (`MEASURE-9.md:805`). The carrier is one path for every site, so four replicas of fourier, colour, keyframes and daraksha add cells with the same force as the existing ones. The owner on gates: "Most of these 'gates' are contrived and overfit nonsense" (2026-07-13).

*Remedy.*

- The witness is judge8 on the existing seat-set cells, with one of them widened to the largest change named (fourier's 712 to 528 px, 184 px).
- The drafts keep the sites' "today" figures as figures, not as cells.

## Dropped on the second reading

- **RU-134 makes the toggle the loudest thing on the dock.** In light the sun is a solid black disc at 36 px, and amber would not make it lighter. Dropped: he asked for a bigger toggle ("the darkmode toggle is too small as well", C-89) and a coloured one (O-428, "more like daraksha's … but coloured too"). The weight is his ask.
- **RU-135 hides the empty disc from him.** Dropped. He ratified choice 37 on `strip-q5-9m`, which shows the empty disc. v11.1.0 folds a faceless dock the same way (its `GlassDock.vue` collapsed slot has no fallback). The published `:727` mounts one.
- **RU-136's claim that no released site pushes a row.** Dropped. keyframes's transport is the only child of a fixed, centred band (`TransportDock.vue:2-9`). Its Play slides inside the dock (choice 39), and nothing beside the dock moves.
- **RU-133 keeps icons that dwarf the words.** Dropped. Choice 41 is his ratified answer to "our icons sohuld be 2x bigger … Show them more" (`owner-frame-120.png`), and question 24 carries verify-9's look at face value.
- **RU-146's two root attributes are names outside the count.** Dropped. They are 11.1.2's measured cure (O-433: daraksha's reader frame 112.5 against 83.5 ms), internal to the dock's sheets. `names.mjs` counts the eleven documented attributes (`:13-14`, `:22`).
- **RU-141 cures a seat no site mounts.** Dropped. It is two lines that make the `within` prop do what the README says, and ORCH-LINES-8:33 keeps it as a library fix.
- **RU-152 keeps two lines and adds a crop clause.** Dropped. The plant moves 92 to 124 levels on the lane corners for three frames, which a person can see.

## What the owner would see

- **Question 18 / 23.** At 6.5 % in light, Home and Reports are two pills of the same shape, one shade apart, the words identical in weight. Nothing else says which is the page he is on. On the grid page the two pills read 1.002 apart. A heavy black sun sits at the end of the light dock, the heaviest mark on it (objection 2).
- **Question 5 / 25.** Three 56 px discs folded (one empty) and three docks open with 36 px icons in 56 px plates. The open rounded dock has 16 px corners on a 56 px plate, so it reads as a rounded rectangle beside two capsules. No strip shows a dock taller than one row; the last one he saw was a stadium with a seat past its curve (objection 1).
- **Question 14.** In the figure dock the four icons are larger than the title's letters. The open dock pushes the legend 36 px. atlas no longer mounts it there, but the strip still labels it "atlas's figure header".
- **Question 20.** The controls dock's 22 px glyphs in 44 px seats are the calmest marks on any strip, and they sit beside main docks whose icons are nine tenths of the seat. That is the contrast question 24 asks him about.
- **Question 21.** In dark, dials's selected 5Y is a faint pill on the warm plate. It is weaker than today's dark thumb, as choice 45 accepts.
- **Question 12.** The names strip still reads "11.1.0: 78 names" on its second line; RU-157 corrects it.
