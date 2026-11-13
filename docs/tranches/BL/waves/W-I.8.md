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

**How this text was made.** The ledger seat (claude-opus-5-5, 2026-11-13) read every record and wrote `../design/dock/wi8/LEDGER.md`: 64 rows, L-1 to L-64, with the conflicts between them. The design seat (claude-fable-5-2, 2026-11-13) wrote this text from the ledger, the animation audit (`../audit/animation/AUDIT.md`, `record/dock/RECORD.md`), the dock source on master at `99a1389e6` and W-B.17. It launched no browser and measured nothing. The prototype seat builds what "Owed to the prototype" lists, a challenger reads the build, and one fold rewrites this text to what the readings support.

This text replaces the 2026-11-10 spec and folds in the nine sections that were appended to it through 2026-11-12. The earlier text is `git show 99a1389e6:docs/tranches/BL/waves/W-I.8.md`. "What became of the ledger's rows" accounts for every row, and "Struck" names what the earlier text ruled that no longer stands.

Three limits bind every number here.

- No number in this file is this seat's. Each cites the record that read it.
- Every WebKit reading in those records is Playwright's WebKit build. Shipping Safari is unmeasured.
- The neck, the labelled seat, the linger by dwell, the outlet and the timed fade have no reading at all (LEDGER §5). Their numbers are defaults until the prototype reads them.

Release, for `INDEX.md`'s column: **it splits two ways.**

- **11.2.0**, additive: the carrier, the clock's tokens, the declared pinned state, the `beside` slot, the `label` prop, `DockOutlet`, the published progress property, the figure preset, the README. No prop, slot, export or token is removed.
- **12.0.0**, in W-R.1's run, each with a MIGRATION row: the linger's ceiling rises to 12 s; a press-opened dock lingers when focus leaves; every DockControl is a `.plate`; `--dock-morph-t` and the two unread stagger tokens are deleted.

## What a dock is

A dock is one surface whose size follows its content. It has three resting states: collapsed to its essentials, open, and pinned open. Everything else is travel between them or between two sizes of the open state, and all of it is one kind of event: the layout changes once, and what is painted glides from where it was to where the layout now is, on one spring, with its content fading inside the plate's moving edge. A fold, an unfold, a layer swap, a control added, the theme seat parting from the plate: each is that event with different boxes.

So the dock has one clock that decides when the state changes (R-2) and one carrier that moves the paint when it does (R-1). The rulings after those two say what each named piece is in those terms.

## Rulings

