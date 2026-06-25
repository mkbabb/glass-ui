# Pass-E · substrates/aurora — COMPONENT deep audit

**Page:** `demo/stories/substrates/aurora.vue` (`import @mkbabb/glass-ui/aurora`)
**Real component(s) audited:** `src/components/custom/aurora/Aurora.vue` (290L) + the composable seam — `composables/useAurora.ts` (368L), `runtime.ts` (499L), `frameLoop.ts` (143L), `glSetup.ts` (120L), `uniformBridge.ts` (311L), `uniformBridgeWGPU.ts` (225L), `cursorModel.ts` (126L), `useCursorInteraction.ts` (236L), `wgpuSetup.ts` (223L), `auroraFallbackGround.ts` (369L) — and the shaders: `constants/shaders/aurora.frag.ts` (the WebGL2 fallback), `aurora.wgsl.ts` (the WebGPU primary), `aurora-mediums.wgsl.ts` (313L), `mediums.glsl.ts`/`oil-modes.glsl.ts`/`vangogh-medium.glsl.ts`/`brush.glsl.ts` (the GLSL stroke engine), and the shared `procedural-color.{glsl,wgsl}.ts` + `flow.{glsl,wgsl}.ts` color/curl chunks.

Lens: ANIMATION affordance · procedural-viz spec (PROCEDURAL-SUITE) · performance · Safari · idiomatic/no-legacy · the glass six-layer composite. Mapped to FOLD/MODIFY/AUGMENT/PRUNE on the existing BD tranche.

---

## 1 · ANIMATION — four-state + spring + entrance/exit (per motion-canon)

Aurora is a **non-interactive procedural BACKGROUND**, so the four-state interactive contract (rest/hover/active/disabled) is N/A by design — it is decorative chrome with `aria-hidden="true"` on both layers. Its animation affordance is the *procedural drift + entrance + pointer-reactivity* axis, and that axis is **strong + idiomatic**:

- **Entrance is the right pattern.** The CSS-gradient (or luminance-faithful) placeholder paints frame-0 with zero JS/zero GPU; the WebGL/WebGPU canvas cross-fades in over it once armed via a **pure CSS `opacity` transition** (`--duration-slow var(--ease-standard)`, `Aurora.vue:276-283`) — no rAF/timer choreography. This is motion-canon P5 compositor-only (only `opacity` animates) and P6-honest (PRM collapses the transition to `1ms`, `:285-289`).
- **Pointer-reactivity is alive + layered.** The cursor drives an eased attraction (`cursorModel.advanceCursor`), a velocity swirl-burst (`injectCursorVelocity`), AND the BC.W-VIZ-AURORA T5 shared `usePointerVelocityField` ACCELERATION term for the iOS-27 gel snap-back (a flick that decelerates injects a transient over-warp that springs back, `frameLoop.ts:131-136`). The field owns no own rAF — it is `tick(deltaMs)`-fed from the existing frame callback (the one-loop discipline).
- **The demand gate is exemplary.** `needsAnimation()` (`frameLoop.ts:101-113`) parks the loop at steady-state (all four drift uniforms 0 AND cursor settled within ε — the next frame would be pixel-identical) and re-arms via `wake()` on any config/cursor change. No dead/janky/missing animation.

**No animation findings.** The procedural-drift + entrance + pointer-reactivity bar is MET.

## 2 · PROCEDURAL VIZ — adherence to PROCEDURAL-SUITE + GPU/Safari bar

Aurora is **suite member rank 1 — MIGRATED** (the cleanest WGSL port). It is largely spec-compliant, with ONE genuine cross-backend parity gap and ONE deferred-fidelity gap, both already booked in BD:

- **Shared discipline: PASS.** ONE lifecycle leaf (`createGpuSubstrate` → `createCanvasLifecycle`, zero scheduling re-fork in `runtime.ts`); offscreen-pause via `useIntersectionPause` + `content-visibility:auto`; live-PRM one-static-frame-then-park (the substrate owns the `matchMedia` `change` re-monitor, G1); consumer-owned DPR (`resolveAuroraWashDpr()` 1.5× wash ceiling, `runtime.ts:292`); cited-SOTA math (fbm/OKLCh nuclei field + Bridson curl warp). The shared `procedural-color.{glsl,wgsl}.ts` color chunk is ONE source per backend (no cross-backend color drift by construction).
- **GAP 1 — the WGSL `warpMode == 3` curl branch is MISSING.** `aurora.frag.ts:290` has the Bridson curl-noise (`uWarpMode == 3`) branch; `aurora.wgsl.ts` `domainWarp()` does NOT — a `warpMode:'curl'` config on a WebGPU host silently degrades to fbm. The `CURL_FBM_WGSL` chunk already ships (`flow.wgsl.ts`). This is a mechanical splice. → **already scoped: BD.W-AURORA-WGSL-CURL.**
- **GAP 2 — the WGSL per-dab STROKE cascade is a Kuwahara stand-in.** On a Safari-26 WebGPU host, `medium:'vangogh'|'oil'|'oil-pastel'` renders the single-pass anisotropic-Kuwahara *finish* (`aurora-mediums.wgsl.ts:305-309`), NOT the real per-dab Starry-Night stroke read the `.frag` paints (`bestOil`/`paintOver`/`StrokeProfile`/`relight`). → **already scoped: BD.W-AURORA-WGSL-STROKES.**
- **The Kuwahara CEILING (multi-pass FBO) is honestly deferred** as a USER-HINGE decision wave, not auto-built. → **BD.W-AURORA-KUWAHARA-MULTIPASS** (decision-first).

## 3 · PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

**Strong.** No layout-thrash found.

