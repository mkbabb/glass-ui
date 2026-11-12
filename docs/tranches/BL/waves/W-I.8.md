# W-I.8: the 11.2.0 dock (the bare seat, the width glide, the carrier)

Sources: INBOUND O-195, O-200, O-202, O-222 and O-224 (the fission dock, as the owner sharpened it), O-171 R-2 and O-129 rows 3 and 4 (the expanded dock morphs its width), O-180 (3), and the carrier half of O-88. It composes 11.1.0's O-194, O-198 and O-199 and adds no second path for any of them. Its release is **11.2.0**.

This text replaces the DockCluster spec that stood here through pass-2 fold 1, and the three pending patches under `design/dock-cluster/pass2-fold-{1,2,3}/`, which are not applied. Two second looks ruled the re-cut: `design/dock-cluster/orchestrator-note-fable-review.md` (do not build DockCluster) and `review/fable-2026-11-10/design-D2.md` (land D2's carrier, not its content exchange). The design history is in `design/dock-cluster/` and `design/dock/`; `design/dock/LANDING.md` closes the D2 loop. §4 says what each earlier ruling and gate became, so none is revived.

The dock that ships in 11.2.0 is one GlassDock with one plate. A control in a new `#beside` slot sits inside the plate while the dock is collapsed and leaves it, bare, when the dock expands. When the expanded dock's content changes width (a face swap, a label, a control added), the plate glides to the new width and the content fades inside it, the fade done before the stretch. Both ride one measured model of the dock in which the plate is moved by FLIP and nothing is scaled.

## 1 · Rulings (spec seat, 2026-11-10)

### 1.1 · No DockCluster

The cluster fused N glass plates into one silhouette. After O-200 ("ONE dock, not two") and O-222 (the theme "not with the dock bg") every composition the owner has named has one plate, and value's dock is one GlassDock (`value.js/demo/shell/dock/Dock.vue:279-286`). No `DockCluster`, `dockClusterShape`, `dockClusterContext` or `cluster.css` is built, and no export is added. The pass-2 records stay as the measured basis if two glass plates are ever asked for again.

### 1.2 · The carrier lands with this wave, on master as it stands at the cut

Master's morph reserves the expanded box, scales the whole root on its axis (`styles/shape.css:104-109`), counter-scales its regions (`:133-144`) and clips the root on that axis while it runs (`styles/shell.css:318-323`). Three facts in that source rule it out as the ground for this wave:

- **The root's morph clip would cut the seat.** A descendant that paints past the plate during the morph is past the box the root clips to, and the root's scale would carry it. The morph is exactly when the seat travels.
- **The shadow and the rim are drawn by the root's box** (`shell.css:245-247`), and the plate's own `clip-path` (`styles/dock.css:93`) would cut a shadow moved onto it. A plate that glides while the layout box steps would leave its shadow behind.
- **Two mechanisms for one extent is the ground that kept minting.** Pass 2 glided widths by one mechanism and composed the scale by another, and each challenge round found a new cell where the two met (`orchestrator-note-fable-review.md` item 7; `pass2-fold-3.md` §6, the expand-then-page-change cell).

So the plate's extent has one owner, D2's carrier, rebuilt on master's tree with `design/dock/pass-13/D2-Bp-p13.patch` as the reference. It is not applied as a patch: its base is the 10.1.0 dock, and master is 41 dock commits past it.

**What lands.**
- **One body.** One `requestAnimationFrame` loop per dock steps every moving quantity (a lane on `springPreset("dock")`), then paints. It parks when every lane has seated. No lane takes a damping of its own (D2 Q-5 (a): weight, no visible bounce).
- **One measured model**, in the root's own px: the plate's four edges and corner, the regions (leading persistent, layers, trailing persistent, beside), the faces, and each face's units. On a trigger it reads the new layout; each lane holds painted minus layout and carries it to 0 with the velocity it had. A second change retargets the live lanes and never re-creates them.
- **The plate is its own silhouette.** The scene writes its four insets and its radius, so its box is the painted shape in every frame. Its `clip-path` is deleted (it is `inset(0)` today: `--dock-plate-collapse-inset` has no setter in `src`). The radius is the lerp of the two rests' corners in px; under 11.1.0's capsule both are half the cross extent, so 11.1.0's counter-scaled corner (`R / max(k, 0.06)`) goes with the scale it corrected. The plate is an out-of-flow leaf nothing reads, which is D2's Q-6 (a) (`design/dock/REGISTRY.md:300`).
- **The elevation rides the plate.** The rim pair and `--shadow-dock` move from the root to the plate. The root paints nothing.
- **Regions and units move by `translate`.** A posture change moves the plate and the regions. A unit moves only when its place inside its face changes.
- **The plate's edge is the only clip.** A unit is cut where the plate's moving edge crosses it and nowhere else. The root's morph clip, the reserved box, the root scale, the counter-scales and `--dock-morph-origin` are deleted.
- **Hit follows paint.** The root and its structural boxes take no pointer events; the plate, the seats and the beside region do. With a seat outside the plate, the root's box covers bare page, which must not absorb a click.
- **The flow.** While an episode runs, an in-flow neighbour follows the painted edge, as bp13 has it.
- **One window.** `[data-morphing]` opens with an episode and closes on the frame its last lane lands, and every inline value the scene wrote is cleared in that frame. It now opens on a content episode as well as a posture one.
- **One trigger per fact:** the dock's one content observer, one ResizeObserver, the posture watch, the size hand-off, and a viewport resize that seats at layout with no episode. Reads are batched before writes within a trigger, which is O-180 (3).

**Names kept.** `[data-morphing]` keeps its meaning (value reads it: `value.js/demo/shell/dock/Dock.vue:234-247`). `--dock-morph-t` is still written on the root through a posture episode, as `composables/useDockMorph.ts:92-97` writes it today, and `--dock-expand-t` still derives from it (atlas names the scalar: `atlas/src/platform/chrome/dock/Dock.css:72`). `--dock-stagger-window-size` and `--dock-stagger-step` stay declared and are no longer read; W-R.1 deletes them in 12.0.0. No export leaves: `useDockMorphOrchestrator`, `useDockExpandedSize` and `useDockSpring` are not exported from `./dock` (`dock/index.ts`), and the build re-reads `.published-roster` before deleting their files.

**What master already cures is carried as law, not rebuilt.** The 10.1.x and 11.x cures live in the two files the carrier replaces (`useDockMorph.ts`, `dockMorphMeasure.ts`). Each is a law on the landed scene, and its existing witness is its gate, with expected values unchanged: an expand measures the layout it opens onto (O-101); the first expand frame paints the collapsed box and an edge-anchored dock grows from its anchored edge (O-110); a reversing collapse; content inside the plate on its axis; a press that holds the posture until it resolves; 10.1.5's invariant list as 11.0.1 forwards it (rest corner, collapsed circle, true overflow, ring, the 0.5 px morph edge, consumer markup); 11.1.0's O-194, O-197, O-198, O-199, the gliding mark and `edge="border"`. A witness that reads a deleted mechanism (`--dock-size-scale`, the reserved box) is restated once to the law it guarded, and the wave's record names each one.

### 1.3 · Content fades on a timed window; bp13's content exchange is not built

bp13's exchange (the seam, the fronts, the lead, the sweep, the handoff, the gift, the reveal gain, the sliver rule, the touch ramp, every mask, and the clone of a seat that left the DOM) is dropped. In the strip of record it paints "Tools" as "ols" beside a faded half-letter for three frames of the swap (`design/dock/pass-14/D2-Bp-crit-records/c/filmstrips/cl-1/main_strip-chromium-swap-long.png`, tiles 2 to 4), and it costs 1.74 to 2.06 ms of main thread per frame against the floor's 0.15 to 0.21 (`design-D2.md` item 3).

In its place, every change of which content shows runs on the episode's one progress lane `f`, 0 to 1 on the dock rung:

- the leaving face is out by `f = 0.35`: opacity `1 − f / 0.35`, clamped;
- the entering face comes in after it: opacity `(f − 0.35) / 0.35`, clamped, so it is whole at `f = 0.70` (OQ-2);
- both are functions of the one lane, so a reversal runs the same curve back;
- opacity is written on the two faces (and, on a posture change, on the two panes), never on a cell that holds both. That was pass 2's blank-glass bug (`design/dock/pass-2/D2-Bp-critique.md`, finding 1);
- a control that joins a face enters on the second window. One that leaves the DOM is gone in that frame, and its neighbours and the plate glide.

This is the owner's own choreography, "the fading happens FASTER than the stretching" (`docs/precepts/restraint.md`, Motion), and O-88's "one continuous morph (size, radius, content cross-fade)". It replaces master's per-control stagger and its 0.82 scale pop (`styles/layers.css:277-298`), which is a scale on a control and a fade-up on every element. The owner sees the two strips before the build (OQ-1).

### 1.4 · The bare seat: `#beside`

API: one new slot on GlassDock, `beside`. No prop, no component, no export, and `#persistent-end` is unchanged for every consumer. A slot and not a prop on `#persistent-end`, so that a dock can hold a trailing persistent seat inside the plate and the bare seat beside it (§1.7).

- **Where it is.** A region rendered after the trailing persistent region, inside the root (where `#persistent-end` renders, `GlassDock.vue:569-574`), in flow on the dock's axis in both postures, in logical properties. It carries the persistent region's class, so every persistent rule holds for it: never inert, never a face, a press on it is the seat's own act (11.1.0), and with no `#collapsed` slot it is part of the collapsed face (O-194). It is not in the run: its control is its own Tab stop, after the run.
- **Collapsed (fused).** The plate's insets are 0 and the seat sits inside the plate, as a trailing persistent seat does today.
- **Expanded (fissioned).** The plate rests where it would with no slot authored: one dock padding past the last region inside it. The seat rests past that edge.
- **The motion.** The seat's `translate` and the plate's trailing edge are lanes of the dock's posture episode, the one whose progress the root publishes as `--dock-morph-t`. No spring, prop or trigger is added, and `fused` is not a prop: the only trigger is the dock's own expand and collapse. The plate's edge clip is waived for the seat, so the icon crosses the edge whole. A dock with `:collapse="false"` holds the seat outside at rest.
- **It carries no plate.** The region, its control and their pseudo-elements paint no `backdrop-filter`, no background, no border and no shadow, in any state: rest, hover, press, `active` and `aria-pressed="true"`. The glass disc in the owner's frame (`~/.dev-logs/owner-1110/shots/2.png`) is the seat's own capsule, the face DockControl draws on hover, press and `active`; here it draws none. State is carried by the glyph's ink. The focus ring stays: it is an outline.
- **Its ink** is the dock control ink, `--dock-fg-on-aurora`: the page's `--foreground`, refined to `contrast-color(var(--card))` where the engine has it (`styles/adaptive-legibility.css:47-48`, `:67-72`; `styles/controls/icon-button.css:53-55`). It is the same inside the plate and outside it. Nothing samples the page under it. A host whose page ground cannot carry text ink keeps its control in `#persistent-end` (OQ-5).
- **The hold is containment.** The seat is a descendant of the root, so hover, focus, the overlay stamp and the click-away hold through the dock's own rules with no copy of them (`composables/useDockState.ts:409-431`, `:449-468`, `:518-529`). The gap toward the plate is the region's own padding, so its hit box starts at the plate's edge and no strip between them reads as a leave.

### 1.5 · The width glide is GlassDock's own

On master a face is `inline-size: max-content` (`styles/crossfade.css:44-50`) and a swap "does not register with, or resize, the dock shell" (`useDockMorph.ts:9-11`), so the plate steps: 156 to 313 px in one frame at 1440, 78.4 px a side, and on the way back the leaving controls lie 40 px outside it at opacity 0.95 (`design/dock-cluster/pass2-build.md` §2).

Under §1.2 a change of the expanded dock's size on its axis with no posture change is a content episode: layout steps once, the plate's edges glide from where they were painted to the new box, the regions and the bare seat ride the edges, and the content fades by §1.3 inside the plate's edge clip. The cause does not matter: a DockLayerGroup face swap (O-202), a label change or an action swap (O-171 R-2), a control added or removed. A lone dock needs no wrapper. DockCrossfade keeps its registry, its block reserve, its inert swap and its focus transfer, and its opacity reads the episode's lane instead of a spring of its own.

W-0.8's O-171 gate "no single-frame jump over 4 px" is restated in G-4. The dock spring's own largest 8.33 ms frame is 6.98 % of its travel (`design/dock-cluster/fold.md`, F7), which is 11 px of value's 157 px change, so no spring on this preset meets 4 px.

### 1.6 · Reduced motion

One law for the dock, stated here: under `prefers-reduced-motion: reduce` every lane seats in the frame of the change, so the plate, the regions, the seat and the clip take at most two values across a change. The only property that may animate is opacity, for 144 ms or less (O-198). The wave adds no reduced-motion path and no token: the faces swap at once, as `DockCrossfade.vue:218-221` does today and as 11.1.0's `prm` witness reads (no running animation). The cluster's opacity dip is deleted with the cluster.

### 1.7 · O-224: a DockLayer does not name a seat for the collapsed face

Ruled no, on source. A face is `inert` and `aria-hidden` when it is not active (`DockLayer.vue:85-86`), and the whole expanded pane is inert while the dock is collapsed (`GlassDock.vue:514`). A seat cannot be live in the collapsed face and stay inside its layer; a layer API would have to move the node into a persistent region or render it twice. The persistent regions are already that place: never inert, present in both postures, and under 11.1.0 a press there never expands the dock.

So the host places the seat in `#persistent` or `#persistent-end`, as a route-conditional control or as a teleport target the page fills, which is how daraksha's pages already reach `#dock-page`. With `#beside` separate (§1.4), daraksha can hold Play in `#persistent-end`, and its collapsed face is the page icon, Play, then the khatam, in one plate.

Glass adds one rule: an authored persistent region with nothing in it takes no room (`.dock-persistent:empty`), so a route-conditional seat leaves no gap on the other routes. G-10 is the cell. If it reads RED on the build, the fallback is a `persistent` slot on DockLayer whose content renders in the dock's trailing persistent region while that layer is active; it is not built otherwise (OQ-6).

### 1.8 · The roving keys reach a layer group

On master the run roves only its direct children (`composables/useDockRun.ts:76-80`), and in a dock with a DockLayerGroup the run's one child is the group, so `onKeydown` returns (`:331-334`), every control in a face is a Tab stop, and no toolbar is claimed.

The seat rule (declared seats only, nothing inferred from focusability) applies to each row: the run's own children, and the children of the active face's content box in a layer group that is a direct child of the run. Each row is roved on its own, with one Tab stop, Arrow, Home and End inside it and no wrap. Arrows do not cross rows; Tab does. `role="toolbar"` and `aria-orientation` sit on the element whose children are the seats, under the same all-declared claim. The stop is re-derived when the active face changes. The switcher's tablist keeps its own keys. Reach is 10.1.5's (the declared seat that holds the focus target) and is not restated here.

### 1.9 · Forced colors

The forced skin gives the root's box a border (`src/styles/utilities/a11y-overrides.css:147-150`), and the plate has a real border of its own. With the seat inside the root, the box's border would outline the seat with the dock. The `.glass-dock` selector leaves that rule; the plate's border is the dock's one outline and follows the silhouette. The seat draws its glyph and, when focused, its ring.

## 2 · Scope

| surface | change |
|---|---|
| `GlassDock` slots | `beside` added. `persistent`, `default`, `collapsed`, `search`, `persistent-end` unchanged |
| `GlassDock` props, exposes, `./dock` exports | none added, none removed |
| tokens | none added. `--dock-stagger-*` unread (§1.2) |
| paint every consumer sees | the expanded dock's width glides; content fades on the timed window; the per-control stagger is gone; `[data-morphing]` also opens on a content change |

**Files** (under `src/components/dock/` unless a path says otherwise).
- Add: `composables/useDockBody.ts`, `composables/useDockScene.ts` (the model, the episodes and the triggers, without the exchange), `composables/useDockContent.ts`; the README's `beside` entry and its O-224 recipe.
- Edit: `GlassDock.vue` (the slot, the scene in place of the orchestrator and the measure), `DockCrossfade.vue`, `composables/useDockRun.ts` (§1.8; the reach glide becomes a lane), `styles/dock.css`, `styles/shell.css`, `styles/shape.css`, `styles/layers.css`, `styles/crossfade.css`, `styles/shell-regions.css`, `src/styles/utilities/a11y-overrides.css`.
- Delete: `composables/useDockMorph.ts`, `composables/dockMorphMeasure.ts`, and `composables/useDockSpring.ts` once the body is its last caller's replacement.
- Tests: the gates of §3 under `tests-visual/dock/` and `tests/components/custom/dock/`. A test that reads a deleted mechanism is restated or deleted with it, each named in the record.

**Not in this wave.** The rest of W-0.8's unit and W-I.1: the scroll-compact rung and its `scroll` prop, the rim as a plate child, the press direction, the summary's Q-10, the cut cap's strike. Two of them remove published names (`waves/W-0.8.md` §3.6), which is a major's. `waves/INDEX.md` places them. O-203's deletions in the dock (the control gleam, the active seat's nested blur) stay 12.0.0's; this wave re-homes neither.

