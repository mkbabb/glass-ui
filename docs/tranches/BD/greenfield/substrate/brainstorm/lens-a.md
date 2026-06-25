# Substrate greenfield — Lens A (pure iOS-27 fidelity)

> The GPU SUBSTRATE BASE: the shared canvas lifecycle every Band-A viz mounts on
> (`createCanvasLifecycle` + `useWebGLCanvas` + `useWebGPUCanvas` + `useGpuSubstrate`
> + `useIntersectionPause`). DEFT: this is fit, mostly-fixed infra. VALIDATE + HARDEN
> the lifecycle, do NOT re-fork. Survival of the fittest.

## 0. SOURCE-VERIFY (grep before citing — every cited export EXISTS)

| Cited symbol | File | Verified |
|---|---|---|
| `createCanvasLifecycle`, `CanvasFrameHooks`, `CanvasSuspendReason`, `N_RESTORE_STORM`/`T_RESTORE_STORM_MS`/`RESTORE_DEBOUNCE_MS` | `src/composables/glass/webgl/createCanvasLifecycle.ts` | ✔ |
| `createWebGLCanvas`, `probeWebGL2Renderer`, `canvasCanHostWebGL2`, `WebGLCanvasFrame` | `src/composables/glass/webgl/useWebGLCanvas.ts` | ✔ |
| `createWebGPUCanvas`, `supportsWebGPU`, `WEBGPU_ACQUIRE_TIMEOUT_MS` (=6000), `acquireSharedDevice` (module-private) | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | ✔ |
| `WebGPUInitError`, `isSoftwareWebGPUAdapter` | `src/composables/glass/webgpu/webgpuDevice.ts` | ✔ |
| `createGpuSubstrate`, `GpuSubstrateHandle`, `freshCanvasForFallback` (private), `GpuBackend` | `src/composables/glass/webgpu/useGpuSubstrate.ts` | ✔ |
| `useIntersectionPause`, `PausableRuntime` | `src/composables/motion/useIntersectionPause.ts` | ✔ |
| Consumers calling `createGpuSubstrate`/`useIntersectionPause` | aurora `runtime.ts`, goo-blob `useMetaballRenderer.ts`, goo-dot-matrix `useGooDotMatrix.ts`, dot-flow-field `useDotFlowField.ts`/`useFlowParticles.ts`, fourier-field, paper-grid, concentric, dot-matrix, constellation | ✔ |

NOTE: there is NO `useGpuSubstrate.ts`-exported composable named `useGpuSubstrate` and
NO `webgpuDevice` default export beyond the two helpers; the prompt's named set maps to
`createGpuSubstrate` (the factory) + `webgpuDevice.ts` (the leaf). Cited accordingly.

## 1. LIVE-INSPECT — the status quo, captured (not claimed)

Dev server `:5173`, Chrome (Metal-3 host, dpr 2). Probed `getBoundingClientRect` +
`canvas.width/height` on the two headline routes:

**`/substrates/aurora` — STUCK CANVAS, REPRODUCED LIVE.**
```
canvas.aurora-canvas #1: backing 300×150   box 1152×1585   parent content-visibility:auto
canvas.aurora-canvas #2: backing 300×150   box  704× 627   parent content-visibility:auto
```
Both visible (box > 0), both `content-visibility:auto` parents, both **frozen at the
300×150 HTML default**. A window resize (1440→1000w) did NOT re-size them. Console:
`[useWebGPUCanvas] device not acquired` (the thumbnail bake) + `useAurora: deferred init
armed with no onInitError handler`. The aurora wash is so heavily blurred the 300×150
upscale is *cosmetically* hidden — but the backing-store sizing has FAILED.

**`/substrates/blob` — CORRECT.**
```
canvas.goo-blob-canvas #1: backing 1536×1536  box 768×768   → exact 2× DPR ✔
canvas.goo-blob-canvas #2: backing 1126×1126  box 563×563   → exact 2× DPR ✔
```

