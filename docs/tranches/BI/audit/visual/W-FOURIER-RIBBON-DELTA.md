# W-FOURIER-RIBBON — the geometry-ribbon fourier render (DELTA)

Band B5 (substrates). The fullscreen per-pixel SDF (the O(pixels×segments) "god awful"
architecture — UF-E7 / FAM-5 / PERF-1 [P0]) RETIRED onto an INSTANCED GEOMETRY ribbon.

## What landed

- **Both fullscreen-SDF fs bodies retired wholesale** (no dual path):
  `fourier-field.glsl.ts` (the `for (int i=0; i<MAX_CURVE_SAMPLES)` fragment loop + the
  `uCurve[]`/`uChain[]` uniform tables) and `fourier-field.render.wgsl.ts` (`fs_main`'s
  identical fullscreen loop) are gone.
- **The instanced ribbon on BOTH backends over ONE shared geometry leaf**
  (`shaders/fourier-field.ribbon.ts` — `planRibbonLayers` + the unit quad):
  - GLSL: an instanced quad program (`aCorner`/`aSeg`/`aData`), the vertex expands each
    segment to its own capsule/AABB bbox, `drawArraysInstanced` per layer.
  - WGSL: an instanced/vertex-pulling pass (`@builtin(instance_index)` reads the endpoints
    straight from the compute-filled storage buffers), 5 pipelines specialized by the
    pipeline-overridable `LAYER` constant, `draw(6, instanceCount)` per layer.
  - The compute kernel (`fourier-field.compute.wgsl.ts`) is **byte-identical** — the
    `curveSamples`/`chainTips` `read_write` storage buffers are untouched.
- **Pixel-identical by over-composite associativity.** The fullscreen loop over-composited
  each segment separately with its own per-segment age; the ribbon blends each segment's
  premultiplied contribution `over` the framebuffer in the SAME draw order (cel → epicycle →
  trail → head). The under-glow+core / ring+arm+dot / head-aniso / cel bodies are transcribed
  verbatim; the `RIBBON_TAIL_FRAC` taper + `RIBBON_UNDERGLOW_*` under-glow mirror is preserved
  (proof:viz FB1 stays GREEN).
- **The FB5 epicycle-join seam fix.** The epicycle layer draws with per-channel MAX blend
  (`blendEquation(gl.MAX)` / `operation: "max"`) so adjacent-arm ring/dot overlaps UNION
  instead of over-compositing into the named 9× join seam.
- **FB4 — the dead per-frame restyle bridge removed.** The `--ff-head-xy`/`--ff-head-hue`
  `setProperty` restyle (fired every frame, drove a CSS phosphor-bloom sprite with ZERO live
  consumer — the (b) perf attribution) is retired; the comet head is painted by the GPU head
  quad. `computeFourierFit` is confirmed hoisted behind the spectrum-identity cache (the (c)
  co-fix), never called per frame.

## The build-time bug caught by live paint (the cardinal split earned)

The device-free gate greened while the WGSL primary painted NOTHING: `meta` is a **reserved
WGSL keyword**, so naming a `VSOut` field `@location(3) meta` failed the shader-module
compile → every render pipeline was invalid → the field fell to GL (which also produced no
visible frame on the shared debug guard). The composited screenshot (not `drawImage`, which is
unreliable for WebGPU canvases) surfaced the dead plate; the WGSL `getCompilationInfo()`
message named the reserved keyword. Renamed `meta → segData`; the ribbon paints on the WebGPU
primary (Chrome/Metal) with no validation errors.

## π (LOCAL real-GPU — rides W-REFLECT3)

`tests-visual/viz-fourier-ribbon.spec.ts` — the binding readback over the real demo
`/substrates/fourier-field`, BOTH modes (3/3 GREEN on headless Chrome + WebGPU/Metal):

- **(a) structured paint** — luminance spread p99.5−p0.5 ≈ **167** (light) / **169** (dark)
  (a blank/dead plate collapses to ~0): a bright comet head + specular over the darker body.
- **(b) chromatic ink, a minority** — the warm comet + epicycle rings paint chroma the
  near-neutral backdrop lacks (chromFrac ≈ **0.042**, > the 0.008 floor, < the 0.5 full-plate
  ceiling): a curve covering a small fraction of the canvas.
- **(c) PRM freezes** to one static frame (two frames apart < 2% differing pixels).

Captures: `fourier-ribbon-delta/ribbon_{light,dark}.png` (π) + `ribbon_live.png` (the hero —
the tapered comet, the under-glow, the two orbit rings + arm + joint dot, the warm head).

## Deferred (device-run obligation)

- **SAF-1 / dis:safari-metal-verify** — the WGSL/WebGPU-primary GPU-timestamp ABSOLUTE on real
  Safari 26 / Metal (Playwright cannot expose WebGPU timestamp queries; the SHAPE is
  source-resolved — both fs bodies ran the SAME fullscreen SDF, so this is a confirmation
  device-run proving the fragment-work collapse to O(covered_pixels), not a design question).
- **Whole-route sufficiency fence** (recorded): the ribbon fixes ONLY the fourier FILL; the
  live-studio ROUTE complaint ALSO needs W-AUTH-SHELL-BG's one-GL-per-route reduction (the
  leaked app-shell aurora is a co-equal term this wave does not touch).
