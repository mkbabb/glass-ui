# AX.W01 REDRESS — the dock box morph SNAPS (the single-scalar morph never animated)

**Status:** dev-complete, headless self-gates GREEN. Live (real-device) morph re-verification is the orchestrator's hinge — this agent cannot drive a Metal GPU.

**Base:** `f31339cc476b48e7c1b007d31402e0130eac189e`
**Files touched (FileBounds):**
- `src/components/custom/dock/composables/useLayerTransition.ts` (the measurement rebuild)
- `src/components/custom/dock/GlassDock.vue` (the outer call-site comment; no API arg needed)
- `docs/tranches/AX/audit/W01-redress.md` (this file)

`src/styles/dock.css`, `DockLayerGroup.vue`, `DockLayer.vue` were NOT touched — the redress is a pure measurement-timing fix in the ONE driver; the CSS morph axes + the inner call site were already correct.

---

## 1. The live evidence (orchestrator, real Metal GPU, `/navigation/dock`, collapsible dock #1)

Hovering the collapsed dock (`.glass-dock.collapsed`, 58px) to expand:

- the root box width SNAPS 58→211 in ONE frame (rising-frame count = 1);
- `--dock-morph-t` on the `.glass-dock` root stays **0 the entire time** — the `SpringProgress` never runs;
- the leaving-pane opacity fades over ~5 frames (that arm works) → the box + content are NOT on one clock.

## 2. Root cause (confirmed at the code level)

`GlassDock.vue` composes `useLayerTransition({ containerEl: layersEl, … })` for the outer collapse↔expand, where `layersEl` is `.dock-layers`. `.dock-layers` is a CSS **grid** stacking BOTH panes at `grid-area: 1/1`. The pane state contract (dock.css):

- the **active** pane (`.dock-layer--full.layer-active` / `.dock-layer--summary.layer-active`) is `position: relative` + `width: max-content` (or `width:100%` for `--full`) — **IN FLOW**, so it sizes the grid track;
- the **inactive** pane is `position: absolute; inset: 0` — **OUT of flow**, stretched to the box.

So `.dock-layers` shrink-wraps **whichever pane is currently active**. Its width therefore differs between collapsed (`--summary` active, ~40px content → ~58px box) and expanded (`--full` active, ~195px content → ~211px box) **only after the class flip swaps which pane is active.**

The class flip is driven by `visualExpanded` → `.collapsed`/`.expanded` on the root AND by `useLayerTransition`'s `currentLayer` ref → `layer-active` on the panes. Vue's default watcher flush is `'pre'`: the `watch(activeLayer, …)` callback runs **before** the component re-renders, so the DOM still shows the OLD active pane for the whole synchronous callback.

The HEAD driver measured both endpoints synchronously inside that callback:

```ts
const fromSize = getSize(el);          // .dock-layers, OLD active pane (e.g. ~40 collapsed)
leavingLayer.value = oldLayer;         // ref writes — DOM not yet flushed
currentLayer.value = newLayer;
clearMorphVars(el);
const toSize = getSize(el);            // STILL the OLD active pane (~40) — flush hasn't run
if (Math.abs(toSize - fromSize) < 0.5) { settle(el, root); return; }  // ← FIRES
```

`fromSize ≈ toSize` → the early-return settles immediately → the spring never starts → `--dock-morph-t` stays 0 → the box falls through to the `.collapsed`/`.expanded` class layout (`display:inline-flex` shrink-to-fit) and **snaps** in one reflow. This is EXACTLY the reported timeline (rising-frame = 1, `--dock-morph-t == 0`, leaving-fade still on its own CSS clock).

This is the SAME topology for the inner `<DockLayerGroup>` pane-swap (`.dock-layer-stack` grid, active host `position:relative; width:max-content`, inactive `position:absolute; inset:0`) — so the inner morph was latently broken by the identical synchronous-read trap. The W01 self-gates feed synthetic frame arrays to pure detectors and so could not witness the real-layout freeze.

## 3. The fix (re-derived from the `e8380d7` single-clock high-water)

