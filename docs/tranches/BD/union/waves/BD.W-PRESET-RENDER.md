# BD.W-PRESET-RENDER — the preset thumbnails RENDER (the blank-Skeleton BUG; the WebGPU readback race closed with a SAME-TICK read)

**Band 16 (DEMO-CHASSIS) · [BUG] · depends: — (shares the WebGPU-output root family with `W-DOTFLOW-REBUILD`, but DIVERGES on the fix; see §"Shared root, divergent fix").** A pure demo-chassis bug: the aurora preset gallery renders every card as a blank `<Skeleton>` shimmer (`document.querySelectorAll('img').length === 0` live-confirmed). No `src/` paint changes — the fix lands in the DEMO thumbnail-bake facility (`demo/stories/aurora/usePresetThumbnails.ts`), the shared seam every configurator's preset gallery will use once they route through `<VizStudio>` (W-CONFIG-GALLERY-DOCK). Per `viz/ADDENDUM-DEMO-CHASSIS.md` ask #5 + `page-audit/substrates.md §4` (the ROOT CAUSE, live-confirmed).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build closes the WebGPU `toDataURL`-after-yield readback race in the bake loop (a same-tick read on a `preserveDrawingBuffer`/capture-configured context, OR force the bake onto the WebGL2 fallback that has the synchronous `readPixels`/`toDataURL` path), + a binding pixel-variance gate that REDs on the blank thumbnail. User-gated.

## The defect / the ask (live-confirmed — `page-audit/substrates.md §4`)

The aurora studio's preset gallery (`PresetPickerRow`) renders each preset card with its name + medium label but a BLANK preview thumbnail — every card stuck on the `<Skeleton>` shimmer forever, exactly the user's screenshot (Sky/Dawn show name, blank preview). The live evidence is decisive: on `/substrates/aurora`, `document.querySelectorAll('img').length === 0` — ZERO data-URL thumbnails resolve in the whole row, so the `<img v-if="thumbs[key]">` never paints and every card falls through to the Skeleton.

**The render path (traced — `usePresetThumbnails.ts`):**

1. `aurora.vue` calls `usePresetThumbnails({ widthCss: 320, heightCss: 200 })`.
2. `usePresetThumbnails.ts:61` `bake()` creates an offscreen canvas, calls `createAurora(shared, freezeCfg(…), { mode: "capture" })`, `await aurora.armAsync()`, then loops `update(cfg) + renderAt(1.0) + toDataURL("image/webp")` per preset (lines 91-97).
3. The fix-comment at `usePresetThumbnails.ts:84-90` (BC.W-VIZ-AURORA T2) records that AWAIT-`armAsync`-before-`renderAt` already closed the *device-race* "dead dark thumbnail" class — BUT the live page STILL has ZERO imgs.

**Why it is STILL blank — the WebGPU READBACK race the device-race fix did NOT close:**

