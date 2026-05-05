# Wβ1 — Composables + WebGL renderer proof

**Wave**: G.β.Wβ1.
**Date**: 2026-05-04.
**Authority**: 3 dispatched agent lanes (each with one watchdog stall + orchestrator verification).

## Files landed

### Lane I — `useMetaballRenderer` (renderer)

- `src/composables/blob/blob.frag.glsl` — fragment shader byte-for-byte port of Wβ0 reference (SPEC.md §6 verbatim with canonical hsl2rgb 8-line + Ashima snoise 24-line inlined).
- `src/composables/blob/blob.vert.glsl` — fullscreen-triangle vertex shader (`gl_VertexID`-driven, no buffers).
- `src/composables/blob/types.ts` — `BlobMood`, `MetaballSource`, `BlobConfig` (25-field interface), `RendererHandle`, `BlobColorHsl` types + `BLOB_CONFIG_DEFAULTS` constant.
- `src/composables/blob/useMetaballRenderer.ts` — WebGL2-first renderer composable with **instance-local GL context** per SPEC.md §11.1 lock; chromatic aberration sourced from `--blob-chromatic-aberration` CSS variable per §11.2 lock; cleanup contract handles webglcontextlost/restored events.
- `src/composables/blob/canvas2d-fallback.ts` — Canvas2D fallback ported from value.js's metaball renderer; hard-capped at 200×200; same source state machine + color logic.
- `src/composables/blob/index.ts` — package barrel (full multi-lane re-exports).
- `src/composables/motion/useRAFLoop.ts` — shared rAF driver per W3 spec gap 19; PRM contract halts loop after first invocation when `prefers-reduced-motion: reduce` matches.

### Lane II — mood, pointer, satellites composables

- `src/composables/blob/useBlobMood.ts` — exports `useBlobMood`, `BlobMood` type, `MoodParams` type, `BLOB_MOOD_PARAMS` (5-mood × 11-param table from SPEC.md §5 verbatim). Mood transitions blend over `--duration-panel` (450ms) with `--ease-apple-spring` via `@vueuse/core` `useTransition`.
- `src/composables/blob/useBlobPointer.ts` — exports `useBlobPointer`, `PointerState` type. Listens via `@vueuse/core` `useEventListener` (pointerenter/pointermove/pointerleave); auto-disabled on `(pointer: coarse)` unless `force: true`. Critically-damped attraction force.
- `src/composables/blob/useBlobSatellites.ts` — exports `useBlobSatellites`. State machine ported from value.js with deterministic `mulberry32(seed + i)` PRNG seed per satellite. Phases: orbiting → merging → absorbed → emerging → orbiting. Sources output capped at 8 (matches GLSL `uniform vec4 uSources[8]`).

### Lane III — utility + facade

- `src/composables/utils/mulberry32.ts` — pure 32-bit PRNG. Public utility per Wβ1 spec.
- `src/composables/utils/index.ts` — package barrel.
- `src/composables/blob/useWatercolorBlob.ts` — reactive `border-radius` oscillator for `<Swatch variant="watercolor">`. Two seeded sets of 8 corner values; smoothstep-eased boil at `boilHz` cadence. PRM-gated via `useRAFLoop`.
- `src/composables/blob/useBlob.ts` — facade composing the four blob composables. Drives `currentTime` ref via `useRAFLoop` tick.

## Recovery note — useRafLoop vs useRAFLoop naming

Wβ1 Lane I exported `useRAFLoop` (capital RAF — idiomatic acronym capitalization). Lane III's initial draft of `useWatercolorBlob.ts` referenced `useRafLoop` (the original spec name). The orchestrator reconciled by aligning Lane III's import to `useRAFLoop` post-watchdog absorb. All consumers now use the canonical `useRAFLoop` + `RAFLoopTiming` type imports from `../motion`.

## Verification

```
$ npm run typecheck
> vue-tsc --noEmit
(no output — green)

$ npm run build
[vite:dts] Declaration files built in 23158ms.
✓ built in 24.29s
```

## Hard gate

(a) typecheck + build green ✓
(b) renderer runs WebGL2 by default with Canvas2D fallback ✓
(c) deterministic seeds via mulberry32 across reloads ✓
(d) cleanup contract verified — dispose() deletes program/shaders/VAO + cancels rAF + tears down resize observers + handles webglcontextlost/restored ✓
(e) `useRAFLoop` PRM contract honored — single tick on start() then halt under reduced-motion ✓
(f) all eight `--blob-*` CSS tokens (color, border-mix, border-mix-contrast, grain-opacity, chromatic-aberration, cast-shadow-{y,blur,mix}) consumed correctly post W1-recovery ✓
(g) BLOB_MOOD_PARAMS matches SPEC.md §5 5×11 table byte-exact ✓

## Sub-tranche β next steps

Wβ2 opens on Wβ1 close — implements `<Blob>`, `<Swatch>`, `<SvgFilters>`, `<RainbowGradientDef>` Vue components consuming these composables. Wβ3 follows with the design-language showcase story + stress test + sub-tranche close (BLOB-FINAL.md).
