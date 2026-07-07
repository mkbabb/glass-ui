# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring paint judge)

**Verdict: PASS (dual-engine — Chrome/Metal + Safari/WebKit, BOTH modes).**

Non-authoring paint judge of the first-principles streamline rebuild, re-judged at repo HEAD over
FRESHLY-BUILT bytes on `:5200` (`npm run demo:dist:build` → `dot-flow-field-Cf4wim84.js`, index
`index-Dy1CIhbG.js`; served via `vite preview` on `:5200`). Route `/substrates/dot-flow-field`, both
modes, both engines. **This build carries the S7 webkit-vertex fix (`a90aaf92`) + the SP1 shader-PI
compile fix (`eec371bc`)** — both verified present in the built chunk (the scalar-branch `vi == 1u`/
`vi == 2u` covering triangle + the `PI` declaration before the OKLCH splice).

This re-judge SUPERSEDES the prior FAIL (`c7c5d6fa`, "Safari dead-black = genuine render failure"):
with the fresh S7 bytes AND a better-instrumented WebKit probe (an in-engine standalone-WebGPU
readback + a WebGL2-fallback gestalt capture the prior judge did not run), the WebKit surface is
proven to paint the reference gestalt, and the WKWebView-snapshot black is localized to the
`takeSnapshotWithConfiguration`-cannot-flatten-a-WebGPU-layer **tooling limit** — the SAME finding the
sibling **BG.W-FOURIER-BEAUTY** judge (same tranche, same harness, same WebGPU-first viz) reached →
PASS.

| leg | engine (in-pixel badge) | GPU | channel | modes | reads as |
|---|---|---|---|---|---|
| **Chrome CDP** (real Chrome.app 149, connectOverCDP :9333) | `ENGINE CHROME` | `ANGLE Metal Renderer: Apple M5 Max` — real Metal | **WebGPU (WGSL)** | light+dark | **reference gestalt — dozens of beaded streamlines** |
| **WebKit engine** (Playwright WebKit — no WebGPU) | — | `Apple GPU` | **WebGL2 (GLSL twin, same shared math)** | light+dark | **reference gestalt — dozens of beaded streamlines** |
| **Safari WKWebView** (system WebKit.framework / Metal) | `ENGINE WEBKIT` | `Apple GPU` | **WebGPU (WGSL) — live in-engine** | light+dark | route composites; viz-canvas blank in snapshot (WebGPU-layer snapshot-API limit) |

---

## Chrome / Metal (WebGPU · WGSL) — PASS both modes (DIRECT pixel)

`<DotFlowField>` renders the reference gestalt: dozens (≫8) of traceable, evenly-spaced, smooth,
undulating, interweaving **warm-cream beaded streamlines** — curl-field level curves, each beaded
with brighter dots along its length — over a deep warm-near-black floor. Warm-cream identity (no
teal; the `ocean skin` demo preset toggle is OFF, as designed). The pointer bends the streamlines
locally + coherently (no vortex chaos, no discontinuity).

Chrome viz-canvas clip (`.rounded-card canvas`, 1033×460, real-Metal `page.screenshot` clip):

| capture | meanLum | p50 | p99 | max | stdev | colCoefVar | coloredPct | motion(800ms) | ptrBend | liveChannel | reads as |
|---------|---------|-----|-----|-----|-------|-----------|-----------|---------------|---------|-------------|----------|
| chrome-light | 19.31 | 10 | 133.2 | 219 | 30.0 | 0.046 | 1.17% | 16.94 | 16.61 | `webgpu` | **warm-cream beaded streamlines** |
| chrome-dark  | 19.03 | 10 | 133.2 | 219 | 29.4 | 0.038 | 1.17% | 16.93 | 16.46 | `webgpu` | **warm-cream beaded streamlines** |

**PRM (Chrome, `reducedMotion: reduce`):** two frames 1s apart → **motion 0** (one deterministic
static frame, no ambient drift) WHILE the field is fully painted (meanLum 19.39 / stdev 30.5 / max
219). Satisfies "PRM = one deterministic tick(0) static frame."

## WebKit engine (WebGL2 · GLSL twin) — PASS both modes (DIRECT pixel — the shared math on WebKit)

Playwright WebKit has NO WebGPU, so `useGpuSubstrate` falls to the byte-identical WebGL2 (GLSL)
channel — the criterion's explicitly-permitted "WebGL2 channel painting the SAME gestalt", AND the
exact channel a non-WebGPU WebKit user hits, AND snapshottable via `locator.screenshot()`. It renders
the SAME reference gestalt (dozens of evenly-spaced warm-cream beaded streamlines) on the WebKit
rasterizer (`Apple GPU`) in BOTH modes — proving the shared `sampleStreamField`/`deriveStreamUniforms`
math (`flow-field.glsl.ts`) is correct on WebKit.

WebKit viz-canvas (`locator.screenshot`, 1033×460, `wgpu:false`, `liveChannel:webgl2`, `Apple GPU`):

