# BG.W-CONCENTRIC-LEVELCURVES — dual-engine paint judge DELTA (re-judge after F9.R3 **LC6 content-visibility** capture-fix)

> ## POST-DELTA UPDATE (2026-07-09, orchestrator, no-agent local diagnosis) — the ROOT-CAUSE fix LANDED after this capture
> This FAIL DELTA was captured at commit `fa948297`. The **actual root cause it named in mustFix#1** — a DYNAMIC
> local-array index `corners[vi]` in the vertex path that MISCOMPILES on WebKit's Metal WGSL backend into a
> degenerate covering triangle (INIT succeeds, DRAW rasterizes no fragments → the "silent blank" cream plate) —
> was FIXED at commit **`0d280422`** (a DESCENDANT of `fa948297`, verified via `git merge-base --is-ancestor`).
> The `0d280422` diff replaces `corners[vi]` with SCALAR BRANCHES (`if (vi == 1u) … else if (vi == 2u) …`,
> `concentric.wgsl.ts:78-84`), which is **byte-for-byte the same idiom the dot-flow-field shader uses**
> (`flow-field.wgsl.ts:140-141`) — and dot-flow-field paint-PASSes on WebKit. So the fail history is NOT three
> attempts at the same defect: it is (1) LC6 content-visibility (a red herring, disproven in THIS DELTA), (2) F9.R3
> derivative-free `contourInk` + static-index palette (necessary WebKit-Metal hardening, but insufficient alone),
> (3) `0d280422` the vertex scalar-branch — **the true root cause, which has NEVER been re-painted** (the weekly
> quota cap hit immediately after the commit). **Expectation: the next dual-engine re-paint PASSES WebKit.** If it
> still blanks, the NEXT suspect (per mustFix#1's list, everything else being addressed) is a WGSL uniform-struct
> alignment divergence in `uniformBridgeWGPU.ts` packing vs the working aurora setup — bisect concentric's
> `ConcentricUniforms` layout against aurora's. Do NOT re-chase content-visibility (disproven) or the vertex path
> (fixed). This corrects the record per mustFix#2.



**Verdict: FAIL** (one blocking defect UNRESOLVED — paint owed; the wave routes to a build-FIX agent).
**Route:** `/substrates/concentric`
**Judged:** non-authoring paint judge, BUILT bytes (`demo:dist:build` → `vite preview :5200`), dual-engine (real Chrome.app ANGLE/Metal via CDP + system WebKit.framework off-screen WKWebView snapshot, tall 1440×1900→2880×3800 retina), both modes, over the proven C18 `?capture=<route>&mode=<m>` + `data-capture-ready` method.
**Siblings-intact:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
**Re-judge context:** this run re-judges the current BUILT bytes after commit `fa948297` (F9.R3 **LC6 content-visibility capture-fix** — `demo/capture/capture.css` generalizes the lone `.aurora-root` force-visible rule to the whole viz-wrapper set incl. `.concentric-wrapper`, so a below-fold viz is `content-visibility: visible !important; contain: none !important` at capture time). **The wave row's this-commit claim — "the TRUE dual-engine 'silent blank' root cause is the CONTENT-VISIBILITY skip, NOT a shader/exp defect" — is EMPIRICALLY FALSIFIED by this capture.** DEFECT 2 (Chrome dashing) stays FIXED. DEFECT 1 (WebKit blank) is **STILL PRESENT** — the LC6 fix did NOT restore WebKit paint.

## Provenance (engine badges decoded)
- **Chrome:** `glRenderer = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real Metal GPU, NOT headless SwiftShader.
- **Safari (system WebKit.framework off-screen WKWebView):** badge decoded in-pixel `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×1900 @2x (2880×3800px) · MODE LIGHT/DARK · route SUBSTRATES · CONCENTRIC · @mkbabb/glass-ui/concentric` — system Safari 26 engine, real Apple GPU. `navigator.gpu` present → the WebGPU-PRIMARY (WGSL) path.

## Summary
The criteria require, **dual-engine both modes**, that concentric read as smooth NESTED level curves of one procedural height field — continuous unbroken contour bands, index/minor hierarchy legible, zero jagged/torn arcs at 2880×1800; a bounded traveling-wave flow; a smooth pointer gesture; **and PASS only when every surface in BOTH engines + BOTH modes reads correct.** Concentric renders CORRECT in Chrome but BLANK in WebKit (a flat cream rounded plate), BOTH modes → **FAIL.** The load-bearing repair the wave row names ("the TRUE root cause is CONTENT-VISIBILITY") is DISPROVEN: the wrapper is now `content-visibility: visible` (verified live in the DOM) and WebKit still blanks, while the AURORA control on the SAME substrate + SAME capture method + SAME build paints richly.

### DEFECT 1 (BLOCKING, UNRESOLVED) — concentric renders BLANK in WebKit/Safari, BOTH modes
The concentric hero canvas paints NOTHING in WebKit — a flat cream rounded plate. The LC6 content-visibility fix is LIVE and did not help:

- **Chrome DOM check (LC6 rule confirmed applied):** `.concentric-wrapper` computed `content-visibility: visible` + `contain: none` (the LC6 capture.css rule IS reaching the wrapper; `canvasCount: 2`, concentric canvas 673×718 present + armed).
- **System WebKit off-screen WKWebView snapshot** (`lc6-conc-safari-{light,dark}-tall.png`, 2880×3800; hero crop `lc6-conc-safari-{light,dark}-hero.png`, retina region x0=498 y0=1896 1346×1436): concentric hero **light `meanL 0.9492 · stdL 0.0048 · edge 0.00021`** / **dark `meanL 0.9490 · stdL 0.0146 · edge 0.00030`** — flat cream, zero contour structure (visual: a solid cream rounded plate in BOTH modes; the dark canvas clears to cream `meanL≈0.949`, it is NOT painting the dark field). This is essentially IDENTICAL to the prior-cut blank (`stdL 0.007/0.022`) — the LC6 fix moved the number by noise, not by paint.
- **AURORA control — same WKWebView, same build, same capture** (`/substrates/aurora`, `lc6-aurora-safari-dark-control.png` + crop `lc6-aurora-safari-dark-ctrl-crop.png`): **paints richly** — `meanL 0.6522 · stdL 0.1572 · edge 0.01318`, a vivid warm painterly gradient field with nuclei markers + the full Aurora Studio configurator. **So WebKit's GPU + the off-screen snapshot render GPU content correctly on THIS build; the blank is concentric-specific, NOT a WKWebView/GPU/content-visibility capture limitation.**

**The LC6 premise is EMPIRICALLY CONTRADICTED.** LC6 claimed the WebKit blank was a below-fold `content-visibility` render-skip that never laid out in the off-screen snapshot. But (a) the wrapper is now force-`visible`/`contain:none` (verified in the DOM) and (b) the aurora control — which was ALSO below chrome and force-visible by the same generalized rule — paints, while concentric on the identical `createGpuSubstrate` blanks. A content-visibility skip cannot selectively blank one viz and paint another under the identical force-visible rule. **The blank is a genuine concentric shader/substrate defect on WebKit-Metal, unchanged by the capture-CSS edit.**

### DEFECT 2 (Chrome dashed contours) — FIXED ✅ (holds)
In Chrome (ANGLE/Metal M5 Max) concentric paints smooth NESTED level curves of one procedural height field — every contour a **continuous unbroken band**, analytic hillshade relief (warm-amber ridges / cool-cream basins), the two-tier index/minor hierarchy legible, zero jagged/torn arcs. Hero (`lc6-conc-chrome-{light,dark}-hero.png`, 672×718): **light `meanL 0.7795 · stdL 0.0891 · edge 0.03363`**, **dark `meanL 0.7793 · stdL 0.0897 · edge 0.03346`** — richly structured, ~110–160× the WebKit-blank edge energy. Visually confirmed continuous nested contours in both modes (no dashing/tearing).

## What WORKS (Chrome — the field math / AA / palette are healthy)
- **Smooth continuous nested level curves, both modes** (L1 single-field `contourInk` + L3 no-aliasing/no-seam/AA-held read correct in Chrome).
- **Palette (L4).** The demo uses the consumer preset (`CONCENTRIC_PRESET_WARM`), respected verbatim in both modes by design (warm-amber R229/G195/B138), so light≈dark is EXPECTED — not a defect.
- **Page chrome intact, both engines.** Recessive paper-grid background (no conic banding, no oversaturation), hero "Concentric" title fits its envelope, Configurator (Contours/wave/cursor) + dock nav render correctly in BOTH engines. The blank is isolated to the concentric viz canvas.

## Computed checks
| check | Chrome light | Chrome dark | WebKit(system,WGPU) light | WebKit(system,WGPU) dark | WebKit AURORA ctrl (dark) |
|---|---|---|---|---|---|
| data-capture-ready | yes (3.75s) | yes (3.75s) | yes (4.5s) | yes (4.5s) | yes |
| canvasCount / mainChildren | 2 / 2 | 2 / 2 | 2 | 2 | — |
| .concentric-wrapper content-visibility | **visible** (LC6 live) | **visible** | visible (rule shared) | visible | n/a |
| concentric hero meanL | 0.780 | 0.779 | 0.949 (blank) | 0.949 (blank) | — |
| concentric hero stdL | 0.089 | 0.090 | **0.0048** | **0.0146** | 0.157 (paints) |
| concentric hero edge | 0.03363 | 0.03346 | **0.00021** | **0.00030** | 0.01318 (paints) |
| verdict | PASS | PASS | **BLANK** | **BLANK** | control paints |

## Traveling-wave flow / PRM / pointer
Not separately certified this run — the verdict is already FAIL on DEFECT 1 (a blank canvas has no flow to measure, no pointer heave to deform, and no PRM static-frame to certify). The Chrome flow/PRM/pointer arms are owed at re-judge once WebKit paints.

## Evidence (all resolve on disk under `docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint/`)
- `lc6-conc-chrome-light-full.png` / `lc6-conc-chrome-dark-full.png` (1440×2000) — full-context Chrome, engine-probe ANGLE-Metal, concentric in-frame.
- `lc6-conc-chrome-light-hero.png` / `lc6-conc-chrome-dark-hero.png` (672×718) — the FIXED continuous-contour hero, both modes (Chrome PASS).
- `lc6-conc-safari-light-tall.png` / `lc6-conc-safari-dark-tall.png` (2880×3800) — system WebKit tall capture, WEBKIT badge decoded; chrome renders, concentric canvas BLANK.
- `lc6-conc-safari-light-hero.png` / `lc6-conc-safari-dark-hero.png` (1346×1436) — WebKit BLANK concentric plate (flat cream, both modes).
- `lc6-aurora-safari-dark-control.png` (2880×3800) + `lc6-aurora-safari-dark-ctrl-crop.png` (1200×1200) — **the control**: aurora paints on the SAME WKWebView + build (proves WebKit GPU + capture work; the blank is concentric-specific).
- capture tooling: `lc6-chrome.mjs`, `lc6-stats.mjs`, `lc6-crop.mjs`, and the repo-local `wkshot-concentric.m` (compiled to a throwaway repo-local binary, deleted post-run; never /tmp).

## defectLocalization
- **The LC6 content-visibility root-cause hypothesis is WRONG — do NOT chase another capture-CSS edit.** Proof: the wrapper is force-`content-visibility: visible; contain: none` (verified in the DOM) AND the aurora control under the identical generalized force-visible rule paints in the same snapshot, while concentric blanks. The blank is in concentric's shader/substrate path, not the capture harness.
- **Files:** the concentric shader/substrate path — `src/components/custom/concentric/shaders/concentric.wgsl.ts` (WebGPU-PRIMARY, the path system WebKit selects with `navigator.gpu` present) + `src/components/custom/concentric/shaders/concentric.glsl.ts` (WebGL2 fallback) + their setup (`concentricWGPUSetup.ts` / `concentricGLSetup.ts`) + `useConcentric.ts` + the `levelField.ts` / shared `waveField` leaf they sample + `useGpuSubstrate` selection.
- **Symptom:** error-free context, NO console/page error, but composited output is a flat cream plate (`stdL≈0.005–0.015`, `edge≈0.0002`) in BOTH modes on the WebGPU-primary path. Aurora on the identical `createGpuSubstrate` paints in the SAME WebKit engine → the divergence is concentric's shader/setup, not the substrate.
- **Prior-fix insufficiency (cumulative):** F9.R3 P1 (derivative-free `contourInk`, single `fwidth` hoist) + P2 (static-index palette unroll) landed in both shaders but the blank persisted; then LC6 (content-visibility force-visible) landed and the blank STILL persists. Neither the two Metal-codegen hazards NOR the capture-CSS were the cause. Chase a DIFFERENT WebKit-Metal divergence present in the concentric WGSL (and GLSL) path but ABSENT from the working aurora path.

## mustFix[]
1. **WebKit paint (BLOCKING).** Make concentric render in WebKit/Safari on the WebGPU-PRIMARY WGSL path (system Safari 26, `navigator.gpu` present) AND the WebGL2 GLSL fallback. Diagnostic method: bisect the concentric WGSL/GLSL path against the WORKING aurora path on WebKit — issue a solid-color debug frag FIRST to confirm the draw reaches the framebuffer (isolate draw-not-issued vs frag-collapses-to-transparent/degenerate), then bound/repair the construct that collapses concentric's output on WebKit-Metal but not ANGLE-Metal. **Readback trap:** `readPixels` reads 0 without `preserveDrawingBuffer` (non-diagnostic) — verify via the composited element-screenshot / WKWebView snapshot (`stdL`/`edge`), NOT `readPixels`. Suspects surviving an error-free compile/link: an unbounded fast-math NaN (`pow`/`log`/`1.0/x`/`normalize(0)`/`sqrt(neg)`/`inversesqrt`) in the level-set/hillshade/waveField path; a WGSL uniform-struct alignment (std140/WGSL) divergence vs the aurora setup (`uniformBridgeWGPU` packing); a non-constant array index or integer `%` WebKit-Metal rejects at codegen but ANGLE tolerates; the fullscreen-triangle vertex path not covering the viewport on WebKit; a substrate-selection path that arms but never issues the concentric draw.
2. **Correct the record.** The wave row + `proof:concentric` LC6 clause encode "content-visibility is the root cause." That premise is falsified here — the capture-CSS generalization is a harmless capture-hygiene improvement (it correctly force-visibles below-fold vizzes) but it does NOT fix concentric's WebKit paint, and the gate/wave note should stop attributing the blank to content-visibility.
3. **Re-judge dual-engine both-modes π after (1).** Re-confirm the Chrome continuous-contour arm survives, then certify the WebKit paint (hero `stdL` in the Chrome range `> ~0.05`, `edge > ~0.008`, structured, parity with the working aurora), the bounded traveling-wave flow (per-frame ΔmeanLum bounded, both engines), the pointer enter→sweep→flick→leave smooth-at-every-frame series, and the PRM one deterministic static frame.
