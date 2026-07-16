# Procedural surfaces

glass-ui has six retained procedural surfaces. They share lifecycle, color, and
motion facilities where those semantics are genuinely common; they do not share
a synthetic renderer or configuration schema.

| Surface | Public subpath | Renderer |
|---|---|---|
| Aurora | `/aurora` | WebGPU preferred, supported WebGL2 path, explicit CSS-static mode |
| Blob | `/blob` | WebGPU preferred, supported WebGL2 path |
| LiquidGrid | `/liquid-grid` | WebGPU preferred, supported WebGL2 path |
| FourierField | `/fourier-field` | WebGPU compute/render, supported WebGL2 path |
| Constellation | `/constellation` | Canvas2D |
| WatercolorDot | `/watercolor-dot` | CSS/SVG only |

## Shared ownership

`createCanvasLifecycle` owns backing-store sizing, DPR policy, tab and content
visibility, optional intersection parking, reduced motion, scheduling, wake, and
disposal. `createGpuSubstrate` composes that lifecycle for WebGPU and WebGL2.
`useCanvas2D` is the proportionate adapter for Constellation. WatercolorDot needs
no drawing context and remains outside the canvas substrate.

Every surface keeps one semantic configuration at its component boundary.
Engine setup modules translate that state into bindings; they do not own
separate presets, timing, interaction, or product defaults. Actual engine
identity and attributed initialization failure travel through `RendererStatus`.

The library defaults are neutral and warm. Named themes and elaborate presets
belong in consuming demos and products.

## Color

CPU conversion and gamut handling use the shared color composables. The explicit
shader-language twins live at:

- `src/composables/glass/procedural/color.glsl.ts`
- `src/composables/glass/procedural/color.wgsl.ts`

They carry the same transfer functions, OKLab/OKLCh constants, palette meaning,
and shared noise constants. They remain explicit because GLSL and WGSL have
different type, binding, and assembly syntax.

## Surface boundaries

### Aurora

Aurora owns the painterly full-field composition. Its WebGPU and WebGL2 paths
share config, palette, pointer field, lifecycle, and status. The CSS surface is
an explicit static mode, not an arbitrary error fallback.

### Blob

Blob owns the bounded metaball/SDF body, satellites, palette, and opt-in named
press surface. One clamped `morphT` value owns its flat-to-dressed surface axis.

### LiquidGrid

LiquidGrid owns the liquid grid hierarchy, traveling crest, pointer bulge, and
optional warm face. `faceAlpha` is public and defaults to `0`; the ordinary
identity remains the transparent line grid. The GLSL and WGSL modules are thin
translations of one `LiquidGridConfig`. The package makes no claim of exact
pixel equality across browser and driver stacks.

### FourierField

FourierField owns CPU-minted coefficients and pure Fourier helpers. The live
renderer is WebGPU compute/render with a supported WebGL2 implementation. The
retired Canvas2D, `variant`, and injected `clock` descriptions are not part of
the current API.

### Constellation

Constellation intentionally uses one deterministic CPU field and one Canvas2D
renderer. The consumer `drawOverlay` callback is the ordered final paint pass.
A GPU port would add complexity without improving its modest vector workload.

### WatercolorDot

WatercolorDot is a seeded CSS/SVG mark. It shares the house PRNG and motion loop
where useful but opens no Canvas2D, WebGL2, or WebGPU context.

## Review policy

Focused numeric tests belong beside real pure contracts. Renderer changes receive
one combined native in-app browser review after a major product batch. The suite
does not maintain screenshot hashes, cross-browser parity warehouses, generated
configuration schemas, or a second browser-driver workflow.
