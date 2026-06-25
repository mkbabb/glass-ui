# BD.W-VH-COMPOSE — compose the SHIPPED `useDockOrientationMorph` continuous V↔H morph + grab-pull, retire the crossfade facsimile

**Band 1 (CONSOLIDATE) · depends: W-SPIKE-DELETE (T1 — the `useLiquidMorph` facsimile-engine is gone, so the V↔H morph has ONE driver: the shipped `useDockOrientationMorph`)** — subsumes the V↔H crossfade-facsimile retire (`UNIFIED-ROSTER.md:30`). The T1 chain terminus: FLIP-SPINE (the bloom runner) → SPIKE-DELETE (the spike cut) → VH-COMPOSE (wire the real morph).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build edits `demo/stories/dock/morph-showcase.vue` + `demo/layout/AppShell.vue` (retires the `startViewTransition` crossfade default, composes the continuous scalar + grab-pull) and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `EXECUTION-DAG.md:21`, the morph-showcase trace)

The library SHIPS a real continuous V↔H morph driver — `useDockOrientationMorph` (`src/components/custom/dock/composables/useDockOrientationMorph.ts`) — but the demo DEFAULT hides it behind a `startViewTransition` snapshot CROSSFADE facsimile. Traced at HEAD:

- **The continuous morph IS shipped, barreled, demo-mounted.** `useDockOrientationMorph` exposes the ONE `--dock-morph-t` scalar (`t: Ref<number>`, `:55`), the live `verticalStyle`/`horizontalStyle` size spans, the `verticalOpacity`/`horizontalOpacity` crossfade, the `stretch` teardrop squish, `morphTo`/`toggle` (bidirectional, the SAME scalar both ways), AND `pin(value)` (the deterministic capture seam). It is barreled (`dock/composables/index.ts`) + consumed by `morph-showcase.vue:56` AND `AppShell.vue:94`. The driver is real and complete.
- **But the SHIPPED DEFAULT is a crossfade FACSIMILE.** `morph-showcase.vue:62-95`: `liquidPreview` defaults `false`, and on `false` the `toggleMorph()` path runs `startViewTransition(() => { vtOrientation.value = … })` — a **compositor SNAPSHOT crossfade between the before/after dock states**, NOT the continuous scalar morph. The real continuous teardrop morph (the goo-bridged plate that melts column→row) is gated behind a `liquidPreview` toggle that ships OFF. `AppShell.vue:127` carries the identical `startViewTransition` crossfade default for the in-situ shell morph. So the DEFAULT experience the user sees is a cross-DISSOLVE between two static silhouettes — the topology change (column→row) is HIDDEN inside the dissolve, never SHOWN as a continuous liquid morph.
- **The historical rationale ("VT crossfade is the budget-clearing §7 fall") was a PERF hedge that D2 OVERTURNED.** The morph-showcase comments (`:13-30`) frame the crossfade as the conservative perf-fall (the liquid teardrop "does not clear the strict budget under throttle" at AZ). But Pass-D D2 measured the LIVE frame-time on real Chrome/WebGPU: blob + aurora both ran avg **10.21ms / p95 11.7 / 0 frames >20ms** — VSYNC-CAPPED with GPU HEADROOM (`PASSD-FOLD §D2`). The single-dock SVG-goo bridge (a `feGaussianBlur` + threshold over ONE plate, no live aurora repaint) is materially cheaper than the dual-viz floor that measured clean. The perf-fall premise the crossfade rests on is no longer load-bearing — the continuous morph CAN ship as the default.
- **The grab-pull primitive is SHIPPED and UNCONSUMED on the morph.** `useDragMorph` (`src/composables/motion/useDragMorph.ts`) is the platform's pull-gesture primitive (composes kf `Draggable` + `decayRest` + `nearestTarget`). The morph-showcase has NO grab-pull — you can only `toggle()` the morph, never GRAB the dock and PULL it from V to H. The iOS-27 liquid-dock north star (the BD seed) is a dock you can GRAB and pull-morph.

