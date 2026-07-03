# BG.W-DOTFLOW-REBUILD — paint DELTA (dual-engine, non-authoring)

**Verdict: FAIL** — the `<DotFlowField>` viz does NOT read as the reference flowing-dot-wave
in EITHER engine or EITHER mode. On Chrome/Metal it paints a **blown-out flat WHITE** field;
on Safari/WebKit it paints a **dead near-BLACK** field. The warm-fire advected dot-wave
(motes advected along undulating streamlines, warm-fire velocity ramp, deep warm-near-black
floor) is absent on the live composite.

- Wave: `BG.W-DOTFLOW-REBUILD` (row 6.6, F9) — src SHAs `7b82c7fc` PRESERVED.
- Route: `/substrates/dot-flow-field` (renders `FLOW_PRESET_AURORA_CURRENT`, the `mode:"flow"`
  default; the "calm halftone (field)" toggle was OFF at capture).
- Method: proven C18 — built bytes on `:5200` (`demo:dist:build` + `demo:dist:serve`),
  `?capture=<route>&mode=<m>`, poll `data-capture-ready`. Chrome via CDP over real
  `Google Chrome.app` + real Metal GPU (`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`
  — NOT SwiftShader, badge decoded in-pixel). Safari via off-screen system-WebKit WKWebView.
- Gate `proof:viz-dotflow`: **GREEN** (F1-F7 structural). This is the classic
  headless-green / visually-broken gap — the gate verifies SOURCE structure (`cs_flow` present,
  `WARM_FIRE_RAMP` declared with no teal stop, `FLOW_PRESENT_KNEE = 0.6 ≤ 0.7` named + spliced
  into both present passes), NOT the composited pixel result. The pixels are broken.

## Captures on disk (all resolve)

Under `docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint/`:

| PNG | engine / mode | subject | verdict |
|-----|---------------|---------|---------|
| `dotflow-chrome-light.png`  | Chrome / light | hero (Aurora backdrop) + page | hero OK; showcase below fold |
| `dotflow-chrome-dark.png`   | Chrome / dark  | hero (Aurora backdrop) + page | hero OK; showcase below fold |
| `dotflow-safari-light.png`  | Safari / light | hero (Aurora backdrop) + page | hero OK; showcase below fold |
| `dotflow-safari-dark.png`   | Safari / dark  | hero (Aurora backdrop) + page | hero OK; showcase below fold |
| `dotflow-showcase-chrome-light.png` | Chrome / light | **the DotFlowField showcase** | **FAIL — flat white** |
| `dotflow-showcase-chrome-dark.png`  | Chrome / dark  | **the DotFlowField showcase** | **FAIL — flat white** |
| `dotflow-showcase-safari-light.png` | Safari / light | **the DotFlowField showcase** | **FAIL — dead black** |
| `dotflow-showcase-safari-dark.png`  | Safari / dark  | **the DotFlowField showcase** | **FAIL — dead black** |
| `EVIDENCE-showcase-chrome-dark-white.png` | Chrome / dark | showcase-canvas crop | blown-out white |
| `EVIDENCE-showcase-safari-dark-black.png` | Safari / dark | showcase-canvas crop | dead black |

## Pixel census (showcase canvas region only — device box x498 y480 2066×920)

| capture | meanLuma /255 | stdLuma | chromatic % | warm % of chromatic | teal % |
|---------|---------------|---------|-------------|---------------------|--------|
| chrome-dark showcase  | **253.9** | 4.6  | 1.5  | 100 | 0 |
| chrome-light showcase | **254.1** | 2.4  | 0.6  | 100 | 0 |
| safari-dark showcase  | **4.5**   | 1.0  | 0.0  | —   | 0 |
| safari-light showcase | **4.6**   | 4.5  | 0.04 | 100 | 0 |

Reference intent (`FLOW_PRESET_AURORA_CURRENT`): a deep warm-near-black floor
(`background: { L: 0.11, C: 0.012, h: 50 }` → luma ≈ 28/255) with warm-fire ribbons advecting
through it — a mid-luma, high-structure (high stdLuma), warm-chromatic field. The captures are
either near-255 (Chrome, blown out) or near-0 (Safari, dead) with near-zero stdLuma — a flat
plate, not a flowing field.

## What DID read correctly (isolating the defect)

The route's HERO backdrop is an `<Aurora>` (StoryHero), NOT the DotFlowField. It rendered
**correctly warm + structured on BOTH engines** (hero-region census: chrome-dark meanLuma 62.5 /
stdLuma 50.0 / 13.8% warm-chromatic; safari-dark meanLuma 59.5 / stdLuma 47.9; both modes
99-100% warm, ~0% teal). So: the capture pipeline is sound, WKWebView composites live WebGL,
the warm-fire fence holds (zero teal-navy anywhere), and the failure is **isolated to the
`<DotFlowField>` viz composite**, not the page or the harness.

