# W-I.8: the rulings on the measuring pass

The ruling seat, claude-fable-5-2, 2026-11-15, in two passes the same day. I wrote none of the ledger, the prototype, the challenge, the fold or the measurement. I launched no browser and no build, and changed no source.

- **The first pass** (RU-1 to RU-15) ruled on the measuring pass's reading of `a46a20906`. Its evidence lines quote that MEASURE.md, which is now `git show 9e45d2116:docs/tranches/BL/design/dock/wi8/MEASURE.md`.
- **The second pass** (RU-16 to RU-20, at the end) ran after the prototype seat had built RU-1 to RU-15 and measured `d609c44b4`, and after O-357 arrived (`INPUT-controls-seat-2026-11-15.md`). It reverses no ruling of the first.

**What I read.** `waves/W-I.8.md` at `a07a3f7f5` in full; `MEASURE.md`; `fold.md`; `OWNER-READ.md`; `challenge.md` by finding; `docs/precepts/motion-canon.md` (P0 and P0a), `restraint.md` and `affordance-map.md` for their dock lines; INBOUND O-330, O-340, O-341, O-347, O-348, O-352, O-353; `audit/last-ten/FINDINGS.md`; atlas's `89f1df7c1`, `2b6d1b1ea` and the `run` prop's text on `u/sp-integ-glass`, by `git show`; the prototype's `useDockState.ts` in the worktree at `14e29ff30`, read only.

**What is arithmetic and not a reading.** Where a line says *derived*, I evaluated the spring the preset names (response 0.3 s, ζ 0.88) by hand: its position is 1.4 % of travel at 8.3 ms, 5.0 % at 16.7 ms, 16 % at 33 ms, 30 % at 50 ms, 44 % at 67 ms, 56 % at 83 ms, 67 % at 100 ms, 92 % at 167 ms; its overshoot is 0.3 % of travel. MEASURE's own figures agree where they overlap (a first step of about 1.5 % at 8.3 ms and 4.6 to 5.7 % at 15 to 17 ms). The judge computes these from the build's export; the numbers here are for the reader.

Each ruling is cited in `W-I.8.md` as RU-n.

## The three findings

**RU-1. A press outside is a dismissal whatever is open; the holds answer only the linger.**
Evidence: MEASURE G-8, "Press outside: the Popover closes at 16 ms and the dock folds 7073 ms later, by the linger" (WebKit 7084 ms); v11.0.1 folds at 31 ms.
Reason: the prototype did not grow a new behaviour, it exposed an old guard. On v11.0.1 the Popover reached no dock context, held nothing, and the outside press folded the dock. Through the outlet the Popover now takes a hold, and the outside-press handler returns early when the hold count is above zero (`useDockState.ts`, `onPointerDownOutside`, the second line). The hold exists so the linger cannot fold a dock under an open menu. It was never meant to veto a press.
The rule: a press is outside when its target is in neither the dock's root nor an overlay opened from the dock. It folds the dock in that event. No hold is consulted, and a travel in progress does not suppress it. The overlays close with the fold by their own exits.
The prototype changes: delete the handler's return on the hold count; delete its return while a travel runs (it guarded a press landing on the root while the layers took no pointer events, which hit-follows-paint removed); keep the two containment tests.

