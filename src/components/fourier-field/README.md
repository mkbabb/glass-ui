# FourierField

FourierField renders a seeded epicycle chain and luminous reconstruction ribbon.
Its pure coefficient math is CPU-owned; WebGPU performs the primary compute and
render work, with a supported WebGL2 implementation through the shared GPU
substrate.

```vue
<script setup lang="ts">
import { FourierField } from "@mkbabb/glass-ui/fourier-field";
</script>

<template>
    <FourierField :config="fieldConfig" :get-palette="getPalette" />
</template>
```

## Component props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `config` | `FourierFieldConfig` | `DEFAULT_FOURIER_CONFIG` | Complete renderer configuration. |
| `spectrum` | `readonly BasisComponent[]` | generated | Explicit CPU-minted phasor spectrum. |
| `getPalette` | `() => OklchStop[]` | — | Live palette provider for studio consumers. |

The `variant`/`clock` props and the retired ambient-seam knobs
(`color`/`colorResolver`/`seed`/`freeze`/`intensity` — 0-setter dead config, REDUCTION W1)
are not part of the public surface. Author visual bundles through `FourierFieldConfig`; its
`speed`, `harmonics`, `showEpicycles`, `intensity`, and related fields own runtime behavior.

## Math surface

The package exports `comp`, `positionsAt`, `partialSumAt`, `dftFromPoints`,
`makeEllipticSpectrum`, `makeHarmonicFigure`, and the curated
`FOURIER_FIGURES` catalogue. The same pure functions create the spectrum that
both engines consume.

`partialSumAt(components, t, maxTerms?)` returns the endpoint of the truncated
phasor sum. `positionsAt` returns the complete tip-to-tail chain. Neither
function depends on a renderer or browser context.

## Rendering and lifecycle

WebGPU uploads the phasor table, computes curve samples, and renders the ribbon.
WebGL2 uses the equivalent scene configuration and CPU-owned spectrum. Both
compose `createGpuSubstrate`, so resize, DPR, visibility parking, reduced motion,
pause, disposal, and actual-engine status have one owner.

Pointer motion feeds the shared velocity field. Reduced motion produces a stable
deterministic frame; it does not replace the renderer with a hidden alternate
surface. Renderer initialization and setup failures are emitted through the
component's `rendererStatus` event.

```ts
import {
    FourierField,
    DEFAULT_FOURIER_CONFIG,
    makeEllipticSpectrum,
    partialSumAt,
} from "@mkbabb/glass-ui/fourier-field";
```
