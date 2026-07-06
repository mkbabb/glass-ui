# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring paint re-judge)

**Verdict: FAIL (partial — Chrome paints the reference gestalt, Safari/WebKit is dead-black).**

Non-authoring paint judge of the first-principles streamline rebuild, re-judged at repo HEAD
`c7c5d6fa` over FRESHLY-BUILT bytes on `:5200` (`npm run demo:dist:build` →
`dot-flow-field-baHr9Yy1.js`, index `index-C3z5ePMX.js`; served via `vite preview` on `:5200`). Route
`/substrates/dot-flow-field`, both modes, both engines. The flow-field src
(`src/components/custom/dot-flow-field/**`) is UNCHANGED since the prior judge (`411a6b12`), and this
capture REPRODUCES the prior finding on current HEAD with fresh bytes.

- **Chrome / Metal (WebGPU · WGSL channel) — PASS both modes.** `<DotFlowField>` renders the reference
  gestalt: dozens (≫8) of traceable, evenly-spaced, smooth, undulating, interweaving **warm-cream
  beaded streamlines** — curl-field level curves, each beaded with brighter dots along its length —
  over a deep warm-near-black floor. Even column-luma (no L→R wash), warm-cream identity (no teal),
  ambient motion + pointer-bend both present.
- **Safari / WebKit (WebGPU · WGSL channel) — FAIL both modes.** The same WGSL flow-field pass renders
  a **perfectly uniform dead-black plate** — meanLum 6.27, **stdev EXACTLY 0**, coloredPct 0 over a
  1.48M-px interior box — zero streamlines, zero dots, zero variance. A 6× contrast-stretch reveals
  NOTHING (there is no signal to amplify). A total no-render, not a dim render.

