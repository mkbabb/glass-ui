# W-I.8: challenge to RULINGS-6, measurement validity

Challenger seat, claude-fable-5-2, 2026-11-16. I wrote none of the rulings, the build or the measurements. I ran no browser and no build and changed no source. Read: `RULINGS-6.md` and `MEASURE-6.md` in full; the plate-opacity, hover-shift and glyph-ratio INPUT notes; `owner-frame-120.png`; `fold/strip-plate-6.chromium.png`; in the worktree at `a68cd272c`: `useDockBody.ts:493-600`, `:655-700`, `:1250-1262`, `useDockRun.ts:240-312`, `run.css:340-420`, `tokens/glass.css:128-172`, `tokens/sizing.css:214-280`, `icon-button.css:236-256`, `tab-button.css:159-160`, `ControlsDock.vue`, `DockOutlet.vue`, `index.ts` against `v11.1.0`, `tests-visual/release-10-1-5.spec.ts:2330-2372`, `measure/logs/m6-ru50-s2probe.*.txt`, `m5-g14-m6ru50-chromium.log`, `m6-g6-*.txt`, `harness/m6/owner.mjs`, `ink.mjs`, `s2probe.mjs`, `ru50-attempt.patch`. Each objection was made, then re-read against the ruling; the ones below survived. Dropped on the second read: the line counts (10,489 / 11,081 / 11,225 and the 75, 306, 72 all recount exactly), finding 5's 0.67 alpha (matches `glass.css:160-165`), and RU-59 (sound).

## Blocking

### C6-M1. RU-54 lands on the state s2 already fails in. The record's own numbers say so.

- s2's failure is one row: `cap 266, fits false, port 250, span 250, "flag is not the span"` (`m5-g14-m6ru50-chromium.log:103-143`). The test sweeps every 1 px cap for 20 px (`release-10-1-5.spec.ts:2353`), so it always visits the edge.
- `m6-ru50-s2probe.chromium.txt`: at cap 267 `fits true, region 242, capped 250`; at cap 266 `fits false, region 242, capped 250`. Region 242 at both is the 12.5 px and 12 px padding MEASURE-6 reports. So with the inset in place at cap 266 the region is 241 and the run's client box 249.
- RU-54 step 2 at cap 266: write the inset, read `span <= clientWidth`, 250 <= 249 is false, so the flag is off and the inset is removed. The dock rests at port 250, span 250, flag false. That is today's failing row, reached in one write instead of three. WebKit has the same row at cap 268 (span 252).
- The ruling prices this as "a band the width of the inset ... under a pixel wide at s2's size" and then lists "s2 by RU-54" under ready. The band is exactly the cap s2 fails at.
- The real conflict is RU-30 (the inset leaves when the run does not fit) against s2's law (flag equals `span <= port` at rest). On master the inset stays, the port is 249 and the law holds. RU-54 keeps RU-30 and so keeps the violation.
- The restated sweep clause ("equals the lifted read taken with the inset in place") would pass on this state while s2 stays red, so the new gate does not read what the old one does.

This is an inference from recorded boxes, not a run. Remedy: before the cure, read `s2chain` at 266 (Chromium) and 268 (WebKit) with the inset forced on and record the client box. If it reads 249, choose in writing: the inset stays through that band (RU-30 narrowed to "leaves only when a seat is hidden with the inset removed"), or s2's `fitLaw` is restated to read the port with the inset in place, with its reason and a plant. Do not list s2 as cured by RU-54 until one is chosen.

## Major

### C6-M2. RU-57 picks the plate's level with a gate that does not read the plate.

- The owner's words are about the plate: "why is this dock so transparent", "a bit too transparent". In `owner-frame-120.png` the glyphs are coloured pictures and read fine; what does not read is the plate against the ground.
- G-15 reads words at 4.5:1 and glyphs at 3:1 (`ink.mjs:1-6`, `:74`), at 1440 only, on the demo's field. Finding 1 says full ink alone may make level 1 GREEN. If so, G-15 has no power over the level, and "first GREEN from the glass end" returns the first rung by construction.
- No row reads today's veil with full ink, so nothing shows that even the one-step firming is doing work.
- The ruling's own plate-against-field readings (1.04:1 today, 1.70:1 at 0.4, called too much) are the quantity the owner named, and no gate carries them. In `strip-plate-6.chromium.png` the "one tier, level 1" dark row is hard to tell from today's row.
- The recorded ladder is not monotone: today 14 failing, one tier at the base rung 20, level 0.7 11 (Chromium). A first-GREEN stop assumes it is.

