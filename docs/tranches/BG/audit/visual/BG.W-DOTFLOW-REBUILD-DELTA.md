# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring re-judge of the REBUILT HEAD)

**Verdict: FAIL** — re-judge of the FIRST-PRINCIPLES streamline REBUILD (src `9f30dc61`,
judged at repo HEAD `d89924dc`; the Jobard–Lefer evenly-spaced-streamline rebuild that
DELETED the compute/particle/additive-trail architecture and shipped
`flow-field.wgsl.ts` + `flow-field.glsl.ts` + `flowField.ts` `sampleStreamField`).

The `<DotFlowField>` viz renders a **FLAT DEAD-BLACK field** — nothing paints — in **BOTH
engines and BOTH modes**. Zero streamlines, zero beaded dots, zero structure, zero motion,
zero pointer response. This is a **total-black regression relative to the prior judge**: the
pre-rebuild HEAD `e6bdd0f8` at least painted a (wrong) warm-fire trail-cloud on Chrome; the
rebuild now paints NOTHING on Chrome too, matching Safari's dead-black. The reference IS the
bar (IMG_1836 — ≥8 traceable evenly-spaced beaded streamlines) and the frame is empty.

- **Chrome / Metal (WebGL2 channel)** — flat near-black, `meanLuma 6.0–6.2`, `p99 5.9`,
  `coloredPct 0.1%`, a 6.4× contrast-stretch reveals a UNIFORM dark plate with ZERO flow
  structure. Frame-to-frame diff over 750 ms = **0** (no animation); pointer-sweep diff =
  **0** (no bend). Probe: `wgpu=false, gl2=true`, `GL_RENDERER = ANGLE (Apple, ANGLE Metal
  Renderer: Apple M5 Max)`. `navigator.gpu` IS present, yet the canvas runs the WebGL2 channel
  and it paints nothing. No console/page errors.
- **Safari / WebKit (Apple GPU)** — flat black, `meanLuma 5.9`, `p99 5.9`, `max 5.9`,
  `coloredPct 0.00%`, colProfile uniform `6` across all 20 columns in BOTH modes. The rest of
  the page (controls, dock, grid backdrop, page nav) renders fine on the SAME WKWebView — only
  the viz canvas is dead.

**Artifact ELIMINATED (not a capture bug):** the NORMAL interactive route (no `?capture=`,
mouse moved over the canvas, 5 s warm-up) ALSO reads dead-black (`mean 6, p99 5.9, motion 0,
no errors`) on the SAME `page.screenshot` compositor path that captured non-black content in
the prior judge — and the fully-independent off-screen system-WebKit snapshot path corroborates
it. `capture.css` explicitly does NOT touch the WebGL canvas (the substrate rAF keeps running),
so this is the true composited render, not a promotion-drop or `preserveDrawingBuffer` artifact.

- Wave: `BG.W-DOTFLOW-REBUILD` (row 6.6, F9). repo HEAD `d89924dc`; rebuild src `9f30dc61`.
- Route: `/substrates/dot-flow-field` (`FLOW_PRESET_WARM` default, interactive ON, paused OFF).
- Gate `proof:viz-dotflow` + `proof:flow-field`: **GREEN** (S1 retired-arch · S2 present · S3
  round-trip · S4 fullscreen-fragment · S5 warm-identity · S6 pointer). The classic
  headless-green / visually-broken gap — the gates verify SOURCE structure (`sampleStreamField`
  exists, the deleted files are absent, the WGSL↔GLSL round-trip), NOT the composited pixel.
  The gate is not the arbiter; the live dual-engine composite is, and it paints black.

## PASS-BAR scorecard (binding gestalt π toward IMG_1836)

| criterion | Chrome/Metal (WebGL2) | Safari/WebKit (Apple GPU) | verdict |
|-----------|-----------------------|---------------------------|---------|
| ≥8 distinct SMOOTH streamlines, individually-resolvable dots, EVEN spacing | 0 — flat black | 0 — flat black | **FAIL** |
| p99 luminance BELOW white-out | 5.9 (moot — black) | 5.9 (moot — black) | moot |
| mean ABOVE dead-black | mean 6.0–6.2 (**dead-black**) | mean 5.9 (**dead-black**) | **FAIL** |
| warm-cream / warm-fire default, teal-navy purge held | moot (no pixels; 0.1% colored) | moot (0.00% colored) | moot |
| pointer-sweep bends lines continuously | motion 0 / ptrBend 0 | (black) | **FAIL** |
| PRM = one deterministic tick(0) static frame | not reached (nothing paints) | not reached | moot |

