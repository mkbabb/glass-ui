# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring re-judge)

**Verdict: FAIL** (re-judge of the WGSL paint-fix HEAD `e6bdd0f8` — `flowSetupWGPU.ts`
trail `rgba16float → rgba8unorm` + `FLOW_TRAIL_DEPOSIT 0.18→0.05` + `trailHalfLife 0.3`).
The `<DotFlowField>` viz still does NOT read as the reference flowing-dot-wave (IMG_1836) in
EITHER engine or EITHER mode:

- **Chrome / Metal WebGPU** — the trail-format flip **helped** (structure + warm-fire hue now
  survive on the LEFT half), but the frame reads as a **smeared marbled warm-fire trail-CLOUD**,
  not discrete beaded dots on evenly-spaced streamlines, AND the **right ~40% washes to a flat
  bright ~200-luma plate** (the white-out flood, now confined to the right rather than the whole
  frame). meanLuma 161–178 (too bright — the reference wants a deep warm floor), p99 204–207
  (near white-out), column-luma profile L→R 144→201 (light) / 126→196 (dark) — the right end is a
  washed plate.
- **Safari / WebKit WebGPU** — **DEAD BLACK** in BOTH modes (canvas OKLab meanL ≈ 0.11, meanChroma
  ≈ 0.012, zero structure, zero flow, zero dots). The `rgba8unorm` trail flip did NOT revive the
  WebKit-WebGPU path. The Aurora hero renders fine on the SAME WKWebView (the working control),
  so this is DotFlowField-WGSL-pipeline-specific.

