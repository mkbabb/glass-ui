# W-G.1 · W-ONE-ENGINE: WebGPU is the only engine, the device takes the adapter's limits, and the ground is CSS · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (the task named `f3ad78d0`; `git diff --stat f3ad78d0..HEAD -- src demo scripts tests tests-visual package.json` is empty). Scratch worktree; `vite build` and `vite build --config demo/vite.demo-dist.config.ts` exit 0; the demo served by `vite preview` on :5987. Playwright Chromium headless with `--use-angle=metal --enable-unsafe-webgpu --ignore-gpu-blocklist`; adapter `apple/metal-3`. Load average 30 to 137 during the runs (other sessions on the machine); every gate below is a count or a presence test, not a timing |
| ships in | 11.0.0 |
| families | F-47 whole (`audit/REGISTRY.md:1154-1169`): L05a-01, L10-02, L04-F03, L05b-09, L01b-54, R2-06-10, R4-01-17. R2-09-02's publisher half is W-H.1's, conditional on D3-B (fix-2, FA-13). Also the engine halves routed here: F-48's C-11 (π-W1, the blob's GL excise), #49's D5 and #60's one-context arm (both F-51 routings, `census-register-a.md:56`, `census-register-b.md:50`), W-B.1's two folds (the Safari WebGPU promote, the `flow.wgsl.ts` curl tail). The constellation's port is not this wave's: #45 and R2-06-10's constellation half are W-B.9's (PLAN §3, `LEDGER.md:110-111`; fix-4, FC-11) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 0 · Amendment to PLAN §3's W-G.1 row

PLAN §3 reads "the per-dab stroke cascade in WGSL (ids 3, 5, 6, 7 stop collapsing to one Kuwahara body), then the WebGL2 arms deleted". This wave deletes the arms and does **not** port the cascade. Reasons, each on disk:

1. The spec of record for the aurora's mediums (GF-AURORA, `BJ/addenda/2026-07-24-refinement/GREENFIELD-TERMINAL.md` §2 C1-C2, §4, §5) replaces the ten ids with six deposition bodies authored once in WGSL; its `dab` and `stick` are new crescent and capsule SDF bodies, not the GLSL cascade. A port here would be deleted by W-G.4.
2. The fence that held the delete (R9: "deleting the GL arm destroys paint the primary does not reproduce", `BK/execution/2026-08-25-pi-band/PI-CENSUS.md:231`) asked for the GLSL paint to be archived first. It is: π-ARCHIVE is CAPTURED-GREEN (`PI-CENSUS.md:147`), 31 tracked artefacts under `BK/execution/2026-08-25-pi-band/gamma-aurora-blob/pi-ARCHIVE-*` (the `mediums-gl-*` and `presets-gl-*` contact sheets and the paired ndjson). That archive is W-G.4's authoring reference.
3. Between this wave and W-G.4, ids 3, 5, 6 and 7 paint the Kuwahara body on every engine. That is what they paint today on every WebGPU host (appendix C, §2 below). Both waves ship in 11.0.0, so no published version carries the interval.

