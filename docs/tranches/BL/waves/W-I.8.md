# W-I.8: the dock (one clock, one carrier, the fission seat, the outlet)

The sources are the owner, by date, verbatim. Each is quoted once here and cited by its INBOUND row after.

- 2026-11-10 (O-200, O-202): "We should likely have ONE dock, not two, with layers of controls"; "ONE dock with many layers that are smoothly eased and grow, fission, fuse, and animate".
- 2026-11-11 (O-248): "ALL dock animations should be well defined in animating, not just telporting and instantly changing, the heigth and width"; the collapse is "not smooth in the end or beginning".
- 2026-11-12 (O-275, O-276): "When you un-hover the dock, it should not instantly teleport away. It should persist a bit, based on dwell time too."; "we must standardize our filter docks on each viz to have proper collapse states … these docks should have animations and expanding on interact/hover, too."
- 2026-11-12 (O-279, O-289): "placed in fission, in a separated icon from the dock, though with a dock bg, on the RIGHT of the dock--in the collpase state, this fission item should fuse into the main dock and collapse away like in ios 27."; "animated that fission and separation in goo with safari compat."
- 2026-11-12 (O-288, O-290): "the slider doesn't too. All should animate."; page icons "a bit more flat in color, not shaded so much and AI-like".
- 2026-11-12 21:20 (O-301 to O-304): "the dropdowns should disappear when the dock collapses and animate; the text edit options should be contained properly"; "the dock dwell time needs to be tweaked dramatically, as do the dock layer transitions and animations thereof"; "potentially have the text not displayed, but on hover display larger and to the left, and shift the icons (keeping the dock the same size)"; "the dock transitions and goo thereof and fission could be smoother too"; "each app page ... should have a defined glass container, separate from the dock as a card".
- 2026-11-12 21:48: "the dock dwell time to auto collapse after leaving hover should be increased."

Two bounds bind every line: nothing changes instantly (`docs/precepts/motion-canon.md` P0), and "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple." (`W-B.17.md` line 7).

**How this text was made.** The ledger seat (claude-opus-5-5, 2026-11-13) read every record and wrote `../design/dock/wi8/LEDGER.md`: 64 rows, L-1 to L-64. The design seat (claude-fable-5-2) wrote the rulings from the ledger, the animation audit (`../audit/animation/AUDIT.md`, `record/dock/RECORD.md`), the dock source on master at `99a1389e6` and W-B.17, and measured nothing. The prototype seat built the pieces on `bl/dock/wi8` and read them in Chromium (`../design/dock/wi8/PROTOTYPE.md`). The challenger read the build's rows, crops and source and returned twenty-four findings, C-1 to C-24 (`../design/dock/wi8/challenge.md`). The fold seat (claude-fable-5-2, 2026-11-13) rewrote this text to what those readings support; each finding's disposition is in `../design/dock/wi8/fold.md`. In this file **C-n** is a challenge finding and PROTOTYPE is the prototype's record.

