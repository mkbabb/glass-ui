# BC.W-LIQUID-MORPH — the arbitrary-shape dock morph that is NEVER white, NEVER invisible (the D5 root; the AY box-morph re-opened)

- **Band:** 2 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** After `BC.W-DOCK-ENGINE` (the one-clock buttery curve) + `BC.W-DOCK-ARBITRARY` (the arbitrary-shape clip-path/scale path this wave hardens against degeneracy). Before `BC.W-SAFARI-WEBGL` (the cross-engine WebGL-context arm references the morph stability this wave proves on Chromium). The expressive headline of the dock band — "the dock = absolute expressiveness."
- **Owns / closes:**
  - USER-DEFECTS §A "The liquid morph turns WHITE/invisible (carried from the prior message; the dock = absolute expressiveness)."
  - USER-DEFECTS §H "NONE of this works on Safari. None of the liquid morphing works on Safari at all — it rapidly FLASHES the screen." (the morph-stability half — the WebGL-context-loss half is `BC.W-SAFARI-WEBGL`)
  - DEFECT-LEDGER **D5** "the liquid morph turns white/invisible; on Safari it rapidly FLASHES … (a) the box-size V↔H morph goes white (BB.W-DOCK-MORPH-FAMILY); (b) Safari: WebGL: context lost + the morph re-render churn = the flash; the morph is not compositor-stable cross-engine."
  - ORCHESTRATION §1 Band 2 box: `BC.W-LIQUID-MORPH — arbitrary-shape morph, never-white, never-invisible`.

## Goal (the gestalt)
Toggle the dock from vertical to horizontal and back, or collapse↔expand it, on `/dock/overview` and `/dock/morph-showcase`: the glass plate FLOWS from one silhouette to the other — at every single frame it is a solid, continuous, content-bearing liquid-glass surface. It never blinks to a white/empty box, never disappears into a zero-width sliver, never shows a clipped void. The content reads complete behind the aperture from frame zero. The morph is the band's expressive exemplar — a real iOS-27 materialization where the light-bending and the shape modulate together — and it is robust to every degenerate measurement: a mis-measured `to:0`, a `from:0`, a nested-group mis-order, all bottom out at a visible floor, never a white flash. On a real GPU host the morph paints buttery; the Safari flash (the WebGL-context churn) is fenced to its own wave, but the morph TRANSFORM itself is compositor-stable cross-engine.

## Starting state (measured, file:line)
**The morph-WHITE root is a degenerate `scaleX(0)` / a zero-width reserved box (glass-dock-codebase.md §2.2, postmortem/bb.md:61-64).** Two distinct mechanisms produce the white box:

1. **`scaleX(0)` from a `to:0`/`from:0` measurement with NO scale floor.** `src/styles/dock/layers.css:60-71`:
   ```css
   --dock-morph-ratio: calc(var(--dock-morph-from, 0px) / max(var(--dock-morph-to, 1px), 1px));
   --dock-morph-scale: calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0));
   inline-size: var(--dock-morph-to);   /* line 72 */
   transform: scaleX(var(--dock-morph-scale));   /* line 73 */
   ```
   The `max(--dock-morph-to, 1px)` guard is a **divide-by-zero guard on the RATIO only** — it does NOT floor the `inline-size: var(--dock-morph-to)` reserve (line 72) NOR the resolved `--dock-morph-scale`. When the measured `--dock-morph-to` is **0** (the BA-VJS-1 nested-group bug — the outer `.dock-layers` measured the inner stack still pinned collapsed), the box reserves a **zero-width footprint** (`inline-size: 0`) AND `--dock-morph-scale` runs `scaleX(0)` at `t=0`. Combined with `overflow: clip` (`shell.css:178`) the content behind the zero-width aperture is fully clipped = a **white/empty box mid-morph** (postmortem/bb.md:63: "`inline-size: var(--dock-morph-to)` resolving to `0` … still reserves a zero-width box → the white/invisible morph the user reports"). Same path for `from:0` → ratio 0 → `scaleX(0)`.