The `e8380d7` driver measured `fromWidth`, **swapped classes, then `nextTick()`-deferred the natural-width measurement** (let the DOM reflow), re-pinned the from-width, and `rAF`-animated to the to-width. W01 deleted that deferral chasing a "single-frame origin" — but the deferral was never the desync source. The desync was a SECOND clock: a root CSS-transition ran the box morph in PARALLEL with the inner width spring (the box led the content by a frame). W01 correctly deleted that root CSS-transition — but ALSO deleted the deferral, which is what the `to` measurement structurally needs.

The redress restores a deferred `to` measurement, now SINGLE-CLOCKED because the box rides only the spring scalar:

```ts
const fromSize = getSize(el);          // pre-flip aperture (or live mid-morph px on a retarget)
leavingLayer.value = oldLayer;
currentLayer.value = newLayer;
// PIN the box at `from` NOW so it HOLDS (no snap); arm the clip + stagger at t=0
el.style.setProperty("--dock-morph-from", `${fromSize}px`);
el.style.setProperty("--dock-morph-to",   `${fromSize}px`);   // from==to ⇒ box == fromSize
root.style.setProperty("--dock-morph-t", "0");
root.setAttribute("data-morphing", "");
requestAnimationFrame(() => {           // AFTER the class flip flushes
    if (id !== transitionId) return;    // superseded swaps self-cancel
    clearMorphVars(el);                  // lift the pin for ONE measurement…
    root.style.removeProperty("--dock-morph-t");
    const toSize = getSize(el);          // …now the TARGET pane is in-flow ⇒ shrink-wrapped natural size
    armSpring(el, root, id, fromSize, toSize, inheritedVelocity, live);  // re-pin + spring, same frame
});
```

`armSpring` pins `--dock-morph-from`/`--dock-morph-to`, sets `--dock-morph-t = 0`, then drives ONE `SpringProgress` `0→1`, writing the scalar to the `.glass-dock` root every rAF frame via `.play(t ⇒ root.style.setProperty("--dock-morph-t", t))`.

**Why no `dock.css` / `DockLayerGroup` / `DockLayer` edit:** the morph axis CSS was already correct — `.glass-dock[data-morphing] .dock-layers { inline-size: calc(--dock-morph-from + (--dock-morph-to − --dock-morph-from)*--dock-morph-t) }` (and the `.dock-layer-stack` block-size twin). The morph var still lands on `el` (`.dock-layers` outer / `.dock-layer-stack` inner) and the `display:inline-flex` root SHRINK-WRAPS it, so the box IS the growing aperture. Only the JS measurement was wrong. The `measure` mode option I first added was a FALSE distinction (both topologies are identical) and was removed — the one deferred path serves both, so the inner call site needs no thread.

## 4. Frame-by-frame argument that `--dock-morph-t` now ramps and the box interpolates

Concrete numbers for dock #1 expand (collapsed `--summary` ≈ 40px content / ~58px box → expanded `--full` ≈ 195px content / ~211px box). `--spring-dock` = response 0.32, ζ 0.7 (`DOCK_SPRING`), `respectReducedMotion:true`.

