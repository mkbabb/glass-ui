# W-VIZ-CONSTELLATION — the lattice WebGPU instanced-render migration DELTA

**Wave:** BC.W-VIZ-CONSTELLATION · **Status:** SOURCE GREEN (`proof:viz-constellation` C1-C5 born-RED→GREEN); the binding live Metal-GPU paint rides the orchestrator capture (this wave captures its OWN paint — `BC.W-GESTALT-FIRST`).

## Before → After (the headline)

| | HEAD (before) | BC.W-VIZ-CONSTELLATION (after) |
|---|---|---|
| renderer | Canvas2D (`useCanvas2D`; four `ctx`-bound draw passes — `ctx.arc()` discs at a clamped DPR) | WebGPU instanced-points + instanced-lines primary over `createGpuSubstrate`, the WebGL2 instanced-arrays twin fallback (GPU, NOT Canvas2D) — **no canvas-2D-context anywhere** |
| circle quality | the **supremely LOW-RES** soft jaggy blob (a `r≈2px` disc rasterized at ~1× then CSS-upscaled to ~4-6px) | a crisp pin-prick disc with a clean ~1px AA rim at ANY DPR — the `fwidth`-smoothstep SDF circle sized in REAL backing-store units (`· uDpr`) |
| edges | `ctx.stroke()` hairlines + a separate `drawPointerWeb` pass | instanced segment quads + cross-line `smoothstep` AA; the pointer-web folds onto the SAME line pass (the cursor's "virtual node" edges) |
| interaction | position-only pointer lean | velocity-aware lean (a fast sweep drags a stronger momentum-biased lean) + acceleration→flick burst + pointer-parallax depth (the shared `usePointerVelocityField`, FED `tick()` from the substrate frame — no second rAF) |
| color | the Canvas2D `light-dark()`-rejecting plain-hsl token read | the SAME warm-cream `--constellation-*` token read (`readPalette`), JS-side, written to the uniform buffer — NO teal/navy |

## The eye should see (the gestalt criterion — orchestrator live capture)

Route `/substrates/constellation`, canvas selector `.constellation .constellation-canvas` (the `<canvas>` inside the `<Constellation>` mount), BOTH modes, at 2×/3× DPR:

1. **CRISP pin-prick dots** — each node is a sharp disc with a clean ~1px anti-aliased rim at Retina DPR, NOT the soft jaggy upscaled blob of HEAD. A zoomed crop reads "sharp hi-res dots." (The binding before/after: OLD Canvas2D `arc` low-res vs NEW WebGPU SDF.)
2. **WARM-CREAM identity** — the dots + hairlines read warm amber/cream (`#b4afa3`/`#cdc8bd` nodes, warm-ink lines) in BOTH modes — NOT teal/navy/blue. The dark constellation reads STARS not a void.
3. **Living network** — the lattice drifts + re-triangulates inside the bounded rounded host; faint hairlines flicker between near neighbours and re-knit as the field drifts.
4. **Pointer attraction (velocity-aware)** — sweeping the cursor leans the nearby nodes toward it, a touch more eagerly the faster you move; the cursor joins the web (the focus tethers); the lattice parallax-shifts a hair so the flat field reads as having depth.
5. **Gravity well** — holding the pointer (on the `gravityWell` instance) gathers the nodes; release cools them back (the heat-then-cool invariant).
6. **PRM** — under `prefers-reduced-motion: reduce` the lattice freezes mid-drift, crisp, held; the pointer interaction is inert (the `tick(0)` freeze).
7. **Backend** — the resolved backend is `webgpu` on the Metal GPU; the WebGL2 instanced twin is the genuinely-absent-tail fallback.

## Parity (device-free structural proxy)

Both backends draw the SAME instanced primitives (the billboard-quad SDF circle + the segment-quad hairline) over the SAME stepped field (`constellationField.ts` — the ONE JS math source: `seedField`/`stepField` + the interaction springs + the pure `buildEdges` CPU all-pairs scan) + the SAME JS-side palette read (`readPalette` → `parseColorRGBA` → the uniform buffer), numerically identical per-instance → ΔE mean/p99 = 0.0. The compute neighbor-bin is BOOKED at N ≫ 256 (overfit at the default count=64). The binding Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs the WebGL2 `readPixels`) rides this wave's close + re-records the empirical rasterizer-drift ΔE.

## Gate

`proof:viz-constellation` (born-RED on the pre-migration HEAD → GREEN): C1 WebGPU substrate, no Canvas2D (composes `createGpuSubstrate`, no `useCanvas2D`/`getContext("2d")`, the four draw passes deleted); C2 the crisp SDF circle (`length(uv) - 1.0` + `fwidth`-smoothstep + the DPR-aware `· uDpr` sizing, WGSL + GLSL twins); C3 instanced-points + instanced-lines, no `point-list`/`line-list`; C4 ONE math source + the typed-struct SoT (`buildEdges` pure, `uniformBridgeWGPU.ts` the layout SoT, the compute pass ABSENT/booked); C5 warm-cream identity, no teal/navy. + a self-test bite per clause.
