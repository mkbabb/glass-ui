# W-I.8: the ninth rulings, challenged on measurement validity

2026-11-27. Seat: adversarial challenger of `RULINGS-9.md`, lens measurement validity. Model: claude-opus-5-5 (asserted from its own system identity), in a seat written for Fable; the owner's order of 2026-11-19 puts every seat on Opus. I wrote none of the rulings, the measure or the source. I ran no browser and no build, changed no source and staged nothing.

Read: `RULINGS-9.md` in full; `MEASURE-9.md` (top line, H, S, M); `verify-9.md`; `ORCH-LINES-8.md`; RULINGS-8's RU-103 and ready list; RULINGS-7's RU-68 and RU-70; `dock-frames/ROOT.md:276-285`; BM `study/DESIGN.md` §1, §5; `choices/CHOICES.md` choices 1, 35 to 45; `audit/ro-loop/FINDING.md` and `hold.sh`; `strip-q18-9m.chromium.png` (opened). On `bl/dock/wi8` at `254b3f501` (src `f3a28b292`, the same as `a5a4fe546`): `useDockBody.ts`, `DockCrossfade.vue`, `run.css`, `density.css`, `shell.css`, `morph.css`, `useDockRunMark.ts`, `useBarShape.ts`, `springPresets.ts`, `tests-visual/release-11-0-2.spec.ts:1480-1620` and `:805`, the harness page; in the measure folder `harness/m9/corner9.mjs`, `harness/s9/plants-extra.py`, `harness/m8/g16fix/main.js`, `harness/m9/mkpage9.py`, `logs/m9m-corner9-*.txt`, `logs/m9-h12.txt`, `logs/m9m-ink-chromium.txt`, `logs/m9-ink-m9m-ink3.chromium.json`. Paths starting `harness/` or `logs/` are under the worktree's `docs/tranches/BL/design/dock/wi8/measure/`.

Each objection was made, then judged again against the ruling's text and the evidence; those that did not survive are listed at the end.

## Blocking

### 1. RU-126: the one-row and taller split reverses its own record and has no predicate

The ruling gives a one-row dock the measured cross and a taller dock the token cap, and cites: "w-xf's faces hold two to four lines, so corner9 classes it among the docks taller than one row" (RULINGS-9:50).

- corner9 decides "one row" as the open cross equal to the folded cross within 1 px (`harness/m9/corner9.mjs:28`). Its log reads the reverse of the ruling: `p3-swap-xf-fine … one row -> FAIL (open corner 28 px, half the cross extent 41.23 px)` and `p9-tallrow-fine … taller than one row: open corner 28 px, half its cross 32 px` (recorded, not judged), the same in WebKit (`logs/m9m-corner9-{chromium,webkit}.txt`). So the ready list's "w-tallrow at 32" (RULINGS-9:389) has no judging clause in the named instrument, and w-xf at the one-row cap is a corner9 FAIL.
- w-xf is "an always-open DockCrossfade, faces of 2, 4, 1 and 3 rows" (`dock-wi8.vue:15`). With its one-row face showing it is one row by the ruling's own words, so the class, and the corner, would change at a swap.
- The carrier already writes the measured cross (`put("--dock-plate-cross-px", v ? w : h)`, `useDockBody.ts:639`). Reading it in `--dock-cross` for every dock is H3's `cand-ru91-cross`: w-tallrow 32, but the outline clause fails by 8.29 px on w-tall and 8.14 on the crossfade (MEASURE-9:155). The "about +2 lines" holds no predicate.
- A height threshold that keeps the input layer (70 px) and w-tallrow (64) one row and puts w-xf (82.47) above would be a number fitted to three cells.