**RU-2. Every motion bound is stated in time; the content window widens to 0.55; the spring is not softened.**
Evidence: MEASURE G-2, WebKit: "First step 2.7 to 6.3 % against the 4 % cap (the preset's own first step at 15 to 17 ms is 4.6 to 5.7 %, so the cap, not the carrier, decides); fades 2 to 3 samples against 5 (a 35 % window of `e` lasts about 50 ms)". Chromium: "a summary or full face steps 0.41 in 60 Hz on 2 segments".
The three choices, and why this one:
- *A softer attack* is refused. The spring already leaves rest at no speed, and in time the two engines draw the same curve. Softening it would slow the dock in both engines to satisfy a number that was read at 120 Hz. The eye sees distance against time, and that does not differ.
- *A cap per frame time* is taken, as its general form. The first-step cap becomes "at every row of the first 34 ms the edge has covered no more than 1.15 times what the preset has covered in that time". The any-row bound was already of this form. "Within two frames" becomes 34 ms. The five-sample count becomes a duration. Nothing a viewer would see as a jump is let through: a reversed unfold's 7 to 23 % in a row still fails in both engines, and so does the 0.41 opacity step.
- *Wider windows* are taken too, because that fault is real and not the gate's. P0a says "a leg is at least five frames long. A cut given two frames is still a cut", and a 50 ms fade is three frames at 60 Hz. One window, `w(x) = clamp(1 − x / 0.55)`: out is `w(e)`, in is `w(1 − e)`. Derived: the leaving content gets 82 ms with a largest 60 Hz step of 0.25; the entering content runs from 68 ms to the landing; a fold is the same pair backward, so its fades are as long. The two overlap from 45 to 55 % at under 0.2 each, so the plate is never empty and never holds two things at strength. That also settles the form of the swap (OQ-4). atlas's reference build uses 0.4 and 0.6 for the same reason. The 0.55 is derived and unread; step 3 of the build reads it in WebKit.
Two bounds go with the same reasoning, since no dock on this preset could pass them: the 0.5 px cap on the preset's own return (0.3 % of a wide dock's travel is more), and the return as "once" (at 60 Hz it is several small rows; MEASURE reads 2 to 6 steps of 0.14 to 0.37 px). It becomes one consecutive run at the end, no more than 1.15 times the preset's overshoot.

**RU-3. A collapsed dock opens by a pointer move, a press or keyboard focus, and never by a scroll.**
Evidence: MEASURE G-1 (b), WebKit: "opens under a still pointer at 700 ms (RED also, 741 ms)"; note: "WebKit fires a pointer event when the page scrolls under a still pointer".
The rule: a pointer event is a move only when its client coordinates differ from the last pointer event this dock saw, an enter included. An enter alone arms nothing. The prototype arms on the enter and counts any `pointermove` (`onPointerMoveInside`), and after a scroll WebKit sends both with unchanged coordinates.
The other half, so the rule is whole: any re-entry cancels a running linger, a scrolled one included, because a dock should not fold under the pointer (G-1 (m)).
It is a shipped defect as well; 11.1.1 may land the cure first, and the carrier then carries it.

## The inputs since the fold

