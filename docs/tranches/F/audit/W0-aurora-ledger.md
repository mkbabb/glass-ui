# F.W0 Aurora Ledger

Aurora remains a single WebGL2 fragment-shader facility. W5 hardens the contract before any new media, renderer, or visual expansion.

## Config And Uniform Liveness

| Surface | Current finding | W5 action |
|---|---|---|
| `brokenColor` | public config/UI/presets/runtime upload exists, but shader only declares the uniform | wire into oil per-stroke hue/value jitter or delete; W0 recommends wiring because presets already set it |
| `uDpr` | declared and uploaded but unused | delete unless W5 proves a real shader role |
| `uRes` / aspect path | `uRes` feeds aspect; local `p` path is unused/no-op | simplify aspect path or route intentionally |
| `hueShift()` | helper is defined but unused | consume for `brokenColor` or delete |
| `mediumSmooth()` | helper is defined but unused | delete if no live path needs it |
| `strokeLayers` / `bestOil` | alternate flow input is passed but ignored/recomputed inside `bestOil` | consume the provided flow so crosshatch/stroke variation is real |

## Runtime Findings

| Surface | Current behavior | W5 action |
|---|---|---|
| `createAurora()` | always uses `preserveDrawingBuffer: true` | add runtime options so live canvases default false and capture/thumbnails opt true |
| `renderAt()` | mutates `startTime`, calls `tick()`, schedules/cancels RAF, and advances cursor state | split deterministic draw from RAF loop and make capture side-effect safe |
| Thumbnail baking | uses one hidden canvas/shared context and `toDataURL` after `renderAt()` | preserve shared context behavior if profiling confirms it avoids context exhaustion; make capture options explicit |
| Cursor easing constants | named constants already exist | keep; include in runtime docs/proof |

## Studio Findings

| File | Current issue | W5 action |
|---|---|---|
| `demo/stories/aurora/AuroraConfigDock.vue` | 595-line editor with six conceptual layers | split into colocated layer editors under `demo/stories/aurora/config/` |
| `demo/stories/aurora/usePresetThumbnails.ts` | capture semantics depend on runtime defaults | opt into capture runtime explicitly |
| `demo/stories/aurora/AuroraStage.vue` | runtime/cursor proof should assert nonblank canvas | add route smoke selectors/proof |
| `src/components/custom/aurora/DESIGN.md` | stale route/path references from earlier composition location | update to actual `/aurora` and `demo/stories/aurora` paths |

## W5 Owned Files

- `src/components/custom/aurora/composables/runtime.ts`
- `src/components/custom/aurora/composables/useAurora.ts`
- `src/components/custom/aurora/composables/useCursorInteraction.ts`
- `src/components/custom/aurora/shaders/aurora.frag.ts`
- `src/components/custom/aurora/shaders/aurora.vert.ts` only if runtime proof shows need
- `src/components/custom/aurora/presets.ts`
- `src/components/custom/aurora/DESIGN.md`
- `demo/stories/aurora/AuroraConfigDock.vue`
- `demo/stories/aurora/config/**` new colocated editor files
- `demo/stories/aurora/usePresetThumbnails.ts`
- `demo/stories/aurora/AuroraStage.vue`
- `scripts/profile-aurora.mjs`

## Benchmark Matrix

W5 profile cases:

- smooth: `OPENAI_SKY`
- pastel: `DELIBERATIVE`
- watercolor: `OPENAI_MEADOW`
- oil crosshatch/gestural: `OIL_GESTURAL`
- thumbnail bake: all 11 authored presets

Each case records DPR 1 and DPR 2 where feasible, preserveDrawingBuffer on/off where applicable, capture time, frame timing, and nonblank pixel variance.
