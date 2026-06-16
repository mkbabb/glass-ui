# BB.W-VIZ-SUITE — the WebGPU-first procedural-animation suite + per-viz migration band + the suite family doc

**Name**: W-VIZ-SUITE — the third backend (`useWebGPUCanvas`) over the ONE lifecycle leaf + the per-viz migration band (aurora/goo-blob WGSL primaries) + two NEW WebGPU-first viz (dot-flow-field, concentric) + the ONE documented procedural-animation FAMILY (all seven extant + new viz as first-class members)
**Opens after**: Batch 4 open (the substrate sub-wave W-GPU-SUBSTRATE is bound-disjoint from the sibling Batch-4 waves — it writes ONLY `src/composables/glass/webgpu/*` + the new `proof:gpu-substrate-single` gate, none of which W-CANVAS-UNIFY / W-CARVE3 / W-DARK-INK-WARM / W-INVALID-RING / W-EYEBROW-UNION touch). Soft-reads W-CANVAS-UNIFY's verdict on `proof:webgl-substrate-single` (the gate this wave's parity gate is a SUPERSET of) so the WebGPU extension lands on the post-de-fork shape, not the stale pre-fork one.
**Agents**: 5 serial sub-waves (W-GPU-SUBSTRATE → W-AURORA-WGPU → W-GOOBLOB-WGPU → W-FLOWFIELD → W-CONCENTRIC) + a doc rider that closes with each. Each sub-wave is a single cohesive file-bound unit. The two migrations + two new viz run SERIAL (not parallel): each proves the pattern the next is born onto — a new compute-particle viz on an unproven substrate would conflate substrate bugs with viz bugs (the §3a sequencing risk).
**Hard gate**: `proof:gpu-substrate-single` (NEW, born-RED — the generalized dual-substrate parity gate: ONE WebGPU bootstrap + ONE preserved WebGL2 fallback + both-backends-compose-the-leaf + no-baked-viz-choices + device-loss-self-heal + a machine-read parity TABLE with on-disk-resolves + a consumer-#2 assert) + the per-viz BORN-RED viz gates (`proof:flow-field`, `proof:concentric`) + the aurora/blob WGSL-vs-GLSL parity captures (a bounded OKLab ΔE bar, calibrated against the aurora migration + recorded as a gate fact) + `proof:colocation` GREEN (the two new dirs adopt the feature-dir layout) + `proof:storybook-complete` GREEN (each new viz earns ≥1 substrates-band story) + `npm run typecheck` + `npm run build`.
**Status**: SPEC

## Goal criterion

The library has ONE procedural-animation SUITE — a documented FAMILY of seven members (aurora · goo-blob · dot-flow-field · concentric · fourier-field · constellation · watercolor-dot) sharing ONE lifecycle leaf, ONE shared discipline (offscreen-pause · live-PRM-freeze · consumer-owned-DPR · one-GL-context-per-route · configurator-driven · warm-identity-default · presets-in-consumers · the cited-SOTA-math bar), and a per-viz capability + substrate-parity table that treats EVERY EXTANT viz as a first-class member (the user's explicit 2026-06-16 clarification: "the procedural-animation should cover: the blob, aurora, constellation, fourier field, etc, too — extant items, too").

The suite is WebGPU-FIRST where the platform allows it (the June-2026 Baseline-Newly-Available fact; the user's "ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible"): a NEW `useWebGPUCanvas` backend composes the SAME `createCanvasLifecycle` leaf the WebGL2 and Canvas2D backends already compose (the THIRD thin wrapper, ZERO scheduling re-fork); aurora + goo-blob gain a NET-NEW `.wgsl` primary path with the EXISTING `.frag.ts` byte-untouched as the WebGL2 fallback (the GL-shader fence holds); two new viz are born WebGPU-first with a graceful WebGL2/Canvas2D fallback; and the three viz that should NOT migrate now (fourier-field, constellation, watercolor-dot) are recorded WITH the reason + the booked trigger. The dot-flow-field reproduces the user's reference aesthetic (teal dots over dark navy, seeded along undulating streamlines rippling in waves — a curl-noise flow field over a Gerstner/Tessendorf sum-of-sines wave potential) and concentric renders a radial Fourier ring-interference field.

This wave succeeds if: the two migrated viz render byte-equivalently across both backends (a bounded OKLab ΔE capture-pair per migrated viz, on disk), the WebGL2 fallback is NOT retired (the ~5-10% tail — Linux Firefox, pre-A12 iPhones — keeps a working path), each new viz ships a substrates-band story honoring the one-GL-context-per-route budget, the suite family doc names all seven members + the per-viz migration verdict, and `proof:gpu-substrate-single` machine-locks the no-second-fork + no-deleted-fallback + parity-resolves discipline.

A wave whose gates pass but whose dot-flow-field does NOT read as the reference image's flowing dot-wave (a placement/aesthetic judgement, not a pixel delta) closes `complete_with_misses`, not `complete` — the `proof:flow-field` π's live readback + the own-surface DELTA capture is the gestalt bar.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the completed research brief (the WebGPU-Baseline-confirmed verdict + the substrate-design + the migration plan), NOT a blind re-research. Before touching a byte, the impl agent of each sub-wave re-greps each anchor below at HEAD and confirms it still holds (the line counts, the zero/low-derivative `.frag` facts, the gate regexes, the leaf's backend-agnostic charter); if a cite has drifted (a sibling Batch-4 edit moved a line, W-CANVAS-UNIFY re-shaped `proof:webgl-substrate-single`), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the suite design.

RE-GROUND command set (run all; confirm the substrate shape + the migration preconditions):

```
# the ONE leaf — confirm the backend-agnostic charter + the THREE-backend reality
wc -l src/composables/glass/webgl/createCanvasLifecycle.ts        # expect 267 — the leaf
wc -l src/composables/glass/webgl/useWebGLCanvas.ts               # expect 198 — the WebGL2 backend (the thin-wrapper EXEMPLAR)
ls src/composables/glass/canvas2d/                                # useCanvas2D.ts + resolveCanvasColor.ts + index.ts — the Canvas2D backend (the SECOND precedent: fourier-field + constellation compose it)
sed -n '1,68p' src/composables/glass/webgl/createCanvasLifecycle.ts  # the buildContext/resize/bindContextEvents seam + CanvasSuspendReason
sed -n '103,198p' src/composables/glass/webgl/useWebGLCanvas.ts      # the thin-backend shape this wave transposes to WebGPU

# the WebGPU pilot seed — the WGSL conventions
wc -c src/composables/glass/webgpu/glassShader.wgsl              # expect 6380 bytes — the Uniforms struct + _pad + @group(0)@binding(N) + full-screen-triangle vs_main + fbm/noise/fresnel idioms
grep -rn 'navigator.gpu\|getContext("webgpu")\|requestAdapter' src   # expect: ZERO BOOTSTRAP at HEAD (only a navigator.gpu MENTION in aurora/DESIGN.md prose — no useWebGPUCanvas wrapper exists)

# the GL-shader fence — the .frag line counts + the derivative facts (these DIFFER between the two — read carefully)
wc -l src/components/custom/aurora/constants/shaders/aurora.frag.ts   # expect 405 — STAYS byte-untouched
wc -l src/components/custom/goo-blob/shaders/metaball.frag.ts         # expect 417 — STAYS byte-untouched
grep -cE 'texture|dFdx|dFdy|fwidth' src/components/custom/aurora/constants/shaders/aurora.frag.ts   # expect 0 — aurora is the CLEANEST port (no textures, no derivatives)
grep -nE 'texture|dFdx|dFdy|fwidth' src/components/custom/goo-blob/shaders/metaball.frag.ts          # expect 6 hits, of which 2 are REAL fwidth() calls (266, 364) — see GOOBLOB-FWIDTH below

# the parity gate the new one generalizes (post-W-CANVAS-UNIFY shape)
sed -n '1,131p' scripts/proof-webgl-substrate-single.mjs

# the colocation + storybook gates the new dirs must satisfy
sed -n '40,200p' scripts/proof-colocation.mjs                    # the README-derived target set + the (a)-(d) clauses
sed -n '1,40p' scripts/proof-storybook-complete.mjs              # the export-surface → story totality loop

# the freshness-ledger gate (the cardinal-lesson DELTA verifier)
ls scripts/proof-live-verified-ledger.mjs scripts/proof-gate-script-parity.mjs   # both exist — the DELTA freshness + gate-registry checks

# the manifest BG map + the one-GL-context-per-route budget + the studio precedents
sed -n '100,330p' demo/stories/manifest.ts                       # CATEGORY_DEFAULT_BG + the substrates band rows
grep -n 'cloneMode' demo/stories/substrates/aurora.vue demo/stories/substrates/blob.vue demo/stories/substrates/fourier-studio.vue   # the studio cloneMode precedents

# the subpath registration precedent + the per-viz facts for the FAMILY DOC
cat src/subpaths/aurora.ts                                       # the one-line mirror barrel form a new viz copies
grep -rln 'useWebGLCanvas\|useCanvas2D\|getContext\|feDisplacement' src/components/custom/{aurora,fourier-field,goo-blob,constellation,watercolor-dot}   # the per-viz substrate census
sed -n '1,66p' src/components/custom/aurora/constants/presets.ts # the "presets in consumers" library-default discipline
```

Grounding findings (re-grepped this authoring, 2026-06-16):

- **LEAF-AGNOSTIC** [confirmed, 267 lines] — `createCanvasLifecycle.ts:1-9` charter: "Carved out of `useWebGLCanvas` (AU.W6) so a thin context wrapper shares the EXACT same demand-driven scheduling + offscreen-park + PRM-freeze machinery without a forked second copy." The leaf owns the suspend `Set` (`:95-97`), the rAF `tick`/`wake` (`:113-126`), the visibility owner (`:162-169`), the content-visibility park + the F6 `off-screen-io` split (`:22-35,171-194`), and the live PRM re-monitor (`:106-135`). The ONLY backend-specific seam is `buildContext`/`resize`/`bindContextEvents` (`:49-68`). The WebGPU backend is the THIRD wrapper over this leaf, re-implementing ZERO scheduling. The two PROVEN precedents: `useWebGLCanvas.ts` (198 lines, sync `arm`) AND `useCanvas2D.ts` (Vue `toValue`/`onScopeDispose` deferred-arm prelude) — the WebGPU wrapper transposes the THIN-wrapper shape, adding only the async device-acquisition prelude.
- **WGPU-BASELINE** [June 2026, confirmed via web.dev + the WebGPU community status] — WebGPU is Baseline-Newly-Available (Jan 2026): Chrome/Edge 113+ stable (macOS/Win/ChromeOS, ~3yr stable), **Safari 26+ stable (Sept 2025 — macOS Tahoe 26 · iOS 26 · iPadOS 26 · visionOS 26, the whole Apple-26 line — the headline unblock)**, **Firefox 141+ (Windows, July 2025) / 145+ (macOS Tahoe ARM64); Linux + Android + Intel-Mac tracking through 2026**. The two real holes (the WebGL2-fallback tail, ~5-10%): Linux Firefox + pre-A12 consumer iPhones (+ flagged Firefox-Android). The AV.W "Limited, not Baseline; WebGL2 stays" deferral has DISSOLVED — but the WebGL2 substrate is NOT retired, it becomes the feature-detect fallback (`navigator.gpu` absent → WebGL2). Sources: [web.dev/blog/webgpu-supported-major-browsers](https://web.dev/blog/webgpu-supported-major-browsers) · [webgpu.com — WebGPU Hits Critical Mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers-now-ship-it/) · the gpuweb/gpuweb Implementation-Status wiki.
- **AURORA-FRAG-CLEAN** [confirmed: 405 lines, `grep -cE 'texture|dFdx|dFdy|fwidth'` → **0**] — `aurora.frag.ts` uses ZERO textures + ZERO derivatives; it is a pure procedural fbm/OKLCh fullscreen pass → maps 1:1 onto WGSL (the pilot already demonstrates the fbm/noise/fresnel WGSL idioms + the full-screen-triangle `vs_main`). The CLEANEST possible port → rank 1.
- **GOOBLOB-FWIDTH** [CORRECTED at HEAD: 417 lines, `grep -cE` → **6**, of which **2 are real `fwidth()` calls**] — `metaball.frag.ts` is NOT a zero-derivative shader (the prior draft's "confirm at HEAD" surfaced this). The hits: 4 are comment-prose (lines 216, 218, 264, 361 — narrating the AA edge); **2 are LIVE `fwidth()` calls — line 266 (`float aa = max(fwidth(d), 1e-6);` — the anti-aliased SDF edge half-width) + line 364 (`float nVar = length(fwidth(N));` — the Toksvig-style normal-variance specular clamp)**. This is STILL a clean WGSL port — WGSL supports `dpdx`/`dpdy`/`fwidth` in the FRAGMENT stage (the WebGPU spec's derivative builtins are fragment-only, exactly as GLSL) — but the port agent MUST transcribe both `fwidth()` sites to WGSL `fwidth()` and verify the AA edge + the Toksvig clamp reproduce in the parity capture (they are the most rasterizer-drift-prone lines — call them out in the ΔE calibration). The frag has ZERO `texture` SAMPLES (the 4 hits are all comment text, not `textureSample` calls) — confirm with `grep -nE 'textureSample|sampler' metaball.frag.ts` → 0. Rank 2 (clean SDF + the two derivative sites the only non-trivial transcription).
- **PILOT-SEED** [confirmed, 6380 bytes, NO consumer at HEAD] — `glassShader.wgsl` is the seed for the WGSL conventions: the `Uniforms` struct with explicit `_pad` alignment, the `@group(0) @binding(N)` layout, the full-screen-triangle `vs_main`, and the fbm/noise/fresnel helpers. The substrate does NOT bake this shader (the (d) bar) — it parameterizes the pipeline through the consumer's `setup(device, ctx, format)`.
- **GATE-SUPERSET** [the coordination point, 131 lines] — `proof:webgl-substrate-single` (W-CANVAS-UNIFY extends it with the Canvas2D single-source clause) is the gate `proof:gpu-substrate-single` is a SUPERSET of: every WebGL2/Canvas2D clause stays GREEN (the fallbacks are NOT retired); the new WebGPU clauses are born-RED. Do NOT delete or weaken any existing clause.
- **COLOCATION-DERIVED** [confirmed, 285 lines] — `proof:colocation`'s target set is DERIVED off the `README.md` adoption marker, so the two new viz dirs gain coverage AUTOMATICALLY the moment they add their README. Each must carry: composables under `composables/`, a `constants.ts`, shaders under `shaders/` (the `.wgsl` + the `.frag.ts`/`.glsl.ts` fallback), and a `README.md`.
- **EXTANT-SUBSTRATE-CENSUS** [confirmed this authoring — the family-doc inputs] — aurora: WebGL2 (`runtime.ts`/`renderMode.ts`), color via `composables/color.ts` + `uniformBridge.ts` ColorResolver. goo-blob: WebGL2 (`useMetaballRenderer.ts`), color via injected ColorResolver (`uploadBlobUniforms.ts`). fourier-field: **Canvas2D** (`FourierField.vue:3 import { useCanvas2D }`). constellation: **Canvas2D** (`useConstellation.ts:15 import { useCanvas2D }`). watercolor-dot: **SVG/CSS only — NO drawing context** (`WatercolorDot.vue` mounts a namespaced `<filter>` feDisplacementMap, `useWatercolorBlob.ts` is pure geometry). The studio cloneMode precedents: aurora demo + blob demo + fourier-studio demo ALL use `cloneMode: "per-preset"` (a named-baseline studio); the library DEFAULT discipline (a single-surface viz a preset switch cleanly resets) is `commit-on-write` — the NEW viz default to `commit-on-write` but their DEMO studios may use `per-preset` like the blob's.

## Defect / target table (file:line — RE-GREP at HEAD)

| # | finding / target | file:line | the mechanism |
|---|---|---|---|
| 1 | NO WebGPU backend exists | `src/composables/glass/webgpu/` carries ONLY the consumer-less `glassShader.wgsl` pilot | the directive ("ALL visualizations WebGPU-first when possible") is unmet — no `useWebGPUCanvas` wrapper over the leaf, no `navigator.gpu` bootstrap anywhere in `src` (only a prose MENTION in aurora/DESIGN.md) |
| 2 | aurora is WebGL2-only | `aurora.frag.ts:1-405` (the heaviest fragment shader, ZERO textures/derivatives) | the flagship substrate has no WGSL primary path; the cleanest possible port (zero-texture/zero-derivative — confirmed) is un-done |
| 3 | goo-blob is WebGL2-only | `metaball.frag.ts:1-417` (the SDF smin body + 2 live `fwidth()` AA/Toksvig sites + OKLCh perturb) | the second heavy fragment shader has no WGSL primary path; the ColorResolver injection + the satellite uniform upload + the two `fwidth()` derivative sites must thread through the WGSL fragment pass identically |
| 4 | the reference dot-flow-field viz does not exist | `docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg` (the design target — READ this authoring) | the user's "Claude co-work" dot-wave aesthetic (teal dots over dark navy, curl-noise streamlines rippling as waves) has no library primitive — the canonical WebGPU compute-particle use case is absent |
| 5 | the concentric ring-interference wave viz does not exist | the BB sibling viz ask (the 3D-rendered-to-2D concentric-wave) | the radial Fourier ring-interference field has no primitive |
| 6 | no suite-level family doc | `src/components/custom/` (the barrel, no family README) | the seven viz are documented per-dir but have no ONE family home naming the shared discipline + the per-viz capability/parity/migration table (the user's explicit "cover the extant items too") |
| 7 | no dual-substrate parity gate | `scripts/` (only `proof:webgl-substrate-single` exists) | there is no machine-lock forbidding the third-backend re-fork, the deleted-fallback regression, or the "verified" parity-row lie |

## Scope

The wave is FIVE serial sub-waves + a doc rider. Each is a self-contained agent unit; the orchestrator runs them in order (each proves the pattern the next is born onto).

1. **W-GPU-SUBSTRATE — the third backend + the picker + the born-RED parity gate.**
   - Author `src/composables/glass/webgpu/useWebGPUCanvas.ts` (`createWebGPUCanvas(canvas, options)`) as the THIRD thin backend over `createCanvasLifecycle` (the `useWebGLCanvas` transposition). It re-implements ZERO scheduling. It threads ONLY the WebGPU-specific concerns:
     - **The ASYNC device-acquisition prelude (`armAsync()`).** `createCanvasLifecycle.arm()` is synchronous; the WebGPU device request is a Promise. The wrapper owns the async PRELUDE: `armAsync()` awaits `navigator.gpu.requestAdapter()` → `adapter.requestDevice()`, configures the context (`canvas.getContext("webgpu")` → `context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "premultiplied" })`), runs the consumer's `setup(device, context, format) → WebGPUCanvasFrame`, THEN calls the leaf's synchronous `arm()`. The leaf stays untouched (paralleling how `useCanvas2D` owns its Vue `toValue`/`onScopeDispose` deferred-arm prelude). `buildContext()` returns the leaf's `CanvasFrameHooks` synchronously off the already-resolved device; `frame(t)` records a command encoder, begins a render pass against the current swap-chain texture view (`context.getCurrentTexture().createView()`), draws, and submits. `shouldContinue`/`time?`/`teardown` mirror the WebGL backend exactly. **If the device-acquire shape genuinely cannot thread through the existing leaf seam WITHOUT a leaf public-seam change, that is a recorded Triumvirate (a leaf seam ADD the other two backends ignore), NOT a fork** (§3a).
     - **`resize` — DPR-aware backing store.** `canvas.width = clientWidth * dpr; canvas.height = clientHeight * dpr` (DPR clamped per the CONSUMER's policy — the leaf does NOT bake DPR, per the (d) bar). WebGPU has no `gl.viewport`; the render-pass default carries the full canvas. The context need NOT be re-`configure`d on resize (the swap chain auto-resizes to the backing store) — only the canvas backing store + any size-dependent uniform.
     - **`bindContextEvents` — the DEVICE-LOSS self-heal (the WebGPU twin of `webglcontextlost`/`restored`).** WebGPU has no DOM event pair; `device.lost` is a Promise resolving with `{ reason, message }`. Wire `device.lost.then(info => { if (info.reason !== "destroyed") { markContextLost(); /* re-request adapter+device, then */ rebuild(); } })`. `markContextLost` nulls hooks + cancels the rAF (the surface is blank); the async re-acquire calls the leaf's `rebuild()`. **Distinguish `reason: "destroyed"` (intentional dispose — do NOT re-acquire) from a driver TDR timeout (re-request adapter+device — the self-heal).** Push `device.pushErrorScope("validation")`/`popErrorScope()` + an `uncapturederror` listener around pipeline creation so validation errors surface deterministically (not silent garbage).
   - Author `src/composables/glass/webgpu/useGpuSubstrate.ts` (the transparent picker). `const supportsWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;` → returns a UNIFORM handle shape (`arm`/`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/`reducedMotion`) where `create()` picks the backend. Both backends already expose the identical `CanvasLifecycleHandle`-derived surface, so a viz consumer's lifecycle wiring (offscreen pause via `useIntersectionPause`, the `DockBackgroundToggle` pause/resume, `wake()` on pointer) is byte-identical regardless of backend. The viz authors TWO `setup` callbacks (one WGSL-pipeline, one GLSL-program); the picker selects; everything downstream is substrate-agnostic. The WebGPU path uses `armAsync()`; the WebGL2 fallback uses the synchronous `arm()`.
   - Author the consumer-#2 test `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` (a non-aurora composition of the substrate, mirroring the WebGL2 consumer-#2 test — under jsdom `navigator.gpu` is absent, so the test asserts the picker DEGRADES to the WebGL2 backend deterministically + the handle shape is uniform; the live WebGPU path is exercised by the binding π under a GPU-bearing headless image).
   - Author `scripts/proof-gpu-substrate-single.mjs` (`proof:gpu-substrate-single`, born-RED) — the generalized dual-substrate parity gate (the clause set in §"Hard Gate").
   - Add the `package.json` `proof:gpu-substrate-single` script + register it on the CI gate manifest.

2. **W-AURORA-WGPU (rank 1, FIRST) — the cleanest port; establishes the shared-WGSL-chunk pattern + calibrates the ΔE bar.**
   - Author `src/components/custom/aurora/constants/shaders/aurora.wgsl` (NET-NEW; transcribe the 405-line `aurora.frag.ts` GLSL → WGSL: the fbm/OKLCh nuclei field, the `Uniforms` struct with explicit `_pad` alignment, the `@group(0)@binding(N)` bind-group-0 layout, the full-screen-triangle `vs_main`). `aurora.frag.ts` STAYS BYTE-UNTOUCHED as the WebGL2 fallback (the GL-shader fence holds).
   - Author `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` — the WGSL twin of the AV.W2 shared GLSL chunk (`src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — the procedural-color OETF + the Ottosson OKLCh matrices), spliced by `aurora.wgsl` and (later) `metaball.wgsl`/`concentric.wgsl` — the shared-WGSL-include pattern the suite reuses.
   - Add the WGSL `setup` path to the aurora composables (`runtime.ts`/`glSetup.ts`/`uniformBridge.ts` gain a WGSL twin `setupWGPU(device, ctx, format)`; the studio model + the configurator-driven `useConfiguratorState<AuroraConfig>` cloneMode='per-preset' is UNCHANGED — substrate-agnostic handle). Wire `Aurora.vue` to compose `useGpuSubstrate` instead of `createWebGLCanvas` directly.
   - Build the bind-group-0 layout from a SINGLE typed-struct source-of-truth (mirror the `uniformBridge.ts` pattern aurora uses for GLSL) so a WGSL std140-vs-wgsl-alignment mismatch is caught by the parity ΔE blowout, not silently read as garbage.
   - Verify OKLab-ΔE parity via a `renderAt` capture-pair (the WebGPU path vs the WebGL2 path render the SAME deterministic frame; readback via `copyTextureToBuffer`→`mapAsync` (WebGPU) and `readPixels` (WebGL2); assert bounded OKLab ΔE). **CALIBRATE the ΔE threshold against this migration (the first, cleanest) and RECORD the chosen value as a gate fact** (the parity-credibility risk — too strict reds on legitimate rasterizer drift, too loose greens a broken port). Proposed starting bar: **mean ΔE ≤ 2.0, p99 ΔE ≤ 5.0** (perceptual-just-noticeable ≈ 2.3; SwiftShader-vs-GPU rasterizer drift sits well below) — the agent records the EMPIRICALLY calibrated value, not this guess.
   - Declare the aurora parity row in the parity table (`docs/tranches/BB/audit/gpu-parity-table.md`): `.wgsl` path + `.frag` path + `parity: verified` + the on-disk capture-pair artefact path.

3. **W-GOOBLOB-WGPU (rank 2, SECOND) — the SDF port; the ColorResolver + satellite-envelope + the two `fwidth()` derivative sites.**
   - Author `src/components/custom/goo-blob/shaders/metaball.wgsl` (NET-NEW; transcribe the 417-line `metaball.frag.ts`: the SDF metaball `smin` body + the watercolor edges + the OKLCh perturb + **the two `fwidth()` sites — line 266's AA-edge half-width + line 364's Toksvig normal-variance specular clamp — transcribed to WGSL fragment-stage `fwidth()`**). `metaball.frag.ts` STAYS BYTE-UNTOUCHED.
   - Thread the injected ColorResolver seam (AU.W7) + the per-satellite uniform upload (`uploadBlobUniforms.ts` — the POS_SCALE contract + the BA.W-GOO-REDRESS worst-case-orbit smin widen) through the WGSL uniform buffer IDENTICALLY. The `pointer.active → wake()` seam is substrate-agnostic (uses the leaf's `wake`).
   - The shipped pixel-parity gates (`proof:blob-render`, `proof:blob-smin-normalized`) become the parity ORACLE — the WebGPU output must match the WebGL2 calm-lean ceiling + the four-side containment. The two `fwidth()` sites are the most drift-prone — call them out explicitly in the ΔE capture (the AA edge + the spec clamp), not buried.
   - Verify OKLab-ΔE parity via the `renderAt` capture-pair (at the calibrated W-AURORA-WGPU threshold). Declare the blob parity row (`parity: verified` + the capture-pair path).

4. **W-FLOWFIELD (rank 3, NEW) — born WebGPU-first (the compute-particle path).**
   - Author the `src/components/custom/dot-flow-field/` feature-dir (the colocation layout in §"Component spec"). The compute pass advects N particles through a curl-noise velocity field over a Gerstner/Tessendorf sum-of-sines wave potential (the §"Design" math); the render pass draws instanced billboarded quads (the SOTA recommends instanced quads over a point-list for the per-particle size/density variation the reference shows). WebGL2 fallback: transform-feedback particle stepping OR a CPU-stepped Canvas2D point cloud (the FIRST viz where WebGPU is materially better, not just cleaner).
   - The DEFAULT palette is neutral/warm-cream-identity (resolved via the ColorResolver / `src/composables/color` seam + value.js helpers); the teal-on-navy is a DEMO preset (`demo/stories/substrates/presets.ts` — presets-in-consumers, NEVER a library token).
   - Author `proof:flow-field` (born-RED) + the binding π (§"Hard Gate").
   - Earn ONE substrates-band story (`demo/stories/substrates/dot-flow-field.vue` + the manifest row).

5. **W-CONCENTRIC (rank 4, NEW) — born WebGPU-first (the fragment path).**
   - Author the `src/components/custom/concentric/` feature-dir. A fullscreen procedural ring/ellipsoid interference field (the same shape-class as aurora — a pure fragment pass, the SAME clean WGSL port). The math is a radial sum-of-sines / Fourier ring expansion (the §"Design"); the 3D-rendered-to-2D ask (concentric ellipsoids implying depth) is the radial Fourier ring interference. WebGL2 fallback: a `concentric.glsl.ts` (the same fragment shape).
   - The DEFAULT palette is neutral/warm-identity; demo themes it.
   - Author `proof:concentric` (born-RED) + the binding π. Earn ONE substrates-band story.

6. **The suite family doc + the per-viz README substrate sections (the doc rider — rides every sub-wave's close, finalized at W-CONCENTRIC).**
   - Author `src/components/custom/PROCEDURAL-SUITE.md` (the family home — the seven-member capability table + the shared discipline + the per-viz migration verdict/rank/sub-wave + the parity-table reference). This is the user's explicit ask: the suite documents EVERY extant viz (aurora · goo-blob · fourier-field · constellation · watercolor-dot) as a first-class family member, not only the new ones.
   - Each viz README gains a "Substrate" section naming its `.wgsl` primary + its `.frag`/`.glsl`/Canvas2D fallback + its parity/migration status (aurora/goo-blob extended; the two new dirs born with it; fourier-field/constellation/watercolor-dot note their NON-migration with the reason + the booked successor trigger).

**NOT in scope (booked successors — §"Named successors"):** the fourier-field WebGPU line-instancing path (W-FOURIER-GPU), the constellation compute-particle lattice (W-CONSTELLATION-GPU), the per-satellite derived-shade blob color (the BA-VJS-5 / C-1 GL-color-seam widen, already booked to a 4.x point release), and any RETIREMENT of a `.frag`/`.glsl` WebGL2 fallback (forbidden until the ~5-10% tail closes — tracked, not assumed). watercolor-dot is PERMANENTLY out (it mounts no drawing context).

## Triumvirate Dispatch

- **The leaf seam cannot carry async device-acquisition without a public-seam change** (the §scope-1 named risk). If `armAsync()` cannot thread the resolved device through the leaf's existing `buildContext`/`arm` seam WITHOUT widening `CanvasLifecycleOptions`/`CanvasFrameHooks` (a change to the leaf's PUBLIC seam — which `useWebGLCanvas` AND `useCanvas2D` also depend on), that is a scope-reveal: triumvirate (research the minimal leaf-seam ADD that serves all THREE backends symmetrically — a new OPTIONAL hook the two synchronous backends ignore, plan-augment the hook signature, redress), do NOT fork the lifecycle "just for WebGPU." The expected outcome is the clean wrapper-owned async prelude with NO leaf-seam change.
- **The WGSL port cannot reach OKLab-ΔE parity within a credible bar** (the §scope-2/3 risk). If the aurora WGSL port's capture-pair ΔE blows past a defensible perceptual threshold and three iterations have not isolated whether the cause is a uniform alignment mismatch (the garbage-read trap — std140 GLSL vs WGSL's stricter struct alignment), an OETF/OKLCh-matrix transcription error in the shared chunk, or a genuine rasterizer drift, halt and triumvirate — the uniform-buffer source-of-truth or the shared-WGSL-chunk transcription is the suspect, not a per-shader-line edit loop. The push/pop error scope + `uncapturederror` must be live to surface a validation error deterministically. The goo-blob `fwidth()` sites are an explicit suspect for the blob's ΔE — if the AA-edge/Toksvig delta is the offender, the WGSL `fwidth()` semantics (coarse vs fine derivatives) are the line, not the SDF body.
- **The compute-particle WebGL2 fallback (transform-feedback) is materially divergent** (the §scope-4 risk). If the transform-feedback particle-stepping fallback cannot reproduce the curl-noise advection within the parity bar (a genuine no-compute limit), the recorded outcome is a documented Canvas2D point-cloud fallback OR a `webgl2-only`/`degraded` parity status on the WebGL2 row (NOT a silent visual mismatch) — a triumvirate decides which, it is not a unilateral fork.
- **File-bounds expansion that risks the WebGL2 backend** — if a migration forces an edit to `useWebGLCanvas.ts` or the leaf's behaviour in a way that risks the WebGL backend (an aurora/goo-blob park/freeze regression), that is a scope-reveal: triumvirate (the leaf change must be proven symmetric — the `proof:webgl-substrate-single` WebGL/Canvas2D clauses + aurora's behavioural suite stay green). A leaf seam ADD the WebGL backend ignores is fine; a seam CHANGE that re-times the WebGL loop is a triumvirate.
- **The parity gate cannot distinguish genuine delegation from a leaf-import fig-leaf** — if `proof:gpu-substrate-single`'s clause C (both-backends-compose-the-leaf, no-re-fork) self-test bite fails to red a synthetic substrate that imports the leaf AND re-inlines a `new Set<>` + rAF loop (composition-plus-fork is still a fork), halt and triumvirate — the gate's no-fork detection shape is the suspect.
- **Diagnostic loop halt** — if any born-RED viz gate (`proof:flow-field`/`proof:concentric`) reds after the viz lands and three iterations have not isolated whether the failure is the compute-pass advection, the instanced-draw, the PRM-freeze wiring, or the parity readback, halt and triumvirate.

## File Bounds

| File | Access |
|---|---|
| `src/composables/glass/webgpu/useWebGPUCanvas.ts` | create (the third backend over the leaf) |
| `src/composables/glass/webgpu/useGpuSubstrate.ts` | create (the transparent feature-detect picker) |
| `src/composables/glass/webgpu/glassShader.wgsl` | read (the pilot WGSL-convention seed — NOT edited; it stays consumer-less or gains a consumer in a future wave, not this one) |
| `src/composables/glass/webgl/createCanvasLifecycle.ts` | read-IF (the leaf the backend composes; modify ONLY if scope-1 proves a symmetric public-seam ADD is needed — a Triumvirate trigger, not a default) |
| `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` | read (the GLSL source the WGSL twin transcribes — NOT edited) |
| `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` | create (the consumer-#2 assert) |
| `scripts/proof-gpu-substrate-single.mjs` | create (the parity gate, born-RED) |
| `src/components/custom/aurora/constants/shaders/aurora.wgsl` | create (the NET-NEW primary path) |
| `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` | create (the shared OETF+OKLCh WGSL chunk) |
| `src/components/custom/aurora/composables/runtime.ts` | modify (add the WGSL `setupWGPU` twin path; the studio model unchanged) |
| `src/components/custom/aurora/composables/glSetup.ts` | modify (the WGSL setup twin) |
| `src/components/custom/aurora/composables/uniformBridge.ts` | modify (the WGSL bind-group-0 typed-struct source-of-truth) |
| `src/components/custom/aurora/Aurora.vue` | modify (compose `useGpuSubstrate` over the direct `createWebGLCanvas`) |
| `src/components/custom/aurora/README.md` | modify (the Substrate section) |
| `src/components/custom/goo-blob/shaders/metaball.wgsl` | create (the NET-NEW primary path — incl. the two `fwidth()` sites) |
| `src/components/custom/goo-blob/composables/*` (the renderer + `uploadBlobUniforms.ts`) | modify (the WGSL setup twin + the bind-group; the ColorResolver/satellite thread) |
| `src/components/custom/goo-blob/GooBlob.vue` | modify (compose `useGpuSubstrate`) |
| `src/components/custom/goo-blob/README.md` | modify (the Substrate section) |
| `src/components/custom/dot-flow-field/**` | create (the NEW feature-dir — components at root, composables/, constants.ts, shaders/ (.compute.wgsl + .render.wgsl + the .glsl.ts or Canvas2D fallback), README.md) |
| `src/components/custom/concentric/**` | create (the NEW feature-dir — concentric.wgsl + concentric.glsl.ts + composables/ + constants.ts + README.md) |
| `src/components/custom/index.ts` | modify (barrel-export the two new viz) |
| `src/subpaths/dot-flow-field.ts` | create (`export * from "../components/custom/dot-flow-field";`) |
| `src/subpaths/concentric.ts` | create (`export * from "../components/custom/concentric";`) |
| `src/api/index.ts` | modify (publish the two new viz config/handle types + any constants) |
| `src/components/custom/PROCEDURAL-SUITE.md` | create (the suite family home — covers ALL seven viz) |
| `package.json` | modify (the `exports` + `typesVersions` for the two new subpaths; the `proof:gpu-substrate-single`/`proof:flow-field`/`proof:concentric` scripts) |
| `scripts/proof-flow-field.mjs` | create (born-RED) |
| `scripts/proof-concentric.mjs` | create (born-RED) |
| `demo/stories/substrates/dot-flow-field.vue` | create (the substrates-band story) |
| `demo/stories/substrates/concentric.vue` | create |
| `demo/stories/substrates/presets.ts` | modify (the teal-on-navy + warm-identity demo presets — presets-in-consumers) |
| `demo/stories/manifest.ts` | modify (the two new substrates-band rows) |
| `tests-visual/flow-field.spec.ts` | create (the binding π) |
| `tests-visual/concentric.spec.ts` | create (the binding π) |
| `docs/tranches/BB/audit/gpu-parity-table.md` | create (the machine-read parity table) |
| `docs/tranches/BB/audit/visual/W-VIZ-SUITE-DELTA.md` | create (the per-viz DELTA capture — own-surface PNG + freshness headers) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge rows) |

Do NOT touch:
- **`src/components/custom/aurora/constants/shaders/aurora.frag.ts`** + **`src/components/custom/goo-blob/shaders/metaball.frag.ts`** — the GL-shader fence: the two `.frag.ts` are BYTE-UNTOUCHED. The `.wgsl` is net-new; the `.frag.ts` is the WebGL2 fallback. (`git diff --stat` on the two `.frag.ts` paths is empty at close.)
- **`src/composables/glass/webgl/useWebGLCanvas.ts`** + **`src/composables/glass/canvas2d/useCanvas2D.ts`** — the existing two backends are correct (the exemplars); this wave reads `useWebGLCanvas` for the seam shape but never edits either. The WebGL2 substrate is NOT retired (the fallback-deletion regression — clause B of the gate forbids it).
- **fourier-field, constellation, watercolor-dot dirs** — not migrated in this band (the named successors / permanently-out). No edit beyond each README's "Substrate" non-migration note (which is owned by scope 6, the doc rider — a doc edit, not a code edit).
- **ppmycota purple / any demo palette into a library token** — the warm-identity default is the library's; the teal-on-navy + ppmycota-purple are DEMO presets (presets-in-consumers).
- **The standing fences** — slides/value.js/kf foreign trees (no edit); the hardened-agent git clause (no impl agent stages/commits/tags).

### 4a. Disjointness

The five sub-waves run SERIAL (not parallel), so no two units write the same path concurrently. Within the wave: W-GPU-SUBSTRATE writes ONLY `webgpu/*` + the new gate; W-AURORA-WGPU writes ONLY the aurora dir + the shared WGSL chunk; W-GOOBLOB-WGPU writes ONLY the goo-blob dir; W-FLOWFIELD + W-CONCENTRIC write disjoint NEW dirs. The shared `src/components/custom/index.ts` + `package.json` + `src/api/index.ts` + `manifest.ts` are touched by W-FLOWFIELD then W-CONCENTRIC SERIALLY (each appends its own barrel/subpath/row — no overlap, sequenced). `proof:gpu-substrate-single` is created by W-GPU-SUBSTRATE then re-pointed (the parity table grows a row) by each subsequent sub-wave's close — a sequenced single-writer per close, not a parallel write. The doc rider (`PROCEDURAL-SUITE.md` + the per-viz README Substrate sections) is finalized at W-CONCENTRIC's close (a single-writer at the end).

## Agent Units

### BB.W-VIZ-SUITE.a W-GPU-SUBSTRATE — the third backend + the picker + the born-RED parity gate

- Goal: `useWebGPUCanvas` is a thin WebGPU backend over `createCanvasLifecycle` (the third wrapper, ZERO scheduling re-fork), `useGpuSubstrate` is the transparent feature-detect picker (uniform handle shape, `armAsync` for WebGPU / `arm` for WebGL2), and `proof:gpu-substrate-single` is born-RED on the WebGPU clauses while every WebGL2/Canvas2D clause stays GREEN.
- Mechanism: scope 1 (the async prelude owns device-acquisition; `device.lost` self-heal through `bindContextEvents`; the picker uniform handle; the parity gate clause set + self-test bites).
- Files: `src/composables/glass/webgpu/{useWebGPUCanvas,useGpuSubstrate}.ts`, `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts`, `scripts/proof-gpu-substrate-single.mjs`, `package.json`.
- Sub-gate: `proof:gpu-substrate-single` born-RED at HEAD (no WebGPU bootstrap) → after the substrate lands, clauses A/C/D/E/G GREEN, clause F PENDING (no parity rows yet — the migrations fill it); `proof:webgl-substrate-single` stays GREEN (the fallback intact); the consumer-#2 test green; `npm run typecheck` exit 0; the gate self-test bites (the composition-plus-fork synthetic REDs; the verified-row-pointing-at-a-missing-file synthetic REDs).

### BB.W-VIZ-SUITE.b W-AURORA-WGPU — aurora.wgsl primary + the shared OKLCh/OETF WGSL chunk + the calibrated ΔE bar

- Goal: aurora renders byte-equivalently across both backends (a bounded OKLab ΔE capture-pair on disk), the WGSL primary path composes `useGpuSubstrate`, `aurora.frag.ts` is byte-untouched, and the shared-WGSL-chunk pattern (`procedural-color.wgsl.ts`) is established for the suite to reuse.
- Mechanism: scope 2 (transcribe the 405-line frag → `aurora.wgsl`; the single typed-struct bind-group-0 source-of-truth; the WGSL setup twin in the composables; calibrate + record the ΔE threshold).
- Files: `aurora/constants/shaders/{aurora.wgsl,procedural-color.wgsl.ts}`, `aurora/composables/{runtime,glSetup,uniformBridge}.ts`, `aurora/Aurora.vue`, `aurora/README.md`, `docs/tranches/BB/audit/gpu-parity-table.md`.
- Sub-gate: the aurora capture-pair OKLab ΔE ≤ the calibrated threshold (recorded as a gate fact); `proof:gpu-substrate-single` clause F aurora row `parity: verified` with the on-disk capture-pair RESOLVING; `git diff --stat aurora.frag.ts` empty; aurora's behavioural suite (`proof:aurora-studio`, `proof:aurora-atoms-render`) stays green; `npm run typecheck` + `npm run build` exit 0.

### BB.W-VIZ-SUITE.c W-GOOBLOB-WGPU — metaball.wgsl primary + the ColorResolver/satellite + the two fwidth() sites

- Goal: goo-blob renders byte-equivalently across both backends, the ColorResolver injection + the per-satellite uniform upload + the BA.W-GOO-REDRESS worst-case-orbit widen + the two `fwidth()` derivative sites thread through the WGSL fragment pass identically, and `metaball.frag.ts` is byte-untouched.
- Mechanism: scope 3 (transcribe the 417-line SDF frag → `metaball.wgsl` incl. the two `fwidth()` calls; thread the injection + the satellite envelope; the shipped `proof:blob-render`/`proof:blob-smin-normalized` are the parity oracle).
- Files: `goo-blob/shaders/metaball.wgsl`, `goo-blob/composables/*` (renderer + `uploadBlobUniforms.ts`), `goo-blob/GooBlob.vue`, `goo-blob/README.md`, the parity table.
- Sub-gate: the blob capture-pair OKLab ΔE ≤ the calibrated threshold (with the AA-edge + Toksvig sites explicitly in-band); `proof:gpu-substrate-single` clause F blob row `parity: verified`; the WebGPU output matches the calm-lean ceiling + four-side containment (`proof:blob-render`/`proof:blob-smin-normalized` green on the WebGPU path); `git diff --stat metaball.frag.ts` empty; `npm run typecheck` + `npm run build` exit 0.

### BB.W-VIZ-SUITE.d W-FLOWFIELD — the dot-flow-field NEW viz (compute curl-noise + instanced billboards)

- Goal: a `<DotFlowField>` primitive that reads as the reference image (teal dots over dark navy, curl-noise streamlines rippling as Gerstner/Tessendorf waves) on the WebGPU compute-particle path, with a working WebGL2 fallback, a warm-identity default palette (teal-on-navy a demo preset), and a substrates-band story honoring the one-GL-context-per-route budget.
- Mechanism: scope 4 (the feature-dir; the compute advection pass + the instanced-draw render pass; the WebGL2 transform-feedback / Canvas2D fallback; the configurator studio).
- Files: `src/components/custom/dot-flow-field/**`, `src/subpaths/dot-flow-field.ts`, `src/components/custom/index.ts`, `src/api/index.ts`, `package.json`, `scripts/proof-flow-field.mjs`, `demo/stories/substrates/{dot-flow-field.vue,presets.ts}`, `demo/stories/manifest.ts`, `tests-visual/flow-field.spec.ts`.
- Sub-gate: `proof:flow-field` born-RED before the viz lands → GREEN at close (the source predicates + the binding π); `proof:colocation` GREEN (the new dir's composables/constants/shaders/README); `proof:storybook-complete` GREEN (the story covers the export); the π live readback (the field animates, PRM freezes it to ONE static frame, the dots render along streamlines, the parity holds); the own-surface DELTA capture (light+dark PNG + freshness headers); `npm run typecheck` + `npm run build` exit 0.

### BB.W-VIZ-SUITE.e W-CONCENTRIC — the concentric NEW viz (radial Fourier ring interference) + the suite family doc

- Goal: a `<Concentric>` primitive rendering a radial sum-of-sines / Fourier ring-interference field (the 3D-rendered-to-2D concentric-wave ask) on the WebGPU fragment path with a GLSL fallback, a warm-identity default, a substrates-band story, AND the closing suite family doc (`PROCEDURAL-SUITE.md` + the per-viz README Substrate sections for all seven viz).
- Mechanism: scope 5 + scope 6 (the feature-dir; `concentric.wgsl` + the GLSL fallback; the configurator studio; the family doc rider).
- Files: `src/components/custom/concentric/**`, `src/subpaths/concentric.ts`, `src/components/custom/index.ts`, `src/api/index.ts`, `package.json`, `scripts/proof-concentric.mjs`, `demo/stories/substrates/concentric.vue`, `demo/stories/manifest.ts`, `tests-visual/concentric.spec.ts`, `src/components/custom/PROCEDURAL-SUITE.md`, the five extant viz READMEs' Substrate sections.
- Sub-gate: `proof:concentric` born-RED → GREEN; `proof:colocation` + `proof:storybook-complete` GREEN; the π live readback (the rings render + interfere, PRM freezes, parity holds); the own-surface DELTA; `proof:gpu-substrate-single` clause F complete (all migrated rows resolve); the suite family doc present + covering all seven viz; `npm run typecheck` + `npm run build` exit 0.

---

## DESIGN

### The aesthetic — the dot-flow-field (the reference image)

The wave reference (`docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg`, READ this authoring): small TEAL dots over a DARK NAVY ground, seeded along undulating STREAMLINES — a flow field — rippling in gorgeous waves like wind / fabric / water flow. It is NOT a rigid grid: it is a flowing curl/wave-warped vector field TRACED by dots whose size + density VARY along the streamline. The aesthetic is subtle, elegant, sophisticated (the "Claude co-work" dot-wave). In the reference the dots cluster denser where the field is calm + thin out where it accelerates; the streamlines fold + braid like a river delta, sweeping diagonally across the frame. The default library palette is warm-cream-identity (resolved via the ColorResolver); the teal-on-navy is a DEMO preset (presets-in-consumers — it reproduces the reference exactly, but NEVER enters a library token).

### The SOTA math (real + cited)

The dot-flow-field is a **curl-noise flow field traced by advected particles, where the scalar potential undulates as a Gerstner / Tessendorf sum-of-sines water-wave field** — the user's verbatim "water-like waves that are Fourier-defined" + "3D-rendered-to-2D."

**1. The wave potential (Fourier-defined water — Tessendorf / Gerstner).** Ocean-surface height as a sum of sinusoids is the classic statistical-ocean model: Tessendorf's *Simulating Ocean Water* (SIGGRAPH course notes, 2001) decomposes the surface as an inverse FFT of a directional wave spectrum; the time-domain equivalent (and the cheaper real-time path the suite uses) is the **Gerstner / sum-of-sines** form. The scalar height/potential field at position **p** = (x, y) and time t:

```
h(p, t) = Σ_{i=1..N}  A_i · sin( k_i · (D_i · p) − ω_i · t + φ_i )
```

where for each wave component i: `A_i` is amplitude, `k_i = 2π / λ_i` the wavenumber (λ_i wavelength), `D_i` a unit direction, `ω_i = sqrt(g · k_i)` the deep-water dispersion frequency (g gravity — the dispersion relation that makes long waves travel faster, the "real ocean math, not arbitrary noise"), and `φ_i` a phase seed. A small N (4-8 octaves of decreasing λ + increasing direction spread) gives the braided, multi-scale undulation the reference shows. The amplitudes follow a Phillips-spectrum falloff `A_i ∝ exp(−1/(k_i·L)²) / k_i²` (L the largest wave from the dominant wind — Tessendorf §4) so the field is energy-realistic, not flat-banded.

**2. The flow field (divergence-free curl noise — Bridson).** The dots must FOLLOW the field without piling up (a divergent field would collapse them into sinks). The velocity is the **curl of the scalar potential** (Bridson, Houser, Nordenstam, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007): in 2D the curl of a scalar potential ψ is the perpendicular gradient, which is **divergence-free by construction** (∇·(∇⊥ψ) ≡ 0), so the particles swirl + braid without converging:

```
v(p, t) = ∇⊥ ψ(p, t) = ( ∂ψ/∂y , −∂ψ/∂x )
```

The suite sets the scalar potential ψ = the Gerstner wave field h(p, t) above (PLUS an optional fbm-perlin curl-noise term, weighted by `curlStrength`, for the fine braiding the pilot's `fbm` already demonstrates), so the flow streamlines ARE the iso-contours of the water-wave height — the dots ride the wave crests + troughs, which is precisely the reference's "rippling in waves." The gradient is computed ANALYTICALLY from the sum-of-sines (each term's ∂/∂x, ∂/∂y is a cosine — no finite-difference needed) so the field is exact + cheap. Concretely, for the Gerstner term: `∂h/∂x = Σ_i A_i · k_i · D_i.x · cos(θ_i)`, `∂h/∂y = Σ_i A_i · k_i · D_i.y · cos(θ_i)` where `θ_i = k_i·(D_i·p) − ω_i·t + φ_i`; the velocity is `v = (∂h/∂y, −∂h/∂x)`.

**3. The particle advection (the compute pass).** Each particle integrates `p_{n+1} = p_n + v(p_n, t) · dt` (forward Euler; RK2 — a half-step midpoint — if drift accumulates) in the compute shader, wrapping / re-seeding at the domain edge (a particle that leaves the bounds re-spawns at a low-density region from its `seed`, so coverage stays steady). Per-particle size + alpha modulate with `|v|` (denser-where-calm, the reference's varying dot size): `size_i = size_base · (1 − clamp(|v_i| / v_max, 0, 1) · sizeVel)` and the dot is drawn as an instanced billboarded quad (a soft-edged circle via a radial smoothstep in the fragment), which the SOTA recommends over a GL point-list because point-size is capped + non-uniform across drivers and gives no per-particle size control.

**4. The concentric viz (radial Fourier ring interference).** Concentric is the radial analogue — a fullscreen fragment field where the value at **p** is a sum of radial sinusoids about one-or-more centers c_j, the Fourier ring expansion:

```
f(p, t) = Σ_{j}  Σ_{i=1..M}  A_i · sin( k_i · ‖p − c_j‖_e − ω_i · t + φ_i )
```

where `‖·‖_e` is the ELLIPSOIDAL norm (`sqrt((dx/a)² + (dy/b)²)` with axis ratios a, b) so the rings are concentric ellipsoids (the "3D-rendered-to-2D" depth implication — a tilted disc reads as ellipses), and the multi-center sum produces ring INTERFERENCE (moiré-like beats where two ring families cross — the elegant concentric-wave aesthetic). The amplitude/frequency ladder is the same Fourier-series decomposition as the wave potential (the suite's ONE math vocabulary). It is a pure fragment pass (no particles) — the same shape-class as aurora.

### The WebGPU-first pipeline

**The substrate (shared, all WebGPU members):** `useWebGPUCanvas` → `createCanvasLifecycle` (the leaf). The async prelude (`armAsync`) acquires `navigator.gpu.requestAdapter()` → `adapter.requestDevice()`, configures `context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "premultiplied" })`, runs the consumer's `setup(device, ctx, format)`, THEN calls the leaf's sync `arm()`. `device.lost` → the self-heal (re-acquire unless `reason === "destroyed"`).

**The shared WGSL idioms (from the pilot `glassShader.wgsl`):**
- The `Uniforms` struct with explicit `_pad: vec2<f32>`/`_padN` fields so the std140/WGSL 16-byte struct alignment is honored (a misaligned struct reads garbage — the parity-ΔE-blowout trap; the typed-struct source-of-truth in `uniformBridge.ts` emits both the WGSL struct decl AND the matching JS `ArrayBuffer` write offsets).
- `@group(0) @binding(0) var<uniform> u: Uniforms;` (+ `@binding(1)` a `var<storage, read>` particle buffer for the flow field's compute/render).
- The full-screen-triangle `vs_main`: `@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4<f32>` emitting the 3-vertex covering triangle (NDC corners `(-1,-1)`,`(3,-1)`,`(-1,3)`) — no vertex buffer.

**dot-flow-field (compute + instanced render):**
- *Compute pass* (`flow-field.compute.wgsl`): a `@compute @workgroup_size(64)` kernel over the particle storage buffer (`var<storage, read_write> particles: array<Particle>;`, `Particle { pos: vec2<f32>, age: f32, seed: f32 }`). Each invocation (`@builtin(global_invocation_id)` indexing the particle, bounds-guarded against the dispatch tail) reads its particle, evaluates `v(p, t) = ∇⊥ ψ(p, t)` analytically from the uniform wave-component table (the Gerstner sum) + the curl-noise term, integrates one Euler/RK2 step, wraps/re-seeds at the edge, and writes back. The wave-component table (A_i, k_i, D_i, ω_i, φ_i for ≤ MAX_WAVE_COMPONENTS) + dt + time + domain bounds + curlStrength ride a uniform buffer (the typed-struct source-of-truth, explicit `_pad` alignment). Dispatch `ceil(particleCount / 64)` workgroups per frame from the render-pass-host (one command encoder: compute pass → render pass → submit).
- *Render pass* (`flow-field.render.wgsl`): an instanced draw — `vs_main` reads `@builtin(instance_index)` to fetch the particle from the storage buffer + `@builtin(vertex_index)` for the billboard quad corner (a 6-vertex or triangle-strip-4 quad), sizes the quad by `size_i`, positions it at `p_i` in clip space; `fs_main` draws the soft circle (radial `smoothstep(1.0, 1.0 − feather, length(local_uv))`) in the resolved color (the ColorResolver palette, sampled by the local field value for the subtle teal-gradient the reference shows). Premultiplied-alpha blend over the navy clear (`blend: { color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" } }`).
- *WebGL2 fallback*: transform-feedback particle stepping (a vertex-shader advection writing back to a feedback buffer, ping-ponged) + an instanced-array draw; OR — if transform-feedback parity is materially divergent (the §3a risk) — a CPU-stepped Canvas2D point cloud (`useCanvas2D` over the leaf, the fourier/constellation precedent). The fallback's parity status is recorded honestly (`verified` / `degraded` / `webgl2-only`).

**concentric (fullscreen fragment, the aurora shape):**
- *Render pass* (`concentric.wgsl`): the full-screen-triangle `vs_main` (the pilot's idiom) + a `fs_main` that evaluates `f(p, t)` (the radial Fourier ring sum over ≤ MAX_CENTERS centers × ≤ MAX_RINGS components) per fragment, maps the value through the ColorResolver palette (OKLCh interpolation via the shared `procedural-color.wgsl.ts` chunk), and tone-maps. The wave-component + center table rides the uniform buffer.
- *WebGL2 fallback*: a `concentric.glsl.ts` GLSL twin (the same fragment shape — the aurora-class clean port).

**aurora / goo-blob (migrated, fullscreen fragment):** the `aurora.wgsl` / `metaball.wgsl` transcribe the existing `.frag.ts` line-for-line into WGSL (the Uniforms struct + the `@group(0)@binding(N)` bind group + the full-screen-triangle `vs_main`), splicing the shared `procedural-color.wgsl.ts` OETF+OKLCh chunk. The goo-blob WGSL keeps its two `fwidth()` sites (WGSL fragment-stage derivative builtins). The `.frag.ts` stay the byte-untouched WebGL2 fallbacks.

---

## COMPONENT SPEC (README-grade) — dot-flow-field

### Colocation dir layout

```
src/components/custom/dot-flow-field/
├── DotFlowField.vue              # the component (root)
├── composables/
│   ├── useDotFlowField.ts        # the public composable (the studio handle + lifecycle wiring)
│   ├── useFlowParticles.ts       # the particle buffer alloc + re-seed + the compute dispatch
│   └── flowField.ts              # the analytic ∇⊥ψ evaluator (the Gerstner sum + curl-noise; pure, testable — the single math source the WGSL shader transcribes)
├── constants.ts                  # DEFAULT_FLOW_CONFIG, MAX_PARTICLES, MAX_WAVE_COMPONENTS, the warm-identity default palette stops
├── shaders/
│   ├── flow-field.compute.wgsl   # the curl-noise advection compute kernel (WebGPU primary)
│   ├── flow-field.render.wgsl    # the instanced-billboard render pass (WebGPU primary)
│   └── flow-field.glsl.ts        # the WebGL2 transform-feedback fallback (OR a Canvas2D path, per §3a)
├── index.ts                      # the package barrel
└── README.md                     # the per-viz doc (incl. the Substrate section + the cited math)
```

### Public prop table (`<DotFlowField>`)

| prop | type | default | range | note |
|---|---|---|---|---|
| `config` | `FlowFieldConfig` | `DEFAULT_FLOW_CONFIG` | — | the full author schema (the studio's `useConfiguratorState` model) |
| `particleCount` | `number` | `4000` | `500..MAX_PARTICLES` (16384) | the advected-dot count; coarse-pointer/mobile clamps lower |
| `waveComponents` | `WaveComponent[]` | 6-octave Phillips ladder | `1..MAX_WAVE_COMPONENTS` (8) | the Gerstner sum-of-sines table (A, λ, direction, phase per octave) |
| `windDirection` | `number` (deg) | `35` | `0..360` | the dominant wave-travel direction (the field's overall lean — the reference's diagonal flow) |
| `windSpeed` | `number` | `1.0` | `0..3` | the dispersion-driven travel speed (scales ω) |
| `curlStrength` | `number` | `0.6` | `0..1` | the fbm curl-noise braiding term weight over the pure Gerstner field |
| `dotSize` | `number` | `2.4` | `0.5..8` (px @ 1×) | the billboard base radius |
| `dotSizeVelocity` | `number` | `0.5` | `0..1` | how much `|v|` thins the dot (denser-where-calm — the reference's varying size) |
| `palette` | `OklchStop[]` | warm-cream identity | `2..MAX_STOPS` | the dot-color ramp (the demo themes it teal); resolved via the ColorResolver |
| `background` | `OklchStop \| "transparent"` | `transparent` | — | the ground (the demo sets dark navy; default transparent so it reads over the page) |
| `interactive` | `boolean` | `false` | — | pointer-warp the field (a local velocity perturbation about the cursor; uses the leaf `wake()` on `pointer.active`) |
| `autoLuminance` | `boolean` | `false` | — | the W55 sampled-backdrop hook (off by default; the dock is the only binary consumer of that observer) |
| `respectReducedMotion` | `boolean` | `true` | — | inherited from the leaf — ONE static frame then park under PRM |

`FlowFieldConfig` (the author schema), `WaveComponent`, `DotFlowFieldHandle`, `DotFlowFieldInstance` are published on `@mkbabb/glass-ui/api`.

### Subpath + composable + studio

- **Subpath:** `@mkbabb/glass-ui/dot-flow-field` (`src/subpaths/dot-flow-field.ts` → `export * from "../components/custom/dot-flow-field"`).
- **Composable:** `useDotFlowField(canvasRef, options)` — composes `useGpuSubstrate` (the picker), wires `useIntersectionPause` (offscreen), exposes `pause()`/`resume()`/`wake()`/`reducedMotion` (the `DockBackgroundToggle` WCAG-2.2.2 seam binds these), and returns `DotFlowFieldHandle`.
- **Configurator studio:** the tunable surface exposes `useConfiguratorState<FlowFieldConfig>` with `cloneMode="commit-on-write"` (the LIBRARY-default single-surface viz — a preset switch is a clean reset, like the blob; the DEMO studio may use `per-preset` like the blob/aurora/fourier demo studios for named-baseline round-tripping). It inherits the AZ.W-HIERARCHY configurator hierarchy vocabulary (the `--configurator-section-*` rungs — no per-studio hand-tuning).
- **Warm-identity default + presets-in-consumers:** `DEFAULT_FLOW_CONFIG`'s palette is the neutral warm-cream identity (resolved via the ColorResolver / `src/composables/color` + value.js helpers). The teal-on-navy reference reproduction is a DEMO preset in `demo/stories/substrates/presets.ts` (NEVER a library token).

## COMPONENT SPEC (README-grade) — concentric

### Colocation dir layout

```
src/components/custom/concentric/
├── Concentric.vue
├── composables/
│   ├── useConcentric.ts          # the studio handle + lifecycle wiring
│   └── ringField.ts              # the analytic f(p,t) radial-Fourier-sum evaluator (pure, testable — the single math source the WGSL shader transcribes)
├── constants.ts                  # DEFAULT_CONCENTRIC_CONFIG, MAX_RINGS, MAX_CENTERS, the warm-identity palette
├── shaders/
│   ├── concentric.wgsl           # the fullscreen WebGPU fragment pass (primary)
│   └── concentric.glsl.ts        # the WebGL2 GLSL fallback (the aurora-class twin)
├── index.ts
└── README.md
```

### Public prop table (`<Concentric>`)

| prop | type | default | range | note |
|---|---|---|---|---|
| `config` | `ConcentricConfig` | `DEFAULT_CONCENTRIC_CONFIG` | — | the studio author schema |
| `centers` | `RingCenter[]` | one centered | `1..MAX_CENTERS` (4) | the ring origins (multi-center → interference) |
| `ringComponents` | `RingComponent[]` | 5-octave ladder | `1..MAX_RINGS` (8) | the radial sum-of-sines table (A, λ, phase per octave) |
| `axisRatio` | `[number, number]` | `[1, 0.62]` | each `0.2..1` | the ellipsoidal-norm (a, b) — the 3D-tilt depth implication |
| `speed` | `number` | `0.5` | `0..2` | the ring-travel speed (scales ω) |
| `palette` | `OklchStop[]` | warm-cream identity | `2..MAX_STOPS` | the field-value color ramp; resolved via the ColorResolver |
| `interactive` | `boolean` | `false` | — | pointer adds a transient ring center |
| `respectReducedMotion` | `boolean` | `true` | — | the leaf PRM freeze |

`ConcentricConfig`, `RingCenter`, `RingComponent`, `ConcentricHandle` published on `@mkbabb/glass-ui/api`. Subpath `@mkbabb/glass-ui/concentric`; composable `useConcentric`; studio `useConfiguratorState<ConcentricConfig>` `cloneMode="commit-on-write"`; warm-identity default + presets-in-consumers (the demo themes the rings).

---

## THE SUITE FAMILY DOC — the procedural-animation suite as ONE documented family

`src/components/custom/PROCEDURAL-SUITE.md` is the family home. It is the user's explicit ask ("the procedural-animation should cover: the blob, aurora, constellation, fourier field, etc, too — extant items, too"): the suite documents EVERY member as first-class, the shared discipline once, and the per-viz capability + migration verdict. Where it lives: ONE suite-level family README at `src/components/custom/PROCEDURAL-SUITE.md` + each viz's OWN per-dir README gains a "Substrate" section (so a reader at any viz dir finds its substrate/parity/migration status locally, and the family doc is the index).

### The shared discipline (stated ONCE — every canvas-bearing member inherits it for free)

- **ONE lifecycle leaf** — `createCanvasLifecycle` owns the demand-driven scheduling + offscreen-park + live-PRM-freeze; each member composes a thin backend (`useWebGPUCanvas` / `useWebGLCanvas` / `useCanvas2D`), re-implementing ZERO scheduling.
- **Offscreen-pause** — the 3-reason suspend `Set` + the F6 `off-screen-io` IntersectionObserver split + the `contentvisibilityautostatechange` content-visibility park. A parked rAF attaches ZERO frames (`proof:offscreen-pause`).
- **Live-PRM freeze (one static frame then park)** — the leaf's live `matchMedia("(prefers-reduced-motion: reduce)")` `change` re-monitor: under reduce the loop draws ONE static frame then parks, re-arms on un-reduce. A CSS reset cannot reach the rAF — this is the JS gate.
- **Consumer-owned DPR** — the leaf does NOT bake DPR; each viz's `resize` owns the `clientWidth * dpr` backing-store policy.
- **One GL context per route** — the substrates band clusters live GL on disjoint routes; a story self-stages ONE context (the `rail.vue` / `DockStage` precedent).
- **Configurator-driven** — the tunable surface is a `useConfiguratorState<Config>` studio inheriting the AZ.W-HIERARCHY configurator hierarchy vocabulary.
- **Warm-identity default + presets-in-consumers** — the library default palette is neutral/warm-cream-identity (resolved via the ColorResolver / `src/composables/color` seam + value.js); named themed presets (teal-on-navy, ppmycota-purple) live in CONSUMERS, never a library token.
- **Cited-SOTA math** — Tessendorf/Gerstner sum-of-sines · Bridson curl-noise · Fourier series · DFT epicycles. Real math, named + cited; no arbitrary noise.

### The per-viz capability + migration table (ALL SEVEN members, first-class)

| viz | subpath | substrate (HEAD) | configurator | palette source | WebGPU-migration verdict | rank | sub-wave / reason |
|---|---|---|---|---|---|---|---|
| **aurora** | `/aurora` | WebGL2 (`aurora.frag.ts`, 405L, 0 textures/0 derivatives) | `useConfiguratorState<AuroraConfig>` per-preset | ColorResolver (`composables/color.ts`, `uniformBridge.ts`) | **MIGRATE** — cleanest port (pure fbm/OKLCh fullscreen); the WGSL primary lands, `.frag` stays the WebGL2 fallback | **1** | **W-AURORA-WGPU** (this wave) |
| **goo-blob** | `/goo-blob` | WebGL2 (`metaball.frag.ts`, 417L, SDF smin + 2 live `fwidth()` sites @ 266/364) | demo studio per-preset | injected ColorResolver (`uploadBlobUniforms.ts`) | **MIGRATE** — clean SDF port; the two `fwidth()` AA/Toksvig sites transcribe to WGSL fragment-stage `fwidth()` (the only non-trivial lines, the ΔE drift suspects) | **2** | **W-GOOBLOB-WGPU** (this wave) |
| **dot-flow-field** | `/dot-flow-field` | NEW — WebGPU compute+instanced primary, WebGL2 transform-feedback / Canvas2D fallback | `useConfiguratorState<FlowFieldConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — the compute-particle path is materially better on WebGPU (per-particle size/density the reference needs) | **3** | **W-FLOWFIELD** (this wave) |
| **concentric** | `/concentric` | NEW — WebGPU fragment primary, GLSL fallback | `useConfiguratorState<ConcentricConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — fullscreen fragment, the aurora shape-class | **4** | **W-CONCENTRIC** (this wave) |
| **fourier-field** | `/fourier-field` | **Canvas2D** (`useCanvas2D`; `math.ts` DFT epicycle math) | demo studio per-preset (`fourier-studio.vue`) | ColorResolver | **DO NOT MIGRATE (now)** — a few-to-dozens of phasors is the RIGHT tool for `ctx.stroke`; the DFT math is already GPU-agnostic. WebGPU-first WHEN POSSIBLE gives latitude | — | **W-FOURIER-GPU** (booked; trigger: harmonic density scales to thousands of phasors → GPU line-instancing wins) |
| **constellation** | `/constellation` | **Canvas2D** (`useCanvas2D`; node/edge proximity-graph lattice) | (substrate-agnostic) | ColorResolver | **DO NOT MIGRATE (now)** — Canvas2D handles the current node count fine; `proof:constellation-substrate-single` is substrate-agnostic | — | **W-CONSTELLATION-GPU** (booked; trigger: a much denser lattice → the dot-flow-field advection compute pass generalizes to constellation's nodes) |
| **watercolor-dot** | `/watercolor-dot` | **SVG/CSS only — NO drawing context** (`<filter>` feDisplacementMap + seeded prng; `useWatercolorBlob.ts` pure geometry) | (none — a decorative dot) | per-instance prng + color | **PERMANENTLY OUT** — mounts ZERO drawing context; a GPU context for one decorative dot is a regression against the ~8-context-per-page cap | — | NEVER a wave — the canonical "mark NOT to migrate, with the reason" case |

The migration ORDER is `aurora (1) → goo-blob (2) → dot-flow-field (3) → concentric (4)` — the two cleanest fragment ports first (establishing the shared-WGSL-chunk + the calibrated ΔE bar), then the two new viz born onto the proven substrate. The three non-migrating viz are recorded with the reason + the booked trigger — NOT silently omitted (the user's "cover the extant items too" is satisfied by the explicit verdict per member, not by a migration).

---

## DEMO STORY (substrates band)

Each new viz earns ONE story in the **substrates band** (beside aurora/fourier/constellation), honoring the **one-GL-context-per-route budget**:

- `demo/stories/substrates/dot-flow-field.vue` — the configurator studio: `<DotFlowField>` over a dark-navy ground with the teal-on-navy DEMO preset (the reference reproduction) + the warm-identity default toggle, the `useConfiguratorState` controls column (windDirection / windSpeed / curlStrength / dotSize / dotSizeVelocity / particleCount / palette swatches), a `DockBackgroundToggle` (WCAG 2.2.2 pause), and the studio hierarchy vocabulary. ONE GL context (the dot-flow-field's own).
- `demo/stories/substrates/concentric.vue` — the configurator studio for `<Concentric>` (centers / axisRatio / ringComponents / speed / palette). ONE GL context.
- `demo/stories/manifest.ts` — two new rows in the `substrates` category. The `substrates` CATEGORY_DEFAULT_BG is `aurora`, but each story SELF-stages its own viz, so the row sets `background: "none"` and the story owns the field — the same self-stage pattern `rail.vue` uses, to avoid stacking a SECOND GL context against the one-per-route budget.

The stories are the visual-load-bearing demonstration (`proof:storybook-complete` — every public component reachable from the surface has ≥1 story SFC; the two new viz exports MUST be covered).

---

## DISCIPLINE inherited (the suite contract)

Every canvas-bearing member (all but watercolor-dot) honors the shared discipline — inherited from the ONE leaf for free, NOT re-implemented:

- **Offscreen-pause.** The 3-reason suspend `Set` + the F6 `off-screen-io` IntersectionObserver split + the `contentvisibilityautostatechange` content-visibility park. A parked rAF attaches ZERO frames (`proof:offscreen-pause`).
- **Live-PRM freeze (one static frame then park).** The leaf's live `matchMedia("(prefers-reduced-motion: reduce)")` `change` re-monitor: under reduce the loop draws ONE static frame then parks, re-arms on un-reduce. A CSS reset cannot reach the rAF — this is the JS gate. The compute-particle path freezes the advection (the static frame shows the seeded streamlines at the frozen t).
- **Consumer-owned DPR.** The leaf does NOT bake DPR; each viz's `resize` owns the `clientWidth * dpr` backing-store policy (the (d) bar).
- **Tab-hidden park.** The `document.hidden` `visibilitychange` owner (ONE writer of `tab-hidden`).
- **The WebGPU/WebGL2 parity bar.** A migrated viz's `.wgsl` primary + `.frag`/`.glsl`/Canvas2D fallback render byte-equivalently, verified via the `renderAt` capture-pair (a deterministic frame, same t + config, readback via `copyTextureToBuffer`→`mapAsync` (WebGPU) + `readPixels` (WebGL2), a bounded OKLab ΔE — NOT byte-exact: two rasterizers differ sub-pixel, the bar is "visually equivalent"). The threshold is CALIBRATED against the aurora migration (the first, cleanest) and recorded as a gate fact. This is the SAME deterministic-capture discipline `profile:aurora` uses (renderAt→readPixels is the GPU floor under headless Chrome — the live-rAF path does not drive frames headless).
- **The WebGL2 fallback is permanent (NOT retired).** The picker (`useGpuSubstrate`) feature-detects `navigator.gpu` and degrades gracefully. Both paths stay until the ~5-10% tail (Linux Firefox, pre-A12 iPhones, flagged Firefox-Android) closes — TRACKED, not assumed. Clause B of the gate forbids a deleted-fallback green.

---

## Hard Gate — `proof:gpu-substrate-single` (NEW, born-RED) + `proof:flow-field` + `proof:concentric` + the parity captures

### `proof:gpu-substrate-single` — the generalized dual-substrate parity gate

A SUPERSET of `proof:webgl-substrate-single` (born-RED on the new WebGPU clauses; every WebGL2/Canvas2D clause stays GREEN). Source predicates (each falsifiable, each with a self-test bite):

1. **Clause A — ONE WebGPU bootstrap.** `navigator.gpu.requestAdapter` AND `getContext("webgpu")` AND `context.configure(` appear in EXACTLY ONE src file: `src/composables/glass/webgpu/useWebGPUCanvas.ts`. A viz calling `navigator.gpu` directly REDs it (it must compose the substrate). Mirror of clause (a) for `getContext("webgl2")`. RED at HEAD: zero WebGPU bootstrap exists.
2. **Clause B — ONE WebGL2 fallback bootstrap (PRESERVED, not retired).** `getContext("webgl2")` still appears in exactly ONE file (the existing WebGL2 substrate). A gate that greens on a DELETED WebGL2 substrate is WRONG — the fallback is load-bearing for the ~5-10% tail. Self-test: a synthetic tree with the WebGL2 substrate deleted REDs.
3. **Clause C — both backends compose the ONE leaf, no re-fork.** `useWebGPUCanvas.ts` AND `useWebGLCanvas.ts` both import `createCanvasLifecycle` from `../webgl/createCanvasLifecycle` and DELEGATE the schedule; NEITHER re-declares an inline suspend `Set` + `isRunning` + a local `requestAnimationFrame(tick)` loop + a `matchMedia("(prefers-reduced-motion: reduce)")` re-monitor. Carries the W-CANVAS-UNIFY no-fork bite forward into the third backend. **Self-test bite:** a synthetic substrate that imports the leaf AND re-inlines a `new Set<>` + rAF loop REDs (composition-plus-fork is still a fork — distinguish genuine delegation from a leaf-import fig-leaf).
4. **Clause D — no baked viz choices in the WebGPU substrate.** `useWebGPUCanvas.ts` imports nothing viz-specific (no aurora/blob/flow-field import), hard-codes no `devicePixelRatio` DPR policy, no aurora/blob uniform names (`uNuclei`/`uStop`/`uCursor`), no full-screen-triangle literal. The WGSL pipeline is the consumer's `setup`. Mirror of (b).
5. **Clause E — the WebGPU scheduling + device-loss robustness present.** The substrate carries (via the composed leaf) `"tab-hidden"`/`"off-screen"`/`"manual"`/`shouldContinue` AND its OWN `device.lost` self-heal (the WebGPU twin of `webglcontextrestored`) wired through `bindContextEvents`, distinguishing `reason === "destroyed"` from a TDR re-acquire. A substrate missing `device.lost` handling REDs (the blank-surface-forever risk).
6. **Clause F — the PARITY TABLE is declared + consistent.** `docs/tranches/BB/audit/gpu-parity-table.md` (machine-read by the gate) lists, per migrated viz: its `.wgsl` primary path + its `.frag`/`.glsl` fallback path + a `parity: verified | pending | webgl2-only | degraded | no-migrate` status. The gate asserts: (i) every declared `.wgsl`/`.frag` path RESOLVES ON DISK (the anti-evasion floor — a `verified` row pointing at a missing file REDs, mirroring `proof:ba-gestalt`'s capture-resolves discipline); (ii) every viz with a live WebGPU path has BOTH files present; (iii) no viz claims `verified` without a paired pixel-parity capture artefact on disk + a recorded OKLab ΔE within the calibrated threshold; (iv) the THREE non-migrating viz (fourier-field, constellation, watercolor-dot) carry a `no-migrate` row with a non-empty reason string (so the family table cannot silently omit an extant member — the user's "cover the extant items" enforced). **Self-test bite:** a synthetic parity row with `verified` pointing at a nonexistent `.wgsl` REDs.
7. **Clause G — the consumer-#2 usability assert.** `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` exists (a non-aurora composition of the substrate, mirroring the WebGL2 consumer-#2 test). Born-absent → RED.

The calibrated OKLab ΔE threshold is recorded as a gate FACT (the parity-credibility floor — too strict reds on legitimate rasterizer drift, too loose greens a broken port; the bar accommodates SwiftShader GL-vs-GPU sub-pixel rasterizer drift — visually-equivalent, not bit-identical). Proposed starting bar (the agent records the empirical value): mean ΔE ≤ 2.0, p99 ≤ 5.0.

### `proof:flow-field` (born-RED) — the dot-flow-field gate

Source predicates: (1) the feature-dir exists with the colocation layout (composables/ + constants.ts + shaders/{compute.wgsl,render.wgsl,fallback} + README.md); (2) `DotFlowField.vue` composes `useGpuSubstrate` (NOT `createWebGLCanvas`/`navigator.gpu` directly); (3) the compute pass advects particles via the analytic `∇⊥ψ` (the `flowField.ts` Gerstner-sum evaluator is the single source — the shader + the JS evaluator agree on the wave-component math, asserted by a unit round-trip: the JS `flowField.ts` and the WGSL transcription produce the same `v(p,t)` at a fixed sample set within fp tolerance); (4) the WebGL2 fallback path exists + its parity status is declared in the parity table; (5) the DEFAULT palette is warm-identity (no teal-on-navy in `constants.ts` — the demo owns it); (6) a `demo/stories/substrates/dot-flow-field.vue` story covers the export (`proof:storybook-complete` green).

**Binding π — `tests-visual/flow-field.spec.ts`** (the live readback, the gestalt bar): mounts `<DotFlowField>` on a real device over the demo navy ground, and asserts:
- **The field ANIMATES** — N frames sampled via the `renderAt` capture path show the dots TRAVEL along the streamlines (a per-frame centroid/flow displacement above a floor; not a static slab).
- **The dots RENDER along streamlines** — the painted surface has the dot-cluster structure (a coverage/dot-count in the expected band; denser-where-calm — a spatial-variance assert distinguishing a flow field from a uniform grid).
- **PRM FREEZES it to ONE static frame** — under emulated `prefers-reduced-motion: reduce`, two sampled frames are IDENTICAL (the loop drew one static frame then parked).
- **The parity HOLDS** — the WebGPU vs WebGL2 capture-pair OKLab ΔE ≤ the calibrated threshold (skip-by-policy if the CI image's WebGPU SwiftShader adapter fails to init, with a recorded fallback-to-WebGL2-SwiftShader note — the SwiftShader init-flakiness risk).

### `proof:concentric` (born-RED) — the concentric gate

Source predicates mirror `proof:flow-field` (colocation; composes `useGpuSubstrate`; the `ringField.ts` radial-Fourier evaluator single-sources the shader math via a round-trip; the GLSL fallback declared; warm-identity default; the story covers the export).

**Binding π — `tests-visual/concentric.spec.ts`:** mounts `<Concentric>`, asserts the RINGS render + INTERFERE (a radial periodicity in the painted field + the multi-center beat structure — a concentric-ring spatial-frequency assert), the field ANIMATES (the rings travel over N frames), PRM FREEZES it (two identical frames), and the parity HOLDS (the capture-pair ΔE).

### The cardinal-lesson DELTA requirement (own-surface capture + freshness headers)

`docs/tranches/BB/audit/visual/W-VIZ-SUITE-DELTA.md` records, per migrated/new viz, an OWN-SURFACE capture (the wave's own `/substrates/dot-flow-field` + `/substrates/concentric` + the migrated `/substrates/aurora` + `/substrates/goo-blob` routes), at the protocol floor (≥2 viewport × {light, dark} — an own-surface light AND dark PNG), with the AZ-form freshness headers so `proof:live-verified-ledger --strict-freshness` can re-verify the capture is not stale:

```
<!-- surface-paths: src/components/custom/dot-flow-field/DotFlowField.vue,src/components/custom/dot-flow-field/shaders/flow-field.compute.wgsl,src/components/custom/dot-flow-field/shaders/flow-field.render.wgsl -->
<!-- surface-hash: <sha256 hex of those files' bytes at capture time> -->
```

Plus the per-viz parity capture-PAIR (the WebGPU PNG + the WebGL2 PNG + the recorded OKLab ΔE) for the aurora + goo-blob migration rows (the clause F(iii) on-disk artefacts). A parity row claiming `verified` without an on-disk capture pair is the close-class lie (`proof:ba-gestalt`'s missing-capture forbidden-PASS class) — clause F(iii) + the self-test bite forbid it.

---

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after each sub-wave's source lands; `node scripts/proof-gpu-substrate-single.mjs` born-RED before the substrate (proof the WebGPU clauses fail on the bare tree) → GREEN at close; `npm run build` after each migration (the WGSL chunks + the per-subpath split must emit); `node scripts/proof-flow-field.mjs` + `node scripts/proof-concentric.mjs` born-RED before each viz → GREEN at close; `npm run proof:colocation` GREEN after each new dir; `npm run proof:storybook-complete` GREEN after each new story; `npm run proof:webgl-substrate-single` GREEN throughout (the fallback intact); `npm run proof:gate-script-parity` after the three new gate scripts (the registry stays sound); `npm run verify-export-types` after the two new subpaths + the api publication; `npx playwright test tests-visual/flow-field.spec.ts tests-visual/concentric.spec.ts` for the binding π; `git diff --stat` on the two `.frag.ts` paths empty (the fence); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-VIZ-SUITE-DELTA.md` — the per-viz own-surface light+dark PNGs + the freshness headers + the parity capture-pairs (WebGPU + WebGL2 + the recorded ΔE) for aurora + goo-blob.
- `docs/tranches/BB/audit/gpu-parity-table.md` — the machine-read parity table (per-viz `.wgsl`/`.frag` paths + `verified`/`pending`/`no-migrate`/… status, all resolving on disk; the three non-migrating viz carry a `no-migrate` + reason row).
- `src/components/custom/PROCEDURAL-SUITE.md` — the suite family doc (all seven members, the shared discipline, the capability/migration table).
- The `proof:gpu-substrate-single` JSON artefact (born-RED WebGPU-clause log + GREEN-at-close log + the self-test bite results + the recorded ΔE threshold fact).
- The `proof:flow-field` + `proof:concentric` JSON artefacts (born-RED → GREEN).
- The `proof:webgl-substrate-single` GREEN log (the fallback intact, every WebGL2/Canvas2D clause green through the migration).
- The two binding π outputs (`flow-field.spec.ts`, `concentric.spec.ts`).
- The `git diff --stat` proof that `aurora.frag.ts` + `metaball.frag.ts` are byte-untouched.
- `npm run build` + `npm run typecheck` + `npm run verify-export-types` + `npm run proof:gate-script-parity` outputs.

## Commit Plan

- substrate commit (W-GPU-SUBSTRATE): `feat(glass): useWebGPUCanvas ← createCanvasLifecycle — the third backend over the single lifecycle leaf + useGpuSubstrate picker (BB.W-VIZ-SUITE)` — body names the async-prelude device-acquisition, the device.lost self-heal, the picker uniform handle, the ZERO scheduling re-fork.
- gate commit (W-GPU-SUBSTRATE): `test(gate): proof:gpu-substrate-single — the generalized dual-substrate parity gate (born-RED on the WebGPU clauses, WebGL2 preserved) (BB.W-VIZ-SUITE)` — body names the clause set + the composition-plus-fork + verified-row-missing-file self-test bites.
- aurora-migration commit (W-AURORA-WGPU): `feat(aurora): aurora.wgsl primary path + the shared procedural-color WGSL chunk — aurora.frag the WebGL2 fallback (BB.W-VIZ-SUITE)` — body names the byte-untouched .frag, the calibrated ΔE threshold (the gate fact), the shared-chunk pattern.
- blob-migration commit (W-GOOBLOB-WGPU): `feat(goo-blob): metaball.wgsl primary path — metaball.frag the WebGL2 fallback; ColorResolver + satellite-envelope + the two fwidth() sites threaded (BB.W-VIZ-SUITE)`.
- flow-field commit (W-FLOWFIELD): `feat(dot-flow-field): NEW WebGPU-first curl-noise flow-field viz (Gerstner/Tessendorf wave potential) + substrates story + proof:flow-field (BB.W-VIZ-SUITE)`.
- concentric commit (W-CONCENTRIC): `feat(concentric): NEW WebGPU-first radial Fourier ring-interference viz + substrates story + proof:concentric (BB.W-VIZ-SUITE)`.
- doc/status commit: the `PROCEDURAL-SUITE.md` family doc + the per-viz README Substrate sections (all seven viz) + the parity table + the W-VIZ-SUITE-DELTA + the BB PROGRESS rows.

## Dependencies

- **Depends on**: soft-reads W-CANVAS-UNIFY (the same-batch Canvas2D de-fork that extends `proof:webgl-substrate-single` with the single-source clause) so `proof:gpu-substrate-single` (its superset) lands on the post-de-fork shape, not the stale pre-fork one. The leaf composition precedent is `useWebGLCanvas` (AU.W6) + `useCanvas2D` (the fourier/constellation backend) — read, not edited. The shared `procedural-color.glsl.ts` chunk (AV.W2) is the GLSL source the WGSL twin transcribes.
- **Blocks**: nothing hard in Batch 4. It DELIVERS the WebGPU-first directive (the AV.W deferral discharged) + the two new reference viz + the suite family doc. The BB close (Batch 7 W-CLOSE) inherits a documented suite + a parity-locked dual-substrate, and `proof:ba-gestalt`'s dock/substrate verdicts read the new viz over their real backdrops.

## Named successors

- **W-FOURIER-GPU** (booked, NOT this band) — the FourierField Canvas2D epicycle renderer migrates to a WebGPU instanced-line-segment path IF the harmonic density scales up (thousands of phasors → GPU line instancing wins over `ctx.stroke`). Today Canvas2D is the RIGHT tool (a few-to-dozens of phasors; the DFT math in `math.ts` is already GPU-agnostic — "WebGPU-first WHEN POSSIBLE" gives this latitude). The dot-flow-field's compute-particle pattern is proven first; FourierField migrates only on a density-scale trigger.
- **W-CONSTELLATION-GPU** (booked, NOT this band) — the Constellation Canvas2D node/edge lattice migrates to a WebGPU compute-particle lattice IF a much denser lattice is wanted (then the dot-flow-field's advection compute pass GENERALIZES to constellation's nodes). Canvas2D handles the current node count fine; `proof:constellation-substrate-single` is substrate-agnostic (unaffected).
- **The per-satellite derived-shade blob color** (BA-VJS-5 / C-1) — already booked to a 4.x point release; the GL color-seam fence is NOT widened in this wave (the WGSL transcription preserves the existing color path exactly).
- **A `.frag`/`.glsl` WebGL2-fallback RETIREMENT** — booked but GATED: forbidden until the ~5-10% tail (Linux Firefox stable, the pre-A12 iPhone install base) closes. Tracked via the WebGPU Implementation-Status wiki, not assumed. Clause B of `proof:gpu-substrate-single` machine-blocks a premature retirement.
- **watercolor-dot** — PERMANENTLY out (a CSS/SVG `feDisplacementMap` primitive mounting ZERO drawing context; a GPU context for one decorative dot is a regression against the ~8-context-per-page cap — the canonical "mark NOT to migrate, with the reason" case). Recorded in `PROCEDURAL-SUITE.md` + its README Substrate section, never a wave.

## FOLD — how it slots into BB

W-VIZ-SUITE is the substrates/viz-band headline of BB: it discharges the user's WebGPU-first directive ("ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible") by minting the THIRD backend over the ONE lifecycle leaf (de-fork-by-construction — `useWebGPUCanvas` composes `createCanvasLifecycle`, the same leaf the WebGL2 + Canvas2D backends compose), then migrating the two heavy fragment shaders (aurora rank 1, goo-blob rank 2) to net-new `.wgsl` primaries with the `.frag.ts` byte-untouched fallbacks (the GL-shader fence holds), births the two new reference viz (dot-flow-field — the user's "Claude co-work" dot-wave aesthetic; concentric — the radial Fourier rings) onto the proven substrate, and documents ALL SEVEN viz as ONE family with a per-viz migration verdict (the user's explicit "cover the extant items too"). It DEPENDS on the lifecycle leaf (read-only) + soft-reads W-CANVAS-UNIFY's gate re-shape; it FEEDS the BB close's `proof:ba-gestalt` substrate/dock verdicts (the new viz over their real backdrops) + the suite family doc. The WebGL2 fallback is NOT retired (the ~5-10% tail) — the picker degrades gracefully and `proof:gpu-substrate-single` machine-locks the no-deleted-fallback + no-second-fork + parity-resolves discipline.