## 3 · Gates

Eleven gates, and the list is closed. Each is RED before and GREEN after, by the witness named. The first seven are the second look's (`orchestrator-note-fable-review.md` item 7); G-8 is the D2 second look's one battery read; G-9 to G-11 gate what those notes ruled and did not gate. The second look asked every cell in both engines, both widths and both themes; under the bar a theme is read only where paint is the claim (G-2, G-7, G-8), and G-7, G-10 and G-11 have no WebKit cell because the engines cannot differ there or WebKit has no such mode.

Beside the list, the shipped line's own witnesses (`tests-visual/release-10-1-{1,2,3,4}.spec.ts`, 10.1.5's and 11.1.0's as merged) read GREEN in both engines with their expected values unchanged, save the restatements §1.2 names.

**Harness.** G-3 and G-4 run D2's scenes and hooks (`design/dock/harness/scenes.mjs`) on pass 2's virtual frame clock (`design/dock-cluster/pass2/tools/probe.mjs`), so a frame's length is not the machine's load. **The bound** in both is computed at run time from `springPreset("dock")` as the build exports it: no frame moves a tracked edge more than 1.15 times the largest frame step of that preset's own step response at the clock's frame length (8 % of travel for today's preset at 8.33 ms). No probe carries the preset as a literal. G-1 and G-7 take fold 3's tools (`design/dock-cluster/pass2-fold-3/tools/f3.mjs`, `forced.mjs`). Every browser run goes through `guarded`, WebKit under `--exclusive webkit`.

| id | gate and cells | passes when | RED |
|---|---|---|---|
| G-1 · the reach holds | real clock, pointer and taps; both engines; 390 and 1440. (a) the pointer reaches the dock, then the seat, and rests 4.8 s; (b) it rests 4.8 s midway between the plate's edge and the seat's glyph; (c) a click on a run seat, then a leave to the page; (d) the pointer in the dock's own menu and in a seat tooltip, the bare seat's included, 8 s; (e) touch: tap the dock, tap the seat, tap away; (f) Tab from a run seat to the seat, rest 4.8 s | (a), (b), (f): the dock stays expanded, the seat stays within 0.5 px and is the `elementFromPoint` target in every 400 ms sample of (a); (d): expanded and the overlay open throughout; (c), (e): the same reading as the same build with the control in `#persistent-end` (on 11.0.0: collapse at 3.5 to 4.0 s, and within 500 ms) | a plant that mounts the region outside the root: (a) and (f) collapse about 3.2 s after the reach (`pass2-challenge-1.md`, C1) |
| G-2 · the seat is bare | both engines; 390 and 1440; light and dark; collapsed, expanded, three frames of the fission; `active` and `aria-pressed`, each true and false; hover and press | the region, its control and their pseudo-elements compute `backdrop-filter: none`, no background image, a transparent background colour and `box-shadow: none`; once the seat is past the plate's edge, the field of its box outside the glyph reads the page at that height within 1 (Rec.709, 8-bit) | 11.0.0 with the control in `#persistent-end`: expanded, the field of its box reads the plate and not the page; hovered or `active`, its capsule computes a background and a `backdrop-filter` |
| G-3 · the fission is continuous | virtual clock; both engines; 390 and 1440. Expand, collapse, and a reversal at 40, 80 and 120 ms | the seat and the plate's trailing edge each stay within the bound in every frame, the first included; both land in the frame the window closes; the glyph is never clipped; in a centring host the root's box is centred within 0.5 px at rest in both postures | a plant that leaves the seat out of the model: its whole travel in the first frame |
| G-4 · the width glide | virtual clock; both engines; 390 and 1440. D2's `swap` scene (long, short, a reversal, retargets at 40, 80, 120 ms), value's Tools → tool geometry, a label change, a control added. A vitest arm reads §1.3's two windows as a function of `f` | each plate edge within the bound in every frame; through a reversal each edge's frame-to-frame velocity change stays within the spring's own (`design/dock-cluster/pass2-fold-2/tools/continuity.py`'s law, the preset read from the build); no unit lies outside the plate above 0.25 ink; a trailing seat stays within the bound | 11.0.0: 78.4 px a side in one frame at 1440, and 40 px of the leaving face outside the plate at 0.95 |
| G-5 · reduced motion (O-198) | 11.1.0's `prm` scene with three steps added: the fission, a swap that changes width, a control added. Both engines; 390 and 1440 | every running animation and every non-zero computed transition is opacity alone, 144 ms or less; the plate's insets and radius, each region's `translate` and each unit's clip take at most two values across a change, in one frame | 11.1.0's own plant (`transition: border-radius 300ms`), and a planted WAAPI `translate` on the seat |
| G-6 · census, focus, hit | both engines; 390 and 1440 | `ariaSnapshot` and the seat's census (role, name, pressed, tabIndex, inert, aria-hidden, disabled) are identical collapsed, at 80 ms, expanded and back; the Tab walk from a sentinel reaches the seat after the run in both postures; focus held on the seat stays there through both directions; on a coarse pointer the seat's hit box is at least 44 by 44 px | `inert` on the region while it moves; a 24 px seat |
| G-7 · forced colors | Chromium, `forcedColors: "active"`; flat field; collapsed and expanded; 390 and 1440; light and dark | one element paints a border, the plate; its outline is closed in both postures; no edge runs round the seat | the root's forced border left in (§1.9): the outline wraps the seat |
| G-8 · the carrier, one battery | D2's H8 on the landed tree, read once, four columns, each slot started at a load of 20 or less with the gate read inside the admitted slot. The rows are the 38 less what §1.3 retires: R6, B2's stub half, rules (a), (b) and (d), and the `splice`, `stub`, `hole` and `vanish` checks. R1's blank check is re-cut to the fade: both faces may read under half ink only while `f` is between 0.175 and 0.525. `c2·prm` reads O-198 and W6 reads O-194 | 0 FAIL on the ruled digest | the same harness on master through `adapter-head.mjs` (OQ-3 names the rows) |
| G-9 · roving in a layer group | vitest: a GlassDock holding a DockLayerGroup with two faces of declared seats | in the active face one seat has `tabindex="0"` and the rest −1; Arrow, Home and End move focus inside the face with no wrap; the face's content box carries `role="toolbar"` only when every child is declared; a swap re-derives the stop | master: every seat is a stop and the arrows do nothing |
| G-10 · a layer's seat in the collapsed face (O-224) | Chromium, 1440: daraksha's composition with Play in `#persistent-end` on one route of two | on that route the collapsed face holds Play, live, and a press plays without expanding; on the other the summary sits where it does with no slot authored, within 0.5 px | master: the empty region keeps its gap (OQ-6) |
| G-11 · static | node, over the built CSS and `src` | no `scale` on `.glass-dock` or its regions; no `clip-path` on `.dock-plate`; no `box-shadow` on `.glass-dock`; `[data-morphing]` and `--dock-morph-t` present; the fold's source arm (`design/dock-cluster/fold/tools/g8-source.sh`) is empty: no `filter: url(`, no SVG `<filter>`, no `useDockFission` | master: `shape.css:104-109`, `dock.css:93`, `shell.css:245`. The source arm bites on its four recorded plants (`design/dock-cluster/fold.md`, F2) |

