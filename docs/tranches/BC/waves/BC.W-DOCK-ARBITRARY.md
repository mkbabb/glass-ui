# BC.W-DOCK-ARBITRARY — the dock animates into arbitrary sizes + shapes (the compositor clip-path/scale morph register)

- **Band:** 2 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** After `BC.W-DOCK-ENGINE` (the one-clock buttery curve). Before `BC.W-LIQUID-MORPH` (which hardens THIS register against degenerate measurement — never white). This wave establishes the arbitrary-shape morph mechanism; `BC.W-LIQUID-MORPH` makes it bulletproof.
- **Owns / closes:**
  - USER-DEFECTS §A "ALL dock animations are broken + not smooth … Must be buttery smooth + liquid glass." (the arbitrary-shape expressiveness arm — the dock is "absolute expressiveness")
  - USER-DEFECTS §D "iOS-27 liquid animation primitives: liquid fade-in for opening apps / the control centre … the tab pull-morph-squish … All animations liquid-glass: squishy, springy, quick." (the dock morphs into arbitrary control-center silhouettes)
  - ORCHESTRATION §1 Band 2 box: `BC.W-DOCK-ARBITRARY — dock animates into arbitrary sizes/shapes`.

## Goal (the gestalt)
The dock is no longer locked to "a rectangle that grows wider/taller." It morphs into ARBITRARY silhouettes — a circle (the collapsed perfect-circle pill), a rounded pill, a tall rail, a wide bar, a teardrop mid-merge — and FLOWS between any two of them as one continuous liquid-glass surface. A consumer can target any settled shape (a footprint + a corner profile) and the dock LERPS to it on the one buttery clock, the glass plate reading solid + content-complete at every frame. This is the iOS-27 control-center / Now-Playing materialization: the surface is liquid, its shape is a parameter, and the morph between shapes is compositor-smooth. The dock becomes the expressive exemplar of the liquid-glass primitives — `useLiquidFlex` (the volume-preserving squish), the `--dock-morph-t` scalar, the `clip-path` silhouette — composed into a shape-morph register, not a hardcoded width-grow.

## Starting state (measured, file:line)
The morph today is a TWO-AXIS SIZE morph only — it grows/shrinks `inline-size`/`block-size` via a reserved-footprint `scale()`, and the SHAPE (the corner radius) is a discrete class endpoint, not a morphed parameter:

- `src/styles/dock/layers.css:60-92` — the box morph is `transform: scaleX/scaleY(var(--dock-morph-scale))` over a reserved `inline-size`/`block-size: var(--dock-morph-to)` footprint. This morphs SIZE on one axis at a time (horizontal → `scaleX`, vertical → `scaleY`). It cannot express an arbitrary silhouette — only a rectangle scaling on its morph axis.
- `src/styles/dock/morph.css:135-181` — the chrome radius arm interpolates `border-radius` between collapsed/expanded endpoints on `--dock-expand-t` (a 1-D radius lerp), but only between two FIXED endpoints (the collapsed circle ↔ the expanded pill); a consumer cannot target an arbitrary corner profile.
- The collapsed pill is meant to be a PERFECT CIRCLE (CLAUDE.md "the collapsed-floor tokens — a PERFECT CIRCLE", `--dock-collapsed-summary-min-size` + `aspect-ratio: 1`) — so the dock ALREADY morphs circle↔pill, but the path is two hardcoded endpoints + a class flip, not an arbitrary-shape parameter.
- The V↔H teardrop bridge (`src/styles/dock/morph-bridge.css:85-113`) IS an arbitrary-shape attempt (a tall capsule → teardrop → wide capsule), but it animates `width`/`height` PER FRAME (layout jank — `BC.W-LIQUID-MORPH` re-expresses it compositor-only). It is also default-OFF (the perf-gated preview).
- `useLiquidFlex` (the volume-preserving X/Y reciprocal squish, `src/composables/motion/useLiquidFlex.ts`) is the shape-deformation primitive (the `--stretch` writer; the tab indicator + `useDockOrientationMorph` consume it). It already expresses a squish-shape on a scalar — the building block for an arbitrary-shape morph.
- The SOTA model (apple-ios27.md §1.1 mechanism 5 "Materialization": "objects materialize in and out by gradually modulating the light bending and lensing" — the open animation drives the REFRACTION + the SHAPE, not just opacity; §3.1 "The glass doesn't just fade; it physically morphs from one shape to another, maintaining the translucent material throughout").

