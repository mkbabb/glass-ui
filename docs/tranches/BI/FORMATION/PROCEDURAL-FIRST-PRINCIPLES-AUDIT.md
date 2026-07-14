# Procedural systems from first principles and actual demos

**Status:** formation research only; no implementation, native Safari/Chrome π, release, or execution credit
**Bound source:** `26c5ae686fd0f1181083aebda1215b00524555f1`
**Rows:** 9 (8 component concepts + shared substrate)
**Exact source witnesses:** 22
**Distinct direct demo routes:** 9

## Governing decision

Renderer uniformity is not a product principle. One lifecycle, explicit failure, semantic color, bounded resources, and honest demos are principles; a scene earns WebGPU/WebGL2, Canvas2D, SVG, or CSS from its math, instance count, public composition seams, and measured envelope. This removes both forms of theater: forcing every visualization onto WebGPU and retaining a GPU path merely because a gate once named parity.

| ID | system | decision | current reachable renderer | first-principles resolution | actual direct demos | current findings | owners |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PROC-000 | Shared lifecycle, capability, color, and resource substrate | retain-and-collapse | createGpuSubstrate selects WebGPU/WebGL2 for dual-engine scenes; useCanvas2D composes the same lifecycle for proportionate vector/raster scenes. | Keep one lifecycle and one capability policy, but do not turn WebGPU into a suite-wide quota. A scene earns each renderer from its math, instance count, public seams, and resource envelope. | /substrates/aurora, /substrates/blob, /substrates/constellation, /substrates/fourier-field, /substrates/liquid-grid | RDA-004, RDA-010, RDA-017 | BI.W-P043, BI.W-P044, BI.W-P045, BI.W-P052, BI.W-P053, BI.W-P054 |
| PROC-001 | Aurora | retain-dual-engine | WebGPU/WebGL2 through createGpuSubstrate. | Retain both engines: the per-pixel field and medium pipeline justify GPU rendering. Make actual backend and attributed initialization failure visible; eliminate warning-bearing fire-and-forget ownership. | /substrates/aurora | RDA-004, RDA-010, RDA-011 | BI.W-P045, BI.W-P046, BI.W-P052, BI.W-P053, BI.W-P054 |
| PROC-002 | Blob | retain-dual-engine | WebGPU/WebGL2 through createGpuSubstrate, despite WebGL2-only lead prose. | Retain the GPU pair for the per-pixel SDF. Correct public renderer truth, expose the selected engine, and give Poke/preset/fission explicit state readback and reset. When the SDF body itself is a press target, expose one named semantic control whose keyboard/touch/pointer paths share the same bounded pulse owner; decorative and aria-hidden Blob instances mount no operable hit layer. | /substrates/blob | RDA-010, RDA-011, RDA-017, RDA-031 | BI.W-P045, BI.W-P047, BI.W-P052, BI.W-P053, BI.W-P054, BI.W-P059, BI.W-P062 |
| PROC-003 | Constellation | retain-single-canvas2d | Current source uploads the CPU field to WebGPU/WebGL2; current route/docs claim Canvas2D; drawOverlay remains typed and demoed but is never invoked. | De-migrate to one Canvas2D renderer. The current 64-node CPU scan, five overlay bindings, seven direct instances, and route context budget make dual GPU upload/render paths strictly disproportionate. Restore drawOverlay and delete the GPU setup/bridge/shader fork. Then decide pointer well/warp from product semantics rather than leaving a decorative contradiction: decorative or aria-hidden instances delete the listener, pointer cursor, gravity-well prose, and warpOnClick default; any retained manipulation becomes a named keyboard/touch/pointer command with causal state through one warp owner. | /substrates/constellation | RDA-010, RDA-016, RDA-017 | BI.W-P043, BI.W-P044, BI.W-P048, BI.W-P052, BI.W-P054, BI.W-P062 |
| PROC-004 | Fourier Field | retain-dual-engine | WebGPU compute/render primary plus WebGL2 fallback; live route says so, README and suite table still claim Canvas2D. | Retain the GPU pair: compute plus dense ribbon/field rendering is a justified renderer use. Delete retired Canvas2D/future-migration prose and expose actual backend identity. | /substrates/fourier-field | RDA-010, RDA-011, RDA-017 | BI.W-P045, BI.W-P049, BI.W-P052, BI.W-P053, BI.W-P054 |
| PROC-005 | Liquid Grid | retain-dual-engine | WebGPU/WebGL2 through createGpuSubstrate; the live route truthfully describes WebGPU-first but exposes no runtime-derived backend identity. | Retain both fullscreen fragment paths, collapse setup/bridge duplication, expose selected engine/failure, and prove the same grid/curl semantics rather than screenshot sameness. | /substrates/liquid-grid | RDA-010 | BI.W-P045, BI.W-P050, BI.W-P052, BI.W-P053, BI.W-P054 |
| PROC-006 | HandMark | retain-svg | DOM/SVG plus CSS compositor motion; no drawing context is warranted. | Retain as the hand-voice primitive. Consolidate underline/circle/strike/highlight/path into one shape/brush model and prove baseline, blend, replay, seeded morphology, PRM, and multi-instance ID isolation. | /motion/handmark | no current RED finding; execution evidence still pending | BI.W-P051, BI.W-P061 |
| PROC-007 | Watercolor Dot | retain-svg-css | CSS shape/compositor plus SVG filter; deliberately zero Canvas/WebGPU/WebGL contexts. | Retain as the suite's explicit non-GPU counterexample. Prove same-seed silhouette identity, unique filter IDs, Safari-static filter raster, compositor-only motion, ghost legibility, and complete unmount cleanup. | /foundations/colors, /substrates/blob | no current RED finding; execution evidence still pending | BI.W-P051, BI.W-P054 |
| PROC-008 | Goo filter facilities | rehome-private | One shell-root SVG exports five global IDs, although current runtime use is limited to PagerDots and Deck while three IDs are dead. | Delete the public/global GooFilter, dead IDs, Dock re-export, and AppShell mount. PagerDots owns a per-instance namespaced worm filter/clipPath; Deck owns its private filter and geometry next to the sole demo consumer. | /navigation/carousel, /motion/deck | RDA-015 | BI.W-P118, BI.W-P121 |