- The bake canvas runs `createAurora(…, { mode: "capture" })` → aurora is WebGPU-first (`runtime.ts` composes `createGpuSubstrate`; `/substrates/aurora`'s live stage canvas is `webgpu`, `navigator.gpu` present), so the capture runs on the WebGPU backend.
- A WebGPU frame draws against `context.getCurrentTexture()` and `device.queue.submit()` **PRESENTS** the swap-chain texture. WebGPU has **no `preserveDrawingBuffer` equivalent** for the swap-chain — the moment the texture is acquired-and-presented, a subsequent `canvas.toDataURL()` reads an EMPTY/cleared buffer. The `shouldPreserveDrawingBuffer(options)` in `runtime.ts:120` threads `preserveDrawingBuffer: true` into the `contextAttrs` — but that attr is a **WebGL** context-creation option; the WebGPU `context.configure({ device, format, alphaMode })` in `useWebGPUCanvas.ts:201` NEVER reads it (WebGPU configure carries no such flag).
- The bake loop makes it worse: `renderAt(1.0)` then `toDataURL` then **`await new Promise((r) => setTimeout(r, 0))`** (`usePresetThumbnails.ts:94-96`). Even though the `toDataURL` is on line 94 (before the line-96 yield), the per-preset structure interleaves a macrotask yield BETWEEN each preset's submit and the NEXT `renderAt` — and the WebGPU swap-chain texture acquired for preset *k*'s `renderAt` is GONE (presented + released) by the time `toDataURL` samples it the SAME tick or the next. The `armAsync` fix addressed the async *device* race (the device wasn't present for the first `renderAt`); it did NOT address the swap-chain *readback* race (the texture is presented before `toDataURL` reads).
- Net: every `toDataURL` returns a blank/empty webp → 0 imgs resolve → all Skeletons → blank previews. **BUG, born-RED.**

The ask: the preset-preview thumbnail must paint each preset's real aurora field; fix the bake-render path so the readback lands the drawn frame; born-RED on the blank-preview.

## The mechanism — the SAME-TICK readback (the swap-chain is gone after present; read it BEFORE present, OR on the WebGL2 path)

The WebGPU swap-chain texture is unreadable via `toDataURL` after `device.queue.submit()` presents it. Three honest closes (the build picks the one that holds on the WebGPU backend; the spec names all three so the implementation is not boxed into a path that a future GPU/driver breaks):

### Close A (preferred) — bake on the WebGL2 fallback (the synchronous `readPixels`/`toDataURL` path)

Force the thumbnail bake onto the WebGL2 backend, which HAS a `preserveDrawingBuffer` that genuinely preserves the drawing buffer for a synchronous `readPixels`/`toDataURL` read after `renderAt`. The bake canvas is OFFSCREEN + transient (one capture, then `dispose`), so the WebGL2 fidelity is byte-equivalent for a static preview swatch (the painterly-medium register reads the SAME at `t=1.0`; the WebGPU-vs-WebGL2 parity is gate-certified at ΔE≈0 for the smooth core, `proof:gpu-substrate-single` aurora row). The mechanism: `createAurora` already routes through `createGpuSubstrate`'s picker — add a CAPTURE-mode escape that pins the backend to WebGL2 for the bake (the picker's `armAsync` already falls to the WebGL2 net; the bake forces that fall by construction, NOT a god-branch). The fix-comment at `runtime.ts:253` already names the WebGL2 `readPixels`/`toDataURL` synchronous path as the capture-correct one.

### Close B — same-tick read BEFORE present (a persistent offscreen readback target)

Keep the WebGPU backend but render the capture frame to a PERSISTENT offscreen texture (a `GPUTexture` the bake owns, NOT the swap-chain), then `device.queue.copyTextureToBuffer` into a mapped `GPUBuffer` and decode to a data-URL — all WITHIN the same submit/await, never across a `setTimeout(0)` yield. The readback reads the OWNED texture (which is NOT presented + released), so it survives the read. This is the WebGPU-native capture path; it is heavier (a net-new render-target + copy-buffer + `mapAsync`), so it is the fallback IF Close A's WebGL2 fidelity is judged insufficient.

### Close C — collapse the yield (the minimal close, IF the backend is already WebGL2-on-capture)

If the capture already lands on WebGL2 (Close A applied) the `await setTimeout(0)` between presets is the residual hazard: it lets the browser reclaim the drawing buffer between `renderAt` and the NEXT preset's `toDataURL`. The minimal hardening is a SYNCHRONOUS `renderAt(1.0)` → `toDataURL` with NO yield BETWEEN the draw and the read (move the progress-yield to AFTER the data-URL is captured + stashed, or drop it — the gallery can resolve all thumbs in one synchronous pass since the per-preset cost is a single static frame). The same-frame `renderAt → toDataURL` contract is the load-bearing invariant on EITHER backend.

**The shared facility note (the chassis-once lever).** `usePresetThumbnails` is the MODEL — once blob/fourier-field/concentric/paper-grid route through `<VizStudio>` (W-CONFIG-GALLERY-DOCK), they all use the SAME thumbnail-bake facility, so this readback fix lands ONCE and every configurator's preset gallery inherits a working thumbnail. The fix is at the bake seam, NOT per-page.

## The gate — `proof:preset-render` (born-RED on the blank Skeleton → GREEN at the same-tick readback)

`scripts/proof-preset-render.mjs`, `tags: ["local"]` (it needs a real browser + GPU to render-and-read a thumbnail — the SOURCE-presence arm alone cannot certify a PAINTED pixel; this is the cardinal-lesson split, the live render IS the gate). The gate is REAL — it asserts a RENDERED thumbnail has NON-BLANK pixels via `getImageData` variance, NEVER a presence-regex over the bake source.

- **P1 — a rendered thumbnail has NON-BLANK pixels (the binding bite, born-RED).** The gate runs the bake facility (or drives the live `/substrates/aurora` preset gallery), reads back at least one resolved thumbnail's pixels (`createImageBitmap(dataURL)` → an offscreen 2D `getImageData`, OR the live `<img>`'s decoded pixels via `drawImage` + `getImageData`), and computes the per-channel LUMINANCE VARIANCE across the sampled grid. A thumbnail PASSES IFF `variance > VARIANCE_FLOOR` (a non-flat field — the aurora nuclei composite has real spatial structure) AND the mean luminance is in a sane band (NOT all-zero, NOT all-one). A BLANK webp (`variance ≈ 0`, the empty-readback signature) REDs. This is the born-RED bite: on the pre-fix tree EVERY thumbnail is blank → `img count 0` / `variance 0` → P1 RED.
- **P2 — the gallery resolves ALL presets (no partial bake).** Every preset key in `PRESET_KEYS` resolves a non-empty data-URL (`thumbs[key] !== ""`) AND each clears the P1 variance floor. A bake that resolves 0 of N (the live HEAD state) OR resolves N empty-string entries REDs. This catches the silent-empty-string failure mode (`toDataURL` returning `""` on the empty WebGPU buffer).
- **P3 — the readback is SAME-TICK (the structural anti-regression, device-free).** The bake `renderAt → toDataURL` carries NO `await`/`setTimeout`/microtask-yield BETWEEN the draw and the read (the comment-stripped source assert — a yield re-inserted between `renderAt(…)` and `toDataURL(…)` REDs). This is the ONLY device-free arm; it is the standing fence against the readback race silently re-opening (a future refactor that re-introduces the yield re-reds without needing a GPU). P3 does NOT certify the paint — P1 does; P3 forbids the known-bad shape.
- **P4 — the capture backend is the readback-capable path (Close A/B fence).** EITHER the bake forces the WebGL2 backend on capture (Close A — the picker falls to WebGL2 for the offscreen bake) OR the bake owns a persistent offscreen readback target + `copyTextureToBuffer` (Close B — never the bare swap-chain `toDataURL`). A bake that reads `context.getCurrentTexture()` / the swap-chain `toDataURL` on the WebGPU backend with NO owned target REDs (the swap-chain-readback bite — the exact HEAD failure).