**Frame 0 (the hover → `visualExpanded` flips `false→true`):**
- `outerActiveLayer` recomputes `"summary"→"full"`; `watch(activeLayer)` fires (`flush:'pre'`, DOM still `.collapsed`).
- `fromSize = getSize(.dock-layers) = ~40` (the collapsed summary track — the OLD active pane, correctly the current aperture).
- `leavingLayer="summary"`, `currentLayer="full"` (ref writes; the `layer-active`/`.expanded` class flip is queued for this tick's render flush).
- PIN: `--dock-morph-from:40px`, `--dock-morph-to:40px`, `--dock-morph-t:0`, `data-morphing` set on the root.
- The CSS `calc(40 + (40−40)*0) = 40px` ⇒ `.dock-layers` inline-size 40px ⇒ box ~58px. The box **HOLDS** at the collapsed aperture — it does NOT snap, because `--dock-morph-to == --dock-morph-from` pins it regardless of the `.expanded` class that lands this same flush. The child stagger (`opacity = clamp(0,(--dock-expand-t − onset)/window,1)`, `--dock-expand-t = --dock-morph-t` under `[data-morphing]`) also reads `t=0` ⇒ children held hidden. ONE held frame.

**Frame 1 (the rAF callback, after the flush):**
- The `.expanded` + `layer-active` classes are now LIVE: `--full` is the in-flow (`position:relative`) pane, `--summary` is `position:absolute; inset:0` (out of flow).
- `clearMorphVars(.dock-layers)` lifts the pin; `getSize(.dock-layers)` forces a reflow → the grid track now shrink-wraps `--full` → `toSize = ~195`. (No paint happens inside the rAF callback, so the momentary unpinned reflow is never shown.)
- `armSpring(from=40, to=195)`: `|195−40| = 155 ≥ 0.5` ⇒ NO early-return. Re-pin `--dock-morph-from:40px`, `--dock-morph-to:195px`, `--dock-morph-t:0`, `data-morphing` (still set). `new SpringProgress({response:.32, dampingFraction:.7, initial:0})`; `reset(0,0)`; `target = 1`; `play(onFrame)`.
- `SpringProgress.play` starts its internal rAF loop; the box is still pinned at `calc(40 + 155*0) = 40px` for this frame (t just initialized to 0). The unpinned reflow happened only inside JS; the painted frame shows 40px.

**Frames 2…N (the spring's rAF loop):**
- Each tick advances the analytic underdamped solution `t(τ)` of the (0.32, 0.7) system from 0 toward 1. `onFrame(t)` writes `root.style.--dock-morph-t = t`.
- The registered `@property --dock-morph-t {syntax:"<number>"; inherits:true; initial-value:0}` interpolates COMPOSITED; `.dock-layers` inline-size = `calc(40 + 155*t)` ⇒ 40 → 195 over the spring's settle window. With response 0.32 + 60fps, t crosses ≈0.15, 0.40, 0.66, 0.85, 0.95, 0.99… over **many** frames (≈18–22 frames to 99% at 60Hz, ~+4.6% overshoot past 195 then settle) — NOT a one-frame jump.
- The box border-box = `.dock-layers` inline-size + the dock inline padding, and the padding ALSO interpolates on `--dock-expand-t = --dock-morph-t` (dock.css `padding-inline: calc(pad-collapsed + (pad-expanded − pad-collapsed)*--dock-expand-t)`). So the box rises 58 → 211 over the SAME frames — `rising-frame count ≫ 5`, the SNAP gone.
- The child stagger opacity ramps `clamp(0,(t − onset)/0.55,1)` per child, and the leaving-pane CSS opacity fades on `--dock-motion-resize` (the SAME `--duration-normal`/spring window) — both now co-temporal with the box on the one scalar (lead/lag ≤ 1 frame: the leaving-fade started at frame 0's class flip, the box at frame 1, a single-frame lead within tolerance; everything else is exactly the `--dock-morph-t` clock).

**Settle:** when `SpringProgress.settled`, `onFrame` calls `settle()` → `clearMorphVars` + remove `--dock-morph-t` + remove `data-morphing`. The `:not([data-morphing])` at-rest rules take over (`.dock-layers { width:100% }`, the box at its natural expanded width, the clip lifts to `visible`). Flush expanded.

**Collapse (expanded→collapsed)** is the mirror: `fromSize = getSize(.dock-layers) = ~195` (the `.expanded:not([data-morphing])` `width:100%` box content), the rAF measures `toSize = ~40` (post-flush, `--summary` now in-flow, `--full` absolute-stretched), the spring runs 195→40. CRITICAL: this is why the deferred post-flush measurement is REQUIRED and a synchronous `scrollWidth` of the inactive target pane would NOT work — collapsing, the target `--summary` is the absolute/`inset:0`-STRETCHED pane (~195px box, centered icon, no overflow), so its `scrollWidth` reads ~195 (the stretched box), not its ~40 natural; only measuring it AFTER it becomes the in-flow shrink-wrap pane yields the correct ~40.

**Retarget (un-hover mid-expand):** the watch re-fires; `++transitionId` makes the in-flight spring's `onFrame` and any pending first rAF self-cancel (`id !== transitionId`) so the box FREEZES at its current px; `fromSize = getSize(.dock-layers)` re-reads that live mid-morph px (e.g. 120); `inheritedVelocity = live.velocity` captured synchronously; the rAF measures the new `to` (~40) post-flush and `armSpring` REUSES the live spring (`live` truthy ⇒ no `disposeSpring`), `reset(0, inheritedVelocity)` + `target=1` + `play` re-seats the analytic solution from the carried velocity — inertia continues, no snap-from-rest. Velocity-continuity preserved exactly as W01 shipped it.

## 5. Preserved (everything W01 got right)

- the View-Transitions COLLAPSE fork stays RETIRED (no VT in the morph path);
- the route-morph `view-transition-name` on the dock ROOT (`dockId.replace(…)` ⇐ `glass-dock-${useId()}`) is untouched — `proof:vt-names` GREEN (mint traces to `useId()`);
- the clip-reveal aperture (`overflow:clip` gated on `[data-morphing]`, active pane statically `opacity:1` revealed by the growing box) is untouched;
- the published `--spring-dock` (0.32, 0.7, ~+4.6% overshoot, no re-bounce) is the only morph curve;
- the velocity-continuity retarget (reuse the live spring, `reset(0, inheritedVelocity)`) is preserved verbatim.

## 6. Self-gates (headless — a real browser was NOT available to this agent)

| gate | result |
|---|---|
| `npm run typecheck` (`vue-tsc --noEmit`) | CLEAN |
| `npm run build` | CLEAN — `dist/dock.js` emits (19.99 kB / 6.59 kB gzip); dts flatten OK |
| `npx vitest run tests/components/custom/dock/` | 82 passed / 10 files |
| `node scripts/proof-vt-names.mjs` | PASS (4 mints, 0 violation — the GlassDock route-morph seam survives) |

**What this agent could NOT verify:** the LIVE morph on a real GPU. The headless suite's `dock-animation-live` / `dock-clip-reveal` detectors run on SYNTHETIC frame arrays (they SKIP without a browser harness), so they cannot witness the real-layout freeze the orchestrator caught, nor confirm its repair. The §4 argument is a code-level proof that `--dock-morph-t` now ramps and the box interpolates; the orchestrator's live re-probe is the binding confirmation.

## 7. Live-verification recipe for the orchestrator

1. Open `/navigation/dock`, target the first collapsible dock (`.glass-dock.collapsed`, ~58px, single Home icon — the "Collapsible (hover to expand)" section).
2. rAF-sample on hover-expand:
   - `getComputedStyle(dockRoot).getPropertyValue("--dock-morph-t")` must **ramp 0 → 1 over many frames** (NOT stay 0). Expect a non-trivial value (e.g. ~0.1–0.9) on the intermediate frames; with response 0.32 at 60Hz, ≈18–22 frames to 0.99.
   - `dockRoot.getBoundingClientRect().width` must **rise over ≥5 intermediate frames** 58 → ~211 (rising-frame count ≫ 1), with a small overshoot past 211 then settle — NOT a single 58→211 jump.
   - the leaving summary-pane opacity fall and the box rise must be **co-temporal** (lead/lag ≤ 1 frame), reading as ONE continuous iOS spring.
3. Mid-expand, un-hover to retarget: the width must reverse from its CURRENT mid-px (no snap-to-rest, inertia carried), `--dock-morph-t` re-running on the new span.
4. Confirm the inner `<DockLayerGroup>` pane-swap (`/navigation/dock-layers`) ALSO animates its `.dock-layer-stack` size (the same driver now repairs the latent inner freeze).
5. `prefers-reduced-motion: reduce`: `--dock-morph-t` jumps 0→1 within ~1 frame (the `respectReducedMotion` snap) after a single held frame — state toggles, no multi-frame spatial motion.
