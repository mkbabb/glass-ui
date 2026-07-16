# Aurora

Aurora is a full-bleed procedural color field with smooth, watercolor, pastel,
oil, crayon, Van Gogh, oil-pastel, and Kuwahara registers. It prefers WebGPU and
uses its supported WebGL2 implementation when WebGPU acquisition cannot start.
A CSS palette ground remains available as an explicit static product mode.

```vue
<script setup lang="ts">
import {
    Aurora,
    DEFAULT_AURORA_CONFIG,
    deriveAurora,
} from "@mkbabb/glass-ui/aurora";

const config = {
    ...DEFAULT_AURORA_CONFIG,
    palette: deriveAurora("#4f46e5", {
        harmony: "analogous",
        stopCount: 5,
    }),
};
</script>

<template>
    <Aurora :config="config" />
</template>
```

## Runtime contract

`Aurora.vue` resolves the public animated/static product mode. The animated
runtime composes `createGpuSubstrate`; both GPU engines share the same
configuration, pointer field, palette semantics, timing, resize policy,
reduced-motion state, suspension reasons, and `RendererStatus` channel.

The shared lifecycle owns:

- backing-store sizing and DPR policy;
- tab, offscreen, content-visibility, manual, and reduced-motion parking;
- one demand-driven frame schedule;
- engine recovery and disposal.

Aurora therefore does not expose a setter for reduced motion. The live
`prefers-reduced-motion` query is the sole authority. Under reduce, the field
paints a stable frame and interaction motion remains suppressed. Long-running
background consumers should also expose the public `pause()` / `resume()` seam.

Initialization is deferred by default so device/context setup and shader work do
not occupy first paint. Capture consumers use `armAsync()` before `renderAt()`;
the promise covers WebGPU device acquisition and resolves immediately for the
WebGL2 path. Setup and pipeline failures are reported rather than disguised as a
different successful renderer.

## Public surface

```ts
import {
    Aurora,
    createAurora,
    useAurora,
    resolveAtoms,
    deriveAurora,
    resolveRenderMode,
    DEFAULT_AURORA_CONFIG,
} from "@mkbabb/glass-ui/aurora";

import type {
    AuroraConfig,
    AuroraInstance,
    AuroraRuntimeOptions,
} from "@mkbabb/glass-ui/aurora";
```

The imperative instance is intentionally small:

```ts
interface AuroraInstance {
    arm(): void;
    armAsync(): Promise<void>;
    update(config: AuroraConfig): void;
    setCursor(x: number, y: number, strength?: number): void;
    clearCursor(): void;
    setCursorRadius(radius: number): void;
    renderAt(timeSeconds: number): void;
    pause(): void;
    resume(): void;
    dispose(): void;
}
```

`resolveAtoms()` is the concise authoring door for ordinary consumers. Direct
`AuroraConfig` remains available to preset and studio authors. Presets belong in
consumers; the library owns the neutral warm identity and the renderer.

## Color and media

CPU palette derivation uses the shared color composables. GPU color conversion,
OKLab/OKLCh interpolation, sRGB transfer, and shared noise constants live in the
neutral procedural shader leaves:

- `src/composables/glass/procedural/color.glsl.ts`
- `src/composables/glass/procedural/color.wgsl.ts`

The explicit GLSL and WGSL translations stay separate because each shader
language has a different type and binding model. The semantic source, numeric
constants, palette meaning, and output encoding remain shared.

Painterly media are selected by configuration, not separate components. The
WebGL2 path carries the complete established media catalogue; the WebGPU path
uses the supported Aurora shader contract. Engine identity is available through
`RendererStatus`, so a consumer never needs to infer it from the route or mode
name.

## Accessibility and performance

- Respect the static CSS mode chosen by `resolveRenderMode()`.
- Wire `pause()` / `resume()` for continuously moving backgrounds.
- Do not add a second media-query listener around Aurora.
- Keep pointer input on the shared velocity field; it is already parked with the
  renderer.
- Use `renderAt()` only for deterministic draw requests, not as a second frame
  loop.

See [DESIGN.md](./DESIGN.md) for the durable architecture and invariants.