Remedy: G-15 gains a plate clause, the plate against the field under it, with a floor and a ceiling taken from strips the owner has seen (1.04 is his "too transparent", 1.70 is the seat's "near-opaque"). The ladder adds a control row (today's veil, full ink). The level is the owner's pick from the ladder strip; the gate only excludes rungs. Read it at 390 and on daraksha's ornamented ground as well.

### C6-M3. RU-56's two floors and its plant.

- Hover against current is gated at 1.1:1. Observation 1 calls 1.09:1 "nearly invisible", and observation 4's fault is that "the two fills cannot be told apart". A floor 0.01 above the value ruled invisible does not gate that fault. The third clause ("the two fills differ") has no bound.
- The 1.3:1 floor is "the weakest shipped reading I would call visible", 1.37. The ruling's own finding 3 has weaker shipped readings: WebKit 1.20 light and 1.24 dark. The floor comes from one scan line of one PNG of one page in one engine.
- The plant ("the two `:root`-baked plates restored, RED in light, 1.09") was read at level 0.4. RU-64 builds RU-56 before RU-57, and RU-57 may land at level 1, where the baked fills read about 1.37 light and 1.51 dark in Chromium. The plant then passes in Chromium and bites in WebKit alone.

Remedy: one floor for both separations, shown to the owner as a strip of three candidate steps before it binds. The plant is re-read at the level RU-57 picks, both engines, both schemes; if it does not bite, the plant is hover and current set to one value.

### C6-M4. RU-63's names arithmetic does not survive SURFACE.md's method.

- The ruling lists the prototype's additions and calls them 14. The list has 13: `ControlsDock`, `label`, `corner`, `within`, `collapse`, `pinned`, `update:pinned`, `DockOutlet`, `to`, `region`, `run`, `controlCount`, `data-dock-glyph`.
- SURFACE.md counts slots ("`DockTrigger` props + slots | 2 + 2"). `ControlsDock.vue:83-86` has four: default, `collapsed`, `persistent`, `persistent-end`. They are not counted.
- The removals count five types (two of `useDockSearch`, three of `useDockCtaReceive`); the stated method lists no types, and no type is counted on the additions side (`DockOutletRegion`).
- Counted one way throughout: 21 removed against at least 17 added is 4 down; without types, 16 against 17 is 1 up. Neither meets "net down by 5 or more".
- Seven of the 21 are re-exports that stay public in another entry or stay in the source (`useDockCtaReceive` and types, the three context exports). They lower the count and remove nothing.

Remedy: recount both sides by one written method before the removals commit, and publish the table. If the result is under 5, either more comes out or the bound is restated with its reason.

### C6-M5. RU-52's cause is one of two candidates, and its second form allows the red reading.

- The ruling names `reach` on `focusin` as what spends the 4 px. MEASURE-5's note says "a focus or the carrier's resting offset takes it". `useDockRun.ts:289-291` says the engine's own focus scroll "can bring it there before `focusin`".
- The readings split by engine: the keyboard cell is 0.00 px in Chromium and 4.00 px in WebKit, on seat#0 (`m6-g6-*.txt`). `reach` is the same script in both. A script cause does not explain an engine split; the engine's focus scroll does.
- The first form (no scroll port on a fitting run) cures either cause. The second form gates `reach` on `:focus-visible`; if the engine is the mover, the press cell stays red.
- The second form also lets "the ring's reach (4 px)" through on keyboard focus. That is the failing value, so the gate would turn GREEN with WebKit's reading unchanged.
- `run.css`'s reserve text and G-14's "reserve" group (16 failures under its plant) state the shipped promise that a fitting run scrolls up to two rings. RU-52 reverses it and does not say which G-14 tests change.