2. **The `dockMorphContext.onSwap` nested-`max-content` measure-ordering fix exists but the user STILL reports white** (glass-dock-codebase.md §2.2 fix (1)). `dockMorphContext.ts:374-390` forces every nested registered descendant to `max-content` for the single outer measurement (`from:40 → to:≈242, never 0`), but the user's continued white-morph report means it may NOT fire on every live nested config (a collapsible vertical, a mid-morph re-grab, a race). The fix must be VERIFIED to fire live AND a defensive floor added so a missed measurement never paints white.

**The metaball-teardrop V↔H bridge animates `width`/`height` PER FRAME (the layout-jank preview, glass-dock-codebase.md §2.2 fix (3)).** `src/styles/dock/morph-bridge.css:85-113`:
```css
.dock-morph-bridge-plate--vertical {
    height: calc(var(--dock-bridge-v-h, 16rem) * (1 - clamp(0, var(--dock-morph-t, 0), 1)) + var(--dock-bridge-v-w, 3.25rem) * clamp(...));
}
.dock-morph-bridge-plate--horizontal {
    width: calc(var(--dock-bridge-h-h, 3.25rem) * (1 - clamp(...)) + var(--dock-bridge-h-w, 18rem) * clamp(...));
}
```
This animates `height`/`width` LITERALLY per frame (a layout-triggering reflow storm — the OPPOSITE of the `layers.css` compositor-bound morph). It is the perf-gated "Liquid teardrop (preview)" toggle (AZ.W-MORPH-SHOWCASE §7), NOT the default. The default ships the View-Transitions crossfade (the AX.W42 fold-7 topology-limit-occlusion — a mismatched-topology silhouette cannot continuously interpolate, so the reflow is hidden inside a VT crossfade at the occluded midpoint).

**The AZ booking (research/deferral/az.md `az-morph-teardrop-booked`, BOOKED → REBUILD):** "the metaball-teardrop bridge (arm-a, the higher-fidelity V↔H morph) MISSED the 4×-throttle budget (p50 13.7-15.1ms > 12ms / over the 16.7ms cap), so the View-Transitions crossfade (arm-c, p50 7.7-8.1ms) SHIPPED as default and the always-on metaball-teardrop fidelity is BOOKED to a successor … The box-size V↔H morph of W-DOCK-MORPH-FAMILY turns white/invisible per BC." The morph generalized to arbitrary shapes + the booked teardrop fidelity + the box-morph-turns-white defect ALL fold into this rebuild (re-opened per BC §5).

The `--stretch` squish leg (`morph-bridge.css:98,112` `scale: var(--stretch) calc(1/var(--stretch))`) is correct compositor squish — KEEP the volume-preserving pairing.

## Target spec (grounded)
The fix is THREE coordinated moves: a defensive scale floor (the white-box can never paint), a verified live measurement (the `to:0` race closed), and the arbitrary-shape morph expressed on the compositor (clip-path/scale, NEVER per-frame width — folding the teardrop fidelity onto the compositor path so the AZ perf-miss is moot).

### 1. The defensive scale floor — a degenerate measurement NEVER paints white (glass-dock-codebase.md §2.2 fix (2))
At the morph-box site (`layers.css:60-92`), floor BOTH the reserve AND the scale:
- **Reserve floor:** `inline-size: max(var(--dock-morph-to), var(--dock-morph-min, 2.75rem))` — a `to:0` measurement reserves the collapsed-pill minimum footprint (~44px, the WCAG touch floor / `--dock-control-floor`), never zero. The morph still composites correctly when `to` is real (the `max` is a no-op above the floor).
- **Scale floor:** `--dock-morph-scale: max(<the calc>, 0.06)` — `scaleX`/`scaleY` never runs below ~6% (a degenerate ratio bottoms at a thin-but-visible sliver, never the zero-width white void). At 6% the content is clipped to a sliver but the plate is VISIBLE glass, never white — and a real measurement is always well above 6%, so the floor is a safety net, not a visual change on the healthy path.
- Both numbers are SAFETY FLOORS — on every healthy measurement they are inert (the `max` resolves to the real value); they fire ONLY on the degenerate `to:0`/`from:0` race, converting the white flash into a visible glass sliver that the next correct measurement (one frame later) recovers from.

