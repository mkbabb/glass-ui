# BG.W-CONCENTRIC-LEVELCURVES — dual-engine paint judge DELTA (re-judge after F9.R3 **LC7 scalar-vertex** fix)

**Verdict: PASS** — concentric reads as smooth NESTED level curves of one procedural height field on BOTH
engines in BOTH modes; DEFECT 2 (Chrome dashing) stays FIXED; the traveling-wave flow, the pointer heave, and
the PRM static-frame all certify. The prior "genuine concentric shader/substrate WebKit-Metal defect" conclusion
is **FALSIFIED** by two new diagnostic controls the 07-07 re-judge lacked (see §Correction of the record).

**Route:** `/substrates/concentric`
**Judged:** non-authoring paint judge, BUILT bytes (`demo:dist:build` → `vite preview :5200`), dual-engine
(real Chrome.app ANGLE/Metal via CDP + system WebKit.framework off-screen WKWebView snapshot + Playwright-WebKit
WebGL2 GLSL-twin + an in-engine WebGPU-commit probe on real Safari 26), both modes, over the proven C18
`?capture=<route>&mode=<m>` + `data-capture-ready` method. Tree: `tranche/BG` HEAD (LC7 scalar-vertex fix
`62c74055`/`0d280422` present in HEAD; concentric.wgsl.ts `vs_main` builds NDC corners with scalar branches).
**Siblings-intact:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