The ask is `EXECUTION-DAG.md:21`: **compose the SHIPPED V↔H morph (the continuous scalar, not the snapshot crossfade) + grab-pull; retire the crossfade facsimile.** Make the continuous teardrop morph the DEFAULT (the `liquidPreview` gate evaporates), wire `useDragMorph` so the dock is GRABBABLE, and delete the `startViewTransition` crossfade path (clean break — no dual morph path).

## The mechanism

Retire the crossfade default + the `liquidPreview` gate → the continuous scalar morph IS the default; wire `useDragMorph` for grab-pull; `proof:no-dual-path` GREEN on the V↔H axis.

### 1. The continuous scalar morph IS the default (retire the crossfade facsimile)

`morph-showcase.vue` + `AppShell.vue` drop the `startViewTransition` crossfade path entirely (clean break — no alias, no dual morph path):

- The `liquidPreview` toggle ref + its two-branch `toggleMorph()` (`:84-95`) collapse to a single branch: `toggleMorph()` always calls `morph.toggle()` (the continuous scalar). The `vtOrientation` ref + the `startViewTransition` wrap are DELETED.
- The `<GlassDock>` swap reads the live `verticalStyle`/`horizontalStyle`/`verticalOpacity`/`horizontalOpacity` + the goo bridge (`gooFilter`, gated to the occluded midpoint `t∈(0.18,0.82)`, `:78-81`) — the continuous teardrop morph that was the `liquidPreview` preview becomes the SHIPPED render. The `pin(value)` deterministic capture seam (`:84-99` comment) is KEPT (the π drives EXACT t-values).
- The `startViewTransition` import drops from BOTH files IF it has no other use on the surface (a grep confirms — `morph-showcase.vue` uses it ONLY for the crossfade; `AppShell.vue` may use it for ROUTE transitions, which STAY — the V↔H morph crossfade is the only arm retired, the route-VT navigate substrate is untouched).
- The `morph-showcase.css` View-Transition group recipe (`:338-348` — the `view-transition-name` naming the two dock states) drops the V↔H crossfade arm (a dead recipe once the crossfade is gone) — coordinated with `proof:no-dual-path` so a surviving crossfade recipe REDs.

### 2. Grab-pull — wire `useDragMorph` onto the dock V↔H

The morph-showcase dock becomes GRABBABLE: `useDragMorph` (the SHIPPED pull-gesture primitive) drives the SAME `--dock-morph-t` scalar off a pointer-capture grab, with the snap targets at the two detents (t=0 vertical, t=1 horizontal). The grab → follow → fling-to-nearest-detent is the iOS-27 pull. The wire is a COMPOSE, not a new engine:

- `useDragMorph` follows the finger along the morph axis (the dock's resolved orientation-flip axis), driving `morph.pin(t)` (the deterministic scalar write — NO spring during the drag, the finger IS the position) so the user PULLS the dock continuously between V and H.
- On release, `useDragMorph`'s `nearestTarget` + `decayRest` projection picks the nearest detent (a flick past the midpoint flings forward, a slow pull short snaps back) and `morph.morphTo(detent)` runs the spring settle (the C¹ velocity-continuous fling onto the snapped orientation). The drag's `--stretch` rides the SAME teardrop squish var the morph reads (the click + drag share ONE squish writer — no forked stretch).
- PRM-safe by construction: `useDragMorph` + `useDockOrientationMorph` both seat synchronously under `prefers-reduced-motion: reduce` (the gesture follows, the snap commits instantly, no squish — both composables already carry the policy).

`useDragMorph` does NOT edit `dockMorphContext`/`dockMorphMeasure`/`DOCK_SPRING` (the foreign-tree + box-inviolate fences — the dock's own morph mechanism is W-DOCK-MORPH-FAMILY's; this composes the pull gesture BESIDE it onto the showcase scalar). It is consumer-#3 of `useDragMorph` (beside SegmentedTabs `:draggable` + DockLayerGroup pull-to-switch).

## The gate — `proof:vh-compose` (born-RED → GREEN; the crossfade ABSENCE byte-assert + the grab-pull wire, never presence-regex)

`scripts/proof-vh-compose.mjs`, `tags: ["local","ci"]`, comment-stripped detector exported for the bites.

- **V1 — the continuous scalar morph is the DEFAULT (the crossfade facsimile RETIRED).** The detector scans `morph-showcase.vue` + `AppShell.vue` (comment-stripped) and asserts: (a) NO `liquidPreview` ref gating the morph path (the gate is gone — the continuous morph is unconditional); (b) the V↔H toggle path calls `morph.toggle(`/`morph.morphTo(` (the continuous scalar driver), NOT `startViewTransition(` wrapping a `vtOrientation` swap (the crossfade facsimile). A surviving `startViewTransition`-wrapped V↔H orientation swap REDs (the facsimile not retired). **Born-RED at HEAD** (the `liquidPreview=false` crossfade default ships). The route-`navigate`/`startViewTransition` ROUTE-transition arm is EXEMPT (the detector scopes to the V↔H orientation-swap call-site, not every `startViewTransition` — a route transition is a different mechanism).
- **V2 — the grab-pull is WIRED (the dock is grabbable).** The detector asserts `morph-showcase.vue` carries a live `useDragMorph(` call-expression whose drag-write drives `morph.pin(`/the `--dock-morph-t` scalar AND whose release calls `morph.morphTo(`/`nearestTarget` (the fling-to-detent). A morph-showcase with NO `useDragMorph` REDs (the pull gesture absent — the iOS-27 north star unmet). **Born-RED at HEAD** (no grab-pull).
- **V3 — ONE V↔H morph path (no dual).** The detector asserts the `--dock-morph-t`/`useDockOrientationMorph` scalar is the SOLE V↔H morph driver on the showcase — no surviving `startViewTransition`-crossfade arm BESIDE the continuous morph (the dual-path the `proof:no-dual-path` discipline forbids). The dead View-Transition CSS group recipe (`morph-showcase.css` V↔H arm) is GONE. A continuous morph SHIPPED beside a kept crossfade recipe REDs (the half-retire).
- **V4 — `useDockOrientationMorph` PERSISTS unedited (the driver is composed, not re-forked).** The detector asserts `useDockOrientationMorph.ts` exists, exposes `t`/`pin`/`toggle`/`morphTo`, and `DOCK_SPRING`/`dockMorphContext.ts`/`dockMorphMeasure.ts` are byte-untouched vs HEAD (a `git diff --quiet` over the three files — the foreign-tree fence; the wave wires the morph, never re-tunes its clock). An edit to `DOCK_SPRING` REDs.

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a re-added `liquidPreview` ref gating a `startViewTransition` V↔H swap → V1 RED.
- (a2) a `// the retired startViewTransition crossfade` comment planted → V1 must NOT red (the comment-aware false-RED bite).
- (b) a morph-showcase with the `useDragMorph(` call deleted → V2 RED (the grab-pull absent).
- (c) a continuous morph SHIPPED beside a kept `view-transition-name` V↔H crossfade recipe → V3 RED (the dual-path bite).
- (d) a planted `DOCK_SPRING` clock edit → V4 RED (the re-fork bite).

**What reds on the pre-fix tree (born-RED by construction):** V1 (the `liquidPreview=false` crossfade default ships), V2 (no `useDragMorph` grab-pull), V3 (the crossfade arm + the continuous preview both exist — the dual path is the `liquidPreview` toggle). GREEN only after the crossfade facsimile retires + the grab-pull lands.

## The binding π — `tests-visual/vh-compose.spec.ts` (the continuous teardrop frame-series + the grab-pull, rides W-REFLECT3)

The painted-truth readback the V↔H morph needs, BOTH modes (light + dark), served at `:5199`, LOCAL-ONLY (a real GPU + the SVG-goo bridge). Driven via `morph.pin(t)` (the deterministic capture seam — EXACT t-values 0/.25/.5/.75/1, both directions, frame-reproducible):

- **The continuous teardrop frame-series.** Capture the morph at each pinned `t` and assert the dock reads as ONE continuous liquid teardrop melting column→row (the goo bridge merges the plates at the occluded midpoint `t∈(0.18,0.82)`) — NOT a cross-dissolve between two static silhouettes (the facsimile the wave retires). The midpoint frame shows a SINGLE merged amorphous plate (the bridge active), never two ghost-overlapping docks (the crossfade tell).
- **The grab-pull frame-series.** Drive a synthetic pointer-drag (Playwright `mouse.down`/`move`/`up`) and assert the dock FOLLOWS the finger continuously (the scalar tracks the drag), the flick-past-midpoint flings forward to the H detent, the slow-pull-short snaps back to V (the `nearestTarget` decision), and the squish swells on the pull velocity (capped LOW).
- **The PRM seat.** Under `prefers-reduced-motion: reduce` the morph seats SYNCHRONOUSLY (no in-between transform frames, no squish), the grab still functions (the drag follows, the snap commits instant).

The `proof:ba-gestalt` dock verdict (the union dock-hallmark roster row, `W-GESTALT-WIRE`) re-earns on a fresh capture: the V↔H morph reads as the iOS-27 liquid pull-morph, the gestalt judgement the per-mechanism π cannot make alone.

## Fences

- **The continuous scalar morph is the DEFAULT — the crossfade facsimile is RETIRED (clean break).** No `liquidPreview` gate, no `startViewTransition`-wrapped V↔H swap (V1/V3). The route-`navigate`/`startViewTransition` ROUTE-transition substrate is a DIFFERENT mechanism, untouched (the V↔H orientation swap is the only crossfade arm retired).
- **The DRIVER is COMPOSED, never re-forked.** `useDockOrientationMorph` + `DOCK_SPRING` + `dockMorphContext` are byte-untouched (V4 — the `git diff --quiet` assert); the wave wires the SHIPPED morph, never re-tunes its clock (the foreign-tree fence, the W-GLASS-CAL spring fence).
- **The grab-pull is `useDragMorph` COMPOSED, never a second drag engine.** The pull gesture reuses the SHIPPED kf `Draggable` + `decayRest` + `nearestTarget` (consumer-#3); it drives the SAME `--dock-morph-t` scalar + the SAME `--stretch` squish writer (no forked drag/stretch path — V2).
- **The topology-change limit is RESPECTED.** A V↔H flip is a TOPOLOGY change (flex column→row); the platform cannot continuously interpolate a mismatched silhouette (AX.W42 fold 7, the binding limit). The continuous morph hides the reflow inside the goo-merge at the occluded midpoint — it never attempts a continuous clip-path morph (the same discipline the SHIPPED morph already honors; this wave makes that morph the DEFAULT, it does not fight the limit).
- **The crossfade ABSENCE is a byte-assert, never presence-regex.** V1 asserts NO `startViewTransition`-wrapped V↔H swap (comment-stripped); a presence check (`/morph.toggle/.test()`) would green a dual path where the crossfade survives beside the continuous morph. The detector reads the call-site shape.
- **The D2 perf premise is recorded.** The crossfade's "budget-fall" rationale is overturned by the D2 live frame-time (vsync-capped, GPU headroom — `PASSD-FOLD §D2`); the continuous single-dock SVG-goo morph is cheaper than the dual-viz floor that measured clean. The π captures the live frame-time to confirm (the `tests-visual` perf arm), so the default-ship decision rides a MEASURED number, not a presumption.

## Disposition links

- **`EXECUTION-DAG.md:21`** ("compose the shipped V↔H morph + grab-pull; retire the crossfade facsimile") → BUILT (§1 the crossfade retire + §2 the grab-pull; V1-V3). CLOSED at the spec level (the build user-gated).
- **`PASSD-FOLD §D2`** (the live frame-time overturns the crossfade perf-fall premise) → BUILT (the continuous morph ships as default; the π confirms the measured frame-time). CLOSED.
- **depends: `W-SPIKE-DELETE` (T1)** — the `useLiquidMorph` facsimile-engine is gone, so the V↔H morph has ONE driver (the shipped `useDockOrientationMorph`); composing the real morph here cannot re-introduce a dual path. Backward.
- **SUBSUMES the V↔H crossfade-facsimile retire (`UNIFIED-ROSTER.md:30`)** → the `startViewTransition` snapshot crossfade is the retired facsimile; the continuous teardrop morph is the shipped truth. CLOSED.
- **`useDragMorph` consumer-#3** (beside SegmentedTabs `:draggable` + DockLayerGroup pull-to-switch) — the grab-pull wire deepens the SHIPPED primitive's consumer count, never re-forks it. Forward to the dock hallmark (T2 `W-DOCK-INTEGRATE` reads the grabbable morph).