### 2. Verify + harden the live measurement (the `to:0` race closed at the source, glass-dock-codebase.md §2.2 fix (1))
- VERIFY `dockMorphContext.onSwap`'s nested-`max-content` ordering (dockMorphContext.ts:374-390) fires on EVERY live nested config — a collapsible vertical dock, a mid-morph re-grab, a `<DockLayerGroup>`-nested dock. The π readback (below) drives the four-cycle nested measurement and asserts `to ≥ a real span, never 0` every cycle.
- Add a guard: if `measureTo` returns 0 (a measurement failure), the morph SEATS at the floor (clause 1) rather than reserving zero — a missed measurement degrades to "visible at the floor," never "white." This is the defensive complement to the ordering fix (the ordering fix prevents the mis-measure; the floor catches any that slip through).

### 3. The arbitrary-shape morph on the compositor (NEVER per-frame width) — fold the teardrop fidelity onto the compositor path
The user wants an EXPRESSIVE arbitrary-shape morph ("absolute expressiveness"). The AZ verdict shipped the VT crossfade as default + booked the always-on teardrop because the per-frame-`width` bridge missed the perf budget. BC's rebuild RESOLVES the perf miss by expressing the teardrop morph on the COMPOSITOR (the `BC.W-DOCK-ARBITRARY` clip-path/scale path), so the always-on fidelity becomes budget-clearing:
- **The teardrop bridge re-expressed compositor-only.** Re-write `morph-bridge.css:85-113` to drive the plate silhouette via `clip-path` (an `inset()`/`path()` interpolated on `--dock-morph-t`) + `scale`/`translate`, NEVER `width`/`height`. The reflow storm (the perf-miss root) is gone — the silhouette morphs on the compositor like the `layers.css` box does. The squish `--stretch` pairing (volume-preserving) stays.
- **The CSS SVG-goo bridge (the gooey-merge between the two plates) stays the deterministic `feGaussianBlur` + `feColorMatrix` threshold path** (morph-bridge.css — the M5-deterministic choice; the goo aspect is a pure `f(--dock-morph-t)`, no clock — AZ.W-MORPH-SHOWCASE). It is a paint-prop filter, compositor-compatible.
- **The ship decision rides the RE-MEASURED perf number, not AZ's.** Re-run the gperf trace on the compositor-only teardrop (the DELTA records p50 under 4×-throttle). If the compositor path clears the 12ms budget (it should — no per-frame layout), the always-on teardrop SHIPS as the default arbitrary-shape morph (the AZ booking RESOLVED). If it still misses on the binding Metal dev-box, the VT crossfade stays the floor + the compositor-teardrop is the perf-gated preview (the conservative §7 fall, but now ON the compositor, not the layout-jank path). The decision is DATA, recorded in the DELTA.
- **The topology-limit is RESPECTED, not fought** (AX.W42 fold-7, glass-dock-codebase.md §2.2): the web platform cannot continuously interpolate a mismatched-topology silhouette (flex column→row + two-axis size). The morph hides the reflow inside the goo-merge/crossfade at the occluded midpoint — it does NOT attempt a continuous clip-path morph THROUGH the topology change; it morphs each plate on the compositor + merges them in the goo at the midpoint. This is the SOTA-honest move (respect the limit, occlude the reflow).

### The numbers (the bake table)
| axis | HEAD | TARGET | source |
|---|---|---|---|
| reserve floor | `inline-size: var(--dock-morph-to)` (can be 0) | `max(..., 2.75rem)` (~44px WCAG floor) | glass-dock-codebase.md §2.2 |
| scale floor | none (`scaleX(0)` possible) | `max(<calc>, 0.06)` | glass-dock-codebase.md §2.2 fix (2) |
| measure on `to:0` | reserves 0 → white | seats at floor → visible sliver | this wave |
| teardrop bridge | per-frame `width`/`height` (layout jank) | `clip-path` + `scale` (compositor) | glass-dock-codebase.md §2.2 fix (3) |
| ship decision | VT crossfade default, teardrop booked | RE-MEASURED on compositor path → data-driven | AZ.W-MORPH-SHOWCASE §7 re-run |
| morph clock | `--dock-morph-t` (DOCK_SPRING) | KEEP (the BC.W-DOCK-ENGINE buttery scalar) | constants.ts:69 |

