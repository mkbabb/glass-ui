<!--
  FRESHNESS (AZ-form):
    wave:        BA.W-DOCK-MORPH-INSITU — the in-situ shell-dock V↔H morph + layering switch + the BA-VJS-1 nested-measure fix
    captured-at: 2026-06-12
    HEAD:        3686eb16 (branch tranche/BA; the wave's edits in the working tree atop it)
    device:      Chrome-headless-new (tests-visual/playwright.config.ts) — SwiftShader (NOT the Metal dev-box; see §6d)
    routes:      /foundations/intro (the in-situ morph stage + the §7 perf re-run; a 3-facet route for the layering switch),
                 /dock/layers (the dock-nested-collapsible — the BA-VJS-1 four-cycle reproduction surface)
    spec:        tests-visual/dock-morph-insitu.spec.ts (the binding π, 4 clauses); proof:dock-morph-insitu (the device-free SOURCE arm)
    re-run:      `cd tests-visual && npx playwright test dock-morph-insitu.spec.ts --project=chromium-headless-new`
-->

# BA.W-DOCK-MORPH-INSITU — π SHELL DELTA (the in-situ V↔H morph + layering + BA-VJS-1)

R8-2 is a COVERAGE gap, not erosion: the V↔H liquid-glass dock morph HOLDS on the
`/dock/morph-showcase` story (AZ.W-MORPH-SHOWCASE / WVR-9), but the user wants it IN the
shell docks — "we should have a facility to demonstrate the robust dock liquid glass
facilities … smoothly interpolate and animate a vertical dock to be horizontal and vice
versa … too, a robust set of facilities to demo our dock layering and contextual
switching system within these demo docks." This wave consumes the AZ
`useDockOrientationMorph` driver IN the shell (the shell is its binary consumer #2),
exercises the layering/contextual switch in-situ, and fixes the BA-VJS-1 nested-group
measure-ordering bug that was the structural prerequisite (a nested dock measured `to:0`,
so the morph could never read smooth).

## The topology decision (recorded — the §Triumvirate named-successor path)

The shell renders TWO fixed-position nav docks: `SidebarDock` (vertical, left) and
`BottomDock` (horizontal, bottom). These are nav chrome on EVERY route — physically
morphing the SidebarDock INTO the BottomDock would break navigation page-wide. The
driver's contract is two real DOM docks under one stage root; the shell's
one-dock-per-orientation fixed topology cannot host that without a driver edit (the
§Triumvirate driver-topology trigger). Per the spec's **named-successor #2** ("the in-situ
demonstration falls to the showcase's two-synthetic-dock pattern transplanted into the
shell stage"), the in-situ demonstration is a **focused morph stage that OPENS over the
live shell**: the morph control in each shell dock's trailing utility group toggles it,
the SAME `useDockOrientationMorph` driver writes the ONE `--dock-morph-t` scalar, and the
stage stages over the real shell backdrop (BA-DSM-3 — the PaperBackdrop + the route page +
the shell docks read THROUGH the dim, not a flat plate). NO second morph engine, NO
parallel clock, NO orientation `ref` shadow. The morph DRIVER is untouched; only the
measure CONTEXT carries the BA-VJS-1 carve. This is a clean addition — the showcase story
stays.

## 6a — the in-situ V↔H frame-series on the ONE `--dock-morph-t` scalar (both directions)

The deterministic-pin seam (`window.__shellDockMorph.setMorphT(t)`) pins the EXACT scalar
— no spring, no wall-clock — so a frame at a given `t` is byte-reproducible. Captured at
t=0/.25/.5/.75/1 over the live shell:

| t | vertical dock height | horizontal dock width | vertical opacity | horizontal opacity |
|---|---|---|---|---|
| 0.00 | full | collapsed | 1.00 | 0.00 |
| 0.25 | falling | growing | dimming | rising |
| 0.50 | mid | mid | **~0.0 (occluded)** | **~0.0 (occluded)** |
| 0.75 | low | high | 0.00 | rising |
| 1.00 | collapsed | full | 0.00 | 1.00 |

- The pinned `t` lands the scalar EXACTLY (|scalar − target| < 0.02 at every step — the
  ONE source, no wall-clock).
- The silhouette is coherent + monotone: the vertical collapses (height falls), the
  horizontal grows (width rises) — a continuous morph, no jump-cut.
- At the midpoint BOTH crossfade opacities are at their dimmest (< 0.2) — the topology
  reflow (column → row) is OCCLUDED by the bridge/crossfade, so the jump-cut is hidden
  (the platform cannot continuously interpolate a mismatched-topology silhouette; the
  showcase respects the limit rather than fighting it — AX.W42 fold-7).
- Bidirectional: `morphTo("horizontal")` raised the scalar to ~1.0, `morphTo("vertical")`
  returned it to ~0.0 — the SAME spring re-targets 0↔1 (one trajectory, no separate
  forward/back clock).

Captures: `dock-morph-insitu/insitu-light-vt-vertical.png` (t=0, VT register),
`insitu-light-teardrop-mid.png` (t=0.5, the goo teardrop occluding the reflow),
`insitu-light-vt-horizontal.png` (t=1), `insitu-dark-vt.png` (the dark register reads as
luminous transmissive glass).

## 6b — the in-situ layering/contextual switch (the dock active facet changes live)

On `/foundations/intro` (a 3-facet route — Tokens / Type / Material), the SidebarDock's
floating-carousel rail renders the 3 facet chips (`useContextualDockLayers` → the
route→facet resolver, wired onto W-DOCK-SECTIONS's `<DockSection>` chassis). Clicking the
"Material" chip wrote `railContext` (the one-registry writable-computed) and navigated the
dock's active facet context LIVE: `/foundations/intro` → `/foundations/paper-glass`. The
section/layer context changed on the shell, not only on the `/dock/layers` story. This is
the existing W-DOCK-SECTIONS chassis CONSUMED as the in-situ layering demonstration (this
wave WIRES the demonstration; it does not re-author the structure).

## 6c — BA-VJS-1: the nested-group measure-ordering fix (`from:40 → to:≈242`, never 0)

The valuejs-fold A-1 / value.js N2 letter §A-1 finding: a `<DockLayerGroup>`-nested dock
measured its expand target as `to:0px` — DETERMINISTIC + permanent (the AY.W-GOD1 §F2
booking under-scoped it as "first-mount intermittent"; it tested a non-nested slider
dock). Mechanism: during the OUTER `.dock-layers` rAF measure, the active full pane's only
content is the nested `.dock-layer-stack` — itself a pinned morph target still at its
collapsed span in the SAME rAF (`inline-size: var(--dock-morph-size)`), so forcing
`max-content` on the OUTER cannot grow the inner; the outer shrink-wraps to the inner's
collapsed span.

**The fix is a measure-ORDERING change** (`dockMorphContext.ts` `onSwap` rAF window):
before measuring the outer `max-content`, force every nested registered target whose
container is a DOM descendant of this outer (`nestedTargetsWithin` / `forceNestedMaxContent`)
to its OWN-axis `max-content` for the single synchronous read, then RESTORE its exact
prior inline state. So the outer shrink-wraps around the inner's TRUE intrinsic content.
**The spring is byte-untouched — `DOCK_SPRING {response:0.32, dampingFraction:0.7}`
(`constants.ts`) is the value.js letter's explicit fence; this is measurement ordering,
NOT a clock/spring re-tune.**

The four-cycle reproduction (U-DOCK.md §5 recipe 2 — drive the GlassDock exposed
`expand()` via the `__vueParentComponent` walk, on `/dock/layers` `dock-nested-collapsible`):

| cycle | from | to (BORN-RED, fix OFF) | to (GREEN, fix ON) | dead-hold | un-animated snap |
|---|---|---|---|---|---|
| 0 | 40px | **43px** (the collapsed clip ≈ `to:0` per the letter) | **242.06px** | none | none |
| 1 | 40px | 43px | 242.06px | none | none |
| 2 | 40px | 43px | 242.06px | none | none |
| 3 | 40px | 43px | 242.06px | none | none |

Born-RED→GREEN proven by neutralizing the carve (`nested = []`) and re-running: the to
collapses to 43px (the inner's pinned-collapsed span — the bug), and the fix restores
242.06px (the content-intrinsic expanded span). The spec acceptance names `to:≈261`; the
exact span is content-dependent (this dock's nested-group content intrinsics resolve to
242.06px, not 261.1px — the letter's number was measured on a 3.13.0 registry consumer
with different content). The BINDING criterion is met: a NON-ZERO real expanded span every
cycle, never the collapsed `~43px ≈ to:0`, with zero dead-hold and zero un-animated snap.
The three landed dock gates (`proof:dock-unify`, `proof:dock-plate-clearance`,
`proof:rail3`) + the non-nested lockstep arms stay GREEN (the fix is a no-op for the
no-nested-descendant case — `nestedTargetsWithin` returns empty).

## 6d — the §7 perf re-run over the in-situ morph window (4× CPU throttle)

The AZ §7 / W-BLOB-GLASS §2 protocol: 4× CPU-throttle over the V↔H morph window, both
directions, the SHIPPED VT crossfade vs the perf-gated liquid-teardrop. **The captured
numbers (this run — Chrome-headless-new, SwiftShader):**

| register | direction | frames | p50 (ms) | max (ms) | frames >16.7ms | clears (p50≤12 & 0% over) |
|---|---|---|---|---|---|---|
| VT crossfade (SHIPPED) | v2h | 91 | 9.7 | 13.0 | 0 | YES |
| VT crossfade (SHIPPED) | h2v | 88 | 9.9 | 26.6 | 2 (2.3%) | no (the warmup spike) |
| teardrop (PREVIEW) | v2h | 95 | 9.6 | 13.3 | 0 | YES |
| teardrop (PREVIEW) | h2v | 96 | 9.6 | 12.5 | 0 | YES |

Traces: `ground/W-DOCK-MORPH-INSITU-gperf-{vt,teardrop}-{v2h,h2v}.json`.

**THE SHIP DECISION (the §7 mechanical fall — the NUMBER decides, no triumvirate):** the
shipped default STAYS the **View-Transitions crossfade**, the teardrop STAYS the
perf-gated preview (preview defaults OFF). The honest reason this run is NOT the
authoritative number: it ran on **headless SwiftShader (software raster), NOT the real
GPU/Metal dev-box** the AZ protocol binds (the AY W-LIVE1 split). SwiftShader's frame
pacing does not reflect the teardrop's real per-frame `feGaussianBlur` GPU repaint cost —
the very cost that made the SAME bridge MISS on the Metal dev-box at AZ (p50 13.7–15.1ms,
2–3 frames over per run). A headless software-raster "clears" is encouraging but cannot
overturn the AZ Metal-dev-box measurement that the bridge misses; claiming the teardrop
ships on the strength of a SwiftShader number would be exactly the cardinal-lesson
inflation. So this wave inherits the AZ §7 / W-BLOB-STUDIO CONDITIONS-UNMET close path:
**the VT crossfade is the budget-clearing in-situ floor; the always-on in-situ teardrop
fidelity stays BOOKED to a successor** with the trace recorded (the AZ DC-REC-4 teardrop
book extended in-situ). The shell morph still ships — bidirectional + deterministic on the
VT crossfade. The gate's M4 clause carries the arm-c marker; M4 is GREEN because the
decision RIDES the recorded number (not a vibe), which is exactly the discipline the clause
encodes.

## 7 — the `proof:ba-gestalt` dock-surface verdict (BA inv-4 — the GESTALT BAR)

Whole-page captures, both modes, over the real shell backdrop:

- **Stage CLOSED — the shell gestalt** (`dock-morph-insitu/shell-gestalt-light.png`): the
  SidebarDock (ℱ home + category nav + the morph control + gear) and the BottomDock (story
  nav + the morph control) read as ONE coherent shell over the warm aurora-paper backdrop
  with the foundations hero. The new morph affordance seats in the EXISTING trailing
  utility group (the nav-pattern seam W-DOCK-SECTIONS re-seats) — it reads as part of the
  dock, not bolted on.
- **Stage OPEN — light** (`insitu-light-vt-vertical.png` / `-teardrop-mid.png` /
  `-vt-horizontal.png`): the focused glass panel reads as luminous transmissive material
  over the dim-but-visible live shell (BA-DSM-3 — the real backdrop reads through). The
  morph control + the `mode · t` readout + the teardrop toggle compose a clear
  demonstration surface; the teardrop midpoint reads as one amorphous goo silhouette
  (the reflow occluded).
- **Stage OPEN — dark** (`insitu-dark-vt.png`): the dark register reads as luminous
  transmissive glass (the dark-material register holds — no inverted/charcoal collapse),
  the morph stage legible over the dark shell.

**VERDICT: operative-PASS.** The shell-dock band — with the in-situ morph control + the
in-situ layering switch — reads as a designed gestalt in both modes: the morph affordance
is seated in the nav-pattern, the demonstration stages over the real shell, the morph
itself is smooth + bidirectional + deterministic on the one scalar, and the layering switch
changes the dock context live. No jump-cut, no flat-plate (BA-DSM-3 closed for the
coverage at this wave's HEAD; the richer W-STAGE backdrop lands in Batch 6). Per-mechanism
π greens (6a-6d) + this gestalt verdict both hold — a clean close, not the
structurally-green/visually-jump-cut AZ failure class.

## Files changed (this wave)

- `src/components/custom/dock/composables/dockMorphContext.ts` — the BA-VJS-1
  nested-group measure-ordering carve (`nestedTargetsWithin` / `forceNestedMaxContent` in
  the `onSwap` rAF measure window; spring constants byte-untouched).
- `demo/layout/AppShell.vue` — the in-situ morph stage host (the `useDockOrientationMorph`
  driver bind = consumer #2, the stage markup + the VT-crossfade-default register + the
  perf-gated teardrop bridge + the `__shellDockMorph` capture seam + the overlay CSS).
- `demo/layout/SidebarDock.vue` + `demo/layout/BottomDock.vue` — the trailing morph
  control (the `ArrowLeftRight` `<DockIconButton>` dispatching the one
  `glass-ui-demo:toggle-dock-morph` event).
- `scripts/proof-dock-morph-insitu.mjs` (the M1-M5 device-free gate) + `package.json` +
  `scripts/gates.mjs` (registration) + `tests-visual/dock-morph-insitu.spec.ts` (the
  binding π).