The binding criterion is **DUAL-engine** ("≥8 traceable evenly-spaced beaded streamlines,
Chrome-Metal + Safari-WebKit both modes over built :5200"). Safari is dead-black both modes → the
dual-engine bar is NOT met → **FAIL, fix owed.**

## Pixel census (this session — the VIZ canvas region only)

Chrome viz-canvas clip (`.rounded-card canvas`, 1033×460, real-Metal `page.screenshot` clip):

| capture | meanLum | p50 | p99 | max | stdev | colCoefVar | coloredPct | motion(800ms) | ptrBend | liveChannel | reads as |
|---------|---------|-----|-----|-----|-------|-----------|-----------|---------------|---------|-------------|----------|
| chrome-light | 19.34 | 10 | 133.2 | 219 | 29.6 | 0.05 | 1.18% | 16.99 | 16.70 | `webgpu` | **warm-cream beaded streamlines** |
| chrome-dark  | 19.44 | 10 | 133.2 | 219 | 29.6 | 0.054 | 1.20% | 17.15 | 16.69 | `webgpu` | **warm-cream beaded streamlines** |

Safari viz-canvas interior box (x560 y430 1900×780 inside the 2880×1800 @2x scrolled snapshot):

| capture | meanLum | p50 | p99 | max | stdev | coloredPct | reads as |
|---------|---------|-----|-----|-----|-------|-----------|----------|
| safari-dark  | 6.27 | 6.3 | 6.3 | 6.3 | **0.00** | 0% | flat uniform near-black; **0 streamlines** |
| safari-light | 6.27 | 6.3 | 6.3 | 6.3 | **0.00** | 0% | flat uniform near-black; **0 streamlines** |

## Artifact ELIMINATED — the WKWebView snapshot path is healthy; the viz render is dead

The dead-black is a **genuine WebKit-WGSL render failure, not a snapshot-compositing artifact**:

- **Mode-differentiated live content composites into the same snapshot.** Page-background strip
  (x2600–2870, y500–1200 — pure page, right of the canvas) reads **safari-dark 27.4 / safari-light
  236.2** → the WKWebView captures live, mode-correct content. If the flow-field WGSL were painting,
  its pixels would be in the snapshot the same way the page's are.
- **The rest of the route renders perfectly on the SAME WKWebView** — the audacious "Dot Flow Field"
  hero copy, the controls (calm/ocean/interactive/paused switches), the sidebar rail glass, the bottom
  nav dock glass chrome, the blueprint grid — only the viz canvas is dead. The canvas is at its
  correct 460px×full-width geometry (a solid black rectangle), so it is SIZED correctly; it is the
  DRAW that produces nothing.
- **Provenance decoded in-pixel:** the badge reads `ENGINE WEBKIT · GPU Apple GPU · MODE {DARK,LIGHT}`
  on the Safari captures; the Chrome live probe reports `ANGLE Metal Renderer: Apple M5 Max` and
  `liveChannel: webgpu` on the actual viz canvas.

## PASS-BAR scorecard (binding gestalt π toward IMG_1836)

| criterion | Chrome/Metal (WGSL) | Safari/WebKit (WGSL) | verdict |
|-----------|--------------------|---------------------|---------|
| ≥8 distinct SMOOTH streamlines, individually-resolvable dots, EVEN spacing | **YES — dozens, both modes** | **0 — flat black, both modes** | **FAIL (Safari)** |
| p99 luminance BELOW white-out | 133.2 (no white-out) | moot (black) | Chrome PASS |
| mean ABOVE dead-black | 19.3–19.4 (deep floor + bright lines) | 6.27 (uniform clear/CSS floor, no field) | **FAIL (Safari)** |
| warm-cream / warm-fire default, teal-navy purge held | YES — warm-cream lines, 0 teal | moot (no pixels) | Chrome PASS |
| even column-luma (no L→R wash) | colCoefVar 0.05–0.054 | moot | Chrome PASS |
| pointer-sweep + ambient motion non-zero | motion ~17 / ptrBend ~16.7 | moot | Chrome PASS |
| PRM = one deterministic tick(0) static frame | not exercised (both engines live-motion) | not exercised | n/a this pass |

Chrome meets every load-bearing criterion; Safari fails the streamline-present + above-dead-black bar.

## defectLocalization

**The WGSL / WebGPU flow-field pass paints NOTHING on WebKit.** Both engines resolve the WebGPU (WGSL)
channel for the dot-flow canvas (`useGpuSubstrate` optimistically commits `webgpu` when
`navigator.gpu` exists AND `requestAdapter()`/`requestDevice()` succeed — Safari 26 satisfies both).
Chrome (Dawn→Metal) renders the streamlines; WebKit (WebGPU→Metal) creates the pipeline (INIT
succeeds) but the fullscreen-fragment pass emits a uniform clear-floor with no field — a
cross-implementation WGSL/pipeline divergence WebKit silently drops that Dawn tolerates.

Likely loci (a WebKit-WGSL divergence, NOT the MATH — Chrome proves the math right):
(a) a WGSL construct WebKit's validator rejects that Dawn tolerates (a swallowed
`createRenderPipeline`/`popErrorScope` validation error); (b) the `Uniforms` struct byte-layout in
`deriveStreamUniforms`/`uniformBridgeWGPU.ts` mis-packs on WebKit's WGSL packer (the std140-vs-WGSL
alignment trap the codebase names) so `sampleStreamField` degenerates to background everywhere; (c) an
fp32-precision / NaN divergence zeroing the field on WebKit's Metal path; (d) a full-screen-triangle
vertex-stage / viewport-coverage divergence. Files:
`src/components/custom/dot-flow-field/shaders/flow-field.wgsl.ts`,
`composables/{flowSetup.ts,flowSetupWGPU.ts,flowGLProgram.ts,flowField.ts}`,
`src/composables/glass/webgpu/uniformBridgeWGPU.ts` (`deriveStreamUniforms`).