The earlier texts are `git show 99a1389e6:docs/tranches/BL/waves/W-I.8.md` (the 2026-11-10 spec with its nine appended sections) and `git show e62e3e2d4:docs/tranches/BL/waves/W-I.8.md` (the design seat's text before this fold).

Four limits bind every number here.

- No number in this file is a seat's own. Each cites the record that read it, or is marked a default with no reading.
- **No WebKit reading exists for this wave.** The guard refused every browser run at 8.01M kernel-zone elements during the prototype, again for the challenger, and again for the fold at 8.13M (2026-11-13 04:23). Every reading below is headless Chromium. Shipping Safari is unmeasured as well.
- The fold took no new measurement, for the same refusal, and amended no prototype source. Every cure below is text until the prototype is re-read. "What the prototype read" says which gates that leaves unread.
- The prototype's own gate table uses numbers that are not this file's (C-18). No status was copied from it by number.

Release, for `INDEX.md`'s column: **it splits three ways.**

- **11.2.0:** the carrier, the clock and its tokens with the linger growing by dwell, the declared pinned state, `DockOutlet`, the published progress property, the figure preset, the README. No prop, slot, export or token is removed.
- **Held, 11.2.0 or later, each behind its readings:** the fission seat (the `beside` slot) and the labelled seat (the `label` prop). Neither passes its own readings today (C-11, C-12, C-13). Each is released by the readings named in its ruling, in both engines, and by nothing else. The labelled seat also never ships in a release where an unlabelled dock seat keeps the gleam (R-7).
- **12.0.0**, in W-R.1's run, each with a MIGRATION row: a press-opened dock lingers when focus leaves; every DockControl is a `.plate`; `--dock-morph-t` and the two unread stagger tokens are deleted.

## What a dock is

A dock is one surface whose size follows its content. It has three resting states: collapsed to its essentials, open, and pinned open. Everything else is travel between them or between two sizes of the open state, and all of it is one kind of event: the layout changes once, and what is painted glides from where it was to where the layout now is, on one spring, with its content fading inside the plate's moving edge. A fold, an unfold, a layer swap, a control added, the theme seat parting from the plate: each is that event with different boxes.

So the dock has one clock that decides when the state changes (R-2) and one carrier that moves the paint when it does (R-1). The rulings after those two say what each named piece is in those terms.

## Rulings

- **R-1: one carrier moves every size the dock has.** This is the carrier the 2026-11-10 text ruled (D2's, `../design/dock/LANDING.md`), kept whole and widened to both axes (O-248). As built its plate reads well: edges leave rest at 1.0 to 2.0 % of travel, never exceed the spring's step, land within 0.11 px, and the cross axis glides where v11.0.1 lands it in one frame (PROTOTYPE, the fold tables). What rides the plate did not, and the clauses marked with a finding are its cures.
  - **One loop.** One `requestAnimationFrame` loop per dock steps every moving quantity on `springPreset("dock")`, then writes. It parks on the frame its last quantity lands. At rest the dock schedules no frame and writes no style (L-15; read: 0 callbacks, 0 mutations, 0 animations at rest).
  - **One measured model**, in the root's own px: each plate's four edges and corner, the regions, the faces, and each face's units. On a trigger it reads the new layout once, and each quantity holds painted minus layout and carries it to 0 with the velocity it had. A second change retargets the live quantities and never re-creates them.
  - **The posture coordinate is a quantity of its own**: 0 collapsed, 1 open, on the same spring, moved by a posture change and by nothing else. It is never derived from the plate's extent, so a layer swap in an open dock leaves it at 1 (C-4). R-3, R-6 and R-10 read it.
  - **The plate's box is the painted shape.** The loop writes the plate's four insets and its radius in px, so width and height glide together and nothing is scaled. The radius is the lerp of the two rests' corners; for a capsule both are half the cross extent, so the plate is a capsule in every frame (L-3). The plate's `clip-path` is deleted.
  - **Rest geometry is keyed on the posture class, never on the published property (C-8).** The carrier reads each rest's padding and corner from the layout after the class changes. A rule that sizes or shapes a box from `--dock-expand-t` is read at the old value and lays out on every frame, which is how glass's own card corner (`styles/shell.css`, the `.shape-card` rules) came to read the pill's corner as its target. Those rules, and the padding rules the prototype moved onto a second property, are rewritten on the class. `--dock-rest-t` is not added; R-10's "no name is added" stands.
  - **One writer for the plate's corner (C-20).** The run's cut caps are scroll-timeline animations that own the plate's end corners in Chromium today and overrode the carrier's radius by 1 px through every travel (PROTOTYPE, "not a capsule"). The carrier is the only writer of the plate's `border-radius`. How the cut cap is drawn without it (on the run's port, or standing down while `[data-morphing]`) is owed to the prototype (P-10), and G-2's corner bound is its gate as written.
  - **What this costs, stated (L-16, C-21).** An inset is a layout property, and P5 as written forbids animating one. The plate is an out-of-flow leaf that nothing reads, so each frame of travel lays out that one box. Read: a median of 1 layout per frame and a largest of 3, against G-11's one; the loop's script is 0.11 to 0.14 ms at the median at 1x and 0.5 to 0.7 ms at 4x, against 1.1 to 1.5 and 4.5 to 7.1 ms on v11.0.1 (PROTOTYPE, cost). The frames with 3 layouts are unexplained and fail G-11 until they are. The layouts a travel may cause are these and no other: the plate's insets, each frame; a dock in block flow, its parent, each frame; the leaving face's placement, once. The alternative to the insets, a scale with a counter-scaled corner, is what master does, and it is the source of the rounded dock's flat ends (dock F6), the seat's tick on the settle frame (F10) and the shadow swap (F13). P5's sentence for a leaf's insets is owed in the precepts repository.
  - **Everything else moves by `translate` and `opacity`.** A unit moves only when its place inside its face changes.
  - **A region is carried by an edge, never by its centre (C-2).** When a region's size changes it is carried by the edge it shares with the plate or with its neighbour. As built the regions were carried by their centres, so on every unfold of the standard dock the Home seat swept across the run's first seat with both at full opacity, overlapping by up to 35 px for about 100 ms.
  - **The plate's edge and the region's lane are the only clips (C-1, C-2).** While travel runs each region is clipped by one `clip-path: inset()` to its lane: the plate's painted box, narrowed to the painted edges of its neighbours. The clip is written in the region's own coordinates and its insets may be negative. A region's own layout box is never a clip edge. As built each inset was floored at 0, so on a fold the leaving run was clipped to the 40 px summary box in the first row: four controls at opacity 1 cut in one frame, on the wave's headline cell (`../design/dock/wi8/fold/strip-fold.png`). At rest nothing clips, so a hover plate may overhang the edge as it does today.
  - **The leaving face does not move when the travel starts (C-1).** It is taken out of flow where it painted. As built it was placed 4 px off.
  - **One shadow, the same in both postures (C-14).** The rim pair and `--shadow-dock` move from the root to the plate. The collapsed and open shadows differ today (12 px at 0.12 against 20 px at 0.14) and swap in one frame (dock F13). They become one value, the collapsed one, for both. Nothing lerps, nothing repaints a blur each frame, and the fault is cured by deletion. `--shadow-dock-override` still replaces the whole list. If the owner wants the open dock to lift, it is asked with one crop of both.
  - **Hit follows paint (C-9).** The root and its structural boxes take no pointer events; the plates and the seats do, and the root's hover and focus listeners hear them as descendants. As built no such rule existed: during a fold the plate painted 150 px either side of a 56 px root, and a pointer returning onto that glass was outside the dock.
  - **A dock in flow (C-7).** In block flow an in-flow neighbour follows the painted edge: the root's margin on the moving axis is written each frame, which lays out the dock's parent, and G-11 gives it W-B.17's budget for a size tween. A margin does not do this in a flex or grid parent; there it moves the dock itself (PROTOTYPE). So the README rules it: a dock whose size changes is out of flow (fixed, absolute or sticky) or in block flow. In a flex or grid row its siblings move in one frame, and glass does not claim otherwise. Two docks in one row are the exception glass can carry: see the next clause.
  - **One trigger per fact:** the content observer, one ResizeObserver, the posture watch, and a change of place. A dock's root can move without resizing (a window resize, or a sibling dock changing width in a centred row), and a ResizeObserver does not fire on a move. So when any dock's travel opens, and on a window resize, every other mounted dock reads its own root's place once in the same batch, through the registry's list of live docks (R-8) and with no DOM lookup. A dock moved by a sibling travels from where it painted. A window resize seats at layout with no travel. Reads are batched before writes (O-180 (3)).
  - **One window.** `[data-morphing]` is set before the posture class changes (a `flush: "pre"` watcher) and removed on the frame the last quantity lands, with every inline value the loop wrote. It opens on a content change as well as a posture change (L-53).
  - **The first and last frames.** The loop's clock starts on the first frame it paints, not on the trigger, so the first frame paints the old box exactly and the second moves by the spring's own step from rest. A frame longer than 33 ms advances the spring by 33 ms, so a hitch is a pause and never a jump. That is the cure for the 13 to 17 % first frame daraksha read (`../design/dock/inbound/daraksha-dock-measures-2026-11-12-night.md`), which the audit traced to frames at half rate (AUDIT §3).
  - **The preset's own overshoot is stated.** `springPreset("dock")` is response 0.3, ζ 0.88, and it passes its rest once: the plate read 485.41 to 486.16 px against a rest of 485 (C-10), and every cell steps 0.09 to 0.11 px against its travel once at the end. It is under a pixel and is not a bounce. The earlier text said the preset has none.
  - **What master already cures is carried as law.** Each 10.1.x and 11.x cure in the two files the carrier replaces is a law on the landed dock, with its existing witness as its gate and its expected values unchanged: O-101, O-110, the press that holds the posture, 10.1.5's invariant list as 11.0.1 forwards it, 11.0.2's cures as merged, 11.1.0's O-194, O-197, O-198, O-199, the gliding mark and `edge="border"`. A witness that reads a deleted mechanism is restated once to the law it guarded, and the build's record names each.
- **R-2: one clock decides the state.** As built it reads right in Chromium on every case but the two below (PROTOTYPE, the clock table).
  - **Three states**, as today's `DockState` with its names: `collapsed`, `hover` (open by hover, focus or a tap) and `pinned`. Folding and unfolding are travel, not states: the state changes at once and the carrier eases what it set.
  - **Intent.** A pointer opens a collapsed dock after `--dock-intent` (60 ms), counted from its first movement inside the dock, so a page of docks scrolling under a still pointer opens none (L-21; read: v11.0.1 opened at 578 ms, the prototype did not). Keyboard focus opens at once.
  - **The linger.** A dock opened by hover, focus or a tap never folds on the frame the pointer or focus leaves. It folds after `min(--dock-linger-max, --dock-linger + dwell / 2)`, where dwell is the time the pointer or focus has spent inside since the dock opened. `--dock-linger` is 6 s, the value placed in 11.0.2 (O-306). Re-entry cancels the linger. The slope is atlas's, the only curve any record proposes.
  - **The growth ships on (C-17).** `--dock-linger-max` is 12 s in 11.2.0. O-275's "based on dwell time too" stands; the later words ask only for longer and overrule nothing. A consumer sets the two tokens equal to turn the growth off (OQ-2).
  - **A brush is the open half of OQ-2.** Intent is 60 ms, so a pointer crossing the pill on its way elsewhere opens the dock for 6 s over the page. No record rules it. The text does not change the floor; the question goes to the owner with one strip.
  - **What holds the dock open.** It does not fold while an overlay opened from it is open, while `:focus-visible` is inside it, or while a pointer is down inside it. Each is checked when the linger runs out, and the linger starts again when the hold ends.
  - **A tap, by pointer (C-17).** A touch tap on the folded face opens the dock and never pins it: its linger starts when the finger lifts, and each later touch inside restarts it. Today it has no timer and never folds (L-23). A mouse press or Enter on the folded face pins, as today. The figure preset does not differ. A host that wants a tap to pin sets `v-model:pinned` from its own handler, and atlas is told so. A tap into a cross-origin iframe is 11.1.1's cure (O-299 (c)) and is not built twice.
  - **Dismissal.** A press outside, Escape and `collapse()` skip the linger and fold by the same eased travel. `release()` with the pointer outside starts the linger; the 800 ms wait before a second full window is deleted (L-20). Read: `release()` still folded twice in the prototype, which fails G-1 (i).
  - **A return mid-fold reverses it.** A pointer or focus that comes back while the fold is travelling opens the dock at once, with no intent wait, and the carrier turns from where it is with its velocity (L-8). The pointer returns onto the painted plate, by R-1's hit rule. Intent guards only an opening from rest.
  - **Pinned is declared.** `v-model:pinned` on GlassDock. It ends by a press outside, Escape or the host, never by the pointer leaving, and an open overlay holds it (L-25).
  - **The 11.1.0 exception goes.** After a press on a persistent control, 11.1.0 folds a hover-opened dock "as soon as the pointer leaves". O-275 is later: the linger applies there too.
  - **A press-opened dock** (`expandOn="press"`) closes at once when focus leaves, today. In 12.0.0 it lingers there and closes at once only on a dismissal.
  - **The 840 ms window is not a token.** It is the cap on the click guard after an expand (`composables/useDockClickIntegrity.ts:190-197`), not a clock anyone sees, and `[data-morphing]` is its real signal. It stays a constant.
- **R-3: content has one formula, and it has no clock of its own (C-3).**
  - **For a posture change the content reads the posture coordinate `e`** (R-1), each frame, in both directions:
    - the summary's opacity is `1 − e / 0.35`, clamped, so it is gone when the dock is 35 % open;
    - the run's is `(e − 0.35) / 0.35`, clamped, so it is whole at 70 %.
  - A fold evaluates the same two windows backward, so a return mid-fold starts the run returning in the row the plate turns, and no opacity jumps (L-7; dock F5 read 1.00 to 0.51). As built the content ran a second spring that restarted from rest on every change: after a return at 30 % every face stayed under 0.06 for seven rows while the plate travelled, then the run went 0.03 to 1.00 in six.
  - **For a change with no posture change** (R-5) the travel carries one unit quantity `f`, 0 to 1, on the same spring; the leaving face reads `1 − f / 0.35` and the entering face `(f − 0.35) / 0.35`. A return to the face still on screen inverts `f` where it is and never restarts it. A third, different face starts from what is painted (R-5).
  - Opacity is written on the two faces, or on the two panes, never on a box that holds both.
  - **A control or region that leaves is held and fades (C-5).** It is held for the first window and fades on it, and its neighbours glide over the same travel. Glass holds its own regions, which sit behind its own `v-if` (dock F4, 231 to 181 px in a frame). A consumer's `v-if` seat is held by W-B.17's presence (its R-7), and the README says so. A control that joins a face enters on the second window. The earlier text cut a leaving control in its frame, against P0: "An exit is an animation too, never a cut."
  - This replaces the per-control stagger and its 0.82 scale pop (`styles/layers.css:278-297`), which is a fade-up on every element. "The fading happens FASTER than the stretching" (`restraint.md`, Motion).
  - **The instant near 35 % is read and is small, and its form is still the owner's (C-6).** Old content is gone before new content arrives. Read: one row with every face under 0.1 and three under 0.3 on a plain unfold, at 36 to 38 % of the plate's travel. A dock with a persistent region is never empty there; a plain pill is. W-B.17 R-7 struck the same out-then-in form for a pair in one seat. The windows are a default with no strip behind them; P-4 shoots three forms and the owner picks (OQ-4). G-4 bounds the instant either way.
- **R-4: the fold and the unfold are one gesture.** A posture change is R-1's travel with the two panes as R-3's content.
  - Width and height travel together. A layer-group dock's 52 px of height no longer lands in the first frame (dock F3; read: the cross axis leaves at 1.2 to 2 % where v11.0.1 reads 100 %), and the open size is never measured while the root is collapsed (atlas's first ask), because the old box is what was painted and the new one is read after the class changes.
  - **Content is seen until the plate's edge covers it (C-1).** The open dock's controls stay whole where they painted, fade on R-3's window, and are cut only by the plate's moving edge. That is the frame O-248 and O-288 are about.
  - Every control in the dock folds with it. A control's opacity is its pane's; its own held or grown state is its own, and its release is its own transition. A slider held when the fold starts loses its hold on the collapse edge and returns on its own clock (L-6). No slider has been held through a fold in any reading.
  - Edge content arrives with the plate: a unit near the far edge is whole in opacity by 70 % and is uncovered by the plate's edge as it passes, so nothing pops in after the plate has landed.
  - A collapsed dock with nothing in its summary and no persistent region rests at the collapsed control size, not at a 16 px sliver (L-4). A dock with a persistent region and no summary rests at that region (keyframes's transport).
  - A persistent seat is a region carried by its edge to its measured rest, so it lands there with no tick (L-14).
- **R-5: a layer swap is the same gesture with no posture change.** When the open dock's content changes size, the layout changes once, the plate glides on both axes, the regions ride its edges, and the faces follow R-3 inside the plate's clip.
  - The cause does not matter: a DockLayerGroup face, a label, a select's value, a control added or removed, a persistent region mounting or leaving, a route that changes the seat set (L-2).
  - It never moves the posture coordinate, the fission seat's gap or `--dock-expand-t` (C-4).
  - DockCrossfade keeps its registry, its inert swap and its focus transfer. Its opacity reads the travel's `f` in place of a spring of its own, and its running-maximum reserve is deleted, since the plate now follows the active face.
  - A third change that arrives mid-swap starts from what is painted: every face still showing leaves from its painted opacity over the new travel's first window. No face is cut (dock F9).
  - Read: the plate's main axis is inside the bounds on the layer cells, and the cross axis glides. The second and third changes of the crossfade exceed the first-frame bound on the cross axis by 0.1 to 0.5 %, and the swap's leaving face is cut at its lane as the fold's is (`../design/dock/wi8/fold/strip-swap.png`, the text's first letters). Both fail G-4 until cured.
  - **The run's open seat is the same event.** Its `inline-size` transition (`styles/run.css:522-553`), which lays out every frame for 210 ms on every page change, is deleted, and the glide to a seat past the fold becomes one quantity of the loop. The prototype did not build the quantity and kept the transition, moved into the seat's own list. That leg does not ship as a stopgap: G-12 forbids it, and step 3 of the build is not done while it is there (C-10). Both are read on `release/11.1.0` first, which rebuilt the mark, and on 11.1.1's cure of O-316.