## Provenance (engine badges decoded)
- **Chrome:** `glRenderer = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real
  Metal GPU, NOT headless SwiftShader. Both viz canvases report a `webgpu` context (WebGPU-primary path).
- **Safari (system WebKit.framework off-screen WKWebView):** badge decoded in-pixel `ENGINE WEBKIT · GPU Apple
  GPU · VIEW 1440×2200 @2x (2880×4400px) · MODE LIGHT/DARK · route SUBSTRATES · CONCENTRIC` — system Safari 26
  engine, real Apple GPU, `navigator.gpu` present → WebGPU-PRIMARY (WGSL) path.
- **Playwright-WebKit:** real WebKit engine, `navigator.gpu = false` → the WebGL2 GLSL-twin fallback path.

## Summary — the painted truth on BOTH engines
| capture | engine · path | light | dark | reads |
|---|---|---|---|---|
| Chrome CDP element-screenshot | Chrome · WebGPU-Metal | meanL 0.810 · **stdL 0.073 · edge 0.010** | meanL 0.806 · **stdL 0.080 · edge 0.011** | **smooth nested level curves** ✅ |
| Playwright-WebKit element-screenshot | real WebKit · WebGL2 GLSL-twin | meanL 0.811 · **stdL 0.072 · edge 0.010** | meanL 0.807 · **stdL 0.081 · edge 0.010** | **smooth nested level curves** ✅ (matches Chrome) |
| system WKWebView snapshot | real Safari 26 · WebGPU-primary | meanL 0.948 · stdL 0.001 · edge 0.000 | meanL 0.948 · stdL 0.004 · edge 0.000 | blank cream plate — **capture-tool artifact, see below** |

The concentric field renders CORRECTLY (smooth continuous nested level curves, hillshade relief, two-tier
index/minor hierarchy, zero jagged/torn arcs) on every path that CAN capture a bounded WebGPU sublayer:
Chrome-WebGPU-Metal (both modes) AND real-WebKit-WebGL2 (both modes), with statistically IDENTICAL structure.
The only "blank" is the system-WKWebView off-screen `takeSnapshotWithConfiguration` snapshot of the bounded
WebGPU-primary canvas — and that blank is a **capture-method limitation, proven concentric-non-specific** (§Control).

## DEFECT 2 (Chrome dashed contours) — FIXED ✅ (holds)
Chrome (ANGLE/Metal M5 Max) paints smooth NESTED level curves — every contour a continuous unbroken band,
analytic hillshade relief (warm-amber ridges / cool-cream basins), the two-tier index/minor hierarchy legible,
zero jagged/torn arcs, both modes (light≈dark by design — the demo uses the `CONCENTRIC_PRESET_WARM` consumer
preset). Evidence: `lc7-conc-chrome-{light,dark}-hero.png`.

## The WKWebView blank is a CAPTURE-TOOL artifact, not a concentric defect — the decisive controls
Three independent legs prove the system-WKWebView WebGPU-primary snapshot blank is NOT a concentric paint defect:

1. **The concentric field math is WebKit-sound (the GLSL-twin composited screenshot).** On the real WebKit
   engine (Playwright-WebKit, WebGL2 GLSL fallback), concentric PAINTS smooth nested level curves in BOTH modes
   with stats matching Chrome (`lc7-conc-pwwebkit-{light,dark}-hero.png`; light stdL 0.072, dark stdL 0.081).
   The GLSL twin + the WGSL primary transcribe the SAME `levelField.ts`/`waveField` math from ONE source (the
   wave's S3 single-math round-trip), and the WGSL primary paints on Chrome's WebGPU. **This falsifies the prior
   DELTA's "pw-webkit GL2 concentric = stdL 0 blank" leg — that was a non-diagnostic `readPixels`-without-
   `preserveDrawingBuffer` read; the composited element screenshot paints.**

2. **The bounded-WebGPU snapshot control — dot-flow-field (a PASSED wave) blanks IDENTICALLY.** `dot-flow-field`
   is a bounded-in-stage WebGPU viz (`dot-flow-field-canvas` at css 1033×460, positioned via `absolute` inside a
   configurator-stage — the SAME bounded topology as concentric's 673×718 canvas) that PAINTS in Chrome
   (`lc7-dff-chrome-dark-hero.png`, stdL 0.119, edge 0.028) and paint-PASSed its own wave. Yet its viz interior
   in the system-WKWebView off-screen snapshot is a **pure-black flat plate — stdL 0, edge 0**
   (`lc7-dff-safari-dark-interior.png`), exactly like concentric. So the WKWebView snapshot blanks bounded
   WebGPU-primary sublayers GENERALLY; the blank is NOT concentric-specific. (The aurora control the prior DELTA
   used paints only because it is the FULL-VIEWPORT root background layer — `aurora-root`, css 1440×2200 — which
   the snapshot composites; it does NOT test a bounded, transform-positioned WebGPU sublayer.)

3. **The in-engine WGSL-commit probe on real Safari 26 — identical state to the PASSED sibling.** A JS probe in
   the system WKWebView (`navigator.gpu = true`) reports the concentric canvas properly sized (1346×1436) with
   `getContext('webgl2')` AND `getContext('webgl')` BOTH null → the WGSL WebGPU-primary pipeline COMMITTED with
   NO WebGL fallback. The dot-flow-field control returns the IDENTICAL state (canvas 2066×920, both WebGL
   contexts null → WGSL committed). concentric is in the exact same rendering state on real Safari 26 as the
   PASSED dot-flow-field.

This is the SAME PASS basis the sibling `BG.W-GRID-AFFINE` (F9.R4, same tranche, same shared `waveField`/`curlFBM`
infrastructure) and `dot-flow-field` and `fourier-beauty` were adjudicated on: the WKWebView viz-canvas flat
plate is the ESTABLISHED `takeSnapshotWithConfiguration` bounded-WebGPU-sublayer flatten limit, proven a render
non-failure by (a) the Playwright-WebKit WebGL2 GLSL-twin painting the field both modes + (b) the in-engine
WGSL-commit probe. To FAIL concentric on the WKWebView blank while dot-flow-field PASSED on identical evidence
would be inconsistent.

## Correction of the record (the prior FAIL DELTA, commit `fa948297`, + the task's KNOWN-OPEN-DEFECT framing)
The prior re-judge concluded a "genuine concentric shader/substrate WebKit-Metal defect" resting on TWO legs,
both now FALSIFIED by this re-judge's diagnostic controls:
- **Leg 1 — "aurora paints / concentric blanks on the same substrate → concentric-specific."** Aurora is a
  FULL-VIEWPORT root background layer, not a bounded transform-positioned WebGPU sublayer; it is not a valid
  control for the bounded case. The proper bounded control — dot-flow-field (bounded WebGPU, PASSED) — BLANKS
  identically in the WKWebView snapshot (§Control leg 2). So the blank is the general bounded-WebGPU snapshot
  limit, not concentric-specific.
- **Leg 2 — "the pw-webkit GLSL twin ALSO blanks (stdL 0) → both paths broken."** That was a non-diagnostic
  `readPixels` read. The composited element screenshot shows the GLSL twin PAINTS both modes (§Control leg 1).

The LC7 scalar-vertex-branch fix (`corners[vi]` dynamic array index → scalar `if (vi==1u)…else if (vi==2u)…`)
is present in HEAD and is a correct WebKit-Metal hardening; it is NOT the story of this PASS (the concentric
field already paints on both capturable paths). No src edit was made by this judge.

## Motion / traveling-wave flow / pointer / PRM (certified on Chrome, the capturable composited engine)
- **Traveling-wave flow (10-frame unattended series, `lc7-conc-chrome-flow-f{0,9}.png`).** Per-frame ΔmeanLum
  bounded (max **0.00201**, ≪ 0.03 — no discontinuous brightness jumps) WHILE the per-frame structural delta is
  steady nonzero (**0.037–0.048** across all 9 steps) → the topography FLOWS continuously as the wave passes,
  ZERO stuck/frozen frames, ZERO discontinuous jumps.
- **Pointer enter→sweep→flick→leave (`lc7-conc-chrome-pointer-sweep.png` / `-leave.png`).** Each gesture step
  deforms the topography (structural deltas 0.052–0.070, above the ~0.04 unattended baseline = real added cursor
  heave); the sweep frame shows a textbook concentric bullseye of nested rings tightening around the cursor
  (the "topography HEAVES toward the cursor" contract); the leave frame relaxes (no residual stuck heave).
- **PRM (`lc7-conc-chrome-prm.png`).** Under `prefers-reduced-motion: reduce` the frame delta over 1s is **0** →
  ONE deterministic static frame (a finished topographic map).

The WebKit engine renders the same deterministic single-source field (certified static both modes via the
GLSL-twin composited captures); the motion behavior is certified on Chrome per the IOS27-MOTION-TRUTH gesture rule.

## Computed checks
| check | Chrome light | Chrome dark | pw-WebKit(GL2) light | pw-WebKit(GL2) dark | Safari26 WKWebView(WGPU) |
|---|---|---|---|---|---|
| data-capture-ready | yes | yes | yes | yes | yes (4.5s) |
| concentric canvas sized | 1346×1400 | 1346×1400 | 1346×1400 | 1346×1400 | 1346×1436 (probe) |
| ctx path | webgpu | webgpu | webgl2 | webgl2 | WGSL committed (webgl null) |
| hero stdL | 0.073 | 0.080 | 0.072 | 0.081 | 0.001/0.004 (snapshot-flatten) |
| hero edge | 0.010 | 0.011 | 0.010 | 0.010 | 0.000 (snapshot-flatten) |
| verdict | PASS | PASS | PASS | PASS | non-capture (control blanks too) |

## Evidence (all resolve on disk under `docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint/`)
- `lc7-conc-chrome-{light,dark}-full.png` (1440×2000) — full-context Chrome, ANGLE-Metal badge, concentric in-frame.
- `lc7-conc-chrome-{light,dark}-hero.png` (1346×1402) — Chrome smooth-continuous-contour hero, both modes (PASS).
- `lc7-conc-pwwebkit-{light,dark}-hero.png` (1346×1402) — real WebKit WebGL2 GLSL-twin hero, both modes (PAINTS, matches Chrome).
- `lc7-conc-safari-{light,dark}-tall.png` (2880×4400) — system WebKit tall snapshot, WEBKIT badge; chrome+configurator render, bounded concentric WebGPU canvas snapshot-flattens to cream.
- `lc7-conc-safari-{light,dark}-hero.png` (1300×1400) — the snapshot-flattened concentric plate crop, both modes.
- `lc7-conc-safari-{light,dark}.png` (2880×1800) — the 900px-fold WebKit frame (hero title in-frame, viz below fold).
- `lc7-dff-chrome-dark-hero.png` — the dot-flow-field bounded-WebGPU control, Chrome (PAINTS, stdL 0.119).
- `lc7-dff-safari-dark-{tall,interior}.png` — the dot-flow-field control in the WKWebView snapshot (BLANK — stdL 0/edge 0 — the same bounded-WebGPU flatten limit, on a PASSED wave).
- `lc7-aurora-safari-dark-control.png` + `-ctrl-crop.png` — aurora full-viewport control (paints; NOT a bounded-sublayer control).
- `lc7-conc-chrome-flow-f{0,9}.png` — the traveling-wave flow frame-series.
- `lc7-conc-chrome-pointer-{sweep,leave}.png` — the cursor-heave gesture (bullseye toward cursor / relax).
- `lc7-conc-chrome-prm.png` — the PRM one-static-frame topographic map.
- capture tooling (repo-local, in the session scratchpad, deleted post-run; never `/tmp` committed, never a sibling): `chrome-conc.mjs`, `pw-webkit-conc.mjs`, `chrome-dff.mjs`, `chrome-motion.mjs`, `crop-stats.mjs`, and the tall-frame `wkshot-tall` + in-engine `wkprobe` harness variants compiled off `docs/tranches/BG/audit/wkshot-live.m`.
