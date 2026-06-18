# BC.W-GOOBLOB-MEATBALL — goo-blob STAGE 2: + shadowing + meatball merge + lit-glass, hover-interactive, Safari-OK

- **Band:** 4 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** after `BC.W-GOOBLOB-PLAIN` (STAGE 1 is the floor this builds ON — the stripped `fs_main` + the `uStage`/`uLit`/`uShadow` scaffolding); after `BC.W-WGSL-FALLBACK` + `BC.W-VIZ-LIVE` (the substrate must be sound + Safari-stable, inherited via STAGE 1); the dot-matrix/dot-sphere siblings (`BC.W-VIZ-DOTMATRIX`/`BC.W-VIZ-HYBRID`) + the full demo suite + the RIGHT-side configurator ride their own later sub-waves (research/viz/goo-blob.md §10); this wave delivers the `variant="meatball"` DEFAULT
- **Owns / closes:**
  - USER-DEFECTS §E "the blob is TOTALLY broken — does not meatball, does not render at all" (the DEEPENING half — STAGE 2 dresses the STAGE-1 floor into the full lit, shadowed, meatballing creature).
  - USER-DEFECTS §E (verbatim) "re-written as just a blob, then re-written with shadowing, meatballing, from first principles; all Safari compatible." (the STAGE-2 "with shadowing, meatballing, from first principles, Safari-OK" half.)
  - USER-DEFECTS §D "the procedural item … hover-interactive blob-follows-cursor-with-velocity" + §D global "EVERY procedural bg responds to cursor/touch with velocity + acceleration."
  - DEFECT-LEDGER **D7/§H** (Safari flash) — STAGE 2's lit-glass + shadow must stay compositor-stable + flash-free cross-engine (inherited via STAGE 1's substrate, re-verified with the lit/shadow blocks ON).
  - ORCHESTRATION §1 Band 4 box: `BC.W-GOOBLOB-MEATBALL — goo-blob STAGE 2: + shadowing + meatballing from first principles, Safari-OK, hover-interactive`.

## Goal (the gestalt)
Open `/substrates/blob` and the full warm-cream creature is alive: a glassy lit droplet with a soft catch-light gleam riding its dome, a few satellites orbiting and MERGING into it (the meatball — a smooth liquid neck stretching then snapping), a soft contact shadow grounding it that follows the irregular silhouette (not a hard disc shadow), the whole thing reading as a single lit-glass body of mercury/honey. Move your cursor and the blob LEANS toward it, stretches a pseudopod limb reaching for it, and squashes-and-stretches along its travel like a lively gel; flick fast and it recoils with a one-shot jiggle (the acceleration burst); click and it bounces (the underdamped spring). It works identically on Safari 26 (WGSL/Metal primary, no flash). This is STAGE 1 dressed: the lit-glass surface + the soft-shadow march + the meatball merge + the velocity/acceleration interaction, all from first principles, all gated so STAGE 1 stays the floor it builds on.

## Starting state (measured, file:line)
STAGE 1 (`BC.W-GOOBLOB-PLAIN`) delivers the floor: the `uStage`-gated stripped `fs_main` (SDF + smin + fwidth-AA + fill), the `variant="blob"` register, the substrate sound (picker fixed, Safari-stable), the meatball merge PAINTING. STAGE 2 re-enables + deepens the blocks STAGE 1 gated off. The relevant HEAD source (verified):

