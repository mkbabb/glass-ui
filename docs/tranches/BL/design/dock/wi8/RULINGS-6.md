# W-I.8: the rulings on the sixth measure

The ruling seat, claude-fable-5-2, 2026-11-16. I wrote none of the wave, the prototype, the challenges, the folds or the measurements. I launched no browser and no build, and changed no source. RU-52 to RU-64 follow RU-36 to RU-49 (`RULINGS-5.md`) and the orchestrator's RU-50 and RU-51, whose text I know only as `MEASURE-6.md` reports it. Each is the owner's to reverse.

**Folded, 2026-11-16.** The fold seat, claude-fable-5-2, read this file and the three challenges (`challenge-6-restraint.md`, `challenge-6-measurement.md`, `challenge-6-consumers.md`) in full and decided every objection. An accepted objection is written into its ruling as a paragraph that begins *Amended (fold 6: ...)* and names the objection it answers: R-1 to R-7 are the restraint challenge's, C6-M1 to C6-M11 the measurement challenge's, C-1 to C-10 the consumer challenge's. Where an amendment and the text above it disagree, the amendment rules. The table of all twenty-eight is `fold-6.md`. The final order, ready list, REMOVES list, budget arithmetic and owner questions are the last section of this file and replace the lists in RU-63 and RU-64 where they differ. The fold ran no browser and no build and changed no source; what it checked itself is marked *fold reading*.

**What I read.** In full: `RULINGS-5.md`, `RULINGS-4.md`, `MEASURE-6.md`, the twelve `INPUT-*` notes with every later section, `audit/dock-usage/USAGE.md` and `SURFACE.md`, `OWNER-READ.md`, `LEDGER.md`. Every strip in `fold/` named `-6`, each opened: `strip-fold-6`, `strip-swap-6`, `crop-many-6`, and both engines of `strip-glyph-6`, `strip-plate-6`, `strip-hover-6`, `strip-seatset-6`. In the worktree `.claude/worktrees/bl/dock/wi8` at `a68cd272c` (source as `ddfa8a2ba`), read only: `m6/ru50-attempt.patch`, `m6/ru45.patch`, `m6/owner.mjs:20-70`, `m6/comp/nav.stage.vue`, `m6/g6b.mjs`, `logs/cost2.m6.json`; `useDockBody.ts:493-542`, `:655-700`, `:1255-1300`; `useDockRun.ts:240-312`; `run.css:340-460`; `tab-button.css:40-125`; `tokens/glass.css:128-172`; `tokens/sizing.css:205-282`; the diff of `5eccb8554`; `index.ts`. Line numbers below are that worktree's.

**What is a reading and what is not.** *Record* quotes another seat's measurement. *Source* quotes the code. *Pixels* is my own reading of a strip's image file (colour plateaus along one scan line, contrast by the WCAG formula); it is a reading of a picture, not of a page. *Count* is my own `git` line count. *Hypothesis* has no reading behind it, and the build seat confirms it before curing it.

## Three findings that change how MEASURE-6 is read

1. **The plate's level was chosen with the ink still dimmed.** *Record*: the ladder was read at 0.7, 0.6, 0.5 and 0.4 with the chevron, the tab ink and the segments dimmed, and the ink was made full only at 0.4. No row reads full ink at level 1 to 0.5. The order was mine (RU-44: alpha, tint, ink) and it was wrong: the ink change is a deletion and costs no glass, so it goes first. *Pixels*, dials page, "one tier, level 1" row, which already carries full ink: white words on a plate of about (143, 82, 66) in dark and dark words on (225, 172, 157) in light, roughly 6:1 and 9:1. Level 0.4 may not be needed at all. RU-57.