**Remedy.** Define "one row" as a DOM fact the carrier and corner9 both compute (for example: the plate's cross equals the tallest seat's or face's block size plus twice the block padding, within 0.5 px), stamp it on the root, key the cap on it, and make corner9 use the same predicate. Read w-xf with each face showing. Correct RU-126's record line and question 25. If no such predicate separates w-tallrow from w-xf, the split goes to the owner with question 25 before S3 builds it.

## Major

### 2. RU-129: the equal-force pair cannot settle the restated clause

- Hard cell 7 reads "a morph's first three" frames (`ROOT.md:284`). `sync("mount")` runs at mount (`useDockBody.ts:1257`), before any morph, so "the eighth tip's mount read" (RULINGS-9:73, :362) moves no morph frame and cannot bite. With it in the pair, the restatement can never be adopted, and the release waits on the layout-count clause the ruling itself calls a proxy.
- The plant RULINGS-8 named for the after-frames half of this clause, "the morphing gate removed (RED: the sampler's layouts return to the frames after)" (RU-103's witness; read in M3 as s7-nogate, 3 forced layouts in w-pill's two frames after the trigger), is not in the pair.
- If the duration form is adopted, the ready list's G-11 line (RULINGS-9:388) keeps only "no layout under DockCrossfade inside a dock" of RULINGS-8's "none under a script stack in the two frames after" (RULINGS-8:641). A sampler-style forced layout after a trigger would then be RED only if it doubled a 4x frame.
- Hard cell 7 is a 4x cell. The ninth's 1x frames over the bound (w-pill, w-flow, w-ctl and w-seat at 1x, MEASURE-9:811) are left with no stated disposition.

**Remedy.** Read equal force with RU-128's plant and s7-nogate, each at 4x on the GPU lane. The mount read stays ORCH line 5's trace cell. Print "none under a script stack in the two frames after" beside the duration form whichever form decides, and say whether the 1x frames are read.

### 3. RU-123: the `hold.sh` rows and plant cannot witness "no loop error from the dock"

- `FINDING.md` attributes an error frame to its forcer, "the first callback in the error frame to run 2 ms or more", and that was `useBarShape` in 40 of 41 unheld red cells. `useBarShape.ts:20` still calls `getBoundingClientRect()` inside the delivery on this branch, on master and on `release/11.1.1` (`871be44bc`). A dock callback that reads layout later in the same delivery finds it clean and is never the forcer, so the `baseline` and `baseline-nohold` rows read "no loop error from the dock" by masking.
- The dock's own delivery path reads layout: `onResize` calls `sync("ro")` (`useDockBody.ts:1234-1239`) whenever an entry differs from the held box, and `sync` reads the layer and the fit (`:645-668`). A first delivery at 0x0 under a pending sheet differs from the held box. That is the class FINDING names.
- The plant moves `sync("mount")` back into the mount task. That read is outside any delivery, so by FINDING's mechanism it raises no loop error. The leg is then "reported unbitten" and the orchestrator is asked to drop it, while the dock's delivery read is never examined.
- Reading the ninth tip first proves nothing about the instrument: the ninth tip already carries the mount cure.

**Remedy.** Take the witness on the audit's `noop-barshape-card` row (useBarShape and the card's fit observer silenced), so the dock's callbacks can be the forcer, and attribute error frames by stack to `useDockBody`. The positive control is the dock's delivery read itself, read on the ninth tip with RU-38's guard removed. If the dock raises the loop error there, the cure is the entry-size read RU-103 names, applied to `onResize`.

### 4. RU-147 and RU-149: two RED read6 clauses restated toward what paints, with no plant