- **R-1: one carrier moves every size the dock has.** This is the carrier the 2026-11-10 text ruled (D2's, `../design/dock/LANDING.md`), kept whole and widened to both axes (O-248).
  - **One loop.** One `requestAnimationFrame` loop per dock steps every moving quantity on `springPreset("dock")`, then writes. It parks on the frame its last quantity lands. At rest the dock schedules no frame and writes no style (L-15).
  - **One measured model**, in the root's own px: each plate's four edges and corner, the regions (leading persistent, layers, trailing persistent, the fission seat), the faces, and each face's units. On a trigger it reads the new layout once, and each quantity holds painted minus layout and carries it to 0 with the velocity it had. A second change retargets the live quantities and never re-creates them.
  - **The plate's box is the painted shape.** The loop writes the plate's four insets and its radius in px, so width and height glide together and nothing is scaled. The radius is the lerp of the two rests' corners; for a capsule both are half the cross extent, so the plate is a capsule in every frame, for every shape (L-3). The plate's `clip-path` is deleted.
  - **What this costs, stated (L-16).** An inset is a layout property, and P5 as written forbids animating one. The plate is an out-of-flow leaf that nothing reads, so each frame of travel lays out that one box and no other. Its cost alone has no reading: D2 read 1.74 to 2.06 ms of main thread a frame for the carrier with the content exchange this wave does not build, against 0.15 to 0.21 ms for its floor (`../review/fable-2026-11-10/design-D2.md` item 3), and the carrier without the exchange lies between. The alternative, a scale with a counter-scaled corner, is what master does, and it is the source of the rounded dock's flat ends (dock F6), the seat's tick on the settle frame (F10) and the shadow swap (F13). G-11 bounds the cost per frame. P5's sentence for a leaf's insets is owed in the precepts repository.
  - **Everything else moves by `translate` and `opacity`.** A region moves by `translate`. A unit moves only when its place inside its face changes.
  - **The plate's edge is the only clip.** While travel runs, each region is clipped to the plate's painted box by one `clip-path: inset()` on the region, cleared at rest. No content pixel paints outside the plate in any frame (L-5). At rest nothing clips, so a hover plate may overhang the edge as it does today.
  - **One shadow, and it moves with the plate (L-13).** The rim pair and `--shadow-dock` move from the root to the plate. The collapsed and expanded shadows differ today (12 px at 0.12 against 20 px at 0.14) and swap in one frame. They become one declaration whose offset, blur and alpha are `calc()` lerps on the published progress (R-10), so no script writes the shadow and it has no arm frame. `--shadow-dock-override` still replaces the whole list.
  - **Hit follows paint.** The root and its structural boxes take no pointer events; the plates, the seats and the fission seat's region do.
  - **A dock in flow.** While travel runs, an in-flow neighbour follows the painted edge: the root's two margins on the moving axis are written each frame, which lays out the dock's parent. That is the one write that leaves the leaves, it runs only for a dock that is in flow and whose outer size changed, and G-11 gives it W-B.17's budget for a size tween. A fixed, absolute or sticky dock writes none.
  - **One window.** `[data-morphing]` is set before the posture class changes (a `flush: "pre"` watcher) and removed on the frame the last quantity lands, with every inline value the loop wrote. It opens on a content change as well as a posture change (L-53).
  - **One trigger per fact:** the content observer, one ResizeObserver, the posture watch, and a viewport resize that seats at layout with no travel. Reads are batched before writes (O-180 (3)).
  - **The first and last frames.** The loop's clock starts on the first frame it paints, not on the trigger, so the first frame paints the old box exactly and the second moves by the spring's own step from rest. A frame longer than 33 ms advances the spring by 33 ms, so a hitch is a pause and never a jump. That is the cure for the 13 to 17 % first frame daraksha read (`../design/dock/inbound/daraksha-dock-measures-2026-11-12-night.md`), which the audit traced to frames at half rate (AUDIT §3).
  - **What master already cures is carried as law.** Each 10.1.x and 11.x cure in the two files the carrier replaces is a law on the landed dock, with its existing witness as its gate and its expected values unchanged: O-101, O-110, the press that holds the posture, 10.1.5's invariant list as 11.0.1 forwards it, 11.0.2's cures as merged, 11.1.0's O-194, O-197, O-198, O-199, the gliding mark and `edge="border"`. A witness that reads a deleted mechanism is restated once to the law it guarded, and the build's record names each.
- **R-2: one clock decides the state.**
  - **Three states**, as today's `DockState` with its names: `collapsed`, `hover` (open by hover, focus or a tap) and `pinned`. Folding and unfolding are travel, not states: the state changes at once and the carrier eases what it set.
  - **Intent.** A pointer opens a collapsed dock after `--dock-intent` (60 ms), counted from its first movement inside the dock, so a page of docks scrolling under a still pointer opens none (L-21). Keyboard focus opens at once.
  - **The linger.** A dock opened by hover, focus or a tap never folds on the frame the pointer or focus leaves. It folds after `min(--dock-linger-max, --dock-linger + dwell / 2)`, where dwell is the time the pointer or focus has spent inside since the dock opened. `--dock-linger` is 6 s, the value placed in 11.0.2 (O-306) and the one daraksha holds today. Re-entry cancels the linger. The slope is atlas's, the only curve any record proposes; its 400 ms floor and 2.4 s ceiling are not taken, because the owner's later word asks for more than the 3.6 s he saw (L-19).
  - **In 11.2.0 `--dock-linger-max` equals `--dock-linger`**, so the default does not change and a consumer sets one token to turn the growth on. 12.0.0 raises it to 12 s (OQ-2).
  - **What holds the dock open.** It does not fold while an overlay opened from it is open, while `:focus-visible` is inside it, or while a pointer is down inside it. Each is checked when the linger runs out, and the linger starts again when the hold ends.
  - **Touch.** A dock opened by a tap starts its linger when the finger lifts, and each later touch inside restarts it. Today it has no timer at all and never folds (L-23). A tap into a cross-origin iframe is 11.1.1's cure (O-299 (c)) and is not built twice.
  - **Dismissal.** A press outside, Escape and `collapse()` skip the linger and fold by the same eased travel. `release()` with the pointer outside starts the linger; the 800 ms wait before a second full window is deleted (L-20).
  - **A return mid-fold reverses it.** A pointer or focus that comes back while the fold is travelling opens the dock at once, with no intent wait, and the carrier turns from where it is with its velocity (L-8). Intent guards only an opening from rest.
  - **Pinned is declared.** `v-model:pinned` on GlassDock. A press or Enter on the folded face sets it, as today; so can the host. It ends by a press outside, Escape or the host, never by the pointer leaving, and an open overlay holds it (L-25).
  - **The 11.1.0 exception goes.** After a press on a persistent control, 11.1.0 folds a hover-opened dock "as soon as the pointer leaves". O-275 is later: the linger applies there too.
  - **A press-opened dock** (`expandOn="press"`) closes at once when focus leaves, today. In 12.0.0 it lingers there and closes at once only on a dismissal.
  - **The 840 ms window is not a token.** It is the cap on the click guard after an expand (`composables/useDockClickIntegrity.ts:190-197`), not a clock anyone sees, and `[data-morphing]` is its real signal. It stays a constant.
- **R-3: content has one formula, a function of the travel.** Every change of which content shows runs on the travel's own progress `f`, 0 to 1:
  - the leaving content's opacity is `1 − f / 0.35`, clamped, so it is gone by 35 % of the travel;
  - the entering content's is `(f − 0.35) / 0.35`, clamped, so it is whole at 70 %;
  - opacity is written on the two faces, or on the two panes for a posture change, never on a box that holds both;
  - a control that joins a face enters on the second window; one that leaves the DOM is gone in that frame and its neighbours glide.
  - Both are functions of one number, so a reversal runs the same curve back and no opacity jumps (L-7; dock F5 read 1.00 to 0.51).
  - This replaces the per-control stagger and its 0.82 scale pop (`styles/layers.css:278-297`), which is a fade-up on every element. "The fading happens FASTER than the stretching" (`restraint.md`, Motion).
  - Old content is gone before new content arrives. For an instant near 35 % neither shows; at that instant the plate is mid-glide and has not arrived, which is what separates it from the fault daraksha and color read, where the box had already changed (L-9). G-4 bounds the instant.
  - The windows are a default with no strip behind them. The prototype shoots the strip and the owner picks (OQ-4).
- **R-4: the fold and the unfold are one gesture.** A posture change is R-1's travel with the two panes as R-3's content.
  - Width and height travel together. A layer-group dock's 52 px of height no longer lands in the first frame (dock F3), and the open size is never measured while the root is collapsed (atlas's first ask), because the old box is what was painted and the new one is read after the class changes.
  - Every control in the dock folds with it. A control's opacity is its pane's; its own held or grown state is its own, and its release is its own transition. A slider held when the fold starts loses its hold on the collapse edge and returns on its own clock (L-6).
  - Edge content arrives with the plate: a unit near the far edge is whole in opacity by 70 % and is uncovered by the plate's edge as it passes, so nothing pops in after the plate has landed.
  - A collapsed dock with nothing in its summary rests at the collapsed control size, not at a 16 px sliver (L-4).
  - A persistent seat is a region that moved by `translate` to its measured rest, so it lands there with no tick (L-14).
- **R-5: a layer swap is the same gesture with no posture change.** When the open dock's content changes size, the layout changes once, the plate glides on both axes, the regions and the fission seat ride its edges, and the faces follow R-3 inside the plate's clip.
  - The cause does not matter: a DockLayerGroup face, a label, a select's value, a control added or removed, a persistent region mounting, a route that changes the seat set (L-2).
  - DockCrossfade keeps its registry, its inert swap and its focus transfer. Its opacity reads the travel's `f` in place of a spring of its own, and its running-maximum reserve is deleted, since the plate now follows the active face.
  - A third change that arrives mid-swap starts from what is painted: every face still showing leaves from its painted opacity over the new travel's first window. No face is cut (dock F9).
  - The run's open seat is the same event. Its `inline-size` transition (`styles/run.css:522-553`), which lays out every frame, is deleted, and the glide to a seat past the fold becomes one quantity of the loop. Both are read on `release/11.1.0` first, which rebuilt the mark, and on 11.1.1's cure of O-316.