Every load-bearing criterion FAILS. The frame is empty in all four quadrants.

## Method (proven C18, this session)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- Built bytes on `:5200` (`npm run demo:dist:build` exit 0 + `npm run demo:dist:serve` — vite
  preview, NOT `:5199` dev). `dist-demo/assets/dot-flow-field-DCDn3-Le.js` in the built set.
- `?capture=/substrates/dot-flow-field&mode=<m>`, poll `data-capture-ready`, ~4 s viz warm-up,
  then scroll `main.demo-main-scroller` so the below-fold 460 px showcase canvas
  (`.dot-flow-field-wrapper`, bbox y≈1245 → scrolled to y≈90) sits near the top.
- **Chrome** via Playwright `connectOverCDP :9477` over real windowed `Google Chrome.app`
  (Chrome 149) on the real Metal GPU (`ANGLE Metal Renderer: Apple M5 Max`). Badge decoded
  in-pixel: `ENGINE CHROME`. Live-canvas context probe: `{wgpu:false, gl2:true}` → the judged
  Chrome channel is **WebGL2**.
- **Safari** via off-screen system-WebKit WKWebView (`wkshot-scroll`, compiled from
  `docs/tranches/BG/audit/wkshot-live-scroll.m` — scrolls the `.demo-main-scroller` 984 px so
  the canvas sits near top). Badge decoded in-pixel: `ENGINE WEBKIT`, `GPU Apple GPU`.
- Pixel census via `pngjs` over the canvas-clip PNGs; motion/pointer-bend via mean-abs-luma
  frame diff; contrast-stretch (6.4×) to expose any sub-threshold structure (none).

## Captures on disk (all resolve — `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-rebuild-paint/`)

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `chrome-light-canvas.png` / `chrome-dark-canvas.png` | Chrome / both | viz canvas crop (2066×920) | **FAIL — flat black** |
| `chrome-dark-canvas-boost.png` | Chrome / dark | 6.4× contrast-stretch | **FAIL — uniform, no structure** |
| `chrome-{light,dark}-canvas-t2.png` | Chrome / both | +750 ms motion frame | motion 0 |
| `chrome-{light,dark}-canvas-ptr{1,2}.png` | Chrome / both | pointer-sweep frames | ptrBend 0 |
| `chrome-light-full.png` / `chrome-dark-full.png` | Chrome / both | full page (badge) | — |
| `normal-dark-{full,canvas-t1,canvas-t2}.png` | Chrome / dark | NON-capture interactive route | **FAIL — flat black, motion 0** (artifact-elimination) |
| `safari-light-full.png` / `safari-dark-full.png` | Safari / both | full page (badge) | **FAIL — viz canvas dead black** |
| `safari-light-canvas.png` / `safari-dark-canvas.png` | Safari / both | canvas-region crop | **FAIL — flat black** |

## Pixel census

Chrome viz-canvas crop (2066×920, `page.screenshot` clip):

| capture | meanLuma | p99 | max | coloredPct | motion (750 ms) | ptrBend | reads as |
|---------|----------|-----|-----|-----------|-----------------|---------|----------|
| chrome-light | 6.2 | 5.9 | 222.9 | 0.1% | 0 | 0 | flat dead-black (a few stray edge px) |
| chrome-dark  | 6.0 | 5.9 | 55.1  | 0.1% | 0 | 0 | flat dead-black |
| normal-dark (no capture) | 6.0 | 5.9 | 55.1 | 0.1% | 0 | — | flat dead-black |

Safari viz-canvas region (interior box in the 2880×1800 full):

| capture | meanLuma | p99 | max | coloredPct | reads as |
|---------|----------|-----|-----|-----------|----------|
| safari-light | 5.9 | 5.9 | 5.9 | 0.00% | mathematically flat black |
| safari-dark  | 5.9 | 5.9 | 5.9 | 0.00% | mathematically flat black |

Reference intent: a deep warm-near-black floor bearing **≥8 evenly-spaced smooth streamlines**,
each a chain of individually-resolvable dots that drift ALONG their own line. Every capture is a
flat empty plate with 0 traceable streamlines.

## defectLocalization

