# W-I.8: the challenge

The challenger, claude-fable-5-2, 2026-11-13. I wrote none of the spec, the ledger or the prototype.

**What I read.** `waves/W-I.8.md` as rewritten; `LEDGER.md`; `PROTOTYPE.md`; `prototype/prototype.patch` in full; the row files, strips and crops under `prototype/`; the three precepts; W-B.17's rulings; the dock record. The consumers' dock mounts, read-only, by path.

**What I measured.** Nothing new in a browser. The prototype seat's WebKit run was refused by the guard at 8.01M kernel-zone elements and the zone log read 8.05M and rising when I started, so I launched no browser run. Every number below is read from the prototype's own row files (`prototype/rows/proto/*.rows.json`), its crops, or its source. Row numbers are row indices in the named file. Paths are relative to this folder unless they start with `src/` or `~`.

**The short of it.** The carrier's plate is good: its edges leave rest at 1 to 2 %, never exceed the spring's step, land within 0.11 px, and the cross axis glides. What rides the plate is not. On every fold the open dock's controls are cut in the first frame, and the prototype's tables call that a pass. On every unfold two regions paint on top of each other for about 100 ms. A return mid-fold empties the dock for seven rows. The fission seat has no neck that passes its own readings, its gap is not the page, and it parts in about 25 ms. The labelled seat prints its name over its neighbour's glyph. None of it has a WebKit reading. The fold seat should treat the prototype's gate table as unproven and re-read after the cures below.

Findings are numbered C-1 to C-24, heaviest first inside each part.

---

## Part 1 · Nothing changes instantly

### C-1. Every fold cuts the open dock's controls in its first frame, and the gates pass it

- **Evidence, the plain pill** (`rows/proto/fold-w-pill-fine.wi8.chromium.1440-fine-light.rows.json`). Row 163, open at rest: the layers region is 628 by 184 with no clip; seats at x 628, 676, 724, 772. Row 164, the first row of the fold: the layers region is **700 by 40** with `clip-path: inset(0px round 28px)`; the seats are at 624, 672, 720, 768 with effective opacity 1. The region's box is already the collapsed summary's, and its clip is that 40 px box. Seats 0 and 3 lie wholly outside it and seats 1 and 2 are cut through.
- **Seen:** `rows/proto/fold-w-pill-fine.wi8.chromium.1440-fine-light.seg3.start.png`, frame f165: a 208 px plate holding one sliver of the Library glyph and nothing else. The four controls never fade; they are gone.
- **The standard dock is the same** (`fold-w-std-neckb-fine`, row 170: layers 694 by 40, the same clip; `rows/proto/fold-w-std-neckb-fine...seg3.start.png` f171 shows Home, a fragment of a label and the theme seat).
- **Also in that row:** the leaving face is placed 4 px off where it painted (pill: the face 624 to 620 and every seat 4 px left; standard: 535.5 to 531.5). That is a first-frame jump of its own, hidden only by the cut.
- **Cause** (`prototype.patch`, `useDockBody.ts` `clipTo`): each clip inset is `Math.max(0, …)`, so the clip can never be larger than the region's own layout box. On a fold the region's layout box is the summary's, and the leaving run, placed out of flow, lies outside it.
- **Why the tables pass it:** the judge reads each seat's opacity and its box against the plate. It does not read an ancestor's clip. "Content inside the plate: 0 px on every row" is true because the content is clipped to nothing.
- **This is the wave's first law broken on its headline cell.** O-248 and O-288 are about exactly this frame.
- **Amendment.**
  - R-1, "The plate's edge is the only clip": the clip is the plate's painted box in the region's coordinates, and its insets may be negative. A region's own layout box is never a clip edge.
  - The bounds gain one: **visible until covered.** A unit whose effective opacity is above 0.1 and whose box lies inside the plate's painted box has a non-empty visible box, read through every ancestor's `clip-path` and `overflow`. The probe reads the clip chain.
  - G-2's bound "the first frame" also binds the leaving face's own position: it moves 0 px in the first row.
  - PROTOTYPE's rows for "content inside the plate" and for opacity on every fold cell are withdrawn until re-read with that bound.

### C-2. On the unfold, regions paint on top of each other

