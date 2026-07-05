# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring re-judge)

**Verdict: FAIL (re-judge of the paint-fix commit `6dce9b5b`).** The `<DotFlowField>` viz
still does NOT read as the reference flowing-dot-wave in EITHER engine or EITHER mode. On
**Chrome/Metal** it paints a **flat bright plate** (light-lavender-gray white-out, meanLuma
≈ 207, near-zero structure, ZERO warm-fire chroma) with faint white motes clumping ONLY at
the card's right margin; on **Safari/WebKit** it paints a **dead near-BLACK plate** (meanLuma
≈ 4.7, zero structure, zero chroma). The reference warm-fire advected dot-wave (motes advected
along undulating streamlines, warm-fire velocity ramp ember→amber→gold, over a deep
warm-near-black floor) is **absent on the live composite in all four captures**.

The paint-fix reduced the Chrome blow-out slightly (253 → 207 meanLuma) and made a few motes
distinguishable at the right margin, but the field still washes to a flat bright plate and the
warm-fire hue is not surviving (0% chromatic). Safari is effectively the same dead-black as the
prior FAIL. **This is NOT resolved.**

- Wave: `BG.W-DOTFLOW-REBUILD` (row 6.6, F9). src SHAs `6dce9b5b` / `7b82c7fc` PRESERVED (repo HEAD `a3a9b58b`).
- Route: `/substrates/dot-flow-field` (renders `FLOW_PRESET_AURORA_CURRENT`, the `mode:"flow"`
  default; the "calm halftone (field)" toggle OFF at capture, interactive ON).
- Gate `proof:viz-dotflow`: **GREEN** (F1-F7 structural + F7d self-test). The classic
  headless-green / visually-broken gap — the gate verifies SOURCE structure (`FLOW_PRESENT_KNEE`,
  `FLOW_TRAIL_DEPOSIT`, `FLOW_MOTE_BASE`, `FLOW_TRAIL_CEIL`, RGBA8 trail), NOT the composited
  pixel result. The gate is not the arbiter; the live dual-engine composite is, and it is broken.

## Method (proven C18, this session)

