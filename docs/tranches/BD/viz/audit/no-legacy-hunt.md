# BD viz no-legacy hunt — the ruthless audit

Mandate (binding): **WebGPU OR WebGL2 only. ZERO Canvas2D (no `getContext("2d")`). NO
fallbacks, NO graceful-degrade, NO legacy, NO workarounds, NO dual-path, NO
renamed-not-deleted.** Each finding below is file:line + the clean-break replacement.

Audit scope: aurora · goo-blob · fourier-field · constellation · concentric ·
dot-flow-field · dot-matrix · goo-dot-matrix · paper-grid · watercolor-dot + the
`src/composables/glass/` substrate stack. Branch `prototype/liquid-dock`.

The most important architectural fact up front: **the entire `useGpuSubstrate` picker is
built AROUND the fallback model the mandate forbids.** Its own header (`useGpuSubstrate.ts:1-40`)
describes "the WebGL2 substrate is the INVISIBLE don't-crash-to-black insurance," and every
viz authors TWO setup callbacks (`setupWGPU` + `setupGL`). Under "WebGPU OR WebGL2, no
fallbacks," the dual-path picker AND every `*GLSetup.ts` / `.glsl.ts` WebGL2 arm are the
legacy. The clean break is a **single-backend decision per viz** (pick ONE of WebGPU/WebGL2,
delete the other arm), and a substrate that no longer carries a try-WebGPU-then-rebuild-WebGL2
fall.

---

## TIER 1 — Canvas2D (`getContext("2d")`) — DELETE outright

The mandate is literal: zero `getContext("2d")`. Two live sites remain.

