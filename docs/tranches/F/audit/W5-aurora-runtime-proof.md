# F.W5 Aurora Runtime Proof

Generated: 2026-05-02
Status: pass

## Scope Closed

F.W5 hardened Aurora as a single WebGL2 shader/runtime facility:

- live runtime contexts now default to `preserveDrawingBuffer: false`;
- capture and thumbnail runtimes opt into preservation through explicit runtime options;
- `renderAt()` is draw-only and no longer mutates `startTime`, cursor easing/decay, RAF scheduling, or running state;
- dead `uDpr` and `mediumSmooth` shader/runtime surface was removed;
- `uBrokenColor` now drives deterministic oil-stroke and crayon pigment jitter;
- oil `bestOil()` consumes the flow vector passed by its caller, so crosshatch and alternate layer flow are live;
- `AuroraConfigDock.vue` was reduced from 595 lines to a 106-line shell with focused colocated layer components/composables;
- `/aurora` runtime smoke now asserts a live WebGL2 canvas with live-mode drawing-buffer preservation disabled;
- `profile:aurora` records live medium timing and shared thumbnail capture timing.

## Runtime And Shader Contract

`createAurora(canvas, config, options?)` now accepts `AuroraRuntimeOptions`:

- live default: `preserveDrawingBuffer: false`;
- capture mode: `{ mode: "capture" }` resolves to `preserveDrawingBuffer: true` and starts without a RAF loop;
- explicit `preserveDrawingBuffer` overrides the mode default.

This follows the WebGL context-attribute contract: drawing-buffer attributes are fixed when the context is created, and preserved buffers are only needed for stable capture/readback after the compositor step.

`renderAt(timeSec)` now uploads current cursor uniforms, uploads `uTime`, clears, and draws once. The RAF loop is only advanced by `tick()`.

## Studio Split

The configurator is now:

- `AuroraConfigDock.vue` shell: 106 lines;
- `config/MediumLayer.vue`;
- `config/PaletteLayer.vue`;
- `config/FlowLayer.vue`;
- `config/TextureLayer.vue`;
- `config/CompositionLayer.vue`;
- `config/NucleiLayer.vue`;
- `config/options.ts`;
- `config/usePaletteStops.ts`.

The split preserved the BouncyTabs + DockLayerGroup shell, active layer contract, reset wiring, palette reorder behavior, and nuclei mutation behavior.

## Generated Evidence

- `node --check scripts/profile-aurora.mjs && node --check scripts/proof-runtime.mjs`: pass
- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 259 tests
- `npm run iter-build`: pass
- `npm run build`: pass, declaration generation completed with the existing API Extractor TypeScript-version warning
- `npm run verify-export-types`: pass after declaration build
- `npm run profile:aurora`: pass, artifact `W5-aurora-profile.json`
- `GLASS_UI_RUNTIME_ARTIFACT=docs/tranches/F/audit/W5-runtime-smoke.json GLASS_UI_RUNTIME_SCREENSHOT_DIR=docs/tranches/F/audit/screenshots/W5/runtime GLASS_UI_RUNTIME_SCREENSHOT_ROUTES="/aurora" npm run proof:runtime`: pass, 71 routes
- `GLASS_UI_BUNDLE_ARTIFACT=docs/tranches/F/audit/W5-bundle-profile.json npm run profile:bundle`: pass
- `git diff --check`: pass

## Profile Measurements

`profile:aurora` covered 16 live cases and 22 thumbnail cases:

- live cases: smooth `OPENAI_SKY`, pastel `DELIBERATIVE`, watercolor `OPENAI_MEADOW`, oil `OIL_GESTURAL`;
- DPR cases: 1 and 2;
- live preservation cases: false and true;
- thumbnail cases: all 11 authored presets at DPR 1 and DPR 2 through one shared capture context.

Summary:

- live failures: 0;
- thumbnail failures: 0;
- page errors: 0;
- `/aurora` route assertion: WebGL2 context live, `preserveDrawingBuffer: false`, context not lost.

Notable timings:

| Case | DPR | Preserve | Median frame | P95 frame | Over-budget frames |
|---|---:|---|---:|---:|---:|
| smooth | 2 | false | 7.8 ms | 9.2 ms | 0 |
| pastel | 2 | false | 7.7 ms | 8.8 ms | 0 |
| watercolor | 2 | false | 8.3 ms | 9.2 ms | 0 |
| oil gestural | 2 | false | 25.5 ms | 33.6 ms | 87 |

The oil DPR 2 result is the measured heavy path. It is not hidden as a failure because F.W5's gate is correctness and benchmarking, not a hard frame-budget floor. It is now concrete evidence for future quality/performance tradeoffs if W6 opens a follow-on.

Thumbnail capture:

| DPR | Cases | Median capture | P95 capture | Shared context | Preserve |
|---:|---:|---:|---:|---|---|
| 1 | 11 | 3.1 ms | 4.6 ms | yes | true |
| 2 | 11 | 11.3 ms | 17.2 ms | yes | true |

Bundle:

- W4 `aurora.js`: 46748 bytes / 15190 gzip;
- W5 `aurora.js`: 47958 bytes / 15590 gzip;
- delta: +1210 bytes / +400 gzip.

## Residuals

No W5 correctness residual remains. The only named observation is performance: oil gestural at DPR 2 is expensive. That is measured evidence for W6 residual classification, not an unproved W5 blocker.

## Source Notes

- MDN `HTMLCanvasElement.getContext()` documents WebGL context attributes including `preserveDrawingBuffer`.
- The WebGL 1.0 specification states drawing-buffer context attributes are fixed at context creation and describes preserved versus default-cleared drawing-buffer behavior.