The invisible WebGL2 fallback in `useGpuSubstrate` does **not** rescue this because the fallback is
**init-failure-triggered only** (`requestAdapter()` null, `requestDevice()` reject, device.lost at
birth, a validation throw). Safari's WebGPU INIT succeeds, so the picker never falls to the
byte-identical GLSL channel — a **silent RENDER failure** slips through the fallback net. This is the
masking-fallback class the house edict forbids ("primary works in paint or fails loud; no fallback
that hides a dead primary"): a "successfully armed" WebGPU context painting black with no fall-through.

This is NOT a source-structure gate miss: `proof:viz-dotflow` + `proof:flow-field` are GREEN and verify
the WGSL↔GLSL math round-trip (`sampleStreamField`/`deriveStreamUniforms`), not the composited WebKit
pixel. The gate is honest about what it checks; the paint bar is the DUAL-engine pixel.

## mustFix[] (owed to the build-fix agent — STEP 0.4)

1. **Make Safari/WebKit paint the SAME streamline gestalt Chrome does (both modes).** The binding bar
   is dual-engine; a Chrome-only PASS is the forbidden weak close. Do NOT re-touch the GLSL/WGSL math
   the Chrome channel proves correct — the defect is WebKit-WGSL-pipeline-specific.
2. **Either** (a) fix the WGSL fragment so WebKit's WebGPU actually draws it — diff the flow-field
   pipeline against the aurora WGSL pipeline that paints on the SAME WebKit (bind-group layout, uniform
   packing/alignment, texture formats, `alphaMode`, pipeline-creation error scopes, full-screen-triangle
   coverage) to find what the flow-field pass does that WebKit rejects — **or** (b) route WebKit to the
   byte-identical **WebGL2 (GLSL) fallback** (the criterion explicitly permits "compute may STAY
   WebGPU (the sole earner) with the WebGL2 channel painting the SAME gestalt"; the GLSL channel's
   round-trip is already gate-verified). If chosen, `useGpuSubstrate` needs a **post-arm
   render-liveness probe** (read back a pixel after first draw; a uniform/near-black plate → dispose
   the WebGPU leaf + rebuild on `setupGL`) so a SILENT render failure — not just an init failure —
   triggers the fall, honoring the no-masking-fallback edict.
3. **Re-run the dual-engine gestalt π** (this DELTA's method) at the next paint close; PASS only when
   BOTH engines trace ≥8 evenly-spaced beaded streamlines in BOTH modes (even column-luma, warm-fire
   hue, teal≈0, mean well above dead-black with p99 below white-out, motion≠0, pointer-bend≠0) on
   Safari/WebKit AS WELL AS Chrome/Metal.

## Method (proven C18 dual-engine, this session)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- BUILT bytes on `:5200` — `npm run demo:dist:build` (fresh `dist-demo/assets/dot-flow-field-baHr9Yy1.js`,
  index `index-C3z5ePMX.js`) + `vite preview` (NOT `:5199` dev).
- `?capture=/substrates/dot-flow-field&mode=<m>`, poll `data-capture-ready`.
- **Chrome** — real windowed `Google Chrome.app` 149 over Playwright `connectOverCDP :9333`, real Metal
  GPU (`ANGLE Metal Renderer: Apple M5 Max`); scroll `.rounded-card canvas` to center, 4s viz warm-up,
  clip-screenshot the canvas; live context probe → `webgpu`; motion/pointer-bend via mean-abs-luma
  frame diff.
- **Safari** — off-screen system-WebKit WKWebView (`docs/tranches/BG/audit/.wkshot-scroll-bin`,
  compiled from `wkshot-live-scroll.m` — polls `data-capture-ready`, scrolls the canvas to top-150 via
  the internal `MAIN` scroller, 1.8s settle, 2880×1800 @2x snapshot); interior-box census + 6× boost
  via `pngjs`; page-bg mode-differentiation control (dark 27.4 / light 236.2).
- Scripts kept in `BG.W-DOTFLOW-REBUILD-rejudge/` (`chrome-paint.mjs`, `safari-census.mjs`,
  `pagecheck.mjs`).

## Captures on disk (all resolve — `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-rejudge/`)

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `chrome-light-canvas.png` / `chrome-dark-canvas.png` | Chrome / both | viz-canvas clip (1033×460) | **PASS — beaded streamlines** |
| `chrome-{light,dark}-canvas-t2.png` / `-ptr{1,2}.png` | Chrome / both | +800ms motion + pointer-sweep frames | motion/ptrBend ≠ 0 |
| `chrome-light-full.png` / `chrome-dark-full.png` | Chrome / both | full page | route context |
| `safari-light-canvas.png` / `safari-dark-canvas.png` | Safari / both | full page scrolled to canvas (ENGINE WEBKIT badge) | **FAIL — flat black canvas** |
| `safari-{light,dark}-viz-boost6x.png` | Safari / both | 6× contrast-stretch of viz interior | **FAIL — uniform, nothing revealed** |

---

*Prior-judge history (partial recovery arc): the SP1 shader-PI-scope compile fix (`eec371bc`) repaired
the total-black regression where BOTH engines were dead (flow-field.{glsl,wgsl} spliced OKLCH_MATRICES
with no `PI` in scope → undeclared identifier → the pass never linked). Post-SP1, Chrome paints the
reference gestalt; Safari's WebKit-WebGPU channel remains the one dead surface. This re-judge confirms
that state at HEAD `c7c5d6fa` over fresh bytes; the flow-field src is unchanged since `411a6b12`.*