**Self-test bites (each planted defect MUST red):**
- (a) a bake loop with `renderAt(1.0); await new Promise(r => setTimeout(r, 0)); toDataURL(…)` (the yield BETWEEN draw and read) → P3 RED.
- (b) a fixture thumbnail that is an all-zero / all-one flat webp (the empty-readback signature) → P1 RED.
- (c) a bake that resolves only the first preset + leaves the rest `""` → P2 RED.
- (d) a WebGPU-backend bake reading the swap-chain `toDataURL` with no owned readback target → P4 RED (the swap-chain-readback bite).

**What reds on the pre-fix tree (born-RED by construction):** P1 (every thumbnail blank → `variance 0` / `img count 0`), P2 (0 of N resolve), P3 (the `await setTimeout(0)` yield sits in the bake loop today), P4 (the WebGPU-backend capture reads the swap-chain with `preserveDrawingBuffer` set on a WebGL-only attr the WebGPU configure ignores). GREEN only after the same-tick readback (a working backend + the collapsed yield + the painted thumbnail) lands.

## The binding π — `tests-visual/preset-render.spec.ts`

The painted-truth readback, served at `:5199`, over the live `/substrates/aurora` preset gallery (and — once W-CONFIG-GALLERY-DOCK routes them — blob/fourier-field/concentric/paper-grid galleries), NEVER `reducedMotion`.

- **THE THUMBNAILS PAINT (the load-bearing capture).** Navigate to `/substrates/aurora`, wait for the bake (`thumbs.ready`), assert `document.querySelectorAll('img[src^="data:image"]').length === PRESET_KEYS.length` (every preset resolves a real data-URL, not the Skeleton), decode each `<img>` via `drawImage` + `getImageData`, and assert each clears the variance floor (a real aurora field, not a blank). On HEAD this fails at `img count 0`.
- **EACH PRESET SHOWS ITS OWN FIELD (the distinct-preset readback).** Sky/Dawn/Speedtest/… each resolve a DISTINCT thumbnail (the per-preset mean-hue / variance differs — a single shared blank or a single shared frame REDs). This catches a bake that resolves one frame for all presets (the `update(cfg)` not re-uploading between captures).
- **THE GALLERY READS (the gestalt).** The preset row reads as a row of distinct, legible aurora swatches — the user's screenshot defect (name + blank) is gone.

## The gestalt row

