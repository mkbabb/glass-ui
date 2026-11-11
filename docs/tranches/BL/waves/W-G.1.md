# W-G.1 · W-ONE-ENGINE: WebGPU is the only engine, the device takes the adapter's limits, and the ground is CSS

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25), `claude-opus-5-5`. Re-cut against master by the blob-run spec seat, 2026-11-10, `claude-fable-5-2` |
| read at | First cut: `b37a37c3`, built and probed on Chromium with Metal and WebGPU (adapter `apple/metal-3`, load average 30 to 137); the paint readings in §2 and the appendices are that seat's. Re-cut: master `b5ac6c5b6`, source and records only; nothing was built or run. A count marked "master" was re-read at the re-cut. The paint readings are September's, and the wave re-takes them before it changes a line (§5, RED first) |
| release | `waves/INDEX.md`, the one record. The ruling behind its row is §0.2 |
| the run | the blob run: W-G.1, W-B.9, W-G.5, W-G.5b, in that order on one branch (§0.1) |
| families | F-47 whole (`audit/REGISTRY.md:1154-1169`): L05a-01, L10-02, L04-F03, L05b-09, L01b-54, R2-06-10, R4-01-17. R2-09-02's publisher half is W-H.1's, conditional on D3-B. Also the engine halves routed here: F-48's C-11 (π-W1, the blob's GL excise), #49's D5 and #60's one-context arm (both F-51 routings, `census-register-a.md:56`, `census-register-b.md:50`), W-B.1's two folds (the Safari WebGPU promote, the `flow.wgsl.ts` curl tail), and O-172's backing store under a CSS scale. #45 and R2-06-10's constellation half are W-B.9's, the second wave of this run |
| edges | §8. PLAN §5's rows for W-G.1 and W-G.5 predate the re-cut; §8 replaces them |

## 0 · The run, its release, and what the re-cut changed

### 0.1 The run

The blob run is four waves on one release branch, landed in this order:

1. **W-G.1** (this wave): one engine, and the fixtures the other three drive (§3 item 8).
2. **W-B.9**: the constellation moves from Canvas2D to WebGPU, and the Canvas2D module is deleted with its last caller.
3. **W-G.5**: the blob as a colony.
4. **W-G.5b**: the blob's membrane, pointer and `stir()`.

W-G.5 and W-G.5b need this wave and nothing from W-B.9. W-B.9 is in the run because its removals are breaks: left out, `useCanvas2D` and the `"canvas2d"` engine member would need a third major.

### 0.2 The release: the major after 12.0.0

The run removes root exports (§7), so it is a major. It is not 12.0.0. It is the next major after it, and `waves/INDEX.md` carries the number.

- **12.0.0 is closed work and the blob is not.** W-R.1's deletions and budgets have their rulings or a named design pass. The blob has two open reads: the owner's π-LOOK, and W-G.5's standing falsifier (if no bead separates in paint after the colony lands, the next ruling is whether WatercolorDot replaces the engine). W-G.5b's numbers come out of a design loop. A release that holds both waits on the slower one.
- **The constellation is edited before then.** The u/dp intake in 11.2.0 adds `StillConstellation.vue` and `stillField.ts` and edits `constellationField.ts` and the barrel (`git diff --stat master...u/dp-integ-glass -- src/components/constellation`: 5 files, 217 insertions). W-B.9 ports the constellation as it stands after that merge.
- **12.0.0 edits the same files.** W-R.1 rules the shadow tokens in `src/styles/tokens/shadow.css`, where the blob's `--blob-shadow-*` declarations sit (`:106-145`), and W-G.7 re-cuts the aurora's package entries. A blob branch cut earlier would resolve those files twice.

So the rule is one line: **the run's branch is cut from master after `v12.0.0` is merged, and 12.0.0 never waits on any wave of this run.** The run's document work (the W-G.5b design loop, the owner questions below) can start any time, since it writes no source.

### 0.3 The dependencies PLAN §5 gave this wave and W-G.5