**THE DELTA.** Same substrate, same lifecycle leaf, same picker — yet one viz sizes
perfectly and the other is stuck at 300×150. The variable is the **CONSUMER `resize()`**:
goo-blob's resizer measures `getBoundingClientRect` with ancestor fallback and fires
reliably; aurora's resizer (which has the *identical* "never fall to 300×150" guard in
its comment) is not being driven on this route — its ResizeObserver registers before the
content-visibility subtree is laid out, and the reveal re-measure either never reaches it
or the WGPU-not-acquired path armed the leaf with no live `setupGL` resize. The point is
ARCHITECTURAL: **sizing is delegated to N hand-written consumer `resize()` closures, each
re-deriving DPR + the gBCR-ancestor-fallback + the 300×150 guard independently.** The
substrate owns the SCHEDULE but not the SIZE — so the single most fragile, most-repeated
piece of canvas-lifecycle correctness has N implementations and N chances to drift. The
aurora stuck-canvas is that drift, live.

This is the keystone finding: the prior tactical fix (the 6000ms acquire-timeout +
clone-only-when-poisoned + reveal re-measure) hardened the *schedule and the fall*, but
left the *sizing contract* scattered. Greenfield: **lift sizing into the substrate.**

## 2. FIRST-PRINCIPLES — what a substrate base OWES every viz

A procedural-viz substrate has exactly one job: hand the consumer a **correctly-sized,
live-or-cleanly-parked drawing surface on whichever engine the platform affords**, and
get out of the way of the shader. From first principles it owes five guarantees, and the
consumer should be able to assume ALL of them without re-implementing any:

1. **SIZE** — the backing store always equals `box × DPR`, on mount, on resize, on reveal
   from a `content-visibility`/offscreen skip, on tab-return — and NEVER the 300×150
   default. One implementation, not N.
2. **ENGINE** — WebGPU where the platform truly affords it, a clean invisible fall to
   WebGL2 everywhere else (Safari-no-WebGPU, hung Metal, software adapter), with no hang,
   no flash, no per-frame error flood, no all-zero readback surprise.
3. **PARK** — zero rAF, zero GPU work while hidden (tab / offscreen / content-skipped),
   resumed velocity-clean.
4. **FREEZE** — one static frame then park under `prefers-reduced-motion: reduce`, live-
   re-monitored.
5. **READBACK** — a declared, non-tainting path to read pixels back when a viz π-gate
   needs it (the blob warm-floor gate, the dot-flow vignette gate).

Today #2/#3/#4 live in the substrate (good — KEEP). #1 and #5 leak to the consumer. The
greenfield closes those two leaks WITHOUT a re-fork: it lifts the *policy* into the
substrate and leaves the *shader* in the consumer.

## 3. THE GREENFIELD — "the substrate sizes, the shader paints"

The whole redesign is one inversion plus four hardenings. Idiomatically: the substrate
already threads `resize` through `buildContext`; today it INVOKES the consumer's resize.
We invert — the substrate OWNS a canonical `measureBacking()` and CALLS the consumer back
only with a `(w, h, dpr)` it has already computed, so the consumer's `resize` shrinks to
"upload these dims to my viewport/uniforms" and can never re-derive a wrong size.

### 3.1 BOLDEST MOVE — `sizeBacking` is a substrate primitive, not a consumer closure

Add ONE exported helper to `createCanvasLifecycle.ts` (the single-source leaf — it already
owns the schedule; sizing belongs beside it):