- **Compositor-only chrome.** The only animated CSS property is `opacity` (`Aurora.vue:276`). `contain: content` + `content-visibility: auto` + `contain-intrinsic-size: auto 600px` isolate the WebGL surface as its own compositing root (50-80% paint-area reduction) and let the browser content-skip + park the rAF when offscreen. The `auto 600px` block fallback is the correct fix for the content-visibility zero-height-skip → 1px-sliver-black-band trap (well documented in-source).
- **Lazy-arm is honest.** Shader compile+link is deferred past first paint via `scheduleAfterFirstPaint` (`requestIdleCallback`, Safari double-rAF+macrotask fallback), gated on the FIRST viewport intersection — the shader never compiles while offscreen. Eager/capture consumers opt out.
- **No-op resize guard** (`runtime.ts:312`) skips the buffer realloc when dimensions match — avoids needlessly clearing the drawing buffer on every ResizeObserver tick. The double-rAF belt-and-suspenders resize defends the first-paint layout race.
- **Minor finding (perf hygiene):** the `pointermove` listener (`useCursorInteraction.ts:223`) is registered WITHOUT `{ passive: true }`. The handler never calls `preventDefault`, so a passive flag is safe + idiomatic and lets Safari/Chromium keep the gesture off the main-input-blocking path. Low severity. → **AUGMENT.**

## 4 · SAFARI compatibility

**Good, with the WGSL-medium gap.**

- `requestIdleCallback` absence on Safari is handled (double-rAF + `setTimeout(0)` fallback, `useAurora.ts:93-108`).
- `getBoundingClientRect`-based sizing (not `clientWidth`/`Height`) survives the content-visibility skip — Safari-safe.
- The software-raster wedge guard (`isSoftwareWebGLRenderer()`) + the luminance-faithful CSS fallback ground keep a SwiftShader/llvmpipe Safari from page-wedging.
- **Safari-specific viz gap:** Safari-26 is a WebGPU host, so it hits the WGSL primary — where the curl warp degrades (GAP 1) and the oil/vangogh mediums render the Kuwahara stand-in (GAP 2). A Safari user selecting `medium:'vangogh'` gets the finish, not the per-dab read. Both gaps are BD-scoped (CURL/STROKES). The binding real-Metal-GPU parity readback (which would catch a Safari-26 WGSL compile divergence like the goo-blob `var target` reserved-keyword / non-uniform `fwidth` class) is the deferred **BD.W-VIZ-PARITY-METAL** — the sequencing gate before any band-3 parity claim.

## 5 · IDIOMATIC / no-legacy

**Clean — no workaround/dead-code/dual-path to transpose.** The runtime is a well-factored four-seam composition (glSetup/uniformBridge/cursorModel/frameLoop) over the shared substrate; the WebGPU-first/WebGL2-fallback dual-substrate is the SANCTIONED dual-path (graceful-tail, not legacy), gate-locked by `proof:gpu-substrate-single` (no-deleted-fallback). The init-failure contract (O inv-24) + the software-raster wedge catch are principled, not patches. `setReducedMotion` is a retained public wake()-nudge (documented, not dead). No findings.

## 6 · The glass SIX-LAYER composite

**N/A at the component — correct.** Aurora is the COLORFUL BACKDROP the glass six-layer composite reads THROUGH (glass-cannot-sample-glass: aurora is the non-glass substrate). The component's job is to BE the rich colorful field; the six-layer composite is the dock/card/panel surfaces floating over it (audited per their own pages). The user's "glass demos over colorful aurora backgrounds" is the *demo-page* concern (the demo wraps glass specimens over `<AuroraStage>`), not a component gap — recorded for the demo-side Pass-E (`substrates-aurora-demo.md`), not here.

---

## FOLD / MODIFY / AUGMENT / PRUNE — mapped to BD

| # | Finding | Disposition | BD wave |
|---|---|---|---|
| 1 | WGSL `warpMode==3` curl branch missing (frag has it) — `warpMode:'curl'` degrades to fbm on WebGPU/Safari | **FOLD** (already scoped, mechanical splice) | **BD.W-AURORA-WGSL-CURL** |
| 2 | WGSL oil/vangogh/oil-pastel = Kuwahara finish stand-in, not per-dab strokes (Safari-26 WebGPU) | **FOLD** (already scoped) | **BD.W-AURORA-WGSL-STROKES** |
| 3 | No binding real-Metal-GPU parity readback — all parity records are device-free structural proxies (ΔE 0.0 tautological) | **FOLD** (already scoped, the band-3 sequencing gate) | **BD.W-VIZ-PARITY-METAL** |
| 4 | Multi-pass FBO Kuwahara ceiling un-decided | **FOLD** (decision-first USER-HINGE) | **BD.W-AURORA-KUWAHARA-MULTIPASS** |
| 5 | `pointermove` listener missing `{ passive: true }` (perf hygiene; handler never preventDefaults) | **AUGMENT** (small add) | fold into **BD.W-AURORA-WGSL-CURL** as a 1-line src rider, OR a micro-note — no new wave warranted |
| — | Compositor-only, offscreen-pause, lazy-arm, demand-gate, PRM, software-raster guard, dual-substrate | **KEEP** (no change) | — |

**No PRUNE, no MODIFY-of-substance, no new wave.** Every genuine COMPONENT finding is already a scoped BD band-3 wave; the only net-new item is the `passive` listener hygiene (finding 5), which is a one-line AUGMENT rider, not a wave. The component is in excellent shape; BD's open aurora work is the WGSL-parity TAIL (CURL/STROKES), the binding Metal-GPU parity proof (PARITY-METAL), and the deferred FBO ceiling (KUWAHARA-MULTIPASS) — the audit confirms those are the right and sufficient targets.