- **R-6: the fission seat is a slot, a second plate, and a neck. It is held behind its readings.**
  - **Why it is held (C-11, C-12).** No neck passes the readings this text set for it, the reading the choice exists for (the backdrop kept in WebKit) has no value, the gap between the two shapes is not the page, and the seat parts in about 25 ms (`../design/dock/wi8/fold/strip-fission.png`). The slot does not ship until P-1 passes in both engines.
  - **API.** One slot on GlassDock, `beside`, for one control. No prop.
  - **Where it is.** A region after the trailing persistent region, inside the root, in logical properties: the right in a left-to-right page. Open, it is in flow on the dock's axis, one `--dock-layer-gap` past the main plate, on a shape of its own that paints the dock's surface (O-279 reverses O-222 and the 2026-11-10 text's bare seat).
  - **The gap is the page (C-11).** At open rest nothing of the dock paints between the two shapes: no surface, no backdrop and no shadow's inside. As built a pale band ran from the main plate to the seat (`../design/dock/wi8/prototype/look/std-open.png`), which is the row-sized shadow leaf: two parted shapes resting in the halo of one capsule. O-279 asked for "a separated icon".
  - **One shadow per shape.** Each shape carries the dock's one shadow (R-1). The row-sized shadow leaf is struck. The dark slot two shadows might make in the gap is 8 % alpha at 12 px of blur; it is read on one crop, and the leaf returns only if that crop shows a slot. Under neck B a clip cuts a box's own `box-shadow`, so the rebuild states what carries each shape's shadow and G-11 counts it.
  - **Collapsed, it is gone.** "Fuse into the main dock and collapse away": at collapsed rest the region is out of flow, hidden and inert, and the pill is one plate. A host that wants the control in the pill puts it in `#persistent-end` and gets no fission (OQ-1).
  - **It rides the posture travel, never layout and never a content change.** The seat's place, its shape's edges and the neck are functions of the posture coordinate. daraksha's second dock stood about 140 px away through the collapse and jumped about 116 px in one frame because its layout box moved at once (O-299 (a)).
  - **It parts with a start and a stop (C-4).** The gap is `g · p`, where `p` is a function of the posture coordinate with no slope at either end, over more of the travel than its second half. The earlier `p = clamp((e − 0.5) / 0.5, 0, 1)` is struck: it began where the spring is fastest and ran at twice its rate, so the gap went from still to full speed in one row and its steps read 8.6 to 11 % against a bound near 8 %. The form is `p = s(clamp((e − a) / (1 − a), 0, 1))` with `s(x) = 3x² − 2x³`; `a` is a default with no reading, and the prototype shoots `a = 0` and `a = 0.25` for the owner. The fold runs the same function back, so the seat fuses first.
  - **The glyph follows `p`, not R-3's windows.** It is not painted while the seat is fused and is whole when it has parted. As built it was gone at 35 % of the fold, so an empty shape did the fusing, and on the unfold it appeared inside the fused pill on top of a run seat (C-2, C-4).
  - **The neck is an element, never an SVG filter.** A filter on the plates' container erased their backdrop in WebKit; a real element between the plates kept it (`~/.dev-logs/owner-1112/frames-4th/webkit-neck-vs-svg-goo.png`). One design is left, below.
  - **No overshoot of its own.** `restraint.md` allows it on fission. The seat does not take a spring of its own; it carries the preset's (R-1), and D2 Q-5 (a) asked for weight with no visible bounce.
  - **Its hover is W-B.17's.** A DarkModeToggle in the slot carries `data-glyph="turn"` itself. The dock sets no glyph attribute and writes no glyph rule: the prototype's own `[data-glyph="turn"]` rule in `styles/beside.css` is deleted (C-16). A consumer's own control in the slot keeps its own motion and is not given a second (daraksha's `ThemeControl`). The sun reading as a cog at dock size (O-239) is the DarkModeToggle's glyph; in the standard dock it sits beside the Settings gear and reads as a second gear. Its redraw has no wave (see "Records the orchestrator amends").
  - **The hold is containment.** The region is a descendant of the root, so hover, focus, the overlay stamp and click-away hold through R-2 with no copy of them. The gap toward the main plate is the region's own padding, so no strip between the two reads as a leave.
  - **Centring.** The seat is in flow, so a centred dock centres the row (plate and seat) and the host's overflow reads the true extent. The main plate's centre moves by half the seat's room on an unfold. It is taken as a default and shown in the fission strip.
  - **On a dock that never folds, it is two still shapes.** daraksha's and fourier's site docks are `:collapse="false"` (C-22, C-24). `#beside` there gives the separated seat and no fission. The fission the owner described plays only on a dock that folds.
  - **Forced colours.** The root's forced border is removed (`src/styles/utilities/a11y-overrides.css:147-150`). Each shape's own border is its outline.
- **R-7: the labelled seat is one prop, and the plate does not move. It is held behind its readings.**
  - **Why it is held (C-13).** As built the name prints over its neighbour's glyph mid-tween and at rest; it fits only because the current page's seat happens to be wide and empty; the current seat's own name never shows; and it is not W-B.17's plate. The prop does not ship until every clause below is gated GREEN.
  - **API.** `label` on DockControl. On hover or `:focus-visible` the name shows at the seat's inline start, at `--dock-label-size` (one step above the dock's control text), at normal weight: O-303 asked for "larger", and `restraint.md` has size carry hierarchy. The neighbours shift to give it room.
  - **The 0 px guard holds, and it is the part that passed.** The name is one `aria-hidden` span that stays mounted, out of flow. Showing it changes no layout: the root, the plate and the seat's plate moved 0.00 px through every hover and the sweep (PROTOTYPE; O-282).
  - **One way to name a seat (C-13).** The run already names one seat: the open seat, the current page's, which is wider and holds its name in flow. The hover name is that same room lent to another seat. At rest the open seat shows the current page's name, so the room is never a dead gap. On a hover the current name fades, the seats between shift by `translate`, and the hovered seat's name takes the room. The room is as wide as the dock's widest name, set once, so the fit does not depend on which seat is current. Whether the current page shows its name at rest is the owner's (OQ-6); with it hidden the room is 98 px of nothing in the standard dock.
  - **The name never touches a glyph.** Its box with its gap intersects no other unit's glyph in any row, mid-tween or at rest. Its opacity is a function of the room's progress, so it cannot be read before the room exists; as built it was readable at 59 to 62 ms while the shift took 210 ms.
  - **The shift is one `translate` per seat**, written when the labelled seat changes and tweened by CSS on `--spring-dock`. The leg is added to the seat's own transition list; a shared `transition` shorthand would erase that list (AUDIT rule C).
  - **The seat under the pointer keeps the pointer.** Its hit box always covers its resting footprint.
  - **A name that does not fit is not shown in place.** It is never truncated and the plate never grows. The strip that goes to the owner shows the seats that get no name as well as those that do.
  - **Who gets no hover name, stated.** A coarse pointer has no hover: it sees the current page's name in the open seat and no other. A vertical dock has no room at a seat's side. A seat in a persistent region is outside the run, which includes the Home seat R-14 puts first. Each keeps its accessible name. O-276's "what do some of these dock buttons even do?" has no answer on a phone in this wave; the Tooltip that would give one (L-30) is not built here and still needs a home.
  - **It is W-B.17's plate, as W-B.17 ships it.** The seat is a `.plate`: the fill is on its own `::before`, the hover is that plate's `opacity` and `scale`, and no colour transitions (W-B.17 R-1). The prototype removed the `::before` and tweened `background-color`; both are struck. Its sites wait on the owner's pick of the plate's strength, as every plate site does (W-B.17 R-4). It computes no gleam, no gradient, no shadow and no `backdrop-filter` (O-290). Its one colour is `--plate-tone` (L-29).
  - **Never half a dock (C-15).** A dock whose labelled seats are flat and whose Home and theme seats keep the gleam answers the pointer two ways side by side. The labelled seat ships only in a release where every dock seat is a plate. By W-B.17's and W-R.1's schedule that is 12.0.0 (OQ-6).
  - How the name enters is open between two designs, below.
- **R-8: the outlet is one component, and docks are found by id.**
  - **API.** `<DockOutlet to="site">`, exported from `./dock`, with one optional prop, `region` (`"run"`, the default, `"persistent"` or `"persistent-end"`). A GlassDock whose root has an `id` registers under it. No prop is added to GlassDock.
  - **What it does.** It renders its slot into the named dock's region by Vue's Teleport, as direct children with no wrapper element, so the run's roving and its seat rules hold. It provides that dock's context, and the face mark when the region is the run, to its slot. So a Popover's hold and close, a Slider's hold, a menu's hold and a seat's face all reach controls a page contributes (O-307). Read: with a Popover open inside contributed content the dock held, where v11.0.1 folded at 3614 ms with the Popover open.
  - **Where contributed content lands (C-22).** After the region's authored children, in the order the outlets mounted. A host that needs a contributed control before an authored one contributes both, or puts the authored one in a later region.
  - **No DOM lookup.** The registry is a reactive map from id to the dock's region elements and context, written by GlassDock at mount and unmount, with the list of live docks R-1's place trigger reads. Content mounts when its dock registers and unmounts when it goes. Nothing registers on the server.
  - A persistent region that an outlet targets is rendered even when the host authored no slot for it, and an authored or targeted region with nothing in it takes no room (`.dock-persistent:empty`). A layer's seat reaches the collapsed face through `region="persistent-end"` (O-224).
- **R-9: an overlay opened from the open dock closes with it, by its own exit.**
  - This has shipped since 10.1.1 for a seat in the dock's tree (`src/components/_shared/overlay/participation.ts:125-130`), and it reads right: the menu fades in 115 ms, two frames after the fold starts (dock record). It failed on daraksha because its controls were teleported in and had no context. R-8 is the cure; no second close path is built.
  - The close with the fold is unread on the prototype: the recording ended inside the linger (L-48).
  - The fission seat is part of the face: it is gone when the dock collapses, so what it opened closes too.
  - An overlay opened from a persistent seat stays, as today: its trigger is still there.
  - The options panel's "contained properly" is unread: daraksha measured 13 px of padding all round and suspects the chips' heights (P-6).