## PROC-000 — Shared lifecycle, capability, color, and resource substrate

**Product model:** One scheduling/lifecycle owner; capability selection only for scenes whose work justifies more than one renderer; explicit attributed failure after commitment.

**Resolution:** Keep one lifecycle and one capability policy, but do not turn WebGPU into a suite-wide quota. A scene earns each renderer from its math, instance count, public seams, and resource envelope.

**Required live states:** mount, resize/DPR, offscreen, visibility, PRM, capability absence, internal failure, context loss, teardown, route budget

**Bound source witnesses:**

- `src/composables/glass/webgpu/useGpuSubstrate.ts:244` · blob `50e6d5e382d5ad774377c3277ad666b5424fcbcd` · line sha256 `9ff98f085cb1b8dd5e5f7632ed3f359e2c9547bf389038334fbc52cae7ac2842` · export function createGpuSubstrate(
- `src/composables/glass/webgl/createCanvasLifecycle.ts:202` · blob `06a2ae83fe8309bf7d42335488a689e99de43903` · line sha256 `960b2e506b793b4fc4234aa5a20a6cdb8798ba72d95f3008c51d1f04ae0549b7` · export function createCanvasLifecycle(
- `src/composables/glass/canvas2d/useCanvas2D.ts:124` · blob `e98f4246dd0f00c6c23253f1d5c5984f7f763268` · line sha256 `294dfa16ec17bf4b8fca163e6b2f2e3ba6f3f85737fd7c82aff9f0ed79813472` · export function useCanvas2D(options: Canvas2DOptions): Canvas2DHandle {

**Bound rendered routes:**

- `/substrates/aurora` · desktop 2 canvas / 51 SVG / 120 visible controls · mobile 2 canvas / 51 SVG / 105 visible controls
- `/substrates/blob` · desktop 3 canvas / 47 SVG / 48 visible controls · mobile 3 canvas / 47 SVG / 33 visible controls
- `/substrates/constellation` · desktop 9 canvas / 24 SVG / 32 visible controls · mobile 9 canvas / 24 SVG / 17 visible controls
- `/substrates/fourier-field` · desktop 2 canvas / 32 SVG / 47 visible controls · mobile 2 canvas / 32 SVG / 32 visible controls
- `/substrates/liquid-grid` · desktop 2 canvas / 29 SVG / 40 visible controls · mobile 2 canvas / 29 SVG / 25 visible controls

## PROC-001 — Aurora

**Product model:** A painterly multi-nucleus OKLCh field whose medium, warp, palette, and pointer response remain recognizably one Aurora across WebGPU and WebGL2.

**Resolution:** Retain both engines: the per-pixel field and medium pipeline justify GPU rendering. Make actual backend and attributed initialization failure visible; eliminate warning-bearing fire-and-forget ownership.

**Required live states:** default, mediums, image, pointer, dark, narrow, PRM, webgpu, webgl2, injected failure, teardown

**Bound source witnesses:**

- `src/components/custom/aurora/composables/runtime.ts:280` · blob `18f9d069bd7b61ef4c8a59d9b465de6bfbcd452e` · line sha256 `6f66e287a6af4dc54da7df3ab0bedaf10501b632a40c0598b527ec26a59de1c1` · : createGpuSubstrate(canvas, {
- `demo/stories/substrates/aurora.vue:136` · blob `9a239fe268dd29053b55c368a0fee6ffd220dd1b` · line sha256 `3797e0baa66f257ccbc2d9a9f0c75c938b89215832053fc2bf88210b1d6e660b` · blurb="A WebGPU-first procedural painterly gradient field — multi-nuclei composition, four mediums (smooth · oil · oil-pastel · van-Gogh) + the anisotropic-Kuwahara finish, cursor-driven swirl. Drag inside the stage to swirl the field; alt-click to spawn a nucleus. The configurator on the RIGHT drives EVERY axis: the OKLCh palette (the per-stop ColorSwatch editor), the composition (medium · zones · arrangement), the motion register, the warp/noise. The warm-cream Dawn identity is the default lead; the blue Sky is a named non-default preset. Shipped /aurora."

**Bound rendered routes:**

- `/substrates/aurora` · desktop 2 canvas / 51 SVG / 120 visible controls · mobile 2 canvas / 51 SVG / 105 visible controls

## PROC-002 — Blob

**Product model:** One SDF/smooth-min gel body with satellites, mood, pointer response, and a legible lit material; action causality is semantic/numeric, not incidental pixel churn.

**Resolution:** Retain the GPU pair for the per-pixel SDF. Correct public renderer truth, expose the selected engine, and give Poke/preset/fission explicit state readback and reset. When the SDF body itself is a press target, expose one named semantic control whose keyboard/touch/pointer paths share the same bounded pulse owner; decorative and aria-hidden Blob instances mount no operable hit layer.

**Required live states:** calm, merge, satellites, pointer, poke, keyboard press, touch, decorative, PRM, webgpu, webgl2, failure, teardown

**Bound source witnesses:**

- `src/components/custom/blob/composables/useMetaballRenderer.ts:377` · blob `fee15b836e9906289a5c881370cb7a6654d5e544` · line sha256 `f646b6c918662394028927cda0a14e9962a54d053fb5343d9b932926951557ef` · canvasHandle = createGpuSubstrate(canvas, {
- `demo/stories/manifest.ts:828` · blob `f21057ce0dc8086c56ee114f48dacb9d4bb287e1` · line sha256 `11986f2c64b9003b5733d4bc777d44ab97cdf66a705b99e740b731ecf9766265` · "WebGL2 metaball droplet on the shared substrate (injected color resolver) — the lit static register, the pointer-reactive interaction hero, the mood + seed-palette model, and the pause seam. Shipped /blob + /watercolor-dot.",

**Bound rendered routes:**

- `/substrates/blob` · desktop 3 canvas / 47 SVG / 48 visible controls · mobile 3 canvas / 47 SVG / 33 visible controls

## PROC-003 — Constellation

**Product model:** One seeded CPU proximity graph with bounded wells/warp/pin mechanics and an ordered consumer skin pass; graph scale and multi-instance use determine the renderer, not a WebGPU quota.

**Resolution:** De-migrate to one Canvas2D renderer. The current 64-node CPU scan, five overlay bindings, seven direct instances, and route context budget make dual GPU upload/render paths strictly disproportionate. Restore drawOverlay and delete the GPU setup/bridge/shader fork. Then decide pointer well/warp from product semantics rather than leaving a decorative contradiction: decorative or aria-hidden instances delete the listener, pointer cursor, gravity-well prose, and warpOnClick default; any retained manipulation becomes a named keyboard/touch/pointer command with causal state through one warp owner.

**Required live states:** default, density, warp overlay, pinned overlay, decorative/no listener, semantic pointer well when retained, keyboard/touch parity, multi-instance, offscreen, PRM, canvas2d, zero GPU contexts, teardown

**Bound source witnesses:**

- `src/components/custom/constellation/composables/useConstellation.ts:500` · blob `f72a66f59465ee96bff2d6f3bdd8deee87f83c83` · line sha256 `0e67eac8c35991aa8cb474fdffa1c8910438bbc7e381f8789925112aef5d73c5` · handle = createGpuSubstrate(canvas, {
- `src/components/custom/constellation/Constellation.vue:36` · blob `0fe8406e756731d5c48e5b611563fdedfb946733` · line sha256 `1255f894e4c1ffe664b2ce4d2a5f1fd578fa3450f111266d815b1608bc0001cd` · * `field` for its own overlay layer (the Canvas2D `drawOverlay` seam is inert post-
- `demo/stories/manifest.ts:843` · blob `f21057ce0dc8086c56ee114f48dacb9d4bb287e1` · line sha256 `d4c90ffadc82d89024575b42f7d0587b3dda5d1cce8ce815726a36ea6029c4ed` · "A drifting proximity-graph lattice on the Canvas2D substrate (park/freeze/dispose). The neutral lattice ships; the --primary focal node is a consumer drawOverlay pass. Shipped /constellation.",

**Bound rendered routes:**

- `/substrates/constellation` · desktop 9 canvas / 24 SVG / 32 visible controls · mobile 9 canvas / 24 SVG / 17 visible controls

## PROC-004 — Fourier Field

**Product model:** One DFT/epicycle reconstruction and head clock, with pure coefficient math feeding equivalent compute/render semantics and a causal scrub/config surface.

**Resolution:** Retain the GPU pair: compute plus dense ribbon/field rendering is a justified renderer use. Delete retired Canvas2D/future-migration prose and expose actual backend identity.

**Required live states:** default, ribbon, config, scrub, resize, PRM, webgpu, webgl2, failure, teardown

**Bound source witnesses:**

- `src/components/custom/fourier-field/composables/useFourierField.ts:291` · blob `e48ed68d34522dc3c80d7effd9b439a8b85ab22e` · line sha256 `a2cc37a278c1f778c4bbf379fc9b7ce2b831c419120613850082408faa3ac093` · handle = createGpuSubstrate(canvas, {
- `src/components/custom/fourier-field/README.md:3` · blob `60993073275601770f0bf106866004d9a38f409f` · line sha256 `5329f0697ec6f78c9c06750bae0903b741a5868aba6e265063f520517b00378e` · A Fourier epicycle field on a Canvas2D surface — the sibling render-background to
- `demo/stories/substrates/fourier-field.vue:315` · blob `538ea7e2ca20dfd374fe0f77f1069a6de604ca36` · line sha256 `3652519284cc1decbfbb014bca5bcfc489fead3c6f1a93d732d84740f3be3ff5` · blurb="ONE Fourier view. A chain of rotating circles stacked tip-to-tail draws the reconstructing curve as you watch — drag the harmonic-count N slider and the curve assembles term by term, from a single ellipse to the full reconstruction. Toggle the epicycle chain; pick a source (a generated elliptic spectrum, the ℱ wordmark, a heart, a star); pick a color. Drag the cursor across the field to SCRUB the reconstruction — left rewinds, right fast-forwards. WebGPU-first, on the GPU substrate — no Canvas2D anywhere."

**Bound rendered routes:**

- `/substrates/fourier-field` · desktop 2 canvas / 32 SVG / 47 visible controls · mobile 2 canvas / 32 SVG / 32 visible controls

## PROC-005 — Liquid Grid

**Product model:** One derivative-AA grid evaluated after a smooth curl/affine sheet deformation, with semantic color and bounded pointer bulge.

**Resolution:** Retain both fullscreen fragment paths, collapse setup/bridge duplication, expose selected engine/failure, and prove the same grid/curl semantics rather than screenshot sameness.

**Required live states:** default, density, warp, pointer, dark, narrow, PRM, webgpu, webgl2, failure, teardown

**Bound source witnesses:**

- `src/components/custom/liquid-grid/composables/useLiquidGrid.ts:165` · blob `1c7db9a3ff063254cfcfb9ad8f1dfc837feb09f0` · line sha256 `a2cc37a278c1f778c4bbf379fc9b7ce2b831c419120613850082408faa3ac093` · handle = createGpuSubstrate(canvas, {
- `demo/stories/manifest.ts:906` · blob `f21057ce0dc8086c56ee114f48dacb9d4bb287e1` · line sha256 `57754f5640cf83354f552c27e97fdfc9b91cb0a35a8921d1eff4460548d9ef97` · "A WebGPU-first liquid AA-grid — evenly-spaced LARGER cells on a sheet that bows + shears as a traveling wave passes OVER and THROUGH it. A smooth low-order curl-flow field (Bridson divergence-free) warps the grid COORDINATE before evaluation, locally affine at the cell scale, so MAJOR gridlines bend as ONE coherent continuous curve and cells deform as near-parallelogram patches — never a per-pixel jitter, never a per-cell kink. A Ben Golus derivative-AA two-tier grid (one device-pixel crisp at any DPR — the blurry-mess fix; the AA reads the FINAL warped coordinate). It reads the SAME waveFlow warp as Concentric (one shared field). Drag the cursor for a local swirl — a finger twisting the cells around it. The warm-cream identity over transparent is the library default (the page reads through the cells); the suffusion preset rides the same field at a near-invisible fieldAlpha behind page content. No Canvas2D anywhere. Shipped /liquid-grid.",

**Bound rendered routes:**

- `/substrates/liquid-grid` · desktop 2 canvas / 29 SVG / 40 visible controls · mobile 2 canvas / 29 SVG / 25 visible controls

## PROC-006 — HandMark

**Product model:** Real selectable text with a deterministic, namespaced SVG mark whose geometry, medium, blend, draw-on, and boil remain legible and semantically absent under PRM.

**Resolution:** Retain as the hand-voice primitive. Consolidate underline/circle/strike/highlight/path into one shape/brush model and prove baseline, blend, replay, seeded morphology, PRM, and multi-instance ID isolation.

**Required live states:** underline, circle, strike, highlight, custom path, draw replay, boil, multi-instance, narrow, PRM

**Bound source witnesses:**

- `src/components/custom/handmark/HandMark.vue:61` · blob `f733cca7df3686f64f34479507a9969a78110375` · line sha256 `32d3bf1d055f804de9caafddb36fc3f281804ee1a016be6634b4f183618abfeb` · const uid = `hm-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
- `demo/stories/motion/handmark.vue:78` · blob `b7540e930d7ee9d6859af664a567c2efedec4335` · line sha256 `f34843c443cdf4ea34f668f25e9c64d6c137bdecf95483bef9cff728650ee7b2` · <Button variant="outline" @click="replayLoad">Replay draw</Button>

**Bound rendered routes:**

- `/motion/handmark` · desktop 1 canvas / 42 SVG / 35 visible controls · mobile 1 canvas / 42 SVG / 19 visible controls

## PROC-007 — Watercolor Dot

**Product model:** A cheap seeded decorative mark whose solid/ghost silhouettes share one geometry and whose per-instance wet-edge filter is namespaced and static under animation.

**Resolution:** Retain as the suite's explicit non-GPU counterexample. Prove same-seed silhouette identity, unique filter IDs, Safari-static filter raster, compositor-only motion, ghost legibility, and complete unmount cleanup.

**Required live states:** solid, ghost, same seed, different seed, multi-instance, hover, animated, PRM, Safari, teardown

**Bound source witnesses:**

- `src/components/custom/watercolor-dot/WatercolorDot.vue:73` · blob `e704f14890b0d709ece0494edb4fee011592f522` · line sha256 `99614a4940eb3fa4682d89963e4cb9e51a2322bf274b7c292f7f48c20e1e442e` · const filterId = `watercolor-filter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
- `src/components/custom/watercolor-dot/WatercolorDot.vue:8` · blob `e704f14890b0d709ece0494edb4fee011592f522` · line sha256 `8ed3f6d60a95fd73e1c40eda0a4fb146587ae22bf257847debcaf4f79fec4cfa` · * context — no WebGL/WebGPU/Canvas2D; the deliberate suite counterexample, the mark

**Bound rendered routes:**

- `/foundations/colors` · desktop 1 canvas / 39 SVG / 39 visible controls · mobile 1 canvas / 39 SVG / 23 visible controls
- `/substrates/blob` · desktop 3 canvas / 47 SVG / 48 visible controls · mobile 3 canvas / 47 SVG / 33 visible controls

## PROC-008 — Goo filter facilities

**Product model:** An SVG URL resource belongs to the smallest component/demo that owns its geometry and lifetime; document-global filter IDs are not a library facility.

**Resolution:** Delete the public/global GooFilter, dead IDs, Dock re-export, and AppShell mount. PagerDots owns a per-instance namespaced worm filter/clipPath; Deck owns its private filter and geometry next to the sole demo consumer.

**Required live states:** two instances, four instances, stable rerender ID, fresh mount ID, unmount, Safari filter, Chrome filter, no shell global, no dead IDs

**Bound source witnesses:**

- `src/components/custom/goo-filter/GooFilter.vue:60` · blob `8943c40ea55ff8c2937df4fdbfd64a0e169849a5` · line sha256 `8ba58c658baaff351b5168bcad9bab33edd7a2df2abfc4c6485af17d1f1b44a0` · const LIBRARY_IDS: readonly GooSpec[] = [
- `demo/shell/AppShell.vue:225` · blob `c9f0f90f580b056074503693674211ce215e343e` · line sha256 `0e2c14c18bd7034728dbeaa20ae2050c00b7b1acb0a405f9e114f9a736e67e7e` · <GooFilter />
- `src/components/custom/pager-dots/PagerDots.vue:36` · blob `7f64913d8ded8cbfe3044c004ab4568e5446bb8d` · line sha256 `063990ee4604c4b36e47be173918064c6e9092fbbb0afa56854041608a745372` · worm-scoped `#pager-worm-goo` filter (a true smooth throat — single-body peak 0.72 >

**Bound rendered routes:**

- `/navigation/carousel` · desktop 1 canvas / 25 SVG / 51 visible controls · mobile 1 canvas / 25 SVG / 39 visible controls
- `/motion/deck` · desktop 1 canvas / 28 SVG / 44 visible controls · mobile 1 canvas / 28 SVG / 28 visible controls

## Credit boundary

These direct-route screenshots and interactions prove that a current demo was actually rendered and inspected. They do not prove native Safari, native Chrome, Metal, backend parity, resource teardown, performance, PRM, or product acceptance. Each owner wave must produce those exact causal receipts on its landed bytes.