- **The lit-glass surface ALREADY EXISTS + is SOTA** (`metaball.wgsl.ts:442-471` — research/viz/goo-blob.md §2.4): the Blinn-Phong glint + Schlick/Fresnel rim + warm-cream specular + Toksvig normal-variance spec-clamp. The `(shininess+2)/8` energy norm DECOUPLES shininess from strength (`:452`); the Toksvig `shininess/(1+24*nVar)` widen (`:450-451`) is the specular-AA that keeps the glint stable on the FBM membrane. KEEP — it is STAGE 2's lit layer, gated behind `uLit > 0.5`.
- **The analytic normal ALREADY EXISTS** (`surfaceNormalFromGrad`, `metaball.wgsl.ts:298-304` — research/viz/goo-blob.md §2.2): the field gradient arrives directly from `sceneDistG`; the Z dome is the unit half-sphere `z = sqrt(1-(1-interior)^2)`. KEEP — STAGE 2's lit + shadow both read it.
- **There is NO shadow today.** The user explicitly asked for "shadowing." HEAD has only the CSS gel-dome `drop-shadow` (`GooBlob.vue:287`) — a static box-shadow, NOT a procedural shadow following the silhouette. The SOTA procedural answer (research/viz/goo-blob.md §2.3) is the 2D SDF soft-shadow march (IQ rmshadows improved-penumbra) — ABSENT at HEAD. This is STAGE 2's net-new block.
- **The velocity-squash + hover-lean + click-bounce + trail ALREADY EXIST** (`metaball.wgsl.ts:248-260,381-386,289-294`, `useBlobPointer.ts`, `constants.ts:132,135` — research/viz/goo-blob.md §8): `sa = 1 + tanh(speed*1.6)*uStretch` (the volume-preserving tanh-saturated squash, capped LOW), the `smoothstep(0.5, 0.0, dist)*attraction*strength` hover-lean (the AX.W46 D5 calm-lean falloff), the `PULSE_OMEGA=18`/`PULSE_ZETA=0.35` click-bounce harmonic, the trail ring-buffer pseudopod. **The velocity term is there; the ACCELERATION/flick-burst term is NOT** — the BC opportunity (§8).

## Target spec (grounded)
Four moves, all GATED behind `uLit`/`uShadow` flags so STAGE 1 stays the floor (research/viz/goo-blob.md §4.1, §10):

### T1 — Re-enable the lit-glass surface (`uLit > 0.5` — the dressing, KEEP the math)
STAGE 2's `fs_main` adds (behind `uLit > 0.5`) the EXISTING Blinn-Phong/Fresnel lit-glass block (`metaball.wgsl.ts:442-471` — KEEP byte-faithful; it is SOTA energy-conserving glass): the glint reads `surfaceNormalFromGrad`, the warm-cream specular core, the Schlick rim, the Toksvig spec-AA. `variant="meatball"` (the STAGE-2 DEFAULT) flips `uLit`/`uShadow` on; `variant="blob"` (STAGE 1) keeps them off. The lit surface is the dressing STAGE 1 deliberately omitted — re-enabled, not re-authored.

### T2 — The 2D SDF soft-shadow march (the "shadowing" close — net-new, first-principles)
A procedural soft contact shadow under/around the blob, following the irregular silhouette (research/viz/goo-blob.md §2.3, IQ rmshadows improved-penumbra). The 2D variant marches a ray from each shadow sample toward `uLightDir`, accumulating the closest miss, using the Aaltonen penumbra that kills banding:
```glsl
float softshadow(vec2 ro, vec2 rd, float mint, float maxt, float w){
  float res=1.0, ph=1e20, t=mint;
  for(int i=0;i<32 && t<maxt;i++){
    float h=sceneDist(ro+rd*t);
    if(h<0.001) return 0.0;
    float y=h*h/(2.0*ph); float d=sqrt(h*h-y*y);
    res=min(res, d/(w*max(0.0,t-y))); ph=h; t+=h;
  }
  return res;
}
```
`w` is the penumbra hardness (inverse light-source size → `uShadowSoftness`). The BLOB uses the CHEAP variant: a low step count (16-32), `sceneDist` re-uses the SAME `sceneDistG().x` already computed, one light from `uLightDir`. The shadow reads as a soft grounded contact band UNDER the dome — congruent with the existing CSS gel-dome `drop-shadow` (`GooBlob.vue:287`) but PROCEDURAL + following the silhouette. Gated `uShadow > 0.5`; STAGE 1 ships shadowless.

### T3 — The meatball merge, deepened (the worst-case smin bridge, KEEP + verify lit)
STAGE 1 verified the merge PAINTS (one connected silhouette). STAGE 2 verifies it paints LIT + SHADOWED: the smin bridge between body and satellite reads as a smooth liquid neck of lit glass with a continuous shadow under the merged mass (not two lit discs with a dark seam). The worst-case orbit widen (`uniformBridgeWGPU.ts:127-139`, the BA.W-GOO-REDRESS fix — KEEP) bridges the high orbit excursion; the merge variant (`uMerge` quadratic|circular) is the crease-vs-rounded-menisci choice (circular = the gooier meniscus). This is verify-the-dressing-paints, not a new merge mechanism.