```ts
// createCanvasLifecycle.ts — the ONE canonical backing-store sizer. The gBCR-ancestor
// fallback + the DPR clamp + the NEVER-300×150 floor live HERE once, not in N consumers.
export interface BackingSize { w: number; h: number; dpr: number; changed: boolean; }

export function sizeBacking(
    canvas: HTMLCanvasElement,
    dprPolicy: number | ((box: { w: number; h: number }) => number),
): BackingSize {
    // Measure the LAID-OUT border-box, not clientWidth (0 under a content-visibility
    // skip). Walk ancestors only when our own rect is still zero — NEVER 300×150.
    const rect = canvas.getBoundingClientRect();
    let cw = rect.width, ch = rect.height;
    let el = canvas.parentElement;
    while ((cw === 0 || ch === 0) && el) {
        const pr = el.getBoundingClientRect();
        cw = cw || pr.width; ch = ch || pr.height; el = el.parentElement;
    }
    const box = { w: Math.max(1, cw), h: Math.max(1, ch) };
    const dpr = Math.max(1, typeof dprPolicy === "function" ? dprPolicy(box) : dprPolicy);
    const w = Math.max(1, Math.round(box.w * dpr));
    const h = Math.max(1, Math.round(box.h * dpr));
    const changed = canvas.width !== w || canvas.height !== h;
    if (changed) { canvas.width = w; canvas.height = h; }
    return { w, h, dpr, changed };
}
```