- **R-10: the published progress is `--dock-expand-t`.** No name is added.
  - It is the posture coordinate (R-1), written on the dock's root on every frame of a posture travel, and it rests there: 0 collapsed, 1 open. It is never removed, and a content change never moves it.
  - **It drives paint only (C-8).** No rule of glass's sizes or shapes a box from it, and the README tells consumers the same: such a rule lays out every frame.
  - Siblings follow it through one attribute: when an ancestor of the dock carries `data-dock-scope`, the same value is written on that element. One dock per scope. The scope element is found once per travel, not on each frame (C-16).
  - The cost is stated and read: a custom property written on an element recalculates style for that element's subtree each frame. G-11 reads style recalculation and paint from the trace, which the prototype's cost table did not.
  - `--dock-morph-t` keeps master's meaning through 11.2.0 and is deleted in 12.0.0.
- **R-11: reduced motion seats the geometry and fades the content.** Under `prefers-reduced-motion: reduce` every quantity of R-1 lands in the frame of the change, the neck and the fission seat included. R-3's coordinate then runs as a linear clock on which the entering content is whole at `--duration-instant` (100 ms), inside O-198's 144 ms. The linger is kept. 11.1.0's leaving face that "disappears immediately" is overruled by P0: "it never makes a cut" (L-18). The dock's rows join W-B.17's authorized set; whether a consumer's own fades survive the fallback is W-B.17's open ruling (O-308). Read: geometry seats in one frame and content shows three or more values over about 100 ms on every cell but two, which fail G-10: the crossfade's third change moves geometry on two frames, and the rounded fold reads an opacity step of 0.48.
- **R-12: the figure dock is this dock with a preset, and it does not unfold seat by seat.**
  - The three states are R-2's. Rest is the `#collapsed` face with the persistent regions; open is the run; pinned is `v-model:pinned`.
  - The preset is one block, `[data-preset="figure"]`, in `styles/density.css`, where the geometry presets already live: `--dock-intent: 120ms`, a 52 px rest height with 44 px seats, and a run that clips and does not scroll or snap (atlas G-02). No prop.
  - atlas's design unfolds each seat into its control as the pointer reaches it, yields rest seats by priority, and grows the dock down a row for a wide group. The owner's "keeping the dock the same size" is later and is about a hover on a seat. Read with atlas's own rule, "nothing already on screen moves under the pointer", it rules the seat-by-seat unfold out, so glass builds none (OQ-3).
  - A dock over a chart sets `backdropMode="static"`; atlas holds that rule already.
- **R-13: the roving keys reach a layer group.** The seat rule applies to each row: the run's own children, and the children of the active face in a layer group that is a direct child of the run. Each row has one Tab stop, with Arrow, Home and End inside it and no wrap; arrows do not cross rows. `role="toolbar"` sits on the element whose children are the seats, and the stop is re-derived when the face changes (L-56). A run child that is neither a seat nor a layer group (a consumer's `role="group"` wrapper) is not roved; the README says seats are direct children (C-22).
- **R-14: dividers, the Home seat, a free-standing control and the page plate are README text.** Nothing is built for them.
  - A `DockSeparator` goes between groups of a different kind (navigation, the page's tools, utilities), never between every seat. In the face it fades with the face; in a persistent region it rides the region. It has no fade of its own.
  - The first seat of a standard dock is Home, in `#persistent`, so it is there in both states.
  - A free-standing control takes the dock's plate as a one-seat `<GlassDock :collapse="false">`. No dock-surface utility is exported.
  - Two docks in one row: the root centres itself with auto inline margins, so the host sets `margin-inline: 0` on each and centres the row. Each glides when the other moves it (R-1).
  - The page-level plate is `Card`.

### The neck: one design is left, and it has not passed

Two designs were built. Both share R-6 and differ in what paints the glass while the seat parts.

**A, three leaves, is out (C-12).** The main plate, a neck and the seat's plate as three boxes that meet edge to edge. Read: flat deviation 25 against a bound of 2; stripe junction 88.6 against 4; the hand-over moves the main plate's edge by the seat's width in one row (a largest step of 31 to 33 %), and a reversal at 50 % snaps 51.6 px. It fails readings 2 and 4. At `p = 0.5` its neck is a slab with square shoulders.

**B, one leaf cut to shape, is the one left.** The dock's glass is one box over the whole row, so there is one backdrop, one tint and no junction. While `0 < p < 1` it carries a `clip-path: path()` that the loop writes each frame: two capsules joined by a waist whose sides are arcs tangent to both ends, the true shape of two drops parting. No box is laid out for the neck. Read: its geometry is inside the bounds (first step 1.0 to 1.4 %, largest 7.1 to 7.4 %), and it has no junction (0 to 0.5). It fails as built on three counts: its waist was drawn with cubic curves, not the tangent arcs, and pinches to two bright darts; its flat deviation is 20 to 22 at `p = 0.75` in light, against 2, with the corner exclusion changed and not rerun; and its edge reading is 14.8 to 34.9 against 2, because a clip cuts the leaf's own border and inset rim along every cut edge.

**What decides (P-1).** Both engines, light and dark, 390 and 1440, on a flat ground and a striped one, held at `p` = 0, 0.25, 0.5, 0.75 and 1, and run live. The composition judged is a dock that folds with a theme toggle in `#beside`, as keyframes's chrome dock will be (C-24).

1. The backdrop is kept in WebKit at every held `p`, with the `clip-path: path()` rewritten each frame over a `backdrop-filter`. The SVG filter, planted, must fail this reading. This is read first: a failure here ends B as well.
2. One surface: on the flat ground every glass pixel is within 2 of 255 of the main plate's centre, and on the stripes no column at a junction differs from the mean of its two neighbours by more than 4.
3. The edge: at 4x, the facing ends at open rest match the outer ends within 2 of 255 along the rim.
4. The motion: the gap and the neck's thickness stay inside the bounds in every frame, the first included.
5. The cost per frame at 4x CPU.
6. The gap: at open rest every gap pixel is within 2 of 255 of the page, flat and striped, light and dark (C-11).

B ships when it passes all six in both engines. Reading 3 is not loosened here. If a clipped leaf cannot carry a hairline on its facing ends by construction, that is put to the owner with the crop (OQ-5), and only his answer waives it. If B fails 1, 2, 4 or 6, the build stops and reports; it does not invent a third.

### Open between two designs: how the name enters

**A, it fades in at its size.** The name is laid out at its full size and only its `opacity` and 4 px of `translate` toward its rest change, with W-B.17's presence amounts and clocks. Text is never scaled, so its glyphs are sharp in every frame.

**B, it grows from the icon.** The name scales from 0.8 with its origin at the icon's edge, with `opacity`. It is the literal reading of "display larger". It is a second spatial movement on one hover, and text under a scale is drawn once and stretched.

**What decides (P-2).** In both engines: the edge contrast of the name's glyphs on its middle frame against its last; the count of spatial animations running on one hover (G-6 allows one per element); and the time at which the name is readable, which must be 150 ms or less and never before its room exists. Read in Chromium: A is readable at 59 to 62 ms and B at 76 to 79 ms, with end contrast 0.84 to 0.97 and 0.87 to 1.00. Both were read before the room rule, so both are read again. The default is A.

## What the prototype read

By this file's gate numbers. "Unread" means no reading exists; "fails" names the reading. Nothing is GREEN in WebKit, so no gate is closed.

| gate | Chromium, as built | state |
|---|---|---|
| G-1 | cases a to h, j, k inside their bounds; (i) folds twice; the default-token long visit unread | open on (i) |
| G-2 | plate edges inside the bounds on pill, rounded, flow, layers, wide, outlet, figure; content cut in the first row of every fold (C-1); regions overlap on the unfold (C-2); the cut caps own the corner; card and vertical not run (C-8); the two-dock row not run (C-7) | fails |
| G-3 | the plate turns 0 to 3 frames after a return; content blank for seven rows (C-3); the return was driven to the centre only (C-9) | fails |
| G-4 | layers and crossfade edges mostly inside; cross axis over by 0.1 to 0.5 % on later changes; a seat or region leaving not run (C-5); a swap with `#beside` not run (C-4) | fails |
| G-5 | neck A out; neck B fails readings 2, 3 and, by C-11, 6; the gap's steps over the bound | fails; held |
| G-6 | the 0 px guard passes; the name over a glyph, the fit, the plate (C-13) | fails; held |
| G-7 | the unit specs were refused by the guard | unread |
| G-8 | the hold reads right; the close with the fold unread | unread |
| G-9, G-13 | not built into the harness | unread |
| G-10 | passes but for the crossfade's third change and the rounded fold's 0.48 step | fails on two cells |
| G-11 | script and rest inside; layouts a frame 1 at the median and 3 at most; style recalculation and paint unread | fails on the layout count |
| G-12 | not run; by reading it fails on the open seat's `inline-size` leg and the test hook | fails |
| G-14 | the release specs were refused by the guard | unread |

Three batches of the prototype's rows ran on a mixed build, by its own note. Its defect 1 (the fission seat's content "cuts in one frame") is the hidden seat's `visibility` changing; the seat fades, and the fault there is C-4. Its defect 5 (the 12 s linger) is the expected value of case (d), which sets `--dock-linger-max: 12s` (C-17, C-18).

## Scope

### API

| surface | change | release |
|---|---|---|
| `GlassDock` props | `pinned` (with `update:pinned`) added | 11.2.0 |
| `./dock` exports | `DockOutlet` added | 11.2.0 |
| attributes | `data-dock-scope` on a host's element; `[data-preset="figure"]` | 11.2.0 |
| tokens | `--dock-intent` (60 ms), `--dock-linger` (6 s), `--dock-linger-max` (12 s) | 11.2.0 |
| published property | `--dock-expand-t` documented, written each frame of a posture travel and resting at 0 and 1 | 11.2.0 |
| paint and behaviour every consumer sees | every size change glides on both axes; content fades on the two windows; the per-control stagger is gone; one shadow in both postures (the open dock's lightens to the collapsed one's); `[data-morphing]` also opens on a content change; the linger applies after a persistent press and grows with the visit up to 12 s; a touch-opened dock folds after its linger | 11.2.0 |
| `GlassDock` slots | `beside` added | held: P-1 in both engines |
| `DockControl` props, and `--dock-label-size` | `label` added; a labelled seat reads W-B.17's `--plate-tone` | held: G-6 in both engines, and every dock seat a plate |
| defaults | a press-opened dock lingers when focus leaves; every DockControl is a `.plate`; `--dock-morph-t`, `--dock-stagger-window-size` and `--dock-stagger-step` deleted | 12.0.0 |