## Target spec (grounded)
Generalize the morph from a two-axis SIZE scale into a SHAPE morph: a settled-footprint reserve (kept) + a compositor `transform` (kept) + a `clip-path` silhouette lerp (NEW) + the `useLiquidFlex` squish (composed), all on the ONE `--dock-morph-t` scalar. Arbitrary shape = an interpolated `clip-path` + corner profile, NEVER per-frame layout.

### 1. The shape parameter — a `clip-path` silhouette on the scalar (apple-ios27.md §3.1 "morphs from one shape to another")
- The dock surface gains a `clip-path` driven by `--dock-morph-t`: the silhouette LERPS between a `from`-shape and a `to`-shape (each a `clip-path` value — an `inset()` with a corner radius, or a `path()`/`shape()` for a teardrop). At `t=0` it is the `from`-silhouette (the collapsed circle), at `t=1` the `to`-silhouette (the expanded pill / the wide bar). `clip-path` is a compositor-friendly property (no layout) — the silhouette morphs without a single reflow.
- The corner profile is the cheap common case: `border-radius` interpolated on `--dock-morph-t` between the `from`-radius (a circle: `50%` / `9999px`) and the `to`-radius (the pill: `--radius-pill` capped to half-height). This already half-exists (`morph.css:135-181`); generalize it to read a `--dock-shape-from`/`--dock-shape-to` token pair (a consumer-targetable radius) instead of two hardcoded class endpoints.
- The arbitrary teardrop/blob silhouette (the V↔H merge, the control-center materialization) uses the `clip-path` lerp + the SVG-goo merge (`BC.W-LIQUID-MORPH` re-expresses the bridge compositor-only) — so the arbitrary-shape register and the V↔H morph share ONE mechanism (the `clip-path` + scale + goo, not a second engine).

### 2. The footprint parameter — an arbitrary settled box (the reserve, kept + generalized)
- The settled footprint is the reserved `inline-size`/`block-size: var(--dock-morph-to)` (kept from `layers.css`). Generalize `--dock-morph-to` to be a CONSUMER-targetable settled size (a consumer sets `--dock-morph-to` on the dock to morph to any arbitrary footprint), with the `BC.W-LIQUID-MORPH` floor (`max(..., --dock-morph-min)`) so it never reserves zero.
- The morph composites `transform: scale()` over the reserved footprint (the CDP-Layout-flat floor) — KEPT. An arbitrary footprint is reached by the reserve + the scale, never a per-frame size lerp.