**Union-roster surface: `configurators-goo` / `aurora` (the preset gallery paints).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: the preset gallery reads as a row of real, distinct aurora-field thumbnails (each card shows ITS preset's field, never a blank Skeleton). Born-FAIL on HEAD (every card blank). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Shared root, divergent FIX (the W-DOTFLOW-REBUILD relationship)

W-PRESET-RENDER and W-DOTFLOW-REBUILD SHARE the **WebGPU-output root family** — both surfaced because a WebGPU canvas's drawn output does not land where a consumer reads it. But the FIX DIVERGES, because the READ target differs:

- **W-PRESET-RENDER is a READBACK bug.** The thumbnail bake reads the swap-chain via `toDataURL` AFTER present → empty. The fix is a same-tick readback (a readback-capable backend / an owned offscreen target / no yield) — the drawn frame is FINE, the READ is broken.
- **W-DOTFLOW-REBUILD is a VISIBLE-RENDER bug.** The dot-flow canvas IS the on-screen present (the user looks at the swap-chain directly — NO `toDataURL` readback), yet it paints `litFrac:0`. So either the WebGPU render produces no output (a render-correctness bug, NOT a readback bug) OR it paints warm-cream-over-light-grey (invisible-by-design). The fix is the render path + a CONTRASTING stage — there is no readback to repair.

So the two waves are SIBLINGS, not duplicates: the shared diagnosis is "trace the WebGPU output path," but W-PRESET-RENDER fixes the OFF-SCREEN readback and W-DOTFLOW-REBUILD fixes the ON-SCREEN render + stage. Each carries its OWN born-RED gate (`proof:preset-render` on thumbnail variance; `proof:dotflow-rebuild` on `litFrac`). They do not block each other (no dependency edge); W-DOTFLOW-REBUILD §"Confirm the render path" verifies whether dotflow's dead render is the SAME swap-chain-present class (in which case it inherits this wave's same-tick discipline for any capture/parity readback it owns) or a distinct render-correctness bug.

## Fences

- **The gate is REAL — a PAINTED-pixel variance, NEVER a presence-regex (the Pass-D bar).** `proof:preset-render` P1/P2 read `getImageData` variance off a RENDERED thumbnail; a `/usePresetThumbnails/.test()` source round-trip is FORBIDDEN. The ONE device-free arm (P3) forbids the known-bad yield SHAPE — it does not certify the paint (P1 does).
- **No `src/` paint change.** The fix lands in the DEMO bake facility (`demo/stories/aurora/usePresetThumbnails.ts`) + (Close A) the `createAurora` capture-backend escape in `runtime.ts` IF a capture-pins-WebGL2 path is added — but `aurora.frag`/`aurora.wgsl` are byte-UNTOUCHED (the GL/WGSL shader fence is absolute). The preview swatch's COLOR is unchanged (the `freezeCfg` alpha-clamp + drift-zero canonicalization is preserved); only the READBACK lands.
- **The `freezeCfg` canonicalization is PRESERVED (no regression).** The BA.W-CONFIG-CHASSIS alpha-clamp + drift-zero (`usePresetThumbnails.ts:17-41`) stay — the preview shows the preset COLOR not its deployment translucency; the readback fix does NOT touch the captured-config shape.
- **The same-tick read is the load-bearing invariant on EITHER backend (P3).** A `renderAt → toDataURL` with a yield between is FORBIDDEN regardless of backend — the swap-chain / drawing-buffer is reclaimable across a yield.
- **Shared facility, ONE fix (the chassis-once lever).** The readback fix lands on the `usePresetThumbnails` model; blob/fourier-field/concentric/paper-grid inherit it through `<VizStudio>` (W-CONFIG-GALLERY-DOCK) — never a per-page re-fix.

## Disposition links

- **`viz/ADDENDUM-DEMO-CHASSIS.md` ask #5 (NONE of the presets RENDER — blank-white previews, screenshot-confirmed)** → BUILT (the spec). The blank-preview → P1's born-RED variance floor; the readback fix → §"The mechanism." CLOSED at the spec level.
- **`page-audit/substrates.md §4` (the ROOT CAUSE — `usePresetThumbnails.ts:96` `setTimeout(0)` yield → the WebGPU swap-chain is gone by readback; the `armAsync` device-race fix did NOT close the readback race)** → §"Why it is STILL blank" names the exact line + the WebGPU-vs-WebGL `preserveDrawingBuffer` asymmetry; P3/P4 fence the readback shape. CLOSED.
- **`page-audit/substrates.md §0/§8` (the shared facility — once blob/fourier/concentric/paper-grid route through `<VizStudio>` they use the SAME bake)** → §"The shared facility note" + the Fences chassis-once lever; the fix lands ONCE. CLOSED.
- **SIBLING of `W-DOTFLOW-REBUILD`** (the shared WebGPU-output diagnosis, the divergent readback-vs-render fix) — §"Shared root, divergent FIX." No dependency edge.
- **The same-tick readback IMPLEMENTATION is user-gated** (Close A WebGL2-pin / Close B owned-target / Close C yield-collapse) — the spec names the exact mechanism + the born-RED variance gate.