1. **The streamline field PAINTS NOTHING on either engine.** HEAD `d89924dc` ships the
   first-principles rebuild (`sampleStreamField` + `flow-field.wgsl.ts` + `flow-field.glsl.ts`,
   the compute/particle/trail files deleted) — the ARCHITECTURE the criteria demanded — but the
   render is dead: a flat ~6-luma plate in Chrome/WebGL2 AND Safari/WebKit, both modes, no
   motion, no pointer response, no console errors. The fullscreen-fragment pass produces no
   visible output. Suspects: the fragment never draws (clear-to-black then no draw call / wrong
   vertex coverage of the full-screen triangle), the uniforms from `deriveStreamUniforms`
   (`uniformBridgeWGPU.ts`) arrive zeroed/mis-packed so `sampleStreamField` degenerates, the
   bead/dot alpha or the ink-vs-floor mix resolves to the background everywhere, or the field
   extent/scale places the streamlines entirely outside the sampled UV range.
   `src/components/custom/dot-flow-field/composables/{flowSetup.ts,flowSetupGL.ts,flowGLProgram.ts,flowSetupWGPU.ts}`
   + `shaders/flow-field.{wgsl,glsl}.ts` + `flowField.ts`.
2. **Chrome runs the WebGL2 channel (`wgpu=false, gl2=true`) despite `navigator.gpu` present.**
   The prior judge found Chrome on WebGPU; the rebuild's `useGpuSubstrate` picker now resolves
   WebGL2 on this route (either a deliberate pick, a `setupWGPU`-absent fall, or a silent
   WebGPU-arm failure falling to a broken WebGL2 path). Whichever — the channel Chrome actually
   runs paints nothing. If the WebGPU primary is intended as the earner, the WebGL2 fallback
   MUST paint the same gestalt (criteria); it is dead.
3. **Safari/WebKit is dead-black too** (prior judge: also black). The WGSL/GLSL channel WebKit
   binds renders nothing while Aurora renders on the same WKWebView — DotFlowField-pipeline-
   specific. Whatever the fix, it must land on the channel EACH engine actually runs (WebGL2 on
   the judged Chrome, the WebKit-WebGPU/WebGL2 path on Safari) — a WebGPU-only fix keeps the gate
   green and the paint black on this Metal/WebKit fleet.
4. **Gate GREEN / paint BLACK** — `proof:viz-dotflow` + `proof:flow-field` verify source
   structure, not the composited pixel. The reference image is the bar; the composite is empty.

## mustFix (owed to the build-fix agent — STEP 0.4)

1. **Make the streamline field actually PAINT.** It renders a flat black plate on both engines.
   Drive the fullscreen-fragment pass end-to-end: confirm the draw executes, the full-screen
   triangle covers the viewport, `deriveStreamUniforms` reaches the shader non-zero, and
   `sampleStreamField` at the shipped `FLOW_PRESET_WARM` params yields visible iso-contours with
   non-zero bead/ink alpha over a deep warm floor. Verify the WGSL AND the GLSL fragment both
   paint (the S3 round-trip proves the MATH matches, not that either backend draws).
2. **Confirm + fix the per-engine channel.** Chrome judged on WebGL2 (`gl2=true`) — if WebGPU is
   the intended primary, resolve why the picker fell to WebGL2 and ensure BOTH channels paint;
   Safari must paint on the channel it binds. A dead-black frame on the channel an engine
   actually runs is not acceptable.
3. **Then meet the gestalt bar:** ≥8 traceable evenly-spaced beaded streamlines, dots
   individually resolvable at visibly even spacing; mean WELL above dead-black with a deep warm
   floor; p99 below white-out; column-luma roughly even (no L→R wash); warm-fire hue surviving,
   teal purged (ocean = demo preset only); pointer bends the lines continuously (no
   discontinuity); PRM = one deterministic static frame that STILL shows the streamlines.
4. **Re-verify BOTH engines BOTH modes** paint the reference streamline-dot wave on the
   actually-running channel before re-flipping to PAINT-PENDING for a re-judge (census: ≥8
   traceable beaded streamlines, even col-luma, warm-fire hue, teal≈0, neither engine black,
   motion≠0, pointer-bend≠0).

## Notes for the re-judge

- The capture harness, `:5200` built bytes, and both engines are proven this session (Aurora on
  the same WKWebView is the working control; the prior judge captured live non-black Chrome
  content on the same `page.screenshot` path). Re-run the same set: the below-fold showcase
  needs the scroll (Chrome via Playwright scroll of `.demo-main-scroller`; Safari via
  `wkshot-live-scroll.m`).
- **The judged Chrome channel is WebGL2** (probe `gl2=true`) and **Safari is dead** — a fix must
  land on the channel each engine actually runs, not a WebGPU-only edit that leaves the gate
  green and the paint black.
