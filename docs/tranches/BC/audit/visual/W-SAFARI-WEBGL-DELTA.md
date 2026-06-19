# W-SAFARI-WEBGL — the cross-engine WebKit/Safari capture DELTA

**Status:** SOURCE landed (proof:safari-webgl GREEN, born-RED→GREEN proven). The PAINTED truth is the ORCHESTRATOR's live capture on a real Safari 26+ Mac (and/or the Playwright `webkit` project) — the cardinal split: the source gate is self-validated here; the no-flash/viz-paint/morph-stability are the orchestrator's binding capture on a real engine.

## What landed (source, self-validated)

- **The context-loss circuit-breaker** (`src/composables/glass/webgl/createCanvasLifecycle.ts`, the ONE shared leaf — W-CANVAS-UNIFY single-source): the debounced re-arm (`setTimeout(RESTORE_DEBOUNCE_MS=100)` coalescing a burst into one rebuild per settle) + the N-in-T breaker (`N_RESTORE_STORM=3` losses in `T_RESTORE_STORM_MS=2000` → hold the parked state WITHOUT throwing). A single GPU-TDR loss STILL self-heals (kept); the breaker resets once the loss window passes quiet. All three backends (WebGL2 + Canvas2D + the WebGPU `device.lost` self-heal) inherit it through the leaf's `bindContextEvents` seam — no per-backend fork.
- **The WebKit playwright project** (`tests-visual/playwright.config.ts`): the FIRST cross-engine matrix — `devices["Desktop Safari"]`, `testMatch` scoped to the cross-engine subset (`safari-webgl.spec.ts` + `aurora-swraster.spec.ts`).
- **The breaker unit tests** (`tests/composables/glass/webgl/useWebGLCanvas.test.ts`): S2 storm-holds-without-throwing, S3 single-loss-still-heals, S3b breaker-resets-after-quiet, debounce-coalesces-a-burst — all GREEN (the runtime truth proof:safari-webgl runs as a subprocess).
- **The SVG-lens degrade VERIFIED (not touched):** the `@supports (backdrop-filter: url(#…))` gate in `src/styles/glass-refract.css` is the only home of the `backdrop-filter: url()` lens — proof:safari-webgl S5 confirms zero un-gated lens writes. The lens is the ONE Chromium-only progressive enhancement (WebKit bug 245510, OPEN); the blur+saturate+tint material is cross-engine.

## PENDING ORCHESTRATOR CAPTURE — the binding paint (real Safari 26+ / the `webkit` project)

Run the WebKit project against the live `:5199` demo (the binary is cached: `webkit-2287`):

```
npx playwright test --config tests-visual/playwright.config.ts --project=webkit safari-webgl.spec.ts
```

OR drive a real Safari 26+ Mac (and an iPhone on iOS 26) via the dev-tools MCP and capture a frame-series (gif_creator).

### The EXACT routes + canvas selectors + what the eye should see

| route | canvas selector | what the eye reads |
|---|---|---|
| `/substrates/aurora` | `.aurora-canvas` | the warm nuclei-field aurora PAINTS + STAYS painted — no white-strobe, no blink-to-black loop |
| `/substrates/blob` | `[data-testid="goo-blob-canvas"]` | the metaball blob paints + holds |
| `/substrates/constellation` | `.constellation-canvas` | the proximity-graph lattice paints + holds |
| `/substrates/dot-flow-field` | `[data-testid="dot-flow-field-canvas"]` | the streamline dot-flow paints + holds |
| `/substrates/concentric` | `[data-testid="concentric-canvas"]` | the radial ring-interference field paints + holds |
| `/dock/morph-showcase` | `.glass-dock` | toggle V↔H — the liquid dock morph FLOWS continuously, a solid glass plate at every frame, NEVER a white box, NEVER a strobe |
| `/display/buttons` | `.glass-floating, .glass-resting, .glass-card` | the glass cards/button read as warm TRANSLUCENT glass (blur+saturate+tint material); the SVG-lens refraction is invisibly absent (the one Chromium-only enhancement), NOT a broken un-styled box |

### The binding gestalt criteria (a human reads, both modes)

1. **NO FLASH/STROBE** — the screen does not rapidly white-strobe or blink-to-black in a loop (the §H headline killed).
2. **THE VIZ PAINT AND STAY PAINTED** — no canvas blinking to black and back.
3. **THE DOCK MORPH FLOWS CONTINUOUSLY** — no white box, no strobe across the V↔H morph.
4. **THE GLASS READS AS WARM TRANSLUCENT GLASS** — the material present, the lens absence invisible.
5. **THE CONSOLE IS SILENT** — no `WebGL: context lost` storm, no `no GPU adapter` churn spam (a single GPU-TDR heal is fine; a storm is not).

### Record at close

- the frame-series capture (both modes), per route
- the per-route live-GL-context count (≤ the one-GL-per-route budget — the storm's upstream cause prevented)
- the console-log scan over the ~2s window (bounded loss count)