The RE-OPENED user verdict (07-05, "a TOTAL MESS, completely unusable") stands: the paint-fix
addressed the flood-control SYMPTOM on the Chrome path, not the STRUCTURE. **The first-principles
rebuild the criteria demands has NOT been done** — the src still ships `FLOW_PRESET_AURORA_CURRENT`
`mode:"flow"` (a free-advected mote population braided by an additive-trail feedback buffer), the
EXACT gestalt the PASS-BAR explicitly forbids ("NOT a free-advected mote cloud braided by an
additive trail buffer"). No Jobard–Lefer evenly-spaced streamline placement, no arc-length-beaded
dot chains, no dSep-separation, no retirement of the additive-trail flood machinery.

- Wave: `BG.W-DOTFLOW-REBUILD` (row 6.6, F9). repo HEAD `e6bdd0f8`. src SHAs `6dce9b5b` / `7b82c7fc` preserved in lineage.
- Route: `/substrates/dot-flow-field` (renders `FLOW_PRESET_AURORA_CURRENT`, `mode:"flow"`; calm-halftone toggle OFF, interactive ON at capture).
- Gate `proof:viz-dotflow`: **GREEN** (F1–F7d structural + the rgba16float-reintroduction self-test bite). The classic headless-green / visually-broken gap — the gate verifies SOURCE constants (`FLOW_TRAIL_DEPOSIT`, `FLOW_PRESENT_KNEE`, the rgba8unorm trail), NOT the composited pixel result. The gate is not the arbiter; the live dual-engine composite is, and it is broken.

## PASS-BAR scorecard (binding gestalt π toward IMG_1836)

| criterion | Chrome/Metal | Safari/WebKit | verdict |
|-----------|--------------|---------------|---------|
| ≥8 distinct SMOOTH streamlines, individually-resolvable dots, EVEN spacing (Jobard–Lefer) | smeared trail-cloud — 0 traceable beaded streamlines | dead black — 0 | **FAIL** |
| p99 luminance BELOW white-out | p99 204–207, right-half washed to ~200 plate | n/a (black) | **FAIL** |
| mean ABOVE dead-black | mean 161–178 (over-bright) | mean OKLab L ≈ 0.11 (dead-black) | **FAIL** |
| warm-cream / warm-fire default, teal-navy purge held | warm 99–100%, teal 0–1% ✓ | (black, chroma ≈ 0) | PASS (palette) / moot |
| pointer-sweep bends lines continuously | moot (no streamlines) | moot (black) | not reachable |
| PRM = one deterministic tick(0) static frame | not reached (primary gestalt fails) | not reached | moot |

Palette/teal-navy-purge is the ONE criterion that holds on Chrome (warm-fire 99–100%, teal ≈ 0)
— but the gestalt, the luminance band, and the streamline topology all fail, and Safari paints
nothing.

## Method (proven C18, this session)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- Built bytes on `:5200` (`npm run demo:dist:build` exit 0 + `npm run demo:dist:serve` — vite preview, NOT `:5199` dev).
- `?capture=/substrates/dot-flow-field&mode=<m>`, poll `data-capture-ready`, ~4s viz warm-up, then scroll the below-fold showcase canvas near the viewport top.
- **Chrome** via Playwright `connectOverCDP :9477` over real windowed `Google Chrome.app` (Chrome 149) + real Metal GPU. `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` (NOT SwiftShader). Live context probe on the DotFlowField canvas: `{wgpu:true, gl2:false}` → **the judged Chrome path is WebGPU/WGSL**.
- **Safari** via off-screen system-WebKit WKWebView (`.wkshot-scroll-bin`, compiled from `docs/tranches/BG/audit/wkshot-live-scroll.m` — scrolls the demo `MAIN.demo-main-scroller` so the 460px showcase canvas sits near the top). Badge decoded in-pixel: `ENGINE WEBKIT`, `GPU Apple GPU`. Prior session probe confirmed WebKit also binds `webgpu` (not `webgl2`) on this canvas → **the judged Safari path is WebGPU/WGSL too.**

## Captures on disk (all resolve — `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/`)

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `rejudge-chrome-canvas-light.png` | Chrome / light | DotFlowField canvas crop | **FAIL — trail-cloud + right white-out** |
| `rejudge-chrome-canvas-dark.png`  | Chrome / dark  | DotFlowField canvas crop | **FAIL — trail-cloud + right white-out** |
| `rejudge-chrome-light.png` / `rejudge-chrome-dark.png` | Chrome / both | full page (badge) | — |
| `rejudge-safari-showcase-light.png` | Safari / light | full page (badge) — canvas DEAD BLACK | **FAIL — dead black** |
| `rejudge-safari-showcase-dark.png`  | Safari / dark  | full page (badge) — canvas DEAD BLACK | **FAIL — dead black** |

## Pixel census

Chrome canvas crop (2066×920 composited screenshot pixels):

| capture | meanLuma /255 | stdLuma | p99 | col-luma L→R | warm% | teal% | reads as |
|---------|---------------|---------|-----|--------------|-------|-------|----------|
| chrome-light | 178.1 | 29.1 | 207 | 144→201 | 99 | 1 | trail-cloud on left, white plate on right |
| chrome-dark  | 161.0 | 32.3 | 204 | 126→196 | 100 | 0 | trail-cloud on left, white plate on right |

Safari canvas region (OKLab, `pngRegionStats` over the black rectangle):

| capture | meanL | meanChroma | reads as |
|---------|-------|-----------|----------|
| safari-light | 0.116 | 0.012 | dead black |
| safari-dark  | 0.113 | 0.012 | dead black |

Reference intent: a deep warm-near-black floor with **≥8 evenly-spaced smooth streamlines**, each a
chain of individually-resolvable dots — a mid-luma, structure-bearing warm-fire field where the
dots BEAD along level curves. Every capture is either a smeared bright cloud (Chrome) or flat black
(Safari), with 0 traceable evenly-spaced beaded streamlines.

## defectLocalization

1. **STRUCTURAL — the rebuild was never built.** HEAD `e6bdd0f8` landed a constant-tune paint-fix
   (WGSL trail `rgba8unorm`, deposit `0.05`, `trailHalfLife 0.3`) on the SAME `mode:"flow"`
   advected-mote + additive-trail architecture. The RE-OPENED criteria demand a FIRST-PRINCIPLES
   rebuild to Jobard–Lefer evenly-spaced streamline placement over curlFBM (dSep-separated,
   arc-length-beaded dot chains, additive-trail flood machinery RETIRED). That rebuild is absent
   — the free-advected mote cloud the criteria forbid is exactly what still ships
   (`demo/stories/substrates/presets.ts` `FLOW_PRESET_AURORA_CURRENT`; the renderer under
   `src/components/custom/dot-flow-field/`).
2. **Chrome/Metal WGSL — right-half white-out + wrong topology.** The rgba8unorm bounded trail
   tamed the whole-frame flood but the additive deposit still accumulates a flat bright plate over
   the right ~40% (col-luma 144→201), and the LEFT-half structure reads as a smeared marbled trail
   smear, not discrete beaded streamlines. `shaders/flow-field.render.wgsl.ts` `fs_present`
   tone-map + the additive mote/deposit pass, and the dense `particleCount:12000` +
   `speedGlow:1.35`, produce a cloud, not level-curve dot-chains.
3. **Safari/WebKit WGSL — dead black in both modes.** The WGSL compute-advect + rgba8unorm trail
   ping-pong + present composite produces NO visible output on WebKit-WebGPU (canvas OKLab L 0.11,
   chroma 0.01). The Aurora hero renders on the same WKWebView, so the black is specific to the
   DotFlowField WGSL pipeline — a likely WebKit-WebGPU divergence in the storage-buffer compute
   advection, the two-pass trail ping-pong, the additive-blend on the rgba8unorm render target, or
   the present-canvas `alphaMode`. `flowSetupWGPU.ts` + `shaders/flow-field.*.wgsl.ts`.

## mustFix (owed to the build-fix agent — STEP 0.4)

1. **Do the first-principles rebuild the criteria name.** Replace the free-advected-mote +
   additive-trail-flood architecture with Jobard–Lefer (1997) evenly-spaced streamline placement
   over the curlFBM field: seed streamlines, integrate them (RK), enforce dSep separation, and bead
   individually-resolvable dots along each streamline at even arc-length. The frame must read as
   ≥8 distinct smooth undulating/interweaving streamlines (level curves), the dots drifting slowly
   ALONG their own line — NOT a mote cloud. Retire the additive-trail flood buffer where the
   streamline topology supersedes it (W-PRUNE-CONSOLIDATE — no dual path).
2. **Make it PAINT on Safari/WebKit WebGPU.** DotFlowField is dead-black on WebKit-WebGPU in both
   modes while Aurora renders fine. Audit the WGSL compute/storage/trail/present pipeline for the
   WebKit-WebGPU divergence (storage-buffer usage flags, additive-blend on the trail render target,
   the two-pass ping-pong, present `alphaMode`); OR fall to the WebGL2 channel on WebKit if the
   WGSL path cannot be made to paint the same gestalt. A dead-black frame is not acceptable.
3. **Kill the Chrome/Metal right-half white-out + over-bright mean.** Whatever the final render
   (streamline dots), the composite must land mid-luma with a deep warm floor and NO washed bright
   plate — p99 below white-out, mean well above dead-black, column-luma roughly EVEN across the
   frame (not a L→R brightening ramp), warm-fire hue surviving.
4. **Keep the palette fence.** The warm-fire / warm-cream default + teal-navy purge holds on Chrome
   today (warm 99–100%, teal 0–1%) — preserve it through the rebuild (the IMG_1836 teal-on-navy
   skin ships ONLY as a demo preset).
5. **Re-verify BOTH engines BOTH modes** paint the reference flowing evenly-spaced streamline-dot
   wave on the actually-running WebGPU/WGSL path (the census diagnostic: ≥8 traceable beaded
   streamlines, even col-luma, warm-fire hue, teal ≈ 0, Safari NOT black) before re-flipping to
   PAINT-PENDING for a re-judge.

## Notes for the re-judge

- The capture harness, `:5200` built bytes, and both engines are proven this session (the Aurora
  hero on the same route is the working control on both). Re-run the same set: the below-fold
  showcase needs the scroll (Chrome via Playwright scroll of `.demo-main-scroller`; Safari via
  `.wkshot-scroll-bin`).
- **Both judged engines run WGSL/WebGPU** (Chrome/Metal M5 Max AND Safari 26 WKWebView) — any fix
  MUST land on the WGSL path (a WebGL2-only fix keeps passing the gate and keeps failing the paint
  on the whole macOS-26/Metal target fleet).