Then the lifecycle's `CanvasFrameHooks.resize` is REPLACED by a `paintViewport(size:
BackingSize)` the substrate calls AFTER it has sized — so the consumer's resize body
becomes `(s) => { if (s.changed) gl.viewport(0,0,s.w,s.h); uploadResolution(s.w,s.h); }`,
nothing more. The DPR *policy* (aurora's 1.5× wash ceiling vs blob's 2× focal) stays the
consumer's — passed as the `dprPolicy` arg — but the *measurement + the floor* is the
substrate's, ONE implementation. Aurora's stuck-canvas is structurally impossible after
this: the substrate's `sizeBacking` runs on arm, on RO, on reveal, and on resume, and it
can never produce 300×150.

This is deft: it REUSES the gBCR-ancestor-fallback logic that already exists *verbatim* in
aurora's runtime.ts comment — it just promotes the proven snippet from a consumer to the
leaf and deletes the N copies (DRY, no-legacy). The leaf's existing `resize()` callback
seam is the mount point; the change is mechanical, not a new system.

### 3.2 Born-skipped + reveal — already correct in the leaf, now UNMISSABLE

The leaf already has the two right hooks (verified): the `ResizeObserver` (per-backend,
in `buildContext`) and the `contentvisibilityautostatechange` listener that
**unconditionally** re-measures on skipped→visible plus the `resume()` re-measure on wake
(`createCanvasLifecycle.ts` lines 210-244, 183-197). The greenfield keeps both AND routes
both through `sizeBacking`, so the born-skipped trap (the documented 300×150 freeze when a
canvas mounts under a below-the-fold `content-visibility:auto` ancestor) is closed by the
SAME canonical sizer that closes mount + resize. One sizer, four call-sites (arm / RO /
CV-reveal / resume), zero drift.

ONE addition the live capture argues for: the leaf's RO is created INSIDE the per-backend
`buildContext`, which on the WebGPU path does not run until the device resolves
(`device not acquired` → no RO yet → no resize). HARDEN: move the `ResizeObserver` up into
the lifecycle leaf itself (it observes `canvas`, engine-agnostic), wired at `arm()` BEFORE
the async device acquire, so the surface is sized the instant it has a box — independent of
whether/when the WGPU device lands. This directly kills the observed aurora freeze.

### 3.3 The Safari WebGPU→WebGL2 fall — VALIDATE, one hardening

The fall is sound (the try-WebGPU-then-rebuild-WebGL2 shape, the typed `WebGPUInitError`
kinds incl. `acquire-timeout`, `freshCanvasForFallback` clone-only-when-poisoned via
`canvasCanHostWebGL2`, the 6000ms shared-device timeout). KEEP all of it. Two amendments:

- **Safari is the PRIMARY path, not the tail.** Safari 26+ ships WebGPU on Metal, but the
  hung-`requestDevice` and software-adapter classes are exactly where Safari lands. The
  `acquireSharedDevice` memo means the ≤6s race is paid ONCE per page (good), but the
  greenfield adds a **`navigator.gpu`-present-but-no-WGSL-path** short-circuit already
  honored (`attemptWebGPU = supportsWebGPU() && setupWGPU != null`) — VERIFY every Band-A
  viz that ships a `setupWGPU` ALSO ships a `setupGL` (grep: all do). The fall is real
  insurance, not a cliff.
- **The all-zero readback (the dot-flow delta).** The dot-flow live-delta found the picker
  falls to WebGL2 and a readback returns all-zero because the WebGL2 context was created
  with `preserveDrawingBuffer:false`. THIS IS NOT A SUBSTRATE DEFECT — it is a *readback
  contract* gap (§3.4). The substrate did its job (fell cleanly, painted live); the gate
  read at the wrong time. Fix is the readback contract, not the fall.

### 3.4 READBACK — a declared, non-tainting capture seam (closes #5)

Today `preserveDrawingBuffer` is a per-consumer `contextAttrs` knob (aurora opts true only
for capture; blob/dot-matrix hardcode false), and a π-gate that screenshots after a
composited frame can read empty without it. Greenfield: the substrate exposes a first-class
**`readback()` mode** on the handle:

```ts
// GpuSubstrateHandle gains:
captureFrame(timeSec: number): Promise<ImageData | null>;
```

It does the right thing per engine WITHOUT forcing `preserveDrawingBuffer` on the live
path: in `"capture"` mode it sets `preserveDrawingBuffer:true` at context creation (the
only time it's free), `renderAt(timeSec)`, then `readPixels`/`copyTextureToBuffer`. For a
LIVE context (false), `captureFrame` does a render-into-the-same-callstack read (read in
the SAME rAF turn the frame painted, before the compositor clears) — the documented
"read in the same task" WebGL contract. No taint (same-origin canvas), no live-path cost
(the live default stays `preserveDrawingBuffer:false`). The π-gates (`blob-warm-default`,
the dot-flow vignette) call `captureFrame` instead of `locator.screenshot()` + pngjs, and
the all-zero readback is structurally closed.

### 3.5 PARK / FREEZE / N-canvas budget — VALIDATE, one perf hardening

- **Park** is sound: the three-reason `Set<reason>` (`tab-hidden`/`off-screen`/
  `off-screen-io`/`manual`), one-writer-per-reason, the empty-set `isRunning()` gate, the
  parked rAF attaching zero frames. `useIntersectionPause` drives `off-screen-io`; the
  `contentvisibilityautostatechange` path drives `off-screen`; they OR. KEEP.
- **Freeze** is sound: one static frame at arm under `reduce` (synchronous `tick()` so no
  deferred flash), live `matchMedia change` re-monitor, the reschedule-gate not the
  suspend-set (so the on-screen reduced surface never blanks). KEEP.
- **N-canvas budget (the perf hardening):** a substrates page can mount the live stage
  canvas PLUS N preview-thumbnail canvases (the aurora route had 2; the section landing
  grids more). Each WebGL2 context counts against the ~8-per-page Chromium cap, and N live
  rAF loops compete for the frame budget. ADD a **`priority` field** to the substrate
  options (`"focal" | "preview"`): preview canvases (a) cap DPR at 1× regardless of policy,
  (b) get a `capture`-leaning low-frequency tick (the thumbnail bakes one frame then parks
  — already the pattern), and (c) the picker prefers ONE shared WebGPU device across all
  focal+preview canvases (already true via `acquireSharedDevice`). This formalizes the
  N-canvas economy the prior fix only half-addressed and keeps a substrates grid at 60fps.

## 4. iOS-27 FIDELITY — the substrate is invisible, but it is the FLOOR of the field

The substrate paints nothing of its own — it is the base every viz mounts on. Its iOS-27
duty is therefore NEGATIVE and absolute: it must never let the field behind the glass be
broken, gray, blank, or stuck. The §3 colorful-field-behind-glass edict and the BA.W-NO-GRAY
warm floor are only as real as the substrate's guarantee that the aurora/blob/dot-flow field
is actually PAINTING at full resolution in both modes and both engines. The stuck 300×150
aurora canvas is, precisely, an iOS-27 fidelity failure: the colorful field is rendering at
1/15th resolution behind the hero glass. So the substrate's fidelity bar is the gestalt bar
verbatim — **load every viz page, resize, hide/show, toggle PRM, dark/light: no stuck /
blank / 300×150 canvas, no error flood, both engines, the field always alive and full-res
behind the glass.** The §3.1 sizing inversion is the single change that makes that bar
mechanically guaranteed rather than per-consumer-hoped.

A11y/PRM carve: the FREEZE path (one static frame then park) is the substrate's PRM
contract and it is already correct — the greenfield does not touch it beyond routing its
re-measure through `sizeBacking`. WCAG 2.2.2 (pause) is satisfied by the park + the
consumer's pause seam; no auto-playing motion survives `reduce`.

## 5. THE DELTA-ASSAY → wave amendment (reconcile vs the substrate/viz waves)

KEEP (fit, do not re-fork): the schedule leaf, the three-reason park, the PRM freeze, the
device-loss circuit-breaker (`N_RESTORE_STORM`/`T`/`RESTORE_DEBOUNCE_MS`), the shared-device
warm + 6000ms timeout, the clone-only-when-poisoned fall, `useIntersectionPause`.

REFINE (weak → hardened), ONE wave **`BD.W-SUBSTRATE-SIZE-UNIFY`** (the union, no fork):
1. **Lift sizing into the leaf** — `sizeBacking()` exported from `createCanvasLifecycle.ts`;
   replace `CanvasFrameHooks.resize()` with `paintViewport(size)`; delete the N consumer
   gBCR-ancestor-fallback copies (aurora/blob/dot-matrix/dot-flow/fourier/paper-grid/
   concentric). DPR *policy* stays the consumer's (passed in); measurement + the 300×150
   floor is the leaf's. **Closes the live aurora stuck-canvas.**
2. **Move the `ResizeObserver` up into the leaf**, wired at `arm()` before the async device
   acquire (engine-agnostic) — sizes the surface the instant it has a box, independent of
   when/whether the WGPU device lands. **Closes the WGPU-not-acquired-no-RO freeze.**
3. **`captureFrame()` readback seam** on the handle (capture-mode `preserveDrawingBuffer`
   OR same-task live read) — π-gates call it; the all-zero readback is structurally closed.
   **Reconciles the dot-flow readback delta as a contract gap, NOT a fall defect.**
4. **`priority: "focal"|"preview"`** substrate option — preview canvases cap 1× DPR + bake-
   park; formalizes the N-canvas budget.

PRUNE: the duplicated DPR/gBCR/300×150 guard in every consumer `resize()` (absorbed by #1).

GATE (the gestalt bar, born-RED on today's aurora): a π frame-series across all Band-A viz
routes proving (a) backing == box×DPR on mount/resize/reveal/resume, never 300×150;
(b) the clean WebGPU→WebGL2 fall with no flood; (c) `captureFrame` returns non-zero pixels
on a fallen WebGL2 context; (d) park-when-hidden + PRM-freeze; BOTH modes, BOTH engines.

**CONVERGENCE: ~85%.** The substrate is fit — schedule, park, freeze, fall, device-warm,
circuit-breaker all ship and are sound. The ONE genuine gap is the leaked sizing contract,
and it is live-reproduced (aurora 300×150). The wave is a UNION (lift one helper, move one
observer, add one readback seam, add one priority flag), not a rebuild.