### Files

Under `src/components/dock/` unless a path says otherwise.

| piece | add | edit | delete |
|---|---|---|---|
| the carrier (R-1, R-3, R-4, R-5) | `composables/useDockBody.ts` (the loop), `composables/useDockScene.ts` (the model, the travel, the triggers), `composables/useDockContent.ts` (the two windows) | `GlassDock.vue`, `DockCrossfade.vue`, `composables/useDockRun.ts`, `styles/dock.css`, `shell.css` (the card's corner and the paddings on the class), `shape.css`, `layers.css`, `crossfade.css`, `run.css`, `morph.css`, `shell-regions.css` | `composables/useDockMorph.ts`, `dockMorphMeasure.ts`, `useDockSpring.ts`; the root's scale and the regions' counter-scales (`shape.css:104-141`); the pill's counter-scaled corner (`run.css:786-792`); the morph clip (`shell.css:318-323`); `--dock-morph-origin`, `--dock-pane-shift`, `--dock-size-scale`; the plate's `clip-path` (`dock.css:93`); the two shadows and their swap (`morph.css:161-167`); the stagger and the 0.82 pop (`layers.css:278-297`); the crossfade's reserve and its own spring (`DockCrossfade.vue:86-115`); the stale-face snap; the seat's `inline-size` transition (`run.css:522-553`), wherever it has been moved; the prototype's `--dock-rest-t` |
| the clock (R-2) | | `composables/useDockState.ts`, `constants.ts`, `composables/useDockShellProps.ts`, `styles/shell.css` (the tokens) | `HOVER_INTENT_MS` and `DOCK_COLLAPSE_DELAY_MS` as literals; `release()`'s 800 ms wait (`useDockState.ts:496-511`); 11.1.0's close on the leave after a persistent press |
| the fission seat (R-6), held | `composables/useDockBeside.ts` (the seat's quantities and the neck's path), `styles/beside.css` | `GlassDock.vue`, `src/styles/utilities/a11y-overrides.css` | the comment that calls fission retired (`GlassDock.vue:609-610`); the shadow leaf, neck A's leaf and its seat plate; the dock's own `[data-glyph="turn"]` rule |
| the labelled seat (R-7), held | `styles/controls/label.css` | `DockControl.vue`, `composables/useDockRun.ts`, `styles/controls/icon-button.css` | the prototype's `::before { content: none }` and its `background-color` hover; with W-R.1 §2.6, the dock's per-control hover fills |
| the outlet (R-8) | `DockOutlet.vue`, `composables/dockRegistry.ts` | `GlassDock.vue`, `composables/dockContext.ts`, `index.ts`, `scripts/lib/subpath-policy.mjs` if the boot graph needs it | nothing |
| the progress (R-10) | | `styles/morph.css` | in 12.0.0, `--dock-morph-t` |
| reduced motion (R-11) | | `src/styles/utilities/a11y-overrides.css` (the dock's authorized rows) | the spring's jump under reduced motion; `DockCrossfade.vue:218-221` |
| the figure preset (R-12) | | `styles/density.css` | nothing |
| the roving (R-13) | | `composables/useDockRun.ts` | nothing |
| the README (R-14, and every piece above) | | `README.md` | the idle window's paragraph as written |

`useDockMorphOrchestrator`, `useDockExpandedSize` and `useDockSpring` are not exported from `./dock`; the build re-reads `.published-roster` before deleting their files.

The loop's hold, which the gates use to stop a travel at a given progress, is test-only. The prototype wrote it to `window.__dockHold` from every dock at setup. It is compiled out of the published bundle, and G-12 scans the built files for the name (C-16).

Tests: the gates below under `tests-visual/dock/wi8/` and `tests/components/custom/dock/`. A test that reads a deleted mechanism is restated or deleted with it, each named in the build's record.

### Not in this wave

- The rest of W-0.8's unit and W-I.1: scroll compact, the rim as a plate child, the press direction, the cut cap's strike, the state attribute. `INDEX.md` places them.
- The dock seats' gleam and the active seat's nested blur (O-203): W-R.1, 12.0.0. Until then a DockControl is as 11.0.2 left it. **A P0 fault ships with that deferral and is stated:** the active seat's lens (`backdrop-filter`) lands in one frame on a live dock through 11.2.0 (L-34).
- The Play and Pause pair and every chevron: W-B.17's pieces, on its release.
- The switcher's swallowed tap (O-312), the spring tokens' last step (O-311), the run's glide (O-316), the iframe fold (O-299 (c)), WebKit's idle scroll-timeline animations (O-258): 11.1.1. The build reads each as merged.
- A Tooltip on every dock control (L-30). It would put Tooltip in the dock's boot graph, and the registry placed it with W-I.1. The orchestrator places it; this wave builds none, and R-7 says who goes without a name until it lands.
- The dock menu's text on a coarse pointer (O-233): W-R.1's rule.
- A persistent region present only while open (atlas's third ask). What atlas takes out of flow by hand during a fold is content of the face, and R-4 clips and fades it there.
- A dock that grows down by wrapping, seats that yield by priority, and the seat-by-seat unfold (R-12). daraksha's two rows under 38.2 rem therefore stay two docks (C-22).
- A second glass dock in one composition, and DockCluster, as the earlier text ruled.
- The two reverts that left 11.1.0 (O-211's switcher import, which needs a public shape change, and K12) ride 11.2.0 as their own commits, not as part of this build (L-62).
- Haptics (O-253): 11.3.0.

## Gates

Fourteen gates, and the list is closed. The fold added cells and bounds to them and no gate. Each is read once RED and once GREEN, with its bite read once. RED is master at the cut unless a record is named. A gate is GREEN only when it is GREEN in both engines.

**How they are read.** With the animation audit's harness (`../audit/animation/harness/README.md`): the build's tree is built by `build-tree.sh` and served on a port from 5401 to 5404; one hand page, `?c=dock-wi8`, holds the cells; scenario files drive them; `probe.mjs` writes one row per rendered frame and `faults.mjs` flags them. A small judge beside the scenarios applies the bounds below to the rows. **The probe reads each unit's visible box through every ancestor's `clip-path` and `overflow`** (C-1): the prototype's judge read a unit's own box and opacity and passed controls that were clipped to nothing. Chromium is the headless shell with GPU compositing, about 8.3 ms a row; WebKit is Playwright's, rows only. Pixel readings are crops of a travel held at a given progress by the test-only hook on the loop, in both engines. One browser per run, a new context per cell, every run through `guarded`, every WebKit run through `guarded --exclusive webkit --timeout 10`.

**The bounds, used by G-2 to G-6.** They are computed at run time from `springPreset("dock")` as the build exports it, at each row's own frame length; no probe carries the preset as a number.

- **First frame:** the first moving row moves a tracked edge by no more than 1.15 times the preset's own first step from rest at that frame length (about 1.5 % of travel at 8.3 ms, derived), and never more than 4 %. In that row the leaving face and every unit in it move 0 px.
- **Any frame:** no row moves an edge by more than 1.15 times the preset's largest step at that frame length (6.98 % at 8.33 ms, `../design/dock-cluster/fold.md` F7).
- **Last frame:** the last moving row moves an edge by no more than 1 px and no more than 2 % of travel, and the row after it equals the rest within 0.5 px.
- **No reversal:** no edge steps against its net direction, except after a `reverse-*` mark, and except the preset's own pass of its rest: at most 1.15 times the preset's computed overshoot for that travel, never more than 0.5 px, once. As first written no dock on this preset could pass it, a correct one included (C-10); the last-frame bound already allows 0.5 px at rest.
- **Inside the plate:** no unit has any part of its clipped box outside the plate's painted box while its effective opacity is above 0.1.
- **Visible until covered:** a unit whose effective opacity is above 0.1 and whose box lies inside the plate's painted box has a non-empty visible box (C-1).
- **No overlap:** no two units of different regions intersect while both are above 0.1 (C-2).
- **Opacity:** no content opacity moves more than 0.4 between two 60 Hz samples, and each fade has at least five samples (W-B.17's clause 4).
- **No dropped frame of glass's own:** no gap over 25 ms between rows overlaps a long task or long animation frame whose script is in glass's bundle, on a machine at a load of 20 or less.

| id | gate and cells | passes when | RED, and the bite |
|---|---|---|---|
| G-1 · the clock | real clock, pointer and taps; both engines; 390 coarse and 1440 fine. (a) the pointer enters and rests; (b) a dock scrolled under a still pointer, 2 s; (c) leave after a 1 s visit; (d) leave after a 12 s visit, once with the tokens untouched and once with `--dock-linger-max: 6s`; (e) leave and return at half the linger; (f) leave with a menu open, with `:focus-visible` inside, and with a finger held down; (g) a tap opens, the finger lifts; (h) a press outside, Escape, `collapse()`; (i) `release()` with the pointer outside; (j) `pinned`, then the pointer leaves for 15 s; (k) a press on a persistent seat of a hover-opened dock, then leave; (l) a mouse press on the folded face, then leave for 15 s | (a) opens `--dock-intent` after the first move, within 30 ms; (b) stays collapsed; (c) the fold's first row is 6.5 s after the leave, within 100 ms; (d) 12 s, then 6 s, each within 150 ms; (e) no fold, and a full linger after the next leave; (f) no fold while each hold lasts, and one linger after it ends; (g) folds one linger after the lift, and `pinned` stays false; (h) the fold's first row within two frames, and its travel inside the bounds; (i) one linger and one fold, never the same frame; (j) no fold; (k) one linger; (l) `pinned` is true and no fold | master: 3.6 s; (g) never folds; (i) 800 ms and then a second window; (k) on 11.1.0, the leave frame. Bite: the linger token ignored |
| G-2 · the fold and the unfold | both engines; pill, rounded and card; horizontal and vertical, atlas's vertical card rail and its phone sheet among them; a layer-group dock (56 and 108 px tall); a two-slider dock, one slider held through the fold; daraksha's composition through the outlet with its widest control; fourier's canvas dock (a run with `#persistent-end`); keyframes's transport (a persistent region and no summary); an empty summary; two docks in a centred row, one changing width; a window resize, then an unfold; a live dock with an active persistent seat, one held crop each side of the first row; each with and without `#beside` once that is released; opened by hover, focus and tap, folded by the linger, Escape and a press outside | every plate edge on both axes is inside the bounds; every outer corner is the px lerp of its two rests within 0.5 px in every row, and the two corners of an end are equal within 0.25 px; content is inside the plate, visible until covered, and no regions overlap; the last unit is whole and unclipped no later than the row the plate lands; a persistent seat's last row equals its rest; `box-shadow` is one value in every row of both postures; an empty summary rests at the control size; in the two-dock row both plates stay inside the bounds; after the resize the unfold's first row equals the rest; the active seat's lens does not change between the two crops | dock F3 (+52 px of height in the first frame), F6 (a 2 by 16 px corner, a bar that turns oval on the settle frame, a 16 px sliver), F10 (+1.0 and −2.1 px on the settle frame), F13; daraksha's 13 to 17 % on v11.0.1; the prototype's fold (four controls cut in row 164) and unfold (Home over seat 0, rows 41 to 48). Bites: the loop's clock started at the trigger; a region's clip floored at 0; a region carried by its centre |
| G-3 · a reversal | Chromium at 30, 50 and 80 % of an unfold and of a fold, by Escape and by the pointer returning to a point inside the painted plate and outside the collapsed box; WebKit at 50 % | no INTERRUPTION flag on any channel, opacity included; each edge's velocity change across the turn is no more than the spring's own; after the pointer returns the plate turns within two frames; after a turn at most two rows have every face under 0.1 | dock F5: opacity 1.00 to 0.51 and 0.14 to 0.36 in one frame; a hover return lands at 83 % after the 60 ms wait; the prototype's seven blank rows. Bites: a second clock for the content; pointer events left on the root |
| G-4 · a layer swap | both engines, 390 and 1440: drill in and back; a crossfade through faces of 2, 4, 1 and 3 rows; the switcher by key; a third change 90 ms after the second; a return to the face still on screen at 30 and 60 %; a fold during a swap; a select's value; a persistent region mounting and unmounting, open and folded; a seat added and removed, by glass and by a consumer's `v-if`; a route that changes the seat set; the run's open seat moving; a layer swap in a dock with `#beside`, once that is released | every plate edge on both axes is inside the bounds; the leaving face is at 0.02 or less before the entering face passes 0.02; rows where every face is under 0.1 number at most two in a run, and in them the plate is between 20 and 50 % of its travel; no face shows a CUT; content is inside the plate and visible until covered; a seat or region that leaves fades over at least five samples; after the swap with `#beside` the gap equals its rest within 0.5 px and `--dock-expand-t` reads 1 | dock F4 (72 px in one frame, faces fading 190 ms after), F9 (0.28 to 0 in one frame), F3; color C-03 and C-04. Bite: opacity written on a box that holds both faces |
| G-5 · the fission seat | both engines; 390 and 1440; light and dark; unfold, fold, reversal at 30, 50 and 80 %; the pointer resting 8 s in the gap; Tab from the run to the seat | the seat's place, both shapes' edges, the gap and the neck are inside the bounds, the first-frame bound included, and the seat never moves more than the any-frame bound in one row; the seat's glyph is under 0.1 while `p` is 0 and no unit of the run intersects it; at collapsed rest one plate paints and the region is hidden and inert; P-1's six readings hold; the dock stays open while the pointer rests in the gap, and the seat is the `elementFromPoint` target over its glyph in every 400 ms sample; the seat is the Tab stop after the run | daraksha's second dock: about 116 px in one frame at each end of the collapse; the prototype's 25 ms parting. Bites: an SVG filter on the container (the backdrop is gone in WebKit); the region mounted outside the root (the dock folds under the pointer); a leaf the size of the row under the shapes (the gap is not the page) |
| G-6 · the labelled seat, and the hover guard | both engines, 1440 fine and 390 fine, with each seat current in turn: hover each seat of each kind (plain, labelled, trigger, active), then leave; a sweep across every seat boundary at 20 px a second; keyboard focus through the run | **the 0 px hover guard:** the root's and every plate's box change by 0 px in every row of every hover of every kind; the hovered seat is the hover target in every row from enter to leave; in the sweep the hovered seat changes once per boundary; each neighbour's `translate` is inside the bounds; the name's box with its gap intersects no other unit's glyph in any row; the name is under 0.1 until its room is within 2 px of open, readable by 150 ms, and gone by its exit clock with at least five samples each way; the set of seats that show a name is the same whichever seat is current; a labelled seat is a `.plate` with its `::before`, at `font-weight` normal, and computes no `box-shadow`, no gradient, no `backdrop-filter`, no `filter` and no `background-color` transition; one spatial animation runs per element; no dock seat in the release computes a gleam | O-282's reported shift (no cause is on record; the gate is the guard); the prototype's "Bookmarks" over the Library glyph. Bites: the name put in flow; a `transition` shorthand on the run's children; the last seat made current |
| G-7 · the outlet | vitest, and Chromium at 1440: content declared in a sibling tree; the outlet mounted before its dock; the dock unmounted and remounted; `region="persistent-end"` on one route of two; two outlets into one region | the content's rendered elements are direct children of the named region, after its authored children and in mount order, and the outlet renders no element of its own; `useOptionalDockContext()` inside it returns that dock's id; the run roves the contributed seat; the content mounts when the dock registers and leaves when it goes; on the route with nothing contributed the region takes no room, within 0.5 px of a dock with no region; `git grep -nE 'querySelector|getElementById|closest\(' -- src/components/dock/DockOutlet.vue src/components/dock/composables/dockRegistry.ts` prints nothing | daraksha's `<Teleport defer to="#dock-page">`: no context reaches the controls. Bite: the provide removed |
| G-8 · overlays | both engines, 1440; a menu, a select, a click popover, a hover popover with `keep-dock-open`; each opened from a run seat, a layer-face seat, a seat contributed through the outlet, and the fission seat once released; folded by a press outside, by Escape twice, and by the linger, with the recording held past the linger | while open, the dock does not fold by the linger; on a dismissal each overlay's exit starts no later than two frames after the fold's first row, has at least five samples with no step over 0.4, and ends before the plate lands; an overlay opened from a persistent seat stays open through the fold | daraksha: the popover neither held the dock nor closed, and floated after the fold. Bite: the face mark not provided by the outlet |
| G-9 · the published progress | both engines; an unfold, a fold, a reversal, a layer swap; one follower under `data-dock-scope` that moves by `calc(var(--dock-expand-t) * 100px)` | on the root the property reads 0 at collapsed rest and 1 at open rest and is present at rest, after a layer swap as well; it is within 0.02 of the plate's travel in every row of a posture travel; the follower is within one row of the plate; no row shows the new posture class without `[data-morphing]`; the attribute also covers a content change | master: the scalar is removed at rest. Bite: the scope write removed |
| G-10 · reduced motion | every cell of G-2, G-4, G-5 and G-6 once, both engines, under `prefers-reduced-motion: reduce`; G-1 (c) once | every box, corner, `translate` and clip takes at most two values, in one frame; every change that paints differently at its two ends shows opacity at three or more values over 50 to 144 ms; nothing runs past 144 ms; the fold still comes one linger after the leave | dock F11: every motion lands in one frame, content included. Bites: the dock's authorized rows removed; a planted `transition: border-radius 300ms` |
| G-11 · cost, and rest | Chromium by trace at 1x and at 4x CPU; WebKit by frame pacing. An out-of-flow dock, a dock in block flow, a dock with `#beside` once released, a dock with six labelled seats once released | per frame of travel, out of flow: one `Layout` event at most, with no more dirty objects than the dock has leaves the loop sizes; the loop's script is 0.5 ms or less at the median at 1x and 2 ms or less at 4x (the prototype reads 0.11 to 0.14 and 0.5 to 0.7, inside it); inline style writes land on 12 elements or fewer; style recalculation touches no element outside the dock's root and its scope element, and no frame repaints a `box-shadow` at a new radius. In block flow: the longest layout is 0.94 ms or less at 4x (W-B.17's figure for a size tween). A labelled seat's hover: 0 layouts. At rest, over 2 s: no frame callback scheduled by glass, no style mutation in the dock, and `getAnimations()` empty for its subtree. Nodes glass adds: 1 plate; for the fission seat, the nodes neck B's rebuild states, each counted and none the size of the row; 1 span per labelled seat; 0 rendered elements for the outlet. WebKit: no more than one frame in ten of a travel over 20 ms. `./dock`'s boot graph is no larger than master's at the cut and does not hold the test hook | the dock record's trace: 486 layouts in 67 frames of a fold. Bites: the plate's size written on the root; a loop left running at rest; a rule that sizes a box from `--dock-expand-t` |
| G-12 · static | node, over `src` and the built CSS and script | no `scale` on `.glass-dock` or its regions; no `clip-path` on a plate at rest; no `box-shadow` on `.glass-dock`, and one `box-shadow` value for the plate across both posture classes; no `filter: url(`, `<filter` or `feGaussianBlur` under `src/components/dock/`; no size, margin or padding property in a dock `transition`, `@keyframes` or `.animate(` call, the seat's own list included; no `transition` shorthand on a selector that matches the run's children; no `var(--dock-expand-t)` in a size, padding, inset, radius or margin declaration; `--dock-morph-origin`, `--dock-size-scale`, `--dock-pane-shift` and `--dock-rest-t` absent; no `[data-glyph` selector under `src/components/dock/`; `__dockHold` absent from the built bundle; no millisecond literal for the intent or the linger in `useDockState.ts`; `[data-morphing]`, `--dock-morph-t` and `--dock-expand-t` present | master: `shape.css:104-109`, `dock.css:93`, `shell.css:245`, `run.css:526-535`. Bites: each of the earlier text's four recorded plants (`../design/dock-cluster/fold.md` F2) |
| G-13 · census, focus, hit, forced colours | both engines, 390 and 1440; Chromium alone for `forcedColors: "active"`, light and dark | `ariaSnapshot` and each persistent seat's census are identical collapsed, mid-travel, open and back; the fission seat is inert and hidden collapsed, and focus held on it when a fold starts moves to the summary; on a coarse pointer every seat's hit box is 44 by 44 px or more; in a layer group one seat of the active face has `tabindex="0"`, Arrow, Home and End move inside the face with no wrap, and a swap re-derives the stop; under forced colours each shape has one closed outline, parted or fused, and no edge runs round the root | `inert` on a region while it moves; a 24 px seat; master's roving (every seat a stop); the root's forced border left in |
| G-14 · the shipped line | the witnesses of 10.1.1 to 10.1.5, 11.0.1, 11.0.2 and 11.1.0 as merged (`tests-visual/release-*.spec.ts`) | GREEN in both engines with their expected values unchanged, save the restatements R-1 names | a restated witness that no longer bites on its own plant |

D2's H8 battery is not a gate. Its rows read the same edges on a virtual clock that G-2 to G-5 read on rendered frames, and two instruments for one dock is how the earlier loop kept finding new cells. Its `swap` scenes and its retargets at 40, 80 and 120 ms are ported as scenario files for G-4.

One challenge pass and one fold on the build. A second challenge runs only if the first lands a finding outside this list. A critic gates on the list and adds no row.

## Order of build

**Owed to the prototype, before the build.** The worktree `.claude/worktrees/bl/dock/wi8`, glass's own page and the consumers' compositions. P-0 is read, with the exchange built and not the carrier alone (the trace in R-1). Nothing below has a WebKit reading, and WebKit is read first once the guard admits a run.

- **P-1.** Neck B, rebuilt with tangent arcs, R-6's `p`, the gap as the page and one shadow per shape, by the six readings, reading 1 first. Two strips of `p` for the owner.
- **P-2.** How the name enters, A and B, read again under the room rule.
- **P-3.** The labelled seat's room under R-7's one way to name a seat: with daraksha's seat set and glass's standard set at 1440 and at 390 fine, with each seat current in turn.
- **P-4.** The swap's strip on D2's `swap` scene, long and short, for OQ-4, in three forms: the windows as written; windows that overlap so the two faces sum to at least 0.3 in every row; bp13's exchange (`../design/dock/LANDING.md`). Not built.
- **P-5.** `release/11.1.0` and the head of `release/11.0.2`, neither read by the audit: the run's mark and glide (dock F1), the rounded corner (F6), the cross axis (F3). Not built.
- **P-6.** daraksha's composition on the head of 11.0.2: content outside the closing plate, the return mid-fold, and whose the options panel's uneven chips are. Not built.
- **P-7.** What the owner saw "teleport away" on atlas production. The ledger's reading is the rail's own 150 ms grace; it is not confirmed. Not built.
- **P-8.** The carrier's cures, re-read on every fold, unfold and reversal cell with the probe that reads clips: the clip in the plate's coordinates (C-1), regions carried by their edges with lanes (C-2), content on the posture coordinate (C-3), hit on the plate (C-9), the place trigger (C-7). The prototype's rows for "content inside the plate" and for opacity on every fold cell are withdrawn until then.
- **P-9.** The card and the vertical dock, atlas's rail and phone sheet among them, with rest geometry on the class (C-8).
- **P-10.** The cut cap drawn without the plate's radius (C-20).
- **P-11.** One held crop each side of a travel's first row on a live dock with an active persistent seat, both engines: a region that gains a clip and a `translate` becomes a backdrop root for that time, and whether the seat's lens changes is unread (C-20).
- **P-12.** The three-layout frames, explained (C-10), and the trace's style recalculation and paint (C-16).

**The build.**

1. **The cut.** `release/11.2.0` from master after 11.0.2, 11.1.0 and 11.1.1 merge and after the u/dp intake merges by its reconciliation ruling (the root paints nothing; the corner and the cut cap are the plate's).
2. **The carrier** (R-1, R-3, R-4), on P-8's to P-12's readings, with G-14 GREEN before anything is added. G-2, G-3, G-11, G-12. Nothing else about the dock is released until G-2 and G-3 are GREEN in both engines.
3. **Content changes** (R-5) and the roving (R-13). G-4. The open seat's `inline-size` leg is gone before this step closes.
4. **The clock** (R-2) and reduced motion (R-11). G-1, G-10.
5. **The registry and the outlet** (R-8), then overlays (R-9). G-7, G-8.
6. **The published progress, the figure preset, the README** (R-10, R-12, R-14). G-9, G-13.
7. **The fission seat** (R-6), only on P-1 passing in both engines. G-5.
8. **The labelled seat** (R-7), only on P-2 and P-3, and only in a release where every dock seat is a plate. G-6.
9. The gates in full, one challenge, one fold.

Steps 5, 7 and 8 do not depend on one another. 11.2.0 does not wait on 7 or 8.

## Consumer half

Each consumer changes at its own repin. glass tells atlas of every default here at booking and at publish. The files were read at each repo's main checkout (C-22 to C-24); two of the earlier text's citations did not resolve there and are corrected.

- **daraksha** (`src/shell/SiteDock.vue`, `src/scripture/ReaderDock.vue`, `src/name/NameDock.vue`). As mounted it is two GlassDocks, both `:collapse="false"`, in a centred grid, with pages teleporting their controls into `<div id="dock-page" class="contents">` (`ReaderDock.vue:51`, `NameDock.vue:11`).
  - It deletes the teleport and `#dock-page` for `<DockOutlet to="…">`, and the `Popover keep-dock-open` at `ReaderDock.vue:94` then holds and closes. It deletes `dir="ltr"` on the dock and whatever closes its Popover by hand.
  - It deletes its 6.0 s hold and its 90 ms intent trial for the tokens, if it folds again.
  - **Neither dock folds today, so the fission never plays there.** `#beside` gives it the separated theme seat and no parting. The owner's fission needs daraksha's dock to fold again; that is daraksha's choice and is named to it.
  - Its pages are names with no icons, so `label` is not for them, and no hover-label seat of its own is on disk to delete.
  - Under 38.2 rem it is two rows. One GlassDock cannot be, so the phone keeps two docks, and each glides when the other moves it (R-1).
  - The reader's view tabs sit in `<div class="views" role="group">`, a run child that is not a seat. It flattens that for the roving (R-13).
  - `ThemeControl` keeps its own turn; glass adds none.
  - Play joins the collapsed face through `region="persistent-end"`. Its occasion medal is a one-seat GlassDock, as now.
- **atlas** (`src/platform/chrome/dock/Dock.vue`, `Dock.css`, `composables/useDockCollapse.ts`). As mounted it is one vertical `shape="card"` rail driven by `expand()` and `collapse()`, and a 20 rem sheet on a phone restyled off `.collapsed`. `FigureDock` and `useLinger` are not in its main checkout.
  - Its rail is the card on the vertical axis: P-9's cell, the one that read the wrong rest corner.
  - **`Dock.css:72` sets `--dock-morph-t: 1`; lines 92 and 96 read it** for the plate's fill and the rim. The earlier text said line 72 reads `--dock-expand-t`. So 12.0.0's deletion of `--dock-morph-t` is what touches atlas, and it moves those three lines to `--dock-expand-t` then. Through 11.2.0 the property keeps master's meaning.
  - Its phone sheet changes its whole layout on the class. The plate glides from a pill to a sheet while the content inside is laid out as a sheet from the first row, clipped to the plate. That is its own cell in G-2.
  - The labelled seat and the fission seat are horizontal only; the rail gets neither.
  - When its figure docks land it deletes `useLinger`, the rail's fixed 150 ms grace, FigureDock's own state logic (for the three states, `v-model:pinned` and `[data-preset="figure"]`), taking its site layer and foot out of flow during a fold, and any workaround for the open size being measured while the root is collapsed.
  - It is told: the intent counts from movement; `--dock-linger` is 6 s and grows to 12 s, and its `clamp(0.5 × dwell, 400 ms, 2400 ms)` is not the dock's; a touch tap opens and lingers and never pins, and a host that wants a tap to pin sets `pinned` itself; `[data-morphing]` also opens on a content change; `--dock-expand-t` rests at 0 and 1 and drives paint only; the open dock's shadow is the collapsed one's; an outlet's content lands after the authored seats; the seat-by-seat unfold and the grow-down are not built (OQ-3); the dock rests as a capsule (O-199), and its open home rail's 30.75 px corner is its own to keep or drop.
- **fourier** (`web/src/components/layout/AppDock.vue:172-253`, `components/visualization/CanvasControlsDock.vue`, `EditorControlsDock.vue`).
  - Its site dock is `:collapse="false"`. Moving the theme toggle to `#beside` gives a still second shape and no fission, as with daraksha.
  - Its two canvas docks fold, and the canvas dock keeps Edit in `#persistent-end`: the composition where a persistent region swept across the run (C-2). It is a G-2 cell.
  - A label shown by `v-show` inside a trigger (`AppDock.vue:226`) changes the run's width with no fade of its own. The plate glides; the label still appears in one frame until fourier gives it presence.
- **color, the value.js colour app** (`demo/shell/dock/Dock.vue:279-479`). One dock, a DockLayerGroup with no switcher, four layers with one behind `v-if`, a `#collapsed` face.
  - Its Tools to tool swap glides with no change of its own, and its one-frame steps on a route change (C-03) and blank first seat (C-04) are R-5's; it deletes any guard it wrote for either.
  - Its `vj-settle` beat waits on `[data-morphing]`, which now also opens on a select's value or a label's width changing. It is told, and narrows the beat if it does not want it there.
  - Its layer behind `v-if` leaves by R-3's held fade.
  - It has no theme seat today. If it adopts `#beside` it is the layer group with a seat that G-4 names. The two-dock recipe it was given on 2026-11-12 is withdrawn.
- **keyframes** (`demo/app/dock/ChromeDock.vue`, `components/instrument/transport/TransportDock.vue`). Two docks in one app.
  - The transport is `collapse="closed"` with Play in `#persistent` and no `#collapsed` face: a persistent region beside an empty summary. It is a G-2 cell.
  - The theme toggle to `#beside` on the chrome dock is the one consumer where the fission plays as the owner described it. The neck is judged on that composition (P-1).
  - It sets `--plate-tone` per seat in place of its own per-seat fills when its seats are plates, all at once in 12.0.0.
  - The view transition round its Play and Pause is W-B.17's row.

## Open questions

Six, for the owner. Each has a default, and the build proceeds on it. `../design/dock/wi8/OWNER-READ.md` puts the four that are live.

- **OQ-1.** When the dock is collapsed, is the theme seat gone, or does it sit in the pill? Default: gone, by "fuse into the main dock and collapse away". A site that wants it at rest uses `#persistent-end`.
- **OQ-2.** The linger is 6 s and grows by half the time spent in the dock, up to 12 s. Does the growth ship on in 11.2.0, and should a pointer that only brushes the dock keep it open for less? Default: on, by "based on dwell time too"; and no shorter linger for a brush, since his latest word asks for longer.
- **OQ-3.** Does "keeping the dock the same size" hold for a figure dock, so that no seat unfolds as the pointer reaches it? Default: yes.
- **OQ-4.** The layer swap, by strip, from three forms (P-4). Default: the old content gone by 35 % of the glide and the new whole by 70 %.
- **OQ-5.** If the one neck left cannot draw a hairline on the two facing ends, does the seat ship without it? Default: no; the fission seat stays held.
- **OQ-6.** The labelled seat: does the current page show its name at rest, and does the seat wait for 12.0.0, when every dock seat goes flat together? Default: yes to both.

## What became of the ledger's rows

| rows | where |
|---|---|
| L-1, L-2, L-12 | R-1, R-4, R-5; G-2, G-4. Each change in L-2's list is a cell. L-1 is broken in the build as read (C-1) |
| L-3, L-4 | R-1, R-4; G-2. Pill and rounded read; the card is P-9. atlas's 30.75 px corner is atlas's |
| L-5, L-6, L-7, L-8 | R-1, R-3, R-4, R-2; G-2, G-3. L-5 is broken in the build (C-1); L-7 and L-8 are built the other way (C-3, C-9); L-6 has no reading and is a G-2 cell. daraksha's readings are gated on daraksha's composition (P-6) |
| L-9, L-10, L-11 | R-3, R-5; G-4; OQ-4. The strip is not shot |
| L-13, L-14 | R-1 (one constant shadow), R-4; G-2 |
| L-15, L-16 | R-1; G-11. P5's sentence is owed; the layout count fails. O-258 is 11.1.1's |
| L-17 | not here: O-311, 11.1.1. The run's mark leaves the token for the loop (R-5); the switcher's indicator stays on it |
| L-18 | R-11; G-10 |
| L-19 to L-23 | R-2; G-1. The dwell growth ships on. The 840 ms window is not a token |
| L-24 | not here: O-299 (c), 11.1.1 |
| L-25, L-26, L-27 | R-2 (the tap, by pointer), R-12; OQ-3 |
| L-28, L-29, L-31, L-32, L-33 | R-7, held; G-6. The 0 px guard holds. O-290's flat seats reach the dock when every seat is a plate |
| L-30 | not here; the orchestrator places it. Until then a coarse pointer has no name for a seat but the current one |
| L-34 | not here: the pair is W-B.17's, the lens is O-203's in 12.0.0, and the one-frame lens ships until then, stated in "Not in this wave" |
| L-35, L-36, L-44, L-51 | R-14 |
| L-37 | shipped in 11.0.2; G-14 carries it |
| L-38 | not here: W-R.1's rule |
| L-39 | R-6 names the fault; the glyph's redraw has no wave |
| L-40 to L-43, L-45, L-46, L-47 | R-6, held; G-5, G-13. No neck passes and the gap is not the page (C-11, C-12); the timing is C-4 |
| L-48, L-49 | R-9; G-8; P-6. The close with the fold is unread |
| L-50 | R-8; G-7 |
| L-52, L-53 | R-10, R-1; G-9. Unread |
| L-54 | not built, with the reason |
| L-55 | R-1 |
| L-56 | R-13; G-13 |
| L-57, L-58 | 11.1.1 (O-316, O-312); the glide as a quantity of the loop is not built, and the layout leg remains (R-5) |
| L-59 | R-8; G-7 |
| L-60 | R-1 (reads before writes). O-215's first-mount row closes on 11.1.0's close trace; above 16 ms this build adds one trace cell at 390 and 4x |
| L-61 | not here: no trace exists for the 61 ms raster (O-259). It is read first, in 11.1.1's scope |
| L-62 | "Not in this wave": its own commits on 11.2.0 |
| L-63 | G-11 |
| L-64 | not a gate: one capture set in Safari before the tag if the owner's machine allows, otherwise recorded as unmeasured. Today there is no Safari and no WebKit reading |

## Cut on the last pass

Read once as the owner would, for any transition, shade or wrapper that carries no intent. Each of these was in a draft, in the earlier text or in the prototype and is gone.

- A fade on the seat's shape as it parts. It appears by its shape, not by opacity.
- The shadow leaf the size of the row, and the two shadows lerped on every frame. One shadow, one value.
- A spring of its own for the fission, and for the content.
- Neck A: three leaves, a hand-over, a fillet mask.
- The dock's own glyph rule for the theme toggle.
- A second progress property for rest geometry.
- A test hook in every shipped dock.
- Icons that shrink to make room for a name. Neighbours shift; nothing scales.
- A bold name, and a second way to name a seat beside the open seat.
- A delay before a name shows, and a Tooltip built into the dock as its fallback.
- A fade of the divider's own.
- A pin badge or any other mark for the pinned state. The dock is open; that is the mark.
- A `folding` class or attribute. The state is collapsed and the travel is `[data-morphing]`.
- An eased curve for the linger. It is linear in dwell and clamped.
- The per-control stagger and the 0.82 pop on entering seats.
- A `preset` prop, a `name` prop, a `progress` emit and a new property name.
- A `DockLabel` or `DockSeat` component, and a wrapper element round the outlet's content.
- A dock-surface utility for a free-standing control.
- A token for the click guard's 840 ms.
- The H8 battery as a second instrument.
- The crossfade's standing reserve of its tallest face.

## Struck

From the 2026-11-10 text and the sections appended to it, each by a later word or a reading.

- **The bare seat** (§1.4, "It carries no plate") and its gate G-2 ("the seat is bare"): O-279, later, asks for "a dock bg".
- **The seat inside the collapsed plate** as part of the collapsed face: O-279's "collapse away" (OQ-1).
- **"Goo-free"** in O-279's placement: O-289, later, asks for goo.
- **Visible text labels on page seats** (O-290's placement): O-303, later.
- **"A label change animates the plate"** for a hover on a seat: O-303. It stands for every other width change.
- **The two-dock recipe** given to value.js: daraksha's 116 px reading.
- **The fixed 3600 ms window** and `collapseDelay`'s single resolution point as a constant.
- **11.1.0's fold on the leave frame** after a persistent press, and its leaving face that disappears at once under reduced motion.
- **"No tokens added"**: three are, and a fourth with the labelled seat.
- **The DockLayer `persistent` slot** held as a fallback for O-224: the outlet's `region` is the way.
- **The first-frame figure of 13 to 17 %** as a property of the plain pill: the audit read 8 % at most there (AUDIT §3). It stands as daraksha's reading of a dock at half frame rate, and G-2 gates the cure.
- The DockCluster rulings and gates the earlier text's §4 retired stay retired.

From the design seat's text, each by a reading in the challenge.

- **"One that leaves the DOM is gone in that frame"** (C-5).
- **A region's clip floored at its own box**, and a region carried by its centre (C-1, C-2).
- **`p = clamp((f − 0.5) / 0.5, 0, 1)`**, the parting on the second half of the travel in a straight line (C-4).
- **The shadow as a `calc()` lerp on the published property** (C-14), and **the one shadow leaf under the row** (C-11).
- **"The dock preset has none"** of overshoot (C-10).
- **Neck A** (C-12), and "B ships if it passes 3, and A otherwise".
- **`--dock-linger-max` equal to `--dock-linger` in 11.2.0** (C-17).
- **"A press or Enter on the folded face sets it"** for a touch tap (C-17).
- **The fission seat and the labelled seat as 11.2.0's promised pieces** (C-11 to C-13).
- **"Until then an unlabelled DockControl is as 11.0.2 left it"** beside a flat labelled seat in the same dock (C-15).
- **"atlas already reads it (`Dock.css:72`)"**, and daraksha's `ReaderDock.vue:105,154` and `ScripturePage.vue:981-984` (C-22, C-23).

## Records the orchestrator amends

The fold seat wrote this file, `../design/dock/wi8/fold.md`, `../design/dock/wi8/OWNER-READ.md` and three strips under `../design/dock/wi8/fold/`, and nothing else.

- `INDEX.md`: W-I.8's row (11.2.0 for the carrier, the clock, the outlet and the progress; the fission seat and the labelled seat held; the 12.0.0 defaults named above), and its summary, which still says "the bare `#beside` seat".
- INBOUND: O-279, O-289, O-290 and O-303 placed on R-6 and R-7, both held; O-275, O-302 and O-306 on R-2; O-301 on R-9; O-307 on R-8; O-248 and O-288 on R-1 and R-4; O-276 on R-12; O-281, O-296 and O-304 on R-14; O-222 marked overruled by O-279.
- Two rows need a home: L-30's Tooltip, and the DarkModeToggle's sun that reads as a second gear (O-239, L-39).
- `W-B.17.md` cites this file by its old section numbers. §1.2 is now R-1; §1.3 is R-3; §1.5 is R-5; §1.6 is R-11; G-4 and G-11 are G-4 and G-12. Its line "the theme seat's hover is `data-glyph=\"turn\"`" stands with the attribute set by the toggle, not the dock.
- `W-R.1.md`: the 12.0.0 rows above; `--dock-morph-t` joins the two stagger tokens in its deletions; the labelled seat rides its plate on dock seats (OQ-6); the linger's ceiling is no longer a 12.0.0 default.
- `docs/precepts/motion-canon.md`: P5's sentence for a leaf's insets (R-1) and P6's for the dock (R-11), still owed (`../review/fable-2026-11-10/owed-outside-BL.md`). `restraint.md` says "no motion on keyboard-triggered actions", and R-7 tweens the neighbours on keyboard focus, by P0; one of the two wants a sentence.
- `../audit/animation/harness/README.md` says the demo's routes still serve in the built trees; the dock record found they mount nothing.
- The ledger found that `constants.ts:61` reads 3600 on both release branches, though O-306 placed 6000 in 11.0.2. This text takes 6 s as the token's default either way; the branch wants a look.
- `../design/dock/LANDING.md` names OQ-1 and step 3 of the earlier text; they are OQ-4 and P-4 here.
- The machine: every WebKit reading this wave owes waits on a reboot. `../design/dock/wi8/prototype/lists/wk-proto.txt` and `wk-red.txt` are ready.

## Inputs after the fold (2026-11-14)

- O-340 and O-341: the owner has asked for fully round docks five times and for more docks with a collapse state (Gregg's filters). The stadium is 11.1.0's; this wave owns what he names beyond it: the layer change as one clear movement (the leaving layer goes one way, the entering comes from the other, the width on the same clock), the reading-progress rim following a collapsed dock's outline through the morph, a halo colour token (one value, no added layer), and figure docks that unfold. Each is a gate to add at the build, not a new design pass.