## defectLocalization

- **File:** `src/components/custom/dot-flow-field/` — the present-pass tone-map + trail
  accumulation on the live WebGL2 / WGSL path.
- **Primary lever:** `composables/uniformBridgeWGPU.ts` → `export const FLOW_PRESENT_KNEE = 0.6`
  (BG.W-DOTFLOW-REBUILD F7c), spliced into the Reinhard present pass
  `trail / (trail + KNEE)` in BOTH `shaders/flow-field.glsl.ts`
  (`FLOW_FIELD_PRESENT_FRAG_GLSL`) and `shaders/flow-field.render.wgsl.ts` (`fs_present`).
- **Chrome/Metal (blown white):** the additive trail buffer + dense population
  (`FLOW_PRESET_AURORA_CURRENT`: `particleCount: 12000`, `speedGlow: 1.35`) drives the trail
  magnitude high enough that the lowered knee (0.85→0.6) saturates `trail/(trail+0.6)` toward
  1.0 across the WHOLE frame — the exact "not white wash" the Reinhard comment warns against.
  White from the earliest frame (t≈800ms meanLuma 253) and stable — NOT a slow runaway, so the
  additive accumulation is over-hot from the first present. Individual motes render WHITE (they
  spill past the rounded-card clip onto the dark page as white blobs), so the warm-fire
  velocity→hue ramp is not surviving the tone-map — everything clips to white.
- **Safari/WebKit (dead black):** the SAME present path yields a near-black flat field (meanLuma
  4.5, 0% chromatic). The two-FBO feedback-fade trail + the state-texture GPGPU ping-pong
  (`FLOW_FIELD_STATE_GLSL` / `FLOW_FIELD_TRAIL_FRAG_GLSL`, `flowSetupGLFlow.ts`) appear to
  produce no visible output on WebKit's WebGL2 — a likely half-res `RGBA16F` float-target /
  `EXT_color_buffer_float` / additive-blend-into-float divergence (WebKit is stricter about
  float-renderable/blendable formats than ANGLE-Metal), so the trail never accumulates and the
  present maps an empty (or floor-only, sub-visible) buffer to black. The Aurora hero rendering
  fine on Safari rules out a blanket WebKit-WebGL snapshot limitation — this is specific to the
  DotFlowField trail/state-texture pipeline.

## mustFix (owed to the build-fix agent)

1. **Kill the white-out on Chrome/Metal.** The `FLOW_PRESENT_KNEE = 0.6` "faint-at-rest fix"
   over-corrected into a full-frame white saturation on the real-GPU additive path. Re-balance
   so the warm-fire ribbons POP off the deep warm floor WITHOUT clipping the whole frame to
   white — tune the knee against the actual trail magnitude (raise the knee, and/or scale down
   the additive deposit / `speedGlow` / trail gain, and/or clamp the pre-tone-map trail), and
   re-verify the composited mean luma lands mid-range (NOT ~255) with high stdLuma (visible
   ribbon structure) and warm-fire hue surviving the tone-map (motes read ember/amber/gold, not
   white). The gate's `FLOW_PRESENT_KNEE ≤ 0.7` floor is a source check, not a paint check — the
   correct value is whatever makes the LIVE composite read as warm-fire flow.
2. **Make the trail/state pipeline paint on Safari/WebKit.** The DotFlowField renders dead-black
   on WebKit while the Aurora hero renders fine. Audit the WebGL2 float-target path
   (`flowSetupGLFlow.ts` two-FBO trail + state-texture ping-pong): confirm the half-res
   `RGBA16F` trail targets are color-renderable AND blendable under WebKit (WebKit needs
   `EXT_color_buffer_float` + `EXT_float_blend` for additive blend into a float target; a
   missing/undetected extension silently no-ops the accumulation), and that the GPGPU state
   textures are readable/writable on WebKit. Fall back gracefully (a lower-precision target or a
   detected-degrade path) rather than a black frame.
3. **Re-verify BOTH engines BOTH modes** paint the reference flowing warm-fire dot-wave (mid-luma
   warm-chromatic field with visible advected streamline structure, zero teal-navy) before
   re-flipping to PAINT-PENDING for a re-judge. The gate stays GREEN through this — it is not the
   arbiter; the live dual-engine composite is.

## Notes for the re-judge

- The capture harness, `:5200` built bytes, and both engines are proven this session (the Aurora
  hero is the working control). Re-run the same capture set; the diagnostic threshold is the
  showcase-canvas-region census (device box x498 y480 2066×920 at the y=240 scroll position):
  PASS wants meanLuma roughly mid-range, stdLuma well above the ~2-5 flat-plate floor, warm % of
  chromatic ≈ 100, teal ≈ 0, on all four (engine × mode) captures.