- **R-6: the fission seat is a slot, a second plate, and a neck.**
  - **API.** One slot on GlassDock, `beside`, for one control. No prop.
  - **Where it is.** A region after the trailing persistent region, inside the root, in logical properties: the right in a left-to-right page. Open, it is in flow on the dock's axis, one `--dock-layer-gap` past the main plate, on a plate of its own that paints the dock's surface (O-279 reverses O-222 and the 2026-11-10 text's bare seat).
  - **Collapsed, it is gone.** "Fuse into the main dock and collapse away": at collapsed rest the region is out of flow, hidden and inert, and the pill is one plate. A host that wants the control in the pill puts it in `#persistent-end` and gets no fission (OQ-1).
  - **It rides the travel, never layout.** The seat's place, its plate's edges and the neck are quantities of the posture travel. daraksha's second dock stood about 140 px away through the collapse and jumped about 116 px in one frame because its layout box moved at once (O-299 (a)).
  - **It parts late and fuses early.** With `p = clamp((f − 0.5) / 0.5, 0, 1)` on the unfold: below half the travel the dock is one plate; over the second half the gap opens to its rest as `p` goes to 1. The fold runs the same function back, so the seat fuses first and the fused shape then collapses. 0.5 is a default.
  - **The neck is an element, never an SVG filter.** A filter on the plates' container erased their backdrop in WebKit; a real element between the plates kept it (`~/.dev-logs/owner-1112/frames-4th/webkit-neck-vs-svg-goo.png`). Its shape is open between two designs, below.
  - **One shadow for the surface.** With a fission seat, `--shadow-dock` rides one leaf under the plates whose box is the row's painted extent, and the plates carry none. An outer shadow does not paint inside its own box, so the gap stays the page and neither plate's shadow darkens the other through its glass. A dock with no fission seat keeps its shadow on the plate and has no such leaf.
  - **No overshoot.** `restraint.md` allows it on fission. The dock preset has none (D2 Q-5 (a): weight, no visible bounce), and the seat does not take a spring of its own.
  - **Its hover is W-B.17's.** The theme toggle's sun and moon take `data-glyph="turn"`. The dock adds no lift, gleam or second fill. The sun reading as a cog at dock size (O-239) is the DarkModeToggle's glyph and is redrawn there, with one owner glance as its check.
  - **The hold is containment.** The region is a descendant of the root, so hover, focus, the overlay stamp and click-away hold through R-2 with no copy of them. The gap toward the main plate is the region's own padding, so no strip between the two reads as a leave.
  - **Centring.** The seat is in flow, so a centred dock centres the row (plate and seat) and the host's overflow reads the true extent. The main plate's centre moves by half the seat's room on an unfold. This was an owner question in the earlier text; it is taken as a default here and shown in the fission strip.
  - **Forced colours.** The root's forced border is removed (`src/styles/utilities/a11y-overrides.css:147-150`). Each plate's own border is its outline; the neck draws its two long edges only.
- **R-7: the labelled seat is one prop, and the plate does not move.**
  - **API.** `label` on DockControl. At rest the seat is its icon. On hover or `:focus-visible` the name shows at the seat's inline start, at `--dock-label-size` (one step above the dock's control text), and the neighbours shift to give it room.
  - **The name is out of flow.** It is one `aria-hidden` span that stays mounted, positioned against the seat. Showing it changes no layout, so the plate's size is constant by construction, and hovering any seat moves the dock's box by 0 px (O-282).
  - **Room comes from the neighbours' slack.** Each other seat can give up its slot down to the icon plus a floor, and each gap down to a floor. The run writes one `translate` per seat when the labelled seat changes, and CSS tweens it on `--spring-dock`. The `translate` leg is added to the seat's own transition list; a shared `transition` shorthand would erase that list (AUDIT rule C).
  - **The seat under the pointer keeps the pointer.** Its hit box always covers its resting footprint, so the icon may shift inside it and the hover is never lost.
  - **A name that does not fit is not shown in place.** It is never truncated and the plate never grows. Whether the standard seat sets fit is a reading owed (P-3); if they do not, the question returns to the owner with the strip.
  - **Horizontal docks only.** A vertical dock has no room at a seat's left inside its plate.
  - **Flat.** A labelled seat is a `.plate` from its first release: its hover, focus and on states are W-B.17's at the strength the owner picks there, its one colour is `--plate-tone`, and it computes no gleam, no gradient, no shadow and no `backdrop-filter` (O-290). `--plate-tone` is the rest-fill token O-274 asked for; there is one name, W-B.17's, and 12.0.0 does not rename it (L-29).
  - How the name enters is open between two designs, below.
- **R-8: the outlet is one component, and docks are found by id.**
  - **API.** `<DockOutlet to="site">`, exported from `./dock`, with one optional prop, `region` (`"run"`, the default, `"persistent"` or `"persistent-end"`). A GlassDock whose root has an `id` registers under it. No prop is added to GlassDock.
  - **What it does.** It renders its slot into the named dock's region by Vue's Teleport, as direct children with no wrapper, so the run's roving and its seat rules hold. It provides that dock's context, and the face mark when the region is the run, to its slot. So a Popover's hold and close, a Slider's hold, a menu's hold and a seat's face all reach controls a page contributes (O-307).
  - **No DOM lookup.** The registry is a reactive map from id to the dock's region elements and context, written by GlassDock at mount and unmount. The outlet reads the map. Content mounts when its dock registers and unmounts when it goes. Nothing registers on the server.
  - A persistent region that an outlet targets is rendered even when the host authored no slot for it, and an authored or targeted region with nothing in it takes no room (`.dock-persistent:empty`). That is the 2026-11-10 text's answer to O-224, kept: a layer's seat reaches the collapsed face through `region="persistent-end"`.
- **R-9: an overlay opened from the open dock closes with it, by its own exit.**
  - This has shipped since 10.1.1 for a seat in the dock's tree (`src/components/_shared/overlay/participation.ts:125-130`), and it reads right: the menu fades in 115 ms, two frames after the fold starts (dock record, "read as a whole"). It failed on daraksha because its controls were teleported in and had no context. R-8 is the cure; no second close path is built.
  - The fission seat is part of the face: it is gone when the dock collapses, so what it opened closes too.
  - An overlay opened from a persistent seat stays, as today: its trigger is still there.
  - The options panel's "contained properly" is unread: daraksha measured 13 px of padding all round and suspects the chips' heights (P-6).
- **R-10: the published progress is `--dock-expand-t`.** No name is added.
  - It is written on the dock's root on every frame of a posture travel and rests there: 0 collapsed, 1 open. It is never removed. atlas already reads it (`atlas/src/platform/chrome/dock/Dock.css:72`).
  - Siblings follow it through one attribute: when an ancestor of the dock carries `data-dock-scope`, the same value is written on that element, so anything under it inherits it. One dock per scope.
  - The cost is stated: a custom property written on an element recalculates style for that element's subtree each frame. A scope should be the smallest box that holds the dock and its followers.
  - `--dock-morph-t` keeps its meaning through 11.2.0 (written through a posture travel, removed at rest) and is deleted in 12.0.0.
- **R-11: reduced motion seats the geometry and fades the content.** Under `prefers-reduced-motion: reduce` every quantity of R-1 lands in the frame of the change, the neck and the fission seat included. R-3's `f` then runs as a linear clock on which the entering content is whole at `--duration-instant` (100 ms), inside O-198's 144 ms. The linger is kept. 11.1.0's leaving face that "disappears immediately" is overruled by P0: "it never makes a cut" (L-18). The dock's rows join W-B.17's authorized set; whether a consumer's own fades survive the fallback is W-B.17's open ruling (O-308).
- **R-12: the figure dock is this dock with a preset, and it does not unfold seat by seat.**
  - The three states are R-2's. Rest is the `#collapsed` face with the persistent regions; open is the run; pinned is `v-model:pinned`.
  - The preset is one block, `[data-preset="figure"]`, in `styles/density.css`, where the geometry presets already live: `--dock-intent: 120ms`, a 52 px rest height with 44 px seats, and a run that clips and does not scroll or snap (atlas G-02). No prop.
  - atlas's design unfolds each seat into its control as the pointer reaches it, yields rest seats by priority, and grows the dock down a row for a wide group. The owner's "keeping the dock the same size" is later and is about a hover on a seat. Read with atlas's own rule, "nothing already on screen moves under the pointer", it rules the seat-by-seat unfold out, so glass builds none. The dock changes size when it opens and when a layer changes, and a More face that is taller is R-5's travel on the cross axis (OQ-3).
  - A dock over a chart sets `backdropMode="static"`; atlas holds that rule already.