One challenge pass and one fold on the build. A second challenge runs only if the first lands a finding outside this list. No two-consecutive-clean rule gates the wave.

## 4 · What the earlier spec's rulings and gates become

| earlier id | becomes |
|---|---|
| R-1 (shared silhouette, one ink, the painter) | deleted. One plate has one ink |
| R-2 (kernel and tone lenses, two tokens, the 1 px overlap, the nested-blur stand-down) | deleted. `--dock-surface-blur` is not recomposed. The nested blur is 12.0.0's |
| R-3 (the whole-px grid) | deleted |
| R-4 (the capsule) | kept as 11.1.0's O-199. The share path that drew it is deleted |
| R-5 (reduced motion) | restated as §1.6. The opacity dip is deleted |
| R-6 (the shared tint) | deleted. One dock has one observer, as on master |
| R-7, size | restated as §1.5, in GlassDock, with its rule that a live glide is retargeted and never re-created |
| R-7, membership (arrivers, phantoms, survivor offsets, runs) | deleted |
| R-8 (a member's collapse, the one-collapsible throw) | deleted. The dock's collapse is the dock's |
| R-9 (no grasp in a cluster) | deleted. The grasp register runs on the dock as it ships; the plate clip it stood down for is gone (§1.2), and the grain stand-down stays |
| R-10 (the LTR, row and wrap throws, the overflow report) | deleted. The seat is laid in logical properties on the dock's axis |
| R-11 (a spring per join, the identity test) | deleted. Every lane is on `springPreset("dock")` through the one body |
| R-12 (the chain, the `1/k` clip map, the overhang, the morph-frame hook) | deleted. Nothing is scaled |
| R-13 (the cluster's hold) | deleted as a mechanism. Restated as containment (§1.4), with fold 3's cells as G-1 |
| R-14 (the host clock on `useDockSpring`) | deleted as an option. Restated as the one body (§1.2) |

| earlier gate | becomes |
|---|---|
| I8-G1, G2, G3 (seams, the live backdrop) | deleted with the lenses |
| I8-G4 (r1 and the corner) | deleted here. 10.1.5's rest-corner invariant and 11.1.0's O-199 witness carry it |
| I8-G5 | identity and host-clock arms deleted; the trajectory arm is G-3 and G-4's bound |
| I8-G6 | restated as G-5 |
| I8-G7 | restated as G-6 |
| I8-G8 | frame arms deleted; the source arm is kept in G-11 |
| I8-G9, G10, G11, G12, G13, G15, G16, G21 | deleted |
| I8-G14 (the Safari app, a release blocker) | withdrawn, not waived: the one plate keeps GlassDock's shipped backdrop-filter and the seat has none (OQ-9) |
| I8-G17 | the two-collapsible arm deleted; the rest restated as G-3 |
| I8-G18 | restated as G-4, without its membership cells and with the preset read from the build |
| I8-G19 | restated as G-1 |
| I8-G20 (the consumer's placement) | deleted with the root writes it policed; its centring arm is in G-3 |
| I8-G22 | restated as G-7 |

`design/dock-cluster/SPEC-SUMMARY.md` described the cluster; the orchestrator deleted it on 2026-11-11.

## 5 · Order

1. **The cut.** `release/11.2.0` is cut from master after 11.1.0 (with 11.0.1) merges and after the u/dp intake merges by its reconciliation ruling (`review/fable-2026-11-10/plans.md` item 2). That ruling keeps this wave's ground: the root paints nothing, the corner and the cut cap are the plate's, and `borderProgress` and `perimeter` are not added.
2. **Read master.** Re-cut the harness's expected values (G-8), then one H8 battery on the cut's master through `adapter-head.mjs`, and the boot-graph read. This gives G-8's RED list (OQ-3) and the ratchet's base (OQ-8).
3. **Prove the seat and shoot the fade** on one scratch fixture: daraksha's one-dock composition with `#beside`, and value's Tools → tool geometry. It answers OQ-4 to OQ-6 and writes strip B for OQ-1.
4. **Build**, then the gates, then the one challenge and fold.

O-215: if 11.1.0's close trace reads the dock's forced layout at first mount above 16 ms, this wave takes the row (OQ-7).

## 6 · Open questions

Each has a default. The build proceeds on the default and records the answer when it comes.

- **OQ-1 (owner).** Which strip is the dock: bp13's content exchange or the timed fade? The pair is in `design/dock/LANDING.md`. Default: the timed fade. If he picks the exchange, it lands as bp13 built it and §1.3 is closed on his word.
- **OQ-2 (measurement, with OQ-1).** The fade's windows. 0 to 0.35 out is pass 2's (`design/dock/pass-2/D2-Bp-spec.md:202`). 0.35 to 0.70 in is this seat's: no record fixes where the entering face is whole. Default as written; strip B is the read.
- **OQ-3 (measurement).** Which re-cut H8 rows read RED on master today. Nobody has run the harness on the shipped dock (`design-D2.md` item 4). Default: every re-cut row gates the landed tree, and the rows master already holds are recorded as carried witnesses. Two near-bound classes outlive the exchange, [terminal] and [lanes]; their bounds are fixed before the read. Default: [terminal]'s last step at 1 px (it drew 0.95 against 0.88), [lanes] at its present bound with a draw re-run twice.
- **OQ-4 (owner).** With the seat out, is the centre the row's (plate and seat together) or the plate's? Default: the row's. The seat is in flow, so a host's centring, its overflow and its height read the true extent, and the plate's own centre moves by half the seat's room on an expand.
- **OQ-5 (measurement).** The seat's rest gap and its ink on the page. Default: the gap is `--dock-layer-gap` past the plate's edge with no new token, and the ink is the dock control ink, `--dock-fg-on-aurora` (§1.4). The fixture reads the glyph against the page at 3:1 or better in both themes and captures the gap for the owner's look.
- **OQ-6 (measurement).** Does G-10 read RED on master and GREEN with the `:empty` rule alone? Default: yes, and no DockLayer API is built.
- **OQ-7 (measurement).** O-215's dock row, by 11.1.0's close trace. Default: the row closes at 11.1.0; above 16 ms this wave adds one trace cell at 390 and 4x CPU.
- **OQ-8 (owner).** The boot-graph ceiling. D2's base had 31 B of margin. Default: the landed dock's boot graph is no larger than master's at the cut; if it is larger, the owner rules the ceiling before the merge.
- **OQ-9 (owner's machine).** The Safari app. No capture of bp13 or of this dock in Safari exists, and Playwright WebKit is not Safari. Default: not a release blocker; with the safaridriver checkbox on, one capture set (collapsed, mid-expand, expanded, mid-swap) is read before the tag; otherwise it is recorded as unmeasured.

## 7 · Consumer half

**daraksha** (`o1109-dock`, `src/shell/SiteDock.vue`) changes one line: `<template #persistent><ThemeControl /></template>` becomes `<template #beside><ThemeControl /></template>`. No wrapper, no `fused` computed, no hover or focus code, and `dir="ltr"` is no longer asked of it. Play joins the collapsed face through a teleport target in `#persistent-end` (§1.7). The reader row's breakpoint is re-measured at its repin; the cluster's 41.25 rem is withdrawn with the cluster.

**value** changes no markup: its one dock's Tools → tool swap glides. Its `vj-settle` beat waits on `[data-morphing]`, which now covers the glide; value reads that at its repin.

**atlas** is told at booking and at publish: `[data-morphing]` also opens on a content change, `--dock-morph-t` is unchanged, and the dock-mounted progress props of the u/dp line are not in 11.2.0.

## 8 · Release, MIGRATION, ledger

11.2.0, a minor: one slot added, nothing removed, no MIGRATION row. The CHANGELOG states the slot, the glide, the fade in place of the stagger, and the two unread tokens. `.published-roster` is unchanged and `.bundle-ratchet` is re-read (OQ-8).

Also in 11.2.0, and not this wave's build: the three enter start radii default to `0px` (`--lq-enter-blur`, `--enter-overlay-blur`, `--enter-menu-blur`), the paint half of O-221. `waves/W-R.1.md`, "Moved out", is its record: one commit on `release/11.2.0`, the tokens left defined so a host restores a ramp by setting one back, and a CHANGELOG line among the defaults that change.

Closes O-195, O-200, O-202, O-222, O-224, O-171 R-2, O-129 rows 3 and 4, and O-180 (3). Takes the carrier half of O-88 and of W-0.8.

Records the orchestrator amends, since this seat writes only this file and `design/dock/LANDING.md`: an INDEX row for W-I.8 at 11.2.0; W-0.8 and W-I.1 pointed here for the carrier; the INBOUND placements of O-129 rows 3 and 4, O-171 R-2 and O-180 (3); `docs/precepts/motion-canon.md` P5 and P6, which state Q-6 (a) and §1.6 in one sentence each; and the deletion of `SPEC-SUMMARY.md`. All but the motion-canon sentences were made on 2026-11-11; those two are owed in the precepts repository (`review/fable-2026-11-10/owed-outside-BL.md`).


## Owner law added 2026-11-11 (O-248)

The owner's words on daraksha's dock (frames `~/.dev-logs/owner-1111/shots/1.png`, `8.png`): "ALL dock animations should be well defined in animating, not just telporting and instantly changing, the heigth and width", and the collapse is "not smooth in the end or beginning".

This is the wave's subject stated as a law, and it widens §1.6 from width to both extents: **every dock state change animates the plate's width and height on the dock spring with an eased start and end, and the plate is round at every frame.** The changes: collapse, expand, a layer in or out, a page change that alters seat count or label width, a seat appearing or leaving (the bare seat included). The build's gate matrix is that list, one cell per change, each reading per-frame plate width and height: no step over the spring's own peak frame, no frame with unequal corners, first and last frames within 1 px of rest. daraksha is sending the list of changes that jump today; it is merged into the matrix when it arrives, and a change it names that this list lacks is added, not argued.

**Inputs banked 2026-11-12 (O-274):** `../design/dock/inbound/daraksha-dock-jumps-2026-11-11.md` (every daraksha dock state change that jumps) and `../design/dock/inbound/atlas-rail-state-changes-2026-11-11.md` (atlas's rail list; its asks 1, 3 and 4 are open). The build seat reads both against O-248 and gates each listed change. Also here: a rest-fill token on DockControl (one token, hover and active derived from it).
