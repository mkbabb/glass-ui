# W-GOOBLOB-MEATBALL — DELTA (STAGE 2: lit + shadowed + meatballing, WGSL-primary-armed)

**Status:** SOURCE GREEN (`proof:gooblob-meatball --source` + `--selftest` born-RED→GREEN); the binding real-GPU LIT paint arm (M5) is **PENDING-ORCHESTRATOR-CAPTURE** on real Metal.

## The fix (the headline)

The WGSL STRUCTURAL fix that arms the WGSL primary:

- **At HEAD** the Toksvig normal-variance `fwidth(N)` (`metaball.wgsl.ts`) sat INSIDE the `if (uLit > 0.5)` branch, AFTER the per-fragment `if (alpha < 0.001) { return; }` early-return. WGSL uniformity analysis rejects a derivative reached only through a return predicated on a per-fragment value nested under further branches, so the WGSL module never compiled → the WGSL primary never armed on Metal → GooBlob fell to the WebGL2 net **forever** (the paint floor was met by the fallback, but the rich WGSL path was dead).
- **STAGE 2 HOISTS** the normal-derivative into UNIFORM control flow at the top of `fs_main` (the SAME level the already-working `fwidth(d)` AA site sits at, before the `alpha` early-return and outside the `uLit`/`uShadow` branches): `let Nh = surfaceNormalFromGrad(fieldGrad, d, bodyR); let nVar = length(fwidth(Nh));`. The lit block reads the hoisted `nVar` (the Toksvig clamp), and its own named `N = surfaceNormalFromGrad(...)` (byte-identical inputs) stays AFTER the `uStage` early-return so the STAGE-1 floor reaches no lit work. The math is byte-faithful to the GLSL fallback; only the EVALUATION POINT moved.

Net-new STAGE-2 dressing, gated + symmetric across both backends:
- **T1** the lit-glass surface re-enabled behind `uLit > 0.5` (SOTA Blinn-Phong/Fresnel/Toksvig, byte-preserved).
- **T2** the procedural **2D SDF soft-shadow march** (`softShadow2D`, IQ rmshadows improved-penumbra, 24 steps, re-uses `sceneDistG().x`, NO FBO) behind `uShadow > 0.5` — a soft contact shadow on the lower/away-facing rim that FOLLOWS the irregular silhouette. The shadow rides the spare `res.z`/`res.w` uniform lanes (`uShadow`/`uShadowSoftness`), packed in `uniformBridgeWGPU.ts` + uploaded in `uploadBlobUniforms.ts` (the typed-struct SoT lockstep).
- **T4** the accel/flick-burst leg already consumes the shared `usePointerVelocityField` (fed `tick(deltaMs)` from `resolveFrame`, reads `acceleration`) — the ≥2-consumer bar met (aurora + goo-blob).
- **T5/T6** the demo studio surfaces a STAGE-2 **Surface** configurator layer (lit / soft-shadow / softness, live) on `demo/stories/substrates/blob.vue`; the hero header sits ABOVE the card, `<DockBackgroundToggle>` WCAG-2.2.2 pause + the `variant="blob"` STAGE-1 teaching contrast present.

`variant="meatball"` (the default) flips `uLit`/`uShadow` on; `variant="blob"` (STAGE 1) keeps them off (the inviolate floor). `proof:gooblob-plain` stays GREEN by construction.

## PENDING-ORCHESTRATOR-CAPTURE — the binding real-GPU LIT paint arm (M5)

The cardinal split: the SOURCE gate is GREEN (validated here); the LIVE GPU gestalt is the ORCHESTRATOR's job on real Metal.

- **Route:** `/substrates/blob` (`http://localhost:5199/substrates/blob`).
- **Canvas selector:** `canvas[data-testid="goo-blob-canvas"]` (the studio hero blob — `variant` defaults `meatball`, so `uLit`/`uShadow` are ON).
- **What the eye should see (the gestalt — BOTH modes, on a WebGPU host (Chrome/Safari 26) AND an adapter-less host):**
  1. A lit-glass warm-cream droplet with a visible **catch-light gleam on the dome** (the specular highlight) + a **soft contact shadow** on the lower rim that follows the irregular silhouette (NOT a hard disc/box shadow).
  2. Across a satellite orbit: the satellite **merges into the body as ONE lit-glass mass** with continuous shading across the neck (no dark seam at the merge — the meatball is lit through).
  3. On cursor-track: the blob **leans toward the cursor + stretches a pseudopod + squash-stretches along travel**; a fast flick reads a one-shot recoil jiggle distinct from the steady squash (the accel burst).
  4. On WebKit/Safari 26: the lit + shadow blocks paint identically + **no flash** across a 5s capture.
  5. The configurator sits on the **RIGHT** on a 1440px viewport (stacked below on 390px); the frame + canvas are rounded; the hero header sits ABOVE the card.
- **The binding numeric the orchestrator records into `docs/tranches/BC/audit/visual/W-GOOBLOB-MEATBALL-paint.json`** (the `proof:gooblob-meatball` bare/`["local"]` arm reads it):
  ```json
  {
    "wave": "BC.W-GOOBLOB-MEATBALL",
    "route": "/substrates/blob",
    "backends": {
      "webgpu":      { "meanLum": <>0>, "specularPeakRatio": <>=1.3 (dome luminance peak / body mean)>, "shadowBandPresent": true },
      "adapterless": { "meanLum": <>0>, "specularPeakRatio": <>=1.3>, "shadowBandPresent": true }
    }
  }
  ```
  A STAGE-1-flat render mislabeled `meatball` (specularPeakRatio < 1.3, no shadow band) RED; a meanLum-0 black void RED. **The WGSL primary must NOW ARM** (the swap-chain readback is the armed WGSL path, not the stripped WebGL2 fallback) — that is the binding truth this capture proves.

The π readback `tests-visual/gooblob-meatball.spec.ts` (the LOCAL real-GPU spec) is the binding paint truth; it rides W-REFLECT3 + the `proof:ba-gestalt` glass/CTA dock verdict on a fresh capture.
