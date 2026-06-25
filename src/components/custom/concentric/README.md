# Concentric

A living **level-set hypsometric survey** — the iso-contours of a low-octave, curl-warped
height field H(p,t), painted as an OPAQUE warm hypsometric FILL, lifted into 2.5-D relief by
one analytic hillshade, and inked with a two-tier index/minor contour hierarchy. A traveling
wave flows the contours as it crosses (they bend / merge / split), the ω=√(g·k) swell breathes
the basins, and the cursor HEAVES the topography with velocity-scaled weight. The default is
the warm-DIVERGENT library identity (a deep plum-rose basin through ember and amber to a wheat
crest); the demo themes the survey through a preset.

`@mkbabb/glass-ui/concentric` · subpath leaf · WebGPU-first.

## Quick start

```ts
import { Concentric, DEFAULT_CONCENTRIC_CONFIG } from "@mkbabb/glass-ui/concentric";
```

```vue
<Concentric :config="myConfig" v-model:paused="paused" />
```

The DEFAULT palette is the warm-DIVERGENT library identity, resolved per-mode by plain arms
(the dark twin glows on a deep-ember ground). The demo themes the survey through a PRESET
(presets-in-consumers — see `demo/stories/substrates/presets.ts`); it NEVER enters a library
token.

## The math — the shared level-set field

Concentric is paper-grid kin: it reads the SAME shared `waveField` leaf (`waveFlow` /
`cellTwist` / `waveSwell` / `heightField`) + the shared `curlFBM` basis — a single noise
source, so a tune lands once and the two viz move together. The single math source is
`composables/levelField.ts` `sampleHeight` (pure + testable; the WGSL fragment shader + the
GLSL fallback transcribe it line-for-line).

```
H(p,t) = heightField( waveFlow(p, t) )  +  swellAmp · waveSwell(t)  +  cursorHeave(p)
```

- **The contours are the LEVEL-SETS of H** — extracted by the IQ gradient-free `contourInk`
  (`band = |fract(fN + 0.5) − 0.5|`, `aaW = fwidth(fN)`): perfect GPU AA, the contour density
  auto-tracking `1/|∇H|` (bunched on steep ground, exactly as a topographic map reads).
- **The fill is an OPAQUE hypsometric tint** — `tone = 0.5 + 0.5·tanh(H·toneGain)` maps the
  height through a warm-divergent 4-stop OKLab ramp, so basins and ridges hit the ramp ENDS.
- **One analytic hillshade** — a single ∇H finite-diff (at a shared epsilon) dotted with a
  fixed cel light lifts the fill into 2.5-D relief.
- **A two-tier index/minor hierarchy** — `isIndex` is a pure `f(level)` (every Nth contour is
  a bold index line); the per-level half-width `hw` is FED to the byte-frozen `contourInk`.

## Substrate (WebGPU-first with a WebGL2 fallback)

Concentric renders through ONE of two backends, picked ONCE at mount by `useConcentric`
(`navigator.gpu` feature-detect):

- **`shaders/concentric.wgsl.ts` — the WebGPU-FIRST primary.** A pure fullscreen fragment pass
  (the full-screen-triangle `vs_main`, no vertex buffer — the aurora shape-class): `fs_main`
  evaluates `sampleHeight` per pixel, composites the hypsometric fill + hillshade + two-tier
  ink, and returns an OPAQUE color. No compute pass, no particles.
- **`shaders/concentric.glsl.ts` — the WebGL2 GLSL fallback** (the ~5-10% tail, and the path
  Safari runs). The clean twin — the SAME field + the SAME finishing layer, splicing the shared
  `procedural-color.glsl.ts` OKLCh chunk so the color math can NEVER drift between backends.
  Because concentric is a pure fragment field (no compute), the parity is **`verified`** (only
  the rasterizer sub-pixel drift the OKLab-ΔE bar accommodates).

Both backends compose the SAME `createGpuSubstrate` leaf (offscreen-pause + live-PRM-freeze +
demand-loop), so the lifecycle wiring (`DockBackgroundToggle` pause/resume, pointer `wake`) is
substrate-agnostic. Machine-locked by `proof:concentric` (the level-set field source + the
opaque finishing layer + the warm-divergent identity + the JS↔WGSL↔GLSL numeric parity + the
painted-pixel π readback) + the shared `proof:teal-navy-purge` census.

## API

### `<Concentric>` props

| prop | type | default | note |
|---|---|---|---|
| `config` | `ConcentricConfig` | `DEFAULT_CONCENTRIC_CONFIG` | the full author schema |
| `paused` | `boolean` | `false` | `v-model:paused` — the WCAG-2.2.2 pause seam |

### `ConcentricConfig`

The level-set + finishing-layer schema: `speed`, `contourLevels`, `cellSize`, `heightOctaves`,
`heightSeed`, the wave + swell + cursor terms, the finishing tunables (`toneGain`, `shadeAmp`,
`lightDir`, `indexEvery`, `indexMul`, `inkDarken`, `velocityHeave`), `palette`, `background`,
`interactive`, `respectReducedMotion`.

### `useConcentric(canvasRef, options)`

The public composable — composes the `createGpuSubstrate` picker (WebGPU primary OR the WebGL2
GLSL fallback), wires offscreen-pause + the shared `usePointerVelocityField` (the cursor heave,
no own rAF), and returns the uniform `ConcentricHandle` (`pause` / `resume` / `wake` /
`renderAt` / `reducedMotion` / `dispose`).