| # | file:line | what | clean-break replacement |
|---|-----------|------|-------------------------|
| C1 | `src/composables/glass/canvas2d/useCanvas2D.ts` (whole file, 14.5KB) + `resolveCanvasColor.ts` + `canvas2d/index.ts` | The Canvas2D substrate backend (`getContext("2d")` lifecycle wrapper). The brief names it "TO BE DELETED." | **DELETE the `canvas2d/` dir wholesale.** Its only structural job (the lifecycle schedule) already lives in `createCanvasLifecycle`; the WebGPU/WebGL2 backends compose that leaf directly. No viz imports `useCanvas2D` any more (fourier/constellation already migrated off it — see T2). |
| C2 | `src/composables/glass/useGlassRenderer.ts:55,98` | `canvas.getContext("2d")!` — builds a refraction displacement-map PNG on a 2D canvas for the GlassPanel SVG-filter tier. Sole consumer: `glass-panel/GlassPanel.vue:70`. Also ships a 3-tier `GlassTier = "svg-filter" \| "css" \| "fallback"` (`:3`) — a literal `"fallback"` tier. | The displacement map is a static gradient; bake it as a precomputed data-URI asset OR generate it via an offscreen WebGL2/WebGPU pass. The `"fallback"` tier and the 2D rasterization are the legacy. (Note: GlassPanel is glass-chrome, not a procedural viz — flag for the substrate-owner's decision, but the `getContext("2d")` is in-mandate regardless.) |
| C3 | `src/components/custom/aurora/composables/auroraFallbackGround.ts:346` | `canvas.getContext("2d")` — the "luminance-faithful headless fallback ground": a one-shot 2D raster of the aurora field for the `"css"` substrate + an SSR layered-CSS degrade. ~360 lines. Consumed by `Aurora.vue:5,156-163` behind `isCssSubstrate`. | **DELETE the whole `auroraFallbackGround.ts` + the `"css"` substrate branch in `Aurora.vue` + `resolveRenderMode`'s `"css"` resolution.** This is a pure fallback for software-raster/headless — exactly the "no fallback" target. The aurora arms WebGPU/WebGL2 or it does not paint. |

---

## TIER 2 — the dual-path GPU substrate + per-viz WebGL2-as-fallback — COLLAPSE to one backend

The `useGpuSubstrate` picker is a runtime try-WebGPU-then-fall-to-WebGL2 machine. The mandate
kills the fall. Every viz currently ships a `setupWGPU` AND a `setupGL` (the WebGL2 fallback)
+ a `.glsl.ts` shader twin of its `.wgsl.ts` primary.

| # | file:line | what | clean-break replacement |
|---|-----------|------|-------------------------|
| S1 | `src/composables/glass/webgpu/useGpuSubstrate.ts:117-156` (`buildWebGL2`, `freshCanvasForFallback`), `:209-261` (`fallToWebGL2`, the `armAsync` try/catch fall), `:82-88` (`onBackendFallback`), `:147-156` (the canvas-poison clone workaround) | The invisible-insurance fall: on any WebGPU init failure it disposes the WebGPU leaf, **clones the WebGPU-poisoned canvas** (a workaround for the one-context-type rule), rebuilds on WebGL2, arms it. `freshCanvasForFallback` is a literal workaround. | **Re-author the substrate to a single-backend acquire** — WebGPU where supported, WebGL2 otherwise, decided ONCE with NO runtime fall, NO canvas clone, NO `onBackendFallback`, NO dual leaf held live. (Or two clean substrates with the viz choosing one at author time.) Delete `buildWebGL2`/`fallToWebGL2`/`freshCanvasForFallback`. |
| S2 | `*/composables/*GLSetup.ts` — `concentricGLSetup.ts`, `constellationGLSetup.ts`, `fourierFieldGLSetup.ts`, `paperGridGLSetup.ts`, `goo-blob` GL setup, `dot-flow-field`/`dot-matrix`/`goo-dot-matrix` GL setup arms | The `setupGL(gl)` WebGL2 fallback callback every viz hands the picker as its "graceful degrade." | If the viz is WebGPU-primary (concentric/paper-grid/dot-matrix/dot-flow/goo-dot-matrix/aurora/goo-blob are all "BORN/MIGRATED WebGPU-first"), **delete the `setupGL` arm + the `.glsl.ts` shader twin.** Keep ONLY the `.wgsl.ts` path. The dual-shader maintenance (and the parity gate `proof:gpu-substrate-single` that exists ONLY to police the two arms agreeing) evaporates. |
| S3 | `*/shaders/*.glsl.ts` — `concentric.glsl.ts`, `constellation-{points,lines}.glsl.ts`, `flow-field.glsl.ts`, `dot-matrix.glsl.ts`, `fourier-field.glsl.ts`, `paper-grid.glsl.ts`, `aurora.frag.ts`, `metaball.frag.ts` + the goo-blob `sdf-body`/`oklch-perturb`/`watercolor-edges`/`metaball-uniforms` GLSL chunks | The WebGL2 shader twins of the WGSL primaries (the "byte-untouched WebGL2 fallback"). | Delete the GLSL twin of any viz that goes WebGPU-only. (If a viz instead goes WebGL2-only — e.g. for a thin device-reach budget — delete its `.wgsl.ts` + WGSL setup instead. The point is ONE shader per viz, not two.) |
| S4 | `src/components/custom/dot-flow-field/shaders/flow-field.glsl.ts:11`; PROCEDURAL-SUITE.md:71 | flow-field's parity is recorded `degraded` ("the same flow, a coarser CPU-step density") — a literal degraded fallback. | Delete the fallback; flow-field renders its WGSL/GL primary or not at all. Remove the `degraded` parity status. |
| S5 | `src/components/custom/aurora/constants/renderMode.ts` (`resolveRenderMode`, `isSoftwareWebGLRenderer`), `runtime.ts:168-260` (the inert-handle software-raster wedge catch), `Aurora.vue:101-163` (`"auto"`/`"css"`/`"webgl"` tri-mode + `isCssSubstrate`) | The software-raster guard that forces `"css"` (Canvas2D ground) + the inert-handle path + `forceWebGLUnderSoftwareRaster` escape. A whole workaround subsystem for headless/SwiftShader. | Delete the `"css"` mode + the software-raster guard + the inert handle. Aurora is WebGPU/WebGL2; a host without either does not get aurora (matches "NO fallbacks"). `renderMode` collapses to a no-op or is deleted. |

---

## TIER 3 — rename-not-deleted + stale published surface

| # | file:line | what | clean-break replacement |
|---|-----------|------|-------------------------|
| R1 | `src/components/custom/goo-blob/` (dir, `GooBlob.vue`, `index.ts`, all `composables/`/`shaders/`), `package.json:106-107,419-421` (`./goo-blob` export + typesVersions), `package.json:853` (`proof:blob-color-equivalence` path), `src/subpaths/goo-blob.ts`, `tests/components/custom/goo-blob/`, every `GooBlob`/`gooBlob` symbol | goo-blob is NOT renamed to "blob" per the mandate; it is ALSO slated for first-principles redevelop (4 emotional states, satellite morph-in/out, multi-blob organic interaction). | **Rename the dir → `blob/`, component `GooBlob` → `Blob`, subpath `/goo-blob` → `/blob`, all symbols/tests/exports — clean break, no alias** (per the no-backwards-compat memory). This rename rides the first-principles redevelop, not a separate cosmetic pass. |
| R2 | `src/composables/glass/canvas2d/index.ts:1-8` + `src/composables/glass/index.ts:42,48` + `src/subpaths/canvas.ts:1` + `src/api/types-extra.ts:277` + `package.json` `/canvas` export | The Canvas2D substrate is still PUBLISHED on the `/canvas` subpath + the glass barrel, with comments claiming "aurora/blob/constellation/fourier stay live" on it — but those four MIGRATED OFF it (T2). A published dead substrate. | Delete the `/canvas` subpath export, the `canvas2d` re-exports from `glass/index.ts`, `subpaths/canvas.ts`, the `types-extra.ts` re-export, and the `package.json` `/canvas` entry — alongside the `canvas2d/` dir delete (C1). |
| R3 | `src/components/custom/dot-flow-field/` (dir + `DotFlowField` symbol + `/dot-flow-field` subpath) | The mandate re-specs dot-flow-field into a **tessellating dot-matrix image display** (dots fade/grow to render arbitrary images — blobs/waves/clouds washing over, aurora-like). The current `DotFlowField.vue:9` is already a "dot-matrix a slow LARGE wave sweeps through" — close, but the name + the curl-particle-advection internals are the old identity. | Decide the target name (likely fold into / replace with the image-tessellation dot-matrix facility) and **delete the old `useFlowParticles`/curl-advection compute path** if the redevelop supersedes it — do not keep both the particle-advection field AND the new tessellation path (dual-path). Resolve against the dot-matrix / goo-dot-matrix naming so there is ONE dot-matrix family, not three overlapping ones. |

---

## TIER 4 — stale docs (drift = a soft fallback claim)

| # | file:line | what | fix |
|---|-----------|------|-----|
| D1 | `src/components/custom/PROCEDURAL-SUITE.md:30,55-63,69-76` | The suite doc still describes the WebGL2 substrate as "the graceful fallback for the ~5-10% tail," lists `useCanvas2D` as a live backend (`:30,55`), and records fourier-field + constellation as **"Canvas2D … DO NOT MIGRATE (now)"** (`:75-76`) — but the CODE already migrated both onto `createGpuSubstrate` (no `getContext("2d")` in either tree; see `useFourierField.ts:8`, `constellationRender.ts:3`). The doc is a stale fallback narrative. | Rewrite the suite doc to the single-backend reality post-collapse; delete the fallback/Canvas2D/`degraded`/parity-table framing; mark fourier + constellation as GPU-migrated. |
| D2 | `docs/tranches/BB/audit/gpu-parity-table.md` (13 verified/degraded rows) + `proof:gpu-substrate-single` | The parity table + gate exist ONLY to police the WGSL↔GLSL dual-arm agreement. Once the dual paths collapse (T2), they are dead. | Retire the parity table + the dual-arm parity gate (replace with a single-backend smoke gate if wanted). |

---

## NOT legacy (do NOT touch — these read as "fallback" but are legitimate)

- `aurora/constants/shaders/mediums.glsl.ts` `structureTensorField(..., fallbackDir)` and
  `flow.glsl.ts` `fallback = vec2(cos a, sin a)` — these are **shader math terms** (the
  isotropic-degenerate fallback direction for the structure tensor), not a substrate
  fallback. Keep.
- `color.ts:82` "single-stop palettes degrade to a flat fill" — a color-math edge case, not
  a substrate degrade. Keep.
- `aurora.wgsl.ts` kuwahara/medium dispatch + `uniformBridge.ts:11` "legacy `crayon` slot
  removed" — these are already clean breaks (the comment documents a completed retirement).
- `watercolor-dot/WatercolorDot.vue` — **SVG `<filter>` + CSS, NOT Canvas2D** (no
  `getContext`). The brief flags "the watercolor-dot CSS path" — it is in-mandate as a
  CSS/SVG primitive (no 2D-context drawing), so it is NOT a `getContext("2d")` violation. If
  the redevelop wants it GPU-rendered that is a NEW-BUILD decision, not a legacy delete. Flag
  for the owner; not a hard violation.

---

## Migration order (dependency-correct)

1. **Substrate first** (S1) — re-author `useGpuSubstrate` to single-backend (or split into two
   clean substrates), removing the fall/clone/`onBackendFallback`. This unblocks every viz's
   dual-arm delete.
2. **Per-viz collapse** (S2/S3/S4) — delete each viz's losing-backend setup + shader twin.
3. **Canvas2D delete** (C1/C2/C3/R2) — drop `canvas2d/`, the `/canvas` subpath, aurora's
   `auroraFallbackGround` + `"css"` mode (S5), the `useGlassRenderer` 2D map.
4. **Renames** (R1 blob, R3 dot-flow-field) — ride the first-principles redevelops.
5. **Docs** (D1/D2) — rewrite the suite doc + retire the parity table/gate.