## Mechanism / files
- **Edit `src/styles/dock/layers.css:60-92`** — add the reserve floor (`max(var(--dock-morph-to), var(--dock-morph-min, 2.75rem))`) on BOTH the horizontal `inline-size` and vertical `block-size` reserves, and the scale floor (`max(<calc>, 0.06)`) on `--dock-morph-scale`. The reserved-footprint-`scale()` mechanism (the CDP-Layout-flat floor) is otherwise byte-untouched.
- **Edit `src/components/custom/dock/composables/dockMorphContext.ts`** — add the `measureTo === 0` → seat-at-floor guard (the defensive complement to the existing nested-`max-content` ordering at :374-390; the ordering logic + `DOCK_SPRING` are byte-untouched).
- **Edit `src/styles/dock/morph-bridge.css:85-113`** — re-express the teardrop plate silhouette via `clip-path` (`inset()`/`path()` on `--dock-morph-t`) + `scale`/`translate`, NEVER `width`/`height`. Keep the `--stretch` volume-preserving squish + the SVG-goo `feGaussianBlur`/`feColorMatrix` merge (the deterministic M5 path).
- **Mint `--dock-morph-min`** in `src/styles/dock/density.css` (the reserve floor token, density-scaled, riding `--dock-scale`).
- **The ONE clock:** `--dock-morph-t` (the `DOCK_SPRING` `SpringProgress` from `dockMorphContext.ts`, made buttery by `BC.W-DOCK-ENGINE`). The bridge, the box, the squish all read it.
- **READ-ONLY:** `DOCK_SPRING`, the GL shaders, the `overflow: clip` aperture geometry.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a recorded frame-series (gif_creator) of the V↔H morph AND the collapse↔expand on `/dock/morph-showcase` + `/dock/overview`, a real GPU host, BOTH modes, INCLUDING a synthetic `to:0` worst-case (force the nested-group mis-measure). A human reads: at EVERY frame the plate is a solid continuous glass surface with complete content — NEVER white, NEVER a zero-width void, NEVER a clipped blank. The capture lands at `docs/tranches/BC/audit/visual/W-LIQUID-MORPH-DELTA.md` with the per-frame composited-pixel proof (meanLum > 0 + the glass plate present every frame) + the re-measured teardrop perf trace (the ship decision). (Live-verify = captured delta via the dev-tools MCP, never a commit claim.)
2. **Machine gate `proof:liquid-morph`** (born-RED on HEAD → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`):
   - **M1 — the reserve floor.** `layers.css` reserves `max(var(--dock-morph-to), var(--dock-morph-min, ...))` on both axes (born-RED on HEAD's bare `var(--dock-morph-to)`). Self-test bite: a planted bare `inline-size: var(--dock-morph-to)` reds.
   - **M2 — the scale floor.** `--dock-morph-scale` is `max(<calc>, 0.06)` (born-RED on HEAD's unfloored calc). Self-test bite: a planted `scaleX(var(--dock-morph-scale))` without the floor reds.
   - **M3 — the measure-failure guard.** `dockMorphContext.ts` carries the `measureTo === 0` → seat-at-floor branch (a code-presence assert + a unit test that a 0 measurement seats at the floor span, not 0). Self-test bite: a stubbed 0 measurement that reserves 0 reds the unit.
   - **M4 — the teardrop is compositor-only.** `morph-bridge.css` animates NO `width`/`height` on `--dock-morph-t` (the silhouette is `clip-path`/`scale`/`translate`); `proof:no-layout-animation` extended-in-place catches a per-frame `width`/`height` morph leg. Born-RED on HEAD's per-frame `width`/`height` calc. Self-test bite: a planted `width: calc(... var(--dock-morph-t) ...)` reds.
   - **M5 — the ship decision is data-grounded.** The DELTA records the re-measured compositor-teardrop perf number + the resulting default (always-on teardrop IF it clears, else VT-crossfade-floor + compositor-teardrop-preview). A gate clause asserts the DELTA exists + names the number (the AZ booking RESOLVED, not silently re-booked). Self-test bite: a missing perf number reds.
   - **+ a self-test bite per clause.**
3. **π readback `tests-visual/liquid-morph.spec.ts`** (both modes + WebKit, LOCAL real-GPU render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - The **per-frame composited-pixel assert**: across the morph (V↔H + collapse↔expand), every frame's plate region reads meanLum > 0 AND the glass silhouette is present (no white/empty box) — born-RED on HEAD's white-morph (capture the actual white frame on HEAD as the ground).
   - The **synthetic `to:0` worst-case**: force the nested-group mis-measure; the plate seats at the floor (visible glass sliver), NEVER white — born-RED on HEAD.
   - The **four-cycle nested measurement**: drive a `<DockLayerGroup>`-nested dock four cycles; `to ≥ a real span` every cycle (the BA-VJS-1 ordering holds), never 0.
   - The **CDP Layout-track trace**: FLAT across the morph (the compositor-teardrop triggers zero per-frame layout — born-RED on HEAD's per-frame-`width` teardrop).
   - Safari/WebKit: the morph TRANSFORM (scale/clip-path/translate) is cross-engine — it MUST paint a continuous glass plate on WebKit (the WebGL-context flash is `BC.W-SAFARI-WEBGL`'s scope; this asserts the morph transform itself is compositor-stable cross-engine, no white box on WebKit).

## Fences / invariants (must NOT regress)
- **`DOCK_SPRING {0.32, 0.7}` byte-fenced** (the value.js letter): this wave adds defensive floors + a compositor re-expression; it does NOT touch the spring physics or the `--dock-morph-t` clock.
- **The reserved-footprint-`scale()` mechanism is KEPT** (the CDP-Layout-flat floor, glass-dock-codebase.md §2.7): the floors are `max()` wrappers that are inert on healthy measurements; the morph mechanism is otherwise byte-untouched.
- **The topology limit is RESPECTED** (AX.W42 fold-7): no attempt at a continuous clip-path morph THROUGH the V↔H topology change; the reflow is occluded in the goo-merge/crossfade at the midpoint. This wave does NOT fight the platform limit.
- **The SVG-goo bridge stays deterministic** (M5 choice, AZ.W-MORPH-SHOWCASE): `feGaussianBlur`/`feColorMatrix` threshold, a pure `f(--dock-morph-t)`, NO clock (the goo-blob's free-running `uTime`/pointer channels would break frame-reproducibility — NEVER the goo-blob mount).
- **Clean break, no alias** (MEMORY: no backwards compat): the per-frame-`width` teardrop is DELETED + re-expressed compositor-only; no `--dock-bridge-legacy`.
- **Byte-fenced (not touched):** the GL shaders, the `--glass-level`/`--glass-tint-*`/blur recipes, the `overflow: clip` aperture geometry, `useLayerTransition`'s FLIP logic.
- **The white-box floor is a SAFETY NET, not a visual change** — on every healthy measurement the `max()` floors are inert; the gestalt of a healthy morph is unchanged (the floor fires only on the degenerate race).

## Folds (deferrals discharged)
- **`az-morph-teardrop-booked`** (research/deferral/az.md — "the metaball-teardrop bridge MISSED the 4×-throttle budget … the always-on metaball-teardrop fidelity is BOOKED to a successor … The box-size V↔H morph of W-DOCK-MORPH-FAMILY turns white/invisible per BC"; BOOKED → REBUILD). **DECIDED — BUILD/REBUILD:** the morph generalized to arbitrary shapes (the compositor clip-path/scale teardrop), the white-morph defect closed (the reserve + scale floors + the measure guard), and the booked teardrop fidelity RESOLVED on the compositor path (the perf miss was the per-frame-`width` reflow, which this rebuild eliminates — the ship decision rides the re-measured number). The chronic box-morph is re-opened + closed here.
- **`az-dock-orchestrator-single-successor`** (research/deferral/az.md — the dock live-paint probe demoted to a loud skip; SUCCESSOR → MET). **DECIDED — MET:** the `tests-visual/liquid-morph.spec.ts` per-frame composited-pixel assert re-hosts the dock live-paint probe on the real-GPU `/dock/morph-showcase` route (the headline rebuild provides the route). Recorded DECIDED-met-by-harness.
- The morph-white root (DEFECT-LEDGER D5(a)) is owned + closed here; the Safari WebGL-context flash (D5(b)/D7/H) is fenced to `BC.W-SAFARI-WEBGL` (the morph TRANSFORM cross-engine stability is asserted here; the WebGL-context lifecycle is a separate band). DECIDED, the morph-stability half closed.