| capture | meanLum | p50 | p99 | max | stdev | colCoefVar | coloredPct | motion(800ms) | ptrBend | reads as |
|---------|---------|-----|-----|-----|-------|-----------|-----------|---------------|---------|----------|
| webkit-gl2-light | 17.97 | 6.3 | 206.4 | 224.0 | 37.8 | 0.085 | 1.31% | 19.49 | 19.44 | **warm-cream beaded streamlines** |
| webkit-gl2-dark  | 17.20 | 6.3 | 156.2 | 221.8 | 35.3 | 0.047 | 1.30% | 19.51 | 19.51 | **warm-cream beaded streamlines** |

## Safari WKWebView (system WebKit / Metal · WebGPU) — WebGPU LIVE in-engine; snapshot-blank = tooling limit

The system-WKWebView `takeSnapshotWithConfiguration` snapshot renders the viz canvas BLANK (a solid
black rectangle) in BOTH modes — but this is the WebGPU-canvas snapshot-API limit, NOT a render
failure, proven three ways:

1. **In-engine DIAG (`callAsyncJavaScript`, pageWorld) — IDENTICAL both modes:**
   ```json
   {"gpu":true,"vizCanvas":{"w":2066,"h":920},"vizGetWebgl2":"null(webgpu-or-2d-bound)",
    "nCanvas":2,"adapter":true,"device":true,
    "coveringNew_S7":     {"min":2,"max":253,"mean":127.5,"stdev":73.5},
    "coveringOld_indexed":{"min":2,"max":253,"mean":127.5,"stdev":73.5}}
   ```
   - `navigator.gpu` + `requestAdapter()` + `requestDevice()` ALL succeed → a real WebGPU adapter is
     present, so the picker commits WebGPU (not WebGL2) on real Safari 26.
   - The viz canvas is **WebGPU-bound** (`getContext('webgl2')` → null) AND sized (2066×920 = the 2×
     backing of the 1033×460 CSS box) — the **full flow-field WGSL pipeline ARMED with NO fallback**,
     so WebKit compiled + validated the ENTIRE shader (a validation failure would throw at
     `createRenderPipeline` → the picker would fall to WebGL2 → the canvas would be webgl2-bound; it
     is not).
   - A **standalone WebGPU covering-triangle render→own-texture readback** (my own texture, so it is
     readable unlike the live `preserveDrawingBuffer:false` viz canvas) **rasterizes NON-UNIFORM**
     (min 2, max 253, stdev 73.5 — a full uv gradient) on WebKit's WebGPU/Metal → the fullscreen
     fragment pass DRAWS. (Note: both the S7 scalar-branch and the old indexed-array vertex shapes
     rasterize on macOS 26.4.1's WebKit, so the pre-S7 dead-black on THIS engine version was the
     snapshot tooling limit, not the indexed-array vertex miscompile; the S7 fix is the WebKit-safe
     covering-triangle shape regardless.)
2. **The rest of the route composites + mode-differentiates** in the SAME WKWebView snapshot (the
   audacious hero copy, the calm/ocean/interactive/paused toggles, the PRM explanatory text, the
   sidebar rail glass, the bottom nav dock glass, the blueprint grid; page bg warm-black in DARK vs
   warm-cream in LIGHT) — the snapshot path is healthy for every NON-WebGPU surface; only the
   WebGPU-backed canvas layer fails to flatten.
3. **The WebKit-engine WebGL2 leg (above) directly paints the reference gestalt** in both modes — the
   SAME shared math the WGSL transcribes.

Conclusion: WebGPU renders live on real Safari 26/Metal (pipeline armed + covering-triangle rasterizes
in-engine); the identical reference gestalt is directly pixel-proven on Chrome-WebGPU (the same WGSL)
and on the WebKit engine (the same math via the GLSL twin). The WKWebView viz-canvas blank is the
established `takeSnapshotWithConfiguration` WebGPU-layer tooling limit (BG.W-FOURIER-BEAUTY precedent),
NOT a src defect.

## PASS-BAR scorecard (binding gestalt π toward IMG_1836)

| criterion | Chrome/Metal (WGSL) | WebKit engine (GLSL) | Safari WKWebView (WGSL in-engine) | verdict |
|-----------|---------------------|----------------------|-----------------------------------|---------|
| ≥8 distinct SMOOTH streamlines, resolvable dots, EVEN spacing | **YES — dozens, both modes** | **YES — dozens, both modes** | pipeline armed + covering-triangle rasterizes; snapshot blank (tooling) | **PASS** |
| p99 luminance BELOW white-out | 133.2 | 156.2–206.4 | n/a (snapshot) | **PASS** |
| mean ABOVE dead-black | 19.0–19.3 | 17.2–18.0 | n/a (snapshot) | **PASS** |
| warm-cream / warm-fire default, teal purge held | YES (0 teal) | YES (0 teal) | — | **PASS** |
| even column-luma (no L→R wash) | colCoefVar 0.038–0.046 | 0.047–0.085 | — | **PASS** |
| pointer bends continuously (no discontinuity/vortex) | YES (ptrBend 16.5, coherent local bend) | YES (ptrBend 19.5) | — | **PASS** |
| PRM = one deterministic tick(0) static frame | YES (motion 0, field painted) | — | — | **PASS** |
| compute may STAY WebGPU with WebGL2 channel painting SAME gestalt | WebGPU earner | **WebGL2 SAME gestalt** | WebGPU live in-engine | **PASS** |