- **Evidence** (`fold-w-std-neckb-fine`, rows 35 to 48, 290 to 398 ms). The persistent region (Home, 40 px) rides the plate's leading edge from x 681 to 489. The layers region is laid out 349 px wide at once and moves only 33 px. Home therefore sweeps across the run's first seat:

  | row | Home spans | seat 0 at | seat 0 opacity |
  |---|---|---|---|
  | 38 | 573.8 to 613.8 | 554.0 | 0.60 |
  | 40 | 553.4 to 593.4 | 550.5 | 0.90 |
  | 41 | 544.5 to 584.5 | 549.0 | 1 |
  | 44 | 523.8 to 563.8 | 545.4 | 1 |
  | 48 | 505.1 to 545.1 | 542.2 | 1 |

  From row 41 both are at full opacity and overlap by up to 35 px. Strip: `strips/proto.fold-w-std-neckb-fine...seg1.start.png`, f37 and f38 (the house glyph over the book glyph).
- **The theme glyph does the same at the other end.** Below half the travel the seat is fused, its glyph rides the plate's trailing edge, and the run's seats under it are not clipped away. Rows 36 and 37: the glyph's region spans 790 to 864 while seat 3 sits at 817 to 857, both at 0.24 to 0.42. Same strip, f37.
- **Cause.** The spec says "a region moves by `translate`" and does not say which point of a region is carried when its size changes. The prototype carries the centre.
- **Amendment.**
  - R-1 states it: a region is carried by the edge it shares with its neighbour or with the plate, never by its centre, and while travel runs each region is clipped to its own lane (between its neighbours' painted edges), not only to the plate.
  - R-6: while the seat is fused its glyph has a lane too, or it is not painted until the seat parts (C-4).
  - A bound is added to G-2 and G-5: no two units of different regions intersect while both are above 0.1.

### C-3. A return mid-fold empties the dock, and content runs on a second clock

- **Evidence** (`rev-fold-w-pill-30`, the pointer returns at row 168). The run fades out by row 167. Rows 167 to 173, 58 ms: every face is under 0.06 while the plate is 138 to 152 px wide. The run then goes 0.03 to 1.00 in six rows (174 to 180), which is 0.2 a row, while the plate needs until row 202 to land.
- **The spec promised the opposite.** R-3: "Both are functions of one number, so a reversal runs the same curve back and no opacity jumps." The prototype's `exchange()` sets the content's own spring back to its start on every change (`u = 1; uv = 0`), so content restarts at rest while the plate keeps its velocity. That is two things on two clocks. G-4 allows two blank rows; this is seven.
- **Amendment.**
  - For a posture change the content's `f` is the plate's own posture coordinate, read each frame, never a second spring. A reversal then evaluates the same two windows backward and the run starts returning in the row the plate turns.
  - For a swap with no posture change, a return to the face still on screen inverts the running coordinate; it does not restart it. R-5's "leaves from its painted opacity over the new travel's first window" stays for a third, different face only.
  - G-3 gains the count: after a turn, at most two rows with every face under 0.1.

### C-4. The seat parts and fuses in about 25 ms, with no eased start, and its glyph is out of step with it

- **Evidence.** `rows/proto/fold-w-std-neckb-fine...seg3.start.png`: f175 two shapes, f176 a waist, f177 a cusp, f179 one capsule. PROTOTYPE's own table: the gap's steps are 8.6 to 11 % against a bound near 8 %.
- **Cause.** R-6's `p = clamp((f − 0.5) / 0.5, 0, 1)` starts at mid-travel, where the spring is at its fastest, and runs at twice its rate. The gap goes from still to full speed in one row. That is a gesture with no clean first frame, on the one piece the owner asked to be "smoother" (O-304).
- **The glyph is on R-3's windows, not on `p`.** On the fold it is gone at 35 % of the travel and the plates fuse between 0 and 50 %, so an empty plate does the fusing (f177). On the unfold it appears at 35 % inside the fused pill, on top of a run seat (C-2).
- **`p` is read from the plate's extent** (`write()`: `e` from `extents.open`, which is set only on a posture change, and `rest()` calls `write()` again for an open dock with a seat). By reading: after a layer swap to a narrower face, `e` rests under 1, the neck returns at rest, and under half the old width the seat fuses while the dock is open. `--dock-expand-t` rests off 1 with it. No cell holds a layer group with `#beside`, so this is unmeasured.
- **Amendment.**
  - `p` is a function with no slope at either end, over more of the travel than its second half. The 0.5 and the straight line are struck. The prototype shows two strips for the owner.
  - The seat's glyph is a function of `p`: not painted while fused, whole when parted.
  - `p` and `--dock-expand-t` are quantities of the posture travel only. A content change never moves them. G-4 adds the cell "a layer swap in a dock with `#beside`", and G-9 reads the property at rest after it.
  - G-5 names the gap in the first-frame bound.

### C-5. A control that leaves the DOM is cut by rule

- R-3: "one that leaves the DOM is gone in that frame and its neighbours glide." P0: "An exit is an animation too, never a cut." The persistent regions are behind glass's own `v-if` (`GlassDock.vue`), so the dock itself makes this cut when a region unmounts (dock F4, 231 to 181 px).
- W-B.17 R-7 already has the answer (a node Vue removes is held until its fade ends), and the task's rule is that the dock uses it.
- **Amendment.** R-3: a control or region that leaves is held for the first window and fades on it. Glass holds its own regions; a consumer's `v-if` seat is held by W-B.17's presence, and the README says so. G-4's cells "a seat removed" and "a persistent region unmounting" read a fade of at least five samples.

### C-6. The out-then-in exchange is the form W-B.17 struck

- R-3 leaves an instant where neither face shows. The rows read one row under 0.1 and three under 0.3 on a plain unfold (`fold-w-std-neckb-fine` rows 34 to 36), which is small. The ledger still records it as a fault twice (L-9: O-306, color C-04), and W-B.17 R-7 struck the same form for a pair in one seat ("left the seat empty for 50 to 75 ms ... could not turn round").
- A dock with a persistent region is never empty. A plain pill is.
- **Amendment.** The strip for OQ-4 is still owed (P-4 was not built), and it shows two forms beside bp13's: the windows as written, and windows that overlap so the two faces sum to at least 0.3 in every row. The owner picks from three.

### C-7. In a flex or grid parent the dock's neighbours jump, and that is where docks live

- R-1's in-flow clause writes the root's margins. The prototype found it only works in block flow ("in a flex or grid parent a margin moves the dock itself and the model goes stale") and built the block margin alone.
- The root's layout box changes in one frame by design (row 28 of `fold-w-std-neckb-fine`: the root is 485 px while the plate paints 94). Anything laid out against it moves in that frame.
- daraksha today is two docks in one centred grid row (C-22). When one changes width the other's box moves and nothing tells its carrier: a resize observer does not fire on a move.
- The viewport-resize trigger R-1 lists is not built either. A dock that moved without resizing keeps a stale model, and its next travel starts from the wrong place.
- **Amendment.** R-1 says what holds in a flex or grid parent, in one sentence, and gates it: either the dock's outer box is the travel's largest extent for the length of the travel, or the README rules that a dock whose size changes is out of flow. G-2 gains a cell with two docks in a centred row. The position trigger is built and gated (a window resize, then an unfold: the first row equals the rest).

### C-8. The card and the vertical dock were not run, and by reading they are wrong

- G-2 lists "pill, rounded and card; horizontal and vertical". The prototype ran pill and rounded, horizontal.
- Glass's own card corner is a lerp on `--dock-expand-t` on the root (`styles/shell.css`, the `.shape-card` rules). The carrier now leaves that property inline at the old rest value, and reads the new rest corner from the root while it still holds it. The target corner it reads is the old one. For a card opening it reads the pill, takes the plate for a capsule, and draws half the cross extent as the corner for the whole travel; at rest the inline corner is removed and the card's own corner lands in one frame.
- The prototype met the same trap in padding and added a second property, `--dock-rest-t` (`styles/morph.css`). R-10 says "No name is added", and the cut list repeats it.
- **Amendment.** R-10: the published property drives paint only. A rule that sizes or shapes a box from it is read at the wrong value and lays out every frame. Rest geometry is keyed on the posture class. Either `--dock-rest-t` is named in the spec as internal, or the padding and corner rules are rewritten on the class. G-2's card and vertical cells are run before the build starts, atlas's rail among them (C-23).

### C-9. Hit does not follow paint

- R-1 rules it. The patch adds no `pointer-events` rule, and the hover listeners are on the root, whose box is the new layout from the first row. During a fold the plate still paints 150 px either side of a 56 px root; a pointer that comes back onto that glass is outside the dock and nothing reverses.
- G-3 drove the return to the centre, so it did not see this.
- **Amendment.** Build it, and G-3 returns the pointer to a point inside the painted plate and outside the collapsed box.

### C-10. Smaller motion readings

- **The preset overshoots, and R-6 says it has none.** `fold-w-std-neckb-fine` rows 61 to 69: the plate is 485.41 to 486.16 px against a rest of 485, still out at 573 ms. One pixel is not a bounce, but "no reversal" as written fails on every cell. The bound names the preset's own overshoot (0.3 % of travel) or the preset is changed; the sentence in R-6 is corrected.
- **The run's open seat still tweens `inline-size`.** The patch moves the leg into the seat's list (`styles/controls/icon-button.css`); R-5 deletes it and G-12 forbids it. It lays out every frame for 210 ms on every page change. PROTOTYPE lists the loop quantity as not built; the spec's order of build should say the leg cannot ship in the seat's list as a stopgap.
- **Reduced motion:** `swap-xf-rm` moves geometry on two frames, and `fold-w-rounded-rm` reads an opacity step of 0.48. Both are over G-10.
- **Layouts per frame:** the median is 1 and the largest is 3. G-11 says one at most.

---

## Part 2 · No overuse of shading, transition or markup

### C-11. The gap is not the page

- **Evidence.** `look/std-open.png`, open at rest: a pale band runs from the main plate to the seat's plate, top to bottom, brighter than the page. `neck/neck.proto.chromium.1440.light.flat.b.p1.png`: the two capsules sit on a straight-edged pale shape the size of the row. `neck/neck.proto.chromium.1440.dark.stripes.a.p0.5.png`: the page's stripes are erased inside the gap, so something with a surface or a backdrop covers the row's box there.
- R-6 says "the gap stays the page". As built, the seat is not separate from the dock; it is a second pill on the dock's ghost. O-279 asked for "a separated icon".
- **The one-shadow leaf adds to it.** Its shadow is the outline of the row's box, so two parted shapes rest in the halo of one capsule. PROTOTYPE says the same in its own words ("a pale notch inside the row's halo").
- **Amendment.**
  - Find what paints the row's box (the root's own surface, pending the intake's "the root paints nothing", or the leaf) and remove it. P-1 gains a reading: at open rest every gap pixel is within 2 of 255 of the page, flat and striped, light and dark.
  - The shadow follows the shapes that are there. One shadow on each plate is still one shadow per surface. The dark slot the spec feared between two shadows is 8 % alpha at 12 to 20 px of blur; it is read on a crop before a leaf is built to avoid it. The leaf is struck unless that crop shows a slot.

### C-12. No neck passes the spec's own readings, and the reading that decides was not taken

- **A, three leaves.** Flat deviation 25 (bound 2). Stripe junction 88.6 (bound 4). The hand-over moves the main plate's edge by the seat's width in one row, with a hairline where the three borders meet (`strips/proto.fold-w-std-necka-fine...seg1.start.png`, f39), and a reversal at 50 % snaps 51.6 px. At `p` = 0.5 the neck is a slab with square shoulders (`neck...dark.stripes.a.p0.5.png`). It fails 2 and 4. It is not goo.
- **B, one leaf.** Flat deviation 20 to 22 at `p` = 0.75 in light (bound 2; PROTOTYPE says the corner exclusion was changed and not rerun). The edge reading is 14.8 to 34.9 (bound 2), so it fails 3. Its waist was built from cubic curves, not the tangent arcs the spec describes, and pinches to two bright darts (`neck...light.flat.b.p0.5.png`).
- **Reading 1**, the backdrop kept in WebKit, is the reading the choice exists for. It has no value for either design.
- By the spec's rule ("If neither passes, the build stops and reports; it does not invent a third") step 6 cannot start.
- **Amendment.** The spec says so in its order of build: the fission seat is not in 11.2.0 until one neck passes all five readings in both engines. A is out now. B is rebuilt with the arcs as specified and with C-4's `p`, C-11's gap and the rerun of reading 2; reading 3's bound is restated for what a clipped leaf can do (the facing ends have no hairline by construction), with the owner shown the crop. WebKit reading 1 comes first, since a failure there ends B as well.

### C-13. The labelled seat prints its name over its neighbour's glyph, and fits only by an accident of which page is current

- **Over the glyph.** `label/label.proto.chromium.1440.a.marks.mid.png`: "Bookmarks" with the Library glyph through its third letter. `...marks.end.png`, at rest: the glyph still touches the B. `label/label.proto.chromium.390.a.library.end.png`: the search glyph's handle under the L. The name is readable at 59 to 62 ms; the neighbours' shift takes 210 ms. The floors (4 px round an icon, 2 px of gap, in `useDockLabels.ts`) pack them touching.
- **Fits by accident.** `label/label.proto.chromium.json`: the current page's seat (seat 0) is the run's open seat, 136 px wide with its glyph alone in it. Its own name does not fit (need 116, room 58) and is never shown. Every other seat's room (124 to 169) is that seat's empty width. Make the last seat current and nothing before it has room. At 390, two of four show.
- **A dead gap at rest.** `look/std-open.png`: Home, 98 px of nothing, the book, 97 px of nothing, then the others at a 48 px pitch. The run already had one way to name a seat (the open seat, in flow). R-7 adds a second and never mentions the first. `restraint.md`: "no dead gaps".
- **Not W-B.17's plate.** R-7: "A labelled seat is a `.plate` from its first release". The patch sets `::before { content: none }` on it, which removes the element W-B.17's plate is, and writes its own hover as a `color-mix` on `background-color` (W-B.17 R-1: "no colour ever transitions"). G-6's flatness reading would be read on something that is not the piece. W-B.17 R-4 also holds every plate site in 11.2.0 behind the owner's pick of strength; R-7 does not carry that hold.
- **Bold.** `.dock-seat-label` is `font-weight: 550`. `restraint.md`: size carries hierarchy, and O-303 asked for "larger", not heavier.
- **Who never sees a name.** A touch pointer, a vertical dock, and any seat in a persistent region (the listener is on the run only), which includes the Home seat R-14 puts first. Tooltip is "not in this wave" (L-30). O-276's "what do some of these dock buttons even do?" has no answer on a phone.
- **Amendment.** R-7 leaves 11.2.0 until all of these hold, each gated:
  - one way to name a seat: the open seat and the hover name are reconciled in the text (the current seat's name is its in-flow label, or the open seat does not widen in a dock whose seats carry `label`);
  - the name's box plus its gap never intersects another unit's glyph in any row, mid-tween and at rest, and the name's opacity is a function of the room's progress, so it cannot be read before the room exists;
  - the fit does not depend on which seat is current, read with each seat current in turn at 1440 and 390;
  - it is `.plate` as W-B.17 ships it, behind W-B.17 R-4's answer, at normal weight;
  - the text says what a coarse pointer, a vertical dock and a persistent seat get.
  - O-303 begins "potentially". The strip goes to the owner showing the seats that get no name, not only the ones that do.

### C-14. Two shadows lerped every frame, where one constant shadow removes the fault

- R-1 turns the collapsed and open shadows (12 px at 0.12, 20 px at 0.14) into `calc()` lerps on the published property, which repaints a blurred shadow at a new radius every frame of every travel.
- Nobody reads 8 px of blur and 2 % of alpha as a state. `restraint.md`: "Less and more subtle shadowing"; three or fewer elevations in an app.
- **Amendment.** One shadow for the dock in both postures. Dock F13 is then cured by deletion: no lerp, no per-frame paint, no leg to gate. If the owner wants the lift, it is asked with a crop of both.

### C-15. One dock, two hover languages in 11.2.0

- `DockControl.vue` in the patch: a seat with `label` is flat; a seat without keeps `glass-specular-track glass-capsule-hover`. The spec confirms it ("Until then an unlabelled DockControl is as 11.0.2 left it").
- The standard dock is Home (persistent, unlabelled), labelled pages, and the theme seat (unlabelled). Its seats will answer the pointer two ways side by side, one of them the gleam O-290 called "AI-like".
- **Amendment.** The gleam leaves every dock seat in 11.2.0 with the rest of the paint changes this wave already lists under "paint every consumer sees", or the labelled seat waits for 12.0.0 with it. Not half.

### C-16. Nodes, rules and hooks Apple would not ship

- **Three leaves mounted for every dock with a seat, whichever neck.** The template mounts the shadow leaf, the neck and the seat's plate under both designs; B uses none of the last two. G-11 counts 1 more node under B. With C-11's amendment the count under B is 0.
- **A test hook in the source.** `window.__dockHold` is written by every dock at setup (`GlassDock.vue`). It goes behind the dev flag or out; G-11's boot-graph bound should name it.
- **A lookup every frame.** `writeExpandT()` calls `closest("[data-dock-scope]")` on each frame of travel. Found once per travel.
- **The dock re-implements W-B.17's glyph.** `styles/beside.css` carries its own `[data-glyph="turn"]` rule (45° on the dock spring). R-6 says the hover "is W-B.17's" and "the dock adds no lift". The rule is deleted; the attribute alone is set.
- **A wrapper component and a face mark per outlet** (`DockOutletScope`, `DockFace`). Neither renders an element, so G-7's "direct children" can hold; the gate should count rendered elements, since the spec's "0 for the outlet; 0 wrappers" is about nodes.
- **The custom property on the root restyles the whole dock each frame.** The cost table reads script time and layouts. It does not read style recalculation or paint, which is where an inherited property and a lerped shadow cost. G-11 reads both from the trace.

### C-17. The linger

- **The owner's "based on dwell time too" is off by default.** In 11.2.0 `--dock-linger-max` equals `--dock-linger`, so the linger is 6 s whatever the visit. O-275 is not overruled by the later words, which ask only for longer. OQ-2 holds the question; the default answers it against the owner's sentence. Default: the growth ships on.
- **A brush costs 6 s.** Intent is 60 ms from the first movement, so a pointer crossing a 56 px pill on its way elsewhere opens the dock and it stays open for 6 s over the page. With dwell in the formula the natural answer is a floor that starts at the 3.6 s he called too short only after a real visit. One strip, with the question put plainly.
- **PROTOTYPE's defect 5 is a misreading.** `harness/clock.mjs:77` runs case d with `--dock-linger-max: 12s`, as G-1 (d) specifies. 12 006 ms after a 12 s visit is the expected value. What is unread is the default: a 12 s visit with the tokens untouched must fold at 6 s.
- **R-2 says two things about a tap.** "A press or Enter on the folded face sets it [pinned], as today" and "A dock opened by a tap starts its linger when the finger lifts". The prototype chose: touch lingers, a mouse press pins. atlas's table pins on a tap. The text picks one per pointer, and says whether the figure preset differs.

---

## Part 3 · The records

### C-18. The prototype's gate table cannot be folded as it stands

- Its gate numbers are not the spec's (its "G-5" is content inside the plate, "G-6" the reversal, "G-8" the swap, "G-12" the hover guard; the spec's G-5 is the fission seat, G-6 the labelled seat, G-8 overlays, G-12 the static scan). A fold that copies a status by number will mark the wrong gate.
- Its judge is blind to clips (C-1) and to overlaps (C-2).
- Its defect 1, "the fission seat's content still cuts in one frame", is the hidden seat's `visibility` changing: rows 27 and 28 of `fold-w-std-neckb-fine` read opacity 1 while hidden and 0 when shown, then 0.05, 0.24, 0.42, 0.60, 0.76, 0.90, 1 over rows 35 to 41. The seat fades. The real fault there is C-4.
- Its defect 5 is C-17's misreading.
- Three batches ran on a mixed build, by its own note.
- Not read at all: every WebKit cell; the unit and release specs, so G-14, which the order of build puts before anything else; G-9; G-13; the overlay closing with the fold (G-8); a slider held through a fold (L-6, O-288, the owner's own bug); daraksha's composition with its widest control; P-4 to P-7; the card, the vertical dock, a `Select`, a route change.

### C-19. Ledger rows: what is unanswered, and where the latest word did not win

| row | state |
|---|---|
| L-1, L-5 | answered in the text; **broken in the build** (C-1) |
| L-6 | not read: no slider was held through a fold |
| L-7, L-8 | the text is right; the build does the opposite (C-3); L-8's pointer return fails outside the collapsed box (C-9) |
| L-9, L-10 | open; the strip was not shot (C-6) |
| L-3 | pill and rounded read; card unread and wrong by reading (C-8) |
| L-13 | answered by a lerp; a constant answers it with less (C-14) |
| L-16 | stated, as the ledger asked. P5's sentence is still owed, the largest reading is 3 layouts a frame, and the open seat's `inline-size` leg remains (C-10) |
| L-19 | the later word ("increased") won; the earlier, standing word ("based on dwell time too") is off by default (C-17) |
| L-25 | the tap is ruled two ways (C-17) |
| L-28 | O-290's flat seats reach labelled seats only in 11.2.0 (C-15) |
| L-30 | no home, and no name on touch (C-13) |
| L-31, L-32 | the 0 px guard holds (the plate and root do not move on a hover); the seat itself fails (C-13) |
| L-34 | the active seat's lens still lands in one frame in 11.2.0 on a live dock; the text defers it without saying a P0 fault ships |
| L-39 | "redrawn there" names no wave or release. `look/std-open.png` puts the sun beside the Settings gear, where it reads as a second gear |
| L-41, L-42 | O-279 and O-289 won in the text; no neck passes, and the gap is not the page (C-11, C-12) |
| L-43 | answered: the seat rides the travel. Its timing is C-4 |
| L-48 | not read: the recording ended inside the linger |
| L-52 | the property rests at 0 and 1 except after a swap with a seat (C-4), and a second name was added (C-8) |
| L-57 | the loop quantity is not built; the layout leg remains |
| L-64 | no Safari, and no WebKit either |

Rows not listed read as answered.

### C-20. What Safari runs, by reading

Nothing in the patch is outside current Safari on paper: `clip-path: inset(… round …)` and `path()`, the individual `translate`, `scale` and `rotate` properties, `inert`, `:has()`, `color-mix()`, `overflow: clip`, a `linear()` easing (17.2). Four things have no reading and should not be assumed:

- `clip-path: path()` rewritten every frame on a box with `backdrop-filter`. The spec says nobody has read it. This is neck B, the only neck left.
- `calc()` on a custom property inside a `color-mix()` percentage, repainted each frame (the shadow). C-14 removes it.
- A region that gains `clip-path` and `translate` for the length of a travel becomes a backdrop root for that time. The active seat's capsule is a `backdrop-filter` box inside it (until O-203 in 12.0.0). Whether its lens changes on the first and last row of a travel is unread in either engine. One held crop each side of the first row, on a live dock with an active persistent seat.
- The run's cut caps are scroll-timeline animations, which already own the plate's corner in Chromium (PROTOTYPE's defect 4) and are idle animations in WebKit (O-258). The carrier and the caps both write the plate's radius; the spec does not say who wins.

### C-21. Layout in a frame

- The plate's four insets: one leaf, stated in R-1. Accepted as stated, once P5's sentence lands.
- The root's margins for a dock in flow: the parent's layout every frame, stated. It works in block flow only (C-7).
- The open seat's `inline-size` leg: unstated, forbidden by G-12, present (C-10).
- Any consumer rule that sizes from `--dock-expand-t`: every frame, unstated (C-8). atlas has one through glass's own card rule.
- The leaving face's placement (`left`, `top`, `width`, `height`, once per travel) is one layout, not per frame. Fine.

---

## Part 4 · The consumers

Read at each repo's main checkout. Two of the spec's citations do not resolve there, which the consumer half should say: the files cited are on working lines I was not given.

### C-22. daraksha (`~/Programming/daraksha/src/shell/SiteDock.vue`, `src/scripture/ReaderDock.vue`, `src/name/NameDock.vue`)

- **As mounted:** two `GlassDock`s, both `:collapse="false"`, side by side in a centred grid, stacked in two rows under 38.2 rem. The first holds the four pages as text tabs by name. The second holds `<div id="dock-page" class="contents">` and `ThemeControl`. Pages teleport their controls into `#dock-page` (`ReaderDock.vue:51`, `NameDock.vue:11`). The spec cites `ReaderDock.vue:105,154` and `ScripturePage.vue:981-984`; neither exists here.
- **Cured:** the context reaching teleported controls (the outlet), so the `Popover keep-dock-open` at `ReaderDock.vue:94` holds and closes.
- **Left uncured or broken:**
  - Neither dock collapses, so the fission never plays. `#beside` on an always-open dock is two still plates with C-11's band between them. The owner's fission needs daraksha to fold again, and the consumer half does not say so.
  - The pages are names with no icons. `label` is for an icon seat. The "own hover-label seat" the consumer half deletes is not on disk.
  - Under 38.2 rem the dock is two rows. One `GlassDock` cannot be ("a dock that grows down" is not in this wave), so the phone keeps two docks, and the two-dock recipe was withdrawn.
  - While it stays two docks, a page change that resizes the second moves the first in one frame (C-7).
  - The outlet appends after the region's authored children. Today the page's controls sit before the theme; the text does not say where contributed content lands or in what order two outlets land.
  - The reader's view tabs are wrapped in `<div class="views" role="group">`, a run child that is not a seat. R-13 reaches a layer group's face and nothing else.
  - `ThemeControl` is daraksha's own glyph with its own turn. `data-glyph="turn"` on it would be a second motion on one hover.

### C-23. atlas (`~/Programming/atlas/src/platform/chrome/dock/Dock.vue`, `Dock.css`, `composables/useDockCollapse.ts`)

- **As mounted:** one vertical `shape="card"` rail, `:collapse="isPhone ? 'closed' : 'open'"`, driven by `expand()` and `collapse()`; on a phone the open state is a 20 rem sheet restyled wholesale off `.collapsed`. `FigureDock` and `useLinger` are not in this checkout.
- **Broken by the design as built:** the rail is the card on the vertical axis, the cell that was not run and that reads the wrong rest corner (C-8).
- **A wrong citation with a consequence.** The spec says atlas reads `--dock-expand-t` at `Dock.css:72`. Line 72 **sets** `--dock-morph-t: 1`, and lines 92 and 96 read `--dock-morph-t` for the plate's fill and rim. So 12.0.0's deletion of `--dock-morph-t` is what touches atlas, and in 11.2.0 the carrier writes that property 0 to 1 in both directions (`useDockBody.ts`, `write()`), so atlas's fill dips at the start of every travel and climbs back. The note to atlas should name these three lines.
- **Left uncured:** the labelled seat and the fission seat are horizontal only, so the rail gets neither. The rail's phone sheet changes its whole layout on the class; the plate will glide from a pill to a sheet while the content inside is laid out as a sheet from the first row, clipped to the plate. That needs its own cell.
- **The figure docks** cannot be read here. Two things the text owes them all the same: the tap (C-17), and where an outlet's content lands among authored seats (C-22).

### C-24. fourier, value.js (color), keyframes

- **fourier** (`~/Programming/fourier-analysis/web/src/components/layout/AppDock.vue:172-253`, `components/visualization/CanvasControlsDock.vue`, `EditorControlsDock.vue`).
  - The site dock is `:collapse="false"` with `DarkModeToggle` last. Moving it to `#beside` gives a still second plate and never a fission, as with daraksha.
  - The two canvas docks do collapse, and the canvas dock keeps Edit in `#persistent-end`. That is the composition C-2 breaks: a persistent region sweeping across the run on every unfold. It is the first consumer cell to add.
  - A label shown by `v-show` inside a trigger (`AppDock.vue:226`) changes the run's width with no fade of its own; R-5 glides the plate, and the label still appears in one frame.
- **value.js, the colour app** (`~/Programming/value.js/demo/shell/dock/Dock.vue:279-479`).
  - One dock, a `DockLayerGroup` with no switcher, four layers of which one is behind `v-if`, a `#collapsed` face, the Tools trigger in the main layer.
  - Cured in the text: the Tools to tool swap glides.
  - At risk: its settle beat watches `[data-morphing]`. R-5 now sets that attribute on every content change, so the beat will also play after a select's value changes or a label's width moves. The consumer half says only that it "now covers the glide".
  - A layer behind `v-if` unmounting is C-5's cut.
  - If it adopts `#beside`, it is the composition C-4 names: a layer group with a seat, where a narrower layer moves the seat's gap at rest.
- **keyframes** (`~/Programming/keyframes.js/demo/app/dock/ChromeDock.vue`, `components/instrument/transport/TransportDock.vue`).
  - Two docks in one app. The transport is `collapse="closed"` with Play in `#persistent` and no `#collapsed` face: a persistent region beside an empty summary. The patch narrows the empty-summary rule to that case, which is right, and it is also C-2's sweeping region with the least content to hide it.
  - Its per-seat fills move to `--plate-tone` only for labelled seats in 11.2.0, so its dock is the two-language dock of C-15 for one release.
  - The theme toggle to `#beside` on the chrome dock is the one consumer where the fission would play as the owner described it. It should be the composition the neck is judged on.

---

## What the fold should do with this

1. Take C-1, C-2, C-3 and C-9 into the carrier and re-read every fold, unfold and reversal cell with the two added bounds. Nothing else about the carrier is released until then.
2. Take the fission seat (C-4, C-11, C-12) and the labelled seat (C-13) out of 11.2.0's promised list and into "held behind a reading", in W-B.17's manner. The spec already allows each to leave the release.
3. Strike the shadow lerp (C-14) and decide the gleam (C-15).
4. Correct the clock's text (C-17) and the two consumer citations (C-22, C-23).
5. Run WebKit before any of it is called read. Until the guard admits a run, every row in this wave is a Chromium reading.