Remedy: one reading first: `scrollLeft` logged at `focus`, `focusin` and after `reach`, with `reach` stubbed, in both engines. The second form is struck or rewritten after it. Name the G-14 reserve tests RU-52 touches.

### C6-M6. RU-55 turns k3 green by changing its fixture, and shrinks a glyph the owner asked to grow.

- k3 went red because the dock is 310 px where the test's premise needs 316. The cure gives the fixture an explicit glyph size so the premise holds again. The assertion is untouched; the case it now reads is no longer the default dock. Every consumer with unsized tab glyphs gets the 310 px dock and no test reads the fit law there.
- "1.5 em stands": `tab-button.css:159-160` with `--type-small` gives 21 px where 24 px shipped. The owner: "our icons sohuld be 2x bigger ... Show them more". A labelled seat's glyph gets 12.5 % smaller in the same release.

Remedy: keep the pinned fixture and add a k3 cell with unsized glyphs at a viewport that caps the 310 px dock, same assertion, same plant. Put the 21 against 24 px in the glyph strip and on the owner's page as a question, not a README line.

### C6-M7. RU-61's gate reads the neighbour's box, not whether the neighbour can still be seen or pressed.

- The cure lays the open plate over its row. MEASURE-6: the dock grows 152 px on hover and 164 px on a tap at 390. Anchored at one edge, that much of the neighbour is under the plate.
- The gate is the neighbour's box within 0.25 px. A legend or a control wholly covered by the plate passes. The owner's complaint is that things shift; a control that disappears under a hover is not the cure he asked for.
- The plant (margin removed, 76 px) proves the box clause only.

Remedy: add to the gate what the open plate covers on each of the three cells (px of the neighbour, and whether a focusable element is under it), reported in the strip. If a control is covered, the cell is the owner's question.

### C6-M8. RU-54's three-number memory drops an input the present key holds.

- Today's key is the seats' span, their count and `run.parentElement.clientWidth` (`useDockBody.ts:526-528`). RU-54 swaps the third for the root's border-box extent.
- In a root at its cap, a `#persistent` seat or a sibling region that widens takes room from the run with all three of RU-54's numbers unchanged. The flag then stands on a stale read: seats hidden in a run marked as fitting.
- None of RU-54's gate cells varies a sibling at a fixed cap (s2, the width sweep, flag writes at rest).

This is a source reading, not a run. Remedy: a cell with a capped dock whose persistent seat changes width (the `w-words` trigger moved to `#persistent`), read for the flag against a lifted read; and a plant.

## Minor

### C6-M9. The line budget's bound is what the removals happen to leave.

11,225 less 490 plus the 100 allowed is 10,835; the bound is 10,880. It is 391 lines above v11.0.2 (10,489), the version the owner called "a mess with all of this complexity", while G-16 in the same list is held to v11.0.2. 378 of the 490 lines are the unused search composable and its CSS; `useDockBody.ts` is +44 net this pass. The count also covers `src/components/dock` only, and RU-62 and RU-60 put their code in `_shared/overlay/participation.ts` and Tooltip. Remedy: one baseline for all three numbers, and report `useDockBody.ts`'s own line count beside the total.

### C6-M10. RU-53 keeps the bound but opens one exit, and gates a count where the cost is a time.

"If a stack names the engine alone ... the bound is read without it" can turn the gate GREEN with no source change; it should need the owner's or orchestrator's line, not the build seat's. Finding 2's "mislabelled" is a source reading with no trace behind it, which the ruling's own preface would call a hypothesis; the `dock:rect` mark settles it and should be read before the 27 and 11 counts are quoted again. The layouts read 0.91 to 1.26 ms at 4x; a clause on the trigger frame's summed layout time would tie the gate to "smooth out the animations".

### C6-M11. RU-60's gate has no plant and no reading in the engine phones run.

WebKit's half of `touchname` errored and the ruling replaces it with a unit witness. A 500 ms hold is where iOS raises its own callout and selection, which a unit witness cannot see. Remedy: name the plant (the hold timer removed), and make the real-Safari reading the gate's own clause, not a line under "before the tag".