- RU-147's witness is "read6 on the three cells, both engines, printed both ways" and RU-149's names no plant. The plants that bit these clauses by layout box are in M3: g4-ghost (overlap 18 and 27.84 px against the tip's 3.50 and 3.47) and s6-words (98 px). Neither is required on the restated forms. This is verify-9 refutation 2's pattern: a restated clause counted before its force is read.
- On w-words the changed seat is a `DockTrigger` holding `SelectValue` (`dock-wi8.vue:833-836`), which paints no fill at rest. "The changed seat's fill where it paints one" therefore reads nothing there, and the neighbours and the plate edge already glide (842.52, 842.09 …). The restated clause passes on its own cell by construction.
- "While its word trades" (RU-149, citing BM §5.1) describes nothing on this branch: no label trade exists in `src/components/dock` (the only P0a rule 4 is the faces' window, `useDockBody.ts:29`), and BM §5.1's label swap is not among the BM rows this release ships (RU-166). The word changes in one frame.

**Remedy.** Read g4-ghost and s6-words on the ink-box overlap clause in both engines. Give the restated held clause a plant on the new current-seat cell, such as the current seat's fill box written to its new width in one frame. Record the w-words shrink as "the trigger's word swaps in one frame (the Select's; BM §5.1's row)", not as a trade.

### 5. RU-137: "cannot reach 4.5" is not read

- Choice 45 as ratified: "where a selected name cannot reach 4.5 … the highlight is the faintest that still reads as selected, and those docks are named" (`CHOICES.md`, row 45).
- H5 read the current step at 10, 12 and 14 % only (MEASURE-9:205). At 12 and 14 % the warm dark words fall to 3.97 to 4.27 (:597), so the words rise as the step falls. dials's 5Y highlight reads 1.29 at 10 % (verify-9), 0.09 over the mark bound. No step under 10 % in dark was read, so "cannot reach" is a hypothesis, and C8-M19's RED is lifted on it.
- RU-137 says the docks are named "in the sites' messages"; none of the step-10 drafts names a dock whose selected name falls under 4.5.

**Remedy.** Read nav and dials on the warm dark ground at a dark current step of 8 and 9 %. If a step keeps the highlight at its bound and the words at 4.5, choices 5 C and 45 disagree, and that goes to the owner beside question 23. If none does, name the docks with that reading printed, in the README and the drafts.

### 6. RU-132: the *Pixels* line that separates hover from current is not in the strip

- RULINGS-9:99: "in `strip-q18-9m.chromium` the current seat also carries its mark, which no hovered seat has". Question 23 (RULINGS-9:452) tells the owner: "The current page also keeps its mark, which a hover never has."
- I opened the strip. Reports carries its 10 % highlight and nothing else; Home's hover pill has the same shape and size, and at 6.5 % in light the two differ only in tone. `useDockRunMark.ts:1-8` defines the run's mark as "one selected plate per navigation run": the highlight itself, the fill that reads 1.002 against the hover on nav's grid in light (MEASURE-9:815) and 1.034 on action-row's field in light (`logs/m9m-ink-chromium.txt:37`).

**Remedy.** Strike the *Pixels* line and question 23's sentence. Give the owner hover against current per dock and ground (Chromium 1.002 to about 1.18), with the strip.

### 7. RU-152: the lane-corner crop measures sameness with the ninth tip, not square corners

- The clause compares "w-persist's inner lane corners in frames 2 to 4 against the tip's own crop, within 8 levels". w-persist is a default-density pill (`harness/m9/mkpage9.py:92`, no preset). RU-139 changes `density.css:77-82`'s inline padding from 12 to 8 px, so every lane moves 4 px and the plate narrows by 8 px. A crop held to the ninth tip then differs at the lane edges for that reason alone. If the reference is retaken on the tenth build instead, the tip's clause holds by construction.
- The source writes each lane corner's radius as a number: `cr()` gives `rIn` only where the region's corner lies on the plate's outline, and 0 elsewhere (`useDockBody.ts:1049-1050`).

**Remedy.** Read the property: in frames 2 to 4, the `round` radius of each region's computed `clip-path` is 0 at every inner lane corner (g2-lane writes `rIn` there, so it fails). The crop stays as the plant's paint check.

### 8. RU-144, RU-145 (cell 5) and RU-161: "at least five frames, none over two fifths" is about twice the ratified law

- BM law 7, ratified (O-426): "No leg lands more than two fifths of its travel in 16.7 ms, and none is shorter than 83 ms" (`study/DESIGN.md`, §1).
- The three cells say "frames" with no rate. The rows are 7.80 ms apart in Chromium and 10.00 ms in WebKit (MEASURE-9:796). Read per row, five rows last 39 to 50 ms, and two rows inside one 16.7 ms window may move four fifths: twice the law in both clauses.
- RULINGS-7's op60 form already reads "no 60 Hz window", interpolated between samples (RULINGS-7:128). At RU-161's travels (50 to 184 px), the gap between the two readings is 20 to 74 px in one window.
- For scale: the dock's own spring (response 0.3 s, ζ 0.88, `springPresets.ts:85-86`) moves at most about 14 % of its travel in a 16.7 ms window.

**Remedy.** Write the three cells in law 7's form. The largest move in any 16.7 ms window (interpolated) is at most two fifths of the travel. The leg runs 83 ms or more, from its last row within 2 % of its start to its first row within 2 % of its rest. Print the spring's own peak window beside.

## Minor

### 9. Hard cells 1, 3, 5 and 6 enter the ready list with no plant; two cells cannot fail

The ready list asks "each with a plant that bites in every engine its gate claims" (RULINGS-9:384), and RU-145 names none for cells 1, 3, 5 and 6. Cell 1 is read only on out-of-flow docks, where nothing in flow can move. The case ROOT's witness named (atlas's figure docks at 390, `ROOT.md:278`) is set apart by RU-136 and RU-161, so the cell cannot fail. RU-158's touch-name cell asserts that "a tap shows no name" while names over icons are not built (choice 38). **Remedy:** name plants. For cell 1, the head row's reservation read from the dock's live box. For cell 3, the anchored-edge hold of `5afae24e9` removed. For cell 5, s6-nogate and g4-scroll. For cell 6, the close on the hiding edge removed. Print cell 1 and the touch-name cell as "cannot fail on this build", not GREEN.

### 10. RU-138 moves the mark bound by less than one 8-bit level, on evidence of the other polarity

In ink run 3 the Format cell on the warm field in light reads 1.202 at rest, fill (161,124,100), and 1.196 open, fill (161,125,100) (`logs/m9-ink-m9m-ink3.chromium.json`). That is one level in one channel. The 1.195 evidence is a seat's look at a dark, lighter mark (RULINGS-7:96; challenge-8-measurement:75, "not the owner's"). The failing mark is light, a darker fill. **Remedy:** keep 1.2. State the instrument's resolution at that luminance (about 0.006 per level), and decide a reading within one level by the median of the three ink runs.

### 11. RU-130's no-condition removals are counted on an older tree

H12 read its shorter forms on `575084358` (`logs/m9-h12.txt:3`). Since then S2 removed the frame loop's three held branches, S6 added the `cw` stepping (`useDockBody.ts:966-969`), and S10 removed `void t` (the alias `const t = tr;` remains at `:499`). The "about −33", and with it the projection of 5,153 and 5,116, are estimates for another tree. RU-126's "+2" holds no predicate (objection 1). The conclusion, 375 to 412 lines over, does not change. **Remedy:** count the shorter forms again on `a5a4fe546` before the tenth's projection.

### 12. RU-139 and RU-140 disagree on w-vert

A vertical dock's padding on every side is `var(--dock-vertical-padding, var(--dock-padding-inline, 0.5rem))` (`shell.css:311`). Changing the inline padding at `density.css:77-82`, as RU-139 directs, makes w-vert 56 px wide and folded 56 by 56, not RU-140's 64 by 64. **Remedy:** state whether the end padding change is horizontal only, and the w-vert box each witness expects.

### 13. RU-153 re-reads g2-curve's WebKit G-14 leg for a load that cannot explain it

g2-curve fails none of WebKit's corner tests (28 passed at a start load of 37) and 11 in Chromium (MEASURE-9:973). It plants a computed corner; a load of 37 rather than 36 does not change a radius. g14-corner already bites the same group 14 times in all four projects (:974). **Remedy:** let g14-corner witness the group in WebKit, or read why WebKit's corner tests cannot see `--radius-dock` on the root. A re-read under 36 answers neither.

### 14. RU-142's witness cannot tell the README's reservation from the cell's

The head-row cell reserves `calc(1rem + 3.25rem - 24px + 0.5rem)`, which is 52 px (MEASURE-9:828). The README line and the atlas draft give `calc(inset + size + 2 × edge)`, which is 68 px. Both cover 0 px² of the title, so "the same 0 px² as the literal margin" passes either. **Remedy:** the witness compares the gap between the title's end and the folded box (0 to 8 px), and the README line names the host's padding term.

### 15. RU-141 builds on a cause H8 left unread

H8: "what lets the root fall under its run's minimum is not read" (MEASURE-9:310). RU-141 adds `min-inline-size: max-content` and a viewport cap on that hypothesis. **Remedy:** read the cause first (the root's display, the run's `min-inline-size` and overflow, any containment), then build. The ruling's witness and plant stay.

## Dropped on the second reading

- **RU-124's equal-force plant.** g14-lane removes exactly the clip the restatement credits, and O-288's own fault (`46ec8d30f`: seats off the morph's clock) is caught by the opacity-step clause, which the restatement leaves alone. The correction stands.
- **RU-125's plant.** s4-channel restores `adaptive-legibility.css`'s static qualifier (`harness/s9/plants-extra.py:19`), the rule that gives a live dock's capsule its lens. It bites the restated `:805`.
- **RU-128.** `reserveStyle` returns `undefined` with a dock body (`DockCrossfade.vue:100-107`). `measurePeak` also runs at register and unregister (`:63`, `:71`), and a guard at its top covers both.
- **RU-136's premise against keyframes.** The TransportDock sits alone in a centred, fixed bar (`TransportDock.vue:6`, `AnimationControlsGroup.css:78`). Play slides because the dock opens around its centre, not because it pushes a neighbour.
- **RU-151's start-load rule.** Contention during a run mostly produces false REDs (rows dropped, gaps lengthened), not false GREENs, and RU-150's interval void covers WebKit.
- **RU-143's cause.** S6's reading (0.13 to 0.359 px overshoot frames until `SNAP_PX`) and ζ 0.88 (`springPresets.ts:86`) support it.
- **RU-150.** The finer rows are the better instrument; a gap one 17 ms row long is not hidden at 10 ms by construction.
- **G-16's fixture without the coloured toggle.** Choice 1 measures "over" from 11.1.0, and BM law 9's ledger prices the toggle per site. The pre-tag read of daraksha's page covers the real budget.