### T4 — Hover-interactive: blob-follows-cursor with velocity + ACCELERATION (the §D mandate)
STAGE 2 wires the FULL interaction (research/viz/goo-blob.md §8):
- **Hover-lean** (KEEP) — the body + satellites + trail tilt toward the cursor as ONE coherent shift (`smoothstep(0.5, 0.0, dist)*attraction*strength`, the calm-lean falloff, NOT a lunge).
- **Velocity-squash** (KEEP) — the volume-preserving tanh-saturated squash-and-stretch along the motion axis (`sa = 1 + tanh(speed*1.6)*uStretch`, capped LOW — a fast flick reads lively, never taffy-pull).
- **Click-bounce** (KEEP) — the one-shot underdamped harmonic (`PULSE_OMEGA=18`, `PULSE_ZETA=0.35`, symplectic-Euler integrated).
- **Pointer-trail pseudopod** (KEEP) — the trail ring-buffer smin-merges a decaying-radius limb reaching toward the cursor; a fast drag pulls an elastic pseudopod that snaps back.
- **NET-NEW — the ACCELERATION/flick-burst term.** CONSUME `usePointerVelocityField` (BB.B4, `@mkbabb/glass-ui/motion-core` — position + velocity + ACCELERATION + flick-burst, `tick(deltaMs)` push-API from the EXISTING frame loop, PRM tick(0) freeze) for the acceleration/flick-burst leg: a sharp acceleration spike triggers a one-shot recoil/jiggle DISTINCT from the steady velocity-squash (the iOS gel snap-back). The existing `useBlobPointer` follow/spring/trail STAYS (the fold onto the shared field is a BOOKED successor IFF byte-faithful — the CLAUDE.md "useBlobPointer.ts NOT re-pointed" fence; STAGE 2 ADDS the accel leg via the shared field, it does not replace the follow). This is the ≥2-consumer bar for `usePointerVelocityField` (aurora + goo-blob).
- **PRM** — `tick(0)` freeze (the deterministic rest pose, zero live velocity); the substrate's one-static-frame park already freezes the field.