- **R-13: the roving keys reach a layer group.** Kept from the earlier text. The seat rule applies to each row: the run's own children, and the children of the active face in a layer group that is a direct child of the run. Each row has one Tab stop, with Arrow, Home and End inside it and no wrap; arrows do not cross rows. `role="toolbar"` sits on the element whose children are the seats, and the stop is re-derived when the face changes (L-56).
- **R-14: dividers, the Home seat, a free-standing control and the page plate are README text.** Nothing is built for them.
  - A `DockSeparator` goes between groups of a different kind (navigation, the page's tools, utilities), never between every seat. In the face it fades with the face; in a persistent region it rides the region. It has no fade of its own.
  - The first seat of a standard dock is Home, in `#persistent`, so it is there in both states.
  - A free-standing control takes the dock's plate as a one-seat `<GlassDock :collapse="false">`. No dock-surface utility is exported.
  - Two docks in one row: the root centres itself with auto inline margins, so the host sets `margin-inline: 0` on each and centres the row.
  - The page-level plate is `Card`.

### Open between two designs: the neck

Both share R-6 and differ in what paints the glass while the seat parts. The prototype builds both.

**A, three leaves.** The main plate, a neck and the seat's plate are three boxes of the dock's surface that meet edge to edge and never overlap, so the tint is one depth everywhere. Fused, the main plate's trailing corners and the seat plate's leading corners are square and the neck has no length, so the three are one capsule. As `p` rises the gap opens to `g·p`, the neck spans it at a thickness of `H·(1 − p)`, and the facing corners round to `R·p`, so the neck's long edges always meet the ends of the corner arcs. At `p = 1` the neck is gone and both plates are capsules. Below half the travel only the main plate paints; the hand-over to three boxes happens in one write, mid-flight, on an identical outline. Every box is sized by the loop, like the plate. It is daraksha's measured technique, it keeps each plate's own border, and it adds no mask. Its shoulders are two right angles on each side for the frames between, and its two junctions are two backdrop boxes side by side, which may show a seam where one blur ends and the next begins.

**B, one leaf cut to shape.** The dock's glass is one box over the whole row in every state, so there is one backdrop, one tint, and no junction. While `0 < p ≤ 1` it carries a `clip-path: path()` that the loop writes each frame: two capsules joined by a waist whose sides are arcs tangent to both ends, which is the true shape of two drops parting. At open rest the path is two capsules and is not rewritten. No box is laid out for the neck. Its cost is that a clip cuts the leaf's own border and inset rim along every cut edge, so the facing ends have no hairline (the comment at `styles/shell.css:239-244` puts the dock's border at 4 % alpha or less; reading 3 below measures what is lost), and nobody has read a `clip-path: path()` rewritten each frame over a `backdrop-filter` in WebKit.

**What decides (P-1).** Both engines, light and dark, 390 and 1440, on a flat ground and a striped one, held at `p` = 0, 0.25, 0.5, 0.75 and 1, and run live:

1. The backdrop is kept in WebKit at every held `p`. The SVG filter, planted, must fail this reading.
2. One surface: on the flat ground every glass pixel is within 2 of 255 of the main plate's centre, and on the stripes no column at a junction differs from the mean of its two neighbours by more than 4.
3. The edge: at 4x, the facing ends at open rest match the outer ends within 2 of 255 along the rim.
4. The motion: the gap and the neck's thickness stay inside G-2's bounds in every frame, and the frames either side of A's hand-over differ by no more than 2 of 255 away from the moving edges.
5. The cost per frame at 4x CPU.

A design that fails 1, 2 or 4 in either engine is out. If both pass, B ships if it passes 3, and A otherwise. If neither passes, the build stops and reports; it does not invent a third.

### Open between two designs: how the name enters

**A, it fades in at its size.** The name is laid out at its full size and only its `opacity` and 4 px of `translate` toward its rest change, with W-B.17's presence amounts and clocks. The neighbours' shift is the one movement of the hover and the name's fade is its coupled fade. Text is never scaled, so its glyphs are sharp in every frame.

**B, it grows from the icon.** The name scales from 0.8 with its origin at the icon's edge, with `opacity`. It is the literal reading of "display larger". It is a second spatial movement on one hover, and text under a scale is drawn once and stretched, so it may soften mid-tween, in WebKit most of all.

**What decides (P-2).** In both engines: the edge contrast of the name's glyphs on its middle frame against its last; the count of spatial animations running on one hover (G-6 allows one per element); and the time at which the name is readable (opacity 0.8 or more and within 2 % of its size), which must be 150 ms or less. Then one strip of each for the owner. The default is A.

## Scope

### API

| surface | change | release |
|---|---|---|
| `GlassDock` slots | `beside` added | 11.2.0 |
| `GlassDock` props | `pinned` (with `update:pinned`) added | 11.2.0 |
| `DockControl` props | `label` added | 11.2.0 |
| `./dock` exports | `DockOutlet` added | 11.2.0 |
| attributes | `data-dock-scope` on a host's element; `[data-preset="figure"]` | 11.2.0 |
| tokens | `--dock-intent` (60 ms), `--dock-linger` (6 s), `--dock-linger-max` (6 s), `--dock-label-size`; a labelled seat reads W-B.17's `--plate-tone` | 11.2.0 |
| published property | `--dock-expand-t` documented, written each frame and resting at 0 and 1 | 11.2.0 |
| paint every consumer sees | every size change glides on both axes; content fades on the two windows; the per-control stagger is gone; `[data-morphing]` also opens on a content change; the linger applies after a persistent press | 11.2.0 |
| defaults | `--dock-linger-max` 12 s; a press-opened dock lingers when focus leaves; every DockControl is a `.plate`; `--dock-morph-t`, `--dock-stagger-window-size` and `--dock-stagger-step` deleted | 12.0.0 |

That is one slot, one prop pair, one prop, one component with two props, two attributes and four tokens.

### Files

Under `src/components/dock/` unless a path says otherwise.

| piece | add | edit | delete |
|---|---|---|---|
| the carrier (R-1, R-3, R-4, R-5) | `composables/useDockBody.ts` (the loop), `composables/useDockScene.ts` (the model, the travel, the triggers), `composables/useDockContent.ts` (the two windows) | `GlassDock.vue`, `DockCrossfade.vue`, `composables/useDockRun.ts`, `styles/dock.css`, `shell.css`, `shape.css`, `layers.css`, `crossfade.css`, `run.css`, `morph.css`, `shell-regions.css` | `composables/useDockMorph.ts`, `dockMorphMeasure.ts`, `useDockSpring.ts`; the root's scale and the regions' counter-scales (`shape.css:104-141`); the pill's counter-scaled corner (`run.css:786-792`); the morph clip (`shell.css:318-323`); `--dock-morph-origin`, `--dock-pane-shift`, `--dock-size-scale`; the plate's `clip-path` (`dock.css:93`); the shadow swap (`morph.css:161-167`); the stagger and the 0.82 pop (`layers.css:278-297`); the crossfade's reserve and its own spring (`DockCrossfade.vue:86-115`); the stale-face snap; the seat's `inline-size` transition (`run.css:522-553`) |
| the clock (R-2) | | `composables/useDockState.ts`, `constants.ts`, `composables/useDockShellProps.ts`, `styles/shell.css` (the tokens) | `HOVER_INTENT_MS` and `DOCK_COLLAPSE_DELAY_MS` as literals; `release()`'s 800 ms wait (`useDockState.ts:496-511`); 11.1.0's close on the leave after a persistent press |
| the fission seat (R-6) | `composables/useDockBeside.ts` (the seat's quantities and the neck), `styles/beside.css` | `GlassDock.vue`, `src/styles/utilities/a11y-overrides.css` | the comment that calls fission retired (`GlassDock.vue:609-610`) |
| the labelled seat (R-7) | `styles/controls/label.css` | `DockControl.vue`, `composables/useDockRun.ts`, `styles/controls/icon-button.css` | nothing in 11.2.0; in 12.0.0 the dock's per-control hover fills, with W-R.1 §2.6 |
| the outlet (R-8) | `DockOutlet.vue`, `composables/dockRegistry.ts` | `GlassDock.vue`, `composables/dockContext.ts`, `index.ts`, `scripts/lib/subpath-policy.mjs` if the boot graph needs it | nothing |
| the progress (R-10) | | `styles/morph.css` | in 12.0.0, `--dock-morph-t` |
| reduced motion (R-11) | | `src/styles/utilities/a11y-overrides.css` (the dock's authorized rows) | the spring's jump under reduced motion; `DockCrossfade.vue:218-221` |
| the figure preset (R-12) | | `styles/density.css` | nothing |
| the roving (R-13) | | `composables/useDockRun.ts` | nothing |
| the README (R-14, and every piece above) | | `README.md` | the idle window's paragraph as written |

`useDockMorphOrchestrator`, `useDockExpandedSize` and `useDockSpring` are not exported from `./dock`; the build re-reads `.published-roster` before deleting their files.

Tests: the gates below under `tests-visual/dock/wi8/` and `tests/components/custom/dock/`. A test that reads a deleted mechanism is restated or deleted with it, each named in the build's record.

### Not in this wave

- The rest of W-0.8's unit and W-I.1: scroll compact, the rim as a plate child, the press direction, the cut cap's strike, the state attribute. `INDEX.md` places them.
- The dock seats' gleam and the active seat's nested blur (O-203): W-R.1, 12.0.0. Until then an unlabelled DockControl is as 11.0.2 left it.
- The Play and Pause pair and every chevron: W-B.17's pieces, on its release.
- The switcher's swallowed tap (O-312), the spring tokens' last step (O-311), the run's glide (O-316), the iframe fold (O-299 (c)), WebKit's idle scroll-timeline animations (O-258): 11.1.1. The build reads each as merged.
- A Tooltip on every dock control (L-30). It would put Tooltip in the dock's boot graph, and the registry placed it with W-I.1. The orchestrator places it; this wave builds none.
- The dock menu's text on a coarse pointer (O-233): W-R.1's rule.
- A persistent region present only while open (atlas's third ask). What atlas takes out of flow by hand during a fold is content of the face, and R-4 clips and fades it there. A third kind of region is not added.
- A dock that grows down by wrapping, seats that yield by priority, and the seat-by-seat unfold (R-12).
- A second glass dock in one composition, and DockCluster, as the earlier text ruled.
- The two reverts that left 11.1.0 (O-211's switcher import, which needs a public shape change, and K12) ride 11.2.0 as their own commits, not as part of this build (L-62).
- Haptics (O-253): 11.3.0.

## Gates

Fourteen gates, and the list is closed. Each is read once RED and once GREEN, with its bite read once. RED is master at the cut unless a record is named.

**How they are read.** With the animation audit's harness (`../audit/animation/harness/README.md`): the build's tree is built by `build-tree.sh` and served on a port from 5401 to 5404; one hand page, `?c=dock-wi8`, holds the cells; scenario files drive them; `probe.mjs` writes one row per rendered frame and `faults.mjs` flags them. A small judge beside the scenarios applies the bounds below to the rows. Chromium is the headless shell with GPU compositing, about 8.3 ms a row; WebKit is Playwright's, rows only. Pixel readings are crops of a travel held at a given `f` by a test-only hook on the loop, in both engines. One browser per run, a new context per cell, every run through `guarded`, every WebKit run through `guarded --exclusive webkit --timeout 10`.

**The bounds, used by G-2 to G-6.** They are computed at run time from `springPreset("dock")` as the build exports it, at each row's own frame length; no probe carries the preset as a number.

- **First frame:** the first moving row moves a tracked edge by no more than 1.15 times the preset's own first step from rest at that frame length (about 1.5 % of travel at 8.3 ms, derived), and never more than 4 %.
- **Any frame:** no row moves an edge by more than 1.15 times the preset's largest step at that frame length (6.98 % at 8.33 ms, `../design/dock-cluster/fold.md` F7).
- **Last frame:** the last moving row moves an edge by no more than 1 px and no more than 2 % of travel, and the row after it equals the rest within 0.5 px.
- **No reversal:** no edge steps against its net direction, except after a `reverse-*` mark.
- **Inside the plate:** no unit has any part of its clipped box outside the plate's painted box while its effective opacity is above 0.1.
- **Opacity:** no content opacity moves more than 0.4 between two 60 Hz samples, and each fade has at least five samples (W-B.17's clause 4).
- **No dropped frame of glass's own:** no gap over 25 ms between rows overlaps a long task or long animation frame whose script is in glass's bundle, on a machine at a load of 20 or less.

| id | gate and cells | passes when | RED, and the bite |
|---|---|---|---|
| G-1 · the clock | real clock, pointer and taps; both engines; 390 coarse and 1440 fine. (a) the pointer enters and rests; (b) a dock scrolled under a still pointer, 2 s; (c) leave after a 1 s visit; (d) with `--dock-linger-max: 12s`, leave after a 12 s visit; (e) leave and return at half the linger; (f) leave with a menu open, with `:focus-visible` inside, and with a finger held down; (g) a tap opens, the finger lifts; (h) a press outside, Escape, `collapse()`; (i) `release()` with the pointer outside; (j) `pinned`, then the pointer leaves for 15 s; (k) a press on a persistent seat of a hover-opened dock, then leave | (a) opens `--dock-intent` after the first move, within 30 ms; (b) stays collapsed; (c) the fold's first row is 6 s after the leave, within 100 ms; (d) 12 s, within 150 ms; (e) no fold, and a full linger after the next leave; (f) no fold while each hold lasts, and one linger after it ends; (g) folds one linger after the lift; (h) the fold's first row within two frames, and its travel inside the bounds; (i) one linger, never the same frame; (j) no fold; (k) one linger | master: 3.6 s; (g) never folds; (i) 800 ms and then a second window; (k) on 11.1.0, the leave frame. Bite: the linger token ignored |
| G-2 · the fold and the unfold | both engines; pill, rounded and card; horizontal and vertical; a layer-group dock (56 and 108 px tall); a two-slider dock; daraksha's composition through the outlet with its widest control; an empty summary; each with and without `#beside`; opened by hover, focus and tap, folded by the linger, Escape and a press outside | every plate edge on both axes is inside the bounds; every outer corner is the px lerp of its two rests within 0.5 px in every row, and the two corners of an end are equal within 0.25 px; content is inside the plate; the last unit is whole and unclipped no later than the row the plate lands; a persistent seat's last row equals its rest; `box-shadow` shows no DISCRETE flag; an empty summary rests at the control size | dock F3 (+52 px of height in the first frame), F6 (a 2 by 16 px corner, a bar that turns oval on the settle frame, a 16 px sliver), F10 (+1.0 and −2.1 px on the settle frame), F13; daraksha's 13 to 17 % on v11.0.1. Bites: the loop's clock started at the trigger; a region's clip removed |
| G-3 · a reversal | Chromium at 30, 50 and 80 % of an unfold and of a fold, by Escape and by the pointer returning; WebKit at 50 % | no INTERRUPTION flag on any channel, opacity included; each edge's velocity change across the turn is no more than the spring's own; after the pointer returns the plate turns within two frames | dock F5: opacity 1.00 to 0.51 and 0.14 to 0.36 in one frame; a hover return lands at 83 % after the 60 ms wait. Bite: two opacity formulas |
| G-4 · a layer swap | both engines, 390 and 1440: drill in and back; a crossfade through faces of 2, 4, 1 and 3 rows; the switcher by key; a third change 90 ms after the second; a fold during a swap; a select's value; a persistent region mounting, open and folded; a seat added and removed; a route that changes the seat set; the run's open seat moving | every plate edge on both axes is inside the bounds; the leaving face is at 0.02 or less before the entering face passes 0.02; rows where every face is under 0.1 number at most two in a run, and in them the plate is between 20 and 50 % of its travel; no face shows a CUT; content is inside the plate | dock F4 (72 px in one frame, faces fading 190 ms after), F9 (0.28 to 0 in one frame), F3; color C-03 and C-04. Bite: opacity written on a box that holds both faces |
| G-5 · the fission seat | both engines; 390 and 1440; light and dark; unfold, fold, reversal at 30, 50 and 80 %; the pointer resting 8 s in the gap; Tab from the run to the seat | the seat's place, both plates' edges, the gap and the neck are inside the bounds, and the seat never moves more than the any-frame bound in one row; at collapsed rest one plate paints and the region is hidden and inert; P-1's readings 1, 2 and 3 hold on the landed design; the dock stays open while the pointer rests in the gap, and the seat is the `elementFromPoint` target over its glyph in every 400 ms sample; the seat is the Tab stop after the run | daraksha's second dock: about 116 px in one frame at each end of the collapse. Bites: an SVG filter on the container (the backdrop is gone in WebKit); the region mounted outside the root (the dock folds under the pointer) |
| G-6 · the labelled seat, and the hover guard | both engines, 1440 fine: hover each seat of each kind in turn (plain, labelled, trigger, active), then leave; a sweep across every seat boundary at 20 px a second; keyboard focus through the run. One 390 fine cell | **the 0 px hover guard:** the root's and every plate's box change by 0 px in every row of every hover of every kind; the hovered seat is the hover target in every row from enter to leave; in the sweep the hovered seat changes once per boundary; each neighbour's `translate` is inside the bounds; the name is readable by 150 ms and gone by its exit clock with at least five samples each way; a labelled seat computes no `box-shadow`, no gradient, no `backdrop-filter` and no `filter`; one spatial animation runs per element | O-282's reported shift (no cause is on record; the gate is the guard). Bites: the name put in flow; a `transition` shorthand on the run's children |
| G-7 · the outlet | vitest, and Chromium at 1440: content declared in a sibling tree; the outlet mounted before its dock; the dock unmounted and remounted; `region="persistent-end"` on one route of two | the content's elements are direct children of the named region; `useOptionalDockContext()` inside it returns that dock's id; the run roves the contributed seat; the content mounts when the dock registers and leaves when it goes; on the route with nothing contributed the region takes no room, within 0.5 px of a dock with no region; `git grep -nE 'querySelector|getElementById|closest\(' -- src/components/dock/DockOutlet.vue src/components/dock/composables/dockRegistry.ts` prints nothing | daraksha's `<Teleport defer to="#dock-page">`: no context reaches the controls. Bite: the provide removed |
| G-8 · overlays | both engines, 1440; a menu, a select, a click popover, a hover popover with `keep-dock-open`; each opened from a run seat, a layer-face seat, a seat contributed through the outlet, and the fission seat; folded by a press outside, by Escape twice, and by the linger | while open, the dock does not fold by the linger; on a dismissal each overlay's exit starts no later than two frames after the fold's first row, has at least five samples with no step over 0.4, and ends before the plate lands; an overlay opened from a persistent seat stays open through the fold | daraksha: the popover neither held the dock nor closed, and floated after the fold. Bite: the face mark not provided by the outlet |
| G-9 · the published progress | both engines; an unfold, a fold, a reversal; one follower under `data-dock-scope` that moves by `calc(var(--dock-expand-t) * 100px)` | on the root the property reads 0 at collapsed rest and 1 at open rest and is present at rest; it is within 0.02 of the plate's travel in every row; the follower is within one row of the plate; no row shows the new posture class without `[data-morphing]`; the attribute also covers a content change | master: the scalar is removed at rest. Bite: the scope write removed |
| G-10 · reduced motion | every cell of G-2, G-4, G-5 and G-6 once, both engines, under `prefers-reduced-motion: reduce`; G-1 (c) once | every box, corner, `translate` and clip takes at most two values, in one frame; every change that paints differently at its two ends shows opacity at three or more values over 50 to 144 ms; nothing runs past 144 ms; the fold still comes one linger after the leave | dock F11: every motion lands in one frame, content included. Bites: the dock's authorized rows removed; a planted `transition: border-radius 300ms` |
| G-11 · cost, and rest | Chromium by trace at 1x and at 4x CPU; WebKit by frame pacing. An out-of-flow dock, a dock in flow, a dock with `#beside`, a dock with six labelled seats | per frame of travel, out of flow: one `Layout` event at most, with no more dirty objects than the dock has leaves (1; with a fission seat, 4 under neck A and 2 under B); the loop's script is 0.5 ms or less at the median at 1x and 2 ms or less at 4x (this seat's default, set between D2's two readings; the prototype's first trace fixes it before the build); inline style writes land on 12 elements or fewer. In flow: the longest layout is 0.94 ms or less at 4x (W-B.17's figure for a size tween). A labelled seat's hover: 0 layouts. At rest, over 2 s: no frame callback scheduled by glass, no style mutation in the dock, and `getAnimations()` empty for its subtree. Nodes glass adds: 1 plate; with a fission seat 3 more under A or 1 more under B; 1 span per labelled seat; 0 for the outlet; 0 wrappers. WebKit: no more than one frame in ten of a travel over 20 ms. `./dock`'s boot graph is no larger than master's at the cut | the dock record's trace: 486 layouts in 67 frames of a fold. Bites: the plate's size written on the root; a loop left running at rest |
| G-12 · static | node, over `src` and the built CSS | no `scale` on `.glass-dock` or its regions; no `clip-path` on a plate at rest; no `box-shadow` on `.glass-dock`; no `filter: url(`, `<filter` or `feGaussianBlur` under `src/components/dock/`; no size, margin or padding property in a dock `transition`, `@keyframes` or `.animate(` call; no `transition` shorthand on a selector that matches the run's children; `--dock-morph-origin`, `--dock-size-scale` and `--dock-pane-shift` absent; no millisecond literal for the intent or the linger in `useDockState.ts`; `[data-morphing]`, `--dock-morph-t` and `--dock-expand-t` present | master: `shape.css:104-109`, `dock.css:93`, `shell.css:245`, `run.css:526-535`. Bites: each of the earlier text's four recorded plants (`../design/dock-cluster/fold.md` F2) |
| G-13 · census, focus, hit, forced colours | both engines, 390 and 1440; Chromium alone for `forcedColors: "active"`, light and dark | `ariaSnapshot` and each persistent seat's census are identical collapsed, mid-travel, open and back; the fission seat is inert and hidden collapsed, and focus held on it when a fold starts moves to the summary; on a coarse pointer every seat's hit box is 44 by 44 px or more; in a layer group one seat of the active face has `tabindex="0"`, Arrow, Home and End move inside the face with no wrap, and a swap re-derives the stop; under forced colours each plate has one closed outline, parted or fused, and no edge runs round the root | `inert` on a region while it moves; a 24 px seat; master's roving (every seat a stop); the root's forced border left in |
| G-14 · the shipped line | the witnesses of 10.1.1 to 10.1.5, 11.0.1, 11.0.2 and 11.1.0 as merged (`tests-visual/release-*.spec.ts`) | GREEN in both engines with their expected values unchanged, save the restatements R-1 names | a restated witness that no longer bites on its own plant |

D2's H8 battery is not a gate. Its rows read the same edges on a virtual clock that G-2 to G-5 read on rendered frames, and two instruments for one dock is how the earlier loop kept finding new cells. Its `swap` scenes and its retargets at 40, 80 and 120 ms are ported as scenario files for G-4.

One challenge pass and one fold on the build. A second challenge runs only if the first lands a finding outside this list. A critic gates on the list and adds no row.

## Order of build

**Owed to the prototype, before the build.** One scratch worktree, glass's own page and daraksha's composition.

- **P-0.** One trace of the carrier alone (the plate's insets, no exchange) at 1x and 4x CPU, to fix G-11's script bound.
- **P-1.** The neck, A and B, by the five readings above.
- **P-2.** How the name enters, A and B.
- **P-3.** The labelled seat's room: with daraksha's seat set and glass's standard set at 1440 and at 390 fine, does every name fit in the neighbours' slack, and does the sweep hold the hover.
- **P-4.** The timed fade's strip on D2's `swap` scene, long and short, for OQ-4, with the instant near 35 % counted in frames.
- **P-5.** `release/11.1.0` and the head of `release/11.0.2`, neither read by the audit: the run's mark and glide (dock F1), the rounded corner (F6), the cross axis (F3).
- **P-6.** daraksha's composition on the head of 11.0.2: content outside the closing plate, the return mid-fold, and whose the options panel's uneven chips are.
- **P-7.** What the owner saw "teleport away" on atlas production. The ledger's reading is the rail's own 150 ms grace; it is not confirmed.

**The build.**

1. **The cut.** `release/11.2.0` from master after 11.0.2, 11.1.0 and 11.1.1 merge and after the u/dp intake merges by its reconciliation ruling (the root paints nothing; the corner and the cut cap are the plate's).
2. **The carrier** (R-1, R-3, R-4), with G-14 GREEN before anything is added. G-2, G-3, G-11, G-12.
3. **Content changes** (R-5) and the roving (R-13). G-4.
4. **The clock** (R-2) and reduced motion (R-11). G-1, G-10.
5. **The registry and the outlet** (R-8), then overlays (R-9). G-7, G-8.
6. **The fission seat** (R-6), on P-1's verdict. G-5.
7. **The labelled seat** (R-7), on P-2's and P-3's. G-6.
8. **The published progress, the figure preset, the README** (R-10, R-12, R-14). G-9, G-13.
9. The gates in full, one challenge, one fold.

Steps 5, 6 and 7 do not depend on one another. Each can leave the release without the others if its reading fails.

## Consumer half

Each consumer changes at its own repin. glass tells atlas of every default here at booking and at publish.

- **daraksha** deletes:
  - `<Teleport defer to="#dock-page">` and the `#dock-page` element (`src/scripture/ReaderDock.vue:105,154`, `src/pages/ScripturePage.vue:981-984`), for `<DockOutlet to="…">`;
  - the code that holds its dock for 6.0 s and its trial of a 90 ms intent, for the two tokens;
  - its second pinned GlassDock, its site-level neck and each dock's content-sized wrapper, for `<template #beside><ThemeControl /></template>`;
  - whatever closes its Popover when the dock folds;
  - its own hover-label seat, if P-3 passes, for `label`;
  - `dir="ltr"` on the dock.
  - Play joins the collapsed face through `region="persistent-end"`. Its occasion medal is a one-seat GlassDock, as now.
- **atlas** deletes:
  - `useLinger`, and the rail's fixed 150 ms grace;
  - FigureDock's own state logic, for the three states, `v-model:pinned` and `[data-preset="figure"]`;
  - taking its site layer and foot out of flow during a fold;
  - any workaround for the open size being measured while the root is collapsed (its first ask; R-4 removes the cause).
  - It is told: the intent counts from movement; `--dock-linger` is 6 s and its `clamp(0.5 × dwell, 400 ms, 2400 ms)` is not the dock's; `[data-morphing]` also opens on a content change; `--dock-expand-t` rests at 0 and 1 and `--dock-morph-t` goes in 12.0.0; the seat-by-seat unfold and the grow-down are not built (OQ-3); the dock rests as a capsule (O-199), and its open home rail's 30.75 px corner is its own to keep or drop.
- **fourier** moves its theme toggle from the last seat of the row to `#beside`. No record names anything else for it to delete.
- **color** has no theme seat today (C-05) and adopts `#beside`. Its dock's one-frame steps on a route change (C-03) and its blank first seat (C-04) are cured by R-5 with no change of its own; it deletes any guard it wrote for either.
- **keyframes** moves its theme toggle to `#beside`, and sets `--plate-tone` per seat in place of its own per-seat fills once its seats are plates (a labelled seat in 11.2.0, every seat in 12.0.0). The view transition round its Play and Pause is W-B.17's row.
- **value.js** changes no markup. Its Tools to tool swap glides, and its `vj-settle` beat, which waits on `[data-morphing]`, now covers the glide. The two-dock recipe it was given on 2026-11-12 is withdrawn for `#beside`.

## Open questions

Four, for the owner. Each has a default, and the build proceeds on it.

- **OQ-1.** When the dock is collapsed, is the theme seat gone, or does it sit in the pill? Default: gone, by "fuse into the main dock and collapse away". A site that wants it at rest uses `#persistent-end`.
- **OQ-2.** The linger is 6 s and grows by half the time spent in the dock, up to a ceiling. Is the ceiling 12 s, and does the growth ship on in 11.2.0? Default: 12 s, as a token in 11.2.0 and as the default in 12.0.0, since it changes how long every dock stays open.
- **OQ-3.** Does "keeping the dock the same size" hold for a figure dock, so that no seat unfolds as the pointer reaches it? Default: yes. A dock changes size when it opens and when a layer changes, never under a hover on a seat.
- **OQ-4.** The layer swap, by strip: the old content gone by 35 % of the glide and the new whole by 70 % (P-4), beside bp13's exchange (`../design/dock/LANDING.md`). Default: the timed fade.

## What became of the ledger's rows

| rows | where |
|---|---|
| L-1, L-2, L-12 | R-1, R-4, R-5; G-2, G-4. Each change in L-2's list is a cell |
| L-3, L-4 | R-1, R-4; G-2. atlas's 30.75 px corner is atlas's (consumer half) |
| L-5, L-6, L-7, L-8 | R-1, R-3, R-4, R-2; G-2, G-3. daraksha's readings are gated on daraksha's composition (P-6) |
| L-9, L-10, L-11 | R-3, R-5; G-4; OQ-4 |
| L-13, L-14 | R-1, R-4; G-2 |
| L-15, L-16 | R-1; G-11. O-258 is 11.1.1's |
| L-17 | not here: O-311, 11.1.1. The run's mark leaves the token for the loop (R-5); the switcher's indicator stays on it |
| L-18 | R-11; G-10 |
| L-19 to L-23 | R-2; G-1. The 840 ms window is not a token, for the reason R-2 gives |
| L-24 | not here: O-299 (c), 11.1.1, the later placement |
| L-25, L-26, L-27 | R-2, R-12; OQ-3 |
| L-28, L-29, L-31, L-32, L-33 | R-7; G-6. The hover and press of an unlabelled seat are 11.0.2's cure and W-B.17's plate |
| L-30 | not here ("Not in this wave"); the orchestrator places it |
| L-34 | not here: the pair is W-B.17's, the lens is O-203's in 12.0.0 |
| L-35, L-36, L-44, L-51 | R-14 |
| L-37 | shipped in 11.0.2; G-14 carries it |
| L-38 | not here: W-R.1's rule |
| L-39 | R-6 (the glyph is the toggle's own) |
| L-40 to L-43, L-45, L-46, L-47 | R-6; G-5, G-13. L-46 is taken as a default |
| L-48, L-49 | R-9; G-8; P-6 |
| L-50 | R-8; G-7 |
| L-52, L-53 | R-10, R-1; G-9 |
| L-54 | not built ("Not in this wave"), with the reason |
| L-55 | R-1 |
| L-56 | R-13; G-13 |
| L-57, L-58 | 11.1.1 (O-316, O-312); the glide becomes a quantity of the loop in R-5 |
| L-59 | R-8; G-7 |
| L-60 | R-1 (reads before writes). O-215's first-mount row closes on 11.1.0's close trace; above 16 ms this build adds one trace cell at 390 and 4x |
| L-61 | not here: no trace exists for the 61 ms raster (O-259). It is read first, in 11.1.1's scope |
| L-62 | "Not in this wave": its own commits on 11.2.0 |
| L-63 | G-11 |
| L-64 | not a gate: one capture set in Safari before the tag if the owner's machine allows (collapsed, mid-unfold, open, mid-swap, mid-fission), otherwise recorded as unmeasured |

## Cut on the last pass

Read once as the owner would, for any transition, shade or wrapper that carries no intent. Each of these was in this seat's draft or in the earlier text and is gone.

- A fade on the seat's plate as it parts. It appears by its shape, not by opacity.
- A shadow on each plate, and with it the dark slot two shadows make in the gap. One shadow for the surface.
- A spring of its own, and an overshoot, for the fission.
- A fillet mask on neck A, and a rim on any edge where two boxes meet.
- Icons that shrink to make room for a name. Neighbours shift; nothing scales.
- A delay before a name shows, and a Tooltip built into the dock as its fallback.
- A fade of the divider's own.
- A pin badge or any other mark for the pinned state. The dock is open; that is the mark.
- A `folding` class or attribute. The state is collapsed and the travel is `[data-morphing]`.
- An eased curve for the linger. It is linear in dwell and clamped.
- The per-control stagger and the 0.82 pop on entering seats.
- A `preset` prop, a `name` prop, a `progress` emit and a new property name. The preset is an attribute block, the name is the root's `id`, and the property is `--dock-expand-t`.
- A `DockLabel` or `DockSeat` component, and a wrapper round the outlet's content.
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
- **"No tokens added"**: four are.
- **The DockLayer `persistent` slot** held as a fallback for O-224: the outlet's `region` is the way.
- **The first-frame figure of 13 to 17 %** as a property of the plain pill: the audit read 8 % at most there (AUDIT §3). It stands as daraksha's reading of a dock at half frame rate, and G-2 gates the cure.
- The DockCluster rulings and gates the earlier text's §4 retired stay retired. That table is in the earlier text and is not repeated.

## Records the orchestrator amends

This seat wrote this file and nothing else.

- `INDEX.md`: W-I.8's row (11.2.0, with the 12.0.0 defaults named above), and its summary, which still says "the bare `#beside` seat".
- INBOUND: O-279, O-289, O-290 and O-303 placed on R-6 and R-7; O-275, O-302 and O-306 on R-2; O-301 on R-9; O-307 on R-8; O-248 and O-288 on R-1 and R-4; O-276 on R-12; O-281, O-296 and O-304 on R-14; O-222 marked overruled by O-279. L-30's Tooltip row needs a home.
- `W-B.17.md` cites this file by its old section numbers. §1.2 is now R-1; §1.3 is R-3; §1.5 is R-5; §1.6 is R-11; G-4 and G-11 are G-4 and G-12. Its lines "the theme seat's hover is `data-glyph=\"turn\"`" and "the rest-fill token is `--plate-tone`" are taken as written.
- `W-R.1.md`: the 12.0.0 rows above; `--dock-morph-t` joins the two stagger tokens in its deletions.
- `docs/precepts/motion-canon.md`: P5's sentence for a leaf's insets (R-1) and P6's for the dock (R-11), still owed (`../review/fable-2026-11-10/owed-outside-BL.md`). `restraint.md` says "no motion on keyboard-triggered actions", and R-7 tweens the neighbours on keyboard focus, by P0; one of the two wants a sentence.
- `../audit/animation/harness/README.md` says the demo's routes still serve in the built trees; the dock record found they mount nothing.
- The ledger found that `constants.ts:61` reads 3600 on both release branches, though O-306 placed 6000 in 11.0.2. This text takes 6 s as the token's default either way; the branch wants a look.
- `../design/dock/LANDING.md` names OQ-1 and step 3 of the earlier text; they are OQ-4 and P-4 here.