| edge | ruling | reason |
|---|---|---|
| W-A.4 (the GPU leg) | dropped as an edge; one slice of it lands here (§3 item 9) | The edge existed so the wave's paint gates had a leg to run on. They run on the releasing machine's Metal GPU, through `guarded`, from the run's own probe folder. But one part of W-A.4 cannot be left behind: on master the pixel floors remove `navigator.gpu` and require the WebGL2 arm (`tests-visual/substrate-paints-color.spec.ts:371-389`, `:444` `toBe("webgl2")`), and CI runs the blob floor on SwiftShader (`.github/workflows/ci.yml:39-68`). With the arm deleted both are dead. This wave re-points them. W-A.4's chroma floor, fourier floor and receipt verifier stay W-A.4's |
| W-B.9 (the constellation) | a wave of this run, after this wave | It was ordered before W-G.1 so that W-G.1 could delete `canvas2d/` whole. Ported first, on master's two-setup seam, it would have to write a refusing `setupGL` stub as the fourier field does (`fourier-field/renderer/wgpu.ts:387`), and this wave would delete the stub a commit later. Ported second, it writes one `setup`. Its size is §0.4 |
| W-C.5 (one colour leaf) | dropped | The edge existed because W-C.5 was to delete `canvas2d/resolveCanvasColor.ts` before this wave deleted the directory. W-B.9 now deletes the directory, that file included. No file under `src` imports `resolveCanvasColor` outside its own module; only the two barrels re-export it (`src/composables/glass/index.ts:32`, `src/index.ts:479`) |
| W-F.1 (one spring) | dropped | The edge existed for one re-point: W-F.1's `tests/motion/spring-one.test.ts` imports `createCanvasLifecycle` from `webgl/`. That file is not on master. If W-F.1 runs later it imports the lifecycle from `webgpu/` |
| W-G.6 (the mount path), W-G.5's edge | dropped | W-G.5 waited on W-G.6 for the harness page its gates drive. The harness lands in this wave (§3 item 8). W-G.6's one blob line, the asynchronous pipeline at `blob/composables/wgpuSetup.ts:100`, stays W-G.6's |
| W-A.2 (the gate roster), named in the first cut's §3 and §5 | dropped | `tests/gates/roster.json`, `tests/owed/` and `tests/_support/bites/` are not on master. The latch at `tests/components/custom/blob/gl-excise.test.ts:112` turns into a plain `it` here, and each planted bite is a step in the gate's own test or probe |

### 0.4 W-B.9 in this run, and its size

`waves/W-B.9.md` stands as the constellation's spec (BUILD; nodes as instanced discs, edges as instanced quads, the simulation stays on the CPU; the `drawOverlay` prop goes). Run here, it takes four amendments, which the orchestrator writes into that file before the run:

1. It lands after this wave, on the one `setup` seam.
2. It deletes `src/composables/glass/canvas2d/` whole, with `tests/composables/glass/canvas2d/`, the root exports `useCanvas2D`, `resolveCanvasColor` and the `Canvas2D*` types, and the `"canvas2d"` member of `RendererEngine`. The MIGRATION rows for those move from this wave's §7 to its own.
3. It lands no probe library and no spec scaffold; both are this wave's. It adds its rows to them. Its gate B9-G1 widens to the whole of `src`: `git grep -nE 'useCanvas2D|getContext\(\s*.2d.' -- src` prints nothing outside the two backdrop sampler files, which are W-G.3's. The aurora's half of that fact is this wave's G1-G3.
4. Its captures run on the run's Metal leg, not on W-A.4's.

Its size, read on master. It is the largest of the old edges and smaller than the blob:

- New: one WGSL renderer for four primitives (edges in three styles, nodes in two inks, the pointer disc, the ripple rings). The fourier field's renderer, the pattern W-B.9 names, is 393 lines.
- Rewritten: the frame closure in `composables/useConstellation.ts` (`:287-450` of 497) and the four `draw*` functions in `constellationRender.ts` (154 lines), which take a `CanvasRenderingContext2D`. `kVisOf` and `readPalette` are public and stay; the palette's CSS colour strings gain one numeric resolve through the library's token-colour resolver (`src/composables/dom/useResolveTokenColor.ts`).
- Removed: `drawOverlay` (54 lines in 9 files by W-B.9's count), `useCanvas2D.ts` (259 lines), `resolveCanvasColor.ts` (95 lines) and their two test files; `Constellation.palette-lifecycle.test.ts` is rewritten, since it mocks `useCanvas2D`.
- Prose: the constellation README (551 lines) names Canvas2D as its engine throughout.
- Consumers: atlas mounts `Constellation` as its page background (`atlas/src/platform/chrome/background/Constellation.host.vue:64`). After the port a host without WebGPU paints no constellation, where today Canvas2D paints on every host. atlas is told at the booking and at the publish. That consequence is OQ-1.

### 0.5 PLAN §3's row: the stroke cascade is not ported

PLAN §3 reads "the per-dab stroke cascade in WGSL (ids 3, 5, 6, 7 stop collapsing to one Kuwahara body), then the WebGL2 arms deleted". This wave deletes the arms and does not port the cascade.

1. The spec of record for the aurora's mediums (GF-AURORA, `BJ/addenda/2026-07-24-refinement/GREENFIELD-TERMINAL.md` §2 C1-C2, §4, §5) replaces the ten ids with six deposition bodies authored once in WGSL. Its `dab` and `stick` are new crescent and capsule SDF bodies, not the GLSL cascade. A port here would be deleted by W-G.4.
2. The fence that held the delete (R9, `BK/execution/2026-08-25-pi-band/PI-CENSUS.md:231`) asked for the GLSL paint to be archived first. It is: π-ARCHIVE is CAPTURED-GREEN (`PI-CENSUS.md:147`), 31 tracked artefacts under `BK/execution/2026-08-25-pi-band/gamma-aurora-blob/pi-ARCHIVE-*`. That archive is W-G.4's authoring reference.
3. W-G.4 is unplaced, so this run's release publishes the interval. On a WebGPU host nothing changes: ids 3, 5, 6 and 7 paint the Kuwahara body there today (L05a-01). A host without WebGPU loses the aurora's WebGL2 paint whole, the cascade with it, and shows the CSS ground (§7).

The medium-distinctness acceptance is W-G.4's gate G4-G2. C-11 (π-W1, #50 W1) closes here: the blob's GL excise is part of deleting the WebGL2 arm (L04-F03, `round-1/L04.md:132-150`), and its paired capture belongs to the wave that makes the change.

## 1 · What it closes

| id | what |
|---|---|
| L05a-01, L10-02 | the WebGPU primary paints one Kuwahara body for four ids while the WebGL2 "fallback" carries the stroke cascade (the fallback-richer half; the body split is W-G.4's) |
| L04-F03, L05b-09, L01b-54, #54 | the WebGPU-only ruling (`BK/PORT.md:115,145`) never executed: `setupGL` required (`useGpuSubstrate.ts:49`), the webgl2 register at 239 lines in 40 files (master) |
| R2-06-10 (aurora half) | the aurora raster ground (`auroraFallbackGround.ts:351-391`). The constellation half is W-B.9's |
| R4-01-17, UIA-V-55, UIA-V-192, UIA-V-337 | the device is requested without `requiredLimits`; a host past 8192 px flood-fails every frame |
| #49 D5, #60 one-context | WebGL2 probe contexts on an aurora mount: `renderMode.ts:35` calls the probe and `runtime.ts:245` now says it shares that result. September read 2 `webgl2` requests per route on a WebGPU host; the count is re-read at the cut |
| C-11 | π-W1, the blob's GL excise and its paired capture |
| E-2 (engine half), KFA-133 | a recognised init failure falls silently to WebGL2 (`useGpuSubstrate.ts:239-252`: "routed to the WebGL2 net", "NOT surfaced as `onInitError`") |
| O-172 (backing store) | a host under a CSS scale undersizes the canvas backing store (`webgl/backingSize.ts:47`) |
| W-B.1 folds | the Safari WebGPU promote; `webgl/shaders/flow.wgsl.ts`'s GLSL twin |
| latch `gl-excise.test.ts:112` | the `it.fails` turns into a plain `it` |

## 2 · The defect

Static, on master:

- **The engine register.** `git grep -icE 'webgl|glsl|setupGL' -- src` sums to **666 lines in 76 files**; `webgl2` alone to **239 in 40**; the blob alone **125 in 16**. `git ls-files src | grep -E '\.(glsl|frag|vert)(\.ts)?$'` lists **19 modules, 3,566 lines**: aurora 11 in `constants/shaders/`, the blob's 6 in `shaders/`, `composables/glass/procedural/color.glsl.ts` and `composables/glass/webgl/shaders/flow.glsl.ts`. Outside `src`: 45 lines in 19 `demo` files, 202 in 24 `tests` files, 166 in 42 `tests-visual` files.
- **The dual seam.** `useGpuSubstrate.ts:47` `setupWGPU?` and `:49` `setupGL` (required). The fourier field satisfies it with a declared stub (`fourier-field/renderer/wgpu.ts:387`, `useFourierField.ts:204`).
- **The silent net.** `useGpuSubstrate.ts:239-252`: a `WebGPUInitError` is routed to the WebGL2 arm and not to `onInitError`. The software-adapter guard says the same of itself (`useWebGPUCanvas.ts:143-150`, "falling to the WebGL2 net").
- **The probe contexts.** `renderMode.ts:2` imports `probeWebGL2Renderer` (`webgl/useWebGLCanvas.ts:56`) and calls it at `:35`; a comment at `runtime.ts:245` says the runtime shares that result and mints no second context.
- **The raster ground.** `auroraFallbackGround.ts:368` `getContext("2d")` and `:383` `toDataURL("image/png")`, inside `rasterizeField` (`:351`).
- **No device limits.** `useWebGPUCanvas.ts:156` `adapter.requestDevice(deviceDescriptor)`; `requiredLimits` has 0 hits in `src`.
- **The backing store.** `webgl/backingSize.ts:47` sizes from `getBoundingClientRect`, which a `transform: scale(0.35)` on the host shrinks (value's emerge, O-172).
- **The floors read the arm this wave deletes.** `tests-visual/substrate-paints-color.spec.ts:371-389` removes `navigator.gpu` unless `PI_FORCE_WEBGL=0`, and `:444` asserts the aurora armed `"webgl2"`. Its aurora plant patches the WebGL2 shader source (`:124-146`). `.github/workflows/ci.yml:39-68` runs the blob floor with `PI_ANGLE: swiftshader` (`:46`).
- **The latch.** `tests/components/custom/blob/gl-excise.test.ts:112` `it.fails("the WebGL2 register over src/components/blob reads 0")`.
- **Two consumers pin the mode this wave removes.** atlas: `atlas/src/platform/chrome/background/Aurora.vue:85` `renderMode = shader ? "webgl" : "css"`. speedtest: `App.vue:53,363-370` (the first cut's reading).

In paint, as read in September (probes in appendices B-D). None of the source these probes exercise has changed in kind since; the wave re-takes each before its first edit:

| probe | reading |
|---|---|
| context requests, WebGPU host (appendix B) | `/` `{"2d":6,"webgl2":2,"webgpu":1}`; `/substrates/aurora` `{"webgl2":2,"2d":20}`; `/substrates/constellation` `{"2d":12,"webgl2":2,"webgpu":1}` |
| `navigator.gpu` removed (appendix D) | `/substrates/aurora` requests `webgl2` twice (the probe and the net); the substrate root carries no engine attribute; no error surfaced |
| device limits (appendix C) | requested `maxTextureDimension2D` `null`; device **8192**; adapter **16384** |
| the shell aurora's host set to 1440×9000 (appendix C) | backing `[1440, 9000]`; **50** uncaptured GPU errors in 3 s (the capture cap), the first `Texture size ([Extent3D width:1440, height:9000 ...]) exceeded maximum texture size ([Extent3D width:8192, height:8192 ...`; `getCurrentTexture` still `[1440, 9000]` on 361 frames; **0** of 120,000 sampled pixels moved in 1.5 s. The loop does not park (120.5 submits/s). After a shrink to 900 px, 120 submits/s: "stays dead after a shrink" did not reproduce and is a regression clause, not a born-RED |
| `toDataURL` through mount (appendix D) | `/` **3**, `/substrates/aurora` **18** |

## 3 · The cure

1. **One engine module.** `src/composables/glass/webgpu/` holds the device, the canvas and the lifecycle. `createCanvasLifecycle.ts`, `backingSize.ts`, `visibility.ts` and `shaders/flow.wgsl.ts` move there from `webgl/`, and `webgl/` is deleted (`useWebGLCanvas.ts`, `compile.ts`, `shaders/flow.glsl.ts`). `useGpuSubstrate` takes one required `setup`, the WGSL builder; `setupGL`, `setupWGPU` and the picker go. `GpuBackend` is deleted. `RendererEngine` loses `"webgl2"` here and `"canvas2d"` in W-B.9, leaving `"webgpu" | "css"`. `canvas2d/` is untouched by this wave.
2. **Fail loud, one door.** Every `WebGPUInitError` kind (the union at `webgpu/webgpuDevice.ts:19-28`: no adapter, a rejected or hung device request, no `navigator.gpu`, a software adapter, a pipeline that fails validation) goes to `onInitError` and to `rendererStatus` as `{ phase: "error", engine: "css", error }`. Each substrate root carries `data-engine="webgpu"` once a frame presents and `"css"` otherwise. Nothing is chosen on failure, so no engine stands in for another: the aurora keeps the CSS ground it paints first on every host (item 6), and the blob and the fourier field paint nothing.
3. **Device limits.** The shared acquire requests `requiredLimits: { maxTextureDimension2D: adapter.limits.maxTextureDimension2D }`. The one sizer clamps the backing to `device.limits.maxTextureDimension2D` on each axis by lowering the effective DPR for that canvas, aspect kept, so configure never sees an oversize texture. A later size that fits restores the policy DPR on the next resize.
4. **The backing store ignores transforms.** Once the canvas's `ResizeObserver` has delivered an entry, the sizer takes the store from it: `devicePixelContentBoxSize` where the entry has one, the content box × DPR where it does not. Before the first entry, and under a `content-visibility` skip where no entry arrives, the `getBoundingClientRect` read stands, since it is the one read that is non-zero there (`backingSize.ts:30-32`). A scaled host is therefore undersized for at most the frame before its first entry.
5. **Per substrate.**
   - Aurora: delete `glSetup.ts`, the 11 GLSL modules in `constants/shaders/`, the GL half of `textureUpload.ts`, `resolveRenderMode`, `isSoftwareWebGLRenderer`, `ResolveRenderModeOptions`, `forceWebGLUnderSoftwareRaster` and the `?engine=webgl2` pin (`runtime.ts:107,310`, `demo/stories/substrates/aurora.vue:84-87,166`, `aurora/AuroraStage.vue:38-49`). The `renderMode` prop becomes `"gpu" | "css"`, default `"gpu"`; a software adapter is refused at acquire (item 2), which is where the software-raster guard now lives. The WGSL dispatch is not edited (§0.5).
   - Blob: GF-BLOB W1 (`DESIGN-NOW.md` §3 W1): delete `shaders/{metaball.frag,metaball.vert,sdf-body.glsl,watercolor-edges.glsl,oklch-perturb.glsl,metaball-uniforms.glsl}.ts`, `composables/{buildMetaballProgram,uploadBlobUniforms}.ts`, the GL branch of `useMetaballRenderer.ts` and `UNIFORM_NAMES`; `uniformBridgeWGPU.ts` becomes `packBlobUniforms.ts`, the only packer. The `uMaxReach` derivation moves verbatim (GF-BLOB ADJ-9: the discard is active).
   - Fourier field: `createFourierUnsupportedSetup` and the `backend` getter (`FourierField.vue:216`, `useFourierField.ts:57,214`) are deleted.
   - Constellation: untouched here. It keeps `useCanvas2D` until W-B.9.
6. **The ground is CSS.** `auroraFallbackGround` becomes `auroraGround` (the "fallback" name R2-06-10 and BD2 A54 asked retired). It returns the layered `radial-gradient` stack over the field-mean fill that it already builds when the raster returns null; `rasterizeField` is deleted. It is the frame-0 paint under every aurora, before the first GPU frame and under a failed one. W-G.7's derive subpath, which is to export this ground, follows this wave (W-R.1 OQ-12).
7. **The latch.** `tests/components/custom/blob/gl-excise.test.ts:112` becomes a plain `it` (the register over `src/components/blob` reads 0). The file keeps that `it` and the detector-discrimination `it`. Its allow-list and seam `it`s (`:140-171`) name files this wave deletes or rewrites, and go.
8. **The run's fixtures, landed here.** One folder, `tests-visual/blob-run/`, landed as the wave's first commit so that every before-reading is taken with it:
   - `lib.mjs`, appendix A's probe library, with three changes: the two absolute `node_modules` imports become package imports, `DEMO` is required from the environment, and the wave-id pattern admits a trailing letter (as written, `^W-[0-9A-L]\.[0-9]+$` rejects `W-G.5b`). `open` launches one browser per probe and every probe closes it in a `finally`.
   - `harness.html` and `harness.ts`: one page that mounts one component from `src` by `?c=` (`blob`, `aurora`, `fourier`, `constellation`) under the demo's cascade and puts the instance on `window`. W-G.5 and W-G.5b drive `c=blob`; W-B.9 drives `c=constellation`. It replaces the vnode walk appendix A of W-G.5 used to reach the Blob's exposed API. The demo's dev server serves it, as it serves the `tests-visual/u-b7/` harness; probes of demo routes run against the built demo.
   - `g1-contexts.mjs`, `g1-limits.mjs`, `g1-engine.mjs` (appendices B-D).
   - Every probe is launched through `~/.claude/guard/guarded` as a browser run, one at a time. A probe that starts Playwright WebKit takes `--exclusive webkit`.
9. **The floors read the engine that ships** (the slice of W-A.4 this wave cannot leave behind). In `tests-visual/substrate-paints-color.spec.ts`: `PI_FORCE_WEBGL` and `forceWebGLFloorPath` are deleted; the engine assertion requires `"webgpu"`; the aurora's black plant patches `GPUDevice.prototype.createShaderModule` instead of the WebGL2 shader source. The floors already read by composited screenshot, so the readback does not change. `ci.yml`'s `pixel-floor` job and the two `gate:pixel-floor:ci*` scripts are deleted, because a hosted runner has only a software adapter and item 2 refuses it; the gate register's row for those CI steps (`scripts/gate-register.mjs`, at `:401-411`) is updated in the same commit. `scripts/release.sh`, which already runs the aurora floor and the blob's flood plant on the releasing machine (`:44-50`), runs every leg. `tests-visual/u-b7/witness/aurora-webgl.mjs` is deleted, and so is the adapterless mode of `gooblob-meatball.spec.ts` and `viz-paint-records.spec.ts`, which captured the WebGL2 arm by removing `navigator.gpu`.
10. **The field luma publisher** is W-H.1's, built only if D3 converges on D3-B. This wave's lifecycle keeps the canvas configuration it has today.

## 4 · Files it touches

- Deleted: `src/composables/glass/webgl/` (whole, after the four moves), `src/components/aurora/composables/glSetup.ts`, `src/components/aurora/constants/shaders/{aurora.frag,aurora.vert,aurora-image.frag,brush.glsl,composition.glsl,flow.glsl,mediums.glsl,metal-medium.glsl,oil-modes.glsl,tonemap.glsl,vangogh-medium.glsl}.ts`, `src/components/aurora/constants/renderMode.ts`, `src/composables/glass/procedural/color.glsl.ts`, `src/components/blob/shaders/{metaball.frag,metaball.vert,sdf-body.glsl,watercolor-edges.glsl,oklch-perturb.glsl,metaball-uniforms.glsl}.ts`, `src/components/blob/composables/{buildMetaballProgram,uploadBlobUniforms}.ts`, `tests/composables/glass/webgl/useWebGLCanvas.test.ts` (`visibility.test.ts` moves with its subject), `tests-visual/u-b7/witness/aurora-webgl.mjs`.
- Moved into `src/composables/glass/webgpu/`: `createCanvasLifecycle.ts`, `backingSize.ts`, `visibility.ts`, `shaders/flow.wgsl.ts`, with every importer re-pointed in the same commit.
- Edited: `webgpu/{useWebGPUCanvas,useGpuSubstrate,webgpuDevice,webgpuCanvasTypes,rendererStatus,backingSize}.ts`; `src/components/aurora/{Aurora.vue,index.ts,README.md,DESIGN.md}`, `composables/{runtime,useAurora,wgpuSetup,textureUpload,auroraImageSource,frameLoop,uniformBridge,auroraFallbackGround→auroraGround}.ts`, `constants/{presets,shaders/aurora.wgsl,shaders/aurora-mediums.wgsl}.ts`; `src/components/blob/{Blob.vue,README.md}`, `composables/{useMetaballRenderer,blobSimulation,wgpuSetup,uniformBridgeWGPU→packBlobUniforms}.ts`, `shaders/metaball.wgsl.ts`; `src/components/fourier-field/{FourierField.vue,useFourierField.ts,renderer/wgpu.ts}`; `src/composables/glass/index.ts`, `src/index.ts`, `src/components/PROCEDURAL-SUITE.md`, `src/composables/motion/pointer/{usePointerVelocityField,pointerFieldMappings}.ts`, `src/composables/glass/procedural/color.wgsl.ts` (prose); the `demo` files that name the engine (19 on master).
- Tests: the 24 `tests` files that name the deleted engine are each rewritten on the one seam or deleted with their subject; `tests/public-surface.spec.ts` loses the removed names; new `tests/composables/glass/webgpu/backing-size.test.ts` (items 3 and 4 over a fake device and a fake `ResizeObserver` entry). `tests-visual/blob-run/` (item 8). `tests-visual/{substrate-paints-color,gooblob-meatball,viz-paint-records}.spec.ts`, `tests-visual/package.json`, `.github/workflows/ci.yml`, `scripts/gate-register.mjs`, `scripts/release.sh` (item 9).
- `MIGRATION.md` (§7).

## 5 · Acceptance gates

**RED first.** With the fixtures landed (§3 item 8) and nothing else changed, the wave runs every gate below and banks the readings under `.cache/evidence/W-G.1/`. A gate that reads green there is struck and reported, not kept.

Static, in the shell or vitest:

| id | gate | passes when | master |
|---|---|---|---|
| G1-G1 · the register reads 0 | `git grep -icE 'webgl\|glsl\|setupGL' -- src demo`, summed | 0 | **711** (666 in `src`, 45 in `demo`) |
| G1-G2 · no GLSL module | `git ls-files src \| grep -E '\.(glsl\|frag\|vert)(\.ts)?$'` | prints nothing | **19 files**, 3,566 lines |
| G1-G3 · the aurora's ground is not a canvas | `git grep -nE 'getContext\(\s*.2d.\|toDataURL\(' -- src/components/aurora` | prints nothing | `auroraFallbackGround.ts:368`, `:383`. The constellation's half of the first cut's G1-G3 is W-B.9's (§0.4) |
| G1-G6 · the device takes the adapter's limit, and the sizer clamps | `backing-size.test.ts`: over a fake adapter whose limit is 16384 the device descriptor carries 16384; a 1440×20000 box at DPR 2 yields a backing within 16384 on each axis with the aspect kept within 1 px; a later 1440×900 box restores DPR 2 | exit 0 | no file; `requiredLimits` 0 hits |
| ~~G1-G8~~ | struck at the re-cut: it counted `toDataURL` calls at run time, the fact G1-G3 already holds over the source. π-GROUND shows the paint | — | — |
| ~~G1-G9~~, ~~G1-G10~~ | struck in the first cut (the luma publisher moved to W-H.1; the constellation to W-B.9). The ids are not reused | — | — |
| G1-G11 · no shader of a second engine ships | after `npm run build`: `grep -l '#version 300 es' dist/*.js` | prints nothing | 3 occurrences in `dist/aurora.js`'s closure (W-G.7 appendix A, September) |
| G1-G12 · no floor forces or names a second engine | `git grep -nE 'PI_FORCE_WEBGL\|forceWebGLFloorPath\|WebGL2RenderingContext' -- tests-visual ':!tests-visual/blob-run'`, and `git grep -nE 'swiftshader\|pixel-floor:ci' -- .github tests-visual/package.json scripts/release.sh` | both print nothing | `substrate-paints-color.spec.ts:127,371,373,376`; `ci.yml:46,66,68`; `tests-visual/package.json:14,15` |
| G1-G14 · the latch is a test | `npx vitest run tests/components/custom/blob/gl-excise.test.ts`, and the file holds no `it.fails` | exit 0, no hit | `it.fails` at `:112`; the blob's register reads 125 |
| G1-G15 · the backing store ignores transforms | `backing-size.test.ts`, with `getBoundingClientRect` faked to return 0.35 of the layout box: an entry with `devicePixelContentBoxSize` yields exactly that size; an entry without it yields content box × DPR; with no entry yet, the faked rect × DPR | exit 0 | the sizer takes no entry; `webgl/backingSize.ts:47` |

In paint, Chromium on Metal, one run each. These are the cells where the claim is what the page requests or shows:

| id | gate | passes when | September reading |
|---|---|---|---|
| G1-G4 · no WebGL context on a WebGPU host | appendix B on `/`, `/substrates/aurora`, `/substrates/constellation` | 0 `webgl`/`webgl2` requests on each | **2** `webgl2` on each |
| G1-G5 · no WebGPU fails loud | appendix D, `navigator.gpu` removed: 0 `webgl*` requests, `[data-aurora-substrate][data-engine="css"]` present, and the page's `onInitError` sink receives an error whose `kind` is `no-navigator-gpu` | all three | **FAIL**: `webgl2` ×2, no `data-engine`, no error |
| G1-G7 · an oversize host paints | appendix C: the shell aurora host at 1440×9000 and at 1440×20000: 0 uncaptured GPU errors over 3 s, `getCurrentTexture()` within the device limit, at least 1 % of a 400×300 patch moves in 1.5 s; after a shrink to 900 px, the same | all clauses | **FAIL** at 9000: 50 errors, 0 px moved |
| G1-G13 · the floors pass on WebGPU and bite | `gate:pixel-floor` green with the aurora and the blob each reporting `webgpu`; `gate:pixel-floor:planted` and `:planted:flood` red on their own assertions | all three | the green leg requires `"webgl2"` (`:444`) |
| G1-G16 · the scaled host | harness `c=blob`, `c=aurora`, `c=fourier`, each under `transform: scale(0.35)`, read 1 s after mount: the canvas's `width` and `height` equal its unscaled content box × DPR within 1 px | all three | not read; `backingSize.ts:47` reads the transformed box |

Each gate's bite, run once and banked beside its green reading: re-add one `.glsl.ts` import to `useMetaballRenderer.ts` (G1-G1, G1-G2); restore `rasterizeField` (G1-G3); drop `requiredLimits` (G1-G6, G1-G7); make the sizer ignore its entry (G1-G15, G1-G16); route the init error back into a silent catch (G1-G5); restore the WebGL2 plant (G1-G12). G1-G13 carries its own two planted legs.

WebKit runs no cell of this wave. The engine is one JavaScript path; what can differ between engines is whether WebGPU is there at all, which is OQ-2.

## 6 · π and DELTA obligations

- **π-W1 (C-11).** Harness `c=blob`, a flat `#808080` page, 1440×1400, DPR 1, `reducedMotion: 'reduce'` so the composed rest frame is deterministic; light and dark; before and after the excise. The pair must be pixel-identical: the blob already paints on WebGPU, and the excise removes code that never ran on this host. A difference is a defect of the move.
- **π-GROUND.** `/` and `/substrates/aurora`, light and dark, 1440×900: the frame-0 ground alone (an init script that holds `requestAdapter` pending), before (PNG raster) and after (CSS layers). The per-quadrant mean OKLab L of the pair agrees within 0.01, the band the ground already asserts.
- **π-LIMITS.** The 1440×9000 host, before (frozen field, the error text) and after (a moving field), two screenshots 1.5 s apart each, with appendix C's JSON as the paired reading.
- **π-NO-GPU.** `navigator.gpu` removed: the aurora route shows the CSS ground and the surfaced error. Before: the WebGL2 arm painting.
- Captures that read a WebGPU canvas are screenshots only; no probe calls `getContext()` on a page canvas.
- Real Safari is unmeasured. Safari 26 ships WebGPU, so W-B.1's "default-Safari WebGPU promote" is this wave's engine on Safari; its paint is one owner glance at the close, on the demo's home route.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| WebGL2 rendering in Aurora, Blob, FourierField | none. A host without a usable WebGPU adapter gets the CSS ground (Aurora) or no paint (Blob, FourierField), `onInitError` with a typed `kind`, and `data-engine="css"` |
| `GpuBackend` (root type), `FourierField`'s exposed `backend()` | none; the engine is WebGPU |
| `RendererEngine`'s `"webgl2"` member | none |
| Aurora `renderMode: "webgl" \| "css" \| "auto"` (default `"auto"`) | `renderMode: "gpu" \| "css"` (default `"gpu"`); `"auto"`'s software guard is the device acquire's `software-adapter` refusal |
| `resolveRenderMode`, `isSoftwareWebGLRenderer`, `ResolveRenderModeOptions`, `forceWebGLUnderSoftwareRaster` (`./aurora`) | none; pass `renderMode` directly |
| `auroraFallbackGround`, `AuroraFallbackGround`, `AuroraFallbackGroundOptions` | `auroraGround`, `AuroraGround`, `AuroraGroundOptions`; the result's `backgroundImage` is CSS gradients, never a `data:image/png` |
| `onInitError` fires only for failures after the arm | it fires for every init failure, with `WebGPUInitError.kind` |
| the backing store follows the host's transformed box | it follows the content box × DPR; a scaled host keeps full resolution |

The `useCanvas2D` rows, `resolveCanvasColor`, the `"canvas2d"` member and `drawOverlay` are W-B.9's. atlas (`Aurora.vue:85`) and speedtest (`App.vue:53`) pin `renderMode="webgl"` and move to `"gpu"` in their own tranches; both are told when the run is booked and again at publish.

## 8 · Edges

This wave waits on one thing: `v12.0.0` merged to master (§0.2). W-B.9, W-G.5 and W-G.5b wait on this wave. Outside the run, W-G.2 builds its one `lost` subscription on the device record this wave moves, and W-G.3, W-G.4, W-G.6 and W-G.7's aurora half read this wave's engine wherever they are placed.

## 9 · Ledger rows it closes

#54 (BUILD, executed); #49's D5 and R9 (the delete half; C-13a's paint half is W-G.4's); #50's W1 (C-11); #60's one-context arm; E-2's engine half; KFA-133; UIA-V-55, UIA-V-192; UIA-V-337 (NOT-REPRODUCED as "retries init every frame", present as a per-frame validation flood; closed by G1-G7); R2-06-10's aurora half; W-B.1's two folds; O-172's backing store; the `gl-excise.test.ts:112` latch. #45's engine half and R2-06-10's constellation half close in W-B.9.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** one engine removes the class F-47 names (a fallback richer than the primary), and every later GPU wave measures the path that ships.
- **Wave:** the eight static gates and the five paint cells green in one pass, each with its banked bite.
- **Feature:** the aurora, blob and fourier field paint on WebGPU on `/`, `/substrates/*` and the 9000 px host, with π-W1's pair identical and π-GROUND's pair within band.

## Open questions

- **OQ-1 (owner).** After W-B.9, a browser without WebGPU shows no constellation, where Canvas2D paints one today. atlas's page background is the live case. Default: the port stands as W-B.9 rules it, the loss is a MIGRATION row, and atlas decides in its own tranche whether to mount `StillConstellation` (the SVG still that arrives with 11.2.0) under the live field. If the owner keeps the constellation on Canvas2D instead, W-B.9 leaves the run, `useCanvas2D` stays exported, and this wave is unchanged.
- **OQ-2 (measurement).** Does Playwright WebKit on the releasing machine expose `navigator.gpu`? No seat has read it. Default: no WebKit cell in this wave; W-G.5b's one WebKit cell is its input cell, which needs no paint.
- **OQ-3 (orchestrator).** `waves/W-B.9.md` still carries its September header and edges. Default: the four amendments of §0.4 are written into it before the run, by a seat allowed to edit it.

## Appendix A · `lib.mjs`, the probe library

As run in September. The wave lands it at `tests-visual/blob-run/lib.mjs` with the three changes of §3 item 8. In the four appendices "HEAD" is `b37a37c3` and "this seat" is the first cut's.

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

## Appendix B · `g1-contexts.mjs` (G1-G4)

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

Output at HEAD: `FAIL ... / {"tally":{"2d":6,"webgl2":2,"webgpu":1}}`, `FAIL ... /substrates/aurora {"tally":{"webgl2":2,"2d":20}}`, `FAIL ... /substrates/constellation {"tally":{"2d":12,"webgl2":2,"webgpu":1}}`. As a gate, G1-G4 asserts 0 `webgl*`; the probe's row label and its stricter "every request is webgpu" test are rewritten to that. The sampler's `2d` requests are W-G.3's, and the constellation route's `2d` count is W-B.9's B9-G2.

## Appendix C · `g1-limits.mjs` (G1-G7; its first row re-reads G1-G6 in the browser)

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

## Appendix D · `g1-engine.mjs` (G1-G5)

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

HEAD: `FAIL G1-G8 / {"toDataURL":3}`, `FAIL G1-G8 /substrates/aurora {"toDataURL":18}`, `FAIL G1-G5 {"contextsRequested":["webgl2","2d","webgl2","2d",…],"status":[{"engine":null,"attrs":["v-365c95db","auroraSubstrate"]}]}`. The loudness clause reads the story's rendered `onInitError` output, which the demo logs as `[demo] shell aurora init failed <error>` (seen at this seat for the `destroyed` case, W-G.2 §2). The two `toDataURL` rows stay in the probe as π-GROUND's paired reading and are no longer a gate (G1-G8 is struck); their row label is renamed.

## Consumer requirement: the "css" mode stays (atlas via sci-report-b4, 2026-11-11)

atlas sets Aurora's `render-mode` to `"css"` on purpose: the still, pole-derived gradient ground, with no live context and no frame loop, because a per-frame shader behind opaque data plates spends power with nothing to see. Its `"webgl"` value sits behind an opt-in prop no caller passes, so the removed mode costs atlas nothing.

- `"css"` remains a value a consumer sets explicitly, and a consumer that asks for it never gets the WebGPU path.
- Gate (vitest, with the context getters spied): an Aurora in `"css"` mode requests no GPU adapter, creates no canvas context and schedules no animation frame, at mount and after a resize and a theme flip.