2. **G-11's fourth layout is not the carrier's read.** *Record*, `cost2.m6.json`, 48 trigger frames: 21 are `read, reread` (2 layouts); 27 carry a layout labelled `after the carrier`; 11 of the 12 four-layout frames carry two `frame` layouts. *Source*: on a fold `fitRun` and `fitCurve` return before reading (`:508`, `fitCurve`'s first line), so the first layout the carrier forces is `rectOf(el)` at `:691`, after the `dock:flags` mark. The label `flags` on a fold frame is therefore the carrier's one needed read, mislabelled. The two layouts without an owner are `after the carrier` and the second `frame`. RU-53.

3. **Hover and selection paint almost the same fill, and both sit on a plate they were not mixed for.** *Source*: `--dock-control-hover-bg` is `--glass-plate-resting` and `--dock-control-active-bg` is `--glass-plate-floating` (`sizing.css:220-221`), both baked at `:root` with level 1; the dock's plate is now level 0.4. *Pixels*, `strip-plate-6`, selected segment against its track: Chromium light 1.37:1 on today's plate, 1.09:1 on this build; dark 1.51 to 1.18; WebKit light 1.20 to 1.14, dark 1.24 to 1.08. USAGE: gregg and Home Assistant already override the active fill ("near-white on a cream plate (about 1.06:1)"). RU-56.

## The five observations, verified

| # | the orchestrator's note | verdict | ruling |
|---|---|---|---|
| 1 | at level 0.4 in light the selected segment's mark is nearly invisible | **Confirmed**, and wider: it weakens in dark and in both engines (finding 3). In light the mark also flips from darker than its track to lighter | RU-56 |
| 2 | at 0.9 the theme glyph grows and the search glyph does not | **Confirmed.** *Source*: the composition's Search carries `class="h-4 w-4"` (`nav.stage.vue:71`) and a utility outranks the seat's rule by design (`icon-button.css:244-246`) | RU-58 |
| 3 | the "390 px wide, light" column shows a dark plate over a black band | **Confirmed as a harness fault, not a theme leak.** *Source*: at 390 `openDock` taps the dock's centre (`owner.mjs:48-49`), and on this dock the centre is the theme seat, so the tap flips the theme. Chromium (`isMobile`) flips and its two 390 columns are swapped; WebKit does not flip. The black band is the page under the stage in dark | RU-59 |
| 4 | Reports and People both carry a fill at 1440 | **Hover beside selection, not two selections.** *Source*: `page` is one ref (`nav.stage.vue:26`), and at 1440 `openDock` rests the pointer on the dock's centre (`owner.mjs:50`), which is People. The fault it shows is real: the two fills cannot be told apart | RU-56 |
| 5 | the dark plate at 0.4 reads near-opaque | **Confirmed.** *Source*: the plate is the ink at alpha 0.18 mixed 40 % with solid `--card` 60 % (`glass.css:160-165`), so its alpha is 0.4 × 0.18 + 0.6 = 0.67. *Pixels*: plate against field 1.04:1 today, 1.70:1 on this build. Two thirds solid is not "a bit" | RU-57 |

## The rulings

### (a) The red gates

**RU-52. G-6: a run that fits is not a scroll port. The cause is cured; the gate is not restated.**
Record: MEASURE-6, G-6: "every seat of the run moves 4 px when the end seat (Settings) is pressed"; the keyboard cell the same in WebKit. *Source*: a fitting run's trailing reserve lies in scrollable overflow (`run.css:354-417`), so the run keeps up to twice the ring's reach of scroll, and `reach` spends it on `focusin` (`useDockRun.ts:288-312`), including for a mouse press that draws no ring.
A run whose seats all show hides nothing, so it has nothing to scroll. Under `data-run-fits` the run's overflow is visible on both axes, with `min-inline-size: 0` kept so the run still narrows with its room, and `reach` returns at once on a run that fits. The ring then paints whole with no offset to spend, and the lanes still cut at the plate. The fit read is `span <= run.clientWidth` (RU-39), which the overflow value does not change, so the flag does not read its own consequence.
*Hypothesis* that WebKit lays the visible run out as it does the clipped one; first reading: the press and keyboard cells and the RU-39 sweep in both engines. Second form if it does not hold: `reach` runs only for a seat that matches `:focus-visible`, and G-6's seat clause allows the ring's reach (4 px) on a keyboard focus in a run with under two rings of room. That form is a restatement and needs this line's reason: a ring that is cut is worse than a 4 px move.
Gate: G-6 as RU-47 widened it, 0.25 px, both engines. Plant: the overflow rule removed (RED, 4 px). Touches: `run.css:354-417`, `useDockRun.ts:288`.
*Amended (fold 6: C6-M5).* The cause is one of two candidates. *Record*, `m6-g6-chromium.txt` and `m6-g6-webkit.txt`: the keyboard cell reads 0.00 px in Chromium and 4.00 px in WebKit at seat#0, and `reach` is the same script in both. *Source*, `useDockRun.ts:289-291`: "the engine's own focus scroll can bring it there before `focusin`". So one reading goes before the cure, in both engines: `scrollLeft` at `focus`, at `focusin` and after `reach`, once with `reach` stubbed. The first form (a fitting run is not a scroll port) cures either cause and stands. The second form is struck: it lets the ring's 4 px through on a keyboard focus, which is WebKit's failing value, so the gate would turn GREEN with the reading unchanged. If the first form does not hold in WebKit, stop and report.
RU-52 also reverses a shipped promise, that a fitting run keeps up to two rings of scroll (`run.css:369`, THE RESERVE YIELDS; G-14's reserve group, 16 failures under its plant; `e4` at `release-10-1-5.spec.ts:723` is one of them). Before the cure the build seat lists every reserve test that asserts a scroll offset on a fitting run. Each is restated to "the end seat's ring paints whole at offset 0", with this paragraph as its reason and its plant still biting, and the `run.css` text is rewritten with the rule.

**RU-53. G-11: the bound stays at RU-29's three, four on a named flag frame. The two unowned layouts are named by reading before anything is cured.**
Record and source: finding 2.
- *The instrument first.* A `dock:rect` mark goes before `rectOf(el)` (`useDockBody.ts:691`), so the carrier's read on a fold is named for what it is. `cost5.mjs` records the trace with `disabled-by-default-devtools.timeline.stack`, so each forced layout carries its caller.
- *`after the carrier`* (27 of 48 frames). *Hypothesis*: the fold's focus hand-off to the folded face, or `useDockRun`'s resting read, forcing layout after the carrier's writes. Whichever the stack names is moved before the carrier's writes or onto the carrier's one read.
- *The second `frame` layout* (11 of 48). *Hypothesis*: a ResizeObserver delivery in the trigger frame that fails RU-38's guard on a region or a seat and writes. The hold build logs each entry that fails `heldSize` (`:1255-1257`). The cure is that the posture sync stores the border box of every observed element at its one read, so a delivery in that frame compares equal and writes nothing.
- If a stack names the engine alone, with no glass frame in it, that layout is listed as the engine's and the bound is read without it. That is the only restatement allowed, and it needs the stack beside it.
Gate: G-11's trigger clause, Chromium by trace: 3, or 4 where the `dock:reread` mark's detail names a flag that changed. Touches: `useDockBody.ts:669-691`, `:1255-1257`, `m6/cost5.mjs`.
*Amended (fold 6: C6-M10).* Finding 2's "mislabelled" is a source reading with no trace behind it, so it is a hypothesis until the `dock:rect` mark is read; the 27 and the 11 are not quoted again before that. The engine-only exit is not the build seat's to take: a layout is listed as the engine's only on the orchestrator's or the owner's line, with the stack beside it. The trigger frame's summed layout time is recorded beside the count in the same trace. It is reported and not gated: no reading exists to set a bound from, and G-2's step bounds already read what a slow frame does to the motion (RU-48).

**RU-54. G-14 s2, and RU-50's second cause: the fit is decided once per room, with the stadium inset in place, and remembered. RU-50's room arithmetic is not applied.**
Record: MEASURE-6, RU-50: forcing the flag changes no box in its frame; "the one input that moves with the flag is the stadium inset"; root padding 12.5 px at 267 and 12 px at 266; s2 expects `fits` at port 250, span 250.
The loop is two rulings meeting: RU-30 made the inset depend on the fit, and the inset narrows the region the fit is read from. Rebuilding the room from computed paddings (the attempt, nine lines of parsed styles) is RU-39's struck arithmetic again, on a third box.
The rule, in the order `sync()` already has:
1. The fit is decided only when one of three numbers has changed: the seats' span, their count, and the root's border-box extent on the dock's axis. The first two exist (`capOn`, `:503`); the third replaces `region` (`:526`), which the inset changes. While all three hold, the flag and the inset stand and nothing is read. This is RU-39's memory, extended from the cap to the flag.
2. When one has changed: the inset is written as for a run that fits, the cap is lifted (RU-39), and `span <= run.clientWidth` is read once. If it fits, the flag is set and the inset stays, which is master's state and s2's. If it does not, the flag is off and the inset is removed (RU-30). That is one named flag frame.
The fit at a given room has one value, reached from either side. In a band the width of the inset a dock that would fit without its inset is a whole-seat scrolling run; that is the price of one value, and it is under a pixel wide at s2's size.
*Hypothesis* that this settles s2; first reading: `m6/s2chain.mjs` at 266 and 267, flag writes in 600 ms (was 144, then 3).
Gate: s2 at 1440 and 390 in three projects; RU-39's sweep with its clause restated (the flag at each width is the same in both directions and equals the lifted read taken with the inset in place); at rest 0 flag writes in 2 s. Plant: the memory removed. Touches: `useDockBody.ts:503-542`, `:672-690`; `m6/ru50-attempt.patch` is closed unapplied.
*Amended (fold 6: C6-M1, blocking, accepted).* As written the rule rests on the row s2 fails. *Record*, `m6-ru50-s2probe.chromium.txt` (*fold reading* of the log): cap 267 `fits true, region 242, capped 250`; cap 266 `fits false, region 242, capped 250, flips 3`. Region 242 at both caps is 12.5 px of padding at 267 and 12 px at 266. With the inset in place at 266 the run's client box is therefore 249, step 2 reads 250 <= 249, takes the inset off and rests at port 250, span 250, flag off, which is s2's failing row (`m5-g14-m6ru50-chromium.log:103-143`). WebKit's row is cap 268, span 252. This is arithmetic on recorded boxes, not a run. So:
- s2 is not listed as cured by RU-54 until the reading below is in.
- *The reading, before the cure:* `s2chain` at 266 in Chromium and 268 in WebKit with the inset forced on, the run's client box recorded.
- *If it reads one under the span, step 2 changes.* A run that does not fit with the inset in place is read once more with the inset removed. If a seat is hidden then, the inset stays off and the flag is off (RU-30 as it was). If none is, the inset goes back and the flag stays off: port 249, span 250, which is master's state, and s2's law holds on it as the test is written. RU-30 is narrowed to: the inset leaves only when the run does not fit with the inset removed. The second read happens only in a frame where one of the remembered numbers changed and the first read failed; it is part of the one named flag frame and counts under RU-53's four.
- *Why this and not a restated s2:* it leaves a shipped test alone and returns master's state. The other choice, s2's `fitLaw` reading the port with the inset in place, is taken only if RU-30's own cell (k2: WebKit, a vertical capped run at rest) goes RED inside the band, or the second read breaks G-11's bound. It then needs the orchestrator's line, its reason and a plant.
- *The sweep clause is restated again:* the flag at each width is the same in both directions and equals `span <= port` read at rest, which is s2's own law. The earlier wording (the lifted read with the inset in place) would pass on s2's failing row.
*Amended (fold 6: C6-M8).* The root's border-box extent alone drops an input the present key holds (`useDockBody.ts:527`, `run.parentElement.clientWidth`): in a root at its cap, a `#persistent` seat that widens takes room from the run with span, count and root extent unchanged. The third number is the root's extent together with the border boxes of the root's other regions, which RU-53's cure already stores at the posture sync's one read. *Hypothesis* that the inset moves none of those boxes; the build seat reads it. New gate cell: a capped dock whose `#persistent` seat changes width (`w-words` with its trigger in `#persistent`), the flag read against a lifted read. Plant: the sibling boxes dropped from the key.

**RU-55. G-14 o1 and k3: a glyph never sizes its seat, and a test's fixture pins its own inputs.**
Record: o1, a labelled icon seat is 44 px tall where it was 40, radius still 20 px; k3 at 320, tab glyphs at 1.5 em are 21 px where lucide's unsized default was 24, so the dock is 310 px against the test's premise of 316.
- *o1 is a fault of RU-45 as built.* The share applies to a seat that holds only a glyph. In a seat that also holds a word the glyph is sized from the word, 1.5 em, the rule RU-45 already wrote for the tab seat. Stated as an invariant so no selector can miss it: at every share from 0.5 to 0.9 every seat's block extent equals `--dock-control-size`, and G-13's census reads it. o1's two tests then pass unchanged.
- *k3's promise is the fit law in a dock the viewport caps.* Its fixture reached the cap through lucide's default 24 px, which no ruling chose. The fixture gives its tab glyphs an explicit size class; the assertion is untouched and its plant must still bite. This is a restated fixture, and its reason is that a test of the fit law should not also be a test of an icon library's default.
- 1.5 em stands. It makes an unsized tab glyph 3 px smaller than lucide's default; the README says so.
Touches: `icon-button.css:247-252`, `tab-button.css:157-162`, `tests-visual/release-10-1-5.spec.ts` (k3's fixture).
*Amended (fold 6: C6-M6).* The pinned fixture stays, and k3 gains a second cell: the same dock with unsized tab glyphs, at a viewport that caps the 310 px dock, with the same assertion and the same plant. The default dock is then read for the fit law too. The 3 px is not settled by a README line: 21 px against the shipped 24 px goes in the question-17 strip as a row, with the sites whose unsized tab glyphs shrink named beside it (speedtest's primary seats, gaggle's and gregg's tabs, keyframes's Apply CSS). 1.5 em is the default until the owner picks.
*Amended (fold 6: C-5).* As built, a tab seat sizes only a direct `svg` (`tab-button.css:158`), where the icon seat's rule covers `svg, img, picture, [data-dock-glyph]` (`icon-button.css:249`). The tab seat's rule takes the same four forms, and G-13's census reads a tab seat that holds a picture. Until that is built, hassio's LF-3 and daraksha-2x's tab-glyph row are open, not "built". Home Assistant's worded tab holds an `ha-icon` element (`frontend/src/tiles/dock_parts.ts:93`, `:271`), which is none of the three tags, so it is the site `data-dock-glyph` is for.

### (b) The observations

**RU-56. The mark and the hover fill are steps of the dock's own ink over the plate, hover the lighter. A gate reads the mark. (Observations 1 and 4)**
Record and source: finding 3.
Inside a dock, the current seat's fill, a hovered seat's fill and a segmented control's selected mark are the dock's ink (`--dock-fg-on-aurora`) at an alpha over whatever the plate is. They then keep their distance from the plate at any level and in both schemes, and the mark is always the darker side of its ground in light and the lighter in dark. Three steps, one token each, the names that exist: hover, current, press, in rising strength. No new name, no ring, no shadow.
Gate, added to G-15: on each composition, both schemes, both engines, the current mark against the ground it sits on reads 1.3:1 or more (*derived*: v11.0.2 reads 1.37 in Chromium light on the dials page, the weakest shipped reading I would call visible); a hovered seat's fill against the current seat's reads 1.1:1 or more; and with the pointer resting on a seat beside the current one, the two fills differ. Plant: the two `:root`-baked plates restored (RED in light, 1.09). The cells with a picture for a glyph (daraksha's) are read too; if a picture hides the fill, report it and stop, since a ring by default is the owner's (INPUT-daraksha-2x, point 2).
This replaces gregg's and Home Assistant's `--dock-control-active-bg` overrides. Touches: `sizing.css:220-221`, `:275-279`, `adaptive-legibility.css:104-111`.
*Amended (fold 6: R-1, C6-M3).* Both floors are withdrawn as numbers.
- *The mark.* 1.3:1 for both engines is RED on shipped paint in WebKit (1.20 light, 1.24 dark, finding 3) and passing it there pushes Chromium above the 1.37 it ships, which is more shading than the owner has now. The clause becomes: on each cell the current mark against its ground reads no less than that engine's own v11.0.2 reading on the same cell. The gate takes the v11.0.2 readings from the page, not from my pixels.
- *Hover against current.* 1.1:1 is 0.01 above the 1.09 this file calls nearly invisible. The strip "a seat hovered beside the current one" (RU-64 step 9) is shot at three candidate steps, 1.1, 1.2 and 1.3, in both schemes and both engines, and the owner picks (question 18). Until he does the gate reads 1.2, which is WebKit's shipped mark: the weakest separation that ships today and reads as a mark. The third clause ("the two fills differ") had no bound and is struck; the second covers it.
- *The plant.* The 1.09 was read at level 0.4, and RU-57 may land at level 1, where the baked fills read about 1.37 and 1.51 in Chromium. The plant is read again at the level RU-57 picks, in both engines and both schemes. If the two baked plates do not bite there, the plant is hover and current set to one value.
*Amended (fold 6: C-7).* The ink-derived fills are declared on `.glass-dock`. The `:root` lines (`sizing.css:220-221`) stay as they are for a `DockControl` outside any dock (value.js's four workbenches, daraksha's popovers, atlas; SURFACE.md:43). G-15's clause gains one loose `DockControl` cell, which must read as v11.0.2 does. value.js, gregg and speedtest rebind `--dock-fg-on-aurora` on `.glass-dock` (USAGE.md:39-41, :302, :339), so their fills now follow their ink; each is told at booking and before the tag.
*Amended (fold 6: C-10).* "No ring, no shadow" is the answer to O-367a ("The selected seat's rim: W-I.8"). That row is closed here.

**RU-57. The plate's level is read again with full ink, from the glass end, and the first GREEN is taken. Level 0.4 is withdrawn as the default until then. (Observation 5)**
Record and source: finding 1; observation 5.
The ladder, every rung with one tier at the base rung and every word at full ink: level 1, 0.85, 0.7, 0.55, 0.4. G-15 with RU-56's clause picks the first that is GREEN in both engines. Level 1 is one veil step firmer than v11.0.2, which is what daraksha measured as enough and what "a bit" asks for. If nothing above 0.4 is GREEN, 0.4 stands and the strips say why.
The owner's strip (question 10) is the ladder's rows, not three states that change two things at once. Touches: `dock.css:216-220`.
*Amended (fold 6: R-2, C6-M2).* G-15 reads ink against the plate (`ink.mjs:1-6`, `:74`: words 4.5:1, glyphs 3:1). It does not read the plate against the field, which is what "too transparent" names. With full ink it is most likely GREEN at level 1 (finding 1), so "the first GREEN" would return the first rung by construction, a plate the owner cannot tell from today's. So:
- G-15 excludes rungs. It does not pick one.
- Every rung is read, not the rungs up to the first GREEN: the recorded ladder is not monotone (14, 20 and 11 cells failing in Chromium). A control row is added: today's veil with full ink, which shows what the ink alone buys.
- Beside each row of the ladder strip, in both schemes, for the open plate and the folded one: the plate against the field under it. The default is the first rung from the glass end that is GREEN on ink and whose plate reading is above v11.0.2's on the same cell (1.04:1 by my pixels on the dials page in dark) and below level 0.4's (1.70:1, withdrawn as near-opaque). Those two are exclusions from readings already on record, not a new gate. A bound is written only after the owner has picked from the strip (question 10).
- "Level 1 is one veil step firmer than v11.0.2" is said with its plate reading for both postures or not said.
- The ladder is also read at 390 and on daraksha's ornamented ground.
*Amended (fold 6: C-6).* Level 1 is preferred for a second reason: the level is set on `.glass-dock` (`dock.css:218-220`) and mixes whatever tier a site chose toward solid `--card` (`glass.css:164-167`), so any level under 1 flattens the steps gregg (`Figure.vue:1366-1368`, the wash tier on pair docks), speedtest (`design/register.css:235`) and slides (`decks/parkway-lab/theme.css`) set. If a lower rung is taken, the strip carries a wash-tier dock beside a default one, and those three sites are told the number before the tag.

**RU-58. The share reaches a glyph the site did not size. Glass's own seats carry no size class. (Observation 2)**
A site's explicit size outranks the default, as written, and that stays: forcing it would undo every site that sized a glyph on purpose. So the new default changes only unsized glyphs, and the release note and the message to atlas say so in those words. Glass's ten compositions, `DarkModeToggle size="dock"` and `DockTrigger`'s chevron carry no size utility on a seat's glyph. G-13's census gains the line: in the compositions every icon seat's glyph box is the share times the layer height within 0.5 px. Touches: `m6/comp/nav.stage.vue:71` and its source on `bl/demo`.
*Amended (fold 6: R-6).* The census line reads the share token (`--dock-icon-glyph-ratio`) times the layer height, not nine tenths, so the owner's answer to question 17 changes a token and no gate. The question-17 strip gains a third row: icon seats in a worded run at the word-derived size (1.5 em, RU-55's proportion). No rule for a mixed dock is written until he picks; his "2x bigger" was said of an icon-only dock (`owner-frame-120.png`).

**RU-59. A strip's label is checked against the page. (Observation 3)**
`openDock` returns when the dock is already open, and where it must tap it taps the folded face, never the dock's centre. Each strip cell records the document's scheme at the shot and the builder refuses a cell whose scheme is not its label's. The 390 columns of `strip-glyph-6` are shot again in both engines; the Chromium pair in `fold/` is swapped and is not shown to the owner as it is. Touches: `m6/owner.mjs:46-54`.

### (c) The readings nothing had ruled

**RU-60. Names on touch: a press and hold shows the seat's name above it. RU-47 does not close until it does.**
Record: MEASURE-6: at 390 a press and hold shows no name; INPUT-daraksha-2x: the dock turns tooltips off on touch, "so a phone now shows NO page name at all".
Of the three ways offered, the name kept in the run on coarse pointers brings back RU-28's 96 px, and the name flashed on selection is a second motion on every page change. The owner already answered the first way in question 2 by default. So: on a coarse pointer a press held 500 ms on a seat shows its name above the seat in the top layer, the release does not activate the seat, and the dock's switch that silences Tooltip on touch is deleted. No new prop.
11.2.0 does not ship RU-28 at either pointer without its names. It is not the seventh build's; it is a ship gate, built in Tooltip's wave. Gate: the `touchname` cell, Chromium on a real touch, and a unit witness for WebKit (RU-42's reason); G-6 read with the name showing. The flash on selection is asked of the owner with the default no.
*Amended (fold 6: C-4).* There is no switch in glass to delete. *Fold reading*: `src/components/tooltip` at `a68cd272c` has no touch, coarse-pointer or pointer-type branch, and the dock's source names Tooltip in comments only. The switch is daraksha's `src/shell/dockTip.ts`, and its reason is room, not touch: "A tooltip that covers another control is a defect". So this is new behaviour in Tooltip and is sized as that; its row leaves the REMOVES table. The build seat first reads why a touch shows no name (reka's Tooltip, or a site). Placement: a name never covers another control. Tooltip's own collision rule moves it to a side with room, and where no side has room no name shows. daraksha's `dockTip.ts` stays until its stacked phone layout is read with this in place; the ADDS row says so.
*Amended (fold 6: R-3).* The lift activates the seat, as any press does; "the release does not activate the seat" is struck, since it makes a slow press do nothing. (That Apple's large content viewer selects on lift is the challenger's recall and mine, not a reading; the build seat checks it.) One listener, on the run, not one per seat. The README says what a phone shows without the hold: the page's own heading names the page. "11.2.0 does not ship RU-28 at either pointer without its names" is withdrawn: OWNER-READ question 2 placed names "with the Tooltip work, not with this dock release". It is a ship gate only if the owner's answer to question 13 makes it one; otherwise 11.2.0's release note says a phone shows names once Tooltip's wave lands.
*Amended (fold 6: C6-M11).* The gate's plant is the hold timer removed. The real-Safari reading is a clause of the gate, not a line under "before the tag": 500 ms is where iOS raises its own callout and selection, which a unit witness cannot see.

**RU-61. A dock in the flow holds its neighbours still: the open plate lies over its row and grows away from the anchored edge.**
Record: MEASURE-6: an in-flow dock grows 152 px on hover and its neighbour moves 76 px, 164 and 82 px on a tap at 390. INPUT-hover-shift: this is every figure dock in atlas, and most likely what the owner saw; keyframes's Play slides 38 to 109 px from under the pointer.
- *Overlay, not reserve.* A reserved box the size of the open dock leaves a hole beside a folded dot in every figure's head row. Atlas already holds its docks by overlay.
- *The mechanism, to be prototyped before it is believed.* The dock's layout already changes once, at the trigger. In that same write the carrier gives the root a negative margin on the side away from its anchor, equal to what the open posture adds (it holds both postures' extents, `layout`, RU-35), on both axes, and removes it at the fold's trigger. The root overlaps its neighbour and no neighbour's box changes. A dock that is `position: fixed` or absolute is untouched, and so is a dock that never folds.
- *`anchor` gets the job it never had* (SURFACE: "inert"). `start` and `end` name the edge that stays; `center` grows both ways. Where the consumer set none, a dock with a `#persistent` seat anchors at the start and one with only `#persistent-end` at the end, so a seat that shows in both postures stays under the pointer. No new name.
- One cross extent in both postures for a one-row dock is read, and cured only if RED (value.js's 40 against 48 px).
*Hypothesis* throughout: no cell has run it. If the margin costs a layout past RU-53's bound, or a centred fixed dock with a persistent seat cannot keep both its centre and its seat, stop and report; the owner's question 15 covers the second.
Gate: `tools/shift-gate.mjs` on every composition page, both engines, 1440 and 390, exit 0; `w-inflow`'s neighbour and the block below move 0.25 px or less on hover, focus and tap; keyframes's transport: the persistent seat moves 0.25 px or less through the unfold. Plant: the margin removed (RED, 76 px). Touches: `useDockBody.ts` (`sync`, the flags write), `GlassDock.vue:478`.
*Amended (fold 6: R-4, C-3).* The slot inference is not in 11.2.0. It changes how mounted docks open by reading which slots are filled, which is the kind of default change RU-63 parks for 12.0.0, and nobody reading the markup can see it.
- In 11.2.0 `anchor` does its job as the site set it. The prop's default is `"center"` (LEDGER.md:134), so a dock with no `anchor` grows both ways, as it does today, and now lies over its row.
- The inference waits for 12.0.0, or for the owner's yes to question 15. It needs the default to become unset, and `anchor="center"` is then the one-line way out. The docks whose open position it would change, for that day: keyframes `TransportDock`, daraksha `SiteDock` (on the Motion page only, where `#persistent-end` is filled, `SiteDock.vue:232`), fourier's `EditorControlsDock` and `AnimationControls` (`#persistent`) and `CanvasControlsDock` (`#persistent-end`), Home Assistant's, atlas's phone bar.
- An explicit `anchor` outranks a persistent seat. atlas `PlateDock.vue:150` sets `anchor="end"` and fills `#persistent` (`:156`), so its Table seat still slides the full growth. The message to atlas says so and gives the two fixes on its side: the seat in `#persistent-end`, or `anchor="start"`.
- "In the flow" is read from the root's own computed position. A root in flow inside a fixed wrapper (keyframes `TransportDock.vue:6-9`, daraksha `SiteDock.vue:289-294`) takes the margin. *Hypothesis*: at the centre the two margins are equal and the wrapper holds nothing else, so nothing a viewer sees changes. Cells added to the prototype's three: atlas's `PlateDock` with its persistent seat, daraksha's Motion page, and keyframes's transport twice, as shipped and with `anchor="start"`, the second being question 15's strip.
*Amended (fold 6: R-4, C6-M7).* The gate also reads what the open plate covers: on each cell, the px of the neighbour under the plate and whether a focusable element is under it, printed in the strip. One strip is added: the open plate over atlas's legend at the level RU-57 picks, held for the linger. If words show through words, or a control is covered, that is the owner's (question 14) before RU-61 joins the pass: the firmer plate for an in-flow dock, or the reserve.

**RU-62. The trigger of an open surface: G-8's reading becomes a gate, and the cure is one rule in one place.**
Record: MEASURE-6, RU-43: DropdownMenu reopens twice and Popover once, mouse and touch, both engines; the Sheet closes and the dock folds with it; Select passes under the mouse only.
The rule, in the shared overlay participation and not per surface (`_shared/overlay/participation.ts`): a press that lands on a surface's own trigger is not an outside press, neither for the surface's dismissal nor for the dock's. The trigger's own toggle is then the only thing that acts, once. A Sheet closed by its trigger or its scrim releases the dock into its linger; it does not fold it.
First reading, before the cure: the order of `pointerdown`, the dismissal, `click` and the open state on DropdownMenu, to see which of the two closes first. Fourier's "fold on release" (a press outside the dock that dismisses its menu also folds the dock) is G-8's existing plant and is already built.
Gate: G-8's clause as RU-43 wrote it, now required: four surfaces, mouse and touch, both engines, closes once, stays closed, the dock stays open. Plant: the trigger exemption removed.

### (d) Triage

**RU-63. The twelve inputs, in three lists, under a budget.**

**The budget, against v11.1.0, read on the 11.2.0 candidate and reported in every MEASURE from the seventh:**
- *Public names* (SURFACE.md's method: components, functions, props, slots, emits, exposed members, documented attributes): net down by 5 or more.
- *Dock source lines* (`wc -l` of every `.ts`, `.vue` and `.css` under `src/components/dock`, tests and README aside): 10,880 or fewer, against 11,081.
- *The dock entry, gzipped*, on `git archive` builds: no larger than v11.0.2's. This is a new gate, **G-16**. It has never been read on the prototype.
- Anything added later is paid for in the same commit by something removed.

*Amended (fold 6: C6-M4, R-5, C6-M9, C-1, C-2).* The arithmetic below this paragraph is superseded by "The budget arithmetic" in the last section. In short: the list of additions has 13 items, not 14; SURFACE.md's method counts slots and no types, and by that one method on both sides the prototype adds 18 and the table removes 16, which is 2 up, not 7 down. Three pass-through names leave `ControlsDock`, three unused props of `DockControl` come forward from the 12.0.0 list, and `graspHeld` stays. The bound on names becomes "net down" (projected 3), reported with a second number, the names a site is expected to use. Lines are reported against v11.0.2 as well as v11.1.0, with `useDockBody.ts`'s own count and the lines the cures add outside `src/components/dock`.

*Count*, where it stands: v11.0.2 10,489 lines, v11.1.0 11,081, the prototype at `ddfa8a2ba` 11,225. The prototype is 144 lines over and 14 names over (`ControlsDock` with `label`, `corner`, `within`, `collapse`, `pinned` and `update:pinned`; `DockOutlet` with `to` and `region`; the `run` prop; the exposed `controlCount`; `data-dock-glyph`), and has removed no public name. So the redesign today fails its own budget, and the removals below are not optional.

**REMOVES, in 11.2.0** (each used by none of the eleven apps, SURFACE.md; this reverses RU-48's "deprecate, delete in 12.0.0" for these only, because a name nobody imports breaks nobody, and it is the owner's question 12):

| what | names | lines (*count*) |
|---|---|---|
| `DockBackgroundToggle`, its three props and its emit (speedtest dropped the last use). *Amended (fold 6: C-2):* no app uses it, but glass does; the conditions are in the final REMOVES list | 5 | 75 |
| `useDockSearch`, its two types, the `#search` slot, `search.css` (gaggle and atlas both built search in other slots). *Amended (fold 6: C6-M4):* 2 names by the method; the types go but are not counted | ~~4~~ 2 | 306 + 72 + the slot's markup |
| `useDockCtaReceive` and its three types as re-exports of `./dock`; the composable stays in the motion entry, so `cta-seat.css` stays | ~~4~~ 1 | 0 |
| `useDockContext`, `provideDockContext`, `DOCK_CONTEXT_KEY` as exports (internal use stays; `useOptionalDockContext` stays, three apps) | 3 | 0 |
| `DockSeparator`'s `anchor` | 1 | a few |
| ~~the exposed `graspHeld`~~ *Struck (fold 6: C-1):* keyframes reads it (`test/demo/app/dock-context-slot-resolution.test.ts:120`, `:125`, *fold reading* on `origin/master`). It stays through 11.2.0 and goes in 12.0.0 with the types | 0 | 0 |
| `DockLayerGroup`'s `orientation`, `switcherPosition`, `motion`, and the switcher's drag arm | 3 | about 25 |
| ~~the dock's switch that silences Tooltip on touch (RU-60)~~ *Struck (fold 6: C-4):* glass has no such switch | 0 | 0 |
| the carrier's `region` memory and RU-50's attempt (RU-54); the `:root`-baked seat fills inside a dock (RU-56) | 0 | 0 |

~~21 names and about 490 lines. Net of the prototype's 14 and 144: **7 names down, about 345 lines down**~~, before this pass's own additions, which are held to 100 lines. The build seat recounts both; my counts are `git` and SURFACE.md, not a build. *Amended (fold 6: C6-M4):* see the last section.

Removed by this redesign and already built, with the site code it lets each app delete: `dockMorphMeasure.ts`, `useDockMorph.ts`, `useDockRunMark.ts` (1,194 lines); the compact run and the named open seat; `capExtra`; the second plate tier; dimmed ink. By app: daraksha's `dockHold.ts` and `ControlsSeat.vue`'s dock; fourier's, value's, keyframes's and gaggle's `keepOpen` and `release` round a menu; `Popover`'s `keepDockOpen`, which becomes a no-op in 11.2.0 and is deleted in 12.0.0; the `--radius-dock: 9999px` lines in six apps.

**ADDS** (each names its site and its measured case, replaces a workaround, and adds no public name unless it says so):

| what | the site and the case | replaces |
|---|---|---|
| RU-61, the in-flow dock holds its box; `anchor` does its job | atlas `PlateDock.vue`, `PlateControls.vue`, `/sci` figures I and IV: neighbour moves 76 to 82 px; keyframes's transport: Play slides 38 to 109 px | atlas's own layout hold; no new name |
| RU-60, a name on a press and hold | daraksha at 390: no page name | nothing yet: daraksha's `dockTip.ts` stays until the placement beside a stacked control is read (*fold 6: C-4*); no new name |
| RU-62, the trigger is not outside | atlas's drawer reopened 32 ms after touch-down; DropdownMenu reopens twice here | atlas's and gaggle's re-expand watchers; no new name |
| RU-56, fills from the dock's ink | gregg (1.06:1), Home Assistant | two `--dock-control-active-bg` overrides; no new name |
| a `DockTrigger` in a run takes the run's seat height and padding (hassio LF-11: 148 by 31 beside 44 px seats). *Amended (fold 6: C-8):* it is a default; a site's `--dock-trigger-padding-*` (atlas, speedtest) and `--dock-trigger-min-height` (fourier) outrank it, and fourier's line becomes deletable | Home Assistant `GlassTabs.ts`, fourier `AppDock.vue` | fourier's `--dock-trigger-min-height`; three lines, no new name |
| a direct child of the run with `role="group"` is a frame and its seats are the snap targets, as a layer group already is (`run.css`, A LAYER GROUP IN THE RUN) | gregg `PageDock.vue`: WebKit pins the row at 0 | gregg's `scroll-snap-align` rules; two selectors, no new name |
| `data-dock-glyph` (RU-45, already built). *Amended (fold 6: R-5, C-5):* daraksha's pictures are covered by `img` and `picture` without it; the site that needs the name is Home Assistant's `ha-icon` (`dock_parts.ts:271`) | Home Assistant; daraksha's pictures by tag | daraksha's size rules; **one name**, counted above |
| `ControlsDock` and `DockOutlet` (already built). *Amended (fold 6: R-5):* each name is cited or goes; see "The budget arithmetic" | daraksha `ControlsSeat.vue`, fourier `StageDock.vue`, atlas `PlateDock.vue`; daraksha's four teleported docks | those files' docks and `dockHold.ts`; **counted above** |

Fourier's floating stage dock is `ControlsDock` with a `#persistent` seat and the site's own folded glyph, written as a README recipe: no preset component, no prop set. The two bare plates (daraksha `Star.vue`, `Clasp.vue`) mount the `glass-plate` utility at the dock's rung, not a dock; the README says so. Fourier's "keep-dock-open on DropdownMenu" and "fold on release", and all three points of the controls-seat note, are built and gated (G-8, G-13, RU-18) and add nothing.

**WAITS**

| what | until | why |
|---|---|---|
| a fold on scroll (`collapse` naming what folds it) | 11.3.0 | three races are on record, iOS `scrollend` is unread on a phone, both apps' own rules work today, and a new cause of folding grows the state machine the owner calls a mess. RU-43's two laws bind it when it comes. This moves it out of 11.2.0, against RU-43 |
| a "more" seat that takes the lowest-priority seats (fourier point 4, many-seats) | struck, as before | which seats hide is a per-site choice; RU-27 is the one rule, and a site with too many seats shows a menu on a phone, as the nav composition does |
| a cue that more seats lie past the cut (hassio LF-12) | the owner, question 16 | RU-27 shows whole seats and RU-13 struck the cut cap, so nothing cues. A peeking seat is the sliver RU-27 removed. The README's line about end caps is corrected in 11.2.0 either way |
| trailing persistent seats that yield on a narrow screen (gregg 1) | not built | persistent seats never yield; the run takes what is left under RU-27. ~~A dock whose persistent seats leave the run under one seat warns in development~~ *Struck (fold 6: R-7):* a warning is code for a case the ruling declined |
| one base size a host sets in px (hassio LF-1, speedtest's unthreaded `--dock-scale`) | 12.0.0 | it touches every row of `density.css` (454 lines), which 12.0.0 collapses; done now it is done twice |
| the defaults of `collapse` and `fitContent`; `shape`'s two unused values and `shape.css`; `fitCurve` (question 5); the switcher itself; `DockControl`'s `type`, `as`, `asChild`; the 14 unused types; about 104 unused custom properties; `--dock-open-pitches`, `--dock-open-seat`, `--dock-plate-collapsed-tier`, `--dock-icon-padding`, the four output names | 12.0.0 | each changes what a mounted dock does or what a site's CSS sets, which a minor release does not do (RU-48, RU-35, RU-28) |
| the morph in a chunk of its own (first-load-size, point 2) | only if G-16 is RED after the removals | a split adds a loader, a preload rule and a first fold that can wait on the network; deletion is tried first |
| `ScrollProgressRim edge="border"` on a scroll timeline (gregg 3) | the rim's own wave | it is not dock source |
| the gliding mark, the seat's material, whole seats on a vertical run | 12.0.0 | RU-28, RU-27, unchanged |
| "no frame's step over three times its neighbours'" as a gate | not adopted | RU-48, unchanged: G-2's step bounds read the same quantity |

*Amended (fold 6: C-9).* Three of these were booked to 11.2.0 in INBOUND and move out. Each consumer is told at booking, in the words RU-58 uses for atlas: what moved, to where, and what it keeps meanwhile. The scroll fold: atlas (O-378, "a first user") and fourier (which folds on scroll in app code, USAGE.md:117-118) keep their own rules until 11.3.0. One base size: hassio (O-377, O-377a, LF-1) and speedtest (`--dock-scale`) keep their own scaling until 12.0.0. The yielding persistent-end: gregg (O-383 row 4) is told it is not built and why.

Each of the twelve notes, by file: *controls-seat*: built, nothing added. *daraksha-2x*: rows 1 and 4 built; row 2 built for a direct `svg` only and open for a picture or a marked child until the tab seat's rule takes all four forms (RU-55 as amended, RU-65; *fold 6, second round*); 3 struck; 5 and 6 as RU-46; 7 is RU-60; its later points are RU-60, RU-56 and RU-54 (the fit in layout integers; the 0.1 px during the fade is the lane's, RU-25, and is read in G-2 on daraksha's composition). *dock-usage*: the budget and the removals. *first-load-size*: G-16, no split. *fold-rule-races*: RU-62; the scroll fold waits. *fourier-stage-dock*: a recipe; points 2 and 3 built; point 4 struck. *glyph-ratio*: RU-45, RU-55, RU-58. *gregg*: one add, one not built, one elsewhere; O-364 (3), whether a dock mounted open and pressed open should hold, is answered by RU-1 (a press outside is a dismissal) and gregg keeps `dockFold.ts`'s pin (*fold 6: C-10*). *hover-shift*, all three sections: RU-61, RU-52. *many-seats*: RU-27; the cue is question 16. *plate-opacity*: RU-57. *secondary-ink*: built (full ink); LF-1 waits; LF-11 added; LF-12 is question 16; LF-3 is open until the tab seat sizes a picture (RU-55 as amended, *fold 6: C-5*).

### (e) The seventh pass

**RU-64. The order, and what "ready" requires.**

*The order.* On `bl/dock/wi8` from `ddfa8a2ba`.
*Amended (fold 6):* the nine steps below are superseded by "The final seventh-pass order" in the last section, and the ready list by "The final ready list".
1. **Instruments, before any build.** `dock:rect` and the stack category in the cost cell (RU-53). The observer's failing entries logged in the hold build (RU-53). `openDock` and the scheme check (RU-59). G-15's mark and hover clauses (RU-56). G-16's size read and the two counts (RU-63), taken on `ddfa8a2ba` first so the pass starts from a number. `words.mjs` takes judge7's per-row bound in place of its fixed 12 %.
2. **One commit of removals** (RU-63's table), then the counts and G-16 again.
3. **Readings that decide a cure**, no source change: the two unowned layouts by stack; the event order on DropdownMenu's trigger; `s2chain` at 266 and 267.
4. **Cures, one commit each, each read on its own cells in both engines:** RU-54 (the fit's memory, the inset in place); RU-52 (a fitting run is not a scroll port); RU-55 (the word-sized glyph, k3's fixture); RU-53 (whatever step 3 named); RU-62 (the trigger).
5. **Tokens, with strips:** RU-56 (the fills from the ink), then RU-57's ladder with full ink, then RU-58 (the compositions' size classes).
6. **RU-61 as a prototype on its three cells** (`w-inflow`, atlas's head row, keyframes's transport). It joins the pass only if its gate is GREEN in both engines; otherwise it is reported and the pass goes on without it.
7. **The two small adds** (the trigger's seat height, the group as a frame), each with its site's cell.
8. **One whole pass** on one build: every cell in both engines, G-14 in three projects, every plant, the load per cell, the budget's three numbers.
9. **Strips and the owner's page:** the plate ladder, the glyph share again with correct labels and no size class, a seat hovered beside the current one, the in-flow dock opening over its row, and the six earlier strips.

*Ready for an 11.2.0 build seat* is this list and nothing more, on one build, each gate read at a load of 36 or under, each with a plant that bites in every engine the gate claims:
- G-1, G-2, G-3, G-4, G-7, G-9, G-10, G-13 GREEN in Chromium and in WebKit 2287, as RU-49 wrote them, with G-13's two new census lines (RU-55, RU-58).
- G-6 GREEN in both, every seat's box, on hover, focus and press (RU-52).
- G-8 GREEN in both with the trigger clause required (RU-62).
- G-11 GREEN in Chromium by trace under RU-53's bound, every layout named; the rest clause in both.
- G-12 GREEN.
- G-14: no failure in any of the three projects that master's snapshot does not also have (s2 by RU-54, o1 and k3 by RU-55).
- G-15 GREEN in both with the mark and hover clauses, at the level RU-57 picks.
- G-16 GREEN, and both counts under the budget.
- The in-flow gate (RU-61) GREEN in both, or RU-61 reported as not built with its reading, in which case 11.2.0's release note says an in-flow dock still moves its neighbour and atlas keeps its own hold.
Not required of the build seat, required before the tag: the name on a press and hold (RU-60), real Safari, the owner's look at the strips. Not in 11.2.0: the scroll fold, a preset beyond `ControlsDock`, the deprecation list.

*What the seventh pass removes:* 21 public names and about 490 lines (RU-63); the fitting run's scroll offset (RU-52); the flag's dependence on a box its own inset moves (RU-54); two fills mixed for a plate the dock no longer has (RU-56); a level chosen by a confounded ladder (RU-57); one harness tap that flips the theme (RU-59); the scroll fold from this release (RU-63).

## What I did not decide

- What the two unowned layouts are. RU-53 names the readings.
- Whether RU-61's margin holds a neighbour still in both engines, or what a centred dock with a persistent seat should do. No cell has run it.
- Whether a visible-overflow run lays out the same in WebKit (RU-52). The second form is written down.
- The plate's level. RU-57 picks by gate.
- Whether 1.3:1 is the right floor for a mark. It is derived from one shipped reading and the owner has not seen a strip of it.
- The dock entry's size. Nothing has read it on the prototype.
- The exact counts. Mine are `git` line counts and SURFACE.md's table; v11.1.0's public names were not re-audited, and I assumed they equal v11.0.2's 93.
- Whether deleting unused exports in a minor release is acceptable to the owner. Question 12; the default is yes, and without it the names budget cannot be met in 11.2.0.
- Whether real Safari agrees with any of it.

## After the fold: the final lists

Fold seat, claude-fable-5-2, 2026-11-16. These replace RU-63's arithmetic and RU-64's order and ready list. Every disposition is in `fold-6.md`.

### The final seventh-pass order

On `bl/dock/wi8` from `ddfa8a2ba`.

1. **Instruments, before any build.** `dock:rect` and the stack category in the cost cell, with the trigger frame's summed layout time recorded (RU-53). The observer's failing entries logged in the hold build (RU-53). `openDock` and the scheme check (RU-59). G-15's mark clause against each engine's own v11.0.2 reading, the hover clause at 1.2, the loose `DockControl` cell, and the plate-against-field reading printed per cell (RU-56, RU-57). G-16's size read. The public-name table by the one written method and the line counts, both taken on `ddfa8a2ba` first (RU-63). `words.mjs` takes judge7's per-row bound in place of its fixed 12 %.
2. **A grep, then one commit of removals.** Every name in the final REMOVES list is grepped in the committed source and the tests of all eleven apps and of glass. Then the removals, then the name table, the counts and G-16 again.
3. **Readings that decide a cure**, no source change: the two unowned layouts by stack, and `dock:rect` on a fold frame; `scrollLeft` at `focus`, `focusin` and after `reach`, with `reach` stubbed, in both engines (RU-52); the list of G-14 reserve tests RU-52 restates; the event order on DropdownMenu's trigger (RU-62); `s2chain` at 266 and 267 in Chromium and at 268 in WebKit with the inset forced on (RU-54); why a touch shows no name (RU-60).
4. **Cures, one commit each, each read on its own cells in both engines:** RU-54 (the fit's memory with the sibling boxes in its key; the second read inside the band); RU-52 (a fitting run is not a scroll port; no second form); RU-55 (the word-sized glyph in all four forms on a tab seat; k3's second cell); RU-53 (whatever step 3 named); RU-62 (the trigger).
5. **Tokens, with strips:** RU-56 (the fills from the ink, on `.glass-dock`), then RU-57's ladder with full ink, every rung and the control row, then RU-56's plant read again at the level taken, then RU-58 (the compositions' size classes).
6. **RU-61 as a prototype on its cells** (`w-inflow`, atlas's head row and `PlateDock` with its persistent seat, daraksha's Motion page, keyframes's transport as shipped and with `anchor="start"`), with the cover reading. It joins the pass only if its gate is GREEN in both engines and the owner has seen the cover strip; otherwise it is reported and the pass goes on without it.
7. **The two small adds** (the trigger's seat height as a default under the sites' tokens, the group as a frame), each with its site's cell.
8. **One whole pass** on one build: every cell in both engines, G-14 in three projects, every plant, the load per cell, the budget's numbers.
9. **Strips and the owner's page:** the plate ladder with the plate reading beside each row, both postures, at 1440 and 390 and on daraksha's ground; the glyph share in three rows with correct labels and no size class, with 21 against 24 px shown; a seat hovered beside the current one at three steps; the in-flow dock open over atlas's legend; keyframes's transport both ways; and the six earlier strips.
10. **Messages, at booking and again before the tag:** atlas (the glyph default; the explicit anchor on `PlateDock`; the scroll fold to 11.3.0), fourier (the scroll fold; its trigger token now deletable), hassio and speedtest (the base size to 12.0.0), gregg (the yielding seat not built; the fills follow its ink; the plate level if under 1), value.js and speedtest (the fills follow their ink), slides (the plate level if under 1), keyframes (`graspHeld` stays in 11.2.0 and goes in 12.0.0).

### The final ready list

*Ready for an 11.2.0 build seat* is this list and nothing more, on one build, each gate read at a load of 36 or under, each with a plant that bites in every engine the gate claims:

- G-1, G-2, G-3, G-4, G-7, G-9, G-10, G-13 GREEN in Chromium and in WebKit 2287, as RU-49 wrote them. G-13 carries two more census lines: every seat's block extent equals `--dock-control-size` at every share (RU-55), and every unsized glyph box, in an icon seat or a tab seat, in any of the four forms, is its rule's size within 0.5 px, read from the share token (RU-58, RU-55).
- G-6 GREEN in both, every seat's box, on hover, focus and press, by RU-52's first form only.
- G-8 GREEN in both with the trigger clause required (RU-62).
- G-11 GREEN in Chromium by trace under RU-53's bound, every layout named, no layout listed as the engine's without the orchestrator's line; the rest clause in both.
- G-12 GREEN.
- G-14: no failure in any of the three projects that master's snapshot does not also have. o1 by RU-55. k3 in both its cells. s2 as the test is written, by RU-54 as amended, or reported RED with the band reading; it is not counted as cured before that reading. The restated tests are listed with their reasons: the reserve tests under RU-52, and the 11.0.2 hover harness's background seat under the removal.
- G-15 GREEN in both: ink at the level taken; the mark no weaker than each engine's v11.0.2 reading; hover against current at 1.2 or the owner's pick; the loose `DockControl` cell unchanged.
- G-16 GREEN; the public names net down by the published table; dock lines 10,880 or fewer.
- The capped dock whose persistent seat changes width: the flag equals the lifted read (RU-54).
- The in-flow gate (RU-61) GREEN in both with the cover reading printed, or RU-61 reported as not built with its reading, in which case 11.2.0's release note says an in-flow dock still moves its neighbour and atlas keeps its own hold.

Not required of the build seat, required before the tag: real Safari, the owner's look at the strips, the messages of step 10. The name on a press and hold (RU-60) is required before the tag only if the owner's answer to question 13 says so. Not in 11.2.0: the scroll fold, the anchor inferred from slots, a preset beyond `ControlsDock`, the deprecation list.

*What each added gate clause replaces* (fold 6: R-7): G-16 replaces nothing and stands. G-15's mark and hover clauses replace nothing; they read a fault no gate read. G-13's two census lines replace nothing; the first is what o1 reads on one dock, widened to every share. The in-flow gate replaces nothing. The `touchname` cell replaces nothing and is not the build seat's. `words.mjs`'s fixed 12 % is replaced by judge7's per-row bound. RU-52's second form, RU-56's third clause and the development warning for crowded persistent seats are removed.

### The final REMOVES list, in 11.2.0

Counted by SURFACE.md's method: components, functions, props, slots, emits, exposed members and documented attributes. Types are deleted with their owners and counted on neither side.

| what | names | lines (*count*) | condition |
|---|---|---|---|
| `DockBackgroundToggle`, its three props and its emit | 5 | 75 | No app uses it; glass does (*fold reading* on master: `demo/stories/dock/overview.vue:628`, `substrates/blob.vue:761`, `substrates/fourier-field.vue:380`; `tests-visual/release-11-0-2/hover-harness.ts:24`, `:49`; `tests-visual/blob-pause-seam.spec.ts`; two a11y tests). The removal lands after `bl/demo`, or its commit edits those three stories. The hover harness drops the seat and `blob-pause-seam` mounts a `DockControl` wired to `pause()` and `resume()`, each restated with the reason "the component is deleted"; the two a11y tests go with it. The Blob and Aurora READMEs and `frameLoop.ts`'s comment say what a site wires to `pause()` now: any button, a `DockControl` in a dock |
| `useDockSearch`, the `#search` slot, `search.css` (and the two types) | 2 | 306 + 72 + the slot's markup | none |
| `useDockCtaReceive` as a re-export of `./dock` (and its three types); it stays in the motion entry | 1 | 0 | none |
| `useDockContext`, `provideDockContext`, `DOCK_CONTEXT_KEY` as exports | 3 | 0 | none |
| `DockSeparator`'s `anchor` | 1 | a few | none |
| `DockLayerGroup`'s `orientation`, `switcherPosition`, `motion`, and the switcher's drag arm | 3 | about 25 | none |
| `DockControl`'s `type`, `as`, `asChild` (SURFACE.md:125, 0 uses), brought forward from the 12.0.0 list | 3 | a few | only if the step-2 grep finds no use in any app's source or tests; no site passes them, so no mounted dock changes |
| `ControlsDock`'s `collapse`, `pinned` and `update:pinned`, which the prototype added | 3 (of the additions) | about 6 | each stays only if the build seat cites a site line that passes it; the preset computes its own `collapse` (`ControlsDock.vue:60-63`) |
| the carrier's `region` memory and RU-50's attempt (RU-54); the `:root`-baked seat fills inside a dock (RU-56) | 0 | 0 | none |

Not removed in 11.2.0, against the first draft: the exposed `graspHeld` (keyframes's test reads it; 12.0.0), and a Tooltip switch that glass does not have.

Removed by the redesign and already built, unchanged from RU-63: `dockMorphMeasure.ts`, `useDockMorph.ts`, `useDockRunMark.ts` (1,194 lines); the compact run and the named open seat; `capExtra`; the second plate tier; dimmed ink.

### The budget arithmetic

One method on both sides, as above. The build seat recounts and publishes the table before the removals commit; these are my counts from the prototype's source and SURFACE.md.

*Names the prototype adds: 18.* `ControlsDock` (1); its props `label`, `corner`, `within`, `collapse`, `pinned` (5); its emit `update:pinned` (1); its slots, default, `collapsed`, `persistent`, `persistent-end` (4, `ControlsDock.vue:83-86`); `DockOutlet` (1), its props `to` and `region` (2), its default slot (1); the `run` prop (1); the exposed `controlCount` (1); `data-dock-glyph` (1). The first draft's "14" listed 13 of these and no slots.

*Each cited or gone* (fold 6: R-5). `label`: the toolbar's accessible name, every site. `corner` and `within`: daraksha `ControlsSeat.vue` (viewport) and atlas `PlateDock.vue`, fourier `StageDock.vue` (a figure, a pane). The three slots beyond the default: fourier's stage dock recipe (`#persistent` and the site's folded glyph). `DockOutlet`, `to`, `region`: daraksha's four teleported docks. `controlCount`: `ControlsDock.vue:55` and `:61` read it; it is glass's own use, and it is counted because it is exposed. `data-dock-glyph`: Home Assistant's `ha-icon`. `run`: the build seat cites its site or it goes. `collapse`, `pinned`, `update:pinned`: no site named; they go unless cited. That leaves **15 added**, 14 if `run` goes.

*Names removed: 15*, 18 with `DockControl`'s three (5 + 2 + 1 + 3 + 1 + 3, then + 3).

| | added | removed | net |
|---|---|---|---|
| the first draft, as stated | 14 | 21 | 7 down |
| the first draft, by one method | 18 | 16 | 2 up |
| after the fold, `graspHeld` kept, three pass-throughs out | 15 | 15 | 0 |
| after the fold, with `DockControl`'s three | 15 | 18 | **3 down** |

*The bound, restated with its reason.* "Net down by 5 or more" rested on a miscount. The bound is: fewer public names than v11.1.0, by the published table. If the grep keeps `DockControl`'s three, the next names come from the same 12.0.0 list of unused props, not from a moved bound. A second number is reported beside it and is not bounded: the names a site is expected to use, which rise by the 15 above and fall by none, since every removed name had no user. That is the honest answer to "the removal outweighs the addition": for a site author it does not, in names. What the redesign removes for a site is its own code (`dockHold.ts`, the `keepOpen` and `release` round each menu, the radius lines in six apps).

*Lines* (`wc -l` of every `.ts`, `.vue` and `.css` under `src/components/dock`; the challenger's recount matches mine): v11.0.2 10,489; v11.1.0 11,081; the prototype 11,225. Less about 490 removed (75 + 378 + about 25 + a few + about 6), 10,735. Plus this pass's additions, held to 100: about 10,835. The bound stays 10,880, and it is stated on both baselines: 201 under v11.1.0 and **391 over v11.0.2**. 11.2.0 does not get under v11.0.2; 12.0.0's deletions (`density.css`'s 454 lines collapsed, `shape.css`, `fitCurve`) are where it can, and 12.0.0's bound is 10,489 or fewer. Reported beside the total in every MEASURE: `useDockBody.ts`'s own count (1,378 at `a68cd272c`), and the lines the cures add outside the directory (`_shared/overlay/participation.ts` for RU-62, Tooltip for RU-60).

*The dock entry, gzipped* (G-16): no larger than v11.0.2's. Never read on the prototype; step 1 reads it. v11.0.2 is the one baseline all three numbers are reported against.

### The owner questions

Questions 12 to 17 are in `OWNER-READ.md`; these are their texts after the fold, and two new ones. Each has a default and the work goes on with it.

10. **A firmer dock** (amended). You get one strip: the dock at five firmnesses with the words at full strength, plus today's dock with full-strength words, each row marked with how far the plate stands off the page behind it. Default: the least firm row whose words read and whose plate stands off the page more than today's does. The sixth build's two-thirds-solid plate is withdrawn.
12. **Delete what no site uses, now** (amended). Counted properly, the redesign adds 15 named parts a site is meant to use and the dock ships 18 that no site uses (a background toggle, a search slot and its helper, options on the layer group, the divider and the control). Deleting them leaves the dock 3 names smaller than 11.1.0, not 7 as first said, and about 390 lines larger than 11.0.2; it gets under 11.0.2 in 12.0.0. The background toggle is the library's only ready-made pause button for a moving background; after this a site wires any button to pause. Default: delete them in 11.2.0.
13. **A page name on a phone** (amended). A press and hold shows the name above the icon, and lifting still opens the page. Two parts. Should the name also flash for a moment after a tap? Default: no. And must the press-and-hold name be working before 11.2.0 is tagged, or may it follow with the Tooltip work as question 2 said? Default: it follows; until then a phone shows the page's own heading and no name in the dock.
14. **A dock that sits in a row with other things** (amended). Opening over its row moves nothing, and it covers what is beside it while it is open, for a few seconds after the pointer leaves. In atlas that is the figure's legend. You will get a strip of the open dock over the legend. Default: it opens over its row; if legend words show through the dock's words, the in-flow dock takes a firmer plate.
15. **A dock with one button that always shows** (amended). In 11.2.0 a dock opens to one side only where the site says so; left alone it opens around its centre, as today, so Play on keyframes still slides. Should a dock with an always-showing button open away from that button by itself? That changes how seven mounted docks open. Default: not in 11.2.0; you get the strip of keyframes both ways, and a yes makes it the rule in 12.0.0.
16. **More icons than fit on a phone.** Unchanged. Default: no cue.
17. **Big icons beside words** (amended). The strip has three rows: today's size, nine tenths of the seat, and the icon sized from the words beside it. It also shows that an icon next to a word inside one tab is now 21 px where it was 24 px. Default: nine tenths for an icon-only seat everywhere, and 21 px beside a word.
18. **How different a hovered icon looks from the current page's** (new). In the last strip two tabs looked selected: one was the current page and one was under the pointer. You get a strip with three strengths of difference. Default: the middle one.

### After the completeness check

Fold seat, second round, claude-fable-5-2, 2026-11-16. A completeness check found one item this file disposed of twice, in words that disagree. It is ruled here and corrected where it stood.

**RU-65. INPUT-daraksha-2x, row 2 (a glyph size for tab-shaped controls in a dock): built for a direct `svg`, open for the other three forms. The by-file triage is a summary and never outranks a ruling.**
Record: the triage line under RU-63 said "rows 1, 2, 4 built"; RU-55's C-5 amendment says daraksha-2x's tab-glyph row is "open, not built"; `fold-6.md`'s C-5 row said the row had been marked open. The mark was made on the secondary-ink entry (LF-3) and missed on the daraksha-2x entry of the same line.
*Source* (*fold reading*, worktree at `a68cd272c`): the tab seat's rule is `.dock-tab-button > svg`, 1.5 em (`tab-button.css:158-162`); the icon seat's is `.dock-icon-button > :is(svg, img, picture, [data-dock-glyph])` (`icon-button.css:249`).
- *What is built.* A direct `svg` in a tab seat is sized from its word. That answers the case the note measured ("the controls seat's actions stayed 16 px") where the action's glyph is an `svg`.
- *What is open.* A tab seat that holds an `img`, a `picture` or a child marked `data-dock-glyph` takes no size from the dock. That is daraksha's own pictures in a worded seat and Home Assistant's `ha-icon`. The row is not closed while a site's picture in a tab seat still needs the site's own size rule, which is the workaround the row asked glass to end.
- *The disposition.* Row 2 is open. It closes when the tab seat's rule takes the same four forms (RU-55, C-5; step 4 of the final order) and G-13's census reads a tab seat holding a picture at its rule's size within 0.5 px (the final ready list's second census line). Until then the message to daraksha does not say its tab pictures are covered. The triage line is corrected in place.
- *Which text rules.* The amendment rule in the header is by kind, not by position on the page: a paragraph that begins *Amended* outranks any unamended text in this file, the by-file triage included, wherever each sits. The triage line restates rulings and decides nothing; where it and a ruling disagree, the ruling stands and the line is corrected.
- *Row 1 is not reopened.* The icon seat's rule covers all four forms as built, so "row 1 built" stands. Row 4 is not part of this gap and stands as written.
Gate: none new. G-13's census line as the final ready list writes it ("every unsized glyph box, in an icon seat or a tab seat, in any of the four forms"). Plant, named here so the line bites on this row: the tab seat's rule cut back to `> svg` (RED on the tab seat holding a picture). Touches: `tab-button.css:158`; no new name, since `data-dock-glyph` is already counted.
The final seventh-pass order and the final ready list do not change: step 4 already builds the four forms on a tab seat and the ready list already reads them. Step 10's message to daraksha (through value.js) carries the row's state at booking.