### 3. The squish — `useLiquidFlex` composed for the shape deformation (the liquid feel)
- The shape morph couples a `useLiquidFlex` volume-preserving squish on the `--stretch` channel (the SAME primitive the tab indicator + `useDockOrientationMorph` use) so the glass plate DEFORMS like liquid as it changes shape — a fast morph swells, capped LOW (the `--dock-morph-max-stretch` cap, ~1.08, mirroring the tab cap). This is the "squishy/springy" feel the user wants, on the one clock.
- `useDockOrientationMorph` (`@mkbabb/glass-ui/dock`, the V↔H driver, consumer #1 of `useLiquidFlex`) is the reference — this wave generalizes its shape-morph to an arbitrary-target register (the orientation flip is ONE arbitrary-shape case).

### The numbers (the bake table)
| axis | HEAD | TARGET | source |
|---|---|---|---|
| shape | discrete class endpoint (circle ↔ pill) | `clip-path` + `border-radius` lerp on `--dock-morph-t` (`--dock-shape-from/to` tokens) | morph.css:135-181 generalized |
| footprint | `--dock-morph-to` (size morph) | consumer-targetable arbitrary footprint + `BC.W-LIQUID-MORPH` floor | layers.css:72 |
| squish | tab/`useDockOrientationMorph` only | composed on the dock shape morph (`--stretch`, cap ~1.08) | useLiquidFlex.ts |
| morph clock | `--dock-morph-t` (DOCK_SPRING) | KEEP (the BC.W-DOCK-ENGINE buttery scalar) | constants.ts:69 |
| layout per frame | per-frame `width` (teardrop bridge) | ZERO — `clip-path`/`scale`/`transform` only | apple-ios27.md §3.1 |

## Mechanism / files
- **Edit `src/styles/dock/morph.css:135-181`** — generalize the radius arm to read `--dock-shape-from`/`--dock-shape-to` (consumer-targetable corner profiles) interpolated on `--dock-expand-t`/`--dock-morph-t`, replacing the two hardcoded class endpoints (clean break — the collapsed-circle/expanded-pill defaults become the token DEFAULTS, not hardcoded literals).
- **Add the `clip-path` silhouette lerp** in `src/styles/dock/morph.css` (or a new `src/styles/dock/shape.css` partial `@import`-ed by `dock.css`) — a `clip-path` driven by `--dock-morph-t` between `--dock-shape-clip-from`/`--dock-shape-clip-to` (a compositor property, no layout). Default-OFF (the rectangle/pill case needs no clip; the arbitrary teardrop opts in).
- **Mint the shape tokens** in `src/styles/dock/density.css`: `--dock-shape-from`/`--dock-shape-to` (radius), `--dock-shape-clip-from`/`--dock-shape-clip-to` (clip-path), `--dock-morph-max-stretch` (the squish cap), all density-scaled / `--dock-scale`-threaded.
- **Edit `src/components/custom/dock/composables/useDockOrientationMorph.ts`** (and/or a shared shape-morph helper) — compose `useLiquidFlex` for the shape-morph squish (the V↔H driver is the reference; generalize to write `--stretch` on the dock shape morph). READ-ONLY on `DOCK_SPRING`.
- **The ONE clock:** `--dock-morph-t` (the `DOCK_SPRING` `SpringProgress`, buttery via `BC.W-DOCK-ENGINE`). The shape, the footprint, the squish, the clip-path all read it. The ONE squish source is `useLiquidFlex` (no forked deformation math).
- **READ-ONLY:** `DOCK_SPRING`, the GL shaders, the reserved-footprint reserve geometry (`layers.css` — `BC.W-LIQUID-MORPH` owns the floor).

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a recorded frame-series (gif_creator) of the dock morphing through ≥3 distinct silhouettes (circle → pill → wide bar, and the V↔H teardrop), a real GPU host, BOTH modes. A human reads: the dock FLOWS between arbitrary shapes as one continuous liquid-glass surface, the corners + silhouette morphing smoothly, the plate deforming with a liquid squish, never a discrete shape-snap or a layout jump. The capture lands at `docs/tranches/BC/audit/visual/W-DOCK-ARBITRARY-DELTA.md` (Live-verify = captured delta via the dev-tools MCP, never a commit claim).
2. **Machine gate `proof:dock-arbitrary`** (born-RED on HEAD → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`):
   - **A1 — the shape is a scalar parameter.** `morph.css`/`shape.css` interpolates `border-radius` (and the opt-in `clip-path`) on `--dock-morph-t`/`--dock-expand-t` reading `--dock-shape-from/to` tokens, NOT two hardcoded class endpoints. Born-RED on HEAD's discrete endpoint radius. Self-test bite: a planted hardcoded `border-radius: 50%` collapsed endpoint (no token) reds.
   - **A2 — the footprint is consumer-targetable + floored.** `--dock-morph-to` is the settled footprint, floored by `--dock-morph-min` (the `BC.W-LIQUID-MORPH` floor); a consumer override on the dock scope reaches the morph. Self-test bite: a bare unfloored reserve reds (shared with `BC.W-LIQUID-MORPH` M1).
   - **A3 — compositor-only.** The shape morph animates only `clip-path`/`border-radius`/`transform`/`scale`/`--*` (compositor/paint set); NO `width`/`height`/`padding` morph leg (`proof:no-layout-animation` extended-in-place). Born-RED on the per-frame-`width` teardrop. Self-test bite: a planted `width: calc(... --dock-morph-t ...)` reds.
   - **A4 — ONE squish source.** The shape-morph squish reads `useLiquidFlex`'s `--stretch` (the volume-preserving primitive); no forked deformation math. Self-test bite: a hand-rolled `scale: var(--my-squish)` (not from `useLiquidFlex`) reds.
   - **A5 — the V↔H morph shares the mechanism.** The teardrop/V↔H morph reads the SAME `clip-path`/scale/`--dock-morph-t` register (not a second engine). Asserted against `useDockOrientationMorph` composing `useLiquidFlex` + the shared shape tokens.
   - **+ a self-test bite per clause.**
3. **π readback `tests-visual/dock-arbitrary.spec.ts`** (both modes + WebKit, LOCAL real-GPU render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - The **shape-lerp frame-series**: drive the dock through circle→pill→bar; the resolved `border-radius`/`clip-path` interpolates SMOOTHLY (no discrete snap), the painted silhouette matches the lerp at sampled `t` values — born-RED on HEAD's discrete endpoint.
   - The **CDP Layout-track trace**: FLAT across every shape morph (the `clip-path`/scale path triggers zero per-frame layout) — born-RED on the per-frame-`width` teardrop.
   - The **squish readback**: the `--stretch` value swells on a fast morph (capped at `--dock-morph-max-stretch` ~1.08), zeroes under PRM, both modes.
   - Safari/WebKit: `clip-path` + `border-radius` + `scale` are cross-engine (no `backdrop-filter: url()` on the shape path) — the arbitrary-shape morph MUST paint on WebKit.

## Fences / invariants (must NOT regress)
- **`DOCK_SPRING {0.32, 0.7}` byte-fenced** (the value.js letter): the shape morph reads the existing scalar; no spring-physics change.
- **The reserved-footprint-`scale()` mechanism is KEPT** (the CDP-Layout-flat floor): the arbitrary footprint is reached by the reserve + scale, NEVER a per-frame size lerp. `BC.W-LIQUID-MORPH` owns the reserve floor.
- **ONE squish source** (MEMORY: ≥2-consumer-or-exported; no fork): `useLiquidFlex` is the volume-preserving deformation primitive; the dock shape morph COMPOSES it (no forked `--stretch` writer).
- **The topology limit is RESPECTED** (AX.W42 fold-7): an arbitrary shape with a mismatched topology (V↔H) occludes the reflow in the goo-merge at the midpoint (`BC.W-LIQUID-MORPH`); this wave does NOT attempt a continuous clip-path morph THROUGH a topology change.
- **Clean break, no alias** (MEMORY: no backwards compat): the hardcoded circle/pill endpoints become token DEFAULTS; no `--dock-radius-legacy`. The collapsed-perfect-circle (CLAUDE.md `aspect-ratio: 1`) is preserved as the `--dock-shape-from` default.
- **Default-OFF for the arbitrary register** (MEMORY: presets-in-consumers): the rectangle/pill morph (the common case) needs no `clip-path`; the arbitrary teardrop/blob silhouette is opt-in (a consumer sets the clip tokens). The library default IS the circle↔pill identity.
- **Byte-fenced (not touched):** the GL shaders, the `--glass-level`/`--glass-tint-*`/blur recipes, the `overflow: clip` aperture, `useLayerTransition`'s FLIP logic.

## Folds (deferrals discharged)
- **`az-morph-teardrop-booked`** (research/deferral/az.md — the V↔H teardrop fidelity booked; BOOKED → REBUILD, shared with `BC.W-LIQUID-MORPH`). **DECIDED — BUILD:** the arbitrary-shape register (the `clip-path` + scale + `useLiquidFlex` morph) is the mechanism the teardrop rides; `BC.W-LIQUID-MORPH` re-measures the perf + decides the ship. The arbitrary-shape capability the user wants ("absolute expressiveness") is BUILT here. Recorded DECIDED-built (the ship-decision rides `BC.W-LIQUID-MORPH`'s re-measured number).
- The user's "iOS-27 liquid animation primitives … the dock morphs into arbitrary control-center silhouettes" (USER-DEFECTS §D) is the apple-ios27.md §3.1 "physically morphs from one shape to another" model — closed here on the compositor. DECIDED, no re-book.