**RU-4. The controls dock is one component, `ControlsDock`, over one preset and one new run mode.**
Evidence: O-347 (2), the owner: "like a controls button that is a dock, too"; O-352: atlas's `run="plain"` and `hoverIntent` exist only on its line (`PlateDock.vue:285-286`).
It is a GlassDock with a plain run (atlas's prop as written), a corner, a toolbar's name and a fold to one seat on a phone. The figure dock, fourier's canvas docks, keyframes's code-pane dock, sci-report's filters and the theme seat are all it. The figure preset of the earlier text is folded into it, and `hoverIntent` is the `--dock-intent` token. Cut from it: a component per use, a visible label element (words go in the folded face), coupling between two docks, a wrap to a second row, seats that yield.

**RU-5. atlas's growing rule is the reference build and is not merged.**
Evidence: `git show 89f1df7c1`: "the box reserves and scales both ... the capsule corner is half the visible cross size in every frame, counter-scaled on both axes".
Its law is this text's R-4 and R-5. Its mechanism, a scaled box with a counter-scaled corner, is master's, and the audit traced the flat ends, the settle tick and the shadow swap to that mechanism (dock F6, F10, F13). So glass keeps the carrier that writes px. The carrier's many quantities are one curve from rest, as atlas's one scalar is; they are kept apart only so a change mid-travel turns each from where it is, which atlas's "continues from the live box and velocity" also needs. Its per-frame witness runs once against the carrier's rows as a second RED. Two of its rules are taken: a press during a resize travel is never deferred, and windows wider than a third.

**RU-6. A return during a fold reopens at every point, at once.**
Evidence: LT-4: "re-hover at 25 % of the fold: no reopen, folds to 56 px; at 50/75 %: folds 83 ms more"; MEASURE G-3: the prototype turns in 2 to 3 frames in Chromium and 1 to 2 in WebKit.
The cause on 11.1.0 is the intent wait applied to a return. The rule was already R-2's; it gains the 25 % cell, a return by a press, and a bound in time (34 ms), under which the prototype's turn passes in both engines. What still fails is a reversed unfold, which is step 2 of the build.

**RU-7. Escape belongs to the innermost thing open; O-353 rows 2 to 5 are 11.1.1's, and this design states two rules.**
Evidence: O-353: "(2) Escape on a dock Select folds the whole dock and strands focus (`GlassDock.vue:271-278`)"; MEASURE G-8: one Escape with a Popover open folds the dock at 9 ms.
Rows 3 and 4 are overlay defects and this design changes nothing. Row 2 is a defect of the shipped gate, and the prototype has it too, so the rule is written in R-2 and gated in G-8: the first Escape closes the overlay and leaves the dock; the second folds it and puts focus on the folded face. Row 5's first half cannot arise once a dialog holds its dock like any overlay; the rule that returning focus never lands on an inert seat is in R-2 and G-13. This is not at odds with RU-1: a press outside everything dismisses everything, and Escape peels one layer, as the platform's menus do.

**RU-8. The run's open seat is built as quantities of the loop.**
Evidence: MEASURE: "the seat's `inline-size` leg is still in `styles/controls/icon-button.css:80`, so G-12 fails on it"; "not built ... it is a new quantity of the loop".
It cannot be struck: while a 210 ms layout transition runs inside the run, the plate's target moves every frame, so the carrier and the transition fight on every page change. It is specified in R-5 in seven clauses (the layout changes once; seats translate; the mark is a small plate; the names ride `f`; the plate follows; a scroll offset is one more quantity; a second change retargets). It is the least known piece and is first in the build.

**RU-9. Rest geometry on the posture class is specified and kept.**
Evidence: C-8; MEASURE: "the card and vertical cells are not in the harness; nothing would read the change".
It is a rule and a read order, not a mechanism: posture rules select on the class, the carrier reads the new rest after the class changes. Without it the card and the vertical dock read the wrong rest corner, and atlas's rail is both. The cells are added with it.

**RU-10. The moved-dock trigger and the two-dock row are struck.**
Evidence: MEASURE: "not in the harness"; daraksha's second dock "stood about 140 px away through the collapse and jumped about 116 px in one frame" (O-299 (a)).
The composition it served is the one the controls dock replaces. With each dock on an anchor of its own, no dock moves another, and the registry needs no list to broadcast to. The README says not to put a dock whose size changes in a flex or grid row with a sibling.

**RU-11. The layer change is one movement: the entering face arrives over 8 px from its side.**
Evidence: the owner: "the transition from one dock to another layer is not smooth or well defined"; O-340's placement: "the leaving layer goes one way, the entering comes from the other, the width on the same clock".
The width on the same clock is R-5 already. The direction is added on the entering face only, 8 px (P0a: a thing that appears travels 4 to 8 px). The leaving face does not slide: P0a's rule 3 says the out fades, and C-1's cure depends on the leaving face not moving. One `translate` on one element; nothing more.

**RU-12. The reading-progress rim is the plate's child.**
Evidence: O-341 (3): "the reading-progress rim following a collapsed dock".
With the root painting nothing, a rim on the root would outline a box nobody sees. As the plate's child with the plate's radius it follows every state and frame with no geometry of its own. G-2 gains one cell.

**RU-13. The pill's corner is half its painted cross extent in every frame and at every rest; the cut cap leaves the plate.**
Evidence: the owner, five times: "Rounded."; MEASURE G-2: "At open rest the pill's trailing corners are 27 px, not 28: the cut cap returns at rest, so the corner steps 1 px on the first and last row of each travel".
The measuring pass stood the cap down only during travel, which left the step at each end. A scrolled dock with a tightened corner is also not a stadium. `INDEX.md` already strikes the cap in W-I.1; the strike is taken into the carrier. The halo colour is one token, `--dock-halo`, read by the one shadow (O-341 (12)).

## The five unbuilt pieces

| piece | ruling | where |
|---|---|---|
| the open-seat loop quantity | specified, built first | RU-8; R-5 |
| rest geometry on the posture class | specified | RU-9; R-1 |
| the moved-dock trigger and the two-dock row | struck | RU-10 |
| the fission seat's neck with tangent arcs | out of 11.2.0; 12.0.0 behind one crop | RU-14; R-6 |
| the labelled seat's room | struck | RU-15; R-7 |

**RU-14. The fission seat leaves 11.2.0.**
Evidence: MEASURE G-5, WebKit: "flat deviation 204 to 209 and junction 103.5 at every held value: the WebKit leaf does not read as one surface"; Chromium: "flat deviation up to 42 (bound 2)"; the earlier R-6: "If B fails 1, 2, 4 or 6, the build stops and reports; it does not invent a third."
Three necks, two build passes, no pass in either engine, and the last one fails hardest in the engine the owner named ("with safari compat"). The earlier text's own stop rule applies. `restraint.md` keeps fission and fusion as the owner's ruled morph, so the piece is delayed and not ended: one still crop of a cut glass leaf in WebKit and Safari reopens it for 12.0.0. In 11.2.0 the theme seat is a round controls dock of its own, which meets "a separated icon from the dock, though with a dock bg" and does not meet "fuse into the main dock"; that is said to the owner in plain words (OQ-5).

**RU-15. The labelled seat is struck; names go above the seat, by Tooltip.**
Evidence: C-13; MEASURE G-6: "at 390 marks and settings not shown though 'fit'; the room is the open seat's"; the owner's word was "potentially", with the bound "keeping the dock the same size".
Built twice, it overprinted and fit by accident, served no coarse pointer, vertical dock or persistent seat, and waited on 12.0.0's flat seats in any case. It also tweened every seat of the run on each hover, against the second bound. A name above the seat, as the macOS Dock shows it, keeps the dock the same size, moves nothing, and has a touch form (a press and hold that does not fire, O-348 row 3). It is Tooltip's, with its touch path, and the orchestrator places it. The 0 px hover guard, the part that passed in both engines, stays as G-6.

## What I did not decide

- The brush (OQ-2). No record rules it and his latest word asks for longer.
- What a scrolling run draws on its port once the cap leaves the plate. W-I.1's.
- Which wave builds the names above the seats. The orchestrator's.
- Whether real Safari agrees with WebKit 2287 on any of this. Nothing has read it.

## The second pass

**What I read.** `INPUT-controls-seat-2026-11-15.md` and two of its frames (`~/.dev-logs/owner-1112/frames-pages-19/seat-open-colour-390-light-mode.png`, `seat-closed-colour-390-light-mode.png`: one round seat at the page's top end corner, the control when open and a palette glyph when folded). The worktree's `git log` from `a46a20906` to `d609c44b4`. The second build's logs in the worktree under `docs/tranches/BL/design/dock/wi8/measure/logs/`, by name in each evidence line. `useDockState.ts`, `dockContext.ts` and `styles/layers.css` at `d609c44b4`, read only.

**What the record was when I read it.** MEASURE.md on master was mid-rewrite by the prototype seat: its commit table and its two findings are written, its gate table is the placeholder `__GATE_TABLE__`. `side-webkit.log` holds one line, a wait on the WebKit lock, and no process of that run was alive: the WebKit clock and the WebKit G-13 never ran on the second build. So the evidence lines below quote logs, not MEASURE.md, and W-I.8's table says which engine each number is from.

### What the second build says of the first pass's rulings

| ruling | built | read on `d609c44b4` |
|---|---|---|
| RU-1, a press outside | `494a160fa` | `overlay-p2-*.txt`: fold at 8 ms (Chromium) and 16 ms (WebKit), the Popover gone at 133 ms, the plate lands at 458 and 465 ms. Confirmed in both |
| RU-2, bounds in time; 0.55 | `ff98a72fe`, `a477d97f4` | `judge-p2-*.txt`: opacity between samples 16.7 ms apart is 0.20 to 0.26 on every fold cell in both engines; 94 and 95 of 105 fold segments pass, where WebKit passed 0 of 42 under the old bounds. 0.55 stands |
| RU-3, never a scroll | `f3f5d94c0`, `6b657870e` | `clock2.proto.chromium.json` (b): no open through the scroll, open 67 ms after the move. **WebKit, where it failed, is unread** |
| RU-6, a return mid-fold | the same two | `gates-p2-*.txt` G-3: 18 of 18 in Chromium, 17 of 18 in WebKit; see RU-19 for the one |
| RU-7, Escape by layer | `13f4e7303` | `overlay-p2-*.txt`: after the first Escape the dock is open and the Popover gone; the second folds at 8 and 15 ms. Confirmed in both |
| RU-8, the open seat | `fdea313b2`, `1e8b67bc6` | `seat-p2-*.txt`: at 1440 all three cells pass in both, the plate moves 0 px. At 390 the far and twice cells fail in both (the scroll offset) |
| RU-9, RU-13, rest geometry and the corner | `6d28db4a0`, `b4da5627f` | card and rail cells pass in both; no corner failure in any P2 gate summary; `g12-p2.txt`: no `border-radius` on the plate in a scroll timeline, one shadow reading `--dock-halo` |
| RU-4, the controls dock | `95004b894` | two corners, the outlet into it, one seat: pass in both. `g13.chromium.json`: a named toolbar, 0 seats clipped at 360 |
| RU-11, the entering 8 px | `a477d97f4` | no clause of any log reads the 8 px; unread |
| RU-12, the rim on the plate | not built | no cell |
| RU-14, RU-15 | `3e4b5ad8c` | struck from the prototype |

### The rulings

**RU-16. An overlay opened from the dock is part of the dock, for a press and for focus, however the dock was opened.**
Evidence: O-357 (2): "A press-opened dock folds when focus moves into a dialog one of its controls opened, so the control leaves the page and focus cannot return to it. The site holds it by hand."; `useDockState.ts:561-572`: focus-out stays when the related target is in the root or `isTeleportedTarget(e.relatedTarget, dockId)`, and a press-opened dock that is not held folds at once.
Reason: the test for "still inside" already exists and already admits a menu's content. A Dialog's content does not carry the dock's mark and a Dialog takes no hold, so to the dock a dialog is somewhere else. The input asks for exactly one rule and the mechanism for it is the one in place: every glass overlay whose trigger renders under a dock's context takes a hold while open and marks its content with the dock's id. Dialog and Sheet join Menu, Select and Popover. Tooltip does not; it holds nothing.
What follows, stated once in R-2: a press inside the overlay is not outside; focus into it is not focus leaving; on close, focus returns to the control, which is live because the dock did not fold. It is the same sentence RU-7 wrote for O-353 row 5, made a rule and extended to `expandOn="press"`, which RU-7 did not cover.
Whose: a defect of the shipped dock, so 11.1.1 may land the hold; the carrier carries the rule either way, and G-8 gains the press-opened cell.

**RU-17. At rest the face that is not showing has no box.**
Evidence: O-357 (3): "A folded dock's hidden open face stays laid out beyond its folded box; hidden seats report rects outside the visible plate."; `styles/layers.css:116-120` at `d609c44b4`: an inactive layer is `opacity: 0; visibility: hidden; pointer-events: none`, so it keeps its layout box.
Reason: the shipped dock keeps the open face laid out so it can measure the open size while folded. This carrier never measures while folded; it reads the new layout once, after the class changes, inside the window. So the hidden box has no job left, and it costs a dock that reports itself larger than it paints: to an anchor, to a test, to a `within="parent"` controls dock's container.
The rule: a posture's hidden face is `display: none` at rest and has a box only while `[data-morphing]` is set. The cost is one thing, a scrolling run loses its scroll offset when its box goes, and the carrier restores it on the trigger frame.
This is a default mechanism with no reading. It is third in the build, read with the trigger frame's layouts beside it, with a stop rule: if an unfold's first row then paints late in either engine, report and stop.
Not chosen: clipping the hidden face to the plate (the seats would still report rectangles outside it, which is the fault as filed); `content-visibility` (a forced read still returns the children's boxes).

**RU-18. A controls dock with one seat is that seat, at rest, and never folds.**
Evidence: O-357: "a controls dock with one seat renders that control at rest and never folds (a fold that hides one control behind one press is a wasted press on a phone)"; the two frames above show the built version doing the opposite, a palette glyph standing for one eyedropper.
The first pass already wrote this in R-12 from the design's own logic; the input makes it the stated default with its reason. Read: the one-seat cell shows no plate travel in either engine (`judge-p2-*.txt`, `p2-ctl1-*`: no edge moves).

**RU-19. Four bounds are restated from the second build. None admits a step an eye would see.**
(a) *A floor of 0.25 px on every edge bound.* Evidence: `judge-p2-webkit.txt`, `p2-fold-vert-fine`: "L 3px first 3.7% ... FAIL: L from rest 3.7% > 3.6% at 13.0 ms; ... R last 0.06 px (2.0%, f28)"; `judge-p2-chromium.txt`, `p2-swap-layers-fine`: "R 5.8px ... FAIL: R from rest 1.7% > 1.6% at 8.3 ms". A tenth of a percent of 3 px is 0.003 px. A bound in percent with no floor in pixels fails a cross axis that moves 3 px for an error nobody can see or build away. The floor is a quarter of a pixel.
(b) *The turn.* Evidence: `gates-p2-webkit.txt` G-3: "p2-rev-fold-25-press: L turns 35 ms after the reversal"; every other reversal cell turns in 15 to 33 ms in WebKit and 8 to 32 ms in Chromium. The judge reads "turn" as the edge's direction reversing. A spring that keeps its velocity cannot reverse in no time: at a quarter of a fold, where it is fastest, the preset needs about 19 ms to stop (derived by hand: ω = 20.9 rad/s, ζ 0.88, a speed near 6.5 travels per second, 0.25 of travel from the new target). At 60 Hz that is the cause's phase, up to one row, plus the stop, so 34 ms forbids the spring. Restated: the edge leaves the old travel's path within 34 ms of the cause, and its direction reverses within the preset's own stopping time from that velocity, times 1.15, plus one row. The judge derives the time. The gate's other clause, no velocity change larger than the spring's own, is what stops a carrier from passing by cutting.
(c) *Blank rows in time.* Evidence: `gates-p2-chromium.txt` G-4: "12 rows with no face showing" against a bound of one row, where one row is 8.3 ms in one engine and 16.7 ms in the other. Restated: no blank run over 17 ms, 34 ms after a turn. The crossfade fails it by a factor of five in both engines, so nothing is let through.
(d) *Resize and reduced motion by their own clauses.* Evidence: `judge-p2-webkit.txt`, `p2-resize-pill-fine`, first segment: "L step 100.0% > 16.3% (f5, 17.0 ms)"; `seat-p2-chromium.txt`, `p2-seat-rm`: "seat#1 step 100.0%". Both land in one frame by R-1 and R-11, and the judge read them by the travel bounds. The real failure in the resize cell is its second segment, the unfold after the resize, which starts 61 to 100 % off its rest; that stays a failure.

**RU-20. The build order is re-cut; the crossfade is first.**
Evidence: `gates-p2-chromium.txt` G-4: "3 × n rows with no face showing ... 12 rows", turns "p2-swap-xf-fine:40.2ms"; `gates-p2-webkit.txt`: "5 rows with no face showing", "opacity 0.93 in 60 Hz at face#3 f101", turn 68 ms; `units-proto2.log`: "keeps entering and leaving faces co-present until the spring settles", failing.
A layer group's drill passes and the crossfade does not, so the fault is the crossfade component's and not the window's. An empty plate for a tenth of a second is exactly "not smooth or well defined", and it is the one fault left that nobody has explained, so it leads. After it: the open seat in a scrolling run, the face with no box, the seat hidden for a row at a lane edge, the dialog's hold, the unfold after a resize. The order is in W-I.8.

### What I did not decide, second pass

- Whether RU-3 holds in WebKit. The run never started.
- Why the crossfade is blank. Step 1 reads it before changing anything.
- Whether `display: none` at rest costs the first row of an unfold. Unread, with a stop rule.
- The four questions to the owner stand as they were; O-357 adds none.
