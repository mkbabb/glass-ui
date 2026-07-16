# LiquidGrid

LiquidGrid is a warm, transparent engineering grid carried by a coherent liquid
warp. WebGPU and WebGL2 translate one `LiquidGridConfig` through the shared GPU
substrate; neither engine owns separate product semantics.

```vue
<script setup lang="ts">
import {
    LiquidGrid,
    DEFAULT_LIQUID_GRID_CONFIG,
} from "@mkbabb/glass-ui/liquid-grid";

const config = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
    fieldAlpha: 0.18,
};
</script>

<template>
    <LiquidGrid v-model:paused="paused" :config="config" />
</template>
```

## Component contract

- `config?: LiquidGridConfig` selects the complete grid, warp, color, face, and
  interaction state.
- `paused?: boolean` parks the shared renderer through the manual suspension
  reason.
- `update:paused` is the declarative pause seam.
- `rendererStatus` reports initialization, actual engine, adapter/context, and
  attributed errors.

The exposed imperative methods are `pause`, `resume`, `wake`, and `renderAt`.

## Shipped defaults

| Field | Default |
|---|---:|
| `cellSize` | `64` |
| `majorEvery` | `5` |
| `minorAlpha` | `0.12` |
| `majorAlpha` | `0.22` |
| `lineWidth` | `1` |
| `twistMax` | `0.62` |
| `fieldAlpha` | `1` |
| `bulgeStrength` | `0.9` |
| `bulgeRadius` | `2.5` |
| `faceAlpha` | `0` |
| `background` | `"transparent"` |
| `interactive` | `true` |
| `respectReducedMotion` | `true` |

The optional face is real public behavior but is off by default. Raising
`faceAlpha` reveals the height-lit warm cell interior; leaving it at zero keeps
the line-only identity.

## Rendering and math

Both engines evaluate the same cell hierarchy, traveling crest, pointer bulge,
warm color ramp, and optional face model. The GLSL and WGSL setup modules remain
small engine translators. The package does not claim pixel identity between
different browser/driver stacks.

Pure helpers including `potentialFBM`, `curlFBM`, `gridCoverage`,
`sampleLiquidGrid`, and `gridScaleFor` are exported for deterministic analytic
use. They do not create a canvas or own application state.

The shared lifecycle owns DPR sizing, visibility and reduced-motion parking,
pause/resume, scheduling, and disposal. Under reduced motion LiquidGrid paints a
stable frame rather than hiding the grid.

```ts
import {
    LiquidGrid,
    DEFAULT_LIQUID_GRID_CONFIG,
    sampleLiquidGrid,
} from "@mkbabb/glass-ui/liquid-grid";
```