- Built bytes on `:5200` (`npm run demo:dist:build` + `npm run demo:dist:serve`), NOT `:5199` dev.
- `?capture=/substrates/dot-flow-field&mode=<m>`, poll `data-capture-ready`.
- Chrome via Playwright `connectOverCDP` over real `Google Chrome.app` (Chrome 149) + real Metal
  GPU — throwaway-webgl2 `GL_RENDERER` = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max,
  Unspecified Version)` (NOT SwiftShader), engine badge decoded in-pixel (`ENGINE CHROME`).
- Safari via off-screen system-WebKit WKWebView (`.wkshot-bin` for the hero, `.wkshot-scroll-bin`
  — the below-fold scroll variant — for the showcase). Badge decoded in-pixel (`ENGINE WEBKIT`,
  `GPU Apple GPU`). Scroll: the demo `MAIN.demo-main-scroller` scrolled 988px so the 460px
  showcase canvas sits near the top of the 1440×900 viewport.
- The showcase canvas region is the below-fold specimen (`ShowcaseFrame tier="field"` →
  `.rounded-card` 460px canvas), not the hero (the hero backdrop is a `StoryHero` `<Aurora>`,
  which rendered warm + structured on both engines — the working control).

## Captures on disk (all resolve — `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/`)

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `refetch-chrome-showcase-dark.png`  | Chrome / dark  | **the DotFlowField showcase** | **FAIL — flat bright plate** |
| `refetch-chrome-showcase-light.png` | Chrome / light | **the DotFlowField showcase** | **FAIL — flat bright plate** |
| `refetch-safari-showcase-dark.png`  | Safari / dark  | **the DotFlowField showcase** | **FAIL — dead black** |
| `refetch-safari-showcase-light.png` | Safari / light | **the DotFlowField showcase** | **FAIL — dead black** |
| `refetch-chrome-canvas-dark.png`  | Chrome / dark  | canvas element crop | flat bright |
| `refetch-chrome-canvas-light.png` | Chrome / light | canvas element crop | flat bright |
| `refetch-chrome-dark.png` / `-light.png`   | Chrome / both | hero (Aurora backdrop) | hero OK (control) |
| `refetch-safari-dark.png` / `-light.png`   | Safari / both | hero (Aurora backdrop) | hero OK (control) |
| `refetch-chrome-census.json` | — | Chrome composited-PNG census | — |

## Pixel census (showcase canvas region — composited screenshot pixels, NOT the WebGL drawImage)

| capture | meanLuma /255 | stdLuma | chromatic % | warm % | teal % | reads as |
|---------|---------------|---------|-------------|--------|--------|----------|
| chrome-dark  | **207.3** | 2.9 | 0.0 | — | 0 | flat bright plate (white-out) |
| chrome-light | **207.3** | 2.9 | 0.0 | — | 0 | flat bright plate (white-out) |
| safari-dark  | **4.7**   | 0.0 | 0.0 | — | 0 | dead black |
| safari-light | **4.7**   | 0.0 | 0.0 | — | 0 | dead black |

Reference intent (`FLOW_PRESET_AURORA_CURRENT`): a deep warm-near-black floor (luma ≈ 28/255)
with warm-fire ribbons advecting through it — a mid-luma, HIGH-stdLuma (visible ribbon
structure), warm-chromatic field, zero teal. Every capture is either flat-bright (Chrome) or
flat-black (Safari) with near-zero stdLuma and ZERO chroma — a flat plate, not a flowing field.

## defectLocalization (the decisive new finding — the paint-fix targeted the WRONG path)

**BOTH judged engines run the WebGPU/WGSL path, NOT the WebGL2 GLSL path.** Probed live on
both: the showcase canvas has a bound `webgpu` context and no `webgl2` context
(`{gpu:true, gl2:false, wgpu:true}`) on Chrome 149/M5 Max **AND** on Safari 26 WKWebView. So:

- **The RGBA8-trail Safari-fix in `flowSetupGLFlow.ts` (the WebGL2 GLSL path) is a NO-OP on both
  engines judged here** — it never executes. The WGSL path's trail is still
  `flowSetupWGPU.ts:147` `trailFormat = "rgba16float"` (unbounded float — the exact
  additive-flood substrate the fix was meant to bound, still present on the path that actually
  runs).
- **Chrome/Metal WGSL — white-out.** The shared constants (`FLOW_PRESENT_KNEE = 0.7`,
  `FLOW_TRAIL_DEPOSIT = 0.18`, `FLOW_MOTE_BASE = 0.12`, `FLOW_TRAIL_CEIL = 1.0`) DO splice into
  `shaders/flow-field.render.wgsl.ts` `fs_present` / mote pass, but on the real Metal WebGPU
  device the additive RGBA16F trail + dense population (`particleCount 12000`, `speedGlow 1.35`)
  still saturate `t/(t+0.7)` toward 1.0 across the whole frame → a flat bright plate. The
  pre-tone-map `min(trail, 1.0)` clamp + the 0.18 deposit gain do NOT tame the flood on this
  path; the field reads bright, not warm-fire-over-dark, and the warm-fire hue does not survive
  (0% chromatic — everything clips to white/gray). Motes are only distinguishable where the
  trail is thinnest (the right margin).
- **Safari/WebKit WGSL — dead black.** The WGSL compute-advect + RGBA16F trail ping-pong +
  present produces NO visible output on WebKit's WebGPU (meanLuma 4.7, 0% chroma). The Aurora
  hero renders fine on the same WKWebView, so this is specific to the DotFlowField WGSL
  pipeline — a likely WebKit-WebGPU divergence in the `rgba16float` storage/render-target
  additive-blend, the compute storage-buffer advection, or the two-pass trail ping-pong (the
  WGSL twin of the very failure the WebGL2 RGBA8 fix addressed — but on the WGSL path it was
  never addressed).

## mustFix (owed to the build-fix agent — STEP 0.4)

1. **Fix the WGSL path, not (only) the WebGL2 GLSL path.** Both target engines (Chrome/Metal +
   Safari 26) run WebGPU. The RGBA8-trail Safari-fix in `flowSetupGLFlow.ts` never executes on
   them. Bring the flood-control + additive-blendable-trail discipline to the WGSL path:
   `flowSetupWGPU.ts` (`trailFormat = "rgba16float"` at `:147` — consider an 8-bit-unorm /
   bounded-format trail, or a clamped deposit, matching the WebGL2 RGBA8 decision) +
   `shaders/flow-field.render.wgsl.ts` (`fs_present` tone-map + the additive mote/deposit pass).
2. **Kill the Chrome/Metal WGSL white-out.** Re-balance so the warm-fire ribbons POP off the
   deep warm floor WITHOUT clipping the whole frame to a flat bright plate — tune the present
   knee / deposit gain / pre-tone-map clamp against the ACTUAL WGSL trail magnitude on a real
   Metal WebGPU device (not the WebGL2 path), and re-verify the composited mean luma lands
   mid-range (NOT ~207) with high stdLuma (visible ribbon structure) and warm-fire hue surviving
   (motes read ember/amber/gold, not white/gray).
3. **Make the WGSL trail/state pipeline PAINT on Safari/WebKit WebGPU.** DotFlowField is
   dead-black on WebKit-WebGPU while the Aurora hero renders fine. Audit the WGSL RGBA16F trail
   ping-pong + compute-advected storage buffer + present composite for a WebKit-WebGPU
   divergence (float render-target additive-blend support, storage-texture/buffer usage flags,
   the `alphaMode` of the present canvas configure). Degrade gracefully (a bounded-format trail,
   or a detected WebGL2 fall) rather than a black frame.
4. **Re-verify BOTH engines BOTH modes** paint the reference flowing warm-fire dot-wave
   (mid-luma warm-chromatic field with visible advected streamline structure, zero teal) on the
   WGSL path before re-flipping to PAINT-PENDING for a re-judge. The showcase-canvas census is
   the diagnostic: PASS wants meanLuma roughly mid-range, stdLuma WELL above the ~2-5 flat-plate
   floor, warm % of chromatic ≈ 100, teal ≈ 0, on all four (engine × mode) captures.

## Notes for the re-judge

- The capture harness, `:5200` built bytes, and both engines are proven this session (the Aurora
  hero is the working control on both). Re-run the same set: the below-fold showcase needs the
  scroll (Chrome via Playwright scroll of `.demo-main-scroller`; Safari via `.wkshot-scroll-bin`,
  the scroll-variant harness under `docs/tranches/BG/audit/wkshot-live-scroll.m`).
- The single decisive fact this re-judge adds over the prior FAIL: **the judged engines run
  WGSL, so the fix must land on the WGSL path.** A WebGL2-only fix will keep passing the gate and
  keep failing the paint on any WebGPU-capable device (which is the whole target fleet on
  macOS 26 / Metal).
