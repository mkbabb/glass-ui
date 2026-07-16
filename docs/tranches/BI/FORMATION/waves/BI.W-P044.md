# BI.W-P044 — Put procedural color in one semantic home

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S16
**Terminal owner:** glass-ui

## Authority

The procedural color pipeline is implemented. This wave corrects ownership and import
direction; it does not commission a shader generator, a CSS/Canvas conformance matrix,
or a new color library.

## Live state

- CPU color conversion and gamut handling use the shared color/value.js leaves.
- Aurora and Blob already have substantive analytic color-equivalence tests.
- Aurora, Blob, FourierField, and LiquidGrid share the same GLSL color chunk.
- The matching WGSL chunk now shares neutral procedural ownership; unrelated scenes no
  longer import through Aurora.
- The GLSL twin shares that neutral home rather than a WebGL-specific directory.

## Shipped product work

Relocated, without changing shader bytes or color behavior:

- `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` to
  `src/composables/glass/procedural/color.glsl.ts`
- `src/components/aurora/constants/shaders/procedural-color.wgsl.ts` to
  `src/composables/glass/procedural/color.wgsl.ts`

Repointed the live imports and concise durable documentation in:

- Aurora
- Blob
- FourierField
- LiquidGrid
- existing focused color-equivalence tests where paths are named

## Protected behavior

- Preserve all exported constants, shader source text, palette meaning, alpha handling,
  output encoding, and current scene visuals.
- Do not replace the explicit GLSL/WGSL twins with code generation.
- Do not change Blob's gamma/linear boundary or Aurora's painterly composition while
  moving files.
- Do not add painted-readback baselines, screenshot hashes, mutation gates, or a parity
  registry.

## Acceptance

- No procedural scene imports shared color code from an Aurora-owned path.
- GLSL and WGSL color twins have one neutral procedural home.
- Existing analytic color tests remain green.
- Source and test typechecks resolve every relocated import. This behavior-preserving
  ownership move requires no browser pass and adds no Playwright surface.

## Dependencies

Runs after the narrow lifecycle finish in P043 and before scene truth/prune work in
P046, P049, and P050.