Every load-bearing criterion is met in BOTH engines, BOTH modes. The dual-engine bar is satisfied.

## Honest caveat (recorded, not disqualifying)

A DIRECT pixel of the FULL flow-field WGSL specifically on Safari-WebGPU could not be captured:
the live viz canvas uses `preserveDrawingBuffer:false` (all-zero live readback in every engine — a
documented substrate FEATURE, not a defect) and the WKWebView `takeSnapshotWithConfiguration` cannot
flatten a WebGPU-backed canvas layer (the tooling limit). The Safari-WebGPU paint is instead proven
(a) live in-engine (the full pipeline armed with no fallback + the covering-triangle rasterizes) and
(b) identical-gestalt on Chrome-WebGPU (same WGSL) and on the WebKit engine (same math, GLSL twin) —
exactly the shape the criterion's "compute may STAY WebGPU with the WebGL2 channel painting the SAME
gestalt" clause permits, and the same basis BG.W-FOURIER-BEAUTY closed PASS.

## Method (proven C18 dual-engine + in-engine WebGPU DIAG, this session)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- BUILT bytes on `:5200` — `npm run demo:dist:build` (`dot-flow-field-Cf4wim84.js`, index
  `index-Dy1CIhbG.js`) + `vite preview` (NOT `:5199` dev). S7+SP1 fixes verified in the chunk.
- `?capture=/substrates/dot-flow-field&mode=<m>`, poll `data-capture-ready`.
- **Chrome** — real windowed `Google Chrome.app` 149 over Playwright `connectOverCDP :9333`, real
  Metal (`ANGLE Metal Renderer: Apple M5 Max`); scroll canvas to center, 4s warm-up, clip-screenshot;
  live-context probe → `webgpu`; motion/pointer-bend via mean-abs-luma frame diff; PRM via
  `emulateMedia({reducedMotion:'reduce'})`.
- **WebKit engine (WebGL2 fallback)** — Playwright WebKit (no WebGPU → GLSL channel), `locator`
  canvas screenshot + census + motion/pointer-bend, both modes.
- **Safari WKWebView (WebGPU in-engine)** — off-screen system-WebKit WKWebView (`.wkshot-diag-bin`,
  compiled from `wkshot-diag.m` UNDER the repo): polls `data-capture-ready`, runs the async DIAG
  (`callAsyncJavaScript` pageWorld — gpu/adapter/device + viz-canvas ctx probe + a standalone WebGPU
  covering-triangle own-texture render→`copyTextureToBuffer`→`mapAsync` readback), scrolls the canvas
  to top-150, 2880×1800 @2x snapshot.
- Scripts + PNGs kept in `BG.W-DOTFLOW-REBUILD-paint2/`.

## Captures on disk (all resolve — `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint2/`)

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `chrome-light-canvas.png` / `chrome-dark-canvas.png` | Chrome-WebGPU / both | viz-canvas clip (1033×460) | **PASS — beaded streamlines** |
| `chrome-{light,dark}-canvas-ptr{1,2}.png` | Chrome-WebGPU / both | pointer-sweep frames (coherent bend) | ptrBend ≠ 0 |
| `chrome-prm-dark-1.png` / `-2.png` | Chrome-WebGPU / dark PRM | two frames 1s apart | **motion 0, field painted** |
| `chrome-light-full.png` / `chrome-dark-full.png` | Chrome / both | full page | route context |
| `webkit-gl2-light-canvas.png` / `webkit-gl2-dark-canvas.png` | WebKit-WebGL2 / both | viz-canvas (GLSL twin) | **PASS — beaded streamlines** |
| `wkshot-diag-dark.png` / `wkshot-diag-light.png` | Safari-WebKit / both | full route @2x (ENGINE WEBKIT badge) | route composites; viz-canvas blank (tooling); DIAG proves WebGPU live |

---

*Prior-judge history: `c7c5d6fa` FAILED Safari as a "genuine render failure" but its
artifact-elimination only proved the WKWebView snapshot captures NON-WebGPU content (page bg, chrome)
— it did not probe whether the snapshot captures a WebGPU CANVAS (it does not) nor run an in-engine
WebGPU readback. The SP1 fix (`eec371bc`) repaired the earlier total-black BOTH-engine compile failure
(OKLCH splice with no PI in scope). The S7 fix (`a90aaf92`) is the WebKit-safe scalar-branch covering
triangle. This re-judge, over fresh S7 bytes with the in-engine WebGPU DIAG + the WebGL2-fallback
gestalt capture, closes the dual-engine bar → PASS.*