The medium-distinctness acceptance (the collapse of ids 3/5/6/7, C-13a's paint half, C-13b) is W-G.4's gate G4-G2.

C-11 (π-W1's after-half, #50 W1) closes here, not in W-G.5 as PLAN §3 lists it: the blob's GL excise is part of deleting the WebGL2 arm (L04-F03's W-ENGINE-TERMINAL, `round-1/L04.md:132-150`), and its paired capture belongs to the wave that makes the change (F-06 law).

## 1 · What it closes

| id | what |
|---|---|
| L05a-01, L10-02 | the WebGPU primary paints one Kuwahara body for four ids while the WebGL2 "fallback" carries the stroke cascade (the fallback-richer half; the body split is W-G.4's) |
| L04-F03, L05b-09, L01b-54, #54 | the WebGPU-only ruling (`BK/PORT.md:115,145`) never executed: `setupGL` required (`useGpuSubstrate.ts:49`), the webgl2 register at 236 lines in 40 files |
| R2-06-10 | the aurora raster ground (`auroraFallbackGround.ts:328-366`); its constellation half (`useCanvas2D`, `useConstellation.ts:11,287`) is W-B.9's (fix-3) |
| R2-09-02 (publisher half) | moved to W-H.1: whether a field publishes its luma is D3's route choice (D3-B publishes, D3-A deletes the live channel), so the publisher is built only on D3-B's convergence |
| R4-01-17, UIA-V-55, UIA-V-192, UIA-V-337 | the device is requested without `requiredLimits`; a host past 8192 px flood-fails every frame |
| #49 D5, #60 one-context | two WebGL2 probe contexts on every aurora mount (`renderMode.ts:118`, `runtime.ts:252`) |
| C-11 | π-W1, the blob's GL excise and its paired capture |
| E-2 (engine half), KFA-133 | recognized init failures fall silently to WebGL2 (`useWebGPUCanvas.ts:344`, "falls to the WebGL2 net silently"; the catch at `:461-476`) |
| W-B.1 folds | the Safari WebGPU promote; `webgl/shaders/flow.wgsl.ts`'s GLSL twin |
| latch `gl-excise.test.ts:112` | retired by W-A.2 into gate G1-G1 (`W-A.2.md:80`) |

## 2 · The defect at HEAD

Static (worktree root):

- **The engine register.** `git grep -icE 'webgl|glsl|setupGL' -- src` sums to **660 lines in 76 files**; `git grep -ic webgl2 -- src` to **236 in 40**; the blob alone **125 in 16**. `git ls-files src | grep -E '\.(glsl|frag|vert)\.ts$'` lists **19 modules, 3,566 lines**: aurora 11 in `constants/shaders/`, the blob's 6 in `shaders/`, `composables/glass/procedural/color.glsl.ts` and `composables/glass/webgl/shaders/flow.glsl.ts`.
- **The dual seam.** `useGpuSubstrate.ts:47` `setupWGPU?` ("omitting it forces the WebGL2 fallback") and `:49` `setupGL` (required). The fourier field satisfies it with a declared stub (`fourier-field/renderer/wgpu.ts:382`, `useFourierField.ts:204`).
- **The silent net.** `useWebGPUCanvas.ts:461-476`: a `WebGPUInitError` (no adapter, software adapter, device rejected, hang) rejects without `onInitError`, and the picker arms WebGL2.
- **The probe contexts.** `renderMode.ts:2` imports `probeWebGL2Renderer` (`webgl/useWebGLCanvas.ts:56`); `resolveRenderMode` calls it at `renderMode.ts:118` and `createAurora` again at `runtime.ts:252`.
- **Canvas2D.** `constellation/composables/useConstellation.ts:287` `useCanvas2D({`; `canvas2d/useCanvas2D.ts:167` `getContext("2d")`; the ground's raster at `auroraFallbackGround.ts:345` `getContext("2d")` and `:360` `toDataURL("image/png")` while its docstring (`:233`) says "zero canvas".
- **No device limits.** `useWebGPUCanvas.ts:156` `adapter.requestDevice(deviceDescriptor)`; no caller passes a descriptor, and `requiredLimits` has 0 hits in `src`.
- **The latch.** `tests/components/custom/blob/gl-excise.test.ts:112` `it.fails("the WebGL2 register over src/components/blob reads 0")`.

In paint (probes in appendices B-D; readings from `cap/g1-*.json` in the band-G scratch root):

| probe | HEAD reading |
|---|---|
| context requests, WebGPU host (appendix B) | `/` `{"2d":6,"webgl2":2,"webgpu":1}`; `/substrates/aurora` `{"webgl2":2,"2d":20}`; `/substrates/constellation` `{"2d":12,"webgl2":2,"webgpu":1}` |
| `navigator.gpu` removed (appendix D) | `/substrates/aurora` requests `webgl2` twice (the probe and the net); the substrate root carries no engine attribute (`data-` keys `auroraSubstrate` only); no error surfaced |
| device limits (appendix C) | requested `maxTextureDimension2D` `null`; device **8192**; adapter **16384** |
| the shell aurora's host set to 1440×9000 (appendix C) | backing `[1440, 9000]`; **50** uncaptured GPU errors in 3 s (the capture cap), the first `Texture size ([Extent3D width:1440, height:9000 ...]) exceeded maximum texture size ([Extent3D width:8192, height:8192 ...`; `getCurrentTexture` still `[1440, 9000]` on 361 frames; **0** of 120,000 sampled pixels moved in 1.5 s. The loop does not park (120.5 submits/s): R4-01-17's "parks after 2 errors" did not reproduce; this seat sees the per-frame flood UIA-V-337 described. After a shrink to 900 px, 120 submits/s (the "stays dead after a shrink" half did not reproduce; it stays as a regression clause, not a born-RED) |
| `toDataURL` through mount (appendix D) | `/` **3**, `/substrates/aurora` **18** |
| published luma | the shell field canvas's dataset is `{auroraSubstrate, glassFieldCanvas, auroraSettled}`: no luma. The dock's live sampler reads alpha 0 from the WebGPU field (`unavailable/canvas/sample-unavailable`, W-G.3 §2) |

## 3 · The cure

1. **One engine module.** `src/composables/glass/webgpu/` holds the device, the canvas and the lifecycle. `createCanvasLifecycle.ts`, `backingSize.ts`, `visibility.ts` and `shaders/flow.wgsl.ts` move there from `webgl/`; `webgl/` is deleted (`useWebGLCanvas.ts`, `compile.ts`, `shaders/flow.glsl.ts`), and so is `canvas2d/useCanvas2D.ts` with its directory (W-C.5 has already deleted `resolveCanvasColor.ts`). `useGpuSubstrate` takes one `setup` (the WGSL builder, required); `setupGL`, `setupWGPU` and the picker are gone. `GpuBackend` is deleted; `RendererEngine` is `"webgpu" | "css"`.
2. **Fail loud, one door.** Every `WebGPUInitError` reason (`no-navigator-gpu`, `no-adapter`, `software-adapter`, `device-request`, `acquire-timeout`, `pipeline-validation`) goes to `onInitError` and to `rendererStatus` as `{ phase: "error", engine: "css", error }`. Each substrate root carries `data-engine="webgpu"` once a frame presents, `"css"` otherwise. The component keeps painting its CSS ground, which it paints first on every host (step 5); nothing is chosen on failure, so no engine stands in for another.
3. **Device limits.** The shared acquire requests `requiredLimits: { maxTextureDimension2D: adapter.limits.maxTextureDimension2D }`. The one sizer (`backingSize.ts`) clamps the backing to `device.limits.maxTextureDimension2D` on each axis by lowering the effective DPR for that canvas, aspect kept; configure never sees an oversize texture. A later size that fits restores the policy DPR on the next resize.
4. **Per substrate.**
   - Aurora: delete `glSetup.ts`, the 11 GLSL modules in `constants/shaders/`, the GL half of `textureUpload.ts`, `resolveRenderMode`, `isSoftwareWebGLRenderer`, `ResolveRenderModeOptions`, `forceWebGLUnderSoftwareRaster` and the `?engine=webgl2` pin (`runtime.ts:107,310`, `demo/stories/substrates/aurora.vue:83-88`, `AuroraStage.vue:38`). The `renderMode` prop becomes `"gpu" | "css"`, default `"gpu"`; a software adapter is refused at acquire (step 2), which is where the software-raster guard now lives. The WGSL dispatch is not edited (§0).
   - Blob: GF-BLOB W1 (`DESIGN-NOW.md` §3 W1): delete `shaders/{metaball.frag,metaball.vert,sdf-body.glsl,watercolor-edges.glsl,oklch-perturb.glsl,metaball-uniforms.glsl}.ts`, `composables/{buildMetaballProgram,uploadBlobUniforms}.ts`, the GL branch of `useMetaballRenderer.ts` and `UNIFORM_NAMES`; `uniformBridgeWGPU.ts` becomes `packBlobUniforms.ts`, the only packer. The `uMaxReach` derivation moves verbatim (GF-BLOB ADJ-9: the discard is active).
   - Fourier field: `createFourierUnsupportedSetup` and the `backend` getter (`FourierField.vue:216`, `useFourierField.ts:57,214`) are deleted.
   - Constellation: moved to WebGPU by W-B.9, its disease row's own wave (fix-3, FB-18), before this wave; it leaves no `useCanvas2D` caller, so step 1 deletes `canvas2d/` whole.
5. **The ground is CSS.** `auroraFallbackGround` becomes `auroraGround` (the "fallback" name R2-06-10 and BD2 A54 asked retired). It returns the layered `radial-gradient` stack over the field-mean fill it already builds when the raster returns null; `rasterizeField` (`:328-366`) is deleted. It is the frame-0 paint under every aurora, before the first GPU frame and under a failed one.
6. **The field luma publisher** is W-H.1's, built only if D3 converges on D3-B (fix-2, FA-13). This wave's lifecycle keeps the canvas configuration it needs today.
7. **The latch's subject.** Gate G1-G1 is the E-2 engine roster entry in `tests/gates/roster.json`; W-A.2 has retired the `it.fails` form into it.

## 4 · Files it touches

- Deleted: `src/composables/glass/webgl/` (whole), `src/composables/glass/canvas2d/` (whole), `src/components/aurora/composables/glSetup.ts`, `src/components/aurora/constants/shaders/{aurora.frag,aurora.vert,aurora-image.frag,brush.glsl,composition.glsl,flow.glsl,mediums.glsl,metal-medium.glsl,oil-modes.glsl,tonemap.glsl,vangogh-medium.glsl}.ts`, `src/components/aurora/constants/renderMode.ts`, `src/composables/glass/procedural/color.glsl.ts`, `src/components/blob/shaders/{metaball.frag,metaball.vert,sdf-body.glsl,watercolor-edges.glsl,oklch-perturb.glsl,metaball-uniforms.glsl}.ts`, `src/components/blob/composables/{buildMetaballProgram,uploadBlobUniforms}.ts`, `tests/composables/glass/{webgl,canvas2d}/`.
- Moved into `src/composables/glass/webgpu/`: `createCanvasLifecycle.ts`, `backingSize.ts`, `visibility.ts`, `shaders/flow.wgsl.ts`.
- Edited: `webgpu/{useWebGPUCanvas,useGpuSubstrate,webgpuDevice,webgpuCanvasTypes,rendererStatus}.ts`; `src/components/aurora/{Aurora.vue,index.ts,README.md,DESIGN.md}`, `composables/{runtime,useAurora,wgpuSetup,textureUpload,auroraImageSource,frameLoop,uniformBridge,auroraFallbackGround→auroraGround}.ts`, `constants/{presets,shaders/aurora.wgsl,shaders/aurora-mediums.wgsl}.ts`; `src/components/blob/{Blob.vue,README.md}`, `composables/{useMetaballRenderer,blobSimulation,wgpuSetup,uniformBridgeWGPU→packBlobUniforms}.ts`, `shaders/metaball.wgsl.ts`; `src/components/fourier-field/{FourierField.vue,useFourierField.ts,renderer/wgpu.ts}`; `src/composables/glass/index.ts`, `src/index.ts`, `src/components/PROCEDURAL-SUITE.md`, `src/composables/motion/pointer/{usePointerVelocityField,pointerFieldMappings}.ts`, `src/composables/glass/procedural/color.wgsl.ts` (its GLSL twin deleted, prose), `demo/stories/substrates/{aurora.vue,aurora/AuroraStage.vue}`.
- New tests: `tests-visual/wired/one-engine.spec.ts` (appendices B-D), `tests/composables/glass/webgpu/backing-limits.test.ts` (the clamp as a unit over a fake `device.limits`).
- `MIGRATION.md` (§7), `tests/gates/roster.json`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G1-G1 · the register reads 0 | `test "$(git grep -icE 'webgl\|glsl\|setupGL' -- src \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 660 lines, 76 files |
| G1-G2 · no GLSL module | `test -z "$(git ls-files src \| grep -E '\.(glsl\|frag\|vert)\.ts$')"` | exit 0 | **exit 1**: 19 files, 3,566 lines |
| G1-G3 · no Canvas2D engine | `! git grep -nE 'useCanvas2D\|getContext\(\s*"2d"\|toDataURL' -- src ':!src/composables/glass/useGlassBackdropLuminance.ts' ':!src/composables/glass/backdropLuminanceSample.ts'` (the two sampler files are W-G.3's G3-G7) | exit 0 | **exit 1**: `useConstellation.ts:287`, `useCanvas2D.ts:167`, `auroraFallbackGround.ts:345,360` |
| G1-G4 · no WebGL context on a WebGPU host | appendix B on `/`, `/substrates/aurora`, `/substrates/constellation`: 0 `webgl`/`webgl2` requests | 0 on each route | **2** `webgl2` on each route |
| G1-G5 · no WebGPU fails loud | appendix D, `navigator.gpu` removed: 0 `webgl*` requests, `[data-aurora-substrate][data-engine="css"]` present, and the page's `onInitError` sink receives reason `no-navigator-gpu` | all three | **FAIL**: `webgl2` ×2, no `data-engine`, no error |
| G1-G6 · the device takes the adapter's limit | appendix C: device `maxTextureDimension2D` equals the adapter's | equal | **8192 vs 16384**, requested `null` |
| G1-G7 · an oversize host paints | appendix C: the shell aurora host at 1440×9000 and again at 1440×20000: 0 uncaptured GPU errors over 3 s, `getCurrentTexture()` within the device limit, ≥ 1 % of a 400×300 viewport patch moves in 1.5 s; after a shrink to 900 px, the same | all clauses | **FAIL** at 9000: 50 errors, 0 px moved |
| G1-G8 · the ground is canvas-free | appendix D: 0 `toDataURL` calls through mount | 0 on `/` and `/substrates/aurora` | **3** and **18** |
| ~~G1-G10~~ | struck (fix-3, FB-18): the constellation's move is W-B.9's own act and gate (B9-G1, B9-G2), landed before this wave | — | — |
| G1-G11 · no shader of a second engine ships | after `npm run build`: `! grep -l '#version 300 es' dist/*.js` | exit 0 | **exit 1**: 3 occurrences in `dist/aurora.js`'s closure (W-G.7 appendix A) |

Planted bites (for W-A.2's roster, under `tests/_support/bites/`): re-add one `.glsl.ts` import to `useMetaballRenderer.ts` (G1-G1, G1-G2); drop `requiredLimits` (G1-G6, G1-G7); restore `rasterizeField` (G1-G3, G1-G8); (the luma bite moved to W-H.1 with G1-G9).

## 6 · π and DELTA obligations

- **π-W1 (C-11).** `/substrates/blob`, the first blob isolated (every other node hidden, a flat `#808080` page, 1440×1400, DPR 1), `reducedMotion: 'reduce'` so the composed rest frame is deterministic; light and dark; before and after the excise. The pair must be pixel-identical (the blob already paints on WebGPU; the excise removes code that never ran on this host). A difference is a defect of the move, not an accepted delta. HEAD capture of the isolated hero at rest: `cap/g5-blob-f0.png` (sha256 `81df2da5c676…`).
- **π-GROUND.** `/` and `/substrates/aurora`, light and dark, 1440×900: the frame-0 ground alone (an init script that holds `requestAdapter` pending), before (PNG raster) and after (CSS layers). The per-quadrant mean OKLab L of the pair agrees within 0.01, the certify band the ground already asserts.
- **π-LIMITS.** The 1440×9000 host, before (frozen field, the error text) and after (a moving field), two screenshots 1.5 s apart each, with appendix C's JSON as the paired reading.
- **π-NO-GPU.** `navigator.gpu` removed: the aurora route shows the CSS ground and the surfaced error (rendererStatus rendered by the story). Before: the WebGL2 arm painting.
- **π-CONSTELLATION** moved to W-B.9 §6 with the constellation's port.
- Engines: Chromium on Metal, measured. Playwright WebKit: not run at this seat; each cell is recorded as a reading or a crash. Real Safari: UNMEASURED until W-A.6's step 0 (OW-3). Safari 26 ships WebGPU, so W-B.1's "default-Safari WebGPU promote" is this wave's engine on Safari; its paint cell is W-A.6's.
- Captures that read a WebGPU canvas are screenshots only; no probe calls `getContext()` on a page canvas (the context-steal trap).

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| WebGL2 rendering in Aurora, Blob, FourierField | none. A host without a usable WebGPU adapter gets the CSS ground (Aurora) or no paint (Blob, FourierField), `onInitError` with a typed reason, and `data-engine="css"`. The constellation never rendered on WebGL2 (its engine was `useCanvas2D`); its port and rows are W-B.9's |
| `useCanvas2D`, `Canvas2DFrame`, `Canvas2DHandle`, `Canvas2DOptions`, `Canvas2DSuspendReason` (root export) | none; the library draws nothing on Canvas2D |
| `GpuBackend` (root type), `FourierField`'s exposed `backend()` | none; the engine is WebGPU |
| `RendererEngine` `"webgl2" \| "canvas2d"` members | `"webgpu" \| "css"` only |
| Aurora `renderMode: "webgl" \| "css" \| "auto"` (default `"auto"`) | `renderMode: "gpu" \| "css"` (default `"gpu"`); `"auto"`'s software guard is the device acquire's `software-adapter` refusal |
| `resolveRenderMode`, `isSoftwareWebGLRenderer`, `ResolveRenderModeOptions`, `forceWebGLUnderSoftwareRaster` (`./aurora`) | none; pass `renderMode` directly |
| `auroraFallbackGround`, `AuroraFallbackGround`, `AuroraFallbackGroundOptions` | `auroraGround`, `AuroraGround`, `AuroraGroundOptions`; the result's `backgroundImage` is CSS gradients, never a `data:image/png` |
| `onInitError` fires only for post-arm failures | it fires for every init failure, with `WebGPUInitError.reason` |

A consumer that pinned `renderMode="webgl"` (speedtest `App.vue:53,363-370`) moves to `"gpu"` in its own tranche (the consumer-updates ruling). Every row goes to the W-B.2 reply letter.

## 8 · Dependencies

PLAN §5, the one record of edges. W-G.2 is unordered against this wave there; if it lands first, step 1 keeps its one `lost` subscription.

## 9 · Ledger rows it closes

#54 (BUILD, executed); #45 (the engine half of BUILD); #49's D5 and R9 (the delete half; C-13a's paint half is W-G.4's); #50's W1 (C-11); #60's one-context arm; E-2's engine half; KFA-133; UIA-V-55, UIA-V-192; UIA-V-337 (NOT-REPRODUCED as "retries init every frame", present as a per-frame validation flood; closed by G1-G7); R2-06-10; W-B.1's two folds; the `gl-excise.test.ts:112` latch subject.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** one engine removes the class F-47 names (a fallback richer than the primary) and makes every later GPU wave (W-G.3 to W-G.7, W-A.4's floors) measure the path that ships.
- **Wave:** G1-G1 to G1-G11 green in one run on the GPU leg.
- **Feature:** the aurora, blob and fourier paint on WebGPU on `/`, `/substrates/*` and the 9000 px host (the constellation already does, from W-B.9), with π-W1's pair identical and π-GROUND's pair within band.

## Appendix A · `lib.mjs`, the band-G probe library

```js
// Band G probe library: the built demo (dist-demo of the scratch worktree) on :5987, real GPU (Metal + WebGPU).
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import os from 'node:os';
import fs from 'node:fs';
export const DEMO = process.env.DEMO || 'http://localhost:5987';
const WAVE = process.env.WAVE; // the running wave's id: the one evidence root is .cache/evidence/<wave>/ (PLAN §1)
if (!/^W-[0-9A-L]\.[0-9]+$/.test(WAVE ?? '')) throw new Error('run as WAVE=<wave id> node <probe>');
export const CAP = `.cache/evidence/${WAVE}`;
export const load = () => os.loadavg().map((x) => x.toFixed(2)).join('/');
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const GPU_ARGS = ['--use-gl=angle', '--use-angle=metal', '--enable-unsafe-webgpu', '--ignore-gpu-blocklist', '--enable-features=Vulkan'];
export async function open(route, o = {}) {
  const eng = o.eng || 'chromium';
  const browser = eng === 'webkit' ? await webkit.launch() : await chromium.launch({ args: o.nogpu ? [] : GPU_ARGS });
  const ctx = await browser.newContext({ viewport: { width: o.w || 1440, height: o.h || 900 }, deviceScaleFactor: o.dpr || 1, colorScheme: o.theme === 'dark' ? 'dark' : 'light', reducedMotion: 'no-preference' });
  if (o.init) await ctx.addInitScript(o.init);
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', (m) => logs.push(`${m.type()}: ${m.text()}`.slice(0, 300)));
  await page.goto(DEMO + route, { waitUntil: 'networkidle' });
  if (o.theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
  await sleep(o.settle ?? 1500);
  return { browser, ctx, page, logs };
}
export function reporter(name) {
  const out = { probe: name, load0: load(), rows: [] };
  fs.mkdirSync(CAP, { recursive: true });
  return {
    row(id, pass, reading) { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); },
    done() { out.load1 = load(); fs.writeFileSync(`${CAP}/${name}.json`, JSON.stringify(out, null, 1)); const f = out.rows.filter((r) => !r.pass).length; console.log(`${out.rows.length} rows, ${f} FAIL, load ${out.load0} -> ${out.load1}`); process.exitCode = f ? 1 : 0; },
  };
}
```

## Appendix B · `g1-contexts.mjs` (G1-G4, G1-G10)

```js
import { open, reporter } from './lib.mjs';
const R = reporter('g1-contexts');
const init = `(() => { window.__ctx = []; const gc = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { window.__ctx.push(t); return gc.call(this, t, ...a); }; })();`;
for (const route of ['/', '/substrates/aurora', '/substrates/constellation']) {
  const { browser, page } = await open(route, { init, settle: 4000 });
  const ctx = await page.evaluate(() => window.__ctx);
  const tally = ctx.reduce((m, t) => ((m[t] = (m[t] || 0) + 1), m), {});
  R.row(`G1-G8 ${route}: every getContext() request is "webgpu"`, ctx.length > 0 && ctx.every((t) => t === 'webgpu'), { tally });
  await browser.close();
}
R.done();
```

Output at HEAD: `FAIL ... / {"tally":{"2d":6,"webgl2":2,"webgpu":1}}`, `FAIL ... /substrates/aurora {"tally":{"webgl2":2,"2d":20}}`, `FAIL ... /substrates/constellation {"tally":{"2d":12,"webgl2":2,"webgpu":1}}`. As a gate, G1-G4 asserts 0 `webgl*` (the sampler's `2d` requests are W-G.3's); the constellation route's `2d` count is W-B.9's B9-G2 (G1-G10 struck, fix-3).

## Appendix C · `g1-limits.mjs` (G1-G6, G1-G7)

```js
import { open, reporter, sleep } from './lib.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
const R = reporter('g1-limits');
const init = `(() => { window.__submits = 0; window.__gpuErr = []; window.__tex = []; window.__limits = null;
  const sb = GPUQueue.prototype.submit; GPUQueue.prototype.submit = function (...a) { window.__submits++; return sb.apply(this, a); };
  const rq = GPUAdapter.prototype.requestDevice; GPUAdapter.prototype.requestDevice = async function (desc) { const d = await rq.call(this, desc); window.__limits = { requested: desc?.requiredLimits?.maxTextureDimension2D ?? null, device: d.limits.maxTextureDimension2D, adapter: this.limits.maxTextureDimension2D }; d.addEventListener('uncapturederror', (e) => { if (window.__gpuErr.length < 50) window.__gpuErr.push(String(e.error?.message || e).slice(0, 160)); }); return d; };
  const gct = GPUCanvasContext.prototype.getCurrentTexture; GPUCanvasContext.prototype.getCurrentTexture = function () { const t = gct.call(this); if (window.__tex.length < 400) window.__tex.push([t.width, t.height]); return t; }; })();`;
const { browser, page } = await open('/', { init, settle: 4000 });
R.row('G1-G6 the device requests the adapter maxTextureDimension2D', await page.evaluate(() => window.__limits && window.__limits.device === window.__limits.adapter), await page.evaluate(() => window.__limits));
for (const H of [9000, 20000, 900]) {
  await page.evaluate((H) => { const r = document.querySelector('.shell-aurora'); Object.assign(r.style, { position: 'absolute', inset: 'auto', top: '0', left: '0', width: '1440px', height: `${H}px` }); window.__gpuErr = []; window.__tex = []; }, H);
  await sleep(3000);
  const s = await page.evaluate(() => ({ errors: window.__gpuErr.length, firstErr: window.__gpuErr[0], lastTex: window.__tex.at(-1), backing: [document.querySelector('.shell-aurora canvas').width, document.querySelector('.shell-aurora canvas').height], limit: window.__limits?.device }));
  const shot = async () => PNG.sync.read(await page.screenshot({ clip: { x: 200, y: 200, width: 400, height: 300 } }));
  await page.addStyleTag({ content: 'main, header, nav { visibility: hidden !important }' });
  const a = await shot(); await sleep(1500); const b = await shot();
  let moved = 0; for (let i = 0; i < a.data.length; i += 4) if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 3) moved++;
  R.row(`G1-G7 host 1440x${H}: 0 GPU errors, texture within the limit, >= 1 % of the patch moves`, s.errors === 0 && Math.max(...s.lastTex) <= s.limit && moved >= 1200, { ...s, movedPx: moved });
}
await browser.close();
R.done();
```

HEAD (the 9000 cell as run at this seat, with the patch-move clause at > 0 px): `FAIL ... {"errors":50,"firstErr":"Texture size ([Extent3D width:1440, height:9000, depthOrArrayLayers:1]) exceeded maximum texture size ([Extent3D width:8192, height:8192, depthOrArrayLayers:256","lastTex":[1440,9000],"texCount":361,"canvas":[1440,9000],"movedPx":0,"of":120000}`; limits `{"requested":null,"device":8192,"adapter":16384}`.

## Appendix D · `g1-engine.mjs` (G1-G5, G1-G8)

```js
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g1-engine');
const init = `(() => { window.__ctx = []; window.__toDataURL = 0; window.__initErrors = [];
  const gc = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { window.__ctx.push(t); return gc.call(this, t, ...a); };
  const td = HTMLCanvasElement.prototype.toDataURL; HTMLCanvasElement.prototype.toDataURL = function (...a) { window.__toDataURL++; return td.apply(this, a); }; })();`;
for (const route of ['/', '/substrates/aurora']) {
  const { browser, page } = await open(route, { init, settle: 4000 });
  const n = await page.evaluate(() => window.__toDataURL);
  R.row(`G1-G8 ${route}: 0 toDataURL calls through mount`, n === 0, { toDataURL: n });
  await browser.close();
}
const noGpu = `Object.defineProperty(Navigator.prototype, 'gpu', { configurable: true, get: () => undefined });`;
const { browser, page, logs } = await open('/substrates/aurora', { init: init + noGpu, settle: 4000 });
const ctx = await page.evaluate(() => window.__ctx);
const status = await page.evaluate(() => [...document.querySelectorAll('[data-aurora-substrate]')].map((e) => ({ engine: e.getAttribute('data-engine'), attrs: Object.keys(e.dataset) })));
const loud = logs.some((l) => /no-navigator-gpu/.test(l));
R.row('G1-G5 no WebGPU: no webgl context, data-engine="css", the typed error surfaced', !ctx.some((t) => /webgl/.test(t)) && status.some((s) => s.engine === 'css') && loud, { contextsRequested: ctx, status, loud });
await browser.close();
R.done();
```

HEAD: `FAIL G1-G8 / {"toDataURL":3}`, `FAIL G1-G8 /substrates/aurora {"toDataURL":18}`, `FAIL G1-G5 {"contextsRequested":["webgl2","2d","webgl2","2d",…],"status":[{"engine":null,"attrs":["v-365c95db","auroraSubstrate"]}]}`. The loudness clause reads the story's rendered `onInitError` output, which the demo logs as `[demo] shell aurora init failed <error>` (seen at this seat for the `destroyed` case, W-G.2 §2).