## Mechanism / files
- **Edit `src/components/custom/goo-blob/shaders/metaball.wgsl.ts`** — re-enable the lit-glass block behind `uLit > 0.5` (T1, KEEP the math); ADD the `softshadow` 2D march behind `uShadow > 0.5` (T2, net-new); the merge bridge is byte-preserved (T3). The new shadow is a NEW fn in `fs_main`'s reach (fragment-stage only — no `vs_main`-reachable derivative, the dual-module trap fence).
- **Edit `src/components/custom/goo-blob/shaders/metaball.frag.ts`** — the WebGL2 fallback transcribes the SAME lit + shadow branches (the GLSL twins carry the smin/noise; the `softshadow` GLSL is the IQ rmshadows recipe — research/viz/goo-blob.md §5).
- **Edit `uniformBridgeWGPU.ts`** — ADD `uShadow` + `uShadowSoftness` to a spare lane (`s7.w` `_pad` per research/viz/goo-blob.md §4.2; `uLit` may already exist from STAGE 1's scaffold) — the typed-struct SoT lockstep with the WGSL `Uniforms` struct.
- **Edit `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` + `useBlobPointer.ts`** — feed `usePointerVelocityField` from the SHARED `resolveFrame` frame callback for the accel/flick-burst leg (T4); the existing follow/spring/trail stays the byte-faithful baseline.
- **Edit `GooBlob.vue` + `types.ts`** — `variant="meatball"` flips `uLit`/`uShadow` on; the `surface.shadow`/`surface.shadowSoftness` config fields (research/viz/goo-blob.md §6 Surface section).
- **ONE clock / ONE source:** the choreography (page-enter reveal / mood transition / route-leave fade) rides ONE keyframes.js `SpringProgress`/`springTimingFunction` fed `tick(dt)` from the SAME canvas loop — NO kf rAF (research/viz/goo-blob.md §9); the satellite merge cycle stays the deterministic `useBlobSatellites` state machine (the simulation, not the choreography). ONE color source = `procedural-color.wgsl.ts`/`.glsl.ts` + the blob-local OKLCh clamp.
- **The substrate is CONSUMED, not forked** — inherited from STAGE 1 (`createGpuSubstrate` + `createCanvasLifecycle`; the picker is `BC.W-WGSL-FALLBACK`, the Safari lifecycle `BC.W-VIZ-LIVE`).

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a composited capture of `/substrates/blob` `variant="meatball"`, BOTH modes, on Chrome AND WebKit: (a) a lit-glass warm-cream blob with a visible catch-light gleam on the dome + a soft contact shadow following the silhouette (NOT a hard disc shadow); (b) a frame-series across a satellite orbit shows the satellite merge into the body as ONE lit-glass mass with a continuous shadow under the merged silhouette (the meatball, lit + shadowed); (c) a cursor-track capture shows the blob lean + stretch a pseudopod toward the cursor + squash-stretch along travel; (d) a flick capture shows the one-shot recoil jiggle distinct from the steady squash (the accel burst); (e) WebKit shows no flash. Lands at `docs/tranches/BC/audit/visual/W-GOOBLOB-MEATBALL-DELTA.md`.
2. **Machine gate `proof:gooblob-meatball`** (born-RED → GREEN; `["local"]` on-host paint arm, `["ci"]` source-presence arm):
   - **M1 — STAGE 1 is the floor (the gating intact).** The lit + shadow blocks are GATED behind `uLit`/`uShadow`; with both off (STAGE 1 / `variant="blob"`) the render is flat (no specular, no shadow — the `BC.W-GOOBLOB-PLAIN` floor un-regressed). A planted always-lit (no gate) reds.
   - **M2 — the lit-glass math is byte-preserved.** The Blinn-Phong/Fresnel/Toksvig block (`metaball.wgsl.ts:442-471`) is byte-identical to HEAD (it is SOTA — re-enabled, not re-authored); a lit-math edit reds.
   - **M3 — the soft-shadow march exists + is fragment-safe.** The `softshadow` 2D march is present (16-32 steps, `sceneDist` re-used, `uLightDir`); the `uShadowSoftness` uniform exists in BOTH the WGSL struct AND `uniformBridgeWGPU.ts` (the lockstep). No `fwidth`/`dpdx`/`dpdy` in a `vs_main`-reachable helper (the dual-module trap). Self-test: a missing `uShadowSoftness` in the pack table reds (the parity-ΔE blowout).
   - **M4 — the accel/flick-burst leg consumes the shared field.** `useMetaballRenderer` feeds `usePointerVelocityField` `tick(deltaMs)` from the frame loop (no new rAF — `proof:offscreen-pause` untouched); the accel term is read (not a stub). The ≥2-consumer evidence for `usePointerVelocityField` lists aurora + goo-blob (`docs/consumer-evidence/use-pointer-velocity-field.md`).
   - **M5 — the on-host LIT paint (born-RED, the gate-paint-blindness close).** A real-GPU capture asserts `meanLum > 0` AND a specular highlight present (a local luminance peak on the dome) AND a shadow band present (a sub-ambient luminance region under the silhouette) on BOTH a WebGPU backend AND an adapter-less host — STAGE 2's dressing PAINTS, not just compiles.
   - **+ the disease-root bite:** the gate FAILS on a STAGE-1-flat render mislabeled `meatball` (no specular/shadow — the dressing not applied) AND on a `meanLum 0` black void.
3. **π readback `tests-visual/gooblob-meatball.spec.ts`** (both modes + WebKit, LOCAL real-GPU):
   - The `variant="meatball"` render shows a specular highlight (a luminance peak ≥1.3× the body mean on the dome) + a soft shadow band (a luminance trough below the body mean under the silhouette), both modes, Chrome AND WebKit.
   - A satellite-orbit frame-series: the merged silhouette is ONE connected component AND carries continuous shading across the neck (no dark seam at the merge — the meatball is lit through).
   - A cursor-track frame-series: the blob centroid shifts toward the cursor (lean) + a pseudopod limb extends toward it; a synthetic fast-flick frame shows a one-shot recoil amplitude distinct from the steady squash (the accel burst).
   - PRM: `tick(0)` freeze — ONE static lit frame, zero live velocity-squash.
   - WebKit: the lit + shadow blocks paint identically + no flash across a 5s capture (the lit/shadow re-verify of `BC.W-VIZ-LIVE` through the dressed blob).

## Fences / invariants (must NOT regress)
- **STAGE 1 is the inviolate floor** — the lit/shadow are GATED (`uLit`/`uShadow`); `variant="blob"` (STAGE 1) un-regresses to flat. A break in STAGE 2's dressing must NOT break the STAGE-1 floor (`proof:gooblob-plain` stays GREEN by construction).
- **The lit-glass + normal + smin MATH stays byte-faithful** — the Blinn-Phong/Fresnel/Toksvig block, `surfaceNormalFromGrad`, the smin kernels are SOTA (re-enabled/extended, not re-authored — research/viz/goo-blob.md §2.4).
- **The shadow is the CHEAP 2D march** — 16-32 steps, `sceneDist` re-used (NOT a separate field re-eval), one light; it must NOT add a per-pixel FBO/multi-pass (the procedural field needs no FBO — research/viz/goo-blob.md §2.3) nor blow the offscreen-park budget.
- **The pointer fold is byte-faithful** — `usePointerVelocityField` is FED from the existing `resolveFrame` loop (no new rAF); `useBlobPointer`'s follow/spring/trail STAYS (the CLAUDE.md "useBlobPointer.ts NOT re-pointed" fence — STAGE 2 ADDS the accel leg, does not replace the follow).
- **WGSL fragment-derivative safety** — the shadow + lit blocks stay inside `fs_main`, never a `vs_main`-reachable helper (the dual-module WGSL-validation trap).
- **The typed-struct SoT** extended (the `uShadow`/`uShadowSoftness` adds), never re-forked; lockstep with the WGSL struct.
- **ONE clock / ONE color source** — the kf `SpringProgress`/`springTimingFunction` choreography fed from the canvas loop (no kf rAF); `procedural-color.wgsl.ts`/`.glsl.ts`.
- **KEEP the WebGL2 fallback** + **WGSL primary on Safari 26** — inherited from STAGE 1; the lit + shadow transcribe to the GLSL fallback (research/viz/goo-blob.md §5).
- **Clean break, no alias** — the dressing is gated `fs_main` blocks, not a parallel `metaball-lit.wgsl.ts`; no `variant="legacy-lit"` (MEMORY no-backwards-compat).
- **Presets-in-consumers + teal-on-navy fence** — warm-cream is the library default; teal-on-navy is a DEMO preset only.

## Folds (deferrals discharged)
- **`bb-gooblob-wgpu-paint` (the lit/shadow half)** (the BB.W-GOOBLOB-WGPU BUILT-NOT-PAINTED — postmortem/bb.md, DEFECT-LEDGER D8'/D9'). **DECIDED — RE-PAINT (STAGE 2):** M5 verifies the lit + shadowed creature PAINTS on a real host (specular peak + shadow trough present), both backends — the dressing's painted truth the BB structural-proxy never proved.
- **`ba-goo-redress-bridge-lit`** (the BA.W-GOO-REDRESS worst-case smin bridge — postmortem/ba.md). **DECIDED — RE-PAINT (lit through the merge):** T3 + the π verify the merge paints as one LIT mass with continuous shading across the neck (the BA bridge math stays; STAGE 2 proves it reads as a single lit creature, not two lit discs).
- **`ba-goo-redress-per-satellite-color`** (the BA-VJS-5 / C-1 "the per-satellite derived-shade color is BOOKED to a 4.x point release; the GL color-seam fence was NOT widened" — CLAUDE.md §GooBlob). **DECIDED — HOLD (honest, out of scope):** the per-satellite derived-shade color stays booked to a 4.x point release; STAGE 2 does NOT widen the GL color seam (the warm-cream identity + the single color source hold). The hover-interactive + shadow + lit are STAGE 2's scope; the per-satellite shade is a separate color-seam decision.
- **`bb-blob-shadow-procedural`** (the user's "shadowing … from first principles" — USER-DEFECTS §E; ABSENT at HEAD, only the CSS `drop-shadow` `GooBlob.vue:287`). **DECIDED — BUILD:** T2 mints the 2D SDF soft-shadow march (IQ rmshadows improved-penumbra) — the first procedural shadow following the silhouette, the user's literal ask.
- **`bb-pointer-velocity-field-2nd-consumer`** (the BB.B4 `usePointerVelocityField` ≥2-consumer bar — `docs/consumer-evidence/use-pointer-velocity-field.md` names the booked aurora/blob binaries). **DECIDED — MEET:** T4 makes goo-blob the 2nd binary consumer (aurora is the 1st via `BC.W-VIZ-AURORA`), satisfying the ≥2-consumer bar for the shared field. The accel/flick-burst is the term the field uniquely supplies.
- The D7/§H Safari flash (postmortem/bb.md class 8) is RE-VERIFIED through the DRESSED blob — STAGE 1 verified the flat floor flash-free; STAGE 2's WebKit π re-verifies with the lit + shadow blocks ON (the heaviest fragment path), closing the cross-engine concern on the worst-hit viz at its richest.
